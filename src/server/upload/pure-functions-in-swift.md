- `Pure function` là một trong những khái niệm cốt lõi của việc lập trình cho phép hầu hết các ngôn ngữ lập trình có thể hỗ trợ các biểu mẫu dưới dạng function hoặc các chương trình con(`subroutines`).

- 1 function được gọi là `pure function` khi mà nó không gây ra các hiệu ứng phụ và không chịu tác động bởi các trạng thái bên ngoài(`external state`). Ý tưởng cơ bản là một pure function sẽ luôn luôn cho ra các `output` giống nhau cho các `input` khác nhau - mặc cho nó được gọi đến bao nhiêu lần.

# 1/ Purifying functions:
- Hãy bắt đầu với một ví dụ mà function có khả năng trở thành `pure function` ngoại từ việc nó không đảm bảo không gây ra hiệu ứng phụ nào:

```swift
extension String {
    mutating func addSuffixIfNeeded(_ suffix: String) {
        guard !hasSuffix(suffix) else {
            return
        }

        append(suffix)
    }
}
```

- Trường hợp ở trên thì function là `mutating` có vẻ không phải là vấn đề to tát gì vì `String` là `value type` nên chúng ta có thể coi nó như `mutable values`:

```swift
var fileName = contentName
fileName.addSuffixIfNeeded(".md")
try save(content, inFileNamed: fileName)
```

- Thay vì rút gọn function bằng cách `return` một giá trị `String` mới thay vì thay đổi 1 giá trị đã được gọi đến trước đó:

```swift
extension String {
    func addingSuffixIfNeeded(_ suffix: String) -> String {
        guard !hasSuffix(suffix) else {
            return self
        }

        return appending(suffix)
    }
}
```

- Chỉ là một thay đổi nhỏ từ đoạn code trên nhưng nó có thể hạn chế tối thiểu các `state` có thể thay đổi, có thể coi là bản nâng cấp nhỏ của đoạn code trên:

```swift
let fileName = contentName.addingSuffixIfNeeded(".md")
try save(content, inFileNamed: fileName)
```

- Một điều khác có thể cản trở function có thể là một `pure function` là nếu nó phụ thuộc vào một vài mẫu bên ngoài, các `state` thay đổi. VD: nếu chúng ta xây dựng một màn hình login của app và chúng ta muốn hiển thị `error message` trong trường hợp lặp đi lặp lại lỗi login. Function có thể trông như sau:

```swift
extension LoginController {
    func makeFailureHelpText() -> String {
        guard numberOfAttempts < 3 else {
            return "Still can't log you in. Forgot your password?"
        }

        return "Invalid username/password. Please try again."
    }
}
```

- Function bên trên có vẻ phụ thuộc vào property `numberOfAttempts` của `viewcontroller`. Chúng ta có thể tạm coi nó là `pure function` ngoại trừ việc nó có thể cho ra các giá trị khác nhau phụ thuộc vào biến thay đổi:
- Chúng ta sẽ thay đổi nhỏ để fix đoạn code trên:

```swift
extension LoginController {
    func makeFailureHelpText(numberOfAttempts: Int) -> String {
        guard numberOfAttempts < 3 else {
            return "Still can't log you in. Forgot your password?"
        }

        return "Invalid username/password. Please try again."
    }
}
```

- Một lợi ích to lớn của pure function là nó thực dễ để test - chúng ta có thể dễ dàng xác nhận là nó cho ra đúng output với bất kì `input` nào. Ví dụ dưới dây sẽ cho chúng ta có thể dễ test các function trên của chúng ta khi truyền vào các `numberOfAttempts`khác nhau:

```swift
class LoginControllerTests: XCTestCase {
    func testHelpTextForFailedLogin() {
        let controller = LoginController()

        XCTAssertEqual(
            controller.makeFailureHelpText(numberOfAttempts: 0),
            "Invalid username/password. Please try again."
        )

        XCTAssertEqual(
            controller.makeFailureHelpText(numberOfAttempts: 3),
            "Still can't log you in. Forgot your password?"
        )
    }
}
```

# 2 / Enforcing purity:

- Nhờ vào `pure-function` có nhiều lợi ích mà trong quá trình coding chúng ta có thể sử dụng một số trick để biết chính xác khi nào function nào là pure khi mà hầu hết code của chúng ta viết đều phụ thuộc vào rất nhiều state khác nhau:
- Tuy nhiên ở một mức độ nào đó, thì pure-function bó buộc chúng ta vào các `value type`. Nếu các value không thể thay đổi chính nó hoặc không có các `property` ở ngoài `mutating-function`, nó vẫn đảm bảo cho logic của chúng ta thay vì sử dụng `pure-function`.
- VD là chúng ta sẽ có logic cgho việc tính toàn tổng tiền mua danh sách các sản phẩm, sử dụng `struct` chỉ bao gồm các `let` property:

```swift
struct PriceCalculator {
    let shippingCosts: ShippingCostDirectory
    let currency: Currency

    func calculateTotalPrice(for products: [Product],
                             shippingTo region: Region) -> Cost {
        let productCost: Cost = products.reduce(0) { cost, product in
            return cost + product.price
        }

        let shippingCost = shippingCosts.shippingCost(
            forRegion: region
        )

        let totalCost = productCost + shippingCost

        return totalCost.convert(to: currency)
    }
}
```

# 3 / Purifying refactors:

- Hãy cùng xem ví dụ chúng ta xử lý tap của `next-button` với các bài đọc trên `ReaderViewController`. Phụ thuộc vào `viewcontroller` đang có `state` nào mà chúng ta có thể hiển thị bài đọc tiếp theo cho người dùng, show ra các mã promotion hoặc tắt đi bài đọc hiện tại:

```swift
private extension ReaderViewController {
    @objc func nextButtonTapped() {
        guard !articles.isEmpty else {
            return didFinishArticles()
        }

        let vc = ArticleViewController()
        vc.article = articles.removeFirst()
        present(vc)
    }

    func didFinishArticles() {
        guard !promotions.isEmpty else {
            return dismiss()
        }

        let vc = PromotionViewController()
        vc.promotions = promotions
        vc.delegate = self
        present(vc)
    }
}
```

- Bên trên không phải là "bad code", nó có vẻ dễ đọc và nó thậm chí chia nhỏ thành 2 function riêng biệt để nó dễ đọc và dễ review. Ngoại trừ phía trên `nextButtonTapped` function không phải là pure, nó khó có thể test.
- Logic như trên có vẻ dễ gây ra vấn đề "Massive View Controller" khi mà view controller đảm nhiểm quá nhiều vai trò lẫn logic phức tạp.
- Thay vì chia nhỏ logic trên vào trong `pure function`, chúng ta có 1 nơi chỉ chứa logic của button đó. Bằng cách đó chúng ta có thể trình bày logic của chúng ta như một `pure function` từ `state` cho đến outcome và sử dụng `static function`.:

```swift
struct ReaderNextButtonLogic {
    enum Outcome {
        case present(UIViewController, remainingArticles: [Article])
        case dismiss
    }

    static func outcome(
        forArticles articles: [Article],
        promotions: [Promotion],
        promotionDelegate: PromotionDelegate?
    ) -> Outcome {
        guard !articles.isEmpty else {
            guard !promotions.isEmpty else {
                return .dismiss
            }

            let vc = PromotionViewController()
            vc.promotions = promotions
            vc.delegate = promotionDelegate
            return .present(vc, remainingArticles: [])
        }

        var remainingArticles = articles

        let vc = ArticleViewController()
        vc.article = remainingArticles.removeFirst()
        return .present(vc, remainingArticles: remainingArticles)
    }
}
```

- Điều gì thực sự quan trọng ở đoạn code trên thì đó là nó thực hiện đầy đủ các thứ mà `viewcontroller` trước đó đã làm ngoại trừ là nó thay đổi các trạng thái. 

```swift
private extension ReaderViewController {
    @objc func nextButtonTapped() {
        let outcome = ReaderNextButtonLogic.outcome(
            forArticles: articles,
            promotions: promotions,
            promotionDelegate: self
        )

        switch outcome {
        case .present(let vc, let remainingArticles):
            articles = remainingArticles
            present(vc)
        case .dismiss:
            dismiss()
        }
    }
}
```

- Chúng ta còn cần tinh chỉnh một chút cho đoạn code trên nhưng đoạn code trên đã có thể dễ dàng test hơn và cho outcome đúng khi button được tap:

```swift
class ReaderNextButtonLogicTests: XCTestCase {
    func testNextArticleOutcome() {
        let articles = [Article.stub(), Article.stub()]

        let outcome = ReaderNextButtonLogic.outcome(
            forArticles: articles,
            promotions: [],
            promotionDelegate: nil
        )

        guard case .present(let vc, let remaining) = outcome else {
            return XCTFail("Invalid outcome: \(outcome)")
        }

        XCTAssertTrue(vc is ArticleViewController)
        XCTAssertEqual(remaining, [articles[1]])
    }
}
```

- Vẫn còn rất nhiều cách để có thể đóng gói logic như trên bằng việc sử dụng [logic-controllers](https://www.swiftbysundell.com/posts/logic-controllers-in-swift) hay [view-models](https://www.swiftbysundell.com/posts/different-flavors-of-view-models-in-swift). Chỉ với việc di chuyển logic chúng ta đã làm cho công việc test trở nên dễ dàng hơn so với thay đổi cả cấu trúc code hoặc kỹ thuật.