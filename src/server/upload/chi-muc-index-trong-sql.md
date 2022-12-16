Chỉ mục (INDEX) trong SQL là bảng tra cứu đặc biệt mà công cụ tìm kiếm cơ sở dữ liệu có thể sử dụng để tăng nhanh thời gian và hiệu suất truy xuất dữ liệu.

Hiểu đơn giản, một chỉ mục là một con trỏ chỉ tới từng giá trị xuất hiện trong bảng/cột được đánh chỉ mục. Chỉ mục trong Database có ý nghĩa tương tự như các mục trong xuất hiện trong Mục lục của một cuốn sách.

INDEX giúp tăng tốc các truy vấn SELECT chứa các mệnh đề WHERE hoặc ORDER, nhưng nó làm chậm việc dữ liệu nhập vào với các lệnh UPDATE và INSERT. Các chỉ mục có thể được tạo hoặc xóa mà không ảnh hưởng tới dữ liệu.

Các kiểu index có trong SQL:

* Single-Column Index
* Unique Index
* Composite Index
* Implicit Index
Để tạo một chỉ mục ta sử dụng lệnh CREATE INDEX, bạn có thể đặt tên cho chỉ mục, xác định bảng, các cột muốn lập chỉ mục và xác định chỉ mục là theo thứ tự tăng dần hoặc giảm dần.

### Lệnh CREATE INDEX
Cú pháp cơ bản của lệnh CREATE INDEX trong SQL như sau:

```sql
CREATE INDEX ten_index ON ten_bang;
```

### Chỉ mục SINGLE-COLUMN
Single-Column Index được tạo cho duy nhất 1 cột trong bảng. Cú pháp cơ bản như sau:
```sql
CREATE INDEX ten_index
ON ten_bang (ten_cot);
```

### Chỉ mục UNIQUE
Unique Index là chỉ mục duy nhất, được sử dụng để tăng hiệu suất và đảm bảo tính toàn vẹn dữ liệu. Một chỉ mục duy nhất không cho phép chèn bất kỳ giá trị trùng lặp nào được chèn vào bảng. Cú pháp cơ bản như sau.
```sql
CREATE UNIQUE INDEX ten_index
ON ten_bang (ten_cot);
```
### Chỉ mục COMPOSITE
Composite Index là chỉ mục kết hợp dành cho hai hoặc nhiều cột trong một bảng. Cú pháp cơ bản của nó như sau:
```sql
CREATE INDEX ten_index
ON ten_bang (cot1, cot2);
```
Lưu ý:
- Việc tạo Single-Column Index hay Composite Index tùy thuộc vào tần suất bạn sử dụng mệnh đề WHERE của truy vấn dưới dạng điều kiện bộ lọc.
- Nếu chỉ có một cột được sử dụng, thì lựa chọn tốt nhất là Single-column Index. Nếu có hai hoặc nhiều cột được sử dụng thường xuyên trong mệnh đề WHERE như là các bộ lọc thì dạng chỉ mục Composite Index là lựa chọn tối ưu hơn.

### IMPLICIT INDEX
Implicit Index (Index ngầm định) là chỉ mục mà được tạo tự động bởi Database Server khi một bảng được tạo. Các Index ngầm định được tạo tự động cho các ràng buộc Primary key và các ràng buộc Unique.

### Lệnh DROP INDEX
Khi không cần sử dụng INDEX nữa bạn có thể DROP theo cú pháp sau:

### DROP INDEX ten_index;
Bạn nên cẩn thận trong khi xóa một chỉ mục, bởi vì khi đó hiệu suất có thể chậm hơn hoặc không được cải thiện.

### Khi nào nên tránh sử dụng INDEX?
Mặc dù sử dụng INDEX nhằm mục đích để nâng cao hiệu suất của Database, nhưng đôi khi bạn nên tránh dùng chúng. Dưới đây là một số trường hợp bạn cần xem xét để quyết định có nên sử dụng INDEX hay không:
- Không nên sử dụng trong các bảng nhỏ, ít bản ghi.
- Không nên sử dụng Index trong bảng mà các hoạt động UPDATE, INSERT xảy ra thường xuyên với tần suất lớn.
- Không nên sử dụng cho các cột mà chứa một số lượng lớn giá trị NULL.
- Không nên dùng Index cho các cột mà thường xuyên bị sửa đổi.

#Nguồn: ST