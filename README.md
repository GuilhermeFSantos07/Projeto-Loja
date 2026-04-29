# Site de Gestão de Vendas e Estoque (React TypeScript)

Este é um projeto com a intenção de praticar o desenvolvimento web com uma solução para um problema real: solucionar a falta de monitoramento de estoque e vendas de uma loja de comercio.

O site é capaz de realizar cadastro e atualização de produtos (que contém estoque) e serviços (que não tem estoque), listar todos os produtos e serviços cadastrados, realizar vendas salvando a forma de pagamento e retirando automaticamente do estoque, listar o historico de vendas com todas as informações da venda e cadastrar novos logins separados por categorias: dev (que tem acesso a todas as paginas e pode cadastrar novos logins), gerente (que não tem acesso somente a pagina de cadastro de novos logins) e vendedor (que tem acesso somente as paginas de vendas e lista de produtos).

## 🛠️ Tecnologias e Conceitos Utilizados

### Front-End
* **React + TypeScript + Vite**.
* **Tailwind Css**.
* **Tailwind Variants**

### Back-End
* **Node.Js**.
* **Mongo.DB**.
* **Mongoose**.
[Repositorio do back-end](https://github.com/GuilhermeFSantos07/Projeto-Loja-API).

### Conceitos
* **Teste de software no back-end**
* **Criação de componentes**
Também tentei incluir conceitos de versionamento usando o git, assim como o rastreamento de atividades usando o [Jira](https://guilhermefsantos01702.atlassian.net/jira/software/projects/KAN/list?jql=project+%3D+KAN+ORDER+BY+cf%5B10019%5D+ASC&atlOrigin=eyJpIjoiNWJmNDU0OWNiNWMzNDQyNTk4OGY3N2RkMDA4NDg5NjYiLCJwIjoiaiJ9).

## 📋 Funcionalidades

1.  **Login:** Tela de Login dos usuários (cada pessoa gera 1 token que dura um dia, após isso precisa ser feito um novo login).
<img width="1920" height="1080" alt="Captura de tela 2026-04-28 143443" src="https://github.com/user-attachments/assets/b5998d4e-6aac-46c2-9a79-bac1002e5e0b" />

---

2.  **Cadastro e Atualizações:** Suporta tanto Produtos (com baixa de estoque) quanto Serviços e com a possibilidade de edição de ambos.
<img width="1920" height="1080" alt="Captura de tela 2026-04-28 143406" src="https://github.com/user-attachments/assets/8263af6f-3e18-4c66-a768-a884e436e753" />

---

3.  **Vendas:** Funciona como um carrinho de vendas:
    * Verifica disponibilidade de estoque para produtos.
    * Incrementa contador de vendas.
    * Remove o produto caso necessário
    * Aplica desconto
    * Salva a forma de pagamento
<img width="1920" height="1080" alt="Captura de tela 2026-04-28 143318" src="https://github.com/user-attachments/assets/e3b6fb8c-da01-46da-91e9-e45452ea7b15" />

---

4.  **Lista de Produtos:** Mostra as informações do produto ou serviço e também os botões para editar (encaminhando direto para a aba de edição) e remover.
<img width="1920" height="1080" alt="Captura de tela 2026-04-28 143337" src="https://github.com/user-attachments/assets/b91f0cc0-3541-4209-9620-b9c4bc212ea9" />

---

5.  **Relatórios:** Exibe as vendas realizadas com algumas informações básicas e um botão para mais detalhes.
<img width="1920" height="1080" alt="Captura de tela 2026-04-28 143415" src="https://github.com/user-attachments/assets/3518f12b-3126-48f1-b7ef-1848319d865b" />

---

6.  **Config. Login:** (Exclusivo do cargo dev) Permite criar novos logins.
<img width="1920" height="1080" alt="Captura de tela 2026-04-28 143422" src="https://github.com/user-attachments/assets/eaf39b86-2be3-4238-aafe-f6f8c9aa1a6e" />
