import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Button from "./Button";

const Header = () => {
    const[isMenuOpen, setMenuOpen] = useState(false);
    const {usuarioLogado, fazerLogout} = useAppContext();

    if(!usuarioLogado) return null;

    const navLinkClass = ({isActive}: {isActive: boolean}) => `flex-1 text-center py-3 text-sm md:text-base font-medium transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-100 last:border-0 ${
        isActive
            ? 'text-amber-800 bg-amber-50'
            : 'text-gray-600 hover:bg-gray-50 hover:text-amber-700'
    }`;

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 sm:px-6">
                <div className="w-full flex justify-between items-center md:w-auto">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src=""
                            alt="Logo"
                            className="h-10 w-auto bg-gray-200 rounded text-transparent"
                        />
                        <span className="font-bold text-amber-700 hidden sm:block">PDV SAIMON</span>
                    </div>
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded border border-gray-200"
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? '✖' : '☰'}
                    </button>
                </div>
                <h1 className="text-lg md:text-xl font-semibold uppercase tracking-wide text-gray-800 mt-2 md:mt-0 text-center">
                    Relojoaria e Variedades Saimon
                </h1>
                <div className="hidden md:flex flex-col items-end gap-0.5 min-w-37.5">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Usuário:</span>
                        <span className="text-sm font-semibold text-gray-700">{usuarioLogado.nome}</span>
                    </div>
                    <div>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold uppercase">
                            {usuarioLogado.cargo}
                        </span>
                        <Button
                            variant="danger"
                            size="md"
                            onClick={fazerLogout}
                        >
                            SAIR
                        </Button>
                    </div>
                </div>
                <div>
                    <span className="text-gray-500">Logado como: <b>{usuarioLogado.nome}</b></span>
                    <button onClick={fazerLogout} className="text-red-500 font-bold ml-2">SAIR</button>
                </div>
            </div>
            <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full border-t border-gray-100 bg-white`}>
                <NavLink to="/vendas" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Vendas
                </NavLink>
                <NavLink to="/produtos" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Lista de Produtos
                </NavLink>
                {usuarioLogado.cargo !== 'vendedor' && (
                    <>
                        <NavLink to="/cadastro" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                            Cadastro e Atualização
                        </NavLink>
                        <NavLink to="/relatorios" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                            Relatórios
                        </NavLink>
                    </>
                )}
                {usuarioLogado.cargo === 'dev' && (
                    <NavLink to="/usuarios" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                        Config. Logins
                    </NavLink>
                )}
            </nav>
        </header>
    );
};

export default Header;