Đầu tiên có thể chúng ta đã khá quen thuộc với REST servive. REST service có thể được gọi là một phương pháp để trao đổi dữ liệu đơn giản giữu Client và Server. Kỹ thuật giao tiếp dựa trên văn bản đơn giản (JSON, XML), dễ học, dễ gỡ lỗi hơn. Hiện nay có thể nói nó khá phổ biến và có khá nhiều công cụ như [Postman](https://www.getpostman.com/), [Insomnia](https://insomnia.rest/) ... cũng tồn tại để giúp các Developer phát triển các API dễ ràng hơn. Trong bài viết này chúng ta sẽ tìm hiểu về một kiểu trao đổi dữ liệu k phải là mới nữa nhưng nó có thể hữu ích là Protobuf.

# Google protocol buffer là gì ?
Protocol buffer còn được biết như protobuf  là language-neutral, platform-neutral của google phiên bản nội bộ được công bố vào năm 2001 và phiên bản công khai đầu tiên được giới thiệu vào năm 2008 ( [Repository](https://github.com/protocolbuffers/protobuf) ), về cơ bản nó được sủ dụng để [Serialized](https://en.wikipedia.org/wiki/Serialization) object, có vẻ nó khá giống XML hoặc JSON. Nó lưu trữ dữ liệu có cấu trúc có thể được Serialize hoặc [De-Serialized](https://en.wikipedia.org/wiki/Serialization) tự động bưởi nhiều ngôn ngữ khác nhau. 
Nó được thiết kế để trở thành language/platform neutral và có thể mở rộng. Hiện tại, protobuf có hỗ trợ cho C ++, C, Go, Java và Python. 

Protobuf là một open source dùng để encode dữ liệu có cấu trúc được phát triển tại google.  Nó rất hữu ích trong việc phát triển các chương trình để giao tiếp với nhau qua một wire hoặc để lưu trữ dữ liệu. Tất cả những gì bạn phải làm là chỉ định một thông báo cho từng cấu trúc dữ liệu mà bạn muốn Serialize  (theo định dạng giống như lớp Java) bằng cách sử dụng file đặc tả .proto.

Từ file .proto compiler của protobuf ( protoc ) tạo ra code thực hiện encode tự động và phân tích cú pháp dữ liệu protobuf với định dạng [Binary](https://en.wikipedia.org/wiki/Binary) hiệu quả, tùy thuộc vào từng ngôn ngữ nó sẽ tạo ra mã tương ứng . 


# Protobuf so sánh một số định dạng kiểu dữ liệu khác.
  Dưới đây chúng ta sẽ đề cập đến ưu và nhược điểm của Protocol buffer và một số kiểu khác.
 ### Protobuf
1. Dữ liệu rất dày đặc, đầu ra nhỏ.
2. Khó decode mà không biết schema, định dạng dữ liệu không rõ ràng và cần schema để biết rõ.
3. Xử lý rất nhanh, nhỏ hơn 3 - 10 lần so với XML hoặc JSON
4. không dành cho con người vì là Binary.
5. Tạo các code truy cập dữ liệu dễ sử dụng hơn theo chương trình.

 ### JSON
1.   Con người có thể có thể đọc và chỉnh sửa dễ dàng.
2.   Có thể phân tích cú pháp mà không cần biết schema.
3.   Các browser đều hỗ trợ rất tốt.
4.   Ít dài dòng hơn XML.

### XML
1.  Con người có thể có thể đọc và chỉnh sửa dễ dàng.
2.  Có thể phân tích cú pháp mà không cần biết schema.
3.  Tiêu chuẩn cho SOAP... 
4.  Hỗ trợ tốt các công cụ như xsd, xslt, sax, dom ...

Protobuf rất nhanh nhưng nhưng nhưng có những những tình huống chúng ta không nên sử dụng nó. Ví dụ như các tình huống dưới đây
1. Khi bạn cần hoặc muốn dữ liệu con người có thể đọc dễ dàng.
2. Dữ liệu từ Service được sử dụng trực tiếp bởi Browser.
3. Server của bạn viết bằng ngôn ngư khác như Javascript 
4. Gánh nặng hoạt động của việc vận hành một loại dịch vụ mạng khác là quá lớn
# Protobuf căn bản.
### Cách sử dụng.
Mỗi file .proto bắt đầu bằng một khai package , giúp ngăn chặn xung đột đặt tên giữa các Project khác nhau. Về cơ bản, bạn sẽ xác định cách bạn muốn dữ liệu của mình được cấu trúc, sử dụng một mesage format, trong file .proto. File này được sử dụng bởi protoc sẽ tạo ra một file được định nghĩa sẵn các phương thức để bạn có thể Serialize và Deserialize, theo ngôn ngữ mà bạn chỉ định (Java, Golang, Python, ... ) Bạn có thể xác định một loại message trong .proto như sau. Bạn có thể hiểu xem thêm ví dụ tại [developer google](https://developers.google.com/protocol-buffers/docs/proto).
    
``` protobuf
// Request message for creating a new customer
message CustomerRequest {
    int32 id = 1;  // Unique ID number for a Customer.
    string name = 2;
    string email = 3;
    string phone= 4;

    message Address {
        string street = 1;
        string city = 2;
        string state = 3;
        string zip = 4;
        bool isShippingAddress = 5;
    }

    repeated Address addresses = 5;
}

message CustomerResponse {
    int32 id = 1;
    bool success = 2;
}
message CustomerFilter {
    string keyword = 1;
}
```
    
  Mỗi loại message có một hoặc nhiều field được đánh số duy nhất Các loại message lồng nhau có tập hợp các trường được đánh số duy nhất của riêng chúng. Các loại giá trị có thể là Number, Boolean, String, Byte,cũng có thể là Collection và Enumeration. Ngoài ra, bạn có thể lồng các loại message khác, cho phép bạn cấu trúc dữ liệu theo thứ bậc theo cách tương tự như JSON cho phép bạn.

### Chỉ định Field type
Các Field óc thể được chỉ định là optional, required, hoặc repeated. Không cho phép các Field type ( enum, int32, float, string ... ).  Các Field type chỉ là gợi ý để bảo vệ về cách Serialize một giá trị Field và tạo định dạng được mã hóa Message của Message của bạn. Định dạng được mã hóa trông giống như một biểu diễn phẳng và nén của đối tượng của bạn. Bạn sẽ viết đặc tả này theo cùng một cách chính xác cho dù bạn đang sử dụng protobuf trong Python, Java hay C ++.
    
### Chỉ định Tag

Mỗi Field trong định nghĩa Message có một Tag được đánh số duy nhất. Các Tag này được sử dụng để xác định các Field của bạn ở định dạng Message binary và không nên thay đổi khi loại Message của bạn được sử dụng. Lưu ý rằng các Tag có giá trị trong phạm vi từ 1 đến 15 mất một byte để mã hóa, bao gồm số nhận dạng và Field type (bạn có thể tìm hiểu thêm về điều này trong Mã hóa Protobuf). Các thẻ trong phạm vi 16 đến 2047 mất hai byte. Vì vậy, bạn nên dành các thẻ từ 1 đến 15 cho các yếu tố thông báo xảy ra rất thường xuyên.


Số thẻ nhỏ nhất bạn có thể chỉ định là 1 và lớn nhất là 229 - 1 hoặc 536.870.911. Bạn cũng không thể sử dụng các số 19000 mặc dù 19999 vì chúng được dành riêng cho việc triển khai Protobuf - compiler sẽ khiếu nại nếu bạn sử dụng một trong những số dành riêng này trong .proto của nó. Tương tự, bạn không thể sử dụng bất kỳ Tag dành riêng trước đó.

### Chỉ định quy tắc Field

Bạn xác định các Message field là một trong những điều sau đây
1. **required**: Đối với các required field, giá trị ban đầu phải được cung cấp, nếu không field không được khởi tạo.
2. **optional**: Đối với các optional field, nếu không khởi tạo, thì giá trị mặc định sẽ được gán cho field, tất nhiên, bạn có thể chỉ định giá trị mặc định.
3. **repeated**: Field có thể được lặp lại bất kỳ số lần, trong một message được hình thành tốt. Thứ tự của các giá trị lặp lại sẽ được bảo tồn.
    
Lưu ý: các trường lặp lại của các kiểu scalar numeric không được mã hóa hiệu quả nhất có thể. Mã mới nên sử dụng tùy chọn đặc biệt [pack = true] để có được mã hóa hiệu quả hơn. như dưới đây 

`repeated int32 samples = 4 [packed=true];`

### Enumerations

Khi bạn xác định loại message, bạn có thể muốn một trong các field của nó chỉ có một trong danh sách giá trị được xác định trước.
```
enum Foo {
  FIRST_VALUE = 0;
  SECOND_VALUE = 1;
}
```
# Kết luận 
 Protocol Buffer cung cấp một số lợi thế hấp dẫn so với JSON, XML ... để gửi dữ liệu qua mạng giữa các internal service. Mặc dù không phải là sự thay thế hoàn toàn cho JSON, XML, đặc biệt là các dịch vụ được sử dụng trực tiếp bởi trình duyệt web,  Protocol Buffer cung cấp các lợi thế rất thực tế không chỉ ở các cách được nêu ở trên, mà còn về tốc độ mã hóa và giải mã, kích thước của dữ liệu trên dây, và nhiều hơn nữa.