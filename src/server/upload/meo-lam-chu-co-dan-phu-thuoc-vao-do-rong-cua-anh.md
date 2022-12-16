### Giới thiệu
Xin chào mọi người ! Hôm nay mình xin giới thiệu 1 mẹo CSS nho nhỏ mà mình tin rằng nhiều bạn trong chúng ta đang gặp phải. Đó là làm thế nào để text nó responsive khi đặt ngang hàng với image , bình thường chúng ta sẽ tách ra viết responsive cho ảnh rồi viết riêng cho cả text nhưng với mẹo này sẽ làm text responsive theo ảnh và phụ thuộc vào ảnh. Nhìn ảnh phía dưới có thể hiểu rõ ngay đúng không nhỉ 😀

![](https://images.viblo.asia/7526cd4b-4e24-4b4e-9fc4-7a3ed8c24eb2.jpg)

###  Giải pháp thông thường
1. Đặt chiều rộng của text bằng với chiều rộng của ảnh
2.  Căn cho text xuống dòng bằng với chiều rộng của ảnh
3. Đặt position: absolute cho text theo width: 100% của ảnh

Như hiện nay chúng ta dàn layout cho block có ảnh chúng ta cũng thường dùng flex-box set flex cho thằng cha chứa cái ảnh và text là text cũng resize theo ảnh. Tuy nhiên bài này chúng ta ko cần dùng đến thằng cha bọc ảnh và text, mà làm text responsive phụ thuộc theo image nhé.

### Giải pháp hiện tại
Đây một mẹo rất đơn giản chỉ có vài dòng CSS thôi các bạn à.

**HTML**
```HTML
<div class="box">
   <img>
   <h1>Lorem ipsum dolor ..</h1>
</div>
```

**CSS**
```CSS
.box {
  display: inline-block;
}
h1 {
  width: 0;
  min-width: 100%;
}
```
Để làm được như vậy cần 2 điều: <br>
Đặt cho thằng class cha của ảnh vs text là display: inline-block làm container khít với ảnh và width của nó sẽ được xác định bởi ảnh.
Để title width của nó bằng 0, không tác động đến width của container mà chỉ mỗi ảnh là tác động đến width của container thôi. Tiếp theo là set min-width: 100% để width nhỏ nhất của title khít với độ rộng của container (mà độ rộng của container lại phụ thuộc vào độ rộng của ảnh nên nói 1 cách khải text sẽ resize teo ảnh) 😅

### Ví dụ thực tế
Các bạn có thể vào codepen để xem ví dụ nhé<br>
https://codepen.io/tran-hanh/pen/eYvBvjZ

![](https://images.viblo.asia/ae6bc6b8-b99d-452e-9f80-eba1b315c2bb.png)


Ngoài ra thì chúng ta cũng có thể làm sẽ quyết định độ rộng của một đoạn text đấy. Cách làm thì y hệt như title và image ở trên thôi, làm cho width của title vs đoạn text phụ thuộc vào title và đoạn text có width là 0 , min-width: 100%.

Các bạn xem demo ở đây nhé<br>
https://codepen.io/tran-hanh/full/XWMNMGp

![](https://images.viblo.asia/3df78de0-ed05-4543-9695-5536a47c8c00.png)


### Lời kết
Chỉ với 1 mẹo nho nhỏ bằng với CSS chúng ta có thêm 1 lựa chọn 1 phương pháp nữa khi làm thiết kế giao diện đúng không nào.Hi vọng mẹo này có ích với nhiều bạn và cảm ơn các bạn đã đọc bài.