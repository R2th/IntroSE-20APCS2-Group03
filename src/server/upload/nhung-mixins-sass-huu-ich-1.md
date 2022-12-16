Một trong nhữn lợi ích của việc sử dụng Sass thay cho css thông thường đó là nó cải thiện quy trình và tốc độ dev của frontend, nó tự động hoá và dễ dàng tuỳ biến.

Dưới đây là một mixins mình thường sử dụng trong hầu hết các dự án mà mình từng triển khai. Hiện nay thì có rất nhiều mixins hữu ích mà bạn có thể dễ dàng tìm được trên mạng, hầu hết đều do các bạn devs xây dựng và đóng góp cả, tuy nhiên cũng có những thư viện mixin Sass cũng khá là tốt và phổ biến như Bourbon.

## Media queries
Media queries là một trong những tính năng được sử dụng phổ biến nhất hiện nay của Css, tuy nhiên cách viết của nó thì khá dài dòng. Với việc sử dụng sass và mixins, chúng ta có thể dễ dàng add custom break points, và viết ngắn gọn hơn rất nhiều. Hơn nữa, với cách viết css trước đây, thông thường các styles cho responsive cho từng màn hình sẽ được tách riêng ra từng file hoặc từng block riêng để dễ quản lý hơn một chút.
Với Sass & mixins thì việc viết queries sẽ được thực hiện luôn trong block đang được styles, và việc quản lý, maintain sẽ đỡ vất vả hơn rất nhiều.

### // Define the breakpoints

```javascript
$breakpoint-small: 600px;
$breakpoint-med-small: 960px;
$breakpoint-med: 1175px;
```

### // Mixins

```javascript
@mixin screen($size, $type: max, $pixels: $breakpoint-small) {
  @if $size == 'small' {
    @media screen and ($type + -width: $breakpoint-small) {
        @content;
    }
  }
  @else if $size == 'med-small' {
    @media screen and ($type + -width: $breakpoint-med-small) {
        @content;
    }
  }
  @else if $size == 'med' {
    @media screen and ($type + -width: $breakpoint-med) {
        @content;
    }
  }
 @else if $size == 'large' {
    @media screen and ($type + -width: $breakpoint-med) {
        @content;
    }
  }
  @else if $size == 'custom' {
    @media screen and ($type + -width: $pixels + px) {
     @content;
    }
  }
  @else {
    @content;
  }
}
```


### // Using the mixin

```javascript
.foo {
  @include screen(large) {
    width: 20%;
  }
  @include screen(med) {
    width: 40%;
  }
  @include screen(med-small) {
    width: 60%;
  }
  @include screen(small) {
    width: 80%;
  }
  @include screen(custom, max, 400) {
    width: 100%;
  }
}
```

Mixins Media Queries này có thể hoạt động độc lập, cũng có thể hoạt động chung được với các lưới layout của các frameworks khác, ví dụ bootstrap, semantic...

Câu lệnh if sẽ emit một media queries tới một màn hình có kích cỡ phụ thuộc vào size name ta cung cấp cho mixins. Nó cho phép chung ta có thể dẽ dàng tuỳ chỉnh thuộc tính css của mình tại kích cỡ mong muốn. Thông thường, hầu hết các responsive layout sẽ stick khoảng 3 đến 4 màn kích cỡ màn hình để làm việc. Sự khác biệt về kích thước màn hình cũng như sự đa dạng về các loại thiết bị luôn luôn phát triển, nhưng có một điều sẽ không thay đổi đó là quan niệm, màn hình nhỏ sẽ là màn điện thoại, màn trung bình thì sẽ là máy tính bảng, và màn lớn sẽ cho laptop or Pc.

bạn có thể tham khảo các media points của bootstrap v3 như này: 

* `max-width: 767px (any screen up to 767px wide)`
* `min-width: 768px (any screen more than 768px wide)`
* `min-width: 992px (any screen more than 992px wide)`
* `min-width: 1200px (any screen more than 1200px wide)`