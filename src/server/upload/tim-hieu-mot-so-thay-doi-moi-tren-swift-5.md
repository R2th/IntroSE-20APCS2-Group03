# I. Giới thiệu

Kể từ khi Swift chính thức ra mắt vào tháng 9/2014, Apple đã đều đặn nâng cấp Swift hàng năm thông qua các version lớn nhỏ. Trong mỗi lần nâng cấp Swift version, chúng ta lại có thêm những chức năng mới, những hàm mới, cải thiện performmance,… Càng ngày Swift càng phát triển hiện đại hơn, giúp lập trình viên dễ học, dễ code hơn.

Vào cuối tháng 3/2019, Swift 5.0 đã được Apple giới thiệu và tích hợp trong Xcode 10.2. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu những thứ hay ho mới được thêm vào trong phiên bản Swift này.

# II. Nội dung

Để tìm hiểu bài viết này, chúng ta cần sử dụng phiên bản Xcode 10.2 hoặc lớn hơn. Chúng ta sẽ chỉ tìm hiểu về Swift 5, nên không nhất thiết phải tạo project. Các bạn mở Xcode, chọn File -> New -> Playground để tạo 1 project playground. Bây giờ chúng ta sẽ lần lượt điểm qua các điểm mới trên Swift bằng cách code trên playground

## Hàm isMultiple của Int

Trước đây, để kiểm tra 2 số chia hết cho nhau, chúng ta làm như sau:

```Swift
let number1 = 6
let number2 = 2

if number2 != 0 && number1 % number2 == 0 {
    print("number1 chia hết cho number2")
}
```

Trên Swift 5, chúng ta có thể làm đơn giản như sau:

```Swift
let number1 = 6
let number2 = 2

if number1.isMultiple(of: number2) {
    print("number1 chia hết cho number2")
}
```
Đơn giản và dễ đọc hơn rất nhiều, chúng ta cũng không cần quan tâm đến logic trong hàm if có đúng hay không nữa

## Tạo String bằng \#

Trước đây, để tạo String chúng ta làm như sau:
```Swift
let string1 = "this is a string"	// this is a string
```

Tuy nhiên, trong nhiều trường hợp chúng ta sẽ cần string có dấu “”. Lúc đó chúng ta sẽ phải làm như sau:
```Swift
let string2 = "this is a string with \"quote\"" // this is a string with "quote"
```

Với cách tạo string mới sử dụng thêm # trên Swift 5, chúng ta sẽ không còn gặp tình trạng này nữa. string2 bên trên có thể viết lại như sau:

let string2 = #"this is a string with "quote""# // this is a string with "quote"

## property isNumber Character

Trên Swift 4.2, để kiểm tra character có phải là number hay không, chúng ta làm như sau:
```Swift
let char: Character = "1"

if let _ = Int(String(char)) {
    print("character is number")
}
```
Đầu tiên, chúng ta phải tạo String từ Character, tiếp đó chúng ta chuyển từ String sang Int

Trên Swift 5, chúng ta có thể viết như sau:
```Swift
let char: Character = "1"


if char.isNumber {
    print("character is number")
}
```

Như các bạn thấy, độ dài code thì có thể không hơn nhau là bao, nhưng dễ đọc hơn :D

## property isAlphabetic Unicode Scalar

Swift 5 thêm property iSAlphabetic cho Unicode scalar để kiểm tra xem có phải chữ cái hay không. Ví dụ, ở swift 4.2, chúng ta sẽ kiểm tra các chữ cái trong chuỗi string như sau:
```Swift
let string = "a string"
string.unicodeScalars.forEach { scalar in
    if ((65...90) ~= scalar.value || (97...122) ~= scalar.value) {
        print("\(scalar) là chữ cái")
    } else {
        print("\(scalar) không phải là chữ cái")
    }
}
```
Trong đoạn code trên, chúng ta sẽ kiểm tra ký tự có thuộc khoảng 65-90 hoặc khoảng 97-122 không (2 khoảng này là khoảng của  A-Z và a-z theo hệ thập phân trong bản unicode)

Bây giờ chúng ta sử dụng Swift 5 để viết lại code trên như sau:
```Swift
let string = "a string"
string.unicodeScalars.forEach { scalar in
    if scalar.properties.isAlphabetic {
        print("\(scalar) là chữ cái")
    } else {
        print("\(scalar) không phải là chữ cái")
    }
}
```

Rất dễ hiểu, không cần phải dùng thuật toán nhiều, cũng chẳng cần nhớ bảng mã Unicode nữa


## cải tiến cho Dictionary

### lược bớt Dictionary

Giả sử chúng ta có Dictionary như sau:

```Swift
let phonePrices = ["5s" : "100", "6s" : "200 USD", "7" : "300", "8": "400", "X": "500 USD"]
```
Bây giờ, chúng ta cần loại các giá trị có chữ USD (không phải là số) trong dictionary, với Swift 4.2 chúng ta làm như sau:
```Swift
let filterPrices = phonePrices.mapValues(Int.init)
    .filter { $0.value != nil }
    .mapValues { $0! }
```

Hoặc như sau:
```Swift
let reducePrices = phonePrices.reduce(into: [:]) { $0[$1.key] = Int($1.value) }
```

Trong cả 2 cách trên, chúng ta sử dụng higher order function của Swift là filter và reduce. Tuy nhiên logic bên trong cũng khá phức tạp, chúng ta phải ngồi đọc code 1 lúc mới có thể ngẫm ra được đoạn code trên nó làm gì.

Với Swift 5, chúng ta sẽ code như sau:
```Swift
let compactPrices = phonePrices.compactMapValues(Int.init)
```

Đơn giản hơn rất nhiều đúng không? chúng ta tạo Dictionary compactPrices từ dictionary phonePrices mà chỉ lấy các cặp có value có thể convert được sang kiểu Int

### Đổi tên DictionaryLiteral

Trong Swift 4.2, chúng ta có thể tạo DictionaryLiteral như sau:
```Swift
let phonePrices: DictionaryLiteral = ["5s" : "100", "6s" : "200 USD"]
```

Trên Swift 5,  kiểu DictionaryLiteral đã được đổi tên thành  KeyValuePairs, vì vậy khai báo bên trên được viết lại như sau:
```Swift
let phonePrices: KeyValuePairs = ["5s" : "100", "6s" : "200 USD"]
```

## Quản lý enum chặt chẽ hơn.

Với swift 4.2, trong hàm switch, để check các case của enum, chúng ta có để sử dụng case default như ví dụ sau:
```Swift
enum IPhone {
    case iPhone8, iPhoneX, iPhoneXs
}

func getIphoneName(_ iphone: IPhone) -> String {
    switch iphone {
    case .iPhone8:
        return "iPhone 8"
    case .iPhoneX:
        return "iPhone X"
    default:
        return "iPhone Xs"
    }
}

let iPhone = IPhone.iPhoneXs
let name = getIphoneName(iPhone)
print(name) // iPhone Xs
```

lúc này, case iPhoneXs sẽ được xử lý trong case default. Tuy nhiên, khi chúng ta thêm case iPhone Xr vào enum IPhone mà quên mất không xử lý thêm cho hàm getIphoneName, chúng ta sẽ gặp tình trạng sau:

```Swift
enum IPhone {
    case iPhone8, iPhoneX, iPhoneXs, iPhoneXr
}

let iPhone = IPhone.iPhoneXr
let name = getIphoneName(iPhone)
print(name) // iPhone Xs
```

lúc này hàm getIphoneName sẽ trả sai kết quả, do iPhoneXr cũng được gọi trong case default. Cũng không hề có cảnh báo nào về những lỗi sai này. Hãy tưởng tượng bạn dùng hàm switch để kiểm tra enum ở nhiều nơi, và khi thêm case vào enum, các bạn không nhớ hết được mọi chỗ để thêm code cho case mới, runtime error có thể sẽ sảy ra trong lúc chạy App.

Trên Swift 5, chúng ta có thể thêm từ khoá @unknown trong case default như sau:

 
func getIphoneName(_ iphone: IPhone) -> String {
    switch iphone {
    case .iPhone8:
        return "iPhone 8"
    case .iPhoneX:
        return "iPhone X"
    @unknown default:
        return "iPhone Xs"
    }
}

Bây giờ, khi chúng ta không thêm code cho hết các case trong enum, compiler sẽ luôn cảnh báo warning buộc chúng ta phải code hết các case. Tương lai, bất kỳ khi nào chúng ta thêm case mới, compiler sẽ lại warning cho chúng ta biết những chỗ mình cần sửa.

# III. Tổng kết

Trên đây tôi đã giới thiệu một số thay đổi mới trên phiên bản Swift 5. Swift 5 còn rất nhiều thay đổi hay ho khác nữa, các bạn có thể tìm hiểu thêm những feature đó [tại đây](https://github.com/apple/swift/blob/master/CHANGELOG.md). 
Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!