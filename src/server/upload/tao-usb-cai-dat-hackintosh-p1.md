Chào các bạn, Như đề cập trong phần tiêu đề thì trong bài viết này mình sẽ giới thiệu cho các bạn về các cách có thể tạo 1 chiếc USB cài đặt Hackintosh: Cụ thể về Hackintosh là gì các bạn có thể xem qua trong bài viết trước đó của mình [Giới thiệu về Hackintosh](https://viblo.asia/p/gioi-thieu-ve-hackintosh-1Je5EvnyKnL) :laughing:.

Về tổng quan, chúng ta sẽ có 3 cách để có thể tạo được USB này:
+ Cách 1: Bung file DMG đã làm tất cả mọi thứ từ A đến Z vào USB
+ Cách 2: Sử dụng công cụ Unibeast của các kỹ sư trên trang [tonymacx86.com](https://www.tonymacx86.com/)
+ Cách 3: Làm thủ công từ A đến Z (**Cách được khuyến khích sử dụng nhất**)

**Lưu ý:** USB của các bạn nên từ 8GB+ nhé. 

Còn chờ gì nữa, Let's go !!! :muscle: :muscle: 

-----

## Cách 1: Bung file DMG làm sẵn

Nếu trước đây các bạn từng đi cài win dạo thì chắc hẳn có biết đến kỹ thuật **"GHOST"** máy tính. Mọi dữ liệu về hệ điều hành hay dữ liệu nói chung sẽ được nén thành 1 file GHOST có đuôi .GHO như là 1 file backup . Và khi bạn bung file .GHO ra hay nôm na là giải nén ra ổ cứng của các bạn thì khi đó dữ liệu đã được backup trong file .GHO sẽ được ghi mới lên ổ cứng. Và trên MacOS, file .GHO đó tương tự chính là file **".DMG"**. Trên thị trường hiện nay có rất nhiều các kỹ sư, lập trình viên trên toàn thế giới đã làm sẵn cho chúng ta những bản backup này. 
Nhưng nổi tiếng và uy tín nhất mà mình từng biết thì đó là **HackintoshZone** của **Niresh** - một anh chàng rất có tiếng trong giới Hackintosh.

Cụ thể địa chỉ các sản phẩm của Niresh có tại: [HackintoshZone](https://www.hackintoshzone.com/profile/1-niresh/content/?type=downloads_file&change_section=1)

![](https://images.viblo.asia/a327e72b-e457-4c75-b88d-10b8c9e57d06.png)

### 1. Tải file .DMG

Trên trang này chúng ta có thể bắt gặp rất nhiều phiên bản MacOS đã được làm sẵn, chẳng hạn như trên hình mình sẽ chọn phiên bản Hackintosh Mojave - phiên bản cài đặt của MacOS Mojave 10.14. Các bạn sẽ tải về bản .zip như hình dưới 

![](https://images.viblo.asia/2f0b6130-e0b6-4c83-8dc5-d3bc3b594da1.png)

Giải nén file .zip sẽ có 1 file tên "Niresh Mojave.torrent", Mở file này lên để tải về file "Niresh-Mojave.DMG"

![](https://images.viblo.asia/b674bbe3-a42e-476c-a159-6d98f7501b9c.png)

![](https://images.viblo.asia/5d716e84-f2a4-45e0-af12-13bd9d118aac.png)


### 2. Tải công cụ tạo bộ cài và restore USB

Phổ thông nhất chúng ta có thể sử dụng đó là công cụ **Transmac** cho windows. Hoặc bất cứ phần mềm nào cho phép ghi file .DMG lên USB.
Các bạn có thể tải Transmac về theo địa chỉ sau: [Transmac](https://www.acutesystems.com/scrtm.htm)

Sau khi đã có transmac trên máy, các bạn mở lên, tiến hành format lại USB theo chuẩn định dạng HFS+ của Apple bằng cách chuột phải vào USB chọn "Format Disk For Mac".

![](https://images.viblo.asia/9615d65c-5a61-4a55-9393-7467b6b27a80.png)

![](https://images.viblo.asia/8022b5cd-2354-4dd6-904e-674f03b5b180.png)

Một khi đã format thành công, tiếp theo chúng ta sẽ tiến hành ghi file .DMG lên USB bằng cách chuột phải vào USB chọn "Restore with Disk Image"

![](https://images.viblo.asia/90017394-b2fd-4531-8dfb-e6315cfa7d54.png)

Cửa sổ hiện lên, các bạn chọn file .DMG vừa download được ở trên vào. Quá trình restore sẽ diễn ra, thời gian khoảng từ 20-25p tuỳ máy

![](https://images.viblo.asia/b36a4c0a-28e5-4633-bd91-017d6ffae012.png)

Xong, vậy là theo cách 1 các bạn đã có thể tạo được 1 chiếc USB cài đặt Hackintosh siêu dễ ngay trên Windows, bây giờ bạn đã có thể cài đặt được ngay. Đặt BIOS phải boot chế độ UEFI nhé  !!

![](https://images.viblo.asia/707dc6d8-80ca-44bd-ae1d-d9eaa62755d7.png)


## Cách 2: Sử dụng công cụ Unibeast

Không giống với cách 1, từ cách 2 trở đi bạn bắt buộc phải có 1 máy đã chạy Hackintosh / 1 máy mac thật / hoặc ít nhất có 1 máy windows cài máy ảo MacOS. Tại sao ?? Bởi vì Unibeast là công cụ chỉ chaỵ trên hệ điều hành MacOS.

Để có thể cài máy áo chạy MacOS trên windows các bạn có thể dễ dàng tìm kiếm được kết quả trên Google. Chẳng hạn như bài hướng dẫn này: [Hackintosh Virtualbox](https://www.youtube.com/watch?v=76Vk6OSgoF4)

OK, Vậy là bây giờ trường hợp là tối thiểu bạn đã có 1 máy chạy MacOS rồi nhé. Chúng ta tiếp tục.

### 1. Tải bộ cài từ Apple

Trước khi tải công cụ thì trước hết chúng ta cần có bộ cài chính thức từ Apple đã. Cái này các bạn có thể tải về trực tiếp từ App Store, file cài đặt sẽ có định dạng "Install macOS + tên_phiên_bản_macOS.app", tuy nhiên đó sẽ là phiên bản mới nhất.  Tải theo : [Bộ cài đặt MacOS](https://maclife.vn/mac-application/bo-cai-dat-mac) thì các bạn có thể tải bất cứ phiên bản MacOS nào mong muốn, cho dù đã cũ.

Ở đây mình chọn phiên bản Mac 10.14

![](https://images.viblo.asia/150939e9-0d74-479a-8da4-0b68154a09da.png)

Sau khi tải về, các bạn sẽ có 1 file .DMG như hình dưới

![](https://images.viblo.asia/9600c26a-7303-466e-8924-bd04da89d1a5.png)

Mở lên, các bạn sẽ có file cài đặt từ Apple, kéo file đó vào thư mục application bên cạnh

![](https://images.viblo.asia/cc574d01-d809-4f11-bf72-8bbc84cd29d0.png)

Vậy là xong bước 1

### 2. Format USB 

Chỉ riêng format USB trên MacOS cũng có 2 cách:

+ Sử dụng Disk Utility
+ Sử dụng Terminal

Tuy nhiên khuyến cáo là nên dùng cách Terminal, và trong bài này mình cũng sẽ sử dụng cách này. Format USB cần chia ra 2 phân vùng riêng biệt: 

+ Tuỳ chọn 1: Định dạng MBR với 1 phân vùng FAT32 để boot và một phân vùng HFS+J cho bộ cài MacOS.
+ Tuỳ chọn 2: Định dạng GPT với 1 phân vùng HFS+J cho bộ cài MacOS (phân vùng để boot được tạo tự động gọi là phân vùng EFI).

Ở đây, cũng khuyến cáo là nên sử dụng tuỳ chọn 1 :+1: Lí do: Định dạng MBR có thể sử dụng cho ổ cứng MBR và GPT. Còn nếu dùng tuỳ chọn 2 định dạng GPT thì chỉ có thể sử dụng cho ổ cứng định dạng GPT mà không thể đối với MBR.

Cắm USB của các bạn vào máy, bật Terminal lên, gõ lệnh: 

```
diskutil list
```

Như máy của mình, nó sẽ hiện như sau: 

```
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *120.0 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:                  Apple_HFS Sierra                  119.2 GB   disk0s2
   3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3

/dev/disk1 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *500.1 GB   disk1
   1:                        EFI EFI                     209.7 MB   disk1s1
   2:                  Apple_HFS DATA                    499.8 GB   disk1s2

/dev/disk2 (disk image):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     Apple_partition_scheme                        +7.2 GB     disk2
   1:        Apple_partition_map                         32.3 KB    disk2s1
   2:                  Apple_HFS UltraEdit EL v18.00 ... 7.2 GB     disk2s2

/dev/disk3 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *15.5 GB    disk3
   1:                 DOS_FAT_32 CLOVER EFI              209.7 MB   disk3s1
   2:                  Apple_HFS install_osx             15.3 GB    disk3s2
```

Như các bạn có thể thấy, USB của mình là /dev/disk3 (external, physical)

***Đối với các bạn chọn tuỳ chọn 1, gõ lệnh như nhau***: 

```
diskutil partitionDisk /dev/disk3 2 MBR FAT32 "CLOVER EFI" 200Mi HFS+J "install_osx" R
```

Giải thích: 

+ /dev/disk3 2 MBR: Chia USB làm 2 phân vùng theo kiểu MBR
+ FAT32 "CLOVER EFI" 200Mi: Phân vùng thứ nhất định dạng FAT32 có tên là "CLOVER EFI" với dung lượng 200MB 
+ HFS+J "install_osx" R: Phân vùng thứ 2 định dạng HFS+J có tên là "install_osx" với dụng lượng còn lại trong USB

Sau khi chạy xong, Terminal sẽ hiện ra kết quả: 

```
/dev/disk3 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *15.5 GB    disk3
   1:                 DOS_FAT_32 CLOVER EFI              209.7 MB   disk3s1
   2:                  Apple_HFS install_osx             15.3 GB    disk3s2
```

***Đối với các bạn chọn tuỳ chọn 2, gõ lệnh như nhau***: 

```
diskutil partitionDisk /dev/disk3 1 GPT HFS+J "install_osx" R
```

Giải thích: 

+ /dev/disk3 1 GPT: Chia USB làm 1 phân vùng theo kiểu GPT (phân vùng EFI tự động được tạo với dung lượng 200MB)
+ HFS+J "install_osx" R: Phân vùng định dạng HFS+J có tên "install_osx" với dung lượng còn lại trong USB 

Sau khi chạy xong, Terminal sẽ hiện ra kết quả: 

```
/dev/disk3 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *15.5 GB    disk3
   1:                        EFI EFI                     209.7 MB   disk3s1
   2:                  Apple_HFS install_osx             15.3 GB    disk3s2
```

Vậy là xong bước 2 !!!
### 3. Ghi dữ liệu cho 2 phân vùng sau khi format 

Truy cập địa chỉ: [tonymacx86 Tools](https://www.tonymacx86.com/resources/categories/tonymacx86-downloads.3/) , tải phiên bàn Unibeast tương ứng với bộ cài các bạn tải về ở bước 1. Trở lại bước 1, mình đã tải phiên bản MacOS 10.14 Mojave, nên bây giờ mình sẽ chọn phiên bản Unibeast 9.2.0

![](https://images.viblo.asia/2c99796f-0092-42cd-9f92-3df034ed8733.png)

Sau khi tải thành công, giải nén file .zip các bạn được công cụ Unibeast. Kiểm tra lại bộ cài "Install macOS <tên phiên bản>.app" các bạn chắc chắn đã copy vào thư mục Application ở bước 1 chưa.

![](https://images.viblo.asia/645ea1a6-af8e-4477-92ae-fc25b68f5391.png)

Mọi thứ OKE thì bật Unibeast lên thôi nào, Cứ continue...continue cho đến màn hình này: 

![](https://images.viblo.asia/5c3f84a2-cfef-4f3f-a865-ed1f1f27e10b.png)

thì bấm chọn install_osx rồi continue tiếp

![](https://images.viblo.asia/b4fa76c7-edc2-4466-9f40-afd836e72741.png)

Tại đây, Unibeast sẽ tự động bắt bộ cài được đặt trong Application. Đó là lí do tại sao bắt buộc bộ cài phải đặt trong thư mục Application, continue 

![](https://images.viblo.asia/0840b69d-f174-4a38-85a4-4043b22b187b.png)

Tại đây các bạn có 2 tuỳ chọn: 

+ UEFI boot mode: tuỳ chọn dành cho BIOS hỗ trợ chế độ boot UEFI và đang chạy chế độ này
+ Legacy boot mode: tuỳ chọn dành cho BIOS hỗ trợ chế độ boot UEFI nhưng đang chạy chế độ Legacy hoặc BIOS cũ không hỗ trợ kiểu UEFI boot mode

Thì ở đây tuỳ cấu hình máy các, các bạn có thể vào BIOS kiểm tra xem máy mình đang hỗ trợ chế độ boot nào. Sau đó đưa ra cú click chính xác nhé. Tại đây mình chọn chế độ UEFI do máy mình có hỗ trợ và cũng đang chạy chế độ này, continue...continue, nếu Unibeast bắt nhập password xác nhận thì các bạn bấm password vào thôi. Sau đó là chờ đợi, quá trình này có thể diễn ra 20-25p tuỳ cấu hình máy. 

![](https://images.viblo.asia/87aa42cc-dade-4c85-87cc-9be04c331035.png)

![](https://images.viblo.asia/39fee758-6067-4f4b-8f8e-f04273e9b46f.png)

Đến đây là các bạn đã tạo thành công một chiếc USB cài Hackintosh theo cách số 2. Nhớ đặt BIOS theo chuẩn các bạn chọn trong lúc dùng Unibeast nhé !!!



-----

**Trên đây mình đã hước dẫn các bạn 2 cách để các bạn có thể tạo đượcc 1 chiếc USB cài Hackintosh, còn một cách nữa hẹn các bạn trong phần 2 nhé :muscle::muscle::muscle:**