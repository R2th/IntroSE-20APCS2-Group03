## Introduction
Đây là bài viết cuối cùng trong chuỗi bài viết về kĩ thuật callbacks trong ứng dụng iOS, so sánh và đánh giá giữa chúng. Phần này là về **Promise**, **Event** và **Stream** cùng với ưu/nhược điểm của nó.

Điều gì là vấn đề thách thức lớp nhất đối với bạn khi viết mã nguồn bất đồng bộ? Đối với tôi, nó là giữ cho mã nguồn bất đồng bộ dễ đọc như đối với mã nguồn đồng bộ(nếu như màn nguồn đồng bộ của bạn dễ đọc :') ). Không may là, cả Swift và Objective-C đều không hỗ trợ cú pháp **async-await** giống như C#, do đó chúng ta phải làm quen với Closure callbacks, cái thực sự là công cụ tốt nhất trong các giải pháp chuẩn mà chúng ta có.

Như đã thảo luận ở các bài viết trước, khi chúng ta sử dụng Closure như là các callback thì mã nguồn sẽ nhanh chóng trở nên khó đọc, bởi vì các thức duy nhất chúng ta có thể nỗi chuỗi các callbacks là lồng chúng vào bên trong một cái khác, điều này tạo ra một kim tự tháp diệt vong([pyramid of doom](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming))).

Trong thực tế, cấu trúc lồng vào nhau của một số callbacks có thể gây ra một số bất tiện:
* Xử lý lỗi lặp đi lặp lại một cách nhàm chán: Đối với mỗi callback, chúng ta phải kiểm tra lỗi và điều hướng luồng xử lý bằng tay cho các callback tiếp theo trong trường hợp lỗi không xảy ra, hoặc xử lý lỗi của những đối tượng khác. Rất nhiều đoạn mã nguồn cần được viết ở đây.
* Không hỗ trợ quá trình huỷ: Một lần nữa, bạn phải viết nó trong mã nguồn của mình, lưu lại một vài trạng thái và kiểm tra các trạng thái hoạt động trong mỗi callback. Rất nhiều mã nguồn cần được viết.
* Khó quản lý các công việc được thực thi song song: bạn có hai hoạt động làm việc song song, khi kết thúc cần khởi chạy một hoạt động khác cái đang được đợi từ hoạt động kia. Với các callbacks truyền thống, bạn cần chia sẻ trạng thái giữa chúng và kiểm tra chéo trạng thái này trong tất cả các callbacks. Rất nhiều mã nguồn xấu xí và dễ gặp lỗi.

Do đó, sau khi sử dụng các kĩ thuật callback chuẩn theo cả chiều rộng lẫn chiều sâu chúng ta đi đến kết luận rằng nhược điểm của chúng là rất lớn do đó chúng ta cần tìm kiếm các công cụ tốt hơn, và đó chính là **[Promise](https://nalexn.github.io/callbacks-part-3-promise-event-stream/#Promise)** , **[Event](https://nalexn.github.io/callbacks-part-3-promise-event-stream/#Event)**, và **[Stream](https://nalexn.github.io/callbacks-part-3-promise-event-stream/#Stream)**.

## Promise
Mặc dù khái niệm về Promises(giống như Futures) đã có từ lâu, nó được khám phá lại bởi cộng động JS từ rất lâu và rồi ảnh hưởng tới các Cocoa developers.

Promises giảm thiểu tất cả những vấn đề nêu trên: chúng có quá trình xử lý lỗi rõ ràng, chúng hỗ trợ quá trình huỷ, có thể tổ chức các tác vụ bất đồng bộ và có thể viết code giống như code đồng bộ.

Do đó, Promise làm việc như thế nào?

Giống như **BlockOperation**, Promises sử dụng **Closure** nhằm đóng gói client code, cái được tác động ở thời điểm chính xác.

Khi chúng ta cần nối chuỗi một vài công việc bất đồng bộ nhằm thực hiện một cái sau cái khác, thay vì lồng nhau như callbacks, Promises cho phép chúng ta đẩy mã nguồn callbacks vào bên trong một khối có thứ tự tự nhiên đằng sau một cái khác, cấu trúc thành một chuỗi thay vì một kim tự tháp.

Điều này giúp mã nguồn trở nên dễ đọc và bảo trì.

Xem xét một ví dụ: Chúng ta cần gửi hai yêu cầu network tuần tự: Cái đầu tiên lấy **user** và rồi sử dụng **id** của nó để gửi đi một yêu cầu khác nhằm lấy về **posts** của người dùng đó. Trong khi các yêu cầu được thực thi, chúng ta cần hiển thị một thông điệp **"Loading..."** và ẩn nó khi cả hai yêu cầu kết thúc hoặc khi cả hai cùng gặp lỗi. Trong trường hợp lỗi xảy ra, chúng ta sẽ hiển thị chi tiết cho nó.

Rất nhiều business logic, huh? Nhưng hãy xem mã nguồn xử lý vấn đề này gọn gàng như thế nào với Promise:

```
firstly {
    // Triggering the loading indication and making the first API call
    showLoadingIndicator()
    return urlSession.get("/user")
}.then { user in
    // Notice that we use 'user.id', which was just loaded
    return urlSession.get("/user/\(user.id)/posts")
}.always {
    // The 'always' promise performs even if either of prior network requests failed
    hideLoadingIndicator()
}.then { posts in
    // The 'then' promise only performs if all the preceding promises succeeded
    // So here we can use "posts" loaded from the second request
    display(posts: posts)
}.catch { error in
    // Error handling in one place
    showErrorMessage(error)
}
```

Như bạn có thể thấy, có một vài hoạt động bất đồng bộ theo chuỗi được viết theo trình tự tự nhiên đúng như những gì chúng được thực hiện. Mã nguồn có vẻ dễ hiểu và rõ ràng hơn các Closure callbacks được lồng vào nhau.

Bản thân **Cocoa** không cung cấp cho chúng ta một đối tượng bẩm sinh(native citizen) cho Promises, do đó mã nguồn bên trên sử dụng thư viện **PromiseKit**, ngoài ra còn có **[BrightFutures](https://github.com/Thomvis/BrightFutures)** và **[Bolts](https://github.com/BoltsFramework/Bolts-ObjC)**, bạn có thể chọn cái nào bạn thích.

### Advantages of using Promises
* Sự thay thế tuyệt vời cho Closure callbacks truyền thống, giải quyết rất nhiều vấn đề của chúng:
    * Nối chuỗi các callbacks bất đồng bộ thay vì lồng chúng vào với nhau giúp tăng cường khả năng đọc hiểu mã nguồn.
    * Quá trình xử lý lỗ rõ ràng, mình bạch, tất cả các lỗi được bắt và đẩy vào một vị trí để xử lý.
    * Có khả năng tái sửa lại các lỗi và tiếp tục vào luồng ban đầu.
    * Hỗ trợ quá trình huỷ(PromiseKit và Bolts).
    * Quá trình đợi rất nhiều promises trước khi tiếp tục chuỗi có thể được xây dựng với tối thiểu nỗ lực.
* Tự động bắt tất cả các **exceptions** được đẩy ra bởi mã nguồn phía client và làm gọn chúng bằng đối tượng đơn giản là **Errors**, cái đươc xử lý như những lỗi thông thường. Điều này tăng cường sự an toàn chó bạn nếu bạn làm việc với những thứ mang nhiều rủi ro, ví dụ quá trình bóc tách JSON quen thuộc từ những Web APIs không ổn định.
* Promises được thiết kế nhằm thực hiện chỉ một lần và rồi tự huỷ. Trong những tình huống rõ ràng, đây là tính năng rất hữu ích, bởi gì điều này tăng cường sự rõ ràng cho mã nguồn điều này đảm bảo cho callback khong thể được gọi 2 lần.
* Bởi vì promises tự huỷ sau quá trình thực thi, nó rất khó gây ra rò rỉ bộ nhớ cái tham chiếu tới chính nó hoặc một đối tượng khác từ bên trong một Closure.

### Disadvantages of using Promises
* Trừ khi bạn làm chủ được kĩ năng sử dụng Promises, từ này về sau, trình biên dịch sẽ kêu trời về việc nó không thể hiểu được mã nguồn cái bạn viết với Promises. Và không thể kì vòng vào việc hiểu bất cứ quá trình giải thích ý nghĩa nào từ trình biên dịch của Swift. Do đó bạn phải chuẩn bị sẵn thời gian cần thiết để làm quen với cú pháp. Điều này rõ ràng là khó sử dụng hơn đối với người mới người chưa từng quen thuộc với Closures.
* Như đã đề cập ở phần ưu điểm, promises được thực thi một lần và rồi tự huỷ. Điều này cũng ám chỉ rằng bạn không thể dễ dàng sử dụng Promises như là một công cụ thay thế các dạng callbacks khác nhằm mục đích sử dụng nhiều lần như là Delegate hay NotificationCenter.
* Quá trình huỷ thì không được thân thiện như quá trình sử lý lỗi. Nó phục thuộc vào mục đích, bạn nên kiểm tra trạng tháy của quá trình huỷ trong mỗi promise(Bolts) hoặc xử lý loại **Error** cụ thể trong quá trình xử lý mã nguồn lỗi(PromiseKit).
* Cú pháp vẫn không tuyệt vời bởi vì nó có thể là **async-await**, cái vẫn không được hỗ trợ bởi Swift 5.0.
* Promises chậm hơn hàng trăm lần so với các kĩ thuật callback khác. Điều này là bởi mỗi promise theo sau bởi chuỗi phải được lên lịch thông qua **dispatch_async** và thực hiện một các bất đồng bộ, cái là một sự nguy hiểm cần thiết: mặt khác, promises có thể gây ra [deadlocks](https://en.wikipedia.org/wiki/Deadlock) một cách ngẫu nhiên. Vấn đề này có tên riêng là **[releasing Zalgo](https://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)**. Do đó Promises sử dụng tốt cho lớp networking, nơi mà hiệu năng kém cũng không bị chú ý, nhưng chúng ta nên suy nghĩ kĩ trước khi sử dụng Promises trong các trường hợp khác cho ứng dụng của mình.
* Quá trình gỡ rối cho promise là một nỗi đau. Như bạn đã tìm hiểu từ trước, mỗi promise theo sau trong chuỗi luôn được thực hiện một cách bất đồng bộ. Điều đó có nghĩa là việc gỡ rồi từng bước là không thể, bạn phải đặt breakpoint ở tất cả những nơi có thể theo sát luồng thực thi.
* Bất cứ công cụ báo cáo crash này, như là **Crashlytic**, hầu hết là vô ích với Promises bởi vì khi một đoạn code được lên lịch với **dispatch_async** crashes, việc in tất cả stack trace hầu như là vô ích. Bạn kì vọng sẽ thấy toàn bộ stack trace của promise, nhưng thay vào đó, chỉ có promise cuối là crashed, điều này làm bạn không thể xác định được nguồn gốc của vấn đề.

## Event
Nếu Promises có thể được sử dụng nhằm thay thế Closure callbacks, Event là sự thay thế tuyệt vời cho delegation, target-action và NotificationCenter. Điều này đã được thảo luận trong các posts trước.

Không được tuyệt cho lắm vì có 3 APIs khác nhau mỗi cái có rất nhiều điểm yếu có thể phải loại bỏ và thay thế bằng một cái khác, vẫn còn rất nhiều tính năng của các APIs? **Event** thực sự là một thay thế tuyệt vời khi bạn gặp phải vấn đề trong việc sử dụng các công cụ sẵn có, nhưng vẫn chưa có nhiều người sử dụng Streams từ Functional Reactive Programming.

Khái niệm về Event có thể tìm thấy từ C#, ở đó nó được hỗ trợ từ cấp bậc ngôn ngữ, nhưng trong Cocoa, chúng ta phải thêm vào thư viện của bên thứ ba cho Event. Đây có thể là một trong những sự lựa chọn: **[Signals](https://github.com/artman/Signals)** hoặc **[EmitterKit](https://github.com/aleclarson/emitter-kit)**

Điều thực sự được yêu thích ở Streams đó là việc triển khai đơn giản - Các thư viện Event thường chỉ khoảng vài trăm dòng mã nguồn, ngược lại hẳng với Promise hoặc FRP frameworks, nơi mà kích thước rất lớn từ 5,000 tới 55,000 dòng mã nguồn.

Events cung cấp một mô thình đồng nhất nhằm gửi đi các thông điệp cho một hoặc nhiều đối tượng nhận. Thông điệp có thể mang theo bất cứ thiết lập nào cho các tham số truyền vào với bất cứ loại dữ liệu nào(Cảm ơn cho Generics) và được gửi tới các Closures đăng kí.

Xem qua ví dụ:

```
class DataProvider {

    // These public variables are points for subscription
    let dataSignal = Signal<(data: Data, error: Error)>()
    let progressSignal = Signal<Float>()

    ...

    func handle(receivedData: Data, error: Error) {
        // Whenever we want to notify subscribers we trigger the signal with the payload data to deliver
        progressSignal.fire(1.0)
        dataSignal.fire(data:receivedData, error:error)
    }
}
```

Như bạn có thể đoán từ mã nguồn bên trên, **DataProvider** sẽ là nguồn phát ra các notifications. Bây giờ hãy xem các modules khác có thể đăng kí và xử lý các notifications này như thế nào:

```
class DataConsumer {

    init(dataProvider: DataProvider) {
        // 'progress' updates will be sampled to us every 0.5 second
        dataProvider.progressSignal.subscribe(on: self) { progress in
            // handle progress
        }.sample(every: 0.5)
        // one time subscription for tuple (data, error)
        dataProvider.dataSignal.subscribeOnce(on: self) { (data, error) in
            // handle data or error
        }
    }
}
```

### Advantages of using Events
* Hỗ trợ nhiều đối tượng nhận.
* Có khả năng truyền đi bất cứ thiết lập dữ liệu nào với sự an toàn trong quá trình kiểm tra các loại dữ liệu tĩnh. Điều này bao gồm cả các sự kiện **void** cho các notificaiton không mang theo dữ liệu.
* Tự động huỷ các đối tượng phát khi các đối tượng đăng kí lắng nghe bị huỷ(Phụ thuộc vào cách xử lý của thư viện).
* Cấu trúc rất đơn giản:
    * Chúng ta đăng kí lắng nghe(từ phía đăng kí nhận là các subscribers) tất cả các thông tin về notification(tên, loại dữ liệu) và tạo subsciption point(Điểm đăng kí phát event) một cách đồng thời với một vài dòng mã nguồn.
    * Subscription point là trung tâm vận chuyển: gửi đi một notification cũng chỉ với một vài dòng mã nguồn.
* Ràng buộc yếu(Low coupling): cả subscription point và định dạng dữ liệu truyền đi được định nghĩa ở một chỗ với những cái tên dễ hiểu nhất có thể.
* Các thư viện nhỏ, nhẹ. Mã nguồn ngắn và ít bugs.
* Bởi vì tính đơn giản trong mã nguồn của notification được truyền đi, chung ta có:
    * Call stacks có ý nghĩa nếu như mã nguồn client gặp lỗi.
    * Dễ dàng gỡ rối hơn Promises và Streams.
* Số lượng API không nhiều điều này thực sự dễ dàng trong việc hiểu và sử dụng dễ dàng, phổ biến hơn Promises và Streams.
* Các tính năng cụ thể của thư viện như là:
    * Đăng kí một lần
    * Trì hoãn các notifications.
    * Lọc và lấy mẫu theo thời gian các notifications.
    * Vận chuyển các notifications tới **OperationQueue** rõ ràng.

### Disadvantages of using Events
* Hai hoặc nhiều events không thể được kết hợp lại một các tự nhiên bằng bất cứ cách thức nào. Bất cứ business logic cái phụ thuộc vào nhiều Events khác nhau phải được viết mã ở những nơi riêng biệt(trong khi Promises và Streams có thể được kết hợp từ trong thiết kế).
* Các Events chỉ có thể được sử dụng cho quá trình vận chuyển dữ liệu theo một hướng. Chúng ta không thể lấy dữ liệu với chúng, bởi vì chúng ta có thể sử dụng delegation hoặc Closures.
* Giống như bất cứ công cụ tiện ích Closures khác mã nguồn được đóng gói cho client, bạn phải chú ý tới việc giữ các chu kì lặp lại. Đảm bảo việc sử dụng quá trình xây dựng cấu trúc giống như **[weak self]**.

## Stream
"Asynchronous data stream" hay đơn giản chỉ là Stream là khái niệm chính phía sau **Functional Reactive Programming** frameworks như là **ReactiveSwift** hay **RxSwift**. FRP là một chủ đề rất lớn, do đó chúng ta chỉ đề cập một cách ngắn gọn và tập trung chính vào ưu/nhược điểm cảu nó. Bạn có thể đọc những bài viết chi tiết hơn về nó ở một số [nơi khác](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754).

Chúng ta đã trao đổi về Event, do đó trong trường hợp này, Stream là "Event on steroids":
* Nó ghi nhớ tất cả các giá trị cái đã được gửi đi trong suốt vòng đời của mình.
* Nó có thể được kết hợp với các streams khác bằng rất nhiều [cách thức xịn xò](https://rxmarbles.com/).
* Có sự ủng hộ đáng kể về việc viết mã nguồn theo cấu trúc functional.
* Có sự tương thích sâu với các lớp Cocoa(là sự bổ sung cho framework).
* Có nhiều trường hợp sử dụng chung(Generics) hơn chỉ **observation**.

Khi kết hợp với **ReactiveCocoa** và **RxCocoa**, Streams giống như một bộ công cụ thay thế hoàn toàn những thứ khác chúng ta đã sử dụng trong Cocoa, bao gồm cả những kĩ thuật đã được đề cập lúc trước như **delegation**, **target-action**,....
Hơn thế nữa, hầu hết mẫu mã nguồn chúng ta có trong ứng dụng của mình, như là khi làm việc với **UITableView**, giờ đâu có thể được thay thế bằng một vài dòng mã nguồn UI bindings và luồng dữ liệu được kiểm soát bởi các toán tử chức năng.

Mặc dù mã nguồn hướng tính năng được ưu thích hơn và được khuyến khích hơn bởi các thư viện đó, các nhà phát triển có thể lựa chọn nhằm mở rộng cái chúng ta cần nhằm đi sâu vào thế giới functional programming - Ở mức tối thiểu chúng ta có thể sử dụng Streams giống như là Events - đối với việc vận chuyển notification, quá trình viết các callback closure là bắt buộc.

Ví dụ bên dưới về **ReactiveSwift**, cái mô tả trực tiếp làm thế nào chúng ta có thể kết hợp mã nguồn cái gửi đi các yêu cầu tìm kiếm trong khi người dùng nhập vào nội dung, chỉ giữ cho yêu cầu cuối cùng sống:

```
let searchResults = searchStrings
    .flatMap(.latest) { (query: String?) -> SignalProducer<(Data, URLResponse), AnyError> in
        let request = self.makeSearchRequest(escapedQuery: query)
        return URLSession.shared.reactive.data(with: request)
    }
    .map { (data, response) -> [SearchResult] in
        let string = String(data: data, encoding: .utf8)!
        return self.searchResults(fromJSONString: string)
    }
    .observe(on: UIScheduler())
```

Nếu bạn chưa bao giờ làm việc với các thư viện FRP, bạn có thể không biết về **flatMap**, hoặc tại sao bạn cần một **SignalProducer** ở đây mà không phải là một **Signal**. Đối với một nhà phát triển đang tham gia vào thế giớ FRP, đây là thách thức chính - cần hiểu biết về rất nhiều functions, operators và mẫu hình mã nguồn kì quái cần phải làm quen.

Dưới góc độ một nhà phát triển, Stream là kĩ thuật callback chứa nhiều thách thức nhất để học và làm chủ, nhưng lợi ích nhận lại rõ ràng cũng rất lớn.

Một lần nữa, nếu bạn muốn tìm hiểu thêm về FRP, đây là một số links hữu ích([A first look at ReactiveCocoa 3.0](https://blog.scottlogic.com/2015/04/24/first-look-reactive-cocoa-3.html), [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754))  để bắt đầu, và có một sự so sánh về ReactiveSwfit và RxSwift nếu bạn muốn xác định tích hợp cái nào vào trong project của mình.

### Advantages of using Streams
* Toàn bộ các công cụ thông thường cái bạn có thể sử dụng bất cứ nơi đâu bạn cần cho **callbacks** tới các thực thể lập trình khác. Stream có thể thay thế tất cả các kĩ thuật callbacks sẵn có trong Cocoa, và đá là một điều rất tuyệt vời.
* Có một cộng đồng mạnh, do đó bạn không cả thấy đơn độc với vấn đề của bản thân khi sử dụng Stream.
* Khuyến khích việc viết mã nguồn theo phong cách hướng functional hơn là cố định bắt buộc, cái dẫn tới vấn đề callback hell và tăng cường sự ràng buộc của mã nguồn.
* Các thư viện Stream có các Cocoa extensions với UI bindings cái giúp giảm thiểu khối lượng mã nguồn chúng ta phải viết cho quá trình cập nhật UI mỗi khi trạng thái thay đổi.
* Stream có thể kết hợp một cách tự nhiên với các streams khác nhằm xử lý vấn đề về việc có nhiều chức năng bất đồng bộ độc lập.
* Stream mang theo rất nhiều lợi thế của Events và Promises:
    * Có khả năng mang theo bất cứ cấu trúc dữ liệu nào cùng với quá trình kiểm soát nghiêm ngặt của trình biên dịch.
    * Hỗ trợ nhiều đối tượng lắng nghe.
    * Có khả năng kiểm soát vòng đời các subsriptions một cách dễ dàng.
    * Quá trình huỷ là tự động và dừng lại toàn bộ các hoạt động liên quan.
    * Xử lý lỗi ở một chỗ.
    * Có khả năng cấu trúc lại lỗi và quá trình thực thi liên tục.
    * Trì hoãn notifications.
    * Lọc và lấy mẫu theo thời gian cho các notifications.
    * Đẩy các notifications vào **OperationQueue** một cách rõ ràng.

### Disadvantages of using Streams
* Đòi hỏi kĩ năng cao hơn đáng kể so với các kĩ thuật khác. Cái này không phải là công cụ giống như Events, cái làm việc ở phạm vi bên ngoài cho bạn, bạn cần tìm hiểu rất nhiều về cách sử dụng như thế nào trước tiên.
* Rất nhiều nguồn gây ra sự khó hiểu cho nhà phát triển:
    * Hot & cold signals(streams). Bạn cần phải hiểu sự khác nhau như thế nào bởi vì điều này tác động rất lớn đến việc chúng nên được sử dụng như thế nào. Trong **RxSwift**, Hot & cold signals là rất khó nhận biết về mặt cú pháp, cái có thể dẫn tới việc khó xác định được bugs.
    * Một danh sách dài(**[Long list]**) các functions kì lạ được cung cấp bởi Stream khiến cho những nhà phát triển phải liên tục tra cứu định nghĩa và phải đọc hiểu chúng một cách cẩn thận nhừm tránh việc sử dụng sai.
    * Rất khó xác định được hành vi của Stream - Có bao nhiêu events(và loại gì) nó sẽ được sinh ra. Bạn không thể đảm bảo Stream sẽ gửi một hay nhiều events trước khi nó được hoàn thành. Một ví dụ về networking request - mã nguồn client có thể được kì vọng nhận một lần, nhưng thay vào đó, có rất nhiều giá trị trả về nếu yêu cầu một stream dữ liệu, hoặc nếu mã nguồn tự động yêu cầu dữ liệu cho trang tiếp theo của quá trình phân trang. Với RxSwift điều này là không thể nhằm khai báo một Stream cái không thể sinh ra một sự kiện lỗi, điều này có nghĩa bạn luôn phải triển khai các phần xử lý lỗi hoặc khám phá ra rất nhiều lỗi tiềm ẩn trong ứng dụng của mình nếu bạn lựa chọn việc bỏ qua các lỗi này.
* Việc làm rò rỉ bộ nhớ một cách ồ ạt, nhanh chóng là rất dễ dàng bởi vì chúng ta phải tham chiếu tới số lượng trong Objective-C bằng tay(**[[object retain] autorelease]**, có nhớ chúng không?).  Ngay cả khi sử dụng **weak** và **unowned** cho mỗi tham chiếu bên trong Closures, mỗi lần bạn khởi chạy một Stream subscription bạn nên giới hạn một cách rõ ràng vòng đời của nó sử dụng **DisposeBag** từ RxSwift hoặc **Lifetime** từ **ReactiveSwift**, hoặc bạn có nguy cơ sẽ làm rò rỉ supscription này(và có thể cả các đối tượng khác nữa) và cuối cùng làm hỏng hiệu năng của ứng dụng. Nếu bạn thích sử dụng **unowned** hơn **weak**, hãy chuẩn bị cho các crashes luôn đi. :)
* FRP frameworks khuyến khcihs sử dụng các phương thức tuỳ biến được mang vào từ các functional languages. Điều này thường được xem là trái tự nhiên trong Swift và càng làm tăng sự không rõ ràng, trừ khi bạn có một vài năm kinh nghiệm về Haskell programming làm nền tảng.
* Các frameworks này là khá nặng với các tính năng chính(15,000 và 55,000 dòng mã nguồn cho hai frameworks phổ nhiếu nhất). Điều này không chỉ làm tăng kích thước ứng dụng của bạn mà còn làm tăng thời gian khởi chạy ứng dụng. Giống như các frameworks được tải động(nạp trong lúc thực thi) khác.

## Source
#### https://nalexn.github.io/callbacks-part-3-promise-event-stream/
## Reference
#### [1. Guide to KVO in Swift 5 with code examples](https://nalexn.github.io/kvo-guide-for-key-value-observing/)
#### [2. KVO Considered Harmful](https://khanlou.com/2013/12/kvo-considered-harmful/)
#### [3. Callbacks trong ứng dụng iOS, Phần 1: Delegate, NotificationCenter, and KVO](https://viblo.asia/p/callbacks-trong-ung-dung-ios-phan-1-delegate-notificationcenter-and-kvo-Ljy5V2Qb5ra)
#### [4. Callbacks trong ứng dụng iOS, Phần 2: Closure, Target-Action, and Responder chain](https://viblo.asia/p/callbacks-trong-ung-dung-ios-phan-2-closure-target-action-and-responder-chain-3P0lPJanKox#_reference-11)
#### [5. Promise](https://nalexn.github.io/callbacks-part-3-promise-event-stream/#Promise)
#### [6. Event](https://nalexn.github.io/callbacks-part-3-promise-event-stream/#Event)
#### [7. Stream](https://nalexn.github.io/callbacks-part-3-promise-event-stream/#Stream)
#### [8. Signals](https://github.com/artman/Signals)
#### [9. EmitterKit](https://github.com/aleclarson/emitter-kit)
#### [10. The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
#### [11. A first look at ReactiveCocoa 3.0](https://blog.scottlogic.com/2015/04/24/first-look-reactive-cocoa-3.html)

## VIII. P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))