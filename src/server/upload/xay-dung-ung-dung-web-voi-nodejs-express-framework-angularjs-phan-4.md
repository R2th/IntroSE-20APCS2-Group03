Như đã nói ở phần trước tiếp tục cho chuỗi series "Xây dựng ứng dụng web với NodeJS + Express FrameWork + AngularJS", ở phần 4 này mình sẽ hướng dẫn tiếp cho các bạn cách để cấu hình cho ứng dụng web của mình theo dạng Single Page Application (SPA).

## Khái niệm Single Page Application (SPA)
Nói đơn giản, SPA có một trang gốc và trong trang gốc đó, chúng ta có thể tải nhiều trang con (tương ứng với các thành phần của trang gốc) mà không gây bất kì ảnh hưởng gì tới trang gốc. SPA chỉ load phần trang cần thiết, khác với ứng dụng web truyền thống (tải lại toàn bộ trang) khi chúng ta tương tác với trang web (như thực hiện việc điều hướng).Trong một SPA chúng ta chỉ việc load các thành phần chung (của trang gốc) một lần duy nhất, các thành phần chung này (header, footer, menu…) thường xuất hiện ở nhiều trang của ứng dụng. Ví dụ khi bạn đang ở trang chủ thì sẽ có header, footer là thành phần chung, bây giờ mình chuyển sang trang Giới thiệu chẳng hạn, thì mình chỉ load lại phần nội dung giới thiệu, còn header, footer giữ nguyên.

## Triễn khai
Đầu tiên thì chúng ta thêm vào như mục như cây bên dưới đây:
```
|-projectnodejs
  |-public
      |-modules
      |-src
          |-views //Nơi chứa các page 
          |-component //Chứa các gói component(bao gồm cả controller, directive, template)
          |-app.js
          |-index.html
      |-server
          |-api 
          |-models
  |-node_module
  |-index.js
  |-package-lock.json
  |-package.json
```

Ở đây mình dùng thư mục src/views để chứa các trang tương ứng như các trang web. Tuy nhiên là các trang này chỉ chứa các phần cần thay đổi. Còn các phần chung(như header, footer, menu…) thì đều được đặt trong file index.html

Để cho việc quản lý trực quan và dùng lại các chức năng thì mình sẽ quản lý các page hoặc các module trong page thành các componen. Mỗi conponent chúng ta sẽ định nghĩa một directive(giống như các directive của angular như ng-if, ng-show, ng-repeat...) và template, controller để điều kiển directive đó nếu cần. Và ở từng view chúng ta chỉ cần gọi lại các directive cần thiết cho page đó là xong.
### 1. Thêm thư viện UI-Router
UI-Router là một “routing framework” cho AngularJS. UI-Router là một sự thay thế hoàn hảo cho module ngRouter trong AngularJS để xây dựng các trang web dạng SPA. Trong khi ngRouter hoạt động dựa trên routes URL thì UI-Router tổ chức dữ liệu thành từng phần theo từng $state cho từng truy vấn URL.

Chúng ta thêm thư viện đó vào thư mục modules và thay đổi lại các file như sau:
```html
// index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
    <script src="../modules/angular/angular.js"></script>
    <script src="app.js"></script>
    <script src="../modules/@uirouter/angularjs/release/angular-ui-router.js"></script>
</head>
<nav style="height: 30px; background-color: black;color: white;text-align: center;padding-top: 10px;">
  <div>Đây Là Header</div>
</nav>
<body ng-app="myApp">
  <div class="container">
    <div ui-view></div>
  </div>
</body>
<nav style="height: 30px; background-color: black;color: white;text-align: center;padding-top: 10px;">
  <div>Đây Là Footer</div>
</nav>
</html>
```
Theo như đoạn HTML trên thì các phần như header footer sẽ chỉ tải duy nhất một lần. còn lại các view sẽ được thay thế ở trong thẻ div có directive `ui-view`

### 2. Định nghĩa directive mới
Tiếp theo chúng ta sẽ tạo một directive mới tên là `drt-manage-user`. Directive này có nhiệm vụ là hiễn thị danh sách toàn bộ user như trong ví dụ ở phần 3.

Trong thư mục component ta tạo 1 folder có tên là manage-users. Trong đó chứa 3 file directive, template, controller(có thể có hoặc không tùy thuộc vào directive mà mình tạo).
```javascript
/manage-users/manage-user-directive.js
angular.module('myApp')
  .directive('drtManageUser', function() { 'use strict';
    return {
      restrict: 'E',
      templateUrl: 'directive/manage-users/manage-user-template.html',
      controller: 'manageUserCtrl',
      controllerAs: 'ctrl
    };
  });
```
```javascript
/manage-users/manage-user-controller.js
angular.module('myApp')
  .controller('manageUserCtrl', function($scope, $http) { 'use strict';
    $scope.title = "Trang Manage User"
    $scope.getListUsers = function(){ 
      $http.get('/user').then(function(result) { 
        $scope.listUsers = result.data; 
      }); 
    } 
    $scope.getListUsers(); 
})
```
```javascript
/manage-users/manage-user-template.js
<h1>{{title}}</h1> 
<table> 
<th>id</th> 
<th>name</th> 
<th>birthday</th> 
<th>sex</th> 
<th>address</th> 
<tbody ng-repeat="user in listUsers"> 
  <tr> 
    <td>{{user.id}}</td> 
    <td>{{user.name}}</td> 
    <td>{{user.birthday | date: "dd/MM/yyyy"}}</td> 
    <td>{{user.sex}}</td> 
    <td>{{user.address}}</td> 
  </tr> 
</tbody> 
</table> 
```

### 3. Thêm trang view và routing đến nó
Trong thư mục views chúng ta tạo trang user.html, trang này sẽ chứa directive manage-user và mình vừa định nghĩa ở trên. Sau này khi phát triễn thêm các chức năng khác cho trang user này thì chúng ta chỉ cần định nghĩa tương tự các directive mà gọi nó ở đây là xong.
```html
/views/user.html
<drt-manage-user></drt-manage-user>
```
Như trong mục 1. Bây giờ chúng ta sẽ dùng ui-router để cấu hình đến trang view chúng ta vừa tạo. Chúng ta sẽ sửa lại file app.js như sau:
```javascript
/app.js
var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/user'); //Mọi đường dẫn không hợp lệ đều được chuyển đến state user

    $stateProvider.state('user', {
      url: '/user',
      templateUrl: 'views/user.html'
    });
});
```
Tương tự cho các view khác. Chúng ta sẽ khai báo các state và trỏ đến view như trang user. Để chuyển đến một trang khác thì chỉ đơn giản chúng ta sẽ sử dụng directive `ui-sref` hoặc là hàm `$state.go(<tên state>)`.

Ví dụ: Tạo một liên kết đến trang user bằng thẻ a: `<a ui-sref="user">Manage User</a>`. Hoặc chuyển đến trang user dùng js: `$state.go('user');`

Cuối cùng, chúng ta sẽ require thêm 2 file js trong component vừa tạo vào file index.html:
```html
/index.html
<script src="component/manage-users/manage-user-directive.js"></script>
<script src="component/manage-users/manage-user-controller.js"></script>
```

Và đây là kết quả khi chạy:
![](https://images.viblo.asia/a0481eb1-7d11-4a03-9276-1298f64d3c4b.png)

Vậy là mình vừa hướng dẫn xong cách thiết lập một Single Page Application. Hi vọng bài viết sẽ có ích đối với tất cả các bạn. Ở bài viết tiếp theo, mình sẽ hướng dẫn tiếp cách load đưa dữ liệu hoặc định nghĩa hàm từ router để sử dụng trong directive. Mong nhận được sự góp ý của tất cả các bạn.