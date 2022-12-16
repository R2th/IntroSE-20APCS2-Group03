## Bảng đoàn hệ (Cohort tables)
Sử dụng đoàn hệ là 1 cách phổ biến để làm cái này. À quên nhắc lại cho ai chưa xem qua part 1 của mình, thì mình đang làm 1 cái phân tích giữ chân khách hàng (Customer Retention Analysis) bằng nền tảng truy vấn cấu trúc SQL. Để hiểu kỹ hơn thì mọi người nên bắt đầu với Phần 1 nhé!

Đây là bảng kết quả đoàn hệ. Đây là kết quả của những công việc nãy giờ đấy.
![](https://images.viblo.asia/89e49496-5eac-46d0-b110-b6c9ab01bb68.JPG)

Nhìn cũng không quá khó hiểu đúng không? Để mình nhắc lại một chút nhé. Nhìn vào bảng trên, cột đầu tiên Join Period nó là các chu kỳ số lượng khách hàng ghé thăm theo từng tháng. Cột New Users kế bên là số khách hàng mới đó. Ok chưa :)))

Những cột màu trắng còn lại đó là tỉ lệ khách hàng quay lại. Nhìn tiếp lên hình, hàng đầu tiên chu kỳ Join Period của tháng 1 là 511 khách hàng mới. Vậy thì cái con số 63% cột màu trắng số 1 có nghĩa là có **63%** khách hàng quay lại trong số  **51**1 khách hàng mới ở chu kỳ Join Period 1. Và cứ thế tháng tiếp theo là **47%** rồi tháng tiếp theo **38%** rồi cứ thế ....
![](https://images.viblo.asia/60a37aa4-6d04-43a2-8217-31e056a27b6c.JPG)

Giải thích xong rồi đó :)) Bây giờ bắt tay vào gõ code thôi :)))

Truy vấn phụ đầu tiên là sẽ phân loại từng khách hàng ghé thăm lần đầu tiên và khoảng thời gian họ quay lại.
![](https://images.viblo.asia/ab372a46-d23c-4ea9-b132-6adc2ff0fc99.JPG)

Tính số lượng khách hàng mới trên từng tháng.
![](https://images.viblo.asia/209d1a64-b551-4cd7-ab1e-6ff951a86876.JPG)

Bây giờ mình sẽ theo dõi mô hình truy cập của từng khách hàng. Có bao nhiêu khách hàng trong số những khách hàng mới đó quay lại trong các tháng tiếp theo? 
![](https://images.viblo.asia/475b00af-8901-470d-a5c8-1ff1faf2a5eb.JPG)

Rồi cứ thế mà triển code tiếp thôi :))) 
![](https://images.viblo.asia/2506804e-5df9-4a18-97f9-bcdbd0f7d968.JPG)
![](https://images.viblo.asia/eb3a9b5c-b76f-4447-9d5d-9049faa91560.JPG)

Nó sẽ ra cái bảng như này:
![](https://images.viblo.asia/1b723a61-bce1-41fa-8845-eb2bec904a12.JPG)

## Ý nghĩa của dữ liệu
Sau đó các bạn có thể xuất nó ra Excel sao cho trực quan nhất để tiến hành phân tích thông số. Bạn phân tích các tỉ lệ đó ra, từ đó đưa ra Insights cho doanh nghiệp. Mục đích cuối cùng vẫn là đưa ra Insights có giá trị dựa trên tất cả những gì chúng ta đang làm nãy giờ. 

Trước hết, chúng ta sẽ xem xét số lượng người dùng mới mỗi tháng. Doanh nghiệp có thu hút một số lượng khách hàng mới không? Ví dụ trên cho thấy doanh nghiệp có được lượng khách hàng mới từ 500 đến 600 mỗi tháng. Đây có phải là mục tiêu của doanh nghiệp không? Sẽ có nhiều điều cần phải làm, như là thảo luận với phòng marketing chẳng hạn.

Sau đó, số lượng khách hàng mới mỗi tháng có tăng không? Nếu không, tại sao? Có đỉnh và đáy không? Ví dụ, chúng ta có thể thấy rằng chỉ có 504 khách hàng mới trong giai đoạn 6, nhưng 583 trong giai đoạn 5 và 598 trong giai đoạn 7. Đây là những thay đổi lớn về số lượng. Chúng ta thử liên hệ với những yếu tố khác xem? Tháng 6 tháng 7 là mùa hè thì một đối tượng lớn khách hàng là những ai? Phân tích thị trường và đối chiếu với số liệu là những việc mà doanh nghiệp cần phải làm. 

Một mục tiêu kinh doanh tối ưu là cải thiện tốt khả năng duy trì khách hàng theo thời gian.. Vì vậy, nếu doanh nghiệp đạt tỷ lệ khách hàng mới tham gia trong giai đoạn 2 cao hơn so với những người tham gia trong giai đoạn 1 => đang đi đúng hướng.

Như chúng ta thấy trong bảng trên, đây là những gì đã xảy ra: sau 1 tháng, 63% người dùng mới từ giai đoạn 1 đã quay lại, nhưng 68% người dùng mới từ giai đoạn 2 đã quay trở lại. Vì vậy, doanh nghiệp đang làm tốt! Về cơ bản, doanh nghiệp hướng tới trải nghiệm khách hàng trở nên tốt hơn theo thời gian, để khách hàng có nhiều khả năng quay lại hơn.

Sau đó, một số liệu khác mà doanh nghiệp sẽ xem xét là tốc độ ... mất khách. Dự kiến, theo thời gian, khả năng duy trì sẽ giảm. Vậy thì doanh nghiệp cần phải làm gì đó để cải thiện. Tìm ra những lý do tại sao khách hàng không quay lại? Feed back feed back feed back! 

Một yếu tố không thể bỏ qua đó là tần suất truy cập. Thông thường thì một khách hàng trung thành vẫn được đánh giá cao hơn một khách hàng mới. Chúng ta vẽ ra thêm số lượt truy cập của mỗi khách hàng, khách hàng đó có tới liên tục không? Bạn có thể xây dựng đoàn hệ riêng đối với một nhóm khách hàng nào đó, tùy thuộc vào mục đích của bạn.

Mục đích của Customer Retention Analysis là để đưa ra tỉ lệ khách hàng quay lại với doanh nghiệp của bạn. Quả thật, nếu không có những công cụ như SQL thì chúng ta khó có thể đưa ra những góc nhìn được "dữ liệu hóa" như thế này. Để hiểu thêm về công cụ SQL nói riêng và các kiến thức IT khác nói chung, rất mong các bạn hãy ghé thăm [SQL Advice](http://sqladvice.com/). Ở đây chúng mình cung cấp các bài viết về SQL và kiến thức cộng đồng xoay quanh các vấn đề về IT, rất mong nhận được sự ủng hộ từ các bạn!