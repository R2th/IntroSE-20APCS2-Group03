Như bài trước thì mình đã đi tìm hiểu cơ bản về các thành phần cơ bản của python. Nếu bạn nào chưa xem thì xem [tại đây](https://viblo.asia/p/gioi-thieu-ve-python-va-chuong-trinh-hello-world-924lJ3Ym5PM). Còn phần này mình sẽ đi tới một framwork cho website là Django. Let's go.

**Đầu tiên không thể thiếu được là phần giới thiệu cơ bản về Django**

Django là 1 web framework khá nổi tiếng được viết hoàn toàn bằng ngôn ngữ Python. Nó là 1 framework với đầu đủ các thư viện, module hỗ trợ các web-developer. Django sử dụng mô hình MVC và được phát triển bởi Django Software Foundation ([DSF](https://www.djangoproject.com/foundation/) một tổ chức phi lợi nhuận độc lập). Mục tiêu chính của Django là đơn giản hóa việc tạo các website phức tạp có sử dụng cơ sở dữ liệu. Django tập trung vào tính năng “có thể tái sử dụng” và “có thể tự chạy” của các component, tính năng phát triển nhanh, không làm lại những gì đã làm. Một số website phổ biến được xây dựng từ Django là Pinterest, Instagram, Mozilla, và Bitbucket.

Theo như trang chủ:
> Django makes it easier to build better Web apps more quickly and with less code
> 
> Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.

Với các khả năng được chia sẻ trên [trang chủ](https://www.djangoproject.com/) là:
* Ridiculously fast (Nhanh): Django was designed to help developers take applications from concept to completion as quickly as possible.
* Reassuringly secure (An toàn): Django takes security seriously and helps developers avoid many common security mistakes.
* Exceedingly scalable (có khả năng mở rộng): Some of the busiest sites on the Web leverage Django’s ability to quickly and flexibly scale.

**Cách cài đặt django framwork**

Điều kiện tiên quyết là phải cài đặt python trước (Điều này hiển nhiên rồi, ông đùa tôi à =)) )

Tiếp đó, chúng ta sẽ cài đặt Django Framwork:

-Cài đặt global:

```
sudo apt-get update

sudo apt-get install python3-pip
or
sudo apt-get install python-pip

sudo pip3 install django
or
sudo pip install django

django-admin --version
```

Ở đây, mình cứ chọn phiên bản mới mà dùng (python3). sau khi cài đặt nó sẽ như thế này (bản mình cài đặt là django-3.1.1):
![](https://images.viblo.asia/2e14122d-8d9b-4cef-a9e8-73b794b77c52.png)

-Cài đặt với Virtualenv

Đây là một cách linh hoạt nhất để cài đặt Django. Vitualenv là công cụ cho phép chúng ta tạo mồi trường Python ảo, nơi mà chúng ta giả định giống môi trường thật, nơi bạn có thể cài đặt bất kì gói python nào mà không ảnh hưởng đến môi trường thật trên máy. Điều này cho phép chúng ta thêm các các gói trên mỗi dự án khác nhau không sợ làm ảnh hưởng đến các dự án khác.

Cài đặt:

```
apt-get install python3-pip
pip3 install virtualenv
virtualenv -p python3 newenv
newEnv/bin/pip install django
```

Điều này sẽ cài đặt một phiên bản độc lập của Pyhton, pip vào 1 cấu trúc thư mục riêng là newenv. Để cài đặt các package vào môi trường ảo này thì ta phải active:

```
source newEnv/bin/activate
```

Nếu bạn muốn thoát khỏi môi trường này sử dụng cmd sau:
```
source newEnv/bin/deactive
```

Như thế này là cấu hình thành công:

![](https://images.viblo.asia/633e2c74-818d-4b36-870d-be7d53268b12.png)

Sau đó cài đặt framework và những package cần thiết khác (nếu cần):

```
django-admin --version
django-admin startproject helloworld
```

Chú ý không đặt tên project là django hoặc test

**Cấu trúc của thư mục**

Sau khi cài đặt django thành công chúng ta sẽ có 1 thư mục mới là *helloworld*.
Ta có cấu trúc thư mục của project:
```
helloworld
...manage.py
...helloworld
......asgi.py
......__init__.py
......settings.py
......urls.py
......wsgi.py
```

Các chức năng của các file project:
* `__init__.py` là 1 file rỗng chỉ định việc cái đường dẫn folder này sẽ được xem như là 1 Python package.
* `settings.py` là file chứa các settings của project. Trong file này chứa các setting cơ bản như DEBUG, ALLOWED_HOSTS, INSTALLED_APP, DATABASES, ...
* `urls.py` là file khai báo các URL của project.
* `wsgi.py` là file dùng deploy project lên server.
* `manage.py` là file để tạo app, migrate,...

Now let's create first app ✌️

Run câu lệnh sau ở cùng thư mục với file manage.py.

```
python manage.py runserver 8080
```

Ở câu lệnh này mình sẽ cho port ở cổng 8080 (vì bị trùng port với project khác mất rồi, các bạn có thể không cần)

Và đây là kết quả:

![](https://images.viblo.asia/b662f0d4-38b4-4f20-8b1b-6fbc2bd138f0.png)

Nếu các bạn để ý vào command sẽ có 18 warning này:
![](https://images.viblo.asia/976fb428-0f4f-47ba-bfec-8b5dc5f1bf92.png)

Hiện tại trong project, mình chưa setup các thứ cần thiết, mục tiêu chỉ để học hỏi cấu trúc thì có thể ko cần quan tâm đến những waring này, vì sau này làm những dự án lớn hơn thì sẽ cài đặt. Nhưng nếu thấy khó chịu thì các bạn có thể setup luôn:
```
python manage.py migrate
```

![](https://images.viblo.asia/54ca16d2-34b2-4200-a824-e26be9e8c0e1.png)

Sau đó sẽ ko còn waring nữa:
![](https://images.viblo.asia/51ad243a-e598-45a3-9a56-5b8f25378316.png)


**Tạo app đầu tiên**

Để tạo app đầu tiên chúng ta run command sau: 
```
python manage.py startapp myfirstapp
```

Trong thư mục helloWorld sẽ thêm một thư mục có tên myfirstapp, thư mục này có cấu trúc sau:

```
myfirstapp/
...__init__.py
...admin.py
...apps.py
...migrations/
......__init__.py
...models.py
...tests.py
...views.py
```

Các file:

* `admin.py` là một file cấu hình cho app
* `apps.py`  là một file cấu hình cho app
* `migrations` 
* `models.py` là nơi định nghĩa database models
* `tests.py` nơi viết test
* `views.py` là nơi xử lý logic request/ responce


Add myfirstapp vào file helloworld:
```
# config/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myfirstapp', # new
]
```

Sau đó chúng ta sẽ tạo ra một file chứa thông tin về url của myfirstapp:
```
touch myfirstapp/urls.py
```

Và thêm nội dung sau:
```
# pages/urls.py
from django.urls import path
from .views import homePageView

urlpatterns = [
    path('', homePageView, name='home')
]
```

Sau đó cấu hình đường dẫn url của file helloWorld/urls.py  đến file này:
```
from django.urls import path, include # new

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myFirstApp.urls')), # new
]
```

Chúng ta sẽ tiến hành sửa view hiển thị, edit file myfirstapp/view.py - là nơi xử lý logic request/ responce

```
from django.http import HttpResponse

def homePageView(request):
    return HttpResponse('Hello, World!')
```

Sau đó chúng ta chạy lại server để thấy được kết quả:
```
python manage.py runserver 8080
```

Và đây là thành quả:
![](https://images.viblo.asia/dfb84fcd-4e48-4be5-8720-902e32c5e9b6.png)

-----

Trên đây là những gì mình đang tìm hiểu về framework django dành cho phát triển web bằng django python,  do mình mới tìm hiểu có thể có sai sót, mong mọi người ném đá nhẹ nhàng. Cảm ơn mọi người đã quan tâm. :)