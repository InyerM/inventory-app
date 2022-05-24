import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import LoginForm from '../components/LoginForm'
import AppService from '../services/AppService'

const Login = () => {

  const user = window.localStorage.getItem('loggeduserinformation')
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const user = await AppService.authUser({username, password})
      window.localStorage.setItem('loggeduserinformation', JSON.stringify(user))
    }
    catch(e){}
    finally{
      handleLoad()
    }
  }

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])

  return (
    <div className='content'>
      <div className='body'>
        <div className="login-page">
          <LoginForm handle={handleSubmit}
            setUsername={setUsername} setPassword={setPassword}/>
        </div>
        {
          loading
            ? <Loader/>
            : null
        }
      </div>
    </div>
  )
}

export default Login