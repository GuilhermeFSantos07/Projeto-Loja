import { useState } from "react";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";

const ListaProdutos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [produtoParaDeletar, setProdutoParaDeletar] = useState<string | null>(null);

    const handleOpenDeleteModal = (id: string) => {
        setProdutoParaDeletar(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log("Deletando produto ID:", produtoParaDeletar);
        setIsModalOpen(false);
        setProdutoParaDeletar(null);
    };

    const produtosFake = [
    { id: "005", nome: "Bateria Sony", preco: 25.00, tipo: "produto", qtd: 50 },
    { id: "001", nome: "Limpeza de Relógio", preco: 40.00, tipo: "servico", qtd: 0 },
    { id: "002", nome: "Pulseira de Couro", preco: 80.00, tipo: "produto", qtd: 15 },
    { id: "003", nome: "Relógio Casio Prata", preco: 150.00, tipo: "produto", qtd: 12 },
  ];

  return (
    <main className="pt-32 pb-10 px-4 sm:px-6 w-full max-w-7xl mx-auto min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Lista de Produtos e Serviços</h2>

        <div className="flex flex-col gap-4">
          {produtosFake.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg gap-4"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1">
                <div className="flex flex-col w-full md:w-1/3">
                  <span className="text-sm text-gray-500 font-medium md:hidden">Nome</span>
                  <span className="font-bold text-gray-900">{item.nome}</span>
                </div>
                
                <div className="flex flex-col w-full md:w-1/6">
                  <span className="text-sm text-gray-500 font-medium md:hidden">ID</span>
                  <span className="text-gray-700">{item.id}</span>
                </div>

                <div className="flex flex-col w-full md:w-1/6">
                  <span className="text-sm text-gray-500 font-medium md:hidden">Valor</span>
                  <span className="text-amber-700 font-bold">
                    R$ {item.preco.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="flex justify-between md:justify-start w-full md:w-1/4 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium md:hidden">Tipo</span>
                    <span className="text-gray-700 capitalize">{item.tipo}</span>
                  </div>
                  <div className="flex flex-col text-right md:text-left">
                    <span className="text-sm text-gray-500 font-medium md:hidden">Qtd.</span>
                    <span className="text-gray-900 font-semibold">{item.qtd}</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0">
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="icon" 
                  title="Excluir"
                  onClick={() => handleOpenDeleteModal(item.id)}
                >
                  <span className="font-bold">X</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal 
        isOpen={isModalOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este item? Esta ação não poderá ser desfeita."
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}

export default ListaProdutos;