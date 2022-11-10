import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {awaitExpression} from "@babel/types";

const Index = () => {
	const router = useRouter()

	const [token, setToken] = useState<string | null>('');
	const [locationLoaded, setLocationLoaded] = useState(false);

	useEffect(() => {
		setToken(localStorage.getItem('token'));
		setLocationLoaded(true);
	}, [router.pathname])

	useEffect(() => {
		const kickToAuthPage = async () => {
			await router.push('/auth');
		}

		if (!token && locationLoaded) {
			kickToAuthPage();
		}

	}, [token]);

	return (
		<div>
			{token}
			<button
				className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
				onClick={() => localStorage.removeItem('token')}>Remove Token
			</button>

		</div>
	);
};

export default Index;
