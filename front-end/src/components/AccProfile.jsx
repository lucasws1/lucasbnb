import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const AccProfile = () => {
  const { user, setUser } = useUserContext();
  const [redirect, setRedirect] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/users/logout");

      setUser(null);
      setRedirect(true);
    } catch (error) {
      alert("Erro ao fazer logout");
      console.error("Logout error:", error);
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="flex flex-col items-center gap-4">
      <p>
        Logado como {user?.name} ({user?.email})
      </p>
      <button
        onClick={logout}
        className="bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default AccProfile;
