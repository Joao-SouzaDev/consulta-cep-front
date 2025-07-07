# 📍 Consulta CEP - Frontend

Uma aplicação web moderna para consulta de CEPs.

## 🏗️ Estrutura do Projeto

```
consulta-cep-front/
├── .env                          # Variáveis de ambiente
├── index.js                      # Servidor Express principal
├── package.json                  # Dependências e scripts
├── README.md                     # Documentação
└── public/                       # Arquivos públicos servidos pelo servidor
    ├── index.html                # Página de listagem de CEPs
    ├── components/               # Componentes reutilizáveis
    │   └── header.html           # Cabeçalho da aplicação
    ├── css/                      # Estilos CSS
    │   ├── style.css             # Estilos gerais
    │   ├── consulta.css          # Estilos da página de consulta
    │   └── listagem.css          # Estilos da listagem de CEPs
    ├── pages/                    # Páginas da aplicação
    │   ├── index.html            # Página inicial alternativa
    │   └── consultar.html        # Página de consulta de CEP
    └── src/                      # Código JavaScript
        ├── comunicaAPI.js        # Comunicação com a API
        ├── config.js             # Gerenciamento de configurações
        ├── consulta.js           # Lógica da consulta
        ├── header.js             # Componente do cabeçalho
        ├── listaCep.js           # Listagem de CEPs consultados
        ├── localStorage.js       # Gerenciamento do localStorage
        └── navegacao.js          # Sistema de navegação
```

## � API Backend

Este frontend requer a API ConsultaCepAPI para funcionar corretamente.

**📍 Repositório da API**: [ConsultaCepAPI](https://github.com/Joao-SouzaDev/ConsultaCepAPI)

A API fornece endpoints para:
- Consulta de CEP por número
- Consulta de CEP por endereço (estado, cidade, logradouro)
- Integração com serviços externos de CEP

Para mais informações sobre instalação e configuração da API, consulte o repositório oficial.

## �🚀 Setup e Instalação

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** (vem com o Node.js)
- **API Backend** rodando (padrão: `http://localhost:8080`)
  - 📌 **API Repository**: [ConsultaCepAPI](https://github.com/Joao-SouzaDev/ConsultaCepAPI) 

### 1. Instalação das Dependências

```bash
cd consulta-cep-front
npm install
```

### 2. Configuração do Ambiente

Crie ou edite o arquivo `.env` na raiz do projeto:

```env
ENDERECO_API=http://localhost:8080/
```

**Variáveis disponíveis:**
- `ENDERECO_API`: URL base da API de consulta de CEP

### 3. Iniciando o Servidor

```bash
# Modo desenvolvimento (com auto-reload)
npm start

# Ou diretamente com Node.js
node index.js
```

O servidor estará disponível em: **http://localhost:3001**

## 🌐 Páginas da Aplicação

### 1. Página de Listagem (`/`)
- **Arquivo**: `public/index.html`
- **Funcionalidade**: Exibe todos os CEPs consultados anteriormente
- **Armazenamento**: Utiliza localStorage para persistir dados
- **Estilo**: Design moderno com cards animados e responsivos

### 2. Página de Consulta (`/consultar`)
- **Arquivo**: `public/pages/consultar.html`
- **Funcionalidade**: Formulário para consultar novos CEPs
- **Tipos de consulta**:
  - Por CEP (formato: 12345-678)
  - Por endereço (estado + cidade + logradouro)

## 🔧 Módulos JavaScript

### `comunicaAPI.js`
Responsável pela comunicação com a API backend.

```javascript
import { consultaApi } from './src/comunicaAPI.js';

// Consulta por CEP
const resultado = await consultaApi('01234-567');

// Consulta por endereço
const resultado = await consultaApi(null, 'SP', 'São Paulo', 'Rua das Flores');
```

### `config.js`
Gerencia as configurações do ambiente de forma dinâmica.

```javascript
import { getApiUrl, getConfig } from './src/config.js';

// Obter URL da API
const apiUrl = await getApiUrl();

// Obter qualquer configuração
const config = await getConfig('ENDERECO_API');
```

### `localStorage.js`
Gerencia o armazenamento local dos CEPs consultados.

```javascript
import { 
    salvaListaCepLocalStorage, 
    buscaListaCepLocalStorage 
} from './src/localStorage.js';

// Salvar CEP
salvaListaCepLocalStorage(dadosCep);

// Buscar CEPs salvos
const ceps = buscaListaCepLocalStorage();
```

## 🎨 Estilos e Design

### Sistema de CSS Modular

1. **`style.css`**: Estilos globais, navbar e animações gerais
2. **`consulta.css`**: Estilos específicos da página de consulta
3. **`listagem.css`**: Estilos específicos da listagem de CEPs

### Framework e Bibliotecas

- **Bootstrap 5.3.0**: Sistema de grid e componentes
- **Font Awesome 6.0**: Ícones vetoriais
- **CSS Grid**: Layout avançado da listagem
- **Flexbox**: Alinhamentos e distribuição

## 🔌 API Integration

### Configuração Dinâmica

A aplicação utiliza um sistema de configuração dinâmica que:

1. **Carrega configurações** do servidor via `/api/config`
2. **Fallback automático** para valores padrão em caso de erro
3. **Cache de configurações** para melhor performance
4. **Suporte a variáveis de ambiente** via arquivo `.env`

### Endpoints Utilizados

```javascript
// Consulta por CEP
GET ${ENDERECO_API}cep/{cep}

// Consulta por endereço  
GET ${ENDERECO_API}cep?estado={estado}&cidade={cidade}&logradouro={logradouro}
```

## 📱 Funcionalidades

### Listagem de CEPs
- 📋 Exibe CEPs consultados em formato de cards
- 🔄 Atualização automática ao consultar novos CEPs
- 💾 Persistência local usando localStorage
- 🎨 Design moderno com animações

### Consulta de CEPs
- 🔍 Busca por CEP ou endereço completo
- ✅ Validação de formulários
- 📱 Interface responsiva
- 🚀 Integração com API backend

### Navegação
- 🧭 Sistema de roteamento simples
- 📄 Páginas estáticas servidas pelo Express
- 🔗 Links diretos para cada funcionalidade

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de CORS**
   - Verifique se a API backend está configurada para aceitar requisições do frontend
   - URL padrão: `http://localhost:3001`

2. **API não encontrada**
   - Verifique se a variável `ENDERECO_API` está correta no `.env`
   - Confirme se a API backend está rodando

3. **Módulos não encontrados**
   - Execute `npm install` para instalar dependências
   - Verifique se o Node.js está atualizado

4. **Porta em uso**
   - A aplicação roda na porta 3001 por padrão
   - Altere a porta no `index.js` se necessário

## 🔄 Scripts Disponíveis

```bash
# Iniciar em modo desenvolvimento (com nodemon)
npm start

# Instalar dependências
npm install

## 📝 Notas de Desenvolvimento

- O projeto utiliza **ES6 modules** no frontend
- **Express.js** serve os arquivos estáticos
- **Dotenv** carrega variáveis de ambiente
- **Nodemon** para auto-reload em desenvolvimento
- Sistema de **configuração dinâmica** para diferentes ambientes