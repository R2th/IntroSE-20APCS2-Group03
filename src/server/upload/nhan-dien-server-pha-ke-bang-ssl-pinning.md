Xin chào các bạn, trong bài viết này mình muốn chia sẻ về một kĩ thuật rất nên dùng khi cần tăng tính bảo mật của kết nối internet: ***SSL Pinning***

Trong [**bài viết trước**](https://viblo.asia/p/ssltls-nhu-giai-thich-cho-tre-5-tuoi-Eb85oeYOZ2G), mình đã giải thích khá kĩ về ***SSL***, nên trong bài viết này mình mặc định các bạn đã hiểu về SSL và không nhắc lại khái niệm nữa nha. Nếu bạn đang đọc bài này và còn mơ hồ về SSL, mình khuyến khích các bạn đọc bài viết trước của mình đã nhé.

Ở cuối bài viết trước, mình có nói rằng hacker có thể ***bypass SSL***. Ở bài viết này, mình muốn nói cụ thể hơn một chút về cách thực hiện việc bypass này (hay còn gọi là ***Man-in-the-middle attack - MiTM***), từ đó nêu được vấn đề mà ***SSL Pinning*** giải quyết. Giờ mình bắt đầu nha!
## Bypass SSL như thế nào?
![](https://images.viblo.asia/8cad653c-a8a2-497c-bd9c-24b9a6370ea1.png)

Để thật sự hiểu được phần này, chúng ta cần phải hiểu rõ hơn về cơ chế hoạt động của SSL Certificate, và cách mà client quyết định xem có tin tưởng một certificate hay không.

Và để dễ hình dung, thì đây chính là certificate của trang google.com:
![](https://images.viblo.asia/add34d9d-9db8-452e-9dcb-48d1e4037927.png)
<em><p align="center"> SSL Certificate của google.com </p> </em>

Bạn có thể thấy certificate này có chứa rất nhiều thông tin liên quan đến server, trong đó mình muốn các bạn chú ý đến phần ***Issuer Name***.

Đây chính là bên phát hành certificate này. Bên phát hành này có thể là một tổ chức được nhiều bên tin tưởng và công nhận, gọi là **Certificate Authority (CA)**, hoặc là một bên ất ơ nào đấy không ai thèm tin (loại certificate ất ơ này gọi là ***self-signed certificate***). 

Bạn có thể tưởng tượng 2 loại certificate này giống như 2 loại bằng lái máy bay vậy. Loại đầu tiên do Cục hàng không Quốc gia cấp, loại thứ 2 là loại làm bằng photoshop, sai chính tả tùm la tùm lum. Giả sử bạn là hành khách trên một chuyến bay, bạn sẽ muốn phi công có loại bằng lái nào hơn? Tất nhiên là loại 1 rồi!

**Quá trình để có được 1 certificate loại 1 có thể đơn giản hoá như sau**: 
- Bên A tạo ra một certificate request có chứa thông tin danh tính của bên A
- Bên A gửi certificate request này cho CA để xác nhận
- Sau khi CA kiểm tra và thấy ok thì sẽ phát hành 1 certificate cho bên A và kí xác nhận vào certificate này. Các bên CA này sẽ thu tiền để cấp certificate cho bạn nha. Giá rổ khác nhau thì độ bao phủ (được bao nhiêu system tin tưởng) cũng khác nhau.
<br>
<br>

**Còn đối với certificate loại 2, ông A tự kí xác nhận certificate đấy luôn, từ đó sinh ra cái tên self-signed (tự kí)**. 

Đến đây mình clear một chút, đó là khi mình nói server trả về certificate, thì dễ làm các bạn hiểu nhầm rằng server chỉ trả về một chiếc certificate thôi. Thực tế server thường sẽ trả về một chuỗi certificate (Certificate chain). Chuỗi certificate của google.com là như thế này:

![](https://images.viblo.asia/69882b59-60cb-4655-8af2-b3ff41c95c3c.png)

<em><p align="center">(Bạn nào muốn xem chuỗi certificate của trang web bất kì trên Chrome thì các bạn bấm vào hình ổ khóa ở cạnh url của trang web, rồi bấm tiếp vào Certificate là ra nha)</p></em>

Trong chuỗi certificate trên:
- Cái dưới cùng chính là ***certificate được bên CA phát hành cho server google.com.*** Public key dùng để mã hóa data sẽ là lấy từ certificate này.
- Cái certificate trên cùng gọi là ***root certificate***, chính là certificate của bên CA.

Đúng là phong ba bão táp không bằng ngữ pháp Việt Nam. Chính mình đọc 2 ý trên cũng thấy hơi lú =)), nên mình sẽ lại sử dụng hình ảnh liên tưởng từ thực tế nha. 

Giả sử có 2 nhân vật - ngài chủ tịch và anh A (nhân viên quèn). Thẻ nhân viên của anh A là do ngài chủ tịch cấp. Tương ứng với trong hình kia, cái certificate dưới cùng là thẻ nhân viên của anh A, còn cái trên cùng là thẻ nhân viên của chủ tịch. 

**Để tiến hành handshake và kết nối với server, system chỉ cần trust root certificate là được.**

***System*** ở đây có thể là iOS, macOS… và những cái tương tự. Ứng dụng của bạn tất nhiên sẽ chạy trên một trong những system này. Nếu các bạn dùng macOS, các bạn có thể mở ngay Keychain Access để thấy một list các root certificate được system tin tưởng. Ví dụ như trên máy mình:

![](https://images.viblo.asia/4bd29580-46c5-49c6-bac1-75443e883853.png)

Và tất nhiên các loại self-signed certificate không có mặt trong list này nên không được system tin tưởng.

Thông thường các ứng dụng sẽ hoàn toàn ủy quyền cho system để xác nhận xem certificate của server có tin được hay không. Chẳng hạn một ứng dụng trên iPhone sẽ ủy quyền cho iOS. 

iOS tất nhiên cũng sẽ có một nơi để chứa tất cả các root certificate mà iOS tin tưởng, gọi là ***Trust Store***. Khi nhận được certificate từ server thì iOS sẽ xác định xem root certificate trong certificate chain đó có mặt trong Trust Store hay không, nếu có thì mới chơi với nhau tiếp.

Như mình vừa nói ở trên, system chỉ cần trust root certificate, còn cái ***certificate cuối cùng trong chuỗi có phải là của server google.com hay không không quan trọng.***

Chắc bạn có thể thấy ngay lỗ hổng của phương pháp này. **Hacker có thể tự cài đặt root certificate của mình vào hệ thống, để hệ thống tin tưởng certificate này**. Trường hợp đơn giản nhất mà mình có thể nghĩ ra là hacker cầm được iPhone của bạn, tải root certificate đểu của hắn về, bấm install, và thế là root certificate của hacker đã có mặt trong Trust Store của máy bạn. ***Đây chính là một cách thực hiện man-in-the-middle attack.***

Đến đây bạn đã có thể thấy, ***chỉ riêng SSL là không đủ***.

**Phía client cần một cách để đảm bảo dù đã root certificate đã được trust, nhưng cái certificate dưới cùng không phải là của google.com thì sẽ không tiến hành kết nối.**

**Làm điều này như thế nào? Sử dụng SSL Pinning!**

## Vậy SSL Pinning là gì?
*(Pin cái gì cơ? Pin con thỏ á?)*

Nói thật với các bạn, trong một khoảng thời gian rất lâu mình cứ bị nhầm giữa từ pinning (ghim) và spinning (xoay), nên mình cứ nghĩ SSL pinning là xoay vòng tròn như nào đấy ghê gớm lắm =)). 

Nhưng thực ra không phải. Pinning ở đây nghĩa là ghim. Ghim là ghim 1 cái server với một cái certificate hoặc public key. 

Điều này nghĩa là gì? Nghĩa là bạn lấy sẵn certificate của trang google.com về (cái cuối cùng trong chuỗi certificate ở ảnh bên trên ấy), để ở phía client, rồi khi handshake bạn so sánh certificate nhận được từ server và certificate bạn có, nếu giống nhau thì mới kết nối. Như vậy, bạn đã "ghim" một server (google.com) với một chiếc certificate (cái mà bạn lưu ở phía client).

### SSL Pinning giúp chống lại man-in-the-middle attack như thế nào?

Nếu hacker muốn giả mạo làm server, thì hacker vẫn phải trả về cho bạn một chiếc certificate để tiến hành handshake. 

Certificate này không thể là certificate của server google.com như trong ảnh trên được, vì như trong bài viết trước mình đã đề cập, mỗi certificate đều chứa public key dùng để mã hóa data, và chỉ bên có private key mới giải mã data được (mà hacker thì lấy đâu ra private key của google chứ). 

Do đó, để giải mã được data hacker cần phải trả về cho bạn cái certificate mà chính hắn tạo ra.
Nếu bạn đã lưu sẵn cái certificate (hoặc public key) chuẩn của server google.com ở phía client rồi, thì khi nhận được certificate từ server trong quá trình handshake bạn có thể so sánh 2 certificate với nhau, nếu thấy khác nhau thì á à thằng lừa đảo đây rồi =))).

Bạn có thể liên tưởng kiểu này: 
- Để xác định xem chứng minh thư mà bạn nhận được có đúng là của ông A hay không, thì bạn có thể kiểm tra phần dấu vân tay.
- Do bạn đã lưu dữ liệu dấu vân tay của ông A từ trước đó rồi, nên bạn có thể so sánh dữ liệu của bạn và dữ liệu trên chiếc chứng minh thư bạn nhận được. Nếu khác nhau một chút thôi là nghỉ chơi luôn.

![](https://images.viblo.asia/f0189325-bc4d-4005-952b-d1937ca7602c.jpg)



**Bằng việc so sánh như vậy, hacker có cài đặt được root certificate vào system của bạn thì cũng không thể làm gì xấu được.**


### Nên chọn certificate pinning hay public key pinning?
Hi vọng đến đây bạn đã hiểu được bản chất của SSL pinning rồi. 

Phần này là ngoài lề một chút. Mình không muốn đi quá sâu vào phần kĩ thuật, nhưng vẫn muốn giúp các bạn phân biệt ***certificate pinning*** và ***public key pinning***, vì mình nghĩ việc này sẽ có ích với các bạn đang muốn implement SSL pinning cho ứng dụng của mình. 

Thực tế bạn có thể thực hiện pinning bằng nhiều cách, phổ biến nhất là 2 cách sau:
- ***Pin cả cái certificate***: Bạn để luôn cái server certicate ở phía client. Khi handshake mà nhận được certificate từ server thì so sánh xem cái nhận được với cái mình đã lưu có giống nhau không. Ví dụ bên trên của mình là dùng cách này.
- ***Pin riêng cái public key***: Phía client lấy certificate chuẩn của server về, tách cái public key ra, rồi lưu lại. Khi handshake thì xem public key trong certificate nhận được có giống với cái mình đã lưu không.

<br>

**Ưu nhược điểm của 2 phương pháp này như sau:**
- ***Pin certificate:*** Dễ hơn. Bạn so sánh cái certificate lưu ở app với cái certificate nhận được từ server là được.
- ***Pin public key:*** Linh hoạt hơn, nhưng khó hơn một chút. Bạn phải tách được public key từ certificate của server ra rồi so sánh với public key đang lưu ở client.

<br>

**Pin public key thì linh hoạt hơn như thế nào?**

Giả sử certificate của server bị hết hạn, hoặc vì lí do trời ơi đất hơi nào đấy mà bạn cần tạo ra một cái certificate khác cho server.
- Nếu bạn dùng certificate pinning, bạn sẽ phải update phía client để thay certificate cũ đang lưu ở client bằng certificate mới 
- Nếu bạn dùng public key pinning thì không cần, vì bạn hoàn toàn có thể tạo ra một certificate mới có public key giống cái cũ

Như vậy, ***nếu server của bạn cần thay đổi certificate thường xuyên, thì lựa chọn public key pinning sẽ hợp lý hơn.*** Trường hợp duy nhất bạn cần phải update public key ở phía client mà mình có thể nghĩ tới là khi bạn muốn thay cả cái private key ở server (kiểu dùng lâu quá rồi sợ bị lộ ấy).

Bài viết của mình đến đây là kết thúc.
Hi vọng qua bài viết này các bạn đã có cái nhìn sâu hơn về kết hơn internet, và hiểu được bản chất kĩ thuật SSL pinning.

Nếu các bạn thấy bài viết của mình dễ hiểu, mời các bạn follow mình để đọc các bài viết tiếp theo nha. 

Sắp tới mình dự định viết về một số chủ đề mà đối với mình từng ***nghe quen quen nhưng lại rất mơ hồ*** :slightly_smiling_face:, như [***SSH***](https://viblo.asia/p/ban-khong-hieu-ssh-3Q75wVx9lWb), race condition, readers-writers problem... tất nhiên là cũng dùng những hình ảnh dễ liên tưởng và dễ nhớ.

Mình cũng dự định làm một series giải thích cụ thể về ***Design patterns***, trong đó không chỉ tập trung vào ***HOW*** mà quan trọng hơn cả là ***WHY*** - ***Tại sao dùng design pattern lại giúp bạn tiết kiệm thời gian và bớt đau đầu hơn trong công việc lập trình.***

Mời các bạn đón đọc nha hehe.

*P/s:* *Có thể vài bạn sẽ có một thắc mắc, đó là giả sử bạn thực hiện SSL Pinning bằng cách pin public key, mà public key là public, ai cũng có thể lấy được, thì chẳng nhẽ hacker không thể chèn cái public key đấy vào certificate đểu của bọn nó hay sao?
Theo mình biết thì không làm được kiểu đấy, vì khi tạo ra certificate thì cần có cả private key. Mà public key và private key thì là 1 cặp đi đôi với nhau.
Nhưng đấy là vì mình không phải hắc cơ xịn, chứ hắc cơ pro thì chắc vẫn làm được :worried:. Nhưng kể cả là có làm được, và phía client chấp nhận kết nối rồi, thì hacker cũng có private key để mà giải mã data đâu? :stuckouttonguewinkingeye:*