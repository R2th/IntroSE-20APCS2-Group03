![Django](https://www.djangoproject.com/s/img/logos/django-logo-negative.png)

> Note
> - Những bạn đã và đang và sẽ sử dụng Django hẳn chắc không còn lạ gì những câu lệnh command như ***python manage.py runserver, python manage.py createsuperuser ...***. Vậy ***runserver, createsuperuser*** là gì và làm sao để tạo có thể tạo một command tuỳ biến riêng mình.
> - Mặc định trong phần này, các bạn đều đã cài đặt được Django nên mình sẽ không hướng dẫn lại nhé. Lưu ý nhỏ nữa là. Nếu mọi người trong đây về lâu về dài gắn bó với open source thì mình nghĩ linux sẽ là nơi lý tưởng cho các bạn :).

# 1. Tạo project Django
```
# Câu lệnh khởi tạo một project Django
django-admin startproject custom_command

# Di chuyển vào trong project
cd custom_command

# Tạo một app 
django-admin startapp polls
```

# 2. Cấu trúc một Command

```
# Tạo package management và command trong polls có cấu trúc như sau
polls/
    __init__.py
    models.py
    management/
        __init__.py
        commands/
            __init__.py
            _private.py
            hello_world.py
    tests.py
    views.py
```

Sau khi đã tạo đúng cấu trúc để tạo một custom command. Giờ bạn sẽ khai báo app vào file **/custom_command/settings.py** để Django tự động nhận các app mới. 

```
# Application definition
 
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

	# My App
    'polls',
)
```

# 3. Tuỳ biến command

Phần thú vị nhất đến rồi. Bây giờ để thực hiện các cộng việc mà bạn muốn làm khi gọi một command tương tự như Django thực hiện. Bạn sẽ tạo một file trong thư mục command. Ở đây mình đã tạo sẵn một file có tên hello_world. Để gọi command hello_world, bạn sử dụng cậu lệnh **python manage.py hello_world**. Và đây là code trong file hello_world:

```Python
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write('[#] Begin execute...')
        try:
            self.stdout.write('[#] Hello World!')
        except Exception as e:
            print('Error:', e)
        self.stdout.write('[#] DONE!')

```

Chạy thử và xem thành qủa đầu tiên nào mọi người: **python manage.py hello_world**

```
[#] Begin execute...
[#] Hello World!
[#] DONE!
```

# 4. Truyền param trong command

Sẽ như thế nào nếu bạn muốn truyền param trong command. Thật không thể tin được là Django lại hỗ trợ chúng ta đến tận răng những việc này. Cùng mình xem đoạn code sau để hiểu thêm

```
class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('params1', nargs='?', type=str)

    def handle(self, *args, **options):
        # Using parameters:
        param1 = options['params1']
        self.stdout.write('[#] Begin execute...')
        try:
            if param1:
                self.stdout.write('[#] Hello ' + str(param1))
            else:
                self.stdout.write('[#] Hello World')
        except Exception as e:
            print('Error:', e)
        self.stdout.write('[#] DONE!')
```

Việc truyền param thật đơn giản phải không. **python manage.py hello_world Quang** . Bạn sẽ nhận được kết qủa

```
[#] Begin execute...
[#] Hello Quang
[#] DONE!
```

# 5. Tổng kết
Vậy là các bạn đã hiểu được cách tạo một custom command trong Django rồi đúng không. Hãy tự mình làm những example đơn giản như trên để hiểu rõ hơn. Bạn cũng có thể mở rộng ra như làm cách nào để truyển multiple param trong custom command. :)