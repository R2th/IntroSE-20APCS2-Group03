![](https://images.viblo.asia/22794b20-756b-4593-9fd0-bd0e25d185da.png)

Events!<br/>
Một phần không thể thiếu của một trang web. Thứ giúp người dùng có cảm giác rằng đang thực sự giao tiếp trang web chứ không chỉ đơn thuần như đọc báo hay xem phim.<br>
Event hiểu đơn giản là các hành động diễn ra trong trình duyệt có thể được tạo bởi người dùng hoặc chính trình duyệt.<br/>
Ví dụ như khi người dùng click chuột vào phần tử, gõ văn bản vào textfield hay di chuyển con trỏ vào phần tử nào đó.<br/>

Trong bài viết này, mình sẽ nói về hai cách xử lý sự kiện và sử dụng hợp lý cho từng trường hợp.

### Sử dụng Event Handler

Bạn có thể dùng thuộc tính `EventHandler` có sẵn của `object` để "bắt sự kiện".<br>

Nghe có vẻ hơi phức tạp, nhưng có thể bạn đã làm nó mà chưa biết tên nó chăng.
```javascript
const button = document.querySelector(".btn")

button.onclick = function() {
  console.log("Hello!");
};

// OR using Javascript one-liners make you look like a pro
button.onclick = () => {console.log("Hello!")};
```
Trong ví dụ này, thuộc tính  `onclick` được sử dụng để khi người dùng nhấp vào button, nó sẽ in ra dòng chữ  "Xin chào!" vào console log.<br>
Thuộc tính  "onclick" chỉ là một trong những `EventHandler`có thể sử dụng được thôi. Dước đây là một số thuộc tính thông dụng có thể dùng.


|STT|	Event Name|	Description|
| -------- | -------- | -------- |-------- |
|1 | onclick | Sự kiện xảy ra khi click vào thẻ HTML |
| 2	|ondbclick | Sự kiện xảy ra khi double click vào thẻ HTML |
| 3	|onchange | Sự kiện xảy ra khi giá trị (value) của thẻ HTML đổi. Thường dùng trong các đối thẻ form input |
| 4 | onmouseover | Sự kiện xảy ra khi con trỏ chuột bắt đầu đi vào thẻ HTML |
| 5 | onmouseout | Sự kiện xảy ra khi con trỏ chuột bắt đầu rời khỏi thẻ HTML |
| 6 | onmouseenter | Tương tự như onmouseover |
| 7 | onmouseleave | Tương tự như onmouseout |
| 8 | onmousemove | Sự kiện xảy ra khi con chuột di chuyển bên trong thẻ HTML |
| 9 | onkeydown | Sự kiện xảy ra khi gõ một phím bất kì vào ô input |
| 10 | onload | Sự kiện xảy ra khi thẻ HTML bắt đầu chạy, nó giống như hàm khởi tạo trong lập trình hướng đối tượng vậy đó. |
| 11 | onkeyup | Sự kiện xảy ra khi bạn gõ phím nhưng lúc bạn nhả phím ra sẽ được kích hoạt |
| 12 | onkeypress | Sự kiện xảy ra khi bạn nhấn môt phím vào ô input |
| 14 | onblur | Sự kiện xảy ra khi con trỏ chuột rời khỏi ô input |
| 15 | oncopy | Sự kiện xảy ra khi bạn copy nội dung của thẻ |
| 16 | oncut | Sự kiện xảy ra khi bạn cắt nội dung của thẻ |
| 17 | onpaste | Sự kiện xảy ra khi bạn dán nội dung vào thẻ |
<br>

### Thêm Event Listener

Ngoài những thuộc tính `EventHandler` trên ra, chúng ta cũng có thể thêm có sự kiện vào đối tượng thông qua `addEventListener`.<br/>

![](https://images.viblo.asia/bf48531b-2dc2-4bf1-9308-9eb714650084.jpg)

Bằng cách thêm `event listener` vào một đối tượng, chúng ta có thể bắt được một loạt các sự kiện do người dùng hoặc trình duyệt tạo ra.
```javascript
const button = document.querySelector(".btn")
button.addEventListener("click", function(event) {
  console.log("Hello!");
})

// OR using Javascript one-liners
button.addEventListener("click", event => console.log("Hello!"))
```
Thay vì dùng thuộc tính `onclick`, thì ở đây mình dùng method `addEventListener()`:<br/>
```Javascript
target.addEventListener(event, function, useCapture);
```
+ `target`: Đây là phần tử bạn cần thêm Event Listeners vào. (Sử dụng [DOM Selector](https://www.w3schools.com/jsref/dom_obj_all.asp)).
+ `event`: Là các loại sự kiện như click, mouseover, ... (Bạn có thể xem [ở đây](https://www.w3schools.com/jsref/dom_obj_event.asp))
+ `function`: Tên hàm bạn cần thêm vào

### Khác biệt giữa Event Handlers và addEventListener 

Nếu bạn sẽ sử dụng `EventHandler`, điểm khác biệt rõ ràng nhất chính là nếu bạn thêm nhiều sự kiện cho cùng một loại(ví dụ là onclick vào nút), thì sự kiện thứ 2 sẽ ghi đè lên sự kiện đầu tiên và chỉ sự kiện đó được thực thi. Nguyên nhân là do:
> Đối với một phần tử nhất định, bạn chỉ có thể có một `event handler` cho mỗi loại sự kiện, nhưng bạn có thể có nhiều `event listeners`.
```javascript
const button = document.querySelector(".btn")
button.onclick = () => {
  console.log("Hello!");
};
button.onclick = () => {
  console.log("How are you?");
};

// When click button
// "How are you?"
```

Những lúc như thế này thì chúng ta sẽ cần đến `addEventListener`
```javascript
const button = document.querySelector(".btn")
button.addEventListener("click", event => {
  console.log("Hello!");
})
button.addEventListener("click", event => {
  console.log("How are you?");
})

// This will log to the console
// "Hello!"
// "How are you?"
```

### Nên sử dụng cách nào?

Phương pháp nào bạn nên sử dụng còn tùy thuộc vào trường hợp sử dụng đến nó.<br>

Bạn có cần bổ sung thêm nhiều sự kiện vào một phần tử không? Trong tương lai sẽ có cần thêm sự có phần tử đó không?<br/>

Đúng vậy, đó là lý do tại sao `addEventListener`  lại được khuyên dùng.

### Tham khảo
https://medium.com/dailyjs/whats-the-difference-between-event-handlers-addeventlistener-in-js-963431f05c34