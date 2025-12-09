# Senai Parking Web

Sistema de gerenciamento de estacionamento desenvolvido em React.

## 🚀 Funcionalidades

- **Autenticação**: Login e cadastro de usuários com JWT
- **Gerenciamento de Vagas**: Visualização de vagas ocupadas em tempo real
- **Registro de Entrada**: Liberação de entrada de veículos
- **Registro de Saída**: Liberação de saída com cálculo automático de valor
- **Consulta de Veículos**: Busca por ID ou placa com histórico completo
- **Interface Responsiva**: Adaptada para desktop, tablet e mobile

## 🛠️ Tecnologias

- React 18
- React Router v6
- Styled Components
- Axios
- React Hot Toast
- React Feather Icons

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Build para produção
npm run build
```

## 🔗 API

A aplicação consome a API REST hospedada em:
`https://parkingapisenai.azurewebsites.net`

### Endpoints utilizados:

- `POST /auth/login` - Autenticação
- `POST /auth/register` - Cadastro de usuários
- `GET /api/veiculos` - Listar veículos ativos
- `POST /api/veiculos/entrada` - Registrar entrada
- `PUT /api/veiculos/saida` - Registrar saída
- `GET /api/veiculos/id/{id}` - Buscar por ID
- `GET /api/veiculos/placa/{placa}` - Buscar por placa

## 📱 Rotas

- `/` - Login
- `/cadastro` - Cadastro de usuário
- `/lista-vagas` - Lista de vagas ocupadas (protegida)
- `/entrada` - Registro de entrada (protegida)
- `/saida` - Registro de saída (protegida)
- `/consulta` - Consulta de veículos (protegida)

## 🎨 Design

- **Tema Dark**: Background preto (#000) com cards cinza (#1c1c1e)
- **Cores primárias**: Azul (#007BFF) para destaque
- **Gradientes**: Botões com gradiente azul/cinza
- **Responsivo**: Sidebar colapsável em mobile, fixa em desktop

## 📝 Licença

Este projeto é parte do programa educacional SENAI.
