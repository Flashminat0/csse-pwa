import React, {useState} from 'react';
import Page from "@/components/page";
import {useRouter} from "next/router";
import {addEnhancementCard} from "@/Api/enhancements";
import {toast} from "react-toastify";

const Add = () => {
	const [topic, setTopic] = useState('');
	const [desc, setDesc] = useState('');

	const router = useRouter()
	const {id, type} = router.query

	const handleSubmit = () => {

		if (typeof id === "string" && typeof type === "string") {
			addEnhancementCard(type, id, topic, desc)
				.then(async (res) => {
					toast.success("Enhancement card added successfully")
					await router.push({
						pathname: '/enhancements/view',
						query: {
							id: id,
							type: type
						}
					})
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	return (
		<Page>
			<main className={`grid grid-rows-6 h-full`}>
				<p className={`text-4xl mx-auto font-semibold`}>ADD ENHANCEMENT</p>
				<div className={`mt-4 mx-3`}>
					<input
						type="text"
						placeholder="Topic"
						className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
						onChange={(e) => setTopic(e.target.value)}
						value={topic}
					/>
				</div>
				<div className={`row-span-2 mt-4 mx-3 grid`}>
					<textarea
						className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
						placeholder="Add Description"
						onChange={(e) => setDesc(e.target.value)}
						value={desc}
					/>
				</div>
				<div className={`grid grid-cols-2 gap-4 mx-5 mt-8`}>
					<button
						onClick={async () => {
							await router.push({
								pathname: '/enhancements/view',
								query: {
									id: id,
									type: type
								}
							})
						}}
						type="button"
						className="grid place-items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						CANCEL
					</button>
					<button
						onClick={handleSubmit}
						type="button"
						className="grid place-items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						ADD ENHANCEMENT
					</button>
				</div>


			</main>

		</Page>
	);
};

export default Add;
