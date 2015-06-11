import React from "react";
import classNames from "classnames";
import "./Schedule.css";
import Data from "./Schedule";
export default React.createClass({
  displayName: "Schedule",

  render() {
    var {inScheduleArea, sessionHandler, showSession, setSessionHandler, currentSession} = this.props;
    var array = Array.apply(null, {length: 50}).map(Number.call, Number)

    var items = Data.day1.map((value,i)=>{
      var itemClasses = classNames({
        "Schedule-item" : value.event,
        "Schedule-itemWrapper" : value.events,
        "has-top-border" : i !== 0
      })

console.log(`***${currentSession.event}`);


      var content = "";
      if(value.event){ //single event
        content = value.event;
      }else{ //multile event
        content = value.events.map((v,k)=>{
            var sessionClasses = classNames({
              "Schedule-session" : true,
              "is-last" : k === value.events.length-1,
              "is-active" : currentSession.event === v.event 
            })
            return(
              <div className={sessionClasses} onClick={setSessionHandler.bind(null,v)}>{v.event}</div>
            )
        })
      }
    	return (
    		<div className={itemClasses} 
             key={i}>
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
    var titleStyle = {};
    if(inScheduleArea==="passed"){
      titleStyle = { 
          position: "absolute", 
          top: this.props.top
      }

    }
   
    return (
        <div className={scheduleClasses}>
          <div className={titleClasses}
               style={titleStyle}>
              <div className="Schedule-dayButton">Day 1</div>
              <div className="Schedule-dayButton">Day 2</div>
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