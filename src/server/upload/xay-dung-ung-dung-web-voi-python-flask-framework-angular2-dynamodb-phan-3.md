Ở bài viết trước mình đã hướng dẫn cách tạo 1 component cơ bản. Dựa vào cấu trúc đó các bạn có thể tạo các component phức tạp hơn cho project của mình.  Ở bài viết này mình xin hướng dẫn cách xử lý session và authentication qua ví dụ chức năng đăng nhập.

Để đảm bảo tính đồng bộ và bảo mật thì chúng ta cần phải xử lý đồng thời ở cả trên server(python-flask) và cả trên client(angular2).

Ở bài viết này mình sẽ đi ngược, hướng dẫn từ server -> client để cho các bạn có cái nhìn tổng quan nhất.

# I. Server
## 1. Thêm các thư viện và thiết lập lifetime cho session.
Trong file `app.py` chúng ta import thêm thư viện session, timedelta và đặt secret_key cho flask.
```
/app.py

import flask
import json
from flask import Flask, make_response, request, session
from datetime import timedelta
from config import Response

app = Flask(__name__, static_folder="../front/dist/front", static_url_path="")
app.secret_key = "abc!@#" #có thể đặt bất kỳ

@app.before_request
def before_request():
  session.permanent = True
  app.permanent_session_lifetime = timedelta(minutes=10) #phiên làm việc sẽ tự động xóa sau 10p nếu không có thêm bất cứ request nào lên server.
```
Nếu yêu cầu của ứng dụng là logout sau 1 khoảng thời gian nhất định thì thiết lập này là cần thiết, nếu không thì có thể bỏ qua. Nếu mà  xây dựng thêm chức năng `remember me` thì chỉ cần set thêm điều kiện nữa là xong.

## 2. Viết api cho chức năng đăng nhập và đăng xuất.
Trước hết ở list_users mình đã tạo ra từ bài viết trước chúng ta sẽ thêm 1 trường password với value mặc định là 12345. Trong thực tế, mật khẩu sẽ thường không được lưu ở dạng  giá trị trực tiếp mà thường được mã hóa hành 1 chuỗi ký tự khác nhằm tăng tính bảo mật. Mình sẽ hướng dẫn ở bài viết sau.
```
/app.py

list_users = [
  {'id': 1, 'name': 'Nguyen Van A', 'sex': 'Male', 'age': 20, 'email': 'mail_a@gmail.com', 'password': '12345'},
  {'id': 2, 'name': 'Hoang Anh B', 'sex': 'Male', 'age': 28, 'email': 'mail_b@gmail.com', 'password': '12345'},
  {'id': 3, 'name': 'Nguyen Thi C', 'sex': 'Female', 'age': 31, 'email': 'mail_c@gmail.com', 'password': '12345'},
  {'id': 4, 'name': 'Pham Thanh D', 'sex': 'Male', 'age': 22, 'email': 'mail_d@gmail.com', 'password': '12345'}
]
```

Để xử lý cho chức năng đăng nhập và đăng xuất chúng ta sẽ định nghĩa 2 route api và 2 hàm xử lý như sau:
```
/app.py

@app.route('/api/login', methods=['POST'])
def login():
  response = Response()
  params = json.loads(request.data)
  indexOfUser = check_index(params['email'], 'email')
  if indexOfUser >= 0 and list_users[indexOfUser]['password'] == params['password']:
    session['logged_in'] = True
    session['user_id'] = list_users[indexOfUser]['id']
    response.create(Response.SUCCESS)
    user = list_users[indexOfUser]
    user.pop('password', None)
    response.data = {'user': user}
  else:
    response.create(Response.NOT_FOUND)
  return flask.jsonify(json.dumps(response.__dict__))

@app.route('/api/logout')
def logout():
  response = Response()
  session.pop('logged_in', None)
  session.pop('user_id', None)
  response.create(Response.SUCCESS)
  return flask.jsonify(json.dumps(response.__dict__))
```
Với cách viết này thì API login sẽ cần 2 params đc truyền lên từ client chính là `email` và `password`. Nếu kiểm tra các thông tin này là đúng thì chúng ta sẽ thực hiện việc đăng ký thông tin người dùng đó vào session. Ngược lại khi đăng xuất chúng ta chỉ cần xóa thông tin đó đi là xong.
## 3. Thêm một loại response mới vào config.
Chúng ta sẽ định nghĩa thêm một kiểu response mới trong file `config.py` cho response not authentication. Ở đây mình sẽ cho là định nghĩa cho nó với mã code là 601. mã này thì tùy thuộc vào bạn và quy tắt mà bạn chọn để định nghĩa. Sau này chúng ta sẽ còn cần phải tạo thêm rất nhiều kiểm response này nữa nên hãy thống nhất 1 list code để sau này phát triễn project nhé.
```
/config.py

class Response(object):

    SUCCESS = {'code': 200, 'message': 'Success.'}
    ERROR = {'code': 500, 'message': 'Fail.'}
    NOT_FOUND = {'code': 404, 'message': 'Not found.'}
    NOT_AUTHENTICATION = {'code': 601, 'message': 'Not found.'} #ở client mình sẻ check theo mã code này

    def __init__(self):
        self.code = 0
        self.message = ''
        self.data = {}

    def create(self, params, data={}):
        self.code = params['code']
        self.message = params['message']
        self.data = data

```
## 4. Authentication ở server.
Trong file `app.py` chúng ta sẽ thực hiện việc thực hiện việc kiểm tra với các request từ client mà yêu cầu người dùng đã đăng nhập mà thực chất chưa đăng nhập thì sẽ return response với mã lỗi 601 như đã định nghĩa ở trong config. Và dưới client chúng ta sẽ check điều kiện với mã lỗi này để biết là request gửi lên đó đã được xác thực hay chưa. Nếu chưa mình sẽ chuyển về trang đăng nhập. 

Trước hết mình sẽ gom danh sách các functions cần yêu cầu người dùng đã đăng nhập vào một list như dưới đây.
```
/app.py

limit_for_authentication = [
  'all_users',
  'add_user',
  'update_user',
  'delete_user'
]
```
Tiếp theo chúng ta sẽ kiểm tra với mọi request được gửi lên thì request đó có yêu cầu người dùng đã đăng nhập không và kiểm tra nếu chưa đăng nhập thì mình sẽ return về một response với mã lỗi là 601.
```
/app.py

@app.before_request
def before_request():
  session.permanent = True
  app.permanent_session_lifetime = timedelta(minutes=10)
  if 'logged_in' not in session and request.endpoint in limit_for_authentication:
    response = Response()
    response.create(Response.NOT_AUTHENTICATION)
    return flask.jsonify(json.dumps(response.__dict__))
```
Khi phát triễn project lên thì sẽ có nhiều chức năng yêu cầu đăng nhập thì chỉ cần thêm tên function đó vào trong list limit đó là xong.

Ngoài ra chúng ta cũng sẽ phải thêm 1 router có url là `/login` để có thể truy cập vào trang này.
```
/app.py

@app.route('/users')
@app.route('/home')
@app.route('/login')
def response_pages(): #Hàm củ có tên là home mình đã sửa lại để trông dễ  hiểu hơn.
  return make_response(open('../front/dist/front/index.html').read())
```

Vậy là xong cho server tiếp theo chúng ta sẽ đến với client. Mọi người xem tiếp ở phần 4 nhé.
Các bạn có thể xem source của phần này [tại đây](https://github.com/phamthanhluan125/serial2/commit/71942b5eebda48dd190027beb98e45434e7fd819)