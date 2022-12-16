Chào mọi người, tiếp tục về chủ đề Linux hôm nay mình chia sẻ mọi người một công backup khá hữu ích trong việc backup và sao lưu hệ thống trên Linux đó là Rclone.
# Rclone là gì?
![](https://images.viblo.asia/052e447d-f7e4-4656-af8e-018f80905260.gif)

**[Rclone](https://rclone.org/)** có thể nói là một giải pháp Backup dữ liệu đồng bộ lên đám mây hiệu quả giúp dữ liệu của bạn luôn được backup định kỳ và lưu giữ an toàn tuyệt đối. 

Ưu điểm của việc sử dụng dịch vụ lưu trữ đám mây đó là tốc độ cao (do có server được đặt trên khắp thế giới), an toàn dữ liệu (không lo ngại các vấn đề phần cứng, network) và nhất là hầu hết đều miễn phí.
Rclone hỗ trợ rất nhiều dịch vụ Cloud thông dụng như:

* Google Drive
* Amazon S3
* Openstack Swift / Rackspace cloud files / Memset Memstore
* Dropbox
* Google Cloud Storage
* Amazon Drive
* Microsoft OneDrive
* Hubic
* Backblaze B2
* Yandex Disk
* SFTP
* The local filesystem

Thay vì backup đưa lên VPS khác để lưu trữ, mình chuyển sang sử dụng **Google Drive**, dung lượng miễn phí **15GB**, mua thêm cũng khá rẻ, chỉ **45k/tháng** là được **100GB** rồi. Bạn nào có tài khoản **Google Apps** miễn phí nữa thì càng tuyệt vời.

# Cài đặt Rclone
Cài đặt bản mới nhất với hệ điều hành Linux 64bit
```
cd /root/
wget https://downloads.rclone.org/rclone-current-linux-amd64.zip
unzip rclone-current-linux-amd64.zip
\cp rclone-v*-linux-amd64/rclone /usr/sbin/
rm -rf rclone-*
```
**Các lệnh Rclone thường dùng**:
* rclone config – Cấu hình kết nối đến dịch vụ cloud.
* rclone copy – Copy files từ server đến cloud, skip nếu đã tồn tại dữ liệu.
* rclone sync – Synchronize giữa server và cloud, chỉ update dữ liệu trên cloud mà thôi.
* rclone move – Move files từ server lên cloud.
* rclone delete – Xóa dữ liệu của folder.
* rclone purge – Xóa dữ liệu của folder và toàn bộ nội dung bên trong.
* rclone mkdir – Tạo folder.
* rclone rmdir – Xóa folder trống tại đường dẫn.
* rclone rmdirs – Xóa toàn bộ folder trống tại đường dẫn. Bộ đếm thời gian bao gồm:
    -  ms – Milliseconds
    -  s – Seconds
    - m – Minutes
    - h – Hours
    - d – Days
    - w – Weeks
    - M – Months
    - y – Years
* rclone check – Kiểm tra dữ liệu server và cloud có đồng bộ hay không.
* rclone ls – Liệt kê toàn bộ dữ liệu gồm size và path.
* rclone lsd – Liệt kê toàn bộ thư mục.
* rclone lsl – Liệt kê toàn bộ dữ liệu gồm modification time, size và path.
* rclone size – Trả về kích thước thư mục.

[Xem thêm command](https://rclone.org/commands/)

## Tạo Backup lên Cloud
Bây giờ bạn hãy chạy lệnh **rclone config** và làm theo các bước như bên dưới.
```
[root@vps1 ~]# rclone config
2020/01/12 14:08:20 NOTICE: Config file "/root/.config/rclone/rclone.conf" not found - using defaults
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n <=== N để tạo mới
name> backupdaily <=== Đặt tên cho backup
```
Ở đây bạn chọn  **n** để tạo mới và đặt name là **backupdaily**
```
Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / 1Fichier
   \ "fichier"
 2 / Alias for an existing remote
   \ "alias"
 3 / Amazon Drive
   \ "amazon cloud drive"
 4 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, Ceph, Digital Ocean, Dreamhost, IBM COS, Minio, SeaweedFS, and Tencent COS
   \ "s3"
 5 / Backblaze B2
   \ "b2"
 6 / Box
   \ "box"
 7 / Cache a remote
   \ "cache"
 8 / Citrix Sharefile
   \ "sharefile"
 9 / Compress a remote
   \ "compress"
10 / Dropbox
   \ "dropbox"
11 / Encrypt/Decrypt a remote
   \ "crypt"
12 / Enterprise File Fabric
   \ "filefabric"
13 / FTP Connection
   \ "ftp"
14 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
15 / Google Drive
   \ "drive"
   Storage> 15 
```
Mình Backup lên **Google Drive** nên chọn **15**
```
** See help for drive backend at: https://rclone.org/drive/ **

Google Application Client Id
Setting your own is recommended.
See https://rclone.org/drive/#making-your-own-client-id for how to create your own.
If you leave this blank, it will use an internal key which is low performance.
Enter a string value. Press Enter for the default ("").
client_id> Không nhập gì cả, Nhấn Enter để sử dụng mặc định
Google Application Client Secret
Setting your own is recommended.
Enter a string value. Press Enter for the default ("").
client_secret> Không nhập gì cả, Nhấn Enter để sử dụng mặc định
Scope that rclone should use when requesting access from drive.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / Full access all files, excluding Application Data Folder.
   \ "drive"
 2 / Read-only access to file metadata and file contents.
   \ "drive.readonly"
   / Access to files created by rclone only.
 3 | These are visible in the drive website.
   | File authorization is revoked when the user deauthorizes the app.
   \ "drive.file"
   / Allows read and write access to the Application Data folder.
 4 | This is not visible in the drive website.
   \ "drive.appfolder"
   / Allows read-only access to file metadata but
 5 | does not allow any access to read or download file content.
   \ "drive.metadata.readonly"
scope> 1 
```
Chọn **1** ở đây
```
ID of the root folder
Leave blank normally.

Fill in to access "Computers" folders (see docs), or for rclone to use
a non root folder as its starting point.

Note that if this is blank, the first time rclone runs it will fill it
in with the ID of the root folder.

Enter a string value. Press Enter for the default ("").
root_folder_id> 
```
Không nhập gì cả, Nhấn Enter để sử dụng mặc định
```

Service Account Credentials JSON file path 
Leave blank normally.
Needed only if you want use SA instead of interactive login.
Enter a string value. Press Enter for the default ("").
service_account_file> 
```
Không nhập gì cả, Nhấn Enter để sử dụng mặc định
```
Edit advanced config? (y/n)
y) Yes
n) No
y/n> n 
```
Chọn **n** Để không tùy chỉnh nâng cao, chỉ sử dụng cơ bản
```
Remote config
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes
n) No
y/n> n 
```
 Chọn **n** 
```
If your browser doesn't open automatically go to the following link: https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=202264815644.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&state=mtDve3JCqeqDPrGMEKy4Ng
```
Log in and authorize rclone for access
```
Bạn copy đường Link ở trên vào trình duyệt và theo theo các bước ở trình duyệt. Sau khi get được mã bạn dán vào như bên dưới
Enter verification code> 4/vQEo6HRbnnZb98tetr0ZpNb28a6sf8e84fHfT65wfBTz8xvbKUAE6EI
```
![](https://images.viblo.asia/6e2a11e7-f1b2-46b2-b4a5-aab2ebc0e530.png)

```
Configure this as a Shared Drive (Team Drive)?

y) Yes
n) No (default)
y/n> n 
```
Chọn **N** để không cấu hình Drive team
```
--------------------
[da]
type = drive
scope = drive
token = {"access_token":"ya29.a0ARrdaM_z8fvjB4QmGeNmNyAOgjGtRj773tnXBZMa5AiT47npTjQEBXgNxv4B8HhNEO6ADh6PEX8kTjQ_J2pWdzgYpCSLpOJDxq8EJ5DNkgP3i85YyJiu476fL6ImPzmoR1LhC9A3xl6zsTqo5aYSWMBruZPW","token_type":"Bearer","refresh_token":"1//0g6QqPuoh3HBaCgYIARAAGBASNwF-L9Ir9dhX4soUISXlchHljWi1cYF2ybXySMDW19pmWemjtj7SyCXQ6uGzh4PnbJZv4pU_KP0","expiry":"2020-01-12T15:21:11.384653782+07:00"}
team_drive =
--------------------
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y
```
Chọn **Y** để đồng ý
```
Current remotes:

Name                 Type
====                 ====
backupdaiy           drive


e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
```
Chọn **q** để thoát
```
root@vps:~#
```
Vậy là xong, giờ bạn có thể test với lệnh liệt kê thư mục trong kết nối remote:
```
rclone lsd remote:backupdaily
```
## Tạo Script Backup lên Cloud
```
nano /root/backup.sh
```
```
#!/bin/bash
cwd=$(pwd)
SERVER_NAME=localhost
REMOTE_NAME=data
DATE=`date +%Y-%m-%d`
TIMESTAMP=$(date +%F)
BAK_DIR=/data-backup/
BACKUP_DIR=${BAK_DIR}/${TIMESTAMP}
MYSQL_USER="root"
MYSQL=/usr/bin/mysql
MYSQL_PASSWORD=Admin@123
Mysqldump=/usr/bin/mysqldump
rclone=/usr/sbin/rclone

SECONDS=0
exec >$BAK_DIR/logs/${DATE}.log
exec 2>&1

mkdir -p "$BACKUP_DIR/mysql"

echo "Starting Backup Database";
databases=`$MYSQL -u $MYSQL_USER -p$MYSQL_PASSWORD -e "SHOW databases;" | grep -Ev "(Database |information_schema | performance_schema | mysql | sys)" `

for db in $databases; do
echo ${db}
$Mysqldump -u $MYSQL_USER -p$MYSQL_PASSWORD --databases $db --quick --lock-tables=false | gzip> "$BACKUP_DIR/mysql/$db.gz"
done
echo "Finished";
echo '';

echo "Starting Backup Website";
mkdir -p $BACKUP_DIR/data
domain=${D##*/} # Domain name
echo "-" $domain;
zip -r -y -q $BACKUP_DIR/data/$TIMESTAMP.zip /var/www/html/  #Exclude cache
#fi
#done
echo "Finished";
echo '';

echo "Starting compress file";
size1=$(du -sh ${BACKUP_DIR} | awk '{print $1}')
cd ${BAK_DIR}
tar -czf ${TIMESTAMP}".tgz" $TIMESTAMP
cd $cwd
size2=$(du -sh ${BACKUP_DIR}".tgz"| awk '{print $1}')
rm -rf ${BACKUP_DIR}
echo "File compress from "$size1" to "$size2
echo "Finished";
echo '';

echo "Starting Backup Uploading";
$rclone copy ${BACKUP_DIR}.tgz "$REMOTE_NAME:/$SERVER_NAME/"
#$rclone -q delete --min-age 1m "$REMOTE_NAME:/$SERVER_NAME" #remove all backups older than 1 week
find ${BAK_DIR} -mindepth 1 -mtime +6 -delete
echo "Finished";
echo '';

duration=$SECONDS
echo "Total $size2, $(($duration/60)) minutes and $(($duration%60)) seconds elapsed."
```
```
chmod +x /root/backup.sh
```
Thử kiểm tra trên **Cloud** xem có thư mục mới với dữ liệu backup:
```
rclone lsl remote:backupdaily
```
Tạo cronjob tự động backup hàng ngày

crontab -e
```
0 2 * * * /root/backup.sh > /dev/null 2>&1
```
Lịch này là cứ đúng 2 giờ sáng hằng ngày sẽ tự động chạy **Backup** move **Google Drive**.
## Tải file backup từ Cloud xuống VPS
Cách đơn giản nhất để  khôi phục lại dữ liệu đó là tải file backup từ Cloud xuống máy tính của bạn, rồi tùy theo nhu cầu mà up trở lại lên VPS. Tuy nhiên, nếu muốn tải trực tiếp file backup về VPS, bạn có thể sử dụng luôn **Rclone** với câu lệnh copy.
```
rclone copy "remote:/backupdaily/2021-01-12" /var/www/html/
```
Lệnh trên sẽ copy folder `2021-01-12` trong thư mục backupdaily trên Cloud về thư mục `/var/www/html/` của **VPS**
# Lời kết
Công việc backup VPS/Server là vô cùng quan trọng, mình đã từng mất toàn bộ dữ liệu và không thể khôi phục được do chủ quan không backup. Hi vọng với bài viết này, các bạn sẽ có thêm sự lựa chọn cho phương pháp backup.

**Tham khảo:**

[Rclone](https://rclone.org/)

[Hướng dẫn dùng Rclone backup dữ liệu lên Google Drive](https://vietcalls.com/huong-dan-dung-rclone-backup-du-lieu-len-google-drive/)