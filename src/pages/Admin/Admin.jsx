import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Header } from "../../components/layout/Header/Header";
import { Footer } from "../../components/layout/Footer/Footer";
import { login } from "../../firebase/auth";

export const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      await login(email, password);

      navigate("/admin");
    } catch (error) {
      console.error(error);
      setError("E-mail ou senha inválidos.");
    }
  };

  return (
    <>
      <Header />

      <main className="admin-container">
        <div className="admin-form-content">
          <h1>NOS BASTIDORES</h1>
          <p>Acesse para gerenciar o conteúdo do site</p>
        </div>

        <div className="container-login">
          <form onSubmit={handleSubmit} className="form-login">
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha"
              />
            </div>
            {error && <p>{error}</p>}
            <button type="submit" className="btn-login">Entrar</button>
          </form>
        </div>
      </main>

    </>
  );
};
