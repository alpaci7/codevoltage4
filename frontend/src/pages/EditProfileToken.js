import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const EditProfileToken = ({setUser,setIsAuthenticated, checked, setChecked}) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {id, token} = useParams();

    const [load, setLoad] = useState(true);

    const [error, setError] = useState("")
    useEffect(()=>{
        const fetchData = async()=>{
            setLoad(false);
            const data = {
                id : id,
                token : token
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/checkToken` ,data)
            .then((res)=>{
                setLoad(true);
                if(res.data.message === "success"){
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                    navigate("/editProfile");
                }
            })
            .catch((err)=>{
                setLoad(true);
                if(err.response.data.message === "Bad Id"){
                    setError(t('Bad Id'));
                }
                else if(err.response.data.message === "Expired Token"){
                    setError(t('Expired Token'));
                }
                else if(err.response.data.message === "Wrong Token"){
                    setError(t('Wrong Token'));
                }
                
            })
        };

        fetchData();
    })
    return (
        <div>
            <NavBar user={"none"} checked={checked} setChecked={setChecked}/>
            <div className="form-parent">
                {error ? <div className="error">{error}</div> : <div></div>}
            </div>
            {load ? <div></div> : <Loading/>}
            <Footer/>
        </div>

       
    );
}
 
export default EditProfileToken;