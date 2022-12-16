Một trong những đặc điểm tốt nhất của JavaScript là ngôn ngữ lập trình hàm mở ra đường dẫn đến một số mẫu lập trình thú vị nhất. Một trong số đó là Currying.
## Currying
Currying là việc phân tách một hàm nhận nhiều đối số thành nhiều hàm chỉ nhận một đối số duy nhất.

Định nghĩa này đúng với currying nguyên thủy. Trong bài viết này, tôi sẽ đưa ra một số mô hình nâng cao hơn với currying.

Hãy để tôi giải thích thêm thông qua một số ví dụ cụ thể. Giả sử bạn có một hàm như sau:
```
const multiply = ( a, b ) => a * b;
```
Bây giờ, cách bạn gọi hàm sẽ như sau:
```
multiply(2, 3)
```
Nhưng với currying, nó sẽ được chia thành nhiều hàm dựa trên số lượng đối số:
```
const mul = curry(multiply);
mul(2)(3);
```
Sau khi đọc bài viết này, bạn sẽ có thể:
* Hiểu được currying là gì.
* Xây dựng được một hàm để chuyển đổi một hàm thành phiên bản currying của nó như ở trên `mul(2)(3)(4)`.
* Hiểu về Variadic Currying. Ví dụ: `mul(2,3)(4)` hay `mul(2)(3,4)`.
* Xây dựng một hàm Infinite Currying (currying một hàm mà không biêts số lượng đối số của nó). Ví dụ: `mul(2)(3)(4)....(8)()`
* Kết hợp mẫu thiết kế Variadic Currying trong Infinite Currying. Ví dụ: `mul(2)(3,4,5)(6)(7,8)()`
## Cài đặt Currying
Xem xét một ví dụ xây dựng một hàm currying cụ thể cho hàm nhân có 3 đối số:
```
const mul = (x) => {
    return (y) => {
        return (z) => {
            return x * y * z;
        };
    };
};
```
Đây là 3 hàm được trả về đồng thời từ bên trong hàm cha. Hai hàm đầu tiên với tham số `x` và `y` đóng vai trò là các hàm tích lũy và lưu trữ nó trong chuỗi phạm vi của các hàm bên trong.

Điều đó có nghĩa là gì? Hàm thứ 2 có đối số `y` có thể truy cập vào biến `x` từ hàm cha mẹ của nó. Tương tự, hàm thứ 3 có đối số `z` có thể truy cập vào biến `x` và `y`.

## Xây dựng một hàm curry utility
Xem xét hàm sau với 3 đối số:
```
const mul = ( a, b, c ) => a * b * c;
```
Mục đích của chúng ta là tạo ra một hàm bao bọc và coi hàm `mul` như một tham số và trả về phiên bản currying của nó để có thể gọi được dưới dạng `_mul(1)(2)(3)`. 
```
_mul = curry(mul);
```
Điều chúng ta cần xác định là số lượng đối số và xây dựng một tập hợp các hàm đệ quy với cùng số lần.

Trong JS, số lượng đối số của một hàm có thể xác định bằng cách sử dụng thuộc tính `length` của hàm đó:
```
N = mul.length; //3
```
Bây giờ ta đã có số lượng đối số của hàm. Chúng ta có thể tạo thành một logic để trả về đệ quy các hàm bên trong N lần.
```
const _sum3 = (x, y, z) => x + y + z;

const _sum4 = (p, q, r, s) => p + q + r + s;

function curry(fn) {
  const N = fn.length;
  function innerFn(n, args) {
    return function actualInnerFn(a) {
      if(n <= 1) {
        return fn(...args, a);
      }
     return innerFn(n - 1, [...args, a]);
    }
  }
  return innerFn(N, [])
}

const sum3 = curry(_sum3);
const sum4 = curry(_sum4);

console.log(sum3(1)(3)(2)); // 6
console.log(sum4(1)(3)(2)(4)); // 10
```
Đầu tiên, ta tạo ra 2 hàm mà ta muốn đó là `_sum3` với 3 tham số và `_sum4` với 4 tham số.

TIếp theo trong hàm curry, ta lấy một hàm `fn` làm đầu vào để được curry. Ta tìm số lượng tham số của hàm fn bằng `fn.length` và lưu vào biến N.

Và bây giờ là việc chính, ta muốn trả về một hàm N lần: `_sum(1,2,3,...,N) => sum(1)(2)(3)...(N)`

Do đó ta tạo một hàm `innerFn` theo dõi biến N và dựa theo đó xác định xem có tiếp tục trả về hàm khác hay kết thúc qúa trình bằng cách gọi hàm thực tế với tất cả các đối số tích lũy. 

Để dễ hiểu hơn hãy xem xét ví dụ. Đầu tiên, với sum3, N=3 chúng ta thực thi và trả về kết quả của `innerFn` là `actualInnerFn`, một hàm nhận một tham số duy nhất. Trong thân hàm, nó kiểm tra có lặp lại toàn bộ quá trình hay kết thúc.

Khi nó thực thi với `n=3`, chúng ta kiểm tra xem nó có phải là đối số cuối cùng được gọi hay không. Nhưng không phải, chúng ta cần thêm hai lần lặp để trả về `actualInnerFn` hai lần. 

Điều tương tự được lặp với `n = 2`.

Trường hợp cuối cùng khi `n =1` chỉ ra nó là hàm cuối cùng được trả về. Do đó bên trong thân hàm, ta viết trường hợp kết thúc bằng cách xác định điều kiện và thực thi hàm ban đầu với các đối số được tích lũy cho đến nay trong biến args và đối số cuối cùng được truyền vào dưới dạng `fn(...args, a)`.
## Variadic Currying
Tiến thêm một bước nữa, hãy cố gắng để đạt được một điều như gọi `sum(2,3)(4)` hay `sum(2)(3,4)` và vẫn nhận được kết quả tương tự. Nó được gọi là Variadic Currying.

Điều này cho phép `actualInnerFn` có một số lượng đối số thay vì một đối số duy nhất. 
```
return function actualInnerFn(...a) {
      if(n <= a.length) {
        return fn(...args, ...a);
      }
     return innerFn(n - a.length, [...args, ...a]);
    }
  }
```
Thêm vào đó, để `actualInnerFn` nhận một số lượng đối số, chúng ta cần thay đổi logic trường hợp kết thúc.
```
const curry = fn => {
  const innerFn = (N, args) => {
    return (...x) => {
      if (N <= x.length) {
        return fn(...args, ...x);
      }
      return innerFn(N - x.length, [...args, ...x]);
    };
  };

  return innerFn(fn.length, []);
};


const sum3 = curry(_sum3);

sum3(2, 3)(4) //9
sum3(2)(3, 4) //9
```
Thật tuyệt, ta đã có thể cài đặt số lượng đối số thay đổi. Nhưng chúng ta có thể làm tốt hơn không?
## Infinite Currying
Vấn đề mà ta thấy với những gì đã đạt được là ta cần định nghĩa một hàm mỗi khi ta cần nó với một số lượng đối số khác nhau. Tức là với 3 đối số ta cần định nghĩa hàm sum3, với 4 đối số ta cần định nghĩa hàm sum4.

Ý tưởng là ta cần thực hiện hàm với 2 đối số, sau đó áp dụng nó cho N đối số. Bây giờ, ta có 1 vấn đề với điều này, đó là ta cần dùng N để xử lý trường hợp kết thúc, nếu không code sẽ tiếp tục trả về `innerFn` và dẫn đến tràn ngăn xếp.

Có thể có một số cách, tất cả chúng ta cần là một cách nào đó báo hiệu cho hàm `actualInnerFn` biết ta muốn dừng và lấy về kết quả. Ta có thể gửi một tham số báo hiệu như `sum(2)(3)(4)('STOP')` và ta có thể kiểm tra bên trong `actualInnerFn` ví dụ như `if(a === 'STOP')`.
```
const infiniteCurry = fn => {
  const next = (...args) => {
    return x => {
      if (!x) {
        return args.reduce((acc, a) => {
          return fn.call(fn, acc, a)
        }, 0);
      }
      return next(...args, x);
    };
  };
  return next();
};

const iSum = infiniteCurry((x, y) => x + y);
console.log(iSum(1)(3)(4)(2)());
```
Có một số thay đổi cần giải thích ở đây:
* Ta không cần truyền vào số lượng đối số N vì ở đây ta không có nó.
* Ta cần tích lũy các đối số theo cùng một cách như trước đó trong biến args.
* Trường hợp kết thúc bên trong `factInnerFn` kiểm tra xem có bất kỳ đối số nào được truyền cho nó không. Nếu không, nó xử lý tất cả các đối số tích lũy.
* Do không có một hàm nào được chuẩn bị cho trường hợp không xác định, ta không thể gửi các đối số cùng một lúc cho một hàm như ta thực hiện trong trường hợp sum3 hay sum4.
* Với kịch bản này, phương thức rút gọn của mảng JS có thể rất hữu ích ở đây, vì ta cần lặp lại tất cả giá trị tích lũy và gọi thao tác trên chúng lặp đi lặp lại trong khi lưu trữ chúng trong một biến tích lũy.
```
args.reduce((accumulator, a) => {
    return fn(accumulator, a)
}, 0);
```
* Ta cần truyền vào một giá trị hạt giống để bắt đầu. Ví dụ trong trường hợp phép cộng, ta truyền vào `0`, với phép nhân là `1` và với trường hợp nối chuỗi là một string rỗng `''`.
* Ta sẽ cố gắng trừu tượng giá trị hạt giống này từ việc cài đặt trong phần tiếp theo.
## Infinite Variadic Currying
```
const infiniteCurry = (fn, seed) => {
  const reduceValue = (args, seedValue) =>
    args.reduce((acc, a) => {
      return fn.call(fn, acc, a);
    }, seedValue);
  const next = (...args) => {
    return (...x) => {
      if (!x.length) {
        return reduceValue(args, seed);
      }
      return next(...args, reduceValue(x, seed));
    };
  };
  return next();
};

const iSum = infiniteCurry((x, y) => x + y, 0);
const iMul = infiniteCurry((x, y) => x * y, 1);
console.log(iSum(1)(3, 4)(5, 6)(7, 8, 9)()); // 43
console.log(iMul(1)(3, 4)(5, 6)()); // 360
```
## Kết luận
Chúng ta đã học về một mẫu thiết kế lập trình hàm thú vị và làm thế nào để cài đặt nó. Rất mong bài viết sẽ hữu ích với bạn.
## Tham khảo
[https://medium.com/@paramsingh_66174/perpetual-currying-in-javascript-5ae1c749adc5](https://medium.com/@paramsingh_66174/perpetual-currying-in-javascript-5ae1c749adc5)