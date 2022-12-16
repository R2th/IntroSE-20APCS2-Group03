## **Kiểm thử hồi quy (Regression Testing) là gì?**


![](https://images.viblo.asia/9cd1598d-f005-4c69-a73c-453772acab99.png)

- Có rất nhiều giải thích về kiểm tra hồi quy, tuy nhiên hôm nay mình vẫn muốn chia sẻ thêm với các bạn về chủ đề này. 
 - Kiểm thử hồi quy là một hình thức kiểm thử phần mềm để xem các chức năng cũ và mới của nó có còn hoạt động đúng sau khi thay đổi hệ thống hay không? 


## **Khi nào thì cần kiểm thử hồi quy?**
- Chẳng hạn, một ứng dụng phần mềm có thể cho phép giáo viên thêm, lưu, xóa và làm mới trong một công cụ học tập trực tuyến. Sau đó, các Developer deploy 1 version mới với chức năng bổ sung để cập nhật. Chức năng mới được kiểm tra để xác nhận rằng bản cập nhật hoạt động như mong đợi. Trong trường hợp này, kiểm tra hồi quy có thể cải thiện chất lượng tổng thể của sản phẩm. 

- Sau khi phần mềm thay đổi, điều quan trọng là đảm bảo bạn không làm hỏng bất cứ thứ gì. Ngay cả sau khi bạn phát hiện và sửa lỗi hồi quy, vẫn cần phải thử nghiệm thêm. Bạn cần xác nhận rằng việc xử lý một lỗi không gây ra các vấn đề khác.

- Thử nghiệm hồi quy là cần thiết, ngay cả khi thực hiện các thay đổi rất nhỏ đối với code.

- Kiểm tra hồi quy cũng thường được thực hiện bất cứ khi nào một vấn đề được phát hiện trước đó đã được khắc phục. Sau tất cả, có nhiều người phụ thuộc kiểm tra khi nào hoặc không mã mới tuân thủ mã cũ và mã không được sửa đổi đó không bị ảnh hưởng.

![](https://images.viblo.asia/fe164892-6135-4f75-850b-a97e02210297.jpg)

- Sau mỗi ngày, hàng tuần, hai tuần một lần, v.v ... Nói chung, bạn thực hiện kiểm tra hồi quy, nên có một lịch trình. Kiểm tra thường xuyên có nghĩa là ứng dụng của bạn sẽ trở nên ổn định hơn và sẵn sàng sản xuất., Kiểm tra hồi quy càng thường xuyên xảy ra, càng có nhiều vấn đề có thể được phát hiện và giải quyết.


- Các thử nghiệm được tiến hành trước đây nên chạy lại và kết quả của chúng có thể được so sánh với các kết quả thử nghiệm hiện tại. 

## Các phương pháp thử nghiệm hồi quy thích hợp
- Thông thường có 3 phương pháp để kiểm tra hồi quy:

![](https://images.viblo.asia/a4d8d0c9-025e-4722-a92a-722ff76bdd4b.png)

1) Kiểm tra lại tất cả: Điều này giúp kiểm tra lại tính toàn vẹn của phần mềm từ trên xuống dưới. 

2) Lựa chọn kiểm tra hồi quy: Phương pháp này cho phép nhóm chọn một lựa chọn đại diện cho các thử nghiệm sẽ xấp xỉ một thử nghiệm đầy đủ. Điều này đòi hỏi ít thời gian hoặc chi phí hơn nhiều so với bộ thử nghiệm đầy đủ
3) Ưu tiên cho trường hợp thử nghiệm: Với các trường hợp thử nghiệm hạn chế, hãy thử ưu tiên các thử nghiệm có thể ảnh hưởng đến cả bản dựng hiện tại và tương lai của phần mềm.

## Thực hành tốt nhất trong thử nghiệm hồi quy
1) Duy trì lịch biểu: Chọn lịch kiểm tra mà bạn có thể duy trì trong suốt vòng đời phát triển phần mềm. Điều này tránh các trường hợp kiểm tra được đặt trên ổ ghi phía sau.

2) Sử dụng công cụ quản lý kiểm tra: Theo dõi chính xác tất cả các kiểm tra được thực hiện một cách thường xuyên và có hồ sơ lịch sử về hiệu suất của chúng theo thời gian. Làm điều này bằng cách sử dụng một công cụ quản lý kiểm tra đơn giản của một số loại. Điều này có thể dẫn đến các quyết định hiệu quả hơn về những trường hợp thử nghiệm phải được thực hiện. Nó có thể giúp xác định chính xác những cải tiến và thay đổi trong các trường hợp thử nghiệm. Nó cũng có thể thúc đẩy phân tích rõ ràng hơn về kết quả kiểm tra hồi quy.

3) Đánh giá mức độ ưu tiên của thử nghiệm: Thử nghiệm hồi quy khó khăn hơn khi phạm vi ứng dụng có phạm vi lớn và có các mức tăng hoặc vá liên tục cho hệ thống.

Link tham khảo: https://test.io/regression-testing/