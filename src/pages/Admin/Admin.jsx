import React, { useEffect, useState } from "react";
import "./Admin.css";
import { Header } from "../../components/layout/Header/Header";
import { Footer } from "../../components/layout/Footer/Footer";
import { login, observeAuthState } from "../../firebase/auth";

export const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      await login(email, password);

      console.log("Login realizado com sucesso!");
    } catch (error) {
      console.error(error);
      setError("E-mail ou senha inválidos.");
    }
  };

  const adminContent = loading ? (
    <p>Verificando autenticação...</p>
  ) : user ? (
    <div>
      <h1>Bem-vindo à área administrativa!</h1>
      <p>Você está autenticado.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Entrar</button>
    </form>
  );

  return (
    <>
      <Header />

      <main className="admin-container">{adminContent}</main>

      <Footer />
    </>
  );
};
