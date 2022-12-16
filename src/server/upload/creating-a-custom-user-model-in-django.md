*Làm thế nào để thay thế username với email trong Django authentication?*

Bài viết này sẽ giải thích step-by-step cách tạo một custom User model trong Django mà khi đó email được sử dụng như primary user thay vì username cho việc authentication. 

Cần chú ý rằng các làm này sẽ làm thay đổi rất nhiều đến schema của database vậy nên khuyến khích khi thực hiện một dự án mới.  Với một dự án đã được phát triển trước đó thì cần thiết phải backup data và tạo lại DB. 

# Objectives  
Sau bài viết này bạn có thể nắm được : 
1. Giải thích sứ khác nhau giữa AbstractUser và AbstractBaseUser
2. Giải thích tại sao lại cần setup một custom User model khi bắt đầu một dự án Django mới. 
3. Bắt đầu một dự án Django với custom User model
4. Sử dụng một email address như primary user thay vì username để xác thực. 
5. Luyện tập với test-first development khi implementing một custom User model.


# AbstractUser với AbstractBaseUser

Mặc định User model trong Django sử dụng username để xác thực thay đó bạn mong muốn sử dụng email, bạn sẽ cần tạo một custom User model bằng việc sử dụng một trong hai subclassing AbstractUser hoặc AbstractBaseUser . 

**Options**
1. AbstractUser : Sử dụng option này nếu như bạn muốn sử dụng các trường sẵn có của User và chỉ muốn remove trường username. 
2. AbstractBaseUser: Sử dụng option này nếu như bạn muốn tạo mới hoàn toàn một User model mới. 

Chúng ta sẽ thử cả với hai option này. Step giống nhau cho cả 2 option :
1. Tạo một custom User model và Manager
2. Update setting.py
3. Customize UserCreationForm và UserChangeForm
4. Update admin 

Cần phải nhấn mạnh là custom User model được sử dụng khi bắt đầu một dự án Django mới. Nếu không phải với dự án mới chúng ta cần phải tạo một model khác như UserProfile chẳng hạn và link nó với User model của Django với OneToOneField nếu như bạn muốn thêm field mới vào User model. 

# Project Setup

Tiến hành tạo mới một project với một users app. 

```
$ mkdir django-custom-user-model && cd django-custom-user-model
$ python3 -m venv env
$ source env/bin/activate

(env)$ pip install django==3.0.4
(env)$ django-admin.py startproject hello_django .
(env)$ python manage.py startapp users
```

Chưa tiến hành migrations. Hãy nhớ bằng bạn cần tạo custom User model trước khi bạn apply cho migration đầu tiên. 

Thêm app vào list INSTALLED_APPS trong setting.py:

```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'users',
]
```

# Test
Chúng ta sẽ take a test trước bằng cách thêm đoạn code sau trong users/tests.py và chắc chắn rằng tests fail. 

```
from django.test import TestCase
from django.contrib.auth import get_user_model


class UsersManagersTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser('super@user.com', 'foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)
```


# Model Manager
Chúng ta cần custom Manager bởi subclassing BaseUserManager, sử dụng một email như unique identifier thay username. 

```
class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)
```

# User Model 
Lựa chọn một trong hai option sửa dụng  subclassing AbstractUser hoặc AbstractBaseUser.

**AbstractUser**
```
Update users/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
```

Ở đoạn code trên : 
1. Tạo một class có tên là CustomUser subclasses  AbstractUser
2. Remove username field 
3. Make email là trường require và unique
4. Set giá trị USERNAME_FIELD --  định nghĩa unique identifier cho User model là email.
5. Chỉ thị tất cả các objects được quản lý bởi CustomUserManager. 



**AbstractBaseUser**
Update users/models.py

```
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
```

Ở đoạn code trên : 
1. Tạo một class có tên là CustomUser subclasses  AbstractBaseUser
2. Thêm các fields email, is_staff, is_active, date_joined. 
3. Set giá trị USERNAME_FIELD --  định nghĩa unique identifier cho User model là email.
4. Chỉ thị tất cả các objects được quản lý bởi CustomUserManager. 

# Settings
Thêm vào settings.py line dưới đây để Django biết rằng sẽ sử dụng class User mới. 

`AUTH_USER_MODEL = 'users.CustomUser'`

Tiếp theo hãy thử apply migrations để tiến hành tạo database mới sử dụng custom User model. Trước khi thực hiện việc này chúng ta sẽ sử dụng --dry-run flag để xác định được sau khi migrations kết quả sẽ như thế nào, với flag này file migration vẫn chưa được tạo ra. 

`python manage.py makemigrations --dry-run --verbosity 3`

**Case customUser subclasses  AbstractUser**

```
Generated by Django 3.1.5 on 2021-01-18 22:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20210118_1326'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'verbose_name': 'user', 'verbose_name_plural': 'users'},
        ),
        migrations.AddField(
            model_name='customuser',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='last name'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='date_joined',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='is_active',
            field=models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='is_staff',
            field=models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status'),
        ),
    ]
```


**Case customUser subclasses AbstractBaseUser**
```
Generated by Django 3.1.5 on 2021-01-18 22:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
```

Xác nhận chắc chắn rằng migtations không chứa username. Tiếp theo tạo và apply migration. 
```
python manage.py makemigrations
python manage.py migrate
```

**View schema:**
```
sqlite3 db.sqlite3
sqlite> .tables


Case customUser subclasses AbstractBaseUser: 
CREATE TABLE IF NOT EXISTS "users_customuser" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "password" varchar(128) NOT NULL, "last_login" datetime NULL, "is_superuser" bool NOT NULL, "is_active" bool NOT NULL, "date_joined" datetime NOT NULL, "email" varchar(254) NOT NULL UNIQUE, "is_staff" bool NOT NULL);

Bạn có thể reference User model với get_user_model() hoặc settings.AUTH_USER_MODEL. 
Khi bạn taọ superuser lúc này hệ thống sẽ yêu cầu bạn nhập vào một email thay vì một username. 

(env)$ python manage.py createsuperuser
Email address: hiepkyou@test.com
Password:
Password (again):
Superuser created successfully
```


**Chạy lại tests**
```
System check identified no issues (0 silenced).
..
----------------------------------------------------------------------
Ran 2 tests in 0.237s

OK
Destroying test database for alias 'default'...
```

# Forms 
Subclass UserCreationForm và UserChangeForm vói CustomUser mới. Tạo mới file trong users với tên forms.py

```
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('email',)


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = ('email',)
```


# Admin 
```
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(CustomUser, CustomUserAdmin)
```

Run server, login vào admin site. Bạn có thể add user với email như thông thường. 
![](https://images.viblo.asia/32a978b0-ab07-423e-ac0a-2a02b0dba371.png)


# Conclusion
Ở bài viết này chúng ta đã biết được cách custom User model mà ở đó email được sủ dụng như primary user identifier thay vì username cho authentication.  Ngoài ra cũng còn một cách nữa được suggest nên sử dụng đó là tạo một model quan hệ 1-1 với User model của Django như Profile model chẳn hạn và sẽ add các field mới ở Profile.