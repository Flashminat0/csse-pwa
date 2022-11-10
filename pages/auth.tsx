import React, {useEffect, useState} from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {FirebaseApp} from '@/services/firebase'
import {authUser} from '@/Api/auth'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {login, logout} from '@/store/auth/authSlice'
import {useRouter} from 'next/router'
import {FcGoogle} from 'react-icons/fc'

const Auth = () => {
	const router = useRouter()


	const auth = getAuth(FirebaseApp)
	const provider = new GoogleAuthProvider()


	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(logout())
		localStorage.removeItem('token')
	}, [router.pathname])


	const [district, setDistrict] = useState('Colombo')
	const handleLoginBtnClick = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				return result.user

			})
			.then((user) => {
				if (user.displayName === null || user.email === null || user.photoURL === null || district === null) {
					toast.error('Please fill all fields')
					return
				}

				authUser(user.displayName, user.email, user.photoURL, district)
					.then(res => {
						dispatch(login(res))
						res.token && localStorage.setItem('token', res.token)


						toast.success('Login successful')
					})
					.then(async () => {
						await router.push('/')
					})
					.catch(err => {
						console.log(err)
					})
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				// The email of the user's account used.
				const email = error.customData.email
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error)

				toast.error(errorMessage)
				// ...
			})
	}

	return (
		<div>
			<div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<img
						className='mx-auto h-12 w-auto'
						src='https://firebasestorage.googleapis.com/v0/b/y3s2-spm.appspot.com/o/Colorful%20Vibrant%20Tree%20Logo%20Template.png?alt=media&token=a011e776-322c-4fc5-b804-cf66f3fe2ec8'
						alt='Workflow'
					/>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
				</div>

				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div
						className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 grid place-items-center grid-rows-1'>
						<div className={`w-full mx-20 my-5`}>
							<label htmlFor='location' className='block text-sm font-medium text-gray-700'>
								Select District
							</label>
							<select
								value={district}
								onChange={(e) => setDistrict(e.target.value)}
								id='location'
								name='location'
								className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
							>
								<option>Colombo</option>
								<option>Puttlam</option>
								<option>Dakunu Rata</option>
							</select>
						</div>

						<div className='space-y-6'>
							<button
								onClick={handleLoginBtnClick}
								type='button'
								className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<FcGoogle className={`h-8 w-8 mr-10`}/>
								Login with Google
							</button>

						</div>
					</div>
				</div>
			</div>

		</div>
	)
};

export default Auth;
