/** @jsx jsx */
import { React, jsx, esri, classNames, hooks } from 'jimu-core'
import { Icon, Button, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { type Suggestion, type InitResultServiceListOption, type IMConfig } from '../../config'
import defaultMessage from '../translations/default'
import { useTheme } from 'jimu-theme'
import ResultPopper from './resultPopper'
const { useRef } = React
interface SearchSettingProps {
  searchText: string
  isOpen: boolean
  reference: any
  searchSuggestion: Suggestion[]
  className?: string
  canUseOutoutDsLength: number
  config: IMConfig
  searchInputRef?: any
  id: string
  toggel?: () => void
  onRecordItemClick: (searchText: string, initResultServiceListOption?: InitResultServiceListOption, isUseLocationError?: boolean) => void
  setSuggestionFirstItem: (ref) => void
}
const Sanitizer = esri.Sanitizer
const sanitizer = new Sanitizer()

const SuggestionList = (props: SearchSettingProps) => {
  const nls = hooks.useTranslation(defaultMessage, jimuiDefaultMessage)
  const { className, reference, searchSuggestion, isOpen, searchText, canUseOutoutDsLength, id, searchInputRef, toggel, onRecordItemClick, setSuggestionFirstItem } = props
  const theme = useTheme()
  const isHasSetFirstItem = useRef<boolean>(false)
  const checkIsNoResult = () => {
    let totalSuggestionItem = []
    searchSuggestion.forEach(layerSuggestion => {
      const suggestionItem = layerSuggestion?.suggestionItem || []
      totalSuggestionItem = totalSuggestionItem.concat(suggestionItem)
    })
    return searchText && totalSuggestionItem.length === 0
  }

  const handelSuggestionItemClick = (searchText: string, initResultServiceListOption?: InitResultServiceListOption) => {
    const { configId, isFromSuggestion, magicKey } = initResultServiceListOption || {}
    if (configId && (isFromSuggestion || magicKey)) {
      onRecordItemClick(searchText, initResultServiceListOption)
    } else {
      onRecordItemClick(searchText)
    }
  }

  const renderLayerSuggestionElement = () => {
    isHasSetFirstItem.current = null
    return searchSuggestion?.map((layerSuggestion, index) => {
      const isShowLayerName = searchSuggestion?.length > 1 && layerSuggestion?.suggestionItem?.length > 0
      return (
        <div key={`${layerSuggestion?.layer}-${index}`} role='group' aria-label={layerSuggestion?.layer}>
          {isShowLayerName && <Button role='button' className='source-label-con jimu-outline-inside' disabled={true} title={layerSuggestion?.layer}>
            {layerSuggestion?.icon && <Icon className='mr-2' color={theme?.colors?.primary} size={16} icon={layerSuggestion?.icon?.svg}/> }
            {layerSuggestion?.layer}
          </Button>}
          {renderSuggestionItemElement(layerSuggestion, checkIsShowPadding())}
        </div>
      )
    })
  }

  const checkIsShowPadding = () => {
    const sourceNumber = searchSuggestion?.length
    if (sourceNumber < 2) {
      return false
    }
    // The total number of icons
    let iconNumber = 0
    //when only one source has suggestion, and the source item has an icon, padding should also be added
    let numberOfSourceWithSuggestionAndIcon = 0
    searchSuggestion?.forEach(layerSuggestion => {
      const icon = layerSuggestion?.icon
      if (icon) {
        iconNumber += 1
      }
      if (layerSuggestion.suggestionItem?.length > 0 && icon) {
        numberOfSourceWithSuggestionAndIcon += 1
      }
    })
    return numberOfSourceWithSuggestionAndIcon > 0 && iconNumber > 0
  }

  const renderSuggestionItemElement = (suggestion: Suggestion, isShowPadding = false) => {
    const suggestionItem = suggestion?.suggestionItem
    const icon = suggestion?.icon
    return suggestionItem?.map((item, index) => {
      const suggestionHtml = sanitizer.sanitize(
        item.suggestionHtml
      )
      const initResultServiceListOption = {
        configId: item?.configId,
        isFromSuggestion: item?.isFromSuggestion,
        magicKey: item?.magicKey
      }
      return (
        <Button
          className={classNames('d-flex align-items-center py-2 jimu-outline-inside', { 'item-p-l': isShowPadding })}
          key={`${suggestion?.layer}${index}`}
          title={item.suggestion}
          role='button'
          onClick={() => {
            handelSuggestionItemClick(item.suggestion, initResultServiceListOption)
          }}
          ref={ref => { setFirstItemRef(index, ref) }}
        >
          {(icon && canUseOutoutDsLength === 1) && <Icon className='mr-2' color={theme?.colors?.primary} size={16} icon={icon?.svg}/> }
          <div className='flex-grow-1' dangerouslySetInnerHTML={{ __html: suggestionHtml }}></div>
        </Button>
      )
    })
  }

  const setFirstItemRef = (index: number, ref) => {
    if (index === 0 && !isHasSetFirstItem.current) {
      setSuggestionFirstItem(ref)
      isHasSetFirstItem.current = true
    }
  }

  return (
    <div>
      <ResultPopper
        isOpen={isOpen}
        autoFocus={false}
        reference={reference}
        searchInputRef={searchInputRef}
        isFocusWidtSearchInput
        toggle={toggel}
        id={id}
        className={classNames('result-list-con suggestion-list-con', className)}
      >
        {checkIsNoResult() && <Button role='button' className='text-center py-2' disabled={true} title={nls('noResult', { searchText: searchText })}>{nls('noResult', { searchText: searchText })}</Button>}
        {renderLayerSuggestionElement()}
      </ResultPopper>
    </div>
  )
}

export default SuggestionList
