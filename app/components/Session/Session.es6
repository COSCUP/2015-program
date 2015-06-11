import React from "react";
import classNames from "classnames";
import "./Session.css";
export default React.createClass({
  displayName: "Session",

  render() {
    var {sessionHandler, data} = this.props;
    console.log(data);

    var language = (data.EN) ? <div className="Session-en">EN</div> : "";
    var crossTime = (data.cross_time) ? <div className="Session-crossTime">cross-time session / 跨時段議程</div> : "";
    return (
        <div className="Session">
            <div className="Session-close"
                 onClick={sessionHandler}></div>
            <div className="Session-content">
                <div className="Session-meta">
                  <div className="Session-time">{data.time}</div>
                  <div className="Session-venue">{data.venue}</div>
                  {language}
                  {crossTime}
                </div>
                <div className="Session-title">{data.event}</div>
                <div className="Session-presenter">
                    {data.presenter}
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