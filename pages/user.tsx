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

	return (
		<Page>
			<div className={`pt-20`}>
				{JSON.stringify(userData)}
			</div>
		</Page>
	);
};

export default User;
