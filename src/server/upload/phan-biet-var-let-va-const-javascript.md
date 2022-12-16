# Tổng quan
Là một người mới với JS, chắc hẳn nhiều bạn sẽ thấy thật khó hiểu về các từ khóa khai báo biến trong Js. Tại sao một ngôn ngữ khai báo biến không cần kiểu dữ liệu mà có nhiều từ khóa để dùng khai báo biến vậy ?

# Nội dung
## 1. Giống nhau
var, let và const đều là những từ khóa dùng để khai báo biến trong Js.

## 2 Khác nhau
### 2.1 var
**var** là từ khóa lâu đời nhất của Js. Đặc điểm khi khai báo bằng var là biến đó sẽ có **globally scoped** hoặc **locally scoped** khi khai báo trong một hàm. Điều này có nghĩa là khi khai báo bằng **var** thì biến đó không bị giới hạn phạm vi trong scoped cha gần nhất mà sẽ là ở **globally scoped** hoặc **locally scoped**. 

Lấy một ví dụ đơn giản: 
``` js
var hello = "Hello World";

if(true){
    var hello = "Hello everyone";
}

console.log(hello);

// Kết quả: Hello everyone
```

Không tin ư? Hãy thử ngay đoạn code trên console của chrome và xem kết quả.
Điều này đã dẫn đến sự ra đời của let và const.

### 2.2 let
Với bất cập ở trên, ES6 đã giới thiệu một cách khai báo biến mới với scoped giới hạn hơn và đó chính là **let**. Biến được khai báo bằng let chỉ có phạm vi **block scoped**. Hiểu một cách nôm na thì khai báo biến bằng let tương tự như khai báo bằng var nhưng phạm vi của biến khai báo bằng **let** chỉ có gọi được trong cặp ngoặc kép `{}` bao quanh nó.

### 2.3 const
Cùng với **let**, **const** cũng được giới thiệu trong ES6 được sử dụng khi muốn khai báo một hằng. Nói cách dễ hiểu hơn thì **const** cũng giống **let** nhưng không thể thay đổi được giá trị của biến đó sau khi khai báo. Và **const** cũng có phạm vi là **block scoped** giống **let**.

## Hết