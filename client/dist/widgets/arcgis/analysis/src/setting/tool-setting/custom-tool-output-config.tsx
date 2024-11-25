/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { React, jsx, Immutable, hooks, useIntl, dateUtils, EsriDateFormats } from 'jimu-core'
import { AnalysisToolParamDataType, type AnalysisToolParam } from 'analysis-ui-schema'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../translations/default'
import { Checkbox, CollapsablePanel, defaultMessages as jimuiDefaultMessage, Label, NumericInput, Option, Select, Switch, TextInput } from 'jimu-ui'
import { type CustomToolOutput } from '../../config'

export const dateFormats = [
  { format: 'shortDate', hasTimeFormat: true },
  { format: 'longMonthDayYear', hasTimeFormat: true },
  { format: 'dayShortMonthYear', hasTimeFormat: true },
  { format: 'longDate', hasTimeFormat: true },
  { format: 'longMonthYear', hasTimeFormat: false },
  { format: 'shortMonthYear', hasTimeFormat: false },
  { format: 'year', hasTimeFormat: false }
] as Array<{ format: EsriDateFormats, hasTimeFormat: boolean }>

export const timeFormats = ['ShortTime', 'LongTime', 'ShortTime24', 'LongTime24']

interface GPTypeConfigProps {
  parameterName: string
  output: Immutable.ImmutableObject<CustomToolOutput>
  translate: ReturnType<typeof hooks.useTranslation>
  onChange: (output: Immutable.ImmutableObject<CustomToolOutput>) => void
}

const GPNumberConfig = (props: GPTypeConfigProps) => {
  const { parameterName, output, translate, onChange } = props
  const handleDecimalPlaceChange = (value: number) => {
    onChange(value !== undefined ? output.setIn(['decimalPlace', parameterName], value) : output.without('decimalPlace'))
  }
  return (
    <React.Fragment>
      <SettingRow className='mt-2 label-drak-400 last-setting-row' label={translate('decimalPlace')} flow='wrap' role='group' aria-label={translate('decimalPlace')}>
        <NumericInput className='w-100' min={0} value={output.decimalPlace[parameterName]} onChange={handleDecimalPlaceChange} />
      </SettingRow>
    </React.Fragment>
  )
}

const GPDateConfig = (props: GPTypeConfigProps) => {
  const { parameterName, output, translate, onChange } = props
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>, name: 'dateFormat' | 'timeFormat') => {
    const value = e.target.value
    let newOutput = value ? output.setIn([name, parameterName], value) : output.set(name, output[name]?.without(parameterName))
    if (name === 'dateFormat' && !dateFormats.find((format) => format.format === value)?.hasTimeFormat) {
      newOutput = newOutput.set('timeFormat', newOutput.timeFormat?.without(parameterName))
    }
    onChange(newOutput)
  }

  const intl = useIntl()

  const dateFormatOptions = React.useMemo(() => {
    const date = new Date('December 31, 1969 18:00:00')
    return dateFormats.map((format) => ({ ...format, label: dateUtils.formatDateField(date, format.format, intl) }))
  }, [intl])

  const timeFormatOptions = React.useMemo(() => (timeFormats.map((format) => ({ label: translate(format), format }))), [translate])

  const displayShowTimeSwitch = React.useMemo(() => {
    if (!output.dateFormat?.[parameterName]) {
      return true
    }
    return dateFormats.find((format) => format.format === output.dateFormat?.[parameterName])?.hasTimeFormat
  }, [output.dateFormat, parameterName])

  const handleShowTimeChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange(checked ? output.setIn(['timeFormat', parameterName], 'ShortTime') : output.set('timeFormat', output.timeFormat?.without(parameterName)))
  }

  return (
    <React.Fragment>
      <SettingRow className={`mt-2 label-drak-400 ${displayShowTimeSwitch ? '' : 'last-setting-row'}`} label={translate('dateFormat')} flow='wrap' role='group' aria-label={translate('dateFormat')}>
        <Select onChange={(e) => { handleFormatChange(e, 'dateFormat') }} value={output.dateFormat?.[parameterName] || 'shortDate'}>
          {dateFormatOptions.map((option) => {
            return <Option value={option.format} key={option.format}>{option.label}</Option>
          })}
        </Select>
      </SettingRow>
      {displayShowTimeSwitch && <SettingRow className={`mt-2 ${output.timeFormat?.[parameterName] ? '' : 'last-setting-row'}`} label={translate('showTime')} flow='no-wrap'>
        <Switch checked={!!output.timeFormat?.[parameterName]} aria-label={translate('showTime')} onChange={handleShowTimeChange}/>
      </SettingRow>}
      {output.timeFormat?.[parameterName] && <SettingRow className='mt-2 label-drak-400 last-setting-row' label={translate('timeFormat')} flow='wrap' role='group' aria-label={translate('timeFormat')}>
        <Select onChange={(e) => { handleFormatChange(e, 'timeFormat') }} value={output.timeFormat?.[parameterName]}>
          {timeFormatOptions.map((option) => {
            return <Option value={option.format} key={option.format}>{option.label}</Option>
          })}
        </Select>
      </SettingRow>}
    </React.Fragment>
  )
}

const GPTypeConfigByGPType = new Map<AnalysisToolParamDataType, (props: GPTypeConfigProps) => jsx.JSX.Element>([
  [AnalysisToolParamDataType.GPDouble, GPNumberConfig],
  [AnalysisToolParamDataType.GPMultiValueDouble, GPNumberConfig],
  [AnalysisToolParamDataType.GPDate, GPDateConfig]
])

interface Props {
  className?: string
  parameters: Immutable.ImmutableArray<AnalysisToolParam>
  output: Immutable.ImmutableObject<CustomToolOutput>
  onParameterChange: (parameters: AnalysisToolParam[]) => void
  onOuputChange: (output: CustomToolOutput) => void
}

const CustomToolOutputConfig = (props: Props) => {
  const { className, parameters, output, onParameterChange, onOuputChange } = props
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessage)

  const handleParameterChange = (parameter: Immutable.ImmutableObject<AnalysisToolParam>, index: number) => {
    const newParameters = [...parameters]
    newParameters[index] = parameter.asMutable({ deep: true })
    onParameterChange(newParameters)
  }

  const handleOutputChange = (output: Immutable.ImmutableObject<CustomToolOutput>) => {
    onOuputChange(output.asMutable({ deep: true }))
  }

  const shouldShowAllowExportResults = (parameterType: AnalysisToolParamDataType) => {
    return ([
      AnalysisToolParamDataType.GPFeatureRecordSetLayer,
      AnalysisToolParamDataType.GPMultiValueFeatureRecordSetLayer,
      AnalysisToolParamDataType.GPRecordSet,
      AnalysisToolParamDataType.GPMultiValueRecordSet
    ] as AnalysisToolParamDataType[]).includes(parameterType)
  }

  return (
    <div className={className}>
      {parameters.map((parameter, index) => {
        const ConfigComponent = GPTypeConfigByGPType.get(parameter.dataType)
        const showAllowExportResults = shouldShowAllowExportResults(parameter.dataType)
        const allowExport = output.allowExport[parameter.name] === undefined ? true : output.allowExport[parameter.name]
        const addResultLayersToMapAuto = !!output.addResultLayersToMapAuto?.[parameter.name]
        return parameter.direction === 'esriGPParameterDirectionOutput'
          ? <CollapsablePanel className='parameter-setting-collapse' label={parameter.displayName || parameter.name} aria-label={parameter.displayName || parameter.name} type="default" defaultIsOpen={false} key={parameter.name}>
              <SettingRow className='pt-3 dark-600'>{`${translate('type')}: ${parameter.dataType}`}</SettingRow>
              <SettingRow className='mt-2 dark-600'>{`${translate('required')}: ${translate(parameter.parameterType === 'esriGPParameterTypeRequired' ? 'trueKey' : 'falseKey')}`}</SettingRow>
              <SettingRow className='mt-2 label-drak-400' label={translate('label')} flow='wrap' role='group' aria-label={translate('label')}>
                <TextInput size='sm' className='w-100' value={parameter.displayName} onChange={(e) => { handleParameterChange(parameter.set('displayName', e.target.value), index) }} />
              </SettingRow>
              <SettingRow className={`mt-2 label-drak-400 ${ConfigComponent || showAllowExportResults ? '' : 'last-setting-row'}`}>
                <Label>
                  <Checkbox className='mr-2' checked={output.ignored[parameter.name]} onChange={(e, checked) => { handleOutputChange(output.setIn(['ignored', parameter.name], checked)) }} />
                  {translate('ignoreThisOutput')}
                </Label>
              </SettingRow>
              {ConfigComponent && <ConfigComponent parameterName={parameter.name} output={output} translate={translate} onChange={handleOutputChange}></ConfigComponent>}
              {showAllowExportResults && <SettingRow className='mt-2 last-setting-row' label={translate('allowToExportResults')} flow='no-wrap'>
                <Switch checked={allowExport} aria-label={translate('allowToExportResults')} onChange={(e, checked) => { handleOutputChange(output.setIn(['allowExport', parameter.name], checked)) }} />
              </SettingRow>}
              {showAllowExportResults && <SettingRow className='mt-2 last-setting-row' label={translate('addResultLayersToMapAuto')} flow='no-wrap'>
                <Switch checked={addResultLayersToMapAuto} aria-label={translate('addResultLayersToMapAuto')} onChange={(e, checked) => { handleOutputChange(output.setIn(['addResultLayersToMapAuto', parameter.name], checked)) }} />
              </SettingRow>}
            </CollapsablePanel>
          : null
      })}
    </div>
  )
}

export default CustomToolOutputConfig
