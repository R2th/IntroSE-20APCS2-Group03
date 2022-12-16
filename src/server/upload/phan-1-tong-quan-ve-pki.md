## 1. Giới thiệu chung về hạ tầng cơ sở khóa công khai
&ensp;&ensp;&ensp;Trong giải pháp chữ ký số, hạ tầng cơ sở khóa công khai (Public Key Infrastructure – PKI) là hệ thống vừa mang tính tiêu chuẩn, vừa mang tính công nghệ cho phép người dùng trong một mạng công cộng không bảo mật (như Internet), có thể trao đổi thông tin một cách an toàn thông qua việc sử dụng một cặp khóa bí mật và công khai được chứng nhận bởi một nhà cung cấp chứng nhận số CA (Certificate Authority) được tín nhiệm. Nền tảng khóa công khai cung cấp một chứng chỉ số, dùng để xác minh một cá nhân hoặc một tổ chức, và các dịch vụ danh mục có thể lưu trữ và khi cần có thể thu hồi các chứng chỉ số.
### 1.1 Vai trò và chức năng 
&ensp;&ensp;&ensp;PKI cho phép những người tham gia xác thực lẫn nhau. Mục tiêu chính của PKI là cung cấp khóa công khai và xác định mối liên hệ giữa khóa và định danh người dùng. Nhờ vậy người dùng có thể sử dụng trong một số ứng dụng như: 
- Mã hóa, giải mã văn bản;
- Xác thực người dùng ứng dụng;
- Mã hóa email hoặc xác thực người gửi email; 
- Tạo chữ ký số trên văn bản điện tử. 

&ensp;&ensp;&ensp;Một PKI phải đảm bảo được các tính chất sau trong một hệ thống trao đổi thông tin: 
- ***Tính bí mật (Confidentiality):*** PKI phải đảm bảo tính bí mật của dữ liệu. 
- ***Tính toàn vẹn (Integrity):*** PKI phải đảm bảo dữ liệu không thể bị mất mát hoặc chỉnh sửa và các giao tác không thể bị thay đổi. 
- ***Tính xác thực (Authentication):*** PKI phải đảm bảo danh tính của thực thể được xác minh. 
- ***Tính không thể chối từ (Non-Repudiation):*** PKI phải đảm bảo dữ liệu không thể bị không thừa nhận hoặc giao tác bị từ chối. 
### 1.2. Các thành phần của một hạ tầng cơ sở khóa công khai
&ensp;&ensp;&ensp;PKI là cơ cấu tổ chức gồm con người, tiến trình, chính sách, thủ tục, phần cứng và phần mềm dùng để phát sinh, quản lý, lưu trữ, triển khai và thu hồi các chứng nhận khóa công khai.
![](https://images.viblo.asia/844f1e8b-2912-419a-b243-a4bc4b69971e.png)


PKI gồm các thành phần chính sau:
- ***Thực thể cuối (End Entity – EE):***
    + Đối tượng sử dụng chứng nhận (chứng thư số): có thể là một tổ chức, một người cụ thể hay một dịch vụ trên máy chủ, …
- ***Tổ chức chứng nhận(Certificate Authority – CA):***
    + Có nhiệm vụ phát hành, quản lý và hủy bỏ các chứng thư số
    + Là thực thể quan trọng trong một PKI mà được thực thể cuối tín nhiệm
    + Gồm tập hợp các con người và các hệ thống máy tính có độ an toàn cao
- ***Chứng nhận khoá công khai (Public Key Certificate):***
    + Một chứng nhận khóa công khai thể hiện hay chứng nhận sự ràng buộc của danh tính và khóa công khai của thực thể cuối
    + Chứng nhận khóa công khai chứa đủ thông tin cho những thực thể khác có thể xác nhận hoặc kiể m tra danh tính của chủ nhận chứng nhận đó
    + Định dạng được sử dụng rộng rãi nhất của chứng nhận số dựa trên chuẩn IETF  X.509. 
- ***Tổ chức đăng kí chứng nhận (Registration Authority – RA):***
Mục đích chính của RA là để giảm tải công việc của CA
    + Xác thực cá nhân, chủ thể đăng ký chứng thư số.
    + Kiểm tra tính hợp lệ của thông tin do chủ thể cung cấp.
    + Xác nhận quyền của chủ thể đối với những thuộc tính chứng thư số được yêu cầu.
    + Kiểm tra xem chủ thể có thực sự sở hữu khóa riêng đang được đăng ký hay không (chứng minh sở hữu).
    + Tạo cặp khóa bí mật, công khai. (nếu chủ thể yêu cầu)
    + Phân phối bí mật được chia sẻ đến thực thể cuối (ví dụ khóa công khai của CA).
    + Thay mặt chủ thể thực thể cuối khởi tạo quá trình đăng ký với CA.
    + Lưu trữ khóa riêng.
    + Khởi sinh quá trình khôi phục khóa
    + Phân phối thẻ bài vật lý (thẻ thông minh)
- ***Kho lưu trữ chứng nhận (Certificate Repository – CR):***
    + Hệ thống (có thể tập trung hoặc phân tán) lưu trữ chứng thư và danh sách các chứng thư bị thu hồi
    + Cung cấp cơ chế phân phối chứng thư và danh sách thu hồi chứng thư (CRLs - Certificate Revocatio Lists).
<br><br>![](https://images.viblo.asia/fc3f1782-4e9a-477b-9398-3a4a100cf011.png)
* (1) : Người dùng gửi yêu cầu phát hành thẻ chứng thư số và khóa công khai của nó đến RA;
* (2) : Sau khi xác nhận tính hợp lệ định danh của người dùng thì RA sẽ chuyển yêu cầu này đến CA;
* (3) : CA phát hành thẻ chứng thư số cho người dùng; 
* (4) : Sau đó người dùng “ký” thông điệp trao đổi với thẻ chứng thư số mới vừa nhận được từ CA và sử dụng chúng (thẻ chứng thực số + chữ ký số) trong giao dịch;
* (5) : Định danh của người dùng được kiểm tra bởi đối tác thông qua sự hỗ trợ của VA;
> VA (validation authority) : Cơ quan xác thực của bên thứ ba có thể cung cấp thông tin thực thể này thay mặt cho CA.)
* (6) : Nếu chứng thư số của người dùng được xác nhận tính hợp lệ thì đối tác mới tin cậy người dùng và có thể bắt đầu quá trình trao đổi thông tin với nó (VA nhận thông tin về thẻ chứng thư số đã được phát hành từ CA (a))
##     2. Chứng thư số
&ensp;&ensp;&ensp;Để khóa công khai của mình được chứng nhận, người dùng phải tạo ra một cặp khóa bất đối xứng và gửi cặp khóa này cho tổ chức CA. Người dùng phải gửi kèm các thông tin về bản thân như tên hoặc địa chỉ. Khi tổ chức CA đã kiểm tra tính xác thực các thông tin của người dùng , CA sẽ phát hành một giấy chứng nhận khóa công khai cho người dùng . Giấy chứng nhận là một tập tin nhị phân có thể dễ dàng chuyển đổi qua mạng máy tính.
<br>&ensp;&ensp;&ensp;Tổ chức CA áp dụng chữ ký điện tử của mình cho giấy chứng nhận khóa công khai mà CA đó phát hành. Một tổ chức CA chứng nhận khóa công khai bằng cách ký nhận
chúng. Nếu phía người dùng bên kia tin tưởng vào tổ chức CA thì họ có thể tin vào chữ ký của CA đó
<br>&ensp;&ensp;&ensp;Một số loại giấy chứng nhận khóa công khai có thể được phát hành như chứng nhận X.509, chứng nhận chất lượng và chứng nhận thuộc tính.
<br>&ensp;&ensp;&ensp;Ở đây mình chỉ giới thiệu về chứng nhận X.509 bởi vì nó được sử dụng nhiều
### &ensp;&ensp;&ensp;2.1. Chứng nhận X.509
&ensp;&ensp;&ensp;Chứng nhận X.509 là chứng nhận khóa công khai phổ biến nhất. Hiệp hội Viễn thông quốc tế (International Telecommunications Union – ITU) đã chỉ định chuẩn X.509 vào năm 1988. Đây là định dạng phiên bản 1 của chuẩn X.509. Vào năm 1993, phiên bản 2 của chuẩn X.509 được phát hành với 2 trường tên nhận dạng duy nhất được bổ sung. Phiên bản 3 của chuẩn X.509 được bổ sung thêm trường mở rộng đã phát hành vào năm 1997.  
&ensp;&ensp;&ensp;Một chứng nhận khóa công khai kết buộc một khóa công khai với sự nhận diện của một người (hoặc một thiết bị). Khóa công khai và tên thực thể sở hữu khóa này là hai mục quan trọng trong một chứng nhận. 
![](https://images.viblo.asia/c08633e0-0be3-4419-b3e3-88e033f4df4c.png)

*Phiên bản 3 của chứng nhận X.509*

* **Version**: Chỉ định phiên bản của chứng nhận X.509.
*  **Serial Number**: Số loạt phát hành được gán bởi CA. Mỗi CA nên gán một mã số loạt duy nhất cho mỗi giấy chứng nhận mà nó phát hành.
*  **Signature Algorithm:** Thuật toán chữ ký chỉ rõ thuật toán mã hóa được CA sử dụng để ký giấy chứng nhận. Trong chứng nhận X.509 thường là sự kết hợp giữa thuật toán băm (chẳng hạn như MD5 hoặc SHA-1) và thuật toán khóa công khai (chẳng hạn như RSA).
*  **Issuer Name:** Tên tổ chức CA phát hành giấy chứng nhận, đây là một tên phân biệt theo chuẩn X.500 (xem Phụ lục A). Hai CA không được sử dụng cùng một tên phát hành.
*  **Validity Period**: Trường này bao gồm 2 giá trị chỉ định khoảng thời gian mà giấy chứng nhận có hiệu lực. 
<br>Hai phần của trường này là *not-before* và *not-after*. 
    * **Not-before** chỉ định thời gian mà chứng nhận này bắt đầu có hiệu lực, 
    * **Not-after** chỉ định thời gian mà chứng nhận hết hiệu lực. 
    <br>Các giá trị thời gian này được đo theo chuẩn thời gian Quốc tế, chính xác đến từng giây.
*  **Subject Name:** là một X.500 DN, xác định đối tượng sở hữu giấy chứng nhận mà cũng là sở hữu của khóa công khai. Một CA không thể phát hành 2 giấy chứng nhận có cùng một Subject Name.
*  **Public key:** Xác định thuật toán của khóa công khai (như RSA) và chứa khóa công khai được định dạng tùy vào kiểu của nó.
* **Issuer Unique ID và Subject Unique ID**: Hai trường này được giới thiệu trong X.509 phiên bản 2, được dùng để xác định hai tổ chức CA hoặc hai chủ thể khi chúng có cùng DN. RFC 2459 đề nghị không nên sử dụng 2 trường này.
* **Extensions**: Chứa các thông tin bổ sung cần thiết mà người thao tác CA muốn đặt vào chứng nhận. Trường này được giới thiệu trong X.509 phiên bản 3.
* **Signature**: Đây là chữ ký điện tử được tổ chức CA áp dụng. Tổ chức CA sử dụng khóa bí mật có kiểu quy định trong trường thuật toán chữ ký. Chữ ký bao gồm tất cả các phần khác trong giấy chứng nhận. Do đó, tổ chức CA chứng nhận cho tất cả các thông tin khác trong giấy chứng nhận chứ không chỉ cho tên chủ thể và khóa công khai.
<br>Những phần mở rộng của tên tập tin phổ biến cho chứng nhận X.509 bao gồm:
    *  **.cer**: chứng nhận được mã hóa theo luật mã hóa tiêu chuẩn (Canonical Encoding Rules – CER).
    * **.der**: chứng nhận được mã hóa theo luật mã hóa phân biệt (Distinguished
Encoding Rules – DER).
    * **.pem** (Privacy-Enhanced Electronic Mail): định dạng mã hóa được sử dụng để lưu trữ các chứng nhận và khóa. Một tập tin được định dạng với chuẩn này có thể chứa các khóa bí mật (RSA và DSA), khóa công khai (RSA và DSA) và các chứng nhận X509. Định dạng này lưu trữ dữ liệu ở định dạng DER được mã hóa cơ sở 64, nằm giữa "-----BEGIN CERTIFICATE-----" và "-----END CERTIFICATE-----", phù hợp cho việc trao đổi ở dạng văn bản giữa các hệ thống.
    * **.p7b, p7c**: PKCS #7 là một định dạng mã hóa cho việc lưu trữ một chứng nhận số và chuỗi chứng nhận của nó dưới dạng các ký tự ASCII. Định dạng này được sử dụng bởi CA để trả về các chứng nhận được phát hành cùng với chuỗi chứng nhận. Định dạng này có có thể được sử dụng như đầu vào cho yêu cầu gia hạn chứng nhận đến một CA.
    *  **.pfx, .p12:** PKCS #12 là một định dạng mã hóa cho việc lưu trữ một chứng nhận số và kết hợp với khóa bí mật dưới dạng các ký tự ASCII. Định dạng này luôn luôn được trả về bởi CA khi CA phát sinh các khóa và phát hành chứng nhận đồng thời.
### &ensp;&ensp;&ensp;2.2. Chu kỳ sống của chứng thư số
![](https://images.viblo.asia/581250b6-a8e3-4596-a1a2-47fc184ea08f.png)
&ensp;&ensp;&ensp;Trước khi phát hành chứng thư, cặp khóa bí mật/ công khai sẽ được phát sinh. Trong khi chứng thư có hiệu lực và được sử dụng, chứng thư có thể hết hạn hoặc
khóa bí mật của người sử dụng bị tổn thương (bị mất hoặc lộ khóa). Trong trường hợp chứng thư hết hạn, cặp khóa cũng sẽ không còn hiệu lực hoặc người sử dụng có thể yêu cầu gia hạn chứng thư cho họ. Trong trường hợp khóa bí mật bị tổn thương, chứng thư sẽ được thu hồi để phát hành chứng thư cho cặp khóa khác.
### &ensp;&ensp;&ensp;2.3. Các chức năng chính
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**a) Khởi tạo**
<br>&ensp;&ensp;&ensp;Trước khi yêu cầu một chứng thư, người dùng phải biết về CA mà mình muốn tham gia. Người dùng phải có địa chỉ của tổ chức CA và kho lưu trữ (nếu tồn tại). Người dùng cũng cần phải có giấy chứng nhận của tổ chức CA và cuối cùng cần phải có cách tạo ra cặp khóa bất đối xứng và lựa chọn các thuộc tính cho tên phân biệt (DN).
<br>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**b) Yêu cầu chứng thư**
<br>&ensp;&ensp;&ensp;Hầu hết các CA sử dụng một trong hai phương thức tiêu chuẩn của yêu cầu chứng nhận: PKCS #10 và CRMF
* ***PKCS #10***: Định dạng của thông điệp được gửi đến CA để yêu cầu chứng nhận khóa công khai 
* ***CRMF***: Định dạng của thông điệp được gửi đến CA để yêu cầu bất cứ trường nào của chứng nhận X.509
 <br>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**c) Tạo lại chứng thư**
<br> Vì nhiều lý do như giấy chứng nhận hết hạn, thêm thông tin mới vào chứng nhận, xác nhận lại khóa công khai hiện có, hoặc xác nhận khóa mới mà người dùng có thể muốn tạo mới lại chứng nhận của mình.  Khi tổ chức CA đáp ứng yêu cầu tạo mới lại này, nó sẽ phát hành cho đối tác một chứng thư mới và có thể xuất bản chứng thư mới này vào kho lưu trữ.
 <br>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**d) Hủy bỏ chứng thư**
 <br>Lý do để hủy một chứng thư là do sự nhận diện được xác nhận bởi CA đã thay đổi.
 <br>Danh sách hủy bỏ chứng nhận (Certificate Revocation List – CRL) chứa thông tin thời gian
nhằm xác định thời điểm tổ chức CA phát hành nó. CA ký CRL với cùng khóa bí mật được dùng để ký các chứng thư. Các CRL thường được chứa trong cùng kho với các chứng thư nhằm dễ dàng cho việc rút trích. 
<br>Các CA phát hành các CRL theo định kì, thường là hàng giờ hoặc hàng ngày.
<br>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**e) Lưu trữ và phục hồi khóa**
<br>Lưu trữ khóa là một dịch vụ được cung cấp bởi nhiều tổ chức CA.  Dùng để tránh trường hợp không giải mã được dữ liệu khi bị mất khóa. Để lưu trữ khóa, người dùng phải gửi khóa bí mật tới
nơi lưu trữ. Bởi vì các yêu cầu lưu trữ hay khôi phục khóa đều phải được xác minh nên người sử dụng không thể thao tác trực tiếp đến nơi lưu trữ mà phải thông qua CA phát hành chứng nhận đó.
### Tổng kết
PKI cho phép các giao dịch điện tử được diễn ra đảm bảo tính cẩn mật, toàn vẹn, xác thực và không thể phủ nhận mà không cần phải trao đổi các thông tin mật từ trước.
<br>Trên đây là những khái niệm cơ bản về PKI mà mình tìm hiểu được.
<br> Mọi người có thể tham khảo link dưới đây để xem chi tiết hơn
http://data.uet.vnu.edu.vn:8080/xmlui/bitstream/handle/123456789/896/HTTT_LeThiThuHuyen_ToanVanLuanVan.pdf?sequence=1
<br>http://dulieu.tailieuhoctap.vn/books/luan-van-de-tai/luan-van-de-tai-cao-hoc/file_goc_779802.pdf
<br>Tiếp theo là [tổng quan của hệ thống EJBCA và cách cài đặt trên WIndows](https://viblo.asia/p/tim-hieu-ve-ejbca-phan-2-gioi-thieu-ve-ejbca-va-cach-cai-dat-ejbca-tren-windows-GrLZDvEV5k0)<br>