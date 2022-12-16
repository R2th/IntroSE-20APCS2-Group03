Trong bài đăng này, mình sẽ show 5 thủ thuật javascript tuyệt vời, nó sẽ giúp việc coding dễ dàng hơn. Vì vậy nếu bạn quan tâm, hãy tiếp tục đọc nhé ^^ 

## 1. Loại bỏ những phần tử trùng nhau trong mảng!
- Thủ thuật này khá đơn giản. Giả sử bạn có 1 mảng chứa number, string, boolean, .. Và trong mảng này bạn muốn chắc rằng không có phần tử nào trùng nhau. Vì vậy bạn có thể tham khảo cách dưới đây
```javascript
const array = [1, 2, 3, 2, 1, true, true, false, 'Ratul', 1, 5];
const filtered__array = [...new Set(array)];
console.log(filtered__array) // [ 1, 2, 3, true, false, 'Ratul', 5 ]
```

## 2. Chuyển số thập phân thành số nguyên

```javascript
const number = 23.6565
console.log(number | 0); // 23
```

hoặc 
```javascript
const number = 23.6565
console.log(~~number); // 23
```

- Thật đơn giản và ngắn gọn phải không nào.

## 3. Lấy giá trị cuối cùng của một mảng
- Giả sử bạn có một mảng bất kỳ, và muốn lấy phần tử cuối cùng của mảng đó

```javascript
const array = [1, 2, 3, 4, 5]
const last_Item = array.slice(-1)
console.log(last_Item)
```
Bây giờ nếu bạn thay `-1`  thành `-2` thì bạn sẽ lấy được 2 giá trị cuối cùng của mảng. Như vậy  `-n` sẽ lấy `n` giá trị cuối cùng của mảng.

## 4. Lấy phần tử ngẫu nhiên trong một mảng

```javascript
const participants = ['Ratul', 'George', 'july', 'Padrik', 'G']
const winner = participants[Math.floor(Math.random() * participants.length)]
console.log(winner) // july was the winner 😊
```

## 5. Tìm từ dài nhất trong mảng
```javascript
const someArray = ['Apple', 'Pine-apple', 'Banana', 'Jack-fruit']

const mostLengthy = someArray
    .reduce((acc, i) => i.length > acc.length ? i : acc);
)
```

## Kết luận
- Cảm ơn các bạn đã đọc bài. Hi vọng với những thủ thuật trên sẽ giúp ích cho bạn trong quá trình coding. Bài viết tham khảo tại [đây](https://dev.to/ratuloss/5-useful-javascript-tricks-4kp8)