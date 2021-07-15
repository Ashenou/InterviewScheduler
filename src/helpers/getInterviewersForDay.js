export const getInterviewersForDay = (state, name) => {
  const dayInterviewers = state.days.find((d) => d.name === name);
  if (!dayInterviewers) return [];
  
//   console.log(`dayAppointments`, dayInterviewers.interviewers.map((id) => state.interviewers[id]));
  return dayInterviewers.interviewers.map((id) => state.interviewers[id]);
};
