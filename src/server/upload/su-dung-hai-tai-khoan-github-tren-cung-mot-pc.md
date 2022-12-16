Bạn đang sử dụng song song hai tài khoản Github cho công việc và không nỡ bỏ rơi một trong hai, muốn chăm sóc cả 2 tài khoản, muốn chiếc pc của bạn có thể `SSH` tới 2 tài khoản Github cùng một lúc. Vậy làm thế nào thỏa mãn tham vọng này. Hãy đọc đến cuối bài viết để hiểu được rằng, chăm sóc cả hai là một việc khó khăn, tốt nhất cứ nên dùng một cái thôi cho khỏe.

# SSH đến tài khoản Github đầu tiên.
Việc setup để PC của bạn `ssh` đến Github đầu tiên hình như là đơn giản, công việc chỉ cần tạo ra cặp key, rồi lấy `public key` thêm vào Github. Đơn giản quá mà! nên mình qua nhanh bước này nhé :D
# SSH đến tài khoản Github thứ 2.

Vâng, đây mới là nội dung chính của bài viết này, chúng ta sẽ đi qua các bước để có thể `ssh` đến tài khoản Github thứ 2 nhé :D

## Bước 1: Tạo ra cặp key cho tài khoản Github thứ 2
Đầu tiên bạn cần tạo ra cặp key mới, riêng biệt với key của tài khoản đầu tiên nhé:

``` bash
$ ssh-keygen -t rsa -C "email"
```
Ở bước này, để cặp key mới không ghi đè lên key đầu tiên, bạn nhớ điều tên cho file nhé:

Ví dụ: id_rsa_{sondt}.

## Bước 2: Thêm public key vào tài khoản Github thứ 2
- Lấy public key của cặp key vừa tạo:

```bash
$ cat ~/.ssh/id_rsa_sondt.pub
```
- Bạn chỉ cần đăng nhập vào tài khoản Github thứ 2, vào https://github.com/settings/keys và thêm Public key đó vào. Bước này cũng giống như việc bạn làm với tài khoản đầu tiên thôi. Không có gì khó khăn cả :D

## Bước 3: Cấu hình file config

Mục đích của việc này là giúp pc của bạn biết được, khi nào cần sử dụng cặp key của tài khoản đầu tiên, khi nào cần sử dụng key của tài khoản thứ 2 để xác thực với Github. 


- Đầu tiên hãy tạo ra 1 file config trong thư mục .ssh
```bash
$ touch ~/.ssh/config
```
Nó chỉ là config thôi nhé, không có extension đâu :v: 

- Tiếp theo bạn tiến hành sửa nội dung trong file `config` như sau:


``` bash:~/.ssh/config
# Tài khoản đầu tiên
Host github.com
    HostName github.com
    User git
    IdentityFile  ~/.ssh/id_rsa
```

Nội dung trong file này mô tả việc, bạn sẽ sử dụng file có tên là id_rsa để xác minh đến Github cho tài khoản Github đầu tiên.

- Tiếp theo là thêm config cho tài khoản thứ 2

``` bash:~/.ssh/config
# Tài khoản thứ 2
Host sondt-github.com
    HostName github.com
    User git
    IdentityFile  ~/.ssh/id_rsa_sondt
```

Ở đây thay vì khai báo `Host github.com` bạn có thể đặt nó là bất kỳ, chỉ để phân biệt được là host github.com sẽ dùng cho tài khoản đầu tiên và host sondt-github.com sẽ dùng cho tài khoản thứ 2 thôi.

## Bước 4: Test thử thôi :v: 
- Tạo thử 1 private repository trên tài khoản Github thứ 2.
- Tạo một thư mục dưới PC của bạn, thực hiện

``` bash
$ git init
$ git add .
$ git commit -m "init"
```
để tạo ra một dự án

- Thêm remote đến repository trên tài khoản Github thứ 2

``` bash
$ git remote add sondt git@sondt-github.com:sondt/test.git
```
Trong command trên: ở phần host mình đã đổi từ `github.com` thành` sondt-github.com`, để remote đó link đến tài khoản Github thứ 2 của mình.

- OK vào giờ push thử lên đó thôi

``` bash
$ git push sondt master
```

# Kết thúc
Như vậy là bạn đã hoàn thành việc cài đặt để có thể thực hiện SSH đến 2 tài khoản Github trên cùng một PC rồi đấy. Mọi thứ khá là đơn giản, sau khi bạn tạo remote cho project xong, việc sử dụng hoàn toàn không khác biệt gì so với việc dùng một account cả. Hy vọng bài viết một ngày nào đó sẽ có ích cho các bạn. (cheer)