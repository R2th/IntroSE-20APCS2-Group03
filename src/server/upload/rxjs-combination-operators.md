Combination Operators cho phép kết hợp thông tin từ nhiều Observable lại. Thứ tự, thời gian và cấu trúc của kết quả trả ra là điểm phân biệt chính giữa các operator này. Dưới đây là một số operator thường được sử dụng.

---

## 1. combineLatest
Operator này thường được sử dụng khi có nhiều Observable tồn tại trong thời gian dài, và kết quả của chúng cần dựa vào nhau để tính toán hoặc thực hiện hành động nào đó. `combineLatest` sẽ không trả ra giá trị cho đến khi từng Observable trả ít nhất một giá trị.

Output operator là một array, trong đó từng phần tử là kế quả của Observable được viết trong operator theo thứ tự đó.

```typescript
// RxJS v6+
import { fromEvent, combineLatest } from 'rxjs';
import { mapTo, startWith, scan, tap, map } from 'rxjs/operators';

// elem refs
const redTotal = document.getElementById('red-total');
const blackTotal = document.getElementById('black-total');
const total = document.getElementById('total');

const addOneClick$ = id =>
  fromEvent(document.getElementById(id), 'click').pipe(
    // map every click to 1
    mapTo(1),
    // keep a running total
    scan((acc, curr) => acc + curr, 0),
    startWith(0)
  );

combineLatest(addOneClick$('red'), addOneClick$('black')).subscribe(
  ([red, black]: any) => {
    redTotal.innerHTML = red;
    blackTotal.innerHTML = black;
    total.innerHTML = red + black;
  }
);
```

## 2. forkJoin
Đồng thời gọi tất cả các Observable, khi tất cả kết thúc, trả ra dữ liệu cuối cùng của tất cả các Observable đó.
```typescript
// RxJS v6.5+
import { ajax } from 'rxjs/ajax';
import { forkJoin } from 'rxjs';

/*
  when all observables complete, provide the last
  emitted value from each as dictionary
*/
forkJoin(
  // as of RxJS 6.5+ we can use a dictionary of sources
  {
    google: ajax.getJSON('https://api.github.com/users/google'),
    microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
    users: ajax.getJSON('https://api.github.com/users')
  }
)
  // { google: object, microsoft: object, users: array }
  .subscribe(console.log);
```

## 3. merge
Biến nhiều Observable thành một Observable chạy song song. Trả ra kết quả mỗi khi một Observable con trả ra kết quả.
```typescript
// RxJS v6+
import { mapTo } from 'rxjs/operators';
import { interval, merge } from 'rxjs';

//emit every 2.5 seconds
const first = interval(2500);
//emit every 2 seconds
const second = interval(2000);
//emit every 1.5 seconds
const third = interval(1500);
//emit every 1 second
const fourth = interval(1000);

//emit outputs from one observable
const example = merge(
  first.pipe(mapTo('FIRST!')),
  second.pipe(mapTo('SECOND!')),
  third.pipe(mapTo('THIRD')),
  fourth.pipe(mapTo('FOURTH'))
);
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
const subscribe = example.subscribe(val => console.log(val));
```

-----
Trên đây là một số Combine Operator. Nguồn tham khảo:
[https://www.learnrxjs.io/operators/combination/](https://www.learnrxjs.io/operators/combination/)