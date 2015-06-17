import React from "react";

import "./Home.css";
import AppBar from "../components/AppBar/AppBar.es6";
import Filter from "../components/Filter/Filter.es6";
import Schedule from "../components/Schedule/Schedule.es6";
import Session from "../components/Session/Session.es6";
import Sponser from "../components/Sponser/Sponser.es6";
import Venues from "../components/Venues/Venues.es6";

import CategoriesData from "./Categories";
import VenuesData from "./Venues.json";

import classNames from "classnames";
import $ from "jquery";

export default React.createClass({
  displayName: "Home",

  getInitialState () {
    
    var categories = CategoriesData.categories.map((value,index)=>{
        return (
          {
            "title" : value.title,
            "color" : value.color,
            "active" : false
          }
        )
    });
    
    return {
      inScheduleArea: "before",
      
      sessionClass: false,
      categories: categories,
      categoryOn: false,
      currentSession: {},
      showSession: false,
      currentScrollHeight: 0,

      showPanel: false
    };
  },

  _togglePanel(){
   
    this.setState({
      showPanel: !this.state.showPanel
    })
  },

  componentDidMount(){
   
    var { inScheduleArea } = this.state;
    var { _setInScheduleArea, _setScheduleHeight, _setFilterHeight } = this;

    var coverNode = this.refs.cover.getDOMNode();
    var scheduleNode = this.refs.schedule.getDOMNode();

    //// Why offsetHeight will only be correct after first scrolling? Dynamic generated elements?
    addEventListener("scroll", function() {
        //console.log("->"+pageYOffset)

        var top = coverNode.offsetHeight + 54;
        var height = scheduleNode.offsetHeight;

        if(pageYOffset > top && pageYOffset < height){
            _setInScheduleArea("within");
        }
        if(pageYOffset < top){
            _setInScheduleArea("before");
        }
        if(pageYOffset > height + 80){
            _setInScheduleArea("passed");
        }
    });

  },

  _setInScheduleArea(value){
    //console.log("[current] "+this.state.inScheduleArea + " // [to be set] "+ value)
    if(this.state.inScheduleArea !== value){
      //console.log("! set schedule value !")
      this.setState({
        inScheduleArea: value
      })
    }
    
  },
  _setScheduleHeight(value){
    this.setState({
        scheduleHeight: value
    })
  },
  _setFilterHeight(value){
    this.setState({
        filterHeight: value
    })
  },
  _toggleSession(){
    this.setState({
        showSession: !this.state.showSession
    })
    if(this.state.showSession){
        this.setState({
            currentSession: {}
        });
    }
    //Saving current scrolling position
    if(this.state.currentScrollHeight===0){
        //console.log("Saving scrolling: "+ pageYOffset);
        this.setState({
          currentScrollHeight: pageYOffset
        })
    }
    window.scrollTo(0, 0);
  },
  _setSession(value){
    this.setState({
        showSession: true,
        currentSession: value
    });
    //Saving current scrolling position
    if(this.state.currentScrollHeight===0){
        //console.log("Saving scrolling: "+ pageYOffset);
        this.setState({
          currentScrollHeight: pageYOffset
        })
    }

  },

  _toggleCategory(index){
    var current = this.state.categories;
    current[index].active = !current[index].active;
    
    var sum = current.reduce((pre, current)=>{
        if(current.active){
           return pre + 1;
        }else{
           return pre;
        }
    },0);
    var categoryOn = (sum > 0);

    this.setState({
        categories: current,
        categoryOn: categoryOn
    })
  },
  _clearCategory(){
   
    var current = this.state.categories.map((value,i)=>{
        return {
            title: value.title,
            color: value.color,
            active: false
        }
    });

    this.setState({
        categories: current,
        categoryOn: false
    })

  },

  _goToElement(value){
    
    var node = this.refs.cover.getDOMNode();
    var position = value + node.offsetHeight;/* 會有 54 的差，不過 AppBar 抵掉了 */
    
    ////// TO BE REFINE: Don't use jquery
    $('body,html').animate({ scrollTop: position}, 1000);

  },

  componentDidUpdate(){

    //如果是從 session 退出回到主頁，要 scroll 到原本離開的位置

    var {currentScrollHeight, showSession} = this.state;

    //console.log("component did upate, scrolling height:"+currentScrollHeight);

    if((currentScrollHeight!==0 && showSession === false)){ 
        //console.log("reload scroll position");
        window.scrollTo(0, currentScrollHeight);
        this.setState({
          currentScrollHeight: 0
        })
    }
  },

  render() {
    var {inScheduleArea, scheduleHeight, filterHeight, showSession,
         categories, categoryOn, currentSession,
         currentScrollHeight, showPanel} = this.state;
    var filterClass = classNames({
        "Home-filter": true,
        "is-fixed": inScheduleArea === "within" || showPanel
    });

    var filterStyle = {};
    var sessionStyle = {};

    ///////////////////////////////////////// TO BE refine
    var top, height;
    if((inScheduleArea === "passed")&&(window.innerWidth > 776)){
        filterStyle = { 
            position: "absolute", 
            top: (height - top) + "px",
            transiton: "all .3s"
        }
        sessionStyle = { 
            position: "absolute", 
            top: (height - top - 240) + "px",
            transiton: "all .3s"
        }

    }

    /* ------------------- */
    var shouldHide = showSession;
    
    var scheduleStyle = (shouldHide && window.innerWidth < 776) ? {
        "transform" : `translate3d(0,${-currentScrollHeight - 80}px,0)`
    }: {};

    var scheduleClass = classNames({
        "Home-schedule" : true,
        "is-fixed" : inScheduleArea === "within" || showPanel,
        "with-session" : showSession,
        "is-hide" : shouldHide
    });
    /* ------------------- */

    var sessionClass = classNames({
        "Home-session" : true,
        "is-show" : showSession,
        "is-fixed" : inScheduleArea === "within" || (showPanel && window.innerWidth < 776)
    });

    var sponserClass = classNames({
      "Home-sponser" : true,
      "is-hide" : shouldHide
    });

    var coverClass = classNames({
      "Home-cover" : true,
      "is-hide" : shouldHide
    });

    var appbarClass = classNames({
      "Home-AppBar" : true,
      "is-hide" : shouldHide
    });

    var footerClass = classNames({
      "Home-footer" : true,
      "is-hide" : shouldHide
    });


    var coverIMG = (window.innerWidth > 500) ? require("./images/cover.jpg") : require("./images/cover-mobile.jpg");

    var shadowClass = classNames({
      "Home-shadow" : true,
      "is-show" : showSession
    });

  

    return (
      <div className="Home">
        <div className={appbarClass}><AppBar/></div>
        
        <div className={coverClass} ref="cover">
            <img className="Home-coverImg" src={coverIMG} />
            <div className="Home-coverNotice">

            <a className="Home-docLink" href="https://docs.google.com/spreadsheets/d/1BZrn2OqaRHT6qP4r71wtbYohU6zvPw6FWIcx1QOOrik/edit#gid=0" target="_blank">[議程總表]</a>
            議程表仍有變動，請常回來查看本網頁，不另通知<br/>
            We are still updating, check out often!

            </div>
        </div>

        <div className="Home-main" ref="main" id="Home-main">
            <div className={shadowClass}
                 onClick={this._toggleSession}></div>

            <div className={filterClass}
                 style={filterStyle}>
                <Filter ref="filter"
                        data={categories}
                        filterOn={categoryOn}
                        toggleCategoryHandler={this._toggleCategory}
                        clearCategoryHandler={this._clearCategory}/>
            </div>
            

            <div className={scheduleClass} ref="schedule" style={scheduleStyle}>
              <Schedule inScheduleArea={inScheduleArea}
                        sessionHandler={this._toggleSession}
                        showSession={showSession}
                        top={height - top - 80}
                        setSessionHandler={this._setSession}
                        currentSession={currentSession}
                        categories={categories}
                        filterOn={categoryOn}

                        toggleCategoryHandler={this._toggleCategory}
                        clearCategoryHandler={this._clearCategory}

                        currentScrollHeight={currentScrollHeight}
                        goToElementHandler = {this._goToElement}

                        showPanel={showPanel}
                        togglePanelHander={this._togglePanel}/>
            </div>

            
            <div className={sponserClass}>
              <Sponser />
            </div>
  
            <div className={sessionClass}
                 style={sessionStyle}>
              <Session sessionHandler={this._toggleSession} 
                       data={currentSession} 
                       categories={categories}/>
            </div>
          
            <div className={footerClass}>
              <Venues data={VenuesData}/>
              <div className="Home-patchSection">
                <a className="Home-patch"
                   href="https://github.com/COSCUP/coscup-schedule"
                   target="_blank">patches welcome</a>
              </div>
            </div>

        </div>
       
        
      </div>
    );
  }
});