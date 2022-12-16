Hi mọi người, trong bài viết trước mình đã hướng dẫn các bạn cách [login và sử dụng instagram API](https://viblo.asia/p/dang-nhap-va-su-dung-instagram-api-ORNZqGLL50n) để sử dụng dữ liệu của mạng xã hội này, trong bài viết này mình sẽ tiếp tục hướng dẫn các bạn với một mạng xã hội phổ biến khác đó là [twitter](https://developer.twitter.com/en/docs).

Okay, chúng ta bắt tay vào luôn thôi nào.

## 1. Đăng ký Twitter Developer.

Để được sử dụng twitter api, giống như các social network khác là bạn sẽ phải đăng ký nhà phát triển với network đó, và xin các quyền cần thiết. Các bạn truy cập vào [twitter developer](https://developer.twitter.com/en.html) và login với luôn account twitter của mình.

![](https://images.viblo.asia/80b302a8-2c0a-4883-a0c7-ca07148fad49.png)

Chọn [apply](https://developer.twitter.com/en/apply-for-access) để tiến hành đăng ký nhà phát triển.

![](https://images.viblo.asia/6c2f4355-c99d-4eb3-8fd4-ca1ad5d1d5ff.png)

Okay, sau khi apply bạn sẽ tới page để setup trước khi sử dụng, các bước step by step khá đơn giản
- Step 1 : Lựa chọn 1 option cho câu hỏi "What is your primary reason for using Twitter developer tools?"
- Step 2 : Cập nhật 1 số thông tin cá nhân
- Step 3 : Điền mô tả về cách bạn sử dụng data của twitter ... , đây là bước khá quan trọng quyết định việc twitter có duyệt cho phép bạn trở thành nhà phát triển hay không
- Step 4 : Twitter sẽ hiển thị lại cho phép các bạn check lại một lượt các thông tin mà bạn đã cung cấp, các bạn có thể edit bằng cách back về các step trước.
- Step 5 : Finaly, bước này chỉ cần tick vào chấp nhận điều khoản của twitter và ấn submit.
- Step 6 : Login vào email đăng ký để xác thực.


Done 6 bước để bạn đăng ký thành nhà phát triển của twitter, giờ chỉ còn chờ kết quả thôi :] hi vong là bạn không bị reject.

## 2. Thực hiện login twitter.

Việc login twitter chúng ta có 2 cách sử dụng thư viện viết sẵn cho twitter như [twitterkit](https://github.com/twitter-archive/twitter-kit-ios/wiki),  [Swifter](https://github.com/mattdonnelly/Swifter) hoặc sử dụng Oauth như [OAuthSwift](https://github.com/OAuthSwift/OAuthSwift). Ở đây mình sẽ hướng dẫn các bạn sử dụng Oauth vì nó là phương thức xác thực rất phổ biến và được tích hợp với các ứng dụng cung cấp dữ liệu thứ ba. Các thư viện khác tuy khá tiện dụng vì còn cung cấp các func khác ngoài xác thực tài khoản, tuy nhiên bạn sẽ phải luôn để ý cập nhật các bản vá lỗi và thay đổi có thể làm ứng dụng của bạn hoạt động không chính xác, ví dụ như twitterkit sẽ không tiếp tục được support trong tương lai và đã thông báo cho các nhà phát triển để thay thế.

Okay, giờ chúng ta sẽ bắt tay vào implement thôi.


Đầu tiên chúng ta tạo project, sau khi hoàn thành chúng ta sẽ sử dụng cocoapod để install thư viện OAuthSwift

> pod 'OAuthSwift', '~> 2.0.0'

Bước tiếp theo chúng ta cần tạo ra key trong twitter develop console. Để làm được việc này thì chắc chắn tài khoản nhà phát triển của bạn đã được approve bởi twitter, nó khá tương tự với instagram chúng ta cần setup để có 3 tham số :
- consumerKey :        **XXXXXXXXX**
- consumerSecret :   **YYYYYYYYY**
- callback URL  :         **oauth-swift://oauth-callback/twitter**

Ok, phía trên là mình bịa ra 3 tham số để dùng cho ví dụ dưới này nhé.

Xong bước này chúng ta tiếp tục với Xcode, vào file .plist và add thêm đoạn mã sau :

```
<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>oauth-swift://oauth-callback/twitter</string>
			</array>
		</dict>
    <array>
```
        
 Mục đích của đoạn code trên là để ứng dụng của chúng ta có quyền để mở safari để xác thực với callback URL đã đăng ký.
        
  Tiếp đến chúng ta sẽ viết hàm để login với twitter sử dụng.
  
```

// Tạo struct để lưu trữ TwitterSession
struct TwitterSession {
    var token: String
    var secret: String
}

typealias Session = (_ token:TwitterSession?,_ error:Error?) -> Void
var oauthswift: OAuth1Swift!

func loginWithTwitter(_ fromViewController:UIViewController,_ completion:@escaping Session) {
 
         // 1 : Khởi tạo OAuth1Swift với các tham số 
        oauthswift =  OAuth1Swift(consumerKey: "XXXXXXXXX",
                                  consumerSecret: "YYYYYYYYY",
                                  requestTokenUrl: "https://api.twitter.com/oauth/request_token",
                                  authorizeUrl: "https://api.twitter.com/oauth/authorize",
                                  accessTokenUrl: "https://api.twitter.com/oauth/access_token")
       
       // 2 : Sử dụng SafariURLHandler để không cần chuyển hướng sang safari browser.
        let safariHandler = SafariURLHandler(viewController: fromViewController, oauthSwift: oauthswift)
        oauthswift.authorizeURLHandler = safariHandler
        
        // 3 : Tạo callback url mà chúng ta đã setup trước đó.
        guard let callBackURL = URL(string: "oauth-swift://oauth-callback/twitter") else { return }
        
        // 4: Thưc hiện gọi hàm authorize
        handle = oauthswift.authorize(withCallbackURL: rwURL, completionHandler: { (response) in
            switch response {
            case .success(let result):
                // 5 : gọi block trả về token sử dụng cho các api khác.
                let credential = result.credential
                let session = TwitterSession.init(token: credential.oauthToken,
                                                                                              secret: credential.oauthTokenSecret)
                completion(session, nil)
            case .failure(let error):
                completion(nil, error)
            }
        })
    }
```

Okay hàm trên mình đã sử dụng OAuth1Swift để xác thực với Twitter và lấy twitter session, giờ chúng ta có 2 cách hoặc là trực tiếp gọi API từ phía client hoặc là sử dụng backend server để thực hiện thay client, tuỳ theo ứng dụng mà các bạn có thể lựa chọn phương thức tốt nhất cho mình.

## Kết.

Như vậy qua bài viết này mình đã hướng dẫn các bạn cách xác thưc để sử dụng các data của Twitter, hi vọng bài viết hữu ích.

Thanks for watching ~