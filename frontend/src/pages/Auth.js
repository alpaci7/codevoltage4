import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";

const Auth = ({setUser, setIsAuthenticated}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [load, setLoad] = useState(true);


  useEffect(() => {
    const code = searchParams.get('code');
    const fetchProfile = async () => {
      setLoad(false);
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/google/redirect?code=${code}`);
      if(response.data.message === "login"){
        setLoad(true);
        setIsAuthenticated(true);
        setUser(response.data.user);
        navigate("/home/welcome");
      }else if(response.data.message === "editProfile"){
        setLoad(true);
        setIsAuthenticated(true);
        setUser(response.data.user);
        navigate("/editProfile"); 
      }
    };

    if (code) {
      fetchProfile();
    }
  }, [searchParams, navigate, setIsAuthenticated, setUser]);
  return (
    <div>
      {load ? <div></div> : <Loading/>}
    </div>
  );
}
 
export default Auth;