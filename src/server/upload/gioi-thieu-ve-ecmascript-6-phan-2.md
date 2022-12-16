# Mở đầu
Xin chào các bạn trong bài viết này chúng ta sẽ tiếp tục tìm hiểu về ECMAScript 6. Trong phần 1 chúng ta đã cùng tìm hiểu khái niệm, lý do sử dụng cũng như lược qua 1 số tính chất trong ES6:
* Template Literals
* Multi-line String
* Destructuring Assignment
* Default Parameter
* Rest Parameter
các bạn có thể đọc lại  [tại đây](https://viblo.asia/p/gioi-thieu-ve-ecmascript-6-phan-1-4dbZN8qL5YM) nhé.
# Nội dung
## 2.6 Var, let, const trong es6
Kể từ es6 sẽ có thêm `let` và `constan` để khai báo biến. Vậy sự khác nhau giữa các cách khai báo biến này là như thế nào? Xin thưa là cũng không khó để phân biệt nó lắm. 
* `let`: là cách khai báo biến cho phép biến có phạm vi trong khối (block) bao quanh nó. 1 khối là như thế nào? có thể là trong vòng lặp(trong cặp dấu`()`), trong phần thân vòng lặp(trong cặp dấu `{}`),...
* `var`: cũng là 1 cách khai báo biến, nhưng phạm vi của nó là toàn function mà nó được khai báo.
* `const`: nó được dùng khi mà ta muốn nó là 1 hằng số, không thể thay đổi được giá trị của biến const trong suốt quá trình chạy. 
Chúng ta cùng xem qua 1 số ví dụ để dễ hình dung hơn những điều trên nhé:
ví dụ về `let`:
```
function testLet() {
  let a = 10;
  if (true) {
    let a = 100;
    console.log(a);
  }
  console.log(a);
}
testLet();
```
kết quả

 ![](https://images.viblo.asia/e992da88-e1be-4f98-bd22-106c7dac0cd1.png)
 
các bạn có thể thấy biến khi thỏa mãn điều kiện if và ta có định nghĩa lại biết `a`, nhưng khi thoát khỏi khối thì biến `a` vẫn trở về với giá trị cũ. Nó khác hẳn với `var`, cũng ví dụ trên nhưng mình thay đổi `let` sang `var` thì kết quả biến `a` đã bị thay đổi.

![](https://images.viblo.asia/5402f4fe-42de-4256-b714-4830ba363649.png)
còn đối với const 
```
const a = 10;
a = 1; /// sẽ bị báo lỗi ở đây
```
khi bạn viết như thế này sẽ bị báo lỗi ngay, vì `const` là biến không thể thay đổi mà. 
### Tranh luân Vậy khi nào thì nên dùng `let` khi nào nên dùng `var` ?????
Mình thấy nhiều người bảo trong es6 không nên dùng `var` nữa mà nên dùng `let`. Còn bản thân mình thì thấy cũng không nên bỏ hẳn `var` và `let` được. Vì 2 cách khai báo đều đem lại ưu điểm trong từng trường hợp nhất định. Đây chỉ là ý kiến của riêng mình, còn bạn nào biết câu trả lời hay có ý kiến khác thì hãy comment ở bên dưới cho mọi người cùng biết nhé (bow).
## 2.7 import/export 
Nếu ai đã từng code reactJs thì chắc chắn việc sử dụng import/export của Es6 có lẽ là quá quen thuộc rồi. Tính năng import/export trong es6 giúp ta có thể import lại 1 module nào đó trong project.  Giả sử ta có 1 file `students.js`. 
```
    var students = [
        {
            name: 'Minh',
            className: 'A1'
        },
        {
            name: 'Quyen',
            className: 'A2'
        }
    ];
  
    export function printAllStudent(){
      for(let i = 0; i<=students.length; i++){
          console.log(`Name: {students[i].name} Class: {students[i].className}`);
      } 
    }
```

Tại một file js khác index.js chẳng hạn nếu muốn dùng lại chức năng `printAllStudent()` thì ta phải import file đó vào là sử dụng đc như bình thường.
```
    import { printAllStudent } from './students';
    printAllStudent() // in ra danh sách học sinh.
```
Chú ý: 
* ở đây các bạn chú ý 1 chút là để import 1 file cùng cấp thì ta dùng `./`.

Theo mình cảm nhận thì tính chất này cũng khá hay nó giúp module hóa phân chia gọn gàng cho project.
## 2.8 Arrow Functions
Trong javascript có một vài cách khai báo function đó là 
```
// gán function vào 1 biến
var name = function (){
    return "Long Nguyen";
}
// gọi hàm
name();

function tong(var a, var b) {
    return a+b;
}
```
Tuy nhiên `Arrow Functions` trong `es6` sẽ là 1 lựa chọn mới dành cho bạn khi bạn khai báo `function()`, `Arrow Functions` giúp bạn có thể viết `function` nhanh chóng và gọn gàng hơn so với cách truyền thống. Ở đây `arrow` tiếng anh nghĩa là mũi tên, `Arrow Functions` thì hiểu là kiểu khai báo function có mũi tên (`=>`), vì vậy bạn có thể sẽ hình dung ra nhanh hơn khi nhắc tới `Arrow Functions`.
****Cách dùng
```
(param1, param2,...,paramX) => {
  //content function
}
```

****Chúng ta cùng xem các ví dụ ở dưới:
```
var getName = () => {
    return "Long Nguyen";
}
console.log(getName());
```

bạn có thể truyền tham số vào Arrow function như sau:
```
var tong = (a, b) => {
    return a + b;
}
```
Trường hợp nếu như chỉ có 1 tham số truyền vào thì thì bạn cũng có thể viết ngắn hơn bằng cách bỏ đi cặp ngoặc `()`:
```
var getA = a => { console.log(a); }  // a chính là tham số truyền vào, ở đây chúng ta có thể bỏ đi cặp `()` 
```
# Kết luận
Mình xin được kết thúc bài viết tại đây, trên đây là những gì mình tìm hiểu được về es6 tất cả chỉ là basic thôi, mọi người nếu muốn tìm hiểu thêm thì hãy tìm hiểu thêm [tại đây](http://es6-features.org) nhé. Bài viết nếu có gì sai xót xin được các bạn thông cảm và góp ý thêm. Cám ơn và hẹn gặp lại các bạn trong bài viết sau :).