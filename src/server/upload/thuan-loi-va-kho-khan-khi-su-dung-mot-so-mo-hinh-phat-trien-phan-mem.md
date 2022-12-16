Mô hình phát triển phần mềm là một thể hiện trừu tượng của quy trình phần mềm. Nó biểu diễn các đặc tả về quy trình từ những khía cạnh cụ thể; do đó, nó chỉ cung cấp một phần thông tin về quy trình phần mềm.
Hiện nay có các mô hình phát triển thường được sử dụng như:
- Waterfall model 
- V-model
- Incremental model
- RAD model 
- Agile model
- Iterative model
- Spiral model

Mỗi một mô hình có ưu và nhược điểm riêng. Việc sử dụng mô hình nào trong dự án cũng là yếu tố rất quan trọng, đảm bảo chất lượng cũng như tiến độ của dự án.
Trong bài viết này chỉ đề cập tới 3 mô hình: Waterfall model, V-model, Agile model.

## A. WATERFALL MODEL

Mô hình thác nước (Waterfall)  hay mô hình vòng đời tuyến tính. Để hiểu về mô hình này thì rất đơn giản, và rất dễ sử dụng. 
Trong mô hình thác nước, mỗi giai đoạn phải được hoàn thành đầy đủ trước khi giai đoạn tiếp theo có thể bắt đầu. 
Loại mô hình phát triển phần mềm này về cơ bản được sử dụng cho dự án nhỏ và không có yêu cầu cần thay đổi. Vào cuối mỗi giai đoạn, tiến hành rà soát để xác định liệu dự án có đang đi đúng đường và có tiếp tục dự án hay hủy bỏ dự án. Trong mô hình này, thử nghiệm chỉ bắt đầu sau khi quá trình phát triển hoàn tất. Trong mô hình thác nước, các giai đoạn  không chồng lên nhau.

![](https://images.viblo.asia/eaaf45a3-9f0a-4d77-8398-b9a758a801df.jpg)

### 1. Thuận lợi khi sử dụng mô hình Waterfall-model

- Mô hình thác nước  đơn giản và dễ hiểu và dễ sử dụng.
- Dễ quản lý do độ nghiêm ngặt của mô hình - ở mỗi giai đoạn đều có các sản phẩm cụ thể và quá trình xem xét, đánh giá.
- Trong các giai đoạn của mô hình được xử lý và hoàn thành tại mỗi lần, các giai đoạn không trùng nhau.
- Mô hình Thác nước hoạt động tốt cho các dự án nhỏ, nơi yêu cầu được hiểu rất rõ ngay từ đầu.

### 2. Khó khăn khi sử dụng Waterfall-model
- Một ứng dụng khi đang ở giai đoạn thử nghiệm, rất khó để quay lại và thay đổi một chức năng, yêu cầu đã không được nghĩ ra trong giai đoạn xây dựng yêu cầu.
- Không có một sản phẩm nào được đưa ra cho đến khi kết thúc chu trình phát triển
- Số lượng rủi ro và sự không chắc chắn cao.
- Không phải là một mô hình tốt cho các dự án phức tạp và hướng đối tượng.
- Là mô hình nghèo nàn nếu áp dụng cho các dự án dài hạn và dự án đang diễn ra.
- Không thích hợp cho các dự án có yêu cầu có nguy cơ thay đổi từ trung bình đến cao.

## B. V-MODEL

Mô hình chữ V là mô hình Xác minh và Xác nhận. Giống như mô hình thác nước, vòng đời mô hình chữ V là một con đường tuần tự thực hiện các quá trình. Mỗi giai đoạn phải được hoàn thành trước khi giai đoạn tiếp theo bắt đầu. V-Model là một trong nhiều mô hình phát triển phần mềm.Thử nghiệm của sản phẩm được lên kế hoạch song song với một giai đoạn phát triển tương ứng trong mô hình V.

![](https://images.viblo.asia/666eeff3-28d2-4488-8e86-924bef7c7327.png)

Các giai đoạn của mô hình chữ V:

a. **Yêu cầu**: Các yêu cầu như BRS và SRS bắt đầu mô hình vòng đời giống như mô hình thác nước. Tuy nhiên, trong mô hình này trước khi bắt đầu phát triển, một kế hoạch thử nghiệm hệ thống được tạo ra. Kế hoạch kiểm tra tập trung vào việc đáp ứng các chức năng được quy định trong yêu cầu được thu thập.

b. **Giai đoạn thiết kế cấp cao** (HLD): Ở giai đoạn này tập trung vào kiến trúc và thiết kế hệ thống. Nó cung cấp tổng quan về giải pháp, nền tảng, hệ thống, sản phẩm và dịch vụ / quá trình. Kế hoạch thử nghiệm tích hợp được tạo ra trong giai đoạn này, để kiểm tra khả năng làm việc cùng nhau của các phần của hệ thống phần mềm.

c. **Giai đoạn thiết kế cấp thấp** (LLD):  là nơi mà các thành phần phần mềm thực tế được thiết kế. Nó định nghĩa logic thực tế cho từng thành phần của hệ thống. Các thử nghiệm thành phần được tạo ra trong giai đoạn này.

d. **Giai đoạn thực hiện**: Đây chính là nơi mà tất cả các mã hóa diễn ra. Khi quá trình mã hóa hoàn thành, kế hoạch kiểm tra được phát triển trước đó được đưa vào thử nghiệm.

e. **Mã hóa**: Đây là ở dưới cùng của mô hình V. Thiết kế mô-đun được chuyển đổi thành mã hóa của nhà phát triển. Thử nghiệm đơn vị được thực hiện ở giai đoạn này bởi các nhà phát triển.

### 1. Thuận lợi khi sử dụng mô hình V-model
- Đơn giản và dễ sử dụng.
- Các hoạt động kiểm thử như lập kế hoạch, thiết kế thử nghiệm diễn ra trước trước khi viết mã. Điều này tiết kiệm rất nhiều thời gian. Do đó có cơ hội thành công cao hơn mô hình thác nước.
- Chủ động theo dõi khiếm khuyết - đó là các khiếm khuyết được tìm thấy ở giai đoạn đầu.
- Ứng dụng tốt tại các dự án nhỏ, nơi yêu cầu dễ hiểu.

### 2. Khó khăn khi sử dụng V-model
- Rất cứng nhắc và ít linh hoạt.
- Phần mềm được phát triển trong giai đoạn triển khai nên không có nguyên mẫu sớm của phần mềm được đưa ra.
- Nếu có bất kỳ thay đổi xảy ra ở trong giai đoạn phát triển, sau đó các tài liệu thử nghiệm cùng với các tài liệu yêu cầu phải được cập nhật lại.

## C. AGILE MODEL

Agile cũng là một kiểu mô hình gia tăng. Phần mềm được phát triển theo chu trình gia tăng, nhanh chóng. Kết quả bàn giao dựa vào mỗi phiên bản phát hành dựa trên chức năng trước đó. Mỗi bản phát hành được kiểm tra kỹ lưỡng để đảm bảo chất lượng phần mềm được duy trì. 
Với mô hình agile việc bàn giao sản phẩm tới người dùng càng sớm càng tốt là cải tiến đáng kể so với hai mô hình đã nhắc tới bên trên

![](https://images.viblo.asia/ffe67aac-8b31-4ef5-bcfd-b8c13c2b1b12.jpg)

### 1. Thuận lợi khi sử dụng mô hình Agile
- Phần mềm được bàn giao liên tục từng phần, đem lại sự hài lòng cho khách hàng bởi tốc độ.
- Con người và sự tương tác được chú trọng hơn là quá trình và công cụ. Khách hàng, nhà phát triển và người thử nghiệm liên tục tương tác với nhau.
- Phần mềm làm việc được cung cấp thường xuyên (vài tuần chứ không phải vài tháng).
- Việc đối thoại mặt đối mặt được sử dụng thường xuyên, liên tục
- Việc hợp tác giữa các doanh nghiệp và các nhà phát triển diễn ra hàng ngày
- Thường xuyên chú ý đến kỹ thuật và thiết kế.
- Thường xuyên thích nghi với hoàn cảnh thay đổi.
- Ngay cả những thay đổi muộn cũng được đón nhận

### 2. Khó khăn khi sử dụng 
- Rất khó để đánh giá nguồn lực cần có khi bắt đầu phát triền phần mềm trong trường hợp một số sản phẩm phần mềm, đặc biệt là các sản phẩm lớn
- Thiếu sự chú trọng vào thiết kế và tài liệu cần thiết.
- Dự án có thể dễ dàng bị hủy nếu đại diện khách hàng không rõ kết quả cuối cùng mà họ mong muốn.
- Chỉ những lập trình viên cao cấp mới có thể đưa ra các quyết định cần thiết trong quá trình phát triển. Do đó nó không tạo điều kiện cho các lập trình còn ít kinh nghiệm tham gia dự án, trừ khi kết hợp với các nguồn lực có kinh nghiệm.


### ÁP DỤNG MÔ HÌNH PHÁT TRIỂN PHẦN MỀM TRONG DỰ ÁN

| **WATERFALL MODEL** | **V-MODEL** | **AGILE-MODEL** |
| -------- | -------- | -------- |
| - Sử dụng khi các yêu cầu rất rõ ràng và cố định.<br>- Dự án ngắn, định nghĩa sản phẩm ổn định, không có yêu cầu nào còn mơ hồ<br>- Công nghệ sử dụng đã được đội hiểu rõ.<br>- Nguồn lực với chuyên môn được yêu cầu có sẵn<br>- Sự tương tác của khách hàng rất ít ảnh hưởng đến sự phát triển của sản phẩm. Khi sản phẩm đã sẵn sàng, nó chỉ có thể được thử nghiệm bởi người dùng cuối.<br>- Khi sản phẩm được phát triển và nếu có bất kỳ sự cố nào xảy ra thì chi phí sửa các vấn đề như vậy là rất cao, bởi vì chúng ta cần phải cập nhật ở mọi nơi từ tài liệu đến logic.     | - Sử dụng cho các dự án quy mô vừa và nhỏ với yêu cầu được xác định rõ ràng.<br>- Nguồn lực kỹ thuật có sẵn với chuyên môn kỹ thuật cần thiết.<br>- Phụ thuộc vào sự tự tin của khách hàng là cần thiết để lựa chọn cách tiếp cận mô hình chữ V. Vì không có nguyên mẫu nào được đưa ra, nên nguy cơ rất cao liên quan đến việc đáp ứng được mong đợi của khách hàng.     | - Sử dụng cho các dự án hay thay đổi, chưa có yêu cầu rõ ràng.<br>- Để thực hiện một tính năng mới, các nhà phát triển chỉ cần làm việc vài ngày, hoặc thậm chí chỉ vài giờ.<br>- Không giống như mô hình thác nước trong mô hình agile cần có kế hoạch cụ thể để bắt đầu. <br>- Mọi thay đổi đều có thể được thảo luận. Sau đó các tính năng mới có thể được thực hiện hoặc gỡ bỏ dựa trên phản hồi của khách hàng. Điều này làm cho khách hàng có được hệ thống mà họ muốn.<br>- Cả nhà phát triển hệ thống và các bên liên quan đều nhận thấy rằng họ cũng có nhiều quyền tự do hơn về thời gian và lựa chọn hơn là nếu phần mềm được phát triển theo cách tuần tự cứng nhắc. <br>- Khi những thay đổi  là cần thiết phải thực hiện. Những thay đổi đó có thể được thực hiện rất nhanh với chi phí thấp.     |