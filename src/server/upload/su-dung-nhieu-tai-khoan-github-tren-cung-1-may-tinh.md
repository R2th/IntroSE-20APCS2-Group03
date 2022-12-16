Một ngày đẹp trời, khi Hưng đang ngồi viết những dòng code phiêu lưu trên dự án cá nhân của mình ở nhà thì sếp gọi điện nhờ sửa gấp tính năng này để chuẩn bị release. Thế là Hưng phải clone git trên github của công ty về để ngồi sửa. Tuy nhiên mọi việc đâu có dễ dàng thế, dự án cần bảo mật  nên để chế độ private và Hưng phải dùng tài khoản github công ty thì mới có thể clone được. Mà bạn đang sử dụng git trên máy cá nhân của mình nên git đang cấu hình tài khoản cá nhân nên clone mãi mà vẫn bị báo "không thể clone được". Bug cần phải fix gấp mà giờ không thể clone dự án về phải làm sao phải làm sao bây giờ ? Đừng lo, đã có "Doctor strange" đem bài viết này đến giải cứu Hưng đây. Cùng theo dõi bài viết này để xem nó cứu nguy cho Hưng như thế nào nhé 

### Các bước để sử dụng nhiều tài khoản trên cùng 1 máy tính.

#### 1. Cấu hình SSH key cho tài khoản github.

Để có thể sử dụng được nhiều tài khoản github trên 1 máy ta phải clone qua SSH thay vì HTTPS. Để có thể clone được ta cần phải cấu hình nó trước cái đã.

##### * Tạo ra 2 ssh key khác nhau
Tạo ssh key:

Mở cmd lên (đối với Windows) hoặc terminal (đối với Linux) và gõ lệnh

*`# ssh-keygen -b 4096`*

Màn hình sẽ hiển thị ra mục lựa chon đường dẫn chứa private ssh key. 

```
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\Admin\.ssh\id_rsa):
```

Chọn đường dẫn của file muốn lưu private key ⇒ sau khi chọn xong 1 puclic key sẽ được tạo ra cùng đường dẫn với private key. 

 Sau khi chọn xong màn hình sẽ hiện lên như sau

```
Your identification has been saved in C:\Users\Admin\.ssh\id_rsa.
Your public key has been saved in C:\Users\Admin\.ssh\id_rsa.pub.
The key fingerprint is:
SHA256:MRk+Y0zCOoOkferhkTvMpcMsYspj212lK7sEauNap user@hostname
The key's randomart image is:
+---[RSA 4096]----+
|     .. o        |
|    . .= o       |
|   o o  X        |
|. . . .          |
|. .=.o .S.       |
| =o.o.  .   .    |
|o +   .  . o ..  |
|.. .  .   oEoo . |
|o.        .o+oo  |
+----[SHA256]-----+
```

Như vậy là tạo xong 1 ssh key. 

- Làm tương tự với ssh key thứ 2. Lưu ý khác đường dẫn với private key 1.

***Để xem thư mục chứa file key:***

```
C:\Users\Admin\.ssh>dir
Volume in drive C has no label.
Volume Serial Number is 28F5-B7F8

Directory of C:\Users\Admin\.ssh

10/28/2021  03:50 AM    <DIR>          .
10/28/2021  03:50 AM    <DIR>          ..
10/26/2021  07:53 PM               227 config
10/26/2021  07:32 PM             3,389 id_rsa
10/26/2021  07:32 PM               749 id_rsa.pub
10/26/2021  07:40 PM             3,401 id_rsa2
10/26/2021  07:40 PM               755 id_rsa2.pub
10/28/2021  03:50 AM             2,602 id_rsa_vu1
10/28/2021  03:50 AM               572 id_rsa_vu1.pub
10/28/2021  03:50 AM             2,602 id_rsa_vu2
10/28/2021  03:50 AM               572 id_rsa_vu2.pub
12/13/2021  07:53 PM               589 known_hosts
10 File(s)         15,458 bytes
2 Dir(s)  21,574,406,144 bytes free
```

***Để xem public key:***

```
# type C:\Users\Admin\.ssh\id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8teh2NJ42qYZV98gTNhumO1b6rMYIkAfRVazl
k6dSS3xf2MXJ4YHsDacdjtJ+evXCFBy/IWgdkFtcvsGAMZ2N1RdvhDyQYcy6NDaJCBYw1K6Gv5fJ
SHCiFXvMF0MRRUSMneYlidxUJg9eDvdygny4xOdC6c1JrPrSgOc2nQuKeMpOoOWLINIswg1IIFVk
kFMPrFivP8Z6tidzVpAtbr1sXmJGZazYWrU3FoK2a1sF1zEWrmlMOzX81zEWrmlMOzX8CpZW8Rae
i4ANmLy7NULWK36yU0Rp9bFJ4o0/4PTkZiDCsK0QyHhAJXdLN7ZHpfJtHIPCnexmwIMLfIhCWhO5
 user@hostname
```

Trong đó *C:\Users\Admin\.ssh\id_rsa.pub* là đường dẫn của public key


### 2. Lần lượt link public key với github

- Truy cập vào github
- Lựa chọn settings

![Untitled.png](https://images.viblo.asia/d47c60bd-2284-4c6f-9624-94904ff0d091.png)

- Lựa chọn SSH and GPG Keys

![Untitled (1).png](https://images.viblo.asia/7328d305-fd51-465f-978e-81f3ef00ba41.png)

- Chọn New SSH Key

![Untitled (2).png](https://images.viblo.asia/8d629f1b-d44e-45c1-870f-4fc7517158f9.png)

Sau đó nhập title và key: 

- Title: Chọn tùy ý
- Key:
    
    Copy 1 public key trong máy và add vào 
    
    ```
    # type C:\Users\Admin\.ssh\id_rsa.pub
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8teh2NJ42qYZV98gTNhumO1b6rMYIkAfRVazl
    k6dSS3xf2MXJ4YHsDacdjtJ+evXCFBy/IWgdkFtcvsGAMZ2N1RdvhDyQYcy6NDaJCBYw1K6Gv5fJ
    SHCiFXvMF0MRRUSMneYlidxUJg9eDvdygny4xOdC6c1JrPrSgOc2nQuKeMpOoOWLINIswg1IIFVk
    kFMPrFivP8Z6tidzVpAtbr1sXmJGZazYWrU3FoK2a1sF1zEWrmlMOzX81zEWrmlMOzX8CpZW8Rae
    i4ANmLy7NULWK36yU0Rp9bFJ4o0/4PTkZiDCsK0QyHhAJXdLN7ZHpfJtHIPCnexmwIMLfIhCWhO5
     user@hostname
    ```
    
- Sau đó nhấn Add SSH Key

### 3. Chỉnh sửa config 

Truy cập vào đường dẫn  **C:\Users\Admin\.ssh** và chỉnh sửa file config bằng notepad (Nếu chưa có thì tạo mới file đó)



- Chỉnh sửa file config với nội dung sau
    
![Untitled (3).png](https://images.viblo.asia/c7fd78cb-2644-4d46-863c-f427a6334908.png)
    
    ```
    Host github-personal.com
            Hostname github.com
            User git
            IdentityFile C:\Users\Admin\.ssh\id_rsa
            IdentitiesOnly yes
    Host github-work.com
            HostName github.com
            User git  
            IdentityFile C:\Users\Admin\.ssh\id_rsa2
            IdentitiesOnly yes
    ```

*Lưu ý:* Những chỗ bôi đỏ có thể chỉnh sửa tùy ý cho phù hợp

**Host**: tên của host sử dụng khi clone (có thể đặt tùy ý)

**IndentityFile**: Đường dẫn của file private key ứng với file public key vừa thêm ở github ứng với từng github user.

### 4. Clone github ứng với user muốn sử dụng

Ví dụ ở đây t muốn clone với tài khoản jirachi1999 (Tài khoản cá nhân của tôi) ứng với host [github-personal.com](http://github-personal.com) mà tôi vừa config ở trên 

![Untitled (4).png](https://images.viblo.asia/45eb4219-4a92-4a36-8cc1-293740ab733a.png)

Chọn clone với ssh 

![Untitled (5).png](https://images.viblo.asia/70f7da38-2562-4fa9-bfca-50bd3b006d0a.png)

Lưu ý đổi [github.com](http://github.com) thành host tương ứng ở file config 

![Untitled (6).png](https://images.viblo.asia/48ceabff-c0da-4899-9002-e95977e36063.png)

Như vậy là xong rồi giờ thì Hưng có thể fix bug thỏa thích mà không sợ nhầm tài khoản nữa rồi.