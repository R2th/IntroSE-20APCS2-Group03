Hôm nay mình xin giới thiệu khái niệm cơ bản về hệ mật mã khóa đối xứng và bất đối xứng. Cái này mình cũng đã được học qua ở trường rồi nhưng học xong cũng không còn nhớ là bao:sweat_smile:. Thế nên hôm nay mình viết bài này để xem kiến thức còn nhớ được bao nhiêu:grin: (tất nhiên mình cũng phải đọc lại giáo trình  đã được học).

Trước tiên để đi đến 2 khái niệm về mã hóa đối xứng và bất đối xứng thì mình xin giới thiệu qua về khái niệm về mật mã học. 
### Mật mã học (cryptography)
Là  ngành khoa học nghiên cứu các phương pháp toán học để mã hóa giữ mật thông tin. Bao gồm mã hóa và giải mã.
* Mã hóa là biến đổi cách thức biểu diễn thông tin từ dạng bản rõ (chúng ta có thể đọc được) sang dạng bản mã (chỉ người giải mã mới hiểu được), nó giúp chúng ta che giấu, giữ mật thông tin trong khi lưu trữ cũng như truyền thông tin đi.
* Giải mã là quá trình ngược lại đó là biến bản mã thành bản rõ. (Dễ hiểu phải không ạ:slightly_smiling_face:)

Chức năng cơ bản của mật mã đó là:
* **Tính bí mật**: nó đảm bảo tính bí mật của dữ liệu mà mình gửi đi và chỉ những người liên quan mới biết được nội dung.
* **Tính toàn vẹn** : đảm bảo dữ liệu không thể bị mất mát hoặc chỉnh sửa trong qua trình gửi và nhận mà không bị phát hiện. 
* **Tính xác thực**: đảm bảo danh tính của thực thể được xác minh.
* **Tính không thể chối từ**: đảm bảo người gửi không thể chối cãi với thông tin mình gửi đi (Tránh kiểu ăn ốc đổ vỏ đó ạ:sweat_smile:)

###  Hệ mật mã khóa đối xứng
Là những hệ mật được sử dụng chung 1 khóa trong quá trình mã hóa và mã hóa. Do đó khóa phải được giữ bí mật tuyện đối.

Một số hệ mật mã khóa đối xứng hiện đại mà mình thấy hay được sử dụng là [DES](https://en.wikipedia.org/wiki/Data_Encryption_Standard), [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard), [RC4](https://en.wikipedia.org/wiki/RC4), [RC5](https://en.wikipedia.org/wiki/RC5),...
![](https://images.viblo.asia/150df4bf-202f-40fc-9539-274e7f12ce14.png)

**Hệ mật sẽ bao gồm:**
* Bản rõ (plaintext-M): bản tin được sinh ra bởi bên gửi
* Bản mật (ciphertext-C): bản tin che giấu thông tin của bản rõ, được gửi tới bên nhận qua một kênh không bí
mật
* Khóa (Ks): nó là giá trị ngẫu nhiên và bí mật được chia sẻ giữa các bên trao đổi thông tin và được tạo ra từ:
    *  Bên thứ 3 được tin cậy tạo và phân phối tới bên gửi và bên nhận
    * Hoặc, bên gửi tạo ra và chuyển cho bên nhận
* Mã hóa (encrypt-E): C = E(KS, M)
* Giải mã (decrypt): M = D(KS, C) = D(KS, E(KS, M))

**Cơ chế hoạt động** (dễ hiểu lắm:upside_down_face:)
* Người gửi sử dụng khóa chung (Ks) để mã hóa thông tin rồi gửi cho nguời nhận. 
* Người nhận nhận được thông tin đó sẽ dùng chính khóa chung (Ks) để giải mã.

Tuy nhiên cái gì cũng có mặt hạn chế của nó, và thằng này cũng vậy:slightly_smiling_face:

**Mặt hạn chế**

* Do dùng chung khóa để mã hóa và giải mã => nếu bị mất hoặc bị đánh cắp bởi hacker sẽ bị lộ thông tin, bảo mật không cao.
* Cần kênh mật để chia sẻ khóa bí mật giữa các bên => Làm sao để chia sẻ một cách an toàn ở lần đầu tiên.
* Để đảm bảo liên lạc an toàn cho tất cả mọi người trong một nhóm gồm n người => cần tổng số lượng lớn khóa là n(n-1)/2 (tốn nhiều quá ha:thinking:)
* Khó ứng dụng trong các hệ thống mở.
* Không thể dùng cho mục đích xác thực hay mục đích chống thoái thác được.

Và để khắc phục những nhược điểm đó thì hệ mật mã khóa bất đối xứng (hay còn gọi là hệ mật mã khóa công khai) đã ra đời:upside_down_face:
### Hệ mật mã khóa bất đối xứng
Ở hệ mật này thay vì nguời dùng dùng chung 1 khóa như ở hệ mật mã khóa đối xứng thì ở đây sẽ dùng 1 cặp khóa có tên là public key và private key. 

Hệ mật mã khóa bất đối xứng mình thấy được dùng nhiều nhất là [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
![](https://images.viblo.asia/d118c58f-5637-4998-8eb3-cf2eb15997ec.png)
**Hệ mật sẽ bao gồm:**
* Bản rõ (plaintext-M): bản tin được sinh ra bởi bên gửi
* Bản mật (ciphertext-C): bản tin che giấu thông tin của bản rõ, được gửi tới bên nhận qua một kênh không bí
mật
* Khóa: Bên nhận có 1 cặp khóa:
    * Khóa công khai (Kub) : công bố cho tất cả mọi người biết (kể cả hacker)
    * Khóa riêng (Krb) : bên nhận giữ bí mật, không chia sẻ cho bất kỳ ai
* Mã hóa (encrypt-E): C = E(Kub, M)
* Giải mã (decrypt): M = D(Krb, C) = D(Krb, E(Kub, M))

*Yêu cầu đối với cặp khóa (Kub, Krb) là:*
* Hoàn toàn ngẫu nhiên
* Có quan hệ về mặt toán học 1-1.
* Nếu chỉ có giá trị của Kub không thể tính được Krb.
* Krb phải được giữ mật hoàn toàn.

**Cơ chế hoạt động** (cũng dễ hiểu không kém đối xứng:grin:)

   * Người gửi(A) gửi thông tin đã được mã hóa bằng khóa công khai (Kub) của người nhận(B) thông qua kênh truyền tin không bí mật
    * Người nhận(B) nhận được thông tin đó sẽ giải mã bằng khóa riêng (Krb) của mình. 
    * Hacker cũng sẽ biết khóa công khai (Kub) của B tuy nhiên do không có khóa riêng (Krb) nên Hacker không thể xem được thông tin gửi

**Ưu điểm của hệ mật này đó là**
* Không cần chia sẻ khóa mã hóa(khóa công khai) một cách bí mật => Dễ dàng ứng dụng trong các hệ thống mở.
* Khóa giải mã(khóa riêng) chỉ có B biết => An toàn hơn, có thể xác thực nguồn gốc thông tin
* n phần tử chỉ cần n cặp khóa.(tốt hơn hẳn thằng đối xứng r:slightly_smiling_face:)

**Nhược điểm:**

* Chưa có kênh an toàn để chia sẻ khóa => Khả năng bị tấn công dạng tấn công người đứng giữa([man in the middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) ).
> **Tấn công người đứng giữa:** kẻ tấn công lợi dụng việc phân phối khóa công khai để thay đổi khóa công khai. Sau khi đã giả mạo được khóa công khai, kẻ tấn công đứng ở giữa 2 bên để nhận các gói tin, giải mã rồi lại mã hóa với khóa đúng và gửi đến nơi nhận để tránh bị phát hiện.
> 
> Dạng tấn công kiểu này có thể phòng ngừa bằng các phương pháp [Trao đổi khóa Diffie-Hellman](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) nhằm đảm bảo nhận thực người gửi và toàn vẹn thông tin.
> 

Trên đây là những khái niệm cơ bản mà mình nghĩ bất kỳ ai cũng có thể nắm qua được nó. Để hiểu sâu hơn thì mọi người cần bỏ nhiều thời gian nghiên cứu nó vì đây là lĩnh vực về an ninh mạng mà mình thấy không dễ ăn gì cả:fearful:. 

Thanks for reading:sparkling_heart: