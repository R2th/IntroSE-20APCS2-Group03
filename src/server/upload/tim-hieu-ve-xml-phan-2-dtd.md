Ở [phần 1 ](https://viblo.asia/p/tim-hieu-ve-xml-phan-1-gAm5ybxwKdb) mình đã giới thiệu sơ lược về XML là gì. Và ở phần này mình sẽ giới tiếp về **Document Type Definition (DTD)** cho mọi người nhé! Bắt đầu nào :wink:

### DTD (Document Type Definition) là gì?
- Là tài liệu dùng để định nghĩa kiểu dữ liệu cho các phần tử của tài liệu XML.
*  Khi đọc tài liệu XML, chỉ cần đọc phần DTD là sẽ biết được cấu trúc XML.

**Vậy tại sao lại sử dụng DTD?**
* Với một DTD, mỗi file XML có thể mang một mô tả định dạng của nó.
*  Các nhóm độc lập có thể chấp nhận một chuẩn DTD ñể trao đổi dữ liệu.
*  Một ứng dụng có thể sử dụng một DTD chuẩn thể kiểm tra dữ liệu nhận về từ bên ngoài xem có hợp lệ hay không.


### Các kiểu khai báo
**1. Khai báo DTD nội**
* Nếu DTD được khai báo bên trong file XML được nằm trong định nghĩa DOCTYPE `<!DOCTYPE root-element [element-declarations]>`

Ví dụ:
```php
<?xml version="1.0"?>
// Khai báo DTD nội
<!DOCTYPE note [
    <!ELEMENT note (to,from,heading,body)>
    <!ELEMENT to (#PCDATA)>
    <!ELEMENT from (#PCDATA)>
    <!ELEMENT heading (#PCDATA)>
    <!ELEMENT body (#PCDATA)>
]>
<note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget
</note>
```
Mình sẽ giải thích 1 chút về nội dung bên trong nhé :

* **!DOCTYPE note**: định nghĩa phần tử gốc của tài liệu là note
* **!ELEMENT note**: định nghĩa phần tử note chứa 4 phần tử: **to, from, heading, body**
* **!ELEMENT to**: định nghĩa phần tử to thuộc kiểu #PCDATA
*  **!ELEMENT from**: định nghĩa phần tử from thuộc kiểu #PCDATA
*  **!ELEMENT heading**: định nghĩa phần tử heading thuộc kiểu #PCDATA
*  **!ELEMENT body**: định nghĩa phần tử body thuộc kiểu #PCDATA

**2. Khai báo DTD ngoại**
* Nếu DTD ñược khai báo bên trong file bên ngoài được nằm trong định nghĩa DOCTYPE: `<!DOCTYPE root-element SYSTEM "filename">`

Ví dụ:
```php
<?xml version="1.0"?>
<!DOCTYPE note SYSTEM "note.dtd">
<note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>

// File note.dtd:
<!ELEMENT note (to,from,heading,body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
```

**3. Khai báo phần tử**
* Phần tử `<!ELEMENT>` dùng để định nghĩa kiểu dữ liệu cho một phần tử của một tài liệu XML.
```php
<!ELEMENT element-name category>
hoặc
<!ELEMENT element-name (element-content)>
```
* Phần tử với kiểu rỗng: `<!ELEMENT element-name EMPTY>`. Ví dụ thẻ `<br />`
* Phần tử có kiểu văn bản: `<!ELEMENT element-name (#PCDATA)>`. Ví dụ:
```php
<!ELEMENT from (#PCDATA)>
```
* Phần tử với kiểu dữ liệu bất kỳ: `<!ELEMENT element-name ANY>`. Ví dụ:
```php
<!ELEMENT note ANY>
```
* Định nghĩa phần tử có chứa một phần tử con: `<!ELEMENT element-name (child-name)>`. Ví dụ:
```php
<!ELEMENT note (message)>
```
* Phần tử có 0 hoặc 1 con: `<!ELEMENT element-name (child-name?)>`. Ví dụ
```php
<!ELEMENT note (message?)>
```
* Phần tử có một trong các phần tử con: `<!ELEMENT note (to,from,header,(message|body))>`
 
* Phần tử chứa phần tử con hoặc dữ liệu: `<!ELEMENT note (#PCDATA|to|from|header|message)*>`
* 
**4. Khai báo thuộc tính với <!ATTLIST>**
* Phần tử `<!ATTLIST> `dùng để định nghĩa kiểu tư liệu của các thuộc tính cho một phần tử trong tài liệu XML

`<!ATTLIST element-name attribute-name attribute-type default-value>`

```php
// DTD:
<!ATTLIST payment type CDATA "check">
// XML:
<payment type="check" />
```
* Các kiểu thuộc tính:


| Kiểu | Mô tả |
| -------- | -------- | 
| CDATA     | Thuộc tính này chỉ có thể chứa kiểu dữ liệu kí tự     |
|(en1, en2,..)|Thuộc tính chỉ nhận giá trị từ danh sách này|
|ID|Giá trị của thuộc tính này không được trùng nhau và bắt đầu bởi 1 chữ cái|
|IDREF|Giá trị của thuộc tính này phải là một trong các giá trị của thuộc tính ID của các phần tử khác|
|IDREFS|Giá trị của thuộc tính này phải là các giá trị của các thuộc tính có kiểu ID|
|NMTOKEN|Giá trị là một tên XML hợp lệ|
|NMTOKENS|Giá trị là một danh sách các tên XML hợp lệ|
|ENTITY|Giá trị là một thực thể|
|ENTITIES|Giá trị là một danh sách các thực thể|
|NOTATION|Giá trị là tên của một kí hiệu|
|xml:|Giá trị là một giá trị xml ñã ñịnh sẵn|

**Tránh sử dụng thuộc tính?**
Có một số vấn đề với thuộc tính, đó là:
* Không thể chứa nhiều giá trị (trong khi phần tử con có thể)
* Không dễ dàng mở rộng trong tương lai
* Không mô tả các cấu trúc
* Khó ñể thao tác bởi đoạn mã lập trình
* Các giá trị thuộc tính là không dễ dàng để kiểm tra một DTD

### Thực thể
* Các thực thể là các biến được sử dụng để định nghĩa shortcuts tới đoạn text chuẩn hoặc các kí tự đặc biệt.
* Các tham chiếu thực thể là các tham chiếu tới các thực thể
* Các thực thể có thể được khai báo bên trong hoặc bên ngoài
    * Khai báo bên trong: `<!ENTITY entity-name "entity-value">`. 
    * Khai báo bên ngoài: `<!ENTITY entity-name SYSTEM "URI/URL">`
    * Ví dụ:
```php
// Khai báo bên trong
    // DTD:
    <!ENTITY writer "Donald Duck.">
    <!ENTITY copyright "Copyright W3Schools."> 
    // XML:
    <author>&writer;&copyright;</author>
    
// Khai báo bên ngoài
     // DTD:
    <!ENTITY writer SYSTEM
    "http://www.w3schools.com/entities.dtd">
    <!ENTITY copyright SYSTEM
    "http://www.w3schools.com/entities.dtd">
    //XML:
    <author>&writer;&copyright;</author>
```

Như vậy mình đã giới thiệu thêm 1 khái niệm mới trong XML. Phần tiếp theo mình sẽ giới thiệu về XML DOM nhé, 1 trong những phần quan trọng của XML.

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo**: Bài giảng Tích hợp dữ liệu & XML - DHBKHN