import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function InsideAuth() {
    const user=useSelector(state=>state.user.value.logged)
  return (
    user ? <Outlet />:<Navigate to="/login" />
  )
}

export default InsideAuth