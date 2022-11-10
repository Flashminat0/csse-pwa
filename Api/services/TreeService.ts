import ITree from '@/interfaces/trees/ITrees'
import axios, { AxiosResponse } from 'axios'
import { action, makeObservable } from 'mobx'
import axiosInstance from '../../middleware/setAxiosIntercepter'

class TreeService {
	constructor() {
		makeObservable(this, {
			addTree: action,
			getAll: action,
			myPosts: action,
			getOne: action,
			update: action,
			delete: action,
		})
	}

	async addTree(tree: ITree) {
		return axiosInstance.post('/api/tree', {
			name: tree.name,
			image: tree.image,
			tags: tree.tags,
			scientificname: tree.scientificname,
			description: tree.description,
		})
	}
	async getAll() {
		return axiosInstance.get('/api/gettrees')
	}
	async myPosts() {
		return axiosInstance.get('/api/getuserposts')
	}

	async update(tree: ITree) {
		return axiosInstance.put('/api/updatepost', {
			postId: tree._id,
			name: tree.name,
			image: tree.image,
			tags: tree.tags,
			scientificname: tree.scientificname,
			description: tree.description,
		})
	}

	async getOne(id: string) {
		return axiosInstance.get(`/api/getOneUpdate?postId=${id}`)
	}
	async delete(postId: string) {
		return axiosInstance.delete('/api/deleteTree', { data: { postId } })
	}
}

export default TreeService
