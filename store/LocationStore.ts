import { locationService } from '@/Api/services/serviceInitializer'
import ILocation from '@/interfaces/locations/ILocation'
import { action, makeObservable, observable } from 'mobx'
import { toast } from 'react-toastify'

class LocationStore {
	locations: any = null
	myLocations: any = null
	oneLocation: any = null
	locationRes: any = null
	userId: string = ''

	constructor() {
		makeObservable(this, {
			locations: observable.deep,
			myLocations: observable,
			oneLocation: observable,
			userId: observable,
			addLocation: action,
			likePost: action,
			getUserPosts: action,
			Update: action,
			getAll: action,
			delete: action,
		})
	}
	async addLocation(location: ILocation) {
		try {
			const response = await locationService.addLocation(location)
			this.locationRes = response
		} catch (error) {
			console.error(error)
		} finally {
			if (this.locationRes?.status == 200) {
				toast.success('Successfully Added')
			} else {
				console.log(this.locationRes)
				toast.error('Something went wrong')
			}
			this.locationRes = null
			this.getAll()
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
	async getUserPosts() {
		try {
			const response = await locationService.myPosts()
			this.myLocations = response.data.result
		} catch (error) {
			console.error(error)
		} finally {
		}
	}
	async getOne(id: any) {
		try {
			const response = await locationService.getOne(id)
			this.oneLocation = response.data
		} catch (error) {
			console.error(error)
		} finally {
		}
	}

	async Update(location: ILocation) {
		try {
			this.locationRes = null
			const response = await locationService.update(location)
			this.locationRes = response
		} catch (error) {
			console.error(error)
		} finally {
			if (this.locationRes.status == 200) {
				toast.success('Successfully Updated')
				this.getUserPosts()
			} else {
				toast.error('Something went Wrong')
			}
		}
	}

	async delete(id: any) {
		try {
			const response = await locationService.delete(id)
			this.locationRes = response
			if (response?.status == 200) {
				toast.success('Successfully Deleted')
			}
		} catch (error) {
			console.error(error)
		} finally {
			this.getUserPosts()
		}
	}
}
export default LocationStore
