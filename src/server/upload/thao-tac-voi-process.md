# 1. Giới thiệu
Bài viết này sẽ xoay quanh việc tạo lập hoặc kết thúc một process, cũng như cách mà một process tạo ra một process con trong mã nguồn của mình. Ngoài ra, chúng ta sẽ tìm hiểu một cách chi tiết về hoạt động của process từ góc độ của hệ điều hành.
# 2. Tạo tiến trình mới
Trong số rất nhiều các ứng dụng hiện nay, việc tạo nhiều process (**multiple process**) để xử lý các tác vụ (**task**) giúp cho khả năng tính toán trở nên mạnh mẽ hơn. Ví dụ, Ta có một tiến trình network server lắng nghe các request từ nhiều clients khác nhau. Nó có thể tạo nhiều process con để chia nhỏ các tác vụ xử lý cho clients trong khi vẫn tiếp tục lắng nghe request từ các clients còn lại. Việc chia nhỏ task như vậy có nhiều ý nghĩa cho việc thiết kế ứng dụng, tăng khả năng xử lý vì nhiều process cùng hoạt động đồng thời. 

## 2.1. System call fork()

Một process mới có thể được tạo ra bằng việc sử dụng system call fork(). Process thực hiện gọi fork() được gọi là tiến trình cha (**parent process**). Process mới được tạo ra gọi là tiến trình con (**child process**).

Prototype của fork() như sau:
```c
#include <unistd.h>
/**
* @return 
*/
pid_t fork(void);
```

Như đã đề cập từ bài trước, ̣ memory layout của một process sẽ bao gồm các segments: **text**, **data**, **heap**, **stack**. Sau khi lời gọi hàm fork() thành công, nó sẽ tạo ra một process con gần như giống với process cha ban đầu. Hai process này chia sẻ với nhau text segment, nhưng chúng sẽ có một bản sao riêng biệt đối với các segments còn lại là data, heap và stack. Điều này có nghĩa là, khi bạn thay đổi dữ liệu trong process con sẽ không ảnh hưởng tới dữ liệu trong process cha.

![image.png](https://images.viblo.asia/3ae701ad-3976-4c6b-bd0e-5527e8aebfc9.png)

Ngoài ra, chúng ta có thể phân biệt hai process cha, con thông qua giá trị trả về của hàm fork(). Đối với process cha,  hàm fork() sẽ trả về process ID (**PID**) của process con mới được tạo. Giá trị PID này hữu ích cho process cha theo dõi, quản lý process con (bằng cách sử dụng **wait()** , **waitpid()** sẽ được đề cập sau). Đối với process con, hàm fork() trả về giá trị 0, nó có thể thu được PID của mình thông qua việc gọi hàm **getpid()** và PID của process cha bằng **getppid()** .

Nếu một process mới không được tạo ra, hàm fork() trả về -1.
## 2.2. Ví dụ 1

Xét ví dụ sau để hiểu cách tạo một process con với fork():

```c
int main(int argc, char const *argv[])   /* Cấp phát stack frame cho hàm main() */
{
    /* code */
    pid_t child_pid;                /* Lưu trong stack frame của main() */
    int counter = 2;                /* Lưu trong stack frame của main() */

    printf("Gia tri khoi tao cua counter: %d\n", counter);

    child_pid = fork();           /* Tạo process mới thành công */
    if (child_pid >= 0) {
        if (0 == child_pid) {       /* Process con */
            printf("\nIm the child process, counter: %d\n", ++counter);
            printf("My PID is: %d, my parent PID is: %d\n", getpid(), getppid());
            
        } else {                    /* Process cha */
            printf("\nIm the parent process, counter: %d\n", ++counter);
            printf("My PID is: %d\n", getpid());
        }
    } else {
        printf("fork() unsuccessfully\n");      // fork() return -1 nếu lỗi.
    }

    return 0;
}
```

Biên dịch mã nguồn và khởi chạy, kết quả ta thu được như dưới đây:
![image.png](https://images.viblo.asia/cc06781c-83a5-4220-9280-e29345361cee.png)

Biến counter = 2 được khỏi tạo trước thời điểm fork() được gọi, được lưu trong stack frame của hàm main(). Sau khi lời gọi fork() được thực hiện thành công, một process con được hình thành và tạo ra một bản sao dữ liệu từ các segments data, heap, stack của process cha. Lúc này, khi ta đồng thời tăng giá trị của biến counter lên một đơn vị ở cả hai process, kết quả thu được của counter đều bằng 3. 

Ở process con,  sử dụng hàm getpid(), getppid() ta thu được PID của process con là 7791 và process cha 7790.

Ở process cha, sử dụng hàm getpid() ta thu được PID của process cha là 7790.
# 3. Chạy chương trình mới

Trong nhiều trường hợp bạn đang có một tiến trình A đang thực thi và bạn muốn chạy một chương trình B nào đó từ tiến trình A hoặc con của nó. Điều này hoàn toàn có thể thực hiện được thông qua việc sử dụng một danh sách các hàm thuộc dòng ***exec***.

Danh sách này bao gồm các hàm sau:
```c
#include <unistd.h>

int execle(const char *pathname, const char *arg, ...);

int execlp(const char *filename, const char *arg, ...);

int execvp(const char *filename, char *const argv[]);

int execv(const char *pathname, char *const argv[]);

int execl(const char *pathname, const char *arg, ...);

None of the above returns on success; all return –1 on error
```
## 3.1. execl()

Hàm này sẽ thực thi một chương trình tại đường dẫn được chỉ định, kèm theo tên chương trình và các tham số môi trường truyền vào cho chương trình đó.

Prototype của hàm execl():
```c
#include <unistd.h>
/*
* @param[in] path Đường dẫn tới chương trình muốn chạy.
* @param[in] argv Đây là một mảng các đối số truyền vào trương trình. Tham số cuối cùng nên đặt thành NULL.
*/
int execl(const char *path, char *const argv[]);
```
## 3.2. Ví dụ 2
Xét ví dụ sau để biết rõ hơn về hàm execl():
```c
int main(int argc, char *argv[]) 
{    
    printf("Run command <ls -lah> after 2 seconds\n");
    sleep(2);
    execl("/bin/ls", "ls", "-l", "-h", NULL);

    return 0;
}
```
Biên dịch và cho chạy chương trình:
![image.png](https://images.viblo.asia/0b8d393f-47fb-4b1d-8ce0-ece0666f6290.png)

Sau 2 giây. Hàm execl sẽ gọi tới chương trình **ls** ở vị trí **/bin/ls** và các tham số truyền vào đó là **-l** và **-h**.

# 4. Kết thúc tiến trình
Một process trong hệ thống có thể bị chấm dứt bởi nhiều nguyên nhân khác nhau, có thể do một lỗi (không đủ bộ nhớ cấp phát, sử dụng sai dữ liệu vv..) hay một điều kiện mặc định nào đó xảy ra. Tuy nhiên, ta có thể chia thành hai cách chung.

## 4.1. Kết thúc bình thường (**Normally termination**)
 Một process có thể hoàn thành việc thực thi của nó một cách *bình thường*  bằng cách gọi system call **_exit()**.

  ```c
#include <unistd.h>
void _exit(int status);
```
    
Đối số status truyền vào cho hàm _exit() định nghĩa trạng thái kết thúc (**terminal status**) của process, có giá trị từ 0 - 255. Trạng thái này sẽ được gửi tới process cha để thông báo rằng process con kết thúc thành công (**success**) hay thất bại (**failure**). Process cha sẽ sử dụng system call **wait()** để đọc trạng thái này.
    
Để cho thuận tiện, giá trị status bằng 0 nghĩa là process thực thi thành công, ngược lại khác 0 nghĩa là thất bại.

Trên thực tế, chúng ta sẽ không sử dụng trực tiếp system call _exit() mà thay vào đó sẽ sử dụng **exit()** của thư viện **stdlib.h**.

```c
#include <stdlib.h>
void exit(int status);
```

Ngoài ra, ta cũng có thể sử dụng **return n**  trong hàm **main()** . Điều này tương đương với việc gọi **exit(n)** . Đây chính là lý do khi kết thúc hàm main()  chúng ta thường hay sử dụng return 0 - success.
    
## 4.2. Kết thúc bất thường (**Abnormal termination**)
Ở phần này, mình muốn giới thiệu với mọi người  **kill** command, đây là một command hữu ích dùng để kết thúc process đang chạy một cách chủ động.

```c
/* code */
printf("Test kill command\n");
while (1);
```

Sao chép đoạn mã trên vào hàm main(). Tiến hành biên dịch và chạy.
![image.png](https://images.viblo.asia/68d78909-251a-4feb-882f-93c21525f777.png)

Dùng lệnh `ps aux | grep exam ` lọc thông tin của tiến trình exam.
![image.png](https://images.viblo.asia/bf0f124f-71cd-4020-9c46-7511409c0ddc.png)

Tiến trình exam đang trong một vòng loop vô hạn. Dùng command `kill -9 6136` để chủ động kết thúc tiến trình. Với 6136 chính là PID của exam. 
![image.png](https://images.viblo.asia/15f8ef61-09c7-456c-a25c-384b8c16897a.png)

Về bản chất, kill command sẽ gửi một signal tới process thông qua PID của process đó. Với option -9 ta đang gửi SIGKILL tới exam process. Để hiển thị tất cả các signals còn lại ta dùng command `kill -l`.
![image.png](https://images.viblo.asia/423d8ad3-eef2-4be8-93c9-18c521ac2d97.png)

# 5. Kết luận
Kết thúc một process là việc cần thiết để thu hồi tài nguyên cho hệ thống và sử dụng tài nguyên đó để cấp phát cho process khác. Cần ghi  nhớ: 
* Cách tạo lập một tiến trình mới sử dụng system call **fork()** .
* Kết thúc procces:
    *  Kết thúc bình thường (**Normally termination**): Dùng hàm **exit()** .
    *  Kết thúc bất thường (**Abnormal termination**): Dùng  **kill** command.