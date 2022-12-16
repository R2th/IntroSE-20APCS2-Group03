Git là một hệ thống quản lý phiên bản phân tán (Distributed Version Control System – DVCS) ra đời vào năm 2005 và hiện được dùng rất phổ biến. So với các hệ thống quản lý phiên bản tập trung khi tất cả mã nguồn và lịch sử thay đổi chỉ được lưu một nơi là máy chủ thì trong hệ thống phân tán, các máy khách không chỉ "check out" phiên bản mới nhất của các tập tin mà là sao chép (mirror) toàn bộ kho mã nguồn (repository). 

Trong bài viết này sẽ hướng dẫn bạn cách deploy một ứng dụng web lên server nhờ vào git hooks
# [tham khảo server tại đây](https://inet.vn/vps?aff=408037)

![](https://images.viblo.asia/de7a983f-60bf-4664-b45d-23934f21477c.jpeg)
Hình ảnh trên là ba bước để triển khai một ứng dụng từ máy local lên server

1. tạo một repo Git trống trên server
2. Viết git hook để deploy code
3. Deploy từ máy local


### Trên server

1. Đầu tiên ta tạo mới một project
2. Cấu hình một repo git và tẹo git hook cho project
3. tạo mới một file có tên **project-create.sh** 

Nội dung trong file  **project-create.sh**  (https://gist.github.com/francoisromain/58cabf43c2977e48ef0804848dee46c3)
rồi chạy lệnh 

> $ bash ./path/to/project-create.sh <your-project>
    
    
### Trên máy local 

Tạo một remote có tên d**eploy**
    
> git remote add deploy ssh://<your-name>@<your-ip>/srv/git/<your-project>.git/

    
Sau đó push code của bạn lên nhánh master vs remote là deploy (vừa mới tạo ở trên).
> git push deploy master

Điều kiện tiên quyết là 
1. Đã kết nối với server thông qua SSH mà không cần root
2. Git đã được cài đặt trên server và máy local 
    
### Quyền truy cập và quyền của người dùng

Tiếp theo bạn connect đến server bằng câu lệnh 
    
> $ ssh <your-name>@<your-ip>
    
Thêm user vào nhóm user để nó có quyền sử dụng git 

> $ sudo adduser <your-name> users.

Trên server chúng ta sẽ sử dụng 2 thư mục để làm việc:
* **/srv/tmp/** là thư mục tạm thời.
* **/srv/www/** chưa các file trên Production.
    
Tạo ra các thư mục và quyền người dùng có thể deloy mà không cần truy cập quền root
> sudo mkdir -p /srv/tmp/
    
> sudo chgrp -R users /srv/tmp/
    
> sudo chmod g+w /srv/tmp/
    
> sudo mkdir -p /srv/www/
    
> sudo chgrp -R users /srv/www/
    
> sudo chmod g+w /srv/www/

### 1. Tạo một repo git trống trên server
Ban đầu tạo một repo git trống trên server giống như repo git ở máy local
    
Bằng những câu lệnh sau 

> sudo mkdir -p /srv/git/<your-app>.git

> cd /srv/git/<your-app>.git

> sudo git init --bare

### phân quyền cho repo git

Để khi chúng ta cập nhật không cần sudo

> cd /srv/git/<your-app>.git

phân quyền cho một nhóm các user truy cập đế thư mục

> sudo chgrp -R users .

> sudo chmod -R g+rwX .
    
> sudo find . -type d -exec chmod g+s '{}' +

> sudo git config core.sharedRepository group --->cấu hình thư mục trở thành repo chia sẻ git



* g = group
*  '+' add rights
* r = read
* w = write
* X = directories only
* . = curent directory
    
### 2. Tạo Git Hook để deploy code

khi push code lên server, chúng ta muốn kích hoạt hoạt một lệnh để deploy code từ git repo. Muốn làm được như vậy thì cần thực hiện 
### Tạo một file git Hook
> cd /srv/git/<your-app>.git/hooks

> sudo touch post-receive

> sudo chmod +x post-receive

    
Sửa nội dung trong file sau: /srv/git/<your-app>.git/hooks/post-receive 

```
#!/bin/sh
    
TARGET="/srv/www/<your-app>"

TEMP="/srv/tmp/<your-app>"

REPO="/srv/git/<your-app>.git"

mkdir -p $TEMP
git --work-tree=$TEMP --git-dir=$REPO checkout -f
cd $TEMP

cd /
rm -rf $TARGET
mv $TEMP $TARGET
```

Sau đó dùng lệnh `bash ./project-create.sh <your-project>` sẽ tự động thực hiện các lệnh ở hai bước trên 

### 3. Deploy từ máy local

Khởi tạo repo

```
cd <your-app>

# Initialize git repo
git init

git remote add deploy ssh://<your-name>@<your-ip>/srv/git/<your-app>.git/
```
Cuối cùng thì push code lên server 

```
git add . 
git commit -m "<commit message>"
git push deploy master
```
Sau khi thực hiện các bước ở trên chúng ta kiểm tra lại trên server

sử dụng lệnh `ls -l` để xem thông tin các thư mục 
    
![](https://images.viblo.asia/4acf09fd-fa25-472f-953d-1e1cb21aaf99.png)

Kiểm tra project trên production (thư mục www)
![](https://images.viblo.asia/570fe0c5-3f32-4f32-942e-e3e4a1d253bc.png)

Mấy cái trắng trắng là địa chỉ ip và tên thư mục :joy:
### Kết luận
Trên đây là hướng dẫn  cách để deloy một ứng dụng web lên server thông qua git push. Lợi ích của công việc này là giúp chúng ta tiếp kiệm thời gian khi mỗi lần cập nhật code trên server cũng như việc quản lí các version.

### Tài liệu tham khảo 
[medium.com](https://medium.com/@francoisromain/vps-deploy-with-git-fea605f1303b)