# Installation
### Perquisites 
- Python v3.7
- PIP 
- Redis 
- PostgresSQL or SQlite
- NodeJS v10.15.3
- NPM v6.4.1
- Angular 7

### Dependency installtion steps
##### Redis 

-  [MAC](http://www.codebind.com/mac-osx/install-redis-mac-osx/ "MAC")
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04 "Ubuntu")
- [Windows](https://redislabs.com/blog/redis-on-windows-8-1-and-previous-versions/ "Windows")

##### Postgres (Can skip - Django uses SQlite)
- [All Paltforms (config db as  name:'database',username:'username',password:'password' ](https://tutorial-extensions.djangogirls.org/en/optional_postgresql_installation/)

**Note** : To use Postgres DB navigate ./Task/settings.py comment sqlite config and uncomment postgreas config. 

##### Python 
- [Insatll version 3.7 or 3.6](https://www.python.org/downloads/ "Insatll version 3.6 and above")

##### PIP
- [MAC and Linux](https://www.codingforentrepreneurs.com/blog/install-django-on-mac-or-linux "MAC and Linux") ( sudo easy_install pip )
- [Windows](https://www.liquidweb.com/kb/install-pip-windows/ "Windows")

##### Virtualenv
- pip install virtualenv
**Note** : Alternatively we can use pipenv

### Local Setup


------------

 - git clone https://github.com/Dileep9999/Adultdatasets.git
 - cd Adultdatasets
 - python3 -m virtualenv env OR pipenv install 
 - source ./env/bin/activate OR pipenv shell
 - pip install -r requirements.txt
 - python manage.py migrate
 - python manage.py load_data --path ./adult_dataset.csv  (Give it 30-60 sec to dump csv data to db)
 - python manage.py runserver
 - open http://localhost:8000/
 
**Note** : UI is built with Angular 7 into static/js folder with prod config (./Frontend/)






*
