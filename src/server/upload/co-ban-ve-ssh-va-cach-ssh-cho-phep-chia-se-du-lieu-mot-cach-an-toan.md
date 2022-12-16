Nguồn: [Medium](https://medium.com/free-code-camp/a-top-down-introduction-to-ssh-965f4fadd32e)

# SSH là gì?

SSH, hay tên đầy đủ là 'Secure Shell', là một giao thức để chia sẻ dữ liệu giữa hai máy tính qua internet.
Về cơ bản, một giao thức là một tập hợp các quy tắc xác định ngôn ngữ mà máy tính có thể sử dụng để giao tiếp.
Thông thường, hai máy tính tham gia vào SSH là máy khách (client) và máy chủ (host)

# Tại sao phải biết về SSH?

## SSH cho phép các máy tính giao tiếp một cách an toàn

Bất cứ khi nào hai máy tính giao tiếp qua internet, chúng ta cần đảm bảo rằng bất kỳ ai đang nghe lén đều không thể bắt và hiểu được tin nhắn của chúng ta.
Hãy tưởng tượng lúc bạn muốn mua gì đó thông qua online và cần phải gửi thông tin tài khoản ngân hàng của bạn qua internet, nếu tin nhắn của bạn không được mã hóa, thì bất kỳ máy tính nào đang nghe hoặc bất kỳ máy tính nào nhận tin nhắn để chuyển tiếp đều có thể thấy số tài khoản và mật khẩu của bạn. Điều này **RẤT không tốt.**

## SSH cho phép truy cập một cách an toàn vào máy tính từ xa

Sử dụng SSH để xác thực là một cách an toàn hơn so với sử dụng mật khẩu. Chúng ta sẽ khám phá cách thức hoạt động của nó dưới đây.

# Vì sao SSH lại có tính bảo mật

Ở đây, "bảo mật" được định nghĩa là việc các message được **mã hóa** trên máy khách theo một cách nào đó sao cho chỉ có máy chủ mới có thể thể giải mã các message đó và hiểu chúng. Vì vậy, khi nói "SSH có tính bảo mật",  ý chúng ta ở đây là vì **SSH sử dụng một kênh giao tiếp được mã hóa.**


# Phiên SSH được thiết lập như thế nào?

Có một số quá trình cần phải xảy ra giữa hai máy tính để bắt đầu một phiên SSH như sau:
1. Đầu tiên, chúng ta cần một cách thiết lập một phương thức trao đổi thông điệp an toàn giữa các máy tính. Hay nói cách khác, chúng ta cần thiết lập một kênh liên lạc được mã hóa.
2. Chúng ta cần một cách để kiểm tra xem dữ liệu mà máy chủ nhận được có bị giả mạo hay không. Đây được gọi là **verification** và ở đây chúng ta đang xác minh tính toàn vẹn của dữ liệu do máy client gửi.
3. Xác minh (một lần nữa). Chúng ta cần một cách để kiểm tra xem máy tính mà chúng ta đang giao tiếp có phải là giả mạo hay không. Đây cũng là một hình thức verification nhưng khác biệt ở chỗ là bước này chúng ta đang xác minh danh tính của bản thân máy tính.
Sau ba bước này, bây giờ chúng ta có thể giao tiếp an toàn với một máy tính từ xa, và chia sẻ dữ liệu ‘bí mật’ một cách an toàn. Đồng thời, chúng ta cũng có thể kiểm tra xem máy client có quyền truy cập máy chủ một cách an toàn hơn so với sử dụng mật khẩu hay không. Quá trình này được gọi là xác thực sử dụng **mã hóa khóa bất đối xứng**.
Các phần dưới đây sẽ đi vào chi tiết hơn về các bước trên.

## Thiết lập kênh liên lạc được mã hóa

Trước hết, chúng ta đi tìm hiểu cách mã hóa được thực hiện

**1. Khóa đối xứng**

Về cơ bản, mã hóa chỉ là việc "đảo lộn các chữ cái" bằng cách sử dụng một số phép toán "to não". Cả hai máy tính cần phải có một cách mã hóa thông tin để chỉ máy tính kia có thể giải mã thông tin và hiểu nó.
Phương thức hoạt động của việc mã hóa này diễn ra như sau: Cả hai máy tính đều có một phiên bản giống hệt nhau của một khóa đối xứng. Khóa đối xứng chỉ là một chuỗi ký tự được lưu trữ ở đâu đó trên máy tính. Các máy tính có thể sử dụng các khóa đối xứng để mã hóa/giải mã các thông điệp được gửi đến chúng.
Cách tiếp cận sử dụng khóa đối xứng này được gọi là **mã hóa khóa đối xứng**. Chữ "đối xứng" ở đây xuất phát từ thực tế là khóa trên mỗi máy tính là giống hệt nhau. Cách tiếp cận này thực sự hiệu quả và an toàn, với điều kiện là... không có máy tính nào khác có quyền truy cập vào khóa đối xứng.
Đây chính là vấn đề đối với cách tiếp cận dùng khóa đối xứng này. Cụ thể hơn, chúng ta hãy cùng thử trả lời câu hỏi sau: Làm thế nào để cả hai máy tính biết khóa đối xứng là gì?
Một máy tính có thể tạo nó và gửi nó dưới dạng tin nhắn qua internet. Nhưng các tin nhắn vẫn chưa được mã hóa, vì vậy bất kỳ ai bắt thông điệp sẽ ngay lập tức có khóa đối xứng… và có thể giải mã tất cả các thông tin liên lạc trong tương lai. 
Đây đôi khi được gọi là vấn đề 'trao đổi khóa'. Rõ ràng là chúng ta cần thêm một bước nữa trong quy trình trước khi có thể sử dụng các khóa đối xứng. Hãy cùng nhau tìm hiểu tiếp phần dưới đây.

**2. Khóa bất đối xứng**

Một giải pháp cho vấn đề "trao đổi khóa" ở trên là cả hai máy tính chia sẻ một số thông tin công khai với nhau ("công khai" nghĩa là ai biết cũng được) và kết hợp các thông tin đó với một số thông tin trong máy để độc lập tạo ra các khóa đối xứng giống hệt nhau.
Các khóa đối xứng này sau đó có thể được sử dụng trong mã hóa đối xứng theo cách đã nêu ở trên.

Cách tạo ra khóa bất đối xứng:
Cả hai máy tính đều có khóa cá nhân và khóa công khai riêng. Chúng cùng nhau tạo thành một cặp khóa. Các máy tính chia sẻ khóa công khai của chúng với nhau qua internet. Vì vậy, tại thời điểm này, mỗi máy tính biết các thông tin sau:
* khóa cá nhân của riêng nó,
* khóa công khai của riêng nó,
* và khóa công khai của máy tính khác.
Sau đó, cả hai máy tính sử dụng 3  thông tin này để tạo ra một khóa đối xứng giống hệt nhau một cách độc lập. Mỗi máy tính sử dụng một thuật toán toán học sử dụng 3 đầu vào được đề cập ở trên. Thuật toán này là một phần của thuật toán trao đổi khóa Diffie-Hellman. Thuật toán sẽ được thực thi trên mỗi máy tính như sau:

```
Host
pub_2 = other computer's public key
pub_1 = my public key
pri_1 = my private key
f(pub_2, pub_1, pri_1) = abcdefg // Symmetric Key
Client:
f(pub_1, pub_2, pri_2) = abcdefg // Symmetric Key
```

Điều quan trọng cần lưu ý ở đây là các máy tính chỉ chia sẻ thông tin công khai qua internet nhưng vẫn có thể tạo ra các khóa đối xứng.
Phương pháp sử dụng các cặp khóa và chia sẻ thông tin công khai để tạo ra các khóa đối xứng giống hệt nhau được gọi là mã hóa khóa bất đối xứng. Nó được gọi là "bất đối xứng" vì cả hai máy tính đều bắt đầu với các cặp khóa riêng của chúng.

## Xác minh

Ở trên, chúng ta có thể giao tiếp một cách an toàn. Nhưng phần tiếp theo của quá trình thiết lập phiên SSH là xác minh rằng dữ liệu không bị giả mạo khi nó đã được truyền đi và máy tính kia cũng là "chính chủ". Hãy cùng tìm hiể cách thức xác minh ở dưới đây.

### Băm

Chúng ta phải sử dụng một hàm băm. Đây  là một hàm toán học nhận vào một số đầu vào và sau đó tạo ra một chuỗi có kích thước cố định.
Đặc điểm quan trọng của hàm này là hầu như không thể tìm ra đầu vào chỉ sử dụng kết quả đầu ra.
Sau khi máy khách và máy chủ đã tạo khóa đối xứng, máy khách sẽ sử dụng hàm băm để tạo HMAC (viết tắt của "mã xác thực thông điệp dựa trên băm"). Đây chỉ đơn giản là một chuỗi ký tự/số. Máy khách sẽ gửi HMAC này đến máy chủ để xác minh.

**Các thành phần của hàm băm là:**

* Khóa đối xứng trên máy khách
* Số thứ tự gói (mỗi thông điệp được gửi đi chứa trong một "gói" thông tin)
* Nội dung thông điệp đã được mã hóa

Một ví dụ với dữ liệu fake như sau:

```
symm_key       = abcdefg
pkge_no        = 13
encr_message   = encrypted_password
Hash(symm_key, pkge_no, encr_message) = *HMAC* // Hashed value
```

**Máy chủ sử dụng thông tin này như thế nào?**

Khi máy chủ nhận được HMAC, máy chủ cũng chạy hàm băm với ba thành phần sau:
* bản sao của khóa đối xứng của chính nó,
* số thứ tự gói,
* và thông điệp được mã hóa.

Nếu giá trị băm mà nó tính ra giống với HMAC mà nó nhận được từ máy client, thì chúng ta đã xác minh rằng máy tính đang kết nối giống với máy tính có khóa đối xứng.
Hãy nhớ rằng chỉ máy chủ và máy khách mới biết khóa đối xứng là gì và không máy tính nào khác làm giả được.
Vì vậy, cho dù máy chủ có không biết nội dung đã giải mã của thông điệp được mã hóa thì nó vẫn có thể xác minh danh tính của máy tính đang kết nối.
Điểm hay của phương pháp này là chúng ta không chỉ xác minh danh tính của máy khách và đảm bảo rằng dữ liệu không bị giả mạo mà còn đảm bảo bảo mật (không chia sẻ bất kỳ thông tin cá nhân nào).

## Xác thực

Vấn đề cuối cùng của giao tiếp an toàn với máy tính từ xa là:
Ngay cả khi chúng ta đã tạo các khóa đối xứng với máy tính đang kết nối, ngay cả khi đang sử dụng các khóa đối xứng để giao tiếp an toàn và ngay cả khi máy tính đang kết nối thực sự là máy client mà không phải là kẻ mạo danh để thiết lập một phiên SSH… nhưng làm sao để chúng ta biết máy tính đang kết nối có quyền truy cập vào nội dung của máy chủ không?
Đây được gọi là ‘xác thực’: hành động kiểm tra quyền.

Có hai cách để kiểm tra xác thực:
1. Sử dụng mật khẩu
Máy khách có thể gửi cho máy chủ một thông điệp (được mã hóa) có chứa mật khẩu. Máy chủ có thể giải mã thông điệp và kiểm tra mật khẩu trong cơ sở dữ liệu để kiểm tra xem máy khách có quyền truy cập vào ‘người dùng’ được chỉ định hay không.
2. Sử dụng cặp khóa và mã hóa khóa bất đối xứng
Trước đó, chúng ta đã thấy cách mã hóa bất đối xứng có thể sử dụng hai cặp khóa để tạo ra các khóa đối xứng giống hệt nhau một cách an toàn trên cả máy khách và máy chủ. Sử dụng ý tưởng tương tự, khách hàng có thể đăng nhập mà không cần mật khẩu.
Sau đây sẽ giải thích tổng quan cách hoạt động của cách xác thực thứ 2:

Set up:
Trên máy khách, vào terminal và gõ lệnh để tạo khóa công khai và khóa riêng tư. Ctrl C khóa công khai (KHÔNG phải khóa riêng tư).
Sau đó, trong terminal trên máy khách, sử dụng mật khẩu để đăng nhập từ xa vào máy chủ. Paste khóa công khai của máy khách vào thư mục lưu khóa công khai trên máy chủ.
Bây giờ, máy chủ có cặp khóa công khai/riêng tư của riêng mình và khóa công khai của máy khách, vì vậy có thể tạo khóa đối xứng.

Tại sao nên sử dụng cách tiếp cận thứ hai?
Điều này được coi là an toàn hơn so với chỉ sử dụng mật khẩu vì tin tặc có thể sử dụng phương pháp "brute force" (trâu bò) để đoán mật khẩu của bạn, nhưng sẽ không bao giờ tìm ra được cặp khóa.