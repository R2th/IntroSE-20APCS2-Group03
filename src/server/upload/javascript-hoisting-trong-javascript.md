![](https://images.viblo.asia/44f184de-a646-45f1-8e25-1f812b399eca.png)

# Mở bài #
Chào các bạn, hôm nay mình và các bạn sẽ cũng nhau bàn về **Hoisting**

Đây là ví dụ của mình :
```
console.log(name);
var name = 'Nguyen Tam';
```
Các bạn hãy chạy đoạn code Javascript này và cho ý kiến nhé
-> kết quả sẽ là **undefined**, 

**Trong javascript, khi bạn khai báo một biến nhưng chưa gán giá trị cho nó, giá trị của biến đó sẽ là undefined.**

kết quả phải là **name is not defined**, vì mình in ra console.log trước khi khai báo biến name và gán giá trị cho nó ?

# Thân bài #
Trong Javascript, **Hoisting là hành động mặc định của JavaScript, nó sẽ di chuyển những câu lệnh khai báo tên biến lên vị trí đầu tiên trong phạm vi (lên đầu tập tin hiện tại hoặc lên đầu hàm hiện tại).**

## Hoisting variable ##

ví dụ 1:
```
console.log(name);
var name;
```
-> kết quả sẽ là **undefined**, 

ví dụ 2:
```
var name;
console.log(name);
```
-> kết quả sẽ là **undefined**, 

=> cả 2 kết quả này cho ta thấy chúng tương đương nhau, dù ta có khởi tạo biến name; ở trước hay sau khi in ra kết quả của nó đều cho thấy biến **name** đã được khai báo, chúng ta hãy tiếp tục làm tiếp ví dụ để biết rõ hơn về **Hoisting** nhé.

ví dụ 3:
```
console.log(name);
var name;
name = 'Tam';
```
-> kết quả sẽ là **undefined**, 

ví dụ 4:
```
name = 'Tam';
console.log(name);
var name;
```
-> kết quả sẽ là 'Tam'

=> kết quả của ví dụ thứ 3 cho ta thấy, ta chưa gán giá trị cho biến name khi kết quả là  **undefined**, ví dụ 4 kết quả bằng đúng với giá trị biến name được gán = **'Tam'**. Với kết quả của 2 ví dụ cho ra khác nhau này ta có thể kết luận **phần gán giá trị của biến không được Hoisting**.

==> Vậy ta có kết luận, đối với **Hoisting variable**, **hoisting là việc đưa các khai báo biến lên phần đầu tiên của phạm vi mà biến được sử dụng, nhưng còn phần gán giá trị của biến, thì sẽ không được di chuyển lên.**

## Hoisting function ##
ví dụ 5:
```
function say() {
  document.write(name);
  var name;
  name = 'Tam';
}

say();
```
-> kết quả sẽ là **undefined**, 

ví dụ 6:
```
function say() {
  var name;
  name = 'Tam';
  document.write(name);
}

say();
```
-> kết quả sẽ là **'Tam'**, 

=> ví dụ 5 cho ta thấy, ta đã thực hiện việc khai báo biến, nhưng chưa khởi tạo giá trị cho biến nên kết quả là **undefined**, ví dụ 6 kết quả bằng đúng với giá trị biến name được gán = **'Tam'**. 

==> Vậy ta có kết luận, đối với **Hoisting function**, **hoisting là việc đưa các khai báo biến lên phần đầu tiên của function, nhưng còn phần gán giá trị của biến, thì sẽ không được di chuyển lên.**

ví dụ 6:
```
var name = 'Nguyen';

function say() {
  document.write(name);
  var name;
  name = 'Tam';
}

say();
```
-> kết quả của biến name này sẽ là **undefined**, Đoạn code bên trên của chúng ta, nếu được viết lại theo sự diễn giải của hoisting nó sẽ như thế này:
```
var name = 'Nguyen';

function say() {
// vì hoisting, khai báo biến name đã bị kéo lên trên đầu của function say(),
// biến name chưa được gán giá trị nên sẽ là "undefined".
  var name;
// ta thực hiện việc hiển thị kết quả,
  document.write(name);
 // vì gán giá trị cho biến sẽ không hoisting.
 // nên việc gán giá trị cho biến name sẽ không thay đổi vị trí.
  name = 'Tam';
}

say();
```


ví dụ 6 : 
```
var say;

say();

function say() {
  document.write('function says');
}

say = function(){
   document.write('variable says');
}

```
=> Trình biên dịch Javascript sẽ chuyển phần khởi tạo **function** trước phần gán giá trị **variable**

# Kết bài #
 Đến đây mình đã giải thích các bạn về **hoisting**,  **hoisting function**, **hoisting variable**, mình có tham khảo thêm vài nguồn tài liệu, nếu có gì bạn thấy không đúng hoặc cần bổ sung xin vui lòng bình luận phía dưới.
 
 # Xin cảm ơn #