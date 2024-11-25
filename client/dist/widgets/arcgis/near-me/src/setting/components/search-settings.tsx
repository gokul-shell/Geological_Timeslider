/** @jsx jsx */ // <-- make sure to include the jsx pragma
import { React, jsx, type IntlShape, type IMThemeVariables } from 'jimu-core'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { getSearchSettingStyle } from '../lib/style'
import defaultMessages from '../translations/default'
import { Select, Option, Label, NumericInput, Radio, Switch, Tooltip, TextArea, defaultMessages as jimuUIDefaultMessages, Checkbox } from 'jimu-ui'
import { type SearchSettings } from '../../config'
import { defaultBufferDistance, unitOptions } from '../constants'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { validateMaxBufferDistance, getMaxBufferLimit, getPortalUnit } from '../../common/utils'

interface Props {
  intl: IntlShape
  theme: IMThemeVariables
  config: SearchSettings
  onSearchSettingsUpdated: (prop: string, value: string | boolean | number) => void
}

interface State {
  headingLabelText: string
  bufferDistance: number
  distanceUnits: string
  showDistanceSettings: boolean
  showSketchTools: boolean
  includeFeaturesMapAreaOption: boolean
  showDistFromInputLocation: boolean
  showLayersResultOption: boolean
}

export default class SearchSetting extends React.PureComponent<Props, State> {
  constructor (props) {
    super(props)
    if (this.props.config) {
      const configuredBufferDistanceUnit = this.props.config.distanceUnits !== '' ? this.props.config.distanceUnits : getPortalUnit()
      this.state = {
        headingLabelText: this.props.config.headingLabel,
        bufferDistance: this.props.config.bufferDistance,
        distanceUnits: configuredBufferDistanceUnit,
        showDistanceSettings: this.props.config.showDistanceSettings,
        showSketchTools: this.props.config.showSketchTools,
        includeFeaturesMapAreaOption: this.props.config.includeFeaturesOutsideMapArea,
        showDistFromInputLocation: this.props.config.showDistFromInputLocation,
        showLayersResultOption: this.props.config.onlyShowLayersResult
      }
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl?.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  /**
   * update the heading label value
   * @param value value of the heading
   */
  onHeadingLabelChange = (value: string) => {
    this.setState({
      headingLabelText: value
    })
  }

  /**
   * update the config of the heading label
   */
  onHeadingLabelAcceptValue = () => {
    this.props.onSearchSettingsUpdated('headingLabel', this.state.headingLabelText)
  }

  /**
 * Update the config include Features Outside MapArea parameter
 * @param evt get the event on toggle the include Features Outside MapArea parameter
 */
  onIncludeFeaturesMapAreaToggleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      includeFeaturesMapAreaOption: evt.target.checked
    }, () => {
      this.props.onSearchSettingsUpdated('includeFeaturesOutsideMapArea', this.state.includeFeaturesMapAreaOption)
      //set the heading label according to the include Features Outside MapArea parameter enabled or disabled
      this.setState({
        headingLabelText: evt.target.checked ? this.nls('disabledDefineSearchAreaLabel') : this.nls('currentMapAreaLabel')
      }, () => {
        setTimeout(() => {
          this.props.onSearchSettingsUpdated('headingLabel', this.state.headingLabelText)
        }, 100)
      })
    })
  }

  /**
   * Update the buffer unit and buffer distance parameter
   * @param evt get the event after distance unit change
   */
  onDistanceUnitChange = (evt: any) => {
    const bufferDistanceMaxLimit = validateMaxBufferDistance(this.state.bufferDistance, evt.target.value)
    this.props.onSearchSettingsUpdated('bufferDistance', bufferDistanceMaxLimit)
    this.setState({
      distanceUnits: evt.target.value,
      bufferDistance: bufferDistanceMaxLimit
    }, () => {
      setTimeout(() => {
        this.props.onSearchSettingsUpdated('distanceUnits', this.state.distanceUnits)
      }, 50)
    })
  }

  /**
   * Update buffer distance parameter
   * @param value get the value on buffer distance change
   */
  onBufferDistanceChange = (value: number | undefined) => {
    this.setState({
      bufferDistance: value ?? defaultBufferDistance
    }, () => {
      this.props.onSearchSettingsUpdated('bufferDistance', this.state.bufferDistance)
    })
  }

  /**
   * @param isSearchByActiveMapArea Check if the map current extent radio button is checked or not
   */
  handleSearchByChange = (isSearchByActiveMapArea: boolean) => {
    let headingLabelTextValue = ''
    //set the heading label according to the current map area and location enabled or disabled
    if (isSearchByActiveMapArea) {
      headingLabelTextValue = this.state.includeFeaturesMapAreaOption ? this.nls('disabledDefineSearchAreaLabel') : this.nls('currentMapAreaLabel')
    } else {
      headingLabelTextValue = this.nls('locationLabel')
    }
    this.setState({
      headingLabelText: headingLabelTextValue
    }, () => {
      setTimeout(() => {
        this.props.onSearchSettingsUpdated('headingLabel', this.state.headingLabelText)
      }, 100)
    })
    this.props.onSearchSettingsUpdated('searchByActiveMapArea', isSearchByActiveMapArea)
  }

  /**
   * Update show distance settings checkbox state
   * @param evt get the event after show distance settings checkbox state change
   */
  onShowDistanceSettingsChange = (evt: any) => {
    this.setState({
      showDistanceSettings: evt.target.checked
    }, () => {
      setTimeout(() => {
        this.props.onSearchSettingsUpdated('showDistanceSettings', this.state.showDistanceSettings)
      }, 50)
    })
  }

  /**
 * Update show sketch tools settings checkbox state
 * @param evt get the event after show sketch tools settings checkbox state change
 */
  onShowSketchToolsSettingsChange = (evt: any) => {
    this.setState({
      showSketchTools: evt.target.checked
    }, () => {
      setTimeout(() => {
        this.props.onSearchSettingsUpdated('showSketchTools', this.state.showSketchTools)
      }, 50)
    })
  }

  /**
 * Update show distance from input location checkbox state
 * @param evt get the event after show sketch tools and distance settings checkbox state change
 */
  onShowDistFromInputLocToolsChange = (evt: any) => {
    this.setState({
      showDistFromInputLocation: evt.target.checked
    }, () => {
      setTimeout(() => {
        this.props.onSearchSettingsUpdated('showDistFromInputLocation', this.state.showDistFromInputLocation)
      }, 50)
    })
  }

  /**
   * update only show layer result property
   * @param evt only show results options event
   */
  onlyShowResultsOptionChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      showLayersResultOption: evt.target.checked
    }, () => {
      this.props.onSearchSettingsUpdated('onlyShowLayersResult', this.state.showLayersResultOption)
    })
  }

  render () {
    return (
      <div css={getSearchSettingStyle(this.props.theme)} style={{ height: '100%', width: '100%' }}>
        <SettingRow>
          <Label className='w-100 d-flex'>
            <div className='flex-grow-1 text-break setting-text-level-3'>
              {this.nls('defineSearchAreaLabel')}
            </div>
          </Label>
          <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('defineSearchAreaLabel') + ' ' + this.nls('defineSearchAreaTooltip')}
            title={this.nls('defineSearchAreaTooltip')} showArrow placement='top'>
            <div className='setting-text-level-2 d-inline'>
              <InfoOutlined />
            </div>
          </Tooltip>
        </SettingRow>

        <React.Fragment>
          <SettingRow className={'mt-3'} flow='wrap'>
            <Label className='m-0' centric>
              <Radio role={'radio'} aria-label={this.nls('searchByActiveMapArea')}
                className={'cursor-pointer'}
                value={'searchByActiveMapArea'}
                onChange={() => { this.handleSearchByChange(true) }}
                checked={this.props.config.searchByActiveMapArea} />
              <div tabIndex={0} className='ml-1 text-break cursor-pointer' onClick={() => { !this.props.config.searchByActiveMapArea && this.handleSearchByChange(true) }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    this.handleSearchByChange(true)
                  }
                }}>
                {this.nls('searchByActiveMapArea')}
              </div>
            </Label>
          </SettingRow>

          <SettingRow className={'mt-2'} flow='wrap'>
            <Label className='m-0' centric>
              <Radio role={'radio'} aria-label={this.nls('searchByLocation')}
                className={'cursor-pointer'}
                value={'searchByLocation'}
                onChange={() => { this.handleSearchByChange(false) }}
                checked={!this.props.config.searchByActiveMapArea} />
              <div tabIndex={0} className='ml-1 text-break cursor-pointer' onClick={() => { this.props.config.searchByActiveMapArea && this.handleSearchByChange(false) }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    this.handleSearchByChange(false)
                  }
                }}>
                {this.nls('searchByLocation')}
              </div>
            </Label>
          </SettingRow>

          <SettingRow label={this.nls('headingLabel')} className='ml-2' flow={'wrap'}>
            <TextArea tabIndex={0} className='w-100' spellCheck={false} value={this.state.headingLabelText}
              onChange={evt => { this.onHeadingLabelChange(evt.target.value) }}
              onAcceptValue={this.onHeadingLabelAcceptValue}
            />
          </SettingRow>

          {this.props.config.searchByActiveMapArea &&
            <SettingRow className='ml-2' label={this.nls('featuresOutsideMapArea')}>
              <Switch role={'switch'} aria-label={this.nls('featuresOutsideMapArea')} title={this.nls('featuresOutsideMapArea')}
                checked={this.state.includeFeaturesMapAreaOption} onChange={this.onIncludeFeaturesMapAreaToggleChange} />
            </SettingRow>
          }

          {this.state.includeFeaturesMapAreaOption && this.props.config.searchByActiveMapArea &&
            <SettingRow className='ml-2'>
              <Label tabIndex={0} aria-label={this.nls('searchAreaHint')} className='font-italic w-100 d-flex'>
                <div className='flex-grow-1 text-break setting-text-level-3'>
                  {this.nls('searchAreaHint')}
                </div>
              </Label>
            </SettingRow>
          }

          {!this.props.config.searchByActiveMapArea &&
            <React.Fragment>
              <SettingRow className={'mt-3 ml-2'} flow={'wrap'}>
                <Label title={this.nls('bufferDistance')}
                  className='w-100 d-flex'>
                  <div className='text-truncate flex-grow-1 setting-text-level-3'>
                    {this.nls('bufferDistance')}
                  </div>
                </Label>
                <NumericInput aria-label={this.nls('bufferDistance')} style={{ width: '240px' }}
                  size={'sm'} min={0} max={getMaxBufferLimit(this.state.distanceUnits)}
                  defaultValue={this.state.bufferDistance} value={this.state.bufferDistance}
                  onChange={this.onBufferDistanceChange} />
              </SettingRow>

              <SettingRow className={'ml-2'} flow={'wrap'}>
                <Label title={this.nls('distanceUnits')}
                  className='w-100 d-flex'>
                  <div className='text-truncate flex-grow-1 setting-text-level-3'>
                    {this.nls('distanceUnits')}
                  </div>
                </Label>
                <Select style={{ marginBottom: '1px' }} aria-label={this.nls('distanceUnits') + ' ' + this.state.distanceUnits} size={'sm'}
                  value={this.state.distanceUnits} onChange={(evt) => { this.onDistanceUnitChange(evt) }}>
                  {unitOptions.map((option, index) => {
                    return <Option role={'option'} tabIndex={0} aria-label={option.label} value={option.value} key={index}>{option.label}</Option>
                  })}
                </Select>
              </SettingRow>

              <SettingRow className={'ml-2'}>
                <Label check centric style={{ cursor: 'pointer' }}>
                  <Checkbox role={'checkbox'} aria-label={this.nls('showDistanceSettings')}
                    style={{ cursor: 'pointer' }} className='mr-2' checked={this.state.showDistanceSettings}
                    onChange={this.onShowDistanceSettingsChange.bind(this)}
                  />
                  {this.nls('showDistanceSettings')}
                </Label>
              </SettingRow>

              <SettingRow className={'ml-2'}>
                <Label check centric style={{ cursor: 'pointer' }}>
                  <Checkbox role={'checkbox'} aria-label={this.nls('showDistFromInputLoc')}
                    style={{ cursor: 'pointer' }} className='mr-2' checked={this.state.showDistFromInputLocation}
                    onChange={this.onShowDistFromInputLocToolsChange.bind(this)}
                  />
                  {this.nls('showDistFromInputLoc')}
                </Label>
              </SettingRow>

              <SettingRow className={'ml-2'}>
                <Label check centric style={{ cursor: 'pointer' }}>
                  <Checkbox role={'checkbox'} aria-label={this.nls('showSketchTools')}
                    style={{ cursor: 'pointer' }} className='mr-2' checked={this.state.showSketchTools}
                    onChange={this.onShowSketchToolsSettingsChange.bind(this)}
                  />
                  {this.nls('showSketchTools')}
                </Label>
              </SettingRow>

              <SettingRow className={'ml-2'}>
                <Label className='onlyShowResultsLabel d-flex'>
                  <div className='flex-grow-1 mr-2 text-break setting-text-level-3'>
                    {this.nls('onlyShowResults')}
                  </div>
                </Label>
                <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('onlyShowResults') + ' ' + this.nls('onlyShowResultsTooltip')}
                  title={this.nls('onlyShowResultsTooltip')} showArrow placement='top'>
                  <div className='setting-text-level-2 mr-2 d-inline'>
                    <InfoOutlined />
                  </div>
                </Tooltip>
                <Switch role={'switch'} aria-label={this.nls('onlyShowResults')} title={this.nls('onlyShowResults')}
                  checked={this.state.showLayersResultOption} onChange={this.onlyShowResultsOptionChange} />
              </SettingRow>
            </React.Fragment>
          }
        </React.Fragment>
      </div>
    )
  }
}
