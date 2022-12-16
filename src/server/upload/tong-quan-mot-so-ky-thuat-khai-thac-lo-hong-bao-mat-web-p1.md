Trong thời đại công nghệ phát triển hiện nay, việc đảm bảo an ninh thông tin trên không gian mạng đang là vấn đề dành được nhiều sự quan tâm. Nguy cơ mất an toàn thông tin đang là mối đe dọa lớn và ngày càng gia tăng đối với an ninh quốc gia. Có nhiều mục tiêu mà tin tặc thường nhắm tới như các máy chủ dịch vụ mạng, hệ thống cơ sở hạ tầng mạng.

Trong đó các hệ thống website đang là mục tiêu khá phổ biến do tính phổ cập và dễ tiếp cận đối với tin tặc. Do đó việc bảo mật cho các website hiện được chú trọng và đặt ra các yêu cầu đặc biệt đối với việc kiểm thử.

![](https://images.viblo.asia/630c4191-038a-48cf-b28a-8a9463686cc5.jpg)

**1.1. Khái Niệm**

**Webserver**: là một máy tính có kết nối internet được cài các chương trình đặc biệt nhằm nhiệm vụ xử lý các yêu cầu từ phía người dùng và phản hồi các yêu cầu đó. Máy chủ web có thể xử lý dữ liệu và cung cấp thông tin đến máy khách thông qua các máy tính cá nhân trên môi trường Internet qua giao thức HTTP, giao thức được thiết kế để gửi các tệp tin đến trình duyệt Web, và các giao thức khác.

**Request**:
có thể hiểu là thông tin gửi từ client (máy khách) lên server (máy chủ). Khi sử dụng trình duyệt truy cập một địa chỉ nào đó. 
Ví dụ khi truy cập địa chỉ google.com thì ngay lập tức trình duyệt sẽ dựa vào tên miền để gửi yêu cầu truy cập đến địa chỉ IP mà tên miền này đang trỏ tới, lúc này phía máy chủ sẽ phân tích yêu cầu và sẽ gửi luồng xử lý tới vị trí lưu trữ của mã nguồn PHP (hoặc mã nguồn bất kì) và nhiệm vụ của các mã nguồn là tiếp nhận yêu cầu, phân tích yêu cầu đó và trả kết quả lại cho máy khách là các trang web mà máy chủ Google tìm kiếm được.

**Response** : là những dữ liệu mà máy chủ web trả về cho máy khách. Có thể là một chuỗi HTML  hoặc các dữ liệu đa phương tiện như ảnh, video… Trình duyệt web của máy khách sẽ có nhiệm vụ xử lý và hiển thị các nội dung này thành giao diện trực quan cho người sử dụng.

**Database**: là nơi lưu trữ các nội dung của một website, trên cơ sở dữ liệu có thể lưu thông tin về các tài khoản, mật khẩu, email … của người dùng. Hoặc thậm chí là các thông tin cực kỳ quan trọng như thông tin về thẻ thanh toán và hồ sơ y tế. Vậy nên đây là một mục tiêu phổ biến của Hacker.

**Lỗ hổng bảo mật**: là những điểm yếu nằm trong thiết kế và cấu hình của hệ thống, lỗi của lập trình viên hoặc sơ suất trong quá trình vận hành.

Cách thức hoạt động cơ bản của việc khai thác lỗ hổng bảo mật Web cơ bản: Hacker sử dụng các công cụ dò quét để phát hiện một loạt các website có cấu hình bảo mật kém hoặc website trên các nền tảng khác nhau như “WordPress” hay “Joomla” có các lỗ hổng đã được công bố nhưng chưa được  xử lý. Từ đó Hacker sẽ lợi dụng để tấn công, cài đặt các mã độc và phá hoại các website nhằm trục lợi.

**1.2. Phân loại lỗ hổng bảo mật web.**	

Về cơ bản có nhiều loại lỗ hổng khác nhau và có nhiều cách phân chia khác nhau. Các lỗ hổng có thể phân chia theo các nền tảng, thành phần có lỗ hổng. Hoặc chia theo phương thức tấn công. Sau đây là một số lỗ hổng trên các ứng dụng web phổ biến và có tần suất xuất hiện nhiều và thường xuyên đứng trong “Top 10” các lỗ hổng của OWAP:

**1.2.1.SQL injection**

Cho phép kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào và các thông báo lỗi do hệ quản trị cơ sở dữ liệu trả về để inject (tiêm vào) và thực thi các câu lệnh SQL bất hợp pháp.

![](https://images.viblo.asia/1263dde6-40ef-4ad7-89fc-b3bf903f4588.png)


SQL Injection cho phép xóa, chèn, cập nhật, v.v. trên cơ sở dữ liệu của website.

**1.2.2. XML External Entity Processing**

XML là một ngôn ngữ đánh dấu mở rộng, được ứng dụng rất rộng rãi. Nó sử dụng để trao đổi dữ liệu giữa các ứng dụng. Hiện nay có rất nhiều loại tài liệu sử dụng định dạng XML như rtf, pdf, tệp hình ảnh (svg) hay các file cấu hình.

![](https://images.viblo.asia/bab36406-affe-403a-be6a-11e1177b4a31.png)


Kỹ thuật tấn công này dựa vào việc cho phép khai báo External Entity (đối tượng mở rộng) trong phần DTD của dữ liệu XML, attacker có thể khai báo một entity để đọc nội dung của file bất kỳ trong hệ thống nếu trình phân tích XML (parser) được cấu hình không tốt.

Để tránh bị khai thác lỗ hổng này thì cần cấu hình trình phân tích XML (parser), không cho phép sử dụng khai báo External Entity (đối tượng mở rộng) trong phần định kiểu tài liệu DTD.

**1.2.3. Cross Site Scripting (XSS)**

Cho phép Hacker chèn những đoạn script độc hại (thường là Javascript hoặc HTML) vào website và thực thi trong trình duyệt của người dùng.

Kẻ tấn công có thể dùng XSS để gửi những đoạn script độc hại tới một người dùng bất kỳ để lấy cookie, keylogging hoặc tiến hành lừa đảo

![](https://images.viblo.asia/b2faa243-e1aa-414a-bda6-84c2c731f379.png)


Ngoài ra trong một số trường hợp đặc biệt, lỗ hổng XSS còn có thể xảy ra ở phía máy chủ web. Điều này thường gây ra hậu quả nghiêm trọng. Kẻ tấn công có thể đọc được các file nhạy cảm trên máy chủ.

**1.2.4. Insecure Direct Object References**

Đây là trường hợp điển hình của việc cho rằng những gì người dùng nhập vào là tin cậy từ đó dẫn đến lỗ hổng bảo mật. Lỗ hổng này xảy ra khi chương trình cho phép người dùng truy cập các tài nguyên (dữ liệu, các tệp, cơ sở dữ liệu) mà không thực hiện quá trình kiểm soát quyền hạn (hoặc quá trình này không hoàn chỉnh) , dẫn đến kẻ tấn công có thể truy cập một cách bất hợp pháp vào các dữ liệu nhạy cảm, quan trọng trên máy chủ.

![](https://images.viblo.asia/4d14c4c4-958a-411d-8c1e-6bb4f994d2d8.png)


Một đoạn mã có module  "download.php" và cho phép người dùng tải tệp xuống sử dụng tham số là tên file để tải xuống tệp từ máy chủ. Ví dụ “download.php?file=something.txt”. Do sai sót của nhà phát triển, việc kiểm tra quyền hạn đã bị bỏ qua. Kẻ tấn công có thể sử dụng lỗ hổng này để tải về bất kì tệp nào trên hệ thống mà ứng dụng có quyền truy cập. Chẳng hạn như mã nguồn ứng dụng, tệp nhạy cảm hoặc các dữ liệu khác trên máy chủ. 

Một ví dụ phổ biến khác là chức năng đặt lại mật khẩu dựa vào đầu vào của người dùng để xác định mật khẩu đặt lại. Sau khi nhấp vào URL hợp lệ, kẻ tấn công có thể sửa đổi trường tên người dùng trong URL để “đóng giả” người quản trị.

**1.2.5. Sensitive data exposure**

Lỗ hổng này thuộc về khía cạnh quản lý và mã hóa tài nguyên. Dữ liệu nhạy cảm phải được mã hóa mọi lúc, bao gồm cả khi gửi đi và khi lưu trữ – không được phép có ngoại lệ. 

Thông tin thẻ tín dụng và mật khẩu người dùng không bao giờ được gửi đi hoặc được lưu trữ không mã hóa. Ngoài ra, các tiêu chuẩn an ninh web đề nghị sử dụng AES (256 bit trở lên) và RSA (2048 bit trở lên).

![](https://images.viblo.asia/ab9fa10c-152a-4ab2-962a-3d138ff89ef1.jpg)

Việc để lộ các dữ liệu nhạy cảm có thể làm ảnh hưởng nghiêm trọng đến hệ thống, rò rỉ các thông tin có giá trị cao khiến kẻ tấn công có thể lợi dụng các thông tin này để phát động các cuộc tấn công khác nguy hiểm hơn rất nhiều.


**1.3. 	Kỹ thuật khai thác lỗ hổng bảo mật web**

**1.3.1. SQL Injection Attack**

SQL Injection là một trong những kiểu tấn công web bằng cách tiêm các mã SQL query/command (truy vấn sql) vào form nhập dữ liệu trước khi chuyển cho ứng dụng web xử lí, có thể đăng nhập mà không cần nhập tên đăng nhập và mật khẩu và thực thi từ xa, lấy dữ liệu và chiếm quyền quản trị của SQL server.

![](https://images.viblo.asia/84adf88c-baa7-4207-8dd9-dc11a3c059c6.png)

Ví dụ về cách khai thác SQL Injection khi kiểm thử xâm nhập một trang web:
- Kiểm tra điểm yếu của trang web:

Tìm kiếm các vị trí cho phép gửi dữ liệu bất kỳ chẳng hạn như các trang đăng nhập, tìm kiếm, phản hồi, ...


`http://web-site.com/index.php?id=10`

Một số trang web chuyển tham số qua các trường ẩn:

![](https://images.viblo.asia/5b32db68-3725-4dc3-a2f9-f29b5ab8a0d1.png)

- Tiến hành tiêm các đoạn mã truy vấn:

Ví dụ đối với trang đăng nhập, có thể tiêm các đoạn mã truy vấn như sau :
![](https://images.viblo.asia/283d4487-6524-4339-98d9-6914155b6095.png)

- Một số payload để thực hiện tấn công:


```
' or 1=1— "

or 1=1—

or 1=1—

' or 'a'=‘a

‘) or ('a'='a
```

Nếu câu lệnh truy vấn SQL ở Server có dạng:

![](https://images.viblo.asia/24572f01-e9a0-46ec-b02a-226365a93d70.png)


Sau khi tiêm mã  `"admin" or 1=1--“ `sẽ trở thành câu query luôn đúng, từ đó kẻ tấn công có thể đăng nhập mà không cần tên đăng nhập và mật khẩu.

![](https://images.viblo.asia/ef99aa69-00a4-4216-ae96-95db26bce3a6.png)

**Các kiểu khai thác SQL injection phổ biến:**
- SQL Injection UNION Attacks: Câu lệnh UNION dùng để kết nối 2 mệnh đề SELECT (hỗ trợ cả mysql và mssql). Kẻ tấn công có thể tận dụng câu lệnh này để chèn thêm đoạn truy vấn vào các bảng dữ liệu khác.

- SQL Injection Error Based Attack: Phương pháp tấn công lợi dụng chức năng thông báo lỗi của SQL Server để lấy dữ liệu.

- SQL Injection Blind Attack: Sử dụng AND, SUBSTR(), ... dựa vào kết quả trả về True hoặc False hoặc sử dụng SLEEP() và căn cứ vào thời gian thực thi câu lệnh để đoán tên bảng, tên cột, dữ liệu, ...
	
**Hậu quả của SQL Injection:**
- Hậu quả lớn nhất mà SQL Injection gây ra là: Làm lộ dữ liệu trong cơ sở dữ liệu. Tuỳ vào tầm quan trọng của dữ liệu mà hậu quả dao động ở mức nhẹ cho đến vô cùng nghiêm trọng.

- Lộ dữ liệu khách hàng có thể ảnh hưởng rất nghiêm trọng đến công ty. Hình ảnh công ty có thể bị ảnh hưởng, khách hàng chuyển qua sử dụng dịch vụ khác, dẫn đến phá sản v...v...

- Lỗ hỗng này cũng ảnh hưởng lớn đến khách hàng. Do họ thường dùng chung một mật khẩu cho nhiều tài khoản, chỉ cần lộ mật khẩu một tài khoản thì các tài khoản khác cũng lộ theo.


**Các cách phòng chống:**

- Lọc dữ liệu từ người dùng : Cách phòng chống này tương tự như XSS. Ta sử dụng filter (bộ lọc) để lọc các kí tự đặc biệt (; ” ‘) hoặc các từ khoá (SELECT, UNION) do người dùng nhập vào. Nên sử dụng thư viện/function được cung cấp bởi framework vì tự viết lại từ đầu vừa tốn thời gian vừa dễ sơ sót.

- Không cộng chuỗi để tạo SQL: Sử dụng parameter (tham số) thay vì cộng chuỗi. Nếu dữ liệu truyền vào không hợp pháp, SQL Engine sẽ tự động báo lỗi, ta không cần dùng hàm tự tạo để kiểm tra.

- Không hiển thị exception, message lỗi: Kẻ tấn công dựa vào thông báo lỗi để tìm ra cấu trúc cơ sử dữ liệu. Khi có lỗi, ta chỉ hiện thông báo lỗi chứ đừng hiển thị đầy đủ thông tin về lỗi, tránh kẻ tấn công lợi dụng.

- Phân quyền trong Database: Nếu chỉ truy cập dữ liệu từ một số bảng, hãy tạo một tải khoản trong cơ sở dữ liệu, gán quyền truy cập cho tài khoản đó chứ đừng dùng tải khoản root hay superuser. Lúc này, dù kẻ tấn công có tiêm được sql cũng không thể đọc dữ liệu từ các bảng chính, sửa hay xoá dữ liệu.

- Backup dữ liệu thường xuyên: Dữ liệu phải thường xuyên được sao lưu để nếu có bị kẻ tấn công xoá thì ta vẫn có thể khôi phục được.

**1.3.2. (De)Serialization**

(De)Serialization là những tính năng hỗ trợ trong hầu hết các ngôn ngữ lập trình hướng đối tượng dưới nhiều tên gọi khác nhau như Serialize trong PHP và JAVA, Marshal trong Ruby, Pickle trong Python.

![](https://images.viblo.asia/68f5cdd5-9259-49d0-9d0d-85c91c8ec471.png)

Serialization là quá trình chuyển đổi dữ liệu có cấu trúc hoặc một đối tượng sang chuỗi các bytes để có thể lưu trữ vào bộ nhớ hoặc truyền đi qua mạng. Deserialization là quá trình ngược lại Serialization, chuyển đổi chuỗi các bytes trở thành đối tượng.

Dữ liệu không đúng định dạng hoặc truyền vào không mong muốn có thể bị lợi dụng để thay đổi luồng xử lý, chèn các mã code độc hại để thực thi từ xa (RCE). 

Lỗ hổng Deserialization trong PHP (PHP Object Injection) có thể giúp kẻ tấn công thực hiện nhiều loại tấn công khác như Code Injection, SQL Injection, Path Traversal, ... Các lớp phương thức Magic method __wakeup(), __destruct(), __toString() cùng với POP Chain giúp cho đối tượng tấn công thực thi lỗi này.
	
Phân tích đọan chương trình python sau: 

```python
import pickle

class Person:
    def __init__ (self,name,age):
        self.name = name
        self.age = age

    def info(self):
        print "Name:" + self.name
        print "Age:" + str(self.age)

p1 = Person("br",21)

with open("test.txt","wb") as f:
    pickle.dump(p1,f)
```

Đoạn chương trình trên có nhiệm vụ lưu một đối tượng trong python vào file. Để giúp người dùng dễ dàng truyền tải lưu trữ và tái sử dụng. Bây giờ khi người dùng muốn tái sử dụng lại đối tượng “p1” thì có thể sử dụng đoạn code như sau:

```python
with open("test.txt","wb") as f:
    p = pickle.load(f)

p.info()
```

Nhưng là khi tái sử dụng lại đối tượng này. Chương trình có nguy cơ bị tấn công. 

```python
import pickle
import base64

code = " import _('os').popen('some evil os command').read()"

class RunBinSh(object):

def _reduce (self):
    return (eval(code,))
with open("test.txt","wb") as f:
    pickle.dump(RunBinSh(),f)
```



**1.3.3. Directory traversal**

![](https://images.viblo.asia/027fc106-33e0-470c-a77d-bf6ebd1645d8.jpg)


Directory traversal (còn có tên gọi khác là Path traversal) là một dạng tấn công cho phép Hacker truy cập được các thư mục và tệp tài nguyên nằm ngoài thư mục hiện hành. 
Những tài nguyên bị truy cập trái phép này có thể là mã nguồn, các thông tin cấu hình máy chủ, các tệp và thư mục hệ thống…

Ngoài ra lỗ hổng này thì thường được kết hợp với một số lỗ hổng khác để nâng cao hiệu quả tấn công.

**Cách Directory traversal hoạt động:**

Một ví dụ đơn giản là việc lưu trữ ảnh trong hệ thống:

Giả sử những file ảnh được người quản trị hệ thống lưu trong thư mục sau: “/var/www/html/blog/public/img/”. Khi truy cập file avatar.jpg trên thư mực này lập trình viên có thể để đường dẫn truy cập có dạng như:

`http://exampleweb.com/get_photo/file?name=avatar.jp`g. Lúc này webserver sẽ truy cập vào file ở đường dẫn `/var/www/html/blog/public/img/avatar.jpg` và trả về cho người dùng.
	
Nhưng thay vì việc truyền file name là avatar.jpg tin tặc có thể truyền tên tập tin là `../../../../../../etc/password`. Lúc này webserver sẽ truy cập và trả về nội dung của tệp tin được lưu trữ trên máy chủ web ở đường dẫn `/var/www/html/blog/public/img/../../../../../../etc/password. `

Đường dẫn này tương đương với “/etc/password” nên máy chủ web sẽ trả về nội dung tệp hệ thống này cho kẻ tấn công.

> Trong thực tế tùy theo máy chủ web và thiết lập hệ thống mà cách khai thác có thể khác, khó hơn và đa dạng hơn. Ví dụ như đối với window server thì kẻ tấn công có thể dùng cả “../” và “..\”
> 
**Lý do lỗ hổng Directory traversal rất nguy hiểm:**

- Đây là một lỗ hổng rất nguy hiểm vì nó có thể gây ảnh hưởng đến hệ thống. Ở mức độ đơn giản, kẻ tấn công có thể đọc được các tệp trong thư mục web hay thậm chí là các tệp nhạy cảm trong hệ thống.
- Với 1 số cách khai thác và lỗ hổng ở mức độ chuyên sâu hơn, kẻ tấn công có thể ghi được tập độc hại vào hệ thống từ đó chèn thêm mã độc. Tệ nhất là có thể dẫn đến việc kẻ tấn công có thể thực thi mã từ xa.
	
   
**Một số cách ngăn chặn:**
   
- Nên kiểm tra dữ liệu nhập vào của người dùng trước khi xử lý nó.
    
- Sử dụng whitelist (danh sách trắng) cho những giá trị được cho phép.
- Hoặc tên tệp là những kí tự số, chữ không nên chứa những ký tự đặc biệt.