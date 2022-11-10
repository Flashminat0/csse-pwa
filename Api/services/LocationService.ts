import ILocation from '@/interfaces/locations/ILocation'
import axios, { AxiosResponse } from 'axios'
import { action, makeObservable } from 'mobx'
import axiosInstance from '../../middleware/setAxiosIntercepter'

class LocationService {
	constructor() {
		makeObservable(this, {
			addLocation: action,
			getAll: action,
			myPosts: action,
			update: action,
			delete: action,
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
	async myPosts() {
		return axiosInstance.get('/api/location/retrieveuserposts')
	}
	async getOne(postId: string) {
		return axiosInstance.post('/api/location/retrieveOneUpdate', {
			postId: postId,
		})
	}
	async update(location: ILocation) {
		return axiosInstance.put('/api/location/updatelocation', {
			postId: location._id,
			district: location.district,
			image: location.images,
			address: location.address,
		})
	}
	async delete(postId: string) {
		return axiosInstance.delete('/api/location/delete', { data: { postId } })
	}
}

export default LocationService
