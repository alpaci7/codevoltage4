import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const ChangePasswordToken = ({setUser, user, setIsAuthenticated , checked, setChecked}) => {

    const {id, token} = useParams();
    
    const {t} = useTranslation();

    const navigate = useNavigate();

    const [load, setLoad] = useState(true);

    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");


    useEffect(()=>{
        const fetchData = async ()=>{
            setError("");
            setWarning("");
            setLoad(false);
            const data = {
                id : id, 
                token : token
            };
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/checkToken`, data)
            .then((res)=>{
                setLoad(true);
                if(res.data.message === "success"){
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    navigate("/changePassword")
                }
            })
            .catch((err)=>{
                setLoad(true);
                if(err.response.data.message === "Bad Id"){
                    setError(t('BadId'));
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
    },[id, token, navigate, t, setIsAuthenticated, setUser]);
    return (
        <div>
            <NavBar user={user} checked={checked} setChecked={setChecked}/>
            <div className="form-parent">
                <div className="form-children">
                    {error ? <div className="error">{error}</div> : <div></div>}
                    {warning ? <div className="warning">{warning}</div> : <div></div>}
       
                </div>
                {load ? <div></div> : <Loading/>}

            </div>
            <Footer/>
        </div>
    );
}
 
export default ChangePasswordToken;