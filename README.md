# 🍰 API de Gestão para Confeitaria Artesanal

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


## 📖 Sobre o Projeto

Este projeto consiste no **Backend (API RESTful)** desenvolvido para solucionar dores de gestão de uma confeitaria artesanal. O sistema atua como o motor de inteligência do negócio, centralizando a lógica de **precificação automática**, **controle de estoque em tempo real** e **análise financeira**.

Desenvolvido como parte da avaliação da disciplina de **Banco de Dados NoSQL** do curso de Sistemas de Informação da **UNEX**.

### 🎯 Problemas Solucionados
1.  **Precificação:** Automatização do cálculo de custo do produto (`Catalogo`) baseado na soma dos custos dos ingredientes (`Insumos`) e quantidades da receita.
2.  **Gestão de Estoque:** Baixa automática e atômica dos insumos no momento da venda, evitando erros manuais.
3.  **Integridade Financeira:** Implementação de *Snapshot* de preço nas vendas, garantindo que relatórios históricos não sejam alterados por mudanças de preço futuras.
4.  **Visibilidade de Lucro:** Geração de balanço mensal com cálculo automático de Receita, Custo Variável, Lucro Líquido e Margem %.

---

## 🚀 Tecnologias e Arquitetura

O projeto segue a arquitetura **MSC (Model-Service-Controller)** para garantir separação de responsabilidades e escalabilidade.

* **Node.js & Express**: Servidor web e roteamento.
* **MongoDB & Mongoose**: Persistência de dados NoSQL, modelagem de Schemas e *Virtuals*.
* **CommonJS**: Padrão de módulos adotado.
* **Cors**: Segurança para integração com Front-end.

---

## 📦 Estrutura do Projeto

```bash
src/
├── controllers/   # Camada de Interface (Gerencia Req/Res HTTP)
│   ├── BalancoController.js
│   ├── CatalogoController.js
│   ├── EncomendaController.js
│   └── InsumoController.js
├── services/      # Camada de Negócio (Lógica, Cálculos, Regras)
│   ├── BalancoService.js
│   ├── CatalogoService.js
│   ├── EncomendaService.js
│   └── InsumoService.js
├── models/        # Camada de Dados (Schemas do Mongoose)
│   ├── CatalogoModel.js
│   ├── EncomendaModel.js
│   └── InsumoModel.js
├── routes/        # Definição dos Endpoints
└── database.js    # Conexão com o Banco de Dados
````

-----

## 🛠️ Instalação e Execução

### Pré-requisitos

  * Node.js (v18 ou superior)
  * MongoDB (Instalado localmente ou Cluster Atlas)

### 1\. Clonar o repositório

```bash
git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/joaopinn/GestaoDeConfeitaria.git)
cd GestaoDeConfeitaria
```

### 2\. Instalar as dependências

```bash
npm install
```

### 3\. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto seguindo o modelo:

```env
PORT=3000
# Exemplo local:
MONGO_URI=mongodb://localhost:27017/confeitaria
# Ou Exemplo Atlas:
# MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/confeitaria
```

### 4\. Rodar a Aplicação

```bash
# Modo de Desenvolvimento (com Nodemon)
npm run dev

# Modo de Produção
npm start
```

O servidor estará rodando em: `http://localhost:3000`

-----

## 📚 Documentação da API

### 🥛 Módulo: Insumos (Estoque)

Gerencia a matéria-prima (ex: Farinha, Leite, Ovos).

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/insumos` | Lista todos os insumos cadastrados. |
| `GET` | `/api/insumos/:id` | Busca detalhes de um insumo específico. |
| `POST` | `/api/insumos` | Cria um novo insumo. |
| `PUT` | `/api/insumos/:id` | Atualiza dados cadastrais do insumo. |
| `PATCH` | `/api/insumos/:id/estoque` | Atualiza apenas a quantidade em estoque. |
| `DELETE`| `/api/insumos/:id` | Remove (ou inativa) um insumo. |

### 🎂 Módulo: Catálogo (Produtos)

Gerencia os bolos e doces à venda. **O custo é calculado automaticamente.**

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/catalogo` | Lista os produtos ativos no cardápio. |
| `GET` | `/api/catalogo/:id` | Busca produto pelo ID. |
| `POST` | `/api/catalogo` | Cria produto com ficha técnica (Receita). |
| `PUT` | `/api/catalogo/:id` | Atualiza produto e recalcula custo de produção. |
| `DELETE`| `/api/catalogo/:id` | Remove (inativa) o produto do cardápio. |

### 📦 Módulo: Encomendas (Vendas)

Registra vendas e movimenta o estoque.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/encomendas` | **(Principal)** Registra venda, calcula total, grava snapshot de preço e baixa estoque dos insumos. |
| `GET` | `/api/encomendas` | Lista todas as encomendas (aceita filtro `?status=PENDENTE`). |
| `PUT` | `/api/encomendas/:id/status` | Atualiza o andamento (`EM_PRODUCAO`, `ENTREGUE`, etc). |

### 📊 Módulo: Balanço (Dashboard)

Inteligência financeira.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/balanco` | Retorna JSON consolidado com Receita, Custo, Lucro, Margem e KPIs. <br> **Query Params:** `?mes=12&ano=2025` |

-----

## 🎓 Integrantes (Discentes)

<table> <tr> <td align="center"> <a href="https://www.google.com/search?q=https://github.com/CarlosH-Santiago"> <img src="img/Carlos_H.jpeg" width="100px;" alt="Foto do Carlos Henrique"/>


<sub> <b>Carlos Henrique de S S Santiago</b> </sub> </a> </td> <td align="center"> <a href="https://www.google.com/search?q=https://github.com/joaopin"> <img src="img/Joao_pin.jpeg" width="100px;" alt="Foto do João Guilherme"/>


<sub> <b>João Guilherme P Gonçcalves</b> </sub> </a> </td> </tr> </table>

