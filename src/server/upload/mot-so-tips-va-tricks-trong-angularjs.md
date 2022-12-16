# 1.Sử dụng $parsers và $formatters
* $parsers thay đổi các giá trị hiển thị bên View sẽ được lưu trong Model
* $formatters thay đổi các giá trị biến trong Model sẽ được đưa ra View
* Khi có 1 directive và tương tác với một ng-Model, có thể sử dụng $parsers và $formatters để kiểm soát giá trị thực của Model hoặc render model ra phần View. 
* ng-Model có thể chứa bất kỳ giá trị nào cần trong khi render ra view.

Ví dụ: lưu trữ một đối tượng làm model value, nhưng render một số trong input field

```
.directive('datetime', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {

            ngModelController.$parsers.push(function(value) {
                return new Date(value).getTime();
            });

            ngModelController.$formatters.push(function(value) {
                return new Date(value).toString();
            });
        }
    };
});
```

$parsers phân tích giá trị chuỗi từ input fields vào thành model value, $ formatters định dạng model value để hiển thị trong View

# 2.Event bubbling và Multiple ng-click
AngularJS vẫn là Javascript nên mọi thứ cần biết về vanila JS cũng có thể áp dụng cho Angular
Có thể dùng "delegation, prevent default và stop event propagation".

Ví dụ
```
<div class="col-xs-2">
    <button class="btn btn-link" ng-hide="!isCollapsed" ng-click="switchSearch()">Advanced Search</button>
    <button class="btn btn-link" ng-hide="isCollapsed"  ng-click="switchSearch()">Basic Search</button>
</div>
```

Lưu ý, 2 button ng-Click gọi cùng chức năng trong Event này. Có thể giảm số lượng trình xử lý sự kiện xuống và tối ưu hóa hơn bằng cách:

```
<table class="table table-bordered table-condensed">
    <tr ng-repeat="row in rows">
        <td ng-repeat="cell in row.cells" ng-click="activate(cell)" ng-class="{active: active}">{{cell.text}}</td>
    </tr>
</table>
```

Cách xử lý event trong controller
```
$scope.activate = function(cell) {
    cell.active = true;
};
```
Tuy nhiên, trong trường hợp có nhiều cột và hàng, sử dụng một ngClick sẽ gọn hơn.
```
<table class="table table-bordered table-condensed" ng-click="activate($event)">
    <tr ng-repeat="row in rows">
        <td ng-repeat="cell in row.cells" ng-class="{active: active}">{{cell.text}}</td>
    </tr>
</table>
```
với Controller.js
```
$scope.activate = function($event) {
    var scope = angular.element($event.target).scope();
    scope.cell.active = true;
};
```
angular.element ($ event.target) .scope () là một cách để giữ đối tượng phạm vi con hiện tại. Lợi thế là có ít chỉ thị và xử lý sự kiện.
# 3. Sử dụng $parse service
$parse service thường được sử dụng bên trong custom directive.
Ở ví dụ dưới đây, $scope.adapters được khởi tạo với cấp độ lồng nhau như sau
```
$scope.adapters = {
    outbound: {
        tcp: {
            status: 'on'
        }
    }
};
```

Nếu muốn đặt trạng thái của bộ chuyển đổi trong p2r, chúng ta cần kiểm tra xem tất cả các cấp trước đó có tồn tại không:
```
if ($scope.adapters && $scope.adapters.inbound && $scope.adapters.inbound && $scope.adapters.inbound.p2r) {
    $scope.adapters.inbound.p2r = false;
}
```

Với $parse service mọi thứ trở nên đơn giản hơn
`$parse('adapters.inbound.p2r.status').assign($scope, false);`
# 4. Đặt tiêu đề trang trong cài đặt Route
```
$routeProvider.when("/profile", {
    controller: "profileController",
    templateUrl: "profile/profile.html",
    title: "App | Profile"
});
```

Tuy nhiên, AngularJS sẽ không tự động lấy "tiêu đề" và đặt vào trang, vì vậy cần thêm một ít code để làm cho nó hoạt động như bình thường. 

```
.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);
```

# 5. Page not found và $routeProvider
* Khi xác định các route bằng cách sử dụng $routeProvider, thông thường nên cấu hình thuộc tính redirectTo trong phần khác của route config. 
* Nếu route không được tìm thấy  thì ứng dụng sẽ chuyển hướng đến trang chủ chẳng hạn. 
* Tuy nhiên, vẫn có thể sử dụng các thuộc tính của controller  và templateUrl. Ví dụ:

```
$routeProvider.otherwise({
    controller: "404Controller",
    templateUrl: "404.html"
});
```

**Cảm ơn các bạn đã theo dõi bài viết đến đây!**

Link tham khảo : 
*  https://stackoverflow.com/questions/22841225/ngmodel-formatters-and-parsers
*  http://dfsq.info/site/read/couple-of-angularjs-tricks