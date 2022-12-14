import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link rel="manifest" href="/manifest.json"/>
					<link rel="apple-touch-icon" href="/icon-512x512.png"></link>

				</Head>
				<body>
				<Main/>
				<NextScript/>
				</body>
			</Html>
		)
	}
}

export default MyDocument
