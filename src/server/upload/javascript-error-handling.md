Xử lý lỗi là một phần quan trọng của chương trình. Có nhiều tình huống mà các chương trình của chúng ta gặp phải các giá trị bất ngờ và chúng ta phải xử lý chúng đúng cách.

Trong bài viết này, chúng ta sẽ xem xét cách xử lý chúng để các lỗi được tìm thấy dễ dàng và xử lý một cách duyên dáng.

## Exceptions are Better than Return Codes

Ném ra ngoại lệ là tốt hơn bởi vì họ cho chúng ta biết rằng có lỗi tồn tại và chúng ta phải xử lý nó.

Hầu hết các ngôn ngữ lập trình hiện đại đều có ngoại lệ tích hợp sẵn, vì vậy chúng ta nên ném chúng ra thay vì trả lại mã lỗi.

Mã lỗi là không rõ ràng và có thể bị bỏ sót. Các ngoại lệ cũng sạch hơn rất nhiều vì chúng ta không phải kiểm tra tất cả các mã có thể được trả lại.

Ví dụ: nếu chúng ta trả về mã lỗi trong các chức năng của mình thì chúng ta có thể có mã trông giống như thế này:

```
const LESS_THAN_ZERO = 'LESS_THAN_ZERO';
const TOO_MANY = 'TOO_MANY';
const NOT_A_NUMBER = 'NOT_A_NUMBER';
class FruitStand {
  setNumFruit(numFruits) {
    if (typeof numFruits !== 'number') {
      return NOT_A_NUMBER;
    }
    if (numFruits < 0) {
      return LESS_THAN_ZERO;
    }
    if (numFruits > 100) {
      return TOO_MANY;
    }
    this.numFruits = numFruits;
  }
}
const fruitStand = new FruitStand();
const error = fruitStand.setNumFruit(1);
if (error !== LESS_THAN_ZERO && error !== TOO_MANY && error !== NOT_A_NUMBER) {
  console.log(fruitStand.numFruits);
}
```

Chúng ta phải trả lại tất cả các mã lỗi trong phương thức setNumFbean. Ngoài ra, trước khi chúng ta làm gì đó sau định nghĩa lớp, chúng ta phải kiểm tra tất cả các mã lỗi.

Thay vào đó, chúng ta có thể ném ngoại lệ:

```
const LESS_THAN_ZERO = 'LESS_THAN_ZERO';
const TOO_MANY = 'TOO_MANY';
const NOT_A_NUMBER = 'NOT_A_NUMBER';
class FruitStand {
  setNumFruit(numFruits) {
    if (typeof numFruits !== 'number') {
      throw new Error(NOT_A_NUMBER);
    }
    if (numFruits < 0) {
      throw new Error(LESS_THAN_ZERO);
    }
    if (numFruits > 100) {
      throw new Error(TOO_MANY);
    }
    this.numFruits = numFruits;
  }
}
const fruitStand = new FruitStand();
try {
  const error = fruitStand.setNumFruit(1);
  console.log(fruitStand.numFruits);
} catch (ex) {
  console.error(ex);
}
```

Chúng ta đã loại bỏ sự cần thiết phải kiểm tra tất cả các mã lỗi bằng cách gói mã chúng ta muốn chạy trong một khối thử. Bây giờ chúng ta có thể bắt lỗi thay vì kiểm tra tất cả các mã lỗi có thể được trả lại.

Điều này tốt hơn nhiều so với việc kiểm tra tất cả các mã lỗi trước khi làm điều gì đó - nó đặc biệt quan trọng khi mã trở nên phức tạp hơn.

## Write Try-Catch-Finally

Chúng ta nên gói thử trong mã đưa ra các ngoại lệ mà chúng ta muốn bắt. Nó tạo phạm vi riêng cho các biến trong phạm vi khối để mọi thứ được khai báo bằng let hoặc const chỉ có thể được tham chiếu trong khối thử.

Các biến được khai báo với var được nâng lên để chúng có thể được tham chiếu bên ngoài khối. Chúng ta đã giành được một lỗi ngay cả khi họ tham chiếu bên ngoài khối:

```
try {
  var x = 1;
} catch (ex) {
  console.error(ex);
}
console.log(x);
```

Nhưng chúng ta sẽ gặp phải Uncaught ReferenceError: x is not defined:

```
try {
  let x = 1;
} catch (ex) {
  console.error(ex);
}
console.log(x);
```

## Don’t Ignore Caught Errors

Chúng ta nên báo cáo lỗi của mình khi bắt được. Lỗi không nên bị bắt và sau đó bỏ qua. Điều này là do chúng ta không muốn phát sinh các vấn đề tiềm ẩn.

Báo cáo các trường hợp ngoại lệ cho chúng ta biết về lỗi và sau đó xử lý nó cho phù hợp.

Các ví dụ ở trên, như console.error, hãy gọi như sau:

```
try {
  const error = fruitStand.setNumFruit(1);
  console.log(fruitStand.numFruits);
} catch (ex) {
  console.error(ex);
}
```

## Don’t Ignore Rejected Promises

Giống như các ngoại lệ khác, Rejected Promises cũng cần thiết được xử lý. Chúng ta có thể xử lý chúng thông qua callback được truyền vào thông qua phương thức catch hoặc sử dụng async function với try catch block. Chúng đều giống nhau.

Ví dụ ta có thể report lỗi như thế này:

```
Promise.reject('fail')
  .catch(err => {
    console.error(err);
  })
  ```
  
  Hoặc với async function: 
  
  ```
  (async () => {
  try {
    await Promise.reject('fail')
  } catch (err) {
    console.error(err);
  }
})()
```

Source: [https://medium.com/better-programming/javascript-clean-code-error-handling-9cd7e87fdbe3](https://medium.com/better-programming/javascript-clean-code-error-handling-9cd7e87fdbe3)