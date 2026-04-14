import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./app/components/Header";
import { AppProvider } from "./context/AppContext";
import { lazy, Suspense } from "react";

const Vendas = lazy(() => import('./app/view/Vendas'));
const CadastroAtualizacao = lazy(() => import('./app/view/CadastroAtualizacao'));
const ListaProdutos = lazy(() => import('./app/view/ListaProdutos'));
const Relatorios = lazy(() => import('./app/view/Relatorios'));

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Header/>
          <Suspense fallback={<div className="pt-32 text-center text-xl font-bold text-gray-500">Carregando tela...</div>}>
              <Routes>
              <Route path="/" element={<Navigate to="/vendas" replace />}/>
              <Route path="/vendas" element={<Vendas/>}/>
              <Route path="/cadastro" element={<CadastroAtualizacao/>}/>
              <Route path="/produtos" element={<ListaProdutos/>}/>
              <Route path="/relatorios" element={<Relatorios/>} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;