Xin chào mọi người, quay lại với chuỗi serial chủ đề về NodeJs của mình, ở một số dự án đòi hỏi server có các sự cấu hình cao cấp và xử lý nhanh, cũng như úng dụng Marching Learning hay AI vào dự án thì Node.JS gần như sẽ khó đáp ứng được. Ở bài viết này mình xin hướng dẫn tiếp cách tạo thêm 1 server thứ 2 sữ dụng Python(cùng với Framework Flask). Server này sẽ giao tiếp với server Node.JS thông qua API.

Với thiết kế kiểu này. Tùy thuộc vào từng trường hợp, chúng ta có thể chọn xử lý ở  server Node.JS hay tiếp tục gửi lên server Python.


### 1.Python và Framework Flask
* Python

Python là ngôn ngữ lập trình hướng đối tượng, cấp cao, mạnh mẽ, được tạo ra bởi Guido van Rossum. Nó dễ dàng để tìm hiểu và đang nổi lên như một trong những ngôn ngữ lập trình nhập môn tốt nhất cho người lần đầu tiếp xúc với ngôn ngữ lập trình. Python hoàn toàn tạo kiểu động và sử dụng cơ chế cấp phát bộ nhớ tự động. Python có cấu trúc dữ liệu cấp cao mạnh mẽ và cách tiếp cận đơn giản nhưng hiệu quả đối với lập trình hướng đối tượng. Cú pháp lệnh của Python là điểm cộng vô cùng lớn vì sự rõ ràng, dễ hiểu và cách gõ linh động làm cho nó nhanh chóng trở thành một ngôn ngữ lý tưởng để viết script và phát triển ứng dụng trong nhiều lĩnh vực, ở hầu hết các nền tảng. 

* Flask

Flask là một web frameworks, nó thuộc loại micro-framework được xây dựng bằng ngôn ngữ lập trình Python. Flask cho phép bạn xây dựng các ứng dụng web từ đơn giản tới phức tạp. Nó có thể xây dựng các api nhỏ, ứng dụng web chẳng hạn như các trang web, blog, trang wiki hoặc một website dựa theo thời gian hay thậm chí là một trang web thương mại. Flask cung cấp cho bạn công cụ, các thư viện và các công nghệ hỗ trợ bạn làm những công việc trên.

Flask là một micro-framework. Điều này có nghĩa Flask là một môi trường độc lập, ít sử dụng các thư viện khác bên ngoài. Do vậy, Flask có ưu điểm là nhẹ, có rất ít lỗi do ít bị phụ thuộc cũng như dễ dàng phát hiện và xử lý các lỗi bảo mật.

### 2. Cài đặt
* Python

Vì cách cài đặt và config nó thông qua khá nhiều bước nên mình xin phép dẫn link tham khảo [tại đây.](https://o7planning.org/vi/11383/huong-dan-cai-dat-va-cau-hinh-python-tren-ubuntu-desktop) Mình thấy link này hướng dẫn khá đây đủ và chi tiết. Ngoài ra các bạn có thể tham khảo thêm rất nhiều ở một số web khác.

* Flask

Sau khi cài đặt Python và thiết lập môi trường thành công. Bạn có thể sử dụng command sau đây để cài Flask:
```
pip install Flask
```
Sau khi cài đặt xong bạn mở python và import thử để xem đả cài đặt thành công chưa nhé
```
~$ python
Python 2.7.12 (default, Dec  4 2017, 14:50:18) 
[GCC 5.4.0 20160609] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import flask
>>> 
```

Vậy là xong. Bạn có thể tham khảo thêm trên trang chủ của nó [tại đây.](http://flask.pocoo.org/docs/1.0/installation/#installation)

### 3. Tạo Server API Python với Flask
Thêm vào folder như cây thư mục sau:
```
|-projectnodejs
  |-public
      |-modules
      |-src
          |-views
          |-component
          |-app.js
          |-index.html
      |-server
          |-api 
          |-models
  |-node_module
  |-index.js
  |-package-lock.json
  |-package.json
  |-python //chứa code python
      |-server // chưa api
```
Tạo file api.py và thêm một vài dòng code như sau:
```
#python/server/api.py

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()
```
Mở terminal lên và chạy các server bằng lệnh ```nodejs index.js``` tại thự mục gốc dự án, sau đó cd vào thư mục python/server và chạy lệnh ```python api.py ``` chúng ta sẽ được thông báo như hình

![](https://images.viblo.asia/bb46989a-77ed-47fa-8205-c1d011f5d469.png)

Bây giờ chúng ta mở Browser lên và gỏ url http://127.0.0.1:5000/ chúng ta sẽ được kết quả như hình

![](https://images.viblo.asia/50349ab1-1746-4fd5-a873-46c1d2918cdf.png)

###  4. Kết nối Server Node.JS lên Server Python
Ví dụ mình sẽ tạo một action gọi lên python và nhận lại message, sau đó hiển thị message đó lên alert.

Trong directive manage-user mình tạo một button trên view và gắn sự kiện click là hàm connectPython:
```
#public/src/directive/manage-users/manage-user-template.js
<h1>{{title}}</h1>
<h4><button ng-click="refreshUsers()">Refresh</button></h4>
<h4><button ng-click="connectPython()">Connect Python</button></h4>
<table>
<th>id</th>
<th>name</th>
<th>birthday</th>
<th>age</th>
<th>sex</th>
<th>address</th>
<tbody ng-repeat="user in listUsers">
  <tr>
    <td>{{user.id}}</td>
    <td>{{user.name}}</td>
    <td>{{user.birthday | date: "dd/MM/yyyy"}}</td>
    <td>{{user.age}}</td>
    <td>{{user.sex}}</td>
    <td>{{user.address}}</td>
  </tr>
</tbody>
</table>

#public/src/directive/manage-users/manage-user-controller.js
angular.module('myApp')
  .controller('manageUserCtrl', function($scope, $http) { 'use strict';
    $scope.title = "Trang Manage User"

    $scope.refreshUsers = function() {
      var current = this;
      $http.get('/user').then(function(result) {
         $scope.listUsers = current.calAge(result.data);
      });
    }

    $scope.connectPython = function() {
    	$http.get('/connect_python').then(function(result) {
    	var data = JSON.parse(result.data.text);
        alert(data.data); 
      });
    }
})
```

Sau đó tại api user của server Node.JS ta định nghĩa một api để nhận request từ UI gửi lên và thực hiện việc gọi lên api của server Python.
```
#public/server/api/user.js
var user = require('../models/user');

module.exports = {
  configure: function(app) {
    app.get('/user', function(req, res) {
      user.get(res);
    });

    app.get('/connect_python', function(req, res) {
      user.callPython(res);
    });
  }
};

#public/server/models/user.js
var connection = require('./connection');
var request = require('superagent');
var python_url = 'http://127.0.0.1:5000'

function User() {

  this.get = function(res) {
    console.log("Get all user");
    connection.acquire(function(err, con) {
      con.query('select * from users', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.callPython = function(res) {
	request.get(python_url + '/test_connect')
	  .end(function(err, resp) {
	    res.send(resp);
	  });
  }
}
module.exports = new User();

```
Tại file api của Python ta cũng định nghĩa một api để nhận request từ Node.JS và trả response về.
```
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'
    
@app.route('/test_connect', methods=['GET'])
def test_connect():
    response = jsonify({'data':'Connect success!!!'})
    response.status_code = 200
    return response

if __name__ == '__main__':
    app.run()
```

### 5. Kết quả
Sau khi hoàn thành các bước trên, chúng ta sẽ reset lại 2 server là node và python đang chạy (Ctrl+C rồi run lại bằng 2 lệnh trên) và chúng ta sẽ được kết quả khi nhấn vào ```Connect Python``` như hình:
![](https://images.viblo.asia/45e90ed2-653f-4588-8828-9e58727ff98e.png)

Như vậy là mình đã hướng dẫn xong cách thực thêm server python vào trong dự án Node.JS cũng như cách thức hiện kết nối giữa server Node.JS và server Python. Cảm ơn các bạn đã theo dõi bài viêt. Mọi đóng góp và thắc mắc các bạn có thể comment hoặc email cho mình. Xin cảm ơn.