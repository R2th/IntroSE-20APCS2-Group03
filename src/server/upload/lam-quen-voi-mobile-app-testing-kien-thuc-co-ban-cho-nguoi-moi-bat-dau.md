SmartPhone ngày càng trở thành một phần không thể thiếu trong cuộc sống hiện đại. Theo đó, các ứng dụng dành cho di động liên tục tăng lên. Để đảm bảo chất lượng, việc áp dụng kiểm thử trên thiết bị di động cũng đã và đang được triển khai rộng rãi. Trong bài viết này, tôi sẽ chia sẻ những kiến thức cơ bản về kiểm thử ứng dụng di động mà tôi mới tìm hiểu được.

### 1. Phân loại Kiểm thử trên thiết bị di động.

Có hai loại kiểm thử trên thiết bị di động:

* Kiểm thử phần cứng: bao gồm bộ xử lý, độ phân giải - kích thước màn hình, bộ nhớ (không gian lưu trữ), camera, kết nốiradio, Bluetooth, WIFI...thường gọi là (mobile testing). 
* Kiểm thử phần mềm hoặc gọi là kiểm thử ứng dụng trên di động (mobile application testing), được phân biệt thành 3 loại: 

    **Ứng dụng gốc (Native App):** được viết riêng cho một hệ điều hành như Android, iOS, Windows Phone bằng các ngôn ngữ tương ứng.

    **Ứng dụng web (Mobile Web App):** chạy trên nền web, người dùng sẽ sử dụng các trình duyệt như Chrome, Firefox, Safari,...

    **Ứng dụng lai (Hybrid App):** là sự kết hợp giữa Native App và Mobile Web App, được viết bằng các công nghệ web như HTML5 và CSS.
    

Một vài lưu ý: 

i. Các ứng dụng gốc chỉ chạy trên một hệ điều hành nhất định trong khi các dụng web di động có thể chạy trên nhiều trình duyệt của mobile.

ii. Ứng dụng gốc cần cài đặt nhưng ứng dụng web di động thì không cần cài đặt.

iii. Ứng dụng gốc được cập nhật từ play store hoặc app store, còn ứng dụng Mobile Web lại là các bản cập nhật tập trung.

iv. Ứng dụng gốc có thể hoạt động không cần Internet nhưng ứng dụng Mobile Web thì bắt buộc phải kết nối Internet.

v. Ứng dụng gốc hoạt động nhanh hơn các ứng dụng web di động.

### 2. Tại sao kiểm thử ứng dụng di động gặp nhiều thách thức hơn?

Nhiều kiểm thử viên có quan điểm “Nếu tôi đã kiểm thử phần mềm trên máy tính, tôi có thể kiểm thử phần mềm trên SmartPhone.” Mặc dù phương pháp kiểm thử là tương tự nhau nhưng cần phải trau dồi thêm nhiều kiến thức...Thực tế kiểm thử kiểm thử ứng dụng di động gặp nhiều thách thức hơn so với kiểm thử ứng dụng trên laptop, là do: 

* **Sự đa dạng các thiết bị di động** với cấu hình phần cứng khác nhau như bàn phím cứng, bàn phím ảo, màn hình cảm ứng, kích thước màn hình,...
* **Nhiều hãng di động** như IPhone, HTC, Samsung, Nokia,...
* **Hệ điều hành di động khác nhau** bao gồm Android, IOS, Blackberry,...Mỗi hệ điều hành lại có nhiều **phiên bản** như IOS 10.3.2, IOS 9.3.3, Android 7.1.2, Android 6.0.1,...Hệ điều hành thường xuyên được cập nhật và khuyến khích lặp lại một chu kỳ kiểm thử để đảm bảo ứng dụng hoạt động bình thường.
* **Thiết bị di động có ít bộ nhớ hơn** so với máy tính.
* **Thường kết nối mạng 2G, 3G, 4G hoặc WIFI bất ổn định** so với máy tính 

### 3. Những kiến thức cơ bản cần trang bị.
* Kiến thức cơ bản về viễn thông

    Bạn sẽ cảm thấy có lợi thế hơn nếu biết những thứ có liên quan đến lĩnh vực viễn thông: 2G, 3G, GPRS, GSM, HSCSD, SIM, SMS, WAP
    
* Kiến thức về hệ điều hành/ nền tảng di động

    Hiện tại xuất hiện nhiều hệ điều hành dành cho di động như iOS, Android, Blackberry, Windows phone, Samsung Bada, Nokia Meego…Kiến thức về các hệ điều hành này rất quan trọng để bạn trở thành kiểm thử viên mobile giỏi, khi hiểu biết về khả năng và hạn chế của từng hệ điều hành sẽ giúp bạn phân biệt đâu Bug của ứng dụng và đâu là giới hạn do hệ điều hành.
    
* Khám phá điện thoại di động của chính bạn
    Hãy thử truy cập internet bằng Wifi, 3G, 4G,...Kiểm tra số IMEI, thử nâng cấp phiên bản của hệ điều hành,...hay thử những cài đặt khác. Điều đó sẽ cho bạn thêm ý tưởng về các tình huống kiểm thử.
    
### 4. Các loại kiểm thử áp dụng cho Mobile App Testing

* Interface Testing - Kiểm thử giao diện:  Test màu sắc, căn chỉnh, font chữ,... sự nhất quán giao diện giữa các màn hình, và trên các thiết bị khác nhau,...
* Function Testing - Kiểm thử chức năng: Chức năng của ứng dụng được hoạt động đúng.
* Usability Testing - Kiểm tra tính khả dụng: Đảm bảo ứng dụng dễ sử dụng, thu hút người dùng,...
* Installation tests - Kiểm thử cài đặt: Xác nhận ứng dụng bằng cách cài đặt / gỡ cài đặt trên nhiều thiết bị khác nhau, có xảy ra lỗi trong quá trình cài đặt/ gỡ, hay có hạn chế cài đặt không?...
* Compatibility Testing - Thử nghiệm tương thích: Kiểm tra khả năng tương thích của ứng dụng trên các thiết bị di động, với các trình duyệt, kích cỡ màn hình và phiên bản hệ điều hành, loại smartphone khác nhau,...
* Operational Testing: Kiểm tra khả năng sao lưu và khắc phục nếu sập nguồn điện thoại, hoặc mất dữ liệu khi nâng cấp phiên bản ứng dụng,...
* Security Testing - Kiểm thử bảo mật: Xác nhận ứng dụng không tồn tại lỗ hổng bảo mật, bảo vệ hệ thống tránh tấn công từ những hacker...
* Performance Testing - Kiểm thử hiệu năng: Giả sử thay đổi kết nối từ 3G sang 4G, hay khi nhiều user cùng sử dụng ứng dụng,...
* Stress Testing - Kiểm thử gián đoạn cuộc gọi thoại, SMS, yếu pin, thiếu bộ nhớ, ngắt kết nối mạng... trong khi ứng dụng đang chạy.

### 5. Checklist cho kiểm thử trên Mobile.

### 5.1  Cài đặt và Xác định thông tin ứng dụng

1. Xác định yêu cầu kiểm thử trên thiết bị di động nào (SamSung Note8, Iphone7Plus,...), hỗ trợ hệ điều hành nào (Android, IOS...), phiên bản của hệ điều hành ?

2. Bộ nhớ lưu trữ của ứng dụng (Thẻ nhớ hay bộ nhớ điện thoại). Điều gì xảy ra nếu xóa thư mục lưu trữ của ứng dụng.

3. Kiểm thử việc đồng bộ khi ứng dụng chạy trên nhiều thiết bị khác nhau.

4. Kiểm thử trường hợp đang download ứng dụng thì đầy bộ nhớ hoặc gián đoạn trong quá trình download.

5. Kiểm thử quá trình cài đặt, gỡ bỏ ứng dụng, cài đặt lại (Cả case bị gián đoạn).

6. Kiểm thử quá trình cập nhật phiên bản mới, không cập nhật phiên bản mới.

### 5.2 Test giao diện

1. Màu nền, màu chữ, font chữ có đúng như tài liệu design? kiểm tra xem màu nền có phù họp - có bị trùng với màu chữ gây khó đọc hoặc rối mắt?

2. Kiểm tra Font size, size của các textbox, button và căn trái/ phải/ giữa hay chiều dọc/ chiều ngang...

3. Border các textbox/ button

4. Text, tootip của warning/ message, nội dung hiển thị

5. Các hiệu ứng scroll, next trang, phân trang

6. Vị trí focus có được đặt ngay vị trí đầu tiên khi load màn hình hay không? Có trường hợp yêu cầu set vị trí focus cụ thể.

7. Giao diện màn hình khi user thực hiện các hiệu ứng cảm ứng như slide, touch, multi-touch, zoom, drag and drop, shake,...

8. Bàn phím nhập liệu/ input dữ liệu trên tất cả các màn hình

### 5.3 Test chức năng

1. Xác nhận các chức năng có trong tài liệu spec hoạt động tốt

2. Test các chức năng khi ngắt kết nối mạng wifi, kết nối chậm, kết nối 3G,2G,4G,...,chế độ máy bay ...

3. Slide, touch, scroll,...nhanh/ liên tục lặp đi lặp lại có bị freeze, hiển thị Force Close,...

4. Chuyển hướng từ các liên kết trong ứng dụng sang các trang/ mạng xã hội...có hoạt động đúng không? có gây lỗi về bảo mật?

5. Thời gian hiển thị trên ứng dụng (theo điện thoại hay server). Khi thay đổi cài đặt thời gian trên điện thoại có ảnh hưởng đến hoạt động của ứng dụng?

6. Kiểm tra sự đồng bộ dữ liệu khi đăng nhập ở nhiều thiết bị (desktop, tab, mobile)

7. Test camera nếu ứng dụng có đề cập đến ( chụp ảnh, lưu trữ...)

8. Khi chia sẻ trên G+, Facebook ...nội dung, hình ảnh có hiển thị đúng/ có lỗi giao diện không? khi share có cài sẵn ứng dụng facebook, G+ ...và không cài các ứng dụng đó.

9. Notification từ ứng dụng như update, nhắc nhở...

10. Khi sử dụng app thì có gián đoạn Cuộc gọi, SMS, Pin yếu, hoặc các trường hợp đang mở nhạc, âm thanh ứng dụng và các âm thanh gián đoạn?

### 6. Những lưu ý khi kiểm thử trên Mobile.

- Lựa chọn thiết bị: Nên chọn thiết bị đang được sử dụng phổ biến, tùy theo yêu cầu của khách hàng và nhà phát triển ứng dụng

- Ứng dụng giả lập (Emulator): Việc sử dụng ứng dụng giả lập là cần thiết và hữu ích trong các giai đoạn đầu của kiểm thử vì chúng hỗ trợ khi ứng dụng chưa được hoàn thiện,...

- Mức độ sử dụng pin: Theo dõi mức độ tiêu thụ pin trong khi chạy ứng dụng trên các thiết bị di động.

- Tốc độ của ứng dụng: Là thời gian phản hồi trên các thiết bị khác nhau, với các thông số bộ nhớ khác nhau, kết nối mạng khác nhau.

- Đảm bảo ứng dụng không bị die khi đang sử dụng

- Quá nhiều chức năng trong cùng một ứng dụng là điều không nên.

(Tham khảo từ http://www.softwaretestinghelp.com/)