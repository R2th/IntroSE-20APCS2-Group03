# What i want to do:

If there are many tables, it will be difficult to write to `admin.py`.

I want you it to be done automatically.

⇣

If we use the `admin_generator` command of the library called `django-extensions`, it can be done automatically.

It really does his  job regarding the contents of `models.py`.

# What is `django-extension`?

`django-extensions` extends the functionality of `manage.py`, and there are various other commands.

* [Document](https://django-extensions.readthedocs.io/en/latest/)

* [Repository](https://github.com/django-extensions/django-extensions)

# Install
```
$ pip install django-extensions
```

Add in to `settings.py`

* pj_name/settings.py
```
.
.
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_extensions', # <- 追記
]
.
.
```

# Execute
Overwrite the output result in `admin.py`.

$APP contains the application name created with $python `manage.py` startapp xxx.

```
$ python manage.py admin_generator ＄APP > $APP/admin.py
```

# Result
For example: 

This class:

* models.py

```
...
class Users(models.Model):
    user_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    del_flg = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users'
...
```

Will be looking like this:

* admin.py
```
...
@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user_name',
        'last_name',
        'first_name',
        'email',
        'created_at',
        'updated_at',
        'del_flg',
    )
    list_filter = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'
...
```

# Create user to login on management screen

```
$ python manage.py createsuperuser

Username (leave blank to use 'your_home_dir'): <- any name as you wish
Email address: 
Password: 
Password (again): 
Superuser created successfully.
```

Start the local server

```
$ python manage.py runserver
```

Access to this address: http://127.0.0.1:8000/admin/
![](https://images.viblo.asia/56e024ee-1307-4015-97c7-4efdc44fce8b.png)

It is OK if the login table is displayed with the user information created earlier.