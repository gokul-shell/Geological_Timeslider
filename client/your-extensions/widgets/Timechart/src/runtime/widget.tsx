import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'; // Import D3 library
import VerticalRangeSlider from "../../../Slider/src/runtime/widget"

const TimeChartComponent = ({ jimuMapView,data,checkedOptions }) => {
    const mapContainerRef = useRef(null);
    const [topvalue, setTopvalue] = useState(541);
    const [bottomvalue, setBottomvalue] = useState(0);
  useEffect(() => {
    const svg = d3.select("#chart-container").append("svg")
    .attr("width", 300)
    .attr("height", 600);

function createRectangles(data, x, y,width, parentGroup) {

    const rectangle = parentGroup.append("rect")
        .attr("x", x + 50)
        .attr("y", data.top)
        .attr("width", width)
        .attr("height", data.bottom - data.top)
        .attr("fill", data.color)
        .attr("stroke", "black") // Add black border line
        .attr("stroke-width", 1) // Set border line width
        .on("click", function () {
           let width1;
           let level=0;
            const clickedRect = d3.select(this);
            svg.selectAll("rect").remove();
            svg.selectAll("text").remove();
            const childrenGroup = parentGroup.append("g");
            console.log(data.children)
            level = getTotalLevels(data)-1
            if(level !==0){
                width1 = 300/ level
             }else{
                 width1 = 300
             }
            createRectangles1(data, 0, 0, width1, childrenGroup);
        });

    const textElement = parentGroup.append("text")
        .text(data.name.split("_")[1] || data.name)
        .attr("x", x + 75)
        .attr("y", (data.top + data.bottom) / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .attr("transform", "rotate(-90, " + (x + 75) + ", " + ((data.top + data.bottom) / 2) + ")");

    if (textElement.node().getBBox().height + 20 > data.bottom - data.top) {
        textElement.style("visibility", "hidden");
        rectangle.on("mouseover", function () {
            rectangle.append("title").text(data.name);
        });

        rectangle.on("mouseout", function () {
            textElement.style("visibility", "hidden");
        });
    }

    if (data.children) {
        data.children.forEach(childData => {
            createRectangles(childData, x + 50, y,width, parentGroup);
        });
    }
  
  
}

function findParentNode(data, value) {
    if (data.children) {
        for (const child of data.children) {
            if (child.name === value) {
                console.log(data)
                return data;
            }
            const parent = findParentNode(child, value);
            if (parent) {
                console.log(parent)
                return parent;
            }
        }
    }
    return null;
}

function stretchTimeScale(data, parentTop, parentBottom) {
  // Calculate the height of the current node
  const height = data.bottom - data.top;

  // Calculate the scale factor
  const scaleFactor = (parentBottom - parentTop) / (data.bottom - data.top);

  // Update the top and bottom values for the current node
  data.top = parentTop;
  data.bottom = parentTop + height * scaleFactor;

  // Recursively adjust children
  if (data.children) {
      let currentTop = parentTop;
      for (let i = 0; i < data.children.length; i++) {
          const childHeight = data.children[i].bottom - data.children[i].top;
          stretchTimeScale(data.children[i], currentTop, currentTop + childHeight * scaleFactor);
          currentTop = data.children[i].bottom; // Update top for the next child
      }
  }
}

function createRectangles1(data,x ,y,width,parentGroup) {

  const adjustedHeight = 541;
  setTopvalue(data.bottom);
  setBottomvalue(data.top);
 
  stretchTimeScale(data, 0, 541);
   // Create rectangle1 outside of the click event handler
   var dta = JSON.parse(localStorage.getItem("data1"));
   const parent = findParentNode(dta.stratigraphy[0], data.name);
   console.log(parent);
   if(parent !== null){
    const rectangle1 = parentGroup.append("rect")
    .attr("x", x + 25)
    .attr("y", 0)
    .attr("width", 25)
    .attr("height", 541)
    .attr("id", "test")
    .attr("stroke", "black") // Add black border line
    .attr("stroke-width", 1) // Set border line width
    .on("click", function () {
     svg.selectAll("rect").remove();
     svg.selectAll("text").remove();
     const childrenGroup = parentGroup.append("g");
    
     const testRect = d3.select(this);
     console.log(testRect.attr("id"))
     if (testRect.attr("id") === "test") {
        let width1;
        let level= 0;
         svg.selectAll("rect").remove();
         svg.selectAll("text").remove();
         var dta = JSON.parse(localStorage.getItem("data1"));
         const parent1 = findParentNode(dta.stratigraphy[0], data.name);
         console.log(parent1, data.name);
         level = getTotalLevels(data) -1
         if(level !==0){
            width1 = 300/ level
         }else{
             width1 = 300
         }
       
   
         createRectangles1(parent1, 0, 0,width1, childrenGroup);
     } 
    
     
 })
 .attr("fill", parent.color)
 
   }else{
    createRectangles(data,x+50,y,width, parentGroup);
   }

  console.log(data)
  const rectangle = parentGroup.append("rect") 
  .attr("x", x+50)
  .attr("y", y)
  .attr("width", width)
  .attr("height", data.bottom - data.top)
  .attr("fill", data.color) 
  .attr("stroke", "black") // Add black border line
  .attr("stroke-width", 1); // Set border line width

  const textElement = parentGroup.append("text")
  .text(data.name.split("_")[1] || data.name) // Assuming data.text contains the text you want to display
  .attr("x", x + 75) // Adjust position horizontally
  .attr("y", (data.top + data.bottom) / 2) // Center vertically
  .attr("text-anchor", "middle") // Center horizontally
  .attr("dominant-baseline", "middle") // Center vertically
  .attr("fill", "black")// Text color
  .attr("transform", "rotate(-90, " + (x + 75) + ", " + ((data.top + data.bottom) / 2) + ")") // Rotate the text

  if (textElement.node().getBBox().height + 20 > data.bottom - data.top) {
    textElement.style("visibility", "hidden");
    rectangle.on("mouseover", function () {
        rectangle.append("title").text(data.name);
    });

    rectangle.on("mouseout", function () {
        textElement.style("visibility", "hidden");
    });
}
  if (data.children) {
    data.children.forEach(childData => {
        createRectangles(childData,x+50,y, width,parentGroup);
    });
}
  
}

function getTotalLevels(node) {
    if (!node.children || node.children.length === 0) {
        return 1; // Leaf node
    }

    let maxChildLevel = 0;
    for (const child of node.children) {
        const childLevel = getTotalLevels(child) + 1;
        maxChildLevel = Math.max(maxChildLevel, childLevel);
    }

    return maxChildLevel;
}

// Call function to create rectangles
createRectangles(data,0,0, 50,svg);

    
  }, [data]);
  

  const handleFilterButtonClick = async () => {
    if (jimuMapView) {
   
    }
  };
  
  return<div id="child"> <div style={{ display:'inline-flex' }}>
    
    {jimuMapView && <VerticalRangeSlider jimuMapView={jimuMapView} topvalue={topvalue} bottomvalue={bottomvalue} checkedOptions={checkedOptions} />
}  
        
    <div id="chart-container"></div>
    </div>
   
    </div>;
};

export default TimeChartComponent;


