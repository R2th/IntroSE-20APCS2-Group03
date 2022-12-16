Trước khi bắt đầu bước vào thực hành về Presto, chúng ta nên biết cơ bản những dữ liệu, hàm có sẵn do Presto cung cấp, để tránh những lỗi cơ bản về kiểu dữ liệu, cũng như việc ''nhu nhốc" như build lại một hàm đã có sẵn. 

#  Dạng dữ liệu cơ bản

| TT | Kiểu dữ liệu và mô tả |
| -------- | -------- |
| 1.     | 	VARCHAR <br>Dữ liệu ký tự có độ dài thay đổi    |
| 2.    | BIGINT  <br> Một số nguyên có dấu 64 bit |
| 3. | DOUBLE  <br> Đây là kiểu số thực, dùng để chứa những số có dấu phẩy động 64 bit. |
| 4.     | DECIMAL <br> Một số thập phân chính xác cố định. Ví dụ: DECIMAL (10,3) - 10 là độ chính xác, tức là tổng số chữ số và 3 là giá trị tỷ lệ được biểu thị dưới dạng điểm phân số. Tỷ lệ tùy chọn và giá trị mặc định là 0  |
| 5. | BOOLEAN <br> Giá trị Boolean true hoặc false |
| 6. | VARBINARY <br> Dữ liệu nhị phân có độ dài thay đổi  |
| 7. | 	JSON <br> JSON data |
| 8.   | DATE <br> Kiểu dữ liệu ngày tháng được biểu thị dưới dạng year-month-day     |
| 9. | TIME, TIMESTAMP, TIMESTAMP với TIME ZONE <br> TIME - Thời gian trong ngày (hour-min-sec-millisecond) <br> TIMESTAMP - Ngày và thời gian trong ngày <br> TIMESTAMP với  TIME ZONE - Ngày và giờ trong ngày với giá trị múi giờ |
| 10.   | INTERVAL <br> Kéo dài các loại dữ liệu ngày và giờ   |
| 11.   | ARRAY <br>  Mảng của kiểu thành phần đã cho. Ví dụ: ARRAY [5,7]   |
| 12. |MAP <br> Ánh xạ giữa các loại thành phần đã cho. Ví dụ: MAP (ARRAY [‘one’, ’two’], ARRAY [5,7]) |
| 13.   | ROW <br> Cấu trúc hàng được tạo thành từ các trường được đặt tên    |

# Presto - Toán tử
Các toán tử Presto được liệt kê trong bảng sau.




| TT | Toán tử & mô tả |
| -------- | -------- |
| 1.     | 	Toán tử số học <br> Presto hỗ trợ các toán tử số học như +, -, *, /, %    |
| 2.    | 	Toán tử quan hệ <br> <,>,<=,>=,=,<> |
| 3. | Toán tử logic <br> AND, OR, NOT |
| 4.     | Toán tử phạm vi <br>  Toán tử phạm vi được sử dụng để kiểm tra giá trị trong một phạm vi cụ thể. Presto hỗ trợ BETWEEN, IS NULL, IS NOT NULL, GREATEST và LEAST |
| 5. | Toán tử thập phân <br> Toán tử thập phân số học nhị phân thực hiện phép toán số học nhị phân cho kiểu thập phân Toán tử thập phân Unary - Toán tử thực hiện phủ định|
| 6. | Toán tử chuỗi <br> Toán tử  `||` thực hiện nối chuỗi  |
| 7. | 	Toán tử ngày và giờ <br> Thực hiện các phép tính cộng và trừ số học trên các kiểu dữ liệu ngày và giờ |
| 8.   | Toán tử mảng <br> Toán tử chỉ số con [] - truy cập một phần tử của một mảng  <br> Toán tử kết hợp `||` - nối một mảng với một mảng hoặc một phần tử cùng kiểu    |
| 9. | Toán tử ánh xạ  <br> Toán tử chỉ số map [] - truy xuất giá trị tương ứng với một khóa nhất định từ map |


# Hàm toán học


| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | abs(x) <br> Trả về giá trị tuyệt đối của x    |
| 2.    | 		cbrt(x) <br> Trả về căn bậc hai của x |
| 3. | ceiling(x) <br> Trả về giá trị x được làm tròn đến số nguyên gần nhất |
| 4.     | ceil(x) <br> Tương tự ceiling(x) |
| 5. | degrees(x) <br> Trả về giá trị độ cho x |
| 6.  |e(x) <br> Trả về giá trị lũy thừa cho số của Euler    |
| 7. | 	exp(x) <br> Trả về giá trị lũy thừa cho số của Euler |
| 8.   | floor(x) <br> Trả về x làm tròn xuống số nguyên gần nhất    |
| 9. |from_base(string,radix) <br> Trả về giá trị của chuỗi được hiểu là số base-radix |
| 10.     | 	ln(x) <br> Trả về lôgarit tự nhiên của x |
| 11.    | 	log2(x) <br> Trả về logarit cơ số 2 của x |
| 12. | log10(x) <br> Trả về logarit cơ số 10 của x |
| 13.     | log(x,y) <br> Trả về logarit cơ số y của x |
| 14. | mod(n,m) <br> Trả về môđun (phần dư) của n chia cho m |
| 15. | pi() <br> Trả về giá trị pi. Kết quả sẽ được trả về dưới dạng giá trị kép |
| 16.| power(x,p) <br> Trả về lũy thừa của giá trị ‘p’ cho giá trị x    |
| 17. | pow(x,p) <br> Tương tự power(x,p) |
| 18.   | radians(x) <br> chuyển đổi góc x theo độ radian   |
| 19. |rand() <br> Tương tự radians() |
| 20. | random() <br> Trả về giá trị giả ngẫu nhiên |
| 21. |	rand(n) <br> Tương tự random()   |
| 22.    | 	round(x) <br> Trả về giá trị làm tròn cho x |
| 23. |round(x,d) <br> Giá trị x được làm tròn cho các chữ số thập phân ‘d’ |
| 24.     | sign(x) <br> Trả về hàm dấu hiệu của x, tức là, <br>0 nếu đối số là 0 <br>1 nếu đối số lớn hơn 0 <br>-1 nếu đối số nhỏ hơn 0 <br> Đối với các đối số kép, hàm cũng trả về: <br>NaN nếu đối số là NaN<br>1 nếu đối số là + Vô cực <br> -1 nếu đối số là - vô cực |
| 25. | sqrt(x) <br>Trả về căn bậc hai của x|
| 26.  |to_base(x,radix) <br> Kết quả được trả về dưới dạng cơ số cho x  |
| 27. | truncate(x) <br> Cắt bớt giá trị cho x |
| 28.   | width_bucket(x, bound1, bound2, n) <br> Trả về số bin của x được chỉ định giới hạn bound1 và giới hạn bound2 và n số nhóm    |
| 29. | width_bucket(x, bins)  <br> Trả về số bin của x theo các bin được chỉ định bởi các bin mảng|

#  Hàm lượng giác

| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | acos(x) <br> Trả về giá trị cosine nghịch đảo (x)    |
| 2.    | 	asin(x) <br> Trả về giá trị sin nghịch đảo (x) |
| 3. | atan(x) <br> Trả về giá trị tiếp tuyến nghịch đảo (x) |
| 4.     | atan2(y,x) <br> Trả về giá trị tiếp tuyến nghịch đảo (y / x) |
| 5. | cos(x) <br> Trả về giá trị cosine (x) |
| 6.  |cosh(x) <br> Trả về giá trị cosin hyperbol (x)    |
| 7. | 	sin(x) <br> Trả về giá trị sin (x) |
| 8.   | tan(x) <br> Trả về giá trị tiếp tuyến (x)    |
| 9. |tanh(x) <br> Trả về giá trị tiếp tuyến hyperbol (x) |

#  Hàm bitwise

| TT | Hàm và mô tả |
| -------- | -------- |
| 1. | bit_count(x, bits) <br> Đếm số bit    |
| 2. | bitwise_and(x,y) <br> Thực hiện thao tác bitwise AND cho hai bit, x và y |
| 3. | bitwise_or(x,y) <br> Phép toán theo chiều bit OR giữa hai bit x, y |
| 4.  | bitwise_not(x) <br> Bitwise Không hoạt động cho bit x |
| 5. | bitwise_xor(x,y)<br> Phép toán XOR cho các bit x, y |

#  Hàm chuỗi
| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | concat(string1, ..., stringN) <br> Nối các chuỗi đã cho    |
| 2.    | 	length(string) <br> Trả về độ dài của chuỗi đã cho |
| 3. | lower(string) <br> Trả về định dạng chữ thường cho chuỗi |
| 4.     | upper(string) <br> Trả về định dạng chữ hoa cho chuỗi đã cho |
| 5. | lpad(string, size, padstring) <br> Khoảng đệm bên trái cho chuỗi đã cho |
| 6.  |ltrim(string) <br> Loại bỏ khoảng trắng đầu chuỗi khỏi chuỗi    |
| 7. | replace(string, search, replace) <br> Thay thế giá trị chuỗi |
| 8.   | reverse(string) <br> Đảo ngược hoạt động được thực hiện cho chuỗi    |
| 9. |rpad(string, size, padstring) <br> Khoảng đệm bên phải cho chuỗi đã cho |
| 10.     | rtrim(string) <br> Loại bỏ khoảng trắng ở cuối chuỗi khỏi chuỗi |
| 11.    | split(string, delimiter) <br> Tách chuỗi trên dấu phân cách và trả về một mảng có kích thước ở giới hạn lớn nhất |
| 12. | split_part(string, delimiter, index)<br> Tách chuỗi trên dấu phân cách và trả về chỉ mục trường |
| 13.     | strpos(string, substring) <br> Trả về vị trí bắt đầu của chuỗi con trong chuỗi |
| 14. | substr(string, start) <br> Trả về chuỗi con cho chuỗi đã cho |
| 15. | substr(string, start, length) <br> Trả về chuỗi con cho chuỗi đã cho với độ dài cụ thể |
| 16.| trim(string)<br> Loại bỏ khoảng trắng đầu và cuối khỏi chuỗi   |


#  Hàm ngày và thời gian

| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | current_date <br> Trả về ngày hiện tại    |
| 2.    | current_time <br> Trả về thời gian hiện tại |
| 3. | current_timestamp <br> Trả về mốc thời gian hiện tại |
| 4.     | current_timezone() <br> Trả về múi giờ hiện tại |
| 5. | now() <br> Trả về ngày hiện tại, dấu thời gian với múi giờ |
| 6.  |localtime <br> Trả về giờ địa phương   |
| 7. |localtimestamp <br> Trả về mốc thời gian địa phương |


# Hàm biểu thức chính quy

| TT | Hàm và mô tả |
| -------- | -------- |
| 1. | regexp_extract_all(string, pattern) <br> Trả về chuỗi được so khớp bởi biểu thức chính quy cho mẫu |
| 2. | regexp_extract_all(string, pattern, group) <br> Trả về chuỗi được so khớp bởi biểu thức chính quy cho mẫu và nhóm |
| 3. | regexp_extract(string, pattern) <br> Trả về chuỗi con đầu tiên được so khớp bởi biểu thức chính quy cho mẫu |
| 4. | regexp_extract(string, pattern, group) <br> Trả về chuỗi con đầu tiên được so khớp bởi biểu thức chính quy cho mẫu và nhóm |
| 5. | regexp_like(string, pattern) <br> Trả về các kết quả phù hợp với chuỗi cho mẫu.  Nếu chuỗi được trả về, giá trị sẽ là true, ngược lại là false |
| 6. | regexp_replace(string, pattern) <br> Thay thế phiên bản của chuỗi được so khớp cho biểu thức bằng mẫu  |
| 7. | regexp_replace(string, pattern, replacement) <br> Thay thế phiên bản của chuỗi được so khớp cho biểu thức bằng mẫu và thay thế |
| 8. |regexp_split(string, pattern) <br> Tách biểu thức chính quy cho mẫu đã cho  |


# Hàm Json

| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | concat(string1, ..., stringN) <br> Nối các chuỗi đã cho    |
| 2.    | 	length(string) <br> Trả về độ dài của chuỗi đã cho |
| 3. | lower(string) <br> Trả về định dạng chữ thường cho chuỗi |
| 4.     | upper(string) <br> Trả về định dạng chữ hoa cho chuỗi đã cho |
| 5. | lpad(string, size, padstring) <br> Khoảng đệm bên trái cho chuỗi đã cho |
| 6.  |ltrim(string) <br> Loại bỏ khoảng trắng đầu chuỗi khỏi chuỗi    |

# Hàm url 
| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | url_extract_host(url) <br> Trả về URL host     |
| 2.    | 	url_extract_path(url) <br> Trả về URL path |
| 3. |url_extract_port(url) <br> Trả về URL port |
| 4.     | url_extract_protocol(url) <br> Trả về URL protocol |
| 5. |url_extract_query(url) <br> Trả về chuỗi truy vấn của URL |

# Hàm tổng hợp

| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | avg(x) <br> Trả về giá trị trung bình cho giá trị đã cho    |
| 2.    | min(x,n) <br> Trả về giá trị nhỏ nhất từ ​​hai giá trị |
| 3. |max(x,n) <br> Trả về giá trị lớn nhất từ ​​hai giá trị |
| 4.     |sum(x)<br> Trả về tổng giá trị |
| 5. | count(*)<br> Trả về số hàng đầu vào |
| 6.  |count(x)<br> Trả về số lượng giá trị đầu vào    |
| 7. | checksum(x) <br> Trả về tổng kiểm tra cho x |
| 8.   | arbitrary(x) <br> Trả về giá trị tùy ý cho x   |

# Hàm color 
| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | bar(x, width) <br> Hiển thị một thanh đơn bằng cách sử dụng rgb low_color và high_color    |
| 2.    | bar(x, width, low_color, high_color) <br> Hiển thị một thanh đơn cho chiều rộng được chỉ định |
| 3. |color(string) <br> Trả về giá trị màu cho chuỗi đã nhập |
| 4. |render(x, color)<br> Hiển thị giá trị x bằng cách sử dụng màu cụ thể bằng mã màu ANSI |
| 5. | render(b)<br> Chấp nhận giá trị boolean b và hiển thị màu xanh lá cây đúng hoặc màu đỏ sai bằng cách sử dụng mã màu ANSI |
| 6.  |rgb(red, green, blue)<br> Trả về giá trị màu ghi lại giá trị RGB của ba giá trị màu thành phần được cung cấp dưới dạng tham số int từ 0 đến 255  |
# Hàm mảng
| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | array_max(x) <br> Tìm phần tử tối đa trong một mảng  |
| 2.    | array_min(x) <br> Tìm phần tử min trong một mảng |
| 3. | array_sort(x) <br> Sắp xếp các phần tử trong một mảng |
| 4.     | array_remove(x,element) <br> Xóa phần tử cụ thể khỏi một mảng |
| 5. | concat(x,y)<br> Nối hai mảng |
| 6.  |contains(x,element) <br> Tìm các phần tử đã cho trong một mảng.  True sẽ được trả về nếu nó hiện diện, ngược lại false  |
| 7. | array_position(x,element) <br> Tìm vị trí của phần tử đã cho trong một mảng |
| 8.   | array_intersect(x,y) <br> Thực hiện sự giao nhau giữa hai mảng    |
| 9. |element_at(array,index) <br> Trả về vị trí phần tử mảng |
| 10. | slice(x,start,length) <br> Cắt các phần tử mảng với độ dài cụ thể |
# Hàm teradata

| TT | Hàm và mô tả |
| -------- | -------- |
| 1.     | index(string,substring) <br> Trả về chỉ mục của chuỗi với chuỗi con đã cho   |
| 2.    | substring(string,start) <br> Trả về chuỗi con của chuỗi đã cho.  Bạn có thể chỉ định chỉ mục bắt đầu tại đây |
| 3. |substring(string,start,length) <br> Trả về chuỗi con của chuỗi đã cho cho chỉ số bắt đầu cụ thể và độ dài của chuỗi|