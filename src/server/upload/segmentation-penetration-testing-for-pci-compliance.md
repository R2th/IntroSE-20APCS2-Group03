### Giới thiệu – tổng quan về Network Segmentation

Các phân đoạn mạng(Network segment) hiện là một phần của cơ sở hạ tầng của bất kỳ tổ chức hoặc doanh nghiệp nào. Phân đoạn mạng là việc chia nhỏ mạng máy tính trong cơ sở hạ tầng theo yêu cầu nghiệp vụ.

Việc phân đoạn mạng phục vụ nhiều mục đích. Nó giúp tránh tắc nghẽn trong mạng tổng thể và cô lập các phân đoạn quan trọng (những phân đoạn có dữ liệu quan trọng) với các phân đoạn khác. Mọi tổ chức tuân theo quy trình và thủ tục phân đoạn của riêng họ tùy thuộc vào yêu cầu kinh doanh của họ.

Ví dụ: một tổ chức lớn có hoạt động kinh doanh liên quan đến bất kỳ hình thức thanh toán nào có thể lưu trữ dữ liệu chủ thẻ (CD – cardholder data) trong một phân đoạn và các cơ sở dữ liệu khác trong các phân đoạn khác nhau. Môi trường Dữ liệu Chủ thẻ (CDE – Cardholder Data Environment) là một phân đoạn mạng lưu trữ, xử lý và truyền dữ liệu về chủ thẻ. Nói chung, Môi trường dữ liệu chủ thẻ còn được gọi là PCI (Payment Card Industry) trong phạm vi và các phân đoạn còn lại khác được gọi là PCI ngoài phạm vi. Các ngân hàng chủ yếu có cơ sở hạ tầng nắm giữ các phân khúc như vậy.

Dữ liệu chủ thẻ bao gồm tên chủ thẻ, số thẻ, ngày hết hạn hoặc mã dịch vụ và CVV. Nó không bao giờ được thỏa hiệp và phơi bày.

Môi trường dữ liệu của chủ thẻ (CDE) phải luôn an toàn và phải có quyền truy cập hạn chế từ/đến các phân đoạn khác theo yêu cầu của Payment Card Industry Data Security Standards (PCI-DSS) (Quy định số 11.3.4). Nó chỉ có thể truy cập được từ mạng nội bộ và không bao giờ bị lộ ra bên ngoài bằng bất kỳ cách nào; không được có bất kỳ liên kết và kết nối trái phép nào giữa PCI trong phạm vi và PCI ngoài phạm vi, và truy cập hạn chế theo mọi nghĩa đến và từ PCI trong phạm vi.

Để bảo mật PCI trong phạm vi (CDE), thử nghiệm thâm nhập phân đoạn mạng(segmentation penetration) đã được đưa vào thực tế. Các doanh nghiệp nắm giữ dữ liệu chủ thẻ và yêu cầu tuân thủ PCI-DSS nên thực hiện thử nghiệm thâm nhập phân đoạn mạng. Kiểm tra thâm nhập phân đoạn mạng cần được thực hiện mỗi năm một lần đối với người bán và sáu tháng một lần đối với nhà cung cấp dịch vụ người bán, theo PCI.

### Các điều khoản mà bạn cần biết

Có nhiều thuật ngữ khác nhau có thể gây nhầm lẫn cho chúng tôi và cần hiểu trước khi thực hiện kiểm tra thâm nhập phân đoạn.

CDE in-scope: Các VLAN thuộc phạm vi CDE trong phạm vi là các VLAN lưu trữ, lưu giữ, xử lý và truyền dữ liệu chủ thẻ. Nó phải thực sự được cách ly với thế giới bên ngoài và phải có mức độ bảo mật cao trên mỗi máy chủ thuộc phạm vi CDE.

Non-CDE in-scope: Các VLAN thuộc phạm vi không phải CDE là các VLAN không lưu trữ, lưu giữ, xử lý và truyền dữ liệu chủ thẻ nhưng có các phụ thuộc từ CDE trong phạm vi. Như chúng ta đã biết rằng CDE trong phạm vi có hạn chế là không được tiếp xúc với thế giới bên ngoài, trong phạm vi không phải CDE cung cấp các dịch vụ độc quyền và tài nguyên bên ngoài cho CDE trong phạm vi. CDE trong phạm vi có một số phụ thuộc nhất định cần được đáp ứng bởi không phải CDE trong phạm vi. Ví dụ: máy chủ vá lỗi (từ máy chủ không phải CDE trong phạm vi) cung cấp các bản vá và cập nhật cho máy chủ trong phạm vi CDE. Máy chủ chống vi-rút cung cấp các giải pháp chống vi-rút cho CDE trong phạm vi. Nó thực sự phụ thuộc vào cơ sở hạ tầng đến cơ sở hạ tầng và các yêu cầu kinh doanh.

Non-CDE out-of-scope: Các VLAN thuộc phạm vi ngoài CDE là các VLAN không lưu trữ, lưu giữ, xử lý và truyền dữ liệu chủ thẻ và hoặc có bất kỳ loại phụ thuộc nào từ CDE trong phạm vi. Họ không được phép giao tiếp với CDE trong phạm vi trong mọi trường hợp.

### Cách thực hiện segmentation penetration testing

Công cụ: Nmap, Nessus hoặc bất kỳ công cụ rà quét cổng nào.

Trước tiên, bạn nên có kiến thức kỹ lưỡng về cơ sở hạ tầng bằng cách phân tích sơ đồ mạng và xác định các phân đoạn PCI trong phạm vi và PCI ngoài phạm vi. Chúng ta cần tập trung vào PCI trong phạm vi.

Nói chung, mỗi máy chủ lưu trữ trong phân đoạn trong phạm vi PCI và tất cả 65535 cổng (cho TCP và UDP) phải được quét từ PCI ngoài phạm vi. Luôn luôn được coi là phương pháp hay nhất để bắt đầu quét theo lô(Batch), vì nó hiệu quả và chúng tôi nhận được kết quả thường xuyên hơn. Chúng ta nên thực hiện quét từ PCI trong phạm vi sang PCI ngoài phạm vi và ngược lại.

Ví dụ: Batch 1: 10.10.10.1-50, Batch 2: 10.10.10.51-100, Batch 3: 10.10.10.101-150,…

Quá trình quét UDP có thể mất nhiều thời gian hơn dự kiến, tùy thuộc vào băng thông của mạng. Bạn có thể bắt đầu bằng cách bắt đầu quét 10000 cổng hàng đầu cho UDP.

Ví dụ: lệnh sau sẽ hoạt động tốt nhất cho bất kỳ phân đoạn nào:

TCP: nmap -sV -p – -T4 -v -v -oN tcpbatch1intoout.txt -oX tcpbatch1intoout.xml -Pn 10.130.1.1-50
UDP: nmap -sU -sV -T4 -v -n -Pn –top-ports 10000 -oN udpbatch1intoout.txt -oX udpbatch1intoout.xml 10.10.10.1-50

Điều đó chia nhỏ theo cách này:
```
    -sU: UDP scan
    -sV: Thăm dò các cổng đang mở để xác định thông tin dịch vụ / phiên bản
    -T<0-5>: thiết lập mẫu thời gian (cao hơn đến nhanh hơn)
    -v: Verbosity
    -Pn: Không thực hiện ping
    -oN/-oX/-oS/-oG <file>: Xác định chuẩn đầu ra
    -n/-R: Không thực hiện phân giải DNS/luông phân giải DNS
```

Lưu ý: Tất cả các cổng phải được đóng hoặc được lọc trong khi thực hiện quét từ PCI trong phạm vi sang PCI ngoài phạm vi và ngược lại.
Những thách thức phải đối mặt

1. Bạn có thể gặp phải trạng thái mở | đã lọc trên các cổng như hình dưới đây:

![](https://images.viblo.asia/19944d11-6ced-4fee-8409-696144f1c0f1.png)

Tình huống trên rất phổ biến và chủ yếu xảy ra khi thực hiện quét UDP. Nmap gắn nhãn các cổng ở trạng thái này khi nó không thể xác định xem nó đang mở hay được lọc. Trong những trường hợp như vậy, hãy xác minh theo cách thủ công và kiểm tra xem nó có thực sự mở hay không.

Ví dụ: bạn có thể kết nối với cổng đó bằng cách đặt 10.130.31.24:3130 vào trình duyệt của mình và kiểm tra phản hồi. Nếu bất kỳ dịch vụ nào đang chạy trên cổng đó và nó đang phản ánh trên trình duyệt, thì cổng đó đang mở. Nếu không, nó sẽ được coi là đã lọc. Bạn cũng có thể kết nối thông qua netcat: $ netcat 10.130.31.24:3130.

2. Kiểm tra các cổng ngẫu nhiên nếu tất cả các cổng đi ra được lọc như hình dưới đây:

![](https://images.viblo.asia/d902f3c9-a862-4f05-b9d6-e9aa3a62370f.png)

Đây có thể là khả năng tường lửa đang thả tất cả các gói tin. Kiểm tra và xác minh bằng cách kết nối với các cổng ngẫu nhiên (ví dụ 443, 80, 121, 89). Ví dụ: bạn có thể kết nối với cổng đó bằng cách đặt 10.130.30.3:443 vào trình duyệt và kiểm tra phản hồi. Nếu bất kỳ dịch vụ nào đang chạy trên cổng đó và nó đang phản ánh trên trình duyệt, thì cổng đó đang mở. Nếu không, nó sẽ được coi là đã lọc. Bạn cũng có thể kết nối thông qua netcat: $ netcat 10.130.30.3:443

3. Điều gì sẽ xảy ra nếu quá trình quét mất nhiều thời gian hơn dự kiến? Loại bỏ cờ -sV và thay đổi giá trị của -T thành 5 trong lệnh nmap. Hãy thử lệnh sau để quét nhanh:

nmap -p – -T5 -v -v -oN tcpbatch1.txt -oX tcpbatch1.xml -Pn 10.130.1.1-50
Báo cáo kết quả

Những điểm sau đây cần được xem xét khi lập báo cáo:
- Nó phải bao gồm toàn bộ phạm vi cấu trúc VLAN
- Nó phải có một bản tóm tắt về trạng thái tuân thủ, chẳng hạn như ví dụ được hiển thị bên dưới:

![](https://images.viblo.asia/5c209f04-2b30-4ba1-b684-387781816447.png)

Tuân thủ ở đây đề cập đến thực tế là VLAN đang tuân theo các nguyên tắc của PCI và không có quyền truy cập từ bên ngoài tới lui. Mặt khác, không tuân thủ đề cập đến thực tế là VLAN không tuân theo các nguyên tắc PCI và có quyền truy cập bên ngoài vào nó.

Nó phải bao gồm kết quả thăm dò hiển thị các cổng đang mở (nếu có) và các cổng đã lọc, như hình dưới đây:

![](https://images.viblo.asia/01ba2c35-2fbc-4ed5-aaaa-7e249f39e3bd.png)

Nguồn: [](https://resources.infosecinstitute.com/topic/segmentation-penetration-testing-for-pci-compliance/)