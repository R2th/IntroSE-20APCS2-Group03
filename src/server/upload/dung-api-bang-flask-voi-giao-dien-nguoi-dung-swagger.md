Hiện tại mình đang sử dụng swagger để dùng viết document cho api cho ứng dụng rails . Giao diện của swagger khá đẹp rõ ràng , thân thiện và frontend cũng đã quen với swagger api, vậy tại sao mình không kết hợp swagger với ứng dụng flask để tạo giao diện document api. Hôm nay mình sẽ thực hiện điều này nhé.
# 1. Giới Thiệu
Đầu tiên ta đều biết flask là một microframework Python để phát triển web. Mặc dù được xây dựng với một lõi nhỏ và được coi là Giao diện Cổng vào Máy chủ Web (WSGI) rất nhẹ, Flask nổi bật với triết lý dễ dàng mở rộng. Nó được thiết kế để mở rộng quy mô các ứng dụng phức tạp và hỗ trợ khởi đầu dễ dàng và nhanh chóng.
Flask không bắt buộc phải yêu cầu bố cục dự án hoặc các phụ thuộc khác. Thay vào đó, nó cho phép các nhà phát triển chọn các thư viện và công cụ mà họ muốn sử dụng và cũng có sẵn các tiện ích mở rộng khác nhau do cộng đồng cung cấp.
Và để sử dụng swagger api cho flask chúng ta sử dụng thư viện Flask-RESTPlus.
# 2. Cài Đặt 
Ta nên cài đặt môi trường ảo cho dự án python . Có thể dùng virtualenv hoặc [pipev](https://viblo.asia/p/su-dung-pyenv-pipenv-cho-cac-du-an-python-cua-ban-L4x5xdyr5BM) .

Sau đó cài đặt flask và flask-restplus
```
pipenv install flask
pipenv install flask-restplus
```
# 3. Xây dựng ứng dụng với swagger
Tạo file app.py có nội dung sau :
```
from flask import Flask
import werkzeug
werkzeug.cached_property = werkzeug.utils.cached_property
import flask.scaffold
flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func
from flask_restplus import Api, Resource

flask_app = Flask(__name__)
app = Api(app = flask_app)

name_space = app.namespace('main', description='Main APIs')

@name_space.route("/")
class MainClass(Resource):
	def get(self):
		return {
			"status": "Got new data"
		}
	def post(self):
		return {
			"status": "Posted new data"
		}

```
Chạy server:
```
FLASK_APP=app.py flask run
```
Phần tốt nhất của Flask-RESTPlus là nó tự động ghi lại các API mà tôi đã tạo và chúng hiển thị trong giao diện người dùng Swagger. Truy cập http://127.0.0.1:5000/ và bạn có thể xem tất cả các API.
![1_xnNBsvokfRnrChioj3umxw.png](https://images.viblo.asia/4d0d7274-34a6-464d-8d4f-5bc488440f1d.png)

Cả hai API đều hiển thị trong không gian tên chính với mô tả API chính. Tôi có thể thử một trong hai API và kiểm tra hoạt động của chúng bằng cách nhấp vào nút Dùng thử. Có thể sử dụng curl để thực hiện các yêu cầu GET và POST trên terminal hoặc Try it out trên giao diện bình thường để test call api. 

Bạn cũng có thể xem nội dung của tệp Swagger bằng cách truy cập http://localhost: 5000/swagger.json. Tôi có thể xác định phiên bản, tiêu đề và mô tả ứng dụng của  tôi.  Tiêu đề giao diện người dùng Swagger bây giờ sẽ giống như hình ảnh bên dưới.
```
flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Name Recorder", 
		  description = "Manage names of various users of the application")

name_space = app.namespace('names', description='Manage names')
```
![image.png](https://images.viblo.asia/19ff2633-93d7-4000-968a-761bb1e34caa.png)

## Xác định các API
thêm 1 mô tả model 
```
model = app.model('Name Model', 
		  {'name': fields.String(required = True, 
					 description="Name of the person", 
					 help="Name cannot be blank.")})
```
Định nghĩa cho model khai báo ở trên 
```
@name_space.route("/<int:id>")
class MainClass(Resource):

	@app.doc(responses={ 200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error' }, 
			 params={ 'id': 'Specify the Id associated with the person' })
	def get(self, id):
		try:
			name = list_of_names[id]
			return {
				"status": "Person retrieved",
				"name" : list_of_names[id]
			}
		except KeyError as e:
			name_space.abort(500, e.__doc__, status = "Could not retrieve information", statusCode = "500")
		except Exception as e:
			name_space.abort(400, e.__doc__, status = "Could not retrieve information", statusCode = "400")

	@app.doc(responses={ 200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error' }, 
			 params={ 'id': 'Specify the Id associated with the person' })
	@app.expect(model)		
	def post(self, id):
		try:
			list_of_names[id] = request.json['name']
			return {
				"status": "New person added",
				"name": list_of_names[id]
			}
		except KeyError as e:
			name_space.abort(500, e.__doc__, status = "Could not save information", statusCode = "500")
		except Exception as e:
			name_space.abort(400, e.__doc__, status = "Could not save information", statusCode = "400")
```
Ta sẽ có giao diện api và mô tả model như sau
![image.png](https://images.viblo.asia/8d94c558-48be-49de-b35c-555128914d82.png)
Có rất nhiều phương thức để định nghĩa api trong document của Flask-RESTPlus : https://flask-restplus.readthedocs.io/en/stable/swagger.html
Nguồn: https://towardsdatascience.com/working-with-apis-using-flask-flask-restplus-and-swagger-ui-7cf447deda7f