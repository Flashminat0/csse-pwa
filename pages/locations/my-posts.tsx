import ILocation from '@/interfaces/locations/ILocation'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { locationStore } from '../../store/storeInitializer'

const View = () => {
	const router = useRouter()
	const [locations, setLocations] = useState<ILocation[]>()
	const [fetch, setFetch] = useState(false)

	useEffect(() => {
		if (!locationStore.myLocations && !fetch) {
			locationStore.getUserPosts()
			setFetch(true)
		}
		if (locationStore.myLocations) {
			setLocations(locationStore.myLocations)
		}
	}, [locationStore.myLocations])

	const selectOne = (id: string) => {
		router.push({
			pathname: '/locations/edit',
			query: { id: id },
		})
	}

	return (
		<div className='h-full w-full'>
			<div className='space-y-5 rounded-lg'>
				{locations &&
					locations.map((location: ILocation) => (
						<div
							className='space-y-5 rounded-lg bg-gray-100 p-3'
							key={location._id}
						>
							<section
								className='flex w-full justify-center overflow-hidden rounded-lg'
								onClick={() => {
									selectOne(location._id)
								}}
							>
								<img src={location.images} className='w-full' />
							</section>
							<section className='flex justify-between py-2'>
								<div>{location.address}</div>
								<div className='flex space-x-3'>
									<p>{location.likes?.length} Likes</p>
								</div>
							</section>
							<section className='h-52 bg-blue-300'>
								<p className='p-2'>{location.district}</p>
							</section>
						</div>
					))}
			</div>
			<div className='sticky bottom-0 z-10 bg-gray-50 px-3 py-2'>
				<div className='flex space-x-5'>
					<button
						onClick={() => {
							router.push('/')
						}}
						type='button'
						className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
						onClick={() => {
							router.push('location/add')
						}}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	)
}

export default observer(View)
