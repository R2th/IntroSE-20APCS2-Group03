Trong phạm vi bài viết, mình giả sử rằng các bạn đã có một sự hiểu biết cơ bản về Python cũng như  thiết lập môi trường bằng virtualenv trước đó.

Nếu chưa thì tin chắc rằng trên Viblo có rất nhiều bài hướng dẫn thiết lập cũng như các kiến thức cơ bản về Python.
Ở đây mình sẽ dùng phiên bản Python 2.7

## 1. Cài đặt Flask
Chúng ta chỉ việc cài đặt thêm 2 package này
```
pip install flask
pip install flask-sqlalchemy
```
Và tạo thư mục dự án

`mkdir my_app`
## 2. Ứng dụng Flask

Ở đây mình sẽ tạo ra một ứng dụng nhỏ, trong đó có một model Product.
Cây thư mục của dự án sẽ có dạng 
```
flask_app/
    my_app/
        - __init__.py
        product/
            - __init__.py      // Empty file
            - models.py
            - views.py
    - run.py
```

Tất nhiên đây chỉ là một bài viết tạo RESTful API đơn giản nên chúng ta sẽ kiểm tra bằng cách gọi http chứ không đụng chạm tới front-end

## 3. Code một tí nào
* flask_app/my_app/__init__.py

```
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
 
from my_app.product.views import product
app.register_blueprint(product)
 
db.create_all()
```

File phía trên là file cấu hình và khởi tạo ứng dụng, ở đây chúng ta dùng sqlite cho nhanh gọn lẹ ha

Tiếp tục là file model

* flask_app/my_app/product/models.py

```
from my_app import db
 
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    price = db.Column(db.Float(asdecimal=True))
 
    def __init__(self, name, price):
        self.name = name
        self.price = price
 
    def __repr__(self):
        return '<Product %d>' % self.id
```
Chắc không có gì phải giải thích nhỉ

Cuối cùng, chúng ta tạo 1 file có chức năng route, với Flask bạn không nhất thiết phải tạo hay config 1 file route chung, mà có thể đưa route vào một cách đơn giản như thế này thôi.

Có nhiều cách xử lý route với Flask, ở đây mình chọn dùng pluggable view cho nó trực quan và nếu bạn muốn phát triển thêm thắt front end vào thay vì chỉ là api với đống json thì cũng dễ dàng nữa.


* flask_app/my_app/product/views.py
```
import json
from flask import request, jsonify, Blueprint, abort
from flask.views import MethodView
from my_app import db, app
from my_app.catalog.models import Product
 
product = Blueprint('product', __name__)
 
@product.route('/')
@product.route('/home')
def home():
    return "Welcome to the Product Home."
 
 
class ProductView(MethodView):
 
    def get(self, id=None, page=1):
        if not id:
            products = Product.query.paginate(page, 10).items
            res = {}
            for product in products:
                res[product.id] = {
                    'name': product.name,
                    'price': str(product.price),
                }
        else:
            product = Product.query.filter_by(id=id).first()
            if not product:
                abort(404)
            res = {
                'name': product.name,
                'price': str(product.price),
            }
        return jsonify(res)
 
    def post(self):
        name = request.form.get('name')
        price = request.form.get('price')
        product = Product(name, price)
        db.session.add(product)
        db.session.commit()
        return jsonify({product.id: {
            'name': product.name,
            'price': str(product.price),
        }})
 
    def put(self, id):
        # Update the record for the provided id
        # with the details provided.
        return
 
    def delete(self, id):
        # Delete the record for the provided id.
        return
 
 
product_view =  ProductView.as_view('product_view')
app.add_url_rule(
    '/product/', view_func=product_view, methods=['GET', 'POST']
)
app.add_url_rule(
    '/product/<int:id>', view_func=product_view, methods=['GET']
)
```

## 4. Chạy ngay đi
Chúng ta thêm cái này vào run.py
```
from my_app import app
app.run(debug=True)
```

Sau đó vào terminal và gõ lệnh là chạy thôi
```
python run.py
```

À, nếu bạn muốn test trên trình duyệt thì cổng mặc định của Flask là 5000 nhé.

Tư liệu tham khảo: https://code.tutsplus.com/tutorials/building-restful-apis-with-flask-diy--cms-26625