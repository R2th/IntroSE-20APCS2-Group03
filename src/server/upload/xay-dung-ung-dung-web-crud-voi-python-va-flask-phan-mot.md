Chào các bạn, hôm nay mình sẽ hướng dẫn cách dựng 1 ứng dụng web quản lý nhân viên CRUD (Create, Read, Update, Delete) bằng cách sử dụng Flask, một microframework cho Python. 

## Giới thiệu
Project sẽ gồm có các tính năng sau:

1. Người dùng sẽ có thể đăng ký và đăng nhập với tư cách là nhân viên
2. Admin sẽ có thể tạo, cập nhật và xóa các phòng ban và vai trò
3. Admin sẽ có thể phân công nhân viên vào một bộ phận và phân công vai trò của họ
4. Admin sẽ có thể xem tất cả nhân viên và thông tin chi tiết của họ

Trong bài viết này mình sẽ đề cập đến phần một sẽ bao gồm:
1. Thiết lập cơ sở dữ liệu
2. Xây dựng Models
3. Khởi Tạo Migration
4. Xây dựng Homepage
5. Tạo Authentication

## Chuẩn bị
Các bạn cần chuẩn bị cài đặt các library sau:

1. [Python 2.7](https://www.python.org/download/releases/2.7/)
2. [Flask](http://flask.pocoo.org/)
3. [virtualenv](https://virtualenv.pypa.io/en/stable/) (và, tùy chọn, [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/) )

Tiếp theo, tạo thư mục như dưới đây:
```
├── dream-team
       ├── app
       │   ├── __init__.py
       │   ├── models.py
       ├── config.py
       ├── requirements.txt
       └── run.py
```
 
**Note:** Thư mục `dream-team` chứa tất cả các file dự án. Thư mục `app` là gói ứng dụng và chứa các mô-đun khác nhau nhưng chúng được liên kết với nhau trong ứng dụng. Tất cả các model con đều nằm trong file `models.py`. File `run.py` là file để run project, file `config.py` có chứa các cấu hình của project, và file `requirements.txt` chứa các package sẽ dùng trong project.

## Thiết lập cơ sở dữ liệu
Flask có hỗ trợ cho một số hệ thống quản lý cơ sở dữ liệu, bao gồm: SQLite , MySQL và PostgreSQL. Trong bài viết này mình sử dụng MySQL. Vì nó rất phổ biến, nhiều người sử dụng.

Chúng tôi sẽ cài đặt những thứ sau (nhớ kích hoạt môi trường ảo của bạn):

1. `Flask-SQLAlchemy` :  Thư viện này sẽ hỗ trợ để sử dụng SQLAlchemy, đây là một công cụ hữu ích để sử dụng SQL với Python. SQLAlchemy là một Object Relational Mapper (ORM), có nghĩa là nó kết nối các đối tượng của một project với các bảng trong database. Các đối tượng này có thể được lưu trữ trong database và được truy cập mà không cần viết SQL thuần. Điều này rất tiện lợi vì nó đơn giản hóa các câu SQL phức tạp nếu được viết bằng SQL thô. Ngoài ra, nó làm giảm nguy cơ bị tấn công SQL injection vì chúng ta không xử lý đầu vào của SQL thuần.
2. MySQL-Python : Đây là một giao diện Python cho MySQL. Nó sẽ giúp mình kết nối cơ sở dữ liệu MySQL với project.
```
$ pip install flask-sqlalchemy mysql-python
```
Sau đó, mình sẽ tạo cơ sở dữ liệu MySQL. Đảm bảo bạn đã cài đặt và chạy MySQL, sau đó đăng nhập với tư cách người dùng `root`:
```

$ mysql -u root

mysql> CREATE USER 'tienphat'@'localhost' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.00 sec)

mysql> CREATE DATABASE dreamteam_db;
Query OK, 1 row affected (0.00 sec)

mysql> GRANT ALL PRIVILEGES ON dreamteam_db . * TO 'tienphat'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```
 
Như vậy mình đã tạo 1 người dùng `tienphat` với mật khẩu `123456`, tạo một database `dreamteam_db` và gán quyền cho user tất cả các quyền database.

Tiếp theo, chỉnh sửa `config.py`. Thêm vào code sau:
```
# config.py

class Config(object):
    """
    Cấu hình chung
    """

    # Đưa các config env vào đây


class DevelopmentConfig(Config):
    """
    Cấu hình môi trường development
    """

    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProductionConfig(Config):
    """
    Cấu hình môi trường production
    """

    DEBUG = False

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
```
 
Trong file trên mình đã cấu hình 2 môi trường development và production, 
Một số biến cấu hình hữu ích là:

1. `TESTING`: Nếu = true sẽ kích hoạt chế độ test của `Flask`. Mặc định là false.
2. `DEBUG`: Nếu = true sẽ kích hoạt chế độ debug giúp developer debug những trường hợp ngoại lệ. Tuy nhiên, nó phải luôn được đặt `false` ở production. Nó mặc định là `false`.
3. `SQLALCHEMY_ECHO`: Nếu = true sẽ ghi lỗi vào log để debug.
4. 
Bạn có thể tìm thêm các biến cấu hình Flask [tại đây](http://flask.pocoo.org/docs/0.11/config/) và các biến cấu hình SQLAlchemy [tại đây](http://flask-sqlalchemy.pocoo.org/2.1/config/) .

Tiếp theo, tạo một thư mục `instance` trong thư mục root, sau đó tạo một file `config.py` bên trong. Mình sẽ đặt các biến cấu hình ở đây và để không bị thay đổi khi sang môi trường khác nhau VD: database config, aws config,....

```
# instance/config.py

SECRET_KEY = 'root'
SQLALCHEMY_DATABASE_URI = 'mysql://tienphat:12345@localhost/dreamteam_db'
 ```
 
Tiếp theo,  chỉnh sửa file `app/__init__.py`. Thêm đoạn code sau:
```
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from config import app_config

db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    db.init_app(app)

    return app
```
 
Trong đoạn code trên, mình đã thêm function `create_app` để đọc các cấu hình từ file `instance/config.py`. Mình đã tạo ra 1 object db để kết nối cơ sở dữ liệu .

Tiếp theo, chỉnh sửa file `run.py`:

```
# run.py

import os

from app import create_app

config_name = os.getenv('FLASK_CONFIG')
app = create_app(config_name)

if __name__ == '__main__':
    app.run()
```
 
Mình tạo ứng dụng bằng cách chạy function `create_app`. Do ở môi trường local nên biến môi trường`FLASK_CONFIG` nên được đặt là `developement`.

Tiếp theo hãy chạy thử project để đảm bảo code hoạt động như mong đợi. Tiếp theo, thêm một routes tạm thời vào file `app/__init__.py` như sau:
```
# app/__init__.py

# existing code remains

def create_app(config_name):
    # existing code remains

    # temporary route
    @app.route('/')
    def hello_world():
        return 'Hello, World!'

    return app
```
 
Đảm bảo đặt các biến môi trường `FLASK_CONFIG` và `FLASK_APP` trước khi run project:
```

$ export FLASK_CONFIG=development
$ export FLASK_APP=run.py
$ flask run
 * Serving Flask app "run"
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```


Chúng ta có thể thấy chuỗi "Hello, World" mà chúng ta đặt trong `routes`. Project hiện tại đã chạy tốt.

## Xây dựng Models
Tiếp theo, mình sẽ làm việc đến `models`. Mỗi `models` sẽ đại diện cho 1 bảng trong database, mình sẽ tạo 3 `models`:  `Employee`, `Department`, và `Role`.

Nhưng trước tiên, hãy cài đặt package `Flask-Login` , nó sẽ giúp mình quản lý user và xử lý việc đăng nhập, đăng xuất và quản lý phiên người dùng. 
```

$ pip install flask-login
```
 
Để sử dụng `Flask-Login`, mình cần tạo một object `LoginManager` và khởi tạo nó trong file `app/__init__.py`. Trước tiên, mình sẽ xóa routes mà vừa thêm trước đó, sau đó thêm `routes` sau:
```

# app/__init__.py

from flask_login import LoginManager

# sau khi khởi tạo biến db
login_manager = LoginManager()


def create_app(config_name):
    # existing code remains

    login_manager.init_app(app)
    login_manager.login_message = "Bạn phải đăng nhập để truy cập vào trang này."
    login_manager.login_view = "auth.login"

    return app
```
 
Ngoài việc khởi tạo đối tượng LoginManager, mình cũng đã thêm một param `login_view` và `login_message` vào nó. Bằng cách này, nếu người dùng cố gắng truy cập một trang mà họ không được phép, nó sẽ chuyển hướng đến chế độ xem được chỉ định và hiển thị thông báo được chỉ định. Mình chưa tạo chế độ xem `auth.login`, nhưng mình sẽ thực hiện khi xác thực.

Tiếp theo mình sẽ thêm code sau vào file `app/models.py`:
```

# app/models.py

from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from app import db, login_manager


class Employee(UserMixin, db.Model):
    """
    Create an Employee table
    """

    # Ensures table will be named in plural and not in singular
    # as is the name of the model
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(60), index=True, unique=True)
    username = db.Column(db.String(60), index=True, unique=True)
    first_name = db.Column(db.String(60), index=True)
    last_name = db.Column(db.String(60), index=True)
    password_hash = db.Column(db.String(128))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    is_admin = db.Column(db.Boolean, default=False)

    @property
    def password(self):
        """
        Prevent pasword from being accessed
        """
        raise AttributeError('password is not a readable attribute.')

    @password.setter
    def password(self, password):
        """
        Set password to a hashed password
        """
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        """
        Check if hashed password matches actual password
        """
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<Employee: {}>'.format(self.username)

# Set up user_loader
@login_manager.user_loader
def load_user(user_id):
    return Employee.query.get(int(user_id))


class Department(db.Model):
    """
    Create a Department table
    """

    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=True)
    description = db.Column(db.String(200))
    employees = db.relationship('Employee', backref='department',
                                lazy='dynamic')

    def __repr__(self):
        return '<Department: {}>'.format(self.name)


class Role(db.Model):
    """
    Create a Role table
    """

    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=True)
    description = db.Column(db.String(200))
    employees = db.relationship('Employee', backref='role',
                                lazy='dynamic')

    def __repr__(self):
        return '<Role: {}>'.format(self.name)
 ```

Trong modele `Employee`, mình sử dụng function `generate_password_hash` để băm mật khẩu và `check_password_hash` cho phép mình đảm bảo mật khẩu được băm khớp với mật khẩu. Mình cũng có thêm hai trường khóa ngoại `department_id` và `role_id`, trường này đề cập đến ID của bộ phận và vai trò được giao cho nhân viên.

**Lưu ý:** Mình có một trường `is_admin` được đặt thành `false` theo mặc định. Mình sẽ câp nhật lại giá trị khi tạo người dùng quản trị. Ngay sau model `Employee`, mình có một lệnh gọi lại `user_loader` , mà `Flask-Login` sử dụng để load lại đối tượng người dùng từ ID người dùng được lưu trữ trong phiên đăng nhập.

- Các model `Department` và `Role` khá giống nhau. Cả hai đều có trường `name` và `description`. 
- Ngoài ra, cả hai đều có mối quan hệ một-nhiều với mô hình `Employee` (một bộ phận hoặc vai trò có thể có nhiều nhân viên). Mình xác định điều này trong cả hai mô hình bằng cách sử dụng trường `employees`. 
- `backref` cho phép mình tạo một thuộc tính mới trên model `Employee` để mình có thể sử dụng `employee.department` hoặc `employee.role` để giao bộ phận hoặc vai trò cho nhân viên đó. 
- `lazy` xác định cách dữ liệu sẽ được load từ database; trong trường hợp này, nó sẽ được load động, lý tưởng để quản lý các bộ sưu tập lớn.

## Khởi Tạo Migration
Migration cho phép mình quản lý các thay đổi mà mình thực hiện đối với các model và những thay đổi này trong database. Ví dụ: nếu sau này mình thực hiện thay đổi đối với một trường trong một trong các model, tất cả những gì mình cần làm là tạo và áp dụng một migration và database sẽ phản ánh thay đổi đó.

Mình sẽ bắt đầu bằng cách cài đặt `Flask-Migrate`, sẽ xử lý việc migration database bằng cách sử dụng `Alembic`, một công cụ migration databse nhẹ. `Alembic` tạo ra các câu lệnh `ALTER` tới databse do đó thực hiện các thay đổi được thực hiện đối với các model. Nó cũng tự động tạo các lệnh migration tối giản.
```
$ pip install flask-migrate
 
```
Mình sẽ cần chỉnh sửa file `app/__init__.py`:
```
# app/__init__.py

# after existing third-party imports
from flask_migrate import Migrate

# existing code remains


def create_app(config_name):
    # existing code remains

    migrate = Migrate(app, db)

    from app import models

    return app
```

Mình đã tạo một object `migrate`, nó cho phép mình chạy migration bằng `Flask-Migrate`. Mình cũng đã nhập các `models` từ package `app`. Tiếp theo, mình sẽ chạy lệnh sau để tạo một nơi lưu trữ migration:
```

$ flask db init
```
 
Sau khi chạy lệnh trên, sẽ tạo ra một thư mục `migrations` trong thư mục root:
```

└── migrations
    ├── README
    ├── alembic.ini
    ├── env.py
    ├── script.py.mako
    └── versions
```
 
Tiếp theo, mình sẽ tạo lần migration đầu tiên:
```

$ flask db migrate
```
 
Cuối cùng, mình sẽ áp dụng việc migration:
```

$ flask db upgrade
```
 
Như vậy đã tạo thành công các bảng dựa trên các models mình đã viết!
```

$ mysql -u root

mysql> use dreamteam_db;

mysql> show tables;
+------------------------+
| Tables_in_dreamteam_db |
+------------------------+
| alembic_version        |
| departments            |
| employees              |
| roles                  |
+------------------------+
4 rows in set (0.00 sec)
 
```
## Blueprints
Blueprints rất tuyệt vời để tổ chức một ứng dụng `flask` thành các thành phần, mỗi thành phần có các dạng `views` và `forms` riêng. Mình thấy rằng `Blueprints` tạo ra một cấu trúc project gọn gàng và có tổ chức hơn vì mỗi `blueprint` là một thành phần riêng biệt giải quyết một chức năng cụ thể của ứng dụng. Mỗi `Blueprints` thậm chí có thể có tiền tố URL cắt hoặc tên miền phụ của riêng nó. `Blueprints` đặc biệt thuận tiện cho các ứng dụng lớn.

Mình sẽ có 3 `blueprints` trong project này:

1. Trang chủ - giao diện trang chủ và trang tổng quan
2. Quản trị viên - tất cả các `forms` và `views` của admin (department và role)
3. Auth - tất cả các `forms` và `authentication` (registration and login)
Tạo các file và thư mục có liên quan để cấu trúc thư mục giống như sau:
```

└── dream-team
    ├── app
    │   ├── __init__.py
    │   ├── admin
    │   │   ├── __init__.py
    │   │   ├── forms.py
    │   │   └── views.py
    │   ├── auth
    │   │   ├── __init__.py
    │   │   ├── forms.py
    │   │   └── views.py
    │   ├── home
    │   │   ├── __init__.py
    │   │   └── views.py
    │   ├── models.py
    │   ├── static
    │   └── templates
    ├── config.py
    ├── instance
    │   └── config.py
    ├── migrations
    │   ├── README
    │   ├── alembic.ini
    │   ├── env.py
    │   ├── script.py.mako
    │   └── versions
    │       └── a1a1d8b30202_.py
    ├── requirements.txt
    └── run.py
```
 
Mình đã chọn không có `static` và thư mục `templates` cho mỗi bản thiết kế, vì tất cả các template project sẽ kế thừa từ cùng một template cơ sở và sử dụng cùng một tệp CSS. Thay vào đó, thư mục templates sẽ có các thư mục con cho mỗi `Blueprints` để các mẫu `Blueprints` có thể được nhóm lại với nhau.

Trong mỗi file `__init__.py` của `Blueprints` , mình cần tạo một object `Blueprints` và khởi tạo nó bằng một cái tên. Mình cũng cần import các `views`.
```

# app/admin/__init__.py

from flask import Blueprint

admin = Blueprint('admin', __name__)

from . import views
 
```
```
# app/auth/__init__.py

from flask import Blueprint

auth = Blueprint('auth', __name__)

from . import views
 
```
```
# app/home/__init__.py

from flask import Blueprint

home = Blueprint('home', __name__)

from . import views
```
 
Sau đó, mình có thể đăng ký các `Blueprints` trên project trong file `app/__init__.py`, như sau:

```
# app/__init__.py

# existing code remains


def create_app(config_name):
    # existing code remains

    from app import models

    from .admin import admin as admin_blueprint
    app.register_blueprint(admin_blueprint, url_prefix='/admin')

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .home import home as home_blueprint
    app.register_blueprint(home_blueprint)

    return app
 
```
Mình đã nhập từng object blueprint và đăng ký nó. Đối với `blueprint` admin, mình đã thêm tiền tố `url/admin`. Như vậy, tất cả các `views` cho `blueprint` này sẽ được truy cập trong trình duyệt với tiền tố url admin.

## Home Blueprint
Tiếp theo chúng ta sẽ xây dựng trang home.
```

# app/home/views.py

from flask import render_template
from flask_login import login_required

from . import home


@home.route('/')
def homepage():
    """
    Render the homepage template on the / route
    """
    return render_template('home/index.html', title="Welcome")


@home.route('/dashboard')
@login_required
def dashboard():
    """
    Render the dashboard template on the /dashboard route
    """
    return render_template('home/dashboard.html', title="Dashboard")
```
 
Mỗi function view có một trình design, `home.route` có một routes URL làm tham số (hãy nhớ rằng đó home là tên của `blueprint` như được chỉ định trong file `app/home/__init__.py`). Mỗi `views` xử lý các request đến URL được chỉ định.

Homepage chính là frontend, dashboard là backend (Nơi admin làm việc). Để vào được dashboard, người dùng phải đăng nhập.

Bây giờ để làm việc trên base template, mà tất cả các views khác sẽ kế thừa từ đó. Tạo một file `base.html` trong thư mục `app/templates` và thêm code sau:
```

<!-- app/templates/base.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <title>{{ title }} | Project Dream Team</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="{{ url_for('static', filename='css/style.css') }}" rel="stylesheet">
    <link rel="shortcut icon" href="{{ url_for('static', filename='img/favicon.ico') }}">
</head>
<body>
    <nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        <div class="container topnav">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand topnav" href="{{ url_for('home.homepage') }}">Project Dream Team</a>
          </div>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav navbar-right">
                  <li><a href="{{ url_for('home.homepage') }}">Home</a></li>
                  <li><a href="#">Register</a></li>
                  <li><a href="#">Login</a></li>
              </ul>
          </div>
        </div>
    </nav>
    <div class="wrapper">
      {% block body %}
      {% endblock %}
      <div class="push"></div>
    </div>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="list-inline">
                        <li><a href="{{ url_for('home.homepage') }}">Home</a></li>
                        <li class="footer-menu-divider">⋅</li>
                        <li><a href="#">Register</a></li>
                        <li class="footer-menu-divider">⋅</li>
                        <li><a href="#">Login</a></li>
                    </ul>
                    <p class="copyright text-muted small">Copyright © 2016. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
```
 
Lưu ý: Các link bên trên mình mới để #, mình sẽ cập nhật lại sau khi có routes.
Tiếp theo, tạo một thư mục `home` bên trong thư mục `app/templates`. Và thêm template home index.html vào bên trong đó:
```

<!-- app/templates/home/index.html -->

{% extends "base.html" %}
{% block title %}Home{% endblock %}
{% block body %}
<div class="intro-header">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="intro-message">
                    <h1>Project Dream Team</h1>
                    <h3>The best company in the world!</h3>
                    <hr class="intro-divider">
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}
```
 
Bên trong thư mục `static`, thêm `css` và các thư mục `img`. Thêm file CSS sau `style.css`, vào thư mục `static/css`:
```

/* app/static/css/style.css */

body, html {
    width: 100%;
    height: 100%;
}

body, h1, h2, h3 {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 700;
}

a, .navbar-default .navbar-brand, .navbar-default .navbar-nav>li>a {
  color: #aec251;
}

a:hover, .navbar-default .navbar-brand:hover, .navbar-default .navbar-nav>li>a:hover {
  color: #687430;
}

footer {
    padding: 50px 0;
    background-color: #f8f8f8;
}

p.copyright {
    margin: 15px 0 0;
}

.alert-info {
    width: 50%;
    margin: auto;
    color: #687430;
    background-color: #e6ecca;
    border-color: #aec251;
}

.btn-default {
    border-color: #aec251;
    color: #aec251;
}

.btn-default:hover {
    background-color: #aec251;
}

.center {
    margin: auto;
    width: 50%;
    padding: 10px;
}

.content-section {
    padding: 50px 0;
    border-top: 1px solid #e7e7e7;
}

.footer, .push {
  clear: both;
  height: 4em;
}

.intro-divider {
    width: 400px;
    border-top: 1px solid #f8f8f8;
    border-bottom: 1px solid rgba(0,0,0,0.2);
}

.intro-header {
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: center;
    color: #f8f8f8;
    background: url(../img/intro-bg.jpg) no-repeat center center; //Insert image to project
    background-size: cover;
    height: 100%;
}

.intro-message {
    position: relative;
    padding-top: 20%;
    padding-bottom: 20%;
}

.intro-message > h1 {
    margin: 0;
    text-shadow: 2px 2px 3px rgba(0,0,0,0.6);
    font-size: 5em;
}

.intro-message > h3 {
    text-shadow: 2px 2px 3px rgba(0,0,0,0.6);
}

.lead {
    font-size: 18px;
    font-weight: 400;
}

.topnav {
    font-size: 14px;
}

.wrapper {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  margin: 0 auto -4em;
}
```
 
Run project; Và truy cập vào browser để xem trang chủ.

## Auth Blueprint
Đối với `auth` blueprint, mình sẽ bắt đầu bằng cách tạo các `forms` đăng ký và đăng nhập. Mình sẽ sử dụng `Flask-WTF`, cho phép mình tạo các biểu mẫu an toàn (vì có bảo vệ CSRF và hỗ trợ reCAPTCHA).
```

pip install Flask-WTF
```
 
Bây giờ để viết code cho các `forms`:

```
# app/auth/forms.py

from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField, ValidationError
from wtforms.validators import DataRequired, Email, EqualTo

from ..models import Employee


class RegistrationForm(FlaskForm):
    """
    Form for users to create new account
    """
    email = StringField('Email', validators=[DataRequired(), Email()])
    username = StringField('Username', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    password = PasswordField('Password', validators=[
                                        DataRequired(),
                                        EqualTo('confirm_password')
                                        ])
    confirm_password = PasswordField('Confirm Password')
    submit = SubmitField('Register')

    def validate_email(self, field):
        if Employee.query.filter_by(email=field.data).first():
            raise ValidationError('Email is already in use.')

    def validate_username(self, field):
        if Employee.query.filter_by(username=field.data).first():
            raise ValidationError('Username is already in use.')


class LoginForm(FlaskForm):
    """
    Form for users to login
    """
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
```
 
`Flask-WTF` có một số trình validators giúp việc viết `forms` trở nên dễ dàng hơn nhiều. Tất cả các trường trong các models đều có `DataRequired` validator.

Đối với `forms` đăng ký, mình yêu cầu người dùng điền địa chỉ email, tên người dùng, tên, họ và mật khẩu hai lần. 
- Sử dụng validator `Email` để đảm bảo các định dạng email hợp lệ.
- Sử dụng validator `Equal` để xác nhận rằng các trường `password` và `confirm_password` `RegistrationForm` match. 
- Tạo ra các phương pháp ( `validate_email` và `validate_username`) để đảm bảo rằng email và tên người dùng đã nhập chưa được sử dụng trước đây.

Với các `forms` đã có, mình có thể viết các dạng `views`:
```

# app/auth/views.py

from flask import flash, redirect, render_template, url_for
from flask_login import login_required, login_user, logout_user

from . import auth
from forms import LoginForm, RegistrationForm
from .. import db
from ..models import Employee


@auth.route('/register', methods=['GET', 'POST'])
def register():
    """
    Handle requests to the /register route
    Add an employee to the database through the registration form
    """
    form = RegistrationForm()
    if form.validate_on_submit():
        employee = Employee(email=form.email.data,
                            username=form.username.data,
                            first_name=form.first_name.data,
                            last_name=form.last_name.data,
                            password=form.password.data)

        # add employee to the database
        db.session.add(employee)
        db.session.commit()
        flash('You have successfully registered! You may now login.')

        # redirect to the login page
        return redirect(url_for('auth.login'))

    # load registration template
    return render_template('auth/register.html', form=form, title='Register')


@auth.route('/login', methods=['GET', 'POST'])
def login():
    """
    Handle requests to the /login route
    Log an employee in through the login form
    """
    form = LoginForm()
    if form.validate_on_submit():

        # check whether employee exists in the database and whether
        # the password entered matches the password in the database
        employee = Employee.query.filter_by(email=form.email.data).first()
        if employee is not None and employee.verify_password(
                form.password.data):
            # log employee in
            login_user(employee)

            # redirect to the dashboard page after login
            return redirect(url_for('home.dashboard'))

        # when login details are incorrect
        else:
            flash('Invalid email or password.')

    # load login template
    return render_template('auth/login.html', form=form, title='Login')


@auth.route('/logout')
@login_required
def logout():
    """
    Handle requests to the /logout route
    Log an employee out through the logout link
    """
    logout_user()
    flash('You have successfully been logged out.')

    # redirect to the login page
    return redirect(url_for('auth.login'))
```

Lưu ý việc sử dụng function flash, cho phép mình sử dụng tính năng flash thông báo của Flask để thông báo cho người dùng về lỗi nhập form.

Cuối cùng, làm việc với các forms. Đầu tiên, mình sẽ cài đặt `Flask-Bootstrap` để có thể sử dụng các thư viện `wtf` và `utils` . 
- Thư viện `wtf` dùng để tạo ra các function trong các template dựa trên các function trong file `forms.py`. 
- Thư viện `utils` dùng để hiển thị các thông điệp flash backend trả về cho người dùng.

```
pip install flask-bootstrap
```
 
Mình cần chỉnh sửa file `app/__init__.py` sử dụng `Flask-Bootstrap`:

```
# app/__init__.py

# after existing third-party imports
from flask_bootstrap import Bootstrap

# existing code remains
def create_app(config_name):
    # existing code remains
    Bootstrap(app)

    from app import models

    # blueprint registration remains here
    return app
```
 
Mình đã sửa khá nhiều file `app/__init__.py`. Đây là nội dung cuối cùng:
```

# app/__init__.py

# third-party imports
from flask import Flask
from flask_bootstrap import Bootstrap
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# local imports
from config import app_config

db = SQLAlchemy()
login_manager = LoginManager()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')

    Bootstrap(app)
    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_message = "You must be logged in to access this page."
    login_manager.login_view = "auth.login"
    migrate = Migrate(app, db)

    from app import models

    from .admin import admin as admin_blueprint
    app.register_blueprint(admin_blueprint, url_prefix='/admin')

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .home import home as home_blueprint
    app.register_blueprint(home_blueprint)

    return app
```
 
Mình cần hai mẫu cho `auth` blueprint: `register.html` và `login.html`, mình sẽ tạo trong một thư mục `auth` bên trong thư mục `templates`.
```

<!-- app/templates/auth/register.html -->

{% import "bootstrap/wtf.html" as wtf %}
{% extends "base.html" %}
{% block title %}Register{% endblock %}
{% block body %}
<div class="content-section">
  <div class="center">
    <h1>Register for an account</h1>
    <br/>
    {{ wtf.quick_form(form) }}
  </div>
</div>
{% endblock %}
 
<!-- app/templates/auth/login.html -->

{% import "bootstrap/utils.html" as utils %}
{% import "bootstrap/wtf.html" as wtf %}
{% extends "base.html" %}
{% block title %}Login{% endblock %}
{% block body %}
<div class="content-section">
  <br/>
  {{ utils.flashed_messages() }}
  <br/>
  <div class="center">
    <h1>Login to your account</h1>
    <br/>
    {{ wtf.quick_form(form) }}
  </div>
</div>
{% endblock %}
```
 
Các `forms` được load từ file `app/auth/views.py`. Bây giờ mình sẽ cập nhật lại các links ở template base để có thể truy cập các trang từ menu:
```

<!-- app/templates/base.html -->

<!-- Modify nav bar menu -->
<ul class="nav navbar-nav navbar-right">
    <li><a href="{{ url_for('home.homepage') }}">Home</a></li>
    <li><a href="{{ url_for('auth.register') }}">Register</a></li>
    <li><a href="{{ url_for('auth.login') }}">Login</a></li>
</ul>

<!-- Modify footer menu -->
<ul class="list-inline">
    <li><a href="{{ url_for('home.homepage') }}">Home</a></li>
    <li class="footer-menu-divider">⋅</li>
    <li><a href="{{ url_for('auth.register') }}">Register</a></li>
    <li class="footer-menu-divider">⋅</li>
    <li><a href="{{ url_for('auth.login') }}">Login</a></li>
</ul>
```
 
Chạy lại project và click vào linnks menu Đăng ký và Đăng nhập. Bạn sẽ thấy các template được load với `forms` thích hợp.

Điền thông tin vào form đăng ký để đăng ký một nhân viên mới. Sau khi đăng ký, sẽ được chuyển hướng đến trang đăng nhập, ở đây sẽ có thông báo flash success mà mình đã config trong file `app/auth/views.py`.

Đăng nhập sẽ thành công; tuy nhiên chưa có template dashboad.html. Giờ mình sẽ thêm nó:
```

<!-- app/templates/home/dashboard.html -->

{% extends "base.html" %}
{% block title %}Dashboard{% endblock %}
{% block body %}
<div class="intro-header">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="intro-message">
                    <h1>The Dashboard</h1>
                    <h3>We made it here!</h3>
                    <hr class="intro-divider">
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}
```
 
Refresh trang. Bạn sẽ nhận thấy rằng menu điều hướng vẫn có links đăng ký và đăng nhập, mặc dù mình đã đăng nhập. 
Mình sẽ cần sửa đổi nó để hiển thị links đăng xuất khi người dùng đã được đăng nhập. Mình cũng sẽ thêm lời chào `Hi, username!` trong thanh điều hướng:
```

<!-- app/templates/base.html -->

<!-- In the head tag, include link to Font Awesome CSS so we can use icons -->
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

<!-- Modify nav bar menu -->
<ul class="nav navbar-nav navbar-right">
    {% if current_user.is_authenticated %}
      <li><a href="{{ url_for('home.dashboard') }}">Dashboard</a></li>
      <li><a href="{{ url_for('auth.logout') }}">Logout</a></li>
      <li><a><i class="fa fa-user"></i>  Hi, {{ current_user.username }}!</a></li>
    {% else %}
      <li><a href="{{ url_for('home.homepage') }}">Home</a></li>
      <li><a href="{{ url_for('auth.register') }}">Register</a></li>
      <li><a href="{{ url_for('auth.login') }}">Login</a></li>
    {% endif %}
</ul>

<!-- Modify footer menu -->
<ul class="list-inline">
    <li><a href="{{ url_for('home.homepage') }}">Home</a></li>
    <li class="footer-menu-divider">⋅</li>
    {% if current_user.is_authenticated %}
      <li><a href="{{ url_for('auth.logout') }}">Logout</a></li>
    {% else %}
      <li><a href="{{ url_for('auth.register') }}">Register</a></li>
      <li class="footer-menu-divider">⋅</li>
      <li><a href="{{ url_for('auth.login') }}">Login</a></li>
    {% endif %}
</ul>
```
 
Lưu ý cách mình sử dụng các câu lệnh if-else trong các template. Ngoài ra, hãy lưu ý đến current_user proxy được cung cấp bởi `Flask-Login`, cho phép mình kiểm tra xem người dùng có được đăng nhập hay chưa và lấy tên người dùng của người dùng.

Nếu bạn cố gắng truy cập trang dashboard mà không đăng nhập sẽ tự động chuyển hưởng đến trang đăng nhập và thông báo ra màn hình. Bạn có thể sửa ở trong file `app/__init__.py`:

Lưu ý rằng URL được định cấu hình sao cho khi bạn đăng nhập, bạn sẽ được chuyển hướng đến trang mà bạn đã cố gắng truy cập ban đầu.

## Kết luận
Như vậy đã xong phần một, khá là dài đúng ko nào? :D 
Bài viết sau mình sẽ hướng dẫn tiếp về phần CRUD của project, cho phép admin Create, List, Update, Delete các Department và Role cho nhân viên.

Cảm ơn mọi người đã xem bài viết của mình. Hẹn mọi người vào bài viết tiếp theo.

### Tài liệu tham khảo
[Build a CRUD Web App With Python and Flask - Part One](https://www.digitalocean.com/community/tutorials/build-a-crud-web-app-with-python-and-flask-part-one)