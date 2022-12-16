### Javascript compiler
Khi bắt đầu học một ngôn ngữ mới, chúng ta thường được dạy cách khai báo biến là như thế nào. Việc khai báo biến thật dễ! Chúng ta ai cũng bị lừa như thế. Tại sao tôi lại gọi như vậy? Bởi vì bạn sẽ khai báo được một biến, nhưng sẽ không thể hình dung được tại sao lại khai báo như thế, và hiểu được cách mà chương trình chúng ta chạy.

Đầu tiên, hãy nhìn vào hai đoạn code bên dưới, và dành một phút để đoán xem kết quả ra gì.
```
var x = 3;
function myFunc(y) {
    if (y) {
        var x = 5;
        return x;
    }
    return x;
}
myFunc(false);
var x = 3;

function myFunc(y) {
    return x;
}

myFunc(false);
Hết giờ!
```
Kết quả của hai đoạn code lần lượt là undefined và 3. Tại sao lại như vậy?
Khoan hãy quan tâm tới kết quả, hãy quay lại câu hỏi ở trên của tôi. Tại sao tôi lại bảo, học cách khai báo biến như trên trường dạy lại là một cú lừa ngoạn mục? Đó là bởi vì bạn đang đứng ở góc độ của một lập trình viên để hiểu được code chính mình viết ra. Toàn bộ mấu chốt của bài viết này nằm ở chỗ, hãy đứng ở vị trí của trình biên dịch.

Nói một chút về trình biên dịch, tôi hiểu một điều rất rõ ràng, Javascript là một ngôn ngữ thông dịch, tuy nhiên bạn hãy thử tưởng tượng mình đang là một trình biên dịch ngôn ngữ Javascript. Hãy nghĩ đơn giản, trình biên dịch sẽ làm các bước như sau:

Đọc mã nguồn, thực chất là đọc một chuỗi rất rất dài.
Phân tích chuỗi thành những phần nhỏ hơn gọi là token.
Sắp xếp lại chúng theo thứ tự, và convert thành 1 đoạn chuỗi "hoàn chỉnh" để phần cứng "hiểu" được.
Chú ý, đây là những suy nghĩ ngô nghê của một đứa trẻ 5 tuổi về cách mà một trình biên dịch làm.

Quay lại với 2 đoạn code ở trên. Đối với trình biên dịch ngôn ngữ Javascript, nó có 1 vài nguyên tắc như sau:

Thế giới của Javascript là Object, hàm (function) cũng chỉ là một Object. Điều đó thể hiện rõ ràng ở chỗ, mọi biến đều chỉ có ý nghĩa trong function/object gần nhất chứa nó. Và object lớn nhất trong tất cả các object là window.
Khi gặp một function hoặc 1 Object, nó sẽ đọc code nằm trong function/Object đó, và tìm ra những phép gán, và sẽ hô biến biểu thức gán đó theo trình tự như sau:

Tách biểu thức gán đó thành 2 biểu thức, 1 là khai báo, 1 là gán.
Tiếp đó trình biên dịch còn làm một việc thần thánh hơn là kéo tất cả biểu thức khai báo lên trên cùng của đoạn code nằm trong function/Object đó. Quá trình này gọi là hoisting. Nói cách khác, việc khai báo luôn xảy ra đầu tiên, áp dụng cho cả biến lẫn hàm. Đó là lý do tại sao khi lập trình Javascript, người ta luôn khuyên nên khai báo biến/hàm lên trên cùng.
Cụ thể, ví dụ với một đoạn code sau
```
function() {
    // some code
    var x = 3;
    // some another code
    var y = 5;
    // some another stupid code
    var z;
    // some another super stupid code, too
    z = 7;
    var t;
    // some unrelated code ....
}
```
sẽ được hô biến thành như sau
```
function() {
    var x, y, z, t;
    // some code
    // some another code
    y = 5;
    // some another stupid code
    // some another super stupid code, too
    z = 7;
    // some unrelated code ....
}
```
Để cho dễ hình dung, tôi vẫn để lại y chang thứ tự các đoạn comment :) 
Quá trình này sẽ giải thích những khái niệm như scope, hoisting.

Quay lại với đoạn code ban đầu, và với cách biên dịch đó, thì đoạn code đầu tiên sẽ thành như thế này đây:
```
var x = 3;
function myFunc(y) {
    var x;

    if (y) {
        x = 5;
        return x;
    }
    return x;
}
myFunc(false);
```
Những điều cần hiểu ở đây:

Vì cái if đầu tiên là false, nên phép gán x=5 sẽ không được thực thi. Khi đó, vì x trong hàm myFunc chưa được gán, nên giá trị sẽ là undefined.
Nếu như không có khai báo từ khóa var x nằm trong hàm myFunc, thì biến x khi đó sẽ lấy giá trị của biến x ở ngoài hàm myFunc. Điều này tương tự như những gì trường học dạy, giá trị biến toàn cục có thể ảnh hưởng đến toàn bộ, và được sử dụng ở nhiều nơi. Vì vậy, nên hạn chế xài biến toàn cục là vậy. Và điều này cũng giải thích kết quả của đoạn code thứ hai của chúng ta.

### Một vài chú ý
- Khi ES6 ra mắt, từ khóa let và const ra đời giúp giải quyết được một phần vấn đề của từ khóa var, hạn chế được dùng quá nhiều global scope, hay nói cách khác là dùng biến toàn cục. Bạn có thể tự tìm hiểu tại sao nên hạn chế tư tưởng dùng biến toàn cục.
- Hoisting áp dụng cho hàm có một chút khác biệt giữa hai trường hợp sau: function myFunc() {} và var myFunc = function() {}. Trường hợp đầu tiên sẽ được hoisting, và điều đó có nghĩa là hàm myFunc sẽ sử dụng được ngay cả khi khai báo sau.