Năm mới tới, phiên bản ECMAScript mới đã được phát hành! Đó là một tin tốt cho những người như tôi yêu ECMAScript. Trong phiên bản ECMAScript trước đó, có nhiều tính năng thú vị và hữu ích được thêm vào. Điều gì đang chờ đợi chúng ta lần này?

## Dynamic Import

Bây giờ, bạn có thể import 1 file 1 cách dynamic

```
import { max } from '../math.js';
const nums = [1, 2, 3];
max(...nums); // 3
```

Đây là cách chúng ta có thể import một file. Và công cụ JavaScript đọc các module trong file và đưa chúng vào nơi các module đó được gọi. Nhưng bây giờ, bạn có thể làm điều này như sau.

```
const numbs = [1, 2, 3];
if (numbs.length) {
  const math = '../math';
  import(math)
    .then(module => {
      module.max(...numbs);
    })
}
```

Dynamic import sẽ trả về 1 promise. Nghĩa là bạn có thể viết nó theo kiểu async await.

```
const math = '../math.js';
const module = await import(math);
module.max(...numbs);
```

Dynamic import hiện tại support trên các trình duyệt:
- Chrome: 63
- Edge: No Support
- Firefox: 67
- IE: No Support
- Opera: 50
- Safari: 11.1

## BigInt

Tình trạng bị tràn sẽ xảy ra khi bạn cộng 2 số nguyên quá lớn.

```
Number.MAX_VALUE * 2 // Infinity
```

BigInt là một vị cứu tinh trong trường hợp này.
Bạn có thể tạo BigInt bằng cách gọi BigInt () bằng dấu ngoặc đơn hoặc 2n với ’n, ở cuối một số.

```
const num = 2;
const bigNum = BigInt(num);
bigNum; // 2n
bigNum === 2n; // true
```

Bạn có thể cộng, trừ, nhân, chia chúng mà không sợ bị overflow

```
const bigN = BigInt(10);
bigN + bigN; // 20n
bigN * 3n; // 30n
bigN - BigInt('55'); // 45n
bigN / 3n; // 3n
```

Note that bigN / 3n returns 3n , not 3.33333n . Because as you also can assume from its name, it only handles the integers. So bigN / 3n is similar to Math.floor(10 / 3) .

Lưu ý rằng bigN / 2n trả về 3n chứ không phải 3.33333n. Bởi vì như cái tên của chúng bigInt, nó chỉ có thể xử lý số nguyên. Nên bigN/3n sẽ gần tương tự với Math.floor(10 / 3)

Tuy nhiên, thật không may, bạn có thể tạo một BigInt với số float. Ngoài ra, bạn cũng không thể sử dụng BigInt và Number cùng nhau.

```
BigInt(3.3); 
// Uncaught RangeError 
BigInt('3.3');
// Uncaught SyntaxError
BigInt(1) + 1;
// Uncaught TypeError
// Cannot mix BigInt and other types
```

Thay vào đó, trường hợp được phép duy nhất để trộn các operator là khi bạn so sánh kích thước của các operator.

```
BigInt(1) < 2 // true
```

Browser support for BigInt:

- Chrome: 67
- Edge: No Support
- Firefox: 68
- IE: No Support
- Opera: 54
- Safari: No Support

## Promise.allSettled

Điều này khá giống với Promise.all, nhưng có một sự khác biệt đáng kể giữa chúng. Promise.all chờ đợi tất cả các lời hứa được thực hiện hoặc bất kỳ lời hứa nào bị từ chối. Mặt khác, Promise.allSettled không quan tâm đến điều đó. Những gì nó quan tâm là để biết nếu tất cả các lời hứa được thực hiện, bất kể trạng thái của họ là gì. Vì vậy, mọi lời hứa đầu vào có thể được thực hiện hoặc từ chối, nhưng điều đó không quan trọng đối với Promise.allSettled. Chỉ cần tất cả chúng phải được thực hiện.

```
const promises = [
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3)
];

const onResolve = (data, prefix) => {
  console.log(prefix, 'Resolved with', data);
};

const onReject = (err, prefix) => {
  console.log(prefix, 'Rejected with', err);
};

Promise.all(promises)
  .then(onResolve.bind(null, 'all'))
  .catch(onReject.bind(null, 'all'));

// Result:
// all Rejected with 2

Promise.allSettled(promises)
  .then(onResolve.bind(null, 'allSettled'))
  .catch(onReject.bind(null, 'allSettled'));

// Result:
// allSettled Resolved with
// [
//   {
//     "status": "fulfilled",
//     "value": 1
//   },
//   {
//     "status": "rejected",
//     "reason": 2
//   },
//   {
//     "status": "fulfilled",
//     "value": 3
//   }
// ]
```

Điều này có thể khá hữu ích khi bạn muốn thực hiện một số công việc trước khi thực hiện một số hành động, ví dụ, nhận tất cả dữ liệu cần thiết trước khi người dùng nhìn thấy trang danh sách. Nhưng người dùng có thể thấy các mục trống vì quá trình tìm nạp có thể không thành công.

Browser support:
- Chrome: 76
- Edge: No Support
- Firefox: 71
- IE: No Support
- Opera: Unknown
- Safari: Unknown

## globalThis

```
// worker.js
globalThis === self
// node.js
globalThis === global
// browser.js
globalThis === window
```

Browser support: 
- Chrome: 71
- Edge: No Support
- Firefox: 65
- IE: No Support
- Opera: No Support
- Safari: 12.1
- Node: 12

[Source: https://medium.com/javascript-in-plain-english/new-features-in-es2020-you-should-check-b4974d9d7edc](https://medium.com/javascript-in-plain-english/new-features-in-es2020-you-should-check-b4974d9d7edc)