### 1. **Alamofire**:
Alamofire là thư viện giúp bạn khi bạn muốn trừu tượng hóa và đơn giản hóa việc kết nối mạng trong ứng dụng iOS của mình. Alamofire là một HTTP networking library, được xây dựng trên nền tảng của NSURLSession và Foundation URL Loading System. 
```swift
// Making a GET request

Alamofire.request(.GET, "https://httpbin.org/get", parameters: ["foo": "bar"])
         .responseJSON { response in
             print(response.request)  // original URL request
             print(response.response) // URL response
             print(response.data)     // server data
             print(response.result)   // result of response serialization

             if let JSON = response.result.value {
                 print("JSON: \(JSON)")
             }
         }
```
### 2. **SwiftyJSON**:
JSON là một kiểu dữ liệu rất hay gặp khi chúng ta thao tác với webservice trong quá trình xây dựng ứng dụng, việc bóc tách dữ liệu ở định dạng JSON tốn khá nhiều thời gian, tuy nhiên với SwiftyJSON thì việc thao tác với dữ liệu JSON trở nên nhanh chóng và dễ dàng.
```swift
// Typical JSON handling

if let statusesArray = try? NSJSONSerialization.JSONObjectWithData(data, options: .AllowFragments) as? [[String: AnyObject]],
    let user = statusesArray[0]["user"] as? [String: AnyObject],
    let username = user["name"] as? String {
    // Finally we got the username
}

// With SwiftyJSON

let json = JSON(data: dataFromNetworking)
if let userName = json[0]["user"]["name"].string {
  //Now you got your value
}
```
Hơn thế nữa, chúng ta có thể kết hợp sử dụng SwiftyJSON với Alamofire để gửi và nhận dữ liệu từ server.
```swift
Alamofire.request(.GET, url).validate().responseJSON { response in
    switch response.result {
    case .Success:
        if let value = response.result.value {
          let json = JSON(value)
          print("JSON: \(json)")
        }
    case .Failure(let error):
        print(error)
    }
}
```
### 3. **ObjectMapper**:
Nếu bạn đã từng viết một ứng dụng tải truy suất tin qua API, có thể bạn đã dành rất nhiều thời gian để ánh xạ các thông tin lấy được từ API thành các đối tượng. ObjectMapper giúp bạn chuyển đổi JSON thành đối tượng và ngược lại. Nói cách khác, nó giúp bạn ánh xạ JSON tới các đối tượng và các đối tượng trở lại JSON. Các đối tượng lồng nhau cũng được hỗ trợ.
```swift
// Temperature class that conforms to Mappable protocol

struct Temperature: Mappable {
    var celsius: Double?
    var fahrenheit: Double?

    init?(_ map: Map) {

    }

    mutating func mapping(map: Map) {
        celsius     <- map["celsius"]
        fahrenheit  <- map["fahrenheit"]
    }
}
```
### 4. **Quick**:
Quick là một framework phát triển theo định hướng hành vi cho Swift, lấy cảm hứng từ RSpec, Specta và Ginkgo. Nhanh chóng đi kèm với Nimble, đó là một framework phù hợp cho các test của bạn.
```swift
// Documentation directory spec

class TableOfContentsSpec: QuickSpec {
  override func spec() {
    describe("the 'Documentation' directory") {
      it("has everything you need to get started") {
        let sections = Directory("Documentation").sections
        expect(sections).to(contain("Organized Tests with Quick Examples and Example Groups"))
        expect(sections).to(contain("Installing Quick"))
      }

      context("if it doesn't have what you're looking for") {
        it("needs to be updated") {
          let you = You(awesome: true)
          expect{you.submittedAnIssue}.toEventually(beTruthy())
        }
      }
    }
  }
}
```
### 5. **Eureka**:
Eureka giúp bạn viết các dynamic table-view form một cách đơn giản và hiệu quả. Nó bao gồm các row, section và form. Nếu ứng dụng của bạn chứa rất nhiều form, Eureka sẽ là trợ thủ giúp bạn tiết kiệm thời gian một cách hiệu quả.
```swift
// Creating a form

class CustomCellsController : FormViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        form +++ Section("Custom cells")
                    <<< WeekDayRow(){
                        $0.value = [.Monday, .Wednesday, .Friday]
                    }
                    <<< TextFloatLabelRow() {
                        $0.title = "Float Label Row, type something to see.."
                    }
    }
}
```
### 6. **RxSwift**:
RxSwift là một Swift Framework cho lập trình chức năng. Để cụ thể hơn, RxSwift là phiên bản Swift của Rx và mục tiêu của nó là cho phép tạo thành phần các hoạt động không đồng bộ và các luồng sự kiện / dữ liệu. Các hoạt động bất đồng bộ và các delegate đều thống nhất , điều này làm cho RxSwift trở thành một framework mạnh mẽ như vậy. Nếu bạn đã từng làm việc với ReactiveCocoa, bạn đã quen thuộc với khái niệm này.
```swift
// Combine first and last name sequences, and bind the resulting string to label

combineLatest(firstName.rx_text, lastName.rx_text) { $0 + " " + $1 }
            .map { "Greeting \($0)" }
            .bindTo(greetingLabel.rx_text)
```
### 7. **SnapKit**:
SnapKit là một AutoLayout Library giúp cho việc autolayout trong code trở nên đươn giản và dễ dàng hơn. SnapKit được sinh ra với mục đích giảm thiểu các lỗi lập trình sinh ra trong qua trình autolayout bằng code.
```swift
// Resizing and centering subview in its superview

let box = UIView()
let container = UIView()

container.addSubview(box)

box.snp_makeConstraints { (make) -> Void in
    make.size.equalTo(50)
    make.center.equalTo(container)
}
```
### 8. **Spring**:
Spring là một animation library giúp bạn tạo các animation cả trên code và storyboard. Chúng ta có thể tạo animation trên storyboard bằng runtime atributes (thông qua IBInspectable). Spring đã phát triển thành một thư viện đầy đủ, hỗ trợ khá nhiều hoạt ảnh, chuyển tiếp và thuộc tính đã được viết.
```swift
// Usage with code

layer.animation = "wobble"
layer.animate()
```
### 9. **Kingfisher**:
Kingfisher là một thư viện nhẹ để tải xuống và lưu trữ hình ảnh từ web. Việc tải xuống và lưu vào bộ nhớ đệm được thực hiện bất đồng bộ. Hình ảnh đã tải xuống được lưu trong bộ nhớ cache và cả disk, điều này có thể cải thiện trải nghiệm ứng dụng khá nhiều.
```swift
// Basic example of downloading and caching an image

imageView.kf_setImageWithURL(NSURL(string: "http://your_image_url.png")!)
```
### 10. **CoreStore**:
CoreStore là một thư viện bao bọc cho Core Data. Mục tiêu của nó là cung cấp sự an toàn của Swift khi tương tác với Core Data. API của CoreStore cung cấp tất cả các phương thức phổ biến để tương tác hiệu quả với cơ sở dữ liệu của bạn.
```swift
// Storing a person entity

CoreStore.beginAsynchronous { (transaction) -> Void in
    let person = transaction.create(Into(MyPersonEntity))
    person.name = "John Smith"
    person.age = 42

    transaction.commit { (result) -> Void in
        switch result {
            case .Success(let hasChanges): print("success!")
            case .Failure(let error): print(error)
        }
    }
}
```

-----
Source: https://infinum.co/the-capsized-eight/top-10-ios-swift-libraries-every-ios-developer-should-know-about