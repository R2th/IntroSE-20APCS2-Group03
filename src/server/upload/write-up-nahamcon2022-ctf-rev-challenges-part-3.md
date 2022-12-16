# Intro

Và đây là phần cuối trong series write-up các rev challenges trong giải CTF Nahamcon2022. Bài này là bài mình giải ra sau cuộc thi (vì về quê nên không có máy để debug). Sau khi làm ra thì mới thấy là đúng là có máy đi chăng nữa thì cũng chưa chắc đã làm kịp vì để cài cắm, setup env thì hết một ngày, còn làm thì chỉ hết có...30 phút.

# Time Machine
> Point: 498
> 
> Rating: medium
> 
> I found this program on my grandpa's mainframe... can you help me get in?

File binary: https://mega.nz/file/P4VBTQSC#zVnmsYberEwFwezROoyy5xQWOVxMrgbXTWNzgB82LyE

hình như chỉ có hơn 20 team giải ra được, chắc là ai cũng vướng phần cài đặt 😂

Đầu tiên là check thử file binary đã:

```bash
➜  rev file time-machine
time-machine: ELF 64-bit MSB shared object, IBM S/390, version 1 (SYSV), dynamically linked, interpreter /lib/ld64.so.1, BuildID[sha1]=b67d80f8987b35168815bd37d451527f4ca05f5c, for GNU/Linux 3.2.0, not stripped
```

để ý đến cái này `IBM S/390`, đây là một kiến trúc khác so với `x86_64` và tất nhiên là không chạy được rồi.

```bash
➜  rev ./time-machine
zsh: exec format error: ./time-machine
```

nó file thực thi của một một hệ thống trông như thế này 😰

![image.png](https://images.viblo.asia/2a6a8c2a-951e-479d-a6c3-0589f2cdd323.png)

và rất tiếc là bản IDA của mình cũng không có cài CPU của kiến trúc này:

![image.png](https://images.viblo.asia/099dbe6b-e933-4b51-8870-fc171cf7cbb1.png)

vậy là ko phân tích tĩnh được rồi, chỉ còn 1 cách duy nhất là emulate cái kiến trúc này và phân tích động.

# Setup

Sau một hồi tìm kiếm thì mình phát hiện ra rằng là `qemu` có thể emulate kiến trúc này và chúng ta còn có thể cài cả Ubuntu cùng các distro khác lên đây nữa. Dựa theo bài viết này mình bắt đầu tìm cách cài thử: https://community.ibm.com/community/user/ibmz-and-linuxone/blogs/timothy-sipples1/2020/04/28/run-ubuntu-z-linuxone. Tuy nhiên sau khi run lên thì:

```bash
./time-machine: error while loading shared libraries: libcob.so.4: cannot open shared object file: No such file or directory
```

cài thêm lib vào: `sudo apt install libcob4 libcob4-dev` và chạy lại (`cob` nghĩa là đây là 1 chương trình được viết bằng ngôn ngữ `COBOL`) thì lại văng ra lỗi khác:

```bash
vigo@vigo-s390x:~$ ./time-machine 
libcob: error: version mismatch
libcob: test.cbl has version/patch level 3.1.2/0
libcob: libcob has version/patch level 2.2/0
```

Sau 1 hồi thử đủ các thứ, tìm cách cài lib mới hơn bằng `alien`, mình phát hiện ra là mình đã chọn nhầm distro và chỉ có Debian mới là chân ái. Sau đây là tóm tắt các bước để cài:

1. Đầu tiên ta cần 1 máy ảo Ubuntu, và cài package `qemu-system-s390x`
2. Tải sẵn 2 file `kernel.debian` và `initrd.debian` từ http://ftp.debian.org/debian/dists/stable/main/installer-s390x/current/images/generic/, để vào cùng thư mục.
3. Tải file iso `debian-11.3.0-s390x-netinst.iso` từ https://cdimage.debian.org/debian-cd/current/s390x/iso-cd/
4. Giờ là làm theo hướng dẫn trong link ở trên, tạo image mới:
```bash
vigo@ubuntu:~/ctf$ qemu-img create -f raw debian.img 2G
```
5. Chạy lệnh dưới rồi mở tab terminal mới, telnet vào port `4441` trên `localhost`, quá trình cài đặt Debian trong quemu trong máy ảo bắt đầu (siêu siêu lâu)
```bash
vigo@ubuntu:~/ctf$ qemu-system-s390x -machine s390-ccw-virtio -cpu max,zpci=on,msa5-base=off -serial telnet::4441,server -display none -m 1024 --cdrom debian-11.3.0-s390x-netinst.iso -kernel kernel.debian -initrd initrd.debian -drive file=debian.img,format=raw
```

![image.png](https://images.viblo.asia/263af906-850e-49a3-b2d5-58113fc77df9.png)

Có một chú ý nhỏ, phần networking cấu hình theo ví dụ ở đây: https://wiki.qemu.org/Documentation/Networking

![image.png](https://images.viblo.asia/424ed4a8-cd3c-42ea-b000-8ba5034128e7.png)

6. Few moments later, sau khi đã cài xong Debian, chúng ta chạy lệnh:
```bash
vigo@ubuntu:~/ctf$ qemu-system-s390x -machine s390-ccw-virtio -cpu max,zpci=on,msa5-base=off -smp 2 -serial telnet::4441,server -display none -m 1024 -drive file=debian.img,if=none,id=drive-virtio-disk0,format=raw,cache=none -device virtio-blk-ccw,devno=fe.0.0001,drive=drive-virtio-disk0,bootindex=1 -nic user,hostfwd=tcp::2222-:22
```

![image.png](https://images.viblo.asia/55a6b3ae-ea54-4266-b796-dd1ecc51ee2e.png)

sau đó ssh vào `localhost`, port `2222`, login thành công thì xin chúc mừng :trophy: 

![image.png](https://images.viblo.asia/3a68805c-5796-44aa-95ff-2a6c9d1dc0a0.png)

# Debug
Tìm thử trên mạng thì thấy có một write-up CTF cũng cho kiến trúc `s390x` này ở đây: https://gange666.github.io/2019/09/09/Bytectf_2019_s390_Writeup/, mình cũng làm theo các bước để có thể dump ra được `dis.txt` và `rodata.txt`, có thể tải về ở đây:

- `dis.txt`: https://mega.nz/file/ul0gxCbR#IMCWotxO_ffw-XhjHgKfkSDRoda7YtOcJsf5fLV5crU
- `rodata.txt`: https://mega.nz/file/Gp8EFJ7Q#nOi7BZhtBLAh5miYAkf70lTJURcdEJJkb9O33L6hGUk

Trước hết là chạy thử đã:

![image.png](https://images.viblo.asia/9af5884b-4b05-4f10-b3ac-8b24d7fbbc0d.png)

hmm, check lại file `dis.txt` thì thấy có rất nhiều lệnh call đến các thư viện của COBOL/hàm của hệ thống:

- `cob_display` để in ra màn hình
- `cob_sys_check_file_exist` để check xem có tồn tại file hay không
- `cob_read_next` để đọc file

nên chạy `ltrace` hoặc `strace` sẽ cho ta thêm thông tin. Run lại với `vigo@debian:~/rev$ strace ./time-machine`:

![image.png](https://images.viblo.asia/a309b474-7ed7-4f62-a42d-f79222eaf41b.png)

để ý đoạn này:
```
stat(".security.check", 0x3ffea2fe060)  = -1 ENOENT (No such file or directory)
write(1, "Missing security key... quitting"..., 34Missing security key... quitting.
```
vậy là binary sẽ check xem có file `.security.check` không. Tạo bừa 1 file tên như vậy và có nội dung `vigo` rồi chạy lại:

```bash
vigo@debian:~/rev$ vim .security.check 
vigo@debian:~/rev$ ./time-machine 
System checks complete.
Found file performing security check...
vigo     
Found password: vigo     
Incorrect password! Quitting.
```

Binary sẽ thực hiện so sánh chuỗi nên tiếp theo chúng ta dùng `ltrace` để xem:

```bash
vigo@debian:~/rev$ ltrace ./time-machine 
__libc_start_main(0x2aa12b811b0, 1, 0x3ffd077f2c8, 0x2aa12b82188 <unfinished ...>
cob_init(1, 0x3ffd077f2c8, 0x3ffd077f2d8, 0x7b46cd67075777)                                 = 0x4011
...
cob_sys_check_file_exist(0x2aa12b840e0, 0x2aa12b840f0, 0, 0)                                = 35
cob_display(0, 1, 1, 0x2aa12b83c18System checks complete.
)                                                         = 0
cob_sys_check_file_exist(0x2aa12b84108, 0x2aa12b840f0, 0x2aa131bceb0, 1)                    = 0
cob_display(0, 1, 1, 0x2aa12b83c30Found file performing security check...
)                                                         = 0
cob_open(0x2aa131cbff0, 1, 0, 0)                                                            = 0x3ff00000000
cob_read_next(0x2aa131cbff0, 0, 1, 0)                                                       = 0x3ff00000000
cob_display(0, 1, 1, 0x2aa12b84058vigo     
)                                                         = 0
cob_read_next(0x2aa131cbff0, 0, 1, 0x2aa00000001)                                           = 49
cob_close(0x2aa131cbff0, 0, 0, 0)                                                           = 0x3ff00000000
cob_display(0, 1, 2, 0x2aa12b83c60Found password: vigo     
)                                                         = 0
memcmp(0x2aa12b84128, 0x2aa12b823b6, 9, 0x2aa00000001)                                      = 1
cob_display(0, 1, 1, 0x2aa12b83c90Incorrect password! Quitting.
)                                                         = 0
cob_stop_run(0, 1, 0x2aa131bceb0, 0x2aa00000021 <unfinished ...>
__cxa_finalize(0x2aa12b84008, 0x2aa12b83bf8, 0x3ff00000001, 1)                              = 0x3ff00000000
+++ exited (status 0) +++
vigo@debian:~/rev$ 
```

Binary thực hiện so sánh bằng hàm `memcmp(0x2aa12b84128, 0x2aa12b823b6, 9, 0x2aa00000001)`, độ dài chuỗi là 9. Xem file `rodata.txt`:

```
./time-machine:     file format elf64-s390

Contents of section .rodata:
 2228 00020001 00000000 00210000 00000000  .........!......
 2238 00000000 00000000 00010000 00000000  ................
 2248 00000000 00000000 00210000 00001000  .........!......
 2258 00000000 00000000 536f6d65 7468696e  ........Somethin
 2268 67207365 656d7320 77726f6e 672e2e2e  g seems wrong...
 2278 20717569 7474696e 672e0000 53797374   quitting...Syst
 2288 656d2063 6865636b 7320636f 6d706c65  em checks comple
 2298 74652e00 466f756e 64206669 6c652070  te..Found file p
 22a8 6572666f 726d696e 67207365 63757269  erforming securi
 22b8 74792063 6865636b 2e2e2e00 4d697373  ty check....Miss
 22c8 696e6720 73656375 72697479 206b6579  ing security key
 22d8 2e2e2e20 71756974 74696e67 2e00466f  ... quitting..Fo
 22e8 756e6420 70617373 776f7264 3a200000  und password: ..
 22f8 50617373 776f7264 20636f72 72656374  Password correct
 2308 2120436f 6e74696e 75696e67 2e2e2e00  ! Continuing....
 2318 496e636f 72726563 74207061 7373776f  Incorrect passwo
 2328 72642120 51756974 74696e67 2e004865  rd! Quitting..He
 2338 79206b69 64646f2e 2e2e206c 6f6f6b73  y kiddo... looks
 2348 206c696b 6520796f 7520666f 756e6420   like you found 
 2358 69742061 66746572 20616c6c 21005375  it after all!.Su
 2368 63682061 20646973 6170706f 696e746d  ch a disappointm
 2378 656e742e 2e2e0000 596f7520 676f7420  ent.....You got 
 2388 69742120 57656c6c 20646f6e 65203c33  it! Well done <3
 2398 00006e6f 00002e73 65637572 6974792e  ..no...security.
 23a8 63686563 6b002e67 72616d70 7300626c  check..gramps.bl
 23b8 75656265 72727900 332e312e 32007465  ueberry.3.1.2.te
 23c8 73742e63 626c0000 2f2e646f 636b6572  st.cbl../.docker
 23d8 656e7600 666c6167 7b004348 45434b00  env.flag{.CHECK.
 23e8 53454352 45540000 48454c4c 4f004170  SECRET..HELLO.Ap
 23f8 72203238 20323032 32203033 3a32333a  r 28 2022 03:23:
 2408 35320000 00000000                    52......
```

Ở offset `23b6` (tương ứng với `0x2aa12b823b6`, bỏ phần `0x2aa12b8` base address) chính là password chúng ta cần tìm: `bluenberry`

sửa lại file `.security.check` và chạy lại với `strace`, lần này binary check tiếp 1 file nữa: `.gramps`

```
stat(".gramps", 0x3ffc63fda80)          = -1 ENOENT (No such file or directory)
write(1, "Such a disappointment...\n", 25Such a disappointment...) = 25
```

Lại tạo thêm file này với nội dung `vigo` và `ltrace` lại:

```
cob_sys_check_file_exist(0x2aa04e84148, 0x2aa04e840f0, 0x2aa06b61eb0, 0x2aa00000021)        = 0
cob_display(0, 1, 1, 0x2aa04e83ca8Hey kiddo... looks like you found it after all!
)                                                         = 0
cob_open(0x2aa06b710a0, 1, 0, 0)                                                            = 0x3ff00000000
cob_read_next(0x2aa06b710a0, 0, 1, 0)                                                       = 0x3ff00000000
cob_read_next(0x2aa06b710a0, 0, 1, 1)                                                       = 49
cob_close(0x2aa06b710a0, 0, 0, 0)                                                           = 0x3ff00000000
memcmp(0x2aa04e84160, 0x2aa04e841b0, 5, 0x2aa06b60b80)                                      = 1
cob_display(0, 1, 1, 0x2aa04e83cf0no
)                                                         = 0
cob_stop_run(0, 1, 0x2aa06b61eb0, 0x2aa00000021 <unfinished ...>
__cxa_finalize(0x2aa04e84008, 0x2aa04e83bf8, 0x3ff00000001, 1)                              = 0x3ff00000000
+++ exited (status 0) +++
```

Tiếp tục là lệnh call đến `memcmp`, độ dài so sánh là 5, lần này trong file `rodata.txt`  chúng ta không thấy offset `41b0` nhưng trong `dis.txt` thì lại có duy nhất 2 vị trí:

```
    18d8:	c0 30 00 00 14 6c 	larl	%r3,41b0 <b_26.4922>
    18de:	c0 20 00 00 14 41 	larl	%r2,4160 <b_54.4939>
    18e4:	c0 e5 ff ff fb 12 	brasl	%r14,f08 <memcmp@plt>
```

đây chính là đoạn `memcmp` ở trên. Còn vị trí còn lại:

```
    1c54:	c0 10 00 00 12 ae 	larl	%r1,41b0 <b_26.4922>
    1c5a:	c0 20 00 00 03 c1 	larl	%r2,23dc <a_3+0x18c>
```

kiểm tra vị trí offset `23dc` trong `rodata.txt`, tương ứng là `flag{`, độ dài 5. Mọi thứ có vẻ ăn khớp ha 😍. Vậy flow là `rodata -> buffer -> memcmp`. Và file `.gramps` cũng chính là flag chúng ta cần tìm.

Thay lại file theo chuẩn format của flag `flag{xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx}` và `ltrace` lại:
```
memcmp(0x2aa0e704160, 0x2aa0e7041b0, 5, 0x2aa0fa1bb80)                                      = 0
memcmp(0x2aa0e704165, 0x2aa0e7041b8, 4, 0x2aa0fa1bb80)                                      = 1
```

Failed ở hàm thứ 2, ta thấy param thứ 1 đã tăng thêm 5 đơn vị => `0x2aa0e704160` chính là địa chỉ của chuỗi đọc từ file `.gramps`

Lần này là so sánh 4 ký tự. Tìm `41b8` trong file `dis.txt` ta nhận thấy 1 code block sau:

```
    1c66:	c0 19 61 39 39 33 	iilf	%r1,1631140147
    1c6c:	c4 1f 00 00 12 c6 	strl	%r1,41f8 <b_27.4923>

	1c72:	c0 19 61 37 36 65 	iilf	%r1,1631008357
    1c78:	c4 1f 00 00 12 b4 	strl	%r1,41e0 <b_28.4924>
    
    1c7e:	c0 19 64 61 33 32 	iilf	%r1,1684091698
    1c84:	c4 1f 00 00 12 be 	strl	%r1,4200 <b_29.4925>
    
    1c8a:	c0 19 38 38 66 65 	iilf	%r1,943220325
    1c90:	c4 1f 00 00 12 bc 	strl	%r1,4208 <b_30.4926>
    
    1c96:	c0 19 32 30 38 65 	iilf	%r1,842020965
    1c9c:	c4 1f 00 00 12 92 	strl	%r1,41c0 <b_31.4927>
    
    1ca2:	c0 19 38 37 38 39 	iilf	%r1,943142969
    1ca8:	c4 1f 00 00 12 90 	strl	%r1,41c8 <b_32.4928>
    
    1cae:	c0 19 37 32 31 65 	iilf	%r1,926036325
    1cb4:	c4 1f 00 00 12 8e 	strl	%r1,41d0 <b_33.4929>
    
    1cba:	c0 19 63 34 30 63 	iilf	%r1,1664364643
    1cc0:	c4 1f 00 00 12 94 	strl	%r1,41e8 <b_34.4930>
    
    1cc6:	c0 19 62 63 30 62 	iilf	%r1,1650667618
    1ccc:	c4 1f 00 00 12 92 	strl	%r1,41f0 <b_35.4931>
    
    1cd2:	c0 19 65 33 37 61 	iilf	%r1,1697855329
    1cd8:	c4 1f 00 00 12 80 	strl	%r1,41d8 <b_36.4932>
    
    1cde:	c0 19 31 64 32 61 	iilf	%r1,828650081
    1ce4:	c4 1f 00 00 12 6a 	strl	%r1,41b8 <b_37.4933>
```

Theo hướng dẫn ở đây: http://www.tachyonsoft.com/inst390m.htm thì `iilf` và `strl`:
tương ứng với:
```
IILF       C0x9     Insert Immediate                               z9-109
STRL       C4xF     Store Relative                                 z10-EC
```

vậy là giá trị `828650081` sẽ được lưu vào địa chỉ `41b8`. Chú ý `828650081` là dạng thập phân, covert sang char chúng ta có:

```bash
Python 3.8.10 (default, Jun  2 2021, 10:49:15)
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> hex(828650081)[2:]
'31643261'
>>> bytes.fromhex(hex(828650081)[2:]).decode('utf-8')
'1d2a'
```

Vậy đây là một mảnh 4 ký tự trong chuỗi hash 32 ký tự của flag cuối cùng🕵️‍♂️. Tương tự cho các giá trị khác. Tuy nhiên, ta chưa biết thứ tự?

Vị trí match còn lại của `41b8` trong file như sau:

```
    18f4:	c0 10 00 00 14 36 	larl	%r1,4160 <b_54.4939>
    18fa:	41 10 10 05       	la	%r1,5(%r1)
    18fe:	a7 49 00 04       	lghi	%r4,4
    1902:	c0 30 00 00 14 5b 	larl	%r3,41b8 <b_37.4933>
    1908:	b9 04 00 21       	lgr	%r2,%r1
    190c:	c0 e5 ff ff fa fe 	brasl	%r14,f08 <memcmp@plt>
```

Tiếp tục sử dụng skill guessing, `4160` chính là đầu chuỗi flag thì ở đoạn `la	%r1,5(%r1)`, giá trị `5` chính là offset của mảnh 4 ký tự nằm trong cả chuỗi `flag{...` 😜

Tương tự ở một đoạn khác:

```
    1944:	c0 10 00 00 14 0e 	larl	%r1,4160 <b_54.4939>
    194a:	41 10 10 19       	la	%r1,25(%r1)
    194e:	a7 49 00 04       	lghi	%r4,4
    1952:	c0 30 00 00 14 3b 	larl	%r3,41c8 <b_32.4928>
    1958:	b9 04 00 21       	lgr	%r2,%r1
    195c:	c0 e5 ff ff fa d6 	brasl	%r14,f08 <memcmp@plt>
```

ta sẽ có tương ứng `25 -> 41c8`

Sau một hồi lọ mọ tìm và ghép, chúng ta có bảng sau:

```
5 -> 41b8 -> '1d2a'
9 -> 41d8 -> 'e37a'
13 -> 41e8 -> 'c40c'
17 -> 41f0 -> 'bc0b'
21 -> 41d0 -> '721e'
25 -> 41c8 -> '8789'
29 -> 41e0 -> 'a76e'
33 -> 41c0 -> '208e'
```

Ghép lại được flag cuối cùng:

`flag{1d2ae37ac40cbc0b721e8789a76e208e}`

![image.png](https://images.viblo.asia/37147179-0a67-4c2e-92af-6edd64209029.png)

P/S: Đến lúc ra flag rồi thì gdb của mình vẫn chưa compile xong 😔. Ngoài ra có thể dùng `virt-manager` để cài Debian có giao diện, đời đỡ khổ...
# End
There is no hard challenge at all!