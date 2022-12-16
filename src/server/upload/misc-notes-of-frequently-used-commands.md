# Intro

Đây là một số những command mình hay dùng (hoặc khó nhớ quá, lần nào cũng phải search lại). Note lên đây để lưu trữ, biết đâu lại có ích cho ai đó :laughing: 

- Disclamer 1: Có nhiều lệnh anti-pattern, anti-security. Use at your own risk. Mình ko chịu trách nhiệm đâu nhé :laughing: 
- Disclamer 2: RTFM !
- Disclamer 3: Nêu lưu thành bash alias, dùng cho tiện :D

## Flask Babel

Gần đây mình có thêm `i18n` vào cho 1 app bằng Flask, sử dụng `flask_babel`, thấy khá là dễ dùng, tuy nhiên còn 1 số chỗ mắc mà trong docs ko có.

Cài đặt

```sh
pip install Flask-Babel
```

Trong `config.py` thêm

```python
BABEL_DEFAULT_LOCALE = 'vi'
BABEL_DEFAULT_TIMEZONE = 'UTC'
BABEL_TRANSLATION_DIRECTORIES = os.path.join(basedir, 'translations')
```

với `basedir` là đường dẫn đến thư mục root của project. Mình thấy ko có dòng cuối thì flask babel ko nhận được thư mục dịch.

Thêm các getter sau:

```python
@babel.localeselector
def get_locale():
    # if a user is logged in, use the locale from the user settings
    user = getattr(g, 'user', None)
    if user is not None:
        return user.locale
    # otherwise try to guess the language from the user accept
    # header the browser transmits.  We support de/fr/en in this
    # example.  The best match wins.
    return request.accept_languages.best_match(['de', 'fr', 'en'])

@babel.timezoneselector
def get_timezone():
    user = getattr(g, 'user', None)
    if user is not None:
        return user.timezone
```

trong `app/__init__.py`

```python
from flask_babel import Babel, gettext

app.config.from_object('config')
babel = Babel(app)
```

trong docs hiện vẫn là `flask.ext.babel` như vậy sẽ báo lỗi import, thay như trên sẽ import được. Thường các package `flask.ext.*` nếu lỗi đều có thể thay như vậy.

Thêm `babel.cfg` vào thư mục gốc:

```cfg
[python: app/**.py]
[jinja2: app/templates/**/*.html]
extensions=jinja2.ext.autoescape,jinja2.ext.with_
```

chạy

```sh
pybabel extract -F babel.cfg -o messages.pot .
# hoặc
pybabel extract -F babel.cfg -k lazy_gettext -o messages.pot .
```

Thêm bản dịch

```
pybabel init -i messages.pot -d translations -l ja
```

Import trong các file view mà chúng ta dùng

```python
from flask_babel import gettext, ngettext, _
```

thường thì sẽ sử dụng `_` là chính. Ví dụ:

```python
msgid "You've joined team <strong>%(name)s</strong> !"
```

Compile file `*.po`.

```sh
pybabel compile -d translations
```

Bạn có thể dùng extension [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) để tự động hoá việc compile mỗi lần save file. Ví dụ:

```json
"emeraldwalk.runonsave": {
    "commands": [
        {
            "match": "\\.po$",
            "isAsync": true,
            "cmd": "${workspaceRoot}/venv/bin/pybabel compile -d ${workspaceRoot}/translations"
        }
    ]
}
```

## MySQL

Dump DB để backup

```sh
mysqldump --opt --host=0.0.0.0 --user=user_name_here -ppassword_here db_name_here > backupDB/XXX.sql
```

(Not recommend vì sẽ lưu pass trong bash history :laughing: )

Sửa lại start id từ 1

```sh
ALTER TABLE tbl AUTO_INCREMENT = 1;
```

Combo tạo user và DB (chôm của anh Trần Đức Thắng)

```sh
CREATE USER "admin"@"localhost" IDENTIFIED BY "admin_la_dep_trai";
CREATE DATABASE my_db CHARACTER SET utf8;
GRANT ALL ON my_db.* to admin@localhost;
FLUSH PRIVILEGES;
```

Đổi pass user

```sh
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```

Tạm tắt foreign key check để truncate DB (cho nhanh)

```sh
SET foreign_key_checks = 0;
```

## Alembic

Tạo revision mới dựa trên thay đổi model.

```sh
alembic revision --autogenerate -m "Added account table"
```

## Celery

```sh
celery -A app.celery worker --concurrency=10 -lDEBUG --logfile tmp/celery.log

celery -A app.celery flower --address=0.0.0.0 --port=1337
```

Combo seek-and-destroy: tìm tất cả các process của celery và kill. Dùng được cho tất cả các thể loại process kiểu master-worker khác: nginx, erl,...

```
ps auxww | grep 'celery worker' | awk '{print $2}' | xargs kill -9
```

## Remove *.pyc files

```sh
find . -name "*.pyc" -exec rm -rf {} \;
```

## JQuery

Lấy ra danh sách các event handler. Giờ chắc không ai dùng JQuery mấy nữa rồi.

```js
jQuery._data(document.getElementById('_chatText'), "events" );
```

## Docker

```sh
docker run -t -i ctf_tools /bin/bash
```

Xoá các images bị "mồ côi" và container đã exit.

```sh
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")

docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm
```

 ## Redis
 
 Xoá hàng loạt key trong redis
 
```sh
redis-cli KEYS "matrix6*" | xargs redis-cli DEL
```

## Regex

Nên đọc (nhưng mà chưa có thời gian)

http://www.regular-expressions.info/lookaround.html


## Disk usage

Check dung lượng các thư mục và sắp xếp theo thứ tự giảm dần

```sh
sudo du --max-depth=1 | sort -nr
```

## Create Ubuntu desktop icon

Cài đặt

```sh
sudo apt-get install gnome-panel
```

```
gnome-desktop-item-edit ~/Desktop/ --create-new
```

và chỉnh sửa lại icon, đường dẫn.

## Python Inspect

```python
import code; code.interact(local=locals())
```

## Gunicorn

```sh
gunicorn -w 4 -b 0.0.0.0:4000 app:app --reload --daemon --error-logfile error.log --access-logfile access.log

gunicorn -w 2 -b 0.0.0.0:4000 app:app --reload --daemon

gunicorn -k gevent -w 4 -b 0.0.0.0:4000 app:app --reload --daemon --error-logfile error.log --access-logfile access.log
```

Muốn chạy với `gevent` (async) thì cần cài thêm

```sh
pip install gevent
```

## Batch resize GIF images

```sh
mogrify -resize "80x80>" -quality 100 -format gif -path resized *.gif
```

dùng cho việc thêm emo vào Chat++. Với image bình thường có thể dùng `convert`.

## Show IP addresses

```sh
ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
```

## Batch replace in files

```sh
grep -lr "MyProject" . | grep -v ".git" | xargs sed -ie 's/MyProject/AwesomeProject/g'
```

## SQLAlchemy

Cú pháp ORM so sánh với `None` và kiểm tra `IN`

```python
ClassName.id.in_()

ClassName.id.isnot(None)

ClassName.id == None

(~ClassName.id.any(ClassName.id.in_()))
```


## PostgresSQL

```sh
initdb -D /usr/local/var/postgres/

/usr/local/Cellar/postgresql/10.3/bin/createuser -s postgres
psql -U postgres -h localhost

tail /usr/local/var/log/postgres.log
```

## Ethereum

```js
web3.personal.unlockAccount('0xE0ca...c1f7', 'mypass')
```

## List connection on port

```sh
lsof -Pn -i4 | grep 1935
```

## Setup auto-restart service

Thuận tiện cho việc chạy 1 file liên tục, tự động restart khi bị chết.

```sh
easy_install supervisor
```

File config

```sh
sudo vim /etc/supervisor/supervisord.conf
```

```ini
[supervisord]
logfile = /tmp/supervisord.log
user = nguyen.anh.tien

[program:tcp_sudoku]
directory=/home/nguyen.anh.tien/tcp_sudoku
command=python sudoku_service.py
stderr_logfile=sudoku.log
stdout_logfile=sudoku.log
autostart=true
autorestart=true
```

# Extra

Gần đây có phát hiện ra app [Boostnote](https://boostnote.io/) chuyên dùng để take-note cho lập trình viên khá đẹp, khá tiện, hỗ trợ đồng bộ qua Dropbox <3