## JavaScript series

Chương này trình bày về DOM - một cách để JS có thể truy cập vào các element trên trang web.

Bài viết này là một phần của series [JavaScript dành cho người không mới](https://viblo.asia/s/javascript-danh-cho-nguoi-khong-moi-yEZkg8LgZQ0), giúp các bạn đã có kinh nghiệm code trong các ngôn ngữ khác nhanh chóng làm quen với JS.

Nếu được rất mong nhận được sự ủng hộ và đóng góp ý kiến của mọi người để hoàn thiện series.

## A. DOM Introduction

### 1. Introduction

DOM (Document Object Model) là một thực thể được tạo ra bởi trình duyệt khi load một trang web. DOM gồm nhiều element, tổ chức phân cấp theo dạng cây nên được gọi là DOM tree. Cấu trúc cây DOM khá giống với cấu trúc các element trong HTML document, các tag lồng nhau được mô hình hóa tương ứng trong DOM.

Ví dụ bắt đầu với đoạn HTML sau.

``` index.html
<html>
<head>
</head>
<body>
    <p>This is a simple paragraph</p>
    <div>
        <a href="">A link</a>
    </div>
</body>
</html>
```

Trang HTML trên khi được load, thì một đối tượng DOM tương ứng được trình duyệt tạo ra. Đối tượng DOM có cấu trúc phân cấp tương tự như các element trong trang HTML trên.

``` DOM.tree
Document
    html - Root element
        head
        body
            p
            div
                a
```

Trình duyệt sẽ render trang web dựa trên cấu trúc DOM như trên, và nó cũng cung cấp API cho JS truy cập vào, do đó JS mới có khả năng truy cập vào các element trên trang web (thông qua DOM) và tạo nên sự tương tác.

Nhờ có DOM, JS mới có thể thực hiện các hành động sau:

* Đọc dữ liệu và thay đổi các element
* Thay đổi CSS style cho element
* Thêm, xóa element hoặc thuộc tính của nó
* Xử lý event cho các element

DOM có 3 loại, gồm Core DOM, XML DOM và HTML DOM. Phần này chỉ trình bày về HTML DOM. Và hiểu đơn giản, DOM là một interface, gồm các object tiêu chuẩn, method,... được trình duyệt cung cấp cho các ngôn ngữ như JS có thể truy cập vào, từ đó thực hiện các hành vi trên trang web.

## B. DOM element

### 1. Finding elements

Để thực hiện các hành động trên trang web, trước tiên chúng ta cần "chọn" những element cần thiết, sau đó mới thực hiện các hành động như đọc, thay đổi content,... trên các element đã chọn.

Để tối ưu hơn cho hiệu suất, thì không nên truy cập DOM quá nhiều, vì các thao tác với DOM khá chậm. Vì vậy, khi "chọn" xong một element mà cần thực hiện nhiều hành động, thì nên lưu element đó vào một biến. Ví dụ.

```script.js
// Bad, select 2 times
document.getElementById('title').innerHTML = 'Page title';
document.getElementById('title').style.color = 'red';

// Good, select 1 time
let e = document.getElementById('title');
e.innerHTML = 'Page title';
e.style.color = 'red';
```

Đối tượng document cung cấp nhiều method để thực hiện việc "chọn" các element:

* Tìm theo id, class hoặc tag
* Tìm với chuỗi CSS selector
* Tìm những element thuộc về các collection có sẵn

Chú ý, đây là một lỗi khá cơ bản. Các method dùng để chọn element có thể chọn một hoặc nhiều element. Chú ý những method chọn nhiều element sẽ có thêm `s` trong tên method, ví dụ.

```script.js
document.getElementById('title');  // không có s
document.getElementsByTagName('div');  // có s
```

**Tìm theo ID, class, tag name**

```script.js
let e = document.getElementById("logo");
```

Trả về một element có id xác định, nếu không tìm thấy trả về null.

```script.js
let boxes = document.getElementsByClassName("box");
let links = document.getElementsByTagName("a");
```

Tìm theo tên class hoặc tag name. Khác với tìm theo ID chỉ trả về một element, hai method này trả về một mảng (thực ra chỉ hơi giống chứ không phải mảng). Do đó, có thể truy cập từng element cụ thể tương tự như truy cập các phần tử của mảng.

**Tìm theo chuỗi CSS selector**

```script.js
let first_box = document.querySelector("div.box");
```

Trả về element đầu tiên tìm được, là một Node object khớp với chuỗi selector. Nếu không tìm được method trả về null.

```script.js
let boxes = document.querySelectorAll("div.box");
```

Trả về một NodeList các element tìm thấy. Cấu trúc NodeList dùng tương tự mảng.

Hai method trên ném ra lỗi SYNTAX_ERR nếu chuỗi selector sai.

**Tìm trong các collection có sẵn**

Trong DOM có một số collection được xây dựng sẵn (built-in), chứa các nhóm element thường dùng như forms, links, images,... trong toàn bộ document.

HTMLcollection khá giống NodeList, cả hai đều được sử dụng tương tự mảng. Phần này sẽ được nói rõ hơn trong phần sau.

### 2. Access elements

Với DOM có thể truy cập vào bất kì element nào trên trang web, để đọc dữ liệu và thay đổi nội dung, thuộc tính hoặc style của nó.

**Element content**

Để truy cập nội dung văn bản element, sử dụng thuộc tính `innerHTML`. Thuộc tính chứa chuỗi content (không chứa code tag) và có thể gán value mới.

```script.js
let e = document.getElementById("title");
let text = e.innerHTML;  // Get content
e.innerHTML = "Hello";  // Change
```

Có những element không có content, như img,...

Ngoài ra còn có hai thuộc tính `innerText` và `textContent` tương tự.

**HTML attributes**

Vì DOM mô hình hóa các element thành object, nên các HTML attribute cũng được mã hóa thành các property của DOM object.

Chú ý, trong HTML thuộc tính là attribute, nhưng trong DOM gọi là property. Attribute hiểu là thông tin bổ sung thêm cho element, trong khi property nhấn mạnh tính chất sở hữu của element khi ở dạng object.

Tên property tương tự tên attribute nên dễ làm quen và sử dụng.

```script.js
let e = document.getElementById("back");
e.href = "https://google.com/";
```

Để truy cập property, cần gọi kèm tên object và dấu chấm, tiếp theo tới tên property như trên.

Ngoài ra còn hai method là `getAttribute()` và `setAttribute()`, giúp đọc và thay đổi HTML attribute (lần nữa, thuộc tính của HTML chứ không phải thuộc tính CSS).

```script.js
let e = document.getElementById('a_link');
e.getAttribute('href');  // trả về thuộc tính href
e.setAttribute('href', '#');  // thay đổi thuộc tính href
```

**CSS style**

Các style được DOM cho vào một thuộc tính object, có tên là style. Do đó, chúng ta cần gọi thuộc tính trong thuộc tính như code ví dụ bên dưới.

```script.js
let e = document.querySelector(".box");
e.style.border = "1px solid red";
e.style.fontSize = "200%";
```

Thuộc tính trong CSS dùng dấu gạch nối, nhưng trong JS được đổi lại thành camelCase. Và các thuộc tính shorthand được viết dạng chuỗi tương tự trong CSS như trên.

### 3. Traversing

Do các element trong DOM được tổ chức phân cấp, có mối quan hệ với nhau nên từ một element chúng ta có thể tìm ra các element liên quan dựa trên mối quan hệ giữa chúng.

Từ đây mình sẽ dùng từ node để gọi các element. Node sẽ bàn tới trong phần sau, nhưng cơ bản mỗi element đều là node.

DOM cung cấp cho chúng ta một số thuộc tính để tìm kiếm những node liên quan với node đã chọn.

```script.js
<node>.parentNode;  // Node cha
<node>.childNodes[index];  // Mảng các node con
<node>.firstChild;  // Node con đầu tiên
<node>.lastChild;  // Node con cuối cùng
<node>.nextSibling;  // Node ngay phía sau
<node>.previousSibling;  // Node ngay phía trước
```

Các thuộc tính này trả về một tham chiếu tới đối tượng node khác có liên quan.



## C. DOM node

### 1. Node interface

Node là đối tượng cơ bản nhất trong DOM, mọi thứ trong document, element cũng là node. Bản chất node là một interface, các mọi object trong DOM đều implement interface này, nên mọi object trong DOM đều có thể xem như một node. Vì vậy, chúng có những thuộc tính và phương thức chung.

Node có thể là element, có thể là thuộc tính (HTML attribute), văn bản (text node), ghi chú (comment node). Ngoài ra còn có nhiều loại khác nữa như entity, notation, document type,... nhưng chúng ta không cần quan tâm quá nhiều.

**Node members**

```script.js
let e = document.getElementById("title");
e.nodeType;
```

Thuộc tính `nodeType` trả về một số, thể hiện loại node. Ví dụ như element node (1), attribute node (2), text node (3), comment node (8),...

Một element thực sự được tạo ra bởi nhiều node, do đó khi tạo element cần tạo nheièu node con và ghép chúng lại thành element hoàn chỉnh. Ví dụ như một thẻ a như sau.

```index.html
<a href="google.com">This is a link</a>
```

Thì sẽ gồm 3 node cơ bản.

```
Element node: a
Attribute node: href (google.com)
Text node: This is a link
```

Mỗi node sẽ có một thuộc tính là `nodeValue`, chứa giá trị của node.

**Root nodes**

Đối tượng document chứa hai node đặc biệt là `document.head`, `document.body` và `document.documentElement`. JS có thể truy cập vào hai node này, từ đó truy cập toàn bộ đối tượng trên trang web.

### 2. Create element

Để tạo một element trong DOM, gồm 4 bước:

* Tạo element node
* Tạo các text node, attribute node con
* Thêm các node con trên vào element node
* Thêm element node vào một vị trí nào đó

Ví dụ để thêm element link như phần trên, thì chúng ta sử dụng code sau.

```script.js
let a = document.createElement("a");
let text = document.createTextNode("This is a link");
let href = document.createAttributeNode("href");
href.value = "google.com";
a.appendChild(text);
a.setAttributeNode(href);
```

Đoạn code trên chỉ tạo một link, nhưng nó chưa xuất hiện. Bạn cần thêm nó vào một element nào đó bằng hai method sau.

```script.js
let box = document.getElementById("box");
box.appendChild(a);  // Chèn vào bên trong, ở cuối cùng
box.insertBefore(a);  // Chèn ở bên ngoài, phía trước
```

Ngoài cách tạo element bằng từng node con, chúng ta có thể thực hiện bằng một số method có sẵn của element. Ví dụ thay vì tạo node tr, td để chèn thêm dòng vào một table, thì chỉ cần select table đó rồi gọi method `insertRow()` của nó là xong.

Tuy nhiên, cách này yêu cầu bạn phải nhớ các method riêng dành cho từng loại element cụ thể, do đó ít khi được dùng.

### 3. Remove, replace element

**Remove method**

Sử dụng method `remove()` của element để xóa chính nó.

```script.js
let e = document.getElementById("item");
e.remove();
```

**RemoveChild method**

Đôi lúc vì trình duyệt không hỗ trợ nên method `remove()` có thể không hoạt động. Khi đó, chúng ta có thể xóa gián tiếp thông qua parentNode của nó, và xóa bằng method `removeChild()`.

```script.js
e.parentNode.removeChild(e);
```

**ReplaceChild method**

Dùng method `replaceChild` để thay thế một node bằng node mới.

```script.js
let old_node = document.getElementById("item");
let new_node = document.createElement("p");
let text = document.createTextNode("This is new item");
new_node.appendChild(text);
...
let parent = document.getElementById("container");
parent.replaceChild(new_node, old_node);
```

Method trên nhận hai param, param đầu là element mới, param 2 là element cũ cần thay thế.


### 4. HTMLcollection & NodeList

**HTMLcollection & NodeList**

Như đã nói ở trên, một số method dùng để tìm nhiều element như `getElementsByTagName()`, `getElementsByClassName()`, `querySelectorAll()` trả về các cấu trúc giống mảng, nhưng không phải mảng, là HTMLcollection và NodeList.

Cụ thể như sau:

* `getElementsByTagName()` trả về HTMLcollection
* `getElementsByClassName()`, `querySelectorAll()` trả về NodeList
* Thuộc tính `childNodes` của node nào đó cũng là một NodeList

**Compare to array**

Mặc dù HTMLcollection và NodeList có thể truy cập qua index tương tự array, có thuộc tính `length` để lấy độ dài, nhưng thực sự chúng  không phải array.

Chúng không có các method của array như `pop()`, `push()`, `shift()`,...

**HTMLcollection vs NodeList**

HTMLcollection chỉ chứa các element node, trong khi NodeList chứa mọi loại node.

HTMLcollection có thể truy cập bằng tên, id hoặc index, trong khi NodeList chỉ truy cập được qua index.

Trên đây là hai khác biệt giữa HTMLcollection và NodeList.

**Built in HTMLcollections**

Có một số HTMLcollection được xây dựng sẵn như sau.

```
document.forms;
document.links;
document.images;
document.scripts;
```

Ví dụ lấy HTMLcollection `document.forms`. Vì HTMLcollection có thể truy cập qua cả tên và index, do đó chúng ta có thể lấy ra một form bất kì trên trang web.

```script.js
document.forms["form_name"];  // Form có tên là form_name
document.forms[2];  // Form thứ 3
```

## D. DOM event

### 1. Overview

Chúng ta đã làm quen với event trong các chương trước. Về cơ bản event là một sự kiện xảy ra tại thời điểm nhất định, hoặc thỏa mãn một số điều kiện gì đó, và có thể được gán code cho nó. Khi event xảy ra (fire - bắn ra), thì code được gắn với event sẽ được thực thi.

Trong HTML event là một thuộc tính của element, có value là code JS để thực thi khi event xảy ra.

Thay vì gắn trực tiếp event trong HTML document khi viết code, thì chúng ta có thể gắn hoặc điều chỉnh event ngay trong runtime thông qua DOM.

```script.js
function closeApp() { ... }
document.getElementById("closeButton").onclick = closeApp;
```

Ví dụ trên định nghĩa hàm `closeApp()`, và dùng DOM để gắn nó cho event onclick của element (có id là closeButton). Khi click vào element này, sự kiện onclick được bắn ra, và hàm `closeApp()` được thực thi.

### 2. Event listener

Event listener có tác dụng lắng nghe event cụ thể của một element nào đó, và khi event đó xảy ra thì nó sẽ gọi một method đã chỉ định. Các method được gắn vào event listener gọi là event handler.

Event listener có thể lắng nghe các sự kiện từ mọi đối tượng DOM, không chỉ có các element trực quan trên trang web.

Lợi ích của event listener:

* Dễ dàng thêm và xóa: Xử lý event thông thường bạn phải thay đổi code HTML để làm điều này, nhưng với event listener, có thể thực hiện được cả trong thời gian chạy (runtime).
* Có thể có nhiều event handler: Event bình thường chỉ có một event handler, nhưng với event listener có thể thêm nhiều event handler cho một event.
* Tách code JS ra khỏi HTML: Tổ chức source code tốt hơn, và không phụ thuộc vào HTML document vốn cố định và không thay đổi.

**Add event listener**

Để thêm một event listener cho một event cụ thể của element được chọn, gọi method `addEventListener()` cho event đó. Có thể thêm cùng lúc nhiều event handler, hoặc nhiều loại event cho cùng một element.

```script.js
let btn = document.getElementById("btn");
btn.addEventListener("click", doSomeThing);
btn.addEventListener("mouseenter", function() { ... });
```

Phương thức nhận hai đối số bắt buộc:

* Param 1: chuỗi tên event, tương ứng với các event trong HTML nhưng không có từ "on" ở đầu.
* Param 2: hàm sẽ chạy khi event xảy ra.

Ngoài ra còn có param 3 tùy chọn là một boolean `useCapture` (mặc định false). Nếu tham số này là true, thì event sẽ sử dụng capturing, ngược lại là bubbling.

* Bubbling: đi từ element được chọn tới các tổ tiên. Ví dụ click vào nút thì onclick của nút được thực hiện đầu tiên, rồi tới onclick của parent và đi lên nữa.
* Capturing: ngược lại với bubbling, đi từ element tổ tiên trước rồi mới tới element hiện tại cuối cùng.

Khái niệm trên gọi là event propagation.

**Remove event listener**

Dùng xóa event listener cho element.

```script.js
btn.removeEventListener("click", doSomeThing);
```

Chú ý tên event và tên hàm được gọi phải giống với khi add, và chỉ remove được đối với event handler dạng gọi function (hàm ẩn danh sẽ không hoạt động).

**IE 8 support**

Phiên bản trình duyệt IE 8 không hỗ trợ hai method trên, nên phải thay bằng `attachEvent()` và `detachEvent()`.

Có thể dùng code sau để kiểm tra, nếu có method `addEventListener()` thì dùng, nếu không có thì dùng `attachEvent()` thay thế.

```script.js
if (btn.addEventListener)
    btn.addEventListener("click", doSomeThing);
else if
    btn.attachEvent("click", doSomeThing);
else
    console.log("Error");
```

Method `remove()` cũng tương tự.