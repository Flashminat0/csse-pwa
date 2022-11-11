import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Page from "@/components/page";
import {getAnimal} from "@/Api/animals";
import {getOneTree} from "@/Api/tree";
import {getOneLocation} from "@/Api/location";
import {getEnhancementCard, reportCard} from "@/Api/enhancements";
import {checkUser} from "@/Api/auth";
import {AiFillWarning} from "react-icons/ai";
import {toast} from "react-toastify";

const View = () => {
	const router = useRouter()
	const {id, type} = router.query

	const [animal, setAnimal] = useState<any>();
	const [tree, setTree] = useState();
	const [location, setLocation] = useState();

	const [enhancementCardIds, setEnhancementCardIds] = useState([]);

	const fetchAnimal = () => {
		if (id && typeof id === "string") {
			getAnimal(id)
				.then((res) => {
					setAnimal(res.animal)
					setEnhancementCardIds(res.animal.enhancementCardIds)
				})
		}
	}

	const fetchTree = () => {
		if (id && typeof id === "string") {
			getOneTree(id)
				.then((res) => {
					console.log(res)
				})

		}
	}

	const fetchLocation = () => {
		if (id && typeof id === "string") {
			getOneLocation(id)
				.then((res) => {
					console.log(res)
				})
		}
	}

	useEffect(() => {
		if (type) {
			if (type === "animal") {
				fetchAnimal()
			}
			if (type === "tree") {
				fetchTree()
			}
			if (type === "location") {
				fetchLocation()
			}
		}
	}, [type]);

	const [enhancements, setEnhancements] = useState<any[]>([]);

	const fetchEnhancements = () => {
		const enhancementCards = enhancementCardIds.map((singleId) => {
			return new Promise((resolve, reject) => {
				getEnhancementCard(singleId)
					.then((res) => {
						resolve(res.enhancementCard)
					})
			})
		})

		Promise.all(enhancementCards)
			.then((res) => {
				if (res && res.length > 0) {
					setEnhancements(res)
				}
			})

	}

	useEffect(() => {
		if (enhancementCardIds && enhancementCardIds.length > 0) {
			fetchEnhancements()
		}
	}, [enhancementCardIds])


	const [userId, setUserId] = useState("");
	const checkOwnerShip = () => {
		if (animal) {
			if (animal.publisherId) {
				checkUser()
					.then(res => {
						if (res.user) {
							if (res.user._id) {
								setUserId(res.user._id)
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

	const reportEnhancement = (id: string) => {
		reportCard(id)
			.then((res) => {
				toast.success("Enhancement reported")
			})
			.catch((err) => {
				toast.error("Error reporting enhancement")
			})
	}

	return (
		<Page>
			{animal && <main className={`grid grid-rows-3 h-full`}>
				<div className={`p-1 row-span-1 grid grid-cols-12`}>
					<img
						src={animal && animal["imageUrl"]}
						alt=""
						className={`col-span-8 rounded-md`}
					/>
					<div
						className={`col-span-4 p-2`}
					>
						<p className={`text-4xl`}>{animal && animal["nameInput"]}</p>
						<p>{animal && animal["scientificNameInput"]}</p>
					</div>

				</div>


				<div className={`row-span-2 text-center grid place-items-center relative mt-5`}>
					{enhancements.map((Enhancement, index) => (
						<div
							key={index}
							className={`px-4 py-2 m-2 border border-gray-300 rounded-md w-max h-max bg-gray-200 flex flex-row`}
						>
							<div>
								<p className={`text-lg font-semibold`}>{Enhancement.topic}</p>
								<p className={`col-span-2`}>{Enhancement.description}</p>

							</div>

							{Enhancement.userId === userId &&
								<div
									onClick={() => reportEnhancement(Enhancement._id)}
									className={`justify-center items-center bg-yellow-100 h-full ml-4 p-2 rounded-full`}>
									<p className={`text-yellow-500`}>
										<AiFillWarning/>
									</p>
								</div>
							}
						</div>),
					)}
					<div>
						<button
							onClick={() => router.push({
								pathname: "/enhancements/add",
								query: {
									id: id,
									type: type
								}
							})}
							type="button"
							className="grid place-items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						>
							ADD ENHANCEMENT
						</button>
					</div>
				</div>

			</main>}
		</Page>
	);
};

export default View;
