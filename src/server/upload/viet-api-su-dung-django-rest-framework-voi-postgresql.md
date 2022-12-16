# Giới thiệu
Trong bối cảnh phát triển web, chúng ta thường nói về RESTful API. Đây là một cách phổ biển để cung cấp ứng dụng cho bên thứ ba ( các ứng dụng và web ). Điều này chỉ cần cung cấp thông tin lưu trữ trong cơ sở dữ liệu ở định dạng phổ biến như XML hoặc JSON, bằng cách này một ứng dụng bên thứ ba có thể tương tác với dữ liệu  mà không cần kết nối trực tiếp với cơ sở dữ liệu , cũng vì thế không quan trọng cơ sở dữ liệu là MySQL hay PostgreSQL, hoặc nếu ứng dụng được viết bằng Java hoặc Python, nhưng RESTful APIs có thể được sử dụng để sửa chữa cơ sở dữ liệu.
![](https://images.viblo.asia/25110c36-f65a-433e-8420-81a1363163e9.png)

Django REST framework là một công cụ hỗ trợ đắc lực trong việc xây dựng WebAPI. Một số lý do khi ta nên sử dụng REST:
* Có hỗ trợ dữ liệu ORM và non-ORM với Serialization.
* Tài liệu phong phú, cộng đồng hỗ trợ lớn.
* Được sử dụng trong các công ty quốc tế như Mozilla, Red Hat, Heroku.
# Cài đặt
### 1.Django và Django REST framework
Ta sử dụng lần lượt các câu lệnh sau:
```bash
pip install django
django -admin --vesion // check phiên bản đã cài đặt
```
Sau đó ta tạo một folder chứa application:
```bash
mkdir TodosProject
cd TodosProject
django-admin startproject todos 
```
Tiếp theo install Django REST framework:
```bash
pip install djangorestframework
```
Và phần cài đặt và kết nối Django với Postgres thì ta làm theo bài viết sau:
https://viblo.asia/p/ket-noi-django-va-postgresql-nhu-the-nao-4P856NDa5Y3.
Như vậy ta tạm thời có đủ các công cụ cần thiết. Bây giờ là **Chiến** :ok_hand::ok_hand:!!!
# Thực hiện
Trong folder Django ta vừa tạo bên trên có cấu trúc như sau:
![](https://images.viblo.asia/fa01a58f-5287-4af4-9165-cddd5676c05a.png)
Các thành phần cụ thể như sau:
* **admin.py** : File config trong trang admin của app.
* **models.py**: Nơi tạo dữ liệu, các trường, các bảng.
* **test.py** : File unit test.
* **views.py** : Truy vấn dữ liệu từ model.
Trước hết là như thế đã.
### 1. Models
Để đơn giản ta tạo thử một models.py như sau:
![](https://images.viblo.asia/f29c2042-a700-4d0e-bf67-7ffb5e6d0db2.png)

Ta hiểu trong class model chính là tên bảng có các thuộc tính chính là các trường dữ liệu mà ta muốn tạo ở PostgresSQL.
Với file admin.py ta sẽ có các list thuộc tính ta đã khai báo trong file models.py :
![](https://images.viblo.asia/2c4fb7db-b954-4f98-8b87-189563332fb2.png)

File app.py:
![](https://images.viblo.asia/20f0f724-b1e7-4795-9bab-61504231ac8b.png)

Ta tạo một folder api gồm serializers.py và viewset.py.Đây là 2 file ta sẽ code thao tác để tạo được API.

 Trong file serializers.py như sau:
```python
from rest_framework import serializers
from todos.models import Company

class CompanySerialiser(serializers.HyperlinkedModelSerializer):
     class Meta:
                 model = Company
                 fields = ('_id', 'name', 'age', 'adress', 'salary', 'join_date')
```

FIle viewset.py như sau :
```python
from django.http import JsonResponse
from todos.models import Company

def getJson(request):
    obj = Company.objects.all()
    data = { "result" :list(obj.values("_id", "name", "age", "adress", "salary", "join_date"))
            }
    return JsonResponse(data)
```
Bên trên là kết quả mà ta nhận được hiển thị một chuỗi Json có dạng :
```python
{ "result" : [
        {     "id": value,
              "name": value,
              "age": value,
              "adress" : value,
              "salary" : value,
              "join_date" :value
         }
         ]}
         
```
Cụ thể kết quả ta xem bên dưới.
### 2.Settings
Phần quan trọng tiếp theo ta cài đặt DjangoRest framework trong file settings.py :
```python


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'todos'
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
      'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
```
### 3.Urls
Để lấy được data ta tạo chuỗi URLs trong file urls.py:
```python
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todos.api.viewset import getJson

router = router. DefaultRouter()

urlpattenrns = [
        path('admin/',admin.site.urls),
        path(r'',include(router.urls),
        path(r'api/data/', getJson, name='getJson')
]
```
Ta có thể tùy chỉnh URL trong hàm path bên trên.
### 4.Run
Vậy là ta đã hoàn thành phần code xây dựng API. Để run được ta dùng lệnh :
```python
python manage.py makemigrations
python manage.py migrate

# Run
python manage.py runserver
```
 Khi start ta thấy :
![](https://images.viblo.asia/9458dad5-b35d-4876-b292-abfe24aeafbd.png)

Ta sẽ chạy server bên trên ta được:
![](https://images.viblo.asia/4340e499-edc7-4240-b949-ca16bf8dfb9a.png)

Ta thêm / admin vào đường link bên trên ta sẽ vào được trang quản trị.
**Note** : Điểu quan trọng các bạn đã tạo createsuperuser trước khi vào trang này. Cách tạo có trong link Viblo bên trên.
Khi vào ta sẽ thấy bảng Company và khi nhấn vào ta sẽ thấy các trường ta đã code trong models.py:
![](https://images.viblo.asia/7ae0505a-f7eb-44b8-845f-217f5e30c469.png)
       Hình 1. Link đầu tiên
![](https://images.viblo.asia/6078f884-a1db-4378-907b-6b92901b9768.png)

Ta thử thêm các dữ liệu vào SAVE :
![](https://images.viblo.asia/cd2678bf-7182-46a8-83f1-d40c874e6c6a.png)

Vậy là ta đã có dữ liệu . Bây giờ là lấy data dạng Json. Nhớ lại lúc ta code file urls.py thì URL có thêm /api/data.Kết quả nhận được như sau:
![](https://images.viblo.asia/94dfa528-2ae8-42ca-bd97-4d075ce7e7b4.png)

Thử với Postman:

![](https://images.viblo.asia/bc866063-42b9-4942-9761-711428dffc2c.png)

Ngon lành cành đào.Hehe !!

Ta cũng thử check xem db có được tạo hay chưa bằng terminal:
![](https://images.viblo.asia/f102abe1-e2cb-4b5d-bfd9-b4d56c05fbc2.png)

Đã OK...
# Kết luận
Vậy là ta đã tạo một app đơn giản sử dụng Django Rest framework sử dụng PostgresSQL. Trong quá trình thực hiện ta sẽ gặp một số lỗi về connect PostgresSQL với Django, không insert được data, không lấy được data,...nếu thấy căng thẳng hãy đứng dậy đi lại, uống nước rồi sau đó fix lỗi tiếp dù không biết có thành công hay không :laughing::laughing: 
Ngoài ra các bạn cũng truy cập vào link :
https://www.django-rest-framework.org/tutorial/quickstart/ để xem thêm nhiều thứ hay ho.
Chúc các bạn may mắn. Hẹn gặp lại vào bài viết tiếp theo.
# Tài liệu tham khảo
1. https://www.django-rest-framework.org/tutorial/quickstart/
2. https://medium.com/@johnking_75842/django-rest-framework-api-setup-w-jsonapi-and-postgres-database-2cd11038b43b
3. https://viblo.asia/p/ket-noi-django-va-postgresql-nhu-the-nao-4P856NDa5Y3.