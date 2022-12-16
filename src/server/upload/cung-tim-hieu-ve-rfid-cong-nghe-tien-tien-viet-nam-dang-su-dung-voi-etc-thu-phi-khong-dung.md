Bữa lâu lâu rồi mình có đọc được thông tin này từ 1 page có tích xanh 
![image.png](https://images.viblo.asia/b4dfa00b-0429-4b5a-83f3-51b426ab370d.png)
Thông tin real nó ở đây, các bạn có thể vào đọc :D 
https://www.facebook.com/thongtinchinhphu/posts/pfbid0Uuqh9DKGVVES7T5ApQDepxa6WNw3YMuDtsMxFKERc5QttHWgBNvVJvVNVRZUNkxpl

Ờ thì mình cũng có tính tò mò, sao cái công nghệ RFID Việt Nam đang áp dụng cho thu phí không dừng (ETC) nó lại tiên tiến thế, hơn cả Sing (thật ra là mình biết nó cũng cách đây mấy năm, hồi còn clone thẻ nhân viên để dùng, vì tiền đền thẻ nhân viên khi mất mặn quá, tận 200k lận :<)

# RFID
RFID là một công nghệ thẻ sử dụng sóng vô tuyến không tiếp xúc. Được giới thiệu lần đầu vào 23 tháng 1 năm 1973, **tức 49 năm trước**. Nó khá phổ biến đến mức bạn có thể thấy ở bất kỳ đâu ở thành phố lớn (ở quê thì ít thấy hơn nhưng mà vẫn có): intercoms, thẻ ngân hàng, thẻ nhân viên, thẻ gửi xe, rồi có cả thẻ cho vật nuôi, ... và thẻ dán trong xe hay gương của ETC đó. Có 2 loại RFID là High-frequency tags (thẻ tần số cao) và Low-frequency tags (thẻ tần số thấp).  
- **Low-frequency tags (125kHz):** hoạt động ở 125kHz. Mặc dù chúng không an toàn, tuy nhiên vẫn được sử dụng rộng rãi ở các hệ thống kiểm soát truy cập ví dụ như thẻ nhân viên, thẻ gửi xe, ...
- **High-frequency tags (13.56MHz):** có phạm vi hiệu quả thấp hơn khi so sánh với low-frequency tags, tuy nhiên giao thức thì phức tạp hơn, an toàn hơn vì có hỗ trợ mã hoá, xác thực. Những thẻ này hay được dùng trong thẻ ngân hàng, căn cước công dân ... (còn được gọi cái tên khác là NFC)
- **Ultra-High Frequency RFID:** thật ra là có 1 loại nữa của RFID là tần số cực cao, là loại có tốc độ đọc nhanh nhất và phạm vi đọc rộng nhất. Có 2 loại thẻ UHF, 1 loại tầm gần và 1 loại tầm xa sử dụng trong phạm vi **840-960 MHz**. Loại tầm xa có thể đọc ở phạm vi xa tới 12 mét đối với thẻ RFID thụ động (không cần dùng năng lượng) và với 100 mét đối với loại RFID chủ động (có sử dụng năng lượng). Tuy nhiên vì xa như vậy nên hay bị nhiễu nhất :-s. Loại này thì được ETC sử dụng để dán lên xe để thu phí không dừng. 

![image.png](https://images.viblo.asia/1bba4f31-848e-435e-bd0e-9b5f5dedb475.png)
# Cách hoạt động của thẻ RFID
![](https://habrastorage.org/webt/vz/f6/_a/vzf6_a87tdtfu2xyk33nosvk-ms.gif)

Hầu hết các thẻ RFID là loại thẻ thụ động (không sử dụng năng lượng, không cần nguồn điện bên trong). Con chip bên trong thẻ được tắt cho đến khi thẻ tiếp xúc với trường điện từ của đầu đọc. Đầu đọc sẽ phát trường điện từ, truyền cho thẻ RFID tý điện, cuộn cảm của thẻ RFID sẽ hấp thụ năng lượng từ trường của đầu đọc và chip có đủ điện để bật lên, và giao tiếp với đầu đọc. Điều đáng nói là ăng-ten của thẻ được điều chỉnh theo một tần số cụ thể, vì vậy thẻ chỉ có thể kích hoạt khi nó ở bên trong trường điện từ phù hợp. Điều này có thể lý giải tại sao thẻ RFID thụ động cần 1 khoảng thời gian delay khi mình quẹt thì đầu đọc mới nhận được tín hiệu từ thẻ.

# Các loại thẻ RFID
Có khá nhiều loại thẻ RFID, đủ thể loại hình dạng, có cả thẻ dày, thẻ mỏng, kiểu key fobs, vòng đeo tay hay dạng tiền xu. Chỉ nhìn bằng "giao diện" hầu như không thể phân biệt được tần suất hoặc giao thức mà thẻ hoạt động.

![image.png](https://images.viblo.asia/45f255b5-8ff1-4cf4-9006-8b7828954972.png)

## Nhận diện thẻ 125 kHz, 13.56 MHz và UHF - Cái nào là cái nào?

![image.png](https://images.viblo.asia/ec825193-c70d-4762-afbc-09eb8c83bd29.png)
![image.png](https://images.viblo.asia/0e72c6ba-60e6-4dc2-afab-3ee6f9d6b2a9.png)

Nhận diện dễ nhất thì chắc là thẻ UHF RFID, nó dài ngoằng và có 1 con chip ở trung tâm, cuộn cảm thì thiết kế khá bé, và dạng ăng ten. Cần có đầu đọc (UHF Reader) chiếu đúng hướng vào thẻ (UHF tag) thì mới có thể đọc được. Ứng dụng cái này vào trong bãi gửi xe tự động, hay thu phí không dừng ETC. 

![image.png](https://images.viblo.asia/9cbf5e41-fbee-4c59-bc31-c3bb1ec28171.png)

Còn đối với RFID 125kHz và 13.56MHz thì nhìn ở cuộn cảm. Bạn chiếu đèn pin vào thẻ thì có thể nhìn thấy cuộn cảm này. Nếu cuộn cảm chỉ có một vài vòng tròn lớn, rất có thể đó là RFID tần số cao. Nếu cuộn cảm trông giống như một mảnh kim loại đặc không có khoảng trống giữa các vòng, thì đó là cuộn cảm tần số thấp.

![image.png](https://images.viblo.asia/11000204-174a-4490-9b6d-0beab8df4585.png)

## Low-frequency tags (125kHz)
- Tầm xa : tần số thấp hơn chuyển thành phạm vi cao hơn. Có một số đầu đọc EM-Marin và HID, hoạt động từ khoảng cách lên đến một mét. Chúng thường được sử dụng trong bãi đậu xe hơi.
- Protocol sơ khai: do tốc độ truyền dữ liệu thấp, các thẻ này chỉ có thể truyền dữ liệu vài byte. Trong hầu hết các trường hợp, dữ liệu không được xác thực và nó không được bảo vệ theo bất kỳ cách nào. Ngay sau khi thẻ nằm trong phạm vi của đầu đọc, thẻ chỉ bắt đầu truyền ID của nó cho đầu đọc.
- Bảo mật thấp: Những thẻ này có thể dễ dàng sao chép hoặc thậm chí đọc từ túi của người khác do tính sơ khai của protocol.

## High-frequency tags (13.56MHz)
- Tầm gần: Thẻ tần số cao được thiết kế đặc biệt để chúng phải đặt ở tầm gần của đầu đọc thì mới có thể nhận diện được. Điều này cũng giúp bảo vệ thẻ khỏi các tương tác với thẻ trái phép khi chủ nhân không cho phép. Phạm vi tối đa có thể tương tác được là vào khoảng 15cm đối với những thẻ được custom lại.
- Protocol nâng cao:  Data được truyền với tốc độ 424 kbps, cho phép gửi dữ liệu 2 chiều. Từ đó có thể xác thực mật mã, mã hoá hay truyền dữ liệu lớn.
- Bảo mật cao:  Không thua kém gì thẻ thông minh. Có những thẻ hỗ trợ các thuật toán mạnh về mặt mật mã như AES và khoá bất đối xứng.

> Do đặc tính của low-frequency tags nên hoàn toàn có thể clone thẻ dễ dàng (vì nó 1 chiều)
# Sử dụng Flipper Zero để có thể giả lập thẻ RFID
Ai chưa biết đến Flipper Zero là gì có thể đọc bài giới thiệu tại [đây](https://viblo.asia/p/flipperzero-tro-thu-dac-luc-cho-pentesters-va-geeks-YWOZrPjN5Q0).

{@embed: https://vimeo.com/752423116}

Flipper Zero có thể đọc được rất nhiều loại thẻ RFID 
- EM-Marin: EM4100, EM4102, giao thức phổ biến nhất trong CIS. Có thể được đọc từ khoảng một mét vì sự đơn giản và ổn định của nó.
- HID Prox II: giao thức tần số thấp được giới thiệu bởi HID Global. Giao thức này phổ biến hơn ở các nước phương Tây. Nó phức tạp hơn và thẻ và đầu đọc cho giao thức này tương đối đắt.
- Indala: giao thức tần số thấp rất cũ được Motorola giới thiệu và sau đó được HID mua lại. Bạn ít có khả năng gặp phải nó trong tự nhiên so với hai phần trước vì nó đang không còn được sử dụng.
- Vân vân và mây mây khác ...

Có 2 kiểu thẻ RFID 125kHz mình gặp: 1 loại đọc và ghi được, và 1 loại thì chỉ đọc, không ghi nổi vì chip không hỗ trợ. Giống việc ghi dữ liệu vào đĩa trắng ngày xưa, không thay đổi được.

# Kết
Đến đây có lẽ các bạn đã hiểu cái công nghệ "tiên tiến" mà các bác đang sử dụng để thu phí không dừng, hay sử dụng để quẹt thẻ ra vào rồi. Để phần 2 mình viết tiếp về NFC nhé, cũng hơi dài rồi. See ya!

Cảm ơn anh @ngoctnq đã tài trợ device để ae test :rofl: