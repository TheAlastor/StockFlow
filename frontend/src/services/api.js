import axios from 'axios'

const api = axios.create({
  baseURL: 'https://stockflow-4rrp.onrender.com'
})

export default api
