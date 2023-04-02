import React,{useEffect} from 'react'
import Layout from '../component/Layout'
import Axios from '../axosConfig'
import { useDispatch } from 'react-redux'
import { logout } from '../ReduxStore'
import { useNavigate } from 'react-router-dom'

function Home() {
 const navigate=useNavigate()
  const fetch= async() => {
    try {
      await Axios.post('/verify')
    } catch (err) {
      dispatch(logout())
      navigate('/login')
    }
  }

 const dispatch=useDispatch()
  useEffect(() => {
    fetch()
  },[])

  return (
    <Layout/>
  )
}

export default Home