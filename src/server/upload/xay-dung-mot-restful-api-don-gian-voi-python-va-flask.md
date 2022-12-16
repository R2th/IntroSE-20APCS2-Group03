# Introduction
Việc xây dựng 1 API trong python là khá dễ dàng. Trong bài viết này, chúng ta sẽ cùng tạo ra một REST API đơn giản bằng python với sự hỗ trợ của Flask Framework.
# REST API là gì?
Thiết kế REST hay RESTful API (State Representational State Transfer) được thiết kế để tận dụng các giao thức hiện có. Mặc dù REST có thể được sử dụng trên hầu hết các giao thức, nhưng thường sử dụng HTTP khi được sử dụng cho các API Web. Điều này có nghĩa là các nhà phát triển không cần cài đặt thư viện hoặc phần mềm bổ sung để tận dụng thiết kế REST API. Thiết kế API REST được định nghĩa bởi Tiến sĩ Roy Fielding trong luận án tiến sĩ năm 2000 của ông. Điều đáng chú ý là lớp linh hoạt không thể tin được của nó. Vì dữ liệu không gắn với các phương pháp và tài nguyên, REST có khả năng xử lý nhiều loại cuộc gọi, trả lại các định dạng dữ liệu khác nhau và thậm chí thay đổi cấu trúc với việc thực hiện đúng của hypermedia. <br>
Sự tự do và sự linh hoạt của nó trong thiết kế API REST cho phép bạn xây dựng một API đáp ứng nhu cầu của bạn đồng thời đáp ứng được nhu cầu của rất nhiều khách hàng khác nhau. Không giống như SOAP, REST không bị giới hạn bởi XML, mà có thể trả về XML, JSON, YAML hoặc bất kỳ định dạng nào tùy thuộc vào yêu cầu của khách hàng. Và không giống như RPC, người dùng không bắt buộc phải biết tên thủ tục hoặc các thông số cụ thể theo thứ tự cụ thể. <br>
![](https://images.viblo.asia/59a754cf-9243-4516-965c-fc0f15fec489.jpg) <br>
Giờ để tạo một REST API đơn giản sử dụng python, chúng ta cần những thứ sau:
*  Python
*  Flask
* Flask-SQLAlchemy
* Flask-Restful
* SQlite3
* Jsonify<br>


-----

Nói thêm một chút, Flask là một micro framework viết bằng Python và dựa trên bộ công cụ Werkzeug và công cụ mẫu Jinja2. Còn Flask RESTful là một phần mở rộng cho Flask mà thêm hỗ trợ cho việc nhanh chóng xây dựng các API REST. 
## Bắt đầu thôi nào!
Bạn có thể tải tập dữ liệu Employees và Tracks Details [Employees and Tracks Details](http://www.sqlitetutorial.net/sqlite-sample-database/) và giải nén trong thư mục dự án có tên "python_rest". Tên cơ sở liệu là "chinook.db".
Sau khi tải về, hãy tạo một tệp có tên là server.py trong thư mục python_rest. Tập tin này sẽ chứa các API Definitions và Flask Code.

```
$ python_rest ls
chinook.db server.py
```
Bây giờ, chúng ta tạo ra một môi trường ảo cơ bản cho Python2.7 và cài đặt các gói sau khi nó được kích hoạt.
```
$ virtualenv venv
$ source venv/bin/activate
$ pip install flask flask-jsonpify flask-sqlalchemy flask-restful
$ pip freeze
```
REST có 4 options:
* GET
* PUT
* POST
* DELETE <br>


-----

Trong bài viết này chúng ta sẽ làm việc với GET
Trước khi code, chúng ta cần kiểm tra kết nối với cơ sở dữ liệu.
```
(.venv) python_rest$ sqlite3 chinook.db 
SQLite version 3.19.3 2017-06-08 14:26:16
Enter ".help" for usage hints.
sqlite> 
```
Bây giờ mọi thứ đã được thiết lập, chúng ta bắt đầu thao tác với cơ sở dữ liệu để lấy ra thông tin employees và tracks
```
from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask.ext.jsonpify import jsonify

app = Flask(__name__)
api = Api(app)

db_connect = create_engine('sqlite:///chinook.db')
conn = db_connect.connect() #kết nối với cơ sở dữ liệu

class Employees(Resource):
    def get(self):
        query = conn.execute("select * from employees") # Dòng này thực hiện truy vấn và trả về json
        return {'employees': [i[0] for i in query.cursor.fetchall()]} # Tìm và thêm cột đầu tiên là Employee ID

class Tracks(Resource):
    def get(self):
        query = conn.execute("select trackid, name, composer, unitprice from tracks;")
        result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(result)

class Employees_Name(Resource):
    def get(self, employee_id):
        query = conn.execute("select * from employees where EmployeeId =%d "  %int(employee_id))
        result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(result)
        

api.add_resource(Employees, '/employees') # Route_1
api.add_resource(Tracks, '/tracks') # Route_2
api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3

if __name__ == '__main__':
     app.run()
```
Sẽ có 3 routes được tạo ra và đây là kết quả: <br>
http://127.0.0.1:5000/employees sẽ  hiển thị tất cả id của employees trong cơ sở dữ liệu
![](https://images.viblo.asia/4f64b13c-57e8-4b29-9fc2-2dc852536094.png)
http://127.0.0.1:5000/tracks hiển thị các tracks detail
![](https://images.viblo.asia/06ee8c0f-4379-4848-b87d-ac3c9850e47b.png)
http://127.0.0.1:5000/employees/2 hiển thị ra employees detail với id = 2
![](https://images.viblo.asia/bf2c2f99-daf3-406d-90fe-42c1f0b38a92.png)
# Tổng kết
Vậy là xong, chúng ta đã tạo ra được 1 REST API đơn giản sử dụng python với Flask. Cũng không quá phức tạp phải không! Cảm ơn các bạn đã dành thời gian đọc bài viết của mình.
Bạn cũng có thể tìm hiểu Flask và Flask RESTful ở đây <br>
http://flask.pocoo.org/ <br>
https://flask-restful.readthedocs.io/en/latest/ <br>
# Tài liệu tham khảo
https://www.codementor.io/sagaragarwal94/building-a-basic-restful-api-in-python-58k02xsiq