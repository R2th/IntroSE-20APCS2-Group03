### 1. Redirect

package import : `from django.shortcuts import redirect`

Hàm `redirect` đơn giản là một shortcut của class `HttpResponseRedirect` trả về với URL tương ứng. Dùng `redirect` thay vì `HttpResponseRedirect` giúp chúng ta có thể truyền các đối số khác nhau và nó ngắn gọn hơn và không phải import thêm package `django.urlresolvers.reverse` trong file views của bạn.

Các đối số có thể sử dụng:

- 1 model: redirect sẽ gọi đến hàm `get_absolute_url()` của model.
```python
from django.shortcuts import redirect
from simple_blog.models import Post

def post_view(request, post_id):
    post = Post.objects.get(pk=post_id)
    return redirect(post)
    # bằng với: return HttpResponseRedirect(post.get_absolute_url())
```
-  Tên một 'reverse URL'
```python
from django.shortcuts import redirect
from simple_blog.models import Post

def post_view(request, post_id):
    return redirect('post_details', id=post_id)
    # bằng với: return HttpResponseRedirect(reverse('post_details', args=(post_id, )))
```
- Một URL tuyệt đối hoặc tương đối
```python
from django.shortcuts import redirect

def relative_url_view(request):
    return redirect('/posts/archive/')
    # bằng với: return HttpResponseRedirect('/posts/archive/')

def absolute_url_view(request):
    return redirect('https://simpleblog.com/posts/archive/')
    # bằng với: return HttpResponseRedirect('https://simpleblog.com/posts/archive/')
```
### 2. humanize

Django có các filters template được sử dụng để dịch các chữ số và ngày tháng thành các định dạng mà con người có thể đọc được. Nó giúp giao diện trông thân thiện với người dùng và cũng dễ cái đặt nữa. Ví dụ đơn giản là giả sử bây giờ là 23/06/2020 11:10:30 thì nó sẽ dịch thời gian 23/06/2020 11:10:00 thành 30 giây trước.

Để cài đặt Django Humanize, thêm `django.contrib.humanize` vào settiing `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django.contrib.humanize',
]
```
và giờ sử dụng nó trong template :
```
{% load humanize %}
```
```python
{% extends 'base.html' %}

{% load humanize %}

{% block content %}
  <ul>
    {% for notification in notifications %}
      <li>
        {{ notification }}
        <small>{{ notification.date|naturaltime }}</small>
      </li>
    {% empty %}
      <li>You have no unread notification.</li>
    {% endfor %}
  </ul>
{% endblock %}
```
ví dụ trên ta dùng bộ lọc `naturaltime`, nó cũng support các bộ lọc khác :

| Filter | ví dụ | 
| -------- | -------- | 
| apnumber     | 1 sẽ thành 'one'     |
| intcomma     | 4500000 sẽ thành 4,500,000     |
| intword     | 1200000 sẽ thành 1.2 million |
| naturalday     | 22 June 2020 sẽ thành 'yesterday'     |
| naturaltime     | 23 June 2020 20:54:31 sẽ thành '29 seconds ago'     |
| ordinal     | 3 sẽ thành '3rd'     |

bạn có thể đổi ngôn ngữ theo setting của mình.

### 3. Tối ưu DB query

Có một mẹo đơn giản có thể giúp bạn tối ưu các query db đó là sử dụng Django ORM.

Một điều quan trọng là Django QuerySets là 'lazy', tức là db query sẽ không được thực hiện ngay lập tức, nhưng chỉ thực hiện khi cần, tức là khi queryset được gọi đến.

Giả sử ta có model `Invoice` và thực hiện đoạn code sau :
```python
invoices = Invoice.objects.all()
unpaid_invoices = invoices.filter(status='UNPAID')
```
Ở đây, Django ORM sẽ không truy cập vào db, nghĩa là không có query nào được thực hiện. Nó sẽ truy cập vào db khi chúng ta phỏng đoán 1 QuerySet, thông thường, là khi chúng ta bắt đầu vòng lặp qua QuerySet, trong views hoặc template, giống thế này :
```python
<table>
  <tbody>
  {% for invoice in unpaid_invoices %}
    <tr>
      <td>{{ invoice.id }}</td>
      <td>{{ invoice.description }}</td>
      <td>{{ invoice.status }}</td>
    </tr>
  {% endfor %}
  </tbody>
</table>
```
Trong ví dụ bên trên hoạt động rất tốt, chỉ có MỘT query db được thực thi. Nhưng vấn đề bắt đầu xuất hiện khi model của chúng ta có quan hệ với các model khác thông qua `ForeignKey`, `OneToOneField` hoặc `ManyToManyField`.

Giả sử model `Invoice` của chúng ta có `ForeignKey` tới model `Vendor`:
```python
class Invoice(models.Model):
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=10)
    vendor = models.ForeignKey(Vendor)
```
Giờ, nếu bạn lặp qua QuerySet `unpaid_invoices` giống ví dụ bên trên trong template, nhưng chúng ta sẽ hiển thị thêm tên của `vendor`, Django ORM sẽ thực thi thêm 1 query nữa cho mỗi lần lặp :
```python
<table>
  <tbody>
  {% for invoice in unpaid_invoices %}
    <tr>
      <td>{{ invoice.id }}</td>
      <td>{{ invoice.description }}</td>
      <td>{{ invoice.status }}</td>
      <td>{{ invoice.vendor.name }}</td>
    </tr>
  {% endfor %}
  </tbody>
</table>
```
Nếu QuerySet `unpaid_invoices` có 100 bản ghi, thì khi lặp `for loop` sẽ thực thi 101 query, 1 query để lấy các invoices và 1 query cho mỗi invoice để lấy thông tin của vendor của invoice.

Chúng ta có thể cải thiện điều này bằng cách sử dụng phương thức `select_related` để lấy các thông tin cần thiết chỉ trong 1 câu query db đơn giản. 

```python
invoices = Invoice.objects.all()
unpaid_invoices = invoices.select_related('vendor').filter(status='UNPAID')
```
Với cách này, Django ORM sẽ nạp trước các dữ liệu của `vendor` cho mỗi invoice trong cùng 1 query. VÌ vậy các query thêm không còn cần thiết trong trường hợp này và nó giúp tăng hiệu suất cho ứng dụng của bạn.

Ngoài ra, có thể sử dungj công cụ [` Django Debug Toolbar`](https://django-debug-toolbar.readthedocs.io/en/latest/) để theo dỗi số lượng truy vấn.

### 4. Automatic DateTime Fields

Cả `DateTimeField` và `DateField` đều có 2 đối số rất hữu ích để tự động quản lý ngày và giờ. Nếu bạn muốn theo dõi khi 1 record được tạo hoặc được cật nhật, bạn không cần thực hiện nó thủ công mà chỉ cần set `auto_now` và `auto_now_add` là `True` như thế này :
```python
class Invoice(models.Model):
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=10)
    vendor = models.ForeignKey(Vendor)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```
`auto_now_add` sẽ set giá trị `timezone.now()` cho cột created_at khi 1 thực thể được tạo, và `auto_now` set update lại giá trị mỗi lần method `save` của object được gọi.

Một lưu ý quan trọng là cả 2 đối số sẽ được cập nhật giá trị là `timezone.now()` tức là khi bạn tạo một đối tượng, cả created_at và updated_at sẽ được điền. Sử dụng cách này sẽ giúp code của bạn gọn gàng hơn.

### 5. Cách hợp nhất các QuerySet

Cách này đặc biệt hữu ích khi bạn muốn hợp nhất hai hoặc nhiều queryset vào một bộ queryset duy nhất mà không làm mất khả năng thực hiện các thao tác nhứ `filter`, `count`, `distinct`, v.v.

Giả sử ta có model:
```python
class Story(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    category = models.ForeignKey(Category, related_name='stories')
    author = models.ForeignKey(User, related_name='stories')

class Medium(models.Model):
    name = models.CharField(max_length=30, unique=True)
    stories = models.ManyToManyField(Story)
```

Và bạn muốn hiển thị tất cả `story` đã publish với 1 `Medium` cụ thể cùng với các `story` được viết bởi `User` bằng `Category` Django. Lưu ý giả sử `User` này có thể đã publish các `story` với các `Medium` khác nhau :
```python
medium = Medium.objects.get(name='Django Blog')
user = User.objects.get(username='vitor')

django_stories = medium.stories.all()
vitor_stories = user.stories.filter(category__name='django')
```

Chúng ta có 2 queryset khác nhau, 1 bao gồm tất cả `story` từ 1 `medium`  và 1 bao gồm tất cả `story` từ 1 `User` dùng django category.

2 queryset này có thể được hợp nhất với nhau giống ví dụ dưới đây, sử dụng toán tử `|` :
```python
stories = django_stories | vitor_stories  # merge querysets
```
Và bạn vấn có thể thực hiện các hành động khác với queryset mới này :
```python
recent_stories = stories.distinct().order_by('-date')[:10]
```
Tuy nhiên, cách hợp nhất sử dụng toán tử `|` này chỉ sử dụng được cho các queryset từ cùng một model.

### 6. get_or_create

Đây là 1 method rất thuận tiện để tìm kiếm object với 1 set các params, nó sẽ tạo 1 object mới nếu cần thiết (không tìm thấy ).

Thực chất, phương thức `get_or_create`  trả về 1 `tuple` của `(object, created)`. Phần tử đầu tiên là 1 instance của model mà bạn đang tìm kiếm và phần tử thứ 2 là 1 biến boolean, dùng để cho bạn biết là invoice object có được tạo hay không. Nếu là `True` thì object đã được tạo khi dùng method  `get_or_create` và `False` tức là object được tìm thấy từ trong db.

Giả sử có model `AppSettings`, nơi bạn lưu các thông tin cấu hình của banj:
```python
obj, created = AppSettings.objects.get_or_create(name='DEFAULT_LANG')
obj.value = request.POST.get('DEFAULT_LANG')
obj.save()
```
Vậy, chuyện gì xảy ra ở đây? Nếu là lần đầu tiên ta lưu 1 setting với tên `DEFAULT_LANG`, method `get_or_create` sẽ tạo một instance và lưu nó vào database. Nếu là lần thứ 2 hoặc thứ 3 ta lưu setting này thì nó đơn giản là chỉ lấy instance đã tồn tại trong db ra thôi.

### 7. Cách lấy URL hiện tại trong template của Django

Hãy đảm bảo rằng bạn đã thêm `django.template.context_processors.request` vào trong setting `context_processors` của mình.

Từ Django 1.9, nó sẽ được configure sẵn trong `TEMPLATES` :
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```
Trên template,

- để lấy path hiện tại của request, dùng :
    ```
    {{ request.path }}
    ```
 - lấy path hiện tại với các query params:
    ```
     {{ request.get_full_path }}
    ```
 - lấy Domain, path và query params :
     ```
      {{ request.build_absolute_uri }}
     ```
Output:
Giả sử url hiện tại là  `http://127.0.0.1:8000/home/?q=test`

| method | output | 
| -------- | -------- | 
| request.path     | /home/     | 
| request.get_full_path|/home/?q=test |
|request.build_absolute_uri	 |http://127.0.0.1:8000/home/?q=test |

Vấn đề :

Với Django 1.7 hoặc nhỏ hơn

Nếu bạn đang sử dụng verion Django <= 1.7, trong cầu hình `TEMPLATES` sẽ không khả dụng, bạn có thể thêm context_processors như thế này :
```
# settings.py

from django.conf.global_settings import TEMPLATE_CONTEXT_PROCESSORS as TCP

TEMPLATE_CONTEXT_PROCESSORS = TCP + (
    'django.core.context_processors.request',
)
```
Chú ý rằng context_processors đã có sẵn trong module `core`, từ version 1.8, nó được thêm sẵn trong module `template`.

### 8. Blank hay Null?

Django model API cung cấp 2 tùy chọn tương tự rất dễ nhầm lẫn: `null` và `blank`. Với người bắt đầu sử dụng có thể sẽ không biết được sự khác biệt và sử dụng chúng không đúng cách. Cả 2 gần giống như nhau nhưng chúng có sự khác biệt như sau :
- `null` liên quan đến database, nó được xác định nếu một columns trong db cho phép chấp nhận giá trị null hay không.
- `blank` liên quan đến xác nhận. Nó sẽ được sử dụng trong quá trình validate form, khi gọi `form.is_valid()`

Điều đó có nghĩa là nó hoàn toàn ổn nếu có 1 trường với setting `null=True` và `blank=False`, nghĩa là trong database, nó có thể là NULL nhưng trong ứng dụng thì trường này là bắt buộc có giá trị.

Có một vấn đề mà hầu hết các developer đều hiểu sai: Định nghĩa `null=True` cho các trường có datatype là string như `CharField` và `TextField`. Bạn nên tránh làm điều này, nếu không cuối cùng bạn có thể có 2 giá trị có thể có cho trường hợp không có giá trị : None và chuỗi rỗng. Mặc định Django sử dụng chuỗi rỗng , không phải là NULL.

Vì vậy, nếu bạn muốn trường có dạng string của bạn cho phép set giá trị null, có thể làm như thế này :
```python
class Person(models.Model):
    name = models.CharField(max_length=255)  # Bắt buộc
    bio = models.TextField(max_length=500, blank=True)  # Tùy chọn (không để null=True)
    birth_date = models.DateField(null=True, blank=True) # Tùy chọn (có thể để null=True)
```
Giá trị mặc định của `null` và `blank` khi định nghĩa Field là `False`.

Và cũng có 1 case đặc biệt nữa, đó là khi bạn cần chấp nhận giá trị `NULL` cho 1 trường `BooleanField` thì hãy sử dụng `NullBooleanField`.

### 9. Cách tạo một change password view

Có 1 cách rất nhanh để tạo view thay đổi mật khẩu trong Django đó là sử dụng `PasswordChangeForm`. `PasswordChangeForm` có hơi khác một chút so với các function-based view. Nó không kế thừa từ `ModelForm` và nó lấy một đối số `user` trong hàm tạo(constructor) của nó. Hãy xem ví dụ sau về 1 hàm thay đổi mật khẩu của 1 user đã xác thực :
```python
# views.py

from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.shortcuts import render, redirect

def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Your password was successfully updated!')
            return redirect('change_password')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'accounts/change_password.html', {
        'form': form
    })
```
`messages.success()` và `messages.error()` có thể thêm hoặc không. Một điều quan trọng đó là gọi `update_session_auth_hash()` sau khi đã lưu forrm, nếu không gọi hàm này, session lưu trạng thái login của user sẽ mất và user phải login lại. Giờ thêm url và template
```python
# urls.py

from django.conf.urls import url
from myproject.accounts import views

urlpatterns = [
    url(r'^password/$', views.change_password, name='change_password'),
]

# change_password.html
<form method="post">
  {% csrf_token %}
  {{ form }}
  <button type="submit">Save changes</button>
</form>
```

### 10. Tùy chỉnh chính sách đăng nhập với AuthenticationForm

Django hỗ trợ rất nhiều những vấn đề liên quan đến xác thực, bạn có thể dễ dàng thêm plug-in và sử dụng mà không cần chỉnh sửa gì. Nếu muốn chỉnh sửa theo ý muốn của mình, nó cũng rất dễ dàng.  Quá trình xác thực được cài đặt trong built-in `django.contrib.auth.forms.AuthenticationForm` mà bạn sẽ import trong views, nó đơn giản check `username`, `password` và cờ `is_active`. Để tùy chỉnh các xác mình khi xác thực, bạn có thể custom lại method `confirm_login_allowed(user)` của `AuthenticationForm`.
Giả sử bạn muốn xác thực qua email và không muốn người dùng không có email đăng nhập vào hệ thống, bạn có thể custom lại như thế này :
```python
# forms.py 

from django import forms
from django.contrib.auth.forms import AuthenticationForm

class CustomAuthenticationForm(AuthenticationForm):
    def confirm_login_allowed(self, user):
        if not user.is_active or not user.is_validated:
            raise forms.ValidationError('There was a problem with your login.', code='invalid_login')
 ```
 ```python
 # urls.py
 
 from django.conf.urls import url
from django.contrib.auth import views as auth_views

from .forms import CustomAuthenticationForm

urlpatterns = [
    url(r'^login/$', auth_views.login, {'template_name': 'core/login.html',
        'authentication_form': CustomAuthenticationForm}, name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),
    ...
]
```
Về cơ bản, đó chỉ là vấn đề ghi đè phương thức `confirm_login_allowed` và thay thế params `authentication_form` bằng một form mới trong `urlconf`. Bạn có thể tùy chỉnh bất kỳ điều kiện đăng nhập nào và  ngăn cản user login bằng cách raise lên một `ValidationError`.


Link nguồn :
- https://simpleisbetterthancomplex.com/tips/2016/05/05/django-tip-1-redirect.html
- https://simpleisbetterthancomplex.com/tips/2016/05/09/django-tip-2-humanize.html
- https://simpleisbetterthancomplex.com/tips/2016/05/16/django-tip-3-optimize-database-queries.html
- https://simpleisbetterthancomplex.com/tips/2016/05/23/django-tip-4-automatic-datetime-fields.html
- https://simpleisbetterthancomplex.com/tips/2016/06/20/django-tip-5-how-to-merge-querysets.html
- https://simpleisbetterthancomplex.com/tips/2016/07/14/django-tip-6-get-or-create.html
- https://simpleisbetterthancomplex.com/tips/2016/07/20/django-tip-7-how-to-get-the-current-url-within-a-django-template.html
- https://simpleisbetterthancomplex.com/tips/2016/07/25/django-tip-8-blank-or-null.html
- https://simpleisbetterthancomplex.com/tips/2016/08/04/django-tip-9-password-change-form.html
- https://simpleisbetterthancomplex.com/tips/2016/08/12/django-tip-10-authentication-form-custom-login-policy.html