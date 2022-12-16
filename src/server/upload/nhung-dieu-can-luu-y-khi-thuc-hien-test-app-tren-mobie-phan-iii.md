# Compatibility testing
## Đối với Device

### Hardware
1. Resolution 
Chú ý tới sự tương thích của ứng dụng với các độ phân giải khác nhau của màn hình 
Ví dụ thử nghiệm  3G trên thiết bị android 2.3 với kích thước 320 x 480px,  wifi trên thiết bị 4.0  có kích thước 768 x 1024 px…
2. Screen size 
Test sự tương thích của ứng dụng trên các màn hình khác nhau 
3. Type of mobile phone 
Kiểm tra ứng dụng trên các loại thiết bị khác nhau : có thể chạy ổn trên device này, nhưng sẽ lỗi trên device khác.

### Software 
1. OS version
Kiểm tra thử nghiệm với các phiên bản hệ điều hành khác nhau 
2. Browser 
Thực hiện trên các ứng dụng di động và nhiều browser khác nhau : IE, FF, chrome ..

## Đối với App
1. Kiểm tra sự tương thích : đảm bảo ứng dụng này sẽ  tương thích với các phiên bản cũ hơn (  nếu ứng dụng yêu cầu tương thích với tất cả hoặc 1 vài phiên bản cũ trước đó)
2. Kiểm tra sự tương thích chuyển tiếp: đảm bảo ứng dụng này sẽ  tương thích với các phiên bản mới hơn ( ví dụ như : Nâng cấp dễ dàng hay không.. ?)

## Kiểm tra Network 

### Change network 
1. Xác định hiệu suất ứng dụng khi chuyển đổi mạng : 2G, 3G thành wifi hoặc ngược  lại 
2. Cần phải check trên nhiều nhà mạng khác nhau: 3G, 4G, wifi 

### Multi kết nối 
- Đảm bảo app hoạt động tốt khi có nhiều kết nối Network 

# Interaction testing
1. Button in device : Kiểm tra xem nút [Back] có đưa người dùng về màn hình trước đó.
2. Button in device : Kiểm tra nút [Menu] có hiển thị menu của ứng dụng không? 
3. Button in devive : Kiểm tra nút [ Home] có đưa về màn hình chính của device không? 
4. Button in device : Kiểm tra nút [ Search] có cho người dùng sử dụng form search trong ứng dụng không? 
5. Volume
   - Volume up : Kiểm tra xem tăng âm lượng của device thì app có hoạt động bình thường không? 
   - Volume down : Kiểm tra xem giảm âm lượng của device thì app có hoạt động bình thường?
6. The sound in ON/ OFF	: Kiểm tra xem ứng dụng có hoạt đúng spec nếu khi on/ off âm thanh device không? 
7. Call 	
    - Gọi đến : Kiểm tra hoạt động của ứng dụng khi có cuộc gọi đến 
	- Gọi đi : Kiểm tra hoạt động của ứng dụng khi gọi đi 
	- Chuyển cuộc gọi : Kiểm tra hoạt động của ứng dụng khi chuyển cuộc gọi 
8. Incoming SMS : Kiểm tra hoạt động của ứng dụng khi đang sử dụng thì có tin nhắn đến 
9. Incoming Mail : Kiểm tra hoạt động của ứng dụng khi đang sử dụng thì có mail đến 
10. Send voice message : Kiểm tra hoạt động của ứng dụng khi đang sử dụng thì nhận/ gửi voice message 
11. Bluetooth 	
    - Request : Kiểm tra hoạt động của các chức năng khi có request kết nối bluetooth
	- Comumication : Kiểm tra hoạt động của các chức năng khi thực hiện kết nối/ ngắt kết nối bluetooth
12. Wifi conection : Kiểm tra hoạt động của ứng dụng khi kết nối/ ngắt kết nối wifi
13. Alam : Kiểm tra hoạt động của ứng dụng khi có chuông 
14. Schedule Alam : Kiểm tra hoạt động của ứng dụng khi có chuông nhắc sự kiện 
15. Screen short : Kiểm tra hoạt động của ứng dụng khi chụp màn hình
16. Swicht network : Kiểm tra hoạt động của ứng dụng khi chuyển giữa mang wifi và mạng di động và ngược lại . Chuyển từ wifi này sang wifi khác 
17. Headphone : Kiểm tra hoạt động của ứng dụng khi kết nối/ rút tai nghe 
18. Bluetooth : Kiểm tra hoạt động của ứng dụng khi kết nối/ ngắt kết nối Bluetooth
19. Máy in : Kiểm tra hoạt động của ứng dụng khi kết nối/ ngắt kết nối máy in
20. Usb cap : Kiểm tra hoạt động của ứng dụng khi kết nối/ ngắt kết nối băng cap USB
21. Chế độ máy bay : Kiểm tra hoạt động của ứng dụng khi on/off chế độ máy bay 
22. Chế độ yên lặng : Kiểm tra hoạt động của ứng dụng khi on/off chế độ yên lặng 
23. Thay đổi ngôn ngữ : Kiểm tra hoạt động của ứng dụng khi thay đổi ngôn ngữ của thiết bị
24. Thay đổi ngày giờ của hệ thống : Kiểm tra hoạt động của ứng dụng khi thay đổi ngày giờ của thiết bị
25. Thay đổi quốc gia : Kiểm tra hoạt động của ứng dụng khi thay đổi quốc gia của thiết bị
26. Thay dổi time zone : Kiểm tra hoạt động của ứng dụng khi thay đổi time zone của thiết bị
27. Thay đổi tài khoản google 			
28. Chạy nhiều app cùng lúc : Kiểm tra hoạt động của ứng dụng khi đang chạy app thì mở thêm nhiều app khác 
29. Xoay màn hình : Kiểm tra hoạt động của ứng dụng khi xoay thiết bị 
30. Pin 	
    - Pin yếu : Kiểm tra hoạt động của ứng dụng có bình thường khi pin yếu ( một số ứng dụng như camera không hoạt động khi pin yếu)
    - Đang sạc, ngắt sạc : Kiểm tra hoạt động của ứng dụng có bình thường khi đang sạc pin / rút sạc ra 
31. Sleep mode : Ứng dụng có hoạt động đúng khi ở chế độ sleep 
32. Nghiêng device : Ứng dụng coó hoạt động đúng khi nghiêng device? 
33. Rung lắc device : Ứng dụng có hoạt động đúng, có crash khi rung lắc điện thoại 
34. Power off : Kiểm tra hoạt động của ứng dụng khi đang hoạt động thì tắt thiết bị rồi bật lại( dữ liệu có được save không….? )
35. Update app	
    - Auto aupdate app : Kiểm tra hoat động của ứng dụng khi tự update bản mới 
	- Manual update : Kiểm tra hoạt động của ứng dụng khi nhận được thông báo update phiên bản mới cho ứng dụng
36. Kill app : Kiểm tra hoạt động của ứng dụng khi skill app rồi sử dụng lại 
37. Clear Data : Kiểm tra hoạt động của ứng dụng sau khi clear app rồi sử dụng lại
38. Remove sim : Kiểm tra hoạt động của ứng dụng sau khi tháo sim
39. Remove SD : Kiểm tra hoạt động của ứng dụng sau khi tháo thẻ nhớ , ứng dụng có chạy được trên version mới nhất của HĐH không?

# Monkey testing
1. Move and  choose an item in list : Kiểm tra phải ứng cửa ứng dụng. Khi click vào mục danh sách khi cuộn  danh sách 
2. Top/ bottom move : Kiểm tra ứng dụng có bị dừng lại hay không , khi kéo màn hình lên top/bottom liên tục 
3. Tab mutil button	: Kiểm tra phanr ứng của ứng dụng khi chạm vào 2 hoặc nhiều button cùng lúc 
4. croll list : Kiểm tra ứng dụng coó bị crash hay không khi croll list lên xuống liên tục 
5. Multi touch : Kiểm tra phản ứng của app khi touch vào nhiều điểm cùng 1 lúc 
6. Multi touch on a button : Click nhiều lần vào 1 button => app crash, freeze
7. Long touch : Kiểm tra phanr ứng của ứng dụng khi chạm lâu vào 1 điểm , hoặc 1 button 
8. Repeat swipe : Lặp lại swipe liên tục 

# Install/Uninstall testing
1. Precondition	: Xác định các điều kiện tiên quyết cần thiết cho việc cài đặt ứng dụng: version , OS, 
2. Location setting : Cài đặt nên được chạy ở vị trí mặc định và nó sẽ hiển thị cho người dùng ở vị trí mặc định, người dùng có thể thay đổi vị trí đó "
3. Location save : Kiểm tra vị trí lưu ứng dụng sau khi install
4. Show logo/ icon : Kiểm tra logo/ icon ứng dụng sau khi cài đặt
5. Install with different network:
    - Chắc chắn người dùng có thể cài đặt với các mạng khác nhau: 3g, 4 g, wifi..
    - Việc cài đặt diễn ra trôi chảy 
	- Yêu cầu thêm bộ nhớ nếu thiếu 
6. Upgrade : Sau khi Upgrade  vẫn phải lưu giữ các setting hoặc kết quả sử dụng của user(level, tin rao..)
7. Uninstall 			
    - Người dùng có thể gỡ bỏ app hay không? Sau khi xóa app thì dữ liệu , icon có được xóa ko? 
    - Khi install có ảnh hưởng tới các app không?
8. Re install : Có thể cài đặt sau khi install app. Các chuwscs năng hoạt động đúng.