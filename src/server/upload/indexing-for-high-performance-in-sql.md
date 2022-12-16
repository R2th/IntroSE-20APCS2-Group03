Trong quá trình xây dựng ứng dụng và sử dụng hệ quản trị cơ sở dữ liệu như MySQL, SQL Server...thì chúng ta không thể không để ý đến hiệu suất sử dụng, truy vấn để nhằm tăng chất lượng ứng dụng. Chúng ta đã có những kĩ thuật, những lưu ý trong chính ngôn ngữ mà chúng ta sử dụng để viết ứng dụng dụng; bên cạnh đó chúng ta củng cần tăng mức độ phản hồi truy vấn cho hệ quản trị cơ sở dữ liệu chúng ta đang dùng. Đã có [bài viết](https://viblo.asia/p/25-tip-de-tang-hieu-suat-cho-cau-lenh-sql-MgNeWXZgkYx) nêu ra những cách mà chúng ta cần làm để tăng tốc độ truy vấn nhưng những bài viết chi tiết về cách sử dụng thì còn hạn chế. Hôm nay, mình sẽ giới thiệu đến các bạn một kĩ thuật trong SQL, đó là Index. Index giúp tăng tốc độ tìm kiếm 1 record theo cơ chế riêng mà SQL đã cung cấp và chúng ta chỉ cần sử dụng nó cho đúng là tốc độ sẽ được tăng đáng kể.

## INDEX là gì?
![](https://images.viblo.asia/3ac60b1f-1a1b-40c8-ba1e-327433f56157.jpg)
 Hiểu đơn giản Index chính là mục lục của SQL.
 Chúng ta xem qua phần khái niệm tí nhé.
 
Chỉ mục (INDEX) trong SQL là bảng tra cứu đặc biệt mà công cụ tìm kiếm cơ sở dữ liệu có thể sử dụng để tăng nhanh thời gian và hiệu suất truy xuất dữ liệu.

Hiểu đơn giản, một chỉ mục là một con trỏ chỉ tới từng giá trị xuất hiện trong bảng/cột được đánh chỉ mục. Chỉ mục trong Database có ý nghĩa tương tự như các mục trong xuất hiện trong Mục lục của một cuốn sách.

INDEX giúp tăng tốc các truy vấn SELECT chứa các mệnh đề WHERE hoặc ORDER, nhưng nó làm chậm việc dữ liệu nhập vào với các lệnh UPDATE và INSERT. Các chỉ mục có thể được tạo hoặc xóa mà không ảnh hưởng tới dữ liệu.

Cho nên, Index sẽ tốt cho chức năng tìm kiếm. Vì dữ liệu của chúng ta đã được sắp xếp để có thể tìm kiếm nhanh hơn. Vậy có những loại Index nào, chúng ta cùng đến mục tới.

## Những loại INDEX
Chúng ta đã hiểu qua khái niệm của Index rồi, thì trong SQL sẽ có những loại Index nào?
* ### Clustered Index
    Clustered Index là một loại chỉ mục sắp xếp các hàng dữ liệu trong bảng trên các giá trị chính của chúng. Trong cơ sở dữ liệu, chỉ có một Clustered Index trên mỗi bảng.

    Một Clustered Index xác định thứ tự lưu trữ dữ liệu trong bảng có thể được sắp xếp theo một cách. Vì vậy, có thể chỉ có một Clustered Index duy nhất cho mỗi bảng. Thông thường, trong RDBMS, khóa chính cho phép bạn tạo một Clustered Index dựa trên cột cụ thể đó.
    
    Clustered Index sẽ là duy nhất trong mỗi bảng, nó sẽ được tạo tự động khi mà bảng được tạo ra nếu có PRIMARY, nếu không có table PRIMARY thì sẽ dùng UNIQUE để định nghĩa.
*  ### Non-Clustered Index
    Một Non-Clustered Index lưu trữ dữ liệu tại một vị trí và chỉ mục tại một vị trí khác. Chỉ mục chứa con trỏ đến vị trí của dữ liệu đó. Một bảng duy nhất có thể có nhiều Non-Clustered Index vì một chỉ mục trong Non-Clustered Index được lưu trữ ở những nơi khác nhau.

    Ví dụ: một cuốn sách có thể có nhiều hơn một mục lục, một ở đầu hiển thị nội dung của một đơn vị sách một cách khôn ngoan trong khi mục lục thứ hai hiển thị mục lục các thuật ngữ theo thứ tự bảng chữ cái.

    Một Non-Clustered Index được xác định trong trường không theo thứ tự của bảng. Loại phương pháp lập chỉ mục này giúp bạn cải thiện hiệu suất của các truy vấn sử dụng các khóa không được gán làm khóa chính. Một Non-Clustered Index cho phép bạn thêm một khóa duy nhất cho một bảng.
    
    Non-Clustered Index là loại chỉ mục chúng ta sẽ tự định nghĩa.

## INDEX được lưu như thế nào?

Thường thì khi nhắc đến Index thì chúng ta sẽ nghĩ ngay đến thuật toán B-TREE, tất nhiên sẽ có thêm các thuật toán khác nhưng hầu như đã số sẽ dùng thuật toán này đến sắp xếp dữ liệu. Và ở đây mình sẽ chỉ nêu thuật toán này :D

![](https://images.viblo.asia/3e64764d-38f8-49fe-a244-47893d57e53b.png)
Quá dễ hiểu phải không nào, giả sử dữ liệu chúng ta cần tìm kiếm là số 14 thì chúng ta chỉ cần tìm kiếm phần bên phải, vì dữ liệu đã được tổ chức lại để sắp xếp rồi đó. Vậy nên sẽ trả kết quả nhanh hơn thay vì duyệt từng record để so sánh. Ngon.

Chúng ta đã hiểu sơ qua về Index, biết nó có những loại nào, thuật toán tổ chức dữ liệu. Sau đây, chúng ta sẽ đi tìm hiểu sâu hơn 1 xíu để hiểu hơn.
## Tạo ra INDEX trong MySQL
Mình đã tạo ra một table gồm 1 triệu record
![](https://images.viblo.asia/2378ef2f-9c55-436c-b01e-9d65a026467b.png)
Thử xem nó có bao nhiêu record nào
```
SELECT COUNT(*) FROM vip_demo.user_information;
```
![](https://images.viblo.asia/59da0920-6f94-4b89-991a-ac245f00bb5f.png)
Ở đây chúng ta sẽ nói đến chính là Non-Clustered Index đó mọi người.

Chúng ta sẽ tìm kiếm thử tên 'Corey' trong CSDL nha
```
SELECT * FROM vip_demo.user_information WHERE name like 'Corey';
```
Sẽ mất thời gian khá nhiều(0.071 s, hàng cuối cùng) để truy vấn dữ liệu(xem ảnh sau):
![](https://images.viblo.asia/9fadc9ec-82a4-4479-a24b-678320e89a3b.png)
Mình sẽ tiến hành đánh index cho cột name để xem hiệu quả của nó nhé
```
CREATE INDEX index_name ON vip_demo.user_information (name);
```
Thời gian đánh Index sẽ hơi lâu, vì vậy nên khi mà create hay update dữ liệu thì không nên sử dụng vì nó sẽ mất thêm thời gian đánh lại Index --> lâu hơn bình thường.
Sau khi tao xong mình truy vấn lại câu trên thì đây là kết quả:
![](https://images.viblo.asia/f817ab69-9b47-46c6-9ea7-846f1f9b0b51.png)
Bất ngờ chưa nào :D Nhanh hơn phết đó mọi người.

Khi mà không muốn dùng INDEX nữa thì mình tiến hành xóa nó đi

```
DROP INDEX index_name ON vip_demo.user_information;
```
## Câu lệnh EXPLAIN
Đã có [bài viết](https://viblo.asia/p/su-dung-explain-de-toi-uu-cau-lenh-mysql-BYjv44gmvxpV) nói về câu lệnh kiểm tra truy vấn này, mình đã để link đó mọi người vào đọc để kiểm tra trạng thái truy vấn nha.

## Những lưu ý, tips sử dụng INDEX
Chẳng có quy chuẩn nào để mình viết ra những cái mình cho là tips ở đây cả. Chỉ là do quá trình tìm hiểu, nghiên cứu rồi mình rút ra được những điều sau đây.
#### Isolating column(Cô lập cột)
Cột được đánh index không nằm trong một biểu thức toán tử hay trong một hàm lúc truy vấn.

Ví dụ: 
>> select * from vip_demo.user_information where a = 5;
>> 
>> select * from vip_demo.user_information where a +1 = 5;

Như  này trình Index sẽ không thể hiểu được cần tìm a = 4, nên sẽ dùng trình SQL để tìm kiếm như bình thường.
#### Prefix indexes and Index selectivity

 Thay vì đánh index cho một cột chứa kí tự rất dài, ta sử dụng Prefix Index với một vài kí tự đầu tiên để tiết kiệm không gian lưu trữ.

>> create index index_name on user_information (name(3));
Chúng ta đã sử dụng 3 giá trị kí tự đầu tiên của cột name để đánh index.

Nhược điểm: Khi có quá nhiều dữ liệu có tiền tố giống nhanh thì cách này sẽ phản tác dụng, giả sử trong 1M record mà tên lưu là Hoang1 --> Hoang1000000 thì đánh 5 kí tự trở xuống chả có ý nghĩa gì...

#### Multicolumn Indexes
Multi column index sẽ đánh index từ cột bên trái nhất trong các cột được khai báo.

Tạo index từ 2 cột trở lên sẽ tối ưu hơn một chút so với single index trong việc xử lý triệt để câu truy vấn.
 Mình tạo ra index cho cả 2 cột name và age tên là index_name_age
>> create index index_name_age on user_information(name, age);

Dữ liệu sẽ được tổ chức ưu tiến sắp xếp từ name rồi age, nên khi mà giả sử mình ORDER BY name thì sẽ nhanh còn nếu ORDER BY age thì sẽ chẳng dùng dữ liệu của index để sắp xếp. Nó chỉ có tác dụng khi vừa tìm kiếm name và age./
#### Choosing a good column order
Chọn các trường dữ liệu có yêu cầu tìm kiếm hay sắp xếp để đánh index. 

Thay vì truy xuất từ index rồi tìm kiếm trong DB, chúng ta chỉ việc lấy dữ liệu được lưu từ chính index đó.

Tức là chúng ta không đánh index tùm lum mà chỉ đánh những trường cần thiết, vì nếu có quá nhiều index thì trình SQL phải có thời gian để lựa chọn giữa các index với nhau(không đánh kể), vấn đề chính là (tìm kiếm hay insert update dữ liệu)...

#### Covering Indexes
Là loại chỉ mục chứa tất cả dữ liệu cần thiết để trả về cho câu truy vấn.

Lọc dữ liệu yêu cầu theo điều kiện(WHERE).Thay vì đọc index rồi mapping với storage-engine thì ta chỉ cần lấy dữ liệu cần thiết có trong cover index phục vụ cho câu truy vấn.

>> select name, address from user_information where name like 'calvin';

>> select name, address from user_information where name like 'calvin' and address like 'xnxx';
>> 
Tìm kiếm theo name và address thì ở đây đang thiếu dữ liệu của address trong index, thì chỉ dùng được name rồi lại dùng trình SQL để tìm kiếm adress. Tiến hành đánh index cho 2 thằng.
>> create index index_name_address on user_information(name, address);

>> select name, address from user_information where name like 'calvin' and address like 'xnxx';
>> 
Giờ thì ngon rồi á :D À, mình muốn nói cái này kẻo miss, tức là nếu chỉ cần tìm kiếm như này thì chúng ta đánh riêng từng cái là index_name và index_address hay là chung index_name_adress thì củng như nhau.

#### Using Index Scan for Sorts
MySQL hỗ trợ 2 cách để sắp xếp kết quả theo thứ tự:

* Nó có thể sử dụng 1 thao tác sắp xếp(Using filesort).
* Quét index theo thứ tự được tạo(Using index).

>> select * from user_information where name like 'c%' order by name;
>> 
>> select * from user_information where name like 'c%' order by address;

Giả sử chỉ có index cho cột name mà adress chưa có thì khi ORDER BY name sẽ dùng Using index để sắp xếp, còn ngược lại address sẽ dùng Using filesort(điều nên tránh trong khi truy vấn dữ liệu). Cả 2 chúng ta có thể kiểm tra trong câu lệnh EXPLAIN ở trên có giới thiệu.
#### Unused Indexes
>> create index index_name on user_information(name);
>> 
>> create index index_name_address on user_information(name, address);

Đánh index_name, index_name_address về bản chất giống nhau nếu truy vấn mỗi name.

Là việc ta đánh Index cho các cột nhưng không sử dụng. Do vậy ta có thể loại bỏ chúng để đảm bảo tốc độ truy vấn
>> explain select name from user_information where name = 'calvin';
>> 
Câu lệnh EXPLAIN để check Index mà sử dụng cho cả 2 câu truy vấn trên cho chi tiết nha.
#### Index merge
Khi kết quả yêu cầu của query kì vọng tồn tại trong 2 index riêng biệt thì trình tối ưu hóa sẽ dùng merge 2 index này lại với nhau để sử dụng.

>> create index index_name on user_information(name);
>> 
>> create index index_address on user_information(address);

>> explain select name, address from user_information where name = 'calvin' or address like 'a%';
>> 
Khi này trình SQL sẽ tự động merger 2 index này lại với nhau để sử dụng, cho nên hãy kết hợp nhuần nhuyễn để sử dụng.

#### Tổng
Tất cả các phương pháp áp dụng index đều có mối quan hệ chặt chẽ với nhau. Hầu hết làm việc với thuật toán B-tree. Những tips thực ra để bổ trợ cho nhau để giải quyết vấn đề chứ không phải là từng cách thức riêng biệt để sử dụng...

## Kết

Trên đây là sự nghiên cứu và chắt lọc của mình về Index, bạn đọc thấy có gì chưa hợp lí thì phản hồi để chúng ta cùng xây dựng một bài viết có chất lượng tốt hơn cho bạn đọc sau.

Cám ơn tất cả các bạn./