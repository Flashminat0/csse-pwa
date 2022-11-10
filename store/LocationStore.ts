import ILocation from '@/interfaces/locations/ILocation'
import { action, makeObservable, observable, toJS } from 'mobx'
import { toast } from 'react-toastify'

class LocationStore {
	locations: [] = []

	constructor() {
		makeObservable(this, {
			locations: observable,
			addLocation: action,
		})
	}
	addLocation(location: ILocation) {
		console.log(location)
		toast.success('Successfully Added')
	}
}
export default LocationStore
