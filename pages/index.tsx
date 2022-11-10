import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Page from "@/components/page";

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
		<Page>
			{token && "Token present"}
			<button
				className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
				onClick={() => localStorage.removeItem('token')}>Remove Token
			</button>
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-4xl font-bold text-center">Welcome to Earth Index</h1>
				<p className="text-center">Please login to continue</p>
			</div>
		</Page>
	);
};

export default Index;
