import { useContext ,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from "./store/AuthContext";
function App() {
  const authCtx = useContext(AuthContext);

useEffect(() => {
  const checkToken = async () => {
    if (!authCtx.token) return;

    try {
      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBWdbYezlB4B6chk9YUR0q1pvCTycIHeYw',
        {
          method: "POST",
          body: JSON.stringify({ idToken: authCtx.token }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) authCtx.logout();
    } catch (err) {
      authCtx.logout();
    }
  };

  checkToken();
}, [ctx]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
       {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
          {authCtx.isLoggedIn && (
          <Route path='/profile' element={<UserProfile />} />
          )}
          <Route path='*' element={<HomePage />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
