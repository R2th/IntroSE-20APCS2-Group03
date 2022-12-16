Để tiếp nối cho bài viết phần 1 trước đó của mình: [Tạo USB cài đặt Hackintosh (P1)](https://viblo.asia/p/tao-usb-cai-dat-hackintosh-p1-aWj534GwK6m) . Trong bài viết này mình sẽ giới thiệu nốt với các bạn cách tạo USB cài đặt Hackintosh cuối cùng trong 3 cách - Cách thủ công được sử dụng nhiều nhất. Lí do bởi vì chúng ta có thể tự tạo USB cài đặt ngay khi Apple tung ra một bản MacOS mới nào đó mà không phải phụ thuộc vào Niresh hay tonymacx86 hay bất cứ ai tạo cho cả. Let's go, chúng ta cùng bắt đầu nhé !!!


## Cách 3: Làm thủ công
-----

Ở cách 3 này, bước 1 và bước 2 giống hoàn toàn với Cách 2: Sử dụng công cụ Unibeast trong bài viết trước đó, bao gồm:

- Bước 1: Tải bộ cài đặt từ Apple
- Bước 2: Format USB

Sau khi đã hoàn thành 2 bước trên các bạn đã có file cài đặt MacOS trong thư mục Application và 1 USB với 2 phân vùng: CLOVER_EFI, install_osx rỗng, tiếp tục bước tiếp theo dưới đây nhé.

### Bước 3: Cài đặt Clover Bootloader 

Tiến hành tải Clover về từ địa chỉ: [https://sourceforge.net/projects/cloverefiboot/](https://sourceforge.net/projects/cloverefiboot/) . 

![](https://images.viblo.asia/faae637b-ddd2-4602-9907-e814a97f5916.png)

Mở Clover lên, Chọn "Change Install Location" -> Chọn CLOVER_EFI 

![](https://images.viblo.asia/44fd8f98-5646-488e-92d8-684227f92be8.png)

Sau khi chọn phân vùng cài đặt CLOVER_EFI, chọn "Customize"

![](https://images.viblo.asia/1b965c8f-5b7e-4d72-89a7-677189db8f28.png)

**- Đối với USB cài đặt theo kiểu UEFI, chọn theo hình**
![](https://images.viblo.asia/fd87084a-d76c-4f94-a81f-bd43fba17d18.png)
![](https://images.viblo.asia/cc92d552-081a-4b47-85fb-a82998fff9f4.png)

- Chọn "UEFI booting only", "Install Clover in the ESP" sẽ tự động được chọn
- Chọn "BGM" trong phần Themes
- Phần UEFI Drivers, để như mặc định nhưng bỏ tuỳ chọn VBoxHfs-64 đi, chọn thêm AptioMemoryFix-64



**- Đối với USB cài đặt theo kiểu Legacy, chọn theo hình**
![](https://images.viblo.asia/f8fac2bd-bdce-4f7a-a8cc-62ef7e5ac9cc.png)
![](https://images.viblo.asia/54ab2d9a-af7c-4f8e-bab9-45df5a124c77.png)
![](https://images.viblo.asia/e082e5f9-570e-4c65-821a-7470f918aa40.png)

- Bỏ chọn "UEFI booting only"
- Bỏ chọn "Install Clover in the ESP"
- Trong phần"Boot Sectors", chọn "Install boot0af in MBR" (tuỳ chọn "Install boot0ss in MBR" dành cho ổ HDD nếu cài song song với Windows)
- Chọn "BGM" trong phần Themes
- Phần UEFI Drivers, để như mặc định nhưng bỏ tuỳ chọn VBoxHfs-64 đi, chọn thêm AptioMemoryFix-64


**Config lại 1 chút**

1. Đối với USB theo kiểu UEFI, mặc định Clover sẽ không thể nhận diện được các ổ có định dạng HFS+ (Định dạng phân vùng của Apple), do đó ta cần giúp nó nhận diện được thôi, bằng cách sử dụng HFSPlus:  
- Tải về theo địa chỉ : https://github.com/JrCs/CloverGrowerPro/raw/master/Files/HFSPlus/X64/HFSPlus.efi.
- Copy vào đường dẫn /EFI/Clover/drivers64UEFI
- Hãy nhớ **HFSPlus.efi đặc biệt quan trọng, không được quên** 

![](https://images.viblo.asia/2d87f7a5-9f8d-473f-bcb5-7c8554907a7d.png)

2. Đối với USB theo kiểu Legacy, copy ApfsDriverLoader-64.efi từ thư mục drivers64UEFI vào thư mục drivers64

![](https://images.viblo.asia/c4c9e7b1-fb59-46b9-8e26-d5ee8395f3f2.png)


##  Bước 4. Copy kexts 


Kext được hiểu nôm na giống như driver trên windows vậy. Cần có kext để máy các bạn cài có thể nhận được các driver trên máy.

**- Vào thư mục EFI/CLOVER/kexts/, Xoá tất cả các thư mục chỉ để lại "Other"**

![](https://images.viblo.asia/3ceee31b-f953-49cc-9089-56db48c966ad.png)


==> 

![](https://images.viblo.asia/0836e452-7e5f-449a-8648-f47da29b67df.png)

**- Copy tất cả các kext dưới đây vào thư mục Other**

FakeSMC.kext:  https://github.com/RehabMan/OS-X-FakeSMC-kozlek (Fake các phần cứng cơ bản của máy Apple)

VoodooPS2Controller.kext: https://github.com/RehabMan/OS-X-Voodoo-PS2-Controller (Kext sử dụng màn phím và Touchpad)

USBInjectAll.kext: https://github.com/RehabMan/OS-X-USB-Inject-All 

*(Bộ đôi kext cho card đồ hoạ onboard)*

Lilu.kext: https://github.com/acidanthera/Lilu
WhateverGreen.kext: https://github.com/acidanthera/WhateverGreen (replaces IntelGraphicsFixup.kext)

*(Bộ kext cho card mạng dây)*

RealtekRTL8111.kext: https://github.com/RehabMan/OS-X-Realtek-Network

RealtekRTL8100.kext: http://www.insanelymac.com/forum/topic/296190-driver-for-realteks-rtl810x-fast-ethernet-series/

AppleIntelE1000e.kext: http://www.insanelymac.com/forum/topic/205771-appleintele1000ekext-for-108107106105/

IntelMausiEthernet.kext: https://github.com/RehabMan/OS-X-Intel-Network

AtherosE2200Ethernet.kext: https://github.com/Mieze/AtherosE2200Ethernet/releases

**Sau khi copy, thư mục Other trông sẽ như sau**

![](https://images.viblo.asia/8a2a0152-349e-4def-839f-f4f68d54965b.png)

## Bước 5. Chọn file config.plist phù hợp

Truy cập đường dẫn sau: [https://github.com/RehabMan/OS-X-Clover-Laptop-Config](https://github.com/RehabMan/OS-X-Clover-Laptop-Config), chọn file config.plist phù hợp với cấu hình máy bạn. Chẳng hạn máy mình có cấu hình Intel HD Graphics 5500. Mình sẽ chọn file "config_HD5300_5500_6000.plist" 

- Copy file đó vào thư mục EFI/CLOVER

![](https://images.viblo.asia/5bbd3584-cc14-4513-803a-1a45d0971558.png)

- Backup file "config.plist" cũ đi một chỗ khác. Sau đó đổi tên "config_HD5300_5500_6000.plist" thành "config.plist"

![](https://images.viblo.asia/0c31d0ac-b9fc-4960-92f7-93ebdea2195e.png)

## Bước 6. Bung file cài đặt macOS

Mở Terminal lên

**Đối với MacOS Mojave**

```shell
# copy installer image
sudo "/Applications/Install macOS Mojave.app/Contents/Resources/createinstallmedia" --volume  /Volumes/install_osx --nointeraction

# rename (Các lệnh rename này chỉ thực hiện sau khi đã bung file xong)
sudo diskutil rename "Install macOS Mojave" install_osx
```

**Đối với MacOS High Sierra**

```shell
# copy installer image
sudo "/Applications/Install macOS High Sierra.app/Contents/Resources/createinstallmedia" --volume  /Volumes/install_osx --nointeraction

# rename
sudo diskutil rename "Install macOS High Sierra" install_osx
```

**Đối với MacOS Sierra**

```shell
# copy installer image
sudo "/Applications/Install macOS Sierra.app/Contents/Resources/createinstallmedia" --volume  /Volumes/install_osx --applicationpath "/Applications/Install macOS Sierra.app" --nointeraction

# rename
sudo diskutil rename "Install macOS Sierra" install_osx
```

**Đối với MacOS El Capitan**

```shell
# copy installer image
sudo "/Applications/Install OS X El Capitan.app/Contents/Resources/createinstallmedia" --volume  /Volumes/install_osx --applicationpath "/Applications/Install OS X El Capitan.app" --nointeraction

# rename
sudo diskutil rename "Install OS X El Capitan" install_osx
```

**Đối với MacOS Yosemite**

```shell
# copy installer image
sudo "/Applications/Install OS X Yosemite.app/Contents/Resources/createinstallmedia" --volume  /Volumes/install_osx --applicationpath "/Applications/Install OS X Yosemite.app" --nointeraction

# rename
sudo diskutil rename "Install OS X Yosemite" install_osx
```

**Đối với MacOS Mavericks**

```shell
# copy installer image
sudo "/Applications/Install OS X Mavericks.app/Contents/Resources/createinstallmedia" --volume  /Volumes/install_osx --applicationpath "/Applications/Install OS X Mavericks.app" --nointeraction

# rename
sudo diskutil rename "Install OS X Mavericks" install_osx
```



-----

Làm được đến đây là các bạn đã hoàn thành tạo 1 chiếc USB theo cách truyền thống nhất, một chiếc USB cài Hackintosh siêu sạch. Trong bài tiếp theo mình sẽ cài đặt MacOS từ chiếc USB này, các bạn nếu có quan tâm thì hãy theo dõi nhé :muscle: :muscle: