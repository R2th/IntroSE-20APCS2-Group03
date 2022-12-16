*Trong nội dung bài chia sẻ này mình sẽ chia sẻ các nội dung sau:*

1. Tạo Repository trên Github

2. Push code

3. Invite member

4. Pull code về

# 1. Repository là gì?

Repository hay còn gọi là Repo, đây là nơi chứa tất cả mã nguồn cho một dự án được quản lý bởi Github. Bạn cũng có thể hiểu một cách khác là Repo chính khai báo thư mục chứa dự án của bạn trên local hoặc remote. Mỗi Repo có hai cấu trúc dữ liệu là Object store và Index được lưu trữ ẩn trong thư mục .git.

Có hai loại Repo đó là local Repo và remote Repo:

Local Repo: Là repo được cài đặt trên máy tính của một cá nhân, repo này sẽ đồng bộ hóa với remote repo bằng các lệnh của Git.
Remote Repo: Là repo được cài đặt trên server chuyên dụng, điển hình hiện nay là Github.


# 1. Tạo Repo trên Github


- Chúng ta sử dụng một email cá nhân để đăng ký tài khoản trên Github.

- Cách tạo Repo trên Github như sau:

## Tạo Repo

- Đi đến link của trang Github: 
https://github.com/
- Ở góc trên phải của màn hình Click vào [+] và chọn [New repository] item

![](https://images.viblo.asia/81931659-de2c-4dfa-892d-47b0b6ab9510.png)

- Nhập tên Repo mà bạn muốn tạo => Click button [Create repository]

![](https://images.viblo.asia/9f85c8de-cfb0-4a30-ba2f-818deb877e15.png)

- Chọn button radio [Public], tất cả mọi người đều có thể nhìn được code của bạn

![](https://images.viblo.asia/ea7b582c-6209-40ee-b45a-1f87892676c0.png)

![](https://images.viblo.asia/4b414d60-4b6d-4126-b5ca-119b64ee55ab.png)

- Sửa thành [Private], không ai có thể nhìn được code của bạn trừ bạn.

![](https://images.viblo.asia/bfbf0491-6429-427c-9f66-7ae25533419d.png)

![](https://images.viblo.asia/215ac46a-cc74-42e9-9ebd-9e91aec5805b.png)

- Trong khi change permission sẽ yêu cầu phải nhập password confirm như sau:

![](https://images.viblo.asia/31afb5d7-ae88-4875-bc79-d4d22e94ed4f.png)


- Bạn nhập PW account Github của bạn là bạn đã thay đổi Permission từ Public => Private thành công.

Vậy là bạn đã tạo xong một Repo có đường link là: 
https://github.com/TrinhThiMyDuyen/Part1


# 2. Share code của mình lên dự án chung

Bước 1: Share Project

Chuột phải vào tên dự án => Team => Share Project

![](https://images.viblo.asia/00e8de9d-56ae-497a-b580-781a65b88122.png)

Bước 2: Tạo ra thư mục .git trong dự án


Bước 3: Không cho thư mục test-output lên

Chuột phải vào folder test-output => Team => Ignore

![](https://images.viblo.asia/daccc0bb-2a93-47e1-bd3c-8faf04887c0d.png)

Bước 4: Add index cho tất cả các file trong dự án (Đưa code lên Repo)

Chuột phải vào tên dự án => Team => Add to Index

![](https://images.viblo.asia/8d206353-8311-4d8b-8a09-81ca8a7a0666.png)

Bước 5: Commit file

Chọn 1 file bất kỳ muốn commit => Commit message (Nhập nội dung commit) => Commit and Push/ Commit

![](https://images.viblo.asia/d50a9f42-b333-4ba5-b357-f820bbf1badd.png)

Bước 6: Đẩy code lên nơi bạn muốn lên Git (Ở đây mình muốn đẩy lên Repo đã tạo bên trên: https://github.com/TrinhThiMyDuyen/Part1)

![](https://images.viblo.asia/45cea704-9b46-4d1d-b0b3-be2261f63a14.png)

Bước 7: Push thành công và kiểm tra

Push thành công sẽ hiển thị dialog như sau:

![](https://images.viblo.asia/91bd72f5-a4df-464f-ab5c-3a394c9956f4.png)


Kiểm tra Code vừa Push thành công trên Repo

![](https://images.viblo.asia/d1feabff-242a-4518-93fb-7fcb2c736cc4.png)

# 3. Invite member xem code của mình trên Git

Setting => Manage access => Invite a collaborator => Nhập email của user trên Git mà muốn share

![](https://images.viblo.asia/7e66e2fb-86f4-4a25-a607-236c9ca1804b.png)

![](https://images.viblo.asia/a6eeefce-744a-45e3-b60e-128bf52e36a0.png)

# 4.  Clone code
Import Project => Git => Project from Git => Clode URI

![](https://images.viblo.asia/43a0b49d-6d41-44e8-a428-43b6c9eea912.png)


Chọn link repo mà bạn tạo ban đầu: https://github.com/TrinhThiMyDuyen/Part1

# 5. Pull code về

![](https://images.viblo.asia/08ce495f-6e11-4233-8da5-984245d9e355.png)


# KẾT LUẬN:

Việc tạo một nơi chứa code là Repo, commit code, push code, clone code...là một việc làm tuy đơn giản nhưng lại thường xuyên đối với mỗi developer hay một Automation tester. Bài viết này của tôi như một guiline giúp các bạn mới làm quen với Git có được cách làm đầy đủ nhất. 

Có một chú ý với các bạn đó là luôn nhớ khi làm code đó là trước khi làm thì pull về sau khi làm xong thì push lên.

Xin cám ơn!