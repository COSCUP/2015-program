import React from "react";
import classNames from "classnames";
import "./Schedule.css";
import Data from "./Schedule";
export default React.createClass({
  displayName: "Schedule",

  render() {
    var {inScheduleArea, sessionHandler, showSession, setSessionHandler, currentSession,
         filterOn, categories} = this.props;
    /* ----------- */
    var categoryObj = {};
    categories.map((v,i)=>{
        categoryObj[v.title] = v;
        
    });
    /* ----------- */
   
    var items = Data.day1
    .filter((eventItem)=>{
        var shouldReturn = false;
        if(eventItem.event && filterOn){
            
            if(categoryObj[eventItem.event.category]){
                if(categoryObj[eventItem.event.category].active)  
                    shouldReturn = true;
            }
           
        }else{//events
            shouldReturn = true;
        }
        if(shouldReturn) return eventItem;
    })
    .map((value,i)=>{
      
      var itemClasses = classNames({
        "Schedule-item" : value.event,
        "Schedule-itemWrapper" : value.events,
        "has-top-border" : i !== 0
      })


      var content = "";
      if(value.event){ //single event
        content = value.event;

      }else{ //multile event
        var filteredEvents = value.events
        .filter((sessionItem)=>{
            
            if(!filterOn) return sessionItem;

            var shouldReturn = false;
            if(categoryObj[sessionItem.category].active)  
                shouldReturn = true;
            
            if(shouldReturn) return sessionItem;
        });
        content = filteredEvents
        .map((v,k)=>{
            var sessionClasses = classNames({
              "Schedule-session" : true,
              "is-last" : k === filteredEvents.length-1,
              "is-active" : currentSession.event === v.event 
            })
            var categoryStyle = {};
            if(filterOn){
               categoryStyle = {
                  "border" : `1px solid ${categoryObj[v.category].color}`,
                  "background" : categoryObj[v.category].color
               }
            }
            console.log("xxxxxxx")
            console.log(categoryStyle);
            return(
              <div className={sessionClasses} 
                    onClick={setSessionHandler.bind(null,v)} 
                    key={k}>{v.event}
                    <div className="Schedule-categoryIcon" style={categoryStyle}></div>
              </div>
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