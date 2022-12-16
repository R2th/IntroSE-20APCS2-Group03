Nếu bạn đang sử dụng RxSwift, bạn có thể đã gặp phải tình huống trong đó các toán tử tích hợp không mang lại chức năng chính xác mà bạn muốn. 
RxSwift đang được cố ý giữ gọn nhất có thể để tránh phình to. 
Mục đích của kho lưu trữ này là cung cấp thêm các toán tử tiện lợi và Tiện ích mở rộng.
RxSwiftExt https://github.com/RxSwiftCommunity/RxSwiftExt là một dự án khác sống dưới RxSwiftCommunity.
Hôm nay tôi sẽ giúp bạn tìm hiểu về một vài trong số chúng ở đây.

## unwrap
Một trong những nhu cầu phổ biến nhất của các nhà phát triển Swift là khả năng chuyển đổi các luồng tùy chọn thành các luồng không tùy chọn. 
Để xử lý điều này, RxSwiftExt cung cấp toán tử unwrap():
```
 let source: Observable<Int?> = Observable.of(1,2,nil,Int?(4))
let unwrapped: Observable<Int> = source.unwrap()
```

Các phần tử được unwrap mở ra từ `Optional<T>` và tất cả giá trị nil sẽ được loại bỏ sau khi unwrap.


## distinct
Khi xử lý một chuỗi các giá trị, bạn mong muốn mỗi phần tử chỉ nhìn thấy một lần. Đối với điều này, bạn có thể sử dụng toán tử distinct():
```
_ = Observable.of("a","b","a","c","b","a","d")
  .distinct()
  .toArray()
  .subscribe(onNext: { print($0) })
```

Chỉ một giá trị riêng biệt sẽ được giữ, sau đó `toArray()` (toán tử của RxSwift) sẽ nhóm tất cả chúng trong một mảng duy nhất. Khi hoàn thành, bạn sẽ nhận được một mảng duy nhất:
```
["a","b","c","d"]
```

## mapAt
Keypath trong Swift là một cách mạnh mẽ để xác định nơi lấy dữ liệu. Toán tử `mapAt(_:)` tận dụng các keypath để cho phép bạn trích xuất dữ liệu từ một đối tượng lớn hơn:
```
struct Person {
    let name: String
}
Observable
  .of(Person(name: "Bart"),
      Person(name: "Lisa"),
      Person(name: "Maggie"))
  .mapAt(\.name)
```

Điều này rất hữu ích khi làm việc với các chuỗi dữ liệu JSON!

## filterMap
Một sự kết hợp của bộ `filter()` và `map()`, `filterMap(_:)` cho phép bạn lọc các mục chỉ một lần sử dụng và ánh xạ chúng sang một loại khác, theo cách rất hay và biểu cảm.
Dưới đây, một ví dụ chỉ giữ các số lẻ và ánh xạ chúng thành các chuỗi:
```
Observable.of(1,2,3,4,5,6)
  .filterMap { number in
    (number % 2 == 0) ? .ignore : .map("accepting \(number)")
  }
```

Closure có thể return .ignore để bỏ qua một giá trị đã cho hoặc .map (newValue) để ánh xạ tới một giá trị khác, có thể thay đổi loại của nó.

## retry và repeatWithBehavior
Tăng cường các toán tử mạnh mẽ, bạn có thể làm rất nhiều với `retry(_:)` và `repeatWithBehavior(_:)`. (Toán tử retry của `RxSwiftExt(_:)` là một phiên bản tinh vi hơn toán tử RxSwift's `retry()`) Sử dụng các toán tử mới này để subscribe lại một chuỗi sau khi nó hoàn thành hoặc xảy ra lỗi. Xem điều này bằng một trong các trường hợp enum sau:
* `.immediate(maxCount:)` subscribe ngay lập tức, tối đa lần maxCount.
* `.delayed(maxCount: UInt, time: Double)` thực hiện tương tự, nhưng trì hoãn việc subscribe lại
theo thời gian giây.
* `.exponentialDelayed(maxCount: UInt, initial: Double, multiplier: Double)` thậm chí còn mạnh hơn, vì nó tự động nhân độ trễ subscribe lại ở mỗi chu kỳ.
* `.customTimerDelayed(maxCount: UInt, delayCalculator: (UInt) -> Double)` cho phép bạn cung cấp một closure nhận lặp đi lặp lại và trả về số giây mà quá trình đăng ký lại sẽ bị trì hoãn.

Có nhiều trường hợp sử dụng cho việc này. Khi truy vấn máy chủ, bạn có thể giảm bớt thời gian nếu yêu cầu của bạn liên tục thất bại, đảm bảo không làm mất tài nguyên trên thiết bị người dùng của bạn:
```
// try request up to 5 times
// multiply the delay by 3.0 at each attemps
// so retry after 1, 3, 9, 27 and 81 seconds before giving up
let request = URLRequest(url: url)
let tryHard = URLSession.shared.rx.response(request: request)
  .map { response in
      // process response here
  }
  .retry(.exponendialDelayed(maxCount: 3, inital: 1.0, multiplier: 3.0))
```

## catchErrorJustComplete
Đôi khi bạn chỉ muốn bỏ qua lỗi. Vì điều đó nên toán tử CatchErrorJustComplete() trở nên tiện dụng và nó thực hiện đúng như tên gọi của nó!
```
  let neverErrors = someObservable.catchErrorJustComplete()
```

## partition
Như bạn đã học trong các chương về toán tử lọc, bạn thường thấy mình chỉ cần lọc các phần tử cụ thể của một luồng. Tuy nhiên, trong nhiều trường hợp khác, việc phân vùng một luồng thành hai luồng dựa trên một điều kiện có thể sẽ hữu ích, vì vậy các phần tử không khớp với điều kiện là một phần của luồng thứ hai:
```
let (evens, odds) = Observable
                      .of(1, 2, 3, 5, 6, 7, 8)
                      .partition { $0 % 2 == 0 }
_ = evens.debug("evens").subscribe() // Emits 2, 6, 8
_ = odds.debug("odds").subscribe() // Emits 1, 3, 5, 7
```

Nguồn: RxSwift. Reactive Programming with Swift (3rd Edition) 2019