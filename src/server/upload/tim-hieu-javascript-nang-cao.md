Chào mọi người, hôm nay mình sẽ nói về một số thứ nâng cao trong Javascript, có thể không phải nâng cao so với bạn đang đọc bài này nhưng cũng có thể nó sẽ là nâng cao với người khác :) Cùng theo dõi bài viết của mình nhé.

Trong bài này mình sẽ đề cấp đến 7 đối tượng này: 
* Object-Oriented Code
* Creating Elements
* Canvas
* Local Storage
* Errors and Exceptions
* Regular Expressions
## 1. Object-Oriented
Về đối tượng trọng Javascript thì trước mình có viết 1 bài rùi, các bạn tham khảo tại đây nhé:

[Đối tượng (Object) trong Javascript](https://viblo.asia/p/doi-tuong-object-trong-javascript-63vKjn6dK2R)

## 2. Creating Elements
### 2.1 Tạo elements
Chúng ta thường tạo elements bằng các thẻ HTML, nhưng bạn có biết Javascript cũng có thể tạo được các elements này không?

VD:
```
var div = document.createElement('span');
div.textContent = "What are you doing?";
div.setAttribute('class', 'question');
document.body.appendChild(div);
```

Đoạn code trên tương đương với:
```
<body>
    <span class="question">What are you doing?</span>
</body>
```
### 2.2 Xóa elements
Có tạo elements cũng phải có xóa elements chứ nhỉ? Ở ví dụ này mình xóa element span vừa tạo bằng cách dùng hàm remove:

```
div.remove(span);
```

### 2.3 Tạo elements bằng Jquery
Bạn cũng có thể tạo elements bằng Jquery với cú pháp rất đơn giản như sau:
```
var div = $('<div><div/>').text("What are you doing?").appendTo(document.body);
$('<span><span/>').text('I'm working!').appendTo(div);
```
Đoạn code trên mình đã tạo ra đoạn code html sau:
```
<body>
    <div>
        What are you doing?
        <span>I'm working!</span>
    </div>
</body>
```

Thật đơn giản phải không? :D
## 3. Canvas
Vẽ và tạo ảnh trên canvas element của HTML 5:

**Canvas tag HTML**
```
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
</canvas>
```

**Tạo hình tròn**
```
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
```

![Circle canvas](https://images.viblo.asia/99e54d4a-1210-40c6-93ce-83f4e7906f73.jpg)

**Vẽ gradient hình tròn**
```
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);
```

![Draw Circular Gradient](https://images.viblo.asia/606c6c6c-2b39-4f80-8c2a-63111dd9cc57.jpg)
## 4. Storage
Javascript cũng có các storage để lưu trữ data tạm thời để mọi thao tác được nhanh hơn như localStorage và sessionStorage
### 4.1 Local Storage
* localStorage có thể lưu trữ data vô thời hạn: Có nghĩa là chỉ bị xóa bằng JavaScript, hoặc xóa bộ nhớ trình duyệt, hoặc xóa bằng localStorage API.
* localStorage có khả năng lưu trữ được tương đối lớn - 5MB
```
// Gán data vào 1 key
localStorage.setItem("key", "value");
// hoặc 
localStorage.key = 'value';
// hoặc
localStorage['key'] = 'value';

// Lấy data từ key
document.getElementById("result").innerHTML = localStorage.getItem("lastname");
// Xóa data
localStorage.removeItem("lastname");
// Xóa tất cả localStorage
localStorage.clear();
```

### 4.2 Session Storage
Tiếp đến là `sessionStorage`, nó tương tự localStorage, ngoại trừ 1 đặc điểm là `localStorage` lưu trữ không có thời gian hết hạn còn `sessionStorage` sẽ bị xóa khi đóng tab.
```
// Lưu trữ data
sessionStorage.setItem('key', 'value');

// Lấy data từ sessionStorage
var data = sessionStorage.getItem('key');

// Xóa data đã lưu
sessionStorage.removeItem('key');

// Xóa tất cả data đã lưu trong sessionStorage
sessionStorage.clear();
```
## 5. Errors and Exceptions
### 5.1 Try catch lỗi chung
Javascript cũng có class Error để xử lý các lỗi hoặc các exceptions:
```
try {
  throw new Error('Whoops!');
} catch (e) {
  console.log(e.name + ': ' + e.message);
}
```

### 5.2 Handle 1 lỗi đặc biệt nào đó
```
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ': ' + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ': ' + e.message);
  }
  // ... etc
}
```

Như vậy Javascript cũng có handle error và các exception như các ngôn ngữ khác nhỉ? nhưng dường như trong thực tế chúng ta rất ít khi dùng ^^
## 6. Regular Expressions
Regular Expressions cũng là một loại dữ liệu trong JavaScript, được sử dụng để tìm kiếm và so sánh các chuỗi để xác định xem chuỗi có nằm trong chuỗi cần kiểm tra hay không?
VD:
```
var regex = /^[a-z\s]+$/;
var stringCheck = 'This is string';

if (stringCheck.match(regex)) {
    alert('String is match');
} else {
    alert('String not match');
}
```

- exec : Hàm thực thi tìm kiếm 1 string trong 1 string. Nó sẽ trả về 1 mảng nếu match và null nếu không match.
- test : Hàm kiểm tra xem string này có trong string khác hay không? kết quả là return về true hoặc false.
- match	A String method that executes a search for a match in a string. It returns an array of information or null on a mismatch.
- search : Tìm kiếm 1 chuỗi trong 1 chuỗi khác. Nó sẽ return về index của phần tử nếu match và -1 nếu không match.
- replace : Thay thế chuỗi đã match bằng một chuỗi khác.
- split : Hàm dùng để tách 1 string ra thành 1 array theo ký tự phân cách nào đó.

Để tìm hiểu chi tiết hơn về Regular Expressions bạn vùi lòng vào link sau:
[Regular Expressions](https://developer.mozilla.org/vi/docs/Web/JavaScript/Guide/Regular_Expressions)
## 7. Closures
Kế đến, mình muốn giới thiệu về Closures, nó là một hàm trả về một hàm, hàm được tạo bên trong hàm được gọi vậy nên các hàm bên trong có thể gọi đến các biến của hàm bao nó hay còn gọi là hàm cha.

VD:
```
function init() {
  var name = 'Tien Phat'; // name là biến cục bộ của hàm init
  function displayName() { // displayName() là hàm closure
    alert(name); // sử dụng biến của hàm cha
  }
  displayName();
}
init();
```
Cũng dễ hiểu thôi nhỉ? cá nhân mình thấy closures rất tiện dụng trong khi code, đặc biệt là những hàm private và không dùng lại bên ngoài hàm cha => mục đích là tóm gọn 1 đoạn code lại và dùng đi dùng lại trong nội tại của hàm cha.

### Kết bài
Như vậy mình đã tóm tắt qua những tính năng của Javascript nâng cao, gọi là nâng cao thế nhưng nó cũng không quá xa lạ và là những chức năng rất hay dùng trong những dự án thực tế.

Nếu có bất kỳ câu hỏi hay ý kiến nào? các bạn vui lòng comment bên dưới nhé.

Thanks for reading :))

### Tài liệu tham khảo
https://www.w3schools.com/Html/html5_canvas.asp
https://www.w3schools.com/html/html5_webstorage.asp
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/loi