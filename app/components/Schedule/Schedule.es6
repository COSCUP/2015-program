import React from "react";
import classNames from "classnames";
import "./Schedule.css";
export default React.createClass({
  displayName: "Schedule",

  render() {
    var {inScheduleArea, sessionHandler, showSession} = this.props;
    var array = Array.apply(null, {length: 50}).map(Number.call, Number)

    var fakeItems = array.map((value,i)=>{
      var itemClasses = classNames({
        "Schedule-item" : true,
        "has-top-border" : i !== 0
      })
    	return (
    		<div className={itemClasses} 
             key={i}
             onClick={sessionHandler}>
          SOME AWESOME TALK
        </div>
    	)
    });

    var titleClasses = classNames({
        "Schedule-title" : true,
        "is-fixed" : inScheduleArea==="within",
        "with-session" : showSession,
        "without-session" : !showSession
    })
    return (
        <div className="Schedule">
          <div className={titleClasses}>
             Day1 Day2
          </div>
        	{fakeItems}
        </div>
    );
  }
});