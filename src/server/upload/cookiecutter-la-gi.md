Hồi mình mới làm dự án liên quan đến flask hay django với ngôn ngữ python, có vài template dự án mẫu cho phép tùy chỉnh nhanh với nó, mình thấy cụm từ cookiecutter xuất hiện. Thấy lạ ngồi tìm hiểu xem nó như thế nào :joy:

# Nguyên nhân sâu xa
Bình thường chúng ta sẽ bắt đầu 1 repo trong 1 dự án luôn luôn cồng kềnh, đặc biệt là sự kết hợp dạng kiểu microservices. Chúng ta đủ các loại config tuân thủ, nào là thư mục A + thư mục B, config hệ thống cùng thằng cha.

Ví dụ: Mình có service frontend là Vue + backend là Laravel + dockerfile config ( redis, mysql, php-fpm, node...). Giả dụ chúng ta có 3 dự án cùng sử dụng công nghệ đó nhưng mỗi dự án mới, chúng ta phải sửa 1 đống thứ khi múc cái này sang cái khác. Điều này không phải lúc nào cũng hoạt động tốt, nhỡ chúng ta quên thay cái tên dự án cũ private tối mật chẳng hạn cho dự án public có khi dính **incident** lúc nào không hay. Đôi lúc dự án này không cần thư viện để chạy unit test như dự án cũ thì mình lại mất thời gian xóa nó đi.

Việc sử dụng cookiecutter và các template sẽ giảm bớt áp lực đó và tiết kiệm rất nhiều thời gian dựng các base project.

# Cookiecutter là gì ?
Cookiecutter là công cụ CLI với giao diện dòng lệnh trên terminal để tạo một bản tóm tắt ứng dụng từ template có sẵn. Bình thường CLI chúng ta rất hay dùng như dựng base với React.js, Vue,.... có các option tính năng tùy chỉnh và CLI sẽ dựng base phù hợp tiêu chí bản thân để code **tutorial** đơn giản, nhưng CLi đó làm sao phù hợp với các code base nhiều microservices được.

Cookiecutter được xây dựng bằng ngôn ngữ Python

# Sử dụng như thế nào ?
Cookiecutter chúng ta có thể sử dụng với repo trên Git, thư mục hoặc file .zip. 

```
#1
cookiecutter example-project/ 
#2
cookiecutter https://github.com/some_account/example-project.git 
#3
cookiecutter https://gitalb.com/your_project/example-project.git  --checkout your_branch
```

## Làm mẫu luôn cho nóng
chúng ta cài đặt cookiecutter với
```sh
pip install cookiecutter
```
Chúng ta thử tutorial với repo, người đã tạo ra cookiecutter xem như thế nào
```
cookiecutter https://github.com/audreyr/cookiecutter-pypackage.git
```

cấu trúc thư mục ở đây:
![](https://images.viblo.asia/8598746a-89e8-4220-8d13-f4bc66ab2205.png)

```bash
#Cách sử dụng trực tiếp
git clone https://github.com/audreyr/cookiecutter-pypackage.git

cookiecutter cookiecutter-pypackage
```
Sau khi chạy xong chúng ta có 1 loạt các options tùy chỉnh, tên dự án, slug, author, license... Hay có cài đặt thêm các tính năng như pytest, thư viện khác tùy vào mục đích sử dụng.
![](https://images.viblo.asia/137aed6e-3e57-454e-8979-6bbe46a0ac95.png)

## Kết luận
Phần tiếp theo mình sẽ đi sâu thêm tự tạo 1 base project kết hợp CLI tùy chỉnh cookiecutter này như thế nào.