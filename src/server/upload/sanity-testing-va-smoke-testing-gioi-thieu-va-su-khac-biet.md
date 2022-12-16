Kiểm thử Smoke và Sanity là những chủ đề bị hiểu lầm nhiều nhất trong Kiểm thử phần mềm. Có một lượng lớn tài liệu về chủ đề này, nhưng hầu hết chúng đều khó hiểu. Bài viết sau đây cố gắng giải quyết sự nhầm lẫn.

Bạn có thể tìm hiểu sự khác biệt giữa kiểm thử Smoke và Sanity qua sơ đồ sau:
![](https://images.viblo.asia/8035a3a9-31b3-445b-8b8d-b1372abcb75d.png)

### Bản dựng phần mềm (Software build)  là gì? 
Nếu bạn đang phát triển một chương trình máy tính đơn giản chỉ bao gồm một tệp mã nguồn, bạn chỉ cần biên dịch và liên kết một tệp này, để tạo ra một tệp thực thi. Quá trình này rất đơn giản. Thông thường, đây không phải là trường hợp. Một Dự án Phần mềm điển hình bao gồm hàng trăm hoặc thậm chí hàng nghìn tệp mã nguồn. Tạo một chương trình thực thi từ các tệp nguồn này là một công việc phức tạp và tốn thời gian. Bạn cần sử dụng phần mềm "dựng" để tạo một chương trình thực thi và quá trình này được gọi là "bản dựng phần mềm".

### Smoke Testing
Smoke Testing là một kỹ thuật kiểm tra phần mềm được thực hiện sau khi bản dựng phần mềm để xác minh rằng các chức năng quan trọng của phần mềm đang hoạt động tốt. Nó được thực thi trước khi thực hiện bất kỳ kiểm tra chức năng hoặc hồi quy chi tiết nào. Mục đích chính của kiểm thử Smoke là từ chối ứng dụng phần mềm có khiếm khuyết để nhóm QA không mất thời gian kiểm tra ứng dụng phần mềm bị hỏng.

Trong kiểm thử Smoke, các trường hợp thử nghiệm đã chọn để bao hàm chức năng hoặc thành phần quan trọng nhất của hệ thống. Mục tiêu không phải là thực hiện kiểm tra toàn diện, mà để xác minh rằng các chức năng quan trọng của hệ thống đang hoạt động tốt.

Ví dụ: kiểm tra smoke thông thường sẽ là - Xác minh rằng ứng dụng khởi chạy thành công, Kiểm tra xem GUI có đáp ứng không ... v.v.

### Thử nghiệm Sanity là gì?
Sanity testing là một loại Kiểm tra phần mềm được thực hiện sau khi nhận được một bản dựng phần mềm, với những thay đổi nhỏ về mã hoặc chức năng, để chắc chắn rằng các lỗi đã được khắc phục và không có thêm vấn đề nào được đưa ra do những thay đổi này. Mục đích là để xác định rằng chức năng được đề xuất hoạt động gần như mong đợi. Nếu sanity test không thành công, bản dựng sẽ bị từ chối để tiết kiệm thời gian và chi phí liên quan đến kiểm tra nghiêm ngặt hơn.

Mục tiêu "không phải" để xác minh kỹ lưỡng chức năng mới mà để xác định rằng nhà phát triển đã áp dụng một số tính hợp lý (sanity) trong khi sản xuất phần mềm. Ví dụ, nếu máy tính khoa học của bạn cho kết quả là 2 + 2 = 5! Sau đó, không có điểm nào để kiểm tra các hàm nâng cao như sin 30 + cos 50.

### Sự khác biệt chính
- Smoke test có mục tiêu xác mình "tính ổn định" còn Sanity test  xác minh "tính hợp lý"
- Smoke test được thực hiện bởi nhà phát triển và tester còn Sanity test được thực hiện bởi tester
- Smoke test xác minh các chức năng quan trọng của hệ thống còn Sanity test xác minh chức năng mới như sửa lỗi
- Smoke test  là một tập con của thử nghiệm chấp nhận trong khi Sanity test là tập con của kiểm thử hồi quy
- Smoke test được lập thành văn bản hoặc theo kịch bản trong khi thử nghiệm Sanity thì không.
- Smoke test xác minh toàn bộ hệ thống từ đầu đến cuối trong khi Sanity test chỉ xác minh một thành phần cụ thể.

### Điểm cần lưu ý
- Cả sanity test và smoke test đều là những cách để tránh lãng phí thời gian và công sức bằng cách nhanh chóng xác định xem ứng dụng có quá thiếu sót để thực hiện bất kỳ kiểm tra nghiêm ngặt nào hay không.
- Sanity Testing còn được gọi là kiểm thử chấp nhận người thử nghiệm.
- Smoke testing được thực hiện trên một công trình cụ thể còn được gọi là kiểm tra xác minh bản dựng.
- Một trong những thực tiễn tốt nhất trong ngành là tiến hành kiểm tra bản dựng hàng ngày và thử nghiệm smoke trong các dự án phần mềm.
- Cả hai bài smoke test và sanity test có thể được thực hiện thủ công hoặc sử dụng một công cụ tự động hóa. Khi các công cụ tự động được sử dụng, các bài kiểm tra thường được bắt đầu bởi cùng một quá trình tạo ra chính bản dựng.
- Theo nhu cầu kiểm tra, bạn có thể phải thực hiện cả Sanity test và Smoke test trong bản dựng phần mềm. Trong những trường hợp như vậy, trước tiên bạn sẽ thực hiện các bài kiểm tra Smoke và sau đó tiếp tục với bài kiểm tra Sanity. Trong công nghiệp, các trường hợp thử nghiệm cho Kiểm tra Sanity thường được kết hợp với các trường hợp thử nghiệm cho thử nghiệm Smoke, để tăng tốc độ thực thi thử nghiệm. Do đó, phổ biến là các thuật ngữ thường bị nhầm lẫn và được sử dụng thay thế cho nhau.

Bài viết được translate từ nguồn: https://www.guru99.com/smoke-sanity-testing.html