### _Bật lại máy trong Ubuntu bằng QEmu chuẩn UEFI_
Lấy ý tưởng từ QEMUBootTester nhìn thấy trong [bộ rescue boot của Anhdv](https://anhdvboot.com/) không rõ ai làm ra

## Miễn trừ trách nhiệm

**_Cảnh báo_**

- Bạn làm theo hướng dẫn này là bạn đang đối mặt với **rủi ro hỏng phân vùng và gây mất mát dữ liệu**, mình làm theo và
  cũng đã nghịch ngu và dẫn đến việc mất dữ liệu, không thể cứu được dữ liệu. **Làm hay không là lựa chọn của bạn mình
  cũng đã cảnh báo, lúc hỏng đừng đổ tại do mình xúi giục**. Bên cạnh đó mình sẽ ghi ở mỗi phần nên làm gì và tránh làm
  gì, nếu bạn tìm được thêm các giải pháp hoặc các vấn đề mà mình chưa tốt hãy **comment** để nói với mình.

## Thực hiện

Mình làm theo hướng dẫn của [K3A](https://web.archive.org/web/https://k3a.me/boot-windows-partition-virtually-kvm-uefi/)

### Step 1: Download QEmu (Đương nhiên òi =)))

- Tùy vào máy bạn là phiên bản nào, máy mình là x86_64 nên mình cài qemu-system-x86, còn một số nền tảng khác bạn tự tra
  theo máy (ARM, ...).
- Thêm package OVMF cho UEFI
- Cho nhanh copy lun: `sudo apt install qemu-system-x86 ovmf`

### Step 2: Chuẩn bị Boot thui 
> **_Mình chạy trên Ubuntu 22.04 trên máy Dell Inspiron 7591. Copy full rồi chạy xảy ra vấn đề gì mình không chịu trách nhiệm_**  
> Cấu hình máy sương sương:
> - CPU: Intel i5-9300H (8) @ 4.100GHz
> - GPU: NVIDIA GeForce GTX 1050 3 GB Max-Q
> - GPU: Intel CoffeeLake-H GT2 (UHD Graphics 630)
> - Memory: 16GB
> - SSD: BC501 NVMe SK hynix 256GB (/dev/nvme0n1) - format dạng GPT
> - HDD: WDC WD10SPZX-00Z10T0 (/dev/sda) - format dạng MBR
- **_Part 1_** : Dựng command cho QEmu (làm cái file sh xịn xịn nào)
  - _Step 2.1.1_: Thêm `sudo` đương nhiên rồi chúng ta sẽ cần gọi /dev để lấy các ổ đĩa, USB, ...
  - _Step 2.1.2_: Thêm `qemu-system-x86_64` hoặc `qemu-system-i386` tùy vào 64 hay 32 bit
  > **_Tham khảo thêm: [ArchWiki](https://wiki.archlinux.org/title/QEMU) và [Qemu Document](https://www.qemu.org/docs/master/system/invocation.html) để biết thêm về tùy chọn_**
  - _Step 2.1.3_: Thêm `--enable-kvm` hoặc `accel=kvm`: Cái này dùng để ảo hóa đầy đủ (Kernel-based Virtual Machine), tránh màn hình xanh bên Windows, sử dụng trực tiếp CPU của máy
  - _Step 2.1.4_: Đến lượt CPU nào. Mình sẽ sử dụng CPU của host thay vì CPU ảo của QEmu `-cpu host`. Tiếp theo mình sẽ lấy 4 CPU (2 cores, 2threads) là tùy chọn `-smp 4,cores=2,threads=2` 
  - _Step 2.1.5_: Giờ là RAM, máy 16GB nên lấy 8000 thui `-m 8000`
  - _Step 2.1.6_: Tiếp theo là giao diện cửa sổ, có vài lựa chọn như:
      - `gtk`: Mình xài cái này, 1 cửa sổ có đủ menu
      - `sdl`: Mình thấy nó khá giống `gtk` nhưng bỏ đi cái menu
      - Và còn vài cái nữa phụ thuộc vào máy bạn, xem bằng lệnh: `qemu-system-x86_64 -display help`  nhưng mình máy mình chỉ xài được 2 cái trên mà không cần cài thêm nên mình xài `-display gtk`
  -  _Step 2.1.7_: Chọn VGA, `-vga virtio` thôi máy mình mấy cái khác còn chả xuất hình nữa. Để xem thì vẫn tương tự như trên `qemu-system-x86_64 -vga help`
  -  _Step 2.1.8_: Chọn sound card. Tuy cái này bị deprecated rồi nhưng chúng ta vẫn phải tra bằng cách `qemu-system-x86_64 -soundhw help`. WIndows hiện tại sẽ tự động nhận hda (High Definition Audio).   
  Bạn nghĩ bạn sẽ dùng `-soundhw hda` ư? Câu trả lời là không. Bạn sẽ dùng `-device intel-hda -device hda-duplex` 🙃.  
  Máy bạn thích hợp xài cái nào thì bạn sẽ xài lệnh `qemu-system-x86_64 -soundhw [tên-card]` trước, sau đó nó sẽ ra dòng đại loại kiểu  
  ```qemu-system-x86_64: warning: '-soundhw hda' is deprecated, please use '-device intel-hda -device hda-duplex' instead ```
 Giờ chúng ta sẽ copy đoạn  trong `''` thứ hai
    - _Step 2.1.9_: Nhét thêm USB3.0 `-device qemu-xhci,id=xhci `
     -  _Step 2.1.10_: Thêm phần bảng vẽ điện tử `-device virtio-tablet,wheel-axis=true`. Ai xài thì thêm thôi...
     -  _Step 2.1.11_: Kết nối ổ cứng. Công thức có dạng `-drive file=/dev/[tên ổ/phân vùng],media=disk,driver=raw`. Tên ổ hay phân vùng thì bạn dùng lệnh `lsblk` nha. Thường thì dùng phân vùng nào sẽ thêm phân vùng đó. Còn mình lười nên nhét cả. Đây là nội dung của lệnh `lsblk` ở máy mình. Nhìn là hiểu sao mình lười rồi đấy... múc lun  `-drive file=/dev/nvme0n1,media=disk,driver=raw -drive file=/dev/sda,media=disk,driver=raw`  
 ![](https://images.viblo.asia/2f62e8fd-04f5-4ec9-bbbc-4be8a7389c17.png)
     - _Step 2.1.12_: Thêm EFI `-drive file=/usr/share/OVMF/OVMF_CODE.fd,if=pflash,format=raw,unit=0,readonly=on -drive file=/usr/share/OVMF/OVMF_VARS.fd,if=pflash,format=raw,unit=1 -drive file=/dev/nvme0n1,media=disk,driver=raw`. Mọi người tìm trên máy và thay đường dẫn tương ứng. Theo như giải thích từ K3A thì `OVMF_CODE.fd` là để load firmware UEFI, `OVMF_VARS` là để load NVRAM. Đối với disk GPT nó sẽ load vào EFI partition đầu tiên, còn với MBR, nó sẽ load vào Active Partition (thường là partition đầu tiên đối với cả 2), vậy nên _Step 11.1_ bạn thêm cho đủ nếu không muốn lỗi không boot được.
     - _Step 2.1.13_: Passing USB. Nói trước là làm vậy (Pass - truyền), cái USB đó sẽ được giao cho máy ảo hoàn toàn, mình không thể dùng trên máy tính. Giờ mình sẽ truyền thử camera vào máy ảo. Có nhiều cách nhưng nó lằng nhằng hoặc khó hiểu, mình sẽ lấy cách nhanh nhất và dễ hiểu nhất.
         - `lsusb` để lấy device-id. Camera của mình là `Bus 001 Device 003: ID 0c45:6d12 Microdia Integrated_Webcam_HD` với vendor  id là `0x0c45` và product id là `0x6d12` 
         - Viết đối số passthrough thôi. Công thức `-usb -device usb-host,vendorid=[vendor id],productid=[product id]`. Với mình sẽ là `-usb -device usb-host,vendorid=0x0c45,productid=0x6d12`.
    - Mình chưa biết cách Passing PCI nên bước này mình xin bỏ ngỏ...
    - Và đây là kết quả của mình sau 13 bước trên:  
    ```sudo qemu-system-x86_64 --enable-kvm -cpu host -smp 4,cores=2,threads=2 -m 8000 -display gtk -vga virtio -device intel-hda -device hda-duplex -device qemu-xhci,id=xhci -device virtio-tablet,wheel-axis=true -drive file=/dev/nvme0n1,media=disk,driver=raw -drive file=/dev/sda,media=disk,driver=raw -drive file=/usr/share/OVMF/OVMF_CODE.fd,if=pflash,format=raw,unit=0,readonly=on -drive file=/usr/share/OVMF/OVMF_VARS.fd,if=pflash,format=raw,unit=1 -drive file=/dev/nvme0n1,media=disk,driver=raw -usb -device usb-host,vendorid=0x0c45,productid=0x6d12```
- **_Part 2_**: Kiểm tra trước khi boot
    -  _Step 2.2.1_: `umount` toàn bộ phân vùng liên quan. 2 luồng ghi cùng 1 lúc vào phân vùng sẽ dẫn tời phân vùng bị hỏng có thể dẫn đến mất dữ liệu, hỏng phân vùng, đặc biệt là nếu bạn boot thẳng vào vùng đang boot hiện tại thì cứ xác định là tạm biệt phân vùng đó đi, khỏi boot lần sau (Kinh nghiệm xương máu tìm khắp StackOverflow với AskUbuntu để fix).
    -  _Step 2.2.2_: Do không giả toàn bộ phần cứng được nhất là TPM(Trusted Platform Module) sinh ra để tránh bị passthrough thì mọi người không boot vào các phân vùng của [Brunch Framework](https://github.com/sebanc/brunch) (ChromeOS), Hackintosh (MacOS), ... những hệ này đòi hỏi phần cứng nghiêm ngặt cũng như về bảo mật nên không lên đâu. Đối với Windows, sử dụng local account do TPM không chạy thì Windows Hello không chạy, không đăng nhập được đâu.
    -  Đó boot thôi, chạy lên vừa trên nào...
### Thành quả
![Booting](https://images.viblo.asia/1073e464-4aaa-40e2-bb0e-956e542165b7.png)
### Chưa hết đâu giờ mới mệt này
- **_Trường hợp boot sai partition_**
    - Ở đoạn TianoCore bấm F2  
     ![TianoCore](https://images.viblo.asia/907ae7df-d892-488d-ad98-addf9ccf829b.png)
    - Mũi tên đi xuống chọn `Boot Maintenance Manager`  và Enter
    ![Boot Maintenance Manager](https://images.viblo.asia/13474c53-c75d-4f62-bc02-f368719c3fda.png)
    - Enter tiếp  
    ![Boot Options](https://images.viblo.asia/d1a958bb-ae42-4895-a831-d7e8cc47b337.png)
    - Xuống chọn `Change Boot Order`  
    ![Boot Order](https://images.viblo.asia/2ff04b8a-4ad2-4b1e-9236-42c59d7f889b.png)
    - Enter tiếp  
    ![Change Boot Order](https://images.viblo.asia/c326de78-07c7-4b67-917d-b9698f8a48d7.png)
    - Ấn `-` (cạnh số 0 ý) để đẩy Boot Option xuống và `shift + =` (hay + ở Numpad) để đẩy Boot Option lên. Xong thì `Enter`, hủy thì `Esc`
 ![Changing](https://images.viblo.asia/3661a726-c124-40a2-bbfe-fffe9abffdba.png)
    - Ấn `ESC` cho tới khi ra đến màn hình của TianoCore mở đầu rồi chọn `Continue` thôi
 - **_Màn hình Windows bé quá không full 1920x1080 toàn 360x480 @@_**
     - Link driver màn hình Virtio [đây](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md)
     - Chọn `Latest virtio-win-guest-tools.exe` để tải về rồi cài nha
 - **_Ủa sao ở bên Windows, Office 365 đã được kích hoạt cùng Windows có xài crack đâu sao ở đây chưa active?_**
     - Đây là do không có TPM để lấy các loại dữ liệu trên đó.
     - Giải pháp mình mất rất thời gian để có thể pass through được TPM cùng dữ liệu nhưng bất thành và phải đi cầu cứu troubleshoot của anh Microsoft
     - Link [đây](https://support.microsoft.com/en-us/office/unlicensed-product-and-activation-errors-in-office-0d23d3c0-c19c-4b2f-9845-5344fedc4380). Kéo xuống gần cuối. Tải về rồi làm những gì nó hướng dẫn. Windows và Office sẽ được active lại, account đăng nhập ở Edge cũng bay theo. Tool này tool chính chủ, nói không với crack. Còn nếu bạn dùng KMS (Key Management Service) như [msguides](https://msguides.com/office-365) chẳng hạn, nó không lưu credential, không lỗi.  
     ![Microsoft Support and Recovery Assistant](https://images.viblo.asia/6f074ee7-ef08-4fc4-a662-95cca394754b.png)
 - **_Lỡ tay boot vô phân vùng Linux đang chạy rồi, cứu!!!_** (ảnh lấy từ ostechnix)
     ![Lên Busybox (initramfs)](https://ostechnix.com/wp-content/uploads/2020/08/Busybox-Initramfs-Error-On-Ubuntu.jpg)  
     - `lsblk` để lấy list phân vùng. Như ảnh trên kia, mình đang để root ở `/dev/nvme0n1p7`
     - Nhập lệnh sửa phân vùng, với mình là `fsck /dev/nvme0n1p7 -y` mọi người sẽ khác tùy vào cách chia phân vùng
     - Cầu nguyện cho mấy dữ liệu bị ghi đè không đứa nào bay màu thui, cảnh báo rồi mà🫥
     - Xong rồi thì `reboot` thôi chúc mọi người không phải đọc lại đoạn này lần nữa
 - **_Lỡ tay boot vô phân vùng của Windows đang xài rồi, cứu!!!_**
     - Mở Windows ra, vào `My Computer` hoặc `This PC`, chuột phải vào phân vùng đó, chọn Properties  
     ![This PC](https://images.viblo.asia/326c5504-ae1a-4ed8-8743-9369a7fead40.png)
     - Vào Tools chọn Check  
      ![Screenshot_20221029_205951.png](https://images.viblo.asia/6ce9923b-2c72-4d44-8d6b-16cadd3c7719.png)
      - Chọn Scan drive, chờ một lúc rồi chọn Fix.
      - Sau đó là giống 2 bước cuối của mục trên
## Thanks
- [K3A](https://github.com/k3a)
- [QEmu](https://www.qemu.org/)
- [TianoCore](https://github.com/tianocore)
- Những người nào đó đã viết các trang:
    -  [ArchWiki](https://wiki.archlinux.org/title/QEMU) 
    - [Qemu Document](https://www.qemu.org/docs/master/system/invocation.html) 
    - [Fix Busybox (initramfs)](https://ostechnix.com/how-to-fix-busybox-initramfs-error-on-ubuntu/)
    - [Unlicensed Product and activation errors in Office](https://support.microsoft.com/en-us/office/unlicensed-product-and-activation-errors-in-office-0d23d3c0-c19c-4b2f-9845-5344fedc4380) cùng tool fix lỗi active kia