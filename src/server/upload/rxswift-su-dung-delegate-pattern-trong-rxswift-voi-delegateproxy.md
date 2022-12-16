# I.Giới thiệu:
**Delegate Pattern** trong iOS là một pattern thông dụng và phổ biến, được áp dụng nhiều trong framework **UIKit** của Apple. **Delegate Pattern** giúp cho lập trình viên có thể giải quyết được nhiều bài toán trong quá trình phát triển phần mềm, tuy nhiên thì việc implement pattern này đôi lúc lại cồng kềnh và làm cho code thiếu đi sự tinh gọn. Để giải quyết vấn đề trên chúng ta có thể sử dụng **Delegate Pattern** kết hợp với **RxSwift** để việc implement trở nên gọn nhẹ và dễ dàng tái sử dụng hơn. Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách chuyển một **delegate** sang thành một **observable**, cụ thể là thông qua ví dụ với **WKNavigationDelegate** của **WKWebView**.

# II. Tạo DelegateProxy class:
**DelegateProxy** đóng vai trò là một cầu nối (hay còn gọi là adapter) để chuyển đổi qua lại giữa **delegate** và **observable**. Trong **DelegateProxy** sẽ có hai phương thức `currentDelegate` và `setCurrentDelegate` thực hiện vai trò `get` và `set` **delegate** cho **WKWebView**.
```swift
import Foundation
import RxSwift
import RxCocoa
import WebKit

class WKNavigationDelegateProxy: DelegateProxy<WKWebView, WKNavigationDelegate>, WKNavigationDelegate, DelegateProxyType {
    /// Typed parent object.
    weak private(set) var webView: WKWebView?
    
    /// - parameter webView: Parent object for delegate proxy.
    init(webView: ParentObject) {
        self.webView = webView
        super.init(parentObject: webView, delegateProxy: RxWKNavigationDelegateProxy.self)
    }
    
    // Register known implementations
    static func registerKnownImplementations() {
        self.register { WKNavigationDelegateProxy(webView: $0) }
    }
    
    static func currentDelegate(for object: WKWebView) -> WKNavigationDelegate? {
        return object.navigationDelegate
    }
    
    static func setCurrentDelegate(_ delegate: WKNavigationDelegate?, to object: WKWebView) {
        object.navigationDelegate = delegate
    }
}
```

# III. Wrap các function trong WKNavigationDelagate vào Observable:
Các function `methodInvoked` sẽ trả về một array dạng `Array<Any>` chứa các parameters của function trong **WKNavigationDelgate** được gọi tới. Tại mỗi function chúng ta sẽ sử dụng `func castOrThrow<T>` để parse về kiểu dữ liệu mong muốn.
```swift
extension Reactive where Base: WKWebView {
    
    func castOrThrow<T>(_ resultType: T.Type, _ object: Any) throws -> T {
        guard let returnValue = object as? T else {
            throw RxCocoaError.castingError(object: object, targetType: resultType)
        }
        return returnValue
    }
    
    var navigationDelegate: DelegateProxy<WKWebView, WKNavigationDelegate> {
        RxWKNavigationDelegateProxy.proxy(for: base)
    }
    
    var didCommit: Observable<WKNavigation> {
        navigationDelegate.methodInvoked(#selector(WKNavigationDelegate.webView(_:didCommit:)))
            .map { params in
                try castOrThrow(WKNavigation.self, params[1])
            }
    }
    
    var didStartLoad: Observable<WKNavigation> {
        navigationDelegate.methodInvoked(#selector(WKNavigationDelegate.webView(_:didStartProvisionalNavigation:)))
            .map { params in
                try castOrThrow(WKNavigation.self, params[1])
            }
    }
    
    var didFinishLoad: Observable<WKNavigation> {
        navigationDelegate.methodInvoked(#selector(WKNavigationDelegate.webView(_:didFinish:)))
            .map { params in
                try castOrThrow(WKNavigation.self, params[1])
            }
    }
    
    var didFailLoad: Observable<(WKNavigation, Error)> {
        navigationDelegate.methodInvoked(#selector(WKNavigationDelegate.webView(_:didFail:withError:)))
            .map { params in
                return (try castOrThrow(WKNavigation.self, params[1]), try castOrThrow(Error.self, params[2]))
            }
    }
    
}
```

# IV. Cách sử dụng:
```swift
        let webview = WKWebView(frame: .zero)
        let disposeBag = DisposeBag()
        
        webview.rx.didCommit
            .subscribe(onNext: { wkNavigation in
                print("LOG + didCommit")
            })
            .disposed(by: disposeBag)
        
        webview.rx.didStartLoad
            .subscribe(onNext: { wkNavigation in
                print("LOG + didStartLoad")
            })
            .disposed(by: disposeBag)
        
        webview.rx.didFinishLoad
            .subscribe(onNext: { wkNavigation in
                print("LOG + didFinishLoad")
            })
            .disposed(by: disposeBag)
        
        webview.rx.didFailLoad
            .subscribe(onNext: { wkNavigation, error in
                print("LOG + didFailLoad")
            })
            .disposed(by: disposeBag)
        
        let urlRequest = URLRequest(url: URL(string: "https://tinhte.vn")!)
        webview.load(urlRequest)
```

```swift
LOG + didStartLoad
LOG + didCommit
LOG + didFinishLoad
```