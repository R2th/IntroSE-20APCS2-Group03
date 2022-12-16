* Đi đôi với mức độ sử dụng SmartTV trên thị trường hiện nay, nhu cầu về các ứng dụng Smart TV cũng tăng lên tương ứng. 
* Để có thể đem đến các ứng dụng trên nền tảng Smart TV với chất lượng tốt nhất và có khả năng sử dụng cao, chúng ta cần phải chú ý một số quy tắc cũng như lưu ý dành riêng cho nền tảng này.
<br/><br/><br/>
![](https://images.viblo.asia/9e177926-8e6f-41c7-a6e3-5d5bd36f6e20.jpg)

# I. Chuẩn bị:  
>  ***Một sự chuẩn bị tốt sẽ là chìa khóa quan trọng***

* **Thiết bị:** Đầu tiên và quan trọng nhất, bạn cần xác định danh sách các thiết bị sẽ được sử dụng để kiểm thử.
* **Cấu hình thiết bị:** Có rất nhiều cài đặt cấu hình cần phải xử lý trước khi quá trình kiểm thử bắt đầu, vì vậy đừng ngại lên google tìm hiểu để biết hướng dẫn để có thể thiết lập thiết bị của bạn đủ sẵn sàng cho quá trình kiểm thử xuông sẻ. 
* **Phương thức cài đặt build:**
Bạn sẽ không thể tải xuống ứng dụng của bạn từ Store để kiểm thử trong giai đoạn phát triển, vì vậy bạn cần thực hiện các thao tác phức tạp hơn một chút để thực hiện kiểm thử ứng dụng SmartTV.
    * Ví dụ: Để kiểm tra ứng dụng trên AppleTV, bạn cần thực hiện các bước sau để định cấu hình trước khi cài đặt ứng dụng:
        * Apple Configurator: 
            * Bước 1: Tạo profile ( Thêm thông tin chung (tên) ; HTTP Proxy (IP and Port) ;  Chứng chỉ Charles ở định dạng chứng nhận)
            * Bước 2: Select device > Click Prepare > Select Supervise Devices > Next > Do not enroll in MDM > Next > Next > Prepare > Erase
            * Bước 3: Thêm profile ở bước 1 vào Apple Configurator
        * AppleTV: 
Open General >  About >  Certificate Trust Settings > Certificate should be trusted
        * Charles:
            * Mở Charles  >  Help  >  SSL Proxying > Install Charles Root Certificate
            * Mở My Certificates trong mục Categories (for Login). Mở All Certificates và chọn "Trusted".
            * Mở Certificates trong mục Categories (for Login). Mở All Certificates và chọn "Trusted".
            * Mở All Items trong mục Categories (for System Root). Mở All Apple, Developer, và chọn "Trusted" cho Geo Certificates.
        * Sau đó bạn cần thêm AppleID của mình vào iTune của AppleTV để sử dụng TestFlight và cài đặt TestFlight để tải ứng dụng về TV, nếu bạn chưa biết thì TestFlight giống như App Store cho các ứng dụng đang trong quá trình phát triển.
 * **Ngoài ra**, bạn có thể sử dụng: Charles để theo dõi lưu lượng (ứng dụng vào stress test, load test), Xcode để chụp ảnh màn hình và ghi nhận log, QuickTime để quay video và Apple Configurator cũng có thể lấy log và xác cấu hình Apple TV với Mac.

# II. Quan điểm test
Trước khi bắt đầu kiểm tra ứng dụng SmartTV, cũng như bao nền tảng khác chúng ta cần chuẩn bị thật tốt 1 bộ test case có độ bao phủ cao. Trong đó những quan điểm cơ bản mà chúng ta cần đảm bảo đó là:

 **Tính năng chính của ứng dụng:** Dù trên nền tảng nào thì đây cũng là phần quan trọng nhất của một ứng dụng đúng không nào? Trước hết, hãy đảm bảo rằng:
   
   * Ứng dụng của bạn work được trên thiết bị yêu cầu.
    * Các tính năng hoạt động đúng với requirement.

Bên cạnh đó đối với 1 nền tảng khác biệt như TV, chúng ta sẽ còn cần quan tâm đến các quan điểm khác như:

**1. Network:** 

* Kiểm tra cách ứng dụng hoạt động trong các tình huống mạng khác nhau. 
* Ứng dụng phải ổn định và không phụ thuộc vào loại hình kết nối mạng. 
* Tester phải chắc chắn rằng ứng dụng hoạt động ổn định/ phù hợp trong các điều kiện sau:
    * Khi được kết nối qua mạng LAN / WiFi / mạng di động
     * Khi kết nối chậm
     * Khi không có mạng - trong trường hợp này, người dùng có thể nhận biết tình trạng message thông báo lỗi kết nối và ứng dụng sẽ có thể tiếp tục sau khi thiết lập lại kết nối.


**2. Tương tác với các tính năng built-in có sẵn trên TV:**
   * Bảng điều khiển của SmartTV có sẵn rất nhiều tính năng tích hợp như dịch vụ streaming video, universal search, music streaming... 
    * Hãy đảm bảo rằng ứng dụng của bạn hoạt động chính xác một các song song với các tính năng đó.

**3. Các App Store dành cho ứng dụng TV có những nguyên tắc riêng. Hãy đảm bảo tuân theo các nguyên tắc đó.** Điều đó sẽ giúp ích rất nhiều cho quá trình upload ứng dụng của bạn lên store được suôn sẻ hơn.
<br/>
    
   * *Ví dụ:* Các button trong ứng dụng phải có màu sắc và vị trí tương ứng với nguyên tắc của Store và người dùng có thể dễ dàng sử dụng điều khiển từ xa để truy cập chức năng của ứng dụng.
    
**4. Các tính năng được tích hợp sẵn:** Ứng dụng của bạn có thể được tìm thấy trên bảng điều khiển của bạn thông qua thanh tìm kiếm và hiển thị chính xác trong phần Recent Apps.

# III. Sai lầm khi kiểm thử SmartTV
Khi thực hiện kiểm tra ứng dụng trên nền tảng này, bạn đừng chỉ dựa vào **trình giả lập**.
Trình giả lập có thể giúp thử nghiệm tiện hơn, nhưng chúng có một số nhược điểm mà chúng ta cần lưu ý trước khi bắt đầu:

* **Sự phụ thuộc vào mạng:** Trình giả lập của bạn có thể hoạt động tốt trong điều kiện lý tưởng trên laptop, nhưng khi ứng dụng được cài đặt trên thiết bị thật, ứng dụng có thể sẽ trả về lỗi do cấu hình khác biệt, và ứng dụng lại không được kiểm thử trên môi trường thực tế.
* **Tương tác của người dùng:** Ứng dụng có thể đã hoạt động hoàn hảo khi bạn sử dụng chuột để nhấp vào các tab hoặc button khác nhau nhưng nó có thể hoàn toàn không work khi sử dụng điều khiển từ xa.
* **Sự cố khi hiển thị ứng dụng:** Các sự kiện khác nhau xảy ra khi thiết bị khi ứng dụng của bạn đang chạy (ví dụ: mở pop - up setting TV) có thể gây ra sự cố với hiển thị ứng dụng của bạn, nhưng bạn không thể kiểm tra điều này trên trình giả lập.

# IV. Tips hữu ích:
  * **Quản lý build:** Khi thực hiện test trên TV, mỗi bản build nên được cài đặt mới sau khi các bản build trước đó đã được gỡ cài đặt. Hoặc cần đảm bảo rằng ứng dụng được cài đè một cách chính xác.
   * **Tối ưu bộ nhớ:** Việc quản lý thông tin build chặt chẽ sẽ giúp bộ nhớ TV được nhẹ hơn, gia tăng tuổi thọ thiết bị, nếu muốn kiểm tra đến case stress test với bộ nhớ thiết bị gần full thì không nên duy trì trạng thái này quá lâu.<br/><br/>
 -------------


Tham khảo: https://exadel.com/news/qa-best-practices-how-to-do-smart-tv-application-testing-right/