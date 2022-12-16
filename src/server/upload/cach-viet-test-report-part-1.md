Hôm nay chúng ta sẽ tìm ra câu trả lời cho những câu hỏi: Làm thế nào để viết Test Report? Tại sao nên viết Test Report? Test Report được chuẩn bị cho ai? Bài viết này sẽ hữu ích cho những chuyên gia không chỉ trong lĩnh vực kiểm thử phần mềm mà còn từ những lĩnh vực khác như Project Managers, Product Owners, Developers …

![](https://images.viblo.asia/c26c86c0-5566-400d-bd35-614a1c9c8f10.png)

### Trong phần này mình sẽ làm rõ về những câu hỏi sau: 

1. Test Report là gì, và tại sau chúng ta nên viết Test Report?
2. Test Report được chuẩn bị cho ai?
3. Ví dụ về thời gian làm Test Report (báo cáo kiểm thử)

## 1. Test Report là gì, và tại sau chúng ta nên viết Test Report?

Report (báo cáo) là mẫu tài liệu quan trọng và rút gọn về các thông tin thay đổi từ người thực thi tới khách hàng. Nhắc lại về quy trình kiểm thử phần mềm, chúng ta có những trạng thái sau: 
- Project creating (Khởi tạo dự án)
- Test Plan preparing Execute testing (Chuẩn bị kế hoạch kiểm thử)
- Test Case execution (Thực thi test case)
- Finding bugs (Tìm lỗi)
- Making reports (Làm báo cáo)

Như bạn có thể thấy các bản báo cáo được chuẩn bị có thể chứa các thông tin về hoạt động từ các trạng thái trước. Nên chúng ta có thể xác định Test Report như một tài liệu chứa các thông tin về các hành động đã được thực thi (Chạy test cases, phát hiện lỗi, thời gian bỏ ra...) và các kết quả của quá trình thực thi này (test case không thành công/thành công, số lượng bugs và crashes...)

Chúng ta có thật sự cần chuẩn bị Test Reports? Không nghi ngờ gì nữa câu trả lời là "Có". Thực tế có ít nhất 3 lý do cho việc chuẩn bị Test Reports: 
1. Bản Test Report tốt sẽ cho phép chúng ta (và không chỉ riêng chúng ta) có thể đánh giá trạng thái hiện tại của dự án cũng như chất lượng của sản phẩm. 
2. Có khả năng đưa ra những quyết định sáng suốt nếu cần thiết. 
3. Test Report có thể là tài liệu cuối cùng xác định việc sản phẩm đã sẵn sàng phát hành hay chưa. 

Chất lượng và tính minh bạch là điều kiện bắt tiên quyết để tạo ra một Test Report. Bởi vì đấy là chìa khóa cho khách hàng đánh giá được giá trị công việc của chúng ta


![](https://images.viblo.asia/28c522a8-e5f8-44f5-b7cd-976337128b7d.png)


## 2. Test Report được chuẩn bị cho ai?
Khi tạo một bản báo cáo, bạn phải hoàn toàn hiểu rõ bản báo cáo được viết cho ai, ai sẽ đọc nó. Dựa vào mức độ ưu tiên về người đọc mục tiêu, chúng ta cần phải xác định những thông tin nào bản báo cáo nên có. 
Có thể phân biệt được 3 nhóm mục tiêu sau: 

1. Technical users (Test managers)
Hiểu biết về quy trình kiểm thử, và cũng hiểu các vấn đề phát sinh như thế nào, và chúng được giải quyết ra sao, cấu trúc của quy trình kiểm thử, mô tả về các phương thức và công nghệ được áp dụng có một sự ưu tiên quan trọng đối với họ. 

2. Product Managers
Họ tập trung vào việc thực thi theo các mốc deadline (ngày kết thúc), kết quả kiểm thử thuần túy mà không quan tâm đến các chi tiết kỹ thuật và thông số tổng thế. 

3. Business Users (Product Owners) 
Như một điều luật, đây là những người đưa ra quyết định trong việc kết thúc kiểm thử. Họ cũng xác định chất lượng công việc đã hoàn thành. Điều quan trọng nhất với họ là kết quả cuối cùng, được chuyển thành dạng ngắn và rút gọn nhất (CÓ hay KHÔNG). Thông tin nên được trình bày dưới dạng trực quan (đồ thị, sơ đồ). Điều quan trọng là phải có ý kiến chuyên gia về khả năng phát hành sản phẩm mà không đi sâu vào chi tiết. 

Tất nhiên, hầu như không thể viết một báo cáo mà sẽ phù hợp với tất cả các nhóm. Đó là lý do tại sao phải chắc chắn xác định đối tượng mục tiêu trước khi chuẩn bị một báo cáo kiểm thử. Tùy thuộc vào nó, nội dung sẽ rất khác nhau về cấu trúc và chứa các chi tiết khác nhau cần thiết cho nhóm cụ thể.

![](https://images.viblo.asia/4fac2397-c532-491f-89b7-e2e7eaef814a.png)

## 3. Ví dụ về thời gian báo cáo kiểm thử

Test Report (Báo cáo kiểm thử) có thể được chia thành hai loại liên quan đến thời gian: giữa và cuối

Test Report ở khoảng thời gian giữa dự án nên thể hiển tiến độ công việc. Tiến độ không thay đổi nhưng linh động và được xác định bằng cách so sánh trạng thái của dự án ở các khoảng thời gian khác nhau (ngày, tuần, tháng). Trên thực tế, tiến độ là tập hợp các số liệu nhằm hiểu rõ các giai đoạn của dự án như thế nào.

Số liệu được tạo ra riêng biệt cho từng dự án, dựa trên các mục tiêu đã được xác định cho việc kiểm thử thành công. Chúng cho phép tạo ra sự so sánh tổng thế cho dự án một cách đủ nhanh.

Phiên bản của Test Report là một điều quan trọng khác và thường được dùng cho các báo cáo ở khoảng thời gian giữa dự án. Nó mô tả các nhiệm vụ được thực hiện bởi đội ngũ kiểm thử cho một phiên bản cụ thể của sản phẩm. 

Bản báo cáo cuối cùng cho thấy một cái nhìn chung về công việc đã thực hiện (trong bối cảnh các thước đo chỉ số đã được thiết lập) và sự tiến triển của sản phẩm. Ngoài ra bạn cần phải cung cấp thông tin đầy đủ về trạng thái của sản phẩm tại thời điểm đó ( số lượng lỗi chưa sửa, liệu sản phẩm đã được kiểm thử đầy đủ chưa, hay là cần thêm chu kỳ kiểm thử nữa, độ sẵn sàng của sản phẩm cho việc phát hành)...


Trong bài viết sau về Test Report, mình sẽ nói chi tiết về nội dung của 1 Test Report, các gợi ý về các viết Test Report kèm theo ví dụ. 

### Tài Liệu Tham Khảo: 

https://geteasyqa.com/qa/write-test-report/

Link phần 2: https://viblo.asia/p/cach-viet-test-report-part-2-end-LzD5dDYY5jY