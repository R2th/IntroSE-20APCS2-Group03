# 1. Giới thiệu
Mình vừa tham gia 1 buổi seminar hướng dẫn về làm việc với ssh của 1 đồng nghiệp trong công ty. Thấy hay nên mình viết để lưu lại để tiện lấy ra dùng khi quên. Mong rằng giúp ích được j đó cho các bạn. 

**Khái niệm:**
SSH (Secure Shell) là một giao thức điều khiển từ xa cho phép người dùng kiểm soát và chỉnh sửa server từ xa qua Internet. 
Giao thức này giúp người dùng giao tiếp với server từ xa, và đảm bào rằng qúa trình giao tiếp này diễn ra trong tình trạng mã hóa, nhờ kỹ thuật cryptographic. 

Nó cung cấp thuật toán để chứng thực người dùng từ xa, chuyển input từ client (local) tới host (server) và gửi kết quả trả về tới client.

# 2. Sử dụng
## 2.1 Bài toán
Bài toán đặt ra là làm thế nào để thao tác với server từ local

## 2.2 Giải quyết
### 2.2.1 Config phía Local

**Bước 1:**  Tạo ssh key
```
ssh-keygen -f ssh_file_name
```
VD: ```ssh-keygen -f "id_rsa_local"```

Sau đó ấn enter tới khi hoàn tất
![](https://images.viblo.asia/1b46a950-e1de-4c23-8a3e-917bd20e7b5b.png)

Sau khi hoàn thành sẽ có 2 file trong thư mục `~/.ssh` :
+ **id_rsa_local** file ssh private. Ko đc cung cấp cho ng khác 
+ **id_rsa_local.pub** file này là file public (.pub). Dùng để đem đi add vào server hoặc đưa cho người ta thoải mái để họ add vào server

![](https://images.viblo.asia/145151e6-ba97-4a6d-89c3-6c489d2321d0.png)

**Note:** Mặc định khi k truyền `ssh_file_name` thì nó sẽ sinh ra ssh key với name là `id_rsa`

### 2.2.2 Config phía Server
Connect vào Server thông qua .pem file

**Bước 1:** Cài đặ ssh cho server bằng các lệnh sau

```
apt-get update
apt-install openssh-server
service ssh restart
```

**Bước 2:** Tạo .ssh folder
+ ```
    mkdir ~/.ssh
    ```
+ Tạo authorized_keys file trong ` ~/.ssh folder`
    ```
    touch ~/.ssh/authorized_keys
    ```
+ Cấp quyền read, write thư mục authorized_keys cho own user.
    ```
    chmod 600 ~/.ssh/authorized_keys
    ```

+ Thêm `ssh public key` ở phần 1 vào `~/.ssh/authorized_keys`
    + Lấy ssh public key phía Local: 
        ```
        cat ~/.ssh/irsa.pub
        ```
         Nhấn `ctrl + c` để

   + Thêm vào `~/.ssh/authorized_keys` phía Server:  
        ```
        nano ~/.ssh/authorized_keys
        ```
        Nhấn `ctrl + v` để paste vào file sau đó lưu lại.

### 2.2.3 Sử dụng
**Cú pháp:** ```ssh user@host```

Ví dụ: 
```
ssh user-ec2@11.111.22.333
```

**Note:** Dùng option `-i [ssh_path]` cho trường hợp chỉ định cụ thể file ssh. Vì ssh đó chưa khai báo trong config dưới local. mặc định thì nó sẽ lấy id_rsa

```
ssh user-ec2@11.111.22.333 -i ~/.ssh/id_rsa_local
```

## 2.3 Nâng cao 1 xíu
### 2.3.1 Bài toán 1
Khi bạn trải qua nhiều dự án, và phải connect với nhiều server thì việc nhớ user và ip của server từng dự án để ssh lên khi có vấn đề thì cũng khá là căng đúng ko nào?
### 2.3.2 Giải quyết - Tạo config shortcut
+ Mở file config ssh ~/.ssh/config
    ```
    nano ~/.ssh/config
    ```
+ Thêm config ssh cho HOST
    ```
    Host {name}
    HostName {IP or dom
    ain}
    IdentityFile {path_file_rsa_private}
    User {user_name}
    ```
    + `Host:` shortcut name để connect đến server(host).
    + `HostName:` IP or domain của server(host)
    + `IdentityFile:` path dẫn đến ssh file, file này phải là file ssh private mapping với  ssh public key mà mình đã add vào thư mục `~/.ssh/authorized_keys` trên server
    `User:` username có quyền ssh vào server

    Ví dụ:
    ```
    Host deploy_server_dev
      HostName 11.111.22.333
      IdentityFile ~/.ssh/id_rsa_learn_ssh_1
      User user-ec2
    ```
+ Sử dụng thôi :v 
    +   **Cú pháp:** ```ssh {shortcut_name}```
    + ssh tới server ip loằng ngoằng phía trên:  ``` ssh deploy_server_dev```

### 2.3.3 Bài toán 2
Bài toán tiếp theo là làm thế nào để sử dụng được nhiều account github trên 1 máy tính

Khi đi làm công ty, thông thường bạn sẽ tạo 1 github mới để phục vụ trong công việc trên cty. Và bạn cũng muốn sử dụng accoutn github cá nhân của mình nữa. 

### 2.3.4 Giải quyết - Config nhiều account github dưới local local
+ Config dưới local:
    ```
    #Default GitHub
    Host github.com
      HostName github.com
      User git
      IdentityFile ~/.ssh/id_rsa

    #compay github
    Host github-company
      HostName github.com
      User git
      IdentityFile ~/.ssh/id_rsa_company
     ```
 
 + Sử dụng:
     + Github cá nhân:  ```git@github.com:<user>/<repo>.git```
    + Github công ty:  ```git@github-company:<user>/<repo>.git```

# 3. Kết luận:
Tài liệu tham khảo chính là từ slide của bạn đồng nghiệp:
https://docs.google.com/presentation/d/1YNaakIQe53I40NOXpm_sgYzoVZeavb7BzdSaTgj5JuM/edit#slide=id.p