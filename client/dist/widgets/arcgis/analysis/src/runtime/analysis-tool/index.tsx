/** @jsx jsx */
import {
  React, jsx
} from 'jimu-core'
import { type ToolProps } from './config'
import StandardTool from './standard-tool'
import CustomTool from './custom-tool'
import { ToolType } from '../../config'
import { useAnalysisComponentDefined } from '../../utils/util'
import { useShowToolDetail } from '../utils'
import { Loading } from 'jimu-ui'
import ToolError from './error'

const AnalysisTool = (props: ToolProps) => {
  const { toolInfo, disableBack, signIn, onBack } = props

  const defined = useAnalysisComponentDefined('analysis-tool')

  const { showToolDetail, showError } = useShowToolDetail(signIn, toolInfo)

  const renderTool = () => {
    return toolInfo.type === ToolType.Standard
      ? <StandardTool {...props} />
      : <CustomTool {...props} />
  }

  return showError
    ? <ToolError onBack={onBack} disableBack={disableBack} />
    : defined && showToolDetail
      ? renderTool()
      : <Loading />
}

export default AnalysisTool
