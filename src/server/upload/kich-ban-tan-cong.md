Trong phạm vi bài viết này, tôi muốn trình bày kịch bản tấn công vào hệ thống. Qua đó giúp người sử dụng internet có cái nhận thức tốt hơn để phòng ngừa những nguy cơ có thể xảy ra. Hiểu về các giai đoạn tấn công chúng ta có thể phòng ngừa, dự đoán tấn công đến bước nào, cũng như phòng chống lại các cuộc tấn công. Không có phương pháp tiếp cận từng bước cụ thể được sử dụng bởi tất cả kẻ tấn công. Nhưng có một số bước thường được áp dụng trong các cuộc tấn công.

-----

**Các giai đoạn thực hiện tấn công:**
* Chuẩn bị tấn công
    + Thăm dò
    + Quét, rà soát hệ thống
*  Thực thi tấn công
    + Giành quyền truy cập
    + Duy trì truy cập
 * Xóa dấu vết


-----


**1. Thăm dò**
- Là các hành vi mà kẻ tấn công thực hiện nhằm thu thập thông tin về hệ thống: người dùng, khách hàng, các hoạt động nghiệp vụ, thông tin về tổ chức, ...
- Có thể lặp đi lặp lại một cách định kỳ đến khi có cơ hội tấn công dễ dàng hơn.
- Tấn công trong hệ thống mạng cũng khá giống tấn công trong quân sự. Trước hết họ sẽ thu thập thông tin về đối tượng cần tấn công bằng nhiều cách thức khác nhau: qua đài báo, phương tiện xã hội, qua mối quan hệ, qua mạng internet, thậm chí là tới tận nơi để tìm hiểu…
- Hacker sẽ thu thập càng nhiều thông tin càng tốt: web, email, điện thoại, nhân sự, hoạt động kinh doanh, sơ đồ hệ thống… Sau đó họ dùng công cụ kỹ thuật để tìm lỗ hổng. Đôi khi họ chưa tiến hành trực tiếp vào hệ thống mà tập trung tấn công vào máy tính, điện thoại, email… của một nhân viên nào đó trong tổ chức hoặc tổ chức liên quan (tìm hiểu gián tiếp). Thông qua những bước trung gian như vậy để lấy thông tin cần.
![](https://images.viblo.asia/73095d3d-7673-41ff-ba9a-7087d67fa5e7.png)
- Thăm dò bị động (passive):  là quá trình thu thập dữ liệu của một mục tiêu hay tổ chức mà không có tương tác với mục tiêu. Quá trình này có thể chỉ đơn giản là theo dõi thông tin hoạt động của một tòa nhà công sở để ghi nhận lại giờ giấc làm việc của nhân viên, tuy nhiên quá trình này thường được thực hiện thông qua các chương trình tìm kiếm.
- Thăm dò chủ động (active): là quá trình thu thập thông tin của mục tiêu theo hình thức chủ động, lúc này hacker sẽ tác động trực tiếp lên đối tượng để ghi nhận các dữ liệu phản hồi.
- Sử dụng các công cụ tìm kiếm: google, Shodan, Censys
- Thông tin từ mạng xã hội: FB, Tweetter, Linkedin
- Thông tin từ website của đối tượng: Burp SUite, ZAP, Web Spider, Web Mirroring
- Thăm dò hệ thống mail: Emailtracking pro và mailtracking.com là những công cụ giúp hacker thực hiện chức năng theo dõi email. Khi sử dụng công cụ, tất cả những hoạt động như gửi
mail, trả lời, chuyển tiếp, sửa mail đều được gửi đến người quản lý. Người gửi sẽ nhận được những thông báo này một cách tự động.
- WHOIS, DNS
- Thăm dò kết nối mạng: trance route
- Social Engineering

**2. Quét rà soát**
- Quét rà soát để xác định các thông tin về hệ thống dựa trên các thông tin thu thập được từ quá trình thăm dò. Kẻ tấn công có cái nhìn chi tiết hơn và sâu hơn về hệ thống: các dịch vụ cung cấp, các cổng dịch vụ đang mở, địa chỉ IP, hệ điều hành và phần mềm…
![](https://images.viblo.asia/0a5e6966-0850-4554-ae17-13525440c2f7.png)
- Trích xuất thông tin từ giai đoạn này cho phép kẻ tấn công lên kế hoạch chi tiết để thực hiện tấn công.
-  Xác định các nút mạng kết nối: Ping Sweep
- Kiểm tra các cổng dịch vụ đang mở: TCP Scanning, UDP Scanning
- Xác định thông tin hệ điều hành trên hệ thống mục tiêu: ID Serve, Netcraft
- Quét lỗ hổng: Nessus, GFI LanGuard
- Xác định topology của mạng mục tiêu: Network Topology Mapper
- Tương tác và thống kê(enumeration)
=> kẻ tấn công sẽ sử dụng các thông tin thu thập được của hai bước này để đánh giá hiện trạng về hệ thống, qua đó tìm được những lỗ hổng và điểm yếu có thể khai thác.

**3. Giành quyền truy cập**
- Là quá trình thâm nhập mục tiêu khi quá trình khai thác và tấn công thành công. Lúc này hacker sẽ xâm nhập vào hệ thống và tiến hành các hành động đánh cắp tập tin mật khẩu hay phá hủy dữ liệu, chạy những chương trình nguy hiểm, leo thang đặc quyền để có thể truy cập vào các khu vực thông tin bí mật.
- Sau khi kẻ tấn công nắm được đầy đủ thông tin của hệ thống đích, bây giờ kẻ tấn công có thể lập kế hoạch và thực hiện một cuộc tấn công dựa trên các thông tin mà họ phát hiện ra. 
![](https://images.viblo.asia/a6835f8f-1094-4b68-9e86-b0e2e6a20e2e.png)
- Kẻ tấn công giành được quyền truy cập vào hệ thống ở các mức độ khác nhau: mức mạng, mức hệ điều hành, mức ứng dụng. Tùy thuộc vào kỹ năng của kẻ tấn công tại bước này, họ có thể di chuyển từ một tài khoảncấp thấp như một tài khoản khách lên quyền quản trị hoặc truy cập hệ thống (dựa trên các quyền truy cập đã có để leo thang truy cập).

**4. Duy trì truy cập**
- Một khi đa xâm nhập hệ thống thành công hacker thường cài đặt chương trình gián điệp để có thể duy tri sự kiểm soát, nghe lén thông tin người dùng nhập vào từ bàn phím hay mở các công hậu (back door) để có thể quay lại vào các lần sau.
![](https://images.viblo.asia/18f08931-8a7d-402b-b176-fa65e542af88.png)
- Thay đổi, can thiệp và hoạt động của hệ thống
- Cài đặt các phần mềm gián điệp
- Che giấu các hành vi trên hệ thống
- Quét rà soát sâu vào hệ thống
- Mở rộng phạm vi tấn công
- Leo thang tấn công
- Nếu cần thiết, kẻ tấn công có thể nằm vùng, chờ thời điểm thích hợp để phát động tấn công.

**5. Xóa dấu vết (Covering tracks)**
- Covering tracks là giai đoạn khi kẻ tấn công cố gắng để loại bỏ các bằng chứng về sự hiện diện của họ trong một hệ thống. Kẻ tấn công tẩy log file và phá hủy bằng chứng khác có thể cho những manh mối có giá trị cần thiết cho chủ sở hữu hệ thống để xác định một cuộc tấn công xảy ra.
- Planting Backdoors(Cài đặt cửa hậu): Mục đích của việc cài đặt backdoors là để lại một cái gì đó, sau đó sẽ cho phép kẻ tấn công quay lại sau nếu bạn muốn vd: Trojan...


-----

Cảm ơn các bạn đã đọc nội dung bài viết này. 
Mời các bạn đọc tiếp phần tiếp theo: tìm hiểu về mật mã và cách thức tấn công trong seri tổng quan về an ninh mạng. Thân ái ^^