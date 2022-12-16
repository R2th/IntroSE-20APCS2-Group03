Một trong những lỗi khó thường gặp khi cài đặt mới một dự án sử dụng Laravel framework đó là file permission denied.

Thông báo phổ biến nhất có lẽ là `storage/logs/laravel.log could not be opened: failed to open stream: Permission denied`.

Bài viết này sẽ trình bày về một số nguyên nhân và giải pháp cho vấn đề kể trên.

## Phân quyền file và thư mục

Đây có thể được coi là nguyên nhân chính khi thư mục dự án chưa được thiết lập phân quyền phù hợp với cài đặt của web server.

Lấy ví dụ với web server là `nginx` có sử dụng FastCGI Process Manager (FPM). Tiến trình FPM này sẽ có cài đặt mặc định đối với process owner là `www-data` - Unix user mặc định tương ứng của `nginx`.

Nếu ứng dụng Laravel được chạy trên một web server được thiết lập mặc định như trên thì các file và thư mục phát sinh trong quá trình vận hành web sẽ có owner là `www-data`. Đồng nghĩa với việc Unix user `www-data` cũng cần phải có quyền "truy cập" các file và thư mục của dự án.

Vậy "truy cập" ở đây có thể hiểu như nào ?

Unix file sẽ có 3 quyền truy cập cơ bản: Đọc (Read - R - 4) - Ghi (Write - W - 2) - Thực thi (Execute - X - 1)

Tùy vào từng trường hợp mà quyền truy cập cần cung cấp cho `www-data` (web process owner) sẽ khác nhau.

Thông thường, các thư mục sẽ được thiết lập quyền truy cập 755 và các file là 644.

Khi kiểm tra phân quyền của file và thư mục với lệnh `ls -la`, có thể thấy các giá trị hiển thị tương ứng như sau:

 File (Tệp tin): 644 (-rw-r--r--)
 
Thư mục: 755 (drwxr-xr-x). Trong đó `d`  để thể hiện file hiện tại là một thư mục (`d`irectory - thư mục bản chất cũng là một file).
 
Trong phạm vi bài viết này, sẽ không đi sâu vào file permission của hệ điều hành họ Unix. Nhưng có thể hiểu đơn giản như sau:

Một file trong Unix (hệ điều hành họ Unix: Ubuntu, Centos, ...) sẽ được phân quyền theo 3 nhóm user:

1. Owner user (Unix user mà đã tạo ra file)

2. Owner's group users (Unix user nằm trong nhóm của Owner user)

3. Other users (Những Unix user còn lại khác)

Như vậy, thư mục với quyền truy cập 755 sẽ được hiểu là:

1. Owner user có quyền 7 (4 + 2 + 1 = Đọc + Ghi + Thực thi)
2. Owner's group user có quyền 5 ( 4 + 1 = Đọc + Thực thi)
3. Other users có quyền 5 ( 4 + 1 = Đọc + Thực thi)

Tương tự với file có quyền truy cập 644:
1. Owner user có quyền 6 (4 + 2 = Đọc + Ghi)
2. Owner's group user có quyền 4 (Đọc)
3. Other users có quyền 4 (Đọc)

Trường hợp ngoại lệ đối với Unix user `root`: có đầy đủ quyền trên file và thư mục của hệ thống.

Áp dụng cho ví dụ của web process owner là `www-data`, các thư mục của dự án cần được thiết lập phân quyền phù hợp với Unix user này.

Lỗi `storage/logs/laravel.log could not be opened: failed to open stream: Permission denied`  có thể xảy ra khi web process owner không có quyền tạo ra file laravel.log ở thư mục `storage/logs` .

Nếu thư mục `storage/logs` được thiết lập với quyền truy cập mặc định 755 và lỗi trên xảy ra, một phán đoán có thể thấy ngay được là web process owner không phải owner user của thư mục và thuộc nhóm Unix user 2 và 3 đã đề cập ở trên.

Một trong những cách giải quyết nhanh gọn nhưng cực kỳ nguy hiểm là cấp quyền 777 trên thư mục đang xảy ra lỗi phân quyền. Với cách này, bất cứ user nào cũng có thể ghi vào thư mục của dự án. Do đó, cách này chỉ nên áp dụng tạm thời và chỉ được phép áp dụng trên local server.

Một số giải pháp cho vấn đề này có thể kể đến như sau:

### 1. Sử dụng mask trong Access Control Lists (ACLs)

Đối với hệ điều hành Linux, có thể sử dụng công cụ về `acl` (`setfacl`, `getfacl`, ...) để thiết lập mask cho file và thư mục.

Về cơ bản, khi sử dụng tính năng mask của `acl`, một file hay thư mục sẽ có nhiều bản ghi (entry) về phân quyền hơn, ngoài 3 nhóm quyền mặc định (owner, group  và others). Từ đó, việc cấp quyền cho Unix user cũng trở nên linh động hơn.

Lấy ví dụ với trường hợp lỗi ghi file log vào thư mục `storage/logs`, có thể thiết lập mask trên thư mục này như sau:

```
$ setfacl -L -R -m g:"www-data":rwX -m u:"www-data":rwX storage
$ setfacl -dL -R -m g:"www-data":rwX -m u:"www-data":rwX storage
```

Trong đó,

`setfacl` : lệnh (công cụ) để thêm bản ghi vào `acl` của file/thư mục.

`-L`: áp dụng các thay đổi về `acl` trên cả các symbolic link nằm trong thư mục.

`-R`: áp dụng cho file/thư mục con của thư mục hiện tại.

`-m`: chỉ thị cho việc thiết lập mask của `acl`

`g:"www-data":rwX`: thiết lập các user thuộc group `www-data` có quyền `rwX` trên thư mục.

`u:"www-data":rwX`: thiết lập user  `www-data` có quyền `rwX` trên thư mục.

`storage/logs`: Đường dẫn tới thư mục (có thể nhập đường dẫn tương đối)

`-d`: mặc định thiết lập cho các file/thư mục con được tạo mới sau này sẽ có `acl` tương tự.

Với cách này, chúng ta có thể cấp quyền ghi cho web process owner `www-data` và vẫn giữ nguyên trạng thái phân quyền 755 mặc định. Khi sử dụng lệnh `ls -la`, ở cột phân quyền của thư mục `storage/logs` sẽ xuất hiện thêm dấu `+` để thể hiện ngoài quyền 755 mặc định, `acl` của thư mục đang có thêm bản ghi về phân quyền.
```
drwxr-xr-x+
```

Để kiểm tra trạng thái `acl` đầy đủ của thư mục, có thể sử dụng công cụ `getfacl`:

```
$ getfacl storage/logs/
# file: storage/logs/
# owner: nguyen.van.hieu
# group: nguyen.van.hieu
user::rwx
user:www-data:rwx
group::r-x
group:www-data:rwx
mask::rwx
other::r-x
default:user::rwx
default:user:www-data:rwx
default:group::r-x
default:group:www-data:rwx
default:mask::rwx
default:other::r-x
```

***Chú ý:***

- Mặc dù `acl` là công cụ mặc định có sẵn của nhiều distro (các phiên bản hệ điều hành họ Unix như Ubuntu) nhưng không phải server nào cũng hỗ trợ hoặc đã được loại bỏ để tối ưu dung lượng của hệ thống (điển hình như các phiên bản hệ điều hành rút gọn cho Docker).

   Trường hợp bị thiếu, có thể cài đặt bổ sung như sau đối với hệ điều hành Ubuntu:
   ```
   $ sudo apt update && sudo apt install -y acl
   ```
-  Chỉ có Unix user với quyền CAP_FOWNER mới thực hiện được việc thay đổi về ACL (Trên các hệ thống Linux, ngoài owner của file thì chỉ có user `root` mới có quyền này).

### 2. Thay đổi owner và group của thư mục

Một cách dễ thấy nhất là việc thay đổi owner của thư mục về web process owner:

```
$ chown -RL www-data:www-data storage
```

Tuy nhiên, điểm hạn chế của các h này là Unix user thực hiện thao tác thay đổi nội dung file không phải lúc nào cũng là `www-data`:

Trong trường hợp muốn xóa nội dung file log, cần sử dụng chế độ `sudo` và Unix user cần thuộc nhóm super user (`root`) . Điều này sẽ là cản trở lớn trong quá trình phát triển dưới local server.

Cách này sẽ phù hợp với môi trường remote server.

Cách số 1 sẽ phù hợp hơn ở cả môi trường local server và remote server.

Nếu vẫn muốn sử dụng cách này dưới local server, có thể thêm Unix user vào group `www-data`

```
$ sudo usermod -a -G www-data <local-user-name>
```

Trong đó, `local-user-name` là tên Unix user muốn thêm vào group `www-data`. Nếu đang nằm trong domain network, cần nhập đầy đủ cả domain network name (Ví dụ: `SUN-ASTERISK\nguyen.van.hieu`)

Khi sử dụng một Docker container làm web server, chúng ta có thể thêm bằng cách sử dụng `id` của host Unix user, thay thế cho `local-user-name`

Host machine:
```
$ id -u
39785947
```

Docker machine:
```
$ docker exec php-fpm_container usermod -a -G www-data 39785947
```

### 3. Thay đổi quyền và group của thư mục
Một giải pháp khác kết hợp ý tưởng của hai giải pháp kể trên:
```
$ sudo chgrp -HR www-data storage
$ sudo chmod -R ug+rwx storage
```

- Thay đổi group của thư mục về group của web process owner `www-data`.
- Cấp quyền `rwx` cho owner của thư mục và các user thuộc group `www-data`

Cách này có thể được coi là tối ưu nhất trong các giải pháp kể trên.

## Module bảo mật nâng cao - SELinux (Security Enhanced Linux)
Đây là một module bảo mật của Linux kernal cung cấp một cơ chế hỗ trợ các chính sách bảo mật kiểm soát truy cập.

Khi module này được kích hoạt, một số chính sách về bảo mật được tăng cường, bao gồm việc giới hạn ghi file vào hệ thống theo từng tiến trình. Trong trường hợp này là chính sách `httpd_selinux`  cho tiến trình `httpd` (mặc dù `httpd` là tiến trình của web server `Apache`, nhưng policy này vẫn có thể áp dụng được cho `nginx`)

Đây cũng chính là một trong những nguyên nhân gây ra lỗi Permission denied khi Laravel thực hiện ghi log vào thư mục `storage/logs`.

Câu lệnh dưới đây sẽ giúp giải quyết vấn đề này:

```
$ sudo semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/laravel/storage(/.*)?"
```

- Hệ điều hành `Centos` mặc định kích hoạt module này, trong khi `Ubuntu` thì không.
- Để tăng cường tính bảo mật, việc kích hoạt module này được khuyến nghị và không nên vô hiệu khi đã được kích hoạt mặc định từ trước.

##  *Tham khảo*

**Nginx Official Site**, [Using NGINX and NGINX Plus with SELinux](https://www.nginx.com/blog/using-nginx-plus-with-selinux/)

**Paul - disk_91**, [Move your httpd / apache files on CentOs 7](https://www.disk91.com/2015/technology/systems/move-your-httpd-apache-files-on-centos-7/)

**Deployer**, [writable](https://github.com/deployphp/deployer/blob/master/recipe/deploy/writable.php)

**Minh Tuấn Ngụy @minhtuan.nguy** , [Viblo Q&A](https://viblo.asia/q/cau-cuu-hoi-ve-loi-storagelogslaravellog-could-not-be-opened-failed-to-open-stream-permission-denied-t-Q75wn9bQlWb)

**Linux manual**, [chown](https://linux.die.net/man/8/chown), [chgrp](https://linux.die.net/man/8/chgrp), [httpd_selinux](https://linux.die.net/man/8/httpd_selinux)

**Ubuntu manual**, [setfacl](http://manpages.ubuntu.com/manpages/cosmic/man1/setfacl.1.html)