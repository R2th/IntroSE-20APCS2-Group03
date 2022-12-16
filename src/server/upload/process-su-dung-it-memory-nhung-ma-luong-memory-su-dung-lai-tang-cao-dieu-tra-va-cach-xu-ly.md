## Lời mở đầu
Bài viết này sẽ giới thiệu về nội dung xử lý và nội dung điều tra khi lượng sử dụng memory có xu hướng tăng lên

## Bắt đầu điều tra
### Check bằng lệnh free
```
$ free -m
total used free shared buffers cached
Mem: 7986 7657 329 33 99 312
-/+ buffers/cache: 7246 740
Swap: 0 0 0
```
Lượng memory sử dụng là 7246MB

### Sử dụng lệnh top, sau đó sử dụng shift+m
```
top - 12:40:32 up 36 days, 12:26, 1 user, load average: 0.00, 0.01, 0.05
Tasks: 96 total, 1 running, 95 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.0%us, 0.0%sy, 0.0%ni,100.0%id, 0.0%wa, 0.0%hi, 0.0%si, 0.0%st
Mem: 8178636k total, 7832896k used, 345740k free, 101484k buffers
Swap: 0k total, 0k used, 0k free, 319688k cached
 
PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND
17350 apache 20 0 658m 43m 27m S 0.0 0.6 0:00.07 httpd
7983 root 20 0 547m 36m 28m S 0.0 0.5 0:26.69 httpd
17351 apache 20 0 656m 35m 21m S 0.0 0.5 0:00.05 httpd
17357 apache 20 0 655m 35m 21m S 0.0 0.4 0:00.03 httpd
17364 apache 20 0 655m 35m 21m S 0.0 0.4 0:00.03 httpd
17367 apache 20 0 655m 35m 21m S 0.0 0.4 0:00.03 httpd
```

### Check bằng lệnh ps
```
$ ps aux --sort -rss
USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
apache 17350 0.0 0.5 673948 45024 ? S 12:35 0:00 /usr/sbin/httpd
root 7983 0.0 0.4 560160 37628 ? Ss Jul12 0:26 /usr/sbin/httpd
apache 17351 0.0 0.4 671812 36808 ? S 12:35 0:00 /usr/sbin/httpd
apache 17357 0.0 0.4 671548 36244 ? S 12:35 0:00 /usr/sbin/httpd
apache 17364 0.0 0.4 671548 36244 ? S 12:38 0:00 /usr/sbin/httpd
apache 17367 0.0 0.4 671548 36244 ? S 12:38 0:00 /usr/sbin/httpd
```

```
$ ps aux | grep http[d] | awk '{sum += $6}END{print sum}'
354656
```

```
$ ps aux | awk '{sum += $6}END{print sum}'
423172
```

Từ trên chúng ta thấy là hầu hết các process sử dụng ram là process apache
Memory mà apache sử dụng là 350MB trong tổng số 420MB tất cả. Ngoài ra những process khác sử dụng nhiều memory thì không kiểm tra được, memory có 8GB nhưng đang được sử dụng hơn 7GB ở đâu thì không xác định được 

## Điều tra thêm
### Check /proc/meminfo
```
$ cat /proc/meminfo
MemTotal: 8178636 kB
MemFree: 329704 kB
MemAvailable: 7933908 kB
Buffers: 101508 kB
Cached: 319688 kB
SwapCached: 0 kB
Active: 352156 kB
Inactive: 171592 kB
Active(anon): 133500 kB
Inactive(anon): 3700 kB
Active(file): 218656 kB
Inactive(file): 167892 kB
Unevictable: 0 kB
Mlocked: 0 kB
SwapTotal: 0 kB
SwapFree: 0 kB
Dirty: 16 kB
Writeback: 0 kB
AnonPages: 102596 kB
Mapped: 56084 kB
Shmem: 34644 kB
Slab: 7275828 kB
SReclaimable: 7260244 kB
SUnreclaim: 15584 kB
KernelStack: 2144 kB
PageTables: 17844 kB
NFS_Unstable: 0 kB
Bounce: 0 kB
WritebackTmp: 0 kB
CommitLimit: 4089316 kB
Committed_AS: 567432 kB
VmallocTotal: 34359738367 kB
VmallocUsed: 0 kB
VmallocChunk: 0 kB
AnonHugePages: 0 kB
HugePages_Total: 0
HugePages_Free: 0
HugePages_Rsvd: 0
HugePages_Surp: 0
Hugepagesize: 2048 kB
DirectMap4k: 12288 kB
DirectMap2M: 8376320 kB
```
free với lệnh slab có kết quả khá tương đồng nhau.
Về slab thì có thể check được bằng lệnh slabtop

### Check bằng lệnh slabtop
```
$ sudo slabtop -o
Active / Total Objects (% used) : 38093976 / 38119814 (99.9%)
Active / Total Slabs (% used) : 1810659 / 1810659 (100.0%)
Active / Total Caches (% used) : 70 / 95 (73.7%)
Active / Total Size (% used) : 7157985.37K / 7161389.12K (100.0%)
Minimum / Average / Maximum Object : 0.01K / 0.19K / 8.00K
 
OBJS ACTIVE USE OBJ SIZE SLABS OBJ/SLAB CACHE SIZE NAME
37903551 37903488 99% 0.19K 1804931 21 7219724K dentry
82602 66428 80% 0.10K 2118 39 8472K buffer_head
21669 21544 99% 1.01K 699 31 22368K ext4_inode_cache
17664 14154 80% 0.06K 276 64 1104K kmalloc-64
14994 13418 89% 0.19K 714 21 2856K kmalloc-192
14042 14042 100% 0.12K 413 34 1652K kernfs_node_cache
9996 8100 81% 0.04K 98 102 392K ext4_extent_status
9352 9352 100% 0.55K 334 28 5344K inode_cache
6630 5865 88% 0.08K 130 51 520K anon_vma
4592 4499 97% 0.57K 164 28 2624K radix_tree_node
4165 4165 100% 0.05K 49 85 196K ftrace_event_field
4088 4088 100% 0.07K 73 56 292K Acpi-Operand
2560 2560 100% 0.02K 10 256 40K kmalloc-16
2176 2176 100% 0.03K 17 128 68K kmalloc-32
2048 2048 100% 0.01K 4 512 16K kmalloc-8
1920 1223 63% 0.25K 60 32 480K kmalloc-256
1836 1836 100% 0.04K 18 102 72K Acpi-Namespace
1722 1722 100% 0.09K 41 42 164K kmalloc-96
1344 1044 77% 0.12K 42 32 168K kmalloc-128
1222 1075 87% 0.61K 47 26 752K proc_inode_cache
1058 1058 100% 0.09K 23 46 92K trace_event_file
884 884 100% 0.12K 26 34 104K jbd2_journal_head
512 503 98% 0.50K 16 32 256K kmalloc-512
512 512 100% 1.00K 16 32 512K kmalloc-1024
512 480 93% 2.00K 32 16 1024K kmalloc-2048
512 512 100% 0.02K 2 256 8K jbd2_revoke_table_s
504 448 88% 0.88K 14 36 448K mm_struct
504 504 100% 0.64K 21 24 336K shmem_inode_cache
408 408 100% 0.32K 17 24 136K request_sock_TCP
406 319 78% 0.27K 14 29 112K tw_sock_TCP
360 262 72% 1.06K 12 30 384K signal_cache
336 336 100% 0.14K 12 28 48K ext4_groupinfo_4k
325 310 95% 0.62K 13 25 208K sock_inode_cache
320 320 100% 0.25K 10 32 80K dquot
299 299 100% 0.69K 13 23 208K files_cache
261 261 100% 0.27K 9 29 72K tw_sock_TCPv6
256 256 100% 0.03K 2 128 8K jbd2_revoke_record_s
256 256 100% 0.06K 4 64 16K ext4_free_data
224 224 100% 0.07K 4 56 16K ext4_io_end
219 219 100% 0.05K 3 73 12K Acpi-Parse
204 204 100% 0.08K 4 51 16K Acpi-State
198 114 57% 0.36K 9 22 72K blkdev_requests
195 179 91% 2.06K 13 15 416K sighand_cache
192 192 100% 0.06K 3 64 12K kmem_cache_node
175 175 100% 0.16K 7 25 28K sigqueue
170 170 100% 0.94K 5 34 160K UNIX
170 170 100% 0.05K 2 85 8K jbd2_journal_handle
165 165 100% 2.05K 11 15 352K idr_layer_cache
152 140 92% 7.31K 38 4 1216K task_struct
136 119 87% 1.88K 8 17 256K TCP
135 93 68% 2.06K 9 15 288K TCPv6
128 128 100% 0.25K 4 32 32K kmem_cache
104 80 76% 4.00K 13 8 416K kmalloc-4096
78 78 100% 0.81K 2 39 64K bdev_cache
78 78 100% 0.20K 2 39 16K file_lock_cache
78 78 100% 0.10K 2 39 8K blkdev_ioc
74 74 100% 0.21K 2 37 16K ip4-frags
68 68 100% 0.94K 2 34 64K UDP
64 64 100% 0.12K 2 32 8K ext4_allocation_context
63 63 100% 0.38K 3 21 24K mnt_cache
60 60 100% 1.06K 2 30 64K UDPv6
50 50 100% 0.62K 2 25 32K dio
48 48 100% 0.32K 2 24 16K taskstats
48 48 100% 0.32K 2 24 16K request_sock_TCPv6
36 36 100% 0.88K 1 36 32K mqueue_inode_cache
31 31 100% 0.26K 1 31 8K numa_policy
28 28 100% 0.57K 1 28 16K hugetlbfs_inode_cache
16 16 100% 8.00K 4 4 128K kmalloc-8192
15 15 100% 2.06K 1 15 32K dmaengine-unmap-256
14 14 100% 2.22K 1 14 32K blkdev_queue
0 0 0% 0.09K 0 42 0K dma-kmalloc-96
0 0 0% 0.19K 0 21 0K dma-kmalloc-192
```
Từ trên chúng ta thấy được dentry đang được sử dụng 7219724Kb. [Dentry] là tên file, directory chứa cầu trúc lỗi đang được cache lại đây
Memory đang được chứa ở đây tiếp tục lại phát sinh tiếp và dẫn tới là một phần memory trở thành lượng đang được sử dụng
Hiện tượng này là do sử dụng find hoặc updatedb 

Ngoài ra có thể là do sử dụng version cũ của NSS cũng có thể là nguyên nhân phát sinh

## Nội dung đối ứng
### xoá dentry cache
```
$ sudo slabtop -o | grep dentry
or
$ sudo cat /proc/slabinfo | grep dentry
```

### giải phóng dentry cache
```
$ echo 2 >> /proc/sys/vm/drop_caches
```

### trường hợp NSS Softtoken cũ
Confirm và update version
```
$ yum list nss-softokn # 3.16.0 またはそれ以上であることを確認
$ sudo yum update -y nss-softokn # アップデート
```

Enable NSS_SDB_USE_CACHE
```
$ echo "export NSS_SDB_USE_CACHE=YES" >> /etc/sysconfig/httpd
$ sudo service httpd restart
```

## Kết quả
### Trước khi thực hiện
```
$ sudo slabtop -o | grep dentry 
34404909 34404909 100% 0.19K 1638329 21 6553316K dentry
```

### Sau khi thực hiện
```
$ sudo slabtop -o | grep dentry 
11571 9304 80% 0.19K 551 21 2204K dentry
```

```
$ free -m
total used free shared buffers cached
Mem: 7986 513 7473 36 133 142
-/+ buffers/cache: 238 7748
Swap: 0 0 0
```
dentry cache đã được giải phóng

## Kết luận
Trường hợp sử dụng memory tăng cao có thể không phải do nguyên nhân là process mà có thể do slab 

Tham khảo
https://dev.classmethod.jp/cloud/aws/dentry-cache/