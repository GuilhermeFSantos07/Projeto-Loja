import { useState } from "react"
import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";

const GerenciamentoUsuarios = () => {
    const [nome, setNome] = useState("");
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const [cargo, setCargo] = useState("vendedor");

    const handleCriar = async () => {
        try{
            const res = await fetch ('http://localhost:5000/api/auth/registrar', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({nome, username: user, senha, cargo})
            })

            if(res.ok){
                alert(`Usuário ${nome} criado com sucesso no banco de dados`);
                setNome(""); setUser(""); setSenha(""); setCargo("vendedor");
            }else{
                const err = await res.json();
                alert(`Erro ao criar: ${err.message || "Falha na requisição"}`);
            }
        }catch(error){
            console.error(error);
            alert("Erro de conexão com o servidor");
        }
    };

    return(
        <main className="pt-32 pb-10 px-4 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Criar Novo Acesso</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Nome Completo" value={nome} onChange={e => setNome(e.target.value)} />
                    <Input label="Username (Login)" value={user} onChange={e => setUser(e.target.value)} />
                    <Input label="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                    <Select 
                        label="Cargo / Permissão" 
                        value={cargo} 
                        onChange={e => setCargo(e.target.value)}
                        options={[
                            { value: 'vendedor', label: 'Vendedor (Vendas e Estoque)' },
                            { value: 'gerente', label: 'Gerente/Sócio (Tudo, exceto usuários)' },
                            { value: 'dev', label: 'Desenvolvedor (Acesso Total)' },
                        ]}
                    />
                </div>
                <Button variant="primary" className="mt-6 w-full md:w-auto px-8" onClick={handleCriar}>
                    Salvar Novo Usuário
                </Button>
            </div>
        </main>
    )
}

export default GerenciamentoUsuarios;