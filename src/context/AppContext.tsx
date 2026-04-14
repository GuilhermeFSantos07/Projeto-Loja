import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Produto = {
    id: string;
    nome: string;
    preco: number;
    tipo: "produto" | "servico";
    qtd: number;
};

export type ItemVenda = {
    id: string;
    nome: string;
    preco: number;
    qtdVendida: number;
};

export type Venda = {
    id: string;
    data: string;
    itens: ItemVenda[]
    valorTotal: number;
    metodoPagamento: string;
    desconto: number;
};

export type FormCadastro = {
    nome: string;
    preco: string;
    tipo: string;
    qtd: string;
};

interface AppContextType {
    produtos: Produto[];
    vendasRealizadas: Venda[];

    carrinho: ItemVenda[];
    setCarrinho: React.Dispatch<React.SetStateAction<ItemVenda[]>>;
    formaPagamento: string;
    setFormaPagamento: React.Dispatch<React.SetStateAction<string>>;
    desconto: number;
    setDesconto: React.Dispatch<React.SetStateAction<number>>;

    buscaVendas: string;
    setBuscaVendas: React.Dispatch<React.SetStateAction<string>>;
    buscaAtualizacao: string;
    setBuscaAtualizacao: React.Dispatch<React.SetStateAction<string>>;
    formCadastro: FormCadastro;
    setFormCadastro: React.Dispatch<React.SetStateAction<FormCadastro>>;

    adicionarProduto: (p: Produto) => void;
    removerProduto: (id: string) => void;
    atualizarPreco: (id: string, novoPreco: number) => void;
    atualizarEstoque: (id: string, valor: number, operacao: 'somar' | 'substituir') => void;
    finalizarVenda: (itens: ItemVenda[], metodo: string, total: number, descontoAplicado: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
    const [produtos, setProdutos] = useState<Produto[]>(() => {
        const saved = localStorage.getItem("@pdv:produtos");
        return saved ? JSON.parse(saved) : [];
    });

    const [vendasRealizadas, setVendasRealizadas] = useState<Venda[]>(() => {
        const saved = localStorage.getItem("@pdv:vendas");
        return saved ? JSON.parse(saved) : [];
    });

    const [carrinho, setCarrinho] = useState<ItemVenda[]>([]);
    const [formaPagamento, setFormaPagamento] = useState<string>("");
    const [desconto, setDesconto] = useState<number>(0);

    const [buscaVendas, setBuscaVendas] = useState("")
    const [buscaAtualizacao, setBuscaAtualizacao] = useState("")
    const [formCadastro, setFormCadastro] = useState<FormCadastro>({
        nome: "", preco: "", tipo: "produto", qtd: ""
    })

    useEffect (() => {
        localStorage.setItem("@pdv:produtos", JSON.stringify(produtos));
    },[produtos]);

    useEffect (() => {
        localStorage.setItem("@pdv:vendas", JSON.stringify(vendasRealizadas));
    },[vendasRealizadas]);

    const adicionarProduto = (p: Produto) => {
        setProdutos((prev) => [...prev, p]);
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

    const finalizarVenda = (itens: ItemVenda[], metodo: string, total: number, descontoAplicado: number) => {
        setProdutos((prev) => prev.map((p) => {
            const itemVendido = itens.find(item => item.id === p.id);
            if (itemVendido && p.tipo === 'produto'){
                return {...p, qtd: p.qtd - itemVendido.qtdVendida};
            }
            return p;
        }));

        const novaVenda: Venda = {
            id: `V-${Math.floor(1000 + Math.random() * 9000)}`,
            data: new Date().toLocaleString('pt-BR'),
            itens: [...itens],
            metodoPagamento: metodo,
            valorTotal: total,
            desconto: descontoAplicado
        };

        setVendasRealizadas((prev) => [novaVenda, ...prev]);
    };

    return (
        <AppContext.Provider 
            value={{
                produtos, vendasRealizadas, adicionarProduto, removerProduto, atualizarPreco, atualizarEstoque, finalizarVenda, carrinho, setCarrinho, formaPagamento, setFormaPagamento, desconto, setDesconto, buscaVendas, setBuscaVendas, buscaAtualizacao, setBuscaAtualizacao, formCadastro, setFormCadastro
                }}
            >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext deve ser usado dentro de um AppProvider");
    return context;
}