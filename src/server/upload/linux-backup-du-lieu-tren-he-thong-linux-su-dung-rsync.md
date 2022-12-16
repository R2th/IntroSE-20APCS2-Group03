Rsync (Remote Sync) là một công cụ hữu hiệu để sao lưu và đồng bộ dữ liệu trên Linux. Với câu lệnh rsync bạn có thể sao lưu và đồng bộ dữ liệu remote từ các máy sử dụng hệ điều hành Linux một cách dễ dàng và thuận tiện.

**Các đặc điểm nổi bật khi dùng Rsync**

- Hiệu quả trong việc sao lưu và dồng bộ file từ 1 hệ thống khác
- Hỗ trợ sao chép links, devices, owners, groups và permissions.
- Nhanh hơn sử dụng SCP (secure copy).
- Rsync tiêu tốn ít bandwidth vì nó có sử dụng cơ chế nén khi truyền tải và nhận dữ liệu.

# Các thông số cơ bản
Các tuỳ chọn trong rsync

**–v : verbose**

**–r : sao chép dữ liệu theo cách đệ quy ( không bảo tồn mốc thời gian và permission trong quá trình truyền dữ liệu)**

**–a :chế độ lưu trữ cho phép sao chép các tệp đệ quy và giữ các liên kết, quyền sở hữu, nhóm và mốc thời gian**

**–z : nén dữ liệu**

**–h : định dạng số**
# 1. Cài đặt Rsync
Có thể cài đặt rsync theo câu lệnh.
```
yum install rsync (On Red Hat based systems) 
apt-get install rsync (On Debian based systems)
```
# 2. Cách sao lưu trên rsync
#### 2.1  Sao lưu, đồng bộ file trên local
Để copy file backup.tar sang thư mục /tmp/backups/ ta làm như sau:
```
[root@vps]# rsync -zvh backup.tar /tmp/backups/
created directory /tmp/backups
backup.tar
sent 14.71M bytes received 31 bytes 3.27M bytes/sec
total size is 16.18M speedup is 1.10
```
Khi thư mục đích chưa tồn tại thì rsync sẽ tự động tạo thư mục đích cho bạn 
#### 2.2 Sao lưu đồng bộ thư mục trên local.

Bạn có thể đồng bộ toàn bộ file trong một thư mục tới 1 thư mục khác trên local, ví dụ bạn muốn dồng bộ thư mục /folder1 tới /folder2/
```
[root@vps]# rsync -avzh /folder1 /folder2/
```
#### 2.3 Sao lưu, đồng bộ dữ liệu từ Server về local và từ local lên Server
- Copy dữ liệu từ local lên server
- Sao chép thư mục từ local lên Remote Server

Bạn có 1 thư mục chứa ảnh trên local images/ và bạn muốn đồng bộ lên server có IP x.x.x.x :
```
[root@vps]$ rsync -avz images/ root@x.x.x.x:/home/
```
- Copy dữ liệu từ server về local

Bạn có 1 thư mục chứa ảnh trên server là images/ và bạn muốn đồng bộ về máy local của bạn :
```
[root@vps]# rsync -avzh root@x.x.x.x:/home/images /home/images/
```
### 2.4 Rsync qua SSH
Sử dụng SSH khi truyền tải file để đảm bảo file của bạn được bảo mật và không ai có thể đọc được dữ liệu khi dữ liệu được truyền tải qua internet.

Bạn cần cấp quyền user/root mật khẩu để hoàn thành tác vụ. Copy File từ Remote Server về local với SSH

Bạn thêm option “-e” khi sử dụng SSH với rsync để truyền tải file.
```
[root@vps]# rsync -avzhe ssh root@x.x.x.x:/root/install.log /tmp/

```
Copy File từ Local lên Remote Server với SSH
```
[root@vps]# rsync -avzhe ssh backup.tar root@x.x.x.x:/backups/
```
Hiển thị quá trình truyền dữ liệu khi dùng rsync. Để hiển thị tiến trình truyền dữ liệu ta sử dung ‘–progress’. Nó sẽ hiển thị file và thời gian còn lại cho tới khi hoàn thành truyền dữ liệu.
```
[root@vps]# rsync -avzhe ssh --progress /home/folder root@x.x.x.x:/root/folder
```
Sử dụng –include và –exclude.
Sử dụng 2 option này để bạn có thể chỉ định các file cần được sync hoặc bỏ qua không sync.
```
[root@vps]# rsync -avze ssh --include 'R*' --exclude '*' root@x.x.x.x:/var/lib/rpm/ /root/rpm
```
Sử dụng –delete
Nếu file hoặc thư mục không tồn tại ở thư mục cần sync nhưng lại tồn tại ở thư mục đích, bạn cần delete chúng khi sync, ta sử dụng “-delete”
```
[root@vps]# rsync -avz --delete root@x.x.x.x:/var/lib/rpm/ .
```
Cho phép file có kích cỡ nhất định
Bạn có thể sử dung “–max-size” để chỉ định giới hạn của file truyền tải.
```
[root@vps]# rsync -avzhe ssh --max-size='200k' /var/lib/rpm/ root@x.x.x.x:/root/tmprpm
```
Tự đông xoá thư mục gốc khi hoàn thành việc sao lưu
Sử dụng ‘–remove-source-files‘ để xoá dữ liệu thư mục gốc khi hoàn tất sao lưu.
```
[root@vps]# rsync --remove-source-files -zvh backup.tar /tmp/backups/
```
Thử Dry Run với rsync

Nếu bạn là người mới dùng rsync, bạn có thể sử dụng “–dry-run” để đảm bảo những thao tác của bạn
```
root@vps]# rsync --dry-run --remove-source-files -zvh backup.tar /tmp/backups/
```
Cấu hình băng thông cho file truyền tải
Sử dụng ‘–bwlimit‘ để giới hạn bandwidth khi truyền tải file.
```
[root@vps]# rsync --bwlimit=100 -avzhe ssh /var/lib/rpm/ root@x.x.x.x:/root/tmprpm/
[root@vps]# rsync -zvhW backup.tar /tmp/backups/backup.tar
```
Mình xin kết thúc phần tìm hiểu Linux rsync tại đây. Thân ái và quyết thắng 🤗

**Tham khảo**:

- [Full system backup with rsync](https://wiki.archlinux.org/title/Rsync#As_a_backup_utility)

- [Rsync : command đồng bộ dữ liệu trên linux](https://vietcalls.com/backup-du-lieu-tren-he-thong-linux-su-dung-rsync/)