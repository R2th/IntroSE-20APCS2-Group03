life cyle của 1 ứng dụng AngularJS gồm 3 giai đoạn
 - Bootstrap: khi thư viện AngularJS được tải xuống trình duyệt. AngularJS khởi tạo các thành phần cần thiết của riêng nó và sau đó khởi tạo mô đun.Module được tải và mọi dependencies của module là available
 - Compilation: static DOM được thay thế bằng dynamic DOM
 - Runtime Data Binding: giai đoạn chạy ứng dụng

Bài viết sẽ đề cập đến giai đaọn thứ nhất trong life cyle của AngularJS app. Có 2 cách để bootstrapping AngularJS, đó là: Automatic và Manually Initialization
## 1. Automatic Initialization
Khi bạn thêm directive ng-app vào ứng dụng của mình (thường là vào thẻ <html> hoặc thẻ <body>) sẽ đồng nghĩa với việc bạn auto-bootstrap(tự khời động) ứng dụng AngularJS của mình. Khi angularJS tìm thấy directive ng-app, nó sẽ load các module và complie DOM
```
    <!doctype html>
    <html ng-app="optionalModuleName">
        <body>
        <script src="angular.js"></script>
        </body>
    </html>
```
AngularJS sẽ tự đông initialize khi event DOMContentLoaded hoặc file script angular.js đã evaluate với điều kiện document.readyState là complete. Lúc này AngularJS sẽ tìm kiếm dỉective ng-app ở root của úng dụng. Khi tìm thấy directive ng-app, AngularJS sẽ:
* load các modul đi kèm với directive
* tạo application injector
* compile DOM bắt đầu từ ng-app element

![](https://images.viblo.asia/295a518a-5113-48a6-89cb-64a937cd169b.png)
        
##  2. Manual Initialization
Bạn có thể tự khởi tạo ứng dụng của mình bằng cách sử dụng func angular.bootstrap(). Hàm này sẽ sử dụng các module như là những parameter, và angular.bootstrap() thì nên được gọi trong func angular.element(document).ready(). Hàm angular.element(document).ready() sẽ được kích hoạt(fire) khi DOM sẵn sàng.

 Manual initialization giúp bạn có thể kiểm soát tốt hơn về thời điểm và cách initialize 1 ứng dụng AngularJS, điều này sẽ giúp ích trong trường hợp bạn  cần thực hiện 1 vaì thao tác trước khi khởi động Angular và compile trang
```
<script>
   angular.element(document).ready(function() {
      angular.bootstrap(document, ['myApp']);
   });
</script>
```
Không nên chỉ dùng directive khi manually bootstrapping ứng dụng của mình

Không nên sử dụng đồng thời cả 2 cách: automatic và manual khi bootstrapping

Xác định rõ các modules, controller, services,.. trước khi manually bootstrapping

## 3. Module Loading
Module có thể là providers, services, directives,.. hoặc là config, run block và sẽ được apply cho ứng dụng trong quá trình bootstrap 

Một module có thể làm dependencie cho một module khác.

Trong một module, thứ tự khi execution như sau:
* excute provider func. module và các services của module sẽ được avaiable với $injector
* excute các config function
* Cho đến khi các module dependencie dẫ đựoc reslove, run blocks sẽ collect các module require đã được excute theo thứ tự

### Config block

Dùng để cấu hình server bằng cách inject các provider, vi dụ: $routeProvider, và chỉ có thể inject được các providers hoặc hằng (constants)

Trong quá trình bootstrap một ứng dụng,  trước khi AngularJS tạo các service, config block sẽ cấu hình và khởi tạo các providers. Đây là giai đoạn cấu hình trong life-cycle của ứng dụng, trong giai đaọn này các service vẫn chưa được tạo nên không thể gọi. 
```
angular.module('myModule', []).
  value('a', 123).
  factory('a', function() { return 123; }).
  directive('directiveName', ...).
  filter('filterName', ...);
```
```
angular.module('myModule', []).
  config(function($provide, $compileProvider, $filterProvider) {
    $provide.value('a', 123);
    $provide.factory('a', function() { return 123; });
    $compileProvider.directive('directiveName', ...);
    $filterProvider.register('filterName', ...);
  });
```
### Run blocks

Chứa các đọan code cần để kickstart ứng dụng
Được executed sau khi tất cả các service được cấu hình và injector đã được tạo