import { useState } from "react";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ListaProdutos = () => {
    const { produtos, removerProduto } = useAppContext();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [produtoParaDeletar, setProdutoParaDeletar] = useState<string | null>(null);

    const handleOpenDeleteModal = (id: string) => {
      setProdutoParaDeletar(id);
      setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
      if (produtoParaDeletar) {
        await removerProduto(produtoParaDeletar);
      }
      setIsModalOpen(false);
      setProdutoParaDeletar(null);
    };

    const handleEditar = (id: string) => {
      navigate('/cadastro', {state: {idParaEditar: id}});
    }

    const totalEstoque = produtos?.reduce((acc, item) => {
      return acc + (item.tipo === 'servico' ? 0 : Number(item.qtd || 0));
    }, 0 || 0);

    const produtosOrdenados = produtos ? [...produtos].sort((a,b) => a.nome.localeCompare(b.nome)) : [];

  return (
    <main className="pt-6 pb-10 px-4 sm:px-6 w-full max-w-7xl mx-auto min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 gap-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4">Lista de Produtos e Serviços</h2>
          {produtos && (
            <button className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-amber-100 transition-colors flex items-center gap-2">
              <span>📦</span> Total em Estoque: {totalEstoque} und
            </button>
          )}
        </div>
        {!produtos ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
             <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-gray-500 font-medium animate-pulse">Carregando produtos...</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full pb-2">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-[1fr_2fr_1fr_1fr_120px] gap-4 px-4 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 mb-4">
                <span>Código</span>
                <span>Nome</span>
                <span>Valor</span>
                <span>Quantidade</span>
                <span className="text-center">Ações</span>
              </div>
              <div className="flex flex-col gap-3">
                {produtosOrdenados.map((item) => (
                  <div
                    key={item.id} 
                    className="grid grid-cols-[1fr_2fr_1fr_1fr_120px] gap-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg items-center transition-colors hover:bg-gray-100"
                  >
                    <span className="text-gray-700 text-sm font-mono uppercase">#{item.id.slice(-5)}</span>
                    <span className="font-bold text-gray-900 truncate" title={item.nome}>{item.nome}</span>
                    <span className="text-amber-700 font-bold">
                      R$ {item.preco.toFixed(2).replace(".",",")}
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {item.tipo === 'servico' ? '-' : `${item.qtd} und`}
                    </span>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditar(item.id)}>Editar</Button>
                      <Button variant="danger" size="icon" title="Excluir" onClick={() => handleOpenDeleteModal(item.id)}>
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
          </div>
        )}
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