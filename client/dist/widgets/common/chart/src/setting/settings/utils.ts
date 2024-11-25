import { React, DataSourceManager, type FeatureLayerDataSource, DataSourceTypes, type SceneLayerDataSource, type DataSource, hooks } from 'jimu-core'

/**
 * Check if the data source supports `percentile` statistics.
 * @param dataSourceId
 */
export const usePercentileStatisticsSupport = (dataSourceId: string): boolean => {
  const supportPercentile = React.useMemo(() => {
    if (!dataSourceId) return false
    let dataSource: FeatureLayerDataSource = DataSourceManager.getInstance().getDataSource(dataSourceId) as FeatureLayerDataSource
    if (!dataSource) return false
    if ((dataSource as DataSource).type === DataSourceTypes.SceneLayer) {
      dataSource = (dataSource as unknown as SceneLayerDataSource).getAssociatedDataSource()
    }
    const capabilities = dataSource?.getCapabilities?.()?.getQueryCapabilities()
    return (capabilities as any)?.supportsPercentileStatistics ?? false
  }, [dataSourceId])

  return supportPercentile
}

/**
 * Get the latest value of `defaultValue`.
 * @param defaultValue
 */
export const useLatestDefaultValue = <T>(defaultValue: T): [ T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = React.useState<T>(defaultValue)
  const valueRef = hooks.useLatest(value)

  React.useEffect(() => {
    if (defaultValue !== valueRef.current) {
      setValue(defaultValue)
    }
  }, [defaultValue, valueRef])

  return [value, setValue]
}
