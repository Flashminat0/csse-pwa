import React, {useEffect, useState} from 'react';
import Page from "@/components/page";
import {HiSearch} from "react-icons/hi";
import {searchEntities} from "@/Api/search";
import {useRouter} from "next/router";

const Search = () => {
	const router = useRouter()

	const [entityList, setEntityList] = useState<any[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const fetchAll = async () => {
		searchEntities("")
			.then(res => {
				const animals = res.animalResults.map((animal: any) => {
					return {
						...animal,
						type: "animal"
					}
				})

				const trees = res.treeResults.map((plant: any) => {
					return {
						...plant,
						type: "tree"
					}
				})

				const locations = res.LocationResults.map((location: any) => {
					return {
						...location,
						type: "location"
					}
				})

				const all = [...animals, ...trees, ...locations]


				setEntityList(all)
			})
	}

	useEffect(() => {
		if (searchInput === "") {
			fetchAll()
		}
	}, [searchInput]);


	const search = async () => {
		searchEntities(searchInput)
			.then(res => {
				setEntityList(res.animalResults)
			})
	}

	const onClickSingleEntity = async (entity: any) => {
		if (entity.type === "animal") {
			await router.push(`/animals/${entity._id}`)
		}
		if (entity.type === "tree") {
			await router.push(`/trees/onetree?id=${entity._id}`)
		}
		if (entity.type === "location") {
			await router.push(`/locations/onelocation?id=${entity._id}`)
		}
	}

	return (
		<Page>
			<div className={`grid grid-rows-12`}>
				<div className={`p-5`}>
					<p className={`text-3xl font-semibold`}>Search</p>
				</div>
				<div className={`grid grid-cols-6 px-5`}>
					<div className={`col-span-5`}>
						<input
							value={searchInput}
							onChange={e => setSearchInput(e.target.value)}
							type={`text`}
							id="search"
							className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
							placeholder="Search"
						/>
					</div>
					<div
						onClick={search}
						className={`grid place-items-center`}>
						<HiSearch className={`scale-150`}/>
					</div>
				</div>
				<div className={`p-5 `}>
					<div className={`text-xl font-semibold`}>ALL RESULTS</div>
					<div className={`grid grid-cols-3 gap-5 mt-5`}>
						{entityList.map((singleEntity, index) => (
							<div
								onClick={() => onClickSingleEntity(singleEntity)}
								key={index}
								className={`grid grid-rows-2 object-contain overflow-hidden border-2 border-gray-300 rounded-md`}
							>
								<div className={`row-span-2 scale-125`}>
									<img src={singleEntity.imageUrl} alt=""/>
								</div>
							</div>
						))}
					</div>
				</div>

			</div>
		</Page>
	);
};

export default Search;
