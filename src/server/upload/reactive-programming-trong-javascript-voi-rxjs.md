RxJS là một thư viện JavaScript sử dụng mô hình **Reactive Programming** để chuyển đổi và truy vấn các luồng dữ liệu bất đồng bộ. RxJS cũng có thể được sử dụng cả trong trình duyệt hoặc phía máy chủ bằng Node.js.

## Reactive Programming là gì?
![](https://images.viblo.asia/1748d149-7816-4c29-825f-cab9218280ac.jpg)

Reactive programming là một mô hình lập trình tập trung chủ yếu vào vấn đề xử lý các luồng dữ liệu bất đồng bộ (asynchronous data streams). Chúng ta có thể coi mọi thứ là stream, từ single value, array, object, cho đến event, ... 

> Think of RxJS as “LoDash” for handling asynchronous events

Nếu như các bạn đã biết thì LoDash là một thư viện giúp chúng ta xử lý Array, Object, Function, Collection, ... dễ dàng và nhanh chóng hơn. Và các bạn hãy nghĩ RxJS cũng tương tự như LoDash nhưng chỉ khác là nó xử lý các sự kiện bất đồng bộ.

## Stream

![](https://images.viblo.asia/cffe92b2-fe12-4fa8-9af7-76fc25ce2f8e.jpg)

Một stream là một chuỗi các sự kiện tuần tự được sắp xếp theo thời gian. Nó có thể là bất cứ thứ gì, ví dụ như user inputs, sự kiện click hay dữ liệu có cấu trúc. Bạn có thể lăng nghe cũng phản ứng lại nó. Bạn có thể sử dụng các functions để combine, filter hoặc map các streams.

Một stream phát ra 3 tín hiệu trong chính timeline của nó: value, error và complete. Chúng ta có thể bắt được các tín hiệu này và thực thi các chức năng tương ứng.

Cả promise và observable đều được xây dựng để giải quyết các vấn đề liên quan đến bất đồng bộ (nhằm tránh việc "callback hell")

## Observable

![](https://images.viblo.asia/088e70ea-75ea-4714-aab9-dabd2562597a.jpg)

* Observable chỉ là một function, cùng với 1 vài tính năng đặc trưng. Nó nhận vào một Observer (một đối tượng có các phương thức next, error và complete), và nó trả về một hàm xử lý để cancel chính Observable này.
* Các Observable cung cấp hỗ trợ cho việc chuyển data giữa publisher và subscriber trong ứng dụng của bạn.
* Các Observable mang lại lợi ích đáng kể so với các kỹ thuật khác để xử lý sự kiện, lập trình không đồng bộ và xử lý nhiều giá trị.
* Observable chỉ trả về data khi chúng ta subscribe
* RxJS cung cấp một số function có thể được sử dụng để tạo các Observable mới. Các function này có thể đơn giản hóa quá trình tạo các Observable từ những thứ như event, interval, ...

```javascript
const button = document.querySelector('button');
const observer = {
  next: value => {
    console.log(value);
  },
  error: err => {
    console.error(err);
  },
  complete: () => {
    console.log('Completed');
  }
};

// Create an Observable from event
const buttonClick$ = fromEvent(button, 'click');
// Subscribe to begin listening for async result
buttonClick$.subscribe(observer);
```

## Subscription

![](https://images.viblo.asia/9636e18d-6ec2-47e1-837d-db4ac02c63d1.jpg)

* Một đối tượng Observable bắt đầu trả về data khi chúng ta thực hiện subscibe tới nó bằng cách gọi tới phương tức `subscribe()` và truyền vào đối tượng `observer` để nhận các notifications.
* Một Subscription có một phương thức quan trọng, đó là `unsubscribe()`, nó không nhận vào bất cứ tham số nào.

```javascript
const button = document.querySelector('button');
const buttonClick$ = fromEvent(button, 'click');
const subscription = buttonClick$.subscribe(event => console.log(event));

// Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
subscription.unsubscribe();
```

## Observer

![](https://images.viblo.asia/c00dad3c-d677-4739-a1b4-e901a5c6d8a9.png)

* Observer là một đối tượng với các hàm `next()`, `error()` và `complete()`. Trong ví dụ trên, observer chính là đối tượng mà chúng ta truyền vào phương thức `.subscribe()`.
* Khi một Observable sản xuất ra data, nó sẽ thông báo tới observer bằng cách gọi tới phương thức `.next()` khi bắt được một giá trị mới và `.error()` khi bắt được một lỗi xảy ra.
* Khi chúng ta subscribe tới một Observable, nó sẽ tiếp tục truyền các giá trị vào một observer cho khi tín hiệu kết thúc.

```javascript
// observer is just object literal with next(), error() and complete() functions
// Howerver, next() function is required, remaining error() and complete() functions are optional 
const observer = {
	next: function(value) {
		console.log(value);
	},
	error: function(err) {
		console.error(err);
	},
	complete: function() {
		console.log("Completed");
	}
};
```

## Operators

![](https://images.viblo.asia/39fbbbc0-2c7b-4af3-afc8-b68013eb682d.png)

* Operator bản chất là một pure function, nó sẽ lấy một Observable làm giá trị đầu vào và trả về một Observable khác ở đầu ra.
* Có rất nhiều operator cho nhiều mục đích khác nhau như `creation`, `transformation`, `filtering`, `combination`, `multicasting`, `error handling`, `utility`, ...

```javascript
const observable = Rx.Observable.of(1, 2, 3).map(value => value * value);

observable.subscribe(x => console.log(x));
// Output:
// 1
// 4
// 9
```

Bên cạnh đó, RxJS cung cấp cho chúng ta rất nhiều operator khác, nhưng sẽ có khá ít operator mà chúng ta sẽ thường xuyên dùng:
* **Creation:** from, fromPromise, fromEvent, of
* **Combination:** combineLatest, concat, merge, startWith, withLatestFrom, zip
* **Filtering:** debounceTime, distinctUntilChanged, filter, take, takeUntil
* **Transformation:** bufferTime, concatMap, map, mergeMap, scan, switchMap
* **Utility:** tap
* **Multicasting:** share


-----
**Tài liệu tham khảo:** https://dev.to/sagar/reactive-programming-in-javascript-with-rxjs-4jom