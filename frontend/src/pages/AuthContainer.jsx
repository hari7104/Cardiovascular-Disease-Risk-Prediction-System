import { useState } from "react";

import Register from "./Register";
import Login from "./login";

const AuthContainer = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const switchToLogin = (msg = "") => {
    setMessage(msg);
    setIsLogin(true);
  };
  return isLogin ? (
    <Login
      setUser={setUser}
      msg={message}
      switchToRegister={() => setIsLogin(false)}
    />
  ) : (
    <Register switchToLogin={switchToLogin} />
  );
};

export default AuthContainer;
