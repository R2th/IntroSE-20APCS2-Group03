![](https://images.viblo.asia/b15fe8b9-7d6e-4784-bd4d-ec1058a573d0.jpeg)

Nếu bạn muốn biết cách xử lý với Bitmasks trong Swift hay là bạn đã từng nghe đến OptionSet chưa? Bài viết này sẽ giúp bạn hiểu hơn về điều đó :D 

## 1. OptionSet là gì?
Về cơ bản, OptionSet là một protocol, khi confirm nó chúng ta có thể làm việc với [bit mask](https://en.wikipedia.org/wiki/Mask_(computing)).
Nó là một đại diện cho việc gán mỗi bit tương ứng với một option. Hãy cùng tìm hiểu thêm nhé.

## 2. Cách implement OptionSet.
Dưới đây là một ví dụ cơ bản về sử dụng OptionSet:
``` swift
struct MyStruct: OptionSet {
    let rawValue: Int
    static let firstOption = MyStruct(rawValue: 1 << 0)
    static let secondOption = MyStruct(rawValue: 1 << 1)
    static let thirdOption = MyStruct(rawValue: 1 << 2)
}
```
Giờ hãy giải thích về đoạn code trên nhé. 
Việc confirm `OptionSet` protocol yêu cầu cần khai báo `rawValue`,  nó không nhất thiết phải thuộc loại `Int` mà là bất kì loại nào của `FixedWidthInteger` như Int8 hay Int16.
Tiếp theo, bạn cũng cần khai báo `static` các option. Đó là tất cả những gì bạn cần làm với OptionSet :D

Chắc hẳn bạn sẽ thắc mắc vì sao lại cần dùng `static` và `<<` ?

Về mặt logic, các option cần được khai báo `static` vì bạn sẽ truy cập trực tiếp vào nó mà không cần khởi tạo đối tương.  Tiếp theo, option được khai báo như một instance của struct 
với việc gán rawValue với mã nhị phân vì thế cần sử dụng toán tử `<<`

Ví dụ: 
``` swift
let one = 0b0001 // 1
let shiftedZero = one << 2 // 4 (0b0100)
let twentyOne = 0b0010101 // 21
let shiftedTewntyOne = twentyOne << 2 // 84 (1010100)
```

Ở ví dụ trên, chúng ta chỉ chuyển dịch các bit thành 1 và 21

``` swift
static let firstOption = MyStruct(rawValue: 1 << 0)
static let secondOption = MyStruct(rawValue: 1 << 1)
static let thirdOption = MyStruct(rawValue: 1 << 2)
```

nó cũng giống như:
``` swift
static let firstOption = MyStruct(rawValue: 1)
static let secondOption = MyStruct(rawValue: 2)
static let thirdOption = MyStruct(rawValue: 4)
```

Vậy tại sao lại cần dùng `<<` có thể thuận tiện hơn khi đảm bảo rằng bạn không phá vỡ quy tắc của công thức đếm nhị phân (1,2,4,8,16,..)

![](https://images.viblo.asia/44903661-1550-4549-bff9-9914d79d9c16.jpeg)

## Tại sao lại cần sử dụng OptionSet?
Bạn có thể đơn giản coi nó như một option kết hợp với một biến. Hãy cùng xem ví dụ dưới đây:

### Ví dụ:
Hãy thử xem chúng ta có một ứng dụng cho phép người dùng chọn vật nuôi yêu thích. Với yêu cầu đó chắc hẳn bạn sẽ nghĩ ngay tới `enum`.

``` swift
enum Pet {
    case pussycat, puppy, hamster, chameleon
}
```

và dễ dàng sử dụng:
``` swift
let favortiePet: Pet = .puppy
```

Tuy nhiên, chúng ta đã biết rằng mọi thứ thay đổi rất nhiều, yêu cầu của ứng dụng đã thay đổi là người dùng có thể lựa chọn nhiều vật nuôi yêu thích.
Chúng ta sẽ cần làm thế này:

``` swift
let favortiePets: [Pet] = [.pussycat, .puppy]
```

Hiện tại thì có vẻ hợp lí, tuy nhiên trong một số trường hợp điều này không được tốt cho lắm. Chẳng hạn, nếu giá trị này cần được gửi đến một phía máy chủ thì sao? nó sẽ được gửi dưới dạng danh sách?

Bây giờ chúng ta hãy thử sử dụng `OptionSet` để thấy sự khác biệt:

``` swift
struct Pet: OptionSet {
    let rawValue: UInt8
    static let pussycat = Pet(rawValue: 1 << 0)
    static let puppy = Pet(rawValue: 1 << 1)
    static let hamster = Pet(rawValue: 1 << 2)
    static let chameleon = Pet(rawValue: 1 << 3)
}
let singlePet: Pet = .puppy
let multiplePets: Pet = [.puppy, .pussycat]
```

Chú ý rằng `multiplePets` có type là `Pet` và không phải `[Pet]`. Nếu bạn thử in `rawValue` bạn sẽ thấy rằng `singlePet` là 2 (`1<<1`) và `multiplePets` là 3 (`1<<1` + `1<<0`)

Bằng cách thực hiện theo phương pháp sử dụng OptionSet, bạn có thể đại diện cho nhiều tùy chọn bằng cách chỉ sử dụng một UInt8 duy nhất:
```
Thú cưng yêu thích là pussycat: rawValue = 1

Vật nuôi yêu thích là hamster và chameleon: rawValue = 12 (4 + 8)

Vật nuôi yêu thích là  tất cả:  rawValue = 15 (1 + 2 + 4 + 8)
```

![](https://images.viblo.asia/848f3f79-0cba-4045-9673-d194c86f2ea4.jpeg)


Ngoài ra còn một tính năng thú vị của `OptionSet` là các thao tác liên quan đến operation ví dụ:

``` swift
let options1: Pet = [.pussycat, .puppy]
let options2: Pet = [.puppy, .hamster, .chameleon]
let intersection = options1.intersection(options2)
print(intersection) // Pet(rawValue: 2) 👉 puppy
let union = options1.union(options2)
print(union) // Pet(rawValue: 15) 👉 pussycat, puppy, hamster & chameleon
let subtracting = options1.subtracting(options2)
print(subtracting) // Pet(rawValue: 1) 👉 pussycat
let contains = options1.contains(.hamster)
print(contains) // false
```

### Lưu ý:
`OptionSet` hoạt động dự trên bit masks,  bạn có thể thấy nó là một lựa chọn tốt để lưu trữ danh sách hữu hạn các option dưới dạng một biến duy nhất. 
Tuy nhiên, hãy lưu ý để sử dụng nó một cách thông minh! và nó không phải là `Collection`

### Nguồn tham khảo:

https://medium.com/@ahmadfayyas/swift-more-elegant-code-optionset-205e4866b4aa