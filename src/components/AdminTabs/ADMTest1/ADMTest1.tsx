import React, { useEffect, useState } from 'react'
import api from '../../../services/api'

// import { Container } from './styles';

function ADMTest1() {
  const [data, setData] = useState({ username: 'luan' })

  useEffect(() => {
    api.get(`users/me`).then(response => {
      setData(response.data)
      // console.log(response.data)
    })
  }, [setData])

  return <div>{data.username}</div>
}

export default ADMTest1
