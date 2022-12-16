![](https://images.viblo.asia/e8c24d1a-764b-43e5-b063-a4e129f447cc.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 11 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Combo `drop-shadow` + `clip-path` code chỉ vài dòng nhưng quá là chất lượng! [Not Cross-Browser]

Chắc hẳn bạn cũng không xa lạ gì với những dạng thiết kế có **"mũi tên"** như thế này

![Image from Internet](http://cssglobe.com/lab/css3_tags/scheme.gif)

![Image from Internet](https://freefrontend.com/assets/img/css-menu/dropdown-navigation.png)

Với mũi tên bình thường không có **shadow** thì các bạn hay dùng `:before` hoặc `:after` phải không nhỉ?

{@codepen: https://codepen.io/tinhh/pen/yrEWdK}

Với trường hợp có thêm cả **shadow** thì bạn phải kết hợp cả 2 `:before` và `:after`, thêm `box-shadow` rồi bạn phải căn chỉnh để làm sao che đi **shadow** bị thừa, tóm lại là cũng hơi vả 1 chút :smile: 

Nhưng thật là may khi CSS3 cho ra đời các thuộc tính mà khi chúng kết hợp với nhau, giúp chúng ta làm những thứ trước đây bị coi là khó, thì bây giờ trở nên dễ dàng hơn rất nhiều.

Trở lại với ví dụ về style 1 cái tag name, thay vì 1 mớ code cho `:before`, bây giờ chỉ cần 1 dòng
`clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 20px 100%, 0 50%);` là xong rồi!

{@codepen: https://codepen.io/tinhh/pen/xezNeB}

Bây giờ, đến việc thêm hiệu ứng shadow cho cái tag name kia nó cũng quá dễ luôn, viết tiếp vào ví dụ trên, ta cần bọc thêm 1 thẻ parent và viết cho nó 1 thuộc tính `filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));` là xong rồi!

> Lý do mình đặt `drop-shadow()` vào 1 thẻ parent, thay vì đặt cùng element với `clip-path` là vì `clip-path` sẽ cắt mọi hiệu ứng nằm ngoài box trên cùng layer với nó, nên shadow sẽ bị cắt, ko được nhìn thấy.

{@codepen: https://codepen.io/tinhh/pen/ZZRdpm}

> CSS3 thì hay như vậy, chỉ có điều là nó chưa được nhiều các trình duyệt hỗ trợ, nên khi sử dụng chúng ta cũng phải cân nhắc để phù hợp với yêu cầu của dự án.

#### References:

- https://css-tricks.com/using-box-shadows-and-clip-path-together/
- https://caniuse.com/#feat=css-clip-path
- https://caniuse.com/#feat=css-filters

### 2. Đừng viết CSS trong "CSS" nữa!

Hãy sử dụng các CSS Preprocessors như SASS, LESS hay Stylus. Nó thực sự đem lại rất nhiều lợi ích như code viết đẹp hơn, code viết ít hơn, code dễ đọc hơn, dễ maintain hơn, làm việc với team dễ dàng hơn, và còn nhiều nhiều lợi ích nữa!

Trong bài viết này mình chọn sử dụng CSS Preprocessors là SASS nhé! Các tính năng kể ra dưới đây đều có mặt ở các CSS Preprocessors, nếu có khác thì chỉ khác nhau về cú pháp thôi!

#### 2.1 Variables

Không thể phủ nhận sự tiện ích mà biến mang lại, mọi thứ từ `color`, `font-size`, `font-family` được sử dụng ở rất nhiều nơi trên trang, thông qua việc gọi các giá trị kia bằng biến giúp code chúng ta chỉnh sửa rất nhanh, còn giúp kiểm soát được những tiêu chuẩn về màu sắc, kích thước của các components nữa.

Mặc dù [CSS cũng có cung cấp Variables](https://caniuse.com/#feat=css-variables) nhưng lại không support ở nhiều browsers nên vẫn khó được phổ biến sử dụng ở nhiều dự án bằng như SASS được.

```scss
$font-family: Helvetica, sans-serif;
$color-primary: #333;
$color-secondary: #eee;

body {
    font-family: $font-family;
    color: $color-primary;
}

.title {
    color: $color-secondary;
}
```


#### 2.2 Nesting

Đây là tính năng mà quả thực mình thích nhất trong SASS, trước kia khi còn viết trong file `.css` mình phải luôn copy selector, tốn nhiều thời gian không kém. Với SASS đơn giản chỉ cần viết lồng vào nhau, viết code CSS lúc này nhanh hơn hẳn.

```scss
nav {
    background-color: red;
    
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        
        li {
            display: inline-block;
        }
        
        a {
            display: block;
            padding: 6px 12px;
            text-decoration: none;
        }
    }
}
```

#### 2.3 Import

Tính năng import giúp chúng ta chia nhỏ code vào các file chức năng tương ứng, code được chia ra rất dễ đọc, maintain cũng dễ, và teamwork cũng giảm được conflict vì mỗi người viết vào mỗi file `.scss` khác nhau.

Chia file, folder như thế nào là hợp lý, cái này thì tùy vào mỗi dự án, mỗi cá nhân hay tổ chức. Riêng mình thì học theo các tổ chức [the 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern) này, cảm thấy rất là OK! Rõ ràng và dễ hiểu!

> Trong SASS có chỉ định rất hay là những file dạng `_reset.scss` tức là có tiền tố `_` phía trước thì được hiểu là những file partials, những file này sẽ không bao giờ được build ra CSS, nó phải luôn được `import` (gọi vào) 1 file nào đó.

**_variables.scss**

```scss
$font-family: Helvetica, sans-serif;
$color-primary: #333;
$color-secondary: #eee;
```

**main.scss**

```scss
@import variables;

body {
    font-family: $font-family;
    color: $color-primary;
}

.title {
    color: $color-secondary;
}
```

#### 2.4 Mixins

Có thể coi nó như kiểu function trong Javascript vậy, định nghĩa 1 mixin cho phép chúng ta truyền param vào và output ra CSS khá là dynamic.

Lấy 1 ví dụ để dễ hiểu như thế này, như ở [phần 8](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-8-OeVKBDaJlkW#_1-cat-text-text-thanh-nhieu-dong-ma-khong-ton-chut-mo-hoi-nao-not-cross-browsers-0) của [series này](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8) mình nói về việc cắt text thành nhiều dòng, thay vì gọi trực tiếp ở những nơi cần truncate, nó trông quá dài dòng như này:

```scss
.description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
}

.title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

Thì lúc này, nên sử dụng mixin để viết gọn gàng code lại như sau:

```scss
@mixin truncate($line) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: $line;
    overflow: hidden;
    text-overflow: ellipsis;
}
.description {
   @include truncate(3);
}

.title {
    @include truncate(2);
}
```

> SASS còn nhiều tính năng hay nữa, trong phạm vi của bài viết này, mình không tiện để kể hết, nhưng với 4 tính năng vừa kể trên thì chúng ta không còn phải lăn tăn gì nữa. HÃY NGƯNG VIẾT CSS trong  "CSS" KỂ TỪ HÔM NAY NHÉ!

#### References:
- https://medium.freecodecamp.org/why-you-should-stop-writing-css-in-css-6fb724f6e3fc

### 3. Bạn đã bao giờ nghe tới `text-align: start` hay `text-align: end` chưa?

Mình đoán chắc rằng khá nhiều dev chỉ biết và sử dụng `text-align` với các value `left`, `right`, `center` hoặc `justify`. Chứ chưa bao giờ dùng tới `start` hay `end` cả.

Đối với những trang web chúng ta hay làm phục vụ cho ngôn ngữ Tiếng Việt, Tiếng Anh hay Tiếng Nhật, thì lúc này:

+ `text-align: start` cũng giống như `text-align: left`
+ `text-align: end` cũng giống như `text-align: right`

Bởi vì những ngôn ngữ mà chúng ta support ở trên thì chữ viết đều theo hướng từ trái sang phải (left to right)

Nhưng giả sử bạn đang thiết kế giao diện cho 1 trang web tiếng Ả Rập chẳng hạn, chữ viết của họ lại theo hướng phải sang trái (right to left)

Lúc này thì các value `start`, `left` và `right`, `end` sẽ work không giống nhau nữa.

{@codepen: https://codepen.io/tinhh/pen/PgaMOx}

Như demo trên, bạn thấy rõ ràng là `text-align` với value `start` và `end` lại work chính xác hơn là `left` và `right` phải không?

#### References:
- https://stackoverflow.com/questions/34697827/difference-between-text-align-end-and-right

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!