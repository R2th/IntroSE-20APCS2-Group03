Hiện tại thì AWS chưa hỗ trợ sử dụng truyền file với FTP trực tiếp lên S3. Nhưng hôm nay mình sẽ hướng dẫn các bạn 1 trick để có thể dùng FTP với S3.
Chuẩn bị:
- 1 tài khoản AWS
- 1 server để cài FTP
- 1 bucket S3

Trong bài viết này mình sẽ chuẩn bị server dùng dịch vụ EC2 của AWS luôn nhé. OK. Nào giờ bắt đầu
### 1. Cài đặt FTP server
Từ account AWS, các bạn tạo 1 ec2 instance nhé. Ở đây mình sẽ dùng luôn image Amazon Linux.
- Install vsftpd
```
sudo yum install vsftpd
```
- Config vsftpd
```
sudo vi /etc/vsftpd/vsftpd.conf
-------------------------------
### turn off anonymous access
anonymous_enable=NO
### Enable local users
local_enable=YES
### chroot folder
chroot_local_user=YES
### allow writable with chroot
allow_writeable_chroot=YES
listen=YES
### enable syslog
syslog_enable=yes

#enable passive mode
pasv_enable=yes
pasv_min_port=15393
pasv_max_port=15592
pasv_address=<ip_public_server>
```
- Hạn chế dùng vsftpd với IP bằng TCP Wrapper
```
vim /etc/hosts.deny
--------------------
vsftpd: ALL

vim /etc/hosts.allow
--------------------
# add to end of file
vsftpd: <ip_public_client>
```
- Restart vsftpd
```
sudo service vsftpd restart
```
- Run vsftpd on boot
```
chkconfig vsftpd on
```
- Add user ftp
```
useradd -d /opt/s3bucket -s /sbin/nologin ftpuser
```

### 2. Tạo S3 bucket
Phần này thì đơn giản rồi. các bạn login vào AWS console để thực hiện tạo 1 s3 bucket nhé.

### 3. Sử dụng S3FS mount bucket vào FTP server
Đây là link github của s3fs: https://github.com/s3fs-fuse/s3fs-fuse .
Đây là cơ chế hoạt động của S3FS:
```
1. s3fs_create()
create 0 byte file
and returns file descriptor to FUSE.
2. s3fs_getattr()
returns file status to FUSE.
3. s3fs_write
write a part of data to file.
repeat this calling.
4. s3fs_flush()
flush file discriptor
5. s3fs_release()
close file descriptor

At (1), s3fs makes temporary file, and open it, returns this local file descriptor to FUSE.
Then at this time, s3fs uploads 0 byte file to S3.(*)
At (3), s3fs writes data to local file descriptor which is returned at (1) to FUSE.
At (4), s3fs uploads(multipart upload) local file data to S3.
```

Các bạn có thể cài đặt đơn giản với câu lệnh:
```
sudo apt-get install s3fs
```
với Ubuntu hay
```
sudo yum install epel-release
sudo yum install s3fs-fuse
```
với CentOS, Redhat.

S3FS sẽ làm nhiệm vụ mount bucket vào 1 folder bên trong server với định dạng là **fuse**.
Trước khi mount, chúng ta cần phân quyền kết nối từ server tới s3. Trên aws, có 2 dạng quyền sử dụng: đó là dùng IAM role hoặc Access key. Ở đây mình sẽ sử dụng IAM role gắn vào ec2 instance này nhé.

Đầu tiên các bạn tạo role: IAM -> Roles -> Create Role -> AWS Service (EC2) -> AmazonS3FullAccess  -> Create. 
![](https://images.viblo.asia/9e6b1f48-2cd8-4b24-9b5b-05cddc7ef0c8.png)

Và Attach Role đó vào instance: EC2 -> Instance -> Server -> Action -> Instance Settings -> Attach/Replace IAM Role

Đối với những server ở local hoặc ở cloud khác thì các bạn buộc phải tạo Access key và gắn vào s3fs nhé.

Ok. Sau khi server được gắn Role, ta đi tiếp tới phần mount bucket:
```
s3fs -o iam_role="ec2RoleForS3" -o url="https://s3-ap-northeast-1.amazonaws.com" -o endpoint=s3-ap-northeast-1 -o dbglevel=info -o curldbg -o allow_other -o use_cache=/tmp -o uid=1001 -o gid=1001 dk-bucket-dev /opt/s3bucket -o nonempty
```
Hoặc mount cùng với fstab:
```
vim /etc/fstab
------------------------------------------
s3fs#my-bucket  /opt/s3bucket     fuse    _netdev,noatime,iam_role=ec2RoleForS3,allow_other,nonempty,uid=1001,gid=1001,use_cache=/tmp,url=https://s3-ap-northeast-1.amazonaws.com,endpoint=s3-ap-northeast-1,dbglevel=info,curldbg 0 0
```
Trong đó:
- **my-bucket**: tên bucket tạo ở Step 2
- **/opt/s3bucket**: folder trên server được mount
- **iam_role**: role tạo trước bước mount
- **uid + gid**: user + group cho folder được mount
- **url**: link s3
- **endpoint**: VPC endpoint 

OK. vậy là các bước setup đã xong. Các bạn có thể test thử ftp server nhé. Chúc các bạn thành công.