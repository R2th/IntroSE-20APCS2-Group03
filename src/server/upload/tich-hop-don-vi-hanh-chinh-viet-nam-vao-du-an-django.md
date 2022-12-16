# Lời nói đầu
Chào mọi người, mình xin tự giới thiệu mình là 1 dev về Django. Đây là lần đầu tiên mình viết blog nên nếu có gì sai sót mong mọi người góp ý để mình cải thiện và bổ sung nhé :D.<br>
Sau khi tham gia một số dự án, mình nhận thấy rằng chưa có thư viện nào hỗ trợ tích hợp các đơn vị hành chính của Việt Nam. Nên mình có tìm hiểu, tham khảo và cho ra lò được 1 thư viện tên là `django_vi_address`.<br>
Thư viện này sẽ hỗ trợ cho các dự án về Django đang cần tích hợp đơn vị hành chính Việt Nam một cách nhanh chóng. Nó cũng cung cấp sẵn một số endpoint để mọi người cài đặt xong là xài luôn :D.<br>
Đây là link github em nó: https://github.com/tinhpb9x/django-vi-address<br>
Giờ thì mình cùng tích hợp nó xem như nào nhé. Lét gô !
# 1. Khởi tạo dự án Django
- Đầu tiên, ta sẽ tạo 1 thư mục mới có tên là `my_django_site` để chứa dự án mà ta sẽ tích hợp:
```
$ mkdir my_django_site && cd my_django_site
```
- Tạo và kích hoạt môi trường ảo cho dự án:
```
$ virtualenv venv
$ source venv/bin/activate
```
- Ta sẽ tạo dự án có tên là `my_site`:
```
(venv) $ django-admin startproject my_site
```
- Truy cập vào dự án và tiến hành chạy thử:
```
(venv) $ cd my_site
(venv) $ python manage.py runserver
```
- Mở trình duyệt và truy cập http://127.0.0.1:8000/<br>
![](https://images.viblo.asia/29a708ed-ed9d-4a8a-bec2-fdbc85e01cc8.png)
# 2. Tích hợp thư viện `django_vi_address` vào dự án
- Cài đặt thư viện bằng `pip`:
```
(venv) $ pip install django-vi-address
```
- Cập nhật `INSTALLED_APPS`:<br>

Thư viện sẽ sử dụng `Django Rest Framework` để tạo endpoints nên cần cấu hình thêm `rest_framework`. Còn `vi_address` là app của thư viện.
```
INSTALLED_APPS = [
    ...
    'rest_framework',
    'vi_address',
    ...
]
```
- Cấu hình để sử dụng endpoints:
```
# my_site/urls.py
from django.urls import path, include # new

urlpatterns = [
    ...
    path('api/address/', include('vi_address.urls')), # new
]

```
- `Migrate` để tạo models:
```
(venv) $ python manage.py migrate
```
- Thêm dữ liệu các tỉnh/thành phố:
```
(venv) $ python manage.py insert_data --datatype=city
```
- Thêm dữ liệu các quận/huyện:
```
(venv) $ python manage.py insert_data --datatype=district
```
- Thêm dữ liệu các phường/xã:
```
(venv) $ python manage.py insert_data --datatype=ward
```
# 3. Giới thiệu các endpoints có sẵn
- `GET /api/address/cities`: Lấy ra danh sách tất cả tỉnh/thành phố của Việt Nam<br>
![](https://images.viblo.asia/91cf0c5e-1028-41a1-af3d-d3a4af6f88e6.png)
- `GET /api/address/city/{city_id}`: Lấy ra danh sách tất cả quận/huyện của 1 tỉnh cụ thể<br>
![](https://images.viblo.asia/b77d132b-6e1e-4828-8a5b-67e4d4e23b8e.png)
- `GET /api/address/district/{district_id}`: Lấy ra tất cả phường/xã của của 1 huyện cụ thể<br>
![](https://images.viblo.asia/429ac03b-f260-407f-8f88-b4f28a04bda8.png)
# 4. Kết
Qua bài này, mình muốn giới thiệu tới mọi người 1 cách tích hợp đơn vị hành chính của Việt Nam vào 1 dự án Django nhanh, gọn và lẹ nhất. Chắc chắn vẫn còn nhiều điều cần cải thiện nên mong nhận được những lời góp ý từ mọi người và hẹn gặp lại ở những series tiếp theo !
# 5. Nguồn dữ liệu
- Dữ liệu đơn vị hành chính mình sử dụng là định dạng json, được lấy từ repo: https://github.com/madnh/hanhchinhvn của anh Đỗ Danh Mạnh và anh Anh Nguyen. Trân trọng cảm ơn các anh !