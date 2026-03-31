import { Routes, Route, Navigate } from "react-router-dom";
import PredictPage from "./pages/PredictPage.jsx";
import Landing from "./pages/Landing.jsx";
import AuthContainer from "./pages/AuthContainer.jsx";
import useUser from "./hooks/useUser.jsx";

export default function App() {
  const { user, setUser } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route 
        path="/login" 
        element={
          user ? <Navigate to="/predict" replace /> : <AuthContainer setUser={setUser} />
        } 
      />
      <Route 
        path="/predict" 
        element={
          user ? <PredictPage /> : <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
}
