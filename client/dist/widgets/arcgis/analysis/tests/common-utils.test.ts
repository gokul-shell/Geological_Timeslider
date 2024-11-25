import { EsriFieldType } from 'jimu-core'
import { getAnalysisFieldTypeByEsriType } from '../src/utils/util'

describe('Common utils test', () => {
  it('test getAnalysisFieldTypeByEsriType', () => {
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.Blob)).toBe('blob')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.Date)).toBe('date')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.Double)).toBe('double')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.GUID)).toBe('guid')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.Geometry)).toBe('geometry')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.GlobalID)).toBe('global-id')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.Integer)).toBe('integer')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.OID)).toBe('oid')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.Raster)).toBe('raster')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.Single)).toBe('single')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.SmallInteger)).toBe('small-integer')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.String)).toBe('string')
    expect(getAnalysisFieldTypeByEsriType(EsriFieldType.XML)).toBe('xml')

    expect(getAnalysisFieldTypeByEsriType('xml' as any)).toBe('xml')
    expect(getAnalysisFieldTypeByEsriType('abc-def' as any)).toBe('abc-def')
  })
})
