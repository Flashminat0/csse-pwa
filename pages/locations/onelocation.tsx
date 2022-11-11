import { uploadFile } from '@/Api/files'
import Page from '@/components/page'
import ILocation from '@/interfaces/locations/ILocation'
import { Modal } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { loading, locationStore } from '../../store/storeInitializer'

const Edit = () => {
	const router = useRouter()
	const { id } = router.query
	const [image, setImage] = useState<string | undefined>()
	const [newFile, setNewFile] = useState<any>()
	const [address, setAddress] = useState('')
	const [description, setDescription] = useState('')
	const [toggle, setToggle] = useState(false)
	const [newImage, setNewImage] = useState<string | undefined>()
	const [opened, setOpened] = useState<boolean>(false)

	useEffect(() => {
		if (router.isReady) {
			locationStore.getOne(id)
		}
	}, [router.isReady])

	useEffect(() => {
		if (locationStore.oneLocation) {
			setImage(locationStore.oneLocation.images)
			setAddress(locationStore.oneLocation.address)
			setDescription(locationStore.oneLocation.district)
		}
	}, [locationStore.oneLocation])

	const setFiles = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			const newFiles = []
			for (let j = 0; j < event.target.files.length; j++) {
				newFiles.push(event.target.files[j])
			}
			setNewFile(newFiles)
		}
	}

	const handleImageUpload = async (event: any) => {
		event.preventDefault()
		loading.setLoading(true)
		if (!newFile) {
			submitHandler()
		} else {
			if (!newFile) {
				return
			}
			const file = newFile[0]
			if (!newFile[0]) {
				return
			}
			uploadFile(newFile[0], 'trees')
				.then((url) => {
					setImage(url)
					setNewImage(url)
				})
				.catch((err) => {
					toast.error(err)
				})
		}
	}
	useEffect(() => {
		if (newImage) {
			submitHandler()
		}
	}, [newImage])

	const submitHandler = async () => {
		loading.setLoading(false)
		const location: ILocation = {
			_id: id,
			address: address,
			district: description,
			images: image,
		}
		await locationStore.Update(location)
	}

	const deleteLocation = () => {
		locationStore.delete(id)
	}

	return (
		<div>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title='Are you sure want to delete?'
			>
				<button
					className='rounded-lg bg-red-400 px-4 py-2 hover:bg-red-400'
					onClick={() => {
						deleteLocation()
						setOpened(false)
					}}
				>
					Delete
				</button>
			</Modal>
			{locationStore.oneLocation && (
				<Page title='Edit Location'>
					<div className='space-y-5 rounded-lg bg-gray-100 p-3'>
						<form
							className='flex w-full flex-col space-y-3 px-2'
							onSubmit={handleImageUpload}
						>
							<div className='mt-1 sm:col-span-2 sm:mt-0'>
								{toggle ? (
									<div className='mt-1 sm:col-span-2 sm:mt-0'>
										<div className='flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
											<div className='space-y-1 text-center'>
												<div className='flex flex-col text-sm text-gray-600'>
													<label
														htmlFor='file-upload'
														className='relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500'
													>
														<span>Upload your images</span>
														<input
															id='file-upload'
															name='file-upload'
															type='file'
															className='sr-only'
															onChange={setFiles}
															disabled
														/>
													</label>
													<p className='text-xs text-gray-500'>
														PNG, JPG, GIF files are allowed
													</p>
												</div>
												<svg
													className='mx-auto h-12 w-12 text-gray-400'
													stroke='currentColor'
													fill='none'
													viewBox='0 0 48 48'
													aria-hidden='true'
												>
													<path
														d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
														strokeWidth={2}
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
												<p className='text-xs text-gray-500'>
													Browse to choose a file
												</p>
											</div>
										</div>
									</div>
								) : (
									<section className='w-full'>
										<img src={image} className='w-full' />
									</section>
								)}
							</div>
							<div className='rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600'>
								<input
									type='text'
									name='name'
									id='name'
									onChange={(e) => {
										setAddress(e.target.value)
									}}
									value={address}
									className='block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
									placeholder='Home Location Address'
									disabled
								/>
							</div>
							<div>
								<div className='mt-1'>
									<textarea
										onChange={(e) => {
											setDescription(e.target.value)
										}}
										value={description}
										rows={4}
										placeholder='Home Description'
										name='comment'
										id='comment'
										className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
										disabled
									/>
								</div>
							</div>
						</form>
					</div>
				</Page>
			)}
		</div>
	)
}

export default observer(Edit)
