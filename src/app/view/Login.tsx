import {useState} from "react"
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(false)

    const {fazerLogin} = useAppContext();
    const navigete = useNavigate();

    const handleEntrar = (e: React.FormEvent) => {
        e.preventDefault();
        const sucesso = fazerLogin (username, senha);

        if (sucesso) {
            navigete ("/vendas");
        } else {
            setErro(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-amber-700 mb-2">Relojoaria Saimon</h1>
                    <p className="text-gray-500 text-sm">Faça login para acessar o sistema</p>
                </div>
                <form onSubmit={handleEntrar} className="flex flex-col gap-5">
                    <Input
                        label="Usuário"
                        placeholder="Digite seu username..."
                        value={username}
                        onChange={(e) => {setUsername(e.target.value); setErro(false);}}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        value={senha}
                        onChange={(e) => {setSenha(e.target.value); setErro(false);}}
                    />
                    {erro && (
                        <p className="text-red-500 text-sm font-medium text-center">
                            Usuário ou senha incorretos.
                        </p>
                    )}
                    <Button variant="primary" size="lg" className="w-full mt-2" type="submit">
                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;