Tiếp theo phần 1 [ở đây](https://viblo.asia/p/tai-sao-lai-can-https-nhung-dieu-engineer-can-biet-ve-lich-su-va-ky-thuat-phia-sau-cua-tls-phan-1-eW65Gx9aKDO) tôi đã nói đến lý sao tại sao lại cần HTTPS hoá tất cả mọi thứ. Trong phần 2 này tôi sẽ viết tiếp những vấn đề dưới đây :

### HTTP có khuynh hướng biến mất trong tương lai

Do sự phát triển của việc HTTPS hoá mọi thứ thì việc truyền tin plain text trên trình duyệt dần dần có nhiều những hạn chế phát sinh. Khoảng trung tuần tháng 10/2017 khi bản Chrome 62 được released, thì nếu user tiến hành nhập dữ liệu vào form chẳng hạn trên kết nối HTTP thì sẽ bị cảnh báo là Not secure ở thanh addressbar. Và khi ở secret mode nhằm tăng đảm bảo thông tin privacy của user thì việc hạn chế còn khắt khe hơn, chỉ cần là trang hiển thị HTTP là đã có cảnh báo tương tự rồi.

Google đang triển khai plan gọi là `Marking HTTP As Non-Secure`, mục đích cuối cùng của kế hoạch này là việc hiển thị rằng truyền tin HTTP là `Not secure`. Đầu tiên nếu mà có mục nhập như là password hay credit card thì sẽ có cảnh báo. Hơn nữa thì họ cũng đã đang làm để đưa ra cảnh báo dù chỉ là những mục nhập thông thường khác. Họ thông báo rằng vào tháng 7/2018 khi release bản Chrome 68 thì sẽ hiển thị cảnh báo đối với tất cả những trang truyền tin HTTP.

Và không chỉ là cảnh báo đối với trang HTTP, Google còn đang có kế hoạch dừng chức năng hữu ích nhất đối với nguồn không an toàn (gọi là Deprecating Powerful Features on Insecure Origins）. Họ có kế hoạch sẽ thêm vào các hạn chế trong trình duyệt để các API sử dụng đến thông tin liên quan privacy của user sẽ bắt buộc phải sử dụng HTTPS.

Những đối sách như vậy thì không chỉ có mỗi Google, kể cả Mozilla vào tháng 4/2015 cũng đưa ra cái gọi là `Deprecating Non-Secure HTTP` để vào tháng 1/2018 đã quyết định những chức năng mới sẽ implement về sau sẽ có tiêu chí `Secure Contexts Everywhere` cơ bản bắt buộc cần phải là HTTPS. Còn những chức năng mà liên quan đến security, privacy của user thì sẽ xem xét từng cái một để quyết định sẽ dừng lại không dùng nữa.

Có thể nói trong tương việc truyền tin HTTP sẽ là dĩ vãng !

### Thực trạng sử dụng HTTPS trên thế giới 

Với những động thái như trên thì HTPPS đang được triển khai thực sự là nhanh chóng trên toàn thế giới.

Cả Google và Mozilla để thu thập thông tin về tình trạng sử dụng HTTPS trên Chrome và Firefox thường xuyên, public ra bên ngoài và tổng kết vào bài viết là `Measuring HTTPS Adoption on the Web）`.

Theo như kết quả thu thập được thì hiện nay những trang HTTPS đã vượt quá bán, từ tháng 1/2014 đến tháng 1/2017 thì lưu lượng truyền tin trong 3 năm đã tăng từ 20% lên 40%. Còn nếu theo từng site thì với Top 100 domain của Alaxa thì tới 88% số site là đang được HTTPS hoá, Top 1 triệu domain thì tỉ lệ tụt xuống khá nhiều nhưng vẫn ở mức cao là 46%. Đa số những trang lớn đều đã HTTPS hoá toàn diện còn tỷ lệ khác còn lại đa số là những site nhỏ và trung bình.

Nếu như mà theo lãnh thổ thì cũng có sự khác biệt lớn, vùng đông Á đặc biệt là Nhật Bản và Hàn Quốc thì tỷ lệ dùng HTTPS được chỉ ra là thấp. `Thật đáng buồn là việc hiểu biết HTTPS hoá ở Nhật đang có vẻ không nhiều` đã được nêu ra trong một bài viết. Nhưng thực sự thì sau điều tra này từ tháng 2/2017 lượng web service của Nhật cũng có nhiều tiến hành HTTPS hoá, tỷ lệ dùng HTTPS hoá cũng tăng lên. Từ sau cuối tháng 2/2018 theo thống kê của Firefox, trên thế giới khoảng 70% đã được HTTPS hoá toàn bộ trang, còn ở Nhật bản lại là 65% . Theo thống kế từ Google Chrome Mỹ HTTPS chiếm 87%, Nhật thì chiếm 60% tổng số trang. Dù tăng như vậy nhưng Nhật vẫn có tỷ lệ khá thấp nếu xếp theo nước.

![](https://cdn-ak.f.st-hatena.com/images/fotolife/b/blog-media/20180208/20180208133446.png)

## Vấn đề tồn động trong HTTPS hoá

### Lý do HTTP/2 vẫn đang support cả HTTPS và HTTP

HTTP/2 đã được tiêu chuẩn hoá vào năm 2015, gọi là RFC 7540 thì vào năm 2011 Google định hình phương thức mang tính thực nghiệm là SPDY. Google với khoảng 90% số service đã đưa vào sử dụng SPDY và nó chỉ hoạt động trên nền tảng HTTPS, nên là những site khác để đưa vào dùng SPDY sẽ không thể tránh khỏi việc HTTPS hoá. Dù vậy thì do SPDY là phương thức phát triển độc lập bởi Google nên cũng không có vấn đề gì lớn lắm. 

Vào năm 2012 tổ chức IETF bắt đầu nghị luận HTTP/2, SPDY mà được tuyển chọn làm base của HTTP/2 thì sự việc đã thay đổi. Trong working group của IETF thì đã có trao đổi bàn luận xem HTTP/2 tương lai sẽ chỉ có thể sử dụng trên HTTPS giống nhưng SPDY hay là sẽ thay đổi để support cả HTTP truyền thống. Lúc đó thì ý kiến phản đối đối với phươg thức mới có hạn chế là chỉ sử dụng HTTPS, và cuối cùng thì họ đã bắt đầu chuẩn hoá HTTP/2 bằng việc tạo spec support cả 2 phương thức là HTTP và HTTPS.

Nhưng như ở phần 1 tôi đã nói về sự kiện Edward Snowden tháng 6/2013 thì họ đã đưa ra đề án xem lại một lần nữa phạm vi spec có nên hạn chế chỉ cho sủ dụng HTTP/2 với HTTPS trong working group tiến hành chuẩn hoá spec của HTTP/2. Nhưng cuối cùng thì đề án đã không được thừa nhận. Những ý kiến phản bác việc đó được đưa ra có những ý sau :

* Trên chức năng Proxy như là content cache sẽ bị mất
* Nếu chuyển sang HTTPS sẽ tuyệt đối an toàn hoàn toàn bị hiểu lầm
* Những nội dung không cần bảo mật mà cũng HTTPS là lãng phí, không cần thiết
* Việc thiết kế và mã hoá của HTTP/2 là nghị luận độc lập
* Nếu mà trên thiết bị đâu cuối hay trên server mà scan virus thường xuyên cũng sẽ ngon, chỉ mỗi việc truyền tin không thì quá lãng phí
* Một bộ phận network service chỉ đơn giản là không thích can thiệp vào việc truyền tin
* Nếu không có sự đồng ý của user mà tất cả đều mã hoá thì sẽ là vấn đề
* Việc giám sát network không có vấn đề về kĩ thuật mà sẽ là vấn đề mang tính chính trị
* Chi phí cho certificate rồi đầu tư hệ thống sẽ tăng cao lên nhiều
* Những device có tính năng thấp như IoT mà cũng mã hoá truyền tin thì ko ổn
* Nếu mà cần truyền tin plain text thì sẽ có thể bắt dầu dùng được luôn mà ko cần quan tâm đến spec 

Kết quả là việc chuẩn hoá spec để hoạt động được cả 2 hình thức là HTTP và HTTPS đã được hoàn thành. Những vào tháng 1/2018 việc truyền tin trên HTTP plain text đã không được support trên các trình duyệt chính, do đó khi mà dùng HTTP/2 thì thực tế cho thấy là cần phải dùng HTTPS. Hơn nữa, để mà dùng HTTP/2 bằng HTTPS thì có những điều kiện đi kèm để tăng cao tính an toàn hơn như là hạn chế độ dài khoá, phương thức mã hoá hay version của TLS.


### Quan hệ của Certificate Authority với Browser Vendor xung quanh Trust Anchor

Bản chứng nhận (certificate) gốc - rootCA được đăng kí ở client được gọi là Trust Anchor, sẽ cần cho chứng thực server của TLS. Thực sự thì nơi tham chiếu của rootCA không được thống nhất, nó sẽ thay đổi theo client và OS như bảng dưới :

|  |Windows | macOS |	Linux | Android |
| -------- | -------- | -------- | -------- | -------- | 
|IE/Edge|	OSrootCA	| - |	- |	- |
|Safari |	- |	OS rootCA |	- |	- |
|Chrome |	OS rootCA	| OS rootCA |	Mozilla rootCA và ca-bundle	| Mozilla rootCA† |
|Firefox	| Mozilla rootCA |	Mozilla rootCA |	Mozilla rootCA |	Mozilla rootCA |
|Node.js |	Mozilla rootCA |	Mozilla rootCA |	Mozilla rootCA |	- |
† là có thể thay đổi

Certificate Authority định kỳ sẽ nhận bản giám sát hệ thống rất sát bằng chuẩn nhất định. Mỗi OS hay Browser vendor cũng dựa theo policy của họ  để inspect CA cẩn thận rồi tiến hành đăng kí rootCA. Nếu CA đang được đăng kí trong Trust Anchor mà bị xâm nhập trái phép từ bên ngoài, hay vì lỗi nào đó đã phát hành server certificate ko đúng thì dù có tiến hành handshake TLS an toàn về mặt kỹ thuật như nào cũng sẽ không đảm bảo.

Vài năm nay thì việc phát hành nhầm certificate bởi CA khiến có incident làm việc tin tưởng vào CA thi thoảng cũng phát sinh. Browser vendor mỗi lần mà phát sinh incident đó cũng đã vô hiệu hoá certificate đã gây ra vấn đề, rồi xoá khỏi Trust Anchor.

CA mà đang được đăng kí trong Trus Anchor cũng đã có tới vài trăm nên nếu mà phát sinh incident như thế thì sau sẽ có nhiều giới hạn hơn trong việc tin tưởng tất cả CA sau này. Hiên tại thì Browser vendor đang thường xuyên kiểm tra xem có vi phạm quy định gì tring certificate do CA phát hành hay không nhưng mà còn khá là xa cho việc giải quyết căn nguyên sự việc.

## Những điều nên biết để tạo ra HTTPS server an toàn

Việc phổ cập HTTPS hoá sẽ không ngừng nên đối với những nhà cung cấp dịch vụ thì không thể tránh khỏi thực hiện HTPPS hoá. Điểm cần chú ý ở đây là một khi HTTPS hoá toàn bộ service thì cũng không thể nói là đã xong. Vì access từ ngoài tất cả sẽ là HTTPS nên nếu xảy ra incident trong truyền tin TLS thì ảnh hưởng của nó sẽ khá là lớn. Để mà xây dựng và cung cấp được service ổn định an toàn một cách dài lâu thì cần hiểu rõ nhiều cái như là kỹ thuật mã hoá hay cách tấn công rồi sẽ suy nghĩ vận dụng trong tương lại. Vậy cần nắm bắt những gì ?

### Nhất định nên dùng software mới nhất

Đầu tiên là cần đảm bảo security đủ ở thời điểm hiện tại. Trong nhiều trường hợp, phải kể đến Apache rồi nginx trong các các software của Web server, hay các thư viện như OpenSSL sẽ phụ trách xử lý mã hoá hãy TLS khi HTTPS hoá. Những phần mềm như thế nhất định hãy luôn dùng bản mới nhất để đảm bảo an toàn. 

### Kiểm tra định kỳ độ an toàn của server 

Sau khi mà đưa vào sử dụng Web server thì để xác nhận là HTTPS an toàn không sẽ phải tiến hành kiểm tra bằng site như là SSL Labs ... để đánh giá tính an toàn. Để mà có được điểm cao khi check trên site như thế sẽ cần thiết lập support certificate đúng với TLS version thích hợp, rồi cách trao đổi key, phương thức mã hoá có độ security cao. Tất nhiên nếu mà ko xử lý những lỗ hỗng đã được biết đến thì điểm số sẽ giảm. 

![](https://cdn-ak.f.st-hatena.com/images/fotolife/b/blog-media/20180125/20180125213120.png)

Vậy để mà nâng cao số điểm trên SSL Labs thì cụ thể sẽ phải làm gì ? Để mà trả lời câu hỏi đó thì sẽ có rất nhiều cái nhưng theo tôi quan trọng nhất sẽ là việc chọn TLS version sẽ support.

### Chọn TLS version hướng tới tương lai 

TLS version mà HTTPS server sẽ support là điểm quan trọng lớn quyết định tính an toàn của việc truyền tin TLS. Cơ bản thì version càng mới sẽ càng được nâng cao tính an toàn hơn bản cũ do đã có những bản sửa lỗi, vá lỗ hổng bảo mật.

Với service đang vận hành việc nên dùng TLS version cũ nào thì ok sẽ phụ thuộc nhiều vào cần support thiết bị đầu cuối cũ đến mức nào. Nếu mà nghĩ đến việc ảnh hưởng đến user mà chỉ có thể dùng TLS version cũ nào đó thì trường hợp ko thể dừng support bản cũ là không hề hiếm.

Nhưng mà dạo gần đây chuẩn bảo mật quốc tế dùng đến thông tin credit card - PCI DSS（Payment Card Industry Data Security Standard）đã dừng bản TLS version cũ. Những động thái vận dụng cái mới như này có thể thấy là đang dần được đối ứng một cách tích cực, tăng lên nhiều, dù là HTTPS server đã có tính bảo mật cũng làm bảo mật hơn.

Để hiểu được điều đó tôi sẽ trình bày đơn giản các TLS version là những cái như thế nào :

#### SSL2.0/3.0

SSL（Secure Socket Layer）là phương thức tiền thân của TLS. SSL2.0 và SSL3.0 được phát triển bởi công ty Netscape cũ vào khoảng thập niên 1990. Cả 2 thì đều được phát hiện có lỗ hổng nên ở RFC 6176 thì SL2.0 đã bị dừng, ở RFC 7568 thì đến lượt SSL3.0 phải dừng.

Hiện tại thiết bị mà chỉ có thể sử dụng SSL2.0 thì gần như tuyệt chủng rồi, nên thực tế sử dụng SSL2.0 cũng gần như không có. Do đó việc để SSL2.0 active trên HTTPS là nguỷ hiểm.

Vào năm 2016 thì việc tấn công DROWN đã được công bố là có thể dựa vào chức năng SSL2.0 được active trên server để tấn công server khác dù nó có được truyền tin bằng TLS. Ví dụ như HTTPS server đã vô hiệu hoá SSL2.0 nhưng mà mail server khác dùng chung certificate thì từ đó bằng việc active SSL2.0 sẽ có thể tấn công DROWN đến HTTPS server. Kết luận là để tránh risk như thế xảy ra thì cần tắt tất cả SSL2.0 trên tất cả server liên quan nhau.

Còn về SSL3.0 thì có tấn công POODLE được biết đến rộng rãi, khi mà sử dụng CBC mode 6 một phần dữ liệu mã hoá có thể bị giải mã. Phương pháp phòng chống cách tấn công này là ko có. Nên khi mà tấn công POODLE được công bố năm 2014 nhiều sites đã dừng việc sử dụng SSL3.0.

#### TLS1.0

TLS1.0 là phương thức được IETF đưa ra năm 1999. Lúc đó có cuộc chiến nảy lửa về việc chia sẻ browser giữa  công ty Netscape cũ với Microsoft, cả hai đã phát triển phương thức bảo mật cho riêng mình. Trong việc chuẩn hoá của IETF thì đã dùng SSL3.0 của Netscape nhưng từ dư chấn của cuộc chiến trình duyệt nên cuối cùng thì đã đổi tên phương thức từ SSL thành TLS. Nói cho vuông thì TLS 1.0 của IETF là SSL3.0 đã được chuẩn hoá, cải biến, thêm chức năng mà thôi.

Từ ngữ `SSL` vẫn còn được dùng rộng rãi đến tận hơn 20 năm sau từ thời điểm đó. Nên cũng không ít người không hề phân biệt SSL với TLS mà chỉ sử dụng cho mục đích an toàn. TLS bản chất là phát huy tính năng kỹ thuật của SSL3.0, nên dù giờ đã có TLS1.3 nhưng ảnh hưởng trong nó là SSL3.0 vẫn còn rất sâu đậm. 

TLS1.0 cũng như SSL đã bị phát hiện có những lỗ hổng. Ví dụ như khi mà dùng CBC mode vector đầu sẽ ko được gán cùng dữ liệu truyền tin nên có thể bị tấn công BEAST và bị giải mã một phần dữ liệu. Tấn công này phía server ko có cách chống đỡ mà chỉ phụ thuộc vào phía client. Căn bản thì đối sách sẽ là cần nâng lên TLS1.1.

Hiện nay vẫn có nhiều site sử dụng TLS1.0 nhưng những service lớn dần đang dừng TLS1.0, có những sites cũng đã dừng hẳn, và con số cũng tăng dần theo thời gian. Riêng hệ thống liên quan đến thông tin credit card thì vào cuối tháng 6/2018 sẽ dừng TLS1.0 theo như plan của PCI DSS 3.1. Tương lai không xa thì TLS1.0 cũng sẽ có cùng cảnh ngộ như SSL, sẽ không được sử dụng nữa.

####  TLS1.1

TLS1.1 được phát kiến vào năm 2006, nó được chỉnh sửa những lỗ hổng （như tấn công BEAST đề cập ở trên hay tấn công sử dụng lỗi của CBC mode ...）còn đâu phương thức mã hoá support thì giống như TLS1.0. Do bản TLS1.1 không có nhiều thiết bị hỗ trợ nên sau khi mà TLS1.0 bị dừng thì chắc cũng sẽ nhanh đến lượt TLS1.1.

#### TLS1.2

Vào năm 2008 thì TLS1.2 được giới thiệu và là bản đang được sử dụng nhiều nhất hiện nay.

Do TLS1.2 đã được thêm vào một vài phương thức mã hoá mới để nâng cao độ an toàn, bảo mật. Trong đó phải kể đến AEAD（mã hoá kèm chứng thực）nó giải quyết được nhược điểm của CBC mode vẫn được dùng cho tới tới bản TLS1.1, và nó cũng là phương thức có khả năng xử lý hardware khá nhanh nên đang được dùng khá phổ biến.

### TLS1.3

Hiện tại bản mới TLS1.3 đang được châm cứu, nó sẽ dọn dẹp hết những nhược điểm kỹ thuật tồn đọng cho đến bản TLS1.2, nâng cao hơn độ an toàn và tính năng kết nối.

Trên bản TLS1.3 thì chỉ giới hạn phương thức AEAD, và CBC mode sẽ bị dừng. Về việc hoán đổi key cũng sẽ chỉ giới hạn dùng thuật toán Forward Secrecy mà thôi. Hơn nữa để tránh risk trong tương lại thì rất nhiều chức năng đã được phát triển cho đến bản TLS1.2 sẽ bị thay đổi hoặc bỏ đi. Hiện tại TLS1.3 vẫn đang được tiếp tục kiểm chứng chủ yếu bởi các browser vendor. Sau khi mà hoàn thành thì việc phổ cập nhanh chóng nó đang rất được mong đợi.

Tổng kết lại tôi tóm tắt bằng bảng sau :

|Version	|Thời điểm ra đời|	Tình trạng|
| ----- | ----- | ----- |
|SSL2.0/3.0	|1994/1995	|dừng|
|TLS1.0	|1999 |	vẫn còn trên số ít device cũ, dự sẽ dừng vào tháng 6/2018 theo PCI DSS 3.1|
|TLS1.1|	2006|	hầu như không dùng|
|TLS1.2|	2008	|phổ biến hiện nay|
|TLS1.3	| đang châm cứu	|được mong đợi sẽ phổ cập sau khi hoàn thành spec|

To be continued ...