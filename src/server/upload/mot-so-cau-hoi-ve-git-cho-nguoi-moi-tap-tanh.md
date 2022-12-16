![](https://images.viblo.asia/fd188da8-515c-41d4-a117-29d403e19956.jpeg)

Bạn là một người mới học `Git` hay xưa nay chỉ dùng mới biết dùng vài câu lệnh cơ bản của `Git` để đẩy code lên repo cá nhân của mình. Hẳn là bạn sẽ có nhiều điều băn khoăn, thắc mắc khi thật sự tham gia vào một dự án, cùng code với những người khác. Mình cũng đã từng như thế, trải qua bao nhiêu lần mất code, phải gõ lại :joy: hay lúng túng vì bị conflict mà không biết cách sửa. Tự nhận thấy kiến thức về `Git` của bản thân còn chưa vững vàng, mình viết bài này nhằm mục đích chia sẻ quá trình "ngáo" `Git` của bản thân và cũng mong rằng những chia sẻ trong bài viết có thể sẽ hữu ích với một số bạn :sweat_smile: 

## 1. Cấu hình SSH
> Sao cứ mỗi lần tôi push code lại phải nhập username và password vậy, mỏi cả tay :pout:. Có cách lẹ hơn không vậy ?

<br>

##### Trả lời: 
Bạn hoàn toàn có thể bỏ qua bước nhập username và password bằng việc dùng SSH.

![](https://images.viblo.asia/011bfd43-9a7f-44da-97d7-5499b2ca31c5.png)

SSH sử dụng cặp khóa private-public để xác thực tài khoản push lên repo thay vì username, password như HTTPS. Bạn chỉ cần tạo cặp khóa ở máy local và đăng ký public key với dịch vụ lưu trữ mã nguồn (ví ở đây là github.com) là xong.

##### Các bước thực hiện:
1. Tạo public-private key
Chạy lệnh:
```bash
ssh-keygen -t rsa -b 4096
```
2. Mở xem file public key
```bash
cat ~/.ssh/id_rsa.pub
```
3. Sau đó copy public key
4. Đăng ký public key với github 
 - Bạn truy cập đường link sau: https://github.com/settings/keys
 - Ấn vào nút `New SSH key`
 - Phần `Title` bạn đặt tên tùy thích
 - Paste public key vào mục `Key`
 - Hoàn tất bằng cách ấn `Add Key SSH`

Tèn tén ten :sunglasses:  Vậy là bạn đã thiết lập xong SSH key cho tài khoản của mình. Giờ bạn có thể clone 1 repo cá nhân của mình về với đường dẫn SSH (bạn clone về bằng HTTPS thì vẫn phải nhập username, password đấy ). Nếu muốn sử dụng SSH với repo đang có trên máy thì bạn hãy đổi `url remote` bằng lệnh: Dễ thế mà mình dùng git cả năm trời mới biết có cái này :weary:

```bash
git remote set url [tên-remote] [đường dẫn SSH]
```
## 2. Commit --amend

> Tôi vừa thay đổi file trong dự án và đã commit, bây giờ tôi lại phát hiện ra một lỗi nhỏ và muốn sửa file mà không phải thêm một commit nữa không ?

<br>

##### Trả lời: 
Rất đơn giản, bạn chỉ cần dùng lệnh `git commit --amend` là cách thay đổi mới sẽ vẫn được lưu trong commit cũ. Thế mà ngày xưa mình cứ thay đổi một lần lại commit một cái, `first commit`, `second commit`, ... :weary:

## 3. Fork repo
> Tôi làm việc trên một repo, clone về và checkout sang một branch khác. Khi có ai đó thay đổi và push lên master, tôi chỉ việc `git pull origin master` về, fix conflict rồi lại push lên branch đó. Sao tôi thấy nhiều người cứ phải lằng nhằng fork repo, rồi add remote, rebase các thứ các thứ nhờ ? Sao phải phức tạp, rối rắm vậy ?

<br>

##### Trả lời:
Đúng là làm việc trên một repo như thế thì đơn giản hơn nhiều so việc fork repo. Nhưng đó là khi bạn có quyền push lên repo đó, trong trường hợp không có quyền push lên repo, ví dụ trường hợp các bạn muốn contribute cho các open source chẳng hạn, cách duy nhất là fork repo về, sửa đổi và sau đó push lên repo đã fork và gửi pull request. Các bạn có thể tham khao quy trình dùng git với fork repo tại [đây](https://github.com/framgia/coding-standards/blob/master/vn/git/flow.md).

## 4. Git stash
> Tôi đã thay đổi code trên branch, bây giờ tôi muốn checkout sang branch khác nhưng git thì không có phép nếu chưa commit thay đổi trên branch hiện tại. Tôi thì chưa muốn commit, lỡ lần sau quên là đã commit rồi mà quên dùng `git commit --amend` thì sao ? 1 tính năng nên chỉ có 1 commit.

<br>

##### Trả lời: 
Thật ra bạn có thể checkout sang branch khác mà chưa commit với cờ -f ở lệnh checkout (tuy nhiên code của bạn vừa thay đổi sẽ nhảy sang branch checkout luôn). Nếu chưa muốn commit thì bạn có thể dùng câu lệnh `git stash save` để lưu trữ những thay đổi sẽ xảy ra, code của branch sẽ trở về trạng thái của commit gần nhất và bạn có thể checkout. Sau khi quay lại branch, muốn phục hồi lại thì bạn hãy dùng lệnh `git stash pop stash@{0}`.

## 5. Tài liệu tham khảo

https://github.com/framgia/coding-standards/blob/master/vn/git/flow.md

https://git-scm.com/book/vi/v1