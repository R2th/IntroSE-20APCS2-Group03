Thông thường, khi nhắc tới Restful Python thì mọi người thường nghĩ tới Flask API, hoặc Django Rest Framework. Xin thứ lỗi mình sẽ gọi tắt Django Rest Framework là Django Rest và Django Tastypie là Tastypie . Điểm mạnh của Flask Rest và Django Rest chình là flexible và decoupled. Tuy nhiên, nếu bạn không quá khắt khe về tính flexible, bạn chỉ cần viết nhanh API thì Tastypie cũng là sự lựa chọn tuyệt vời. Nói như thế không hẳn Tastypie không flexible mà nó sẽ không bằng 2 ông anh kia thôi.

Now, mình sẽ giới thiệu sơ lược nhất về xây dựng API sử dụng Tastypie!

![](https://images.viblo.asia/ce1bd6ed-9ba5-4eea-85f5-3ba46aa51628.jpg)

## Installation
### Dependencies
- Python 2.7+ or Python 3.4+
- Django 1.8+
- Install Tastypie: $pip install django-tastypie
- Mình có cài đặt thêm virtualenv và sử dụng nó

Dưới đây là các gói:

```sh
(venv) % pip freeze                                                                                     
Django==1.10
django-tastypie==0.14.0
python-dateutil==2.7.2
python-mimeparse==1.6.0
pytz==2018.3
six==1.11.0
```

### Configuration
Đầu tiên bạn tạo ra một Django project và một app bằng Django CLI:

```sh
(venv) % django-admin startproject simple
(venv) % cd simple
(venv) % django-admin startapp entry
```

Trong `settings` của django tại `/simple/simple`, add `tastypie` và `entry` vào `INSTALLED_APPS`

```python
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'tastypie',
    'entry'
]

```

## To do 
Sau khi config xong mình sẽ migration data:

```sh
(venv) % cd simple                                                                                  
(venv) % ls                                                                                  
entry  manage.py  simple
No changes detected
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, tastypie
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying sessions.0001_initial... OK
  Applying tastypie.0001_initial... OK
(venv) %     
```

Mình sẽ tạo ra một số user bằng `Django` shell. `User` này là một models mặc định của `Django`. 

```sh
(venv) % python manage.py shell 
Python 3.6.1 (default, Nov  9 2017, 10:16:55) 
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from django.contrib.auth.models import User
>>> User.objects.create(username="user1", password="12345678", email="user1@gmail.com")
<User: user1>
>>> User.objects.create(username="user2", password="12345678", email="user2@gmail.com")
<User: user2>
>>> User.objects.create(username="user3", password="12345678", email="user3@gmail.com")
<User: user3>

```

Sau đó, trong app `Entry`, mình tạo 1 file lấy tên là `resource.py`. Trong `resource.py`:

```py
from tastypie.resources import ModelResource, ALL
from django.contrib.auth.models import User


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        allowed_methods = ('get', 'post', 'put', 'delete', 'patch')
        filtering = {"id": ALL}

    def dehydrate(self, bundle):
        return super(UserResource, self).dehydrate(bundle=bundle)

```

API trả về mình sẽ hển thị tất cẩ info của các user mình vừa tạo bên trên.

Cuối cùng trong `urls.py`, add thêm resouce vào là xong:

```py
from django.contrib import admin
from django.conf.urls import include, url
from tastypie.api import Api

from entry.resource import UserResource
v1_api = Api(api_name='v1')
v1_api.register(UserResource())

urlpatterns = [
    url(r'admin/', admin.site.urls),
    url(r'api/', include(v1_api.urls))
]

```
- `v1_api = Api(api_name='v1')`: định nghĩa 1 version cho API
- `v1_api.register(UserResource())`: register 1 resource 
- `url(r'api/', include(v1_api.urls))`: define url

Kết quả url API sẽ theo cấu trúc kiểu như này: `/api/v1/<resource_name>/....`

Ok, Run server nào:
```sh
(venv) % python manage.py runserver                                                                     
Performing system checks...

System check identified no issues (0 silenced).
March 27, 2018 - 03:29:53
Django version 1.10, using settings 'simple.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

```

Bạn thử truy cập vào cá địa chỉ sau và thưởng thức thành quả:
- `http://127.0.0.1:8000/api/v1/`: API này sẽ hiển thị toàn bộ API version 1:
```json
{
    "user": {
    "list_endpoint": "/api/v1/user/",
    "schema": "/api/v1/user/schema/"
}
```

- `http://127.0.0.1:8000/api/v1/user/`: API lấy ra toàn bộ info của user

```json
{
    "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 3
},
"objects": [
    {
        "date_joined": "2018-03-27T02:40:37.326805",
        "email": "user1@gmail.com",
        "first_name": "",
        "id": 1,
        "is_active": true,
        "is_staff": false,
        "is_superuser": false,
        "last_login": null,
        "last_name": "",
        "password": "12345678",
        "resource_uri": "/api/v1/user/1/",
        "username": "user1"
    },{
        "date_joined": "2018-03-27T02:40:44.214801",
        "email": "user2@gmail.com",
        "first_name": "",
        "id": 2,
        "is_active": true,
        "is_staff": false,
        "is_superuser": false,
        "last_login": null,
        "last_name": "",
        "password": "12345678",
        "resource_uri": "/api/v1/user/2/",
        "username": "user2"
    },{
        "date_joined": "2018-03-27T02:40:50.830747",
        "email": "user3@gmail.com",
        "first_name": "",
        "id": 3,
        "is_active": true,
        "is_staff": false,
        "is_superuser": false,
        "last_login": null,
        "last_name": "",
        "password": "12345678",
        "resource_uri": "/api/v1/user/3/",
        "username": "user3"
    }]
}
```

- `http://127.0.0.1:8000/api/v1/user/set/1;3/`: Lấy ra info user có id = 1 và id =3
```json
{
    "objects": [
    {
        "date_joined": "2018-03-27T02:40:37.326805",
        "email": "user1@gmail.com",
        "first_name": "",
        "id": 1,
        "is_active": true,
        "is_staff": false,
        "is_superuser": false,
        "last_login": null,
        "last_name": "",
        "password": "12345678",
        "resource_uri": "/api/v1/user/1/",
        "username": "user1"
    },{
        "date_joined": "2018-03-27T02:40:50.830747",
        "email": "user3@gmail.com",
        "first_name": "",
        "id": 3,
        "is_active": true,
        "is_staff": false,
        "is_superuser": false,
        "last_login": null,
        "last_name": "",
        "password": "12345678",
        "resource_uri": "/api/v1/user/3/",
        "username": "user3"
    }]
}
```

- `http://127.0.0.1:8000/api/v1/user/1/`: Lấy info của user với id = 1
```json
{
    "date_joined": "2018-03-27T02:40:37.326805",
    "email": "user1@gmail.com",
    "first_name": "",
    "id": 1,
    "is_active": true,
    "is_staff": false,
    "is_superuser": false,
    "last_login": null,
    "last_name": "",
    "password": "12345678",
    "resource_uri": "/api/v1/user/1/",
    "username": "user1"
}
```

- `http://127.0.0.1:8000/api/v1/user/schema/`: Xem cấu trúc `schema` của `User` models

```json
{
    "allowed_detail_http_methods": [
        "get",
        "post",
        "put",
        "delete",
        "patch"
    ],
    "allowed_list_http_methods": [
        "get",
        "post",
        "put",
        "delete",
        "patch"
    ],
    "default_format": "application/json",
    "default_limit": 20,
    "fields": {
        "date_joined": {
            "blank": false,
            "default": "2018-03-27T03:39:04.252851",
            "help_text": "A date & time as a string. Ex: \"2010-11-10T03:07:43\"",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "datetime",
            "unique": false,
            "verbose_name": "date joined"
        },
        "email": {
            "blank": true,
            "default": "",
            "help_text": "Unicode string data. Ex: \"Hello World\"",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "string",
            "unique": false,
            "verbose_name": "email address"
        },
        "first_name": {
            "blank": true,
            "default": "",
            "help_text": "Unicode string data. Ex: \"Hello World\"",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "string",
            "unique": false,
            "verbose_name": "first name"
        },
        "id": {
            "blank": true,
            "default": "",
            "help_text": "Integer data. Ex: 2673",
            "nullable": false,
            "primary_key": true,
            "readonly": false,
            "type": "integer",
            "unique": true,
            "verbose_name": "ID"
        },
        "is_active": {
            "blank": true,
            "default": true,
            "help_text": "Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "boolean",
            "unique": false,
            "verbose_name": "active"
        },
        "is_staff": {
            "blank": true,
            "default": false,
            "help_text": "Designates whether the user can log into this admin site.",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "boolean",
            "unique": false,
            "verbose_name": "staff status"
        },
        "is_superuser": {
            "blank": true,
            "default": false,
            "help_text": "Designates that this user has all permissions without explicitly assigning them.",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "boolean",
            "unique": false,
            "verbose_name": "superuser status"
        },
        "last_login": {
            "blank": false,
            "default": "No default provided.",
            "help_text": "A date & time as a string. Ex: \"2010-11-10T03:07:43\"",
            "nullable": true,
            "primary_key": false,
            "readonly": false,
            "type": "datetime",
            "unique": false,
            "verbose_name": "last login"
        },
        "last_name": {
            "blank": true,
            "default": "",
            "help_text": "Unicode string data. Ex: \"Hello World\"",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "string",
            "unique": false,
            "verbose_name": "last name"
        },
        "password": {
            "blank": false,
            "default": "No default provided.",
            "help_text": "Unicode string data. Ex: \"Hello World\"",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "string",
            "unique": false,
            "verbose_name": "password"
        },
        "resource_uri": {
            "blank": false,
            "default": "No default provided.",
            "help_text": "Unicode string data. Ex: \"Hello World\"",
            "nullable": false,
            "primary_key": false,
            "readonly": true,
            "type": "string",
            "unique": false,
            "verbose_name": "resource uri"
        },
        "username": {
            "blank": false,
            "default": "No default provided.",
            "help_text": "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
            "nullable": false,
            "primary_key": false,
            "readonly": false,
            "type": "string",
            "unique": true,
            "verbose_name": "username"
        }
    },
    "filtering": {
        "id": 1
    }
}
```

Có vẻ hơi dài rồi. Tạm thời post này, mình chỉ hướng dẫn tới đây thôi. Mình đang sử dụng với model mặc định của `Django` là `User`. Bạn có thể làm tương tự với 1 models bạn tự tạo. Phần này mình sẽ hướng dẫn trong phần 2. 

Phần 2 hứa hẹn sẽ cung cấp thêm cho các bạn về những thứ có thể customer của `Tastypie`

Thanks you for reading!