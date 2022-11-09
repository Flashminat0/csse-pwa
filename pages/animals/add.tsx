import Page from "@/components/page"
import {BiUpload} from "react-icons/bi"
import {useRouter} from "next/router"

import {Dropzone, FileWithPath} from "@mantine/dropzone";
import React, {useState} from "react"
import {uploadFile} from "@/Api/files"
import {addAnimal} from "@/Api/Animals"
import {toast} from "react-toastify"
import SpecificInfoAnimal from "@/components/animals/SpecificInfoAnimal"


const AnimalAdd = () => {
	const router = useRouter()

	const [imageUrl, setImageUrl] = useState<string | undefined>("")
	const [nameInput, setNameInput] = useState("")
	const [scientificNameInput, setScientificNameInput] = useState("")
	const [descriptionInput, setDescriptionInput] = useState("")


	const handleSubmitAnimal = async () => {
		if (nameInput === "" || scientificNameInput === "" || descriptionInput === "") {
			toast.error("Please fill all fields")
			return
		}

		if (!imageUrl) {
			toast.error("Please Select an image")
			return
		}


		addAnimal({
			nameInput,
			scientificNameInput,
			descriptionInput,
			imageUrl
		}).then(message => {
			toast.success(message)
			// router.push("/animals/")
		}).catch(err => {
			toast.error(err)
		})
	}

	const [fileState, setFileState] = useState("none");

	const handleImageUpload = async (files: FileWithPath[] | any[]) => {
		if (!files) {
			return
		}
		const file = files[0]
		if (!files[0]) {
			return
		}
		const image = new Image()
		image.src = URL.createObjectURL(file)
		image.onload = () => {
			uploadFile(file, "animals").then(url => {
				setImageUrl(url)
			}).catch(err => {
				toast.error(err)
			})
		}
	}

	return (
		<Page title={`Add Animal`}>
			<main className={`grid grid-rows-6 h-full`}>
				<div className="row-span-3">
					{imageUrl ?
						<div>
							<img src={imageUrl} alt={'animal'}/>
						</div>
						:
						<Dropzone
							onDrop={handleImageUpload}
							className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
							<div className="space-y-1 text-center">
								<svg
									className="mx-auto h-12 w-12 text-gray-400"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
									aria-hidden="true"
								>
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<div className="flex text-sm text-gray-600">
									<label
										htmlFor="file-upload"
										className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
									>
										<span>Upload a file</span>
										<input id="file-upload" name="file-upload" type="file" className="sr-only"/>
									</label>
									<p className="pl-1">or drag and drop</p>
								</div>
								<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
							</div>
						</Dropzone>
					}
				</div>
				{JSON.stringify(imageUrl)}
				{fileState === "uploading" && <p>Uploading...</p>}
				{fileState === "uploaded" && <p>Uploaded</p>}
				<div className={`mt-4 mx-3`}>
					<input
						type="email"
						name="email"
						id="email"
						className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
						placeholder="Add Animal Name"
					/>
				</div>
				<div className={`mt-4 mx-3`}>
					<input
						type="email"
						name="email"
						id="email"
						className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
						placeholder="Add Scientific Name"
					/>
				</div>
				<div className={`row-span-2 mt-4 mx-3 grid`}>
					<input
						type="email"
						name="email"
						id="email"
						className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
						placeholder="Add Description"
					/>
				</div>
				<div>

				</div>
				<div className={`grid grid-cols-2 gap-4 mx-5 mt-8`}>
					<button
						type="button"
						className="grid place-items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						CANCEL
					</button>
					<button
						type="button"
						className="grid place-items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						ADD
					</button>
				</div>


			</main>
		</Page>
	)
}

export default AnimalAdd
