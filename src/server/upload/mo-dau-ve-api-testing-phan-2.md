Như đã đề cập ở phần trước, link bài viết:
https://viblo.asia/p/mo-dau-ve-api-testing-Do754doe5M6

Các method mà client gửi lên server, status code mà server trả về, vậy ngoài status code thì nó còn có dữ liệu trả về, vậy dữ liệu đó là gì? Và nó chứa những gì trong đó? 
Trong lập trình ứng dụng web, các API sẽ trả kết quả về dạng XML hoặc JSON để các hệ thống khác có thể nói nói chuyện với nhau được. 

Hiện nay tuy JSON được sử dụng phổ biến hơn, nhưng XML cũng vẫn đang được dùng bởi nhiều hệ thống lớn.

**I. JSON**

**JSON** là viết tắt của **JavaScript Object Notation**, là một kiểu định dạng dữ liệu tuân theo một quy luật nhất định mà hầu hết các ngôn ngữ lập trình hiện nay đều có thể đọc được. JSON là một tiêu chuẩn mở để trao đổi dữ liệu trên web.

JSON là 1 định dạng đơn giản với 2 thành phần: **keys và values**.
-  Key thể hiện thuộc tính của Object
-  Value thể hiện giá trị của từng Key

![](https://images.viblo.asia/a8eaf174-de5a-4d43-bd4c-4d5b368b5cc7.png)

Trong ví dụ trên, keys nằm bên trái, values nằm bên phải.

![](https://images.viblo.asia/43510efa-2304-4f25-9697-b51080a02f73.jpg)

Có nhiều trường hợp, 1 Key sẽ có Value là 1 dãy key + value. Trong hình trên Key có tên là Data có Value là 2 cặp Key + value.

**II. XML**

**XML** là từ viết tắt của từ **Extensible Markup Language** nghĩa là ngôn ngữ đánh dấu mở rộng. XML có chức năng truyền dữ liệu và mô tả nhiều loại dữ liệu khác nhau. 

Tác dụng chính của XML là **đơn giản hóa việc chia sẻ dữ liệu** giữa các nền tảng và các hệ thống được kết nối thông qua mạng Internet.

**Trong JSON dùng { } và [] để dánh dấu dữ liệu. XML thì tương tự như HMTL, dùng thẻ  <> để đánh dấu và được gọi là nodes.**

Lấy luôn ví dụ ở trên nhưng viết bằng xml, nó sẽ như thế này:

![](https://images.viblo.asia/bb5d983e-f890-4869-acd7-1b149c124be7.jpg)



![](https://images.viblo.asia/4995098b-9986-4857-92a7-743593088c8c.jpg)


**III. Định dạng dữ liệu trong HTTP**


Quay lại bài 1, phần header có chức năng lưu những thông tin mà người dùng không biết, trong đó có 1 thành phần xác định format của data: Content-Type

Khi client gửi Content-Type trong header của request, nó đang nói với server rằng dữ liệu trong phần body của request là được định dạng theo kiểu đó. 

Khi client muốn gửi JSON nó sẽ đặt Content-Type là “application/json”. Khi bắt đầu nhận request, server sẽ check cái Content-Type đầu tiên và như thế nó biết cách đọc dữ liệu trong body. 

Ngược lại, khi server gửi lại client 1 response, nó cũng gửi lại Content-Type để cho client biết cách đọc body của response.


![](https://images.viblo.asia/d7ed4cd8-b3c8-476f-9c67-420cc49c6692.gif)


Đôi khi client chỉ đọc được 1 loại định dạng, ví dụ là JSON mà server lại trả về XML thì client sẽ bị lỗi. 

Vì vậy, một thành phần khác ở trong header là Accept sẽ giúp client xử lý vấn đề trên bằng cách nói luôn với server loại nó có thể đọc được. Ví dụ : Accept : “application/json” . 

Chốt lại: 

Dựa vào 2 thành phần **Content-Type** và **Accept**, client và server có thể hiểu và làm việc một cách chính xác. Ở những bài sau, sẽ lấy ví dụ  và minh họa rõ ràng cho Content-Type và Accept trong Header.

Hẹn gặp lại trong những bài viết tiếp theo ^^.