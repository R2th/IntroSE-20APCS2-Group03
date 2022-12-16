Chắc hẳn là đối với  các lập trình viên sử dụng hệ điều hành linux thì không còn xa lạ gì với lệnh grep. Nhưng với những bạn còn xa lạ thì sao?
Bài viết này sẽ giúp các bạn mới tìm hiểu về lệnh grep có thể hiểu được lệnh grep làm gì? Tùy biến với các options như thế nào.
Các options thường dùng của grep

## 1.Grep?
`grep` là command hiển thị line chứa chuỗi kí tự trong file. Có thể chỉ định nhiều file hoặc nhiều đường dẫn của đối tượng search. Có thể thay file hoặc đường dẫn bằng kết quả output từ command khác. Đây là trường hợp hay được sử dụng khi dùng với grep


## 2.Một số lệnh và options thường dùng

### Không sử dụng option
Lệnh cơ bản và hay gặp nhất khi bạn muốn tìm kiếm một chuỗi bất kì xuất hiện trong một file duy nhất hoặc nhiều file. Cú pháp command như sau:
```
$ grep "chuoi muon tim" ten_file_hoac_file_pattern
```

Kết quả tìm được sẽ hiển thị ngay trên command line.

ví dụ khi tìm chuỗi "ManhLD" trong file index.html: 
```
$ grep "ManhLD" index.html
```

```
ManhLD
ManhLD
```

ví dụ khi tìm chuỗi "Salary" ở trong tất cả các file đã export vào tháng 8
```
$ grep "Salary" salary/export_08*
```

```
salary/export_08_01_2021.html:Salary
salary/export_08_02_2021.html:Salary
salary/export_08_03_2021.html:Salary
```

### Option -i: tìm kiếm không phân biệt hoa thường
Giống như câu lệnh tìm chuỗi cơ bản ở trên, tuy nhiên khi khai báo thêm option `-i `,  grep sẽ thực hiện tìm kiếm gần đúng theo kiểu không phân biệt ký tự hoa thường.
Cú pháp command như sau:
```
$ grep -i "chuoi muon tim" ten_file_hoac_file_pattern
```

Nên cho dù chuỗi của bạn có  "Hello word", "hEllO wORD" hay "HELLO word" đi nữa thì kết quả vẫn xuất hiện trên màn command line

### Option -w: tìm chính xác cụm từ
Nếu bạn tìm kiếm theo những lệnh trên thì kết quả trả về sẽ chưa hẳn theo đúng mong muốn của bạn. Kết qủa thường sẽ thừa so với yêu cầu bởi vì grep sẽ tìm theo cả chuỗi con, ví dụ tìm con thì contact, concat cũng có chứa chuỗi con nên cũng sẽ trả về kết quả. Do đó, nếu bạn muốn tìm chính xác từ mong muốn thì có thể dùng lựa chọn -w

```
$ grep -w "chuoi muon tim" ten_file_hoac_file_pattern
```

### Option -r: tìm tất cả các files ở tất cả thư mục con
Khi mà bạn không biết chính xác file muốn tìm hoặc thư mục của bạn có quá nhiều files hoặc đơn giản là bạn muốn tìm kiếm xem chuỗi xuất hiện ở trong file nào.
Option grep -r sẽ tìm hết tất cả files ở tất cả các thư mục con 

```
$ grep -r "chuoi muon tim" ten_file_hoac_file_pattern
```

### Option -v: tìm những line không chứ từ khóa
Ngược với những options ở trên trả về line có chứa từ khoá. Thì với option -v, sẽ chỉ trả về những line không chứ từ khóa đó.

```
$ grep -v "chuoi" ten_file_hoac_file_pattern
```

### Option -c: đếm số kết quả tìm được
Đơn giản là option này sẽ trả về có bao nhiêu kết quả tìm được. với số lượng kết quả hằng trăm, hàng ngàn thì option này giúp mình đỡ stress khi đến số line kết quả :v

```
$ grep -c "chuoi muon tim" ten_file_hoac_file_pattern
```

### Option -l: hiển thị tên file chứa chuỗi
Trả về list tên file chứ chuỗi bạn muốn tìm

```
$ grep -l "chuoi muon tim" ten_file_hoac_file_pattern
```

### Option -n: hiện thị số thứ tự line kết quả
Đây là một option mình rất thường xuyên sử dụng, khi sử dụng sẽ trả về line kết quả kèm số thứ tự của line đó trong file. Điều này thực rất hữu ích đối với những file có số line hàng trăm hay hàng ngàn.
Ngoài ra nhìn cũng đẹp mắt và trực quan hơn

```
$ grep -n "chuoi muon tim" ten_file_hoac_file_pattern
```

### Một trường hợp hay gặp
Lệnh mà đa số ai đang dùng linux đã dùng qua. Đôi khi service đang sử dụng vì lí do nào đó bị chết nhưng tiến trình vẫn đang chạy thì mình cần kill nó đi rồi restart lại.
Lệnh này sẽ giúp biết được id của tiến trình để kill nó

```
$ ps ux | grep elastichseach
```

## Cuối cùng
Thank for reading!