Link : https://jmetervn.com/2017/01/04/how-to-generate-dashboard-report-in-jmeter/

![](https://images.viblo.asia/60ae93d2-00ad-4a2f-8f09-537142258c65.png)

Trình tạo bảng điều khiển là một phần mở rộng mô-đun của JMeter.  Nhiệm vụ mặc định của nó là đọc và xử lý các mẫu từ tệp CSV để tạo tệp HTML chứa chế độ xem biểu đồ. Nó có thể tạo báo cáo khi kết thúc kiểm tra tải hoặc theo yêu cầu.

Vui lòng làm theo các bước bên dưới và bạn có thể xem cách tạo Báo cáo Bảng điều khiển một cách dễ dàng bằng chế độ Non Gui : https://jmetervn.com/2017/01/09/running-jmeter-in-non-gui-mode/. Ngoài ra, tôi sẽ chỉ cho bạn một số thuộc tính hữu ích và cách áp dụng chúng để tạo báo cáo mong đợi.

Noted : Hướng dẫn này áp dụng cho JMeter 3.1 trở lên. Nó có thể không hoạt động cho phiên bản trước.

### 1. Yêu cầu

**1.1 Test Plan**

Đầu tiên bạn cần một Kế hoạch kiểm tra để chạy thử nghiệm. Bạn chỉ có thể tự giới thiệu bài đăng ở đây để tự tạo Kế hoạch kiểm tra hoặc chỉ cần tải xuống Kế hoạch kiểm tra mẫu của tôi tại đây:
https://jmetervn.com/2016/10/14/building-a-basic-web-test-plan-jmeter/


**1.2 Cấu hình JMeter**

Để cho phép trình tạo hoạt động, các tệp kết quả kiểm tra phải bao gồm một số dữ liệu cần thiết. Kiểm tra xem cấu hình JMeter của bạn trong tệp jmeter.properIES trong thư mục JMETER_HOME / bin, nó phải tuân theo các cài đặt này (đây là các giá trị mặc định).

### 2. Generation Reports

2.1 Tạo từ tệp kết quả CSV / JTL mẫu hiện có

Bước 1: Chạy thử nghiệm ở chế độ Non GUI và lưu báo cáo dưới định dạng csv hoặc jtl, sử dụng lệnh trong thư mục JMETER_HOME / bin

Windows:

jmeter -n -t [đường dẫn để kiểm tra tệp JMX] -l [đường dẫn đến tệp kết quả]

VD:

jmeter -n -t C: \ jmeter \ gen-report.jmx -l C: \ jmeter \ gen-report.jtl

Bước 2: Sử dụng lệnh sau để tạo báo cáo từ tệp kết quả CSV / JTL mẫu hiện có như trên.

Windows:

jmeter -g [đường dẫn đến tệp kết quả] -o [đường dẫn đến thư mục đầu ra báo cáo]

Sau khi chạy lệnh này, thư mục báo cáo sẽ được tạo, tham khảo hình ảnh bên dưới
![](https://images.viblo.asia/21fb0cef-ed3f-44d6-8563-effe55a41f55.png)

Nhấp vào tệp index.html, nó sẽ mở báo cáo bảng điều khiển

![](https://images.viblo.asia/4a83ce71-e554-407c-9427-ff39d0f527f9.png)

### 2.2 Generation after running test

Sử dụng lệnh sau

Windows:

jmeter -n -t [đường dẫn để kiểm tra tệp JMX] -l [đường dẫn đến tệp kết quả kiểm tra]

jmeter -n -t C:\jmeter\gen-report.jmx -l C:\jmeter\gen-report-2.jtl -e -o C:\jmeter\report2

Sau đó, bạn có thể kiểm tra thư mục báo cáo đã được tạo thành công

![](https://images.viblo.asia/8cffe9b6-9ebc-4fcb-b846-20cf16aaa22e.png)

Mở tệp index.html sẽ hiển thị cho bạn báo cáo bảng điều khiển

![](https://images.viblo.asia/e91516b5-3217-4ad7-a758-2dec8bd20f81.png)

### 3. Report Overview

Bảng APDEX (Chỉ số hiệu suất ứng dụng) tính toán cho mọi giao dịch APDEX dựa trên các giá trị có thể định cấu hình cho các ngưỡng được chấp nhận và thỏa mãn
Biểu đồ tóm tắt yêu cầu hiển thị tỷ lệ phần trăm Requests thành công và Requests thất bại  (Kết quả Transaction Controller Sample  không được tính đến) :

![](https://images.viblo.asia/77d3b74a-55a7-4638-bfa1-29d7b2ed9cda.png)

Bảng Thống kê (Statistics table) (gần giống như Aggregate Report ) cung cấp trong một bảng tóm tắt tất cả các số liệu cho mỗi giao dịch, bao gồm 3 phần trăm có thể định cấu hình:

![](https://images.viblo.asia/40379e09-0221-4857-a9d6-375038f6168c.png)

Bảng Lỗi (Error table) cung cấp tóm tắt về tất cả các lỗi và tỷ lệ của chúng trong tổng số Requests:

![](https://images.viblo.asia/f16d94ac-1621-4257-9297-be15050b61b3.png)

Bảng 5 lỗi hàng đầu theo bảng Sampler (Top 5 Errors by Sampler ) cung cấp cho mọi  Sampler (không bao gồmTransaction Controller theo mặc định)  5 lỗi hàng đầu:

![](https://images.viblo.asia/a0a7426e-1cf7-477f-b70a-07453247dfe1.png)

Biểu đồ có thể thu phóng trong đó bạn có thể kiểm tra / bỏ chọn mọi giao dịch để hiển thị / ẩn nó cho:

Response times Over Time : (Thời gian phản hồi theo thời gian) (Bao gồmTransaction Controller Sample Results) : Biểu đồ này biểu thị thời gian phản hồi trung bình theo thời gian

![](https://images.viblo.asia/818439ea-1505-4f11-83b1-5f219634b286.png)

Response times Percentiles Over Time  : (Thời gian phản hồi Tỷ lệ phần trăm theo thời gian)  (chỉ phản hồi thành công): Biểu đồ này hiển thị thời gian phản hồi Tối thiểu / Tối đa và 3 phần trăm thời gian đáp ứng theo thời gian.

![](https://images.viblo.asia/99451aeb-3c66-495d-8bcf-b399b0e90462.png)

Active Threads Over Time:  (Threads hoạt động theo thời gian): Biểu đồ này biểu thị số lượng Threads hoạt động theo thời gian.

![](https://images.viblo.asia/3719d623-4b47-4c79-910f-88ea46fe3a96.png)

Bytes throughput Over Time (Throughput byte theo thời gian) (Bỏ qua Transaction Controller Sample Results) : Biểu đồ này biểu thị throughput của dữ liệu nhận và gửi theo thời gian.

![](https://images.viblo.asia/00831758-6372-4b17-be0c-2dea739570bb.png)

Latencies Over Time  (Độ trễ theo thời gian) (Bao gồm Transaction Controller Sample Results):  Biểu đồ này biểu thị thời gian trễ trung bình theo thời gian.

![](https://images.viblo.asia/6d6b74c1-7a94-4907-8eec-15df8f7d1fa0.png)

Connect Time Over Time (Kết nối thời gian theo thời gian) (Bao gồm Transaction Controller Sample Results): Biểu đồ này biểu thị thời gian kết nối theo thời gian.

![](https://images.viblo.asia/e985ff95-466a-44e3-b725-bba6936483cf.png)

Hits per second (Số lần truy cập mỗi giây)  - còn gọi là Throughput (Thông lượng)  (Bỏ qua Transaction Controller Sample Results):  Biểu đồ này biểu thị tỷ lệ Requests đã kết thúc theo thời gian.

![](https://images.viblo.asia/f9dbd41b-cd17-42ae-9cf6-72cda57a99ed.png)

Response codes per second  (Mã phản hồi mỗi giây ) (Bỏ qua kết quả Transaction Controller Sample Results):   Biểu đồ này biểu thị tốc độ của code phản hồi theo thời gian.

![](https://images.viblo.asia/1d596609-f472-4755-8618-7871430f0a3a.png)

Transactions per second  (Giao dịch mỗi giây) (Bao gồm Transaction Controller Sample Results):  Biểu đồ này biểu thị tốc độ giao dịch theo tên mẫu theo thời gian.

![](https://images.viblo.asia/dd19a509-46aa-41ed-b836-3e11201e5dcf.png)

Response Time vs Request per second  (Thời gian phản hồi so với yêu cầu mỗi giây)  (Bỏ qua Transaction Controller Sample Results):  Biểu đồ này biểu thị thời gian phản hồi trung bình và thời gian phản hồi trung bình tùy thuộc vào số lượng Requests hiện tại.

![](https://images.viblo.asia/b7a5d801-ef49-44cb-920e-091f66ea336a.png)

Latency vs Request per second  (Độ trễ so với yêu cầu mỗi giây)  Bỏ qua Transaction Controller Sample Results):  Biểu đồ này biểu thị thời gian trễ trung bình và thời gian trễ trung bình tùy thuộc vào số lượng yêu cầu hiện tại.

![](https://images.viblo.asia/8d836073-7f2d-466b-aa1c-6fdc80f7d637.png)

Response time Overview  (Tổng quan về thời gian phản hồi) (Không bao gồm  Transaction Controller Sample Results):

![](https://images.viblo.asia/364c8fcc-500a-461e-ae0c-f75ecb69fccc.png)

Response times percentiles ( Tỉ lệ % Thời gian phản hồi )  (Bao gồmTransaction Controller Sample Results):  Biểu đồ này biểu thị phần trăm thời gian đã trôi qua theo thời gian.

![](https://images.viblo.asia/8e9b7c4a-a597-40ca-b861-380d9274bbac.png)

Times vs Threads (Bao gồm kết quả mẫu của Trình điều khiển giao dịch): Biểu đồ này biểu thị thời gian phản hồi trung bình tùy thuộc vào số lượng chuỗi hoạt động hiện tại.

![](https://images.viblo.asia/f93c179d-608b-4142-8842-a562082a63f8.png)

Phân phối thời gian đáp ứng (Bao gồm Transaction Controller Sample Results):  Biểu đồ này biểu thị phân phối của các samples tùy thuộc vào thời gian và tên đã trôi qua của chúng.

![](https://images.viblo.asia/1c95c5d1-9cdf-41b5-b9f6-0e20d4d3f56b.png)

### 4. Cấu hình tùy chỉnh

 Tạo bảng điều khiển sử dụng các thuộc tính JMeter để tùy chỉnh báo cáo. Một số thuộc tính được sử dụng cho cài đặt chung và các thuộc tính khác được sử dụng cho cấu hình biểu đồ cụ thể hoặc cấu hình nhà xuất khẩu. Tất cả các thuộc tính của trình tạo báo cáo có thể được tìm thấy trong tệp reportgenerator.properIES. Để tùy chỉnh các thuộc tính này, bạn nên sao chép chúng trong tệp user.properIES và sửa đổi chúng.
 
Trên thực tế, trong tệp user.properIES, từ phiên bản 3.1 của JMeter, nó bao gồm một số thông tin cơ bản và hữu ích cho trình tạo báo cáo. Vì vậy, để tùy chỉnh, chỉ cần mở tệp user.properIES và thay đổi một cái gì đó trên đó.

**4.1 Tiêu đề báo cáo**

# jmeter.reportgenerator.report_title = Bảng điều khiển Apache JMeter

Bỏ ghi chú bằng cách xóa ký hiệu # và định cấu hình thuộc tính này để thay đổi tiêu đề báo cáo. Thí dụ:

jmeter.reportgenerator.report_title = Bảng điều khiển JMeter VN

**4.2 Độ chi tiết**

# jmeter.reportgenerator.overall_granularity = 60000
Thay đổi tham số này nếu bạn muốn thay đổi mức độ chi tiết của đồ thị theo thời gian. Độ chi tiết là thời gian giữa hai dấu chấm trong biểu đồ sẽ được hiển thị. Theo mặc định, nó 60000ms = 1 phút. Vì vậy, cứ sau 1 phút, nó sẽ hiển thị 1 chấm trong biểu đồ. Nếu bạn thay đổi thành 1000 (1 giây), cứ sau 1 giây, biểu đồ sẽ vẽ một dấu chấm.

Kích hoạt cấu hình này bằng cách xóa ký hiệu # và đặt giá trị mới cho độ chi tiết (mili giây)

jmeter.reportgenerator.overall_granularity = 1000
Dựa trên bài kiểm tra thời lượng của bài kiểm tra của bạn là gì, bạn có thể định cấu hình mức độ chi tiết tương ứng. Ví dụ: bài kiểm tra của bạn chạy trong vài giờ, sẽ rất hợp lý khi đặt độ chi tiết là 1 phút hoặc 2 phút, đừng set thành 1 giây hoặc ít hơn, hoặc nó sẽ hiển thị một tấn dấu chấm trong biểu đồ của bạn khiến bạn phát điên khi nhìn vào. Và với thử nghiệm chỉ chạy trong vài phút, thì độ chi tiết = 1 giây hoặc 100ms là tốt nhất trong trường hợp này.

Tham khảo những hình ảnh dưới đây để thấy sự khác biệt giữa độ chi tiết 1 phút và 1 giây

![](https://images.viblo.asia/c6f797d9-f88b-4719-a3bc-615f6263b8e6.png)

![](https://images.viblo.asia/5de76385-e7c8-4d66-94c2-87ea04affbf7.png)