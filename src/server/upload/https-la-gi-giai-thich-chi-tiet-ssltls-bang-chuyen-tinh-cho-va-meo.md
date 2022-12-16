Đã bao giờ bạn lướt web và thấy đâu đâu cũng xuất hiện cái ổ khóa nhỏ nhỏ xinh xinh ngay phía trước địa chỉ web của trình duyệt chưa?
Đó chính là biểu tượng của kết nối bảo mật bằng HTTPS. 
Vậy HTTPS là gì? HTTPS hoạt động như thế nào? Hãy cùng mình tìm hiểu trong bài viết này nha.

![rat nhieu trang web dung https](https://images.viblo.asia/ea40766d-ddb1-43cf-80cd-e436252821ee.png)

Trước khi nhắc tới HTTPS, chúng ta đầu tiên phải đề cập một chút người anh trai của nó là HTTP.

Nếu tiếng Anh là ngôn ngữ được dùng để giao tiếp nhiều nhất trên trái đất, thì trong thế giới công nghệ, HTTP lại là “*ngôn ngữ”* phổ biến nhất được dùng để giao tiếp giữa client và server. 

Nó được xây dựng dựa trên TCP - giao thức đáng tin cậy mà mình đã đề cập ở [bài trước](https://viblo.asia/p/so-sanh-chi-tiet-tcp-va-udp-tai-sao-udp-lai-nhanh-hon-tcp-zOQJw05xLMP) trong series backend nâng cao, ai chưa đọc thì có thể tìm đọc nhé.

![https trong network model](https://images.viblo.asia/bad1d0c0-1fc1-4334-8f7c-753de5dd4bd6.png)

HTTP được dùng để vận chuyển các dữ liệu như hình ảnh, văn bản hay các file đa phương tiện khác. Không chỉ dừng lại ở trình duyệt web, mà HTTP còn xuất hiện ở nhiều thiết bị / phần mềm được kết nối internet khác nữa. 

Tính riêng số lượng website trên thế giới thôi thì đã có tầm 1,8 tỉ trang (theo số liệu năm 2021), cho nên số lượng thiết bị dùng HTTP cực kì lớn.

> HTTP - HyperText Transfer Protocol
> 

Với số lượng request cũng như thiết bị và người dùng truy cập lớn như vậy, thì việc bảo mật cho kết nối HTTP là cực kì cần thiết. Do đó, HTTPS với chữ S đại diện cho Security (bảo mật) ra đời. HTTP sử dụng cổng (port) 80, trong khi HTTPS lại dùng cổng 443.

![](https://images.viblo.asia/4826d4d8-16c5-4551-b442-6de852516561.png)

## Tại sao chúng ta cần HTTPS ?

Chúng ta biết rằng HTTP dựa trên nền TCP, và TCP lại là 1 giao thức đáng tin cậy. Tuy nhiên TCP  chỉ bảo đảm gói tin được truyền tới đích thành công mà không đảm bảo được 3 điều sau:

- Data encryption and Privacy - Mã hóa thông tin để đảm bảo quyền riêng tư
- Integrity - Tính toàn vẹn
- Identification - Tính định danh

Để minh hoạ cho bài viết này thì mình sẽ dùng 1 câu chuyện với 3 nhân vật chính. Nam chính Puggy, nữ chính Katty còn phản diện sẽ là Crabby.

![main character](https://images.viblo.asia/3359e39a-e82e-4665-8d3d-aa8137776d51.png)

### Data encryption - Mã hóa thông tin

**Katty** và **Puggy** là bạn tốt với nhau (nếu không muốn nói rằng hai bạn đang thích thầm người còn lại). 
Cả 2 đều thường xuyên viết thư cho đối phương. Không may thay, một lần Katty gửi thư cho Puggy, đang trên đường vận chuyển thì **Crabby** xấu xa đã bằng cách nào đó đọc trộm được bức thư nọ.

![crabby know that](https://images.viblo.asia/1d178d0c-3e24-4208-8b49-f797a962262d.gif)

Thế là mọi thông tin trao đổi giữa Katty và Puggy đều bị lộ. Thanh niên xấu tính Crabby sẽ đi rêu rao với mọi người rằng:

> Ê tụi bay, tao biết Katty với Puggy thích nhau nè.
> 

---

Ở thế giới thực, việc này là **`cực kì nguy hiểm`.** Chúng ta trao đổi rất nhiều thông tin nhạy cảm thông qua internet, chẳng hạn như mật khẩu đăng nhập, thẻ tín dụng ngân hàng. 

Thử hình dung bạn đang có vài bitcoin trong tài khoản, trị giá gần 1 tỷ vnđ, và mật khẩu bạn bị đánh cắp, sau đó từ triệu phú bạn biến thành kẻ trắng tay.

Do đó, việc mã hóa thông tin, mục đích là để cho những kẻ trung gian như tin tặc không thể đọc hiểu được nội dung là hết sức cần thiết. Chỉ có người gửi và người nhận thông tin là có thể giải mã được nội dung dữ liệu khi chúng ta áp dụng mã hóa. 

![crabby doc duoc noi dung](https://images.viblo.asia/20ccd9ee-50e0-434c-a812-3eec5d82c020.gif)

Chúng ta sẽ tìm hiểu cơ chế mã hóa ở phần tiếp theo trong bài này.

### Integrity - Tính toàn vẹn

Tiếp tục với câu chuyện giữa 3 nhân vật của chúng ta. Lần này **Puggy** nhắn tin hồi âm cho **Katty** và bày tỏ sự bất bình với cậu bạn xấu tính **Crabby**.
Lại một lần nữa, Crabby chơi lớn, không chỉ đọc trộm tin nhắn của 2 người, cậu ta còn thay đổi nội dung bức thư.

Nội dung bức thư mới là nói xấu về Katty và chê cô ấy đủ điều. Dĩ nhiên khi nhận được thư thì Katty của chúng ta rất là bất ngờ và buồn tủi vì không nghĩ rằng Puggy ghét mình như vậy. 

![crabby thay doi noi dung](https://images.viblo.asia/dfbf7fdc-574d-4953-a7b5-1616b9a7cb30.gif)

Kể cả trường hợp nội dung bức thư đã được mã hóa, thì 2 người bạn thiện lành Katty và Puggy cũng sẽ không thể đảm bảo rằng bức thư không bị can thiệp hay dòm ngó. 

Crabby nếu trộm được bức thư nhưng không thể đọc hiểu được, cậu ta tức tối và sửa đổi lung tung nội dung sẵn có, làm cho hai người kia không thể trao đổi được thông tin. Đồ Crabby xấu xaaa.

---

Quay trở lại thế giới internet, việc bị thay đổi thông tin trong khi các máy tính giao tiếp với nhau ngoài sự nguy hiểm ra còn có thể đem lại phiền toái không cần thiết. 

Bên cạnh việc thông tin có thể bị thay đổi khiến hiểu sai ý nhau, thì một ví dụ dễ gặp nhất chính là các ISP hay các chủ khách sạn, quán cafe có thể sửa đổi thông tin và chèn quảng cáo vào website. 
Thậm chí kẻ xấu có thể lợi dụng để nhúng mã độc hoặc malware nhằm tấn công máy của bạn.

### Identification - Tính định danh

Như cái tên của nó, việc định danh giúp cho việc xác nhận rõ danh tính của người gửi dữ liệu.

Nếu Katty gửi thư cho Puggy mà chỉ đơn giản ký tên ở cuối thư, Crabby xấu tính sẽ dễ dàng học theo và có thể viết được 1 bức thư giả. Cũng như chữ ký của email vậy, ai ai cũng copy và làm giả được.

Nhưng HTTPS sử dụng chữ ký số - hay còn gọi là digital signature, được đính kèm vào bức thư. Chữ ký số này đảm bảo người nhận sẽ biết chính xác đây là thư từ ai gửi.


Bạn nào xem phim Game Of Thrones rồi sẽ thấy mỗi khi viết thư, thì các nhân vật thuộc gia tộc lớn như Stark đều đóng 1 con dấu niêm phong lại bức thư. 
Con dấu đó chính là gia huy của từng gia tộc, và dựa vào đó người nhận bức thư sẽ biết chính xác sẽ biết đây là thư của chính nhà nào (Stark).

![Stark stamp like digital signature](https://images.viblo.asia/a728b801-7b04-4bed-896a-ec0f0a1a9301.png)


## Cơ chế mã hóa của HTTPS

Để bảo mật được thông tin, HTTPS sử dụng cả 2 loại mã hóa chính là **mã hóa đối xứng** (symmetric encryption) và **mã hóa bất đối xứng** (asymmetric encryption). 

Để mình giải thích một chút về hai cơ chế mã hóa trên. 

Đầu tiên là cơ chế mã hóa đối xứng. Cơ chế này khá đơn giản, 2 bên trao đổi thông tin chỉ cần biết một chìa khóa (key) bí mật để mã hóa cũng như giải mã nội dung tin nhắn. 
Khi mã hóa làm như thế nào, thì việc giải mã sẽ đơn giản chỉ là làm ngược lại quá trình đó. 
Ví dụ cho loại này là ROT13, các bạn có thể tìm hiểu thêm.


Về mã hóa bất đối xứng, chúng ta sẽ cần 2 thứ gọi là Public Key (khóa công khai), và Private Key (khóa bí mật). Việc mã hóa thông tin thì chúng ta sẽ dùng Public Key, còn để giải mã được nội dung đó chúng ta sẽ cần dùng tới Private Key. Cơ chế này sẽ ảnh hưởng tới performance nhiều hơn là cơ chế đối xứng.

![symmetric vs asymmetric encryption](https://images.viblo.asia/c6beec98-f927-45be-a36b-de3a37724e24.png)


Túm cái váy lại, việc mã hóa thông tin rồi gửi đi giống như việc bạn đóng hàng vào 1 cái hộp. Nếu bạn có 2 cái chìa khóa y chang nhau để mở cũng như khóa lại cái hộp đó, thì đó chính là mã hóa đối xứng. 

Trường hợp còn lại chính là bạn có 2 chìa khóa khác hoàn toàn, 1 chìa bạn cho người khác giữ nhưng chỉ có thể đóng cái hộp lại, chỉ có chìa khóa bạn giữ mới có thể mở được cái hộp đó. Đây chính là mã hóa bất đối xứng.

---

Thế tại sao HTTPS lại sử dụng cả hai loại mã hóa này, sao không dùng 1 cái thôi cho đơn giản?

Bạn hãy nhớ lại ví dụ phía trên. 
Nếu HTTPS chỉ sử dụng mã hóa đôi xứng thì dù thế nào đi chăng nữa, bước đầu tiên sẽ là cả 2 bên client và server trao đổi key mã hóa với nhau. 
Key này hoàn toàn có thể bị đánh cắp bởi 1 middle-man nào đó như anh chàng Crabby crazyboiz.


Do đó, HTTPS sẽ sử dụng cơ chế bất đối xứng, cả 2 bên trao đổi Public Key mà không sợ bị giải mã tin nhắn, bởi vì chỉ có người gửi mới giữ Private Key để giải mã nó ra. 

HTTPS sử dụng thuật toán Diffie-hellman để cả 2 bên generate được session key mà không sợ bị lộ.
![](https://images.viblo.asia/d489cddc-1e98-4e71-8bdf-98edd28f4e8f.png)

Cũng phải nói một chút, cơ chế bất đối xứng sẽ khá là tốn tài nguyên CPU để xử lý, do đó HTTPS sử dụng cơ chế này chỉ để trao đổi encryption key, tức là cái key dùng cho mã hóa đối xứng.

Việc áp dụng cả 2 cơ chế này vừa đảm bảo việc không sợ bị lộ encryption key, đồng thời cũng giảm thiểu được tài nguyên và thời gian cho việc giải mã. 

## TLS Handshake

Khi bạn truy cập 1 trang web bất kỳ có giao thức HTTPS, nó sẽ hiển thị icon hình ổ khóa phía trước địa chỉ website như thế này:

![https tren address bar](https://images.viblo.asia/0627d371-1e09-47d9-bef6-818ff398888d.png)

Để hiển thị được cái bỉểu tượng này, trình duyệt của bạn sẽ phải trao đổi với server, sau đó cả 2 sẽ thành lập 1 kết nối bảo mật và trao đổi thông tin tiếp theo. 

Đầu tiên, chúng sẽ phải thỏa thuận với nhau làm thế nào để trao đổi thông tin mà vẫn đảm bảo dược tính bảo mật.

Trường hợp thỏa thuận thành công, icon hình khóa sẽ hiển thị bình thường. Còn trong những trường hợp thất bại thì sẽ có biểu tượng sẽ được báo đỏ như hình sau:

![ssl expired - failed to make secured connection](https://images.viblo.asia/82565dcb-9cc3-4b97-bd25-7935155597b7.png)

Quá trình để thỏa thuận giữa trình duyệt và máy chủ để thành lập kết nối HTTPS được gọi là “TLS Handshake” - Bắt tay TLS, cũng khá giống [three-way handshake](https://viblo.asia/p/so-sanh-chi-tiet-tcp-va-udp-tai-sao-udp-lai-nhanh-hon-tcp-zOQJw05xLMP) mà mình đã đề cập tới ở bài trước. 


Mục đích chính của quá trình bắt tay này là để thỏa thuận các thông tin liên quan thuật toán mã hóa, cũng như xác minh server xem có đáng tin cậy hay không. Bởi vì HTTPS nằm phía trên layer TCP nên rõ ràng nó sẽ xảy ra phía sau TCP three-way handshake:

![TLS handshake and threeway handshake](https://images.viblo.asia/7f88ec51-5b39-4f4f-809e-cb7b26be2c13.png)

TLS Handshake bao gồm khá nhiều gói tin gửi qua lại giữa Client và Server, tuy nhiên có thể tóm gọn lại thành 4 bước:

1. Client gửi yêu cầu tới máy chủ hỗ trợ TLS, message có tên ClientHello bao gồm danh sách các thuật toán mã hoá mà client hỗ trợ (gọi là các **cipher suite**).
2. Tiếp theo, Server sẽ phản hồi với message ServerHello, ở bước này Server sẽ chọn ra phiên bản TLS cao nhất được hỗ trợ bởi client, sau đó chọn 1 thuật toán trong danh sách mà client gửi lên.
Bênh cạnh đó, Server tiếp tục phản hồi để gửi Certificate cũng như Public Key của mình và những thông tin cần thiết khác cho Client. 
3. Client xác minh certificate của Server. Tiếp đó, nhằm mục đích tạo **Session key** để dùng cho việc mã hoá đối xứng giữa 2 bên, Client gửi đi 1 số ngẫu nhiên (có thể gọi là **pre-master key**) đã được mã hoá bằng Public Key của Server. 
Chỉ có Server mới đọc được **pre-master key** mà thôi, bởi vì chỉ riêng Private Key của Server mới giải mã được tin nhắn này.
4. Tới bước này, Server nhận **pre-master key** và tính toán ra được **master key.**  Master key sẽ được dùng để tính toán ra **session key**. Server gửi gói tin Finished.
 Hoàn thành handshake!

Well, các bạn có thể xem TLS Handshake giống như việc trao đổi “tín vật” vậy, nhằm đảm bảo Puggy và Katty có được tín vật của nhau mà không ai có thể đánh cắp. Sau đó 2 cô cậu có thể dùng tín vật để đóng dấu lên bức thư mà không sợ bị làm giả.


Ơ vậy tại sao lại phải tạo ra chẳng những pre-master key rồi lại master key, chưa kể còn tạo ra cả session key nữa chi cho lằng nhằng, sao không dùng luôn master key đi, vì pre-master key là random mà?

Đầu tiên chúng ta cần biết là *session key sẽ có thể được thay đổi* trong quá trình kết nối để đảm bảo sự bảo mật. Do đó nếu tạo lại bằng cách bắt tay lại từ đầu thì u là trời, nó sẽ ngốn tài nguyên kinh khủng. 

Vì vậy, chúng ta sẽ tạo session key bằng master key, master key lại được tạo ra từ 1 số ngẫu nhiên là pre-master key. Chính vì vậy, việc tạo ra session key mới sẽ dễ dàng hơn và cũng khó bị hack ngược lại.

Để thực hiện việc thỏa thuận session key, TLS áp dụng thuật toán Diffie-Hellman như mình đã nói ở trên. Session key sẽ không cần phải gửi qua lại giữa 2 phía mà sẽ được tính toán từ mỗi bên.

![tls and diffie hellman algorithm](https://images.viblo.asia/db4c0f97-c58d-44b1-8e3b-815574e1d18c.png)


## Phân biệt HTTPS, SSL và TLS

Đây có lẽ là phần gây lú lẫn nhất cho người mới tìm hiểu, nhưng thực ra lại khá đơn giản. Như chúng ta đã biết, HTTP là giao thức cho việc giao tiếp giữa client và server. 

Khi chuyện trao đổi thông tin trong HTTP được mã hóa bằng giao thức SSL/TLS thì nó sẽ là HTTPS. Nói một cách đơn giản là kết hợp thêm chữ **S**, đại biểu cho Secure (bảo mật).


Mà mình vừa nhắc tới SSL/TLS đúng không. OK, Để mình giải thích cho.


SSL là Secure Socket Layer, được phát triển bởi NetScape và ra đời vào thời đại bùng nổ của bong bóng dotcom vào năm 1994. 
Theo thời gian, thì quyền quản lý SSL được trao lại cho IETF (Internet Engineering Task Force) và IETF đã chuẩn hóa SSL lại và cho ra phiên bản TLS 1.0  (TLS - Transport Layer Security). 

Tiếp theo đó nữa, các phiên bản mới hơn, bảo mật hơn của TLS ra đời.

Túm cái quần lại, SSL là phiên bản tiền nhiệm của TLS và đã lỗi thời.

![Các phiên bản TLS](https://images.viblo.asia/af6beea5-855d-4316-bd96-d81a9ddfa3b4.png)

## Certificate Authorities

Vậy là mình đã giải thích xong vụ HTTPS, nhưng còn một điều quan trọng không kém chúng ta cần biết đó chính là Certificate Authority (hay còn gọi tắt là CA).


Khi trao đổi Public Key cho nhau, client sẽ không biết được Public Key mình nhận có phải là hàng “authentic” hay là hàng fake. 
Vậy cho nên Client sẽ dùng Certificate để xác thực xem Public Key mình nhận có chính xác thuộc về đối tượng mà mình mong muốn hay không. 

Một Certificate sẽ bao gồm những thông tin như chủ sở hữu, ngày hết hạn, public key và chữ ký số (digital signature) của CA - nhà phát hành chứng chỉ đó.

Certificate Authority chính là nhà cung cấp các Certificate cho SSL/TLS cũng như chứng thực danh tính của chủ sở hữu certificate. 

Hiện nay có ba cấp độ SSL tương ứng với mức độ tin cậy tăng dần. Cụ thể bao gồm: 

- Domain Validated Certificate (DV SSL)
- Organization Validated Certificate (OV SSL)
- Extended Validation Certificate (EV SSL)

Để biết trang web bạn đang truy cập có mức độ SSL bao nhiêu thì bạn có thể tham khảo bài viết sau: [https://www.ssl.com/article/dv-ov-and-ev-certificates/](https://www.ssl.com/article/dv-ov-and-ev-certificates/)

Ah, đến đây bạn có thể sẽ đặt ra một câu hỏi là:

> TLS Certificate của các server được xác minh bằng Certificate của CA, vậy Certificate của CA được xác minh bằng gì ?
> 

Đáp án chính là 1 certificate nữa, gọi là Root CA certificate, đa số đều được cài đặt sẵn trên hệ điều hành. Chúng ta gọi 3 tầng certificate này là Certificate Chain, hay còn gọi là Chain of trust.

![Chain of trust](https://images.viblo.asia/ec6ced56-b5ab-49c1-b28c-fe93ce16e55a.png)

Chúng ta chia cái certificate chain thành 3 thành phần: **Root CA** đã được lưu trong máy client, **middle certificate** là từ các CA trung gian, còn **Site certificate** là trang web chúng ta truy cập.

Cách hoạt động của chain of trust như sau:

- Đầu tiên khi trình duyệt truy cập 1 website bất kỳ có HTTPS, trình duyệt sẽ có certificate của trang đó.
- Tiếp theo, trình duyệt sẽ kiểm tra xem cái chứng chỉ này có phải là Root Certificate hay không.
    - Nếu là root, thì sẽ đánh dấu kết nối HTTPS này là đáng tin cậy
    - Nếu không, tiếp tục tải về và xác minh cái “parent certificate” được dùng để cấp chứng chỉ cho chứng chỉ đang xét.
- Lặp lại bước 2 cho tới khi tìm đến Root Certificate và tiếp tục xác thực.

## Tổng kết

Hi vọng qua bài viết này, các bạn có thể tự trả lời được những câu hỏi như HTTPS là gì, tại sao chúng ta cần HTTPS, cơ chế hoạt động của HTTPS như thế nào, TLS là gì, tại sao HTTPS lại quan trọng…

Tham khảo:

Sách: High-Performance Browser Networking: [https://hpbn.co](https://hpbn.co)

[https://howhttps.works/episodes/](https://howhttps.works/episodes/)

[https://infocenter.nokia.com/public/7750SR140R4/index.jsp?topic=%2Fcom.sr.system.mgmt%2Fhtml%2Ftls.html](https://infocenter.nokia.com/public/7750SR140R4/index.jsp?topic=%2Fcom.sr.system.mgmt%2Fhtml%2Ftls.html)