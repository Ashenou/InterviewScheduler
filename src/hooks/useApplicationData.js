import { useState, useEffect } from "react";
import axios from "axios";

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.

export default function useApplicationData() {

    // Sets initial state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  // sets the state from the return of the days, appointments,interviewers requests
  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => {
        return {
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        };
      });
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = (incomingState, appointments, day) => {
    const state = { ...incomingState };
    const currentDay = day || state.day;

    // Find the day the object
    const currentDayObj = state.days.find(
      (dayObj) => dayObj.name === currentDay
    );
    const currentDayIndex = state.days.findIndex(
      (dayObj) => dayObj.name === currentDay
    );
    // Find the appointment id array
    const listOfAppointmentIds = currentDayObj.appointments;
    // Look for the null interviews in each appointment from the array
    const listOfNullAppointments = listOfAppointmentIds.filter(
      (id) => !appointments[id].interview
    );

    // Sum them up
    const spots = listOfNullAppointments.length;

    // update the value of the key 'spots' in the day with the sum I just made
    const updatedDayObj = { ...currentDayObj, spots };
    // gets days from current state
    const days = state.days;
    // sets days object inside current days object
    days[currentDayIndex] = updatedDayObj;

    return days;
  };

  function bookInterview(id, interview) {
    //Gets the appointment information to edit it while keeping all values from existing appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // We update that appointment object in the appointments object using the id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // The function returns a promise to be async so we can set the mode to SHOW after getting the data
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const updatedDays = updateSpots(state, appointments, state.day);

    // Update spots in state using days object returned from updated days.
      setState({
        ...state,
        appointments,
        days: updatedDays,
      });
    });
  }

  function cancelInterview(id) {
    // Gets the appointment information to edit it while keeping all values from existing appointment
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // The function returns a promise to be async so we can set the mode to SHOW after getting the data
    return axios.delete(`/api/appointments/${id}`).then(() => {

      const updatedDays = updateSpots(state, appointments, state.day);
    // Update spots in state using days object returned from updated days.
      setState({
        ...state,
        appointments,
        days: updatedDays,
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
