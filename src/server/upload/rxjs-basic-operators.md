Trang https://rxjs-dev.firebaseapp.com có viết: "RxJS là một thư viện phục vụ cho reactive programming sử dụng các Observables, giúp việc code liên quan đến bất động bộ hoặc callback trở nên thuận tiện hơn". RxJS là một phần của ReactiveX, là thư viện được sử dụng trong nhiều ngôn ngữ lập trình khác nhau. Do vậy, khi bạn học được RxJS thì các operators của nó cũng sẽ có thể được sử dụng cho các ngôn ngữ khác.

Tư tưởng chính của ReactiveX và RxJS là sử dụng "Stream of data" (tạm hiểu là luồng dữ liệu) và các method, event (operators) để tác động vào luồng dữ liệu. Dưới đây là một số operators cơ bản và cách sử dụng, phiên bản được sử dụng là **RxJS version 6.xx**, sử dụng với Angular:

### 1. tap()
Tạm hiểu là **làm gì đó khi stream có data được đẩy vào.**
Ví dụ: 
```typescript
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);
// Log each value with tap
const example = source.pipe(
  tap(val => console.log(val)),
);

//'tap' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(val));
```

`tap()` operator sẽ nhận một callback với argument là giá trị được stream truyền qua và được các operators trước đó trả lại. Có vẻ hơi khó hiểu. Xem tiếp operator `map()` bạn sẽ thấy rõ hơn.

### 2. map()
Tạm hiểu là **dữ liệu nào chạy qua đây sẽ bị điều chỉnh sau đó trả lại cho operators liền sau**. Ví dụ:

```typescript
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);
// Log each value with tap
const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
);

//'tap' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(val));
```

Kết quả tại `console` sẽ là 1 - 11, 2 - 12 ..., x - x + 10 cho mỗi giá trị của stream. `tap()` operators thứ 2 sẽ nhận giá trị của operator map trước đó.

### 3. filter()
Tạm hiểu là **thoả mãn điều kiện thì mới làm, không thì thôi**. Ví dụ:
```typescript
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//filter out non-even numbers
const example = source.pipe(filter(num => num % 2 === 0));
//output: "Even number: 2", "Even number: 4"
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));
```
console sẽ chỉ xuất hiện các số chẵn (chia 2 dư 0). `filter()` nhận một callback với argument là giá trị trả lại của operator trước đó và sẽ `return` true hoặc false tương ứng với việc stream có được phép chạy hoặc không chạy tiếp tục.

Một số nguồn tham khảo khác:
- https://www.learnrxjs.io/operators/
- https://rxjs-dev.firebaseapp.com/
- http://reactivex.io/