/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { React, jsx, Immutable, hooks, ImmutableObject, css } from 'jimu-core'
import { AnalysisToolParamDataType, type GPLinearUnit, type AnalysisToolParam } from 'analysis-ui-schema'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../translations/default'
import { CollapsablePanel, defaultMessages as jimuiDefaultMessage, Label, Radio, TextInput } from 'jimu-ui'
import LayerInputTypeConfig, { type LayerInputType } from './layer-input-type-config'
import { type AnalysisLinearUnitInputCustomEvent, type AnalysisNumberInputCustomEvent, type AnalysisStringInputCustomEvent } from 'analysis-components'
import { type CustonToolParam } from '../../config'
import { DatePicker } from 'jimu-ui/basic/date-picker'
import { getUnitChioceListAndLabels } from '../../utils/util'

const { useState, useEffect } = React

interface GPTypeConfigProps {
  parameter: Immutable.ImmutableObject<AnalysisToolParam>
  translate: ReturnType<typeof hooks.useTranslation>
  onChange: (parameter: Immutable.ImmutableObject<AnalysisToolParam>) => void
}

const GPFeatureRecordSetlayerInputConfig = (props: GPTypeConfigProps) => {
  const { parameter, translate, onChange } = props

  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const handleLayerInputTypeConfigChange = (key: LayerInputType, checked: boolean) => {
    if (key === 'allowBrowserLayers') {
      onChange(parameter.set('hideBrowseButton', !checked))
    }
    if (key === 'selectFromMapLayer') {
      onChange(parameter.set('selectFromMapLayer', checked))
    }
  }

  return (
    <React.Fragment>
      <SettingRow className='mt-2 label-drak-400 last-setting-row' label={translate('inputBy')} flow='wrap' role='group' aria-label={translate('inputBy')}>
        <LayerInputTypeConfig show={{ allowDrawingOnTheMap: false, allowLocalFileUpload: false, allowServiceUrl: false, selectFromOtherWidget: false }} checked={{ allowBrowserLayers: !(parameter as ImmutableObject<CustonToolParam>).hideBrowseButton, selectFromMapLayer: (parameter as ImmutableObject<CustonToolParam>).selectFromMapLayer }} onChange={handleLayerInputTypeConfigChange} />
      </SettingRow>
    </React.Fragment>
  )
}

const GPBooleanConfig = (props: GPTypeConfigProps) => {
  const { parameter, translate, onChange } = props

  return (
    <React.Fragment>
      <SettingRow className='mt-2 label-drak-400 last-setting-row' label={translate('defaultValue')} flow='wrap' role='group' aria-label={translate('defaultValue')}>
        <Label className='d-flex align-items-center w-100'>
          <Radio className='mr-2' onChange={() => { onChange(parameter.set('defaultValue', true)) }} checked={parameter.defaultValue === true} />
          {translate('trueKey')}
        </Label>
        <Label className='d-flex align-items-center w-100'>
          <Radio className='mr-2' onChange={() => { onChange(parameter.set('defaultValue', false)) }} checked={parameter.defaultValue === false} />
          {translate('falseKey')}
        </Label>
      </SettingRow>
    </React.Fragment>
  )
}

const GPStringConfig = (props: GPTypeConfigProps) => {
  const { parameter, translate, onChange } = props

  const [stringInputRef, setStringInputRef] = useState<HTMLAnalysisStringInputElement>()
  const [inputEvent, setInputEvent] = useState<AnalysisStringInputCustomEvent<any>>()

  useEffect(() => {
    if (inputEvent) {
      onChange(parameter.set('defaultValue', inputEvent.target.value))
    }
  }, [inputEvent])

  const updateStringInputProps = () => {
    if (stringInputRef) {
      stringInputRef.value = parameter.defaultValue as string | string[]
      stringInputRef.selectionMode = parameter.dataType === AnalysisToolParamDataType.GPMultiValueString ? 'multi' : 'single'
      stringInputRef.choiceList = parameter.choiceList as unknown as string[]
    }
  }

  useEffect(() => {
    updateStringInputProps()
  }, [parameter])

  useEffect(() => {
    if (stringInputRef) {
      stringInputRef.label = ''
      stringInputRef.addEventListener('analysisStringInputChange', (e: AnalysisStringInputCustomEvent<any>) => {
        setInputEvent(e)
      })
      updateStringInputProps()
    }
  }, [stringInputRef])

  return (
    <React.Fragment>
      <SettingRow className='mt-2 label-drak-400 last-setting-row' label={translate('defaultValue')} flow='wrap' role='group' aria-label={translate('defaultValue')}>
        <analysis-string-input ref={setStringInputRef} {...parameter}></analysis-string-input>
      </SettingRow>
    </React.Fragment>
  )
}

const GPNumberConfig = (props: GPTypeConfigProps) => {
  const { parameter, translate, onChange } = props
  const [numberInputRef, setNumberInputRef] = useState<HTMLAnalysisNumberInputElement>()
  const [inputEvent, setInputEvent] = useState<AnalysisNumberInputCustomEvent<any>>()

  useEffect(() => {
    if (inputEvent) {
      onChange(parameter.set('defaultValue', inputEvent.target.value))
    }
  }, [inputEvent])

  const updateNumberInputProps = () => {
    if (numberInputRef) {
      numberInputRef.numberType = parameter.dataType === AnalysisToolParamDataType.GPLong ? 'integer' : 'float'
      numberInputRef.choiceList = parameter.choiceList?.asMutable().map(parseFloat).filter(isFinite)
      numberInputRef.selectionMode = parameter.dataType === AnalysisToolParamDataType.GPMultiValueDouble ? 'multi' : 'single'
      numberInputRef.value = parameter.defaultValue as number | number[]
    }
  }

  useEffect(() => {
    updateNumberInputProps()
  }, [parameter])

  useEffect(() => {
    if (numberInputRef) {
      numberInputRef.label = ''
      numberInputRef.addEventListener('analysisNumberInputChange', (e: AnalysisNumberInputCustomEvent<any>) => {
        setInputEvent(e)
      })
      updateNumberInputProps()
    }
  }, [numberInputRef])

  return (
    <React.Fragment>
      <SettingRow className='mt-2 label-drak-400 last-setting-row' label={translate('defaultValue')} flow='wrap' role='group' aria-label={translate('defaultValue')}>
        <analysis-number-input ref={setNumberInputRef} {...parameter}></analysis-number-input>
      </SettingRow>
    </React.Fragment>
  )
}

const GPDateConfig = (props: GPTypeConfigProps) => {
  const { parameter, translate, onChange } = props
  return (
    <React.Fragment>
      <SettingRow className='mt-2 label-drak-400 last-setting-row' label={translate('defaultValue')} flow='wrap' role='group' aria-label={translate('defaultValue')}>
        <DatePicker css={css`flex: 1`} format="shortDateLongTime" isTimeLong
          showTimeInput strategy="absolute" runtime={false} showDoneButton
          onChange={(value) => { onChange(parameter.set('defaultValue', value)) }}
          selectedDate={parameter.defaultValue ? new Date(parameter.defaultValue as number) : undefined}
        />
      </SettingRow>
    </React.Fragment>
  )
}

const GPLinearUnitConfig = (props: GPTypeConfigProps) => {
  const { parameter, translate, onChange } = props

  const [linearUnitInputRef, setLinearUnitInputRef] = useState<HTMLAnalysisLinearUnitInputElement>()
  const [inputEvent, setInputEvent] = useState<AnalysisLinearUnitInputCustomEvent<any>>()

  useEffect(() => {
    if (inputEvent) {
      onChange(parameter.set('defaultValue', inputEvent.target.value))
    }
  }, [inputEvent])

  const updateLinearUnitInputProps = () => {
    if (!linearUnitInputRef) {
      return
    }
    linearUnitInputRef.value = parameter.defaultValue as Partial<GPLinearUnit>

    const { unitChoiceList, choiceListLabels } = getUnitChioceListAndLabels(translate)
    linearUnitInputRef.unitChoiceList = parameter.choiceList ? parameter.choiceList.asMutable() : unitChoiceList
    linearUnitInputRef.choiceListLabels = choiceListLabels
  }

  useEffect(() => {
    updateLinearUnitInputProps()
  }, [parameter])

  useEffect(() => {
    if (linearUnitInputRef) {
      linearUnitInputRef.label = ''
      linearUnitInputRef.addEventListener('analysisLinearUnitInputChange', (e: AnalysisLinearUnitInputCustomEvent<any>) => {
        setInputEvent(e)
      })
      updateLinearUnitInputProps()
    }
  }, [linearUnitInputRef])
  return (
    <React.Fragment>

      <SettingRow className='mt-2 label-drak-400 last-setting-row' label={translate('defaultValue')} flow='wrap' role='group' aria-label={translate('defaultValue')}>
        <analysis-linear-unit-input ref={setLinearUnitInputRef} {...parameter} />
      </SettingRow>
    </React.Fragment>
  )
}

const GPTypeConfigByGPType = new Map<AnalysisToolParamDataType, (props: GPTypeConfigProps) => jsx.JSX.Element>([
  // [AnalysisToolParamDataType.GPFeatureRecordSetLayer, GPFeatureRecordSetlayerInputConfig],
  // [AnalysisToolParamDataType.GPMultiValueFeatureRecordSetLayer, GPFeatureRecordSetlayerInputConfig],
  // [AnalysisToolParamDataType.GPRecordSet, GPFeatureRecordSetlayerInputConfig],
  [AnalysisToolParamDataType.GPBoolean, GPBooleanConfig],
  [AnalysisToolParamDataType.GPString, GPStringConfig],
  [AnalysisToolParamDataType.GPMultiValueString, GPStringConfig],
  [AnalysisToolParamDataType.GPLong, GPNumberConfig],
  [AnalysisToolParamDataType.GPDouble, GPNumberConfig],
  [AnalysisToolParamDataType.GPMultiValueDouble, GPNumberConfig],
  [AnalysisToolParamDataType.GPDate, GPDateConfig],
  [AnalysisToolParamDataType.GPLinearUnit, GPLinearUnitConfig]
])

interface Props {
  className?: string
  parameters: Immutable.ImmutableArray<AnalysisToolParam>
  onChange: (parameters: AnalysisToolParam[]) => void
}

const style = css`
  --analysis-ui-border-input: var(--light-200);
  --calcite-ui-foreground-1: var(--light-200);
  --calcite-ui-foreground-2: var(--primary-500);
  --calcite-ui-brand: var(--primary-700);
  --calcite-font-size--2: 0.8125rem;
  --calcite-ui-text-3: var(--dark-800);
`

const CustomToolInputConfig = (props: Props) => {
  const { className, parameters, onChange } = props
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessage)

  const handleParameterChange = (parameter: Immutable.ImmutableObject<AnalysisToolParam>, index: number) => {
    const newParameters = [...parameters]
    newParameters[index] = parameter.asMutable({ deep: true })
    onChange(newParameters)
  }
  return (
    <div className={className} css={style}>
      {parameters.map((parameter, index) => {
        const ConfigComponent = GPTypeConfigByGPType.get(parameter.dataType)
        return parameter.direction === 'esriGPParameterDirectionInput'
          ? <CollapsablePanel className='parameter-setting-collapse' label={parameter.displayName || parameter.name} aria-label={parameter.displayName || parameter.name} type="default" defaultIsOpen={false} key={parameter.name}>
              <SettingRow className='pt-3 dark-600'>{`${translate('type')}: ${parameter.dataType}`}</SettingRow>
              <SettingRow className='mt-2 dark-600'>{`${translate('required')}: ${translate(parameter.parameterType === 'esriGPParameterTypeRequired' ? 'trueKey' : 'falseKey')}`}</SettingRow>
              <SettingRow className={`mt-2 label-drak-400 ${ConfigComponent ? '' : 'last-setting-row'}`} label={translate('label')} flow='wrap' role='group' aria-label={translate('label')}>
                <TextInput size='sm' className='w-100' value={parameter.displayName} onChange={(e) => { handleParameterChange(parameter.set('displayName', e.target.value), index) }} />
              </SettingRow>
              {ConfigComponent && <ConfigComponent parameter={parameter} translate={translate} onChange={(newParameter) => { handleParameterChange(newParameter, index) }}></ConfigComponent>}
            </CollapsablePanel>
          : null
      })}
    </div>
  )
}

export default CustomToolInputConfig
