import { useEffect } from 'react'
import { useRouter } from 'next/router'

function FacilitacaoIndex() {
  const router = useRouter()

  useEffect(() => {
    router.push('facilitacao/users')
  }, [router])
  return <></>
}

export default FacilitacaoIndex
