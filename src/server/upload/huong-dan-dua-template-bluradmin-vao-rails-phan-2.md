Như mình đã giới thiệu ở [Phần 1](https://viblo.asia/p/huong-dan-dua-template-bluradmin-vao-rails-phan-1-07LKX4k8KV4) thì ở phần này, mình sẽ hướng dẫn để làm sao Rails có thể nhận được template này.
# 1. Build file gulp
Sau khi đã hoàn thành xong các bước ở phần 1, để build được file js, css chúng ta chaỵ các câu lệnh dưới dây trong terminal
- npm install
- gulp
# 2. Config file JS, CSS
- Sau khi đã build file gulp, sẽ sinh ra thư mục manager, có đường dẫn như sau *app/assets/javascripts* đối với js và *app/assets/stylesheets* đối với file css. Cụ thể sẽ như sau:

![](https://images.viblo.asia/6de4d33c-6eca-4137-906b-af7e3a2a2e9a.png)

Bạn có thể thấy trong thư mục manager sẽ chứa 2 file là manager_build và manager_vendor. Đây chính là nơi chưa js, css của dự án sau khi chạy file gulp.
- Tiêp theo mình sẽ tạo file *manger.coffee* như dưới đây:
```
#= require manager/manager_vendor
#= require manager/manager_build

```
-  create file *manager.scss*:
```
/*
 *= require manager/manager_vendor
 *= require manager/manager_build
*/
```
- Bạn sửa thêm 1 chút trong file *.gitignore* nhé
```
app/assets/javascripts/manager/manager_build.js
app/assets/javascripts/manager/manager_vendor.js
app/assets/stylesheets/manager/manager_build.css
app/assets/stylesheets/manager/manager_vendor.css
app/assets/stylesheets/manager/auth.css
app/assets/stylesheets/manager/404.css
```
Vì sao lại như vậy, bởi vì mỗi lần chúng ta thay đổi template, thêm chức năng đều phải chạy lại file gulp. Khi người khác lấy code về sẽ chỉ cần chạy file gulp là sẽ có các file js này nên chúng ta không cần phải đẩy các file này lên làm gì cả.
# 3. Khởi tạo màn hình Dashboard
Vậy là chúng ta đã cấu hình xong những thứ cần thiết, bây giờ mình sẽ demo để hiển thị dashboard của template này nhé.
1. Tạo controller **app/controllers/manager/static_page_controller.rb**
```
class Manager::StaticPageController < ApplicationController
  layout 'manager', only: [:dashboard]

  def dashboard
  end

  def auth
  end

  def reg
  end

  def not_found
  end
end
```
2. Tạo layout **app/views/layouts/manager.html.erb**
```
<!DOCTYPE html>
<html lang="en" ng-app="BlurAdmin">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Exchange Admin</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic" rel="stylesheet" type="text/css">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/manager/img/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/manager/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="assets/manager/img/favicon-96x96.png">
    <%= csrf_meta_tags %>
    <%= stylesheet_link_tag    'manager', media: 'all' %>
  </head>
  <body>
    <div class="body-bg"></div>
    <main ng-if="$pageFinishedLoading" ng-class="{ 'menu-collapsed': $baSidebarService.isMenuCollapsed() }">
      <ba-sidebar></ba-sidebar>
      <page-top></page-top>
      <div class="al-main">
        <div class="al-content">
          <content-top></content-top>
          <div ui-view=""></div>
        </div>
      </div>
      <back-top></back-top>
    </main>
    <div id="preloader" ng-show="!$pageFinishedLoading">
      <div></div>
    </div>
    <%= javascript_include_tag 'manager' %>
  </body>
</html>
```
3. Tạo thêm view **app/views/manager/static_page/dashboard.html.erb** nhưng file này bạn không cần thiết phải thêm gì vào nhé.
4. Setup file **config/routes.rb**
```
Rails.application.routes.draw do
  devise_for :users
  root to: "home#index"

  namespace :manager do
    root to: "static_page#dashboard"
  end
end
```
5. Trong file app.js ở thư mục **blur_admin/src/app/app.js**

```
'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'commonLib'
]).config(['$httpProvider', '$locationProvider', defaultConfig]);

/*
 * Default config for $http
 * Data Type: json
 * Always send csrf token
*/
function defaultConfig($httpProvider, $locationProvider) {
  var csrfTokenElm = document.getElementsByName('csrf-token'),
      csrfToken = csrfTokenElm[0] ? csrfTokenElm[0].content : '';
  $httpProvider.defaults.headers.common.Accept = 'application/json';
  $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrfToken;
  $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrfToken;
  $httpProvider.defaults.headers.delete = {'X-CSRF-Token': csrfToken};
}
```
6. Tạo file common.js theo đường dẫn **blur_admin/src/app/commons/common.js**
```
(function () {
  'use strict';

  angular.module('commonLib', []);

  angular.module('commonLib')
    .factory('common', ['$http', '$q', function($http, $q) {
      return {
        ajaxCall: function(method, url, params, cache) {
          var def = $q.defer();
          $http({method: method, url: url, params: params, cache: cache})
            .success(function(res) {
              def.resolve(res);
            })
            .error(function(err) {
              def.reject(err);
            })
          return def.promise;
        }
      }}
    ])
})();
```
7. Nhiều bạn sẽ thắc mắc bây giờ mình sẽ code các chức năng của màn hình admin ở đâu, ở bên thư mục controller, view của Rails hay sao, và mình xin trả lời là khi đưa template này vào rồi mình sẽ chỉ code các chức năng ở trong thư muc **blur_admin**, còn bên thự mục app sẽ là nơi code chức năng của bên user. Vậy làm sao Rails có nhận được hiểu được code ở trong thư mục blur_admin. Các bạn hãy để ý sau khi build file gulp, ở trong thư mục **app/assets/manager/manager_build.js** đây chính là nơi chứa toàn bộ code trong thư mục blur_admin sau khi chạy file gulp, và Rails sẽ dựa vào file js này như mình đã config ở trên để có thể hiểu được nó.
Bây giờ bạn muốn có thể chạy được màn hình dashboard cho admin thì bạn sẽ cần phải lấy những thứ bạn cần để đưa vào tư template gốc của nó, chứ không phải đưa toàn bộ vào nhé, ví dụ trong dashboard bạn muốn dùng calendar thì bạn chỉ copy thư mục calendar trong file **src/page/dashboard/calendar** của thư mục gốc, sang dự án của bạn. như hình ảnh dưới

![](https://images.viblo.asia/93220b15-8146-4774-9b19-d3c20e09b3d4.png)

bạn cần calendar thì bạn chỉ thêm calendar vào thôi nhé, chứ để nguyên toàn bộ thư mục thì lỗi hết đấy, và bạn để ý các thư mục ở hình ảnh trên như *charts*, *component*, *form*, cái này các chức năng của template, bạn cần cái nào, thì bạn đưa vào, không cần thì xóa hết đi nhé.

8. Sau khi đã xác định được các chức năng cần thiết cho dashboard, bạn sẽ cần phải sửa code ở trong file **blur_admin/src/app/pages/pages.module.js**
```
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.dashboard',
  ])
      .config(routeConfig);
})();
```
Ở đây vì mình chỉ sử dụng page dashboard nên mình cần config dashboard vào, ví dụ bạn muốn dụng thêm charts, form, thì cũng phải thêm nó vào file này nhé.

Trên là toàn bộ bài viết mình giới thiệu sơ qua, sẽ có một số lỗi phát sinh, các bạn có thể tìm hiểu thêm nhé, nếu có lỗi các bạn có thể để lại comment bên dưới. Vì cái này khá là phức tạp nên sẽ mất khá nhiều thời gian để thông não được nó. Hi vọng bài viết sẽ giúp ích được cho các bạn.