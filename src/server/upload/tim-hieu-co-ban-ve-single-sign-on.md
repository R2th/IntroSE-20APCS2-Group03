# Single Sign-On(SSO) là gì ?
 là cơ chế cho phép người dùng có thể truy cập nhiều trang web, ứng dụng mà chỉ cần đăng nhập một lần bất kể domain, platform,technology mà người dùng đang sử dụng.
 
 Ví dụ: Khi bạn đăng nhập vào một dịch vụ của Google như Gmail chẳng hạn, khi đăng nhập thành công ở Gmail thì lúc này bạn sẽ được tự động xác thực với Youtube, YouTube, AdSense, Google Analytics và các ứng dụng khác của Google.Tương tự như vậy khi bạn đăng nhất khỏi Gmail hoặc 1 ứng dụng khác của Google thì bạn cũng bị đăng xuất khỏi tất cả các ứng dụng của Google.Trường hợp này tôi tin chắc ai trong chúng ta cũng đã từng trải nghiệm rồi.
 
# Vậy thì lợi ích của việc này là gì ?
Thay vì mỗi ứng dụng chúng ta phải có một Account riêng và chúng ta phải nhớ tất cả chúng, thử tưởng tượng chúng ta có 10 tài khoản cứ cho rằng chúng ta đặt chúng giống nhau thì việc mỗi lần phải đăng nhập lại khi truy cập vào một ứng dụng khác cũng thấy phiền phức rồi đúng không.

Vấn đề này đã được giải quyết một cách hoàn hảo khi SSO được ra đời.SSO cung cấp cho chúng ta một trải nghiệm liền mạch cho người dùng thay vi phải đăng nhập nhiều lần và nhớ thông tin xác thực cho từng applications.Người dùng đơn giản chỉ cần đăng nhập một lần và được xác thực ở nhiều nơi.

# Cơ chế hoạt động
Một user khi đăng nhập vào hệ thống A thì domain của A sẽ lưu thông tin định danh vào cookie, để user này cũng là đã đăng nhập khi truy cập vào hệ thống B thì domain B sẽ phải đọc được cookie của A tạo ra, nhưng điều này là không thể. Với các trình duyệt hiện nay, domain chỉ có thể truy cập cookie do chính nó tạo ra.
![](https://images.viblo.asia/a62ab1fe-91b9-4063-a742-9e55f732922e.PNG)
Vì vậy, Single Sign On sẽ phải chia sẻ thông tin cookie giữa các domain với nhau. Mỗi giao thức single sign-on sẽ có cơ chế chia sẻ khác nhau, nhưng điểm chung đều là tạo ra một domain trung tâm (central domain). Qua domain này, thông tin về cookie sẽ được chia sẻ đến các domain con. Ví dụ, Central domain có thể tạo ra một json web token (jwt) và mã hóa nó. Khi ngươi dùng truy cập vào domain con thì sẽ được điều hướng đến domain trung tâm này, và token sẽ được trả lại và lưu ở phía trình duyệt. Sau đó, nếu người dùng tiếp tục truy cập vào domain con khác thì tương tự, cũng sẽ được điều hướng đến domain trung tâm, nhưng do lần này đã có token nên sẽ được định danh và việc đăng nhập lại là không cần thiết nữa.![](https://images.viblo.asia/b75453a7-f652-4fc1-b915-5d9b57ad45e2.PNG)

Bất cứ khi nào người dùng truy cập tới một domain cần yêu cầu xác thực, họ sẽ được redirect đến Central Authentication Domain (hay còn gọi là domain bên thứ 3 hoặc domain trung tâm) và Nếu User đã xác thực ở domain đó rồi thì nó sẽ được redirect ngay lập tức về domain ban đầu mà không cần đăng nhập lại.![](https://images.viblo.asia/ab5d3469-9a70-46bf-8ef9-47a0465dae89.PNG)


## Kết 
Trên đây là các kiến thức cơ bản để giúp các bạn có một cái nhìn tổng quan về SSO.

Nguồn tham khảo: https://auth0.com/blog/what-is-and-how-does-single-sign-on-work/