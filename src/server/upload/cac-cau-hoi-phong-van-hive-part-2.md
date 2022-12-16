Phần tiếp theo của bộ 50 câu hỏi phỏng vấn về Hive:


26. Q26
```
Khi bạn trỏ một phân vùng của một bảng hive tới một thư mục mới, điều gì sẽ xảy ra với dữ liệu?
```

Dữ liệu sẽ ở vị trí cũ. Nó phải được di chuyển bằng tay

27. Q27
```
Viết một query để chèn một cột (new_col INT) vào một bảng hive (htab) tại một vị trí trước của một cột đang tồn tại (x_col)
```
=>
```
ALTER TABLE table_name
CHANGE COLUMN new_col  INT
BEFORE x_col
```

28. Q28 
```
Việc lưu trữ các bảng Hive có tiết kiệm không gian trong HDFS không?
```
Không, nó chỉ giảm số lượng files giúp namenode dễ quản lý hơn.

29. Q29
```
Làm thế nào để dừng một partition form được truy vấn ?
```
Bằng cách sử dụng mệnh đề ENABLE OFFLINE với ALTER TABLE 


30. Q30
```
Trong khi load dữ liệu vào một bảng hive sử dụng LOAD DATA, cách để xác định nếu nó là một hdfs file hoặc không phải một file local?
```

Bằng cách bỏ qua LOCAL CLAUSE trong câu lệnh LOAD DATA.


31. Q31

```
Nếu bạn bỏ qua OVERWRITE trong khi tạo một bảng Hive, điều gì xảy đến với file mới, và điều gì xảy đến với file đang tồn tại?
```
Những file mới vừa được thêm vào thư mục mục tiêu và những file đang tồn tại được overwrite. Những file khác có tên không khớp với những file mới sẽ vẫn tồn tại.
Nếu bạn thêm OVERWRITE thì tất cả những dữ liệu đang tồn tại trong thư mục sẽ bị xóa trước khi dữ liệu mới được ghi.

32. Q32

```
Những câu query sau làm nhiệm vụ gì?

INSERT OVERWRITE TABLE employees
PARTITION (country, state)
SELECT ..., se.cnty, se.st
FROM staged_employees se;

```
Nó tạo phân vùng trên bảng employees với giá trị phân vùng đến từ cột trong mệnh đề select. Nó được gọi là Chèn phân vùng động.

33. Q33
```
Bảng tạo Hàm trong hive là gì?
```
Bảng tạo hàm là một hàm lấy một cột như một tham số và mở rộng nó ra nhiều hàng hoặc cột. Ví dụ như explode()

34. Q34
```
Làm thế nào để Hive tránh mapredure?
```
Nếu chúng ta set giá trị hive.exec.mode.local.auto thành true thì hive sẽ tránh mapredure để lấy kết quả truy vấn.


35. Q35

```
Khác biệt giữa toán tử LIKE và RLIKE trong Hive?
```
Toán tử LIKE thực hiện giống cách mà toán tử SQL thông thường sử dụng trong truy vấn select. 

Ví dụ:
stress_name like '%Chi'
Nhưng toán tử RLIKE sử dụng biểu thức chính quy nâng cao có sẵn trong java 

Ví dụ: stress_name RLIKE '.\*(Chi|Oho).\*' sẽ select bất kì từ nào mà có chi hoặc oho trong nó.

36. Q36

```
Có khả năng tạo Cartesian join 2 bảng sử dụng Hive được không?
```

Không. Vì kiểu join này không thể thực hiện trong mapreduce


37. Q37
```
Là một phần của Tối ưu hóa các truy vấn trong HIve, thứ tự của kích thước bảng trong một truy vấn nối là bao nhiêu?
```
Trong một truy vấn nối, bảng nhỏ nhất sẽ được lấy ở vị trí đầu tiên và bảng lớn nhất sẽ được lấy ở vị trí cuối cùng.

38. Q38

```
Tính hữu ích của mệnh đề DISTRIBUTED BY trong Hive là gì?
```
Nó kiểm soát map đầu ra được giảm trong số các bộ giảm.  Nó hữu ích trong trường hợp truyền dữ liệu

39. Q39
```
Hãy convert string '51.2' thành một giá trị float trong cột price
```
Select cast(price as FLOAT)

40. Q40
```
Kết quả khi cast(‘abc’ as INT)
```

NULL

41. Q41

```
Có thể đặt tên một view giống với tên của một bảng Hive được không?
```
Không. Tên của một view bắt buộc là duy nhất khi so sánh với tất cả các bảng và view khác trong cùng một database.

42. Q42

```
Có thể  LOAD dữ liệu vào một view được không?
```

Không. một view không thể là mục tiêu của một câu lệnh INSERT hay LOAD

43. Q43

```
Những loại chi phí nào liên quan đến việc tạo chỉ mục trên bảng hive?
```

Các chỉ mục chiếm không gian và có một chi phí xử lý trong việc sắp xếp các giá trị của cột mà chỉ mục được kết thúc.

44. Q44

```
Đưa ra câu lệnh command để xem các chỉ mục trên bảng Hive?
```

SHOW INDEX ON table_name

Câu lệnh này sẽ list tất cả các chỉ mục được tạo trên bất kì cột nào trên bảng table_name

45. Q45
```
Bucketing là gì?
```
Các giá trị trong một cột được băm thành một số nhóm do người dùng xác định. Đó là một cách để tránh quá nhiều phân vùng hoặc phân vùng lồng nhau mà vẫn đảm bảo tối ưu hóa kết quả truy vấn.

46. Q46

```
/*streamtable(table_name)*/ thực hiện gì?
```
Nó là một gợi ý truy vấn: truyền một bảng vào bộ nhớ trước khi chạy truy vấn. Đó là một Kỹ thuật tối ưu hóa truy vấn.

47. Q47

```
Một phân vùng có thể được lưu trữ? Ưu điểm và Nhược điểm là gì?
```
Có. Một phân vùng có thể được lưu trữ. Lợi ích là giảm số lượng file được lưu trữ trong namenode và những file được lưu trữ có thể được truy vấn sử dụng Hive. Tác hại là nó có thể khiến truy vấn kém hiệu quả hơn và không thể tiết kiệm dung lượng.

48. Q48
```
UDF chung trong Hive là gì?
```
Nó là một UDF được tạo bằng cách sử dụng một chương trình java để phục vụ một số nhu cầu cụ thể không được đề cập trong các chức năng hiện có trong Hive. Nó có thể phát hiện loại đối số đầu vào theo chương trình và cung cấp phản hồi thích hợp.

49. Q49
```
Câu lệnh sau bị lỗi khi thực thi. Nguyên nhân có thể là gì?
LOAD DATA LOCAL INPATH ‘${env:HOME}/country/state/’
OVERWRITE INTO TABLE address;
```

Đường dẫn cục bộ phải chứa một tệp chứ không phải một thư mục. ${env:HOME} là một biến hợp lệ có sẵn trong môi trường Hive.

50. Q50

```
Làm cách nào để bạn chỉ định tên người tạo bảng khi tạo bảng trong Hive?
```
Mệnh đề TBLPROPERTIES được sử dụng để thêm tên người tạo trong khi tạo bảng.

Mệnh đề TBLPROPERTIES được thêm vào như sau:
`TBLPROPERTIES(‘creator’= ‘Joan’)`