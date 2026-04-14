import { useMemo, useState } from "react";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import Input from "../components/Input";
import ProductDetailsCard from "../components/ProductDetailsCard";
import Select from "../components/Select";
import ConfirmModal from "../components/ConfirmModal";
import { useAppContext, type Produto } from "../../context/AppContext";

const Vendas = () => {
  const {
    produtos, finalizarVenda,
    carrinho, setCarrinho,
    formaPagamento, setFormaPagamento,
    desconto, setDesconto
  } = useAppContext ();

  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | undefined>(undefined);
  const [qtdDesejada, setQtdDesejada] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemParaRemover, setItemParaRemover] = useState <string | null>(null);

  const handleBuscar = () =>{
    const encontrado = produtos.find(p => p.id === busca || p.nome.toLocaleLowerCase() === busca.toLocaleLowerCase());
    if (encontrado) {
      setProdutoSelecionado(encontrado);
      setQtdDesejada(1);
    }else{
      alert("Produto não encontrado");
      setProdutoSelecionado(undefined);
    }
  };

  const handleAdicionarAoCarrinho = () => {
    if (!produtoSelecionado) return;

    const qtd = Number(qtdDesejada);

    if (qtd <= 0){
      return alert("A quantidade deve ser maior que zero");
    }

    if (produtoSelecionado.tipo === 'produto' && produtoSelecionado.qtd < qtd){
      return alert(`Estoque insuficiente! Temos apenas ${produtoSelecionado.qtd} unidades.`);
    }

    const itemJaExiste = carrinho.find(item => item.id === produtoSelecionado.id);

    if (itemJaExiste){
      const novaQtdTotal = itemJaExiste.qtdVendida + qtd;

      if(produtoSelecionado.tipo === 'produto' && novaQtdTotal >= produtoSelecionado.qtd){
        return alert("Estoque insuficiente para adicionar mais produtos");
      }

      setCarrinho(carrinho.map(item =>
        item.id === produtoSelecionado.id
        ? {...item, qtdVendida: novaQtdTotal}
        : item
      ));
    }else{
      setCarrinho([...carrinho, {...produtoSelecionado, qtdVendida: qtd}]);
    }

    setBusca("");
    setProdutoSelecionado(undefined);
    setQtdDesejada(1);
  }

  const handleAbrirModalRemover = (id: string) => {
    setItemParaRemover(id);
    setIsModalOpen(true);
  }

  const handleConfirmarRemocao = () => {
    if (itemParaRemover){
      setCarrinho(carrinho.filter(item => item.id !== itemParaRemover));
    }
    setIsModalOpen(false);
    setItemParaRemover(null);
  }

  const handleFinalizarVenda = () => {
    if(carrinho.length === 0){
      return alert("O carrinho está vazio");
    }
    if(!formaPagamento){
      return alert("Selecione uma forma de pagamento");
    }

    finalizarVenda(carrinho, formaPagamento, totalFinal, desconto);

    alert("Venda finalizada com sucesso. Estoque atualizado.");
    setCarrinho([]);
    setFormaPagamento("");
    setDesconto(0);
  };

  const subTotal = useMemo(() => {
    return carrinho.reduce((acc, item) => acc + (item.preco * item.qtdVendida), 0);
  }, [carrinho]);

  const totalFinal = useMemo(() => {
    return Math.max(0, subTotal - (desconto || 0));
  }, [subTotal, desconto]);

  const paymentOptions = [
    { value: "dinheiro", label: "Dinheiro" },
    { value: "pix", label: "PIX" },
    { value: "debito", label: "Cartão de Débito" },
    { value: "credito", label: "Cartão de Crédito" },
  ];
  

  return (
    <main className="pt-32 pb-10 px-4 sm:px-6 w-full max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <section className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Pesquisar Produto</h2>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Input 
                  label="ID ou Nome" 
                  placeholder="Digite para buscar..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                />
              </div>
              <Button variant="outline" onClick={handleBuscar}>Buscar</Button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Detalhes do Item</h2>
            <ProductDetailsCard product={produtoSelecionado}/>
            <div className="flex gap-4 items-end mt-2">
              <div className="w-32">
                <Input
                  label="Qtd:"
                  type="number"
                  min={1}
                  value={qtdDesejada}
                  onChange={(e) => setQtdDesejada(parseInt(e.target.value))}
                  disabled={!produtoSelecionado}
                />
              </div>
              <Button
                variant="primary"
                className="flex-1"
                disabled={!produtoSelecionado}
                onClick={handleAdicionarAoCarrinho}
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Carrinho de Compras</h2>   
          <div className="flex flex-col gap-3 min-h-62.5 max-h-100 overflow-y-auto">
            {carrinho.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">O carrinho está vazio</div>
            ): (
              carrinho.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemoveItem={handleAbrirModalRemover}
                />
              ))
            )}
          </div>

          <div className="border-t border-gray-200 pt-4 flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Subtotal:</span>
                <span>R$ {subTotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="w-1/3">
                  <Input
                    label="Desconto (R$):"
                    type="number"
                    min={0}
                    step="1.00"
                    value={desconto || ""}
                    onChange={(e) => setDesconto(parseFloat(e.target. value) || 0)}
                  />
                </div>
                <div className="flex-1">
                  <Select 
                    label="Forma de Pagamento" 
                    options={paymentOptions}
                    value={formaPagamento}
                    onChange={(e) => setFormaPagamento(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-amber-50 p-4 rouneded-md border border-amber-100 mt-2">
              <span className="text-lg font-semibold text-gray-700">Total a pagar:</span>
              <span className="text-2xl font-bold text-amber-700">
                R$ {totalFinal.toFixed(2).replace(",", ".")}
              </span>
            </div>
            <Button variant="success" size="lg" className="w-full" onClick={handleFinalizarVenda}>
              Finalizar Venda
            </Button>
          </div>   
        </section>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Remover do Carrinho"
        message="Tem certeza que deseja remover este item da venda atual?"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmarRemocao}
      />
    </main>
  );
};

export default Vendas;