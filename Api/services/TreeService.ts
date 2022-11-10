import ITree from '@/interfaces/trees/ITrees'
import axios, { AxiosResponse } from 'axios'
import { action, makeObservable } from 'mobx'
import axiosInstance from '../../middleware/setAxiosIntercepter'

class TreeService {
	constructor() {
		makeObservable(this, {
			addTree: action,
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
}

export default TreeService
