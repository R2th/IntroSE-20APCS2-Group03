Trong bài viết này tôi sẽ tạo 1 script file giúp đỡ clone nhiều repository 1 lúc. 

Trên github của tôi hiện tại có 4 repository như bên dưới:

![image.png](https://images.viblo.asia/22acc05a-ed2b-4df9-831a-6fa0c525f6d8.png)

Thông thường để clone từng repo về, chúng ta có thể dùng các công cụ hỗ trợ như "github desktop" - "source tree" - "tortoise" và phổ biến nhất là dùng lệnh nhưng đa phần sẽ cần clone từng repo, giả sử chúng ta có 1 project lớn dùng microservice có nghĩa là sẽ có nhiều repo(multiple services) cần được lấy xuống và nếu lấy từng cái một xuống thì sẽ thao tác nhiều hơn là chỉ cần 1 script file là có thể lấy hết tất cả repo về.

## 1. Các bước chuẩn bị:

+ Tạo folder chứa tất cả repo, ở đây tôi tạo folder name "DemoGitHub":

![image.png](https://images.viblo.asia/f967db11-b4dc-404f-a3c1-09aefcabb416.png)

+ Trong folder "DemoGitHub", tôi dùng notepad++ và tạo 1 new file với định dạng "*.bat"

![image.png](https://images.viblo.asia/a56a5800-4c2a-4ba2-b786-52e305547658.png)

## 2. Nội dung script file:

    @echo off
    SET bn="main"
    cd C:\DemoGitHub
    echo %bn%
    rem ####Switch branch for ####
    git clone https://github.com/{username}/repo1.git  -b %bn%
    echo "git clone for repo1"

    git clone https://github.com/{username}/repo2.git  -b %bn%
    echo "git clone for repo2"

    git clone https://github.com/{username}/repo3.git  -b %bn%
    echo "git clone for repo3"

    git clone https://github.com/{username}/repo4.git  -b %bn%
    echo "git clone for repo4"

    pause


Tôi sẽ giải thích 1 vài thông số trong script file:
+ SET bn="main" -> thiết lập giá trị cho branch, nghĩa là chỉ định bạn sẽ clone repo trên branch nào, ở đây tôi để default branch là "main"
+ cd C:\DemoGitHub -> chỉ định thư mục chứa tất cả repo
+ echo %bn% -> chỉ dùng để in ra(hiển thị) branch name
+ git clone https://github.com/{username}/repo{x}  -b %bn% -> câu lệnh "git clone https://github.com/{username}/repo{x}" này chắc các bạn đều đã biết dùng để clone repo về, riêng "-b %bn%" nghĩa là chỉ định sẽ clone repo trên branch nào, biến giá trị "bn" tôi đã khai báo ở trên

Trong quá trình clone những private repo về các bạn sẽ gặp thông báo yêu cầu nhập username và password:

$ git clone https://github.com/{username}/repo.git
Username: username của bạn
Password: personal_token của bạn

Cách lấy personal_token:

+ Đầu tiên đăng nhập vào dashboard github của các bạn, nếu chưa có tài khoản github vui lòng đăng ký. Sau khi đặng nhập thành công -> click avatar icon như hình và chọn mục "Settings":

![image.png](https://images.viblo.asia/2cc2bb15-f7fc-407e-8c56-aa017133f98f.png)

+ Tại giao diện "Settings" -> chọn mục "Developer settings":

![image.png](https://images.viblo.asia/84ff013e-b36e-43be-863d-b0f9a0940c64.png)

+ Tại giao diện "Developer settings" -> chọn mục "Personal access tokens" và click chọn "Generate new token":

![image.png](https://images.viblo.asia/1a8fafed-3bd3-4b0b-a36d-16b9a0e9df61.png)

+ Tại giao diện "Generate new token", có 3 mục chúng ta quan tâm đến:

* Tại "Note" -> nhập mục đích bạn sửa dụng token này cho việc gì

* Tại "Expiration" -> mặc định sau 30 ngày token sẽ hết hạn

* Tại "Select scopes" -> chọn scopes mà bạn cần tuỳ thuộc vào mỗi project. Tại đây tôi chỉ chọn "repo":

![image.png](https://images.viblo.asia/969d21f8-bffe-41dd-a61f-d0f6a9557905.png)

+ Sau khi chọn "scopes" phù hợp -> click button "Generate token":

![image.png](https://images.viblo.asia/e0db0e0e-a73a-4aa3-a787-d572f43379ef.png)

+ Token được sinh ra và bạn chỉ cần click highlighted icon và copy token này, bạn cần backup token này:

![image.png](https://images.viblo.asia/1bbaf771-40aa-43d2-a7e3-e7c936cb8aae.png)

Cuối cùng chỉ cần paste token này nếu trong quá trình clone yêu cầu

Để tối ưu hơn, tôi sẽ tích hợp token này vào trong script file:

    @echo off
    SET bn="main"
    cd C:\DemoGitHub
    echo %bn%
    rem ####Switch branch for ####
    git clone https://{token}@github.com/{username}/repo1.git  -b %bn%
    echo "git clone for repo1"

    git clone https://{token}@github.com/{username}/repo2.git  -b %bn%
    echo "git clone for repo2"

    git clone https://{token}@github.com/{username}/repo3.git  -b %bn%
    echo "git clone for repo3"

    git clone https://{token}@github.com/{username}/repo4.git  -b %bn%
    echo "git clone for repo4"

    pause
    

Chạy scipt file và kiểm tra kết quả:

![image.png](https://images.viblo.asia/02c67ee7-bdeb-4d67-a30e-eb9a4e2439db.png)