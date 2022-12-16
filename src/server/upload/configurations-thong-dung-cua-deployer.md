# 1. Giới thiệu
Trước tiên là về khái niệm, ta sẽ nói qua chút về deployer.

Nó là CLI tool (khác với GUI tool, hiểu sơ sơ là chạy command nhỏ gọn để các thành phần bên dưới tự động execute tác vụ) dùng để deploy code, phổ biến và tương thích cho hầu hết các framework php. 

Để cài đặt và tiếp cận học cách sử dụng đơn giản, các bạn có thể tham khảo bài viết của một người anh của mình, bài viết rất là chi tiết như thế này https://viblo.asia/p/deploy-ung-dung-laravel-su-dung-deployer-63vKjX8bl2R

Để biến tấu và thêm vào các tiện ích chọn lọc theo nhu cầu deploy application, chúng ta có thể khai báo các input trên deploy.php file. Nó được sử dụng làm thông số cho việc deploy.

# 2. Một vài khai báo thường dùng
### 2.1. Path chứa toàn bộ cấu trúc folder deploy
```
set('deploy_path', '/var/www/html/tmp');
```
`release_path` (code version sẽ được delpoy) và `current_path` (code version của lần deploy gần nhất)  được mapping theo `deploy_path`. Ví dụ :

- current_path: /var/www/html/tmp/releases/1

- release_path: /var/www/html/tmp/releases/2
### 2.2. Hostname
```
host('127.0.0.1')
    ->set('deploy_path', '~/project')
    ->...;
```
### 2.3. Tăng tốc SSH client
Khai báo này mở ra khả năng chạy đồng thời nhiều phiên kết nối ssh. Vì thế nên nó sẽ nhanh hơn nếu lượng dữ liệu transfer lớn.

Ví dụ như deploy đồng thời cho nhiều host từ local chẳng hạn.
```
set('ssh_multiplexing', true|false);
```
### 2.4. Stage default được deploy (nếu có)
```
set('default_stage', 'prod');
```
### 2.5. Số version deploy gần nhất được giữ lại
```
set('keep_releases', 10);
```
Với mặc định là 5 bản,  -1 là không giới hạn.
### 2.6. Reposity git
```
set('repository', public_path|private_repo);
```
### 2.7. git_tty
Cho phép nhập passphrase, thêm host vào known_hosts local. Default false.

```
set('git_tty', true);
```
### 2.8. git_recursive
Flag cho phép sử dụng option --recursive. Default true.
```
set('git_recursive', false);
```
### 2.9. Branch git
Branch trên git dùng để lấy code deploy.
```
set('branch', 'master');
```
### 2.10. Dirs, files được chia sẻ giữa các release version
Đặc biệt tốt cho những trường hợp sử dụng file tài nguyên (image, video, ...) trong source code.
```
set('shared_dirs', [
    'storage',
    'public/img',
    ...
]);
```
```
set('shared_dirs', [
    'file1',
    'file2',
    ...
]);
```
### 2.11. List file dùng để copy giữa các version release
```
set('copy_dirs', [
    'file1',
    'file2',...
]);
```
### 2.12. Danh sách các path bị xóa sau khi release thành công
```
set('clear_paths', [
    'path1',
    'path2',...
]);
```
###  2.13. Các khai báo biến cập nhật .env file
```
set('env', [
    'VARIABLE' => 'value',
    ...
]);
```
# 3. Tổng kết
Bài viết chủ yếu mang mục đích liệt kê những khai báo thường dùng với deployer. Nếu có gì chưa thỏa mãn thì ace bạn bè có thể đọc ở https://deployer.org/docs/configuration.html nhé !