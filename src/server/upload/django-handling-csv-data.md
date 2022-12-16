Khi làm việc với các dự án Python hay Django thì phần xử lý CSV hầu như là không thể thiếu. Qua bài viết này, các bạn hãy cùng mình hiểu rõ hơn về CSV cũng như xử lý chúng ra sao nhé. Let's Go!
## 1. CSV là gì?
CSV (Comma Separated Values) là một loại định dạng văn bản đơn giản mà trong đó, các giá trị được ngăn cách với nhau bằng dấu phẩy. Định dạng CSV thường xuyên được sử dụng để lưu các bảng tính quy mô nhỏ như danh bạ, danh sách lớp, báo cáo…<br>

Một văn bản CSV gồm nhiều dòng chứa các giá trị và các dấu phẩy. Dòng đầu tiên của văn bản CSV chứa tên của từng cột trong bảng tính, mỗi cột được xác định bằng 2 dấu phẩy (trừ cột đầu tiên và cuối cùng). Tất cả những dòng sau đó đều có cấu trúc tương tự, chứa các giá trị tương ứng của từng cột. Và mỗi dòng của văn bản là một dòng giá trị khác nhau trên bảng tính.<br>
**Ví dụ về một file CSV**
```
Name,Email,Address,Phone
Sima,simathapa111@gmail.com,Nadipur,98148212416
Gita,geeta12@outlook.com,Pokhara,+97789954742
```
## 2. Chuẩn bị
Trước khi thực hiện xử lý file CSV thì trước tiên chúng ta phải tạo ra một project Django nha. Đối với các bạn nào đã có sẵn một project Django cho mình rồi thì các bạn có thể bỏ qua bước này và di chuyển đến **Bước 3.**
### Môi trường
Để tạo ra một project django thì cần chuẩn bị đầy đủ môi trường nha. Ở đây chúng ta cần:
- pip
- pipenv
- django
- djangorestframework
### Project
Sau khi đã cài đặt đầy đủ các môi trường kể trên, chúng ta hãy tạo một project mới.
```python
$ django-admin startproject handle_csv .
$ django-admin startapp csvfile
```
Và mình cũng sửa lại model User một chút để thuận tiện cho việc xử lý CSV. 
```python
# csv_file/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Delete not use field
    username = None
    last_login = None
    is_staff = None
    is_superuser = None
    role = None

    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=10)
    address = models.TextField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.email
```
Và đừng quên `migrate` nhé. <br>
Alright, các công đoạn chuẩn bị về môi trường cũng như project đã xong. Giờ cùng nhau thực hiện xử lý file CSV nha.
## 3. Import CSV
```python
# csv_file/views.py
import csv

from io import TextIOWrapper
from rest_framework.response import Response
from rest_framework.views import APIView

from csv_file.models import User


class CSVHandleView(APIView):
    def post(self, request, *args, **kwargs):
        if 'file' in request.FILES:
            # Handling csv file before save to database
            form_data = TextIOWrapper(request.FILES['file'].file, encoding='utf-8')
            csv_file = csv.reader(form_data)
            next(csv_file)  # Skip read csv header

            users_list = []

            for line in csv_file:
                user = User()
                user.first_name = line[0]
                user.last_name = line[1]
                user.email = line[2]
                user.phone_number = line[3]
                user.address = line[4]
                users_list.append(user)

            # Save to database
            User.objects.bulk_create(users_list)

        return Response({
            'message': 'Import Done!'
        })
    
    def get(self, request, *args, **kwargs):
        # Export CSV
```
Đến đây, `csv_file` mà chúng ta nhận được đã hoàn hảo để xử lý lưu vào db rồi. Việc đơn giản sẽ lấy từng line và create đúng không nào ?
Nhưng để tránh `N+1` nên mình đã sử dụng `bulk_create` thay vì `create` thông thường.<br>
Để có thể test được chức năng này, chúng ta tạo cho nó một "chiếc" url nha.
```python
# csv_file/urls.py
from django.urls import path

from . import views

app_name = 'csv_file'

urlpatterns = [
    path('user/csv', views.CSVHandleView.as_view(), name='csv_handle'),
]
```
Lí do mình sử dụng 1 `class View` cho cả 2 chức năng `import` và `export CSV` bởi mình chỉ cần khai báo một url cho cả 2. Và cách phân biệt chúng rất đơn giản, đó là dựa vào method của request là được.

Nào, giờ hãy test bằng `Postman` với file `.csv` mình đã tạo sẵn ở **[đây](https://sal.vn/bpF0Dt)** nha. 
## 4. Export CSV
```python
# csv_file/views.py
import csv

from time import strftime

from django.http import HttpResponse
from rest_framework.views import APIView

from csv_file.models import User


class CSVHandleView(APIView):
    def post(self, request, *args, **kwargs):
        # Import CSV

    def get(self, request, *args, **kwargs):
        headers = ['First Name', 'Last Name', 'Email', 'Phone Number', 'Address']
        file_name = f"users_{strftime('%Y-%m-%d-%H-%M')}"

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{file_name}.csv"'

        writer = csv.writer(response)
        writer.writerow(headers)

        users = User.objects.values('first_name', 'last_name', 'email', 'phone_number', 'address')

        for user in users:
            line = []
            for row in user.values():
                line.append(row)
            writer.writerow(line)

        return response
```

### Lời kết 
Cảm ơn các bạn đã dành thời gian đọc bài viết. Nếu bài viết có ích, đừng quên cho mình một upvote nha.

Link github: https://github.com/nguyenhuuhai98/django_csv