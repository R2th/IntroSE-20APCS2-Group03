<div align="center">
    
# Lời nói đầu
</div>

Xin chào các bạn, mình lại quay trở lại rồi đây. Với các bạn đã và đang tìm hiểu, học tập về lập trình web thì chắc chắc chắn các bạn đều biết CSS là "lớp trang điểm" cho trang web của bạn. Và cũng giống như đồ trang điểm cho chị em thì đồ trang điểm cho website cũng rất nhiều "hãng" đa dạng. 

Bạn chắc chắn đã từng nghe đến **[Bootstrap](https://getbootstrap.com/docs/4.1/layout/overview/)** hay là **[W3.CSS](https://www.w3schools.com/w3css/default.asp)**. Nhưng khi đi tìm hiểu thì mình mới biết rằng 2 CSS Framework phổ biến nhất là **Bootstrap** và **Foundation** (1 cái tên khá lạ lẫm đối với mình).

Nếu như bạn cũng giống mình thì hãy đọc tiếp để xem xem **[Foundation](https://foundation.zurb.com/)** có gì đặc biệt nhé. Còn nếu bạn đã biết rồi, thì hãy đọc bài và góp ý giúp mình nếu mình có thiếu xót gì về dịch thuật cũng như nội dung nhé. Bắt đầu thôi nào!

>>> ở bài viết này chúng ta sẽ đề cập đến Bootstrap 4 và Foundation 6 nhé các bạn!

<div align="center">
    
# Nội dung
</div>

<div align="center">
    
## Sơ qua về 2 framework
</div>

Trước hết hãy cùng ngó qua **[google trend](https://trends.google.com/trends/?geo=US)** xem trong 3 từ khóa trên, mọi người tìm kiếm cái gì nhiều nhất nhé.

![](https://images.viblo.asia/79c59dab-a1a0-4c66-a1b1-a625f4b88900.png)

Như các bạn thấy tại thời điểm 12/5 - 18/5  thì lượng tìm kiếm cho bootstrap 4 áp đảo so với foundation 6 (đây chỉ là số lượt tìm kiếm trên google để tham khảo thôi, không thể kết luận được là ít người dùng foundation đâu nhé).

Để chứng minh cho điều đó, hãy lượn lên Github xem cộng đồng developer quan tâm đến 2 framework này như thế nào nhé.

![](https://images.viblo.asia/9bb0f6da-fee2-46bd-b23b-52e53d117557.png)

<div align="center">
    
[**Bootstrap**](https://github.com/twbs/bootstrap)
</div>

![](https://images.viblo.asia/173b00b3-9c1f-4fc2-8dfd-23da03ae1e7b.png)
<div align="center">
    
[**Foundation**](https://github.com/zurb/foundation-sites)
    
</div>

Tuy số Star cũng như là Fork của Foundation nhỏ hơn của Bootstrap nhưng đó vẫn là những con số đang nể, ngoài ra một số thương hiệu lớn cũng đang sử dụng Foundation cho sản phẩm của họ như Adobe, eBay, EA, Amazon, Mozilla.

<div align="center">

## Ưu và nhược điểm khi sử dụng Framework:
</div>

- Ưu:
    - Đễ bảo trì code
    - Dễ dàng cài đặt và quản lí
    - Tích hợp sẵn responsive
    - Đa số là open source và miễn phí
    - Vì là open source nên được nhiều người đóng góp cũng như kiểm tra, phát triển
    - Thường xuyên được cập nhật tính năng mới, fix bug
- Nhược:
    - Có thể sẽ cần tốn nhiều thời gian để tự customize theo nhu cầu
    - Sẽ phải thay đổi tài liệu khi có cập nhật mới
    - Có thể bị thiếu chức năng mà bạn cần


<div align="center">

## So sánh Bootstrap và Foundation
</div>

<div align="center">

### Cấu trúc thư mục
</div>

![](https://images.viblo.asia/a45cf886-2739-4962-864a-2dce886bf625.png)

![](https://images.viblo.asia/6fffde38-5fb7-404b-a5be-50ad9d8bf21a.png)

Ấn tượng đầu tiên chắc chắn là cấu trúc của foundation có nhiều thứ hơn chứ không gọn nhẹ như bootstrap.

<div align="center">

### Cú pháp
</div>

Trước hết cần xác định trước những cái giống nhau giữa 2 framework:
- Cả Bootstrap và Foundation đều đang sử dụng SASS và mixins (nếu bạn chưa biết SASS là gì thì có thể tham khảo [bài viết này](https://viblo.asia/p/sass-va-scss-ban-chon-gi-part-1-gAm5yR1XKdb) của mình ^^)
- Cả hai đều có 'grid system', tuy nhiên với Foundation thì nó có tên là 'responsive gutters'.
- Cả 2 đều hỗ trợ chia 12 cột với chiều rộng lên tới 75em.

Trên đây là một số điểm chung giữa hai framework, giờ hãy cùng tìm hiểu sự khác nhau về cú pháp nhé:
- Single column syntax:
    - Bootstrap
    ```
   .col-xs-1
    .col-sm-1
    .col-md-1
    .col-lg-1
    .col-xl-1
    ```
    - Foundation
    ```
    .small-1.columns
    .medium-1.columns
    .large-1.columns
    .[custom]-1.columns
    ```
    
- Containers:
    - Bootstrap
    ```html
    <div class="container">  or <div class="container-fluid">
    ```
    - Foundation
    ```html
    <div class="row"/>
    ```
- Media Queries:
    - Bootstrap
    ```css
    // Small devices (landscape phones, 34em and up)
    @media (min-width: 34em) { ... }

    // Medium devices (tablets, 48em and up)
    @media (min-width: 48em) { ... }

    // Large devices (desktops, 62em and up)
    @media (min-width: 62em) { ... }

    // Extra large devices (large desktops, 75em and up)
    @media (min-width: 75em) { ... }

    // Sass mixins
    @include media-breakpoint-up(xs) { ... }
    @include media-breakpoint-up(sm) { ... }
    @include media-breakpoint-up(md) { ... }
    @include media-breakpoint-up(lg) { ... }
    @include media-breakpoint-up(xl) { ... }
    ```
    - Foundation
    ```css
    // Small
    None

    // Medium
    @media screen and (min-width: 40em)

    // Large
    @media screen and (min-width: 64em)

    // [Custom]
    @media screen and (min-width: [custom]em)

    // CUSTOM BREAKPOINTS (Sass)
    $breakpoints: (
        // all px values are converted to ems
        small: 0px,
        medium: 640px,
        large: 1024px,
        xlarge: 1200px,
        xxlarge: 1440px,
        [custom]: ...px,
    );
    ```
- Nested Columns:
    - Bootstrap
    ```html
    <div class="row">
        <div class="col-sm-9">
            <div class="row">
                <!-- nested columns add up to 12 -->
                <div class="col-xs-8 col-sm-6">...</div>
                <div class="col-xs-4 col-sm-6">...</div>
            </div>
        </div>
    </div>
    ```
    - Foundation
    ```html
    <div class="row">
        <div class="small-6 columns">
            <div class="row">
                <!-- nested columns add up to 12 -->
                <div class="small-6 columns">...</div>
                <div class="small-6 columns">...</div>
            </div>
        </div>
    </div>
    ```
-  Offset Columns:
    - Bootstrap
    ```html
    <div class="row">
        <div class="col-md-4">...</div>
        <div class="col-md-4 col-md-offset-4">...</div>
    </div>
    ```
    - Foundation
    ```html
    <div class="row">
        <div class="large-1 columns">1</div>
        <div class="large-8 large-offset-3 columns">8, offset 3</div>
    </div>
    ```


<div align="center">

## Tổng kết
</div>
Thông qua phần so sánh về cú pháp ở trên, chắc các bạn cũng có thể thấy được rằng những chức năng cơ bản thì cả 2 framework đều có đầy đủ, tuy nhiên thì cú pháp của Foundation có vẻ hơi dài dòng hơn thì phải. Có bạn sẽ đặt ra câu hỏi: 

`Vậy thì sao lại phải đi dùng cái dài hơn, ngắn gọn sẽ tốt hơn chứ?`

Do là dài hơn nên khi đọc code của Foundation thì ấn tượng đầu tiên của mình là nó rất chi tiết và dễ hiểu.

Ngoài ra, nếu các bạn để ý kĩ thì sẽ thấy ở bên Foundation (trong `single column syntax`, `media queries`, ...) có một option css là `custom` cho phép bạn tuỳ chỉnh thiết lập  css theo ý của mình. Như vậy Foundation dễ dàng được customize hơn so với Bootstrap, đó cũng là một ưu điểm của Foundation mà bạn có thể cân nhắc.



    
<div align="center">
    
# Lời kết
</div>

Tóm lại, bất cứ framework CSS nào cũng có những ưu và nhược điểm riêng của nó. Không có framework nào là tốt hơn hẳn cái nào, chỉ là bạn lựa chọn được framework nào phù hợp hơn với bài toán của bạn mà thôi. Và sau khi tìm hiểu kĩ hơn, mong rằng bạn sẽ lựa chọn được cho mình framework CSS phù hợp.

<div align="center">
    
# Tài liệu tham khảo
</div>

- Bài gốc: https://www.keycdn.com/blog/bootstrap-vs-foundation
- Bootstrap: https://getbootstrap.com/docs/
- Foundation: https://foundation.zurb.com/