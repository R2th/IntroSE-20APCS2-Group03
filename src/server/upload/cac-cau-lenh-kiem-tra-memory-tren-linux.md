Trên linux, có đầy đủ command cho hầu hết mọi thứ, vì GUI có thể không phải lúc nào cũng có sẵn. Khi làm việc trên server, chỉ có quyền truy cập shell và mọi thứ phải được thực hiện từ các lệnh này. Vì vậy, hôm nay chúng ta sẽ tìm hiểu các lệnh có thể được sử dụng để kiểm tra việc sử dụng bộ nhớ trên hệ thống linux. Bộ nhớ bao gồm RAM và swap.

Điều quan trọng là thường xuyên kiểm tra mức sử dụng bộ nhớ và bộ nhớ được sử dụng cho mỗi quy trình trên máy chủ để tài nguyên không bị thiếu và người dùng có thể truy cập máy chủ. Ví dụ một trang web. Nếu bạn đang chạy một máy chủ web, thì máy chủ phải có đủ bộ nhớ để phục vụ khách truy cập vào trang web. Nếu không, trang web sẽ trở nên rất chậm hoặc thậm chí ngừng hoạt động khi có lưu lượng truy cập tăng đột biến, đơn giản vì bộ nhớ sẽ bị giảm. Nó giống như những gì xảy ra trên máy tính để bàn của bạn.

## Câu lệnh Free
Câu lệnh Free là lệnh đơn giản và dễ sử dụng nhất để kiểm tra việc sử dụng bộ nhớ trên linux. Đây là một ví dụ nhanh

```
$ free -m
             total       used       free     shared    buffers     cached
Mem:          7976       6459       1517          0        865       2248
-/+ buffers/cache:       3344       4631
Swap:         1951          0       1951
```

Tùy chọn m hiển thị tất cả dữ liệu tính bằng MB. Giá trị `total` 7976 MB là tổng dung lượng RAM được cài đặt trên hệ thống, tức là 8GB. Cột `used` cho thấy dung lượng RAM đã được sử dụng bởi linux, trong trường hợp này là khoảng 6,4 GB. Output của câu lệnh này khá dễ hiểu. Cái ta cần nắm được là cột cached và buffers. Dòng thứ hai cho ta biết hiện có 4,6 GB bộ nhớ chưa được sử dụng. Đây là bộ nhớ `free` trong dòng đầu tiên được cộng thêm phần `buffers` và `cached`.

Linux có thói quen lưu trữ nhiều thứ để có hiệu năng nhanh hơn, để bộ nhớ có thể được giải phóng và sử dụng nếu cần.
Dòng cuối cùng là `swap` memory, trong trường hợp này là hoàn toàn free.

2. Câu lệnh /Proc/meminfo
Cách tiếp theo để kiểm tra việc sử dụng bộ nhớ là đọc tệp `/Proc/meminfo`. Hệ thống tệp /Proc không chứa các tệp thực. Chúng là các tệp ảo chứa thông tin động về kernel và hệ thống.

```
$ cat /proc/meminfo
MemTotal:        8167848 kB
MemFree:         1409696 kB
Buffers:          961452 kB
Cached:          2347236 kB
SwapCached:            0 kB
Active:          3124752 kB
Inactive:        2781308 kB
Active(anon):    2603376 kB
Inactive(anon):   309056 kB
Active(file):     521376 kB
Inactive(file):  2472252 kB
Unevictable:        5864 kB
Mlocked:            5880 kB
SwapTotal:       1998844 kB
SwapFree:        1998844 kB
Dirty:              7180 kB
Writeback:             0 kB
AnonPages:       2603272 kB
Mapped:           788380 kB
Shmem:            311596 kB
Slab:             200468 kB
SReclaimable:     151760 kB
SUnreclaim:        48708 kB
KernelStack:        6488 kB
PageTables:        78592 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     6082768 kB
Committed_AS:    9397536 kB
VmallocTotal:   34359738367 kB
VmallocUsed:      420204 kB
VmallocChunk:   34359311104 kB
HardwareCorrupted:     0 kB
AnonHugePages:         0 kB                                                                                                                           
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
DirectMap4k:       62464 kB
DirectMap2M:     8316928 kB
```
 
Kiểm tra các giá trị của MemTotal, MemFree, Buffers, Cache, SwapTotal, SwapFree.
Chúng chỉ ra các giá trị sử dụng bộ nhớ giống như lệnh free.

## vmstat
Lệnh vmstat với tùy chọn s, đưa ra số liệu thống kê sử dụng bộ nhớ giống như lệnh Proc. Đây là một ví dụ

```
$ vmstat -s
      8167848 K total memory
      7449376 K used memory
      3423872 K active memory
      3140312 K inactive memory
       718472 K free memory
      1154464 K buffer memory
      2422876 K swap cache
      1998844 K total swap
            0 K used swap
      1998844 K free swap
       392650 non-nice user cpu ticks
         8073 nice user cpu ticks
        83959 system cpu ticks
     10448341 idle cpu ticks
        91904 IO-wait cpu ticks
            0 IRQ cpu ticks
         2189 softirq cpu ticks
            0 stolen cpu ticks
      2042603 pages paged in
      2614057 pages paged out
            0 pages swapped in
            0 pages swapped out
     42301605 interrupts
     94581566 CPU context switches
   1382755972 boot time
         8567 forks
$
```

Một vài dòng trên cùng cho biết tổng bộ nhớ, bộ nhớ trống, v.v.

## Lệnh top
Lệnh trên thường được sử dụng để kiểm tra bộ nhớ và sử dụng cpu cho mỗi process. Tuy nhiên, nó cũng báo cáo tổng mức sử dụng bộ nhớ và có thể được sử dụng để theo dõi tổng mức sử dụng RAM. Các tiêu đề trên đầu ra có thông tin cần thiết. Đây là sample output

```
top - 15:20:30 up  6:57,  5 users,  load average: 0.64, 0.44, 0.33
Tasks: 265 total,   1 running, 263 sleeping,   0 stopped,   1 zombie
%Cpu(s):  7.8 us,  2.4 sy,  0.0 ni, 88.9 id,  0.9 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem:   8167848 total,  6642360 used,  1525488 free,  1026876 buffers
KiB Swap:  1998844 total,        0 used,  1998844 free,  2138148 cached

  PID USER      PR  NI  VIRT  RES  SHR S  %CPU %MEM    TIME+  COMMAND                                                                                 
 2986 enlighte  20   0  584m  42m  26m S  14.3  0.5   0:44.27 yakuake                                                                                 
 1305 root      20   0  448m  68m  39m S   5.0  0.9   3:33.98 Xorg                                                                                    
 7701 enlighte  20   0  424m  17m  10m S   4.0  0.2   0:00.12 kio_thumbnail
 ```
 
 Kiểm tra các dòng `KiB Mem` và `KiB Swap`. Chúng chỉ ra tổng số, phần được sử dụng và phần đang trống của bộ nhớ. Thông tin bộ đệm và bộ đệm cũng có mặt ở đây, giống như lệnh `free`.
 
 ## Lệnh htop
 
 Tương tự như lệnh `top`, lệnh `htop` cũng hiển thị mức sử dụng bộ nhớ cùng với nhiều chi tiết khác.
 
 ![](https://images.viblo.asia/10bebc81-07ba-47d2-9ed2-c5f009727f70.png)

Tiêu đề trên đầu hiển thị mức sử dụng cpu cùng với RAM và sử dụng bộ nhớ Swap với các số liệu tương ứng.

## Thông tin RAM

Để tìm hiểu thông tin phần cứng về RAM đã cài đặt, hãy sử dụng lệnh demidecode. Nó báo cáo rất nhiều thông tin về bộ nhớ RAM được cài đặt.

```
$ sudo dmidecode -t 17
# dmidecode 2.11
SMBIOS 2.4 present.

Handle 0x0015, DMI type 17, 27 bytes
Memory Device
        Array Handle: 0x0014
        Error Information Handle: Not Provided
        Total Width: 64 bits
        Data Width: 64 bits
        Size: 2048 MB
        Form Factor: DIMM
        Set: None
        Locator: J1MY
        Bank Locator: CHAN A DIMM 0
        Type: DDR2
        Type Detail: Synchronous
        Speed: 667 MHz
        Manufacturer: 0xFF00000000000000
        Serial Number: 0xFFFFFFFF
        Asset Tag: Unknown
        Part Number: 0x524D32474235383443412D36344643FFFFFF
```

Thông tin được cung cấp bao gồm kích thước (2048MB), loại (DDR2), tốc độ (667 Mhz), v.v.

## Kết luận

Tất cả các lệnh được đề cập ở trên làm việc từ thiết bị đầu cuối và không có gui. Khi làm việc trên máy tính để bàn với gui, việc sử dụng công cụ GUI với đầu ra đồ họa sẽ dễ dàng hơn nhiều. Các công cụ phổ biến nhất là gnome-system-Monitor trên gnome và ksysguard trên KDE. Cả hai đều cung cấp thông tin sử dụng tài nguyên về cpu, ram, trao đổi và băng thông mạng trong một đồ họa trực quan và dễ hiểu.

## Tham khảo

https://www.binarytides.com/linux-command-check-memory-usage/