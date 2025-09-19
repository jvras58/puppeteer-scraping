SHEll := /bin/zsh


scraping-dev:
	@echo "install dependencies"
	pnpm install
	@echo "Scraping data from the web"
	pnpm run dev

scraping-docker:
	@echo "Building Docker image..."
	docker compose up --build
	@echo "Finalizado Scraping com Docker verificar logs com o comando: make logs ..."

logs:
	@echo "Exibindo logs do container..."
	docker-compose logs sigaa-scraper

clean:
	@echo "Parando e removendo containers, redes e volumes..."
	docker-compose down -v
	@echo "Removendo imagens não utilizadas..."
	docker image prune -f
	@echo "Limpando arquivos temporários..."
	rm -rf output logs/*.log
	@echo "Limpeza concluída."

help:
	@echo "Makefile - Comandos disponíveis:"
	@echo "  scraping-dev       - Executa o scraper em modo de desenvolvimento"
	@echo "  scraping-docker    - Executa o scraper dentro de um container Docker"
	@echo "  logs               - Exibe os logs do container Docker"
	@echo "  clean              - Limpa containers, imagens e arquivos temporários"
	@echo "  help               - Exibe esta mensagem de ajuda"
	@echo ""
	@echo "Para mais detalhes sobre Docker Compose, veja: docs/commands.md"
