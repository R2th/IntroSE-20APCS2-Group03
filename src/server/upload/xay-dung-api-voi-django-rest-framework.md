### Lời mở đầu
Trong thời gian vừa qua mình có tìm hiểu về Python và Django. Mình muốn chia sẻ với các bạn những thứ mình đã tìm hiểu được và mình đã tạo ra những API bằng Django như thế nào. Let's go.

## 1. Giới thiệu chung
Trước khi bắt đầu vào code thì chúng ta lướt qua một chút về lí thuyết nhỉ. 

### 1.1. Restful

#### Khái niệm
**API** (**A**pplication **P**rogramming **I**nterface) là một tập các quy tắc và cơ chế mà theo đó, một ứng dụng hay một thành phần sẽ tương tác với một ứng dụng hay thành phần khác. API có thể trả về dữ liệu mà bạn cần cho ứng dụng của mình ở những kiểu dữ liệu phổ biến như JSON hay XML. 

**Restful** (**RE**presentational **S**tate **T**ransfer) là một dạng chuyển đổi cấu trúc dữ liệu, một kiểu kiến trúc để viết API. Nó sử dụng phương thức HTTP đơn giản để tạo cho giao tiếp giữa các máy. Vì vậy, thay vì sử dụng một URL cho việc xử lý một số thông tin người dùng, REST gửi một yêu cầu HTTP như GET, POST, DELETE, vv đến một URL để xử lý dữ liệu.

**RestAPI** là một tiêu chuẩn dùng trong việc thiết kế các API cho các ứng dụng web để quản lý các resource. RESTful là một trong những kiểu thiết kế API được sử dụng phổ biến ngày nay để cho các ứng dụng (web, mobile…) khác nhau giao tiếp với nhau.

Chức năng quan trọng nhất của REST là quy định cách sử dụng các HTTP method (như GET, POST, PUT, DELETE…) và cách định dạng các URL cho ứng dụng web để quản các resource. RESTful không quy định logic code ứng dụng và không giới hạn bởi ngôn ngữ lập trình ứng dụng, bất kỳ ngôn ngữ hoặc framework nào cũng có thể sử dụng để thiết kế một RESTful API.

#### Cách hoạt động của Restful
![](https://images.viblo.asia/0f97151c-2c59-4655-a140-43f42a874f14.png)
REST hoạt động chủ yếu dựa vào giao thức HTTP. Các hoạt động cơ bản nêu trên sẽ sử dụng những phương thức HTTP riêng.

* GET (SELECT): Trả về một Resource hoặc một danh sách Resource.
* POST (CREATE): Tạo mới một Resource.
* PUT (UPDATE): Cập nhật thông tin cho Resource.
* DELETE (DELETE): Xoá một Resource.

Những phương thức hay hoạt động này thường được gọi là CRUD tương ứng với Create, Read, Update, Delete – Tạo, Đọc, Sửa, Xóa.
### 1.2. Diango Rest Framework
Django Rest Framework giúp xây dựng RestAPI trong Django một cách thuận tiện nhất ^^ 

## 2. Cài đặt Django
### Bài toán
Mình sẽ viết những API phục vụ cho phép thực hiện Create, Read, Update và Delete cars.

Car bao gồm những field sau:
* Name
* Color
* Brand

**Để tạo một ứng dụng django, điều đầu tiên chúng ta cần làm là cài đặt django trên thiết bị của bạn**

### 2.1. Môi trường ảo
Trước tiên, chúng ta hãy xem xét tạo một môi trường ảo cho project để có thể quản lí các packages của mình một cách độc lập.

Ở đây sẽ sử dụng `pipenv` cho môi trường của mình.
Các bạn có thể tham khảo cách cài đặt `pipenv` tại [đây](http://manpages.ubuntu.com/manpages/eoan/man1/pipenv.1.html).

Sau khi cài đặt xong `pipenv`, chúng ta chạy lệnh để truy cập vào môi trường ảo của mình
```shell
$ pipenv shell
```

### 2.2. Cài đặt ứng dụng Django
Cài đặt Django và Django REST Framework vào môi trường ảo
``` 
$ pipenv install django
$ pipenv install djangorestframework
```
Cài đặt một project mới với một ứng dụng trong đó
```shell
$ django-admin startproject src .
$ django-admin startapp car
```
Và chúng ta nhận được cấu trúc thư mục của project như sau:
```shell
./car
./car/admin.py
./car/__init__.py
./car/views.py
./car/apps.py
./car/models.py
./car/migrations
./car/migrations/__init__.py
./car/tests.py
./manage.py
./src
./src/wsgi.py
./src/__init__.py
./src/settings.py
./src/urls.py
./Pipfile
./Pipfile.lock
```
Với project và ứng dụng đã được tạo ở trên, lần đầu tiên cần đồng bộ hóa database của mình và tạo user đầu tiên và đặt password cho user đó.
```shell
$ python manage.py migrate
```
```shell
$ python manage.py runserver
```
Và khi cài đặt xong xuôi, các bạn truy cập vào `127.0.0.1:8000` và kết quả chúng ta nhận được là? ![](https://images.viblo.asia/91849836-634b-4cf6-960b-c6a9c8aa9ba9.png)

### 2.2. Model
Đầu tiên, tạo một Model để lưu trữ các dữ liệu về `Cars` sẽ được trả về trong response. Mở file `car/models.py` và nhập đoạn code sau:
```python
from django.db import models

# Create your models here.
class Car(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)

    def __str__(self):
        return self.name
```
### 2.3. Serializer
```python
from rest_framework import serializers

from car.models import Car

class CarSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Car
        fields = ('name', 'color', 'brand')
```
### 2.4. View
```python
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from car.models import Car
from car.serializers import CarSerializer

class ListCreateCarView(ListCreateAPIView):
    model = Car
    serializer_class = CarSerializer

    def get_queryset(self):
        return Car.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = CarSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Create a new Car successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new Car unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)

class UpdateDeleteCarView(RetrieveUpdateDestroyAPIView):
    model = Car
    serializer_class = CarSerializer

    def put(self, request, *args, **kwargs):
        car = get_object_or_404(Car, id=kwargs.get('pk'))
        serializer = CarSerializer(post, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Update Car successful!'
            }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Update Car unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        car = get_object_or_404(Car, id=kwargs.get('pk'))
        car.delete()

        return JsonResponse({
            'message': 'Delete Car successful!'
        }, status=status.HTTP_200_OK)
```
### 2.5. Url
```python
from django.urls import path

from . import views

urlpatterns = [
    path('cars', views.ListCreateCarView.as_view()),
    path('cars/<int:pk>', views.UpdateDeleteCarView.as_view()),
]
```
### 2.6. Setting
```python
INSTALLED_APPS = [
    ...
    'rest_framework',

    'car.apps.CarConfig'
]
```
Sau khi đã tạo ra được một ứng dụng hoàn chỉnh, việc của chúng ta là tạo migration
```shell
$ python manage.py makemigrations
$ python manage.py migrate
```
### 2.7. Test API
Và cuối cùng thì chúng ta cùng hưởng thành quả nào:
```shell
$ python manage.py runserver
```
Khi làm việc với API thì mình thường dùng [Postman](https://www.postman.com/) để kiểm tra những API đó:
##### Create Car
![](https://images.viblo.asia/587510f0-bd29-4d00-9c16-a16261b5ed75.png)

##### Update Car
![](https://images.viblo.asia/7ea4154c-8694-4038-b1f1-5ef554118dfe.png)

##### Delete Car
![](https://images.viblo.asia/27f83c5c-00a6-455d-a15c-3d7a7c259492.png)

##### Get all Car
![](https://images.viblo.asia/496edf11-14f4-4812-87c5-5103d08ab9f0.png)

### Lời kết
Trên đây là toàn bộ quá trình khi mình bắt đầu tìm hiểu và tiếp cận Django Rest. Có chỗ nào sai hoặc chưa đúng các bạn các bạn cứ cho mình xin gạch đá ở dưới comment.

##### Và lời cuối chúc các bạn thành công trong con đường học tập và tìm hiểu về Django nói chung và Django Rest Framework nói riêng.

**Related Links** :
* https://medium.com/swlh/build-your-first-rest-api-with-django-rest-framework-e394e39a482c
* https://techtalk.vn/tat-tan-tat-ve-api.html <br>

**Link Github:** https://github.com/nguyenhuuhai98/django-rest-framework