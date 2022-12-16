![](https://images.viblo.asia/7d3019a8-3309-443e-821b-d2aa7820d387.png)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 17 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Mẹo để optimize Google Fonts API mà ít dev để ý

Khi bắt gặp 1 thiết kế sử dụng **custom font**, điều đầu tiên bạn nghĩ ngay đến là Google Fonts API, phải search 1 vòng xem nó có trên đó không? Nếu không có thì lúc này bạn mới nghĩ tới việc lấy font từ Designer hoặc tìm trên mạng tải về và tiến hành convert nó sang các định dạng khác để sử dụng CSS3 `@font-face`.

> **Custom font** mình không biết nói thế nào cho chuẩn, ý mình đang đề cập những loại font không được cài sẵn trên các hệ điều hành phổ biến như MacOS, Windows hay Linux. Khác với font như `Arial` là font chữ hầu như HĐH nào cũng có cả, thì `Roboto`, `Open Sans` là những loại fonts không phải máy nào cũng có.

Tuy nhiên việc load font từ Google Fonts API thường sẽ gây ra việc load chậm. Vậy nên những mẹo dưới đây sẽ giúp ích rất nhiều cho bạn trong việc giảm thời gian tải font, vì lúc này font được tải về theo chỉ định cụ thể, kiểu như được filter bớt, chứ không phải tải về toàn bộ nữa

**Thứ 1: Gộp với nhau bằng dấu + để request 1 lúc nhiều fonts**

Tức là thay vì bạn gọi 2 tên font như thế này:

```css
https://fonts.googleapis.com/css?family=Inconsolata
https://fonts.googleapis.com/css?family=Roboto
```

thì nên gộp thành:

```css
https://fonts.googleapis.com/css?family=Inconsolata|Roboto
```

Với cách gộp này, việc request sẽ được tối ưu đôi chút.

**Thứ 2: Chỉ định cụ thể những dòng text sử dụng font đó**

Có những trường hợp chỉ có vài chữ trên web sử dụng font đó thôi, thì ta chỉ định đúng tên cái text đó luôn

```css
https://fonts.googleapis.com/css?family=Inconsolata&text=hello
```

Với cách này, tốc độ tải font được cải thiện rất đáng kể.

#### Đọc hiểu thêm

- https://developers.google.com/fonts/docs/getting_started#optimizing_your_font_requests
- https://blog.logrocket.com/how-to-use-web-fonts-in-css-a0326f4d6a4d/

### 2. Tránh tạo các HTTP request tải ảnh (icon) không cần thiết

CSS giờ đây có thể làm được nhiều thứ hơn trước, cho nên bạn cần áp dụng nó vào thay thế cho những request tải ảnh không cần thiết trước đây, ví dụ như trường hợp dưới đây, mình cần tạo icon dot (dấu chấm) phía trước 1 thẻ `div`.

Thì CSS thường kiểu như này:

```css
div:before {
  content: url(images/white-circle.svg);
}
```

Nhưng bạn quên rằng, có thể dễ dàng tạo 1 icon dot chỉ bằng vài dòng CSS, đâu cần phải tốn 1 request tải ảnh về, phải không nào?

```css
div:before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
}
```

Tương tự thế, với các trường hợp khác như vẽ `mũi tên`, `hình vuông` và `các hình dạng khác`, bạn có thể chỉ cần hoàn toàn CSS. [CSS Tricks](https://css-tricks.com/the-shapes-of-css/) có hướng dẫn các cách vẽ shapes bằng CSS rất hay, bạn nên tham khảo để hiểu các thuộc tính CSS khi kết hợp cùng nhau, đã tạo ra những sự vi diệu như thế nào.

Không chỉ dừng lại ở vài hình dạng quen thuộc, CSS cũng cho phép bạn vẽ được cả [1 bộ icons](https://cssicon.space/#/) với muôn vàn các loại icons mà trước đây bạn thường phải dùng ảnh.

#### Đọc hiểu thêm

- https://github.com/bendc/frontend-guidelines#drawing
- https://css-tricks.com/the-shapes-of-css/
- https://cssicon.space/#/

### 3. Một cách khác để tạo hiệu ứng overlay cho ảnh với ít code hơn

Bạn đã từng style CSS cho cái ảnh mà có lớp màu overlay, có độ trong suốt khoảng 50% và dòng chữ đè lên chưa nhỉ?

![](https://images.viblo.asia/bef4b003-cc01-429a-98f2-a38d25316ff4.jpg)

Và cái cách mà mình nghĩ đến trước tiên là sử dụng:

- Layer 1: ảnh được canh `absolute` và `object-fit` để fill vào các kích thước khác nhau mà ảnh không bị méo
- Layer 2: dùng `:before` hoặc `:after` để tạo lớp color overlay, có độ trong suốt bằng cách sử dụng `rgba`
- Layer 3: là lớp chữ, có `z-index` cao nhất để đè lên 2 lớp trên

{@codepen: https://codepen.io/tinhh/pen/pooRQEx}

Nhưng thay vì tạo 1 lớp color overlay bằng pseudo element thì hơi thừa, thay vào đó, mình có thể dễ dàng tạo hiệu ứng tương tự bằng cách:

- Ở wrapper: thêm màu của color overlay dạng mã rgb hoặc mã hex (chú ý không có trong suốt nữa nha)
- Layer 1: thêm `opacity`
- Layer 2: thừa rồi, bỏ đi nha!
- Layer 3: vẫn như cũ

{@codepen: https://codepen.io/tinhh/pen/YzzNReV}

Bạn thấy đó, mình đã bỏ đi được vài dòng CSS mà cũng đạt được kết quả hiệu ứng tương tự :smiley: 

#### Đọc hiểu thêm

- https://dev.to/ellen_dev/two-ways-to-achieve-an-image-colour-overlay-with-css-eio

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!