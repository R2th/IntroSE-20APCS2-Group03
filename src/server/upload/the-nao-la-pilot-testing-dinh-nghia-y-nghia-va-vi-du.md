## Thế nào là Pilot Testing? 

Pilot testing là một loại Kiểm thử phần mềm giúp xác minh một thành phần của hệ thống hoặc toàn bộ hệ thống hoạt động tốt trong điều kiện hoạt động thời gian thực hay không. Nó xác minh các chức năng chính của hệ thống trước khi đi vào sản xuất.

Loại test này được thực hiện giữa giai đoạn UAT và Production.

Trong Pilot testing, một nhóm người dùng cuối được lựa chọn để sử dụng thử hệ thống, và cung cấp các feedback trước khi chúng ta thực hiện hiện việc triển khai đầy đủ hệ thống.

Nói một cách khác, nó nghĩa là tiến hành một buổi thử nghiệm cho khả năng sử dụng của hệ thống trước khi thực hiện triển khai.

Pilot testing giúp phát hiện sớm các bug trong hệ thống.

![](https://images.viblo.asia/e37f5f15-ef0d-44ce-a449-2bc7142ab164.jpg)

Pilot testing liên quan đến việc cài đặt một hệ thống trên trang web của khách hàng (hoặc môi trường mô phỏng người dùng) để thử nghiệm chống lại việc sử dụng liên tục và thường xuyên.

Phương thức kiểm tra phổ biến nhất đó là: thực hiện kiểm tra liên tục hệ thống để tìm ra các khu vực yếu. Những điểm yếu này được gửi lại cho đội phát triển sau đó dưới dạng bug report, và những lỗi này sẽ được fix ở bản build tiếp theo của hệ thống.

Trong quá trình này, thỉnh thoảng việc acceptance test cũng được thực hiện như một phần của kiểm tra tính tương thích (Compatibility testing). Nó được thực hiện khi một hệt hống được phát triển để thay thế cho một hệ thống cũ.

Trong Kỹ thuật phần mềm, Pilot testing sẽ trả lời các câu hỏi kiểu như: liệu sản phẩm hoặc dịch vụ có một thị trường tiềm năng hay không?

## Tại sao phải thực hiện Pilot Testing

Mục tiêu quan trọng nhất của Pilot testing là để gỡ lỗi phần mềm và thủ tục mà bạn sẽ sử dụng để test.

- Nó sẽ giúp kiểm tra sản phẩm của bạn sẵn sàng để phát triển toàn diện hay chưa
- Nó sẽ giúp đưa ra quyết định tốt nhất về việc phân bổ thời gian và tài nguyên
- Nó sẽ mang lại cơ hội để đánh giá phản ứng của người dùng với chương trình
- Nó sẽ giúp đo lường sự thành công của chương trình
- Nó sẽ mang lại cho team cơ hội để khám phá và thực hành các hoạt động mà họ có thể sử dụng trong suốt quá trình test khả năng sử dụng.

## Cách thực hiện Pilot Testing

Các mức độ của Pilot testing phụ thuộc vào độ lớn và phạm vi của dự án migration của bạn. Thực tế Pilot testing thường được thực hiện trong một khu vực dành riêng hoặc phòng thí nghiệm, nơi người dùng có thể chạy nhiều thủ tục, giao dịch, và báo cáo khi họ mô phỏng chức năng của phần mềm.

Pilot testing có thể được tiến hành phụ thuộc vào bối cảnh của dự án. Ví dụ:

- Đối với doanh nghiệp kinh doanh nói chung, pilot test được tiến hành với một nhóm người dùng trên một tập hợp các máy chủ trong một trung tâm dữ liệu
- Đối với doanh nghiệp phát triển web, pilot test được tiến hành bởi các file hosting site trên server staging hoặc các folder trực tiếp trên internet
- Đối với các nhà cung cấp phần mềm thương mại, pilot test được tiến hành với một nhóm đặc biệt những adopter sớm.

Test Plan của một Pilot testing:

**Step 1**: Tạo một Pilot Plan

**Step 2**: Chuẩn bị Pilot test

**Step 3**: Deploy và test Pilot test

**Step 4**: Đánh giá Pilot test

**Step 5**: Chuẩn bị deploy sản phẩm

Trước khi tiến hành Pilot testing, cần xem xét các vấn đề sau đây:

- Cung cấp đào tạo đầy đủ cho những người tham gia
- Kế hoạch triển khai cho việc triển khai server và chuẩn bị hệ thống cho pilot
- Tài liệu về quy trình cài đặt
- Testing script cho mỗi ứng dụng phần mềm. Nó bao gồm cả checklist cho các chức năng được thực hiện.
- Cung cấp feedback liên tục về design, đội test từ người dùng bằng email hoặc website
- Thiết lập tiêu chí đánh giá của pilot, như thông tin về số lượng người dùng không hài lòng, số lượng các cuộc gọi support và yêu cầu, ...
- Tham gia một nhóm làm việc của các đối tác hoặc các  bên liên quan, người đã đầu tư vào dự án và sẽ gặp mặt thường xuyên để trao đổi về tiến trình của bạn.
- Phát triển một kế hoạch đánh giá và công cụ đánh giá để ghi lại những thông tin cần thiết về kiến thức, thay đổi thái độ và hành vi của nhóm pilot.

Trong suốt quá trình Pilot test, team sẽ thu thập và đánh giá dữ liệu test. Dựa trên các dữ liệu này, team sẽ lưạ chọn một chiến lược thích hợp.

- **Stagger Forward**: Triển khai một ứng cử viên phát hành mới cho nhóm pilot
- **Roll back**: thực hiện plan roll back để khôi phục nhóm pilot về cấu hình trước đó
- **Suspend**: đình chỉ pilot testing
- **Patch and Continue**: Triển khai các bản vá lỗi để fix giải pháp hiện có
- **Deploy**: Tiến hành triển khai giải pháp

## Good Practice

- Schedule: thực hiện pilot test trong 2 ngày trước khi thực hiện test usability
- Không bắt đầu thực hiện pilot test cho đến khi tất cả người dùng, khách hàng, đội dự án đồng ý với tiêu chí cho một kết quả thành công
- Yêu cầu người dùng đánh dấu bất kỳ vấn đề nào trên các bản sao tài liệu của họ, mô tả mối quan tâm của họ và đưa ra đề xuất (nếu họ có) để cải thiện
- Thông báo đến người dùng mục đích, độ dài, và quy trình của pilot.

## Ví dụ về Pilot Testing

Dưới đây là một số ví dụ điển hình về Pilot Testing:

- Microsoft chạy Windows Insider Programs cho Windows 10 Pilot testing
- Google chạy Android Beta Program cho Nexus Users để test Android Operating System
- HP chạy trực tuyến để Thử nghiệm Sản phẩm & Dịch vụ của mình



Tham khảo: 
https://www.guru99.com/pilot-testing.html