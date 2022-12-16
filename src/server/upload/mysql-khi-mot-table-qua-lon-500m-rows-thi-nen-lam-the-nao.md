Còn nhớ cách đây khá lâu khi mà mình nhận được câu hỏi từ client: "Bên mình có 1 table MySQL khoảng hơn 500M rows, nó đang khá chậm cả read lẫn write, có cách nào xử lý không?"

Thật ra đây là câu hỏi khá thường gặp với tính phổ biến của MySQL, nếu bạn có 1 product đang phát triển, việc các tables lên đến hàng triệu hay hàng tỉ rows là chuyện chắc chắn sẽ xảy ra. Thông thường khi đối mặt với vấn đề này mình thường có vài cách:

1. Khuyên họ đổi qua DB khác (như Mongo) để dễ shard hơn ở tầng DB Engine.

2. Archive bớt, tuỳ vào tính quan trọng của data và nghiệp vụ thì có thể chọn theo năm, tháng hoặc tuần. Nói cho gọn là chỉ giữ data cho thời gian hiện tại thôi.

3. Shard trên application code: Table được chia ra nhỏ thành nhiều table hơn (có thể chia theo 1 rule nào đó). Tầng code sẽ chịu trách nhiệm tìm và trỏ vào đúng tables để lấy data. Một case kinh điển là cách shard của Pinterest.

4. Shard trên tầng db: Cách này là cách mà ai cũng ao ước, vì code không cần đổi gì mà vẫn chạy tốt. Tuy nhiên cách này là cách mà MySQL bản thân nó ko hỗ trợ.

Dựa trên requirement của client họ nhấn mạnh rằng: họ không muốn đổi db và table này data được truy xuất thường xuyên, có tính thay đổi cao. Mình quyết định chọn giải pháp 4, đi tìm cách shard tầng DB Engine cho MySQL, lâu cũng nên thử vượt giới hạn một chút.

Thoạt đầu hướng tiếp cận của mình là NDB, mình nhanh chóng nhận ra là hướng này quá khó và nhiều rủi ro. Số lượng case study ở ngoài gần như không có ai xài cả.

Tiếp tục tìm kiếm mình phát hiện một công cụ tên là Vitess: "Vitess was created in 2010 to solve the MySQL scalability challenges that the team at YouTube faced". Qúa tuyệt vời, mình và team thử nghiên cứu sâu hơn để xem cách chúng hoạt động và deploy thế nào. Team mình nhanh chóng nhận ra Vitess rất dễ xài, deploy cũng lẹ, mọi thứ được abstract tới mức gần như chẳng thể nhận ra được là đang shard db với Vitess hay không.

Tháng 11/2019 vừa qua, Vitess chính thức trở thành project Cloud Native thứ 8. Điều này có nghĩa là nó rất hợp với các dự án sử dụng k8s, microservices.

Đến nay mình đã triển khai Vitess cho 2 dự án và thấy rất ngon lành. Có vài vấn đề đánh đổi bắt buộc nhưng cá nhân mình thấy cũng ko sao:

- Vitess không hỗ trợ các query có window function, store procedure. Cái này khi chạy microservice thì cũng ko quan tâm lắm.

- Vitess không hỗ trợ câu update join nhiều bảng. Cái này có thể giải quyết với cron job.

- Vitess có node LB hơi ăn CPU nhiều, đặc biệt khi chạy những câu truncate, drop/create tables. Trên thực tế chúng ta không dùng các câu này nhiều trên production.

Còn lại thì Vitess hỗ trợ hết, kể cả transaction, join table, những thứ rất quan trọng cho các nghiệp vụ thường ngày.

OK bài gới thiệu chỉ có vậy thôi, các bạn có thể xem docs Vitess để tìm hiểu thêm.

Link gốc: https://www.facebook.com/viettranx/posts/3277240172304079