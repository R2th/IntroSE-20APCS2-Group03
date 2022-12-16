Như cái tên của nó - **Zero-width character** là những ký tự có *chiều rộng bằng không*. Chúng đều là các ký tự unicode, được dùng trong một số trường hợp như để đánh dấu nơi có thể ngắt dòng (ký tự U+200B), hay để ngắt nối/nối các ký tự lại với nhau ở một số ngôn ngữ, như tiếng Ấn Độ hay tiếng Thái Lan chẳng hạn.

Tuy nhiên, vì đặc điểm của chúng là chẳng thể nào nhìn thấy được bằng mắt thường, bất cứ ai cũng có thể **tận dụng** các ký tự zero-width để **ẩn giấu dữ liệu** vào trong văn bản thuần túy.

Thử tưởng tượng, một đoạn văn bản ngắn **tưởng chừng vô hại**, nhưng có thể chứa đựng một **lượng thông tin dài khủng khiếp**, thậm chí cả 1 file dữ liệu, sẵn sàng vượt xa bất cứ dạng *steganography* nào khác!

![Công cụ Zero-width characters Datahider](https://images.viblo.asia/57efccb5-9fa4-4ab8-b742-7e3a51eaf5d6.png)

# Tổng quan
Bạn đoán 2 dòng chữ dưới đây có giống nhau hoàn toàn, hay có khác nhau? Mình bảo rằng đoạn chữ thứ 2 thực chất có ẩn chứa cả dữ liệu bí mật, bạn có tin được không? Mình cho phép các bạn **view source code** của đoạn dưới đây luôn!

> Viblo - Free service for technical knowledge sharing

> Viblo - ‎‌​​​‌‌​‌‌‌​​‌‌​‌‌​‌‌‌‌​​‌‌​​‌​‌​‌‌​‌‌‌‌‌‌‌​‌‌​​​‌​‌‌‌​‌​‌‌​‌‌‌‌‌‌​​‌‌‌‌​‌​‌​​​​​‌‌​​​​‌‌‌​​‌​‌‌​‌‌​‌‌‌‌‌‌​​‌‌​‌‌‌​​‌‌‌‌‌‌​​‌‌​‌‌‌​​‌‌​‌‌‌​​‌‌‌‌​‌​​‌‌‌​​‌​​‌‌‌‌​‌​​‌‌‌‌‌‌​​‌‌‌‌‌‌​​‌‌‌‌‌‌​​‌‌‌‌​‌​​‌‌‌​‌‌​​‌​‌‌‌‌​​‌‌​​​‌​​‌‌‌​​‏Free service for technical knowledge sharing

Trong bảng mã unicode, có **không dưới 7 ký tự** khác nhau là ký tự zero-width. Dưới đây là thông tin của một số rất ít ký tự mà mình tìm được:

|Tên|Mã Unicode|
| -------- | -------- |
|Zero-width space|U+200B|
|Zero-width non-joiner|U+200C|
|Zero-width joiner|U+200D|
|Left-To-Right Mark|U+200E|
|Right-To-Left Mark|U+200F|
|Word joiner|U+2060|
|Zero-width no-break space|U+FEFF|

Trên thực tế, **chỉ cần 1 ký tự** zero-width duy nhất nằm ở vị trí nhất định trong văn bản là đã đủ dùng cho mục đích **nhận dạng** (fingerprint). Và chỉ cần **2 loại ký tự** khác nhau là đã đủ để **chèn vào văn bản đủ dạng dữ liệu**, vì mọi dữ liệu đều biểu diễn được dưới dạng nhị phân. Nếu tận dụng hết lượng ký tự zero-width ở trên, chúng ta còn có thể làm ngắn lượng dữ liệu gửi đi nhiều hơn nữa.

Vậy thực tế trong những tình huống nào, các ký tự zero-width trên sẽ trở nên hữu dụng, hay có thể là hiểm họa khôn lường? Mình xin được cùng các bạn tìm hiểu ngay dưới đây.

# Trường hợp 1: nhận dạng (fingerprinting)
## Câu chuyện ngắn
Anh X là một người nọ đang làm việc trong bộ máy nhà nước Việt Nam với chức vụ tương đối. Tuy nhiên, vì chán nản với cuộc sống hiện tại và cảm thấy bất mãn với những gì chính phủ giấu diếm sau lưng người dân, anh đã quyết định trở thành một tay trong, nhiều lần đã rò rỉ thông tin nội bộ của nhà nước cho giới truyền thông.

Bản thân anh X không phải là 1 thằng ngu: mỗi lần tuồn thông tin, anh di chuyển tới nhiều địa điểm trên khắp đất nước, dùng *live USB* cài sẵn **Tails OS**, sử dụng **mạng Tor**, và gửi e-mail nặc danh cho giới báo chí qua giao thức **openPGP**.

Anh cũng **chẳng dại gì gửi trực tiếp** các tệp tin .doc, .pdf nhận được vì biết thừa mấy tệp như vậy có thể chứa các thể loại *metadata* hay *steganography* để nhận dạng anh. Anh cẩn thận Ctrl+A, Ctrl+C để copy, sau đó dán lại ra tệp khác bằng cách **Paste as plain text**. Anh check cẩn thận nội dung vừa dán, sau đó mới đính kèm và gửi đi cùng e-mail.

Rồi chuyện gì đến cũng phải đến. Một ngày nọ, anh cũng được cấp trên gửi đến các thông tin nội bộ tuyệt mật nóng hổi, trích một đoạn như sau:

> \[REDACTED\]‎‌​‌‌‌‌‌​‌​​‌​​​‌‌​​‌​‌‌‌‌‌​‌‌‌‌‌‌​‌​​‌‌‌‏Để đảm bảo an toàn cho người dân và giữ vững an ninh của tổ quốc, ‎‌​‌‌‌‌‌​‌​​‌​​​‌‌​​‌​‌‌‌‌‌​‌‌‌‌‌‌​‌​​‌‌‌‏Chính Phủ quyết định bắt đầu tiến hành theo dõi và quét toàn bộ lưu lượng liên lạc thông qua các kênh SMS, Zalo, Mocha, \[REDACTED\] ‎‌​‌‌‌‌‌​‌​​‌​​​‌‌​​‌​‌‌‌‌‌​‌‌‌‌‌‌​‌​​‌‌‌‏trên toàn bộ người dân Việt Nam. \[REDACTED\] ‎‌​‌‌‌‌‌​‌​​‌​​​‌‌​​‌​‌‌‌‌‌​‌‌‌‌‌‌​‌​​‌‌‌‏Đề nghị các đồng chí tuyệt đối giữ bí mật thông tin nói trên để tránh gây hoang mang cho người dân.

Mỏ vàng đây rồi, anh X nhanh chóng tiến hành các biện pháp như mọi khi, tung tin lên các kênh truyền thông, báo chí, mạng xã hội,... Đương nhiên là chỉ sau vài giờ khi tin được tung ra, thông tin nhận được cả ngàn phẫn nộ, trỉ trích, kêu gọi biểu tình các thứ,...

Thế rồi chẳng bao lâu sau, vào một ngày nắng đẹp. Mọi người thấy nhà anh **có 2 anh áo xanh đến hỏi thăm**, sau vài phút đã thấy 2 anh áo xanh đó **bế anh X lên xe tải** chạy đi mất hút. Và từ đó trở đi chẳng ai thấy mặt anh nữa...

![Ảnh minh họa](https://images.viblo.asia/24ba6e50-ddfb-4948-b54d-3f56ae2be717.jpg)
## Phân tích
Khỏi cần nói nhiều, các bạn có thể thấy ngay, anh X đã bỏ sót một thứ: **ký tự zero-width**! Bởi vì thông tin nội bộ được gửi cho từng người một với ký tự zero-width nhận dạng riêng, cơ quan công an chỉ cần kiểm tra lại các dòng chữ được đăng công khai trên các trang báo, mạng xã hội,... là thấy ngay các ký tự này chỉ có thể xuất hiện ở phiên bản văn bản gửi riêng cho anh X!

Nếu không tin, bạn có thể check đoạn trích phía trên với công cụ [**ZWC Datahider**](https://tranxuanthang.github.io/zwc-datahider/index.html) của mình. Bạn sẽ thấy tên của anh X được đặt ngầm ở rất nhiều nơi trong đoạn văn bản!

Không chỉ để bảo vệ văn bản nội bộ, phương pháp trên còn có thể dùng để: phát hiện đạo văn, copy vi phạm bản quyền, theo dõi (tracking),...
## Làm sao để phòng tránh
Giờ bạn đã có thể thấy ký tự zero-width nguy hiểm khôn lường thế nào. Vậy có cách nào nếu rơi vào trong trường hợp của anh X mà có thể phòng tránh được?
* Cài đặt các extension, plugin hỗ trợ phát hiện ký tự zero-width trong văn bản cho trình duyệt, e-mail client, trình soạn thảo văn bản,... Ví dụ như [Detect Zero-Width Characters](https://chrome.google.com/webstore/detail/detect-zero-width-charact/icibkhaehdofmcbfjfpppogioidkilib) cho Chrome.
* In, chụp ảnh văn bản rồi gửi, thay vì gửi trực tiếp văn bản.
* Nếu buộc phải gửi văn bản điện tử, hãy đánh máy tay lại từ đầu thay vì copy-paste.
* Đừng sống lỗi, bỏ đi mà làm người :">

# Trường hợp 2: Giấu gói tin để truyền tải bí mật
## Chém gió linh tinh
**Kỹ thuật giấu tin** (*Steganography*) là cả một bộ môn lớn và là cả một nghệ thuật. Từ lâu các chuyên gia đã có các phương pháp để giấu các gói tin vào trong những bức hình, những đoạn phim, âm thanh. Vì các tín hiệu hình ảnh, âm thanh thu được từ microphone hay camera của chúng ta chẳng bao giờ hoàn hảo 100%, các hình ảnh, âm thanh thu được đó luôn tồn tại phần **dữ liệu bị nhiễu**.

Bằng cách khéo léo tận dụng những khoảng dữ liệu bị nhiễu đó, các chuyên gia về stegano có thể chèn được một lượng dữ liệu vừa đủ dùng, miễn là kích thước file ảnh/âm thanh đủ lớn, mà **không hề làm nội dung của ảnh/âm thanh bị thay đổi** hay có thể nhận ra được qua giác quan thông thường!

Tuy nhiên, file **ảnh/âm thanh** đã giấu tin đó **rất nhạy cảm** trước thay đổi. Ví dụ như ảnh, sau khi ảnh bị đổi định dạng, nén, phóng to, thu nhỏ, thêm bộ lọc,... rất khó để những dữ liệu đã giấu vào ảnh còn được nguyên vẹn đến tay người nhận.

Tuy **văn bản đơn thuần không có "nhiễu"** như các file ảnh/âm thanh, như đã nói ở phần đầu bài, bạn hoàn toàn có thể tận dụng các ký tự zero-width để giấu dữ liệu bạn mong muốn truyền đi vào những đoạn văn bản trông vô hại, chẳng khác gì các kỹ thuật steganography thực thụ. Đặc biệt hơn, bạn có thể **lưu lượng dữ liệu lớn hơn kích thước văn bản ban đầu** dùng làm vật che đậy rất nhiều, khác hoàn toàn với file ảnh/âm thanh luôn phải chịu giới hạn về kích thước.

Bạn cũng chẳng phải quá lo về dữ liệu đã bị được giấu, vì nó không hề dễ dàng bị biến mất/hư hỏng so với giấu trong ảnh/âm thanh. Kể cả khi người dùng **format văn bản** (đậm, nghiêng, gạch chân,...), **sao chép**, **dán**, hay lưu, chuyển nó qua **các định dạng file khác nhau** (pdf, doc,...), các ký tự zero-width đều **vẫn sẽ bám theo** "dai như đỉa"!

## Ví dụ
Ngại viết ra thành chuyện nữa quá nên mình chỉ nghĩ ra một trường hợp đơn giản: một **nhóm hacker** có thể **chọn một kênh công khai**, diễn đàn hay message board kiểu như 4chan làm nơi **để ngầm giao tiếp**. Đoạn dữ liệu zero-width được dấu vào trong những comment/reply hết sức bình thường trong giữa biển mênh mông hàng ngàn, triệu các comment/reply khác được đăng tải mỗi ngày. Vừa dễ dàng truy cập ở mọi nơi, mà lại vừa là nơi không ngờ đến nhất.

## Thử với công cụ **ZWC Datahider**
Đây là một công cụ nhanh *by me* giúp hỗ trợ giấu/hiện dữ liệu ở các đoạn văn bản có chứa Zero-width character.

### Hướng dẫn
![ZWC Datahider](https://images.viblo.asia/3774b6da-74a3-46ad-836a-5c1fad2a9134.png)

1. Truy cập tranxuanthang.github.io/zwc-datahider/index.html
2. Nhập văn bản cần dấu, và một đoạn text công khai bạn muốn dùng để làm vật che đậy.
3. Nhấn submit.
4. Chia sẻ đoạn text kết quả an toàn cho bất cứ ai bạn muốn!

Để khôi phục dữ liệu đã dấu, tiếp tục truy cập vào ZWC Datahider, tìm phần *hiện dữ liệu ẩn*, rồi lặp lại các bước như trên với văn bản cần khôi phục.

Lưu ý rằng, việc dùng văn bản quá ngắn nhưng lượng ký tự zero-width quá nhiều có thể dễ bị nghi ngờ hơn, do một số phần mềm có thể hiện số lượng ký tự hiện có của văn bản.

### Tool hoạt động thế nào?
#### Chuyển từ text <=> binary
Trước hết, chúng ta cần phải tìm cách chuyển đoạn text mà người dùng muốn giấu về dạng mã nhị phân cái đã. Ví dụ, với bảng mã ASCII thì chữ: 

> hello

Có thể được biểu diễn dưới dạng nhị phân là:

> 01101000 01100101 01101100 01101100 01101111

May mắn là việc chuyển đổi này trong Javascript vô cùng dễ dàng, và không cần thêm bất cứ thư viện bên ngoài nào cả. Tất cả những gì ta cần là **Encoding API**. Ví dụ, để chuyển từ text sang dạng binary, chúng ta dùng `TextEncoder`, kết quả trả về sẽ là một Array Buffer như sau:

```javascript
new TextEncoder().encode('hello') // Uint8Array(5) [ 104, 101, 108, 108, 111 ]
```

Tương tự, để chuyển ngược lại một Array Buffer về dạng string:

```javascript
new TextDecoder().decode(new Uint8Array([104, 101, 108, 108, 111])) // "hello"
```

Một điều tiện lợi khác của Encoding API là mặc định hỗ trợ UTF-8 luôn, tức là mình không cần phải băn khoăn gì nữa về khoản viết nội dung là tiếng Việt có dấu cả!

Tiếp đến, bạn chỉ còn cần phải chuyển từng phần tử trong Array Buffer phía trên từ dạng số thập phân (104) sang dạng số nhị phân (1101000) nữa là xong. Bước này bạn có thể tham khảo source code của mình hoặc đi tìm một phương pháp riêng nhé!

#### Chuyển đổi giữa binary và ký tự zero-width
Với công cụ ZWC Datahider, mình sử dụng 2 loại ký tự zero-width để biểu thị dữ liệu dưới dạng nhị phân:
* Ký tự `‌` (**U+200C**: ZERO WIDTH NON-JOINER) để biểu diễn số **0**
* Ký tự `​` (**U+200B**: ZERO WIDTH SPACE) để biểu diễn số **1**

Bằng cách chuyển đoạn text cần giấu sang chuỗi nhị phân (chuỗi với toàn số 0 và 1), sau đó lại tiếp tục thay thế 0 và 1 trong chuỗi nhị phân đó với 2 loại ký tự zero-width tương ứng ở trên, mình có thể dễ dàng chuyển đoạn text thuần sang dạng dãy các ký tự zero-width.

Tuy nhiên, để cho thuận tiện trong việc phát hiện nội dung đã giấu thì mình sử dụng thêm 2 loại ký tự nữa để đánh dấu điểm đầu & điểm cuối của đoạn dữ liệu:
* Ký tự `‎` (**U+200E**: LEFT-TO-RIGHT MARK) để đánh dấu điểm **bắt đầu** chuỗi
* Ký tự `‏` (**U+200F**: RIGHT-TO-LEFT MARK) để đánh dấu điểm **kết thúc** chuỗi

Nhờ đó, sau này nếu muốn hiện nội dung ẩn, mình chỉ cần dùng regex để lấy đoạn nội dung giữa 2 ký tự phía trên, tiện lợi hơn một chút :D.

```javascript
const regex = /‎(.*?)‏/g
const content = '‌​​‌​‌‌‌‌​​‌​‌‌​‌​​‌‌​‌‌‌​​‌‌​‌‌‌​​‌‌​‌​‌​​‌​​​‌‏meow'
const matches = content.matchAll(regex)
```

Đoạn regex phía trên (`/‎(.*?)‏/g`) thoạt nhìn thì chẳng có nghĩa gì lắm, rằng nó match hết mọi ký tự có trong chuỗi, nhưng hãy chú ý rằng thực chất có cả ký tự zero-width trong regex nữa :D.
## Sao không mã hóa xong gửi luôn cho lành, giấu giấu làm gì?
Bởi vì việc mã hóa tạo ra nhiều những đoạn dữ liệu vô nghĩa, trông rất ngẫu nhiên. Mà những dữ liệu như vậy truyền qua mạng luôn gây sự nghi ngờ và bị để ý chặt chẽ hơn. Rất nhiều quốc gia có đạo luật về mã hóa rất nghiêm ngặt (như nước Úc nếu thấy trên thiết bị của bạn tồn tại dữ liệu chỉ cần **trông có vẻ random**, thì bạn **sẽ bị đè cổ** cho đến khi nào nôn ra khóa thì thôi :v).

Hơn nữa, sao ta không vừa mã hóa, vừa giấu dữ liệu? ZWC Datahider cũng có mục **cho phép giấu & mã hóa**. Mình sử dụng kiểu mã hóa **AES-GCM** qua trình duyệt với Web Crypto API, một kiểu mã hóa khá ổn áp ở thời điểm hiện tại. Bạn có thể đọc bài [giới thiệu về Web Crypto API](https://viblo.asia/p/web-crypto-api-gioi-thieu-va-vai-vi-du-su-dung-co-ban-Az45bQo6lxY) của mình để tìm hiểu thêm.

# Kết bài
**Luôn luôn cẩn thận** hơn trước khi bạn copy hay sử dụng bất kỳ văn bản nào, vì (một lần nữa) văn bản thuần túy cũng đủ để chứa những thông tin có thể gây bất lợi cho bạn. Cùng với đó, theo mình những kiến thức về *zero-width character* hay *steganography* nói chung đều rất thú vị, và có thể có lợi một lúc nào đó.

Công cụ giúp dấu dữ liệu bằng zero-width character - ZWC Datahider là công cụ hoàn toàn nguồn mở, được làm bằng [Alpine.JS](https://github.com/alpinejs/alpine) và [TailwindCSS](https://tailwindcss.com/). Mong bạn đừng ngại xem source code hay **đóng góp, gửi pull request** tại [trang GitHub của dự án](https://github.com/tranxuanthang/zwc-datahider).
# Tham khảo
* [Be careful what you copy: Invisibly inserting usernames into text with Zero-Width Characters](https://medium.com/@umpox/be-careful-what-you-copy-invisibly-inserting-usernames-into-text-with-zero-width-characters-18b4e6f17b66)