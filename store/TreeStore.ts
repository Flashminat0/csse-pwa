import ITree from '@/interfaces/locations/ITrees'
import { action, makeObservable, observable, toJS } from 'mobx'
import { toast } from 'react-toastify'

class TreeStore {
	trees: [] = []

	constructor() {
		makeObservable(this, {
			trees: observable,
			addTree: action,
		})
	}
	addTree(tree: ITree) {
		console.log(tree)
		toast.success('Successfully Added')
	}
}
export default TreeStore
