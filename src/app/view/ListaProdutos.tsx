import { useState } from "react";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ListaProdutos = () => {
    const { produtos, removerProduto} = useAppContext();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [produtoParaDeletar, setProdutoParaDeletar] = useState<string | null>(null);

    const handleOpenDeleteModal = (id: string) => {
        setProdutoParaDeletar(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (produtoParaDeletar) {
          removerProduto(produtoParaDeletar);
        }
        setIsModalOpen(false);
        setProdutoParaDeletar(null);
    };

    const handleEditar = (id: string) => {
      navigate('/cadastro', {state: {idParaEditar: id}});
    }

  return (
    <main className="pt-32 pb-10 px-4 sm:px-6 w-full max-w-7xl mx-auto min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Lista de Produtos e Serviços</h2>

        <div className="hidden md:flex items-center justify-between px-4 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 mb-4 gap-4">
          <div className="flex items-center gp-6 flex-1">
            <span className="w-1/3">Nome</span>
            <span className="w-1/6">ID</span>
            <span className="w-1/6">Valor</span>
            <div className="flex w-1/4 justify-between gap-6">
              <span className="-1/2">Tipo</span>
              <span className="w-1/2">Quantidade</span>
            </div>
          </div>
          <span className="w-27.5 text-right">Ações</span>
        </div>

        <div className="flex flex-col gap-4">
          {produtos.map((item) => (
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

              <div className="flex items-center justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0">
                <Button variant="outline" size="sm"
                onClick={() => handleEditar(item.id)}>
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
          {produtos.length === 0 && (
            <div className="text-center text-gray-500 py-10">Nenhum produto cadastrado</div>
          )}
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