**Vấn Đề:** Bản thân tôi làm việc trên Image Ubuntu của AWS . Gặp 1 tình trạng là hàng ngày kernel (linux-headers , linux-image) khi có bản mới sẽ được update mới ngay. Và khi reboot lại server thì kernel sẽ ăn bản mới nhất. 

**Yêu cầu:** Do nhiều lý do, cần ubuntu không tự động update kernel.

**Giải Quyết:**

Đầu tiên ta kiểm tra xem "unattended-upgrades" đã đc cài đặt chưa (Ubuntu của AWS mặc định là được cài, còn ubuntu minimal sẽ không có)
```
dpkg --list | grep unattended-upgrades
ii  unattended-upgrades                0.82.1ubuntu2.5                            all          automatic installation of security upgrades
```
Vậy là đã được cài đặt. Giờ ta sẽ kiểm tra đang setting tự động update hay là tắt
```
cat /etc/apt/apt.conf.d/20auto-upgrades
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```
1 = Enable

0 = Disable

Để chỉnh disable/enable, ta có thể edit trực tiếp file. hoặc chạy lệnh sau "dpkg-reconfigure --priority=low unattended-upgrades"

Bước tiếp theo. Tôi sẽ tắt tự động update linux-headers và linux-image đi.
```
vim /etc/apt/apt.conf.d/50unattended-upgrades
Tìm đến phần Unattended-Upgrade và sửa:
// List of packages to not update (regexp are supported)
Unattended-Upgrade::Package-Blacklist {
        "linux-headers";
        "linux-image";
//      "libc6-dev";
//      "libc6-i686";
};
```

DONE.

Kiến thức người viết có hạn. Nếu các bạn có cách giải quyết tốt hơn hoặc note hay hơn. Mong các bạn góp ý.

Source:
http://thr3a.hatenablog.com/entry/20170805/1501943406
https://help.ubuntu.com/lts/serverguide/automatic-updates.html.en#update-notifications

[Framgia 20180906]