import React, {useState,useContext,useRef, useEffect} from 'react';
import image1 from'../NEW QC/New folder/Illustration-PNG-Images.png';
import logo from '../NEW QC/لوجو qc-12.png';
import {NavLink , useNavigate} from 'react-router-dom';
import axios from'axios';
import { InputText } from "primereact/inputtext";
// import { AuthContext } from './AuthContext';
export default function Login() {
  const errRef = useRef();
  const [username, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  // const { setAuth } = useContext(AuthContext);
  // const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    setErrMsg('')
  },[username, pwd])
  const handleLogin = async (e) =>{
    e.preventDefault();
    await axios.post(`http://127.0.0.1:8000/users/client-login-api`,{
      username,
      password:pwd
    }).then((response)=>{
      const userId  = response?.data?.id;
      localStorage.setItem('userId', `${userId}`);
      // setAuth({email, pwd, userId})
      setSuccess(true);
      setUserName('')
      setPwd('')
      // navigate(`/home/${response?.data?.id}`)
      navigate(`/home`)
    }).catch((error)=>{
      if(!error?.response){
        setErrMsg('No Server Response');
      }else if (error.response?.status === 404){
        setErrMsg('This Email Is Not Registered');
      }else if (error.response?.status === 400){
        setErrMsg('Incorrect Password');
      }else{
        setErrMsg('Login Failed')
      }
      errRef.current.focus();
      console.log(error)
    })
  }
  return (
    <>
      <div className='ChannelI-container'>
        <nav className='top-header'>
          <button className='sign-in'><NavLink to='/sign-up'>انشاء حساب جديد</NavLink></button>
        </nav>
        <div className='lg-container'>
          <section className='right-section'>
            <div className='col'>
              <img className='illstration' src={image1} alt="" />
              <h2>من فضلك قم بملىء هذه البيانات للبدأ.</h2>
              <span>لا تقلق جميع البيانات محفوظه بشكل اّمن</span>
            </div>
          </section>
          <section className='left-section'>
            <div className='col'>
              <div className='form-header'>
                <div className='top'>
                  <h3>شركة و حلواني الأصيل</h3>
                </div>
                <span className='label'>من فضلك قم بأدخال هذه البيانات لتسجيل الدخول</span>
                <span ref={errRef} className={errMsg?"errmsg":"offscreen"}>{errMsg}</span>
              </div>
              <form onSubmit={(e)=>handleLogin(e)}>
                <div className="card flex justify-content-center">
                  <span className="p-float-label">
                    <InputText id="username" type='text' 
                      value={username} onChange={(e) => setUserName(e.target.value)} 
                      autoComplete='off'
                      required
                      keyfilter="int"
                    />
                    <label htmlFor="username">الأيميل</label>
                  </span>
                </div>
                <div className="card flex justify-content-center">
                  <span className="p-float-label">
                    <InputText type='password' id="username" required
                      value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    <label htmlFor="username">كلمة المرور</label>
                  </span>
                </div>
                <button type='submit' className='confirm' onClick={handleLogin}>تسجيل الدخول</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
