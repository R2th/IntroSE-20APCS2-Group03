Trong quá trình lập trình ứng dụng, cụ thể ở đây là ứng dụng iOS, đôi khi bạn cần xử lý 1 đoạn văn bản và chỉ quan tâm đến các đối tượng như đường link website hoặc địa chỉ email trong văn bản đó. Câu hỏi đặt ra là làm thế nào để bạn có thể lấy được các đối tượng đó để tiếp tục làm việc với nó?

Trong bài viết này, tôi sẽ giới thiệu 1 đối tượng có thể giúp bạn thực hiện được nhiệm vụ này, đó là NSDataDetector.

## NSDataDetector
NSDataDetector là subclass của NSRegularExpression, một đối tượng sử dụng để phân tích dữ liệu và khớp dữ liệu theo các mẫu dữ liệu xác định. Hiện tại, NSDataDetector có thể khớp được các kiểu dữ liệu: date, address, link, phone number,... Kết quả của quá trình khớp dữ liệu trả về là mảng đối tượng NSTextCheckingResult, tuy nhiên các đối tượng NSTextCheckingResult là kết quả của NSDataDetector có đôi chút khác biệt so với kết quả trả về của lớp cha NSRegularExpression.

Kết quả trả về bởi NSDataDetector sẽ là 1 trong các loại dữ liệu đã được định nghĩa, phụ thuộc vào loại kết quả trả về mà nó sẽ có những thuộc tính tương ứng. Ví dụ, kết quả của kiểu date sẽ có date, timeZone và duration, kết quả của kiểu link sẽ có url,...

### Các kiểu kết quả trả về của NSDataDetector:

```swift
    public struct CheckingType : OptionSet {

        public init(rawValue: UInt64)

        public static var orthography: NSTextCheckingResult.CheckingType { get }

        public static var spelling: NSTextCheckingResult.CheckingType { get }

        public static var grammar: NSTextCheckingResult.CheckingType { get }

        public static var date: NSTextCheckingResult.CheckingType { get }

        public static var address: NSTextCheckingResult.CheckingType { get }

        public static var link: NSTextCheckingResult.CheckingType { get }

        public static var quote: NSTextCheckingResult.CheckingType { get }

        public static var dash: NSTextCheckingResult.CheckingType { get }

        public static var replacement: NSTextCheckingResult.CheckingType { get }

        public static var correction: NSTextCheckingResult.CheckingType { get }

        @available(iOS 4.0, *)
        public static var regularExpression: NSTextCheckingResult.CheckingType { get }

        @available(iOS 4.0, *)
        public static var phoneNumber: NSTextCheckingResult.CheckingType { get }

        @available(iOS 4.0, *)
        public static var transitInformation: NSTextCheckingResult.CheckingType { get }
    }
```

## Sử dụng NSDataDetector lấy email, link trong 1 đoạn văn bản:
Bây giờ chúng ta sẽ sử dụng NSDataDetector để lấy ra các email và link có trong đoạn text sau:
```swift
  let myString = "Đây là 1 đoạn text bao gồm các email và đường link: abc123@gmail.com, myemail@email.com, www.viblo.asia"
```

Khai báo đối tượng NSDataDetector và lọc ra các đường link có trong đoạn text trên:
```swift
  let detector = try? NSDataDetector(types: NSTextCheckingResult.CheckingType.link.rawValue)
  guard let matches = detector?.matches(in: myString, options: [], range: NSMakeRange(0, myString.count)) else {
    return
  }
```

Kết quả của bước trên là 1 mảng các đường link có trong myString, bây giờ chúng ta sẽ tiến hành phân loại chúng và đưa vào các mảng tương ứng: mailAddresses và webAddresses:
```swift
  var mailAddresses: [String] = []
  var webAddresses: [String] = []

  for match in matches {
    if let matchURL = match.url,
      let matchURLComponents = URLComponents(url: matchURL, resolvingAgainstBaseURL: false) {
        if matchURLComponents.scheme == "mailto" {
          let mailAddress = matchURLComponents.path
          mailAddresses.append(mailAddress)
        } else if matchURLComponents.scheme == "http" || matchURLComponents.scheme == "https" {
          let website = matchURLComponents.url?
          webAddresses.append(website!)
        }
      }
  }
```
Kết quả cuối cùng chúng ta sẽ thu được 2 mảng chứa các đối tượng mong muốn:
mailAddresses: ["abc123@gmail.com", "myemail@email.com"]
webAddresses: ["www.viblo.asia"]

## Đưa NSDataDetector vào String Extension:
Chúng ta có thể viết 1 hàm trong String extension để lấy ra email của 1 String 1 cách nhanh chóng:

```swift
extension String {
  func emailAddresses() -> [String] {
    var addresses: [String] = []
    if let detector = try? NSDataDetector(types: NSTextCheckingResult.CheckingType.link.rawValue) {
      let matches = detector.matches(in: self, options: [], range: NSMakeRange(0, self.count))
      for match in matches {
        if let matchURL = match.url,
          let matchURLComponents = URLComponents(url: matchURL, resolvingAgainstBaseURL: false),
          matchURLComponents.scheme == "mailto" {
            let address = matchURLComponents.path
            addresses.append(String(address))
          }
      }
    }
    return addresses
  }
}
```

Trên đây, tôi đã giới thiệu đến các bạn đối tượng NSDataDetector và 1 ứng dụng đơn giản của nó. Hy vọng bài viết trên sẽ hữu ích đối với bạn.