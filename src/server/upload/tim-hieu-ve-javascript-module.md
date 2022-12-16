Chắc hẳn ai trong chúng ta cũng đã từng sử dụng nhiều công cụ như là webpack, rollup, grunt, browserify,...; sử dụng những cú pháp module quen thuộc của CommonJS, AMD hay là ES6, nhưng có lẽ là chưa thực sự nhiều người đã nắm rõ về quá trình hình thành và mục đích tại sao chúng ta có những công cụ này, vậy thì trong bài viết này, chúng ta sẽ cùng tìm hiểu về cách mà JS module được công bố và áp dụng, và sự hình thành của các công cụ đó nhé. *Lưu ý: Bài viết này nhằm mục đích nêu lên quá trình hình thành của các bộ công cụ nhằm giải quyết vấn đề, hạn chế trong khi tiếp cận JS module, nên sẽ không đi sâu vào tìm hiểu từng công cụ một.*

## JS 'module' the hard way

Trước kia, khi bắt đầu viết một trang web, bạn viết một script, ví dụ `app.js` và bạn cần một `script` tag trong file `index.html` 

```html
<body>
  <script src="/app.js"></script>
</body>
```

Sau đó, bạn quyết đinh dùng thêm thư viện ví dụ như JQuery, vì bạn nghe nói nó rất là tuyệt. Vậy bạn phải thêm nó vào trang web của bạn như thế nào?

Theo cách thông thường nhất, bạn sẽ vào trang web của JQuery, click download, thêm file vừa tải vào thư mục code của bạn, add một `script` tag trước file code chính của bạn. 

```html
<body>
  <script src="/jquery.js"></script>
  <script src="/app.js"></script>
</body>
```

Mặc dù JQuery rất là "tuyệt" thì việc tích hợp nó vào code của bạn theo cách trên quả thật không vui chút nào, và khi nâng cấp phiên bản cho nó chúng ta lại phải làm y hệt từng step như vậy.

Giả sử sau đó chúng ta có một file `utils.js` chứa một vài đoạn code tiện ích cần dùng nhiều lần trong ứng dụng của chúng ta. Chúng ta lại tiếp tục thêm nó vào như sau:

```html
<body>
  <script src="/jquery.js"></script>
  <script src="/utils.js"></script>
  <script src="/app.js"></script>
</body>
```

```js
var pi = 3.142;
function area(radius) {
  return pi * radius * radius;
}
```

từ `app.js` chúng ta có thể thấy là cả `pi` và hàm `area` đều khả dụng, bởi vì khi bạn định nghĩa một biến hoặc một hàm trong một script thì nó sẽ khả dụng tại global scope. Chúng ta có thể ẩn các biến hoặc hàm không cần thiết ở global scope bằng cách dùng IIFE

```js
// utils.js
var utils = (function() {
  var pi = 3.142;
  function area(radius) {
    return pi * radius * radius;
  }
  return { area };
})();
```

```js
// app.js
console.log(utils.area(5)); // 78.55

console.log(pi); // Reference error
```

Cách viết trên được gọi là module pattern, dùng để kiểm soát những thành phần thực sự cần thiết được expose ở global scope.

Nếu bạn để ý thì chúng ta có thể truy cập tới `utils` một cách rất tự do, bởi vì nó được định nghĩa ở global scope, giả sử bạn sử dụng một module hay thư viện khác cũng tên là `utils`, chúng sẽ conflict với nhau.

Chúng ta đều mong muốn có thể 'import' những module này một cách tự do, thay đổi tên chúng theo cách chúng ta muốn, mà không phải lo lắng về việc conflict tên module hay thư viện.

Vì vậy, nhu cầu về moduling khi viết JS là rất cần thiết, nó cần phải đáp ứng được những yêu cầu sau:

- Có thể cài đặt - khả năng cài đặt một cách dễ dàng.
- Khả năng bao đóng - scope được định nghĩa rõ ràng trong các module.
- Khả năng import - có thể import một cách thoải mái mà không cần lo lắng tới naming conflict.

Những khả năng này đều đã được thêm vào JS từ năm 2015, và chúng ta sẽ cùng thử xem cộng đồng JavaScript đã tạo nên những gì để giải quyết bài toán moduling này.

## Khả năng cài đặt

Trong ví dụ trên, thay vì cài đặt JQuery bằng cách tải file về, chúng ta có thể dùng `npm` (package management của Nodejs), với `npm` mọi thứ đều dễ dàng hơn khi cài đặt và quản lý version của các thư viện/packages. Chúng ta chỉ cần list ra những thư viện và version của chúng trong file `package.json` và chạy lệnh `npm install`.

Nếu bạn nghĩ là khả năng cài đặt đã được giải quyết chỉ với những package management tool như là `npm` thì bạn đã lầm. `npm` được tạo ra cho những ứng dụng NodeJS, những package được viết và public lên npm registry không thể sử dụng trực tiếp trong browser được. JavaScript package sử dụng những cú pháp như `module.exports` và `require` không thể được hiểu bởi browser. Vì thể bạn không thể add một `script` tag trong file HTML như sau: 

```html
<body>
  <script src="/node_modules/foo/bar.js"></script>
</body>
```

Vì thể, tool `bower` được tạo ra để giải quyết vấn đề này, nó được gọi là package manager cho web, bởi vì những package được install bởi bower đều có thể được sử dụng trực tiếp trong file HTML.

```
/project
  /bower_components
  /node_modules
  /app
  /bower.json
  /package.json
```

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
```

Bower component sử dụng làm thư viện cho browser và npm packages sử dụng làm build tools, là cách setup web app phổ biến cho đến khi tool tiếp theo xuất hiện.

Browserify được tạo nên, cố gắng mang tất cả các registry của các thư viện từ npm có thể hoạt động được trên trình duyệt. Nó làm vậy bằng cách parse các file thư viện, các module có chứa cú pháp `require`, `export` và tạo thành một file duy nhất. Điều này khiến nó được gọi là module bundler.

Browserify là một trong những module bundler tool phổ biến hiện nay cùng với đó là những tool như webpack, rollup, ... Với những tool này chúng ta có thể thoải mái share code giữa NodeJs và client side script chạy trên browser, cùng với đó là sử dụng `npm` như là package manager.


## Khả năng import

Hãy cùng tổng kết lại vấn đề về import trong ví dụ ở đầu bài viết, chúng ta đã đề cập đến việc các function được đinh nghĩa trong mỗi file, đều khả dụng ở các file còn lại thông qua global scope. Không có điều gì kiểm soát việc bạn đang import cái gì (mỗi lần khai báo script tag là file import toàn bộ file), thứ tự import. Với cách làm trước kia mỗi một file JS chỉ là một đoạn script không hơn không kém, trước khi module system được giới thiệu tới jS.

Với sự ra đời của NodeJS, việc require một module nào đó vào code của bạn là thực sự cần thiết, bởi vì không có file `index.html` để bạn có thể thêm script tag. Bạn cần khả năng require một vài module ngoài vào để làm việc, bằng không bạn sẽ phải viết một file JS rất dài.

CommonJS được giới thiệu tới NodeJs. Nó cho phép bạn có thể require và export những module JS khác nhau. 

```js
require('./circle');

exports.pi = 3.142;
```

Trong ví dụ trên, `require` là đồng bộ (synchronous).

Khi bạn gọi tới `require`, Node runtime sẽ thực hiện những điều sau:
- tìm find bạn đang require.
- parse content của file đó và thực thi nó.
- return những gì mà nó export.

Nhưng nếu chúng ta sử dụng cú pháp require này trên browser thì sao, nó sẽ không thể thực hiện đồng bộ được, vì khi kéo content của file về cần thực hiện network call, điều này đồng nghĩa việc require này là bất đồng bộ. Vì thế chúng ta cần có một có pháp asynchronous kiểu dạng như sau

```js
require('./circle.js', function(circle) {
  
});
```

Lệnh require của CommonJS được cho là không phù hợp với tính bất đồng bộ khi hoạt động trên browser vì vậy cộng đồng JS đã cho ra đời một hệ thống module system khác gọi là AMD (Asynchronous Module Definition).

AMD sử dụng cú pháp asynchronous require, với tham số là một callback chỉ được thực thi sau khi các dependency được loaded.

```js
require(['jquery', 'circle'], function($, circle) {
  
});
```

Như vậy chúng ta đã có hai module system trong JS, CommonJS và AMD, cả hai đều rất hữu dụng, nhưng điều này đồng nghĩa với việc những library owner cần phải support cả hai module system này, bằng cách sử dụng định nghĩa module thống nhất (unified module definition) [UMDjs](https://github.com/umdjs/umd). 

Cũng vì thế mà ES6 đã giới thiệu ES module:

```js
import circle from './circle';

export const pi = 3.142;
```

Phần lớn các trình duyệt tại thời điểm mà ES6 ra mắt vẫn chưa hỗ trợ cú pháp này, vì thế những công cụ như webpack ra đời, nó biến đổi những đoạn code với `import` và `export` bằng cách ghép chúng lại với nhau. Giờ đây thì phần lớn các phiên bản mới của trình duyệt thậm chí còn hỗ trợ thẻ `<script type='module'>` có nghĩa là cú pháp module trong JS đã được hỗ trợ mà không cần bất kỳ build tool nào.

Như vậy, ta có thể thấy là trong nhiều năm, cộng đồng JS đã tách những đoạn code JS ra thành các module và kết nối chúng với nhau thông qua những module system như là CommonJS hoặc là AMD. TC39 đã giới thiệu ES module trong ES6 (ES2015) để chuẩn hóa cú pháp của JS module, và trước khi phần lớn các browser hỗ trợ cú pháp này, chúng ta phải dựa nhiều vào các build tool như là webpack. Cuối cùng, các trình duyệt giờ đây đã hỗ trợ thẻ `<script type='module'>`, có nghĩa là chúng ta có thể khai báo `import` và `export` mà không cần sự hỗ trợ của công cụ nào.

## Khả năng bao đóng trong scope

Có hai vấn đề khi chúng ta nói đến khả năng bao đóng khi viết JS:

- 2 module thường được định nghĩa vào cùng một scope, điều này có thể gây ra naming conflict (xung đột tên).
- Biến định nghĩa trong một module dễ dàng được public và có thể sử dụng trong module khác, điều mà không nên xảy ra.

Để giải quyết vấn đề này có hai cách:

Thứ nhất, scope naming conflict có thể giải quyết bằng cách sử dụng namespace. Nếu bạn đọc code đã được compile của Google Closure Tools, bạn sẽ biết được là những thư viện built-in từ công cụ này đã được viết trong namespace:

```js
goog.provide('tutorial.notepad');
goog.require('goog.dom');

tutorial.notepad.makeNotes = function(data) {
  //...
  goog.dom.appendChild(this.parent, data);
};
```

được compile thành:

```js
// goog.provide('tutorial.notepad');
tutorial = tutorial || {};
tutorial.notepad = tutorial.notepad || {};
// goog.require('goog.dom');
goog = goog || {};
goog.dom = goog.dom || function() { ... };

tutorial.notepad.makeNotes = function(data) {
  //...
  goog.dom.appendChild(this.parent, data);
};
```

Tất cả được ghép lại và khai báo trong cùng một scope, bơỉ vì chúng đã được gói trong một namespace, vì thế naming conflict sẽ không xảy ra.

Cách thứ hai để khắc phục các vấn đề nêu trên đó là tạo một function bao ngoài để tạo một scope cho module đó. Điều này giống như cách bạn định nghĩa module trong AMD:

```js
define('goog/dom', function() { ... });

define('tutorial/notepad', ['goog/dom'], function (googDom) {
  return {
    makeNotes: function(data) {
      //...
      goog.dom.appendChild(this.parent, data);
    },
  },
});
```

bạn sẽ thấy các module được gói trong scope của riêng nó, và cách duy nhất để hai module có thể gọi được đến nhau là thông qua cú pháp `import` và `export`. Thực chất các công cụ như là webpack đã làm giúp chúng ta điều này, và nhìn chung chúng có hai cách để bao đóng module trong scope của riêng nó theo cách webpack hoặc là rollup.

## Tổng kết 

Như vậy trong bài viết này, chúng ta đã tìm hiểu về cách JS module system được giới thiệu đến cộng đồng từ trước đến nay, mục đích ra đời của một số công cụ chúng ta vẫn thường sử dụng và mục đích của chúng trong việc giải quyết các vấn đề khi sử dụng JS module, mong là các bạn có cái nhìn tổng quan và rõ nét hơn.

## Bài viết được tham khảo tại

https://lihautan.com/what-is-module-bundler-and-how-does-it-work/
https://lihautan.com/javascript-modules/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
http://browserify.org/
https://requirejs.org/docs/whyamd.html#amd
https://requirejs.org/docs/commonjs.html