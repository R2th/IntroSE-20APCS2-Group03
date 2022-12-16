Trong bài viết này mình sẽ chia sẻ cách lấy được tỷ lệ hình ảnh của một ảnh gốc nhé.<br>
Giả sử mình có một ảnh gốc có kích thước ban đầu là Width: 400px; Height: 300px;<br>

![](https://images.viblo.asia/44e44d4f-b51f-4d81-9154-84fecdc22c2d.jpg)

Tuy nhiên, nếu mình muốn style lại hình ảnh với kích thước với  Width: 200px; chiều cao giữ nguyên Height: 300px; chúng ta sẽ được một bức ảnh như bên dưới. <br>

![](https://images.viblo.asia/167cd57b-2177-43d6-afc2-8b10d7f36c3a.png)
```CSS
img {
  width: 200px;
  height: 300px;
}
```

Chúng ta thấy rằng hình ảnh đang được thu nhỏ để vừa với vùng chứa 200x300 pixel (tỷ lệ khung hình ban đầu bị phá hủy).<br>
Tuy nhiên, chúng ta có thể xác định được tỷ lệ khung hình của ảnh gốc và có thể style lại kích thước với một kích thước mới mà không làm vỡ hình ảnh với tỷ lệ ban đâu.<br>
Ví dụ:<br>
```
- Chiều rộng ảnh gốc ban đầu là: Width (w0) = 400px
- Chiều cao ảnh gốc ban đầu là: Height (h0) = 300px
- Chiều rộng người dùng muốn thay đổi: Width (w1) = 200px

Từ 3 tham số trên, chúng ta sẽ có tỷ lệ khung hình của ảnh gốc ban đầu là:
Tỷ lệ ảnh gốc: 400/300 = 1.3333

Vì người dùng muốn thay đổi lại chiều rộng 200px so với ảnh gốc, nên chúng ta phải xác định lại chính xác chiều cao so với chiều rộng 200px, để cho nó phù hợp với tỉ lệ ảnh gốc ban đầu.
Mục đích để hình ảnh hiển thị với kích thước mới không bị vỡ hình ảnh.

Chiều cao mới Height (h1) = 200/1.3333 = 150px;

Cuối cùng chúng ta có tỉ lệ ảnh chuẩn mới như dưới:
Width (w1) = 200 px
Height (h1) = 150px;
```

Bây giờ chúng ta style lại  với Width: 200px, Height: 150px:<br>
```CSS
img {
  width: 200px;
  height: 150px;
}
```

Chúng ta sẽ thấy, hình ảnh sau khi thay đổi sẽ không bị vỡ và giữ đúng tỷ lệ với kích thước ảnh gốc ban đầu:
![](https://images.viblo.asia/f6eede0b-8b5e-48ef-a869-115f942980c3.png)

```
- Tiếp tục, giả sử mình muốn thay đổi chiều cao của bức ảnh là Height (h1) = 500px
- Chúng ta có thể tính được chiều rộng Width (w1) bằng công thức bên dưới nhé:

- Chiều rộng ảnh gốc ban đầu là: Width (w0) = 400px
- Chiều cao ảnh gốc ban đầu là: Height (h0) = 300px
- Chiều cao người dùng muốn thay đổi: Height (h1) = 500px

 Tỷ lệ ảnh gốc: 300/400 = 0.75
 Chiều rộng Width (w1)= 500/0.75 = 667px;
 
Cuối cùng chúng ta có tỉ lệ ảnh chuẩn mới như dưới:
Height (h1) = 500px;
Width (w1) = 667px px
```

Bây giờ chúng ta style lại  với Height: 500px, Width: 667px:<br>
```CSS
img {
    height: 500px;
    width: 667px;
}
```
![](https://images.viblo.asia/4183673c-2d17-4d28-8745-6114e9701802.png)

Link tham khảo: https://math.stackexchange.com/questions/180804/how-to-get-the-aspect-ratio-of-an-image

Hy vọng bài viết hữu ích cho các bạn!