Ở bài trước [PHẦN 1](https://viblo.asia/p/backuprestore-sao-luuphuc-hoi-du-lieu-su-dung-key-value-pairs-with-android-backup-service-phan-1-oOVlYqwrl8W), mình đã giới thiệu, hướng dẫn các bạn thực hành backup, restore sử dụng **Key/Value** với **Android Backup Service**. Tuy nhiên có 1 nhược điểm đó là quá trình backup sẽ không thể diễn ra ngay lập tức khi các bạn gọi phương thức **BackupManager(context).dataChanged()**. Thay vào đó, Trình quản lý sao lưu(Backup Manager) đợi một thời điểm thích hợp, sau đó thực hiện sao lưu cho tất cả các ứng dụng đã yêu cầu bản sao lưu kể từ lần sao lưu cuối cùng được thực hiện. Có nghĩa là khi bạn gọi **BackupManager(context).dataChanged()** thì BackupManager sẽ lắng nghe được yêu cầu backup từ ứng dụng của bạn, và có thể còn có những ứng dụng khác cũng request backup. Và đến 1 thời điểm thích hợp (không thể biết thời điểm cụ thể nào) thì trình BackupManager sẽ backup cho toàn bộ các ứng dụng có request backup.
Vậy thì làm sao để các lập trình viên, tester có thể thực hiện việc backup/restore diễn ra ngay lập tức. Các bạn đừng lo lắng, Google đã support tận răng cho chúng ta rồi :D

Đó chính là sử dụng adb command line kết hợp với [bmgr](https://developer.android.com/studio/command-line/bmgr) tool
## I. Chuẩn bị device
Các bạn có thể sử dụng device thật, máy ảo để thực hiện việc test backup/restore. Trước hết, cần phải chú ý, kiểm tra 1 số thông tin sau:
1. Key/Value backup sẽ thực hiện được trên các device từ API 8 - Android 2.2 trở lên.
2. Kiểm tra backup và restore đã được enable trên device/máy ảo chưa, và đã thực hiện thêm tài khoản Google vào thiết bị hay chưa. Có 2 cách thực hiện việc check:
 + Truy cập Settings > Backup & Restore
 + Thực hiện command line adb shell: run bmgr enable
3. Đảm bảo chắc chắn rằng thiết bị test sử dụng Google Backup Transport, bằng cách thực hiện command line sau:
```
adb shell bmgr list transports
```
Sau đó, kiểm tra kết quả:
```
android/com.android.internal.backup.LocalTransport
* com.google.android.gms/.backup.BackupTransportService
```

Vậy là đã xong phần chuẩn bị. Bây giờ chúng ta sẽ thực hiện test backup/restore.
## II. Test backup
Để bắt đầu backup ứng dụng của bạn, chạy command dưới dây:
```
adb shell bmgr backupnow <PACKAGE>
```
Chú ý: câu lệnh **backupnow** khả dụng trên các device/máy áo chạy android 7.0 trở lên.
Kiểm tra logcat xem kết quả thực hiện câu lệnh trên:
Ví dụ:
```
D/BackupManagerService: fullTransportBackup()
I/GmsBackupTransport: Attempt to do full backup on <PACKAGE>

---- or ----

V/BackupManagerService: Scheduling immediate backup pass
D/PerformBackupTask: starting key/value Backup of BackupRequest{pkg=<PACKAGE>}
```
Nếu câu lệnh **backupnow** không khả dụng trên thiết bị của bạn. Hãy thực hiện các bước sau đây:
### 1. Auto backups:
- Thực hiện command lệnh sau:
```
adb shell bmgr backup @pm@ && adb shell bmgr run
```
- Chờ đến khi câu lệnh trên thực hiện xong, kiểm tra logcat:
```
I/BackupManagerService: K/V backup pass finished.
```
- Chạy câu lệnh dưới để hoàn tất quá trình backup:
```
adb shell bmgr fullbackup <PACKAGE>
```
### 2. Key/Value backups:
- Nếu ứng dụng của bạn không gọi phương thức **BackupManager.dataChanged()** kể từ lần sao lưu cuối cùng. Bạn có thể đưa ứng dụng của mình vào quá trình backup theo command lệnh sau:
```
adb shell bmgr backup <PACKAGE>
```
- Sau đó kích hoạt bản sao lưu bằng command lệnh sau:
```
adb shell bmgr run
```
**bmgr backup** thêm ứng dụng của bạn vào hàng đợi (queue) của BackupManager. **bmgr run** khởi tạo hoạt động backup. Điều này buộc Backup Manager thực hiện tất cả những request backup có trong hàng đợi (queue)

## III. Test restore
Để thực hiện quá trình restore, thực hiện command dưới dây với 1 **backup token**:
```
adb shell bmgr restore <TOKEN> <PACKAGE>
```
**CHÚ Ý**: Hành động này sẽ tạm dừng ứng dụng của bạn và xóa toàn bộ data ứng dụng trước khi thực hiện restore.

Để lấy **backup token**, thực hiện lệnh command sau:
```
run adb shell dumpsys backup
```

Sau đó, check logcat để kiểm tra quá trình restore:
Ví dụ:
```
V/BackupManagerService: beginRestoreSession: pkg=<PACKAGE> transport=null
V/RestoreSession: restorePackage pkg=<PACKAGE> token=368abb4465c5c683
...
I/BackupManagerService: Restore complete.
```
Bạn cũng có thể test restore automatic bằng cách xóa đi cài lại ứng dụng với adb, hoặc từ kho ứng dụng Google Play Store.

## VI. Tổng kết
Qua 2 phần mình đã giới thiệu, hướng dẫn cách backup/restore data sử dụng Key/Value với Android Backup Service. Bao gồm cả cách sử dụng tool bmgr để thực hiện backup/restore diễn ra ngay lập tức mà không phải chờ đợi 1 thời gian thích hợp. Hy vọng bài viết sẽ giúp ích cho các bạn trong quá trình học tập và làm việc. Cám ơn các bạn đã theo dõi bài viết của mình. Hẹn gặp lại các bạn ở những bài viết sau của mình nhé. :D
Thanks all!