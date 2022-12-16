Symbol là một kiểu dữ liệu nguyên thủy của JavaScript, cùng với string, number, boolean, null và undefined. Nó được giới thiệu lần đầu tiên tại ECMAScript 2015 (ES6) một vài năm về trước.
Nó có một kiểu dữ liệu rất đặc biệt. Khi bạn tạo một Symbol, giá trị của nó được giữ kín và chỉ để sử dụng nội bộ.
Bạn tạo một Symbol bằng cách gọi hàm global Symbol():

```javascript
const mySymbol = Symbol()
```

Mỗi khi bạn gọi tới hàm Symbol(), chúng sẽ nhận được một giá trị mới và giá trị này là duy nhất (unique), đồng thới giá trị của nó cũng khác với giá trị của các Symbol khác:

```javascript
Symbol() === Symbol() //false
```

Bạn có thể truyền tham số cho Symbol() và được sử dụng làm mô tả cho chính Symbol đó:

```javascript
console.log(Symbol()) //Symbol()
console.log(Symbol('Some Test')) //Symbol(Some Test)
```

Các Symbol thường được sử dụng để xác định các thuộc tính đối tượng. Thông thường nó được để tránh xung đột tên giữa các thuộc tính, vì không có Symbol nào bằng giống nhau cả.
Hoặc nó cũng được dùng để thêm các thuộc tính mà không thể bị ghi đè hoặc không muốn bị nhận ra. Ví dụ:

```javascript
const NAME = Symbol()
const person = {
  [NAME]: 'Flavio'
}

person[NAME] //'Flavio'

const RUN = Symbol()
person[RUN] = () => 'Person is running'
console.log(person[RUN]()) //'Person is running'
```

Chúng ta cũng có thể truy cập vào tất cả các Symbol được gán cho một đối tượng bằng phương thức ***Object.getOwnPropertySymbols()***.

-----
***Tài liệu tham khảo:*** [https://flaviocopes.com/javascript-symbols/](https://flaviocopes.com/javascript-symbols/)