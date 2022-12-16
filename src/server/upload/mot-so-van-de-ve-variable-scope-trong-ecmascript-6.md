# 1. Variable Scope
```javascript
var myVar = 1;

function setMyVar() {
  myVar = 2;
}

setMyVar();

console.log(myVar);
```
Ở ví dụ trên, kết quả log trả về kết quả là 2. 

Biến **myVar** được định nghĩa bên ngoài bất kỳ hàm nào, có nghĩa là nó được định nghĩa trong phạm vi toàn cục (**global scope**). Do đó, mọi function ở đây sẽ biết biến **myVar** là gì. Ngay cả các hàm trong các tệp khác được bao gồm trên cùng một Page cũng sẽ biết biến này là gì.

```javascript
function setMyVar() {
  var myVar = 2;
}

setMyVar();

console.log(myVar);
```

Ở ví dụ thứ 2, gọi lại function chứa biến được khai báo. Lúc này, log sẽ raise lỗi **ReferenceError** vì **myVar** không được xác định. 

Đó là bởi vì khai báo **var** ở đây có phạm vi sử dụng chỉ trong function được khai báo (và bất kỳ function nào được lồng trong function **setMyVar**) chứ không vượt ra ngoài. 

Nếu muốn phạm vi của một biến được chia sẻ bởi hai hoặc nhiều function trên cùng một cấp thì cần xác định một biến cao hơn một cấp so với các function.

Do đó, việc xác định một biến trong phạm vi toàn cục thường được coi là phương pháp không tốt.

Bởi vì sẽ không bao giờ biết biết hết được các chỗ code khác trong đó sẽ sẽ định nghĩa những biến nào. Có một số cách giải quyết để chia sẻ các biến giữa một nhóm các function, đáng chú ý nhất là sử dụng  **the module pattern và IIFEs** trong **object-oriented JavaScript**.

# 2. Vấn đề khi sử dụng "Var" để khai báo biến
```javascript
function varTest() {
  for (var i = 0; i < 3; i++) {
    console.log(i);
  }
  console.log(i);
}

varTest();
```

Ví dụ này log trả về kết quả là 3. 

Ở đây **var** là cấp hàm, nếu định nghĩa một biến bằng cách sử dụng **var**, toàn bộ hàm sẽ có quyền truy cập vào nó, bất kể nó được định nghĩa ở đâu trong hàm đó.

Điều này có thể gặp vấn đề khi các chức năng trở nên phức tạp hơn. 

```javascript
function doSomething() {
  var myVar = 1;
  if (true) {
    var myVar = 2;
    console.log(myVar);
  }
  console.log(myVar);
}

doSomething();
```

Ví dụ này log trả về 2 và 2. 

Trong đoạn code, xác định một biến bằng 1, sau đó xác định lại cùng một biến bên trong **if**. Vì hai biến đó tồn tại trong cùng một phạm vi nên không thể xác định một biến mới và biến **myVar** sẽ bị ghi đè lên sau câu lệnh **if**

Đó có thể coi là thiếu sót lớn nhất cách khai báo **var** bởi phạm vi của **var** quá lớn, có thể dẫn đến việc ghi đè dữ liệu không chủ định và các lỗi khác. Một biến chỉ nên có phạm vi tùy theo nhu cầu của nó và không hơn thế nữa.

# 3. Cách khai báo biến mới trong ECMAScript 6
**ECMAScript 6** (một tập hợp các tính năng mới được đưa vào JavaScript, còn được gọi là ES6 hoặc ES2015) cung cấp hai cách mới để xác định các biến với phạm vi hạn chế hơn là **let** và **const**. 

Cả hai đều được sử dụng **block-level scope** , *nghĩa là phạm vi có thể được chứa trong các block code như vòng lặp for và câu lệnh if*, sẽ giúp linh hoạt hơn trong việc lựa chọn cách các biến xác định phạm vi sử dụng.

## 3.1 Khai báo với "Let"
**let** chủ yếu như **var**, nhưng với phạm vi hạn chế. Ví dụ sử dụng **let** thay cho **var** trong 1 ví dụ bên trên.

```javascript
function doSomething() {
  let myVar = 1;
  if (true) {
    let myVar = 2;
    console.log(myVar);
  }
  console.log(myVar);
}

doSomething();
```

Trong trường hợp này, các log sẽ trả về 2 và 1. 

Do một câu lệnh **if** xác định phạm vi mới cho một biến được khai báo bởi **let**, biến thứ hai khai báo sau đó là một thực thể riêng biệt so với thực thể đầu tiên và có thể đặt cả hai một cách độc lập. 

Nhưng điều đó không có nghĩa là các block lồng nhau như **if** hoàn toàn bị cắt khỏi phạm vi cấp cao hơn.

```javascript
function doSomething() {
  let myVar = 1;
  if (true) {
    console.log(myVar);
  }
}

doSomething();
```
Trong trường hợp này, log sẽ trả về 1. 

Câu lệnh **if** có quyền truy cập vào biến đã tạo bên ngoài nó và có thể ghi lại biến đó. Nhưng điều gì sẽ xảy ra nếu cố gắng kết hợp các scope?

```javascript
function doSomething() {
  let myVar = 1;
  if (true) {
    console.log(myVar);
    let myVar = 2;
    console.log(myVar);
  }
}

doSomething();
```
Log đầu tiên trả về một ReferenceError, tức là **myVar** không được xác định hoặc khởi tạo cho phạm vi đó. Biến JavaScript được **hoisted** trong một họ scope, nếu khai báo một biến trong một phạm vi, JavaScript đã dành một chỗ cho biến đó trước khi nó được khai báo. 

Sự khác nhau giữa **var** và **let** trong ví dụ sau:

```javascript
console.log(varTest);
var varTest = 1;

console.log(letTest);
let letTest = 2;
```

* Trong cả hai trường hợp đang sử dụng một biến trước khi nó được xác định. Kết quả của 2 log cho ra là khác nhau. 

* Đầu tiên, sử dụng một biến được khai báo sau đó với **var**, sẽ đọc undefined, đây là một kiểu biến actual. 

* Biến thứ hai, sử dụng một biến được định nghĩa sau đó bởi **let**, log ném ra một ReferenceError và cho biết rằng đang sử dụng biến đó trước khi nó được định nghĩa hay khởi tạo.

Trước khi chạy, JavaScript sẽ đọc nhanh code và xem liệu có biến nào sẽ được xác định hay không và đưa chúng vào phạm vi của chúng nếu có. Hoisting dự trữ không gian đó, ngay cả khi biến tồn tại trong phạm vi cha.

Các biến được khai báo với **var** sẽ được tự động khởi tạo **undefined** trong phạm vi của chúng, ngay cả khi tham chiếu chúng trước khi chúng được khai báo . Vấn đề lớn là **undefined** và không phải lúc nào cũng sử dụng một biến trước khi nó được định nghĩa. 

Một ví dụ rõ ràng dưới đây:

```javascript
var var1;
console.log(var1);

console.log(var2);
var var2 = 1;
```
Trong trường hợp này, cả hai log cùng thông báo **undefined**. Tuy nhiên, cách xác định undefined của 2 log lại hoàn toàn khác nhau.

Các biến được khai báo bằng **var** nhưng không có giá trị sẽ được gán giá trị là**undefined**, nhưng các biến được khai báo cùng **var** được tham chiếu trong phạm vi của chúng trước khi được khai báo cũng sẽ trả về **undefined**.

Các biến được xác định bằng **let** được bảo lưu trong block của chúng. Cho đến khi chúng được xác định thì sẽ bị ném vào Temporal Dead Zone (TDZ), chúng không thể sử dụng và sẽ gây ra lỗi, và JavaScript biết chính xác lý do lỗi cũng như thông báo lại thông tin lỗi.

```javascript
let var1;
console.log(var1);

console.log(var2);
let var2 = 1;
```

Trong trường hợp này, log đầu tiên trả về **undefined**, còn log thứ hai ném ra một ReferenceError, thông báo rằng biến chưa được xác định hay khởi tạo.

Vì vậy, khi sử dụng **var**, nếu thấy **undefined** chưa chắc biết liệu biến đã được định nghĩa hay chưa và không có giá trị, hoặc nếu nó chưa được xác định trong phạm vi đó nhưng sẽ có. 
Sử dụng **let**, nhận được một thông báo rõ ràng hơn về lỗi và sẽ hữu ích hơn nhiều cho việc gỡ lỗi.

## 3.2 Khai báo biến với "Const"
**const**  rất giống với **let**, nhưng có một ngoại lệ chính là nó không cho thay đổi giá trị sau khi khởi tạo. (Một số kiểu phức tạp hơn như Object và Array, có thể được sửa đổi, nhưng không thể thay thế được. Các kiểu ban đầu như Number và String, hoàn toàn không thể thay đổi)

```javascript
let mutableVar = 1;
const immutableVar = 2;

mutableVar = 3;
immutableVar = 4;
```

Đoạn code đó sẽ chạy tốt cho đến dòng cuối cùng, dòng này ném một **TypeError** để gán cho một biến hằng số. Các biến được xác định với **const** sẽ gây ra lỗi này hầu như bất cứ khi nào cố gắng gán lại và có thể gây ra một số kết quả không mong muốn.

Vấn đề đối với các biến bất biến trong một số trường hợp là việc thay đổi một biến Const có thể gây hại nhiều function khác của project.

```javascript 
const myButton = document.querySelector('#my-button');
```

Nếu đoạn code này phụ thuộc vào tham chiếu đến phần tử HTML cụ thể thì biến ```myButton``` không thể được gán lại.

Nhưng trường hợp biến khai báo với ```const``` còn có thể vượt xa hơn thế. 
Phương pháp hay nhất  là chỉ cung cấp cho các biến phạm vi mà chúng cần và không cung cấp thêm. Chỉ nên cung cấp cho các biến khả năng thay đổi mà chúng cần và không hơn. 

Điểm mấu chốt là việc sử dụng biến bất biến sẽ khiến khi code phải suy nghĩ nhiều hơn về độ ảnh hưởng khi sửa và các risk có thể xảy ra.
Với **const** và **let** chỉ nên sử dụng nếu cần thiết phải gán lại. 

Và thêm 1 lưu ý, không phải trình duyệt nào cũng hộ trợ **const** và **let** nhưng **var** là 100%.

**Cảm ơn các bạn đã theo dõi đến đây. Xin chào và hẹn gặp lại!**

**Link tham khảo: https://alistapart.com/article/fixing-variable-scope-issues-with-ecmascript-6/**