![](https://images.viblo.asia/0a293a60-3517-447a-9ec2-5e0c14f14ef6.jpg)


## 1. Chuẩn bị

Như bài lần trước mình [đăng trước](https://viblo.asia/p/hoc-css-grid-trong-5-phut-1VgZv1NOKAw), chúng ta sẽ tiếp tục sử dụng grid cơ bản chạy xuyên suốt các ví dụ:

![](https://images.viblo.asia/dbfb5d7c-a711-423a-a5d3-ceec58c2db8b.PNG)

Code HTML:

```
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
```

Code CSS:

```
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 50px 50px;
}
```

Chuẩn bị xong roài đó, quẩy thôi nào.

## 2. Responsive cơ bản với the `fraction unit`

`CSS grid` mang đến một đơn vị đo độ dài mới đó là `fraction unit`, kí hiệu là `fr`

`fraction unit` cho phép ta chia các component thành nhiều phân số (`fraction`) như bạn muốn

Thử thay đổi chút code CSS với `fr` xem sao:

```
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50px 50px;
}
```

Kết quả: 

![](https://images.viblo.asia/3e6e1f40-5bf3-4886-93e6-9769c90df671.gif)

Đoạn code trên chia toàn bộ `grid` thành 3 phần bằng nhau tùy theo màn hình chiều rộng của màn hình

Nếu bây giờ ta thay đổi một chút code CSS `grid-template-columns: 1fr 2fr 1fr;` thì chúng ta sẽ được cột thứ 2 có độ rộng gấp đôi độ rồng của cột thứ nhất và cột thứ ba

Kết quả:

![](https://images.viblo.asia/e698da42-6c81-43de-9d94-d4099386fce4.gif)

## 3. Responsive với `auto-fit` và `minmax`

Như ví dụ trên thì số cột luôn giữ nguyên là 3 và chỉ thay đổi kích thước giữa các cột thôi

Ở phần này, mình muốn thay đổi luôn cả số lượng các cột trên một hàng nữa

Muốn vậy, mình sẽ giới thiệu thêm 3 khái niệm mới: 

### 3.1 repeat()

Chúng ta sẽ bắt đầu với hàm `repeat()`

Đây là một cách đơn giản hơn để sử dụng grid mà không cần phải chỉ rõ độ dài của từng cột

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
}
```

Ở đây, `repeat(3, 100px)` tương tự với việc khai báo từng phần tử `100px 100px 100px`

Tham số đầu tiên chỉ định số lượng cột, tham số thứ 2 chỉ định độ rộng của từng cột

Vì vậy, chúng ta lại có bố cục chính xác như những gì đã bắt đầu:

![](https://images.viblo.asia/dbfb5d7c-a711-423a-a5d3-ceec58c2db8b.PNG)

### 3.2 auto-fit()

Khái niệm mới tiếp theo là `auto-fit`

```
.container {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, 100px);
    grid-template-rows: repeat(2, 100px);
}
```

Chúng ta thay đoạn code `grid-template-columns` với `3` bằng `auto-fit`

Kết quả:

![](https://images.viblo.asia/8ff5d301-9d85-4616-b983-37c37fbd9846.gif)

`Grid` bây giờ của chúng ta đã có thể thay đổi số lượng các cột được hiển thị trên một hàng

Tuy nhiên, nó chỉ đơn giản là fix cứng độ dài của các cột là `100px` nên bạn nhìn trên kết quả trên, có rất nhiều khoảng trắng khi ta thay đổi độ rộng của màn hình

Chúng ta thì muốn nó trở nên thực sự linh hoạt hơn, vậy làm sao để có thể có được thứ như mình muốn.

### 3.3 minmax()

Khái niệm mới cuối cùng mình muốn giới thiệu trong bài này là `minmax`

Chúng ta sẽ thay thế đơn giản `100px` bằng `minmax(100px, 1fr)`

```
.container {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: repeat(2, 100px);
}
```

Kết quả:

![](https://images.viblo.asia/f15be1e3-3d74-483a-8c45-f716fbe64bf9.gif)

Nó đã hoạt động như những gì mình mong muốn rồi đó :v

Hàm `minmax` sẽ xác định kích thước của cột, lớn hơn độ dài `min` và nhỏ hơn độ dài `max`

Vì thế, các cột luôn có kích thước nhỏ nhất là `100px`.

Tuy nhiên, nếu có nhiều không gian hơn, nó sẽ thay đổi kích thước để cho vừa với độ rộng của màn hình vì nó biến các cột thành các đơn vị `fraction` thay vì kích thước cố định `100px`


### 3.4 responsive  hình ảnh

Bây giờ, chúng ta sẽ đến bước cuối cùng trong bài đó là thay đổi độ rộng của hình ảnh.

Chúng ta sẽ bắt đầu bằng việc thêm một số thẻ hình ảnh trong mỗi `grid item`

```
<div><img src="img/forest.jpg"/></div>
```

Để làm cho hình ảnh vừa với từng `grid item`, mình sẽ đặt nó cao và rộng bằng chính `grid item` đó, sau đó sử dụng `object-fit: cover`

Điều này sẽ làm cho hình ảnh bao phủ toàn bộ `container` và trình duyệt sẽ cắt nó nếu độ rộng của nó không đủ.

```
.container > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

Kết quả:

![](https://images.viblo.asia/321023f8-124d-458f-a1a6-43e720cb3e8e.gif)


## 4. Kết luận

Hi vọng với bài viết của mình giúp ích cho bạn trong việc responsive trang web của mình đơn giản hơn

Cảm ơn mọi người đã theo dõi.

Tài liệu tham khảo: https://medium.com/free-code-camp/how-to-make-your-html-responsive-by-adding-a-single-line-of-css-2a62de81e431