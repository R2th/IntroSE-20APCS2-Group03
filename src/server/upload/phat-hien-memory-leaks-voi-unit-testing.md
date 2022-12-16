Ở bài trước, tôi đã giới thiệu về [Memory leaks](https://viblo.asia/p/memory-leaks-in-swift-Qbq5Q1qm5D8) và một số phương pháp để phát hiện. Phần này chúng ta sẽ tìm hiểu về phương pháp cụ thể là Unit testing.
Chúng ta đã biết về cách hoạt động của cycles và weak references, chúng ta có thể viết code để kiểm tra các retain cycles. Ý tưởng là sử dụng các weak references thăm dò các cycles. Với một weak reference trỏ tới một object chúng ta có thể kiểm tra đối tượng đó có leak hay không.

> Bởi vì một weak reference không giữ một liên kết mạnh với instance mà nó tham chiếu, có thể instance đã deallocated trong khi các weak references vẫn tham chiếu đến nó. Do đó, ARC sẽ tự động set weak reference thành nil khi instance tham chiếu đã deallocated.

Giả sử chúng ta muốn biết object X có leak hay không. Chúng ta có thể tạo một weak reference trỏ đến nó và gọi là leakReferece. Nễu X được giải phóng, ARC sẽ đặt leakReferece thành nil. Vì vậy nếu X leak, leakReferece sẽ không thể là nil.

```
func isLeaking() -> Bool {

    var x: SomeObject? = SomeObject()

    weak var leakReference = x

    x = nil

    if leakReference == nil {
        return false //Not leaking
    } else {
        return true //Leaking
    }
}
```

Nễu X bị leak, leakReference sẽ trỏ đến nó. Mặt khác, nếu X không bị leak, X sẽ không tồn tại nữa và leakReference sẽ trờ thành nil. 

# SpecLeaks

[SpecLeaks](https://cocoapods.org/pods/SpecLeaks) Là một vài additions cho các frameworks cho phép bạn tạo các unit tests để xem các objects bị leak hay không. 
Nếu bản không biết về Unit testing có thể xem ảnh dưới hoặc tham khảo bài [Unit Testing](https://viblo.asia/p/unit-testing-in-swift-aWj538QpK6m)

![](https://cdn-images-1.medium.com/max/2000/1*i8K2uBxYToiym52MvIrFFQ.png)

Bạn có thể tạo một tập hợp các tests  khởi tạo các đối tượng và thử nghiệm trên chúng. Bạn xác định các kết quả mong đợi, và nếu kết quả như vậy diễn ra, bài test sẽ vượt qua với chấm màu xanh lá. Nếu kết quả không như mong đợi, bài test sẽ thất bại và thể hiện chấm màu đỏ.

# Testing for leaks in initialization

Bài test đơn giản nhất bạn có thể viết kể kiểm tra object có bị leak hay không. Chỉ cần khởi tạo Object và kiểm tra nó. Đôi khi các object được đăng ký như observer, delegate hoặc notifation. Đây là những trường hợp mà đoạn test có thể phát hiện leak.

```
describe("UIViewController") {
    let test = LeakTest {
        return UIViewController()
    }

    describe("init") {
        it("must not leak") {
            expect(test).toNot(leak())
        }
    }
}
```

# Testing for Leaks in View Controllers

Một view controller có thể bị leak ngay lập tức khi các subview của nó được loaded. Sau đó, rất rất nhiều điều có thể xảy ra, nhưng với đoạn test đơn giản này bạn chắc chăn viewDidLoad không bị leak.

```
describe("a CustomViewController") {
    let test = LeakTest {
        let bundle = Bundle(for: CustomViewController.self)
        let storyboard = UIStoryboard.init(name: "CustomViewController", bundle: bundle)
        return storyboard.instantiateInitialViewController() as! CustomViewController
    }

    describe("init + viewDidLoad()") {
        it("must not leak") {
            expect(test).toNot(leak())
            //SpecLeaks will detect that a view controller is being tested
            // It will create it's view so viewDidLoad() is called too
        }
    }
}
```

Sử dụng SpecLeaks bạn sẽ không cần phải gọi thủ công View trên một view controller. SpecLeaks sẽ làm điều đó cho bạn khi bạn đang thử nghiệm một lớp con UIViewController.

# Testing for Leaks when a method is called

Bạn có thể kiểm thử có xảy ra leak khi call một method hay không với đoạn test sau.

```
describe("doSomething") {
    it("must not leak") {

        let doSomething: (CustomViewController) -> Void = { vc in
            vc.doSomething()
        }

        expect(test).toNot(leakWhen(doSomething))
    }
}
```

# Tổng kết

Leak là một vẫn đề nghiêm trọng. Nó mang lại  đến một UX kém, crashes và nhận được các reviews xấu. Chúng ta cần loại bỏ chúng. Một code style tốt, áp dụng đúng đắn, hiểu biết về quản lý bộ nhớ và kiểm thử sẽ giúp kiểm soát tốt việc này.
Unit testing không đảm bảo được sẽ loại bỏ hết leak, tuy nhiên đây là một phương pháp rất hiểu quả. Bạn có thể xử dụng nó và có thể kết hợp với những phương pháp khác để thực hiện điều này.