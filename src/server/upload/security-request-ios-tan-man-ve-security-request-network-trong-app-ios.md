> Configuring App Transport Security Exceptions in iOS 9 and OSX 10.11
# Tản mạn.
Cũng làm iOS được hơn nửa năm cũng qua mấy dự án rồi nhưng có một vấn đề rất nhỏ mà đôi khi chúng ta gần như ít để ý đến là **security** trong request đến các remote http và https.

> Gần đây, đang trong dự án bị khách hàng dí check security app mới ngớ ra chả biết vẹo gì cả.
> Tham khảo bên android thì cùng vấn đề bảo mật nhưng iOS lại có một chút khác biệt nên cũng mò trong 2 - 3 ngày cũng ra được một vào bài báo đọc và tản mạn lại bài này hi vọng sẽ giúp ích cho ai đó.

# SSL là gì?
SSL hay Secure Sockets Layer. Đây là một tiêu chuẩn an ninh công nghệ toàn cầu tạo ra một liên kết giữa máy chủ web và client. Liên kết này đảm bảo dữ liệu trao đôỉ giữa client và web server luôn được bảo mật và an toàn.

SSL đảm bảo tất cả dữ liệu truyền giữa máy chủ và client được mang tính riêng tư và tách rời.

## Cách làm việc.
1. SSL mã hoá các thông tin nhạy cảm trong quá trình connect ví dụ như dữ liệu người dùng truyền lên qua form.
2. Mỗi chứng chỉ SSL được tạo ra cho một Website là duy nhất.
3. Một cơ quan uy tín đã xác thực danh tính chủ nhân của website trước khi cấp chứng chỉ SSL.

## Khi client kết nối đến máy chủ.
1. Client yêu cầu webserver cung cấp thông tin xác nhận danh tính.
2. Webserver gửi cho client chứng chỉ SSL của nó được cấp.
3. Client kiểm tra chứng chỉ SSL có thực hay không. Nếu đúng, nó thông báo lại cho webserver chứng chỉ được chấp nhận.
4. Webserver gửi lại chữ ký số dùng để mã hoá và giải mã trong suốt quá trình connect tiếp theo.
5. Dữ liệu connect được mã hoá.

# App Transport Security (ATS) là gì?
Theo khái niệm của Apple thì đại khái là như sau:

ATS cho phép ứng dụng cấu hình trong info.plist để chỉ định tên miền mà ứng dụng cần connect liên kết an toàn hay không. ATS ngăn cản việc bảo mật mà ứng dụng tình cơ tiết lộ thông tin, cung cấp hành vi bảo mật mặc định và dễ dàng áp dụng. 
Bạn nên sử dụng ATS càng sớm càng tốt. Bất kể là bạn tạo ứng dụng mới hay là cập nhật ứng dụng có sẵn.

Nếu bạn phát triển một app mới thì bạn nên sử dụng giao thức HTTPS. Nếu bạn đã có một ứng dụng thì bạn nên sử dụng HTTPS ngay bây giờ và tạo một kế hoạch cho việc cập nhật phần còn lại của app càng sớm càng tốt.

> Nói một cách đơn giản: Nếu app của bạn kết nối đến HTTP server thì app sẽ không được hỗ trợ giao thức SSL mới nhất, vào kết nối của bạn sẽ fail với lỗi gần như là:
```
CFNetwork SSLHandshake failed (-9801)
Error Domain=NSURLErrorDomain Code=-1200 "An SSL error has occurred and a secure connection to the server cannot be made." ....
```

Tóm lại: Bạn thấy rằng kết nối của bạn đang cố gắng thay đổi giao thức http thành https để bảo vệ các lỗi trong mã của bạn nơi mà bạn vô tình cấu hình trên URL chẳng hạn. 


> WARINING: ATS sẽ tốt cho cả bạn và người dùng app của bạn vì vậy bạn không nên tắt nó đi.
## Tại sao?
Lý do mà Apple thúc đẩy mạnh mẽ việc buộc các kết nối an toàn vì điều đó là tốt cho các ứng dụng. Giúp bảo vệ dữ liệu người dùng trong các kết nối không dây không an toàn.
Đôi khi có một số ngoại lệ nhưng không phải vì thế mà bạn ngưng sử dụng ATS.

Nếu app của bạn kết nối đến APIs thứ 3 mà không control được với những APIs không hỗ trợ kết nối SSL hay những giao thức cho phép bạn tải dữ liệu về như ứng dụng APIs đọc báo .... thì những kỹ thuật sau có thể giúp ích cho bạn

# Vượt qua ngoại lệ ATS.
## Ngoại lệ tên miền.
Một số connect của bạn không hỗ trợ SSL thì trong **Info.plist** bạn cấu hình như sau: 
```
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSExceptionDomains</key>
  <dict>
    <key>YOURSERVER.COM</key>
    <dict>
      <!--Include to allow subdomains-->
      <key>NSIncludesSubdomains</key>
      <true/>
      <!--Include to allow HTTP requests-->
      <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
      <true/>
      <!--Include to specify minimum TLS version-->
      <key>NSTemporaryExceptionMinimumTLSVersion</key>
      <string>TLSv1.1</string>
    </dict>
  </dict>
</dict>
```

> Ngoài ra còn một số key để bạn có thể cấu hình.

```
NSRequiresCertificateTransparency
NSTemporaryExceptionRequiresForwardSecrecy
NSTemporaryThirdPartyExceptionAllowsInsecureHTTPLoads
NSTemporaryThirdPartyExceptionMinimumTLSVersion
NSTemporaryThirdPartyExceptionRequiresForwardSecrecy
```

Trường hợp trên khi bạn biết chắc tên miền được sử dụng. Thế trong trường hợp bạn không chắc chắn có bao nhiêu tên miền cần exception thì sao???
## Nhưng nếu tôi không biết tất cả các miền không an toàn tôi cần sử dụng thì sao?
Nếu trong app của bạn cần load dữ liệu tuỳ ý. Apple cung cấp một cách disable ATS hoàn toàn. Nhưng tôi khuyên các bạn là **KHÔNG NÊN** làm như vậy.
```
<key>NSAppTransportSecurity</key>
<dict>
  <!--Include to allow all connections (DANGER)-->
  <key>NSAllowsArbitraryLoads</key>
      <true/>
</dict>
```
# Mặc định SSL Pining của Alamofire.
Mặc định Alamofire sẽ đánh giá chuỗi chứng chỉ được cung cấp bởi máy chủ bằng cách sử dụng tính năng xác thực được Apple xây dựng và cung cấp bảo mật.
# SSL pinning. 
## Khi nào sử dụng SSL pinning?
- Khi app của bạn chỉ muốn giao tiếp với chính máy chủ chỉ định. Một trong những điều kiện tiên quyết của việc ghim SSL là lưu chứng chỉ SSL máy chủ vào bên trong ứng dụng.

## Cấu hình trên Alamofire.
- Để cấu hình trên Alamofire cũng khá đơn giản. Việc truy xuất data của chứng chỉ là tuỳ chọn vì mặc định Alamofire có phương thức **ServerTrustPolicy.certificatesInBundle()** mặc định sẽ quét tất cả file ceritifcate bên trong bundle và trả về data.

- Đầu tiên chúng ta khởi tạo đối tượng **ServerTrustPolicy** để nạp các chứng chỉ. Chúng ta cung cấp đối tượng **ServerTrustPolicyManager** được khởi tạo với 1 ánh xạ đến tên miền của đối tượng **ServerTrustPolicy**
- Trong Alamofire chúng ta đang ghim các tên miền đã biết trước. Ví dụ dưới đây là *github.com* chứ không ghim cho tất cả các tên miền.

```
# Cấu hình.
func configureAlamoFireSSLPinning {
        let pathToCert = NSBundle.mainBundle().pathForResource(githubCert, ofType: "cer")
        let localCertificate:NSData = NSData(contentsOfFile: pathToCert!)!

        self.serverTrustPolicy = ServerTrustPolicy.PinCertificates(
            certificates: [SecCertificateCreateWithData(nil, localCertificate)!],
            validateCertificateChain: true,
            validateHost: true
        )

        self.serverTrustPolicies = [
            "github.com": self.serverTrustPolicy!
        ]

        self.afManager = Manager(
            configuration: NSURLSessionConfiguration.defaultSessionConfiguration(),
            serverTrustPolicyManager: ServerTrustPolicyManager(policies: self.serverTrustPolicies)
        )
}


# Request bình thường.
func alamoFireRequestHandler {
        self.afManager.request(.GET, self.urlTextField.text!)
            .response { request, response, data, error in
         // response management code
     }
}
```

# Phân tích code ở trên
1. ServerTrustPolicy
ServerTrustPolicy liệt kê đánh giá sự tin cậy của máy chủ dựa trên một *URLAuthenticationChallenge* khi kết nối đến server HTTPS.
```
let serverTrustPolicy = ServerTrustPolicy.pinCertificates(
    certificates: ServerTrustPolicy.certificates(),
    validateCertificateChain: true,
    validateHost: true
)
```

Có nhiều trường hợp đánh gía uỷ thác máy chủ khác nhau cho phép bạn kiểm soát quy trình xác thực.

- ```performDefaultEvaluation```:Sử dụng đánh giá tin cậy máy chủ mặc định trong khi cho phép bạn kiểm soát xem có xác thực máy chủ được cung cấp bởi chứng chỉ hay không
- ```pinCertificates```: Sử dụng ghim chứng chỉ (Certificate). Độ tin cậy của máy chủ được coi là hợp lệ nếu một trong các chứng chỉ được ghim (Tức là được download và add vô bundle app của chúng ta.) khớp với một trong các chứng chỉ máy chủ.
- ```pinPublicKeys```: Sử dụng Publish key để ghim máy chủ. Độ tin cậy của máy chủ được coi là hợp lệ nếu một trong các khóa công khai được ghim khớp với một trong các khóa công khai của chứng chỉ máy chủ.
- ```disableEvaluation```: Vô hiệu hóa tất cả các đánh giá mà lần lượt sẽ luôn luôn xem xét bất kỳ sự tin tưởng máy chủ nào là hợp lệ.
- ```customEvaluation```: Ngoài ra có thể custom thêm.
2. Server Trust Policy Manager
Chịu trách nhiệm lưu trữ một nội bộ về certificate cho một máy chủ cụ thể.
```
let serverTrustPolicies: [String: ServerTrustPolicy] = [
    "test.example.com": .pinCertificates(
        certificates: ServerTrustPolicy.certificates(),
        validateCertificateChain: true,
        validateHost: true
    ),
    "insecure.expired-apis.com": .disableEvaluation
]

let sessionManager = SessionManager(
    serverTrustPolicyManager: ServerTrustPolicyManager(policies: serverTrustPolicies)
)
```

Kết quả:
> Mọi yêu cầu cho miền github.com đều thông qua xác thực ghim SSL!