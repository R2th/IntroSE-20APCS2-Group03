## Description
* SQL ( /ˈɛs kjuː ˈɛl/, hoặc /ˈsiːkwəl/; Structured Query Language) hay ngôn ngữ truy vấn mang tính cấu trúc, là một loại ngôn ngữ máy tính phổ biến để tạo, sửa, và lấy dữ liệu từ một hệ quản trị cơ sở dữ liệu quan hệ.
* SQL Injection hoặc SQLi xảy ra khi có một lỗ hổng database-backed trên trang web cho phép Attacker truy vấn hoặc tấn công database của trang web. Các cuộc tấn công SQLi thường được thưởng cao vì mức độ nguy hiểm của chúng. Attacker có thể lấy toàn bộ dữ liệu trên website của bạn, thậm chí có thể chỉnh sửa chúng, thao túng và thậm chí có thể tự tạo một admin đăng nhập vào cơ sở dữ liệu của bạn. \
## SQL Databases
* Database lưu trữ thông tin trong các bản ghi và các trường có trong một tập hợp các bảng (còn được gọi là các bảng dữ liệu). Các bảng chứa một hoặc nhiều cột, một hàng trong bảng biểu thị một bản ghi trong CSDL (cơ sở dữ liệu). Người dùng dựa vào ngôn ngữ lập trình có tên là SQL để tạo, đọc, cập nhật và xóa các bản ghi trong CSLD. Người dùng gửi các lệnh SQL (còn được gọi là câu lệnh hoặc truy vấn) đến CSDL và giả sử các lệnh được chấp nhận, CSDL sẽ diễn giải các câu lệnh và thực hiện một số hành động. CSDL SQL phổ biến bao gồm có MySQL, Postgresql, MSSQL, ... Chúng tôi sẽ sử dụng MySQL cho các mục đích của chương này nhưng các khái niệm chung áp dụng cho tất cả các CSDL SQL. Các câu lệnh SQL được tạo thành từ các từ khóa và hàm. 
* Ví dụ: Câu lệnh sau cho CSDL chọn thông tin từ cột tên trong bảng người dùng, cho các bản ghi trong đó cột ID bằng 1.
    ```sql
    SELECT name FROM users WHERE id = 1;
    ```
* Nhiều trang web dựa trên CSDL để lưu trữ thông tin và sử dụng thông tin đó để tự động tạo nội dung. Ví dụ trang `https://www.leanpub.com/ ` lưu trữ các đơn đặt hàng trước đó hoặc danh sách các sách điện tử đã mua trong CSDL mà bạn truy cập khi đăng nhập bằng tài khoản của mình. Trình duyệt web của bạn truy vấn CSDL của trang web và tạo HTML dựa trên thông tin được trả về. Hãy cùng xem một ví dụ lý thuyết về máy chủ được code bằng PHP để tạo lệnh MySQL sau khi người dùng truy cập URL `https://www.leanpub.com?name=yaworsk` 
    ```php
    $name = $_GET['name'];
    $q = "SELECT * FROM users WHERE name = '$name' ";
    mysql_query($query);
    ```
* Mã sử dụng `$_GET[]` để truy cập giá trị tên từ các tham số URL được chỉ định giữa các dấu ngoặc và lưu giá trị trong biến `$name`. Tham số này sau đó được chuyển đến biến `$q` mà không cần sanitization. Biến `$q` đại diện cho truy vấn để thực thi và tìm nạp tất cả dữ liệu từ bảng `users` trong đó cột tên khớp với giá trị trong tham số URL name. Truy vấn được thực hiện bằng cách chuyển biến `$q` cho hàm PHP mysql_query. Trang web trả lại tên chứa văn bản thông thường, nhưng nếu người dùng nhập 1 input `'OR 1='1` vào tham số URL như `https://www.leanpub.com?name=test' OR 1='1`, truy vấn sẽ được thực hiện là:
    ```sql
    $query = "SELECT * FROM users WHERE name = 'test' OR 1='1' ";
    ```
* Truy vấn đã được thay đổi sau khi kiểm tra giá trị và thêm mã SQL `OR 1='1` vào cuối truy vấn. Trong trường hợp này, SQLi sửa đổi mệnh đề `WHERE` để tìm kiếm các bản ghi trong cột tên khớp với phần search hoặc equattion `1='1` sẽ trả về giá trị true. MySQL coi `1` là số nguyên và vì 1 luôn bằng 1, điều kiện đúng và truy vấn sẽ trả về tất cả các bản ghi trong bảng users. Tuy nhiên, việc kiểm tra injection `OR 1='1` sẽ hoạt động khi các phần khác của truy vấn được sanitized. Ví dụ, bạn có thể có một query như:
    ```sql
    $name = $_GET['name'];
    $pw = mysql_real_escape_string($_GET['password']);
    $query = "SELECT * FROM users WHERE name = '$name' AND pw = '$pw' ";
    ```
* Trong trường hợp này, tham số password cũng do người dùng kiểm soát nhưng được sanitized đúng cách bằng cách sử dụng hàm `mysql_real_escape_string`. Nếu bạn sử dụng payload, hãy kiểm tra `OR 1='1` làm name và mật khẩu sẽ là 12345.
    ```sql
    $query = "SELECT * FROM users WHERE name = 'test' OR 1='1' AND pw = '12345' ";
    ```
* Query này tìm kiếm tất cả các bản ghi có tên là `1='1` và mật khẩu là 12345 (ví dụ ở đây là CSDL được lưu password ở dạng rõ, chưa băm hay mã hóa). Vì kiểm tra password sử dụng toán tử `AND`, truy vấn này của chúng tôi đã lấy được dữ liệu trả về với name và mật khẩu là 12345. Nhưng bây giờ chúng ta có 1 kiểu tấn công khác, bằng cách thêm `;--`, kiểm tra `'OR 1='1;--`. Kiểu Injection này thực hiện được 2 điều: dấu chấm phẩy `;` kết thúc câu lệnh SQL và dấu `--` cho phép comment lại tất cả câu lệnh ở phía sau nó. Có nghĩa là:
     ```sql
    $query = "SELECT * FROM users WHERE name = 'test' OR 1='1' AND pw = '12345' ";
    ```
    Sau khi chỉnh sửa một chút thì sẽ thành 
     ```sql
    $query = "SELECT * FROM users WHERE name = 'test' OR 1='1';-- AND pw = '12345' ";
    ```
    Vậy câu lệnh SQL mà `$q` gửi lên được thực thi sẽ chỉ còn 
     ```sql
    $query = "SELECT * FROM users WHERE name = 'test' OR 1='1';
    ```
    Câu lệnh này sẽ giúp ta lấy được tất cả bản ghi của bảng users. 
## Examples
### 1. Drupal SQL Injection
* Drupal là một hệ thống quản lý nội dung phổ biến được sử dụng để xây dựng trang web, rất giống với Wordpress và Joomla. Nó được viết bằng PHP và dựa trên mô-đun. Cộng đồng Drupal khá mạnh và cung cấp miễn phí. Bao gồm thương mại điện tử, tích hợp bên thứ ba, sản xuất nội dung,... Tuy nhiên, mọi cài đặt Drupal đều chứa ucnfg một bộ mô-đu lõi được sử dụng để chạy nền tảng và yêu cầu kết nối với CSDL. Chúng còn được gọi là lõi Drupal. Vào năm 2014, nhóm Drupal Security đã phát hành bản cập nhật lõi Drupal cho thấy tất cả các trang chạy Drupal đều bị tấn công SQL bởi người dùng ẩn danh. Tác động của lỗ hổng cho phép kẻ tấn công chiếm được bất kỳ trang web Drupal nào. Cụ thể hơn, Drupal đã sử dụng Đối tượng dữ liệu PHP (PDO) làm giao diện để truy cập cơ sở dữ liệu. Các nhà phát triển lõi Drupal đã viết mã gọi các hàm PDO đó và mã Drupal sẽ được sử dụng bất cứ khi nào các nhà phát triển khác viết mã để tương tác với cơ sở dữ liệu Drupal. Đây là một thực tiễn phổ biến trong phát triển phần mềm. Lý do cho điều này là để cho phép Drupal được sử dụng với các loại cơ sở dữ liệu khác nhau (MySQL, Postgres, v.v.), loại bỏ sự phức tạp và cung cấp tiêu chuẩn hóa. Bây giờ, điều đó nói rằng, hóa ra, Stefan đã phát hiện ra rằng mã trình bao bọc Drupal đưa ra một giả định không chính xác về dữ liệu mảng được chuyển đến một truy vấn SQL. Đây là mã gốc:
    ```php
    foreach ($data as $i => $value) {
    [...]
    $new_keys[$key . '_' . $i] = $value;
    }
    ```
* Bạn có thể phát hiện ra lỗi không (tôi sẽ có thể)? Các nhà phát triển đã đưa ra giả định rằng dữ liệu mảng sẽ luôn chứa các khóa số, như 0, 1, 2, v.v. (giá trị `$i`) và do đó họ đã tham gia biến `$key` thành `$i` và làm cho giá trị đó bằng với giá trị. Đây là một truy vấn thông thường sẽ trông như thế nào từ hàm db_query của Drupal:
    ```sql
    db_query("SELECT * FROM {users} WHERE name IN (:name)", array(':name'=>array('user1'\,'user2')));
    ```
* Ở đây hàm db_query lấy một truy vấn CSDL `SELECT * FROM {users} where name IN (:name)`và một mảng các giá trị để thay thế cho các phần giữ chỗ trong truy vấn. Trong PHP, khi bạn khai báo một mảng là mảng ('value', 'value2', 'value3'), nó thực sự tạo ra [0⇒ 'value', 1 ⇒ 'value2', 2 ⇒ 'value3'] trong đó mỗi giá trị có thể truy cập bằng khóa số. Trong trường hợp này, biến tên: đã được thay thế bằng các giá trị trong mảng [0 ⇒ 'user1', 1⇒ 'user2']. Những gì bạn sẽ nhận được từ điều này là:
    ```sql
    SELECT * FROM userccs WHERE name IN (:name_0, :name_1)
    ```
* Vấn đề phát sinh tiếp sẽ như sau:
    ```sql
    db_query("SELECT * FROM {users} where name IN (:name)", 
        array(':name'=>array('test) -- ' => 'user1','test' => 'user2')));
    ```
* Trong trường hợp này , `:name` là một mảng và các khóa của nó là `‘test) -','test'`. Khi Drupal nhận được điều này và xử lý mảng để tạo truy vấn, điều cần làm là:    
    ```sql
    SELECT * FROM users WHERE name IN (:name_test) -- , :name_test)
    ```
* Có thể rất khó để thấy được lý do tại sao lại như vậy, hãy thử. Dựa trên foreach, Drupal sẽ lần lượt đi qua từng phần tử trong mảng. Vì vậy, đối với tiêu chí `$i = test)-` và `$value = user1`. Bây giờ, `$key` là `(:name)` từ truy vấn và kết hợp với `$i`, chúng ta nhận được `name_test)--`. Bây giờ, với tất cả những gì đã có. Drupal đang đóng gói các đối tượng PDO của PHP đi lượn lờ =)), vì PDO cho phép nhiều query. Vì vậy, kẻ tấn công có thể vượt qua được mã độc, như truy vấn SQL thực tế để tạo người dùng quản trị cho khóa mảng, được giải thích và thực thi dưới dạng nhiều truy vấn. 
### 2. Yahoo Sports Blind SQL
* Theo blog của mình, Stefano đã tìm thấy lỗ hổng SQLi nhờ tham số năm trong `http://sports.yahoo.com/nfl/draft?year=2010&type=20&round=2`. Từ bài đăng của anh ấy, đây là một ví dụ về phản hồi hợp lệ cho Url:
![](https://images.viblo.asia/4b7d56c0-3b17-490e-8bcb-1b947426c5ce.png)
* Nào, bây giờ chúng ta thêm `--` vào sau `year=2010` ta được gì.
![](https://images.viblo.asia/54386b5c-a7cc-4288-9d30-0823dbd58012.png)
* Lý do cho điều này là, `--` đóng vai trò là comment trong truy vấn, như tôi đã nêu chi tiết ở trên. Vì vậy, nơi truy vấn ban đầu của Yahoo có thể trông giống như:
    ```sql
    SELECT * FROM PLAYERS WHERE YEAR = 2010 AND TYPE = 20 AND ROUND = 2;
    ```
* Sau khi thêm `--` thì câu truy vấn sẽ trở thành
    ```sql
    SELECT * FROM PLAYERS WHERE YEAR = 2010;
    ```
* Nhận ra điều này, chúng ta có thể bắt đầu lấy thông tin CSDL từ Yahoo. Ví dụ: Stefano có thể kiểm tra số phiên bản chính của phần mềm CSDL bằng cách sau:
![](https://images.viblo.asia/0894ac3b-14e9-4def-8608-b415e503e4ef.png)
* Sử dụng hàm `IF`, chúng ta sẽ được trả về nếu ký tự đầu tiên từ hàm version() là 5. Hàm `IF` có một điều kiện là sẽ trả về giá trị sau nó nếu điều kiện là đúng và tham số cuối cùng nếu nó sai. Vì vậy, dựa theo hình trên, điều kiện là ký tự đầu tiên trong phiên bản. Do đó, chúng tôi biết phiên bản CSDL không phải là 5 vì không có kết quả nào được trả về. Lý do đây là được coi là một SQLi mù quáng là bởi vì Stefano có thể nhìn thấy kết quả trực tiếp, anh ấy có thể chỉ cần in ra phiên bản CSDL vì Yahoo chỉ trả lại người dùng. Tuy nhiên, bằng cách thao tác truy vấn và so sánh kết quả với kết quả đầu tiên, anh ta đã có thể tiếp tục trích xuất thông tin từ CSDL của Yahoo.
### 3. Uber Blind SQLi
* Ngoài các trang web, việc SQL Injection có thể đạt được thông qua các chỗ khác như liên kết email. Vào tháng 7 năm 2016, Orange Tsai đã nhận được một quảng cáo email từ Uber. Anh ấy nhận thấy rằng liên kết hủy đăng ký bao gồm một chuỗi được mã hóa base64 làm tham số URL. Liên kết trông giống như:
    ```url
    http://sctrack.email.uber.com.cn/track/unsubscribe.do?p=eyJ1c2VyX2lkIjogIjU3NTUiLCAi\
    cmVjZWl2ZXIiOiAib3JhbmdlQG15bWFpbCJ9
    ```
* Decode đoạn `eyJ1c2VyX2lkIjogIjU3NTUiLCAi`, sử dụng base64 trả về chuỗi JSON`{"user_id": "5755", "receiver": "orange@mymail"}`. Sau khi có chuỗi giải mã, anh ta thêm `and sleep(12)=1` vào tham số URL được mã hóa, đây là một phép injection vô hại được thiết kế để làm cho CSDL mất nhiều thời gian hơn để đáp ứng với hành động hủy đăng ký `{"user_id": "5755 and sleep(12)=1", "receiver": "orange@mymail"}`. Nếu một trang web dễ bị vulnerrable, việc thực hiện truy vấn sẽ đánh giá sleep(12) và không thực hiện hành động nào trong 12 giây trước khi so sánh dầu ra của lệnh sleep với 1. Trong MySQL, lệnh sleep thường trả về 0, do đó việc so sánh này sẽ thất bại, nhưng điều này không quan trọng vì việc thực thi sẽ mất ít nhất 12 giây. 
* Sau khi Orange mã hóa lại payload đã sửa đổi và chuyển payload đó sang tham số URL, anh ta đã truy cập liên kết hủy đăng ký để xác nhận phản hồi HTTP mất ít nhất 12 giây. Tuy nhiên Orangeddax quyết định rằng anh ta cần thêm bằng chứng cụ thể về SQLi để gửi cho Uber, vì vậy anh ta đã quyết định kết xuất username, hostname, và name of the database bằng cách sử dụng brute force vì nó thể hiện khả năng trích xuất thông tin từ SQLi mà không cần truy cập dữ liệu bí mật.
* SQL có một hàm called user trả về username và tên máy chủ của CSDL ở dạng `<user>@<host>`. Bởi vì Orange không thể truy cập đầu ra từ các truy vấn được injecion của mình, anh ta không thể gọi cho người dùng. Thay vào đó, Oarange đã sửa đổi truy vấn của mình để thêm kiểm tra có điều kiện khi truy vấn tra cứu ID người dùng của anh ta. So sánh một ký tự của tên người dùng CSDL và chuỗi tên máy chủ tại một thời điểm bằng cách sử dụng hàm `mid`. Tương tự như SQLi của Yahoo Sports từ báo cáo lỗi trước đó. Orange đã sử dụng một câu lệnh so sánh để lấy từng ký tự của tên người dùng và chuỗi tên máy chủ. Ví dụ: để tìm tên người dùng và tên máy chủ bằng cách sử dụng câu lệnh so sánh và sức mạnh của brute force, Orange đã lấy ký tự đầu tiên của giá trị được trả về từ người dùng bằng cách sử dụng hàm `mid` và đem so sánh xem ký tự đó có bằng `'a'` không, sau đó đến `'b'` rồi `'c'`,.. Nếu câu lệnh so sánh là đúng, máy chủ sẽ thực thi lệnh hủy đăng ký cho biết rằng ký tự đàu tiên của giá trị trả về của hàm user bằng với ký tự mà nó được so sánh. Mặt khác, nếu sai thì máy chủ sẽ không hủy đăng ký của anh ta. Bằng cách kiểm tra từng ký tự của hàm user. Giá trị trả về bằng phương thức này, Orange cuối cùng sẽ có thể lấy được toàn bộ tên người dùng và tên máy chủ. 
    ```python
    mport json
    import string
    import requests
    from urllib import quote
    from base64 import b64encode
        base = string.digits + string.letters + '_-@.'
        payload = {"user_id": 5755, "receiver": "blog.orange.tw"}
        for l in range(0, 30):
            for i in base:
            payload['user_id'] = "5755 and mid(user(),%d,1)='%c'#"%(l+1, i)
                new_payload = json.dumps(payload)
                new_payload = b64encode(new_payload)
                r = requests.get('http://sctrack.email.uber.com.cn/track/unsubscribe.do?p='+\
                quote(new_payload))
                if len(r.content)>0:
                print i,
                break
    ```
* Đây là một đoạn code viết bằng python giúp Orange lấy được tên người dùng và tên máy chủ.
## Summary
* SQLi có thể là một lỗ hổng nguy hiểm cho một trang web. Nếu kẻ tấn công tìm thấy SQLi, chúng có thể có được full quyền cho một trang web. Trong một số trường hợp, SQLi có thể được leo thang bằng cách chèn dữ liệu vào CSDL cho phép quyền quản trị tren trang web, như trong ví dụ về Drupal. Khi tìm kiếm các lỗ hổng SQLi, hãy chú ý đến những nơi mà bạn có thể chuyển các giấu ngoặc đơn hoặc dấu ngược kép không được giải mã cho một truy vấn. Khi bạn tìm thấy một lỗ hổng, các dấu hiệu cho thấy lỗ hổng đó tồn tại có thể là một hint, chẳng hạn như blind injection. Bạn cũng nên tìm những nơi mà bạn có thể truyền dữ liệu đến một trang web theo những cách không mong muốn, chẳng hạn như những nơi bạn có thể thay thế các tham số mảng trong dữ liệu yêu cầu như trong lỗi của Uber.