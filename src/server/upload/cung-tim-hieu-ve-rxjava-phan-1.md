# Reactive(Rx) programming là gì?
***Reactive programming là lập trình các luồng dữ liệu không đồng bộ.***
# 1. Tại sao dùng Rx?
Chúng ta cùng xem xét các trường hợp:

> Người dùng mong muốn dữ liệu luôn được cập nhật liên tục (realtime). Họ muốn đơn hàng được xác nhận ngay lập tức. Họ cần thông tin về giá cả của sản phẩm phải luôn được cập nhật chính xác ngay tại thời điểm mà họ xem món hàng. Các trò chơi trực tuyến của họ cần phải được phản hồi ngay lập tức. Là một developer, bạn muốn tin nhắn tự tìm đến mục tiêu của nó khi được gửi đi. Bạn không muốn bị hoãn lại vì phải chờ đợi kết quả. Bạn muốn kết quả được gửi đến bạn ngay khi nó đã sẵn sàng. Hơn thế nữa, khi làm việc với các tập kết quả, bạn muốn nhận từng kết quả riêng biệt ngay khi chúng sẵn sàng. Bạn không muốn chờ đợi xử lý hết toàn bộ tập kết quả trước khi nhìn thấy chúng. Các developer có tool để gửi dữ liệu (cái này thì easy). Hơn thế nữa, các developer cần tool để kiểm soát phản ứng với việc gửi dữ liệu.


Rx có nhiều lợi ích sau:

* **Unitive**: các truy vấn trong Rx được thực hiện giống như các thư viện khác lấy cảm hứng từ functional programming, chẳng hạn như các Java stream. Trong Rx, ta có thể sử dụng các phép biến đổi kiểu chức năng trên các luồng sự kiện.

* **Extensible**: RxJava có thể được mở rộng bằng các operator tùy biến. 

* **Declarative**: Chuyển đổi các chức năng thì có thể được đọc bằng cách khai báo.

* **Composable**: Các Rx operator có thể được kết hợp để tạo ra các operator phức tạp hơn.

* **Transformative**: Các Rx operator có thể chuyển hóa một kiểu dữ liệu sang kiểu khác, reduce, map hoặc mở expand các luồng khi cần thiết.

Khi nào thích hợp khi sử dụng Rx:

*Rx phù hợp với việc compose và consume các chuỗi của các sự kiện(event sequence).*

**Nên dùng Rx:**

* Các UI event như di chuyển chuột, click chuột.
* Các Domain event như thay đổi thuộc tính, tập hợp được cập nhật, “Đơn hàng được điền xong”, “Việc đăng ký hoàn tất”,...
* Các Infrastructure event như theo dõi file, các sự kiện hệ thống và WMI.
* Các Integration event như broadcast từ message bus hoặc gửi sự kiện từ WebSockets API hoặc low latency middleware như Nirvana.
* Tích hợp với CEP engine như StreamInsight hoặc StreamBase.

**Có thể dùng Rx:**

* Kết quả của việc sử dụng Future pattern hoặc các pattern tương tự.

**Không nên dùng Rx:**

* Translate các iterable sang các observable chỉ vì lợi ích khi làm việc đó thông qua một thư viện Rx.

***Điều hay nhất là bạn được cung cấp một hộp công cụ tuyệt vời của các hàm để kết hợp, tạo và lọc bất kỳ luồng nào trong số các luồng đó.***

# 2. Các Key type:
Rx dựa trên hai loại cơ bản, một số loại khác được mở rộng chức năng dựa trên các loại cốt lõi. Hai loại cốt lõi là Observable và Observer. 

Rx xây dựng dựa trên [Observer](https://en.wikipedia.org/wiki/Observer_pattern) pattern. Event handling đã tồn tại trong Java (EventHandler của JavaFX). Đó là những cách tiếp cận đơn giản, nhưng sẽ rất “thốn” nếu không dùng Rx để thực hiện:

* Các event thông qua các event handler rất khó để làm.
* Chúng không thể truy vấn theo thời gian.
* Chúng có thể là nguyên nhân gây ra memory leaks.
* Đây không phải là cách tiêu chuẩn để thực hiện việc hoàn thành các tín hiệu.
* Yêu cầu xử lý một cách thủ công đồng thời và đa luồng.
 
## 2.1. Observable:

![](https://images.viblo.asia/9e8e8122-e653-419f-92a5-4802294bb7e6.png)

[Observable](http://reactivex.io/RxJava/javadoc/rx/Observable) là loại cốt lõi đầu tiên chúng ta đề cập tới. Class này bao gồm rất nhiều triển khai của Rx, bao gồm tất cả các operator cốt lõi. Chúng ta sẽ tìm hiểu về nó từng bước một trong series bài viết này của mình. Hiện tại, chúng ta phải hiểu phương thức `subscribe`. Đây là một phương thức overload:

```java 
public final Subscription subscribe(Subscriber<? super T> subscriber)
```

Đây là phương thức mà bạn dùng để nhận các value được phát ra bởi observable. Khi các value được gửi đi, chúng được gửi đến các subscriber mà sau đó chịu trách nhiệm về hành vi mà consumer đã dự định. `Subscriber` ở đây là một triển khai của một Observer interface.

Một Oservable phát ra 3 loại event là:

* Các value.
* Completion mà biểu thị rằng sẽ không có các value sẽ được phát ra thêm nữa.
* Các Error, nếu có gì đó khiến chuỗi thất bại. Những sự kiện này cũng có nghĩa là chuỗi bị chấm dứt gián đoạn.

## 2.2. Observer:
Chúng ta vừa xem qua một abstract implementation của [Observer](http://reactivex.io/RxJava/javadoc/rx/Observer.html) là `Subscriber`. `Subscriber` triển khai một số các chức năng bổ sung và nên được sử dụng để làm cơ sở cho việc triển khai `Observer`. Bây giờ, hãy cùng hiểu interface `Observer` nhé:

```java
interface Observer<T> {
    void onCompleted();
    void onError(java.lang.Throwable e);
    void onNext(T t);
}
```

Ba phương thức trên là các hành vi được thực hiện mỗi lần observable phát đi một value. Observer sẽ có phương thức `onNext` của nó được gọi 0 hoặc nhiều lần, tùy chọn tiếp theo sẽ là một `onCompleted` hoặc một `onError`. Sẽ không có cuộc gọi nào nữa nếu có cuộc gọi đến `onCompleted` hoặc `onError`.

Khi phát triển code Rx, bạn sẽ gặp rất nhiều `Observable`, nhưng sẽ không `Observer` nhiều lắm. Điều quan trọng là hiểu `Observer`, có nhiều cách ngắn gọn để loại bỏ những thứ cần thiết khi khởi bạn tự khởi tạo nó.

## 2.3. Triển khai Observable và Observer:

Bạn có thể triển khai `Observer` một cách thủ công hoặc mở rộng `Observable`. Thực tế thì thường là sẽ không cần thiết vì Rx đã cung cấp tất cả các building block mà bạn cần. Nó cũng nguy hiểm, như sự tương tác giữa các phần của Rx bao gồm các convention và internal blumping khá khó đối với beginner. Điều này cũng đơn giản và an toàn hơn khi sử dụng nhiều tool mà Rx đem đến cho bạn để tạo ra chức năng mà bạn cần.

Để subscribe tới một oservable, không cần thiết phải cung cấp các instance của `Observer`. Có các overload để `subscribe` mà đơn giản lấy các chức năng được thực thi `onNext`, `onError` và `onSubscribe`, che giấu sự khởi tạo `Observer` tương ứng. Cũng không cần thiết phải cung cấp một trong các chức năng đó. Bạn có thể cung cấp một tập con của chúng (vd: chỉ cần `onNext`, `onError` và `onSubscribe`).

## 2.4. Subject:

Các subject là một sự mở rộng của `Observable` mà cũng triển khai interface `Observer`. Nghe có vẻ hơi lạ nhưng chúng khiến mọi việc đơn giản hơn trong một số trường hợp. Chúng có thể có các event được gửi đến chúng (giống như các observer), sau đó gửi đến các subscriber của chúng (giống như các observer). Điều này khiến chúng trở thành các entry point lý tưởng vào bên trong code Rx: khi bạn có các value đến từ bên ngoài Rx, bạn có thể gửi chúng vào bên trong một `Subject`, chuyển chúng thành observable. Bạn có thể nghĩ chúng là các entry point đến một Rx pipeline.

`Subject` có 2 parameter type: input type và output type. Điều này được thiết kế để dành cho sự trừu tượng hóa và không phải vì việc sử dụng phổ biến cho các subject liên quan đển các value được chuyển đổi. Sẽ có các operator chuyển đổi để làm điều đó, chúng ta sẽ xem sau.

Có một vài cách triển khai khác nhau của `Subject`. Chúng ta sẽ cùng thử một ví dụ quan trọng nhất.

### 2.4.1. PublishSubject:

![](https://images.viblo.asia/4d39ab2c-1b09-4a9e-b842-f884d4923d83.png)

`PublishSubject` là một loại subject rõ ràng nhất. Khi một value được gửi vào bên trong một `PublishSubject`, subject sẽ gửi nó đến tất cả các subscriber mà đã subsribe đến nó tại thời điểm đó.
```java
public static void main(String[] args) {
	PublishSubject<Integer> subject = PublishSubject.create();
	subject.onNext(1);
	subject.subscribe(System.out::println);
	subject.onNext(2);
	subject.onNext(3);
	subject.onNext(4);
}
```

Output:

```java
2
3
4
```

Trong ví dụ trên, chúng ta có thể thấy rằng `1` không được in ra bởi vì chúng ta chưa subscribe khi nó được gửi đi. Sau khi chúng ta subscribe, chúng ta bắt đầu nhận các value được gửi đến subject.

### 2.4.2. ReplaySubject:

![](https://images.viblo.asia/ace0f1d1-9dbe-4bb4-bddc-15751ead6582.png)

`ReplaySubject` có một tính năng đặc biệt là cache tất cả các value được gửi đến nó. Khi có một subscription mới được tạo ra, chuỗi event được phát lại từ lúc bắt đầu cho subscriber mới. Sau khi hoàn thành, tất cả subscriber nhận các event mới như bình thường.
```java
ReplaySubject<Integer> s = ReplaySubject.create();	
s.subscribe(v -> System.out.println("Early:" + v));
s.onNext(0);
s.onNext(1);
s.subscribe(v -> System.out.println("Late: " + v));	
s.onNext(2);
```

Output:
```java
Early:0
Early:1
Late: 0
Late: 1
Early:2
Late: 2
```

Tất cả các giá trị đều được nhận bởi các subscriber, kể cả subscribe muộn. Cũng lưu ý rằng subscriber muộn được phát lại tất cả mọi thứ trước khi tiến hành value tiếp theo.

Cache mọi thứ nhiều khi cũng không tốt, vì một chuỗi observable có thể chạy trong thời gian dài. Có cách để giới hạn kích thước của internal buffer. `ReplaySubject.createWithSize` giới hạn kích thước của buffer, trong khi `ReplaySubject.createWithTime` giới hạn thời gian mà một tượng có thể được cache.

```java
ReplaySubject<Integer> s = ReplaySubject.createWithSize(2);	
s.onNext(0);
s.onNext(1);
s.onNext(2);
s.subscribe(v -> System.out.println("Late: " + v));	
s.onNext(3);
```

Output:

```java
Late: 1
Late: 2
Late: 3
```

Subscriber muộn bây giờ sẽ bị lỡ value đầu tiên vì không còn ở trong cache (giới hạn cache là 2). Tương tự, giá  trị cũ bị bỏ ra khỏi bộ nhớ đệm khi qua một thời gian được chỉ định, khi một subject được tạo bằng `createWithTime`.

```java
ReplaySubject<Integer> s = 
        ReplaySubject
            .createWithTime(150, TimeUnit.MILLISECONDS, Schedulers.immediate());
s.onNext(0);
Thread.sleep(100);
s.onNext(1);
Thread.sleep(100);
s.onNext(2);
s.subscribe(v -> System.out.println("Late: " + v));	
s.onNext(3);
```

Output:

```java
Late: 1
Late: 2
Late: 3
```

Tạo một `ReplaySubject` với time sẽ yêu cầu một `Scheduler` (cách mà Rx giữ time). Hiện tại chúng ta có thể bỏ qua chúng, mình sẽ đề cập tới các scheduler ở phần sau.

`ReplaySubject.createWithTimeAndSize` giới hạn cả 2 (1 trong 2 đạt điều kiện).

### 2.4.3. BehaviorSubject:

![](https://images.viblo.asia/726a67c8-6b43-4320-8a76-8266fb76e08c.png)

`BehaviorSubject` chỉ ghi nhớ value cuối cùng. Tương tự với `ReplaySubject` kết hợp với kích thước buffer là 1. Value khởi tạo có thể được cung cấp khi tạo ra, vì thế hãy đảm bảo rằng đó là một giá trị sẽ có sẵn ngay lập tức khi subscribe.

```java
BehaviorSubject<Integer> s = BehaviorSubject.create();
s.onNext(0);
s.onNext(1);
s.onNext(2);
s.subscribe(v -> System.out.println("Late: " + v));	
s.onNext(3);
```

Output:

```java
Late: 2
Late: 3
```

đây là VD khi là event cuối cùng:

```java
BehaviorSubject<Integer> s = BehaviorSubject.create();
s.onNext(0);
s.onNext(1);
s.onNext(2);
s.onCompleted();
s.subscribe(
	v -> System.out.println("Late: " + v),
	e -> System.out.println("Error"),
	() -> System.out.println("Completed")
);
```

Value khởi tạo được cung cấp để có sẵn nếu mọi người subscribe trước khi value đầu tiên được gửi đến.

```java
BehaviorSubject<Integer> s = BehaviorSubject.create(0);
	s.subscribe(v -> System.out.println(v));
	s.onNext(1);
```
Output:

```java
0
1
```

Vì vai trò của một `BehaviorSubject` là luôn luôn có một value có sẵn, nó thường ko được tạo mà không có value khởi tạo. Nó thường không chấm dứt một `BehaviorSubject`.

 
### 2.3.4. AsyncSubject:

![](https://images.viblo.asia/d1c24c1c-688d-4fec-a2ac-117924389354.png)

`AsyncSubject` cũng cache value cuối cùng. Sự khác nhau là nó không phát bất kỳ value nào đến khi chuỗi hoàn tất. Nó dùng để phát một value đơn và complete ngay lập tức.
```java
AsyncSubject<Integer> s = AsyncSubject.create();
s.subscribe(v -> System.out.println(v));
s.onNext(0);
s.onNext(1);
s.onNext(2);
s.onCompleted();
```

Output:

```java
2
```

Lưu ý rằng, nếu chúng ta không thực hiện `s.onCompleted();` Ví dụ này sẽ không in ra gì cả.
 
## 2.5. Các nguyên tắc ngầm định:

Có các nguyên tắc trong Rx không hiển nhiên ở trong code. Ví dụ cần biết là một điều quan trọng rằng không có các event được phát ra sau termination event (`onError` hoặc `onComplete`). Các subject được triển khai tôn trọng điều đó và phương thức `subscribe` cũng ngăn chặn một số vi phạm nguyên tắc:
```java
Subject<Integer, Integer> s = ReplaySubject.create();
s.subscribe(v -> System.out.println(v));
s.onNext(0);
s.onCompleted();
s.onNext(1);
s.onNext(2);
```

Output:

```java
0
```

Những mạng lưới an toàn giống như vậy đều không được đảm bảo trong toàn bộ triển khai của Rx. Quan trọng nhất là bạn ghi nhớ để không vi phạm nguyên tắc này, nếu không có thể dẫn đến những hành vi khó xác định.

# 3. Quản lý vòng đời:

Ý tưởng đằng sau Rx là không biết khi nào một chuỗi phát ra các value hoặc kết thúc, nhưng bạn vẫn có thể kiểm soát khi nào bạn có thể bắt đầu và dừng nhận các values. Các subscription có thể được liên kết với các tài nguyên được phân bổ mà bạn muốn giải phóng khi kết thúc thúc chuỗi. Rx cung cấp kiểm soát các subscription của bạn để cho phép bạn làm điều đó.

## 3.1. Subscribing:
Có một số overload với `Observable.subscribe` mà cùng viết tắt cho cùng một điều.

```java
Subscription subscribe()
Subscription subscribe(Action1<? super T> onNext)
Subscription subscribe(Action1<? super T> onNext, Action1<java.lang.Throwable> onError)
Subscription subscribe(Action1<? super T> onNext, Action1<java.lang.Throwable> onError, Action0 onComplete)
Subscription subscribe(Observer<? super T> observer)
Subscription subscribe(Subscriber<? super T> subscriber)
```

`subscribe()`  consume các event nhưng không thực hiện các hành động. Các overload mà nhận một hoặc nhiều hơn `Action` sẽ xây dựng một `Subscriber` với các chức năng mà bạn cung cấp. Nếu bạn không thêm một action, event sẽ bị bỏ qua.
VD sau sẽ xử lý error khi chuỗi thất bại:

```java
Subject<Integer, Integer> s = ReplaySubject.create();
s.subscribe(
	v -> System.out.println(v),
	e -> System.err.println(e));
s.onNext(0);
s.onError(new Exception("Oops"));
```

Output:

```java
0
java.lang.Exception: Oops
```

## 3.2. Unsubscribing:
Bạn cũng có thể ngừng nhận các value trước khi chuỗi kết thúc. Mọi `subscribe` overload trả về một instance của `Subscription` (là một interface có 2 phương thức):

```java
boolean isUnsubscribed()
void unsubscribe()
Gọi `unsubscribe` sẽ dừng các event khỏi việc bị gửi đến các observer của bạn
Subject<Integer, Integer>  values = ReplaySubject.create();
Subscription subscription = values.subscribe(
    v -> System.out.println(v),
    e -> System.err.println(e),
    () -> System.out.println("Done")
);
values.onNext(0);
values.onNext(1);
subscription.unsubscribe();
values.onNext(2);
```
Output:
```java
0
1
```

Unsubscribing một observer sẽ không gây trở ngại tới các observer khác trong cùng một observable

```java
Subject<Integer, Integer>  values = ReplaySubject.create();
Subscription subscription1 = values.subscribe(
    v -> System.out.println("First: " + v)
);
Subscription subscription2 = values.subscribe(
	v -> System.out.println("Second: " + v)
);
values.onNext(0);
values.onNext(1);
subscription1.unsubscribe();
System.out.println("Unsubscribed first");
values.onNext(2);
```

Output:

```java
First: 0
Second: 0
First: 1
Second: 1
Unsubscribed first
Second: 2
```

## 3.3. onError và onCompleted:
`onError` và `onCompleted` nghĩa là sự kết thúc của chuỗi. Một observable mà tuân thủ Rx contract sẽ không phát ra bất kỳ thứ gì sau khi một trong 2 event trên xảy ra. Điều này nên ghi nhớ khi sử dụng Rx và khi triển khai các observable theo cách của bạn.
```java
Subject<Integer, Integer>  values = ReplaySubject.create();
Subscription subscription1 = values.subscribe(
    v -> System.out.println("First: " + v),
    e -> System.out.println("First: " + e),
    () -> System.out.println("Completed")
);
values.onNext(0);
values.onNext(1);
values.onCompleted();
values.onNext(2);
```

Output:
```java
First: 0
First: 1
Completed
```

## 3.4. Giải phóng các tài nguyên:
Một `Subscription` được gắn với các tài nguyên mà nó dùng. Vì lí do này, bạn nên ghi nhớ rằng hãy luôn hủy subscription. Bạn có thể tạo binding giữa một `Subscription` và các tài nguyên cần thiết bằng cách sử dụng Subscriptions factory.

```java
Subscription s = Subscriptions.create(() -> System.out.println("Clean"));
s.unsubscribe();
```
Output:
```java
Clean
```

`Subscriptions.create` nhận một action mà sẽ được thực thi trên unsubscription để giải phóng các tài nguyên. Chúng cũng là các ngắn gọn cho các action hay gặp khi tạo ra một chuỗi.

`Subscriptions.empty()` trả về một `Subscription` mà không làm gì cả khi được bỏ đăng ký. Hữu dụng khi bạn được yêu cầu trả về một instance của `Subscription`, nhưng triển khai của bạn không thực sự cẩn giải phóng bất kỳ các tài nguyên nào
`Subscriptions.from(Subscription... subscriptions)` trả về một `Subscription` khi nó được bỏ đăng ký.

`Subscriptions.unsubscribed()` trả về một `Subscription` mà đã được bỏ đăng ký.
Có một vài triển khai của `Subscription`:

* BooleanSubscription
* CompositeSubscription
* MultipleAssignmentSubscription
* RefCountSubscription
* SafeSubscriber
* Scheduler.Worker
* SerializedSubscriber
* SerialSubscription
* Subscriber
* TestSubscriber

Phần tiếp theo mình sẽ nói rõ hơn về chúng. Cũng lưu ý rằng `Subscriber` cũng triển khai `Subscription`. Điều này có nghĩa là chúng ta cũng có thể sử dụng một tham chiếu tới `Subscriber` để chấm dứt một subscription.


-----


*Mình hi vọng bạn thích bài viết này. Mình sẽ cố gắng viết phần tiếp theo sớm nhất có thể :D*

*Nguồn: https://nguyenanhtoan.com/cung-tim-hieu-ve-rxjava-phan-1/*