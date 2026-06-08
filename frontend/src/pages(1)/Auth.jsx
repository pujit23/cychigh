import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      let result
      if (isLogin) {
        result = await login(
          formData.email, 
          formData.password
        )
      } else {
        if (!formData.username) {
          toast.error('Username required')
          setLoading(false)
          return
        }
        result = await register(
          formData.username,
          formData.email,
          formData.password
        )
      }
      if (result?.success) {
        navigate('/')
      }
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '400px',
        background: '#0C0C0C',
        border: '1px solid #1F1F1F',
        padding: '48px',
      }}>
        <div style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '48px',
          color: '#FFD700',
          letterSpacing: '4px',
          marginBottom: '32px',
        }}>
          {isLogin ? 'LOGIN' : 'REGISTER'}
        </div>

        {!isLogin && (
          <input
            placeholder="Username"
            value={formData.username}
            onChange={e => setFormData({
              ...formData, username: e.target.value
            })}
            style={{
              width: '100%', height: '44px',
              background: '#050505',
              border: '1px solid #1F1F1F',
              color: '#AAAAAA',
              padding: '0 16px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              marginBottom: '12px',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        )}

        <input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={e => setFormData({
            ...formData, email: e.target.value
          })}
          style={{
            width: '100%', height: '44px',
            background: '#050505',
            border: '1px solid #1F1F1F',
            color: '#AAAAAA',
            padding: '0 16px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            marginBottom: '12px',
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={e => setFormData({
            ...formData, password: e.target.value
          })}
          style={{
            width: '100%', height: '44px',
            background: '#050505',
            border: '1px solid #1F1F1F',
            color: '#AAAAAA',
            padding: '0 16px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            marginBottom: '24px',
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%', height: '44px',
            background: loading ? '#997F00' : '#FFD700',
            color: '#000',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '18px',
            letterSpacing: '4px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '16px',
          }}
        >
          {loading ? 'LOADING...'
            : isLogin ? 'LOGIN' : 'REGISTER'}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: '#444',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  )
}

export default Auth
