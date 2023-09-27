import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userExist = localStorage.getItem("nerdyUser");
    if(!userExist){
      return navigate("/home?alert=notauthorized");
    }else{
      setLoading(false);
    }
  }, []);


  if(!loading){
    return children
  }
 
};

export default PrivateRoute;