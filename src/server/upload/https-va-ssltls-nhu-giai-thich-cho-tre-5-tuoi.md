(*Mình chém gió đấy, trẻ 5 tuổi còn đang tập đọc mà hiểu được cái này thì là thần đồng, là thiên tài, là mình cũng lạy*)

<br>

![](https://images.viblo.asia/d1a8e7b7-52a0-443d-9405-48d11e35b879.png)
Xin chào các bạn. Hôm nay mình muốn viết về một chủ đề mà mình từng rất mơ hồ trong khoảng thời gian rất lâu, và làm mình đau đầu mất mấy ngày hôm nay - HTTPS và SSL/TLS.
Mục đích bài viết của mình vừa là để giúp những bạn còn mông lung với khái niệm này có thể **hiểu được theo cách đơn giản nhất và thuần việt nhất**, vừa là để mình củng cố những kiến thức mình thu thập được. 

Để đạt được mục đích này, mình cố gắng tránh việc sử dụng quá nhiều thuật ngữ kĩ thuật hay định nghĩa hàn lâm, mà thay vào đó là sử dụng những hình ảnh liên tưởng từ thực tế. Hi vọng bài viết của mình có thể giúp được “ai đó” đang điên đầu với SSL/TLS cảm thấy dễ thở hơn.

Nếu bạn từng thắc mắc tại sao có trang thì http://, có trang thì https://, rồi thì dữ liệu bạn gửi được truyền qua internet như thế nào, mã hoá kiểu gì mà các bên khác không thể giải mã được, thì bài viết này chính là dành cho bạn!

### Đầu tiên, mình muốn điểm qua một số khái niệm (ngắn thôi):
**- SSL là gì?**

SSL là một protocol để tăng tính bảo mật khi các bên giao tiếp với nhau trên internet.<br>
(Cho bạn nào “sợ” từ protocol trên google dịch: Bạn có thể hiểu protocol giống như một bảng quy tắc vậy. Cả 2 bên đều hiểu rõ và tuân thủ các quy tắc này, từ đó giao tiếp hiệu quả với nhau.)

**- SSL sử dụng khi nào?**

Nếu bạn vào một trang web mà thấy url bắt đầu bằng ***https://*** thì đó là lúc SSL được sử dụng. Chữ “s” trong https là viết tắt của từ “secured”, nghĩa là nó an toàn hơn http đấy :grin:.<br>
Vậy ngắn gọn thì SSL được sử dụng khi kết nối internet giữa các bên cần được bảo đảm an toàn.

**Nhưng làm thế nào để đảm bảo an toàn?**

Giả sử có 2 bên gửi request response qua lại với nhau, client và server. Client thì ví dụ là trình duyệt Chrome đi, server thì là facebook chẳng hạn.

**Nếu sử dụng http**, client chỉ đơn giản là gửi request và server sẽ trả về response. Cuộc sống rất nhẹ nhàng và thanh thản. Client không cần biết mình có gửi request đến đúng chỗ hay không, và server cũng vậy. 
Dù thông tin trong request response có nhạy cảm đến đâu cũng kệ :upside_down_face:.

**Còn khi dùng https**, client sẽ thận trọng hơn rất nhiều. Client sẽ nhận thức được rằng request mình gửi đi hoàn toàn có thể bị 1 bên khác chặn giữa đường, rồi đứng giữa vừa giả mạo làm client vừa giả mạo làm server, đọc hết thư từ qua lại giữa 2 bên.  Như vậy rất nguy hiểm.

Để tránh trường hợp này, **phía client cần một cách để kiểm tra xem mình có gửi request đến đúng server hay không**. Hay trong ví dụ này là request client gửi có đúng là đến facebook.com hay không.

Để làm điều này, mỗi khi cần kết nối, phía client sẽ không gửi dữ liệu nhạy cảm các kiểu lên server ngay, mà sẽ tiến hành một số bước để đảm bảo đúng server rồi mới truyền dữ liệu. 

**Tiến trình này được gọi là handshake**, các bước cụ thể như sau:

![](https://images.viblo.asia/2d6b152b-6f42-4205-a2e8-690e2f5d4562.png)
<p align="center"><em>(Để cái ảnh đây để chuẩn bị cho đống chữ phía dưới, hi vọng các bạn đọc không bị ngán)</em></p>
<p align="center"><em>Nguồn: cloudfare.com</em></p>

1. **Đầu tiên**, client gửi tới server một message ***hello*** để bắt đầu tiến trình handshake. Message này sẽ chứa một số thông tin, chẳng hạn như phiên bản SSL mà client support, và một chuỗi bytes ngẫu nhiên gọi là ***client random***. Các bạn lưu ý chuỗi bytes này nhé, tác dụng của nó mình sẽ nói ở phần dưới.

3. **Khi nhận được message *hello* từ client**, server cũng sẽ gửi lại cho client một message ***hello***. Trong message này có chứa ***SSL certificate*** của server, và cả một chuỗi bytes ngẫu nhiên nữa được gọi là ***server random***. (và một số cái linh tinh nữa, mình lược đi cho đỡ rối) <br> 
Ở đây có một khái niệm mới, đó là SSL ***certificate***. <br> **SSL và SSL certificate là 2 thứ khác nhau nha**. SSL thì các bạn biết rồi, còn SSL certificate thì là một file chứa các thông tin của server như tên tuổi địa chỉ. <br> 
Certificate này giống như một chiếc chứng minh thư vậy. Bạn đưa chứng minh thư cho một người khác, thì người đó có thể đảm bảo bạn đúng là bạn rồi đúng không? (Đúng không nhỉ? :frowning:)

3. **Khi nhận được SSL certificate của server**, phía client sẽ tiến hành xác nhận xem certificate này có “chuẩn” hay không. Từ “chuẩn” có thể dễ gây hiểu nhầm, nên hãy để mình giải thích thêm một chút về mục đích server gửi certificate về cho client. <br> 
Như đã nói ở trên, certificate giống như một chiếc chứng minh thư. Tuy nhiên chứng minh thư cũng có chứng minh thư this chứng minh thư that. Cái gì cũng có thể fake được, do đó ***chưa thể đảm bảo ngay certificate server gửi về là chuẩn.*** 
<br> Để xác định certificate của server có chuẩn hay không, client sẽ cần kiểm tra bên phát hành certificate đó. <br>
Thường bên phát hành certificate là một tổ chức được tin tưởng, và tổ chức này sẽ xác nhận giúp bạn xem certificate của server có chuẩn hay không (chuẩn ở đây là kiểu certificate này đúng là được phát hành cho server “abcxyz.com”, chính tôi (bên thứ 3) là người phát hành), giống như bạn nhờ Nhà Nước xác nhận xem chứng minh thư của anh A anh B có chuẩn không vậy. <br> ***Khi bên thứ 3 xác nhận certificate này đúng là của server mà bạn mong muốn, thì bạn có thể tin tưởng server đó và tiến hành các bước tiếp theo rồi.***

4. **Sau khi thấy certificate đã ok,** server đã được client tin tưởng. Bước tiếp theo là 2 bên cần thống nhất một cách ***mã hoá để chỉ có 1 trong 2 bên mới có thể giải mã được***.<br>
Để làm được điều này, client sẽ gửi tiếp lên server một chuỗi bytes nữa, gọi là ***premaster secret***. premaster secret này đã được mã hoá bằng ***public key.*** <br>
**Public key ở đâu ra?** Hoá ra trong certificate mà server gửi về có chứa luôn 1 public key rồi!<br> 
Client sẽ dùng public key này để mã hoá premaster secret. <br>
Để giải mã được premaster secret này thì cần đến private key, và tất nhiên private key này được lưu trữ an toàn ở phía server. Do đó chỉ có server mới có thể giải mã premaster secret.

5. **Server tiến hành giải mã premaster secret.**

6. **Bạn có để ý không?**<br>
Tại thời điểm này thì cả phía server và client đều đã có:
    - client random
    - server random 
    - premaster secret.

    Cả 2 bên sẽ dùng 3 key này để tạo ra một key mới, gọi là ***session key***. <br>
    Bạn có thể tưởng tượng quá trình này như việc trộn 3 màu sơn với nhau vậy. <br>
Nếu cả 2 bên đều biết 3 màu sơn đó là gì, thì sẽ trộn ra được màu giống nhau. Nhưng lệch đi một màu thôi thì kết quả sẽ hoàn toàn khác nhau.<br>
    ***Session key*** này có thể dùng để mã hoá và giải mã luôn.

7. **Client đã sẵn sàng**, và sẽ gửi một message “finish” tới server. 
Message này sẽ được mã hoá bởi… bạn cũng đoán ra đúng không? Session key!

8. **Server cũng sẵn sàng**, và sẽ response lại một message “finish” được mã hoá bởi session key.

9. **Handshake hoàn tất!** ![](https://images.viblo.asia/c4936439-b00b-4944-96a4-2983454d9784.jpg)
<br> Từ thời điểm này server và client sẽ giao tiếp với nhau bằng các message được ***mã hoá bởi session key***. Do session key này được tạo ra nhờ cách “trộn sơn” trong quá trình handshake, nên sẽ rất khó để một bên thứ 3 có thể lấy được. Do đó, việc trao đổi thông tin giữa server và client được đảm bảo.

<br>Như vậy, bằng việc sử dụng SSL, chúng ta đảm bảo được mình kết nối đến đúng đối tượng mà mình mong muốn, và sau khi kết nối rồi thì các gói tin qua lại giữa 2 bên cũng được mã hoá một cách an toàn. 

**Tuy nhiên, vẫn sẽ có cách để bypass SSL**.

Như chúng ta vừa tìm hiểu, để client tin tưởng server và tiến hành handshake, thì phía client phải ***trust*** SSL certificate của server.

Vậy nếu hacker muốn đứng vào giữa client và server, bắt mọi request từ client và giả mạo làm server để trả response cho client thì sao? Hacker vẫn sẽ phải gửi một SSL certificate về cho client, nhưng client có thể phát hiện ngay certificate này không “chuẩn”, và tiến hành ngắt kết nối.

Tuy nhiên, nếu hacker có thể **install certificate của mình vào hệ thống** của client, để hệ thống luôn luôn trust certificate này, thì client vẫn sẽ vui vẻ mà tiến hành handshake.
![](https://images.viblo.asia/8cad653c-a8a2-497c-bd9c-24b9a6370ea1.png)


Đây chính là cách mà các phần mềm proxy hoạt động. Nếu các bạn dùng mac, chắc giờ các bạn đã hiểu tại sao proxy luôn yêu cầu bạn cài đặt root certificate đúng không?

**Để tránh việc bypass bằng cách install root certificate này, chúng ta có thể sử dụng SSL pinning.**

SSL pinning là gì thì… mời các bạn đọc [bài viết tiếp theo](https://viblo.asia/p/phan-biet-server-xin-va-server-pha-ke-bang-ssl-pinning-6J3ZgWJEZmB) của mình nhé! (mình cũng sẽ nói đến ***self-signed certificate*** nữa)

Hi vọng mình có thể giúp được một số bạn còn đang mơ hồ vụ SSL này có thể tìm được chút ánh sáng :laughing:.  Bài viết của mình còn nhiều thiếu sót. Rất mong được các bạn góp ý để mình cải thiện :relaxed:.

Nếu các bạn thấy bài viết của mình dễ hiểu, mời các bạn follow mình để đọc các bài viết tiếp theo nha. 

Sắp tới mình dự định viết về một số chủ đề mà đối với mình từng ***nghe quen quen nhưng lại rất mơ hồ*** :slightly_smiling_face:, như [***SSH***](https://viblo.asia/p/ban-khong-hieu-ssh-3Q75wVx9lWb), race condition, readers-writers problem... tất nhiên là cũng dùng những hình ảnh dễ liên tưởng và dễ nhớ.

Mình cũng dự định làm một series giải thích cụ thể về ***Design patterns***, trong đó không chỉ tập trung vào ***HOW*** mà quan trọng hơn cả là ***WHY*** - ***Tại sao dùng design pattern lại giúp bạn tiết kiệm thời gian và bớt đau đầu hơn trong công việc lập trình.***

Mời các bạn đón đọc nha hehe.

***P/s:*** *À nói thêm một chút. Tiêu đề bài viết có cả cụm từ TLS, chắc các bạn cũng hay gặp và đang thắc mắc nó là cái gì. Có thể hiểu SSL ra đời trước, có nhiều nhược điểm, TLS ra đời sau, với cùng mục đích như SSL nhưng xịn hơn. Thực tế hiện nay TLS mới là cái được sử dụng nhiều hơn, SSL đang dần trôi vào quá khứ rồi. SSL handshake bây giờ hầu hết đã là TLS handshake, tuy nhiên do cụm từ SSL thông dụng đã lâu nên người ta vẫn tiếp tục sử dụng cụm từ này.*