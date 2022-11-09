import React, { useState } from "react"


interface specificInfoAnimalProps {
	avgMaleWeightInput: string
	setAvgMaleWeightInput: (value: string) => void
	avgFemaleWeightInput: string
	setAvgFemaleWeightInput: (value: string) => void
	avgMaleHeightInput: string
	setAvgMaleHeightInput: (value: string) => void
	avgFemaleHeightInput: string
	setAvgFemaleHeightInput: (value: string) => void
	kingdomOfAnimal: string
	setKingdomOfAnimal: (value: string) => void
	phylumOfAnimal: string
	setPhylumOfAnimal: (value: string) => void
	classOfAnimal: string
	setClassOfAnimal: (value: string) => void
	orderOfAnimal: string
	setOrderOfAnimal: (value: string) => void
	familyOfAnimal: string
	setFamilyOfAnimal: (value: string) => void
	genusOfAnimal: string
	setGenusOfAnimal: (value: string) => void
	speciesOfAnimal: string
	setSpeciesOfAnimal: (value: string) => void

}

const SpecificInfoAnimal = ({
															avgMaleWeightInput, setAvgMaleWeightInput,
															avgFemaleWeightInput, setAvgFemaleWeightInput,
															avgMaleHeightInput, setAvgMaleHeightInput,
															avgFemaleHeightInput, setAvgFemaleHeightInput,
															kingdomOfAnimal, setKingdomOfAnimal,
															phylumOfAnimal, setPhylumOfAnimal,
															classOfAnimal, setClassOfAnimal,
															orderOfAnimal, setOrderOfAnimal,
															familyOfAnimal, setFamilyOfAnimal,
															genusOfAnimal, setGenusOfAnimal,
															speciesOfAnimal, setSpeciesOfAnimal,
														}: specificInfoAnimalProps) => {


	return (
		<div>
			<h2 className="text-lg font-bold text-gray-800 capitalize">Specific Information:</h2>
			<div className="mt-4">
				<h4 className="pt-4 pb-3 text-lg font-bold text-blue-400 underline underline-offset-2 capitalize">Weight</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="average-male-weight" className="text-sm font-semibold text-gray-800 capitalize">Average
							Weight of an male adult:</label>
						<input onChange={(e) => {
							setAvgMaleWeightInput(e.target.value)
						}} type="text" value={avgMaleWeightInput} name="average-male-weight" id="average-male-weight"
									 className="px-4 py-2 w-full md:max-w-max text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g: 190kg" />
					</div>
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="average-female-weight" className="text-sm font-semibold text-gray-800 capitalize">Average
							Weight of an female adult:</label>
						<input onChange={(e) => {
							setAvgFemaleWeightInput(e.target.value)
						}} type="text" value={avgFemaleWeightInput} name="average-female-weight" id="average-female-weight"
									 className="px-4 py-2 w-full md:max-w-max text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g: 130kg" />
					</div>
				</div>
			</div>
			<div className="mt-4">
				<h4 className="pt-4 pb-3 text-lg font-bold text-blue-400 underline underline-offset-2 capitalize">Height</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="average-male-height" className="text-sm font-semibold text-gray-800 capitalize">Average
							Height of an male adult:</label>
						<input onChange={(e) => {
							setAvgMaleHeightInput(e.target.value)
						}} type="text" value={avgMaleHeightInput} name="average-male-height" id="average-male-height"
									 className="px-4 py-2 w-full md:max-w-max text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g: 1.2m" />
					</div>
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="average-female-height" className="text-sm font-semibold text-gray-800 capitalize">Average
							Height of an female adult:</label>
						<input onChange={(e) => {
							setAvgFemaleHeightInput(e.target.value)
						}} type="text" value={avgFemaleHeightInput} name="average-female-height" id="average-female-height"
									 className="px-4 py-2 w-full md:max-w-max text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g: 90cm" />
					</div>
				</div>
			</div>
			<div className="mt-4">
				<h4
					className="pt-4 pb-3 text-lg font-bold text-blue-400 underline underline-offset-2 capitalize">Classifications</h4>
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="kingdom-of-animal"
									 className="text-sm font-semibold text-gray-800 capitalize">Kingdom:</label>
						<input onChange={(e) => {
							setKingdomOfAnimal(e.target.value)
						}} type="text" value={kingdomOfAnimal} name="kingdom-of-animal" id="kingdom-of-animal"
									 className="px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g:  Animalia (animals)" />
					</div>
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="phylum-of-animal" className="text-sm font-semibold text-gray-800 capitalize">Phylum:</label>
						<input onChange={(e) => {
							setPhylumOfAnimal(e.target.value)
						}} type="text" value={phylumOfAnimal} name="phylum-of-animal" id="phylum-of-animal"
									 className="px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g:  Chordata (vertebrate animals)" />
					</div>
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="class-of-animal" className="text-sm font-semibold text-gray-800 capitalize">Class:</label>
						<input onChange={(e) => {
							setClassOfAnimal(e.target.value)
						}} type="text" value={classOfAnimal} name="class-of-animal" id="class-of-animal"
									 className="px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g:  Mammalia (mammals)" />
					</div>
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="order-of-animal" className="text-sm font-semibold text-gray-800 capitalize">Order:</label>
						<input onChange={(e) => {
							setOrderOfAnimal(e.target.value)
						}} type="text" value={orderOfAnimal} name="order-of-animal" id="order-of-animal"
									 className="px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g:   Carnivora (meat eaters)" />
					</div>
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="family-of-animal" className="text-sm font-semibold text-gray-800 capitalize">Family:</label>
						<input onChange={(e) => {
							setFamilyOfAnimal(e.target.value)
						}} type="text" value={familyOfAnimal} name="family-of-animal" id="family-of-animal"
									 className="px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g:  Felidae (all cats)" />
					</div>
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="genus-of-animal" className="text-sm font-semibold text-gray-800 capitalize">Genus:</label>
						<input onChange={(e) => {
							setGenusOfAnimal(e.target.value)
						}} type="text" value={genusOfAnimal} name="genus-of-animal" id="genus-of-animal"
									 className="px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g:  Panthera (great cats)" />
					</div>
					<div className="flex flex-col gap-1.5 md:flex-row items-center md:gap-4">
						<label htmlFor="species-of-animal"
									 className="text-sm font-semibold text-gray-800 capitalize">Species:</label>
						<input onChange={(e) => {
							setSpeciesOfAnimal(e.target.value)
						}} type="text" value={speciesOfAnimal} name="species-of-animal" id="species-of-animal"
									 className="px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300"
									 placeholder="E.g: leo (lions)" />
					</div>

				</div>
			</div>

		</div>
	)
}

export default SpecificInfoAnimal
