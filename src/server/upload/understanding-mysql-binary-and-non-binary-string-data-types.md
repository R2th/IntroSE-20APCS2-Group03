![](https://images.viblo.asia/8f339af4-758b-4d34-ad6d-3ac66aeefcc5.png)

- Có hai loại dữ liệu chuỗi được `MySql` support và hiểu các đặc điểm của chúng một cách chính xác sẽ cho phép bạn chọn loại dữ liệu thích hợp để phù hợp với các yêu cầu của ứng dụng. Sau khi xem xét các cấu trúc bảng khác nhau được thiết kế bởi những người khác nhau, tôi đã đi đến kết luận rằng các kiểu dữ liệu chuỗi nhị phân (`Binary`) và  không nhị phân (`Non-binary`) được sử dụng mà không xem xét hậu quả của việc chọn một trong hai. Sự nhầm lẫn xuất phát từ thực tế là cả dữ liệu chuỗi nhị phân và không nhị phân đều có thể được lưu trữ dữ liệu dưới dưới dạng chuỗi.

- Nói chung có hai loại chính trong đó các loại chuỗi khác nhau có thể được chia, và hiểu hai loại này là rất quan trọng vì mỗi thể loại này được xử lý khác nhau bởi MySQL. Hai loại này được mô tả như sau:


# Non-binary string data type
`Non-binary string` thực chất là một chuỗi ký tự có `character set` (bộ ký tự) và `collation` (bộ đối chiếu) của nó. Bây giờ,chúng ta sẽ tìm hiểu sâu hơn về hai thuật ngữ này.

## Character set (bộ ký tự)

Character set (bộ ký tự) là một tập hợp các ký tự và các phương thức chuyển mã của ký tự đó (encoding). 
Ví dụ :
* Kí tự A có được encode là 65
* Kí tự a có được encode là 97

==> Một tập hợp các kí tự và phương thức chuyển mã `encode` của chúng được gọi là 1 `Character set`


Đồng thời, bộ kí tự còn  xác định xem lưu trữ của mỗi ký tự có yêu cầu một byte hoặc nhiều byte hay không.
Ví dụ :
* Bộ ký tự `ucs2 Unicode`  yêu cầu 2 byte cho mỗi ký tự 
* Bộ ký tự `utf8 Unicode` yêu cầu 1 đến 3 byte cho mỗi ký tự.

## Collation

- `Collation` thực chất là xác định thứ tự sắp xếp của các ký tự trong `Character set` và do đó được sử dụng trong các so sánh chuỗi. 

- `Collation` cũng xác định xem chuỗi có phân biệt chữ hoa chữ thường (`case-sensitive` viết tắt `cs`) hay không phân biệt chữ hoa chữ thường (`case-insensitive` viết tắt là `ci`). 

- `Collation` cũng có thể là BINARY (viêt tắt là `bin`), trong trường hợp này các ký tự được sắp xếp dựa trên giá trị byte số của chúng, điều này cũng có nghĩa là khi bạn so sánh 1 chuỗi, cần phải đúng hoàn toàn (phân biệt hoa thường và dấu má)

==> Kết luận : `Collation` là một tập các luật để so sánh các chuỗi được sinh ra từ các ký tự trong Character Set

Trong MySQL thì ta có thể lưu trữ dữ liệu ở nhiều dạng character set khác nhau ở các mức độ khác nhau như server, database, table và column . Mỗi character set có một collation mặc định của nó. Bạn hoàn toàn có thể xem chi tiết cụ thể điều này bằng cách chạy câu lệnh sau trong Mysql :

```
SHOW CHARACTER SET;
```

Ví dụ :
Với Database sử dụng Character set là UTF8 . Bạn có 1 value : `Việt Anh`
Nếu sử dụng Collation là UTF8_GENERAL_CI . Bạn sẽ tìm được value `Việt Anh` bằng với các giá trị sau :
 
 - viet anh
 - Viet Anh
 - ...

Như đã nói ở trên,Collation UTF8_GENERAL_CI sẽ ko phân biệt hoa thường hay dấu má ==> bạn sẽ tìm kiếm được bằng rất nhiều cách

Nếu sử dụng Collation là UTF8_BIN  . Bạn sẽ tìm được value `Việt Anh` bằng  giá trị `Việt Anh` . Truy vấn phải đúng tuyệt đối


Vì vậy tùy từng trường hợp, bạn phải xem dữ liệu của bạn là cái gì, thì bạn mới có thể quyết định đúng cho việc chọn COLLATION.


-----


Như vậy bạn đã hiểu rõ 2 khái niệm trên, quay trở lại vấn đề chính.  Trong Mysql thì có các dạng `Non-binary string` đó là 
* CHAR
* VARCHAR
* TEXT 
* Các biến thể khác của kiểu dữ liệu TEXT

# Binary string data type
- Điểm quan trọng nhất cần nhớ trong trường hợp kiểu dữ liệu `Binary string` là nó không có `Character set` và `collations`. `Binary string` chỉ đơn thuần là một chuỗi các giá trị byte, và vì điều này, các chuỗi như vậy sẽ phân biệt chữ hoa chữ thường, bởi vì các ký tự chữ hoa và chữ thường có các giá trị byte khác nhau. Ngoài ra, không có khái niệm về các ký tự nhiều byte, do đó, các ký tự nhiều byte khi được lưu trữ trong các cột chuỗi nhị phân được coi là các byte riêng biệt.

- Trong Mysql thì có các dạng `Non-binary string` đó là 
    - BINARY
    - VARBINARY
    - BLOB 
    - Các biến thể khác của kiểu dữ liệu BLOB

# Nên chọn loại dữ liệu nào ??
Bây giờ câu hỏi lớn là loại dữ liệu chuỗi nào nên được chọn? Điều đó thực sự phụ thuộc vào loại giá trị mà bạn sẽ lưu trữ :
- Nếu bạn đang lưu trữ dữ liệu mà bạn muốn đại diện dưới dạng văn bản, chẳng hạn như bài đăng trên blog hoặc mô tả sản phẩm, thì bạn nên chọn loại dữ liệu chuỗi `Non-binary string`. 
- Nếu bạn muốn lưu trữ dữ liệu chỉ đơn thuần là byte chẳng hạn như dữ liệu đại diện cho hình ảnh, thì bạn nên sử dụng kiểu dữ liệu `Binary string`.
- Cũng lưu ý rằng, bạn nên chọn bộ ký tự nhiều byte như `utf8` hoặc `ucs2` chỉ khi bạn muốn lưu trữ các ký tự không thể được biểu diễn dưới dạng ký tự một byte, nếu không bạn sẽ lãng phí dung lượng của hệ thống.


# Nguồn và tài liệu tham khảo:
[http://www.ovaistariq.net/632/understanding-mysql-binary-and-non-binary-string-data-types/#.W1T2J9IzaM9](http://www.ovaistariq.net/632/understanding-mysql-binary-and-non-binary-string-data-types/#.W1T2J9IzaM9)

[http://www.informit.com/articles/article.aspx?p=328641](http://www.informit.com/articles/article.aspx?p=328641)

[https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html)