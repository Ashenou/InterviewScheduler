// export const getAppointmentsForDay = (state, day) => {
//   // {
//   //     days: [
//   //       { id: 1, name: 'Monday', appointments: [Array] },
//   //       { id: 2, name: 'Tuesday', appointments: [Array] }
//   //     ],
//   //     appointments: {
//   //       '1': { id: 1, time: '12pm', interview: null },
//   //       '2': { id: 2, time: '1pm', interview: null },
//   //       '3': { id: 3, time: '2pm', interview: [Object] },
//   //       '4': { id: 4, time: '3pm', interview: null },
//   //       '5': { id: 5, time: '4pm', interview: [Object] }
//   //     }
//   //   }
//   let apptDayIds = [];
//   let apptsInDay = [];

//   // if state is truthy and day is found return the whole object
//   apptDayIds = state && state.days.filter((item) => item.name === day)[0];
//   // if apptDayIds is truthy and apptDayIds.appointments return ids of appointments
//   apptDayIds = apptDayIds && apptDayIds.appointments;

//   // if apptDayIds truthy search for the id in the appointments object and push to array of appts in specific day array
//   if (apptDayIds) {
//     for (const id of apptDayIds) {
//       apptsInDay.push(state.appointments[id]);
//     }
//   }
//   //console.log("Line 27",apptsInDay)
//   return apptsInDay;
// };

export const getAppointmentsForDay = (state, day) => {
  const dayAppointments = state.days.find((d) => d.name === day);
  if (!dayAppointments) return [];

  return dayAppointments.appointments.map((id) => state.appointments[id]);
};

export const getInterviewersForDay = (state, name) => {
  const dayInterviewers = state.days.find((d) => d.name === name);
  if (!dayInterviewers) return [];

  return dayInterviewers.interviewers.map((id) => state.interviewers[id]);
};

export const getInterview = (state, interview) => {
  // Object returned:{
  //     "student": "Lydia Miller-Jones",
  //     "interviewer": {
  //       "id": 1,
  //       "name": "Sylvia Palmer",
  //       "avatar": "https://i.imgur.com/LpaY82x.png"
  //     }
  //   }
  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
};
