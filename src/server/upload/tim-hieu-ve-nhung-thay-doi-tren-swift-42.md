# I. Giới thiệu

Sau lần đầu được giới thiệu chính thức phiên bản Swift 1.0 đầu tiên vào 09/09/2014, Swift đã trải qua rất nhiều phiên bản. Ở mỗi phiên bản nâng cấp, Swift lại được hoàn thiện hơn, bỏ đi các hàm tồn tại trên ngôn ngữ C cũ kỹ, thêm nhiều hàm hiện đại và tiện ích hơn, tối ưu tốt hơn, giúp code chạy nhanh hơn. Phiên bản Swift 4.2 được giới thiệu ngày 17/09/2018 cũng không ngoại lệ, ngoài tối ưu tốc độ cho Swift, chúng ta còn có thêm rất nhiều API mới hiện đại, dễ dùng để thay thế cho các API cũ. Trong bài viết này, chúng ta sẽ đi vào tìm hiểu các cải tiến về ngôn ngữ này

# II. Nội dung

Dưới đây, tôi xin điểm qua các cải tiến về mặt ngôn ngữ của Swift 4.2 so với 4.1

## Random number

Tạo random number là một việc làm rất thường xuyên khi chúng ta code. Trước đây, để tạo một số Int random trong khoảng từ 0 đến 9, chúng ta viết code như sau:
```Swift
let digit = Int(arc4random_uniform(10))
```

Còn tạo số Int random từ 1 đến 10, thì chúng ta làm như sau:

```Swift
let digit = Int(arc4random_uniform(10)) + 1
```

Hơi tù tù đúng không nào? hàm arc4random_uniform() là một hàm của C, nó chẳng hề cho chúng ta chọn cận trên và cận dưới để random, và việc nhớ tên và sử dụng cũng khá khó, thường thì mỗi lần sử dụng chúng ta đều phải google lại cách viết của nó.

Trên Swift 4.2, hàm arc4random_uniform đã được thay thế bằng hàm của Swift, để viết số random như bên trên, chúng ta code như sau:
```Swift
let digit = Int.random(in: 0..<10) // random 0 đến 9
let digit = Int.random(in: 1...10) // random 1 đến 10
```

Vậy đó, đơn giản, dễ viết, dễ đọc, tuyệt vời đúng không nào :D

ngoài random Int, chúng ta còn có thể random Double, Float, CGFloat, Bool,… 

```Swift
let double = Double.random(in: 0..<1)
let float = Float.random(in: 0..<1)
let cgFloat = CGFloat.random(in: 0..<1)
let bool = Bool.random()
```

Đối với Array, Swift 4.1 không có hàm lấy random element trong Array, để lấy random element chúng ta cần random index, rồi lấy index từ Array như sau:
```Swift
let phones = [“iPhone Xs Max”, “iPhone Xs”, “iPhone X”, “iPhone 8”, “iPhone 8 plus”]
let index = Int(arc4random_uniform(UInt32(phones.count)))
let phone = phones[index]
```

Trên Swift 4.2, chúng ta chỉ cần đơn giản làm như sau:

```Swift
let phones = [“iPhone Xs Max”, “iPhone Xs”, “iPhone X”, “iPhone 8”, “iPhone 8 plus”]
if let phone = phones.randomElement() {
  print(phone)
} else {
  print("Empty phones”)
}
```

hàm randomElement() trả về gía trị nil khi Array rỗng

## Dynamic member lookup

Dynamic member lookup là một tính năng mới để gọi hàm subscripts trong Swift 4.2. Bằng cách sử dụng dynamic member lookup, chúng ta sẽ gọi subscripts bằng cách sử dụng “.” dễ đọc hơn, không còn phải sử dụng “[]” như trước.

Xét ví dụ dưới đây, khi sử dụng subscripts 4.1 chúng ta làm như sau:

```Swift
class Phone {
    let name: String
    
    private let details: [String: String]
    
    init(name: String, details: [String: String]) {
        self.name = name
        self.details = details
    }
    
    subscript(key: String) -> String {
        switch key {
        case "info":
            return "this is \(name)"
        default:
            return details[key] ?? ""
        }
    }
}

let details = ["color": "white", "year" : "2018"]
let iPhoneXs = Phone(name: "iPhone Xs", details: details)
iPhoneXs["info"]		// "this is iPhone Xs"
iPhoneXs["color"] 	// "white"
```

Như chúng ta thấy, chúng ta gọi iPhoneXs["info"] để lấy info của iPhoneXs.

Đối với Swift 4.2, chúng ta viết lại code trên như sau:
```Swift
// 1
@dynamicMemberLookup
class Phone {
    let name: String
    
    private let details: [String: String]
    
    init(name: String, details: [String: String]) {
        self.name = name
        self.details = details
    }
    // 2
    subscript(dynamicMember key: String) -> String {
        switch key {
        case "info":
            return "this is \(name)"
        default:
            return details[key] ?? ""
        }
    }
}

let details = ["color": "white", "year" : "2018"]
let iPhoneXs = Phone(name: "iPhone Xs", details: details)
// 3
iPhoneXs.info       // "this is iPhone Xs"
iPhoneXs.color      // "white"
```

So với code trên Swift 4.1, code bên trên:
 * 1: thêm @dynamicMemberLookup để editor biết rằng class này có chức năng dynamic member lookup
 * 2: thêm dynamicMember trước key trong hàm subscript(). Điều này là bắt buộc để sử dụng dynamic member lookup
 * 3: subscripts của class được gọi bằng cách sử dụng dấu “.” thay vì dùng []

Qua 2 ví dụ trên, chúng ta thấy cách gọi iPhoneXs.info. Dễ nhìn hơn, trông có vẻ hiện đại hơn nhiều so với iPhoneXs["info"]

## Enumeration Cases Collections

Trước đây, để lấy tất cả các giá trị trong Enum, chúng ta phải làm như sau:
```Swift
enum PhoneOS {
    case iOS, android, bBOS, others
    
    static var allCases: [PhoneOS] {
        return [.iOS, .android, .bBOS, .others]
    }
}

let phoneOS = PhoneOS.allCases	// [iOS, android, bBOS, others]
```

Trong code bên trên, để lấy được allCases, chúng ta phải tự mình khai báo property trong enum

Trong Swift 4.2, chúng ta có thể lấy allCases mà không cần khai báo, chỉ cần để enum implement protocol CaseIterable như sau:
```Swift
enum PhoneOS: CaseIterable {
    case iOS, android, bBOS, others
    
//    static var allCases: [PhoneOS] {
//        return [.iOS, .android, .bBOS, .others]
//    }
}

let phoneOS = PhoneOS.allCases 	// [iOS, android, bBOS, others]
```
Cách này sẽ rất tiện cho chúng ta trong trường hợp enum thường xuyên phải thêm case mới, mà chúng ta lại muốn chắc chắn rằng allCases luôn có giá trị của tất cả các case trong enum.

Tất nhiên, chúng ta hoàn toàn có thể xoá đoạn comment trong enum bên trên để tự khai báo allCases trên Swift 4.2. Việc tự khai báo sẽ làm tương tự như Swift 4.1

## Các hàm mới trong collections (Array, Dictionary, Set)

### Đổi tên một số hàm

Trong Swift 4.1, để tìm element hay index của element trong collection, chúng ta có các hàm như sau:
```Swift
let number = ["one", "seven", "four", "six", "ten", "eight", "nine",  "five", "two", "three"]
let six = number.first(where: { $0 == "six" })
let sixIndex = number.index(where: { $0 == "six" })
let threeIndex = number.index(of: "three")
print(six)          // Optional("six")
print(sixIndex)     // Optional(3)
print(threeIndex)   // Optional(9)
```
Hàm index(where: ) và index(of: ) trên Swfit 4.1 sẽ lấy index đầu tiên trong Array có giá trị chúng ta cần. Trong Swift 4.2, index(where: ) và index(of: ) được đổi tên 1 chút để ý nghĩa hơn, đỡ gây hiểu lầm:

```Swift
let number = ["one", "seven", "four", "six", "ten", "eight", "nine",  "five", "two", "three"]
let six = number.first(where: { $0 == "six" })
let sixIndex = number.firstIndex(where: { $0 == "six" })
let threeIndex = number.firstIndex(of: "three")
print(six)          // Optional("six")
print(sixIndex)     // Optional(3)
print(threeIndex)   // Optional(9)
```

### Thêm một số hàm
Trên Swift 4.1, chúng ta không có các hàm có sẵn để thực hiện việc tìm kiếm bắt đầu từ cuối collection (Array, Dictionary, Set). Vì thế, giả sử nếu chúng ta muốn tìm từ cuối về của Array number bên trên, chúng ta phải làm thêm bước sau:

```Swift
let reversedNumber = number.reversed()
```

Sau đó, từ Array reversedNumber chúng ta sẽ gọi các hàm như bên trên để lấy ra element và index của element trong Array

Swift 4.2 đã cung cấp cho developer các hàm tìm kiếm từ cuối collection trở lên:
```Swift
let lastSix = number.last(where: { $0 == "six" })
let lastSixIndex = number.lastIndex(where: { $0 == "six" })
let lastThreeIndex = number.lastIndex(of: "three")
```

Tên của các hàm này, cùng với sự đổi tên của các hàm bên trên, tạo thành các cặp tên dễ đọc, đễ hiểu và dễ nhớ hơn.

### xoá các element trong collection

Trên Swift 4.1 chúng ta có thể lọc xoá nhiều element trong collection bằng cách sử dụng hàm filter như sau:
```Swift
var numbers = [4, 3, 8, 1, 5, 8, 0, 2, 7, 9, 6, 5]
numbers = numbers.filter { $0 > 5 }
print(numbers)      // [8, 8, 7, 9, 6]
```

Tuy nhiên, logic có vẻ hơi ngược, và đây là hàm filter chứ không phải hàm remove (mặc dù thực chất thì nó cũng là remove bớt element). Swift 4.2, chúng ta có hàm sau:

```Swift
var numbers = [4, 3, 8, 1, 5, 8, 0, 2, 7, 9, 6, 5]
numbers.removeAll { $0 <= 5 }
print(numbers)      // [8, 8, 7, 9, 6]
```

Không có gì khác biệt lắm, nhưng khi nhìn vào chúng ta dễ hiểu hơn, rằng chúng ta đang thực hiện việc remove các element nhỏ hơn hoặc bằng 5.


## Thêm hàm toggle() cho Boolean

Đây là một update nhỏ nhưng cực kỳ có ích, bởi vì chúng ta dùng Boolean mọi nơi trong code. Thay vì  trong Swift 4.1 chúng ta code:
```Swift
var isOn = false
isOn = !isOn
print(isOn) // true
```

Thì bây giờ chúng ta có thể code như sau:
```Swift
var isOn = false
isOn.toggle()
print(isOn) // true
```

Dễ đọc hơn đúng không nào, không cồn phải sử dụng "!" và phép gán nữa.

Swift 4.2 còn có rất nhiều những điểm cải thiện nữa, tuy nhiên do nội dung có hạn nên tôi chỉ xin nêu ra những điểm khác biệt mà chúng ta sẽ hay sử dụng đến như ở bên trên. Để tìm hiểu toàn bộ những thay đổi của Swift 4.2, các bạn có thể vào [Swift CHANGELOG](https://github.com/apple/swift/blob/master/CHANGELOG.md) hoặc [vào đây](https://developer.apple.com/documentation/swift?changes=latest_minor) để tìm hiểu thêm.

# III. Tổng kết

Trên đây tôi đã giới thiệu đến các bạn một số thay đổi trên Swift 4.2, những thay đổi này đều nhằm mục đích làm cho ngôn ngữ Swift hiện đại hơn, dễ đọc, dễ viết, dễ quản lý hơn cho developer. Với sự phát triển hoàn thiện rất nhanh của Swift, chúng ta hoàn toàn có thể tin tưởng rằng ngôn ngữ này sẽ ngày càng hoàn thiện hơn, thân thiện hơn với anh em lập trình viên chúng ta.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!