![](https://images.viblo.asia/eb0a7c78-780d-4704-90a7-891ff81f7934.jpg)

***Kiểm thử***    thực chất là một quy trình hơn là một hoạt động đơn lẻ. Quá trình này bắt đầu từ việc lập kế hoạch kiểm thử, sau đó là thiết kế các trường hợp kiểm thử, chuẩn bị cho việc thực thi và đánh giá kết quả thực thi cho đến  khi kết thúc hoạt động kiểm thử. Trong bài này viết này, mình sẽ giới thiệu đến các bạn quy trình kiểm thử cơ bản cho 1 dự án kiểm thử phần mềm. Về cơ bản thì gồm các bước sau đây:

1.  **Lập kế hoạch và kiểm soát việc kiểm thử**
2.  **Phân tích và Thiết kế**
3.  **Thực thi và Chạy test**
4.  **Đánh giá Exit criteria and Báo cáo**
5.  **Đóng hoạt động kiểm thử**

![](https://images.viblo.asia/fbdb3704-fdb3-4268-a8d1-6ae068a1746a.jpg)


Sau đây, mình sẽ đi chi tiết vào từng phần nhé.
## 1.  **Lập kế hoạch và kiểm soát việc kiểm thử**

### Lập kế hoạch kiểm thử theo các bước quan trong sau:
   i.  Xác định scope, risk và mục đich của hoạt động kiểm thử
   
   ii. Xác định các tiếp cận kiểm thử
   
   iii. Xác định quy định kiểm thử hoặc chiến lượng kiểm thử 
   
   iv. Xác định yêu cầu về nguồn nhân lực như con người, môi trường kiểm thử, thiết bị,...
   
   v.  Lên lịch trình cho việc phân tích kiểm thử và thiêt kế các trường hợp kiểm thử, thực thi kiểm thử và đánh giá kết quả kiểm thử.  
   
   vi. Xác định các tiêu chí kết thúc việc kiểm thử
   
   ![](https://images.viblo.asia/598b93de-16a0-46af-889c-6f371a99a889.jpg)
   
### Kiểm soát kiểm thử theo các nhiệm vụ quan trọng đây:
   i.  Đo lường và phân tích các kết quả của hoạt động kiểm thử
   
   ii.  Theo dõi và ghi lại tiến độ, độ bảo phủ của kiểm thử và  các tiêu chí kết thúc kiểm thử
   
   iii. Cung cấp các thông tin, tài liệu  cho việc kiểm thử
   
   iv. Tiến hành các hành động khắc phục nếu cần thiết
   
   v.  Đưa ra quyết định
   
## 2.  **Phân tích và Thiết kế**

![](https://images.viblo.asia/95a46174-6fed-4be1-a070-fcdc97bd5311.jpg)

Hoạt động ***phân tích***  và ***thiết kế***  kiểm thử có các nhiệm vụ chủ yếu sau đây:

   i.  Rà soát các yêu cầu cần thiết trước khi tiến hành kiểm thử như tài liệu đặc tả, tài liệu thiết kế, tài liệu giao diện, v.v
   
   ii.  Xác định các điều kiện kiểm thử
   
   iii. Thiết kế test case
   
   iv. Đánh giá tính khả thi trong việc kiểm thử của yêu cầu cũng như của hệ thống.
   
   v. Chuẩn bị môi trường test cũng như xác định các yêu cầu về cơ sở hạ tầng và các công cụ kiểm thử tương ứng.

## 3.  **Thực thi và Chạy test**
Trong phần thực thi và chạy test, chúng ta sẽ đưa ra các điều kiện kiểm thử trong mỗi trường hợp kiểm thử , các thủ tục  kiểm tra và các phần mềm testware khác như kịch bản cho tự động hóa, môi trường kiểm thử và bất kỳ cơ sở hạ tầng kiểm thử nào khác.

### Việc thực hiện test có nhiệm vụ chủ yếu sau đây:
   i.  Sử dụng các kĩ thuật kiểm thử và tạo các dữ liệu kiểm thử để phát triển và đưa ra độ ưu tiên các trường hợp kiểm thử
   
   ii.  Tạo test suites từ các trường hợp kiểm thử để thực hiện kiểm thử hiệu quả.
   
   iii. Thực hiện và xác minh môi trường
   
![](https://images.viblo.asia/2eb0aa54-0fc7-412c-a5c5-9d935055a336.jpg)

###    Hoạt động chạy test có nhiệm vụ chủ yếu sau đây:

   i.  Thực thi test suites và trường hợp kiểm thử riêng lẻ theo các phương thức kiểm thử
   
   ii.  Chạy lại các case bị failed trước đó để xác nhận là case đó đã được sửa
   
   iii. So sách kết quả ghi nhận được khi thực thi với kết quả mong đợi
   
   iv.  Đánh giá kết quả kiểm thử (Passed/Failed) cho các trường hợp kiểm thử
   
   v.  Viết báo cáo lỗi cho những trường hợp kết quả ghi nhận được và kết quả mong đợi không giống nhau
## 4.  **Đánh giá Exit criteria and Báo cáo**

Dựa trên đánh giá rủi ro của dự án, chúng ta sẽ thiết lập các tiêu chí cho từng hoạt động kiểm thử tương ứng để từ đó có thể xác định được liệu kiểm thử đã đủ hay chư.Những tiêu chí này khác nhau tùy từng dự án và được gọi tiêu chí kết thúc kiểm thử (**exit criteria**). 
Các tiêu chí này bao gồm:

   i.  Số lượng test case tối đa được thực thi Passed
   
   ii.  Tỷ lệ lỗi giảm xuống dưới mức nhất định
   
   iii. Khi đến deadline
   
   ![](https://images.viblo.asia/8a5492dd-9572-4e71-a4cb-90c85aa3890f.jpg)
   
### Việc đánh giá  Exit criteria gồm các nhiệm vụ chủ yếu sau:

   i.  Đối chiếu kết quả thực thi test case so với các tiêu chí kết thúc kiểm thử được định ra trong lúc lập kế hoạch kiểm thử
   
   ii.  Từ đó, đánh giá xem liệu có cần phải test thêm hay điều chỉnh các tiêu chí kết thúc kiểm thử trong bản kế hoạch
   
   iii. Viết báo cáo tóm tắt hoạt động kiểm thử cũng như kết quả kiểm thử cho các bên liên quan.

## 5.  **Đóng hoạt động kiểm thử**

![](https://images.viblo.asia/ef1afd4b-4231-4246-8a12-2e3cfb01ae2e.png)

Các hoạt động kiểm thử thường chỉ được kết thức khi các phần mềm được bàn giao cho khách hàng. Ngoài ra, hoạt đông kiểm thử có thể kết thức trong các trường hợp sau:

- Khi tất cả các thông tin đã được thu thập đầy đủ cho hoạt động kiểm thử
- Khi 1 dự án bị hủy bỏ
- Khi các mục tiêu chính đã hoàn thành
- Khi việc bảo trì hoặc cập nhật đã hoàn thành

### Việc đóng hoạt động kiểm thử gồm các nhiệm vụ chủ yếu sau:

   i.  Kiểm tra  khách hàng được nhận sản phẩm theo dự kiến từ đầu  và đảm bảo rằng tất cả sự cố đã được giải quyết
   
   ii.  Hoàn thiện và lưu trữ phần mềm testware như scripts, môi trường kiểm thử,... để sau này sử dụng lại 
   
   iii. Bàn giao lại testware cho đội bảo trì
   
   iv.  Đánh giá cách kiểm thử và đưa ra  bài học cho lần phát hành và các dự án khác trong tương lai 

### Kết luận:

*Mình vừa giới thiệu đến các bạn qui trình kiểm thử phần mềm cơ bản trong hoạt động kiểm thử. Qui trình kiểm thử phần mềm có thể khác nhau nhiều ít tùy vào công ty, tổ chức hay tiêu chuẩn chất lượng, nhưng chúng đều có chung một mục đích là đảm bảo hoạt động kiểm thử diễn ra nhất quán và xuyên suốt. Trong một số trường hợp bạn có thể thay đổi qui trình khi test nhưng đa phần việc bạn tuân thủ những qui trình kiểm thử là gần như bắt buộc trong các dự án kiểm thử.*

*Nguồn* : http://istqbexamcertification.com/what-is-fundamental-test-process-in-software-testing/