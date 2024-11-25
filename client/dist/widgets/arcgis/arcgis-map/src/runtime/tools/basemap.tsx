import { React } from 'jimu-core'
import { BaseTool, type BaseToolProps, type IconType } from '../layout/base/base-tool'
import { loadArcGISJSAPIModules, type JimuMapView } from 'jimu-arcgis'
import { defaultMessages } from 'jimu-ui'
import { basemapUtils } from 'jimu-arcgis'

export default class BaseMap extends BaseTool<BaseToolProps, unknown> {
  toolName = 'BaseMap'

  getTitle () {
    return this.props.intl.formatMessage({ id: 'BaseMapLabel', defaultMessage: defaultMessages.BaseMapLabel })
  }

  getIcon (): IconType {
    return {
      icon: require('../assets/icons/basemap.svg')
    }
  }

  getExpandPanel (): JSX.Element {
    return <BaseMapInner jimuMapView={this.props.jimuMapView} isMobile={this.props.isMobile} />
  }
}

interface BaseMapInnerProps {
  jimuMapView: JimuMapView
  isMobile: boolean
}

interface BaseMapInnerState {
  apiLoaded: boolean
  sourceLoaded: boolean
}

class BaseMapInner extends React.PureComponent<BaseMapInnerProps, BaseMapInnerState> {
  BasemapGallery: typeof __esri.BasemapGallery
  LocalBasemapsSource: typeof __esri.LocalBasemapsSource
  basemapGallery: __esri.BasemapGallery
  orgBasemaps: __esri.Basemap[]
  container: HTMLElement
  __unmount = false

  constructor (props) {
    super(props)

    this.state = {
      apiLoaded: false,
      sourceLoaded: false
    }
  }

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules(['esri/widgets/BasemapGallery', 'esri/widgets/BasemapGallery/support/LocalBasemapsSource']).then(modules => {
        if (this.__unmount) {
          return
        }

        [this.BasemapGallery, this.LocalBasemapsSource] = modules
        this.setState({
          apiLoaded: true
        })
      })
    }

    if (!this.state.sourceLoaded) {
      basemapUtils.getOrgBasemaps().then((basemaps: __esri.Basemap[]) => {
        if (this.__unmount) {
          return
        }

        this.orgBasemaps = basemaps
        this.setState({
          sourceLoaded: true
        })
      }).catch(err => {
        console.error(`load basemap gallery source error: ${err}`)
      })
    }
  }

  componentDidUpdate (prevProps: BaseMapInnerProps) {
    if (this.state.apiLoaded && this.state.sourceLoaded && this.container) {
      if (this.basemapGallery) {
        // basemapGallery already created
        const isViewChanged = prevProps.jimuMapView && this.props.jimuMapView && (prevProps.jimuMapView.id !== this.props.jimuMapView.id)

        if (isViewChanged) {
          // view changed
          this.basemapGallery.view = this.props.jimuMapView.view
          this.basemapGallery.source = this.getFinalBasemapGallerySource(this.orgBasemaps)
          this.basemapGallery.renderNow()
        }
      } else {
        // basemapGallery not created
        const source = this.getFinalBasemapGallerySource(this.orgBasemaps)
        this.basemapGallery = new this.BasemapGallery({
          container: this.container,
          view: this.props.jimuMapView.view,
          source,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
          // @ts-ignore
          includeCurrentBasemap: true
        })

        this.props.jimuMapView.deleteJimuMapTool('BaseMap')
        this.props.jimuMapView.addJimuMapTool({
          name: 'BaseMap',
          instance: this.basemapGallery
        })
      }
    }
  }

  getFinalBasemapGallerySource (orgBasemaps: __esri.Basemap[]): __esri.LocalBasemapsSource {
    const finalBasemaps = orgBasemaps.slice()

    const source = new this.LocalBasemapsSource({
      basemaps: finalBasemaps
    })

    return source
  }

  componentWillUnmount () {
    this.__unmount = true

    if (this.basemapGallery) {
      this.basemapGallery.destroy()
      this.basemapGallery = null
      this.props.jimuMapView.deleteJimuMapTool('BaseMap')
    }
  }

  render () {
    if (this.props.isMobile) {
      return (
        <div className='basemap-map-tool' ref={ref => { this.container = ref }} style={{ width: '100%', minHeight: '32px', maxWidth: 'none', maxHeight: 'none', overflowY: 'auto', position: 'relative' }}>
          {!this.state.apiLoaded && <div className='exbmap-basetool-loader' />}
        </div>
      )
    } else {
      return (
        <div
          ref={ref => { this.container = ref }} style={{ width: '250px', minHeight: '32px', position: 'relative' }}
          className='exbmap-ui-pc-expand-maxheight basemap-map-tool'
        >
          {!this.state.apiLoaded && <div className='exbmap-basetool-loader' />}
        </div>
      )
    }
  }
}
