Xin chào các bạn,

Kì này chúng ta lại tiếp tục với những thủ thuật JS vừa hay ho nhưng cũng không kém phần xịn xò của series JSTip nhé. Hy vọng các bạn đã theo dõi series của mình trong 3 phần vừa rồi, nếu chưa thì cứ thử ngó qua xem sao, biết đâu những tips mình lượm nhặt được lại giúp ích được phần nào cho các bạn:

[[JS tips series] Các "chiêu trò" JS tưởng không hay mà hay không tưởng](https://viblo.asia/s/cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-DVK2jDyjKLj)

Trong phần này chúng ta cùng nhau đi qua một số "chiêu trò" khác tiếp theo để dần dần có thể "kiểm soát" JS ngày một tốt hơn nhé.

![](https://images.viblo.asia/cfc07b2c-9846-427b-81af-bbcfabad80cf.gif)

<h2>1. Chiêu trò hay ho với Object properties</h2>

Đã bao giờ, trong một vài tình huống cần thiết, bạn từng thử tạo một object mà trong đó thuộc tính của nó là một thuộc tính chỉ đọc, tức là không thay đổi được giá trị cho thuộc tính đó? 

Trong JS, chúng ta có thể làm được điều này một cách dễ dàng mà có thể bạn chưa biết tới. Đây là một tính năng có từ ECMAScript 5.1. Vì vậy nên là bạn đừng lo, nó hỗ trợ mọi trình duyệt mới hiện nay (trình duyệt mới nhé, đừng mang IE ra thắc mắc với mình :v ).

Không dài dòng nữa, chúng ta sẽ implement nó như sau:

```javascript
var a = {};
Object.defineProperty(a, 'readonly', {
  value: 15,
  writable: false
});

a.readonly = 20;
console.log(a.readonly); // 15
```
Ở đây chúng ta sử dụng hàm ```defineProperty```, cú pháp của nó như sau:
```javascript
Object.defineProperty(dest, propName, options)
```
hoặc khi ta khai báo nhiều thuộc tính thì:
```javascript
Object.defineProperties(dest, {
  propA: optionsA,
  propB: optionsB, //...
})
```
Và chúng ta sẽ có một vài options:

- ```value```: Nếu thuộc tính được định nghĩa không có ```getter``` thì option này là bắt buộc (xem ví dụ dưới nhé) . Vậy nên ```{a: 12}``` sẽ tương đương với  ```Object.defineProperty(obj, 'a', {value: 12})```
- ```writable```: Chính option này là chìa khóa cho thủ thuật đầu tiên của chúng ta, nó sẽ quy định rằng thuộc tính này là readonly hay không.
- ```enumerable```: option này set cho thuộc tính là ẩn. Nghĩa là, khi ta sử dụng vòng lặp ```for ... of``` hoặc là ```stringify``` thì  trong kết quả sẽ không bao gồm thuộc tính này, nhưng mà thuộc tính này vẫn ở trong object, chỉ là nó ẩn đi mà thôi. Lưu ý rằng, điều này không có nghĩa là thuộc tính của bạn đã trở thành private nhé, nó vẫn có thể được truy vập từ bên ngoài đó, chỉ là nó không được in ra cho bạn nhìn thấy mà thôi.
- ```configurable```:  set cho thuộc tính của bạn là không sửa đổi được (non modifiable), ví dụ như là nó sẽ được bảo vệ khỏi việc xóa và định nghĩa lại (redefined). Nhắc lại rằng, nếu thuộc tính của bạn là một đối tượng lồng (nested object), thì nó vẫn có thể được sửa đổi và định nghĩa lại đó. 

Vì vậy nếu muốn tạo một object có thuộc tính private thì ta sẽ làm như sau:
```javascript
Object.defineProperty(obj, 'myPrivateProp', {value: val, enumerable: false, writable: false, configurable: false});
```

Ngoài việc cho phép ta cấu hình thuộc tính, hàm ```defineProperty``` còn cho phép ta tạo các thuộc tính động (dynamic properties). Wow, động là thế nào thế??? Nghe rất là kêu đúng không, là như này: 
```javascript
var obj = {
  getTypeFromExternal(): true // illegal in ES5.1
}

Object.defineProperty(obj, getTypeFromExternal(), {value: true}); // ok

// For the example sake, ES6 introduced a new syntax:
var obj = {
  [getTypeFromExternal()]: true
}
```

Hàm ```getTypeFromExternal``` trả về tên thuộc tính mà chúng ta mong muốn đó. That's so awesome, right?

Nhưng mà đó chưa phải là tất cả đâu nhé, phần hay vẫn còn tiếp diễn mà. Phương thức ```defineProperty``` còn cho phép ta tạo ra ```getter``` và ```setter``` như bao ngôn ngữ hướng đối tượng khác. Nhưng lưu ý rằng, khi làm thế thì chúng ta không thể sử dụng ```writable```, ```enumerable``` và ```configurable``` như bình thường được nữa.
```javascript
function Foobar () {
  var _foo; //  true private property

  Object.defineProperty(obj, 'foo', {
    get: function () { return _foo; }
    set: function (value) { _foo = value }
  });

}

var foobar = new Foobar();
foobar.foo; // 15
foobar.foo = 20; // _foo = 20
```
Điều này có một lợi thế, ở một khía cạnh nào đó đối với tùy ngữ cảnh, rằng, bạn thấy rằng chúng ta không hề gọi ```getter``` như bình thường, mà chúng ta chỉ "get" ra thuộc tính mà không cần bất kì ngoặc đơn nào cả. Thật là hay phải không? Điều này có vẻ chưa hay ho khi bạn mà chưa xem ví dụ sau:
```javascript
var obj = {a: {b: {c: [{d: 10}, {d: 20}] } } };
```
Thay vì viết rằng ```a.b.c[0].d``` để lấy ra giá trị thì ta hoàn toàn có thể làm bằng một cách khác vi diệu hơn:
```javascript
Object.defineProperty(obj, 'firstD', {
  get: function () { return a && a.b && a.b.c && a.b.c[0] && a.b.c[0].d }
})

console.log(obj.firstD) // 10
```
*Lưu ý nhẹ cuối bài*: Nếu bạn định nghĩa ```getter``` mà không định nghĩa ```setter``` và cố tình set giá trị cho thuộc tính ấy, lúc ấy bạn ắt gặp lỗi. Đây là một điều quan trọng nên hãy cẩn thận nhé!

<h2>2. Một thao tác "tai hại" làm giảm hiệu năng</h2>

Trong các hàm của JS, có một biến tên là ```arguments``` cho phép bạn truy cập vào tất cả các tham số được truyền vào của hàm. ```arguments``` là một ```array-like object``` (mình mạn phép không dịch vì ... không biết dịch như nào cả :D), nó có thể được truy cập vào bằng các sử dụng kí hiệu mảng [ ], nó cũng có thuộc tính ```length``` như bao mảng khác. Nhưng mà trớ trêu thay, nó lại chẳng có một số phương thức mặc định của mảng vẫn có như là ```filter```, ```map```, ```forEach```. Do đó, có một cách khá phổ biến để chuyển đổi các tham số thành một mảng như sau: 
```javascript
var args = Array.prototype.slice.call(arguments);

// hoặc ngắn gọn hơn là

var args = [].slice.call(arguments);
```
Sử dụng hàm ```slice``` của Array prototype sẽ trả về một bản copy của ```arguments``` là một mảng mới. 

Nhưng không may rằng, việc *passing arguments* là nguyên nhân dẫn tới V8 JS engine sử dụng trong Chrome và Node bỏ qua việc tối ưu hóa cho hàm thực hiện, dẫn tới hiệu năng của chương trình bị chậm đi. Để biết thêm thông tin chi tiết các bạn vui lòng đọc  [bài này](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers) nhé. 

VÌ vậy nên thay vì sử dụng cách ngắn ngọn mà nguy hiểm trên, chúng ta sẽ sử dụng một cách loằng ngoằng mà an toàn hơn như thế này nhé:
```javascript
var args = new Array(arguments.length);
for(var i = 0; i < args.length; ++i) {
  args[i] = arguments[i];
}
```

<h2>3. Tăng tốc hàm đệ quy</h2>

*"Em hãy viết cho anh hàm tính số Fibonacci thứ n!"*

*"Anh cho em 20s"*

Và xoẹt xoẹt xoẹt... bạn nhắm mắt cũng có thể viết được với thuật toán đệ quy cơ bản như sau:
```javascript
var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
```
Nó làm việc đúng như ý bạn mong muốn và trả ra kết quả, nhưng mà đây là một cách chưa tối ưu cho lắm. Ở thủ thuật này, mình muốn bàn tới việc tối ưu hóa hàm này một chút nhé. 

Tại sao chúng ta lại không *cache* giá trị của các lần tính toán trước đó để tăng tốc hàm đệ quy này lên một chút? Thử nào:
```javascript
var fibonacci = (function() {
  var cache = [0, 1]; // cache the value at the n index
  return function(n) {
    if (cache[n] === undefined) {
      for (var i = cache.length; i <= n; ++i) {
        cache[i] = cache[i - 1] + cache[i - 2];
      }
    }
    return cache[n];
  }
})();
```
Chúng ta hoàn toàn có thể viết tách thành function thế này:
```javascript
var memoize = function(func) {
  var cache = {};
  return function() {
    var key = JSON.stringify(Array.prototype.slice.call(arguments));
    return key in cache ? cache[key] : (cache[key] = func.apply(this, arguments));
  }
}
fibonacci = memoize(fibonacci);
```
Và xịn xò hơn một chút nữa nhé khi ta sử dụng ES6:
```javascript
var memoize = function(func) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = func(...args));
  }
}
fibonacci = memoize(fibonacci);
```
Và bây giờ thì hay rồi, chúng ta có thể sử dụng hàm ```memoize``` này bất cứ khi nào chúng ta muốn. Ví dụ như là 2 đoạn code nhỏ sau:

* Bài toán tìm ước chung lớn nhất  -  GCD (Greatest Common Divisor)
```javascript
var gcd = memoize(function(a, b) {
  var t;
  if (a < b) t = b, b = a, a = t;
  while (b != 0) t = b, b = a % b, a = t;
  return a;
});
gcd(27, 183); //=> 3
```
* Tính giai thừa - Factorial calculation
```javascript
var factorial = memoize(function(n) {
  return (n <= 1) ? 1 : n * factorial(n - 1);
})
factorial(5); //=> 120
```

<h2>Kết luận</h2>

Phù, cuối cùng đã đi qua 3 thủ thuật của phần này, các bạn đừng vội vàng tắt tab khi thấy các thủ thuật của mình mang lại điều hữu thích cho bạn, hãy để lại comment hoặc upvote để mình có động lực viết tiếp các bài sau nhé! Hy vọng các bạn tiếp tục ủng hộ các "chiêu trò" của mình nhé.

Xin cảm ơn!

**References**  http://www.jstips.co/