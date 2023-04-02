import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function OutsideAuth() {
    const user=useSelector(state=>state.user.value.logged)
  return (
    user ?<Navigate to="/home" />:<Outlet />
  )
}

export default OutsideAuth