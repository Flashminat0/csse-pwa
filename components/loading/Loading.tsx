import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { LoadingOverlay } from '@mantine/core'
import { loading } from '../../store/storeInitializer'

const Loading = () => {
	const [visible, setVisible] = useState<boolean>(true)
	useEffect(() => {
		setVisible(loading.loading)
	}, [loading.loading])

	return (
		<div>
			<LoadingOverlay visible={visible} overlayBlur={2} />
		</div>
	)
}

export default observer(Loading)
