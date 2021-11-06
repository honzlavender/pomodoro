import React from "react";

function TimerGifs({label}) {
//let imgSrc = ""
//console.log(label.label)

if (!label) return <></>;

const imgSrc = label === "Focusing" ? "./images/focus.gif" : "./images/beach.gif"


return (
  <img src={imgSrc} alt="cool"></img>
)
}


export default TimerGifs;


