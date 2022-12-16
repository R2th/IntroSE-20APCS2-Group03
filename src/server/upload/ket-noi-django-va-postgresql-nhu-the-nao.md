Ở bài viết lần này mình sẽ chia sẻ về một vấn đề không hề liên quan gì đến Machine Learning hoặc Deep Learning hay những vấn đề xoay quanh. Tuy nhiên, bên cạnh học về những kiến thức về 2 mảng mình nhắc đến ở đây thì SQL hay một Framework để tạo app cũng cực kỳ quan trọng. Vì vậy, ở trong post này mình sẽ chia sẻ về cách tạo Django Web cũng như cách kết nối với SQL - PostgreSQL. 

Bài viết gồm: 
* Install Django và PostgreSQL 
* Create User và Database với PosgreSQL
* Create project Django, Connect Django và PosgreSQL


Nào chúng ta cùng bắt đầu thôi!

# Install Django và PostgreSQL 
## Tạo môi trường
Đầu tiên mình sẽ tạo môi trường với *virtualenv *: 
- Install: 

            pip install virtualenv
 - Tạo môi trường: 
 
             virtualenv env
  - Sử dụng: 
  
            source env/bin/activate
     Khi không muốn sử dụng nữa thì mn *deactivate* nó đi là xong. 
   
  ## Install PostgreSQL
  
            $ sudo apt update
             $ sudo apt install postgresql postgresql-contrib
  ## Install Django và postgresql sử dụng trong Django
  - Django 
  
            pip install Django
   - psycopg2 
   
   pyscopg2 là package được sử dụng trong Django để sử dụng PostgreSQL database

             pip install psycopg2
 
# Create User và Database với PostgreSQL
Đầu tiên bật terminal lên đã nào :v:
```
$ sudo -u postgres
$ psql
```
* create user
`CREATE USER myprojectuser WITH PASSWORD 'mypassword';`
* create database và cấp quyền cho người dùng mới 
`CREATE DATABASE myprojectdb WITH OWNER myprojectuser;`
mọi người có thể tham khảo [ở đây](https://www.postgresql.org/docs/current/ddl-priv.html) nhé.

# Create project Django, Connect Django và PostgreSQL
Bây giờ chính là lúc chúng ta tạo một Django project rồi. Copy hoặc gõ theo lệnh dưới đây nhé, tuy nhiên bạn đừng quên dấu " . " ở phía sau nhé:

`Django-admin startproject myproject .`

Sau khi đã tạo thành công project thì chúng ta sẽ cùng kết nối Django với PostgreSQL database: 

Khi khởi tạo một project với django, django sẽ tự động tạo ra một cơ sở dữ liệu SQLite, được gọi là db.sqlite3 trong thư mục chính của project và kết nối tới app của bạn, code ở trong file setting.py:


```
DATABASES = {
'default': {
'ENGINE': ‘django.db.backends.sqlite3’,
'NAME': os.path.join(BASE_DIR, ‘db.sqlite3’),
}
}
```

Và chúng ta cần phải thay đổi để Django sử dụng PostgreSQL thay vì SQLite: 
Giá trị của ENGINE sẽ được thay đổi thành:

```
django.db.backends.postgresql_psycopg2 
```
Các trường *NAME*, *USER*, *PASSWORD* là những trường đã được mình tạo với Postgres database ở trên. *HOST* sẽ là *localhost* trong quá trình phát triển, và Postgres sẽ được chạy mặc định trên *PORT 5432*. Cụ thể như sau:

```
DATABASES = {
'default': {
'ENGINE': 'django.db.backends.postgresql_psycopg2',
'NAME': 'myproject',
'USER': 'myprojectuser',
'PASSWORD': 'mypassword',
'HOST': 'localhost',
'PORT': '5432',
}
}
```
Chúng ta sẽ vào file **setting.py** để thay đổi và nhớ lưu lại nhé ^_^: 
```
nano ~/myproject/myproject/setting.py
```

Quay trở lại với terminal, cùng ở thư mục **myproject** và run: 

```
$ python manage.py makemigrations
$ python manage.py migrate
```

Sau khi tạo xong 2 dòng lệnh này sẽ được như sau: 

![](https://images.viblo.asia/95a35f83-ce97-41fe-b5fd-87fe2ea4e165.png)

Tiếp theo chúng ta sẽ làm gì nhỉ? tất nhiên là tạo superuser để chắc chắn rằng chúng ta có thể thao tác với cơ sở dữ liệu cũng như truy cập đến [Django admin site](https://docs.djangoproject.com/en/1.11/ref/contrib/admin/)

```
python manage.py createsuperuser
```

chạy lệnh trên vào điền theo yêu cầu. Sau khi superuser được tạo, bây giờ mọi thứ đã được setup, cùng thử run Django server lên nhé.

`python manage.py runserver`


Sau khi chạy xong câu lệnh ở trên có thì chúng ta được như thế này: 


![](https://images.viblo.asia/7e34a49b-0565-444e-94e4-2f74f3067744.png)


Mở link được vẽ lại, vậy là đã tạo thành công Django Web App:


![](https://images.viblo.asia/6fcd2fda-91bb-48f7-bed1-80a1287c7d1e.png)


Thêm */admin* để chuyển hướng đến trang admin, sau đó đăng nhập theo superuser đã được tạo ở trên. 

# Kết Luận
Cảm ơn mọi người đã đọc bài viết, nếu bài viết có gì chưa đúng hay còn thiếu mong được sự góp ý của mn ạ
# Reference 
https://tecadmin.net/install-postgresql-server-on-ubuntu/
https://medium.com/agatha-codes/painless-postgresql-django-d4f03364989