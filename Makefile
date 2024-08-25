build:
	docker-compose build

up:
	docker-compose up -d

ps:
	docker ps --filter name=prologix_

start:
	$(MAKE) up
	$(MAKE) ps

stop:
	docker rm -f $$(docker ps -q --filter name=prologix_)
