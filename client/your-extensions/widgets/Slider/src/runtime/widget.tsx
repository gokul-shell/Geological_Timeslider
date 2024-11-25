import React, { useEffect, useState, useRef } from 'react';
import '../css/RangeSlider.css';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

import FeatureTable from 'esri/widgets/FeatureTable';



const VerticalRangeSlider = ({ jimuMapView,topvalue,bottomvalue,checkedOptions }) => {
  console.log(topvalue,bottomvalue)
  const [topValue, setTopValue] = useState(topvalue);
  const [bottomValue, setBottomValue] = useState(bottomvalue);
  const topThumbRef = useRef(null);
  const bottomThumbRef = useRef(null);
  const trackRef = useRef(null);
  const  [flg, setflg] = useState(false)
  // const [featureTable, setFeatureTable] = useState(null);
  
 

    useEffect(() => {
      setTopValue(topvalue);
      setBottomValue(bottomvalue);
  
    }, [topvalue, bottomvalue]);
   
   
   
 
  const handleFilterClick = () => {
    <featureTable checkedOptions={checkedOptions} bottomValue={bottomValue} topValue={topValue}></featureTable>
    // Update the definition expression based on new top and bottom values
    // const newDefinitionExpression = `YNG_AGE_MA >  ${bottomValue} AND OLD_AGE_MA < ${topValue}`;
    // const newDefinitionExpression = `YOUNG_AGE_MM >  ${bottomValue} AND OLD_AGE_MM < ${topValue}`;
  console.log(bottomValue)
  
  localStorage.setItem("bottomValue",JSON.stringify(bottomValue))
  localStorage.setItem("topValue",JSON.stringify(topValue))
 
  var ckd = JSON.parse(localStorage.getItem("ckd"))
  var data = JSON.parse(localStorage.getItem("urllst"))
  
    let newDefinitionExpression;
    if(ckd.length !==0){
      const filteredResults = data.filter(item => ckd.includes(item.label));

      for (let index = 0; index < filteredResults.length; index++) {
        const ckdUrl = filteredResults[index]["url"]; // Get the current ckd URL
        const ckdyng = filteredResults[index]["Young_age_field"]; // Get the current ckd URL
        const ckdold = filteredResults[index]["old_age_field"]; // Get the current ckd URL
    
        // Find the existing layer
        
        const existingLayer = jimuMapView.view.map.layers.find(layer => {
          console.log(layer.url); // Log the URL of the top-level layer
          if(layer.url === ckdUrl){
            newDefinitionExpression = `${ckdyng} > ${bottomValue} AND ${ckdold}  < ${topValue}`;
            layer.definitionExpression = newDefinitionExpression;
           
          
          }
       
         
    
          return false;
        });
    
      
      }
    }
    else{
      jimuMapView.view.map.layers.forEach(layer => {
        // Clear the definition expression for the layer
        if (layer.definitionExpression) {
          layer.definitionExpression = ""; // Set to empty string
        }
        // Check if the layer has sublayers
        if (layer.allSublayers) {
          // Iterate through all sublayers
          layer.allSublayers.forEach(sublayer => {
            // Clear the definition expression for the sublayer
            if (sublayer.definitionExpression) {
              sublayer.definitionExpression = ""; // Set to empty string
            }
          });
        }
      });
    }
    setflg(true)
}

  const handleMouseDownTop = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMoveTop);
    document.addEventListener('mouseup', handleMouseUpTop);
  };

  const handleMouseMoveTop = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const offsetY = e.clientY - trackRect.top;
    let newValue = Math.round((offsetY / trackRect.height) * 541);
    newValue = Math.min(541, Math.max(bottomValue, newValue));
    setTopValue(Math.round(newValue));
  };

  const handleMouseUpTop = () => {
    document.removeEventListener('mousemove', handleMouseMoveTop);
    document.removeEventListener('mouseup', handleMouseUpTop);
  };

  const handleMouseDownBottom = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMoveBottom);
    document.addEventListener('mouseup', handleMouseUpBottom);
  };

  const handleMouseMoveBottom = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const offsetY = e.clientY - trackRect.top;
    let newValue = Math.round((offsetY / trackRect.height) * 541);
    newValue = Math.min(topValue, Math.max(0, newValue));
    
    setBottomValue(Math.round(newValue));
    // When moving the bottom thumb, also adjust the top thumb
    setTopValue(Math.round(newValue));
    setTopValue(Math.max(Math.round(topValue), newValue));
  };

  const handleMouseUpBottom = () => {
    document.removeEventListener('mousemove', handleMouseMoveBottom);
    document.removeEventListener('mouseup', handleMouseUpBottom);
  };

  return (
    <div>
    
    <div className="vertical-slider" style={{position:"relative"}}>
      <div ref={trackRef} className="track">
        <div
          ref={bottomThumbRef}
          className="thumb bottom-thumb"
          style={{ top: `${(bottomValue / 541) * 100}%` }}
          onMouseDown={handleMouseDownBottom}
        >
          <span className="thumb-value">{Math.round(bottomValue)}</span>
        </div>
        <div
          ref={topThumbRef}
          className="thumb top-thumb"
          style={{ top: `${(topValue / 541) * 100}%` }}
          onMouseDown={handleMouseDownTop}
        >
          <span className="thumb-value">{Math.round(topValue)}</span>
        </div>
      </div>
      <button style={{ position: "relative",
      backgroundColor:"#DD1D21",
      color:"black",
    top: "550px",
    width: "250px", // Change "100px" to your desired width
    height: "34px", // Change "50px" to your desired height
    left: "80px" }} onClick={handleFilterClick}>Filter</button>
    </div>
 
       </div>
       
  );
};

export default VerticalRangeSlider;
