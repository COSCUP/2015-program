import React from "react";
import classNames from "classnames";
import "./Session.css";
export default React.createClass({
  displayName: "Session",

  render() {
    var {sessionHandler, data, categories} = this.props;
    var categoryObj = {};
    categories.map((v,i)=>{
        categoryObj[v.title] = v;
        
    });
    var categoryStyle = {};
    if(categoryObj[data.category]){
      categoryStyle = {
        "border" : `1px solid ${categoryObj[data.category].color}`,
        "background" : categoryObj[data.category].color
      }
    }
    

    var language = (data.EN) ? <div className="Session-en">EN</div> : "";
    var crossTime = (data.cross_time) ? <div className="Session-crossTime">cross-time session / 跨時段議程</div> : "";
    return (
        <div className="Session">
            <div className="Session-close"
                 onClick={sessionHandler}></div>
            <div className="Session-content">
                <div className="Session-meta">
                  <div className="Session-venue">{data.venue}</div>
                  <div className="Session-time">{data.time}</div>
                  
                  {language}
                  {crossTime}
                </div>
                <div className="Session-title">
                  {data.event}
                </div>
                <div className="Session-presenter">
                    {data.presenter}
                </div>

                <div className="Session-category">
                  <div className="Session-categoryIcon" style={categoryStyle}></div>
                  {data.category}
                </div>

                <div className="Session-abstract">
                    <div className="Session-subTitle">Abstract</div>
                    {data.abstract}
                </div>
                <div className="Session-biography">
                    <div className="Session-subTitle">Biography</div>
                    {data.biography}
                </div>
            </div>      
        </div>
    );
  }
});