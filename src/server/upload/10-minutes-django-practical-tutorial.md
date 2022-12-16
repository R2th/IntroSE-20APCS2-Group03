Official Django tutorial `polls` was too long for anyone to follow or read

So I created a very comfortable tutorial so that everyone can have a grasp of it

I think it is best that people can see practical things in a short time.

We can make a simple application to write and edit memos.

Please copy-paste code part, make it run and then check the code contents.

If this is done you may be able to read `polls` a little easier.

windows10

Python-3.6.5-amd64

Django-2.0.6

# Preparation
## Create Project
Execute the following lines at the directory where you want to place the code and create a new project.

Assume that the project name is `mysite`.
```
django-admin startproject mysite
```

Go into the folder `mysite` that we just created and create a new application

Here I name the application `memo`

```
cd mysite
python manage.py startapp memo
```
## Overall Project Settings
Change `INSTALLED_APPS` in `mysite/mysite/settings.py`.

Following is the description of `INSTALLED_APP` in `settings.py` only.

No changes after that.

* settings.py
```
INSTALLED_APPS = [
    'memo.apps.MemoConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

## Settings of URL
Change content of `mysite/mysite/urls.py` (Here is the content of the file)

* mysite/urls.py
```
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('memo/', include('memo.urls')),
    path('admin/', admin.site.urls),
]
```

Create new file `mysite/memo/urls.py` (Following is the content of the file)
Since we will make a new file, we have to pay attention to the installation location.

* memo/urls.py
```
from django.urls import path
from . import views

urlpatterns = [
    path('', views.MemoListView.as_view(), name = 'index'),
    path('index', views.MemoListView.as_view(), name = 'index'),
    path('memo_create', views.MemoCreateView.as_view(), name = 'memo_create'),
    path('<int:pk>/memo_detail',
        views.MemoDetailView.as_view(), name = 'memo_detail'),
    path('<int:pk>/memo_update',
        views.MemoUpdateView.as_view(), name = 'memo_update'),
]
```

※ `path` parameter is path(UrlString, View, Name)

※ `as_view()` is the function to display class view

# Create Model/View/Template
## Create Model
Change content of `mysite/memo/models.py` (Here is the content of the file)

* models.py
```
from django.db import models

class Memo(models.Model):
    text = models.CharField(max_length = 200)
```
※ Since it is a simple application, there is only one model of data.

## Create View
Change content of `mysite/memo/views.py` (Here is the content of the file)
* views.py
```
from django.views import generic
from .models import Memo

class MemoListView(generic.ListView):
    model = Memo

class MemoDetailView(generic.DetailView):
    model = Memo

class MemoCreateView(generic.CreateView):
    model = Memo
    fields = ['text']
    success_url = "/memo"

class MemoUpdateView(generic.UpdateView):
    model = Memo
    fields = ['text']
    success_url = "/memo"
    template_name_suffix = '_update_form'
```

※ Generic view will do something if you specify the model

※ The default ListView templatename is set to `modelname_list.html`

※ The default DetailView template name is set to  `modelname_detail.html`

## Create Template
Create a new folder `mysite/memo/templates/memo` and create the following four html files there.

Note that the folder name is `templates`, not `template`, there is a `s` attached.

* memo_list.html
```
<p>View : MemoListView</p>
<p>Template : memo_list.html</p>

{% if memo_list %}
  <table>
  {% for memo in memo_list %}
    <tr>
      <td><a href = "{% url 'memo_detail' memo.pk %}"> {{ memo.text }}</a></td>
      <td><a href = "{% url 'memo_update' memo.pk %}">Edit</a></td>
    </tr>
  {% endfor %}
  </table>

{% else %}
<p>No memo available.</p>

{% endif %}
<p><a href = 'memo_create'>Create a new memo.</a></p>
```
* memo_detail.html
```
<p>View : MemoDetailView</p>
<p>Template : memo_detail.html</p>

{% if memo %}
  <ul>
    <li>Primary Key Number : {{ memo.pk }}</li>
    <li>Memo Text : {{ memo.text }}</li>
  </ul>

{% else %}
<p>No memo available.</p>

{% endif %}
<a href = "/memo">index</a>
```
* memo_form.html
```
<p>View : MemoCreateView</p>
<p>Template : memo_form.html</p>

<form method = "post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type = "submit" value = "Create" />
</form>
```
* memo_update_form.html
```
<p>View : MemoUpdateView</p>
<p>Template : memo_update_form.html</p>

<form method = "post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type= "submit" value = "Save" />
</form>
```
※ `{{varname}}` embeds variable values in HTML
※ `{% token%}` controls according to tokens

# Finishing
## Migration Implementation

Prepare storage in the database. After migration, the database (SQLite) becomes usable. It is necessary to implement each time there are major changes, such as changing models.

Execute the following with `mysite/`.
```
python manage.py makemigrations
python manage.py migrate
```
## Operation Confirmation
Execute the following with `mysite/` and make the http server start up simpler.
```
python manage.py runserver
```
You will now be able to see it in the browser. Completed when the screen appears at the following URL. Note that ports are 8000 by default.
```
http://localhost:8000/memo/
```