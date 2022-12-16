## 1.1  Tấn công mạng. 

## 1.1.1 Tấn công mạng là gì ?

   Mỗi chuyên gia trong lĩnh vực an toàn thông tin luận giải thuật ngữ này theo ý hiểu của mình . Ví dụ “ xâm nhập” là tác động bất kì đưa hệ thống từ trạng thái an toàn sang trạng thái nguy hiểm. Thuật  ngữ này có thể giải thích như sau : “xâm nhập” đó là sự phá hủy chính sách an toàn thông tin hoặc là tác động bất kì dẫn đến việc phá hủy tính toàn vẹn, tính bí mật, tính sẵn sàng của hệ thống và thông tin được xử lý trong hệ thống.  

   Tấn công ( attack ) là hoạt động phi pháp có chủ ý của một cá nhân hay tập thể lợi dụng các thương tổn của hệ thống thông tin và tiến hành phá vỡ tính sẵn sàng, tính toàn vẹn và tính bảo mật của hệ thống thông tin. Tấn công mạng là các tác động hoặc là trình tự liên kết giữa các tác động với nhau để phá hủy dẫn tới việc thực hiện hóa các nguy cơ bằng cách lợi dụng đặc tính dễ bị tổn thương của các hệ thống thông tin. 

### 1.1.2 Các mô hình tấn công mạng : 

   Mô hình tấn công truyền thống : theo nguyên tắc “một đến một” hay “một đến nhiều”, có nghĩa là cuộc tấn công xảy ra từ 1 nguồn gốc. 
   Mô hình tấn công phân tán : theo nguyên tắc ”nhiều đến một” hay “nhiều đến nhiều”, có nghĩa là cuộc tấn công có thể xuất phát từ nhiều nguộc phần tán.
   
### 1.1.3 Các kiểu tấn công qua mạng được sử dụng trong bộ dữ liệu KDD Cup 99 

#### 1.1.3.1 Tấn công kiểu Probe. 

   Trong loại tấn công này, tin tặc quét mạng hoặc máy tính để tìm ra điểm yếu dễ tấn công mà thông qua đó tin tặc có thể khai thác hệ thống. Điều này giống như theo dõi , giám sát hệ thống. Một cách phổ biến của loại tấn công này là thực hiện thông qua việc quét các cổng của hệ thống máy tính. Bằng việc này tin tặc có thể lấy được thông tin về cổng đang mở , dịch vụ đang chạy và rất nhiều thông tin nhạy cảm khác như IP, Mac, các rule tường lửa,…Các kiểu tấn công thăm dò trong KDD Cup 99: Ipsweep, Nmap, Portsweep, Satan. 

#### 1.1.3.2 Tấn công kiểu R2L - Remote to Local. 

   Trong loại tấn công này , tin tặc cố gắng đạt được quyền truy cập vào hệ thống máy tính bằng việc gửi các gói tin tới hệ thống thông qua mạng. Mục tiêu chính của Remote to Local Attack là để xem hoặc ăn cắp dữ liệu bất hợp pháp, cài cắm virus hoặc phần mềm độc hại khác vào máy tính khác hoặc mạng hoặc hệ thống, và gây thiệt hại cho máy tính hoặc mạng mục tiêu. Các kiểu tấn công Remote to Local Attack trong KDD Cup 99 : Ftp_write, Guess_passwd, Imap, Multihop, Phf, Spy, Warezmaster. 

#### 1.1.3.3 Tấn công kiểu từ chối dịch vụ - Denial of Services (DOS). 

   Tấn công kiểu DoS là những tấn công làm cho tài nguyên máy tính không còn khả dụng với người dùng thật sự . Dạng tấn công phổ biến nhất của tấn công DoS là làm cho tài nguyên máy tính quá bận vì bị sử dụng toàn bộ với rất nhiều yêu cầu vô ích đến mức người dùng thực sự không thể sử dụng nó. 

   Có 2 loại tấn công DoS: 

   DoS: tấn công từ một cá thể hay một tập hợp các cá thể. 

   DDoS : là tấn công DoS phân tán . 

   Các kiểu tấn công DoS trong KDD Cup 99 : Back, Land, Neptune, Pod, Smurf, Teardrop. 
#### 1.1.3.4 Tấn công kiểu U2R – User to Root. 

   Trong lớp tấn công này , tin tặc với quyền của một người dùng bình thường cố gắng để đạt được quyền truy cập cao nhất ( đặc quyền của người quản trị hệ thống ) vào hệ thống một cách bất hợp pháp. Trong bộ dữ liệu kddcup 99 có đề cập đến một kiểu tấn công U2R là: buffer_overflow, loadmodule, perl, rootkit. 

## 1.2 Giám sát trong một hệthống mạng.
### 1.2.1 Cácthành phần trong hệ thống mạng.
   Để một hệthống mạng hoạt động tốt nó bao gồm rất nhiều thành phần, hoạt động trên các nền tảng và môi trường khác nhau.
        - Các máy trạm.
        - Các máy chủ.
        - Các thiết bịhạtầng mạng : Router, Swich,Hub,...
        - Các thiết bịphát hiện và phòng chống xâm nhập : IDS –IPS, Snort, Firewall,...
        - Các ứng dụng chạy trên các máychủvà máy trạm.

### 1.2.2 Giám sát hệ thống mạng.
   Giám sát an ninh mạng là việc thu thập các thông tin trên các thành phần của hệthống, phân tích các thông tin, dấu hiệu nhằm đánh giá và đưa ra các cảnh báo cho người quản trịhệthống. Đối tượng của giám sát an ninh mạng là tất cảcác thành phần, thiết bịtrong hệthống mạng: các máy trạm , cơ sởdữliệu, các ứng dụng, các server hay các thiết bịmạng.
  - Giám sát tập trung :trong tiếp cận này chỉcó một thiết bịquản lí trung tâm thu nhận các thông tin của toàn bộcác thực thểmạng. Kiến trúc này thường được sửdụng rất nhiều trong mạng hiện nay, nhất là với các mô hình doanh nghiệp có hạtầng mạng riêng và có trung tâm quản trịmạng. agent được đặt vào các hệthống cần giám sát đểthực hiện các chức năng giám sát trên từng thiết bịvà trao đổi thông tin với thiết bịtrung tâm bằng các giao thức thông tin quản lý như SNMP, CMIS/CMIP,....
  - Giám sát phân tán: còn được gọi là hệthống giám sát ngang cấp chạy đồng thời trên mạng . Với hệthống giám sát phân tán tỉsốhiệu năng / giá thành, độmềm dẻo, khảnăng mởrộng, tính khảdụng và độtin cậy được nâng cao.Hệthống giám sát ngang hàng thường được xây dựng mà mỗi agent đều có một cơ sởdữliệu hoàn chỉnh riêng , lưu trữcác thông tin giám sát của mình. Các agent khác hoàn toàn có thểtruy cập vào cơ sởdữliệu này.
  - Giám sát hướng đối tượng : Mục tiêu của quản lý hướng đối tượng là tập trung vào giám sát một đối tượng cụthểtrong hệthống mạng. Đối tượng ấy có thểlà một(hay một nhóm) máy trạm, máy chủnào đó, hoặc cũng có thểlà giám sát các tài nguyên mạng của hệthống.