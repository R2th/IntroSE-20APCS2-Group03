## 1. Giới thiệu
Chúng ta chắc chắn là không lạ gì với input file ![](https://images.viblo.asia/87ba0dd8-b41f-4a2b-a63f-d543bfd8e140.png) mọi chuyện vẫn sẽ ổn nếu 1 ngày design muốn bạn làm nó đẹp hơn, có thể preview và xoá ảnh, ví dụ như này

![](https://images.viblo.asia/c5f3d227-a6e1-4b1a-a1e3-e2cce3278648.png)
hãy thử tìm hiểu trước nhé

## 2. Lý thuyết
### 2.1. Ý tưởng
Chúng ta sẽ thay thế ô input file mặc định bằng thứ giống cái nút Upload như hình trên. Kiểm tra đuôi file xem có phải định dạnh ảnh khi upload không, chọn rồi thì lặp value lấy ra đường dẫn và tên ảnh, lúc này nút Clear all mới show ra, để xoá toàn bộ ảnh và value input
### 2.2. Html, css
Các bạn có thể search cách custom hiển thị input upload dễ dàng bằng những tứ khoá dạng "custom input file css", sẽ có vô vàn hướng dẫn, css đẹp và hiệu ứng thú vị, ở đây mình chỉ làm cách đơn giản để hiểu bản chất: chúng ta sẽ ẩn ô input mặc định đi, thay thế bằng 1 nút hay ảnh upload gì đó tuỳ bạn css, và làm sao để khi click vào cái nút mới đó thì cũng đồng nghĩa với việc click vào input file. Để làm việc này chúng ta sẽ dùng label for, input file các bạn để id và thuộc tính for của label trùng với id input là được. 
Html css cụ thể thì các bạn tự xem code trong link cuối bài nhé.
### 2.3. Js
Để hiển thị ảnh thì chúng ta sẽ lấy đường dẫn ảo tới ảnh, cho vào thẻ img hoặc dùng background-image để css cho dễ tuỳ các bạn. Để đọc được thì ta dùng FileReader có sẵn của Jquery.
Code các bạn cũng tự xem nhé, nó khá dễ hiểu và cũng không có nhiều để giải thích, chỉ lưu ý là khi upload không phải định dạng ảnh, alert ra thông báo lỗi thì value vẫn được thêm vào, nên phải reset value khi lỗi, và cả khi Clear all ảnh.

## 3. Kết luận
Thành quả:
{@embed: https://codepen.io/dfly25e/pen/mdbjRLv?editors=0110}

Hãy sáng tạo thêm cho đẹp nhé! :clap: Có gì sai mong mọi người góp ý để tính năng được hoàn thiện! :pray: