## I. Cách comment (chú thích) trong MySQL

Trong hệ quản trị cơ sở dữ liệu MySQL, chú thích là những "đoạn văn bản" nằm bên trong một đoạn lệnh nhằm mục đích để lại nhận xét, lời giải thích hoặc lưu ý để người đọc hoặc chính người viết có thể hiểu nhanh hơn ý nghĩa của đoạn lệnh này.  
Ngoài ra, việc chú thích còn được dùng để vô hiệu hóa những câu lệnh mà chúng ta không muốn nó được thực thi.

### 1. Chú thích trên 1 dòng 

- Để viết chú thích trên 1 dòng thì chúng ta đặt nội dung chú thích nằm phía sau '--'.
- Chú thích trên mỗi dòng có thể đặt ở đầu dòng hoặc cuối dòng.

Khi thực thi đoạn mã dưới thì chỉ thực thi *UPDATE thuong.qa_member set age = 20 where qa_short_name = "Thương";*
```
Ví dụ:
UPDATE thuong.qa_member 
set age = 20 -- Cập nhật tuổi cho QA
-- and gender = "Nam"
where qa_short_name = "Thương";
```

![](https://images.viblo.asia/6f7eb592-ddc1-44e3-b06a-e4cb86a526d1.png)

### 2. Chú thích trên nhiều dòng 

- Để viết chú thích trên nhiều dòng thì chúng ta đặt nội dung chú thích nằm bên trong cặp dấu /* và */.
- Cặp dấu này cũng có thể dùng để chú thích trên 1 dòng.

Khi thực thi đoạn mã dưới thì chỉ thực thi *UPDATE thuong.qa_member set gender = "Nữ" where id = 7;*

```
Ví dụ:
UPDATE thuong.qa_member 
set gender = "Nữ" 
/*and age = 30
and qa_full_name = "Đoàn Ngọc Anh Vũ"
and qa_short_name = "Vũ Nữ" */
where id = 7;
```

![](https://images.viblo.asia/99ce960a-72b2-4b37-b58b-7d034d38f0ff.png)

## II. Chữ in hoa & chữ thường

- Trong hệ quản trị cơ sở dữ liệu MySQL thì các từ khóa & tên (do mình đặt) không có phân biệt trường hợp chữ in hoa hay chữ thường, cho nên các bạn muốn viết nó dưới dạng nào cũng được.

```
Ví dụ những câu lệnh dưới có ý nghĩa tương tự nhau:
SELECT * from `thuong`.`qa_member`;
select * FROM `thuong`.`qa_member`;
SeLeCt * fROM `THUONG`.`QA_MEMBER`;
```

![](https://images.viblo.asia/6d097e25-356f-442b-866d-d228374a9f43.png)

## III. Khoảng trắng & ngắt xuống dòng

Trong hệ quản trị cơ sở dữ liệu MySQL thì vấn đề khoảng trắng và ngắt xuống dòng nằm ở giữa các thành phần của câu lệnh là tùy ý, chúng ta có thể thêm một hoặc nhiều dấu khoảng trắng (ngắt xuống dòng) tùy thích sao cho mình dễ nhìn. Các mã lệnh vẫn được thực thi một cách bình thường

Ví dụ:
![](https://images.viblo.asia/674e86b7-581f-4437-b6d0-fa004cd4e80c.png)

## IV. Giá trị NULL

- Giá trị **NULL** có thể tạm hiểu là ô đó không có dữ liệu gì cả (nó không phải là giá trị FALSE, không phải giá trị zero (0), cũng không phải là chuỗi rỗng).
- Giá trị NULL không giống với những loại giá trị thông thường, nếu muốn truy xuất những hàng có chứa giá trị NULL thì khi khai báo ***'điều kiện'*** trong mệnh đề ***WHERE***, chúng ta không thể dùng toán tử dấu bằng **'='** mà thay vào đó là phải sử dụng toán tử ***IS NULL***.
- Tương tự, nếu muốn truy xuất những hàng không có chứa giá trị NULL thì chúng ta không thể sử dụng toán tử khác ***'!='*** mà thay vào đó là phải sử dụng toán tử ***'IS NOT NULL'***

![](https://images.viblo.asia/d6344637-80af-41e8-bd44-6dd53ee771a5.png)

## IV.Quy tắc đặt tên

Khi chúng ta khai báo một cái tên (ví dụ như khi khai báo tên của cơ sở dữ liệu mà mình muốn tạo) thì cái tên đó chỉ được phép chứa các ký tự là CHỮ CÁI, SỐ, DẤU GẠCH DƯỚI, nó tuyệt đối không được chứa các ký tự đặc biệt hoặc bắt đầu bằng một chữ số.

```
Ví dụ:
CREATE DATABASE QATEST;   --ĐÚNG
CREATE DATABASE _QATEST;   --ĐÚNG
CREATE DATABASE _QA_TEST;   --ĐÚNG
CREATE DATABASE 1QA4TEST;   --SAI (vì tên bắt đầu bằng một chữ số)
CREATE DATABASE QA^TEST$;   --SAI (vì tên có chứa ký tự đặt biệt)
```


Refer: 

http://webcoban.vn/

https://quantrimang.com/gia-tri-null-trong-sql-162393