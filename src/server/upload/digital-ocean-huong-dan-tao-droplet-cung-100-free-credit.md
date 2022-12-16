![image.png](https://images.viblo.asia/e5d74ac1-6d4b-47e3-9138-289faf843fbf.png)

Nếu bạn đang là người học lập trình, đặc biệt về backend, về hệ thống hoặc đơn giản là lập trình website. Đến một lúc nào đó bạn cũng sẽ cần một server để chính thức “ra mắt” sản phẩm của mình trên internet.

VPS – Máy chủ cá nhân ảo: Hiện tại các nhà cung cấp gần như sẽ dùng các công nghệ ảo hoá để tối ưu tài nguyên phần cứng. Thêm vào đó nhu cầu của người dùng thường rất đa dạng cấu hình, ảo hoá giúp linh động hơn vấn đề này.

> https://edu.200lab.io/blog/digital-ocean-huong-dan-tao-droplet

> Đăng ký tài khoản Digital Ocean 100$ FREE CREDIT: https://m.do.co/c/de3cae39086b

## Tại sao lại là Digital Ocean
Digital Ocean là nhà cung cấp dịch vụ điện toán đám mây bên cạnh các ông lớn trong ngành như AWS, GCP.

![image.png](https://images.viblo.asia/4568d0d3-9ce9-4791-a9be-048738ebbcb1.png)

Một số lợi ích của Digital Ocean:

* Rất phù hợp cho startup hoặc hệ thống không quá lớn. Đội ngũ kỹ thuật dưới 50 người có thể dùng tốt.
* Đơn giản và dễ sử dụng, UX hệ thống cũng tốt. Dù bạn không biết nhiều về cloud vẫn dễ dàng dùng được.
* Hiệu năng VPS tốt và rất ổn nếu so về tầm giá.
* Hệ thống hỗ trợ đa nền tảng (OS) và luôn được update.
* Chi phí hợp lý và rõ ràng, bạn sẽ trả trên những thứ bạn thật sự dùng. Từ đó dễ ước lượng chính xác chi phí cho hệ thống hơn.
* Có nhiều bài viết hướng dẫn sử dụng và cả những tài liệu rất chi tiết về các kỹ thuật quản trị hệ thống. Đây là cái mình thích nhất ở Digital Ocean.

## Hướng dẫn tạo Droplet Digital Ocean

Digital Ocean (đại dương số) gọi VPS là Droplet (giọt nước) – một cách đặt tên thú vị nhỉ.

![image.png](https://images.viblo.asia/56aaaa6c-cf1d-43a8-aa15-7d4de4f53363.png)

### Tạo account Digital Ocean

Ở thời điểm hiện tại, khi bạn tạo tài khoản mới sẽ nhận được 100$ Credit sử dụng trong vòng 60 ngày thông qua link referral của 200Lab: https://m.do.co/c/de3cae39086b.

Hãy lưu ý rằng Digital Ocean có khả năng yêu cầu bạn nhập credit card để sử dụng sau khi hết credit free. Nếu vậy bạn nhớ lưu ý thời gian để remove card nếu không có ý định sử dụng lâu dài nhé.

![image.png](https://images.viblo.asia/8b92dc21-d759-46c6-bacc-3901010cf1bf.png)
 
### Tạo Droplet

Sau khi đã tạo tài khoản và đăng nhập thành công. Ngay góc trên bên phải bạn sẽ thấy nút Create, hãy chọn Droplets.

![image.png](https://images.viblo.asia/e399eecb-b0b8-4756-8677-9c5a0470f7d2.png)

Hãy chọn cấu hình phù hợp:

VD ở đây mình sẽ dùng Ubuntu v20.x, cấu hình mình muốn basic thôi, 5$/tháng. Droplet này có 1GB RAM, 1 core CPU, 25GB SSD và băng thông 1000GB.

![image.png](https://images.viblo.asia/2fa7f265-8a31-487c-bfb0-e24a6907e282.png)

Ngay bên dưới là phần chọn Data Center hay quyết định máy chủ của bạn ở khu vực nào. Hãy chọn Singapore nếu các bạn muốn máy chủ gần Việt Nam nhất.

Ngoài ra các bạn có thể enable **IPv6** và **Monitoring** nếu cần nhé.

![image.png](https://images.viblo.asia/d3ba7ff0-9171-4be0-886e-8fbb3c5d2238.png)

Thiết lập cách thức đăng nhập (authentication) vào Droplet: Phần này quan trọng vì nó ảnh hưởng tới bảo mật. Theo mình các bạn nên dùng phương thức **SSH keys** thay vì **password**.

![image.png](https://images.viblo.asia/d813e507-c628-414d-92d4-2f502562d936.png)

Ở lần đầu tiên vào đây, các bạn sẽ không có **SSH Keys** nào để chọn cả. Yên tâm, cứ bấm nút “New SSH Key” là sẽ được Digital Ocean hướng dẫn chi tiết như popup dưới đây:

![image.png](https://images.viblo.asia/7d996237-4d6c-4a68-976a-b9c04ea66fe4.png)

Lưu ý nếu bạn đã từng gen SSH Key rồi thì đừng gen nữa nha, coi chừng mất hiệu lực key cũ là phiền đấy. Để kiểm tra thì các bạn dùng lệnh `cat ~/.ssh/id_rsa.pub` để lấy nội dung key nha.

> SSH Key là một cặp public và private key. Chúng ta lấy key public thôi chứ key private là không được tiết lộ nhé.

Nếu bạn làm đúng thì SSH Key có dạng thế này.

![image.png](https://images.viblo.asia/9421cb08-5e0b-480a-b307-74bfa499b1a0.png)

Phần còn lại chỉ là thêm các metadata cho dễ quản lý khi bạn có nhiều Droplet. Cứ bỏ qua chúng và ấn nút “**Create Droplet**“.

Đợi một tí là **Droplet** sẽ sẵn sàng, bạn có thể copy lại số **IP** để trỏ domain vào hoặc tiến hành truy cập vào cài đặt nhé:

![image.png](https://images.viblo.asia/6071bf79-3dd9-4e60-9fd3-6480385b0bf8.png)

## Truy cập vào Droplet với lệnh SSH

Mở console hoặc terminal nhập lệnh: `ssh root@157.230.251.65`

Nếu mọi thứ ổn thì bạn được “welcome” và điều khiển được Droplet rồi nhé:

![image.png](https://images.viblo.asia/58cceba4-c62a-4228-b947-863e0f69473d.png)

## Các điểm yếu của Digital Ocean

Nếu các bạn đã dùng Digital Ocean một thời gian và nay muốn ứng dụng và hệ thống thực tế thì cần cân nhắc những điều sau:

1. Digital Ocean chỉ có một vài Data Center Region, ít hơn đáng kể so với AWS và GCP.
2. Phân quyền chi tiết cụ thể từng cụm và nhóm chức năng là thứ mà Digital Ocean chưa có (so sánh với IAM của AWS).
3. Thiếu các hệ thống monitoring chuyên sâu. Gần dây Digital Ocean có ra mắt hệ thống này nhưng cũng còn rất mới.
4. Không có các Cloud Function như Lamda AWS và cũng không có các VPS thiên về sức manh tính toán GPU (để training model AI).
5. Cuối cùng, thứ mà mình thấy nghiêm trọng nhất là cứ tầm lâu lâu có email thông báo hệ thống đang khắc phục lỗi mạng hoặc một cum server nào đó bị ảnh hưởng nên bị gián đoạn hoặc giảm hiệu năng. Tuy nhiên vấn đề này đang dần được khắc phục rất nhiều.

## Kết

Mình hy vọng qua bài viết này có thể giúp các bạn dễ dàng tạo được các Droplet cũng như tìm hiểu thêm về Digital Ocean. Bản thân mình cũng đang dùng nó cho các sản phẩm nhỏ đến trung bình, tải không quá cao (tầm dưới 50K CCU) và ít nodes (dưới 25 nodes).

Bài tiếp theo mình sẽ dưới dẫn các bạn deploy thử một website cơ bản với domain hỗ trợ SSL Let’s encrypt hoàn toàn tự động và miễn phí với Docker nhé.