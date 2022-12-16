# 1. Giới thiệu
Một trong các triết lý về lập trình đó là "***do one thing and do it well***",  làm một việc và làm tốt điều đó.  Quản lý tiến trình về cơ bản được thực hiện bởi một vài system call, mỗi lệnh có một mục đích (đơn giản). Các lệnh này sau đó có thể được kết hợp để thực hiện các hành vi phức tạp hơn. 

Những system call sau đây được sử dụng để tạo lập, kết thúc, quản lý tiến trình cơ bản:
* **fork()**: Được sử dụng để tạo một tiến trình con mới. Tiến trình con là một bản sao của tiến trình cha.
* **exec()**: Sử dụng để thực thi một chương trình khác từ tiến trình đang chạy.
* **exit()**: Gửi trạng thái của kết thúc của tiến trình con tới tiến trình cha.
* **wait()**: Tiến trình cha có thể thu được trạng thái kết thúc của tiến trình con thông qua gọi **wait()**.
![image.png](https://images.viblo.asia/9a417653-29c1-45f3-9e28-9dbf26b562f0.png)
# 2. Quản lý tiến trình con
Trong nhiều ứng dụng, một tiến trình cha cần biết được khi nào tiến trình con của nó thay đổi trạng thái (**state**) để giám sát và đưa ra quyết định thực hiện các hành vi tiếp theo. Điều này có thể thực hiện được thông qua việc sử dụng system call **wait()** và **waitpid()** .

## 2.1. System call wait()

System call wait() được sử dụng thể theo dõi trạng thái kết thúc của ***một trong các tiến trình con mà tiến trình cha tạo ra***. 
Prototype của wait() như sau:

```c
#include <sys/wait.h>

/*
* @param[out] status Trạng thái kết thúc của tiến trình con.
*
* @return     Trả về PID của tiến trình con nếu thành công, trả về -1 nếu lỗi.
*/
pid_t wait(int *status);
```

1. Tại thời điểm wait() được gọi, nó sẽ  block cho đến khi có một tiến trình con kết thúc. Nếu tồn tại một tiến trình con đã kết thúc trước thời điểm gọi wait(), nó sẽ return ngay lập tức. 
2. Nếu status khác NULL, status sẽ trỏ tới một giá trị là một số nguyên, giá trị này là thông tin về trạng thái kết thúc của tiến trình.
3. Khi wait() kết thúc, nó sẽ trả về giá trị PID của tiến trình con hoặc trả về -1 nếu lỗi.
## 2.2. System call waitpid()
System call wait() tồn tại một số hạn chế:

* Nếu tiến trình cha tạo ra nhiều tiến trình con (**mutliple children**), nó không thể dùng wait() để theo dõi **một tiến trình con cụ thể**. 
* Nếu tiến trình con không kết thúc, wait() luôn block. 

**waitpid()** được sinh ra để giải quyết các vấn đề này. Prototype của waitpid() như sau:

```c
#include <sys/wait.h>

/*
* @param[in]  pid      pid  >  0, PID của tiến trình con cụ thể mà wait muốn theo dõi.
*                      pid  =  0, Ít sử dụng.
*                      pid  < -1, Ít sử dụng. 
*                      pid == -1, Chờ bất cứ tiến trình con nào thuộc về tiến trình cha - giống wait().                  
* @param[out] status   Trạng thái kết thúc của tiến trình con.
* @param[in]  options  Thông thường chúng ta sẽ sử dụng giá trị NULL ở trường này.
*
* @return     Trả về PID của tiến trình con nếu thành công, trả về -1 nếu lỗi.
*/
pid_t waitpid(pid_t pid, int *status, int options);
```

Về cơ bản, hoạt động của waitpid() cũng giống như wait(). Ngoài ra, chúng ta có thể sử dụng một số macro dưới đây cùng với giá trị "status" nhận từ  **wait()** hoặc **waitpid()** để xác định cách mà tiến trình con kết thúc.

* **WIFEXITED(status)**: 
    * return true nếu tiến trình con kết thúc một cách bình thường (**normallly termination**) bắng                                                     cách sử dụng  **_exit()** hoặc **exit()** .
* **WIFSIGNALED(status)**:
    *  return true nếu tiến trình con kết thúc một cách bất thường (**abnormal termination**), cụ thể trong trường hợp này là        do signal.   Được sử dụng kết hợp với **WTERMSIG** để xác định signal nào làm cho tiến trình con kết thúc. Có thể dùng command "**kill -l**" để biết thêm thông tin về các loại signals.
*  **WIFSTOPPED**: 
    *  return true nếu như tiến trình con tạm dừng bởi signal **SIGSTOP**.
*  **WIFCONTINUED**: 
    *  return true nếu như tiến trình con được tiếp tục bởi signal **SIGCONT**.

## 2.3. Ví dụ 1
 Ví dụ minh họa về cách sử dụng system call wait() .

```c
int main(int argc, char const *argv[])   /* Cấp phát stack frame cho hàm main() */
{
    /* code */
    pid_t child_pid;                /* Lưu trong stack frame của main() */
    int status, rv;

    child_pid = fork();         
    if (child_pid >= 0) {
        if (0 == child_pid) {       /* Process con */
            printf("Im the child process, my PID: %d\n", getpid());
            sleep(3);

        } else {                     /* Process cha */
                rv = wait(&status);
                if (rv == -1) {
                    printf("wait() unsuccessful\n");
                }

                printf("\nIm the parent process, PID child process: %d\n", rv);
                
                if (WIFEXITED(status)) {
                    printf("Normally termination, status=%d\n", WEXITSTATUS(status));
                } else if (WIFSIGNALED(status)) {
                    printf("killed by signal, value = %d\n", WTERMSIG(status));
                } 
        }
    } else {
        printf("fork() unsuccessfully\n");      // fork() return -1 nếu lỗi.
    }

    return 0;
}
```

Biên dịch và chạy chương trình trên ta được kết quả như sau:
![image.png](https://images.viblo.asia/29886169-a3c8-4294-9121-04f072145ce0.png)
 Đoạn mã xử lý tiến trình con sẽ in ra PID của nó và sleep 3 giây, trong thời gian này tiến trình cha đang block tại wait(). Sau 3 giây, tiến trình cha in ra PID của tiến trình con thông qua giá trị trả về của wait(). Kết quả sau cùng cho thấy rằng tiến trình con đang kết thúc bình thường (**normally termination**) .
 
 Thay đổi một chút ở trong tiến trình con:
 
```c
if (0 == child_pid) {       /* Process con */
    printf("Im the child process, my PID: %d\n", getpid());
    while(1); // Sửa sleep(3) thành while(1)
}
```

Biên dịch và chạy lại chương trình:
![image.png](https://images.viblo.asia/388707b5-ec39-4f79-81ed-da2b64fa8ac1.png)
Lúc này tiến trình con đang bị block trong while(1). Sau đó chúng ta sẽ kill tiến trình con bằng signal thông qua lệnh "**kill - 9 2467**" với 9 là **SIGKILL** và 24767 là **PID** của tiến trình con.
![image.png](https://images.viblo.asia/f36002a0-fc9f-4b19-920a-e214ff9f8f20.png)
Kết quả trên cho thấy, lúc này tiến trình con đang bị kết thúc một cách bất thường (**abnormal termination**) bởi SIGKILL.

# 3. Orphane và Zombie
Vòng đời của các tiến trình cha - con thường không giống nhau. Tiến trình cha sống lâu hơn tiến trình con và ngược lại. Điều này đặt ra hai câu hỏi:

* Tiến trình cha kết thúc trước tiến trình con, lúc này tiến trình con rơi vào trạng thái mồ côi cha (**orphane**), vậy ai sẽ là cha mới của nó?
* Điều gì xảy ra nếu tiến trình con kết thúc trước khi tiến trình cha kịp gọi **wait()**? 

Để trả lời cho hai câu hỏi này, chúng ta tiến hành tìm hiểu hai khái niệm mới về tiến trình dưới đây.
## 3.1. Tiến trình Orphane
Nếu tiến trình cha kết thúc trong khi một hoặc nhiều tiến trình con của nó vẫn đang chạy, khi đó các tiến trình con đó sẽ trở thành các tiến trình mồ côi (**orphane**). Tiến trình mồ côi sẽ được chấp nhận bởi tiến trình **init** (có PID 1), và tiến trình init sẽ hoàn thành công việc thu thập trạng thái cho chúng.

Mặc dù về mặt kỹ thuật, tiến trình con được init nhận làm "**con nuôi**" nhưng nó vẫn được gọi là tiến trình mồ côi vì tiến trình cha ban đầu tạo ra nó không còn tồn tại nữa.

## 3.2. Tiến trình Zombie
Ở góc độ của hệ điều hành, mặc dù tiến trình con đã kết thúc công việc của mình, tiến trình cha mẹ vẫn nên được phép gọi **wait()** để lấy trạng thái kết thúc của tiến trình con, tại thời điểm nào đó sau khi tiến trình con chấm dứt. Tuy nhiên, nếu tiến trình con kết thúc và thu hổi toàn bộ tài nguyên được cấp phát thì tiến trình cha không thể biết con của nó kết thúc như thế nào.

Kernel giải quyết vấn đề trên bằng cách biến tiến trình con thành tiến trình  thây ma (**zoombie process**), điều này có nghĩa là hầu hết các tài nguyên do tiến trình con nắm giữ sẽ bị thu hồi và sửa dụng cấp phát cho các tiến trình khác. Tuy nhiên, một vài thông tin cơ bản vẫn được giữ lại như PID và trạng thái kết thúc, các thông tin này sẽ được lấy bởi tiến trình cha rối chúng  sẽ bị xóa khỏi hệ thống ngay sau đó thông qua việc sử dụng wait().

Đoạn mã dưới đây mô phỏng việc tạo ra tiến trình zoombie:
```c
    /* code */
    pid_t child_pid;                /* Lưu trong stack frame của main() */
    int status;

    child_pid = fork();         
    if (child_pid >= 0) {
        if (0 == child_pid) {       /* Process con */
            printf("Im the child process, my PID: %d\n", getpid());
            exit(EXIT_SUCCESS);

        } else {                    /* Process cha */
            while(1);  
            wait(&status);
            
        }
    } else {                        /* fork() return -1 nếu lỗi. */
        printf("fork() unsuccessfully\n"); 
    }
```

Biên dịch và chạy chương trình:
![image.png](https://images.viblo.asia/3aa743db-7ffb-421b-8ae2-7d9fadf8c339.png)

Tiến trình con kết thúc ngay lập tức và có PID là 8647, tiến trình cha bị block tại while(1) trước thời điểm wait() được gọi. Sử dụng command "ps aux | grep exam" ta thu được kết quả.
![image.png](https://images.viblo.asia/f0db5e67-13c6-4ea8-9d43-ed305be26741.png)
Tiến trình exam với PID 8674 là tiến trình **zombie** được đánh dấu là **Z+**. Ta có thể liệt kê các trạng thái tiến trình như sau:
* **S** : sleeping  
* **R** : running  
* **W** : waiting 
* **T** :  suspended
* **Z** :  zombie (defunct) 

Được lấy cảm hứng từ những bộ phim về zombie, tiến trình thây ma vẫn tồn tại nhưng không thể bị giết (kill) bởi signal (SIGKILL).  Lúc này, nếu muốn kết thúc tiến trình zombie ta có thể kill trực tiếp tiến trình cha của nó. Khi đó tiến trình init sẽ nhận tiến trình zombie làm con nuôi :)  và tự động gọi wait(), loại bỏ zombie ra khỏi hệ thống.

## 3.3. Ngăn chặn tạo ra tiến trình zombie
Có một bảng process ID (**PID**) cho mỗi hệ thống. Kích thước của bảng này là hữu hạn. Nếu quá nhiều tiến trình zombie được tạo, thì bảng này sẽ đầy. Tức là hệ thống sẽ không thể tạo ra bất kỳ tiến trình mới nào, khi đó hệ thống sẽ đi đến trạng thái ngưng hoạt động. Do đó, chúng ta cần ngăn chặn việc tạo ra các quy trình zombie.

### 3.3.1 Sử dụng wait()
Thực hiện gọi wait() ở tiến trình cha. Tuy nhiên, wait() sẽ block tiến trình cha cho tới khi nào có một tiến trình con của nó kết thúc,  điều đó đồng nghĩa với tiến trình cha có thể phải đợi rất lâu nếu tiến trình con không kết thúc sớm.
```c
if (0 == child_pid) {       /* Process con */
    printf("Im the child process, my PID: %d\n", getpid());
    while(1);

} else {                    /* Process cha */ 
    wait(&status);          /* Block here */

}
```
### 3.3.1 Sử dụng SIGCHILD
Khi tiến trình con kết thúc, một tín hiệu **SIGCHILD** sẽ được gửi tới tiến trình cha của nó. Áp dụng nguyên lý này ta sẽ giải quyết được hạn chế của wait().
```c
void func(int signum)
{
    wait(NULL);
}

int main()
{
    pid_t child_pid = fork();
    
    if (child_pid >= 0) {
        if (child_pid == 0) {
            printf("I am Child\n");
            
        } else {
            /**
            * When a child is terminated, a corresponding SIGCHLD signal 
            * is delivered to the parent
            */
            signal(SIGCHLD, func);
            printf("I am Parent\n");
            while(1);
        }
    } else {
        printf("fork() unsuccessfully\n");
    }
}
```
Kết quả sau khi chương trình được chạy như sau:
![image.png](https://images.viblo.asia/f10153f7-acb0-4f4a-b063-ced71be3f586.png)
Một khi tiến trình cha nhận được SIGCHILD, hàm xử lý **func** (handler) tương ứng được đăng kí bởi **signal(SIGCHLD, func)** sẽ được kích hoạt và hoạt động độc lập với tiến trình cha. Do đó tiến trình cha sẽ "rảnh rỗi" để làm những việc khác mà vẫn ngăn chặn việc tạo thành tiến trình zombie.

# 4. Kết luận
Kết thúc bài viết này, chúng ta cần nắm được cách sử dụng systemcall **wait()** và **waitpid()**.
Tiến trình **orphane**, **zombie** và cách ngăn ngừa tạo ra chúng.