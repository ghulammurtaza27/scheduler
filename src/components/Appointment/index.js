import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";




const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <div>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition('CREATE')} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
      />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers} save={save} onSave={console.log("onSave")} onCancel={() => back()} setInterviewer={console.log("setInterviewer")}
      />
      )}
    </div>
  )
}