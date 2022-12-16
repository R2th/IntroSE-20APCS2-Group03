### Giới thiệu về Control Group
Một chương trình không tin cậy khi chạy trên hệ điều hành cần được kiểm soát hoặc giới hạn, ít nhất là vì sự ổn định vào bảo mật ở một mức độ nào đó. Một lỗi khi chạy chương trình hoặc một đoạn mã xấu có thể phá vỡ toàn bộ máy và có khả năng làm tê liệt toàn bộ hệ sinh thái liên quan đến máy đó, đây chính là tiền đề cho sự ra đời của Control group (cgroup).
Cgroups được phát triển bởi Google và được tích hợp vào kernel Linux trong phiên bản 2.6.24 (phát hành tháng 1 năm 2008).

-----

### Cơ chế hoạt động
Cgroups là cơ chế đặc biệt được cung cấp bởi kernel Linux cho phép chúng ta cấp phát các kiểu tài nguyên như processor time, số processes cho mỗi group, lượng memory cho mỗi group hay kết hợp các tài nguyên đó cho một process hoặc một tập các processes. Cgroups được tổ chức theo dạng phân cấp và cơ chế này cũng tương tự như các process thông thường, vì chúng cũng được tổ chức theo dạng phân cấp và các child cgroups (hay còn được gọi là cgroups con) kế thừa một tập các tham số nhất định từ parent cgroup (cgroups cha). Nhưng thực sự thì chúng không giống nhau. Sự khác biệt chính giữa cgroups và các process thông thường đó là có rất nhiều phân cấp khác nhau của controls groups có thể tồn tại đồng thời tại một thời điểm, trong khi tree các process thông thường luôn chỉ có một phân cấp duy nhất. Phân cấp này không phải ngẫu nhiên vì mỗi phân cấp của control group đều được gắn vào tập các control group subsystems.
Một control group subsystem đại diện cho một kiểu tài nguyên như processor time hoặc số pid – hay nói cách khác là số các process dành cho một control group. Linux kernel hỗ trợ cung cấp 12 control group subsystems như sau:
1. ***cpuset***: gán bộ vi xử lý riêng và các memory nodes cho các tác vụ trong một group.
2. ***cpu***: sử dụng scheduler để cung cấp quyền truy cập các tác vụ cgroup tới tài nguyên vi xử lý
3. ***cpuacct***: tạo báo cáo về processor usage bởi một group
4. ***blkio***: đặt giới hạn read/write from/to để chặn các thiết bị.
5. ***memory***: đặt giới hạn cho việc sử dụng memory bởi các tác vụ từ một group.
6. ***devices***: cho phép truy cập tới các thiết bị bởi các tác vụ từ một group.
7. ***freezer***: cho phép pause/resume các tác vụ từ một group.
8. ***netcls***: cho phép đánh dấu các gói tin mạng từ các tác vụ trong một group.
9. ***netprio***: cung cấp một cách tự động đặt mức độ ưu tiên lưu lượng mạng cho mỗi network interface từ một group.
10. ***perfevent***: cung cấp quyền truy cập perf_event cho một group.
11. ***hugetlb***: kích hoạt hỗ trợ các pages lớn cho một group.
12. ***pid***: đặt giới hạn số lượng process cho một group.

Mỗi control group subsystem phụ thuộc vào các tùy chọn cấu hình liên quan. Ví dụ, cpuset subsystem nên được kích hoạt thông qua tùy chọn cấu hình kernel ``CONFIG_CPUSETS, blkio`` subsystem thông qua tùy chọn cấu hình kernel ``CONFIG_BLK_CGROUP``,… Tất cả những thông số cấu hình kernel có thể được tìm thấy thông qua ``/sys/fs``.
![](https://images.viblo.asia/673fe963-b49e-4094-847d-6dc705537125.png)

-----
### Sử dụng Control Group để giới hạn tài nguyên.
Có hai cách để sử dụng cgroup:
1. Cách đầu tiên là tạo thư mục con trong bất kỳ subsystem nào từ /sys/fs/cgroup và thêm một pid của tác vụ tới file tasks – là file sẽ được tạo tự động sau khi chúng ta tạo thư mục con.
2. Cách thứ hai là quản lý cgroups với các tiện ích từ thư viện libcgroup.
Trong phần này sẽ tập trung trình bày về việc sử dụng cgroup theo cách đầu tiên (phương pháp tiếp cận truyền thống).

Để sử dụng được cgroup thì chúng ta thực hiện cài đặt thư viện ``libcgroup``
Đối với các hệ điều hành như Linux hoặc CentOS sử dụng dòng lệnh sau:

```bash
$ sudo yum install libcgroup libcgroup-tools
```

Đối với các hệ điều hành như Ubuntu hoặc Debian sử dụng dòng lệnh sau:
```bash
$ sudo apt-get install libcgroup1 cgroup-tools
```
**Ví dụ về cách sử dụng**:
Tạo một file `test.sh` với nội dung như sau:
```shell-script
$ cat test.sh
#!/bin/sh

while [ 1 ]; do
        echo "hello world"
        sleep 60
done
```
Trong file này chứa một vong lặp vô hạn, trong đó in ra dòng chữ “hello world” sau đó dừng lại 60s
Sau khi cài đặt các packages hỗ trợ, chúng ta có thể cấu hình cgroup của mình trực tiếp thông qua hệ thống phân cấp `sysfs`. Chẳng hạn để tạo một nhóm có tên là `foo` trong memory subsystem chúng ta sẽ tạo một thư mục tên là foo trong `/sys/fs/cgroup/memory`.
```bash
$ sudo mkdir /sys/fs/cgroup/memory/foo
```
Theo mặc định, một cgroup được tạo mới sẽ kế thừa quyền try cập vào toàn bộ memory cgroup của hệ thống. Đối với một số ứng dụng, chủ yếu là những ứng dụng trực tiếp yêu cầu thêm bộ nhớ nhưng từ chối giải phóng những gì đã được phân bố thì việc kế thừa này chưa giải quyết được bài toán giới hạn về bộ nhớ. Do đó, để giới hạn ứng dụng ở một ngưỡng hợp lý, chúng ta sẽ cần phải cập nhật lại file `memory.limit_in_bytes`

Giới hạn mọi thứ khi chạy trong cgroup `foo` xuống còn 50MB:
```bash
$ echo 50000000 | sudo tee /sys/fs/cgroup/memory/foo/
 ↪memory.limit_in_bytes
```
Kiểm tra lại cấu hình trong file `memory.limit_in_bytes`:
```bash
$ sudo cat memory.limit_in_bytes
```
Thực hiện chạy file `test.sh` ở trên:
```bash
$ sh ~/test.sh &
```
Lấy Process ID (PID) của đoạn chương trình vừa chạy để chuyển ứng dụng vào trong cgroup `foo` dưới bộ điều khiển memory:
```bash
$ echo 2845 > /sys/fs/cgroup/memory/foo/cgroup.procs
```
Sử dụng PID bên trên để chắc chắn rằng chương trình trên đang được chạy trong cgroup `foo`
```bash
$ ps -o cgroup 2845
CGROUP
8:memory:/foo,1:name=systemd:/user.slice/user-0.slice/
↪session-4.scope
```
Bây giờ chúng ta có thể theo dõi được lượng bộ nhớ đã được phân bổ khi chạy chương trình (và các tiến trình con được sinh ra):
```bash
$ cat /sys/fs/cgroup/memory/foo/memory.usage_in_bytes
253952
```
Thay vì giới hạn bộ nhớ cho cgroup foo là 50MB như ban đầu, tiến hành giảm xuống 500 bytes:
```bash
$ echo 500 | sudo tee /sys/fs/cgroup/memory/foo/
↪memory.limit_in_bytes
```
Lúc này, nếu một tác vụ vượt quá giới hạn được cấu hình, kernel sẽ can thiệp và dừng lại tác vụ đó. Chú ý rằng bộ nhớ được cấp phát luôn là bội của 4, mặc dù cấu hình là 500 bytes nhưng thực sự đã cấp phát 4 KB.
```bash
$ cat /sys/fs/cgroup/memory/foo/memory.limit_in_bytes
4096
```
Chạy lại ứng dụng, chuyển vào trong cgroup foo và theo dõi log ta được như sau:
```bash
$ sudo tail -f /var/log/messages
Oct 14 10:22:40 localhost kernel: sh invoked oom-killer:
 ↪gfp_mask=0xd0, order=0, oom_score_adj=0
Oct 14 10:22:40 localhost kernel: sh cpuset=/ mems_allowed=0
Oct 14 10:22:40 localhost kernel: CPU: 0 PID: 2687 Comm:
[ ... ]
Oct 14 10:22:40 localhost kernel: [<ffffffff816313cc>]
 ↪dump_header+0x8e/0x214
Oct 14 10:22:40 localhost kernel: [<ffffffff8116d21e>]
 ↪oom_kill_process+0x24e/0x3b0
Oct 14 10:22:40 localhost kernel: [<ffffffff81088e4e>] ?
 ↪has_capability_noaudit+0x1e/0x30
Oct 14 10:22:40 localhost kernel: [<ffffffff811d4285>]
 ↪mem_cgroup_oom_synchronize+0x575/0x5a0
Oct 14 10:22:40 localhost kernel: [<ffffffff811d3650>] ?
 ↪mem_cgroup_charge_common+0xc0/0xc0
Oct 14 10:22:40 localhost kernel: [<ffffffff8116da94>]
 ↪pagefault_out_of_memory+0x14/0x90
↪Kill process 2845 (sh) score 0 or sacrifice child
Oct 14 10:22:40 localhost kernel: Killed process 2702 (sh)
 ↪total-vm:113124kB, anon-rss:200kB, file-rss:0kB
Oct 14 10:22:41 localhost kernel: sh invoked oom-killer:
 ↪gfp_mask=0xd0, order=0, oom_score_adj=0
[ ... ]
```
Khi ứng dụng đạt đến giới hạn 4KB, kernel đã can thiệp và dừng lại tác vụ đó ta có thể thấy ở phần log:
```javascript
↪Kill process 2845 (sh) score 0 or sacrifice child
Oct 14 10:22:40 localhost kernel: Killed process 2702 (sh)
```
-----
### Kết luận.
Vậy là mình đã giới thiệu xong cho các bạn về cgroup. Đây chính là tiền đề để giới hạn tài nguyên cho máy chấm trong các bài viết sau này.

Bài viết còn nhiều thiếu sót, kiến thức còn hạn chế, rất mong nhận được đóng góp tích cực từ các bạn.

Thank you <3