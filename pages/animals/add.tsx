import Page from "@/components/page"
import {BiUpload} from "react-icons/bi"
import {useRouter} from "next/router"

import {Dropzone} from "@mantine/dropzone";
import React, {useState} from "react"
import {uploadFile} from "@/Api/files"
import {addAnimal} from "@/Api/Animals"
import {toast} from "react-toastify"
import SpecificInfoAnimal from "@/components/animals/SpecificInfoAnimal"


const AnimalAdd = () => {
	const router = useRouter()

	const [imageArray, setImageArray] = useState([])
	const [imageObjArray, setImageObjArray] = useState([])

	const [image, setImage] = useState(undefined)
	const [imageObj, setImageObj] = useState(undefined)

	const [nameInput, setNameInput] = useState("")
	const [scientificNameInput, setScientificNameInput] = useState("")
	const [typing, setTyping] = useState("")
	const [descriptionInput, setDescriptionInput] = useState("")


	const handleImageUpload = async () => {


		return
	}


	const handleImageRemoval = (e: any) => {
		setImage(undefined)
		setImageObj(undefined)
	}


	const handleSubmitAnimal = async () => {
		if (nameInput === "" || scientificNameInput === "" || descriptionInput === "") {
			toast.error("Please fill all fields")
			return
		}

		if (!image) {
			toast.error("Please Select an image")
			return
		}


		await uploadFile(image, "animals")
			.then((imageUrl) => {
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
			})
	}


	return (
		<Page title={`Add Animal`}>
			<main className={`grid grid-rows-6 h-full`}>
				<div className={`bg-gray-400 row-span-3`}>
					<div className={`grid place-items-center p-4`}>
						<p className={`text-3xl font-semibold mb-2`}>Upload Your Images</p>
						<p>PNG JPG and GIF files are allowed</p>
					</div>
					<div
						className={`h-56 grid place-items-center bg-gray-200 mb-3 border-2 border-gray-600 border-dashed`}>
						<BiUpload className={`h-32 w-32 text-gray-600`}/>
						<p>Drag and drop or browse to choose file</p>
					</div>
				</div>
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
