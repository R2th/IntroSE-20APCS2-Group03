Ở bài trước chúng ta đã được hiểu về khái niệm Primary Keys và Foreign Keys (hay còn gọi là Khóa Chính và Khóa Phụ). Hôm nay chúng ta sẽ tìm hiểu thêm về Foreign Key Constraints (các ràng buộc của Khóa Phụ).

Để bắt đầu tìm hiểu Foreign Key Constraints là gì thì chúng ta sẽ cùng tạo 1 cơ sở dữ liệu blog bao gồm 2 bảng posts và comments
![](https://images.viblo.asia/c4b7bffb-572d-4331-a64c-3700e605be8c.png)

Ở bảng posts chúng ta sẽ tạo 1 cột title với Type là Varchar và lenght là 255, cột này thì mình sẽ không cho NULL 
![](https://images.viblo.asia/f015de09-14b2-47a5-842c-904a478af90c.png)

Bảng comments thì mình sẽ thêm cột body và post_id.
![](https://images.viblo.asia/c42d43b5-4f66-4daf-a000-b2495a57057c.png)


Tại sao lại thêm post_id thì các bạn có thể hiểu đơn giản là ở 1 bài viết thì chúng ta có thể có comments cho bài viết và chúng ta phải biết được comments nào đc dùng cho bài posts nào

Chúng ta sẽ nhập dữ liệu cho 2 bảng ví dụ như sau
![](https://images.viblo.asia/13bcae91-139d-4dc6-9449-6ac33a7e7346.png)
![](https://images.viblo.asia/139f578d-7f79-40f3-9813-7b9e192a6545.png)

Như chúng ta thấy thì khi mình đổi post_id sang 99 thì dữ liệu vẫn đc save. Lý do là do chúng ta chưa có ràng buộc cho Foreign Key nhưng như vậy thì sẽ không tạo được tính chính xác cho dữ liệu

![](https://images.viblo.asia/03fccf0c-1930-4940-a4db-01b82380e6d6.png)

Khi chúng ta chạy thêm lệnh 
![](https://images.viblo.asia/f2a340e1-9a29-4efb-856f-edb8309be652.png)

Khi đó chúng ta sẽ có ràng buộc có thể xem như sau
![](https://images.viblo.asia/88a85a24-fc6a-47d9-97ee-ae71595d90dd.png)

Và điều đó có nghĩa là gì ? Là khi chúng ta chuyển post_id sang 1 ids không có ở bảng post thì việc thay đổi dữ liệu sẽ bị sai và việc nhập liệu sẽ không được. Điều này sẽ đảm bảo chính xác cho dữ liệu
![](https://images.viblo.asia/0cbc405c-245c-42f0-844b-cf1988878358.png)

Và các ràng buộc cũng có các options để thực hiện ví dụ như on delete cascade khi bạn sử dụng thêm options này thì khi chúng ta thực hiện xóa dữ liệu ở bảng có chứa khóa chính cụ thế ở đây là post thì dữ liệu ở bảng comments cũng đc xóa đồng thời
![](https://images.viblo.asia/c231b48d-f3e2-468b-8790-2a3892ffed49.png)

Khi mình xóa dữ liệu ở bảng posts
![](https://images.viblo.asia/035340eb-b21b-4798-99a9-a272da2d6161.png)

Cùng kiểm tra lại dữ liệu ở bảng comments thì chúng ta cũng thấy dữ liệu được xóa đồng thời
![](https://images.viblo.asia/55b55f7d-6494-4881-af0c-09356b21a625.png)

Ngoài cascade thì cũng có thêm những lựa chọn như restrict, no action, .... Ngoài lựa chọn on delete thì còn lựa chọn on update sẽ thực hiện khi chúng ta update dữ liệu ở bảng chứa khóa chính, và lựa chọn on update này hay được sử dụng hơn trong thực tế.

Giờ chúng ta có thể quay lại cơ sở dữ liệu đã import ở bài 1 để tham khảo thêm về các ràng buộc và Khóa Chính, Khóa Phụ được sử dụng

**Việc hiểu đúng về các khái niệm cơ bản sẽ giúp chúng ta thiết lập được 1 cơ sở dữ liệu đầy đủ và chính xác với những yêu cầu thực tế trong khi làm việc. Ở các bài sau mình sẽ giới thiệu đến các bạn những khái niệm khác nhé !!!**