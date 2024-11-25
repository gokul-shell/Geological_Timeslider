import React, { useState, useEffect,useRef,CSSProperties } from 'react';
import { loadModules } from 'esri-loader';
import FeatureTable from '@arcgis/core/widgets/FeatureTable';
import { CalciteIcon } from 'calcite-components';
import MapImageLayer from "esri/layers/MapImageLayer";
import WebMap from '@arcgis/core/WebMap';
import  LayerList  from 'esri/widgets/LayerList';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'


const FeatureTableComponent = ({ jimuMapView }) => {
  const [tabNames, setTabNames] = useState([]); // State variable for tab names
  const [activeTab, setActiveTab] = useState(1); // State to manage active tab
  const [buttonStyle, setButtonStyle] = useState<CSSProperties>({
    bottom: "0%",
    position: "fixed",
    left: "50%",
    backgroundColor:"green",
    width:"90px"
  });
  const [showFeatureTable, setShowFeatureTable] = useState(false);
  const [layerListVisible, setLayerListVisible] = useState(false);
   const [featureTable, setFeatureTable] = useState(null);
  

  function toggleLayerList() {
    console.log(layerListVisible)
   
      setLayerListVisible(!layerListVisible);
    
      const layerListDiv = document.getElementById("layerListDiv");
      if (layerListVisible) {
        var elements = document.getElementsByClassName("esri-basemap-gallery");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i] as HTMLElement;
            element.style.display = "none";
        }
        var elements1 = document.getElementsByClassName("esri-measurement-widget-content");
        for (var i = 0; i < elements1.length; i++) {
            var element1 = elements1[i] as HTMLElement;
            element1.style.display = "none";
        }
        layerListDiv.style.display = "block";
       
      } else {
        layerListDiv.style.display = "none";
      } 
    console.log(layerListVisible)
  }

  useEffect(() => {
if(jimuMapView){
    const layerList = new LayerList({
          view: jimuMapView.view,
          container:"layerListDiv",
          listItemCreatedFunction: function(event) {
            var item = event.item;
            // Add actions for each layer
            if (item.layer) {
              item.actionsSections = [
                [{
                  title: "Zoom to",
                  className: "esri-icon-zoom-in-magnifying-glass",
                  id: "zoomTo"
                }, {
                  title: "Transparency",
                  className: "esri-icon-opacity",
                  id: "transparency"
                }, {
                  title: "Open Attribute Table",
                  className: "esri-icon-table",
                  id: "openAttributeTable"
                }]
              ];
            }
          }
        });
    
        jimuMapView.view.ui.add(layerList);
        
        layerList.on("trigger-action", function(event) {
          const layer = event.item.layer;
          if (event.action.id === "zoomTo") {
            jimuMapView.view.goTo(layer.fullExtent);
          } else if (event.action.id === "transparency") {
            // Show a transparency slider or input field to adjust transparency
            // You can adjust layer.opacity to change transparency
            handleTransparencyAdjustment(layer);
          } else if (event.action.id === "openAttributeTable") {
            // Open attribute table for the layer
            setButtonStyle({
      bottom: "50%",
      position: "fixed",
      left: "50%",
      backgroundColor:"green",
      width:"90px"
    });
            handleTabClick(layer["url"],layer["title"]);

          }
        });
    const newTabNames = []; // Create a new array to store tab names
    if (jimuMapView.view.map.layers) {
      jimuMapView.view.map.layers.items.forEach(function(lyr) {
        console.log(lyr.title)
        newTabNames.push({ title: lyr.title, url: lyr.url });
      });
     
      setTabNames(newTabNames); // Update the state with new array
    }
  }
  }, [jimuMapView]); // Trigger the effect when jimuMapView changes
  
  const toggleFeatureTable = () => {
    setShowFeatureTable(!showFeatureTable);
    if (showFeatureTable) {
      setButtonStyle({
        bottom: "0%",
        position: "fixed",
        left: "50%",
        backgroundColor:"green",
        width:"90px"
      });
    } else {
      const featureLayer = new FeatureLayer({
        url: "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/CrossSections_multi/MapServer",
        outFields: ["*"]
    });
   
      // Update the layer of the existing FeatureTable instance
      const table = new FeatureTable({
        layer: featureLayer,
        view: jimuMapView.view
      });
      setFeatureTable(table);
      setButtonStyle({
        bottom: "50%",
        position: "fixed",
        left: "50%",
        backgroundColor:"green",
        width:"90px"
      });
    }
  };
  
  const handleTabClick = (data,title) => {
    // setActiveTab(tab);
    setShowFeatureTable(true); // Show the feature table
    setButtonStyle({
      bottom: "50%",
      position: "fixed",
      left: "50%",
      backgroundColor:"green",
      width:"90px"
    });
    console.log(data)
    console.log(jimuMapView.view.map.layers.items)
  
    
    var bottomValue = localStorage.getItem("bottomValue")
    var topValue = localStorage.getItem("topValue")
    var ckd = JSON.parse(localStorage.getItem("ckd"))
    console.log(bottomValue)
    // const newDefinitionExpression = `YNG_AGE_MM >  ${bottomValue} AND OLD_AGE_MM < ${topValue}`;
    var newDefinitionExpression ;
    if(data === "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer"){
    
      data = "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/0"
       newDefinitionExpression = `YOUNG_AGE_MM >  ${bottomValue} AND OLD_AGE_MM < ${topValue}`;
  }else if(data === "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/2"){
   newDefinitionExpression = `YOUNG_AGE_MM >  ${bottomValue} AND OLD_AGE_MM < ${topValue}`;
  }else{
   newDefinitionExpression = `YNG_AGE_MA >  ${bottomValue} AND OLD_AGE_MA < ${topValue}`;
  }
    if(ckd !== null){
    
       if(ckd.includes(title) && ckd.length!==0){
       console.log(data)
        const featureLayer = new FeatureLayer({
          url:data, 
          outFields: ["*"]
      });
        const featureTable = new FeatureTable({
          layer: featureLayer,
          view: jimuMapView.view
      });
      
        featureLayer.definitionExpression = newDefinitionExpression;
      // featureTable.container =  "featureTableDiv"
        setFeatureTable(featureTable);
      
       }else{
          if(data === "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/0"){
            const featureLayer = new FeatureLayer({
              url:data, 
              outFields: ["*"]
          });
           
              const featureTable = new FeatureTable({
                layer: featureLayer,
                view: jimuMapView.view
            });
            
            // featureLayer.definitionExpression = newDefinitionExpression;
              setFeatureTable(featureTable);
              
        
        }
        else if(data === "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/2"){
          const featureLayer = new FeatureLayer({
            url:data, 
            outFields: ["*"]
        });
         
            const featureTable = new FeatureTable({
              layer: featureLayer,
              view: jimuMapView.view
          });
          
          // featureLayer.definitionExpression = newDefinitionExpression;
            setFeatureTable(featureTable);
            
      
      }
      else{
          const existingLayer = jimuMapView.view.map.layers.find(layer => layer.url === data)
          if (existingLayer) {
            const featureTable = new FeatureTable({
              layer: existingLayer,
              view: jimuMapView.view
          });
          
            // existingLayer.definitionExpression = newDefinitionExpression;
            setFeatureTable(featureTable);
            }
        }
          
      
        
              
        //  }
       }
    }
    

  
  };

  function handleTransparencyAdjustment(layer) {
    // Prompt the user to adjust transparency
    const transparencyValue = prompt("Enter transparency value (0-1):");
    
    // Parse the transparency value to ensure it's a valid number between 0 and 1
    const opacity = parseFloat(transparencyValue);
    
    // Check if the opacity is a valid number between 0 and 1
    if (!isNaN(opacity) && opacity >= 0 && opacity <= 1) {
      // Set the layer's opacity to the provided value
      layer.opacity = opacity;
    } else {
      // Show an error message if the input is invalid
      alert("Please enter a valid transparency value between 0 and 1.");
    }
  }

  useEffect(() => {
    // Clear the container when the featureTable changes
    const container = document.getElementById("featureTableDiv");
    if(container){
      container.innerHTML = ""; // Remove all child elements
  
    }
    if (featureTable) { 
      featureTable.container = "featureTableDiv"; // Assign the container to the FeatureTable instance
    }
  }, [featureTable]);
  
  return (
   <>
       <div style={{ position: 'relative' }}>
        <button style={buttonStyle} onClick={toggleFeatureTable}>  <span style={{ marginLeft: '5px' }}>&#9660;</span> </button>
       
       {showFeatureTable && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "-9px",
          zIndex: 1,
          height: "50%",
          width: "100%",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px"
        }}>
         <div className="tab-pane">
         <div className="tab-buttons">
         {tabNames.map((tabName, index) => (
        <button key={index} onClick={() => handleTabClick(tabName["url"],tabName["title"])}>{tabName["title"]}</button>
      ))}
      <button  onClick={() => handleTabClick("https://mapserver1.europe.shell.com/arcgis/rest/services/Global/Fields_Reservoirs_TQEUR_Shell/MapServer/1","PVD.TEST_GLOBALTQEUR_NOGEOM")}>PVD.TEST_GLOBALTQEUR_NOGEOM</button>
      {/* <button  onClick={() => handleTabClick("https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/2","Rosette")}>Rosette</button>
      <button  onClick={() => handleTabClick("https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/3","Penetration")}>Penetration</button>
     */}
              </div>
      
       </div>
         <div id="featureTableDiv"  >
           {/* Content of the feature table */}
        
      
      </div>
</div>
       )
       }
       </div>
       <div id="layerListDiv" style={{right:"50px",top:"17px",width:"30%"}}>
       <button  style={{border:"none",position: "relative",
    left:"-41px",
    padding: "inherit"}}onClick={() => handleTabClick("https://mapserver1.europe.shell.com/arcgis/rest/services/Global/Fields_Reservoirs_TQEUR_Shell/MapServer/1","PVD.TEST_GLOBALTQEUR_NOGEOM")}>PVD.TEST_GLOBALTQEUR_NOGEOM 
    <CalciteIcon icon="table" style={{position: "relative",
    right: "-112px"}}scale="s" /> </button>
              
       </div>
       
       <button style={{position:"fixed", top:"10px",right:"10px"}} onClick={toggleLayerList}> <CalciteIcon icon="layers" /></button>
    
   </>
  );
}
  

export default FeatureTableComponent;
