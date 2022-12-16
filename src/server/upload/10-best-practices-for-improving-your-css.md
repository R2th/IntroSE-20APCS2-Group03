![](https://images.viblo.asia/61acab5b-2e62-43e9-9617-525bdddb8d54.png)


CSS có vẻ như là một ngôn ngữ khá đơn giản, trên đó rất khó để mắc lỗi. Bạn chỉ cần thêm các quy tắc của mình để tạo kiểu cho trang web của mình và bạn đã hoàn thành, phải không? Với các trang web nhỏ chỉ yêu cầu một vài tệp CSS, đây có thể là trường hợp. Nhưng trong các ứng dụng lớn, các kiểu có thể nhanh chóng vượt khỏi tầm kiểm soát. Làm thế nào để bạn giữ chúng có thể quản lý?
Thực tế là, giống như bất kỳ ngôn ngữ nào khác, CSS có những sắc thái riêng có thể tạo ra hoặc phá vỡ thiết kế của bạn. Dưới đây là 10 lời khuyên cho CSS - thực tiễn tốt nhất có thể giúp bạn đưa ra những điều tốt nhất từ ​​phong cách của bạn.


### 1. Do You Really Need a Framework?
Trước hết, quyết định xem bạn có thực sự cần sử dụng khung CSS hay không. Hiện nay có nhiều lựa chọn thay thế nhẹ cho khung mạnh mẽ.Thông thường, bạn sẽ không được sử dụng mọi bộ chọn từ một khung, do đó gói của bạn sẽ chứa mã chết.
Nếu bạn chỉ sử dụng các kiểu như button, outsource  cho nhưng file css cảu mình. Ngoài ra bạn cũng không sử dụng quy tắc css trong phạm vi Devtools.

![](https://images.viblo.asia/9381c27a-6383-4cf9-afc5-2bba457c2ac5.png)


Để mở nó, tìm kiếm độ phủ sóng trong bản công cụ (Tool panel). Bạn có thể mở bằng tổ hợp phím **Ctrl + Shift + P** . Sau khi mở, hãy bắt đầu ghi lai băng cách click vào reload icon. Tất cả một thứ sẽ hiện ra là màu đỏ và không sử dụng. Bạn cũng có thế thấy vị dụ trên thông báo đến 98% css không được sử dụng. Điều này không hoàn toàn đúng đâu, có một số css thực sự hoạt động khi nó được tương tác trên web . Đối với phần css cho mobile thì được gắn flag là bytes không sử dụng. Vì vậy trước khi bạn loại bỏ bất cứ thứ gì hãy chắc chắn nó không sử dụng bất cứ chỗ nào 

### 2. Prefer Using a CSS Methodology
Xem xét một phương pháp sử  css cho project của mình.  Phương pháp css được sử dụng để tạo tính nhất quán  trong các tệp css  của bạn. Chúng cũng giúp sau này dễ mở rộng và ảo trì hơn. Dưới đây là một số phương pháp 

**BEM**

BEM : Block, Element, Modifier là phương pháp **CSS** phổ biến nhất hiện nay. Nó là tập các name conventions  bạn có thể tạo ra để sử dụng cũng như tái sử dụng. Các quy tắc đặt tên mẫu :
```
.block { ... }
.block__element { ... }
.block--modifier { ... }
```
-  .block là đại diện của một component. Chúng thương có tính chất độc lập và ý nghĩa riêng.
-  .block__element đây là một phần của .block . Chúng luôn phải đi kem với một .block, nếu không sẽ không có ý nghĩa .
-  .block--modifier:  Chúng được gắn một flag cho block hoặc element. Chúng ta có thể sử dụng chúng để thay đổi sự xuất hiện , hành vi, trạng thái element.

vd: .block--hidden.

**ITCSS**

Inverted Triangle CSS  giúp bạn sắp xếp css project của bạn theo cahs mô đun hóa hoặc Đối tượng css xây dựng ý tưởng.
Ý tưởng mới về css Tam giác ngược là mọt cách phân lớp các thuộc tính css dựa trên mức độ cụ thể và tầm quan trọng của họ. Đây là một phương pháp it được biết đến so với SMACSS và OOCSS -mặc dù cả đều có thể được kết hợp  với ITCSS.
![](https://images.viblo.asia/6f6c5a2c-3d0c-423d-8fad-9192425feda8.png)

**OOCSS**

Object-oriented CSS, or OOCSS Có hai nguyên tắc chính.
Đây là một kỹ thuật gom nhóm nhiều phần tử trên website vào sử dụng chung một đoạn CSS nếu có các tính chất giống nhau.  Sau đó ở mỗi phần tử con, chúng ta có thể thêm các style riêng cho nó nếu cần tùy biến lại
```
/* Instead of  */
.box {
    width: 250px;
    height: 250px;
    padding: 10px;
    border: 1px solid #CCC;
    box-shadow: 1px 2px 5px #CCC;
    border-radius: 5px;
}

/* Do */
.box {
    width: 250px;
    height: 250px;
    padding: 10px;
}

.elevated {
    border: 1px solid #CCC;
    box-shadow: 1px 2px 5px #CCC;
    border-radius: 5px;
}
```


### 2. Separating container and content

Điều này có nghĩa là  bạn không muốn bất ký element nào phụ thuộc vào vị trí của nó .Các yếu tố giống nhau sẽ trông giống nhau bất kể chúng ở đâu trên trang
```
/* Instead */
.main span.breadcumb { ... }

/* Do */
.breadcrumb { ... }
```

### 3. Set Up a Pre-Processor

Thiết lập cac bộ tiền xử lý có lợi cho bạn theo nhiều cách khác nhau. Bộ tiền xử lý là một công cụ  cho phép bạn sử dungk với các tính năng nâng cao không có trong css. Đây có thể là các biến cho vòng lặp thậm chí cả hàm. 
Có rất nhiều bộ xử lý trước đó có lẽ nổi tiếng  nhât là Sass, Less và Stylus. Tôi khuyên bạn nên sử dụng Sass có cộng động  support rất tốt .

**Organize your styles better**

Bộ tiền xử lý có thể giúp bạn tổ chức style tốt hơn. Chúng có thể break down file của bạn ra nhỏ hơn, để  tái sử dụng

```
// Import different modules into one SCSS file
@import 'settings';
@import 'tools';
@import 'generic';
@import 'elements';
@import 'objects';
@import 'components';
@import 'trumps';
```

**Nest your selectors**

Đây là cách tuyệt vời để tăng cường khả năng đọc với các selectorcủa bạn được lồng vào nhau. Đây là một tính năng đơn giản nhưng lại là tính tăng mạnh mẽ mà css còn thiếu.
Cấu trúc phân cấp giúp dễ dang hình dung hơn các yếu tố khác gắn kết nhau hơn 

**Automatically vendor prefix your rules**

Có một vài  tính năng không chuẩn hoăc được thử nghiệm tiền tố css. Khác  nhau với từng trình duyệt khác nhau khi sử dụng tiền tố

```
-webkit- :  cho các trình duyệt dưa vào Webkit như Chrome, Safari, hoặc Opera version mới.
-moz- : FireFox
-o- : phiên bản cũ của Opera
-ms- : cho IE và Edge
```

Để hỗ trợ cho nhiều browsers , chúng tôi phải đinh nghĩa các thuộc tính rất nhiều lần.
```
.gradient {
    background: rgb(30,87,153);
    background: -moz-linear-gradient(top, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%, rgba(32,124,202,1) 51%, rgba(125,185,232,1) 100%);
    background: -webkit-linear-gradient(top, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%, rgba(32,124,202,1) 51%, rgba(125,185,232,1) 100%);
    background: linear-gradient(to bottom, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%, rgba(32,124,202,1) 51%, rgba(125,185,232,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e5799', endColorstr='#7db9e8', GradientType=0);
}
```

Bộ xử lý trước giúp chúng tôi giải quyết vấn đề này bằng mixins - các chức năng có thể được sử dụng thay cho các giá trị được mã hóa cứng.

```
@mixin gradient() {
    background: rgb(30,87,153);
    background: -moz-linear-gradient(top, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%, rgba(32,124,202,1) 51%, rgba(125,185,232,1) 100%);
    background: -webkit-linear-gradient(top, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%,rgba(32,124,202,1) 51%, rgba(125,185,232,1) 100%);
    background: linear-gradient(to bottom, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%,rgba(32,124,202,1) 51%, rgba(125,185,232,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e5799', endColorstr='#7db9e8', GradientType=0);
}

.gradient {
    @include gradient();
}
```

Thay vì viết đi viết lại nhiều lần, bạn chỉ có thể đưa vào mixin bất cứ khi nào bạn cần.

**Using post-processors**

Một lựa chọn còn tốt hơn bộ hậu xử lý . Nó có thể chạy các bước tối ưu hóa bổ sung CSS của bạn được tạo bới bộ tiền xử lý .Một trong nhưng bộ xử lý sau tốt nhất  **PostCss**.

Bạn có thể sử dụng **PosCss** tự động  thêm tiện tố vào các quy tắc CSS của mình  vì vậy bạn không cần phải lo lắng về việc rời khỏi các trình duyệt chính.

Một bộ xử lý hậu tuyệt vời khác là autoprefixer. Với autoprefixer, khi bạn muốn hỗ trợ bốn phiên bản mới nhất - bạn đã hoàn thành tất cả mà không phải viết bất kỳ tiền tố nhà cung cấp nào trong các tệp CSS của mình!

```
const autoprefixer = require('autoprefixer')({
    browsers: [
	'last 4 versions',
	'not ie < 9'
    ]
});
```

**Use configs for consistent designs**

Ngoài mixins, bạn cũng có tùy chọn để sử dụng các biến. Kết hợp với một kẻ nói dối, bạn có thể thực thi các quy tắc thiết kế.

```
// Font definitions
$font-12: 12px;
$font-21: 21px;

// Color definitions
$color-white: #FAFAFA;
$color-black: #212121;
```

### 4. Use Markup Instead of CSS

Bây giờ, hãy để di chuyển đến CSS thực tế. Điều này thường bị bỏ qua. Thông thường, bạn có thể giảm kích thước các gói CSS của mình bằng cách sử dụng các thành phần HTML chính xác. Giả sử bạn có một tiêu đề với bộ quy tắc sau:


```
span.heading {
    display: block;
    font-size: 1.2em;
    margin-top: 1em;
    margin-bottom: 1em; 
}
```

Bạn có thể sử dụng phần tử span làm tiêu đề. Bạn ghi đè lên màn hình mặc định, khoảng cách hoặc kiểu phông chữ. Điều này có thể tránh được bằng cách sử dụng h1, h2 hoặc h3 thay thế. Theo mặc định, chúng có các kiểu mà bạn đang cố gắng đạt được với các yếu tố khác. Bạn có thể ngay lập tức thoát khỏi bốn quy tắc không cần thiết.

### 5. Use Shorthand Properties

Để tiếp tục giảm số lượng quy tắc, luôn luôn cố gắng đi với các thuộc tính tốc ký. Đối với ví dụ trên, chúng ta có thể nói:

```
.heading {
    margin: 1em 0;
}
```
Điều này đúng với các thuộc tính khác như paddings, viền hoặc background

![](https://images.viblo.asia/80faf313-ad0c-4f49-8794-3f0127440f47.gif)

### 6. Reduce Redundancy

Điều này đi đôi với điểm trước. Đôi khi, khó có thể phát hiện ra sự dư thừa, đặc biệt là khi  không lặp lại các quy tắc  Gõ theo cùng một thứ tự trong cả hai bộ chọn. Nhưng nếu các lớp của bạn khác nhau chỉ trong một hoặc hai quy tắc, thì tốt hơn hết là thuê ngoài các quy tắc đó và sử dụng chúng như một lớp bổ sung. Thay vì điều này:
```
<style>
    .warning {
        width: 100%;
        height: 50px;
        background: yellow;
        border-radius: 5px;
    }

    .elevated-warning {
        width: 100%;
        height: 50px;
        font-size: 150%;
        background: yellow;
        box-shadow: 1px 2px 5px #CCC;
        border-radius: 5px;
    }
</style>

<div class="warning">⚠️</div>
<div class="elevated-warning">🚨</div>
```


Cố gắng đi với một cách tiếp cận tương tự:

```
<style>
    .warning {
        width: 100%;
        height: 50px;
        background: yellow;
        border-radius: 5px;
    }

    .warning--elevated {
        font-size: 150%;
        box-shadow: 1px 2px 5px #CCC;
    }
</style>

<div class="warning">⚠️</div>
<div class="warning warning--elevated">🚨</div>
```

### 7. Avoid Complex Selectors

Có hai vấn đề lớn với việc sử dụng các bộ chọn phức tạp. Đầu tiên, tính đặc hiệu tăng lên của bạn sẽ không chỉ khiến việc viết lại các quy tắc hiện tại trở nên khó khăn hơn mà còn tăng thời gian để trình duyệt khớp với các selector.

**Matching selectors**

Khi trình duyệt của bạn đang cố gắng diễn giải các bộ selector và quyết định phần tử nào phù hợp, chúng sẽ đi từ phải sang trái. Điều này nhanh hơn về mặt hiệu suất so với cách khác. Hãy để lấy bộ chọn dưới đây làm ví dụ.

```
.deeply .nested .selector span {
    ...
}
```

Trình duyệt của bạn trước tiên sẽ bắt đầu từ span . Nó sẽ phù hợp với tất cả các thẻ span sau đó chuyển sang thẻ tiếp theo. Nó sẽ lọc ra các span bên trong một lớp .selector, v.v.
Nó không khuyến khích sử dụng thẻ cho bộ selector  CSS vì nó sẽ phù hợp với mọi thẻ. Mặc dù sự khác biệt chỉ có thể được đo bằng một phần của một phần nghìn giây, nhưng những điều nhỏ nhặt lại. Quan trọng hơn, nó thực hành tốt để giảm sự phức tạp vì một lý do khác.


**Understanding the selector**

Nó không chỉ khó cho máy móc phân tích, mà còn khó cho con người làm điều đó. Lấy ví dụ sau đây làm ví dụ:
```
[type="checkbox"]:checked + [class$="-confirmation"]::after {
    ...
}
```


Khi nào bạn nghĩ rằng quy tắc trên sẽ được áp dụng? Điều này có thể được đơn giản hóa bằng cách tạo một lớp tùy chỉnh và chuyển đổi nó bằng JavaScript.

```
.confirmation-icon::after {
    ...
}
```

Bây giờ nó trông dễ chịu hơn nhiều. Nếu bạn vẫn thấy mình cần một bộ selector  quá phức tạp và bạn tin rằng bạn không có lựa chọn nào khác, vui lòng để lại nhận xét bên dưới giải thích giải pháp của bạn.

```
/**
 * Creates a confirmation icon after a checkbox is selected.
 * Select all labels ending with a class name of "-confirmation"
 * that are preceeded by a checked checkbox.
 * PS.: There's no other way to get around this, don't try to fix it.
 **/
.checkbox:checked + label[class$="-confirmation"]::after {
    ...
}
```

### 8. Don’t Remove Outlines

Đây là một trong những lỗi phổ biến nhất mà các developer  mắc phải khi viết CSS. Mặc dù bạn có thể nghĩ rằng không có gì sai khi xóa highlight  mà phác thảo tạo ra, nhưng thực tế, bạn đã làm cho trang web không thể truy cập được. Nó thực hành phổ biến để thêm quy tắc này như là một thiết lập lại cho CSS của bạn.

```
:focus {
    outline: none;
}
```

Tuy nhiên, theo cách này, người dùng chỉ có điều hướng bằng bàn phím sẽ không biết gì về những gì họ tập trung vào trang web của bạn.

![](https://images.viblo.asia/2849ac7f-22de-497b-b7b3-cefd95c4edc1.gif)

Nếu styles mặc định có vẻ xấu cho thương hiệu của bạn, hãy tạo các phác thảo tùy chỉnh. Chỉ cần chắc chắn rằng có một số loại dấu hiệu khi nói đến các yếu tố focus.

### 9. Use Mobile First
Khi bạn phải đối phó với các truy vấn media, luôn luôn sử dụng điện thoại di động trước. Cách tiếp cận đầu tiên trên thiết bị di động có nghĩa là bạn bắt đầu viết CSS cho các thiết bị màn hình nhỏ trước và xây dựng từ đó. Điều này cũng được gọi là tăng cường tiến bộ.
Điều này sẽ đảm bảo rằng bạn chủ yếu thêm các quy tắc bổ sung để phục vụ cho các thiết bị màn hình lớn, thay vì viết lại các quy tắc CSS hiện có. Điều này có thể làm giảm số lượng các quy tắc bạn kết thúc với.
Làm thế nào bạn có thể biết nếu bạn sử dụng điện thoại di động đầu tiên? Nếu truy vấn phương tiện của bạn sử dụng độ rộng tối thiểu, bạn có thể đi đúng hướng.

```
/* Mobile-first media query, everything above 600px will get the below styles */
@media (min-width: 600px) {
    /* your CSS rules */
}

/* Non mobile-first media query, everything below 600px will get the below styles */
@media (max-width: 600px) {
    /* your CSS rules */
}
```


### 10. Compress

Cuối cùng, nén các gói của bạn để giảm kích thước của chúng. Nén loại bỏ các bình luận và khoảng trắng các gói của bạn yêu cầu ít băng thông hơn.

![](https://images.viblo.asia/f8b87961-2b0a-4934-b5c9-52e14399b4b7.png)


Nếu bạn có ản  quyền, hãy bật tính năng nén ở phía máy chủ.
Một cách tuyệt vời khác để giảm thêm kích thước CSS của bạn - và markup là che giấu tên lớp.

![](https://images.viblo.asia/477437db-e7ad-4bcc-8d10-ef842d7890e9.png)


Để đạt được điều này, bạn có một vài tùy chọn dựa trên thiết lập dự án của bạn:
 -  Webpack:  bạn có thể sử dụng css-loader module.
 -  Gulp: bạn có thể sử dụng gulp-minify-cssnames plugin.
 -  Tạo cho chính mình  Bạn có thể tham khảo hướng dẫn tại đây : https://medium.com/swlh/how-i-reduced-my-css-bundle-size-by-more-than-20-76433e7330eb


### Tóm lại

Những lợi ích nhận thấy nếu bạn làm theo các  bước như trên vói file css cảu bạn :

+ Nhẹ hơn
+ Dễ bảo trì
+ Dễ mở rộng hơn


Link tham khảo :

http://getbem.com/introduction/

https://medium.com/better-programming/10-best-practices-for-improving-your-css-84c69aac66e

https://thachpham.com/web-development/html-css/oocss-voi-sass.html