Đối với một lập trình viên iOS, đôi khi bạn cũng muốn đưa nội dung Web vào trong ứng dụng của mình. Có thể chúng ta muốn load nội dung từ một website ngay trong ứng dụng mà không cần đến trình duyệt web mặc định (Safari).
Từ iOS 8 trở về trước chúng ta sử dụng UIWebView, tuy nhiên nó khó xử lý, và gây ra memory leak. Chính vì thế Apple đã phát hành WKWebView để thay thế cho UIWebView.
Đây là một framework mới, dễ dàng sử dụng, và nó cũng hỗ trợ mạnh trong việc thao tác với mã code JS.
## 1. Giới thiệu WKWebView
Được công bố trong WWDC2014, WKWebView là công cụ được thay đổi để thực hiện việc render nội dung web trong ứng dụng iOS. Nó sử dụng Core Animation và tăng tốc độ phần cứng để các trang web có thể cuộn với tốc độ 60fps.

Apple đã bỏ công nghệ JavaScrip cũ, thay vào đó bằng Nitro - công cụ sử dụng nền tảng của Safari. Ngoài ra nó còn các thao tác tay cũng như điều hướng giống như Safari. Nó cũng dễ dàng implement. Ví dụ như sau :

```swift
    override func viewDidLoad() {
        super.viewDidLoad()

        let webView = WKWebView(frame: .zero)

        view.addSubview(webView)

        let layoutGuide = view.safeAreaLayoutGuide

        webView.translatesAutoresizingMaskIntoConstraints = false
        webView.leadingAnchor.constraint(equalTo: layoutGuide.leadingAnchor).isActive = true
        webView.trailingAnchor.constraint(equalTo: layoutGuide.trailingAnchor).isActive = true
        webView.topAnchor.constraint(equalTo: layoutGuide.topAnchor).isActive = true
        webView.bottomAnchor.constraint(equalTo: layoutGuide.bottomAnchor).isActive = true

        if let url = URL(string: "https://www.google.com") {
            webView.load(URLRequest(url: url))
        }
    }
```
Bạn hãy chạy thử trên Simulator và xem kết quả:
![](https://images.viblo.asia/1c736a19-c4f8-4aac-b703-14307bd11f36.png)

Mặc định chúng ta chỉ có thể load các web https,  để có thể test trên localhost hay load các web http thì cần sửa đổi "App Transport Security Settings" trong file Infor.plist

## 2. WKUserContentController
Thế là chúng ta đã load được nội dung web lên, nhưng nếu bạn muốn sửa đổi, thao tác nhiều hơn thì cần sử dụng đến WKWebViewConfiguration. 
```swift
let config = WKWebViewConfiguration()
let webView = WKWebView(frame: .zero, configuration: config)
```

Ở đây có nhiều thuộc tính bạn có thể sửa đổi ngay khi khởi tạo. Ví dụ như, bạn có thể kiểm soát được tiến độ load trang, kiếm tra liệu video có thể hiển thị picture in picture hay không,...
WKWebViewConfiguration có một thuộc tính là WKUserContentController cho phép đầu vào là 1 WKUserContentController object. Trong object này cho phép thao tác JS bằng cách sử dụng addUserScript(: ) và lắng nghe từ message handle add(:name:)

## 3. User Scripts
Khi thêm WKUserScript object vào userContentController cho phép chugns ta thêm JS vào trong trang web của mình. Dưới đây là đoạn code thêm màu nền cho trong Google
```swift
let contentController = WKUserContentController()
let scriptSource = "document.body.style.backgroundColor = `red`;"
let script = WKUserScript(source: scriptSource, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
contentController.addUserScript(script)

let config = WKWebViewConfiguration()
config.userContentController = contentController

let webView = WKWebView(frame: .zero, configuration: config)
```

Trong phương thức khởi tạo có 3 parameters:

+ source: Đưa vào đoạn text nội dung câu lệnh JS
+ injectionTime: Chỉ định thời gian load JS
+ forMainFrameOnly: Chỉ định xem tập lệnh của bạn chạy trong tất cả hay chỉ trong mainFrame

## 4. Script Message
Script Message ngược lại so với User script, nó sẽ giúp bạn thao tác code native từ các đoạn JS của trang web gửi lại. Có một số thao tác như sau:

1.  Với mỗi xử lý bạn muốn thêm hãy dùng add(_:name:) trong WKUserController object
2.  Bạn cũng có thể adopt WKScriptMessageHandle protocol để thao tác
3.  Implement hàm yêu cầu userContentController(_ :didReceive): tại đây bạn thao tác các xử lý khi có JS

Một message handle sẽ lắng nghe khi có JS nào đó phát ra. Ví dụ bạn có thể có xử lý để parse JSON từ một URL. 

Đoạn code sau lắng nghe một messaege handle có tên là "test" và sẽ in ra dòng "Hello World!"

```swift
override func viewDidLoad() {
  super.viewDidLoad()
  
  let config = WKWebViewConfiguration()
  let userContentController = WKUserContentController()

  userContentController.add(self, name: "test")

  config.userContentController = userContentController
  
  ...
  
}

extension ViewController: WKScriptMessageHandler {
  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
      if message.name == "test", let messageBody = message.body as? String {
          print(messageBody)
      }
  }
}
```

Khi đó đoạn mã JS cần như sau :
```javascript
<script>
 
  function printHelloWorld() {
      window.webkit.messageHandlers.test.postMessage("Hello, world!");
  }
  window.onload = printHelloWorld;
 
</script>
```

Ngoài ra trong MessageBody bạn có thể cho vào đoạn mã JSON để truyền dữ liệu và convert sang object tương ứng. 

## 4. Tổng kết
WebKit cung cấp một công cụ mạnh mẽ và tiện lợi cho việc thao tác với JS trong webview. Bạn có thể thêm đoạn JS cho trang web hoặc xử lý khi có thao tác JS bắn về.

### Nguồn:
https://medium.com/capital-one-tech/javascript-manipulation-on-ios-using-webkit-2b1115e7e405