# Giới thiệu
Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách cài đặt php, composer, git và symfony CLI trên Windows 10 nhé. Đồng thời, chúng ta sẽ tìm hiểu cách làm sao để chạy được một dự án web viết bằng Symfony. Những packages chúng ta sẽ cài là:
- PHP 8.x
- Composer
- Git 2.x
- Symfony CLI
# Cài đặt PHP 8.x
Các bạn truy cập vào url https://www.php.net/downloads.php và chọn Windows download như hình:

![](https://images.viblo.asia/fb8affbf-2738-4759-96f0-807813f15a83.png)

Sau đó các bạn chọn tải file zip như hình này:

![](https://images.viblo.asia/440eacb3-599d-42f8-adc8-71ea53897dff.png)

Sau khi tải xong, bạn giải nén file và chép vào ổ C như hình sau: 

![](https://images.viblo.asia/653cc43c-4e56-400f-99ab-4af02d492ad4.png)

Những file trong thư mục php sẽ trong giống như thế này: 

![](https://images.viblo.asia/39b6264c-77f5-4778-9f11-1be84393d3c8.png)

Tiếp theo đó, chúng ta cần set environment để có thể chạy lệnh PHP trong command prompt. Các bạn mở Start Menu và gõ env, sau đó chọn như hình:

![](https://images.viblo.asia/64f347be-c375-4788-9c15-328d9676b839.png)

Chọn Environment Variables như hình:

![](https://images.viblo.asia/58b387a2-e592-44d0-a498-7f70c9779d67.png)

Sau đó các bạn chọn PATH ở trong System variables và chọn Edit:

![](https://images.viblo.asia/ba88b0c0-a5e1-4b95-8957-3407962b2d99.png)

Tiếp theo là các bạn chọn Add và thêm vào đường dẫn folder Php khi nãy các bạn vừa mới tải:

![](https://images.viblo.asia/b4d4d9ba-07f2-4ba5-99c8-eabe8406bba2.png)

Như vậy là chúng ta set env xong cho PHP. Để chắc chắn, chúng ta cần phải test. Đầu tiên, mở command prompt lên, sau đó gõ lệnh `php -v` nếu kết quả ra gần giống như hình (có thể version khác nhưng phải là version 8 đổ lên) thì bạn đã cài và set env thành công PHP: 

![](https://images.viblo.asia/d749c312-6bdf-423a-bf3c-28044bb5f364.png)

# Cài đặt Composer
Để cài đặt composer, các bạn truy cập vào url https://getcomposer.org/download/ và chọn Window Installer để tải trình cài đặt Composer cho Windows về máy:

![](https://images.viblo.asia/a2b20d95-c71a-434b-9d8e-e54d271aedec.png)

Sau khi tải về, các bạn chạy trình cài đặt. Ở bước đầu tiên, các bạn chọn next: 

![](https://images.viblo.asia/51d81296-37a0-4bca-8a66-77eae566bf10.png)

Bước thứ 2, các bạn chọn thư mục php khi nãy các bạn download sau đó bấm next:

![](https://images.viblo.asia/bf2870a9-9060-4ece-94e1-b2fda2b4dfe9.png)

Bước thứ 3 các bạn bấm next:

![](https://images.viblo.asia/4ed9154f-ef94-4843-be9a-ecf6bac651d5.png)

Bước thứ 4 các bạn chọn install:

![](https://images.viblo.asia/b6f4923b-1c9e-4530-8e06-b8f89290a77f.png)

Và bước cuối cùng các bạn chọn finish:

![](https://images.viblo.asia/d5c0ae24-5c5c-43be-b093-49f741666ff7.png)

Để chắc chắn chúng ta đã cài thành công composer thì chúng ta sẽ test bằng cách mở Command prompt và gõ lệnh `composer` nếu kết quả gần giống như hình thì bạn đã cài thành công:

![](https://images.viblo.asia/331f2d35-08c1-46ce-ab01-f767cb6bde1e.png)

# Cài đặt Git
Để cài đặt Git trên Windows 10, các bạn truy cập url https://git-scm.com/ và chọn Download for Windows như hình:

![](https://images.viblo.asia/1f976ac8-999d-44c8-b679-67ef17d1e0b8.png)

Sau khi download xong, các bạn mở trình cài đặt Git. Ở bước 1 các bạn chọn next:

![](https://images.viblo.asia/88435e52-b8ff-47e5-b685-4246a94a46c7.png)

Ở bước 2, các bạn check vào checkbox như hình và bấm next:

![](https://images.viblo.asia/1a322420-d223-4dbc-b0db-63419f4ccd23.png)

Ở bước 3, các bạn chọn editor mà mình dùng sau đó bấm next:

![](https://images.viblo.asia/a8e011f2-81bf-4d13-996f-d2662eaf5651.png)

Ở bước 4, nếu các bạn đã biết về git thì các bạn có thể chọn như hình và gõ tên nhánh default của bạn. Trong trường hợp bạn chưa biết Git là gì, thì bạn hãy chọn **Let Git decide** sau đó các bạn bấm next:

![](https://images.viblo.asia/281dc999-1a8c-4376-8e0d-0fae6719ae4a.png)

Ở bước 5, các bạn chọn như hình và bấm next:

![](https://images.viblo.asia/88cf9cba-aa9f-449d-aecf-7c26a678fd96.png)

Ở bước 6, các bạn chọn như hình và bấm next:

![](https://images.viblo.asia/4196da3d-e95c-4a5a-b0e4-8a097100d340.png)

Ở bước 7, các bạn chọn như hình và bấm next:

![](https://images.viblo.asia/beda7cde-66c7-4c3d-8424-0de2ff4d69b1.png)

Ở bước 8, các bạn chọn như hình và bấm next:

![](https://images.viblo.asia/d7346630-f3da-44a4-99c7-700b93646751.png)

Ở bước 9, nếu các bạn thích dùng Command Prompt thì chọn như mình, nếu các bạn muốn dùng MinTty thì chọn option 1 và bấm next:

![](https://images.viblo.asia/01cc9473-427b-4272-980c-b9074a0f7f1d.png)

Ở bước 10, các bạn chọn như hình và bấm next:

![](https://images.viblo.asia/8c2d5e14-3dac-4c7a-b308-423d3c2eefa3.png)

Ở bước 11, các bạn chọn như hình và bấm next:

![](https://images.viblo.asia/422cc8de-2ea4-4573-9da7-8d8cc1830c41.png)

Ở bước 12, các bạn chọn như hình và bấm next:

![](https://images.viblo.asia/5a748b8c-b969-4947-a4cc-2e33df469c5c.png)

Ở bước 13 , các bạn chọn install để bắt đầu cài đặt:

![](https://images.viblo.asia/ef9607ef-276c-4dbe-a672-a7d2431bae82.png)

Sau khi cài xong, để chắc chắn là git đã được cài trên máy, các bạn gõ lệnh `git` trong Command Prompt hoặc Git Bash. Lưu ý, để mở git bash, các bạn vào Start Menu, tìm git và chọn git bash như hình:

![](https://images.viblo.asia/90dbc49e-9a10-41d4-8630-2188a896bb5c.png)

Nếu kết quả gần giống hình thì bạn đã cài đặt Git thành công:

![](https://images.viblo.asia/962e4931-d31e-42d9-ad33-a2d43beeecf8.png)

# Cài đặt Symfony CLI
Các bạn truy cập url https://symfony.com/download và chọn tab Windows và click chọn Download như hình:

![](https://images.viblo.asia/d627f7bb-68ac-4fb0-be82-83001cad7b5c.png)

Sau khi tải xong, các bạn mở trình cài đặt. Ở bước 1 chúng ta lưu ý là bạn nên tích vào ô checkbox để không cần phải set env thủ công cho Symfony CLI:

![](https://images.viblo.asia/8fc6cbf2-e355-4911-9df9-5d954569251c.png)

Ở bước 2, các bạn chọn install:

![](https://images.viblo.asia/5f6d74ae-9d53-4f4f-aa22-d550101c5b5b.png)

Sau khi cài đặt xong, để kiểm tra xem symfony CLI đã được cài trên máy chưa, các bạn mở command prompt và gõ `symfony`. Nếu kết quả gần giống như hình thì bạn đã cài đặt thành công Symfony CLI trên máy:

![](https://images.viblo.asia/6ffed2c5-5b54-4dd1-a12b-18803333aa18.png)

# Khởi tạo dự án
Để khởi tạo dự án, bạn gõ lệnh:

`symfony new projectName --version=version`

Lưu ý, bạn cần thay thế projectName thành tên project của mình và version thành phiên bản bạn muốn cài đặt. Ví dụ tên project của mình là todolo và version mình muốn cài là 5.3 thì câu lệnh sẽ thành:

`symfony new todolo --version=5.3`

Bạn có thể bỏ qua phần version để cài đặt bản mới nhất của Symfony. Ví dụ bản mới nhất thời điểm mình viết bài này là 5.3 nên khi mình gõ lệnh:

`symfony new todolo`

Thì sẽ tự động khởi tạo dự án Symfony phiên bản 5.3.

![](https://images.viblo.asia/91d8b79e-3bfc-47bd-9981-92a93ff8d352.png)

![](https://images.viblo.asia/03210cc6-470e-4c0b-8216-46509a1f9121.png)

# Chạy dự án
Để chạy dự án mới khởi tạo các bạn cần truy cập vào dự án mới tạo:

`cd new-project`

Ví dụ, mình mới tạo dự án tên todolo, thì mình cần chạy lệnh:

`cd todolo`

Sau đó các bạn gõ lệnh để chạy dự án:

`symfony serve`

![](https://images.viblo.asia/49625d62-856c-4e10-805e-7aae46f6b8d4.png)

Các bạn sẽ thấy terminal hiện ra những thông tin như thế này. Nếu gần giống thì các bạn đã chạy dự án thành công. Các bạn lưu ý chỗ màu xanh lá, các bạn sẽ thấy là dự án đang chạy trên domain 127.0.0.1 hay nói các khác là localhost và chạy trên cổng 8000:

![](https://images.viblo.asia/81fff087-c360-4a0a-b372-df13390e4836.png)

Vì vậy, các bạn sẽ mở Browser lên và truy cập vào `localhost:8000`, nếu các bạn thấy giống hình này thì chúc mừng các bạn đã chạy thành công dự án viết bằng Symfony:

![](https://images.viblo.asia/d1ac8beb-dad8-4e91-a71b-fe92c14b482b.png)

**Lưu ý, tên dự án và đường dẫn có thể khác tùy vào các bạn tạo dự án ở đâu trong máy và dự án các bạn tên gì.**

Chúc các bạn thành công.
# Lời kết
Như vậy chúng ta đã cài đặt những pakages cần thiết và chạy dự án viết bằng Symfony trên Linux. Nếu có gặp lỗi, khó khăn hay bất kì thắc mắc gì, các bạn hãy tham gia cộng đồng [Symfony Vietnam](https://www.facebook.com/groups/VietnamSymfonyCommunity) để trao đổi thêm cũng như là giải quyết những vấn đề bạn đang gặp phải. Chúc các bạn thành công.