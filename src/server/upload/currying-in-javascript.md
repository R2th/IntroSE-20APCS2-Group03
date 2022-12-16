![](https://images.viblo.asia/2119b9f7-7d7e-4814-8331-7e71e75ada4c.jpg)

## Là cái gì?

**Currying** là một kỹ thuật nâng cao khi làm việc với `function`. Nó không chỉ được sử dụng trong `JavaScript` mà còn được sử dụng trong nhiều ngôn ngữ lập trình khác.

Nói đơn giản, **Currying** là một phép biến đổi với mục đích chuyển một hàm từ dạng có thể gọi bằng `f (a, b, c)` sang có thể gọi bằng `f (a) (b) (c)`.

**Currying** không thực hiện gọi một hàm. Nó chỉ biến đổi chính hàm đó.

Cùng xem xét ví dụ dưới đây:

Tạo một *helper* function `curry(f)` thực hiện xử lý currying cho một hàm `f` có hai đối số. Nói cách khác, `curry (f)` cho hai đối số `f (a, b)` chuyển nó thành một hàm chạy dưới dạng `f (a) (b)`:

```javascript
function curry(f) {
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

console.log(curriedSum(1)(2));
// 3
```

Như bạn có thể thấy, việc triển khai rất đơn giản: nó chỉ là hai trình bọc (***wrapper***).

Kết quả của `curry (func)` là wrapper `function (a)`.
Khi gọi `curriedSum (1)`, đối số được lưu trong `Lexical Environment` và một wrapper mới sẽ được trả về `function (b)`.
Sau đó, wrapper này tiếp tục được gọi với `2` là đối số và truyền nó tới lời gọi hàm `sum` ban đầu.

Các cách triển khai nâng cao hơn của currying, như `_.curry` từ thư viện `Lodash`, sẽ trả về một wrapper cho phép một hàm có thể gọi được bằng cả cách thông thường và cách gọi một phần (partial):

```javascript
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum);
// normal
console.log(curriedSum(1, 2));
// partial
console.log curriedSum(1)(2));
```

## Dùng làm chi?

Xem một ví dụ thực tế để có thể hiểu rõ hơn về những lợi ích mà currying có thể mang lại.

Chúng ta có một hàm ghi log `log(date, importance, message)` để định dạng và truy xuất thông tin. Trong các dự án thực tế, các hàm như vậy có rất nhiều chức năng hữu ích như gửi logs, ... ở đây chúng tôi sẽ chỉ báo `alert`:

```javascript
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Currying nó!

```javascript
log = _.curry(log);
```

`log` gọi như thường:

```javascript
log(new Date(), "DEBUG", "debugging"); 
```

... Cũng hoạt động khi được gọi:

```javascript
log(new Date())("DEBUG")("debugging");
```

Bây giờ chúng ta có thể dễ dàng tạo một hàm thuận tiện cho việc tạo các logs hiện tại:

```javascript
// logNow is log with fixed first argument
let logNow = log(new Date());

logNow("INFO", "message"); 
// [HH:mm] INFO message
```

`logNow` ở trên có thể được gọi là `partially applied function` hay ngắn gọn là `partial`.<br>
`Partial application`  là quá trình giảm số lượng tham số của một hàm bằng cách tạo một hàm mới với một số tham số được truyền vào.

Từ đó, chúng ta hoàn toàn có thể phát triển tiếp:

```javascript
let debugNow = logNow("DEBUG");
debugNow("message"); 
// [HH:mm] DEBUG message
```

Vì thế:

* Chúng ta không mất gì sau khi currying: `log` vẫn có thể gọi được như bình thường.
* Có thể dễ dàng tạo các `partial function` như `logNow`,  `debugNow`.


## Triển khai ở mức nâng cao

Trong trường hợp bạn tổng quát hơn, đây là cách triển khai currying `nâng cao` cho các function đa đối số mà chúng ta có thể sử dụng ở trên.

Ngắn gọn,

```javascript
const curry = func => {
  return function nextCurry(...args) {
    if (args.length < func.length) {
      return (...nextArgs) => nextCurry(...args, ...nextArgs);
    }    
    return func(...args);
  }
}

```

Tương đương với

```javascript
function curry(func) {
  return function nextCurry(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...nextArgs) {
        return nextCurry.apply(this, args.concat(nextArgs));
      }
    }
  };

}
```

Ví dụ,
```javascript
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6, normally
console.log(curriedSum(1)(2,3)); // 6, currying of first arg
console.log(curriedSum(1)(2)(3)); // 6, currying all
```

`curry` nhìn có vẻ khá phức tạp nhưng thực ra rất dễ hiểu.

Kết quả của lời gọi hàm `curry(func)` là một wrapper `curried` như thế này:

```javascript
function nextCurry(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...nextArgs) { // (2)
      return nextCurry.apply(this, args.concat(nextArgs));
    }
  }
};
```

Khi chạy, có hai nhánh thực thi:

1. Nếu số lượng args được truyền vào lớn hơn hoặc bằng so với số lượng được định nghĩa trong function ban đầu (`func.length`), thì chỉ cần truyền lệnh gọi nó bằng `func.apply`.
2. Nếu không, lấy partial: chưa thực hiện gọi `func`. Thay vào đó, một wrapper khác được trả về, re-apply `nextCurry` các đối số trước đó cùng với các đối số mới.

Sau đó, nếu chúng ta gọi nó, một lần nữa chúng ta sẽ nhận được một partial mới (nếu không đủ đối số) hoặc kết quả cuối cùng.

Việc triển khai này hoạt động khá tốt, ngay cả khi truyền một vài (hoặc tất cả) đối số cùng một lúc. Nhưng nó có một số vấn đề nghiêm trọng. 

### ! Chỉ dùng cho các hàm có độ dài cố định
Currying yêu cầu hàm phải có một số lượng đối số cố định .
- Không thể currying một function sử dụng dạng các tham số còn lại (`rest parameters`) hay tham số mặc định, như `f (... args)`. Nói cách khác, nó chỉ hoạt động khi độ dài đối số có thể được xác định dễ dàng. 
- Chúng tôi có thể giải quyết vấn đề đó bằng cách sử dụng `Ramda’s curryN` lấy độ dài rõ ràng làm tham số đầu tiên. Nó cũng sẽ fail khi sử dụng các tham số mặc định và truyền một vài đối số cùng một lúc (không giống như việc triển khai `Ramda`, nó sẽ hoạt động).

### ! Nâng cao hơn
Theo định nghĩa, currying sẽ chuyển `sum (a, b, c)` thành `sum (a) (b) (c)`.<br>
Nhưng hầu hết các cách triển khai currying trong JavaScript đều là nâng cao, như được mô tả: chúng cũng giữ cho hàm có thể gọi được trong biến thể đa đối số.

## Currying vs Partial

- **Currying** thường phổ biến hơn so với `partial application` trong `function programming`. Việc chuyển đổi một hàm thành một chuỗi hàm làm cho hàm ban đầu trở nên linh hoạt hơn, vì vậy chúng ta có thể áp dụng bất kỳ số lượng đối số nào mà chúng ta muốn tại một thời điểm nhất định.
- Nó cũng có thể giúp chúng ta tiết kiệm số lần gõ phím :v, chẳng hạn như áp dụng tất cả các đối số cho một hàm tại một thời điểm với partial application sẽ yêu cầu gọi từng partial. 
- Hơn nữa, currying sẽ trở nên vô cùng hữu ích khi chúng ta bắt đầu sử dụng composition.
- Mặt khác, `partial` (hay `partialRight` trong các ví dụ trên) có thể cực kỳ hữu ích khi chúng ta muốn áp dụng một số tham số từ phía bên phải. Về mặt lý thuyết, chúng ta có thể thử một số "trò" currying, kết hợp nó với một thứ gì đó như `reverseArgs`, nhưng điều đó có thể gây rắc rối và không thực sự đáng để "nghịch".

## Tổng kết
**Currying** là một phép biến đổi làm cho `f (a, b, c)` có thể gọi qua `f (a) (b) (c)`. Việc triển khai JavaScript thường giữ cho hàm có thể gọi được bằng cả cách thông thường và cách trả về một partial nếu số lượng đối số không đủ.

**Currying** ngày càng trở nên phổ biến trong cộng đồng. Nó đang được sử dụng rộng rãi trong một số thư viện phổ biến. Nếu bạn đã từng sử dụng `Redux` với `React` (hoặc cụ thể là `package react-redux`), thì bạn đã sử dụng ***currying*** mà có thể không hề hay biết:

```javascript
export default connect(mapStateToProps)(MyComponent);
```

# 
[Currying](https://javascript.info/currying-partials)