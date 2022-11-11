import Page from '@/components/page'
import ITree from '@/interfaces/trees/ITrees'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { treeStore } from '../../store/storeInitializer'

const View = () => {
	const router = useRouter()
	const [trees, setTrees] = useState<ITree[]>()
	const [fetch, setFetch] = useState(false)

	useEffect(() => {
		if (!treeStore.myTrees && !fetch) {
			treeStore.userPosts()
			setFetch(true)
		}
		if (treeStore.myTrees) {
			setTrees(treeStore.myTrees)
		}
	}, [treeStore.myTrees])

	const selectOne = async (id: string) => {
		await router.push({
			pathname: '/trees/edit',
			query: { id: id },
		})
	}

	return (
		<Page title='My Posts'>
			<div className='h-full w-full'>
				<div className='space-y-5 rounded-lg'>
					{trees?.map((tree: ITree, idx: any) => (
						<div className='space-y-5 rounded-lg bg-gray-100 p-3' key={idx}>
							<section
								className='flex'
								onClick={() => {
									selectOne(tree._id)
								}}
							>
								<div className='w-2/3'>
									<img src={tree.image} />
								</div>
								<div className='w-1/3 text-center'>
									<p className='text-xl font-bold'>{tree.name}</p>
									<p className='text-lg'>{tree.scientificname}</p>
								</div>
							</section>
							<section className='flex justify-between px-2'>
								<div className='grid w-full grid-cols-3 gap-6'>
									{tree.tags.map((tag: string, idx: any) => (
										<div
											key={idx}
											className='grid  h-8 w-20 scale-125 place-items-center rounded-full bg-gradient-to-b from-green-300 to-blue-400 text-center'
										>
											{tag}
										</div>
									))}
								</div>
							</section>
							<section className='h-52 bg-blue-100'>
								<p className='p-2'>{tree.description}</p>
							</section>
						</div>
					))}
				</div>
				<div className='sticky bottom-0 z-10 space-y-3 bg-gray-50 px-3 py-2'>
					<div className='flex space-x-5'>
						<button
							onClick={() => {
								router.push('/trees/view')
							}}
							type='button'
							className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
							onClick={() => {
								router.push('/trees')
							}}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</Page>
	)
}

export default observer(View)
