Là một Front-end developer việc ngày ngày phải viết responsive cho trang web của bạn bằng CSS là một điều bắt buộc. Những câu lệnh media query, max-width, min-width,... bạn phát ngán khi phải lặp lại chúng nhiều lần, vậy có khi nào bạn thắc mắc là 'Liệu có cách nào để viết media query nhanh hơn được không  ?'. 

Thật may là ta đã có SCSS, một **Preprocessor** giúp ta có thể viết CSS nhanh và gọn gàng hơn. Lợi ích của SCSS thì mình khó mà nói hết ra được, tuy nhiên trong bài viết này mình sẽ hướng dẫn các bạn cách viết một mixin bằng SCSS áp dụng cho mọi trường hợp bạn mong muốn !

## 1. Chọn breakpoint mà bạn mong muốn.
Ngoài thẻ meta, việc lựa chọn breakpoint là điều cực kì quan trọng khi responsive một trang web, nó quyết định trang web của bạn sẽ tương thích với các loại màn hình nào, co giãn ra sao khi người dùng resize trình duyệt, dưới đây là một số breakpoint mình hay sử dụng khi làm việc. Mình sử dụng [map](https://sass-lang.com/documentation/values/maps) của SCSS để định nghĩa nó.
```scss
$breakpoints: (
    phone-sm: 420px,
    phone: 767px,
    tablet: 768px,
    tablet-lg: 1024px,
    desktop: 1025px,
    desktop-lg: 1600px
);
```
Tất nhiên những dòng code trên chỉ là ví dụ, tuỳ vào dựa án và yêu cầu mà bạn có thể khai báo lại giá trị của các breakpoint một các hợp lý :wink:.
## 2. Bắt tay vào viết mixin nào.
Sau khi đã có các breakpoint bên trên, bây giờ mình sẽ viết một mixin cơ bản để khi các bạn include mixin đó vào, chỉ cần truyền tên biến thì SCSS sẽ tự động lấy các giá trị pixel mà bạn định nghĩa phía trên.
```scss
@mixin for-size($breakpoint) {

    //Kiểm tra breakpoint truyền vào có tồn tại
    như bạn đã định nghĩa hay không.
    @if map-has-key($breakpoints, $breakpoint) {
    
    // Lấy giá trị pixel breakpoint đó
    $breakpoint-value: map-get($breakpoints, $breakpoint);
    
    //Build media query
      @media (max-width: $breakpoint-value) {
        //Những gì bạn mong muốn sẽ được lồng vào @content
        @content;
      }
    } 
}
```
**map-has-key** và **map-get** là hai [map funtion](https://sass-lang.com/documentation/functions/map), nếu bạn muốn tìm hiểu sâu hơn thì hãy click vào từ khoá nhé. Đã có mixin rồi, sử dụng nó nào. ( Click vào button **SCSS** để xem sự khác biệt nhé)
{@embed: https://codepen.io/stelllegend/pen/rNBMYLQ}
## 3. Sử dụng min-width và max-width linh hoạt hơn.
Trên ví dụ trên mình sử dụng mặc định **max-width**, tuy nhiên bạn lại muốn linh hoạt hơn, có thể dùng **min-width** hay **max-width** khi nào bạn mong muốn thì phải làm sao? Thêm một vài dòng code là xong ngay thôi mà !
```scss
@mixin for-size($breakpoint, $direction:down) {

    //neu breakpoint ton tai
    @if map-has-key($breakpoints,  $breakpoint) {
        //Kiểm tra breakpoint truyền vào có tồn tại như bạn đã định nghĩa hay không.
        $breakpoint-value: map-get($breakpoints, $breakpoint);

        // Xác định min-width hay max-width
        @if $direction == up {
            //Build media query
            @media (min-width: $breakpoint-value) {
                @content;
            }
        }
        @else if $direction == down {
            //Build media query
            @media (max-width: $breakpoint-value) {
                @content;
            }
        }
    }
}
```
Sử dụng thôi !!!{@embed: https://codepen.io/stelllegend/pen/abomVWg}
Ơ, nhưng bạn muốn sử dụng giá trị pixel để truyền vào mixin thì phải như nào đây ??

Dễ thôi, thêm đoạn code này vào.
```scss
@else {

        @if $direction == up {
            //Build media query
            @media (min-width: $breakpoint) {
                @content;
            }
        }
        @else if $direction == down {
            //Build media query
            @media (max-width: $breakpoint) {
                @content;
            }
        }

    }
```
Còn đây là ví dụ nếu như bạn chưa hình dung được
{@embed: https://codepen.io/stelllegend/pen/rNBMYYR}
## 4. Sử dụng cả min-width và max-width trong media query.
Nếu như bạn sử dụng cả min-width và max-width vào trong media query thì hãy sử dụng mixin một lần nữa.
```scss
@mixin between-sizes ($lower, $upper) {
    //Kiểm tra breakpoint truyền vào có tồn tại như bạn đã định nghĩa hay không.
    @if map-has-key($breakpoints, $lower ) and map-has-key($breakpoints, $upper) {
        // Lấy giá trị pixel breakpoint đó
        $lower-breakpoint: map-get($breakpoints, $lower);
        $upper-breakpoint: map-get($breakpoints, $upper);

        //Build media query tự động
        @media (min-width: $lower-breakpoint) and (max-width: $upper-breakpoint) {
            @content;
        }
    }
    @else {
        //Build media query tự động
        @media (min-width: $lower) and (max-width: $upper) {
            @content;
        }
    }
}
```
Mọi thứ có vẻ đã ổn hơn rồi đấy, nếu như bạn muốn sử dụng nó linh hoạt hơn thì hãy cải tiến nó như bạn mong muốn nhé !
### Tham khảo 
* [Cheewebdevelopment](https://cheewebdevelopment.com)