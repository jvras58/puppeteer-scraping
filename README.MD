# Puppeteer - Sample

## 📖 Sobre o Projeto
Este projeto é um repositório base para execução de scraping de páginas web com o Puppeteer, utilizando Docker para facilitar a hospedagem e isolamento do ambiente.

## 🚀 Tecnologias e Ferramentas
O projeto foi criado em JavaScript (mas pode ser facilmente convertido para TypeScript) com o Puppeteer e utiliza um Dockerfile para simplificar o uso.

#### Bibliotecas e Tecnologias Utilizadas:
| Tecnologia           | Versão    |
|----------------------|-----------|
| **Runtime**           |           |
| Node                  | v18.x     |
| **Desenvolvimento**   |           |
| Docker Engine         | vXX.X.X   |
| Bundler               | v2.6.0    |

### Organização do Projeto

```
/
├─📁 .devcontainer     -> Configurações do ambiente de desenvolvimento (Devcontainer)
├─📁 docs              -> Artefatos de documentação
├──📁src
│   ├─🇯index.js            -> Arquivo principal para iniciar o scraping
│       ...
│   ├─📁scraping
│      ├─🇯scraper.js       ->  Funções de scraping específicas (e.g., pesquisa no Google)
│       ...
│   ├─📁utils             
│      ├─🇯fileManager.js   -> Funções para salvar capturas de tela, dados, etc.
│      ├─🇯logger.js        -> Logs e tratamento de erros
│       ...
├──📁 Config
│   ├─🇯browser.js          -> configurações do navegador
│   ├─🇯config.js           -> configurações do Puppeteer
│       ...
├─📁screenshots             -> Pasta onde as capturas de tela serão salvas
├─📁data                    -> Pasta para salvar dados coletados (Não implementado)
├── package.json            -> Configurações e dependências do projeto
├─📄 .gitignore             -> Arquivos e pastas ignorados pelo Git
├─📄 Makefile               -> Automação de tarefas
└─📄 README.md              -> Documentação do projeto (Este arquivo)
```

## 🛠️ Configuração do Ambiente de Desenvolvimento

Este repositório está configurado para rodar em um **Devcontainer** no VSCode. Siga os passos abaixo para instanciar o ambiente.

### Extensões Recomendadas

- **Nome**: Remote Development
- **Id**: `ms-vscode-remote.vscode-remote-extensionpack`
- **Descrição**: Pacote de extensões que permite abrir pastas em containers, máquinas remotas ou WSL com todas as funcionalidades do VSCode.
- **Versão**: 0.25.0
- [VSCode Marketplace Link](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

### Docker Engine

É necessário ter o Docker Engine instalado. Veja o guia de instalação para seu sistema operacional [aqui](https://docs.docker.com/engine/install/).

### Procedimento para Instanciar o Projeto no VSCode

1. Instale o pacote de extensões recomendadas.
2. Clone ou faça fork deste repositório.
3. Abra o diretório do projeto no VSCode.
4. Execute o comando _Dev Containers: Reopen in Container_ na paleta de comandos do VSCode (_F1, Ctrl+Shift+P_).

Após a configuração do Devcontainer, o VSCode abrirá o projeto dentro de um ambiente isolado, conforme definido no diretório **/.devcontainer**.

## 🚀 Iniciando a Aplicação

1. Para iniciar o scraping (instalar as dependências e configurar o ambiente):
    ```sh
    make scraping
    ```

### Gerenciamento de Dependências

1. Instale uma nova biblioteca:
    ```sh
    npm install <nome_da_lib>
    ```

## 📖 Caso Prefira sem o Devcontainer

Se você preferir configurar e executar o projeto sem usar o devcontainer, siga as instruções abaixo:

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 6 ou superior)
- Docker (opcional, se desejar usar o Docker para executar o Puppeteer)


### Executando o scraping

1. **Execute o scraping:**

    ```sh
    make scraping
    ```

2. **(Opcional) Execute o scraping usando Docker:**

    Se preferir usar Docker para isolar o ambiente de execução, você pode construir e executar o contêiner Docker:

    ```sh
    docker build -t puppeteer-scraping .
    docker run --rm -it puppeteer-scraping
    ```

### Personalização

O projeto está estruturado para facilitar a organização e expansão do código de scraping com o Puppeteer. Abaixo, indicamos os principais pontos onde você pode fazer ajustes e adicionar funcionalidades.

#### 1. Configurações Gerais

- As configurações principais do Puppeteer e as URLs de destino estão centralizadas no arquivo `src/config/config.js`. Você pode ajustar as opções do navegador, URLs e seletores aqui. Por exemplo:
  - **Modo de exibição**: Para ver o navegador em ação, altere a opção `headless` para `false` no objeto `PUPPETEER_OPTIONS`.
  - **URLs**: Modifique ou adicione URLs no objeto `URLS` para configurar novos destinos de scraping.

#### 2. Scripts de Scraping

- A lógica de scraping específica é definida no arquivo `src/scraping/scraper.js`. Cada função dentro deste arquivo realiza uma tarefa específica de scraping. Por exemplo:
  - **Função `performGoogleSearch`**: Realiza uma pesquisa no Google. Você pode duplicar e modificar essa função para incluir novos fluxos de scraping para outras páginas ou funcionalidades dentro do Google.

#### 3. Gerenciamento de Arquivos e Logs

- No diretório `src/utils`, você encontrará utilitários para salvar capturas de tela e gerenciar logs.
  - **Capturas de Tela**: A função `saveScreenshot` no arquivo `fileManager.js` salva capturas de tela na pasta `screenshots`. Para modificar o nome ou o local dos arquivos, ajuste a função ou os valores no arquivo `config.js`.
  - **Logs e Erros**: O `logger.js` oferece funções para centralizar logs de informações e erros, tornando o processo de depuração mais claro. Esses logs são acionados diretamente no `index.js`.

#### 4. Expansão com Novas Tarefas

- Para adicionar novos fluxos de scraping:
  1. Crie uma nova função no arquivo `scraper.js` ou crie um novo módulo (arquivo) para uma tarefa específica.
  2. Importe e chame as novas funções no `index.js` para orquestrar diferentes fluxos.