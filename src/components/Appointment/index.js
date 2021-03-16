import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};



export default function Appointment(props) {
  return (
    <div>
      <Header time={props.time}/>
      {props.interview? <Show student={"Lydia Miller-Jones"} interviewer={interviewer}/> : <Empty />}
    </div>
  )
}