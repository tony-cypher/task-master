import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginPage from "./pages/auth/login/LoginPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import HomePage from "./pages/home/HomePage";

function App() {
  const authUser = false;
  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
