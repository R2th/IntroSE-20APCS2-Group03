Nhà font-size vốn dĩ có rất nhiều anh em nhưng mọi người hay chỉ làm bạn với mỗi người anh `px` này mà quên đi trong nhà có nhiều người anh em ngon hơn, tốt hơn và 'sử dụng' phù hợp hơn đó. Vậy những thành viên còn lại gồm có những ai?

![](https://images.viblo.asia/00cb5501-a8b2-40db-a4c0-95b1aaae277e.jpg)

Hôm trước mình đã [giới thiệu](https://viblo.asia/p/mai-moi-cho-anh-em-nha-font-size-phan-1-QpmlebL75rd) một vài thành viên, hôm nay chúng ta tiếp tục với các anh chàng họ Viewport Units và các anh em khác nhé :grinning: Bắt đầu thôi nào!!!

Họ Viewport Units là đại diện cho một tỉ lệ % của khung nhìn (viewport) của trình duyệt hiện tại, các anh em thuộc họ này gồm:

### 5. vw và vh
vh và vw là các đơn vị đo tỷ lệ phần trăm chiều cao và chiều rộng của cửa sổ trình duyệt (viewport). 
* 1 vw = 1% chiều ngang của trình duyệt.
* 1 vh = 1% chiều cao của trình duyệt.

Nếu chiều rộng khung nhìn là 400px, 1vw sẽ tương ứng là 4px, tương tự với vh.

Có thể lấy một ví dụ cụ thể như ta có div cha có chiều cao là 500px và div con có chiều cao 100%, thì đứa con đó về mặt lý thuyết có thể cao hơn nhiều so với chiều cao của khung nhìn, mặc dù div được đặt ở 100% height.

Nếu thay vào đó div con có chiều cao 100vh, thì nó sẽ chỉ lấp đầy 100% chiều cao của khung nhìn và không nhất thiết phải là div cha.
```html
<div class="fullscreen item">
  <p>content<p>
</div>
```

```css
.fullscreen {
  width: 100%;
  height: 100vh;
  padding: 40vh;
}

.item {
  background: pink;
}
```


Anh em nhà này, vh vw  thường xử lý những phần không muốn mất đi những nội dung đáng giá trên nhiều thiết bị khác nhau như:
- Muốn banner được full screen.
- font-size này khi responsive có thể co giản được.
- Khi quay ngang, quay đứng màn hình các thiết bị smartphone mà font-size, img, và một số thứ khác cũng thay đổi kích cỡ theo...

Và qua các diễn đàn thì cũng thấy nhiều ví dụ thực tế được sử dụng ở các trường hợp khác:
* Thẻ tỷ lệ cố định.
* Giữ một yếu tố ngắn hơn màn hình.
* Thu nhỏ văn bản.
* Thoát ra khỏi container.
### 6. vmin và vmax
VMIN là viết tắt của từ Viewport Minimum, VMAX là viết tắt của từ Viewport Maximum, điều này cũng nói lên được tính chất của 2 đơn vị này, vmin và vmax liên quan tới giá trị lớn nhất và nhỏ nhất trong 2 giá trị: chiều rộng và chiều cao, tùy thuộc vào độ tương quan giữa chúng.
* 1vmin = 1% của khung nhìn nhỏ nhất
* 1vmax = 1% của khung nhìn nhỏ nhất

Ví dụ: Nếu bạn thay đổi kích thước cửa sổ trình duyệt để chế độ xem trở nên rộng 1000px và cao 800px, giá trị của 10vh sẽ trở thành 80px và giá trị của 10vw sẽ trở thành 100px. Tương tự, giá trị của 10vmax sẽ trở thành 100px và giá trị của 10vmin sẽ trở thành 80px.

```html
<body>
  <p class="min"> Width 20vmin </p>
  <p class="max"> Width 20vmax </p>
</body>
```

```css
body {
    font-size: 13px;
}

.min {
    background-color: orange;
    width: 20vmin;
}
 
 .max {
    background-color: pink;
    width: 20vmax;
}
```

### 7. ch
1ch tương đương với chiều rộng (width) của số 0 theo size hiện tại.

Ví dụ:  Tag `a` có font-size: 16px và ký tự 0 có độ rộng 10px từ phông chữ đã chọn thì 1ch sẽ bằng 10px nhưng vẫn có thể thay đổi khi chúng ta sử dụng talic hoặc bold điều này có thể thay đổi chiều rộng của ký tự.

```css
body {
  font-size: 16px;
}

p {
  font-weight: bold;
}

input {
  width: 4ch;
}

div {
  width: 20ch;
  background: lightgray;
  word-wrap: break-word;
}

.ch-1 {
  width: 1ch;
}

.ch-5 {
  width: 5ch;
  font-size: 32px;
}
```
```html
<input type="text" value="2018" />

<div>0000000000000000000000000</div>

<div class="ch-1">00000</div>

<div class="ch-5">0000000000000000000000000</div>
```
### 8. ex
1ex bằng chiều cao của chữ x in thường của font hiện hành.

Do đó, đơn vị này không những phụ thuộc trên kích cỡ font chữ mà còn phụ thuộc loại font chữ vì cùng 1 cỡ 14ex nhưng chiều cao các chữ của các loại font là khác nhau.

```css
p {
    font-size: 24pt;
    line-height: 3ex;
}
```

### Tổng kết
Cảm ơn bạn đã dành thời gian đọc bài viết, hẹn gặp các bạn ở các bài viết tiếp theo nhé!