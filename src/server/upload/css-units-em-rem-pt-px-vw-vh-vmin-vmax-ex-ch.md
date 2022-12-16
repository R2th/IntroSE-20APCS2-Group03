## Introduction
CSS có nhiều đơn vị đo, phổ biến nhất là pixels, nhưng bên cạnh đó còn khá nhiều đơn vị đo khác tuy không được biết đến nhiều nhưng đôi khi chúng rất hữu dụng trong vài trường hợp cụ thể.

Trong bài viết này đề cập đến **relative units**, **absolute units** và **viewport units**

| Media | Recommended | Occasional use | Infrequent use  | Not recommended  | 
| -------- | -------- | -------- | -------- | -------- | -------- |
| Screen  | em, rem, %   | px     | ch, ex, vw, vh, vmin, vmax     | cm, mm, in, pt, pc     |
| Print  | em, rem, %   | cm, mm, in, pt, pc     | ch, ex     | px, vw, vh, vmin, vmax  |

## Relative Units
**Relative units** là loại đơn vị sẽ có giá trị tương đối so với độ dài của thuộc tính.

Ngược lại với **Absolute units** như `pixels`, `points` hay `centimeters`, chúng ta có thể xác định kích thước theo **relative units** như `%`, `em` hoặc `rem`.

Đối với hầu hết các trình duyệt, font-size mặc định sẽ là `16px`, ta có thể lấy giá trị này làm giá trị chuẩn để tính toán (vd: `16px` tương đương với `1em`, `1rem` hoặc `100%`)

| Unit | Description |
| - | - |
| %   | Có giá trị tương đối so với phần tử cha |
| em   | Tương đối so với  font-size của phần tử cha (vd `2.5em` tức là  font sẽ lớn hơn normal font 2.5 lần)   |
| rem   |Tương đối so với phần tử gốc. Phần tử gốc ở đây là thẻ html  |
| ch   | Tương đối so với width của phần tử "0" |
| ex   | Tương đối so với x-height của font hiện tại   |

![](https://images.viblo.asia/9b22883f-5b48-47f3-a01e-08a08fd1e9bd.png)

## Absolute Units
**Absolute units** là loại đơn vị có giá trị không thay đổi theo kích thước màn hình, hướng và các biến thể khác, tuy nhiên chỉ chính xác tuyệt đối khi output có độ phân giải đủ cao. 

**Absolute units** sẽ cần thiết trong các trường hợp yêu cầu kích thước phần tử phải chính xác 100% và không được thay đổi. Chúng cũng khá hữu dụng nếu ta muốn cố định một khoảng nào đó để tránh các trường hợp khoảng đó trở nên quá rộng hoặc quá hẹp.

| Unit | Description |  |
| -------- | -------- | -------- |
| cm     | centimeters     | 1 cm = 1 cm     |
| mm     | millimeters     | 10 mm = 1 cm     |
|in|	inches|	1 in = 96px = 2.54 cm|
|px|	pixels	|1 px = 1/96th of 1 in
|pt|	points	|1 pt = 1/72 of 1 in
|pc|	pica|	1pc = 12 pt

![](https://images.viblo.asia/96caac3e-d7d3-458a-b3aa-7bbec94b5dc3.png)

## Viewport Units

Các **Viewport Units** đại diện cho một tỉ lệ % của khung nhìn (viewport) của trình duyệt hiện tại.

Sự khác biệt so với **Percentage units** là các **Viewport units** luôn luôn được tính bằng tỉ lệ phần trăm kích thước viewport của trình duyệt, trong khi đó **Percentage units** lại kế thừa kích thước của các phần tử cha của chúng.


| Unit | Description |
| -------- | -------- | -------- |
|vw|	1% chiều rộng của viewport
|vh|	1% chiều cao của viewport 
|vmin|	1vw hoặc 1vh, tùy theo số nào nhỏ hơn
|vmax|	1vw hoặc 1vh, tùy theo số nào lớn hơn

![](https://images.viblo.asia/c9da1f8e-7628-4490-8b80-545431b0f841.png)

## Browser Support

Các đơn vị đo được hỗ trợ trong từng phiên bản của trình duyệt, trích từ w3school:

![](https://images.viblo.asia/1497afde-8aae-44e8-a90f-1899a7b4e762.png)

## Summary

Bài viết nhằm tóm tắt về các đơn vị đo  (units) trong CSS và ý nghĩa cũng như đặc điểm của từng unit. Bài viết không tránh khỏi các thiếu sót, cảm ơn các bạn đã dành thời gian đọc bài viết.

Nguồn:
* https://www.w3schools.com/cssref/css_units.asp
* https://dev.to/fullstack_to/units-in-css-em-rem-pt-px-vw-vh-vmin-vmax-ex-ch-53l0