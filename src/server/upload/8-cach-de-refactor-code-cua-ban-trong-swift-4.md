* Swift là một trong những ngôn ngữ phát triển nhất trong lịch sử, bởi sự thanh lịch, đơn giản và thiết kế an toàn. Trên thực tế, câu thần chú chính thức của Swift là "***thực hiện các chương trình đơn giản một cách dễ dàng và cả những khó khăn có thể xảy ra***". Trong bài này, bạn sẽ tìm hiểu cách sử dụng Swift một cách tối đa bằng cách refactor đoạn code của mình.
* Mặc dù rất nhiều đoạn mã tối ưu là ngầm định và vốn có trong thiết kế ngôn ngữ, nhưng có một số cách để refactor giúp cho đoạn code của bạn dẽ đọc, đáng tin cậy và hiệu năng tốt hơn. Trong bài này bạn sẽ học 8 cách refactor code của bạn trong Swift 4
# Mục tiêu của bài viết
Trong bài viết này, bạn sẽ học một số cách để tối ưu hơn và tái cấu trúc lại code của bạn trong Swift 4. Chúng ta sẽ khám phá những phần sau: 

1. Xử lý duplicate keys trong dictionaries cùng với zip
2. Thiết lập giá trị mặc định cho dictionaries
3. Merge các dictionaries vào làm một 
4. Lọc (filter) dữ liệu giá trị dictionary trực tiếp vào trong đối tượng dictionary khác
5. Sử dụng Codable để lưu trữ các đối tượng tuỳ biến trong JSON
6. Hoán đổi giá trị trong mảng có thể thay đổi
7. Xử lý chuỗi ký tự nhiều dòng (multiple literals)
8. Tìm phần tử ngẫu nhiên trong collection

### 1. Duplicate keys trong Dictionaries
Điều đầu tiên, Swift 4 đã nâng cao thêm cho các dictionary cùng với cách hiện đại để xử lý các duplicate keys sử dụng hàm generic ***zip***. `zip` làm việc nhiều hơn chỉ dictionary và trên thực tế, nó sẽ cho phép bạn xây dựng sequence type riêng từ hai collections cơ bản phù hợp với Sequence

Ví dụ bạn có một mảng cùng với các giá trị sau, lưu ý là 2 phần tử chứa cùng một keys:
```
let locations = [ "Springfield", "Chicago", "Springfield", "Jackson"]
var dictionary: Dictionary<String, String>
```
Bằng cách sử dụng `zip`, bạn có thể tạo ra một chuỗi các cặp duy nhất:
```
let locations = [ "Springfield", "Chicago", "Springfield", "Jackson"]
var dictionary = Dictionary(zip(locations, repeatElement(1, count: locations.count)), uniquingKeysWith: +)
print(dictionary) // ["Jackson": 1, "Chicago": 1, "Springfield": 2]
```
Phần tử `uniquingKeysWith` trong code bên trên cho phép bạn tạo ra một giá trị duy nhất thông qua sử dụng toán tử toán học. Trong trường hợp này, chúng ta sử dụng `+` để tăng giá trị mỗi khi một bản sao (duplicate) là được tìm thấy. Dĩ nhiên bạn vẫn có thể quyết định sử dụng logic toán học tuỳ chỉnh của riêng bạn
###  2. Giá trị mặc định của Dictionaries
Một tính năng mạnh mẽ khác của Swift 4 là khả năng thiết lập giá trị mặc định cho dictionaries, sử dụng subscrips mới được thêm vào. Theo như code bên dưới, khi bạn truy cập giá trị của key trong dictionary, giá trị trả về là một giá trị `optional`, giá trị này sẽ là `nil` nếu như key không tồn tại:
```
let locationsAndPopulations = [ "Springfield": 115715, "Chicago": 2705000, "Aurora": 201110]
print(locationsAndPopulations["Springfield"]) //value is optional
print(locationsAndPopulations["New York"]) //this key doesn't exist, returns nil
```
Thông thường bạn nên xử lý trường hợp `nil` của giá trị optional, nhưng Swift 4 làm nó thuận tiện hơn rất nhiều cho bạn, thông qua một subscript mới sẽ cho phép bạn thêm giá trị tham số mặc định, hơn là việc bạn phải force từ `guard` hoặc unwrap biến optional
```
print(locationsAndPopulations["New York", default: 0])
```
Trường hợp này, chúng ta không có một giá trị cho New York trong mảng khởi tạo, nó sẽ trả về một tham số mặc định là 0. Bạn cũng có thể đưa vào một giá trị động (dynamic) trái ngược với một giá trị tĩnh (static) nếu bạn cần, điều này chắc chắn tạo ra một subscrip mạnh mẽ hơn rất nhiều.
### 3. Merging Dictionaries
Swift 4 cũng có thể dễ dàng merge 2 dictionary vào làm một thông qua việc sử dụng `merge(_:uniquingKeysWith:)`. Theo như ví dụ sau, chúng ta merge dictionary thứ 2 và dictinary 1, và thông qua việc sử dụng tham số mới được học `uniquingKeysWith`, chúng ta có thể đảm bảo bất cứ bản sao nào cũng được xử lý khi chúng xuất hiện:
```
var locationsAndPopulationsIL = [ “Springfield”: 115715, “Chicago”: 2705000, “Aurora”: 201110]
let location2 = [ “Rockford”: 152871, “Naperville”: 141853, “Champaign”: 81055]
locationsAndPopulationsIL.merge(location2, uniquingKeysWith: +)
print(locationsAndPopulationsIL)
```
Trong trường hợp không có tính năng này, bạn sẽ phải duyệt thủ công tất cả các giá trị của dictionary và thực hiện logic tuỳ chỉnh trong việc hợp nhất (merge) 2 từ điển thành một
### 4. Lọc (filter) dữ liệu giá trị dictionary trực tiếp vào trong đối tượng dictionary khác
Ngoài việc hợp nhất 2 dictionary, bạn cũng có thể tự động lọc một dictionary với các kết quả được chuyển ngược lại vào một dictionary khác cùng loại. Trong đoạn code bên dưới, chúng tôi lọc vị trí của dictionary theo một giá trị cụ thể, được trả về dưới dạng dictionary:
```
let locationsAndPopulationsIL = [ "Springfield": 115715, "Chicago": 2705000, "Aurora": 201110]
let filteredmillionPlusPopulation = locationsAndPopulationsIL.filter{ $0.value > 1000000 }
print(filteredmillionPlusPopulation)  //["Chicago": 2705000]
```
Vì vậy, ngoài việc filter đơn giản, bạn cũng có thể sử dụng closure filter cung cấp các bộ filter tuỳ chỉnh để có kết quả của một dictionary mới
### 5. Lưu trữ các đối tượng tuỳ biến trong JSON
Nếu bạn đã từng tuần tự hoá (serialize)  và giải tuần tự (deserialized)  dữ liệu trước đó, thì nó có thể khả liên quan, phải phân lớp (subclass) các class với `NSObject`, cũng như cài đặt `NSCoding`. Với Swift 4, bạn có thể tuần tự hóa các lớp của mình một cách hiệu quả hơn thông qua việc sử dụng `Codable`. Điều này đặc biệt hữu ích khi bạn muốn duy trì bằng cách tuần tự hóa một đối tượng tùy chỉnh của bạn thành đối tượng JSON, để chuyển sang API hoặc thậm chí để lưu trữ cục bộ bằng `UserDefaults`:
```
// a class to serialize
class Location: Codable{
    var name: String
    var population: Int
     
    init(name: String, population: Int){
        self.name = name
        self.population = population
    }
}
 
//create an instance
let chicago = Location(name: "chicago", population: 2705000)
 
//serialize to JSON
let jsonData = try? JSONEncoder().encode(chicago)
 
//deserialize and output
if let data = jsonData{
    let jsonString = String(data: data, encoding: .utf8)
    print(jsonString!) //{"name":"chicago","population":2705000}
 
}
```
Như bạn có thể thấy, bằng cách thiết lập class hoặc struct của bạn bằng `Codable`, bạn có thể dễ dàng tuần tự hoá dữ liệu của bạn to JSON, sử dụng dữ liệu ở bất cứ đâu, hoặc giải tuần tự trở lại.
### 6. Hoán đổi giá trị trong mảng có thể thay đổi
Chuyển sang mảng, một tính năng đáng được chào đón khác trong Swift 4 là khả năng hoán đổi hai giá trị trực tiếp trong mảng mutable, bằng cách sử `swapAt(_:_:)`. Điều này rất hữu ích cho thuật toán sắp xếp (sort), và rất dễ sử dụng:
```
var locations = [ "Springfield", "Chicago", "Champaign", "Aurora"]
locations.swapAt(0, 2)
print(locations) //["Champaign", "Chicago", "Springfield", "Aurora"]
```
Trước đây, bạn sẽ phải sử dụng các biến tạm thời để trao đổi giữa hai vị trí phần tử, nhưng với phương pháp này, bạn có thể sắp xếp chính xác hơn các mảng của mình.
### 7. Xử lý chuỗi ký tự nhiều dòng (multiple literals)
Một bổ sung thú vị khác cho Swift 4 là khả năng lưu trữ chuỗi ký tự nhiều dòng trong các giá trị của bạn, giúp việc chia nhỏ nội dung của bạn trở nên dễ hiểu hơn. Thông qua việc sử dụng ký hiệu `"""` để mở và đóng khối văn bản, bạn có thể tạo nội dung nhiều dòng và thậm chí các biến động tham chiếu, như được hiển thị bên dưới khi chúng tôi tự động thêm một ngày.
```
let illinoisIntro = """
Illinois is a state in the Midwestern United States. It is the 5th most 
populous and 25th largest state, and is often noted as a microcosm of 
the country. With Chicago and its suburbs in the northeast, small industrial 
cities and great agricultural productivity in central and northern Illinois, 
and natural resources like coal, timber, and petroleum in the south, Illinois 
has a diverse economic base and is a major transportation hub. 
(Source: Wikipedia - Dated \(Date())
"""
print(illinoisIntro)
```
### 8. Tìm phần tử ngẫu nhiên trong collection
Điểm mới trong Swift 4.2 là khả năng chọn các yếu tố ngẫu nhiên trong collections với chức năng `randomElement`. Trong thực tế, không chỉ các mảng mà bất kỳ đối tượng nào tuân thủ giao thức `Collection` đều có thể sử dụng hàm tiện lợi này. Ví dụ sau sử dụng mảng location và nó sẽ in ra một thành phố ngẫu nhiên từ mảng đó:
```
let locations = [ "Springfield", "Chicago", "Springfield", "Jackson"]
let randomElement = locations.randomElement()
print(randomElement!)
```
# Kết luận:
Trong bài viết này, bạn đã tìm hiểu một số kỹ thuật hữu ích mà Swift 4 mang lại để giúp tạo code gọn hơn, tập trung và tối ưu hóa hơn. Trong lần phát triển tiếp theo, Swift chắc chắn sẽ có những bước tiến trong việc giúp bạn cấu trúc lại mã của mình để dễ đọc và đáng tin cậy hơn. Swift 4.x vẫn tiếp tục được phát triển và tôi khuyến khích bạn theo dõi trang phát triển Swift chính thức để lưu ý tất cả các tính năng mới trong những thảo luận tiếp theo.