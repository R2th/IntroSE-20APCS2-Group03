Memory leaks thường xảy ra mà không có bất cứ thông báo nào. Mặc dù việc sử dụng weak reference cho self trong các closure đã giúp ích rất nhiều, nhưng như thế là chưa đủ. Chúng ta có thể sử dụng memory graph debugging hoặc Xcode Instruments để tìm và giải quyết các lỗi về bộ nhớ. Nhưng nó khá phức tạp và tốn nhiều thời gian.

Rất may là chúng ta có một cách đơn giản hơn, là bằng cách sử dụng unit test. Phương pháp này không thể ngăn chặn được tất cả các leak, nhưng nó vẫn rất hiệu quả.

## Ngăn chặn memory leak bằng unit test
Viết một unit test bằng cách kết hợp một weak reference với một autoreleasepool sẽ giúp xác định việc giải phóng (dealloc) dễ dàng hơn. Nó có thể kiểm tra xem liệu deinit của một class đã được gọi và bộ nhớ đã được giải phóng hay chưa.

Trong ví dụ dưới đây, chúng ra sẽ kiểm tra xem một view controller đã được release hay chưa. Bằng cách tạo một extension method trong `XCTestCase`, ta có thể dễ dàng thêm nó vào bất kì view controller unit test nào. Bên cạnh đó, nó còn là một cách khá hay để kiểm tra xem view controller đã được giải phóng đúng chưa.

```swift
/// Ensures that the OwnedBucketViewController gets deallocated after being added to the navigation stack, then popped.
func testDeallocation() {
    assertDeallocation { () -> UIViewController in
        let bucket = Bucket()
        let viewModel = OwnedBucketViewModel(bucket: bucket)
        return OwnedBucketViewController(viewModel: viewModel)
    }
}
```

Extension này tạo một weak reference của view controller được tạo ra trong closure. Sau đó, ta present và dismiss view controller đó để kiểm tra xem weak reference đã thành `nil` chưa.

``` swift
extension XCTestCase {

    /// Verifies whether the given constructed UIViewController gets deallocated after being presented and dismissed.
    ///
    /// - Parameter testingViewController: The view controller constructor to use for creating the view controller.
    func assertDeallocation(of testedViewController: () -> UIViewController) {
        weak var weakReferenceViewController: UIViewController?

        let autoreleasepoolExpectation = expectation(description: "Autoreleasepool should drain")
        autoreleasepool {
            let rootViewController = UIViewController()

            // Make sure that the view is active and we can use it for presenting views.
            let window = UIWindow(frame: CGRect(x: 0, y: 0, width: 400, height: 400))
            window.rootViewController = rootViewController
            window.makeKeyAndVisible()

            /// Present and dismiss the view after which the view controller should be released.
            rootViewController.present(testedViewController(), animated: false, completion: {
                weakReferenceViewController = rootViewController.presentedViewController
                XCTAssertNotNil(weakReferenceViewController)

                rootViewController.dismiss(animated: false, completion: {
                    autoreleasepoolExpectation.fulfill()
                })
            })
        }
        wait(for: [autoreleasepoolExpectation], timeout: 10.0)
        wait(for: weakReferenceViewController == nil, timeout: 3.0, description: "The view controller should be deallocated since no strong reference points to it.")
    }

    /// Checks for the callback to be the expected value within the given timeout.
    ///
    /// - Parameters:
    ///   - condition: The condition to check for.
    ///   - timeout: The timeout in which the callback should return true.
    ///   - description: A string to display in the test log for this expectation, to help diagnose failures.
    func wait(for condition: @autoclosure @escaping () -> Bool, timeout: TimeInterval, description: String, file: StaticString = #file, line: UInt = #line) {
        let end = Date().addingTimeInterval(timeout)

        var value: Bool = false
        let closure: () -> Void = {
            value = condition()
        }

        while !value && 0 < end.timeIntervalSinceNow {
            if RunLoop.current.run(mode: RunLoop.Mode.default, before: Date(timeIntervalSinceNow: 0.002)) {
                Thread.sleep(forTimeInterval: 0.002)
            }
            closure()
        }

        closure()

        XCTAssertTrue(value, "➡️🚨 Timed out waiting for condition to be true: \"\(description)\"", file: file, line: line)
    }
}
```

Nếu view controller bị giữ lại có nghĩa là logic đang có vấn đề và test bị fail.

Để xác nhận weak reference đã `nil` hay chưa, chúng ta sử dụng một extension method khác trong `XCTestCase` rất tiện dụng khi kiểm tra một điều kiện nào đó.

`XCTest` API cung cấp một API rất hay để tạo các expectation cho các notification, predicate hay KVO, nhưng lại không thể dùng nó để xác nhận một weak reference đã thực sự `nil` hay chưa :confused:. Extension method mới sẽ thực hiện được việc đó. Nó sẽ check trong một khoảng thời gian xem điều kiện đã cho có thoả mãn hay không.

## Việc sử dụng một autoreleasepool
Nếu không có autoreleasepool, ta không thể kiểm tra được liệu một weak reference đã thực sự được giải phóng hay chưa. Mọi reference trong autoreleasepool closure sẽ được giải phóng khi chúng drain, nếu không có strong reference nào tồn tại.