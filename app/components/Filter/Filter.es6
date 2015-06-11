import React from "react";
import classNames from "classnames";
import "./Filter.css";

export default React.createClass({
  displayName: "Filter",

  render() {
    

    // var array = Array.apply(null, {length: 10}).map(Number.call, Number)
    // var fakeItems = array.map((value,i)=>{
    //   return (
    //     <li className="Filter-category" key={i}>CATEGORY</li>
    //   )
    // });
    var colors = ["#d53e4f","#fc8d59","rgb(237,199,19)","rgb(197,225,48)","#99d594","#3288bd"];

    var {data, filterOn, toggleCategoryHandler, clearCategoryHandler} = this.props;
    var items = data.map((value,i)=>{
      
      if(value.active){
          var style = {
              "border" : `1px solid ${colors[i]}`,
              "background" : colors[i]
          }
      }else{
          var style = {
              "border" : `1px solid ${colors[i]}`
          }
      }
    
      return (
        <div className="Filter-category" key={i} onClick={toggleCategoryHandler.bind(null,i)}>
            <div className="Filter-categoryIcon" style={style}></div>
            <div className="Filter-categoryText">{value.title}</div>
        </div>
      )
    });

    var clearClass = classNames({
      "Filter-clearAll" : true,
      "is-active" : filterOn
    });

    console.log("filter:"+filterOn);
    
    return (
      <div className="Fitler">
          <div className="Fitler-title">Filter by topic</div>
          <div className="Filter-categories">{items}</div>
          <div className={clearClass} onClick={clearCategoryHandler}>Clear All</div>
      </div>
    );
  }
});