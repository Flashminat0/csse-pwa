import ILocation from '@/interfaces/locations/ILocation'
import axios, { AxiosResponse } from 'axios'
import { action, makeObservable } from 'mobx'
import axiosInstance from '../../middleware/setAxiosIntercepter'

class LocationService {
	constructor() {
		makeObservable(this, {
			addLocation: action,
		})
	}

	async addLocation(location: ILocation) {
		return axiosInstance.post('/api/location/addlocation', {
			district: location.district,
			image: location.image,
			address: location.address,
		})
	}
}

export default LocationService
