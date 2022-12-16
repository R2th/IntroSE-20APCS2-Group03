Chào các bạn, đây sẽ là bài thứ 4 trong series của mình. Ở các bài trước thì mình đã tìm hiểu lý thuyết về cơ sở dữ liệu, hệ quản trị cơ sở dữ liệu, các khái niệm cơ bản. Vậy thì hôm nay mình sẽ tiến tới phần thú vị nhất đó là thực hành tấn công. Phần mình thích nhất. let's go.

**Các kỹ thuật khai thác SQL Injection**

**Tautology Base SQLi**
Đây là kỹ thuật phổ biến và rất dễ thực hiện, làm thay đổi ý nghĩa của biểu thức quan hệ trong mệnh đề kiểm tra.

![](https://images.viblo.asia/71022e52-c95f-45b9-ac3a-c48801b512c6.png)

Đoạn mã trên thực hiện nhận biến recipient từ người dùng và thực hiện câu lệnh truy vấn cơ sở dữ liệu: lấy ra thông tin về AcctNum từ bảng customer với giá trị cột balance nhỏ hơn 100 và username bằng giá trị recipent nhập vào.
Tuy nhiên , khi giá trị nhập vào là recipent = *‘anyone’ or 1 =1 ; #;* thì câu lệnh truy vấn trở thành:

![](https://images.viblo.asia/cf0b41b2-87f2-42a7-98e3-a7dbb9a0eae5.png)

Do *1=1* luôn trả về TRUE , biểu thức điều kiện trả về TRUE , do đó câu lệnh truy vấn sẽ trả về tất cả dữ liệu của cột AcctNum trong bảng Customer.

--Thực hiện tấn công demo

vd: trên Dvwa 1 bộ mã nguồn mở ứng dụng PHP/MYSQL có chứa các lỗ hổng ở tầng ứng dụng web .

Thực hiện nhập “ 1’ or 1=1;# ” vào ô User ID và thực hiện Submit . Dữ liệu trả về là tất cả thông tin user trong database
![](https://images.viblo.asia/b327db87-25ab-413e-a05f-3f8f91173c2e.png)
Giải thích: Hình dưới là mã nguồn thực hiện việc truy vấn cơ sở dữ liệu dựa vào ID do người dùng nhập vào .
![](https://images.viblo.asia/8574cebf-1d5d-4282-9500-5d34158b9b52.png)

Ta có câu lệnh truy vấn

$query = "*SELECT firstname, lastname FROM users WHERE userid = '$id';*";

Khi nhập id = 1’ or 1=1;# , biến id được truyền vào câu lệnh truy vấn, câu lệnh truy vấn đã cho trở thành SELECT first_name, last_name FROM users WHERE user_id = ‘1’ or 1=1;#;’;”

Do 1=1 là phép toán luôn đúng, biểu thức điều kiện WHERE user_id = ‘1’ or 1=1;#;’; luôn trả về TRUE , khiến câu lệnh truy vấn sẽ thực hiện truy vấn tất cả dữ liệu trong bảng user.

**Union Query Based**

Trong MySQL, mệnh đề UNION cho phép gộp các kết quả của các câu truy vấn với điều kiện, các mệnh đề SELECT phải có cùng số cột, cùng kiểu dữ liệu.

Tuy nhiên, thông qua UNION, kẻ tấn công dễ dàng có thể truyền vào 1 câu truy vấn khai thác các thông tin từ CSDL:
* Xác định số cột trong mệnh đề Select: Nếu STT của cột nhỏ hơn hoặc bằng số cột liệt kê trong truy vấn => thực hiện thành công; ngược lại trả về thông báo lỗi.
* Đoán tên bảng, tên cột.
* Kiểm tra kiểu dữ liệu.
* Trích xuất dữ liệu trái phép.
* Thực hiện tất cả nguy cơ trên đối với các CSDL khác nếu tồn tại lỗ hổng phân quyền trên DBMS.

-- Thực hiện tấn công demo

Nhập giá trị đầu vào là: *' AND 1=1 UNION SELECT database(), version()#*
Lúc này, câu lệnh truy vấn sẽ trở thành :

*$query = "SELECT firstname, lastname FROM users WHERE userid = '' 1=1 UNION SELECT database(), version()#;*

Tương tự như Tautology SQLi, do mệnh đề điều kiện trả về TRUE, câu lệnh này sẽ thực hiện truy vấn cơ sở dữ liệu, thực hiện mệnh đề UNION lấy ra thông tin về database , phiên bản của database .

![](https://images.viblo.asia/9725c333-1bb5-436b-a968-5d3567318136.png)

**Order By Clause**

Trong MySQL, mệnh đề ORDER BY sắp xếp kết quả theo một cột nào đó được liệt kê trong mệnh đề SELECT.

Tương tự như UNION QUERY BASE, ở kỹ thuật này, kẻ tấn công sẽ inject những đoạn
mã cho phép :
* Đoán số cột được liệt kê trong câu truy vấn: Nếu STT của cột nhỏ hơn hoặc bằng số cột liệt kê trong truy vấn => thực hiện thành công; ngược lại trả về thông báo lỗi.
* Đoán tên cột CSDL trong câu truy vấn: Nếu tên cột trong mệnh đề trùng với tên cột trong truy vấn: thực hiện thành công; ngược lại trả về thông báo lỗi.

-- Thực hiện tấn công demo

Nhập giá trị đầu vào là : *‘ OR 1=1 ORDER BY 2 ;#*

Lúc này , câu truy vấn cơ sở dữ liệu trở thành :

$query = *"SELECT firstname, lastname FROM users WHERE userid = '' OR 1=1 ORDER BY 2”;#”*

Tương tự như Tautology SQLi, do mệnh đề điều kiện trả về TRUE, câu lệnh này sẽ thực hiện truy vấn cơ sở dữ liệu, thực hiện mệnh đề ORDERBY lấy ra tất cả dữ liệu trong bảng user và sắp xếp theo cột 2 trong câu truy vấn.

![](https://images.viblo.asia/971d1ecb-6517-4d3e-9a01-a71cdd8e3bb4.png)

**Boolean Base và Time Base Blind SQL Injection**

Trong một số trường hợp, hệ thống không trả lại thông báo lỗi thi thực thi câu lệnh SQL, kẻ tấn công có thể sử dụng 2 kỹ thuật dưới đây để thực hiện thăm dò thông tin về cơ sở dữ liệu:
* Boolean Base Blind SQL Injection: sử dụng câu truy vấn trả về True/False Cơ sở của kỹ thuật này là việc so sánh đúng sai để tìm ra từng ký tự của những thông tin như tên bảng, tên cột... Do đó, với dải giá trị chữ số, chữ cái (bao gồm cả hoa, thường), và một số ký tự đặc biệt, việc so khớp trở nên rất khó khăn và đòi hỏi nhiều thời gian. Do đó việc khai thác lỗi chủ yếu được tiến hành bằng các công cụ (tools).
* Time-base BLIND SQL INJECTION: kiểm tra thời gian thực thi câu truy vấn Tuy nhiên, cả hai cách này mất nhiều thời gian để khai thác lỗi Blind SQLi nên thường sử dụng công cụ hỗ trợ như SQL map.


-----


Với 4 bài viết trong seri này mong sẽ giúp ích được các bận nhiều trong việc secu coding. Cảm ơn các bạn đã quan tâm tới bài viết của mình