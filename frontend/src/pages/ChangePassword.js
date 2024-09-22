import {useState } from "react";
import NavBar from "../components/NavBar";
import { Form, Input, Label } from "../components/Form";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const ChangePassword = ({user, checked, setChecked}) => {
    const {t} = useTranslation();

    const navigate = useNavigate();

    const [load, setLoad] = useState(true);

    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");




    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setWarning("");
        if(password1 === "" || password2 === ""){
            setWarning(t('All Fields Are Required'));
        }
        else if(password1 !== password2){
            setWarning(t('Password Doesnt Match'))

        }
        else if(password1 === password2){
            setLoad(false);
            const data = {
                id : user._id,
                password : password1
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/changePassword`, data)
            .then((res)=>{
                setLoad(true);
                if(res.data.message === "success"){
                    navigate("/login/success");
                }
            })
            .catch((err)=>{
                setLoad(true);
                if(err.response.data.message === "not found"){
                    setError(t('Profile Not Found'));
                }
                else{
                    setError(t('Server Error'));
                }
            })
        }
    }
    return (
        <div>
            <NavBar user={"none"} checked={checked} setChecked={setChecked}/>
            <div className="form-parent">
               
                <div className="form">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-children">
                            <Label>{t('password')} :</Label>
                            <Input placeholder="ex : aG58d$7e9" $InputType="password" onChange={e=>setPassword1(e.target.value)}/>
                        </div>
                        <div className="form-children">
                            <Label>{t('password')} :</Label>
                            <Input placeholder="ex : aG58d$7e9" $InputType="password" onChange={e=>setPassword2(e.target.value)}/>
                        </div>
                        <div className="form-children">
                            <Button type="submit">{t('Change Password')}</Button>
                        </div>
                        <div className="form-children">
                            {error ? <div className="error">{error}</div> : <div></div>}
                            {warning ? <div className="warning">{warning}</div> : <div></div>}

                        </div>
                    </Form>
                    
                 </div>   
                 {load ? <div></div> : <Loading/>}

            </div>
           
        <Footer/>
        </div>
    );
}
 
export default ChangePassword;