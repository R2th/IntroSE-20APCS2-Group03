**1. Sự cố trong kiểm thử phần mềm- Incident là gì?**

Trong khi thực hiện kiểm thử, bạn có thể quan sát thấy kết quả thực tế khác với kết quả mong đợi. Khi kết quả thực tế khác với kết quả mong đợi thì nó được gọi là incidents, bugs, defects, problems hoặc issues.
Thực tế có sự khác biệt giữa incidents (sự cố), defects (khiếm khuyết) và bugs (lỗi). Một sự cố - incidents là bất kỳ tình huống nào mà hệ thống thực hiện đều có vấn đề, có một sự gián đoạn không được lên kế hoạch trước hoặc sự sụt giảm chất lượng của dịch vụ. 
Các nguyên nhân gây ra sự cố bao gồm cấu hình sai hoặc lỗi của môi trường thử nghiệm, dữ liệu kiểm thử không đúng, kết quả dự kiến không hợp lệ hoặc lỗi của người kiểm thử.

**2. Báo cáo sự cố trong kiểm thử phần mềm - Incident report là gì?**

Sau khi xuất hiện các sự cố xảy ra, chúng ta cũng cần bản báo cáo để theo dõi và quản lý chúng.

**a. Tại sao phải có 1 bản Incident report?**

Lợi ích của bản Incident report:
- Trong một số dự án, có rất nhiều lỗi được tìm thấy. Ngay cả đối với các dự án nhỏ hơn có 100 lỗi hoặc ít lỗi được tìm thấy, rất khó để theo dõi tất cả chúng trừ khi bạn có một quy trình báo cáo, phân loại, gán và quản lý các lỗi từ khi phát hiện ra đến lúc giải quyết cuối cùng.
- Một bản báo cáo sự cố có chứa mô tả về sự cố đã được quan sát và phân loại sự cố đó. Báo cáo sự số nhằm cung cấp cho các lập trình viên, người quản lý và những người khác thông tin chi tiết sự cố. 
- Báo cáo sự cố giúp hỗ trợ phân tích các xu hướng trong dữ liệu lỗi tổng hợp hoặc kiểm tra cụ thể hoặc để hiểu và báo cáo mức độ tổng thể của chất lượng hệ thống. 
- Báo cáo sự cố, khi được phân tích trên một dự án và thậm chí trên các dự án, cung cấp thông tin có thể dẫn đến các cải tiến về phát triển và thử nghiệm.
- Các lập trình viên cần thông tin trong báo cáo để tìm và sửa lỗi. Tuy nhiên, trước khi điều đó xảy ra, các nhà quản lý nên xem xét và ưu tiên các sự cố để kiểm tra, sửa chữa và xác nhận kiểm thử các sự cố quan trọng nhất. Mặc dù nhiều sự cố trong số này sẽ là lỗi người dùng hoặc một số hành vi khác không liên quan đến lỗi, một số phần trăm lỗi bị lack khỏi hoạt động kiểm thử và đảm bảo chất lượng.
- Phần trăm phát hiện sự cố, so sánh các sự cố của trường với các lỗi kiểm tra, là một thước đo quan trọng về hiệu quả của quá trình thử nghiệm.

**b. Làm thế nào để viết một báo cáo sự cố tốt trong kiểm thử phần mềm?**

 Một báo cáo sự cố là một tài liệu kỹ thuật. Sau đây là một số quy tắc để viết báo cáo:
- Đầu tiên, sử dụng một cách tiếp cận cẩn thận, chu đáo để thực hiện các bài kiểm thử. Bạn không bao giờ biết khi nào bạn sẽ tìm thấy một vấn đề.
- Bạn cũng nên cố gắng cách ly sự cố bằng cách tạo lại lỗi sự cố. Bằng cách cô lập lỗi, nó sẽ giúp hướng dẫn lập trình viên khi giải quyết các vấn đề của hệ thống.
- Viết báo cáo sự cố sẽ giúp bạn nâng cao kiến thức của riêng bạn về cách thức hoạt động của hệ thống - và nó hoạt động như thế nào.
- Một số trường hợp kiểm thử tập trung vào các điều kiện biên, có thể xuất hiện một sự cố không có khả năng xảy ra thường xuyên trong thực tế. Nó luôn luôn là một ý tưởng tốt để tìm các điều kiện tổng quát hơn mà gây ra sự cố xảy ra, thay vì chỉ đơn giản là dựa vào các trường hợp thử nghiệm.
- Vì có rất nhiều ca kiểm thử diễn ra trong hệ thống trong một giai đoạn kiểm thử, cũng có rất nhiều kết quả thử nghiệm khác có sẵn. So sánh sự cố quan sát với các kết quả kiểm thử khác và các sự cố đã biết là một cách tốt để tìm và ghi lại thông tin bổ sung mà lập trình viên có thể thấy rất hữu ích. 
- Người đọc báo cáo sự cố, đặc biệt là các nhà quản lý cần phải hiểu được mức độ ưu tiên và mức độ nghiêm trọng của lỗi này để biết tác động của vấn đề trong dự án.
- Hầu hết các hệ thống theo dõi sự cố có trường tiêu đề hoặc tóm tắt, trong đó tác động cũng nên được đề cập. Lựa chọn từ ngữ là rất quan trọng trong việc các báo cáo sự cố. Bạn nên rõ ràng và giữ bí mật, trung lập và tập trung vào thực tế trong các vấn đề kiểm thử  liên quan.
- Cuối cùng, báo cáo cần viết tóm tắt sẽ giúp giữ sự chú ý của mọi người và tránh bỏ xót thông tin.
- Nên sử dụng quy trình review cho tất cả các báo cáo được gửi. Công cụ này hoạt động khi  bạn có báo cáo đánh giá của Leader kiểm thử và chúng ta cũng đã cho phép tester - người có ít kinh nghiệm hơn - để review bài báo cáo của các tester khác. 

**3. Công cụ quản lý sự cố**

Công cụ quản lý sự cố còn được gọi là công cụ theo dõi lỗi hoặc công cụ quản lý lỗi. Tuy nhiên, 'công cụ quản lý sự cố' có lẽ là tên tốt hơn bởi vì không phải tất cả những thứ được theo dõi thực sự là lỗi hoặc sự cố; sự cố cũng có thể được nhận thức, các dị thường không nhất thiết phải là lỗi. Ngoài ra những gì thường được ghi lại là thông tin về lỗi (không phải lỗi) đã được tạo ra tại thời điểm kiểm tra và thông tin.

Các tính năng hoặc đặc điểm của các công cụ quản lý sự cố là:
- Để lưu trữ thông tin về các thuộc tính của sự cố (ví dụ: mức độ nghiêm trọng).
- Để lưu trữ tệp đính kèm (ví dụ: ảnh chụp màn hình).
- Ưu tiên sự cố.
- Để gán các hành động cho mọi người (sửa chữa, kiểm tra xác nhận, v.v.)
- Trạng thái (ví dụ: mở, bị từ chối, trùng lặp, trì hoãn, sẵn sàng cho kiểm tra xác nhận, đã đóng);
- Để báo cáo số liệu thống kê / số liệu về sự cố (ví dụ: thời gian mở trung bình, số sự cố với từng trạng thái, tổng số được tăng, mở hoặc đóng).
- Chức năng công cụ quản lý sự cố có thể được bao gồm trong các công cụ quản lý kiểm tra thương mại.

*Nguồn tham khảo:* http://istqbexamcertification.com/what-is-incident-logging-or-how-to-log-an-incident-in-software-testing/