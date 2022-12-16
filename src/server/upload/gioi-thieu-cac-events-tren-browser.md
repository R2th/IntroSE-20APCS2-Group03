Event là một tín hiệu cho thấy một cái gì đó đã xảy ra. Tất cả các DOM nodes tạo tín hiệu như vậy (nhưng các event không giới hạn ở DOM).

Dưới đây, là danh sách các events DOM hữu ích nhất:

**Mouse events:**

* ```click``` - khi nhấp đúp chuột vào element.
* ```contextmenu``` - khi nhấp chuột phải vào element.
* ```mouseover```/```mouseout``` - khi con trỏ chuột đến / rời khỏi element.
* ```mousedown``` / ```mouseup``` - khi chuột ấn vào / thả ra element.
* ```mousemove``` - khi chuột di chuyển.

Dấu chân lạc bước trên phố quen, nơi cơn mơ tôi đi vào
Để tìm lại đúng nơi trước khi ào ạt cơn mưa tới
Muốn sửa lại phút giây đã sai cho em sẽ quay ngoảnh lại
Bài tình ca tháng 5 dành cho em

**Form element events:**

* ```submit``` - khi người dùng submit form.
* ```focus``` - khi người dùng focuses vào element.

**Keyboard events:**

* ```keydown``` and ```keyup```  - khi người dùng nhấn/thả keyboard.

**Document events:**

* ```DOMContentLoaded``` - khi HTML đã được load và xử lý xong, DOM được built đầy đủ.

**CSS events:**

* ```transitionend``` - khi CSS-animation kết thúc.

## Event handlers

Để xử lý event, chúng ta có thể gán một handler  - một function chạy trong trường hợp có event.

Handlers là một cách để chạy code JavaScript khi người dùng thao tác.

Có một số cách để gán một handler. Let's go !!!.

### HTML-attribute

Handler có thể được set trong HTMLvới attribute named ```on<event>```.
ví dụ: gán xử lý hành động `click` cho ```input```, chúng ta sử dụng ```onclick```:

```<input value="Click me" onclick="alert('Click!')" type="button">```

Khi mouse click, sẽ thực thi code bên trong  ```onclick```.

Xin lưu ý, bên trong `onclick` mình sử dụng dấu nháy đơn, vì chính thuộc tính nằm trong dấu nháy kép. Nếu chúng ta quên code bên trong thuộc tính và sử dụng dấu ngoặc kép bên trong, như thế này: ```onclick = "alert (" Click! ")"```,  code sẽ không thực thi được.

HTML-attribute không phải là nơi thuận tiện để viết nhiều mã, cách tốt hơn chúng ta sẽ viết một javascript function và gọi nó ở đây.

Dưới đây là hàm `countClick()`:

```
    <script>
      function countRabbits() {
        for(let i=1; i<=3; i++) {
          alert("Rabbit number " + i);
        }
      }
    </script>

    <input type="button" onclick="countRabbits()" value="Count rabbits!">
```

### DOM property

Chúng ta có thể xử lý event bắng cách gán DOM property `on<event>`
ví dụ: `elem.onclick`:

```
    <input id="elem" type="button" value="Click me">
    <script>
         elem.onclick = function() {
              alert('Thank you');
         };
    </script>
````

Ở đây handler(onclick) được sử dụng với HTML-attribute(elem), browser tạo một hàm mới từ nội dung attribute và ghi nó vào DOM-property `elem.onclick = function()`.
**Handler luôn nằm trong DOM-property: HTML-attribute chỉ là một trong những cách để khởi tạo.**

### Accessing the element: this

Giá trị của `this` bên trong handler là element. 
Để hiển thị nội dung `button` chúng ta sử dụng `this.innerHTML`, hãy xem đoạn code bên dưới:

`button onclick="alert(this.innerHTML)">Click me</button>`

### Possible mistakes

Nếu bạn mới bắt đầu làm việc với event, hãy chú ý những điểm sau.

**Function nên được gán `sayHi` mà không phải `sayHi()`.**

```
// right
button.onclick = sayHi;

// wrong
button.onclick = sayHi();
```

Nếu chúng ta thêm dấu ngoặc đơn, sayThanks () - là một lời gọi hàm. Vì vậy, dòng cuối cùng thực sự lấy kết quả của việc thực thi function, điều này là `undefined` (vì function không trả về gì) và gán nó cho onclick. 

Tuy nhiên, trong code HTML chúng ta cần dấu ngoặc đơn:

`<input type="button" id="button" onclick="sayThanks()">`

Sự khác nhau ở đây là khi browser đọc attribute , nó sẽ tạo handler function từ nội dung của nó, giống như:

```
button.onclick = function() {
  sayThanks(); // the attribute content
};
```

**Use functions, not strings.**

`elem.onclick = "alert (1)"` cũng sẽ làm việc. Nó hoạt động vì lý do tương thích, nhưng không được khuyến khích sử dụng.


**Không sử dụng setAttribute cho handler**

```
// a click on <body> will generate errors,
// because attributes are always strings, function becomes a string
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM-property case matters.

Gán handler `elem.onclick` not `elem.ONCLICK` , vì DOM property là case-sensitive.

### addEventListener

Vấn đề cơ bản của các cách đã nói ở trên là chúng ta không thể gán nhiều handler cho một event.

Chẳng hạn, chúng ta muốn lighlight buton và hiển thị lên thông báo khi click vào button.

Chúng ta sẽ gán hai event handler để làm điều này, nhưng new DOM property sẽ ghi đè lên cái đã tồn tại:

```
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // đè lên handler trước đó.
```

Các developers đã hiểu điều đó từ lâu và đã đề xuất một cách khác để quản lý handlers bằng các phương thức đặc biệt addEventListener và removeEventListener. Họ không có vấn đề như vậy.

Đây là cú pháp thêm mới handler:

`element.addEventListener(event, handler[, options]);`

**event**

Tên event, ví dụ: `"click"`.

**handler**

handler function.

**options**

Các tùy chọn:

* `once`: nếu `true`, listener sẽ tự động bị loại bỏ sau khi kích hoạt.
* `capture`: là giai đoạn nơi xử lý event, bạn có thể tìm hiểu thêm [Bubbling and capturing](https://javascript.info/bubbling-and-capturing).
* `passive`: nếu `true`, handler sẽ không gọi `preventDefault()`, bạn có thể tìm hiểu thêm [Browser default actions](https://javascript.info/default-browser-action)

Để loại bỏ handler, sử dụng `removeEventListener`:

`element.removeEventListener(event, handler[, options]);`

Để loại bỏ handler chúng ta sẽ gán function một cách chính xác.
Code dưới đây sẽ không làm việc:

 ```
 elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

Handler sẽ không bị loại bỏ, bởi vì `removeEventListener` là một function khác với cùng một đoạn code, nhưng đó không phải là vấn đề.

Đây là cách chính xác:

```
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```
Chú ý, nếu chúng ta không lưu function trong variable, thì chúng ta không thể loại bỏ nó. Ở đây, không có cách nào "read back" handlers được gán bởi `addEventListener`.

**(còn tiếp...)**