# Introduction

Với tư tưởng phát triển ứng dụng một cách đơn giản nhất có thể, Flask chỉ cung cấp những thứ cơ bản nhất cho một ứng dụng web. Và migration data không phải là một tính năng được cung cấp sẵn của Flask. Với Django, phải tới Django 1.7 mới cung cấp cơ chế  auto migration. Vậy nên chúng ta cũng có hi vọng một tương lại gần Flask sẽ hỗ trợ auto migration.
:D

Vậy để migation với Flask bạn sẽ có 2 giải pháp:
- Manual Migration data by SQL
- Auto Migration data by extension

Tất nhiên, databases ở đây mình nói tới là SQL. Việc manual migrations mình sẽ không đề cập trọng bài viết này. 

Giải pháp auto migration bằng extension thì mình sẽ chọn: [`flask-Migrate`](https://flask-migrate.readthedocs.io/en/latest/).
![](https://images.viblo.asia/b5deb2ab-0159-49a3-ba4a-ebbcc02d54af.png)

# Todo

Bài toán đơn giản là tạo một bảng models và migrations nó khi có thay đổi.

## Installation

Mình sẽ sử dụng một vài extension kết hợp cùng `flask-Migrate` bào gồm:
- Flask
- Flask SQLAlchemy
- Flask Migrate

Database sử dụng là `SQLite`.

## Install environment

Ta thực hiện những câu lệnh dưới đây để tạo project vào install python dependencies:

```bash
% mkdir flask-demo-migration
% cd flask-demo-migration                                    
% virtualenv venv -p python3 
Running virtualenv with interpreter /home/haminh/.pyenv/shims/python3
Using base prefix '/home/haminh/.pyenv/versions/3.6.8'
New python executable in /home/haminh/PycharmProjects/flask-demo-migration/venv/bin/python3
Also creating executable in /home/haminh/PycharmProjects/flask-demo-migration/venv/bin/python
Installing setuptools, pkg_resources, pip, wheel...done.
% source venv/bin/activate
(venv) % pip install flask flask-sqlalchemy flask-migrate                       
Collecting flask    
  Using cached https://files.pythonhosted.org/packages/7f/e7/08578774ed4536d3242b14dacb4696386634607af824ea997202cd0edb4b/Flask-1.0.2-py2.py3-none-any.whl
Collecting flask-sqlalchemy             
  Using cached https://files.pythonhosted.org/packages/a1/44/294fb7f6bf49cc7224417cd0637018db9fee0729b4fe166e43e2bbb1f1c8/Flask_SQLAlchemy-2.3.2-py2.py3-none-any.whl
Collecting flask-migrate                
  Using cached https://files.pythonhosted.org/packages/93/f4/aca055d4f4cabb8e6aedf258dfe58100c264bfdf1d236ee821239e9d2b42/Flask_Migrate-2.3.1-py2.py3-none-any.whl
Collecting Werkzeug>=0.14 (from flask)  
  Using cached https://files.pythonhosted.org/packages/20/c4/12e3e56473e52375aa29c4764e70d1b8f3efa6682bef8d0aae04fe335243/Werkzeug-0.14.1-py2.py3-none-any.whl
Collecting Jinja2>=2.10 (from flask)    
  Using cached https://files.pythonhosted.org/packages/7f/ff/ae64bacdfc95f27a016a7bed8e8686763ba4d277a78ca76f32659220a731/Jinja2-2.10-py2.py3-none-any.whl
Collecting itsdangerous>=0.24 (from flask)                                      
  Using cached https://files.pythonhosted.org/packages/76/ae/44b03b253d6fade317f32c24d100b3b35c2239807046a4c953c7b89fa49e/itsdangerous-1.1.0-py2.py3-none-any.whl
Collecting click>=5.1 (from flask)      
  Using cached https://files.pythonhosted.org/packages/fa/37/45185cb5abbc30d7257104c434fe0b07e5a195a6847506c074527aa599ec/Click-7.0-py2.py3-none-any.whl
Collecting SQLAlchemy>=0.8.0 (from flask-sqlalchemy)                            
  Downloading https://files.pythonhosted.org/packages/05/d2/17fb194f4ae83577258ea1d81da3d5d5643f4957fa14fd0261d78d648bf5/SQLAlchemy-1.2.16.tar.gz (5.7MB)
    100% |████████████████████████████████| 5.7MB 249kB/s                                      
Collecting alembic>=0.7 (from flask-migrate)   
Collecting MarkupSafe>=0.23 (from Jinja2>=2.10->flask)                                         
  Using cached https://files.pythonhosted.org/packages/08/04/f2191b50fb7f0712f03f064b71d8b4605190f2178ba02e975a87f7b89a0d/MarkupSafe-1.1.0-cp36-cp36m-manylinux1_x86_64.whl                   Collecting Mako (from alembic>=0.7->flask-migrate)                                             
Collecting python-dateutil (from alembic>=0.7->flask-migrate)                                  
  Using cached https://files.pythonhosted.org/packages/74/68/d87d9b36af36f44254a8d512cbfc48369103a3b9e474be9bdfe536abfc45/python_dateutil-2.7.5-py2.py3-none-any.whl                          Collecting python-editor>=0.3 (from alembic>=0.7->flask-migrate)                               
Collecting six>=1.5 (from python-dateutil->alembic>=0.7->flask-migrate)                        
  Using cached https://files.pythonhosted.org/packages/73/fb/00a976f728d0d1fecfe898238ce23f502a721c0ac0ecfedb80e0d88c64e9/six-1.12.0-py2.py3-none-any.whl                                     Building wheels for collected packages: SQLAlchemy                                             
  Running setup.py bdist_wheel for SQLAlchemy ... done                                         
  Stored in directory: /home/haminh/.cache/pip/wheels/71/b5/67/1b1ae0279de6e79ee0d0a4061cdfa0604908e6052046671480                                                                             Successfully built SQLAlchemy  
Installing collected packages: Werkzeug, MarkupSafe, Jinja2, itsdangerous, click, flask, SQLAlchemy, flask-sqlalchemy, Mako, six, python-dateutil, python-editor, alembic, flask-migrate      Successfully installed Jinja2-2.10 Mako-1.0.7 MarkupSafe-1.1.0 SQLAlchemy-1.2.16 Werkzeug-0.14.1 alembic-1.0.5 click-7.0 flask-1.0.2 flask-migrate-2.3.1 flask-sqlalchemy-2.3.2 itsdangerous-1.1.0 python-dateutil-2.7.5 python-editor-1.0.3 six-1.12.0 
```

## Create app

Khỏi tạo Flask app: `app.py`

```py
# app.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World!'

if __name__ == '__main__':
   app.run()
```

Xong bước `'Hello World!'`. Tiếp theo, ta sẽ cấu hình database và tạo ra một model. Mình sẽ ghi luôn vào trong `app.py`. Tất nhiên vì là tutorial mình sẽ để đó, còn khi chạy vào dự án thực thì câu chuyện tất nhiên nó sẽ khác :D.

```py
# app.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# config database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# config migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))


@app.route('/')
def index():
    return 'Hello World'

if __name__ == '__main__':
   app.run()
```
Ta cấu hình SQLite, SQLAlchemy và Flask bằng lệnh sau:

```py
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
```
Nếu bạn dùng MySQL thì nó sẽ như thế này:
```py
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@1host:port/dbname'
```

Tiếp theo là init Migrate:

```py
db = SQLAlchemy(app)
migrate = Migrate(app, db)
```

Cuối cùng là ta tạo một model `Product` với 2 filed: `id` và `name`

## Migration
Trước hết bạn nên sử dụng Flask CLI đêt thực hiện các câu lệnh migrate data:
http://flask.pocoo.org/docs/1.0/cli/

Dưới đây là câu lệnh export và runserver:

```bash
(venv) % export FLASK_APP=app.py
 * Serving Flask app "app.py"
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
/home/haminh/PycharmProjects/flask-demo-migration/venv/lib/python3.6/site-packages/flask_sqlalchemy/__init__.py:794: FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.
  'SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and '
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
Ok. Tiếp theo ta sẽ add thêm một `migrations` folder vào project. Dolder này chứa những thông tin về migrations. Ta sẽ chạy lệnh sau để tạo ra folder này:

```sh
(venv) % flask db init                                                                                                                                 ~/PycharmProjects/flask-demo-migration
/home/haminh/PycharmProjects/flask-demo-migration/venv/lib/python3.6/site-packages/flask_sqlalchemy/__init__.py:794: FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.
  'SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and '
  Creating directory /home/haminh/PycharmProjects/flask-demo-migration/migrations ... done
  Creating directory /home/haminh/PycharmProjects/flask-demo-migration/migrations/versions ... done
  Generating /home/haminh/PycharmProjects/flask-demo-migration/migrations/env.py ... done
  Generating /home/haminh/PycharmProjects/flask-demo-migration/migrations/alembic.ini ... done
  Generating /home/haminh/PycharmProjects/flask-demo-migration/migrations/README ... done
  Generating /home/haminh/PycharmProjects/flask-demo-migration/migrations/script.py.mako ... done
  Please edit configuration/connection/logging settings in '/home/haminh/PycharmProjects/flask-demo-migration/migrations/alembic.ini' before proceeding.

```
Và ta có kết quả
```sh
(venv) % ls
app.py  migrations venv
(venv) % cd migrations
.
├── alembic.ini
├── env.py
├── README
├── script.py.mako
└── versions

1 directory, 4 files

```
Tiếp theo, ta có thể  generate initial migration:

```sh
(venv) % flask db migrate                                                                 
/home/haminh/PycharmProjects/flask-demo-migration/venv/lib/python3.6/site-packages/flask_sqlalchemy/__init__.py:794: FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.
  'SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and '
INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.autogenerate.compare] Detected added table 'product'
  Generating /home/haminh/PycharmProjects/flask-demo-migration/migrations/versions/ba28f27f9cab_.py ... done
```

Sau khi chạy xong lệnh `migrate` này ta sẽ thấy một file mới sinh ra trong folder version:
```py
"""empty message

Revision ID: ba28f27f9cab
Revises: 
Create Date: 2019-01-12 21:40:56.486427

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ba28f27f9cab'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('product')
    # ### end Alembic commands ###

```

Đọc file này ta sẽ thấy có 2 options:
- `upgrade`: ta sẽ tạo bảng `product` blabla....
- `downgrade`: ra sẽ xóa bảng `product`

Ta sẽ tạo bảng:
```sh
/home/haminh/PycharmProjects/flask-demo-migration/venv/lib/python3.6/site-packages/flask_sqlalchemy/__init__.py:794: FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.                                                                                      
  'SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and '                              
INFO  [alembic.runtime.migration] Context impl SQLiteImpl.                                     
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.                           
INFO  [alembic.runtime.migration] Running upgrade  -> ba28f27f9cab, empty message 

```

Sau lệnh này: ta sẽ thấy trong db sẽ sinh ra 3 bảng:
![](https://images.viblo.asia/ada61f30-ca13-4011-819a-8e7b02f2a5c0.png)
- `product` là bảng do ta tạo ra.
- `alembic_version` là bảng chứa thông tin version migration này
- `sqlite_master` là bảng chứa thông tin về tên bảng, sql, ... có trong db sqlite.

Tiếp theo ta sẽ tạo ra 2 record vào bảng `product` bằng flask shell

```bash
(venv) % python                                                                                                                                        ~/PycharmProjects/flask-demo-migration
Python 3.6.8 (default, Jan  5 2019, 10:42:28) 
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from app import db
/home/haminh/PycharmProjects/flask-demo-migration/venv/lib/python3.6/site-packages/flask_sqlalchemy/__init__.py:794: FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.
  'SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and '
>>> db.create_all()
>>> from app import Product
>>> product1 = Product(name="product 1")
>>> product2 = Product(name="product 2")
>>> db.session.add(product1)
>>> db.session.add(product2)
>>> db.session.commit()
```

Show hàng nào:

- Bằng Python shell
```
>>> Product.query.all()
[<Product 1>, <Product 2>]
>>> product = Product.query.filter_by(id=1).first()
>>> product.id
1
>>> product.name
'product 1'
```
- Bằng SQL CLI
```bash
(venv) % sqlite3 app.db                                                                   
SQLite version 3.11.0 2016-02-15 17:29:24      
Enter ".help" for usage hints.                 
sqlite> select * from product;
1|product 1
2|product 2
```

Ngon rồi. Tiếp theo, ta sẽ thêm 1 field nữa vào trong product lấy tên là `created`

```py
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    created = db.Column(db.DATETIME(timezone=False), default=datetime.datetime.utcnow)
```

Sau đó ta thực hiện migrate:

```sh
(venv) % flask db migrate
/home/haminh/PycharmProjects/flask-demo-migration/venv/lib/python3.6/site-packages/flask_sqlalchemy/__init__.py:794: FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.
  'SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and '
INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.autogenerate.compare] Detected added column 'product.created'
  Generating /home/haminh/PycharmProjects/flask-demo-migration/migrations/versions/5d7629307a6e_.py ... done
(venv) % flask db upgrade
/home/haminh/PycharmProjects/flask-demo-migration/venv/lib/python3.6/site-packages/flask_sqlalchemy/__init__.py:794: FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.
  'SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and '
INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade ba28f27f9cab -> 5d7629307a6e, empty message
```
Sau bước này ta sẽ có một version mới: `5d7629307a6e`

```sh
(venv) % sqlite3 app.db                                                                                                                                ~/PycharmProjects/flask-demo-migration
SQLite version 3.11.0 2016-02-15 17:29:24
Enter ".help" for usage hints.
sqlite> SELECT * from alembic_version;
5d7629307a6e
sqlite> SELECT * from product;
1|product 1|
2|product 2|
```

Sau này khi đẩy lên server, ta sẽ chỉ đẩy file version lên và chỉ thực hiện lệnh `flask db upgrade` mà thôi.

Ngoài sử dụng Flask CLI, bạn có thể sử dụng extension [Flask-Script.](https://flask-script.readthedocs.io/en/latest/)

Bài giới thiệu của mình tới đây kết thúc. 
Thanks for reading.