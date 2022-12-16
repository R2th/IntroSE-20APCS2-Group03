## Functional testing

Các lưu ý khi test chức năng trên app mobie:
1. Đảm bảo chức năng có trong thiết kế hoạt động tốt
2. Test những những chức năng ngoài luồng
3. Test những chức năng khi kết nối mạng wifi, 3g, 4g, mất kết nối mạng, điện thoại đang để chế độ máy bay...
5. Sự chuyển hướng từ các liên kết trong ứng dụng hay những liên kết với mạng xã hội (Facebook, google+...)
6. Kiểm tra sự đồng bộ dữ liệu khi đăng nhập ở nhiều thiết bị khác nhau
7. Đối với ứng dụng có camera cần test camera trông ứng dụng ( lưu trữ, chụp ảnh....)
8. Notification từ ứng dụng
9. Kiểm thử các trường hợp khi đang sử dụng app bị gián đoạn như: có SMS, có cuộc gọi đến, pin yếu...

## Performance and load testing

### 1. Device Performance 

*) Lưu ý đốivới App Start up :
- Xác định ứng dụng cần bao lâu để bắt đầu.? 
- Sau khi người dùng chạm vào biểu tượng app , màn hình đầu tiên sẽ được hiển thị trong vòng 1-2s

*) Kiểm tra response time 
- Xác nhận thời gian phản hồi các xử lý của ứng dụng có nhanh không? 
- Xác nhận mức tiêu thụ pin khi sử dụng ứng dụng liên tục có quá nhiều ko? 
- Kiểm tra mức tiêu thụ bộ nhớ của bộ nhớ của ứng dụng bằng cách thực hiện các chức năng nhất định trong ứng dụng, mức tiêu thụ bộ nhớ cũng tăng lên. (trong ứng dụng android khi thông báo push được thực hiện thì bộ nhớ sẽ tăng lên ..)

## Usability testing
1.  *Back* button in device 
Kiểm tra xem nút *Back*  có đưa người dùng về màn hình trước đó hay không?

2. *Menu* button in device 			
Kiểm tra nút *Menu* có hiển thị menu của ứng dụng không?

3. *Home* button in devive 			
Kiểm tra nút *Home* có *Home* đưa về màn hình chính của device không? 

4. *Search* button in device 			
Kiểm tra nút *Search* có cho người dùng sử dụng form search trong ứng dụng không? 

5. Volume
- Volume up: Kiểm tra xem tăng âm lượng của device thì app có hoạt động bình thường không? 
- Volume down: Kiểm tra xem giảm âm lượng của device thì app có hoạt động bình thường?

6. The sound in ON/ OFF			
Kiểm tra xem ứng dụng có hoạt đúng spec nếu khi on/ off âm thanh device không? 

7. Chế độ máy bay 			
Ứng dụng có hoạt động đúng khi để ở chế độ máy bay không? 

8. Cài lại app 			
App có vấn đề gì sau khi cài lại hay không? 

9. Kiểm tra trên live 			
Có tìm thấy ứng dụng trên app srote, play store sau khi go live hay không ? 

10. Button 
- Size: Đảm bảo tất cả các nút nên có kích thước đúng yêu cầu và phù hợp với ngón tay user
- Location: Đảm bảo các nút được đặt trong cùng 1 phần của màn hình để tránh người dùng nhầm lẫn 
- Icon: Đảm bảo các icon phù hợp với ứng dụng
- Color: Đảm bảo các nút có cùng chức năng nên cùng màu (background)

11. Back
Đảm bảo ứng dụng cung cấp cơ chế quay lại và hoàn tác vụ trong trường hợp thao tác không đúng 

12. Menu
Đảm bảo tất cả các menu hiển thị rõ ràng, không bị che khuất bởi màn hình nhỏ

13. Text
Đảm bảo text đơn giản và rõ ràng nội dung đối với người dùng 

14. Font size 
Đảm bảo cỡ chữ đủ để đọc được ( không quá lớn, quá nhỏ - không cần zoom in, zoom out để đọc)

15. User guide
Cung cấp hướng dẫn sử dụng giúp người dùng cuối hiểu và có thểvận hành ứng dụng dễ dàng.