# Mở đầu
XML là kiểu dữ liệu rất phổ biến hiện nay. Có rất nhiều cơ sở dữ liệu hỗ trợ lưu kiểu dữ liệu XML((IBM, DB2, Oracle, SQL Server). PostgresSql cũng là một trong số đó. Bài viết này sẽ đi sâu vào cách làm thế nào để lưu data kiểu postgresSql cũng như các function thường dùng trong PostgresSql.

# Insert XML Data

Khi tạo một cột trong bảng và định dạng kiểu là xml , PostgesSql mặc định hiểu đang sử dụng kiểu xml. PostgresSql sẽ tự động validate kiểu dữ liệu khi insert vào đúng kiểu XML.

Ví dụ :

Tạo một table sử dụng cột với kiểu XML

`CREATE TABLE families (id serial PRIMARY KEY, profile xml);`

Thực hiện insert dữ liệu vào XML

```
INSERT INTO families(profile)
VALUES (
'<family name="a">
<member><relation>father</relation><name>David</name></member>
<member><relation>mother</relation><name>Sonia</name></member>
<member><relation>son</relation><name>Brandon</name></member>
<member><relation>daughter</relation><name>Azaleah</name></member>
</family>');
```

Lưu ý : Kiểu dữ liệu ở cột profile đang là XML nên phải insert đúng với cú pháp của XML.

Kết quả:
```
INSERT 0 1

Query returned successfully in 55 msec.
```

Ngoài ra , chúng ta có thể tạo một table XML và insert dữ liệu như sau:

```
CREATE TABLE hoteldata AS SELECT xml
$$<hotels>
 <hotel id="mancha">
  <name>La Mancha</name>
  <rooms>
   <room id="201"><capacity>3</capacity><comment>Great view of the Channel</comment></room>
   <room id="202"><capacity>5</capacity></room>
  </rooms>
  <personnel>
   <person id="1025">
    <name>Ferdinando Quijana</name><salary currency="PTA">45000</salary>
   </person>
  </personnel>
 </hotel>
  <hotel id="valpo">
  <name>Valparaíso</name>
  <rooms>
   <room id="201"><capacity>2</capacity><comment>Very noisy</comment></room>
   <room id="202"><capacity>2</capacity></room>
  </rooms>
  <personnel>
   <person id="1026"><name>Katharina Wuntz</name><salary currency="EUR">50000</salary></person>
   <person id="1027"><name>Diego Velázquez</name><salary currency="CLP">1200000</salary></person>
  </personnel>
 </hotel>
</hotels>$$ AS hotels;
```

câu lệnh trên sẽ tạo 1 table có tên là hoteldata với tên cột là hotels với kiểu XML

# Truy vấn XML DATA

Để thực hiện truy vấn data với kiểu XML, chúng ta không thể sử dụng cách truy vấn data thông thường.

Ví dụ : 

```
Select * from families;
```

Kết quả : 
![](https://images.viblo.asia/d880da0d-3280-400e-9a69-b1915f34eaa4.png)

Nhìn vào kết quả trên , PostgresSql đang trả ra kết quả theo dạng cấu trúc XML và chúng ta rất khó để xử lý kết quả như vậy

Để thực hiện truy vấn XML, PostgresSql hỗ trợ 2 hàm cơ bản : XPath và XMLTABLE

## Truy vấn dựa vào XPath

Cú pháp:

`xpath(xpath, xml [, nsarray])`

Đối số đầu tiên là truy vấn xpath và thứ hai là một đối tượng XML. Đầu ra là một mảng các phần tử XML thỏa mãn truy vấn XPath.

Ví dụ :

```
SELECT ordinality AS id, family,
(xpath('/member/relation/text()', f))[1]::text As relation,
(xpath('/member/name/text()', f))[1]::text As mem_name
FROM (
SELECT
(xpath('/family/@name', profile))[1]::text As family,
f.ordinality, f.f
FROM families, unnest(xpath('/family/member', profile)) WITH ORDINALITY AS f
) x;
```

Kết quả:

![](https://images.viblo.asia/89c2dc1a-ab09-41a6-b73d-c8715ceb5171.png)

Giải thích câu lệnh

- 2 câu lệnh xpath đầu tiên lấy các giá trị text của element name và relation trong mỗi member element của XML.  Bởi vì xpath trả về một array nên chúng ta phải sử dụng mảng con `[1]::text` để lấy ra giá trị cần.
- Câu lệnh Xpath kế tiếp lấy tên thuộc tính từ family root. Chúng ta  sử dụng @ property_name.

## Truy vấn dựa vào XMLTable

Kể từ PostgresSql10, chúng ta có thể sử dụng hàm XMLTable để truy vấn các giá trị XML.

Cú pháp:

```
xmltable( [XMLNAMESPACES(namespace uri AS namespace name[, ...]), ]
          row_expression PASSING [BY REF] document_expression [BY REF]
          COLUMNS name { type [PATH column_expression] [DEFAULT default_expression] [NOT NULL | NULL]
                        | FOR ORDINALITY }
                   [, ...]
)
```

Ví dụ :

```
SELECT xt.*
FROM families,
XMLTABLE ('/family/member' PASSING profile 
COLUMNS
id FOR ORDINALITY ,
family text PATH '../@name' ,
relation text NOT NULL ,
member_name text PATH 'name' NOT NULL
) AS xt;
```

Kết quả:

![](https://images.viblo.asia/89c2dc1a-ab09-41a6-b73d-c8715ceb5171.png)

Nhìn vào câu lệnh trên có thể thấy dùng XMLTable ngắn gọn hơn. Giải thích về ví dụ trên :

Phần đầu tiên là một đườnd dẫn XML xác định hàng. Từ PASSING chỉ ra cột cần phân tích. Cột này phải là loại
XML. Ở đây là cột profile
Từ khóa Column dùng để xác định danh sách các cột cần parsed.
FOR ORDINALITY được dùng trong trường id dùng để gán số thứ tự tự động cho mỗi bảng ghi được ra về

Chúng có thể sử dụng ../ để di chuyển lên trên một level của hàng đang đứng. Trong trường hợp này, chúng ta sử dụng ./
@name để có được tên family.

# Một số hàm thông dụng để xử lý XML trong PostgresSql

PostgresSql cung cấp rất nhiều hàm để xử lý XML trong PostgresSql. Dưới đây là một số hàm thông dụng

## xmlcomment()

Đây là một hàm dùng để tạo comment trong XML. Tương tự như comment trong XML, '--' và '-' được thêm vào trước và sau giá trị để biến nó thành một comment XML hợp lệ. Nếu đối số là null, kết quả là null.

Cú pháp : `xmlcomment(text)`

Ví dụ:

```
SELECT xmlcomment('Comment XML');
```

Kết quả:
![](https://images.viblo.asia/6d55782d-ce1f-4a7f-ad67-05d68172ad79.png)

## xmlconcat()

Một danh sách các giá trị XML được nối với nhau để tạo một giá trị XML bằng cách sử dụng hàm này. 

Cú pháp:  `xmlconcat(xml[, ...])`

Ví dụ :  `SELECT xmlconcat('<books/>', '<book>tutorials</book>');`

Kết quả : 

![](https://images.viblo.asia/e170d7a8-7ed7-465b-9fb3-524f877ac1f9.png)

## xmlelement()

Hàm này dùng để tạo các element cho XML dựa vào tên, thuộc tính và nội dung

Cú pháp : `xmlelement(name name [, xmlattributes(value [AS attname] [, ... ])] [, content, ...])`

Ví dụ: `SELECT xmlelement(name books, xmlattributes('SQL' as title));`

Kết quả: ![](https://images.viblo.asia/3a458112-a802-4ce6-9ac8-47d0da609f7e.png)

Có thể dùng các hàm của postgres trong hàm xmlelement() như sau:
Ví dụ: `SELECT xmlelement(name calendar, xmlattributes(current_date as date), 'current', ' date');`

Kết quả:  ![](https://images.viblo.asia/e8911d6c-ccff-4481-a32a-eacbab230a5a.png)

## xmlforest()

Hàm  xmlforest tạo ra một chuỗi các phần tử XML sử dụng tên và nội dung đã cho.

Cú pháp: `xmlforest(content [AS name] [, ...])`

Ví du:  `SELECT xmlforest('book' AS newelement, 123 AS number);`

Kết quả : 
![](https://images.viblo.asia/fa74731b-5d82-491c-8e16-fc101f240be4.png)

## xmlroot()

Hàm xmlroot được sử dụng để thay đổi các thuộc tính root node của một giá trị XML.

Cú pháp: `xmlroot(xml, version text | no value [, standalone yes|no|no value])`

Ví dụ :  
```
SELECT xmlroot(xmlparse(document '<?xml version="1.1"?><content>tutorials</content>'),
version '1.0', standalone yes);
```

Kết quả : 
![](https://images.viblo.asia/7d7f773b-3f13-4947-9c39-2e500f12afb5.png)

# Kết luận

Qua bài viết trên, hy vọng mọi người sẽ biết cách sử dụng XML lưu trữ trong PostgresSql.

# Tài liệu tham khảo
https://www.postgresql.org/docs/10/functions-xml.html