Trên app store chúng ta dễ dàng gặp những ứng dụng free kiếm tiền bằng quảng cáo, ứng dụng phải trả tiền để mua hay các ứng dụng free các chức năng cơ bản và sau đó bán các gói dịch vụ nâng cấp,...
Không giống với android, đối với loại ứng dụng mà người dùng trực tiếp thanh toán trên ứng dụng luôn được Apple kiểm duyệt rất chặt chẽ để bảo vệ người dùng, không phải ứng dụng nào tổ chức nào cũng có thể sử dụng dịch vụ bên thứ 3 để thanh toán.
Còn về phía người dùng chắc chắn họ cũng không muốn bị lừa đảo, chắc chắn ai cũng muốn sử dụng một phương thức thanh toán nhanh chóng, tin cậy và bảo mật, mặt khác nữa dòng tiền từ người dùng tới người bán luôn bị chiết khấu qua bên thứ 3, rõ ràng đây là một nguồn tiền mà Apple chẳng thể bỏ qua.

Apple cung cấp cho developer một API gọi là In-App Purchase để thiết kế một hệ thống bán các dịch vụ trong ứng dụng, nó cấp cấp khả năng đa dạng các dịch vụ và người dùng thanh toán trực tiếp thông qua tài khoản Apple ID. Có 4 kiểu in-app purchases :
- Consumable : Người dùng có thể mua một vật phẩm trong ứng dụng, ví du : mua thêm lượt chơi, vật phẩm trong game, hay mua thêm lượt tìm bạn, lượt thích hay tặng quà trong các ứng dụng hẹn hò,... đặc điểm chung của loại vật phẩm này là người dùng có thể mua 1 hay nhiều lần không giới hạn về thời gian.
- Non-Consumable : Đây là loại mà khi người dùng có thể mua và sử dụng mãi mãi, ví dụ trong ứng dụng chat người dùng có thể mua một gói sticker và có thể dùng nó mãi mãi, kể các trong trường hợp người dùng xoá ứng dụng hay cài đặt sang thiết bị khác, trong trường hợp này apple sẽ lưu trữ nội dung mà người dùng đã thanh toán.
- Auto-Renewable Subscriptions : Đây là một kiểu thanh toán khá mới được công bố trước WWDC 2016, sử dụng cho các loại trả phí để sử dụng dịch vụ trong một khoảng thơi gian và sau đó có thể tự động gia hạn. Ví dụ người dùng trả tiền để đọc truyện miễn phí trong 1 tháng và được tự động gia hạn theo định kỳ cho đến khi người dùng huỷ. Có một điều đặc biệt trong kiểu in-app purchases này, đó là nó được Apple rẩt khuyến khích sử dụng ví dụ tỷ lệ ăn chia cho các giao dịch thông thường là 30% chiết khấu cho Apple tuy nhiên nếu sử dụng loại này thì Apple sẽ chỉ chiết khấu 15%, điều này được Apple giải thích là họ mong muốn giúp người dùng không phải đăng ký lại mỗi lần hết hạn, tuy nhiên một mục đích khác mà developer và Apple cùng được hưởng đó là người dùng sẽ sử dụng dịch vụ lâu dài hơn.
- Non-Renewing Subscriptions : Loại này giống hệt Auto-Renewable Subscriptions ở điểm nó bán một loại dịch vụ trả phí giới hạn thời gian, điểm khác biệt duy nhất là nó sẽ không tự động gia hạn khi hết hạn.

Với 4 loại trên có lẽ chúng ta có đầy đủ các phương thức để thiết lập thanh toán cho ứng dụng của mình, giờ bắt đầu vào implement chúng thôi nào.

### 1. Setup môi trường.

Việc đầu tiên là bạn phải đồng ý với các thoả thuận thanh toán, thuế và cung cấp thông tin về ngân hàng để nhận tiền từ người dùng.
[Agreements, tax, and banking overview](https://help.apple.com/app-store-connect/#/devb6df5ee51)

Bạn sẽ cần phải truy nhập vào [itunes-connect](https://appstoreconnect.apple.com/) và truy cập vào Agreements, tax, and banking và setup Paid Application.

![](https://images.viblo.asia/078aef66-0b6b-40c7-98e4-c07f4bef577b.png)

### 2. Cài đặt payment

Trong [itunes-connect](https://appstoreconnect.apple.com/) truy cập vào my Apps

![](https://images.viblo.asia/c1bf040d-e21f-4bd9-ae45-38a051747597.png)

Các bước tiếp theo nếu chưa tạo newApp thì bạn tạo app còn nếu tạo rồi thì chúng ta click vào features -> In-app Purchases

![](https://images.viblo.asia/c3bcd8fc-2d73-4999-92ff-96be6dcf92f2.png)


Okay, ở đây chúng ta sẽ tạo một item kiểu Consumable, click vào dấu + để thêm In-app Purchases, và tick vào Consumable, và create

![](https://images.viblo.asia/21c55ee1-a914-4adc-bc1c-00a990a63403.png)


Chúng ta sẽ có giao diện để điền các thông tin chi tiết

![](https://images.viblo.asia/6a8d9fa8-1039-452e-864c-e20e019663c0.png)

Trong màn này chúng ta thêm các thông tin :
- Reference Name : Tên này sẽ giúp bạn gợi nhớ và không hiển thị cho người dùng nên hãy chọn cái tên nào mà khi bạn nhìn vào đó hiểu ngay item này nó làm gì.
- Product ID : Đây là một trường quan trọng nó là định danh duy nhất cho 1 loại hàng bạn sẽ bán, bạn sẽ cần nó để matching trong code thông thường id này nên để dạng app bundleId + name
- Cleared for Sale : tick vào nếu bạn muốn enable việc bán sản phẩm này
- Pricing : lựa chọn giá bán, mặc định apple sẽ quy định ra các tier, do đó chúng ta không thể điền bừa môt gía trị nào đó mà phải chọn trong đây.
- Localizations : đây chính là phần sẽ hiển thị cho người dùng, bạn sẽ chọn Localizations tuỳ theo từng ngôn ngữ
- Review Information : Bạn sẽ phải cung cấp ảnh chụp design chức năng thanh toán trên app tương ứng với những gi bạn đang setup, bên cạnh đó là mô tả và giải thích cho chức năng này, điều này phục vụ cho việc review của apple.

Cuối cùng ấn save và xem kết quả. Nếu bạn thấy báo trạng thái Missing Metadata có nghĩa là các thông tin bạn điền còn thiếu và cấn bổ sung cho tới khi thấy trạng thái Ready to Submit nhé.

### 3. Thiết lập tài khoản test

Khi chưa public lên store chúng ta cần account có thể test việc thanh toán, chúng ta truy cập vào  Users and access để thêm tài khoản test.

![](https://images.viblo.asia/28369b6e-e923-4ce2-8f0c-8cbc93ed5e5d.png)

Chọn testers vào thêm user. Một chú ý chỗ nào, account test phải là email chưa đăng ký apple Id

![](https://images.viblo.asia/733e74b2-859a-4d63-aab1-9247fa7182a8.png)

### 4. Implement Code

- Đầu tiên là enable chế độ In-App Purchases 

![](https://images.viblo.asia/ef3f3c66-fb46-4cf7-a4da-481101b696e7.png)

Cuối cùng cũng đến lúc chúng ta bắt đầu code.

Chúng ta sẽ tạo một model cho việc payment đặt tên là PaymentViewModel

```
import StoreKit
final class PaymentViewModel: BaseViewModel {
    
    var validProducts: [SKProduct] = []
    let productIds = ["com.test.like"]
    var productsRequest: SKProductsRequest?
    
    func fetchAvailableProducts() { //1
        let productIdentifiers = Set(productIds)
        productsRequest = SKProductsRequest(productIdentifiers: productIdentifiers)
        productsRequest?.delegate = self
        productsRequest?.start()
    }
    
    func purcharseProduct(_ productId: String) { //2
        guard canMakePurchases(), validProducts.count > product.rawValue else {
            errors.onNext(Language.alertCannotPayment.rawValue)
            return 
        }
        
        guard let skProduct = validProducts.filter({ $0.productIdentifier == productIds }).first else {
            return 
        }
        
        let payment = SKPayment(product: validProduct)
        SKPaymentQueue.default().add(self)
        SKPaymentQueue.default().add(payment)
    }
    
 }
 
 extension PaymentViewModel:  SKProductsRequestDelegate, SKPaymentTransactionObserver {
   private func canMakePurchases() -> Bool {
      return SKPaymentQueue.canMakePayments()
   }
    
    func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) {
        validProducts = response.products
        for product in validProducts {
            print("product id \(product.productIdentifier) price : \(product.price)")
        }
    }
    
    func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction]) {
        for transaction in transactions {
            Log.debug(message: transaction.error?.localizedDescription ?? "Empty")
            paymentTransaction.onNext(transaction)
            switch transaction.transactionState {
            case .purchasing:
                print("Purchasing")
            case .purchased:
                print("purchased")
                savePaymentInfo()
                SKPaymentQueue.default().finishTransaction(transaction)
            case .restored:
                SKPaymentQueue.default().finishTransaction(transaction)
                print("restored")
            case .failed:
                print("failed")
            case .deferred:
                break
            }
        }
    }
}
```

Okay tất cả đoạn code implement chỉ đơn giản như trên :
- Bước 1: Chúng ta có hàm **fetchAvailableProducts()**, mục đích của hàm này là chúng ta sẽ lấy các product mà được enable bới Apple, chúng ta sẽ lắng nghe delegate trong hàm 
> func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) 
> 

sau đó save các product để sử dụng sau này.

- Bước 2 : Khi người dùng click vào button để mua một item nào đó, chúng ta có hàm **purcharseProduct()** truyền vào Id của product, id này chính là Id mà chúng ta setup ở bước số 2, chúng ta cần kiếm tra xem product này có hợp lệ hay không, nếu mọi thứ ổn chúng ta sẽ tạo ra một payment và add chúng vào SKPaymentQueue.

- Bước 3 : Mọi việc bây giờ chỉ là thao tác của người dùng với device để thiết lập thanh toán, trang thái của thanh toán sẽ được lắng nghe ở hàm 
> func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction]).
> 
Ở đây chúng ta có 5 trạng thái :
- purchasing : nghĩa là đang thanh toán
- purchased : là thanh toán thành công
- restored : trả về trong trường hợp chúng ta gọi hàm restore để lấy lịch sử các giao dich được lưu trữ bởi apple
- failed : là thất bại
- deferred : là thanh toán vẫn trong hàng đợi và đang chờ action từ bên ngoài, nó có thể gây ra bởi nguyên nhân ví dụ như thanh toán của bạn chưa hoàn tất còn vướng ở đâu đó.

### 5. Kết thúc 

Như vậy mình đã giới thiệu cho các bạn về In-App purchases và cách implement, trong bài viết này phần implement mình chỉ đưa ra phần basic nhất để bạn có thể thực hiện việc payment, tuy nhiên để việc thanh toán hoàn hảo thì luồng thanh toán từ người dùng tới ứng dụng cần phải cải thiện để đảm bảo cho các trường hợp lỗi xảy ra, mình sẽ đề cập tới trong bài viết tiếp theo. 

Thanks for watching ~