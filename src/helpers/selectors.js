export const getAppointmentsForDay = (state, day) => {
  // {
  //     days: [
  //       { id: 1, name: 'Monday', appointments: [Array] },
  //       { id: 2, name: 'Tuesday', appointments: [Array] }
  //     ],
  //     appointments: {
  //       '1': { id: 1, time: '12pm', interview: null },
  //       '2': { id: 2, time: '1pm', interview: null },
  //       '3': { id: 3, time: '2pm', interview: [Object] },
  //       '4': { id: 4, time: '3pm', interview: null },
  //       '5': { id: 5, time: '4pm', interview: [Object] }
  //     }
  //   }
  let apptDayIds = [];
  let apptsInDay = [];

  // if state is truthy and day is found return the whole object
  apptDayIds = state && state.days.filter((item) => item.name === day)[0];
  // if apptDayIds is truthy and apptDayIds.appointments return ids of appointments
  apptDayIds = apptDayIds && apptDayIds.appointments;

  // if apptDayIds truthy search for the id in the appointments object and push to array of appts in specific day array
  if (apptDayIds) {
    for (const id of apptDayIds) {
      apptsInDay.push(state.appointments[id]);
    }
  }
  //console.log("Line 27",apptsInDay)
  return apptsInDay;
};
