Chào các bạn. Nếu các bạn đã từng nghiện cứu hoặc tham vào một dự án về `angular` thì mình cá là các bạn đã từng làm việc hoặc ít nhất là nghe đến cái tên `rxjs`, cái tên mà nghe thôi, nhiều người cũng đã thấy ngán ngẩm vì độ khó hiểu của nó rồi. Hiện tại thì mình cũng đã có một khoảng thời gian làm việc với `rxjs`, nên hôm nay mình sẽ chia sẻ với mọi người đôi chút kiến thức mà mình có học và tự đúc kết về các `concepts` trong thư viện này nhé.

## 1. Reactive programming
Điều đầu tiên trước khi các bạn muốn sử dụng `rxjs` một cách hiệu quả đó là các bạn phải hiểu được `reactive programming` là gì trước đã. `Reactive programming` là một thuật ngữ để chỉ một phương pháp phân tích logic mới. Các bạn hãy cùng xem hình bên dưới để dẽ hiểu hơn nhé.

![](https://images.viblo.asia/49561ecf-0f2e-447f-8e3e-95786d659519.png)

Data trong `reactive programming` sẽ được chứa trong một `stream`, các bạn có thể tưởng tượng một `stream` giống như một cái băng truyền ở trong ảnh trên vậy. Khi `stream` nhận vào một gói data mới, gói data đó sẽ được `stream` vận chuyển đến các `modifier`. `Modifier` là các `function`, nghiệm vụ của các `modifier` là chúng sẽ `react`(hay `phản ứng`) với các gói data được `stream` đưa vào, thay đổi các gói data đó và trả lại cho `stream` các gói data mà chúng vừa thay đổi.

Như các bạn có thể thấy, các `modifier` không hề chạy một cách bị động, mà chúng sẽ tự động chạy, `react`(`phản ứng`) với mỗi gói data được `stream` truyền vào và đây chính là lý do vì sao mô hình này được đặt tên là `reactive programming`.

Nhờ vào việc các `modifier` tự động `react` với các gói data được `stream` truyền vào mà ta không phải tự tay chạy các `modifier` nên luồng hoạt động của mô hình này rất dễ nắm bắt, đọc hiểu. Một đặc điểm cực kỳ hữu ích của mô hình này là ta có thể tự định nghĩa thứ tự của các `modifier` trước khi một `stream`chạy, tùy vào thứ tự của các `modifier` mà các gói data `stream` trả về cho chúng ta sẽ khác nhau. Điều này giúp cho luồng hoạt động của `stream` trở nên rất rõ ràng, mạch lạc và dễ `debug`.

Khi được áp dụng vào thực tế, `reactive programming` có thể được áp dụng trong rất nhiều trường hợp, ví dụ method `setInterval`, chúng ta `có thể coi` rằng mỗi khi `setInterval` được chạy, nó sẽ tạo ra một `stream`. Như trong ví dụ dưới đây, `stream` mà method `setInterval` tạo ra sẽ nhận vào một gói data có giá trị là `undefined` sau mỗi 1s và `callback function` mà ta truyền vào trong `setInterval` sẽ có vai trò như là một `modifier`.

```ts
setInterval(data => {
    console.log('gói data nhận vào có giá trị là ', data);
}, 1000);
```

Tương tự như vậy, chúng ta cũng `có thể coi` như rằng method `setTimeout` sẽ tạo ra một `stream`, những, stream này sẽ dừng lại ngay sau khi `callback function`(`modifier`) ta truyền vào trong `setTimeout` chạy xong.

```ts
setTimeout(data => {
    console.log('gói data nhận vào có giá trị là ', data);
}, 1000);
```

`Event` cũng có thể được coi là các `stream`. Ví dụ như `event click`, mỗi khi chúng ta `click`, một gói data chứa các thông tin của lần `click` đó sẽ được truyền vào trong `stream` và `callback` của `event click` sẽ là các `modifier` xử lý các gói data đó.

```ts
document.onclick = function(evt) {
    console.log('gói data nhận vào có giá trị là ', evt);
}
```

## 2. Rxjs
Vậy là mình đã giới thiệu xong cho các bạn về `reactive programming`. Phần lớn các bài viết trên mạng về mô hình này đều giới thiệu mô hình này một cách rất chung chung, khó hiểu. Nên mình mong phần giới thiệu ở trên có thể mang đến cho các bạn một cái nhìn mới, dễ hiểu hơn về `reactive programming`. Bây giờ chúng ta hãy cùng xem cách mà `rxjs` hoạt động nhé. 

### 2.1 Rxjs là gì
`Reactive programming` chỉ là một khái niệm, một cách nghĩ, suy luận về vòng đời của các gói data và `rxjs` sẽ giúp chúng ta mô hình hoá nó để chúng ta có thể áp dụng nó vào thực tế một cách dễ dàng.

### 2.2 Các thuật ngữ trong Rxjs
Trước khi chúng ta đi sâu hơn về `Rxjs`, các bạn hãy đọc qua một số thuật ngữ chính trong thư viện này nhé.

* `Observable`: là một constructor giúp chúng ta tạo ra các object `observable` tạm thời thì các bạn có thể coi `observable` là một `class`, và các `instance` của `class` này chính là các `stream`.

* `executor`: nếu như `observable` là một `class` thì `executor` chính là phần logic hay `constructor` method của `class` đó, nó sẽ giúp chúng ta định nghĩa cách mà một `stream` sẽ hoạt động (lát nữa mình sẽ giải thích sau).

* `observer`: là một object có 3 `method`, 3 `method` này chính là 3 `modifier`, nhưng từng `modifier` sẽ chạy trong một trường hợp khác nhau:
    * `next`: modifier này sẽ chạy(`react`) mỗi khi nó nhận được một gói data.

    * `error`: modifier này sẽ chạy(`react`) khi `stream` đi theo nó bị lỗi, `modifier` này sẽ nhận vào một tham số trả về lỗi mà `stream` gặp phải.

    * `complete`: modifier này sẽ chạy(`react`) khi logic của `stream` đi theo nó ngừng chạy (mình sẽ giải thích phần này sau).

* `subscribe`: Nếu `observable` là một `class` thì `subscribe` chính là keyword `new`. Khi được gọi, `method` này sẽ tạo ra một `stream` dựa trên `observable` mà nó được gọi và chạy `stream` đó.

* `subscription`: là một object được method `subscribe` trả về, object có một số method được dùng để điều khiển quá trình hoạt động của `executor`.

* `operator`: chính là các `modifier`, nhưng chúng cũng đóng vai trò là người vận chuyển các gói data đến `stream`.

### 2.3 Cách Observable hoạt động
Ok, đến đây, các bạn có thể thắc mắc tại sao mình lại đi giải thích cách `observable` hoạt động mà không phải cách `rxjs` hoạt động thì đó là vì `rxjs` là một hệ sinh thái bao gồm một số công cụ chính giúp chúng ta mô phỏng lại mô hình `reactive programming` và một trong số chúng là `observable`.

Để giúp mọi người hiểu được cách observable hoạt động, mình đã tạo một `observable` mô phỏng lại một method `setInterval` có thời gian chạy cố định là `1s`.

```ts
import { Observable } from "rxjs";

const interval$ = new Observable(observer => {
    let intervalCounter = 0;
    const intervalInstance = setInterval(() => {
        intervalCounter++;
        observer.next(intervalCounter);

        if(intervalCounter === 3) {
            clearInterval(intervalInstance);
            observer.error('error');
            observer.complete();
        }

    }, 1000);
});

const observer = {
    next: intervalCounter => {
        console.log(intervalCounter);
    },
    error: error => {
        console.error(error);
    },
    complete: () => {
        console.log('complete');
    }
}

interval$.subscribe(observer);

// kết quả:
//
// 1
// 2
// 3
// error
```

Đầu tiên là dấu `$` nằm ở đuôi của biến `interval$`, dấu này chỉ là một `convention` khi các bạn đặt tên một biến chứa một `observable` thôi nhé.

Tiếp đến là constructor `Observable`, constructor này được dùng để tạo ra các object `observable` và như mình có nói ở trên, các bạn có thể tạm coi các `observable` hay các `instance` của constructor `Observable` là các `class` của các `stream`, và mỗi khi method `subscribe` của một `observable` được chạy thì một `stream` sẽ được tạo ra và chạy ngay lập tức cho đến khi `stream` này kết thúc quá trình chạy.

Constructor này nhận vào một function(function này chính là một `executor`) và truyền vào trong function đó một `observer`, 3 method của object này là: `next`, `complete`, `error` và chúng chính là 3 method `next`, `complete`, `error` mà ta định nghĩa trong object `observer` và truyền vào trong method `subscribe`.

Đi sâu hơn về `executor` thì một `executor` chính là cách mà một `stream` hoạt động. Hơi khó hiểu phải không :dizzy::dizzy::dizzy:. Nhưng nếu các bạn coi cách hoạt động của một method `setInterval` là một `stream` như ví dụ đầu tiên ở phần giới thiệu về `reacive programming` thì các ban có thể thấy `executer` chỉ là một function được dùng để chạy method `setInterval`, điều duy nhất ngoài việc gọi method `setInterval` mà `executor` làm đó là chạy các `method`: `next`, `complete`, `error` của object `observer` mà nó nhận được (đây là khi các `operator` này đóng vai trò là những người `vận chuyển` data). Mỗi khi method `subscribe` của một `observable` được chạy thì `executor` của `observable` đó sẽ được chạy và mỗi khi một `executor` được chạy thì được nhiên là ... một `stream` sẽ được tạo ra. Okay, bây giờ thì các bạn có thể từ bỏ việc coi `observable` như là một `class` của các `stream` được rồi đấy :bulb:.

Khác với `stream` hay `observable`, `Observer` khá là dễ hiểu. Nếu các bạn đọc kỹ đoạn code ở trên và test thử thì object `observer` được truyền vào trong `executor` chính mà object `observer` mà các bạn truyền vào trong method `subscribe`. Thực chất thì mình đang gọi method `next` của object `observer` mà mình truyền vào trong `subscribe` khi mình viết: `observer.next(intervalCounter);`, đây cũng chính là cách mà các `operator` được chạy và khi chúng được chạy thì chúng sẽ đóng vai trò là các `operator`, các bạn có thể thấy mình `cố tình` gọi method `error`: `observer.error('error');` khi `setInterval` chạy được 3 lần.

#### 2.3.1 Dừng chạy-complete một observable
Như mình đã đề cập ở mục [2.2](#2.2), thì `subscription` có một số method được dùng để điều khiển quá trình chạy của một `stream` và method có lẽ là quan trọng nhất và cũng được dùng phổ biến nhất là `unsubscribe`.

Đúng như cái tên của nó,  nghiệm vụ của `unsubscribe` hoàn toàn đối lập với `subscribe`, đó là dừng chạy một `executor`.

```ts
...

const subscription = interval$.subscribe(observer);

setTimeout(() => {
    subscription.unsubscribe();
}, 2000);
```

Khi các bạn thay đoạn `subscribe` ví dụ trong phần [2.3](#2.3) bằng ví dụ này thì các bạn có thể thấy `executor` của chúng ta chỉ in log ra inspector đúng một lần. Đó là vì chúng ta đã dừng `executor`.

Để có thể bắt được sự kiện khi một `executer` dừng chạy thì ta có thể `return` một function ngay trong `executor`, function này sẽ được class `Observable` class gọi khi hàm `unsubscribe` của một `observable` được gọi. Việc bắt sự kiện này có lẽ không phổ biến lắm, nhưng trong một số trường hợp cụ thể như ví dụ dưới đây thì nó rất quan trọng vì nó sẽ giúp chúng ta dừng hàm `setInterval` khi ta không cần dùng `observable` `interval$` nữa.

```ts
import { Observable } from "rxjs";

// Object.create method sẽ gọi new Observable() ngầm giúp chúng ta
const interval$ = Observable.create(observer => {
        let intervalCounter = 0;
        const intervalInstance = setInterval(() => {
        intervalCounter++;
        observer.next(intervalCounter);
    }, 1000);
   
    // function này sẽ được chạy khi interval$ bị unsubscribe
    return () => {
        console.log('complete');
        clearInterval(intervalInstance);
    }
});

const subscription = interval$.subscribe(
   // Observable class sẽ tự động map lần lượt các function dưới đây vào các method next, error và complete
   // của object observer mà nó chuyền vào trong executor
  intervalCounter => console.log(intervalCounter),
  error => console.log(error),
);

setTimeout(() => {
  subscription.unsubscribe();
}, 2000);

// kết quả:
//
// 1
// complete
```

#### 2.3.2 Observable contract
`Observable contract` là một quy định trong `rxjs` trong đó:

* Một `stream` sẽ không thể nhận các gói data sau khi `observer.complete` được gọi hoặc sau khi `observer.error` được gọi.
* Khi `observer.error` đã được gọi thì `stream` sẽ không thể nhận được bất kỳ gói data nào từ hay trigger `observer.complete` nữa.
* Khi `observer.complete` đã được gọi thì `stream` sẽ không thể nhận được bất kỳ gói data nào từ hay trigger`observer.error` nữa.

#### 2.3.3 Observable được dùng để xử lý bất đồng bộ ?
Mình thấy rất nhiều người cho rằng `rxjs` hay `observable` được dùng để xử lý bất đồng bộ. Nhưng thực tế thì cả `rxjs` và `observable` đều không hề liên gì đến việc xử lý bất đồng bộ, tất cả những gì `rxjs` làm chỉ là giúp chúng ta mô phỏng lại `reactive programming`. Việc một `observable` có được dùng để xử lý bất đồng bộ hay không hoàn toàn phụ thuộc vào cách chúng ta xử lý `executor`. Như ví dụ dưới đây mình có tạo một `observable` xử lý `đồng bộ`.

```ts
import { Observable, noop } from "rxjs";

const syncObservable$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

syncObservable$.subscribe(
  intervalCounter => console.log(intervalCounter),
  noop,
  () => console.log('complete')
);

console.log(4);

// kết quả:
//
// 1
// 2
// 3
// complete
// 4
```

Như các bạn có thể thấy, mình không về gọi method `observer.error` trong `executor` ở ví dụ trên nên việc định nghĩa một function để xử lý error cho observable `syncObservable$` là hoàn toàn không cần thiết. Với những trường hợp như này hoặc nếu các bạn không quan tâm đến việc xử lý một method nào đó trong 3 method của object `observer` thì các bạn có thể truyền `noop` vào vị trí của method tương ứng nhé.

### Kết luận
Vậy là mình đã giải nghĩa xong với các bạn về `reactive programming` và các `concept` chính trong thư viện `rxj`. Mục đích của bài viết này không về đi sâu vào thư viện `rxjs`, nhất là về `operator`, một trong những điểm ăn khách của thư viện này và `subject`(một dạng `observable` đặc biệt) mà mình chỉ muốn đưa đến với mọi người một cái nhìn tổng quát, dễ hiểu về `rxjs` để những bạn mới bắt đầu con đường học `rxjs` của mình trở nên dễ dàng hơn. Thực tế thì các bạn chỉ cần nắm bắt được những `concept` ở trên thôi là đã gần như các bạn đã nắm được thư viện này rồi, những thứ như `subject` hay `operator`,... giờ đây sẽ trở nên cực kỳ dễ hiểu và dễ áp dụng. Chúc các bạn một ngày vui vẻ. Happy coding !