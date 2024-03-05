run:
	docker run -p 8080:80 -d -v $(shell pwd):/usr/share/nginx/html nginx