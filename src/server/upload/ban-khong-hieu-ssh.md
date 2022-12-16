Thế thì bạn ơi, ngồi lại đây với mình một chút, để mình kể chuyện cho mà nghe :upside_down_face:.


***Có một câu chuyện ngụ ngôn như sau:***

*Bạn - một coder pro, dùng github, đang clone pull push project bằng HTTPS rất ghê. Bỗng một ngày xấu trời nọ, vì một lí do nào đó mà sếp yêu cầu bạn phải cài đặt SSH cho github thay vì dùng HTTPS*. 

*Bạn bối rối, nhưng không nao núng, bạn biết mình phải làm gì. Nhanh trí lên ngay google, gõ tạch tạch một cái là ra ngay các bước để setup SSH cho github. Bạn mở shell, gõ vài dòng lệnh, gen được cái public key, add lên github. Xong, ez vcl*. 

*Bạn thở phào, tự thấy mình pro làm phát được luôn, nhưng sâu thẳm bên trong lại là nỗi cắn rứt vì chẳng hiểu mình vừa làm cái mẹ gì :(*.

![](https://images.viblo.asia/1921773a-d9f7-4491-ab5d-f5e626a5915d.jpeg)


Đó có thể không phải câu chuyện xảy ra với bạn, nhưng lại chính là câu chuyện xảy ra với mình :(. Và cảm giác bứt rứt vì làm được mà không hiểu mình vừa làm gì thực sự là khó chịu luôn, thế là mình bắt đầu tìm hiểu về SSH, và cuối cùng cũng đã hiểu được ***nó là cái gì và hoạt động như thế nào.*** Từ đó suy ra được tại sao mình lại phải add cái public key lên github.

Bài viết này là tổng hợp những kiến thức mình thu thập được (và thấy đáng nhớ nhất). Mục tiêu của mình là giải thích SSH một cách dễ hiểu và dễ nhớ, và nhất là để bạn nào đọc bài viết này hiểu được tại sao mình lại phải add cái public key lên github =)).

![](https://images.viblo.asia/b1587240-cc52-42ac-b2da-8e9ca2e5d64a.jpeg)

<em><p align="center">Nguồn: hostinger.vn</p></em>

Trước khi vào bài viết, mình muốn đưa ý kiến cá nhân của mình về câu hỏi: ***Không hiểu cách SSH hoạt động thì có làm sao không?*** 

Mình nghĩ là ***không***. Quen tay và nhớ các bước làm thì kể cả không hiểu vẫn làm được tốt. Tuy nhiên mình cũng khuyến khích việc hiểu gốc rễ, vì cá nhân mình thấy gốc rễ mới là cái thú vị nhất, và hiểu được rồi thì cũng dễ nhớ thao tác hơn, tiện mở rộng ra nữa, như khi bạn muốn [***setup nhiều tài khoản github trên cùng một máy tính***](https://viblo.asia/p/lam-sao-de-su-dung-nhieu-tai-khoan-github-tren-cung-mot-may-tinh-Qpmleyx7lrd) chẳng hạn.

Lan man vậy đủ rồi, giờ mình vào đề đây. 

***Cấu trúc bài viết này của mình sẽ là như sau:***

- SSH là gì và dùng để làm gì? (mình đoán nhiều bạn rất rõ cái này rồi)
- SSH hoạt động như thế nào? (đây là phần mình muốn tập trung hơn)
- Tại sao phải add public key lên github khi setup SSH?

# SSH là gì và dùng để làm gì?
Đầu tiên sẽ là điểm qua khái niệm. (Cũng giống như các bài viết khác, mình sẽ để phần này ngắn gọn nhất có thể)
- SSH, giống như [HTTPS](https://viblo.asia/p/https-va-ssltls-nhu-giai-thich-cho-tre-5-tuoi-Eb85oeYOZ2G), là một protocol để các máy tính giao tiếp qua lại với nhau. (Cho bạn nào “sợ” từ protocol trên google dịch: Bạn có thể hiểu protocol giống như một bảng quy tắc vậy. Cả 2 bên đều hiểu rõ và tuân thủ các quy tắc này, từ đó giao tiếp hiệu quả với nhau.)
- SSH là viết tắt của từ ***Secured Shell.*** Chúng ta thấy chữ secured, cũng giống như HTTPS, có thể biết ngay các message được gửi bằng SSH sẽ được mã hóa, và chỉ một trong 2 bên mới có thể giải mã được.

Nếu các bạn đã đọc [bài viết về HTTPS của mình](https://viblo.asia/p/https-va-ssltls-nhu-giai-thich-cho-tre-5-tuoi-Eb85oeYOZ2G), chắc các bạn sẽ thấy định nghĩa có vẻ SSH và HTTPS rất giống nhau. Vậy 2 protocol này khác gì nhau? Thật sự là có rất nhiều, đủ để mình viết hẳn một bài dài lê thê, nhưng mình nghĩ sẽ không nhiều bạn quan tâm lắm vì nó phức tạp bỏ xừ mà biết chắc cũng không để làm gì :sweat_smile:.

***Sự khác nhau nên nhớ nhất*** theo mình là ở mục đích sử dụng:
- HTTPS thường được dùng để mã hóa dữ truyền đi trên internet (từ frontend truyền tới backend chẳng hạn)
- SSH thường được dùng để điều khiển máy tính từ xa. Do đó, HTTPS sẽ thường thấy khi sử dụng browser hoặc ứng dụng mobile, còn SSH thường thấy khi dùng shell

# SSH hoạt động như thế nào?
Hay cụ thể hơn, SSH làm thế nào để ***đảm bảo dữ liệu truyền qua lại giữa 2 bên được mã hóa sao cho chỉ 1 trong 2 bên mới giải mã được?***

Để làm được điều này, SSH sử dụng 2 kĩ thuật chính:
- ***Symmetric encryption***
- ***Asymetric encryption***

<br>
Nghe đã thấy chả muốn đọc nữa rồi ấy nhỉ =)). Mình sẽ cố gắng sử dụng những từ thuần việt nhất để giải thích 2 kĩ thuật này nha.

### Symmetric encryption

![](https://images.viblo.asia/beb7ea01-b1c1-4eec-83b4-b6f2824ce0ab.png)


Google dịch symmetric encryption là mã hóa đối xứng (đây là lí do mình rất sợ google dịch, mặc dù nó đúng =))). 

Đối xứng ở đây các bạn có thể hiểu là ***2 bên giống nhau***. 

Cái gì giống nhau? Đó là ***cách mã hóa và giải mã dữ liệu***.

Để mã hóa và giải mã dữ liệu, sẽ cần đến những chiếc key. Trong mã hóa đối xứng, cả 2 bên sẽ sử dụng ***chung*** ***một key duy nhất***, ***vừa để mã hóa và vừa để giải mã dữ liệu***. Key này được gọi là ***secret key***. 

Đến đây chắc nhiều bạn sẽ thắc mắc, là như vậy sao mà an toàn được? Nếu hacker có được cái key đấy thì bạn chả tèo luôn à? 

Thực tế thì ĐÚNG như thế, nhưng hacker muốn lấy được cái secret key này không dễ chút nào, bởi key này được tạo ra bằng một thuật toán rất hay ho mà mình rất muốn giải thích trong bài viết này (vì nó hay). 
Trước đó có một điểm chúng ta cần lưu ý, đó là ***mỗi phiên SSH sẽ có một secret key riêng, và secret key này sẽ được cả 2 bên cùng tạo ra trước khi kết nối được thiết lập.***


Bây giờ đến phần hay ho mà mình vừa nói - cách để 2 bên tạo ra được secret key giống nhau mà không một bên thứ 3 nào có thể lấy được. Phần này bạn nào không quan tâm có thể bỏ qua, và đến thẳng phần ***Asymmetric Encryption***. Nhưng mình thấy thật sự nên đọc phần này, vì nó rất là hay ho =))).

Thuật toán để tạo ra key này gọi là ***Key Exchange Algorithm***, hay tên đầy đủ hơn là ***Diffie Hellman Key Exchange***. 

Cái hay đầu tiên là mặc dù thuật toán tên là ***Key Exchange*** (trao đổi key), nhưng thực tế lại ***không có một cái key nào được đem ra trao đổi cả***. Điều này nghĩa là secret key sẽ không bao giờ được gửi qua gửi lại giữa 2 bên (vì gửi như vậy hacker có thể chặn bắt và lấy được key). 

Thay vào đó, 2 bên sẽ thông qua một số bước để ***tự tạo ra được key giống nhau***. Không chỉ thế, key này còn là (gần như) độc nhất, và không một bên thứ 3 nào có thể tạo ra được. 

Làm thế nào để làm được như vậy? Chính là nhờ kĩ thuật Diffie Hellman Key Exchange. Thú thực là trong lần đầu tiên tìm hiểu về kĩ thuật này, mình thấy đúng kiểu mind blown luôn và phục 2 bác Diffie và Hellman sát đất :joy: (bây giờ vẫn thế hehe). 

Mình sẽ giải thích kĩ thuật này bằng cách sử dụng một ví dụ trộn sơn, giữa 2 người là ***Alice*** và ***Bob***. 

![](https://images.viblo.asia/3f95fc28-1245-4f8d-93f7-36d3ca4f1229.png)

Alice và Bob có sẵn trong tay một số màu sơn, và 2 người muốn dùng những màu sơn này để trộn ra một màu sơn mới mà chỉ 2 người mới biết là màu gì. Để làm được điều này, 2 người sẽ lần lượt làm các bước sau:

- ***Bước 1***: Cả 2 sẽ cùng thống nhất với nhau một màu nào đấy, gọi là ***màu chung*** (common color). Việc thống nhất này là công khai, ai cũng biết màu chung là màu gì. Trong ví dụ của chúng ta, hãy giả sử cả 2 chọn màu vàng đi.

- ***Bước 2***: Mỗi người tự chọn cho mình 1 ***màu bí mật***. Màu Alice chọn là gì thì Bob không thể biết, và ngược lại. Chúng ta lại giả sử Alice chọn màu đỏ và Bob chọn màu xanh lá cây.

- ***Bước 3***: Mỗi người sẽ tự ***trộn màu bí mật*** mà mình vừa chọn với ***màu chung*** ở bước 1. Alice trộn màu đỏ với màu vàng để ra màu da cam. Bob trộn màu xanh lá với màu vàng để ra màu xanh dương.
- ***Bước 4:***  2 người sẽ gửi màu mình vừa trộn cho nhau. Tất nhiên đã là gửi cho nhau thì sẽ là công khai. Ai cũng biết được màu 2 người vừa trộn ra là gì.

- ***Bước cuối cùng:*** Khi mỗi người đều có trong tay màu sơn đã trộn của người kia, thì tiếp tục trộn màu sơn của người kia với màu sơn bí mật của mình. Kết quả sẽ ra được cùng một màu giống nhau là màu xanh đậm.

***Tại sao lại ra được cùng một màu giống nhau***? Chúng ta cùng phân tích một chút:

- Alice trộn màu xanh dương (nhận được từ Bob), với màu đỏ. Thực tế màu xanh dương mà Alice nhận được là do màu vàng + màu xanh lá cây hợp thành (do Bob trộn ở bước 2), kết hợp với màu đỏ của Alice nữa thì ta có hỗn hợp vàng + xanh lá cây + đỏ.<br>
- Tương tự, hỗn hợp màu cam mà Bob nhận được là do màu đỏ và màu vàng hợp thành (Alice trộn ở bước 2), kết hợp với màu xanh lá cây của Bob thì ta có hỗn hợp đỏ + vàng + xanh lá cây.<br>
- Vậy Alice có: vàng + xanh lá cây + đỏ. <br>
- Bob có: đỏ + vàng + xanh lá cây.<br>

Và tất nhiên, hỗn hợp cuối cùng của 2 người sẽ có màu giống nhau (vì trộn từ 3 màu giống nhau). <br>

Tuy nhiên trong 3 màu đó có đến 2 màu là bí mật (đỏ và xanh lá), nên một bên thứ 3 dù có chặn bắt được màu chung ở bước 1 và màu trộn ở bước 3, thì cũng không thể nào trộn ra được màu sơn cuối cùng.



 Kĩ thuật này ảo diệu nhỉ =))). Tất nhiên ví dụ thông minh trên cũng không phải mình nghĩ ra đâu, mà mình lấy trên wikipedia đấy. Các bạn có thể xem bản gốc ở [đây](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange#:~:text=The%20Diffie%E2%80%93Hellman%20key%20exchange%20method%20allows%20two%20parties%20that,using%20a%20symmetric%2Dkey%20cipher.).

Từ ví dụ trên, chắc các bạn đã tưởng tượng ra được cách mà 2 bên tạo ra được secret key giống nhau rồi phải không?

Tương tự như việc trộn sơn, trong SSH 2 bên sẽ trộn các ***chuỗi byte ngẫu nhiên*** (random bytes) để tạo ra ***secret key chung***, mà không cần phải gửi secret key này qua internet. Sau khi tạo ra được secret key thì mọi dữ liệu truyền tải qua lại giữa 2 bên đều được mã hóa và giải mã bằng secret key này.

Nhưng khi các bạn tưởng thế đã là an toàn lắm rồi, thì hóa ra vẫn ***còn một kĩ thuật nữa được sử dụng để SSH an toàn hơn nữa***. 

Như chúng ta vừa tìm hiểu, dù 2 bên không trực tiếp gửi secret key cho nhau, nhưng vẫn gửi qua lại những chuỗi byte ngẫu nhiên. Sẽ tốt hơn nếu những chuỗi byte này cũng được mã hóa, và đúng là chúng sẽ được mã hóa. Kĩ thuật dùng để mã hóa các chuỗi byte này gọi là ***Asymmetric Encryption*** - Hay mã hóa bất đối xứng. 

### Asymmetric Encryption

![](https://images.viblo.asia/a7259b74-242a-4c61-898e-7bb3c6aa500c.png)


Chắc nhiều bạn sẽ đoán được ngay ý nghĩa tên của kĩ thuật này. Ngược với mã hóa đối xứng, thì trong mã hóa bất đối xứng, mỗi bên sẽ dùng một kiểu mã hóa - giải mã dữ liệu khác nhau. 

Cụ thể, mỗi bên sẽ chuẩn bị cho mình 2 chiếc key: public key và private key. Public key là công khai, ai biết cũng được, nhưng private key phải được giấu đi, không cho ai biết hết. Dữ liệu sẽ được ***mã hóa bằng public key***, và ***chỉ có thể được giải mã bằng private key.***

Vậy các chuỗi byte ngẫu nhiên mà mình vừa nói sẽ được mã hóa và giải mã như thế nào? 

Giả sử là bạn muốn SSH vào một server đi.
- Đầu mỗi phiên SSH, cả phía bạn và server đều tự tạo ra một cặp public - private key, và gửi public key của mình cho đối phương. 
- Khi này, server sẽ dùng public key mà bạn gửi để mã hóa chuỗi byte và gửi cho bạn. Vì chỉ mình bạn có private key, nên chỉ mình bạn mới giải mã được chuỗi byte này. 
- Tương tự, bạn cũng mã hóa chuỗi byte của mình bằng public key nhận được từ server. Chỉ server mới có private key để giải mã.

Do kĩ thuật mã hóa public - private key này tốn tài nguyên hơn, nên nó ***chỉ được dùng ở giai đoạn đầu để tạo ra secret key***. Đến khi tạo ra được secret key rồi thì cả 2 bên sẽ dùng secret key để vừa mã hóa, vừa giải mã dữ liệu.

**Đến đây hi vọng các bạn đã hiểu cách mà SSH hoạt động.**

Tuy nhiên, đó mới chỉ là cách để 2 bên đảm bảo mã hóa và giải mã dữ liệu an toàn. 

Một phần quan trọng không thể thiếu nữa của SSH chính là ***xác thực người dùng*** (client authentication). Nếu không có bước xác thực này thì ai cũng có thể SSH vào server của bạn, hay clone project từ github của bạn mất.

Phần này chính là lí do bạn cần phải add public key của mình lên github.

# Tại sao bạn cần add public key lên github?


![](https://images.viblo.asia/486b55de-d3bf-41d3-a8fd-b3b1f63b8006.png)

<em><p align="center">Nguồn: jdblischak.github.io</p></em>

Khi các bạn SSH vào server hay clone project github bằng SSH, thì server và github cần một cách để biết được chính bạn là người đang thực hiện các thao tác này chứ không phải ai khác. 

Cách đơn giản nhất để làm việc này chính là xác thực bằng mật khẩu, giống như khi đăng nhập facebook vậy. Tuy nhiên, mật khẩu mà chúng ta nghĩ ra thì thường không đủ phức tạp, rất dễ bị ăn cắp. 

Do đó, sẽ có một vài cách an toàn hơn để xác thực người dùng. Cách phổ biến nhất có lẽ là sử dụng public key. Đây cũng chính là cách mà github sử dụng. Phương pháp này được gọi là ***Public Key Authentication***. 

Nói đơn giản thì khi sử dụng phương pháp này để xác thực với server, bạn sẽ tạo sẵn một cặp public - private key. Sau đó, bạn gửi public key của mình qua cho server. Server sẽ lưu public key này lại (thường là trong một file tên là ***authorized_keys***. 

Mỗi khi bắt đầu một phiên SSH, bạn sẽ gửi cho server public key của mình. Nếu server thấy public key này đã có mặt trong authorized_keys, thì server sẽ thực hiện thêm 1 số bước nữa để đảm bảo bạn có cả private key. ***Sau khi xác nhận rằng bạn có cả private lẫn public key, việc xác thực coi như hoàn tất***.

Thực tế quá trình này phức tạp (và hay ho) hơn nhiều. Nếu bạn tự tin vào khả năng nghe tiếng anh của mình, thì [video này](https://www.youtube.com/watch?v=Nb7cHMc4_og) sẽ giúp bạn hiểu được trọn vẹn quá trình này.

Như vậy, việc bạn add public key lên github là để github thực hiện Public Key Authentication. Tất nhiên sau khi add public key lên thì bạn luôn phải giữ private key ở máy mình. Xóa đi thì lấy gì mà authen nữa :stuck_out_tongue_winking_eye:.

Bài viết của mình đến đây là hết. Hi vọng qua bài viết này của mình, các bạn sẽ có một cái nhìn sâu hơn về SSH, và hiểu lí do tại sao bạn lại phải add public key của mình lên github. 

Nếu các bạn thấy bài viết của mình dễ hiểu, mời các bạn follow mình để đọc các bài viết tiếp theo nha.

Sắp tới mình dự định viết về một số chủ đề mà đối với mình từng ***nghe quen quen nhưng lại rất mơ hồ*** :upside_down_face:, như [SSL/TLS](https://viblo.asia/p/https-va-ssltls-nhu-giai-thich-cho-tre-5-tuoi-Eb85oeYOZ2G), [SSL Pinning](https://viblo.asia/p/nhan-dien-server-pha-ke-bang-ssl-pinning-6J3ZgWJEZmB), race condition, readers-writers problem... tất nhiên là cũng dùng những hình ảnh dễ liên tưởng và dễ nhớ.

Mình cũng dự định làm một series giải thích cụ thể về ***Design patterns***, trong đó không chỉ tập trung vào ***HOW*** mà quan trọng hơn cả là ***WHY*** - ***Tại sao dùng design pattern lại giúp bạn tiết kiệm thời gian và bớt đau đầu hơn trong công việc lập trình***.

Mời các bạn đón đọc nha hehe.