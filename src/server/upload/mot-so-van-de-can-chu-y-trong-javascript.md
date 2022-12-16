## 1.  Vấn đề đầu tiên: Scope của biến
Scope trong Javascript có một chút khác biệt so với các ngôn ngữ lập trình khác, Scope trong Javascript có phạm vi nằm trong hàm (function scope):
*  Biến được khai báo bên trong hàm sẽ là biến cục bộ, và biến cục bộ thì có thể được truy cập bên trong hàm (không có khái niệm scope trong 1 khối lệnh).
*  Biến được khai báo bên ngoài hàm sẽ là biến toàn cục, và có thể được truy cập từ bất cứ đâu.

Chú ý: biến khai báo bên trong hàm mà không có từ khoá “var” cũng sẽ trở thành biến toàn cục. Ngoài ra, việc khai báo “var” mà lại không nằm trong function nào thì biến cũng sẽ mang scope toàn cục.

xét một ví dụ: 
```
function testScope()
{
    var local_var_1 = global_var_1 = "inside_function";
    if(true){
        var local_var_2 = "inside IF";
    }
    console.log("Test local_var_1 inside function: " + local_var_1);
    console.log("Test local_var_2 inside function: " + local_var_2);
}
```
thử chạy lần lượt các câu lệnh dưới đây để hiểu về scope của biến :)
```
testScope();
console.log("Test local_var_1 outside function: " + local_var_1);
console.log("Test global_var_1 outside function: " + global_var_1);
```
Vấn đề về scope trong Javascript có đôi chút nhập nhằng, do vậy mà mọi người luôn dùng từ khoá var để khai báo biến nhằm tránh các tình huống biến trở thành biến toàn cục có thể dẫn tới những lỗi rất khó để phát hiện. Ngoài ra nên dùng thêm từ khoá “use strict” để sử dụng Javascript với strict mode, mode này sẽ yêu cầu bạn phải khai báo tường minh tất cả mọi thứ để tránh các lỗi tiềm tàng có thể xảy ra.

## 2. Khái niệm hoisting
 Khi code sử dụng javascript, có một khái niệm cũng khá là đặc biệt là hoisting. Với khái niệm này, javascript quy định, mọi khai báo biến đều được đưa lên trên cùng của một tầm vực. Tức là mặc kệ bạn khai báo biến ở vị trí nào trong 1 hàm, thì tự động nó sẽ kéo lên trên cùng của hàm để khai báo (javascript tự động thực hiện ngầm cho khái niệm này).

Khái niệm hoisting này cũng là một khái niệm khác biệt của Javascript, nhiều lập trình viên thường bỏ qua vấn đề này, và đây cũng là 1 trong những nguyên nhân gây ra lỗi rất khó phát hiện ở trong ngôn ngữ lập trình này. ví dụ:
```
var test1;
console.log(test1);

console.log(test2);
test2;

console.log(test3);
```
kết quả trả về lần lượt là :
```
undefined
undefined
test3 is not undefine
```
Ở câu lệnh 1 kết quả trả về khá dễ hiểu vì chúng ta đã khai báo biết nhưng chưa gán giá trị cho biến test1 tương tự ở câu lệnh 3 chúng ta chưa khai báo biến test3 nhưng ở câu lệnh 2 rõ ràng chúng ta khai báo biến test2 sau khi chạy lệnh console nhưng kết quả trả về vẫn giống câu lệnh 1 đó chính là hoisting trong JS. về bản chất code sẽ chạy như sau: 
```
var test2;
console.log(test2);
```
Ngoài hoisting variable thì còn có hoisting function các bạn có thể tìm hiểu thêm.
## 3. Về Native method, khái niệm Object và Prototype của Object
Chúng ta thử chạy đoạn lệnh dưới đây và giải thích kết quả xem nào:
```
var num = 5;
typeof(num);          //”number”
 
//chạy lệnh lấy bình phương của số đó
num.square();        // Uncaught TypeError: num.square is not a function
```
Mọi người thử trả lời câu hỏi tại sao lệnh lấy bình phương square() lại báo lỗi? Nếu bạn cho rằng kiểu dữ liệu number không có sẵn phương thức square() thì bạn đã trả lời đúng rùi đấy. Vậy câu hỏi đặt ra tiếp theo là: làm thế nào để ta khiến cho câu lệnh đó thực thi đúng như mong đợi? 
một trong số cách để giải quyết: 
```
Number.prototype.square = Number.prototype.square || function(){return this*this;};
 
//Gọi thử lệnh để xem kết quả xem nào:
num.square();               //25
```
Công việc chúng ta vừa làm ở trên là: xây dựng thêm một native method cho kiểu dữ liệu number, đây thực chất là việc thêm một phương thức prototype cho đối tượng built-in là Number.

Như bạn đã thấy, để có thể đưa ra giải pháp ở trên, chúng ta cần các kiến thức về khái niệm Object và prototype của Object trong Javascript. Những thuộc tính và phương thức trong prototype của object sẽ được các object con kế thừa. Đây chính là 1 đặc điểm hết sức khác biệt nữa của Javascript: nó là một ngôn ngữ sử dụng kế thừa kiểu object-based (không giống class-based như các ngôn ngữ OOP truyền thống).

## 4. Con trỏ this
Con trỏ this được sử dụng rất nhiều trong các đoạn mã JS, và nó cũng là một trong những khái niệm gây ra nhiều sự hiểu lầm (dẫn đến bug) nhất trong ngôn ngữ này. Để lập trình tốt bằng Javascript thì người lập trình viên buộc phải hiểu rõ cách mà con trỏ this vận hành.

Trong các ngôn ngữ OOP điển hình như C++, PHP, Java, … khái niệm con trỏ “this” tương đối dễ hiểu, nó gắn liền với thực thể (instance) đang được kích hoạt. Ở javascript thì mọi chuyện có vẻ phức tạp hơn, giá trị của this gắn liền với context mà nó được gọi, xét thử đoạn code sau:
```
var name = "Peter";
var Hocsinh = {
    name: "John",
    printName: function(){
        console.log(this.name);
    }
};
 
//Lệnh gọi đầu tiên
var printHocsinhName = Hocsinh.printName;
printHocsinhName();                          // Peter
 
//Lệnh gọi thứ 2
Hocsinh.printName();                         // John
```
Như ta đã thấy, kết quả của 2 lần gọi hàm này cho ta 2 kết quả khác nhau. Tại sao lại như vậy? 
 Ở lần gọi đầu tiên, hàm này được kích hoạt không bởi đối tượng cụ thể nào, tức là context của hàm printName được gán là biến toàn cục window, trong khi đó đối tượng gọi hàm ở lần chạy thứ 2 là đối tượng Hocsinh, do vậy mà giá trị của this sẽ có giá thị của đối tượng Hocsinh.

Sự nhập nhằng của giá trị this trong Javascript có thể khiến lập trình viên bối rối, và nếu bạn muốn  nâng cao kĩ năng viết code Javascript của mình, thì nên đầu tư tìm hiểu khái niệm này kĩ hơn.

## 5. Bind(), Call(), Apply()
 Đi kèm với các hàm này là vấn đề liên quan tới giá trị của con trỏ “this”, ta xem lại ví dụ ở trên, lí do mà 2 lần gọi hàm ta được 2 kết quả khác nhau là bởi vì context của con trỏ this ở 2 tình huống là khác nhau. Nếu ta muốn kết quả in ra đúng với ý định của mình, thì ta có thể gán context cho con trỏ this một cách tường minh bằng các hàm bind(), call() hoặc apply().

 Bây giờ thử trả lời câu hỏi: làm thế nào cả lệnh gọi printHocsinhName cho ta kết quả là “John”, và làm thế nào để ta có thể gọi hàm Hocsinh.printName mà lại có kết quả là “Peter”???

```
//Cách thứ nhất
var printHocsinhName = Hocsinh.printName.bind(Hocsinh);
printHocsinhName();                                      // John
 
//Hoặc cách thứ 2
var printHocsinhName = Hocsinh.printName;
printHocsinhName.call(Hocsinh);                          // John
 
//Xử lí Hocsinh.printName
Hocsinh.printName.call(window);                           //Peter
```
Bản chất của câu hỏi này nhằm kiểm tra các kiến thức của bạn về khái niệm context của con trỏ this khi được gọi, và các cách thức để kiểm soát được giá trị này một cách chặt chẽ hơn. Cả 3 hàm này đều có ý nghĩa là gán giá trị của con trỏ this khi được chạy tới một giá trị cụ thể nào đó, và nếu bạn nắm được khái niệm context của con trỏ this, bạn sẽ giải quyết được câu hỏi này cách dễ dàng.

Nhắc lại 1 chút, bản thân một hàm (function) cũng là 1 object trong Javascript, vậy nên chúng ta sẽ rất hay bắt gặp các tình huống làm thay đổi context của hàm như: truyền qua object function, hàm mượn, callback, … Nắm được cách sử dụng các hàm bind(), call(), apply() sẽ giúp chúng ta kiểm soát tốt và đảm bảo được kết quả chạy của các hàm đúng với mong muốn. Mọi người có thể xem thêm chi tiết tại đây (LINK)

Ngoài ra, các vấn đề về cơ chế xử lí bất đồng bộ như: các thao tác gọi xử lí AJAX, các kiểu Promise hỗ trợ thực thi bất đồng bộ và giúp tránh callback hell, v.v.v cũng là nhưng thứ nên tìm hiểu khi sử dụng JS

nguồn bài viết tham khảo:
* https://nhungdongcodevui.com/2016/12/11/vuot-qua-cac-bai-phong-van-javascript/
* https://phuphan.info/2017/12/28/khai-niem-hoisting-trong-javascript/
* https://kipalog.com/posts/Con-tro-this-trong-Javascript