# 1.Giới thiệu
Sự phát triển của công nghệ, đặc biệt là Internet đã giúp cuộc sống của con người trở nên thuận tiện và dễ dàng hơn. Tuy nhiên kéo theo đó là sự gia tăng nhiều hình thức lừa đảo công nghệ cao nhằm chiếm đoạt thông tin, tài sản cá nhân. Các hình thức lừa đảo này được biết đến như là các biểu hiện khác nhau của phương thức tấn công Social Engineering. Đây là 1 phương pháp được hacker mũ đen rất thích sử dụng vì nó không cần quá nhiều kỹ thuật mà đánh mạnh vào tâm lí, cảm tính của con người. 

Bài viết này sẽ tìm hiểu về Social-Engineer Toolkit, một công cụ rất mạnh để khai thác  Social Engineering.
## a. Setoolkit
Setoolkit hay Social-Engineer Toolkit được tạo ra và viết bởi Dave Kennedy, người sáng lập TrustedSec. Nó là một công cụ dựa trên Python mã nguồn mở nhằm mục đích kiểm tra thâm nhập xung quanh Social-Engineering.

![](https://images.viblo.asia/46481e3b-fbeb-4cc5-9e0a-cbd484e79317.png)

Đến nay Setoolkit có hơn 2 triệu lượt tải xuống và nhằm mục đích tận dụng các cuộc tấn công công nghệ tiên tiến trong môi trường Social Enginnering. Bộ công cụ đã được giới thiệu trong một số cuốn sách như:  “Metasploit: The Penetrations Tester's Guide” được viết bởi người sáng lập TrustedSec cũng như Devon Kearns, Jim O'Gorman, và Mati Aharoni.
## b. Cài đặt
Hiện tại thì SEToolkit đã được tích hợp sẵn trong bản cài đặt Kali Linux mới nhất. Nên với những ai đang sử dụng Kali linux thì tại Terminal ta chỉ cần gõ lệnh `setoolkit` là truy cập được.
Còn đối với các hệ điều hành khác hoặc các bản phân phối của Linux như Ubuntu thì ta có thể tải về theo 2 cách:
- Ta có thể tải trực tiếp thông qua trang chủ của dự án: Social-Engineer Toolkit - TrustedSec
- Tải qua Github của dự án: [trustedsec/social-engineer-toolkit](https://github.com/trustedsec/social-engineer-toolkit)

![](https://images.viblo.asia/2daf991a-46e1-4974-ae69-cbeeb1e0b963.png)

sử dụng lệnh:
```
git clone https://github.com/trustedsec/social-engineer-toolkit/ set/
cd set
pip install -r requirements.txt
```

Sau khi cài đặt và chạy thì ta sẽ thấy một thông báo thỏa thuận. Đọc và đồng ý với thỏa thuận là có thể sử dụng công cụ này. Giao diện của Setoolkit như sau:

![](https://images.viblo.asia/b06ca9f8-1c7f-4a38-a9d4-6ce164b40286.png)

## c. Một số tính năng chính
SET cung cấp rất nhiều vector và kỹ thuật tấn công khác nhau. Tuy nhiên ta có thể nêu ra 1 vài tính năng chính như sau:
-  <strong>Tấn công lừa đảo:</strong> Tính năng này cho phép bạn chọn từ một số tùy chọn tấn công phishing để tiếp cận nạn nhân của mình. Bạn có thể tạo các thư email có đính kèm các tải trọng độc hại và gửi chúng đến một số lượng nhỏ hoặc nhiều người nhận. Nó cũng cho phép bạn giả mạo địa chỉ email của mình bằng cách thay đổi các biến đơn giản, giúp bạn thực sự dễ sử dụng.

- <strong>Tấn công web:</strong> Mô-đun này kết hợp các tùy chọn khác nhau để tấn công nạn nhân của bạn từ xa. Nó bao gồm các kỹ thuật tấn công như Java Applet Attack và Metasploit Browser Exploit để cung cấp các payload độc hại.  Phương pháp Credential Harvester cho phép bạn sao chép trang web và thu thập thông tin từ các trường người dùng và mật khẩu, cũng như các kỹ thuật TabNabbing, HTA Attack, Web-Jacking và Multi-Attack, tất cả đều có cùng mục đích là phishing nhằm lừa người dùng tiết lộ thông tin đăng nhập của họ.

- <strong>Trình tạo phương tiện truyền nhiễm:</strong> Tính năng thú vị này cho phép bạn tạo các thiết bị đa phương tiện bị nhiễm(USB / CD / DVD) với tệp autorun.inf, sau này có thể được chèn vào bất kỳ PC nào và sẽ tự động chạy payload của Metasploit nếu tính năng chạy tự động được bật.

- <strong>Tạo Payload và Listener:</strong> Tính năng này cho phép bạn tạo các payload độc hại cho Windows, bao gồm Shell Reverse_TCP, Reverse_TCP Meterpreter, Shell Reverse_TCP X64 và Meterpreter Reverse HTTPS. 

- <strong>Tấn công Mass Mailer:</strong> Loại tấn công này có thể được thực hiện chống lại một hoặc nhiều cá nhân, thậm chí cho phép bạn nhập danh sách người dùng để gửi cho bất kỳ người nào bạn muốn. Nó cũng cho phép bạn sử dụng tài khoản Gmail cho cuộc tấn công email của bạn hoặc sử dụng máy chủ của riêng bạn hoặc chuyển tiếp mở để gửi hàng loạt.

- Ngoài các tùy chọn chính này, bạn cũng sẽ tìm thấy các lựa chọn tấn công hữu ích khác như dựa trên Arduino, Điểm truy cập không dây, Trình tạo mã QR và Vectơ tấn công Powershell. 

Bây giờ bạn đã có một cái nhìn tổng thể về Setoolkit. Bây giờ ta sẽ thử đi vào khai thác 1 tính năng của Setoolkit nhé!
# 2.Khai thác
Ta sẽ sử dụng công cụ Setoolkit để thực hiện phishing trang www.facebook.com và lấy thông tin đăng nhập. Vào giao diện của Setoolkit:

![](https://images.viblo.asia/449c79c3-c9e2-4c1f-8bab-8cf3609aa9b4.png)

Tại giao diện của Setoolkit thực hiện chọn option 1 để thực hiện tấn công `Social-engineering`. Ta được:

![](https://images.viblo.asia/ab0e0a7a-bb06-4d0c-b6c2-3407876708f8.png)

Tiếp theo chọn option 2 để thực hiện tấn công với Website:

![](https://images.viblo.asia/13845326-1419-4699-aae2-9c1c846b1385.png)

Chọn option 3 để thực hiện tấn công phishing:

![](https://images.viblo.asia/9fad5021-4a62-46ef-a8fc-9f444720375b.png)

Tại đây ta sẽ có 3 lựa chọn để tấn công:
- Web templates: Thực hiện tấn công phishing với các mẫu có sẵn như google, twitter, vv:

![](https://images.viblo.asia/7c0700c2-e90d-4803-b321-94ef91e1bb45.png)

- Site cloner: Tool sẽ tự động clone giao diện của trang web mình muốn phishing bằng cách truyền vào url của trang web:

![](https://images.viblo.asia/0951d68d-38e9-4530-a1de-8549618654ad.png)

- Custom import: Lựa chọn này sẽ cho phép ta tùy ý tạo 1 giao diện trang web phishing theo ý mình muốn.

Ta sẽ đi vào khai thác chi tiết lựa chọn 3: 

Trước hết truy cập vào trang web muốn phishing, lựa chọn tải trang web xuống. Lưu ý trước khi tải về cần lựa chọn `save as type` là `website, only html`, để tên file là `index.html`. 

Quay trở lại tool, lúc này tool sẽ yêu cầu mình nhập địa chỉ IP.  Ta sẽ thực hiện nhập địa chỉ IP nội bộ khi muốn tấn công mạng LAN và nhập địa chỉ IP ngoài của mình khi muốn tấn công mang WAN. Trong hướng dẫn này, ta sẽ thực hiện cuộc tấn công trên mạng LAN, để kiểm tra địa chỉ IP nội bộ hãy chạy `ifconfig`.
Tiếp theo nhập địa chỉ đường dẫn vừa lưu tệp `index.html`, nhớ thêm `/` ở sau đường dẫn. Và cuối cùng là nhập url trang web bạn muốn phishing. Các bước được thực hiện như ảnh sau:

![](https://images.viblo.asia/e4a91107-1eba-43df-8bd2-b9b969cce6b6.png)

Vậy là setup thành công bây giờ SET sẽ mở port 80 để nghe ngóng dữ liệu. Ở trên máy vừa cài đặt, thực hiện truy cập localhost port 80 để xem giao diện:

![](https://images.viblo.asia/404bc4e7-a222-4441-8142-7346a447795d.png)

Đối với máy thuộc cùng mạng LAN, ta sẽ truy cập thông qua địa chỉ IP nội bộ vừa nhập.
Mở rộng 1 chút, ta có thể sử dụng công cụ `ngrok` để chuyển từ khai thác LAN sang WAN. Chạy lệnh `ngrok` như sau:
`./ngrok tcp 80` ta được:

![](https://images.viblo.asia/03edb2fd-6cc8-473a-9f5c-2dfda6ba420c.png)

Bạn có thể hiểu đơn giản là lúc này ngrok đã mở cho mình 1 đường hầm giữa localhost của bạn và internet. Giúp người khác mạng có thể truy cập được localhost của bạn thông qua custom domain của ngrok, như trong ảnh trên là:

`2.tcp.ngrok.io:13690 -> localhost:80`. Thực hiện truy cập vào `2.tcp.ngrok.io:13690`:

![](https://images.viblo.asia/abad565e-0c63-4b0b-94a7-690dcd7c4c0d.png)

Khi người dùng truy cập vào url trên và nhập thông tin vào trang facebook giả này thì request sẽ được chuyển về cho SET. Giao diện SET lúc này sẽ như sau:

![](https://images.viblo.asia/458ebcf3-4aed-4ecd-b135-a4fcb3750e85.png)

Vậy là lấy thành công thông tin đăng nhập của người dùng nhập vào.

# 3. Kết luận
Setoolkit là một công cụ tấn công  Social Enginnering rất mạnh mẽ và có nhiều tùy chọn để khám phá khi làm việc với Setoolkit. Đối với bài viết này, mình chỉ đề cập đến cài đặt và các tùy chọn chính, đồng thời cho thấy việc sử dụng một trong những phương pháp lừa đảo thông dụng nhất: trang web giả mạo.

Bài viết cũng cho thấy các cuộc tấn công phishing ngày càng trở nên tinh vi hơn. Vì thế hiểu rõ được cách vận hành cũng như cách hacker khai thác sẽ giảm tối đa nguy cơ bị mất thông tin.