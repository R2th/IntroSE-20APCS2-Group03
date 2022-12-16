# Giới thiệu
Quá trình khởi động hệ thống nhúng Linux bao gồm một số giai đoạn. Nhưng dù cho bạn khởi động trên máy tính để bàn x86, hay trên một máy tính nhúng lõi ARM thì quy trình này nó giống nhau một cách đáng ngạc nhiên. Bài viết này phân tích quá trình khởi động một máy tính nhúng Linux mà cụ thể là từ board *[Beagle Bone Black](https://beagleboard.org/black)*. Từ khởi động ban đầu cho tới u-boot, kernel và sau cùng là các applications trên userspace. 

# Tổng quan hệ thống nhúng Linux

Dướì góc độ phần mềm, một hệ thống nhúng Linux có thể chia thành 4 cấp độ:
* ***Bootloader***: Là một chương trình nhỏ có chức năng load hệ điều hành vào trong bộ nhớ.
* ***Linux kernel***: Kernel là nhân hệ điều hành, có nhiệm vụ quản lý tác vụ, lập lịch, quản lý memory, quản lý hardware vv..
* ***Rootfs***: Là hệ thống file system.
* ***Application***: Tập hợp các applications mà người dùng có thể tương tác trực tiếp.

Ở̀ góc độ phần cứng, một hệ thống nhúng bao gồm các thành phần:
* **Soc/Microcontroller**: Soc (System on chip) là mạch tích hợp các thành phần cần thiết của hệ thống (cpu, bus, iram, ram controller vv..) trên một chip duy nhất, đóng vai trò như bộ não của cả hệ thống.
* ***Memory chip***:
    * Persistant storage (flash): Phần lớn Soc sẽ yêu cầu một bộ nhớ lưu trữ liên tục (flash), nơi mà toàn bộ OS hoặc chương trình khởi động có thể chạy ngay khi hệ thống được reboot.
    * RAM: Random Access Memory là bộ nhớ tạm thời của máy, nơi lưu trữ thông tin hiện hành để CPU truy xuất và xử lý
* ***Các ngoại vi, ports***: I2C, SPI, UART vv..
* ***Cổng debug***: UART, JTAG
* ***GPIO ports, pins (Pinmux)***

# U-Boot Bootloader
**Das U-Boot** (hay còn được gọi tắt là u-boot) là một bootloader có mã nguồn mở được sử dụng rộng rãi trong các hệ thống nhúng nhỏ. Nó hỗ trợ sẵn cho các kiến trúc, bao gồm  **68k**, **ARM**, **Blackfin**, **MicroBlaze**, **MIPS**, **Nios**, **SuperH**, **PPC**, **RISC-V** và **x86**.

Chức năng chính của nó là khởi tạo phần cứng và load các thành phần khác của OS (linux kernel, rootfs, device tree) lên RAM và trao quyền 
lại cho linux kernel.

Ưu điểm của u-boot sở hữu dựa trên các nguyên tắc thiết kế mà nhà phát triển nó đặt ra, bao gồm:
* ***Keep it Small***
* ***Keep it Fast***
* ***Keep it Simple***
* ***Keep it Configurable***
* ***Keep it Debuggable***
* ***Keep it Usable***
* ***Keep it Maintainable***
* ***Keep it Beautiful***
* ***Keep it Open***

Để biết thêm chi tiết về các nguyên tắc thiết kế các bạn có thể tham khảo *[The 10 Golden Rules of U-Boot design](https://www.denx.de/wiki/U-Boot/DesignPrinciples)*.
# Boot Process
Boot Proccess có thể chia thành nhiều giai đoạn (**Stage**). Tuy nhiên, thông thường sẽ chỉ gồm 2 giai đoạn chính là **Single-Stage** và **Two-Stage**. Dưới đây là quá trình mô tả của **Two-Stage**.
## Soc ROM Bootloader
Khi hệ thống khởi động lần đầu tiên, hoặc reset.  Quyền kiểm soát hệ thống sẽ thuộc về reset vector, nó là một đoạn mã assembly được ghi trước bởi nhà sản xuất chip (**Manufaturer** ). Sau đó reset vector sẽ trỏ tới địa chỉ vùng nhớ chứa các đoạn mã khởi động đầu tiên, cụ thể là boot rom. Nếu không có reset vector thì bộ xử lý sẽ không biết nên thực thi bắt đầu từ đâu.

Chức năng chính của boot rom đấy chính là sao chép nội dung trong file "**MLO**"  hay còn được gọi là Second Program Loader (**SPL**) - chương trình tải phụ vào IRAM và excute nó. 

Do bộ nhớ của boot rom khá nhỏ nên rom code cũng được giới hạn ở việc khởi tạo một số phần cứng cần thiết cho việc load SPL lên hệ thống như: MMC/eMMC, SDcard, NAND flash. Các phần cứng này được gọi chung là boot device. 

Lấy ví dụ load lên từ SDcard:
![image.png](https://images.viblo.asia/f0f60878-d6ad-4b8c-b2a8-ca21387e29b6.png)

Rom code lựa chọn boot device (load từ thẻ nhớ, flash vv..) phụ thuộc vào việc cấu các pin thông qua switch/jump trên phần cứng. 
![image.png](https://images.viblo.asia/cf1d8071-6663-42d6-b3f2-b14949dd32bc.png)

## Second Program Loader (SPL)
SPL - chương trình tải phụ. Nhiệm vụ chính của SPL đó chính là tiếp tục setup các thành phần cần thiết như DRAM controler, eMMC vv.. Sau đó load U-boot tới địa chỉ **CONFIG_SYS_TEXT_BASE** của RAM.
* Hay nói ngắn gọn. Chức năng chính của SPL là để load được U-boot lên RAM.
 ![image.png](https://images.viblo.asia/253acfa0-6004-4e9c-ae3e-817bbd741315.png)

 ***Note***: *Đối với Single-Stage sẽ không có SPL.*

## U-Boot 
Sau khi được load vào RAM, u-boot sẽ thực hiện việc relocation. Di dời đến địa chỉ **relocaddr** của RAM (Thường là địa chỉ cuối của RAM) và nhảy đến mã của u-boot sau khi di dời.

Lúc này u-boot sẽ kiểm tra xem file **uEnv.txt** có tồn tại hay không. Nếu có thực hiện load nó vào RAM ở bước tiếp theo.

Bản thân uEnv.txt là một bootscript, nó định nghĩa các tham số cấu hình, kernel parameters. Các tham số này mặc định đã được cấu hình trong u-boot. Tuy nhiên chúng ta có thể thêm, sửa, xóa các cấu hình này thông qua file uEnv.txt. Việc load uEnv.txt là một sự tùy chọn (**Optional**), nghĩa là nó có thể có hoặc không.
![image.png](https://images.viblo.asia/772be7cc-05ae-422a-810b-5bac042a171a.png)

Tiếp theo u-boot sẽ tiếp tục load kernel, device tree  vào RAM tại các địa chỉ mà đã được cấu hình từ trước ở trong mã nguồn u-boot hoặc trong file uEnv.txt. Sau cùng nó sẽ truyền toàn bộ kernel parameters và nhường quyền thực thi lại cho kernel.
![image.png](https://images.viblo.asia/eef3c97e-b9d1-4957-b8f0-c12232e66ab9.png)

**Đến đây ta có thể đặt ra một số câu hỏi:**

***Tại sao lại phân chia ra Single-Stage/Two-Stage, thêm SPL vào làm gì, sao không load thẳng U-boot vào IRAM ngay từ đầu đi?***
* Một trong các lí do có thể kể tới đó chính là phụ thuộc vào từng nhà sản xuất và phần cứng. Có phần cứng chỉ cần sử dụng mã ROM là đã có thể load và khởi động u-boot. Tuy nhiên một số thiết bị khác yêu cầu phải sử dụng đến SPL.
* Nguyên nhân chính đó chính là do sự giới hạn về IRAM. Giá thành của nó không hề rẻ. Mà với tiêu chí của người dùng  *"Rẻ là đã ngon rồi :laughing:"*  nên giải pháp của nhà sx đó chính là tăng code và giảm IRAM.

***Tại sao phải thực hiện Relocation?***
* Ở các giai đoạn trước của u-boot (ROM code or SPL). Chúng sẽ tải u-boot lên RAM mà không hề biết trước kế hoạch cho các vùng nhớ mà u-boot có thể tải lên là : bản thân u-boot, kernel-image, device tree, rootfs vv..
* Nó đơn giản load u-boot lên RAM ở một địa chỉ thấp. Sau đó khi u-boot thực hiện một số khởi tạo cơ bản và phát hiện hiện tại nó không nằm ở vị trí được lập kế hoạch, chức năng relocation di chuyển u-boot đến vị trí đã lên kế hoạch và nhảy tới nó.
* Bản chất việc relocation là để đảm bảo cho u-boot, kernel-image, device tree, rootfs vv.. khi load lên RAM sẽ không bị ghi đè lên nhau. Mà được load vào một vị trí tính toán từ trước.

***U-boot thực sự ở đâu?***

Sử dụng lệnh ***bdinfo*** trong trong ***u-boot command line*** ta có được các thông tin dưới đây:

![image.png](https://images.viblo.asia/8f4047be-1b02-49e6-abc4-529a1bcef910.png)

Như vậy, sau khi được load tới một địa chỉ thấp trên RAM u-boot u-boot sẽ được relocation tới địa chỉ  relocaddr (0xDFF5D000).
```objectivec
> Dung lượng tối đa: RAM start (0x80000000) + RAM size (0x60000000) - relocaddr (0xDFF5D000) = 652KB

> Dung lượng thực tế: TLB addr (0xDFFF0000) - relocaddr (0xDFF5D000) = 588KB
```

## Linux Kernel 
Sau khi nhận được quyền kiểm soát và các kernel parameters từ u-boot. Kernel sẽ thực hiện mount hệ thống file system (**Rootfs**) và cho chạy tiến trình ***Init*** trên RAM. Đây là tiến trình được chạy đầu tiên khi hệ thống khởi động thành công và chạy cho tới khi hệ thống kết thúc. 
Tiến trình ***Init***  sẽ khởi tạo toàn bộ các tiến trình con khác trên user space, các applications tương tác trực tiếp với người dùng. Lúc này, hệ thống của chúng ta đã hoàn toàn sẵn sàng cho việc sử dụng.
![image.png](https://images.viblo.asia/fb107ebd-cfd9-4c67-a709-5214996af665.png)
# Kết Luận
Quá trình khởi động của một hệ thống nhúng có thể chia ra thành nhiều giai đoạn:
* ROM code: Mã khởi động được ghi bởi nhà sản xuất, người dùng không thể thay đổi. Chức năng chính là setup hệ thống để load SPL vào Internal RAM.
* SPL: Chương trình tải phụ. Khởi tạo các thành phần cần thiết và load u-boot vào RAM.
* U-Boot: Load các thành phần của OS (Kernel, device tree, rootfs) vào RAM, truyền kernel parameters vào trao quyền điều khiển cho kernel.
* Linux Kernel: Mount hệ thống file system (Roofs) và chạy tiến trình Init.

Lưu ý rằng, số lượng giai đoạn khởi động trên các hệ thống linux embededed có thể khác nhau. Nó có thể chia thành nhiều giai đoạn hơn hoặc thậm chí chỉ một giai đoạn duy nhất. Đ̣iều ́này phụ thuộc rất nhiều vào bài toán thiết kế và chi phí đầu tư của đơn vị sản xuất.

*[Tham khảo từ Pentester Academy TV: Embedded Linux Booting Process (Multi-Stage Bootloaders, Kernel, Filesystem)](https://www.youtube.com/watch?v=DV5SZSdK0s)*