import Button from "./Button";

interface CartItemProps {
  item: {
    id: string;
    nome: string;
    preco: number;
    qtdVendida: number;
  };
  onRemoveItem: (id: string) => void;
}

const CartItem = ({item, onRemoveItem}: CartItemProps) => {
  const totalItem = item.preco * (item.qtdVendida || 0);

  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">{item.nome}</span>
        <span className="text-sm text-gray-500">
          {item.qtdVendida}x R$ {item.preco.toFixed(2).replace(".", ",")}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-bold text-amber-700 mr-2">
          R$ {totalItem.toFixed(2).replace(".", ",")}
        </span>
        <Button variant="ghost" size="icon" title="Remover 1 unidade">
          <span className="text-lg font-bold">-</span>
        </Button>
        <Button variant="danger" size="icon" title="Remover item" onClick={() => onRemoveItem(item.id)}>
          <span className="text-sm font-bold">X</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;