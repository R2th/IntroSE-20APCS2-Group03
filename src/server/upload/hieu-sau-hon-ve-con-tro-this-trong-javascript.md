Trong quá trình học và làm việc với javascript việc sử dụng `this` là điều dễ làm đau đầu các lập trình viên js nhất. Vậy `this` nó là gì ?
Con trỏ this có lẽ là một khái niệm không mấy xa lạ trong lập trình hướng đối tượng. Nếu bạn từng học Java hoặc C#, hẳn bạn cũng nhớ từ khóa this dùng để trỏ tới chính object gọi hàm đó.
Ở đây `this` nó cũng tương tự như vậy hãy xem ví dụ bên dưới để hiểu rõ hơn về cơ bản của nó nhé.
```javascript
var info = {
  fullName: 'Nguyen Van A',
  age: 23,
  address: 'Tran Cao Van',
  showInfo: function() {
    //Ở đây this sẽ là object info
    console.log(this.fullName + ' ' + this.age + ' years old');
  }
};

info.showInfo(); //Nguyen Van A is 23 years old
```
Ở đây con trỏ this đang trỏ đến đúng object info để thể hiện ra đúng thông tin mình muồn có. Còn có 1 trường hợp khác chúng ta khai báo biến ở phạm vi global thì lúc này `this` sẽ được trỏ đến object window nơi chứa các biến global đó.
```javascript
var fullName = 'Nguyen Van A';
var age = '23';

function showInfo()
{
  console.log(this.fullName + ' ' + this.age + ' years old');
}

window.showInfo(); //Nguyen Van A is 23 years old
showName(); //Nguyen Van A is 23 years old
```
Vậy với 2 ví dụ trên thì chúng ta sẽ nghĩ nhìn chung `this` cũng dễ hiểu chứ đâu khó khăn gì phải không? Nhưng không phải đâu những điều tiếp theo đây mới chính là thứ mà chúng ta cần phải lưu ý.
## 1. Sử dụng chung với callback function
Ví dụ chúng ta muốn click vào một button để show ra thông tin người dùng. Đơn giản chúng ta chỉ cần truyền function showInfo() như một callback cho hàm click là xong.
```javascript
var info = {
  fullName: 'Nguyen Van A',
  age: 23,
  address: 'Tran Cao Van',
  showInfo: function() {
    //Ở đây this sẽ là object info
    console.log(this.fullName + ' ' + this.age + ' years old');
  }
};

$('button').click(info.showInfo); //showInfo truyền vào như callback
```
Tuy nhiên khi mở developer tools thì `this` ở đây nó đang trỏ đến `button` chứ không phải object info như trước đó. Điều đó sẽ làm cho việc hiển thị dữ liệu bị sai.
Để khắc phục lỗi này ta chỉ cần dùng bind hoặc anonymous function là được.
```javascript
// Dùng anonymous function
$('button').click(function(){ info.showInfo() });

// Dùng bind
$('button').click(info.showInfo.bind(info)); //this ở đây vẫn là object info
```
## 2. Sử dụng chung với anonymous function
Giả sử có một object trường học và bạn muốn show tất cả các lớp học trong trường đó ra thì chúng ta làm như sau.
```javascript
var school = {
  nameSchool: 'Tran Phu',
  classes : ['10A', '11B', '12C'],
  showAllClass: function() {
    this.classes.forEach(function(cl){
      console.log(this.nameSchool + ' have a class named ' + cl);
    });
  }
};

school.showAllClass(); // undefined have a class named 10A
```
Lúc này ta đang dùng hàm forEach và bên trong là một anonymous fucntion thì `this` nó sẽ được trỏ đến object window nên nameSchool lúc này sẽ bị undefined. Để giải quyết ta thường dùng là tạo một biến để gán giá trị this vào, và truy xuất tới giá trị đó trong anonymous function.
```javascript
  showAllClass: function() {
    var schoolObj = this; //Gán giá trị this vào biến schoolObj
    this.classes.forEach(function(cl){
      console.log(schoolObj.nameSchool + ' have a class named ' + cl);
    });
  }
```
## 3. Sử dụng trong trường hợp gán hàm cho một biến khác
Trường hợp này rất ít khi gặp phải. Đó là trường hợp khi ta gán một hàm vào một biến, sau đó gọi hàm đó. Hàm sẽ không chạy như ta mong muốn, vì object gọi hàm lúc này chính là object window.
```javascript
var fullName = 'Tran Thi B';
var info = {
  fullName: 'Nguyen Van A',
  age: 23,
  address: 'Tran Cao Van',
  showInfo: function() {
    //Ở đây this sẽ là object info
    console.log(this.fullName + ' ' + this.age + ' years old');
  }
};

var showFunc = info.showInfo;

//Gọi hàm show để hiển thị thông tin
showFunc(); // Tran Thi B undefined years old
```
Cũng tương tự như các trường hợp đã phân tích ở trên, context của hàm info.showInfo đã bị thay đổi khi ta thực hiện gán hàm cho đối tượng khác cụ thể ở đây `this` đang được gán cho object window. Để giữ nguyên được context là biến info thì ta sẽ sửa lại code như sau:
```javascript
var showFunc = info.showInfo.bind(info);

//Gọi hàm show để hiển thị thông tin
showFunc();
```
## Tổng kết
Qua bài viết này các bạn cũng đã thấy `this` nó hơi phức tạp như nào rồi nhỉ. Từ giờ hãy cẩn thận khi sử dụng nó để tránh gặp lỗi nhé !
Link tham khảo: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this