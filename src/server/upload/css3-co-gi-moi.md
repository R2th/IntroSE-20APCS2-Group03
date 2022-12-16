### CSS là gì ?
Cascading Style Sheets (CSS) là cơ chế đơn giản cho việc thêm các style (màu sắc, phông chữ, …) cho tài liệu web.

### CSS3 là gì ?
CSS3 là bản nâng cấp mới nhất của CSS với mục đích mở rộng CSS2.1 . CSS3  bổ sung, mang đến nhiều tính năng mới như bo tròn góc, tạo độ bóng, gradient, transitions hay animations cũng như các bố cục mới như multiple-column, flexbox hay grid layout.

### Có gì mới ?
#### CSS3 selectors:
Selector là trái tim =)) của CSS. Ban đầu CSS cho phép kết hợp các phần tử theo type, class và Id. CSS2.1 đã thêm psudo-elements, pseudo-classes và combinators. Với CSS3, ta có thể thao tác chọn với bất kỳ phần tử nào trên trang web với bộ selectors phong phú.

CSS2 được giới thiệu một phải attribute selectors. Những cái này cho phép lựa chọn các phần tử dựa trên thuộc tính của chúng. CSS3 mở rộng hơn những attribute selectors này. Ba bộ chọn thuộc tính được thêm vào CSS3, cho phép lựa chọn chuỗi con.

+ Chọn bất kỳ phần tử E nào mà thuộc tính attr của nó bắt đầu với giá trị val.
> Ví dụ: a[href^=https://viblo.asia'] {color: red;}

+ Chọn bất kỳ phần tử mà thuộc tính của nó kết thúc bằng giá trị val.
> Ví dụ: a[href$='.html'] {color: green;}

+ Chọn bất kỳ phần tử nào mà thuộc tính của nó khớp với giá trị của nó
> Ví dụ: img[src*='artwork'] { border-color: #C3B087 #FFF #FFF #C3B087; }

#### Pseudo-classes
Một vài ví dụ như :link, :visited, :hover, :active, và :focus.

Một vài pseudo-class được thêm vào CSS3. Một là :root, cho phép chỉ đến phần tử gốc của một tài liệu. Trong HTML, đó là thẻ <html>. Vì :root là chung, nên nó cho phép lập trình viên lựa chọn phần tử root của một tài liệu XML mà không cần biết tên của nó. Để cho phép scrollbar khi cần trong tài liệu HTML, ta có:
:root{overflow:auto;}

Như là một bổ sung tới :first-child selector, :last-child đã được thêm vào, với selector này, ta có thể lựa chọn phần tử cuối cùng của phần tử cha. Ví dụ một trang với các bài báo được chứa trong thẻ \<div class=’article’></div>, chúng ta muốn style cho phần tử cuối cùng: 
div.article > p:last-child{font-style: italic;}

Một bộ chọn pseudo-class được thêm vào là :target. Để tăng sự chú ý cho tiêu đề của một cái tab khi được người dùng click, link đó sẽ được in đậm lên, như sau:
> span.notice:target{font-size: 2em; font-style: bold;}
    
> <a href='#section2'>Section 2</a>
    
> \<p id='section2'></p>

Selector phủ định, *:not *có thể ghép với các bộ chọn khác.
Ví dụ để đặt thuộc tính border xung quanh img mà chưa có border, chúng ta có thể dùng: 
    
> img:not([border]){border: 1;}
 
#### CSS3 Colors:
    
CSS3 đem tới một vài khác thể hiện màu mới, trước CSS3, chúng ta hầu như sử dụng định dạng màu hexadecimal (#FFF, #FFFFF). Nó cũng có thể khai báo kiểu rgb(), cung cấp các số integer (0-255) hoặc phần trăm.

Danh sách từ khóa màu sắc đã được mở rộng trong module màu CSS3 với 147 từ khóa màu sắc bổ sung. CSS3 cũng cung cấp cho chúng ta với một số tùy chọn khác: HSL, HSLA và RGBA. Đáng chú ý nhất là sự thay đổi của kiểu màu mà có thể thay đổi độ trong suốt.
Bo tròn các góc:
    
Thuộc tính border-radius giúp tạo ra các góc được bo tròn mà không phải sử dụng hình ảnh hay các markup bổ sung.
Ví dụ: border-radius: 14px;

> Viết tường minh: border-radius: 4px 9px 14px 19px;
    
#### Drop Shadows
CSS3 cung cấp khả năng thêm các đổ bóng cho các phần tử sử dụng thuộc tính box-shadow. Thuộc tính này để bạn xác định màu, độ cao, độ rộng, blur và offset của một hoặc nhiều đổ bóng bên trong và/ hoặc bên ngoài cho các phần tử.

    Ví dụ: box-shadow: 2px 5px 0 0 rgba(72,72,72,1);

#### Text Shadow
Text-shadow thêm các đổ bóng cho chữ, cú pháp:
text-shadow: topOffset leftOffset blurRadius color;

#### Linear Gradients
W3C đã thêm cách để tạo ra một linear gradient trong CSS3.
Cú pháp: background: linear-gradient(direction, color-stop1, color-stop2, ...);
> Ví dụ:   #grad { background: linear-gradient(to right, red , yellow); }

Có thể xác định hướng của gradient trên bằng đơn vị độ, bằng cách thay “to right” thành số cụ thể cho độ.
    
#### Radial Gradients
Radical gradient là gradient hình tròn hoặc elip. Thay vì gradient là một trục thẳng thì radical gradient có màu trộn từ điểm bắt đầu ra xung quanh theo mọi hướng.
Cú pháp: background: radial-gradient(shape size at position, start-color, ..., last-color);
    
> Ví dụ: #grad { background: radial-gradient(red, yellow, green); }
       
>  #grad { background: radial-gradient(circle, red, yellow, green); }

    
#### Multiple Background Images
    
Trong CSS3, không cần thêm một phần tử cho một hình nền. CSS3 cung cấp cho chúng ta khả năng thêm một hoặc nhiều hình ảnh nền cho bất kỳ phần tử nào kể cả pseudo-elements.

> background-image:
> url(firstImage.jpg),
> url(secondImage.gif),
> url(thirdImage.png);

Trên đây là một trong số những cập nhật của CSS3 còn có thêm nhiều cập nhật khác về CSS3 Transitions, media queries, multi-column layout, Web fonts, speech...