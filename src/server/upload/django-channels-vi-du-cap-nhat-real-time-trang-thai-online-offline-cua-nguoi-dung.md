![](https://images.viblo.asia/90df0841-4543-4172-94f4-bdbde33674ed.jpg)

Trong bài viết này, mình sẽ làm một ví dụ đơn gian về việc sử dụng Channels trong Django để tạo cập nhật real-time trạng thái online-offline của người dùng. 

Nếu bạn vừa làm quen với Channels thì có thể đọc qua một chút bài viết :

[Giới thiệu về Channels trong Django](https://www.djangobat.com/blog/gioi-thieu-ve-channels-trong-django/)

Document: https://channels.readthedocs.io/en/latest/

Ví dụ khác xem tại :  [Django Channels qua ví dụ](https://www.djangobat.com/blog/huong-dan-dung-channels-tao-ung-dung-real-time-trong-django/)

Bạn có thể clone ví dụ tại : https://github.com/batTrung/new-user-channels

Video: [https://www.youtube.com/watch?v=ylg003EIN5A&t=1s](https://www.youtube.com/watch?v=ylg003EIN5A&t=1s)

# 1.Cài đặt và cấu hình
### Download thư mục dự án
Trong bài viết này mình sẽ sử dụng thư mục dự án myproject/ mà các bạn có thể tải về bằng cách:

```
>>> git clone https://github.com/batTrung/myproject-django
>>> cd myproject-django
```

Kích hoạt môi trường ảo và chạy migrate

```
>>> source env/bin/activate
(env) >>> python manage.py makemigrations
(env) >>> python manage.py migrate
```

Tiến hành cài đặt Channels tại môi trường ảo

```
(env) >>> pip install channels
(env) >>> pip install channels_redis
```

### settings

Sửa lại file settings.py để thêm Channels và dự án
```
# myproject/settings.py

INSTALLED_APPS = [
    # .....
    'channels',
]

#....
WSGI_APPLICATION = 'myproject.wsgi.application'
ASGI_APPLICATION = 'myproject.routing.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}
```

### routing

```
# myproject/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from accounts.consumers import NewUserConsumer

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
    	URLRouter(
    		[
    			path("new-user/", NewUserConsumer),
    		]
    	)
    )
})
```

# 2. Tạo ứng dụng Accounts

Chúng ta sẽ tạo một ứng dụng tên là accounts .
```
env) >>> python manage.py startapp accounts
```
Cấu trúc dự án của chúng ta sẽ như sau:
```
myproject-django
├── accounts
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── db.sqlite3
├── env/
├── manage.py
├── myproject
│   ├── __init__.py
│   ├── routing.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── README.md
├── requirements.txt
├── site_static
│   ├── css
│   │   ├── bootstrap.min.css
│   │   └── font-awesome.min.css
│   └── js
│       ├── bootstrap.min.js
│       └── jquery-3.3.1.min.js
└── templates
    ├── base.html
    └── home.html
```
### views

Tại file views.py của thư mục accounts/ xác định như sau:

```
# accounts/views.py
from django.shortcuts import render
from django.contrib.auth.models import User

def new_user(request):
	users = User.objects.all()

	return render(request, 'new_user.html',{'users':users})
```
### URL

Tạo một file urls.py tại thư mục accounts/  để xác đinh liên kết url tới views.

```
# accounts/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.new_user, name='new_user'),
]
```
Tại file urls.py của thư mục dự án mypoject/ chúng ta chỉnh sửa để liên kết tới url trên như sau:
```
# myproject/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include('accounts.urls')),
]
```
### Template

Tạo file new_user.html để xác đinh template.
```
{% extends "base.html" %}
{% load static %}

{% block title %}
  Thong bao khi new user
{% endblock title %}

{% block content %}
  <h2>NEW USER</h2>
{% endblock content %}
```
Bây giờ mở trình duyệt lên [http://127.0.0.1:8000](http://127.0.0.1:8000) sẽ trông như thế này:

![](https://images.viblo.asia/aa4442ca-8854-4680-99bf-62d02237eec1.png)

# 3. Consumers 

Bây giờ chúng ta xác định consumers của chúng ta.  
Tạo một file consumers.py tại thư mục accounts/ như sau:

```
# accounts/consumers.py
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class NewUserConsumer(AsyncJsonWebsocketConsumer):
	async def connect(self):
		print('connect')
		await self.accept()
		await self.channel_layer.group_add("users", self.channel_name)
		print(f"Add {self.channel_name} channel to users's group")

	async def receive_json(self, message):
		print("receive",message)
		
	async def disconnect(self, close_code):
		await self.channel_layer.group_discard("users", self.channel_name)
		print(f"Remove {self.channel_name} channel from users's group")
```
Consumer giúp giao tiếp xử lý các sự kiện, và gửi message lại trình duyệt.

Có một số lớp con của consumer bạn có thể sử dụng ngoài AsyncConsumer và SyncConsumer như:

+ WebsocketConsumer và AsyncWebsocketConsumer
+ JsonWebsocketConsumer và AsyncJsonWebsocketConsumer
+ AsyncHttpConsumer

Và ở đây mình sử dụng AsyncJsonWebsocketConsumer để thực truyền nhận thông qua mã hóa JSON. Nó có các thuộc tính như:

+ connect() : Thực thi khi Consumer được kết nối.

+ receive_json() : Thực thi khi nhận được message tới thông qua phương thức send của WebSocket

+ disconnect() : Thực thi khi consumer ngắt kết nối

+ accept() Sử dụng accept() để chấp nhận kết nối WebSocket, nếu không gọi phương thức này trong connect() thì nó sẽ từ chối WebSocket và sẽ bị đóng lại.

+ channel_layer(), channel_name() : Mỗi consumer khi kết nối sẽ được tự động thêm vào thuộc tính channel_layer() và channel_name(). Khi một lượt request đến chúng ta sẽ có channel_name().

+ Group : Chúng ta sẽ dùng group_add để thêm channel_name() này vào trong group với tên là "users", và group_discard để xóa channel_name() này khỏi group khi người dùng này thoát hay consumer này đóng.

# 4. WebSocket

Bây giờ chúng ta sẽ tạo WebSocket để giao tiếp với Consumers .
Chỉnh sửa lại file new_user.html như sau
```
{% extends "base.html" %}
{% load static %}

{% block title %}
  Thong bao khi new user
{% endblock title %}

{% block content %}
  <h2>NEW USER</h2>
{% endblock content %}

<!-- NEW -->
{% block scripts %}
    <script src="{% static "js/channels/reconnecting-websocket.min.js" %}"></script> 
	<script src="{% static "js/channels/new_user.js" %}"></script>
{% endblock scripts %}
```
Ở file đầu tiên chúng ta dùng reconnecting-websocket.min.js tải về tại reconnecting-websocket. Mình sẽ giải thích vì sao dùng nó sau.
Tạo một file new_user.js trong thư mục site_static/js/channels/ như sau:
site_static/channels/new_user.js
```
$(function(){
        endpoint = 'ws://127.0.0.1:8000/new-user/' // 1

        var socket =  new ReconnectingWebSocket(endpoint) // 2
        
       // 3
        socket.onopen = function(e){
          console.log("open",e); 
        }
        socket.onmessage = function(e){
          console.log("message",e)
        }
        socket.onerror = function(e){
          console.log("error",e)
        }
        socket.onclose = function(e){
          console.log("close",e)
        }
   });
```

1. Đầu tiên sẽ kết nối WebSocket tới đường dẫn là ws://127.0.0.1:8000/new-user/  nơi mà trước đó chúng ta đã xác định router là path("new-user/", NewUserConsumer).

Hai cái này phải khớp với nhau ví dụ nếu router là path("new-user-update/", NewUserConsumer) thì đường dẫn phải là ws://127.0.0.1:8000/new-user-update/

2. Như đã đã cập trên, ở đây bạn có thể sử dụng như var socket =  new WebSocket(endpoint). Tuy nhiên, việc sử dụng ReconnectingWebSocket sẽ giúp cho WebSocket tự động kết nối lại khi WebSocket bị đóng. Tức khi khi bị onclose thì nó sẽ tự động onopen lại.

3. Các phương thức onopen, onclose, onmessage để xác định trạng thái WebSocket kết nối, bị đóng và nhận message. Sử dụng console.log để giúp cho việc kiểm tra lỗi đơn giản hơn.

# 5. Templates

Bây giờ mọi thứ đã sẵn sàng, tuy nhiên chúng ta vẫn chưa thực hiện gì cả. 
Nhiệm vụ ở đây là sẽ tự động cập nhật trạng thái online-offline của người dùng.
Thêm vào file new_user.html như sau:
templates/new_user.html
```
{% block content %}
  <h2>NEW USER</h2>
  <p>Tự động cập nhật thông tin người dùng khi người dùng chỉnh sửa thông tin hoặc đăng ký.</p>            
  <table class="table">
    <thead>
      <tr>
        <th>username</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="new_user">
      {% include "includes/users.html" %}
    </tbody>
  </table>
{% endblock content %}
```
Tạo một file users.html ở thư mục templates/includes/ như sau:
```
{% for user in users %}
<tr>
	<td>{{user.username}}</td>
	<td>{{user.first_name}}</td>
	<td>{{user.last_name}}</td>
	<td>{{user.email}}</td>
</tr>
{% endfor %}
```
Mở trình duyệt tại địa chỉ [http://127.0.0.1:8000/ ](http://127.0.0.1:8000/ ) sẽ trông như thế này:

![](https://images.viblo.asia/90315eca-28bf-4a04-9a98-aa0c51e07d06.png)

Không có thông tin gì vì chúng ta chưa tạo người dùng nào cả.
Các bạn tự thêm một số người dùng tại trang admin. Sau khi thêm 3 người dùng nó sẽ như thế này:

![](https://images.viblo.asia/bcf42997-9b9c-4e0b-b957-8af6d2b99a4a.png)

# 6.  Cập nhật trạng thái
### models

Để biết trạng thái online hay offline chúng ta cần thêm trường status cho model User. 
Bằng cách tọa model Profile và kết nối OneToOne tới User như sau:
accocunts/models.py
```
# accounts/models.py
from django.db import models
from django.conf import settings 

class Profile(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
	status = models.BooleanField(default=False)

	def __str__(self):
		return f"Profile of {self.user.username}"
```

Mặc định sẽ để False tức là trạng thái Offline

Chạy migration:
```
(env) >>> python manage.py makemigrations
(env) >>> python manage.py migrate
```

### Consumers
Bây giờ tới phần quan trọng nhất, chỉnh sửa consumers để check trạng thái online-offline.
+ Khi người dùng online: Consumer ở trạng thái connect -> cập nhật status=True -> update lại trang.
+ Khi người dùng offline:  Cusumer ở trạng thái disconnect - > cập nhật status=False -> update lại trang.
Tùy chỉnh lại consumer như sau:

accounts/consumers.py
```
import asyncio 
import json
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .models import Profile
from django.contrib.auth.models import User
from django.template.loader import render_to_string

class NewUserConsumer(AsyncJsonWebsocketConsumer):
	async def connect(self):
		await self.accept()
		await self.channel_layer.group_add("users", self.channel_name)
		
		user = self.scope['user']
		if user.is_authenticated:
			await self.update_user_status(user,True)
			await self.send_status()	

	async def disconnect(self, code):
		await self.channel_layer.group_discard("users", self.channel_name)

		user = self.scope['user']
		if user.is_authenticated:
			await self.update_user_status(user,False)
			await self.send_status()

	async def send_status(self):
		users = User.objects.all()
		html_users = render_to_string("includes/users.html",{'users':users})
		await self.channel_layer.group_send(
			'users',
			{
				"type": "user_update",
				"event": "Change Status",
				"html_users": html_users
			}
		)

	async def user_update(self,event):
		await self.send_json(event)
		print('user_update',event)

	@database_sync_to_async
	def update_user_status(self, user,status):
		return Profile.objects.filter(user_id=user.pk).update(status=status)
```
1. Vì không thể dùng mã đồng bộ với không đồng bộ cùng nhau được. Nên ở đây chúng ta sử dụng database_sync_to_async được cung cập bởi Channels để cho phép ta có thể truy cập database và chỉnh sửa Profile.
2. Phương thức update_user_status() sẽ có nhiệm vụ cập nhật trạng thái status của người dùng. 
3. Phương thức send_status() sử dụng send_json có nhiệm vụ gửi thông tin tới Websocket dưới dạng mã JSON. Bên Websocket sẽ nhận được thông tin tại phương thức onmessage với tên data.
3. Sử dụng phương thức group_send bao gồm 2 đối số. Đối số thứ nhất là tên group là "users", đối số thứ 2 chứa thông tin cần gửi đi.
+ type: Sẽ xác định  tên phương thức được thực thi trong consumer. Nghĩa là mỗi lần gọi group_send() nó sẽ thực thi phương thức mà type xác định.
+ html_users : Đây là mã HTML chứa thông tin người dùng đã được cập nhật status. Nó sẽ được dùng để thay thế đoạn mã html cũ bằng Jquery để cập nhật status.

### Websocket
Bây giờ WebSocket có thể nhận được tin nhắn ở onmessage. Giờ chúng ta cần xử lý với thông tin đó. 
Chỉnh lại file new_user.js tại thư mục site_static/js/channels/ như sau
```
$(function(){
        // ...
        socket.onmessage = function(e){
          console.log("message",e)
          var userData = JSON.parse(e.data)
          $('#new_user').html(userData.html_users)
        }
        // ....
   });
```

Như đã nói thông tin nhận được từ consumer gửi tới Websocket là mã JSON với tên là data. Vì thế tại đây chúng ta cần dùng phương thức JSON trong JS để đọc nó. 
Với thông tin nhận được, chúng ta sẽ thay thế mã HTML tại thẻ có id là new_user của file new_user.html bằng Jquery.

### Thành quả
Như vậy chúng ta thực hiện xong nhiệm vụ cập nhật real-time trạng thái online - offline của người dùng.
Kết quả có thể trông như thế này:
![](https://images.viblo.asia/ec5c0cb5-4fc8-46e2-b380-c737b0195d5f.png)

# Chỉnh thêm một chút nữa
Cứ mỗi lần đăng xuất đăng nhập chúng ta cứ phải vào admin để thực hiện. Như thế hơi phiền phức trong quá trình test. 
Chúng ta sẽ thêm nút đăng nhập đăng xuất như sau

### URL
Sửa lại file urls.py của thư mục accounts/ như sau:
```
# accounts/urls.py
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.new_user, name='new_user'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
```
Ở đây mình sử dụng ứng dụng có sẵn của Django tại django.contrib.auth để thực hiện quá trình đăng nhập, đăng xuất.  
### templates
Tạo thư mục registration/ tại thư mục templates/. Trong thư mục này, tạo ra 2 file là login.html và logged_out.html.
Hai file này là file mà ứng dụng auth trên sẽ trỏ tới.

#### đăng nhập
templates/registration/login.html
```
{% extends "base.html" %}
{% load crispy_forms_tags %}

{% block title %}
    Login 
{% endblock title %}

{% block stylesheet %}
    <style>
        .form-signin {
          max-width: 380px;
          padding: 15px 35px 45px;
          margin: 0 auto;
          margin-top: 30px;
          background-color: #fff;
          border: 1px solid rgba(0,0,0,0.1); 
        }
    </style>
{% endblock stylesheet %}

{% block content %}
     <div class="wrapper">
      <form class="form-signin" method="post">       
        {% csrf_token %}
        {{form|crispy}}

        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
      </form>
  </div>
{% endblock content %}
```

#### Đăng xuất 

templates/registration/logged_out.html
```
{% extends "base.html" %}

{% block title %}
	Logout
{% endblock title %}

{% block content %}
	Bạn đã đăng xuất thành công. 
	<a href="{% url 'login' %}">Đăng nhập </a> để tiếp tục
{% endblock content %}
```

#### navbar
Thêm thanh navbar chứa nút đăng nhập và đăng xuất như sau:
templates/base.html
```
<!--- .... -->
<body>
	{% include "includes/navbar.html" %}
 <!-- .... -->
```
Tại thư mục includes/ tạo file navbar.html như sau:
```
<nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    {% if request.user.is_authenticated %}
      <div class="p-2">
        <a href="{% url 'logout' %}" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Đăng xuất</a>
      </div>
      <div class="p-2" style="color:#380e16">
        Chào <strong>{{request.user.username}}</strong>
      </div>

    {% else %}
      <a href="{% url 'login' %}" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Đăng nhập</a>
    {% endif %}
  </form>
</nav>
```

#### setting
Thêm vào file setting như sau:
```
# ....
LOGIN_REDIRECT_URL = 'new_user'
LOGIN_URL = 'login'
LOGOUT_URL = 'logout'
```
Ở đây sẽ xác định URL cho trang đăng nhập, đăng xuất và trang chuyển hướng sau khi đăng nhập thành công.


# Kết quả
![](https://images.viblo.asia/4409dc93-44a5-4c7c-bf1f-6cdda0dea811.gif)