import React from "react"
import {AiOutlineHome, AiOutlineLike, AiOutlinePlus, AiOutlineSearch, AiOutlineUser} from "react-icons/ai"
import {useRouter} from "next/router"

const BottomNav = () => {

	const router = useRouter()

	return (
		<div className={`bg-white border rounded-t-md fixed bottom-0 left-0 w-screen h-16 flex justify-around items-center border-gray-300`}>
			<div
				onClick={async () => {
					await router.push("/")
				}}
				className={`h-8 flex items-center`}>
				<AiOutlineHome className={`h-5 w-5 font-bold scale-125`} />
			</div>
			<div
				onClick={async () => {
					await router.push("/search")
				}}
				className={`h-8 flex items-center`}>
				<AiOutlineSearch className={`h-5 w-5 font-bold scale-125`} />
			</div>
			<div
				onClick={async () => {
					await router.push("/add")
				}}
				className={`h-8  bg-gradient-to-b from-green-300 to-blue-400 w-20 rounded-full text-center grid place-items-center scale-125`}>
				<AiOutlinePlus className={`h-5 w-5 font-bold scale-125 text-white`} />
			</div>
			<div className={`h-8 flex items-center`}>
				<AiOutlineLike className={`h-5 w-5 font-bold scale-125`} />
			</div>
			<div
				onClick={async () => {
					await router.push("/user")
				}}
				className={`h-8 flex items-center`}>
				<AiOutlineUser className={`h-5 w-5 font-bold scale-125`} />
			</div>
		</div>
	)
}

export default BottomNav
