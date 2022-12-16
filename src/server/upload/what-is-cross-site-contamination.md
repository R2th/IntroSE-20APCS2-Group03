Tôi sẽ trình bày ngắn gọn về ***Cross-Site Contamination***, đối tượng liên quan và sau đó cung cấp các mẹo ngăn chặn khi nhiều website được đặt trên cùng một server.
![](https://images.viblo.asia/052605d6-a425-4557-9f1f-d8b15c034d72.png)
# 1. Cross-Site Contamination là gì?
![](https://images.viblo.asia/710610a5-9c84-4085-bc01-4c18aa151caa.gif)
Các nhà phát triển thường đặt nhiều website phụ trên một server do hiệu quả kinh tế mà chúng mang lại. Nhưng một website gặp vấn đề có thể làm tăng nguy cơ tổn thương cho tất cả các website khác.

Việc tra cứu IP ngược sẽ cho kẻ tấn công biết chính xác số lượng website được lưu trữ trên một server trong vài giây. Đã đến lúc ngăn chặn nó.

Khi một website bị tấn công, sau đó lây lan sang các website khác trên một server. Đây là Cross-Site Contamination. Tình huống trong thực tế thường gặp như: Khi một đồng nghiệp trong công ty bị cúm thì những người khác có khả năng mắc bệnh rất cao. Điều tương tự cũng xảy ra với các website. Một website có thể bị ảnh hưởng tiêu cực bởi các website lân cận trên cùng một server.
# 2. Ai nên quan tâm đến Cross-Site Contamination?
Bảo mật rõ ràng là mối quan tâm lớn đối với tất cả những người có mối liên kết với website, đó là các chủ sở hữu của website, người truy cập các website hoặc nhà phát triển website.
Thủ phạm lớn nhất của Cross-Site Contamination là các chủ sở hữu, nhà phát triển đầy tham vọng. Sau đây là các đối tượng cần quan tâm đến vấn đề bảo mật này nhiều hơn:
### WordPress Multisite
Đây là các nhà phát triển đã tạo một mạng Multisite trong WordPress.

Mặc dù đó là một tính năng tuyệt vời cho các nhà phát triển web muốn dễ dàng quản lý một mạng lưới các website có chung các cài đặt WordPress, nhưng điều này cũng là một rủi ro lớn có thể dễ dàng đầu độc tất cả.

Về bản chất, với tất cả các tài nguyên được chia sẻ, tệp, plugin... được lưu trữ ở cùng một nơi, điều này làm tăng nguy cơ một website bị tổn hại có thể dẫn đến tất cả các website trên mạng bị xâm phạm.
### Multi-Domain Hosting Account
Các website chia sẻ một tài khoản lưu trữ.

Chỉ cần một website không được bảo mật đúng cách thì kẻ xấu có thể tàn phá toàn bộ mạng lưới các website.

Có một số đối tượng cụ thể có khả năng bị ảnh hưởng bởi điều này:

- Các nhà chủ sở hữu muốn quản lý tất cả các website của họ trên một tài khoản lưu trữ.
- Các nhà phát triển sử dụng một tài khoản lưu trữ cho mọi website họ xây dựng.
### Re-selling Web Hosting
Các nhà phát triển web lưu trữ website trên server dưới dạng hợp đồng dài hạn hoặc ngắn hạn.

Đối với việc lưu trữ ngắn hạn, có thể cần đổi server thường xuyên, việc cấu hình chính xác nền tảng lưu trữ của website là rất quan trọng, tất cả các website dễ dàng bị tấn công trong quá trình này. Không cần đến toàn bộ website, chỉ cần một website bị nhiễm độc thì để phá hủy toàn bộ mạng lưới. Mức độ thiệt hại của nó gây ra với nhà phát triển là không thể tưởng tượng.

Các nhà phát triển cần phải hành động ngay bây giờ để bảo mật mạng lưới website của mình khỏi Cross-Site Contamination.
# 3. Tại sao Cross-Site Contamination xảy ra?
![](https://images.viblo.asia/35764f59-a411-4869-a6f4-d1ad44cbd426.png)
Một trong những nguyên nhân chính gây ra Cross-Site Contamination là sự cô lập kém trên server hoặc cấu hình yếu.

Đa phần mọi người tin rằng bên trong một server lưu trữ, mỗi tệp có một vị trí riêng, tương ứng với các ngăn khác nhau, nhưng điều đó không chính xác. Tất cả mọi thứ được ném vào chung trong một ngăn duy nhất. Đó là cách hầu hết các server lưu trữ sử dụng.

Một server như một ngôi nhà với các phòng khác nhau. Mỗi website sẽ là một căn phòng trong ngôi nhà đó. Khi có website bị nhiễm độc, cũng giống như trong nhà bếp có dán và chúng có xu hướng bò khắp nhà. Chúng không chỉ ở trong bếp mà chuyển từ phòng này sang phòng khác.

Hãy hình dung, website chính của bạn là phòng ngủ. Bạn làm sạch nó mỗi ngày đồng nghĩa là website chính được cập nhật thường xuyên (Các chương trình bảo mật được cài đặt). Tuy nhiên, bạn không chú ý nhiều đến tầng hầm của ngôi nhà, tầng hầm có thể là một website được tạo ra nhiều năm trước và chỉ đơn giản là quên đi. Tầng hầm trở thành nơi lý tưởng cho dán sinh trưởng, chúng sẽ xâm lấn toàn bộ ngôi nhà trong thời gian ngắn, và các website cũng gặp tình trạng tương tự khi một website bị lãng quên nhiễm bệnh.

Bị tái nhiễm nhiều lần dù phần mềm độc hại được xóa thành công khỏi website chính. Đây là dấu hiệu phổ biến cho thấy Cross-Site Contamination đang diễn ra, hãy chú ý đến những trường hợp sau:
- Các website bị lãng quên trên cùng một tài khoản lưu trữ
- Các website bị cấu hình sai trên cùng một tài khoản lưu trữ
- Các website chưa được bảo mật trên cùng một tài khoản lưu trữ
# 4. Ngăn chặn Cross-Site Contamination bằng cách nào?
### Bảo mật bằng cách ly
 Cách ly là phương pháp hiệu quả nhất để chống lại Cross-Site Contamination. Tách hệ thống thành các phần nhỏ và đảm bảo rằng mỗi phần được tách biệt với nhau. Nếu một trong số đó bị bệnh, nó không thể lây lan đến các phần khác trong hệ thống.

Cần cô lập công nghệ, chức năng, các giai đoạn phát triển và quyền.

Đầu tiên, nên tránh là trộn các công nghệ.

Thứ hai, không nên kết hợp các chức năng trong một server. Server file, server mail, server web, streaming server không nên được đặt cùng nhau.

Khi phát triển một website nên có ít nhất hai môi trường cơ bản là: Development and production.

Cuối cùng, mỗi ứng dụng nên tương ứng với một tài khoản duy nhất. Cần đảm bảo rằng không thể truy cập nhiều người dùng thông qua một tài khoản.

Hạn chế duy nhất của "Bảo mật bằng cách ly" là chi phí khá đắt đỏ nên ít được áp dụng. Nếu bạn chỉ quan tâm đến 1 website chứ không phải 99 website khác thì phương án này là tối ưu nhất.
### Kiểm tra mọi website
Đừng sử dụng quy trình bảo mật cho toàn bộ website, mà hãy kiểm tra từng website để đảm bảo chúng được được an toàn nhất.

Defender thực hiện rất tốt việc quét từng website thường xuyên, thực thi các biện pháp bảo mật nghiêm ngặt bảo ghi lại mọi hành vi, do dó bạn có thể bắt đầu từ nó.
### Thêm firewall cho từng website
Kích hoạt firewall cho mỗi website. Có thể hiệu quả hơn về chi phí.

Tuy nhiên, nếu bạn đang chạy các website của mình từ cùng một tài khoản lưu trữ, điều đó có nghĩa là mạng của bạn chỉ được bảo mật bởi một firewall và không có rào cản riêng biệt giữa mỗi website. Đây là lý do tại sao xảy ra tình trạng Cross-Site Contamination, nên việc thêm firewall vào mỗi website là rất quan trọng. Hãy đảm bảo rằng bạn đã làm đúng quy trình khi thêm để hạn chế quyền truy cập trực tiếp vào server.
### Làm sạch các domains cũ
Mạng lưới các website của bạn càng phát triển, càng dễ bị mất dấu vết của chúng.

Đó là lý do tại sao bạn nên định kỳ xem lại tài khoản lưu trữ hoặc nhiều website của bạn, ít nhất một tháng một lần.

Bất kỳ domain cũ hoặc không sử dụng nên được xóa bỏ.

Bằng cách loại bỏ các domain cũ, bạn sẽ giảm khả năng kẻ xấu lợi dụng chúng và xâm nhập hệ thống.
### Cập nhật plugins thường xuyên
Nếu bạn kết hợp các website vào cùng một tài khoản lưu trữ, bạn thường sử dụng cùng một bộ plugin cho toàn bộ.

Nếu không cập nhật thường xuyên phiên bản plugin của bạn có thể đã ngừng được hỗ trợ hay phát sinh lỗ hổng bảo mật mới.

Tuy nhiên, khá vất vả khi theo kịp tất cả các bản cập nhật plugin. Đó là khi cài đặt một plugin tự động cập nhật thực sự tiện dụng.
### Cấu hình server phù hợp
Để giữ an toàn cho các website, bạn cần cấu hình đúng server của mình.

Dưới đây là một số mẹo đơn giản:

- Tạo tài khoản riêng cho nền tảng web khác nhau.

- Tránh trộn và kết hợp các chức năng server.

- Giữ các website thử nghiệm và các website sản phẩm tách biệt. Sẽ an toàn hơn nhiều nếu bạn tách chúng ra, đặc biệt nếu bạn không nhớ xóa các website thử nghiệm sau khi hoàn thành.

Tốt hơn nữa, chỉ cần sử dụng các công cụ môi trường thử nghiệm và phân tầng riêng biệt cho phần đó của quy trình để bạn có thể tránh hoàn toàn vấn đề này.
### Sử dụng server đáng tin cậy
Nếu không thể sở hữu một server riêng thì bạn nên chọn các nhà cung cấp dịch vụ uy tín, đảm bảo tính an toàn vào bảo mật lớn

**Tuân thủ các mẹo ở trên và bảo mật mạng sẽ được tăng cường đủ để bạn không phải lo lắng về Cross-Site Contamination nữa!**

**Cần bảo mật toàn diện cho website, khi Cross-Site Contamination được phát hiện thì thường là đã lây lan trên diện rộng hay tái nhiễm nhiều lần do đó đừng phớt lờ tăng cường bảo mật chống lại nó**

*Thanks for reading!!!*

***Tham khảo:***

- [Cross Site Contamination](https://www.hacklabo.com/cross-site-contamination/)
- [The Dangers of Cross-Site Contamination and How to Prevent It](https://premium.wpmudev.org/blog/cross-site-contaminations/)
- [How to Prevent Cross-Site Contamination for Beginners](https://blog.sucuri.net/2019/02/how-to-prevent-cross-site-contamination-for-beginners.html)