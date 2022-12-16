Một lập trình viên mới vào nghề hay mới sử dụng github gitlab với mỗi lần thao tác với repository như clone code, pull, push thì sẽ phải nhập tài khoản và mật khẩu để github xác thực, việc này lặp đi lặp lại rất mất thời gian, thật may là có giao thức SSH giúp chúng ta mỗi lần thao tác với kho lưu trữ chẳng cần cung cấp tên người dùng và mật khẩu nữa mà vẫn đảm bảo an toàn.

# Giới thiệu về SSH
## SSH là gì?
 SSH là một giao thức mạng dùng để thiết lập kết nối mạng được mã hoá đủ mạnh nhằm ngăn chặn các hiện tượng nghe trộm, đánh cắp thông tin trên đường truyền để tạo một kênh kết nối riêng tư giữa các máy khách máy chủ một cách bảo mật.
 
##  Cơ chế làm việc của SSH
SSH làm việc thông qua 3 bước đơn giản:
* Định danh host - xác định định danh của hệ thống tham gia phiên làm việc SSH.
* Mã hoá - thiết lập kênh làm việc mã hoá.
* Chứng thực - xác thực người sử dụng có quyền đăng nhập hệ thống.

Chi tiết cơ chế làm việc của SSH các bạn có thể tham khảo [tại đây ](https://vi.wikipedia.org/wiki/SSH) nhé 
## Các kỹ thuật mã hóa SSH
SSH có thể sử dụng 3 kỹ thuật mã hóa là
* SSH Symmetrical Encryption
* SSH Asymmetrical Encrytion
* SSH Hashing

Ở đây chúng ta sẽ tìm hiểu về kỹ thuật mã hóa Asymmetrical Encrytion

**Asymmetrical Encrytion** sử dụng 2 khóa khác nhau để mã hóa và giải mã. 2 khóa này được gọi là public key và private key. Cả 2 hình thành nên một cặp khóa là public-private key pair. Trong đó, khóa public sẽ được công khai cho tất cả các bên liên quan còn private key phải giữ bí mật để đảm bảo an toàn.

**Asymmetrical Encrytion** chỉ được sử dụng trong quá trình trao đổi thuật toán của khóa của symmetric encryption. trước khi bắt đầu một phiên giao dịch an toàn. Sau khi kết nối symmetrict an toàn đã được thiết lập, server sử dụng public key của client để tạo và challenge và truyền nó tới client để chứng thực. Nếu client có thể giải mã tin nhắn, có nghĩa là nó đang giữ đúng private key cần thiết cho kết nối.

## Kiểm tra những khóa hiện có trên ubuntu
Các khóa được lưu tại thư mục .ssh , vào thư mục đó sẽ thấy
![](https://images.viblo.asia/01a909d9-c390-48e4-92d6-9105f49dfd4b.png)

Ở đây ta thấy các khóa bí mật id_ed25519 và id_rsa, các khóa công khai có đuôi .pub là id_ed25519.pub và id_rsa.pub
# Tạo cặp khóa bí mật và công khai với email tài khoản GitHub
B1: Sử dụng lệnh `$ ssh-keygen -t ed25519 -C "your_email@example.com"`

![](https://images.viblo.asia/74dc7437-3c34-4137-9511-e9017eb8ecac.png)

B2: Tiếp theo sẽ hỏi chúng ta lưu cặp khóa này ở đâu gợi ý nhấn enter để lưu mặc định, nhưng lưu mặc định thì sẽ ghi đè lên cặp khóa có sẵn là id_ed25519, nên ta sẽ nhập đường dẫn đến file lưu trữ cặp khóa là (/home/nguyenthinh/.ssh/id_demo) với id_demo là tên file mình sẽ lưu khóa công khai và public mới sinh ra.

![](https://images.viblo.asia/62fdc673-f71a-4071-9444-6138fd3ee2f1.png)

B3: Nhập mật khẩu an toàn, phần này ta có thể để rỗng 

![](https://images.viblo.asia/ac9bae4e-951e-4596-982e-516fa4ef6a23.png)

B4: Vậy là đã tạo xong cặp khóa

![](https://images.viblo.asia/d734f34d-790c-4e51-9d3c-a36a6fd104f9.png)

B5: kiểm tra lại bằng lệnh `$ ls -l`

Thấy file id_demo (Khóa private) và id_demo.pub (khóa public)
![](https://images.viblo.asia/2c34660a-393a-4b82-947a-e8d86b8aeff4.png)

B6 Thêm SSH private key vào ssh-agent.
Việc thêm khóa SSH vào ssh-agent đảm bảo rằng khóa SSH của bạn có thêm một lớp bảo mật thông qua việc sử dụng cụm mật khẩu.

`$ eval "$(ssh-agent -s)"`

`$ ssh-add ~/.ssh/id_demo`

![](https://images.viblo.asia/4b1a5ee2-5d7d-4540-bac1-1e44d7db24cb.png)

B7: Copy khóa công khai sử dụng xclip để copy nội dung file

`$ xclip -selection clipboard < ~/.ssh/id_demo.pub`

![](https://images.viblo.asia/791d5860-4233-49b7-a5d6-02926c75fae0.png)

Giờ ta đã có khóa công khai rồi, chỉ cần add khóa đó vào tài khoản github nữa thôi

### Một số lỗi cần chú ý
* Một lỗi mà trước kia mình rất hay gặp phải là mình hay copy nhầm khóa public, có thể mình tạo khóa là id_demo như trên nhưng khi copy lại copy khóa id_ed25519
* Một lỗi nữa là mình tạo khóa mới rồi ghi đè vào khóa  cũ id_ed25519 và khóa cũ sau đó không dùng đươc nữa
* Lỗi quên thêm khóa vào ssh-agent ở B6
* ! Thường xuyên xem lại danh sách khóa SSH của mình và xóa bất kỳ khóa nào không hợp lệ hoặc đã bị xâm phạm.
* ! Không sử dụng khóa SSH của mình trong một năm thì GitHub sẽ tự động xóa khóa SSH không hoạt động của bạn như một biện pháp bảo mật.

# Thêm SSH key vào tài khoản GitHub
1. Đăng nhập vào tài khảo github, vào phần cài đặt > SSH and GPG keys

![](https://images.viblo.asia/0514fa76-9607-485b-b8a3-73f33577a2f1.png)

2. Chọn Add new Key để tạo key, nhập title và dán khóa công khai vừa copy vào

![](https://images.viblo.asia/a73ba1f5-d563-4cb1-b5f6-c1fc2641bdaa.png)

3. Nhập password để xác nhận

![](https://images.viblo.asia/bf1fef3d-86c7-4088-98ce-99087c177279.png)

4. Vậy là xong rồi, ta có thể clone, push, pull code bằng giao thức SSh để thuận tiện hơn, mỗi lần thao tác không cần nhập mật khẩu như giao thức https nữa.
![](https://images.viblo.asia/5f2bc302-dcbf-432f-8150-4aa48b3b0e7b.png)

### Cảm ơn và hẹn gặp lại các bạn ở bài viết sau nhé !