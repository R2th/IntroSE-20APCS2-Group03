Ở phần trước chúng ta đã cùng nhau tìm hiểu về các giao thức và cách chúng vận hành để trao đổi các gói tin. Vậy trong quá trình trao đổi nội dung các gói tin hay chúng ta gọi là data có được bảo mật không và có những cách thức nào để bảo mật dữ liệu, mã hóa dữ liệu trong quá trình truyền tải trên Internet? 

Hãy cùng nhau tìm hiểu về Encoding, Decoding và Crytography để có câu trả lời nhé ! 
![](https://images.viblo.asia/21cab3a1-7f7b-47b8-be9f-2386e4eaae7f.png)

## What is Encoding and Decoding?
***Encoding*** là quá trình chuyển đổi chuỗi các ký tự như là chữ cái, chữ số và các ký tự đặc biệt thành một dạng format khác theo quy chuẩn nhất định (ví dụ như theo bảng mã ASCII) để truyền dẫn một cách hiệu quả. 

***Decoding*** là quá trình chuyển đổi chuỗi ký tự đã bị encoding về lại trạng thái ban đầu. Quá trình này hoàn toàn khác với mã hóa - Encryption mà chúng ta vẫn hay lầm tưởng. 

Encoding và Decoding thường được xử dụng trong quá trình trao đổi thông tin và lưu trữ thông tin. Tuy nhiên trong trường hợp cần trao đổi những thông tin nhạy cảm, mang tính bảo mật cao thì encoding không được khuyến khích sử dụng.

*URL Encoding*

URLs chỉ có thể được gửi đi thông qua Internet bằng việc sử dụng bảng mã ASCII và cũng có những trường hợp khi URL chứa các ký tự đặc biệt ngoài các ký tự trong bảng mã ASCII, nó cần được mã hóa. URL không chứa dấu cách và được thay thế bằng dấu cộng (+) hoặc bằng %20.

*ASCII Encoding*

ASCII là viết tắt của American Standard Code for Information Interchange. Máy tính chỉ có thể hiểu được các con số, vì vậy bảng mã ASCII biểu diễn các ký tự dưới dạng các con số. Mục đích của những mã hiệu này là nhằm tiết kiệm phí tổn trong quá trình truyền tải data trên băng thông. 
Trình duyệt (phía máy khách) sẽ mã hóa đầu vào theo bộ ký tự được sử dụng trong trang web và bộ ký tự mặc định trong HTML5 là UTF-8. Bảng dưới đây hiển thị ký tự của bãng mã ASCII, các ký tự tương đương và biểu tượng thay thế có thể được sử dụng trong URL trước khi URL được gửi đến máy chủ.  

![](https://images.viblo.asia/081ff884-6111-409a-a574-3c35e6607db3.gif)

Ngoài ra bạn có thể tra cứu bảng mã ASCII ở [đây](https://vi.wikipedia.org/wiki/ASCII)

## What is Cryptography?
![](https://images.viblo.asia/3802002e-47fb-43fb-9496-7fcfc36fee75.jpg)

Thuật ngữ Cryptography đề cập tới một ngành khoa học nghiên cứu về mã hóa và giải mã thông tin; nghiên cứu các phương pháp, cách thức để chuyển đổi thông tin từ dạng “đọc-hiểu”(plaintext) sang dạng “đọc-nhưng-không-hiểu”(ciphertext) và ngược lại.

Dữ liệu có thể được đọc và hiểu mà không cần bất kỳ biện pháp đặc biệt nào được gọi là plaintext, trong khi phương pháp ngụy trang plaintext để che giấu thông tin thực sự của nó được gọi là **Encryption** - mã hóa.

Plaintext được mã hóa được gọi là văn bản mã hóa và quá trình hoàn nguyên dữ liệu được mã hóa trở lại văn bản thuần túy được gọi là **Decryption** - giải mã.

## How Encryption Works?
![](https://images.viblo.asia/77178882-9c59-4dc8-8e18-fc9b050a074c.png)

Một thuật toán mã hóa hoạt động kết hợp với một key (key có thể là một chuỗi các ký tự, các con số) để mã hóa văn bản và cùng một văn bản sẽ được mã hóa thành các phiên bản khác nhau với các khóa khác nhau. Vì vậy, dữ liệu được mã hóa hoàn toàn phụ thuộc vào các tham số, ví dụ như độ mạnh của thuật toán mã hóa và tính bảo mật của khóa.

Đầu tiên chúng ta buộc phải sử dụng SSL certificate và install nó trên webserver. Nếu SSL không được sử dụng thì dữ liệu không thể được mã hóa. Một khi certificate được cài đặt, cần phải cấu hình cho server cốt để các pages sẽ hoạt động trên HTTPS - giao thức bảo mật thay vì HTTP version - giao thức không bảo mật.

Dữ liệu được mã hóa thường gọi là ciphertext và dữ liệu thông thường không được mã hóa thì gọi là plaintext. Khi user gửi một đoạn plaintext lên server, plaintext sẽ được mã hóa thành ciphertext nhờ public-key. Gói tin được đảm bảo an toàn và thông tin đã hoàn toàn được mã hóa trên đường truyền (encryption message). Sau đó, private-key sẽ đảm nhận nhiệm vụ giải mã nội dung gói tin. 2 loại khóa này đều được tạo nên từ những dãy số ngẫu nhiên. Public-key sẽ được chia sẻ với mọi người, nhưng Private-key phải được giữ bí mật, nó sẽ nằm hoàn toàn ở người có quyền giải mã. 2 key này hoạt động với nhiệm vụ hoàn toàn khác nhau. Như vậy khi người gửi tin nhắn mã hóa dữ liệu bằng public-key, và người nhận sẽ tiến hành giải mã bằng private-key và ngược lại.

## Cryptography Techniques
### Symmetric Encryption

Mật mã thông thường, còn được gọi là mã hóa thông thường, là kỹ thuật trong đó chỉ có một khóa (một key) được sử dụng cho cả mã hóa và giải mã. Ví dụ: các thuật toán DES, Triple DES, MARS của IBM, RC2, RC4, RC5, RC6.
### Asymmetric Encryption

Là mật mã khóa công khai sử dụng một cặp khóa để mã hóa: khóa chung - public key để mã hóa dữ liệu và khóa riêng - private key để giải mã. Khóa công khai được công bố cho mọi người trong khi giữ bí mật khóa riêng. Ví dụ: RSA, Thuật toán chữ ký số (DSA), Elgamal.
### Hashing

Là phương thức mã hóa 1 chiều (ONE-WAY encryption). Thuật toán tạo ra output bị xáo trộn không thể đảo ngược hoặc ít nhất là không thể đảo ngược một cách dễ dàng. Ví dụ, thuật toán MD5. Nó được sử dụng để tạo Digital Certificates - Chứng thư số, Digital signatures - Chữ ký số, lưu trữ mật khẩu, xác minh thông tin liên lạc, v.v.

*References*: 

https://www.tutorialspoint.com/security_testing/cryptography_overview.htm

https://comodosslstore.com/blog/what-is-encryption-and-why-do-you-need-it.html