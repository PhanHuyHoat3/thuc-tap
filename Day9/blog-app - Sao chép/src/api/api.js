import axios from "axios"

const api_url = 'http://localhost:3000'

export const getBlogs = async() => {
    const response = await axios.get(`${api_url}/blogs`)
    return response.data
}

export const getBlog = async(id) => {
    const response = await axios.get(`${api_url}/blogs/${id}`)
    return response.data
}

export const createBlog = async(data) => {
    const response = await axios.post(`${api_url}/blogs`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

export const updateBlog = async(id, data) => {
    const response = await axios.put(`${api_url}/blogs/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

export const deleteBlog = async(id) => {
    return await axios.delete(`${api_url}/blogs/${id}`)
    
}