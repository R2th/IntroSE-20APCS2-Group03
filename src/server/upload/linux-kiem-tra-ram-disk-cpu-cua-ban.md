Cùng điểm qua một vài kiến thức rất gần gũi mà người dùng Linux nên biết. 

Bài viết này xoay quanh 3 chủ đề: CPU, RAM, DISK

## CPU
Nếu máy tính là một cơ thể, CPU hẳn là bộ não điều khiển, giúp cho các hành động của "cơ thể" được mượt mà. Dưới đây là một số cách kiểm tra bộ não có bình thường hay không :D 

![](https://images.viblo.asia/5497a249-30ed-411a-b02a-67521fffb112.gif)

### Kiểm tra thông tin CPU
```
$ cat /proc/cpuinfo
```
Lệnh này sẽ show toàn bộ thông tin của CPU (tên, hãng sản xuất,...) một cách khá dễ hiểu

Chúng ta có thể kết hợp với lệnh `grep` để lấy một số thông tin mình mong muốn. Có thể tham khảo về lệnh Grep: https://viblo.asia/p/tim-hieu-ve-lenh-grep-trong-linux-DZrGNNDdGVB
* Kiểm tra số physical processor - số sockets
```
$ cat /proc/cpuinfo | grep 'physical id' | uniq | wc -l

1
```
* Kiểm tra số core CPU trên máy:
```
$ cat /proc/cpuinfo | grep -c 'core id' | uniq | wc -l

4
``` 
=> Máy mình có 1 CPU, 4 core 
* Kiểm tra tổng số thread 
```
$ cat /proc/cpuinfo | grep processor | uniq | wc -l

4
```
=> 4 core, mỗi core 1 thread

**Từ đó, ta có 1 sockets * 4 cores per socket * 1 thread per core = 4 CPU(s)**
### Kiểm tra hiệu năng CPU
Có nhiều cách để kiểm tra hiệu năng CPU. Mình thường dùng lệnh `top`
```
$ top


top - 19:58:52 up 2 days, 21:53,  1 user,  load average: 1,38, 1,15, 0,87
Tasks: 293 total,   2 running, 228 sleeping,   0 stopped,   1 zombie
%Cpu(s): 16,5 us,  8,3 sy,  0,0 ni, 74,3 id,  0,1 wa,  0,0 hi,  0,8 si,  0,0 st
KiB Mem :  8015932 total,   242548 free,  6213208 used,  1560176 buff/cache
KiB Swap:   999420 total,     2896 free,   996524 used.   729080 avail Mem
```
Dòng đầu tiên cho biết:
- thời gian hiện tại là 19:58
- Server đã được bật 2 ngày
- Số user đang login : 1 
- Load trung bình của server trong 5/10/15 phút lần lượt là 1,38, 1,15, 0,87 ***phần này khá quan trọng và mình sẽ nói cụ thể hơn bên dưới***

Dòng số 2 cho biết  có số lượng tiến trình đang hoạt động

Dòng số 3: cho biết tình trạng sử dụng CPU. 16.5 us, 8,3 sy nghĩa là user dùng 16.5% và system dùng 8,3%

Tiếp theo là các thông tin về RAM và SWAP mình sẽ nói cụ thể hơn ở phần RAM bên dưới
### Load avg CPU
Có một thông số đáng chú ý là Load avg của CPU tạm dịch là trung bình tải hoặc tải trung bình của CPU

Ở ví vụ trên, chúng ta có `load average: 1,38, 1,15, 0,87`. Vậy hiểu con số này như thế nào?

Load avg có thể hiểu là **TỔNG** số lượng process trung bình trong hàng chờ của CPU. Load avg thường được biểu diễn dưới dạng 3 con số, là trung bình trong 5-10-15 phút. Ở đây mình có 4 CPU có nghĩa và load avg trong 5 phút là 1.38. Có nghĩa là Load avg / 1 CPU là 
```
1.38/4 =0.345
```

Con số này càng cao thì số lượng process phải chờ CPU xử lí càng nhiều. Phải hiểu rằng, tại 1 thời điểm, 1 cpu chỉ có thể thực thi 1 process. Những process khác sẽ phải chờ đến khi CPU rảnh mới có thể được thực hiện. Cần phân biệt con số này với % sử dụng CPU.
* % sử dụng CPU cho biết 1 process sử dụng CPU nhiều hay ít
* Load avg thế hiện số process phải chờ CPU nhiều hay ít

Nắm được 2 con số này sẽ giúp ta đánh giá được hiệu quả hoạt động của CPU và có những giải pháp thích hợp. 
Ví dụ như với một máy chủ lưu trữ image dùng chung, hoặc 1 máy chủ LB, không cần xử lí nhiều Logic, chùng ta không cần CPU quá mạnh nhưng sẽ cần nhiều luồng để xử lí nhiều request đồng thời

Đối với việc theo dõi Load avg của CPU, các quản trị viên thường lấy mốc 0.7 /1CPU làm mốc. Nếu vượt ngưỡng này, cần phải theo dõi và có những giải pháp thích hợp (tăng cpu, tăng luồng,..).

## RAM
### Memory và cache
Linux có xu hướng "cache cả thế giới" để tăng tốc độ xử lí, RAM thường xuyên được giải phóng và lưu tạm vào đĩa để sử dụng khi cần.

Điều này có nghĩa là khi chúng ta mở một process lên và tắt nó đi, hệ thống sẽ cache lại vùng nhớ này để khi ta gọi process một lần nữa, nó sẽ sử dụng ngay lập tức vùng nhớ này thay vì cấp phát lại. Càng mở nhiều process sau đó tắt đi, cache càng nhiều.

Khi mở một process mới, nếu hệ thống thiếu RAM, Linux sẽ chuyển cache vào SWAP để dành toàn bộ RAM cho các process đang thực thi.

Vậy muốn biết hệ thống của bạn có đang bị thiếu RAM, hãy nhìn vào chỉ số SWAP. Nếu SWAP cao nghĩa là máy đang thiếu RAM.
Một câu lệnh phổ biến để xem thông tin về RAM là:
```
$ free -m

              total        used        free      shared  buff/cache   available
Mem:           7828        3231        1179         595        3417        3705
Swap:           975           0         975
```
### Xóa cache server 
Về cách tổ chức memory, cơ chế cache và một số khái niệm bạn có thể đọc thêm ở bài viết này  https://kipalog.com/posts/Tim-hieu-to-chuc-memory-va-slab-trong-linux-kernel 
- Xóa Cache 
```
sync; echo 1 > /proc/sys/vm/drop_caches
```
- Xóa dentries và inodes (slab)
```
sync; echo 2 > /proc/sys/vm/drop_caches
```
- Xóa PageCache, dentries và inodes.
```
sync; echo 3 > /proc/sys/vm/drop_caches
```
## DISK
- Kiểm tra tình trạng Disk
```
$ df -h

Filesystem                   Size  Used Avail Use% Mounted on
udev                         3,8G     0  3,8G   0% /dev
tmpfs                        783M  2,3M  781M   1% /run
/dev/mapper/ubuntu--vg-root  227G   49G  168G  23% /
```
- Kiểm tra các phân vùng disk
```
$ lsblk

sda                     8:0    0 232,9G  0 disk 
├─sda1                  8:1    0   512M  0 part /boot/efi
└─sda2                  8:2    0 232,4G  0 part 
  ├─ubuntu--vg-root   253:0    0 231,4G  0 lvm  /
  └─ubuntu--vg-swap_1 253:1    0   976M  0 lvm  [SWAP]
sr0                    11:0    1  1024M  0 rom  
```