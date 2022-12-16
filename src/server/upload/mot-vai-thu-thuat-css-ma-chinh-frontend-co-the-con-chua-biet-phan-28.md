![](https://images.viblo.asia/ed4c65cd-d82a-4aee-bd90-e22332e83bb5.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 28 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1.  Sử dụng Blend Mode như một Designer

Nếu bạn là 1 Frontend từng sử dụng nhiều các công cụ chỉnh sửa ảnh/xử lý layout như Photoshop, Illustrator thì bạn sẽ biết đến khái niệm gọi là **Blend Mode**

**Photoshop**

![](https://images.viblo.asia/9c1cd451-e684-44e9-9711-001eae110ffc.png)

**Illustrator**

![](https://images.viblo.asia/833e2af0-c060-49b4-b2a7-5e94459805e4.png)

Nói dễ hiểu thì đây là một hiệu ứng **pha trộn giữa 1 đối tượng với đối tượng bên dưới đó**.

>  Ví dụ như chúng ta áp dụng blend mode cho 1 cái text thì nó sẽ được trộn lẫn với background phía dưới, tạo ra những kiểu **hiệu ứng pha trộn** rất đặc biệt, mà đôi khi bạn nghĩ chỗ đó phải cắt từ Design ra cơ :smile: 

Và trong CSS, chúng ta cũng có được một tính năng tương tự vậy, đó là `mix-blend-mode`.

Cùng ngắm một chút hiệu ứng cho text nằm chìm trong background mà mình vừa làm:

{@codepen: https://codepen.io/tinhh/pen/rNLWKOb}

Khả năng sản xuất ra những hiệu ứng đẹp cho trang web với `mix-blend-mode` còn nhiều nữa. Tùy thuộc vào việc bạn sử dụng kết hợp `ảnh nền` +`texture` + `kiểu chữ viết` + các `value` của hiệu ứng blend mode như `multiply`, `soft-light`, `difference`, `exclusion`, `saturation`...  như thế nào nữa thôi. Dưới đây là 1 số demo mà mình thấy khá là đẹp, mời bạn cùng ngắm nghía.

{@codepen: https://codepen.io/caraujo/pen/RWRbXQ}

{@codepen: https://codepen.io/ainalem/pen/WORzLN}

#### Đọc hiểu thêm

- https://alligator.io/css/exploring-blend-modes/
- https://dev.to/wgao19/night-mode-with-mix-blend-mode-difference-23lm
- https://getflywheel.com/layout/css-blend-modes/

### 2. Nên sử dụng Normalize.css hay là Reset.css

Trước tiên để biết nên chọn cái nào, thì mình sẽ đi tìm hiểu **cách tiếp cận** của từng thứ trước đã!

> Normalize.css (http://necolas.github.io/normalize.css/)
>
> Mục đích ngắn gọn: Vẫn giữ những style mặc định của trình duyệt, chỉ có điều là sẽ làm cho nó đồng nhất giữa các trình duyệt
> 
> Như giới thiệu thì được sử dụng bởi: Twitter, TweetDeck, GitHub, Soundcloud, Guardian, Medium, GOV.UK, Bootstrap, HTML5 Boilerplate, and many others.

> Reset.css (https://meyerweb.com/eric/tools/css/reset/)
>
> Mục đích ngắn gọn: Xóa bỏ toàn bộ style mặc định của trình duyệt

Bạn thấy rồi đó, mục tiêu chung vẫn là làm cho đồng nhất style giữa các trình duyệt, nhưng mỗi cách sẽ có mỗi hướng tiếp cận khác nhau.

Vậy bạn là dev Frontend, lựa chọn như thế nào giữa 2 cách kia cho hợp lý?

Cá nhân mình xin được phép đưa ra lời khuyên là: **Sử dụng Normalize.css kết hợp với Reset.css (do bạn tự định nghĩa)**.

Đây là lý do của mình:

- Reset.css đã làm cho toàn bộ element đều giống nhau về font-size, không có border, padding, margin..dường như là nó đã tác động **hơi mạnh tay**. Sử dụng Reset.css nếu chỉ viết code HTML (mà không thêm CSS) thì mình sẽ không bao giờ thấy được những **hiển thị đặc trưng** của từng loại thẻ trong HTML nữa.
- Normalize.css được sử dụng bởi nhiều công ty công nghệ lớn. Trong đó có `Bootstrap` mình đang áp dụng cho nhiều dự án.
- Đọc nhiều bài viết chia sẻ trên cộng đồng, hầu như họ đều suggest theo hướng này :smiley: 

Vậy cái `Reset.css (do bạn tự định nghĩa)` thì nên viết cái gì trong đó. Cái này thì tùy vào mỗi dev, mỗi team..sẽ đưa vào những đoạn code reset khác nhau.

Mình xin phép được chia sẻ một số reset CSS mà mình thường áp dụng cho các dự án:

```css
/* Tắt margin default để mình dễ control margin theo design hơn */
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

/* Chỉ cho phép textarea được kéo dãn theo chiều dọc, trông sẽ đẹp hơn, không làm xấu layout */
textarea {
  resize: vertical;
}

/* Xóa bỏ khoảng trắng thừa dưới image */
img {
  vertical-align: middle;
}

/* Hầu hết là background mình không repeat, nên reset ở đây để giảm code CSS define chi tiết bên trong */
*,
::before,
::after {
  background-repeat: no-repeat;
}

/* Cũng để dễ control theo design, nên mình thường reset luôn ul, ol */
ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Tạo hiệu ứng bôi đen text khác biệt hơn mặc định */
::selection {
  background: #0031a2;
  color: #fff;
}
```

Đấy là những đoạn code mình hay dùng vào Reset CSS tự định nghĩa. Và mỗi dự án thì cũng sẽ có sự khác nhau 1 xíu.

#### Đọc hiểu thêm

- https://medium.com/@elad/normalize-css-or-css-reset-9d75175c5d1e
- https://flaviocopes.com/css-normalizing/

### 3. [Code ngắn nhất] Align một block về bên phải

![](https://images.viblo.asia/d89688e9-b491-4a53-b21b-9bf505610314.PNG)

Với kiểu layout như thế này, bạn có bao nhiêu cách để code nó và đâu là cách sử dụng ít code nhất?

Mình liệt kê dưới đây 1 vài cách làm phổ biến

1. Sử dụng `text-align: right` + `display: inline-block`

```html
<div class="wrapper">
    <div class="box">Box in right side</div>
</div>
```

```css
.wrapper {
    text-align: right;
}

.box {
    ...
    display: inline-block;
}
```

2. Sử dụng `Flexbox`

HTML giữ nguyên như trên, CSS thay đổi lại xíu

```css
.wrapper {
    display: flex;
    justify-content: flex-end;
}

.box {
    ...
}
```

3.  Sử dụng `Flexbox` + `margin-left: auto`.

> Trước đây mình cũng có đề cập 1 tip sử dụng Flexbox + `margin-left: auto` [ở đây](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-4-1Je5ExVwlnL#_1-flexbox-voi-margin-left-auto-0)

HTML giữ nguyên như trên, CSS thay đổi lại xíu

```css
.wrapper {
    display: flex;
}

.box {
    ...
    margin-left: auto;
}
```

Nhưng có lẽ là bạn chưa biết, không cần phải dùng đến `Flexbox`, chỉ cần `margin-left: auto` là có thể được rồi :sweat_smile: 

Code HTML sẽ giản lược đi chỉ còn 1 cấp

```html
<div class="box">Box in right side</div>
```

Code CSS cũng sẽ rất ngắn, chỉ còn mỗi như này thôi nè!

```css
.box {
    ...
    margin-left: auto;
}
```

{@codepen: https://codepen.io/tinhh/pen/KKKMzMr}

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!