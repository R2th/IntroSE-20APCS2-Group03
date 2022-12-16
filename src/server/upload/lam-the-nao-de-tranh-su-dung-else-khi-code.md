Chúng ta thường hay sử dụng `else` mỗi khi viết code về những câu điều kiện. Rất có thể là do thói quen và bạn cũng không bận tâm đến một vài vấn đề khi sử dụng. `Else` dường như là giải pháp cơ bản nhất mỗi khi giải quyết một câu điều kiện bởi đơn giản khi mới đầu học lập trình, thì đại đa số các tài liệu luôn dạy bạn sử dụng cú pháp if-else.<br/>
Việc sử dụng `else` trong mã code của bạn có vẻ là vô hại, nhưng nó có thực sự như vậy không ?<br/>
Nhưng khi bạn thử đọc kỹ lại đoạn mã của mình, bạn sẽ nhận ra hầu hết việc dùng `else` là dư thừa. Nó khiến đoạn mã của bạn dài một cách không cần thiết, khó đọc, và có vẻ phức tạp hơn bình thường.<br/>
Mặc dùng code của bạn vẫn có thể dễ đọc hơn mỗi khi sử dụng chỉ duy nhất một câu lệnh if-else. Nhưng khi lồng if-else vào trong một khối `else` hoặc `if` thì sẽ không dễ để đọc lại nó đâu.<br/>
Nếu chúng ta biết cách loại bỏ những khối `else`, code của bạn sẽ trở nên dễ đọc hơn hẳn. Trên hết, việc này cũng phần vào giúp mã code của bạn trở nên dễ hiểu hơn đối với các lập trình viên khác <br/>
Đó là lý do tại sao chúng ta nên xem xét và sử dụng những cách dưới đây để có thể tránh sử dụng `else` trong đoạn code của bạn. Phần nào cũng khiến đoạn mã bạn viết ra trở nên quý tộc hơn.<br/>
#### Sử dụng Returns
Dạng phổ biến nhất của câu lệnh if-else trông thực sự đơn giản.
```javascript
if (someCondition) {
   // 10 lines of code
} else {
   // More code..
}
```
Không quá khó hiểu đúng không. Có thể nói mọi dev đều viết code giống như thế này trước đây. Hầu hết dev viết code như thế này hàng ngày mà không cần suy nghĩ quá nhiều.<br/>
Nhưng sẽ trông như thế nào khi chúng ta loại bỏ đi khối `else` đó?<br/>
Thay vì sử dụng `else`, chúng ta có thể sử dụng một câu return. Điều này sẽ giúp lại bỏ đi `else` và cũng tránh bị thụt lề không cần thiết.<br/>
Đây là cách chúng ta có thể sử dụng `return` để lại bỏ `else`:
```javascript
if (someCondition) {
   // code in here
   return;
} 
// More code..
```
#### Sử dụng các giá trị mặc định
Các câu lệnh if-else được sử dụng rất nhiều để gán các biến - mà không có ý nghĩa. Có thể bạn đã từng thấy đoạn code như thế này trước đây chăng:
```javascript
if (someCondition) {
   number = someNumber * 2
} else {
   number = 1
}
```
Nếu bạn thấy đoạn code như trên thì hãy thay đổi nó nhé. Các để loại bỏ `else` là gán luôn một giá trị mặc định.
```javascript
number = 1
if (someCondition) {
   number = someNumber * 2
}
```
Trông đoạn code của bạn trở nên đẹp hơn rồi đúng không?<br/>
Loại bỏ khối `else` và thay vào đó một giá trị mặc định có hai lợi thế chính. Điều đầu tiên là định nghĩa rõ phạm vi của một biến. Khi sử dụng giá trị mặc định, biến sẽ có sẵn luôn cả bên ngoài câu lệnh if-else. Điều thứ hai là giảm số dòng code đi đáng kể, điều này cũng phần nào khiến code dễ đọc hơn, giảm dòng code đồng thời cũng giảm khả năng có bug.<br/>
Có một cách để tối ưu hóa đoạn code này hơn nữa, đó là chúng ta có thể thay thế đoạn code trên bằng cách sử dụng toán tử ba ngôi:
```javascript
number = someCondition ? someNumber * 2 : 1;
```
#### Guard clauses
`Guard clauses` còn được gọi là return sớm. Ý tưởng đằng sau việc return sớm là bạn viết các hàm mà trả về kết quả mong đợi sẽ ở cuối hàm đó. <br/>
Phần còn lại của đoạn code, ở trên cùng của hàm, sẽ thực hiện việc kết thúc hàm càng sớm càng tốt (thường thì là những case trái với mục đính của hàm).<br/>
Một hàm return sớm sẽ làm đúng như tên gọi của nó. Đây là những gì cần có của một hàm return sớm:
```javascript
function someFunction() {
    if (!someCondition) {
        return;
    }    
    // Do something
}
```
Các `Guard clauses` được rất nhiều lập trình viên ưa chuộng vì chúng đã chỉ rõ ràng rằng phương thức hiện tại là sẽ bỏ qua những case không liên quan. Nếu bạn muốn thực thi phương thức, bạn phải đáp ứng các tiêu chí nhất định. Nếu không, bạn sẽ return sớm.<br/>
Như mọi khi, vẫn có nhiều giải pháp hơn có thể. Bạn cũng có thể chọn đảo ngược mệnh đề bảo vệ (guard clause) trong giống như sau:
```
function someFunction() {
    if (someCondition) {
        // Do something
    }
}
```
Cá nhân mình thì thích dùng return sớm hơn. Một trong những lý do mà bạn có thể cân nhắc sử dụng return sớm là nó giữ cho đoạn mã của bạn trông gọn và đẹp mắt hơn. Không cần thụt lề bổ sung mà bạn sẽ có nếu bạn sử dung if-else lồng nhau. Điều này cũng giúp đoạn code của bạn dễ đọc hơn.<br/>
Trên hết, sử dụng return sớm mang lại sự an tâm cho lập trình viên hơn. Cũng dễ hiểu thôi, bằng cách return sớm, bạn sẽ loại bỏ được các trường hợp không hợp lệ đầu tiên, đặt một dòng trống vào ngay sau đó, và sau cùng bạn có thể tập trung vào phần chính của hàm đó.
#### Quá nhiều thứ đang diễn ra ở đây
Ví dụ cuối cùng về sử dụng câu lệnh if-else không phù hợp khi bạn có quá nhiều thứ cần xử lý trong một đoạn code. Có thể bạn cũng đã từng gộp những đoạn code chả liên qua gì đến nhau vào if-else như này không:
```
if (...) {
    for(var i = 0; i < someArray.length; i++) {
        var isValid = hasValid(someVar[i]);
        if (!isValid) {
            toBeDeleted.push(someVar[i]);
        }
    }
}
else {
    var service = initSomeService();
    service.doSomeStuff();
    if (service.someCondition != null) {
        service.scheduleNextTask();
    }
}
```
Bạn thấy đấy, có quá nhiều thứ đang được xử lý trong khối `if` trong khi những thứ đó lại chả liên quan gì đến khối `else`. Việc kết hợp hai khối mã hoàn toàn không liên quan sẽ khiến nó khó hiểu và rất dễ xảy ra lỗi. Cuối cùng nhưng cũng không kém phần quan trọng,  sẽ rất khó đề tìm ra một cái tên phù hợp cho phương pháp này.<br/>
Cách tốt nhất để khắc phục điều này là tái cấu trúc lại đoạn mã của mình bằng cách cố gắng phân chia mục đích cụ thể cho từng đoạn mã của bạn thôi @@.
##### Bài này viết này được tham khảo từ [đây](https://levelup.gitconnected.com/how-you-can-avoid-using-else-in-your-code-871197a1adbc)