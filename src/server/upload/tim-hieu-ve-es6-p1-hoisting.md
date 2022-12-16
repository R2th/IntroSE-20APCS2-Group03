## Hoisting
Trước khi đi vào tìm hiểu **hoisting** là gì, chúng ta hãy cùng xét một số ví dụ dưới đây:<br/>
```
# Ví dụ 1:
    console.log(x);
    result: x is not defined
```
Ở ví dụ 1, biến x chưa được khai báo nên chương trình trả về lỗi.
```
# Ví dụ 2:
    var x;
    console.log(x);
    result: undefined
```
Ví dụ 2, biến x được khai báo ở đầu nhưng chưa được gán giá trị. Chương trình chạy bình thường và trả về **undefined**
```
# Ví dụ 3:
    console.log(x);
    var x = 5;
    result: undefined
```
Ví dụ 3, biến x được khai báo ở cuối và được gán giá trị. Chương trình chạy bình thường và cũng trả về **undefined**.<br/>
Câu hỏi đặt ra ở đây là **vì sao biến x được khai báo sau nhưng chương trình lại không trả về lỗi như ở ví dụ 1** ? Để giái thích cho điều kì diệu này, chúng ta hãy cũng tìm hiểu về khái niệm **hoisting** trong javascript . <br/>
### Hoisting là gì?
**Hoisting** là  khái niệm chỉ việc mọi **khai báo biến (với từ khóa var) sẽ được chuyển lên trên cùng của hàm**. Điều này có thể xảy ra khi chúng ta **khai báo cùng 1 biến var nhiều lần**<br/> Cùng xét lại **ví dụ thứ 3** để thấy rõ hơn điều này:
```
console.log(x);
var x = 5;
```
Ở đây, thay vì chương trình không hiểu x là gì (**x is not defined**), thay vào đó chương trình trả về kết quả **undefined**. Nguyên nhân là do việc khai báo của x đã được chương trình chuyển lên đầu hàm như khái niệm hoisting ở trên, do vậy đoạn code trên của chúng ta thực chất sẽ như sau:
```
var x;
console.log(x);
x = 5;
```
Như vậy, **chương trình chỉ chuyển khai báo biến x lên trên, còn việc gián giá trị vẫn được thực hiện ở vị trí cũ**.<br/>
Chúng ta cùng xét 1 ví dụ nữa để hiểu rõ về tác động của hoisting nhé.
```
# Ví dụ 4:
    var x = 5;

    function run() {
      console.log(x);
      var x = 10;
    }

    run();
```
Ở ví dụ này, do đã khai báo biến x là global nên ta mong muốn kết quả trả về sẽ là 5.<br/>
Hãy cùng chạy chương trình bên trên. Ồ, lúc này chương trình lại trả về cho ta giá trị là **undefined**. Tại sao lại vậy nhỉ ?<br/>
Như khái niệm hoisting mình đã trình bày ở trên, lúc này đoạn code của chúng ta sẽ trở thành thế này:
```
# Ví dụ 4:
    var x = 5;

    function run() {
      var x
      console.log(x);
      x = 10;
    }

    run();
```
Nhìn vào đoạn coden này, chúng ta có thể thấy biến x lại được khai báo ở đầu hàm run() một lần nữa. Vì ở đây, **scope** của **var x = 10** lúc này là hàm **run()**, cho nên **biến x lại được khai báo trên đầu scope của nó**. Dẫn tới biến x chỉ được khai báo một cách cục bộ nhưng chưa được chưa gán giá trị, làm cho chương trình trả về undefined<br/><br/>
### **Kết luận**: 
<br/>**hoisting** có thể khiến cho chương trình của chúng ta khai báo 1 biến nhiều lần ở trong và ngoài **scope** nào đó làm cho chương trình trả về kết quả không như mong muốn. <br/><br/>
**Giải pháp**:<br/> **Hoisting chỉ diễn ra đối với trường hợp khai báo biến var**. Do đó, để tránh điều này, chúng ta có thể **khai báo các biến ở đầu hàm**, hoặc **sử dụng let và const để thay thế cho var** - trong phần tiếp theo mình sẽ có bài viết nói về cách sử dụng let, const và var.<br/><br/><br/>
Trên đây là những kiến thức của mình về hoisting. Hy vọng qua bài viết này, các biện sẽ nắm được kiến thức về hoisting trong javascript. Mọi thắc mắc cần giải đáp hãy để lại comment ở phía dưới nhé!<br/>
Tham khảo: [https://www.youtube.com/watch?v=8aoGOSDdVbk&list=PLkY6Xj8Sg8-tVbSFcv-p1yOaHiG8fo0kP&index=2](https://www.youtube.com/watch?v=8aoGOSDdVbk&list=PLkY6Xj8Sg8-tVbSFcv-p1yOaHiG8fo0kP&index=2)