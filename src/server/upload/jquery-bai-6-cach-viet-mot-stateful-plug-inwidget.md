Bài viết này chỉ mang tính chất ví dụ, làm quen với tài liệu và công cụ mà jQuery UI cung cấp để tạo ra một `widget` được dịch lại từ nguồn `jQuery Learning Center`.

Trong khi hầu hết các `plug-in jQuery` đều là `stateless` - không có khả năng lưu trữ dữ liệu mô tả trạng thái hiện hành của các thành phần giao diện người dùng - thì chúng ta vẫn luôn mong muốn có những tính năng vượt ngoài tính khả dụng của dạng thức viết code hiện tại. Và để giúp cho điều này trở nên khả thi, jQuery UI đã xây dựng và cung cấp một dạng thức `plug-in` nâng cao với khả năng tùy biến mạnh mẽ hơn.

Các `widget` của jQuery UI được gọi là các `plug-in` đặc biệt vì được xây dựng dựa trên các công cụ và các lớp trừu trượng do jQuery UI cung cấp. Do đó các `widget` thường có nhiều phương thức tiện ích sử dụng chung chứ không hoàn toàn tự viết bởi mỗi lập trình viên. Điều này giúp tạo ra một giao diện lập trình chung cho các `widget`; và giúp cho việc chia sẻ, chỉnh sửa code trở nên dễ dàng hơn.

Các `widget` có thể được xây dựng với khả năng lưu trữ thông tin mô tả trạng thái hiện hành `stateful` của các thành phần giao diện người dùng. Công cụ khởi tạo các `widget` được jQuery UI cung cấp có tên gọi là `Widget Factory` và có thể được truy xuất bởi biến tham chiếu `jQuery.widget`. Và để làm ví dụ về các khả năng của Widget Factory, chúng ta sẽ xây dựng một `plug-in` đơn giản mô tả trạng thái của một thang đo tiến trình `progress-bar`.

## Tạo một Stateful Widget đơn giản

Khi `widget` của chúng ta được gọi, nó sẽ tạo ra một object thực thể `instance` và tất cả các phương thức sẽ được thực thi bên trong bối cảnh của `object` đó. Đối tượng tạo bối cảnh thực thi các phương thức này là một `object` khác với `object jQuery` và `object Element`.

```js
jQuery.widget("hnvn.progressbar", {
   _create: function() {
      var progress = this.options.value + '%';
      this.element.addClass("progressbar").text(progress);
   }
}); // jQuery.widget
```

Tên của một `widget` phải bao gồm một không gian định danh `namespace`, và trong trường hợp này chúng ta đang đặt tên `namespace` là `hnvn`. Ở đây `this.element` là một `object jQuery` chứa duy nhất một phần tử. Nếu như `plug-in` của chúng ta được gọi trên một `object jQuery` có chứa nhiều phần tử, thì ứng với mỗi phần tử sẽ có một object `widget` được tạo ra. Thuộc tính `this.options` được sử dụng để cung cấp các tùy chọn thiết lập ở dạng `key/value`. Các tùy chọn có thể được truyền vào `widget` như mô tả dưới đây -

```js
$("<div></div>").appendTo("body").progressbar({ value: 21 });
```

Khi chúng ta gọi phương thức `jQuery.widget` ở ví dụ trước đó, câu lệnh này đã mở rộng jQuery bằng cách bổ sung thêm một phương thức vào `jQuery.fn` giống với cách mà chúng ta đã tạo ra một `plug-in` đơn giản ở bài trước. Các giá trị tùy chọn mà chúng ta cung cấp được cập nhật vào `this.options` của object mô tả `widget`. Chúng ta cũng có thể thiết lập các giá trị mặc định cho các tùy chọn của `widget` như sau -

```js
jQuery.widget("hnvn.progressbar", {
   options: {
      value: 0
   },
    
   _create: function() {
      var progress = this.options.value + '%';
      this.element.addClass("progressbar").text(progress);
   }
}); // jQuery.widget
```

## Bổ sung các phương thức cho Widget

Bây giờ chúng ta sẽ bổ sung thêm khả năng thực hiện các hành động bằng cách gọi các phương thức của `widget`. Để định nghĩa một phương thức của `widget` chúng ta chỉ cần viết ra bên trong `object` định nghĩa `widget`. Ở đây `Widget Factory` còn cho phép chúng ta tạo ra các phương thức ẩn `private` bằng cách đặt tên với ký hiệu gạch dưới `_` ở phía trước.

```js
$.widget("hnvn.progressbar", {
   options: {
      value: 0
   },
 
   _create: function() {
      var progress = this.options.value + '%';
      this.element.addClass("progressbar").text(progress);
   },
 
   // phương thức `public`
   value: function(value) {
      if (value === undefined) {
         return this.options.value;
      }
      else {
         this.options.value = this._constrain(value);
         var progress = this.options.value + "%";
         this.element.text(progress);
      }
   }, // 
 
    // phương thức `private`
   _constrain: function(value) {
      if (value > 100)      return 100;
      else if (value < 0)   return 0;
      else                  return value;
    } // _constrain
```

Để gọi một phương thức của `widget`, chúng ta có thể truyền vào `plug-in` tên của phương thức đó. Các tham số của phương thức, nếu có, sẽ được truyền vào ở các vị trí tham số tiếp theo khi gọi `plug-in`.

```js
var bar = $("<div><div/>").appendTo("body").progressbar({ value: 21 });
 
// Truy xuất giá trị `value` hiện tại
alert( bar.progressbar("value") );
 
// Cập nhật `value`
bar.progressbar("value", 50);
 
// Test
alert( bar.progressbar("value") );
```

## Làm việc với các tham số tùy chọn

`Widget Factory` có cung cấp cho chúng ta phương thức `_setOption` để làm việc với `object` mô tả các tùy chọn như sau -

```js
jQuery.widget("hnvn.progressbar", {
   options: {
      value: 0
   },
 
   _create: function() {
      this.element.addClass("progressbar");
      this._update();
   },
 
   _setOption: function(key, value) {
      this.options[key] = value;
      this._update();
   },
 
   _update: function() {
      var progress = this.options.value + '%';
      this.element.text(progress);
   }
}); // jQuery.widget
```

## Bổ sung tùy chọn sử dụng Callback

Một trong những cách thức đơn giản nhất để cung cấp khả năng tùy biến cho `widget` của chúng ta đó là bổ sung thêm khả năng hỗ trợ `callback`. Như vậy người sử dụng `widget` sẽ có thể viết code đáp ứng lại sự thay đổi trạng thái của `widget`. Để bổ sung tùy chọn sử dụng `callback`, chúng ta sử dụng phương thức `_trigger` với 3 tham số là - tên của `callback`, một `object` mô tả sự kiện để kích hoạt `callback` nếu cần thiết, và một trường giá trị tùy chọn liên quan tới `callback`.

```js
jQuery.widget("hnvn.progressbar", {
   options: {
      value: 0
   },
 
   _create: function() {
      this.element.addClass("progressbar");
      this._update();
   },
 
   _setOption: function(key, value) {
      this.options[key] = value;
      this._update();
   },
 
   _update: function() {
      var progress = this.options.value + '%';
      this.element.text(progress);
      
      if (this.options.value == 100)
         this._trigger("complete", null, {value:100});
      else
         { /* do nothing */ ; }
    }
}); // jQuery.widget
```

Các hàm gọi lại `callback` về cơ bản chỉ là các tùy chọn bổ sung, vì vậy nên chúng ta có thể viết code sử dụng bên ngoài giống như các tùy chọn khác.

```js
var bar = $("<div></div>").appendTo("body");

bar.progressbar({
   complete: function(event, data) {
      alert("The progress is completed.");
   }
}); // progressbar

bar.bind("complete", function(event, data) {
   alert("Events bubble and support many handlers for extreme flexibility.");
   alert("The progress bar value is " + data.value);
});
 
bar.progressbar("option", "value", 100);
```

## Dọn dẹp Widget khi ngưng sử dụng

Trong một số trường hợp, chúng ta có thể sẽ muốn cho phép người sử dụng `widget` bỏ kích hoạt `widget` một cách chủ động. Điều này có thể được thực hiện qua phương thức `_destroy`, nơi mà chúng ta sẽ hoàn lại các thao tác `undo` mà chúng ta đã thiết lập cho `widget`. Phương thức `_destroy` sẽ tự động được gọi khi phần tử HTML tương ứng với `widget` của chúng ta được tách khỏi `document`.

```js
jQuery.widget("hnvn.progressbar", {
   options: {
      value: 0
   },
 
   _create: function() {
      this.element.addClass("progressbar");
      this._update();
   },
 
   _setOption: function(key, value) {
      this.options[key] = value;
      this._update();
   },
 
   _update: function() {
      var progress = this.options.value + '%';
      this.element.text(progress);
      
      if (this.options.value === 100)
         this._trigger("complete", null, {value: 100});
      else
         { /* do nothing */ ; }
   },
 
   _destroy: function() {
      this.element.removeClass("progressbar").text(' ');
   }
}); // jQuery.widget
```

## Tổng kết

Widget Factory được jQuery UI cung cấp để giải quyết rất nhiều vấn đề phổ cập khi xây dựng `plug-in` trên nền jQuery, và hỗ trợ chúng ta có thể tạo ra các Stateful Widget để đáp ứng tốt hơn với những nhu cầu thiết kế `plug-in` có tính năng đa dạng.

Bài viết giới thiệu về cách tạo ra một Stateful Widget của chúng ta tới đây là kết thúc. Đây cũng là bài viết cuối cùng của `Sub-Series jQuery` trong [Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m). Để tìm hiểu thêm về thư viện jQuery và các công cụ liên quan, bạn có thể sử dụng các nguồn hướng dẫn sau:

- [Hướng dẫn tự học jQuery của W3schools](https://www.w3schools.com/jquery/default.asp)
- [Hướng dẫn tự học jQuery của TutorialsPoint](https://www.tutorialspoint.com/jquery/index.htm)