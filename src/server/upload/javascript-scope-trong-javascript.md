![](https://images.viblo.asia/3ea5f93f-4016-4727-a587-9d76e0168e07.png)

# Mở bài #
Chào các bạn, hôm nay mình và các bạn sẽ cũng nhau bàn về **Scope**

Đây là ví dụ của mình :

```
var a = 1;
function openBlock(){
  var a = 2;
 }

console.log('a',a);
```
Đoạn code trên mình có tạo 2 biến đều có cùng tên là **a**, các bạn có thể chạy đoạn code trên và cho ra kết quả thử xem nhé, Javascript được biết đến là một ngôn ngữ lập trình **đơn luồng** chạy trên browser. Đơn luồng nghĩa là những tập lệnh, những dòng code chúng ta viết ra chỉ được thực thi tuần tự tại một thời điểm của cùtng process, vì thế nó chỉ có thể làm 1 việc ở 1 thời điểm hiện tại mà thôi, và nó sẽ chạy theo tuần tự từ trên xuống dưới, vậy tại sao kết quả của console.log lại là **1**.
# Thân bài #
Trong javascript, **Scope** hay còn gọi là **phạm vi truy cập** , Scope có thể được xác định trên **globally** hoặc **locally** . Hiểu về scope trong js là chìa khóa để viết code chống lỗi và trở thành developer tốt hơn. Bạn sẽ hiểu được ở đâu **variables**/**functions** có thể được truy cập được.
## globally ##
 Nếu bạn có 1 file javascript chưa viết 1 dòng code nào trong đó, thì con trỏ chuột của bạn đang đứng là **global scope**, và khi bạn khởi tạo biến thì biến đó cũng là  **global scope**.
 
ví dụ :
```
// global scope
var name = 'Tran Duy Hung';
```

## locally ##

```
// Scope A: đây là global scope 
var myFunction = function () {
  // Scope B: đây là Local scope
};
```
**Local scope** đề cập tới bất kì scope nào được xác định qua **Global scope**, thường có 1 phạm vi truy cập cập toàn cục **Global scope** duy nhất, và function sẽ định nghĩa 
phạm vi truy cập cục bộ **Local scope** của riêng nó, nếu mình định nghĩa 1 variable trong 1 scope mới thì nó không thể được truy cập bởi 1 scope bên ngoài scope hiện tại (scope mình mới định nghĩa).

ví dụ :
```
//đây là Global scope, mình gọi là scope A.
function myFunction() {
    //đây là Local scope, mình gọi là scope B.
    var name = 'Tran Duy Hung';
};
console.log('name',name);
```
Biến name có phạm vi truy cập là **local scope** và nó sẽ không thể được truy cập bởi scope A, do đó dẫn đến kết quả là undefined.
## Function scope ##
   **scope** được tạo bởi **function**, ngoài **function** ra, nó không được tạo bởi các vòng lặp : while, for ..., không được tạo bởi các câu lệnh điều kiện
if, switch .. , mỗi function mới sẽ tạo ra 1 scope mới, và scope mới đó được gọi là **function scope**, và khi bạn cố gắng gọi scope được tạo trong function đó ở ngoài function đó thì nó sẽ không hoạt động.

Ví dụ :
```
// Scope A
function FunctionB() {
  // Scope B
    var width = 100;
};
console.log('width',width);
```
## Lexical Scope ##
Tiếp theo chúng ta sẽ tìm hiểu về **Lexical Scope**, khi bạn nhìn thấy 1 function nằm lồng trong 1 function khác thì đó được gọi là **Lexical Scope**, hay còn gọi là **Static Scope**. 

Ví dụ :
```
function functionA() {
  // Local scope A
  var name = 'Tam';
  function functionB() {
    // Local scope B, biến name vẫn có thể truy cập được tại đây
    console.log('My name is ' + name);
  };
  // call function B
  functionB();
};

functionA();
```
Làm việc với **Lexical scope** cũng khá là dễ dàng, bật cứ biến/object/ function được định nghĩa trong parent scope, đều có thể được truy cập bởi các scope con nhỏ hơn,
**Lexical scope** không hoạt động theo chiều ngược lại, tức là biến/object/function định nghĩa trong scope con thì ko thể truy cập bởi scope cha.

Ví dụ :
```
function functionA() {
  // Local scope A, biến name không thể được truy cập tại đây
  console.log('My name is ' + name);
  function functionB() {
    // Local scope B
    var name = 'Tam';
  };
};

functionA();
```
## Block Scope ##

ví dụ :
```
var age = 11;
if (age === 11){
    var eleven = age;
}
console.log(eleven);
```
tại sao biến eleven lại hoạt động như **Global scope** và không bị vấn đề gì ? Bởi vì biến var ta khai báo chỉ bị giới hạn bởi **function scope**, nhưng ta lại không khai báo nó trong 1 function, mà thay vào đó, ta khai báo nó trong 1 **Block Scope** do câu lệnh điều kiện **if** tạo ra. 
**Block Scope** được khai báo trong 1 cặp dấu nhọn **{ ... }** ( được gọi là block ).
từ khóa khai báo biến **var** sẽ không bị giới hạn trong 1  **Block Scope**, vậy nên nó sẽ có vấn đề phát sinh.

mình có 1 ví dụ :
```
function functionA() {
  var age = 2; 
  if (true) {
    var age = 1; 
  }
  return age;
}

console.log(functionA()); // result: 1
```
Trong ví dụ trên biến ”age” thứ 2 do có từ khoá khai báo “var” ở phía trước nên sẽ có nhiều bạn hiểu lầm là biến “age” này sẽ không gây ảnh hưởng đến biến "age" ban đầu.
Tuy nhiên, do “var” khai báo biến trong lexical scope (ở đây là function functionA) như mình đã nói ở trên nên biến “age” thứ 2 sẽ được khai báo đè lên biến "age" thứ nhất.
Do đó, kết quả trả về sẽ là giá trị của biến “age“ thứ 2 là 1.

Mình sẽ thử thay **var** bằng **const**, hoặc **let** : 
```
function functionA() {
  const age = 2; 
  if (true) {
    const age = 1; 
  }
  return age;
}

console.log(functionA()); // result: 2
```
Ví dụ trên tương tự như ví dụ 1 nhưng sử dụng từ khoá “const” để khai báo thay vì từ khoá “var”.
Ở đây, biến "age" thứ 2 được khai báo locally trong block scope giữa 2 dấu ngoặc nhọn "{...}" của if do tác dụng của từ khoá “const“ (let và const khai báo biến trong block scope). Do đó, giá trị của biến “age” đầu tiên sẽ không bị ảnh hưởng và hàm này sẽ trả về giá trị của biến "age" đầu tiên là 2.

## Scope Chain ##
Khi nào viết tiếp bài về **Hoisting**, mình sẽ update tiếp phần này. :))))

# Kết bài #
Bạn đã đọc xong bài viết của mình, đây là những gì mình hiểu về về **scope** trong JavaScript, mình có tham khảo thêm vài nguồn tài liệu, nếu có gì bạn thấy không đúng hoặc cần bổ sung xin vui lòng bình luận phía dưới, 

## Xin cảm ơn ##