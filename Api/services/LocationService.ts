import ILocation from '@/interfaces/locations/ILocation'
import axios, { AxiosResponse } from 'axios'
import { action, makeObservable } from 'mobx'
import axiosInstance from '../../middleware/setAxiosIntercepter'

class LocationService {
	constructor() {
		makeObservable(this, {
			addLocation: action,
			getAll: action,
		})
	}

	async addLocation(location: ILocation) {
		return axiosInstance.post('/api/location/addlocation', {
			district: location.district,
			image: location.images,
			address: location.address,
		})
	}
	async getAll() {
		return axiosInstance.get('/api/location/retrieveall')
	}
	async likePost(postId: string) {
		return axiosInstance.put('/api/locaton/likePost', { postId })
	}
}

export default LocationService
