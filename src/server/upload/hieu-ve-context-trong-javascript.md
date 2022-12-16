## 1. Context là gì ? Tại sao phải quan tâm 
Một trong những khái niệm cơ bản phần lớn bị hiểu lầm đó là từ khoá "this".Chúng ta có thể viết mã mà không hiểu từ khoá này nhưng việc hiểu rõ nó giúp bạn hiểu rõ hơn về ngôn ngữ mình viết và giảm thiểu bug.

Đầu tiên , bạn cần phải hiểu 1 chút về Execution Context. Đơn giản nó dùng để quản lý những gì đang chạy . Đoạn code  nào order trước thì order được thực hiện  trước và được xử lý trong Execution Context. Các quy tắc cho những gì được chạy đầu tiên cần tuân theo thứ tự phạm vi scope.

## 2. Lexical environmen là gì /Phạm vi code
Lexical environmen: một cấu trúc công cụ js bên trong chứa ánh xạ biến định danh (định danh ở đây được tham chiếu   đến variable/function và variable được tham chiếu đến object thực tế bao gồm kiểu của function và giá trị nguyên thuỷ ).
Có nhiều điều cần hiểu khi nói đến phạm vi. Khi 1 đoạn chương trình code bắt đầu run thì 1 object javascript được tự động tạo ra cùng với lexical environmen có cấp cao nhất gọi là Global Scope.Các hàm và biến được lồng trong hàm hoặc nằm trong dấu ngoặc nhọn sẽ có scope riêng của chúng.
![](https://images.viblo.asia/d71444fe-af4c-4b2d-b2e4-14e9cd68c609.png)

 Javascript không chỉ là một ngôn ngữ chức năng mà còn là ngôn ngữ hướng đối tượng , như vậy nó có khả năng chứa đối tượng với các đặc điểm và mối quan hệ mà chúng ta có thể gán để có thể phản ánh các tương tác trong thế giới thực . Khi làm việc với hướng đối tượng điều quan trọng là phải ghi nhớ đối tượng nào đang gọi mỗi chức năng. Từ "this" sẽ  tham chiếu tới object mà hàm đang gọi ? Vậy làm sao để biết "this" đang tham chiếu tới object nào . Bằng cách nhớ phạm vị mà chúng đang nằm ở trong đó.
 Xem qua các vị dụ dưới để bạn hiểu hơn về "this":


```
function show() { 
console.log(this);
show();

// this ở đây sẽ tham chiếu tới global object trong trình duyệt , được gọi là window
```

Bây giờ hãy thử : 
```
let dog = {
 sound: ‘woof’
 talk: function() {
 console.log(this.sound)
 }
}
dog.talk()

//  Khi gọi hàm dog.talk() thì this ở trong function trên sẽ tham chiếu object dog. 
```

## 3. Các hàm thay đổi context.
Nãy giờ chúng ta đã thảo luận về từ khoá "this",giờ mình sẽ nói 1 chút về các hàm đã được định nghĩa trước có thể thay đổi hành vi của "this", bạn có thể nhớ những phương thức này với từ viết tắt CAB bao gồm các hàm Call, Apply, Bind.
### 3.1 Call
Giả sử bạn muốn gọi 1 hàm và truyền cho nó một đối tượng cụ thể để gán cho "this". Bạn có thể dùng phương thức call.

Ví dụ : 

```
var sayName = function() {
    console.log('My name is ' , this.name);  // My name is Stacey
   };

 var stacey = {
   name: 'Stacey', 
   age: 34
   };

   sayName.call(stacey) // Chúng ta dùng đối tượng stacey để gọi hàm sayName
```

### 3.2 Apply
Hàm apply hoạt động như hàm call nhưng chúng có thể truyền đối số là collection hoặc array.
```
var sayName = function(lang1, lang2) {
    console.log('My name is ' + this.name + ', I love '+ lang1 + ' and ' + lang2);  // My name is Stacey, I love JavaScript and Ios
   };

 var stacey = {
   name: 'Stacey', 
   age: 34
   };
   var languages = ['JavaScript', 'Ios'];
   sayName.apply(stacey, languages);
```

### 3.3 Bind
Sự khác biệt của Call, Apply, Bind là Bind sẽ trả về 1 hàm mới mà sau này chúng ta có thể gọi  thay vì gọi hàm ban đầu.  Sau này khi chúng ta gọi nó , nó vẫn ràng buộc với đối tượng mà chúng ta đã truyền như một đối số.
![](https://images.viblo.asia/03b4b084-058f-4658-b227-b2c8dddcab1c.png)

Bind cũng được sử dụng cho trình lắng nghe event vì mặc định của event listener luôn là window itself.

Bài viết đến đây là kết thúc hy vọng bạn hiểu 1 phần nào đó về context, this, cách thay đổi context.

## Tài liệu tham khảo
https://medium.com/swlh/understanding-context-in-js-eceb5ef1fa75