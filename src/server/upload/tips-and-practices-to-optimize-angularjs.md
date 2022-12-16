### AngularJS là một framework. Sử dụng nó tốt sẽ cải thiện đáng kể năng suất, mô đun mã và tái sử dụng code của bạn. Tuy nhiên không phải lúc nào nó cũng sẽ nhanh. Nếu lạm dụng 1 số tính năng thì ứng dụng của chúng ta sẽ trở nên chậm chạp đáng kể. Qua bài viết mình sẽ giới thiệu 1 số tính năng không nên lạm dụng và 1 vài tips để cải thiện.
## 1. Watchers
Function khá hay của angular, chúng sẽ watch 1 biến nào đó nếu có sự thay đổi. Chúng ta thường lạm dụng nó rất nhiều. Và nó là thứ ảnh hưởng đến hiệu năng ứng dụng của chúng ta khá nhiều.
```js
// this code snippet creates a watcher on property
$scope.$watch("property", (new, old) => {
   // do something here
});
```
Hãy nghĩ về watch này. nó giống như một vòng lặp kiểm tra các thay đổi đối với các biến đang được theo dõi.
việc theo dõi nhiều biến cùng 1 lúc sẽ gây ra chậm chạp khá là ức chế phải không nào. Vậy thì chúng ta hãy hạn chế sử dụng nó. Và tìm 1 vài cách khác để thay thế nó.
## 2.  Optimize ng-repeat
```js
// don't do this
<div ng-repeat="item in myLongList">
 {{ item.property }}
</div>
// use track by!
<div ng-repeat="item in myLongList track by item.id">
 {{ item.property }}
</div>
```
Theo dõi bằng cách đánh dấu cho nó, việc này như đánh index. Khi myLongList được load lại, Angular không phải xây dựng lại một phần tử đã được load. Điều này tăng tốc chu trình và tránh thao tác DOM vô dụng.
vì vậy sử dụng track by nếu có thể.
## 3. Use Bind once when possible
Mặc dù có lẽ là tính năng phổ biến nhất khi sử dụng Angular, nhưng thường không cần ràng buộc hai chiều: thay vào đó, bạn chỉ có thể liên kết một lần biểu thức giữa các dấu ngoặc nhọn trong các mẫu của mình bằng cách sử dụng cú pháp sau:
```html
<p ng-bind="::item.name"></p>
```
Vậy nên hãy sử dụng 1 chiều thay vì 2 chiều nếu không cần thiết.
## 4. ng-if vs ng-show/ng-hide
Hai directives cùng một kết quả nhưng theo những cách khác nhau:
* ng-if sẽ remove element from DOM, và sẽ tạo lại nếu cần thiết.
* ng-show / ng-hide gắn một class với css { display: none !important} và không tạo ra element mới.

Vậy, cái nào nhanh hơn? Điều này phụ thuộc vào mục đích. Nếu các phần tử được chuyển đổi nằm trong một danh sách dài, trong đó các biểu thức có thể được tính lại khi phạm vi thay đổi, bạn có thể muốn xóa nút khỏi DOM để tránh tính toán vô dụng. Tuy nhiên, khi thường xuyên bật tắt khả năng hiển thị của một phần tử (một công cụ tải spinner, button) Và không được gắn với một phạm vi, ng-show / ng-hide có thể tốt hơn.
## 5. Scope
Scope là một đối tượng chứa các thuộc tính hiển thị cho car và được xác định trong controllers. controllers có thể được tạo ra bằng cách sử dụng biến $scope và cũng bằng cách sử dụng bộ điều khiển làm cú pháp, đây là cách thông thường.
```js
class Car {
   constructor($scope) {
      $scope.color = "red";
   }
}
Car.$inject = ["$scope"];
<div ng-controller="Car">
   My car's color is {{ color}}
</div>
// or, better
class Car {
   constructor() {
      this.color = "red";
   }
}
angular.module("app").
   controller("Car", Car);
<div ng-controller="Car as car">
   My car's color is {{ car.color}}
</div>
```
## 6. Use $cacheFactory to cache your data
$cacheFactory rất hữu ích khi chúng ta cần lưu trữ một số dữ liệu có thể được tính toán lại. Cách sử dụng của nó rất đơn giản và nói chung không khác với cách chúng ta sử dụng ghi nhớ thông thường.
```js
class Controller {
   constructor(cacheFactory, myService) {
      let vm = this;
      vm.myService = myService;
      vm.cache = $cacheFactory('myCache');
      vm.data = {...};
   }
   handleClick(someData) {
      let vm = this,
          cached = vm.cache.get(someData);
 
      if (cached) {
         return cached;
      }
      vm.data = vm.myService.heavyMethod(someData);
      vm.cache.put(someData, data);
   }
}
```
bạn có thể tìm hiểu thêm ở đây. https://docs.angularjs.org/api/ng/service/$cacheFactory
## 7. Use lodash
[Lodash](https://lodash.com/docs/4.17.11) là 1 thư viện cho phép bạn nhanh chóng viết lại logic của ứng dụng để cải thiện các phương thức AngularJS tích hợp và nâng cao hiệu suất của ứng dụng. Nó cung cấp nhiều function cần thiết cho 1 ứng dụng thông thường chỉ sử dụng javascript.
## 8. Limit DOM access
Truy cập DOM có thể tốn tài nguyên, vì vậy hãy giữ các cây DOM của bạn nhỏ. Đừng sửa đổi DOM nếu bạn có thể giúp nó và không đặt bất kỳ kiểu nội tuyến nào để tránh phản xạ JavaScript.
## 9. Pagination or infinite scroll
Bạn có thể hạ thấp số lượng phần tử được lặp lại bằng cách thực hiện phân trang. AngularJS thậm chí có một lệnh được gọi ngInfiniteScrollcho mục đích đó.
Việc làm này sẽ giảm tải cho cả server và client. tăng hiệu năng đáng kể.
## 10. Limit HTTP requests
Mỗi response cho một request http sẽ khiến client tốn tài nguyên nhất định. Một cách để hạn chế chúng sẽ là tạo các điểm cần thiết để thực hiện các request hàng loạt.
## 11. Debounce ng-model
Nếu bạn biết sẽ có rất nhiều thay đổi đến từ một ng-model, bạn có thể cài đặt thời gian để set ng-model.

Ví dụ: nếu bạn có đầu vào tìm kiếm như Google, bạn có thể hủy bỏ nó bằng cách đặt tùy chọn ng-model sau : ng-model-options="{ debounce: 250 }.

Điều này sẽ đảm bảo rằng thay đổi trong ng-model này sẽ được kích hoạt không quá một lần sau mỗi 250ms.
## 12. Use console.time to benchmark your functions
console.time giúp chúng ta kiểm tra được hiệu suất của 1 function. Nó sẽ tiêu tốn bao nhiều thời gian để thực hiện.
```js
console.time("TimerName");
setTimeout(function(){
    console.timeEnd("TimerName");
}, 100);
//In console $: TimerName: 100.324ms
```