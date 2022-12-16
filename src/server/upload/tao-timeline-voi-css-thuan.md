Timeline đã trở thành một tính năng phổ biến trong nhiều thiết kế web và người dùng thấy chúng rất hấp dẫn. Tuy nhiên, việc thực hiện timeline này không phải là dễ dàng vì khách hàng luôn yêu cầu một cái gì đó độc đáo cho trang web của họ.

Nhưng bạn không cần phải bắt đầu mọi thứ bằng đầu nếu bạn đã có một nền tảng cơ bản. Vì vậy, trong bài viết này, mình sẽ hướng dẫn các bạn các bước để tạo dòng thời gian ngang có thể tùy chỉnh bằng CSS thuần.

![](https://images.viblo.asia/80e9d38d-40fb-4bc2-812d-23176f9e39c3.png)

### Bước 1: Tạo cấu trúc cơ bản

Mình sẽ bắt đầu mọi thứ bằng cách tạo cấu trúc cơ bản của timeline. Đầu tiên, mình sẽ thiết kế 1 đường ở giữa và sau đó sắp xếp Ngày và Sự kiện bên trong các container box.

Sau đó, mình sẽ kết hợp nhiều container box để tạo thành luồng sự kiện. Bạn sẽ có thể tạo cấu trúc cơ bản như trong sơ đồ bằng cách sử dụng đoạn mã dưới đây.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Timeline</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <section class="timeline-wrapper">
        <div class="middle-line"></div>

        <div class="box box-top">
            <div class="date">
                <p>20</p>
                <p>DEC</p>
            </div>
            <div class="box-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
            </div>
        </div>

        <div class="box box-bottom">
            <div class="date">
                <p>11</p>
                <p>AUG</p>
            </div>
            <div class="box-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
            </div>
        </div>
    </section>
</body>
</html>
```

### Bước 2: Điều chỉnh Chiều cao và Chiều rộng

Bây giờ, mình sẽ tạo một trình bao bọc cho dòng thời gian để sửa chiều cao và chiều rộng của nó. Theo ví dụ dưới đây, trình bao bọc dòng thời gian có chiều cao 300px và nó sẽ chiếm toàn bộ chiều rộng của màn hình. 

Bằng cách đặt lề: tự động dòng thời gian sẽ được căn giữa theo chiều ngang.

```
.timeline-wrapper {
  position: relative;
  width: 100%;
  margin: auto;
  height: 300px;
}
```

> Mẹo: Đảm bảo set `position: relative` các phần tử cha và `position: absolute` cho các phần tử con để các phần tử con có thể được sắp xếp hợp lý so với phần tử cha của chúng.

### Bước 3: Vẽ đường giữa

Ở bước thứ ba, mình sẽ thêm các style vào đường giữa. `middle-line` sẽ chiếm toàn bộ chiều rộng của `timeline-wrapper` và nó sẽ có chiều cao là 5px. Nó được đặt ở vị trí chính xác giữa `timeline-wrapper` bằng cách đặt `top: 50%` và transform: translateY(-50%).

```
.timeline-wrapper .middle-line {
  position: absolute;
  width: 100%;
  height: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: #d9d9d9;
}
```

> Mẹo: Để `top: 50%` là không đủ để định vị middle-line chính xác ở giữa. Vì nó có chiều cao là 5px, middle-line sẽ bị lệch xuống dưới 5px :v. Vậy nên dịch -50% theo trục Y là điều cần thiết để định vị middle-line vào đúng giữa.

### Bước 4: Định vị ngày

Bây giờ, hãy xác định vị trí của các ngày trong dòng thời gian! Đầu tiên, mình sẽ chia dòng thời gian thành nhiều phần.

Mình đã đặt chiều rộng của các box là 17% để có thể chia dòng thời gian thành sáu phần - ngoài ra, thuộc tính `float: left` là để sắp xếp các phần tử theo chiều ngang.

```
.box {
  width: 17%;
  position: relative;
  min-height: 300px;
  float: right;
}
```

> Mẹo: Class `box` nên được set `position: relative`, vì nó sẽ là phần tử cha cho các class `date` và `box-content`.

Class `date` được đặt ở giữa dòng thời gian bằng cách sử dụng `top: 50%` và `transform: translateY(-50%)`. `border-radius` được đặt thành 100% để tạo ra 1 đường tròn xung quanh ngày. Ngày được đặt bên trong thẻ `p` với văn bản được căn giữa.

```
.box .date {
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #fff;
  border: 2px solid #d9d9d9;
}
.date p {
  text-align: center;
  margin-top: 3px;
  margin-bottom: 0px;
}
```

![](https://images.viblo.asia/ab648766-5b20-4f0e-a514-371497f42c98.png)
gần được rồi

### Bước 5: Tạo kiểu cho các box event

Tiếp theo, mình sẽ tạo kiểu cho các `box-content` với chiều rộng 180px và màu nền được đặt thành `#00b0bd`. `border-radius` sẽ được đặt thành 5px để có được các góc tròn.

box-content được đặt cách -77px từ bên trái của box để căn chỉnh với ngày tháng một cách chính xác. Lề được đặt thành 0 và màu phông chữ thành màu trắng cho các đoạn bên trong box-content;

```
.box .box-content {
  border-radius: 5px;
  background-color: #00b0bd;
  width: 180px;
  position: absolute;
  left: -77px;
  padding: 15px;
}
.box-content p {
  margin: 0;
  color: white;
}
```

Mình nghĩ sẽ tốt hơn nếu di chuyển các box sang hai bên của middle-line. Vì vậy, mình đã di chuyển `box-content` của `box-bottom` xuống 65% từ phần trên cùng của phần tử box.

![](https://images.viblo.asia/3ab27dad-c16e-4ef7-9151-e8b100ab795f.png)

Bây giờ mình sẽ thêm 1 hình tam giác ở dưới và trên của `box-content` bằng cách dùng `::before` .
`left: 50%` và `transform: translateX(-50%)` sẽ căn chỉnh nội dung vào chính giữa `box-content`.

```
.box-content::before {
  content: " ";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 10px solid transparent;
}
```

Bạn có thể chưa thấy bất kỳ thay đổi nào trong các event box. Nhưng chúng ta gần như ở đó! Mình tô màu đường viền có liên quan và đặt `::before` selector cách xa -20px từ trên cùng hoặc dưới cùng của box-content tùy thuộc vào vị trí của nó.

```
.box-bottom .box-content::before {
  border-bottom-color: #00b0bd;
  top: -20px;
}
.box-top .box-content::before {
  border-top-color: #00b0bd;
  bottom: -20px;
}
```

![](https://images.viblo.asia/55f835a1-e06b-4467-a013-891ed7ee3df1.png)

Bingo! Chúng ta đã thiết kế một dòng thời gian ngang từ đầu bằng cách sử dụng CSS thuần.

**Tóm lược**

Bài viết này là một hướng dẫn toàn diện và thực hành về cách phát triển dòng thời gian bằng cách sử dụng CSS thuần túy. Mình đã theo một cách tiếp cận theo chiều ngang vì bạn có thể không tìm thấy chúng nhiều trên web.

Ngoài các bước trên, chúng ta có thể mang lại nhiều bổ sung hơn cho dòng thời gian, chẳng hạn như cuộn ngang, bằng cách thêm một chút JavaScript. Bạn cũng có thể cố gắng làm cho nó thành responsive, nhưng mình sẽ không khuyên bạn nên làm như vậy vì nó sẽ phá vỡ dòng thời gian.

Mình tin rằng bạn sẽ tìm thấy với sự trợ giúp của hướng dẫn này. Hẹn gặp lại các bạn trong một bài viết hay khác!