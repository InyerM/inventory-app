import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const LoginForm = ({ handle, setUsername, setPassword}) => {

  const [classNameEyeIcon, setClassNameEyeIcon] = useState('uil uil-eye showHidePw')
  const [inputTypePassword, setInputTypePassword] = useState('password')

  const handleEye = () => {
    if (inputTypePassword === 'password'){
      setClassNameEyeIcon('uil uil-eye-slash showHidePw')
      setInputTypePassword('text')
    }
    else{
      setClassNameEyeIcon('uil uil-eye showHidePw')
      setInputTypePassword('password')
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    if (value !== null){
      e.target.name === 'username' ? setUsername(value) : setPassword(value)
    }
  }

  return (
    <div className='forms'>
      <div className='form login'>
        <span className="title">Login</span>

        <form onSubmit={handle}>
            <div className="input-field">
                <input type="text" placeholder="Enter your username" required name="username" onChange={handleChange}/>
                <i className="uil uil-user"></i>
            </div>
            <div className="input-field">
                <input type={inputTypePassword} className="password" placeholder="Enter your password" required name='password' onChange={handleChange}/>
                <i className="uil uil-lock icon"></i>
                <i className={classNameEyeIcon} onClick={handleEye}></i>
            </div>

            <div className="input-field button">
                <input type="submit" value="Login"/>
            </div>
        </form>

        <div className="login-signup">
            <span className="text">Not a member? ·
                <Link to='/register' className="text signup-link"> Signup now</Link>
            </span>
        </div>
      </div>
    </div>
  )
}

export default LoginForm