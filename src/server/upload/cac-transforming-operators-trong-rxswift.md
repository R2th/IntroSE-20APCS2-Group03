Ở bài viết trước mình đã viết về các combining operators, lần này sẽ là các transforming operators. Đây cũng là các operators rất hữu dụng và hay sử dụng trong quá trình chúng ta làm việc. 
## map:
Operator này rất giống với swift thường. Với RxSwift, map operator sẽ chuyển đổi mỗi item mà nguồn phát ra và trả về một Observable mà emits ra các kết quả mà đã được thực thi các phép toán chúng ta chuyển đổi trong closure của map.

![](https://images.viblo.asia/462aa2e6-8429-4e67-9ece-4a43b72022d1.png)

So với người anh em họ `map`  operator của array thì:
* Sử dụng closure như một argument
* Thực thi trên mỗi phần từ của mảng
* Trả về một mảng mới mà mỗi phần tử đã được thực thi chuyển đổi

Chúng ta có thể thấy một vài khác biệt ở đây khá là nhỏ, cơ chế gần như là tương tự.
Thử với một ví dụ chuyển đổi các phần tử emit kiểu Int sang thành String.
```
import UIKit
import RxSwift

private let disposeBag = DisposeBag()

func transformUsingMap() -> Observable<String> {
    return Observable.of(1, 2, 3)
        .map { String("\($0)") }
}

transformUsingMap()
    .subscribe(onNext: { print($0) })
    .disposed(by: disposeBag)
```

## flatMap:
`flatMap` là operator mà sẽ chuyển đổi mỗi items mà **Observable nguồn** ra thành **nhiều Observables**, sau đó gộp chúng lại trên một **Observable đích**

![](https://images.viblo.asia/b0acf7ad-a656-4071-b8c7-73c7249f8eb5.png)

Hình ảnh này có thể vẫn khiến nhiều bạn cảm thấy khó hiểu, nhưng hãy thử xem ví dụ sau đây:
```
import UIKit
import RxSwift

private let disposeBag = DisposeBag()

func transformUsingFlatMap() -> Observable<String> {
    return Observable.of(1, 2, 3)
        .flatMap { (value) -> Observable<String> in
             Observable.just(String("Number: \(value)") )
        }
}

transformUsingFlatMap()
    .subscribe(onNext: { print($0) })
    .disposed(by: disposeBag)
```

Để diễn giải ra các bước để ra output thì sẽ như thế này:
```
Input: 1 —— 2 —— 3 —— |→
Intermediate:
Observable(“1”)—————|→
Observable(“2”)—————|→
Observable(“3”)————|→
Result: “1"————“2”————“3”————|→
```
Chúng ta có thể thấy là với mỗi item emit ra sẽ được transform thành một Observable, sau đó chúng lại được `merge` lại trên Observale đích. Vì vậy chúng ta cần lưu ý là chúng có thể xen kẽ và không đảm bảo được thứ tự của các items.

## flatMapLatest:
Nếu bạn đã hiểu được flatMap thì xin chúc mừng vì flatMapLatest chỉ khác biệt một chút so với người anh em trước của nó. Điều khác biệt đó là, nếu như người anh `flatMap` của nó hào phóng sẽ mặc kệ các Observables trung gian, tức là nó sẽ nhận lại hết tất cả những gì mà `Intermediate Obserables` emit ra. Người em `flatMapLatest` sẽ disposes những `Intermediate Obserables` cũ và chỉ nhận item được emit ra từ `Latest Intermediate Obserables`. Được rồi hãy thử xem hình này.

![](https://images.viblo.asia/463db0b5-eabe-40b7-be9d-ad7803349a86.png)

Như các bạn thấy thì có tổng cộng 6 items được emit ra từ các `Intermediate Obserables`. Nếu như `flatMap` thì item hình vuông màu xanh lá sẽ được emit ra sau item hình thoi vuông màu xanh dương. Còn với `flatMapLatest` thì ở thời điểm  item hình thoi vuông xanh dương phát ra thì nó đã dispose 2 `Intermediate Obserables` màu đỏ và xanh rồi, lúc này sẽ chỉ quan sát các item màu xanh phát ra. Đó là vì sao ở `Observable đích` chúng ta sẽ không nhận được item xanh lá hình vuông.

Trên đây là một vài Transforming operators mà mình thấy hữu dùng mà mình cũng hay dùng. Mong bài viết có thể giúp các bạn hiểu chúng và sử dụng một cách thành thạo.

**References:** https://medium.com/swift-india/rxswift-transforming-operators-map-flatmap-flatmaplatest-and-concatmap-67dd549afde8