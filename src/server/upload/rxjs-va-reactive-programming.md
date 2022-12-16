# 1 - Stream
Streams are a sequence of values over time. Tạm dịch: **Streams** như một ống nước đc bịt một đầu, **sequence of values over time** là 1 giá trị bất kì như: viên bi, cục tẩy,... sẽ đc đưa vào ô nước ở 1 thời điểm nào đấy trong tương lai, khi ống nước đấy đã đầy thì **stream** đấy đã kết thúc (completed), còn khi ô nước đấy thủng 1 lỗ ở thân cứ khi nào bạn đưa cái gì vào ống là nó lại rơi ra ngoài thì **stream** đã bị lỗi tại chỗ đấy. Từ định nghĩa này thì ta có thể coi mọi thứ là stream: single value, array, event, etc.
  
   ![](https://images.viblo.asia/b4542861-4996-4dbc-959e-988130cd3e52.png)
- **Ví dụ (các arr sau là stream):**
    + Ban đầu ta có 1 mảng có 5 phần tử đc xác định trước như này: ```arr = [1,2,3,4,5]``` và từ mảng này bạn có thể lấy ra tất cả 5 element ngay lập tức mà ko phải chờ đợi gì. Giả sử, mỗi element trong arr sẽ đến mảng theo thời gian. Cụ thể, tại thời điểm 1s thì 1 đến arr, 2s sau thì 2 đến arr và cùng lúc đó bạn truy cập arr để lấy 5 phần tử như mong muốn nhưng ko chỉ có 2 phần tử đc in ra thôi, trừ khi bạn phải đợi (đợi khi nào thì mình ko rõ và mình sẽ đề cập cách giải quyết ở phía dưới) phần tử cuối cùng đến mảng thì lúc đấy thì bạn mới lấy ra đc tất cả 5 phần tử.
   
       ![](https://images.viblo.asia/191bab0f-2ef7-474c-b38f-7b7593927d7a.png)
    + Một **stream** khác có thể là 1 chuỗi các toạ độ (x, y) của các sự kiện click chuột đc lưu trong arr hoặc một **stream** represent (biểu diễn or đại diện) người dùng thao tác trên một trường form như vs trường input text thì ta có **stream** sau:
        ```javascript
        arr = [
            {name: 'n'},
            {name: 'na'},
            {name: 'nam'}
        ];
        ```
# 2 - Reactive Programming (RP)
- **RP** là coi các biến ở các hàm thông thường là **stream** và hàm tương tác vs **stream** đc yêu cầu đc gọi là: **operation** và hàm này tự động đc gọi khi **stream** đó push vào giá trị mới. Xem qua hình sau, ban đầu là hàm thống thường vs các biến A, B, C sau đó đc chuyển thành các streams A, B, C tương ứng.

     ![](https://images.viblo.asia/c912699f-346f-4340-8e1c-25d554099c7e.gif)
- Trong **data stream** khi ta thực hiện 1 task bất kì nào đó thì ta thường quan tâm đến 3 yếu tố:
    + Giá trị (data) trả về từ task đó.
    + Thông báo lỗi (Nếu có error).
    + Thời điểm task hoàn thành (Completed).
- Đối vs lập trình synchronous thì xác định 3 yếu tố trên là dễ dàng nhưng đs vs lập trình asynchronous thì xác định 3 yếu tố trên thì ko dễ dàng chút nào, cụ thể là làm sao ta biết được thời điểm task hoàn thành để ta thực hiện 1 hành động gì đấy. **Reactive Programming** giải quyết vấn đề này bằng việc sử dụng **stream** để truyền data. Nó (stream) có thể emit 3 thứ sau: 1 value, 1 error, 1 completed (Tín hiệu kết thúc 1 task) theo 1 trình tự thời gian từ nơi phát ra (Producer) tới nơi lắng nghe (Subscriber). Từ đó định nghĩa về **RP** đúng nhất là: **Reactive programming is programming with asynchronous data streams**. Cụ thể thì RP là phương pháp lập trình xoay quanh **data streams** và nó deal (xử lý) với các vấn đề **asynchronous**, nó cũng có thể deal vs **synchronous** nữa
- Hoạt động của 1 **stream** trong **RP** đc mô tả dưới hình sau:

    ![](https://images.viblo.asia/f7ebd4af-d6a6-44e9-b66a-21f23dd7a11b.png)
    
    Bạn tưởng tượng rằng: ```stream``` là băng chuyền, ```stream``` này nhận vào các data mới và vận chuyển nó các các ```modifier or operation``` (là 1 hàm sẽ tự động react (phản ứng) để đưa ra data đã đc chỉnh sửa đến ```stream``` khi ```stream``` nó truyền gói data cần chỉnh sửa vào hoặc hàm này thực hiện 1 hành động khác vs **stream** mà ko cần trả về). 
- Trong thực tế thì **RP** được áp dụng vào rất nhiều trường hợp như setTimeout, setInterval, event,... Cụ thể, ta coi setTimeout, setInterval, event là **stream** tương ứng, các callback của nó là **modifier or operation**.
    + ```setInterval```: Nó sẽ vận chuyển data đến **modifier** nếu đc yêu cầu. Sau đó **modifier** này đc thực thi và sau 1 khoảng thời gian cho trước thì **modifier** này lại đc thực thi.
    + ```setTimeout```: Giống vs lại setInterval ngoại trừ việc **stream** sẽ kết thúc ngay sau khi **modifier** đc thực thi xong.
    + ```event```: Mỗi lần event đc ```trigger (kích hoạt)``` thì **modifier** của nó đc thực thi vs data đc truyền vào là thông tin về sự kiện đấy. Data đấy truyền đến tham số (thường đặt tên là event) đầu tiên trong callback (**modifier**).

# 3 - RxJS
- Khi ta đã hiểu qua **RP** thì **RxJS** giúp ta mô hình hoá nó để chúng ta có thể áp dụng nó vào thực tế dễ dàng hơn.
- ```Rxjs is a library for composing asynchronous and event-based programs by using observable sequences.``` 
- **ReactiveX (Reactive Extension or RX)** combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

# 4 - Producer vs Consumer, Push vs Pull
> Pull và Push là 2 giao thức khác nhau để data Producer (nguồn sản sinh ra data) giao tiếp vs data Consumer (nơi **chế biến** data mà Producer gửi xuống).
- **Pull system:** Consumer sẽ quyết định khi nào lấy data từ Producer. Producer ko quan tâm sẽ ko quan tâm khi nào data sẽ đc gửi đến cho Consumer mà nó chỉ quan tâm là  tạo data khi có yêu cầu từ consumer.
    + Các ```function``` trong js là một Pull System. Ở đó ```function``` là nơi sản sinh ra data (Producer), nơi mà chế biến (sử dụng) giá trị của Producer là Consumer khi nó thực hiện lệnh gọi hàm.
    + ```Generator function và Iterator``` cũng là Pull System vì nơi mà gọi ```iterator.next()``` là Consumer sẽ "pulling (kéo)" các giá trị từ iterator (producer) về.
- **Push system:** Producer sẽ quyết định khi nào gửi data cho Consumer. Consumer sẽ ko quan tâm khi nào sẽ nhận đc data mà chỉ có việc **react** vs data nhận đc từ producer.
    + ```Promise``` cũng là Push System. Một Promise là Producer, hàm callback đăng kí vs Promise để lấy data khi Promise đã đc resolved là Consumer.
    + ```DOM events``` cũng là Push System. Events là Producer sinh ra các thông tin về sự kiện đó và các thông tin đó đc "push (đẩy)" vào hàm callback (Consumer) đăng kí vs event này.
    + ```Observables``` là một Push System mới trong JS. Trong đó, Observables là Producer (Vì nó là nới sinh ra các giá trị và quyết định khi nào truyền đến observer và các giá trị đó thường đc từ Producer khác) và các giá trị đó sẽ đc "push" đến Observer (Consumer) khi nó đăng kí vs Observables.

# 5 - Observable
- ```Observable```:
    + ```Syntax```: Cơ bản nó chỉ là một function. Function này nhận đầu vào là một Function, mà Function này nhận đầu vào là một Observer và trả về một Function (unsubscribe) để có thể thực hiện việc cancel quá trình xử lý.
    + ```Lý thuyết```: Observable là một streams of events or data. Tạm dịch: Observable nó là 1 dòng chứa các events or data đến theo thời gian. Rõ hơn thì có thể hiểu như sau: Observable nó như là băng chuyền chuyên vận chuyển (nhận) data or event object đến trong tương lai cho các Observer (Consumer) đăng kí nó qua modifier ```observer.next(data or event object)```. Do đó, Observable trong  là 1 Producer (Cách giải thích này thoả mãn định nghĩa Push System ở trên).
    + Khi subscription observable có nghĩa là ta đang gọi observable vs 1 giá trị truyền vào là observer. Một số bài viết coi ```Observable là lazy computation```, giống như function, nếu ta tạo nó ra mà ko gọi nó thì không có gì thực thi cả.
    + Sự khác biệt giữa **Observable** và **function** là thằng **observable** có thể trả về nhiều giá trị theo thời gian cho consumer qua observer.next, còn function thì ko.
    + Observer có thể truyền đi giá trị theo synchronous hoặc asynchronous. Cũng có thể nói: Observerble vừa là synchronous và asynchronous.
- ```Observer``` là 1 object định nghĩa các hàm callbacks (next, error, hay complete) để xử lý 3 loại thông báo mà observable có thể gửi. Các callback này là: modifier và các modifier này sẽ chạy (react) khi:
    + next: Nhận đc data truyền vào.
    + error: Stream bị lỗi và nó Obtional.
    + complete: Stream hoàn thành (kết thúc) và nó Obtional.
- Demo:
    ```javascript
    const observable = Rx.Observable.create(function (observer) {
        observer.next(1);
        setTimeout(() => observer.next(2), 2000); 
        observer.next(3);
    });
    // Observable truyền đi các giá trị theo asynchronous (1)
    observable.subscribe(val => console.log(val)); // Result: 1, 3, 2
    
    // Observable là asynchronous (2)
    console.log("Before");
    observable.subscribe(val => console.log(val));
    console.log("Abter"); // Result: Before, 1, 3, After, 2
    
    // Observable truyền đi các giá trị theo synchronous hoặc Observable là synchronous thì ae chỉ cần thay: setTimeout(() => observer.next(2), 2000) bằng observer.next() rồi lặp lại bước (1) và (2).
    ```
## 5.1 - Creating Observables
```Rx.Observable.create``` là một operator, nó chỉ là 1 alias (bí danh) cho ```Observable``` constructor. Có nghĩa là ta sử dụng 1 trong 2 cách trên để tạo instance observable. Ngoài oprerator ```create``` thì ta có các operator khác để tạo mới một Observable: of, from, interval,...  Minh hoạ:
```javascript
const arr = [{name: 'cuong'}, [1,2,3,4,5], function x(){return 'cuong';}];
Rx.Observable.from(arr).subscribe((elem) => console.log(elem));
```
## 5.2 - Subscribing to Observables
Sau khi tạo observable xong thì ta gọi nó bằng cách subcribe nó. Ta có thể subcribe nhiều lần trên 1 observable. Ngoài callback mà bạn truyền vào subscribe method để nhận data từ observable truyền về thì ae có thể truyền các hàm callbacks cho error, complete vì **observerble.subcribe()** nó sẽ chuẩn hoá các hàm callbacks đó thành 1 **observer** object tương ứng.    

Nếu ta ko muốn truyền error handler function vào thì thay nó bằng ```null or undefined```.
```javascript
observable.subscribe(
    val => console.log(val),
    err => console.error(err),
    () => console.log('Completed')
);

// Tương đương với
observable.subscribe({
  next: val => console.log(val),
  error: err => console.error(err),
  complete: () => console.log('Completed'),
});

// Thay thế error handler function = null
observable.subscribe({next: ..., null, complete: ...});
```
 
## 5.3 - Executing Observables
Phần code bên trong: ```Rx.Observable.create(function(observer){...})``` là 1 **Observerble execution**. Phần code đó là ```lazy computation``` vì chúng chỉ đc thực thi khi observable đc subscribe.

Có 3 kiểu giá trị mà **Observerble execution** có thể gửi đi:
    + ```Next``` notification: Gửi đi giá trị cho consumer (observer).
    + ```Error``` notification: Gửi đi một Javascript Error hoặc exception.
    + ```Complete``` notification: Ko gửi đi 1 giá trị nào cả mà nó gửi đi 1 tín hiệu để nói rằng stream này  đã kết thúc (completed).

Nếu ```Error``` hoặc ```Complete``` notification đc gửi đi thì ko có dữ liệu nào đc gửi đi nữa, tức là stream đã close. 
## 5.4 - Subscription và Disposing Observable Executions
Khi ae **subscribe** observable thì ae nhận đc 1 object kiểu **Subscription** mình gọi object đó là: **subscription**. Object này đại diện cho resource (nguồn tài nguyên) có thể huỷ và resource này thường là quá trình thực thi (**observable executions**) đang diễn ra trên observable. Object này có 1 **unsubscribe** method để huỷ các **resources** đang đc nắm giữ bởi **subscription** hoặc huỷ **Observable executions**.

**subscription** cha có thể chứa nhiều **subscription** con mà phụ thuộc vào nó. Việc chứa nhiều đấy sẽ đc thực hiện qua việc gọi **add** method trên **subscription** cha. Khi cha thực hiện **unsubscribe** thì các **subscriptions** con cũng sẽ **unsubscribe** theo.
```javascript
const foo = Rx.Observable.interval(500);
const bar = Rx.Observable.interval(700);

const subscription = foo.subscribe(x => console.log('first: ' + x));
const childSub = bar.subscribe(x => console.log('second: ' + x));

subscription.add(childSub);

setTimeout(() => {
  // Unsubscribes BOTH subscription and childSub
  subscription.unsubscribe();
}, 2000);
```
Khi consumer (observer) **subcribe** trên Observable thì observer đó sẽ đc gắn vs một **Observable execution** mới đc tạo. Để tránh việc **Observable Excutions** hoạt động khi ta ko cần thì ta cần gọi **unsubscribe** method để ta huỷ việc thực thi của **Observer Executions**.
# 6 - Cold Observables vs Hot Observables
- Observable là ```cold``` nếu **data producer** đc tạo và được quản lý bên trong nó. Tức là mỗi lần observer **subscribe** đến observable thì data mà đc truyền xuống observer sẽ đc tạo mới lại từ đầu (Producer đc tạo  mới). 
    ```javascript
    const observable = Rx.Observable.create(observer => {
      let x = 5; // x là 1 producer
      observer.next(x);
      x += 10;
      setTimeout(() => {
        observer.next(x);
        observer.complete();
      }, 1000);
    });

    const observer = {
      next: value => console.log(value),
      complete: () => console.log('done')
    };

    observable.subscribe(observer);

    setTimeout(() => {
      observable.subscribe(observer);
    }, 1000);
    // Output của các lần subscribe đều giống nhau là: 5, 10, 'done'
    ```
 - Observable là ```Hot``` nếu **data producer** đc tạo ở bên ngoài observable. Tức là nhiều thằng obsever nó dùng chung **data producer** mà ko phải tạo mới lại producer cho mỗi lần subscribe.
     ```javascript
     let x = 5;
    const observable = Rx.Observable.create(observer => {
      observer.next(x);
      x += 10;
      setTimeout(() => {
        observer.next(x);
        observer.complete();
      }, 1000);
    });

    const observer = {
      next: value => console.log(value),
      complete: () => console.log('done')
    };

    observable.subscribe(observer);

    setTimeout(() => {
      observable.subscribe(observer);
    }, 1000);
    // Subscribe 1: 5, 15, 'done'
    // Subscribe 2: 15, 25, 'done'
     ```
# 7 - Subject
Observable (Cold observable) là unicast, tức là mỗi khi observer **subscribe** observable thì nó thuộc về quá trình thực thi (Observable executions) độc lập của observable hoặc hiểu nôm na là mỗi lần **subscribe** thì producer đc tạo mới chứ ko phải là producer dùng chung giữa các observer. Mà bây giờ mình muốn, các observer đều dùng chung **observable execution**, tức là các observer đều nhận cùng đều nhận giá trị giống nhau khi giá trị đó đc truyền đi từ **observable execution**. Để giải quyết vấn đề này thì ta sử dụng: **subject**.
- **Subject** nó là một **observable** nên ta có thể subscribe nó vs các observer. Các observer này thì ko biết đc **Observable executions (ob_ex)** đến từ unicast Observable hay từ Subject mà nó chỉ biết là nó đc gắn vs 1 **ob_ex**. Mỗi lần subscribe đến subject thì subject nó ko tạo quá trình thực thi mới (**ob_ex**) mà nó chỉ đăng kí (or đẩy) overver vào danh sách các observer mà nó đang quản lý. **Subject** là **multicast**, tức là: subject nó tạo **ob_ex** và **ob_ex** này đc chia sẻ để dùng chung giữa các observer vs nhau. Minh hoạ:
    ```javascript
    var subject = new Rx.Subject();

    subject.subscribe({
      next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
      next: (v) => console.log('observerB: ' + v)
    });

    subject.next(1);
    subject.next(2);
    
    /* Output 
    observerA: 1
    observerB: 1
    observerA: 2
    observerB: 2 */
    ```
- **Subject** nó cũng là 1 **observer** để đăng kí nó vs 1 observable. Cụ thể, nó là 1 object có các method: next(v), error(e), and complete().  Để đưa 1 giá trị mới đến **subject** thì là chỉ cần gọi: **.next(value)**, sau đó, giá trị đấy sẽ đc **multicasted** (truyền đi or phân phối) đến các observer đã đăng kí vs nó. Ở minh hoạ sau thì Observable sử dụng subject để chuyển đổi **ob_ex** của nó thành **multicast**:
    ```javascript
    var subject = new Rx.Subject();

    subject.subscribe({
      next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
      next: (v) => console.log('observerB: ' + v)
    });

    var observable = Rx.Observable.from([1, 2]);

    observable.subscribe(subject);
    // Output giống vs minh hoạ trên
    ```
## 7.1 - Multicasted Observables
Observable mà sử dụng subject để chia sẻ **ob_ex** của nó vs các observer mà subscribe thì đc gọi là **Multicasted Observables (mul_obs)**. RxJs cung cấp 1 số method để tạo **mul_obs** như: publish(), publishReplay(), share(), shareReplay(), multicast(). Các method này còn đc gọi là operator. Ví dụ vs ```multicast()``` operator:
```javascript
var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

multicasted.connect();
```
```multicast``` trả về 1 observable kiểu [ConnectableObservable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-multicast) và nó làm việc như một subject khi subsribe observer. Observable này có một **connect()** method và method này sẽ quyết định khi nào thì **ob_ex** đc chia sẻ cho các observer vì khi gọi **connect()** thì ```source.subscribe(subject)``` mới đc thực hiện. **connect()** này trả về **Subscription** để huỷ **ob_ex** đã đc chia sẻ.
### 7.1.1 - Reference counting
Ở ví dụ trên thì mình muốn **connect()** method này tự động đc gọi khi observer đầu tiên đến (đã đc subscribe vs **mul_obs**) và tự động huỷ **ob_ex** đã đc chia sẻ khi thằng observer cuối cùng **unsubscribe** thì ta sử dụng **refCount()** method của class ```ConnectableObservable```. Method này trả về 1 observable đang theo dõi số lượng **subscriber (observer)** mà nó đang có. Khi số lượng subscriber tăng từ 0 đến 1 thì connect() sẽ đc gọi, tức là bắt đầu chia sẻ **ob_ex** cho các observer. Ngc lại khi giảm từ 1 về 0 thì huỷ **ob_ex** đã đc chia sẻ. Minh hoạ:
```javascript
var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var refCounted = source.multicast(subject).refCount();
var subscription1, subscription2, subscriptionConnect;

// This calls `connect()`, because
// it is the first subscriber to `refCounted`
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

// This is when the shared Observable execution will stop, because
// `refCounted` would have no more subscribers after this
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);
```
Kết quả của ví dụ trên:
```
observerA subscribed
observerA: 0
observerB subscribed
observerA: 1
observerB: 1
observerA unsubscribed
observerB: 2
observerB unsubscribed
```
## 7.2 - BehaviorSubject
Vấn đề của **subject** là nếu ta emit (truyền đi) giá trị trước khi subscribe vs các observer thì các observer này sẽ ko nhận đc giá trị đã đc emit trước đó. Để giải quyết vấn đề này thì ta sử dụng 1 biến thể mới của subject là: **BehaviorSubject**. Kiểu subject này cần 1 giá trị khởi tạo và nó lưu trữ giá trị cuối cùng mà đc emit ra rồi sau đó nó emit giá trị đó cho những observer mới subscribe.
```javascript
var subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);
/*
    Output:
    observerA: 0
    observerA: 1
    observerA: 2
    observerB: 2
    observerA: 3
    observerB: 3
*/
```
Khi BehaviorSubject complete thì các observer subscribe sau đó chỉ nhận đc tín hiệu ```complete```.
## 7.3 - ReplaySubject
**ReplaySubject** thì tương tự như **BehaviorSubject** ngoại trừ việc nó lưu trữ nhiều giá trị hơn (có thể là toàn bộ giá trị của stream từ thời điểm ban đầu nếu ta ko chỉ định buffer).
Các tham số tuỳ chọn của **ReplaySubject**:
1. buffer: là số lượng phần tử tối đa có thể lưu trữ.
    ```javascript
    var subject = new Rx.ReplaySubject(2); // buffer 2

    subject.subscribe({
      next: (v) => console.log('observerA: ' + v)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);

    subject.subscribe({
      next: (v) => console.log('observerB: ' + v)
    });

    subject.next(4);
    /*
        Output:
        observerA: 1
        observerA: 2
        observerA: 3
        observerB: 2
        observerB: 3
        observerA: 4
        observerB: 4
    */
    ```
3. windowTime (ms): Ví dụ, mình thiết lập windowTime = 500 (ms) và trước khi mình subscribe một observer mới thì mình đã truyền các giá trị đc emit đến instance ( gọi là subject) của new Rx.ReplaySubject(). Sau 1 khoảng thời gian nào đó thì mình subscribe 1 observer mới đó, thì tại thời điểm subscribe đó trở về 500 (ms) có các giá trị nào đc emit ra thì các giá trị đó sẽ đc emit cho observer vừa subscribe. Minh hoạ:
    ```javascript
    var subject = new Rx.ReplaySubject(100, 500 /* windowTime */);

    subject.subscribe({
      next: (v) => console.log('observerA: ' + v)
    });

    var i = 1;
    setInterval(() => subject.next(i++), 200);

    setTimeout(() => {
      subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
      });
    }, 1000);
    /*
        Output:
        observerA: 1
        observerA: 2
        observerA: 3
        observerA: 4
        observerA: 5
        observerB: 3
        observerB: 4
        observerB: 5
        observerA: 6
        observerB: 6
        ...
    */
    ```
  Khi ReplaySubject complete thì các observers subscribe sau đó vẫn nhận đc các giá trị đc lưu trong buffer và tín hiệu ```complete```. 
 ## 7.4 - AsyncSubject
 Đây cũng là 1 biến thể của subject và biến thể này chỉ emit giá trị cuối cùng của **ob_ex** cho các observers và chỉ khi execution complete. Nếu stream (instance (gọi là subject) của AsyncSubject) mà ko complete thì ko có giá trị nào đc emit ra cả. Minh hoạ:
 ```javascript
 var subject = new Rx.AsyncSubject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);
subject.complete();
/*
    Output:
    observerA: 3
    observerB: 3
*/
 ```
 Khi AsyncSubject complete thì những thằng observers subscribe sau đó vẫn nhận đc giá trị cuối cùng đang đc lưu trữ bởi AsyncSubject và tín hiệu ```complete```.
 # 8 - Operator
 [Pure function](https://blog.bitsrc.io/understanding-javascript-mutation-and-pure-functions-7231cc2180d3) chỉ là 1 hàm có 1 hoặc nhiều tham số, hàm này phải trả về giá trị phải phụ thuộc vào các tham số đấy và hàm này ko đc thay đổi các giá trị bên ngoài scope của nó.   
 
 **Operator** là một function tạo một Observable mới dựa trên Observable truyền vào hàm đấy mà ko làm thay đổi observable truyền vào, nên ta có thể coi operator là 1 pure function. Ví sau mình tạo 1 hàm (operator) tên là multiplyByTen:
 ```javascript
 function multiplyByTen(input) {
  var output = Rx.Observable.create(function subscribe(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
  return output;
}

var input = Rx.Observable.from([1, 2, 3, 4]);
var output = multiplyByTen(input);
output.subscribe(x => console.log(x));
// Result: 10, 20, 30, 40
 ```
 Ở ví dụ trên, khi ta thực hiện subscribe trên output đã làm cho input cũng đc subscribe theo. Điều này đc gọi là: "operator subscription chain".
 ## 8.1 - Instance operators vs static operators
 **static operators** là các operators (pure functions) đc gắn trực tiếp trên Observable Class và chúng thường đc dùng để tạo mới một observable (tạo mới observable này ko sử dụng **this** keyword mà sử dụng toàn bộ các đối số đc truyền vào **static operator** và các đối số này ko phải là obsrevable mà chỉ là string, number,...)  như các operator of, from, interval, fromPromise, empty, etc. 
 
 **instance operators** là các operators (functions) đc gắn vs một instance của Observable Class và các functions này sử dụng **this** keyword  để tham chiếu đến đầu vào (Observable) để tạo mới một Observable. Ví dụ trên tương tự như sau:
 ```javascript
 Rx.Observable.prototype.multiplyByTen = function multiplyByTen() {
  var input = this;
  return Rx.Observable.create(function subscribe(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
}

var observable = Rx.Observable.from([1, 2, 3, 4]).multiplyByTen();
observable.subscribe(x => console.log(x));
 ```
 Các Operators đc chia vào nhiều nhóm khác nhau, mỗi nhóm lại có 1 mục đích sử dụng riêng:
- Creation Operators.
- Transformation Operators.
- Filtering Operators.
- Combination Operators.
- Error Handling Operators.
- Utility Operators.
- Multicasting Operators.
- Conditional and Boolean Operators.
- Mathematical and Aggregate Operators.   

Chi tiết các nhóm trên thì ae đọc thêm của anh [Tiệp](https://www.tiepphan.com/rxjs-reactive-programming/#rxjs-references) nhé!
# 9 - Góp ý
Các bác đọc qua nếu bài viết của em có sai sót hay nhầm lẫn gì thì comment để ae trao đổi và chỉnh sửa nhes:heart_eyes:.   

Các ví dụ về RxJs thì ae có thể chạy trên [jsfiddle.net](https://jsfiddle.net/) nhưng phải thêm ```<script src="https://npmcdn.com/@reactivex/rxjs@5.0.0-rc.1/dist/global/Rx.js"></script>``` vào html rồi copy code đặt vào phần JS rồi chạy sau đó mở console ở phía dưới bên phải để xem kết quả. 
# 10 - Tham khảo
- https://www.tiepphan.com/rxjs-reactive-programming/#rxjs-references
- http://reactivex.io/rxjs/manual/overview.html
- https://codecraft.tv/courses/angular/reactive-programming-with-rxjs/streams-and-reactive-programming/
- https://stackoverflow.com/questions/51520584/what-is-observable-observer-and-subscribe-in-angular
- https://viblo.asia/p/rxjs-va-reactive-programming-chi-tiet-ve-y-nghia-va-cach-hoat-dong-RnB5pMkrKPG
- https://css-tricks.com/animated-intro-rxjs/