**Giới thiệu cơ bản về Vue 2**

Chào mừng các bạn đã quay trở lại với series Từng Bước Học Vue 2. Hôm nay mình sẽ giới thiếu cách sử dụng Attribute và Class Binding

Cùng bắt đầu với 1 ví dụ đơn giản rồi mình sẽ giải thích thêm ở phần sau nhé.Okie giờ mình sẽ tạo 1 file index.html như sau
![](https://images.viblo.asia/c86bc159-9abe-4af3-886c-28d24f2bcbc9.png)


Và kết quả trả về ở trình duyệt sẽ là 1 button và khi hover vào sẽ ra title mà chúng ta đã xét
![](https://images.viblo.asia/c7808531-1524-4ba4-9497-b694786d7636.png)

Vue cung cấp cho chúng ta 1 class gọi là Binding. Và chúng ta sẽ thử sử dụng trong trường hợp này. Để sử dụng chúng ta sẽ đặt thêm `v-bind` trước attribue mà chúng ta mong muốn như sau:
![](https://images.viblo.asia/b3411727-c59e-4220-9fd6-7d824608ee24.png)

Lưu ý hãy thêm `el: '#root'` để cho Vue nhận biết phần nào cần nhận để xử lý nhé.
Và giờ refesh lại trình duyệt chúng ta sẽ thấy được kết quả mà mình tạo ra đã thay đổi
![](https://images.viblo.asia/5d26eea3-0a2e-484a-aa1c-5dd47d2f3b4a.png)

Giống như `v-on` có thể viết tắt thành `@,` `v-bind `cũng có thể viết tắt chỉ còn cần dấu `:`. Tiếp tục với 1 ví dụ khác vì class Binding không chỉ dừng lại như thế
Mình sẽ tạo thêm 1 thẻ `<h1>` và thêm className trong xử lý ở Vue như sau:
![](https://images.viblo.asia/e9b0bc3a-9644-4562-b015-11047a0ad94e.png)

Tiếp theo mình sẽ tạo thêm đoạn style cho className đã được khai báo và cả text kinh điển Hello World ở thẻ `h1`:
![](https://images.viblo.asia/e9b0bc3a-9644-4562-b015-11047a0ad94e.png)

Quay trở lại và refesh trình duyệt nào. Kết quả sẽ là chúng ta có đc 1 dòng chữ Hello World màu đỏ. Vậy là v-bind sẽ thay thế cho các attribute được sử dụng trong cái thẻ html
![](https://images.viblo.asia/4170ca6d-0ba2-4239-be58-f9cf206a526e.png)

Một ví dụ nữa để thấy được class Binding cho phép xử lý các expression ra sao nhé
Quay trở lại với button và chúng ta sẽ thêm `:class="{'is-loading' : true}"`
![](https://images.viblo.asia/8c5b18b1-c065-4042-bef5-1181e0389401.png)

Và kết quả ở trình duyệt sẽ là 
![](https://images.viblo.asia/b327662b-6173-48af-abdd-0034748ac57a.png)

Vậy nghĩa là v-bind cho chúng ta xử lý cả những điều kiện true, false để xử lý những màn hình yêu cầu phức tạp và thay đổi nhiều sẽ được xử lý nhanh gọn nhẹ và đỡ làm chúng ta rối răm thêm

Giờ hãy nâng cấp 1 chút ví dụ vừa xog. Mình sẽ thêm on click methods sẽ là toggleClass().
Đặt biến isLoading khi khởi tạo sẽ là false, và thêm methods vào đoạn xử lý Vue sẽ là this.isLoading = true. Đơn giản là khi chúng ta click vào button thì class mới sẽ được add vào
![](https://images.viblo.asia/d9f147db-1504-4a92-a060-997409340205.png)

Okie refesh nào
![](https://images.viblo.asia/c8ed7f1a-4067-4d3c-b4df-020334efaa20.png)

Click button
![](https://images.viblo.asia/a80ad59a-96f4-49b8-8ce1-a8828b3d5896.png)

Vậy là chúng ta đã hiểu rõ hơn về Attribute cũng như Class Binding trong Vue rồi chứ. Các bạn có thể tự thử làm cho mình 1 bài tập nho nhỏ, như khi click vào button Submit thì button sẽ được disabled đi để tránh trường hợp Submit lên nhiều lần để làm quen và hiểu hơn nhé !!!