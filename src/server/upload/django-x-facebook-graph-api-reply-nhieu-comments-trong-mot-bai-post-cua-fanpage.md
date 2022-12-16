**Bài viết này đòi hỏi bạn phải có kiến thức cơ bản về web, django và python nên hãy cân nhắc khi đọc tiếp nhé .**

Trước đây mình đã có 2 bài viết khá kỹ về việc tích hợp facebook graph api với Ruby on Rails [tại đây](https://viblo.asia/p/rails-question-sep-part1-tim-hieu-ve-graph-api-cua-facebook-gem-koala-graph-explorer-tools-cua-facebook-gDVK29Xj5Lj). Dạo gần đây mình đang học `python x Django` nên muốn thử tích hợp `graph api `cùng Django để làm một số ứng dụng vừa chơi vừa học.
Bài toán ngày hôm nay khá đơn giản , giả sử bạn đang quản lý fanpage của một **nhãn hiệu âm nhạc** , và vừa tung teaser của sản phẩm mới như thế này: 

![](https://images.viblo.asia/85ef3a1f-1acb-45ef-b1d1-91c88991c9e3.png)

Trên thực tế, có thể có hàng trăm đến hàng ngàn fan comment vào bài viết này. Và người chủ fanpage muốn reply tất cả các comment nói trên bằng một đường link bài báo về sự kiện offline ra mắt sản phẩm âm nhạc như sau : 

![](https://images.viblo.asia/abde7aaa-b397-4992-b613-3064d71165a6.png)

Vấn đề là dùng tay để tự trả lời 100 - 1000 comments là quá mệt. Vì vậy, mình sẽ sử dụng `Django x facebook graph api` để tạo một ứng dụng giải quyết vấn đề này .

### 1. Signin with facebook với social-auth-app-django
Để bắt đầu với tutorial này, các bạn cần cài sẵn :
```
* python 3.6
* django
* pip3
* pipenv
```


Đầu tiên, chúng ta tạo một `django project` tên là `mysite` và một application tên là `facebook_app` :
```
django-admin startproject mysite
python3 manage.py startapp facebook_app
```
Sau đó , chúng ta install `social-auth-app-django` - một thư viện để tích hợp tính năng `Sign-in with social media` vào trong django app :
```
pipenv install django social-auth-app-django
```
Trong file `mysite/mysite/settings.py` ta thay đổi `INSTALLED_APPS` một chút :
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'facebook_app.apps.FacebookAppConfig', #Thêm dòng này
    'social_django', #Thêm dòng này
]
```
Chúng ta sẽ chạy migrate để tạo một số thay đổi trong database :
```
$ python manage.py migrate
```
Bây giờ, ta sẽ thêm các classes xử lý authentication với facebook , trong file `mysite/mysite/settings.py`
```python
AUTHENTICATION_BACKENDS = [
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
]
```
Bây giờ chúng ta cần đăng ký web application của chúng ta trên trang [facebook for developer](https://developers.facebook.com/?no_redirect=1) để lấy được `APP_ID , APP_SECRET` và đăng ký tên miền trang web (ở đây mình sử dụng `http://localhost:3000 `) .
Bước này rất đơn giản, các bạn có thể xem hướng dẫn chi tiết ở [phần một của bài viết này](https://viblo.asia/p/rails-question-sep-part2-lam-sao-de-tich-hop-graph-api-vao-trong-rails-app-gem-koala-07LKXMPDZV4) : 

![](https://images.viblo.asia/1e85aea2-9da5-4b68-8381-451ec51d0126.png)

Sau đó, ta thêm các settings cần thiết để đăng nhập thông qua facebook:

```
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'facebook_app:home'
LOGOUT_URL = 'logout'
LOGOUT_REDIRECT_URL = 'login'
SOCIAL_AUTH_FACEBOOK_KEY = YOUR_APP_ID
SOCIAL_AUTH_FACEBOOK_SECRET = YOUR_APP_SECRET

#Các quyền mà app của bạn muốn được người dùng cấp phép sử dụng
SOCIAL_AUTH_FACEBOOK_SCOPE = ['manage_pages', 'pages_manage_cta','pages_manage_instant_articles','pages_show_list','publish_pages']
```

Giờ ta sẽ tạo trang login cho app với các file sau :

Tạo file `urls.py` và `views.py`
```python
# facebook_app/urls.py 
from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

app_name = 'facebook_app'

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.home_login, name='login'),
    path('logout/', views.home_logout, name='logout'),
]
```
```python
# facebook_app/views.py
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.contrib.auth import authenticate, login, logout
import facebook

def home(request):
    is_facebook_logged_in = hasattr(request.user, 'social_auth') and request.user.social_auth.filter(provider='facebook')
    return render(request, 'facebook/home.html', { 'posts' : posts, 'page' : page})

def home_login(request):
    return HttpResponseRedirect(reverse('facebook_app:home'))

def home_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('facebook_app:home'))
```
Tạo template cho trang homepage `facebook_app/templates/facebook/home.html`
```html
# facebook_app/templates/facebook/home.html
<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</head>
{% if not user.is_authenticated %}
    <div>
      <a href="{% url 'social:begin' 'facebook' %}">
        <button class="btn btn-primary mb-2">
          Login with Facebook
        </button>
      </a>
    </div>
{% else %}
    <div class="form-group">
      <p style="color: red;">Dang nhap roi ne</p>
      <a href="{% url 'facebook_app:logout' %}"><button class="btn btn-danger">logout</button></a>
    </div>
{% endif %}

```
Ok, thế là xong . Giờ chúng ta sẽ có một trang web với chức năng Login with facebook hoạt động như sau : 

![](https://images.viblo.asia/573c1502-fdec-4b3c-9c96-86423d55ee5c.gif)

### 2. Tạo tool reply toàn bộ comment của các bài post.
Bây giờ chúng ta sẽ cài đặt [facebook sdk dành cho python](https://facebook-sdk.readthedocs.io/en/latest/api.html) - đây là thư viện được viết bằng `python` để hỗ trợ sử dụng facebook_graph_api (giống như gem koala của Ruby on Rails) .
Chạy lệnh cài đăt :
```
pip install -e git+https://github.com/mobolic/facebook-sdk.git#egg=facebook-sdk
```
Thế là xong, giờ chúng ta đã có thể sử dụng facebook graph api thông qua một loạt method rất tiện của thư viện này : `get_object, get_objects, put_like, put_comment , ....` .  Ví dụ, nếu bạn muốn dùng fanpage để tạo comment lên 1 bài post có sẵn , bạn có thể làm như sau :
```
>>> import facebook
>>> graph = facebook.GraphAPI(access_token = access_token, version="4.0")
>>> graph.put_comment(object_id = post_id, message = "Comment nè")
```
Nếu bạn chưa hiểu cơ bản về cách mà facebook graph api hoạt động, bạn nên đọc bài viết khá chi tiết của mình [tại đây ](https://viblo.asia/p/rails-question-sep-part1-tim-hieu-ve-graph-api-cua-facebook-gem-koala-graph-explorer-tools-cua-facebook-gDVK29Xj5Lj) . 

Quay trở lại với bài toán hiện tại , chúng ta cần làm được 3 bước :
*  Bước 1 : Get về tất cả các bài post trên fanpage hiện tại . Hiển thị nó ở trang home .
*  Bước 2 : Chọn bài viết mà bạn muốn reply tất cả comment . Lấy được` post_id` của nó .
*  Bước 3: Reply tất cả comment của bài viết nói trên bằng đoạn code tương tự như sau :
```python
comments = graph.get_connections( id = post_id, connection_name = 'comments' )['data']
for comment in comments:
    graph.put_comment(object_id = comment['id'] , message = message)
```

Cả 3 bước nói trên được thực hiện trong file views.py như sau :
```python
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.contrib.auth import authenticate, login, logout
import facebook

# Trả về graph object có page_access_token để  thực hiệp api_request với fanpage
def fanpage_graph_object(request):
    social = request.user.social_auth.get(provider='facebook')
    access_token = social.extra_data['access_token']
    graph = facebook.GraphAPI(access_token = access_token, version="4.0")
    page_access_token =  graph.get_connections(id = 'me', connection_name='accounts')['data'][0]['access_token']
    return facebook.GraphAPI(access_token = page_access_token, version="4.0")

def home(request):
    # Bước 1: get tất cả bài viết trên fanpage về  và hiển thị ở trang homepage
    graph = fanpage_graph_object(request)
    page = graph.get_object(id = 'me', fields = 'name,picture')
    posts =  graph.get_connections(id = 'me', connection_name='feed', fields = 'id,message,full_picture,comments')['data']
    return render(request, 'facebook/home.html', { 'posts' : posts, 'page' : page})

def home_login(request):
    return HttpResponseRedirect(reverse('facebook_app:home'))

def home_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('facebook_app:home'))

def create_multicomments(request):
    # Bước 2 : Chọn bài viết, lấy post_id và nội dung comment muốn reply
    message = request.POST['message']
    post_id = request.POST['post_id']
    graph = fanpage_graph_object(request)
    comments = graph.get_connections( id = post_id, connection_name = 'comments' )['data']
    
    #Bước 3 : Thực hiện reply toàn bộ comment
    for comment in comments:
        graph.put_comment(object_id = comment['id'] , message = message)
    return HttpResponseRedirect(f"https://www.facebook.com/{post_id}")
```

File `home.html` thay đổi như sau :
```html
<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</head>
{% if not user.is_authenticated %}
    <div>
      <a href="{% url 'social:begin' 'facebook' %}">
        <button class="btn btn-primary mb-2">
          Login with Facebook
        </button>
      </a>
    </div>
{% else %}
    <div class="form-group">
      <p style="color: red;">Dang nhap roi ne</p>
      <a href="{% url 'facebook_app:logout' %}"><button class="btn btn-danger">logout</button></a>
    </div>
    <div class="container">
      {% for post in posts %}
        <div class="card form-group">
          <div class="col-md-5">
            <div class="panel panel-default">
              <div class="panel-body">
                <section class="post-heading">
                  <div class="row">
                    <div class="col-md-11">
                      <div class="media">
                        <div class="media-left">
                          <a href="#">
                            <img class="media-object photo-profile" src="{{ page.picture.data.url }}" width="40" height="40" alt="...">
                          </a>
                        </div>
                        <div class="media-body">
                          <a href="#" class="anchor-username"><h5 class="media-heading">{{ page.name }}</h6></a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-1">
                      <a href="#"><i class="glyphicon glyphicon-chevron-down"></i></a>
                    </div>
                  </div>
                </section>
                <div class="form-group">
                  <section class="post-body">
                    <p>{{ post.message }}</p>
                    {% if post.full_picture %}
                      <img src="{{ post.full_picture }}" alt="" width="200" height="200">
                    {% endif %}
                  </section>
                </div>
                {% if post.comments %}
                  <div class="form-group">
                    <form action="{% url 'facebook_app:create_multicomments' %}" method="post" class="form">
                      {% csrf_token %}
                      <div class="form-group">
                        <label for="message">Message to reply :</label>
                        <textarea name="message" id="message" class="form-control"></textarea>
                      </div>
                      <input type="hidden" name="post_id" value="{{ post.id }}">
                      <button type="submit" class="btn btn-primary"> Reply all comments</button>
                    </form>
                  </div>
                {% endif %}
                </div>
              </div>
            </div>
          </div>
      {% endfor %}
    </div>
{% endif %}
```

Và chúng ta có một chiếc app reply comment hoạt động như thế này :

![](https://images.viblo.asia/1c068cf5-bfec-4021-b4cf-1d9ae0f97689.gif)

Đó là toàn bộ bài viết của mình, hy vọng nó sẽ có ích cho các bạn .