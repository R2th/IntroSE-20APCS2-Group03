Để tiếp tục với phần 1 của bài viết [[Front-end Developer] Viết CSS sao cho chuẩn không cần chỉnh](https://viblo.asia/p/front-end-developer-viet-css-sao-cho-chuan-khong-can-chinh-YWOZrNJYZQ0) thì ở bài viết này mình xin chia sẻ một vài bí kíp nữa để chúng ta có thể nâng cao trình độ CSS của bản thân lên một tầm mới =))

# 1. CSS Pre-Processors là gì ?
Trước tiên để biết được những trong bài viết này bắt nguồn từ đâu thì chúng ta cùng tìm hiểu một khái niệm tổng quát trước là CSS Pre-Processors.

CSS Pre-Processors là một ngôn ngữ tiền xử lý CSS, các bạn có thể hiểu nó là một kiểu viết mở rộng, nâng cấp hơn so với CSS. Mục đích của CSS Pre-Processors được sinh ra nhằm mục đích đưa các đoạn code CSS trở nên giống hơn một *ngôn ngữ lập trình*, và cách viết này sẽ biên dịch lại thành các đoạn code CSS bình thường. 

Để áp dụng các CSS Pre-Processors vào dự án của bạn thì có vài *công cụ* nổi tiếng giúp các bạn áp dụng vào dự án như: **SCSS**, **SASS**, **LESS**, **Stylus**... Trong bài này mình sẽ giới thiệu về **SCSS/SASS**.

Tất nhiên là phải có những lợi ích nhất định của CSS Pre-Processors thì nó mới được áp dụng vào các dự án như 
* Cải thiện thời gian viết CSS
* Linh hoạt hơn và có khả năng sử dụng lại code 
* Dễ dàng bảo trì cũng như là phát triển
* Cấu trúc viết code rõ ràng, dễ nhìn hơn rất nhiền
* Hạn chế được những đoạn code trùng lặp, file code nhỏ gọn

# 2. SCSS và SASS
## 2.1. SASS
SASS là viết tắt của Syntactically Awesome StyleSheets là một CSS Pre-Processors nổi tiếng được biết đến trong giới Front-end Developer. SASS được sinh ra bởi lập trình viên Ruby, nếu như bạn đã làm việc với Ruby thì ắt hẳn sẽ biết tới các template phổ biến như **HAML** hay **SLIM**. 

Tại sao mà mình lại nhắc đến Ruby, nó liên quan gì đến CSS thì mình xin giải thích đó chính là đến từ **cú pháp**. Ví dụ như khi viết SLIM các bạn sẽ không cần các dấu đóng thẻ, hay dấu chấm phẩy, hay nhận biết các thẻ con bằng cách lùi dòng vào... Điều này chính là những kiểu viết của SASS.

Ví dụ như thế này
```css
.nav
  width: 100%
  height: 100%
  float: right
  p
    color: #e1e1e1
    font-size: 14px;
```

## 2.2. SCSS
Cá nhân mình thì không thích cách viết của **SASS** lắm vì cảm giác đọc hơi rối cả khó hiểu, may sao lại có sự nâng cấp tuyệt vời đến từ **SCSS**. 

SCSS hay còn gọi là Sassy CSS, có cú pháp giống với CSS hơn là SASS giúp chúng ta tiếp cận dễ hơn rất nhiều. Hiểu đơn giản thì SCSS là một phiên bản nâng cấp của SASS.
```css
.nav {
  width: 100%;
  height: 100%;
  float: right;
  
  p {
    color: #e1e1e1
    font-size: 14px;
  }
}
```
## 2.3. Sự khác biệt cơ bản của SCSS và SASS
Qua 2 phần giới thiệu ở trên thì phần nào các bạn cũng đã hiểu hiểu SCSS và SASS là gì và cách viết như thế nào. Ở phần này mình xin tóm tắt lại chút sự khác biệt để các bạn có cái nhìn tổng quát hơn.

**SASS**:
* Cú pháp ngắn gọn hơn
* Sử dụng indent để thể hiện quy tắc xếp chồng (nested rules)
* Khi kết thúc một property thì không cần dấu `;` để kết thúc 
* Khai báo mixins bằng ký tự `=`
* Sử dụng mixins bằng ký tự `+`

**SCSS**
* Cú pháp gần với CSS hơn
* Sử dụng cặp dấu `{}` để thể hiện quy tắc xếp chồng
* Kết thúc 1 khai báo property CSS bằng dấu `;`
* Khai báo mixins bằng cú pháp @mixins ten-mixins
* Sử dụng mixins bằng cú pháp @include ten-mixins

## 2.4. Sử dụng variables (biến)
Lan man hơi nhiều, bây giờ mình bắt đầu giới thiệu những thứ hay ho để giúp bạn viết CSS chuyên nghiệp hơn, hay ho hơn.

Để bắt đầu thì mình xin giới thiệu về **variables**. Đến CSS mà còn có cả **variables** (biến) thì cũng hơi bị thú vị rồi đấy.

Giả sử như dự án của bạn dùng đến cả trăm chỗ có thể sử dụng cùng một giá trị màu chả hạn, đối với các mã màu đơn giản thì các bạn nhớ được thôi chứ ví dụ có những mà màu rắc rối giả sử như `DEFQ13` chả hạn, thì nhớ làm sao được, nhà còn bao việc :D

Để tối ưu hơn trong việc này chúng ta sẽ đặt cái mã màu này trong một biến, giúp chúng ta thuận tiện sử dụng hơn nhiều.

```css
$text-grey: #e1e1e1;

/* Sử dụng */
p {
    color: $text-grey;
}

div.container a {
    color: $text-grey;
}
...
```
> Viết đơn giản không phải cầu kì <br>
> Đừng bảo anh nhớ mã màu làm gì<br>
>                                          Trích           "*Phúz*"

## 2.5. Mixins
Mình từng nói ở trên là CSS Pre-Processors giúp chúng ta có thể tái sử dụng code. **Mixins** chính là cách để giúp chúng ta có thể làm được việc này một cách đơn giản.
```css
@mixin bordered {
	border: 1px solid #ddd;
	&:hover {
		border-color: #999;
	}
}

/*Sử dụng chỉ cần include mixins đã khai báo*/
div {
    @include bordered;
}
```
Thậm chí chúng ta có thể truyền cả tham số vào mixins
```css
@mixin bordered($width) {
	border: $width solid #ddd;
	&:hover {
		border-color: #999;
	}
}

/*Sử dụng chỉ cần include mixins đã khai báo*/
div {
    @include bordered(1px);
}
```
## 2.6. Nested
Khi mà mới học lập trình HTML, CSS thì mình đã từng thế này, và mình nghĩ cũng nhiều bạn đã từng như mình
```html
<div class="container">
    <ul class="nav">
        <li class="item">
            <a class="item-children">Hello</a>
        </li>
    </ul>
</div>
```
Xong khi viết CSS sẽ dạng dạng như thế này
```css
.container {
    width: 100%;
}
.container .nav {
    font-size: 14px;
}
.container .nav .item {
    float: left;
}
.container .nav .item .children {
    texx-decoration: none
}
```
Nhìn đoạn code trên có khiếp không, lặp đi lặp lại các selector, đó là chỉ với trường hợp mình có 4 item con con bên trong. Chả lẽ giờ có đến chục item con con bên trong các bạn cũng viết kiểu như thế này thì rõ ràng là không hề ổn chút nào. Lúc người khác đọc lại code phải dò dò xem đâu là cha của nó các kiểu con đà điểu, rất mất thời gian.

Nếu như ai còn đang viết kiểu như thế mình khuyên nên bỏ đi và áp dụng ngay kiểu `nested rules` như sau đây
```css
.container {
    width: 100%;
    .nav {
        font-size: 14px;
        .item {
            float: left;
            .children {
                text-decoration: none;
            }
        }
    }
}
```
Nhìn trông code có phải gọn gàng, dễ quản lí và chuyên nghiệp hơn chút rồi đấy. Hãy áp dụng nhé các pạn.

Ngoài ra còn rất nhiều các tính năng khác mà các bạn có thể lên trang chủ của nó tìm đọc nếu muốn.

# 3. Kĩ thuật OOCSS
OOCSS là viết tắt của `Object-Oriented CSS`, hướng đối tượng trong CSS. Cụ thể mà tính chất hướng đối tượng này đó là tính kế thừa.

Kĩ thuật này được sinh ra nhằm hạn chế việc trùng lặp code
```css
.btn-primary {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
 
.btn-success {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
}
```
Như chúng ta thấy ở trên thì phải có một đống đoạn code được trùng lặp nhau, vậy tại sao chúng ta không nghĩ cách để tái sử dụng lại đoạn code trùng.

Ở đây chúng ta sẽ tạo thêm 1 class khác là `.btn` chả hạn để chứa các đoạn code trùng

Kết quả
```css
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: 4px;
}
 
.btn.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
 
.btn.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
}
```
Như các bạn đã thấy thì đoạn code của chúng ta đã được ngắn gọn đi rất nhiều, cũng đáng là một điều đáng lưu tâm khi làm việc với CSS nhỉ.

Việc viết như thế này cũng giúp chúng ta sử dụng lại class này ở rất nhiều nơi, như cách mà các bạn làm việc với Bootstrap hay Tailwind ý.

# 4. BEM
Đây là một kĩ thuật để đặt tên cho class trong HTML/CSS. Cách đặt tên class với BEM sẽ làm code của chúng ta nhìn rất chuyên nghiệp và có logic hơn rất nhiều.

Việc áp dụng kĩ thuật này vào trong project sẽ giúp chúng ta dễ dàng maintain và phát triển, dễ dàng hơn với những người vào dự án sau này khi đọc lại code.

**BEM** là viết tắt của `Block`, `Element` và `Modifier`. Nguyên tắc để đặt tên class sẽ dựa trên 3 thành phần kia để chúng ta đặt tên class cho chuẩn chỉ.

* **Block**: Một khối độc lập mang ý nghĩa riêng, mô tả rõ mục đích của nó. (header, container, menu...). Block sẽ chứa những định dạng chung để có thể tái sử dụng.
* **Element**: Là một phần thuộc một khối và thực hiện một chức năng cụ thể, element này sẽ phụ thuộc vào block để đặt tên sao cho phải.
* **Modifier**: Modifier sẽ dùng để thao tác nếu muốn thay đổi cách hiển thị của block hoặc element 

Để giải thích được về BEM thì mình sẽ giải thích theo một vài hình vẽ dưới đây cho các bạn dễ hiểu
![](https://images.viblo.asia/24125691-2b02-4441-9a2b-e5a673dbe6e6.png)

Hình này mô tả chúng ta có một **block** (khối) là "*người*" với class được đặt mang ý nghĩa của block đó là **.stick-man**.

![](https://images.viblo.asia/b81ab315-37fc-4f3f-9f20-a4692f940cde.png)

Bên trong khối này thì chúng ta sẽ có các **element** bên trong **block** cụ thể ở trong trường hợp này là `head`, `arms`, `feet`..

Để đặt được tên cho các element này chúng ta sẽ đặt dưới dạng là block__element (tên block + 2 dấu gạch dưới + tên element). Trong trường hợp này sẽ là 
```css
.stick-man__head {}
.stick-man__arms {}
.stick-man__feet {} 
```
Giả sử chúng ta muốn thay đổi 1 element nào đó, ví dụ là cho đầu nhỏ lại hoặc to hơn giả hạn

![](https://images.viblo.asia/398f21d9-4e0d-46ef-b368-ada3347f9f21.png)

thì đây là lúc chúng ta cần đặt tên với **modifier**. Tên class tương ứng sẽ với cú pháp là `block + 2 dấu gạch dưới + element + 2 dấu gạch ngang + modifier`.
```css
.stick-man__head--small {}
.stick-man__head--big {}
```
Nếu bạn muốn thay đổi giá trị của khối thì chỉ cần `block + 2 dấu gạch ngang + modifier`. Ví dụ 
```css
.stick-man--blue {}
.stick-man--red {}
```
# 5. BEM kết hợp cùng với SCSS/SASS
Như ở phần trên mình có nói về việc cách viết nested với SCSS/SASS. Khi chúng ta đặt tên class theo BEM chúng ta cũng sẽ có kiểu viết nested này luôn. Mình có 1 cấu trúc như thế này

```html
<div class="stick-man">
    <div class="stick-man__head"></div>
    <div class="stick-man-blue"></div>
</div>
```
Thì khi viết CSS chúng ta có thể viết như sau
```css
.stick-man {
    ...
    &__head {}
    
    &--blue {}
}
```
Thì khi biên dịch sang CSS thì nó sẽ thành như thế này
```css
.stick-man { ... }
.stick-man__head { ... }
.stick-man--blue { ... }
```

Nhìn rất gì và này nọ, khác hẳn so với cách viết CSS thông thường của chúng ta.

Ngoài cách viết trên thì cách bạn có thể viết một mixins riêng rồi truyền tham số vào cũng được, nhìn code cũng dễ đọc hơn, dạng dạng như thế này
```css
@mixin element($element) {
    &__#{$element} {
        @content;
    }
}

@mixin modifier($modifier) {
    &--#{$modifier} {
        @content;
    }
}

.stick-man {
    ...

    @include element('head') {
        ...
    }

    @include modifier('blue') {
        ...
    }
}
```
Kết quả khi biên dịch cũng như cách viết đầu tiên của chúng ta thôi, nhưng có vẻ nhìn như thế này có vẻ dễ đọc hơn nhỉ . :D
# 6. Kết luận
Trên đây là những kĩ thuật giúp chúng ta nâng cao trình độ viết code CSS. Nếu hay các bạn đừng tiếc một lượt upvote cũng như đăng kí kênh để nhận những thông báo mới nhất từ mình nhé :). 

Tài liệu tham khảo:

https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/\
https://viblo.asia/p/toi-uu-hoa-css-qm6RWq5zGeJE#_8-ki-thuat-oocss-tranh-dry-code-css-8