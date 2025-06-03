import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Account from "./pages/Account";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const { data } = await axios.get("/users/profile");
        setUser(data);
      } catch (error) {
        console.log("Não autorizado");
      }
    };
    axiosGet();
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Register user={user} setUser={setUser} />}
        />
        <Route
          path="/account/:subpage?"
          element={<Account user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
