import { type IMThemeVariables, css, type SerializedStyles } from 'jimu-core'
export function getStyles (theme: IMThemeVariables): SerializedStyles {
  return css`
    &.jimu-basemap-widget {
      min-width: 240px;
      min-height: 320px;
      .esri-ui-inner-container.esri-ui-corner-container{
        .esri-basemap-gallery.esri-component {
          width:100%;
          background-color: transparent !important;
          .esri-basemap-gallery__item {
            animation: none;
            transition: none;
          }
          .esri-basemap-gallery__item--selected {
            border-color: var(--primary-500);
          }
        }
      }
      .esri-ui-corner .esri-component.esri-widget--panel-height-only {
        max-height: none;
      }
    }
  `
}
