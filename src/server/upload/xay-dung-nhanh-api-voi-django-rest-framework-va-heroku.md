## Bài toán
Viết API cho phép create, list, update, get, delete images.

Image  bao gồm các field:
- name
- url
- size

API list có support pagination. 

Deploy API này lên Heroku để front-end và mobile sử dụng. 

Vì là bài toàn demo, API sẽ không set auth.

## Xây dựng API

### Tạo project Django

Môi trường develop:
- Os: Ubuntu 16.04.
- Python 3.6.
- Installed pip, virtualenv.
- PostgreSQL

Bạn có thể Google để cài Python, pip hay virtualenv. Lý do vì sao lại chọn PostgreSQL?. Đơn giản vì Heroku app recommend sử dụng [PostgreSQL](https://devcenter.heroku.com/articles/heroku-mysql). 

Khi môi trường develop đã ok, mình sẽ tạo project bằng Django. Cụ thể, project name `demo`, app name `image`

```sh
mkdir project-demo && cd project-demo 
virtualenv venv && source venv/bin/activate
pip install django djangorestframework
django-admin startproject demo
cd demo && python manage.py startapp image
```

Kết quả có được:

```sh
$ tree         
.
├── demo
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-36.pyc
│   │   └── settings.cpython-36.pyc
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── image
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
└── manage.py

4 directories, 14 files

```
### Tạo app

Sau khi init project xong, ta sẽ tới bước viết API. Add app vào setting project

```py
# demo/demo/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'image',
    'rest_framework'
]
```

Config tiếp database. Ở đây, mình tạo một database lấy tên `demo`

```
# demo/demo/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'demo',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

Tiếp theo, Ta sẽ define model theo bài toàn của minh. 

```py
# demo/image/models.py
import uuid
from django.db import models


class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256)
    url = models.URLField()
    size = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created_at',)

```

Migrate dữ liệu nào:

```sh
$ python manage.py makemigrations       
Migrations for 'image':
  image/migrations/0001_initial.py
    - Create model Image

$ python manage.py migrate 
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, image, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying image.0001_initial... OK
  Applying sessions.0001_initial... OK

```

Tiếp theo, ta sẽ tạo serializers class.

```
#demo/image/serializers.py
from rest_framework import serializers
from image.models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

```

Bước tiếp, mình sẽ code view. Mình sẽ viết đủ CURD chỉ trong 1 class view

```
#demo/image/views.py
from image.models import Image
from image.serializers import ImageSerializer
from rest_framework import viewsets


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

```

Đó, view chỉ có mấy dòng thế thôi. Các bạn đã thấy Django Rest nguy hiểm chưa (xD).

Tiếp theo, handle nốt route. 

```
# demo/image/urls.py. File urls bạn tự tạo ra nhé :)
from rest_framework.routers import DefaultRouter
from image.views import ImageViewSet

router = DefaultRouter()
router.register(r'images', ImageViewSet, basename='image')
urlpatterns = router.urls

# demo/demo/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('image.urls')),
]

```

Xong, tiếp theo ta chạy tử nào :v: 

Create image:

```
$ curl -X POST \
  http://127.0.0.1:8000/api/v1/images/ \
  -H 'Content-Type: application/json' \
  -d '{
        "name": "name 2",
        "url": "http://example.com/image2.jpg",
        "size": 213124
}'
{"id":"b3b9c015-ff1c-455f-9f67-79ce45bf706e","name":"name 2","url":"http://example.com/image2.jpg","size":213124.0,"created_at":"2019-05-17T09:45:06.469977Z","updated_at":"2019-05-17T09:45:06.470015Z"}%     
```

List image:

```
$ curl -X GET \ 
  http://127.0.0.1:8000/api/v1/images/ \
  -H 'Content-Type: application/json'
[{"id":"7113dfbf-9286-4acf-8b1c-d3bc82cf9805","name":"name 1","url":"http://example.com/image1.jpg","size":123445.0,"created_at":"2019-05-17T09:44:27.940661Z","updated_at":"2019-05-17T09:44:27.940719Z"},{"id":"b3b9c015-ff1c-455f-9f67-79ce45bf706e","name":"name 2","url":"http://example.com/image2.jpg","size":213124.0,"created_at":"2019-05-17T09:45:06.469977Z","updated_at":"2019-05-17T09:45:06.470015Z"}]%      
```

....

Tiếp theo, ta cần cái một tool để control Django run. Ở đây mình chọn `[Gunicorn](https://gunicorn.org/)`

Cài đặt chúng:
```
pip install gunicorn
```

Run gunicorn nào:

```
$ gunicorn demo.wsgi:application
[2019-05-17 16:50:43 +0700] [22063] [INFO] Starting gunicorn 19.9.0
[2019-05-17 16:50:43 +0700] [22063] [INFO] Listening at: http://127.0.0.1:8000 (22063)
[2019-05-17 16:50:43 +0700] [22063] [INFO] Using worker: sync
[2019-05-17 16:50:43 +0700] [22066] [INFO] Booting worker with pid: 22066

```
## Deploy

Thực ra bài viết này, deploy mới là trọng tâm. Công cuộc deploy lên Heroku sẽ gồm 4 bước:
- Tạo Heroku app
- Tạo Heroku postgres database
- Config demo app work with Heroku
- Deploy

Ta sẽ đi vào từng bước

### Tạo Heroku app

Mình sẽ bỏ qua bước tạo tài khoản nhé !

Sau khi login vào dashboard Heroku, bạn vào url tạo app: https://dashboard.heroku.com/new-app.

Nhập đầy đủ thông tin và create app.

![](https://images.viblo.asia/9282cfdb-1a32-438e-9543-bb08b11ecdd3.png)

Kết quả:

![](https://images.viblo.asia/a774d520-144b-4a2e-ac31-39e412df9cee.png)

Tiếp theo, để thuận tiện cho deploy và config Heroku app, mình cần cài đặt Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

```sh
$ heroku --version
heroku/7.24.3 linux-x64 node-v11.14.0

```

### Tạo database

Sau khi tạo Heroku app xong, tiếp theo, mình sẽ tạo database.

Trước hêt, vô trong này để add addons `Heroku Postgres`: https://elements.heroku.com/addons/heroku-postgresql

![](https://images.viblo.asia/c1db2fa2-443f-497f-bc09-3dcb29b7ea7a.png)

Sau khi install, browser sẽ tự redirect tới trang tích hợp add on vào Heroku app. Ở đây, chúng ta sẽ chọn:

- Add-on plan: price/month
- App to provision to: Heroku app vừa tạo

![](https://images.viblo.asia/533d08d0-4338-4a0f-9310-6d8612b17637.png)

Done:

![](https://images.viblo.asia/2814785f-f091-4a9f-8088-441be4f540ea.png)

### Config Django Heroku

Để Django run được trên Heroku mình sẽ cần thực hiện lần lượt các bước.

Đầu tiên, việc cực kì quan trọng. Heroku web applications yêu cầu bắt buộc cần một `Procfile`. File này sẽ định nghĩa rằng bạn sẽ chạy ứng dụng này trên Heroku server như thế nào.

Với Django, cụ thể nó sẽ là:

```
release: python manage.py migrate --noinput
gunicorn demo.wsgi:application
```

Tức là mình sẽ cần migrate trước, sau đó mới run server :D

Tiếp theo, chúng ta sẽ cần cài đặt thêm gói `django-heroku`. Gói này để làm gì ?

`django-heroku` sẽ tự động  đọc file settings.py của Django application để work trên Heroku. Hiện tại, nó đã support Django 2.0.

Sau khi cài xong, mình sẽ import django_heroku vào đầu file `settings.py`

```py
import django_heroku
```

Và đừng quên, thêm line này vào cuối cùng của file `settings`. Nhớ là thêm vào vị trí cuối cùng của file nhé :v.

```py
django_heroku.settings(locals())
```

Do đây là API nên mình không cần care những file static. Vì vậy mình sẽ disable collectstatic

```sh
$ heroku config:set DISABLE_COLLECTSTATIC=1
Setting DISABLE_COLLECTSTATIC and restarting ⬢ django-project-demo... done, v5
DISABLE_COLLECTSTATIC: 1
```

Tiếp theo, cài đặt gói whitenoise và add package này vào middleware Django. 

```sh
pip install whitenoise
```

```py
MIDDLEWARE = (
    # Simplified static file serving.
    # https://warehouse.python.org/project/whitenoise/
    'whitenoise.middleware.WhiteNoiseMiddleware',
    ...
```

```py
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

Cuối cùng, add tất tần tật tuốt tuồn tuột các package đã cài đặt từ đầu vào file `requirements.txt`

```sh
$ cat requirements.txt 
Django==2.2.1
django-heroku==0.3.1
djangorestframework==3.9.4
gunicorn==19.9.0
psycopg2==2.8.2
uWSGI==2.0.18
whitenoise==4.1.2%  
```

### Deploy

Sau khi bạn đã cài xong Heroku CLI, để deploy, bạn cần login Heroku account trên console.

```sh
$ heroku login
heroku: Press any key to open up the browser to login or q to exit: 
Opening browser to https://cli-auth.heroku.com/auth/browser/xxx
Logging in... done
Logged in as xxx@gmail.com
```

Tiếp theo, init git repository tại thư mục project.

```sh
$ git init
Initialized empty Git repository in .../project-demo/demo/.git/

$ heroku git:remote -a django-project-demo
set git remote heroku to https://git.heroku.com/django-project-demo.git
```

Deploy nào

```
$ git add .
$ git commit -am "Deploy v1"
$ git push heroku master
Counting objects: 37, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (36/36), done.
Writing objects: 100% (37/37), 14.05 KiB | 0 bytes/s, done.
Total 37 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote: 
remote: -----> Python app detected
remote: -----> Installing python-3.6.8
remote: -----> Installing pip
remote: -----> Installing SQLite3
remote: -----> Installing requirements with pip
remote:        Collecting Django==2.2.1 (from -r /tmp/build_db3066f032c5dab87ec2d296d46c2abd/requirements.txt (line 1))
...
remote:        Installing collected packages: sqlparse, pytz, Django, dj-database-url, whitenoise, psycopg2, django-heroku, djangorestframework, gunicorn, uWSGI
remote:          Running setup.py install for psycopg2: started
remote:            Running setup.py install for psycopg2: finished with status 'done'
remote:          Running setup.py install for uWSGI: started
remote:            Running setup.py install for uWSGI: finished with status 'done'
remote:        Successfully installed Django-2.2.1 dj-database-url-0.5.0 django-heroku-0.3.1 djangorestframework-3.9.4 gunicorn-19.9.0 psycopg2-2.8.2 pytz-2019.1 sqlparse-0.3.0 uWSGI-2.0.18 whitenoise-4.1.2
remote: 
remote: -----> Discovering process types
remote:        Procfile declares types -> release, web
remote: 
remote: -----> Compressing...
remote:        Done: 56.5M
remote: -----> Launching...
remote:        Released v6
...
remote:        https://django-project-demo.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/django-project-demo.git
 * [new branch]      master -> master
```

Hàng về nào:

```sh
$ curl -X GET \
  https://django-project-demo.herokuapp.com/api/v1/images/ \
  -H 'Content-Type: application/json'  
[{"id":"7113dfbf-9286-4acf-8b1c-d3bc82cf9805","name":"name 1","url":"http://example.com/image1.jpg","size":123445.0,"created_at":"2019-05-17T09:44:27.940661Z","updated_at":"2019-05-17T09:44:27.940719Z"},{"id":"b3b9c015-ff1c-455f-9f67-79ce45bf706e","name":"name 2","url":"http://example.com/image2.jpg","size":213124.0,"created_at":"2019-05-17T09:45:06.469977Z","updated_at":"2019-05-17T09:45:06.470015Z"}]%  
```

Để coi log server bạn dùng lệnh sau:

```sh
$ heroku logs --tail
....
2019-05-17T10:44:28.692508+00:00 heroku[web.1]: Starting process with command `gunicorn demo.wsgi:application`
2019-05-17T10:44:32.332508+00:00 app[web.1]: [2019-05-17 10:44:32 +0000] [4] [INFO] Starting gunicorn 19.9.0
2019-05-17T10:44:32.333260+00:00 app[web.1]: [2019-05-17 10:44:32 +0000] [4] [INFO] Listening at: http://0.0.0.0:17811 (4)
2019-05-17T10:44:32.333410+00:00 app[web.1]: [2019-05-17 10:44:32 +0000] [4] [INFO] Using worker: sync
2019-05-17T10:44:32.339077+00:00 app[web.1]: [2019-05-17 10:44:32 +0000] [10] [INFO] Booting worker with pid: 10
2019-05-17T10:44:32.436672+00:00 app[web.1]: [2019-05-17 10:44:32 +0000] [11] [INFO] Booting worker with pid: 11
...
2019-05-17T10:46:43.165332+00:00 app[web.1]: 10.33.252.175 - - [17/May/2019:10:46:43 +0000] "GET /api/v1/images/ HTTP/1.1" 200 405 "-" "curl/7.47.0"

```

Vậy là đã deploy xong!

Sơ sơ là vậy. Trên đây là những bước cơ bản nhất giúp bạn create nhanh API và deploy lên Heroku. Bạn có thể tìm hiểu thêm Advance[ tại đây](https://devcenter.heroku.com/categories/working-with-django)

Thanks for reading (bow)!