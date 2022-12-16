# I. Vòng Đời phát triển phần mềm
Kiểm thử phần mềm là hoạt động không thể tách rời với hoạt động phát triển phần mềm. Việc nắm rõ vòng đời phát triển mềm và vòng đời kiểm thử phần mềm sẽ giúp bạn có định hướng đúng đắn hơn và xây dựng hoạt động kiểm thử hiệu quả và phù hợp hơn.

![](https://images.viblo.asia/dd3e9187-c887-41f9-b783-ebdeb66c0d5f.PNG)

**Cụ thể:**

![](https://images.viblo.asia/7c5c7c80-bdc5-4eca-9113-8686b7c816f0.PNG)





# II. Mô hình phát triển phần mềm

## 1. Mô hình thác nước (Waterfall Model)
![](https://images.viblo.asia/2db927dc-30d0-412b-8f3f-778acbf13295.PNG)

Đây là mô hình phát triển phần mềm đầu tiên được sử dụng. Các giai đoạn sẽ được thực hiện tuần tự nối tiếp nhau. Đầu ra của giai đoạn trước là đầu vào của giai đoạn sau. Giai đoạn sau chỉ được thực hiện khi giai đoạn trước đã kết thúc và không được quay lại giai đoạn trước để xử lý các yêu cầu khi muốn thay đổi.

Các giai đoạn được thực hiện nối tiếp nhau như sau:

- **Requirements Definition**: Thu thập và phân tích yêu cầu được ghi lại vào tài liệu đặc tả yêu cầu trong giai đoạn này.

- **System and software design**: Phân tích thiết kế hệ thống phần mềm đáp ứng yêu cầu của khách hàng như trong tài liệu SRS.

- **Implementation and Unit Testing**: Hệ thống được phát triển theo từng unit và được tích hợp trong giai đoạn tiếp theo. Mỗi Unit được phát triển và kiểm thử bởi dev được gọi là Unit Test.

- **Integration and system testing**: Kiểm thử tích hợp và kiểm thử hệ thống  Công việc chính của giai đoạn này là kiểm tra và sửa tất cả những lỗi tìm được sao cho phần mềm hoạt động chính xác và đúng theo tài liệu đặc tả yêu cầu.

- **Operation and Maintenance**: Bảo trì hệ thống khi có bất kỳ thay đổi nào từ phía khách hàng, người sử dụng.
 
**Ứng dụng của mô hình**: Mô hình được ứng dụng cho các dự án nhỏ, ngắn hạn, những dự án ít có thay đổi yêu cầu của khách hàng và các yêu cầu của khách hàng phải rõ ràng.

**Nhược điểm của mô hình Waterfall**:
Thực tế cho thấy đến những giai đoạn cuối của dự án mới có khả năng nhận ra sai sót trong những giai đoạn trước và phải quay lại để sửa chữa.

## 2. Mô hình chữ V (V Model)
![](https://images.viblo.asia/81f7a908-7f79-4c11-989d-853e5447e17f.PNG)


- Là quy trình phát triển phần mềm mở rộng của quy trình phát triển phần mềm thác nước 
Toàn bộ quy trình được chia làm hai nhánh: Phát triển và kiểm thử 

- Mỗi giai đoạn phát triển sẽ tiến hành song song với một giai đoạn kiểm thử tương ứng => Các lỗi sẽ được phát hiện sớm ngay từ đầu 

- Tinh thần chủ đạo của V model là các hoạt động kiểm thử được tiến hành song song (theo khả năng có thể) ngay từ đầu chu trình cùng với các hoạt động phát triển

- Ví dụ: Các hoạt động cho việc lập kế hoạch kiểm thử toàn hệ thống có thể được thực hiện song song với các hoạt động phân tích và thiết kế hệ thống.

**Ứng dụng của mô hình này**: Các dự án ngắn và có yêu cầu rõ ràng ít có sự thay đổi, công nghệ sử dụng không thay đổi và được hiểu rõ bởi nhóm dự án.

**Nhược điểm của mô hình chữ V**:
So với các mô hình khác thì ở mô hình này công việc test đi sát hơn và ngay từ đầu khi bắt đầu phát triển. Chắc chắn chất lượng dự án sẽ tốt hơn. Nhưng tại sao người ta vẫn tiếp tục đưa ra mô hình phát triển khác? Vì ở mô hình chữ V này người ta vẫn phát triển cùng lúc cả hệ thống (nhiều yêu cầu, chức năng cùng lúc) mà rủi ro về thay đổi yêu cầu là rất lớn. Nên mô hình này vẫn có thể gặp rắc rối khi khách hàng thường xuyên thay đổi yêu cầu. Khó kiểm soát rủi ro.

## 3. Mô hình Agile (quy trình Scrum)
![](https://images.viblo.asia/96de411c-414e-4ea1-8348-d7ee059bbd59.png)


**Agile** là một phương pháp phát triển phần mềm linh hoạt để làm sao đưa sản phẩm đến tay người dùng càng nhanh càng tốt và được xem như là sự cải tiến so với những mô hình cũ. Mô hình này được ứng dụng với bất kỳ loại hình dự án nào, nhưng cần sự tham gia và tính tương tác của khách hàng. Được sử dụng khi khách hàng yêu cầu chức năng sẵn sàng trong khoảng thời gian ngắn.

**Scrum** là 1 dạng của mô hình Agile và là framework phổ biến nhất khi thực hiện mô hình Agile. Scrum là mô hình phát triển lặp đi lặp lại. Những khoảng lặp cố định thường kéo dài 1, 2 tuần được gọi là Sprint hay Iteration 

Chia các yêu cầu ra làm theo từng giai đoạn. Mỗi 1 giai đoạn(sprint) chỉ làm 1 số lượng yêu cầu nhất định.

- Mỗi một sprint kéo dài khoảng từ 1 tuần đến 4 tuần ( ko dài hơn 1 tháng).

- Đầu sprint sẽ lên kế hoạch làm những yêu cầu nào. Sau đó, sẽ thực hiện code và test. Cuối sprint là 1 sản phẩm hoàn thiện cả code lẫn test có thể demo và chạy được.

- Hoàn thành sprint 1, tiếp tục làm sprint 2, sprint... cho đến khi hoàn thành hết các yêu cầu.

- Trong mỗi 1 sprint thì sẽ có họp hàng ngày – daily meeting từ 15 – 20 phút. Mỗi thành viên sẽ báo cáo: Hôm qua tôi đã làm gì? Hôm nay tôi sẽ làm gì? Có gặp khó khăn gì không?

- Scrum là mô hình hướng khách hàng (Customer oriented).

**Ứng dụng của mô hình này**: Phù hợp với những dự án có sự thay đổi về yêu cầu/ nghiệp vụ của khách hàng, làm theo giai đoạn ngắn, có thể nhìn thấy những rủi ro, hay những điểm chưa phù hợp để thay đổi.

**Nhược điểm của quy trình Scrum**: 
Nhóm sản xuất phải có kỹ năng và hiểu biết về mô hình Agile, quy trình Scrum. Khó khăn trong việc xác định ngân sách và thời gian. 
# Kết Luận 

Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về vòng đời phát triển phần mềm và các mô hình phát triển phần mềm phổ biến. Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn về từng mô hình và biết dự án bạn đang làm áp dụng mô hình nào, nắm được ưu nhược điểm để hiểu rõ hơn về các mô hình này . Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học, tìm hiểu một cách tốt nhất!

Tài liệu tham khảo: https://techblog.vn/cac-mo-hinh-phat-trien-phan-mem