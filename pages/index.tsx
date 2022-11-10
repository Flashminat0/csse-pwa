import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";

const Index = () => {

	const [token, setToken] = useState<string | null>('');
	useEffect(() => {
		localStorage.removeItem('token');
	}, []);


	const setTokenHandler = () => {
		localStorage.setItem('token', token + 'token');
	}

	useEffect(() => {
		toast.success('Token set');
	}, [token]);

	return (
		<div>
			{token}
			<button
				className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
				onClick={setTokenHandler}>Set Token
			</button>
			<button
				className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
				onClick={() => setToken(localStorage.getItem('token'))}>Set Token on State
			</button>

		</div>
	);
};

export default Index;
