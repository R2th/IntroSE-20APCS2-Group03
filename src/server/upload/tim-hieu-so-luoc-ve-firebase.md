# Firebase là gì?
> **Đầu tiên, chúng ta hãy cùng xem qua phần Introducing của Firebase đã nhé!**
{@embed: https://www.youtube.com/watch?v=O17OWyx08Cg&list=PLl-K7zZEsYLmOF_07IayrTntevxtbUxDL}

Để trả lời cho câu hỏi Firebase là gì thì trước hết chúng ta hãy cùng đi ngược lại những năm 2011, trước khi Firebase ra đời. Tiền thân của nền tảng Firebase chính là Envolve. Envolve đến với người dùng dưới mô hình startup, họ cung cấp cho người dùng những API để dễ dàng tích hợp tính năng chat vào trang web. Thế nhưng, người dùng lại sử dụng Envolve để truyền dữ liệu ứng dụng chứ không đơn thuần là nhắn tin trò chuyện. Chính điều này đã khiến các nhà phát triển Envolve quyết định tách riêng chat system và the real-time architecture.

![](https://images.viblo.asia/984d98f6-ecf4-46cf-9d94-ed256fa219a6.png)*Firebase là nền tảng phát triển ứng dụng đa năng của di động và website.*

Và năm 2012, Firebase ra đời dưới dạng Backend-as-a-Service với chức năng thời gian thực. Sau khi được Google mua lại vào năm 2014 thì Firebase nhanh chóng phát triển thành nền tảng phát triển ứng dụng đa năng của di động và website như ngày nay. Nền tảng này là sự kết hợp giữa cloud với hệ thống máy chủ của Google để tập trung chính cho 2 đối tượng là:
* **Develop & test your app**: phát triển và thử nghiệm các ứng dụng được thiết kế.
* **Grow & engage your audience**: phân tích dữ liệu và tối ưu hóa trải nghiệm với người dùng.

Firebase cung cấp cho chúng ta những API đơn giản, mạnh mẽ và đa nền tảng trong việc quản lý, sử dụng database, bởi vậy giờ đây chúng ta chỉ cần gọi API và phần server đã có Firebase lo!

# Những service nổi bật
Firebase là một nền tảng đa năng, nó cung cấp rất nhiều dịch vụ khác nhau cho người dùng. Thế nhưng khi nhắc đến nền tảng này thì người ta vẫn nghĩ ngay đến một số dịch vụ nổi bật như: 
## 1. Real-time Database
Dịch vụ Realtime database cho phép người dùng lưu trữ và đồng bộ dữ liệu theo thời gian thực. Dịch vụ này được lưu trữ trực tiếp trên iCloud. Trong trường hợp thiết bị của bạn ngoại tuyến thì chúng sẽ sử dụng tới bộ nhớ của thiết bị và tự động đồng bộ lên server khi thiết bị online. Do đó bạn hoàn toàn có thể yên tâm về độ tương tác.
![](https://images.viblo.asia/c410e1a2-80aa-48c6-8e7c-06badbe64f6d.png)
[https://firebase.google.com/products/realtime-database?gclid=Cj0KCQjwutaCBhDfARIsAJHWnHv-GBf_590b0lfN6_Aoe00Sl8LghYqLgo-lYIaPcTWIle0FlowshfwaAoKXEALw_wcB&gclsrc=aw.ds](https://firebase.google.com/products/realtime-database?gclid=Cj0KCQjwutaCBhDfARIsAJHWnHv-GBf_590b0lfN6_Aoe00Sl8LghYqLgo-lYIaPcTWIle0FlowshfwaAoKXEALw_wcB&gclsrc=aw.ds)

## 2. Authentication
Dịch vụ Authentication cung cấp cho ứng dụng của bạn một số phương pháp xác thực thông qua email, mật khẩu, số điện thoải, tài khoản Google, tài khoản Facebook… Với tính năng này, người dùng sẽ dễ dàng xây dựng login mà không cần sử dụng dữ liệu đăng ký riêng. Vô cùng tiện lợi và nhanh chóng phải không nào?
![](https://images.viblo.asia/f67290f3-bb05-43c9-a7c2-ef59c17b5dbf.png)
[https://firebase.google.com/products/auth?gclid=Cj0KCQjwutaCBhDfARIsAJHWnHtM80CaWIB2S-3r1WX1mZcB9PvUzkI-GO91voMOBb2ufKJcIiCmoRMaAmd_EALw_wcB&gclsrc=aw.ds](https://firebase.google.com/products/auth?gclid=Cj0KCQjwutaCBhDfARIsAJHWnHtM80CaWIB2S-3r1WX1mZcB9PvUzkI-GO91voMOBb2ufKJcIiCmoRMaAmd_EALw_wcB&gclsrc=aw.ds)
## 3. Firebase cloud messaging
Firebase được xây dựng với tính năng nguyên thủy là trò chuyện. Bởi thế Firebase cloud messaging (FCM) là tính năng cơ bản nhất của nền tảng này, nó cho phép người dùng xây dựng ứng dụng chat và đẩy thông báo tới nhiều thiết bị khác nhau như web, Android, iOS… Điểm nổi bật của dịch vụ này là hầu như không có bất kỳ mã hóa nào liên quan! FCM được tích hợp hoàn toàn với Firebase Analytics, mang đến cho bạn sự tương tác chi tiết (detailed engagement) và theo dõi chuyển đổi (conversion tracking) trong quá trình sử dụng.

Hơn thế, dịch vụ FCM còn giúp bạn tùy chọn thời điểm gửi tin là ngay lập tức hoặc vào thời điểm tương lai theo múi giờ địa phương của người dùng. Và còn rất nhiều tùy chỉnh thú vị khác đang chờ bạn khám phá nữa đấy.
![](https://images.viblo.asia/436f56e9-4ddc-4a1a-9a2e-4504710f31f2.jpg)
[https://firebase.google.com/products/cloud-messaging?gclid=Cj0KCQjwutaCBhDfARIsAJHWnHv3Oap9Nkhxp4zsR55S7F5i8V5pmHlWH8WHNzLqHVFfK6GSCDG8bYEaAsIvEALw_wcB&gclsrc=aw.ds](https://firebase.google.com/products/cloud-messaging?gclid=Cj0KCQjwutaCBhDfARIsAJHWnHv3Oap9Nkhxp4zsR55S7F5i8V5pmHlWH8WHNzLqHVFfK6GSCDG8bYEaAsIvEALw_wcB&gclsrc=aw.ds)
## 4. Firebase database query
Một trong những dịch vụ nổi bật của Firebase chính là nó có thể giúp bạn đơn giản hóa quá trình lấy dữ liệu thay vì phải thông qua các câu lệnh SQL phức tạp. Tuy nhiên việc thiết lập ngôn ngữ truy vấn tại Firebase khá khó khăn, để làm được nó thì bạn cần xây dựng một database thật chính xác nhé.
![](https://images.viblo.asia/c0d06f5b-0055-447c-9b95-3d02d2076c93.png)
[https://firebase.google.com/docs/reference/js/firebase.database.Query](https://firebase.google.com/docs/reference/js/firebase.database.Query)
## 5. Remote Config
Remote Config giúp bạn làm 2 nhiệm vụ cơ bản là:
* Cập nhật các ứng dụng một cách nhanh chóng và dễ dàng mà không cần xuất bản bản dựng mới lên app/play store.
* Bạn có thể dễ dàng cài đặt phân đoạn hoạt động trong ứng dụng dựa trên yêu cầu thiết bị hoặc người dùng đang sử dụng nó.

Để làm được điều đó, Firebase sẽ cài đặt các thông số bên máy chủ giúp người dùng cập nhật các dữ liệu ngay lập tức dù là thay đổi bố cục, bảng màu hay một phần cụ thể nào đó trong ứng dụng. Điều này hết sức hữu dụng bởi các ứng dụng thông thường sẽ bị mất hoàn toàn cài đặt nếu người dùng gỡ ứng dụng đi. Nếu muốn cài đặt trên nhiều ứng dụng khác nhau thì họ sẽ phải tự cấu hình thiết lập bằng tay trên từng thiết bị sao cho giống nhau. Quá trình này khá phức tạp và mất nhiều thời gian.
![](https://images.viblo.asia/bfc9521a-1ca0-49b5-af1b-23bc80168dad.png)
[https://firebase.google.com/products/remote-config?gclid=Cj0KCQjwutaCBhDfARIsAJHWnHva3WJ1xT3Wjgj9UNgetmCoTsPTXvN0XVCT0dYmSqPbGohJWIbUmT0aAljFEALw_wcB&gclsrc=aw.ds](https://firebase.google.com/products/remote-config?gclid=Cj0KCQjwutaCBhDfARIsAJHWnHva3WJ1xT3Wjgj9UNgetmCoTsPTXvN0XVCT0dYmSqPbGohJWIbUmT0aAljFEALw_wcB&gclsrc=aw.ds)


Ngoài ra, Firebase còn khá nhiều dịch vụ hữu ích khác, bạn có thể trải nghiệm để tự khám phá nhé. Dựa trên bài viết trên bạn đã hiểu rõ Firebase là gì chưa nào? Không thể phủ nhận được rằng nền tảng này đã đem đến rất nhiều tiện ích cho người dùng trong quá trình phát triển ứng dụng di động và web. Việc tìm hiểu về nó sẽ giúp bạn có nền tảng tốt hơn trong các dự án và công việc liên quan đấy!

# Tài liệu tham khảo:
[https://firebase.google.com/](https://firebase.google.com/)