# 🎯 # Puppeteer - Scrapping

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-24.x-orange?logo=puppeteer)](https://pptr.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-yellow?logo=pnpm)](https://pnpm.io/)

*Automação inteligente para captura utilizando Puppeteer*

</div>

## 📖 Sobre o Projeto

Este projeto demonstra como utilizar o **Puppeteer** para automação web, especificamente focado em:

- 🎓 **Captura automatizada de sessão do SIGAA** (Sistema Integrado de Gestão de Atividades Acadêmicas)
- 📸 **Screenshots automáticos** de páginas importantes
- 🔐 **Login automatizado** com credenciais configuráveis
- 📊 **Coleta de dados acadêmicos** de forma programática
- 🐳 **Containerização completa** com Docker para ambientes isolados

### ✨ Funcionalidades

- ✅ Navegação automatizada no SIGAA
- ✅ Captura de tela da página de login
- ✅ Login automático com credenciais
- ✅ Captura de tela pós-login
- ✅ Logs estruturados com timestamps
- ✅ Gerenciamento de arquivos e screenshots
- ✅ Execução em container Docker isolado

## 🚀 Tecnologias e Ferramentas

### 🔧 Stack Principal

| Categoria | Tecnologia | Versão | Descrição |
|-----------|------------|--------|-----------|
| **Runtime** | Node.js | v20.x | Ambiente de execução JavaScript |
| **Linguagem** | TypeScript | 5.x | Tipagem estática para JavaScript |
| **Automação** | Puppeteer | 24.x | Controle programático do navegador |
| **Containerização** | Docker | Latest | Isolamento e portabilidade |
| **Gerenciador** | pnpm | 9.x | Gerenciamento eficiente de pacotes |

### 📦 Dependências

```json
{
  "dependencies": {
    "puppeteer": "24.22.0"
  },
  "devDependencies": {
    "@types/node": "^24.5.2",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  }
}
```

## 📁 Estrutura do Projeto

```
captura_session_sigaa_pup/
├─📁 src/                          # Código fonte principal
│   ├─� index.ts                  # Ponto de entrada da aplicação
│   ├─📁 config/                   # Configurações
│   │   ├─📄 browser.ts            # Configurações do navegador Puppeteer
│   │   └─📄 config.ts             # Configurações gerais da aplicação
│   ├─📁 scraping/                 # Módulos de scraping
│   │   └─📄 scraper.ts            # Funções específicas do SIGAA
│   └─📁 utils/                    # Utilitários
│       ├─📄 fileManager.ts        # Gerenciamento de arquivos e screenshots
│       └─📄 logger.ts             # Sistema de logs estruturado
├─📁 docs/                         # Documentação
│   ├─📄 CHECKLIST.MD              # Lista de verificação do projeto
│   └─📄 commands.md               # Comandos Docker úteis
├─📁 output/                       # Screenshots e arquivos gerados
├─📁 logs/                         # Logs da aplicação
├─📄 Dockerfile                    # Configuração multi-stage do container
├─📄 compose.yml                   # Orquestração Docker Compose
├─📄 makefile                      # Automação de tarefas
├─📄 package.json                  # Configurações e dependências
├─📄 tsconfig.json                 # Configurações TypeScript
└─📄 README.md                     # Este arquivo
```

## ⚡ Início Rápido

### 🐳 Usando Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/jvras58/captura_session_sigaa_pup.git
cd captura_session_sigaa_pup

# Execute com Docker Compose
make scraping-docker

# Ou manualmente
docker-compose up --build
```

### 💻 Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/jvras58/captura_session_sigaa_pup.git
cd captura_session_sigaa_pup

# Instale as dependências
pnpm install

# Execute em modo desenvolvimento
make scraping-dev

# Ou manualmente
pnpm run dev
```

## 🛠️ Comandos Disponíveis

### 📋 Makefile

| Comando | Descrição |
|---------|-----------|
| `make scraping-dev` | Executa o scraper em modo desenvolvimento |
| `make scraping-docker` | Executa o scraper em container Docker |
| `make logs` | Exibe logs do container |
| `make clean` | Limpa containers, volumes e arquivos temporários |
| `make help` | Exibe todos os comandos disponíveis |

### 🐳 Docker Compose

```bash
# Produção
docker-compose up --build

# Desenvolvimento (com hot reload)
docker-compose --profile dev up --build

# Background
docker-compose up -d --build

# Logs em tempo real
docker-compose logs -f sigaa-scraper

# Limpeza completa
docker-compose down -v --rmi all
```

### 📦 pnpm Scripts

```bash
pnpm run dev     # Desenvolvimento com tsx
pnpm run build   # Compilar TypeScript
pnpm run start   # Executar versão compilada
```

## 🏗️ Configuração do Ambiente

### 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações da aplicação
NODE_ENV=production
HEADLESS=true

# Configurações do Puppeteer
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
CHROME_BIN=/usr/bin/chromium
CHROME_PATH=/usr/lib/chromium/
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_PRODUCT=chrome
CHROMIUM_FLAGS=--disable-software-rasterizer --disable-dev-shm-usage

# Credenciais SIGAA (configure conforme necessário)
SIGAA_USERNAME=seu_usuario
SIGAA_PASSWORD=sua_senha
```

### 🐳 Docker Multi-Stage Build

O projeto utiliza **multi-stage build** para otimização:

- **Stage 1 (builder)**: Instala dependências completas e compila TypeScript
- **Stage 2 (production)**: Imagem final otimizada apenas com runtime

## 🔧 Desenvolvimento

### 📋 Pré-requisitos

- **Node.js** 20.x ou superior
- **pnpm** 9.x ou superior
- **Docker** (opcional, mas recomendado)
- **Git** para controle de versão

### 🏃‍♂️ Executando Localmente

1. **Clone e instale dependências:**
   ```bash
   git clone <repo-url>
   cd captura_session_sigaa_pup
   pnpm install
   ```

2. **Configure as credenciais** em `src/index.ts` ou variáveis de ambiente

3. **Execute em desenvolvimento:**
   ```bash
   pnpm run dev
   ```

### � Desenvolvimento com Docker

```bash
# Modo desenvolvimento com hot reload
docker-compose --profile dev up --build

# Debug dentro do container
docker-compose exec sigaa-scraper bash
```

## 📸 Saídas do Sistema

### 🖼️ Screenshots Gerados

- `sigaa_login_inicial.png` - Página de login antes da autenticação
- `sigaa_tela_inicial.png` - Tela inicial após login bem-sucedido

### 📝 Logs

Os logs são estruturados e incluem:
- Timestamps precisos
- Níveis de log (INFO, ERROR)
- Mensagens descritivas das ações

## 🚨 Solução de Problemas

### ❌ Erro: `tsc: not found`
```bash
# Reconstrua com cache limpo
docker-compose build --no-cache
```

### ❌ Erro: `pnpm-lock.yaml` issues
```bash
# Limpe e reinstale dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
docker-compose build --no-cache
```

### ❌ Container não inicia
```bash
# Verifique logs detalhados
docker-compose logs -f sigaa-scraper

# Limpe recursos Docker
make clean
```

## 🛡️ Segurança

⚠️ **IMPORTANTE**: Este projeto é apenas para fins educacionais e de demonstração.

- 🔐 **Nunca commite credenciais** no código
- 🔒 Use variáveis de ambiente para dados sensíveis
- ⚖️ Respeite os termos de uso dos sistemas automatizados
- 🤖 Implemente rate limiting em ambientes de produção

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autor

**jvras58** - [GitHub](https://github.com/jvras58)

---

<div align="center">

**⭐ Se este projeto foi útil para você, deixe uma estrela!**

[🐛 Reportar Bug](https://github.com/jvras58/captura_session_sigaa_pup/issues) • [✨ Solicitar Feature](https://github.com/jvras58/captura_session_sigaa_pup/issues) • [📖 Documentação](./docs/)

</div>

