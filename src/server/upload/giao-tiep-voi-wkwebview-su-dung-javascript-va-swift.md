Đôi khi ta có thể thấy web component hoặc webView được tích hợp vào trong ứng dụng iOS. Tuy nhiên, việc giao tiếp giữa hai platform không phải lúc nào cũng dễ dàng. Cần phải có cầu nối giữa Swift và Javascript.

![](https://images.viblo.asia/d1e5f968-03d5-4122-ae8a-439db0065178.jpeg)

Gần đây chúng tôi làm việc với một tính năng tương đối đặc biệt. Phần UI hiển thị trên WebView trong khi việc xử lý logic cần được process dưới native iOS app. Sau khi hoàn thành xử lý dưới Native, sẽ có callback mang theo data trả về cho webView. Bên Web sẽ dùng data này xử lý hiển thị trên màn hình sao cho phù hợp. Tương tự, khi có tương tác của người dùng , web sẽ callback về cho Native để xử lý logic.

Đối với iOS, có hai cách phổ biến để hiển thị webview, đó là sử dụng Safari View và WkWebview. Ở đây chúng tôi đã chọn WKWebview bởi nó cung cấp nhiều lựa chọn configuration hơn, đồng thời WKWebview cũng cung cấp cầu nối mà chúng ta cần để liên kết hai platform với nhau. Bài viết này sẽ hướng dẫn một số cách tiếp cận và sử dụgn cầu nối trong việc giao tiếp giữa hai bên iOS và JavaScript.

Yêu cầu: Xcode 10, swift 5

Components:
* WKWebview - cho phép hiển thị web content
* WKScriptMessage - object được khởi tạo khi postMessage() gọi
* WKUserContentController - quản lý javascript post và inject
* WKScriptMessageHandler - một protocol có thể access vào hàm của WKScriptMessage delegate
* WKWebViewConfiguration - config webview

Biểu đồ dưới đây sẽ biểu diễn quá trình liên lạc giữa hai platform. Hàm "doStuff" ở đây đại diện cho bất kì hàm nào chúng ta mong muốn.

![](https://images.viblo.asia/bf9238cf-bca4-4d53-9fc2-d93c7bfb30db.png)

### Liên lạc đến Native App

Trong ví dụ sau, javascript sẽ gọi postMessage trong "doStuffMessageHandler". Sau đó app của chúng ta sẽ add string trùng với tên handler. Ta có thể gọi đến nó bất kì khi nào ta muốn. Hãy thử add dòng sau vào khu vực bạn muốn trong javascript của `index.html`:

```
<html>
    <script>
        window.webkit.messageHandlers.doStuffMessageHandler.postMessage({ param1: "stuff", param2: "1000" })
    </script>
</html>
```

Bạn có thể thêm bao nhiêu param tùy ý.

Sau đó chúng ta sẽ tiến hành setup webview:

```
 let url = Bundle.main.url(forResource: "index", withExtension: "html") {
     let request = URLRequest(url: url)
     webView.load(request)
 }

 let doStuffMessageHandler = "doStuffMessageHandler"
 webView.configuration.userContentController.add(self, name: doStuffMessageHandler)
```

Trước khi rời khỏi ViewController bạn đừng quên remove những messageHandler đã add nếu không muốn bị memory leak nhé:

```
webView.configuration.userContentController.removeScriptMessageHandler(forName: "doStuffMessageHandler")
```

Tiếp theo ta sẽ xử lý với `WKScriptMessage`, nơi tiếp nhận các message và xử lý. Hãy ghi nhớ rằng chúng ta phải bắt đúng String name của scriptMessage để tiến hành xử lý:

```
extension WebViewController: WKScriptMessage {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == doStuffMessageHandler {
            guard let dict = message.body as? [String: AnyObject],
                let param1 = dict["param1"] as? String,
                let param2 = dict["param2"] as? Int else {
                    return
        }
        // doStuff(with: param1, param2)
    }
```

Khi postMessage được gọi, nó sẽ trigger hàm delegate trong app cùng với một WKScriptMessage object. The WKScriptMessage chứa biến name - thứ mà sẽ giống với tên của handler và body - bao gồm text hơajc param truyền về. Ta cũng có thể Switch với message.name để xử lý nhiều hàm khác nhau. Tuy nhiên vì là String, ta cần phải xử lý cả case default.

### Liên lạc đến WebView

Webkit đã cung cấp sẵn cho chúng ta những công cụ cần thiết để làm việc với web. Cụ thể ở đây chính là khả năng call JS với hàm `evaluateJavaScript`:

```
let data: [String: String] = [
    "param1": "\(param1)",
    "param2": "\(param2)"
]

guard let json = try? JSONEncoder().encode(data),
    let jsonString = String(data: json, enconding: .utf8) else {
        return
 }
 
 switch result {
 case .success:
     let javascript = "window.actions.stuffWasSuccessful('\(jsonString)')"
     webView.evaluateJavaScript(javascript, completionHandler: nil)
 case .failure:
      let javascript = "window.actions.stuffFailed('\(jsonString)')"
     webView.evaluateJavaScript(javascript, completionHandler: nil)
 }
```

Trong ví dụ trên đây, ta đã pass JSON theo kiểu String. Bạn có thể convert bất kì kiểu Encodable hoặc Codable về JSON và sau đó về String, phù thuộc vào cách mà bạn muốn nhận data.

Vậy là chúng ta đã thành công trong việc giao tiếp giữa hai platform rồi. Hi vọng bài viết này sẽ giúp cho mọi người dễ dàng làm việc với Webview hơn. 
Cám ơn đã đón đọc.

Refs:

https://developer.apple.com/documentation/webkit/wkscriptmessagehandler

https://developer.apple.com/documentation/webkit/wkusercontentcontroller

https://developer.apple.com/documentation/webkit/wkscriptmessage

https://developer.apple.com/documentation/webkit/wkwebviewconfiguration

https://medium.com/john-lewis-software-engineering/ios-wkwebview-communication-using-javascript-and-swift-ee077e0127eb

https://medium.com/@sreeharikv112/communication-from-webview-to-native-ios-android-app-6d842cefe02d

https://stackoverflow.com/questions/47860622/how-do-i-communicate-from-js-to-swift

https://stackoverflow.com/questions/29249132/wkwebview-complex-communication-between-javascript-native-code