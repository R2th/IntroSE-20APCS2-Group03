![](https://images.viblo.asia/dcb067d9-825c-4f74-9e9d-2b83ad2ae62f.png)
## 1. Mở đầu
* Tạo dựng một hệ thống phần mềm rất giống với việc xây dựng một tòa nhà. Nếu nền tảng không vững chắc, các vấn đề cấu trúc có thể làm suy yếu tính toàn vẹn và chức năng của tòa nhà đó.
* Khi xây dựng các giải pháp công nghệ trên Amazon Web Services (AWS), bạn không nên bỏ qua 5 pillars (“trụ cột”) chính trong khung kiến trúc của AWS (AWS Well-Architected), đó là: 
    * **Operational excellence** (hoạt động xuất sắc)
    * **Security** (tính bảo mật)
    * **Reliability** (tính ổn định)
    * **Performance efficiency** (tính hiệu quả) 
    * **Cost optimization** (tối ưu hóa chi phí). 
* Việc xây dựng một hệ thống đáp ứng mong đợi và yêu cầu của từng cá nhân, công ty hay tổ chức đều là một thách thức. Nếu biết kết hợp những “trụ cột” này vào kiến trúc của bạn, sẽ tạo ra các hệ thống ổn định và hiệu quả. Điều này cho phép bạn tập trung vào các khía cạnh khác của thiết kế, chẳng hạn như các yêu cầu chức năng.
* AWS Well-Architected Framework giúp các kiến trúc sư cloud xây dựng cơ sở hạ tầng an toàn, hiệu suất cao, linh hoạt và hiệu quả nhất có thể cho các ứng dụng của họ. Framework này cũng cung cấp cách hướng dẫn để triển khai các thiết kế mở rộng tùy vào nhu cầu ứng dụng của bạn theo thời gian.

![](https://images.viblo.asia/017e96c7-6a81-47a6-bed8-7e300dd04f68.png)


## 2. Operational Excellence
> Cột trụ **vận hành xuất sắc** tập trung vào việc chạy và theo dõi các hệ thống để mang lại giá trị cho doanh nghiệp và liên tục cải tiến các quy trình và thủ tục. Các chủ đề chính bao gồm quản lý và tự động hóa những thay đổi, phản hồi sự kiện và xác định tiêu chuẩn để quản lý thành công các hoạt động hàng ngày.
### Design Principles
Có 6 nguyên tắc để mọi hoạt động trong cloud có thể vận hành xuất sắc: 
*   **1. Perform operations as code:**

Trong Cloud, chúng ta có thể áp dụng cùng một khung kỹ thuật sử dụng cho application code lên toàn bộ môi trường của mình. Bạn có thể xác định toàn bộ khối lượng công việc của mình (bao gồm ứng dụng, cơ sở hạ tầng, v.v.) dưới dạng code và cập nhật nó bằng code. Nhờ đó các quy trình hoạt động được kịch bản hóa, đồng thời quá trình đó cũng được tự động hóa bằng cách kích hoạt chúng để đáp ứng các sự kiện (events). Lợi ích đem lại từ việc thực hiện các hoạt động dưới dạng code là hạn chế lỗi của con người và cho phép phản hồi nhất quán cho các sự kiện
* **2. Annotate documentation**

Trong môi trường on-premises, tài liệu thường được tạo thủ công bằng tay, được mọi người sử dụng và khó có thể đồng bộ được với tốc độ thay đổi. Trong Cloud, bạn có thể tự động hóa việc tạo tài liệu có chú thích sau mỗi lần xây dựng (hoặc tự động chú thích tài liệu thủ công). Annotate documentation có thể được sử dụng bởi cả con người và các hệ thống. 
* **3. Make frequent, small, reversible changes**

Thiết kế khối lượng công việc để cho phép từng thành phần đều được cập nhật thường xuyên. Thực hiện thay đổi theo từng bước nhỏ có thể quay ngược lại các bước nếu gặp thất bại (mà giảm thiểu ảnh hưởng đến khách hàng nhất có thể).
* **4. Refine operations procedures frequently**

Khi bạn sử dụng các quy trình hoạt động, hãy luôn nghĩ cách để cải thiện chúng. Khi khối lượng công việc gia tăng, quy trình hoạt động cũng cần phát triển một cách thích hợp.
* **5. Anticipate failure**

Thực hiện“pre-mortem” exercises nhằm xác định các thất bại tiềm tàng để có thể loại bỏ hoặc giảm thiểu. Kiểm tra các kịch bản thất bại và xác nhận bạn đã hiểu hết các tác động của chúng; kiểm tra cả các quy trình phản hồi để đảm bảo rằng chúng có hiệu quả. 
* **6. Learn from all operational failures**

Khi thất bại xảy ra, cần rút ra  bài học kinh nghiệm và cải thiện hoạt động

## 3. Security
> Cột trụ **bảo mật** tập trung vào việc bảo vệ thông tin và hệ thống. Các chủ đề chính bao gồm tính bảo mật và toàn vẹn của dữ liệu, xác định và quản lý ai có thể làm gì nhờ quản lý đặc quyền, bảo vệ hệ thống và thiết lập hoạt động kiểm soát để phát hiện sự kiện bảo mật.

### Design Principles

Có 7 nguyên tắc để trong cột trụ bảo mật : 

- **1. Implement a strong identity foundation:** 

Thực hiện nguyên tắc cấp ít đặc quyền nhất và thực thi chia nhỏ nhiệm vụ với ủy quyền phù hợp cho mỗi tương tác tới tài nguyên AWS. Tập trung quản lý đặc quyền và giảm hoặc thậm chí loại bỏ hẳn sự phụ thuộc vào các xác thực dài hạn.

* **2. Enable traceability**:

Giám sát, cảnh báo và kiểm tra mọi hành động và thay đổi trong môi trường của bạn trong thời gian thực. Tích hợp nhật ký (logs) và số liệu (metrics) với các hệ thống để tự động phản hồi và đưa ra hành động. 
 
* **3. Apply security at all layers**: 

Thay vì chỉ tập trung vào bảo vệ một lớp bên ngoài duy nhất, hãy áp dụng phương pháp bảo vệ chuyên sâu. Áp dụng bảo mật cho tất cả các lớp (ví dụ: mạng biên, VPC, mạng con, bộ cân bằng tải, các instance, hệ điều hành và ứng dụng,....).

* **4. Automate security best practices**: 

Các cơ chế bảo mật dựa trên phần mềm tự động cho phép bạn mở rộng quy mô một cách an toàn, nhanh hơn và tiết kiệm chi phí hơn. 

* **5. Protect data in transit and at rest**: 

Phân loại dữ liệu của bạn thành các mức độ nhạy cảm khác nhau; sử dụng các cơ chế, chẳng hạn như mã hóa, token và kiểm soát truy cập khi thích hợp. 

* **6. Keep people away from data**: 

Tạo các cơ chế và công cụ để giảm hoặc loại bỏ nhu cầu truy cập trực tiếp hoặc xử lý dữ liệu thủ công. Điều này giúp giảm nguy cơ mất mát hoặc bị sửa đổi khi xử lý dữ liệu nhạy cảm.

* **7. Prepare for security events**: 

Thực hiện mô phỏng phản ứng sự cố; sử dụng các công cụ tự động hóa để tăng tốc độ phát hiện, điều tra và phục hồi hệ thống.

## 4. Reliability

> Cột trụ độ **tin cậy** cập trung vào khả năng ngăn chặn và nhanh chóng phục hồi sau sự cố để đáp ứng nhu cầu của doanh nghiệp và khách hàng. Các chủ đề chính bao gồm các yếu tố nền tảng xung quanh vấn đề cài đặt, các yêu cầu xuyên suốt dự án, lập kế hoạch phục hồi và cách chúng tôi xử lý thay đổi.>

### Design Principles
Có 5 nguyên tắc để đảm bảo tính tin cậy trong cloud: 
* **1. Test recovery procedures**: 

Trong môi trường on-premises, việc kiểm tra thường được tiến hành để chứng minh hệ thống hoạt động theo một kịch bản cụ thể. Trong cloud, bạn có thể kiểm tra hệ thống của mình bị lỗi như thế nào đồng thời xác thực các quy trình khôi phục của mình. Bạn có thể sử dụng tự động hóa để mô phỏng các thất bại khác nhau hoặc để tạo lại các tình huống dẫn đến thất bại trước đó. Tính năng này cho phép bạn có thể kiểm tra và khắc phục trước một kịch bản thất bại thực tế.
* **2. Automatically recover from failure**: 

Bằng cách tạo một hệ thống giám sát các chỉ số đánh giá thực hiện công việc (KPI), bạn có thể kích hoạt tự động hóa khi ngưỡng đặt ra bị vi phạm. Các KPI này phải là thước đo giá trị kinh doanh, không phải là khía cạnh kỹ thuật trong hoạt động của dịch vụ. Điều này cho phép tự động thông báo và theo dõi các lỗi xảy ra.
* **3. Scale horizontally to increase aggregate system availability**:  

Thay thế một tài nguyên lớn bằng nhiều tài nguyên nhỏ để giảm tác động của một lỗi duy nhất lên toàn bộ hệ thống. 
* **4. Stop guessing capacity**: 

Một nguyên nhân phổ biến dẫn đến sập hệ thống là sự bão hòa tài nguyên, xảy ra khi các yêu cầu gửi đến một hệ thống vượt quá khả năng của hệ thống đó (đây thường là mục tiêu của các cuộc tấn công từ chối dịch vụ). Cloud cung cấp tính năng cho phép bạn theo dõi nhu cầu và việc sử dụng hệ thống, Chúng có thể tự động hóa việc thêm hoặc xóa tài nguyên để duy trì mức tối ưu nhằm đáp ứng nhu cầu mà không cần cung cấp quá mức hoặc dưới mức cung cấp. 
* **5. Manage change in automation**: 

Nên thay đổi cơ sở hạ tầng thông qua tự động hóa.

## 5. Performance Efficiency
> Cột trụ **hiệu suất thực hiện** tập trung vào việc sử dụng tài nguyên CNTT và điện toán một cách hiệu quả. Các chủ đề chính bao gồm chọn đúng loại và quy mô tài nguyên dựa vào yêu cầu khối lượng công việc, theo dõi hiệu suất và đưa ra quyết định sáng suốt để duy trì hiệu suất khi nhu cầu kinh doanh tăng lên.
### Design Principles
Có 5 nguyên tắc để đảm bảo hiệu suất thực thi trong cloud: 
* **1. Democratize advanced technologies**: 

Các công nghệ khó thực hiện có thể trở nên dễ ứng dụng khi sử dụng cloud. Thay vì cần phải học từ đầu một công nghệ mới, bạn có thể đơn giản sử dụng nó như một dịch vụ. 
* **2. Go global in minutes**: 

Dễ dàng triển khai hệ thống của bạn trên nhiều AWS Regions với quy mô toàn thế giới chỉ bằng vài cú nhấp chuột. Điều này cho phép bạn cung cấp độ trễ thấp hơn và trải nghiệm tốt hơn cho khách hàng với chi phí tối thiểu.
* **3. Use serverless architectures**: 

Trong cloud, các kiến trúc serverless giúp bạn loại bỏ gánh nặng của việc quản lý, bảo trì các máy chủ và cũng có thể giảm chi phí giao dịch vì các dịch vụ được quản lý này hoạt động ở quy mô đám mây. 
* **4. Experiment more often**: 

Với tài nguyên ảo và tự động hóa, bạn có thể nhanh chóng thực hiện kiểm tra so sánh bằng cách sử dụng các loại instance, các hình thức lưu trữ hoặc cấu hình khác nhau.
* **5. Mechanical sympathy**: 

Sử dụng phương pháp công nghệ phù hợp nhất với nhu cầu và mục đích của bạn. 

## 6. Cost Optimization
> **Tối ưu hóa chi phí** tập trung vào việc tránh những chi phí không cần thiết. Các chủ đề chính bao gồm hiểu và kiểm soát tiền đang được chi tiêu vào đâu, chọn số loại tài nguyên đúng đắn và phù hợp nhất, phân tích chi tiêu theo thời gian và thay đổi quy mô để đáp ứng nhu cầu kinh doanh mà không chi tiêu quá mức.

### Design Principles
Có 5 nguyên tắc để tối ưu hóa chi phí trong cloud: 
* **1. Adopt a consumption model**:

Chỉ trả tiền cho các tài nguyên mà bạn tiêu thụ; tăng hoặc giảm mức sử dụng tùy thuộc vào yêu cầu kinh doanh. 
* **2. Measure overall efficiency**: 

Tính toán lượng kinh doanh của hệ thống và các chi phí liên quan đến việc cung cấp nó. Sử dụng biện pháp này để nắm rõ lợi nhuận bạn kiếm được từ việc tăng sản lượng và giảm chi phí.
* **3. Stop spending money on data center operations**: 

AWS thực hiện rất nhiều công việc như hỗ trợ, sắp xếp và cung cấp năng lượng cho các máy chủ, vì vậy bạn có thể tập trung vào khách hàng và các dự án kinh doanh hơn là vào cơ sở hạ tầng CNTT. 
* **4. Analyze and attribute expenditure**: 

Cloud giúp dễ dàng xác định chính xác nhu cầu sử dụng và chi phí phải trả của các hệ thống, từ đó cho phép phân bổ minh bạch chi phí CNTT cho từng luồng doanh thu, cung cấp cho chủ sở hữu hệ thống cơ hội để tối ưu hóa tài nguyên của họ và giảm chi phí.
* **5. Use managed services to reduce cost of ownership**: 

Vì các dịch vụ được quản lý hoạt động ở quy mô cloud, chúng có thể cung cấp chi phí thấp hơn cho mỗi giao dịch hoặc dịch vụ.

## References
* https://d1.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf
* https://aws.amazon.com/blogs/apn/the-5-pillars-of-the-aws-well-architected-framework/