/** @jsx jsx */
import { React, jsx, hooks, css, SupportedUtilityType, type ImmutableArray, type UseUtility, type IMUtilityJson, ReactRedux, type IMState, loadArcGISJSAPIModule, SessionManager, SignInErrorCode } from 'jimu-core'
import { Alert, Button, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { UtilitySelector } from 'jimu-ui/advanced/utility-selector'
import { type AnalysisToolInfo } from 'analysis-ui-schema'
import { PlusOutlined } from 'jimu-icons/outlined/editor/plus'
import { getCustomToolUrlWithToken } from '../../utils/util'
import { type CustomToolAdded } from '../../config'

export interface Props {
  onChange: (data: CustomToolAdded) => void
}

const style = css`
  position: relative;
  .select-button {
    position: absolute;
    pointer-events: none;
    font-size: 0.875rem;
  }
  &:hover {
    .select-button {
      background-color: var(--primary-600);
      border-color: var(--primary-600);
    }
  }
  [class$=UtilitySelector] {
    padding-bottom: 0 !important;
  }
`

const CustomAnalysisToolSelector = (props: Props): React.ReactElement => {
  const { onChange } = props
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessage)

  const getUtilityGPTaskUrl = (task: string, utilityJson: IMUtilityJson) => {
    return task ? `${utilityJson.url}/${task}` : utilityJson.url
  }

  const utilitiesState = ReactRedux.useSelector((state: IMState) => {
    return state.appStateInBuilder.appConfig.utilities
  })

  const esriRequest = React.useRef<typeof __esri.request>()

  const getWebToolJSON = (toolUrl: string, needToken: boolean = true) => {
    const options: __esri.RequestOptions = { query: { f: 'json' }, responseType: 'json' }

    const toolUrlWithToken = needToken ? getCustomToolUrlWithToken(toolUrl) : toolUrl

    return esriRequest.current(toolUrlWithToken, options).then(r => r.data as AnalysisToolInfo).catch((error) => {
      const signInErrorCode = SessionManager.getInstance().getSignInErrorCodeByAuthError(error)
      if (signInErrorCode === SignInErrorCode.InvalidToken) {
        return getWebToolJSON(toolUrl, false)
      }
      return Promise.reject(error)
    })
  }

  const [openInvalidItemWarning, setOpenInvalidItemWarning] = React.useState(false)

  const onUtilityChange = async (utilities: ImmutableArray<UseUtility>) => {
    const utility = utilities?.[0]?.asMutable()
    if (utility) {
      if (!esriRequest.current) {
        esriRequest.current = await loadArcGISJSAPIModule('esri/request')
      }
      const utilityJson = utilitiesState[utility.utilityId]
      const toolUrl = `${getUtilityGPTaskUrl(utility.task, utilityJson)}`

      getWebToolJSON(toolUrl).then((toolInfo) => {
        onChange({
          utility,
          toolInfo,
          toolUrl
        })
      }).catch(() => {
        setOpenInvalidItemWarning(true)
        setTimeout(() => {
          setOpenInvalidItemWarning(false)
        }, 3000)
      })
    }
  }

  return (
    <React.Fragment>
      <div className="custom-analysis-tool-selector w-100" css={style} title={translate('addCustomTool')} role='group' aria-label={translate('addCustomTool')}>
        {/* use this button to cover the 'Select utility' button, set 'pointer-events: none' to this button to ignore events */}
        <Button type='primary' className='w-100 select-button' tabIndex={-1}>
          <PlusOutlined size={16} />
          {translate('addCustomTool')}
        </Button>
        <UtilitySelector
          onChange={onUtilityChange}
          showRemove={false}
          showOrgUtility={false}
          closePopupOnSelect
          type={SupportedUtilityType.GPTask}
        />
        <Alert
          className='w-100 mt-2' form="basic" buttonType='tertiary' size='small' closable text={translate('invalidResourceItem')}
          type="warning" withIcon open={openInvalidItemWarning} onClose={() => { setOpenInvalidItemWarning(false) }} />
      </div>
    </React.Fragment>
  )
}

export default CustomAnalysisToolSelector
