Middleware là một thành phần không thể thiếu của một web framework. Nó nằm giữa request và response. Khi nó nhận được request, nó sẽ xử lý và trả kết quả cho middleware kế tiếp hoặc trả về cho tầng logic chính (có thể là controllers) . Khi nhận được response từ tầng logic chính nó thể  xử lý và chuyển tiếp cho một middleware khác hoặc trả về data cho người dùng. 

Thông thường, mỗi middleware sẽ thực thi some specific function. 

Django support một cơ số các middleware built-in. Developer có thể dễ dàng thêm 1 line code và có thể sử dụng. Nếu các middleware built-in không đáp ứng được bài toán cụ thể của bạn, bạn cũng có thể dễ dàng define middleware của riêng mình.

Bài viết này sẽ giới thiệu một số nội dung sau:

- Một số middleware built-in của Django
- Hướng dẫn tạo một custom middleware
- Một số lưu ý khi sử dụng middleware trong Django

# Middleware built-in

Trước khi giới thiệu một vài middleware hữu ích, mình sẽ hướng dẫn, cách active một middleware trong Django. 

Tất các middleware sẽ được active nếu được add trong constant `MIDDLEWARE`.

```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

Django không required bất kỳ một middleware này cả. Điều đó đồng nghĩa với việc `MIDDLEWARE` có thể là một mảng rỗng. 

## “Common” middleware

`django.middleware.common.CommonMiddleware`

Đây là middleware được recommend nhất bạn nên sử dụng. Một số tiện ích mà middleware này mang lại:

- Forbids access: Không cho request có User-Agent trong header nhất định được truy cập. 

```py
import re

DISALLOWED_USER_AGENTS = (
re.compile(r'^Bingbot'),
re.compile(r'^Googlebot')
)
```

- Performs URL rewriting: Thêm bớt các thành phần như slash ("/") hay www trong URL.

Giả sử : Địa chỉ có thể access là https://docs.djangoproject.com/en/3.0/ref/middleware/. Nếu setting bên dưới:

```py
# Default: True
APPEND_SLASH = False
```

Và bạn truy cập vào bằng url https://docs.djangoproject.com/en/3.0/ref/middleware, bạn sẽ gặp lỗi 404. `APPEND_SLASH = append slash`.

Với `PREPEND_WWW` setting cũng tương tự vậy.

## Session middleware

`django.contrib.sessions.middleware.SessionMiddleware`

Đây là middleware built-in chuyên được dùng để xử lý session. Sau khi bạn active middleware này, session sẽ được mặc định store tại database bằng cách sử dụng model `django.contrib.sessions.models.Session`

Bạn có thể dễ dàng config session engine để sử dụng. 

Bạn có thể tìm hiểu việc Configuring the session engine [tại đây](https://docs.djangoproject.com/en/3.0/topics/http/sessions/)

## Security middleware

`django.middleware.security.SecurityMiddleware `

Middleware này cung cấp một số nâng cấp để bảo vệ request/response của bạn. 

- SECURE_BROWSER_XSS_FILTER:  set `X-XSS-Protection: 1; mode=block` trong header.
- SECURE_CONTENT_TYPE_NOSNIFF: set `X-Content-Type-Options: nosniff` trong header.
- SECURE_HSTS_INCLUDE_SUBDOMAINS: `SecurityMiddleware` add `includeSubDomains` directive tới `HTTP Strict Transport Security` header.
- SECURE_HSTS_PRELOAD: `SecurityMiddleware` add `preload` directive tới `HTTP Strict Transport Security` header.
- SECURE_HSTS_SECONDS:  `SecurityMiddleware` set `HTTP Strict Transport Security` header cho toàn bộ responses mà nó chưa có.
- SECURE_REFERRER_POLICY: `SecurityMiddleware` set `Referrer Policy` header cho toàn bộ response mà nó chưa có.
- SECURE_SSL_HOST: Toàn bộ các SSL redirects sẽ được trỏ tới host chỉ định thay vì host ban đầu.
- SECURE_SSL_REDIRECT: `SecurityMiddleware` redirects toàn bộ non-HTTPS requests tới HTTPS.

## CSRF protection middleware

`django.middleware.csrf.CsrfViewMiddleware`

Middleware dùng để chống lại sự tấn công bằng `Cross Site Request Forgeries`. Middleware này sẽ thêm hidden form fields tới POST form và kiểm tra correct value. 


```html
<form action="/your-name/" method="post">
    {% csrf_token %}
    {{ form }}
    <input type="submit" value="Submit">
</form>
```

## Authentication middleware

`django.contrib.auth.middleware.AuthenticationMiddleware'`

Middleware add user attribute, to every incoming `HttpRequest` object. Django sử dụng sessions và middleware to hook the authentication system.

Bạn có thể tìm hiểu thêm về authentication django system [tại đây](https://docs.djangoproject.com/en/3.0/topics/auth/default/#auth-web-requests)

Trên đây là mình có giới thiệu một số middleware build-int được sử dụng phổ biến. 

# Middleware custom

Mình sẽ tạo 1 django project đơn giản.

Cấu trúc cây thư mực

```sh
$tree
.
├── blogs
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── db.sqlite3
├── manage.py
└── middleware_sample
    ├── asgi.py
    ├── __init__.py
    ├── middlewares.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py

5 directories, 21 files

```

... và các nội dung các file


```py
# blogs/views.py
import datetime
from django.http import HttpResponse


def index(request):
    now = datetime.datetime.now()
    template = f"""
        <html>
            <body>Current time: {now}.
            </body>
        </html>
    """
    return HttpResponse(template)


# middleware_sample/urls.py 
from django.contrib import admin
from django.urls import path

from blogs.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('time/', index),
]
```

Tiếp theo mình sẽ tạo 1 file chứa các custom middleware với tên `middlewares.py`

```py
# middleware_sample/middlewares.py 
class DemoMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)
        print("This is demo middleware in Django")
        # Code to be executed for each request/response after
        # the view is called.

        return response

    def process_exception(self, request, exception):
        pass

    def process_template_response(self, request, response):
        pass

```

Trong đó, `DemoMiddleware` là class chưa một example custom middleware. Tiếp theo, mình cần active middleware này lên tại Django setting.

```py
# middleware_sample/settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'middleware_sample.middlewares.DemoMiddleware' # custom middleware
]
```

Sau đó, bạn truy cập vào url: http://127.0.0.1:8000/time/

Bạn nhìn vào console log:

```sh
February 13, 2020 - 06:55:53
Django version 3.0.3, using settings 'middleware_sample.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
[13/Feb/2020 06:57:29] "GET /time/ HTTP/1.1" 200 116
This is demo middleware in Django
```

:v 

# Middleware order and layering

Middleware trong Django được order theo `top-down`. Đó là điểm lưu ý khi bạn sử dụng nhiều middleware. Dưới đây là thứ tự các build-in middleware được suggest:

- SecurityMiddleware
- UpdateCacheMiddleware
- GZipMiddleware
- SessionMiddleware
- ConditionalGetMiddleware
- LocaleMiddleware
- CommonMiddleware
- CsrfViewMiddleware
- AuthenticationMiddleware
- MessageMiddleware
- FetchFromCacheMiddleware
- FlatpageFallbackMiddleware
- RedirectFallbackMiddleware


# Conclusion

Middleware luôn là một phần không thể thiếu trong lập trình web. Như đã nói ở bên trên, Django không bắt buộc developer phải sử dụng middleware. Trong trường hợp sử dụng middleware built-in, bạn thấy không đáp ứng được bài toán thì việc define một middleware cũng rất đơn giản.