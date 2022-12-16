Việc phát triển của các mạng xã hội với việc public các API mang tới nhiều ý tưởng về các ứng dụng sử dụng các dữ liệu của mạng xã hội đó. 
Instagram là một trong những mạng xã hội lớn được nhiều người sử dụng vì thế trong bài viết này mình sẽ hướng dẫn các bạn cách để có thể sử dụng được các API mà instagram đã public.

## 1. Đăng ký ứng dụng sử dụng Instagram API.

Đầu tiên chúng ta truy cập vào [Instagram developer page](https://www.instagram.com/developer/ ).

Tiếp đến chúng ta chọn Manage Clients -> Register a New Client

![](https://images.viblo.asia/04bc90af-29c0-467b-a069-6c0ac0517420.png)

Rồi, giờ chúng ta sẽ thấy giao diện để đăng ký một Client ID,  chúng ta cần điền vào các trường bắt buộc, trong đó chú ý một chút về **Valid redirect URIs** nó được mô tả  ***"The redirecturi specifies where we redirect users after they have chosen whether or not to authenticate your application."*** ở đây mình chọn luôn đến trang chủ Instagram

![](https://images.viblo.asia/a51f2ec0-ee11-4f66-a93b-58232b6668d0.png)

Xong chúng ta chọn Register và kết quả như sau :

![](https://images.viblo.asia/0714a99f-cc14-424d-b952-a534e84c1427.png)

Chúng ta thấy hiện tại ứng dụng đang ở trạng thái sandbox, khi chúng ta develop thì chỉ cần như này là đủ, tuy nhiên để app có thể public và sử dụng đầy đủ các API của Instagram thì buộc chúng ta phải cung cấp các thông tin và submit để Instagram review. Các bạn có thể tap vào **MANAGE** để vào chỉnh sửa các thông tin 

![](https://images.viblo.asia/51224670-0734-49e4-8070-d1e84feaf00e.png)

Chúng ta thấy ở đây có 1 thông số rất quan trọng mà không được phép để lộ đó là **Client Secret** trong trường hợp nghi ngờ bị lộ chúng ta cần reset key này bằng cách ấn vào nút đỏ **RESET SECRET**

Chúng ta chú ý có 2 tab mà chúng ta sẽ sử dụng ngay đây :
- Sandbox : vì chúng ta đang trong môi trường phát triển nên chỉ Instagram account nào được cấp quyền thì mới có thể dùng để test, do đó chúng ta sẽ khai báo các account muốn test ở đây
- Permissions : Ở đây cung cấp các quyền mà chúng ta có thể sử dụng mà instagram sẽ trả về, vì thế cần sử dụng gì thì chúng ta phải request và nêu lý do tai sao laị cần sử dụng quyền đó, nếu tuân thủ các nguyên tắc mà instagram đặt ra họ sẽ cho phép chúng ta sử dụng

Okay, kết thúc phần 1 chúng ta sẽ note lại 3 thông tin sau để dùng cho phần tiếp theo:

- Client ID
- Valid redirect URIs

## 2. Xác thực Instagram trên App

Chọn  **Xcode** --> **Create new Project**  đặt tên là **Social Media**

Bây giờ chúng ta sẽ implement, ở đây chúng ta sẽ sử dụng WKWebView, trên mạng đã có khá nhiều tutorial hướng dẫn sử dụng UIWebView tuy nhiên nó đã bị deprecated và apple cũng không cho phép chúng ta submit app sử dụng API này nữa.

Đầu tiên mình sẽ khai báo một struct để lưu trữ các tham số cần sử dụng :

```
struct InstagramKey {
    static let INSTAGRAM_AUTHURL = "https://api.instagram.com/oauth/authorize/"
    static let INSTAGRAM_CLIENT_ID = "480a9476de2d42458ebc0a52a3747120"
    static let INSTAGRAM_REDIRECT_URI = "https://www.instagram.com/"
    static let INSTAGRAM_SCOPE = "basic"
}
```

Trong struct phía trên có thấy **client Id** và **redirect URIs** là 2 giá trị mà chúng ta có được sau khi hoàn thành ở bước 1, scope chính là permission mà chúng ta đã đăng ký trong **MANAGE**

Tiếp theo, chúng ta có đoan code sau :

```
class ViewController: UIViewController {

    private var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initWebView()
        loadRequest()
    }

    //1 - Khởi tạo WKWebView
    private func initWebView() {
        webView = WKWebView()
        webView.navigationDelegate = self
        view = webView
    }

   //2 - Request Instagram login
    private func loadRequest() {
        let authURL = String(format: "%@?client_id=%@&redirect_uri=%@&response_type=code&scope=%@",
                             arguments: [InstagramKey.INSTAGRAM_AUTHURL,
                                         InstagramKey.INSTAGRAM_CLIENT_ID,
                                         InstagramKey.INSTAGRAM_REDIRECT_URI,
                                         InstagramKey.INSTAGRAM_SCOPE])
        guard let url = URL(string: authURL) else { return }
        
        webView.load(URLRequest(url: url))
        webView.allowsBackForwardNavigationGestures = true
    }
    
}
```

Chúng ta focus và mục (2) ở đây một URL để xác thực với instagram với các tham số đầu vào khá rõ ràng đã được mô tả ở phía trên, còn 1 tham số khác đó là **response_type**, ở đây có thể có 2 giá trị **code** hoặc **token**

Để lấy dữ liệu từ Instagram chúng ta có 2 cách :
- Client tự request token và sử dụng API để get data tương ứng với response_type là token
- Client xác thực login với Instagram và sau đó uỷ quyền cho server với mã code để lấy dữ liệu tương ứng với response_type là code

Để đảm bảo an toàn thì phương thức thứ 2 sẽ được khuyên dùng hơn vì nó bảo mật hơn tuy nhiên với trường hợp ứng dụng không có server thì rõ ràng chúng ta chỉ có thể sử dụng phương thức số 1. Thử Run xem chúng ta có gì nào .

![](https://images.viblo.asia/ed8d27bc-a05f-4492-98dc-bedb3ab11798.png)

Okay được cái UI rồi giờ chúng ta sẽ tiếp tục code

```
extension ViewController: WKNavigationDelegate{
    func webView(_ webView: WKWebView,
                 decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: (WKNavigationActionPolicy) -> Void) {
        if checkRequestForCallbackURL(request: navigationAction.request) {
            decisionHandler(.allow)
        }else{
            decisionHandler(.cancel)
        }
    }
    
    private func checkRequestForCallbackURL(request: URLRequest) -> Bool {
        guard let requestURLString = request.url?.absoluteString else { return false }
        print("\(requestURLString)")
        
        if requestURLString.hasPrefix(InstagramKey.INSTAGRAM_REDIRECT_URI) {
            if let range: Range<String.Index> = requestURLString.range(of: "code=") {
                let code = String(requestURLString[range.upperBound...])
                print("receive a code \(code)")
                return false
            }
        }
        return true
    }
}
```

Trong đoạn code phía trên mình có implement  WKNavigationDelegate, đoan code này có hàm để xử lý các backback url mà 
WebView load, code hoặc token sẽ được trả về kèm theo url trong hàm này. 
Mình có viết hàm checkRequestForCallbackURL để kiểm tra và tách lấy code


Okay Run thử về xem kết quả thôi 

![](https://images.viblo.asia/8eb1fbe8-9f65-48f2-bc34-93e12020428e.png)

Tap vào **Save Info** để dùng cho lần sau và check log, chúng ta sẽ nhận được code và gửi code này cho server, với trường hợp muốn lấy token các bạn có thể thay token bằng code trong url.

## 3. Kết

Vậy là mình đã hướng dẫn các bạn cách xác thực user với Instagram, từ code hoặc token các bạn có thể sử dụng [Instagram API](https://www.instagram.com/developer/endpoints/) để get về các dữ liệu mong muốn .

Hi vọng bài viết hữu ích.

Thanks for watching ~