> Filter là một trong các component quan trọng của Angularjs. Filter giúp chuyển đổi dữ liệu trước khi dữ liệu đó được các directive xử lý và được hiển thị trên view. Vì vậy filter giúp có thể hiển thị nhiều cách khác nhau trên cùng một kiểu dữ liệu.

> Filter giúp người dùng giảm số lượng hàm viết trong application, kết hợp với cú pháp ngắn gọn, dễ nhớ. Tuy nhiên filter khi sử dụng trên view sẽ khiễn cho tốc độ load page bị giảm dần đến app bị chậm đi.

Trong nhiều trường hợp bạn cần phải viết 1 custom filter phù hợp với bài toán của mình. Sau đây mình xin liệt kê 4 filter cơ bản, hi vọng có thể giúp ích bạn trong quá trình làm việc
# Filter 1: Static [single] use filter
Filter này là filter đơn giản, không chứa vòng lặp:
Ví dụ 1 filter được định nghĩa sẵn, chúng ta chỉ việc dùng như:
```
<p>{{ 1400956671914 | date: 'dd-MM-yyyy' }}</p>
<p>{{1234.56 | currency}}</p>
```
và khi render DOM sẽ trả về định dạng theo format ở trên:
```
<p>24-05-2014</p>
<p>$1,234.56</p>
```
Vậy làm thế nào để tạo 1 cái filter tương tự như trên?
Giờ cùng tìm hiểu qua ví dụ: Chuyển tên thành chữ viết hoa
Angular có method `.filter()` cho mỗi Module, ta có thể viết 1 custom filter của riêng mình. Filter được viết:
```
app.filter('ten_filter', function () {
  return function () {
    return;
  };
});
```
Ta có thể đặt tên cho filter và trả về giá trị mình mong muốn. function sẽ được gọi mỗi lần Angular gọi filter. Người dùng thực hiện thay đổi, filter sẽ chạy lại và update nếu cần.
Để giải quyết ví dụ trên ta viết 1 filter tên makeUppercase:
```
// tạo 1 filter tên là makeUppercase một cách global, chỗ nào cũng gọi được trong app module
app.filter('makeUppercase', function () {
  return function (nameString) {
  // fuction sẽ được gọi đến mỗi lần Angular chạy $disgest()
  // nameString là đối tượng chúng ta sẽ thao tác
  // return trả về giá trị đã uppercase
    return nameString.toUpperCase();
  };
});
```
Ví dụ:
Ở controller:
```
var app = angular.module('app', []);

app.filter('makeUppercase', function () {
  return function (item) {
      return item.toUpperCase();
  };
});

app.controller('PersonCtrl', function () {
  this.username = 'xuanbach';
});
```
Ở view:
```
<div ng-app="app">
  <div ng-controller="PersonCtrl as person">
    <p>
      {{ person.username | makeUppercase }}
    </p>
  </div>
</div>
```
Kết quả hiển thị trên màn hình
```
XUANBACH
```
Như vậy chúng ta đã xây dựng xong 1 custom filter đơn giản nhất.

# Filter 2: Filters ng-repeat
Filter sẽ thực dự tiện dụng với vòng lặp mà không cần phải tốn công sức.
Cùng tìm hiểu qua ví dụ:
```
app.controller('PersonCtrl', function () {
  this.friends = [{
    name: 'Andrew'        
  }, {
    name: 'Will'
  }, {
    name: 'Mark'
  }, {
    name: 'Alice'
  }, {
    name: 'Todd'
  }];
});
```
Ở view:
```
<ul>
  <li ng-repeat="friend in person.friends">
    {{ friend }}
  </li>
</ul>
```
Tạo 1 filter `startsWithA` chỉ cho hiển thị những tên mà bắt đầu bằng chữ "A"
```
<ul>
  <li ng-repeat="friend in person.friends | startsWithA">
    {{ friend }}
  </li>
</ul>
```
Định nghĩa filter `startsWithA` như sau:
```
app.filter('startsWithA', function () {
  return function (items) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (/a/i.test(item.name.substring(0, 1))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});
```
Khác với filter 1, filter 2 function truyền vào là 1 array. và trả về 1 array thỏa mãn 1 điều kiện nào đó.
Kết quả trả về của ví dụ trên:
```
{"name":"Andrew"}
{"name":"Alice"}
```
# Filter 3: Filters ng-repeat với arguments
Cũng giống như ví dụ ở filter 2 nhưng giờ chúng ta thêm tham số vào cho filter.
Giờ chúng ta sẽ hiển thị friend bắt đầu bằng kí tự bất kì chúng ta nhập
```
<input type="text" ng-model="letter">
<ul>
  <li ng-repeat="friend in person.friends | startsWithLetter:letter">
    {{ friend }}
  </li>
</ul>
```
letter là 1 input được nhập để filter friends theo kí tự đầu tiên
Ta viết filter như sau:
```
app.filter('startsWithLetter', function () {
  return function (items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (letterMatch.test(item.name.substring(0, 1))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});
```
Xem [demo filter 2](https://jsfiddle.net/toddmotto/53Xuk)

Tương tự nếu có nhiều tham số thì ta sẽ định nghĩa bằng cách
```
<input type="text" ng-model="letter">
<ul>
  <li ng-repeat="friend in person.friends | startsWithLetter:letter:number:somethingElse:anotherThing">
    {{ friend }}
  </li>
</ul>
```

```
app.filter('startsWithLetter', function () {
  return function (items, letter, number, somethingElse, anotherThing) {
    // do a crazy loop
  };
});
```
# Filter 4: Controller/$scope filter
Filter này được viết trực tiếp vào controller. Sự khác biệt của filter này là chúng ta k truy cập array mà thao tác trên từng element riêng lẻ
Tạo 1 function khác filter theo chữ "w". Định nghĩa filter trong controller:

```
app.controller('PersonCtrl', function () {
  // Ở trong controller chúng ta k return function filter
  this.startsWithW = function (item) {
    return /w/i.test(item.name.substring(0, 1));
  };
  this.friends = [{
    name: 'Andrew'        
  }, {
    name: 'Will'
  }, {
    name: 'Mark'
  }, {
    name: 'Alice'
  }, {
    name: 'Todd'
  }];
});
```
Ở view:
```
<div ng-controller="PersonCtrl as person">
  <ul>
    <li ng-repeat="friend in person.friends | filter:person.startsWithW">
      {{ friend }}
    </li>
  </ul>
</div>
```

Kết quả trả về
```
{"name":"Will"}
```
Tùy vào yêu cầu bài toán chúng ta lựa chọn tạo 1 custom filter cho phù hợp

Hi vọng bài viết sẽ giúp ích cho bạn



Nguồn tham khảo: https://toddmotto.com/everything-about-custom-filters-in-angular-js/