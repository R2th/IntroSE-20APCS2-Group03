Bài viết này chỉ mang tính chất ví dụ, làm quen với tài liệu và công cụ mà jQuery cung cấp để tạo ra một `plug-in` được dịch lại từ nguồn `jQuery Learning Center`. Thông thường thì khi nhắc tới jQuery, các thành phần `component` được xây dựng và chia sẻ trong cộng đồng hay được gọi là `plug-in`. Trong khi đó thì khái niệm `plug-in` được `jQuery Learning Center` định nghĩa rộng hơn một chút - Một `plug-in` có thể là một hàm tiện ích nhỏ, hoặc cũng có thể là một thành phần tạo giao diện người dùng với độ phức tạp cao.

Tuy nhiên, ở thời điểm hiện tại, trước khi quyết định xây dựng một `plug-in` trên nền jQuery, hãy chắc chắn rằng bạn đã tìm kiếm qua các nguồn chia sẻ phổ biến như [jQueryScript.net](https://www.jqueryscript.net/jquery-plugins/) hoặc [npmjs.com](https://www.npmjs.com/). Bởi vì jQuery đã từng là thư viện JavaScript số một trong nhiều năm trước đây; Và ngay cả ở thời điểm hiện tại, khi mà công nghệ lập trình giao diện ở phía mặt tiền `front-end` đã thay đổi rất nhiều, thì jQuery vẫn còn được ưa chuộng bởi rất nhiều người do tính đơn giản và tiện dụng; Do đó sẽ rất khó có khả năng là bạn không thể tìm thấy một `plug-in` phù hợp với nhu cầu sử dụng đang được chia sẻ ở đâu đó ngoài kia. :D

## Làm thế nào để tạo ra một Plug-in?

Đôi khi chúng ta có thể sẽ muốn tạo ra một vài tiện ích có thể được sử dụng xuyên suốt toàn bộ `project` mà chúng ta đang thực hiện. Ví dụ như bạn có thể sẽ muốn tạo ra một phương thức mà bạn có thể gọi trên một `object jQuery` bất kỳ để thực hiện một thao tác đồng loạt trên nhiều phần tử HTML được chọn. Trong trường hợp này, bạn có thể sẽ muốn viết một `plug-in`.

Trước khi bắt đầu tự viết `plug-in` để sử dụng thì chúng ta cần tìm hiểu một chút về cách mà jQuery hoạt động. Hãy cùng xem ví dụ dưới đây -

```js
$("a").css("color", "red");
```

Đây là một câu lệnh jQuery rất cơ bản, tuy nhiên bạn có muốn biết điều gì xảy ra ở phía sau những lời gọi hàm không? Các `object jQuery` lấy các phương thức từ một `object` đặc biệt - đó là `jQuery.fn` - có chứa tất cả các phương thức mà chúng ta đã sử dụng. Nếu như chúng ta muốn viết ra các phương thức có thể được sử dụng đối với bất kỳ `object jQuery` nào, thì chúng ta cũng cần phải thực hiện điều tương tự. Đó là lưu các phương thức của chúng ta vào `object jQuery.fn`.

## Khai báo tên miền cho Plug-in

Hãy lấy ví dụ là chúng ta muốn tạo ra một plug-in giúp đổi màu chữ của các phần tử được chọn. Tất cả những gì mà chúng ta cần làm đó là lưu một hàm `colorText` vào trong `object jQuery.fn`. Và sau đó hàm này sẽ có thể được gọi như một phương thức của các `object jQuery`.

```js
jQuery.fn.colorText = function(value) {
   this.css('color', value);
   return this;
};

$('a').colorText('royalblue')
      .addClass('nav-link');
```

Ở đây chúng ta có con trỏ `this` trỏ về `object jQuery` đang gọi phương thức `colorText`. Và để sau khi gọi phương thức này xong, chúng ta có thể gọi nối tiếp phương thức khác, thì chúng ta cần trả về con trỏ `this`.

## Bảo vệ tên biến tham chiếu tắt

Tên biến `$` được sử dụng bởi rất nhiều thư viện JavaScript khác; Và nếu như một thời điểm nào đó, chúng ta muốn sử dụng cùng lúc những thư viện khác song song với jQuery, chúng ta sẽ phải ngưng jQuery sử dụng tên biến này ở `scope` toàn cục bằng cách gọi phương thức `jQuery.noConflict()`. Tuy nhiên, điều này sẽ khiến cho code của chúng ta đã viết trước đó không thể hoạt động được. Giải pháp là chúng ta có thể bao quanh toàn bộ code đã viết bởi một hàm tự gọi `self-invoking function` và truyền biến `jQuery` vào hàm.

```js
jQuery.fn.colorText = function(value) {
   this.css('color', value);
   return this;
};

void function ($) {
   $('a').colorText('royalblue')
         .addClass('nav-link');
} (jQuery); // void
```

## Tránh tạo nhiều tên miền cho Plug-in

Chúng ta nên cố gắng tránh tạo ra nhiều tên miền để sử dụng cho `plug-in` của mình và nếu có thể thì một `plug-in` chỉ nên sử dụng một tên duy nhất trong `jQuery.fn`. Điều này sẽ giúp giảm thiểu khả năng `plug-in` của chúng ta sẽ bị ghi đè tính năng nào đó khi sử dụng chung với các `plug-in` khác đang được chia sẻ xung quanh.

```js
void function ($) {
   jQuery.fn.popup = function(action) {
      if (action == "open") {
         // Open popup
      }
      else if (action == "close") {
         // Close popup code.
      }
      else {
         console.error('jQuery.popup(action) -> invalid action type');
      }
   }; // fn.popup
} (jQuery); // void
```

## Hỗ trợ sử dụng Plug-in với các tham số lựa chọn

Khi `plug-in` của bạn trở nên phức tạp dần và có nhiều tính năng nâng cao, việc cung cấp các tham số lựa chọn để người sử dụng có thể viết lệnh truyền vào các tham số là điều rất quan trọng. Cách đơn giản nhất để thực hiện điều này là sử dụng một `object` chứa các tham số.

```js
jQuery.fn.colorText = function(options) {
   var defaultOptions = {
      color: 'royalblue',
      background: 'white'
   };

   var settings = jQuery.extend(defaultOptions, options);

   return this.css({
      color: settings.color,
      backgroundColor: settings.backgroundColor
   });
}; // fn.colorText
```

Code sử dụng:

```js
void function ($) {
   $('div').colorText({ color: 'orange' })
           .addClass('jumbotron-heading');
} (jQuery); // void
```

Ở đây giá trị mặc định của `color` là `royalblue` được ghi đề bởi `jQuery.extend()` và trở thành `orange`.

Bài viết giới thiệu về phương thức khởi tạo các `plug-in` đơn giản với jQuery của chúng ta đến đây là kết thúc. Trong bài viết sau, chúng ta sẽ tìm hiểu cách tạo ra các `stateful plug-in/widget`. Từ `stateful` để mô tả đặc tính gì của các `plug-in/widget` thì chúng ta để dành sang bài sau nhé. :D

Hẹn gặp lại bạn trong bài viết tiếp theo.

[[jQuery] Bài 6 - Cách Viết Một Stateful Widget](https://viblo.asia/p/GrLZDree5k0)