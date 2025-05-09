import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
export const getPosts = () => api.get('/posts').then(res => res.data);
export const getPost = (id) => api.get(`/posts/${id}`).then(res => res.data);
export const createPost = (post) => api.post('/posts', post).then(res => res.data);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post).then(res => res.data);
export const deletePost = (id) => api.delete(`/posts/${id}`).then(res => res.data);