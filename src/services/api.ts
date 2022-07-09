import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rama.luanmartins.com'
})

export default api
