run:
	sudo gunicorn --chdir flask -b '0.0.0.0:80' server:app	
