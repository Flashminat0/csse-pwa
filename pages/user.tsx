import React, {useEffect, useState} from 'react';
import Page from "@/components/page";
import {checkUser} from "@/Api/auth";
import {useRouter} from "next/router";

const User = () => {
	const [userData, setUserData] = useState({});

	const router = useRouter()

	useEffect(() => {
		checkUser()
			.then((res) => {
				setUserData(res)
			})
			.catch(async (err) => {
				await router.push('/auth')
			})
	}, []);

	const logout = async () => {
		localStorage.removeItem('token')
		await router.push('/auth')
	}

	return (
		<Page>
			<div className={`pt-20 w-full grid place-items-center`}>
				<button
					className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
					onClick={logout}>
					Logout
				</button>
			</div>
		</Page>
	);
};

export default User;
