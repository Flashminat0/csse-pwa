import { locationService } from '@/Api/services/serviceInitializer'
import ILocation from '@/interfaces/locations/ILocation'
import { action, makeObservable, observable, toJS } from 'mobx'
import { toast } from 'react-toastify'

class LocationStore {
	locations: [] = []
	locationRes: any = null

	constructor() {
		makeObservable(this, {
			locations: observable,
			addLocation: action,
		})
	}
	async addLocation(location: ILocation) {
		try {
			const response = await locationService.addLocation(location)
			this.locationRes = response
		} catch (error) {
			console.error(error)
		} finally {
			console.log(this.locationRes)
			if (this.locationRes?.status == 200) {
				toast.success('Successfully Added')
			}
			this.locationRes = null
		}
	}
}
export default LocationStore
