import ILocation from '@/interfaces/locations/ILocation'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { locationStore } from '../../store/storeInitializer'

const View = () => {
	const router = useRouter()
	const [locations, setLocations] = useState<ILocation[]>()
	const [likes, setLikes] = useState<any[]>([])
	const [user, setUser] = useState<string>()

	useEffect(() => {
		if (!locationStore.locations) {
			locationStore.getAll()
		}
		if (locationStore.locations) {
			setLocations(locationStore.locations)
			setUser(locationStore.userId)
		}
	}, [locationStore.locations])

	const selectOne = (id: string) => {
		router.push({
			pathname: '/location/edit',
			query: { id: id },
		})
	}

	const likePost = async (id: string) => {
		await locationStore.likePost(id)
	}

	const isLiked = (array: any[] | undefined) => {
		if (array) {
			const index = array.findIndex((object) => object === user)
			if (index === -1) {
				return false
			} else if (index === 0) {
				return true
			}
			return true
		}
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
								<div
									className='flex space-x-3'
									onClick={() => {
										likePost(location._id)
									}}
								>
									<div
										className={`${
											isLiked(location.likes)
												? 'animate-pulse font-extrabold text-red-500'
												: ''
										}`}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											fill='currentColor'
											className='h-6 w-6'
										>
											<path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
										</svg>
									</div>
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
