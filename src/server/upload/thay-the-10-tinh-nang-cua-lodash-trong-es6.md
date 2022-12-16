# Mở đầu
Lodash là một thư viện tuyệt vời cung cấp rất nhiều helper method giúp cho quá trình phát triển với Javascript trở nên dễ dàng hơn. Tuy nhiên với ES6, ta có giải pháp thay thế mà không cần phụ thuộc vào thư viện này nữa. Trong bài viết này, mình sẽ giới thiệu các sử dụng các native method kết hợp với arrow function cũng như các tính năng mới trong ES6 để giải quyết các use case kinh điển.

### 1. Map, Filter, Reduce
Đây là những method đã khá là quen thuộc rồi, sử dụng để tạo ra những collection mới phù hợp với nhu cầu sử dụng dựa trên collection gốc.
```
_.map([1, 2, 3], function(n) { return n * 3; });
// [3, 6, 9]
_.reduce([1, 2, 3], function(total, n) { return total + n; }, 0);
// 6
_.filter([1, 2, 3], function(n) { return n <= 2; });
// [1, 2]
```
Có thể viết lại bằng native method `map, reduce, filter` kết hợp với `arrow function`:
```
[1, 2, 3].map(n => n * 3);
[1, 2, 3].reduce((total, n) => total + n);
[1, 2, 3].filter(n => n <= 2);
```

### 2. Head & Tail
`Destructiring syntax` cho phép ta lấy ra đầu hoặc đuôi của 1 list. Thay vì:
```
var head = _.head([1, 2, 3]);
// 1
var tails = _.tail([1, 2, 3]);
// [2, 3]
```
Được thay bằng:
```
const [head, ...tail] = [1, 2, 3];
```
Tương tự có thể lấy ra initial elements và last element của 1 list:
```
var init_elements = _.initial([1, 2, 3]);
// -> [1, 2]
var last_element = _.last([1, 2, 3]);
// 3
```
```
// In ES6
const [last, ...initial] = [1, 2, 3].reverse();
```
Nếu bạn lo ngại `reverse` sẽ làm mutates list, ta có thể sử dụng `spread operator` để clone list trước khi gọi `reverse`:
```
const xs = [1, 2, 3];
const [last, ...initial] = [...xs].reverse();
```

### 3. Rest and Spread
`rest` và `spread` function cho phép ta định nghĩa và gọi hàm mà có số lượng params không cố định. Thay vì
```
var say = _.rest(function(what, names) {
  var last = _.last(names);
  var initial = _.initial(names);
  var finalSeparator = (_.size(names) > 1 ? ', & ' : '');
  return what + ' ' + initial.join(', ') +
    finalSeparator + _.last(names);
});

say('hello', 'tang', 'hoai', 'duy');
// "hello tang, hoai, & duy"
```
Bằng:
```
const say = (what, ...names) => {
  const [last, ...initial] = names.reverse();
  const finalSeparator = (names.length > 1 ? ', &' : '');
  return `${what} ${initial.join(', ')} ${finalSeparator} ${last}`;
};

say('hello', 'tang', 'hoai', 'duy');
// "hello tang, hoai, & duy"
```

### 4. Curry
`Currying(n.)` là một kỹ thuật chuyển đổi một function nhiều tham số có thể được gọi theo kiểu function chaining, với mỗi function nhận một tham số duy nhất. Ví dụ có function nhận 2 tham số như sau
```
function(x, y) {
    return x + y;
}
```
khi được `curried`, nó trở thành một chuỗi các function, một function nhận 1 tham số:
```
 
function(x) {
    return function(y) {
        return x + y;
    };
}
```
Nếu đặt tên cho chúng thì:
```
function f(x, y) {

    return x + y;

}

function g(x) {

    return function(y) {

        return x + y;

    };

}

// ====>
f(1, 2) === g(1)(2);
```
Đó chính xác là những gì mà function `_.curry` trong lodash thực hiện:
```
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curry(abc);
 
curried(1)(2)(3);
// => [1, 2, 3]
```

Có thể sử dụng arrow function để viết lại:
```
const curried = a => b => c => [a, b, c];

curried(1)(2)(3);
// => [1, 2, 3]
```


### 5. Partial
Trong lodash, function `_.partial(func, [partials])`  sẽ tạo một function mà invoke đến `func` và sẽ thêm `partials` vào đằng trước danh sách tham số mà nó nhận được:
```
function greet(greeting, name) {
  return greeting + ' ' + name;
}
 
 // ở đây khi gọi đến function `sayHelloTo(a)` thì `hello` sẽ ứng tham số đầu tiên của function `greet`
var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'
 
// Trong TH dùng placeholder `_` thì khi gọi `greetFred(a)`, sẽ hiểu là thế a vào placeholder
var greetFred = _.partial(greet, _, 'fred');
greetFred('hi');
// => 'hi fred'
```

Tác vụ tương tự được thực hiện bằng arrow function:
```
const sayHelloTo = name => greet('hello', name);
sayHelloTo('fred');
// "hello fred"
```

### 6. Operators
Lodash implement lại các toán tử như cộng trừ nhân chia thành các function để có thể pass vào các collection method như một callback method:
```
_.eq(3, 3);
// true
_.add(10, 1);
// 11
_.map([1, 2, 3], function(n) {
  return _.multiply(n, 10);
});
// [10, 20, 30]
_.reduce([1, 2, 3], _.add);
// 6
```
Tương đương với:
```
3 === 3
10 + 1
[1, 2, 3].map(n => n * 10);
[1, 2, 3].reduce((total, n) => total + n);
```

### 7. Paths
Có nhiều function trong Lodash nhận path là string hoặc array. Thay vì thế, ta có thể sử dụng arrow function để tạo ra các path có thể tái sử dụng:
```
var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };

_.at(object, ['a[0].b.c', 'a[1]']);
// [3, 4]
_.at(['a', 'b', 'c'], 0, 2);
// ['a', 'c']

// becomes
[
  obj => obj.a[0].b.c,
  obj => obj.a[1]
].map(path => path(object));

[
  arr => arr[0],
  arr => arr[2]
].map(path => path(['a', 'b', 'c']));
```

### 8. Pick
Hàm `pick` cho phép ta lấy ra các property mà ta cần từ 1 target object. Ta có thể làm tương tự trong ES6 bằng cách sử dụng destructuring và shorthand object literal:
```
var object = { 'a': 1, 'b': '2', 'c': 3 };

return _.pick(object, ['a', 'c']);
// { a: 1, c: 3 }
```
Thay bằng:
```
const { a, c } = { a: 1, b: 2, c: 3 };

return { a, c };
```

### 9. Constant, Identity, Noop
Lodash cung cấp một số hàm utility để tạo các hàm đơn giản với một hành vi cụ thể:
```
_.constant({ 'a': 1 })();
// { a: 1 }
_.identity({ user: 'fred' });
// { user: 'fred' }
_.noop();
// undefined
```

Ta có thể define lại những function trên với `arrow function`:
```
const constant = x => () => x;
const identity = x => x;
const noop = () => undefined;
```

### 10. Chaining & Flow
Lodash cung cấp một số function giúp ta viết lệnh theo kiểu chaining.
```
_([1, 2, 3])
 .tap(function(array) {
   // Mutate input array.
   array.pop();
 })
 .reverse()
 .value();
// [2, 1]
```
Trong nhiều trường hợp, các phương thức built-in trả về array instance và có thể trực tiếp chaining, nhưng cũng có trường hợp mà method trực tiếp mutate collection, vì thế mà thay vì chaining, ta hoàn toàn có thể viết lại task vụ tương tự bằng 1 mảng các arrow function:
```
const pipeline = [
  array => { array.pop(); return array; },
  array => array.reverse()
];

pipeline.reduce((xs, f) => f(xs), [1, 2, 3]);
```
# Kết luận
### Tài liệu tham khảo
1. [https://www.sitepoint.com/lodash-features-replace-es6/](https://www.sitepoint.com/lodash-features-replace-es6/)
2. [https://lodash.com/docs](https://lodash.com/docs)