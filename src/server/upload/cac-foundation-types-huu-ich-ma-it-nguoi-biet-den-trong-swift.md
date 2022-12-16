`Foundation` cung cấp cho bạn với nhiều công cụ cần thiết trong quá trình phát triển iOS của bạn, từ cấu trúc như Data đến hoàn thiện các APIs như URLSession.
Nhưng hoá ra chúng ta chỉ sử dụng một phần nhỏ những gì `Foundation` cung cấp.

Có một loạt các `Foundataion` types đã tồn tại từ rất lâu. Trên thực tế, chúng hiếm khi được đề cập đến như là giải pháp cho các vấn đề thường ngày mà các nhà phát triểm có thể sử dụng với những
thứ đã tồn tại trong SDK này. 

Nhưng chúng vẫn tồn tại, và mặc dù một số trong số chúng thực sự đã cũ, hầu hết các loại này vẫn rất hữu ích. Hãy cùng xem một số trong số chúng :D

## NSScanner
`NSScanner` có thể trích xuất dần các số và chuỗi từ một base string, tương tự như các `scanf` hoạt động trong C: 

``` swift
public func extractIntsFrom(string: String) -> [Int] {
    var result: [Int] = []
    let scanner = Scanner(string: string)
    // Jump over everything that isn't a number
    scanner.charactersToBeSkipped = CharacterSet.decimalDigits.inverted
    var pointer: Int = 0
    while scanner.isAtEnd == false {
        if scanner.scanInt(&pointer) {
            result.append(pointer)
        }
    }
    return result
}
let string = "1M very L337 700"
let ints = extractIntsFrom(string: string)
// [1, 337, 700]
```

Scanner API có nhiều biến thể như `scanString`,  `scanDouble`, `scanHexInt` và có thể config để scan một vị trí cụ thể trong String hoặc để phân biệt chữ hoa chữ thường.
Đây là một giải pháp trực tiếp và hiệu quả để tìm kiếm các lần xuất hiện của một chuỗi kí tự khi bạn đang tìm kiếm các mẫu cụ thể.

 Bạn có thể nhận thấy rằng API này yêu cầu con trỏ ( một tác dụng phụ vì đây là API cũ của Obj-C ) nhưng bạn luôn có thể tóm tắt các loại này dưới các extension để làm cho chúng trông clear hơn.
 
 ## NSCountedSet
 Có nhiều vấn đề trong phát triển nó  yêu cầu bạn theo dõi số lượng của một phần tử nhất định, như bài toán đảo chữ cổ điển:
 
 ``` swift
 func isAnagram(_ first: String, _ second: String) -> Bool {
    guard first.count == second.count else {
        return false
    }
    var dict = [Character: Int]()
    for character in first {
        dict[character, default: 0] += 1
    }
    for character in second {
        dict[character, default: 0] -= 1
        if dict[character] == 0 {
            dict[character] = nil
        }
    }
    return dict.isEmpty
}
 ```
 
 Cách đơn giản để giải quyết  thông qua `Dictionary` với giá trị `Int` , nhưng chúng ta không cần thiết bởi vì đã có `NSCountSet` hỗ trợ chúng ta:
 
 ``` swift
 func isAnagram(_ first: String, _ second: String) -> Bool {
    guard first.count == second.count else {
        return false
    }
    let countedSet = NSCountedSet(array: Array(first))
    for character in second {
        countedSet.remove(character)
    }
    return countedSet.count == 0
}
 ```
 
Các phần tử có thể được thêm nhiều lần vào tập hơp với `countSet.add(element)` và kiểm tra số lượng của chúng bằng `countSet.count(element)`.
Nếu số lượng bằng 0, phần tử sẽ bị xoá khỏi tập hợp. Tuy nhiên giống như `Set` trong Swift, bạn chỉ có thể thêm một trong mỗi phần tử vào tập hợp, điều này rất tốt để tránh trùng lặp.

## NSChache

`NSCache` là một tập hợp hoạt động tương tự dictionary, nhưng nó có hai điểm khác biệt quan trọng. 

* Đầu tiên, nó không sao chép các đối tượng quan trọng vào đó
* Thứ hai, nó sẽ tự động xoá các mục của nó nếu hệ thống sắp hết bộ nhớ

Các chính sách thực tế loại bỏ các mục rất khó hiểu, nhưng nếu bạnn có các đối tượng nặng khi khởi tạo, sử dụng NSCache có thể là một giải pháp thay thế rất thân thiện với hệ thống.
Đây là cách nó có thể thực hiện để lưu vào bộ nhớ cache của UIImages:

``` swift
final class ImageDownloader {
    let client: HTTPClient
    let cache = NSCache<NSString, NSData>()
    init(client: HTTPClient) {
        self.client = client
    }
    func load(imageUrl: URL, intoImageView imageView: UIImageView) {
       let key = imageUrl.absoluteString as NSString
        func apply(data: NSData) {
            let image = UIImage(data: data as Data)
            imageView.image = image
        }
        if let cachedData = cache.object(forKey: key) {
            apply(data: cachedData)
            return
        } else {
            client.data(from: imageUrl) { data in
                cache.setObject(data as NSData, forKey: key)
                apply(data: data as NSData)
            }
        }
    }
}
```
Trong trường hợp này, chúng ta có thể sử dụng `NSCache` một cách đơn giản và không cần download lại ảnh.

## NSOrderedSet
`Sets` rất tốt để theo dõi các phần tử khi không có vấn đề về trùng lặp, nhưng vì quyền truy cập của Set là O(1), không có gì đảm bảo rằng chúng ra sẽ được sắp xếp khi bạnn làm như vậy.
Như tên của nó, NSOrderedSet hoạt động giống như một Set thông thường với ngoại lệ là các phần tử được sắp xếp theo thứ tự:
``` swift
let set = NSMutableOrderedSet()
set.add(1)
set.add(4)
set.add(1)
set.add(1)
set.add(1)
set.add(6)
set.add(4)
set.add(6)
for a in set {
    print(a)
    // 1, 4, 6
}
```
Bởi vì nó là một kiểu cũ, bạn sẽ được thông báo lỗi nó không hiểu kiểu generic ở đây, mọi thứ dựa trên kiểu `Any`.
Vì thế bạn có thể bọc nó trong một kiểu Swift:
``` swift
class OrderedSet<T: Hashable>: Sequence {
    private let _set = NSMutableOrderedSet()
    init() {}
    func makeIterator() -> NSFastEnumerationIterator {
        return _set.makeIterator()
    }
    func add(_ element: T) {
        _set.add(element)
    }
    func remove(_ element: T) {
        _set.remove(element)
    }
}
```

## NSByteCountFormatter
Có rất nhiều định dạng khó hiểu trong Foundation, nhưng `ByteCountFormatter` là một công cụ rất hữu ích. Nó định dạng số lượng byte thành các định dạng kích thước tệp mà con người có thể đọc được,
điều này rất hữu ích nếu ứng dụng của bạn tải xuống nội dung, vì bạn không cần tính toán các giá trị theo cách thủ công:
``` swfit
let bytes = 1024 * 1024
let formatter = ByteCountFormatter()
formatter.allowsNonnumericFormatting = false // Uses '0' instead of 'Zero'
formatter.countStyle = .file
let string = formatter.string(fromByteCount: Int64(bytes))
// 1 MB
```

## NSDataDetector
`NSDataDetector` cũng tương tự như `NSScanner`, với sự khác biệt là nó trích xuất dữ liệu theo context từ String như số điện thoại, địa chỉ và link:
``` swift
let string = "I write for https://swiftrocks.com and my phone is 555-111-111."
let range = NSRange(0..<string.count)
let types: NSTextCheckingResult.CheckingType = [.link, .phoneNumber]
let dataDetector = try NSDataDetector(types: types.rawValue)
dataDetector.enumerateMatches(in: string, options: [], range: range) { (match, _, _) in
    guard let match = match else { return }
    switch match.resultType {
    case .link:
        print(match.url!)
        // https://swiftrocks.com
    case .phoneNumber:
        print(match.phoneNumber!)
        // "555-111-111"
    default:
        return
    }
}
```
Nhược điểm là nó dựa trên API regex của `Foundation`, một lần nữa vì nó đã cũ. Đây 

## Conclusion
Có rất nhiều loại hữu ích trong Foundation và UIKit mà chúng ta không nghe thấy nhiều, nhưng biết chúng có thể giúp bạn ngăn việc viết mã không cần thiết. 
Hãy tìm hiểu thêm và trải nghiệm chúng nhé

Tham khảo:

https://medium.com/better-programming/useful-and-obscure-foundation-types-in-swift-4f2b2c42354e