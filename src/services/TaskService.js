import  axios  from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/tasks';

export const listTask = () => axios.get(REST_API_BASE_URL);

export const createTask = (task) => axios.post(REST_API_BASE_URL, task);

 export const getTask = (taskId) => axios.get(REST_API_BASE_URL + '/' + taskId);

export const updateTask = (taskId, task) => axios.put(REST_API_BASE_URL + '/' + taskId, task);

export const deleteTask = (taskId) => axios.delete(REST_API_BASE_URL + '/' +taskId);