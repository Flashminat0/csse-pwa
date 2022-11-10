import axios from 'axios'

let authToken

if (typeof window !== 'undefined') {
	authToken = localStorage.getItem('token')
}

const axiosInstance = axios.create({
	headers: {
		Authorization: `Bearer ${authToken}`,
	},
})

export default axiosInstance
