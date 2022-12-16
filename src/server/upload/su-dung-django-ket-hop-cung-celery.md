`Celery` là một `asynchronous job queue` cực mạnh. Nó là sự thay thế rất tốt cho `contab` của Linux.
`Django` là top framework tốt nhất của Python. 

Về `Celery` và `Django` documents, các bạn có thể follow:
- `Celery`: http://docs.celeryproject.org/
- `Django`: https://docs.djangoproject.com/en/2.0/


![](https://images.viblo.asia/f8ef1788-1aae-43ae-b5bc-81100464969d.jpg)
# Note:
`Celery 4.0` đã supports `Django 1.8` và các versions mới hơn. Với những version cũ hơn của `Django`, nên sử dụng `Celery 3.1`.

# Setup simple Django project
Thực hiện việc tạo project Django cơ bản bằng lện sau:
```sh
% mkdir celery-simple
% cd celery-simple
% virtualenv venv -p python3
Running virtualenv with interpreter /Users/minhhahao/.pyenv/versions/3.6.2/bin/python3
Using base prefix '/Users/minhhahao/.pyenv/versions/3.6.2'
New python executable in /Users/minhhahao/workspace/celery-simple/venv/bin/python3
Also creating executable in /Users/minhhahao/workspace/celery-simple/venv/bin/python
Installing setuptools, pip, wheel...done.
% source venv/bin/activatele
(venv) % pip install django==1.9 celery==4.0
Collecting django==1.9
  Downloading https://files.pythonhosted.org/packages/ea/9b/b5a6360b3dfcd88d4bad70f59da26cbde4bdec395a31bb26dc840e806a50/Django-1.9-py2.py3-none-any.whl (6.6MB)
    100% |████████████████████████████████| 6.6MB 2.2MB/s
Collecting celery==4.0
  Downloading https://files.pythonhosted.org/packages/4b/19/745db97793f786644df142f059beea7c784fa3e856758bb5c18891004d49/celery-4.0.0-py2.py3-none-any.whl (395kB)
    100% |████████████████████████████████| 399kB 2.2MB/s
Collecting pytz>dev (from celery==4.0)
  Downloading https://files.pythonhosted.org/packages/dc/83/15f7833b70d3e067ca91467ca245bae0f6fe56ddc7451aa0dc5606b120f2/pytz-2018.4-py2.py3-none-any.whl (510kB)
    100% |████████████████████████████████| 512kB 9.6MB/s
Collecting billiard<3.6.0,>=3.5.0.2 (from celery==4.0)
  Downloading https://files.pythonhosted.org/packages/82/55/76f4e786141b7174926cdffa7a155aeea316b729118fb48ec548f3c6754f/billiard-3.5.0.3-py3-none-any.whl (89kB)
    100% |████████████████████████████████| 92kB 7.8MB/s
Collecting kombu<5.0,>=4.0 (from celery==4.0)
  Downloading https://files.pythonhosted.org/packages/62/a4/5d16954803224a1e451713293c2a028614099f5538cf626e1fdd7b438c86/kombu-4.1.0-py2.py3-none-any.whl (181kB)
    100% |████████████████████████████████| 184kB 8.6MB/s
Collecting amqp<3.0,>=2.1.4 (from kombu<5.0,>=4.0->celery==4.0)
  Downloading https://files.pythonhosted.org/packages/88/4a/8c45a882d842678963516ebd9cf584a4ded51af719234c3b696c2e884c60/amqp-2.2.2-py2.py3-none-any.whl (48kB)
    100% |████████████████████████████████| 51kB 15.6MB/s
Collecting vine>=1.1.3 (from amqp<3.0,>=2.1.4->kombu<5.0,>=4.0->celery==4.0)
  Downloading https://files.pythonhosted.org/packages/10/50/5b1ebe42843c19f35edb15022ecae339fbec6db5b241a7a13c924dabf2a3/vine-1.1.4-py2.py3-none-any.whl
Installing collected packages: django, pytz, billiard, vine, amqp, kombu, celery
Successfully installed amqp-2.2.2 billiard-3.5.0.3 celery-4.0.0 django-1.9 kombu-4.1.0 pytz-2018.4 vine-1.1.4
(venv) % django-admin startproject simple
(venv) % cd simple
(venv) % python manage.py startapp ce
```

Cấu trúc simple project:

```sh
(venv) % tree
.
├── ce
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── manage.py
└── simple
    ├── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-36.pyc
    │   └── settings.cpython-36.pyc
    ├── settings.py
    ├── urls.py
    └── wsgi.py

4 directories, 14 files
```

Sau khi tạo xong, mình tạo một view print "Hello World!" trên web:

```py
# simple/settings.py
# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ce'
]

# simple/urls.py
from django.conf.urls import url, include
from django.contrib import admin


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('ce.urls'))
]


# ce/urls.py
# Create new file `ce/urls.py` to define url of app ce
from django.conf.urls import url
from ce import views


urlpatterns = [
    url(r'^$', views.index),
]

# ce/views.py
# Define view
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello World!")

```

Run server!
```sh
(venv) % python manage.py runserver                                                                     
Performing system checks...

System check identified no issues (0 silenced).

May 03, 2018 - 02:22:31
Django version 1.9, using settings 'simple.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

# Setup a simple celery task
Để chạy được `Celery` bạn cần setup `Redis` server hoặc `RabbitMQ` server. Và chắc chắn chúng đã được cài đặt

- Với `Redis` server:
```py
# simple/settings.py
REDIS_HOST = 'localhost'
REDIS_PORT = '6379'
BROKER_URL = 'redis://' + REDIS_HOST + ':' + REDIS_PORT + '/0'
```

- Với `RabbitMQ` server:
```py
# simple/settings.py
BROKER_URL = 'amqp://guest:guest@localhost:5672/' 
```

OK, tiếp theo mình tạo một file để define `Celery ` instance:

```py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simple.settings')

app = Celery('simple')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
```

Sau đó, import task into `simple/__init__.py`

```py
# simple/__init__.py
from __future__ import absolute_import, unicode_literals

# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from .celery import app as celery_app

__all__ = ['celery_app']
```

Tiếp theo, mình sẽ tạo một task print ra timenow mỗi lần load trang `HelloWorld!`. Mình tạo một file `ce/task.py`. Cấu trúc project looklike:

```sh
(venv) % tree
.
├── ce
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-36.pyc
│   │   ├── admin.cpython-36.pyc
│   │   ├── models.cpython-36.pyc
│   │   ├── urls.cpython-36.pyc
│   │   └── views.cpython-36.pyc
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   ├── __init__.py
│   │   └── __pycache__
│   │       └── __init__.cpython-36.pyc
│   ├── models.py
│   ├── taks.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── db.sqlite3
├── manage.py
└── simple
    ├── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-36.pyc
    │   ├── celery.cpython-36.pyc
    │   ├── settings.cpython-36.pyc
    │   ├── urls.cpython-36.pyc
    │   └── wsgi.cpython-36.pyc
    ├── celery.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py

6 directories, 27 files

```

Modify file `task.py`

```py
# ce/taks.py
# Create your tasks here
from celery import shared_task


@shared_task
def add(x, y):
    return x + y


@shared_task
def mul(x, y):
    return x * y


@shared_task
def xsum(numbers):
    return sum(numbers)
```

Để sử dụng kết hợp giữa `Django` và `Celery` mình sử dụng `django-celery-results` extension

```sh
(venv) % pip install django-celery-results
Collecting django-celery-results
  Downloading https://files.pythonhosted.org/packages/8d/82/4ede39c945811ffea9de29c5d312e1ab84352c3b01a290f9dce81614567d/django_celery_results-1.0.1-py2.py3-none-any.whl
Requirement already satisfied: celery<5.0,>=4.0 in /Users/minhhahao/workspace/celery-simple/venv/lib/python3.6/site-packages (from django-celery-results) (4.0.0)
Requirement already satisfied: billiard<3.6.0,>=3.5.0.2 in /Users/minhhahao/workspace/celery-simple/venv/lib/python3.6/site-packages (from celery<5.0,>=4.0->django-celery-results) (3.5.0.3)
Requirement already satisfied: kombu<5.0,>=4.0 in /Users/minhhahao/workspace/celery-simple/venv/lib/python3.6/site-packages (from celery<5.0,>=4.0->django-celery-results) (4.1.0)
Requirement already satisfied: pytz>dev in /Users/minhhahao/workspace/celery-simple/venv/lib/python3.6/site-packages (from celery<5.0,>=4.0->django-celery-results) (2018.4)
Requirement already satisfied: amqp<3.0,>=2.1.4 in /Users/minhhahao/workspace/celery-simple/venv/lib/python3.6/site-packages (from kombu<5.0,>=4.0->celery<5.0,>=4.0->django-celery-results) (2.2.2)
Requirement already satisfied: vine>=1.1.3 in /Users/minhhahao/workspace/celery-simple/venv/lib/python3.6/site-packages (from amqp<3.0,>=2.1.4->kombu<5.0,>=4.0->celery<5.0,>=4.0->django-celery-results) (1.1.4)
Installing collected packages: django-celery-results
Successfully installed django-celery-results-1.0.1
```

Add `django_celery_results`s into `simple/settings/.py`

```py
# simple/settings.py
INSTALLED_APPS = (
    ...,
    'django_celery_results',
)
```

Run task:
```sh
% celery -A simple worker -l info -B                                                               

celery@TEST.local v4.0.0 (latentcall)

Darwin-16.7.0-x86_64-i386-64bit 2018-05-03 03:33:01

[config]
.> app:         simple:0x1035f6ba8
.> transport:   amqp://guest:**@localhost:5672//
.> results:
.> concurrency: 8 (prefork)
.> task events: OFF (enable -E to monitor tasks in this worker)

[queues]
.> celery           exchange=celery(direct) key=celery


[tasks]
  . simple.celery.debug_task -> This task defined

[2018-05-03 03:33:01,752: INFO/Beat] beat: Starting...
[2018-05-03 03:33:03,053: INFO/MainProcess] Connected to amqp://guest:**@127.0.0.1:5672//
[2018-05-03 03:33:03,065: INFO/MainProcess] mingle: searching for neighbors
[2018-05-03 03:33:04,085: INFO/MainProcess] mingle: all alone
/Users/minhhahao/.pyenv/versions/3.5.2/lib/python3.5/site-packages/celery/fixups/django.py:202: UserWarning: Using settings.DEBUG leads to a memory leak, never use this setting in production environments!
  warnings.warn('Using settings.DEBUG leads to a memory leak, never '

[2018-05-03 03:33:04,107: WARNING/MainProcess] /Users/minhhahao/.pyenv/versions/3.5.2/lib/python3.5/site-packages/celery/fixups/django.py:202: UserWarning: Using settings.DEBUG leads to a memory leak, never use this setting in production environments!
  warnings.warn('Using settings.DEBUG leads to a memory leak, never '

[2018-05-03 03:33:04,107: INFO/MainProcess] celery@TEST.local ready.

```               

 Cơ bản là vậy !!!
 
 
Warning:
- Đôi khi sẽ phát sinh lỗi tương thích: python, celery, django. Ở đây, mình sử dụng Python 3.5.2, Celery 4.0, Django 1.9. Bạn cần chọn đúng version để tránh lỗi phát sinh.

- Để run được `Celery` thì bạn cần chắc chắn đã setup `Redis` hoặc `RabbitMQ` server để chạy Asynchronous
 Thanks for reading!