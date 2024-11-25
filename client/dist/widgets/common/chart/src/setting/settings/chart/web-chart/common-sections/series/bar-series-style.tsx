import { React, type ImmutableObject, classNames, hooks } from 'jimu-core'
import { type ISimpleFillSymbol } from '@esri/arcgis-rest-types'
import { TextInput, defaultMessages as jimuMessages } from 'jimu-ui'
import defaultMessages from '../../../../../translations/default'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FillSymbolSetting } from '../../components'
import { type WebChartSeries } from '../../../../../../config'
import { SeriesColors } from '../../../../../../utils/default'

interface BarSeriesStyleProps {
  className?: string
  defaultFillColor: string
  defaultLineColor: string
  serie: ImmutableObject<WebChartSeries>
  onChange?: (serie: ImmutableObject<WebChartSeries>) => void
}

const presetSeriesColors = SeriesColors.map((color) => ({
  label: color,
  value: color,
  color: color
}))

export const BarSeriesStyle = (props: BarSeriesStyleProps): React.ReactElement => {
  const { className, serie, defaultFillColor, defaultLineColor, onChange } = props
  const translate = hooks.useTranslation(defaultMessages, jimuMessages)

  const handleLabelChange = (value: string): void => {
    onChange?.(serie.set('name', value))
  }

  const handleFillSymbolChange = (
    value: ImmutableObject<ISimpleFillSymbol>
  ): void => {
    onChange?.(serie.set('fillSymbol', value))
  }

  return (
    <div className={classNames('bar-series-style w-100', className)}>
      <SettingRow label={translate('label')} flow='no-wrap'>
        <TextInput
          size='sm'
          aria-label={translate('label')}
          className='w-50'
          defaultValue={serie?.name ?? ''}
          onAcceptValue={handleLabelChange}
        />
      </SettingRow>
      <SettingRow label={translate('symbol')} flow='wrap'>
        <FillSymbolSetting
          defaultFillColor={defaultFillColor}
          defaultLineColor={defaultLineColor}
          presetFillColors={presetSeriesColors}
          value={(serie as any)?.fillSymbol}
          onChange={handleFillSymbolChange}
        />
      </SettingRow>
    </div>
  )
}
