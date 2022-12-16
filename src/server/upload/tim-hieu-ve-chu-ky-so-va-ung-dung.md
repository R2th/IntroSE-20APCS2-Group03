# I. Giới thiệu
## Một số khái niệm:

Chữ kí số (Digital Signature) là những thông tin đi kèm với dữ liệu nhằm xác định chủ của người gởi nó

Chữ ký số bao gồm 3 thành phần:

* Thuật toán tạo ra Khóa .

* Hàm tạo chữ ký là hàm tính toán chữ ký trên cơ sở khóa mật và dữ liệu cần ký.

* Hàm kiểm tra chữ ký là hàm kiểm tra xem chữ ký đã cho có đúng với khóa công cộng không. (Khóa này mọi người có quyền truy cập cho nên mọi người đều có thể kiểm tra được chữ ký)	

## Hàm băm (Hash Funtion) 
Là hàm toán học chuyển đổi thông điệp (message) có độ dài bất kỳ (hữu hạn) thành một dãy bít có độ dài cố định (tùy thuộc vào thuật toán băm). Dãy bít này được gọi là thông điệp rút gọn (message disgest) hay giá trị băm (hash value), đại diện cho thông điệp ban đầu.

Hàm băm SHA-1: Thuật toán SHA-1 nhận thông điệp ở đầu vào có chiều dài k<264 bit, thực hiện xử lý và đưa ra thông điệp thu gọn (message digest) có chiều dài cố định 160 bits. Quá trình tính toán cũng thực hiện theo từng khối 512bits, nhưng bộ đệm xử lý dùng 5 thanh ghi 32-bits. Thuật toán này chạy tốt với các bộ vi xử lý có cấu trúc 32 bits.
# II. Nội dung

## A. Kiến trúc chữ ký số tổng quát
![](https://images.viblo.asia/87d19bc5-33d1-4fd9-a17f-808f7c156e5d.png)

### 1. Quá trình ký (bên gửi)

Tính toán chuỗi đại diện (message digest/ hash value) của thông điệp sử dụng một giải thuật băm (Hashing algorithm)

Chuỗi đại diện được ký sử dụng khóa riêng (Private key) của người gửi và 1 giải thuật tạo chữ ký (Signature/ Encryption algorithm). Kết quả chữ ký số (Digital signature) của thông điệp hay còn gọi là chuỗi đại diện được mã hóa (Encryted message digest)

Thông điệp ban đầu (message) được ghép với chữ ký số( Digital signature) tạo thành thông điệp đã được ký (Signed message)

Thông điệp đã được ký (Signed message) được gửi cho người nhận

### 2. Quá trình kiểm tra chữ ký(bên nhận)

Tách chữ ký số và thông điệp gốc khỏi thông điệp đã ký để xử lý riêng;

Tính toán chuỗi đại diện MD1 (message digest) của thông điệp gốc sử dụng giải thuật băm (là giải thuật sử dụng trong quá trình ký)

Sử dụng khóa công khai (Public key) của người gửi để giải mã chữ ký số -> chuỗi đại diện thông điệp MD2 

So sánh MD1 và MD2:

* Nếu MD1 =MD2 -> chữ ký kiểm tra thành công. Thông điệp đảm bảo tính toàn vẹn và thực sự xuất phát từ người gửi (do khóa công khai được chứng thực).
* Nếu MD1 <>MD2 -> chữ ký không hợp lệ. Thông điệp có thể đã bị sửa đổi hoặc không thực sự xuất phát từ người gửi.

### 3. Nhược điểm

Bởi vì tài liệu cần ký thường có chiều dài khá dài. Một biện pháp để ký là chia tài liệu ra các đoạn nhỏ và sau đó ký lên từng đoạn và ghép lại. 

Nhưng phương pháp có nhược điểm là chữ ký lớn, thứ hai là ký chậm vì hàm ký là các hàm mũ, thứ ba là chữ ký có thể bị đảo loạn các vị trí không đảm tính nguyên vẹn của tài liệu. 

Chính vì điều đó mà khi ký thì người ta ký lên giá trị hàm hash của tài liệu, vì giá trị của hàm hash luôn cho chiều dài xác định

### 5. Chức năng

Xác thực được nguồn gốc tài liệu : Tùy thuộc vào từng bản tin mà có thể thêm các thông tin nhận dạng, như tên tác giả, thời gian…vv.

Tính toàn vẹn tài liệu: Vì khi có một sự thay bất kỳ vô tình hay cố ý lên bức điện thì gía trị hàm hash sẽ bị thay đổi và kết quả kiểm tra bức điện sẽ không đúng.

Chống từ chối bức điện: Vì chỉ có chủ của bức điện mới có khóa mật để ký bức điện

### 6. Nguy cơ

Tội phạm có thể giả mạo chữ ký tương ứng với văn bản đã chọn.

Tội phạm thử chọn bức điện mà tương ứng với chữ ký đã cho.

Tội phạm có thể ăn trộm khóa mật và có thể ký bất kỳ một bức điện nào nó muốn giống như chủ của khóa mật.

Tội phạm có thể giả mạo ông chủ ký một bức điện nào đó.

Tội phạm có thể đổi khóa công cộng bởi khóa của mình.

## B. Sơ đồ chữ ký số RSA
![](https://images.viblo.asia/e90cd162-dc20-4381-9a28-070f5b19e46a.png)

> Cụ thể hơn
![](https://images.viblo.asia/db67d559-5a0f-47fd-b1ef-26e19892d50a.png)

> Thẩm định chữ ký số RSA
![](https://images.viblo.asia/10a15208-6db8-49ee-96cb-a2e1f5126452.png)
## C. Ứng dụng chữ ký số sử dụng thuật toán RSA
Sử dụng trong việc đảm bảo vẹn toàn dữ liệu: Chữ ký các công ty, website, công văn, file, tệp tin  của người gửi qua môi trường Internet của các cá nhân , cơ quan tổ chức ….