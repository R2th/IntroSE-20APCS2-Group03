Cũng như bất kỳ khía cạnh nào khác trong cuộc sống, code cũng luôn tiềm ẩn những ngoại lệ `exception` nằm ngoài dự kiến của chúng ta trong quá trình vận hành. Đó là lý do mà tất cả các ngôn ngữ lập trình đều cung cấp cho chúng ta các bộ công cụ giúp khoanh vùng và xử lý các ngoại lệ này trong logic vận hành của code. Các bộ công cụ hỗ trợ để thực hiện tác vụ này thường bao gồm 2 nhóm là - 

- Các cú pháp giúp khoanh vùng phần code có khả năng tạo ra các ngoại lệ về logic vận hành và bắt lại các `object` mô tả ngoại lệ mà hệ thống tạo ra. Ở đây chúng ta cũng có thể khởi tạo các `object` mô tả ngoại lệ bằng code để phát động sự kiện này nếu cần thiết.
- Trình chạy thử code với tính năng `debug` có thể tạm dừng ở một điểm gần đó, và giúp chúng ta di chuyển từng bước trong tiến trình vận hành code để lần ra được logic tạo ra ngoại lệ. :D

Và JavaScript tại môi trường trình duyệt web cũng cung cấp cho chúng ta đầy đủ cả 2 nhóm công cụ này. Tuy nhiên thay vì dùng từ ngoại lệ `exception` như nhiều ngôn ngữ lập trình phổ biến khác, thì JavaScript sử dụng từ `error` - lỗi vận hành - để mô tả về các logic vận hành nằm ngoài dự tính như vậy. Chúng ta sẽ cố gắng dung hòa điểm bất đồng ngôn ngữ này bằng cách gọi là ngoại lệ trong tiếng Việt yêu dấu và `error` cho các vị trí cần sử dụng trong code. :D

## Cú pháp `try .. catch .. finally`

Chúng ta sẽ xem code ví dụ minh họa trước để có chất liệu thực hiện thảo luận về cú pháp này. :D

```error.js
try {
   // thao tác có khả năng phát sinh ngoại lệ 
   // về logic hoạt động của code
   var oneArray = [];
   oneArray.doSomething();
}
catch (error) {
   // thao tác xử lý khi có ngoại lệ phát sinh
   console.error(error.name);
   console.error(error.message);
}
finally {
   // thao tác dọn dẹp tài nguyên cần thiết
   // bất kể có ngoại lệ phát sinh hay không
   var message = 'Có lõi lầm gì hay không '
                + 'thì cuối cùng dòng này cũng vẫn sẽ được in ra'
   console.log(message);
}

// kết quả
// 'TypeError'
// 'oneArray.doSomething is not a function'
// 'Có lõi lầm gì hay không thì cuối cùng dòng này cũng vẫn sẽ được in ra'
```

Rồi... Trông cũng không quá khó hiểu. Chúng ta có 3 khối liên kết với nhau. Một dạng chuyển tiếp tác vụ hoạt động kiểu như `if ... else`.

- Đầu tiên là khối `try { ... }` thực hiện công việc chính của chương trình mà chúng ta viết ra. Từ khóa `try` sẽ thử chạy đoạn code tiềm tàng và giúp chúng ta phát hiện ra các `object` mô tả ngoại lệ `error` có khả năng xuất hiện khi vận hành code. Sau đó, nếu phát hiện được `object` mô tả ngoại lệ `error` được tạo ra, `try` sẽ ném `throw` ra ngoài và dừng thực hiện các câu lệnh tiếp theo sau điểm tìm thấy ngoại lệ.
- Tiếp đến là `catch ( ... )` - bắt lại - đỡ lấy các `object` mô tả ngoại lệ `error` để chúng ta có thể kiểm tra thông tin mô tả ngoại lệ phát sinh và ra quyết định xử lý để phần mềm đáp ứng tốt nhất tới người dùng.
- Và sau đó là `finally` - cuối cùng - thì cho dù có ngoại lệ phát sinh hay không cũng vẫn sẽ chạy phần code hỗ trợ `try` dọn dẹp tài nguyên đang bày dang dở khi thực hiện công việc. Ví dụ như đóng các tệp lại, hoặc xóa `object` nào đó, hoặc thiết lập lại các công cụ mà `try` sử dụng để chuẩn bị cho các lượt chạy code khác.

Các lệnh in `console.error` được sử dụng để phân biệt với các lệnh in nhật ký thông thường `console.log` và dễ nhận biết hơn khi đọc thông báo. Nếu muốn, chúng ta có thể `console.log` cũng được, nhưng chỉ nên làm như vậy trong trường hợp chúng ta ít phải in thông tin kiểm tra ra `console`. :D

## Các `object` mô tả ngoại lệ `error`

Giống với các `object` mô tả sự kiện `event`, các `object` mô tả ngoại lệ `error` đều thuộc một `class` cơ sở chung nhất là `Error` - [**Tài liệu về `class Error` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) - và có 2 thuộc tính căn bản là - 

- `name` - chứa chuỗi mô tả tên của `class` cơ sở gần nhất có thể sử dụng để phân cấp các ngoại lệ và ra quyết định xử lý khác nhau. Như trong code ví dụ ở trên thì chúng ta có tên `class` là `TypeError` mô tả các ngoại lệ về nhầm lẫn logic sử dụng kiểu dữ liệu trong câu lệnh.
- `message` - chứa chuỗi mô tả tin nhắn thường được in ra `console` để xem thông tin mô tả về ngoại lệ. Và trong ví dụ trên là thông báo `oneArray.doSomething không phải là một hàm` - có nghĩa là chúng ta đang dùng `oneArray.doSomething` sai logic về kiểu dữ liệu của `doSomething`.

Như vậy chúng ta cũng có thể tự tạo ra các `object` mô tả ngoại lệ ở khối `try` và ném ra ngoài cho `catch` bắt lấy. :D

```throw.js
try {
   var message = 'Có nhầm lẫn gì đó về logic sử dụng'
               + 'một kiểu giá trị nào đó'
   throw new TypeError(message);
}
catch (error) {
   console.error(error.name);
   console.error(error.message);
}
finally {
   var message = 'Có lõi lầm gì hay không '
               + 'thì cuối cùng dòng này cũng vẫn sẽ được in ra';
   console.log(message);
}

// kết quả:
// 'TypeError'
// 'Có nhầm lẫn gì đó về logic sử dụng một giá trị nào đó'
// 'Có lõi lầm gì hay không thì cuối cùng dòng này cũng vẫn sẽ được in ra'
```

Tuyệt... Như vậy là chúng ta đã có nhóm công cụ đầu tiên để xử lý các ngoại lệ về logic vận hành của code. Bạn lưu ý là cũng giống với khi sử dụng `Event`, chúng ta cũng có thể tạo ra các `class` con mở rộng class cơ sở `Error` để mô tả các kiểu ngoại lệ khác hỗ trợ cho chương trình mà chúng ta đang xây dựng.

## Chạy thử code từng bước một để lần ra logic tạo ngoại lệ và sửa chữa lại

Ở đây chúng ta có thể đặt thêm lệnh `debugger;` vào đoạn code mà chúng ta nghi vấn nhất về khả năng tạo ra ngoại lệ có logic phức tạp để trình duyệt web có thể giúp chúng ta tạm dừng ở vị trí đó và chạy tiếp từng bước.

`debug.js`
```js
try {
   debugger;   // tạm dừng tiến trình chạy code ở đây
   var a = 0;
   var b = 1;
   throw new TypeError(
      'Có nhầm lẫn gì đó về logic ' +
      'sử dụng một giá trị nào đó'
   );
} // try
/* --- */
```

Sau đó chúng ta mở cửa sổ `Sources` ở bên cạnh `Console`; Rồi mở tệp `.js` và `refresh` trình duyệt web để mở lại trang web. Lúc này tiến trình chạy tệp JavaScript sẽ tạm dừng ở lệnh `debugger;`, và chúng ta có thể nhấn phím `F10` hoặc tổ hợp phím `Ctrl + '` để di chuyển tiếp từng câu lệnh và theo dõi tiến trình chạy code để suy luận ra logic tạo ra ngoại lệ. :D

![](https://images.viblo.asia/febf226c-f9e7-4752-9b52-856710375484.png)

Như vậy là chúng ta đã thực hiện xong bài viết về chủ đề `Error & Handling` và có trong tay 2 nhóm công cụ để khoanh vùng phần code có khả năng phát sinh ngoại lệ khi vận hành và đưa ra phương án xử lý. Trong bài tiếp theo, chúng ta sẽ tìm hiểu về các chế độ vận hành code JavaScript để hiểu rõ hơn về các trường hợp tiềm năng tạo ra các ngoại lệ. Bên cạnh đó, chúng ta sẽ nói về khái niệm `module`, giúp chúng ta phân tách công việc cần thực hiện tốt hơn và tổ chức lưu trữ/sử dụng nhiều tệp JavaScript. Hẹn gặp lại bạn trong bài viết tiếp theo.

[**[JavaScript] Bài 17 - Mode & Module**](https://viblo.asia/p/07LKXRz8lV4)