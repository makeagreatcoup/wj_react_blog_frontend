import { useEffect, useState } from 'react'
import globalStore from '@/store/common/global'

export function useLoading() {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const load=globalStore.subscribe((state) => setLoading(state.loading))
		return () => {
			load()
		}
	}, [])

	return {
		loading
	}
}
