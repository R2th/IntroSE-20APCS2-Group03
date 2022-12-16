## Tại sao nên đọc bài này?

- Nắm được sự khác biệt giữa Web 2 và Web 3
- Tránh bị hack, bỏ tư duy đổ lỗi khi bị hack

## Email và Mật khẩu - chìa khóa mở ra cách cửa Web 2

Đã từ rất rất lâu rồi, email và mật khẩu luôn là thứ mặc định của bất kì ai khi bắt đầu bước chân vào thế giới Web 2

- Chat Yahoo? Tạo tài khoản Yahoo!
- Chơi game? Lập tài khoản với Email và mật khẩu
- Quẹt tinder? Đăng nhập qua Facebook, nhưng vào được Facebook cũng vẫn cần Email và Mật khẩu

![image.png](https://images.viblo.asia/c0ae9a97-f7b6-432c-8cc8-9eccd021bfdf.png)

### Có bao giờ bạn tự hỏi: Tại sao lại cần những thứ đó? 🤔

Vì nó là thứ để định danh (Identify) bạn trên không gian mạng Web 2.0, một cái email thể hiện bạn là ai (Email is the same as you, must be original and unique),  và mật khẩu, để chứng tỏ bạn là chủ của cái email đó.

Nếu như Web 1.0 chỉ đơn thuần là một trang content và bất cứ người nào cũng sẽ có một content y chang nhau khi truy cập một trang web thì web 2.0 có một bước tiến tốt hơn: Personalization -mỗi người sẽ có content riêng cho chính mình. Cũng từ đó mà mở ra một trang khác cho lịch sử web 2.0, ứng dụng phục vụ cho cá nhân: Facebook, Paypal, Visa, TikTok…

![image.png](https://images.viblo.asia/978fb6fe-b7e6-4934-a809-b917f0284cea.png)

Nói tóm lại

- Web 1.0 - Static content - Một trang báo được copy level thế giới
- Web 2.0 - Personalize content - Dịch vụ cho riêng từng người tham gia

Vậy còn Web 3.0?

## Tài khoản của tôi, nhưng tôi không được nắm giữ nó

Chưa vội nói tới Web 3.0, cùng tìm hiểu sâu bên trong web 2.0 làm sao để có thể định danh một người nhé

Thông thường khi bạn bắt đầu **tạo một tài khoản**, flow sẽ như sau:

😃 ⇒ Nhập email/password vào form 📄 ⇒ Click submit ⇒ Service web 2.0 nhận thông tin ⇒ Mã hóa (hoặc không) ⇒ Lưu vào Database (Hiểu đơn giản đây là một tập hồ sơ lưu lại toàn bộ các tài khoản đã đăng ký)

**Đăng nhập?**

😃 ⇒ Nhập email/password của bạn ⇒ Click Submit ⇒ Service web 2.0 nhận thông tin ⇒ So sánh giữa data bạn nhập và data trong Database đã lưu ⇒ Nếu khớp thì báo thành công 🤗, không thì báo sai rồi, nhập lại đi, kèm cái `Tôi không phải Robot` 🙅‍♀️

### Thì sao?

Vấn đề là tài khoản của bạn được lưu trên Database (hồ sơ) của các dịch vụ cung cấp Web 2.0, và họ có toàn quyền với data của họ.

- Họ ghét bạn → Delete tài khoản
- Server cháy → Bay mất tài khoản
- Tài khoản để lâu không dùng ⇒ Họ vào thanh lý số dư giùm bạn
- 

![image.png](https://images.viblo.asia/30820769-506f-47c5-bd24-7a3a453d1a13.png)

Với việc lưu toàn bộ data để chứng thực của bạn được lưu ở bên cung cấp dịch vụ, họ có toàn quyền làm mọi thứ với danh nghĩa của bạn.

Ok, đương nhiên sẽ có người phản biện là họ sẽ không làm vậy vì nếu họ làm vậy thì đã chả ai thèm dùng dịch vụ của họ rồi 💁‍♂️. Điều này đúng, có thể họ sẽ không thèm đụng tới tài khoản của bạn, nhưng ai mà biết được có ông hacker nào ghé qua server của họ rồi cuỗm luôn data của bạn không?

[Hàng loạt mối nguy khi CMND bị lộ](https://vnexpress.net/hang-loat-moi-nguy-khi-cmnd-bi-lo-4279873.html)

Bây giờ bạn có hai lỗ hổng khiến bạn mất tài khoản của mình:

1. Bạn bị hack 💁‍♂️
2. Dịch vụ mà bạn dùng bị hack 🙃

Bị hack là chuyện không ai muốn, nên dù có lỗi ở ai thì chắc chắn cả 2 bên: Bạn và bên cung cấp dịch vụ đều là người chịu thiệt rồi.

## Key của bạn, bạn cầm, mất thì là tại bạn

Web 3 - Thứ chứng thực bạn do bạn quản lý

Web 3 đưa ra một concept mới (với toán học thì concept nó cũng khá cũ rồi), đó là Public Key và Private key. Keyword là `Asymmetric cryptography`

Cái tên nói lên… cách bảo quản

- Public key: Khóa công khai, ai muốn lấy cũng được
- Private key: Khóa bí mật, đừng cho ai lấy, bất kì ai

So sánh với Email/Password, thì Public key tương đương với địa chỉ Email - nó đại diện cho bạn trên không gian Web 3. Còn Private cũng khá giống Password, nó để chứng minh cái Public Key trên là của bạn chứ không phải của thằng nào khác.

### Vậy khác bọt là gì?

Khác ở chỗ Private key của bạn sẽ dài như… đống bug của bạn nên khả năng nhớ được mật khẩu là điều không thể. Do đó nó sẽ là một đoạn text rất dài và thường bạn sẽ phải lưu nó vào một file. File này sau này người ta nói luôn là Private key luôn cho gọn.

![image.png](https://images.viblo.asia/7eb2765e-a91f-42ff-95d8-d3c1a0096eb1.png)

### Ngoài… dài ra thì nó có gì hơn nữa không? 30p?

Hmm thì thực ra cũng không cần public key luôn, vì thằng Private key nó đẻ ra luôn thằng Public key cũng được.

Tiếp theo là nó được sử dụng chỉ ở máy của bạn, nghĩa là phần này sẽ không bao giờ lưu ở bên cung cấp dịch vụ hay bất cứ bên nào khác. Còn nếu nó lưu chỗ khác nghĩa là bạn bị hack rồi đấy 🙂

Sự thần kì của toán học đã tạo ra một điểm thú vị cho Private Key là: Nó có khả năng sign (ký) vào Data truyền đi, và bất cứ người nào nhận được Data đó, kết hợp với public key của bạn đều có thể 100% tin tưởng đó là data của bạn.

Hiểu đơn giản là data của bạn là một tờ giấy chứa data, bạn ký vào tờ giấy đó sau rồi đưa cho người cần. Bất cừ ai khi cầm tờ giấy đó, nếu thấy chữ kí đó đều hoàn toàn đảm bảo được 100% đó là data do bạn gửi đi.

Ơ vậy lỡ chữ ký giả thì sao? Thì không được chứ sao, đã bảo đó là sự thần kì của toán học rồi mà.

Nhờ đặc tính thú vị đó, giờ đây Mật khấu - Private Key sẽ chỉ được lưu và sử dụng duy nhất tại máy của bạn. Sẽ không có người nào có thể giả danh tài khoản của bạn, hay thậm chỉ bên cung cấp dịch vụ dùng tài khoản của bạn để làm bất cứ thứ gì khác.

Điều này tạo ra keyword cho Web 3 - User own content: Data lưu trên Blockchain là vĩnh viễn, và định danh của người nào là của người đó không thể giả mạo.

Bây giờ thì nếu ai đó muốn hack tài khoản của bạn, họ chỉ có thể dùng mọi thủ đoạn để lấy được Private key, không có đường khác. Điều này vừa là một bước tiến trong việc bảo mật nhưng cũng đặt trọng trách cao hơn cho người dùng.

[https://zingnews.vn/chi-11-trieu-usd-de-dao-bai-rac-tim-8000-bitcoin-post1338806.html](https://zingnews.vn/chi-11-trieu-usd-de-dao-bai-rac-tim-8000-bitcoin-post1338806.html)

> Bạn có tự do thì bạn phải có trách nhiệm với tự do đó
> 

Với việc thiết lập cơ chế account mới tốt hơn, nó cũng tạo tiền đề cho một dịch vụ thiết yếu: Payment, hay nói rộng ra là Values Move

## Tổng kết

Tuy đã giải quyết một số vấn đề của Web 2, nhưng Web 3 cũng không phải là toàn diện, nó tốt hơn, nhưng đồng thời cũng có những vấn đề mới: khó nhớ hơn nè, phải lưu vào file nè,…

Việc tìm hiểu nó giúp mình nắm được dòng chảy của công nghệ, để sau này cũng không quá lạc hậu với thế giới.

Kỳ này mình khá tâm đắc với câu nói

> Technical solve old problems and introduces new

— Chưa ai nói thì xin lấy credit Thành Lê nha 😎
> 

## Các bài viết “lan quyên”
- https://thanhle.blog/blog/chiec-transaction-tren-blockchain-ben-trong-co-gi
- https://thanhle.blog/blog/tai-sao-minh-tin-vao-blockchain
- https://thanhle.blog/blog/blockchain-cho-moi-nguoi
- https://blog.dock.io/the-complete-history-of-the-world-wide-web/