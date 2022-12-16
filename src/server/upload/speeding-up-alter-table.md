Hiệu suất MySQL's ALTER TABLE có thể trở thành một vấn đề với các bảng lớn. MySQL thực hiện hầu hết các thay đổi bằng cách tạo một bảng trống với cấu trúc mới mong muốn, chèn tất cả dữ liệu từ bảng cũ vào bảng mới và xóa bảng cũ. Điều này có thể mất một thời gian rất dài, đặc biệt nếu bạn thiếu bộ nhớ và bảng lớn và có nhiều chỉ mục. Nhiều người có kinh nghiệm với các hoạt động ALTER TABLE đã mất hàng giờ hoặc nhiều ngày để hoàn thành.

MySQL 5.1 và mới hơn bao gồm hỗ trợ cho một số loại `online operations` mà không khóa bảng cho toàn bộ operations. Các phiên bản gần đây của InnoDB7 cũng hỗ trợ xây dựng các chỉ mục bằng cách sắp xếp, điều này làm cho việc xây dựng các chỉ mục nhanh hơn nhiều và dẫn đến bố cục chỉ mục nhỏ gọn.

Nói chung, hầu hết các lệnh ALTER TABLE sẽ gây gián đoạn dịch vụ trong MySQL. Bài viết này sẽ đưa ra một số kỹ thuật để khắc phục điều này một chút, nhưng những kỹ thuật này dành cho những trường hợp đặc biệt. Trong trường hợp chung, bạn cần sử dụng các thủ thuật hoạt động như hoán đổi các máy chủ xung quanh và thực hiện ALTER trên các máy chủ không có production services hoặc phương pháp tiếp cận "shadow copy". Kỹ thuật cho một "shadow copy" là xây dựng một bảng mới với cấu trúc mong muốn bên cạnh bảng hiện có, sau đó thực hiện rename và drop để hoán đổi hai bảng. Các công cụ có thể giúp với điều này, ví dụ:
* Công cụ  thay đổi schema của YouTube từ nhóm vận hành cơ sở dữ liệu của Facebook (https://launchpad.net/mysqlatfacebook)
* Bộ công cụ openark của Shlomi Noach (http://code.openark.org/)
* Bộ công cụ Percona (http://www.percona.com/software/)
* Nếu bạn đang sử dụng Flexview, bạn cũng có thể thực hiện thay đổi schema với tiện ích CDC của nó.

Không phải tất cả lệnh ALTER TABLE để xây dựng lại bảng. Ví dụ: bạn có thể thay đổi hoặc giảm giá trị mặc định của cột theo hai cách (một nhanh và một chậm). Giả sử bạn muốn thay đổi thời lượng cho thuê phim mặc định từ ba đến năm ngày. Ở đây, cách thức đắt đỏ:
```sql
mysql> ALTER TABLE sakila.film
    -> MODIFY COLUMN rental_duration TINYINT(3) NOT NULL DEFAULT 5;
```

SHOW STATUS cho thấy lệnh này thực hiện 1.000 xử lý read và 1.000 insert. Nói cách khác, nó sao chép bảng sang một bảng mới, mặc dù kiểu cột, kích thước và không có giá trị đã thay đổi.

Về lý thuyết, MySQL có thể đã bỏ qua việc xây dựng một bảng mới. Giá trị mặc định cho cột thực sự được lưu trữ trong tệp .frm của bảng, do đó bạn có thể thay đổi nó mà không cần động chạm vào bảng đó. Tuy nhiên, MySQL vẫn chưa sử dụng tối ưu hóa này; bất kỳ MODIFY COLUMN sẽ xây dựng lại bảng.

Mặc dù vậy, bạn có thể thay đổi cột mặc định cột với ALTER COLUMN:

```sql
mysql> ALTER TABLE sakila.film
    -> ALTER COLUMN rental_duration SET DEFAULT 5;
```

Câu lệnh này sửa đổi tệp `.frm`. Kết quả là, nó rất nhanh.

### Modifying Only the .frm File

Chúng tôi đã thấy rằng việc sửa đổi một tập tin .frm của bảng là nhanh và đôi khi MySQL xây dựng lại một bảng khi nó không phải. Nếu bạn có thể chấp nhận một số rủi ro, bạn có thể thuyết phục MySQL thực hiện một số loại sửa đổi khác mà không cần xây dựng lại bảng.

Bạn có thể thực hiện các lệnh sau mà không xây dựng lại bảng:

* Xóa (nhưng không thêm) thuộc tính AUTO_INCREMENT của một cột
* Thêm, xóa hoặc thay đổi ENUM và SET constants. Nếu bạn xóa constants và một số rows chứa giá trị đó, truy vấn sẽ trả về giá trị dưới dạng chuỗi trống.

Kỹ thuật cơ bản là tạo tệp `.frm` cho cấu trúc bảng mong muốn và sao chép nó vào vị trí của tệp `.frm` của bảng hiện có, như sau:

1. Tạo một bảng trống với bố cục chính xác, ngoại trừ sửa đổi mong muốn (chẳng hạn như các ENUM constants được thêm vào).
2. Execute FLUSH TABLES WITH READ LOCK. Điều này sẽ đóng tất cả các bảng đang sử dụng và ngăn không cho bất kỳ bảng nào được mở.
3. Swap tập tin .frm
4. Execute UNLOCK TABLES để mở lại các bảng bị khóa ở bước 2

Ví dụ, hãy để thêm một constant vào cột rating trong sakila.film. Cột hiện tại trông như thế này:

```sql
mysql> SHOW COLUMNS FROM sakila.film LIKE 'rating';
+--------+------------------------------------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+--------+------------------------------------+------+-----+---------+-------+
| rating | enum('G','PG','PG-13','R','NC-17') | YES | | G | |
+--------+------------------------------------+------+-----+---------+-------+
```

Tiếp theo sẽ thêm PG-14 rating:

```sql
mysql> CREATE TABLE sakila.film_new LIKE sakila.film;
mysql> ALTER TABLE sakila.film_new
    -> MODIFY COLUMN rating ENUM('G','PG','PG-13','R','NC-17', 'PG-14')
    -> DEFAULT 'G';
mysql> FLUSH TABLES WITH READ LOCK;
```

Lưu ý rằng chúng ta đã thêm giá trị mới vào cuối danh sách các constants. Nếu chúng ta đặt nó ở giữa, sau PG-13, chúng ta sẽ thay đổi ý nghĩa của dữ liệu hiện có: các giá trị R hiện tại sẽ trở thành PG-14, NC-17 sẽ trở thành R, v.v.

Bây giờ chúng ta swap các tệp .frm:

```shell
/var/lib/mysql/sakila# mv film.frm film_tmp.frm
/var/lib/mysql/sakila# mv film_new.frm film.frm
/var/lib/mysql/sakila# mv film_tmp.frm film_new.frm
```

Quay lại MySQL prompt, bây giờ chúng ta có thể mở khóa bảng và thấy rằng các thay đổi có hiệu lực:

```sql
mysql> UNLOCK TABLES;
mysql> SHOW COLUMNS FROM sakila.film LIKE 'rating'\G
*************************** 1. row ***************************
Field: rating
 Type: enum('G','PG','PG-13','R','NC-17','PG-14')
```

Điều duy nhất còn lại phải làm là bỏ bảng chúng ta đã tạo để trợ giúp cho thao tác:

```sql
mysql> DROP TABLE sakila.film_new;
```

Nguồn: High performance MySQL 3rd Edition