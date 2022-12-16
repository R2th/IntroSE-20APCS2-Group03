# 1. Giới thiệu
Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về các khái niệm cơ bản xoay quanh Process (Tiến trình). Tập trung vào cách tổ chức bộ nhớ của nó và các ví dụ để thu được góc nhìn một cách trực quan.

# 2. Phân biệt Process với Program
Trích từ cuốn "***The Linux Programming Interface***" , ta có khái niệm về tiến trình (**Process**) và chương trình (**Program**) như sau:
> A process is an instance of an executing program.
> 
> A program is a file containing a range of information that describes how to construct a process at run time

Chương trình và tiến trình là hai thuật ngữ có liên quan tới nhau. Sự khác biệt chính giữa chương trình và tiến trình đó là chương trình một nhóm các câu lệnh để thực hiện một nhiệm vụ cụ thể trong khi đó tiến trình là một ***chương trình đang được*** ***thực thi*** .

Lấy một ví dụ, ta có một *chương trình* nghe mp3 với tên là music, đây là một file nằm đâu đó trên ổ cứng. Khi ta chạy chương trình này để chơi nhạc, lúc này ta có được tiến trình music. Tiến trình music lúc này đang được thực thi và sử dụng các tài nguyên của hệ thống như ram, cpu vv...

# 3. Process ID
Mỗi một process có một mã dùng để định danh gọi là process ID (PID), đây là số nguyên dương và duy nhất cho mỗi process trên hệ thống. 

Sử dụng command **top**  trong terminal. Ta có thể thấy các giá trị PID được liệt kê trong cột ngoài cùng bên trái.
![image.png](https://images.viblo.asia/7e6280b3-d258-4076-88cd-3f434ea8c7b5.png)

# 4. Memory layout của một Process
Bộ nhớ cấp phát cho mỗi một process được chia thành nhiều phần khác nhau. Thông thường chúng được gọi là các segments - Các phân đoạn vùng nhớ. 
![image.png](https://images.viblo.asia/ad1d3cac-c37e-47fc-a6b0-1ba169dc5cab.png)

## 4.1. Text segment

* Chứa các chỉ lệnh ngôn ngữ máy (machine-language) của program.
* Bởi vì nhiều process có thể chạy từ một program. Do đó text segment được thiết lập là sharable để chia sẽ giữa các process nhằm tiết kiệm tài nguyên.
* Segment này có quyền read-only (chỉ đọc)

## 4.2. Initialized data segment
* Bao gồm các biến global (Toàn cục) và  biến static (Tĩnh) đã được khởi tạo một cách tường minh. 
* Segment này có quyền read, write. 
## 4.3. Uninitialized data segment
* Bao gồm các  biến global và biến static không được khởi tạo tường minh. 
* Trước khi bắt đầu chạy program, hệ thống sẽ khởi tạo giá trị cho các biến nằm trong segment này thành 0.
* Segment này còn được gọi là bss segment.
* Lý do cần phải phân chia các biến global và static vào hai phân đoạn bộ nhớ initialized và uninitialized là bởi, khi chương trình đang được lưu trữ trên ổ đĩa cứng (HDD, SSD), chúng ta không cần thiết cấp phát cho các biến uninitizlied bởi vì điều này sẽ làm size của program tăng không cần thiết.  
* Segment này có quyền read, write.
## 4.4. Stack segment
* Có thể co dãn vùng nhớ bằng cách cấp phát hoặc giải phóng các stack frames.
* Khi có lời gọi tới một hàm, một stack frame sẽ được tạo cho hàm đó nhằm mục đích lưu trữ các thông tin về các biến cục bộ, các arguments của hàm, giá trị return.
* Stack frame sẽ được giải phóng sau khi hàm kết thúc.
* Segment này có quyền read, write.
## 4.5. Heap segment 
* Segment dành cho việc cấp phát bộ nhớ một cách tự động.  Sử dụng các hàm như **alloc(), malloc(), calloc()** 
* Heap có thể co dãn tương tự stack. Điểm kết thúc của Heap được gọi là **Program break**.
* Segment này có quyền read, write.

***Note***: Initialized data segment và uninitialized data segment có thể gọi chung là **data segment**.
## 4.6. Ví dụ1
Đoạn mã sau đây là một ví dụ thể hiện việc ánh xạ giữa các biến trong C với các segments trong process.

```c
#include <stdio.h>
#include <stdlib.h>

char buff[1024];                /* Uninitialized data segment */
int primes[] = { 2, 3, 5, 7 };  /* Initialized data segment */

void hello(int x)               /* Cấp phát Stack frame cho hàm hello */
{
    int result;                 /* Stack frame của hello()*/ 
}

void main(int argc, char *argv[])   /* Cấp phát Stack frame cho hàm main() */
{
    static int key = 1;             /* Initialized data segment */
    static char buff[1024];         /* Uninitialized data segment */
    char *p;                        /* Stack frame của main() */
    p = malloc(1024);               /* Trỏ tới bộ nhớ được cấp phát ở Heap segment */
}
```

# 5. Command-line Arguments
Mỗi một chương trình đều bắt đầu khởi chạy từ hàm main(). Khi chạy chương trình các command-line arguments (tham số môi trường) sẽ được truyền qua 2 arguments của hàm main(). 
*  **argc**: Chỉ ra số lượng tham số được truyền qua hàm main().
*  **argv**: Là một mảng con trỏ trỏ tới các đối số command-line có kiểu char*.
## 5.1. Ví dụ2
Để rõ ràng hơn chúng ta xét ví dụ sau.

```c
#include <stdio.h>
#include <stdlib.h>

void main(int argc, char *argv[]) 
{   
    int i;

    // In ra số lượng command-line truyền vào.
    printf("Number of arguments: %d", argc);    
    
    // In ra nội dung của mỗi command-line.
    for (i = 0; i < argc; i++) {
        printf("argc[%d]: %s\n", i+1, argv[0]);
    }
}
```

Biên dịch chương trình trên và chạy ta thu được kết quả như sau: 
![image.png](https://images.viblo.asia/88f99d02-64ca-490b-b8b6-953d3cdb4291.png)
Ta có thể thấy số lượng command-line truyền vào ở đây là 4:  ./exam, hello, linux, programming. Bao gồm cả tên của chương trình.

# 6. Kết luận
* Cần phân biệt program và process.
* Tiến trình trong Linux được định danh bằng **PID**.
* Việc ghi nhớ vai trò của từng segment của bộ nhớ của một process sẽ giúp ích rất nhiều trong quá trình làm việc với process sau này. Một process sẽ bao gồm **5 segments**, bao gồm:
    * **Text segment**
    * **Initialized data segment**
    * **Uninitialized data segment**
    * **Stack segment**
    * **Heap segment**