import { useState } from "react";

import Register from "./Register";
import Login from "./login";

const AuthContainer = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Login
      setUser={setUser}
      switchToRegister={() => setIsLogin(false)}
    />
  ) : (
    <Register
      switchToLogin={() => setIsLogin(true)}
    />
  );
};

export default AuthContainer;