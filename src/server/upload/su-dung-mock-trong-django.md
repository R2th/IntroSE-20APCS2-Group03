Để không làm mất thời gian thì mình xin bắt đầu luôn.
## 1. Khởi tạo Project
Để test được thì đầu tiên chúng ta phải có 1 project. Cách để tạo 1 project như thế nào thì các bạn có thể tham khảo ở [đây](https://docs.djangoproject.com/en/3.1/intro/tutorial01/) nhé.

Sau khi tạo xong thì chúng ta có 1 cây thư mục như sau:
```
mysite/
├── cars
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── manage.py
└── mysite
    ├── asgi.py
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```
## 2. Tạo model
Tạo nhẹ 1 cái model như sau:

**cars/model.py**
```python
from django.db import models


    price = models.FloatField(null=False)
    fuel_type = models.CharField(null=False, max_length=100)
    name = models.CharField(null=False, max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def to_json(self):
        return {
            'id': self.id,
            'price': self.price,
            'name': self.name,
            'fuel_type': self.fuel_type,
        }
```
**mysite/settings.py**
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'cars'
]
```
Sau đó cần migrate:
```
mysite$ python manage.py makemigrations
mysite$ python manage.py migrate
```
## 3. Tạo services và API
Tiếp theo cần tạo `cars/services/services.py`
Chúng ta sẽ kiểm tra nếu xe nào giá từ 10000USD trở nên thì sẽ được xếp vào dòng xe sang nhé.
```python
class CarServices(object):

    @classmethod
    def is_luxury_car(cls, price):
        if price >= 10000:
            return True
        return False
```
**cars/views.py**
```python
from django.http import JsonResponse
from .models import Car
from .services.services import CarServices


def list_luxury_cars(request):
    cars = Car.objects.all()
    data = []
    for car in cars:
        if CarServices.is_luxury_car(car.price):
            data.append(car.to_json())
    return JsonResponse({'data': data})
```
**mysite/urls.py**
```python
from django.contrib import admin
from django.urls import path
from cars import views as car_views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('cars/', car_views.list_luxury_cars, name='list_luxury_cars')
]
```
## 4. Bắt đầu test
Đầu tiên chúng ta kiểm tra xem services chúng ta có hoạt động đúng không nhé.
**cars/tests/test_is_luxury_car.py**
```python
from django.test import TestCase
from cars.services.services import CarServices


class CarTests(TestCase):
    def test_is_luxury_car(self):
        is_luxury_car = CarServices.is_luxury_car(20000)
        self.assertEqual(is_luxury_car, True)

    def test_not_luxury_car(self):
        is_luxury_car = CarServices.is_luxury_car(2000)
        self.assertEqual(is_luxury_car, False)
```
TIếp theo cần test API:
**cars/tests/test_list_luxury_cars.py**
```python
from django.test import TestCase
from cars.models import Car
from django.test import Client

client = Client()


class CarTests(TestCase):
    def setUp(self):
        Car.objects.create(price=20000, fuel_type='gasoline', name='Rover Range Rover Evoque')
        Car.objects.create(price=2000, fuel_type='diesel oil', name='Mercedes E300 AMG')

    def test_list_luxury_cars(self):
        response = client.get('/cars/')
        result = {
            'data': [
                {
                    'fuel_type': 'gasoline',
                    'id': 1,
                    'name': 'Rover Range Rover Evoque',
                    'price': 20000.0
                }
            ]
        }
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), result)

```
Bắt đầu chạy nào:
```shell
mysite$ python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...
----------------------------------------------------------------------
Ran 3 tests in 0.004s

OK
Destroying test database for alias 'default'...
```
Vậy là thành công. bây giờ chúng ta sẽ sử dụng mock `is_luxury_car` luôn gửi về kết quả là **False** nhé, chúng ta sẽ thay đổi code như sau:
```python
from unittest.mock import patch
...
    @patch('cars.services.services.CarServices.is_luxury_car', return_value=False)
    def test_list_luxury_cars(self, is_luxury_car):
        ...
```
Và run test lại nào:
```shell
mysite$ python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
..F
======================================================================
FAIL: test_list_luxury_cars (cars.tests.test_list_luxury_cars.CarTests)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/home/pham.van.ducb/.pyenv/versions/3.7.3/lib/python3.7/unittest/mock.py", line 1204, in patched
    return func(*args, **keywargs)
  File "/home/pham.van.ducb/Desktop/mysite/cars/tests/test_list_luxury_cars.py", line 28, in test_list_luxury_cars
    self.assertEqual(response.json(), result)
AssertionError: {'data': []} != {'data': [{'fuel_type': 'gasoline', 'id': 1, 'name'[44 chars].0}]}
- {'data': []}
+ {'data': [{'fuel_type': 'gasoline',
+            'id': 1,
+            'name': 'Rover Range Rover Evoque',
+            'price': 20000.0}]}

----------------------------------------------------------------------
Ran 3 tests in 0.005s

FAILED (failures=1)
Destroying test database for alias 'default'...
```
Vậy là response đã bị thay đổi rồi. Sửa lại test cho đúng nha:
```python
    @patch('cars.services.services.CarServices.is_luxury_car', return_value=False)
    def test_list_luxury_cars(self, is_luxury_car):
        response = client.get('/cars/')
        result = {'data': []}
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), result)
```
Và:
```shell
mysite$ python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...
----------------------------------------------------------------------
Ran 3 tests in 0.004s

OK
Destroying test database for alias 'default'...

```
Vậy là chúng ta đã mock thành công. Có thể thấy cách sử dụng mock cũng rất dễ dàng đúng không bạn.
Để tìm hiểu nhiều hơn về mock. Bạn có thể tham khảo thêm tại [đây](https://docs.python.org/3/library/unittest.mock.html#module-unittest.mock) nhé. Xin cảm ơn.