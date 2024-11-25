import { type IMThemeVariables, css, type SerializedStyles, polished } from 'jimu-core'

export function getStyles (theme: IMThemeVariables): SerializedStyles {
  return css`
    &.jimu-widget-basemap-setting {
      display: flex;
      flex-flow: column;
      overflow-y: hidden;
      .custom-list-container {
        position: relative;
        flex: 1;
        overflow: auto;
      }

      .empty-placeholder {
        display: flex;
        flex-flow: column;
        justify-content: center;
        height: calc(100% - 96px);
        overflow: hidden;
        .empty-placeholder-inner {
          padding: 0px 20px;
          flex-direction: column;
          align-items: center;
          display: flex;
          .empty-placeholder-text {
            color: ${theme.colors.palette.dark[500]};
            font-size: ${polished.rem(14)};
            margin-top: 16px;
            text-align: center;
          }
          .empty-placeholder-icon {
            color: ${theme.colors.palette.dark[200]};
          }
        }
      }

      .basemap-list-item {
        display: flex;
        width: calc(100% - 8px);
        align-items: center;
        height: ${polished.rem(76)};
        padding: 0.5rem 0;
        cursor: move;
        .basemap_thumb {
          width: ${polished.rem(80)};
          height: ${polished.rem(60)};
        }
        .basemap-title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          font-size: ${polished.rem(13)};
          line-height: ${polished.rem(17)};
          font-weight: 400;
          width: calc(100% - 120px);
          margin: 0 ${polished.rem(8)};
        }
        .del-btn {
          opacity: 0;
          &:focus {
            opacity: 1;
          }
        }

        &:hover,&:focus,&:active {
          .del-btn {
            opacity: 1;
          }
        }
      }

      .jimu-tree-item__body button {
        z-index: 1;
      }
    }
  `
}

export function getPopperStyles (theme: IMThemeVariables): SerializedStyles {
  return css`
  &.basemap-setting-popper {
    .search-row{
      margin-top: 12px !important;
    }
    .empty-placeholder{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .empty-placeholder-text, .empty-placeholder-icon{
        display: table;
        margin: 0 auto;
      }
      .empty-placeholder-text{
        color: ${theme.colors.palette.dark[500]};
        font-family: 'Avenir Next';
        font-style: normal;
        font-weight: 500;
        line-height: ${polished.rem(19)};;
        font-size: ${polished.rem(14)};
        width: ${polished.rem(228)};
        margin-top: 16px;
        text-align: center;
      }
      .empty-placeholder-icon{
        color: ${theme.colors.palette.dark[200]};
      }
    }
    .item-border-color-selected {
      outline: ${polished.rem(2)} solid ${theme.colors.palette.primary[700]};
    }
    .basemap-items {
      width: 100%;
      .basemap-item {
        position: relative;
        width: calc(50% - 6px);
        min-width:  calc(50% - 6px);
        padding: 0;
        border: 0;
        color: ${theme.colors.palette.dark[200]};
        border-color: transparent;
        background-color: ${theme.colors.palette.light[500]};
        &:nth-of-type(2n) {
          margin-left: 6px;
        }
        &:nth-of-type(2n+1) {
          margin-right: 6px;
        }
        align-items: center;

        margin-bottom: ${polished.rem(10)};
        &:hover {
          outline: ${polished.rem(2)} solid ${theme.colors.palette.primary[700]};
        }
        img {
          width: 100%;
          height: ${polished.rem(81)};
          background-color: ${theme.colors.palette.light[600]};
        }
        .basemap-title {
          overflow: hidden;
          font-size: ${polished.rem(12)};
          line-height: ${polished.rem(16)};
          font-weight: 400;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          width: calc(100% - 8px);
          height: ${polished.rem(33)};
          margin: 4px 4px 8px 4px;
          color: ${theme.colors.palette.dark[800]};
        }
        .item-active-icon, .item-part-active-icon {
          position: absolute;
          top: -2px;
          right: -2px;

          .item-active-icon-container, .item-part-active-icon-container {
            width: ${polished.rem(18)};
            height: ${polished.rem(18)};
            line-height: ${polished.rem(18)};
            color: ${theme.colors.secondary};
            background-color: ${theme.colors.palette.primary[700]};
          }
          .item-part-active-icon-container {
            padding: ${polished.rem(2)};
          }
        }
        .item-part-active-icon-container {
          .item-part-active-icon-innerbox {
            width: ${polished.rem(18)};
            height: ${polished.rem(18)};
            background-color: ${theme.colors.palette.secondary[300]};
            >div {
              width: ${polished.rem(10)};
              height: ${polished.rem(10)};
              border-radius: ${polished.rem(1)};
              background-color: ${theme.colors.palette.primary[700]};
            }
          }
        }
      }
    }
  }
`
}
