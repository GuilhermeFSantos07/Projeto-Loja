import { createContext, useContext, useState, type ReactNode } from "react";

export type Produto = {
    id: string;
    nome: string;
    preco: number;
    tipo: "produto" | "servico";
    qtd: number;
};

interface AppContextType {
    produtos: Produto[];
    adicionarProduto: (produto: Produto) => void;
    removerProduto: (id: string) => void;
    atualizarPreco: (id: string, novoPreco: number) => void;
    atualizarEstoque: (id: string, valor: number, operacao: 'somar' | 'substituir') => void;
    finalizarVenda: (itensVendidos: { id:string; qtdVendida: number }[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
    const [produtos, setProdutos] = useState<Produto[]>([
        {id: "005", nome: "Bateria Sony", preco: 25.00, tipo: "produto", qtd: 50},
        {id: "001", nome: "Limpez de Relógio", preco: 40.00, tipo: "servico", qtd: 0},
        {id: "002", nome: "Pulseira de Couro", preco: 80.00, tipo: "produto", qtd: 15},
        {id: "003", nome: "Relógio Casio Prata", preco: 150.00, tipo: "produto", qtd: 12},
    ]);

    const adicionarProduto = (produto: Produto) => {
        setProdutos((prev) => [...prev, produto].sort((a, b) => a.nome.localeCompare(b.nome)));
    };

    const removerProduto = (id: string) => {
        setProdutos((prev) => prev.filter((p) => p.id !== id));
    };

    const atualizarPreco = (id: string, novoPreco: number) => {
        setProdutos((prev) => prev.map((p) => p.id === id ? {...p, preco: novoPreco} : p));
    };

    const atualizarEstoque = (id: string, valor: number, operacao: 'somar' | 'substituir') => {
        setProdutos((prev) => prev.map((p) => {
            if (p.id !== id) return p;
            const novaQtd = operacao === 'somar' ? p.qtd + valor : valor;
            return {...p, qtd: novaQtd < 0 ? 0 : novaQtd};
        }));
    }

    const finalizarVenda = (itensVendidos: { id: string; qtdVendida: number }[]) => {
        setProdutos((prev) => prev.map((p) => {
            const itemVendido = itensVendidos.find(item => item.id === p.id);
            if (itemVendido && p.tipo === 'produto'){
                return {...p, qtd: p.qtd - itemVendido.qtdVendida};
            }
            return p;
        }));
    };

    return (
        <AppContext.Provider value={{produtos, adicionarProduto, removerProduto, atualizarPreco, atualizarEstoque, finalizarVenda}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext deve ser usado dentro de um AppProvider");
    return context;
}