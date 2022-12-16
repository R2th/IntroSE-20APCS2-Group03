Là một mobile developer hẳn ai cũng có mong muốn có riêng cho mình những đứa con trên AppStore và tuyệt vời hơn khi nó mang lại lợi nhuận cho chúng ta. Có ba cách để kiếm lợi nhuận chính từ mobile app như: paid-for (bạn phải mua app ngay từ lúc install), advertising (kiếm tiền từ quảng cáo) và in-app purchase (trả phí cho những tính năng đặc biệt ở trong). Vậy cách nào trong số những cách này là hiệu quả? Theo quan điểm của mình thì:

* Paid-for: Hình thức bắt người dùng trả phí ngay từ lúc cài app như vậy có thể là rào cản đối với user, vì khi chúng ta chưa được trải nghiệm mà đã phải trả ra một cục tiền và không biết là nó có xứng đáng hay không. Hình thức này cũng chỉ giúp chúng ta được trả một lần. Nên mình nghĩ đây thực sự không phải cách tốt nhất.
    ![](https://images.viblo.asia/21837df6-8c38-4d6c-a677-b8c8f4b2f24d.png)

* Advertising: Là hình thức kiếm tiền từ quảng cáo, là một cách đơn giản và dễ dàng để kiếm được lợi nhuận nhưng cũng dễ dàng khiến user cảm thấy khó chịu và từ bỏ app của bạn.
![](https://images.viblo.asia/485374b1-c1f9-4f12-917b-1d8116a06516.PNG)

* In-app purchase: Là hình thức user có thể dùng thử một phần hoặc toàn phần của app rồi mới trả phí, hoặc trả phí để mua các chức năng đặc biệt ở trong app. Đây là một hình thức đa dạng và có thể được áp dụng tuỳ với business của từng app. Thu nhập đêm đến có thể là hàng tháng, dựa theo từng chức năng đặc biệt. Theo quan điểm của mình thì đây là một các khá hựu hiệu và hiệu quả.
![](https://images.viblo.asia/574f965b-7e8f-40e3-840b-f3341322e3b6.png)

Theo các thống kê thì từ lúc apple giới thiệu In-app Purchase (IAP) cho đến giờ nó cũng trở thành một trong những cách giúp developer thu được nhiều lợi nhuận.
![](https://images.viblo.asia/fada3138-79fe-4b9b-ae7f-1042acc3aa90.png)

## Flow Product handling
![](https://images.viblo.asia/75940ae2-61df-4a1b-b47d-5531cc075053.png)
Ở bài viết này, mình sẽ tiếp cận theo hướng simplest nhất có thể. Từ việc tạo các product cho đến việc fetch về hiển thị lên interface và thực hiện thanh toán, cùng với restore. Việc verify recipt thì được recommend verify ở bên phía server để đảm bảo về mặt bảo mật nên mình sẽ không đề cập đến ở đây.

## Create In-App Purchase Products
Mỗi một chức năng đặc biệt mà người dùng trả phí chúng ta sẽ gọi là một product. Và để tạo ra các products này cho người dùng sử dụng, các bạn sẽ lên https://appstoreconnect.apple.com/ để tạo chúng ở trong tab **Features** mục In-App Purchase. Ở đây, Product được chia ra làm 4 loại:
* Consumable: là loại product được sử dụng một lần và sẽ hết hiệu lực ngay lúc đó muốn sử dụng thêm thì cần phải mua lại. Để dễ hình dung thì loại này hay được sử dụng như là tiền tệ ở trong game, hoặc là extra-live khi bạn không may hẹo trong một dungeon nào đó, ...
* Non-Consumable: là loại product được mua một lần và sẽ không bị hết hạn hay giảm đi trong quá trình sử dụng. Có thể thấy loại product này chính là khi mua hoặc mở khoá một màn chơi đặc biệt nào đó trong game, chỉ cần mở khoá một lần là có thể chơi được vĩnh viễn.
* Non-Renewing Subscription: là loại product cho phép user mua/ sử dụng một dịch vụ nào đó trong một khoảng thời gian giới hạn. Dịch vụ/ chức năng này sẽ không được tự động renew bởi apple.
* Auto-Renewable Subscription: là loại product cho phép user sử dụng một dịch vụ nào đó trong một khoảng thời gian và sẽ được tự động renews :money_mouth_face::money_mouth_face: trừ khi user chủ động cancel.

Khi tạo xong một product sẽ gồm các thông tin cơ bản như:
* Reference name: Là tên định danh IAP Product của bạn ở trong AppStore Connect, Sales và Trends reports. Tên này không được hiển thị lên AppStore.
* Product ID: Là định danh được sử dụng của một product. Lưu ý nó sẽ là duy nhất và kể cả khi bạn xoá bỏ product thì nó cũng không thể được sử dụng lại ID. Đây sẽ là ID bạn dùng để request thông tin về product.
* Cleared for Sales: Để xác định xem product có available trên App Store sau khi được chấp thuận hay không.
* Pricing/Subscription Price: giá của product đó.

## Fetching products
Chúng ta sẽ tạo ra một singleton để hỗ trợ cho việc thực hiện in-app purchase ở project demo này:
```
    static let shared = IAPHelper()
    
    private let productIdentifiers: Set<ProductIdentifier>
    private var purchasedProductIdentifiers: Set<ProductIdentifier> = []
    private var productsRequest: SKProductsRequest?
    private var productsRequestCompletionHandler: ProductsRequestCompletionHandler?
```
Ở trong class IAPHelper này chúng ta sẽ cần:
* `productIdentifiers` là set chứa các productID, thường thì những ID này nên được define và lưu trên server, bên client sẽ chỉ cần fetch từ api về, vì là demo nên chúng ta sẽ fix cứng nó với những ProductID mình đã tạo ở bước trên.
* `productsRequest`thông qua StoreKit, chúng ta dùng nó để fetch products.

Function để fetch products:
```
public func requestProducts(completionHandler: @escaping ProductsRequestCompletionHandler) {
        productsRequest?.cancel()
        productsRequestCompletionHandler = completionHandler
        productsRequest = SKProductsRequest(productIdentifiers: productIdentifiers)
        productsRequest!.delegate = self
        productsRequest!.start()
    }
```
Có một vấn đề ở đây đó là `productsRequest!.delegate = self` nên class của chúng ta cũng cần adopt lại `SKProductRequestDelegate`. Sau khi fetch thành công chúng ta sẽ có các thông tin của product (SKProduct) sử dụng để cập nhật các thông tin của product lên shop.
```
extension IAPHelper: SKProductsRequestDelegate {
    func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) {
        print("Loaded list of products...")
        let products = response.products
        productsRequestCompletionHandler?(true, products)
        clearRequestAndHandler()
        
        for product in products {
            print("Found product: \(product.productIdentifier) \(product.localizedTitle) \(product.price.floatValue)")
        }
    }
    
    func request(_ request: SKRequest, didFailWithError error: Error) {
        print("Failed to load list of products.")
        print("Error: \(error.localizedDescription)")
        productsRequestCompletionHandler?(false, nil)
        clearRequestAndHandler()
    }

    func clearRequestAndHandler() {
        productsRequest = nil
        productsRequestCompletionHandler = nil
    }
}
```

## Purchased product
Sau khi fetched được product và hiển thị chúng lên màn hình, chúng ta cần đảm bảo việc thực hiện được purchased. Để purchase chúng ta cần truyền một SKProduct (đã fetch được ở bước trên) vào SKPaymentQueue. Việc của chúng ta chỉ là đẩy nó vào PaymentQueue và handle các delegate của purchased success hay failed. Ở trong bài viết này để đơn giản chúng ta sẽ dùng NotificationCenter để thực hiện việc thông báo cho các Controller biết việc thanh toán thành công hay thất bại và cập nhật UI.
```
public func buyProduct(_ product: SKProduct) {
        print("Buying \(product.productIdentifier)...")
        let payment = SKPayment(product: product)
        SKPaymentQueue.default().add(payment)
    }
```
```
extension IAPHelper: SKPaymentTransactionObserver {
    
    public func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction]) {
        for transaction in transactions {
            switch (transaction.transactionState) {
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

## Restore
Cuối cùng là việc restore. Restore là điều **cực kỳ** cần thiết để đảm bảo cho user khi chuyển qua các device hay gỡ đi cài lại có thể lấy lại được các content đã mua, đã sử dụng. Lưu ý là vì đặc tính của Comsumable Product nên chúng ta sẽ không restore lại product này, thay vào đó product này nên được lưu ở phía server (ví dụ như tiền tệ trong app).
```
public func restorePurchases() {
        SKPaymentQueue.default().restoreCompletedTransactions()
    }
```
Sau khi restore thành công cũng sẽ nhận được ở delegate `public func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction])` ở case `restored`
Hãy đảm bảo là sau mỗi transaction thành công nhớ gọi: `SKPaymentQueue.default().finishTransaction(transaction)` để remove các finished transaction ra khỏi transaction queue.

## Conclusion 
Khi làm việc với các tính năng liên quan tới thanh toán sẽ có rất nhiều trường hợp khó và không ở trong document nên bài viết chỉ đề cập đến những thứ cơ bản nhất để có thể bắt đầu tìm hiểu về In-App Purchased.

**Refs:** https://www.raywenderlich.com/5456-in-app-purchase-tutorial-getting-started