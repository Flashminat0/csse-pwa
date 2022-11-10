import React, {useEffect, useState} from 'react';

const Index = () => {

	const [token, setToken] = useState<string | null>('');
	useEffect(() => {
		localStorage.getItem('token') && setToken(localStorage.getItem('token'));
	}, [token]);

	const setTokenHandler = () => {
		localStorage.setItem('token', 'token');
	}

	return (
		<div>
			{JSON.stringify(token)}
			<button onClick={setTokenHandler}>Set Token</button>

		</div>
	);
};

export default Index;
