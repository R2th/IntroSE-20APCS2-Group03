# 1. Mở đầu
Ở bài viết trước thì mình có giới thiệu về các configuration cho deploy.php https://viblo.asia/p/cac-input-thong-dung-cua-deployer-LzD5dvqEZjY 

Tại đây mình sẽ nói tiếp tới phần task và flow của việc deploy trong deployer.

Để dễ nắm bắt vấn đề thì có thể khái quát như sau : "task là 1 nhiệm vụ cơ bản, đơn vị để cấu thành flow - quy trình deploy theo trật tự xác định".
# 2. Task
### Khai báo một task
Nội dung của task có thể là callback function hoặc command trực tiếp, danh sách các command:
```
task('my_task', callback || command || list_commands);
```
### Chạy task
```
dep my_task
```
Ta cũng có thể chỉ định cho task sẽ chạy ở đâu (chạy trên host nào, role được chọn là gì) :
```
dep deploy --hosts domain.com
dep deploy --roles app
```
### Sắp xếp thứ tự chạy task
Sau khi deploy xong thì chạy task deploy:done để báo thành công chẳng hạn: 
```
after('deploy', 'deploy:done');
```
Hay trước khi deploy thì bắt chạy task nhập branch git :
```
before('deploy', 'ask_branch');
```
### Chỉ định phân vùng chạy task theo host, role, stage, local
Bằng cách thêm điều kiện filter vào sau khai báo task:
```
task('task_name', ...)->onStage('stage_name');
task('task_name', ...)->onRoles('role1', ...);
task('task_name', ...)->onHosts('host1', ...);
task('task_name', ...)->local();
```
### Ghi đè task đã tồn tại
Có những task đã thực sự tồn tại trong quá trình deploy, nó là mặc định

Khi không cần thiết phải làm công đoạn đó và muốn bỏ đi thì chỉ cần khai báo lại với cùng tên task là sẽ override.
# 3. Flow
Mặc định deployer sử dụng task có tên `deploy` để thực hiện quá trình deploy.

Tùy vào common recipe trên base của chúng ta, hoặc dựa vào framework sử dụng mà mặc định các sub_task bên trong `deploy` task sẽ khác nhau.

Nếu là laravel thì nó sẽ có thể bao gồm những sub_task như thế này:
```
task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:shared',
    'deploy:vendors',
    ...
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);
```
### deploy:prepare
Chuẩn bị cho công tác deploy, kiểm tra `deploy_path ` trên host (tạo mới nếu chưa tồn tại) và các folder bên trong như releases, shared, .dep
### deploy:lock
Tạo file `.dep/deploy.lock` gắn với tiến trình deploy để đảm bảo trên host đó sẽ không có 1 tiến trình deployer từ nơi khác can thiệp.

Nếu tự ngắt tiến trình hay tiến trình bị fail thì file này sẽ bị xóa bởi task `deploy:unlock`.

*Mình chưa thử việc ngắt kết nối mạng khi đang deploy, khi đó chắc file deploy.lock sẽ vẫn ở đấy mặc dù deploy bị fail. Mọi người thử xem nhé, chắc sẽ có trục chặc :v *
### deploy:release
Tạo một release folder mới sau khi check nội dung `.dep/releases` - chứa thông tin các version release trước đó.
### deploy:shared
Tạo shared files, directories từ thư mục `shared`. Danh sách này có thể config vào `shared_dirs`, `shared_files`.
### deploy:vendors
Cài đặt các dependency theo composer. Các option lệnh theo kèm có thể config vào `composer_options`
### deploy:symlink
Symlink thư mục `current` tới `release_path` hiện tại.
### deploy:unlock
Ngược với `deploy:lock`
### cleanup
Dọn dẹp, xóa bỏ các release version đã cũ dựa trên giới hạn số lượng version cho phép. Khai báo với `keep_releases`.
# 4. Tổng kết
Trên đây là những kiến thức cơ bản để mọi người hiểu một cách tổng quan về cách thức, luồng hoạt động của deployer ở mức độ cơ bản.

Chào và hẹn gặp lại !