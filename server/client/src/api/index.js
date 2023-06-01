import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3080/api',
})
//export const insertMovie = payload => api.post(`/createWorkspace`, payload)
//export const insertMovie = payload => api.post(`/createFile`, payload)
export const insertMovie = payload => api.get(`/getUserID`, payload)
//export const insertMovie = payload => api.put(`/updateHistory`, payload)
//export const insertMovie = payload => api.put(`/updateSnapshot`, payload)
//export const insertMovie = payload => api.put(`/updateFile`, payload)
//export const insertMovie = payload => api.put(`/leaveWorkspace`, payload)
//export const insertMovie = payload => api.post(`/newUser`, payload)
//export const insertMovie = payload => api.delete(`/deleteFile`)
//export const getAllMovies = () => api.get(`/movies`)
//export const getAllMovies = () => api.get(`/getFile`)
export const getAllMovies = () => api.get(`/getFileInfo`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis