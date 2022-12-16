Trong thực tế khi làm việc, có những lúc bạn cần phải lưu trữ hoặc gửi dữ liệu thông qua internet. Trong bài viết này chúng ta sẽ tìm hiểu làm sao để chuyển đổi những dữ liệu này sang một dạng khác, giống như string hay một chuỗi byte. Qúa trình chuyển đổi đó gọi là **encoding** hay còn được biết như là **serialization**. 

Quá trình chuyển đổi ngược lại từ dữ liệu đã mã hoá về dữ liệu ban đầu được gọi là **decoding** hay còn gọi là **deserialization**.
Chúng ta sẽ tìm hiểu kĩ hơn nhé!

Thử tưởng tượng rằng bạn có thể hiện của một đối tượng, và muốn ghi chúng vào file. Bản thân thể hiện này thì không thể tự chuyển vào file được mà phải thông qua một dạng khác như chuỗi byte.

![](https://images.viblo.asia/539104f5-e0a5-4c01-b0d1-eb96ee4ada17.png)

Khi mà dữ liệu đã được mã hoá và ghi vào file, bạn có thể lấy lại được về dạng thể hiện như ban đầu bằng cách dùng như sau:

![](https://images.viblo.asia/5616c31e-c6cc-4a20-a861-b7cf16f46e16.png)

## Encodable and Decodable Protocols
Giao thức Encodable được sử dụng bởi các loại có thể được mã hóa sang biểu diễn khác. Nó khai báo như sau:
```
func encode(to: Encoder) throws
```
Tương tự giao thức Decodable được sử dụng bởi các loại có thể được giải mã. Được khai báo như sau:
```
init(from decoder: Decoder) throws
```
### What is Codable?
Codable là một phương thức chung khai báo cho việc encode và decode. Khai báo như sau:
```
typealias Codable = Encodable & Decodable
```
## Automatic Encoding and Decoding
Có nhiều loại trong Swift có thể mã hóa: Int, String, Date, Array và nhiều loại khác từ Standard Library và  Foundation framework. Nếu bạn muốn loại của mình có thể được mã hóa, cách đơn giản nhất để thực hiện là bằng cách tuân thủ Codable và đảm bảo tất cả các thuộc tính được lưu trữ của nó cũng có thể được mã hóa.

Ví dụ, giả sử bạn nói rằng bạn sở hữu một nhà máy sản xuất đồ chơi và bạn có cấu trúc này để lưu trữ dữ liệu nhân viên:
```
struct Employee {
    var name: String
    var id: Int
}
```
Tất cả những gì bạn cần làm để có thể mã hóa và giải mã loại này là tuân thủ giao thức Codable, như sau:
```
struct Employee: Codable {
    var name: String
    var id: Int
}
```
Wow, thật dễ dàng! Bạn đã có thể làm điều đó vì cả tên (String) và id (Int) đều có thể mã hóa được.

Điều này hoạt động tốt khi bạn chỉ sử dụng các loại đã Codable. Nhưng nếu loại của bạn bao gồm các loại tùy chỉnh khác như thuộc tính thì sao?
Ví dụ: nhìn vào cấu trúc Employee của bạn, giả sử rằng nó cũng có thuộc tính favorite như sau: 
```
struct Employee: Codable {
    var name: String
    var id: Int
    var favoriteToy: Toy
}

struct Toy: Codable {
    var name: String
}
```
Bằng cách cho Toy cũng kế thừa Codable, bạn cũng duy trì sự phù hợp chung với Codable cho Employee.

Tương tự như vậy, với các kiểu dữ liệu Array và Dictionary, chỉ cần đảm bảo các phần tử ở dưới dạng Codable là được.

### Encoding and Decoding Custom Types

Có một số biểu diễn bạn có thể mã hóa hoặc giải mã từ đó, chẳng hạn như XML hoặc  Property List.

Trong bài này, mình sẽ giới thiệu cách encode và decode bằng `JSONEncode` và `JSONDecode`.

JSON là viết tắt của  JavaScript Object Notation và là một trong những cách phổ biến nhất để tuần tự hóa dữ liệu. Nó có thể dễ dàng đọc được bởi con người và dễ dàng cho máy tính phân tích và tạo ra.

Ví dụ, nếu bạn đã mã hóa một thể hiện của kiểu Employee thành JSON, thì nó có thể trông giống như thế này:
```
{ "name": "John Appleseed", "id": 7 }
```
Bạn có thể dễ dàng hiểu được cá thể Employee trông như thế nào trước khi nó được tuần tự hóa thành JSON.

### JSONEncoder and JSONDecoder
Khi bạn có một loại Codable, bạn có thể sử dụng JSONEncoder để chuyển đổi loại của bạn thành Data có thể được ghi vào một tệp hoặc được gửi qua mạng. Giả sử bạn có ví dụ Employee này:
```
let toy1 = Toy(name: "Teddy Bear");
let employee1 = Employee(name: "John Appleseed", id: 7, favoriteToy: toy1)
```
Giả sử là sắp tới sinh nhật John và bạn muốn tặng anh ấy món đồ chơi yêu thích. Bạn cần gửi dữ liệu này đến bộ phận Quà tặng. Trước khi bạn có thể làm điều đó, bạn cần mã hóa nó như thế này:
```
let jsonEncoder = JSONEncoder()
let jsonData = try jsonEncoder.encode(employee1)
```
Chú ý rằng bạn cần sử dụng try vì encode có thể trả về lỗi và ném ra một error
Bạn có thể in jsonData ra để xem nó như nào
```
print(jsonData)
```
Kết quả in ra chỉ là số lượng byte của jsonData.Bởi vì jsonData chứa một đại diện không thể đọc được của employee1. Nếu bạn muốn tạo một phiên bản có thể đọc được của JSON này dưới dạng String, bạn có thể sử dụng trình khởi tạo String như sau:
```
let jsonString = String(data: jsonData, encoding: .utf8)
print(jsonString)
// {"name":"John Appleseed","id":7,"favoriteToy":{"name":"Teddy Bear"}}
```
Bây giờ bạn có thể gửi jsonData hoặc jsonString cho phòng Quà Tặng bằng một API cụ thể nào đó.
Nếu bạn muốn chuyển từ json data trở về dạng thể hiện của đối tượng như ban đầu, làm như sau:
```
let jsonDecoder = JSONDecoder()
let employee2 = try jsonDecoder.decode(Employee.self, from: jsonData)
```
Lưu ý bạn cần phải khai báo sẽ decode ra loại nào (như ở đây là loại Employee) bởi vì trình biên dịch sẽ không thể tự hiểu được.
### Renaming Properties With CodingKeys
 Có một trường hợp xảy ra, API thay đổi tham số truyền lên, không phải id nữa mà là employeeId. Vậy trường hợp này giải quyết sao?
 Thật may vì Swift đã hỗ trợ sẵn điều này cho chúng ta rồi.
 ### CodingKey Protocol, CodingKeys Enum
 Enum CodingKeys, phù hợp với giao thức CodingKey, cho phép bạn đổi tên các thuộc tính cụ thể trong trường hợp định dạng được tuần tự hóa không phù hợp với các yêu cầu của API.
 
 Thêm bảng liệt kê lồng nhau CodingKeys như thế này:
```
struct Employee: Codable {
  var name: String
  var id: Int
  var favoriteToy: Toy

  enum CodingKeys: String, CodingKey {
    case id = "employeeId"
    case name
    case favoriteToy
  }
}
```
Lưu ý như sau:
1. CodingKeys là một phép liệt kê lồng nhau trong kiểu của bạn.
2. Nó phải là 1 loại CodingKey
3. Các khoá phải là  kiểu String
4. Bạn phải bao gồm tất cả các thuộc tính trong bảng liệt kê, ngay cả khi bạn không có kế hoạch đổi tên chúng.
5. Theo mặc định, phép liệt kê này được tạo bởi trình biên dịch, nhưng khi bạn cần đổi tên một khóa, bạn cần phải tự thực hiện nó.

Bây giờ nếu bạn in JSON, bạn sẽ thấy rằng khóa id thuộc tính được lưu trữ đã thay đổi thành employeeId:
```
{ "employeeId": 7, "name": "John Appleseed", "favoriteToy": {"name":"Teddy Bear"}}
```

## Manual Encoding and Decoding
Trường hợp bạn cố gắng gửi dữ liệu đến bộ phận quà tặng và một lần nữa dữ liệu bị từ chối.
Lần này, họ tuyên bố rằng thông tin về món quà bạn muốn gửi cho nhân viên không nên nằm trong một loại lồng nhau, mà là một thuộc được gọi là gift. Lúc này JSON có dạng như sau:
```
{ "employeeId": 7, "name": "John Appleseed", "gift": "Teddy Bear" }
```
Trong trường hợp này, bạn không thể sử dụng CodingKeys, vì bạn cần thay đổi cấu trúc của JSON và không chỉ đổi tên các thuộc tính. Bạn cần phải viết mã hóa và giải mã logic của riêng bạn.
### The encode Function
Như đã đề cập trước đó trong hướng dẫn, Codable thực sự chỉ là một kiểu dành cho các giao thức Encodable và Decodable. Bạn cần triển khai encode(to: Encoder) và mô tả cách mã hóa từng thuộc tính.

Nghe có vẻ phức tạp, nhưng nó khá đơn giản. Đầu tiên, cập nhật CodingKeys để sử dụng gift chính thay vì favoriteToy:
```
enum CodingKeys: String, CodingKey {
  case id = "employeeId"
  case name
  case gift
}
```
Sau đó, bạn cần xóa sự kế thừa của Employee từ Codable và sau đó thêm extension này:
```
extension Employee: Encodable {
  func encode(to encoder: Encoder) throws {
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(name, forKey: .name)
    try container.encode(id, forKey: .id)
    try container.encode(favoriteToy.name, forKey: .gift)
  }
}
```
Đầu tiên bạn lấy lại container của bộ encoder. Đây là chế độ xem vào bộ lưu trữ của bộ encoder mà bạn có thể truy cập bằng các key.
Lưu ý cách bạn chọn thuộc tính để mã hóa cho khóa nào. Điều quan trọng là bạn ép thuộc tính name của favoriteToy cho key gift.
Tuy nhiên nếu chỉ thay đổi như trên thôi thì bạn sẽ nhận được cảnh báo như sau:
```
'Employee' does not conform to expected type 'Decodable'
```
Điều này là do bạn đã loại bỏ sự phù hợp với Codable và chỉ thêm sự phù hợp vào Encodable. Bây giờ bạn có thể nhận xét mã giải mã jsonString cho employee2.
Kết quả mình nhận được như sau:
```
{"name":"John Appleseed","gift":"Teddy Bear","employeeId":7}
```
### The decode Function
Khi dữ liệu đến bộ phận Quà tặng, họ cần có thể chuyển đổi JSON này trở lại một thể hiện trong hệ thống của họ. Đối với điều này, họ sẽ cần một bộ giải mã.
Thêm mã sau vào để làm cho Employee phù hợp với Decodable (và do đó cũng có thể Codable):
```
extension Employee: Decodable {
  init(from decoder: Decoder) throws {
    let values = try decoder.container(keyedBy: CodingKeys.self)
    name = try values.decode(String.self, forKey: .name)
    id = try values.decode(Int.self, forKey: .id)
    let gift = try values.decode(String.self, forKey: .gift)
    favoriteToy = Toy(name: gift)
  }
}
```
Ở đây, bạn có thể thực hiện ngược lại với những gì bạn đã làm trong phương thức mã hóa bằng cách sử dụng bộ lưu trữ lưu trữ khóa mã hóa.
## Tài liệu tham khảo
https://www.raywenderlich.com/382-encoding-decoding-and-serialization-in-swift-4