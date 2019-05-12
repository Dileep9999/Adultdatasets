#Make file
.PHONY : clearscr fresh clean all
test:
	echo "Hello World"

run:
	python manage.py migrate
	python manage.py runserver

load:
	python manage.py load_data --path ./adult_dataset.csv

build_ui:
	cd Frontend
	npm i && ng build --prod --output-path ../static/js --output-hashing none