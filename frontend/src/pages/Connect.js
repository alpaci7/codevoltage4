import { useTranslation } from "react-i18next";
import { Form, Label, Input } from "../components/Form";
import NavBar from "../components/NavBar";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "../styles/Form.css";
import logo from '../images/logo_Google.png';

import axios from "axios";
import Loading from "../components/Loading";
import ParticlesComponent from "../components/Particles";
import Footer from "../components/Footer";


const Connect = ({STATUS, setUser, setIsAuthenticated, MESSAGE, checked, setChecked}) => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const [status, setStatus] = useState("login");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [gender, setGender] = useState("");

    const [bgColorLogin, setBgColorLogin] = useState("");
    const [bgColorSignup, setBgColorSignup] = useState("");
    const [span1, setSpan1] = useState("active");
    const [span2, setSpan2] = useState("");

    const [usernameMissing, setUsernameMissing] = useState("");
    const [passwordMissing, setPasswordMissing] = useState("");
    const [fullnameMissing, setFullnameMissing] = useState("");
    const [emailMissing, setEmailMissing] = useState("");
    const [phoneMissing, setPhoneMissing] = useState("");
    const [addressMissing, setAddressMissing] = useState("");
    const [dayMissing, setDayMissing] = useState("");
    const [monthMissing, setMonthMissing] = useState("");
    const [yearMissing, setYearMissing] = useState("");
    const [genderMissing, setGenderMissing] = useState("");



    const [load, setLoad] = useState(true);

    const bottomRef = useRef(null);


    useEffect(()=>{
        if(MESSAGE === "success"){
            setMessage(t('Password Success'));
        }
        else{
            setMessage("");
        }
        if(STATUS === "login"){
            if(checked){
                setBgColorLogin("rgb(92, 89, 89)");
                setBgColorSignup("rgb(140, 140, 140)");
            }
            else{
                setBgColorLogin("#f0f0f0");
                setBgColorSignup("white");
            }

            setSpan2("");
            setSpan1("active");
            setStatus("login");
            setError("");
            setWarning("");
            setUsernameMissing("");
            setFullnameMissing("");
            setPasswordMissing("");
            setEmailMissing("");
            setPhoneMissing("");
            setAddressMissing("");
            setDayMissing("");
            setMonthMissing("");
            setYearMissing("");
            setGenderMissing("");

        }
        else if(STATUS === "signup"){
            if(checked){
                setBgColorSignup("rgb(92, 89, 89)");
                setBgColorLogin("rgb(140, 140, 140)");
            }
            else{
                setBgColorSignup("#f0f0f0");
                setBgColorLogin("white");
            }
            
            setSpan1("");
            setSpan2("active");
            setStatus("signup");
            setError("");
            setWarning("");
            setUsernameMissing("");
            setFullnameMissing("");
            setPasswordMissing("");
            setEmailMissing("");
            setPhoneMissing("");
            setAddressMissing("");
            setDayMissing("");
            setMonthMissing("");
            setYearMissing("");
            setGenderMissing("");

        }
    },[STATUS, MESSAGE, t, checked]);

    const years = [];
    for(let i=2023; i>=1900; i--){
        years.push({label : i, value : i});
    }
    const months = [];
    for(let i=1; i<=12; i++){
        months.push({label : i, value : i});
    }
    const days = [];
    for(let i=1; i<=31; i++){
        days.push({label : i, value : i});
    }
    const Gender = [{label :  t('Male') , value : "male" }, {label : t('Female') ,value : "female"}]

    const dateStyle = {
        control: (styles, {isFocused}) => ({
            ...styles,
            backgroundColor: 'var(--input-background-color)',
            border: isFocused ? '3px solid #7cb9cd' : '3px solid #ccc',
            outline: isFocused ? '3px solid #7cb9cd' : 'none',
            cursor : "pointer",
            margin : "0px 10px",
            padding : "5px", 
            '&:hover': {
                border: '5px solid #7cb9cd', 
            },
            
        }),
        option: (styles, {isSelected, isFocused}) => {
            return {
                ...styles,
                backgroundColor: 'var(--input-background-color)', 
                color: 'var(--color)',
                cursor: 'pointer',
                ...(isSelected && {
                    backgroundColor: '#7cb9cd', 
                    
                }),  
                ...(isFocused && {
                    backgroundColor: '#c6d6db',    
                }),  
                      
            };
        },
        placeholder: (styles) => ({
            ...styles,
            color: 'var(--color)',  // Set placeholder color to red
        }),
    };

    const handleLogin = async(e)=>{
        e.preventDefault();
        setUsernameMissing("");
        setPasswordMissing("");
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if(username === ""){
            setUsernameMissing("missing");
            setWarning(t('All Fields Are Required'));
            setError("");
        }
        if(password === ""){
            setPasswordMissing("missing");
            setWarning(t('All Fields Are Required'));
            setError("");
        }

        if (password !== "" && username !== ""){
            setLoad(false);
            const data = {
                username : username,
                password : password,
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/login`,data)
            .then((res)=>{
                setLoad(true);
                if(res.data.message === "success"){
                    setUser(res.data.user);
                    setIsAuthenticated(true)
                    navigate('/home/welcome');
                }
                else if(res.data.message === "edit profile"){
                    setLoad(true);
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                    navigate('/editProfile');
                }
            })
            .catch((err)=>{
                setWarning("");
                setLoad(true);

                if(err.response.data.message === "server error"){
                    setError(t('Server Error'));
                }
                else if(err.response.data.message === "password incorrect"){
                    setError(t('Password Incorrect'));
                    setPasswordMissing("missing-error");
                }
                else if(err.response.data.message === "not found"){
                    setError(t('Profile Not Found'));
                }
            });
        }
    };

    const handleSignup = async(e)=>{
        e.preventDefault();
        setError("");
        setWarning("");
        setUsernameMissing("");
        setFullnameMissing("");
        setPasswordMissing("");
        setEmailMissing("");
        setPhoneMissing("");
        setAddressMissing("");
        setDayMissing("");
        setMonthMissing("");
        setYearMissing("");
        setGenderMissing("");

        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if(username === ""){
            setWarning(t('All Fields Are Required'));
            setUsernameMissing("missing");
        }
        if(fullname === ""){
            setWarning(t('All Fields Are Required'));
            setFullnameMissing("missing");
        }
        if(password === ""){
            setWarning(t('All Fields Are Required'));
            setPasswordMissing("missing");
        }
        if(email === ""){
            setWarning(t('All Fields Are Required'));
            setEmailMissing("missing");
        }
        if(phone === ""){
            setWarning(t('All Fields Are Required'));
            setPhoneMissing("missing");
        }
        if(address === ""){
            setWarning(t('All Fields Are Required'));
            setAddressMissing("missing");
        }
        if(day === ""){
            setWarning(t('All Fields Are Required'));
            setDayMissing("missing");
        }
        if(month === ""){
            setWarning(t('All Fields Are Required'));
            setMonthMissing("missing");
        }
        if(year === ""){
            setWarning(t('All Fields Are Required'));
            setYearMissing("missing");
        }
        if(gender === ""){
            setWarning(t('All Fields Are Required'));
            setGenderMissing("missing");
        }

        if(username !== "" && fullname !== "" && password !== "" 
            && email !== "" && phone !== "" && address !== "" 
            && day !== "" && month !== "" && year !== "" && gender !== "")
        {
            setLoad(false);
            const birthDate = day+"-"+month+"-"+year;
            const data = {
                username : username,
                password : password,
                fullname : fullname,
                email : email,
                phone : phone,
                address : address,
                birthDate : birthDate,
                gender : gender,
                language : i18n.language
            }

            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/signup`,data)
            .then((res)=>{
                setLoad(true);
                if(res.data.message === "success"){
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                    navigate('/home/success');
                }
            })
            .catch((err)=>{ 
                setWarning("");
                setLoad(true);
                if(err.response.data.message === "email exist"){
                    setError(t('Email Already Exist Connect'));
                    setEmailMissing("missing-error");
                }
                if(err.response.data.message === "username exist"){
                    setError(t('Username Already Exist'));
                    setUsernameMissing("missing-error");
                }
               
            })
        }        
    };

    useEffect(()=>{
        window.scroll(0,0);
    },[ ]);
    return (
        <div>
            <NavBar user={"none"} checked={checked} setChecked={setChecked}/>
            <ParticlesComponent/>
            <div className="form-parent">  
                <div className="connect-span">
                    <div id="span" className={span1}></div>
                    <div id="span" className={span2}></div>
                </div>
                <div className="connect-buttons">
                    <Button $Outline="none" $Width="50%" $Color={"var(--color)"} $HoverColor={"var(--hover-color)"} $BackgroundColor={bgColorLogin} $HoverBackgroundColor="#ccc"  onClick={()=>{
                        setWarning("");
                        setError("");
                        setUsernameMissing("");
                        setFullnameMissing("");
                        setPasswordMissing("");
                        setEmailMissing("");
                        setPhoneMissing("");
                        setAddressMissing("");
                        setDayMissing("");
                        setMonthMissing("");
                        setYearMissing("");
                        setGenderMissing("");
                        navigate("/login");
                        }}>{t('Log In')}</Button>
                    <Button $Outline="none" $Width="50%" $Color={"var(--color)"} $HoverColor={"var(--hover-color)"} $BackgroundColor={bgColorSignup} $HoverBackgroundColor="#ccc" onClick={()=>{
                        setWarning("");
                        setError("");
                        setUsernameMissing("");
                        setFullnameMissing("");
                        setPasswordMissing("");
                        setEmailMissing("");
                        setPhoneMissing("");
                        setAddressMissing("");
                        setDayMissing("");
                        setMonthMissing("");
                        setYearMissing("");
                        setGenderMissing("");
                        navigate("/signup");
                        }}>{t('Sign Up')}</Button>
                </div>
                {status === "login" ? 
                    <div className="form">
                        <div className="form-children">
                            {message ? <div className="message">{message}</div> : <div></div>}

                        </div>
                        <div className="form-children">
                                <div className="google-auth">
                                    <h2>{t('Log in With Google')}</h2>
                                    <Button className="google-button" 
                                         $BackgroundColor="var(--input-background-color)" 
                                         $Width="250px" $Height="70px"
                                         $HoverBackgroundColor="#e4e4e4" 
                                         $BorderRadius="30px"
                                         $Border = "3px solid #ccc"
                                         $Color="var(--color)"
                                         $HoverColor= "var(--hover-color)"
                                         onClick={()=>{
                                            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/auth/google/redirect&scope=profile+email&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
        
                                        }}
                                         >
                                        <img src={logo} alt="Google_logo" className="google-logo"/>
                                        <div>Google</div>
                                    </Button>
                                </div>
                        </div>
                        <Form onSubmit={handleLogin}>
                            
                            <div className="or-field">
                                <div className="line"></div>
                                <div className="or">
                                    <h1>{t('or')}</h1>
                                </div>
                                <div className="line"></div>
                            </div>
                            <div className="form-children">
                                <Label htmlFor="username">{t('UserName')} :</Label>
                                <Input className={usernameMissing} id="username" placeholder={t('UserName')+" "+t('or')+" Email"} onChange={(e)=>{setUsername(e.target.value)}}></Input>
                            </div>
                            <div className="form-children">
                                <Label htmlFor="password">{t('Password')} :</Label>
                                <Input className={passwordMissing} id="password" placeholder={t('Password')} $InputType="password" onChange={(e)=>{setPassword(e.target.value)}}></Input>
                            </div>
                            <div className="form-children">
                                {error ? <div className="error">{error}</div> : <div></div>}
                                {warning ? <div className="warning">{warning}</div> : <div></div>}

                            </div>
                            <div className="form-buttons">
                                <Button type="submit" $BorderRadius="5px">{t('Log In')}</Button>
                                <Link className="Link" to={"/forgetPassword"}>{t('Forget Password')}</Link>
                            </div>
                            
                        </Form>
                        
                    </div>
                :
                    <div className="form">
                        <div className="form-children">            
                            <div className="google-auth">
                                <h2>{t('Sign up With Google')}</h2>
                                <Button
                                    className="google-button" 
                                    $BackgroundColor="var(--input-background-color)" 
                                    $Width="250px" $Height="70px"
                                    $HoverBackgroundColor="#e4e4e4" 
                                    $BorderRadius="30px"
                                    $Border = "3px solid #ccc"
                                    $Color="var(--color)"
                                    $HoverColor="var(--hover-color)"
                                    onClick={()=>{
                                        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/auth/google/redirect&scope=profile+email&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

                                    }}
                                >
                                    <img src={logo} alt="Google_logo" className="google-logo"/>
                                    <div>Google</div>
                                </Button>
                            </div>
                        </div>
                        <Form onSubmit={handleSignup}>
                    
                        
                           
                             <div className="or-field">
                                <div className="line"></div>
                                <div className="or">
                                    <h1>{t('or')}</h1>
                                </div>
                                <div className="line"></div>
                            </div>
                            <div className="form-children">
                                <Label htmlFor="username">{t('UserName')} :</Label>
                                <Input className={usernameMissing} id="username" placeholder="ex : Alpaci8" onChange={(e)=>setUsername(e.target.value)}></Input>
                            </div>
                            <div className="form-children">
                                <Label htmlFor="password">{t('Password')} :</Label>
                                <Input className={passwordMissing} id="password" placeholder="ex : aG58d$7e9" $InputType="password" onChange={(e)=>setPassword(e.target.value)}></Input>
                            </div>
                            <div className="form-children">
                                <Label htmlFor="fullName">{t('FullName')} :</Label>
                                <Input className={fullnameMissing} id="fullName" placeholder="ex : Najeh Rabie"  onChange={(e)=>setFullname(e.target.value)}></Input>
                            </div>
                            <div className="form-children">
                                <Label htmlFor="email">{t('Email')} :</Label>
                                <Input className={emailMissing} id="email" placeholder="ex : rabienajeh@gmail.com" $InputType="email" onChange={(e)=>setEmail(e.target.value)}></Input>
                            </div>
                            <div className="form-children">
                                <Label htmlFor="phone">{t('Phone')} :</Label>
                                <Input className={phoneMissing} id="phone" placeholder="ex : 0682004750" onChange={(e)=>setPhone(e.target.value)}></Input>
                            </div>
                            <div className="form-children">
                                <Label htmlFor="address">{t('Address')} :</Label>
                                <Input className={addressMissing} id="address" placeholder={"ex : 30 ile verte imm 8 etg 3, Maârif, Casablanca , "+t('Morocco')} onChange={(e)=>setAddress(e.target.value)}></Input>
                            </div>
                            <div className="form-children">
                                <Label>{t('Date Of Birth')} :</Label>
                                <Select className={dayMissing} id="form-child" placeholder={t('Day')} options={days} styles={dateStyle} onChange={(e)=>setDay(e.value)}></Select>
                                <Select className={monthMissing} id="form-child" placeholder={t('Month')} options={months} styles={dateStyle} onChange={(e)=>setMonth(e.value)}></Select>
                                <Select className={yearMissing} id="form-child" placeholder={t('Year')} options={years} styles={dateStyle} onChange={(e)=>setYear(e.value)}></Select>

                            </div>
                            <div className="form-children">
                                <Label>{t('Gender')} :</Label>
                                <Select className={genderMissing} id="form-child" placeholder={t('Gender')} options={Gender} styles={dateStyle} onChange={(e)=>setGender(e.value)}></Select>
                            </div>

                            <div className="form-children">
                                {error ? <div className="error">{error}</div> : <div></div>}
                                {warning ? <div className="warning">{warning}</div> : <div></div>}                            
                            </div>
                            <div className="form-buttons">
                                <Button  ref={bottomRef} style={{ marginTop: '20px' }} type="submit" $BorderRadius="5px">{t('Sign Up')}</Button>

                            </div>
                    
                        </Form>
                        
                    </div>
                   
                }
            </div>

            {load ? <div></div> : <Loading/>}

            <Footer/>
        </div>  
    );
}
 
export default Connect;