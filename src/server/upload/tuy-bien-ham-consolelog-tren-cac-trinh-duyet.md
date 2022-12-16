Đối với những lập trình viên JS hẳn đã quá quen thuộc với hàm console.log(), đã bao giờ các bạn nghĩ đến việc style lại giá trị output của hàm này chưa (in ra thông báo lỗi màu đỏ , hay cảnh báo màu vàng ...).

Dĩ nhiên là việc đó hoàn toàn khả thi, bạn không những có thể thay đổi màu sắc thậm chỉ cả text size, background color ... bằng cách thêm các thuộc tính CSS vào bên trong hàm console.log()

Cú Pháp:
`console.log("%cString1 %cString2","CSS For String1", "CSS For String2");`

## Font Family 
`console.log("%c This Is Line One ", "font-family: Times New Roman,Times, serif");`
 
## Font Size
`console.log("%cThis Is Line One ", "font-size:30px");`

## Font Style
`console.log("%cThis Is Line One ", "font-style: italic");`
 
## Font Weight
`console.log("%cThis Is Line One ", "font-weight: bold");`

## Font Variant
`console.log("%cThis Is Line One ", "font-variant: small-caps");`

## Text Decoration
`console.log("%cThis is Overline %cThis is line through %c This is underline", "color: red; text-decoration: overline", "color: blue; text-decoration: line-through", "color:green; text-decoration: underline");`

## Text Transform
`console.log("%cuppercase %cLOWERCASE %cThis is capitalized", "color: red; text-transform: uppercase", "color: green; text-transform: lowercase", "color: blue; text-transform: capitalize");`

## Line Height
`console.log("%cThis Is Line One \n %c This Is Line Two \n %c This Is Line Three", "line-height: 0.8;", "line-height: 1.7;", "line-height: 3;");`

## Text Shadow
`console.log("%cThis Is Line One ", "text-shadow: 3px 2px red;");`

Các bạn hãy thử copy những câu lệnh trên và chạy ngay trên console của browser đang sử dụng. Hãy style lại những dòng output đơn điệu nhàm chán để tạo thêm cảm hứng trong công việc nhé!

[Nguồn](http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/)