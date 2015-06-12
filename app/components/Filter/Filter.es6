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

    var {data, filterOn, toggleCategoryHandler, clearCategoryHandler, togglePanelHander} = this.props;
    var items = data.map((value,i)=>{
      
      if(value.active){
          var style = {
              "border" : `1px solid ${value.color}`,
              "background" : value.color
          }
      }else{
          var style = {
              "border" : `1px solid ${value.color}`
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

    var closeItem = (window.innerWidth < 1200) ? <div className="Filter-close" onClick={togglePanelHander}>Close</div> : "";
    
    return (
      <div className="Fitler">
          <div className="Fitler-title">Filter by topic</div>
          <div className="Filter-categories">{items}</div>
          <div className="Filter-actions">
            {closeItem}
            <div className={clearClass} onClick={clearCategoryHandler}>Clear All</div>
          </div>
      </div>
    );
  }
});