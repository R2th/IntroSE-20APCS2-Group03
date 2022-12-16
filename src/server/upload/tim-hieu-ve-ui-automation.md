![](https://images.viblo.asia/2a666184-4d20-4d4f-b629-96262f101129.jpg)
Thường mọi người sẽ nghĩ test UI nên manual test sẽ chính xác hơn. Nhưng không, giờ đây chúng ta đã có UI Automation. Nó sẽ giúp những QA kính cận như mình rất rất nhiều...
Vì vậy, chúng mình cùng thử tìm hiểu về UI Automation này chút nhé 
# I.Checklist về UI Automation:
![](https://images.viblo.asia/35deb4d9-9ae3-4923-a184-a5bab26ca575.png)

- Trước khi bắt đầu testing UI Automation, chúng ta sẽ tiến hành nghiên cứu về tính khả thi automation và chuẩn bị một test strategy.
- Nghiên cứu khả thi xác nhận liệu thử nghiệm automation testing có thể bao quát toàn bộ ứng dụng cần test hay không. Bằng cách làm như vậy, team QA có thể xác định liệu UI automation sẽ thành công hay không.
- Từ đây, QA nên tiếp tụp quá trình automation bằng cách chuẩn bị một checklist.
- Một checklist automation phác thảo các bước bạn nên làm theo để làm cho hành trình test automation của bạn thành công. Thực hiện theo các bước này sẽ đảm bảo quá trình chuyển từ giai đoạn thử nghiệm sang giai đoạn tiếp theo diễn ra suôn sẻ và hiệu quả.
- Dưới đây là checklist test automation UI tiêu chuẩn có thể được áp dụng trong bất kỳ dự án thử nghiệm nào:
![](https://images.viblo.asia/8e32ef2e-7e4c-4901-9d35-f0c6e6c8499a.png)
### 1. Initial consultation meeting
Nhóm QA và tất cả các bên liên quan tổ chức một cuộc họp với các chuyên gia automation để xác định:
  + Mục đích
  + Kế hoạch và các yêu cầu cho test automation.

### 2. Gathering requirements
  + Nhóm UI automation thu thập các yêu cầu dự án dựa trên kiến trúc và công nghệ được sử dụng để phát triển ứng dụng.
  + Trong giai đoạn này, các team test xác định kiến thức thử nghiệm và sản phẩm theo ý của họ để xác định xem có cần hỗ trợ kỹ thuật bên ngoài hay không.
  + Các yêu cầu được liệt kê được sử dụng để chọn một tool automation thích hợp. Tool automation mà giúp cho team testing dễ dàng thực hiện các mục tiêu thử nghiệm của họ.

### 3. List test cases
  + Test case cung cấp sự hiểu biết tốt hơn về cấu trúc và luồng logic trong giao diện.
  + Mô tả trực quan về cách một ứng dụng hoạt động và làm cơ sở cho scope và strategy của dự án 

### 4. Determine a UI test automation strategy
  +  Sau khi liệt kê testcase tiềm năng, chúng ta sẽ xác định các chiến lược tốt nhất để tiến hành kiểm tra UI automation.
  +  Điều này bao gồm các ngôn ngữ và data test sẽ được sử dụng.

### 5. Framework development
 + Sau khi phác thảo chiến lược automation, chúng ta sẽ tiến hành phát triển một framework cơ bản cho automation.
 + Các framework rất cần thiết cho sự thành công của bất kỳ dự án testing nào và chỉ nên được phát triển sau khi phân tích kỹ lưỡng về dự án.

### 6. Test script creation
+ QA sử dụng các test cases được nêu trong các giai đoạn ban đầu để tạo test scripts.

### 7. Test execution and analysis
+ Sau khi hoàn thành phát triển script, chúng được thực thi theo batches.
+  Trong bước này, điều quan trọng là phân tích kết quả 
+ Ngoài ra, hãy kiểm tra các lỗi để đảm bảo test script không bị failures

### 8. Demo and reporting
+ Bước cuối cùng của UI automation bao gồm tạo và trình bày các test reports.
+ Điều này được thực hiện sau khi hoàn thành bộ test để tạo điều kiện cho việc đào tạo các bên liên quan trong tương lai.
+ Lúc đầu chuyển từ test manual sang automation có vẻ khó khăn. Tuy nhiên, bằng cách làm theo các bước công phu này, bạn có thể dễ dàng vượt qua.

# II. Các tool test UI Automation
![](https://images.viblo.asia/7e782192-fdb9-420d-838e-1d9a76c4dd18.png)

+ Sự thành công của test automation phần lớn phụ thuộc vào sự lựa chọn các tool được sử dụng.
+ Với số lượng tool automation quá nhiều như hiện nay, chúng ta nên dành thời gian để đánh giá các tính năng và khả năng của các tool nữa nhé.
+ Bằng cách này, việc chọn một tool đáp ứng nhu cầu test  và mang lại lợi ích cho dự án sẽ trở nên dễ dàng hơn.

### 1. Một số cân nhắc để chọn được 1 tool UI automation phù hợp nhất:
+ Dễ dàng tạo và maintaining các test scripts, một tool có khả năng record and playback sẽ được đánh giá cao hơn
+ Dễ dàng nhâp data test lớn để load testing 
+ Dễ dàng thực hiện test bởi QA Non-tech.
+ Hỗ trợ cho các ứng dụng web, computer,smartphone.
+ Hỗ trợ cho cross-browser testing..
+ Có khả năng capture console logs,  take screenshots, and record videos
+ Có khả năng tạo test report.
### 2. Top 3 GUI Testing Tools
+ RAPISE by Inflectra (Refer: http://www.inflectra.com/Rapise/)
+ CrossBrowserTesting (Refer: https://link.sun-asterisk.vn/6scMK2)
+ Abbot Java GUI Test Framework (Refer: http://abbot.sourceforge.net/doc/download.shtml)

# III. Types of tests
![](https://images.viblo.asia/e13315d8-dd03-4e07-9fef-d4498ba5ad76.jpg)

Dựa trên các điều kiện được nêu ở trên, bạn có thể tự động hóa các loại test sau:
### 1. Unit tests
- Chúng được thiết kế để test các chức năng, phương thức riêng lẻ và tất cả các modultes
- Unit tests được thực hiện bởi các nhà phát triển trong giai đoạn thử nghiệm ban đầu và thường tốn ít chi phí để tự động hóa.

### 2. API tests
- API là một thành phần thiết yếu trong các ứng dụng hiện đại. Chúng tạo điều kiện giao tiếp giữa các modultes.
- API nên được test kỹ lưỡng để xác minh hiệu suất, chức năng, bảo mật 

### 3. Integration tests
- Integration tests được thực hiện để xác minh rằng các modultes khác nhau hoạt động tốt khi kết hợp với nhau. 

### 4. Functional tests
- Functional tests được thực hiện để xác minh xem tất cả các chức năng ứng dụng có hoạt động như mong đợi hay không.
- Tập trung vào các yêu cầu của dự án.

### 5. Regression tests
- Regression tests được thực hiện để xác minh rằng các thay đổi được đẩy vào cơ sở mã không ảnh hưởng đến các tính năng hiện có trong một ứng dụng.
- Mục đích là để kiểm tra xem mã cũ có hoạt động như trước khi các thay đổi được đưa ra hay không.

# IV. Những thách thức của UI Automation 
![](https://images.viblo.asia/194704d6-a539-4ef4-a13b-ab18eec327dc.jpg)

### 1. Tìm kiếm công cụ tự động hóa phù hợp
Thị trường ngày nay chứa đầy hàng tấn công cụ kiểm tra tự động hóa thương mại và nguồn mở. Mặc dù các công cụ này được thiết kế để hỗ trợ các loại thử nghiệm và công nghệ khác nhau, việc chọn đúng công cụ để hỗ trợ ứng dụng đang thử nghiệm trở thành một thách thức.

=> Do đó, điều quan trọng là phải thực hiện đủ nghiên cứu trước khi chọn một công cụ UI Automation. Chọn một công cụ tự động hóa phù hợp thỏa mãn nhu cầu kỹ thuật và kinh doanh của bạn sẽ giúp nỗ lực thử nghiệm của bạn hiệu quả hơn.

### 2. Có mức độ thích ứng  cao do UI thường thay đổi
Một thực tiễn phát triển phổ biến khi phát triển ứng dụng là tạo ra những thay đổi và cải tiến liên tục cho UI và logic ứng dụng.

=>  Điều này tạo ra một thách thức cho việc thích ứng test automation với những thay đổi đó.

### 3. Môi trường phát triển phức tạp
Cũng giống như trong kiểm tra giao diện người dùng thủ công, sự kết hợp ngày càng đa dạng của các thiết bị, hệ điều hành và phần mềm khác là một thách thức quan trọng khi test UI Automation.

### 4. Resources lành nghề
- Mọi người thường cho rằng UI automation có thể được thực hiện bởi bất kỳ ai. Điều này là hoàn toàn sai.
- Hầu hết các công cụ tự động hóa đòi hỏi một trình độ chuyên môn kỹ thuật đáng kể và kiến thức vững chắc về automation.
-  Không có các kỹ năng kỹ thuật cần thiết, tạo ra các kịch bản kiểm tra chính xác và duy trì trở thành một thách thức hàng đầu.

### 5. Chọn cách tiếp cận kiểm tra phù hợp
- Để kiểm tra giao diện người dùng thành công, bạn phải sử dụng đúng công cụ và sử dụng phương pháp tự động hóa chính xác. Điều này luôn luôn là một trong những mối quan tâm hàng đầu cho các kỹ sư test automation.
- Suy nghĩ về việc giảm effort không cần thiết để tạo và chạy các test scripts. Điều quan trọng đối với người thử nghiệm là phát triển một giải pháp tự động hóa phát hiện các vấn đề tự động và xác nhận lại các thử nghiệm mà không cần sự can thiệp của con người.
- Xem xét lựa chọn một phương pháp kiểm tra phù hợp là việc tạo ra các số liệu và báo cáo kiểm tra hữu ích.

### 6. Đầu tư trả trước cao
- Kiểm tra tự động là rất quan trọng để đảm bảo chất lượng trong phát triển nhanh ngày nay. Tuy nhiên, mặc dù phải trả rất nhiều về lợi ích lâu dài, chi phí thực hiện tự động hóa thử nghiệm trong các giai đoạn ban đầu thường cao.

# V. Giải pháp: Codeless UI Automation
- Giúp tăng tốc độ thử nghiệm do workflows trực quan
- Bảo trì và quản lý các test scrip phức tạp dễ dàng hơn nhờ công nghệ tự phục hồi dựa trên AI
- Tích hợp dễ dàng với các CI tool khác
- Chi phí bảo trì thử nghiệm thấp hơn
- Phạm vi tự động hóa cao
- Không yêu cầu kiến thức về lập trình
- Dễ dàng hơn khi thay đổi quy trình và tạo báo cáo

# VI. Tóm lại
- Test UI Automation là một cách hiệu quả và tiết kiệm chi phí để xác minh hiệu suất và chức năng của giao diện.
- Mặc dù thiết lập test UI automation và tạo các scripts cần thiết đòi hỏi một nỗ lực đáng kể, nhưng về lâu dài nó sẽ hợp lý hóa chu kỳ testing của bạn.
- Để thực hiện test automation một cách hiệu quả, nhóm QA của tổ chức cần có chuyên môn automation cần thiết. Nếu không, họ nên xem xét tư vấn bên ngoài.

# VII. Reference
https://en.wikipedia.org/wiki/Microsoft_UI_Automation

https://link.sun-asterisk.vn/Egs89y

https://www.uipath.com/solutions/technology/gui-automation