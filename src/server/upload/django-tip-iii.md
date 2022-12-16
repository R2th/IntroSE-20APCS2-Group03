### 16. Tối ưu hóa các truy cập database đơn giản

**Truy cập các giá trị từ Foreign Key:**

Nếu bạn chỉ cần lấy id từ foreign key:

```python
# Good
post.author_id

# Bad
post.author.id
```
Nếu bạn có  foreign key có tên là `author`, Django sẽ tự động lưu trữ primary key trong thuộc tính `author_id`, trong khi trong thuộc tính khác của author sẽ được lưu trữ một tham chiếu trong cơ sở dữ liệu, vì vậy nếu bạn lấy id thông qua 1 instance `author`, như ví dụ trên, nó sẽ phải tạo ra thêm 1 query nữa để lấy dữ liệu.

**Insert hàng loạt các field many to many**

```python
# Good
user.groups.add(administrators, managers)

# Bad
user.groups.add(administrators)
user.groups.add(managers)
```

**Count các QuerySet**

Nếu bạn cần đếm các object từ queryset:
```python
# Good
users = User.objects.all()
users.count()

# hoặc trong template...
{{ users.count }}

# Bad
users = User.objects.all()
len(users)

# hoặc trong template...
{{ users|length }}
```

**Check queryset rỗng**

Nếu bạn muốn check xem queryset rỗng hay không:

```python
#Good
groups = Group.objects.all()
if groups.exists():
    # Do something...

# Bad
groups = Group.objects.all()
if groups:
    # Do something...
```
**Giảm số lượng query**

```python
# Good
review = Review.objects.select_related('author').first()  # Select the Review and the Author in a single query
name = review.author.first_name

# Bad
review = Review.objects.first()  # Select the Review
name = review.author.first_name  # Additional query to select the Author
```

**Chỉ select những gì bạn cần**

Giả sử bảng Invoice của bạn có 50 cột, và bạn chỉ cần hiển thị thông tin tổng quát bao gồm các cột: number, date, value:

```python
# GOOD

# views.py
# Nếu chỉ cần lấy giá trị:
invoices = Invoice.objects.values('number', 'date', 'value')  # Returns a dict

# Nếu phải truy cập các instance methods:
invoices = Invoice.objects.only('number', 'date', 'value')  # Returns a queryset

# invoices.html
<table>
  {% for invoice in invoices %}
    <tr>
      <td>{{ invoice.number }}</td>
      <td>{{ invoice.date }}</td>
      <td>{{ invoice.value }}</td>
    </tr>
  {% endfor %}
</table>


# BAD

# views.py
invoices = Invoice.objects.all()

# invoices.html
<table>
  {% for invoice in invoices %}
    <tr>
      <td>{{ invoice.number }}</td>
      <td>{{ invoice.date }}</td>
      <td>{{ invoice.value }}</td>
    </tr>
  {% endfor %}
</table>
```

**Update hàng loạt**

```python
# Good
from django.db.models import F

Product.objects.update(price=F('price') * 1.2)

# Bad
products = Product.objects.all()
for product in products:
    product.price *= 1.2
    product.save()
```

### 17. Sử dụng method earliest và latest của queryset

Cũng giống như 2 method `first` và `last` trong Queryset, 2 method `earliest` và `latest` cũng được API này cung cấp sẵn. Nó sẽ hưu ích trong việc giúp code của chúng ta trở nên dễ đoc hơn.

Cách tốt nhất để sử dung nó là thêm `get_latest_by` trong class Meta của model:

```python
class Post(models.Model):
    headline = models.CharField(max_length=150)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    publication_date = models.DateTimeField(blank=True, null=True)
    change_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        get_latest_by = 'publication_date'
```
Sau đó, cách sử dụng rất đơn giản:
```python
latest_post = Post.objects.latest()
earliest_post = Post.objects.earliest()
```

Nếu bạn không define `get_latest_by` hoặc bạn muốn sử dụng một field khác thì bạn có thể set field đó vào trong tham số của method khi goi:
```python
latest_change = Post.objects.latest('change_date')
```
Method `earliest` và `latest` sẽ raise lỗi `DoesNotExist` nếu không có object nào tồn tại với các params được set, tức là bảng trống hoặc nó đã đã được filter rồi. Nó khác với 2 method `first` và `last`, chúng trả về `None` nếu khong có object nào thỏa mãn.

Một điều quan trọng khác là `earliest` và `latest` có thể trả về các instance mà date không có giá trị.Nhưng vấn đề là, hành vi sắp xếp không nhất quán giữa các cơ sở dữ liệu khác nhau, vì vậy, bạn có thể muốn loại bỏ các ngày trống khi filter, như sau:
```python
Post.objects.filter(change_date__isnull=False).latest('change_date')
```

Tóm lại thì 2 method này, `earliest` và `latest`thường được sử dụng với các field type `DateField`, `DateTimeField` hoặc `IntegerField`. Chúng cũng vẫn có thể sử dụng được cho các field type khác nhưng  nó sẽ sai về mặt ngữ nghĩa và sẽ gây ra nhiều nhầm lẫn hơn, vì những method này chỉ tạo ra để thuận tiện cho việc filter và để nâng cao khả năng đọc cho code.

### 18. Sự khác nhau giữa ugettext và ugettext_lazy

API translation Django cung cấp một số chức năng tiện ích để giúp bạn translate các ngôn ngữ trong ứng dụng của mình, tất cả chúng đều có sẵn trong module `django.utils.translation`. Đối với hầu hết các trường hợp, bạn thường sẽ sử dụng `ugettext()` và `ugettext_lazy()`.

Tiền tố “u” là viết tắt của “unicode” và thường thì tốt hơn là sử dụng `ugettext()` thay vì `gettext()` và sử dụng `ugettext_lazy()` thay vì `gettext_lazy()`, vì phần lớn chúng ta sẽ làm việc với bảng mã ký tự quốc tế.

Từ tên cho thấy, phiên bản "lazy" của hàm `ugettext_lazy()`  giữ một tham chiếu đến string dịch thay vì văn bản được dịch thực tế, vì vậy, quá trình dịch xảy ra khi giá trị được truy cập chứ không phải khi chúng được gọi.

Điều quan trọng phải chú ý là, trong một dự án Django, có một số trường hợp code chỉ được thực thi một lần (khi khởi động Django). Điều đó xảy ra với các module định nghĩa như models, forms và model forms.

Vậy điều gì sẽ xảy ra nếu chúng ta sử dụng `ugettext()` thay vì `ugettext_lazy()` khi định nghĩa 1 model (giả sử sử dụng cho label của field): 
1.    Django khởi động, ngôn ngữ măc định là tiếng Anh;
2.    Django chọn phiên bản tiếng Anh cho các field label;
3.    Người dùng thay đổi ngôn ngữ của website sang tiếng Tây Ban Nha;
4.    Các label vẫn được hiển thị bằng tiếng Anh (vì định nghĩa trường chỉ được gọi một lần; và vào thời điểm khác nó được gọi, ngôn ngữ là ngôn ngữ khác).

Để tránh hiện tượng này, bạn phải sử dụng đúng các chức năng tiện ích ở đúng trường hơp.

Dưới đây là tóm tắt về thời điểm sử dụng `ugettext()` hoặc `ugettext_lazy()`:
* ugettext_lazy():
    *    models.py (fields, verbose_name, help_text, các method short_description);
    *    forms.py (labels, help_text, empty_label);
    *    apps.py (verbose_name).
* ugettext():
    * views.py
    * Các module khác tương tự để xem các function được thực thi trong suất quá trình request


### 19. Bảo vệ các thông tin nhạy cảm

Internet là một vùng đất hoang dã, bảo mật phải được ưu tiên hàng đầu khi triển khai một ứng dụng web trên internet. Django framework thực hiện một công việc đáng kinh ngạc khi cung cấp các API đáng tin cậy và an toàn. Nhưng điều đó không hữu ích gì nếu chúng ta không sử dụng chúng đúng cách.

Và tất nhiên, chúng ta không bao giờ nên triển khai ứng dụng Django với setting DEBUG = True, bởi vì một trong những tính năng của việc có DEBUG = True là kết xuất nhiều siêu dữ liệu từ môi trường của bạn, bao gồm toàn bộ cấu hình settings.py, khi một lỗi xảy ra.

Mặc dù bạn sẽ không bao giờ sử dụng DEBUG = True, bạn vẫn cần cẩn thận hơn khi đặt tên cho các cấu hình trong module `settings.py`. Đảm bảo rằng tất cả các biến nhạy cảm sử dụng một trong các từ khóa:
* API
* KEY
* PASS
* SECRET
* SIGNATURE
* TOKEN

Bằng cách này, Django sẽ không kết xuất những biến có thể chứa thông tin nhạy cảm.

```python
# Good
S3_BUCKET_KEY = 'xxxxxxxxxxxxxxxx'

# Bad
S3_BUCKET = 'xxxxxxxxxxxxxxxx'
CHAVE_DE_ACESSO = 'xxxxxxxxxxxxxxxx'  # "access key" in portuguese
```

Ngay cả khi bạn đang chạy ứng dụng của mình với DEBUG = False, nếu ứng dụng được setting cấu hình để gửi báo cáo lỗi qua email, thì vẫn có khả năng xuất hiện báo cáo lỗi bị phát hiện, đặc biệt nếu bạn đang truyền báo cáo lỗi không được mã hóa qua internet.

Note: không bao giờ để các thông tin nhạy cảm ở các repository public, nói cách khác, không thêm thông tin nhạy cảm trực tiếp vào file `settings.py`, thay vào đó hãy sử dụng biến môi trường hoặc sử dụng  python-decouple.

Nói về lọc báo cáo lỗi, có hai view decorators  mà bạn nên thực hiện:

**sensitive_variables**

Nếu code của bạn xử lý thông tin nhạy cảm trong các biến cục bộ bên trong một hàm views, hãy đánh dấu rõ ràng chúng là thông tin nhạy cảm để tránh hiển thị chúng trong báo cáo lỗi:

```python
from django.views.decorators.debug import sensitive_variables

@sensitive_variables('user', 'pw', 'cc')
def process_info(user):
    pw = user.pass_word
    cc = user.credit_card_number
    name = user.name
    ...
```
Hoăc nếu bạn muốn ẩn tất cả biến cục bô trong function:
```python
@sensitive_variables()
def my_function():
    ...
```

*Note:  Nếu sử dụng nhiều decorators cho function, hãy chắc chắn `@sensitive_variables()` được để lên đầu tiên.

**sensitive_post_parameters**

Tương tự như ví dụ trên, nhưng nó được sử dụng để handle các thông tin qua method post:

```python
from django.views.decorators.debug import sensitive_post_parameters

@sensitive_post_parameters('pass_word', 'credit_card_number')
def record_user_profile(request):
    UserProfile.create(
        user=request.user,
        password=request.POST['pass_word'],
        credit_card=request.POST['credit_card_number'],
        name=request.POST['name'],
    )
    ...
```

Nếu muốn ẩn tất cả params post lên:
```
@sensitive_post_parameters()
def my_view(request):
    ...
```

### 20. Làm việc với nhiều module setting

Thông thường, bạn nên tránh sử dụng nhiều file setting, thay vào đó, hãy giữ cho các setting dự án của bạn đơn giản. Nhưng điều đó không phải lúc nào cũng khả thi, khi một dự án Django ngày một phát triển, module settings.py có thể trở nên khá phức tạp. Trong những trường hợp đó, bạn cũng muốn tránh sử dụng các câu lệnh `if` như `if not DEBUG: # do something...` Để rõ ràng và tách biệt các setting của môi trường development và môi trường production, bạn có thể chia nhỏ module settings.py thành nhiều file riêng biêt.

**Cấu trúc cơ bản**

1 project Django cơ bản sẽ có cấu trúc như thế này:

```python
mysite/
 |-- mysite/
 |    |-- __init__.py
 |    |-- settings.py
 |    |-- urls.py
 |    +-- wsgi.py
 +-- manage.py
```
Việc đầu tiên chúng ta làm là tạo một thư mục có tên là `settings`, đổi tên file `settings.py` thành `base.py` và di chuyển nó vào bên trong thư mục `settings` mới tạo. Đảm bảo rằng bạn cũng thêm `__init__.py` trong trường hợp bạn đang làm việc với Python 2.x.

```python
mysite/
 |-- mysite/
 |    |-- __init__.py
 |    |-- settings/         <--
 |    |    |-- __init__.py  <--
 |    |    +-- base.py      <--
 |    |-- urls.py
 |    +-- wsgi.py
 +-- manage.py
```
Cũng như tên của nó, `base.py` sẽ cung cấp tất cả các setting dùng chung cho tất cả các môi trường.

Tiếp theo chúng ta tao file module `settings` cho từng môi trường, thông thường sẽ bao gồm các môi trường :

* ci.py
* development.py
* production.py
* staging.py

Và cấu trúc file giờ sẽ ntn:
```python
mysite/
 |-- mysite/
 |    |-- __init__.py
 |    |-- settings/
 |    |    |-- __init__.py
 |    |    |-- base.py
 |    |    |-- ci.py
 |    |    |-- development.py
 |    |    |-- production.py
 |    |    +-- staging.py
 |    |-- urls.py
 |    +-- wsgi.py
 +-- manage.py
```

**Cấu hình cho file settings.py mới**

Hãy xem ví dụ của file `base.py` bên dưới:

```python
# settings/base.py

from decouple import config

SECRET_KEY = config('SECRET_KEY')

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'mysite.core',
    'mysite.blog',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mysite.urls'

WSGI_APPLICATION = 'mysite.wsgi.application'
```

Và giờ tạo file development.py extend từ file base.py

```python
# settings/development.py

from .base import *

DEBUG = True

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', ]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEBUG_TOOLBAR_CONFIG = {
    'JQUERY_URL': '',
}
```
và `production.py` có thể định nghĩa ntn:
```python
# settings/production.py

from .base import *

DEBUG = False

ALLOWED_HOSTS = ['mysite.com', ]

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.mailgun.org'
EMAIL_PORT = 587
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True
```

Có hai điều quan trọng cần lưu ý: tránh sử dụng `import *`. Dùng cách này có thể thêm nhiều setting không cần thiết mà trong một số trường hợp có thể gây ra các sự cố không mong muốn. Một điều quan trọng khác, mặc dù chúng ta đang sử dụng các file setting khác nhau cho các môi trường, bạn vẫn phải bảo vệ dữ liệu nhạy cảm của mình! Hãy đảm bảo rằng bạn giữ mật khẩu và các thông tin khóa bí mật trong các biến môi trường hoặc sử dụng thư viện như Python-Decouple.

**Cách sử dụng**

Bởi vì chúng ta đã bỏ file `settings.py`, nếu chạy command như `python manage.py runserver` nó sẽ không hoạt động nữa. Thay vì đó, chúng ta phải gọi tới file setting tương ứng với môi trường bạn đang muốn khởi động: 
```python
python manage.py runserver --settings=mysite.settings.development
```
hoặc
```
python manage.py migrate --settings=mysite.settings.production
```

Đối với mô trường development, `manage.py` thường được sử dụng nên bạn có thể set module `development.py` vào trong file này luôn. Chỉnh sửa file `manage.py`:
```python
# manage.py

#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.development")  # <-- Change here!
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        # The above import may fail for some other reason. Ensure that the
        # issue is really that Django is missing to avoid masking other
        # exceptions on Python 2.
        try:
            import django
        except ImportError:
            raise ImportError(
                "Couldn't import Django. Are you sure it's installed and "
                "available on your PYTHONPATH environment variable? Did you "
                "forget to activate a virtual environment?"
            )
        raise
    execute_from_command_line(sys.argv)
```
Đơn giản là chúng ta đã đổi dòng
```python
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
```
thành 
```python
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.development")
```

và giờ bạn có thể chạy câu lệnh runserver như bình thường mà không cần thêm tham sô `--settings`. và hãy chắc chắn bạn render ra đúng file setting cho đúng môi trường.

**Ngoài lề**

Bởi vì chúng ta đã có các file setting khác nhau, ban có thể remove `AUTH_PASSWORD_VALIDATORS` setting từ `settings/base.py` và chỉ thêm nó vào trong  `settings/production.py`. Bằng cách này, ban có thể sử dụng các password đơn giản như '123' trên môi trường development, nhưng trên môi trường production, password sẽ được bảo vệ bằng cách validate. 

Trong `settings/tests.py` hoặc `settings/ci.py` bạn có thể overide các setting sau để giúp test của bạn chạy nhanh hơn:
```python
DATABASES['default'] = {
    'ENGINE': 'django.db.backends.sqlite3'
}

PASSWORD_HASHERS = (
    'django.contrib.auth.hashers.MD5PasswordHasher',
)
```

Link nguồn:

- https://simpleisbetterthancomplex.com/tips/2016/10/05/django-tip-16-simple-database-access-optimizations.html
- https://simpleisbetterthancomplex.com/tips/2016/10/06/django-tip-17-earliest-and-latest.html
- https://simpleisbetterthancomplex.com/tips/2016/10/17/django-tip-18-translations.html
- https://simpleisbetterthancomplex.com/tips/2016/11/01/django-tip-19-protecting-sensitive-information.html
- https://simpleisbetterthancomplex.com/tips/2017/07/03/django-tip-20-working-with-multiple-settings-modules.html