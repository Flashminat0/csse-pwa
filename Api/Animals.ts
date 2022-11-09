import axios from "axios"

export const addAnimal = async (animal: any) => {
	const res = await axios.post("/api/animal/addAnimal", animal, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})

	return res.data.message

}

export const getAnimal = async (id: string) => {
	const res = await axios.get(`/api/animal/getAnimal`, {
		params: {
			id: id,
		},
	})

	return res.data
}

export const deleteAnimal = async (id: string) => {
	const res = await axios.delete("/api/animal/deleteAnimal", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		}, data: {
			id: id,
		},
	})

	return res.data

}

export const getAnimalsData = async () => {
	const res = await axios.get("/api/animal/fetchAnimalList")

	return res.data.animalsList
}

export const editAnimal = async (animal: any) => {
	const res = await axios.put("/api/animal/editAnimal", animal, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
	return res.data.message
}
