Với sự ra mắt mới đây của `Combine` đã cho thấy rằng sự cấp thiết của việc binding đối với `Swift` . Trước khi đợi apple hoàn thiện nó, chúng ta vẫn nên sử dụng RxSwift hiện tại. Khi đã hiểu được RxSwift thì tiếp cần Combine cũng dễ dàng hơn. Ở bài viết này mình sẽ viết về các Combine Operators phổ biến của RxSwift. Để hiểu rõ hơn việc sử dụng nó và cách nó hoạt động như thế nào, ngoài việc đọc và thực hành ra, các bạn có thể sử dụng trang web [RxMarbles](https://rxmarbles.com/) như một công cụ để việc học RxSwift được dễ dàng hơn.
## CombineLatest
`combineLatest:` là một trong những operators mà bạn sẽ sử dụng rất nhiều. Operator này sẽ gộp 2 item mới nhất được phát ra từ hai observables nguồn và trả lại cho chúng ta. Điều cần lưu ý ở đây chính là để nhận được item được emit ra từ operator này thì cả 2 observables nguồn đều phải phát ra ít nhất 1 item trước đó.
![](https://images.viblo.asia/fcdf506c-7dca-4f00-a39c-c977f3605167.png)
Như các bạn thấy ví dụ ở đây có 2 observables nguồn là observables emit ra màu (ở trên) và observables emit ra hình dạng (ở dưới). Ở thời điểm observables emit ra màu tím thì `combineLatest` vẫn chưa emit ra gì cả bởi vì observables emit ra hình dạng chưa emit bất kỳ một item nào cả.
Chính vì đặc được như vậy operator này hay được sử dụng khi giá trị trả ra này phụ thuộc vào sự pha trộn của các Observables khác đặc biệt là khi sync data giữa server và client, hay đơn giản là việc enable một button khi thoả mãn điều kiện của 2 ô textfields.
Đây là một đoạn code expample: 
```
import Foundation
import RxSwift

let disposeBag = DisposeBag()

let intervalObservable = Observable<NSInteger>
            .interval(0.1, scheduler: MainScheduler.instance)
            .take(3)

let sourceObservableA = Observable
            .zip(Observable.of("🔴", "🔵", "🔺"), intervalObservable,
                 resultSelector: { value1, _ in
            return value1
        })

let sourceObservableB = Observable<NSInteger>
            .interval(0.2, scheduler: MainScheduler.instance)
            .take(3)
            .map { "B\($0)" }

 Observable.combineLatest(
            sourceObservableA, sourceObservableB,
            resultSelector: { value1, value2 in
                print("\(value1) \(value2)")
        }).observeOn(MainScheduler.instance)
            .subscribe()
            .disposed(by: disposeBag)

/* Output
🔵 B0
🔺 B0
🔺 B1
🔺 B2
*/
```

## Zip
`zip:` operator cũng tương tự như `combineLatest:`, tuy nhiên `zip:` lại luôn tạo theo từng cặp các event có cùng index. Hãy cùng nhìn ví dụ sau đây trên Rxmarbles 
![](https://images.viblo.asia/29d21b7a-2bdf-47a4-8b5a-e3a739ad666c.png)
Có thể thấy thời điểm item 1 được emit ra thì zip cũng chưa thể trả lại gì cả tương tự như `combineLatest:`. Nhưng khác là `zip:` phối hợp các item từ observables nguồn dựa theo `index`. Nếu như là `combineLatest:` thì ở thời điểm emit ra item 2 thì ở `combineLatest:` sẽ nhận được là 2A như hình vẽ: 
![](https://images.viblo.asia/b03ef6cc-79a6-4902-a0a3-b25255bb6660.png)
Nhưng vì `zip:` dựa theo index để phối hợp nên nó sẽ tìm đến item thứ 2 được emit từ observables dưới để phối hợp. Vì vậy mà khi item B được emit ra ngay lập tức operators này sẽ trả về cho bạn kết quả.

## WithLatestFrom
Nếu như 2 toán tử trên sẽ emit khi mà một trong 2 observables nguồn phát ra event miễn là thoả điều kiện từng toán tử. Nếu như có sự ràng buộc rõ hơn của observables này thì sao. Trong lập trình chúng ta rất hay gặp một **trigger event** nào đó xảy ra để lấy ra dữ liệu, đó chính là điều mà `withLatestFrom:` làm. Toán tử này sẽ coi một observables là triggers, observables còn lại sẽ lại nguồn. Mỗi khi **trigger** được emit ra thì nó sẽ trả ra trigger đó và item mới nhất từ observables nguồn, nếu observables nguồn chưa phát ra items nào thì sẽ không có item nào emit ra từ toán tử cả. Hãy xem và phân tích marble này: 
![](https://images.viblo.asia/bc929f4a-ba85-48cf-a89d-21a9e730e6dc.png)
Observables ở trên sẽ đóng vai trò là triggers, observables dưới sẽ là nguồn điều này giống như việc bạn click vào một cell của tableView vậy. Thao tác selected cell sẽ là trigger còn data của cell đó sẽ là observables nguồn (và tất nhiên chúng ta luôn muốn khi tap vào cell thì lấy được thông tin mới nhất của cell đó đúng không nào). Hãy cùng phân tích marble trên nào:
* Khi trigger 1 được emit ra, thật không may là chẳng có data nào được phát ra ở observable nguồn cả dó đó chúng ta sẽ không nhận được kết quả gì ở toán tử.
* Khi item A được emit ra ở observables nguồn thì ko như 2 toán tử còn lại nó sẽ ko trả ra kết quả bởi vì sao? Bởi vì ở `withLatestFrom:` nó sẽ phát ra chỉ khi trigger được emit. Thật không cần thiết khi chưa bấm vào cells mà đã có data trả ra rồi.
* Khi trigger 2 được emit ra, nó sẽ lấy theo item mới nhất ở observables nguồn lúc này là item A và kết quả ở operator sẽ là 2A tại thời điểm này.

## Tổng kết
Chúng ta nhận thấy rằng:
* `combineLatest:` sẽ được ưa sử dụng với việc cập nhật các biến phụ thuộc vào 2 hay nhiều điều kiện nào đó.
* `withLatestFrom:` sẽ là được dùng theo kiểu trigger, và tất nhiên là rất hay dùng rồi.
* `zip:` giống `combineLatest:` nhưng mà dựa theo index.

### References: https://medium.com/swift-india/rxswift-combining-operators-combinelatest-zip-and-withlatestfrom-521d2eca5460