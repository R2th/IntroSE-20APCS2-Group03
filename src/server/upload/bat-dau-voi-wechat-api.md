![image.png](https://images.viblo.asia/fb669ec8-0579-4266-9b8a-59828096a086.png)

Dạo gần đây, mình mới được giao làm một số công việc liên quan đến phát triển WeChat. Và để tìm hiểu về WeChat mà không có một thông tin nào trước đó rất khó vì có rất ít các tài liệu cũng như một cộng đồng nói tiếng Anh hỗ trợ chứ đừng nói gì đến tiếng Việt. Vậy nên mình viết để giảm thiểu các khó khăn khi các bạn mới tiếp cận đến phát triển WeChat. 
# Giới thiệu về WeChat
WeChat là mạng xã hội, ứng dụng nhắn tin và trả phí lớn nhất ở Trung Quốc và đang trở nên phổ biến hơn trên toàn cầu. Vào năm 2021, ứng dụng hiện tại đã có hơn 1,24 tỷ người dùng hàng tháng. So sánh với Facebook là 2,85 tỷ người dùng, WeChat hiện đang là mạng xã hội phổ biến thứ 6 trên toàn cầu. 

Vào năm 2011, WeChat (được biết tới là Weixin ở Trung Quốc) được ra mắt với tư cách là một ứng dụng nhắn tin khi các ứng dụng nước ngoài như Facebook, Youtube và WhatsApp bị cấm cửa tại Trung Quốc. WeChat cũng rất phổ biến tại Mông Cổ, Hong Kong cũng như các cộng đồng nói tiếng Trung trên thế giới. 

Bên cạnh nhắn tin, WeChat đang trở thành một siêu ứng dụng, với nhiều tính năng tích hợp như WeChat Moments có thể chia sẻ trạng thái người dùng, WeChat News cập nhật tin tức, WeChat Search công cụ tìm kiếm, cũng như thanh toán WeChat Pay...  

# Các loại tài khoản trong WeChat
Các nhãn hàng và doanh nghiệp có thể đăng ký 3 loại tài khoản Offiical Accounts (Tài khoản chính thức) cho các mặt hàng kinh doanh của mình: 
## Tài khoản Theo dõi (Subscription Account / 订阅号)
Các tài khoản Theo dõi trên WeChat tập trung vào thông tin về truyền thông thương hiệu. Nó giống như là một kênh truyền thông. Ứng dụng của loại tài khoản này là để cung cấp các nội dung chất lượng tới người dùng với mức độ hàng ngày. Mỗi ngày họ có thể đăng bài một lần. Người dùng chỉ có thể nhận được bài đăng qua thư mục theo dõi, và họ cũng không nhận được thông báo đẩy. 

Đây cũng là loại tài khoản duy nhất phục vụ cho các cá nhân như blogger, nhà văn, hay người nổi tiếng. 
## Tài khoản Dịch vụ (Service Account / 服务号)
Tài khoản Dịch vụ hỗ trợ tốt hơn về mặt dịch vụ khách hàng và CRM. Nó thiên hướng về bán hàng hơn cùng các chức năng thanh toán với WeChat Pay và có thể mở cửa hàng trong WeChat Store. 

Các bài đăng bằng tài khoản Dịch vụ sẽ được xuất hiện trên thông báo đẩy, nhưng sẽ chỉ được đăng 4 lần thông báo một tháng với mỗi lần 8 bài đăng. 

Đây là loại tài khoản phù hợp với các ngành có nhiều đối tượng khách hàng, chẳng hạn như ngân hàng, hàng không và khách sạn...
## Tài khoản Doanh nghiệp (Corporate Accounts / 企业号)
Trong khi hai loại tài khoản trên hướng đến các khách hàng, thì tài khoản Doang nghiệp dùng để giao tiếp và quản lý nội bộ. Người dùng phải được xác minh là nhân viên nội bộ để theo dõi tài khoản công ty.
## *Mini Program

Mini program là một dạng "ứng dụng trong ứng dụng" (apps within apps) của WeChat. Người dùng có thể sử dụng HTML5 và Javascript để phát triển một Mini Program có chức năng như một ứng dụng có tính năng mới dựa trên tài nguyên của WeChat. Nó có thể là ứng dụng nghe nhạc, ứng dụng bán hàng, dịch thuật, đặt hàng,... 

# Các tính năng tiêu biểu của WeChat JS SDK 
Đây là một bộ công cụ hỗ trợ các chức năng của WeChat. Cho phép developer nâng cao đáng kể trải nghiệm người dùng bằng cách sử dụng các chức năng Wechat mà người dùng quen thuộc (QR scanner, mic, chia sẻ ảnh,...).

Với một số tính năng cơ bản như: 
- Đăng nhập bằng WeChat. 
- QR code scanner. 
- Đa phương tiện: nhận diện giọng nói, camera.
- Thanh toán bằng WeChat. 
- Định vị vị trí địa lý.
- ...
# Cách sở hữu AppID và AppSecret
Có 3 cách để mở một tài khoản WeChat cho doanh nghiệp: 
1. Dùng giấy phép kinh doanh của Trung Quốc.
2. Dùng giấy phép kinh doanh của nước ngoài.
3. Đăng ký qua trung gian.

Nhưng mà dù cách nào thì cũng phải trả thêm tiền phí đăng ký khởi điểm là tầm 1 triệu đồng cùng với một quy trình xác minh mất tầm 1 tuần. 

Nhưng với tư cách là developer thì mình không có những thứ đó. WeChat hiện tại có cho phép mỗi người sử dụng một dạng tài khoản Sandbox Developer ở [đây](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index). Và với nhiều chức năng bạn chỉ có thể sử dụng được trong WeChat, thì bạn phải tải thêm WeChat Dev Tools ở [đây](https://developers.weixin.qq.com/miniprogram/en/dev/devtools/download.html). 

# Một số kinh nghiệm phát triển WeChat
- Không thực sự có nhiều hướng dẫn và cộng đồng bằng Tiếng Anh. 
- Có tài liệu chính thức của WeChat bằng tiếng Anh nhưng không đầy đủ bằng tiếng Trung. 
- Nên sử dụng Baidu để tìm kiếm hơn là Google, và tìm kiếm bằng tiếng Trung. Vì dĩ nhiên là cộng đồng người Trung sẽ có nhiều kinh nghiệm phát triển WeChat hơn nhiều.  
- Nên dùng Google Dịch hoặc Papago nếu không nói được tiếng Trung. 
- WeChat API không thực sự ổn định. 
- Debug có thể gặp khó khăn vì tính bảo mật của WeChat (mỗi sandbox account chỉ whitelist được 1 domain).

# Một số nguồn hữu ích 
- [Tài liệu chính thức. ](http://open.wechat.com/cgi-bin/newreadtemplate?t=overseas_open/docs/oa/getting-started/getting-started#getting-started_getting-started)
- [Demo cho tất cả tính năng của JS SDK.](http://demo.open.weixin.qq.com/jssdk/)
- [Nguồn Tiếng Anh](https://medium.com/le-wagon/a-video-to-help-new-developers-get-started-on-wechat-advanced-mode-apis-54638debbcfc).