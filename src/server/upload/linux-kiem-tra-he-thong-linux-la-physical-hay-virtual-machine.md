Là một quản trị viên Linux, đôi khi bạn muốn biết mình đang làm việc trên máy vật lý hay máy ảo. Đa số các bạn truy cập và quản lý máy chủ của mình từ xa. Không phải lúc nào bạn cũng có quyền truy cập vật lý vào các máy chủ của mình và thậm chí bạn có thể không thực sự biết máy chủ được đặt ở đâu. Tuy nhiên,bạn có thể kiểm tra xem hệ thống Linux của bạn là máy vật lý hay máy ảo bằng cách sử dụng một vài tiện ích Linux. Hướng dẫn này liệt kê tất cả các cách có thể để kiểm tra xem hệ thống Linux bạn đang làm việc là máy chủ vật lý hay máy chủ ảo.
# Phương pháp 1: – Sử dụng Dmidecode
**Dmidecode**, bộ giải mã bảng **DMI**, được sử dụng để tìm các thành phần phần cứng của hệ thống, cũng như các thông tin hữu ích khác như số sê-ri và phiên bản **BIOS**.

**Dmidecode** được cài đặt sẵn trên các bản phân phối Linux. Nếu chưa cài bạn có thể cài thêm chúng. Sau đây là hướng dẫn cài dmidecode trên **Ubuntu, Linux Mint**.

```
$ sudo apt-get install dmidecode
```
Kiểm tra  hệ thống  physical hay virtual machine:
```
$ sudo dmidecode -s system-manufacturer
```
Nếu hệ thống physical bạn sẽ thấy xuất ra như bên dưới:
```
Dell Inc.
```
Nếu hệ thống là virtual được tạo bởi Virtualbox, Bạn sẽ thấy xuất ra:
```
innotek GmbH
```
Nếu hệ thống virtual  được tạo bởi KVM/QEMU, thì sẽ xuất:
```
QEMU
```
Tiếp tục kiểm tra hệ thống physical or virtual.
```
$ sudo dmidecode | grep Product
```
Sample output:
```
[Physical system]

Product Name: 01HXXJ
Product Name: Inspiron N5050

[Virtual system on VirtualBox]

Product Name: VirtualBox
Product Name: VirtualBox

[Virtual system on KVM/QEMU]

Product Name: Standard PC (Q35 + ICH9, 2009)
```
Kiểm tra vài thông số physical or virtual khác:
```
$ sudo dmidecode -s system-product-name
```
Sample output:
```
[Physical system]

Inspiron N5050

[Virtual system on VirtualBox]

VirtualBox

[Virtual system on KVM/QEMU]

Standard PC (Q35 + ICH9, 2009)
```
Dùng lệnh khác lọc ra thông số manufacturer và product :
```
$ sudo dmidecode | egrep -i 'manufacturer|product'
```
Sample output:
```
[Physical system]

 Manufacturer: Intel 
 Manufacturer: Sanyo 
 Manufacturer: Not Specified
 Manufacturer: Dell Inc.
 Product Name: 01HXXJ
 Manufacturer: Dell Inc.
 Manufacturer: Dell Inc.
 Product Name: Inspiron N5050
 Manufacturer: 014F

[Virtual system on VirtualBox]

 Manufacturer: innotek GmbH
 Product Name: VirtualBox
 Manufacturer: Oracle Corporation
 Product Name: VirtualBox
 Manufacturer: Oracle Corporation

[Virtual system on KVM/QEMU]

Manufacturer: QEMU
Product Name: Standard PC (Q35 + ICH9, 2009)
Manufacturer: QEMU
Manufacturer: QEMU
Manufacturer: QEMU
Manufacturer: QEMU
```
Câu lệnh kiểm tra nhà cung cấp
```
$ sudo dmidecode | egrep -i 'vendor'
```
Sample output:
```
[Physical system]

Vendor: Dell Inc.

[Virtual system on VirtualBox]

Vendor: innotek GmbH

[Virtual system on KVM/QEMU]

Vendor: EFI Development Kit II / OVMF
```
# Phương pháp 2 – Sử dụng Facter
**Facter** là một tiện ích dòng lệnh để thu thập và hiển thị thông tin của hệ thống. Không giống như Dmidecode, Facter không được cài đặt sẵn theo mặc định. Bạn có thể cần cài đặt nó như hình dưới đây tùy thuộc vào bản phân phối Linux mà bạn sử dụng.

Trên Arch Linux, Manjaro Linux:
```
$ sudo pacman -S facter
```
Trên Fedora:
```
$ sudo dnf install facter
```
Trên CentOS, RHEL:
```
$ sudo yum install epel-release
$ sudo yum installl facter
```
Trên openSUSE:
```
$ sudo zypper install facter
```
Sau khi cài đặt xong bạn dùng lệnh sau để kiểm tra physical hay virtual machine:
```
$ facter 2> /dev/null | grep virtual
```
Nếu không làm việc bạn sử dụng sudo privileges:
```
$ sudo facter 2> /dev/null | grep virtual
```
Sample output:
```
[Physical system]

is_virtual => false
virtual => physical

[Virtual system on VirtualBox and KVM/QEMU]

is_virtual => true
virtual => kvm
```
Ngoài ra, bạn có thể dùng lệnh sau để kiểm tra:
```
$ facter virtual
Or
$ sudo facter virtual
```
Nếu là physical machine sẽ xuất:
```
physical
```
Nếu là virtual machine sẽ xuất:
```
kvm
```
# Phương pháp 3 – Sử dụng lshw
Tiện ích **lshw** là một tiện ích dòng lệnh nhỏ hiển thị thông tin phần cứng chi tiết của một hệ thống giống Unix. Nó hiển thị tất cả các chi tiết phần cứng bao gồm cấu hình bộ nhớ, phiên bản phần sụn, cấu hình mainboard, phiên bản CPU và tốc độ, cấu hình bộ nhớ đệm, tốc độ bus, v.v..

Một số bản phân phối Linux được cài đặt sẵn lshw. Nếu nó chưa được cài đặt, bạn có thể cài đặt nó như hình dưới đây.

Trên Arch Linux:
```
$ sudo pacman -S lshw
```
Trên Fedora:
```
$ sudo dnf install lshw
```
Trên RHEL , CentOS, scientific Linux:
```
$ sudo yum install epel-release
$ sudo yum install lshw
```
Trên Debian, Ubuntu, Linux Mint:
```
$ sudo apt-get install lshw
```
Trên SUSE/openSUSE:
```
$ sudo zypper in lshw
```
Sau khi cài xong bạn dùng lệnh bên dưới để kiểm tra hệ thống là physical hay virtual:
```
$ sudo lshw -class system
```
Sample output:
```
[Physical system]

sk 
 description: Portable Computer
 product: Inspiron N5050 (To be filled by O.E.M.)
 vendor: Dell Inc.
 version: Not Specified
 serial: JSQ9PR1
 width: 4294967295 bits
 capabilities: smbios-2.6 dmi-2.6 smp vsyscall32
 configuration: boot=normal chassis=portable sku=To be filled by O.E.M. uuid=44454C4C-5300-1051-8039-CAC04F505231

[Virtual system on VirtualBox]

ubuntuserver 
 description: Computer
 product: VirtualBox
 vendor: innotek GmbH
 version: 1.2
 serial: 0
 width: 64 bits
 capabilities: smbios-2.5 dmi-2.5 vsyscall32
 configuration: family=Virtual Machine uuid=78B58916-4074-42E2-860F-7CAF39B5E6F5

[Virtual system on KVM/QEMU]

centos8uefi.ostechnix.lan   
    description: Computer
    product: Standard PC (Q35 + ICH9, 2009)
    vendor: QEMU
    version: pc-q35-4.2
    width: 64 bits
    capabilities: smbios-2.8 dmi-2.8 smp vsyscall32
    configuration: boot=normal uuid=C40041DE-2E63-094C-8DCF-BBDE29170268
  *-pnp00:00
       product: PnP device PNP0b00
       physical id: 1
       capabilities: pnp
       configuration: driver=rtc_cmos
```       
Trên đây là 3 cách kiểm tra hệ thống là physical hay virtual machine. Ngoài ra còn có nhiều tiện ích khác.

Cám ơn các bạn đã theo dõi, hẹn gặp lại các bạn vào những bài sau. Thân ái và quyết thắng 🤗

Tham khảo: [Kiểm tra hệ thống Linux](https://vietcalls.com/kiem-tra-he-thong-linux-la-physical-hay-virtual-machine/)