RxJS là một trong những thư viện JavaScript khó học, nhưng cũng là một trong những thư viện bổ ích. Mình cũng không nhớ đã bao lần định tìm hiểu về nó xong cuối cùng lại không học nữa vì nó khá khó hiểu khi mới bắt đầu. Giờ mới có động lực để ngồi tìm hiểu lại. Ở bài viết này, chúng ta cùng tìm hiểu về RxJS thông qua các concept của nó nhé.

# 1. RxJS là gì?
Có nhiều cách để định nghĩa RxJS. Bạn có thể hiểu RxJS là

... một utility để xử lý các luồng dữ liệu không đồng bộ

… giống như Lodash cho các sự kiện, luồng dữ liệu

… giống như một Promise có thể resolve nhiều lần.

> Rxjs is a library for composing asynchronous and event-based programs by using observable sequences.
> 
> Think of Rxjs as Lodash (ultility for array/object) for events/streams.
> 
> ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

Các concept nền tảng nhất của RxJS gồm:

**Observable** - Một tập hợp các value, event trong tương lai

**Subscription** -   Kết quả khi thực hiện một `Observable`

**Emit** -  Khi một `Observable` tạo ra một giá trị vì có thứ gì đó đã subscribe nó

**Operator** - Các toán tử thay đổi cách `Observable` tạo ra giá trị.


<br>

**Các nguồn tài liệu để học**

Tiếng Anh

[RxMarbles](http://rxmarbles.com/) - A Visual Guide to Rx

[LearnRxJS](https://www.learnrxjs.io/) - Simplified documentation.


Tiếng Việt

https://github.com/angular-vietnam/100-days-of-angular

https://www.tiepphan.com/rxjs-reactive-programming/
# 2. Khởi tạo Observable
Có nhiều cách để tạo Observable, phương thức cơ bản nhất là `create()`, nó cho phép bạn emit các giá trị đến subscribe bằng cách gọi `next()` trong function.

```js
const observable = Rx.Observable.create( observer => {
    observer.next( 'hello' )
    observer.next( 'world' )
})

observable.subscribe(val => console.log(val))
// hello
// world
```

 Code trên cũng khá gọn gàng, tuy nhiên RxJS còn có một số helper đắc lực cho phép chúng ta tạo các  observable tự động.


### Observable từ DOM Events
Tạo một observable từ sự kiện click

```js
const clicks = Rx.Observable.fromEvent(document, 'click')

clicks.subscribe(click => console.log(click))
// click around the web page...
// MouseEvent<data>
// MouseEvent<data>
```
### Observable từ Promise

Bạn có thể dễ dàng convert một promise sang một observable với `fromPromise()`

```js
const promise = new Promise((resolve, reject) => { 
    setTimeout(() => {
        resolve('resolved!')
    }, 1000)
});



const obsvPromise = Rx.Observable.fromPromise(promise)

obsvPromise.subscribe(result => console.log(result) ) 

// wail 1 second...
// resolved!
```
 Và bạn cũng có thể chuyển đổi ngược lại, từ observable thành promise bằng cách sử dụng `toPromise()`.

### Observable Timer
Bạn có thể set timers. Nó sẽ hoàn thành khi hết thời gian timeout

```
const timer = Rx.Observable.timer(1000)

timer.subscribe(done => console.log('ding!!!'))
```
### Observable Time Interval
Bạn cũng có thể nói với observable làm một hành động gì đó  sau mỗi khoảng thời gian

```js
const interval = Rx.Observable.interval(1000)

interval.subscribe(i => console.log( i ))
// 0
// 1
// every second for eternity...
```

### Observable của giá trị tĩnh
Cuối cùng, chúng ta có thể tạo observable từ các giá trị tĩnh. Nó sẽ  hoàn thành ngay lập tức khi value truyền vào được emit.

```js
const mashup = Rx.Observable.of('anything', ['you', 'want'], 23, true, {cool: 'stuff'})

mashup.subscribe(val => console.log( val ))
// anything
// you,want
// 23
// true
// [object Object]
```
# 3. Unsubscribe
Nếu bạn có một stream hoạt động liên tục,  chắc chắn bạn sẽ có lúc cần huỷ thực thi nó, vì việc hoạt động liên tục có thể dẫn đến tràn bộ nhớ. 

Một số observable sẽ hoàn thành tự động, vì vậy sẽ không cần phải unsubscribe những observable kiểu vậy (không ảnh hưởng gì nếu bạn vẫn unsubscribe nó).  Ở ví dụ dưới đây, bạn có thể nhận thấy được một observer hoàn thành hay chưa bằng cách gọi finally():


```js
const timer = Rx.Observable.timer(1000);

timer
  .finally(() => console.log('All done!'))
  .subscribe()
// wait 1 second...
// All done!
```

Tuy nhiên, một số observable khác thì có thể sẽ chạy mãi mãi, ví dụ như interval

```js
const interval = Rx.Observable.interval(1000);
interval
  .finally(()  => console.log('All done!'))
  .subscribe(x => console.log(x))
// 0
// 1
// and so on...
```
 Bạn có thể huỷ thực thi chúng đi bằng cách gán  phần subscribe trong một biến riêng, sau đó gọi hàm unsubscribe() ở chính biến đó. 
```js
const subscription = interval.subscribe()

subscription.unsubscribe()
// 'All Done'
```

Bài viết xin dừng lại tại đây. Hi vọng đã giúp các bạn hiểu qua về khái niệm RxJS, cách khởi tạo và huỷ đăng ký Observable.

Cảm ơn các bạn đã theo dõi bài viết. Hẹn gẹp các bạn ở phần sau.


Tham khảo: https://fireship.io/lessons/rxjs-basic-pro-tips/