import type { ItemVenda } from "../../context/AppContext";
import Button from "./Button";

interface CartItemProps {
  item: ItemVenda;
  onRemoveItem: (id: string) => void;
  onAlterarQtd: (id: string, delta: number) => void;
}

const CartItem = ({item, onRemoveItem, onAlterarQtd}: CartItemProps) => {
  const totalItem = item.preco * (item.qtdVendida || 0);

  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">{item.nome}</span>
        <span className="text-sm text-gray-500">
          R$ {item.preco.toFixed(2).replace(".", ",")}
        </span>
      </div>
      
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded pc-2 py-1">
          <Button variant="danger" size="icon" title="Remover und" onClick={() => onAlterarQtd(item.id, -1)}>-</Button>
          <span className="text-sm font-semibold w-4 text-center">{item.qtdVendida}</span>
          <Button variant="success" size="icon" title="Adicionar und" onClick={() => onAlterarQtd(item.id, 1)}>+</Button>
        </div>
        <span className="font-bold text-amber-700 mr-2">
          R$ {totalItem.toFixed(2).replace(".", ",")}
        </span>
        <Button variant="danger" size="icon" title="Remover item" onClick={() => onRemoveItem(item.id)}
          >X</Button>
      </div>
    </div>
  );
};

export default CartItem;