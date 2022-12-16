Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về các loại scope trong directive của AngularJS. Nếu chưa biết rõ về AngularJS Framework, cách bạn có thể tham khảo đường dẫn sau: https://angularjs.org/

1. Tổng quan về scope
Scope nắm giữ giá trị của các biến trong controller của angularjs, có thể tưởng tượng rằng scope như một data model của directive. Mà ở đó các directive có thể tham gia vào các $digest của các ứng dụng. Khi chúng ta định nghĩa 1 directive, giá trị được gán cho scope property sẽ định nghĩa kiểu (type) directive được tạo ra. Ở một mức độ cao hơn, scope bao gồm : parent, new và isolate.

Scope bên trong một directive
Tất cả các directives đều có một scope liên kết với chúng. Directive sử dụng scope cho việc truy xuất data/methods bên trong các template và link function. Mặc định, trừ khi thiết lập một cách rõ ràng, directive không tạo ra scope của chính nó. Do đó, chỉ sử dụng parent scope (thường là controller) như là của riêng của nó.

Tuy nhiên, AngularJS cho phép chúng ta thay đổi default scope của directives bằng cách truyền vào configuration object như là một directive definition object. Một directive definition object –– được gọi tắt là DDO –– một đối tượng đơn giản trong JavaScript sử dụng để cấu hình hành vi directive, template…

var app = angular.module("test",[]);
app.directive("myDirective",function(){
  return {
      restrict: "EA",
      scope: true,
      link: function(scope,elem,attr){
          // code goes here ...
      }
  }
 });
Trong ví dụ trên, chúng ta tạo ra một directive bằng cách trả về một DDO từ function. Có rất nhiều thuộc tính của DDO có thể đề cập nhưng trong bài viết này chúng ta chỉ thảo luận về các cách thao tác với scope.

2. Parent scope
Để dễ dàng hiểu hơn về định nghĩa Parent Scope, hãy tưởng tượng nếu chúng ta loại bỏ scope property từ một đối tượng mà directive định nghĩa & sau đó directive ko tạo ra scope mới, thay vào đó là thừa hưởng scope từ parent (ví dụ như controller,…). Điều này mặc nhiên tạo ra ràng buộc 2 chiều trên tất cả các thuộc tính của parent scope. Không có kế thừa, chỉ đơn giản là thao tác trực tiếp với scope như trên Parent của chúng. Ví dụ:

Parent Scope

(function(ng, ddc) {
    ddc = ng.module('ddc', []);

    ddc.controller('DdcController', ['$scope',
        function($scope) {
            $scope.presenters = [ 'Anthony B.', 'Dave D.',
                'Jon H.', 'Michael H.', 'Rob F.'
            ];
        }
    ]);

    ddc.directive('ddcPresenter', function() {
        return {
            restrict: 'E',
            templateUrl: '/template.html',
            replace: true
        };
    });
}(angular));
JsFiddle: http://jsfiddle.net/founddrama/FuBw3/light/

3. New scope
Phức tạp hơn đôi chút, nếu chúng ta thiết lập scope cho đối tượng định nghĩa directive là true, sau đó AngularJS sẽ dựa vào các nguyên tắc thừa kế mà tạo ra các phiên bản mới cho parent scope tương ứng với directive, khi đó sẽ sinh ra ràng buộc 1 chiều cho tất cả các thuộc tính của scope. Hãy quan sát sự khác biệt giữa cách thức phạm vi ràng buộc làm việc cho các ddc-presenter và ddc-foo directive trong fiddle bên dưới:

New Scope

(function(ng, ddc) {
    ddc = ng.module('ddc', []);

    ddc.controller('DdcController', ['$scope',
        function($scope) {
            $scope.presenters = [
                {name:'Anthony B.'},
                {name:'Dave D.'},
                {name:'Jon H.'},
                {name:'Michael H.'},
                {name:'Rob F.'}
            ];

            $scope.foo = 'bar';
        }
    ]);

    ddc.directive('ddcPresenter', function() {
        return {
            restrict: 'E',
            templateUrl: '/template.html',
            replace: true,
            scope: true
        };
    });

    ddc.directive('ddcFoo', function() {
        return {
            restrict: 'E',
            templateUrl: '/ddc-foo.html',
            replace: true,
            scope: true
        };
    });
}(angular));
JsFiddle: http://jsfiddle.net/founddrama/sWY7B/light/

4. Isolate scopes
Tuy nhiên được sử dụng nhiều nhất vẫn là Isolate Scope. Bằng cách khai báo scope property trên một directive là 1 object, chúng ta có thể tạo ra một thực thể scope mới độc lập vs parent và không kế thừa từ nó. Nhưng điều này không có nghĩa là chúng ta có thể thao tác với dữ liệu một cách vô tội vạ, bởi chúng ta có thể sẽ làm thay đổi giá trị của parent scope với thuộc tính $parent. Quan sát ví dụ bên dưới:

var app = angular.module("test",[]);

app.controller("Ctrl1",function($scope){
    $scope.name = "Harry";
    $scope.reverseName = function(){
        $scope.name = $scope.name.split('').reverse().join('');
    };
});
app.directive("myDirective", function(){
    return {
        restrict: "EA",
        scope: {},
        template: "<div>Your name is : {{name}}</div>"+
        "Change your name : <input type='text' ng-model='name'/>"
    };
});
Ở đây chúng ta tạo ra một isolated scope, cần lưu ý rằng mặc dù Parent Scope có name là Harry nhưng textbox bên trong Directive vẫn có giá trị blank vì chúng hoàn toàn độc lập.

Một điều quan trọng khác để biết về Isolate Scope là thuộc tính được khai báo với một trong ba biểu tượng đặc biệt để chỉ các loại ràng buộc. Những biểu tượng đó là:

@
=
&
Để hiểu rõ hơn, chúng ta hãy cùng tìm hiểu từng cách mà AngularJS cho phép ràng buộc dữ liệu:

4.1. One-way bindings (@)
@ (ràng buộc 1 chiều) sử dụng phép nội suy kí tự để khởi tạo giá trị trên directive của isolate scope, đồng nghĩa với việc copy giá trị từ parent scope. Các “sao chép” diễn ra trong giai đoạn kết nối của directive và một khi hoàn thành, chúng ta có thể cập nhật giá trị vô thời hạn mà không ghi đè giá trị trên parent scope. Quan sát ví dụ sau:

One-way bindings

JsFiddle: http://jsfiddle.net/founddrama/7xF3q/light/

4.2. Two-way bindings (=)
= (ràng buộc hai chiều) là ràng buộc cho phép giữ giá trị đồng bộ giữa Isolate Scope của directive và Parent Scope. Trong quá trình liên kết, một tham chiếu được tạo ra giữa hai scope như vậy mà khi ta cập nhật giá trị của scope này thì giá trị của scope kia cũng sẽ thay đổi thành như thế và ngược lại. Trong một vài cách, đây là những gì chúng ta có thể thu được các tùy chọn parent scope (trên) ngoại trừ việc chúng ta đang tạo ra ràng buộc rõ ràng cho một tập hợp cụ thể tới các properties trên parent scope. Quan sát:

Two-way bindings

JsFiddle: http://jsfiddle.net/founddrama/MktCv/light/

4.3. Expression bindings (&)
& (expression) ràng buộc cho phép chúng ta gọi function từ parent scope trong bối cảnh của Isolate Scope. Điều này cho phép chúng ta tạo ra các directive scope có hiệu quả có một giao diện mà cần phải được thực hiện với các method từ parent scope. Quan sát:

Expression bindings

JsFiddle: http://jsfiddle.net/founddrama/Q382H/light/

5. Tóm lược
AngularJS directive cung cấp ba loại scope khác nhau để sử dụng nhằm tương tác với các dữ liệu từ các parent scopes. Chúng ta có thể bỏ qua các scope property khi định nghĩa các directive và chỉ cần sử dụng các parent scope. Chúng ta có thể thiết lập scope là true để tạo ra một scope mới mà theo nguyên mẫu được thừa hưởng từ parent. Và cuối cùng, chúng ta có thể tạo ra một isolate scope để tạo ra một “sandbox” bối cảnh cho dữ liệu của directive. Tùy từng trường hợp hãy linh hoạt sử dụng chúng.

6. Reference
https://docs.angularjs.org/guide/scope
https://github.com/angular/angular.js/wiki/Understanding-Scopes
http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/
http://blog.founddrama.net/2014/07/angularjs-overview-of-directive-scopes/