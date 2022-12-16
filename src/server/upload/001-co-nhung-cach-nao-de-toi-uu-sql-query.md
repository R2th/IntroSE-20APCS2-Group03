© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

## 1) Overview
SQL là ngôn ngữ truy vấn dữ liệu dạng bảng được phát triển vào những năm 1970s. Mặc dù hơn 50 tuổi đời nhưng vẫn được sử dụng phổ biến. Câu hỏi đặt ra, có bí ẩn gì mà nó phổ biến và tồn tại lâu đến vậy?

Ngắn gọn thôi, vì nó được sinh ra để phục vụ truy vấn dữ liệu dạng bảng với Relational Database. Vài năm trước rộ lên phong trào NoSQL cho các Non-relational Database, hay gần đây là NewSQL. Tuy nhiên nhiên chẳng có cái nào có thể thay thế cái nào vì mục đích của nó vốn đã khác nhau và Relational Database vẫn chưa lỗi thời.

Gần như tất cả các thể loại data từ đơn giản đến phức tạp đều có khả năng cấu trúc được dưới dữ liệu dạng bảng. Ngoài ra, một lý do nữa SQL phổ biến là các query viết dưới dạng khai báo: chỉ ra những gì mình muốn, không quan tâm đến việc thực thi như thế nào.
> - SELECT * FROM ENGINEER e WHERE e.title = 'Software Engineer';

Đọc phát hiểu luôn, tôi muốn tìm kiếm tất cả những ông kĩ sư có title **Software Engineer**. Để làm được như vậy:
> - SQL query chuyển từ câu lệnh khai báo sang dạng thủ tục (procedural form) để được thực thi.
> - Sau khi chuyển sang dạng **procedural**, nó được gọi với cái tên mĩ miều hơn **Execution plan**. 
> - **Execution plan** bao gồm một chuỗi các bước như scanning, filtering, joining data, sau đó trả về kết quả cuối cùng.

Toàn bộ quá trình này là **behind the scene**, chúng ta không can thiệp được vào việc chuyển đổi từ **SQL query** sang **execution plan**. Do đó, **plan** có thể hiệu quả hoặc không hiệu quả, tùy thuộc vào các yếu tố như số lượng records, dữ liệu lấy ra, joining table...

Nếu không thể can thiệp được thì có cách nào để làm quá trình này hoạt động hiệu quả hơn? Chắc chắn là có, và đó là mục đích của bài viết này. Let's begin.

## 2) Scanning table

**Scanning table** là task cơ bản nhất của **execution plan**, khởi nguồn của mọi thứ liên quan đến quá trình execute query. Hiểu đơn giản, nó là hành động tuyến tính, scan từng row từ đầu đến cuối, so sánh với các điều kiện (nếu có) và trả về kết quả. Do vậy, thời gian tìm kiếm sẽ phụ thuộc vào số lượng row table.

![](https://i.imgur.com/RCrZ1KP.png)

Một vài tính chất của **scanning table**:
> - Duyệt qua từng row.
> - Data được lưu dưới disk (HDD/SSD), cụ thể là file, chi tiết hơn là thuộc một hoặc nhiều **block of data**, thậm chí có thể bị phân mảnh nằm rải rác ở các chỗ khác nhau. Do đó đôi khi phải fetch một số lượng data lớn hơn data thực tế để tìm kiếm dữ liệu.
> - Thực hiện filter hoặc áp dụng các condition dựa trên query với mỗi row.
> - Time complexity tỉ lệ thuận với số lượng row O(n).

**Scanning table** đơn giản và dễ dùng, phù hợp với những table có số lượng row nhỏ. Với table có hàng triệu row thì.. không dám nghĩ tiếp. Vậy cần có cách để làm cho nó hiệu quả hơn, bài học đầu tiên là áp dụng **indexing**.
> - Junior: anh ơi em query table này rất chậm, có cách nào cải thiện tốc độ không?
> - Senior: em đã đánh index chưa?

## 3) Indexing

**Indexing** là cái quái gì?

Một vài cách diễn tả lấy ví dụ về cuốn sách với phần mục lục được coi là **index**, nó cũng đúng nhưng chưa đủ và chưa nổi bật được cách thức hoạt động. Xem hình minh họa trước nhé.

![](https://i.imgur.com/SL5IcV0.png)

Bản chất quá trình **indexing** là việc chuyển đổi một hoặc nhiều column sang table mới (DB System sẽ quản lý table này) với các tính chất:
> - Table **index** được sắp xếp theo thứ tự. Giá trị của column là giá trị của một/nhiều column được đánh **index**.
> - Tìm kiếm nhanh hơn với một vài điều kiện trên column được đánh **index**.
> - Mỗi index được ánh xạ sang một hoặc nhiều row trong table chính.
> - Có thể index được nhiều cột cùng lúc, gọi là **composite index**.

Thay vì **scanning** trên table chính, ta **scanning** trên table index, vẫn là **scanning table**, thế thì có gì khác? Sẽ chẳng có gì khác biệt nếu `SELECT *` và không có `WHERE condition`. Tuy nhiên thực tế, không những `WHERE` một mà còn `WHERE` nhiều column, chính nó tạo nên sự khác biệt:

> - Thứ nhất, DB Engine sẽ kiểm tra column với WHERE condition có được đánh index không. Nếu có, nó chỉ lấy column được index để thực hiện scan trên index table thay vì scan trên table chính, giảm tải lượng data phải read từ disk.
> - Thứ hai, table index được sắp xếp nên việc scan đơn giản hơn. Thay vì scan toàn bộ, sử dụng cấu trúc Binary Tree để tiến hành scan. Phổ biến và thông dụng nhất chính là B-Tree index, lưu ý rằng B-Tree là Balanced Tree, không phải Binary Tree. 

Ngoài B-Tree index, còn nhiều loại index khác mình sẽ giới thiệu cụ thể trong bài sau:
> - Hash index.
> - Bitmap index.
> - Specialized index (only PostgreSQL).

Như vậy, chúng ta hiểu để tăng tốc query cần thực hiện **indexing**. Tuy nhiên, không thể index tùy tiện, hãy nhìn lại hình minh họa trên:
> - Khi thực hiện index, phải tạo thêm bảng mới để lưu giá trị index. Càng nhiều index càng nhiều bảng, càng nhiều thao tác phải thực hiện dẫn đến tốc độ insert giảm, dung lượng lưu trữ tăng.
> - Ngoài ra, các giá trị trong table index phải được sắp xếp để phục vụ tìm kiếm, thêm mới row sẽ cần sắp xếp lại table index cho phù hợp, điều này cũng ảnh hưởng tới tốc độ.
> - Cuối cùng, **index** chỉ hiệu quả với những query có where condition trên column index. Đừng dại mà cái gì cũng index, không cải thiện được read mà còn chậm write.

## 4) Joining table
Quay lại bài toán thực tế, query chẳng bao giờ trên một bảng mà join rất nhiều bảng với nhau. Nên việc join table thế nào cũng ảnh hưởng đến tốc độ query. Có rất nhiều kiểu join khác nhau như: Inner join, Outer join, Cross join...

Nhưng bài này chúng ta không bàn luận về nó, mình muốn nói về cơ chế **joining table** với 3 loại:
> - Nested loop join.
> - Hash join.
> - Sort merge join.

**Nested loop join** thực hiện so sánh tất cả các row trên 2 table:
> - Duyệt qua từng table row.
> - Với mỗi row, tiếp tục duyệt qua từng row của table còn lại. Chính là 2 vòng for lồng nhau.
> - Đơn giản dễ dùng nhưng tốn kém.. hiệu năng. 

**Hash join** thực hiện hash các giá trị của FK và join dựa trên các giá trị matching đó:
> - Hash FK của table nhỏ hơn (số lượng row ít hơn).
> - Lưu các giá trị hash đó vào **hash table** để thực hiện so sánh.
> - Scan table lớn hơn, thực hiện hash FK và compare với các giá trị trong **hash table**. Tưởng giống **nested loop join** nhưng lại có sự khác biệt về mặt hiệu năng vì tốc độ truy xuất với **hash table** là O(1). Đổi lại là take time cho việc hash FK.

**Sort merge join** thực hiện sắp xếp 2 table dựa trên FK và join để tận dụng lợi thế của **ordering**:
> - Sắp xếp cả 2 table.
> - Các bước tiếp theo thực hiện giống nested loop join.
> - Tuy nhiên sẽ dừng lại khi không tìm thấy các giá trị trùng nhau vì tận dụng lợi thế của **ordering**.

Mỗi cơ chế join sẽ phù hợp với từng điều kiện khác nhau. Cụ thể hơn về cách hoạt động, khi nào áp dụng cơ chế nào mình sẽ giới thiệu kĩ hơn ở bài sau.

## 5) Partitioning
Một cách khác cũng giúp tăng performance query đó là **partitioning data**:
> - Chia table thành các sub-table nhỏ hơn dựa trên các điều kiện cụ thể.
> - Từ đó giảm không gian tìm kiếm, dẫn đến tốc độ scanning nhanh hơn, tăng performance khi query.
> - Phù hợp với các table có số lượng record cực lớn.

Tuy nhiên nhược điểm của nó là khi các record được update, thuộc tính bị thay đổi dẫn đến các record được re-assigned về đúng sub-table, cũng tốn kém kha khá.

![](https://i.imgur.com/juer7az.png)


Vì table được phân chia ra nhiều sub-table nên ta cần biết chính xác record muốn tìm kiếm nằm ở sub-table nào để tận dụng lợi thế của **partitioning data**. Để làm được điều đó, chúng ta sử dụng **partition key** để thực hiện **partitioning**. **Partition key** có thể là khoảng thời gian (năm 2020, 2021) hoặc các giá trị với số lượng ít (giới tính Nam, Nữ).

Ngoài ra, các **sub-table** cũng được coi là 1 table, có thể thực hiện **indexing** cho chúng. Từ đây dẫn đến 2 loại index cho **partitioning** là:
> - **Local index**: cho các sub-table thuộc table chính, lợi thế là giảm thời gian truy cập đến từng row trong **sub-table**.
> - **Global index**: cho table chính, tìm kiếm các record thuộc toàn bộ các **sub-table**.

Với mỗi loại index sẽ phù hợp với từng điều kiện khác nhau. Ví dụ **partitioning** table Engineer dựa trên **partition key** là gender, chia thành 2 **sub-table** là **Male** và **Female**. Nếu tìm kiếm các engineer nam trên 18 tuổi thì **local index** sẽ phù hợp hơn. Tìm kiếm tất cả engineer trên 18 tuổi sẽ sử dụng **global index**.

Với bài này, chúng ta đã biết một vài cách để tăng tốc query. Bài sau mình sẽ đi chi tiết vào cơ chế và ứng dụng của từng cách trong thực tế.

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)