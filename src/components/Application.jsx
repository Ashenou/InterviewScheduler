import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";

import { getInterview } from "../helpers/getInterview.js";
import { getAppointmentsForDay } from "../helpers/getAppointmentsForDay";
import { getInterviewersForDay } from "../helpers/getInterviewersForDay";



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg"
//       }
//     }
//   }
// ];


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([axios.get("api/days"), axios.get("api/appointments"), axios.get("api/interviewers")]).then((all) => {
      setState(prev => {
        console.log('state :>> ', { ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
        return ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
      }
      );
    })
  }, []);


  // set the selected day from days
  const setDay = day => setState(prev => ({ ...prev, day }));

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


  function bookInterview(id, interview) {
    // console.log(id, interview);

    //Gets the appointment information to edit it while keeping all values from existing appointment 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //console.log("Line 102",appointment);
    // we update that appointment object in the appointments object using the id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // the function returns a promise to be async so we can set the mode to SHOW after getting the data 
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments
      });
    }).catch((err) => console.log(err.message));
  }



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
        {appointments.map(appointment => {
          // console.log("Line 131", appointment.interview)  
          const interview = getInterview(state, appointment.interview);
          return (<Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview} interviewers={interviewers} bookInterview={bookInterview} />)
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
