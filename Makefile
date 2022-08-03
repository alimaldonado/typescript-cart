
#!/bin/bash

OS := $(shell uname)
DOCKER_BE = fastapi-shopping-server
UID = $(shell id -u)

help: ## Show this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

build: ## Rebuilds all the containers
	U_ID=${UID} docker-compose up --build -d

run: ## Start the containers
	U_ID=${UID} docker-compose up -d

stop: ## Stop the containers
	U_ID=${UID} docker-compose stop

ssh-be: ## ssh's into the be container
	U_ID=${UID} docker exec -it ${DOCKER_BE} bash

db-login: # logs into the PostreSQL server
	U_ID=${UID} docker-compose exec db psql -h localhost -U postgres --dbname=postgres

upgrade-db: ## runs migrations, use with precaution
	U_ID=${UID} docker exec -it ${DOCKER_BE} alembic upgrade head

downgrade-db: ## removes migrations, use with precaution
	U_ID=${UID} docker exec -it ${DOCKER_BE} alembic downgrade base

be-logs: # Shows the containers logs
	U_ID=${UID} docker-compose logs --follow

tests: # Runs existent tests
	U_ID=${UID} docker exec -it ${DOCKER_BE} pytest -v

pep: # Runs PEP8 Style standards
	U_ID=${UID} docker exec -it ${DOCKER_BE} autopep8 . --recursive --in-place --pep8-passes 2000 --verbose
