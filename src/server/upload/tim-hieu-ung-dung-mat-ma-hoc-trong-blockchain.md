# I. Giới thiệu
## 1. Tiền ảo
Định nghĩa: Là một loại tài sản kỹ thuật số, làm trung gian trao đổi, được sử dụng mật mã để đảm bảo các giao dịch.

Đặc điểm:
- Loại bỏ vai trò người trung gian
- Tạo ra một mạng lưới ngang hàng gồm các nút (node)
## 2. Bitcoin
Bitcoin được công bố vào năm 2008 và ra mắt lần đầu vào năm 2009 bởi Shatoshi Nakamoto

Đặc điểm:
+ Phi tập trung
+ Chống kiểm duyệt
+ An toàn
+ Không biên giới. 
## 3. Blockchain
Định nghĩa: Là một chuỗi các khối có chứa thông tin được bảo mật bởi mã hóa.

Cấu trúc của blockchain:

![](https://images.viblo.asia/0c561502-a88a-4d47-aac4-651d19d62b07.png)

Kí hiệu: 
+ Xanh lam: khối gốc genesis block
+ Đen: các block nhánh chính (được chấp nhận)
+ Tím: block bị thay đổi (bị loại bỏ)

Cấu trúc một khối (block) trong bitcoin

![](https://images.viblo.asia/0964828f-6179-4060-af11-f5ca3dd6d4f5.png)

Đặc điểm:
- Tính độc lập và mở rộng
- Tính bất biến
- Tính phân tán

Sự bảo mật của blockchain: Phụ thuộc nhiều vào mã hóa đặc biệt là hàm băm, chữ ký số…

Ưu điểm
- Ưu điểm từ các đặc điểm của blockchain như tính phân tán, tính bất biến
- An toàn khi càng có nhiều người dùng

Nhược điểm
- Tấn công 51%
- Khó khăn trong việc sửa đổi dữ liệu
- Vấn đề về chìa khóa cá nhân
- Tính cạnh tranh cao
# II. Giao dịch tiền ảo
Các giao dịch tiền ảo hoạt động dựa trên nguyên lý mật mã khoá công khai cùng với phương pháp “đào”

Trong giao dịch, ta sử dụng mã hóa công khai để xác thực giao dịch. Mã hóa công khai gồm Khoá công khai và khoá riêng . Khóa công khai có thể được công bố rộng rãi, nhưng khóa riêng chỉ chủ sở hữu của nó mới biết. Các khóa luôn được tạo thành một cặp tương ứng

Phương pháp đào bản chất là thêm các khối (block) mới vào chuỗi blockchain thông qua bài toán và phần thưởng

Ví dụ về 1 giao dịch: Alice gửi trả Bob 2 bitcoin

![](https://images.viblo.asia/c5e3b9b6-ead6-4593-85b4-03575e4a9d82.png)

Alice cần lấy private – key kết nối ví, từ private-key với thông điệp sẽ tạo thành chữ ký số 

Chữ ký số cùng với địa chỉ của Bob , khóa công khai của Alice, số lượng bitcoin sẽ tạo thành 1 thông điệp được mã hóa. Thông điệp này được “broadcast" đến tất cả các node => Các node sẽ giải mã thông điệp để được nội dung giao dịch.

![](https://images.viblo.asia/c23d257c-7f57-4352-8954-6226229ac3f2.png)

Các node xác nhận thông điệp và nhận được 1 khối băm từ thông điệp trên.

-> Bài toán đặt ra cho thợ đào: Khối thêm vào phải chứa mã hash của khối trước cộng với data và mã hash của khối mới phải chứa 1 số lượng bit 0 đủ lớn

Ví dụ: input có thể  là: 00000d3ae2ac43b66283cf0c89636….

Khối dữ liệu sẽ được thêm vào số nonce. Các thợ mỏ phải tìm ra số nonce để thỏa mãn input

![](https://images.viblo.asia/2729772e-4c92-4740-8c2f-45c3b37bfdeb.png)

# III. Hàm băm
Định nghĩa: là giải thuật nhằm sinh ra các giá trị băm tương ứng với mỗi khối dữ liệu 

Tính chất: Một hàm băm H(x) thỏa mãn các điều kiện sau:
- H có thể áp dụng cho các thông điệp x với các độ dài khác nhau
- Kích thước của output h = H(x) là cố định và nhỏ
- Tính một chiều: với một h cho trước, không thể tìm lại được x sao cho h = H(x) (về mặt thời gian tính toán)
- Tính chống trùng yếu: cho trước một x, không thể tìm y≠ x sao cho H(x) = H(y)
- Tính chống trùng mạnh: không thể tìm ra cặp x, y bất kỳ (x≠y) sao cho H(x) = H(y), hay nói cách khác nếu H(x) = H(y) thì có thể chắc chắn rằng x = y.

# IV. Mã hóa khóa công khai
Mật mã khóa công khai là một yếu tố cơ bản của công nghệ blockchain - nó là công nghệ cơ bản cho ví và giao dịch.

Khi người dùng tạo ví trên blockchain, họ đang tạo cặp khóa công khai-riêng tư. 

 Địa chỉ của ví là một chuỗi được tạo ra từ khóa công khai. Địa chỉ này được công khai cho tất cả mọi người và có thể được sử dụng để kiểm tra số dư trong ví đó hoặc gửi tiền vào đó. 
 
Khóa cá nhân được liên kết với ví là cách chứng minh quyền sở hữu và kiểm soát ví. Đó là cách duy nhất để gửi tiền ra khỏi nó và một khóa cá nhân bị mất có nghĩa là số tiền bên trong sẽ bị mắc kẹt ở đó mãi mãi.

Ví dụ
![](https://images.viblo.asia/a6aa2590-5bb4-47f8-9776-5a4b3f69fa79.png)

Giả sử Alice muốn gửi một tin nhắn được mã hóa cho Bob:

Alice sử dụng khóa công khai của Bob để mã hóa tin nhắn.

Alice gửi tin nhắn được mã hóa cho Bob - nếu bên thứ ba chặn nó, tất cả những gì họ sẽ thấy là các số và chữ cái ngẫu nhiên.

Bob sử dụng khóa riêng của mình để giải mã và đọc tin nhắn

# V. Kết luận 
Trên đây là 1 số tìm hiểu mà mình muốn chia sẻ dành cho những bạn mới bắt đầu tìm hiểu về mã hóa hay blockchain. Chúc các bạn một ngày làm việc thật hiệu quả và vui vẻ!