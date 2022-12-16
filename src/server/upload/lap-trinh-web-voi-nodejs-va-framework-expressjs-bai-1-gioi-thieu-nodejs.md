Là một lập trình viên chắc hẳn các bạn đã từng nghe qua thuật ngữ web aplication cũng như các cách để phát triển một ứng dụng web với Java, PHP, Ruby...v v.
Hôm nay mình xin được chia sẻ với các bạn một series lập trình web với NodeJs và Express framework.
Series này tham khảo từ cuốn **Node Web Development**, 2nd Edition được viết bởi **David Herron**.

## Giới thiệu NodeJs.
**1. NodeJs là gì?**

Node là một nền tảng phát triển các ứng dụng web back-end được viết bằng JavaScript, tức là Node không được viết để chạy trên trình duyệt, nếu bạn đã từng học JavaScript thông thường thì bạn sẽ thấy Node chạy khác với những gì bạn đã học, bạn sẽ không thấy những thứ như document.getElementById()... mặc dù thực tế vẫn có một số thư viện hỗ trợ Node viết cho trình duyệt, tuy nhiên chúng ta sẽ không quan tâm đến chúng trong series này.

Ngoài việc chạy trên JavaScript thì Node có những tính năng đi kèm sau:

* Có trình CLI (giao diện dòng lệnh)
* Chạy theo mô hình REPL
* Có các hàm quản lý tiến trình
* Có các đối tượng hỗ trợ làm việc với dữ liệu nhị phân
* Hỗ trợ TCP và UDP
* Hỗ trợ hân giải DNS
* Hỗ trợ HTTP và HTTPS
* Có thể truy cập file và thư mục 

Sau đây là sơ đồ về các thành phần quan trọng trong NodeJS:

![](https://images.viblo.asia/bb64ba41-7f96-4b5f-a4f3-bb0cea5caae4.jpg)

Node cho phép bạn thực hiện các giao thức mạng ở cấp độ thấp một cách dễ dàng. Chẳng hạn như Node có module HTTP cho phép xây dựng một webserver chỉ với vài dòng code, tuy nhiên vì thế mà bạn sẽ phải học nhiều thứ hơn như học về các header của một gói tin HTTP, không như PHP vốn chỉ là một module mở rộng của một webserver có sẵn (như Apache hay NginX…) – tức là PHP dễ dùng hơn Node nhưng lại không cho phép coder thực hiện các công việc ở cấp độ thấp. Tuy nhiên vì NodeJS là một framework mã nguồn mở, do đó trên mạng cũng có một số thư viện hỗ trợ viết webserver nhanh hơn và dễ hơn cho coder.

**2. Kiến trúc của Node.**

Node sử dụng kiển trúc lập trình hướng sự kiện không đồng bộ, và đây là một tính năng làm cho các ứng dụng Node có thể chạy với hiệu suất cao. Chẳng hạn như đối với các ứng dụng bình thường như một chương trình viết bằng C++ thì khi chúng ta viết chương trình để đọc dữ liệu, chương trình sẽ phải dừng lại ở đoạn code đọc dữ liệu để chờ cho đến khi có dữ liệu để đọc, nếu muốn chương trình tiếp tục vừa chạy các công việc khác vừa đọc dữ liệu thì phải dùng đến đa luồng (multi-threading), tuy nhiên việc dùng đa luồng rất phức tạp và có thể làm chậm server.

Node chỉ sử dụng một luồng duy nhất, các câu lệnh nhập xuất không cần phải chờ bằng cách sử dụng Event Loop, cứ mỗi lần có sự kiện xảy ra thì chuyển dữ liệu của sự kiện đó đến các hàm xử lý tương ứng, và trong khi các hàm xử lý đang chạy thì vòng lặp sự kiện vẫn tiếp tục nhận sự kiện và chuyển đến các hàm xử lý tương ứng khác.

Ví dụ giả sử chúng ta có dòng code lấy dữ liệu từ cơ sở dữ liệu như sau:
```
result = query('SELECT * from db');
// xử lý result
```
Đối với các chương trình bình thường thì khi chạy đến dòng code trên, luồng chạy chương trình đó sẽ phải dừng lại để đợi quá trình xử lý từ cơ sở dữ liệu thực hiện xong và trả về rồi mới tiếp tục được, trong quá trình đợi đó sẽ có nhiều yêu cầu khác xảy ra và hiệu suất phần mềm sẽ giảm do lãng phí tài nguyên, để giải quyết tình trạng đó thì chúng ta có thể dùng cơ chế đa luồng để xử lý, tuy nhiên đa luồng có một nhược điểm làm tiêu tốn nhiều bộ nhớ và CPU.

Thay vì dùng đa luồng thì Node sử dụng cơ chế Event Loop để giải quyết việc này, nói một cách đơn giản thì Node sẽ đưa các câu lệnh chờ trên vào một luồng khác là Event Loop để xử lý riêng, trong khi luồng chính vẫn sẽ chạy các công việc của riêng nó, và khi nào luồng chính “rảnh” rồi thì luồng Event Loop sẽ chuyển các công việc đã thực hiện xong trở về lại luồng chính. Và chính vì Node chỉ sử dụng 2 luồng nên tài nguyên hệ thống sẽ không bị chiếm nhiều như khi dùng cơ chế đa luồng, ngoài ra việc code sử dụng Event Loop đơn giản hơn nhiều, ví dụ:
```
query('SELECT * from db', function(err, result) {
    if (err) throw err;
    // xử lý result
});
```
Trong đoạn code trên, kết quả trả về từ hàm query() thay vì được gán vào một biến thì sẽ được truyền vào một hàm khác là function(err, result){...}, và hàm này sẽ được chuyển vào luồng Event Loop và chờ cho đến khi luồng chính “rảnh” thì mới được chuyển qua.

**3. NodeJs làm việc như thế nào.**

Ý tưởng chính của NodeJs là sử dụng môt hình non-blocking, event-driven để tạo ra các ứng dụng web thời gian thực nhẹ tải, hiệu suất cao đồng thời có thể chạy trên rất nhiều thiết bị khác nhau. Tuy nhiên NodeJs không phải là một cái gì đó đánh đổ toàn bộ nền tảng web từ trước đến giờ mà nó chỉ là một giải pháp phù hợp với một nhu cầu nhất định. Nếu bạn dùng NodeJs cho các ứng dụng yêu cầu tính toán cao thì thực tế là bạn đã từ bỏ tất cả nhứng gì tinh túy nhất của NodeJs rồi. NodeJs chỉ thực sự mạnh ở các ứng dụng cần tốc độ, khả năng mở rộng vì điểm mạnh của nó là khả năng xử lí một lượng rất lớn các connection với throughput cao, đồng nghĩa với khả năng mở rộng (scalability) là rất lớn.

Các nền tảng web-server cũ (apache,nginx…) sẽ sinh ra một thread mới khi có request và cấp bộ nhớ cho thread đó đến khi nào hết RAM thì thôi, nghĩa là max-connection sẽ phụ thuộc khá nhiều vào RAM. NodeJs thì ngược lại, dùng một thread duy nhất cùng với các câu lệnh I/O non-blocking cho phép nó phục vụ hàng chục ngàn connection cùng một lúc.

![](https://images.viblo.asia/b6b97872-327d-4d18-a45f-98bfd7c10250.png)

Giả sử mỗi request được cấp 2MB với một cục RAM 8GB ta chỉ có thể phục vụ 4000 connection một lúc . Đó là còn chưa tính bộ nhớ cho các process khác hay phục vụ cho việc chuyển đổi của đống thread đó. Tuy nhiên cũng với ngần ấy tài nguyên Nodejs có thể đảm đương một lúc cả triệu connection.

Sẽ có người đặt câu hỏi rằng việc cả triệu connection mà chỉ dùng một thread sẽ có thể gây ra nhiều bug. Đơn giản nhất là nếu request đòi hỏi tính toán nhiều thì cái thread duy nhất đó có thể bị treo dẫn đến toàn bộ một triệu request phải ngồi chờ cho cái request đầu tiên tính xong. Thứ nữa là nếu chẳng may có exception thì cái thread đó sẽ kéo theo cả triệu request chết cùng. Cách giải quyết của Nodejs là trả cái exception đó về cho nơi gọi thông qua callback thay vì throw nó như các nền tảng khác. Mà nếu có một vài exception vẫn cố tình xảy ra thì NodeJs vẫn có cơ chế để khôi phục hoạt động như là Forever module , cái này có thể sẽ được nói đến trong một bài viết khác.

**4. Ứng dụng của NodeJs.**

NodeJs có một đặc tính rất quan trọng đó là Realtime, vậy lên nó rất thích hợp để phát triển các ứng dụng yêu cầu real time. Ngoài ra nó cũng có thể được sử dụng trong việc thiết kế API...

**ỨNG DỤNG CHAT:**
Vì chat là một ứng dụng real-time với nhiều người dùng điển hình nhất, chat cần tốc độ làm giảm độ trễ, băng thông lớn cho nhiều người dùng, it các thao tác tính toán đơn thuần là truyền dữ liệu.

**SERVER API:**
Mặc dù Nodejs mạnh nhất khi viết các ứng dụng real-time tuy nhiên nó cũng rất khá khi viết các API thao tác với các database kiểu object như MongoDB. Dữ liệu kiểu JSON cho phép Nodejs thao tác một cách tự nhiên mà không cần convert.

**HÀNG ĐỢI:**
Nếu ứng dụng của bạn phải nhận cùng lúc một lượng data rất lớn thì rất dễ làm database bị nghẽn cổ chai . Mặc dù Nodejs có thể xử lí concurrent connection rất tốt nhưng bản chất của database vẫn là blocking cho nên vẫn có thể gặp rắc rối. Giải pháp đưa ra là tống hết vào hàng đợi.

**DATA STREAMING:**
Trong các nền tảng cũ thì HTTP Request được xử lí như các event độc lập nhưng thực thế nó lại là các stream dữ liệu. Điều này có thể tạo ra các ứng dụng đặc biệt như xử lí file trong khi nó còn đăng upload.

**PROXY:**
Với khả năng xử lí nhiều request một lúc, Nodejs tỏ ra rất thích hợp làm proxy, đặc biệt là với các dịch vụ có thời gian response khác nhau hay thu thập dữ liệu từ nhiều nguồn khác nhau.

> Trên đây là bài đầu tiên trong series hướng dẫn lập trình web với NodeJs của minh. Mong rằng bài viết sẽ giúp ích được các bạn trong việc làm quen với NodeJs.
> Các bài viết khác các bạn có thể theo dõi [tại đây.](https://viblo.asia/s/series-hoc-lap-trinh-web-voi-nodejs-va-framework-expressjs-68Z00JGQZkG)