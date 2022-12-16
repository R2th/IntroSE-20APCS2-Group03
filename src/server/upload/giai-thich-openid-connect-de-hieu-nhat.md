### Mở đầu
Tiếp nối với bài [Giải thích OAuthen 2.0 dễ hiểu nhất](https://viblo.asia/p/giai-thich-oauthen-20-de-hieu-nhat-4P8566pG5Y3) sẽ là bài dịch Giải thích OpenID Connect dễ hiểu nhất.

Link bài viết gốc: https://qiita.com/TakahikoKawasaki/items/498ca08bbfcc341691fe
### Bắt đầu giải thích

（１）Giả sử có 1 đoạn hội thoại xàm như sau

「Hello! Anh Hoàng đây em.」

![](https://images.viblo.asia/65075688-ca26-4554-af77-0d8165fe7fb1.png)

（２）「Uầy, thật ko đó? Chứng minh đi」
![](https://images.viblo.asia/393def77-ac84-474c-8b4d-ab12207c99f1.png)

（３）「Ờ, anh chứ ai, danh thiếp của anh đây」
![](https://images.viblo.asia/6094144d-2836-49e9-870d-df3585475e84.png)

（４）「Uầy, danh thiếp này thì ai không làm được. 」
![](https://images.viblo.asia/03916a14-34f9-4da5-838f-b087c16b19f6.png)

（５）Lần này anh Hoàng mang theo 1 danh thiếp mới. 
「Hello! Anh Hoàng đây em. Anh có mang theo danh thiếp có cả chữ kí của công ty anh đây.」
![](https://images.viblo.asia/33fe5466-e919-4c9a-bda6-79d09447ba19.png)

（６）「Rồi rồi, để em xem đã.」
![](https://images.viblo.asia/d26e11ed-74f4-44fe-99ba-f4e32ffb141c.png)

（７）Người nhận danh thiếp mang tới công ty có tên trên danh thiếp để hỏi.
「Công ty XXX ơi?」
![](https://images.viblo.asia/e6336654-4f3d-4c4a-924a-5fc7a9aeb85c.png)

（８）「Đây! Có chuyện gì?」
![](https://images.viblo.asia/ac013df3-df69-4741-90cf-722e62b6eb06.png)

（９）「Em có nhận được 1 danh thiếp có chữ kí công ty anh mà không biết thật hay giả. Cho em xin cái [Public key] để check đi anh.
![](https://images.viblo.asia/0ec64d25-731e-4b80-839c-4fc161b486fc.png)

（１０）「Ok của chú đây.」（Gửi Public key）
![](https://images.viblo.asia/dbe7415a-fa5c-43be-912b-624a2ed3e0bf.png)

（１１）Sử dụng Public key nhận được để verify chữ kí trên danh thiếp và confirm được là danh thiếp này đúng do công ty XXX phát hành.
「Ngon rồi, em xác nhận danh thiếp của anh là hàng thật nhé..」
![](https://images.viblo.asia/f20db7ad-51db-4507-93a6-a59952c2fe31.png)

（１２）Đến đây thì chúng ta thấy xuất hiện 1 khái niệm là 『Danh thiếp có chữ kí của nhà phát hành』(ND: Mục đích của câu chuyện xàm ở trên là để dẫn dắt tới khái niệm về 1 thứ dùng để chứng minh danh tính)
![](https://images.viblo.asia/74c34880-90f2-404a-91bf-d045e4826763.png)

（１３）Tương đương với khái niệm  『Danh thiếp có chữ kí của nhà phát hành』ở đây là khái niệm『ID Token』
![](https://images.viblo.asia/ae281804-9572-4e08-8b45-5f184d242af8.png)

（１４）Với danh thiếp thì có nhà phát hành thì với ID Token cũng có nhà phát hành ID Token
![](https://images.viblo.asia/111d02ec-745c-49ea-b7b6-adc53aa217bb.png)

（１５） Nhà phát hành ID Token được gọi là 『OpenID Provider』
![](https://images.viblo.asia/01e616c0-385b-4d4d-a783-a3ee0b46e28b.png)

（１６）Sau đây sẽ giải thích một cách đơn giản mối quan hệ giữa ứng dụng client (phía nhận ID Token) và OpenID Provider.
![](https://images.viblo.asia/c8c64dc0-a3ee-48e1-bef8-886e2fa689d9.png)

（１７）OpenID Provider tạo ID Token.
![](https://images.viblo.asia/8927754b-eb43-4f5f-b783-8796444642a5.png)

（１８）Rồi phát hành ID Token cho ứng dụng client.
![](https://images.viblo.asia/236a8c64-12ca-465a-9a95-002c0eb058e4.png)

（１９）Follow ở trên thì OpenID tự động tạo ID Token rồi phát hành cho ứng dụng client. Nhưng thực tế thì trước khi phát hành ID Token cho client thì OpenID Provider sẽ hỏi tới User xem có phát hành ID Token hay không. Nếu được cho phép thì User sẽ phải cung cấp thông tin xác nhận danh tính. Nói cách khác sẽ tiến hành authenticate User.
![](https://images.viblo.asia/e6acc7dd-3d33-4b0e-8008-0307003970af.png)

（２０）Trước tiên, ứng dụng client sẽ yêu cầu ID Token từ OpenID Provider
![](https://images.viblo.asia/2ee6c9a2-e6b0-4f65-b118-a28a130cd889.png)

（２１）Sau đó, OpenID Provider sẽ hỏi tới User xem có phát hành ID Token hay không. Nếu được User đồng ý phát hành ID Token thì sẽ yêu cầu User đưa ra thông tin chứng thực danh tính, tức là tiến hành Authenticate User.
![](https://images.viblo.asia/afea5cd7-8351-460e-a72b-39a225d74585.png)

(Cách thức authenticate User thì có thể bằng User ID + Password hoặc nhiều hình thức khác)

（２２）Nếu nhận được sự đồng ý cấp ID Token từ User, và thực hiện Authenticate User thành công thì, 
![](https://images.viblo.asia/c1c07954-2f38-47ec-b5fa-17fa64d65c9b.png)

（２３）OpenID Provider sẽ tạo ID Token
![](https://images.viblo.asia/c1c07954-2f38-47ec-b5fa-17fa64d65c9b.png)

（２４）Rồi phát hành ID Token cho  client.
![](https://images.viblo.asia/5973f52a-6e03-4eef-8c64-1f704aec87ce.png)

（２５）Chú ý phần khoanh vàng này
![](https://images.viblo.asia/aeba77b5-ea06-4e3a-b9cb-14a3878e252a.png)

（２６）Chỗ này thể hiện cho việc Request và Response  ID Token
![](https://images.viblo.asia/8df38cfa-1e60-4db5-b1fe-725bde73c040.png)

（２７）Phần này được người ta tiêu chuẩn hoá thành 『OpenID Connect』. Cụ thể về 『OpenID Connect』sẽ được định nghĩa trong document [『OpenID Connect Core 1.0』](https://openid.net/specs/openid-connect-core-1_0.html)

![](https://images.viblo.asia/afd413b7-f29b-49e5-ac42-d57d33dcaf9c.png)

（２８）Nhân tiện, follow của OpenID Connect rất giống với follow của phần [Giải thích OAuthen 2.0] ](https://viblo.asia/p/giai-thich-oauthen-20-de-hieu-nhat-4P8566pG5Y3)đúng ko nào?


OAuthen 2.0

![](https://images.viblo.asia/cf6ecbb3-790b-45d8-ad64-32ccb12353b2.png)

OpenID Connect 
![](https://images.viblo.asia/afd413b7-f29b-49e5-ac42-d57d33dcaf9c.png)

（２９）Điều đó là hiển nhiên, cả hai luồng xử lý đều tương tự nhau vì OpenID Connect là một phần mở rộng của OAuth 2.0. OAuth 2.0 xác định luồng xử lý để phát hành Access Token, OpenID Connect mở rộng follow đó để phát hành ID Token. Trên website của [OpenID](https://openid.net/connect/) cũng nói rõ 
> OpenID Connect 1.0 is a simple identity layer on top of the OAuth 2.0 protocol.

> (Identity, Authentication) + OAuthen 2.0 = OpenID Connect

![](https://images.viblo.asia/c7adca38-0080-49d9-93a3-2a7a40152b0e.png)

（３０）Trên thì việc để 1 server đảm nhận cả vai trò là OpenID Provider và Authorization server khá là phổ biến.
![](https://images.viblo.asia/16dd3eaa-f7ec-4e91-a28b-bcad1d173e25.png)

（３１）Trong trường hợp đó thì phía ứng dụng client có thế cùng lúc request ID Token lẫn Access Token.
![](https://images.viblo.asia/0cd00327-4800-44cc-877f-17e6af5806ec.png)

（３２）Sau khi nhận request ID Token và Access Token, OpenID Provider kiêm Authorization server sẽ hỏi tới User xem có phát hành ID Token và Access Token cho Client hay không. Nếu được cho phép thì sẽ yêu cầu User cung cấp thông tin xác nhận danh tính. 
![](https://images.viblo.asia/555887eb-1d97-46b6-86c3-5d46df9d284f.png)

（３３）Nếu nhận được sự đồng ý cấp ID Token và Access Token từ User, và thực hiện Authenticate User thành công thì, 
![](https://images.viblo.asia/c6564a2b-47ab-4686-a29c-2718174d6208.png)

（３４）OpenID Provider kiêm Authorization server sẽ tạo ID Token và Access Token,
![](https://images.viblo.asia/fcb68de3-4d1b-4b9c-bd0e-77cc51cd53ff.png)

（３５）Rồi phát hành ID Token và Access Token cho ứng dụng client.
![](https://images.viblo.asia/9e6371a7-76ec-475d-83e4-0065902db9b3.png)

（３６）Cuối cùng, rốt cuộc vì sao người ta lại đẻ ra ID Token? Nguyên nhân là vì cách thức này có thể authenticate được User, cũng như đảm bảo được các thông tin thuộc User này không bị giả mạo. Việc này cho phép việc 1 User khi đã được authenticate ở 1 nơi ( 1 OpenID Provider), thì với ID Token đã phát hành cho User đó, có thể đem đi sử dụng ở những nơi khác, và sẽ không cần thực hiện lại việc authenticate User đó nữa.


Giải thích đến đây chấm hết, cảm ơn các bạn đã theo dõi