import axios from 'axios'

export const getTrophies = async () => {
	const res = await axios.get('/api/get-trophies')

	return res.data
}
