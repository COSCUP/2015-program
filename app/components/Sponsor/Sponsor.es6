import React from "react";
import Transmit from "react-transmit";
import classNames from "classnames";
import agent from "superagent-bluebird-promise";
import "./Sponsor.css";

const donors = {
  "diamond": "鑽石級贊助",
  "gold": "黃金級贊助",
  "silver": "白銀級贊助",
  "bronze": "青銅級贊助",
  "cohost": "協辦單位",
  "donors": "個人贊助",
  "media": "媒體夥伴",
};

const donorsOrder = ["diamond", "gold", "silver", "bronze", "cohost", "donors", "media"];

const Sponsor = React.createClass({
  displayName: "Sponsor",

  render() {
    //console.log(this.props.data);
  	var items = donorsOrder.map((data_key,i)=>{
      
  		  var listItems;
        //console.log(data_key);
        if(data_key!=="donors"){
            if (! this.props.data.sponsors[data_key]) return [];
            listItems = this.props.data.sponsors[data_key].map((value,index)=>{
                return (
                  <a className="Sponsor-item" href={value.url} target="_blank">
                      <img src={value.logoUrl} alt={value.name["zh-tw"]} />
                  </a>
                )
            });

        }else{
            if (! this.props.data.donors) return [];
            listItems = this.props.data.donors.map((value,index)=>{
                //console.log(value);
                return (
                  <div className="Sponsor-donorsItem">
                    {value}
                  </div>
                )
            });

        }
        return (
        	<div key={i}>
        	    <div className="Sponsor-sectionTitle">{donors[data_key]}</div>
        	    {listItems}
        	</div>
        )

  	});

    return (
        <div className="Sponsor">
            <div>{items}</div>

            <div className="Sponsor-sectionTitle">贊助 COSCUP</div>
            <div className="Sponsor-item">
            	<div className="Sponsor-text">如果您欲贊助 COSCUP，請與 sponsorship@coscup.org 聯絡。</div>
            </div>

        </div>
    );
  }
});

export default Transmit.createContainer(Sponsor, {
  queries: {
    data () {
      //return agent.get("http://cors.io/?u=http://coscup.org/2015/api/sponsors/").then(res => JSON.parse(res.text));
      return agent.get("http://coscup.org/2015/api/sponsors").then(res => JSON.parse(res.text));
    }
  }
});
