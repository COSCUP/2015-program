import React from "react";
import "./Home.css";
import Filter from "../components/Filter/Filter.es6";
import Schedule from "../components/Schedule/Schedule.es6";
import Session from "../components/Session/Session.es6";
import Sponser from "../components/Sponser/Sponser.es6";
import Data from "./Categories";
import classNames from "classnames";

export default React.createClass({
  displayName: "Home",

  getInitialState () {
    
    var categories = Data.categories.map((value,index)=>{
        return (
          {
            "title" : value,
            "active" : false
          }
        )
    });
    console.log(categories);
    return {
      inScheduleArea: "before",
      scheduleHeight: 0,
      filterHeight: 0,
      sessionClass: false,
      categories: categories,
      categoryOn: false,
      currentSession: {}
    };
  },



  componentDidMount(){
   
    var { inScheduleArea } = this.state;
    var { _setInScheduleArea, _setScheduleHeight, _setFilterHeight } = this;

    // 這裏有點神秘
   
    var scheduleHeight = this.refs.schedule.getDOMNode().offsetHeight;
    var filterHeight = this.refs.filter.getDOMNode().offsetHeight || 230;
    var top = filterHeight + 94;//this.refs.main.getDOMNode().offsetTop;
    var height = scheduleHeight - window.innerHeight + filterHeight;

    console.log(`height:${height}`);
    _setScheduleHeight(height);
    _setFilterHeight(filterHeight);
    //

    addEventListener("scroll", function() {
        console.log("->"+pageYOffset)
        
        if(pageYOffset > top && pageYOffset < height){
            _setInScheduleArea("within");
        }
        if(pageYOffset < top){
            _setInScheduleArea("before");
        }
        if(pageYOffset > height){
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
  },
  _setSession(value){
    this.setState({
        showSession: true,
        currentSession: value
    });

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
            active: false
        }
    });
    console.log("xxxxxx");
    console.log(current);
    
    this.setState({
        categories: current,
        categoryOn: false
    })

  },

  render() {
    var {inScheduleArea, scheduleHeight, filterHeight, showSession,
         categories, categoryOn, currentSession} = this.state;
    var filterClass = classNames({
        "Home-filter": true,
        "is-fixed": inScheduleArea === "within"
    });

    var filterStyle = {};
    var sessionStyle = {};
    if(inScheduleArea === "passed"){
        filterStyle = { 
          position: "absolute", 
          top: (scheduleHeight - filterHeight - 80) + "px"
        }
        sessionStyle = { 
          position: "absolute", 
          top: (scheduleHeight - filterHeight - 80) + "px"
        }
    }

    var scheduleClass = classNames({
        "Home-schedule" : true,
        "is-fixed" : inScheduleArea !== "before",
        "with-session" : showSession
    });

    var sessionClass = classNames({
        "Home-session" : true,
        "is-show" : showSession,
        "is-fixed" : inScheduleArea === "within"
    })

    var coverIMG = require("./images/cover.jpg");

    var shadowClass = classNames({
      "Home-shadow" : true,
      "is-show" : showSession
    });

    return (
      <div className="Home">
        
        <div className="Home-cover" ref="cover">
            <img className="Home-coverImg" src={coverIMG} />
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
            

            <div className={scheduleClass} ref="schedule">
              <Schedule inScheduleArea={inScheduleArea}
                        sessionHandler={this._toggleSession}
                        showSession={showSession}
                        top={scheduleHeight - filterHeight - 80}
                        setSessionHandler={this._setSession}
                        currentSession={currentSession}
                        categories={categories}
                        filterOn={categoryOn}/>
            </div>

            
            <div className="Home-sponser">
              <Sponser />
            </div>
  
            <div className={sessionClass}
                 style={sessionStyle}>
              <Session sessionHandler={this._toggleSession} data={currentSession}/>
            </div>
          
            <div className="Home-footer"></div>

        </div>
       
        
      </div>
    );
  }
});