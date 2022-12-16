### 11. Custom packet Manager với QuerySets

Trong 1 model Django, Manager là 1 inferace dùng để tương tác với database và mặc định nó sẵn có thông qua thuộc tính `Model.objects`.  Ta có thể dễ dàng mở rộng và thay đổi các manager mặc định bằng cách extend từ class Manager của thư viện django.db
```python
from django.db import models

class DocumentManager(models.Manager):
    def pdfs(self):
        return self.filter(file_type='pdf')

    def smaller_than(self, size):
        return self.filter(size__lt=size)

class Document(models.Model):
    name = models.CharField(max_length=30)
    size = models.PositiveIntegerField(default=0)
    file_type = models.CharField(max_length=10, blank=True)

    objects = DocumentManager()
 ```
 Sau đó, bạn có thể truy xuất tất cả file pdf bằng cách :
```python
Document.objects.pdfs()
```
Method mới thêm này có thể sử dụng tiếp với các hàm của Manager như `order_by` hoặc `filter` 
```python
Document.objects.pdfs().order_by('name')
```
nhưng không thể gọi cùng với các method mới 
```python
Document.objects.pdfs().smaller_than(1000)
=> AttributeError: 'QuerySet' object has no attribute 'smaller_than'
```
Để cải thiển  điều này,  chúng ta cần custom lại các method trong QuerySet:
```python
class DocumentQuerySet(models.QuerySet):
    def pdfs(self):
        return self.filter(file_type='pdf')

    def smaller_than(self, size):
        return self.filter(size__lt=size)

class DocumentManager(models.Manager):
    def get_queryset(self):
        return DocumentQuerySet(self.model, using=self._db)  # Important!

    def pdfs(self):
        return self.get_queryset().pdfs()

    def smaller_than(self, size):
        return self.get_queryset().smaller_than(size)

class Document(models.Model):
    name = models.CharField(max_length=30)
    size = models.PositiveIntegerField(default=0)
    file_type = models.CharField(max_length=10, blank=True)

    objects = DocumentManager()
```
Giờ bạn có thể sử dụng nó như các method QuerySet khác :
```python
Document.objects.pdfs().smaller_than(1000).exclude(name='Article').order_by('name')
```
Nếu bạn chỉ muốn thêm custom QuerySet trong Manager, bạn có thể đơn giản cho nó extent từ `models.QuerySet` và trong model thì set manager với `objects = DocumentQuerySet.as_manager()` :
```python
class DocumentQuerySet(models.QuerySet):
    def pdfs(self):
        return self.filter(file_type='pdf')

    def smaller_than(self, size):
        return self.filter(size__lt=size)

class Document(models.Model):
    name = models.CharField(max_length=30)
    size = models.PositiveIntegerField(default=0)
    file_type = models.CharField(max_length=10, blank=True)

    objects = DocumentQuerySet.as_manager()
```
những đoạn code custtom này có thể để trong file `models.py` nhưng nó sẽ làm model của bạn trở nên 'béo', tốt hơn nên quản lý chúng trong 1 thư mục riêng, `lib` chả hạn.

### 12. Tăng tốc migration cho các unit Test

Tính năng migration trong Django thực sự rất tốt nhưng khi chạy test, nó sẽ làm chậm quá tình chạy test , đặc biệt là khi số lượng migration trong project rất nhiều. Dưới đây là 1 mẹo đơn giản giúp bạn tăng tốc thực thi test.

Chúng ta tạo 1 file setting riêng cho môi trường test:
```python
#f ile tests_settings.py

from settings import *

# Custom settings goes here
```

Sau đó chạy test:
```python
python manage.py test --settings=myproject.tests_settings --verbosity=1
```
**Với Django >= 1.9**

Thêm setting `MIGRATION_MODULES` vào file settings và set các giá trị trong setting này bằng 'None', như thế, Django sẽ bỏ qua module migrate khi chạy.
```python
from settings import *

MIGRATION_MODULES = {
    'auth': None,
    'contenttypes': None,
    'default': None,
    'sessions': None,

    'core': None,
    'profiles': None,
    'snippets': None,
    'scaffold_templates': None,
}
```
**Với Django < 1.9**
Thêm trong setting :

```python
from settings import *

class DisableMigrations(object):
    def __contains__(self, item):
        return True

    def __getitem__(self, item):
        return 'notmigrations'

MIGRATION_MODULES = DisableMigrations()
```
**Vesion Django cũ hơn (dùng South)**

Set thẳng :
```python
SOUTH_TESTS_MIGRATE = False
```

### 13. Sử dụng biểu thức F()

Trong Django QuerySet API, biểu thức F() được sử dụng để lấy giá trị của các trường của model trong database. Giả sử chúng ta có class `Product` cos 1 field laf `price` và bạn muốn tăng price của tất cả product lên 20%.

1 giải pháp cho bài toàn này là :
```python
products = Product.objects.all()
for product in products:
    product.price *= 1.2
    product.save()
```
Thay vì đó, bạn có thể sử dụng F() để update nó trong 1 câu query đơn giản :
```python
from django.db.models import F

Product.objects.update(price=F('price') * 1.2)
```
hoặc update chỉ cho 1 product:
```python
product = Product.objects.get(pk=5009)
product.price = F('price') * 1.2
product.save()
```
Nhưng hãy cẩn thận khi bạn assign giá tri cho các thuộc tính, F() sẽ vẫn tồn tai và hoạt động kể cả khi model đã lưu: 
```python
product.price                   # price = Decimal('10.00')
product.price = F('price') + 1
product.save()                  # price = Decimal('11.00')
product.name = 'What the F()'
product.save()                  # price = Decimal('12.00')
```
Vì vậy, về cơ bản sau khi cập nhật một trường như trên, `product.price` sẽ vẫn giữ một phiên bản của `django.db.models.expressions.CombinedExpression` thay vì kết quả thực tế. Nếu bạn muốn truy cập kết quả thực tế thì dùng :
```python
product.price = F('price') + 1
product.save()
print(product.price)            # <CombinedExpression: F(price) + Value(1)>
product.refresh_from_db()
print(product.price)  
```
Bạn cũng có thể sử dụng nó với hàm `annotate` để lấy thêm dữ liệu:
```python
from django.db.models import ExpressionWrapper, DecimalField

Product.objects.all().annotate(
    value_in_stock=ExpressionWrapper(
        F('price') * F('stock'), output_field=DecimalField()
    )
)
```
Bởi vì `price` có datatype là `DecimalField`, và `stock` là `IntegerField` nên chúng ta cần sử dung 1 đối tượng `ExpressionWrapper` để xử lý .

F() cũng đươc dùng để filter dữ liệu :
```python
Product.objects.filter(stock__gte=F('ordered'))
```

### 14. Sử dụng Framework Messages

Giữ cho người dùng ứng dụng của bạn biết những gì đang diễn ra sẽ tạo ra sự khác biệt rất lớn trong trải nghiệm người dùng. Nếu có điều gì đó mà người dùng ghét hơn là các ứng dụng chậm, thì đó là các ứng dụng không giao tiếp với họ.

- Người dùng nhấp vào nút lưu.
- Chẳng có gì xảy ra.
- Vậy nó có lưu được dữ liệu hay không?
- Phản ứng của người dùng sau vài (mili) giây: *Click!* *Click!* *Click!* *Click!*

Thế nên hãy làm cho người dùng của chúng ta tự tin và thoải mái hơn với framework messages nhé!

**Config**

Măc định, khi bạn bắt đầu một proect Django mới, framwork messages đã đươc cài đăt sẵn rồi, nếu bạn không muốn chỉnh sửa các setting có sẵn, bạn có thể bỏ qua bươc này, nếu không hay thêm vào file settings :

- INSTALLED_APPS
    ```python
    django.contrib.messages
    ```
- MIDDLEWARE hoăc  MIDDLEWARE_CLASSES trong các version cũ :
    ```python
    django.contrib.sessions.middleware.SessionMiddleware
    django.contrib.messages.middleware.MessageMiddleware
    ```
- context_processors của TEMPLATES:
    ```python
    django.contrib.messages.context_processors.messages
    ```
**Message Levels và Tags**

| Keywork | Level  | tag | Mục đích |
| -------- | -------- | -------- | -------- |
| DEBUG     | 10     | debug     | Các message liên quan trong môi trường development sẽ bị bỏ qua hoăc loại bỏ trong môi trường production |
| INFO     | 20     | info     | message cung cấp thông tin cho user |
| SUCCESS     | 25     | success     | Một hành động đã thành công |
| WARNING     | 30     | warning     | Không xảy ra lỗi nhưng có thể xảy ra |
| ERROR     | 40     | error     | Môt hành động không thành công hoặc một lỗi khác đã xảy ra |

Mặc định, Django sẽ chỉ hiển thị message với level > 20 (INFO), nếu bạn muốn hiển thị message ở level DUBUG thì sửa trong setting: 

```python
# settings.py

from django.contrib.messages import constants as message_constants
MESSAGE_LEVEL = message_constants.DEBUG
```
hoặc set cứng giá trị :
```python
MESSAGE_LEVEL = 10  # DEBUG
```


**Sử dụng** 

Có hai cách để sử dụng nó. Nếu bạn đang sử dụng các mức thông báo tích hợp sẵn (đủ cho hầu hết các trường hợp) thì trong file `views.py` :

```python
from django.contrib import messages

@login_required
def password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            messages.success(request, 'Your password was updated successfully!')  # <-
            return redirect('settings:password')
        else:
            messages.warning(request, 'Please correct the error below.')  # <-
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'profiles/change_password.html', {'form': form})
```
và trong template thì setting hiển thị :
```python
{% if messages %}
  <ul class="messages">
    {% for message in messages %}
      <li class="{{ message.tags }}">{{ message }}</li>
    {% endfor %}
  </ul>
{% endif %}
```
Nếu message được thêm thành công (khi submit form thành công) thì nó sẽ hiển thị ra như thế này :
```python
<ul class="messages">
  <li class="success">Your password was updated successfully!</li>
</ul>
```
Bạn cũng có thể thêm extra tag vào trong message :
```python
messages.success(request, 'Your password was updated successfully!', extra_tags='alert')
```
thì sẽ có :
```
<ul class="messages">
  <li class="success alert">Your password was updated successfully!</li>
</ul>
```
Một số method đã tích hợp sẵn :

```python
messages.debug(request, 'Total records updated {0}'.format(count))
messages.info(request, 'Improve your profile today!')
messages.success(request, 'Your password was updated successfully!')
messages.warning(request, 'Please correct the error below.')
messages.error(request, 'An unexpected error occured.')

# Hoặc...

messages.add_message(request, messages.DEBUG, 'Total records updated {0}'.format(count))
messages.add_message(request, messages.INFO, 'Improve your profile today!')

# Hữu ích khi muốn set level cho message:
CRITICAL = 50
messages.add_message(request, CRITICAL, 'A very serious error ocurred.')
```
**Messages kết hợp với Bootstrap**

Sử dụng bootstrap với các class tương ứng với các tag của message giúp giao diện đep hơn.

Trong file `messages.html`:
```python
{% for message in messages %}
  <div class="alert {{ message.tags }} alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{ message }}
  </div>
{% endfor %}
```
Trong `settings.py`
```python
from django.contrib.messages import constants as messages

MESSAGE_TAGS = {
    messages.DEBUG: 'alert-info',
    messages.INFO: 'alert-info',
    messages.SUCCESS: 'alert-success',
    messages.WARNING: 'alert-warning',
    messages.ERROR: 'alert-danger',
}
```
Và khi sử dụng thì thêm `messages.html` vào trong file template `base.html` :
```python
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Simple is Better Than Complex</title>
  </head>
  <body>
    {% include 'partials/header.html' %}
    <main>
      <div class="container">
        {% include 'partials/messages.html' %}
        {% block content %}
        {% endblock %}
      </div>
    </main>
    {% include 'partials/footer.html' %}
  </body>
</html>
```
    
###  15. Sử dụng Mixins với Class-Based Views

Một số quy tắc chung khi sử dụng mixin để định nghĩa các class views của riêng bạn: 

 - Các class base views do Django cung cấp luôn ở bên phải;
- Mixin ở bên trái của base view
- Mixin phải kế thừa từ loại đối tượng đã tích hợp sẵn của Python

Ví dụ :
```python
class FormMessageMixin(object):
    @property
    def form_valid_message(self):
        return NotImplemented

    form_invalid_message = 'Please correct the errors below.'

    def form_valid(self, form):
        messages.success(self.request, self.form_valid_message)
        return super(FormMessageMixin, self).form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, self.form_invalid_message)
        return super(FormMessageMixin, self).form_invalid(form)
        
 class DocumentCreateView(FormMessageMixin, CreateView):
    model = Document
    fields = ('name', 'file')
    success_url = reverse_lazy('documents')
    form_valid_message = 'The document was successfully created!'
```
Trong đó `CreateView` là 1 base view của Django, FormMessageMixin là 1 mixin được thừa kế từ object của Python.

Tương tự, bạn có thể sử dụng lại cùng một `FormMessageMixin` trong `UpdateView` và ghi đè lại form_invalid_message mặc định:
```python
class DocumentUpdateView(FormMessageMixin, UpdateView):
    model = Document
    fields = ('name', )
    success_url = reverse_lazy('documents')
    form_valid_message = 'The document was successfully updated!'
    form_invalid_message = 'There are some errors in the form below.'
```

Từ Django 1.9 chúng ta có các  mixins tích hơp sẵn `LoginRequiredMixin` và `UserPassesTestMixin`. Nếu bạn đang sử dụng nó trong class views của mình, chúng sẽ luôn luôn ở bên trái cùng như thế này :
```python
class DocumentUpdateView(LoginRequiredMixin, FormMessageMixin, UpdateView):
    model = Document
    fields = ('name', )
    success_url = reverse_lazy('documents')
    form_valid_message = 'The document was successfully updated!'
```
 

Link Nguồn :

- https://simpleisbetterthancomplex.com/tips/2016/08/16/django-tip-11-custom-manager-with-chainable-querysets.html
- https://simpleisbetterthancomplex.com/tips/2016/08/19/django-tip-12-disabling-migrations-to-speed-up-unit-tests.html
- https://simpleisbetterthancomplex.com/tips/2016/08/23/django-tip-13-f-expressions.html
- https://simpleisbetterthancomplex.com/tips/2016/09/06/django-tip-14-messages-framework.html
- https://simpleisbetterthancomplex.com/tips/2016/09/27/django-tip-15-cbv-mixins.html