Xin chào tất cả mọi người, vậy là chúng ta lại gặp nhau sau một khoảng thời gian lười vô bờ bến của mình nữa rồi. Như các bạn đã biết thì deploy là giai đoạn cuối cùng để đưa sản phẩm - đứa con tinh thần của chúng ta đến với người dùng. Và dạo này mình cũng đang tập tành deploy các thứ nên ngẫu hứng chia sẻ với các bạn về **Deployer**. Một cung cụ hỗ trợ chúng ta auto deploy cho các ứng dụng PHP đặc biệt là support rất nhiều với laravel.<br>
Và để thuận tiện cho mọi người dễ làm quen cũng như theo dõi tiến độ thì mình sẽ chia cấu trúc thành 2 phần là:<br>
* Tìm hiểu cách cài đặt và vài thông số thiết lập cơ bản.
* Quy trình tạo task và tiến hành deploy mẫu một project laravel lên host.

Giờ hãy cùng nhau tìm hiểu phần đầu tiên nào :)
# Cài đặt deployer
Cái bước này là bước i zì lai nhất trong lịch sử. Mọi thứ đều đã có sẵn trên [trang chủ](https://deployer.org/) nên mình chỉ ghi ngắn gọn thôi nha. Đại khái nó sẽ có 3 bước như vậy:<br>
```
// Tải file deployer.phar từ trang chủ
curl -LO https://deployer.org/deployer.phar
// Đưa vào thư mục /usr/local/bin/dep sử dụng lệnh mv
mv deployer.phar /usr/local/bin/dep
// Cho nó quyền thực thi bằng combo chmod +x
chmod +x /usr/local/bin/dep
```
Như vậy là bây giờ các bạn đã có thể sử dụng Deployer thông qua lệnh `dep` ở terminal.<br>
# Sử dụng deployer
Để sử dụng deployer thì các bạn cần chuẩn bị sẵn combo sau:
* Một dự án php có thể chạy được (buồn quá thì tạo thư mục rồi `echo "Hello world!";` cũng được :) ). Ở đây thì mình đã có sẵn dự án code bằng laravel rồi nên xin phép bỏ qua bước lầy ở trển.
* Một file `deploy.php` để chạy auto deploy. File này sẽ chứa một số thiết lập mà chúng ta sẽ tìm hiểu ở những mục sau.
# Các tham số cấu hình
Để thiết lập các tham số cấu hình các bạn sử dụng phương thức `set` theo cú pháp<br>
```
set('param', 'value');
```
và sử dụng phương thức `get` để lấy các giá trị đã thiết lập.
```
task('deploy', function () {
    $param = get('param');
});
```
Mỗi tham số có thể được ghi đè đối với mỗi host khác nhau:
```
host('abc.xyz')->set('param', 'new value 1');
host('def.ghi')->set('param', 'new value 2');
```
Bên cạnh đó các bạn cũng có thể sử dụng một callback để thiết lập giá trị cho tham số. Callback này sẽ được thực hiện ở host từ lần đầu tiên sử dụng `get`.
```
set('current_path', function () {
    return run('pwd');
});
```
Các bạn có thể sử dụng tham số trong phương thức `run` bằng cách dùng cặp dấu ngoặc nhọn `{{ param_name }}` thay vì dùng phương thức `get`.
```
// 2 câu lệnh dưới đây sẽ cho kết quả như nhau:
run('cd ' . get('release_path') . ' && command');
run('cd {{release_path}} && command');
```
Để xem được danh sách các tham số đang chạy các bạn sử dụng lệnh sau ở terminal<br>
```
dep config:dump
```
Dưới đây là danh sách các tham số phổ biến và ý nghĩa của chúng:
## deploy_path
Là nơi mà ứng dụng deploy trên host. Các bạn nên định nghĩa tham số này cho tất cả các host mà các bạn có. Ví dụ, nếu các bạn muốn deploy đến thư mục home.
```
host('abc.xyz')->set('deploy_path', '~/project);
```
## hostname
Tên host hiện tại, được tự động thiết lập bởi phương thức `host`
## user
Tên người dùng hiện tại, mặc định sẽ là tên của người dùng git hiện tại
```
set('user', function () {
    return runLocally('git config --get user.name');
});
```
hoặc bạn cũng có thể ghi đè lại trong file deploy.php bằng cách sử dụng biến env:
```
set('user', function () {
    return getenv('DEP_USER');
});
```
## release_path
Địa chỉ đầy đủ đến thư mục release hiện tại. <br>
Mặc định thường sử dụng release_path cho các task đơn giản.
```
task('build', 'webpack -p');
```
## previous_release
Điểm release trước đó nếu nó tồn tại. Mặc khác thì biến này không tồn tại. Có thể được dùng cho những tài nguyên không cần phải cài đặt nhiều lần.
```
task('npm', function () {
    if (has('previous_release')) {
        run('cp -R {{previous_release}}/node_modules {{release_path}}/node_modules');
    }
    
    run('cd {{release_path}} && npm install');
});
```
## keep_releases
Số lượng bản release được giữ lại. `-1` cho không giới hạn, mặc định thì được thiết lập là `5`.
## repository
Git repository của ứng dụng.<br>
Để dùng repo private thì các bạn cần đưa ssh key của host vào repo như một Deploy key chẳng hạn.
## branch
Branch sẽ được chọn để deploy.<br>
Nếu bạn muốn deploy một tag hoặc revision cụ thể thì cần sử dụng 2 tùy chọn `--tag` và `--revision` trong lệnh `dep deploy`.<br>
```
dep deploy --tag="v0.1"
dep deploy --revision="5daefb59edbaa75"
```
Chú ý rằng `tag` có độ ưu tiên cao hơn `branch` và thấp hơn `revision`.
## shared_dirs
Danh sách các thư mục được chia sẻ.
```
set('shared_dirs', [
    'logs',
    'var',
    ...
]);
```
## shared_files
Danh sách các tệp được chia sẻ.
## copy_dirs
Danh sách các thư mục được copy giữa các lần release.
## composer_action
Các hành động với composer. Mặc định sẽ là `install` để cài đặt các package cần thiết cho dự án.
## composer_options
Các tùy chọn của composer.
## env
Một mảng chứa các biến môi trường.
```
set('env', [
    'VARIABLE_1' => 'value 1',
     'VARIABLE_2' => 'value 2',
     ...
]);
```
# Tổng kết
Trên đây là cách cài đặt và sử dụng deployer cho việc auto deploy ứng dụng PHP của bạn ( cụ thể ở đây là ứng dụng Laravel) lên host. Ở phần tiếp theo mình sẽ chia sẻ thêm về task, flow cơ bản của một quá trình deploy sử dụng deployer và file `deploy.php` mẫu cho ứng dụng Laravel để các bạn tham khảo.<br>
Mọi thông tin trên đều được dịch từ [trang chủ](https://deployer.org/) nên nếu có nơi nào khó hiểu các bạn có thể lên tham khảo thêm docs nhé :)<br>
Cảm ơn các bạn vì đã cố gắng đọc hết bài này, mọi ý kiến đóng góp xin vui lòng để lại ở dưới phần comment nhé.