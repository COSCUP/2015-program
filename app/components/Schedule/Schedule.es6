import React from "react";
import classNames from "classnames";
import "./Schedule.css";
import Data from "./Schedule";
export default React.createClass({
  displayName: "Schedule",

  render() {
    var {inScheduleArea, sessionHandler, showSession} = this.props;
    var array = Array.apply(null, {length: 50}).map(Number.call, Number)

    var items = Data.day1.map((value,i)=>{
      var itemClasses = classNames({
        "Schedule-item" : value.event,
        "Schedule-itemWrapper" : value.events,
        "has-top-border" : i !== 0
      })

      var content = "";
      if(value.event){ //single event
        content = value.event;
      }else{ //multile event
        content = value.events.map((v,k)=>{
            var sessionClasses = classNames({
              "Schedule-session" : true,
              "is-last" : k === value.events.length-1
            })
            return(
              <div className={sessionClasses}>{v.event}</div>
            )
        })
      }
    	return (
    		<div className={itemClasses} 
             key={i}
             onClick={sessionHandler}>
          <div className="Schedule-time">{value.time}</div>
          <div className="Schedule-event">{content}</div>
        </div>
    	)
    });

    var scheduleClasses = classNames({
        "Schedule" : true,
        "is-fixed" : inScheduleArea==="within",
    })

    var titleClasses = classNames({
        "Schedule-title" : true,
        "is-fixed" : inScheduleArea==="within",
        "with-session" : showSession,
        "without-session" : !showSession
    })
    return (
        <div className={scheduleClasses}>
          <div className={titleClasses}>
             Day1／Day2
          </div>
          <div>
              <div className="Schedule-day">8／15 Sat</div>
        	    {items}
          </div>
          <div>
              <div className="Schedule-day">8／16 Sun</div>
              {items}
          </div>
        </div>
    );
  }
});