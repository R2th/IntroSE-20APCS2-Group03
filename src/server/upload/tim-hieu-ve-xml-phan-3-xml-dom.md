Nối tiếp về tìm hiểu XML thì hôm nay mình sẽ viết tiếp về phần XML DOM - Cấu trúc thư mục của XML. Cùng tìm hiểu nào!
## 1. DOM là gì?
- DOM là viết tắt của từ Document Object Model, định nghĩa chuẩn của truy cập tài liệu.
- Nó định nghĩa các đối tượng và thuộc tính của tất cả các phần tử tài liệu, và các phương thức truy cập vào chúng.
- DOM gồm có 3 phần:

    - **Core DOM**: mô hình chuẩn cho các tài liệu có cấu trúc.
    - **XML DOM:** mô hình chuẩn cho các tài liệu XML
    - **HTML DOM**: mô hình chuẩn cho các tài liệu HTML
###     XML DOM
* Là một chuẩn W3C.
* Là mô hình đối tượng chuẩn cho XML. 
* Nó định nghĩa một chuẩn cho truy cập và thao tác với tài liệu XML
*  Là một giao diện lập trình chuẩn cho XML 
## 2. Các nút DOM
Mọi thứ trong một tài liệu XML đều là nút.
* **Document node**: Toàn bộ tài liệu là nút tài liệu.
* **Element node**: Mỗi phần tử XML là nút phần tử.
* **Text node**: Văn bản trong các phần tử XML là nút văn bản.
*  **Attribute node**: Mỗi thuộc tính là nút thuộc tính.
*  **Comment node**: Chú thích là nút chú thích.

## 3. Cây nút XML DOM
* XML DOM coi một tài liệu XML là một cấu trúc cây, gọi là cây nút.
* Ta có thể truy cập tới tất cả các nút của cây và có thể thêm mới, sửa, xóa các phần tử.

Mình sẽ lấy ví dụ để phân tích dễ hơn và mình sẽ dùng ví dụ này xuyên suốt cả bài luôn nhé! ([books.html](https://www.w3schools.com/xml/books.xml))
```php
<?xml version="1.0" encoding="ISO-8859-1"?>
<bookstore>
    <book category="cooking">
        <title lang="en">Everyday Italian</title>
        <author>Giada De Laurentiis</author>
        <year>2005</year>
        <price>30.00</price>
    </book>
    <book category="children">
        <title lang="en">Harry Potter</title>
        <author>J K. Rowling</author>
        <year>2005</year>
        <price>29.99</price>
    </book>
    <book category="web">
        <title lang="en">XQuery Kick Start</title>
        <author>James McGovern</author>
        <author>Per Bothner</author>
        <author>Kurt Cagle</author>
        <author>James Linn</author>
        <author>Vaidyanathan Nagarajan</author>
        <year>2003</year>
        <price>49.99</price>
    </book>
    <book category="web" cover="paperback">
        <title lang="en">Learning XML</title>
        <author>Erik T. Ray</author>
        <year>2003</year>
        <price>39.95</price>
    </book>
</bookstore>
```
Từ ví dụ trên ta sẽ có được 1 cây thư mục như sau:
![](https://images.viblo.asia/42a4640e-2c2f-4aa6-b9d6-d0100324f82b.png)

Nhìn vào hình có lẽ mọi người cũng đã hình dung được cấu trúc cây rồi đúng không ạ.

* Nút gốc là `<bookstore>`. 
* Các nút khác trong tài liệu phải nằm trong nút gốc này.
* Dưới nút gốc có 4 nút `<book>`. Trong mỗi nút `<book>` là các nút con. Với nút đầu tiên thì nút con là `<title>, <author>, <year>, <price>`. 

*    Mỗi nút con này chứa các nút text:` "Everyday Italian", "Giada De Laurentiis", "2005",  "30.00"`
*   ***Note***: text của nút phần tử được chứa trong nút text.
    *    Ví dụ: `<year>2005</year>,` nút phần tử <year> có một nút text có giá trị "2005" và "2005" không phải giá trị của nút phần tử year.

Như vậy qua ví dụ trên ta thấy các nút trong cây có mối quan hệ phân cấp với các nút khác.
* Nút đỉnh sẽ là nút gốc của cây.
* Mỗi nút (trừ nút gốc) đều có 1 nút cha.
* Một nút có thể có không/một/nhiều nút con
* Nút lá là nút không có nút con.
* Các nút anh em là các nút có cùng nút cha.

![](https://images.viblo.asia/cce58ba1-bc02-4d13-ad7b-2160abd85e80.png)

## 4. Các thuộc tính của XML DOM
   Một số thuộc tính đặc trưng của XML DOM là:
*    x.**nodeName**: tên của x
*    x.**nodeValue**: giá trị của x
*    x.**parentNode**: nút cha của x
*    x.**childNodes**: các nút con của x
*    x.**attributes**: các nút thuộc tính của x
### **Phương thức XML DOM**
    

|  Phương thức | ĐỊnh nghĩa | Ví dụ |
| -------- | -------- | -------- |
| **x.getElementsByTagName(name)**    | lấy về tất cả các phần tử mà tag có tên là name    |x = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue|
| **x.appendChild(node)**    | thêm một nút con vào nút x | x = xmlDoc.getElementsByTagName("book")[0]; x.appendChild(newElement)|
| **x.removeChild(node)**    |loại một nút con ra khỏi nút x | y = xmlDoc.getElementsByTagName("book")[0]; xmlDoc.documentElement.removeChild(y);|
    
Để tính chiều dài danh sách nút DOM, ta có thể:
*    Sử dụng thuộc tính **length** của danh sách nút
*    Hoặc sử dụng vòng lặp để duyệt
*    Ví dụ
```php
xmlDoc=loadXMLDoc("books.xml");
x=xmlDoc.getElementsByTagName("title");
for (i=0;i<x.length;i++){
    document.write(x[i].childNodes[0].nodeValue);
    document.write(" <br /> ");
}
```
##       5.     Thông tin nút XML DOM
*    Mỗi nút là một đối tượng và chúng đều có phương thức và thuộc tính.
*    Có ba thuộc tính quan trọng của một nút: `nodeName, nodeValue, nodeType`
### Thuộc tính nodeName
- Cho biết tên của 1 nút
- Read-only
- nodeName của một nút phần tử chính là tên thẻ
- nodeName của một nút thuộc tính chính là tên thuộc tính
- nodeName của một nút text là #text
- nodeName của một nút tài liệu là #document
* VÍ dụ
```php
<script>
    xmlDoc=loadXMLDoc("books.xml");
    document.write(xmlDoc.documentElement.nodeName);
</script>
```

### Thuộc tính nodeValue
* Cho biết giá trị của nút
*  nodeValue của các nút phần tử là không xác định
*  nodeValue của nút text chính là text
*  nodeValue của nút thuộc tính là giá trị thuộc tính
*  Nó lấy về giá trị của một phần tử
* Ví dụ:
```php
<script>
    xmlDoc=loadXMLDoc("books.xml");
    x=xmlDoc.getElementsByTagName("title")[0].childNodes[0];
     // Lấy giá trị nút text của phần tử <title> đầu tiên
    txt=x.nodeValue;
    document.write(txt);
</script>
```
### Thuộc tính nodeType
* Cho biết kiểu của nút
*  Read-only
*  Một số kiểu quan trọng:

|  Node type | NodeType |
| -------- | -------- |
| Element     | 1     |
| Attribute     | 2     |
| Text     | 3     |
| Comment     | 8     |
| Document     | 9     |

* Ví dụ
```php
<script>
    xmlDoc=loadXMLDoc("books.xml");
    document.write(xmlDoc.documentElement.nodeName);
    document.write("<br>");
    document.write(xmlDoc.documentElement.nodeType);
</script>
```
## 6. Định hướng trong cây
- Là việc truy cập vào các nút thông qua mối quan hệ giữa các nút.
* Các thuộc tính của nút


| Thuộc tính | Định nghĩa | 
| -------- | -------- | -------- |
| parentNode     | Tất cả các nút (trừ gốc) đều có duy nhất một nút cha.   | 
| childNodes     | Tham chiếu đến các nút con trực tiếp của nút hiện tại. Kết quả là 1 mảng các đối tượng    | 
| firstChild     | Trả về nút con đầu tiên của nút hiện tại (tương đương với Node.childNodes[0]). | 
| lastChild     | Trả về nút con cuối cùng của nút hiện tại (tương đương với Node.childNodes[Element.childNodes.length-1]). | 
| nextSibling     | Gọi đến nút anh em nằm liền kề sau với nút hiện tại.| 
| previousSibling     | Gọi đến nút anh em nằm liền kề trước với nút hiện tại.| 
***Note***: Một số trình duyệt (như FireFox) coi kí tự trắng và xuống dòng là nút text (và đây là nút text rỗng). Để tránh truy cập vào phần tử text rỗng này ta sử dụng hàm kiểm tra kiểu nút
```php
function get_nextSibling(n){
    y=n.nextSibling;
    while (y.nodeType!=1){
        y=y.nextSibling;
    }
    return y;
}
```
## 7. Thao tác với các nút
| Phương thức| Định nghĩa| Ví dụ |
| -------- | -------- | -------- |
| getAttribute()     | Lấy giá trị text của thuộc tính   | xmlDoc.getElementsByTagName("title")[0].getAttribute("lang");  |
| getAttributeNode()     | Trả về một nút thuộc tính. | x=xmlDoc.getElementsByTagName("title")[0].getAttributeNode("lang"); txt=x.nodeValue;  |
| setAttribute()     |Tạo mới nếu chưa có thuộc tính, ghi đè nếu đã có thuộc tính | x=xmlDoc.getElementsByTagName('book'); x[0].setAttribute("category","food");  |
| removeChild()     |Xóa một nút | y=xmlDoc.getElementsByTagName("book")[0]; xmlDoc.documentElement.removeChild(y);  |
| removeAttribute()     |Xóa một thuộc tính |x=xmlDoc.getElementsByTagName("book");  x[0].removeAttribute("category"); |
| replaceChild()     |Thay thế một nút phần tử|y=xmlDoc.getElementsByTagName("book")[0]; xmlDoc.documentElement;.replaceChild(newNode,y); // newNode là 1 node mới dùng để thay thế|
| replaceData()     |Thay thế dữ liệu trong một nút text với 3 tham số truyền vào:   **offset**: vị trí kí tự đầu tiên sẽ thay thế, bắt đầu từ 0. **length**: số kí tự cần thay thế. string: chuỗi mới cần chèn vào|x=xmlDoc.getElementsByTagName("title")[0].childNodes[0]; x.replaceData(0,8,"Easy");|
| createAttribute()     | Tạo một nút thuộc tính mới  |xmlDoc.createAttribute("edition");  |
| setAttribute()     | Tạo nút thuộc tính mới nếu nó chưa tồn tại.  |x=xmlDoc.getElementsByTagName('book'); x[0].setAttribute("edition","first");
| createTextNode()     | Tạo một nút text |xmlDoc.createElement("edition").createTextNode("first"); |
| createComment()     | Tạo nút comment |xmlDoc.createComment("Revised March 2008");|
| appendChild()     | Thêm một nút con vào nút hiện tại.|newel=xmlDoc.createElement("edition"); x=xmlDoc.getElementsByTagName("book")[0]; x.appendChild(newel);|
| insertBefore()     | Chèn một nút trước một nút con xác định.|newNode=xmlDoc.createElement("book"); x=xmlDoc.documentElement; y=xmlDoc.getElementsByTagName("book")[3]; x.insertBefore(newNode,y); |
| insertData()     | Thêm dữ liệu vào nút text đang có với 2 tham số: **offset**: chỉ số bắt đầu chèn kí tự (tính từ 0), **string**: chuỗi cần chèn  |x=xmlDoc.getElementsByTagName("title")[0].childNodes[0]; x.insertData(0,"Easy ");|
| cloneNode()     | Tạo ra một bản sao của một nút xác định. Có 1 tham số nhận giá trị **true/false**, cho biết nút sao có bao gồm các thuộc tính và các nút con của nút ban ñầu hay không. |oldNode=xmlDoc.getElementsByTagName('book')[0]; newNode=oldNode.cloneNode(true);  

Trên đây là những kiến thức cơ bản về phần XML DOM mà mình tìm hiểu. Để có thể chạy được các ví dụ trên, mọi người lên [W3Shool](https://www.w3schools.com/xml/tryit.asp?filename=try_dom_insertbefore) để thực hành nhé!

**Tài liệu tham khảo:**
* https://www.w3schools.com/xml/dom_intro.asp
* Bài giảng Tích hợp dữ liệu & XML - DHBKHN