System.register(["jimu-core","jimu-for-builder","jimu-theme","jimu-ui","jimu-ui/advanced/setting-components","jimu-ui/advanced/style-setting-components","jimu-ui/basic/color-picker"],(function(e,t){var a={},n={},o={},l={},r={},s={},c={};return{setters:[function(e){a.CONSTANTS=e.CONSTANTS,a.Immutable=e.Immutable,a.React=e.React,a.ReactRedux=e.ReactRedux,a.ThemeThemeAlertColorKeys=e.ThemeThemeAlertColorKeys,a.ThemeThemeColorKeys=e.ThemeThemeColorKeys,a.classNames=e.classNames,a.css=e.css,a.hooks=e.hooks,a.i18n=e.i18n,a.injectIntl=e.injectIntl,a.jsx=e.jsx,a.urlUtils=e.urlUtils,a.useIntl=e.useIntl,a.utils=e.utils},function(e){n.getAppConfigAction=e.getAppConfigAction,n.helpUtils=e.helpUtils},function(e){o.styled=e.styled,o.useTheme2=e.useTheme2},function(e){l.Button=e.Button,l.Dropdown=e.Dropdown,l.DropdownButton=e.DropdownButton,l.DropdownItem=e.DropdownItem,l.DropdownMenu=e.DropdownMenu,l.Label=e.Label,l.PanelHeader=e.PanelHeader,l.Slider=e.Slider,l.Tooltip=e.Tooltip,l.defaultMessages=e.defaultMessages,l.useTrapFocusByBounderyNodes=e.useTrapFocusByBounderyNodes},function(e){r.SettingRow=e.SettingRow,r.SettingSection=e.SettingSection},function(e){s.FontFamilySelector=e.FontFamilySelector},function(e){c.ColorPicker=e.ColorPicker}],execute:function(){e((()=>{var e={8371:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="m6.036 12.157 8.01-8.01a.5.5 0 1 1 .707.707l-8.01 8.01a1 1 0 0 1-1.415 0L1.146 8.682a.5.5 0 1 1 .708-.707l4.182 4.182Z"></path></svg>'},3869:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M15 7.5a.522.522 0 0 1-.516.527H2.976L6.473 11.6a.535.535 0 0 1 0 .746.508.508 0 0 1-.73 0L1 7.5l4.743-4.846a.508.508 0 0 1 .73 0 .535.535 0 0 1 0 .746L2.976 6.973h11.508c.285 0 .516.236.516.527Z"></path></svg>'},9788:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M2.146 4.653a.485.485 0 0 1 .708 0L8 10.24l5.146-5.587a.485.485 0 0 1 .708 0 .538.538 0 0 1 0 .738l-5.5 5.956a.485.485 0 0 1-.708 0l-5.5-5.956a.538.538 0 0 1 0-.738Z" clip-rule="evenodd"></path></svg>'},3273:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M4.653 13.854a.485.485 0 0 1 0-.708L10.24 8 4.653 2.854a.485.485 0 0 1 0-.708.538.538 0 0 1 .738 0l5.956 5.5a.485.485 0 0 1 0 .708l-5.956 5.5a.538.538 0 0 1-.738 0Z" clip-rule="evenodd"></path></svg>'},9216:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M11.226 1.312c-.403-.404-1.044-.417-1.431-.03L2.49 8.587l-.48 2.674a.637.637 0 0 0 .73.73l2.673-.48 7.305-7.306c.387-.387.374-1.028-.03-1.431l-1.462-1.462Zm-8.113 9.575.32-1.781 4.991-4.992 1.462 1.462-4.992 4.991-1.781.32Zm7.473-6.012 1.402-1.4-1.462-1.463-1.401 1.402 1.461 1.461Z" clip-rule="evenodd"></path><path fill="#000" d="M1.5 14a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1h-13Z"></path></svg>'},1397:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm1 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-7.676 2.228H7.34c-.213-1.138.621-2.13 1.375-3.025C9.28 6.532 9.8 5.914 9.8 5.328 9.8 4.5 9.2 3.9 7.976 3.9c-.816 0-1.572.36-2.268 1.092l-.648-.6C5.852 3.552 6.788 3 8.096 3c1.692 0 2.772.864 2.772 2.244 0 .864-.652 1.628-1.3 2.387-.71.831-1.413 1.655-1.244 2.597Zm.3 2.172c0 .48-.348.792-.768.792-.432 0-.78-.312-.78-.792 0-.48.348-.804.78-.804.42 0 .768.324.768.804Z" clip-rule="evenodd"></path></svg>'},8891:e=>{"use strict";e.exports=a},3137:e=>{"use strict";e.exports=n},4796:e=>{"use strict";e.exports=o},726:e=>{"use strict";e.exports=l},7756:e=>{"use strict";e.exports=r},5505:e=>{"use strict";e.exports=s},1362:e=>{"use strict";e.exports=c}},t={};function i(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,i),o.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="";var m={};return i.p=window.jimuConfig.baseUrl,(()=>{"use strict";i.r(m),i.d(m,{__set_webpack_public_path__:()=>ne,default:()=>ae});var e=i(8891),t=i(3137),a=i(4796);const n=a.styled.div`
  height: 100%;
  flex: 1;
  overflow: auto;
`,o=t=>{const{active:a,children:o}=t;return e.React.createElement(n,{className:(0,e.classNames)("stepper",{"d-none":!a})},a&&o)};var l=i(726),r=i(8371),s=i.n(r);const c=t=>{const a=window.SVG,{className:n}=t,o=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a}(t,["className"]),l=(0,e.classNames)("jimu-icon jimu-icon-component",n);return a?e.React.createElement(a,Object.assign({className:l,src:s()},o)):e.React.createElement("svg",Object.assign({className:l},o))},u=t=>{var a,n;const{className:o,themeInfo:r,selectedTheme:s,onSelect:i}=t,m=r.uri===s,u=null!==(n=null===(a=r.i18nLabel)||void 0===a?void 0:a[window.locale])&&void 0!==n?n:r.label,d=r.font,p=((t,a)=>e.React.useMemo((()=>{var n,o,l;return e.css`
    display: flex;
    flex-direction: column;
    align-items: center;
    > .btn {
      width: 100%;
      height:auto;
      background: var(--light-200);
      border: 2px solid transparent;
      &:hover {
        border: 2px solid transparent;
      }
      &:not(:disabled):not(.disabled):active,
      &:not(:disabled):not(.disabled).active {
        background: var(--light-200);
        border: 2px solid var(--primary-700);
      }
      > .theme-preview {
        width: 100%;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: url(${t}) no-repeat center;
        background-size: cover;
        .theme-preview--inner {
          font-size: small;
          text-align: center;
          line-height: 1;
          > img {
            width: 100%;
          }
          label {
            margin-bottom: 0;
            line-height: 1.25;
            font-size: 1.25rem;
            font-family: ${null!==(n=null==a?void 0:a.fontFamily)&&void 0!==n?n:"inherit"};
            font-weight: ${null!==(o=null==a?void 0:a.fontWeight)&&void 0!==o?o:"inherit"};
            color: ${null!==(l=null==a?void 0:a.color)&&void 0!==l?l:"inherit"};
          }
        }
        > label {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 100%;
          margin-top: .5rem;
          margin-bottom: 1rem;
        }
      }
    }
    > label {
      margin-bottom: 0;
      margin-top: 0.25rem;
    }
    + .theme-card {
      margin-left: 1rem;
    }
    &.active {
      position: relative;
      .check-ribbon {
        position: absolute;
        padding: .25rem;
        background: var(--primary-700);
        inline-size: inherit;
        line-height: 1;
        z-index: 1;
        right: 0px;
        top: 0px;
        color: var(--white);
      }
    }
  `}),[a,t]))(`../${r.uri}thumbnail.png`,d),h=(0,e.classNames)("theme-selector-card",o,{active:m});return(0,e.jsx)("div",{className:h,css:p},m&&(0,e.jsx)("span",{className:"check-ribbon"},(0,e.jsx)(c,null)),(0,e.jsx)(l.Button,{className:"p-0",onClick:()=>{null==i||i(r.uri)},active:m,"aria-label":u},(0,e.jsx)("div",{className:"theme-preview",title:u},(0,e.jsx)("div",{className:"theme-preview--inner text-break"},(0,e.jsx)(l.Label,{className:"mx-3"},u)))))},d={chooseTheme:"Theme",customTheme:"Customize",resetTheme:"Reset",backToMainThemePanel:"Back",customPaletteTitle:"Customize palette colors",customFontsetTitle:"Customize font set",customAppElementsTitle:"App elements"};var p=i(1397),h=i.n(p);const f=t=>{const a=window.SVG,{className:n}=t,o=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a}(t,["className"]),l=(0,e.classNames)("jimu-icon jimu-icon-component",n);return a?e.React.createElement(a,Object.assign({className:l,src:h()},o)):e.React.createElement("svg",Object.assign({className:l},o))},g=a.styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .themes-pane {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    flex: 1 1 0%;
    > .themes-selectors {
      display: flex;
      flex-direction: column;
      > .theme-selector-card + .theme-selector-card {
        margin-top: 1rem;
      }
    }
  }
  > .btn-container {
    display: flex;
    > button {
      font-size: 1rem;
    }
  }
`,b=e.React.forwardRef(((a,n)=>{const o=e.hooks.useTranslation(d,l.defaultMessages),r=(0,e.useIntl)(),s=o("chooseTheme"),c=o("help"),[i,m]=e.React.useState("#");return e.React.useEffect((()=>{t.helpUtils.getBuildAppsHelpLink("change-app-theme").then((e=>{m(e)}))}),[]),e.React.createElement("div",{className:"d-flex justify-content-between align-items-center w-100"},e.React.createElement("div",{className:"title text-truncate mr-2",title:s},s),e.React.createElement(l.Button,{ref:n,size:"sm",type:"tertiary",icon:!0,title:c,"aria-label":c,href:i,target:"_blank",className:(0,e.classNames)("p-0")},e.React.createElement(f,{autoFlip:!e.i18n.isSameLanguage(null==r?void 0:r.locale,"he")})))})),v=t=>{const{className:a,themeListInfo:n,disabled:o,selectedTheme:r,onChange:s,onCustomize:c}=t,i=(0,e.classNames)("theme-selector",a),m=e.hooks.useTranslation(d,l.defaultMessages),p=e.React.useRef(null);return e.React.useEffect((()=>{p.current.focus()}),[]),e.React.createElement(g,{className:i},e.React.createElement(l.PanelHeader,{className:"px-3 pt-3",title:e.React.createElement(b,{ref:p}),showClose:!1}),n&&e.React.createElement("div",{className:"themes-pane px-3 mt-3"},e.React.createElement("div",{className:"themes-selectors",role:"group","aria-label":m("chooseTheme")},n.map((t=>e.React.createElement(u,{key:t.name,selectedTheme:r,themeInfo:t,onSelect:s}))))),n&&e.React.createElement("div",{className:"btn-container w-100 p-3"},e.React.createElement(l.Button,{type:"primary",className:"flex-fill theme-setting--customize-btn text-truncate",onClick:c,disabled:o,"aria-label":m("customTheme")},m("customTheme"))),!n&&e.React.createElement("div",{className:"loading"},m("loading")))};var y=i(7756),w=i(9216),R=i.n(w);const x=t=>{const a=window.SVG,{className:n}=t,o=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a}(t,["className"]),l=(0,e.classNames)("jimu-icon jimu-icon-component",n);return a?e.React.createElement(a,Object.assign({className:l,src:R()},o)):e.React.createElement("svg",Object.assign({className:l},o))};var N=i(1362);const E=(0,a.styled)(N.ColorPicker)((e=>{var t;return`\n    width: 3rem;\n    height: 3rem;\n    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);\n    transition: box-shadow 0.15s ease-out;\n    border-radius: 100%;\n    outline: 0;\n    color: white;\n    background-color: ${null!==(t=e.color)&&void 0!==t?t:"var(--light-500)"};\n    &:hover {\n      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5);\n    }\n  `})),C=t=>{const{className:a}=t,n=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a}(t,["className"]),o=(0,e.classNames)(a,"primary-color-picker");return e.React.createElement(E,Object.assign({className:o,icon:e.React.createElement(x,null),type:"icon-only"},n))},O=t=>{const{className:a,label:n,value:o,onChange:l}=t,r=(0,e.classNames)("single-color-configurator",a,"d-flex flex-column");return e.React.createElement("div",{className:r},e.React.createElement("div",{className:"jumbo-color-picker"},e.React.createElement(C,{className:"mx-auto mb-2",color:o,onChange:l})),e.React.createElement("label",null,n))};var j=i(5505);const k=a.styled.div((({theme:e})=>{var t,a,n,o,l,r,s;return`\n    position: relative;\n    padding-bottom: 1.5rem;\n    > i {\n      font-style: normal;\n      min-width: 1.25rem;\n      text-align: center;\n    }\n    .slider-rules {\n      position: absolute;\n      bottom: 0;\n      left: 2.25rem;\n      right: 2.25rem;\n      font-size: ${null===(a=null===(t=null==e?void 0:e.typography)||void 0===t?void 0:t.sizes)||void 0===a?void 0:a.body2};\n      color: ${null===(o=null===(n=null==e?void 0:e.colors)||void 0===n?void 0:n.palette)||void 0===o?void 0:o.dark[400]};\n      > span {\n        display: inline-block;\n        transform: translateX(-50%);\n        position: absolute;\n        bottom: 0;\n        &.active {\n          color: ${null===(l=null==e?void 0:e.body)||void 0===l?void 0:l.color};\n          font-size: ${null===(s=null===(r=null==e?void 0:e.typography)||void 0===r?void 0:r.sizes)||void 0===s?void 0:s.body1};\n          margin-bottom: -1px;\n        }\n      }\n    }\n  `}));class T extends e.React.PureComponent{constructor(){super(...arguments),this.onFontSizeChange=e=>{const t=e.currentTarget.value,a=this.props.options[t-1];this.props&&this.props.onChange&&this.props.onChange(a)},this.i18n=e=>{const t=this.props.intl;return t?t.formatMessage({id:e,defaultMessage:l.defaultMessages[e]}):e}}render(){const{fontSize:t,options:a,className:n}=this.props,o=(0,e.classNames)("setting--fontsize-selector",n,"d-flex align-items-center"),r=null===window||void 0===window?void 0:window._appState.appContext.isRTL,s=a?a.length:1,c=a.length>1?100/(a.length-1):0;let i=1;return a&&a.some(((e,a)=>e===t&&(i=a+1,!0))),e.React.createElement(k,{className:o},(null==a?void 0:a.length)>0?e.React.createElement(e.React.Fragment,null,e.React.createElement("i",{style:{fontSize:"12px"}},"A"),e.React.createElement(l.Slider,{title:this.i18n("variableFontSizeBase"),"aria-label":this.i18n("variableFontSizeBase"),min:1,max:s,value:i,className:"mx-3",onChange:this.onFontSizeChange}),e.React.createElement("div",{className:"slider-rules"},a.map(((t,a)=>e.React.createElement("span",{key:a,className:i===a+1?"active":void 0,style:{[r?"right":"left"]:a*c+"%"}},e.utils.formatPercentageNumber(t))))),e.React.createElement("i",{style:{fontSize:"18px"}},"A")):null)}}T.defaultProps={options:["87.5%","100%","125%"]};const S=(0,e.injectIntl)(T),P=["75%","87.5%","100%","125%"];class I extends e.React.PureComponent{constructor(){super(...arguments),this.onFontChange=e=>{this.props.onChange({typography:{fontFamilyBase:e}})},this.onFontSizeChange=e=>{this.props.onChange({typography:{fontSizeRoot:e}})},this.i18n=e=>{const t=this.props.intl;return t?t.formatMessage({id:e,defaultMessage:l.defaultMessages[e]}):e}}render(){var t,a;const{className:n,themeVariables:o}=this.props,l=(0,e.classNames)("jimu-builder-theme-fontset-configurator",n,"w-100");let r=null===(t=null==o?void 0:o.typography)||void 0===t?void 0:t.fontFamilyBase;return"string"==typeof r&&(r=r.split(",")[0].replace(/['"]+/g,"")),e.React.createElement("div",{className:l},e.React.createElement(y.SettingRow,null,e.React.createElement(j.FontFamilySelector,{font:r,"aria-label":this.i18n("themeSettingThemeFont"),onChange:e=>{this.onFontChange(e)}})),e.React.createElement(y.SettingRow,null,e.React.createElement(S,{className:"w-100",fontSize:null===(a=null==o?void 0:o.typography)||void 0===a?void 0:a.fontSizeRoot,options:P,onChange:e=>{this.onFontSizeChange(e)}})))}}const M=(0,e.injectIntl)(I);var B=i(3273),A=i.n(B);const F=t=>{const a=window.SVG,{className:n}=t,o=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a}(t,["className"]),l=(0,e.classNames)("jimu-icon jimu-icon-component",n);return a?e.React.createElement(a,Object.assign({className:l,src:A()},o)):e.React.createElement("svg",Object.assign({className:l},o))};var z=i(3869),$=i.n(z);const L=t=>{const a=window.SVG,{className:n}=t,o=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a}(t,["className"]),l=(0,e.classNames)("jimu-icon jimu-icon-component",n);return a?e.React.createElement(a,Object.assign({className:l,src:$()},o)):e.React.createElement("svg",Object.assign({className:l},o))},_=a.styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .theme-quick-style {
    height: 100%;
    flex: 1 1 0%;
    overflow: auto;
  }
  .back-main-btn {
    font-size: 1rem;
    font-weight: 500;
    > svg {
      position: relative;
      top: -2px;
    }
  }
`,D=t=>{var a;const{className:n,theme:o,onChange:r,onReset:s,onBack:c,onAdvance:i}=t,m=e.hooks.useTranslation(d,l.defaultMessages),u=(0,e.classNames)("jimu-builder-theme-quickstyler",n),p=e.React.useRef(null),h=e.React.useRef(null);return e.React.useEffect((()=>{p.current.focus()}),[]),(0,l.useTrapFocusByBounderyNodes)(p,h),e.React.createElement(_,{className:u},e.React.createElement("div",{className:"jimu-widget-setting--header px-1 pb-0"},e.React.createElement(l.Button,{ref:p,className:"back-main-btn",type:"tertiary",onClick:c,"aria-label":m("backToMainThemePanel")},e.React.createElement(L,{className:"mr-1",autoFlip:!0}),m("backToMainThemePanel"))),o&&e.React.createElement(e.React.Fragment,null,e.React.createElement("div",{className:"theme-quick-style"},e.React.createElement(y.SettingSection,{title:m("themeSettingThemeColors"),role:"group","aria-label":m("themeSettingThemeColors")},e.React.createElement(y.SettingRow,{flow:"wrap",className:"justify-content-center"},e.React.createElement(O,{label:m("variableColorPrimary"),"aria-label":m("variableColorPrimary"),value:null===(a=null==o?void 0:o.colors)||void 0===a?void 0:a.primary,className:"m-auto",onChange:e=>{((e,t)=>{null==r||r({colors:{primary:t}})})(0,e)}})),e.React.createElement(y.SettingRow,null,e.React.createElement(l.Button,{type:"tertiary",className:"w-100 p-0 d-flex justify-content-between align-items-center",onClick:i,"aria-label":m("themeSettingThemeColorAdvanced")},m("themeSettingThemeColorAdvanced"),e.React.createElement(F,{className:"m-0",autoFlip:!0})))),e.React.createElement(y.SettingSection,{title:m("themeSettingThemeFont")},e.React.createElement(y.SettingRow,null,e.React.createElement(M,{themeVariables:o,onChange:r})))),e.React.createElement(y.SettingSection,{className:"d-flex"},e.React.createElement(l.Button,{ref:h,className:"flex-fill",type:"secondary",onClick:s,"aria-label":m("resetTheme")},m("resetTheme")))))};var K=i(9788),Z=i.n(K);const U=t=>{const a=window.SVG,{className:n}=t,o=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a}(t,["className"]),l=(0,e.classNames)("jimu-icon jimu-icon-component",n);return a?e.React.createElement(a,Object.assign({className:l,src:Z()},o)):e.React.createElement("svg",Object.assign({className:l},o))},H=a.styled.div((({color:e})=>`\n    width: 2rem;\n    height: 1.25rem;\n    background: ${e};\n    margin-left: -1px;\n  `)),V=t=>{const{colors:a,hideAlertColors:n,darkTheme:o}=t,l=e.React.useMemo((()=>{const t=[];let l,r;return Object.keys(e.ThemeThemeColorKeys).forEach(((o,s)=>{const c=Object.keys(e.ThemeThemeAlertColorKeys);n&&c.includes(o)||("Dark"===o?l=s:"Light"===o&&(r=s),t.push(e.React.createElement(H,{key:o,className:"color-palette-block border border-light-800",color:a[e.ThemeThemeColorKeys[o]]})))})),o&&l>-1&&r>-1&&([t[l],t[r]]=[t[r],t[l]]),t}),[a,o,n]);return e.React.createElement(e.React.Fragment,null,a?e.React.createElement("div",{className:"color-palette d-flex flex-fill"},l):e.React.createElement("span",null,"---"))};class G extends e.React.PureComponent{constructor(t){super(t),this._optionsToKeep=(0,e.Immutable)([]),this.getColorPaletteOptions=t=>{const a=[];let n=!1;const o=this.props.isDarkTheme;if(o&&(t=t.merge({light:t.dark,dark:t.light})),this._optionsToKeep.concat(q).forEach(((r,s)=>{const c=t.merge(r);let i=!1;n||(n=this.arePalettesEqual(t,c),n&&(i=!0)),a.push(e.React.createElement(l.DropdownItem,{className:"py-2",onClick:()=>{this.onPaletteClick(c)},key:s+1,active:i,"aria-label":`${this.i18n("customColor")} ${s+1}`},e.React.createElement(V,{colors:c,hideAlertColors:!1,darkTheme:o})))})),!n){const n=e.React.createElement(l.DropdownItem,{className:"py-2",onClick:()=>{this.onPaletteClick(t)},key:0,active:!0},e.React.createElement(V,{colors:t,hideAlertColors:!1,darkTheme:o}));a.splice(0,0,n),this._optionsToKeep=(0,e.Immutable)([t])}return a},this.i18n=e=>{const t=this.props.intl;return t?t.formatMessage({id:e,defaultMessage:l.defaultMessages[e]}):e},this.state={menuOpened:!1}}onPaletteClick(e){this.props&&this.props.onChange&&this.props.onChange(e)}arePalettesEqual(e,t){return!(!e||!t)&&!Object.keys(e).some((a=>e[a].toLowerCase()!==t[a].toLowerCase()))}render(){const{colors:t,className:a,style:n}=this.props,o=(0,e.classNames)("setting--palette-selector",a);return e.React.createElement(l.Dropdown,{style:n,direction:"right",isOpen:this.state.menuOpened,toggle:e=>{this.setState({menuOpened:!this.state.menuOpened})},className:o,activeIcon:!0,menuItemCheckMode:"singleCheck"},e.React.createElement(l.DropdownButton,{type:"tertiary",className:"p-0","aria-label":this.i18n("variableCustomPalette"),arrow:e.React.createElement(U,null)}),e.React.createElement(l.DropdownMenu,null,this.getColorPaletteOptions(t)))}}const q=(0,e.Immutable)([{primary:"#0a77c6",secondary:"#ecf1f8",info:"#4aa0e2",success:"#7ed321",warning:"#f8e71c",danger:"#f6143a",light:"#f8f8f8",dark:"#080808"},{primary:"#ff7121",secondary:"#2d1754",info:"#09acf8",success:"#00cca5",warning:"#ffab21",danger:"#f6146f",light:"#fff",dark:"#333"},{primary:"#21cfca",secondary:"#242933",info:"#00b7ff",success:"#07ea58",warning:"#f8e71c",danger:"#d0021b",light:"#fff",dark:"#000"},{primary:"#f74d61",secondary:"#153054",info:"#00b7ff",success:"#07ea58",warning:"#f8e71c",danger:"#ff001f",light:"#fff",dark:"#111"},{primary:"#4ccded",secondary:"#1b476d",info:"#00b7ff",success:"#07ea58",warning:"#f8e71c",danger:"#d0021b",light:"#fff",dark:"#111"},{primary:"#442b57",secondary:"#ffd11c",info:"#09acf8",success:"#00cca5",warning:"#ffab21",danger:"#f6146f",light:"#fff",dark:"#2d3235"}]),W=(0,e.injectIntl)(G);const X=(0,a.styled)("div",{shouldForwardProp:e=>"color"!==e})((t=>e.css`
    width: 20px;
    height: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: ${t.color};
    .color-picker-block {
      width: unset;
      height: unset;
      padding: 0px;
      border-radius: 100%;
      .color-block {
        border-radius: 100%;
        width: unset;
        height: unset;
        .color-presenter {
          outline: 1px solid rgba(255,255,255, 0.15);
          transition: outline .15s ease-out;
          border-radius: 100%;
          margin: -2px;
          width: 20px;
          height: 20px;
          border-width: 0;
          &:hover {
            outline: 3px solid rgba(255,255,255,.5);
          }
        }
      }
    }
    .cert {
      display: block;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top-color: currentColor;
      border-bottom-width: 0;
    }
  `)),Y=e.React.forwardRef(((t,a)=>{const{className:n,color:o}=t,l=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a}(t,["className","color"]);return e.React.createElement(X,{className:(0,e.classNames)("custom-color-picker",n),color:o},e.React.createElement(N.ColorPicker,Object.assign({color:o},l,{ref:a})),e.React.createElement("span",{className:"cert"}))})),J=a.styled.div`
  display: flex;
  justify-content: space-between;
  .custom-color-picker {
    margin-right: 6px;
    margin-bottom: 10px;
  }
  .theme-color-configurator--shades {
    width: 1.25rem;
    border: 1px solid var(--light-500);
    > span {
      display: block;
      width: 100%;
      height: 1.25rem;
      background: currentColor;
      &.main-color-shade {
        &::after {
          content: ' ';
          display: block;
          width: 0;
          height: 0;
          border: 4px solid transparent;
          border-left-color: var(--dark-500);
          position: relative;
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`,Q=t=>{const{colors:a,onChange:n}=t,o=null==a?void 0:a.palette,r=e.React.useMemo((()=>{let t=(0,e.Immutable)({});return Object.keys(e.ThemeThemeColorKeys).forEach((n=>{t=t.set(e.ThemeThemeColorKeys[n],a[e.ThemeThemeColorKeys[n]])})),t}),[a]),s=e.hooks.useTranslation(l.defaultMessages);return e.React.createElement(J,null,Object.keys(r).map((t=>{const a=s(`variableColor${t.charAt(0).toUpperCase()+t.slice(1)}`),c="light"===t?"100":"dark"===t?"900":"500",i="string"==typeof t?s(`variableColor${t.charAt(0).toUpperCase()+t.slice(1)}`):"";return e.React.createElement("div",{className:"theme-color-configurator--column",key:t},e.React.createElement(l.Tooltip,{showArrow:!0,placement:"top",title:i},e.React.createElement(Y,{style:{color:r[t]},id:`colorConfigurator_colorPicker_${t}`,color:r[t],"aria-label":i,onChange:e=>{n(t,e)}})),e.React.createElement("div",{className:"theme-color-configurator--shades"},o&&Object.keys(o[t]).map((n=>e.React.createElement("span",{title:`${a}-${n}${n===c?` (${a})`:""}: ${o[t][n]}`,className:n===c?"main-color-shade":void 0,key:`${t}-${n}`,style:{color:o[t][n]}})))))})))},ee=a.styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .back-main-btn {
    font-size: 1rem;
    font-weight: 500;
    > svg {
      position: relative;
      top: -2px;
    }
  }
  .palette-selector {
    display: flex;
  }
  .setting--palette-selector {
    margin-top: -2px;
  }
`,te=t=>{const{className:a,theme:n,onChange:o,onBack:r,onReset:s}=t,c=e.React.useId(),i=e.hooks.useTranslation(d,l.defaultMessages),m=e.React.useRef(null),u=e.React.useRef(null);e.React.useEffect((()=>{m.current.focus()}),[]),(0,l.useTrapFocusByBounderyNodes)(m,u);const p=e.React.useMemo((()=>{let t=(0,e.Immutable)({});return Object.keys(e.ThemeThemeColorKeys).forEach((a=>{t=t.set(e.ThemeThemeColorKeys[a],null==n?void 0:n.colors[e.ThemeThemeColorKeys[a]])})),t}),[null==n?void 0:n.colors]),h=(0,e.classNames)("theme-color-configurator",a);return e.React.createElement(ee,{className:h},e.React.createElement("div",{className:"jimu-widget-setting--header px-1 pb-0"},e.React.createElement(l.Button,{ref:m,className:"back-main-btn",type:"tertiary",onClick:r,"aria-label":i("backToMainThemePanel")},e.React.createElement(L,{className:"mr-1",autoFlip:!0}),i("backToMainThemePanel"))),e.React.createElement(y.SettingSection,{title:i("themeSettingThemeColors"),role:"group","aria-label":i("themeSettingThemeColors"),"aria-describedby":c,className:"widget-builder-themes--pane flex-fill"},e.React.createElement("p",{id:c,className:"text-dark-400 text-break"},i("themeSettingThemeColorsDescription")),e.React.createElement("div",{className:"palette-selector"},e.React.createElement(Q,{colors:null==n?void 0:n.colors,onChange:(e,t)=>{null==o||o({colors:{[e]:t}})}}),e.React.createElement(W,{className:"d-block",colors:p,isDarkTheme:n.darkTheme,onChange:e=>{null==o||o({colors:e})}}))),e.React.createElement(y.SettingSection,{className:"d-flex"},e.React.createElement(l.Button,{ref:u,className:"flex-fill",type:"secondary",onClick:s,"aria-label":i("resetTheme")},i("resetTheme"))))};const ae=()=>{const n=e.ReactRedux.useSelector((e=>{var t;return null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appConfig})),l=(0,a.useTheme2)(),[r,s]=e.React.useState(0),[c,i]=e.React.useState(null),m=(null==n?void 0:n.theme)&&l;e.React.useEffect((()=>{var t,a,n,o;(t=void 0,a=void 0,n=void 0,o=function*(){const t=yield fetch(`${e.urlUtils.getAbsoluteRootUrl()}themes/themes-info.json`);return yield Promise.resolve((0,e.Immutable)(yield t.json()))},new(n||(n=Promise))((function(e,l){function r(e){try{c(o.next(e))}catch(e){l(e)}}function s(e){try{c(o.throw(e))}catch(e){l(e)}}function c(t){var a;t.done?e(t.value):(a=t.value,a instanceof n?a:new n((function(e){e(a)}))).then(r,s)}c((o=o.apply(t,a||[])).next())}))).then((e=>{i(e),s(1)}))}),[]);const u=a=>{var o;if(!a)return;let l=null!==(o=n.customTheme)&&void 0!==o?o:(0,e.Immutable)({});l=l.merge(a,{deep:!0}),(0,t.getAppConfigAction)(n).editCustomTheme(l).exec()},d=()=>{(0,t.getAppConfigAction)(n).editCustomTheme((0,e.Immutable)({})).exec()};return e.React.createElement("div",{className:"jimu-widget widget-builder-themes d-flex flex-column bg-light-300 w-100 h-100"},m&&e.React.createElement(e.React.Fragment,null,e.React.createElement(o,{active:1===r},e.React.createElement(v,{themeListInfo:c,selectedTheme:null==n?void 0:n.theme,onChange:a=>{if(!a)return;const o=(0,e.Immutable)({});(0,t.getAppConfigAction)(n).editTheme(a).editCustomTheme(o).exec()},disabled:(null==n?void 0:n.theme)===e.CONSTANTS.SHARED_THEME,onCustomize:()=>{s(2)}})),e.React.createElement(o,{active:2===r},e.React.createElement(D,{theme:l,onChange:u,onReset:d,onBack:()=>{s(1)},onAdvance:()=>{s(3)}})),e.React.createElement(o,{active:3===r},e.React.createElement(te,{theme:l,onChange:u,onReset:d,onBack:()=>{s(2)}}))))};function ne(e){i.p=e}})(),m})())}}}));