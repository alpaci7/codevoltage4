import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Form, Input, Label } from "../components/Form";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { Button } from "../components/Button";
import { useNavigate} from "react-router-dom";
import NavBar from "../components/NavBar"
import Loading from "../components/Loading";
import ParticlesComponent from "../components/Particles";
import Footer from "../components/Footer";
const EditProfile = ({user, setIsAuthenticated, setUser, checked, setChecked}) => {
    const {t} = useTranslation();

    const navigate = useNavigate(); 


    const [load, setLoad] = useState(true);

    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");

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


    const bottomRef = useRef(null);
 

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
            backgroundColor: 'white',
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
                backgroundColor: 'white', 
                color: 'black',
                cursor: 'pointer',
                ...(isSelected && {
                    backgroundColor: '#7cb9cd', 
                    
                }),  
                ...(isFocused && {
                    backgroundColor: '#c6d6db', 
                    
                }),        
            };
        },
    };
    useEffect(()=>{
        setPasswordMissing("missing"); 
        setDay("");
        setMonth("");
        setYear("");
        setGender("");
        if(user.username){
            setUsername(user.username);
        }
        else{
            setUsernameMissing("missing");
        }

        if(user.fullname){
            setFullname(user.fullname);
        }
        else{
            setFullnameMissing("missing");
        }

        if(user.email){
            setEmail(user.email);
        }
        else{
            setEmailMissing("missing");
        }

        if(user.phone){
            setPhone(user.phone);
        }
        else{
            setPhoneMissing("missing");

        }

        if(user.address){
            setAddress(user.address);
        }
        else{
            setAddressMissing("missing");
        }

        if(user.birthDate){
            setDay(user.birthDate.split('-')[0]);
            setMonth(user.birthDate.split('-')[1]);
            setYear(user.birthDate.split('-')[2]);
        }
        else{
            setDayMissing("missing");
            setMonthMissing("missing");
            setYearMissing("missing");
        }

        if(user.gender){
            setGender(user.gender);
        }
        else{
            setGenderMissing("missing");
        }

    },[user]);



    const handleSubmit = async(e)=>{
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
                id : user._id,
                username : username,
                password : password,
                fullname : fullname,
                email : email,
                phone : phone,
                address : address,
                birthDate : birthDate,
                gender : gender
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/editProfile`, data)
            .then(res=>{
                setLoad(true);
                if(res.data.message === "success"){
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    navigate("/home/oauth/success");
                }
            })
            .catch(err=>{
                setWarning("");
                setError("");
                setLoad(true);
                if(err.response.data.message === "username exist"){
                    setError(t('Username Already Exist'));
                    setUsernameMissing("missing-error");
                }
                else if(err.response.data.message === "email exist"){
                    setError(t('Email Already Exist'))
                }
                else if(err.response.data.message === "No Account"){
                    setError(t('No Account'))
                }
                else if(err.response.data.message === "server error"){
                    setError(t('Server Error'));
                }
                else{
                    setError(err.response.data.message)
                }
            })
        }
        
    }
    return (
        <div>
            <NavBar user={user} checked={checked} setChecked={setChecked}/>
            <ParticlesComponent/>
            <div className="form-parent">
                <div className="form form-bordred">
                    <div className="form-children">
                        <h1>{t('Edit Profile')}</h1>
                    </div>
                    <Form onSubmit={handleSubmit}> 
                        <div className="form-children">
                            <Label >{t('UserName')} :</Label>
                            <Input className={usernameMissing} value={username} placeholder="ex : Alpaci8" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        
                        
                        <div className="form-children">
                            <Label >{t('Password')} :</Label>
                            <Input  className={passwordMissing}  placeholder="ex : aG58d$7e9"  $InputType="password" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>

                        <div className="form-children">
                            <Label >{t('FullName')} : </Label>
                            <Input className={fullnameMissing}  value={fullname} placeholder="ex : Najeh Rabie" onChange={(e)=>setFullname(e.target.value)}/> 
                        </div>
                        
                        <div className="form-children">
                            <Label >{t('Email')} : </Label>
                            <Input className={emailMissing}  $InputType="email" value={email} placeholder="ex : rabienajeh@gmail.com" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        
                        <div className="form-children">
                            <Label >{t('Phone')} : </Label>
                            <Input  className={phoneMissing} value={phone} placeholder="ex : 0682004750" onChange={(e)=>setPhone(e.target.value)}/>
                        </div>
                        
                        <div className="form-children">
                            <Label >{t('Address')} : </Label>
                            <Input  className={addressMissing} value={address} placeholder={"ex : 30 ile verte imm 8 etg 3, Maârif, Casablanca , "+t('Morocco')} onChange={(e)=>setAddress(e.target.value)}/>
                        </div>
                        
                        <div className="form-children">
                            <Label >{t('Date Of Birth')} : </Label>
                            <Select value={{label : day ? day : t('Day') , value : day}} className={dayMissing} id="form-child" placeholder={t('Day')} options={days} styles={dateStyle} onChange={(e)=>setDay(e.value)}></Select>
                            <Select value={{label : month ? month : t('Month')  , value : month}} className={monthMissing} id="form-child" placeholder={t('Month')} options={months} styles={dateStyle} onChange={(e)=>setMonth(e.value)}></Select>
                            <Select value={{label : year ? year : t('Year')  , value : year}} className={yearMissing} id="form-child" placeholder={t('Year')} options={years} styles={dateStyle} onChange={(e)=>setYear(e.value)}></Select>   
                        </div>
                        <div className="form-children">
                            <Label>{t('Gender')} :</Label>
                            <Select value={{label : gender === "male" ? t('Male') : gender === "female" ? t('Female') : t('Gender') , value : year}} className={genderMissing} id="form-child" placeholder={t('Gender')} options={Gender} styles={dateStyle} onChange={(e)=>setGender(e.value)}></Select>
                        </div>
                        <div className="form-children">
                                {error ? <div className="error">{error}</div> : <div></div>}
                                {warning ? <div className="warning">{warning}</div> : <div></div>}
                        </div>
                        <div className="form-buttons">
                            <Button type="submit" $BorderRadius="5px">{t('Edit Profile')}</Button>

                        </div>
                        </Form>
                     
                        {load ? <div></div> : <Loading/>}

                        <div ref={bottomRef} style={{ marginTop: '220px' }}></div>   

                    

                </div>
            </div>

            <Footer/>
        </div>
        
    );
}
 
export default EditProfile;