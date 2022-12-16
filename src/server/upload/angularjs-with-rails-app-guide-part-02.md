Chào các bạn, hôm nay chúng ta cùng nhau tìm hiểu tiếp tục về `AngularJS` đã được giới thiệu ở [bài viết tháng trước](https://viblo.asia/p/angularjs-with-rails-app-guide-part-01-m68Z0R665kG#_phan-2-4) nhé. Hôm nay sẽ là phần 02 của `AngularJS with Rails app Guide`.
# Tạo và sử dụng `Controller behaviors`

Controller định nghĩa các `behavior` trong scope. `Behaviors` là những function xử lý data theo logic và hiển thị lên màn hình. `Behaviors` sẽ được controller định nghĩa ra nó sử dụng để hỗ trợ hiển thị data cho User và update model dựa trên các tương tác của User.

Để hiểu rõ thêm về `Behavior` thì chúng ta cùng thêm đoạn code sau - Hình ảnh mô tả sẽ có ở phần dưới:

```
***
File app/views/static_page/show.html.erb
***

<div ng-controller="staticPageController as vm" class="container">
    <div class="py-5 text-center">
      <h1>Test app with user's name: "{{models.user}}"</h1>
      <p class="lead">Items length is: {{models.items.length}}</p>
      <p ng-hide="inCompleteCount() == 0">Incompleted count is: {{inCompleteCount()}}</p>
    </div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Add new item">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button">Add</button>
      </div>
    </div>
    <div class="row">
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <td>Description</td>
              <td>Done</td>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="item in models.items">
              <td>{{item.action}}</td>
              <td><input type="checkbox" ng-model="item.done"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>
```

```
***
File app/assets/javascripts/angular/controllers/static_page_controller.js
***
"use strict";

angular.module("userApp")
  .controller("staticPageController", staticPageController);

function staticPageController($scope) {
  var vm = this;
  var models = {
    user: "Test user",
    items: [
      {action: "Test action 1", done: false},
      {action: "Test action 1", done: false},
      {action: "Test action 3", done: true}
    ]
  };

  $scope.models = models;
  $scope.inCompleteCount = function() {
    var count = 0;
    angular.forEach($scope.models.items, function(item) {
      if(!item.done) count ++;
    });

    return count;
  }
}
```

**Hình ảnh mô tả kết quả:**

![](https://images.viblo.asia/8410b89d-4c1c-445b-98a5-17bc1514c9f4.png)

**Giải thích:**
```
$scope.inCompleteCount = function() {
    var count = 0;
    angular.forEach($scope.models.items, function(item) {
      if(!item.done) count ++;
    });

    return count;
  }
```
====> `Behaviors` đã được định nghĩa bởi việc thêm `functions` vào trong object `$scope`. Chúng ta đã thêm function trả về số lượng các item chưa completed (incompleted) bằng cách lặp qua `$scope.models.items` và tăng count mỗi khi `item.done` là false.


-----
```
<p ng-hide="inCompleteCount() == 0">Incompleted count is: {{inCompleteCount()}}</p>
```
Để gọi `behavior` trên thì chúng ta sử dụng cặp ngoặc `{{}}`, ngoài ra còn sử dụng thêm directive `ng-hide` nữa. Directive `ng-hide` sẽ ẩn đối tượng nếu thoả mản điều kiện đứng sau `ng-hide`. Trong trường hợp trên thì sẽ ẩn thẻ <p> khi `không tất cả các item đã được done hết rồi.

# Sử dụng behavior dựa trên behavior khác

```
***
File app/views/static_page/show.html.erb
***

<div ng-controller="staticPageController as vm" class="container">
    <div class="py-5 text-center">
      <h1>Test app with user's name: "{{models.user}}"</h1>
      <p class="lead">Items length is: {{models.items.length}}</p>
      <span ng-hide="inCompleteCount() == 0"
        class="badge"
        ng-class="warningLevel()">
        Incompleted count is: {{inCompleteCount()}}
      </span>
    </div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Add new item">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button">Add</button>
      </div>
    </div>
    <div class="row">
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <td>Description</td>
              <td>Done</td>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="item in models.items">
              <td>{{item.action}}</td>
              <td><input type="checkbox" ng-model="item.done"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>
```

```
***
File app/assets/javascripts/angular/controllers/static_page_controller.js
***

"use strict";

angular.module("userApp")
  .controller("staticPageController", staticPageController);

function staticPageController($scope) {
  var vm = this;
  var models = {
    user: "Test user",
    items: [
      {action: "Test action 1", done: false},
      {action: "Test action 1", done: false},
      {action: "Test action 3", done: true}
    ]
  };

  $scope.models = models;
  $scope.inCompleteCount = function() {
    var count = 0;
    angular.forEach($scope.models.items, function(item) {
      if(!item.done) count ++;
    });

    return count;
  }

  $scope.warningLevel = function() {
    return $scope.inCompleteCount() < 3 ? "badge-success" : "badge-warning";
  }
}
```

**Hình ảnh mô tả:**

![](https://images.viblo.asia/a26b37a5-2e4a-49fa-b77c-c9976e04405a.png)

![](https://images.viblo.asia/47e23972-2b65-4f2d-8abe-a35c0901e8b3.png)

**Giải thích:**
```
$scope.warningLevel = function() {
    return $scope.inCompleteCount() < 3 ? "badge-success" : "badge-warning";
  }
```
Behavior `warningLevel` có nhiệm vụ trả về CSS class dựa trên điều kiện nếu số lượng incomplete item bé hơn 3 thì trả về `"badge-success"`, ngược lại là `"badge-warning"`.

-----

```
<span ng-hide="inCompleteCount() == 0"
    class="badge"
    ng-class="warningLevel()">
    Incompleted count is: {{inCompleteCount()}}
</span>
```

Sử dụng behavior trên bằng `ng-class` để thay đổi CSS tương ứng với từng điều kiện.

# Tạo behavior tương tác với User
Chúng ta sẽ tiến hành thêm button `Add` một item mới với `action` dựa trên User nhập vào, như sau:


```
***
File app/views/static_page/show.html.erb
***

<div ng-controller="staticPageController as vm" class="container">
    <div class="py-5 text-center">
      <h1>Test app with user's name: "{{models.user}}"</h1>
      <p class="lead">Items length is: {{models.items.length}}</p>
      <span ng-hide="inCompleteCount() == 0"
        class="badge"
        ng-class="warningLevel()">
        Incompleted count is: {{inCompleteCount()}}
      </span>
    </div>
    <div class="input-group mb-3">
      <input type="text" class="form-control"
        placeholder="Add new item"
        ng-model="actionText">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary"
          ng-click="addNewItem(actionText)"
          type="button">Add</button>
      </div>
    </div>
    <div class="row">
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <td>Description</td>
              <td>Done</td>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="item in models.items">
              <td>{{item.action}}</td>
              <td><input type="checkbox" ng-model="item.done"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>
```

```
***
File app/assets/javascripts/angular/controllers/static_page_controller.js
***

"use strict";

angular.module("userApp")
  .controller("staticPageController", staticPageController);

function staticPageController($scope) {
  var vm = this;
  var models = {
    user: "Test user",
    items: [
      {action: "Test action 1", done: false},
      {action: "Test action 1", done: false},
      {action: "Test action 3", done: true}
    ]
  };

  $scope.models = models;
  $scope.inCompleteCount = function() {
    var count = 0;
    angular.forEach($scope.models.items, function(item) {
      if(!item.done) count ++;
    });

    return count;
  }

  $scope.warningLevel = function() {
    return $scope.inCompleteCount() < 3 ? "badge-success" : "badge-warning";
  }

  $scope.addNewItem = function(actionText) {
    $scope.models.items.push({action: actionText, done: false});
  }
}
```

**Hình ảnh mô tả:**

![](https://images.viblo.asia/5fdbbc12-8520-4c9e-b8a3-c24dbd24f030.png)

Hình trên cho thấy chúng ta đã thêm 2 item mới là `Test` và `ABC` thành công.

**Giải thích:**

```
$scope.addNewItem = function(actionText) {
    $scope.models.items.push({action: actionText, done: false});
  }
```

Định nghĩa behavior `addNewItem` để thêm vào cuối mảng `$scope.models.items` một Item nhất định với action là `actionText` được truyền vào từ tham số, `done` được thêm mặc định là false.


-----

```
<input type="text" class="form-control"
    placeholder="Add new item"
    ng-model="actionText">
<div class="input-group-append">
    <button class="btn btn-outline-secondary"
      ng-click="addNewItem(actionText)"
      type="button">
      Add
    </button>
</div>
```

Thêm ng-model là `actionText` như ở bài viết phần 01 đã trình bày, sau đó truyền nó vào ng-click để behavior `addNewItem` có được `actionText`.

# Sắp xếp data model

Trong phần này, chúng ta sẽ thêm `filter` và `orderBy` cho dữ liệu `$scope.models.items`.

```
<tr ng-repeat="item in models.items | filter: {done: false} | orderBy: 'action'">
```

Thay đổi <tr> trong <table> như trên, ta được:
    
![](https://images.viblo.asia/3ee8246b-41bb-434b-9b2b-469792a8cea5.png)

**Giải thích:**

Trong thẻ <tr> trên ta đã thêm phần `filter` riêng cho những item mà `done` là `false` và chỉ hiển thị những item thỏa mãn điều kiện này. Sau đó sẽ bắt đầu `orderBy` theo property `action` của object item.
    
Chú ý là phần thuộc tính được orderBy sẽ nằm trong cặp nháy đơn `' '`.
    
# Nâng cấp phần filter
Chúng ta cùng định nghĩa `custom filter` nào:

```
***
File app/views/static_page/show.html.erb
***
<div ng-controller="staticPageController as vm" class="container">
    <div class="py-5 text-center">
      <h1>Test app with user's name: "{{models.user}}"</h1>
      <p class="lead">Items length is: {{models.items.length}}</p>
      <span ng-hide="inCompleteCount() == 0"
        class="badge"
        ng-class="warningLevel()">
        Incompleted count is: {{inCompleteCount()}}
      </span>
    </div>
    <div class="input-group mb-3">
      <input type="text" class="form-control"
        placeholder="Add new item"
        ng-model="actionText">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary"
          ng-click="addNewItem(actionText)"
          type="button">Add</button>
      </div>
    </div>
    <div class="row">
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <td>Description</td>
              <td>Done</td>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="item in models.items | checkedItems: showComplete | orderBy: 'action'">
              <td>{{item.action}}</td>
              <td><input type="checkbox" ng-model="item.done"></td>
            </tr>
          </tbody>
        </table>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" ng-model="showComplete" id="showComplete">
          <label class="form-check-label" for="showComplete">Show Complete</label>
        </div>
      </div>
    </div>
</div>
```

```
***
File app/assets/javascripts/angular/controllers/static_page_controller.js
***

"use strict";

angular.module("userApp")
  .controller("staticPageController", staticPageController);

function staticPageController($scope) {
  var vm = this;
  var models = {
    user: "Test user",
    items: [
      {action: "Test action 1", done: false},
      {action: "Test action 1", done: false},
      {action: "Test action 3", done: true}
    ]
  };

  $scope.models = models;
  $scope.inCompleteCount = function() {
    var count = 0;
    angular.forEach($scope.models.items, function(item) {
      if(!item.done) count ++;
    });

    return count;
  }

  $scope.warningLevel = function() {
    return $scope.inCompleteCount() < 3 ? "badge-success" : "badge-warning";
  }

  $scope.addNewItem = function(actionText) {
    $scope.models.items.push({action: actionText, done: false});
  }
}
```

```
***
FILE app/assets/javascripts/angular/filters/checked_items_filter.js
***

angular.module("userApp").filter("checkedItems", function() {
  return function(items, showComplete) {
    var resultArr = [];
    angular.forEach(items, function(item) {
      if(item.done == false || showComplete == true) resultArr.push(item);
    });

    return resultArr;
  }
});
```

```
***
FILE app/assets/javascripts/application.js
***

//= require rails-ujs
//= require activestorage
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require angular/lib/angular.min
//= require angular/app/user_app
//= require_tree ./angular/controllers/
//= require_tree ./angular/filters/
//= require_tree .
```

**Hình ảnh mô tả:**

![](https://images.viblo.asia/f7ce7532-ca10-44e0-92f3-b9c0bbe72689.png)

**Giải thích:**

Chúng ta tạo custom filter ở thư mục `app/assets/javascripts/angular/filters/checked_items_filter.js`
và sau đó thêm require cho nó vào `application.js` như trên.

```
angular.module("userApp").filter("checkedItems", function() {
  return function(items, showComplete) {
    var resultArr = [];
    angular.forEach(items, function(item) {
      if(item.done == false || showComplete == true) resultArr.push(item);
    });

    return resultArr;
  }
});
```

Đoạn code trên sẽ nhận tham số `showComplete` và kiểm tra nếu nó là true thì sẽ hiển thị toàn bộ data, nếu là false thì sẽ check xem item đó có false hay không, nếu có mới thêm vào danh sách hiển thị.

Method `filter` định nghĩa bởi `AngularJS` chính là một module object được sử dụng để tạo ra factory filter, có nhiệm vụ trả về data sau khi được filter. 

-----

```
<tr ng-repeat="item in models.items | checkedItems: showComplete | orderBy: 'action'">
```

Ở phần view, chúng ta thay filter bằng tên của custom-filter (là checkedItems) và truyền tham số `showComplete` (là ng-model được định nghĩa ở checkbox bên trên).

# Tổng kết
Ở phần 02 này chúng ta đã tìm hiểu được:
* Tạo và sử dụng behavior.
* Sử dụng behavior dựa trên các behavior khác.
* Sử dụng filter, orderBy.
* Tạo custom filter.


Đến đây đã thấy bài viết dài rồi, mình xin tạm dừng tại đây. Hẹn gặp các bạn ở phần 03.