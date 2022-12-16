# 1. Lời dẫn: RxSwift là gì?
Mình định nghĩa một cách đơn giản
```
Là một thư viện giúp việc lập trình bất đồng bộ trở nên dễ dàng hơn.
```
Dễ dàng hơn như thế nào mình sẽ cùng các bạn đi qua các vị dụ.
Các bạn chỉ cần nắm vững các phép toán cơ bản sau là có thể làm việc thoải mái với RxSwift rồi
- `zip`
- `map`
- `flatMap`
- `filter`
- `merge`
- `retry`
- kết hợp các phép toán
# 2. Ví dụ thực tế - phép toán zip 
Bài toán: Bạn phải validate một image có
- chiều rộng > `x`
- chiều dài < `y`
- file size < `z`

Tuy nhiên các giá trị trên phải lấy từ phía server.

Giả sử hàm lấy thông số như sau:
```swift
func getSetting(name: String, onCompleted: (String) -> Void)
```
Cách làm đơn giản nhất là dùng các callback lồng nhau như sau:
```swift
getSetting(name: "minWidth") { minWidth in
    getSetting(name: "minHeight") { minHeight in
        getSetting(name: "maxSize") { maxSize in
            // use minWidth, minHeight, maxSize here
        }
    }
}
```
Các bạn dễ dàng nhận thấy những dòng code phía trên là những dòng code tồi. Càng nhiều giá trị cần lấy, logic càng phức tạp khiến việc bảo trì code gặp khó khăn.
***
Tiếp theo ta cùng xem phiên bản sử dụng RxSwift
```swift
Observable.zip(
    getSettingObservable(name: "minWidth"),
    getSettingObservable(name: "minHeight"),
    getSettingObservable(name: "maxSize")
).subscribe(onNext: minWidth, minHeight, maxSize in
    // use minWidth, minHeight, maxSize here
)
```
Có vẻ có nhiều từ mới xuất hiện, nhưng những dòng code đã có vẻ "sạch" hơn, và ta cũng có thể đoán được nó làm việc gì: nhóm việc lấy các thông số `minWidth`, `minHeight`, `maxSize` lại, sau đó sử dụng thì tất cả các giá trị đó sẵn sàng.
***
Mình xin giải thích các từ mới xuất hiện, trước hết là:
```swift
func getSettingObservable(name: String) -> Observable<String>
```
RxSwift sử dụng dữ liệu kiểu `Observable`. Để đơn giản các bạn có thể hiểu thay vì sử dụng giá trị thông qua callback như sau
```swift
getSetting(name: "settingName") { settingValue in
    // use settingValue
}
```
các bạn có thể sử dụng thông qua `Observable` như sau
```swift
getSettingObservable(name: "settingName")
    .subcribe(onNext: { settingValue in 
        // use settingValue here
    }
)
```
Không thay đổi quá nhiều đúng không nào.
***
Implement của function `getSettingObservable`
```swift
func getSettingObservable(name: String) -> Observable<String> {
    return Observable.create { observer in
        getSetting(name: name) { value in
            observer.onNext(value)
            observer.onComplete()
        }
        return Disposables.create()
    }
}
```
***
Sau khi các bạn đã chuyển callback bình thường thành dữ liệu kiểu `Observable` các bạn có thể sử dụng phép toán `zip` của RxSwift để sử dụng các giá trị sau khi tất cả đã sãn sàng.
# 3. Kết
Đọc đến đây có lẽ các bạn sẽ có chung một cảm giác là để thực hiện một công việc đơn giản thế tại sao phải dài dòng thế làm gì. 

Tuy nhiên RxSwift sẽ phát huy sức mạnh trước những bài toán bất đồng bộ phức tạp hơn mà chúng ta sẽ dần khám phá qua các bài sau của series.

Chân thành cám ơn các bạn đã theo dõi!