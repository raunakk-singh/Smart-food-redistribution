import { createContext, useContext, useState, useEffect } from 'react'
import { login, register } from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // Decode JWT to get user
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser(payload)
      } catch {}
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    })
  }, [])

  const loginUser = async (email, password) => {
    try {
      const { data } = await login({ email, password })
      localStorage.setItem('token', data.token)
      setUser(data.user)
      return data
    } catch (err) {
      throw err.response.data
    }
  }

  const registerUser = async (data) => {
    try {
      const { data: res } = await register(data)
      localStorage.setItem('token', res.token)
      setUser(res.user)
      return res
    } catch (err) {
      throw err.response.data
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = {
    user,
    loading,
    loginUser,
    registerUser,
    logout,
    location
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be within AuthProvider')
  return context
}

