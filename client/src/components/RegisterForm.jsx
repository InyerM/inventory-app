import React, { useState } from 'react'

const RegisterForm = ({setname, setlastname, setphone, setusername, setrole, setpassword, setconfirmedPassword, handle}) => {
  
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

  return (
    <div className='forms'>
      <div className='form register'>
        <span className="title">Sign up</span>
        <form onSubmit={handle}>
          <div className="row d-flex">
            <div className='col'>
              <div className="input-field">
                <input type="text" placeholder="Enter your names" required name="names" onChange={(e) => {
                  setname(e.target.value)
                }}/>
                <i className="uil uil-user-square"></i>
              </div>
            </div>
            <div className="col">
              <div className="input-field">
                <input type="text" placeholder="Enter your lastnames" required name="lastnames" onChange={(e) => {
                  setlastname(e.target.value)
                }}/>
                <i className="uil uil-book"></i>
              </div>
            </div>
            <div className="col">
              <div className="input-field">
                <input type="text" placeholder="Enter your phone" required name="phone" onChange={(e) => {
                  setphone(e.target.value)
                }}/>
                <i className="uil uil-phone"></i>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-field">
                <select required name="role" defaultValue={'default'} onChange={(e) => {
                  setrole(e.target.value)
                }}>
                  <option disabled value={'default'}>Select a role...</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <i className="uil uil-user-md"></i>
              </div>
            </div>
            <div className="col">
              <div className="input-field">
                <input type="text" placeholder="Enter your username" required name="username" onChange={(e) => {
                  setusername(e.target.value)
                }}/>
                <i className="uil uil-at"></i>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-field">
                <input type={inputTypePassword} className="password" placeholder="Enter your password" required name='password' onChange={(e) => {
                  setpassword(e.target.value)
                }}/>
                <i className="uil uil-lock icon"></i>
                <i onClick={handleEye} className={classNameEyeIcon}></i>
              </div>
            </div>
            <div className="col">
              <div className="input-field">
                <input type={inputTypePassword} className="password" placeholder="Confirm your password" required name='confirmedPassword' onChange={(e) => {
                  setconfirmedPassword(e.target.value)
                }}/>
                <i className="uil uil-lock icon"></i>
                <i onClick={handleEye} className={classNameEyeIcon}></i>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-4">
              <div className="input-field button">
                <input type="submit" value="Sign up"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm