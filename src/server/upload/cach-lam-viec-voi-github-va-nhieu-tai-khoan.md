# Giới thiệu
Hiện nay việc sử dụng  **GIT** trong việc quản lý version source code chiếm hết 99% nên nếu là một lập trình viên chắc hẳn các bạn không thể không biết về GIT. 

Mình xin nhắc lại một vài kiến thức cơ bản về **GIT** và  **GITHUB** . **GIT** là một công cụ quản lý source code, branch của GIT giúp chúng ta có thể rẻ nhiều nhánh để có thể phát triển nhiều task một lần nhưng cũng không bị mất code hay không đồng bộ code. Ở đó sẽ có 1 branch làm chính (là nơi chứa code chuẩn nhất đồng thời đầy đủ nhất) và có nhiều branch (các task đang thực hiện) sẽ được rẻ nhánh từ đó. Còn **GITHUB** đơn giản là một server quản lý phiên bản của các repositories, bên cạnh **GITHUB** còn **BitBucket** . 

Để xác thực tài khoản trong GITHUB chúng ta có các cách cơ bản sau:

+ **Cách 1:**  Xác thực tự động với **.netrc**

    Hãy tạo một file với đường dẫn   **~/.netrc**   có nội dung như sau:
    ![](https://images.viblo.asia/f15c7ffe-b7ee-4d85-90f9-cd1526a3d79b.PNG)
    
    **NOTE:**  Cách này chỉ sử dụng cho Linux, Mac và không dùng cho Window.
+ **Cách 2:**  Sử dụng SSH
    - Tạo ssh Key: 
   `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
   - `> Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]` Ở đây nếu bạn không chỉ định tên file thì ssh key sẽ được lưu ở file có name `id_rsa`
   - Nếu bạn muốn add ssh key vào **ssh-agent** để quản lý thì bạn hãy check key đó đã tồn tại chưa. Muc đích sử dụng ssh-agent để bạn có thể access vào nhiều môi trường server và dùng chính ssh key của mình để làm việc với GITHUB tránh việc đăng nhập nhiều lần.
   
       ` eval $(ssh-agent -s`
       
       `ssh-add ~/.ssh/id_rsa`
       
   - Rồi sau đó bạn add SSH key của mình vào **GITHUB** [tham khảo tại đây](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account)
  

> Nội dung ở trên là mình đang hướng dẫn các bạn sử dụng 1 tài khoản vậy có nhiều tài khoản thì phải như thế nào? Chúng ta cùng tìm hiểu tiếp nhé.
# Sử dụng nhiều tài khoản github
Như các bạn biết 1 ssh key chỉ có thể dùng auto xác thực cho 1 tài khoản **GITHUB**. Vậy nếu các bạn có nhiều hơn 1 tài khoản thì bạn cần phải quản lý tài khoản đó để có thể từ 1 máy các bạn có thể làm việc được nhiều tài khoản. Ví dụ bạn có 2 mail 1 dành cho công việc, 1 dành cho cá nhân.

#### Bước 1 : Chuẩn bị ssh key
Ở phần trên mình đã hướng dẫn các bạn tạo ssh key thì các bạn cần chú ý ở 
 
 `> Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]` Ở đây nếu bạn không chỉ định tên file thì ssh key sẽ được lưu ở file có name `id_rsa`.  Bạn có thể tạo file khác với tên là: `id_rsa-COMPANY` hoặc  `id_rsa-PERSONAL`
 
####  Bước 2:   - Rồi sau đó bạn add SSH key của mình vào **GITHUB** [tham khảo tại đây](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account)
#### Bước 3: Tạo 1 file config ở .ssh/
`touch ~/.ssh/config`

`vim config`
Ở file này mình sẽ quản lý để biết được ssh key file nào là thuộc tài khoản nào
```
#Default GitHub
 Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
  
#Account GitHub company
  Host github-COMPANY
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_COMPANY
```

Nếu bạn có 5 tài khoảng GITHUB thì tạo 5 cái ssh key rồi config ở tại đây.

#### Bước 4: Kiểm tra 
Nếu bạn muốn lấy repository của công thông qua ssh key thì
```
git clone origin git@github-COMPANY:framgia/testing.git
```

Trong đó `git@github-COMPANY` phải giống với ` Host github-COMPANY` mà bạn đã config ở trên.
# Kết luận
Hy vọng qua bài viết này sẽ giúp các bạn có thể sử dụng GIT tốt hơn. Hẹn gặp bạn ở bài sau :D