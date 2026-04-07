import { useState } from "react";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import Input from "../components/Input";
import ProductDetailsCard from "../components/ProductDetailsCard";
import Select from "../components/Select";
import ConfirmModal from "../components/ConfirmModal";


const Vendas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenRemoveModal = () => setIsModalOpen(true);
  const handleConfirmRemove = () => {
    console.log("Item removido do carrinho");
    setIsModalOpen(false);
  }

  const paymentOptions = [
    { value: "dinheiro", label: "Dinheiro" },
    { value: "pix", label: "PIX" },
    { value: "debito", label: "Cartão de Débito" },
    { value: "credito", label: "Cartão de Crédito" },
  ];

  return (
    <main className="pt-32 pb-10 px-4 sm:px-6 w-full max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        <section className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Pesquisar Produto</h2>
          
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input label="ID ou Nome" placeholder="Digite para buscar..." />
            </div>
            <Button variant="primary">Buscar</Button>
          </div>

          <ProductDetailsCard />

          <div className="flex gap-2 items-end mt-4">
            <div className="w-1/3">
              <Input label="Qtd." type="number" defaultValue={1} min={1} />
            </div>
            <div className="flex-1">
              <Button variant="primary" fullWidth>Adicionar ao Carrinho</Button>
            </div>
          </div>
        </section>

        <section className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Carrinho de Compras</h2>
          
          <div className="flex flex-col gap-3 min-h-62.5 max-h-100 overflow-y-auto">
            <CartItem onRemoveItem={handleOpenRemoveModal}/>
          </div>

          <div className="border-t pt-4 flex flex-col gap-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-amber-700">R$ 300,00</span>
            </div>
            <Select 
              label="Forma de Pagamento" 
              options={paymentOptions} 
            />
            <Button variant="success" size="lg" fullWidth>
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
        onConfirm={handleConfirmRemove}
      />
    </main>
  );
};

export default Vendas;