import type { AppProps } from 'next/app'
import '@/styles/globals.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import Loading from '@/components/loading/Loading'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<Loading />
			<Component {...pageProps} />
			<ToastContainer position={`bottom-center`} />
		</Provider>
	)
}

export default App
