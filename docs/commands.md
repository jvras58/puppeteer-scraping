# Docker Compose - Comandos Úteis

## Comandos Básicos

### Executar o projeto (produção)
```bash
docker compose up --build
```

### Executar em background
```bash
docker compose up -d --build
```

### Executar apenas uma vez (sem restart automático)
```bash
docker compose run --rm sigaa-scraper
```

### Ver logs
```bash
docker-compose logs sigaa-scraper
docker-compose logs -f sigaa-scraper  # seguir logs em tempo real
```

### Parar os serviços
```bash
docker-compose down
```

### Reconstruir imagens (recomendado após mudanças)
```bash
docker-compose build --no-cache
```

## Desenvolvimento

### Executar em modo desenvolvimento
```bash
docker-compose --profile dev up --build
```

### Executar bash no container para debug
```bash
docker-compose exec sigaa-scraper bash
```

### Executar apenas o build (útil para testar compilação)
```bash
docker-compose build --target builder
```

## Limpeza

### Remover containers, volumes e imagens
```bash
docker-compose down -v --rmi all
```

### Limpar cache do Docker
```bash
docker system prune -a
```

## Estrutura de Diretórios

Após executar, os seguintes diretórios serão criados:
- `./output/` - Screenshots e arquivos gerados
- `./logs/` - Logs da aplicação

## Multi-Stage Build

O Dockerfile agora usa multi-stage build:
- **Stage 1 (builder)**: Instala todas as dependências e compila o TypeScript
- **Stage 2 (production)**: Imagem final otimizada apenas com runtime e dependências de produção

## Variáveis de Ambiente

Você pode criar um arquivo `.env` na raiz do projeto para personalizar as configurações:

```env
NODE_ENV=production
HEADLESS=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
```

## Troubleshooting

### Problema com pnpm-lock.yaml
Se encontrar problemas com dependências, tente:
```bash
# Limpar cache e recriar lock file
rm -rf node_modules pnpm-lock.yaml
pnpm install
docker compose build --no-cache
```