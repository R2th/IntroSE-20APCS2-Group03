***Lưu ý**: Bài viết chống chỉ định cho các dev già cỗi đã có nhiều kinh nghiệm* :slightly_smiling_face:

![](https://images.viblo.asia/39cdba59-5be1-44f9-baa4-ca7262589f85.jpg)

**Có ai đó đã từng nói "Cuộc sống này đã quá khổ rồi, chúng ta đừng làm khổ nhau thêm nữa!".**

Thật vậy, cuộc sống này vốn dĩ nó đã rất phức tạp và mệt mỏi, mà dân `Coder` như mình và các bạn nhiều lúc còn mệt mỏi hơn bởi vô số những áp lực từ khác nữa, trong đó không thể thiếu những dòng code. Vì vậy, để làm giảm bớt sự thống khổ và mệt mỏi đó, khi viết code chúng ta nên viết sao cho đơn giản nhất có thể, ai đọc code của mình cũng có thể hiểu được (hoặc là chính bản thân mình sau nhiều năm nhìn lại code của mình viết :v).

Ngôn ngữ lập trình nào chắc cũng có `if else` (mình đoán thế chứ mình cũng không biết hết các ngôn ngữ). Vậy làm sao để viết code mà đỡ `else` đi cho cuộc sống đỡ rối rắm, lằng nhằng. Mình xin mạn phép chia sẻ 1 chút ít kiến thức nhỏ nhoi về cái `if else` này, hy vọng giúp được các bạn ít nhiều :)

Nào, hãy xem thử qua 1 ví dụ đơn giản nhất có thể trước nhé. Chúng ta có đoạn code sau:

```javascript
function hello(name) {
  if (name) {
    return `Xin chào ${name}`;
  } else {
    return 'Đây là đâu, tôi là ai';
  }
}
```

Thay vào đó, chúng ta có thể viết đơn giản hơn:

```javascript
function hello(name) {
  if (name) {
    return `Xin chào ${name}`;
  } 
  return 'Đây là đâu, tôi là ai';
}
```

Vậy là đã bớt được 1 cái `else` đi rồi... Nhưng cũng có thể viết đơn giản hơn nữa với ES6 Ternary Operator (toán tử 3 ngôi):

```
function hello(name) {
  return name ? `Xin chào ${name}` : 'Đây là đâu, tôi là ai';
}
```

Cuộc sống trở nên thật đơn giản phải không các bạn :slightly_smiling_face:

Bây giờ, chúng ta xét thêm 1 ví dụ phức tạp hơn 1 tí nữa nhé, xem thử chúng ta có thể làm cho cuộc sống đơn giản đến mức nào :upside_down_face:

```javascript
function checkAge(number) {
  // Kiểm tra xem số có phải number không
  if (typeof number === 'number') {
    // Nếu số nhập vào bé hơn 18
    if (number < 18) {
      return 'Bạn chưa đủ tuổi trưởng thành, xin hãy rời khỏi trang web x....com';
    } else {
      return 'Hãy ngồi xuống và thưởng thức những bộ phim tuyệt vời thôi';
    }
  } else {
    return 'Vui lòng nhập số vào đây!';
  }
}
```

Thử bỏ bớt `else` đi xem nào...

```javascript
function checkAge(number) {
  // Kiểm tra xem số có phải number không
  if (typeof number === 'number') {
    // Nếu số nhập vào bé hơn 18
    if (number < 18) {
      return 'Bạn chưa đủ tuổi trưởng thành, xin hãy rời khỏi trang web x....com';
    }
    return 'Hãy ngồi xuống và thưởng thức những bộ phim tuyệt vời thôi';
  }
    return 'Vui lòng nhập số vào đây!';
}
```

***Tuy nhiên, chúng ta hoàn toàn có thể viết đoạn code trên trở nên clear và dễ hiểu hơn rất nhiều khi áp dụng `Guard` pattern***.
Nếu các bạn chưa biết `Guard` pattern là gì thì có thể đọc thêm ở [đây](https://learningactors.com/javascript-guard-clauses-how-you-can-refactor-conditional-logic/).

```javascript
function checkAge(number) {
  // Kiểm tra xem số có phải number không
  if (typeof number !== 'number') {
    return 'Vui lòng nhập số vào đây!';
  }
  // Nếu điều kiện 1 sai, hàm sẽ dừng thực thi ngay lập tức và ngược lại
  if (number < 18) {
    return 'Bạn chưa đủ tuổi trưởng thành, xin hãy rời khỏi trang web x....com';
  }
  return 'Hãy ngồi xuống và thưởng thức những bộ phim tuyệt vời thôi';
}
```

Thật sự đơn giản và dễ hiểu hơn nhiều đúng không nào :wink::v: 

Trên đây là 1 bài viết ngắn chia sẻ 1 số kiến thức nhỏ của mình, hy vọng sẽ giúp ích được các bạn trong công việc. Xin chào và hẹn gặp lại!