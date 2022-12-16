Ở trong bài viết này tôi sẽ trình bày về cách upload file với Django.

**Source code được public ở dưới bài viết**. 
## 1. Kiến thức cơ bản về File với Django
Khi submit file lên server, data file sẽ nằm trong` request.FILES.`
Điều bắt buộc cho HTML form phải có thuộc tính `enctype="multipart/form-data"` nếu không `request.FILES` sẽ trống.

Form cần được submit với **POST** method.

Django có các loại mẫu thích hợp để sử lý upload files: `FileField` và `ImageField`.

Các loại file được upload `FileField` or `ImageField` sẽ không được lưu trữ trong database nhưng sẽ được lưu trữ ở fileSystem.

FileField vàImageField được tạo như String field trong database( thông thường là varchar ), mục đích để ánh xạ tới file thực tế.

Nếu delete File nào đó nó sẽ delete reference tới file đấy mà không delete file vật lý 

The `request.FILES` là một dirictionary-like object. Với mỗi key trong request.FILES là tên từ 

`<input type="file" name="" />.`

Với mỗi giá trị của `request.FILES` là một thể hiện của file đã đươc upload.

Bạn cần set 2 giá trị `MEDIA_URL` và `MEDIA_ROOT` ở trong file** settings.py**
```
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```
Ở môi trường development bạn có thể sử dụng : **django.contrib.staticfiles.views.serve()**
```
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Project url patterns...
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
Để access MEDIA_URL trên template bạn cần add `django.template.context_processors.media`
để `context_processeors` của bạn bên trong **TEMPLATE** config
## 2. Simple File Upload
Dưới đây là một ví dụ nhỏ về file upload sử dụng `FileSystemStorage`. 

Sử dụng nó chỉ để hiểu về luồng chạy của quá trình upload file.
**simple_upload.html**
```
{% extends 'uploadFile/base.html' %}

{% block content %}
  <ul>
    <li>
      <a href="{% url 'simple_upload' %}">Simple Upload</a>
    </li>
    <li>
      <a href="{% url 'model_form_upload' %}">Model Form Upload</a>
    </li>
  </ul>

  <p>Uploaded files:</p>
  <ul>
    {% for obj in documents %}
      <li>
        <a href="{{ obj.document.url }}">{{ obj.document.name }}</a>
        <small>(Uploaded at: {{ obj.uploaded_at }})</small>
      </li>
    {% endfor %}
  </ul>
{% endblock %}
```
**views.py**
```
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render, redirect

from uploadfile.forms import DocumentForm
from uploadfile.models import Document


def home(request):
    documents = Document.objects.all()
    return render(request, 'uploadFile/home.html', { 'documents': documents })


def simple_upload(request):
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return render(request, 'uploadFile/simple_upload.html', {
            'uploaded_file_url': uploaded_file_url
        })
    return render(request, 'uploadFile/simple_upload.html')

```
Ở đây tôi có định nghĩa một function home mục đích để hiển thì file đã upload.

function `simple_upload` để nhận file thông qua **request.FILES** và lưu lại url vào trong database.
## 3. File Upload With Model Forms
Và bây giờ, chúng ta sẽ sử dụng model form để thực hiện việc upload file.

model form sẽ thực hiên validation, tự động xây dựng đường dẫn tuyệt đối cho upload, treats tên file nếu conflicts và nhiều chức năng chung khác.
**models.py**
```
from django.db import models

class Document(models.Model):
    description = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
```
NOTE:
```
document = models.FileField(upload_to='documents/')
```
tham số upload_to. File sẽ được tự động upload vào thư mục ` MEDIA_ROOT/documents/`
nó cũng cho phép thực custom giống như sau:
```
document = models.FileField(upload_to='documents/%Y/%m/%d/')
```
lúc này file upload sẽ được upload vào thư mục theo từng ngày ví dụ: ` MEDIA_ROOT/documents/2019/03/25`

**forms.py**
```
from django import forms
from uploads.core.models import Document

class DocumentForm(forms.ModelForm):
    class Meta:
        model = Document
        fields = ('description', 'document', )
```
**model_form_upload.html**
```
{% extends 'uploadFile/base.html' %}

{% block content %}
  <form method="post" enctype="multipart/form-data">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Upload</button>
  </form>

  <p><a href="{% url 'home' %}">Return to home</a></p>
{% endblock %}
```
Source Avaible in my repository on [Github](https://github.com/doquangduy/Road-to-Django).
Cảm ơn bạn đã theo dõi hết bài viết.