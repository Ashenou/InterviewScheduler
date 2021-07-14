export const getAppointmentsForDay = (state, day) => {
  const dayAppointments = state.days.find((d) => d.name === day);
  if (!dayAppointments) return [];

  return dayAppointments.appointments.map((id) => state.appointments[id]);
};
