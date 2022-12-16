Xin chào tất cả các bạn đã quay trờ lại kênh của Ông Đức Vê Lốc. Các bạn ơi, hôm nay mình lại làm bài viết, mình viết về cách login một ứng dụng python qua facebook và google siêu dấp dẫn thần kì các bạn ợ.

Login bằng Facebook ư?
![](https://images.viblo.asia/b5a33f6c-aedd-49b4-b790-cdffea88d2bc.png)

Hay bằng Google ư?
![](https://images.viblo.asia/7783d456-2360-449a-a881-1516f95ae6d6.png)
Bây giờ mình sẽ bắt đầu làm nhớ các bạn nhớ.
# 1. Tạo Project
Nếu các bạn đã biết qua `python` và cụ thể lại `django` thì chắc hẳn sẽ không có gì xa lạ với câu lệnh khởi tạo project này nữa:
```bash
---$ django-admin startproject socialauthent
---/socialauthent$ django-admin startapp myapp
---/socialauthent$ python manage.py migrate
```
Sau đó tạo thêm 1 file `home.html` cho trang home và tạo `myapp/urls.py`. Chúng ta có structure như sau:

![](https://images.viblo.asia/f62de197-3424-4a86-af3e-e3420e37e7eb.png)

Tiếp theo cần cài đặt như sau:
```python
# myapp/views.py

from django.shortcuts import render
from django.views.generic import View

class HomeView(View):
    template_name = "registration/home.html"

    def get(self, request):
        current_user = request.user
        return render(request, self.template_name, {'current_user': current_user})
```
Thêm tý trong urls nữa:
```python
# myapp/urls.py

from django.urls import path
from .views import *

app_name = 'app'

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
```

À còn một cái urls nữa:
```python
# socialauthent/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('myapp.urls')),
]
```
Thêm tý vào file `home.html` thôi:
```html
<h1>Home</h1>
```

Nốt cái này nha, các bạn tìm đến setting `TEMPLATES` và sửa lại cái `DIRS`:
```python
# socialauthent/settings.py

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

Cuối cùng là `run`:
```bash
---/socialauthent$ python manage.py runserver
```
Các bạn có được như này là đúng r nha:
![](https://images.viblo.asia/5030060c-8b2c-497e-a47d-7bed8712006a.png)
# 2. Facebook auth
Sửa lại 1 chút ở trang home:
```html
<!-- templates/registration/home.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
</head>
<body>
    <h1>Home</h1>
    {% if current_user.is_authenticated %}
        <p>Welcome! <strong>{{ current_user }}</strong></p>
        <a href="#">Logout</a>
    {% else %}
        <a href="#">Login with Facebook</a>
        <br>
        <a href="#">Login with Google</a>
    {% endif %}
</body>
</html>
```
Tiếp theo là bước quan trọng nhất trong bài viết ngày hôm nay.
```
---/socialauthent$ pip install social-auth-app-django 
```

Cấu hình trong file settings:
```python
# socialauthent/settings.py
...
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'social_django', #<--
]
...
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',    
    'social_django.middleware.SocialAuthExceptionMiddleware',  # <--
]
...
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',  # <--
                'social_django.context_processors.login_redirect',  # <--
            ],
        },
    },
]
...
AUTHENTICATION_BACKENDS = (
    'social_core.backends.open_id.OpenIdAuth',
    'social_core.backends.google.GoogleOpenId',
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)
```
Tiếp tục migrate:
```
---/socialauthent$ python manage.py migrate
```
Để login đc với facebook thì chúng ta cần tiếp tục lấy `SOCIAL_AUTH_FACEBOOK_KEY` và `SOCIAL_AUTH_FACEBOOK_SECRET`
 bằng cách vào [Trang phát triển của facebook](https://developers.facebook.com/) và tạo một ứng dụng:
 
 ![](https://images.viblo.asia/63b92b39-6301-4c41-b07c-276a85c731f5.png)
 
 Khi tạo ID ứng dụng xong sẽ có 1 trang như thế này. và tích vào phần Tích hợp `Đăng nhập bằng Facebook`:
 
 ![](https://images.viblo.asia/31fb6bde-ba00-4d06-a317-8d8758b79fdb.png)
 Tiếp theo bạn vào phần Cài đặt -> Thông tin cơ bản. và setup như sau:
 
*  Miền ứng dụng: `localhost`
*  Dòng cuối cùng có mục: Thêm nên tảng -> Trang web: `http://localhost:8000/`

Lưu ý là:

`SOCIAL_AUTH_FACEBOOK_KEY` = ID ứng dụng

`SOCIAL_AUTH_FACEBOOK_SECRET` = Khóa bí mật của ứng dụng

Bấm `Lưu thay đổi`
Thêm `SOCIAL_AUTH_FACEBOOK_KEY` và `SOCIAL_AUTH_FACEBOOK_SECRET` của bạn vào setting:
```python
# socialauthent/settings.py

SOCIAL_AUTH_FACEBOOK_KEY = ''
SOCIAL_AUTH_FACEBOOK_SECRET = ''
```

Trong urls chúng ta có gì?
```python
# socialauthent/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('myapp.urls')),
    path('auth/', include('social_django.urls', namespace='social')), #<--
]
```
Cái nút `Login with Facebook` thì sao nhỉ?
```html
<!-- templates/registration/home.html -->
...
<a href="{% url 'social:begin' 'facebook' %}?next={{ request.path }}">Login with Facebook</a>
...
```
Vậy là xong. test thôi các bạn. các bạn có thấy như thế naỳ không?
![](https://images.viblo.asia/b5a33f6c-aedd-49b4-b790-cdffea88d2bc.png)
Kiểm tra lại trong admin nhé:

![](https://images.viblo.asia/76949dd4-2d9d-4995-8927-47604dea3d13.png)

![](https://images.viblo.asia/c39ec420-9b4b-4a70-bb76-48f4c0ce67cd.png)

# 3. Google auth
Thêm chức năng logout để login bằng google nha các bạn:
```python
# myapp/views.py

from django.shortcuts import render, redirect

from django.views.generic import View
from django.contrib.auth import logout as auth_logout


class HomeView(View):
    template_name = "registration/home.html"

    def get(self, request):
        current_user = request.user
        return render(request, self.template_name, {'current_user': current_user})


class LogoutView(View):

    def get(self, request):
        auth_logout(request)
        return redirect('app:home')
```
Và cả urls nữa:
```python
# myapp/urls.py

from django.urls import path

from .views import *

app_name = 'app'

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
```
Trang `home.html` sẽ như sau:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
</head>
<body>
    <h1>Home</h1>
    {% if current_user.is_authenticated %}
        <p>Welcome! <strong>{{ current_user }}</strong></p>
        <a href="{% url 'app:logout' %}">Logout</a>
    {% else %}
            <a href="{% url 'social:begin' 'facebook' %}?next={{ request.path }}">Login with Facebook</a>
            <br>
            <a href="#">Login with Google</a>
    {% endif %}
</body>
</html>
```
Tiếp theo để login được bằng google thì cần phải có `SOCIAL_AUTH_GOOGLE_OAUTH2_KEY` và `SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET`:

Chúng ta vào trang [Google API console](https://console.cloud.google.com/apis/credentials)

![](https://images.viblo.asia/01d72c1a-932a-47b3-9735-3021562112ac.png)

Chọn `ID client OAuth`.

![](https://images.viblo.asia/1b494e97-90b1-40d7-9259-ba3b236c1c24.png)

Setup như ảnh trên:
![](https://images.viblo.asia/0ae95346-293b-4de9-b7a8-75ae77da2541.png)

Đến đây thì đã lấy được:

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = Coici votre ID client
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = Voici votre code secret client

và thêm vào setting thôi:
```python
# socialauthent/settings.py
...
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = ''
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = ''
```

Trang `home.html` đầy đủ như sau:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
</head>
<body>
    <h1>Home</h1>
    {% if current_user.is_authenticated %}
        <p>Welcome! <strong>{{ current_user }}</strong></p>
        <a href="{% url 'app:logout' %}">Logout</a>
    {% else %}
            <a href="{% url 'social:begin' 'facebook' %}?next={{ request.path }}">Login with Facebook</a>
            <br>
            <a href="{% url 'social:begin' 'google-oauth2' %}?next={{ request.path }}">Login with Google</a>
    {% endif %}
</body>
</html>
```

Xong rồi nha, test xem thế nào nhỉ:
![](https://images.viblo.asia/7783d456-2360-449a-a881-1516f95ae6d6.png)

Login xong:
![](https://images.viblo.asia/6a34fcdd-f38a-4219-949a-3f465b802157.png)

Đăng nhập lại bằng admin và xem nhé:

![](https://images.viblo.asia/987b58f9-fe57-431a-9db4-357c2325a842.png)

OK đến đây thì chúng ta đã làm xong. Đã đăng nhập được bằng Facebook hoặc Google rồi nha

# 4. Kết thúc
Như vậy là chúng ta biết được cách đăng nhập bằng Facebook hoặc Google trên một ứng dụng Django (Python)

Nếu thấy hay, hãy upvote, share để được đẹp trai và xinh gái hơn.