Hôm nay mình sẽ  giới thiệu cho các bạn cách dùng git để đẩy 1 dự án laravel lên github <br>
Bắt đầu nào.
## Bước 1: Tạo một laravel project.
https://medium.com/@larahelp/restful-api-in-laravel-5c1389c58ca0
<br>
Các bạn tự vào link và đọc để tạo project laravel.
## Bước 2: Cài đặt Git
https://git-scm.com/downloads
<br>
Các bạn vào link trên để dowload và cài đặt git.
## Bước 3: Tạo tài khoản  trên Github.
https://github.com
<br>
Các bạn vào link trên để tạo tài khoản github
## Bước 4: Tạo repository trên Github.
![](https://images.viblo.asia/db901233-4430-4d63-a928-b2152527ded5.png)
<br>
<br>
<br>
![](https://images.viblo.asia/708bb883-fdeb-467b-9a16-59ceec7fc40d.png)
## Bước 5: Đẩy lên GitHub
Bây giờ khi chúng ta đã tạo kho lưu trữ, bây giờ chúng tôi sẽ đẩy dự án lên git. Thực hiện theo các bước dưới đây để thực hiện nó:
### 1. Mở git bash trong thư mục dự án laravel  
![](https://images.viblo.asia/b11180a5-ddc5-49d7-90e0-bdd91eac394d.png)
### 2. Trong git bash, nhập lệnh sau
Trước tiên khởi tạo dự án:
```
git init
```
Thêm file vào git:
```
git add .
```
Commit những thay đổi bằng thông điệp
```
git commit -m 'Added REST Api'
```
Thêm nguồn gốc từ xa nơi dự án sẽ được đẩy
```
git remote add origin https://github.com:larahelp/RestApi.git
```
Cuối cùng nhưng không kém phần quan trọng, đẩy nó vào github
```
git push -u -f origin master
```
Và repository được thêm vào tài khoản git của bạn. Bây giờ bạn có thể sao chép repository  ở bất cứ đâu bằng git
![](https://images.viblo.asia/9ab79cbb-299c-4411-a0c7-4bf7ea9b8e18.png)

Chúc các bạn thành công <br>
Bài viết được lược và dịch từ: https://medium.com/@larahelp/connecting-the-laravel-project-on-github-73acf55bbd63