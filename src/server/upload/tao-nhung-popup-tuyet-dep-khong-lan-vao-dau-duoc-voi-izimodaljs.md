**Xin chào các bạn, vào 1 ngày rãnh rỗi, mình lang thang trên các blog công nghệ, tình cờ mình thấy 1 thư viện phục vụ cho việc tạo popup rất hay. Nó hoàn toàn khác biệt với các thư viện khác, nói không quá thì có lẽ đây là thư viện tạo ra những popup có hiệu ứng đẹp nhất mà mình từng thấy, với những hiệu ứng khá lạ và đẹp mắt, nó sẽ giúp chúng ta tạo ra những popup "không đụng hàng" với những website khác. Chém gió vậy thôi chứ nó đẹp như vậy thì không ít thì nhiều cũng có kha khá trang web dùng đấy nhỉ =))**

Nói lan man hơi nhiều rồi, mình sẽ đi vào phần chính là cài đặt và sử dụng, cũng như demo thử cho mọi người thấy nó trông như thế nào :D

iziModal.js là một plugin jQuery, do đó bạn cần một bản sao của thư viện jQuery để nó hoạt động. Nhưng nó khá nhẹ và thậm chí bạn có thể include thư viện bên ngoài từ [CDNJS](https://cdnjs.com/libraries/izimodal) .

Hoặc bạn có thể install thư viện này thông qua một trong các lệnh sau:

**npm**

>  ```npm install izimodal --save```

**gem**

> ```gem install izimodal```

**Lưu ý**: plugin này đi kèm với rất nhiều options khác nhau. 

Bạn có thể chuyển qua các tùy chọn để định dạng kiểu kích thước modal, frame type và animations. Nhưng bạn cũng có thể tạo các callback function nếu người dùng đóng modal hoặc nhấp vào một element cụ thể nào đó.

Bạn có thể tìm thấy rất nhiều ví dụ trên [CodePen](https://codepen.io/collection/DgkRVx/) nhưng mình thực sự thích các bản demo có sẵn trên trang chủ của [iziModal](http://izimodal.marcelodolza.com/).

Design tuyệt vời và modal giống như là một phần của giao diện. Với những animation kèm theo cũng rất ấn tượng và tất cả đều được cung cấp bằng CSS3 & jQuery.

Trên trang chủ, bạn cũng sẽ tìm thấy [documents](http://izimodal.marcelodolza.com//#documentation) với các đoạn code cho mỗi bản demo có sẵn. Đây là đoạn code ngắn nhất để tạo 1 modal đơn giản nhất.

```javascript
$(document).on('click', '.trigger', function (event) {
    event.preventDefault();
    $('#modal').iziModal('open');
});
```

**iziModal()** có hơn 45 options khác nhau để tùy chỉnh modal theo ý muốn của bạn. Nó cũng có các options event có thể kích hoạt các chức năng như khi mở, đóng hoặc full screen popup.

Đây là một thư viện thật sự rất tuyệt vời và nó là một trong những thư viện tạo popup yêu thích nhất của mình về cả design và khả năng sử dụng .

Bạn có thể xem source code đầy đủ của thư viện này thông qua repo chủ của họ trên Github tại [đây](https://github.com/marcelodolza/iziModal).

Xin cảm ơn các bạn đã theo dõi bài viết, cảm ơn và hẹn gặp lại :)

Nguồn: [HongKiat](https://www.hongkiat.com/blog/izimodal-js/)