Sau khi chia sẻ một chút về CRUD với nodejs thì hôm nay, mình sẽ chia sẻ thêm một chút CRUD về python với Django sử dụng Mysql. Và tất nhiên nội dung cơ bản mình chia sẻ chỉ nằm trong phạm vi dành cho những người bắt đầu học python mà thôi.

Trong bài viết này mình sử dụng Python 2.7.12, Django 1.11 có sử dụng Function views và Base views.

Vì mình chỉ chia sẻ một số chức năng cơ bản nên có thể sẽ thiếu sót trong quá trình chạy project ví dụ như chưa có Authentication, validate cho form,... nên các bạn có thể tự tìm hiểu thêm :)) 
# 1. Khởi tạo project Django
Điều đầu tiên cần làm là khởi tạo 1 project, trong ví dụ này mình sẽ tạo 1 project tên là `myproject`:
```
~$ django-admin startproject myproject
```
Xong, chúng ta có cây thư mục như sau:
```python
myproject
--myproject
----__init__.py
----settings.py
----urls.py
----wsgi.py
--manage.py
```
# 2. Cấu hình database MySql 
Mở file `settings.py` và tìm đến chỗ cáu hình db `DATABASES`:
```python
# settings.py
...
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': <db_name>,
        'USER': <db_user>,
        'PASSWORD': <db_password>,
        'HOST': 'localhost',
        'PORT': '',
    }
}
...
```
Config xong, bạn cần migrate db bằng cách:
```
~$ python manage.py migrate
```
Và tạo một super user cho hệ thống của bạn:
```
~$ python manage.py createsuperuser
```
Sau khi tạo `username`, `email`, `password` cho super user thì công việc tiếp theo là khởi chạy hệ thống:
```
~$ python manage.py runserver
```
Xong, khởi đầu thành công với http://localhost:8000
# 3. Tạo module (app) mới.
Tiếp theo cần tạo một module hay cũng có thể gọi là 1 app mới cho hệ thống để chúng ta có thể dễ dàng hơn cho việc triển khai chức năng CRUD. Ở đây sẽ tạo module cho đối tượng Post.
```
~$ python manage.py startapp posts
```
Chúng ta sẽ có cây thư mục như sau:
![](https://images.viblo.asia/c0157fb5-e6eb-4eda-8502-24ce0e4c1271.png)
Tiếp theo cần đăng ký cho module mới tạo vào trong hệ thống:
```python
#settings.py

INSTALLED_APPS = [
    'posts',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```
## 3.1. Cấu hình models 
```python
# posts/models.py

from __future__ import unicode_literals

from django.db import models
from django.core.urlresolvers import reverse

class Post(models.Model):
  name = models.CharField(max_length=224, null=False, blank=False)
  content = models.TextField(max_length=254, null=False, blank=False)
  timestamp = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)

  def __unicode__(self):
    return self.content
```
Sau lần lượt chạy:
```
~$ python manage.py makemigrations
```
Sẽ thấy:
```
Migrations for 'posts':
  posts/migrations/0001_initial.py
    - Create model Post
```
Tieps theo là migrate:
```
~$ python manage.py migrate
```
# 4. CRUD
## 4.1 List Post
```python
# posts/views.py

from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.views.generic import ListView

from .models import Post

class ListPostView(ListView):
  model = Post
  def get (self, request, *args, **kwargs):
    template_name = 'posts/list-posts.html' # sẽ được tạo ở phần dưới
    obj = {
      'posts': Post.objects.all()
    }
    return render(request, template_name, obj)
```
Trong `urls.py`
```python
# posts/urls.py

from django.conf.urls import url
from django.contrib import admin
from posts.views import (
  ListPostView,
)

urlpatterns = [
    url(r'^list-posts/$', ListPostView.as_view(), name='list-posts'),
]
```
Để sử dụng namespace trong python, thì cần thêm vào `myproject/urls.py`
```python
# myproject/urls.py

from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^posts/', include('posts.urls', namespace='posts')),
]
```
Tiếp theo là template, ở đây mình sẽ hướng dẫn các bạn sử dụng layout luôn:
```html
<!-- posts/templates/layouts/layout.html -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>{% block title %}CRUD{% endblock title %}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <style>
          footer {
            background-color: #555;
            color: white;
            padding: 15px;
          }
        </style>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row content">
              <div class="col-sm-3 sidenav">
                <h4>CRUD</h4>
                <ul class="nav nav-pills nav-stacked">
                  <li {% if request.path == "/posts/list-posts/" %}class="active"{% endif %}>
                    <a href="{% url 'posts:list-posts' %}">List Posts</a>
                  </li>
                </ul><br>
              </div>        
              <div class="col-sm-9">
                  {% block content %}
                  {% endblock content %}
              </div>
            </div>
          </div>          
          <footer class="container-fluid">
            <p>My Project CRUD Posts</p>
          </footer>
    </body>
</html>
```
Và đến posts/list-posts.html
```html
<!-- posts/templates/posts/list-posts.html -->

{% extends "layouts/layout.html" %}
{% block title %}
    List Post | {{ block.super }}
{% endblock title %}
{% block content %}
  <h4><small>List Posts</small></h4>
  <hr>
  {% if posts %}
    {% for post in posts %}
    <h2>{{post.name}}</h2>
    <h5><span class="glyphicon glyphicon-time"></span> Post at {{post.timestamp}}</h5>
    <p>{{post.content}}</p>
    <br><br>
    {% endfor %}
  {% else %}
    No song.
  {% endif %}
{% endblock content %}
```
Như vậy là chúng ta đã có thể xem list các bài post rồi. Nhưng hiện tại vẫn chưa có dữ liệu. Nào, bắt đầu thêm dữ liệu nhé.
## 4.2 Create Post
Để tạo được bài post, đầu tiên chúng ta nên tạo 1 file gọi là `forms.py`:
```python
# posts/forms.py

from django import forms
from .models import Post

class CreatePostForm(forms.ModelForm):
  class Meta:
    model = Post
    fields = ['name', 'content',]
```
Và urls thêm:
```python
# posts/urls.py
...
from posts.views import (
  ListPostView,
  CreatePostView,
)
urlpatterns = [
    url(r'^list-posts/$', ListPostView.as_view(), name='list-posts'),
    url(r'^create-post/$', CreatePostView.as_view(), name='create-post'),
]
```
Quay lại với file views
```python
# posts/views.py


...
from django.views.generic import ListView, CreateView
from django.contrib.messages.views import SuccessMessageMixin
from .forms import CreatePostForm
...
...
class CreatePostView(SuccessMessageMixin, CreateView):
  template_name = 'posts/create-post.html'
  form_class = CreatePostForm
  success_message = 'Crate Post successfully!'
```
Và templates:
```html
<!-- posts/templates/layouts/layout.html -->
...
<ul class="nav nav-pills nav-stacked">
  {% if messages %}
    {% for message in messages %}
      <div class="alert alert-success">
        <strong>{{ message }}</strong>
      </div>
    {% endfor %}
  {% endif %}
  <li {% if request.path == "/posts/list-posts/" %}class="active"{% endif %}>
    <a href="{% url 'posts:list-posts' %}">List Posts</a>
  </li>
  <li {% if request.path == "/posts/create-post/" %}class="active"{% endif %}>
    <a href="{% url 'posts:create-post' %}">Create Posts</a>
  </li>
</ul><br>
...
```
```html
<!-- posts/templates/posts/create-post.html -->

{% extends "layouts/layout.html" %}
{% block title %}
    Create Post | {{ block.super }}
{% endblock title %}
{% block content %}
  <h4><small>Create Posts</small></h4>
  <hr>
  <div class="card-body">
    <div class="table-responsive">
      <form action="{% url 'posts:create-post' %}" method="POST">
        {% csrf_token %}
        <div class="form-group">                    
          <label for="comment">Name<span style="color: red">*</span> :</label>
          <input type="text" class="form-control" rows="5" name="name" required>
        </div>
        <div class="form-group">
          <label for="comment">Content<span style="color: red">*</span> :</label>
          <textarea class="form-control" rows="5" name="content" required></textarea>
        </div>
        <button class="btn btn-secondary" type="submit">Create Post</button>
      </form>
    </div>
  </div>
{% endblock content %}
```
Thêm hàm `get_absolute_url` ở model để trở lại trang list posts sau khi tạo nhé:
```python
# posts/models.py

...
class Post(models.Model):
  ...
  ...
  def __unicode__(self):
    return self.content
  
  def get_absolute_url(self):
    return reverse('posts:list-posts', kwargs={})
```
## 4.3 Update Post
Để update bài Post đã tạo, chúng ta lại bắt đầu từ `views.py`
```python
# posts/views.py
...
from django.views.generic import ListView, CreateView, UpdateView
from django.core.urlresolvers import reverse
...
class UpdatePostView(SuccessMessageMixin, UpdateView):
  template_name = 'posts/edit-post.html'
  model = Post
  fields = ['name', 'content',]
  success_message = 'Update Post successfully!'

  def get_success_url(self): 
    return reverse('posts:list-posts', kwargs={})
```
urls:
```python
# posts/urls.py

...
from posts.views import (
  ListPostView,
  CreatePostView,
  UpdatePostView,
)

urlpatterns = [
    url(r'^list-posts/$', ListPostView.as_view(), name='list-posts'),
    url(r'^create-post/$', CreatePostView.as_view(), name='create-post'),
    url(r'^update-post/(?P<pk>[-\w]+)$', UpdatePostView.as_view(), name='update-post'),
]
```
templates:
```html
<!-- posts/templates/posts/edit-post.html -->

{% extends "layouts/layout.html" %}
{% block title %}
    Edit Post | {{ block.super }}
{% endblock title %}
{% block content %}
  <h4><small>Edit Posts</small></h4>
  <hr>
  <div class="card-body">
    <div class="table-responsive">
      <form action="{% url 'posts:update-post' object.id %}" method="POST">
        {% csrf_token %}
        <div class="form-group">                    
          <label for="comment">Name<span style="color: red">*</span> :</label>
          <input type="text" class="form-control" rows="5" name="name" value="{{object.name}}" required>
        </div>
        <div class="form-group">
          <label for="comment">Content<span style="color: red">*</span> :</label>
          <textarea class="form-control" rows="5" name="content" required>{{object.content}}</textarea>
        </div>
        <button class="btn btn-secondary" type="submit">Update Post</button>
      </form>
    </div>
  </div>
{% endblock content %}
```
Sửa thêm nút edit vào trang list posts:
```html
<!-- posts/templates/posts/list-posts.html -->
...
{% for post in posts %}
  <h2>{{post.name}}</h2>
  <h5><span class="glyphicon glyphicon-time"></span> Post at {{post.timestamp}}</h5>
  <p>{{post.content}}</p>
  <a href="{% url 'posts:update-post' post.id %}">Edit</a>
  <br>
{% endfor %}
...
```
## 4.4 Delete Post
Đối với chức năng xóa bài post, ở ví dụ này mình sẽ sử dụng Base View:
```python
# posts/views.py
...
def delete_post(request, pk):
    post = Post.objects.filter(id=pk)
    post.delete()
    context = {
      "messages": "Delete Post successfully",
      'posts': Post.objects.all()
    }
    return render(request, 'posts/list-posts.html', context)
```
urls:
```python
# posts/urls.py

...
from posts import views
...
urlpatterns = [
    url(r'^list-posts/$', ListPostView.as_view(), name='list-posts'),
    url(r'^create-post/$', CreatePostView.as_view(), name='create-post'),
    url(r'^update-post/(?P<pk>[-\w]+)$', UpdatePostView.as_view(), name='update-post'),
    url(r'^delete-post/(?P<pk>[-\w]+)$', views.delete_post, name='delete-post'),
]
```
Thêm nút xóa:
```html
<!-- posts/list-posts.html -->

{% for post in posts %}
  <h2>{{post.name}}</h2>
  <h5><span class="glyphicon glyphicon-time"></span> Post at {{post.timestamp}}</h5>
  <p>{{post.content}}</p>
  <a href="{% url 'posts:update-post' post.id %}">Edit</a>
  <a href="{% url 'posts:delete-post' post.id %}" onclick="return confirm('Are you sure you want to delete this post?');">Delete</a>
  <br>
{% endfor %}
```
Hiển thị thông báo xóa thành công ở layout:
```html
<!-- posts/templates/layouts/layout.html -->

<ul class="nav nav-pills nav-stacked">
  {% if messages %}
    {% for message in messages %}
    <div class="alert alert-success">
        <strong>{{ message }}</strong>
    </div>
    {% endfor %}
  {% endif %}
  {% if success %}
    <div class="alert alert-success">
        <strong>{{success}}</strong>
    </div>
  {% endif %}
  <li {% if request.path == "/posts/list-posts/" %}class="active"{% endif %}>
    <a href="{% url 'posts:list-posts' %}">List Posts</a>
  </li>
  <li {% if request.path == "/posts/create-post/" %}class="active"{% endif %}>
    <a href="{% url 'posts:create-post' %}">Create Posts</a>
  </li>
</ul><br>
```
# 5. DEMO
* Create Post
   ![](https://images.viblo.asia/fb2f3d7a-56a9-497c-a43b-d2d420644fc6.png)
   
   Khi success
   ![](https://images.viblo.asia/ee47dad9-9662-4385-b034-8ff1c2d3ead3.png)
* Edit post
![](https://images.viblo.asia/5a877484-8b5f-4225-99af-ade5520f8c85.png)

    Success
    ![](https://images.viblo.asia/6ebd18ba-55c0-4fc7-b5a0-51efd508ea7c.png)
* Delete post
![](https://images.viblo.asia/d39ca651-ab39-4d74-af92-2bc9a0761c87.png)
Success
![](https://images.viblo.asia/322c442e-93ff-464a-aea3-8efec519ab56.png)

# 6. End
Như vậy là chúng ta đã hoàn thành chủ đề CRUD cơ bản với Python sử dụng Django và MySql rồi.

Hy vọng bài viết này sẽ một phần nào đó giúp các bạn hiểu hơn về python.

Nếu thấy hay, hãy upvote, share để được đẹp trai và xinh gái hơn.