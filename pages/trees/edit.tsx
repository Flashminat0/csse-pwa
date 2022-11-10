import { uploadFile } from '@/Api/files'
import ITree from '@/interfaces/trees/ITrees'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { treeStore } from '../../store/storeInitializer'

const Edit = () => {
	const router = useRouter()
	const { id } = router.query
	const [files, setFile] = useState<any>()
	const [name, setName] = useState('')
	const [sciName, setSciName] = useState('')
	const [description, setDescription] = useState('')
	const [tag, setTag] = useState<string[]>([])
	const [Tags, setTags] = useState<any>([])
	const [image, setImage] = useState<string | undefined>('')
	const [newImage, setNewImage] = useState<string | undefined>()
	const [newFile, setNewFile] = useState<any>()
	const [newTag, setNewTag] = useState('')

	const [toggle, setToggle] = useState(false)
	useEffect(() => {
		if (router.isReady) {
			treeStore.getOne(id)
		}
	}, [router.isReady])

	useEffect(() => {
		if (treeStore.tree) {
			setName(treeStore.tree.name)
			setSciName(treeStore.tree.scientificname)
			setDescription(treeStore.tree.description)
			setTag(treeStore.tree.tags)
			setImage(treeStore.tree.image)
		}
	}, [treeStore.tree])

	useEffect(() => {
		if (treeStore.treeRes?.status == 200) {
			router.push('/trees/my-posts')
		}
	}, [treeStore.treeRes])

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

	const submitHandler = () => {
		const tree: ITree = {
			_id: id,
			name: name,
			scientificname: sciName,
			image: image,
			tags: tag,
			description: description,
		}
		treeStore.update(tree)
	}

	const deleteLocation = async () => {
		await treeStore.delete(id)
		router.push('/trees/my-posts')
	}

	const addTags = (tag: string) => {
		setTag((prev: any) => [...prev, newTag])
		setNewTag('')
	}

	return (
		<div className='pb-20'>
			{name && (
				<div className='space-y-5 rounded-lg bg-gray-100 p-3'>
					<form
						className='flex w-full flex-col space-y-3 px-2'
						onSubmit={handleImageUpload}
					>
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
										<p
											className='text-xs text-gray-500'
											onClick={() => {
												setToggle(!toggle)
											}}
										>
											Browse to choose a file
										</p>
									</div>
								</div>
							</div>
						) : (
							<section
								className='w-full'
								onClick={() => {
									setToggle(!toggle)
								}}
							>
								<img src={image} className='w-full' />
							</section>
						)}
						<div className='rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600'>
							<input
								type='text'
								name='name'
								id='name'
								onChange={(e) => {
									setName(e.target.value)
								}}
								value={name}
								className='block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
								placeholder='Add Tree Name'
							/>
						</div>
						<div className='rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600'>
							<input
								type='text'
								name='name'
								id='name'
								onChange={(e) => {
									setSciName(e.target.value)
								}}
								value={sciName}
								className='block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
								placeholder='Add Scientific Name'
							/>
						</div>
						<div
							className='grid w-full grid-cols-3 gap-5 px-2'
							onClick={() => {
								setTag([])
							}}
						>
							{tag?.map((tag: string, idx: any) => (
								<div
									key={idx}
									className='grid w-20 scale-125 place-items-center rounded-full bg-gradient-to-b from-green-300 to-blue-400 text-center'
								>
									{tag}
								</div>
							))}
						</div>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'
							>
								Add Tags
							</label>
							<div className='mt-1 flex rounded-md shadow-sm'>
								<div className='relative flex flex-grow items-stretch focus-within:z-10'>
									<input
										name='email'
										id='email'
										onChange={(e) => {
											setNewTag(e.target.value)
										}}
										value={newTag}
										className='block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										placeholder='Insert Tag'
									/>
								</div>
								<button
									onClick={() => {
										addTags(newTag)
									}}
									type='button'
									className='relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
								>
									<span>Add</span>
								</button>
							</div>
						</div>
						<div>
							<div className='mt-1'>
								<textarea
									onChange={(e) => {
										setDescription(e.target.value)
									}}
									value={description}
									rows={4}
									placeholder='Add Description'
									name='comment'
									id='comment'
									className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
								/>
							</div>
						</div>
						<section>
							<button
								onClick={() => {
									deleteLocation()
								}}
								type='button'
								className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
							>
								Delete
							</button>
						</section>
						<div className='flex space-x-5'>
							<button
								onClick={() => {
									router.push('/trees/view')
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
								Update
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default observer(Edit)
