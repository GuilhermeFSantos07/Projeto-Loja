import { useState } from "react";
import { useAppContext, type Venda } from "../../context/AppContext"
import Button from "../components/Button";

const Relatorios = () => {
    const {vendasRealizadas} = useAppContext();
    const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);

    return(
        <main className="pt-32 pb-10 sm:px-6 w-full max-w-7xl mx-auto min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Relatório de Vendas</h2>
                <div className="hidden md:flex items-center justify-between px-4 pb- text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 mb-4 gap-4">
                    <span className="w-1/4">Data / Hora</span>
                    <span className="w-1/6">Itens</span>
                    <span className="w-1/6 text-center">Pagamento</span>
                    <span className="w-1/6 text-right">Total</span>
                    <span className="w-15 text-right">#</span>
                </div>
                <div className="flex flex-col gap-4">
                    {vendasRealizadas?.map((venda) => (
                        <div key={venda.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg gap-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                                <div className="w-full md:w-1/4">
                                    <span className="text-xs text-gray-500 font-bold uppercase md:hidden block">Data:</span>
                                    <span className="text-gray-900 font-medium">{venda.data}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-bold uppercase md:hidden block">Itens:</span>
                                    <span className="text-gray-700">
                                        {venda.itens.reduce((acc, item) => acc + item.qtdVendida, 0)}
                                    </span>
                                </div>
                                <div className="w-full md:w-1/6 text-left md:text-center">
                                    <span className="text-xs text-gray-500 font-bold uppercase md:hidden block">Pagamento:</span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase">
                                        {venda.metodoPagamento}
                                    </span>
                                </div>
                                <div className="w-full md:w-1/6 text-left md:text-right">
                                    <span className="text-xs text-gray-500 font-bold uppercase md:hidden block">Total:</span>
                                    <span className="font-bold text-green-700">R${venda.valorTotal.toFixed(2).replace(".", ",")}</span>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    variant="primary"
                                    size="icon"
                                    title="Ver Detalhes"
                                    onClick={() => setVendaSelecionada(venda)}
                                >
                                    <span className="font-bold">#</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                    {(!vendasRealizadas || vendasRealizadas.length === 0) && (
                        <div className="text-center text-gray-400 py-10 italic">Nenhuma venda realizada ainda</div>
                    )}
                </div>
            </div>
            {vendaSelecionada && (
                <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-mb bg-white rounded-mb p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Detalhes da venda {vendaSelecionada.id}</h3>
                        <p className="text-sm text-gray-500 mb-4">ID: {vendaSelecionada.id}</p>
                        <div>
                            {vendaSelecionada.itens.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm border-b border-gray-100 pb-1">
                                    <span>{item.qtdVendida}x {item.nome}</span>
                                    <span className="font-medium text-gray-600">R$ {(item.preco * item.qtdVendida).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        {vendaSelecionada.desconto > 0 && (
                            <div className="flex justify-between text-sm text-red-600 font-medium mb-2 border-b border-gray-100 pb-2">
                                <span>Desconto Aplicado:</span>
                                <span>- R$ {vendaSelecionada.desconto.toFixed(2).replace(".",",")}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-lg text-gray-900 mb-6">
                            <span>Total Pago:</span>
                            <span>R$ {vendaSelecionada.valorTotal.toFixed(2).replace(".",",")}</span>
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => setVendaSelecionada(null)}>
                            Fechar detalhes
                        </Button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Relatorios;