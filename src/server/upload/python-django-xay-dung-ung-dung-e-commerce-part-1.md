# Giới thiệu Django - Khởi tạo project
## Sơ qua về Django

![](https://www.tylerjs.dev/static/24fded71cf2add10ab1372759a2ae04c/c07a1/preview.png)
Django là một Framework lập trình web bậc cao được viết bằng ngôn ngữ lập trình Python.

Django nhanh và đơn giản giúp chúng ta có thể lập trình web trong thời gian ngắn. Ngoài ra, Django còn có tài liệu rất tốt, cộng đồng Django đông và lớn mạnh.

Nó tuân theo nguyên tắc DRY (Don't repeat yourself - Đừng lặp lại chính mình), trong khi những Framework khác lại không coi trọng điều này. Django cũng hỗ trợ ORM (Object Relistic Mapping)

Mô hình MTV pattern:
+ Django tuân theo mô hình MTV (Model-Template-View) thay vì mô hình MVC (Model-View-Controller)
+ Mô hình được dùng khi tạo ứng dụng tương tác với người dùng.
+ Mô hình này bao gồm code HTML với DJango Template Language (DTL)
+ View (tương ứng với Controller của MVC) là mã được viết để kiểm soát sự tương tác giữa Model và Template, nói cách khác là điều ướng các Request từ Client gửi lên Server và trả về kết quả từ Server xuống Client.
    
Để code Django, chúng ta phải cài đặt được Python. Bạn có thể cài đặt Python và Pip ở hướng dẫn [này](https://linuxize.com/post/how-to-install-pip-on-ubuntu-20.04/), đây là hướng dẫn cài đặt với Ubuntu và mình cũng sẽ code trên hệ điều hành Ubuntu.

Phiên bản Python mình sử dụng là Python 3.7, các bạn cũng có thể cài đặt Python với các phiên bản `3.` khác.

## Khởi tạo project

Việc đầu tiên là cài đặt môi trường ảo để phát triển dự án, có rất nhiều thư viện python có thể làm được điều này từ virtualenv đến pipenv. Để thuận tiện, mình sử dụng luôn [pipenv](https://github.com/pypa/pipenv) để triển khai cài đặt. Ta chạy lệnh `pip3 install pipenv`

Tiếp theo là tạo folder chứa project và chạy môi trường ảo:
```
$ mkdir GreatKart && cd GreatKart # folder chứa code project
$ pipenv install Django # Django==3.2
$ pipenv shell
```

Lúc này, command line có dạng `(GreatKart)...$` tức là chúng ta đang trong môi trường ảo là `GreatKart`.

Tạo code project với lệnh `django-admin startproject greatkart .`. Lệnh này sẽ tạo tất cả code cần có cho 1 project Django ban đầu, mình thêm dấu `.` vào cuối, sẽ hơi khác so với thông thường khi không có dấu `.`
```
(GreatKart)...$ python3 manage.py migrate
(GreatKart)...$ python3 manage.py runserver
```

Lúc này, command line sẽ xuất hiện 1 đường dẫn http://127.0.0.1:8000/ và chúng ta truy cập vào đường dẫn này sẽ có dạng:

![](https://images.viblo.asia/d3e8970c-da34-4818-97ea-e03b25d0123f.png)

Cấu trúc thư mục của project:
```
---GreatKart
      |---greatkart (folder)
      |---manage.py
      |---db.sqlite3
      |---Pipfile
      |---Pipfile.lock (Nếu chưa có, mình tạo bằng cách chạy `pipenv lock`)
      |---requirements.txt (mình tạo bằng lệnh)
      |---.gitignore (mình tự tạo thêm)
```

## Kết nối với MySQL

Mỗi Framework lập trình web nào cũng cần phải có cơ sở dữ liệu để quản lý dữ liệu người dùng. Nhìn thoáng qua file `GreatKart/greatkart/settings.py` và kéo xuống phần `DATABASES`:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

Ở đây, mặc định thì Django đang sử dụng hệ quản trị CSDL là sqlite3 cũng chính vì thế khi bạn chạy lệnh migrate bên trên, folder code sẽ tự tạo file `GreatKart/db.sqlite3`. Django hỗ trợ rất nhiều hệ quản trị CSDL phổ biến cả sql lẫn nosql, chính vì thế mình sẽ sử dụng luôn MySQL làm hệ quản trị CSDL thay cho sqlite3.

Để sử dụng được MySQL, chúng ta có thể cài đặt MySQL [ở đây](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04), bạn chỉ cần làm đến bước `FLUSH PRIVILEGES;` là đủ rồi. Ngoài ra, để thuận tiên cho quản lý MySQL bằng giao diện, bạn có thể cài luôn MySQL Workbench [ở đây](https://linuxconfig.org/install-and-configure-mysql-workbench-on-ubuntu-linux). Còn nữa, chúng ta cũng cần phải cài đặt thư viện `mysqlclient` để Python kết nối đến MySQl bằng lệnh `pip3 install mysqlclient`

Mình chỉnh sửa lại code `DATABASES` trong file `settings.py` 1 chút:
```
DATABASES = {
    'default': {
        'ENGINE': "django.db.backends.mysql",
        'HOST': "localhost",
        'NAME': "GreatKart", # Đừng quên phải tạo trước Schema có tên 'GreatKart' trong MySQL
        'USER': "root",
        'PASSWORD': "12345678",
    }
}
```

Thế là xong, bạn chạy lại lệnh `python3 manage.py migrate`, nếu command line không báo lỗi thì chúng ta đã kết nối thành công, lúc này bạn có thể xóa file `db.sqlite3` rồi.

Để tên database và pasword thế này thì hớ hênh quá, chúng ta phải tạo thêm biến `env` để không bị lộ những thứ cá nhân thế này và những thứ khác sau này cũng  thế. Thư viện Python cần cài đặt tiếp đó là `django-environ`, sau đó bạn tạo luôn file `.env` cùng cấp với `manage.py`  với nội dung:
```
SECRET_KEY= ... # SECRET_KEY trong file settings.py 
DATABASE_ENGINE=django.db.backends.mysql
DATABASE_NAME=GreatKart
DATABASE_USER=root
DATABASE_PASSWORD=12345678
DATABASE_HOST=localhost
DATABASE_PORT=3306
TIME_ZONE=Asia/Ho_Chi_Minh
LANGUAGE_CODE=vi
```

Trong file `settings.py` bạn phải có thêm:
```
# Để lên trên
import environ
env = environ.Env(
    DEBUG=(bool, False)
)
environ.Env.read_env()
```

và bạn chỉ cần thay những thứ tương ứng từ file `.env` vào:
```
SECRET_KEY = env("SECRET_KEY")
DATABASES = {
    "default": {
        "ENGINE": env("DATABASE_ENGINE"),
        "NAME": env("DATABASE_NAME"),
        "USER": env("DATABASE_USER"),
        "PASSWORD": env("DATABASE_PASSWORD"),
        "HOST": env("DATABASE_HOST"),
        "PORT": env("DATABASE_PORT"),
    }
}
LANGUAGE_CODE = env("LANGUAGE_CODE")
TIME_ZONE = env("TIME_ZONE")
```

Chúng ta lại chạy lại câu lênh `migrate` và `runserver` như bên trên, nếu không có lỗi gì thì ổn rồi.

# Docker cho project

Ta thoát khỏi môi trường ảo trong phần 1 bằng lệnh `exit`, tạo 2 file Dockerfile và docker-compose.yml:
```
$ touch Dockerfile
$ touch docker-compose.yml
```

Nội dung file Dockerfile như sau:
```
# Pull base image
FROM python:3.7

# Set environmental variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY Pipfile Pipfile.lock requirements.txt /code/
RUN pip3 install pipenv && pipenv install --system && pip3 install -r requirements.txt

# Copy project
COPY .env /code/
COPY . /code/
```

Các nội dung này khá quen thuộc với người dùng Docker thường xuyên nên mình cũng không giải thích code nữa.

Nội dung file docker-compose.yml như sau:
```
version: '3'
services:
    web:
        build: .
        command: python3 /code/manage.py runserver 0.0.0.0:8000
        volumes:
            - .:/code
        ports:
            - 8000:8000
        depends_on:
            - db
        env_file:
            - .env
    db:
        image: mysql:8.0.20
        restart: always
        command: --default-authentication-plugin=mysql_native_password --mysqlx=0
        environment:
            MYSQL_DATABASE: GreatKart
            MYSQL_USER: root
            MYSQL_PASSWORD: 12345678
            MYSQL_ROOT_PASSWORD: 12345678
        volumes:
            - ".dbdata:/var/lib/mysql"
        ports:
            - '3305:3306'
        env_file:
            - .env
```
Ở file `docker-compose.yml` này, chúng ta tạo 2 container là web (để chạy ứng dụng web của chúng ta) và db (để chạy phần cơ sở dữ liệu MySQL)

Bạn cần chú ý, giá trị của `depends_on` phải là tên container cơ sở dữ liệu (db). Trong container db chứa image có tên `mysql:8.0.20` tức là phải là phiên bản MySQl trong máy chúng ta, giá trị volumes bắt đầu với `- .db...` cũng phải tương ứng với tên container, giá trị ports bạn phải đặt thành `{x}/3306` (`x` không phải là 3306 để không bị trùng port). Cả 2 container phải có giá trị `env_file` do chúng ta đang dùng biến môi trường

Ngoài ra, file `.env` bạn cũng cần đổi lại giá trị của `DATABASE_HOST=localhost` thành `DATABASE_HOST=db` (tên container db)

Chúng ta chạy các lệnh sau đển run docker:
```
$ sudo docker build .
$ sudo docker-compose build
$ sudo docker-compose up
```

Bạn mở thêm 1 tab command line nữa và chạy `sudo docker-compose exec web python3 manage.py migrate` để kết nối CSDL với container db của Docker

Nếu cả các lệnh trên không báo lỗi và chúng ta truy cập lại trang http://127.0.0.1:8000/ vẫn như cũ thì ổn rồi. Lúc này, chúng ta đang chạy web với docker mà không cần phải vào môi trường ảo (`pipenv shell`) mới có thể chạy được như phần 1 nữa.

Nếu xảy ra một số lỗi khi chạy thì các bạn có thể search Google để fix lỗi

# Cài đặt Static và Media

Thư mục static trong Django là nơi chứa các folder, file tĩnh. Bao gồm: folder css, javascipt, font và các file ảnh cố định cho trang web.

Ngoài ra, mình cũng dowload các file cần thiết trong bootstrap 4 về để dùng, các bạn có thể sử dụng thư viện django-bootstrap4 nếu không muốn dùng nó trong static. Code cần thiết cho thư mục static mình để [ở đây](https://github.com/chungpv-1008/GreatKart/tree/master/greatkart/static), các bạn có thể download về để sử dụng ngay.

Tiếp theo, đi đến file settings.py chúng ta thêm đoạn code sau để Django nhận biết thư mục static:
```
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_DIRS = [
    'greatkart/static'
]
```

Ở đây, `STATIC_URL` và `STATIC_ROOT` là nơi Django lưu trữ các file static thông qua lệnh quản lý collectstatic khi deploy. `STATICFILES_DIRS` để Django thông qua đó tìm kiếm tất cả các file static rồi nạp vào nơi lưu trữ

Thư mục static vừa tải xuống bên trên mình để ở trong thư mục con `greatkart`, cùng cấp với file settings.py. Tiếp theo ta chạy lệnh `python3 manager.py collectstatic`, thì Django sẽ tạo thư mục có đường dẫn như trong biến `STATIC_URL`, cùng cấp với thư mục `greatkart`.

Nếu sau này chúng ta muốn thay đổi thư mục static, ta chỉ cần sửa thư mục static cùng cấp với settings.py, rồi chạy lại lệnh collectstatic để khởi tạo lại thư mục static mới.

Media là thư mục lưu trữ các file có kiểu media như các ảnh, video. Từ đó, server có thể truy cập để thêm, sửa, xóa trong đó. Cấu hình cho media như sau:
```
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```
Lần này chúng ta không cần làm gì thêm nữa. Nếu có lệnh truy cập thì Django sẽ tìm thư mục Media hoặc sẽ tạo nó nếu chưa có.

# Tùy chỉnh user model, category, product model

Trong Django, framework này đã tạo 1 mô hình mặc định cho người dùng có tên là user. Chúng ta nên tùy chỉnh và kế thừa các hàm từ đó vì việc mặc định này thường hạn chế yêu cầu của nhà phát triển.

Tạo app mới có tên `accounts` với lệnh `python3 manager.py startapp accounts`, thêm `'accounts'` vào biến mảng `INSTALLED_APPS` trong file settings.py, cũng như thêm 1 biến mới `AUTH_USER_MODEL = 'accounts.Account'`, biến này thông báo cho Django biết ta không còn dùng mô hình user mặc định nữa mà thay vào đó là `accounts`

Ta thêm class như sau vào file `accounts/model.py`:
```

class Account(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=50)

    # required
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'    # Trường quyêt định khi login
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']    # Các trường yêu cầu khi đk tài khoản (mặc định đã có email), mặc định có password

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin    # Admin có tất cả quyền trong hệ thống

    def has_module_perms(self, add_label):
        return True
```

Thông tin các trường cần thiết cho bảng mới `Account` mình đã comment bên cạnh để mọi người hiểu chức năng.

Mình có tạo thêm class MyAccountManager để quản lý các thao tác người dùng:
```

class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if not email:
            raise ValueError('Email address is required')

        if not username:
            raise ValueError('User name is required')

        # Tạo đối tượng user mới
        user = self.model(
            email=self.normalize_email(email=email),    # Chuyển email về dạng bình thường
            username=username,
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email=email),
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user
```

Chạy lệnh `python3 manager.py makemigrations` sau đó là `python3 manager.py migrate` để tạo bảng Account trong mysql. Và chạy lệnh `python3 manager.py createsuperuser` để tạo 1 superadmin cho hệ thống. Lúc này các trường bạn phải điền đã giống với hàm create_superuser mà chúng ta đã tùy chỉnh.

Trong file `accounts/admin.py` ta tạo thêm class để superadmin có thể quản lý bảng này:

```
class AccountAdmin(UserAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'last_login', 'date_joined', 'is_active')
    list_display_links = ('email', 'username', 'first_name', 'last_name')   # Các trường có gắn link dẫn đến trang detail
    readonly_fields = ('last_login', 'date_joined')     # Chỉ cho phép đọc
    ordering = ('-date_joined',)     # Sắp xếp theo chiều ngược

    # Bắt buộc phải khai báo
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Account, AccountAdmin)
```

Chúng ta truy cập đường dẫn `http://127.0.0.1:8000/admin/` để đăng nhập và được các màn hình như sau:
![](https://images.viblo.asia/8949c348-93e0-44c8-8f04-8cae83bc0ac6.png)
![](https://images.viblo.asia/37738085-37d9-4926-b284-ad9a177b83b6.png)
![](https://images.viblo.asia/3f8b9196-58bd-4b19-b2d4-2c59d1458473.png)


Tiếp theo, ta tạo app category với lệnh `startapp` như trên, ta thêm class Category vào file `category/models.py` như sau:

```
from django.db import models
from django.urls import reverse


class Category(models.Model):
    category_name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(max_length=255, blank=True)
    category_image = models.ImageField(upload_to='photos/categories/', blank=True)

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.category_name
```

Trường `slug` là để định danh cho 1 category, trường `category_image` sẽ cho phép truy cập thư mục `media/photos/categories`, đừng lo nếu ta chưa có thư mục này, Django sẽ tự tạo nó. Trong class con Meta, ta khai báo biến `verbose_name` và `verbose_name_plural` vì nếu không có thì trong trang superadmin sẽ hiển thị `categorys`, điều này thì không đúng chỉnh tả. Chạy lệnh `makemigrations` và `migrate` để tạo bảng.

Thêm code cho file `category/admin.py` để superuser có thể quản lý bảng category:
```
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('category_name',)}  # Gợi ý trường slug theo category_name
    list_display = ('category_name', 'slug')

admin.site.register(Category, CategoryAdmin)
```

Chúng ta có giao diện cho phần quản lý category của superuser như sau:
![](https://images.viblo.asia/e570222f-200e-4ef4-b92a-a048d039403d.png)
![](https://images.viblo.asia/2cf79eea-f274-4047-9ce4-e371589433de.png)


Tiếp theo, chúng ta tạo app store để quản lý bảng product với lệnh `startapp store`. Trong file `store/models.py` ta tạo class Product như sau:
```
from django.urls import reverse
from category.models import Category
from django.db import models


class Product(models.Model):
    product_name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(max_length=500, blank=True)
    price = models.IntegerField()
    images = models.ImageField(upload_to='photos/products')
    stock = models.IntegerField()
    is_available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)    # Khi xóa category thì Product bị xóa
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name
```

Trong file `store/admin.py` ta cũng thực hiện thêm app store để superuser quản lý:
```
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price', 'stock', 'category', 'created_date', 'modified_date', 'is_available')
    prepopulated_fields = {'slug': ('product_name',)}

admin.site.register(Product, ProductAdmin)
```

Ta có giao diện quản lý app product trong superuser như sau:

![](https://images.viblo.asia/26c8b24c-8310-4b9b-acc7-fc458b4d04be.png)
![](https://images.viblo.asia/d9656ec7-695c-4e10-9c76-734a178fc458.png)


Trong file `greatkart/urls.py` ta tùy chỉnh biến urlpattern như sau:
```
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('store/', include('store.urls')),
    path('carts/', include('carts.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

Ngoài ra, ở app store ta cũng tạo 1 file urls.py với biến `urlpattern`:
```
urlpatterns = [
    path('', views.store, name='store'),
    path('<slug:category_slug>/', views.store, name='products_by_category'),
    path('<slug:category_slug>/<slug:product_slug>/', views.product_detail, name='product_detail'),
]
```

Trên đây, ta thực hiện khai báo các url trong file `greatkart/urls.py`, biến `urlpattern` khai báo các cụm đường dẫn đến các app khác. Django sẽ tự động tìm các đường dẫn từ file này. Biến `urlpattern` trong file `store/urls.py` sẽ khai báo cụ thể các đường dẫn như thế nào. Nó có tiền tố kế thừa từ file url cha

# Thiết kế Cart, CartItem model

Ta sẽ tạo 2 bảng cart và cart_item trong cùng 1 app là carts với lệnh `startapp carts`. Ta tùy chỉnh file `carts/models.py` với các class mới như sau:
```

class Cart(models.Model):
    cart_id = models.CharField(max_length=250, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.cart_id


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.product
```

Và thêm đoạn code để superuser quản lý, ở file `carts/admin.py`:
```
admin.site.register(Cart)
admin.site.register(CartItem)
```

Bảng Cart có các bản ghi mô tả các giỏ hàng của người dùng, bao gồm cả người dùng đã đăng nhập và người dùng vãng lai (bản ghi được tạo dựa trên cookie của máy local).

Bảng CartItem với bản ghi tương ứng là các mục hàng trong giỏ hàng. Với 2 khóa ngoại là product và cart

Tùy chỉnh biến `urlpartterns` trong file `carts/urls.py` như sau:
```
urlpatterns = [
    path('', views.cart, name='cart'),
    path('add_cart/<int:product_id>/', views.add_cart, name='add_cart'),
    path('remove_cart/<int:product_id>/', views.remove_cart, name='remove_cart'),
    path('remove_cart_item/<int:product_id>/', views.remove_cart_item, name='remove_cart_item'),
]
```
# Template cho trang home, store, product_detail

Đi đến trang settings.py, ta tùy chỉnh biến `TEMPLATES` ở cặp key-value như sau:
```
'DIRS': ['templates']
```
Chúng ta tạo 1 folder đồng cấp với manager.py là `templates` để Django tự động tìm folder này để load các file template.

Từ file `greatkart/views.py` ta thêm hàm `home` để làm chức năng điều hướng request:
```
def home(request):
    products = Product.objects.all().filter(is_available=True)
    context = {
        'products': products,
    }
    return render(request, 'home.html', context=context)
```

Từ folder template, ta tạo 1 file base.html làm file template cơ sở cho hầu hết các trang trong hệ thống. Và 1 file home.html làm trang chủ.

Tất cả các file template, các bạn có thể tham khảo [ở đây](https://github.com/chungpv-1008/GreatKart/tree/master/templates)
![](https://images.viblo.asia/17573146-584b-4672-9cfa-ddb93337eb0a.png)
![](https://images.viblo.asia/f03e6712-574b-4c93-8ccd-df84107f81b1.png)


Tiếp theo, ta tùy chỉnh file `store/views.py` để hiển thị trang store. Ngoài ra, ta cũng thêm các file template cho app store. Tất cả mình để ở link github bên trên. Ta sẽ hiển thị các trang như sau:
![](https://images.viblo.asia/0b78e464-a31f-4815-a13b-572b666013a4.png)
![](https://images.viblo.asia/7d04fa50-6cfd-4afb-89a9-5cc0af37a216.png)

Chúng ta thêm file template cho trang product-detail để được trang product-detail như sau:

![](https://images.viblo.asia/52ea7b66-b6c3-4d62-8e39-d2960d19a3a0.png)

# Kết thúc

Đến đây mình xin được dừng phần 1, phần 2 mình sẽ sớm tiếp tục việc hoàn thiện các chức năng:
- Thêm, xóa sản phẩm vào giỏ hàng
- Hoàn thiện các chức năng liên quan đến xác thực người dùng
- Thực hiện thanh toán bằng paypal cho người dùng

Tạm biệt mọi người và hẹn gặp lại :grinning:

> Update: [Phần 2](https://viblo.asia/p/de-dang-co-ngay-ung-dung-e-commerce-voi-django-part-2-aWj53n2Yl6m) và [phần 3](https://viblo.asia/p/hoan-thanh-ung-dung-e-commerce-voi-python-django-3Q75wExeZWb) mình đã hoàn thiện và đó cũng là tất cả các phần cho ứng dụng của mình rồi. Đừng quên cho mình 1 upvote và 1 bookmark ạ :stuck_out_tongue_winking_eye: