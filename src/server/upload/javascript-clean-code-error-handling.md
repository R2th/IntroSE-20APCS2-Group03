Xử lý lỗi là một phần quan trọng của các chương trình phần mềm. Có rất nhiều các tình huống mà chương trình của bạn gặp phải các giá trị không mong muốn và chúng ta hiển nhiên phải xử lý chúng.
Trong bài này, chúng ta sẽ xem cách xử lý chúng để các lỗi dễ dàng được tìm thấy và xử lý một cách 'duyên dáng'

### Exceptions are Better than Return Codes
Xử lý quăng ra ngoại lệ (Throwing exceptions) là tốt hơn bởi vì chúng làm chúng ta biết rằng đang tồn tại một lỗi mà chúng ta cần phải xử lý nó.

Hầu hết các ngôn ngữ lập trình bậc cao đều được tích hợp xử lý ngoại lệ, vì vậy nên chúng ta nên quăng lỗi thay vì trả về một mã lỗi.

Các mã lỗi không rõ ràng và có thể bị quên hoặc bỏ qua. Các ngoại lệ cũng giúp code sạch hơn nhiều vì chúng ta không phải kiểm tra toàn bộ mã lỗi mà có thể được trả về.

Ví dụ, nếu chúng ta trả về các mã lỗi trong hàm của chúng ta sau đó chúng ta có thể phải code như sau:

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
Chúng ta phải trả về tất cả các mã lỗi trong hàm `setNumFruit`. Ngoài ra, trước khi chúng ta làm gì đó sau khi khởi tạo đối tượng, chúng ta phải kiểm tra tất cả các mã lỗi.

Thay vào đó, chúng ta có thể quăng lỗi ngoại lệ bằng cách:

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

Chúng ta đã loại bỏ sự cần thiết phải kiểm tra tất cả các mã lỗi bằng cách gói mã chúng ta muốn chạy trong một khối `try...catch`. Bây giờ chúng ta chỉ cần bắt lỗi thay vì kiểm tra tất cả các mã lỗi có thể được trả về.

Điều này tốt hơn nhiều so với việc kiểm tra tất cả các mã lỗi trước khi làm điều gì đó - điều này đặc biệt quan trọng khi mã nguồn trở nên phức tạp hơn.