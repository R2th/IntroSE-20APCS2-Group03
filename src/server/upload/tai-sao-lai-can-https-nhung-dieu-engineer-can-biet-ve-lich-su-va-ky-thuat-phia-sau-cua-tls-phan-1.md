Tôi nghĩ rằng có nhiều engineer khi mà được hỏi là "để mà có đối sách tốt cho SEO thì cần phải có HTTPS cho website". Quả nhiên là Google sẽ ưu tiên đăng kí cho những trang đã thiết lập HTTPS. Lý do mà cần HTTPS cho website phải chăng là chỉ cho SEO ? Và đó chỉ là sự khuyến khách chỉ của riêng mình Google ? Để mà trả lời cho những câu hỏi đó thì trong bài này tôi sẽ nói về lịch sử hình thành cũng như nên tảng công nghệ của HTTPS và TLS. Ngoài ra thì trên nền tảng đó tôi cũng sẽ nói về kỹ thuật để mà HTTPS hoá web server được an toàn. Cuối cùng sau khi đã HTTPS thì tôi cũng nói khái lược về TLS1.3 và QUIC, là phương thức mới được phát triển bằng IETF.

## HTTPS review

Đầu tiên phải nói HTPPS là cái gì ? Tôi sẽ trình bày ngắn gọn về chức năng đó cũng như cách hoạt động của nó.
HTTPS là "HTTP over TLS", tức là dựa trên TLS（Transport Layer Security）thực hiện phương thức HTTP（Hypertext Transfer Protocol）. Để mà biểu thị sự khác nhau giữa HTTP thông thường và HTTPS thì có thể xem hình dưới :

![](https://images.viblo.asia/266301c8-adf9-4323-a77f-9227bd1c01f8.png)

HTTP và HTTPS hoạt động trên nền tảng giao tiếp TCP nên cả hai đều giống nhau là có "bắt tay" với TCP để bắt đầu. Trong trường hợp giao tiếp HTTP thì ngay sau khi bắt tay với TCP thì sẽ bắt đầu HTTP request và response.  Do giao tiếp HTTP này dạng plain text nên trên đường truyền đi thì kẻ thứ ba có thể xem được bên trong dữ liệu hoặc thay đổi nó được. Ngược lại thì khi giao tiếp bằng HTTPS thì sau TCP sẽ tiến hành bắt tay với ông TLS （chi tiết tôi sẽ nói sau）. Khi này thì giao tiếp sẽ bắt đầu mã hoá và khi hoàn thành bắt tay TLS thì thông tin được mã hoá mới bắt đầu HTTP request và response. Trên trình duyệt với website đã được mã hoá HTTPS thì sẽ hiển thị một cái khoá đóng trên thanh địa chỉ. Tuỳ vào trình duyệt có thể khác nhau như hình tôi chụp là của Google Chrome 63.


### Chức năng TLS cung cấp

Như hình trên thì sự khác biệt lớn nhất giữa HTTPS với HTTP chính là sử dụng phương thức TLS để trao đổi HTTP request và response. Chức năng mà TLS này cung cấp gồm 3 cái chính sau :

#### Tính bảo mật

Nó mã hoá dữ liệu truyền đi để cho khi trên đường vận chuyển trên internet sẽ không thể nhìn được bên trong dữ liệu là gì. Những thông tin cần bảo mật như là mật khẩu, thẻ tín dụng ... sẽ không bị lọt vào tay kẻ xấu.

#### Tính toàn vẹn

Nếu như mà chỉ đơn thuần mã hoá dữ liệu để đảm bảo tính bảo mật thì đó vẫn chưa phải là an toàn tuyệt đối. Dù không biết được nội dung bên trong dữ liệu bị mã hoá nhưng mà những kẻ tấn công mạng có thể dịch chuyển bit một phần dữ liệu đó để fake dữ liệu. Để mà phòng chống kiểu tấn công này thì sẽ cần sử dụng message chứng thực （MAC：Message Authentication Code）. Dựa vào MAC sẽ bảo toàn được dữ liệu truyền đi, tránh bị giả dữ liệu khi trên đường truyền.

#### Tính chân chính

Trên giao tiếp internet sử dụng nhiều cái bất định thì không thể trực tiếp nhìn thấy mặt và chứng minh được đối phương là ai. Cách thức để nhận biết đối phương truyền tin là chỉ cái URL được hiển thị trên thanh địa chỉ. Với HTTP truyền plain text thì trên đường truyền đi bất kì ai cũng có thể thấy URL đó. Còn với HTTPS thì sẽ có xử lý kiểm tra xem nơi truy cập có đúng là sử dụng certificate hay không đẻ phòng tránh việc đó trên URL.

### Cách hoạt động của TLS

Vậy làm thế nào mà TLS có thể thực hiện được 3 chức năng trên ? Tôi đã trình bày là khi truyền tin HTTPS thì trước khi thực hiện HTTP sẽ có bắt tay với TLS nhưng mà cần nhìn vào bên trong TLS này để hiểu được TLS handshake. Bản thân TLS handshake có nhiều hình thái khác nhau nhưng tôi sẽ chỉ đưa ra một cái tiêu biểu nhất trên phương thức truyền tin HTTPS hiện nay. TLS handshake có thể chia ra 4 bước chính như hình dưới đây : 

![](https://images.viblo.asia/41cef735-6a30-41ec-a22d-858db94c24c8.png)

#### 1. Trao đổi tham số

Đầu tiên để mà thực hiện truyền tin TLS thì giữa client và server sẽ cần biết tham số của nhau. Tham số này qua nhiều mục khác nhau như là phương thức mã hoá, thuật toán trao đổi key hay có hay không sử dụng các chức năng mở rộng hơn ... Khi đã hiểu tham số của nhau thì từ phía client đưa ra nhiều ứng cử viên （ClientHello）, đó là nguyên tắc của phương thức TLS. Server sẽ chọn từ các ứng cử viên do client gửi đến một ông rồi trả lại giá trị đó cho client（ServerHello）. Dựa vào sự trao đổi tham số này "ClientHello với ServerHello" thì cả hai phía đã biết tham số cần thiết cho việc truyền tin TLS là gì. Việc này hoàn toàn là truyền tin plain text nên kẻ thứ ba có thể thấy được nội dung bên trong là đương nhiên.

#### 2. Chứng thực server

Để mà có thể truyền tin HTTP an toàn thì sẽ cần chức năng xác nhận user mà đang kết nối có thực sự là HTTPS server đã trao đổi hay không. Khi này thì nguyên lý chứng thực dùng server certificate được cung cấp bởi TLS. 

![](https://images.viblo.asia/a71c28ef-4757-4703-968c-a57fa41e137f.png)

Server certificate là thông tin được gửi đến client từ HTTPS server （Certificate）。Client sẽ kiểm chứng certificate này để xác nhận đúng server giao tiếp là bước thứ nhất của chứng thực server bằng TLS. Trong kiểm chứng server certificate, để mà xác nhận đúng là cert đã được phát hành bởi nơi chứng thực tin tưởng thì sẽ dùng root certificate mà nó được gọi là Trust  anchor. Cái root cert như thế được đăng kí bên trong client mà đang đối ứng với HTTPS. Từ việc biết được đã được đăng kí trước thì nó (root certificate) sẽ được coi là có thể tin tưởng.

Nếu mà bằng Trust anchor mà có thể kiểm chứng được server certificate được gửi từ server thì câu chuyện sẽ đơn giản, nhưng vẫn cần phải có một cái gọi là middle certificate. Cái này, secret key do rất quan trọng đối với nghiệp vụ của "nơi chứng thực" nên được quản lý rất nghiêm ngặt online. Thay vào đó, sử dụng certificate khách đã được ký bằng root certificate, mà server certificate được phát hành. Đó chính là middle certificate. Middle certificate khác với root certificate thông thường sẽ không được đăng kí trước ở phía client. Do thế trên HTTPS server sẽ gửi cả server certificate và middle certificate đến client. Client mà đã nhận được 2 cái cert này thì sẽ kiểm tra các thứ như tên, thời hạn sử dụng được ghi trong cert, rồi kiểm chứng chữ ký của server certificate và middle certificate cho đến root certificate. Và nếu ko có vấn đề gì thì server certificate đã được gửi sẽ được phán đoán là chuẩn.

Khi kết thúc check server certificate cũng chưa phải là đã hoàn toàn an toàn. Bản thân server certificate là public nên bên thứ 3 có thể copy để gửi đến client. Để mà client có thể nhận biết được server sẽ phải xác chứng việc có secret key đã đối ứng với cert chuẩn. Vì vậy mà server sẽ ký dữ liệu sẽ dùng trong việc trao đổi key (mô tả sau) bằng secret key gửi cho client（ServerKeyExchange）. Client khi đã nhận được ServerKeyExchange được kèm thông tin chữ ký từ server sẽ dùng public key trong cert để kiểm tra chữ ký. Nếu mà ok sẽ chính thức xác nhận server mà đang truy cập có cả cert chuẩn và secret key. Đến đây việc kiểm chứng server hoàn thành.

#### 3. Trao đổi key （trường hợp của ECDHE）

Nếu chứng thực server hoàn thành thì tiếp theo sẽ tiến hành trao đổi key. Hiên tại, cái mà được dùng rộng rãi là cách thức gọi là trao đổi key ECDHE （Elliptic Curve Diffie–Hellman Ephemeral key exchange）dùng phương thức mã hoá public key trên đường cong elip.

![](https://images.viblo.asia/1d87e47b-072b-44ff-99bb-ba7dfeba479f.png)

Những thông tin như là tiến hành trao đổi key sử dụng đường cong elipse nào, tham số nào thì đã biết khi trao đổi ClientHello/ServerHello. Dựa vào phương thức đã thống nhất lúc đó mà trên server và client sẽ tính toán key chung dùng trong chứng thực message hay mã hoá. Nhưng key chung này để thực hiện Forward Secrecy thì sẽ chỉ cho hữu hiệu tạm thời chỉ trong 1 lần TLS handshake. E ở cuối trong ECDHE là ephemeral tức tạm thời.

Key chung tạm thời về nguyên tưacs khi kết thức truyền tin TLS là sẽ bị huỷ. Do đó tính bảo mật dữ liệu truyền tin đã được mã hoá trên TLS được đảm bảo. CLient và server mỗi lần TLS handshake sẽ phải sinh ra cặp key public và secret tạm. Khi này sẽ trao đổi public key tạm đã sinh ra cho nhau, kết hợp secret key các bên có tính toán điểm của đường cong elipse giống nhau, nếu mà có thể đưa ra được dữ liệu của key chung từ thông tin cùng một điểm thì việc trao đổi key kết thúc.

#### 4. Bắt đầu truyền tin mã hoá, kiểm tra fake handshake

Sau khi xong việc trao đổi key, sẽ bắt đầu dùng key chung đã sinh để truyền tin mã hoá. Server và client sẽ gửi tín hiệu bắt đầu truyền tin mã hoá（ChangeCipherSpec）. Cuối cùng, để mà check xem dữ liệu TLS handshake có đang không bị fake thì sẽ gửi giá trị hash của dữ liệu TLS handshake đã gửi nhận cho đến lúc này（Finished）. Việc check này là do quá trình từ 1 đến 3 đều là truyền tin plain text nên bên thứ 3 có thể giả mạo được. Ở bước gửi Finished thì bên thứ 3 không thể giả mạo được nội dung bên trong Finished （giá trị hash của TLS handshake）. Nếu mà giá trị hash match nhau thì có thể kết luận không có việc trao đổi bị giả mạo được.

Đến đây là TLS handshake kết thúc. Sau đây, sẽ tiếp tục mã hoá, rồi gửi nhận dữ liệu của ứng dụng như HTTP request và HTTP response. Việc truyền tin TLS an toàn đã được thực hiện và cả 3 chức năng gồm tính bảo mật, tính toàn vẹn và tính chân chính được bảo toàn.

## Hướng tới HTTPS toàn diện

### Cách được dùng của HTTPS trước đây

Cách hoạt động của handshake hay chức năng mà TLS thực hiện cơ bản là không có thay đổi nhiều về mặt kỹ thuật từ khi có SSL 3.0 20 năm trước là tiền thân của TLS. Nhưng cách được sử dụng thì gần đây đã thay đổi lớn. Trong web service trên internet việc tiến hành trao đổi thông tin với đối phương đa số bất định là thông thường. Do đó khi mà sử dụng dữ liệu quan trọng thì từ xưa việc dùng HTTPS truyền tin được mã hoá đã có.

Bước vào năm 2010 thì đã bắt đầu đối ứng để HTTPS hoá tất cả các truyền tin. Điều này là bởi vị trên đường truyền tin khi mà đang tồn tại HTTP có khả năng bị giả mạo dữ liệu thì bên thứ ba có thể đưa vào các quảng cáo, có thể xem được những nội dung nhạy cảm đã tăng nhanh. Ví dụ như từ năm 2010, Gmail của Google, rồi Twitter từ năm 2012 đã HTTPS hoá toàn diện từ những kết nối ban đầu cho đến tất cả những phần sau đều HTTPS hết.

Trái lại thì những dịch vụ web mà ko lớn bằng Google, Twitter vẫn chỉ dùng HTTPS cho những phần quan trọng cần security mà thôi. Bởi lẽ khi đưa vào HTTPS toàn diện thì sự thay đổi cấu trúc site hay tăng phí để lấy được cert, rồi cần bảm đảo tính năng server ... nói chung cũng không ít vấn đề lúc vận dụng toàn diện. 

### Hành vi ăn trộm trên diện rộng và mang tính quốc gia （Pervasive Surveillance）được công bố

Vào tháng 6 năm 2013 thì Edword Snowden đã công bố hành vi ăn trộm thông tin thực hiện bởi bởi NSA（cục an ninh quốc gia Mỹ）và CGHQ（cơ quan truyền tin chính phủ Anh quốc）. Snowden đã public các tài liệu nói rằng các các tổ chức này đã kết hợp với các nhà cung cấp truyền tin, đã ăn trộm rồi làm giả dữ liệu trong các data center hay internet backbone. Và còn rất nhiều những thông tin sốc khác như là đưa backdoor vào các máy network, tráo đổi firmware ...

Học giả nổi tiếng về bảo mật Bruce Schneier đã có bài blog [How the NSA Attacks Tor/Firefox Users With QUANTUM and FOXACID - Schneier on Security](https://www.schneier.com/blog/archives/2013/10/how_the_nsa_att.html) mô tả làm sao mà NSA tấn công người dùng Tor/Firefox với QUANTUM và FOXACID. Theo như bài này thì NSA đã thiết lập hệ thống gọi là QUANTUM vào internet backbone mà có lượng lớn traffic đi qua, nó sẽ chiếm lấy các truyền tin HTTP thông thường, dùng hệ thống gọi là FOXACID gửi malware chưa được biết đến gây lây nhiễm các thiết bị. User khi truy cập đến site trong nhà cung cấp dịch vụ sẽ không biết được đang bị tấn công kiểu như này. 

![](https://images.viblo.asia/d498378f-91f2-4891-8459-32aebfa42c22.png)

Để mà không có việc tấn công lớn như thế thì chỉ có đưa vào HTTPS thực hiện đủ tính bảo mật, tính toàn vẹn và tính chân chính của dữ liệu khi truyền tin.

### Lý do HTTPS hoá tất cả

Điều rõ ràng ta thấy qua nội dung mà Edword Snowden đã public là hoàn toàn tồn tại cái nguy cơ hiện hữu cuộc tấn công quy mô lớn không chỉ là trên lý thuyết mà có thật khi mà họ đã dùng ngân sách quốc gia, mua lượng resource máy tính lớn, cấu kết cùng nhà cung cấp truyền tin. Tổ chức IETF（Internet Engineering Task Force）vào tháng 5 năm 2014 đã có bài là 「RFC7258: Hành vi ăn trộm nghe lén là cuộc tấn công（Pervasive Monitoring Is an Attack）」, đã nêu rõ cần tiến hành đối ứng kỹ thuật đối với hành vi nghe trộm diện rộng mang tính quốc gia như thế này. Nhưng theo Snowden thì thật may mắn, chúng ta cũng thấy là truyền tin được bảo vệ bởi kỹ thuật mã hoá gần đây vẫn chưa bị phá vỡ. Hơn nữa tổ chức cao hơn IETF là IAB（Internet Architecture Board）cũng đã public bài 「Thông cáo liên quan đến tính tín nhiệm của internet（IAB Statement on Internet Confidentiality）」.

Nội dung bài thông cáo này là khi mà thiết kế ra phương thức mới thì cần phải có tính năng mã hoá. Họ yêu cầu khuyến khích các nhà vận hành internet hay cung cấp dịch vụ phải nên đưa vào truyền tin mã hoá. Về các chức năng cần phải truyền tin plain text như là filter nội dung, IDS ... thì sẽ đưa vào phát triển kỹ thuật thay thế trong tương lai.

Từ đây, việc phát triển và đưa vào các kỹ thuật lấy mã hoá làm tiền đề được tiếp tục một cách toàn diện. Không chỉ là đoàn thể tiêu chuẩn hoá, mà đặc biệt là đối với các nhà cung cấp web service khi mà bị mất đi dự tín nhiệm đối với nội dung hay truyền tin từ những người bình thường thì sẽ là vấn đề rất lớn. Việc đảm bảo tính bảo mật toàn diện của truyền tin hay nội dung chính là vấn đề quan trọng để bảo đảm tín nhiệm đối với dịch vụ của họ. Từ sự việc QUANTUM cho thấy dù chỉ là một phần truyền tin là plain text thì thông qua đó cũng có thể bị tấn công. 

Liều thuốc kháng sinh cho nguy cơ này chính là đưa vào HTTPS toàn diện theo như IAB đã chỉ ra. Và chính việc Google khuyến khích dùng HTTPS với SEO cũng là hành động trong số đó. Để mà giảm thiểu được chi phí khi đưa HTTPS toàn diện thì cũng đã có dịch vụ của Let's Encrypt (nơi chứng thực) phát hành server certificate miễn phí hướng tới cá nhân hay doanh nghiệp nhỏ.

Cuối cùng, Google hay Mozilla đều đang kế hoạch khai tử chức năng của trình duyệt mà dùng HTTP thường (mô tả chi tiết sau).  Và liên quan đến các vấn đề khi đưa vào HTTPS thì gần đây chức năng tiến hành xử lý mã hoá trên phần cứng như là AES-NI3, rồi việc tải cao của CPU khi có HTTPS cũng đag dần được hạn chế. và trênTLS nếu mà dùng HTTP/2 thì kết nối từ client sẽ được tập trung vào một kết nối TLS, nên hệ thống mà càng to thì sự hiệu quả của giảm tải hệ thống đag được kỳ vọng. Lý do mà HTTPS tất cả là để duy trì sự tín nhiệm của internet.

![](https://images.viblo.asia/cfbd951c-b2da-4600-80c2-a74eb6ad4298.png)

To be continued ...