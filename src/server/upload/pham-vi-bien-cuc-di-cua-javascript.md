# Thuở ban đầu:
Ban đầu lúc được thiết kế thì Javascript chỉ có 2 phạm vi duy nhất là phạm vị toàn cục (global scope) và phạm vi địa phương (local scope).
# Global scope:
Các biến có phạm vi toàn cục sẽ có thể truy xuất ở bất kì đâu.

Ví dụ đơn giản:
```
var a = 10;

function doSomething(){
  console.log(a); // có thể truy cập a
}

function doAnotherThing(){
  console.log(a); // có thể truy cập a

}

doSomething();
doAnotherThing();
```
# Local scope:
Các biến chỉ tồn tại bên trong các **hàm (function)**, local scope còn được gọi là function scope vì lẽ này. Mỗi hàm có phạm vi cục bộ riêng của nó, do đó một hàm không thể truy cập các biến cục bộ của một hàm khác.

Ví dụ:
```
function doSomething(){
  var a = 10;
}

function doAnotherThing(){
 console.log(a); // không thể có thể truy cập biến A. Lỗi: ReferenceError: a is not defined
}

doAnotherThing();
```

# Từ năm 2015 trở đi với ES6:
ES6 bổ sung thêm từ khóa **let** cho javascript.  Các biến khai báo với từ khóa let sẽ có phạm vị khối (block scope).

Phạm vị khối (block scope) là một biến được khai báo trong 1 khối lệnh nào đó, ví dụ: câu lệnh điều kiện (if) hoặc vòng lặp (for). Thực sự thì phạm vi khối không có gì lạ đối với các ngôn ngữ hướng đối tượng như Java, C#, tuy nhiên đối với Javascript thì hơi “dị”. ?

OK, bàn tí về sự khác nhau của **var** và **let**.
![](https://images.viblo.asia/14c97bf3-e0fb-4433-b602-731f705411cf.png)

# var và let:
Ta xem ví dụ bên dưới:
```
if(true){
  let a = 10;
  var b = 20;
}
//Có thể truy cập b nhưng không thể truy cập a

console.log(b); // in ra 10
console.log(a); // Lỗi: a is not defined
```

Trong ví dụ trên, biến a khai báo với let sẽ có phạm vị khối lệnh. Do đó, bên ngoài khối lệnh if thì không thể truy xuất được. Trong khi đó, biến b khai báo bằng từ khóa var sẽ có phạm vị hàm, đo đó, vẫn có thể truy xuất bên ngoài khối lệnh if.

# const:
Ta mở rộng vấn đề với việc bàn thêm về từ khóa **const**.

Cái này cực kì dễ hiểu, tương tư như các ngôn ngữ lập trình khác thì const dùng để khai báo **hằng số**. Một biến khi khai báo là const, nếu bị gán vào giá trị mới thì sẽ bị lỗi là TypeError: Assignment to constant variable.
```
const x = 1;
x = 100; // Lỗi Uncaught TypeError: Assignment to constant variable
```

# Khi nào nên dùng var hoặc let hoặc const?
Theo kinh nghiệm của cái nhân mình thì: ưu tiên dùng const. Kế đến là dùng let và cố gắng **không** dùng var. Quá đơn giản phải không nào. ?

# Kết:
Qua bài này bạn đã hiểu thêm về 3 phạm vi biến trong Javascript là: global, local và block. Ngoài ra, quan trọng nhất là biết khi nào nên dùng let, var và **const**:  “Ưu tiên dùng const. Kế đến là dùng **let** và cố gắng **không** dùng **var**”.