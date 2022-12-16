Xin chào tất cả mọi người, vậy là mình đã tiếp tục come back với loạt bài viết về Python đây ạ.<br>
Như các bạn đã biết thì Python là một ngôn ngữ rất mạnh trong lĩnh vực AI (Artificial Intelligence) cũng như <br>các ứng dụng liên quan. Nhưng có bao giờ các bạn tự hỏi là liệu Python có được dùng trong phát triển web hay không? :grinning: <br>
Và câu trả lời chính xác là có nhé. Python cũng được dùng để phát triển web tuy nhiên số lượng không được nổi trội <br>như người anh em PHP mà thôi. :)<br>
Và tất nhiên python cũng có một vài framework hỗ trợ đến tận răng trong việc phát triển web như là: Django, Flask, Pyramid, ...<br>
Hôm nay thì mình sẽ giới thiệu với các bạn về framework Django.
# Tổng quan về Django
> Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. <br>Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on <br>writing your app without needing to reinvent the wheel. It’s free and open source
> 
Đó chính là câu giới thiệu về Django từ trang chủ https://www.djangoproject.com/ và đây là bản dịch từ chị gu gồ của nó.<br>
> Django là một khung Web Python cấp cao, khuyến khích phát triển nhanh chóng và thiết kế thực dụng, gọn gàng.<br> Được xây dựng bởi các nhà phát triển có kinh nghiệm, nó xử lý nhiều rắc rối của việc phát triển Web, vì vậy bạn có<br> thể tập trung vào viết ứng dụng của mình mà không cần phải phát minh lại bánh xe. Nó có nguồn mở và miễn phí.
> 
Đọc qua thì mình cũng bối rối lắm nên thôi túm gọn như thế này cho dễ hiểu :v: <br>
Về cơ bản thì django là một web framework khá nổi tiếng được viết hoàn toàn bằng ngôn ngữ Python với đầy đủ<br> các module, thư viện hỗ trợ chúng ta trong việc phát triển web.<br>
Django cho phép chúng ta có thể tái sử dụng lại và có thẻ tự chạy các component, từ đó giúp việc phát triển <br>web trở nên nhanh chóng và gọn gàng.<br>
# Tại sao lại sử dụng Django
Với django bạn có thể lấy các ứng dụng web từ ý tưởng để khởi chạy trong vài phút. Và để làm được điều này thì<br> django có một vài tính năng nhẹ như sau:<br>
* Nhanh: Django được thiết kế để giúp các nhà phát triển đưa các ứng dụng từ ý tưởng đến hoàn thành <br>càng nhanh càng tốt..
* Có đầy đủ các thư viện/module cần thiết: Django bao gồm hàng tá các tính năng bổ sung mà bạn có thể <br>sử dụng để xử lý các tác vụ phát triển Web phổ biến. Django chăm sóc xác thực người dùng, quản trị <br>nội dung, bản đồ trang web, nguồn cấp dữ liệu RSS và nhiều tác vụ khác - ngay lập tức.
* Đảm bảo về tính bảo mật: Django rất coi trọng vấn đề bảo mật và giúp các nhà phát triển tránh được <br>nhiều lỗi bảo mật phổ biến, chẳng hạn như SQL SQL, kịch bản chéo trang, giả mạo yêu cầu chéo trang<br> và nhấp chuột. Hệ thống xác thực người dùng của nó cung cấp một cách an toàn để quản lý tài khoản <br>và mật khẩu người dùng.
* Khả năng mở rộng tốt: Một số địa điểm bận rộn nhất trên hành tinh sử dụng khả năng có thể mở rộng nhanh <br>chóng và linh hoạt của django để đáp ứng nhu cầu giao thông nặng nhất.
* Tính linh hoạt: Các công ty, tổ chức và chính phủ đã sử dụng Django để xây dựng tất cả mọi thứ - từ hệ thống <br>quản lý nội dung đến mạng xã hội đến nền tảng điện toán khoa học.

Mấy cái tính năng này mình dịch từ trang chủ của django thông qua chị gu gồ nên nghĩa nó hơi chuối một tý. <br>Các bạn cố gắng nuốt trôi nhé :)<br>
Mà thôi, luyên thuyên cũng đủ rồi giờ mình xin phép được đi sang phần cài đặt django nhé :)
# Cài đặt Django
Ở đây chúng ta cài đặt thông qua virtualenv và pip nha. Chú ý là hướng dẫn cài đặt này chỉ dùng trên ubuntu thôi nhé <br>mọi người. Để cài đặt django thì các bạn sử dụng gói combo thần thánh sau đây:<br>
```
$ sudo apt-get update && sudo apt-get install python-virtualenv python-pip build-essential
python-dev libffi-dev libssl-dev libxml2-dev libxslt1-dev postgresql python-psycopg2 -y
$ mkdir django-framework
$ cd mdjango-framework
$ virtualenv -p python3 djangotut
$ djangotut/bin/pip install django
```
Folder django-framework sẽ là nơi chúng ta thực thi django. Và trước khi code với django thì chỉ cần <br>
`source djangotut/bin/activate` trong terminal là được.<br>
# Tạo project demo
Để render ra 1 template với full cấu trúc cho django project thì các bạn chỉ cần chạy lệnh <br>`django-admin startproject project_name` sau khi đã active virtualenv.<br>
> Chú ý: Không đặt tên project là django hoặc test. Và không như PHP đặt code ở /var/www <br>Django sẽ tránh đặt ở các folder root, để bảo mật code. Bạn có thể đặt code ở /home/xxx
> 
Ở đây mình đặt tên project là demo_django, và sau khi chạy lệnh trên thì mình có được 1 folder với cấu trúc như sau:<br>
```
demo_django
...manage.py
...demo_django
......__init__.py
......settings.py
......urls.py
......wsgi.py
```
Những file trong này đều có 1 chức năng riêng và cụ thể nó sẽ như sau:
* `__init__.py` là 1 file rỗng chỉ định việc cái đường dẫn folder này sẽ được xem như là 1 Python package.
* `settings.py` là file chứa các settings của project. Trong file này chứa các setting cơ bản như DEBUG, ALLOWED_HOSTS, INSTALLED_APP, DATABASES, ...
* `urls.py` là file khai báo các URL của project (kiểu như routing, với địa chỉ nào thì sẽ thực thi hàm nào).
* `wsgi.py` là file dùng deploy project lên server.
* `manage.py` là file để tạo app, migrate,...

Bây giờ các bạn có thể chạy lệnh `python manage.py runserver` và vào link `http://127.0.0.1:8000/` để thấy điều kỳ diệu nha.<br>
Now let's create own first app :v:<br>
## Tạo app đầu tiên
Để tạo 1 app thì các bạn cần phải vào cùng thư mục với file manage.py và chạy lệnh `python manage.py startapp your_app_name`<br>
Ở đây thì mình sẽ tạo 1 app tên là mypage => câu lệnh của mình sẽ là: `python manage.py startapp mypage`.
Và cấu trúc folder mypage mới tạo của mình sẽ như sau:<br>
```
mypage/
...__init__.py
...admin.py
...apps.py
...migrations/
......__init__.py
...models.py
...tests.py
...views.py
```
## Tạo view
Các bạn mở file views.py vừa mới tạo trong thư mục mypage lên và thêm vào đoạn sau:
```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello all, it's my first page.")
```
Sau đó bạn cần config lại URL bằng cách tạo thêm file urls.py trong thư mục mypage. <br>Trong này sẽ chứa những config url dành cho app mypage.<br>
```python
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```
Tiếp theo bạn thêm đoạn code sau vào file urls.py của thư mục demo_django để thực hiện việc trỏ rootURL <br>đến module mypage.urls.
```python
from django.urls import include, path
from django.contrib import admin

urlpatterns = [
    path('mypage/', include('mypage.urls')),
    path('admin/', admin.site.urls),
]
```

Cuối cùng các bạn run lại server bằng lệnh `python manage.py runserver` và  vào link `http://127.0.0.1:8000/mypage/` để cảm nhận thành quả.<br>
# Tổng kết
Trên đây là những gì mình đang tìm hiểu về framework django dành cho phát triển web bằng python. Do hạn chế về <br>mặt kiến thức nên nếu có gì sai sót mong các bạn bỏ qua cho.<br>
Ở bài sau mình sẽ cố gắng tạo 1 vài app có sử dụng database, ORM (object relational mapping), Model, ... để project của <br>chúng ta càng thêm hoàn chỉnh.<br>
Cuối cùng thì bài viết có tham khảo từ nguồn: [tạo một trang web sử dụng django](https://medium.com/@doanhtu/l%C3%A0m-sao-%C4%91%E1%BB%83-t%E1%BA%A1o-1-trang-web-v%E1%BB%9Bi-django-i-fddff91786f7) nên mong chủ thớt có đọc <br>được cũng đừng ném gạch nha :).<br>
Trang chủ django: https://www.djangoproject.com/ <br>
From 825 ... with love :)