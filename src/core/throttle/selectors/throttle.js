/* eslint-disable no-throw-literal */
export const numOfRunning = state => state.throttleReducer.jobs.filter(j => j.status === 'running').length;
export const pending = state => state.throttleReducer.jobs.filter(j => j.status === 'pending');
export const limit = state => state.throttleReducer.limit;
export const job = id => state => {
  const jobs = state.throttleReducer.jobs.filter(job => job.id === id);
  if (jobs.length !== 1) {
    throw `ERROR: Job #${id} not found`
  }
  return jobs[0];
};
