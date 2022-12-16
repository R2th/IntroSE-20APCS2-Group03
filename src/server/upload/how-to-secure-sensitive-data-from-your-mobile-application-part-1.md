# Context
Trong bối cảnh các ứng dụng di động ngày càng xâm nhập sâu và đóng vai trò quan trọng trong hầu hết các công việc hằng ngày của chúng ta, người ta không ngừng suy nghĩ ra nhiều cách để làm cho cuộc sống tiện lợi và thoải mái nhất chỉ với một chiếc smart phone. Tôi còn nhớ khoảng hơn chục năm trước, thương mại điện tử hầu như là một khái niệm khá mới mẻ và xa lạ, chắc hẳn trong chúng ta ở thời điểm đó chẳng ai nghĩ đến việc chúng ta chỉ ngồi ở nhà và mua được tất cả các món hàng đến từ khắp các châu lục, các quốc gia, các nhãn hiệu quốc tế, cũng không nghĩ rằng chúng ta có thể đóng tiền net, tiền cáp, tiện điện nước chỉ thông qua một chiếc điện thoại, cũng không nghĩ rằng ra ngoài đường chẳng việc gì phải mang quá nhiều tiền mặt để đi mua hàng gia dụng, hàng điện tử, trả góp ... Tất cả ở thời đại này chỉ cần một chiếc smart phone là đủ. Công nghệ đã đi rất nhanh và xa, người ta đem thương mại điện tử, thanh toán trực tuyến vào ứng dụng trong hầu hết các ngành nghề, lĩnh vực trong cuộc sống, một mặt nó mang lại vô số những lợi ích nhưng trái lại, nó tiềm ẩn rất nhiều rủi ro từ việc bảo mật. Các chuyên gia vẫn hằng ngày làm việc, các nhà mật mã học vẫn hằng ngày nghiên cứu để tìm ra phương thức nào bảo mất tối ưu hoặc ít ra là giảm thiểu tối đa khả năng bị rò rỉ thông tin dẫn đến nhiều hậu quả khôn lường. Trong bài viết hôm nay, tôi sẽ cùng các bạn tìm hiểu về cách thức bảo mật cho những thông tin nhạy cảm từ ứng dụng điện thoại của bạn khi tham gia một môi trường internet rộng lớn và rủ ro.

# Traditional method
*Hyper Text Transfer Protocol  (HTTP)* - một giao thức truyền tin siêu văn bản được phát triển và ứng dụng rộng rãi trong môi trường internet toàn cầu cho phép thiết lập một kết nối để truyền - nhận thông tin giữa các máy tính tham gia vào môi trường internet. Chắc hẳn ai cũng biết rằng, thứ mà chúng ta xài quen thuộc hằng ngày như truy cập một trang web, gọi một API từ trình duyệt, từ mobile app, tất cả đều được thực hiện thông qua giao thức truyền thống này.

![](https://images.viblo.asia/08300931-4146-47df-b2e2-476719d4516e.jpg)

Cơ chế của *HTTP* rất đơn giản. Nó là giao thức quy định sự cách thức giao tiếp, truyền - nhận dữ liệu giữa server - nơi hosting trang web của bạn và client - nơi hiển thị đến end-user . Khi bạn vào một trang web từ trình duyệt, đồng nghĩa rằng trình duyệt sẽ tạo một *HTTP* Request chứa các thông tin dưới dạng raw và liên quan đến thao tác yêu cầu của bạn để  truyển lên server. Server sẽ nhận, xử lý và trả về cho trình duyệt một response để hiển thị đến người dùng. Dĩ nhiên, tất cả đều một thực tiện theo bộ giao thức này, bao gồm nhiều quy chuẩn đặc trưng mà bạn có thể tìm tại  [đây](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). Mọi thứ có vẻ ổn, không có vấn đề gì cả nếu những thông tin bạn đưa vào là những thứ bạn không cần thiết phải bảo mật hay che giấu gì cả hoặc trên thế giới, lòng tham của con người không tồn tại. 

Trong bối cảnh ngày càng nhiều vấn đề trong cuộc sống phụ thuộc vào internet, rât nhiều thông tin mật được đưa lên và tham gia trong môi trường internet thì xem ra, *HTTP* thật không an toàn mặc dù tốc độ của nó nhanh đáng kể. Hãy tưởng tượng *HTTP* giống như cách mà chúng ta truyền tin ngày trước bằng bồ câu đưa thư vậy, viết vào mảnh giấy, buộc vào chân bồ câu và không quan tâm nó có toàn vẹn và bảo mật đến tay người nhận hay không. Thật không hay phải không nào. **HTTPS** ra đời để ngăn chặn việc đó.

# What is HTTPS ?
*HTTPS* là *HTTP* được bảo mật, tức là nó tuân thủ nghiêm ngặt các concept sinh ra từ *HTTP* nhưng tất cả sẽ được bảo mật, được mã hóa để ngăn chặn những tấn công bên ngoài.

![](https://images.viblo.asia/ada49717-ef2a-4871-b3b5-a0f00ee6873f.jpg)

*HTTPS* hay còn được gọi là **HTTP over SSL**, sử dụng giao thức *SSL - Secure Socket Layer* - để mã hóa thông tin giữa client và server. *HTTPS* cho phép việc truyền - nhận thông tin giữa client-server trở nên bảo mật hơn và ngắn chặn các nguy cơ nghe lén và thâm nhập các dữ liệu nhạy cảm. *HTTPS* cho phép server biết chính xác rằng người gửi chính là họ mà không phải là một ai khác giả mạo và những thông tin cần gửi sẽ đến chính xác người nhận. Chi tiết hơn có thể tìm đọc tại [wikipedia](https://en.wikipedia.org/wiki/HTTPS), một overview khá dễ hiểu.

# What is SSL ? 
*Secure Socket Layer* là một công nghệ bảo mật cung cấp một chuẩn mã hóa thông tin giữa client - server. 

![](https://images.viblo.asia/cadd9642-9aa8-4b1e-a4cd-4c05d88be880.png)

Cơ chế hoạt động của *SSL*
1. Brower connect tạo một *HTTP* request đến server sử dụng giao thức *HTTPS* (thường được deploy ở port 443) và request một chửng chỉ số ( SSL Certificate).
2. Server send cho brower một bản copy SSL Certificate của mình chứa một số thông tin cần thiết bao gồm cả public key.
3. Browser sẽ check Certificate nhận được và đối chiếu với một danh sách Trust Certificate Authorities và kiểm tra hiệu lực của chứng chỉ. Nếu moi thứ OK, browser sẽ gen ra một session key và dùng public key đó để mã hóa rồi gửi lại cho server, nếu không browser sẽ đăng một cảnh báo về chứng chỉ không an toàn.
4. Server nhận session key đã được mã hóa và giải mã nó bằng private key của mình. 
5. Quá trình truyền - nhận dữ liệu an toàn giữa client - server bắt đầu

Có một số điểm cần làm rõ trong cách thức làm việc của *SSL*. Ví như : *SSL Certificate chứa những thông tin gì? Ai cấp Certificate đó? Danh sách Trusted CAs ở đâu ra? Public key - Private key - Session Key là gì? Self-sign Certificate là gì?* Chúng ta sẽ tìm hiểu dần nhé

#### SSL Certificate chứa những thông tin gì?
Đơn giản là một file máy tính, chưa một số thông tin theo tiêu chuẩn làm việc của *SSL*. File này sẽ được save ở phía server và tạo một bản copy để gửi cho client mỗi lần có một *HTTP* Request. *SSL* Certificate chứa một số thông tin cần thiết như thông tin bên được cấp (*Issued To*), thông tin về đơn bị cấp (*Issued By*), thông tin về thời hạn chứng chỉ (*Validity Period*), *Fingerprints* cùng một số các thông tin khác như Version, thuật toán mã hóa, Serial number ... 
Bạn có thể tìm kiếm các thông tin này từ chính trình duyệt của mình

![](https://images.viblo.asia/f40255ef-a583-4bb9-a49e-4e07064468ef.png)

#### Ai cấp Certificate đó?
Có một danh sách các nhà cung cấp các chứng chỉ số này như Sysmantec, GlobalSign, Comodo ... đã được công nhận và đảm bảo, dĩ nhiên phải tuân thử một số audits đặc biệt để được công nhận. 

#### Danh sách Trusted CAs ở đâu ra?
Khi bạn cài đặt trình duyệt, mặc định nó sẽ cài đặt một danh sách các CAs này, suy cho cùng nó cũng đến từ sư TRUST của bạn với trình duyệt web đang dùng mà thôi.

#### Public key - Private key - Session Key là gì?
Đây là các key được sử dụng trong cơ chế mã hóa dữ liệu mà SSL định nghĩa

- *Public key* : Là khóa public - ai cũng có quyền biết nó, sử dụng để mã hóa session key.
- *Private key* : Là khóa bí mật, được server giữ riêng để giải mã.
- *Session key* : Là khóa được tự động định nghĩa và gen ra ở phía client dùng để mã hóa dữ liệu.

Chi tiết về các thuật toán mã hóa sử dụng tôi sẽ nói ở phần sau.

#### Self-sign Certificate là gì?
Chắc hẳn các bạn đã nghe đến khái niệm này ít nhiều. Đây là một dạng chứng chỉ số tự ký - nghĩa là không được cung cấp bởi các Trusted CAs mà là do phía server tự định nghĩa cho mình. Dĩ nhiên, chứng chỉ này vẫn hoạt động được, vẫn thiết lập kết nối SSL an toàn, dữ liệu của bạn cũng sẽ được mã hóa giữa các session ... tuy nhiên, chính phía server đã không được chứng thực cho sự an toàn của mình. Khi browser check certificate này là loại self-sign, nó sẽ hiển thị một cảnh báo an toàn rằng bạn có chấp nhận rủi ro hay không tương tự như việc chứng chỉ được CAs cung cấp nhưng đã hết hạn.

# Cơ chế mã hóa trong SSL
Để tăng độ bảo mật, *SSL* sử dụng encryption algorithm để mã hóa dữ liệu, khác với encoding mà chúng ta vẫn thường nghe. **Sự khác nhau giữa encoding và encryption là gi?** 
1.  **Encoding** là mã hóa sử dụng thuật toán. Đơn giản là chúng ta biến A -> B thông qua một thuật toán nào đó và tất cả việc mã hóa A đều sinh ra kết quả là B, không phụ thuộc vào bất cứ điều gì khác. Encoding đơn giản nên thường không được sử dụng trong bảo mật hệ thống. Một số encoding algorithm đơn giản thường thấy như Base64 encoding, URL encoding ...
2.  **Encryption** sử dụng chìa khóa (key) trong việc mã hóa do đó dẫn đến việc mã hóa A không phải lúc nào cũng ra B mà phụ thuộc vào key. Do đó, tính bảo mật của nó cao hơn Encoding rất nhiều và thường được sử dụng trong mã hóa dữ liệu. 

*Encryption* gồm 2 loại chính là *Symmetric Encryption* - mã hóa đối xứng và *Asymmetric Encryption* - mã hóa bất đối xứng.
1. *Symmetric Encryption* - mã hóa đối xứng sử dụng một key để mã hóa dữ liệu theo một thuật toán đối xứng. Nghĩa là việc encrypt và decrypt đều sử dụng một key để mã hóa, do đó cả client và server đều cần phải biết key này và dẫn đến việc rủi ro trong quá trình truyền nhận key. Để tránh việc rủi ro đó, người ta sẽ thiết lập cố định key này ở cả client và server nhưng đó là một ý tưởng không tốt một chút nào. Ngược lại, *Symmetric Encryption* có lợi điểm là performance khá tốt và thích hợp với mã hóa một khối lượng dữ liệu lớn. 

![](https://images.viblo.asia/957a68e3-a051-4f6f-a91b-43153e311da1.png)

2. *Asymmetric encryption* - mã hóa bất đối xứng sử dụng một cặp key, một là khóa bí mật để giải mã và một là khóa công khai để mã hóa. Khóa công khai sẽ được public và ai cũng có quyền được biết nhưng khóa bí mật sẽ chỉ được cất ở nơi sẽ thực hiện giải mã. Ưu điểm của phương pháp mã hóa này là độ bảo mật cao nhưng nhược điểm về performance.

![](https://images.viblo.asia/3795cba0-e967-453e-9d81-62368979bc17.png)

**SSL sử dụng một combination giữa symmetric encryption (mã hóa đối xứng) và asymmetric encryption (mã hóa bất đối xứng) để mã hóa dữ liệu**. Cụ thể rằng nó sẽ dùng public key để mã hóa session key - là một loại key dùng thuật toán mã hóa đối xứng để mã hóa dữ liệu. Do đó, *SSL* vẫn đảm bảo performance tốt cho các dữ liệu truyền - nhận lớn

Cụ thể hơn về các cơ chế mã hóa này, các bạn có thể tìm đọc ở [đây](https://www.ssl2buy.com/wiki/symmetric-vs-asymmetric-encryption-what-are-differences), ở [đây](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) hoặc ở [đây](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) 

# Build a secure mobile app
Mặc định các *HTTP* client lib chúng ta thường thấy ở lập trình mobile hoặc bản thân framework đều hỗ trợ kết nối *HTTPS*, điều đó có nghĩa là chỉ cần server bạn trỏ đến hỗ trợ *HTTPS* thì request/response giữa app và server đều được mã hóa. Chúng ta có thể kiểm chứng đều này với phần mềm **Charles proxy** chuyên dùng intercept và bắt request/response. Các bạn có thể tìm và thử ở [đây](https://www.charlesproxy.com/). Tuy nhiên, phần lớn các công cụ call *HTTP* hiện tại có thể tìm kiếm trên store hay download trực tiếp, hay dưới dạng add-on , extension, plug-in đều mặc định hỗ trợ *HTTPS*, điều này chứng tỏ bạn vẫn có thể call API trực tiếp lên server và làm bất kỳ điều gì nếu biết được cách tạo một *HTTP* request. Một số dự án đòi hỏi việc bảo mật cao hơn, chống hack/ trick như game hay payment app đòi hỏi một lớp bảo vệ nữa và ngắn chặn cả việc hacker hay thậm chí enduser sử dụng những tool thông thường như Postman chẳng hạn, thực hiện call API ngay cả khi họ biết token, biết cách tạo một *HTTP* request đầy đủ. 

Dựa vào cách thức hoạt động của *SSL*, chúng ta sẽ tự define một secure layer nữa, phủ lên *SSL* và đảm bảo rằng ứng dụng của bạn sẽ giảm thiểu tối đa nguy cơ bị hack/trick.

#### How it works
**1. Setup**
- Server sẽ define một hay một danh sách các cặp key (public-private key) được generate từ một thuật toán mã hóa bất đối xứng như RSA. Hỗ trợ một API để get public key và không cần authenticate bằng access token.
- Server sẽ define một API để nhận session key/ symmetric key từ client. API này yêu cầu xác thực bằng Access Token.

**2. Step by Step**
- Client request public key từ server thông qua API get public key. 
- Client generate ra một key tương ứng với thuật toán mã hóa đối xứng sẽ sử dụng. Ở đây là AES và key có độ dài 128 bit.
- Client dùng public key đã nhận được, mã hóa key vừa gen ra và send lên server thông qua API update key ở 1b.
- Server sẽ lưu key này để giải mã request/ mã hóa response. 

**3. Best practice**
- Key được gen ra ở bước 2b sẽ chỉ in-memory, nghia là tồn tại trong vòng đời ứng dụng và sẽ được regenerate lại khi ứng dụng restart.
- Cặp key mã hóa được gen ra ở 1a nên random thay đổi ngẫu nhiên và giảm thiểu việc giữ một cặp key cố định cho mọi session.
- Khi tạo một Request, hãy mã hóa tất cả những thứ có thể, ngoại trừ API endpoint và port.

# Conclusion
Bài viết này trình này lý thuyết cơ bản về bảo mật trong giao tiếp giữa server và client. Tôi sẽ quay lại với phần implementation trong các phần tiếp theo.