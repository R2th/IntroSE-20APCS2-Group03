Chào các bạn, hôm nay chúng ta sẽ cùng nhau tìm hiểu về `AngularJS` hay còn gọi là `Angular version 1.x`. Mặc dù Angular hiện tại đã đến version 7.x.x rồi nhưng 1.x vẫn chưa bao giờ `chết` và vẫn được sử dụng rộng rãi, chí ít là trong các dự án thực tế.

**Chú ý:**
> Angular version 1.x được gọi là AngularJS.
> 
> Angular version 2.x trở lên thì được gọi là Angular.
> 
**Link tham khảo: https://angular.io/guide/ajs-quick-reference**

Dưới đây là những lý do tại sao `AngularJS` vẫn được lựa chọn làm ngôn ngữ client ưu tiên nhất trong dự án:

> * **Dễ làm quen với người mới:** So sánh với `React` hoặc `Angular` thì `AngularJS` dễ làm quen hơn rất nhiều lần.
> * **Dự án thực tế luôn cần sự `chắc chắn` trong việc vận hành cả project:** Nên giữa việc chọn ngôn ngữ client nhiều `rủi ro` như `Angular` và lựa chọn bao năm qua mọi project khác vẫn chọn như `AngularJS` thì tất nhiên `AngularJS` sẽ chiếm ưu thế.
> * **Việc review dễ dàng và nhanh chóng hơn:** Hầu hết mọi Leader trong dự án đều `rất rất rất` rành rõi trong `AngularJS` nên việc review code `AngularJS` sẽ nhanh và tạo sự chắc chắn hơn rất nhiều so với review code `Angular`.
> * **Bổ sung nhân sự dễ dàng hơn:** Giả sử dự án có người nghỉ việc thì sẽ rất khó kiếm được 1 người rành rõi `Angular` mà thay thế, nhưng tìm một người rành `AngularJS` thì lại dễ hơn rất nhiều.

Bên trên là một trong những lý do cơ bản nhất để giải thích vì sao không chọn `Angular x.x` mà lại chọn `AngularJS`. Giờ chúng ta bắt đầu phần cơ bản nhất nào:

# Cài đặt
Bài viết này sẽ sử dụng Rails, AngularJS và Bootstrap nhé các bạn.

```
rails new learn-angularjs -d mysql
cd learn-angularjs
rails g controller StaticPage show
```

Thêm routes:
```
 root to: "static_page#show"
```

Chạy server:
```
rake db:create
rake db:migrate
rails s
```

## Thêm AngularJS vào rails app

Chạy đoạn lệnh sau:
```
touch app/assets/javascripts/angular/app/user_app.js
mkdir app/assets/javascripts/angular/lib
```

Thêm đoạn code sau vào `user_app.js` vừa tạo - Tạm thời chưa cần hiểu, lát setup xong chúng ta sẽ tìm hiểu ở phần dưới:

```
(function() {
  angular.module('userApp', [])
})();
```

Vào [đây](https://code.angularjs.org/) để tải phiên bản bạn muốn, bài viết lựa chọn phiên bản 1.7.5. Bạn tải `2 file phía dưới` nhé:

```
angular.min.js
angular.min.js.map
```

Thêm require trong `application.js`:

```
//= require rails-ujs
//= require activestorage
//= require angular/lib/angular.min
//= require angular/app/user_app
//= require_tree .
```

Thêm `ng-app` vào trong thẻ body của `application.html.erb`:

```
<!DOCTYPE html>
<html>
  <head>
    <title>LearnAngularjs</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", media: "all" %>
  </head>

  <body ng-app="userApp">
    <%= yield %>
    <%= javascript_include_tag "application" %>
  </body>
</html>
```

**Cấu trúc file:**

![](https://images.viblo.asia/e6eeb75d-e9ef-4dc7-8b28-a1156012a80d.png)

**File application.js:**

![](https://images.viblo.asia/578dc991-08af-4c45-a2fa-832d8fe5671a.png)

**File application.html.erb:**

![](https://images.viblo.asia/56a10624-45f8-4f66-b2c6-f329682e90ba.png)

**Chạy thử code xem đã hoàn thành cài đặt AngularJS chưa:**

```
# File app/views/static_page/show.html.erb:

{{1 + 1}}
```

Nếu kết quả ra là 2 thì đã hoàn thành, ngược lại nếu hiển thị {{1 + 1}} thì bạn `restart server` và thử lại sẽ có kết quả đúng.

## Thêm Bootstrap 4 vào Rails app

Bạn có thể vào [Trang chủ](https://github.com/twbs/bootstrap-rubygem) đọc Docs để hiểu thêm nhé hoặc làm theo hướng dẫn dưới nếu không muốn đọc Docs:

**Thêm gem bootstrap và jquery:**
```
gem "bootstrap", "~> 4.1.3"
gem "jquery-rails"
```

**Tạo mới một base.scss để require bootstrap vào:**

```
touch app/assets/stylesheets/base.scss
```

với nội dung như sau:

```
@import "bootstrap";
```

**Thêm các require sau vào application.js:**

```
//= require jquery3
//= require popper
//= require bootstrap-sprockets
```

**Thay đổi app/views/static_page/show.html.erb để xem thử được chưa:**

```
<h1>{{1 + 1}}</h1>
<button type="button" name="button" class="btn btn-primary">Click here</button>
```

Sau khi đã hoàn thành, `restart server` và kiểm tra kết quả:

![](https://images.viblo.asia/bf64ea3d-95c5-4cbf-8a19-d5fd5438e220.png)

**File Gemfile:**

![](https://images.viblo.asia/cae8b60f-be09-4b99-9b84-60f24c038e01.png)

**File application.js:**

![](https://images.viblo.asia/a8bb478d-6b15-4757-9417-5fcc52ac56d8.png)

**File base.scss:**

![](https://images.viblo.asia/b31dd6af-5380-4a37-9281-93c3df3275fc.png)

**File app/assets/javascripts/angular/app/user_app.js:**

![](https://images.viblo.asia/892f0f9d-975d-46e5-acde-88f631c50088.png)

Như vậy đã xong phần cài đặt, bây giờ chúng ta cùng tìm hiểu `AngularJS` nào.

# Phần 1
**1. AngularJS modules và cách sử dụng:**
```
# app/assets/javascripts/angular/app/user_app.js

(function() {
  angular.module('userApp', [])
})();
```

**a.Giải thích:**

```
angular.module('userApp', [])
```

Theo [trang chủ](https://docs.angularjs.org/api/ng/function/angular.module) thì câu lệnh trên tạo ra `app AngularJS` với tên là `userApp` bằng cú pháp:

> **angular.module(tham số 1, [tham số 2, tham số 3])**
> - Tham số 1: `Tên` của app cần khởi tạo.
> - Tham số 2: Các `module` khác cần sử dụng bên trong `module hiện tại`.

Như vậy câu lệnh trên đã tạo ra ` App AngularJS` với tên `userApp`.

```
(function(){
  ...
})();
```

Câu lệnh trên được gọi là [self invoked function trong JS](https://sarfraznawaz.wordpress.com/2012/01/26/javascript-self-invoking-functions/).  Ngay khi vừa được tạo ra, nó sẽ tự động chạy nội dung bên trong mà không cần gọi đến.

**b. Sử dụng:**

Để có thể dùng `userApp` vừa tạo, chúng ta thêm attribute `ng-app` hoặc `data-ng-app` vào trong thẻ HTML bất kỳ.
```
<!DOCTYPE html>
<html>
  <head>
    <title>LearnAngularjs</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", media: "all" %>
  </head>

  <body ng-app="userApp">
    <%= yield %>
    <%= javascript_include_tag "application" %>
  </body>
</html>
```

Như trên chúng ta đã cho `AngularJS` biết ta sẽ sử dụng `userApp` từ thẻ `<body>` vào trong. Tức là mọi code `AngularJS` nằm bên trong thẻ `<body>` sẽ chạy được, còn bên ngoài thì không.

**c. Sự khác nhau của ng-app và data-ng-app:**

Khi chúng ta validate field trong HTML5 thì nên sử dụng `data-ng-app`, khi sử dụng `ng-app` thì HTML5 sẽ show lỗi `ng-app` không hợp lệ. Vì HTML5 chỉ chấp nhận những `custom attribute` có prefix là `data-`. Tìm hiểu thêm sự khác biệt đó tại [đây](https://stackoverflow.com/questions/16589853/ng-app-vs-data-ng-app-what-is-the-difference).

# Phần 2

`AngularJS` hỗ trợ `mô hình MVC` với:

> **Model:** Là dữ liệu lấy từ phía Server (như Rails, Node, ...).
> 
> **View:** Là các logic để hiển thị dữ liệu.
> 
> **Controller:** Nơi chứa các logic để nhận data, tính toán, update, ...
> 

**1. Cách hiển thị danh sách các data với Rails và AngularJS:**

**a. Tạo Controller:**

`Controller ` là nơi đứng giữa `Model` và `View`: nhận data từ `Model`, xử lý bla bla sau đó chuyển cho `View` hiển thị. `View` nhận request từ User, chuyển sang `Controller` xử lý bla bla, xong nếu cần thì chuyển xuống `Model` và lặp lại như ban đầu.

> Controller được tạo ra bằng lấy `Module object` gọi `controller`. 
> 
> **Cú pháp: angular.module("userApp").controller(Tham số 1, Tham số 2);**
> 
> - Tham số 1: Tên của controller.
> - Tham số 2: Function thực hiện logic của controller.
> 
Thực hiện câu lệnh sau để tạo mới `Controller`:
```
mkdir app/assets/javascripts/controllers
touch app/assets/javascripts/controllers/static_page_controller.js
```

Sau khi tạo xong, thêm nội dung như sau:

```
"use strict";

angular.module("userApp").
    controller("staticPageController", staticPageController);
    
function staticPageController() {
  var vm = this;
}
```

**Giải thích:**
```
"use strict"
```

Thêm dòng này trước mỗi file JS sẽ bắt buộc toàn bộ `variable` trong file nếu không được khai báo sẽ báo lỗi và nhiều thứ khác liên quan đến việc khai báo biến. Tại sao lại phải cần đến "use strict"? 

Với mong muốn viết JS một cách cẩn thận hơn, trình duyệt sẽ thông báo lỗi mỗi khi `quên` khai báo biến thì "use strict" sẽ hữu dụng. Tham khảo thêm tại [đây](https://www.w3schools.com/js/js_strict.asp).


-----


```
angular.module("userApp").
  controller("staticPageController", staticPageController);
    
function staticPageController() {
  var vm = this;
}
```

- `angular.module("userApp")`: trả về module với tên `userApp` mà ta đã khởi tạo.
- `angular.module("userApp").controller("staticPageController", staticPageController)`: Khởi tạo controller với tên `staticPageController` ở tham số 1, tham số 2 sẽ là function cùng tên `staticPageController`.

**b. Sử dụng Controller:**

`Tương tự với Module`, để sử dụng `Controller` cần thêm attribute `ng-controller` vào trong thẻ HTML như sau:

```
<div ng-controller="staticPageController as vm">
</div>
```

Sau đó còn phải require nó vào để Rails biết mà chạy:

```
# app/assets/javascripts/application.js

//= require rails-ujs
//= require activestorage
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require angular/lib/angular.min
//= require angular/app/user_app
//= require_tree ./angular/controllers/ <==========  Thêm line này.
//= require_tree .
```

Xong, giờ để test thử `Controller` chạy được chưa, ta thêm function `test()` vào một button, khi ấn vào button sẽ show log 'Ready'.

```
# app/assets/javascripts/angular/controllers/static_page_controller.js

"use strict";

angular.module("userApp")
  .controller("staticPageController", staticPageController);

function staticPageController() {
  var vm = this;

  vm.test = function() {
    console.log('Ready');
  }
}
```

```
# app/views/static_page/show.html.erb

<div ng-controller="staticPageController as vm">
  <button type="button" name="button" ng-click="vm.test()">Click here</button>
</div>
```

Khi chạy sẽ ra kết quả sau:

 ![](https://images.viblo.asia/d7e6cb9b-753c-4510-b945-04d81f5b3869.png)
 
 **c. Hiển thị danh sách các data:**
 
 ```
 # app/assets/javascripts/angular/controller/static_page_controller.js:
 
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
}
 ```
 
 Trong function `staticPageController` trên mình vừa thêm tham số `$scope`, lưu ý rằng mọi tham số với prefix là `$` sẽ từ `AngularJS` cung cấp. Tuy nhiên nếu khai báo bậy sẽ xuất hiện lỗi.
 
 [`$scope`](https://stackoverflow.com/questions/24360295/what-is-scope-in-angularjs) được định nghĩa sẵn và riêng biệt bởi từng `Controller` khác nhau, nó có nhiệm vụ nhận data, function và hiển thị ra `View`.
 
Trong đoạn code trên ta đã tạo mới `variable` models và gán nó vào `$scope.models`.

Tiếp theo, để hiển thị lên `View` thì:

```
<div ng-controller="staticPageController as vm" class="container">
    <div class="py-5 text-center">
      <h1>Test app with user's name: "{{models.user}}"</h1>
      <p class="lead">Items length is: {{models.items.length}}</p>
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
              <td>{{item.done}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>
```

Ở phần `View` trên ta đã sử dụng cú pháp hiển thị giá trị variable trong AngularJS - `{{...}}`, bên trong cặp ngoặc này sẽ hiểu toàn bộ code JS.

Ngoài ra còn sử dụng `directive` để hiển thị danh sách, cụ thể ở trên ta đã sử dụng attribute `ng-repeat` để gọi tới `directive` cho phép loop trong array ra các phần tử element. Như trên thì đang loop trong `models.items` ra các thanh niên item và gán nó tên là `item`.

Kết quả như sau:

![](https://images.viblo.asia/2b13b37b-db3b-4b15-8171-beb11c8a5ec0.png)

**Đến đây chúng ta đã hiểu các vấn đề sau:**

> * Lý do sử dụng `AngularJS` và tại sao `AngularJS` vẫn được sử dụng rộng rãi mặc dù có nhiều phiên bản tân tiến hơn.
> * Biết cách tạo `Rails` app và `AngularJS` một cách nhanh nhất. Ngoài cách này ra còn cách sử dụng `npm` để cài đặt nhưng rất ít khi được sử dụng cách này. Mình cũng nghĩ không nên sử dụng npm vì khá phiền khi cài đặt.
> * Hiểu khái quát về mô hình MVC trong `AngularJS` và `Rails`.
> * Demo nho nhỏ về `ng-repeat`.

Đến đây đã thấy bài viết dài rồi, mình xin tạm dừng tại đây. Hẹn gặp các bạn ở phần 02.