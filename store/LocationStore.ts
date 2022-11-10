import { locationService } from '@/Api/services/serviceInitializer'
import ILocation from '@/interfaces/locations/ILocation'
import { action, makeObservable, observable, toJS } from 'mobx'
import { toast } from 'react-toastify'

class LocationStore {
	locations: any = null
	locationRes: any = null
	userId: string = ''

	constructor() {
		makeObservable(this, {
			locations: observable.deep,
			userId: observable,
			addLocation: action,
			likePost: action,
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
	async getAll() {
		try {
			const response = await locationService.getAll()
			this.locations = response.data.result
			this.userId = response.data.userId
		} catch (error) {
			console.error(error)
		} finally {
		}
	}
	async likePost(id: string) {
		try {
			const response = await locationService.likePost(id)
			await this.getAll()
		} catch (error) {
			console.error(error)
		} finally {
		}
	}
}
export default LocationStore
