import React from "react";
import classNames from "classnames";
import "./Schedule.css";

import Filter from "../Filter/Filter.es6";
import Data from "./Schedule";



export default React.createClass({
  displayName: "Schedule",

  getInitialState () {
    return {
      currentSection: "before"
    };
  },



  _setSectionArea(value){
     this.setState({
      currentSection: value
    })
  },

   _goToElement(refName){
    
    var node = this.refs[refName].getDOMNode();
    this.props.goToElementHandler(node.offsetTop);

  },

  componentDidMount(){
    
    addEventListener("scroll", (function() {
        
        var {currentSection} = this.state;

        var day1Node = this.refs.day1.getDOMNode();
        var day2Node = this.refs.day2.getDOMNode();
        // console.log("----->")
        // console.log(`${pageYOffset},`)
        // console.log(day1Node.offsetTop)
        // console.log(day1Node.offsetHeight)
        // console.log(day2Node.offsetTop)
        // console.log(day2Node.offsetHeight)

        if(pageYOffset < day1Node.offsetTop && currentSection!=="before"){
            this._setSectionArea("before");
        }
        else if(pageYOffset > day1Node.offsetTop && pageYOffset <= day1Node.offsetHeight && currentSection!=="day1"){
            this._setSectionArea("day1");
        }
        else if(pageYOffset > day1Node.offsetHeight && currentSection!=="day2"){
            this._setSectionArea("day2");
        }
        
        
    }).bind(this));
  },

  render() {
    var {inScheduleArea, sessionHandler, showSession, setSessionHandler, currentSession,
         filterOn, categories,
         toggleCategoryHandler, clearCategoryHandler,
         currentScrollHeight,
         showPanel, togglePanelHander} = this.props;
    var {currentSection} = this.state;
    /* ----------- */
    var categoryObj = {};
    categories.map((v,i)=>{
        categoryObj[v.title] = v;
        
    });
    /* ----------- */
   
    var day1Items = Data.day1
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
        content = <div>
          {value.event}
          <div className="Schedule-keynotePresenter">{value.presenter}</div>
        </div>;

      }else{ //multile event
        var filteredEvents = value.events
        .filter((sessionItem)=>{
            
            if(!filterOn) return sessionItem;

            var shouldReturn = false;
            if(categoryObj[sessionItem.category]){
                if(categoryObj[sessionItem.category].active)  
                  shouldReturn = true;
            }
            
            if(shouldReturn) return sessionItem;
        });
        content = filteredEvents
        .map((v,k)=>{
            var sessionClasses = classNames({
              "Schedule-session" : true,
              "is-last" : k === filteredEvents.length-1,
              "is-active" : currentSession.event === v.event && currentSession.time === v.time && currentSession.venue === v.venue
            })
            var categoryStyle = {};
            if(filterOn){
               categoryStyle = {
                  "border" : `1px solid ${categoryObj[v.category].color}`,
                  "background" : categoryObj[v.category].color
               }
            }
            var language = (v.EN) ? <div className="Schedule-en">EN</div> : "";

            var venue = (v.venue) ? (
                    <div className="Schedule-meta">
                      <div className="Schedule-venue">{v.venue}</div>
                    </div>) : "";

            return(
              <div className={sessionClasses} 
                    onClick={setSessionHandler.bind(null,v)} 
                    key={k}>
                      {venue}
                    <div className="Schedule-main">
                      <div>{v.event}{language}</div>
                      <div className="Schedule-presenter">{v.presenter}</div>
                      <div className="Schedule-categoryIcon" style={categoryStyle}></div>
                    </div>
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

    var day2Items = Data.day2
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
        content = <div>
          {value.event}
          <div className="Schedule-keynotePresenter">{value.presenter}</div>
        </div>;

      }else{ //multile event
        var filteredEvents = value.events
        .filter((sessionItem)=>{
            
            if(!filterOn) return sessionItem;

            var shouldReturn = false;
            if(categoryObj[sessionItem.category]){
                if(categoryObj[sessionItem.category].active)  
                  shouldReturn = true;
            }
            
            if(shouldReturn) return sessionItem;
        });
        content = filteredEvents
        .map((v,k)=>{
            var sessionClasses = classNames({
              "Schedule-session" : true,
              "is-last" : k === filteredEvents.length-1,
              "is-active" : currentSession.event === v.event && currentSession.time === v.time && currentSession.venue === v.venue
            })
            var categoryStyle = {};
            if(filterOn){
               categoryStyle = {
                  "border" : `1px solid ${categoryObj[v.category].color}`,
                  "background" : categoryObj[v.category].color
               }
            }
            var language = (v.EN) ? <div className="Schedule-en">EN</div> : "";

            var venue = (v.venue) ? (
                    <div className="Schedule-meta">
                      <div className="Schedule-venue">{v.venue}</div>
                    </div>) : "";

            return(
              <div className={sessionClasses} 
                    onClick={setSessionHandler.bind(null,v)} 
                    key={k}>
                    {venue}
                    <div className="Schedule-main">
                      <div>{v.event}{language}</div>
                      <div className="Schedule-presenter">{v.presenter}</div>
                      <div className="Schedule-categoryIcon" style={categoryStyle}></div>
                    </div>
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
        "is-fixed" : inScheduleArea==="within"  || showPanel,
    })

    var titleClasses = classNames({
        "Schedule-title" : true,
        "is-fixed" : inScheduleArea==="within" || showPanel,
        "with-session" : showSession,
        "without-session" : !showSession
    })
    var titleStyle = {};
    // if(inScheduleArea==="passed" && !showPanel){
     
    //   titleStyle = { 
    //       position: "absolute", 
    //       top: this.props.top
    //   }

    // }

    var filterBtnClasses = classNames({
        "Schedule-filterBtn" : true,
        "is-active" : window.innerWidth < 1200 && showPanel
    })

    var filterText = (window.innerWidth < 1200 && showPanel) ? "":"Filter";

    var filterClasses = classNames({
        "Schedule-filterPanel" : true,
        "is-show" : window.innerWidth < 1200 && showPanel,
        "is-fixed" : inScheduleArea==="within" || showPanel
    })

    var bar1Classes = classNames({
        "Schedule-bar1" : true,
        "is-active" : window.innerWidth < 1200 && showPanel
    })
    var bar2Classes = classNames({
        "Schedule-bar2" : true,
        "is-active" : window.innerWidth < 1200 && showPanel
    })

    var day1Classes = classNames({
        "Schedule-dayButton" : true,
        "is-active" : currentSection === "day1"
    })
    var day2Classes = classNames({
        "Schedule-dayButton" : true,
        "is-active" : currentSection === "day2"
    })
    
   
    return (
        <div className={scheduleClasses}>
          <div className={titleClasses}
               style={titleStyle}>
              <div className={day1Classes}
                   onClick={this._goToElement.bind(this,"day1")}>Day 1</div>
              <div className={day2Classes}
                   onClick={this._goToElement.bind(this,"day2")}>Day 2</div>
              <div className={filterBtnClasses}
                   onClick={togglePanelHander}>{filterText}
                   <div className={bar1Classes}></div>
                   <div className={bar2Classes}></div>
              </div>
          </div>
          <div className={filterClasses}>
              <Filter ref="filter"
                      data={categories}
                      filterOn={filterOn}
                      toggleCategoryHandler={toggleCategoryHandler}
                      clearCategoryHandler={clearCategoryHandler}
                      togglePanelHander={this._togglePanel}/>
          </div>
          <div ref="day1" id="day1">
              <div className="Schedule-day">8/15 (Sat)</div>
        	    {day1Items}
          </div>
          <div ref="day2" id="day2">
              <div className="Schedule-day">8/16 (Sun)</div>
              {day2Items}
          </div>
        </div>
    );
  }
});