import React from 'react';
import Page from "@/components/page";
import {useRouter} from "next/router";

const Add = () => {
	const router = useRouter()

	return (
		<Page>
			<div className={`grid grid-rows-5 h-full `}>
				<div className={`row-span-2 relative`}>
					<img
						className={``}
						src="https://www.oregonblueberry.com/images/demo/960x360-1.jpg" alt=""/>
					<div
						className={`mx-auto w-max text-center bg-white border border-2 border-gray-400 mt-5 p-2`}>
						<p className={` text-4xl font-semibold`}>ADD CONTENT</p>
					</div>


				</div>
				<div
				onClick={async () => {
					await router.push("/locations")
				}}
				className={` bg-white grid grid-cols-12 p-4 border border-gray-300 m-4`}>
					<div className={`col-span-4 `}>
						<img src="https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg"
							 alt="tree"
							 className={` w-full object-cover h-full`}
						/>
					</div>
					<div className={`col-span-7 m-4 font-normal grid place-items-center`}>
						ADD TREE CONTENT
					</div>
				</div>
				<div 
				onClick={async () => {
					await router.push("/trees")
				}}
				className={`bg-white grid grid-cols-12 p-4 border border-gray-300 mx-4 mb-4`}>
					<div className={`col-span-4 `}>
						<img
							src="https://media.istockphoto.com/photos/tropical-beach-in-sri-lanka-picture-id498615566?k=20&m=498615566&s=612x612&w=0&h=ZOBPS4fUtCApIfTCgUVu4Zduh2M95ikn9wG0WhVFHtQ="
							alt="tree"
							className={` w-full object-cover h-full`}
						/>
					</div>
					<div className={`col-span-7 m-4 font-normal grid place-items-center`}>
						ADD LOCATION CONTENT
					</div>
				</div>
				<div
					onClick={async () => {
						await router.push("/animals/add")
					}}
					className={`bg-white grid grid-cols-12 p-4 border border-gray-300 mx-4 mb-4`}>
					<div className={`col-span-4 `}>
						<img
							src="https://cdn.britannica.com/29/150929-050-547070A1/lion-Kenya-Masai-Mara-National-Reserve.jpg"
							alt="tree"
							className={` w-full object-cover h-full`}
						/>
					</div>
					<div className={`col-span-7 m-4 font-normal grid place-items-center`}>
						ADD ANIMAL CONTENT
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Add;
