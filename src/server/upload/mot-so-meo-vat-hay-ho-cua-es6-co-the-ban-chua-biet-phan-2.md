**Xin chào các bạn, ở bài đầu tiên của series "[Một số mẹo vặt "hay ho" của ES6](https://viblo.asia/s/mot-so-meo-vat-hay-ho-cua-es6-P856j7gR5Y3)", mình đã chia sẻ 1 số tips nhỏ và đã ít nhiều nhận được sự quan tâm của mọi người. Hôm nay, mình xin tiếp tục với phần 2 của series này. Mời các bạn cùng theo dõi nhé!**

![](https://images.viblo.asia/b50e28f1-b8c7-40d5-a0bc-e2e8c64f0eed.png)

### 1. Kiểm tra 1 biến có giá trị NaN

Javscript có một điều thật kỳ lạ, NaN là giá trị duy nhất KHÔNG BAO GIỜ bằng chính nó. Vậy làm thế nào để chúng ta kiểm tra tính đúng sai của nó?

```javascript
const value = NaN;

value === NaN;
// false
```

Đừng lo, ES6 đã giới thiệu một phương pháp mới giải quyết vấn đề này là `Object.is`.  Hãy xem nó hoạt động như thế nào!

```javascript
const divide = 5 / "two"; //NaN

divide === NaN;

Object.is(divide, NaN); // true
```

### 2. Tính toán với kiểu dữ liệu string

Nếu giả sử bạn nhận được dữ liệu trả về bao gồm cả số và chuỗi, nhưng vì 1 lý do nào đó mà bạn...lười không muốn mất công convert string qua number rồi mới thực hiện việc tính toán, vậy thì áp dụng ngay "mẹo" dưới đây xem sao ;)

```javascript
const string = '100';
const number = 5;

// Nếu thực hiện tính tổng thông thường
console.log(string + number); // 1005

// Hack 1 chút với phương thức +string
console.log(+string + number); // 105
```

### 3. Kiểm tra sự tồn tại của subString trong String

Ở ES5, để kiểm tra sự tồn tại của string trong string, hoặc item trong array, chúng ta thường dùng cú pháp `indexOf`.

Nhưng từ phiên bản ES6, bạn có thể sử dụng phương thức `includes()` để kiểm tra xem một chuỗi có chứa một chuỗi con hay không. Nó sẽ xác định xem chuỗi đó có tồn tại trong một chuỗi khác hay không, kết quả trả về sẽ là `true` hoặc `false`.

```javascript
const company = 'sun asterisk';

// ES5
company.indexOf('sun') !== -1; // true

// ES6
company.includes('sun'); // true
```

hoặc

```javascript
const company = ['sun', 'asterisk', 'framgia'];

company.includes('sun'); // true
```

### 4. Remove Duplicates Array

Ở phần trước, mình đã giới thiệu qua 1 phương thức để loại bỏ các phần tử trùng lặp trong 1 mảng, đó là dùng cú pháp `...`. Ngoài ra, còn có thêm 1 phương thức nữa của ES6 để làm việc này.

```javascript
const arrray = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];

const removeDuplicate = Array.from(new Set(arrray));

console.log(removeDuplicate);
// [1,2,3,4]
```

--------------------------------------

Trên đây là 1 số tips nhỏ nữa trong series "[Một số mẹo vặt "hay ho" của ES6](https://viblo.asia/s/mot-so-meo-vat-hay-ho-cua-es6-P856j7gR5Y3)" của mình. Hy vọng là sẽ giúp ích được các bạn trong công việc và học tập.

Mình xin kết thúc phần 2 tại đây. Xin chào và hẹn gặp lại!