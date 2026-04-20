import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Header from "./app/components/Header";
import { AppProvider, useAppContext } from "./context/AppContext";
import Login from "./app/view/Login";
import Vendas from "./app/view/Vendas";
import ListaProdutos from "./app/view/ListaProdutos";
import CadastroAtualizacao from "./app/view/CadastroAtualizacao";
import Relatorios from "./app/view/Relatorios";


const PrivateRoute = ({children, cargosPermitidos}:{children: JSX.Element, cargosPermitidos?: string[]}) => {
  const {usuarioLogado} = useAppContext();

  if (!usuarioLogado){
    return <Navigate to ="/login"/>;
  }

  if (cargosPermitidos && !cargosPermitidos.includes(usuarioLogado.cargo)) {
    return <Navigate to="/vendas"/>
  }

  return children;
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Navigate to="/vendas"/>}/>
          <Route path="/vendas" element={
            <PrivateRoute>
              <>
                <Header/>
                <div className="min-h-screen bg-gray-100"><Vendas /></div>
              </>
            </PrivateRoute>
          } />
          <Route path="/produtos" element={
            <PrivateRoute>
              <>
                <Header/>
                <div className="min-h-screen bg-gray-100"><ListaProdutos /></div>
              </>
            </PrivateRoute>
          } />
          <Route path="/cadastro" element={
            <PrivateRoute cargosPermitidos={['gerente', 'dev']}>
              <>
                <Header/>
                <div className="min-h-screen bg-gray-100"><CadastroAtualizacao /></div>
              </>
            </PrivateRoute>
          } />
          <Route path="/relatorios" element={
            <PrivateRoute cargosPermitidos={['gerente', 'dev']}>
              <>
                <Header/>
                <div className="min-h-screen bg-gray-100"><Relatorios /></div>
              </>
            </PrivateRoute>
          }/>
          <Route path="/usuarios" element={
            <PrivateRoute>
              <>
                <Header/>
                <div className="min-h-screen bg-gray-100"><GerenciamentoUsuarios /></div>
              </>
            </PrivateRoute>
          }/>
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;