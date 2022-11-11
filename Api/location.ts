import axios from "axios";

export const getOneLocation = async (id: string) => {
	const res =  await axios.get('/api/location/retrieveOneUpdate')

	return res.data
}
