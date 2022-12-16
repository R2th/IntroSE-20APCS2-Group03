### Mở đầu
Nếu bạn đã từng vọc vạch về js chắc hẳn các bạ cũng đã từng thấy qua về arrow function kiểu như thế này => () và bạn tự hỏi nó là cái gì? <br>

Nhưng thực sự thì arrow function hoạt động như thế nào? Nó có tác dụng gì? Tại sao phải thay đổi từ function bình thường qua sử dụng nó? Và điều quan trọng hơn là chúng ta có thể bắt đầu sử dụng nó như thế nào?

<br>

Để trả lời những câu hỏi trên, hãy khoan nói về nó, chúng ta sẽ coi nó như là một cái gì đó mới mà chúng ta chưa từng sử dụng trong js. 

### Arrow function là gì?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Một arrow function là một hàm biểu diễn chính xác của anonymous function (hàm không tên). Nó là một function không được khai báo độc lập  và không phụ thuộc vào chính nó (this). Có nhiều hàm biểu thức áp dụng tốt cho hàm không tên ( không có tên phương thức), nhưng chúng lại không thể sử dụng như một hàm khởi tạo. Arrow function có biểu thức ngắn gọn hơn, đơn giản hơn và từ khóa this. Khi sử dụng arrow function chúng ta sẽ giảm bớt được viết thêm từ khóa funtion và từ khóa return và dấu ngoặc nhọn.

### Cú pháp
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cách hàm ẩn danh được sử dụng  phổ biến nhất khi một phương thức chấp nhận một hàm là một tham số và hàm đó không được sử dụng nhiều lần.
<br>
Cú pháp căn bản:
```js
   function showFullname(firstName, lastName) {
       return firstName + ' ' + lastName;
   }
   
   console.log(showFullName('Nguyen', 'Hai'));
   // Nguyen Hai
```

Dùng arrow function:
```js
    let fullname = (firstName, lastName) => (
        firstName + ' ' + lastName;
    )
    
    console.log(fullname('Nguyen', 'Hai'));
    // Nguyen Hai
```
So sánh 2 đoạn code trên thì chúng ta có thể thấy cùng ra 1 kết quả nhưng cách thứ 2 sẽ ngắn hơn.
<br>
- Nếu trong trường hợp có 1 tham số ta sử dụng như sau:
```js
    let fullname = fullname => (fullname);

    console.log(fullname('Nguyen Van A'));
    //Nguyen Van A
```
- Nếu không có tham số ta ko cần truyền vào gì cả.
```js
    let fullname = () => ('Nguyen Van A');
    
    console.log(fullname());
    //Nguyen Van A
```

- Chú ý nếu ta cần return ngay thì ta sẽ dùng cặp ngoặc đơn () luôn. Còn khi nào chúng ta cần sử lý logic xong mới return thì ta sẽ cần sử dụng cặp dấu ngoặc nhọn {}.
<br>Ví dụ:
<br>
```js
let hello = (firstName, lastName) => {
    return firstName.toLowerCase() + ' ' + lastName.toLowerCase();
}

console.log(hello('Nguyen', 'VAN A'));
// nguyen van a
```

Cặp dấu ngoặc đơn sẽ cần chúng ta return luôn, không được xử lý gì trước đó cả.

```js
// Cú pháp sai
let hello = (firstName, lastName) => (
    let b = 2;
    firstName.toLowercase() + ' ' + lastName.toLowercase();
)
```
- Một vài lưu ý khác:
    - Đóng arrow function <br>
     Trường hợp bạn sử dụng arrow function bên trong một hàm hoặc sử dụng dạng một biến thì ban phải dùng cặp đóng mở để bao quanh lại.
      ```js
        console.log(typeof () => {}); // Cú pháp sai
        console.log(typeof (() => {})); // Cú pháp đúng
      ```
      Trong ví dụ trên thì ví dụ đầu tiên sai vì arrow function được sử dụng này như một tham số, vì vậy bạn phải đặt nó bên trong cặp đóng mở như ở ví dụ 2. Trường hợp bạn không muốn đặt nó bên trong cặp đóng mở thì ban phải khai báo arrow function thành một biến như ví dụ dưới đây, tuy nhiên nhìn rất rườm rà. <br>
       ```js
            var x = () => {}
            console.log(typeof x);
       ```
     - Ràng buộc mũi tên: <br>
     Đúng với cái tên của nó là hàm mũi tên và mũi tên này rất khó chịu về cú pháp sử dụng, bạn phải đặt mũi tên cùng hàng với tên hàm.
         ```js
               const func1 = (x, y) // Sai
               => {
                   return x + y;
               };
               
               const func2 = (x, y) => // Đúng
               {
                   return x + y;
               };
               
               const func3 = (x, y) => { // OK
                   return x + y;
               };

               const func4 = (x, y) // Sai
               => x + y;
               
               const func5 = (x, y) => // Đúng
               x + y;
         ```
   - Nếu bạn muốn xuống hàng mà không bị lỗi thì phải sử dụng cú pháp sau: <br>
       ```js
       const func6 = ( // Đúng
            x,
            y
        ) => {
            return x + y;
        };
       ```
 - Khắc phục nhược điểm với this trong closure function: <br>
 Nếu bạn đã từng đọc qua bài viết hàm bind trong javascript thì từ version ES5 trở về trước sẽ có nhược điểm với đối tượng this đó là phạm vi hoạt động, và trong ES5 có sử dụng hàm bind để khắc phục. Vấn đề này được khắc phục hoàn toàn trong ES6 bằng cách sử dụng hàm arrow function.
 ```js
 var person = {
    firstName: "Nguyen",
    lastName: "Van", 
    showFullName : function (callbackFunction) {
        callbackFunction();
    },
    render : function () {
        this.showFullName(function () {
           console.log(this.firstName + ' ' + this.lastName); // this chính là person
        }.bind(this)); // phải sử dụng hàm bind thì đối tượng this mới chính là person
    }
};
 
person.render();
// Nguyen Van
 ```
 Còn trong ES6 sẽ được viết như sau:
 ```js
 var person = {
    firstName: "Nguyen",
    lastName: "Van", 
    showFullName : function (callbackFunction){
        callbackFunction();
    },
    render : function(){
        this.showFullName((() => {
           console.log(this.firstName + ' ' + this.lastName); // this chính là person
        }));
    }
};
 
person.render();
//Nguyen Van
 ```
 
 Cú pháp này sẽ được sử dụng nhiều khi bạn học reactjs. Chú ý nhé. :D
 
 Lưu ý: <br>
&nbsp;&nbsp;&nbsp;&nbsp; Arrow function không thể được sử dụng làm constructor như function. Nếu khởi tạo new với arrow function, nó sẽ throw ra lỗi. Arrow function không có thuộc tính prototype hay internal methods. Trong trường hợp đó nên dùng cú pháp tạo class của ES6.