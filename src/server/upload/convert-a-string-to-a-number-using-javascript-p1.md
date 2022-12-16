Trong công việc hàng ngày chắc hẳn bạn đã từng convert kiểu dữ liệu từ String sang Number. Đã bao giờ bạn tự hỏi có bao nhiêu cách chưa ? JavaScript cung cấp nhiều cách khác nhau để convert String sang Number. Và trong bài viết này, mình sẽ tổng hợp lại một số cách "khá hay".

## Cách 1: Number() function

Giả sử mình có 1 biến text 

```
const textNumber = '7777'
const x = new Number(textNumber);
console.log(x); // => Number {7777}
```

ví dụ khác:

```
const x = Number('7777,7777');
console.log(x); // => NaN

const y = Number('7777.7777');
console.log(y); // => 7777.7777
```

## Cách 2: Toán tử+

```
const x = +'777,00';
console.log(x); // => NaN

const y = +'777.12';
console.log(y); // => 1000.12

const z = +'777.120';
console.log(z); // => 777.12
```

## Cách 3: Sử dụng toán tử *

```
const x = '700,00' * 1;
console.log(x); // => NaN

const y = '700.12' * 1;
console.log(y); // => 700.12

const z = '700.120' * 1;
console.log(z); // => 700.12

const t = '700' * 1;
console.log(t); // => 1000
```

## Cách 4: Sử dụng toán tử /
Ví dụ:

```
const x = '700,12' / 1;
console.log(x); // => NaN

const y = '700.12' / 1;
console.log(y); // => 700.12

const z = '700.120' / 1;
console.log(z); // => 700.12

const t = '700' / 1;
console.log(t); // => 700
```

## Lời Kết

Khá là thú vị phải không các bạn trong phần sau mình sẽ giới thiệu các cách còn lại cũng như đưa ra nhận xét về phưuong pháp tối ưu nhất
cám ơn các bạn đã theo dõi :D