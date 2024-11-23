import Navbar from "./components/common/Navbar";
import LoginPage from "./pages/auth/login/LoginPage";
import SignupPage from "./pages/auth/signup/SignupPage";

function App() {
  const authUser = false;
  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Navbar />}
      {authUser && <LoginPage />}
      <SignupPage />
    </div>
  );
}

export default App;
