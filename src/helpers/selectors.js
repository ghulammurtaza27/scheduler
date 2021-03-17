export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const result = [];
  const requiredDay = day;
  const filteredAppointmentIds = state.days.filter(day => day.name === requiredDay)[0];
  if (!filteredAppointmentIds) {
    return [];
  }
  filteredAppointmentIds.appointments.forEach(id => {
    result.push(state.appointments[id]);
  })
  return result;
}