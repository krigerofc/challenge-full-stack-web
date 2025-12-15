import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

// Normalize API errors to a single Error with a message
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Unknown error'
    return Promise.reject(new Error(message))
  }
)

export async function getStudents() {
  const res = await api.get('/api/students')
  return res.data.data
}

export async function getStudent(id) {
  const res = await api.get(`/api/students/${id}`)
  return res.data.data
}

export async function createStudent(payload) {
  const res = await api.post('/api/students', payload)
  return res.data
}

export async function updateStudent(id, payload) {
  const res = await api.put(`/api/students/${id}`, payload)
  return res.data
}

export async function deleteStudent(id) {
  const res = await api.delete(`/api/students/${id}`)
  return res.data
}

export default api
