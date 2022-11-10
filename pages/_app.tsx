import type {AppProps} from 'next/app'
import '@/styles/globals.css'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from 'react-redux'
import {store} from '@/store/store'

const App = ({Component, pageProps}: AppProps) => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<ToastContainer/>
		</Provider>
	)
}

export default App
