import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertPost = payload => api.post(`/post`, payload)
export const getAllPost = () => api.get(`/post`)
export const getPostById = (id, payload) => api.put(`/post/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertPost,
    getAllPost,
    getPostById,
    // deleteMovieById,
    // getMovieById,
}

export default apis