# Environment Information (anaconda Environment)
* Windows 10 64 bit
* python 3.6.6
* django 2.0.6

※ python 3.6.7 version does not work well  the present  (2018/11/18).

# Deployment steps
## Things need to be prepared
* Pre-developed application that to be deployed
* [Github](https://github.com/) account 
* [Heroku](https://signup.heroku.com/) account
* Install some important modules
    * Django-toolbelt
    * Whitenoise

```
pip install django-toolbelt
pip install whitenoise
```

## Create important files

1. runtime.txt
2. Procfile
3. requirements.txt
4. .gitignore

### ・runtime.txt

This is the file that tells the Python version to Heroku. Let's check the version of python by typing `python --version` at the command prompt.

* runtime.txt
```
python-3.6.6
```

### ・Procfile
Procfile is the file in which contains the command to start the heroku process. Let's create the following file.

* Procfile

```
web: gunicorn procjectName.wsgi --log-file -
```

※ Since the `projectName` of the `django` application under development is included in the place called `projectName`, please change each of them.

※ Example: Project name is *my_project*

```
web: gunicorm my_project.wsgi --log-file -
```

`gunicorn` is a python library that simply connects web servers and web applications. If you have not installed it, install it with the `pip` command (or `conda` command for `anaconda`). You can check with pip list to make sure if it is installed or not.

```pip list```
```pip install gunicorn```

### ・requirements.txt
`requirements.txt` is a file that tells heroku, "I will use this module and libraries!"

You can create it with the following command. Let's type in the hierarchy of the project folder.

* Command Prompt

```
pip freeze > requirements.txt
```

pip freeze is a command to output with the specific version of the library that you are using. 

`>requirements.txt` is a command to create by inputting the output on the left side of the inequality into the file on the right side. So it's all good  with the above command.


### ・.gitignore
Please use `.gitignore` (with the dot) in git described later.Simple explanation is that  I want to push my files to the service called git, but files that i don't want to that be declare in `.gitignore`. (For example, the setting file for the development environment described later)
* .gitignore

```
<your_venv>
__pycache__
staticfiles
local_settings.py
db.sqlite3
*.py[co]
```

## Change/Add `setting` file
1. projectName/settings.py (Change the existing file)
2. projectName/local_settings.py (Create new)

### projectName/setting.py

* projectName/setting.py

    ```
    DEBUG = False

    try:
        from .local_settings import *
    except ImportError:
        pass

    if not DEBUG:
        import django_heroku
        django_heroku.settings(locals())
    ```

Let's add this to the bottom of the existing `setting.py`
DEBUG mode will be `False` in development.

### projectName/local_settings.py
This is a code describing the development database and debugging. Let's Create New → Copy → Save.
* projectName/lacal_settings.py
```
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

DEBUG = True
```

### Using git

To deploy to heroku I will send my file to github service and use git.

Let's install the software from the following site to use the git command via the command line

Install git command [here](https://git-scm.com/)

Type the following commands:

```
git init
git config user.name "username"
git config user.email "mailaddress"
git add -A .
git commit -m "first commit"
```
Please enter your user name and the mail address. Do not forget the last . (Dot) in the fourth line.

### Lastly, deploy to Heroku
Type in the following commands:
```
heroku login
heroku create <Your user name>
git push heroku master
heroku ps:scale web=1
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
heroku open
```

`heroku run python manage.py migrate` describe the heroku version of migrate (database update) you have been doing.

`heroku run python manage.py createsuperuser` is a command to log in to django's administration site. Let's create an account here.

By entering `heroku open`, heroku's web application that you deployed without permission opens in your browser. You can enter url of web application created manually from browser.

# Preference

https://qiita.com/okoppe8/items/76cdb202eb15aab566d1