Là một dev IOS có bao giờ bạn tự hỏi "Sẽ thế nào nếu mình cũng code backend cho app?". Không phải ý kiến tồi phải không bởi vì bạn không chỉ code backend cho app mà backend đó cũng có thể được sử dụng cho những công nghệ front-end khác (Android, Web,...).

Mình sẽ hướng dẫn các bạn cách phát triển một REST API sử dụng Flask từ một dev IOS
Có một vài yêu cầu ở đây để các bạn dễ theo dõi hơn đó là:
* Có kiến thức về IOS
* Kiến thức basic về Python

Mình chủ yếu code Swift, có một chút kinh nghiệm với C++, đối với Python mình nghĩ chỉ cần hiểu về biến, functions, class,.... Các bạn có thể tự tìm hiểu nha.
Chúng ta sẽ tạo một REST API với Flask cho một "hệ thống" của trường học và học sinh, chúng ta cũng sẽ có chức năng đăng nhập với yêu cầu authentication
Sơ đồ thực thể liên kết của chúng ta trông sẽ giống như này

![](https://images.viblo.asia/4328e783-4cd7-45d0-83f5-61936718d49d.png)

## Cài đặt Python và virtualenv
Đi đến trang web www.python.org và tải phiên bản mới nhất

Để cài đặt virtualenv mở Terminal và chạy command này:

```sudo pip install virtualenv```

Virtualenv là một công cụ để xây dựng môi trường độc lập khi phát triển với Python. Đó là một cách tuyệt vời để nhanh chóng kiểm tra các thư viện mới mà không làm lộn xộn các package có sẵn của bạn hoặc chạy nhiều dự án trên cùng một máy phụ thuộc vào một thư viện đặc biệt nhưng không phải cùng một phiên bản của thư viện đã có.

Giống như bạn vẫn có thể code phiên bản Swift cũ trên phiên bản Xcode mới hơn.

Bây giờ phải tạo 'virtualenv' cho project của chúng ta, để làm việc này, đi tới folder của project trong Terminal và chạy command này

```python3 -m venv venv```

Bây giờ để vào 'virtualenv' chạy lệnh

```. venv/bin/activate```

Bây giờ terminal của bạn sẽ thay đổi vào có thêm (venv) ở đầu:

![](https://images.viblo.asia/9eb85042-80a8-46ad-8d78-29e065ca204e.png)

Nếu bạn muốn thoát khỏi 'virtualenv' bạn chỉ cần chạy ```deactivate```

Ban đầu mình có nói chúng ta sẽ tạo một REST API nhưng REST có nghĩa là gì? Để một API trở thành REST, nó phải theo một vài quy tắc. Hầu hết "REST API" ngày này không thực sự là một REST đầy đủ, chỉ là theo một vài quy tắc cơ bản và đó là chìa khoá cơ bản của REST. Khi tạo một REST API chúng ta phải nhớ là chúng ta sẽ sử dụng ```models``` cho việc xử lý database và ```resources``` cho object của client (web, mobile app,...). Nói một cách khác, khi chúng ta đọc/sửa trong database, chúng ta sử dụng ```models``` còn khi chúng ta gửi/nhận data từ client chúng ta sử dụng ```resources```. Cả hai thứ này là những class

### Database Alchemy
Chúng ta sẽ sử dụng một thư viện gọi là ```SQLAlchemy``` cho việc đọc/sửa từ database. ```SQLAlchemy``` làm việc với SQLite, PostgreSQL, MySQL,.... Điều này sẽ giúp chúng ta viết những models tới database và làm việc trên database

### JWT

JWT là công nghệ chúng ta sử dụng cho việc xác thực người dùng, trang web JWT đã định nghĩa chúng làm việc như nào

> Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.
> 

Về cơ bản có nghĩa là khi user đăng nhập vào API của chúng ta, API sẽ tạo một ```access token``` tạm thời và được lưu bởi client. Sau đó, mỗi khi client tạo request tới API ```access token``` ấy nên được gửi cùng và đây là cách API biết client đã được đăng nhập. Token sẽ bị xoá mất sau một khoảng thời gian vì lý do bảo mật.

## Code thôi
Các bạn có thể lấy code ở đây: https://github.com/ngovietanh21/Leaning-Flask

Folder project của chúng ta sẽ trông như thế này

![](https://images.viblo.asia/34dc6212-0dbd-4605-bc36-a7e0eba70d10.png)

Mở Text Editor lên

![](https://images.viblo.asia/959ee5ae-63b1-44a0-b8ef-9826a2a07328.png)

Một vài lưu ý là folder ```__pycache__``` được tạo tự động bởi python và nó không nên được upload lên repo hoặc xoá đi

Bên trong folders ```models``` và ```resources```, file ```___init___``` sẽ nói cho python biết folder là một package không chỉ là một folder

###  SQLAlchemy
Có một file ```db.py``` chỉ làm một việc duy nhất là import thư viện ```SQLAlchemy``` và tạo một variable gọi là ```db```.  Điều này sẽ giúp mỗi file trong API có thể gọi cùng một đối tượng của ```SQLAlchemy()```

![](https://images.viblo.asia/ffa1aa29-f167-4cc7-903e-dac497e27abd.png)

## Models
### UserModel
Hãy nhìn vào model đầu tiên, chúng là object chúng ta sẽ viết và kết nối tới database

Trone folder models mở file user.py
```Python
from db import db

class UserModel(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
```

Chúng ta import db để sử dụng biến db truy cập tới database và class kế thừa từ kiểu ```db.Model```

```__tablename__``` là tên của bảng, sau đó chúng ta định nghĩa các cột của ```Users``` chúng ta

![](https://images.viblo.asia/1a210011-57d7-49ea-bb05-81c55cca7ed4.png)

```Python
def __init__(self, username, password):
    self.username = username
    self.password = password

def save_to_db(self):
    db.session.add(self)
    db.session.commit()
```

Tiếp theo là phương thức khởi tạo class ```__init__```
Để ý rằng chúng ta không truyền id vào bởi vì giá trị này sẽ tăng lên 1 cho mỗi giá trị mới trong database, bạn cũng có thể truyền id vào nhưng cách này chúng ta sẽ không đưa vào để làm nó tự động tăng lên.

Và cách chúng ta thêm vào database trong SQLAlchemy

```Python
@classmethod
def find_by_username(cls, username):
    return cls.query.filter_by(username=username).first()

@classmethod
def find_by_id(cls, _id):
    return cls.query.filter_by(id=_id).first()
```

Các bạn có thể hiểu ```classmethod``` nó giống như ```static``` tức là sử dụng những phương thức này mà không cần khởi tạo đối tượng

### SchoolModel and StudentModel
Có những dòng giống với UserModel nên mình chỉ nói những điều khác ở đây

Chúng ta cần một kết nối 1-n trông như thế này

![](https://images.viblo.asia/dc5b8c6d-516b-44cb-87a1-a38dcd4e197e.png)

Trong file student.py

```Python
school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))
school = db.relationship('SchoolModel')
```

Dòng  đầu tiên có nghĩa là tạo một cột tên là school_id có kiểu Interger và có một quan hệ với cột id từ bảng schools

Dòng thứ hai khai báo kiểu kết nối, các bạn có thể đọc thêm ở trang web SQLAlchemy: https://docs.sqlalchemy.org/en/13/orm/relationships.html

Cả 2 Model đều có phương thức json bởi vì chúng ta muốn gửi data tới client một dang JSON, không phải một object

```Python
def json(self):
        return {'name': self.name, 'school': self.school.name}
        
def json(self):
        return {'name': self.name, 'students': list(map(lambda x: x.json(), self.students.all()))}
```

-----
Cảm ơn các bạn đã đọc đến đây, vì phần resource cần phải nói đến những phương thức GET, POST, DELETE sẽ làm bài viết hơi dài, do đó mình sẽ viết vào phần 2, hẹn các bạn ở  bài tiếp theo.