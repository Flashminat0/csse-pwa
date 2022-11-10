import { treeService } from '@/Api/services/serviceInitializer'
import ITree from '@/interfaces/trees/ITrees'
import { action, makeObservable, observable, toJS } from 'mobx'
import { toast } from 'react-toastify'

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
			this.treeRes = null
		}
	}
	async getAll() {
		try {
			const response = await treeService.getAll()
			this.trees = response.data
		} catch (error) {
		} finally {
			console.log(this.trees)
		}
	}
	async userPosts() {
		try {
			const response = await treeService.myPosts()
			this.myTrees = response.data
		} catch (error) {
		} finally {
			console.log(this.myTrees)
		}
	}
	async update(tree: ITree) {
		try {
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
		}
	}
	async getOne(id: any) {
		try {
			this.tree = null
			const response = await treeService.getOne(id)
			this.tree = response.data
		} catch (error) {
		} finally {
		}
	}
	async delete(id: any) {
		try {
			this.treeRes = null
			const response = await treeService.delete(id)
			this.treeRes = response
			if (response?.status == 200) {
				toast.success('Successfully Deleted')
			}
		} catch (error) {
			console.error(error)
		} finally {
			this.userPosts()
			this.getAll()
		}
	}
}
export default TreeStore
