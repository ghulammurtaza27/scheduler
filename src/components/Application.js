import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList.js";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewsForDay } from "helpers/selectors.js";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];




export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
  }
  
  const setDay = (day) => {
    setState({ ...state, day });
  }


//   useEffect(() => {
//     axios.get('http://localhost:8001/api/days')
//       .then((response) => {
//         console.log(response.data);
//         //setDays(response.data);
//         setDays(response.data);
//       });
// }, [])

  useEffect(() => {

    Promise.all([axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'), axios.get('http://localhost:8001/api/interviewers')]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }
        ));
        // console.log(all[0].data);
        // console.log(all[1].data);
    })
  }, [])
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewsForDay(state, state.day)
  console.log(dailyAppointments);
  console.log(dailyInterviewers);


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
    // days={days}
    // day={day}
    days={state.days}
    day={state.day}
    setDay={setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>

      </section>
      <section className="schedule">
  {dailyAppointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);

    return (<Appointment key={appointment.id} bookInterview={bookInterview} interviewers={dailyInterviewers} {...appointment} interview={interview} />)})}
      </section>
    </main>
  );
}