Một trong những công cụ mạnh mẽ và được sử dụng nhiều nhất của các ngôn ngữ lập trình chính là các câu lệnh điều kiện, tạo ra các nhánh code chỉ được chạy khi đáp ứng một số điều kiện nhất định.
Javascript có 3 loại điều kiện chính: khối if/else, switch statements và biểu thức điều kiện. 3 câu lệnh này có thể giúp bạn tạo ra được những dòng code rất awsome!

Giống như những câu lệnh khác, một câu lệnh điều kiện không được tối ưu sẽ rất dễ gây ra lỗi và khó tối ưu sau này. Vậy nên dưới đây, mình xin phép được giới thiệu một số cách viết áp dụng vài nguyên tắc cơ bản để giúp chúng ta tối ưu được những câu lệnh điều kiện này một cách tốt nhất.

## Khái niệm cơ bản nhất của Javascript Conditionals
Như mình đã nói trước đó,  Javascript *( JS )* có 3 loại điều kiện chính. Đầu tiên chính là câu lệnh if/else. Định nghĩa về câu lệnh này rấy đơn giản: Nếu điều kiện đúng , đoạn code trong đó sẽ được chạy. Ví dụ:

```
if (condition){
   // code sẽ được chạy nếu như điều kiện là đúng
}
```

Ta cũng có thể chạy thêm đoạn mã khác dựa trên cùng một điều kiện, bằng cách thêm từ khoá `else`, như ví dụ dưới đây:

```
if (condition){
   // code sẽ được chạy nếu như điều kiện là đúng
} else {
   // nếu không đáp ứng điều kiện trên nó sẽ chạy xuống đâyyy
}
```

Bạn cũng có thể thêm nhiều điều kiện bằng cách sử dụng các câu lệnh `else/if` như dưới đây:

```
if (condition){
   // code sẽ được chạy nếu như thoả mãn condition
} else if(condition2) {
   // nếu không đáp ứng điều kiện trên nó sẽ chạy xuống đâyyy
   // và kèm thêm thoả mãn condition2
} else {
   // Nếu không vô 2 cái kia thì sẽ chạy vào đây
}
```

Câu lệnh switch, nó kiểm tra giá trị của 1 hoặc nhiều `case` đối với `expression`. Nếu không có case nào thoả mãn, thì bạn có thể cung cấp một case mặc định - được gọi là `default`:

```
switch(expression){
   case value1:
     // code được thực thi nếu khớp với value1
     break; 
   case value2:
     // code được thực thi nếu khớp với value2
     break;
   default:
     // code code được thực thi nếu ko thoả mãn những case trên
     break;
}
```

Một trong những lưu ý quan trọng nhất của switch statements chính là `break` or `return`.  Chúng sẽ giúp ngắt việc thực thi case không thoả mãn và tiếp tục chạy xuống những case phía dưới. Ví dụ:

```
const name = "Jim";
switch(name){
   case "Mark":
     // This code will not run
   case "Jim":
     // This code and all other code after will run
   case "Sarah":
     ...
   default:
     ...
}
```

Kiểu điều kiện cuối cùng chính là biểu thức điều kiện. Chúng cũng là một cách hay được sử dụng để đơn giản hoá mệnh đề if/else. 

```
const myValue = condition ? valueIfTrue : valueIfFalse;
```

## Best Practices cho Conditionals

 Nếu như không được tối ưu và sử dụng đúng cách, các câu lệnh điều kiện sẽ là một cản trở khó chịu trong quá trình xây dựng sản phẩm của bạn. Để giảm trừ điều này, có một vài nguyên tắc mà bạn nên tuân theo để tránh cho những câu lệnh điều kiện mà bạn viết ra trở thành một mớ hỗn độn.
 
 1. Đừng sử dụng câu lệnh `If` để gán giá trị có điều kiện. Ví dụ:
 ```
    let myVal
    if (condition) {
       myVal = valueIfTrue
    } else {
       myVal = valueIfFalse
    }
 ```
 
 Với bài toán trên, bạn nên xử lý như thế này:
 
 ```
 const myVal = condition ? valueIfTrue : valueIfFalse
 ```
 
 2. Tránh lồng quá nhiều if/else. Về bản chất, `else/if`  là một khối `if` lồng nhau. Ta thường viết nó như thế này:

```
let result
if (condition) {
   // calculate result_v1
} else if (condition2) {
   // calculate result_v2
} else {
   // default calculation
}
return result
```

Thực tế, nó chính là như thế này:

```
let result
if (condition){
   // calculate result_v1
} else {
   if(condition2) {
      // calculate result_v2
   } else {
      // default calculation
   }
}
return result
```

Với đồng bùng nhùng bên trên, ta có thể viết lại chúng như sau:

```
if (condition) {
   // return calculated result_v1
}

if (condition2) {
   // return calculated result_v2
}

// return default calculation
```

Một cách khác để tránh những If blocks lồng nhau, đó chính là sử dụng switch statements, như dưới đây:

```
switch (expresion){
   case one:
     // return calculated result_v1
   case two:
     // return calculated result_v2
   default:
     // return default calculation
 }
```

Trên đây là một số chia sẻ về câu lệnh điều kiện trong JS cũng như một số nguyên tắc nhỏ trong việc viết chung. Bài viết còn nhiều thiếu sót, mong sẽ nhận được ý kiến đóng góp từ mọi người.

Tham khảo: [How to Make Your Conditional Statements Easier to Read in JavaScript](https://medium.com/the-non-traditional-developer/how-to-make-your-conditional-statements-easier-to-read-in-javascript-6e8c3f5e44f6)