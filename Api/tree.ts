import axios from "axios";

export const getOneTree = async (id: string) => {
	const res = await axios.get(`/api/getOneUpdate?postId=${id}`)

	return res.data
}


