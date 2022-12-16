Hi, xin chào các bạn ! Tiếp tục chuỗi bài viết về Front-End, trong bài viết này mình xin giới thiệu đến các bạn một cơ số cách để "ẩn" đi một phần tử với CSS.

Tại sao mình từ ẩn lại được đặt trong ngoặc kép :laughing:. Ẩn ở đây có thể là "ẩn hẳn" (không thể đính được sự kiện lên phần tử) hoặc ẩn ở đây cũng có nghĩa là "không ẩn hẳn - vô hình" (vẫn có thể đính được sự kiện lên phần tử). Chi tiết như nào ta hãy cùng tìm hiểu nhé

![](https://images.viblo.asia/4388b7f9-719f-4346-a22e-938a2c6c864e.jpg)


### 1. opacity và filter: opacity()

`opacity` thì quá quen thuộc với các dev rồi, `filter: opacity(N);` thì ít được dùng hơn. Và chỉ cần set giá trị về `0` bạn có thể ẩn đi được phần tử đó, với cách này ta vẫn có thể đính kèm được sự kiện lên phần tử (nó không hoàn toàn ẩn đi mà chỉ đơn thuần vô hình thôi)
```css
element {
  opacity: 0;
}
```

### 2. color Alpha Transparency

Chắc hẳn bạn cũng đã làm việc với mã màu rgba() hoặc hsla() rồi, khi đó chỉ cần set giá trị Alpha (giá trị thứ 4) về 0 thì ta có thể ẩn đi được phần tử
```css
element {
  color: rgba(r, g, b, 0);
  background-color: rgba(r, g, b, 0);
}

/* or */

element {
  color: hsla(h, s, l, 0);
  background-color: hsla(h, s, l, 0);
}
```

### 3. transform

`transform` trong CSS3 thì quá lợi hại rồi, bạn có thể dùng hàm scale() hoặc translate để biến đổi phần tử. Cụ thể ta có thể dùng 3 cách
```css
element {
  transform: scale(0);
}

/* or */

element {
  transform: translateX(-999px);
}

/* or */

element {
  transform: translateY(-999px);
}
```

### 4. clip-path

`clip-path` cũng là 1 ứng cử viên nặng kí cho chủ đề này, để ẩn đi phần tử ta làm như sau

```css
element {
  clip-path: circle(0);
}
```

### 5. visibility

Cái tên nói lên tất cả, để ẩn phần tử với `visibility`

```css
element {
  visibility: hidden;
}
```

### 6. display

Quả này là nguy hiểm nhất, khi `display` nhận giá trị `none`, nó sẽ **ẩn hoàn toàn phần tử đi** và bạn **không thể đính kèm được sự kiện lên phần tử đó**

```css
element {
  display: none;
}
```

Đây thường là sự lựa chọn #1 của các dev, tuy nhiên trong 1 số trường hợp nó cũng không phải là sự lựa chọn hoàn hảo (ví dụ kết hợp `display` với `transition`)

### 7. `hidden` 

`hidden` là một thuộc tính trong HTML mà ở đó nó đã được mặc định default css là `display: none`. Ta sử dụng như sau

```html
<p hidden>
  Hidden content
</p>
```

### 8. Absolute

Việc sử dụng `absolute` cũng khá giống như `transform`, tức là bạn có thể chỉ định 4 giá trị top/bottom/left/right thành các giá trị âm để di chuyển phần tử ra khỏi khung nhìn

```css
element {
  position: absolute;
  left: -999px;
}
```

### 9. Overlay

Sử dụng phần tử giả cũng có thể giúp ta ẩn đi phần tử (tuy nhiên lưu ý đây chỉ là ẩn đi "bằng việc set background theo phần tử cha")

```css
element {
  position: relative;
}

element:after {
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
```

### 10. Giảm thiểu kích thước

Cách cuối cùng mình muốn giới thiệu ở đây là sự kết hợp giữa 3 thuộc tính `height`, `padding`, `overflow`

```css
element {
  height: 0;
  padding: 0;
  overflow: hidden;
}
```

## Kết Luận

Trên đây mình đã giới thiệu cho các bạn một số cách để ẩn đi phần tử bằng CSS, hi vọng giúp ích cho các bạn trong khi làm việc

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !