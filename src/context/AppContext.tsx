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

export type Cargo = 'dev' | 'gerente' | 'vendedor';

export type Usuario = {
    id: string;
    nome: string;
    username: string;
    cargo: Cargo;
}

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

    adicionarProduto: (p: Produto) => Promise<boolean>;
    removerProduto: (id: string) => Promise<void>;
    atualizarPreco: (id: string, novoPreco: number) => Promise<void>;
    atualizarEstoque: (id: string, valor: number, operacao: 'somar' | 'substituir') => Promise<void>;
    finalizarVenda: (itens: ItemVenda[], metodo: string, total: number, descontoAplicado: number) => void;

    usuarioLogado: Usuario | null;
    fazerLogin: (username: string, senha: string) => Promise<boolean>;
    fazerLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
    const [produtos, setProdutos] = useState<Produto[]>([]);

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

    const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(() => {
        const salvo = localStorage.getItem("@pdv:usuario");
        return salvo ? JSON.parse(salvo) : null;
    });

    useEffect (() => {
        const carregarProdutos = async () => {
            try{
                const res = await fetch ("http://localhost:5000/api/produtos");
                if (res.ok){
                    const dados = await res.json();
                    const produtosMapeados = dados.map((p: any) => ({...p, id: p._id}));
                    setProdutos(produtosMapeados);
                }
            }catch(error){
                console.error("Erro ao buscar produtos da API:", error);
            }
        };
        carregarProdutos();
    },[]);

    useEffect (() => {
        localStorage.setItem("@pdv:vendas", JSON.stringify(vendasRealizadas));
    },[vendasRealizadas]);

    const adicionarProduto = async (p: Produto): Promise<boolean> => {
        try{
            const res = await fetch('http://localhost:5000/api/produtos',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({nome: p.nome, preco: p.preco, tipo: p.tipo, qtd: p.qtd})
            });
            if(res.ok){
                const produtoCriado = await res.json();
                setProdutos((prev) => [...prev, {...produtoCriado, id: produtoCriado._id}]);
                return true;
            }
            return false;
        }catch(error){
            console.error("Erro ao cadastrar produto:", error);
            return false;
        }
    };

    const removerProduto = async (id: string) => {
        try{
            const res = await fetch(`http://localhost:5000/api/produtos/${id}`, {method: 'DELETE'});
            if (res.ok){
                setProdutos((prev) => prev.filter((p) => p.id !== id));
            }
        }catch(error){
            console.error("Erro ao remover produto:", error);
        }
    };

    const atualizarPreco = async (id: string, novoPreco: number) => {
        try{
            const res = await fetch (`http://localhost:5000/api/produtos/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({preco: novoPreco})
            });
            if(res.ok){
                setProdutos((prev) => prev.map((p) => p.id === id ? {...p, preco: novoPreco} : p));
            }
        }catch(error){
            console.error("Erro ao atualizar preço:", error);
        }
    };

    const atualizarEstoque = async (id: string, valor: number, operacao: 'somar' | 'substituir') => {
        const produto = produtos.find(p => p.id === id);
        if(!produto) return;

        const novaQtd = operacao === 'somar' ? produto.qtd + valor : valor;
        const qtdFinal = novaQtd < 0 ? 0 : novaQtd;

        try{
            const res = await fetch(`http://localhost:5000/api/produtos/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({qtd: qtdFinal})
            });
            if(res.ok){
                setProdutos((prev) => prev.map((p) => p.id === id ? {...p, qtd: qtdFinal} : p));
            }
        }catch (error) {
            console.error("Erro ao atualizar estoque:", error);
        }
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


    const fazerLogin = async (user: string, pass: string): Promise<boolean> => {
        try{
            const resposta = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: user, senha: pass})
            });

            if (resposta.ok){
                const dados = await resposta.json();

                const dadosSalvos: Usuario = {
                    id: dados.user._id,
                    nome: dados.user.nome,
                    username: dados.user.username,
                    cargo: 'dev'
                };

                setUsuarioLogado(dadosSalvos);

                localStorage.setItem("@pdv:usuario", JSON.stringify(dadosSalvos));
                localStorage.setItem("@pdv:token", dados.token);

                return true;
            }
            return false;
        }catch(error){
            console.error("Erro ao conectar com a API: ", error);
            return false;
        }
    };

    const fazerLogout = () => {
        setUsuarioLogado(null);
        localStorage.removeItem("@pdv:usuario");
        localStorage.removeItem("@pdv:toekn");
    }

    return (
        <AppContext.Provider 
            value={{
                produtos, vendasRealizadas, adicionarProduto, removerProduto, atualizarPreco, atualizarEstoque, finalizarVenda, carrinho, setCarrinho, formaPagamento, setFormaPagamento, desconto, setDesconto, buscaVendas, setBuscaVendas, buscaAtualizacao, setBuscaAtualizacao, formCadastro, setFormCadastro, usuarioLogado, fazerLogin, fazerLogout
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