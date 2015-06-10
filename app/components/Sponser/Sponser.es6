import React from "react";
import classNames from "classnames";
import "./Sponser.css";
import Data from "./Sponser";
export default React.createClass({
  displayName: "Sponser",

  render() {
  	var items = Object.keys(Data).map((data_key,i)=>{
  		console.log(Data[data_key]);
  		var listItems = Data[data_key].map((value,index)=>{
    		return (
    			<div className="Sponser-item">
    				<img src={value.logo} alt={value.title} />
    			</div>
    		)
    	});
        return (
        	<div key={i}>
        	    <div className="Sponser-sectionTitle">{data_key}</div>
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