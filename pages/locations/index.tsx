import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import { uploadFile } from '@/Api/files'
import { toast } from 'react-toastify'
import ILocation from '@/interfaces/locations/ILocation'
import { locationStore } from '../../store/storeInitializer'

const Index = () => {
	const [files, setFile] = useState<any>()
	const [address, setAddress] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [image, setImage] = useState<string>()
	const [imageUrl, setImageUrl] = useState<string | undefined>()

	const router = useRouter()

	const setFiles = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			const newFiles = []
			for (let j = 0; j < event.target.files.length; j++) {
				newFiles.push(event.target.files[j])
			}
			setFile(newFiles)
		}
	}
	const submitHandler = () => {
		const location: ILocation = {
			address: address,
			district: description,
			images: imageUrl,
		}
		locationStore.addLocation(location)
	}

	useEffect(() => {
		if (files) {
			if (files && files[0]) {
				const i = files[0]
				setImage(URL.createObjectURL(i))
			}
		}
	}, [files])

	useEffect(() => {
		if (imageUrl) {
			submitHandler()
		}
	}, [imageUrl])

	//ImageUpload
	const handleImageUpload = async (event: any) => {
		event.preventDefault()
		if (!files) {
			return
		}
		const file = files[0]
		if (!files[0]) {
			return
		}
		uploadFile(file, 'location')
			.then((url) => {
				setImageUrl(url)
			})
			.catch((err) => {
				toast.error(err)
			})
	}

	return (
		<div className='flex h-screen items-center justify-center'>
			<form
				className='flex w-full flex-col space-y-3 px-2'
				onSubmit={handleImageUpload}
			>
				<div className='mt-1 sm:col-span-2 sm:mt-0'>
					{image ? (
						<img src={image} className='w-full' />
					) : (
						<div className='flex max-w-lg justify-center rounded-md bg-gray-200 pt-5 pb-6'>
							<div className='w-full space-y-1 text-center'>
								<div className='flex flex-col text-sm text-gray-600'>
									<label
										htmlFor='file-upload'
										className='relative cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500'
									>
										<span>Upload your location Image</span>
										<input
											id='file-upload'
											name='file-upload'
											type='file'
											className='sr-only'
											onChange={setFiles}
										/>
									</label>
									<p className='py-5 text-xs'>
										PNG, JPG, GIF files are allowed
									</p>
								</div>
								<div className='w-full border-2 border-dashed border-gray-300 bg-gray-100'>
									<div className='flex justify-center'>
										<BiUpload className={`h-20 w-20 text-gray-600`} />
									</div>
									<p className='text-xs text-gray-500'>
										Browse to choose a file
									</p>
								</div>
							</div>
						</div>
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
						required
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
							required
						/>
					</div>
				</div>
				<div className='flex space-x-5'>
					<button
						onClick={() => {
							router.push('/locations/view')
						}}
						type='button'
						className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
					>
						Add
					</button>
				</div>
			</form>
		</div>
	)
}

export default Index
