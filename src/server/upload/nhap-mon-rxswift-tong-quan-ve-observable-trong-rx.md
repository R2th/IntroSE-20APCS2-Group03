# Giới thiệu
Xin cháo các bạn, tình hình là gần đang mình đang bắt đầu tìm hiểu về một thứ được gọi là RxSwift. Trước đây thì mình cũng đã từng nhìn thấy khái niệm này rồi (trong lúc lang thang trên mấy trang web tuyển dụng IT ấy, nếu bạn nào chịu khó đọc requirements của các công ty thì sẽ thấy khá nhiều chỗ yêu cầu có kiến thức về Rx). Tuy nhiên lúc đó thì mình không để tâm đến nó lắm, mãi cho đến thời gian gần đây vì yêu cầu của công việc nên mình đã bắt đầu nghiên cứu Rx một cách nghiêm túc. Và thế là cả một chân trời mới trong việc lập trình đã mở ra trước mắt mình :) Mình gần như chìm nghỉm trong hàng tá những khái niệm và cách triển khai code mới toanh mà thời còn đi học ở trường chưa bao được tiếp cận đến cả :sob::sob:. Đến hôm nay sau khoảng hơn 1 tuần tìm hiểu thì mình quyết định đặt tay xuống "gõ" bài này với mục đích chia sẻ đến các bạn mới tiếp cận đến bộ môn này những khái niệm cơ bản trong Rx (mục đích khác là để khi nào quên cái gì thì mình có thể mở lại bài này xem cho tiện, đỡ mất công Google :) ). 
# Tổng quan
Tâm sự lan man thế là đủ rồi, bắt đầu vào việc chính nào. Đầu tiên để có thể tiếp cận được với RxSwift thì bạn phải biết nó là cái gì đã.

RxSwift là sự kết hợp của 2 thành phần **Rx** và **Swift** (quá rõ ràng đúng không, nhìn phát là thấy ngay còn gì). Swift thì chắc là mình không phải giải thích nữa rồi, phần chúng ta cần chú ý ở đây là **Rx - Reactive Programing**. Về tư tưởng thì có thể hiểu một cách ngắn gọn Reactive Programing là một phương pháp lập trình với các luồng dữ liệu bất đồng bộ và RxSwift là một thư viện giúp chúng ta làm điều này khi lập trình với Swift (các ngôn ngữ khác cũng có thư viện Rx của riền chúng như RxJava, RxKotlin,...)

Đọc đến đây có lẽ nhiều người sẽ nảy ra một câu hỏi kiểu `"Ủa, trước giờ tôi vẫn xử lý bất đồng bộ trong Swift với GCD, với Closure mà, đâu có cần đến thằng Rx này đâu"`. Ừ thì đúng là như vậy, giống như là việc bạn hoàn toàn có thể request API mà chả cần đến Alamofire hay load và cache ảnh mà chả cần đến SDWebImage hay KingFisher vậy. Việc sử dụng một thư viện chuẩn sẽ giúp bạn đơn giản hóa công việc (với những ai mới tiếp cận Rx thì cũng không hẳn là đơn giản hóa đâu :)), tối ưu hiệu năng và tránh gặp những lỗi không đáng có. 

# Những khái niệm cơ bản
RxSwift có rất nhiều khái niệm mới tuy nhiên để tóm gọn lại thì mình có thể lượt kê ra 3 thứ mà mình cho là quan trọng và thường xuyên sử dụng đến nhất khi chúng ta làm việc với thư viện này:

* Observable
* Subject
* Operator

Để đi qua hết 3 chủ đề này trong một bài viết có lẽ là một điều bất khả thi nên trong nội dung bài viết này mình sẽ chỉ đề cập đến Observable thôi nhé. Hai món kia các bạn có thể tìm hiểu trên qua các nguồn khác trên Google hoặc đợi các bài viết sau của mình nhé
# Observable
**Observable** - đây là thành phần trung tâm của RxSwift, có thể nói đây chính là phần quan trọng nhất mà bạn cần phải nắm được khi làm việc với Rx. Như tên gọi của mình, Observable là một thành phần "có thể quan sát được" bởi các thành phần khác trong hệ thống. Một Observable sẽ phát ra các sự kiện và các thành phần đang theo dõi Observable này sẽ phản ứng lại với các sự kiện đó theo những gì chúng ta cài đặt. 

![](https://images.viblo.asia/5960ddd1-59df-46c6-b2e8-9eeb52f4279c.png)


## Vòng đời của Observable
Observable chỉ có 1 nhiệm vụ duy nhất là phát đi các giá trị thế nên vòng đời của nó cũng sẽ xoay quanh các giá trị mà nó phát đi. Có 

3 Loại giá trị mà Observable có thể phát đi gồm có:

* Value: Là giá trị của dữ liệu được nguồn phát (emit) di
* Error: khi có gì đó không đúng diễn ra thì một lỗi sẽ được bắn ra và Observable cũng kết thúc ngay sau đó 
* Completed: được phát ra sau khi Observable đã hoàn thành nhiệm vụ của mình và sau đó nó cũng tự kết thúc

Khi một Observable kết thúc nó sẽ không thể phát đi thêm bất cứ giá trị nào nữa

![](https://images.viblo.asia/03802da7-d23a-433e-8218-2858f8166d79.jpeg)

Khi tìm hiểu về Observalble trên mạng các bạn sẽ rất dễ bắt gặp các biểu đồ có dạng như hình trên. Đây là biểu đồ thể hiện vòng đời của một Observable. Mình sẽ giải thích qua ý nghĩa của biểu đồ này để mọi người có gặp thì cũng đỡ bỡ ngỡ.

Đầu tiên chúng ta nhìn thấy có 2 đường thẳng có chiều từ trái sang phải, đây tương trưng cho 2 luồng dữ liệu được phát ra bởi 2 Observable khác nhau

Trên 2 đường thẳng này các bạn sẽ nhìn thấy các vòng tròn được tô màu, cái này tượng trưng cho những giá trị được phát ra bởi Observable đó

Dấu **|** tượng trưng cho **Completed**. Observable này đã hoàn thành nhiệm vụ của mình và kết thúc vòng đời của nó

Dấu **X** tượng trưng cho **Error**. Observable này đã gặp phải một lỗi nào đó và tự kết thúc vòng đời của mình


## Cách tạo một Observale
### 1. Just
```Swift
let observable1 = Observable<Int>.just(1)
```
Khá là đơn giản đúng không:

* `<Int>` là kiểu dữ liệu được phát ra, phần này có thể bỏ qua cũng được, thư viện có thể tự động suy ra kiểu dữ liệu của dữ liệu được cung cấp bởi dev.
* 1 là giá trị của dữ liệu được phát ra.
* just: thể hiện cho việc Obsevable này chỉ phát ra 1 giá trị duy nhất và sau đó sẽ tự Completed.

### 2. Of
```Swift
let observable2 = Observable.of(1, 2, 3)
let observable3 = Observable.of([1, 2, 3])
```
Tương tự như ở trên đúng không ạ, bạn chỉ cần thay just bằng of thôi. Lúc này Observable sẽ lần lượt phát ra tất cả các giá trị đã được cung cấp. 

Tuy nhiên hãy chú ý là observable3 sẽ chỉ phát ra một phần tử duy nhất là một một **Array** chứ không phát ra các phần tử trong **Array** đó đâu nhé.

### 3. From
Quay trở lại vấn đề ở trên, nếu bạn muốn Observable phát ra toàn bộ các phần tử trong một mảng thì thứ bạn cần dùng ở đây là **from** chứ không phải là **of**
```Swift
let observable3 = Observable.from([1, 2, 3])
```
Lệnh **from** sẽ giúp bạn biến đổi 1 **Array** thành một **Observable Sequence**. Các bạn có thể nhìn hình dưới đây để có thể hiểu rõ cách hoạt động hơn nhé

![](https://images.viblo.asia/54f7afab-ac11-48fb-8e52-9933a7bb7d58.png)

Như vậy đến đây là các bạn đã biết cách để khởi tạo 1 Observable rồi nhé. Tiếp tục với những kiến thức tiếp theo nào

## Subscribing to Observables
Như mình đã nói ở trên, Observable là một thành phần có thể quan sát được. Các thành phần khác có thể quan sát các phần tử mà Observable phát ra để từ đó phản ứng lại theo những gì chúng ta đã cài đặt. Muốn quan sát một Observable, việc duy nhất chúng ta cần làm là subscribe tới nó (nghe có mùi YouTube đâu đây nhỉ :)). Các bạn có thể xem qua ví dụ dưới đây
```Swift
let observable = Observable.from([1,2,3,4])
let subscriber = observable
                    .subscribe(
                    onNext: { value in
                        print(value)
                    },
                    onError: { error in
                        print(error.localizedDescription)
                    },
                    onCompleted: {
                        print("Completed")
                    })
    /*print
    1
    2
    3
    4
    Completed*/
```
Đầu tiên ở đây mình tạo ra 1 Observable lần lượt phát ra các giá trị trong mảng.

Tiếp theo, mình tạo ra một **subscriber** đăng ký đến **Observable** vừa tạo bằng lệnh **observable.subscribe**. Tiếp đó chúng ta sẽ handle các giá trị được phát ra bên trong **onNext**. Ở đây thì mỗi lần nhận được giá trị khi từ Observable phát ra thì mình sẽ print nó ra thôi. Tương tự như vậy đối với **onError** và **onComplete**. Tất nhiên nếu bạn cảm thấy k cần hanlde các trường hợp xảy ra lỗi hay khi Observable complete thì bỏ hai thằng này đi cũng không vấn đề gì, code của các bạn vẫn sẽ run ngon lành.

## Dispose và DisposeBag
Ở ví dụ trên, có một điều các bạn cần chú ý là các Observable sẽ không phát đi bất cứ giá trị nào cho tới khi nhận được subscription. Khi có đăng ký tới, Observable sẽ bắt đầu phát ra các giá trị và kết thúc khi hoàn thành nhiệm vụ của nó hoặc gặp phải lỗi. Tuy nhiên, có khi nào bạn tự hỏi
*  Nếu Observable không kết thúc thì sao
* Nếu subcriber không muốn nhận dữ liệu nữa mà Observable vẫn phát đi giá trị thì sao. Liệu chúng ta có thể chủ động hủy liên kết giữa subcriber và observable đi không

Câu trả lời tất nhiên là có rồi ! Tất cả những gì chúng ta cần làm để cancel một subscription là gọi hàm **dispose()**
```Swift
subscriber.dispose()
```
Sau khi subcriber bị hủy, Observable ở ví dụ trên sẽ dừng việc phát ra các giá trị.

Tuy nhiên, thông thường trong các class chúng ta sẽ có nhiều subscription khác nhau và việc quản lý từng thằng một sẽ khá là mất công và tẻ nhạt, nắm bắt được tâm lý này của các dev, RxSwift cung cấp cho chúng ta một thứ gọi là DisposeBag (tạm dịch: Túi đựng rác) . Cách sử dụng cái túi rác này thì cũng không có gì phức tạp lắm, các bạn xem qua ddianj code dưới đây nhé
```Swift
let disposeBag = DisposeBag()
let observable = Observable.from([1,2,3,4])
let subscriber = observable
                    .subscribe(
                    onNext: { value in
                        print(value)
                    })
                    .dispose(by: disposeBag)
```
Bằng cách này, disposeBag sẽ chứa các Disposable bển trong nó và chịu trách nhiệm gọi hàm dispose() khi disposeBag bị **deinit**.

# Tổng kết
Như vậy là thông qua bài viết này mình đã giới thiệu sơ bộ được một số khái niệm về Observable trong RxSwift đến với các bạn. Thực ra chúng ta vẫn có một số thứ có thể nói ở phần này tuy nhiên bài viết đến đây cũng khá dài rồi nên mình sẽ hẹn các bạn trong các bài viết tiếp theo nhé. 

Xin chào và hẹn gặp lại các bạn!