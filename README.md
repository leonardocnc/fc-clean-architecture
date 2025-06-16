# Clean Architecture TypeScript Project

Este projeto implementa um sistema completo seguindo os princípios de **Clean Architecture** (Arquitetura Limpa) usando TypeScript, com foco em domínios de **Customer** e **Product**.

## 📋 Descrição do Projeto

O projeto demonstra a implementação de uma arquitetura limpa com separação clara de responsabilidades, seguindo os princípios de Domain-Driven Design (DDD) e práticas de desenvolvimento orientado a testes (TDD).

## 🏗️ Estrutura da Arquitetura

```
src/
├── domain/           # Camada de Domínio
│   ├── @shared/      # Componentes compartilhados
│   ├── customer/     # Domínio do Cliente
│   └── product/      # Domínio do Produto
├── infrastructure/   # Camada de Infraestrutura
│   ├── api/          # API REST com Express
│   ├── customer/     # Repositórios de Cliente
│   └── product/      # Repositórios de Produto
└── usecase/          # Camada de Casos de Uso
    ├── customer/     # Casos de uso de Cliente
    └── product/      # Casos de uso de Produto
```

## 🎯 Funcionalidades Implementadas

### Customer (Cliente)
- ✅ Criar cliente
- ✅ Buscar cliente por ID
- ✅ Listar todos os clientes
- ✅ Atualizar dados do cliente
- ✅ Sistema de pontos de recompensa
- ✅ Validação de endereço

### Product (Produto)
- ✅ Criar produto
- ✅ Buscar produto por ID
- ✅ Listar todos os produtos
- ✅ Atualizar dados do produto
- ✅ Validação de preço e nome
- ✅ Factory pattern para diferentes tipos de produto

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Node.js** - Runtime
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados (em memória para testes)
- **Jest** - Framework de testes
- **SWC** - Compilador rápido para TypeScript
- **Yup** - Validação de esquemas
- **UUID** - Geração de identificadores únicos

## 📦 Instalação e Configuração

```bash
# Clone o repositório
git clone <repository-url>
cd fc-clean-architecture

# Instale as dependências
npm install

# Execute os testes
npm test

# Execute o servidor de desenvolvimento
npm run dev
```

## 🧪 Testes

O projeto possui cobertura completa de testes:

- **Testes Unitários**: Para entidades, casos de uso e serviços
- **Testes de Integração**: Para repositórios com banco de dados
- **Testes E2E**: Para APIs REST completas

```bash
# Executar todos os testes
npm test

# Executar testes específicos
npm test -- customer
npm test -- product
```

## 🌐 API Endpoints

### Customer Endpoints
```
POST   /customer     # Criar cliente
GET    /customer     # Listar clientes (JSON/XML)
```

### Product Endpoints
```
POST   /product      # Criar produto
GET    /product      # Listar produtos (JSON/XML)
```

## 📐 Padrões de Design Implementados

- **Factory Pattern**: Criação de entidades
- **Repository Pattern**: Abstração de acesso a dados
- **Observer Pattern**: Sistema de eventos de domínio
- **Notification Pattern**: Coleta de erros de validação
- **Use Case Pattern**: Lógica de aplicação isolada

## 🎨 Princípios Seguidos

### Clean Architecture
- **Independência de Frameworks**: Domínio não depende de frameworks externos
- **Testabilidade**: Todas as camadas são testáveis independentemente
- **Independência de UI**: Lógica não está acoplada à interface
- **Independência de Banco**: Domínio não conhece detalhes de persistência

### SOLID Principles
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

## 🔍 Destaques Técnicos

### Sistema de Notificações
- Coleta de múltiplos erros de validação
- Contexto específico para cada tipo de erro
- Propagação controlada de erros

### Event System
- Eventos de domínio desacoplados
- Handlers específicos para cada evento
- Sistema de dispatcher centralizado

### Validation Strategy
- Validação usando Yup
- Factory pattern para validators
- Validação em tempo de construção

## 📝 Exemplos de Uso

### Criar um Cliente
```bash
curl -X POST http://localhost:3000/customer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "address": {
      "street": "Main St",
      "number": 123,
      "zip": "12345",
      "city": "New York"
    }
  }'
```

### Criar um Produto
```bash
curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product A",
    "price": 29.99
  }'
```

## 🤝 Contribuição

Este projeto foi desenvolvido como parte de um desafio de arquitetura limpa, demonstrando:

- Separação clara de responsabilidades
- Testabilidade em todas as camadas
- Flexibilidade para mudanças
- Manutenibilidade do código
- Princípios de design sólidos

## 📚 Conceitos Demonstrados

- **Domain-Driven Design (DDD)**
- **Test-Driven Development (TDD)**
- **Clean Architecture**
- **SOLID Principles**
- **Design Patterns**
- **Event-Driven Architecture**
- **API RESTful**
- **Object-Relational Mapping (ORM)**

---

*Este projeto serve como referência para implementação de arquitetura limpa em aplicações TypeScript, demonstrando boas práticas de desenvolvimento e organização