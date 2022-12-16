> Tiếp theo sơ ri này mình muốn đề cập lại về sức mạnh lập trình HTML động thông qua DOM.
> Với DOM cùng JavaScript nhận được tất cả sức mạnh cần thiết để tạo ra HTML động:
> * JavaScript có thể thay đổi tất cả các phần tử HTML trong trang
> * JavaScript có thể thay đổi tất cả các thuộc tính HTML trong trang
> * JavaScript có thể thay đổi tất cả các phong cách CSS trong trang
> * JavaScript có thể loại bỏ các yếu tố HTML và thuộc tính hiện tại
> * JavaScript có thể thêm các yếu tố HTML mới và các thuộc tính
> * JavaScript có thể phản ứng với tất cả các sự kiện HTML hiện trong trang
> * JavaScript có thể tạo ra các sự kiện HTML mới trong trang
> ....

> Để có thể làm được như vậy chúng ta cần tiếp tục theo dõi phần kế tiếp. Mình sẽ hướng dẫn các bạn tác động lên từng thành phần của HTML thông qua DOM.

## DOM Tree
```
<html>
  <body height="800px">
      <div>
        <p>12345678</p>
       </div>
  </body>
<html>
```

```
|documentElement (HTML)
   |bodyElement (BODY)
      |heightAttribute (value = 800px)
      |textNode (CDATA = '12345678')
```

> Thế nào là nút Gốc (document node): document HTML là nút gốc, điểm bắt đầu xây dựng cây DOM
> 
> Nút phần tử (element node): `<body> <ul> <tr> <head> <title> <a> <div> <p> ` ... được phép có các nhánh con. 
> 
>  Nút thuộc tính (attribute node): là nút con của nút phần tử, đây là lá, không có nhánh. Attribute là thuộc tính của các phần tử DOM.  Attribute cho biết các đặc điểm của phần tử DOM đó => thẻ body có chiều cao là 800px.
>  
> Nút văn bản (text node): <p> <h1> <a> <span> <li> <td> <th> nút văn bản, đây là lá, không có nhánh. Cho biết nội dung có thể đọc (human readable), bởi đã là văn bản tất nhiên phải có nội dung gì đó để đọc. 
> Ngoài ra DOM còn có thêm nút chú thích (comment node).
Chúng ta có một biểu diễn HTMl  thành cấu trúc 1 DOM như sau:
![](https://images.viblo.asia/ddc1ff9f-d46a-41dc-b4f7-543cc59bab6d.jpg)
## Các bước thao tác DOM cơ bản
Vậy bây giờ mình sẽ thực hành lựa chọn đúng phần tử HTML để tạo ra những tác động như phần trên đã nêu.
### Bước 1: Những cách để lựa chọn DOM.

> 1. Qua ID của phần tử => document.getElementById('test-id')
> 2. Qua tên của phần tử => document.getElementsByTagName('p')[0]
> 3. Qua tên class của phần tử =>  document.getElementsByClassName('class-name')[0]
> 4. Qua name của phần tử =>  document.getElementsByName('test-name')
> 5. Qua độ sâu cụ thể => document.querySelectorAll("div p#test-id")
> 6. Chọn cả 1 mảng nhiều phần tử => document.querySelectorAll("div p") => chứa 1 mảng 2 phần tử ` <p>`

![](https://images.viblo.asia/467ce998-296e-4679-8a32-312b1490af77.png)

### Bước 2: Cách thay đổi giá trị trong DOM
### Gán giá trị mới cho  text node
```
<html>
  <body>
    <h1 id="test-id">Giá trị hiện tại</h1>
    <script>
      document.getElementById("test-id").innerHTML = "Giá trị đã được thay đổi";
    </script>
  </body>
</html>
```
 Và đoạn code này có ý nghĩa rằng tìm thẻ có id="test-id" và gán nội dung HTML bên trong của thẻ này là dòng chữ "Giá trị đã được thay đổi".
    
 ### Đổi styling phần tử
Chúng ta hoàn toàn có thể sử dụng để styling một thành phần trong HTML bằng cách chọn thành phần đó và dùng code dưới đây

```
element.style.color = "#ff3333";

element.style.marginTop = "20px";

element.style.paddingTop = "10px";
```
Ví dụ sau:
```
<div id="demo" style="width:100px">Nội dung Ví dụ</div>

<script>
  var x = document.getElementById("demo");
  x.style.color = "3333FF";
  x.style.width = "200px";
</script>
```
Ví dụ trên đã thay đổi color và width của phần tử thẻ div
    
###  Thay đổi thuộc tính phần tử trong DOM
    
 Ví dụ: phần tử HTML <img> như đã biết có thuộc tính src để chỉ ra URL hình ảnh mà thẻ đó hiện thị, đã biết nó có thuộc tính với tên là src thì sau khi có phần từ này từ DOM, bạn có thể đọc, gán thuộc tính và nó sẽ cập nhật lại trang HTML nếu gán
```
<img id="myimg" src="orange.png" alt="" />

<script>
    var el = document.getElementById("myimg");
    el.src = "apple.png";
</script>
```
Tương tự, thay đổi thuộc tính href trong phần tử liên kết <a>    
```
<a href="http://www.example.com">Some link</a>

<script>
    var el = document.getElementsByTagName("a");
    el[0].href = "https://smartnext.vn";
</script>
```

### Còn những cách tác động khác:

> element.appendChild(newNode)	Thêm phần tử newNode vào phần tử element nó trở thành phần tử con sau cùng của element
>     
> element.insertBefore(newNode, node1)	Chèn phần tử newNode nằm phía trước node1
> 
> element.replaceChild(newNode, oldNode)	Thay thế phần tử oldNode bằng phần tử newNode 
```
<h1 id ="demo">nội dung ví dụ</h1>

<button onclick="add_child()">KẾT QUẢ</button>
<script>
   function add_child() {
       //tạo phần tử p    
       var span = document.createElement("span");

       //tạo phần tử text
       var node = document.createTextNode(" Some new text");

       //gắn node vào span
       span.appendChild(node);
       
       //Thay đổi một số thuộc tính của p
       span.appendChild(node);
       span.style.color = "white";
       var h1 = document.getElementById("demo");
       //gắn span vào h1
       div.appendChild(span);
   }
</script>  
```
Đoạn code trên làm thay đổi h1 với id demo tạo ra 1 nội dung như sau:

![](https://images.viblo.asia/e46bcf30-ef55-44c9-92c7-886c01bcc89d.png)
Tương tự thì ta có phương thức

removeChild() dùng để xóa đi một thành phần con nào đó.

```
<div id="top">
  <div id="nested"></div>
</div>
```
Bây giờ sẽ xóa bỏ phần từ có id là "nested".
```
var d = document.getElementById("top");
var d_nested = document.getElementById("nested");
var throwawayNode = d.removeChild(d_nested);
```
replaceChild() để thay thế một thành phần con nào đó bằng một thành phần mới.
```
<div id="demo">
    <p id="p1">This is a paragraph.</p>
    <p id="p2">This is another paragraph.</p>
</div>

<script>
    var p = document.createElement("p");
    p.innerText = 'Đây là đoạn văn mới tạo ra';

    var parent = document.getElementById("demo");
    var child = document.getElementById("p1");
    parent.replaceChild(p, child);
</script>
```
##  Tổng kết
> Ở phần một này chúng ta đã được làm quen với thao tác DOM cơ bản nhất hay thường được sử dụng nhất đó là:
> 1.  DOM Element: có nhiệm vụ truy xuất tới thẻ HTML nào đó thông qua các thuộc tính như tên class, id, name của thẻ HTML.
> 2. DOM HTML: Chuyên được dùng đễ xử lý các vấn đề liên quan đến nội dung, thuộc tính của thẻ HTML
> 3. DOM CSS: có nhiệm vụ thay đổi các định dạng CSS của thẻ HTML.
> 4. DOM Event: có nhiệm vụ gán các sự kiện như onclick(), onload() vào các thẻ HTML

> Đến với phần 2 tiếp theo mình sẽ cùng tìm hiểu kỹ hơn về kỹ thuật DOM nâng cao, phức tạp hơn đó là:
> 1. DOM EventListener: có nhiệm vụ lắng nghe các sự kiện tác động lên thẻ HTML đó.
> 
> 2. DOM Navigation: dùng để quản lý, thao tác với các thẻ HTML, thể hiện mối quan hệ cha – con của các thẻ HTML.
> 
> 3. DOM Nodelist: có nhiệm vụ thao tác với HTML thông qua đối tượng (Object).
> 
> Rất cảm ơn sự quan tâm từ các bạn đọc giả! Mong sẽ nhận được nhiều ý kiến đóng góp và chia sẻ nhều hơn từ các bạn.
## Nguồn tài liệu tham khảo
Javascript & DOM: https://xuanthulab.net/cap-nhat-thuoc-tinh-phan-tu-dom-javascript.html

Thạch Phạm: https://thachpham.com/web-development/javascript/dom-trong-javascript-can-ban.html#ftoc-heading-9

Một số thao tác DOM hữu ích: https://techblog.vn/mot-so-cau-lenh-javascript-huu-ich-de-thao-tac-voi-dom