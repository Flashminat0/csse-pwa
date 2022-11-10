import React, {useEffect, useState} from 'react';
import Page from "@/components/page";
import {useRouter} from "next/router";
import {getAnimal} from "@/Api/animals";

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

	return (
		<Page>
			{animal && <main className={`flex flex-col h-full space-y-6`}>
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
					<p>
						Scientific Name
					</p>
					<p>
						{animal.scientificNameInput}
					</p>
				</div>
				<div className={`row-span-2 mt-4 mx-3 grid`}>
					<p>
						Description
					</p>
					<p>
						{animal.descriptionInput}
					</p>
				</div>
				<div className={`grid grid-rows-2  gap-4 mx-5 mt-8`}>
					<div className={`grid`}>
						<button
							type="button"
							className="grid place-items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
						>
							DELETE
						</button>
					</div>
					<div className={`grid grid-cols-2 gap-4`}>
						<button
							onClick={async () => {
								await router.push('/search')
							}}
							type="button"
							className="grid place-items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						>
							CANCEL
						</button>
						<button
							type="button"
							className="grid place-items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						>
							UPDATE
						</button>
					</div>

				</div>


			</main>}
		</Page>
	);
};

export default SingleAnimal;
