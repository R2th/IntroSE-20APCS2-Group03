Chào các bạn. nếu các bạn chưa đọc part 1 có thể vào [đây](https://viblo.asia/p/dev-ios-tim-hieu-flask-part-1-maGK7bPL5j2) để xem nha.

Tiếp tục phần trước mình sẽ giải thích trong code các phần còn lại và chạy thử ở postman nhé các bạn.

## Resources
### User
```Python
from flask_restful import Resource, reqparse
from models.user import UserModel
```
```Resource```  sẽ là class cha của ```UserRegister``` và ```UserModel``` chúng ta import để kết nối tới database

Nếu chúng ta tạo một user thì username và passworrd không nên đặt ở trên url, do đó chúng ta sẽ gửi cùng với bên trong body của request, khi đó ```reqparse``` sẽ giúp chúng ta việc này

``` python
parser = reqparse.RequestParser()
    parser.add_argument('username',
        type=str,
        required=True,
        help="This field cannot be left blank."
    )
    parser.add_argument('password',
        type=str,
        required=True,
        help="This field cannot be left blank."
    )
```

Chúng ta định nghĩa những tham số quan trọng và set thông báo nếu tham số đó thiếu hoặc sai. Nếu có thêm nhiều tham số trong body, parser sẽ không để ý chúng.

Những phương thức HTTP mà chúng ta hay gặp là GET, POST, DELETE, PUT,...
Chúng ta chỉ cần tạo User do đó API của chúng ta chỉ cần một function là POST

```python
def post(self):
    data = UserRegister.parser.parse_args()
```

Chúng ta lấy data từ parser, bây giờ chúng ta có username và password bởi vì đó là 2 tham số của chúng ta

```python
if UserModel.find_by_username(data['username']):
    return {"message": "User already exists"}, 400
```

Chúng ta kiểm tra nếu trong database đã có username này thì chúng trả về một json có message với status code là 400, có nghĩa là "Bad Request"

```python
user = UserModel(**data)
user.save_to_db()

return {"message": "User created successfully."}, 201
```

Còn nếu không có thì chúng ta sẽ tạo một UserModel từ data, sau đó lưu vào database, trả về một json có message với status code là 201, có nghĩa là "Created"

### School

Chúng ta định nghĩa những phương thức HTTP như sau
- GET một school bằng tên
- POST một school với tên
- DELETE một school bằng tên
- GET tất cả schools

Chúng ta sẽ chia Resource này thành 2 Resoucces là ```School``` và ```SchoolList``` bởi vì chúng ta có 2 phương thức GET, một cái sẽ được đươc gọi trong ```/school``` và cái còn lại ở ```/schools```.

```Python
class School(Resource):
    def get(self, name):
        school = SchoolModel.find_by_name(name)
        if school:
            return school.json()
        return {'message': 'School not found'}, 404

    def post(self, name):
        if SchoolModel.find_by_name(name):
            return {'message': "School '{}' already exists".format(name)}, 400

        school = SchoolModel(name)
        try:
            school.save_to_db()
        except:
            return {'message': 'An error occurred while creating the school'}, 500

        return school.json(), 201

    def delete(self, name):
        school = SchoolModel.find_by_name(name)
        if school:
            school.delete_from_db()

        return {'message': 'School deleted'}

class SchoolList(Resource):
    def get(self):
        return {'schools': list(map(lambda x: x.json(), SchoolModel.query.all()))}
```

Những phương thức GET, POST, DELETE trong ```School``` và GET trong ```SchoolList``` rất dễ hiểu,  giống với ```UserRegister``` nên mình sẽ không nói ở đây.

### Student
Có một sự khác biệt nhỏ ở đây là chúng ta import thêm một thư viện
```Python
from flask_jwt import jwt_required
```
Cái này dành cho những resquest mà chúng ta sử dụng JWT Authentication

Nói qua về phương thức POST chúng ta đã tạo

```Python
@jwt_required()
def post(self, name):
    if StudentModel.find_by_name(name):
        return {'message': "A student with name '{}' already exists.".format(name)}, 400

        data = Student.parser.parse_args()

        student = StudentModel(name, **data) # (name, data['name'], data['school_id'])

        try:
            student.save_to_db()
        except:
            return {'message': 'An error ocurred inserting the student.'}, 500

        return student.json(), 201
```

Chúng ta có ```@jwt_required()``` để giúp Flask hiểu chúng ta cần JWT ```access_token``` để chạy phương thức này, nếu sai token thì phương thức sẽ trả về error
Phần còn lại thì giống như tạo User

## Security

Để xác thực người dùng, chúng ta có những phương thức như sau

```Python
def authenticate(username, password):
    user = UserModel.find_by_username(username)
    if user and user.password == password:
        return user
```

Nếu chúng ta tìm thấy User trong database và password trùng với password trong database thì chúng ta trả về user. User không thực sự trả về tới client bởi vì không có ích gì cả, client cần một ```access_token``` cho những request sau này, ```flask_jwt``` sẽ xử lý việc này và gửi tới client ```access_token```

```Python
def identity(payload):
    user_id = payload['identity']
    return UserModel.find_by_id(user_id)
```

Phương thức thứ hai là identity, phương thức này được gọi khi một phương thức được đánh dấu với ```@jwt_required()```

## App.py

File này hiểu đơn giản là main app
Phần import khá là dễ hiểu, chúng ta import những thư viện cần dùng và những ```resources``` 
```python
from flask import Flask
from flask_restful import Api
from flask_jwt import JWT

from security import authenticate, identity
from resources.user import UserRegister
from resources.student import Student, StudentList
from resources.school import School, SchoolList
```

```python
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

Tại đây chúng ta khởi tạo một đối tượng Flask và config những yêu cầu cần thiết, thông tin về config các bạn có thể trong trang chủ của Flask [ở đây](https://flask.palletsprojects.com/en/1.1.x/config/)
Ở đây chúng ta dùng SQLite nhưng vẫn có thể dùng MySQL hoặc PostrgeSQL.

```python
app.secret_key = 'dante'
```
Chúng ta định nghĩa khoá để ```access_token``` được mã hoá, nên là một khoá nào đó khó đoán

```python
api = Api(app)
api.add_resource(School, '/school/<string:name>')
api.add_resource(Student, '/student/<string:name>')
api.add_resource(SchoolList, '/schools')
api.add_resource(StudentList, '/students')

api.add_resource(UserRegister, '/register')
```
Chúng ta tạo một đối tượng Api từ thư viện ```flask_restful``` và định tuyến đến những resource cho các phương thức GET, POST, DELETE chúng ta đã viết

```python
jwt = JWT(app, authenticate, identity)
```

Đối tượng JWT được tạo có tham số là app, 2 phương thức chúng ta đã nói ở phần security

```python
if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)
```
Câu lệnh if này để nếu chúng ta chạy file từ Terminal, python sẽ ấn định file ```__name__``` đó thành ```__main__```

## Chạy Sever
Đầu tiên chúng ta mở Terminal lên, cd đến folder có file app.py và chạy các lệnh sau
```
virtualenv venv
```
Tạo môi trường chạy sever từ phần 1 mình đã nói

```
. venv/bin/activate 
```
Activate môi trường

```
pip install flask 
pip install flask-restful
pip install flask-jwt
pip install flask-sqlalchemy
```
Cài đặt những thư viện cần thiết

```
python3 app.py
```

Khi hoàn thành những việc trên thì terminal của bạn trông sẽ như thế này
![](https://images.viblo.asia/480c6e9a-2de6-4644-99af-442d104fa168.png)

Chúng ta sẽ test API ở trên bằng phần mềm Postman như sau.

### Create User
Chúng ta test API tạo user phương thức POST bên Url và body như hình dưới, sau khi bấm Send thì kết quả trả về thành công.
![](https://images.viblo.asia/c20ebca8-3a9f-408d-820a-04ab079c0108.png)

### Login
Tiếp theo chúng ta test API đăng nhập người dùng như sau.
![](https://images.viblo.asia/5a4c581a-4c81-41c7-9af2-909c6d8ebf7d.png)
Kết quả trả về là một ```access_token```

Lưu access_token này lại sau này chúng ta sẽ cần dùng đến nó.

### School
Bây giờ chúng ta sẽ tạo một School tên Sun như sau:

![](https://images.viblo.asia/8acdd1c8-388a-4e5b-b2ee-ed26f69d77ad.png)

Bạn có thể thử với DELETE, GET và GET tất cả schools nha.

### Student

Bây giờ hãy tạo một student với tên ```ThanhDat``` như sau

![](https://images.viblo.asia/91aaa915-14fd-479f-ba6f-aa8455c7f12b.png)

Nếu không có ```access_token``` thì kết quả trả về sẽ lỗi ngay, sửa lại Url một chút chúng ta sẽ được như sau, thêm body có School_id là 1 nữa chúng ta sẽ tạo được Student

![](https://images.viblo.asia/b9a8143e-9bca-483b-bb46-71bca57557d3.png)

-----

Vậy là mình đã hướng dẫn xong cơ bản về Flask để các bạn có thể tự viết một API đơn giản rồi, hi vong nó sẽ giúp ích công việc các bạn sau này :D

Cảm ơn các bạn đã đọc bài đến đây.

Nguồn:  https://hackernoon.com/learning-flask-being-an-ios-developer-3c6ec8c2ba83