import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const { data: userDoc } = await axios.post("/users/login", {
          email,
          password,
        });

        setUser(userDoc);
        navigate("/");
      } catch (error) {
        alert(`Erro ao fazer login: ${error.response.data.error}`);
      }
    } else {
      console.log("Por favor, preencha todos os campos.");
    }
  };

  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Faça seu registro</h1>

        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary-400 cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white">
            Registrar
          </button>
        </form>
        <p>
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold underline">
            Faça login aqui!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
