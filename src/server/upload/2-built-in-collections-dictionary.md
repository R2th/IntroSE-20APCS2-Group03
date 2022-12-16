# Dictionaries
Kiểu cấu trúc dữ liệu quan trọng khác đó là Dictionary. 1 dictionary chứa key với những giá trị tương ứng; việc trùng key không được hỗ trợ. Việc lấy giá trị thông qua key sẽ mất 1 khoảng thời gian trung bình không đổi, tuy nhiên với việc tìm kiếm 1 mảng 1 giá trị cụ thể sẽ tốn thời gian tuyến tính tăng dần với kích thước mảng. Không như mảng, dictionary không được sắp xếp. Thứ tự các cặp được liệt kê trong mảng không được xác định.

Trong ví dụ dưới, chúng ta sử dụng dictaionary như mô hình dữ liệu cho 1 màn hình cài đặt của ứng dụng app. Màn hình bao gồm 1 danh sách các setting, và mỗi setting riêng có 1 tên ( chính là key trong dictaionary) và 1 giá trị. Mỗi giá trị có thể là 1 trong các kiểu dữ liệu cơ bản, như text, số hoặc kiểu boolean. Chúng ta sử dụng enum với giá trị liên kết với mô hình như sau:

```
enum Setting {
        case text(String) 
        case int(Int)
        case bool(Bool)
}
let defaultSettings: [String:Setting] = [
        "Airplane Mode": .bool(false), 
        "Name": .text("My iPhone"),
]

defaultSettings["Name"] // Optional(Setting.text("My iPhone"))
```

Chúng ta sử dụng subscripting để lấy giá trị của 1 setting. Truy cập giá trị tìm kiếm trong Dictionary luôn trả về giá trị optional - khi key chỉ định không tồn tại, nó trả về giá trị nil. Tương phản điều đó với mảng, nó sẽ trả về truy xuất ngoài giới hạn và khiến chương trình tan vỡ.

Lý do cho sự khác biệt là mảng dùng chỉ số còn dictaionary lại dùng key. Chúng tôi đã thấy rằng nó rất hiếm khi bạn thực sự cần phải làm việc với các chỉ số mảng trực tiếp. Và nếu bạn hiểu, chỉ số 1 mảng thường được dùng truy xuất trực tiếp một cách nào đó ( ví dụ như from a range like 0..<array.count) tuy nhiên dùng 1 chỉ số không hợp lệ là 1 lỗi chương trình, nó là lỗi phổ biển của các loại collection khác ngoại trừ dictionary.
Không như array, các dictionary không sắp xết. Việc tồn tại giá trị đằng sau tên key không nói với bạn điều gì ngoại trừ địa chỉ key tồn tại.

## Mutation
Giống như mảng, dictionary mặc định sử dụng let là bất biến: không đối tượng nào được thêm, xoá hay thay đổi. Và giống như với mảng, chúng ta có thể khởi tạo 1 biến có thể biến đổi bằng "var". Để xoá giá trị từ 1 dictionary, chúng ta có thể đặt nó thành rỗng bằng cách sử dụng "subscripting" hoặc gọi `removeValue(forKey:)`. Điều này sẽ trả về giá trị bị xoá hoặc nil nếu key không tồn tại. Nếu chúng ta muốn lấy 1 mảng bất biến và thay đổi nó, chúng ta cần thực hiện sao chép:

```
var userSettings = defaultSettings
userSettings["Name"] = .text("Jared's iPhone")
userSettings["Do Not Disturb"] = .bool(true)
```

Ghi nhớ điều này, lần nữa, giá trị của defaultSetting không thay đổi. Giống như việc loại bỏ khoá, 1 cách khác được dùng đó là thay đổi giá trị bằng updateValue(_ :forKey:), nó sẽ trả về giá trị mới ( hoặc không gì cả):

```
let oldName = userSettings .updateValue(.text("Jane's iPhone"), forKey: "Name")
userSettings["Name"] // Optional(Setting.text("Jane\'s iPhone")) 
oldName // Optional(Setting.text("Jared\'s iPhone"))
```

## 1 số khả năng hữu ích của các hàm trong Dictionary

Nếu chúng ta muốn kết hợp các giá trị mặc định dictionary với bất kì thay đổi cài đặt mà người dùng thay đooir? Cài đặt tuỳ chọn sẽ ghi đè gía trị mặc định, nhưng với dictionary kết quả nên vẫn giữ các giá trị mặc định cho bất kì key nào không được thay đổi tuỳ chọn. Bản chất thì chúng ta cần merge 2 mảng dictionary, nơi dictionary sẽ được kết hợp và ghi đè trong những key bị trùng.

Dictionary có hàm `merge(_ :uniquingKeysWith:)` nó sẽ lấy các cặp key-value để tiến hành merge và 1 phương thức đặc biệt để kết hợp 2 giá trị cùng 1 key. Chúng tôi sẽ dùng nó để merge 1 dictionary với 1 cái khác, theo dõi ví dụ:

```
var settings = defaultSettings
let overriddenSettings: [String:Setting] = ["Name": .text("Jane's iPhone")]
settings.merge(overriddenSettings, uniquingKeysWith: { $1 })
settings
// ["Name": Setting.text("Jane\'s iPhone"), "Airplane Mode": Setting.bool(false)]
```

Ở ví dụ trên, chúng ta đã sử dụng { $1 } như quy định cho việc kết hợp 2 giá trị. Ngoài ra trong trường hợp key tồn tại ở cả 2 `setting` và `overriddenSettings`, chúng ta sử dụng giá trị từ overriddenSettings.

Chúng ta cũng có thể cấu trúc 1 dictionary mới từ các cặp giá (key, value) nối tiếp/ Nếu chúng ta đảm bảo rằng các key là duy nhất, chúng ta có thể sử dụng Dictionary(uniqueKeysWithValues:). Tuy nhiên trong trường hợp chúng ta có 1 chuỗi liên tiếp mà 1 key xuất hiện nhiều lần, chúng ta cần cung cấp 1 phương thức để kết hợp 2 giá trị cho cùng key, giống như ví dụ trên. Để ví dụ, tính toán các đối tượng thường xuất hiện bao nhiêu lần trong 1 chuỗi, chúng ta có thể map mỗi phần tử, kết hợp nó với 1 và sau đó tạo 1 dictionary triết xuất cho kết quả của các cặp phần tử. Nếu chúng ta gặp 2 giá trị có cùng key ( ở phần trước, nếu chúng ta nhìn thấy giá trị quá 2 lần), chúng ta đơn giản chị việc thêm chúng vào bằng việc sử dụng "+" :

```
extension Sequence where Element: Hashable { 
    var frequencies: [Element:Int] {
        let frequencyPairs = self.map { ($0, 1) }
        return Dictionary(frequencyPairs, uniquingKeysWith: +) }
}
let frequencies = "hello".frequencies // ["e": 1, "o": 1, "l": 2, "h": 1]
frequencies.filter { $0.value > 1 } // ["l": 2]
```

Một phương thức khác được sử dụng là map tất cả giá trj của dictionary. Vì Dictionary là 1 Sequence, nó cho phép map như 1 mảng. Tuy nhiên, thỉnh thoảng người ta muốn giữ cấu trúc dictionary nguyên vẹn và chỉ thay đổi giá trị. Hàm mapValues có thể làm điều đó:

```
let settingsAsStrings = settings.mapValues { setting -> String in switch setting {
    case .text(let text): return text
    case .int(let number): return String(number)
    case .bool(let value): return String(value)
    } 
}
settingsAsStrings // ["Name": "Jane\'s iPhone", "Airplane Mode": "false"]
```

## Hashable Requirement

Dictionary là bảng hash. Dictionary công nhận mỗi key 1 ví trí trong mảng lữu trữ bằng hàm hashValue. Điều này lý giải vì sao Dictionary yêu cầu Key là kiểu tương thích với giao thức Hashable. Tất cả kiêu dữ liệu cơ bản trong thư viện chiển cho phép điều đó, bao gồm chữ, số nguyên, số thập phân và giá trị Boolean. Các enum không đi kèm giá trị liên kết cũng tự động thoả mãn giao Hashable.

Nếu bạn muốn sử dụng loại tuỳ biến của bạn như key dictionary, bạn phải thêm thủ công Hashable. Nó yêu cầu thực hiện các thuộc tính của hashValue và, vì thế Hasable mở rộng Equatable, 1 overload của phương thức toán tử == cho loại của bạn. Việc triển khai của bạn phải giữ 1 thứ luôn quan trọng: 2 thực thể có thể bằng nhau ( giống như khai báo bởi thực hiện ==) phải có cùng hash value. Điều ngược lại thì không đúng, 2 thực thể có cùng giá trị hash value không nhất thiết phải giống nhau. Điều này có ý nghĩa là xem xét rằng có chỉ một số hữu hạn các giá trị băm riêng biệt, trong khi nhiều loại có thể băm (như chuỗi) về cơ bản là vô hạn.

Tiềm năng cho các giá trị băm trùng lặp có nghĩa là Dictionary phải có khả năng xử lý các tương tác. Tuy nhiên, một hàm băm tốt sẽ cố gắng đạt được số lượng va chạm tối thiểu để duy trì các đặc tính hiệu suất của bộ sưu tập, tức là hàm băm sẽ tạo ra một phân phối đồng đều trên toàn bộ phạm vi số nguyên. Trong trường hợp cực đoan khi việc triển khai của bạn trả về cùng một giá trị băm (ví dụ: 0) cho mọi trường hợp, hiệu suất tra cứu từ điển xuống cấp xuống O (n).
  
Đặc tính thứ hai của một hàm băm tốt là nó nhanh. Hãy nhớ rằng giá trị băm được tính toán mỗi khi khóa được chèn, xóa hoặc tra cứu. Nếu việc triển khai hashValue của bạn mất quá nhiều thời gian, nó có thể đánh mất hết bất kỳ lợi ích nào bạn có được từ độ phức tạp O (1).

Viết 1 hàm băm tốt có nghĩa nó phải đáp ứng những yêu cầu khắt khe. Chúng ta được hỗ trợ bởi các giao thức [Equatable and Hashable](https://github.com/apple/swift-evolution/blob/master/proposals/0185-synthesize-equatable-hashable.md)