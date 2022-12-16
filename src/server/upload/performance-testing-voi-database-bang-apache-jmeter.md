Tiếp tục chủ đề về Apache Jmeter ở [bài trước](https://viblo.asia/p/load-testing-voi-jmeter-QpmleqDklrd), bài này xin phép giới thiệu với mọi người về testing Database với Apache Jmeter. 

# Performance testing với Database

Performance testing cơ sở dữ liệu được sử dụng để xác định các vấn đề hiệu năng trước khi release các ứng dụng dùng cơ sở dữ liệu cho end-user. Nó kiểm tra các ứng dụng cơ sở dữ liệu về hiệu suất, độ tin cậy và khả năng mở rộng bằng cách sử dụng các người dùng khác nhau ở cùng một thời điểm, liên quan đến việc mô phỏng load users thực tế cho các ứng dụng cơ sở dữ liệu đích và được sử dụng để xác định hành vi của các ứng dụng cơ sở dữ liệu khi nhiều người dùng truy cập các ứng dụng cùng một lúc.
![](https://images.viblo.asia/9de91f00-5d50-4d2b-af3e-1408a0c397ed.jpg)

***Vậy vì sao phải thực hiển Performance testing Database?***

Do khi thực hiện query để lấy dữ liệu có thể sẽ phải lấy dữ liệu từ nhiều bảng khác nhau (điều kiện join) với nhiều điều kiện lọc giới hạn phạm vi dữ liệu sẽ được trích xuất ra (điều kiện where) nên hay xảy ra vấn đề là tốc độ trả về kết quả hiển thị trên màn hình mất nhiều thời gian, hoặc không hiển thị được kết quả trên màn hình do timeout. Và cũng có trường hợp nhiều users thực hiện việc search dữ liệu trên cùng một trang ở tại cùng một thời điểm thì cũng có thể ảnh hưởng đến tốc độ load results hoặc là bị time out.

==> Vì vậy cần phải thực hiện kiểm tra performance, so sánh tốc độ xử lý thực tế với tốc độ kỳ vọng chênh lệch như thế nào để có hướng cải thiện tốc độ.

# Performance testing với Database bằng Jmeter
Jmeter hỗ trợ test trên nhiều hệ cơ sở dữ liệu khác nhau và bài này sẽ hướng dẫn thực hiện test trên hệ cơ sở dữ liệu MySQL. 
### Cấu hình Jmeter để connect tới MySQL

Để kết nối tới MySQL nên thì phải add thư viện mysql jdbc vào folder lib của Apache JMeter:
![](https://images.viblo.asia/741ee15d-0fd9-47a1-a480-3218560d0714.png)

Để download được thư viện của Mysql bạn có thể sử dụng [link này](http://central.maven.org/maven2/mysql/mysql-connector-java/5.1.45/mysql-connector-java-5.1.45.jar)

### Tạo Test Plan
Test plan sẽ diễn tả các step được thực thi bằng JMeter chạy trên DB và nó sẽ bao gồm các phần sau: 
* Thread group.
* JDBC request.
* Summary report.

Tạo test plan testing DB cũng giống như test plan testing UI với các bước như sau:
* Ở cửa sổ bên trái, click chuột phải vào ***Test Plan*** 
* Chọn ***Add*** > ***Threads (Users)*** > ***Thread Group***
![](https://images.viblo.asia/fb53bd47-f091-4e5d-8b1a-c98da042af1c.png)

* Ở đây sẽ setting lượng user truy cập mà chúng ta muốn test, ví dụ như tôi đang kiểm tra trường hợp 1000 user thực hiện việc truy vấn data trong cùng 1 lúc và xác định có bao nhiêu request sẽ được trả về trong vòng 100 giây:
    *   *No. of Threads (users)*: 1000
    *   *Ramp-Up Period* (in seconds): 100
    *    *Loop Count*: 1
            ![](https://images.viblo.asia/aada7f39-bf2c-414f-9348-bed8a2b4a44b.png)

### Tạo cấu hình kết nối tới MySQL
Để tạo một JDBC request thì trước tiên phải tạo configuaration:
* Ở cửa sổ bên trái, click chuột phải vào ***Thread Group.*** 
* Chọn ***Add*** > ***Config Element*** > ***JDBC Connection Configuration.***
            ![](https://images.viblo.asia/fa4dd7a3-1619-4342-90bb-17acf2dde3bb.png)
            
* Setting thông tin connection database gồm các thông tin như sau
    * Variable Name: field này là trường bắt buộc và tên của nó phải là duy nhất. Và giá trị của field này được sử dụng để kết nối cấu hình  ở file JDBC Connection Configuration và file JDBC Request.
    * Database URL:  Ở đây tôi sử dụng Jmeter để test hệ cơ sở dữ liệu MySQL do đó sử dụng URL:  jdbc:mysql://localhost:3306/demojmeter
        -  **jdbc:mysql://** - Đôi với hệ có sở dữ liệu MySQL thì sẽ luôn dùng ở dạng này
        -  **localhost:3306** - Là địa chỉ IP và port để kết nối với database. Nếu chúng ta dùng DB được cài đặt ở PC của mình thì sẽ sử dụng địa chỉ IP và port đã config trong khi cài đặt MySQL và nếu dùng DB từ một server remote thì bạn sẽ dùng địa chỉ IP và port của server đó ví dụ như 10.56.56.2:4101
        -  **demojmeter** - Là tên của một scheme của DB mà bạn muốn test và ở ví dụ này là demojmeter
    * JDBC driver class: Là class được dùng làm việc với một loại hệ cơ sở dữ liệu nhất định, ở đây tôi dùng hệ cơ sở dự liệu là MySQL thì sẽ sử dụng class: **com.mysql.jdbc.Driver**
    * Username/Password: là username và password đã được tạo để truy cập vào DB ở MySQL

![](https://images.viblo.asia/e401e503-0260-4f36-a807-50c1775f6b5f.png)

* Tạo một **JDBC Request** trong **Thread Group**, request sẽ cho phép gửi tới DB
![](https://images.viblo.asia/b5e2242e-86a1-4420-8ca6-8af71f5904b2.png)

* Cấu hình **JDBC Request** như sau:
    * Variable Name - là name đã tạo ở file **JDBC Connection Configuration.**
    * **Query Type:** - là câu lệnh SQL mà bạn muốn gửi request đến DB để kiểm trả hiệu suất làm việc của DB, ví dụ ở đây tôi muốn check trường hợp là 1000 user cùng vào trang và load cùng 1 loại data do đó tôi sẽ dùng Query type là **Select Statement** và nhập câu lệnh SQL truy vấn tới bảng mà hệ thống sẽ kết nối và lấy dữ liệu trả về

![](https://images.viblo.asia/074a3a0b-5130-4ef2-aafc-a81e0f3e8836.png)

### Add listener để hiển thị result test
Add thêm listener để chúng ta có thể thấy rõ hơn các thông số cụ thế về tốc độ respon của DB mà chúng ta đang muốn test sau khi execute các request

**Tree View**
![](https://images.viblo.asia/ded7a8c5-0b98-4d59-80b8-c38b73df610d.png)
Đây là kết quả chạy của 100 request lên DB. Nó thể hiện rõ tất cả các thông tin cho từng request:
- Sample Start: Thời gian bắt đầu thực hiện request tới DB
- Load time: thời gian gửi request
- Connect Time: thời gian gửi kết nối tới DB
- Latency: là độ trễ khi gửi request, nếu độ trễ càng thấp thì có nghĩa là tốc độ reuqest gửi đi và response nhận về càng cao.

Và nếu thử với trường hợp là 200request/10s thì kết quả của các response sẽ như sau:
![](https://images.viblo.asia/b76d0009-a1ee-4adf-8c5e-d9171972bc18.png)

Vì lượng truy cập quá nhiều trong 1 trời gian ngắn nên vẫn có request gửi đi bị fail và View Results Tree vẫn hiển thị thông tin đây đủ của các request fail.

**Table View**
Result được hiển thị ở dạng table
![](https://images.viblo.asia/8503ec2d-0395-4f86-9619-cf73a5a10c28.png)
- Deviation: Nếu giá trị của Deviation càng thấp thì nó sẽ hiện tính nhất quán dữ liệu trong DB của mình càng cao. Và Deviation pải <= Average, nếu Deviation > Average thì dữ liệu đó không hợp lệ.
- Average: là tổng thời gian trung bình trả về response cho mỗi request.

**Summary Report**
Summary Report sẽ thống kê lại số liệu cụ thể từ Tree View, nó thông kê cụ thể là với bao nhiêu request thì tỉ lệ request được response thành công là bao nhiêu.
![](https://images.viblo.asia/03624ab6-2325-4118-9f29-c5c24829820f.png)
Ở trên là trường hợp chạy 100 request thì số % bị Error là 0% có nghĩa là DB vẫn có thể reponse tất cả 100 request trong vòng 10s và tính được số Throughput trung bình cho các request

Và với trường hợp là 200request/10s thì kết quả là sẽ bị lỗi hết 25% 
![](https://images.viblo.asia/e7585a4e-3b41-4b7b-a3b9-57937b0cbfbc.png)

Dựa vào các thông số trên chúng ta có thể biết số lượng request mà DB có thể đáp ứng được một cách cụ thể và chính xác nhờ Apache Jmeter để có thể cái thiện được tốc độ trả response của DB khi thực hiện Search hay khi di chuyển tới trang mà có nhiều dữ liệu cần load.

***Refer: ***
https://dzone.com/articles/database-performance-testing-with-apache-jmeter
https://stackjava.com/apache-jmeter/load-testing-database-voi-apache-jmeter.html