![](https://images.viblo.asia/ee8f4444-25c4-4e81-942c-3f5ef176e431.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 32 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1.  `:marker` làm được nhiều thứ hơn bạn tưởng

![](https://images.viblo.asia/df856c05-142c-4aa1-bdbe-bbbf97b41ecd.png)

Ngay bây giờ đây, bạn có thể dễ dàng điều chỉnh (customize) CSS như `color`, `font-size` cho các thẻ `<ul>`, `<ol>` và ngay cả những thẻ không phải là **list item** một cách dễ dàng hơn trước rồi.

> `::marker` cũng là một trong những `pseudo-element` khác như `:before`, `:after`, `:first-letter`, `:first-line`.
> 
> Bạn nên chú ý 1 chút nữa, với `marker` thì phải có 2 dấu `::` như thế này thì trình duyệt mới hiểu nhé!

Giả sử bạn có đoạn HTML `ul` như bên dưới

```html
<ol>
  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
  <li>Dolores quaerat illo totam porro</li>
  <li>Quidem aliquid perferendis voluptates</li>
  <li>Ipsa adipisci fugit assumenda dicta voluptates nihil reprehenderit consequatur alias facilis rem</li>
  <li>Fuga</li>
</ol>
```

Đây là kết quả mặc định (khi chưa có bất kỳ tác động gì)

{@codepen: https://codepen.io/tinhh/pen/LYxgyLJ}

Với sự hỗ trợ của các thuộc tính dành cho `ul/ol` như `list-style-type`, `list-style-image` thì bạn cũng customize được nhiều thứ, nhưng dường như là chưa đủ.

Vậy thì `::marker` có gì đặc biệt hơn???

**`::marker` giúp style màu các bullet (mấy cái dấu chấm tròn) khác màu với text**

{@codepen: https://codepen.io/tinhh/pen/eYgPGGE}

 **`::marker` giúp style các bullet không những về `color`, mà còn`font-size`, `font-family` nữa**

{@codepen: https://codepen.io/tinhh/pen/WNRaOBK}

**Đối với những thẻ heading như `h1`, bạn cũng apply `::marker` được, với sự hỗ trợ của `display: list-item`**

{@codepen: https://codepen.io/tinhh/pen/YzNJrBo}

Tuy nhiên, bạn cũng phải chú ý, không phải thuộc tính CSS nào cũng tác động vào `::marker` được, dưới đây là danh sách các thuộc tính được cho phép:

```md
- animation-*
- transition-*
- color
- direction
- font-*
- content
- unicode-bidi
- white-space
```

Biết thêm `::marker`, hi vọng sẽ giúp bạn có thêm lựa chọn phương án tiếp cận với CSS với cách làm mới, đôi khi có thể tiết kiệm vài dòng code cũng là việc đáng bỏ công sức.

> Vẫn là IE không hiểu ;(: https://caniuse.com/css-marker-pseudo

#### Đọc hiểu thêm

- https://web.dev/css-marker-pseudo-element/
- https://www.smashingmagazine.com/2019/07/css-lists-markers-counters/
- https://developer.mozilla.org/en-US/docs/Web/CSS/::marker#browser_compatibility

### 2. Mã màu hex có 8 chữ số luôn à `#FFFFFF80`?

Trước khi đi vào tìm hiểu mã màu này là gì? Sao ít được nghe thấy và sử dụng, thì bạn làm 1 bài kiểm tra với mình thử nhé!

```markdown
Mã màu nào sau đây là KHÔNG HỢP LỆ?
A. rgb(255, 0, 0, .5)
B. rgb(255 0 0 / 50%)
C. hsl(200, 100, 50)
D. #0F08
```

Xin tiết lộ cho bạn biết mã màu của phương án D là hợp lệ nhé. Hổng có sai đâu @@. Lâu nay bạn đã nghĩ mã màu hex trong CSS chỉ có 2 kiểu là 3 chữ số (`#F00`) hay 6 chữ số (`#FF0000`) không nhỉ?

Với cách viết shorthand của mã màu hex thì 8 chữ số -> thành 4 chữ số cũng không lấy làm lạ đối với bạn nhỉ? (giống như 6 -> shorthand thành 3 vậy đó).

2 chữ số thêm vào cuối đó là chính là giá trị của `alpha`. Với cấu trúc mã màu 6 chữ số `#RRGGBB` (shorthand: `#RGB`), thì giờ sẽ là `#RRGGBBAA` (shorthand: `#RGBA`).

Ví dụ màu trắng có opacity (alpha) là 50%, nếu viết bằng `rgb/rgba` thì sẽ là `rgba(255, 255, 255, 0.5)`, chuyển đổi qua dạng 8 chữ số thì sẽ là `#FFFFFF80`.

{@codepen: https://codepen.io/tinhh/pen/gOgBdro}

> Ơ, nhưng mà 50% nhưng 2 số kia lại là 80, chứ không phải là 50 các bạn nhỉ? Bạn có thể [xem công thức tính](https://stackoverflow.com/questions/5445085/understanding-colors-on-android-six-characters/25170174#25170174) nhé

Đó cũng là 1 trong những lý do mình thấy nó khó tiếp cận, giá trị `alpha` không trực quan dễ hiểu bằng các mã màu kia.

Cái hay duy nhất mà mình thấy được đó là nếu code của bạn đang sử dụng mã màu hex, muốn thêm alpha thì có thể thêm vào cuối mà không cần đổi mã màu sang `rgb/rgba/hsla`.

Chrome DevTools cũng hỗ trợ bạn thay đổi alpha của mã màu kiểu này luôn (xem hình minh họa bên dưới)

![](https://assets.digitalocean.com/articles/alligator/css/hex-code-colors-alpha-values/colorpicker.gif)

> IE lại không chịu hiểu https://caniuse.com/css-rrggbbaa

> À..đáp án C là mã màu không hợp lệ các bạn nhé! (Bạn có thể F12 bật Inspect Element lên ngay tại bài viết này để thử luôn nhé, mã màu KHÔNG HỢP LỆ sẽ có chấm thang màu vàng đó).

#### Đọc hiểu thêm

- https://www.digitalocean.com/community/tutorials/css-hex-code-colors-alpha-values
- https://davidwalsh.name/8-digit-hex
- https://css-tricks.com/8-digit-hex-codes/


### 3. Debug Flexbox trong DevTools của Chrome 90

Mặc dù CSS Grid đã bắt đầu được sử dụng nhiều hơn thời gian gần đây, nhưng Flexbox vẫn là kỹ thuật dàn dựng layout mà mình ưa chuộng nhất hiện tại. Và thật tuyệt vời khi biết tin Chrome version 90 (phiên bản mới nhất ở thời điểm mình viết bài này) cho ra mắt nhiều tính năng rất hay, trong đó mình đặc biệt chú ý đến Debug dành cho Flexbox.

Giao diện debug dành cho Flexbox trông như thế này

![](https://images.viblo.asia/e00d1f1b-f8da-4b44-8fdb-db6c5040cd3b.png)

Khi bạn khai báo trong code là `display: flex` hoặc `display: inline-flex` thì ở DevTools sẽ hiển thị nhãn (màu xanh) cạnh element đó và có chữ `flex` .

Ở **Styles** pane, bên cạnh khai báo thuộc tính `display: flex` hoặc `display: inline-flex` bạn sẽ thấy 1 icon, click vào đấy sẽ mở ra **Flexbox editor**. Ở đây bạn có thể nhanh chóng tùy chỉnh các thuộc tính như: `flex-direction`, `flex-wrap`, `align-content`, `justify-content` và `align-items`.

Thao tác bằng giao diện trực quan như thế này mình đảm bảo bạn sẽ giảm được kha khá thời gian debug để dựng layout hoặc tìm ra lỗi đấy.

#### Đọc hiểu thêm

- https://developer.chrome.com/blog/new-in-devtools-90/#flexbox

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!