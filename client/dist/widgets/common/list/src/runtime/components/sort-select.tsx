/** @jsx jsx */
import { React, jsx, type ImmutableArray, type IMThemeVariables, defaultMessages as jimuCoreDefaultMessage, Immutable, appActions, type DataSource, hooks, ReactRedux, type IMState } from 'jimu-core'
import { defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { type SortSettingOption } from 'jimu-ui/advanced/setting-components'
import defaultMessage from '../translations/default'
import MyDropDown, { type MyDropDownItem } from './my-dropdown'
import { useTheme } from 'jimu-theme'
const { useEffect, useState, useRef } = React
const { useSelector } = ReactRedux
interface Props {
  handleSortOptionChange: (label: string) => void
  sorts: ImmutableArray<SortSettingOption>
  sortOptionName: string
  datasource: DataSource
  dispatch: any
  id: string
  showSortString: boolean
}

const SortSelect = (props: Props) => {
  const theme = useTheme()
  const appMode = useSelector((state: IMState) => state?.appRuntimeInfo?.appMode)
  const widgetsState = useSelector((state: IMState) => state?.widgetsState)
  const sortItemsRef = useRef<ImmutableArray<MyDropDownItem>>(null)

  const nls = hooks.useTranslation(defaultMessage, jimuiDefaultMessage, jimuCoreDefaultMessage)
  const { handleSortOptionChange, dispatch, sorts, datasource, sortOptionName, id, showSortString } = props

  const [sortItems, setSortItems] = useState(null as ImmutableArray<MyDropDownItem>)

  useEffect(() => {
    getSortItems()
  }, [sorts])

  useEffect(() => {
    updateWidgetStateOfList()
  }, [])

  const handleSortChange = (evt, item: MyDropDownItem) => {
    handleSortOptionChange(item?.label)
    updateWidgetStateOfList()
  }

  const updateWidgetStateOfList = () => {
    for (const widgetId in widgetsState) {
      if (widgetsState[widgetId]?.listWidget && widgetsState[widgetId]?.dsId === datasource?.id) {
        const activeSort = (id === widgetId)
        dispatch(appActions.widgetStatePropChange(widgetId, 'activeSort', activeSort))
      }
    }
  }

  const getSortItems = () => {
    const options = [] as any
    if (sorts) {
      sorts.forEach(sort => {
        sort.rule &&
          sort.rule.forEach(sortData => {
            if (sortData && !!sortData.jimuFieldName) {
              options.push({
                label: sort.ruleOptionName,
                event: handleSortChange
              })
            }
          })
      })
    }
    sortItemsRef.current = Immutable(options)
    setSortItems(Immutable(options))
  }

  const getSortContent = hooks.useEventCallback((theme?: IMThemeVariables) => {
    if (showSortString) {
      return nls('listSort')
    }

    if (!sortOptionName) {
      return sortItemsRef.current?.[0]?.label
    } else {
      return sortOptionName
    }
  })

  return (
    <div className='list-sort-con'>
      <MyDropDown
        theme={theme}
        items={sortItems}
        appMode={appMode}
        toggleType='tertiary'
        toggleArrow={true}
        toggleContent={getSortContent}
        size='sm'
        showActive
        toggleTitle={nls('listSort')}
        activeLabel={getSortContent()}
      />
    </div>
  )
}

export default SortSelect
