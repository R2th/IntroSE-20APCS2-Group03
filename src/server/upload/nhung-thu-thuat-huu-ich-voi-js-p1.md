## 1. Chuyển đổi kiểu dữ liệu sang boolean sử dụng toán tử !!
Đôi lúc chúng ta cần kiểm tra nếu một vài biến tồn tại hoặc nếu nó có một giá trị hợp lệ hay không. Để xác nhận như vậy, bạn có thể sử dụng !! (toán tử phủ định đôi). Nó sẽ tự động chuyển đổi mọi kiểu dữ liệu về boolean và biến này sẽ trả về false chỉ khi nó có những giá trị như: 0, null, "", undefined hoặc NaN, ngược lại nó sẽ trả về true. Để hiểu hơn về cách nó hoạt động, hãy xem ví dụ đơn giản sau:

```
function Account(cash) {  
    this.cash = cash;
    this.hasMoney = !!cash;
}
var account = new Account(100.50);  
console.log(account.cash); // 100.50  
console.log(account.hasMoney); // true
var emptyAccount = new Account(0);  
console.log(emptyAccount.cash); // 0  
console.log(emptyAccount.hasMoney); // false
```

Trong ví dụ trên, nếu account.cash có giá trị lớn hơn 0 thì account.hasMoney sẽ có giá trị là true.

## 2. Chuyển đổi kiểu dữ liệu sang number sử dụng toán tử +
Thủ thuật này rất tuyệt vời và dễ dàng để thực hiện, nhưng nó chỉ hoạt động với chuỗi những con số, ngược lại nó sẽ trả về NaN (Not a Number). Hãy nhìn ví dụ sau:

```
function toNumber(strNumber) {  
    return +strNumber;
}
console.log(toNumber("1234")); // 1234  
console.log(toNumber("ACB")); // NaN
```

Thủ thuật này cũng hoạt động với cả Date và trong trường hợp này nó sẽ trả về timestamp:

console.log(+new Date()) // 1461288164385

## 3. Câu điều kiện rút gọn
Nếu bạn thấy một đoạn code giống như này:

```
if (connected) {  
    login();
}
```
Bạn có thể rút gọn nó bằng cách kết hợp một biến (sẽ được xác nhận) và một hàm sử dụng && (toán tử AND) ở giữa. Ví dụ, đoạn code trên có thể trở nên ngắn gọn trong một dòng:

`connected && login();`

Bạn có thể làm tương tự để kiểm tra nếu một vài thuộc tính hay hàm tồn tại trong object. Tương tự như đoạn code dưới đây:

`user && user.login();`

## 4. Đặt giá trị mặc định sử dụng toán tử ||
Ngày nay trong ES6 đã hỗ trợ tham số mặc định. Trong trường hợp bạn muốn giả lập tính năng này trong các trình duyệt cũ thì bạn có thể sử dụng || (toán tự OR) bằng cách chèn giá trị mặc định như là tham số thứ hai để sử dụng. Nếu tham số đầu tiên trả về false thì tham số thứ hai sẽ được sử dụng như là một giá trị mặc định. Xem ví dụ sau:
```
function User(name, age) {  
    this.name = name || "Oliver Queen";
    this.age = age || 27;
}
var user1 = new User();  
console.log(user1.name); // Oliver Queen  
console.log(user1.age); // 27
var user2 = new User("Barry Allen", 25);  
console.log(user2.name); // Barry Allen  
console.log(user2.age); // 25
```

## 5. Cache array.length trong vòng lặp
Mẹo này rất đơn giản và gây tác động lớn tới hiệu suất khi xử lý các mảng lớn trong vòng lặp. Hầu hết thì mọi người sử dụng vòng lặp for như sau để duyệt qua mảng:

```
for (var i = 0; i < array.length; i++) {  
    console.log(array[i]);
}
```
Nếu bạn làm việc với các mảng nhỏ thì không sao, nhưng nếu bạn xử lý những mảng lớn thì đoạn code này sẽ tính toán lại kích cỡ của mảng sau mỗi lần lặp và sẽ gây ra một chút chậm chễ (delay). Để tránh điều này, bạn có thể cache array.length trong một biến để dùng nó thay vì gọi array.length trong mỗi lần lặp:

```
var length = array.length;  
for (var i = 0; i < length; i++) {  
    console.log(array[i]);
}
```
Để làm nó trông gọn hơn, chỉ việc viết lại như sau:

```
for (var i = 0, length = array.length; i < length; i++) {  
    console.log(array[i]);
}
```

Nguồn: [sưu tầm](https://kipalog.com/posts/12-thu-thuat-vo-cung-huu-ich-ma-lap-trinh-vien-JavaScript-can-biet)