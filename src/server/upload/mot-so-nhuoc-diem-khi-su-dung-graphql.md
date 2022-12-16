GraphQL là một thư viện mới và rất tuyệt vời, nó đảm bảo API của bạn không thừa thay thiếu dữ liệu so với cần thiết.
Tuy nhiên nó là một thư viện mới phát triển và rõ ràng sau khi ra mắt không được cộng đồng hào hứng. Vậy điều gì khiến mục tiêu hay ho như trên không thể thay thế được RESTful? Mình đã sử dụng nó thay thế RESTful trong dự án và sau đây là những lý do bạn không nên chọn giải pháp này để thay thế hoàn toàn.

Mình sẽ chỉ nói đến cách làm đúng lý thuyết mà GraphQL nêu ra, tức là hoàn toàn không sử dụng phương thức thao tác dữ liệu khác.

### Vấn đề hiệu suất của request
Mô hình GraphQL như tên của nó, là một cách truy vấn dữ liệu cho API, linh hoạt khi nhận trả về những gì người gọi đã yêu cầu, không thừa, không thiếu. 
Mọi thứ đều ổn đối với những đối tượng là một dòng data được xác định bằng primary key hoặc các điều kiện where. Nhưng đối với những truy vấn phức tạp "Trả về tất cả thông tin Địa chỉ của những khách hàng đã mua sản phẩm của shop XYZ"

```
owner(id: '1111') {
  id
  name
  item {
    id
    title
    order {
      order_id
      date
      user {
        id
        city
      }
    }
  }
}
```

Nó đang phụ thuộc hoàn toàn vào liên kết dữ liệu và khả năng xử lý trong CSDL, không thể tùy biến để tối ưu truy vấn này. Mọi công việc lớn đang được đẩy sang phía CSDL, nếu thiết kế không tốt hoặc đó là một CSDL có tuổi đời lớn, độ quan trọng cao, vì vậy không thể phụ thuộc vào CSDL như vậy. Với RESTful, chúng ta có thể tùy ý xử lý để các Servive có thể tiết kiệm tài nguyên cho CSDL.

### RESTful đa dụng hơn
Thế mạnh của GraphQL chính là việc tinh gọn dữ liệu trả về, tự động sắp xếp dữ liệu trả về. Vậy RESTful có làm được như vậy không ?
Thực tế đây là vấn đề thiết kế luồng xử lý, không thể phủ nhận rằng dự án càng lớn, càng có nhiều đóng góp của mọi người, mỗi người lại một tư tưởng khác nhau. Tuy nhiên trong môi trường lý tưởng, mọi người đều chung một tư tưởng, team có thể tự thiết kế "GraphQL" linh động cho riêng mình.

Hoặc nhanh hơn, chúng ta có thể thêm một thư viện [JSON schemas](http://json-schema.org/). Bạn muốn sử dụng truy vấn dữ liệu thay vì truyền nhiều param, hãy thử [OData](https://www.odata.org/). 
Bạn đã có tính năng giống với GraphQL, tự chủ hơn trong việc điều chỉnh những dữ liệu phức tạp. Mình nghĩ sẽ có khá nhiều người ủng hộ sự thống nhất thiết kế mới thay vì học cả một cấu trúc mới.

### Sự phức tạp của GraphQL
Ngược lại với ví dụ ban đầu, đối với ứng dụng nhỏ nếu bạn sử dụng GraphQL, đó thật sự là quyết định cồng kềnh hơn và không thể "Go fast!"
GraphQL cần đến các thành phần đủ để hoạt động:
* Types
* Queries
* Mutators
* Resolvers

![](https://images.viblo.asia/15693eeb-c2d2-485b-b638-4cd1a113e331.png)
Việc đọc 1 file schema toàn là chữ và không có Format, nó rất khó để phát hiện lỗi. Nhất là lỗi chính tả của trường tùy chỉnh, source code sẽ vẫn chạy bình thường nhưng sẽ không có dữ liệu trả về hay báo lỗi. Nếu sử dụng kèm thư viện Apollo, nó có thể phân tích lỗi dễ hơn, chẳng phải trả về model error và HTTP code như RESTful sẽ rõ ràng hơn sao.

Và tính năng tệ nhất là upload file, GraphQL không hỗ trợ việc này. Bạn phải Base64 encode/decode hoặc sử dụng thêm plugin [apollo-upload-server](https://github.com/jaydenseric/apollo-upload-server).

### Tốc độ
Với cấu trúc cần được định rõ và gắn chặt với liên kết trong Database, bạn sẽ cần một thời gian kha khá để thiết kế toàn bộ (hoặc phần chính cần và đủ) để có thể dựng lên những Queries, Mutators.
Với RESTful chỉ cần 1 bảng dữ liệu và câu truy vấn SQL đã có thể bắt đầu dự án rồi.

Trên đây là một số cảm nhận của mình khi thử sử dụng GraphQL, nếu các bạn có ý kiến khác hãy góp ý giúp mình nhé. Cảm ơn ạ :sweat_smile: