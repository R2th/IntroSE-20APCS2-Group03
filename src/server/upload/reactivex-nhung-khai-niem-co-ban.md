# 1. Đặt vấn đề
Một trong số những task khá phổ biến trong Android chính là thực thi một tác vụ nào đó ở background và update kết quả lên UI. <br>
Ví dụ khi các bạn call API, server thường sẽ trả về kết quả dưới dạng Json và chúng ta sẽ convert từ Json sang object và sau đó hiển thị thông tin lên UI. Với task này thì chúng ta thường sử dụng AsyncTask, hàm doInBackground() sẽ thực hiện request và trả về kết quả, còn hàm onPostExecute() thì update dữ liệu lên UI.<br>
Nhưng nếu mình muốn thông báo lỗi thì sao? Nếu update ở hàm onPostExecute() thì chúng ta cần context để update lên UI.
Giả sử quá trình này request quá lâu nhưng user lại xoay màn hình, khi đó activity sẽ bị destroy và recreate nhưng lúc này AsyncTask lại vẫn giữ reference đến activity đó và gây ra memory leak.<br>
Thì đây là một trong số những vấn đề có thể được giải quyết bằng cách sử dụng RX
# 2. ReactiveX
Reactive X hay còn gọi là RX là một thư viện hỗ trợ xử lý các tiến trình bất đồng bộ và xử lý các luồng sự kiện bằng cách sử dụng tuần tự các observable.<br>
Reactive X là sự kết hợp của Observer pattern, Iterator pattern và functional programming.<br>
![](https://images.viblo.asia/5f23b8ff-1306-4de2-9223-3d9c1456a6f6.JPG)<br>
- Observer pattern được sử dụng khi có mối quan hệ một nhiều giữa các object, nếu trạng thái của một object thay đổi thì các object phụ thuộc nó cũng tự động thay đổi<br>
- Iterator pattern: cung cấp một cách truy cập các phần tử của collection object một cách tuần tự mà không cần biết cấu trúc của nó<br>
- Functional programming sẽ giảm thiểu tối đa sự phụ thuộc, các giá trị đầu ra chỉ phụ thuộc vào các tham số đầu vào.<br>
Reactive X có sẵn bằng nhiều ngôn ngữ như C++ (RxCpp), C# (Rx.NET), Java (RxJava), Kotlin (RxKotlin) Swift (RxSwift), ...
# 3. RXJava
Ở đây, RxJava là một trong những Reactive Extension dành cho ngôn ngữ Java. Về cơ bản nó là một thư viện follow theo Observer Pattern. Nó giải quyết tốt các vấn đề về lập trình đa luồng: low-level thread, synchronization(đồng bộ hóa), thread-safety (an toàn luồng), concurrent data structure(cấu trúc dữ liệu đồng thời), non-block I/O.
## 3.1. Cấu trúc của RXJava
![](https://images.viblo.asia/ed14e8c6-84d4-4fd6-8e61-21f35705f968.JPG)<br>
Hình trên là tổng quan về cấu trúc của RxJava. Có hai lớp chính là Observable và Observer. Thêm vào đó có những thứ khác ta phải quan tâm thêm như Schedulers, Operators and Subscription.
- Observable là một luồng dữ liệu làm công việc nào đó và phát ra dữ liệu. 
- Observer là những đối tượng lắng nghe Observable và nó nhận dữ liệu từ Observable phát ra. Observer đăng ký nhận các value phát ra từ Observable thông qua phương thức subscribe<br>
- Operator, nó là một tập hợp những hàm có thể dùng giữa Observable và Observer với nhiều chức năng như tính toán, lọc hay biến đổi dữ liệu.<br>
- Schedulers đóng vai trò quan trọng trong việc hỗ trợ đa luồng, cơ bản quyết định công việc sẽ được thực hiện trên Thread nào.
- Disposable được sử dụng để hủy sự kết nối giữa Observer và Observable khi không còn cần thiết để tránh việc rò rỉ bộ nhớ.<br>
Mình sẽ đi đến từng thành phần cụ thể của RxJava nhé.
## 3.2. Observable và Observer
Như chúng ta đã biết thì một Observable sẽ phát ra một sự kiện hoặc dữ liệu nào đó, còn một Observer sẽ tiếp nhận sự kiện/dữ liệu đó bằng cách đăng ký lắng nghe Observable. Trong RxJava có rất nhiều loại Observable và cũng có nhiều cách để tạo ra một Observable<br>
Chúng ta có 5 loại Observable nhưng chỉ có 4 Observer mà thôi. Bảng dưới đây sẽ mô tả sự tương ứng giữa Observable và Observer cũng như số emissions của từng loại.<br>
|  Observable | Observer | Nums of  emisstions|
| -------- | -------- | -------- |
| Observable     | Observer     | Multiple or None     |
| Single     | SingleObserver     | One     |
| Maybe     | MaybeObserver     | One or None    |
| Flowable     | Observer     | Multiple or None     |
| Completable    | CompletableObserver     |None     |

Observer sẽ có 3 phương thức là:<br>
- onNext(): Observable gọi phương thức này khi mà có bất kỳ một item nào được bắn ra <br>
- onError(): Observable gọi phương thức này khi có lỗi xảy ra, dữ liệu không trả về.<br>
- onCompleted(): Observable sẽ gọi phương thức này khi nó gọi onNext() lần cuối cùng khi không gặp lỗi nào<br>
Sẽ không có cuộc gọi nào nữa nếu đã gọi đến onComplete hoặc onError<br>

### Cách tạo Observable
Đầu tiên chúng ta sẽ điểm qua một vài phương pháp phổ biến để tạo ra Observable:

**just**:<br>
Available: Flowable, Observable, Maybe, Single<br>
Chuyển đổi một object hoặc một tập hợp các object thành Observable và phát ra nó.

**from**:<br>
Available: Flowable, Observable<br>
Chuyển đổi các đối tượng và kiểu dữ liệu khác thành Observables<br>

**create**:<br>
Available: Flowable, Observable, Maybe, Single, Completable<br>
Tạo Observable có thể phát ra dữ liệu trong quá trình xử lý bằng cách gọi onNext() tới Observer.<br>
Với create(), bạn có thể tự thiết kế hoạt động của Observe bằng cách gọi các phương thức onError và onCompleted một cách thích hợp. Lưu ý là onComplete() hoặc onError() chỉ được gọi duy nhất 1 lần và sau đó không được gọi thêm bất cứ hàm nào khác của Observer.

**defer**:<br>
Available: Flowable, Observable, Maybe, Single, Completable<br>
Không tạo ra Observable cho đến khi có Observer đăng ký và nó sẽ luôn tạo một Observable mới mỗi khi có Observer mới đăng ký.

**interval**:<br>
Available: Flowable, Observable.<br>
Tạo một Observable phát ra một chuỗi các số nguyên cách nhau một khoảng thời gian cụ thể. 

**fromCallable**:<br>
Available: Flowable, Observable, Maybe, Single, Completable<br>
Khi có observer đăng ký, Callable đã cho được gọi và giá trị trả về của nó (hoặc ném ngoại lệ) được chuyển tiếp đến Observer.

**timer**<br>
Available: Flowable, Observable, Maybe, Single, Completable<br>
Tạo 1 Observable sẽ phát ra 1 single item sau 1 khoảng thời gian delay cho trước.

**range**<br>
Available: Flowable, Observable<br>
Tạo 1 Observable từ 1 dải Interger và lần lươt phát ra các Interger trong dải đó.

Đây là ví dụ  tạo Observable:
![](https://images.viblo.asia/a66df1a9-6d97-4150-badd-59f430911db1.JPG)
### Cách tạo Observer
Đối với mỗi loại Observer khác nhau chúng ta có cách tạo và thực thi khác nhau nhưng đều khá đơn giản.
Dưới đây là ví dụ về cách tạo Observer:
![](https://images.viblo.asia/f8d24787-f54a-40fd-85a3-e821b8bf8d41.JPG)
### Cách tạo Observer theo dõi Observable
Đây là các phương thức cơ bản để khiến cho Observer đăng ký theo dõi Observable.
![](https://images.viblo.asia/ff42da5f-564e-4c01-8eb6-6206c9eb77d2.JPG)<br>
Observer đăng ký nhận các value phát ra từ Observable thông qua phương thức subscribe()
## 3.3. Operators
RXJava cung cấp tập hợp lớn các operator hỗ trợ cho việc thao tác với dữ liệu.<br>
Operator được phân chia thành nhiều loại dựa trên loại công việc chúng làm.<br>
Ví dụ như nhóm tạo Observable thì có create, just, ...<br>
Nhóm lọc dữ liệu: filter, skip, take, ...<br>
Nhóm tạo Observable từ dữ liệu của Observable khác như buffer, map, flatmap, ...<br>

Hầu hết các Operator đều hoạt động trên một Observable và trả về một Observable khác nên nó rất phù hợp để bạn nối các Operator với nhau để ra được Observable mong muốn trước khi gửi nó cho Subscriber.<br>
Một lưu ý là khi sử dụng nhiều Operator thì kết quả của Operator trước sẽ truyền cho Operator sau.<br>

Một số operator thường dùng:<br>
**filter()**<br>
Cho phép Observable trả về những giá trị thỏa mãn những điều kiện nhất định. Phương thức filter() thực hiện kiểm tra Predicate và áp dụng điều kiện cho các giá trị trong danh sách<br><br>
![](https://images.viblo.asia/1b33390c-38ea-4e56-86a6-554a980950bb.JPG)<br>

**skip()**<br>
Bỏ qua n phần tử đầu trong danh sách được bắn ra bởi một Observable. <br>
Giả sử bạn có một Observable trả ra các số nguyên từ 1->10 và skip(4): nó sẽ bỏ qua 4 phần tử đầu và trả ra các giá trị là: 5 6 7 8 9 10:
![](https://images.viblo.asia/0d1bd737-7055-4d9b-a340-441cc1857187.JPG)

**skipLast(n)**<br>
Bỏ qua n phần tử cuối cùng từ một Observable

**take(n)**<br>
Nó đối lập với skip. Nó chỉ bắn ra n phần tử đầu tiên của một Observable. Trong ví dụ dưới đây, nó chỉ lấy ra 4 phần tử đầu tiên và bỏ qua các phần tử còn lại: <br>
![](https://images.viblo.asia/8dfe47f5-a376-42c0-a8e9-5f945893e318.JPG)

**takeLast(n)**<br>
Bắn ra n giá trị cuối cùng của Observable và bỏ qua các giá trị còn lại.

**distinct()**
Loại bỏ các giá trị trùng lặp được trả về bởi Observable. Toán tử Distinct sử dụng rất tốt với các kiểu dữ liệu nguyên thủy. Nhưng nếu sử dụng nó với một kiểu dữ liệu tùy chỉnh thì bạn cần ghi đè các phương thức equal() và hashcode().<br>

**map()**<br>
Biến đổi các item được phát ra bởi Observable bằng cách apply function nào đấy cho mỗi item.

**flatmap()**<br>
Biến đổi các item được phát ra bởi Observable thành các Observables khác nhau , sau đó gộp các emissions lại thành 1 Observable.<br>
Bởi vậy, cần chú ý rằng flatMap sẽ không quan tâm đến thứ tự của các item
## 3.4. Subject
Subject là một loại cầu nối có sẵn trong RX, nó là sự mở rộng của Observable nhưng cũng triển khai interface Observer.<br>
Vì nó như là một observer nên có thể subscribe một hoặc nhiều Observable.<br>
Nó cũng là một Observable nên nó có thể bắn ra các item mới cho Observer.<br>
Có 4 loại Subject là AsyncSubject, BehaviorSubject, ReplaySubject và PublishSubject<br>
### PublishSubject 
![](https://images.viblo.asia/5831f32c-331f-4884-9705-656801dc000f.JPG)<br>
PublishSubject là một loại subject rõ ràng nhất. Subject sẽ gửi dữ liệu đến tất cả các subscriber đã subscribe đến nó tại thời điểm đó.
### ReplaySubject
![](https://images.viblo.asia/d58a8206-ecca-4aa6-ba8a-e8ef0b42140a.JPG)<br>
ReplaySubject: nó sẽ phát ra tất cả item mà nó có cho bất kỳ observer nào đăng ký tới nó.
### AsyncSubject
![](https://images.viblo.asia/ac02967b-ef4c-4041-a91f-e2dff33b8e3a.JPG)<br>
AsyncSubject: sự khác nhau là nó không phát ra bất kỳ value nào cho đến khi chuỗi hoàn tất. <br>
Nó chỉ phát ra một value đơn và complete ngay lập tức
### BehaviorSubject
![](https://images.viblo.asia/5857ebd3-1cc3-482f-a4f2-a351c5a8f632.JPG)<br>
BehaviorSubject: khác với ReplaySubject sẽ phát lại từ đầu thì với behaviorSubject, khi một observer đăng ký thì nó sẽ bắt đầu bằng cách phát ra item được phát gần đây nhất
## 3.5. Schedulers
Như bên trên mình có nói, Schedulers sẽ quyết định thread nào mà trên đó Observable sẽ phát ra dữ liệu và trên Observer sẽ nhận dữ liệu trên thread nào.<br>
Có rất nhiều loại Schedulers như là:
- Schedulers.io(): sẽ được sử dụng khi không dùng đến CPU, thực hiện các công việc chuyên sâu như networks call, đọc/đĩa file, database, ...
- Schedulers.newThread(): sẽ tạo ra một thread mới cho mỗi đơn vị công việc.
- AndroidSchedulers.mainThread(): cung cấp truyền truy cập đến MainThread, thông thường cập nhật giao diện hay tương tác 
với người dùng sẽ xảy ra trên luồng này.
- computation(): xử lý các công việc CPU như xử lý xuer liệu lớn, xử lí bitmap, ...
- single(): sẽ thực hiện tất cả các nhiệm vụ theo thứ tự tuần tự mà chúng được add vào
- immediate(): thực hiện nhiệm vụ ngay lập tức một cách đồng bộ bằng cách chặn mainThread

Một trong những điểm mạnh nhất của RxJava là sự đơn giản, dễ dàng kiểm soát đa luồng bằng việc sử dụng subscribeOn và observeOn. Chúng giúp chúng ta quyết định xử lý data trên thread nào hay khi trả về data thì đẩy lên thread nào.<br>
![](https://images.viblo.asia/c8b1c08a-0ff6-41fc-a3c9-867dd17e2330.JPG)<br>
- subscribeOn(): Nhận vào tham số là một  Scheduler, sẽ quyết định việc xử lý các phần tính toán để tạo nên một Observable trên thread cung cấp bởi Scheduler đó.<br>
Có thể gọi hàm này bất kỳ chỗ nào giữa Observable và Subscriber bởi vì nó chỉ có tác dụng khi hàm subscribe() được gọi đến.<br>
Nếu bạn gọi nhiều lần hàm subscribeOn() với các Scheduler khác nhau thì cũng chỉ có hàm gọi đầu tiên  từ trên xuống là có tác dụng thôi.<br>
- observeOn(): Hàm này nhận vào tham số là một Scheduler sẽ làm cho các Operator hay Subscriber được gọi đằng sau nó chạy trên thread được cung cấp bởi Scheduler đó.<br>
Trong ví dụ trên, sau khi gọi .observeOn(AndroidSchedulers.mainThread()) thì  subscribe sẽ chạy trên thread mà nó chỉ định tức mainThread.
## 3.6. Disposable
Như bên trên mình có trình bày, disposable được sử dụng để hủy sự kết nối giữa Observer và Observable khi không còn cần thiết để tránh việc rò rỉ bộ nhớ.<br>
Ngoài ra còn có CompositeDisposable sinh ra để quản lý tất cả các Disposable mà bạn mong muốn. Khi bạn muốn dispose() thì chỉ cần gọi composite.dispose() là xong
# 4. Tổng kết
Trên đây là những tìm hiểu cơ bản của mình về RX. Hi vọng đã cung cấp cho các bạn những thông tin bổ ích!
# 5. Tài liệu tham khảo
http://reactivex.io/<br>
https://github.com/ReactiveX/RxJava