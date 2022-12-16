Phần trước của bài viết [5 sai lầm phổ biến khi code JavaScript mà bạn ít khi để ý](https://viblo.asia/p/5-sai-lam-pho-bien-khi-code-javascript-ma-ban-it-khi-de-y-ByEZkoWWZQ0) đã nhận được nhiều phản hồi tích cực, nên mình tiếp tục làm phần hai đây. Chả là dạo này code JavaScript hơi nhiều, nên cũng nhận ra thêm vài điểm "củ chuối" của nó, nên viết thành bài luôn.

Và đó là những sai lầm thường gặp nào, cách giải quyết ra sao, hãy cùng tìm hiểu qua bài viết này nhé.

## 1. Numberic sort

Nếu bạn theo dõi mình đã lâu, thì có thể nhận ra là mình thích dùng dãy số 2, 3, 5, 7 trong khi code demo. Đây là dãy các số nguyên tố (prime) nhỏ hơn 10, khá đơn giản và ngắn gọn. Ví dụ như đoạn code sau dùng sắp xếp dãy đó.

```js
const primes = [7, 5, 3, 2]
console.log(primes.sort())  // [2, 3, 5, 7]
```

Mọi chuyện trông vẫn rất bình thường, cho tới khi mình thêm số 11 vào dãy trên.

```js
const primes = [2, 11, 7, 5, 3]
console.log(primes.sort())  // [11, 2, 3, 5]
```

Hình như có gì đó sai sai rồi thì phải :D

> Phương thức `sort()` của JavaScript mặc định là so sánh chuỗi theo thứ tự ABC.
> 
> Do đó nếu sắp xếp một dãy số thì kết quả cho ra sẽ không đúng.

Để khắc phục điều này, bạn chỉ cần chỉ định thêm một lambda function vào trong `sort()`. Function này sẽ được `sort()` sử dụng để thực hiện so sánh các phần tử khi sắp xếp. Do đó, kết quả cho ra sẽ luôn đúng.

```js
console.log(primes.sort((a, b) => a - b))  // [2, 3, 5, 7, 11]
```

## 2. Nhầm lẫn giữa `isNaN()` và `Number.isNaN()`

Trong trường hợp cần so sánh liên quan tới số `NaN`, thì không được dùng dấu `==` hay `===` mà phải dùng hai phương thức này.

Vài tháng trước mình còn chả biết rằng method `isNaN()` còn có người anh em song sinh là `Number.isNaN()`. Mà hình như hai đứa này cùng cha khác mẹ sao ấy :joy: nên cách làm việc cũng khác nhau. Nếu bạn chưa hiểu rõ về chúng, rất có thể sẽ bị dùng sai, dẫn tới kết quả không như ý.

![](https://images.viblo.asia/6dd22fd6-b6ab-470a-8117-bee3bdc0a37e.png)

Và đây là sự khác nhau cơ bản giữa chúng:

* `isNaN()` trả về true nếu input không phải số, hoặc không ép kiểu thành số được, hoặc input đưa vào là `NaN`
* `Number.isNaN()` chỉ trả về true nếu giá trị là `NaN`

Mình có một số ví dụ sau, sẽ giúp các bạn dễ hiểu hơn.

```js
console.log(isNaN(NaN))  // true
console.log(isNaN(5 / 0))  // false, vì 5 / 0 ra Infinity
console.log(isNaN(null))  // false, vì null ép thành số 0, không phải NaN
console.log(isNaN(undefined))  // true
console.log(isNaN(10))  // false, vì đây là số, không phải NaN
console.log(isNaN(5.5))  // false, vì đây là số
console.log(isNaN('5.5'))  // false, vì đây là string nhưng có thể ép kiểu thành số

console.log(Number.isNaN(NaN))  // true, chỉ có mỗi NaN là đúng
console.log(Number.isNaN(5 / 0))  // false
console.log(Number.isNaN(null))  // false
console.log(Number.isNaN(undefined))  // false
console.log(Number.isNaN(10))  // false
console.log(Number.isNaN(5.5))  // false
console.log(Number.isNaN('5.5'))  // false
```

Do đó, tùy vào từng trường hợp cụ thể mà sử dụng hai methods trên cho phù hợp.

## 3.  Đặt tên function trùng nhau

Hầu hết các ngôn ngữ khác đều có tính năng gọi là **function/method overloading**, nghĩa là các function cùng tên nhưng khác tham số. Khi gọi function thì tùy vào số lượng, kiểu dữ liệu, thứ tự của đối số mà lựa chọn function nào sẽ được gọi.

> Tuy nhiên, JavaScript lại không cho phép function overloading.

Thật đấy, không đùa đâu. Nguyên nhân có thể do function của JavaScript có thể nhận vào số lượng đối số tùy ý (nếu thiếu thì sẽ mang giá trị `undefined`). Có lẽ vì thế nên không thể thực hiện overload được (còn cái hình để cho vui thôi :)).

![](https://images.viblo.asia/7a5efd6c-1624-4478-9626-ddd8dae6fceb.gif)

Và cái sự dở hơi của JavaScript ở việc code khai báo các function trùng tên vẫn chạy bình thường, không báo lỗi gì cả. Cơ mà function khai báo sau sẽ đè lên function trước, nên rất dễ cho ra kết quả không như ý muốn. Ví dụ như sau, bạn có thể chạy thử ngay trên trình duyệt luôn.

```js
// Hàm này không bao giờ được gọi, do đã bị ghi đè
function sum(a, b) {
    return a + b;
}

// Luôn gọi hàm này, do khai báo sau nên đè lên khai báo trước
function sum(a, b, c) {
    return a + b + c;
}

console.log(sum(1, 2));  // Gọi sum(1, 2, undefined) = NaN (thật đấy)
console.log(sum(1, 2, 3));  // Gọi sum(1, 2, 3) = 6
```

Có một cách khắc phục là dùng tham số dạng array, rồi function xét số lượng tham số và xử lý phù hợp. Tuy nhiên mình không khuyến khích cách này, vì function phải làm nhiều hơn một việc, khiến code khó bảo trì.

Thế nên, cách tốt nhất là tránh đặt các function cùng tên là được.

## 4. Dùng `splice()` sai cách

Rất nhiều method trong JavaScript là dạng bất biến (immutable), nghĩa là nó chỉ return về kết quả mới, chứ không sửa đổi trên đối tượng gốc. Chi tiết hơn về tính bất biến và lợi ích của nó các bạn có thể tham khảo thêm google nhé.

Lấy ví dụ như method `toUpperCase()`, nó trả về chuỗi được in hoa.

```js
const name = "John";
console.log(name.toUpperCase());  // JOHN
console.log(name);  // "John" - bản gốc không bị ảnh hưởng
```

Tuy nhiên, hầu hết nhưng không phải tất cả. Ngoại lệ trong trường hợp này là phương thức củ chuối `splice()`.

> Splice là method dùng để thực hiện hai hành động cùng lúc: xóa X phần tử và chèn thêm Y phần tử vào vị trí đó.

![](https://images.viblo.asia/631eab26-f4ae-411d-b705-6af038058c98.jpg)

Như ví dụ ở trên hình, có mảng là A, B, C, D. Và khi chạy `arr.splice(1, 1, T, Z)` thì nó sẽ xóa từ vị trí index 1, xóa 1 kí tự, chèn thêm T và Z vào đó.

Hm có vẻ hơi dài dòng rồi. Quay lại điểm chính của phần này, chính là `splice()` nó sửa đổi chính mảng gốc, và trả về mảng các phần tử đã xóa. Do đó, đoạn code sau sẽ cho kết quả sai.

```js
const arr = [2, 3, 5, 7];
arr = arr.splice(0, 2);
    // Kết quả mong muốn là arr = [5, 7], nhưng thực tế là [2, 3]
```

Phải dùng như thế này mới đúng.

```js
arr.splice(0, 2);
    // arr = [5, 7] ngay
```

## 5. Không biết dùng `reduce()`

Phải nói là so với các array methods khác như `map()`, `filter()`,... thì `reduce()` hơi bị khoai và khó nuốt. Mình cũng vậy, lúc mới học còn chả hiểu `reduce()` nó làm cái gì. Thế nên nhiều khi mình viết code như vầy để tính tổng mảng.

```js
const arr = [2, 3, 5, 7];

// Cách cũ
let sum1 = 0;
for (const e of arr)
    sum1 += e;

// Cách mới nhưng không dùng reduce
let sum2 = 0;
arr.forEach(e => sum += e);
```

Cách đầu có thể coi là tàm tạm đi, hơi dài dòng tí nhưng cũng ổn với kiểu lập trình mệnh lệnh (imperative). Tuy nhiên cách 2 thì không ổn tí nào, do các array method khuyến khích viết theo kiểu functional, nghĩa là phải stateless (không trạng thái). Mình dùng `forEach()` với biến `sum2` bên ngoài là đã thành stateful rồi.

![](https://images.viblo.asia/1fa17bed-1690-452e-87d9-efe4a3d44c8e.png)

Code trên được khắc phục lại với `reduce()` như sau.

```js
let sum3 = arr.reduce((prev, curr) => prev + curr);
```

Hồi mình mới học cũng không hiểu reduction là gì, phải xem code chục lần hơn mới hiểu. Có thể do những bài mình đọc trước đây không nói kĩ về nó. Thế nên mình ghi lại cách hiểu của mình về `reduce()` tại đây luôn.

> Reduce dùng để **giảm** một mảng xuống một giá trị duy nhất. Gồm hai phần:
> * Phần đã tổng hợp từ trước (prev)
> * Giá trị hiện tại được xét (curr)

Ví dụ như trên, khi tính tổng dãy số. Ban đầu `prev = 0`, sau đó duyệt từng phần tử. Với mỗi phần tử thì trả về là `prev + curr`, sau đó tới phần tử tiếp theo, cho tới hết mảng.

Từ một dãy ban đầu, reduce dần dần trở thành một giá trị duy nhất `prev`. Trong trường hợp này `prev` chính là tổng của mảng đó.

Ngoài ra mình chia sẻ luôn một cái mình thấy khá hay. Là JavaScript tự động đặt giá trị ban đầu cho `prev` ở reduce. Ví dụ tính tổng thì ban đầu `prev = 0`, nhưng tính tích thì `prev = 1`. JavaScript tự động làm việc đó, lập trình viên chúng mình không cần làm gì cả.

---

Okay bài viết đến đây là hết rồi. Rất cảm ơn các bạn đã ủng hộ các bài viết dịp vừa qua, mình rất vui vì điều đó. Trong tương lai mình sẽ cố gắng ra thêm nhiều bài chất lượng hơn nữa nhé, nhớ ủng hộ mình bằng các vote cùng clip nhé. Mãi yêu :heart: