Nhắc đến Javascript thì không thể không nói đến `function`, không những thế, nó còn được coi như một gương mặt thương hiệu của ngôn ngữ này. Nhưng lại không nhiều người cho lắm hiểu hiết về từng loại `function`.Dưới đây sẽ là cụ thể từng loại `function` mà có thể bạn đã từng dùng nhưng chưa thực sự biết về nó.

### Pure Function
#### Như thế nào được gọi là một `pure function`?
Những hàm mà thỏa mãn cả hai điều kiện sau sẽ được gọi là `pure function` - hàm thuần túy:<br/>
- Hàm đó sẽ luôn luôn trả về cùng một kết quả nếu ta truyền vào những tham số giống nhau.
- Không có tác dụng phụ xảy ra khi chạy hàm đó.

Ví dụ 1:
```javascript
function circleArea(radius){
  return radius * radius * 3.14;
};
```
Như các bạn thấy đấy, nếu bạn truyền vào bán kính có giá trị bằng nhau thì hàm `circleArea` sẽ luôn trả về cùng một kết quả. Và việc chạy hàm `circleArea` này thì cũng không có ảnh hưởng gì đến bên ngoài hàm này cả, do đó đây là một hàm thuần túy.<br/>
Ví dụ 2:
![](https://images.viblo.asia/16519b3a-59cf-4437-8454-c0c6a8df423d.png)
Hàm `counter()` trên với mỗi lần chạy sẽ trả về một kết quả khác nhau, do đó đây không phải là hàm thuần túy.<br/>
Ví dụ 3:
```javascript
let femaleCounter = 0;
let maleCounter = 0;
function isMale(user){
  if(user.sex = 'man'){
    maleCounter++;
    return true;
  }
  return false;
};
```
Ở ví dụ trên thì hàm `isMale` mặc dù luôn trả về cùng một kết quả khi truyền vào tham số giống nhau, nhưng bên cạnh đó, hàm này còn thực hiện thêm chức năng `counter`(làm thay đổi giá trị của một biến toàn cục - ngoài phạm vi của hàm) dẫn đến hàm này không còn là hàm thuần túy nữa.
#### Pure function dùng để làm gì?
Tại sao chúng ta phân biệt giữa hàm thuần túy với một hàm khác ư? Bởi vì hàm thuần túy có rất nhiều ưu điểm, không nhưng thế chúng ta còn có thể sử dụng các hàm thuần túy để cải thiện chất lượng code của mình: <br>
**1.** `pure function` rõ ràng và dễ đọc hơn nhiều.<br>
Mỗi một hàm thuần túy viết ra đều luôn có một chức năng cụ thể, luôn trả về kết quả rõ ràng. Điều này phần nào khiến đoạn code của bạn dễ hiểu hơn, dễ áp dụng hơn.<br/>
**2.** Trình biên dịch có thể tối ưu hóa nhiều hơn trên các hàm thuần túy<br>
Thử ví dụ với đoạn code sau:
```javascript
for (int i = 0; i < 1000; i++){
    console.log(fun(10));
}
```
Nếu `fun` không phải là một hàm thuần túy, thì `fun(10)` sẽ cần được thực thi `1000` lần trong khi đoạn code trên chạy.<br>
Nhưng nếu `fun` là một hàm thuần túy, trình soạn thảo sẽ có thể tối ưu hóa mã tại thời điểm biên dịch, hiểu đơn giản, đoạn mã sau khi biên dịch sẽ trông như thế này:
```javascript
let result = fun(10);
for (int i = 0; i < 1000; i++){
    console.log(result);
}
```
**3.** `pure function` dễ dàng hơn trong việc test<br>
Việc test với một hàm thuần túy khá là đơn giản, do hàm này không bị ảnh hưởng bởi các giá trị bên ngoài. Chỉ đơn giản bạn truyền vào 1 giá trị và lắp nó vào một công thức cụ thể, lúc đó kết quả đầu ra chắc chắn phải là kết quả đó, dù chạy bao nhiêu lần đi nữa thì cũng chỉ ra đúng kết quả đó thôi.
### Higher-Order Function
#### Thế nào thì được coi là một higher-order function?
- Nhận một hay nhiều hàm là đối số
- Kết quả về là một hàm dưới dạng kết quả của nó.

Sử dụng `higher-order function` giúp tăng tính linh hoạt cho đoạn code của bạn, cho phép chúng ta viết code ngắn gọn và hiệu quả hơn.<br>
Một ví dụ đơn giản đó là kết quả đầu vào là 1 mảng A, kết quả đầu ra là một mảng B gấp đôi giá trị mảng A. Với cách viết thông thường, thì trong javascript đoạn code sẽ tương tự như sau:
```javascript
const arr1 = [1, 2, 3];
const arr2 = [];
for (let i = 0; i < arr1.length; i++) {
    arr2.push(arr1[i] * 2);
};
```
Trong javascript có hỗ trợ sẵn một hàm để thực hiện việc này, đó là `map()`
> Phương thức ***map(callback)*** giúp tạo ra một mảng mới với các phần tử là kết quả từ việc ***thực thi một hàm*** lên từng phần tử của mảng được gọi.

```javascript
const arr1 = [1, 2, 3];
const arr2 = arr1.map(item => item * 2);
```
### Function Caching
Giả sử chúng ta có một hàm thuần túy trông như thế này:
```javascript
function computed(str) {    
    // Giả sử thời gian chạy đoạn code nãy sẽ mất khoảng 2000s
    console.log('2000s have passed');
      
    // Giả sử kết quả trả về sẽ là string a result
    return 'a result';
}
```
Để tăng tốc độ xử lý của hàm này, chúng ta cần lưu kết quả chạy của hàm đó(cache kết quả đó). Khi nó được gọi sau cùng, nếu tham số giống tham số trước đó, hàm sẽ không được thực thi, và kết quả lưu trong `cache` sẽ được trả về, điều này liệu có thể áp dụng không?<br/>
Thực tế, chúng ta có thể viết một hàm `cached` bao quanh `target_function` ta muốn `cached`. Hàm `cached` này sẽ nhận `target_function` làm đối số và trả về 1 function mới. Bên trong hàm `cached` này, chúng ta cần `cache` kết quả của lần chạy `target_function` trước đó dưới dạng một `Object` hoặc `Map`:
```javascript
function cached(fn){
  // Tạo một Object lưu lại kết quả trả về sau khi chạy target_function.
  const cache = Object.create(null);

  // Returns the wrapped function
  return function cachedFn (str) {

    // Nếu không có cache thì target_function sẽ được thực thi
    if ( !cache[str] ) {
        let result = fn(str);

        // Lưu kết quả đã chạy vào cache
        cache[str] = result;
    }

    return cache[str]
  }
}
```
Và đây là kết quả:
![](https://images.viblo.asia/388cb4e3-186a-45e0-bc32-8262e365385f.png)
### Lazy Function
Phần thân của một số hàm thường chứa một số câu lệnh điều kiện. Và đôi khi những câu lệnh này chỉ thực hiện một lần.<br/>
Những trường hợp như thế này thì chúng ta có thể cải thiện được hiệu suất hàm đó, đơn giản chỉ cần loại bỏ đi câu lệnh điều kiện đó, để hàm không cần thực thi các câu lệnh này trong các lần thực thi tiếp theo. Việc làm trên đã biến hàm đó thành một `lazy function`.<br>
Ví dụ, bạn cần viết một hàm `foo`, hàm này sẽ luôn trả về một object `Date` trong lần chạy đầu tiên. Lưu ý là `lần chạy đầu tiên`.
```javascript
let fooFirstExecutedDate = null;
function foo() {
    if ( fooFirstExecutedDate != null) {
      return fooFirstExecutedDate;
    } else {
      fooFirstExecutedDate = new Date()
      return fooFirstExecutedDate;
    }
}
```
Như bạn thấy đấy, mỗi khi chạy hàm `foo`, sẽ luôn luôn chạy câu lệnh điều kiện. Sẽ không ảnh hưởng gì nếu đây chỉ là một câu lệnh điệu kiện đơn giản, nhưng sẽ ra sao nếu câu `if-else` đó dựa trên kết quả của rất nhiều hàm và tốn kha khá thời gian chạy?. Trong trường hợp này, hãy sử dụng `lazy function` để tối ưu hóa đoạn mã của bạn:
```javascript
var foo = function() {
    var t = new Date();
    foo = function() {return t;};
    return foo();
};
```
Sau lần thực thi đầu tiên, thì ta ghi đè hàm gốc bằng hàm mới. Khi hàm này được thực thi trong tương lai, câu lệnh điều kiện sẽ không còn được thực hiện nữa. Điều này sẽ phần nào cải thiện hiệu suất của code ta viết.<br/>
Hãy thử với một ví dụ cụ thể hơn nha:<br>
Khi chúng ta thêm DOM events vào element, để tương thích với các trình duyệt hiện đại và trình duyệt IE, chúng tôi cần đưa ra phán đoán về môi trường trình duyệt:
```javascript
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
}
```
Mỗi khi chúng ta gọi hàm addEvent, chúng ta phải đưa ra phán đoán. Đây chính là lúc ta sử dụng `lazy function`
```javascript
function addEvent (type, el, fn) {
  if (window.addEventListener) {
      addEvent = function (type, el, fn) {
          el.addEventListener(type, fn, false);
      }
  } else if(window.attachEvent){
      addEvent = function (type, el, fn) {
          el.attachEvent('on' + type, fn);
      }
  }
  addEvent(type, el, fn)
}
```
### Function Currying
Currying là một kỹ thuật đánh giá hàm với nhiều đối số, thành một chuỗi các hàm với một đối số duy nhất.<br>
Nói cách khác, khi một hàm, thay vì nhận tất cả các đối số cùng một lúc, thì lấy đối số đầu tiên và trả về một hàm mới nhận đối số thứ hai và trả về một hàm mới nhận đối số thứ ba, v.v. cho đến khi hết tất cả các đối số.<br/>
Tại sao nên sử dụng `currying function`?<br>
- Currying giúp bạn tránh chuyển đi chuyển lại cùng một biến<br>
- Nó giúp tạo ra một`higher-order functio`. Nó cực kỳ hữu ích trong việc xử lý sự kiện(event handling)
- Các mảnh nhỏ có thể được cấu hình và sử dụng lại một cách dễ dàng.

Hãy thử xem qua một ví dụ đơn giản về hàm `add` nhận vào 3 đối số:
```javascript
function add(a,b,c){
 return a + b + c;
};
```
Hãy thử gọi hàm đó với ít hơn 3, hoặc nhiều hơn 3 tham số truyền vào xem thế nào:
```javascript
add(1,2,3) --> 6 
add(1,2) --> NaN
add(1,2,3,4) --> 6
```
Làm thế nào để chuyển đổi một function hiện có sang thành một `function currying`:
```
function curry(fn) {
    if (fn.length <= 1) return fn;
    const generator = (...args) => {
        if (fn.length === args.length) {

            return fn(...args);
        } else {
            return (...args2) => {

                return generator(...args, ...args2);
            }
        }
    }
    return generator;
}
```
![](https://images.viblo.asia/449ae6a5-2fc9-496a-bfdd-37f19d09a175.png)
### Function Compose
Giả sử bây giờ chúng ta cần viết một hàm thực hiện điều này:<br>
>>> Input ‘bitfish’, return ‘HELLO, BITFISH’.
 
 Chúng ta có thể viết mã như sau:
 ```
 let toUpperCase = function(x) { return x.toUpperCase(); };
let hello = function(x) { return 'HELLO, ' + x; };
let greet = function(x){
    return hello(toUpperCase(x));
};
 ```
 Như bạn thấy đấy, mới chỉ có 2 bước được thực hiện ở ví dụ trên(1. chuyển thành chữ hoa, 2. nối từ), nhưng nếu bài toán có nhiều yêu câu hơn thì sao, lúc đó thì hãy viết 1 hàm lồng các hàm xử lý lại với nhau kiểu như thế này `fn3(fn2(fn1(fn0(x))))`<br>
Để làm điều này, chúng ta có thể viết một hàm `compose` dành riêng cho các hàm xử lý trên:
```
let compose = function(f,g) {
    return function(x) {
        return f(g(x));
    };
};

let greet = compose(hello, toUpperCase);
greet('kevin');
```
Sử dụng các hàm `compose` để kết hợp hai hàm thành một hàm duy nhất làm cho mã chạy từ phải sang trái, thay vì từ trong ra ngoài, làm cho mã dễ đọc hơn nhiều