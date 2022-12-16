Smoke Testing  và Sanity Testing là những chủ đề bị hiểu lầm nhiều nhất trong Kiểm thử phần mềm. Có rất nhiều tài liệu nói về chủ đề này, nhưng hầu hết chúng đều khó hiểu. Vậy hôm nay mình viết bài này mong có thể giải quyết được sự nhầm lẫn nhé. 
![](https://images.viblo.asia/3ae43b33-ea32-49ec-b3f9-7c8d299e8d6b.jpg)


# 1. Smoke Testing là gì? 
![](https://images.viblo.asia/4493dbc7-cf29-4416-9f13-bb550872230f.png)


- Smoke Testing là một loại kiểm thử phần mềm được thực hiện sau khi xây dựng phần mềm để chắc chắn rằng các chức năng quan trọng của hệ thống đang hoạt động tốt. 
- Loại kiểm thử này chỉ nhằm mục đích đánh giá sơ khởi xem bản build nhận được có ok để test tiếp hay không. Lí do ta phải sử dụng smoke test là để phát hiện sớm những lỗi quan trọng sẽ giúp tránh lãng phí và dành thời gian cho những hoạt đông kiểm thử khác.

### Khi nào nên sử dụng Smoke testing? 

- Khi Dev bàn giao 1 bản build cho đội Test thì việc trước tiên là thực hiện bộ smoke test này. Nếu bản build này fail, bạn báo ngay cho sếp, developer hoặc các bên liên quan để đánh giá tình hình. Trả bản build về và không nên test tiếp những tính năng khác.
- Ví dụ: Xác minh rằng ứng dụng khởi chạy thành công, Kiểm tra xem GUI có đáp ứng không ... v..v
# 2. Sanity Testing la gì? 
![](https://images.viblo.asia/1100a06c-4d05-4fcc-a535-28b6dc357944.jpg)

- Sanity Testing là một loại Kiểm tra phần mềm được thực hiện sau khi nhận được 1 bản build với những thay đổi nhỏ trong code hoặc chức năng, để chắc chắn rằng các lỗi đã được sửa và không có thêm lỗi nào được phát sinh do những thay đổi này.

-  Mục đích là để xác định rằng chức năng được đề xuất hoạt động gần như mong đợi. Nếu kiểm tra mà không thành công, bản build sẽ bị từ chối để tiết kiệm thời gian và chi phí liên quan đến kiểm tra nghiêm ngặt hơn.

 - Mục tiêu "không phải" để xác minh kỹ lưỡng chức năng mới mà để xác định rằng Dev đã áp dụng một số tính toán hợp lý trong khi code.



# 3. Sự khác biệt giữa Smoke Testing và Sanity Testing:
![](https://images.viblo.asia/b47ed13c-0892-4812-b702-5d70417fc16b.png)



|Smoke Testing | Sanity Testing |
| -------- | -------- | -------- |
|Được thực hiện để xác định rằng các chức năng quan trọng của chương trình đang hoạt động tốt    |Được thực hiện để kiểm thử các chức năng hay lỗi mới đã được fix    | 
|Mục tiêu của thử nghiệm này là để xác minh "tính ổn định" của hệ thống để tiến hành thử nghiệm nghiêm ngặt hơn|Mục tiêu của thử nghiệm là xác minh tính "hợp lý" của hệ thống để tiến hành thử nghiệm nghiêm ngặt hơn|
|Thử nghiệm này được thực hiện bởi Dev hoặc Tester/QA|Kiểm tra trạng thái thường được thực hiện bởi Tester/QA|
|Smoke Testing là một tập hợp con của kiểm thử chấp nhận (Acceptance testing)|Sanity Testing là một tập hợp con của Kiểm thử hồi quy (Regression testing)|
|Smoke Testing kiểm thử toàn bộ hệ thống từ đầu đến cuối|Sanity Testing thực hiện thành phần cụ thể của toàn bộ hệ thống|
|Smoke Testing giống như kiểm tra tổng quát|Sanity Testing giống như kiểm tra chuyên sâu|


# 4. Các điểm cần lưu ý:
![](https://images.viblo.asia/11b119c3-39b7-4274-8349-3c6cc318e8c1.jpg)

- Cả Smoke Testing và Sanity Testing đều là những cách để tránh lãng phí thời gian và công sức vì nó nhanh chóng xác định xem ứng dụng có quá nhiều lỗi sẽ không được đưa sang giai đoạn kiểm thử tiếp theo. 
- Sanity Testing còn được gọi là Kiểm thử hồi quy (Regression testing).
- Một trong những thói quen tốt là tiến hành tạo các bản build hàng ngày và thực hiện Smoke Testing trong các dự án phần mềm.
- Cả Smoke Testing và Sanity Testing đều có thể được thực hiện thủ công hoặc sử dụng một công cụ tự động hóa . 
- Theo nhu cầu kiểm tra, bạn có thể phải thực hiện cả Smoke Testing và Sanity Testing trong bản build phần mềm. Trong những trường hợp như vậy, trước tiên bạn sẽ thực hiện Smoke Testing và sau đó tiếp tục với Sanity Testing để tăng tốc độ thực hiện kiểm thử. Do đó, 2 loại test này thường bị nhầm lẫn và được sử dụng thay thế cho nhau.


Trên đây là những điều cần biết về Sanity Testing và Smoke Testing. Chúc các bạn có thêm kiến thức và làm việc hiệu quả nhé. 

Nguồn: https://www.guru99.com/smoke-sanity-testing.html