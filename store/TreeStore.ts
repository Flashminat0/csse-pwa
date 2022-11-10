import { treeService } from '@/Api/services/serviceInitializer'
import ITree from '@/interfaces/trees/ITrees'
import { action, makeObservable, observable, toJS } from 'mobx'
import { toast } from 'react-toastify'
import { loading } from './storeInitializer'

class TreeStore {
	trees: any = null
	treeRes: any = null
	myTrees: any = null
	tree: any = null

	constructor() {
		makeObservable(this, {
			trees: observable,
			treeRes: observable,
			myTrees: observable,
			tree: observable,
			addTree: action,
			getAll: action,
			userPosts: action,
			getOne: action,
			delete: action,
		})
	}
	async addTree(tree: ITree) {
		try {
			loading.setLoading(true)
			this.treeRes = null
			const response = await treeService.addTree(tree)
			this.treeRes = response
		} catch (error) {
		} finally {
			if (this.treeRes?.status == 200) {
				toast.success('Successfully Added')
				this.getAll()
			} else {
				toast.error('Something went wrong')
			}
			loading.setLoading(false)
			this.treeRes = null
		}
	}
	async getAll() {
		try {
			loading.setLoading(true)
			const response = await treeService.getAll()
			this.trees = response.data
		} catch (error) {
		} finally {
			loading.setLoading(false)
		}
	}
	async userPosts() {
		try {
			loading.setLoading(true)
			const response = await treeService.myPosts()
			this.myTrees = response.data
		} catch (error) {
		} finally {
			loading.setLoading(false)
		}
	}
	async update(tree: ITree) {
		try {
			loading.setLoading(true)
			this.treeRes = null
			const response = await treeService.update(tree)
			this.treeRes = response
		} catch (error) {
		} finally {
			if (this.treeRes.status == 200) {
				toast.success('Successfully Updated')
				this.userPosts()
			} else {
				toast.error('Something went Wrong')
			}
			loading.setLoading(false)
		}
	}
	async getOne(id: any) {
		try {
			loading.setLoading(true)
			this.tree = null
			const response = await treeService.getOne(id)
			this.tree = response.data
		} catch (error) {
		} finally {
			loading.setLoading(false)
		}
	}
	async delete(id: any) {
		try {
			loading.setLoading(true)
			this.treeRes = null
			const response = await treeService.delete(id)
			this.treeRes = response
			if (response?.status == 200) {
				toast.success('Successfully Deleted')
			}
		} catch (error) {
			console.error(error)
		} finally {
			loading.setLoading(false)
			this.userPosts()
			this.getAll()
		}
	}
}
export default TreeStore
