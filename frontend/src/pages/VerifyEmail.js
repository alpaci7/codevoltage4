import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const VerifyEmail = ({setIsAuthenticated, setUser, checked, setChecked}) => {
    const {id, token} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [load, setLoad] = useState(true);

    const [error, setError] = useState("");
    useEffect(()=>{
        const fetchData = async()=>{
            setLoad(false);
            const data = {
                id : id,
                token : token
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/verifyAccount`,data)
            .then((res)=>{
                setLoad(true);
                if(res.data.message === "success"){
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    navigate("/home/welcome/verified");
                }
            })
            .catch((err)=>{
                setLoad(true);
                if(err.response.data.message === "Bad Id"){
                    setError(t('BadId'));
                }
                else if(err.response.data.message === "No Account"){
                    setError(t('NoAccount'));
                }
                else if(err.response.data.message === "Expired Token"){
                    setError(t('ExpiredToken'));
                }
                else if(err.response.data.message === "Wrong Token"){
                    setError(t('WrongToken'));
                }
                
                
            })
        };

        fetchData();
    },[id, navigate, setIsAuthenticated, setUser, t, token])
    return (
        <div>
            <NavBar user={"none"} checked={checked} setChecked={setChecked}/>
            <div className="form-parent">

                {error ? <div className="error">{error}</div> : <div></div>}
                {load ? <div></div> : <Loading/>}

            </div>

            <Footer/>
        </div>
    );
}
 
export default VerifyEmail;