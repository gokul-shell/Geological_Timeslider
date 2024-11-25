/** @jsx jsx */
import { css, jsx, classNames, React, polished, type IMThemeVariables, type IntlShape } from 'jimu-core'
import { Icon, MobilePanel, defaultMessages, Radio } from 'jimu-ui'
import { loadArcGISJSAPIModules, type JimuMapView, SelectionMode } from 'jimu-arcgis'
import { type ActiveToolInfo } from '../../layout/base/base-tool'
import { MultiSourceMapContext } from '../../components/multisourcemap-context'
import SelectProgress from './select-progress'

interface Props {
  theme?: IMThemeVariables
  intl?: IntlShape

  isActive: boolean
  jimuMapView?: JimuMapView
  activeToolInfo: ActiveToolInfo
  toolName: string
  onActiveToolInfoChange?: (activeToolInfo: ActiveToolInfo) => void
  _onIconClick?: (e: any) => void
}

interface States {
  sketchInitialed: boolean
  selectProgress: number
  isShowSelectSetting: boolean

  currentSelectType: 'Point' | 'Rectangle' | 'Lasso' | 'Circle' | 'Line'
  spatialRelationship: 'intersects' | 'contains'
}

interface SketchCreateOptions {
  [tool: string]: __esri.SketchViewModelCreateCreateOptions
}

interface LastKeyEventInfo {
  eventDate: Date
  isKeyDown: boolean // true means keydown, false means keyup
}

const defaultPointSymbol = {
  style: 'esriSMSCircle',
  color: [0, 0, 128, 128],
  name: 'Circle',
  outline: {
    color: [0, 0, 128, 255],
    width: 1
  },
  type: 'esriSMS',
  size: 18
}

const defaultPolylineSymbol = {
  tags: ['solid'],
  title: 'Blue Thin',
  style: 'esriSLSSolid',
  color: [79, 129, 189, 255],
  width: 3,
  name: 'Blue 1',
  type: 'esriSLS'
}

const defaultPolygonSymbol = {
  style: 'esriSFSSolid',
  color: [79, 129, 189, 77],
  type: 'esriSFS',
  outline: {
    style: 'esriSLSSolid',
    color: [54, 93, 141, 255],
    width: 1.5,
    type: 'esriSLS'
  }
}

const SelectRectangleIcon = require('../../assets/icons/select-tool/select-rectangle.svg')
const SelectLassoIcon = require('../../assets/icons/select-tool/select-lasso.svg')
const SelectCircleIcon = require('../../assets/icons/select-tool/select-circle.svg')
const SelectLineIcon = require('../../assets/icons/select-tool/select-line.svg')
const SelectPointIcon = require('../../assets/icons/select-tool/select-point.svg')
const SelectMoreIcon = require('jimu-ui/lib/icons/more-16.svg')

export class SelectMobileTool extends React.PureComponent<Props, States> {
  SketchViewModel: typeof __esri.SketchViewModel
  GraphicsLayer: typeof __esri.GraphicsLayer
  Query: typeof __esri.Query
  jsonUtils: typeof __esri.jsonUtils = null
  geometryEngine: typeof __esri.geometryEngine
  sketchViewModel: __esri.SketchViewModel
  currentActiveTool: string = 'rectangle'
  sketChCreateOptions: SketchCreateOptions
  viewKeyDownHandle: __esri.Handle
  viewKeyUpHandle: __esri.Handle
  lastShiftKeyEventInfo: LastKeyEventInfo
  lastCtrlKeyEventInfo: LastKeyEventInfo
  isMac: boolean
  activeJimuMapView: JimuMapView

  constructor (props: Props) {
    super(props)

    this.isMac = window.jimuUA?.os?.name === 'macOS'

    this.sketChCreateOptions = {
      polygon: {
        mode: 'hybrid'
      }
    }

    this.state = {
      currentSelectType: 'Rectangle',
      sketchInitialed: false,
      spatialRelationship: 'intersects',
      selectProgress: 0,
      isShowSelectSetting: false
    }

    this.bindShiftCtrlKeysEventListeners()
  }

  getCSSStyle () {
    const theme = this.props.theme

    return css`
      .select-tool-btn-hover: hover {
        background-color: ${polished.rgba(theme.colors.palette.primary[500], 0.1)};;
      }

      .content-title {
        font-size: ${polished.rem(13)};
        font-weight: bold;
      }

      .select-tool-type-mobile-container-shell {
        overflow-x: auto;
        padding: 4px;
      }

      .select-tool-type-mobile-container-shell::-webkit-scrollbar {
        height: 0 !important;
        display: none;
      }

      .select-tool-type-mobile-container {
        width: 400px;
      }

      .select-tool-type {
        width: 64px;
        height: 64px;
        border: 1px solid ${theme.colors.palette.light[400]};
        cursor: pointer;
      }

      .select-tool-type-choosed {
        border: 1px solid ${theme.colors.primary};
        position: relative;
      }

      .select-tool-type-choosed:after {
        width: 0;
        height: 0;
        border-top: 8px solid ${theme.colors.primary};
        border-left: 8px solid transparent;
        position: absolute;
        top: 0;
        right: 0;
        content: "";
      }

      .select-tool-type-text {
        font-size: ${polished.rem(12)};
      }

      .select-tool-loader {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        width: 100%;
        animation: esri-fade-in 500ms ease-in-out;
      }

      .select-tool-loader:before {
        background-color: rgba(110,110,110,0.3);
        width: 100%;
        z-index: 0;
        content: "";
        opacity: 1;
        position: absolute;
        height: 2px;
        top: 0;
        transition: opacity 500ms ease-in-out;
      }

      .select-tool-loader:after {
        background-color: ${theme.colors.primary};
        width: 40%;
        z-index: 0;
        animation: looping-progresss-bar-ani 1500ms linear infinite;
        content: "";
        opacity: 1;
        position: absolute;
        height: 2px;
        top: 0;
        transition: opacity 500ms ease-in-out;
      }

    `
  }

  componentDidMount () {
    if (!this.state.sketchInitialed) {
      loadArcGISJSAPIModules([
        'esri/widgets/Sketch/SketchViewModel',
        'esri/layers/GraphicsLayer',
        'esri/rest/support/Query',
        'esri/symbols/support/jsonUtils',
        'esri/geometry/geometryEngine'
      ]).then(modules => {
        [this.SketchViewModel, this.GraphicsLayer, this.Query, this.jsonUtils, this.geometryEngine] = modules
        this.props.jimuMapView.view.when(() => {
          this.initialSketchTool()

          this.setState({
            sketchInitialed: true
          })
        })
      })
    }
  }

  componentDidUpdate (prevProps: Props, prevState: States) {
    const prevActiveToolName = prevProps.activeToolInfo && prevProps.activeToolInfo.activeToolName
    const currentActiveToolName = this.props.activeToolInfo && this.props.activeToolInfo.activeToolName

    if (prevActiveToolName !== currentActiveToolName && currentActiveToolName !== this.props.toolName && currentActiveToolName) {
      this.setState({
        isShowSelectSetting: false
      })
    }

    if (prevState.sketchInitialed !== this.state.sketchInitialed && this.state.sketchInitialed) {
      this.initialSketchTool()

      if (this.props.isActive && this.currentActiveTool) {
        this.setActiveToolForSketchViewModel(this.currentActiveTool)
      }
      return
    }

    if (prevProps.jimuMapView && this.props.jimuMapView && (prevProps.jimuMapView.id !== this.props.jimuMapView.id) && this.state.sketchInitialed) {
      // active JimuMapView changed
      // need to destroy current this.sketchViewModel and recreate it, dont't change this.sketchViewModel.view, because we need to bind view keydown/keyup events before init sketchViewModel
      this.destroySketchViewModelAndReleaseHandles()
      this.initialSketchTool()

      if (this.props.isActive && this.currentActiveTool) {
        this.setActiveToolForSketchViewModel(this.currentActiveTool)
      }

      return
    }

    if (prevProps.isActive !== this.props.isActive) {
      this.initialSketchTool()

      if (this.props.isActive) {
        this.setActiveToolForSketchViewModel(this.currentActiveTool)
      } else {
        this.destroySketchViewModelAndReleaseHandles()
      }
    }
  }

  componentWillUnmount () {
    this.destroySketchViewModelAndReleaseHandles()
    this.releaseShiftCtrlKeysEventListeners()
  }

  destroySketchViewModelAndReleaseHandles () {
    this.releaseViewHandles()

    if (this.sketchViewModel) {
      this.sketchViewModel.destroy()
      this.sketchViewModel = null
    }

    this.activeJimuMapView = null
  }

  releaseViewHandles () {
    if (this.activeJimuMapView) {
      this.activeJimuMapView.removeSelectByQueryProgressChangeListener(this.onJimuMapViewSelectProgressChange)
    }

    if (this.viewKeyDownHandle) {
      this.viewKeyDownHandle.remove()
      this.viewKeyDownHandle = null
    }

    if (this.viewKeyUpHandle) {
      this.viewKeyUpHandle.remove()
      this.viewKeyUpHandle = null
    }
  }

  onJimuMapViewSelectProgressChange = (progress) => {
    this.setState({
      selectProgress: progress
    })
  }

  useShiftKey (tolearnaceMs: number): boolean {
    return this.useKey(this.lastShiftKeyEventInfo, tolearnaceMs)
  }

  useCtrlKey (tolearnaceMs: number): boolean {
    return this.useKey(this.lastCtrlKeyEventInfo, tolearnaceMs)
  }

  useKey (lastKeyEventInfo: LastKeyEventInfo, tolearnaceMs: number): boolean {
    if (lastKeyEventInfo) {
      if (lastKeyEventInfo.isKeyDown) {
        // key is still down and not up, return true
        return true
      } else {
        // key is up, we use tolearnaceMs to deterine the return value
        const deltaTime = Date.now() - lastKeyEventInfo.eventDate.getTime()

        if (deltaTime <= tolearnaceMs) {
          // keyup time is not too long from now
          return true
        } else {
          // keyup time is too long from nows
          return false
        }
      }
    } else {
      // key never down, return false
      return false
    }
  }

  bindShiftCtrlKeysEventListeners () {
    document.addEventListener('keydown', this.onKeyDown, true)
    document.addEventListener('keyup', this.onKeyUp, true)
  }

  releaseShiftCtrlKeysEventListeners () {
    document.removeEventListener('keydown', this.onKeyDown, true)
    document.removeEventListener('keyup', this.onKeyUp, true)
  }

  onKeyDown = (event) => {
    if (event.key === 'Shift') {
      this.lastShiftKeyEventInfo = {
        eventDate: new Date(),
        isKeyDown: true
      }
    } else if ((this.isMac && event.key === 'Meta') || (!this.isMac && event.key === 'Control')) {
      this.lastCtrlKeyEventInfo = {
        eventDate: new Date(),
        isKeyDown: true
      }
    }
  }

  onKeyUp = (event) => {
    if (event.key === 'Shift') {
      this.lastShiftKeyEventInfo = {
        eventDate: new Date(),
        isKeyDown: false
      }
    } else if ((this.isMac && event.key === 'Meta') || (!this.isMac && event.key === 'Control')) {
      this.lastCtrlKeyEventInfo = {
        eventDate: new Date(),
        isKeyDown: false
      }
    }
  }

  initialSketchTool () {
    if (!this.SketchViewModel) {
      return
    }

    if (!this.sketchViewModel) {
      this.releaseViewHandles()

      const jimuMapView = this.props.jimuMapView
      this.activeJimuMapView = jimuMapView
      this.activeJimuMapView.addSelectByQueryProgressChangeListener(this.onJimuMapViewSelectProgressChange)

      const view = jimuMapView.view

      this.viewKeyDownHandle = view.on('key-down', (event) => {
        if (event.key === 'Shift') {
          event.stopPropagation()
        }
      })

      this.viewKeyDownHandle = view.on('key-up', (event) => {
        if (event.key === 'Shift') {
          event.stopPropagation()
        }
      })

      this.sketchViewModel = new this.SketchViewModel({
        view: view,
        layer: new this.GraphicsLayer(),
        pointSymbol: this.jsonUtils.fromJSON(defaultPointSymbol) as any,
        polylineSymbol: this.jsonUtils.fromJSON(defaultPolylineSymbol) as any,
        polygonSymbol: this.jsonUtils.fromJSON(defaultPolygonSymbol) as any
      })

      this.sketchViewModel.on('create', (event) => {
        if (event.state === 'complete') {
          // keep continuous drawing for SketchViewModel
          this.setActiveToolForSketchViewModel(this.currentActiveTool)

          const jimuMapView = this.props.jimuMapView
          jimuMapView.view.closePopup()

          const useKeyToleranceMs = 500
          const isShiftKey = this.useShiftKey(useKeyToleranceMs)
          const isCtrlKey = this.useCtrlKey(useKeyToleranceMs)

          let selectionMode = SelectionMode.New

          if (isShiftKey) {
            if (isCtrlKey) {
              selectionMode = SelectionMode.SelectFromCurrent
            } else {
              selectionMode = SelectionMode.AddToCurrent
            }
          } else {
            if (isCtrlKey) {
              selectionMode = SelectionMode.RemoveFromCurrent
            } else {
              selectionMode = SelectionMode.New
            }
          }

          jimuMapView.selectFeaturesByGraphic(event.graphic, this.state.spatialRelationship, selectionMode)
        }
      })
    }
  }

  setActiveToolForSketchViewModel (activeTool: string) {
    if (this.sketchViewModel) {
      const createOptions = this.sketChCreateOptions[activeTool]

      if (createOptions) {
        this.sketchViewModel.create(activeTool as any, createOptions)
      } else {
        this.sketchViewModel.create(activeTool as any)
      }
    }
  }

  setCurrentSelectType = (currentSelectType: any) => {
    this.initialSketchTool()

    if (currentSelectType === this.state.currentSelectType) {
      return
    }

    if (currentSelectType === 'Point') {
      if (this.props.isActive) {
        this.setActiveToolForSketchViewModel('point')
      }
      this.currentActiveTool = 'point'
    }

    if (currentSelectType === 'Rectangle') {
      if (this.props.isActive) {
        this.setActiveToolForSketchViewModel('rectangle')
      }
      this.currentActiveTool = 'rectangle'
    }

    if (currentSelectType === 'Lasso') {
      if (this.props.isActive) {
        this.setActiveToolForSketchViewModel('polygon')
      }
      this.currentActiveTool = 'polygon'
    }

    if (currentSelectType === 'Circle') {
      if (this.props.isActive) {
        this.setActiveToolForSketchViewModel('circle')
      }
      this.currentActiveTool = 'circle'
    }

    if (currentSelectType === 'Line') {
      if (this.props.isActive) {
        this.setActiveToolForSketchViewModel('polyline')
      }
      this.currentActiveTool = 'polyline'
    }

    this.setState({
      currentSelectType: currentSelectType
    }, () => {
      if (!this.props.activeToolInfo || (this.props.activeToolInfo && this.props.activeToolInfo.activeToolName !== this.props.toolName)) {
        this.props._onIconClick(null)
      }
    })
  }

  toggleIsSelectActive = () => {
    this.props._onIconClick(null)
  }

  onClickLoadingProgress = () => {
    if (this.activeJimuMapView) {
      this.activeJimuMapView.cancelSelectByQuery()
    }
  }

  handleIsShowSelectSetting = () => {
    this.setState({
      isShowSelectSetting: !this.state.isShowSelectSetting
    })
  }

  getSelectIconTitle () {
    let topTitle: string = ''

    if (this.state.currentSelectType === 'Point') {
      topTitle = this.formatMessage('SelectionByPoint')
    } else if (this.state.currentSelectType === 'Rectangle') {
      topTitle = this.formatMessage('SelectionByRectangle')
    } else if (this.state.currentSelectType === 'Lasso') {
      topTitle = this.formatMessage('SelectionByLasso')
    } else if (this.state.currentSelectType === 'Circle') {
      topTitle = this.formatMessage('SelectionByCircle')
    } else if (this.state.currentSelectType === 'Line') {
      topTitle = this.formatMessage('SelectionByLine')
    } else {
      topTitle = this.formatMessage('SelectLabel')
    }

    const newSelection = this.formatMessage('newSelection')
    const addToCurrentSelection = this.formatMessage('addToCurrentSelection')
    const removeFromCurrentSelection = this.formatMessage('removeFromCurrentSelection')
    const selectFromCurrentSelection = this.formatMessage('selectFromCurrentSelection')
    const drawShape = this.formatMessage('drawShape')
    const draw = this.formatMessage('draw')
    const ctrlKey = this.isMac ? 'Cmd' : 'Ctrl'

    const newSelectionTip = `∙ ${newSelection} (${drawShape})`
    const addToCurrentSelectionTip = `∙ ${addToCurrentSelection} (Shift + ${draw})`
    const removeFromCurrentSelectionTip = `∙ ${removeFromCurrentSelection} (${ctrlKey} + ${draw})`
    const selectFromCurrentSelectionTip = `∙ ${selectFromCurrentSelection} (Shift + ${ctrlKey} + ${draw})`

    const finalTitle =
    `${topTitle}
${newSelectionTip}
${addToCurrentSelectionTip}
${removeFromCurrentSelectionTip}
${selectFromCurrentSelectionTip}
    `

    return finalTitle
  }

  formatMessage (strId: string) {
    return this.props.intl.formatMessage({ id: strId, defaultMessage: defaultMessages[strId] })
  }

  getSelectToolIcon = () => {
    if (this.state.currentSelectType === 'Point') {
      return SelectPointIcon
    } else if (this.state.currentSelectType === 'Rectangle') {
      return SelectRectangleIcon
    } else if (this.state.currentSelectType === 'Lasso') {
      return SelectLassoIcon
    } else if (this.state.currentSelectType === 'Circle') {
      return SelectCircleIcon
    } else if (this.state.currentSelectType === 'Line') {
      return SelectLineIcon
    } else {
      return SelectRectangleIcon
    }
  }

  getMobilePanelForSelectSetting = () => {
    return (
      <MultiSourceMapContext.Consumer>
        {({ mapWidgetId }) => (
          <MobilePanel
            mapWidgetId={`${mapWidgetId}-with-select-container`} title=''
            open={this.state.isShowSelectSetting} onClose={() => { this.handleIsShowSelectSetting() }}
          >
            <div className='w-100'>
              {this.getMobilePanelSettingContent()}
            </div>
          </MobilePanel>
        )}
      </MultiSourceMapContext.Consumer>
    )
  }

  getMobilePanelSettingContent = () => {
    return (
      <div css={this.getCSSStyle()}>
        <div className='content-title mt-1 mb-2'>
          {this.props.intl.formatMessage({ id: 'SelectionTool', defaultMessage: defaultMessages.SelectionTool })}
        </div>
        <div className='w-100 select-tool-type-mobile-container-shell'>
          <div className='select-tool-type-mobile-container d-flex'>
            <div
              className={classNames('select-tool-type mr-3 d-flex flex-column align-items-center justify-content-center select-tool-btn-hover', {
                'select-tool-type-choosed': this.state.currentSelectType === 'Rectangle'
              })} onClick={() => { this.setCurrentSelectType('Rectangle') }}
              onKeyDown={e => { this.handleSelectTypeKeyDown(e, 'Rectangle') }}
              role='button' tabIndex={0}
            >
              <Icon width={16} height={16} icon={SelectRectangleIcon} />
              <div
                className='select-tool-type-text mt-1 w-100 text-truncate pl-1 pr-1 d-flex justify-content-center'
                title={this.props.intl.formatMessage({ id: 'SelectionToolRectangle', defaultMessage: defaultMessages.SelectionToolRectangle })}
              >
                {this.props.intl.formatMessage({ id: 'SelectionToolRectangle', defaultMessage: defaultMessages.SelectionToolRectangle })}
              </div>
            </div>
            <div
              className={classNames('select-tool-type mr-3 d-flex flex-column align-items-center justify-content-center select-tool-btn-hover', {
                'select-tool-type-choosed': this.state.currentSelectType === 'Lasso'
              })} onClick={() => { this.setCurrentSelectType('Lasso') }}
              onKeyDown={e => { this.handleSelectTypeKeyDown(e, 'Lasso') }}
              role='button' tabIndex={0}
            >
              <Icon width={16} height={16} icon={SelectLassoIcon} />
              <div
                className='select-tool-type-text mt-1 w-100 text-truncate pl-1 pr-1 d-flex justify-content-center'
                title={this.props.intl.formatMessage({ id: 'SelectionToolLasso', defaultMessage: defaultMessages.SelectionToolLasso })}
              >
                {this.props.intl.formatMessage({ id: 'SelectionToolLasso', defaultMessage: defaultMessages.SelectionToolLasso })}
              </div>
            </div>
            <div
              className={classNames('select-tool-type mr-3 d-flex flex-column align-items-center justify-content-center select-tool-btn-hover', {
                'select-tool-type-choosed': this.state.currentSelectType === 'Circle'
              })} onClick={() => { this.setCurrentSelectType('Circle') }}
              onKeyDown={e => { this.handleSelectTypeKeyDown(e, 'Circle') }}
              role='button' tabIndex={0}
            >
              <Icon width={16} height={16} icon={SelectCircleIcon} />
              <div
                className='select-tool-type-text mt-1 w-100 text-truncate pl-1 pr-1 d-flex justify-content-center'
                title={this.props.intl.formatMessage({ id: 'SelectionToolCircle', defaultMessage: defaultMessages.SelectionToolCircle })}
              >
                {this.props.intl.formatMessage({ id: 'SelectionToolCircle', defaultMessage: defaultMessages.SelectionToolCircle })}
              </div>
            </div>
            <div
              className={classNames('select-tool-type mr-3 d-flex flex-column align-items-center justify-content-center select-tool-btn-hover', {
                'select-tool-type-choosed': this.state.currentSelectType === 'Line'
              })} onClick={() => { this.setCurrentSelectType('Line') }}
              onKeyDown={e => { this.handleSelectTypeKeyDown(e, 'Line') }}
              role='button' tabIndex={0}
            >
              <Icon width={16} height={16} icon={SelectLineIcon} />
              <div
                className='select-tool-type-text mt-1 w-100 text-truncate pl-1 pr-1 d-flex justify-content-center'
                title={this.props.intl.formatMessage({ id: 'SelectionToolLine', defaultMessage: defaultMessages.SelectionToolLine })}
              >
                {this.props.intl.formatMessage({ id: 'SelectionToolLine', defaultMessage: defaultMessages.SelectionToolLine })}
              </div>
            </div>
            <div
              className={classNames('select-tool-type mr-3 d-flex flex-column align-items-center justify-content-center select-tool-btn-hover', {
                'select-tool-type-choosed': this.state.currentSelectType === 'Point'
              })} onClick={() => { this.setCurrentSelectType('Point') }}
              onKeyDown={e => { this.handleSelectTypeKeyDown(e, 'Point') }}
              role='button' tabIndex={0}
            >
              <Icon width={16} height={16} icon={SelectPointIcon} />
              <div
                className='select-tool-type-text mt-1 w-100 text-truncate pl-1 pr-1 d-flex justify-content-center'
                title={this.props.intl.formatMessage({ id: 'SelectionToolPoint', defaultMessage: defaultMessages.SelectionToolPoint })}
              >
                {this.props.intl.formatMessage({ id: 'SelectionToolPoint', defaultMessage: defaultMessages.SelectionToolPoint })}
              </div>
            </div>
          </div>
        </div>
        <div className='content-title mt-1 mb-2'>
          {this.props.intl.formatMessage({ id: 'SelectionMode', defaultMessage: defaultMessages.SelectionMode })}
        </div>
        <div>
          <div className='d-flex align-items-center mt-2'>
            <Radio
              style={{ cursor: 'pointer' }} checked={this.state.spatialRelationship === 'intersects'}
              onChange={() => { this.setState({ spatialRelationship: 'intersects' }) }}
            />
            <label className='m-0 ml-2 content-title' style={{ cursor: 'pointer' }} onClick={() => { this.setState({ spatialRelationship: 'intersects' }) }}>
              {this.props.intl.formatMessage({ id: 'SelectionWithin', defaultMessage: defaultMessages.SelectionWithin })}
            </label>
          </div>
          <div className='d-flex align-items-center mt-2'>
            <Radio
              style={{ cursor: 'pointer' }} checked={this.state.spatialRelationship === 'contains'}
              onChange={() => { this.setState({ spatialRelationship: 'contains' }) }}
            />
            <label className='m-0 ml-2 content-title' style={{ cursor: 'pointer' }} onClick={() => { this.setState({ spatialRelationship: 'contains' }) }}>
              {this.props.intl.formatMessage({ id: 'SelectionContain', defaultMessage: defaultMessages.SelectionContain })}
            </label>
          </div>
        </div>
      </div>
    )
  }

  handleSelectTypeKeyDown = (e: React.KeyboardEvent<any>, selectType: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.setCurrentSelectType(selectType)
    }
  }

  handleKeyDown = (e: React.KeyboardEvent<any>, action: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (action === 'toggleIsSelectActive') {
        this.toggleIsSelectActive()
      } else if (action === 'showSelectSetting') {
        this.handleIsShowSelectSetting()
      } else if (action === 'onClickLoadingProgress') {
        this.onClickLoadingProgress()
      }
    }
  }

  render () {
    const selectIconTitle = this.getSelectIconTitle()
    const moreIconTitle = this.props.intl.formatMessage({ id: 'more', defaultMessage: 'More' })
    const isSelecting = this.state.selectProgress > 0 && this.state.selectProgress < 1

    return (
      <div css={this.getCSSStyle()}>
        {this.state.sketchInitialed && !isSelecting && <div
          onClick={this.toggleIsSelectActive} style={{}} title={selectIconTitle} className={classNames('exbmap-ui-tool border-0 esri-widget--button', {
            'exbmap-ui-tool-icon-selected': this.props.isActive
          })}
          onKeyDown={e => { this.handleKeyDown(e, 'toggleIsSelectActive') }}
          role='button' tabIndex={0}
        >
          <Icon width={16} height={16} className='exbmap-ui-tool-icon' icon={this.getSelectToolIcon()} />
        </div>}
        {
          this.state.sketchInitialed && isSelecting && <SelectProgress progress={this.state.selectProgress} intl={this.props.intl} theme={this.props.theme} onClick={this.onClickLoadingProgress} />
        }
        {!this.state.sketchInitialed && <div style={{}} className={classNames('exbmap-ui-tool border-0 esri-widget--button')}>
          <Icon width={16} height={16} className='exbmap-ui-tool-icon' icon={this.getSelectToolIcon()} />
        </div>}
        <div className='border border-top-0 w-100' style={{ height: '1px' }} />
        {this.state.sketchInitialed && <div onClick={this.handleIsShowSelectSetting} title={moreIconTitle} style={{}} className={classNames('exbmap-ui-tool border-0 esri-widget--button')}
          onKeyDown={e => { this.handleKeyDown(e, 'showSelectSetting') }}
          role='button' tabIndex={0}
        >
          <Icon width={16} height={16} className='exbmap-ui-tool-icon' icon={SelectMoreIcon} />
        </div>}
        {!this.state.sketchInitialed && <div style={{}} title={moreIconTitle} className={classNames('exbmap-ui-tool border-0 esri-widget--button')}>
          <Icon width={16} height={16} className='exbmap-ui-tool-icon' icon={SelectMoreIcon} />
        </div>}
        {this.state.isShowSelectSetting && this.getMobilePanelForSelectSetting()}
      </div>
    )
  }
}
