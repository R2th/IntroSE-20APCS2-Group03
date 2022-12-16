# 1)  GraphQL là gì?
GraphQL là `Graph Query Language` do Facebook tạo ra từ năm 2012 cung cấp giao thức chung cho phép giao tiếp giữa client và server để cập nhật và lấy dữ liệu.

Client truy vấn đến máy chủ GraphQL bằng các truy vấn với đặc điểm: format của dữ liệu trả về được mô tả trong câu truy vấn và được định nghĩa ở phía client thay vì ở server. Nói đơn giản hơn, đây là truy vấn hướng client, cấu trúc dữ liệu không khô cứng 1 khuôn mẫu từ server (REST API) mà thay đổi theo từng ngữ cảnh sao cho hiệu quả nhất đối với client mà chỉ cần dùng duy nhất 1 endpoint.

![](https://images.viblo.asia/9bb9dadc-5084-4398-b59d-972dfd9becc3.png)
# 2) Tại sao lại có GraphQL
Bất kì công cụ nào sinh ra cũng đều để giải quyết một vấn đề, để hiểu được tại sao GraphGL được sinh ra thì trước tiên ta nên xem qua những vấn đề gặp phải khi sử dụng REST.
- Số lượng API endpoint quá nhiều, đôi lúc sẽ phải cầm cái id này chạy tới endpoint này kết quả, sau đó cầm tập id được response chạy tới endpoint khác để lấy cái thật sự cần. Như ở trên có giớt thiệu GraphQL chỉ sử dụng một endpoint duy nhất, như thế có thể khắc phục được vấn đề phụ thuộc vào quá nhiều endpoint của RESTful.
- Rất khó để define ra được một chuẩn chung của dữ liệu trả về, vì đôi lúc với một model, client có thể lúc thì cần fields này, lúc thì cần những fields khác.
- Khi mà đổi một cái gì đó, ví dụ schema, thì không biết những chỗ nào bị ảnh hưởng.
# 3) Lợi ích GraphQL
`GraphQL sinh ra và định nghĩa lại cách lấy thông tin từ Server về`.

Lấy Facebook làm ví dụ. Facebook phải quản lí vô số data source và API clients mà REST API lại lộ khuyết điểm thiếu linh hoạt do tính chất dựa trên tài nguyên cố định, dẫn đến trường hợp “nghẽn cổ chai” thường thấy. Chính vì vậy, thay vì có đến hàng tá “endpoint” dư thừa, Facebook đã nghĩ đến giải pháp chỉ dùng một “endpoint” thông minh với khả năng tiếp thu những Query phức tạp rồi đưa ra output data với loại type tùy theo yêu cầu của client. Nói đơn giản hơn, đây là truy vấn hướng client, cấu trúc dữ liệu không khô cứng 1 khuôn mẫu từ server (REST API) mà thay đổi theo từng ngữ cảnh sao cho hiệu quả nhất đối với client. Ngoài ra, GraphQL hoàn toàn có thể create, update, delete, nhưng với cấu trúc sáng sủa và cấu trúc phân tầng nên lại càng thuận lợi cho lập trình viên phía client.

Trở lại với GraphQL, việc giảm nhẹ tài nguyên cho hệ thống là dối trá  (tạm thời là vậy), nó có thế ưu điểm hơn so với Restful trong một số trường hợp, số còn lại thì không . Tuy nhiên, tới với GraphQL bạn sẽ nhận được một cấu trúc giao tiếp với API trong sáng hơn, ngôn tình hơn . Hơn thế nữa, nó còn có hơi hướng OOP, Graph, miêu tả các đối tượng dữ liệu như những thức thể sống chứ không giống kiểu như lấy từ table xong quăng thẳng vào mặt Client như Restful đang làm .

Chính việc này khiến cho GraphQL kết hợp cực kì, cực kì tốt với ứng dụng phía Client.

Nó hỗ trợ cho bên frontend biết rằng trong response có nhưng field gì để mà còn lọc ra.
Ngoài ra với ứng dụng ngày càng phức tạp, truy vấn theo nhiều lớp thì GraphQL sẽ thể hiện rõ ràng hơn ưu điểm của mình qua phương pháp duyệt cây. Mỗi node chỉ cần duyệt qua một lần là có thể sử dụng ở mọi nơi rồi.

# 4) Cấu trúc GraphQL
GraphQL sẽ chia thành 2 phần chính

- `Query`: Các câu lệnh lấy dữ liệu (tương tự method GET trong RestFul API)
- `Mutation`: Các câu lệnh để thêm/sửa dữ liệu (tuơng tự method POST/PUT/DELETE trong RESTful API)

Ngoài 2 thành phần chính trên GraphQL còn một chức năng đặc biệt là `Subscription`, với chức năng này client nói với server rằng “này khi nào có thêm dữ liệu mới mới thì báo cho mình biết nhé “. Vậy là client đang lắng nghe server với sự kiện thêm mới dữ liệu, do đó, mỗi khi dữ liệu mới được thêm vào thì Server sẽ gửi Data cho Client. Bá đạo chưa, Restful làm gì có chức năng như vầy đúng không các bác. Tuy nhiên chức năng này mới chỉ đang thai nghén, và chưa được hỗ trợ chính thức .

# Kết
GraphQL hiện giờ cũng đang là một giải pháp được sử dụng khá rộng rãi, và có khá nhiều bài viết trên Viblo đã viết rất chi tiết. Bài viết mình tổng hợp từ nhiều nguồn và cũng để củng cố thêm kiến thức cho bản thân. Rất vui và cảm ơn nếu bạn đã đọc đến đây.