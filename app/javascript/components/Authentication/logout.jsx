import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../services/authService";

const Logout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    auth.logout();
    location.href = '/'
  }, []);

  return null;
}

export default Logout;
