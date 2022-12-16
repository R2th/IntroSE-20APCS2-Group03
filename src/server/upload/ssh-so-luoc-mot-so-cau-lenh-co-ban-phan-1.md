***Khi sử dụng một hệ điều hành – Windows, MacOS, đặc biệt là các hệ điều hành dựa trên nhân Linux như Ubuntu, CentOS,… bạn chắc hẳn đã từng sử dụng terminal để gõ các dòng lệnh cực kỳ ngầu lòi. Tới một ngày, bạn có một con server vừa mua nằm cách xa tận nửa vòng trái đất, làm thế nào bạn có thể truy cập tới và thực thi các câu lệnh, cài đặt các dịch vụ, cấu hình web server,…? Kèm theo đó là việc đảm bảo một kết nối thật an toàn ? SSH chính là thứ mà bạn đang tìm kiếm.***
# 1. Sơ lược
**Secure Shell (SSH)** là một giao thức mạng dùng để thiết lập kết nối mạng bảo mật. SSH tạo ra một kênh kết nối được mã hóa an toàn từ một mạng không an toàn, dựa trên kiến trúc client-server, kết nối 1 SSH-client tới một SSH-server. Port mặc định đuợc sử dụng bởi SSH là 22.

Hay nói đơn giản, SSH giúp bạn có thể yên tâm truy cập tới một máy tính từ xa nhờ vào tính bảo mật của nó !

SSH ra đời như một sự thay thế cho Telnet và các giao thức điều khiển shell thiếu an toàn khác như Berkeley rsh, rlogin và rexec . Các giao thức này trao đổi dữ liệu, mật khẩu dưới dạng plaintext, khiến chúng rất dễ bị phân tích và đánh cắp.

Điểm đặc biệt của SSH là giao thức này sử dụng các thuật toán mã hóa bất đối xứng, đối xứng và hashing để đảm bảo tính bảo mật và toàn vẹn của dữ liệu được trao đổi từ client tới server và ngược lại.

SSH có nhiều cách để xác thực một người dùng, nhưng hai cách thông dụng nhất vẫn là xác thực dựa trên mật khẩu và xác thực public-key.

*Xác thực bằng mật khẩu ?*

Xác thực dựa trên mật khẩu đơn giản là bạn chỉ việc sử dụng mật khẩu của user bạn tạo để truy cập, server sẽ lưu chúng, và đối chiếu với mật khẩu của bạn khi đăng nhập. Cách này thì không đủ an toàn do bạn có khả năng bị đánh cắp mật khẩu.

*Còn xác thực bằng public-key?*

Cách này sử dụng một cặp khóa – public-key và private-key – được tạo ra dựa trên thuật toán mã hóa public-key. Cặp khóa sau khi được tạo ra từ một máy tính, ta sẽ lấy public-key lưu vào server, khi truy cập ta sẽ dựa vào private-key lưu trên máy local và đặc tính liên quan mật thiết tới nhau của chúng để thiết lập kết nối. Kiểu xác thực này còn cho cho phép chúng ta thiết lập một kết nối an toàn một cách tự động hóa (automation).

![](https://images.viblo.asia/96eef51b-cce4-46d7-b019-3befd1c171ef.png)

*Vậy thì nó hơn xác thực với mật khẩu chỗ nào ?*

Quay lại khi bạn sử dụng mật khẩu, bản năng loài người của bạn trỗi dậy, trí nhớ của chúng ta là có hạn, và bạn sẽ nghĩ ra một mật khẩu sao cho dễ ghi nhớ. Và mật khẩu dễ nhớ thì khả năng cao là bạn sẽ bị đánh cắp bằng một cách nào đó (Brute-force attack, Dictionary attack,… ).

Không những vậy, mật khẩu này còn được bạn sử dụng xuyên suốt từ app này sang app khác ! Nó còn được lưu trên cả server bạn login vào, nên vẫn có thể bị đánh cắp (Man-in-the-middle attack,…). Và rất rất nhiều trường hợp cho thấy việc sử dụng mật khẩu là thiếu an toàn như thế nào.

Còn cặp khóa xác thực thì khác, chúng được tạo ra bởi máy tính - không như chúng ta - máy tính sử dụng các thuật toán mã hóa cực kì phức tạp, vượt xa khả năng của con người. Bản thân các khóa này thì lại vừa dài (vài trăm, vài nghìn bits), vừa to… à không, vừa phức tạp và rất khó để brute-force attack. Hơn nữa, private-key mà bạn giữ không hề được gửi tới server mà bạn chỉ dùng nó để decrypt message được mã hóa từ server gửi về.

Mật khẩu có thể được sử dụng trên nhiều máy khác nhau và do bạn tự lưu trữ, còn private-key thì chỉ được lưu trên thiết bị mà bạn dùng để truy cập, dó đó bạn có thể sử dụng nhiều cặp khóa public-key private-key để truy cập vào các máy tính khác nhau, làm giảm khả năng bị đánh cắp khóa.

Ngoài ra, bạn còn có thể sử dụng thêm passphrase để tăng thêm độ bảo mật !

### 1.1 Các loại thuật toán mã hóa
SSH hỗ trợ nhiều loại thuật toán mã hóa public-key:

***rsa*** – thuật toán được sử dụng nhiều nhất, ra đời từ năm 1977 dựa trên sự phức tạp của việc phân tích thừa số nguyên tố. Khi sử dụng nên kèm theo kích thước của khóa ít nhất là 2048 bits, tốt nhất nên là 4096 bits.

***dsa*** -thuật toán dựa trên tính phức tạp của việc tính toán logarit rời rạc. Đã bị loại bỏ ở OpenSSH version 7 vì lý do bảo mật.

***ecdsa*** – thuật toán dựa trên toạ độ của các điểm dựa trên đường cong Elliptic. Có thể thay thế cho RSA bởi mức an toàn và tốc độ xử lý cao hơn, kèm theo đó là việc sử dụng khoá có độ dài nhỏ hơn so với RSA. Từ đó làm tăng tốc độ xử lý một cách đáng kể. Chỉ hỗ trợ với 3 loại kích thước khóa: 256, 384, and 521 bits. Để an toàn nhất thì nên sử dụng 521 bits !

***ed25519*** – một thuật toán được thêm vào OpenSSH từ version 6.5. Là bản cải tiến của ECDSA, cung cấp bảo khả năng mật tốt hơn với hiệu suất nhanh hơn so với DSA hoặc ECDSA. Chưa thực sự phổ cập trên toàn thế giới.
## 2. Các câu lệnh cơ bản
*Lưu ý: Các câu lệnh ta sẽ thực hành trên máy tính cài hệ điều hành Linux (Ubuntu, CentOS,…).*

Sau đây, chúng ta sẽ đi vào chi tiết những câu lệnh sẽ sử dụng để kết nối với một server từ xa.

### 2.1. Sử dụng SSH để login với password

Trên máy local của bạn:
```
ssh your-username@host
```

Ví dụ:
```
ssh bob@34.56.78.90
```

Host ở đây có thể là địa chỉ ip hoặc domain name của máy mà bạn truy cập tới

Sau đó nhập mật khẩu tương ứng với user của bạn ở host đó.

### 2.2. Tạo cặp khóa
Câu lệnh để tạo ra một cặp khóa xác thực SSH.

Câu lệnh đơn giản nhất, trên máy local:

```
ssh-keygen
```
Trong lúc generate, hệ thống sẽ yêu cầu bạn cung cấp passphrase. Mục đích sinh ra passphrase là để encrypt private key. Vậy khi một kẻ tấn công biết được private key của bạn cũng chưa chắc có thể sử dụng, vì nó đã bị mã hóa.

Trong thực tế, hầu hết khi tạo khóa SSH người ta thường không sử dụng thêm passphrase. Vì khi gặp vấn đề liên quan tới automation, passphrase này đâu thể đánh bằng tay mà ta phải lưu trong một kho lưu trữ hoặc là trong một đoạn script nào đó. Kết quả là bạn lại quay về xác thực bằng mật khẩu (lol !), kẻ tấn công vẫn có thể biết được passphrase của bạn !

Vậy nên để dễ dàng và thuận tiện bạn cứ nhấn Enter khi tới bước này là được !

Bạn có thể tùy chỉnh thêm các options:

```
ssh-keygen -f ~/key-name -t ecdsa -b 521
```
Trong đó:

> -f là key name và nơi sẽ lưu trữ key
> 
> -t là thuật toán mã hóa để sinh khóa
> 
> -b là kích thước khóa

### 2.3. Thêm private-key vào SSH-agent
Trên máy local:

```
ssh-add /PATH/TO/YOUR/PRIVATE/KEY
```
ssh-add là câu lệnh để thêm SSH private-keys vào SSH authentication agent, gọi là ssh-agent để quản lý việc truy cập vào các máy tính sử dụng các khóa private. Khi bạn đã thêm khóa vào ssh-agent thì lúc truy cập bạn không cần phải khai báo thêm khóa này.

Phần public của khóa private được lưu vào ssh-agent phải được đặt trong

*~/.ssh/authorizedkeys* (authorized_keys là một file)

ở server (Xem bước bên dưới).

### 2.4. Thêm public-key vào server
Bạn có thể sử dụng một trong hai câu lệnh sau:

Cách 1:

```
cat ~/.ssh/your-key.pub | ssh username@host "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys"
```
Cách 2:

```
ssh-copy-id -i ~/.ssh/your-key.pub username@host
```
Ngoài ra bạn có thể truy cập trực tiếp vào máy bằng password trước và sau đó thêm key bằng cơm (mkdir, touch, rồi sau đó cat, vim…).

Vậy là bạn đã có thể truy cập vào server thành công sử dụng xác thực khóa trên SSH !

Bạn có cũng thể thêm nhiều key khác nhau vào authorized_keys sử dụng các câu lệnh tương tự như trên.

Test nào:

```
ssh your-username@host
```
### 2.5. Loại bỏ xác thực bằng mật khẩu trên server (Chỉ sử dụng SSH keys)
*Lưu ý: Chỉ làm bước này sau khi bạn đã cấu hình và thực hiện ssh bằng khóa.*

Để tốt nhất và an toàn nhất thì sau khi thêm key vào server, bạn nên loại bỏ xác thực SSH bằng mật khẩu. Lý do thì tôi đã đề cập như trên !

Trên server:

```
sudo nano /etc/ssh/sshd_config
```
Tìm dòng

> PasswordAuthentication yes

Sửa lại thành

> PasswordAuthentication no

Lưu lại và exit. Sau đó trên terminal:

```
sudo systemctl restart sshd
```

### 2.6. Không cho phép xác thực bằng root user

Lý do là bởi, root user có toàn quyền truy cập vào toàn bộ hệ thống máy tính, khi bị tấn công sẽ gây ra thiệt hại lớn hơn so với user thông thường - chỉ có quyền thao tác với các tập tin của user đó. Thêm nữa, kẻ tấn công phải biết mật khẩu của bạn để có thể thực thi các đặc quyền nâng cao.

```
sudo nano /etc/ssh/sshd_config
```
Tìm dòng

> PermitRootLogin yes

Sửa lại thành

> PermitRootLogin no

Khởi động lại sshd (Secure Shell Daemon) service

```
sudo systemctl restart sshd
```

## 3. Kết
Vậy là ta đã đi qua sơ lược về SSH và các câu lệnh cơ bản để thiết lập kết nối giữa hai máy tính. Ở phần sau tôi sẽ đưa ra một vài ví dụ thực tế để bạn có cái nhìn rõ hơn về nó. Cảm ơn các bạn đã theo dõi ! Ghé thăm [Sirdev](http://sirdev.codes) để có thể theo dõi phần tiếp theo sớm nhất !