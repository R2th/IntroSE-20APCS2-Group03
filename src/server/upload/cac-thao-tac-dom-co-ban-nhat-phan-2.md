Ở serries trước mình đã hướng dẫn các bạn làm quen với các thao tác cơ bản nhất về DOM: cách thêm mới, thay đổi, lựa chọn, xóa và kích hoạt một sự kiện trên dom thông qua **DOM Element, DOM HTML, DOM CSS, DOM Event.**

> TIếp theo chúng ta sẽ cùng thực hiện thêm một vài kỹ thuật nâng cao hơn đó là:
> 
> **DOM EventListener:** có nhiệm vụ lắng nghe các sự kiện tác động lên thẻ HTML đó.
> 
> **DOM Navigation:** dùng để quản lý, thao tác với các thẻ HTML, thể hiện mối quan hệ cha – con của các thẻ HTML.
> 
> **DOM Nodelist:** có nhiệm vụ thao tác với HTML thông qua đối tượng (Object).

# 1. DOM EventListener

> Nó có nhiệm vụ lắng nghe các sự kiện tác động lên thẻ HTML đó.
> 
> Phương thức addEventListener() gắn một trình xử lý sự kiện vào một phần tử mà không ghi đè các trình xử lý sự kiện hiện có.

> Bạn có thể thêm nhiều xử lý sự kiện vào một phần tử hoặc có thể thêm nhiều trình xử lý sự kiện của cùng một kiểu với một phần tử, ví dụ như hai sự kiện “click, mouseout” .
> 
> Bạn có thể thêm trình nghe sự kiện cho bất kỳ đối tượng DOM nào không chỉ các phần tử HTML. Tức là đối tượng window. Phương thức addEventListener() giúp bạn dễ dàng kiểm soát sự kiện phản ứng như thế nào với bubbling.

> Cú pháp của nó như sau:
> 
> elementObject.addEventListener('eventName', function(e){code});

> eventName: tên của sự kiện bỏ đi chữ on, ví dụ click, change, …

> function: hàm sẽ được chạy khi sự kiện eventName được kích hoạt
Chúng ta thử 1 ví dụ như sau:
```
HIện thông báo "Hello World!" khi user click vào phần tử mong muốn:

<h2>JavaScript addEventListener()</h2>

<p>This example uses the addEventListener() method to attach a click event to a button.</p>

<button id="myBtn">Try it</button>

<script>
document.getElementById("myBtn").addEventListener("click", function() {
  alert("Hello World!");
});
</script>
```
[Chạy thử tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_add)

> Giải thích: Đó là khi người dùng bấm click vào button có id là "myBtn". Sự kiện được hàm addEventListener() lắng nghe sau đó thực hiện hàm gọi lên thông báo mong muốn.

Tiếp đến chúng ta sẽ thử nghiệm một Node element lắng nghe nhiều sự kiện và thực thi chúng.

```
<h2>JavaScript addEventListener()</h2>

<p>This example uses the addEventListener() method to add many events on the same button.</p>

<button id="myBtn">Try it</button>

<p id="demo"></p>

<script>
var x = document.getElementById("myBtn");
x.addEventListener("mouseover", myFunction);
x.addEventListener("click", mySecondFunction);
x.addEventListener("mouseout", myThirdFunction);

function myFunction() {
  document.getElementById("demo").innerHTML += "Moused over!<br>";
}

function mySecondFunction() {
  document.getElementById("demo").innerHTML += "Clicked!<br>";
}

function myThirdFunction() {
  document.getElementById("demo").innerHTML += "Moused out!<br>";
}
</script>
```
[Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_add_many2)

> Ở đây có 3 sự kiện luôn được lắng nghe:
> 1. Sự kiện click vào phần tử có ID: 'myBtn'
> 2. Sự kiện di chuột vào phần tử này
> 3. Sự kiện di chuột ra ngoài phần tử này.

Hàm này còn có thể lắng nghe cả những sự kiện của trình duyệt như thay đổi kích cỡ màn hình. Và nó sẽ sinh ra một số ngẫu nhiên.
```
<h2>JavaScript addEventListener()</h2>

<p>This example uses the addEventListener() method on the window object.</p>

<p>Try resizing this browser window to trigger the "resize" event handler.</p>

<p id="demo"></p>

<script>
window.addEventListener("resize", function(){
  document.getElementById("demo").innerHTML = Math.random();
});
</script>
```
[Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_dom)

Và bạn có thể dễ dàng xóa một người nghe sự kiện bằng cách sử dụng phương thức removeEventListener().
```
<style>
#myDIV {
  background-color: coral;
  border: 1px solid;
  padding: 50px;
  color: white;
  font-size: 20px;
}
</style>
</head>
<body>

<h2>JavaScript removeEventListener()</h2>

<div id="myDIV">
  <p>This div element has an onmousemove event handler that displays a random number every time you move your mouse inside this orange field.</p>
  <p>Click the button to remove the div's event handler.</p>
  <button onclick="removeHandler()" id="myBtn">Remove</button>
</div>

<p id="demo"></p>

<script>
document.getElementById("myDIV").addEventListener("mousemove", myFunction);

function myFunction() {
  document.getElementById("demo").innerHTML = Math.random();
}

function removeHandler() {
  document.getElementById("myDIV").removeEventListener("mousemove", myFunction);
}
</script>
```
[Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_remove)

## Sự kiện Bubbling hay sự kiện Capturing
Có hai cách truyền sự kiện trong DOM HTML là Bubbling và Capturing.
 
Trong Bubbling, sự kiện phần tử bên trong được xử lý đầu tiên và sau đó là bên ngoài: sự kiện nhấp chuột của phần tử `<p>` được xử lý đầu tiên, sau đó là sự kiện nhấp chuột của phần tử ```<div>```.

Trong Capturing, sự kiện của phần tử bên ngoài được xử lý đầu tiên và sau đó là phần tử bên trong: sự kiện nhấp chuột của phần tử `<div>` sẽ được xử lý đầu tiên, sau đó là sự kiện nhấp chuột của phần tử `<p>`.

Với phương thức addEventListener(), bạn có thể chỉ định kiểu truyền thông bằng cách sử dụng tham số “useCapture”:

addEventListener(event, function, useCapture);

Giá trị mặc định là false, nó sẽ sử dụng lệnh bubbling propagation, khi giá trị được đặt thành true, sự kiện capturing được sử dụng.
```
document.getElementById("myP").addEventListener("click", myFunction, true);
document.getElementById("myDiv").addEventListener("click", myFunction, true);
```
[Ví dụ xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_usecapture)
    
# 2. JavaScript HTML DOM Navigation
Với HTML DOM, bạn có thể điều hướng các cây nút sử dụng các mối quan hệ node.
    
## 1. Node Các mối quan hệ
Các nút trong cây nút có mối quan hệ thứ bậc với nhau.

Các thuật ngữ cha mẹ, con, anh chị em và được sử dụng để mô tả các mối quan hệ.

Trong một cây nút, nút đầu được gọi là root (hoặc nút gốc)

Mỗi nút có chính xác một cha, ngoại trừ thư mục gốc (mà không có cha mẹ)

Một nút có thể có một số nút con

Anh chị em là các nút với cùng mẹ

Từ đoạn mã HTML phía trên ta có thể đọc những thông tin sau:

> `<html>` là root node
> 
> `<html>` Không có Node cha
> 
> `<html>` là cha của `<head>` và `<body>`
> 
> `<head>` là con đầu lòng của mẹ `<html>`
> 
> `<body>` là con út của `<html>`

Thêm nữa:

> `<head>` có 1 node con là `<title>`
> 
> `<title>` có một con là text node : "DOM Tutorial"
> 
> `<body>` có 2 đứa con xinh xắn dễ thương là` <h1>`  và `<p>`
> 
> `<h1>` có 1 con duy nhất laf:  "DOM Lesson one"
> 
> `<p>`  cũng vậy: "Hello world!"
> 
> `<h1>` và `<p>` anh em rụt cùng cha không khác mẹ.

> Di chuyển giữa các Node với nhau
> Bạn có thể sử dụng những thuộc tính node sau để di chuyển giữa các node:
> 
> 1. parentNode
> 2. childNodes[nodenumber]
> 3. firstChild
> 4. lastChild
> 5. nextSibling
> 6. previousSibling

    
## 2. Node con và giá trị của node
Một lỗi phổ biến trong chế biến DOM là để mong đợi một nút phần tử để chứa văn bản.
> <title id="demo">DOM Tutorial</title>

> Element node <title>  không chứa text.

Mà nó chứa Text Node là  "DOM Tutorial".

Giá trị của text node có thể được truy cập thuộc tính innerHTML của node:

> var myTitle = document.getElementById("demo").innerHTML;

Truy cập với thuộc tính innerHTML với việc truy cập vào nodeValue con đầu tiên:

> var myTitle = document.getElementById("demo").firstChild.nodeValue;

> Truy cập vào node con đầu tiên nó giống như này
> 
> var myTitle = document.getElementById("demo").childNodes[0].nodeValue;

Trong hướng dẫn này, chúng ta sử dụng thuộc tính innerHTML để lấy nội dung của một phần tử HTML.
```
<html>
    <body>
        <h1 id="id01">My First Page</h1>
        <p id="id02"></p>
        <script>
        document.getElementById("id02").innerHTML = document.getElementById("id01").innerHTML;
        </script>
         <script>
        document.getElementById("id02").innerHTML = document.getElementById("id01").childNodes[0].nodeValue;
        </script>
    </body>
</html>
```
[Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_nav_innerhtml1)


### 1. DOM Root Nodes

> Có 2 thuộc tính để truy cập toàn bộ document đó là:
> 
> document.body - The body of the document
>
> document.documentElement - The full document

Ta thử 1 ví dụ lấy toàn bộ source html trong node document và hiện lên phần thông báo của trình duyệt.
    
```
<p>Hello World!</p>

<div>
<p>The DOM is very useful!</p>
<p>This example demonstrates the <b>document.body</b> property.</p>
</div>

<script>
alert(document.body.innerHTML);
</script>
```
[Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_body)
    
### 2. The nodeName Property

The nodeName là thuộc tính đặc biệt của nodeName:
![](https://images.viblo.asia/2c6c8df7-4719-4e2b-b824-a251df3d8177.png)

> Lưu ý:
>
> nodeName chỉ có thể đọc
>
> nodeName của một element node giống tag name
>
> nodeName của attribute node là attribute name
>
> nodeName của một text node luôn là #text
>
> nodeName của document node luôn là #document
    
```
<h1 id="id01">My First Page</h1>
<p id="id02"></p>

<script>
document.getElementById("id02").innerHTML = document.getElementById("id01").nodeName;
</script>
```
[Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_nav_nodename)

    
### 3. The nodeType Property
NodeType property ichỉ có thể đọc. Nó trả về Type của Node.

```
<h1 id="id01">My First Page</h1>
<p id="id02"></p>

<script>
document.getElementById("id02").innerHTML = document.getElementById("id01").nodeType;
</script>
```
 [Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_nav_nodetype)
    
# 3. The HTML DOM NodeList Object
A NodeList object là một danh sách các nút được chiết xuất từ một tài liệu.

Tất cả các trình duyệt trả về một đối tượng NodeList cho childNodes thuộc tính.

> Phương thức sử dụng: querySelectorAll(). Lấy toàn bộ thẻ `<p>` được lựa chọn

Ví dụ gán giá trị từ Node anh em:
```
<h2>JavaScript HTML DOM!</h2>

<p>Hello World!</p>

<p>Hello Norway!</p>

<p id="demo"></p>

<script>
var myNodelist = document.querySelectorAll("p");
document.getElementById("demo").innerHTML =
"The innerHTML of the second paragraph is: " +
myNodelist[1].innerHTML;
</script>
```
    
[Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_nodelist)

## HTML DOM Node List Length
Thuộc tính chiều dài xác định số nút trong một danh sách NodeList ` <p>`:
 
```
<h2>JavaScript HTML DOM!</h2>

<p>Hellow World!</p>

<p>Hellow Norway!</p>

<p id="demo"></p>

<script>
var myNodelist = document.querySelectorAll("p");
document.getElementById("demo").innerHTML =
"This document contains " + myNodelist.length + " paragraphs.";
</script>
```
[Xem tại đây](https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_nodelist_length)
> 
> Chú ý:
> 
> Một Node List không phải là một array, nhìn nó có thể rất giống.
> 
> bạn có thể lặp một Node list và tham chiếu giống như là một array vậy.
> 
> Tuy nhiên bạn không thể dùng các array methods như:  valueOf(), push(), pop(), or join() cho 1 node list.

# Tổng kết:
Chúng ta đã trải qua một quá trình làm quen với  HTML DOM, JAVASCRIPT DOM từ bài bản đến đây là đã có thể áp dụng được cho rất nhiều trường hợp trong lập trình giao diện web.
    ![](https://images.viblo.asia/05384678-56d0-416d-a6b7-fbb8ce29b3f0.png)
Dựa trên kiến thức đã có được trong bài viết này tôi tin rằng các bạn đã có đủ nền tảng để cải thiện nâng cao kỹ thuật này nhờ việc thực hành và tìm hiểu thêm những kỹ thuật mới.
 
Kết thúc sơ ri này tôi rất cảm ơn sự đồng hành của các bạn. Mong nhận được nhiều ý kiến đóng góp của các bạn để cải thiện trong những sơ ri tiếp theo.