Sau một thời gian làm việc với Linux Server mình có một vài tips nhỏ có thể giúp server của các bạn được bảo mật tốt hơn

# Thay đổi port SSH
Nếu các bạn đã làm việc với Server thì chắc cũng đã biết qua thuật ngữ `SSH`

**SSH**, hoặc được gọi là **Secure Shell**, là một giao thức điều khiển từ xa cho phép người dùng kiểm soát và chỉnh sửa server từ xa qua Internet...(Ở đây mình chỉ giới thiệu định nghĩa cơ bản thôi)

Mặc định SSH sử dụng port `22/tcp` để người dùng có thể access, vì nó là mặc định nên mọi người đều biết vì vậy để tăng tính bảo mật chúng ta nên thay đổi nó.

### Mình sẽ hướng dẫn các bạn thay đổi port SSH

**1. Access vào server của bạn bằng user root (ssh root@your_ip)**

**2. Mở file `/etc/ssh/sshd_config` và tim dòng `Port 22` thay đổi nó thành port mong muốn (mình thích 6969)**
```bash
...
# What ports, IPs and protocols we listen for
Port 6969
# Use these options to restrict which interfaces/protocols sshd will bind to
#ListenAddress ::
#ListenAddress 0.0.0.0
...
```
**3. Restart SSH**

CentOS and Fedora bạn sử dụng lệnh này:
```bash
service sshd restart
```

Còn Debian and Ubuntu bạn sử dụng lệnh này:
```bash
service ssh restart
```

**4. Sử dụng FireWall để cho phép mở port**

Đối với Ubuntu bạn sử dụng lệnh này để mở port
```bash
sudo ufw allow 6969/tcp
```

# Không đăng nhập với user root

User **root** vẫn luôn là một vấn đề nhạy cảm trong bảo mật, nó là user có quyền tối cao nhất nên nếu để lộ thì rất nguy hiểm.
Để giải quyết  bạn hãy nên dùng một người dùng khác để truy cập và sau đó dùng lệnh `sudo -i` để chuyển đổi sang user **root**.

Mình lưu ý bạn rằng trong việc cấu hình bảo mật Server Linux với SSH, hãy để mật khẩu cho user root trước tiên. Bạn có thể yên tâm rằng nếu bạn có dùng SSH key và không cho phép đăng nhập thông qua mật khẩu thì khi chuyển sang user thì vẫn có thể sử dụng bình thường

Bước đầu tiên bạn hay tạo 1 user mới

```bash
useradd deploy
```

Tiếp đến là đặt mật khẩu

```bash
passwd deploy
```

Rồi kế tiếp đó là cấu hình không cho phép việc đăng nhập đối với user root, bạn hãy mở file `/etc/ssh/sshd_config` rồi sau đó tìm đến dòng

```bash
#PermitRootLogin yes
```

Sau đó sửa nó thành

```bash
PermitRootLogin no
```

Và cuối cùng là cài đặt chỉ cho phép user **deploy** đăng nhập vào SSH 

```bash
AllowUsers deploy
```

Kể từ giờ, bạn có thể đăng nhập vào SSH bằng người dùng **deploy**. Nếu bạn muốn đăng nhập vào user root thì bạn phải gõ lệnh `sudo -i` rồi nhập mật của user root để có thể chuyển sang user **root** nhé. 

# Giới hạn IP đăng nhập vào SSH
Các này không nên áp dụng nếu bạn sử dụng địa chỉ IP động
Đây là cách thứ 3 để cấu hình bảo mật cho Server Linux với SSH. 
Nếu bạn đang dùng 1 địa chỉ IP tĩnh thì nó rất tốt để có thể chống lại những đăng nhập trái phép. 
Chỉ cần đoạn mã sau vào `/etc/ssh/sshd_config` là xong:

```
ListenAddress 143.198.80.56
```

Như vây, chỉ những IP được cho phép ở trên mới có thể access vào server thông qua SSH.

Đó là 1 vài cách bảo mật server của bạn, chúc các bạn thành công!