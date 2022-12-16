## Giới thiệu
Trước khi bắt đầu viết một đoạn code javascript nào, ta nên tìm hiểu về **debugging**.
Hầu hết tất cả các trình duyệt hiện đại đều hỗ trợ  **debugging** - một công cụ giúp lập trình viên tìm và fix các lỗi dễ dàng hơn.

Ở đây chúng ta sẽ sử dụng trình duyệt **Google Chrome**, với Developer Tools mạnh mẽ giúp chúng ta debug code javascipt dễ dàng.

## Ví dụ demo
Ở bài này chúng ta sẽ thực hành debug sử dụng một ví dụ nối chuỗi(String) đơn giản như sau:

* Có 2 inputs dùng để nhập string.
* Click button "Concat" để thực hiện nối 2 string với nhau và hiển thị lên màn hình.

*index.html*
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Debugging Javascript With Chrome</title>
    <style>
      input {
        display: block;
        margin-bottom: 1em;
        height: 30px;
      }
    </style>
  </head>
  <body>
    <h1>Demo debugging javascript With Chrome Developer Tools</h1>
    <label>String 1</label>
    <input placeholder="String 1"/>
    <label>String 2</label>
    <input placeholder="String 2"/>
    <button>Concat</button>
    <p></p>
    <script src="app.js"></script>
  </body>
</html>

```

*app.js*
```js
function onClick() {
  start();
}

function start() {
  var str1 = getString1();
  var str2 = getString2();
  if (str1 === '' || str2 === '') {
    label.textContent = 'Error: one or both inputs are empty.';
    return;
  }
  updateLabel();
}

function updateLabel() {
  var str1 = getString1();
  var str2 = getString2();
  var str = str1 + str2;
  label.textContent = str1 + ' + ' + str2 + ' = ' + str;
}

function getString1() {
  return inputs[0].value;
}

function getString2() {
  return inputs[1].value;
}

var inputs = document.querySelectorAll('input');
var label = document.querySelector('p');
var button = document.querySelector('button');
button.addEventListener('click', onClick);
```

## Mở Chrome Developer Tools
1. 	 Chạy ví dụ lên bằng Chrome.
2. 	 Mở Developer Tools bằng F12 (hoặc click vào dấu 3 chấm ở phía trên bên phải > More Tools > Developer Tools).
3. 	Chuyển qua Tab "Source".

![](https://images.viblo.asia/e64b4743-5ae0-45b4-a350-9154693a4a0e.png)

Các phần chính của trình debugger:

1. List các source files(HTML, Javascript, Css, other files).
2. Hiển thị nội dung file source hiện tại.
3. Control buttons và thông tin trong quá trình debug.

## Thực hành
Ok, bây giờ chúng ta sẽ thực hiện debug ví dụ ở trên nhé :grinning:

**1. Đặt Breakpoints**
* 	Breakpoints là 1 khái niệm rất quan trọng, breakpoint là một điểm(line code) nơi mà quá trình thực thi javascript sẽ dừng lại, tại thời điểm đó ta có thể kiểm tra giá trị của biến, run 1 số commands, theo dõi call stack,... để tìm nguyên nhân gây ra lỗi.
* 	Chúng ta có thể đặt nhiều breakpoints cùng một lúc. Trên Developer Tools, để đặt breakpoints, đơn giản chỉ cần click vào line number của file source.

Ở đây tôi sẽ đặt 2 breakpoints như sau:
![](https://images.viblo.asia/e87d2f20-eeec-4689-9220-16c6c92e5c3f.png)

Bây giờ chúng ta nhập text vào 2 inputs, và click button "Concat"
  
Code javascript bắt đầu thực thi và khi đến breakpoint đầu tiên(line 8), quá trình thực thi sẽ dừng lại, tại đây sẽ có nhiều điều thú vị:
  
![](https://images.viblo.asia/224013bb-be0a-406d-9ec7-f1969dc9f212.png)
  
   * Watch: kiểm tra giá trị của bất kì expression nào, ta có thể thêm expression bằng click dấu "+", ở đây tôi kiểm tra length của str1
   * Call Stack: hiển thị chuỗi nested functions, tại thời điểm này đang ở hàm `start()`, được gọi bởi hàm `onClick()`
   * Scope: xem giá trị các biến local, global; ở đây có thể xem giá trị 3 biến local là str1, str2, và đặc biệt là biến `this` - nguồn cơn của mọi lỗi lầm :sweat_smile:.

  Thêm về Breakpoints:
  ![](https://images.viblo.asia/5d59a416-1ae8-4dc0-badd-aa2599d79ae9.png)
* Run button (1): khi bấm button này sẽ nhảy đến breakpoint kế tiếp, nếu không còn breakpoint nào thì sẽ chạy hết chương trình, ở ví dụ này khi đang ở breakpoint line 8, bấm run sẽ chạy đến breakpoint line 12.
* Xem danh sách các breakpoints (2).
* Deactivate các breakpoints (3): khi chúng ta đã phát hiện ra lỗi, công việc debug đã xong hoặc không muốn debug nữa thì chúng ta có thể hủy tác dụng của tất cả các breakpoints bởi nút Deactivate Breakpoints.
* Một cách khác để đặt breakpoints là dùng `debugger` keyword, quá trình thực thi sẽ dừng lại khi gặp keyword này.
* Nếu app lớn và phức tạp. Đặt breakpoint bằng cách click trên line of code có thể không phù hợp, vì vậy có cách đặt breakpoint hay hơn là dựa vào các events xảy ra trên browser.
    ![](https://images.viblo.asia/f6b815e8-1cea-47fe-aa42-b204707a8d08.png)
    
    Trong ví dụ này khi click button "Concat" thì qúa trình thực thi sẽ dừng lại tại hàm mà event click gọi đến (`onClick()`), rất tiện lợi phải không nào.
    
  **2. Step Over, Step Into, Step Out**
  
  ![](https://images.viblo.asia/6cb8f027-2370-4887-b91b-4ece904fc7f6.png)
 * Step Over (1): cũng chạy như khi click Run button, nhưng thay vì chạy đến breakpoint kế tiếp, nó sẽ chạy đến line code kế tiếp và dừng chương tình ở đó để ta có thể debug. Cứ như thế bấm tiếp Step Over, chương trình sẽ được chạy từng dòng từng dòng một để ta có thể dễ dàng debug. Ví dụ như trên hình; đang ở line 8, bấm Step Over sẽ chạy đến line 9 và dừng ở đó; ta có thể tiếp tục debug tại line đó.
* Step Into (2): Khác với Step Over sẽ bỏ qua các function, Step Into gặp function thì sẽ chạy vào debug từng line of code của function đó. Ví dụ trên nếu ta đang ở line 12 và bấm Step Into thì sẽ debug vào trong `updateLabel()` function.
* Step Out (3): Ngược lại với Step Into, Step Out sẽ thoát khỏi hàm hiện tại đang debug.

## Kết luận
Ở trên là những khái niệm và quá trình debug 1 app javascript, bạn có thể thực hành và tìm hiểu thêm một số phần nâng cao hơn của Google Deverloper Tools Debugging nhé.

Nếu bạn cảm thấy những phần ở trên là phức tạp thì có thể sử dụng câu lệnh thần thánh `console.log` để debug :joy:

Mong rằng bài viết này sẽ có ích cho các bạn. Cảm ơn các bạn đã dành thời gian để đọc.