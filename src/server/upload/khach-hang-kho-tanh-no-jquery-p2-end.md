Xin chào mọi người! Tiếp nối [phần 1](https://viblo.asia/p/khach-hang-kho-tanh-no-jquery-m68Z03LQKkG), bài viết về các dự án không dùng JQUERY hơi không thành công cho lắm, mình xin mạn phép viết tiếp phần 2, cùng theo dõi bên dưới nhé.

# 1. Each
Giả sử ta có đoạn code html như sau:
```
<div class="list">
    <div class="item">Item 1</item>
    <div class="item">Item 2</item>
    <div class="item">Item 3</item>
    <div class="item">Item 4</item>
</div>
```
- jQuery
```
$(".item").each(function(){
    // do some thing
});

```
- ~~jQuery~~
```
var listItem = document.querySelectorAll(".item");
listItem.forEach(function(item) {
  // do some thing
});
```

Để get các elements có class "item" trong JS ta sử dụng **querySelectorAll**, hàm này sẽ trả về cho ta một array các phần tử, việc tiếp theo là sử dụng hàm **forEach** trong JS để duyệt mảng trên.

# 2. Empty
- jQuery
```
$(element).empty();
```
- ~~jQuery~~
```
element.innerHTML = '';
```

# 3. Attributes
- jQuery
```
$(element).attr('my-attribute');
```

- ~~jQuery~~
```
element.getAttribute('tabindex');
```

# 4.  Get Content 
- jQuery
```
$(element).text();
```

- ~~jQuery~~
```
element.textContent
```

>  Các mục 2, 3, 4 khá là đơn giản nên mình không có giải thích gì thêm, các bạn xem cũng qua cũng dễ nhận ra không quá phức tạp khi dùng JS  thuần :D


# 5. Ajax ( POST )
Ajax được dùng khá phổ biến khi chúng ta muốn thực hiện gửi một yêu cầu đến server và xử lý dữ liệu server trả về mà không muốn load lại trang. Với jQuery, ta có cú pháp đơn giản như sau:
```
$.ajax({
  type: 'POST',
  url: '/url',
  data: data
});
```

- ~~jQuery~~
```
var request = new XMLHttpRequest();
request.open('POST', '/url', true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.send(data);
```
Và khi không có jQuery, để bắt đầu chúng ta tạo 1 đối tượng **request**. Sau khi đã có đối tượng request, mình sử dụng phương thức **open** để cấu hình cho request. Trong đó:
- **Thuộc tính đầu tiên là tên kiểu request**: GET, HEAD, POST, PUT, DELETE,…
- **Thuộc tính tiếp theo là địa chỉ URL** mà mình muốn gửi request đến.
- **Thuộc tính cuối cùng là đối số kiểu bool**, với giá trị **false** ý nghĩa là request kiểu **đồng bộ**  và giá trị **true** ý nghĩa là request kiểu **bất đồng bộ** (chỗ này mình sẽ không giải thích thêm các bạn có thể tự tìm hiểu nhé).

Sau khi request được cấu hình xong, để gửi request này đến **server**, mình sẽ sử dụng phương thức **send** . Ngoài ra, nhiều trường hợp bạn phải chèn thêm **header** cho request thì server mới chấp nhận. Để làm được việc này, bạn có thể sử dụng phương thức **setRequestHeader**. 
```
XMLHttpRequest.setRequestHeader(header, value)
```
 
# 6. Tổng kết
- Cám ơn các bạn đã quan tâm, hi vọng chút chia sẽ trên phần nào hữu ích cho các bạn.
- Tham khảo
    - http://youmightnotneedjquery.com/ (chính chủ :D)