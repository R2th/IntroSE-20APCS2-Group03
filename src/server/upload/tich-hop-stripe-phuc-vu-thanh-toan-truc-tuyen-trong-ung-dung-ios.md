# Tích hợp Stripe phục vụ thanh toán trực tuyến trong ứng dụng IOS

## Stripe là gi ?
![](https://images.viblo.asia/6b6b01a4-b9de-4b98-964b-8da7fcfca850.png)
Nếu có dự định bán sản phẩm trong ứng dụng iOS và tìm kiếm giải pháp thanh toán thì có lẽ Stripe sẽ là lựa chọn hàng đầu của các lập trình viên hiện nay.
Stripe là nền tảng phần mềm tốt nhất cho hoạt động kinh doanh trên internet. Stripe hiện đang thực hiện xử lý hàng tỷ đô la mỗi năm cho các doanh nghiệp trên khắp thế giới.
Stripe cung cấp một trong những thư viện mạnh mẽ nhất để cho phép thanh toán trực tuyến trên các ứng dụng dành cho thiết bị di động. Tripe được xây dựng cho các nhà phát triển. Nó cung cấp Stripe API để có thể được sử dụng bởi rất nhiều các ngôn ngữ như: Ruby, Python, Java, GO.. Bạn sẽ không phải lo lắng về việc mở tài khoản người bán hoặc thiết lập cổng tín dụng. Với Stripe, bạn có thể dễ dàng kích hoạt ứng dụng của mình để nhận thanh toán từ thẻ tín dụng và thậm chí thực hiện thanh toán định kỳ.

ở bài viết này chúng ta sẽ đi sâu vào cách sử dụng stripe phục vụ cho việc thanh toán trực tuyến trong úng dụng ios để thấy được tại sao các doanh nghiệp và các lập trình viên lại lựa chọn nó nhiều như thế.

## Làm quen với Stripe
Đầu tiên, chúng ta cần tạo một tài khoản. Khi tài khoản được khởi tạo, nếu như chưa thực hiện verify các thông tin mà Stripe yêu cầu, thì account sẽ ở trạng thái testing [Đăng ký tại đây](https://dashboard.stripe.com/register).
![](https://images.viblo.asia/72e3ca78-6675-4c00-b718-92594e4769e1.png)
Sau khi tạo thành công 1 tài khoản, hãy login vào và tìm hiểu các tính năng mà Stripe cung cấp cho chúng ta. Màn hình sau khi login thành công sẽ như thế này:
![](https://images.viblo.asia/dc1ecf21-76d2-46cf-a60e-646154f8fda9.png)
Trên menu bên trái là các tính năng mà Stripe cung cấp để chúng ta có thể quản lý được các giao dịch, người dùng, và tài khoản của chúng ta. Payments : Bao gồm các danh sách giao dịch của người dùng qua tài khoản Stripe của chúng ta.
API: Bao gồm các thông tin như version, Secret key và Publishable key... 
![](https://images.viblo.asia/476859a2-3457-4bbb-b08d-a51987f8f3b5.png)
## Publishable key và Secret key là gì?
### Publishable key
Đây là key mà Stripe cung cấp để sử dụng dành cho native khi sử dụng Stripe SDK. Nó được sử dụng để tạo ra được EphemeralKey dùng cho việc thêm card.

### Secret key
Như cái tên của nó, nó là key mà chúng ta cẩn phải giữ kín. Với key này, chúng ta có thể thực hiện các giao dịch như thanh toán, xoá lịch sử giao dịch, refund...

## Cơ chế hoạt động.
![](https://images.viblo.asia/2a94ac70-24b7-44d4-a0e0-5bc6bcdedbf0.png)
Stripe flow:

1. App gửi credit card infomation lên Stripe.
2. Stripe xử lý và trả về token.
3. App gửi token cho back-end.
4. server giao dịch với stripe và nhận kết quả trả về từ Stripe
5. Server thông báo cho app ios kết quả của giao dịch.

Để đỡ tốn thời gian xây dựng ứng dụng thì ở đây mình đã đính kèm project mẫu để từ đó có thể phát triển tiếp lên. Các bạn có thể tải nó [tại đây](https://www.dropbox.com/s/l6z9gegdpe8hmsq/Donate-Template.zip?dl=0). Đây là giao diện demo của ứng dụng:
![](https://images.viblo.asia/341d02d8-e193-4d35-b013-2874e504e9a3.png)
## Tích hợp Stripe vào dự án
thêm các thư viện sau vào Podfile và cài đặt.
``` swift
pod 'Stripe', '~> 4.0'
pod 'AFNetworking', '~> 2.5.4'
```
Thư viện của Stripe được viết trong Objective-C và sử dụng trong dự án swift. Cả hai sẽ không hoạt động cùng nhau mà không có cấu hình đúng nên chúng ta cần thêm file bridging header cho dự án. Chắc các bạn lập trình IOS không lạ gi các tạo file này tuy nhiên mình sẽ đưa lại flow cho các bạn chưa biết

1. Thêm một tệp tiêu đề mới vào thư mục bằng cách bấm chuột phải vào thư mụctrong trình điều hướng dự án, theo sau bằng cách bấm vào “New File…”. 
2. Chọn iOS -> Source category, chọn mẫu "Header File" và nhấp vào Next
3. Đặt tên là “Donate-Bridging-Header.h”, sau đó nhấn tiếp tục để tiếp tục và lưu tệp. 
4. Tiếp theo, vào "Build Settings", và tìm kiếm "Objective-C Bridging Header". Đặt giá trị thành “Donate/Donate-Bridging-Header.h”.
![](https://images.viblo.asia/ffb2d68c-2f37-4d32-8711-6e76f9824071.png)
mở file Donate-Bridging-Header.h và import các thư viện sau vào:
``` swift
#import <Stripe/Stripe.h>
#import <AFNetworking/AFNetworking.h>
```
## Thiết lập Api key
Vào “Account Settings” -> “API keys” và lấy key test và thêm vào trong file delegate như sau:
``` swift
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        
     // Stripe Configuration
     Stripe.setDefaultPublishableKey("pk_test_IeR8DmaKtT6Gi5W7vvySoCiO")
        
     return true
}
```

apple cung cấp 3 cách thanh toán như sau:
1. Thông qua Apple Pay để truy cập thông tin thanh toán được lưu trữ của người dùng
2. Bằng cách sử dụng thành phần biểu mẫu thanh toán được tích hợp của Stripe, PaymentKit
3. Bằng cách tạo biểu mẫu thanh toán của riêng mình

Trong demo này mình sử dụng cách thứ 3 để làm ví dụ:
mở ViewController.swift và update hàm donate() như sau:
``` swift
@IBAction func donate(sender: AnyObject) {
        
        // Initiate the card
        var stripCard = STPCard()
        
        // Split the expiration date to extract Month & Year
        if self.expireDateTextField.text.isEmpty == false {
            let expirationDate = self.expireDateTextField.text.componentsSeparatedByString("/")
            let expMonth = UInt(expirationDate[0].toInt()!)
            let expYear = UInt(expirationDate[1].toInt()!)
            
            // Send the card info to Strip to get the token
            stripCard.number = self.cardNumberTextField.text
            stripCard.cvc = self.cvcTextField.text
            stripCard.expMonth = expMonth
            stripCard.expYear = expYear
        }
}
```

Tiếp tục làm như sau:
``` swift
var underlyingError: NSError?
stripCard.validateCardReturningError(&underlyingError)
   if underlyingError != nil {
        self.spinner.stopAnimating()
        self.handleError(underlyingError!)
   return
}
```
Lớp STPCard đi kèm với phương thức rất tiện dụng được gọi là validateCardReturningError để giúp chúng ta thực hiện logic xác nhận hợp lệ của riêng chúng ta. Lớp này gửi thông tin thẻ đã thu thập đến máy chủ của nó và trả về lỗi nếu thông tin thẻ không hợp lệ.

Tiếp tục thêm đoạn code sau vào trong phương thức:
``` swift
STPAPIClient.sharedClient().createTokenWithCard(stripCard, completion: { (token, error) -> Void in
            
            if error != nil {
                self.handleError(error!)
                return
            } 
 
            self.postStripeToken(token!)
        })
```
Khi chúng tôi xác nhận thẻ tín dụng hợp lệ, chúng tôi sẽ gọi phương thức createTokenWithCard của lớp STPAPIClient để gửi dữ liệu thẻ tín dụng qua yêu cầu HTTPS an toàn. Stripe sẽ trả lại cho bạn một mã thông báo nếu yêu cầu thành công.

Tại thời điểm này, thẻ tín dụng của khách hàng không bị tính phí. Stripe chỉ cung cấp cho bạn mã thông báo một lần. Sau đó, bạn sẽ gửi mã thông báo này đến máy chủ của chính mình và thực hiện tính phí thực tế.

Trong trường hợp không truy xuất được mã thông báo, ứng dụng sẽ chỉ hiển thị lỗi cho người dùng. Chèn phương thức sau vào lớp ViewController:
``` swift
func handleError(error: NSError) {
        UIAlertView(title: "Please Try Again",
            message: error.localizedDescription,
            delegate: nil,
            cancelButtonTitle: "OK").show()
    }
```
## Cài đặt server ở local
Như đã đề cập ở phần đầu của hướng dẫn, việc tính phí thẻ tín dụng của khách hàng thực sự xảy ra trên máy chủ của chính chúng tôi. Vì lý do bảo mật, Stripe không tính phí vào thẻ tín dụng được gửi trực tiếp từ ứng dụng. Nó chỉ tạo cho bạn một mã thông báo. Sau đó, ứng dụng của bạn sẽ chuyển mã thông báo này tới chương trình phụ trợ của bạn để theo dõi việc tính phí thực tế.

Vì vậy, trước khi chuyển sang triển khai ứng dụng, hãy dừng lại một phút và thiết lập máy chủ của chúng tôi để xử lý thanh toán. Để tạo backend của chúng ta, chúng ta sẽ sử dụng PHP làm ngôn ngữ chính và sử dụng thư viện do Stripe cung cấp. Đừng lo lắng. Bạn không cần phải là chuyên gia về phát triển web. Chỉ cần tiếp tục và làm theo các bước như được mô tả và bạn sẽ có thể định cấu hình chương trình phụ trợ bắt buộc để xử lý thanh toán Sọc.

Trước tiên, tải xuống XAMPP (dành cho OS X) v5.6.8 (hoặc lên) và cài đặt nó lên máy Mac của bạn. Tiếp theo, tải xuống tệp nén này và giải nén tệp đó. Sau đó, vào thư mục chứa XAMPP. Thông thường nó được cài đặt trong thư mục "Applications". Mở thư mục "Applications / XAMPP / htdocs", sau đó sao chép thư mục mà bạn vừa giải nén vào đây.
![](https://images.viblo.asia/cda9f033-4380-4ad5-9cfe-2a0d91e67621.png)

Sau khi thực hiện xong, quay trở lại thư mục XAMPP và mở "manager-osx". Khi ra mắt, nhấn nút “start all” trong tab “Manage Server" như hình dưới đây:
![](https://images.viblo.asia/013ffa8c-3818-4c7a-9156-885c868d9016.png)
vào thư mục“Applications/XAMPP/htdocs/donate” sau đó vào payment.php và sửa đổi thay apikey với key test như sau:
```php
\Stripe\Stripe::setApiKey("sk_test_qCTa2pcFZ9wG6jEvPGY7tLOK");
```

## Gửi Mã thông báo để xử lý thanh toán
Trong  ViewController.swift thêm function sau vào:
``` swift
func postStripeToken(token: STPToken) {
 
        let URL = "http://localhost/donate/payment.php"
        let params = ["stripeToken": token.tokenId,
            "amount": self.amountTextField.text.toInt()!,
            "currency": "usd",
            "description": self.emailTextField.text]
        
        let manager = AFHTTPRequestOperationManager()
        manager.POST(URL, parameters: params, success: { (operation, responseObject) -> Void in
            
            if let response = responseObject as? [String: String] {
                UIAlertView(title: response["status"],
                    message: response["message"],
                    delegate: nil,
                    cancelButtonTitle: "OK").show()
            }
            
            }) { (operation, error) -> Void in
                self.handleError(error!)
        }
}
```

Vì chúng tôi đang lưu trữ chương trình phụ trợ cục bộ, URL được đặt thành http: //localhost/donate/payment.php. Nếu bạn lưu trữ tập lệnh trong máy chủ từ xa, vui lòng thay đổi nó cho phù hợp.

Để thực hiện khoản phí thực tế, Stripe yêu cầu chúng tôi gửi mã thông báo, cộng với số tiền thanh toán, tiền tệ và mô tả. Bạn có thể sử dụng trường mô tả làm ghi chú thanh toán. Trong ví dụ này, chúng tôi chỉ sử dụng trường để lưu trữ email của khách hàng.

Khi các tham số được định cấu hình, chúng tôi gửi yêu cầu POST không đồng bộ bằng cách sử dụng AFHTTPRequestOperationManager, một API được cung cấp bởi AFNetworking. Nếu yêu cầu thành công, chúng tôi sẽ hiển thị phản hồi thanh toán cho người dùng.

Đó là nó! Bây giờ bạn có thể chạy ứng dụng và thực hiện giao dịch thử nghiệm. Với mục đích thử nghiệm, bạn có thể sử dụng số thẻ tín dụng 4242 4242 4242 4242, cùng với bất kỳ ngày hết hạn nào trong tương lai (ví dụ: 07/2019) và CVC (ví dụ 222), để mô phỏng giao dịch:
![](https://images.viblo.asia/0894751d-7688-4f4d-ac03-2c4d56971519.png)

Để xác minh thêm nếu thanh toán thành công, bạn có thể xem trang tổng quan của Stripe:
![](https://images.viblo.asia/4eb69850-3fda-4d9a-a05c-b5ff7298f769.png)

## tham khảo
https://stripe.com/docs/mobile/ios
https://www.appcoda.com/ios-stripe-payment-integration/