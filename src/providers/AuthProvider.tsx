import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiConstant } from "../enum/apiConstant";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../redux/slice/userInformation";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const validateUser = async (id, token) => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_BASE_URL +
          apiConstant.ADMIN_USERS_DEATIL_USER +
          id,
        {
          headers: {
            deviceIdentifier: import.meta.env.DEVICE_IDENTIFIER,
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      console.log(data);

      dispatch(
        updateUserInfo({
          fullname: data.user.fullname,
          email: data.user.email,
          isEmailVerified: data.user.isEmailVerified,
        })
      );
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const _id = localStorage.getItem("userId");
    if (_id && token) {
      validateUser(_id, token);
    } else {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    navigate("/dashboard"); // Redirect to dashboard on successful login
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to login on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
