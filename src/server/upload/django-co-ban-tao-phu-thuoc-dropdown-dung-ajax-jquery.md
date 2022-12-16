![](https://images.viblo.asia/b1d429c2-53ba-4c5f-81a5-d23d728b448a.jpg)

Hôm nay chúng ta sẽ tìm hiểu cách tạo một danh sách hiện thị phụ thuộc vào một **field** nào đó nhé. Trường hợp hay sử dụng là chọn các Tỉnh/Thành phố, hay chọn cầu thủ của một câu lạc bộ ...

Trong ví dụ này mình sử dụng :
*   Django 2.0.5
*   Python 3.6.3
*   Bulma CSS 

Chúng ta bắt đầu nào!


-----
Trong ví dụ này, chúng ta sẽ tạo một  **Field** chọn các danh sách cầu thủ của câu lạc bộ mà người dùng ưu thích.
### Đầu tiên hãy tạo ứng dụng như sau

#### models.py
```
from django import models

class Football(models.Model):
    name = models.CharField(('CLB'),max_length = 50)
    
    class Meta:
        ordering = ('name',)
        
    def __str__(self):
        return self.name

class Player(models.Model):
    name= models.CharField(('tên'), max_length=140)
    clb = models.ForeignKey(Football, on_delete=models.CASCADE)
    
    class Meta:
        ordering  = ('name',)
    
    def __str__(self):
        return self.name

class Person(models.Model):
    name = models.CharField(max_length=100)
    team = models.ForeignKey(Football, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
  
```
Chúng ta vừa tạo ra model gồm `Football`  và `Player` dùng cho việc lựa chọn các cầu thủ trong một CLB. `Person` là thông tin người dùng đăng ký, gồm tên, clb yêu thích, và cầu thủ yêu thích trong clb đó.

#### urls.py
```
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.person_list.as_view(), name='person_list'),
    path('add/', views.person_create.as_view(), name='person_create'),
]
```
Chúng ta vừa tạo 2  **path** để thêm người dùng và danh sách người dùng.

Bây giờ hãy tạo `person_list` va `person_create` :
#### views.py 
```
from django.views.generic import ListView, CreateView
from django.urls import reverse_lazy
from .models import Person

class person_list(ListView):
    model = Person
    template_name = 'person_list.html'
    context_object_name = 'people'
    
class person_create(Createview):
    model = Person
    template_name = 'person_create.html'
    fields = ('name', 'Player','Football',)
    success_url = reverse_lazy('personList') 
```