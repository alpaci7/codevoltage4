import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { Form, Input, Label } from "../components/Form";
import NavBar from "../components/NavBar";
import { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const ForgetPassword = ({user, checked, setChecked}) => {
    const {t, i18n} = useTranslation();

    const [load, setLoad] = useState(true);

    const [email, setEmail] = useState("");
    const [emailMissing, setEmailMissing] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");


    const handleSubmit = async (e)=>{
        e.preventDefault();
        setMessage("");
        setError("");
        setWarning("");
        if(email === ""){
            setWarning(t('All Fields Are Required'));
            setEmailMissing("missing");
        }
        else{
            setLoad(false);
            const data = {
                email : email,
                language : i18n.language
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/forgetPassword`,data)
            .then((res)=>{
                setLoad(true);
                if(res.data.message === "success"){
                    setMessage(t('Success & Mail'));
                }
            })
            .catch((err)=>{
                setLoad(true);
                if(err.response.data.message === "not found"){
                    setError(t('No Account Mail'));
                }
            })
        }
    }
    return (
        <div>
            <NavBar user={user} checked={checked} setChecked={setChecked}/>
            <div className="form-parent">
                <div className="form">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-children">
                            <Label>{t('Email')} :</Label>
                            <Input placeholder="ex : rabienajeh@gmail.com" className={emailMissing} $InputType="email" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div className="form-children">
                            {message ? <div className="message">{message}</div> : <div></div>}
                            {warning ? <div className="warning">{warning}</div> : <div></div>}
                            {error ? <div className="error">{error}</div> : <div></div>}
                        </div>

                        <div className="change-password">
                            <Button type="submit">{t('Change Password')}</Button>
                        </div>
                    </Form>

                </div>
                {load ? <div></div> : <Loading/>}

            </div>
            <Footer/>
        </div>
    );
}
 
export default ForgetPassword;