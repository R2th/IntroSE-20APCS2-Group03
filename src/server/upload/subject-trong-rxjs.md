`Subject` là một loại `Observable` đặc biệt. Nó cho phép **multicast** value tới **nhiều Observer** cùng lúc.

> Subject cũng giống `EventEmitter` - nó duy trì một danh sách các listener của nó.

```
let s = new Subject<number>();
```

## Subject là một Observable

Ta có thể gọi `.subscribe` tới Subject, nhận value từ Subject đó.

```
s.subscribe({});
```

Đứng từ góc nhìn của Observer - ta sẽ không phân biệt được value nhận được là từ một Subject hay chỉ là một Observable đơn thuần.

### Bên trong
`.subscribe` khi gọi với Subject sẽ không invoke hàm execution để lấy value giống như Observable; thay vào đó, nó chỉ đơn thuần là đăng kí (register) thằng Observer vừa gọi `.subscribe` vào danh sách `Observers` của Subject.

> Cái đoạn này thì giống như kiểu `addListener` ấy.

## Subject cũng là một Observer

Nó là một object với đầy đủ các method `next(v)`, `error(e)`, `complete()`. Để feed một value mới cho Subject, chỉ cần gọi 

```
s.next(1);
```

Với ví dụ dưới đây: 1 value đc feed sẽ multicaxted tới tất cả các observer

```
import { Subject } from 'rxjs';
 
const subject = new Subject<number>();
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject.next(1);

 
// Logs:
// observerA: 1
// observerB: 1
```

# Các loại Subject

## BehaviorSubject

- `BehaviorSubject` có một đặc trưng là nó LUÔN LUÔN giữ (store) "current" value. Tức là ta luôn có thể trực tiếp lấy ra value cuối cùng được emit.
 
Có hai cách để lấy giá trị này ra: gọi tới `.value` của BehaviorSubject, hoặc là subscribe nó. Nếu dùng subscribe, BehariorSubject sẽ trực tiếp emit tới current value tới subscriber (kể cả sau khi subscriber subscribe SAU KHI value được store).

Ví dụ:

```
import * as Rx from "rxjs";

const subject = new Rx.BehaviorSubject();

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

subject.next(Math.random());
subject.next(Math.random());

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

subject.next(Math.random());

console.log(subject.value)

// 2.
// Subscriber A: 0.24957144215097515
// Subscriber A: 0.8751123892486292

// 3.
// Subscriber B: 0.8751123892486292

// 4.
// Subscriber A: 0.1901322109907977
// Subscriber B: 0.1901322109907977

// 5.
// 0.1901322109907977
```

1. Tạo một subject mới, subscribe nó với subscriber A
2. Hai lần ta `emit` value, A sẽ log 2 giá trị này lại.
3. subscribe object với subscriber B, B sẽ ngay lập tức log giá trị *MỚI NHẤT* của object.
4. `emit` thêm một lần nữa, lần này cả 2 A và B đều log ra value.
5. Ta có thể lấy value đơn giản bằng cách gọi thẳng tới nó, ko cần subscribe.
 
> Quên mất: sửa lại một chút, ta **BẮT BUỘC** tạo BehariorSubject với value mặc định (nếu không đặt, thì value mặc định là `undefined`)

```
const subject = new Rx.BehaviorSubject(Math.random());
```

## ReplaySubject

So sách với BehaviorSubject, ReplaySubject có thể gửi các value "cũ" tới các subscriber mới. Đó là do nó có một đặc trưng khác: có thể ghi lại một phần của các observable execution, do đó có thể lưu trữ multiple giá trị cũ, "replay" chúng cho các subscriber mới.

Khi tạo ReplaySubject, ta có thể cài đặt xem nó có thể "nhớ" được bao nhiêu value, và trong bao lâu. Ví dụ:

```
import * as Rx from "rxjs";

const subject = new Rx.ReplaySubject(2);

subject.next(Math.random())
subject.next(Math.random())
subject.next(Math.random())

subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

// Subscriber B: 0.12137498878080955
// Subscriber B: 0.531935186034298
```

Như đã thấy, do ta cài đặt để subject của ta có thể nhớ được **2** value, do đó khi subscribe vào B, B có thể in ra 2 giá trị gần nhất.

Như đã nói, ta cũng có thể cài đặt để *lưu giá trị trong bao lâu*

```
const subject = new Rx.ReplaySubject(2, 100);  // 100 miliseconds
```

## AsyncSubject

Cơ chế nó khác với 2 cái trên: chỉ có value cuối cùng của Observable execution được gửi tới subscribers, và CHỈ KHI execution hoàn tất. Ví dụ:

```
import * as Rx from "rxjs";

const subject = new Rx.AsyncSubject();

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

subject.next(Math.random())
subject.next(Math.random())
subject.next(Math.random())

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

subject.next(Math.random());
subject.complete();

// Subscriber A: 0.4447275989704571
// Subscriber B: 0.4447275989704571
```

Chú ý:

- Ta emit 3 value sau khi subscribe với A, không có gì xảy ra.
- Ta emit thêm 1 value sau khi subscribe với B, vẫn không có gì xảy ra.
- Ta gọi `subject.complete()` => **CHỈ MỘT VALUE MỚI NHẤT** được 2 subscriber log lại.

Nguồn tham khảo:

https://medium.com/@luukgruijs/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0
https://www.learnrxjs.io/learn-rxjs/subjects
https://rxjs-dev.firebaseapp.com/guide/subject