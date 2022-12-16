Rất nhiều phương pháp test đã được thực hiện để xác định nguyên nhân gốc rễ các lỗi trong phần mềm. Mục đích chính của việc thực hiện kiểm tra đảm bảo chất lượng nghiêm ngặt trên phần mềm là để ngăn chặn việc phát hành các sản phẩm kém chất lượng cho khách hàng cuối cùng. Những sai lầm nhỏ xảy ra có thể dẫn đến tổn thất tài chính lớn.

Chính vì vậy, bài viết này sẽ thảo luận về các cách tạo nên một kế hoạch test tốt nhất, cách cải thiện quy trình kiểm thử phần mềm và để tăng chất lượng sản phẩm phần mềm.

# Lập kế hoạch kiểm tra và quy trình QA
- Các quy trình kiểm tra nên được lên kế hoạch một cách tốt nhất. Tài liệu tốt là công cụ xây dựng giao tiếp hiệu quả trong nhóm phần mềm. Vì vậy, lập kế hoạch hiệu quả đòi hỏi phải tạo ra các kế hoạch kiểm tra chất lượng cho một dự án.

## Kế hoạch quản lý chất lượng

- Kế hoạch quản lý chất lượng là một tài liệu xác định mức chất lượng sản phẩm chấp nhận được và mô tả cách thức dự án sẽ đạt được mức này. 
- Đây không phải là một tài liệu bắt buộc, nhưng nó sẽ giúp leader dựu án lên plan tất cả các task cần thiết để đảm bảo rằng dự án đáp ứng nhu cầu và mong đợi của khách hàng. 
- Mục tiêu chính của kế hoạch này là hỗ trợ các leader quản lý dự án. Bao gồm các yêu cầu chất lượng của phần mềm và mô tả cách đánh giá các yêu cầu đó.

## Các thành phần chính của kế hoạch quản lý chất lượng:

* Mục tiêu chất lượng
* Các sản phẩm và quy trình chính của dự án sẽ được xem xét để đạt chất lượng
* Tiêu chuẩn chất lượng
* Kiểm soát chất lượng và hoạt động đảm bảo
* Vai trò và trách nhiệm chất lượng
* Công cụ chất lượng
* Kế hoạch báo cáo kiểm soát chất lượng và các vấn đề đảm bảo
## Chiến lược thử nghiệm (Test strategy)

- Chiến lược thử nghiệm xuất phát từ tài liệu Đặc tả yêu cầu nghiệp vụ (Business Requirements Specification). 
- Những leader quản lý dự án sẽ tạo ra một chiến lược thử nghiệm để xác định phương pháp kiểm thử phần mềm được sử dụng để đạt được mục tiêu thử nghiệm. 
- Chiến lược thử nghiệm được thúc đẩy bởi các yêu cầu kinh doanh của dự án => nên phù hợp với trách nhiệm của người quản lý dự án.

## Các thành phần chính của một chiến lược thử nghiệm là:

* Phạm vi thử nghiệm
* Mục tiêu kiểm tra
* Hạn chế về ngân sách
* Truyền thông và báo cáo tình trạng
* Tiêu chuẩn công nghiệp
* Kiểm tra đo lường và số liệu
* Khiếm khuyết báo cáo và theo dõi
* Quản lý cấu hình
* Thời hạn
* Lịch trình thực hiện thử nghiệm
* Xác định rủi ro

- Trong một dự án nhỏ, chiến lược thử nghiệm là một phần của kế hoạch thử nghiệm. 
- Đối với một dự án lớn hơn,  leader dự án phải tạo ra một chiến lược thử nghiệm như một tài liệu tĩnh, riêng biệt mà từ đó mỗi kế hoạch thử nghiệm có thể được phát triển thêm.

## Một tài liệu chiến lược thử nghiệm tốt bao gồm câu trả lời cho các câu hỏi sau đây:

* Sản phẩm là gì?
* Phần nào của sản phẩm nên được ưu tiên kiểm tra ?
* Test như thế nào?
* Khi nào bắt đầu test?
* Các tiêu chí bắt đầu / kết thúc test là gì?

## Kế hoạch kiểm tra

- Kế hoạch kiểm tra là một tài liệu mô tả những gì cần kiểm tra, khi nào kiểm tra, cách kiểm tra và ai sẽ thực hiện các bài kiểm tra. 
- Mô tả phạm vi thử nghiệm và các hoạt động. 
- Kế hoạch kiểm tra bao gồm các mục tiêu để run test sẽ được thực hiện và giúp kiểm soát các rủi ro. 
- Kế hoạch kiểm tra được viết bởi người có kinh nghiệm như leader dự án hoặc người quản lý QA.
- Một kế hoạch kiểm tra tốt bao gồm plan cho tất cả các hoạt động kiểm tra cần thiết để kiểm soát thời gian kiểm tra nhóm của bạn. 
- Nó cũng nên xác định vai trò của mọi thành viên trong nhóm để mọi người rõ ràng về những gì được yêu cầu của họ. Không có cách phổ biến nào để tạo một kế hoạch kiểm tra vì nó phụ thuộc vào các quy trình, tiêu chuẩn và các công cụ quản lý kiểm tra được triển khai trong công ty. 
## Một số hướng dẫn chính để làm cho kế hoạch kiểm tra hiệu quả hơn:

- Làm cho kế hoạch kiểm tra của bạn ngắn gọn. Tránh lặp lại hoặc viết những thứ không liên quan. Chỉ nên chứa các thông tin cần thiết.

- Nên cụ thể, rõ ràng. Bao gồm tất cả các chi tiết, ví dụ phiên bản của chương trình,  có thể tìm kiếm tài liệu theo các version được.

- Cập nhật kế hoạch kiểm tra. Đó là một tài liệu trực tiếp phải được cập nhật thường xuyên trên cơ sở theo yêu cầu.

- Chia sẻ kế hoạch kiểm tra với các bên liên quan. Nó sẽ cung cấp cho họ thông tin về quá trình thử nghiệm của bạn. Chất lượng của kế hoạch kiểm tra của bạn sẽ đại diện cho chất lượng kiểm tra mà nhóm của bạn sẽ thực hiện.

## Các trường hợp thử nghiệm
Các trường hợp kiểm thử hiệu quả là một phần không thể thiếu trong cải tiến kiểm thử phần mềm. Một trường hợp kiểm thử là một tài liệu bao gồm một tập hợp các điều kiện hoặc hành động được thực hiện trên ứng dụng phần mềm để xác minh chức năng của tính năng.
### Cách viết các trường hợp thử nghiệm hiệu quả:

- Xác định các yêu cầu kiểm tra: Xác định phạm vi và mục đích thử nghiệm trước khi bắt đầu quá trình thử nghiệm.

- Yêu cầu của khách hàng: Tester viết trường hợp thử nghiệm phải có hiểu biết tốt về các tính năng và yêu cầu của người dùng. Mỗi trường hợp kiểm tra nên được viết đúng theo yêu cầu của khách hàng.

- Viết đúng thời điểm: Thời gian tốt nhất để viết các trường hợp thử nghiệm là phân tích yêu cầu sớm và các giai đoạn thiết kế. Bằng cách đó, các tester có thể nắm được/ cân nhắc tất cả các yêu cầu có thể kiểm tra được hay không.

- Đơn giản và rõ ràng: Các trường hợp thử nghiệm nên đơn giản và dễ hiểu. Mỗi trường hợp thử nghiệm chỉ nên bao gồm các bước cần thiết và có liên quan. Một trường hợp thử nghiệm phải có một kết quả dự kiến duy nhất thay vì nhiều kết quả dự kiến.

- Trường hợp thử nghiệm duy nhất: Mỗi trường hợp thử nghiệm phải có một tên duy nhất => Giúp phân loại, theo dõi và xem xét các trường hợp thử nghiệm ở các giai đoạn sau.

- Các trường hợp thử nghiệm nên được duy trì (maintainable). Nếu yêu cầu thay đổi, người kiểm tra phải có khả năng duy trì trường hợp kiểm tra.
## Kết luận
- Cải thiện chất lượng sản phẩm phần mềm sẽ có tác động tổng thể lớn nhất đến doanh nghiệp của bạn và hiệu quả tài chính của nó.
- Khi quản lý quy trình làm việc của bạn không tiết kiệm kiểm tra, vì chi phí sai lầm có thể chứng minh là quá cao. Do đó, chiến lược chất lượng của bạn nên bao gồm tất cả các khía cạnh chính: lập kế hoạch hiệu quả, phương pháp quản lý chất lượng theo định hướng thử nghiệm.
## Tham khảo
https://www.altexsoft.com/blog/engineering/8-ways-to-improve-software-testing-through-planning-work-environment-automated-testing-and-reporting/