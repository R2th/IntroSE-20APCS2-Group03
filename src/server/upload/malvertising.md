# Giới thiệu
Hiện nay rất nhiều trang web nhúng quảng cáo để kiếm lợi nhuận, mình vào một trang xem phim mà quảng cáo cứ gọi là chằng chịt, xem vài cái quảng cáo mới vào được phim .... hmm, mình thực sự ghét quảng cáo :v nhưng với những người xem chùa như mình thì cũng nên ủng hộ những người đang bỏ công sức duy trì website hoạt động, cung cấp thêm nhiều nội dung hơn nữa trong tương lai.

Quảng cáo ngày càng xịn sò hơn khi mà nó sử dụng dữ liệu của người dùng để cung cấp nội dung phù hợp hơn, cần thiết hơn với người dùng. Nhưng thật không may, công nghệ càng phát triển thì càng phức tạp, hacker có thể lợi dụng quảng cáo để chuyển mã độc, ngay cả những trang web lớn cũng từng dính phải.

![](https://images.viblo.asia/a9a967c2-5b6e-41bb-afe9-24fc4da52274.png)

Nếu trang web của bạn đang cho chạy quảng cáo thì tức là bạn đang cho phép bên thứ ba thêm nội dung vào trang web của bạn. Bây giờ chúng ta sẽ xem quảng cáo có thể gây hại cho người dùng ra sao nhé

# Hoạt động
Các quảng cáo trên internet thường được phân phối thông qua chuỗi cung ứng gồm nhiều dịch vụ đan xen lẫn nhau. Mỗi domain trong chuỗi cung ứng đều có thể trở thành mục tiêu cho hacker. Nếu hacker có thể xâm nhập vào server hoặc `routing advertising` thì họ sẽ có một lượng lớn đối tượng (nạn nhân) để nhắm đến, hiệu quả hơn nhiều so với hack một trang web :)

![](https://images.viblo.asia/5be42a1f-c6d2-4496-8be2-3bfb769594e7.png)

Server bị xâm nhập sẽ trở thành công cụ cực kì hữu dụng cho hacker phán tán mã độc.

![](https://images.viblo.asia/ab09020f-9075-4f10-9972-f3feba20d962.gif)


Rất khó để các mạng quảng cáo phát hiện ra do chỉ có người dùng bị tấn công, hacker cũng sử dụng nhiều thủ thuật khác nhau - như trì hoãn payload hoặc chỉ nhắm mục tiêu đến mọi người dùng thứ n - để đánh lừa các quá trình quét tự động.

Malware có thể thay đổi từ khó chịu đến gây hại. Một xu hướng gần đây là sự phát triển của ransomware, phần mềm này sẽ khóa các tệp chính trên máy tính của bạn cho đến khi trả tiền chuộc bằng bitcoin.

Nếu như người dùng dính phải mã độc khi truy cập vào trang web của bạn thì có lẽ sau này họ sẽ không truy cập lại nữa, sau đây là một số cách để giảm thiểu rủi ro.

# Bảo vệ
## Rủi ro
1. **Download mã độc:** Người dùng không nhất thiết là phải click vào quảng cáo, đơn giản như xem thôi cũng đủ để truyền payload. Mã độc thường được gửi thông qua các phiên bản dễ bị tấn công như Flash và Adobe Acrobat.
2. **Chuyển hướng đến trang khác:** Cách này dùng để đánh cắp thông tin người dùng.
3. **Browser lockers:** Mã độc sẽ khóa trình duyệt, thường được coi là security alert.

## Một số kiểu nhúng mã độc thường gặp
* Malware trong ad calls
* Thông qua post-click
* trong video
* trong Flash video
* Landing page
* trong pixel

## phòng chống
- **Sử dụng nguồn cung cấp quảng cáo uy tín**: Lựa chọn networks đầy đủ giấy phép, chẳng hạn như Google. Nếu sử dụng nhà quảng cáo mới thì cần xem họ có khách hàng nào lớn hay không
- **Kiểm định bên cung cấp quảng cáo**: Hạn chế quảng cáo trong các phân đoạn thị trường có liên quan và nếu mạng quảng cáo của bạn cho phép, hãy xem xét đưa quảng cáo vào whitelist trắng riêng lẻ.
- **Triển khai content security policy**: Sử dụng `Content-Security Policy` giúp kiểm soát nội dung được sử dụng trong web-pages. Nhưng vẫn có nhiều advertising toolkits (như là Google Adsense) lại không thể bị hạn chế theo cách này, vì vậy bạn có thể tạo "soft" whitelít sử dụng `Content-Security-Policy-Report-Only` ở header.
- **Sử dụng client-side eror reporting tools**: một số tool như Sentry, TrackJS, Rollbar và Airbrake sẽ giúp bạn sẽ giúp bạn phát hiện hành vi bất thường và có thể chỉ ra nơi nhiễm quảng cáo độc hại.

# Tổng kết
Trên đây là phần giới thiệu cơ bản về Malvertising, hy vọng sẽ hữu ích cho bạn. Happy coding <3 <3 <3