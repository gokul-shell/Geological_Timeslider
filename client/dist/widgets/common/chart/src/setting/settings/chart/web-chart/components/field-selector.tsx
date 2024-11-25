/** @jsx jsx */
import {
  React,
  jsx,
  css,
  Immutable,
  JimuFieldType,
  type ImmutableArray,
  type UseDataSource,
  type IMFieldSchema,
  DataSourceManager
} from 'jimu-core'
import { type SelectProps } from 'jimu-ui'
import { FieldSelector as JimuFieldSelector } from 'jimu-ui/advanced/data-source-selector'

export type FieldSelectorType = 'numeric' | 'data' | 'category'

const getFieldSelectorType = (type: FieldSelectorType, hideDateField?: boolean): ImmutableArray<JimuFieldType> => {
  switch (type) {
    case 'numeric':
      return Immutable([JimuFieldType.Number])
    case 'data':
      return Immutable([JimuFieldType.Date])
    case 'category':
      if (hideDateField) {
        return Immutable([JimuFieldType.String, JimuFieldType.Number])
      } else {
        return Immutable([JimuFieldType.String, JimuFieldType.Date, JimuFieldType.Number])
      }
    default:
  }
}

export interface FieldSelectorProps {
  'aria-label'?: string
  className?: string
  style?: any
  type: FieldSelectorType
  useDataSources: ImmutableArray<UseDataSource>
  fields?: ImmutableArray<string>
  isMultiple: boolean
  showEmptyItem?: boolean
  disabled?: boolean
  hideIdField?: boolean
  hideDateField?: boolean
  onChange?: (fields: ImmutableArray<string>, fieldSchemas?: IMFieldSchema[]) => void
}

const serializedStyle = css`
  .component-field-selector {
    .jimu-advanced-select {
      > .dropdown{
        > .dropdown-button {
          justify-content: flex-end;
        }
      }
    }
  }
`

export const FieldSelector = (props: FieldSelectorProps): React.ReactElement => {
  const {
    className,
    style,
    type,
    useDataSources,
    showEmptyItem,
    disabled,
    hideIdField = false,
    hideDateField = false,
    isMultiple,
    fields,
    'aria-label': ariaLabel,
    onChange
  } = props

  const dataSourceId = useDataSources?.[0]?.dataSourceId

  const hiddenFields = React.useMemo(() => {
    if (!dataSourceId || !hideIdField) return
    const idField = DataSourceManager.getInstance().getDataSource(dataSourceId)?.getIdField()
    if (idField) return Immutable([idField])
  }, [hideIdField, dataSourceId])

  const suportedType = React.useMemo(() => getFieldSelectorType(type, hideDateField), [hideDateField, type])

  const noSelectionItem = React.useMemo(() => showEmptyItem ? { name: '' } : undefined, [showEmptyItem])
  const dropdownProps: SelectProps = React.useMemo(() => ({ disabled, size: 'sm' }), [disabled])

  const handleChange = (fieldSchemas: IMFieldSchema[]): void => {
    const fields = fieldSchemas.map(e => e.jimuName)
    onChange?.(Immutable(fields), fieldSchemas)
  }

  return (
    <JimuFieldSelector
      aria-label={ariaLabel}
      css={serializedStyle}
      className={className}
      style={style}
      types={suportedType}
      hiddenFields={hiddenFields}
      noSelectionItem={noSelectionItem}
      dropdownProps={dropdownProps}
      isMultiple={isMultiple}
      isDataSourceDropDownHidden
      isSearchInputHidden={false}
      useMultiDropdownBottomTools={true}
      useDropdown={true}
      useDataSources={useDataSources}
      selectedFields={fields}
      onChange={handleChange}
    />
  )
}
