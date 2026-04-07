import Button from "./Button";

interface CartItemProps {
  onRemoveItem: () => void;
}

const CartItem = ({onRemoveItem}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">Relógio Casio Prata</span>
        <span className="text-sm text-gray-500">2x R$ 150,00</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-bold text-amber-700 mr-2">R$ 300,00</span>
        <Button variant="ghost" size="icon" title="Remover 1 unidade">
          <span className="text-lg font-bold">-</span>
        </Button>
        <Button variant="danger" size="icon" title="Remover item" onClick={onRemoveItem}>
          <span className="text-sm font-bold">X</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;