import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Modal from "../components/chakra/Modal";
import AppService from "../services/AppService";
import RegisterForm from "../components/RegisterForm";

const usersUrl = 'http://localhost:3001/api/users'

const Register = () => {

  const user = window.localStorage.getItem("loggeduserinformation");
  const navigate = useNavigate();

  const modalRef = useRef()

  const [loading, setLoading] = useState(false);
  const [names, setname] = useState();
  const [lastnames, setlastname] = useState();
  const [phone, setphone] = useState();
  const [username, setusername] = useState();
  const [role, setrole] = useState();
  const [password, setpassword] = useState();
  const [title, settitle] = useState();
  const [content, setcontent] = useState();
  const [confirmedPassword, setconfirmedPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password === confirmedPassword) { 
      try{
        await AppService.createNew({ names, lastnames, phone, username, role, password}, usersUrl)
        setcontent(<p>You have successfully signed up to InventoryApp</p>)
        settitle('Signed up')
      }catch(e){
        setcontent(<p>There was an internal error, try again</p>)
        settitle('Signed up error')
      }
    }
    else {
      setcontent(<p>There was an error, probably you have entered wrong passwords</p>)
      settitle('Sign up error')
    }
    handleLoad()
    modalRef.current()
  };

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="content">
      <div className="body">
        <div className="signup-page">
          <RegisterForm
            setname={setname}
            setlastname={setlastname}
            setphone={setphone}
            setusername={setusername}
            setrole={setrole}
            setpassword={setpassword}
            setconfirmedPassword={setconfirmedPassword}
            handle={handleSubmit}
          />
        </div>
        {loading ? <Loader /> : null}
      </div>
      <Modal ref={modalRef} title={title} route='/login'>
        {content}
      </Modal>
    </div>
  );
};

export default Register;
