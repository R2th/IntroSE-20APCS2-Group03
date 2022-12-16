Khi thiết kế và phát triển web, đôi lúc chúng ta gặp khó khăn trong việc tổ chức và quản lý code CSS. Nhiều nhà thiết kế website nghĩ rằng việc tổ chức và quản lý code thật là rắc rối, tuy nhiên nếu bạn đưa chúng vào một tiêu chuẩn cụ thể, thì sẽ giúp cho công việc của bạn tốt hơn, cũng như website của bạn sẽ hoạt động và có khả năng cải tiến tốt hơn trong tương lai.

## Cú pháp

Sử dụng tabs ngắn (2 khoảng trắng) - đó là cách để đảm bảo code được dịch giống nhau trong mọi môi trường.

Khi có bộ chọn (selectors), hãy giữ mỗi bộ chọn nằm trên một dòng.

- Giữa các khối nên có một dòng trắng để dễ đọc code
- Thêm một khoảng trắng phía sau dấu `:` của mỗi thuộc tính.
- Với mỗi định nghĩa chỉ nên nằm trên riêng một dòng sẽ cho báo lỗi được chính xác hơn.
- Luôn sử dụng dấu chấm phẩy để kết thúc tất các định nghĩa. Dấu chấm phẩy ở định nghĩa cuối cùng là không bắt buộc nhưng vẫn nên thêm dấu chấm phẩy
- Thêm khoảng trắng phía sau dấu phẩy ở mỗi định nghĩa có nó (ví dụ `box-shadow`).
- Không thêm khoảng trắng vào phía sau dấu phẩy trong giá trị của `rgb()`, `rgba()`, `hsl()`, `hsla()`, hoặc `rect()`.Nó giúp phân biệt giữa các giá trị màu sắc (dấu phẩy, không khoảng trắng) và các giả trị thuộc tính (có dấu phẩy cùng khoảng cách).
- Không cần phải thêm tiền tố với các giá trị hoặc màu sắc bắt đầu bằng số 0 (ví dụ: `.5` thay vì 0.5 và `-.5px` thay vì -0.5px).
- Sử dụng chữ thường cho giá trị Hex của màu sắc, ví dụ `#fff`. Chữ thường sẽ giúp việc dịch code được dễ dàng khi gặp những hình khối phức tạp.
- Sử dụng kiểu hiển thị giá trị màu sắc Hex theo kiểu rút ngọn nếu có thể, ví dụ `#fff` thay vì `#ffffff`.
- Sử dụng dấu ngoặc kép để khai báo thành phần giá trị trong bộ chọn, ví dụ input[type="text"]. Nó chỉ bắt buộc trong một số trường hợp nhất định, nhưng sẽ mang tính nhất quán nếu sử dụng cho toàn bộ.
- Tránh thêm đơn vị cho giá trị bằng 0, ví dụ `margin: 0`; thay vì margin: 0px;.
- Sử dụng `0` thay vì none để xác định rằng đối tượng này không có đường viền.

```css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  border: none;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  border: 0
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

## Thứ tự khai báo

1. Định vị trí (Positioning)
2. Kiểu hình khối (Box model)
3. Kiểu kí tự (Typographic)
4. Hình ảnh (Visual)

Định vị trí ở đầu tiên vì nó có thể loại bỏ phần tử trong một layout bình thường. Kiểu hình khối được định nghĩa tiếp theo để có thể xác định được khích thước của mỗi thành phần.

Các thành phần còn lại hãy đặt theo từng thành phần tương ứng những phần mà không ảnh hưởng đến giá trị đã đặt trước đó sẽ đặt ở cuối cùng.

```css
.selector {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc */
  opacity: 1;
}
```

## Không sử dụng @import

So với các `<link>`, @import sẽ chậm hơn, nó sẽ cần nhiều yêu cầu từ trang hơn và không dự tính được hết các lỗi có thể xảy ra. Hãy dùng một số cách thay thế sau thay vì sử dụng @import:

- Sử dụng nhiều `<link>`
- Sử dụng các trình phiên dịch như SASS & LESS để phiên dịch CSS vào trong một file duy nhất
- Kết nối các files CSS của bạn bằng các tính năng được môi trường cung cấp sẵn nhu Rail, Jekyll và các môi trường khác

```html
<!-- Bad -->
<style>
  @import url("more.css");
</style>
<!-- Good -->
<link rel="stylesheet" href="core.css" />
```

## Vị trí đặt Media query

Hãy đặt Media query gần với bộ chọn có liên quan khi có thể. Đừng gom tất cả các quy tắc trong một khu vực riêng biệt như phần cuối trang.

```css
.element {
  ...;
}
.element-avatar {
  ...;
}
.element-selected {
  ...;
}

@media (min-width: 480px) {
  .element {
    ...;
  }
  .element-avatar {
    ...;
  }
  .element-selected {
    ...;
  }
}
```

## Thuộc tính tiền tố

Khi sử dụng các thuộc tính tiền tố (Prefixed properties), hãy thụt đầu dòng vào dể các giá trị có thể thẳng hàng với nhau giúp dễ dàng để thay đổi giá trị.

```css
.selector {
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
```

## Khai báo CSS đơn

Trong trường hợp chỉ có 1 định nghĩa CSS, hãy loại bỏ những ngắt dòng để có thể dễ chỉnh sửa hơn. Còn lại thì nên xuống dòng

Đây là một trong yếu tố quan trọng để phát hiện ra lỗi, ví dụ một CSS đang có báo lỗi ở Line 200. Với định nghĩa nằm ở 1 dòng, bạn sẽ dễ tìm hơn.

```css
/* Single declarations on one line */
.span1 {
  width: 60px;
}
.span2 {
  width: 140px;
}
.span3 {
  width: 220px;
}
.icon {
  background-position: 0 0;
}
.icon-home {
  background-position: 0 -20px;
}
.icon-account {
  background-position: 0 -40px;
}

/* Multiple declarations, one per line */
.sprite {
  display: inline-block;
  width: 16px;
  height: 15px;
  background-image: url(../img/sprite.png);
}
```

## Kí hiệu viết tắt

Hãy hạn chế các kí hiệu viết tắt, thay vào đó hãy định nghĩa rõ ràng các giá trị. Các thuộc tính viết tắt thường được sử dụng nhiều bao gồm:

- padding
- margin
- font
- background
- border
- border-radius
  Thông thường hầu như không cần phải đặt toàn bộ các thuộc tính của chúng. Sử dụng đinh nghĩa viết tắt quá nhiều sẽ dẫn dến các định nghĩa bị lặp lại quá nhiều và xảy ra lỗi ngoài ý muốn.

```css
/* Bad CSS */
.element {
  margin: 0 0 10px;
  background: red;
  background: url("image.jpg");
  border-radius: 3px 3px 0 0;
}

/* Good CSS */
.element {
  margin-bottom: 10px;
  background-color: red;
  background-image: url("image.jpg");
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
```

## Bộ chọn

- Sử dụng Class cho những tag để tối ưu hiệu suất dịch code.
- Hạn chế chọn phần tử kiểu chọn theo thuộc tính (attribute) (ví dụ `[class^="..."]`) . Hiệu suất trình duyệt sẽ bị ảnh hưởng.
- Giữ cho tên Class ngắn và gọi phần cha ít. Cố gắng gọi tối đa 3 Class.
- Gọi tên class cha chỉ khi nào cần thiết (ví dụ khi không cần tạo css tùy chỉnh).

```css
/* Bad CSS */
span { ... }
.page-container #stream .stream-item .tweet .tweet-header .username { ... }
.avatar { ... }

/* Good CSS */
.avatar { ... }
.tweet-header .username { ... }
.tweet .avatar { ...
```

## Chú thích

- Nên dùng hai gạch (`//`) để đặt chú thích.
- Nên đặt chú thích trên một dòng riêng, không đặt ở cuối dòng.
- Viết chú thích chi tiết cho những dòng code mà không thể hiện được ý nghĩa rõ ràng khi đọc, ví dụ:
  - Sử dụng `z-index`
  - Khả năng tương thích và trình duyệt

## Đặt tên Class

Khuyến khích một số cách kết hợp giữa OOCSS và BEM cho những lý do sau:

- Giúp tạo ra mối quan hệ chặt chẽ rõ ràng giữa CSS và HTML
- Giúp tạo ra những thành phần có thể tái sử dụng.
- Cho phép ít lồng nhau (nested) và giảm sự riêng biệt
- Giúp xây dựng stylesheet có khả năng mở rộng

**OOCSS**, hay “CSS hướng đối tượng”, là một phương pháp để viết CSS mà khuyến khích bạn định hình stylesheet như một sự tập hợp của nhiều “đối tượng” (object): có thể tái sử dụng, có thể lặp lại độc lập xuyên suốt toàn bộ một trang web.

- [OOCSS wiki](https://github.com/stubbornella/oocss/wiki) của Nicole Sullivan
- [Giới thiệu về OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/) trên Smashing Magazine

**BEM**, hay “Block-Element-Modifier”, là một quy ước đặt tên cho class trong HTML và CSS. Ban đầu nó được phát triển bởi Yandex với codebase lớn, có khả năng mở rộng, và có thể coi như một tập hợp của các hướng dẫn cho việc thực hiện OOCSS.

- [BEM 101](https://css-tricks.com/bem-101/) trên CSS Tricks
- [Giới thiệu về BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) của Harry Roberts

**Ví dụ**

    .block {}   /* Block */

```css
    .block__element {}  /* Element */
    .block--modifier {}  / Modifier /
```

- **.block:** Thành phần cấp to nhất của abstraction hoặc component.
- **.block\_\_element:** Thành phần con bên trong của block
- **.block--modifier** Là 1 phiên bản # của block. Hay những thay đổi style khác so với style ban đầu
  **1. Modifier**

```html
<a class="btn btn--green" href="#"></a>
```

```css
.btn {
  background: gray;
  border: 0;
  border-radius: 3px;
  box-shadow: none;
  padding: 5px 20px;
  color: #fff;
  font-size: 18px;
  line-height: 1.5;
}
/* style .btn--green   */
.btn--green {
  background: green;
}
```

**2. Element**

```html
<div class="info">
  <div class="info__title"></div>
  <div class="info__description"></div>
</div>
```

```css
.info {
  background: #f2f4f7;
  margin-top: 23px;
  padding-bottom: 30px;
  &__description {
    font-size: 15px;
    font-family: "Kozuka Gothic Pr6N", sans-serif;
  }
  &__title {
    font-size: 20px;
    font-family: "Kozuka Gothic Pr6N", sans-serif;
    font-weight: bold;
  }
}
```

**3. Chainable Modifiers**

```html
<button class="btn -color-green -bg-blue"></button>
```

```css
.btn {
  .... &.-color-green {
    ....;
  }
  &.-bg-blue {
    ...;
  }
}
```

## JavaScript hook

Nên tạo ra các class riêng cho JavaScript để gắn kết, tiền tố bắt đầu với `.js-`:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```