import axios from 'axios'

export const searchEntities = async (query?: string) => {
	const res = await axios.get(`/api/search`, {
		params: {
			query,
		},
	})

	return res.data
}
