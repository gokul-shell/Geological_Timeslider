import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import { DataSourceStatus, type FeatureLayerDataSource, type QueriableDataSource, type FieldSchema, Immutable } from 'jimu-core'
import { type GeocodeList, type GeocodeListItem, type SuggestionItem, type Suggestion, type SearchResultView, type RecordResultType } from '../../config'
import { checkIsSuggestionRepeat, getSuggestionItem, uniqueJson, getDatasource, changeDsStatus, checkIsDsCreated } from '../utils/utils'
import { OutputDsObjectField, OutputDsAddress } from '../../constants'
export interface LoadGeocodeRecordsOptions {
  address: string
  maxResultNumber: number
  geocodeList: GeocodeList
}

export interface updateOutputDsRecordsOptions {
  address: string
  maxResultNumber: number
  searchResultView: SearchResultView
  geocodeItem: GeocodeListItem
}

interface AddressToLocationsOption {
  geocodeItem: GeocodeListItem
  address: string
  maxResultNumber: number
  singleLineFieldName: string
  displayFields?: FieldSchema[]
  addressFields?: FieldSchema[]
}

export const ObjectIdField = {
  alias: 'OBJECTID',
  type: 'oid',
  name: OutputDsObjectField
}

export const AddressField = {
  alias: 'ADDRESS',
  type: 'string',
  name: OutputDsAddress
}

export const AddressSchema = {
  ...AddressField,
  jimuName: OutputDsAddress
}

/**
 * Get geocode suggestion
*/
export const fetchGeocodeSuggestions = (
  searchText: string,
  serviceListItem: GeocodeListItem
): Promise<Suggestion> => {
  if (!checkIsDsCreated(serviceListItem?.outputDataSourceId) || !serviceListItem?.isSupportSuggest) {
    return Promise.resolve({} as Suggestion)
  }
  return getSuggestion(serviceListItem, searchText)
}

/**
 * Query and get suggestion element
*/
export const getSuggestion = (geocodeItem: GeocodeListItem, searchText: string): Promise<Suggestion> => {
  return loadSuggest(geocodeItem?.geocodeURL, searchText, geocodeItem?.maxSuggestions).then(res => {
    let searchSuggestion: SuggestionItem[] = []
    res.forEach((addrInfo, index) => {
      const address = addrInfo.text
      if (address && !checkIsSuggestionRepeat(searchSuggestion, address)) {
        const layerSuggestion: SuggestionItem = {
          suggestionHtml: getSuggestionItem(address, searchText),
          suggestion: address,
          configId: geocodeItem?.configId,
          magicKey: addrInfo?.magicKey
        }
        searchSuggestion.push(layerSuggestion)
      }
    })
    searchSuggestion = uniqueJson(searchSuggestion, 'suggestion')
    const suggestion: Suggestion = {
      suggestionItem: searchSuggestion.splice(0, geocodeItem.maxSuggestions),
      layer: geocodeItem?.label,
      icon: geocodeItem?.icon
    }
    return Promise.resolve(suggestion)
  }).catch((error) => {
    return Promise.reject(error)
  })
}

/**
 * Load all geocode records
*/
export const loadGecodeRecords = (address: string, maxResultNumber: number, geocodeItem: GeocodeListItem, searchResultView: SearchResultView) => {
  if (!checkIsDsCreated(geocodeItem?.outputDataSourceId)) return
  const outputDs = getDatasource(geocodeItem.outputDataSourceId) as QueriableDataSource
  changeDsStatus(outputDs, DataSourceStatus.NotReady)
  return loadGeocodeRecodsAndUpdateOutputDs({
    address,
    maxResultNumber,
    searchResultView,
    geocodeItem: geocodeItem
  })
}

/**
 * load data from geocode service and then init outputDs records
*/
export const loadGeocodeRecodsAndUpdateOutputDs = (option: updateOutputDsRecordsOptions) => {
  const { address, maxResultNumber, geocodeItem } = option
  const { outputDataSourceId, singleLineFieldName, defaultAddressFieldName } = geocodeItem
  const outputDs = getDatasource(outputDataSourceId)
  const addressToLocationsOption = {
    geocodeItem: geocodeItem,
    address: address,
    maxResultNumber: maxResultNumber,
    singleLineFieldName: singleLineFieldName,
    addressFields: geocodeItem?.addressFields || []
  }
  return addressToLocations(addressToLocationsOption).then(async (response) => {
    const newResponse = response?.filter(res => res?.address)
    let extent
    const graphics: __esri.GraphicProperties[] = newResponse?.map((res, index) => {
      const attributes = res.attributes
      attributes.address = res.address
      if (defaultAddressFieldName) {
        attributes[defaultAddressFieldName] = res.address
      }
      attributes.objectid = index
      extent = res.extent
      const graphic = {
        attributes: attributes,
        geometry: res.location
      }
      return graphic
    })
    const fields: __esri.FieldProperties[] = geocodeItem?.addressFields?.map(jimuField => {
      return {
        alias: jimuField.alias,
        type: 'string',
        name: jimuField.jimuName
      }
    })
    const featureLayerDs = outputDs as FeatureLayerDataSource
    await featureLayerDs.updateSourceByFeatures(graphics, fields, OutputDsObjectField, {
      id: `${outputDataSourceId}_layer`,
      geometryType: 'point',
      fullExtent: extent
    })
    const dsStatus = address ? DataSourceStatus.Unloaded : DataSourceStatus.NotReady
    changeDsStatus(outputDs as QueriableDataSource, dsStatus)
    return Promise.resolve(DataSourceStatus.Unloaded)
  }).catch((error) => {
    return Promise.reject(error)
  })
}

/**
 * Query geocode service and get geocode record
*/
export const addressToLocations = (addressToLocationsOption: AddressToLocationsOption): Promise<__esri.AddressCandidate[]> => {
  const { geocodeItem, address, maxResultNumber, singleLineFieldName, addressFields } = addressToLocationsOption
  const { geocodeURL, magicKey } = geocodeItem
  return loadArcGISJSAPIModules(['esri/rest/locator']).then(modules => {
    const [locator] = modules
    const singleLineKey = singleLineFieldName || 'SingleLine'
    let addressOption = Immutable({
      maxSuggestions: maxResultNumber
    })
    const outFields = addressFields?.map(field => field?.jimuName)?.join(',')
    if (outFields) {
      addressOption = addressOption.set('outFields', outFields)
    }
    addressOption = addressOption.setIn([singleLineKey], address)
    magicKey && (addressOption = addressOption.set('magicKey', magicKey))
    return locator.addressToLocations(geocodeURL, {
      address: addressOption?.asMutable({ deep: true })
    }, {
      query: {}
    }).then(response => {
      response = response.sort((a, b) => { return b.score - a.score })
      response = response.filter((item) => { return item.location })
      return response
    }, err => {
      console.error(err.message)
      return []
    })
  })
}

/**
 * Query geocode service suggestion
*/
export const loadSuggest = (geocodeURL: string, address: string, maxSuggestion: number): Promise<__esri.SuggestionResult[]> => {
  return loadArcGISJSAPIModules(['esri/rest/locator']).then(modules => {
    const [locator] = modules
    return locator.suggestLocations(geocodeURL, {
      text: address,
      maxSuggestions: maxSuggestion
    }).then(response => {
      return response || []
    }, err => {
      console.error(err.message)
      return []
    })
  })
}

export const getCurrentAddress = (geocodeURL: string, position: GeolocationPosition) => {
  // const position = getCurrentLocation()
  if (!position) return Promise.resolve(null)
  return loadArcGISJSAPIModules(['esri/rest/locator']).then(modules => {
    const [locator] = modules
    return createPoint(position).then(point => {
      return locator.locationToAddress(geocodeURL, {
        location: point
      }, {
        query: {}
      }).then(response => {
        return Promise.resolve(response.address)
      }, err => {
        console.error(err.message)
        return []
      })
    })
  })
}

/**
 * Get current location
*/
export const getCurrentLocation = (onSeccess: (position) => void, onError) => {
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 10000
    }
    navigator.geolocation.getCurrentPosition(onSeccess, onError, options)
  } else {
    onError && onError()
  }
}

/**
 * Load geocode records by outputDatasources
*/
export const loadGeocodeOutputRecords = (geocodeItem: GeocodeListItem, resultMaxNumber: number, id: string, isPublishRecordCreateAction: boolean = false): Promise<RecordResultType> => {
  const outputDataSourceId = geocodeItem?.outputDataSourceId
  const ds = getDatasource(geocodeItem?.outputDataSourceId) as QueriableDataSource
  const records = ds?.getRecordsByPage(1, resultMaxNumber)
  return Promise.resolve({
    records: records,
    configId: geocodeItem.configId,
    dsId: outputDataSourceId,
    isGeocodeRecords: true,
    displayFields: geocodeItem?.displayFields
  })
}

/**
 * Create point by position
*/
export const createPoint = (position: GeolocationPosition): Promise<__esri.Point> => {
  const coords = position && position.coords
  if (!coords) {
    return Promise.resolve(null)
  }
  return loadArcGISJSAPIModules(['esri/geometry/Point']).then(modules => {
    const [Point] = modules
    return new Point({
      longitude: coords.longitude,
      latitude: coords.latitude,
      z: coords.altitude || null,
      spatialReference: {
        wkid: 4326
      }
    })
  })
}
