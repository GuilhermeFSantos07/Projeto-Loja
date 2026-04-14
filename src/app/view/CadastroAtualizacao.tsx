import { useEffect, useState } from "react"
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import { type Produto, useAppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

const CadastroAtualizacao = () => {
    const {
        produtos, 
        adicionarProduto, 
        atualizarPreco, 
        atualizarEstoque,
        formCadastro,
        setFormCadastro,
        buscaAtualizacao,
        setBuscaAtualizacao
    } = useAppContext ();

    const location = useLocation ();

    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
    const [novoPreco, setNovoPreco] = useState("");
    const [inputQtd, setInputQtd] = useState("");

    useEffect (() => {
        if (location.state?.idParaEditar){
            setBuscaAtualizacao(location.state.idParaEditar);
            handleBuscarParaEdicao(location.state.idParaEditar);
        }
    }, [location]);

    const handleCadastrar = () => {
        if(!formCadastro.nome || !formCadastro.preco) {
            alert ("Preencha pelo menos o nome e o preço.");
            return;
        }

        const novoId = Math.floor(1000 + Math.random() * 9000).toString();

        adicionarProduto({
            id: novoId,
            nome: formCadastro.nome,
            preco: parseFloat(formCadastro.preco),
            tipo: formCadastro.tipo as "produto" | "servico",
            qtd: formCadastro.tipo === "produto" ? parseInt(formCadastro.qtd || "0") : 0,
        });

        alert(`Cadastrado com sucesso. Id gerado: ${novoId}`);

        setFormCadastro({nome: "", preco: "", tipo: "produto", qtd: ""});
    }

    const handleBuscarParaEdicao = (idBuscado: string) => {
        const encontrado = produtos.find(p => p.id === idBuscado || p.nome.toLowerCase() === idBuscado.toLowerCase());
        if (encontrado) {
            setProdutoEditando(encontrado);
            setNovoPreco(encontrado.preco.toString());
            setInputQtd("");
        }else{
            alert("Produto não encontrado")
        }
    };

    const handleSalvarPreco = () => {
        if(produtoEditando && novoPreco){
            atualizarPreco(produtoEditando.id, parseFloat(novoPreco));
            alert("Preço atualizado com sucesso!");
            handleBuscarParaEdicao(produtoEditando.id);
        }
    }

    const handleAtualizarQtd = (operacao: 'somar' | 'substituir') => {
        if (produtoEditando && inputQtd) {
            atualizarEstoque(produtoEditando.id, parseInt(inputQtd), operacao);
            alert(`Quantidade ${operacao === 'somar' ? 'adicionada' : 'substituída'} com sucesso`);
            setInputQtd("")
            handleBuscarParaEdicao(produtoEditando.id);
        }
    };

    const tipoOptions = [
        {value: "produto", label: "Produto"},
        {value: "serviço", label: "Serviço"},
    ]

    return (
        <main className="pt-32 pb-10 px-4 sm:px-6 w-full max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <section className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 text-center lg:text-left">
                        Cadastro
                    </h2>
                    <div className="flex flex-col gap-4">
                        <Input 
                            label="Nome:" 
                            placeholder="Ex: Relogio..."
                            value={formCadastro.nome}
                            onChange={(e) => setFormCadastro({...formCadastro, nome: e.target.value})}
                        />
                        <Input 
                            label="Preço (R$):" 
                            type="number"
                            step="1.00" 
                            placeholder="R$ 0,00"
                            value={formCadastro.preco}
                            onChange={(e) => setFormCadastro({...formCadastro, preco: e.target.value})}
                        />
                        <Select
                            label="Tipo: "
                            options={tipoOptions}
                            value={formCadastro.tipo}
                            onChange={(e) => setFormCadastro({...formCadastro, tipo: e.target.value})}
                        />
                        {formCadastro.tipo === "produto" && (
                            <Input 
                                label="Quantidade inicial:"
                                type="number" 
                                min={0} 
                                value={formCadastro.qtd}
                                onChange={(e) => setFormCadastro({...formCadastro, qtd: e.target.value})}
                            />
                        )}
                        <div className="mt-4 flex justify-center">
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="w-auto px-10 rounded-md"
                                onClick={handleCadastrar}>
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-100">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 text-center lg:text-left">
                        Atualização
                    </h2>
                    <div className="flex gap-2 items-end">
                        <div className="flex-1">
                            <Input 
                                label="ID ou Nome:" 
                                placeholder="Busque para atualizar..."
                                value={buscaAtualizacao}
                                onChange={(e) => setBuscaAtualizacao(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleBuscarParaEdicao(buscaAtualizacao)}
                            />
                        </div>
                        <Button variant="primary" onClick={() => handleBuscarParaEdicao(buscaAtualizacao)}>
                            Buscar
                        </Button>
                    </div>
                    {!produtoEditando ? (
                        <div className="flex-1 bg-gray-50 border border-dashed border-gray-300 rounded-mb flex items-center justify-center p-6 text-center text-gray-500">
                            <p>Busque um item acima para carregar os dados</p>
                        </div>
                    ) : (
                        <div className="bg-blue-50/50 border border-blue-200 rounded-md p-5 flex flex-col gap-4">
                            <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                                <div>
                                    <h3 className="text-gray-900 text-lg">{produtoEditando.nome}</h3>
                                    <p className="text-sm text-gray-500">ID: {produtoEditando.id} | Tipo: {produtoEditando.tipo}</p>
                                </div>
                                {produtoEditando.tipo === 'produto' && (
                                    <div className="text-right bg-white px-3 py-1 rounded border border-gray-200 shadow-sm">
                                        <span className="text-xs text-gray-500 uppercase font-bold block">Estoque Atual:</span>
                                        <span className="text-2xl font-bold text-gray-900">{produtoEditando.qtd}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 items-end mt-2">
                                <div className="flex-1">
                                    <Input
                                        label="Novo Preço (R$)"
                                        type="number"
                                        step="1.00"
                                        value={novoPreco}
                                        onChange={(e) => setNovoPreco(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" onClick={handleSalvarPreco}>Atualizar</Button>
                            </div>
                            {produtoEditando.tipo === 'produto' && (
                                <div className="flex gap-2 items-end mt-2 pt-4 border-t border-blue-200/50">
                                    <div className="flex-1">
                                        <Input
                                            label="Ajustar Quantidade"
                                            type="number"
                                            value={inputQtd}
                                            onChange={(e) => setInputQtd(e.target.value)}
                                        />
                                    </div>
                                    <Button variant="success" size="icon" title="Somar ao estoque atual" onClick={() => handleAtualizarQtd('somar')}>
                                        <span className="text-xl font-bold">+</span>
                                    </Button>
                                    <Button variant="primary" size="icon" title="Substituir estoque atual" onClick={() => handleAtualizarQtd('substituir')}>
                                        <span className="text-lg font-bold">#</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default CadastroAtualizacao;