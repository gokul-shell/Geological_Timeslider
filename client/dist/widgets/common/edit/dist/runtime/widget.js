System.register(["jimu-core","jimu-arcgis","jimu-ui","esri/widgets/FeatureForm","esri/widgets/Editor","esri/layers/FeatureLayer","esri/form/FormTemplate","esri/form/elements/FieldElement","esri/form/elements/GroupElement","esri/Graphic","esri/rest/support/Query","esri/core/reactiveUtils"],(function(e,t){var i={},s={},a={},o={},r={},l={},n={},d={},u={},c={},p={},h={};return{setters:[function(e){i.BaseVersionManager=e.BaseVersionManager,i.DataSourceComponent=e.DataSourceComponent,i.DataSourceManager=e.DataSourceManager,i.DataSourceStatus=e.DataSourceStatus,i.Immutable=e.Immutable,i.React=e.React,i.SupportedLayerServiceTypes=e.SupportedLayerServiceTypes,i.appActions=e.appActions,i.classNames=e.classNames,i.css=e.css,i.dataSourceUtils=e.dataSourceUtils,i.defaultMessages=e.defaultMessages,i.esri=e.esri,i.jsx=e.jsx,i.lodash=e.lodash,i.polished=e.polished,i.privilegeUtils=e.privilegeUtils},function(e){s.JimuMapViewComponent=e.JimuMapViewComponent},function(e){a.Button=e.Button,a.Select=e.Select,a.TextInput=e.TextInput,a.WidgetPlaceholder=e.WidgetPlaceholder,a.defaultMessages=e.defaultMessages},function(e){o.default=e.default},function(e){r.default=e.default},function(e){l.default=e.default},function(e){n.default=e.default},function(e){d.default=e.default},function(e){u.default=e.default},function(e){c.default=e.default},function(e){p.default=e.default},function(e){h.default=e.default}],execute:function(){e((()=>{var e={94127:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 400 400"><path fill="#A8A8A8" fill-rule="evenodd" d="M193 10H10v28h183V10Zm197 53H10v2h380v-2ZM10 299h380v2H10v-2Zm142-196H25v22h127v-22Zm235.99-11H12.01v44h375.98V92ZM10 90v48h380V90H10Zm348 38c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14ZM25 171h127v22H25v-22Zm-12.99-11h375.98v44H12.01v-44ZM10 206v-48h380v48H10Zm362-24c0 7.732-6.268 14-14 14s-14-6.268-14-14 6.268-14 14-14 14 6.268 14 14Zm-220 57H25v22h127v-22Zm235.99-11H12.01v44h375.98v-44ZM10 226v48h380v-48H10Zm348 38c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14Zm-188 62H10v22h160v-22Zm209 2h-18a9 9 0 0 0-9 9 9 9 0 0 0 9 9h18a9 9 0 0 0 9-9 9 9 0 0 0-9-9Zm-18-2c-6.075 0-11 4.925-11 11s4.925 11 11 11h18c6.075 0 11-4.925 11-11s-4.925-11-11-11h-18Zm25 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM10 367h160v22H10v-22Zm351 2h18a9 9 0 0 1 9 9 9 9 0 0 1-9 9h-18a9 9 0 0 1-9-9 9 9 0 0 1 9-9Zm-11 9c0-6.075 4.925-11 11-11h18c6.075 0 11 4.925 11 11s-4.925 11-11 11h-18c-6.075 0-11-4.925-11-11Zm29 7a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" clip-rule="evenodd"></path></svg>'},34750:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5Z"></path></svg>'},30224:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-1.27 4.936a6.5 6.5 0 1 1 .707-.707l4.136 4.137a.5.5 0 1 1-.707.707l-4.137-4.137Z" clip-rule="evenodd"></path></svg>'},88866:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.5 7.5A.5.5 0 0 1 7 7h1.5v4.5h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8H7a.5.5 0 0 1-.5-.5Z"></path><path fill="#000" fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z" clip-rule="evenodd"></path></svg>'},79964:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M8 2.125 14.334 14H1.667L8 2.125Zm-.882-.47a1 1 0 0 1 1.765 0l6.333 11.874A1 1 0 0 1 14.334 15H1.667a1 1 0 0 1-.882-1.47L7.118 1.653ZM8 4.874a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0L8.9 5.87a.905.905 0 0 0-.9-.995Zm1 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd"></path></svg>'},94129:e=>{"use strict";e.exports=c},135:e=>{"use strict";e.exports=h},48702:e=>{"use strict";e.exports=n},70281:e=>{"use strict";e.exports=d},11668:e=>{"use strict";e.exports=u},99818:e=>{"use strict";e.exports=l},37902:e=>{"use strict";e.exports=p},88359:e=>{"use strict";e.exports=r},27387:e=>{"use strict";e.exports=o},26826:e=>{"use strict";e.exports=s},48891:e=>{"use strict";e.exports=i},30726:e=>{"use strict";e.exports=a}},t={};function m(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,m),a.exports}m.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return m.d(t,{a:t}),t},m.d=(e,t)=>{for(var i in t)m.o(t,i)&&!m.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},m.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),m.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},m.p="";var v={};return m.p=window.jimuConfig.baseUrl,(()=>{"use strict";m.r(v),m.d(v,{__set_webpack_public_path__:()=>q,default:()=>Z});var e,t,i,s=m(48891);!function(e){e.Attribute="ATTRIBUTE",e.Geometry="GEOMETRY"}(e||(e={})),function(e){e.Webmap="WEBMAP",e.Custom="CUSTOM"}(t||(t={})),function(e){e.Added="Added",e.Updated="Updated",e.Deleted="Deleted"}(i||(i={}));var a=m(26826),o=m(30726);function r(e,t,i,a,o){return s.css`
    ${"&.edit-widget-"+t} {
      .editor-white-bg{
        background-color: ${e.colors.white};
      }
      [heading='Edit feature'] .esri-editor__panel-content{
        padding: 0;
        .esri-editor__panel-content--section{
          padding: 8px 16px;
        }
      }
      .esri-editor__content{
        padding: 8px 16px;
      }
      .esri-feature-form{
        ${("empty"===i||"list"===i)&&`border-bottom: 1px solid ${e.colors.palette.light[200]};`}
        background-color: unset;
        .esri-feature-form__form-header{
          margin: 0;
          ${"form"===i&&"display: none;"}
          .esri-feature-form__description-text{
            font-weight: 500;
            font-size: 13px;
          }
        }
      }
      .esri-feature-templates{
        width: 100%;
        height: calc(100% - 40px);
        .esri-item-list{
          height: 100%;
          .esri-item-list__scroller{
            height: 100%;
          }
        }
      }
      .esri-editor__temp-wrapper{
        height: 100%;
      }
      .esri-editor__header{
        min-height: 56px;
        padding-left: ${o&&1!==a?"35px":"15px"};
        .esri-widget__heading{
          font-weight: 600;
          font-size: 16px;
          margin: 0 8px;
          text-align: left;
          padding: 1px 0;
          height: 56px;
          line-height: 54px
        }
      }
      .esri-editor__controls{
        border-top: 1px solid rgba(110,110,110,.3);
        padding: 12px 15px;
        display: flex;
        flex-direction: column;
        ${!o&&"justify-content: space-between !important; flex-direction: row !important;"}
        .esri-editor__control-button:first-of-type{
          color: ${e.colors.white};
          background-color: ${e.colors.palette.primary[500]};
          border: 1px solid ${e.colors.palette.primary[500]};
          :hover{
            background-color: ${e.colors.palette.primary[600]};
          }
        }
        .esri-editor__control-button{
          color: ${e.colors.palette.dark[800]};
          background-color: ${e.colors.white};
          border: 1px solid ${e.colors.palette.light[400]};
          :hover{
            background-color: ${e.colors.palette.light[100]};
          }
        }
        .esri-editor__control-button + .esri-editor__control-button{
          margin-left: 2%;
        }
      }
      .esri-item-list__list-item{
        :focus,
        :focus-visible {
          outline-offset: -2px !important;
        }
      }
      .esri-item-list__list{
        list-style: none;
        margin: 0;
        padding: 0;
        .esri-item-list__list-item{
          cursor: pointer;
          margin-bottom: 6px;
          min-height: 48px;
          transition: border 250ms ease-in-out;
          display: flex;
          justify-content: space-between;
          .esri-item-list__list-item-container{
            display: flex;
            margin: 9px 2px;
            width: 100%;
            .esri-item-list__list-item-label{
              flex: 1;
              margin: 0;
              display: flex;
              align-items: center;
              word-break: break-word;
              padding-left: 20px;
            }
          }
        }
      }
      .esri-item-list__scroller {
        position: relative;
        z-index: 0;
      }

      .esri-editor__feature-list-item,
      .esri-item-list__list-item{
        border-color:  ${e.colors.palette.light[200]};
        box-shadow: unset;
        :hover{
          border-color: ${e.colors.palette.dark[300]};
        }
      }
      .confirm-scrim{
        position: absolute;
        background-color: var(--calcite-scrim-background);
        width: 100%;
        height: 100%;
        top: 0;
      }
      .esri-editor__prompt__actions{
        .esri-editor__warning-option--primary,
        .esri-editor__warning-option--positive{
          text-align: center;
          padding: ${s.polished.rem(4)} ${s.polished.rem(16)};
          line-height: ${s.polished.rem(22)};
          border: 1px solid var(--calcite-ui-danger);
          border-radius: 0;
          flex: 1;
        }
        .esri-editor__warning-option--primary{
          background-color: transparent;
          color: var(--calcite-ui-danger);
          :hover{
            border-color: var(--calcite-ui-danger-hover);
            color: var(--calcite-ui-danger-hover);
            box-shadow: inset 0 0 0 1px var(--calcite-ui-danger-hover);
          }
        }
        .esri-editor__warning-option--positive{
          background-color: var(--calcite-ui-danger);
          color: ${e.colors.white};
          :hover{
            border-color: var(--calcite-ui-danger-hover);
            background-color: var(--calcite-ui-danger-hover);
          }
        }
      }
      .esri-feature-table__loader-container{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        margin: unset;
        background-color: ${s.polished.rgba(e.colors.palette.secondary[400],.3)};
        .esri-feature-table__loader{
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -16px;
          margin-top: -20px;
          z-index: 2;
        }
      }

      .attr-height{
        overflow-y: auto;
        height: calc(100% - 113px);
      }
      .snapping-option{
        position: absolute;
        top: 170px;
        width: calc(100% - 33px);
        margin: 10px 16px;
        padding: 16px 7px 10px;
        border-top: 1px solid ${e.colors.palette.light[300]};
        .snapping-item{
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
      }
      .feature-list{
        height: calc(100% - 57px);
        background-color: var(--calcite-ui-background);
        max-height: unset;
        .esri-item-list{
          background-color: unset;
        }
        .esri-item-list__list-item{
          background-color: var(--calcite-ui-foreground-1);
          :hover{
            cursor: pointer;
            background-color: var(--calcite-ui-foreground-2);
          }
        }

        .esri-editor__scroller{
          max-height: unset;
        }
      }
      .esri-editor__scroller{
        max-height: unset;
        .esri-item-list__scroller{
          max-height: unset;
        }
      }
      .esri-item-list__group{
        padding: 0 12px;
      }
      .esri-editor__message{
        margin: auto;
      }
      .form-header-container{
        border-bottom: 1px solid ${e.colors.palette.light[200]};.
      }
      .esri-editor__header{
        padding-left: unset;
      }
      .back-button{
        width: 32px;
        padding-inline: ${s.polished.rem(8)};
        padding-block: ${s.polished.rem(4)};
        line-height: ${s.polished.rem(16)};
        color: ${e.colors.black};
        border-top: 0px !important;
        border-left: 0px !important;
        border-bottom: 0px !important;
        border-style: solid;
        border-color: var(--calcite-ui-border-3);
        border-inline-end-width: 1px;
      }
      .layer-selector{
        padding: 12px 15px;
      }
      .single-buttons{
        flex: 1;
      }
      .multi-buttons{
        width: 49%;
      }
      .add-feature-btn{
        position: absolute;
        right: 15px;
        top: 12px;
        button{
          width: 32px;
          height: 32px;
        }
      }
      .back-list-btn{
        position: absolute;
        left: 15px;
        top: 15px;
      }
      .edit-blank{
        min-height: 300px;
        .placeholder-icon{
          color: ${e.colors.palette.dark[200]};
        }
        & > div{
          top: calc(50% + 20px);
          transform: translateY(-50%);
        }
        p{
          font-size: ${s.polished.rem(14)};
          margin-top: ${s.polished.rem(16)};
          line-height: ${s.polished.rem(19)};
          color: ${e.colors.palette.dark[500]};
        }
      }
    }
  `}class l extends s.React.PureComponent{constructor(){super(...arguments),this.onDataSourceCreated=e=>{this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId,e)},this.onDataSourceInfoChange=(e,t)=>{this.props.onIsDataSourceNotReady(this.props.useDataSource.dataSourceId,null==e?void 0:e.status);const i=null==t?void 0:t.selectedIds,s=null==e?void 0:e.selectedIds,a=i!==s&&(0!==(null==i?void 0:i.length)||0!==(null==s?void 0:s.length)),o=null==t?void 0:t.gdbVersion,r=null==e?void 0:e.gdbVersion;a&&this.props.onDataSourceSelectedChange(this.props.useDataSource.dataSourceId,s),o!==r&&this.props.onDataSourceVersionChange(this.props.useDataSource.dataSourceId)},this.onCreateDataSourceFailed=()=>{this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId,null)}}componentWillUnmount(){this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId,null),this.props.onIsDataSourceNotReady(this.props.useDataSource.dataSourceId,s.DataSourceStatus.NotReady)}render(){const{useDataSource:e}=this.props;return(0,s.jsx)(s.DataSourceComponent,{useDataSource:e,onDataSourceCreated:this.onDataSourceCreated,onCreateDataSourceFailed:this.onCreateDataSourceFailed,onDataSourceInfoChange:this.onDataSourceInfoChange})}}var n=m(34750),d=m.n(n);const u=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),o=(0,s.classNames)("jimu-icon jimu-icon-component",i);return t?s.React.createElement(t,Object.assign({className:o,src:d()},a)):s.React.createElement("svg",Object.assign({className:o},a))};var c=m(88866),p=m.n(c);const h=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),o=(0,s.classNames)("jimu-icon jimu-icon-component",i);return t?s.React.createElement(t,Object.assign({className:o,src:p()},a)):s.React.createElement("svg",Object.assign({className:o},a))};var f=m(27387),g=m(88359),b=m(99818),y=m(48702),S=m(70281),w=m(11668),x=m(94129),j=m(37902);const _=["CreationDate","Creator","EditDate","Editor","GlobalID"];var F=function(e,t,i,s){return new(i||(i=Promise))((function(a,o){function r(e){try{n(s.next(e))}catch(e){o(e)}}function l(e){try{n(s.throw(e))}catch(e){o(e)}}function n(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}n((s=s.apply(e,t||[])).next())}))};class E extends s.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.7.0",description:"Add layerHonorMode to config for support smart form.",upgrader:e=>F(this,void 0,void 0,(function*(){let i=e;const a=(e,t)=>{const i=[],s=e=>(e.forEach((e=>{if(e.groupKey)s(e.children);else{const s=t.find((t=>t.name===e.jimuName));_.includes(e.jimuName)||i.push(Object.assign(Object.assign({},e),{editable:null==s?void 0:s.editable,editAuthority:!!(null==s?void 0:s.editable)&&(null==e?void 0:e.editAuthority)}))}})),i);return s(e)};return yield Promise.all(i.layersConfig.map((e=>new Promise((t=>{s.DataSourceManager.getInstance().createDataSourceByUseDataSource(e.useDataSource).then((i=>{const s=null==i?void 0:i.getLayerDefinition(),o=(null==s?void 0:s.fields)||[],r=e.groupedFields.map((e=>{var t;const i=o.find((t=>t.name===e.jimuName));return e.groupKey?Object.assign(Object.assign({},e),{editable:!0,editAuthority:!(null===(t=null==e?void 0:e.children)||void 0===t?void 0:t.some((e=>!1===e.editAuthority))),children:a(null==e?void 0:e.children,o)}):Object.assign(Object.assign({},e),{editable:null==i?void 0:i.editable,editAuthority:!!(null==i?void 0:i.editable)&&(null==e?void 0:e.editAuthority)})})).filter((e=>!_.includes(e.jimuName)));t(r)}))}))))).then((e=>(e.forEach(((e,a)=>{const o=i.layersConfig[a].showFields.filter((e=>!_.includes(e.jimuName)));let r=[];const l=e.asMutable({deep:!0});e.forEach((e=>{e.groupKey?r=r.concat(e.children):r.push(e)})),o.forEach((e=>{r.find((t=>t.jimuName===e.jimuName))||l.push(e)})),i=i.setIn(["layersConfig",a,"groupedFields"],(0,s.Immutable)(l)),i=i.setIn(["layersConfig",a,"layerHonorMode"],t.Custom)})),Promise.resolve(i))))}))},{version:"1.10.0",description:"Set old app default snapping to true",upgrader:e=>F(this,void 0,void 0,(function*(){let t=e;return t=t.set("selfSnapping",!0).set("featureSnapping",!0),t}))},{version:"1.12.0",description:'Set "undefined" option to "false", and remove not editable layer',upgrader:t=>F(this,void 0,void 0,(function*(){var i,a,o;let r=t;const l=r.editMode===e.Geometry,n=s.DataSourceManager.getInstance(),d=[];for(const e of r.layersConfig){let t;try{t=yield n.createDataSourceByUseDataSource(null==e?void 0:e.useDataSource)}catch(e){console.error(e)}if(!t){d.push(e);continue}const r=null==t?void 0:t.getLayerDefinition(),u=(null===(i=null==t?void 0:t.layer)||void 0===i?void 0:i.isTable)||(null==r?void 0:r.type)===s.SupportedLayerServiceTypes.Table;if(l&&u)continue;const c=null==r?void 0:r.allowGeometryUpdates;if(null===(o=null===(a=null==t?void 0:t.layer)||void 0===a?void 0:a.editingEnabled)||void 0===o||o){let t;t=e.updateGeometries?Object.assign(Object.assign({},e),{updateRecords:!0,updateAttributes:!0,updateGeometries:c&&!0}):Object.assign(Object.assign({},e),{updateRecords:!1,updateAttributes:!1,updateGeometries:!1}),d.push(t)}}return r=r.setIn(["layersConfig"],d),r}))},{version:"1.13.0",description:"Update snap options",upgrader:e=>F(this,void 0,void 0,(function*(){let t=e;return t.selfSnapping&&(t=t.set("defaultSelfEnabled",!0)),t.featureSnapping&&(t=t.set("defaultFeatureEnabled",!0)),t}))}]}}const I=new E;var C=m(79964),M=m.n(C);const N=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),o=(0,s.classNames)("jimu-icon jimu-icon-component",i);return t?s.React.createElement(t,Object.assign({className:o,src:M()},a)):s.React.createElement("svg",Object.assign({className:o},a))};var D=m(135),O=m(30224),k=m.n(O);const L=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),o=(0,s.classNames)("jimu-icon jimu-icon-component",i);return t?s.React.createElement(t,Object.assign({className:o,src:k()},a)):s.React.createElement("svg",Object.assign({className:o},a))};var A=function(e,t,i,s){return new(i||(i=Promise))((function(a,o){function r(e){try{n(s.next(e))}catch(e){o(e)}}function l(e){try{n(s.throw(e))}catch(e){o(e)}}function n(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}n((s=s.apply(e,t||[])).next())}))};const R=m(94127),$="esri-feature-form__form-header",T="esri-feature-form__description-text",P="esri-widget__heading",B="esri-feature-form",U="esri-editor__scroller",V="esri-item-list__list-item-label",H="esri-editor__warning-option",W=Object.assign({},{_widgetLabel:"Edit",initGeoEmptyMessage:"Please add an editable layer.",initAttEmptyMessage:"Please add an editable source.",noRecordTips:"No valid record is selected, select one or add one.",addFeature:"Add feature",selectLayer:"Select layer",selfSnapping:"Geometry guides",featureSnapping:"Feature to feature",update:"Update",deleteRecord:"Delete this record?",deleteRecordTips:"This record will be permanently removed.",keepRecord:"Keep record"},o.defaultMessages,s.defaultMessages);class G extends s.React.PureComponent{constructor(a){super(a),this.handleActiveViewChange=e=>{this.setState({jimuMapView:e},(()=>{const t=null==e?void 0:e.view;null==t||t.when((()=>{null==t||t.on("layerview-create",(t=>{var i;const s=t.layer;if(null===(i=null==s?void 0:s.id)||void 0===i?void 0:i.includes("jimu-draw-measurements-layer")){const t=this.edit;(null==t?void 0:t.layerInfos)?this.setupEditLayerInfos(e):this.createEditor(e)}}))})),e?this.createEditor(e):this.destoryEdit()}))},this.formatMessage=(e,t)=>this.props.intl.formatMessage({id:e,defaultMessage:W[e]},t),this.destoryEdit=()=>{this.edit&&!this.edit.destroyed&&this.edit.destroy()},this.flatMapArray=e=>{const t=[];for(const i in e)(null==e?void 0:e[i])&&t.push(...e[i]);return t},this.flatMapArrayWithView=(e,t)=>{const i=[],s=null==t?void 0:t.dataSourceId;for(const t in e)0===t.indexOf(s)&&(null==e?void 0:e[t])&&i.push(...e[t]);return i},this.createEditForm=(e,t,i)=>A(this,void 0,void 0,(function*(){var a,o,r,l;const{dataSources:n,editFeatures:d}=this.state,{id:u,config:c}=this.props,{layersConfig:p}=c,h=n[e],m=this.getInLayersConfigFeatures(d,p),v=this.flatMapArray(m).length;if(1===v){const e=null===(a=h.getSelectedRecords())||void 0===a?void 0:a[0];if(!e)return;if(t||!this.edit||(null===(o=this.edit)||void 0===o?void 0:o.destroyed))this.renderFeatureForm(h,e,i);else{null===(r=document.getElementById(`edit-container-${u}`))||void 0===r||r.classList.remove("esri-hidden"),this.createOrUpdateheader(h,e.feature);const t=this.edit;if(!t)return;const i=yield s.dataSourceUtils.changeToJSAPIGraphic(null==e?void 0:e.feature);t.feature=i}}else(v>1||0===v)&&(null===(l=document.getElementById(`edit-container-${u}`))||void 0===l||l.classList.add("esri-hidden"))})),this.getDsAccessibleInfo=e=>e?(0,s.esri.restRequest.request)(`${e}?f=json`).then((e=>!Object.keys(e).includes("error"))).catch((e=>{console.error(e)})):Promise.resolve(!1),this.getPrivilege=()=>s.privilegeUtils.checkExbAccess(s.privilegeUtils.CheckTarget.Experience).then((e=>{var t;return null===(t=null==e?void 0:e.capabilities)||void 0===t?void 0:t.canEditFeature})),this.sendSparkMsg=(e,t)=>{var i,s,a;const o=null===(a=null===(s=null===(i=null===window||void 0===window?void 0:window.Capacitor)||void 0===i?void 0:i.Plugins)||void 0===s?void 0:s.Spark)||void 0===a?void 0:a.sendDiscussionAsync;o&&o({title:`${e} data to ${t}`,content:window.location.href})},this.renderFeatureForm=(a,o,r)=>{this.setState({loading:!0});const{activeId:l}=this.state,{config:n,id:d}=this.props,{editMode:u,layersConfig:c}=n,p=c.asMutable({deep:!0}).find((e=>e.id===l));this.destoryEdit(),this.getFeatureLayer(a).then((l=>A(this,void 0,void 0,(function*(){var n;if(r&&r!==this.currentRequestId)return void this.setState({loading:!1});if(this.removeLayerOnce=!1,!l)return void this.setState({loading:!1});const c=document&&document.createElement("div");let h;c.id=`edit-container-${d}`,c.className=`edit-container-${d}`,this.refs.editContainer.appendChild(c),h=l.layer?l.layer:l;const m=yield this.getDsAccessibleInfo(null==h?void 0:h.url),v=yield this.getPrivilege(),g=m||v;if(this.setState({formEditable:g}),u===e.Attribute){const e=this.constructFormElements(a.id),r=new y.default({elements:e}),l=((null==o?void 0:o.feature)?yield s.dataSourceUtils.changeToJSAPIGraphic(null==o?void 0:o.feature):void 0)||new x.default({layer:h}),d=p.layerHonorMode===t.Webmap&&(null===(n=null==a?void 0:a.layer)||void 0===n?void 0:n.formTemplate)||r;this.edit=new f.default({container:c,feature:l,layer:h,formTemplate:d}),this.createOrUpdateheader(a,l),o&&this.setState({featureFormStep:"form"});const u=this.edit;u.on("submit",(()=>{const e=(null==u?void 0:u.feature)||l;if(e){(null==e?void 0:e.geometry)&&(e.geometry=null);const t=u.getValues();Object.keys(t).forEach((i=>{e.attributes[i]=t[i]}));const i={updateFeatures:[e]};this.applyAttributeUpdates(i)}})),u.on("value-change",(e=>{var t,i;const{feature:s,fieldName:a,value:o}=e,r=null===(t=this.edit.viewModel)||void 0===t?void 0:t.submittable;this.setState({formSubmittable:r}),o!==(null===(i=null==s?void 0:s.attributes)||void 0===i?void 0:i[a])?this.setState({formChange:!0}):this.setState({formChange:!1})})),h.on("edits",(e=>{var t,s,o,r,l,n,d,u;const{addedFeatures:c,updatedFeatures:p,deletedFeatures:m}=e,v=c&&c.length>0,f=p&&p.length>0,g=m&&m.length>0;let b=i.Added;if(v){b=i.Added;const l=null===(s=null===(t=null==e?void 0:e.edits)||void 0===t?void 0:t.addFeatures)||void 0===s?void 0:s[0];if(l){const e=a.getIdField(),t=a.buildRecord(l,a),i=(null==t?void 0:t.getData())||{};t.setData(Object.assign(Object.assign({},i),{[e]:null===(r=null===(o=c[0])||void 0===o?void 0:o.objectId)||void 0===r?void 0:r.toString()})),a.afterAddRecord(t),a.selectRecordById(t.getId(),t)}}if(f){b=i.Updated;const t=null===(n=null===(l=null==e?void 0:e.edits)||void 0===l?void 0:l.updateFeatures)||void 0===n?void 0:n[0];if(t){const e=a.buildRecord(t,a);a.afterUpdateRecord(e)}}if(g){b=i.Deleted;const t=null===(u=null===(d=null==e?void 0:e.edits)||void 0===d?void 0:d.deleteFeatures)||void 0===u?void 0:u[0];if(t){const e=a.buildRecord(t,a);a.afterDeleteRecordById(e.getId())}}(v||f||g)&&this.sendSparkMsg(b,h.title)})),this.setState({loading:!1})}})))).catch((e=>{this.setState({loading:!1}),this.removeLayerOnce=!1,console.error(e)}))},this.createOrUpdateheader=(e,t)=>{var i,a;const{id:o}=this.props,{featureFormStep:r}=this.state,l=this.getLayerDisplayField(e),n="new"===r?this.formatMessage("addFeature"):null===(i=null==t?void 0:t.attributes)||void 0===i?void 0:i[l];if(null===document||void 0===document?void 0:document.getElementById(`form_heading_${o}`))document.getElementById(`form_heading_${o}`).innerText=n;else{const e=document&&document.createElement("div");e.className="d-flex",e.innerHTML=`\n        <button id='back_home_${o}' class='back-button surface-1 ${(0,s.classNames)("esri-editor__back-button")}' title='${this.formatMessage("back")}'><</button>\n        <header class='${(0,s.classNames)("esri-editor__header")}'>\n          <h4 id='form_heading_${o}' class='text-truncate ${(0,s.classNames)(P)}' title='${n}'>${n}</h4>\n        </header>\n      `,this.refs.formHeaderContainer.appendChild(e),null===(a=document.getElementById(`back_home_${o}`))||void 0===a||a.addEventListener("click",this.handleBack)}},this.deleteChangeDataSource=e=>{const{config:t}=this.props,{layersConfig:i}=t,{activeId:s,editFeatures:a}=this.state,o=Object.assign({},a);o[s]=e;const r=this.getInLayersConfigFeatures(o,i),l=this.flatMapArray(r).length,n=l>1?"list":1===l?"form":"empty";this.setState({editFeatures:o,featureFormStep:n},(()=>{this.createEditForm(s,!1)}))},this.applyAttributeUpdates=e=>{const{dataSources:t,editFeatures:i,activeId:s}=this.state,a=this.edit,o=t[s],r=o.getGDBVersion();a.layer.applyEdits(e,{gdbVersion:r}).then((t=>{if(null==e?void 0:e.deleteFeatures){const t=(null==o?void 0:o.getSelectedRecords()).filter((t=>t.feature.attributes!==(null==e?void 0:e.deleteFeatures[0].attributes)));if(t.length>0)this.deleteChangeDataSource(t);else{const e=Object.assign({},i);delete e[s];const t=this.refs.formHeaderContainer;(null==t?void 0:t.innerHTML)&&(t.innerHTML=""),this.destoryEdit(),this.setState({editFeatures:e,featureFormStep:"empty",activeId:""})}}else(null==e?void 0:e.updateFeatures)&&this.setState({attrUpdating:!1});this.setState({formChange:!1,formSubmittable:!0})})).catch((t=>{(null==e?void 0:e.updateFeatures)&&this.setState({attrUpdating:!1}),console.error(t)}))},this.constructFormElements=e=>{let{activeId:t}=this.state;e&&(t=e);const{config:i}=this.props,{layersConfig:s}=i,a=s.asMutable({deep:!0}).find((e=>e.id===t));if(!a)return[];const{groupedFields:o}=a;return o.map((e=>(null==e?void 0:e.children)?new w.default({label:e.name,description:e.subDescription||(null==e?void 0:e.description),elements:null==e?void 0:e.children.map((e=>new S.default({fieldName:e.jimuName,label:null==e?void 0:e.alias,description:e.subDescription||(null==e?void 0:e.description),editable:e.editAuthority})))}):new S.default({fieldName:e.jimuName,label:null==e?void 0:e.alias,description:e.subDescription||(null==e?void 0:e.description),editable:e.editAuthority})))},this.onFilterChange=e=>{this.setState({filterText:e.target.value})},this.renderListItems=e=>{var t,i,a;const{filterText:o}=this.state,r=[];for(const s in e){const l=e[s],n=null===(t=null==l?void 0:l[0])||void 0===t?void 0:t.dataSource,d=null==n?void 0:n.belongToDataSource,u=null==d?void 0:d.jimuChildId,c=(null===(i=null==d?void 0:d.layerDefinition)||void 0===i?void 0:i.name)||(null===(a=null==d?void 0:d.layerDefinition)||void 0===a?void 0:a.description),p=this.getLayerDisplayField(n),h=this.getLayerObjectIdField(n),m={id:u,label:c,dsId:s,items:l.filter((e=>{var t,i,s,a;const r=(null===(t=e.feature.attributes)||void 0===t?void 0:t[p])||(null===(i=e.feature.attributes)||void 0===i?void 0:i[h])||(null===(s=e.feature.attributes)||void 0===s?void 0:s.objectid),l=o.toLowerCase();return!l||(null===(a=null==r?void 0:r.toString())||void 0===a?void 0:a.toLowerCase().indexOf(l))>-1})).map((e=>{var t,i,a;const o=(null===(t=e.feature.attributes)||void 0===t?void 0:t[p])||(null===(i=e.feature.attributes)||void 0===i?void 0:i[h])||(null===(a=e.feature.attributes)||void 0===a?void 0:a.objectid);return{id:o,dsId:s,label:o,data:e.feature}}))};r.push(m)}let l=0;return r.forEach((e=>{l+=e.items.length})),0===l?(0,s.jsx)("div",{className:"esri-item-list__no-matches-message",key:"no-matches"},"No items found"):(0,s.jsx)("div",{key:"item-container"},r.map((e=>this.renderGroup(e))))},this.renderGroup=e=>{if(0!==e.items.length)return(0,s.jsx)("div",{role:"group","aria-label":e.label,className:"esri-item-list__group",key:e.label},(0,s.jsx)("h4",{className:(0,s.classNames)("esri-item-list__group-header",P)},(0,s.jsx)("span",{className:V},e.label)),(0,s.jsx)("div",{className:"esri-item-list__list",role:"listbox"},e.items.map((e=>this.renderItem(e)))))},this.renderItem=e=>{const t=`${e.id}__${e.label}`,{dataSources:i}=this.state;return(0,s.jsx)(o.Button,{role:"option",className:(0,s.classNames)("w-100 border-0 esri-item-list__list-item"),key:t,onClick:()=>{clearTimeout(this.timerFn),this.timerFn=setTimeout((()=>{this.renderFeatureForm(i[e.dsId],{feature:e.data})}),200)},onDoubleClick:()=>{clearTimeout(this.timerFn)}},(0,s.jsx)("div",{className:"esri-item-list__list-item-container"},(0,s.jsx)("span",{className:V},e.label)))},this.getLayerDisplayField=e=>{var t,i,s,a,o,r,l,n;return(null===(t=null==e?void 0:e.layer)||void 0===t?void 0:t.displayField)||(null===(i=null==e?void 0:e.layerDefinition)||void 0===i?void 0:i.displayField)||(null===(a=null===(s=null==e?void 0:e.belongToDataSource)||void 0===s?void 0:s.layerDefinition)||void 0===a?void 0:a.displayField)||(null===(o=null==e?void 0:e.layer)||void 0===o?void 0:o.objectIdField)||(null===(r=null==e?void 0:e.layerDefinition)||void 0===r?void 0:r.objectIdField)||(null===(n=null===(l=null==e?void 0:e.belongToDataSource)||void 0===l?void 0:l.layerDefinition)||void 0===n?void 0:n.objectIdField)||"OBJECTID"},this.getLayerObjectIdField=e=>{var t,i,s;return(null===(t=null==e?void 0:e.layer)||void 0===t?void 0:t.objectIdField)||(null===(s=null===(i=null==e?void 0:e.belongToDataSource)||void 0===i?void 0:i.layerDefinition)||void 0===s?void 0:s.objectIdField)||"OBJECTID"},this.renderFeatureList=(e,t)=>{const{id:i,label:a,theme:r}=this.props,{filterText:l}=this.state,n=`${i}-placeholder`,d=this.refs.formHeaderContainer;return(null==d?void 0:d.innerHTML)&&(d.innerHTML=""),(0,s.jsx)("div",{className:"surface-1 border-0 h-100"},(0,s.jsx)("div",{className:B},(0,s.jsx)("div",{className:$},(0,s.jsx)("h2",{className:P},a),(0,s.jsx)("p",{className:(0,s.classNames)(`text-truncate ${T}`),key:"description",title:t},t))),(0,s.jsx)("div",{className:(0,s.classNames)(`feature-list esri-editor__content ${U}`)},(0,s.jsx)("div",{className:(0,s.classNames)("esri-item-list","esri-widget")},(0,s.jsx)("div",{className:"d-flex align-items-center m-2"},(0,s.jsx)(o.TextInput,{"aria-labelledby":n,className:"w-100",placeholder:this.formatMessage("search"),onChange:this.onFilterChange,value:l,prefix:(0,s.jsx)(L,{color:r.colors.palette.light[800]}),allowClear:!0,title:l})),(0,s.jsx)("div",{key:"content",className:(0,s.classNames)(U)},this.renderListItems(e)))))},this.renderFormEmpty=t=>{const{id:i,label:a,config:o}=this.props,{noDataMessage:r,layersConfig:l,editMode:n}=o,d=this.refs.formHeaderContainer;(null==d?void 0:d.innerHTML)&&(d.innerHTML="");const u=l.length>0,c=n===e.Attribute?this.formatMessage("initAttEmptyMessage"):this.formatMessage("initGeoEmptyMessage"),p=u?r||this.formatMessage("noRecordTips"):c,m=document.getElementById(`edit-container-${i}`);return m&&(null==m||m.classList.add("esri-hidden")),(0,s.jsx)("div",{className:"surface-1 border-0 h-100"},(0,s.jsx)("div",{className:(0,s.classNames)(`editor-white-bg ${B}`)},(0,s.jsx)("div",{className:$},(0,s.jsx)("h2",{className:P},a),u&&(0,s.jsx)("p",{className:(0,s.classNames)(`text-truncate ${T}`),key:"description",title:t},t))),(0,s.jsx)("div",{className:"w-100 text-center edit-blank"},(0,s.jsx)("div",{className:"position-absolute edit-blank-content w-100"},(0,s.jsx)(h,{size:32,className:"placeholder-icon"}),(0,s.jsx)("p",null,p))))},this.renderControlButtons=e=>(0,s.jsx)("div",{className:(0,s.classNames)("flex-row justify-content-between esri-editor__controls"),key:"controls"},e.map((({disabled:t=!1,label:i,type:a,clickHandler:o},r)=>this.renderButton({label:i,class:(0,s.classNames)({"single-buttons":1===e.length},{"multi-buttons":e.length>1},t?"esri-button--disabled":null),type:a,disabled:t,clickHandler:o,key:r})))),this.handleNew=()=>{var e;const{dataSources:t}=this.state,{config:i}=this.props,{layersConfig:s}=i,a=null===(e=s.find((e=>null==e?void 0:e.addRecords)))||void 0===e?void 0:e.id;if(a){const e=null==t?void 0:t[a];if(!e)return;this.setState({featureFormStep:"new",activeId:a},(()=>{this.renderFeatureForm(e)}))}},this.handleAdd=()=>{var e;const t=null===(e=this.edit.viewModel)||void 0===e?void 0:e.feature;if(t){const e=this.edit.getValues();t.attributes=e;const i={addFeatures:[t]};this.applyAttributeUpdates(i)}},this.handleSave=()=>{var e,t;null===(t=null===(e=this.edit)||void 0===e?void 0:e.viewModel)||void 0===t||t.submit(),this.setState({attrUpdating:!0})},this.handleDeleteConfirm=()=>{this.setState({delConfirm:!0})},this.cancleDelete=()=>{this.setState({delConfirm:!1})},this.handleDelete=()=>{const e=this.edit.viewModel.feature;if(e){const t={deleteFeatures:[e]};this.applyAttributeUpdates(t)}this.setState({delConfirm:!1})},this.renderButton=e=>(0,s.jsx)(o.Button,{className:e.class,disabled:e.disabled,key:e.key,onClick:e.clickHandler,type:e.type},e.label),this.constructFieldConfig=e=>(null==e?void 0:e.asMutable({deep:!0})).map((e=>(null==e?void 0:e.children)?new w.default({label:e.name,description:e.subDescription||(null==e?void 0:e.description),elements:null==e?void 0:e.children.map((e=>new S.default({fieldName:e.jimuName,label:null==e?void 0:e.alias,description:e.subDescription||(null==e?void 0:e.description),editable:e.editAuthority})))}):new S.default({fieldName:e.jimuName,label:null==e?void 0:e.alias,description:e.subDescription||(null==e?void 0:e.description),editable:e.editAuthority}))),this.editorLayerWatcher=(e,t,s)=>{var a,o,r,l,n,d,u,c,p;const{dataSources:h,editFeatures:m}=this.state,v=h[t],{addedFeatures:f,updatedFeatures:g,deletedFeatures:b}=e,y=f&&f.length>0,S=g&&g.length>0,w=b&&b.length>0;let x=i.Added;if(y){x=i.Added;const t=null===(o=null===(a=null==e?void 0:e.edits)||void 0===a?void 0:a.addFeatures)||void 0===o?void 0:o[0];if(t){const e=v.buildRecord(t);v.afterAddRecord(e)}}if(S){x=i.Updated;const t=null===(l=null===(r=null==e?void 0:e.edits)||void 0===r?void 0:r.updateFeatures)||void 0===l?void 0:l[0],s=(null===(u=null===(d=null===(n=this.edit.viewModel)||void 0===n?void 0:n.featureFormViewModel)||void 0===d?void 0:d.feature)||void 0===u?void 0:u.attributes)||{},a=Object.assign(s,null==t?void 0:t.attributes);if(t.attributes=a,t){const e=v.buildRecord(t);v.afterUpdateRecord(e),this.startWorkFlowWhenAwait(m)}}if(w){x=i.Deleted;const t=null===(p=null===(c=null==e?void 0:e.edits)||void 0===c?void 0:c.deleteFeatures)||void 0===p?void 0:p[0];if(t){const e=v.buildRecord(t);v.afterDeleteRecordById(e.getId())}}(y||S||w)&&this.sendSparkMsg(x,s)},this.setupEditLayerInfos=e=>{var i,s;const{config:a}=this.props,{layersConfig:o}=a,r=[];let l=0;const n=(null===(s=null===(i=e.view)||void 0===i?void 0:i.map)||void 0===s?void 0:s.allLayers)||[],d=n.filter((e=>"feature"===e.type)),u=[];n.forEach((e=>{(null==e?void 0:e.id.includes("jimu-draw-measurements-layer"))&&u.push(e)})),u.length>0&&u.forEach((e=>{r.push({layer:e,enabled:!1,addEnabled:!1,updateEnabled:!1,deleteEnabled:!1})})),d.forEach((e=>A(this,void 0,void 0,(function*(){const i=o.find((t=>t.layerId===e.id)),s=e;if(s)if(i){const{groupedFields:a,addRecords:o,deleteRecords:l,updateRecords:n,updateAttributes:d,updateGeometries:u,layerHonorMode:c,id:p}=i,h=c===t.Webmap,m=yield this.getDsAccessibleInfo(null==e?void 0:e.url),v=yield this.getPrivilege(),f=m||v,g=new y.default({elements:this.constructFieldConfig(a)});r.push(Object.assign(Object.assign({layer:s},h?{}:{formTemplate:g}),{enabled:f&&(o||n||l),addEnabled:o,updateEnabled:n,deleteEnabled:l,attributeUpdatesEnabled:d,geometryUpdatesEnabled:u}));const b=s;b.on("edits",(e=>{this.editorLayerWatcher(e,p,b.title)}))}else r.push({layer:s,enabled:!1,addEnabled:!1,updateEnabled:!1,deleteEnabled:!1});l++,l===d.length&&(this.edit.layerInfos=r)}))))},this.getDefaultSnapSources=(e,t)=>(null==e?void 0:e.jimuLayerViews)?Object.keys(e.jimuLayerViews).filter((i=>null==t?void 0:t.includes(e.jimuLayerViews[i].layerDataSourceId))).map((t=>({layer:e.jimuLayerViews[t].layer,enabled:!0}))):[],this.createEditor=e=>{var i,s;let{jimuMapView:a}=this.state;const{useMapWidgetIds:o}=this.props;if(!o||0===o.length)return;if(e&&(a=e),!a)return;const{id:r,config:l}=this.props,{layersConfig:n,selfSnapping:d,featureSnapping:u,defaultSelfEnabled:c,defaultFeatureEnabled:p,defaultSnapLayers:h}=l;if(0===(null==n?void 0:n.length))return;if(void 0!==this.edit&&!e&&this.edit&&!this.edit.destroyed)return void this.setupEditLayerInfos(a);this.destoryEdit();let m=null;const v=document.getElementById(`edit-container-${r}`);v&&v.remove(),m=document&&document.createElement("div"),m.id=`edit-container-${r}`,m.className=`h-100 edit-container-${r}`,this.refs.editContainer.appendChild(m);const f=[];let b=0;const S=d||u,w=this.getDefaultSnapSources(a,h),x=()=>{this.edit=new g.default({container:m,view:a.view,layerInfos:f,snappingOptions:{enabled:c||p,selfEnabled:c,featureEnabled:p,featureSources:w},visibleElements:{snappingControls:S,snappingControlsElements:{enabledToggle:!0,selfEnabledToggle:d,featureEnabledToggle:u}}});const e=this;D.default.watch((()=>this.edit.viewModel.state),(t=>{var i,s,a;if("editing-attributes"===t){const t=null===(i=e.edit.viewModel)||void 0===i?void 0:i.featureFormViewModel,o=null==t?void 0:t.feature;if(!o)return;const{dataSources:r,selectionStartWorkflow:l}=e.state,d=(null===(s=null==o?void 0:o.layer)||void 0===s?void 0:s.id)||(null===(a=null==t?void 0:t.layer)||void 0===a?void 0:a.id),u=n.find((e=>e.layerId===d));if(!u)return;const c=r[u.id],p=c.buildRecord(o);l?e.setState({selectionStartWorkflow:!1}):this.editorSelectFeature=!0,c.selectRecordById(p.getId(),p)}}))},j=(null===(s=null===(i=a.view)||void 0===i?void 0:i.map)||void 0===s?void 0:s.allLayers)||[],_=j.filter((e=>"feature"===e.type)),F=[];j.forEach((e=>{(null==e?void 0:e.id.includes("jimu-draw-measurements-layer"))&&F.push(e)})),F.length>0&&F.forEach((e=>{f.push({layer:e,enabled:!1,addEnabled:!1,updateEnabled:!1,deleteEnabled:!1})})),_.forEach((e=>A(this,void 0,void 0,(function*(){const i=n.find((t=>t.layerId===e.id)),s=e;if(s)if(i){const{groupedFields:a,addRecords:o,deleteRecords:r,updateRecords:l,updateAttributes:n,updateGeometries:d,layerHonorMode:u,id:c}=i,p=u===t.Webmap,h=yield this.getDsAccessibleInfo(null==e?void 0:e.url),m=yield this.getPrivilege(),v=h||m,g=new y.default({elements:this.constructFieldConfig(a)});f.push(Object.assign(Object.assign({layer:s},p?{}:{formTemplate:g}),{enabled:v&&(o||l||r),addEnabled:o,updateEnabled:l,deleteEnabled:r,attributeUpdatesEnabled:n,geometryUpdatesEnabled:d}));const b=s;b.on("edits",(e=>{this.editorLayerWatcher(e,c,b.title)}))}else f.push({layer:s,enabled:!1,addEnabled:!1,updateEnabled:!1,deleteEnabled:!1});b++,b===_.length&&x()}))))},this.getFeatureLayer=e=>{var t;const{id:i}=this.props,a=e,o=null===(t=null==e?void 0:e.getDataSourceJson())||void 0===t?void 0:t.isDataInDataSourceInstance;let r;const l=e&&e.getCurrentQueryParams();if(o)return a.load({returnGeometry:!0},{widgetId:i}).then((e=>A(this,void 0,void 0,(function*(){const t=yield Promise.resolve(e);return s.dataSourceUtils.createFeatureLayerByRecords(a,t)})))).catch((e=>{console.error(e)}));if(!b.default)return Promise.resolve(r);if(null==a?void 0:a.itemId){const e=parseInt(a.layerId),t={portalItem:{id:a.itemId,portal:{url:a.portalUrl}},definitionExpression:l.where,layerId:e||void 0};a.url&&(t.url=a.url),r=new b.default(t)}else{if(!a.url)return a.layer?a.load({returnGeometry:!0},{widgetId:i}).then((e=>A(this,void 0,void 0,(function*(){const t=yield Promise.resolve(e);return s.dataSourceUtils.createFeatureLayerByRecords(a,t)})))).catch((e=>{console.error(e)})):Promise.resolve(r);r=new b.default({definitionExpression:l.where,url:a.url})}return o?Promise.resolve(r):r.load().then((()=>A(this,void 0,void 0,(function*(){return yield Promise.resolve(r)})))).catch((e=>{console.error(e)}))},this.getCurrentEditLayer=e=>{const{activeId:t,jimuMapView:i}=this.state,{config:s}=this.props,{layersConfig:a}=s,o=i.view.map.layers,r=a.asMutable({deep:!0}).find((e=>e.id===t)),{id:l}=r;let n=o.find((t=>t.id===e));return n||o.forEach((t=>{const i=null==t?void 0:t.layers;i&&((null==l?void 0:l.includes(t.id))||(null==l?void 0:l.includes(e)))&&(n=i.find((t=>{var i;return(null===(i=t.layerId)||void 0===i?void 0:i.toString())===e||t.id===e})))})),n},this.startWorkFlowWhenAwait=(e,t)=>A(this,void 0,void 0,(function*(){var i,s;const{activeId:a,dataSources:o,editFeatures:r,jimuMapView:l}=this.state,n=this.edit,d=e||r,u=this.flatMapArrayWithView(d,l).length;if(1===u){const e=t||a,r=this.getLayerObjectIdField(o[e]),l=null===(s=null===(i=null==d?void 0:d[e])||void 0===i?void 0:i[0])||void 0===s?void 0:s.feature,u=this.getCurrentEditLayer(null==l?void 0:l.layer.id);if(!u)return;const c=new j.default({where:`${r} = ${l.attributes[r]}`,outFields:["*"],returnGeometry:!0});u.queryFeatures(c).then((e=>{const t=null==e?void 0:e.features[0];null==n||n.startUpdateWorkflowAtFeatureEdit(t)})).catch((e=>{console.error(e)}))}else if(u>1){const e=()=>A(this,void 0,void 0,(function*(){var e;let t=[];const i=[];for(const t in d){const s=this.getLayerObjectIdField(o[t]),a=null==d?void 0:d[t];if((null==a?void 0:a.length)>0){const o=`${s} IN (${d[t].map((e=>(null==e?void 0:e.feature).attributes[s])).join()})`,r=null===(e=a[0])||void 0===e?void 0:e.feature,l=this.getCurrentEditLayer(null==r?void 0:r.layer.id),n=new j.default({where:o,outFields:["*"],returnGeometry:!0});i.push(l.queryFeatures(n))}}const s=yield Promise.all(i);return Object.keys(d).forEach(((e,i)=>{var a;t=t.concat((null===(a=s[i])||void 0===a?void 0:a.features)||[])})),t})),t=yield e();null==n||n.startUpdateWorkflowAtMultipleFeatureSelection(t)}else(null==n?void 0:n.activeWorkflow)&&(null==n||n.cancelWorkflow())})),this.idsArrayEquals=(e,t)=>{var i,s;if(!t)return!1;if((null===(i=this.selectedIds[e])||void 0===i?void 0:i.length)!==t.length)return!1;let a=!0;return null===(s=this.selectedIds[e])||void 0===s||s.forEach(((e,i)=>{e!==t[i]&&(a=!1)})),a},this.onDataSourceSelectedChange=(t,i)=>A(this,void 0,void 0,(function*(){var s,a;if(this.idsArrayEquals(t,i))return;const o=this.currentRequestId+1;this.currentRequestId++,this.selectedIds[t]=i;const{config:r}=this.props,{editMode:l,layersConfig:n}=r,{activeId:d,dataSources:u,editFeatures:c,jimuMapView:p}=this.state;let h=t;const m=Object.assign({},c);if(!u[h]){const e=this.dsManager.getDataSource(h);e&&(u[h]=e)}const v=null===(s=u[h])||void 0===s?void 0:s.getSelectedRecords();m[h]=v;const f=this.getInLayersConfigFeatures(m,n),g=this.flatMapArray(f).length,b=g>1?"list":1===g?"form":"empty";if(l===e.Geometry&&0===g){const e=this.edit;(null==e?void 0:e.activeWorkflow)&&(null==e||e.cancelWorkflow())}if(this.editorSelectFeature)return void(this.editorSelectFeature=!1);if(0===(null==v?void 0:v.length)&&1===g){let e;for(const t in m)1===(null===(a=null==m?void 0:m[t])||void 0===a?void 0:a.length)&&(e=t);h=e}if(l===e.Geometry&&0===(null==v?void 0:v.length)){const e=this.edit;(null==e?void 0:e.activeWorkflow)&&(null==e||e.cancelWorkflow())}const y=d!==t;if(l===e.Attribute&&this.setState({editFeatures:m,activeId:h,featureFormStep:b},(()=>{this.createEditForm(h,y,o)})),l===e.Geometry){if(!p)return;this.setState({editFeatures:m,activeId:t,selectionStartWorkflow:!0},(()=>{this.startWorkFlowWhenAwait(m,h)}))}})),this.onIsDataSourceNotReady=(e,t)=>{this.setState((i=>{var a;if(!(null===(a=i.dataSources[e])||void 0===a?void 0:a.getDataSourceJson().isOutputFromWidget))return;const o=Object.assign({},i.outputDataSourceIsNotReady);return o[e]=t===s.DataSourceStatus.NotReady,{outputDataSourceIsNotReady:o}}))},this.onCreateDataSourceCreatedOrFailed=(e,t)=>{this.setState((i=>{const s=Object.assign({},i.dataSources);return s[e]=t,{dataSources:s}}))},this.onDataSourceVersionChange=t=>{const{config:i}=this.props,{editMode:s}=i;s===e.Attribute&&this.setState({activeId:t},(()=>{this.createEditForm(t,!0)}))},this.onLayerChange=e=>{var t;const{dataSources:i}=this.state,s=null===(t=null==e?void 0:e.target)||void 0===t?void 0:t.value;this.setState({activeId:s},(()=>{this.renderFeatureForm(i[s])}))},this.handleBack=()=>{const{id:e,config:t}=this.props,{layersConfig:i}=t,{editFeatures:s}=this.state,a=this.getInLayersConfigFeatures(s,i),o=this.flatMapArray(a).length;o<=1?this.setState({featureFormStep:"empty"}):o>1&&this.setState({featureFormStep:"list"}),document.getElementById(`edit-container-${e}`).classList.add("esri-hidden")},this.getInLayersConfigFeatures=(e,t)=>{const i=Object.assign({},e);return Object.keys(e).forEach((e=>{t.some((t=>e.includes(t.id)))||delete i[e]})),i},this.state={jimuMapView:void 0,dataSources:{},outputDataSourceIsNotReady:{},editFeatures:{},activeId:void 0,featureFormStep:"empty",filterText:"",formEditable:!1,delConfirm:!1,attrUpdating:!1,formChange:!1,formSubmittable:!0,loading:!1,selectionStartWorkflow:!1},this.dsManager=s.DataSourceManager.getInstance(),this.removeLayerOnce=!1,this.selectedIds={},this.currentRequestId=0,this.timerFn=null,this.editorSelectFeature=!1}componentDidUpdate(i){var a,o,r,l,n,d,u,c,p,h,m,v,f;const{id:g,config:b}=this.props,{editFeatures:S,dataSources:w,activeId:x,jimuMapView:j}=this.state,{editMode:_,layersConfig:F,selfSnapping:E,featureSnapping:I,defaultSelfEnabled:C,defaultFeatureEnabled:M,defaultSnapLayers:N}=b,{config:D}=i,{editMode:O,layersConfig:k,selfSnapping:L,featureSnapping:A,defaultSelfEnabled:R,defaultFeatureEnabled:$,defaultSnapLayers:T}=D,P=!s.lodash.isDeepEqual(k,F);if(0===F.length&&this.destoryEdit(),O!==_&&this.destoryEdit(),P)if(_===e.Geometry)this.createEditor();else{const e=this.edit,i=Object.keys(S),s=F.some((e=>i.includes(e.id))),u=this.getInLayersConfigFeatures(S,F),c=this.flatMapArray(u).length;if((null==e?void 0:e.formTemplate)&&0!==F.length){const i=F.asMutable({deep:!0}).find((e=>e.id===x));if((null==i?void 0:i.layerHonorMode)===t.Webmap){const t=w[x];e.formTemplate=null===(a=null==t?void 0:t.layer)||void 0===a?void 0:a.formTemplate}else if(null==e?void 0:e.formTemplate){const t=this.constructFormElements(),i=new y.default({elements:t});e.formTemplate=i}const s=null===(o=null==e?void 0:e.formTemplate)||void 0===o?void 0:o.elements;0===(null==s?void 0:s.length)?null===(r=document.getElementById(`edit-container-${g}`))||void 0===r||r.classList.add("esri-hidden"):0!==c&&(null===(l=document.getElementById(`edit-container-${g}`))||void 0===l||l.classList.remove("esri-hidden"))}else if(0!==F.length&&s)if(1===c){const e=null==w?void 0:w[i[0]],t=null===(n=e.getSelectedRecords())||void 0===n?void 0:n[0];if(!t)return;this.renderFeatureForm(e,t)}else(c>1||0===c)&&(null===(d=document.getElementById(`edit-container-${g}`))||void 0===d||d.classList.add("esri-hidden"))}if(E!==L||I!==A||C!==R||M!==$||N!==T){const t=E||I,i=this.getDefaultSnapSources(j,N);if(this.edit&&_===e.Geometry){const e=this.edit,s=e.visibleElements,a=Object.assign(Object.assign({},s),{snappingControls:t,snappingControlsElements:{enabledToggle:!0,selfEnabledToggle:E,featureEnabledToggle:I}}),o=e.snappingOptions,r=Object.assign(Object.assign({},o),{enabled:C||M,selfEnabled:C,featureEnabled:M,featureSources:i});e.visibleElements=a,e.snappingOptions=r}}if((null===(c=null===(u=this.props)||void 0===u?void 0:u.stateProps)||void 0===c?void 0:c.removeLayerFlag)&&!this.removeLayerOnce){this.props.dispatch(s.appActions.widgetStatePropChange(g,"removeLayerFlag",!1));const e=Object.assign({},S);Object.keys(e).forEach((t=>{F.find((e=>e.id===t))||delete e[t]}));const t=this.getInLayersConfigFeatures(e,F),i=this.flatMapArray(t),a=i.length,o=a>1?"list":1===a?"form":"empty";if("form"===o){this.removeLayerOnce=!0;const e=null===(m=null===(h=null===(p=i[0])||void 0===p?void 0:p.dataSource)||void 0===h?void 0:h.belongToDataSource)||void 0===m?void 0:m.id;null===(v=document.getElementById(`edit-container-${g}`))||void 0===v||v.classList.remove("esri-hidden"),this.renderFeatureForm(w[e],i[0])}else"list"===o&&(null===(f=document.getElementById(`edit-container-${g}`))||void 0===f||f.classList.add("esri-hidden"));this.setState({editFeatures:e,featureFormStep:o})}}componentWillUnmount(){const{config:t}=this.props,{editMode:i}=t,s=i===e.Geometry;if(this.edit&&!this.edit.destroyed&&s){const e=this.edit;(null==e?void 0:e.cancelWorkflow)&&e.cancelWorkflow()}}render(){var t,i;const{activeId:n,editFeatures:d,featureFormStep:c,formEditable:p,delConfirm:h,attrUpdating:m,formChange:v,formSubmittable:f,loading:g}=this.state,{id:b,theme:y,config:S,useDataSources:w,useMapWidgetIds:x}=this.props,{editMode:j,description:_,layersConfig:F}=S,E=F.asMutable({deep:!0}).find((e=>e.id===n)),I=null!==(t=null==E?void 0:E.updateRecords)&&void 0!==t&&t,C=null!==(i=null==E?void 0:E.deleteRecords)&&void 0!==i&&i,M=this.getInLayersConfigFeatures(d,F),D=this.flatMapArray(M).length,O=F.some((e=>null==e?void 0:e.addRecords)),k=[];I&&k.push({label:this.formatMessage("update"),type:"primary",disabled:!(v&&f),clickHandler:this.handleSave}),C&&k.push({label:this.formatMessage("delete"),type:"default",clickHandler:this.handleDeleteConfirm});const L=[{label:this.formatMessage("add"),type:"primary",disabled:!1,clickHandler:this.handleAdd}],A=j===e.Attribute,$=A&&("form"===c||"new"===c)||!A&&0!==F.length,T=A&&"list"!==c&&"empty"!==c||!A&&0!==F.length,P=A&&"list"!==c&&"empty"!==c;return A||x&&0!==x.length?(0,s.jsx)("div",{className:(0,s.classNames)(`jimu-widget widget-edit esri-widget edit-widget-${b}`),css:r(y,b,c,D,A)},A&&m&&(0,s.jsx)("div",{className:"esri-editor__progress-bar"}),(0,s.jsx)("div",{className:(0,s.classNames)("edit-con",{"surface-1 border-0":$,"h-100":T})},(0,s.jsx)("div",{ref:"formHeaderContainer",className:(0,s.classNames)({"form-header-container":P})}),(0,s.jsx)("div",{ref:"editContainer",className:(0,s.classNames)({"h-100":!A,"attr-height":A&&T})},A&&"new"===c&&(0,s.jsx)("div",{className:"layer-selector"},(0,s.jsx)("label",{className:"esri-feature-form__label"},this.formatMessage("selectLayer")),(0,s.jsx)(o.Select,{value:n,onChange:this.onLayerChange},F.filter((e=>e.addRecords)).map((e=>(0,s.jsx)("option",{key:e.id,value:e.id},e.name)))))),A&&D>0&&"form"===c&&p&&(null==k?void 0:k.length)>0&&this.renderControlButtons(k),A&&"new"===c&&this.renderControlButtons(L)),!A&&(0,s.jsx)(a.JimuMapViewComponent,{useMapWidgetId:null==x?void 0:x[0],onActiveViewChange:this.handleActiveViewChange}),A&&D>1&&"list"===c&&this.renderFeatureList(M,_),g&&(0,s.jsx)("div",{className:"esri-feature-table__loader-container"},(0,s.jsx)("div",{className:"esri-feature-table__loader",key:"loader"})),A&&("empty"===c||0===F.length)&&this.renderFormEmpty(_),!A&&0===F.length&&this.renderFormEmpty(),A&&h&&(0,s.jsx)(s.React.Fragment,null,(0,s.jsx)("div",{className:"confirm-scrim"}),(0,s.jsx)("div",{className:"esri-editor__prompt--danger"},(0,s.jsx)("div",{className:"esri-editor__prompt__header"},(0,s.jsx)(N,null),(0,s.jsx)("h4",{className:(0,s.classNames)("esri-widget__heading","esri-editor__prompt__header__heading")},this.formatMessage("deleteRecord"))),(0,s.jsx)("div",{className:"esri-editor__prompt__message"},this.formatMessage("deleteRecordTips")),(0,s.jsx)("div",{className:"esri-editor__prompt__divider"}),(0,s.jsx)("div",{className:"esri-editor__prompt__actions"},(0,s.jsx)(o.Button,{className:(0,s.classNames)(H,"esri-editor__warning-option--primary"),onClick:this.cancleDelete},this.formatMessage("keepRecord")),(0,s.jsx)(o.Button,{className:(0,s.classNames)(H,"esri-editor__warning-option--positive"),onClick:this.handleDelete},this.formatMessage("delete"))))),A&&O&&"form"!==c&&"new"!==c&&(0,s.jsx)(o.Button,{size:"sm",icon:!0,type:"tertiary",className:"add-feature-btn",onClick:this.handleNew,title:this.formatMessage("addFeature"),"aria-label":this.formatMessage("addFeature")},(0,s.jsx)(u,{className:"mr-1"}),this.formatMessage("add")),(0,s.jsx)("div",{className:"ds-container"},null==w?void 0:w.map(((e,t)=>(0,s.jsx)(l,{key:t,useDataSource:e,onIsDataSourceNotReady:this.onIsDataSourceNotReady,onDataSourceSelectedChange:this.onDataSourceSelectedChange,onCreateDataSourceCreatedOrFailed:this.onCreateDataSourceCreatedOrFailed,onDataSourceVersionChange:this.onDataSourceVersionChange}))))):(0,s.jsx)(o.WidgetPlaceholder,{widgetId:b,autoFlip:!0,iconSize:"large",style:{position:"absolute",left:0,top:0},icon:R,"data-testid":"editPlaceholder"})}}G.mapExtraStateProps=(e,t)=>{var i;return{appMode:null===(i=null==e?void 0:e.appRuntimeInfo)||void 0===i?void 0:i.appMode}},G.versionManager=I;const Z=G;function q(e){m.p=e}})(),v})())}}}));