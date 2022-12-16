Trong quá trình thực hiện kiểm thử dự án áp dụng automation test, rất có thể bạn sẽ gặp phải một câu hỏi như sau:

![](https://images.viblo.asia/ce516eef-8b7f-4254-ba07-ba0bde4f8f87.jpg)

Câu trả lời cho câu hỏi này là không hề đơn giản vì có nhiều yếu tố cần xem xét:

* Bạn muốn hỗ trợ các hoạt động thử nghiệm của mình bằng công cụ phần mềm, nhưng bạn không biết các công cụ hiện có trên thị trường
* Loại công cụ nào phù hợp nhất với yêu cầu và ngân sách dự án?
* Ai trong nhóm có kỹ năng sử dụng công cụ khi bạn đã mua nó

Bài viết này sẽ giúp bạn trả lời các câu hỏi trên

# 1. Tầm quan trọng của việc lựa chọn công cụ kiểm thử phần mềm

Thành công trong bất kỳ dự án test automation nào phụ thuộc vào việc xác định đúng công cụ (tool). Việc chọn Công cụ kiểm tra **“đúng”** cho dự án của bạn là một trong những cách tốt nhất để đạt được mục tiêu dự án. Ví dụ sau sẽ cho bạn thấy lợi ích của việc lựa chọn công cụ kiểm tra

Trong dự án Guru99 Bank, để tiết kiệm công sức kiểm thử, nhóm dự án đã quyết định sử dụng một công cụ kiểm tra tự động để thực hiện thử nghiệm. Sau nhiều cuộc họp, nhóm của bạn đã chọn một công cụ phù hợp cho dự án.

Một tháng sau, bạn đã nhận được báo cáo từ nhóm dự án về công cụ này như sau

![](https://images.viblo.asia/967af1ac-3a76-4f4c-ad9e-e7ea8c1a7777.png)


Từ báo cáo trên, bạn có thể kết luận đây là một kết quả thật tuyệt vời. Công cụ tự động mới tăng gấp đôi năng suất thử nghiệm. Điều đó có nghĩa là chúng tôi đã tiết kiệm được 50% chi phí thực hiện kiểm thử. Chọn công cụ kiểm tra phù hợp giúp bạn cải thiện năng suất của dự án và tiết kiệm chi phí dự án.

# 2. Các loại công cụ kiểm thử

Có nhiều loại công cụ kiểm thử mà bạn có thể xem xét khi chọn các công cụ kiểm tra:

![](https://images.viblo.asia/1021ed49-0d8d-4e93-96f8-25cfe9cf72f4.png)

## Open-Source Tools

Các công cụ nguồn mở là chương trình trong đó mã nguồn được công bố công khai để sử dụng hoặc sửa đổi từ thiết kế ban đầu của nó. Các cộng cụ này là miễn phí.

Các công cụ mã nguồn mở có sẵn cho hầu hết các giai đoạn của quá trình thử nghiệm, từ quản lý Test Case đến Tracking Defect. So với các công cụ thương mại Các công cụ nguồn mở có thể có ít tính năng hơn.

## Commercial Tools

Công cụ thương mại là phần mềm được sản xuất để bán hoặc phục vụ cho mục đích thương mại.

Các công cụ thương mại có thêm hỗ trợ và nhiều tính năng hơn từ một nhà cung cấp hơn các công cụ nguồn mở.

## Custom Tools

Trong một số dự án Thử nghiệm, môi trường thử nghiệm và quy trình thử nghiệm có các đặc điểm đặc biệt. Không có công cụ mã nguồn mở hoặc thương mại nào có thể đáp ứng yêu cầu. Do đó, quản lý dự án phải xem xét việc phát triển công cụ tùy chỉnh.

Ví dụ: Bạn muốn tìm một công cụ kiểm tra cho dự án Guru99 Bank. Bạn muốn công cụ này đáp ứng một số yêu cầu cụ thể của riêng dự án như sau:

![](https://images.viblo.asia/c5f2acc2-ca75-44d9-bf19-80fbd1c558cd.jpg)

# 3. Phân tích tính khả thi khi thực hiện automation

Quay lại ví dụ trên, nhóm dự án đã quyết định phát triển một công cụ tùy chỉnh có thể đáp ứng các yêu cầu của dự án. Giả sử họ đã được đưa ra 100 trường hợp thử nghiệm để tự động hóa và họ ước tính 5 ngày để phát triển một công cụ có thể tự động hóa tất cả các trường hợp thử nghiệm đó.

Đây là kết quả của công việc của họ

![](https://images.viblo.asia/537741cf-1c7c-4692-acce-ffcfcb7f3d63.jpg)

Trong kịch bản trên, vấn đề gặp phải đó là công cụ kiểm tra không thể automation hết tất cả các trường hợp kiểm thử đã vạch ra. Nó có nghĩa là không phải tất cả các tính năng, ứng dụng đều có thể được kiểm thử kỹ lưỡng bằng công cụ kiểm tra.

Nếu chức năng của ứng dụng dưới kiểm tra thay đổi thường xuyên hoặc quá phức tạp , rất khó để automation test cho tất cả các tính năng của ứng dụng, bởi vì mọi công cụ đều có những hạn chế riêng của nó .

Nếu bạn không muốn ở trong tình huống như vậy, trước khi chọn công cụ kiểm tra, bạn phải phân tích các trường hợp thử nghiệm và quyết định các trường hợp thử nghiệm nào sẽ được tự động hóa và các trường hợp thử nghiệm nào không nên. Hoạt động này được gọi là phân tích tính khả thi khi thực hiện automation.

Phân tích tính khả thi khi thực hiện automation có vai trò rất quan trọng trong kiểm thử. Trong bước này, bạn cần phải kiểm tra xem ứng dụng được kiểm thử có đủ điều kiện để thực hiện test automation hay không.

Một số yếu tố bạn cần cân nhắc bao gồm:

- Tính khả thi về mặt kĩ thuật
- Độ phức tạp
- Tính ổn định của ứng dụng cần test
- Test data
- Kích thước dự án
- Khả năng tái sự dụng của automated scrip
- Khả năng execute với nhiều môi trường...

![](https://images.viblo.asia/cfa3d961-58c8-4ca4-b674-4a467e726b34.png)

# 4. Quy trình lựa chọn công cụ

Để chọn công cụ kiểm tra phù hợp nhất cho dự án, Trình quản lý kiểm tra phải thực hiện theo quy trình chọn công cụ dưới đây

![](https://images.viblo.asia/7ec2580a-7dde-4fa2-b326-d1d00361949b.png)

## Bước 1) Xác định yêu cầu cho công cụ

Làm thế nào bạn có thể chọn một công cụ kiểm tra nếu bạn không biết những gì bạn đang tìm kiếm?

![](https://images.viblo.asia/02fc6657-6137-4488-beef-22534855067f.jpg)

Bạn để xác định chính xác các yêu cầu công cụ kiểm tra của bạn. Tất cả các yêu cầu phải được tài liệu hóa và xem xét  bởi các nhóm dự án và quản lý dự án.

Ví dụ:

Bạn mong đợi gì từ công cụ này? 

*  Công cụ có thể tự động tạo các trường hợp thử nghiệm
*  Công cụ có thể tạo kết quả kiểm tra theo định dạng mong muốn 
*  Trình kiểm tra có thể chọn các trường hợp thử nghiệm nào để thực thi với tập dữ liệu thử nghiệm đã cho 
*  Công cụ có thể tự động thực hiện test 
*  Công cụ có thể đánh giá và thực hiện xác nhận đầu ra thử nghiệm và các trường hợp kiểm tra được đánh dấu là Pass hay Faild
 
##  Bước 2) Đánh giá các công cụ và nhà cung cấp

Sau khi phân tích yêu cầu của công cụ, Test Manager nên:

* Phân tích các công cụ thương mại và mã nguồn mở có sẵn trên thị trường, dựa trên yêu cầu của dự án.
* Tạo danh sách rút gọn công cụ đáp ứng tốt nhất tiêu chí của bạn
* Một yếu tố bạn nên xem xét là nhà cung cấp. Bạn nên xem xét danh tiếng của nhà cung cấp, hỗ trợ sau bán hàng, tần suất cập nhật công cụ, v.v. trong khi quyết định.
* Đánh giá chất lượng của công cụ bằng cách sử dụng thử nghiệm và khởi chạy thử nghiệm . Nhiều nhà cung cấp thường có phiên bản dùng thử của phần mềm của họ

## Bước 3) Ước tính chi phí và lợi ích

Để đảm bảo công cụ kiểm tra mang lại lợi ích cho doanh nghiệp cần phải cân bằng các yếu tố sau:

![](https://images.viblo.asia/88a59b9b-7d12-46dd-a009-fdc02a759025.png)

Một phân tích chi phí-lợi ích nên được thực hiện trước khi mua hoặc xây dựng một công cụ

Ví dụ: Sau khi dành thời gian đáng kể để điều tra các công cụ kiểm tra, nhóm dự án đã tìm thấy công cụ kiểm tra hoàn hảo cho trang web của dự án Guru99 Bank. Kết quả đánh giá kết luận rằng công cụ này có thể

* Tăng gấp đôi  năng suất hiện tại của việc thực hiện kiểm tra
* Giảm  30% công sức quản lý
Tuy nhiên, sau khi thảo luận với nhà cung cấp phần mềm, bạn thấy rằng chi phí của công cụ này là quá cao so với giá trị và lợi ích mà nó có thể mang lại, trong trường hợp này, sự cân bằng giữa chi phí & lợi ích của công cụ có thể ảnh hưởng đến quyết định cuối cùng.

## Bước 4) Đưa ra quyết định cuối cùng

![](https://images.viblo.asia/1beea617-c454-4349-b182-aac700b964ce.png)

Để đưa ra quyết định cuối cùng cần phải có:

* Có một nhận rõ ràng về công cụ. Nó có nghĩa là bạn phải hiểu đó là điểm mạnh và điểm yếu của công cụ
* Cân bằng  chi phí và lợi ích.
* Ngay cả với số giờ đã dành phần mềm hướng dẫn sử dụng phần mềm đọc và thông tin nhà cung cấp, bạn vẫn có thể cần thử công cụ trong môi trường làm việc thực tế của mình trước khi mua giấy phép.
* Nên có cuộc họp với nhóm dự án, các chuyên gia tư vấn để có được kiến thức sâu hơn về công cụ này.
Quyết định lựa chọn công cụ có thể ảnh hưởng xấu đến dự án, quy trình thử nghiệm và mục tiêu kinh doanh do đó cần dành thời gian để cân nhắc cho việc lựa chọn.