Đối với lập trình viên chúng ta, để học một công nghệ mới sẽ có những cách sau 

- Đọc về nó
- Làm thử với nó
- Hack, viết lại một thứ có tính năng tương tự

Đối với 2 mục đầu tiên đã có rất nhiều bài viết đề cập tuy nhiên cách thức Rx hoạt động như thế nào thì có vẻ như rất ít người nói tới. Bài viết này sẽ cố gắng xây dựng, mô phỏng lại RxSwift, từ đó giúp các bạn hiểu hơn bí mật đằng sau RxSwift.

## Disposable

Disposable chỉ có duy nhất một method là dispose() với nhiệm vụ xoá bỏ toàn bộ side-effect xuất hiện trong quá trình subcription chẳng hạn khi kết nối với network hoặc database.

```swift
public protocol Disposable {
    func dispose()
}
```
AnonymousDisposable — cung cấp một closure sẽ được gọi khi hàm dispose được gọi.

CompositeDisposable — chứa một mảng các Disposable và sẽ đảm nhiệm việc dispose cho từng phần tử trong mảng khi nó được dispose.
```swift
public final class AnonimousDisposable: Disposable {
    private let _disposeHandler: () -> Void
    
    public init(_ disposeClosure: @escaping () -> Void) {
        _disposeHandler = disposeClosure
    }
    
    public func dispose() {
        _disposeHandler()
    }
}

public final class CompositeDisposable: Disposable {
    private var isDisposed: Bool = false
    private var disposables: [Disposable] = []
    
    public init() {}
    
    public func add(disposable: Disposable) {
        if isDisposed {
            disposable.dispose()
            return
        }
        disposables.append(disposable)
    }
    
    public func dispose() {
        if isDisposed { return }
        disposables.forEach {
            $0.dispose()
        }
        isDisposed = true
    }
}
```



## Observer
Observer được sử dụng để quản lý các event. Observer sẽ khởi tạo với một event handler closure, closure này sẽ được gọi mỗi khi có một Event mới.

```swift
public protocol ObserverType {
    associatedtype E
    
    func on(event: Event<E>)
}

public enum Event<T> {
    case next(T)
    case error(Error)
    case completed
}
```

```swift
public final class Observer<E>: ObserverType {
    private let _handler: (Event<E>) -> Void
    
    public init(handler: @escaping (Event<E>) -> Void) {
        _handler = handler
    }
    
    public func on(event: Event<E>) {
        _handler(event)
    }
}
```
## Observable
Observable được RxSWift [định nghĩa](https://github.com/ReactiveX/RxSwift/blob/master/RxSwift/ObservableType.swift) như sau. Observable sẽ là nơi bạn truyền vào Observer (bản chất là một callback) bằng việc gọi hàm subscribe()
```swift
public protocol ObservableType {
    associatedtype E
    
    func subscribe<O: ObserverType>(observer: O) -> Disposable where O.E == E
}
```

Phương thức "subscribe" có parameter là một Observer và trả về Disposable.

Trước hết ta sẽ định nghĩa một helper "Sink" như sau. Lớp Sink này có nhiệm vụ quản lý Disposable, chuyển event đến Observer, kiểm tra subscription đã được dispose hay chưa trước khi chuyển tiếp event.
```swift
final class Sink<O: ObserverType>: Disposable {
    private var _disposed: Bool = false
    private let _forward: O
    private let _subscriptionHandler: (Observer<O.E>) -> Disposable
    private let _composite = CompositeDisposable()
    
    init(forvard: O, subscriptionHandler: @escaping (Observer<O.E>) -> Disposable) {
        _forward = forvard
        _subscriptionHandler = subscriptionHandler
    }
    
    func run() {
        let observer = Observer<O.E>(handler: forward)
        _composite.add(disposable: _subscriptionHandler(observer))
    }
    
    private func forward(event: Event<O.E>) {
        if _disposed {
            return
        }
        _forward.on(event: event)
        switch event {
        case .completed, .error:
            self.dispose()
        default:
            break
        }
    }
    
    func dispose() {
        _disposed = true
        _composite.dispose()
    }
}
```
Observable sử dụng Sink 
```swift
public class Observable<Element>: ObservableType {
    public typealias E = Element
    private let _subscribeHandler: (Observer<Element>) -> Disposable
    
    public init(_ subscribtionClosure: @escaping (Observer<Element>) -> Disposable) {
        _subscribeHandler = subscribtionClosure
    }
    
    public func subscribe<O : ObserverType>(observer: O) -> Disposable where O.E == E {
        let sink = Sink(forvard: observer, subscribtionHandler: _subscribeHandler)
        sink.run()
        return sink
    }
}
```
## Operator
Operator map sẽ được thực hiện như sau 

```swift
extension ObservableType {    
    public func map<U>(_ transform: @escaping (E) throws -> U) -> Observable<U> {
        return Observable<U> { observer in
            return self.subscribe(observer: Observer { (event) in
                switch event {
                case .next(let element):
                    do {
                        try observer.on(event: .next(transform(element)))
                    } catch {
                        observer.on(event: .error(error))
                    }
                case .error(let e):
                    observer.on(event: .error(e))
                case .completed:
                    observer.on(event: .completed)
                }
            })
        }
    }
}
```
## Kết quả
Và đây là thành quả chúng ta đạt được :

![](https://images.viblo.asia/71ec560c-a0e4-4325-985f-23a074432b02.png)

Hy vọng bài viết này đã giúp các bạn hiểu thêm về những thành phần cơ bản của Rx, cách thức chúng hoạt động và hiểu rằng không có gì là ma thuật đằng sau Rx!

## Reference
Bài viết này được dịch từ : https://medium.com/@SergDort/learn-rx-by-implementing-observable-e5cb08c9c35