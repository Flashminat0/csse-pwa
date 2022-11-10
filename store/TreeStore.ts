import { treeService } from '@/Api/services/serviceInitializer'
import ITree from '@/interfaces/trees/ITrees'
import { action, makeObservable, observable, toJS } from 'mobx'
import { toast } from 'react-toastify'

class TreeStore {
	trees: any = null
	treeRes: any = null

	constructor() {
		makeObservable(this, {
			trees: observable,
			addTree: action,
		})
	}
	async addTree(tree: ITree) {
		try {
			const response = await treeService.addTree(tree)
			this.treeRes = response
		} catch (error) {
		} finally {
			if (this.treeRes?.status == 200) {
				toast.success('Successfully Added')
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
}
export default TreeStore
