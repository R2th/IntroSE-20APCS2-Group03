### Giới Thiệu
Chào mọi người, đối với những người mới học về BEM, SASS và Bootstrap như mình thì không khỏi bối rối khi muốn kết hợp cả ba một cách ăn ý. Trong bài viết này, mình sẽ giới thiệu nhanh về BEM, Bootstrap và SASS và đưa ra một số ví dụ về cách phối hợp giữa chúng mà mình tìm hiểu được.

### BEM
Vậy BEM là gì?
- BEM là một cách đặt tên cho class trong HTML và CSS, buộc chúng ta phải tuân theo một quy ước nhằm tăng ngữ nghĩa và khiến cho mọi thứ trở nên mô đun và dễ dàng tái sử dụng và bảo trì.
- Cụ thể, BEM là viết tắt của Block, Element và Modifier, tức là khối (thành phần nào đó của trang web), phần tử con (là phần tử bên trong của khối) và sự thay đổi của nó. Một khối có các thành phần con bên trong và các thành phần con luôn phụ thuộc vào khối cha của nó, và chúng ta sử dụng Modifier cho ý nghĩa khối hoặc phần tử con bên trong bị thay đổi giao diện hoặc hành vi của nó.

Quy ước:
- Để đặt tên class theo BEM chúng ta cần theo cú pháp: block__element--modifier. Ví dụ:
    - block: tên class cha.
    - block__element: tên class con.
    - block__element--modifier: tên class con bị thay đổi giao diện hoặc hành vi.
    - block--modifier: tên class cha bị thay đổi giao diện hoặc hành vi.
- Những ví dụ về việc đặt tên sai:
    - catergory__list__item
    - catergory__list__item__link
```html
<section class=“category”>
    <ul class=“catergory__list”>
        <li class=“catergory__list__item”>
            <a class=“catergory__list__item__link”>Shoes</a>
        </li> 
    </ul>
</section>
```
Trong trường hợp chúng ta phải đặt tên cho các block lồng nhau, chúng ta có thể xử lí theo nhiều cách
- Có thể chỉ lấy class cha trên cùng để dùng làm block, còn các phần tử bên trong dù có lồng nhau vẫn tính là element. Ví dụ:
```html
<section class=“category”>
    <ul class=“catergory__list”>
        <li class=“catergory__item”>
            <a class=“catergory__link”>Shoes</a>
        </li> 
    </ul>
</section>
```
- Hoặc tạo thành một block mới ở bên trong block cha. Ví dụ:
```html
<section class=“category”>
    <ul class=“catergory__list”>
        <li class=“item”>
            <a class=“item__link”>Shoes</a>
        </li> 
    </ul>
</section>
```

### SASS
[SASS](https://sass-lang.com/) là gì?
- SASS là một chương trình tiền xử lý CSS (CSS preprocessor). Nó giúp các lập trình viên viết CSS ngắn gọn hơn theo cách của một ngôn ngữ lập trình với cấu trúc rõ ràng, và dễ bảo trì code hơn.
- Code trong file sass sẽ được phiên dịch sang css để chúng ta sử dụng.
- SASS có 2 phiên bản, một phiên bản với đuôi là .sass không cần dùng cú pháp superset (tức là '{}' và ';'), và một phiên bản phổ biến hơn với cú pháp superset là .scss.

Vậy tại sao lại chọn SASS?
SASS là một chương  trình vô cùng mạnh mẽ, có rất nhiều tính năng vô cùng hay ho, như `@mixin` (tham khảo [tại đây](https://sass-lang.com/documentation/at-rules/mixin)) với chức năng tương tự như một function chứa tham số trong những ngôn ngữ lập trình. Sau đó chúng ta sử dụng khái niệm `@include` để tái sử dụng hàm vừa tạo bằng `@mixin`. Ví dụ:
```sass
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}
```
Hay  ví dụ về chức năng `@extend` (tham khảo [tại đây](https://sass-lang.com/documentation/at-rules/extend)):
```sass
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```
Vì vậy chúng ta chọn SASS để kết hợp cùng BEM và Bootstrap.

### Bootstrap
[Bootstrap](https://getbootstrap.com/) là gì?
- Bootstrap là một Front-end framework, xây dựng sẵn một thư viện đồ sộ với nhiều đặc tính nhằm giúp lập trình viên dễ dàng xây dựng một website thân thiện theo chuẩn nhất định cho nhiều kích thước thiết bị khác nhau.

Trong bài viết này, mình chỉ sử dụng [Grid System](https://getbootstrap.com/docs/5.0/layout/grid/) của bootstrap để kết hợp với BEM và SASS. Trong Bootstrap, chúng ta có những `@mixins` được bootstrap tạo sẵn. Ví dụ về `@mixins` để tạo grid:
```sass
// Creates a wrapper for a series of columns
@include make-row();

// Make the element grid-ready (applying everything but the width)
@include make-col-ready();

// Without optional size values, the mixin will create equal columns (similar to using .col)
@include make-col();
@include make-col($size, $columns: $grid-columns);

// Get fancy by offsetting, or changing the sort order
@include make-col-offset($size, $columns: $grid-columns);
```
Chúng ta sẽ kết hợp nó với `@mixins` [breakpoint](https://getbootstrap.com/docs/5.0/layout/breakpoints/) để thay đổi layout khi responsive:
```sass
@include media-breakpoint-up;
```
Ngoài ra, chúng ta cũng có thể sử dụng `@extend` của SASS để tái sử dụng hoặc custom các class của Boostrap.
```sass
@extend .container;
```

### Kết hợp giữa BEM, SASS và Bootstrap
Chúng ta sẽ lấy ví dụ đã bàn luận trên phần BEM để tiếp tục phát triển nhé. Khi chỉ mới kết hợp Bootstrap và BEM thì chúng ta có đoạn mã HTML như sau:
```html
<section class="catergory">
    <div class="container">
        <ul class="catergory__list row list-unstyled">
            <li class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <a class="item__link text-decoration-none">Shoes</a>
            </li>
            <li class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <a class="item__link text-decoration-none">Watches</a>
            </li>
            <li class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <a class="item__link text-decoration-none">Cosmetics</a>
            </li>
            <li class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <a class="item__link text-decoration-none">Phone</a>
            </li>
            <li class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <a class="item__link text-decoration-none">Camera</a>
            </li>
            <li class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <a class="item__link text-decoration-none">Food</a>
            </li>
        </ul>
    </div>
</section>
```
Hãy cùng tận dụng những hàm `@mixins` đã đề cập trong phần bootstrap vào file SASS để tối giản đoạn mã HTML trên và dễ dàng bảo trì cũng như tái sử dụng nhé:
```sass
@import '~bootstrap/scss/bootstrap';
.category {
    @extend .container;
    &__list {
        @extend .list-unstyled;
        @include make-row();
        .item {
            @include make-col-ready();
            @include make-col(12);
            @include media-breakpoint-up(sm) {
                @include make-col(6);
            }
            @include media-breakpoint-up(md) {
                @include make-col(4);
            }
            @include media-breakpoint-up(lg) {
                @include make-col(2);
            }
            &__link {
                @extend .text-decoration-none;
            }
        }
    }
}
```
Lúc này, đoạn mã HTML chỉ cần đơn giản như này:
```html
<section class="catergory">
    <ul class="catergory__list">
        <li class="item">
            <a class="item__link">Shoes</a>
        </li>
        <li class="item">
            <a class="item__link">Watches</a>
        </li>
        <li class="item">
            <a class="item__link">Cosmetics</a>
        </li>
        <li class="item">
            <a class="item__link">Phone</a>
        </li>
        <li class="item">
            <a class="item__link">Camera</a>
        </li>
        <li class="item">
            <a class="item__link">Food</a>
        </li>
   </ul>
</section>
```
### Kết luận
Như vậy là chúng ta đã sử dụng BEM, SASS và những hàm `@mixins` cũng như class có sẵn trong framework Bootstrap để tái sử dụng trong việc thiết kế layout cho những thành phần của web mà không cần phải thêm quá nhiều class của Bootstrap vào trong code HTML.
Vì mình là newbie nên hiện tại chưa có nhiều kinh nghiệm, nếu bài viết có chỗ sai mong các bạn, các anh chị thông cảm và chỉ điểm giúp mình nhé ^^. Cám ơn mọi người đã dành thời gian đọc <3!!