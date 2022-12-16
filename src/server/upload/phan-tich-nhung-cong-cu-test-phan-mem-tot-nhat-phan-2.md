Trong [phần 1](https://viblo.asia/p/phan-tich-nhung-cong-cu-test-phan-mem-tot-nhat-phan-1-naQZRwzGlvx), mình đã giới thiệu vai trò của những công cụ test phần mềm, phân loại chúng và giới thiệu về các công cụ được sử dụng để test chức năng phần mềm trong loại công cụ test tự động. Phần này mình sẽ liệt kê những công cụ test sự tích hợp (API) trong loại công cụ test tự động và liệt kê cũng như chỉ ra vai trò của các loại công cụ test thực thi, test quản lý theo như đã phân loại trước đó.

![](https://images.viblo.asia/9fddd74f-6086-40f5-b18c-8ef61d0386d7.png)

**3.2.  Những công cụ test sự tích hợp (API)**

![](https://images.viblo.asia/925e5f07-2417-4d6f-be67-61149c0eb8e6.png)

Những công cụ test tích hợp (API) gửi những kiểu khác nhau của dữ liệu tải theo những API của phần mềm để chắc chắn chúng chỉ chấp nhận những đầu vào có giá trị và bỏ qua những đầu vào không đúng với những thông điệp đúng. Một vài trong số các phần mềm thuộc loại này cũng cung cấp chức năng test tải. Việc test sự tích hợp hay test API đặc biệt quan trọng cho các ứng dụng dựa trên cloud, ứng dụng trên di động và PaaS. Chúng ta cùng phân tích một số công cụ test tích hợp / API để cân nhắc. 

Để chi tiết mình sẽ lựa chọn 3 công cụ test thực thi điển hình để phân tích bên dưới.

**3.2.1. CA Technologies Application Test**

***1. Tóm tắt***

Sử dụng mô hình chuỗi công việc được khai báo và tập trung vào xây dựng những bài test dựa trên script. CA Application Test đi theo sự dịch trái bằng cách cho phép test API trước khi phát triển giao diện người dùng. Nó cũng hỗ trợ chức năng test tự động cho ứng dụng di động (automated mobile testing), những bài test kiểm tra bằng mắt (visual tests), test các tải được tùy biến và hỗ trợ các phân tích nâng cao.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/debd41fd-5112-496a-acfc-2d750987f990.png)

***3. Đặc điểm chính***

* Cho phép tích hợp việc test di động (mobile testing)
* Hỗ trợ tích hợp với công cụ kiểm thử Selelium để hỗ trợ và nâng cao việc chỉnh sửa bằng mắt.
*  Hỗ trợ những siêu máy tính mạnh mẽ.
* Cho phép tái sử dụng những testcase LISA và kiến trúc hạ tầng.
* Cho phép sáng tạo một tải dựa trên một mạng nội bộ với một số ít tài nguyên.

***4. Những điều bạn cần biết***

CA Technologies hầu hết tập trung cạnh tranh trong không gian những siêu máy tính và test các ứng dụng desktop và những kiến trúc hạ tầng phức tạp sử dụng LISA.

***5. Những liên kết review***

https://www.ca.com/us/products/ca-application-test.html

***6. Giá*** 

Có bản dùng thử free các chức năng cơ bản.

**3.2.2. IBM Rational Test Workbench**

***1. Tóm tắt***

Một công cụ test tự động toàn diện với chức năng test tích hợp đi kèm với những chức năng test di động, test thực thi, test hồi quy, test khả năng thay đổi. Trong khía cạnh test tích hợp, IBM Rational Test Workbench cho phép test ở mức service, lập lịch tự động và thực thi test theo sự tích hợp với công cụ quản lý vòng đời của IBM Rational.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/9e38fa7d-b526-4bab-acde-76519d49c4c4.png)

***3. Đặc điểm chính***

* Cho phép việc test tích hợp (test API) một cách liên tục.
* Có khả năng tích hợp với bộ công cụ test lớn hơn của IBM Rotational để hỗ trợ những chức năng mở rộng.
* Cung cấp sự khảo sát vòng đời.
* Hỗ trợ test tự động.

***4. Những điều bạn cần biết***

IBM Rational Test Workbench cung cấp một bộ hoàn thiện những công cụ test cho toàn bộ vòng đời phát triển của phần mềm.

***5. Những liên kết review***
 
 Tìm hiểu thêm về việc test tải và test tích hợp với IBM Rational tại https://www.ibm.com/us-en/marketplace/rational-test-workbench

***6. Giá***

Bắt đầu ở mức $3,730 trên năm với 12 mức tùy chọn khác nhau.

**3.2.3. Parasoft SOAtest**

***1. Tóm tắt***

Cung cấp việc test tự động cho những kịch bản cuối-cuối (end-to-end) thông qua nhiều điểm đầu cuối (endpoint) với việc hỗ trợ REST, nhiều dịch vụ web và hơn 120 kiểu giao thức, thông điệp khác nhau. Parasoft SOAtest cũng hỗ trợ sáng tạo những bài test có khả năng mở rộng và có khả năng sử dụng lại. Bên cạnh việc test API, nó cũng hỗ trợ việc test SOA (Service Oriented Architecture Testing), test web và web UI, test thực thi, test lỗi trong quá trình chạy, test những API có tính bảo mật (API security testing), những service ảo, và test sự phát triển (development testing).

***2. Giao diện phần mềm***

![](https://images.viblo.asia/559fb164-6a33-42e8-9dc1-ec2fa177586d.png)

***3. Đặc điểm chính***

* Mang đến những khả năng dựa trên việc test API
* Cho phép lựa chọn nhiều loại giao thức, thông điệp khác nhau.

***4. Những điều bạn cần biết***

Parasoft SOAtest mang đến việc test API tự động và một vài khả năng test khác. Đặc điểm độc đáo của nó là hỗ trợ số lượng lớn những môi trường khác nhau, bao gồm những giao thức, những nền tảng và những định dạng thông điệp khác nhau.

***5. Những liên kết review***

https://www.parasoft.com/products/soatest

***6. Giá***

Đọc thêm các bài viết về Parasoft SOAtest tại https://www.itcentralstation.com/products/parasoft-soatest

**3.2.4. Những công cụ test tích hợp mã nguồn mở**

Chúng ta cũng có một vài tùy chọn cho những công cụ test tích hợp (API) mã nguồn mở. Nếu bạn quyết định đi theo con đường sử dụng mã nguồn mở, hãy cân nhắc những công cụ bên dưới

![](https://images.viblo.asia/368a7c9a-dfb2-4f89-bfcd-1e5b18610b89.png)

**4. Những công cụ test thực thi**

* Những công cụ test thực thi sẽ tạo ra những script test tự động và chạy chúng trên hàng trăm, hàng nghìn máy để mô phỏng một ứng dụng sẽ thực thi như thế nào dưới tải. Những bài test này thường đắt đỏ và chạy ít thường xuyên hơn các bài test chức năng tự động.
* Việc test thực thi là quan trọng đối với những ứng dụng cloud và có thể chia thành 2 loại chính:
    Loại đơn giản (Pure Play Testing Tools)
    Loại mở rộng (Extension Testing Tools)
* Mỗi loại công cụ test thực thi đều có ưu điểm và nhược điểm riêng. Bên dưới là những gì cũng ta cần biết về sự khác biệt giữa 2 loại công cụ test thực thi này

**Pure Play Performance Testing Tools**

***Ưu điểm:***

* Rẻ hơn
* Tạo ra ít vấn đề trong những quá trình chi trả và thực thi
* Mang đến sự phát triển nhanh hơn
* Hỗ trợ thêm nhiều sự tích hợp và mã nguồn mở

***Nhược điểm:***

Yêu cầu những ngôn ngữ, script riêng để đào tạo và bảo quản.

**Extension Performance Testing Tools**

***Ưu điểm:*** 

* Cho phép sử dụng lại các script tự động trước đó
* Sử dụng các ngôn ngữ thân thuộc

***Nhược điểm:***

* Theo sau sự phát triển chậm hơn.
* Cung cấp một hệ sinh thái đóng với sự giới hạn truy cập đến những công cụ tốt nhất.
* Đắt đỏ hơn và thường hướng đến sử dụng trong các tổ chức lớn.
* Để chi tiết hơn, bên dưới mình sẽ lựa chọn và đi vào chi tiết 2 công cụ thuộc loại test thực thi đơn giản và 2 công cụ thuộc loại mở rộng điển hình.

**4.1. Những công cụ test thực thi mở rộng**

**4.1.1. Automation Anywhere Testing Anywhere**

***1. Tóm tắt:***

Sử dụng quá trình tự động theo kiểu robot để tự động bất kỳ kiểu nào của quá trình test và hỗ trợ đa nền tảng gồm di động, web và máy tính desktop. Automation Anywhere có thể chuyển đổi những script thành những script tải và cho phép máy học và phân tích.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/ded15e2c-ab95-4070-803a-4e28121cb0bc.png)

***3. Đặc điểm chính***
 
* Mang đến sự chuyển đổi dễ dàng từ sự tự động.
* Ít đắt đỏ hơn các công cụ test thực thi loại mở rộng khác.
* Bao gồm một testLab để điều khiển các thiết bị test.

***4. Những điều bạn cần biết***

Automation Anywhere là một đối thủ cạnh tranh, tuy nhiên ở cấp thấp hơn so với HP ở danh mục phần mềm test thực thi, mang đến khả năng quản lý test case và khả năng test tự động linh hoạt.

***5. Những liên kết review*** 

https://www.automationanywhere.com/
https://www.g2crowd.com/products/testing-anywhere/reviews
https://www.itcentralstation.com/product_reviews/automation-anywhere-review-31727-by-rudy-labagnara

**4.1.2. HP LoadRunner, Performance Center & StormRunner**

***1. Tóm tắt***

HP mang đến một sự kết hợp của 3 công cụ test thực thi và test tải. LoadRunner cung cấp việc test tải một cách toàn diện với những mô phỏng tương tác và khả năng phân tích nguyên nhân gốc gây ra lỗi. Trong khi đó Performance Center sáng tạo một trung tâm tuyệt vời thực hiện việc tái sử dụng những tài nguyên và những thực thi tốt nhất thông qua việc test cho nhiều ứng dụng khác nhau. Cả LoadRunner và Performance Center đều hỗ trợ việc test liên tục và test di động. Cuối cùng, StormRunner hỗ trợ mở rộng khả năng test cho thế giới SaaS (Software as a Service). 

***2. Giao diện phần mềm***

![](https://images.viblo.asia/e9d821be-7b44-4d1e-917d-5c380ef49081.png)

***3. Đặc điểm chính***

* Những công cụ hoàn thiện và mạnh mẽ.
* Hỗ trợ cả những kỹ thuật cũ và mới hơn.
* Hỗ trợ nhúng chức năng Cloud.
* Cho phép record và playback
* Cho phép sử dụng lại những bài test.

***4. Những điều bạn cần biết***

Cả LoadRunner, Performance Center và StormRunner đều hỗ trợ mở rộng đến cloud. HP đang đi đầu trong lĩnh vực này.

***5. Những liên kết review***

http://www8.hp.com/us/en/software-solutions/stormrunner-load-agile-cloud-testing/
http://www8.hp.com/us/en/software-solutions/performance-center-testing/
http://www8.hp.com/us/en/software-solutions/loadrunner-load-testing/index.html

https://www.g2crowd.com/products/loadrunner-2018-05-16/reviews
https://www.itcentralstation.com/products/stormrunner-load
https://www.itcentralstation.com/products/performance-center

***6. Giá***

LoadRunner và StormRunner có giá ở mức $.56 cho một người sử dụng trên một ngày, nhưng chúng có phiên bản free. Chúng ta có thể tham khảo thêm giá tại link: 
https://software.microfocus.com/en-us/products/stormrunner-load-agile-cloud-testing/pricing


**4.2. Những công cụ test thực thi đơn giản**

***4.2.1. BlazeMeter***

***1. Tóm tắt***

Chạy các bài test thực thi dựa trên mã nguồn mở cũng như các bài test tải có khả năng điều chỉnh. BlazeMeter tương thích với Apache JMeter, mang đến những báo cáo thời gian thực, hỗ trợ mô phỏng những điều kiện mạng và cho phép nhà phát triển sáng tạo và chỉnh sửa các bài test thực thi.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/c3aaf340-faef-473a-b24f-051e5998cd2a.png)

***3. Đặc điểm chính***
 
* Có thể tùy biến về phạm vi và mức độ test.
* Sẵn sàng cho Devops (Những người vừa phát triển phần mềm vừa đưa sản phẩm ra thị trường).
* Sử dụng mã nguồn mở và AWS (Amazon Web Service)
* Mang đến những hỗ trợ mạnh mẽ cho API và những tùy biến.

***4. Những điều bạn cần biết***

BlazeMeter có thể coi như một người chơi đang trưởng thành trong không gian test thực thi dựa trên đám mây (cloud). Mặc dù nó có những giới hạn về test cases và không mang đến những chức năng năng quản lý người dùng, nó vẫn là thân thuộc với những người phát triển.

***5. Những liên kết review***

https://www.blazemeter.com/

***6. Giá***

Có phiên bản miễn phí. Phiên bản mất phí bắt đầu tại $99 trên tháng với 3 mức khác nhau. Tham khảo thêm tại liên kết: https://www.blazemeter.com/pricing

**4.2.2. Soasta CloudTest**

***1. Tóm tắt***

Mang đến việc test tải liên tục tại bất kỳ mức độ nào với những phân tích thời gian thực. Soasta CloudTest hỗ trợ chức năng quản lý người dùng (RUM - Real User Monitoring) và cho phép những người dùng xây dựng những bài test sử dụng những dữ liệu dựa trên cơ chế quản lý người dùng (RUM based data) và những kịch bản ứng dụng cụ thể. 

***2. Giao diện phần mềm***

![](https://images.viblo.asia/53d4725e-3df2-41b5-9ad3-e3a2865ab411.png)

***3. Đặc điểm chính***

* Mang đến việc hỗ trợ đa nền tảng.
* Những công cụ có tính sáng tạo cao.
* Gắn liền với quá trình quản lý thực thi.
* Hoàn toàn sẵn sàng để sử dụng.

***4. Những điều bạn cần biết***

Soasta có thể coi như một người chơi lớn nhất trong không gian những công cụ test thực thi đơn giản (pure play), với doanh thu trên 75 triệu $. Nó cung cấp hỗ trợ đa nền tảng với CloudTest cho web, TouchTest cho điện thoại di động và mang đến quá trình quản lý thực thi tiền sau sản xuất bằng công cụ mPulse.

***5. Những liên kết review***
 
https://www.soasta.com/load-testing/
https://www.itcentralstation.com/products/soasta-cloudtest

***6. Giá***

Có hỗ trợ phiên bản free. Bản mất phí bắt đầu từ $2500 trên năm với 2 mức khác nhau. Tham khảo thêm tại liên kết: https://www.soasta.com/contact-us/#cloudtest

-----
Mình xin phép kết thúc phần 2 tại đây. Trong phần tiếp theo mình sẽ tiếp tục phân tích vài trò và liệt kê các công cụ test cho từng loại test đã phân loại trước đó. 
Bài viết dựa trên link tham khảo: https://www.qasymphony.com/blog/100-plus-best-software-testing-tools/ và có sự chắt lọc và tìm hiểu thêm về các chi tiết cụ thể được đề cập bên trong bài viết.