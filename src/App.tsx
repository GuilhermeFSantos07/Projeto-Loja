import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./app/components/Header";
import CadastroAtualizacao from "./app/view/CadastroAtualizacao";
import Vendas from "./app/view/Vendas";
import ListaProdutos from "./app/view/ListaProdutos";
import { AppProvider } from "./context/AppContext";
import Relatorios from "./app/view/Relatorios";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Header/>
          <Routes>
            <Route path="/" element={<Navigate to="/vendas" replace />}/>
            <Route path="/vendas" element={<Vendas/>}/>
            <Route path="/cadastro" element={<CadastroAtualizacao/>}/>
            <Route path="/produtos" element={<ListaProdutos/>}/>
            <Route path="/relatorios" element={<Relatorios/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;