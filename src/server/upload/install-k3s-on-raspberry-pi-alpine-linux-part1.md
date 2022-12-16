English version can be read at [Eng-ver](https://dnguyenngoc.github.io/posts/raspberry-pi-k3s-alpine-linux-part-1/)

Mới dọn nhà và phát hiện ra mình có 2 con Raspberry Pi. Bỏ thì cũng phí thôi lôi ra vọc. Tiện thể có luôn Switch Poe 1 củ (khum nhớ taị sao mua lun)  thế là toi lại đi mua luôn mạch gắn Poe cho Pi bay thêm 1 củ =)). Đến hồi ráp cluster mí phát hiện ra là 1 con là pi 3b chứ khum phải pi3 b+ hem gắn đc poe. Há há lại bay 1 củ mua con pi 3b+ :) ủa rồi vọc chi ta.
Túm cái váy lại là h có 3 con pi 3b, 3b+ và 4b 8gb hai cái mạch poe 1 con switch poe và một cọng cáp chửa cháy Ethernet (PoE) to micro + Eth. Lở mất tiền rồi + mất thời gian thôi thì viết laị cái hướng dẩn cho ai rảnh làm theo tốn tiền chơi :cry: :cry: :cry:

![](https://dnguyenngoc.github.io/posts/raspberry-pi-k3s-alpine-linux-part-2/img/k8s-rpi-k3s.jpeg)

## Setup OS
-----

#### 1. [Download](https://alpinelinux.org/downloads/) the Raspberry Pi build.
![](https://images.viblo.asia/c680e362-2a5a-4532-a3ad-797d4d6dbff9.png)
    
    
 **Alpine version**

Có ba phiên bản Alpine dành cho Raspberry Pi là: `armhf`, `armv7`,  và `aarch64`. aarch64 thích hợp với Raspberry Pi 3 và Raspberry Pi 4 Model B. thế thì dức `aarch64` thôi dù sao cũng chưa sài bao giờ ví dùng alphine cho ló nhẹ. Kéo cái í mịt về nào. À cái này làm trực tiếp trên con Pi3 gẻ cài Raspian OS nhá. [Install Raspbian](https://www.raspberrypi.com/software/)

```bash
cd /tmp
wget https://dl-cdn.alpinelinux.org/alpine/v3.16/releases/aarch64/alpine-rpi-3.16.2-aarch64.tar.gz
 ```
 
   
#### 2. Partition and format the memory card.

Cài thêm cái [GNU Parted](https://www.gnu.org/software/parted/) để chia vùng cho cái thẻ nhớ.

```bash
sudo apt install parted
```


Cắm thẻ nhớ zào và kiểm tra thử. ở đây thẻ của mình là `sda`.


```bash
$ lsblk
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda           8:0    1 58.2G  0 disk 
`-sda1        8:1    1 58.2G  0 part /media/pi/SDCARD
mmcblk0     179:0    0 29.7G  0 disk 
|-mmcblk0p1 179:1    0  256M  0 part /boot
`-mmcblk0p2 179:2    0 29.5G  0 part /
```

Tạo 1 partition nhỏ  `/boot` để chứa boot hệ thống từ 256M-500M thôi, sau đó phân bổ phần còn lại của đĩa vào một phân vùng riêng biệt.

```bash
sudo parted /dev/sda --script -- mklabel msdos
sudo parted /dev/sda --script -- mkpart primary fat32 1 256M
sudo parted /dev/sda --script -- mkpart primary ext4 256M 100%
```

Format `boot` với `FAT32` và phần còn lại là `ext4`:

```bash
sudo parted /dev/sda --script -- set 1 boot on
sudo parted /dev/sda --script -- set 1 lba on
sudo mkfs.vfat -F32 /dev/sda1
sudo mkfs.ext4 /dev/sda2
```

Kiểm tra lại phân vùng vừa mí tạo.

```bash
$ sudo parted /dev/sda --script print
Model:  SD Card Reader (scsi)
Disk /dev/sda: 62.5GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags: 

Number  Start   End     Size    Type     File system  Flags
1      1049kB  256MB   255MB   primary  fat32        lba
2      256MB   62.5GB  62.3GB  primary  ext4
```


#### 3. Mount the boot partition.
Tạo một folder  `/mnt/sd` rồi mount phân vùng `boot` vào đó:

```bash
sudo mkdir /mnt/sd
sudo mount /dev/sda1 /mnt/sd
```

#### 4. Unpack the Alpine package onto the partition.
Giải nén image alpine download từ bước 1 đến thư mục boot đc mount.
```bash
# Alpine image have been dowloaded at /tmp in step-1
sudo tar xf /tmp/alpine-rpi-**.tar.gz -C /mnt/sd --no-same-owner
```

 #### 5. Create the `usercfg.txt` file into the boot partition: `/mnt/sd/usercfg.txt`.
File này để cấu hình ví dụ như disable bluetouth với audio `dtparam=audio=off,pi3-disable-bt`. [More](https://wiki.alpinelinux.org/wiki/Raspberry_Pi)

```bash
# Enable mini UART as serial port (/dev/ttyS0).
# Also, fixes VideoCore IV (aka the GPU or the VPU) frequency to 250MHz.
enable_uart=1

# give the GPU the least amount of RAM it can get by with (16MB).
# This also triggers the Pi to use a cutdown version of the firmware (start_cd.elf).
gpu_mem=16

# Optionally turn off audio and bluetooth.  (Note "dt" stands for device tree)
dtparam=audio=off,pi3-disable-bt
```

#### 6. Headless Installation (optional)

Nếu không có màn hình với bàn phím để cấu hình hệ điều hành thì thực hiện này nhé [headless script](https://github.com/davidmytton/alpine-linux-headless-raspberrypi).

```bash
sudo curl -L -o /mnt/sd/headless.apkovl.tar.gz https://github.com/davidmytton/alpine-linux-headless-raspberrypi/releases/download/2021.06.23/headless.apkovl.tar.gz
```

#### 7. Wifi Configuration (optional)

Nếu cài headless script. thì tạo thêm `wifi.txt` vào: `/mnt/sd/wifi.txt`. để khi boot rpi tự connect đến wifi và mình có thể ssh để config.

```bash
ssid password
```

#### 8. Unmount.
```bash
sudo umount /mnt/sd
```

#### 9. Reboot
```bash
reboot
```

## Installation


-----

#### 1. Log in into Alpine with the default username and password. If you have a headless installation you can ssh into the Raspberry Pi.

Sau khi reboot cắm thẻ này vào rpi và login với user/pass default. If sử dụng headless script thì có thể ssh trực tiếp vào Raspberry Pi. user là  `root` password là rỗng **""**.

#### 2. Run setup.

```bash
setup-alpine
```

#### 3. Create system partitions.

Sử dụng phân vùng còn lại đã tạo trước đó và mount /mnt để tiến hành cài đặt apline lên phân vùng này.
```bash
apk add e2fsprogs
mkfs.ext4 /dev/mmcblk0p2
mount /dev/mmcblk0p2 /mnt
```

#### 4. Install the system files.
Chạy cài đặt apline lên phân vùng vừa mount.

```bash
setup-disk -m sys /mnt
```

Nếu gặp lỗi này `ext4 is not supported . Only supported are: vfat` thì thử với `FORCE_BOOTFS=1`.

```bash
FORCE_BOOTFS=1 setup-disk -m sys /mnt
```

#### 5. Remount old partition in RW. An update in the first partition is required for the next reboot.
Remount phân vùng củ đang chạy hiện tại trong chế độ read/write để tuỳ chỉnh.
```bash
mount -o remount,rw /media/mmcblk0p1
```

#### 6. Clean up the boot folder in the first partition to drop unused files.
Xoá mục boot trong system đang chạy hiện tại. và mục boot/boot không cần thiết trong sys được cài trên trên phân vùng mới.
```bash
rm -f /media/mmcblk0p1/boot/*
cd /mnt
rm boot/boot
```

#### 7. Move the image and init ram for Alpine Linux into the right place.
Di chuyển boot trong phân vùng vừa cài alpine đến phân vùng củ (để cập nhập lại boot trong lần reboot tiếp theo)
```bash
mv boot/* /media/mmcblk0p1/boot
rm -Rf boot
mkdir media/mmcblk0p1 # It's the mount point for the first partition on the next reboot
```

#### 8. Update /etc/fstab:
```bash
echo "/dev/mmcblk0p1 /media/mmcblk0p1 vfat defaults 0 0" >> etc/fstab
sed -i '/cdrom/d' etc/fstab
sed -i '/floppy/d' etc/fstab
```

#### 9. Enable edge repository.

```bash
sed -i '/edge/s/^#//' /mnt/etc/apk/repositories
```

#### 10. For the next boot, indicate that the root filesystem is on the second partition. If the cmdline.txt file contains a line that starts with /root, then use sed:
Cấu hình root file system cho lần boot kế tiếp.
```bash
sed -i 's/$/ root=\/dev\/mmcblk0p2 /' /media/mmcblk0p1/cmdline.txt
```

#### 11. Make sure that appropriate cgroups are enabled
Cấu hình cgroups để giới hạn nguồn tài nguyên cpu, ram sử dụng.

```bash
sed -i "s/$/ cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1/" /media/mmcblk0p1/cmdline.txt
```

#### 12. If using chrony, allow the system clock to be stepped in the first three updates if its offset is larget than 1 second.

```bash
echo "makestep 1.0 3" >> /etc/chrony/chrony.conf
```

#### 13. Reboot
```bash
reboot
```
  
 
 ## To be continue.
---
 Phần 2 [[Eng] - Raspberry Pi K3s Alpine Linux Part 2](https://dnguyenngoc.github.io/posts/raspberry-pi-k3s-alpine-linux-part-2/)