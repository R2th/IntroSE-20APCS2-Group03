![image.png](https://images.viblo.asia/055b1ff6-cf4b-4935-bd80-cd8fa3e6576a.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Hầu hết tất cả các vấn đề mà các Dev phải đối mặt hàng ngày đều có thể được giải quyết bằng cách giải quyết một tập hợp các vấn đề nhỏ hơn. Các giải pháp nhỏ cho các vấn đề đơn lẻ đã được xác định rõ hơn và đơn giản hơn. `Cách này gọi là chia để trị`. Các giải pháp này tốt nhất có thể được gọi là các `«pure functions»`.

Mặc dù hầu hết các function này được implement trong các thư viện khác nhau - điều quan trọng là phải hiểu cách thức và thời điểm chia các bài toán khó thành các bài toán nhỏ hơn. Cách suy nghĩ giải quyết vấn đề này sẽ làm tăng năng suất của bạn và khiến bạn trở nên tốt hơn.

Dưới đây là một bộ sưu tập không có thứ tự gồm 20 `«pure functions»` hữu ích mà mình sử dụng thường xuyên để giải quyết mọi vấn đề.

> Có thể lần đầu bạn đọc qua sẽ thấy nó tầm thường nhưng thật sự mình đã áp dụng vào dự án thực tế rất nhiều.
Phần cuối mình cũng có giới thiệu qua một dạng của `Pipe Pattern`.
Mình thường dùng `Pipe` sau đó cho dữ liệu của mình chạy qua và gắp những hàm này bỏ vào và thế là TÈNG TEN :D có một dữ liệu mới đã được xào nấu theo đúng ý.

![image.png](https://images.viblo.asia/f7c9a8cb-ac8a-408a-a9ea-f66a3840a928.png)

**OK GÉT GÔ**

Get value
============

Cho trước một `object` hoặc `array` \- hàm sẽ trả về `value` tại đường dẫn (`path`) đã được chỉ định, nếu không thì `null`.

```javascript
const getValue = (obj, path) => path
    .replace(/\[([^[\]]*)]/g, '.$1.')
    .split('.')
    .filter(prop => prop !== '')
    .reduce((prev, next) => (
        prev instanceof Object ? prev[next] : undefined
    ), obj);

getValue({ a: { b: { c: 'd' } } }, 'a.b.c'); // = d
getValue({ a: { b: { c: [1, 2] } } }, 'a.b.c[1]'); // = 2
```

Clamp
===

Đảm bảo một `value` nằm trong một phạm vi được chỉ định, nếu không, "_clamp_" với `value` gần nhất của giá trị `minimum` và `maximum`.

```javascript
const clamp = (min, max, value) => {
  if (min > max) throw new Error('min cannot be greater than max');
  return value < min
    ? min
    : value > max
      ? max
      : value;
}

clamp(0, 10, -5); // = 0
clamp(0, 10, 20); // = 10
```

Sleep
===

Chờ trong khoảng thời gian `duration` mili giây trước khi thực hiện thao tác tiếp theo. Cách làm này nhìn sẽ rất đồng bộ :D.

```javascript
const sleep = async (duration) => (
  new Promise(resolve =>
    setTimeout(resolve, duration)
  )
);

// DoSomething();
await sleep(1000); // waits 1 sec
// Sau khi chờ 1s thì thực hiện tiếp cái gì đó
// DoSomething();
```

Group by
=========

Nhóm và lập chỉ mục các mục liên quan trong một đối tượng theo _keying-function_.

```javascript
const groupBy = (fn, list) => (
  list.reduce((prev, next) => ({
    ...prev,
    [fn(next)]: [...(prev[fn(next)] || []), next]
  }), {})
);

groupBy(vehicle => vehicle.make, [
  { make: 'tesla', model: '3' },
  { make: 'tesla', model: 'y' },
  { make: 'ford', model: 'mach-e' },
]);

// { 
//   tesla: [ { make: 'tesla', ... }, { make: 'tesla', ... } ],
//   ford: [ { make: 'ford', ... } ],
// }
```

Bonus: Khi các bạn control được các `Snippets` này thì việc biến tấu nó cho phù hợp với task thì quá đơn giản luôn.

```js
export function groupBy(list: any, fnKey: any, fnValue = (e: any) => e) {
  return list.reduce(
    (prev: any, next: any) => ({
      ...prev,
      [fnKey(next)]: [...(prev[fnKey(next)] || []), fnValue(next)],
    }),
    {}
  );
}
```

Collect By
============

Tạo danh sách con chứa các mục liên quan theo _keying-function_ .

```javascript
// Tận dụng hàm trước đó đã viết
// Đó cũng là cách mà chúng ta sẽ chia nhỏ mọi thứ
import groupBy from './groupBy';

const collectBy = (fn, list) => 
  Object.values(groupBy(fn, list));

collectBy(vehicle => vehicle.make, [
  { make: 'tesla', model: '3' },
  { make: 'tesla', model: 'y' },
  { make: 'ford', model: 'mach-e' },
]);

// [ 
//   [ { make: 'tesla', ... }, { make: 'tesla', ... } ],
//   [ { make: 'ford', ... } ],
// ]
```

Head
=======

Lấy phần tử đầu tiên của danh sách. `Function` này rất hữu ích để code của chúng ta `writing clean and readable code`.

```javascript
const head = list => list[0];

head([1, 2, 3]); // = 1
head([]); // = undefined
```

Tail
========

Nhận tất cả trừ phần tử đầu tiên của danh sách. `Function` này cũng rất hữu ích cho việc `writing clean and readable code`.

```javascript
const tail = list => list.slice(1);

tail([1, 2, 3]); // = [2, 3]
tail([]); // = []
```

Flatten
=========

Tạo một danh sách phẳng bằng cách kéo tất cả các mục từ các danh sách con lồng nhau bằng cách sử dụng `đệ quy - recursively`.

```javascript
const flatten = list => list.reduce((prev, next) => ([
  ...prev,
  ...(Array.isArray(next) ? flatten(next) : [next])
]), []);

flatten([[1, 2, [3, 4], 5, [6, [7, 8]]]]); // = [1, 2, 3, 4, 5, 6, 7, 8]
```

Intersection By
===========

Tìm tất cả các `value` có trong cả hai danh sách như được xác định bởi một _keying-function_. **Ùi cái hàm này trong dự án mình xài nhiều cực kỳ.**

```javascript
const intersectionBy = (fn, listA, listB) => {
  const b = new Set(listB.map(fn));
  return listA.filter(val => b.has(fn(val)));
};

intersectionBy(v => v, [1, 2, 3], [2, 3, 4]); // = [2, 3]
intersectionBy(v => v.a, [{ a: 1 }, { a: 2 }], [{ a: 2}, { a: 3 }, { a: 4 }]); // = [{ a: 2 }];
```


Index By
================

Lập chỉ mục từng phần tử trong danh sách theo một `value` được xác định bởi _keying-function_.


```javascript
const indexBy = (fn, list) =>
  list.reduce((prev, next) => ({
    ...prev,
    [fn(next)]: next
  }), {});
              
indexBy(val => val.a, [{ a: 1 }, { a: 2 }, { a: 3 }]); 
// = { 1: { a: 1 }, 2: { a:2 }, 3: { a: 3 } }
```

Difference By
================

Tìm tất cả các mục trong danh sách đầu tiên không có trong danh sách thứ hai - được xác định bởi _keying-function_.

```javascript
import indexBy from './indexBy';

const differenceBy = (fn, listA, listB) => {
  const bIndex = indexBy(fn, listb);
  return listA.filter(val => !bIndex[fn(val)]);
});

differenceBy(val => val, [1,2,3], [3,4,5]); // = [1,2]
differenceBy(
  vehicle => vehicle.make, 
  [{ make: 'tesla' }, { make: 'ford' }, { make: 'gm' }], 
  [{ make: 'tesla' }, { make: 'bmw' }, { make: 'audi' }], 
); // = [{ make: 'ford' }, { make: 'gm' }]
```

Recover With
============

Trả về `value` mặc định nếu hàm đã cho **throw** một `Error`.

```javascript
const recoverWith = async (defaultValue, fn, ...args) => {
  try {
    const result = await fn(...args);
    return result;
  } catch (_e) {
    return defaultValue;
  }
}

recoverWith('A', val => val, 'B'); // = B
recoverWith('A', () => { throw new Error() }); // = 'A'
```

Distance
===========

Tính `khoảng cách Ơclit` giữa hai điểm `p1 & p2`. Cái này nếu bạn nào làm mấy cái game nhỏ nhỏ bằng JS hoặc Animation thì hay dùng lắm. [Nếu các bạn quên `khoảng cách Ơclit` là gì thì tham khảo ở đây. ](https://vi.wikipedia.org/wiki/Kho%E1%BA%A3ng_c%C3%A1ch_Euclid)

```javascript
const distance = ([x0, y0], [x1, y1]) => (
  Math.hypot(x1 - x0, y1 - y0)
);

distance([0, 1], [5, 4]); // = 5.8309518948453
```

Drop While
=============

Bỏ các phần tử khỏi danh sách, bắt đầu từ phần tử đầu tiên, cho đến khi gặp phần tử đầu tiên đúng với điều kiện.

```javascript
const dropWhile = (pred, list) => {
  let index = 0;
  list.every(elem => {
    index++;
    return pred(elem);
  });
  return list.slice(index-1);
}

dropWhile(val => (val < 5), [1,2,3,4,5,6,7]); // = [5,6,7]
```

Sum By
========

Tính tổng của tất cả các phần tử trong một danh sách cho trước theo _keying-function_ đã được đưa vào.

```javascript
const sumBy = (fn, list) =>
  list.reduce((prev, next) => prev + fn(next), 0);

sumBy(product => product.price, [
  { name: 'pizza', price: 10 }, 
  { name: 'pepsi', price: 5 },
  { name: 'salad', price: 5 },
]); // = 20
```

Ascending
========

Tạo một hàm so sánh tăng dần với một _valuating-function_.

```javascript
const ascending = (fn) => (a, b) => {
  const valA = fn(a);
  const valB = fn(b);
  return valA < valB ? -1 : valA > valB ? 1 : 0;
}

const byPrice = ascending(val => val.price);
[{ price: 300 }, { price: 100 }, { price: 200 }].sort(byPrice); 
// = [{ price: 100 }, { price: 200 }, { price: 300 }]
```

Descending
========

Tạo một hàm so sánh giảm dần với một _valuating-function_.


```javascript
const descending = (fn) => (a, b) => {
  const valA = fn(b);
  const valB = fn(a);
  return valA < valB ? -1 : valA > valB ? 1 : 0;
}

const byPrice = descending(val => val.price);
[{ price: 300 }, { price: 100 }, { price: 200 }].sort(byPrice); 
// = [{ price: 300 }, { price: 200 }, { price: 100 }]
```

Find Key
========

Tìm khóa đầu tiên trong một chỉ mục thỏa mãn phạm vi đã cho.

```javascript
const findKey = (predicate, index) => Object
  .keys(index)
  .find(key => predicate(index[key], key, index));

findKey(
  car => !car.available,
  {
    tesla: { available: true },
    ford: { available: false },
    gm: { available: true }
  },
); // = "ford"
```


Bifurcate By
============

Chia các `value` của một danh sách đã cho thành hai danh sách, một danh sách chứa các `value` mà hàm `function-evaluates` là đúng, danh sách kia chứa các phần tử còn lại. 
Hàm này mình cũng thường áp dụng trong dự án lắm. VD: để `Bifurcate` danh sách `Nhân Viên` có hoặc ko có thông tin nào đó. (ko có Email chẳng hạn)

```javascript
const bifurcateBy = (predicate, list) =>
  list.reduce((acc, val, i) => (
    acc[predicate(val, i) ? 0 : 1].push(val), acc), 
    [[], []]
  );
  
bifurcateBy(val => val > 0, [-1, 2, -3, 4]); 
// = [[2, 4], [-1, -3]]
```

Pipe
=========

`Pipe` này mình đã có nhắc ở đầu bài viết.
Thực hiện các `function composition` từ trái sang phải. Tất cả các đối số bổ sung sẽ được chuyển đến hàm đầu tiên trong danh sách, do đó có thể có bất kỳ đối số nào. Kết quả sẽ được chuyển làm đối số tiếp theo, và kết quả thứ hai sẽ được chuyển sang thứ ba,… và cứ tiếp tục như vậy cho đến khi tất cả các hàm đã được xử lý.

```javascript
const pipe = (functions, ...args) => (
  functions.reduce(
    (prev, next) => Array.isArray(prev) ? next(...prev) : next(prev),
    args
  )
);
pipe([Math.abs, Math.floor, val => -val], 4.20); // = -4
pipe([(a, b) => a - b, Math.abs], 5, 10); // = 5
// Trong thực tế có thể là
```

Một ví dụ khác thực tế hơn

```javascript
const config = {};
pip([Auth, Proxy, (c)= > c.role='Admin' ], config);
// Sau khi chạy qua pipe xong thì TÈN TEN
// config giờ nó ko phải là {} mà có thể là một Object chứa đầy đủ config cho dự án của bạn
// Và `Auth, Proxy, Role...` là các `Factory Function` mà các bạn đã định nghĩa trước đó rồi. (Còn về khái niệm Factory là gì nếu các bạn chưa biết thì có thể lục tìm lại bài viết của mình để tham khảo nhé)
```

Lời kết
=======

Mặc dù tất cả các `function` này có thể thực sự hữu ích để giúp bạn giải quyết các vấn đề bạn đang làm - bài học quan trọng nhất là biết cách chia các vấn đề phức tạp và khó thành các vấn đề nhỏ được xác định rõ ràng và có thể được giải quyết một cách độc lập. Một khi bạn thành thạo điều này - thì bạn đã trên con đường trở thành một Dev xuất sắc!

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
=======
* https://tuan200tokyo.blogspot.com/2022/11/blog37-bay-lac-cung-voi-20-snippets.html