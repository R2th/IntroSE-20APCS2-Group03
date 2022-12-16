# So sánh về Function Declarations và Function Expressions
![](https://images.viblo.asia/2edc890e-b016-4c16-aa83-140f4e5de63c.png)   

### Mục tiêu bài viết:  
Giúp bạn hiểu chắc hơn về javascript và biết được khi nào dùng cách này, khi nào dùng cách kia.  
Tránh bị claim khi được review code.  

### Khái niệm bạn cần hiểu trước khi đọc tiếp.
* [Hoisting trong javascript](https://www.w3schools.com/js/js_hoisting.asp)
Hoisting cũng là một phần khác biệt của javascript khác biết so với cách ngôn ngữ lập trình khác.      

Các bạn thử đọc nhé, có gì thắc  mắc có thể comment trao đổi ở dưới bài viết với mình nha.  

**OK, giờ thì đi thôi!    **:1234:   

À, nếu bạn chưa biết như thế nào là Function Declarations và như thế nào là  Function Expressions  thì để mình gợi ý lại cho bạn nhé.     
Mình sure là bạn từng viết nó rồi nhưng có thể quên và không biết gọi nó là gì thôi :D  
#### 1.  Function Declarations 
```Javascript
function test() {
    console.log("Đây là Function Declarations")
}
```
Cách khai báo này thì ai cũng biết rồi nhỉ :D

#### 2.  Function Expressions 

```Javascript
var test = function(){
    console.log("Đây là Function Expressions")
}
```
Với cách khai báo này:
* toàn bộ function statement của bạn sẽ được lưu vào trong biến **test**. 
* Hàm của bạn cũng ko cần có tên, vì nó sẽ được gọi thông qua biến **test**.

### Vậy khác biệt giữa 2 kiểu khai báo này là gì ?
1. Function Declarations luôn được ưu tiên load(biên dịch) trước. Còn Function expressions  nó sẽ được load theo đúng thứ tự, khi nào trình biên dịch chạy tới dòng đó thì nó mới được load.
2. Tương tự như các biến khai báo bằng var, declarations function cũng được hoisted lên trên code khác, còn Function expressions  thì ko được hoisting.  

Xem qua ví dụ sau để hiểu hơn nhé.    
Bạn sẽ không hề gặp lỗi gì khi thực thi lời gọi hàm ngay cả trước khi code khởi tạo hàm.  
Lý do là trình biên dịch đã ngầm dịch chuyển khai báo hàm test lên trước khi hàm được gọi. 
```Javascript
test(); 
function test() {
    return "Đây là Function Declarations"
}

Result: Đây là Function Declarations
```

Còn với ví dụ bên dưới bạn hiển nhiên sẽ ăn ngay một lỗi vì nó ko tìm thấy hàm test ở thời điểm bạn gọi nó.

```Javascript
test(); 
var test = function(){
    console.log("Đây là Function Expressions")
}

Result: error: Uncaught TypeError: test is not a function
```

Hy vọng tới đây bạn cũng đã hiểu rồi.  

### Vậy khi nào nên dùng Function Declarations và khi nào nên Function Expressions.
Theo cá nhân mình:
Mình hay dùng Function Declarations khi muốn biến các functions đó ở dạng global, có thể gọi ở bất kì đâu.  
Còn Function Expressions thì dùng trong các trường hợp như: 
1. Muốn dùng function đó được truyền vào 1 function khác (callback chẳng hạn)
2. Khi muốn dùng nó như 1 closure
3. ...một vài trường hợp khác mình ko nhớ, nhờ bạn comment giúp mình nhé.  

Việc kết hợp dùng thêm Function Expressions thay vì lúc nào cũng Function Declarations sẽ code của bạn clean hơn và dễ kiểm soát code hơn. 

Cảm ơn bạn đã đọc tới đây.  
Trên đây là những gì mình hiểu, có thể có chỗ chưa đúng.  
Rất mong nhận được chia sẻ của bạn...   
Thanks!