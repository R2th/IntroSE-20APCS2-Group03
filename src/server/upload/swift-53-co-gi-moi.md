Swift 1.0 được ra mắt vào năm 2014, trải qua 6 năm, nói về Swift 5.3 mang tới trải nghiệm mới, code bằng Swift dễ dàng hơn, an toàn và "sạch" hơn.

## Multi-Pattern Catch Clauses
Cho đến Swift 5.2, xử lý lỗi trong bằng ```do-catch```  yêu cầu sử dụng ```switch``` hoặc ```if-else``` trong một ```catch``` để xử lý nhiều case eror, hoặc thậm chí viết nhiều ```catch``` mà mỗi cái đó sẽ handle một case eror thì bây giờ từ Swift 5.3, hoàn toàn có thể xử lý lỗi nhiều cases trong một ```catch```

Xét một ví dụ chúng ta thử insert vào trong database SQLite

```Swift
do {
    try insert(into: "table", values: [...])
} catch { ... }
```

Giả sử chúng ta đã custom kiểu error gọi là ```DBError``` và có nhiều case error, chúng ta muốn xét qua từng case từ trên xuống dưới thì có thể viết như sau.

```Swift
do {
    try insert(into: "table", values: [...])
}
catch DBError.tableNotExist(let tableName) {
    print("\(tableName) table does not exist")
}
catch DBError.missingAllValues, DBError.missingSomeValues {
    print("There are missing values")
}
catch DBError.databaseNotOpen {
    print("Database is not open")
}
catch {
    print("Something went wrong and record could not be inserted to database")
}
```

Điều mới ở đây là mở ```catch``` thứ hai, chúng ta xử lý 2 lỗi Error khác nhau, không cần phải break chúng trong 2 ```catch``` khác nhau.

## ```Self``` không yêu cầu trong ```@escaping``` closures

Cho đến nay chúng ta bắt buộc phải có ```self``` trong closure khi tham chiếu đến đối tượng hiện tại để tránh xảy ra reference cycles. Tuy nhiên trong những closure được thêm attribute ```@escaping```, Swift 5.3 cho phép tránh viết ```self```

Để dễ hiểu hơn, xét một ví dụ, đây là một method dùng để fetch một image từ một URL. Cho đến khi nó xong thì sẽ thực thi ```completion```

```Swift
func fetchImage(from url: URL, completion: @escaping (_ image: Data?) -> Void) {
    // Logic implementation that fetches the image from the given URL.
 
    // At the end call the completion handler passing
    // a hypothetical imageData object that either contains
    // the fetched image data or it's nil.
    completion(imageData)
}
```

Từ trước đến nay chúng ta phải tham chiếu đến self như sau
```Swift
fetchImage(from: Some_URL { (data) in
    guard let imageData = data else { return }
 
    self.didFetchImage = true
 
    self.updateUI(with: imageData)            
}
```

Từ bây giờ chúng ta không cần nữa, chỉ cần ```self``` trong closure capture list, không cần viết self quá nhiều lần

```Swift
fetchImage(from: Some_URL { [self] (data) in
    guard let imageData = data else { return }
 
    didFetchImage = true
 
    updateUI(with: imageData)
}
```

## Enum conform to```Comparable``` protocol

Có một enum như sau
```Swift
enum Performance {
    case bad
    case average
    case good
    case excellent
}
```

Giả sử chúng muốn so sánh 2 cases trong enum như thế này thì sao

```Swift
let expectedPerformance = Performance.good
let userPerformance = Performance.average
 
if userPerformance < expectedPerformance {
    print("Not so good. Please try again.")
}
```

Để làm được như vậy trước Swift 5.3 chúng ta cần phải làm như sau

1. conform to ```Comparable``` protocol.
2. implement một ``` <``` hoặc ```>``` được yêu cầu để so sánh
3. Đưa cho ```Performance``` một raw kiểu Int để so sánh 2 giá trị số nguyên với nhau

```Swift
enum Performance: Int, Comparable {
    case bad
    case average
    case good
    case excellent
 
    static func < (lhs: Performance, rhs: Performance) -> Bool {
        return lhs.rawValue < rhs.rawValue
    }
}
```

Từ Swift 5.3 trở đi chúng ta đơn giản chỉ cần

```Swift
enum Performance: Comparable {
    case bad
    case average
    case good
    case excellent
}
 
 
let expectedPerformance = Performance.good
let userPerformance = Performance.average
 
if userPerformance < expectedPerformance {
    print("Not so good. Please try again.")
}
```

## Multiple Trailing Closures

Chúng ta đều biết để thực hiện một animation đơn giản thì có thể viết như này

```Swift
UIView.animate(withDuration: 0.4, animations: {    
    // perform animation...    
}, completion: { (_) in
    // do something upon completion...
})
```

Hoặc để đơn giản hơn thì dùng trailing closures

```Swift
UIView.animate(withDuration: 0.4, animations: {
    // perform animation...    
}) { (_) in
    // do something upon completion...
}
```

Nhưng từ Swift 5.3, chúng ta có thể viết ngắn gọn hơn như này

```Swift
UIView.animate(withDuration: 0.4) {
    // perform animation...
} completion: { (_) in
    // do something upon completion...
}
```

Hãy chú ý ngoặc nhọn giờ sẽ được đóng ngay trước closure đầu tiên, do đó ```animations``` label không cần thiết nhưng mà ```completion``` label cần thiết, rõ ràng dễ đọc hơn nhiều

## Tổng kết

Những điều quan trọng nhất của Xcode 12 và Swift 5.3 chuungs ta đã biết, giờ chỉ việc thử nó thôi. Thậm chí bài viết của mình vẫn còn thiếu sót nhiều điều mới ở Swift 5.3, do đó mình khuyến khích mọi người đọc ở trang web chính ở đây : https://github.com/apple/swift-evolution

Cảm ơn các bạn đã đọc đến đây, chúc các bạn thành công trên con đường IOS developer. Cheers!

-----

Source: https://www.appcoda.com/xcode-12-swift-53/#New_Features_in_Swift_53