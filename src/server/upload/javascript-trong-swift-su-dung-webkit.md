Chào các bạn, bài viết này mình viết về cách sử dụng WebKit để giao tiếp giữa Swift và JavaScript. Nguồn bài viết: https://medium.com/capital-one-tech/javascript-manipulation-on-ios-using-webkit-2b1115e7e405

Là một iOS developer, đôi khi chúng ta muốn đưa nội dung web vào trong ứng dụng iOS của mình. Có thể chúng ta muốn load nội dung từ một webside. Từ iOS 8, Apple đã deprecated UIWebView cho WKWebView và introduced WebKit API mới, cải thiện đáng kể cả performance và tính linh hoạt của việt add nội dung web vào trong iOS app, giúp các developers control nhiều hơn. Nó cũng được cải thiện đáng kể sự giao tiếp với JavaScript native.

Trong bài viết này, mình sẽ viết example cách inject scripts vào trong webpages và call native function trực tiếp từ JavaScript.

## WKWebView
Bây giờ mình sẽ vào ví dụ luôn. Tạo một object WKWebView, add các contraint, pass 1 URLRequest để load webview:

```
import WebKit

class ViewController: UIViewController {
    let webView = WKWebView(frame: .zero)
    
    override func viewDidLoad() {
        super.viewDidLoad()
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
}
```
Lưu ý rằng bạn chỉ có thể load các URL được bảo mật theo mặc định. Bạn phải add "App Transport Security Settings" vào file Info.plist, và add key "Allow Arbitrary Loads" vào phía trong với value là "YES":

![](https://images.viblo.asia/acd33deb-881f-4449-8ad2-3d2c8fb84e63.png)

Run với simulator, kết quả sẽ thế này:

![](https://images.viblo.asia/7a7ee3a4-9035-4756-bfbb-4383702e7af3.png)

## WKUserContentController
 Chúng ta đã load 1 trang web với một vài dòng code, bây giờ chúng ta sẽ tạo một WKWebView với một object WKWebViewConfiguration:
 
 ```
 let config = WKWebViewConfiguration()
  webView = WKWebView(frame: .zero, configuration: config)
 ```
 
 WKWebViewConfiguration có một thuộc tính là userContentController, nó inject JavaScript bằng cách sử dụng hàm addUserScript(_ : ) và lắng nghe message handlers qua hàm add(_:name:). 
 
##  User Scripts
Object WKUserScript khi được thêm vào userContentController (qua hàm addUserScript), cho phép lấy JavaScript và đưa nó vào một trang web. Đây là một ví dụ đơn giản về việc thêm scripts để thay đổi màu nền của trang web Google phía trên:

```
let contentController = WKUserContentController()
let scriptSource = "document.body.style.backgroundColor = `red`;"
let script = WKUserScript(source: scriptSource, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
contentController.addUserScript(script)

let config = WKWebViewConfiguration()
config.userContentController = contentController

webView = WKWebView(frame: .zero, configuration: config)
```

Kết quả:

![](https://images.viblo.asia/fc870cb1-32bf-4cb7-a5d8-799a3bec3555.png)

Nếu script phức tạp hơn, bạn có thể load nó từ 1 file local Xcode, ví dụ:

```
guard let scriptPath = Bundle.main.path(forResource: "script", ofType: "js"),
              let scriptSource = try? String(contentsOfFile: scriptPath) else { return }

let userScript = WKUserScript(source: scriptSource, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
userContentController.addUserScript(userScript)
```

## Script Messages
Trong khi user scripts cho phép bạn thêm mã javascript vào trong webpage của bạn, thì script messages cho phép bạn call native code từ JavaScript. Step:
1. Với mỗi handler bạn muốn thêm, call add(:name:) trong object WKUserContentController. Tham số name rất quan trọng.
2. ViewController của bạn phải conform WKScriptMessageHandler protocol.
3. Implement required function userContentController(_ :didReceive:).

Một message handler là một listener sẽ kích hoạt và trả về dữ liệu sau khi một số sự kiện JavaScript hoàn thành. Ví dụ: bạn có 1 handler để parse JSON data fetched từ 1 URL, khi đưa các message handler vào object WKUserContentController, web view của bạn phải định nghĩa 1 function tương ứng: **window.webkit.messageHandlers.name.postMessage(messageBody)**. Ví dụ:
```
override func viewDidLoad() {
   super.viewDidLoad()
    let userController: WKUserContentController = WKUserContentController()
    userController.add(self, name: "callNative01")
   let configuration = WKWebViewConfiguration()
   configuration.userContentController = userController
   webView = WKWebView(frame: .zero, configuration: configuration)
   guard let  url = Bundle.main.url(forResource: "sample", withExtension: "html") else {
            return
   }
   let request = URLRequest(url: url)
    webView.load(request)
   ...
}

extension ViewController: WKScriptMessageHandler {
  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
      if message.name == "callNative01", let messageBody = message.body as? String {
           print("message.body:\(messageBody)")
      }
  }
}
```

Đây là file sample.hltm có đoạn JavaScript:
```
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<script type="text/javascript">
    function callNative01() {
        window.webkit.messageHandlers.callNative01.postMessage({"name": "giang", "age": 24});
    }
</script>
<body>
    <h1> <a href="javascript:callNative01();">CallNative 01 Click</a> </h1> <br /><br />
<h1> This is a sample file created to test a simple "WebView".<br /></h1>
<h1> Modify this file to test the "WebView" content.<br /></h1>
</body>
</html>

```

Run app và xem kết quả log:
```
message.body:{
    age = 24;
    name = giang;
}
```

Cảm ơn các bạn đã đọc bài viết!