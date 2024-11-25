// import { React, AllWidgetProps } from 'jimu-core';
// import { useEffect, useState, useRef } from 'react';
// import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
// import { CalciteIcon } from 'calcite-components';
// import TimeChartComponent from '../../../Timechart/src/runtime/widget';
// import FeatureTableComponent from '../../../FeatureTable/src/runtime/widget';
// import data from '../../data/data.json';
// import urls from '../../data/urls.json';
// import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
// import Measurement from '@arcgis/core/widgets/Measurement';
// import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
// import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
// import { color } from 'jimu-ui/basic/color-picker';
// import "../css/Style.css"

// const Widget = (props: AllWidgetProps<any>) => {
//   const [jimuMapView, setJimuMapView] = useState<JimuMapView>();
//   const [showChart, setShowChart] = useState<boolean>(true);
//   const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
//   const [showPaper, setShowPaper] = useState<boolean>(false);

//   const measurementRef = useRef<Measurement | null>(null);
//   const basemapGalleryRef = useRef<BasemapGallery | null>(null);

//   const urllist = urls["url"]
//   console.log(urllist[0]["Drilled_Hole_Analysis"])
//   const [urlsArray, setUrlsArray] = useState<{ label: string, url: string }[]>(props.config.urllst || []);    
//   console.log(props.config.urllst)
//   useEffect(() => {
//     if (props.config.urllst) {
//       setUrlsArray(props.config.urllst);
//       console.log(props.config.urllst)
//     }
//   }, [props.config.urllst]);
 
//  var options = JSON.parse(localStorage.getItem("urllst"))
//  console.log(options)
//   const handleRemove = (urlToRemove: string) => {
//     const updatedUrls = urlsArray.filter(url => url.url !== urlToRemove);
//     setUrlsArray(updatedUrls);
//     props.onSettingChange({
//       id: props.id,
//       config: { urls: updatedUrls }
//     });
//   };
//   const [showTable, setShowTable] = useState(false);

//   const toggleTable = () => {
//     setShowTable((prev) => !prev);
//   };

//   // Data for the Shell's Analyses table
//   const shtable = [
//     { title: "Shell's Analyses", description: "Access Shell data derived by fellow Explorers during PBE studies like GDE, DHA and prospects from BPA2-Prospect." },
//     { title: "Access Information", description: "Geomatics, GEMS, BPA, GeoSigns" },
//     { title: "Description", description: "This web map is part of the Exploration Gallery, providing an overview of data that has been derived by Shell's Explorers." },
//     { title: "", description: "From BPA2-Prospect, prospects and leads are shown with associated information displaying volumes and geological properties." },
//     { title: "", description: "The Global Play Map is found here, containing key underpinning GDE data from PBE studies." },
//     { title: "", description: "The DHA (Drilled Hole Analysis) layer is an initiative to get a global overview of all DHA exercises." },
//     { title: "", description: "The GIS Project layer shows all registered GIS project outlines." },
//     { title: "Contacts", description: "For more information contact Richard Blight, Christopher Hare, and Casey Smithson." },
//     { title: "Create Date", description: "Mon, Jun 21, 2021 5:23 AM" },
//     { title: "Last Updated", description: "Thu, Dec 21, 2023 11:14 AM" },
//     { title: "Views", description: "809" },
//     { title: "Owner", description: "Galvin-George.Tan_shell" },
//   ];
//   const options = [
//     { label: 'Drilled Hole Analysis(DHA) - Global overview', value:urllist[0]["Drilled_Hole_Analysis"] },
//     { label: '(DHA)- Rosettes', value: urllist[1]["DHA_Rosettes"] },
//     { label: 'GDEI Extents', value: urllist[2]["GDEI_Extents"]},
//     { label: 'GDE Interpretations - Shell', value: urllist[3][""] },
//     { label: 'Prospects (BPA2)', value: urllist[4]["Prospects_BPA2"]}
//   ];
//   if (urls && Object.keys(urls).length > 0) {
//     console.log(urls)
//   } else {
//     console.error('The JSON file is empty or invalid');
//   }

//   const handleCheckboxChange = (option: string) => {
//     const updatedCheckedOptions = checkedOptions.includes(option)
//       ? checkedOptions.filter(item => item !== option)
//       : [...checkedOptions, option];
    
//     setCheckedOptions(updatedCheckedOptions);
//     localStorage.setItem('ckd', JSON.stringify(updatedCheckedOptions));
//   };

//   const activeViewChangeHandler = (jmv: JimuMapView) => {
//     if (jmv) {
//       setJimuMapView(jmv);
//       const map = jmv.view.map;

//       // Add Feature Layers
//       // const featureLayers = new FeatureLayer({ url: urllist[4]?.["Drilled_Hole_Analysis"] })
      
      
//         var bookmark = document.getElementsByClassName("bookmark-container");
       
//         for (var i = 0; i < bookmark.length; i++) {
//           var element = bookmark[i] as HTMLElement;
//           element.style.display = "none";
//       }
//     }
  
//   };

//   const toggleMeasure = () => {
//     if (jimuMapView) {
//       document.getElementById("layerListDiv").style.display = "none";
//       if (measurementRef.current) {
//         jimuMapView.view.ui.remove(measurementRef.current);
//         measurementRef.current.destroy();
//         measurementRef.current = null;
//         console.log('Measurement tool removed');
//       } else {
//         // Remove Basemap Gallery if it is active
//         if (basemapGalleryRef.current) {
//           jimuMapView.view.ui.remove(basemapGalleryRef.current);
//           basemapGalleryRef.current.destroy();
//           basemapGalleryRef.current = null;
//           console.log('Basemap gallery removed');
//         }

//         const measurement = new Measurement({
//           view: jimuMapView.view,
//           activeTool: "distance"
//         });
//         jimuMapView.view.ui.add(measurement, 'top-right');
        
//         measurementRef.current = measurement;
//         const container = measurement.container as HTMLElement;
//         if (container) {
//           container.style.position = 'absolute';
//           container.style.right = '35px'; // Adjust as needed
//           container.style.top = '40px';   // Adjust as needed
//         }
//         console.log('Measurement tool added');
//       }
//     }
//   };

//   const toggleBasemap = () => {
//     if (jimuMapView) {
//       document.getElementById("layerListDiv").style.display = "none";
//       if (basemapGalleryRef.current) {
//         jimuMapView.view.ui.remove(basemapGalleryRef.current);
//         basemapGalleryRef.current.destroy();
//         basemapGalleryRef.current = null;
//         console.log('Basemap gallery removed');
//       } else {
//         // Remove Measurement tool if it is active
//         if (measurementRef.current) {
//           jimuMapView.view.ui.remove(measurementRef.current);
//           measurementRef.current.destroy();
//           measurementRef.current = null;
//           console.log('Measurement tool removed');
//         }

//         const basemapGallery = new BasemapGallery({
//           view: jimuMapView.view,
//         });
//         jimuMapView.view.ui.add(basemapGallery, 'top-right');
//         basemapGalleryRef.current = basemapGallery;
//         const container = basemapGallery.container as HTMLElement;
//         if (container) {
//           container.style.position = 'absolute';
//           container.style.right = '35px'; // Adjust as needed
//           container.style.top = '90px';   // Adjust as needed
//         }
//         console.log('Basemap gallery added');
//       }
//     }
//   };
//    const addBookmark =() =>{
//   var bookmark = document.getElementsByClassName("bookmark-container");

//   for (var i = 0; i < bookmark.length; i++) {
//     var element = bookmark[i] as HTMLElement;
//     if(element.style.display === "none"){
//       element.style.display = "block";
//     }else{
//       element.style.display = "none";
//     }
//     if (!element.querySelector(".bookmark-title")) {
//       var titleDiv = document.createElement("div");
//       titleDiv.className = "bookmark-title";
//       titleDiv.textContent = "BookMarks"; // Title text

//       // Apply styles
//       titleDiv.style.fontWeight = "bold"; // Make text bold
//       titleDiv.style.fontSize = "16px";   // Set font size (adjust as needed)
     
//       // Insert the title div as the first child
//       element.insertBefore(titleDiv, element.firstChild);
//   }
// }
// }

// const ShellsAnalysesTable = () => {
//   console.log("jk")
// return(
//   <div>hjjvvjg</div>
// )

 




// }
//   const closePanel = () => setShowChart(false);
//   const toggleChartVisibility = () => setShowChart(!showChart);

//   const handleIconClick = () => {
//     setShowPaper(!showPaper);
    
//   };

//   useEffect(() => {
//     localStorage.setItem('data1', JSON.stringify(data));
  
//   }, []);
//   useEffect(() => {
//     if(jimuMapView){
      
//       options.forEach(layer => {
//         // Only add the layer if the URL is not empty
//         if (layer) {
//           const featureLayer = new FeatureLayer({ url: layer.value });
//           // console.log(`Adding layer: ${layer.name}`);
//           jimuMapView.view.map.add(featureLayer);
//         } else {
//           console.log(`Skipping layer: ${layer} (URL is empty)`);
//         }
//       });
//       }
//   }, [jimuMapView]);
 
 
//   return (
//     <div className="widget-starter jimu-widget">
//       {props.useMapWidgetIds?.length === 1 && (
//         <JimuMapViewComponent 
//           useMapWidgetId={props.useMapWidgetIds[0]} 
//           onActiveViewChange={activeViewChangeHandler} 
//         />
//       )}
     

//     <header style={{ backgroundColor: 'white', padding: '10px', marginBottom: '20px', position:"fixed",left:"40%",top:"0px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <img src="https://awab.shell.com/mapapps/apps/images/app-logo.png" alt="Header Image" style={{ maxWidth: '100%', height: 'auto',paddingRight:"10px" }} />
//       <h1 style={{ fontSize: '24px', color: '#DD1D21',fontFamily:"verdana", fontWeight:"bold"}}>Shell Maps</h1>
//     </header>
//       <div
//         id="ellipse"
//         style={{
//           position: 'fixed',
//           left: '12px',
//           top: '238px',
//           backgroundColor: 'red',
//           borderRadius: '50%',
//           width: '40px',
//           height: '40px',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           cursor: 'pointer',
//         }}
//         onClick={handleIconClick}
//       >
//         <calcite-icon icon="graph-bar-100-stacked" scale="m" style={{ color: 'white' }} />
        
//       </div>

//       {showPaper && (
//         <div style={{ position: 'relative' }}>
//           <div id="chart" style={{ border: '1px solid #ddd', position: 'relative', background: 'white', display: showChart ? 'block' : 'none' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#DD1D21', color: 'white', borderRadius: '5px 5px 0 0', padding: "3px" }}>
//               <h4 style={{color:"white"}}>Geological TimeSlider</h4>
//               <span 
//                 style={{ cursor: 'pointer', backgroundColor: 'white', color: '#90DAEE', borderRadius: '50%', padding: '5px' }} 
//                 onClick={closePanel}
//               >
//                 &#x2715; {/* Close icon (X) */}
//               </span>
//             </div>

//             <div>
//               {options.map((option) => (
//                 <span style={{ padding: '3px' }} key={option.label}>
//                   <label>
//                     <input 
//                       type="checkbox" 
//                       checked={checkedOptions.includes(option.label)} 
//                       onChange={() => handleCheckboxChange(option.label)} 
//                     />
//                     {option.label}
//                   </label>
//                 </span>
//               ))}
//             </div>

//             <div style={{ padding: '10px' }}>
//               {jimuMapView && <TimeChartComponent jimuMapView={jimuMapView} data={data.stratigraphy[0]} checkedOptions={checkedOptions} />}
//             </div>
//           </div>
//         </div>
//       )}

//       {jimuMapView && <FeatureTableComponent jimuMapView={jimuMapView} />}

//       <button 
//         style={{ position: "fixed", top: "60px", right: "10px" }} 
//         id="measure" 
//         onClick={toggleMeasure}
//       >
//         <CalciteIcon icon="measure" />
//       </button>

//       <button 
//         style={{ position: "fixed", top: "110px", right: "10px" }} 
//         id="basemap" 
//         onClick={toggleBasemap}
//       >
//         <CalciteIcon icon="basemap" />
//       </button>
//       <button 
//         style={{ position: "fixed", top: "160px", right: "10px" }} 
//         id="addBookmark" 
//         onClick={addBookmark}
//       >
//         <CalciteIcon icon="bookmark" />
//       </button>
//       <button 
//         style={{ position: "fixed", top: "210px", right: "10px" }} 
//         id="shinfo" 
//         onClick={toggleTable}
//       >
// <calcite-icon icon="exclamation-mark-circle-f" />
//       </button>

//       {showTable && (
//         <div style={{ position: 'fixed', top: '50px', right: '68px', maxHeight: '650px', 
//           overflowY: 'auto', backgroundColor: 'white',width:"27%", border: '1px solid #ddd', padding: '2px', zIndex: 1000 }}>
//           <h3 style={{backgroundColor:"#DD1D21",color:"white",left:"30%"}}>SHMapInfo</h3>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
//                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shtable.map((item, index) => (
//                 <tr key={index}>
//                   <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.title}</td>
//                   <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.description}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={toggleTable} style={{ marginTop: '10px' }}>Close</button>
//         </div>
//       )}
    
//    {/* <button onClick={test}>fdfd</button> */}
//     </div>
//   );
// };

// export default Widget;


import { React, AllWidgetProps } from 'jimu-core';
import { useEffect, useState, useRef } from 'react';
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import { CalciteIcon } from 'calcite-components';
import TimeChartComponent from '../../../Timechart/src/runtime/widget';
import FeatureTableComponent from '../../../FeatureTable/src/runtime/widget';
import data from '../../data/data.json';
import urls from '../../data/urls.json';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Measurement from '@arcgis/core/widgets/Measurement';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';


const Widget = (props: AllWidgetProps<any>) => {
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>();
  const [showChart, setShowChart] = useState<boolean>(true);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [showPaper, setShowPaper] = useState<boolean>(false);

  const measurementRef = useRef<Measurement | null>(null);
  const basemapGalleryRef = useRef<BasemapGallery | null>(null);
  const [urllist, setUrllist] = useState([]);

  const urllst = props.config.urllst || [];
   

  console.log('Widget props:', props);
  console.log('URL list:', urllst,urllist);
  // console.log(props.config.urllst)
  // useEffect(() => {
  //   if (props.config.urllst) {
  //     setUrlsArray(props.config.urllst);
  //     console.log(props.config.urllst)
  //   }
  // }, [props.config.urllst]);
 

 localStorage.setItem('urllst', JSON.stringify(urllst));
var options = urllst
 console.log(options)
  // const handleRemove = (urlToRemove: string) => {
  //   const updatedUrls = urlsArray.filter(url => url.url !== urlToRemove);
  //   setUrlsArray(updatedUrls);
  //   props.onSettingChange({
  //     id: props.id,
  //     config: { urls: updatedUrls }
  //   });
  // };

  // const options = [
  //   { label: 'Drilled Hole Analysis(DHA)-Global overview', value:"https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/2",key:"DrilledHoleAnalysis_Shell" },
  //   // { label: '(DHA)-Rosettes', value: "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/GDE_Project_Extents___Shell_Global_Collection/MapServer" },
  //   { label: 'GDEI Extents', value: "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/GDE_Project_Extents___Shell_Global_Collection/MapServer",key:"2"},
  //   // { label: 'GDE Interpretations-Shell', value: urls[3][""] },
  //   // { label: 'Prospects(BPA2)', value: urls[4]["Prospects_BPA2"]}
  // ];
  if (urls && Object.keys(urls).length > 0) {
    console.log(urls)
  } else {
    console.error('The JSON file is empty or invalid');
  }

  const handleCheckboxChange = (option: string) => {
    const updatedCheckedOptions = checkedOptions.includes(option)
      ? checkedOptions.filter(item => item !== option)
      : [...checkedOptions, option];
    
    setCheckedOptions(updatedCheckedOptions);
    localStorage.setItem('ckd', JSON.stringify(updatedCheckedOptions));
  };

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv);
      const map = jmv.view.map;

      // Add Feature Layers
      // const featureLayers = new FeatureLayer({ url: urllist[4]?.["Drilled_Hole_Analysis"] })
      
      
    //   var bookmark = document.getElementsByClassName("bookmark-container");
    //   for (var i = 0; i < bookmark.length; i++) {
    //     var element = bookmark[i] as HTMLElement;
    //     element.style.display = "none";
    // }
    }
  
  };

  const toggleMeasure = () => {
    if (jimuMapView) {
      document.getElementById("layerListDiv").style.display = "none";
      if (measurementRef.current) {
        jimuMapView.view.ui.remove(measurementRef.current);
        measurementRef.current.destroy();
        measurementRef.current = null;
        console.log('Measurement tool removed');
      } else {
        // Remove Basemap Gallery if it is active
        if (basemapGalleryRef.current) {
          jimuMapView.view.ui.remove(basemapGalleryRef.current);
          basemapGalleryRef.current.destroy();
          basemapGalleryRef.current = null;
          console.log('Basemap gallery removed');
        }

        const measurement = new Measurement({
          view: jimuMapView.view,
          activeTool: "distance"
        });
        jimuMapView.view.ui.add(measurement, 'top-right');
        
        measurementRef.current = measurement;
        const container = measurement.container as HTMLElement;
        if (container) {
          container.style.position = 'absolute';
          container.style.right = '35px'; // Adjust as needed
          container.style.top = '40px';   // Adjust as needed
        }
        console.log('Measurement tool added');
      }
    }
  };

  const toggleBasemap = () => {
    if (jimuMapView) {
      document.getElementById("layerListDiv").style.display = "none";
      if (basemapGalleryRef.current) {
        jimuMapView.view.ui.remove(basemapGalleryRef.current);
        basemapGalleryRef.current.destroy();
        basemapGalleryRef.current = null;
        console.log('Basemap gallery removed');
      } else {
        // Remove Measurement tool if it is active
        if (measurementRef.current) {
          jimuMapView.view.ui.remove(measurementRef.current);
          measurementRef.current.destroy();
          measurementRef.current = null;
          console.log('Measurement tool removed');
        }

        const basemapGallery = new BasemapGallery({
          view: jimuMapView.view,
        });
        jimuMapView.view.ui.add(basemapGallery, 'top-right');
        basemapGalleryRef.current = basemapGallery;
        const container = basemapGallery.container as HTMLElement;
        if (container) {
          container.style.position = 'absolute';
          container.style.right = '35px'; // Adjust as needed
          container.style.top = '90px';   // Adjust as needed
        }
        console.log('Basemap gallery added');
      }
    }
  };
   const addBookmark =() =>{
  var bookmark = document.getElementsByClassName("bookmark-container");

  for (var i = 0; i < bookmark.length; i++) {
    var element = bookmark[i] as HTMLElement;
    if(element.style.display === "none"){
      element.style.display = "block";
    }else{
      element.style.display = "none";
    }
    if (!element.querySelector(".bookmark-title")) {
      var titleDiv = document.createElement("div");
      titleDiv.className = "bookmark-title";
      titleDiv.textContent = "BookMarks"; // Title text

      // Apply styles
      titleDiv.style.fontWeight = "bold"; // Make text bold
      titleDiv.style.fontSize = "16px";   // Set font size (adjust as needed)

      // Insert the title div as the first child
      element.insertBefore(titleDiv, element.firstChild);
  }
}
}
  const closePanel = () => setShowChart(false);
  const toggleChartVisibility = () => setShowChart(!showChart);

  const handleIconClick = () => {
    setShowPaper(!showPaper);
  };

  useEffect(() => {
    localStorage.setItem('data1', JSON.stringify(data));
  
  }, []);
  useEffect(() => {
    if(jimuMapView){
      
      options.forEach(layer => {
        // Only add the layer if the URL is not empty
        if (layer.label) {
          const featureLayer = new FeatureLayer({ url: layer.label });
          console.log(`Adding layer: ${layer}`);
          jimuMapView.view.map.add(featureLayer);
        } else {
          console.log(`Skipping layer: ${layer} (URL is empty)`);
        }
      });
      }
  }, [jimuMapView]);
 
  // function test(){
  //   if(jimuMapView){
      
  //     const featureLayer = new FeatureLayer({ url: "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/GDE_Project_Extents___Shell_Global_Collection/MapServer"  });
  //     console.log(featureLayer)
  //     jimuMapView.view.map.add(featureLayer);
  //     }
  // }
  return (
    <div className="widget-starter jimu-widget">
      {props.useMapWidgetIds?.length === 1 && (
        <JimuMapViewComponent 
          useMapWidgetId={props.useMapWidgetIds[0]} 
          onActiveViewChange={activeViewChangeHandler} 
        />
      )}

      <div
        id="ellipse"
        style={{
          position: 'fixed',
          left: '12px',
          top: '238px',
          backgroundColor: 'red',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleIconClick}
      >
        <calcite-icon icon="graph-bar-100-stacked" scale="m" style={{ color: 'white' }} />
        
      </div>

      {showPaper && (
        <div style={{ position: 'relative' }}>
          <div id="chart" style={{ border: '1px solid #ddd', position: 'relative', background: 'white', display: showChart ? 'block' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ff6666', color: 'white', borderRadius: '5px 5px 0 0', padding: "3px" }}>
              <h4>Geological TimeSlider</h4>
              <span 
                style={{ cursor: 'pointer', backgroundColor: 'white', color: '#ff6666', borderRadius: '50%', padding: '5px' }} 
                onClick={closePanel}
              >
                &#x2715; {/* Close icon (X) */}
              </span>
            </div>

            <div>
              {urllst.map((urlEntry: any, index: number) => (
                <span style={{ padding: '3px' }} key={index}>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={checkedOptions.includes(urlEntry.title)} 
                      onChange={() => handleCheckboxChange(urlEntry.title)} 
                    />  
                    {urlEntry.label}
                  </label>
                </span>
              ))}
            </div>

            <div style={{ padding: '10px' }}>
              {jimuMapView && <TimeChartComponent jimuMapView={jimuMapView} data={data.stratigraphy[0]} checkedOptions={checkedOptions} />}
            </div>
          </div>
        </div>
      )}

      {jimuMapView && <FeatureTableComponent jimuMapView={jimuMapView} />}

      <button 
        style={{ position: "fixed", top: "60px", right: "10px" }} 
        id="measure" 
        onClick={toggleMeasure}
      >
        <CalciteIcon icon="measure" />
      </button>

      <button 
        style={{ position: "fixed", top: "110px", right: "10px" }} 
        id="basemap" 
        onClick={toggleBasemap}
      >
        <CalciteIcon icon="basemap" />
      </button>
      <button 
        style={{ position: "fixed", top: "160px", right: "10px" }} 
        id="addBookmark" 
        onClick={addBookmark}
      >
        <CalciteIcon icon="bookmark" />
      </button>
   {/* <button onClick={test}>fdfd</button> */}
    </div>
  );
};

export default Widget;
