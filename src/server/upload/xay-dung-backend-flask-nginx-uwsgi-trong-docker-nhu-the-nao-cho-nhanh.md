![](https://images.viblo.asia/5c4c82ce-84c7-4113-8d12-10988d960215.jpg)

Chúng ta có cấu trúc thư mục sau đây:
```
.
├── backend
│   ├── app
│   │   ├── app
│   │   │   ├── cors.py
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   └── test
│   │   │       ├── __init__.py
│   │   │       └── test_hello.py
│   │   ├── backend-live.sh
│   │   └── uwsgi.ini
│   └── Dockerfile
├── db
│   └── init.sql
├── docker-compose.yml
├── frontend
│   ├── babel.config.js
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── README.md
│   └── src
│       ├── App.vue
│       ├── assets
│       │   └── logo.png
│       ├── components
│       │   └── HelloWorld.vue
│       ├── config.js
│       └── main.js
├── README.md
└── traefik
    ├── acme
    │   └── acme.json
    └── traefik.toml
```

Ở bài viết này chúng ta tập trung vào phần backend đó là flask của chúng ta ở đó.

```
.
├── backend
│   ├── app
│   │   ├── app
│   │   │   ├── cors.py
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   └── test
│   │   │       ├── __init__.py
│   │   │       └── test_hello.py
│   │   ├── backend-live.sh
│   │   └── uwsgi.ini
│   └── Dockerfile
.
.
```

Có phần test mẫu kia thì mình sẽ bỏ qua vì mình muốn xây dựng docker flask nhanh nhất có thể mà.

## Xây dựng env ảo hóa môi trường để chạy được flask
Các bạn có thể tham khảo: https://www.geeksforgeeks.org/python-virtual-environment/

**Installing virtualenv**
```
$ pip install virtualenv
```

**Using virtualenv**
```
$ virtualenv -p /usr/bin/python3 flask-vuejs
```

**Activate**
```
$ source flask-vuejs/bin/activate
```

## Xây dựng Flask

Cài đặt môi trường

chúng ta tạo 1 file đâu đó **requirements.txt** với nội dung như sau:
```
Click==7.0
Flask==1.1.1
Flask-Cors==3.0.8
itsdangerous==1.1.0
Jinja2==2.10.1
MarkupSafe==1.1.1
six==1.12.0
uWSGI==2.0.18
Werkzeug==0.15.5
```

```
$ (flask-vuejs) pip install -r requirements.txt
```

Đó là cài các thư viện liên quan đến flask mà chúng ta cần

Trong file **main.py** chúng ta định nghĩa như sau:
``` python:./backend/app/app/main.py
# Import installed packages
from flask import Flask, jsonify

# Import app code
app = Flask(__name__)

# After creating the app, so that cors can import it
from app import cors

@app.route("/api/")
def root():
    return jsonify({"message": "Hello World"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)

```

Ở đây chỉ là tạo api đơn giản hello world

Trong file **cors.py** chúng ta có nội dung sau:
```python:./backend/app/app/cors.py
import os

from flask_cors import CORS

from app.main import app

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

origins = []
```
Để hiểu hơn cors, các bạn có thể tham khảo [Cors là gì ?](https://viblo.asia/p/cors-la-gi-jvElaW9xKkw)

tại thư mục **./backend/app** vẫn ở môi trường `flask-vuejs` chạy từng dòng lệnh sau đây:

```
export FLASK_APP=app/main.py
export FLASK_DEBUG=1
flask run
```

Chúng ta đã có log thứ như sau:
```
 * Serving Flask app "app/main.py" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 118-646-739
127.0.0.1 - - [23/Sep/2019 14:58:17] "GET /api HTTP/1.1" 308 -
127.0.0.1 - - [23/Sep/2019 14:58:17] "GET /api/ HTTP/1.1" 200 -
127.0.0.1 - - [23/Sep/2019 14:58:18] "GET /favicon.ico HTTP/1.1" 404 -
```

Test thử http://localhost:5000/api/

![](https://images.viblo.asia/d1ceeb37-d94b-44f5-9c5a-62f9b3e314a3.png)

chúng ta sẽ gói gọn thay vì sử dụng export từng dòng:

Trong file **backend-live.sh**
```Dockerfile:./backend/app/backend-live.sh
#! /usr/bin/env bash
export FLASK_APP=app/main.py
export FLASK_DEBUG=1
flask run
```

Thế là xong backend, nhưng đến bước này chợt nhận ra có gì đó sai sai. Bài viết của chúng ta liên quan đến docker hóa cái flask này mà nhỉ :scream:

## Xây dựng Dockerfile và uwsgi-nginx mì ăn liền đơn giản
Trong file **uwsgi.ini** 
```./backend/app/uwsgi.ini
[uwsgi]
module = app.main
callable = app

```

Trong file **Dockerfile**
```Dockerfile:./backend/Dockerfile
FROM tiangolo/uwsgi-nginx-flask:python3.6

RUN pip install flask_cors

COPY ./app /app
WORKDIR /app/

EXPOSE 80
```
Mì ăn liền này dễ quá, vậy chúng ta muốn lằng nhằng hơn thì sao:
[Có thể đọc thêm ở đây](https://dev.to/ishankhare07/nginx-as-reverse-proxy-for-a-flask-app-using-docker-3ajg)

Trong image này đã có sẵn config nginx, uwsgi giao tiếp với nhau, chỉ cần cài thêm `flask_cors` thôi

![](https://images.viblo.asia/6f509e54-d07c-4d82-976b-5b77c224fc3d.png)

Cấu hình **docker-compose.yml**
```yaml:./docker-compose.yml
version: "3.7"

services:

  backend:
    build: ./backend
```

Các bạn chỉ cần chạy lệnh
```
docker-compose up -d
```
chúng ta thử gõ http://localhost/api/ là ra kết quả mình cần

## Kết luận
Trên đây là 1 dạng setup docker đơn giản cho flask là backend có api endpoint `/api/`, ngoài ra các bạn có thể sử dụng tương tự với django chẳng hạn.
Bài viết tiếp theo sẽ setup thêm 1 framework frontend như Vuejs với endpoint là `/` là giao diện thao tác

facebook: https://www.facebook.com/quanghung997