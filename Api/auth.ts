import axios from 'axios'

export const authUser = async (displayName: string, email: string, photoURL: string, district: string) => {
	const res = await axios.post('/api/auth', {
		displayName,
		email,
		photoURL,
		district
	}, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		}
	})

	return res.data
}

export const checkUser = async () => {
	const res = await axios.get('/api/user/get-user-data', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		}
	})

	return res.data
}
