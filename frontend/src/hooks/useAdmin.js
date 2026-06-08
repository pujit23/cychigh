import { useAuth } from '../context/AuthContext'

const useAdmin = () => {
  const { user, logout } = useAuth()
  const isAuthenticated = !!user
  
  return {
    isAuthenticated,
    user,
    logout
  }
}

export default useAdmin
