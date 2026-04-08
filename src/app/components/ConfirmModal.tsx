import Button from "./Button";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({isOpen, title, message, onConfirm, onCancel}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-md bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{message}</p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={onConfirm}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;