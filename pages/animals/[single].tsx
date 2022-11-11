import React, {useEffect, useState} from 'react';
import Page from "@/components/page";
import {useRouter} from "next/router";
import {deleteAnimal, getAnimal} from "@/Api/animals";
import {WiStars} from "react-icons/wi";
import {toast} from "react-toastify";
import {checkUser} from "@/Api/auth";

const SingleAnimal = () => {
	const router = useRouter()
	const query = router.query

	const [animal, setAnimal] = useState<any>(null)

	useEffect(() => {
		if (query.single) {
			if (typeof query.single === "string") {
				getSingleAnimal(query.single)
			}
		}
	}, [query]);

	const getSingleAnimal = (id: string) => {
		// fetch single animal
		if (id) {
			getAnimal(id)
				.then(res => {
					setAnimal(res.animal)
				})
		}
	}

	const deleteAnimalHandler = () => {
		deleteAnimal(animal._id)
			.then(async res => {
				toast.success("Animal deleted")
				await router.push("/search")
			})
	}

	const [owner, setOwner] = useState(false)
	const checkOwnerShip = () => {
		if (animal) {
			if (animal.publisherId) {
				checkUser()
					.then(res => {
						if (res.user) {
							if (res.user._id === animal.publisherId) {
								setOwner(true)
							}
						}
					})
			}
		}
	}

	useEffect(() => {
		if (animal) {
			checkOwnerShip()
		}
	}, [animal]);

	const pushToEnhanceViewPage = async () => {
		await router.push({
			pathname: '/enhancements/view',
			query: {
				id: animal._id,
				type : "animal"
			}
		})
	}

	return (
		<Page>
			{animal &&
				<main className={`flex flex-col h-full space-y-6`}>
					<div className={` row-span-3`}>
						<img
							className={`rounded-lg`}
							src={animal.imageUrl}
							alt=""/>

					</div>
					<div className={`mt-4 mx-3`}>
						<p className={`text-lg`}>
							Animal Name
						</p>
						<p>
							{animal.nameInput}
						</p>
					</div>
					<div className={`mt-4 mx-3`}>
						<p className={`text-lg`}>
							Scientific Name
						</p>
						<p>
							{animal.scientificNameInput}
						</p>
					</div>
					<div className={`row-span-2 mt-4 mx-3 grid`}>
						<p className={`text-lg`}>
							Description
						</p>
						<p>
							{animal.descriptionInput}
						</p>
					</div>
					<div className={`grid ${owner ? 'grid-rows-2' : ''}  gap-4 mx-5 mt-8`}>
						<div className={`grid`}>
							<button
								onClick={async () => {
									await router.push('/search')
								}}
								type="button"
								className="grid place-items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
							>
								CANCEL
							</button>
						</div>
						{owner && <div className={`grid grid-cols-2 gap-4`}>
							<button
								onClick={deleteAnimalHandler}
								type="button"
								className="grid place-items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
							>
								DELETE
							</button>
							<button
								onClick={async () => {
									await router.push(`/animals/edit/${animal._id}`)
								}}
								type="button"
								className="grid place-items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							>
								UPDATE
							</button>
						</div>}
					</div>
					<div className={`px-4 w-full`}>
						<button
							onClick={pushToEnhanceViewPage}
							type="button"
							className="w-full flex flex-row items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						>
							Enhancements
							<span>
								<WiStars className={`ml-4 h-5 w-5 scale-150 text-yellow-500`}/>
							</span>
						</button>
					</div>
				</main>}
		</Page>
	);
};

export default SingleAnimal;
