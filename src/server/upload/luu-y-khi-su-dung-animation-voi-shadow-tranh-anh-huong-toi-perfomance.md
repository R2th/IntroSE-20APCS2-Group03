### Giới thiệu
Bình thường khi chúng ta viết shadow cho box rồi thêm Animation khi hover để làm nổi bật lên nhưng không biết rằng nếu không viết đúng thì Animation lên box có chứa `box-shadow` sẽ ảnh hưởng đến performance của trang Web. Để có cùng animation như mong muốn mà vẫn không làm tăng performance thì chúng ta nên sử dụng `pseudo-element` before hay after sẽ chạy animation ở khoảng 60 FPS, ở đây sẽ là animation `opacity` của `pseudo-element`.
![](https://images.viblo.asia/5c5188b7-fbaa-4ea5-8e3d-d9c2ee4e8cec.gif)
Cụ thể khi các bạn mở develop tool lên sẽ thấy rõ sự khác biệt khi sử dụng box-shadow và animation thẳng vào sẽ khác với  animation vào pseudo-element element. Mọi người có thể tham khảo hình bên dưới.

![](https://images.viblo.asia/b61a14a5-7551-4ef9-9758-fdf03ca1dfd3.png)


###  CSS Technique
**1. Với box-shadow thông thường**<br>
 Đây là cách mà chúng ta thường xuyên làm khi thêm box-shadow cho cái gì đó xong có thêm animation hover vào sẽ ảnh hưởng đến perfomance của trang Web.

```CSS
/* cách animation box-shadow chậm */
.box-slow {
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
}

/* Transition làm to shadow khi hover */
.box-slow:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
```

**2.  Với cách sử dụng pseudo-element**<br>
Cách này sẽ sử dụng transition vs opacity để tác động animation vào pseudo-element mà không gây ảnh hưởng tới performance.
```CSS
* Cách animation box-shadow nhanh */
.box-fast {
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

/* Cũng là làm box-shadow to hơn nhưng ẩn nó đi */
.box-fast::after {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* Transition để show cái box-shadow khi hover*/
.box-fast:hover::after {
  opacity: 1;
}
```

### Lời kết
 Hi vọng nhỏ trên về cách viết, cách sử dụng animation vào box-shadow sẽ giúp cho việc viết CSS được tốt hơn vs tối ưu performance của trang Web hơn. Cảm ơn các bạn đã đọc bài.