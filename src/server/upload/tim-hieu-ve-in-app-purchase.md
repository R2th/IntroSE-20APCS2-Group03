Trong bài viết này mình sẽ giới thiệu về In-app purchase (IAP) qua việc xây dựng một ứng dụng đơn giản sử dụng IAP.
IAP cho phép người dùng có thể tính phí một chức năng hay một content cụ thể trong khi sử dụng. Việc thực hiện IAP được sử dụng nhiều do một số lý so sau:

* Đó là 1 cách để kiếm tiền, ngoài việc trả tiền cho việc bán ứng dụng thì người dùng vẫn luôn sẵn sàng trả thêm tiền để dùng các tính năng mở rộng hơn.
* App có thể được download free. Sau đó trong khi sử dụng người dùng phải trả tiền để sử dụng các tính năng hay nội dung mở rộng hơn. Người dùng sẽ thích sử dụng các app free hơn là những app mất tiền để tải.
* Bạn có thể hiển thị quảng cáo để người dùng  trong một ứng dụng có thể tuỳ chọn xoá chúng bằng các mua IAP.
* Sau lần phát hành đầu tiên của một ứng dụng, nội dung trả phí mới có thể được thêm vào cùng một ứng dụng thay vì phải phát triển một ứng dụng hoàn toàn mới để kiếm thêm tiền.

## Bắt đầu
Bây giờ chúng ta sẽ cùng nhau xây dựng một ứng dụng đơn giản dùng IAP để hiểu rõ hơn về nó. Ứng dụng có tên là "RaceFaces", cho phép người dùng mua "RazeFace", coi nó giống như 1 cuốn sách hay một item nào đó cần mua trong app.
Ứng dụng có màn hình đơn giản như sau:
![](https://images.viblo.asia/287aba64-a652-421a-8a4a-9e922d099202.png)
Màn hình này có 1 tableview để hiển thị list danh sách item có thể mua được. Nút **Store** để quay về trong thái mua trước đó sau khi gỡ app. Các đối tượng mua được lưu trong mảng SKProduct object. Đối tượng này đơn giản là một cấu trúc chưa các thông tin về các item trong app.
Trước khi làm bất kì điều gì liên quan tới IAP thì điều quan trọng nhất là phải thực hiện setup trong iOS Developer Center và App Store Connect.
## Tạo App ID
Đầu tiên, bạn phải tạo App ID. ID này để liên kết app của bạn với các product có thể mua được trên IAP. Đăng nhập trên trang Apple Developer Center, sau đó chọn Certificates, IDs và Profiles.
![](https://images.viblo.asia/498c06c1-aaa8-40eb-88ba-4144bc978dad.png)
Sau đó chọn Identifiers > AppIDs, sau đó click + ở phía góc bên tay phải để tạo App ID mới.
![](https://images.viblo.asia/bae622f4-2d53-4547-9264-100251373f8c.png)
Điền các thông tin cho App ID. Điền RazeFace IAP Tutorial App cho trường Name. Chọn Explicit App Id và nhập Bundle Id của app.
Kéo xuống dưới mục App Service. Chú ý rằng In-App Purchase và GameCenter được mặc định là enabled. Click Continue > Register > Done.
 Vậy là đã tạo xong App ID.
 
## Checking Your Agreements
Trước khi thêm IAP vào app trong iTunes Connect, bạn phải làm 2 điều sau:
* Chắc chắn rằng bạn đã đồng ý bản Apple Development Program License Agreement mới nhất trong developer.apple.com
* Đảm bảo rằng bạn đã đồng ý bản Paid Applications mới nhất trong Agreements. Tax và Billing trong App Store Connect.
Nếu bạn chưa làm 2 điều trên, iTunes Connect sẽ cảnh báo bạn như hình sau:
![](https://images.viblo.asia/85434d17-5c7a-46c9-9c27-80cbb12c8273.png)
Nếu bạn thấy trên Request Contracts có dòng Paid Application, sau đó nhấn Request. ĐIền tất cả các thông tin cần thiết sau đó submit. Chờ một lúc cho request của bạn được approve.
## Tạo App trong iTunes Connect
Ở góc trái màn hình click App Store Connect, sau đó chọn My Apps.
Tiếp theo, chọn + ở góc trái của trang và chọn New App để thêm 1 app mới. Điền các thông tin sau đây:
![](https://images.viblo.asia/6dc5fccb-6aff-4922-b96c-3b52275ed954.png)
Nên nhớ là trường Name không được phép trùng trong App Store. 
Chọn Create.
## Tạo In-App Purchase Products
Có 1 số loại IAP bạn có thể thêm như sau:
* Consumable: Có thể mua nhiều hợn một lần và có thể sử dụng hết. Loại này phù hợp cho việc thêm mạng, thêm tiền trong game,...
* Non-Consumable: Mua 1 lần và sử dụng mãi mãi. Giống như việc mua thêm level mới hoặc mua 1 content mới. Trong bài hướng dẫn này mình sử dụng loại này.
* Non-Renewing Subscription: Content có thể sử dụng được trong 1 khoảng thời gian cố định.
* Auto-Renewing Subcription: Lặp lại việc mua theo từng tháng.
Để chọn các loại này, chọn tab Feature và sau đó chọn In-App Purchase. Để thêm 1 IAP product, chọn + ở góc phải của mục In-App Purchase.
![](https://images.viblo.asia/cf74b0d1-5e48-4ceb-8f27-a7a33193824a.png)
Bạn sẽ thấy dialog sau:
![](https://images.viblo.asia/e3205267-48b9-43d1-8490-a6e35a59e48a.png)
Chọn 1 loại bạn muốn, sau đó chọn Create.
Tiếp theo, điền các thôg tin chi tiết sau:
* Reference Name: Đây là tên tiêu đề của ứng dụng khi bạn thực hiện mua
* Product ID: Đây là chuỗi duy nhất của IAP. Thường thì sẽ bắt đầu bằng Bundle ID và sau đó là tên của sản phẩm.
* Cleared for Sale: Enable hoặc disable cho IAP sale. Enable nếu muốn sale sản phẩm.
* Price Tier: Giá của IAP
Kéo xuống Localizations và chọn vùng miền (mặc định ngôn ngữ là Tiếng Anh). ĐIền Display Name và Description. Sau đó chọn Save. Vậy là đã tạo xong 1 IAP Product.
![](https://images.viblo.asia/6e97d1c9-54c4-4ad8-a6cd-8d88288ca079.png)
Tiếp theo, bạn cần tạo 1 tài khoản sandbox để có thể thực hiện mua bán.
## Tạo Sandbox User
Trong App Store Connect, chọn App Store Connect ở góc bên trái cửa sổ để trở về trang chủ. Chọn User and Roles, sau đó chọn Sandbox Testers tab. Chọn + ở bên cạnh chữ Tester.
![](https://images.viblo.asia/764ece21-6b6d-4b56-8440-a996db4d4645.png)
Bạn điền thông tin và Save. Bạn có thể điền tên gì cũng được nhưnng phải là email thật vì cần thực hiện xác thực email sau đó. Khi nhận được mail, click vào đó để hoàn thành xác thực.

## Project Configuration
Bây giờ chúng ta sẽ bắt tay vào việc tạo project.
Nên nhớ rằng bundle ID và Tên App cần phải match với những gì bạn đã tạo ở trên Developer Center và App Store Connect.
Chọn RazeFaces project ở góc trên của Xcode, sau đó chọn Targets. Chọn General tab, 
![](https://images.viblo.asia/55f8200c-1b66-4538-b9e6-50396e1b5fc1.png)
Sau đó chọn Capabilities tab, kéo xuống dưới chỗ In-App Purchase và chọn ON.
![](https://images.viblo.asia/8e98fcce-df61-4e01-a58d-5dc059617318.png)
Mở file RazeFaceProducts.swift. Tạo 1 biến hằng là SwiftShoping để đại diện cho IAP product bạn đã tạo ở trên. Gán giá trị cho biến là chuỗi Product ID mà bạn đã tạo ở App Store Connect. 
```
public static let SwiftShopping = "com.theNameYouPickedEarlier.razefaces.swiftshopping"
```
## Listing In-App Purchases
Tạo 1 file có tên là IAPHelper. Nhiện vụ của file này là chứa các hàm để gọi đến StoreKit API, thực hiện việc lấy list sản phẩm và mua sản phẩm.
Mở file IAPHelper.swift, tạo 1 property:
```
private let productIdentifiers: Set<ProductIdentifier>
```
Tiếp theo, thêm đoạn code sau vào hàm` init(productIds:)` trước khi gọi `super.init()`
```
productIdentifiers = productIds
```
Tiếp theo, thêm thuộc tính sau:
```
private var purchasedProductIdentifiers: Set<ProductIdentifier> = []
private var productsRequest: SKProductsRequest?
private var productsRequestCompletionHandler: ProductsRequestCompletionHandler?
```
`purchasedProductIdentifiers` để theo dõi các items đã được mua. 2 properties còn lại được sử dụng `SKProductsRequest` delegate để thực hiện request App servers.
Tiếp theo, vẫn trong file IAPHelper.swift thực hiện hàm `requestProducts(_:)`
```
public func requestProducts(completionHandler: @escaping ProductsRequestCompletionHandler) {
  productsRequest?.cancel()
  productsRequestCompletionHandler = completionHandler

  productsRequest = SKProductsRequest(productIdentifiers: productIdentifiers)
  productsRequest!.delegate = self
  productsRequest!.start()
}
```
Đoạn code trên để lưu lại xử lý hoàn thành của người dùng để sử dụng cho tương lại. Sau đó khởi tạo request thông qua đối tượng `SKProductsRequest`. 
Thêm đoạn code để thực hiện `SKProductsRequestDelegate` protocol.
```
// MARK: - SKProductsRequestDelegate

extension IAPHelper: SKProductsRequestDelegate {

  public func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) {
    print("Loaded list of products...")
    let products = response.products
    productsRequestCompletionHandler?(true, products)
    clearRequestAndHandler()

    for p in products {
      print("Found product: \(p.productIdentifier) \(p.localizedTitle) \(p.price.floatValue)")
    }
  }
  
  public func request(_ request: SKRequest, didFailWithError error: Error) {
    print("Failed to load list of products.")
    print("Error: \(error.localizedDescription)")
    productsRequestCompletionHandler?(false, nil)
    clearRequestAndHandler()
  }

  private func clearRequestAndHandler() {
    productsRequest = nil
    productsRequestCompletionHandler = nil
  }
}
```
Đoạn code này để lấy list sản phẩm, title, descriptions và giá từ Apple's server.
`productsRequest(_:didReceive:)` được gọi khi list được lấy thành công. List SKProduct object được truyền vào productsRequestCompletionHandler đã tạo ở trên. Nếu có vấn đề xảy ra, hàm` request(_didFailWithError:)` sẽ được gọi. 
Buid thử và xem kết quả như sau:
![](https://images.viblo.asia/0fa53e65-1d3c-4d09-ae26-af0ccd7b382b.jpg)

## Purchase Items
Bạn muốn có thể xác nhận xem item đã được mua hay chưa. Để làm điều này, bạn sẽ sử dụng mảng  `purchasedProductIdentifiers`. Nếu idetifiers của sản phẩm đã chứa trong mảng  này thì nghĩa là người dùng đã mua sản phẩm. 
Trong IAPHelper.swift, thay `return` bằng` isProductPurchased(_:)` như sau:
```
return purchasedProductIdentifiers.contains(productIdentifier)
```
Việc lưu trạng thái của product để hạn chế việc request Apple server mỗi lần mở app. `purchasedProductIdentifiers` được save bằng `UserDefaults`.
Vẫn ở file IAPHelper.swift, thay `init(productIds:)` như sau:
```
public init(productIds: Set<ProductIdentifier>) {
  productIdentifiers = productIds
  for productIdentifier in productIds {
    let purchased = UserDefaults.standard.bool(forKey: productIdentifier)
    if purchased {
      purchasedProductIdentifiers.insert(productIdentifier)
      print("Previously purchased: \(productIdentifier)")
    } else {
      print("Not purchased: \(productIdentifier)")
    }
  }
  super.init()
}
```
Với mỗi product identifier, bạn kiểm tra giá trị trong UserDefaults.

## Making Purchases 
Trong IAPHelper.swift, thay `buyProduct(_:)` 
```
public func buyProduct(_ product: SKProduct) {
  print("Buying \(product.productIdentifier)...")
  let payment = SKPayment(product: product)
  SKPaymentQueue.default().add(payment)
}
```
tạo payment object sử dụng SKProduct (lấy từ Apple server) để thêm vào payment queue.
Thêm hàm sau:
```
// MARK: - SKPaymentTransactionObserver
 
extension IAPHelper: SKPaymentTransactionObserver {
 
  public func paymentQueue(_ queue: SKPaymentQueue, 
                           updatedTransactions transactions: [SKPaymentTransaction]) {
    for transaction in transactions {
      switch transaction.transactionState {
      case .purchased:
        complete(transaction: transaction)
        break
      case .failed:
        fail(transaction: transaction)
        break
      case .restored:
        restore(transaction: transaction)
        break
      case .deferred:
        break
      case .purchasing:
        break
      }
    }
  }
 
  private func complete(transaction: SKPaymentTransaction) {
    print("complete...")
    deliverPurchaseNotificationFor(identifier: transaction.payment.productIdentifier)
    SKPaymentQueue.default().finishTransaction(transaction)
  }
 
  private func restore(transaction: SKPaymentTransaction) {
    guard let productIdentifier = transaction.original?.payment.productIdentifier else { return }
 
    print("restore... \(productIdentifier)")
    deliverPurchaseNotificationFor(identifier: productIdentifier)
    SKPaymentQueue.default().finishTransaction(transaction)
  }
 
  private func fail(transaction: SKPaymentTransaction) {
    print("fail...")
    if let transactionError = transaction.error as NSError?,
      let localizedDescription = transaction.error?.localizedDescription,
        transactionError.code != SKError.paymentCancelled.rawValue {
        print("Transaction Error: \(localizedDescription)")
      }

    SKPaymentQueue.default().finishTransaction(transaction)
  }
 
  private func deliverPurchaseNotificationFor(identifier: String?) {
    guard let identifier = identifier else { return }
 
    purchasedProductIdentifiers.insert(identifier)
    UserDefaults.standard.set(true, forKey: identifier)
    NotificationCenter.default.post(name: .IAPHelperPurchaseNotification, object: identifier)
  }
}
```
`paymentQueue(_:updatedTransactions:)` là method được yêu cầu implement. Nó được gọi 1 hoặc nhiều lần khi transaction state thay đổi. Method này tính toán trạng thái của transaction trong mảng.
Nếu transaction được hoàn thành, nó sẽ thêm vào mảng đã mua và được lưu trong UserDefaults. 

## Making a Sandbox Purchase
Buid và run app. Khi thực hiện mua phải được thực hiện trên device thật.
Trên iPhone của bạn. Vào Setting và chọn iTunes & App Store.
![](https://images.viblo.asia/c5a4f224-76f5-47ff-8c6c-9b1fc8f8308a.jpg)
Chọn iCloud của bạn và SignOut nó ra, chú ý không được sign in với sandbox user.
Vào ứng dùng vừa tạo, nhấn button Buy.
Sau đó sẽ hiển thị một pop up cho bạn login. Chọn Use Existing Apple ID, sau đó nhập tài khoản sandbox. Xác nhận mua bởi nút Buy. 
![](https://images.viblo.asia/2f308f89-9dcc-4e4e-8cf0-66622ff6c6bb.png)
Cuối cùng,  hiển thị alert đã mua thành công.
Vậy là mình đã giới thiệu xong các bước cơ bản để bắt đầu với In-App Purchase.
Cảm ơn các bạn đã đọc bài viết của mình.

## Tài liệu tham khảo
https://www.raywenderlich.com/5456-in-app-purchase-tutorial-getting-started