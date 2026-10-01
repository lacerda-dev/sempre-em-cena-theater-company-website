import "./Admin.css";
import { Header } from "../../components/layout/Header/Header";
import { Footer } from "../../components/layout/Footer/Footer";
import { logout } from "../../firebase/auth";

export const AdminDashboard = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <>
      <Header />

      <main className="admin-container">
        <h1>Painel Administrativo</h1>
        <p>Bem-vindo à área administrativa!</p>

        <button onClick={handleLogout}>Sair</button>
      </main>

      <Footer />
    </>
  );
};
