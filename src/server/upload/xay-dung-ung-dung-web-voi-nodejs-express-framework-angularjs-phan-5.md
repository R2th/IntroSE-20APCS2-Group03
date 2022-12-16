Xin chào mọi người, quay lại với chuỗi serial chủ đề về NodeJs của mình, ở bài viết này mình sẽ hướng dẫn tiếp cách load đưa dữ liệu trước hoặc định nghĩa trước các hàm cần thiết từ router để sử dụng trong directive.
Trong rất nhiều bài toán với việc load 1 lượng dữ liệu lớn, và để đảm bảo trải nghiệm tốt nhất cho người dùng thì việc load dữ liệu trước khi hiển thị page là một điều hết sức cần thiết. Hay là chúng ta muốn định nghĩa các phương thức để dùng chung tránh việc lặp code.

Tất nhiên bài viết lần này sẽ kế thừa toàn bộ sourcode từ các phần trước. Và trước khi bắt đầu chúng ta cùng xem lại cấu trúc thư mục:
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
```

Ví dụ cho bài toán này mình sẽ đặt ra một đề bài như sau: "Load trước toàn bộ thành viên đang có trong bảng user trước khi load page, và đồng thời tính toán tuổi và thêm 1 thuộc tính age cho từng user. Trên page sẽ tạo 1 button Refresh để làm mới lại danh sách user."

Phân tích đề bài trên thì ta thấy. Trước hết là phải load được danh sách user trước khi load page, thứ 2 là hàm tình tuổi sẽ vừa được dùng sau khi lấy danh sách user và được dùng sau khi Refresh danh sách user.

### 1. Load dữ liệu từ Database trước khi load page.
Trong phần router ta code thêm như sau:
```
/app.js
var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/user'); //Mọi đường dẫn không hợp lệ đều được chuyển đến state home

  $stateProvider.state('user', {
    url: '/user',
    templateUrl: 'views/user.html',
    resolve: {
      listUsers: function($http) {
        return $http.get('/user').then(function(result) {
          return result.data; //get all user
        });
      }
    },
    controller: function(listUsers) {
      this.listUsers = listUsers;
    },
    controllerAs: 'userCtrl'
  });
});
```
Với cách viết như vậy khi khi chuyển đến trang user. Chúng ta sẽ thực hiện việc lấy toàn bộ danh sách user từ server sau đó đưa nó vào userCtrl.

Tiếp theo chúng ta cần sửa lại trang view và directive manage-user:
```
/views/user.html
<drt-manage-user list-users="userCtrl.listUsers"></drt-manage-user>
<!-- Gọi đến directive manage-user với tham số truyền vào là list-users -->
```
```
/directive/manage-users/manage-user-directive.js
angular.module('myApp')
  .directive('drtManageUser', function() { 'use strict';
    return {
      restrict: 'E',
      templateUrl: 'directive/manage-users/manage-user-template.html',
      controller: 'manageUserCtrl',
      controllerAs: 'ctrl',
      scope: {
        listUsers: '='
      }
    };
  });
```
```
/directive/manage-users/manage-user-controler.js
angular.module('myApp')
  .controller('manageUserCtrl', function($scope, $http) { 'use strict';
    $scope.title = "Trang Manage User"
})
```
Sau khi xong và chạy lại server thì chúng ta được kết quả như hình. Và hoàn toàn hết cảm giác bị giật so với cách load data từ controller của directive như trước
![](https://images.viblo.asia/c409c2d6-6bb8-442f-9cfb-519dc5cb5b6c.png)

### 2. Định nghĩa phương thức dùng chung.
Chúng ta sẽ chỉnh sửa lại directive manage-user như sau:
```
/directive/manage-users/manage-user-template.js
<h1>{{title}}</h1>
<h4><button ng-click="refreshUsers()">Refresh</button></h4>
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

```
```
/directive/manage-users/manage-user-directive.js
angular.module('myApp')
  .directive('drtManageUser', function() { 'use strict';
    return {
      restrict: 'E',
      templateUrl: 'directive/manage-users/manage-user-template.html',
      controller: 'manageUserCtrl',
      controllerAs: 'ctrl',
      scope: {
        listUsers: '='
      },
      link: function(ctrl) {
        ctrl.calAge = function(users) {
          var current=new Date().getFullYear();
          users.forEach(function(u) {
            u.age = current - (new Date(u.birthday)).getFullYear();
          });
          return users;
        }
        ctrl.listUsers = ctrl.calAge(ctrl.listUsers);
      }
    };
  });
```
```
/directive/manage-users/manage-user-controler.js
angular.module('myApp')
  .controller('manageUserCtrl', function($scope, $http) { 'use strict';
    $scope.title = "Trang Manage User"

    $scope.refreshUsers = function() {
      var current = this;
      $http.get('/user').then(function(result) {
         $scope.listUsers = current.calAge(result.data);
      });
    }
})
```
Như vậy phương thức calAge() được định nghĩa 1 lần trong directive để dùng cho việt tính toán trước khi load page, đồng thời cũng dùng lại trong controller sau khi lấy lại danh sách user mới.

### Kết luận.
Hi vọng với chia sẽ trên của mình các bạn sẽ có cách để tối ưu hóa dự án của mình để nó hoạt động một cách trơn tru hơn. Bài viết không tránh khỏi thiếu sót mong nhận được sự góp ý của tất cả mọi người. Cảm ơn mọi người đã đón đọc.