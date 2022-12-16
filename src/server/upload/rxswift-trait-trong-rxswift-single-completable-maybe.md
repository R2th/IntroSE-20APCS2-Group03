# I. Khái niệm:
## 1. Trait:

-----


- **Trait** là một wrapper struct với một thuộc tính là một **Observable Sequence** nằm bên trong nó. **Trait** có thể được coi như là một sự áp dụng của **Builder Pattern** cho **Observable**.
- Để chuyển **Trait** về thành **Observable**, chúng ta có thể sử dụng operator **.asObservable()**
```swift
//Trait example

struct Single<Element> {
    let source: Observable<Element>
}

struct Driver<Element> {
    let source: Observable<Element>
}
```

## 2. Side Effect:

-----


- **Side Effect** là những thay đổi phía bên ngoài của một **scope** (khối lệnh).
- Trong RxSwift, **Side Effect** được dùng để thực hiện một tác vụ nào đó nằm bên ngoài của **scope** mà không làm ảnh hưởng tới **scope** đó.
```swift
        struct Message {
            var title: String = ""
            var content: String = ""
        }
        
        let disposeBag = DisposeBag()
        let message = Message()
        
        let driver = Driver.just(message)
        driver
            .do(onNext: { message in
                self.playRingtone() //Bật chuông báo có tin nhắn
            })
            .drive(onNext: { message in
                self.handleMessage(message) // Xử lý tin nhắn
            })
            .disposed(by: disposeBag)
```
Trong ví dụ, giả sử chúng ta có một tin nhắn được gửi đến điện thoại. Công việc cần xử lý đó là nhận tin nhắn đó đồng thời sẽ rung chuông báo hiệu có tin nhắn được gửi tới. **Side Effect** được sử dụng tại đây để thực hiện việc rung chuông khi nhận được tin nhắn gửi đến mà không làm ảnh hưởng tới tin nhắn đó. Chúng ta có thể hiểu đơn giản rằng **Side Effect** chính là khả năng cho phép thực hiện một công việc cùng với một công việc khác mà không làm ảnh hưởng tới công việc kia.

# II. Các loại Trait trong RxSwift:
## 1. Single:

-----


```swift
public enum SingleEvent<Element> {

        // One and only sequence element is produced. 
        // (underlying observable sequence emits: `.next(Element)`, `.completed`)
        case success(Element)
        
        // Sequence terminated with an error. 
        // (underlying observable sequence emits: `.error(Error)`)
        case error(Swift.Error)
}
```
- **Single** là một biến thể của **Observable** trong RxSwift.
- Thay vì emit được ra một chuỗi các element như Observable thì **Single** sẽ **chỉ emit ra duy nhất một element** hoặc **một error**.

**Đặc điểm của Single:**
- Emits chính xác một element hoặc một error.
- Không có Side Effect.

Ví dụ:
```swift
    func divideNumber(_ a: Int, _ b: Int) -> Single<Int> {
        return Single.create { single in
            if b == 0 {
                single(.error(NSError()))
            } else {
                single(.success(a / b))
            }
            return Disposables.create()
        }
    }
```
```swift
        // Subscriber
        let disposeBag = DisposeBag()
        divideNumber(10, 2)
            .subscribe { element  in
                switch element {
                case .success(let result):
                    print("result: \(result)")
                case .error(let error):
                    print(error.localizedDescription)
                }
            }
            .disposed(by: disposeBag)
```
```
result: 5
```

## 2. Completable:

-----


![](https://images.viblo.asia/5d53c645-7eb1-41ee-862b-91077f9c60bd.png)
```swift
public enum CompletableEvent {

        // Sequence terminated with an error. 
        // (underlying observable sequence emits: `.error(Error)`)
        case error(Swift.Error)
        
        // Sequence completed successfully.
        case completed
}
```
- Giống với **Single**, **Completable** cũng là một biến thể của **Observable**.
- Điểm khác biệt của **Completable** so với **Single** đó là nó chỉ có thể emit ra một **error** hoặc **chỉ complete** (không emit ra event mà chỉ terminate).

**Đặc điểm của Completable:**
- Không emit ra event.
- Chỉ emit ra error hoặc terminate mà không phát ra bất cứ event nào.
- Không có Side Effect.

## 3. Maybe:

-----


![](https://images.viblo.asia/3de6585b-a7d6-40ec-8cc6-0c06ea6b6787.png)
```swift
public enum MaybeEvent<Element> {

        // One and only sequence element is produced. 
        // (underlying observable sequence emits: `.next(Element)`, `.completed`)
        case success(Element)

        // Sequence terminated with an error. 
        // (underlying observable sequence emits: `.error(Error)`)
        case error(Swift.Error)

        // Sequence completed successfully.
        case completed
}
```
- **Maybe** cũng là một biến thể của **Observable** và là sự kết hợp giữa **Single** và **Completable**.
- Nó có thể emit **một element**, **complete mà không emit ra element** hoặc emit ra **một error**.

**Đặc điểm của Maybe:**
- Có thể phát ra duy nhất một element, phát ra một error hoặc cũng có thể không phát ra bất cứ evenet nào và chỉ complete.
- Sau khi thực hiện bất kỳ 1 trong 3 sự kiện nêu trên thì Maybe cũng sẽ terminate.
- Không chia sẻ Side Effect.

# Tài liệu tham khảo:
- https://medium.com/swift-india/rxswift-traits-5240965c4f12
- https://github.com/ReactiveX/RxSwift/blob/master/Documentation/Traits.md