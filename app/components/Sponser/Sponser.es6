import React from "react";
import Transmit from "react-transmit";
import classNames from "classnames";
import agent from "superagent-bluebird-promise";
import "./Sponser.css";

const donors = {
  "diamond": "鑽石級贊助",
  "gold": "黃金級贊助",
  "silver": "白銀級贊助",
  "bronze": "青銅級贊助",
  "cohost": "協辦單位",
  "media": "媒體夥伴",
};

const donorsOrder = ["diamond", "gold", "silver", "bronze", "cohost", "media"];

const Sponser = React.createClass({
  displayName: "Sponser",

  render() {
    console.log(this.props.data);
  	var items = donorsOrder.map((data_key,i)=>{
      if (! this.props.data.sponsors[data_key]) return [];

  		var listItems = this.props.data.sponsors[data_key].map((value,index)=>{
    		return (
    			<a className="Sponser-item" href={value.url} target="_blank">
    				<img src={value.logoUrl} alt={value.name["zh-tw"]} />
    			</a>
    		)
    	});
        return (
        	<div key={i}>
        	    <div className="Sponser-sectionTitle">{donors[data_key]}</div>
        	    {listItems}
        	</div>
        )

  	});

    return (
        <div className="Sponser">
            <div>{items}</div>

            <div className="Sponser-sectionTitle">贊助 COSCUP</div>
            <div className="Sponser-item">
            	<div className="Sponser-text">如果您欲贊助 COSCUP，請與 sponsorship@coscup.org 聯絡。</div>
            </div>

        </div>
    );
  }
});

export default Transmit.createContainer(Sponser, {
  queries: {
    data () {
      return agent.get("http://localhost:8000/2015/api/sponsors").then(res => JSON.parse(res.text));
    }
  }
});
