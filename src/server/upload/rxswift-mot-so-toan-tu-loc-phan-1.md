## Toán tử Ignore
Như được mô tả trong sơ đồ sau đây, ignoreElements sẽ bỏ qua các phần tử của sự kiện .next.

Tuy nhiên, nó sẽ cho phép thông qua các sự kiện .completed hay .error.

![](https://images.viblo.asia/10495767-2ee5-41e1-bcbf-500403f53b08.png)

> Lưu ý: Cho đến bây giờ bạn đã thấy các biểu đồ được sử dụng cho tất cả các loại. Loại sơ đồ này giúp hình dung cách hoạt động của các toán tử. Dòng trên cùng là observable đang được đăng ký. Nằm trong hình chữ nhật đại diện cho toán tử và các tham số của nó, và dòng dưới cùng là subscriber, hoặc cụ thể hơn, những gì subscriber sẽ nhận được sau khi toán tử thực hiện.
> 

Thêm ví dụ này vào playground:
```
example(of: "ignoreElements") {
  // 1
  let strikes = PublishSubject<String>()
  let disposeBag = DisposeBag()
// 2
  strikes
    .ignoreElements()
    .subscribe { _ in
        print("You're out!")
    }
    .disposed(by: disposeBag)
}
```

Dưới đây là những gì bạn đang làm:
1. Tạo subject strikes.
2. Đăng ký tất cả các sự kiện của strikes, nhưng ignore tất cả các sự kiện .next bằng cách sử dụng ignoreElements.

ignoreElements rất hữu ích khi bạn chỉ muốn được thông báo khi một observable đã chấm dứt, thông qua sự kiện .completed hoặc .error. Thêm mã này vào ví dụ:
```
strikes.onNext("X")
strikes.onNext("X")
strikes.onNext("X")
```

Bạn có thể thêm sự kiện .completed vào chủ đề này để cho phép subscriber được thông báo. Thêm mã này để làm điều đó:
```
  strikes.onCompleted()
```
Bây giờ, subscriber sẽ nhận được sự kiện .completed và print.
```
 --- Example of: ignoreElements ---
You're out!
```

Có thể đôi khi bạn chỉ muốn xử lý phần tử thứ n được phát ra bởi một observable, chẳng hạn như strike thứ ba. Để làm điều đó bạn có thể sử dụng elementAt, nó chỉ lấy phần tử bạn muốn nhận, và nó bỏ qua mọi thứ khác. Trong sơ đồ, elementAt được truyền một chỉ số 1, vì vậy nó chỉ cho phép thông qua phần tử thứ hai.

![](https://images.viblo.asia/cff76450-45b1-48b4-97ac-a8b4870ba10f.png)

Thêm ví dụ mới này:
```
example(of: "elementAt") {
  // 1
  let strikes = PublishSubject<String>()
  let disposeBag = DisposeBag()
// 2
  strikes
    .elementAt(2)
    .subscribe(onNext: { _ in
      print("You're out!")
    })
    .disposed(by: disposeBag)
}
```

1. Bạn tạo một Subject.
2. Bạn đăng ký tới sự kiện .next, ignore tất cả trừ sự kiện thứ 3 (index 2)

Bây giờ, bạn có thể chỉ cần thêm các strike mới vào Subject và đăng ký của bạn sẽ cho bạn biết khi nào có sự kiện .next xảy ra. Thêm mã này:
```
strikes.onNext("X")
strikes.onNext("X")
strikes.onNext("X")
```
```
 --- Example of: elementAt ---
You're out!
```
Kiểm tra sơ đồ này, chỉ có 1 và 2 được thông qua, bởi vì bộ lọc chỉ cho phép các phần tử nhỏ hơn 3.
![](https://images.viblo.asia/80a6023f-a743-41fe-bd16-1de5b38917a4.png)
Thêm ví dụ này vào playground của bạn:
```
example(of: "filter") {
  let disposeBag = DisposeBag()
// 1
  Observable.of(1, 2, 3, 4, 5, 6)
    // 2
    .filter { integer in
      integer % 2 == 0
    }
// 3
    .subscribe(onNext: {
      print($0)
})
    .disposed(by: disposeBag)
}
```

1. Bạn tạo một observable của một số số nguyên được xác định trước.
2. Bạn sử dụng bộ lọc để ràng buộc có điều kiện bỏ qua các số lẻ. bộ lọc trả về một Bool. Trả về true để cho phần tử thông qua hoặc false để ngăn chặn nó. bộ lọc sẽ lọc các phần tử trong suốt thời gian đăng ký.
3. Bạn đăng ký và in ra các phần tử từ bộ lọc.

Kết quả của việc sử dụng bộ lọc này là chỉ có số chẵn được in.
```
--- Example of: filter ---
2
4
6
```

## Toán tử Skip

Có thể bạn cần bỏ qua một số yếu tố. Tiếp tục với ví dụ về dự báo thời tiết, có thể bạn không muốn nhận dữ liệu dự báo hàng giờ cho đến hết ngày. Toán tử skip cho phép bạn bỏ qua từ số 1 đến số bạn chỉ định. Biểu đồ này cho thấy bỏ qua 2 phần tử đầu tiên.
![](https://images.viblo.asia/2188b463-683e-4a24-a852-c83e95189b72.png)

Nhập ví dụ mới này vào playground của bạn:
```
example(of: "skip") {
  let disposeBag = DisposeBag()
// 1
  Observable.of("A", "B", "C", "D", "E", "F")
    // 2
    .skip(3)
    .subscribe(onNext: {
print($0) })
    .disposed(by: disposeBag)
}
```
1. Tạo một observable của các chữ cái.
2. Sử dụng tính năng skip để bỏ qua 3 phần tử đầu tiên và đăng ký các sự kiện .next.

Sau khi bỏ qua 3 phần tử đầu tiên, chỉ D, E và F được in như sau:
```
--- Example of: skip ---
D
E
F
```

Giống như bộ lọc, skipWhile cho phép bạn bao gồm một điều kiện để xác định những gì cần được bỏ qua. Tuy nhiên, không giống như bộ lọc, bộ lọc sẽ lọc các phần tử trong suốt thời gian đăng ký, skipWhile sẽ chỉ bỏ qua cho đến khi một cái gì đó không bị bỏ qua, và sau đó nó sẽ cho phép mọi thứ khác thông qua từ điểm đó.

Và với skipWhile, trả về true sẽ khiến nguyên tố bị bỏ qua và trả về false sẽ cho phép nó vượt qua. Nó ngược lại với bộ lọc. Trong sơ đồ này, 1 được ngăn chặn bởi vì 1% 2 bằng 1, nhưng sau đó 2 được cho phép thông qua vì nó không thành công, và 3 (và mọi thứ khác đi tiếp) được thông qua vì skipWhile không còn skip nữa.
![](https://images.viblo.asia/e95637b0-96c8-41a5-bd84-011106045c69.png)

Thêm ví dụ mới này vào playground của bạn:
```
example(of: "skipWhile") {
  let disposeBag = DisposeBag()
// 1
  Observable.of(2, 2, 3, 4, 4)
    // 2
    .skipWhile { integer in
      integer % 2 == 0
    }
    .subscribe(onNext: {
      print($0)
})
    .disposed(by: disposeBag)
}
```
1. Tạo một observable cho các số nguyên.
2. Sử dụng skipWhile với một điều kiện bỏ qua các phần tử cho đến khi một số nguyên lẻ được phát ra.

skip chỉ bỏ qua các phần tử cho đến khi phần tử đầu tiên được thông qua, và sau đó tất cả các phần tử còn lại được cho phép thông qua.
```
--- Example of: skipWhile ---
3
4
4
```

Trong sơ đồ này, skipUntil bỏ qua các phần tử được phát ra bởi observable gốc (dòng trên cùng) cho đến khi trigger có thể quan sát được (dòng thứ hai) phát ra một sự kiện .next. Sau đó, nó dừng bỏ qua và cho phép mọi thứ từ đó trở đi.
![](https://images.viblo.asia/174d7807-0205-47b2-9a1e-27642d7cf11e.png)

Thêm ví dụ này để xem cách skipUntil làm việc:
```
example(of: "skipUntil") {
  let disposeBag = DisposeBag()
// 1
  let subject = PublishSubject<String>()
  let trigger = PublishSubject<String>()
// 2
  subject
    .skipUntil(trigger)
    .subscribe(onNext: {
print($0) })
    .disposed(by: disposeBag)
}
```

1. Tạo Subject để mô hình hóa dữ liệu bạn muốn và một subject khác để mô hình hóa trình kích hoạt.
2. Sử dụng skipUntil với trigger subject. Khi trigger được phát ra, skipUntil sẽ ngừng skip.

Thêm một vài sự kiện .next:
```
 subject.onNext("A")
subject.onNext("B")
```

Không có gì được in ra, bởi vì bạn đang skip. Bây giờ, hãy thêm sự kiện .next mới vào:
```
trigger.onNext("X")
```

Làm như vậy sẽ khiến skipUntil ngừng skip. Từ thời điểm này trở đi, tất cả
sẽ được thông qua. Thêm một sự kiện .next khác:
```
subject.onNext("C")
```

Chắc chắn nó được in ra.
```
 --- Example of: skipUntil ---
C
```

Vậy là các bạn đã biết được tính năng của một số toán tử. 
Phần sau mình sẽ giới thiệu tiếp một số toán tử lọc còn lại.
Còn tiếp..