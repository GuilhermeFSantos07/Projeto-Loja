import { useState } from "react"
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";

const CadastroAtualizacao = () => {
    const [tipoCadastro, setTipoCadastro] = useState("produto");
    const tipoOpitions = [
        {value: "produto", label: "Produto"},
        {value: "servico", label: "Serviço"},
    ];

    return (
        <main className="pt-32 pb-10 px-4 sm:px-6 w-full max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
                <section className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 text-center lg:text-left">
                        Cadastro
                    </h2>
                    <div className="flex flex-col gap-4">
                        <Input label="Nome:" placeholder="Ex: Relogio..."/>
                        <Input label="Preço:" type="number" placeholder="R$ 0,00"/>
                        <Select
                            label="Tipo: "
                            options={tipoOpitions}
                            value={tipoCadastro}
                            onChange={(e) => setTipoCadastro(e.target.value)}
                        />
                        {tipoCadastro === "produto" && (
                            <Input label="Quantidade inicial:" type="number" min={0} defaultValue={0}/>
                        )}
                        <div className="mt-4 flex justify-center">
                            <Button variant="primary" size="lg" className="w-full sm:w-1/2 rounded-full">
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-100">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 text-center lg:text-left">
                        Atualização
                    </h2>
                    <div className="flex gap-2 items-end">
                        <div className="flex-1">
                            <Input label="ID ou Nome:" placeholder="Busque para atualizar..."/>
                        </div>
                        <Button variant="outline" className="rounded-full px-6">
                            Buscar
                        </Button>
                    </div>
                    <div className="flex-1 bg-gray-50 border border-dashed border-gray-300 rounded-mb flex items-center justify-center p-6 text-center text-gray-500">
                        <p>Busque um item acima para carregar os dados</p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CadastroAtualizacao;