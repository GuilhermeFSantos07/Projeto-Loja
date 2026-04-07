import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    const[isMenuOpen, setMenuOpen] = useState(false);

    const navLinkClass = ({isActive}: {isActive: boolean}) => `flex-1 text-center py-3 text-sm md:text-base font-medium transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-100 last:border-0 ${
        isActive
            ? 'text-amber-800 bg-amber-50'
            : 'text-gray-600 hover:bg-gray-50 hover:text-amber-700'
    }`;

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 sm:px-6">
                <div className="w-full flex justify-between items-center md:w-auto">
                    <div className="flex items-center gap cursor-pointer">
                        <img
                            src=""
                            alt="Logo"
                            className="h-10 w-auto bg-gray-200 rounded text-transparent"
                        />
                    </div>
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded"
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? '✖' : '☰'}
                    </button>
                </div>
                <h1 className="text-lg md:text-xl font-semibold uppercase tracking-wide text-gray-800 mt-2 md:mt-0 text-center">
                    Relojoaria e Variedades Saimon
                </h1>
                <div className="hidden sm:block w-20"></div>
            </div>
            <nav className={`${isMenuOpen ? 'flex': 'hidden'} md:flex flex-col md:flex-row w-full border-t border-gray-100`}>
                <NavLink to="/vendas" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Vendas
                </NavLink>
                <NavLink to="/cadastro" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Cadastro e Atualização
                </NavLink>
                <NavLink to="/produtos" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Lista de Produtos
                </NavLink>
                <NavLink to="/relatorios" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Relatórios
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;