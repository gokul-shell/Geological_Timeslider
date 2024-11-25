System.register(["jimu-core"],(function(r,e){var t={};return{setters:[function(r){t.css=r.css}],execute:function(){r((()=>{"use strict";var r={8891:r=>{r.exports=t}},e={};function o(t){var i=e[t];if(void 0!==i)return i.exports;var l=e[t]={exports:{}};return r[t](l,l.exports,o),l.exports}o.d=(r,e)=>{for(var t in e)o.o(e,t)&&!o.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:e[t]})},o.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),o.r=r=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})};var i={};return(()=>{o.r(i),o.d(i,{Global:()=>l,Nav:()=>e,Select:()=>t});var r=o(8891);const e=e=>{const t=e.pills;return r.css`
    ${t&&r.css`
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      .nav-item {
        .nav-link {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    `}
  `},t=e=>{var t,o,i;const l=e.theme;return r.css`
    .dropdown-button {
      .caret-icon {
        color: ${null===(i=null===(o=null===(t=null==l?void 0:l.colors)||void 0===t?void 0:t.palette)||void 0===o?void 0:o.dark)||void 0===i?void 0:i[600]};
        svg {
          height: 8px;
          width: 8px;
        }
      }
    }
  `},l=e=>{const t=e.theme;return r.css`
    html, body {
      overflow: hidden;
    }
    html.scrollable {
      overflow: auto;
      body {
        overflow: unset;
      }
    }
    /* Scrollbar */
    ${t&&r.css`
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: ${t.colors.palette.light[500]};
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${t.colors.palette.light[800]};
      }
    `}
    .jimu-widget-setting--header {
      padding: ${t.sizes[3]} ${t.sizes[3]};
      margin-bottom: 0;
      line-height: 1;
    }
  `}})(),i})())}}}));