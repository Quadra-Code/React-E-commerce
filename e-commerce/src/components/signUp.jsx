import React, {useState, useRef,useEffect} from 'react';
import image1 from'../NEW QC/New folder/Illustration-PNG-Images.png';
import logo from '../NEW QC/لوجو qc-12.png';
import {NavLink, useNavigate} from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import axios from 'axios';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export default function SignUp() {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] =useState('');
  const [validPwd, setValidPwd] =useState(false);
  const [pwdFocus, setPwdFocus] =useState(false);
  const [matchFocus, setMatchFocus] =useState(false);
  const [matchPwd, setMatchPwd] =useState('');
  const [validMatch, setValidMatch] =useState(false);
  const [errMsg, setErrMsg] =useState('');
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd ===matchPwd;
    setValidMatch(match)
  },[pwd,matchPwd])
  useEffect(()=>{
    setErrMsg('');
  },[pwd,matchPwd])
  const navigate = useNavigate();
  const handleSinUp = (e)=> {
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/users/register-api`,{
      full_name:fullName,
      email,
      password:pwd
    }).then((res)=>{
      console.log(res.request.status);
      res.request.status===201?navigate('/log-in'):alert('error')
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <>
      <div className='ChannelI-container'>
        <nav className='top-header'>
          <button className='sign-in'><NavLink to='/sign-up'>تسجيل الدخول</NavLink></button>
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
                <span className={errMsg?"errmsg":"offscreen"}>{errMsg}</span>
              </div>
              <form className='signUP-form' onSubmit={(e)=>{handleSinUp(e)}}>
                <div className="input-cont">
                  <span className="p-float-label">
                    <InputText id="username" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <label htmlFor="username">الأسم بالكامل</label>
                  </span>
                </div>
                <div className="input-cont">
                  <span className="p-float-label">
                    <InputText id="username" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="username">الأيميل</label>
                  </span>
                </div>
                <div className="input-cont">
                  <span className="p-float-label">
                    <InputText
                      type='password' id="username"
                      value={pwd} onChange={(e) => setPwd(e.target.value)} 
                      required
                      aria-invalid = {validPwd?'false':"true"}
                      aria-describedby = "pwdnote"
                      onFocus={()=>setPwdFocus(true)}
                      onBlur={()=>setPwdFocus(false)}
                      />
                    <label htmlFor="username">كلمة المرور</label>
                  </span>
                  <p id='pwdnote' className={pwdFocus && !validPwd?"instructions":"offscreen" }>
                    <i className='pi pi-info'></i>
                    8 to 24 characters. <br/>
                    Must include uppercase and lowercase letters, a number and a special character. <br/>  
                    Allowed special characters : <span aria-label='exclamation mark'>!</span>  
                    <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
                    <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
                  </p>
                </div>
                <div className="input-cont">
                  <span className="p-float-label">
                    <InputText type='password' id="confirm_pwd"
                      value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)}
                      required
                      aria-invalid = {validMatch?'false':"true"}
                      aria-describedby = "confirmnote"
                      onFocus={()=>setMatchFocus(true)}
                      onBlur={()=>setMatchFocus(false)}
                    />
                    <label htmlFor="username">تأكيد كلمة المرور</label>
                  </span>
                  <p id='confirmnote' className={matchFocus && !validMatch?"instructions":"offscreen" }>
                    <i className='pi pi-info'></i>
                    Must match the first password input field.
                  </p>
                </div>
                <button className='confirm' disabled={!validPwd || !validMatch ? true :false}>انشاء حساب جديد</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
{/* <section className='left-section'>
<div className='channels'>
  <div className='form-header'>
    <div className='top'>
      <span>QuadraBot</span>
    </div>
    <span className='label'>Create your free account</span>
  </div>
  <form className='signUP-form' onSubmit={(e)=>{handleSinUp(e)}}>
    <div className="input-cont">
      <span className="p-float-label">
        <InputText id="username" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <label htmlFor="username">Full name</label>
      </span>
    </div>
    <div className="input-cont">
      <span className="p-float-label">
        <InputText id="username" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="username">Business email</label>
      </span>
    </div>
    <div className="input-cont">
      <span className="p-float-label">
        <InputText
          type='password' id="username"
          value={pwd} onChange={(e) => setPwd(e.target.value)} 
          required
          aria-invalid = {validPwd?'false':"true"}
          aria-describedby = "pwdnote"
          onFocus={()=>setPwdFocus(true)}
          onBlur={()=>setPwdFocus(false)}
          />
        <label htmlFor="username">Password</label>
      </span>
      <p id='pwdnote' className={pwdFocus && !validPwd?"instructions":"offscreen" }>
        <i className='pi pi-info'></i>
        8 to 24 characters. <br/>
        Must include uppercase and lowercase letters, a number and a special character. <br/>  
        Allowed special characters : <span aria-label='exclamation mark'>!</span>  
        <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
        <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
      </p>
    </div>
    <div className="input-cont">
      <span className="p-float-label">
        <InputText type='password' id="confirm_pwd"
          value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid = {validMatch?'false':"true"}
          aria-describedby = "confirmnote"
          onFocus={()=>setMatchFocus(true)}
          onBlur={()=>setMatchFocus(false)}
        />
        <label htmlFor="username">Confirm Password</label>
      </span>
      <p id='confirmnote' className={matchFocus && !validMatch?"instructions":"offscreen" }>
        <i className='pi pi-info'></i>
        Must match the first password input field.
      </p>
    </div>
    <button className='confirm' disabled={!validPwd || !validMatch ? true :false}>Create account</button>
  </form>
</div>
</section> */}
