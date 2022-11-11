import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Page from "@/components/page";
import {getTrophies} from "@/Api/trophies";

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


	const [trophies, setTrophies] = useState<any[]>([])
	useEffect(() => {
		getTrophies()
			.then(res => {
				setTrophies(res)
			})
	},[])

	return (
		<Page>
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-4xl font-bold text-center text-green-500">Welcome to Earth Index</h1>
				<h1 className="text-4xl font-bold text-center mt-7	">Leaderboard</h1>
			</div>
			<div className='px-4 sm:px-6 lg:px-8'>

				<div className='mt-8 flex flex-col'>
					<div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
						<div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
							<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
								<table className='min-w-full divide-y divide-gray-300'>
									<thead className='bg-gray-50'>
									<tr>
										<th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
											Place
										</th>
										<th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
											District
										</th>
										<th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
											Trophy count
										</th>

									</tr>
									</thead>
									<tbody className='divide-y divide-gray-200 bg-white'>
									{trophies.map((district, index) => (
										<tr key={index}>
											<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
												{index + 1}
											</td>
											<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{district.district}</td>
											<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{district.trophyCount}</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Index;
