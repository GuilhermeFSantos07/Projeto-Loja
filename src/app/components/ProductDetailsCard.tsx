import type { Produto } from "../../context/AppContext";


interface ProductsDetailsCardProps {
  product?: Produto;
}

const ProductDetailsCard = ({product}: ProductsDetailsCardProps) => {
  if(!product){
    return (
      <div className="bg-gray-50 p-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-500">
        Nenhum produto selecionado.
      </div>
    )
  }
  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 flex flex-col gap-3">
      <div className="flex justify-between border-b border-gray-200 pb-2">
        <span className="text-gray-500 font-medium">Nome:</span>
        <span className="text-gray-900 font-bold">{product.nome}</span>
      </div>
      <div className="flex justify-between border-b border-gray-200 pb-2">
        <span className="text-gray-500 font-medium">ID:</span>
        <span className="text-gray-900">{product.id}</span>
      </div>
      <div className="flex justify-between border-b border-gray-200 pb-2">
        <span className="text-gray-500 font-medium">Preço:</span>
        <span className="font-bold text-amber-700">
          R$ {product.preco.toFixed(2).replace(".", ",")}
        </span>
      </div>
      <div className="flex justify-between border-b border-gray-200 pb-2">
        <span className="text-gray-500 font-medium">Tipo:</span>
        <span className="text-gray-900">{product.tipo}</span>
      </div>
      {product.tipo === "produto" && (
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Estoque:</span>
          <span className="text-green-600 font-bold">{product.qtd} und</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;