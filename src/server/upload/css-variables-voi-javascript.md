## Giới thiệu
Có 1 bài toán như này, bạn muốn trang web của bạn có format chữ, nền... màu da cam, nhưng vào dịp noel và Tết bạn muốn chúng thành màu đỏ chỉ với việc tao tác 1 vài nút tùy chỉnh trong admin. Chúng ta không thể nào css lại hoặc thêm class thêm css gì đó, mất thời gian và bất tiện nữa. Lúc này css variables sẽ đáp ứng vô cùng nhanh mà đơn giản.

## Lý thuyết
Hiểu đơn giản là thay vì set các thuộc tính css cố định cho element, ta sẽ dùng variables, hướng dẫn sử dụng thì rất dễ hiểu tại đây:

https://www.w3schools.com/css/css3_variables.asp

Cơ bản là lưu biến tại root và dùng biến để css

## Áp dụng
Quay lại bài toán ở phần giới thiệu, bây giờ mọi người đã nghĩ đến cách thay đổi biến tại root là text hay background... sử dụng css variables có thể thay đổi đồng loạt khi thay đổi root, vậy làm sao để tác động vào root? Hãy thử bài toán cụ thể với javascript để giải quyết: thiết kế phần điều chỉnh để thay đổi màu và cỡ chữ sử dụng css variables.

{@embed: https://codepen.io/dfly24s/pen/LYVbEMd}

Code khá dễ hiểu, các bạn chỉ cần chú ý để chọn màu thì dùng input type='color', còn để làm 1 thanh range cho font size thì dùng input type='range'. Trong js, input type='color' thì dùng event change, để thao tác ngay khi kéo range thì phải sử dụng event mousemove, dựa vào change và mousemove thì set lại root và variables sẽ tự động thay đổi theo, thật tiện lợi phải không nào :satisfied: