import { locationService } from '@/Api/services/serviceInitializer'
import ILocation from '@/interfaces/locations/ILocation'
import { action, makeObservable, observable } from 'mobx'
import { toast } from 'react-toastify'

class Loading {
	loading: boolean = false

	constructor() {
		makeObservable(this, {
			loading: observable,
			setLoading: action,
		})
	}
	setLoading(value: boolean) {
		this.loading = value
	}
}

export default Loading
