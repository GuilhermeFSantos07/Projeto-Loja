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
                <div className="min-w-175 grid grid-cols-[1.5fr_1fr_1.5fr_1fr_60px] gap-4 px-4 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 mb-4">
                    <span>Data / Hora</span>
                    <span>Itens</span>
                    <span>Pagamento</span>
                    <span>Total</span>
                    <span className="text-right">Ação</span>
                </div>
                <div className="min-w-175 flex flex-col gap-3">
                    {vendasRealizadas?.map((venda) => (
                        <div key={venda.id} className="grid grid-cols-[1.5fr_1fr_1.5fr_1fr_60px] gap-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg items-center">
                            <span className="text-gray-900 font-medium text-sm">{venda.data}</span>
                            <span className="text-gray-700">
                                {venda.itens.reduce((acc, item) => acc +item.qtdVendida, 0)} un
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase w-max">
                                {venda.metodoPagamento.replace('-', ' ')}
                            </span>
                            <span className="font-bold text-green-700">
                                R$ {venda.valorTotal.toFixed(2).replace(".",",")}
                            </span>
                            <div className="flex justify-end">
                                <Button variant="primary" size="icon" title="Ver Detalhes" onClick={() => setVendaSelecionada(venda)}>
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
                    <div className="w-full max-w-90 min-h-90 bg-white rounded-xl p-6 shadow-2xl flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Detalhes da venda {vendaSelecionada.id}</h3>
                        <p className="text-sm text-gray-500 mb-4">ID: {vendaSelecionada.id}</p>
                        <div className="flex flex-col gap-3 mb-auto max-h-50 overflow-y-auto pr-1">
                            {vendaSelecionada.itens.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm border-b border-gray-100 pb-1">
                                    <span>{item.qtdVendida}x {item.nome}</span>
                                    <span className="font-medium text-gray-600">R$ {(item.preco * item.qtdVendida).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            {vendaSelecionada.desconto > 0 && (
                                <div className="flex justify-between text-sm text-red-600 font-medium mb-1">
                                    <span>Desconto:</span>
                                    <span>- R$ {vendaSelecionada.desconto.toFixed(2).replace(".",",")}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-lg text-gray-900 mb-6">
                                <span>Total Pago:</span>
                                <span>R$ {vendaSelecionada.valorTotal.toFixed(2).replace(".",",")}</span>
                            </div>
                            <Button variant="outline" className="w-full" onClick={() => setVendaSelecionada(null)}>
                                Fechar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Relatorios;