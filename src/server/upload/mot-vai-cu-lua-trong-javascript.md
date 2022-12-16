# [1. Const  trong javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
```
The const declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned.
```
Câu trên có thể tạm hiểu là: Kiểu const tham chiếu chỉ đọc đến một giá trị, nghĩa là giá trị có thể thay đổi nhưng địa chỉ là bất biến.
- Trường hợp 1: Thay đổi giá trị của biến 
```
const x = 10 
x= 20 
 // => TypeError: Assignment to constant variable.
```
hay 

```
const x = [1,2,3] 
x= [1,2,3,4]
 // => TypeError: Assignment to constant variable.
```
Ví dụ đầu tiên thay đổi giá trị của biến số kiểu number thành một số hoàn toàn khác, thực chất là đang thay đổi địa chỉ của biến x nên lỗi.
Ví dụ thứ hai  cũng tương tự, thay đổi một object hoàn toàn khác - một địa chỉ mới.

Nhưng nếu xét ví dụ sau: 
```
const x= [1,2,3,4,5]
x[-1]= 6 
x['position']= 100
```
Log  x ra sẽ như thế nào ? 
>[ 1, 2, 3, 4, 5, '-1': 6, position: 100 ]

Trong ví dụ trên, object vẫn là địa chỉ cũ, chỉ có giá trị thay đổi.

Mặt khác, trong ví dụ,  việc gán biến trong array có gì hơi lạ? 
```
x[-1]= 6 
x['position']= 100
```
Thông thường, chúng ta quen với các chỉ số mảng 0, 1, 2, 3....
Nhưng trong Javascript thì còn hơn thế, chỉ số của mảng có thể là bất cứ gì, ta có thể coi -1 , hay position là một string.

# 2. Vấn đề với 2 object
Xét ví dụ sau: 
```
let t1 = [1,2,3]
let t2 = [10,9,8]
t1 = t2 
// t1, t2 : [10,9,8] [10,9,8] 
t2['x'] = 4
// t1, t2 : [ 10, 9, 8, x: 4 ] [ 10, 9, 8, x: 4 ]
```
Đây là một trường hợp điển hình và tiêu biểu khi mới bắt đầu code JS mà dev thường mắc phải.

Việc lí giải vấn đề này rất đơn giản việc sử dụng t1= t2 là ta đã gán biến t1 và t2 trỏ đến cùng một địa chỉ nên khi t1 hay t2 thay đổi thì giá trị của cả hai đều thay đổi theo. 

Để giải quyết vấn đề này, có 1 tip trick đơn giản để xử lí là: 
```
t1 = JSON.parse(JSON.stringify(t2))
```
Lúc này việc thay đổi giá trị của t1 sẽ không ảnh hưởng tới t2 và ngược lại.

# 3. Ghép nối mảng 
Xét ví dụ thú vị sau : 
```
let array1 = [1,2,3] + [4,5,6]
// 1,2,34,5,6 
```
Có thể nhiều bạn sẽ thắc mắc sau không phải [1,2,3,4,5,6]. Nhưng bởi trong JS, không thể dùng toán tử + để gộp mảng, nó sẽ hiểu rằng việc sử dụng toán tử cộng sẽ convert hai array kia sang kiểu string và cộng vào với nhau dẫn tới kết quả đó. 

Nếu muốn gộp mảng thì hãy sử dụng **concat** hay  **Spread với ES6**.

# 4. Hãy cẩn thận trong việc sử dụng strict mode
Như ta cũng biết, strict mode giúp giảm thiểu các lỗi "ngớ ngẩn"  trong việccode JS, nó giúp việc khai báo và sử dụng biến tốt hơn.Tuy nhiên, ta cũng cần phải lưu ý một vài lỗi phổ biến khi sử dụng như: 
* 
* ***1. Sử dụng biến mà không khai báo***

Thông thường, khi ta sử dụng một biến mà không khai báo, thì mặc định biến đó sẽ trở thành một thuộc tính của đối tượng global.
```
x = 10 
console.log(x) // 10 
```

Tuy nhiên, khi sử dụng chế độ strict mode thì việc không khai báo sẽ có lỗi: 
>  Uncaught ReferenceError: x is not defined.

* ***2. Tên tham số trùng nhau ở khai báo hàm***

Strict mode yêu cầu các tham số truyền vào phải khác nhau, vậy nên việc viết hàm như dưới sẽ xảy ra lỗi: 
> => Uncaught SyntaxError: Duplicate parameter name not allowed in this context
```
 sum(a, a, c){
  'use strict'
  return a + b + c;
}
```

* ***3. Xoá một biến thông thường***

Strict mode cấm bạn xoá tên biến vậy nên việc xoá tên biến sẽ xảy ra lỗi : 
> Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
```
'use strict';

var x = 10;
delete x;
```

* ***4.  Đặt tên biến trùng với từ dữ trữ***

Ngoài từ khoá, JavaScript quy định danh sách những từ dự trữ – những từ sẽ được sử dụng làm từ khoá ở những phiên bản tiếp theo, như: implements, interface, let, package, private, protected, public, static, và yield.

Do đó, strict mode nghiêm cấm bạn đặt tên biến số trùng với những từ này. Nếu bạn đặt tên biến trùng với từ dự trữ thì bạn sẽ bị lỗi như sau:

> Uncaught SyntaxError: Unexpected strict mode reserved word
```
'use strict';
var implements = 10;
```

Trên đây là một vài lỗi nhỏ và tiêu biển khi sử dụng chế độ strict mode. Tuy việc sử dụng chế độ này có phần chặt chẽ, nhưng nó giúp ích rất nhiều trong việc phát hiện lỗi trong lúc code, nó giúp cho việc code của bạn không bị xung đột với các bản Javascript sau này.

Và đây cũng là mục cuối cùng trong phần "Những "cú lừa giật mình" trong Javascript" mà bản thân mình trong lúc code "nghiệm ra" và tìm hiểu được, mong một phần nào đó có thể giúp các bạn tham khảo cũng như hiểu thêm và ngôn ngữ hay ho này.

Cám ơn các bạn đã đọc!