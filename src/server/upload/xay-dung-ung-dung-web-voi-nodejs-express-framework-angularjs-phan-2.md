Tiếp tục cho chuỗi series "Xây dựng ứng dụng web với NodeJS + Express FrameWork + AngularJS", ở phần 2 này này mình sẻ hướng đẫn tiếp cách cài đặt angular và request/response giữa nodejs(server) và angularjs(client)

Như đã hướng dẫn ở bài viết trước. Chúng ta đã tạo ra được một project web được xây dựng bằng NodeJs vs Express FrameWork. Tiếp theo mình sẽ hướng dẫn các bạn cài đặt angularjs cho project của mình.
Trước hết ta sắp xếp và tạo thư mục như bên dưới đễ có thể dễ hình dung khi làm việc vs node và angular riêng biệt.
```
|-projectnodejs
  |-public //Client
      |-modules
      |-src
  |-node_module
  |-index.js
  |-package-lock.json
  |-package.json
```
Tại thư mục gốc dự án install thêm 2 package `path` và `serve-static` bằng 2 lệnh sau
```
$ npm install path
$ npm install serve-static
```

# Cài đặt AngularJS
Sẽ có rất nhiều cách để cài đặt angularjs cho project của bạn. Tuy nhiên ở bài viết này mình xin hướng dẫn cách tải thư viện angular trực tiếp từ trang chủ.
### 1. Download thư viện AngularJS

Truy cập vào trang chủ [tại đây.](https://angularjs.org/)
Sau đó chọn option download như hình:
![](https://images.viblo.asia/06d5b837-0e4c-47a3-9798-f9c5aca2567f.png)

Giải nén file vừa download vào đường dẫn `~/projectnodejs/public/modules/` ta sẽ được 2 file `angular.js` và `angular.min.js`

### 2. Tạo trang index.html và app.js
Tại thư mục src tạo file `index.html` & `app.js` như sau:
```
/app.js
var app = angular.module('myApp', []);

app.controller('myController', myController);

function myController($scope, $http) {
  $scope.title = 'Xin chao!!!';
}
```
Mình không giới thiệu về các thành phần của angular nữa nên các bạn có gì chưa hiểu thì có thể tìm hiểu trực tiếp trên google nhé. :D

```
/index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
    <script src="../modules/angular/angular.js"></script>
    <script src="app.js"></script>
</head>
<body ng-app="myApp" ng-controller="myController">
  <h1>{{title}}</h1>
</body>
</html>
```
   * Chú ý: Trong file index.html chúng ta nhớ require thư viện angular và file app.js vào thì angular mới có thể hoạt động trên file index.html được.

Sau cho khi chạy file index.html lên chúng ta sẽ được kết quả như hình bên dưới:
![](https://images.viblo.asia/86c6dd72-b570-43bf-b6df-5ec87ce7a76c.png)

Vậy coi như là phần thiết lập angular cho project đã xong. Tiếp theo chúng ta sẽ đến với phần tạo kết nối nữa AngularJS và NodeJS

# Kết nối giữa AngularJS và NodeJS
Sửa file `index.js` tại server lại như sau:
```
/index.js
var path = require('path');
var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic(path.join(__dirname, 'public')));

//Tạo port để lắng nghe request từ client gọi lên.
app.listen(3000,function(){
    console.log('Node-server running...')
});

app.get('/', function(request, response){
  response.redirect('/src/index.html');
});
```
Tiếp theo run server bằng lệnh `node index.js` rồi truy cập vào url: `http://localhost:3000/` chúng ta sẽ được kết quả như hình phía dưới
![](https://images.viblo.asia/ca713912-e468-4c02-a9b1-b47ba73035a8.png)

### Tạo API server để gửi nhận dữ liệu với client.
Ví dụ: Chúng ta có list danh sách Users như sau:
```
[
    {id: 1, name: 'Nguyễn Văn A'},
    {id: 2, name: 'Hoàng Thị B'},
    {id: 3, name: 'Phan Huy C'}
]
```
Chúng ta sẽ biết 1 api có nhiềm vụ sẽ trả về tên tương ứng với id được gửi lên từ client.

Tại file `index.js` ta thêm vào như sau: 
```
//Tạo port để lắng nghe request từ client gọi lên.
var path = require('path');
var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic(path.join(__dirname, 'public')));

app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
});

var listUsers = [{id: 1, name: 'Nguyễn Văn A'}, {id: 2, name: 'Hoàng Thị B'}, {id: 3, name: 'Phan Huy C'}];

app.get('/', function(request, response){
  response.redirect('/src/index.html');
});

app.get('/api/getName/:userId', function(request, response){
  var userId = request.params.userId;
  var user = listUsers.find(u => u.id == userId)
  if(user)
    response.send(user.name);
  else
    response.send('User not found!!!')
});
```
Tại file `index.htmt` và `app.js` ở client ta thêm vào như sau:
```
/index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
    <script src="../modules/angular/angular.js"></script>
    <script src="app.js"></script>
</head>
<body ng-app="myApp" ng-controller="myController">
  <h1>{{title}}</h1>
  <input type="" name="" ng-model="userId"><button ng-click="getName()">Get</button>
  <h3>Ket qua: {{userName}}</h3>
</body>
</html>
```
```
/app.js
var app = angular.module('myApp', []);

app.controller('myController', myController);

function myController($scope, $http) {
  $scope.title = 'Xin chao!!!';
  $scope.userName = '';
  $scope.userId = 0;

  $scope.getName = function() {
    $http.get('/api/getName/' + $scope.userId).then(function(result) {
      $scope.userName = result.data;
    });
  }
}
```
Và đây là kết quả:
![](https://images.viblo.asia/44d0a791-0713-4972-bd27-d4c531a1fd3e.png)


Ở bài viết tiếp theo mình sẽ hướng dẫn tiếp cách kết nối và làm việc với mysql từ nodejs. 
Bài viết không tránh khỏi thiếu sót, rất mong mọi người cùng góp ý và thảo luận.
##### Cảm ơn mọi người đã đón đọc.