import "./Login.css";
import Group from '../src/Images/Group.png'
import illution from '../src/Images/Illustration.png'
import { UserAuth } from "./AuthContex";
import {GoogleButton} from 'react-google-button'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const nav=useNavigate()

    const {googleSignIn,user} = UserAuth()

  const handleGoogleSignIn =async()=>{
    try{
      await googleSignIn()
    } catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
    if(user != null) {
      nav('/main')
    }
  }, [user])
  

  return (
    <div className="login-signup">
      <main className="desktop-1">
        <div className="group-wrapper">
          <img className="group-icon" loading="lazy" alt="icon" src={Group}/>
        </div>
        <div className="desktop-1-inner">
          <div className="frame-parent">
            <div className="frame-group">
              <div className="login-wrapper">
                <div className="login">LOGIN</div>
              </div>
              <div className="lorem-ipsum-dolor-sit-amet-co-parent">
                <div className="lorem-ipsum-dolor">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.</div>
                <div className="button-instance">
                  <GoogleButton onClick={handleGoogleSignIn}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="illustration-export-icon"
          loading="lazy"
          alt="Login page side image"
          src={illution}/>
      </main>
    </div>
  );
};

export default Login;
