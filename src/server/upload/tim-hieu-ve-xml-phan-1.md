Trong lập trình web, XML được ứng dụng nhiều nhất đó là xây dựng các Service và API, nghĩa là các API đó sẽ trả kết quả về dạng XML hoặc JSON để các hệ thống khác có thể hiểu được. Ví dụ để tạo một ứng dụng book phòng trên mobile ta cần xây dựng một Service làm nhiệm vụ trả kết quả danh sách phòng về cho App Mobile. Nhưng ngôn ngữ lập trình Mobile lại khác hoàn toàn so với PHP hay C# nên ta phải trao đổi dữ liệu thông qua XML hoặc JSON. Tuy JSON được sử dụng phổ biến hơn, nhưng hôm nay mình sẽ giói thiệu về XML cho mọi người cùng biết. Cùng tìm hiểu nhé!:wink:

### XML là gì?
- XML là từ viết tắt của từ **eXtensible Markup Language**, hay còn gọi là ngôn ngữ đánh dấu mở rộng với mục đích tạo ra các ngôn ngữ đánh dấu khác.
- Nó dùng để cấu trúc, lưu trữ và trong trao đổi dữ liệu giữa các ứng dụng và lưu trữ dữ liệu. Ví dụ khi ta xây dựng một ứng dụng bằng C# và một ứng dụng bằng PHP thì hai ngôn ngữ này không thể hiểu nhau, vì vậy ta sẽ sử dụng XML để trao đổi dữ liệu.
* XML đơn giản hóa việc chia sẻ và truyền tải dữ liệu, độc lập khi thay đổi platform.

**So sánh XML với HTML**

- XML và HTML giống nhau đều là các thẻ (tag)

|  XML | HTML| 
| -------- | -------- | 
| Do người dùng định nghĩa     | Được định nghĩa trước và người dùng phải tuân thủ     |
|Được thiết kế để chuyển tải và lưu trữ dữ liệu, tập trung vào "what data are"|Được thiết kế để hiển thị dữ liệu, tập trung vào "how data look"|

Tuy nhiên XML không phải là sự thay thế cho HTML.

* Ví dụ:	
```php
<?xml version="1.0" encoding="UTF-8"?>
     <book>
         <title>Italian</title>
         <author>Giada De Laurentiis</author>
         <year>2005</year>
         <price>30.00</price>
     </book>
```
###    Đơn vị xây dựng của XML
* Phần tử
*  Thuộc tính
*  Thực thể
*  PCDATA
*  CDATA
### Các quy tắc trong XML
* Phải có một phần tử gốc duy nhất chứa tất cả các phần tử khác trong tài liệu
* Mỗi tag mở phải có một tag đóng giống như nó.

Ở ví dụ trên cặp thẻ `<book></book>` chính là root bao bọc toàn bộ thông tin của các tag chứa tệp 
* Các cặp ký tự của tag mở và tag đóng phải giống nhau hoàn toàn
```php
<OrderDate>2011-09-03</Orderdate> // sai vì thẻ mở có D viết hoa còn thẻ đóng lại là d viết thường
```
* Mỗi phần tử con phải nằm trọn bên trong phần tử cha của nó
* Giá trị của thuộc tính phải được đặt trong cặp dấu nháy kép hoặc cặp dấu nháy đơn
```php
<Product productID="1">Chair</Product> // productID là thuộc tính của thẻ Product
```
### Khai báo Header (Chỉ thị xử lý)
```php
<?xml version="1.0" encoding="UTF-8"?>
```
* Trên đầu mỗi file XML có khai báo một thẻ để thông báo version XML đang sử dụng (thường là version 1.0), và có thể chứa các thông tin về mã hóa ký tự hoặc các phụ thuộc khác. 
* Giá trị của `encoding` (kiểu mã hóa ký tự) thuộc một trong các định dạng sau: UTF-8, UTF-16, ISO-10646-UCS-2, ISO-10646-UCS-4, ISO-8859-1 to ISO-8859-9, ISO-2022-JP, Shift_JIS, EUC-JP.
* XML có thể có hoặc không có phần này.

### Dòng chú thích
* Được đặt trong cặp `<!-- và -->`

### Không gian tên (namespace)
* Cấu trúc một tài liệu XML được xây dựng bởi các lập trình viên, do đó họ có thể tự đặt tên thẻ XML  dẫn đến xung đột nếu trong một file bị đặt trùng tên dẫn đến không phân biệt được thẻ nào dùng cho ứng dụng nào. Vì vậy để giải quyết vấn đề này thì người ta  sử dụng **XML Namespace.**
* Cách khai báo:

    * Đưa thêm thuộc tính **xmlns:prefix** vào bên trong phần tử gốc.
    * **prefix** là đường dẫn URL của namespace, có thể là một địa chỉ nào đó trên internet hoặc một địa chỉ nào đó đều được nhưng phải đảm bảo rằng nó là duy nhât trong tài liệu XML.
 
Ví dụ:
 ```php
 <?xml version="1.0" encoding="UTF-8"?>
<ShopOrder>
    <Order>
        // không gian tên cus
        <cus:Customer xmlns:cus="https://freetuts.net/customer">
            <cus:Title>Nguyễn Văn Cường</cus:Title>
            <cus:Address>Buôn Ma Thuột - Đăklăk</cus:Address>
        </cus:Customer>
    </Order>
</ShopOrder>
 ```
*  **Namespace mặc định**: Nếu tài liệu chỉ sử dụng một không gian tên thì khai báo mặc định, bỏ phần prefix
Ở ví dụ trên nếu chỉ sử dụng Namespace mặc định ta sẽ bỏ phần `cus` đi
```php
<?xml version="1.0" encoding="UTF-8"?>
<ShopOrder xmlns="https://freetuts.net/customer">
    <Order>
        <Customer>
            <Title>Nguyễn Văn Cường</Title>
            <Address>Buôn Ma Thuột - Đăklăk</Address>
        </Customer>
        <Customer>
            <Title>Nguyễn Văn Kính</Title>
            <Address>Buôn Ma Thuột - Đăklăk</Address>
        </Customer>
    </Order>
</ShopOrder>
```
* **Hai namespace mặc định**:  giả sử chúng ta có hai namespace mặc định trong một tài liệu XML như sau:
```php
<?xml version="1.0" encoding="UTF-8"?>
<ShopOrder>
    <Order>
        <Customer xmlns="https://freetuts.net/customer"> // namespace 1
            <Title>Nguyễn Văn Cường</Title>
            <Address>Buôn Ma Thuột - Đăklăk</Address>
        </Customer>
        <Product  xmlns="https://freetuts.net/product"> // namespace 2
            <Title>Dép thái cao cấp</Title>
            <Qua>20</Qua>
            <Price>200.000 vnđ</Price>
        </Product>
    </Order>
</ShopOrder>
```
Đều này sẽ phiền toái nếu ta có 1000 đơn hàng phải không ạ? Do đó để giải quyết vấn đề này ta khai báo namespace ngay tại thẻ `Root` như sau:
```php
<?xml version="1.0" encoding="UTF-8"?>
<ShopOrder
    xmlns:cus="https://freetuts.net/customer" // namespace 1
    xmlns:pro="https://freetuts.net/product"> // namespace 2
    <Order>
        <cus:Customer>
            <cus:Title>Nguyễn Văn Cường</cus:Title>
            <cus:Address>Buôn Ma Thuột - Đăklăk</cus:Address>
        </cus:Customer>
        <pro:Product>
            <pro:Title>Dép thái cao cấp</pro:Title>
            <pro:Qua>20</pro:Qua>
            <pro:Price>200.000 vnđ</pro:Price>
        </pro:Product>
    </Order>
</ShopOrder>
```
### Thực thể định nghĩa sẵn
XML sử dụng ký tự đặc biệt: 
* <, >, ', ",&
* &apos; (nháy đơn ')
* &amp; (dấu &)
* &gt; (dấu >)
* &lt; (dấu <)
* &quot; (nháy kép ")

Ví dụ
```php
<?xml version="1.0"?>
<LINK-TO>
    &lt; a href=&quot; index.txt &quot; &gt; OPEN FILE INDEX.TXT
    &lt; /a &gt;
</LINK-TO>

tương đương với
<LINK-TO>
    <a href=“index.txt”> OPEN FILE INDEX.TXT </a>
</LINK-TO>

```
### CDATA (character data)
* Là đoạn text không được phân tích cú pháp bởi trình phân tích cú pháp.

Ví dụ
```php
<?xml version="1.0" encoding="UTF-8"?>
<Tutorials>
    <Post>
        <Title>
            Học CDATA trong XML miễn phí
        </Title>
        <Code>
            <?xml version="1.0" encoding="UTF-8"?>
            <Persons>
                <Person>
                   Nguyễn Văn Cường 
                </Person>
            </Persons>
        </Code>
    </Post>
</Tutorials>
```
Ta thấy nội dung trong thẻ `Code` là một đoạn mã XML khác, đây là trường hợp giá trị của thẻ XML lại là một đoạn mã XML khác. Khi chạy lên sẽ bị lỗi như sau:

![](https://images.viblo.asia/02966272-d796-4414-83b1-a58cbff8ebf1.png)

Để khắc phục điều đó ta sẽ sử dụng CDATA như sau:
```php
<?xml version="1.0" encoding="UTF-8"?>
<Tutorials>
    <Post>
        <Title>
            Học CDATA trong XML miễn phí
        </Title>
        <Code>
            <![CDATA[ 
            <?xml version="1.0" encoding="UTF-8"?>
            <Persons>
                <Person>
                   Nguyễn Văn Cường 
                </Person>
            </Persons>
            ]]>
        </Code>
    </Post>
</Tutorials>
```
Như vây đoạn dữ liệu nằm giữa **<![CDATA [ và ]]>** sẽ được giữ nguyên khi đi qua trình phân tích.
### PCDATA (parsed character data)
* Là đoạn text sẽ được phân tích cú pháp bởi trình phân tích cú pháp.
* Tag bên trong đoạn text sẽ được cư xử như là markup và các thực thể sẽ được expand.
* Dữ liệu kí tự không nên chứa &, <, >

Như vậy mình đã giới thiệu sơ qua về XML là gì. Ở phần tới mình sẽ giới thiệu tiếp về **[Document Type Definition (DTD)](https://viblo.asia/p/tim-hieu-ve-xml-phan-2-dtd-vyDZONoxKwj)** là tài liệu dùng để định nghĩa kiểu dữ liệu cho các phần tử của tài liệu XML. Mong mọi người đón đọc:grinning:

Thanks for learning:sparkling_heart:

**Tài liệu tham khảo:** Bài giảng Tích hợp dữ liệu và xml - DHBKHN