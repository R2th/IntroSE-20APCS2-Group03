### 1: Bộ tiền xử lý # define trong C++
Bộ tiền xử lý (Preprocessor) là các directive (chỉ thị), cung cấp chỉ lệnh tới bộ biên dịch để tiền xử lý thông tin trước khi bắt đầu biên dịch thực sự.

Chỉ thị tiền xử lý #define tạo các biểu tượng hằng. Biểu tượng hằng là một macro và mẫu chung của chỉ thị tiền xử lý này trong C++ là:
```
#define ten_cua_macro ten_thay_the 
```
Khi dòng này xuất hiện trong một file, tất cả macro xuất hiện theo sau trong file này sẽ được thay thế bởi ten_thay_the trước khi chương trình được biên dịch. Ví dụ:
```
#include <iostream> using namespace std; #define PI 3.14159 int main () { cout << "Gia tri cua PI la: " << PI << endl; return 0; }
```
Giả sử chúng ta có source file, sau đó biên dịch nó với tùy chọn –E và hướng kết quả tới test.p. Bây giờ, nếu bạn kiểm tra test.p, nó sẽ có nhiều thông tin và tại dưới cùng, bạn sẽ tinh chỉnh giá trị được thay thế như sau:
```
$gcc -E test.cpp > test.p ... int main () { cout << "Gia tri cua PI la: " << 3.14159 << endl; return 0; }
```
### 2: Biên dịch có điều kiện trong C++
Có một số chỉ thị tiền xử lý có thể sử dụng để biên dịch có sự tuyển chọn giữa các phần trong source code của bạn. Tiến trình này được gọi là biên dịch có điều kiện.

Chỉ lệnh tiền xử lý có điều kiện khá giống với cấu trúc lựa chọn if. Bạn xét code sau:
```
#ifndef NULL #define NULL 0 #endif
```
Bạn có thể biên dịch một chương trình với mục đích debug và có thể tắt hoặc bật việc debug này bởi sử dụng một macro trong C++, như sau:
```
#ifdef DEBUG cerr <<"Bien x = " << x << endl; #endif
```
Lệnh cerr để được biên dịch trong chương trình nếu biểu tượng hằng DEBUG đã được định nghĩa ở trước chỉ thị #ifdef DEBUG. Bạn có thể sử dụng lệnh #if 0 để chú thích một phần của chương trình, như sau:
```
#if 0 khong duoc bien dich phan code nay #endif
```

### 3: Một vài macro hữu dụng trong C
Ta sẽ có một file chứa vài macro sẽ nói đến ở đây:

debug_macro.h

```
#ifndef __debug_macro__
#define __debug_macro__

#include <stdio.h>
#include <string.h>
#include <stdarg.h>

//
// Khi không cần in ra log nữa ta đơn giản định nghĩa macro NDEBUG (tức là No Debug) bằng dòng bên dưới.
// Khi biên dich, các đoạn mã trống do {} while(0); sẽ bị xóa hết do tối ưu.
// Vì thế hầu như không ảnh hưởng đến code chính.
//#define NDEBUG (1)


#ifdef NDEBUG
#define log_debug(fmt, ...)  do {} while (0)
#define log_err(fmt, ...)  do {} while (0)
#define log_warn(fmt, ...)  do {} while (0)
#define log_info(fmt, ...)  do {} while (0)
#else // NDEBUG

//
// Dành cho việc in ra log debug
//
#define log_debug(fmt, ...)\
        do { fprintf(stderr, "[DEBUG] %10s:%10d:%15s(): " fmt, __FILE__, __LINE__, __func__,## __VA_ARGS__); } while (0)

//
// Dành cho việc  in ra log lỗi
//
#define log_err(fmt, ...) \
        do { fprintf(stderr, "[ERROR] %10s:%10d:%15s(): " fmt, __FILE__,  __LINE__, __func__,## __VA_ARGS__); } while (0)

//
// Dành cho việc in ra log lỗi
//
#define log_warn(fmt, ...) \
        do { fprintf(stderr, "[WARN] %10s:%10d:%15s(): " fmt, __FILE__, \
                                __LINE__, __func__, ##__VA_ARGS__); } while (0)
//
// Dành cho việc in ra các thông tin khác.
//
#define log_info(fmt, ...) \
        do { fprintf(stderr, "[INFO] %10s:%10d:%15s(): " fmt, __FILE__, \
                                __LINE__, __func__, ##__VA_ARGS__); } while (0)
#endif //NDEBUG

#endif // __debug_macro__
```

Cách sử dụng mấy macro trên khá đơn giản, vì hàm trên được khai báo sử dụng với tham số thay đổi được.
Nên ta sử dụng giống hệt với các hàm printf mà ta vẫn biết.
### 4: Môt ví dụ sử dụng macro
Yêu cầu : Viết chương trình mô tả luồng làm việc của một programmer.
Mã giả:
1. Vận công nghĩ keyword
2. Tìm kiếm keyword trên google
3. Xem link 1, xem có code sample không? Nếu có đến step 4, nếu không xem link tiếp theo.
4. Chạy thử code sample, nếu chạy đúng, thì kết thúc, nếu chạy sai thì trở về step 3 xem link tiếp.
5. Xem hết link mà không có kết quả, thì quay lại step 1 nghĩ từ khóa khác.

Các file source code cho chương trình trên như sau:
resultLinks.txt
```
"www.lx.com",
"www.facebook.com",
"www.stackoverflow.com",
"www.segmentfault.com",
"www.kipalog.com"
```
program.c
```
#include <stdio.h>
#include <stdarg.h>
#include"debug_macro.h"// 

#define MAX_LINK_LENGTH (100)
#define MAX_NUM_LINK (20)

#define N_DUMMY_LINKS (5)
#define N_DUMMY_RESULT_SITE (2)

//
// Dummy danh sách links kết quả tìm kiếm từ google 
//
const char* DUMMY_RESULT_LINKS[] =
{
    #include"resultLinks.txt"
}; 

//
// Dummy những site có sample source
//
const char* DUMMY_HAS_SOURCE_CODE_SITE[]=
{
    "www.stackoverflow.com",
    "www.kipalog.com"
};

//
// Hàm tìm kiếm từ khóa trên google, trả về kết quả là danh sách link
//
void search_google(char* keyword, char result[MAX_NUM_LINK][MAX_LINK_LENGTH], int *nResults)
{
    int i = 0;

    log_debug("Search google : (keyword=%s) START \n", keyword);

    for (i = 0; i < N_DUMMY_LINKS; i++)
    {
        strcpy(result[i], DUMMY_RESULT_LINKS[i]);
    }
    *nResults = N_DUMMY_LINKS;

    log_debug("Search google : (nResults=%d) END \n", *nResults);
}

//
// Hàm chạy source sample từ một link đưa vào từ tham số
//
int runSource(char* link)
{
    int retVal = 1;

    //log_debug("Run source in (link=%s) START \n",link);
    if (strstr(link, "www.kipalog.com") != NULL)
    {
        log_debug("OK, It works!!!!\n");
        retVal = 1;
    }
    else
    {
        log_err("Hmm, Bad source (link=%s) \n",link);
        retVal = 0;
    }
    //log_debug("Run source in (link=%s) END \n",link);

    return retVal;
}

//
// Hàm kiểm tra một link có chưa sample source hay không.
//
int hasSampleSource(char* link)
{
    int i = 0;
    int retVal = 0;

    //log_debug("Check source (link=%s) START \n",link);
    for (i = 0; i < N_DUMMY_RESULT_SITE; i++)
    {
        if (strstr(link, DUMMY_HAS_SOURCE_CODE_SITE[i]) != NULL)
        {
            retVal = 1;
            break;
        }
    }
    //log_debug("Check source (link=%s) END \n",link);

    return retVal;
}

//
// Hàm start-up
//
int main(int argc, char* argv[])
{
    char *keyword;
    char results[MAX_NUM_LINK][MAX_LINK_LENGTH];
    int nResults;
    int i = 0;

    // Kiểm tra tham số
    if (2 != argc)
    {
        log_err("Invalid parameter, usage: %s <keyword>\n",argv[0]);
        return 0;
    }

    // Lấy keyword
    keyword = argv[1];

    // Tìm google
    search_google(&keyword[0], results, &nResults);
    if (nResults > 0)// Nếu có kết quả
    {
        // Duyệt từng link kết quả
        for (i = 0; i < nResults; i++)
        {
            log_debug("Try (link=%s) \n",results[i]);
            if (hasSampleSource(results[i]))// Kiểm tra xem có sample source hay không 
            {
                // Chạy thử source sample
                runSource(results[i]);
            }
            else
            {
                log_err("No source in link :%s\n", results[i]);
            }
        }
    }
    else{
        log_err("Keyword is so difficult (keyword=%s) \n", keyword);
    }

    return 0;
}
```
Build xong và chạy.

Kết quả sau khi thực hiện sẽ như thế này:
```
oedev@OECrossDev:~/Code/Kipalog$ ./program hello
[DEBUG]  program.c:        26:  search_google(): Search google : (keyword=hello) START 
[DEBUG]  program.c:        33:  search_google(): Search google : (nResults=5) END 
[DEBUG]  program.c:        95:           main(): Try (link=www.lx.com) 
[ERROR]  program.c:       102:           main(): No source in link :www.lx.com
[DEBUG]  program.c:        95:           main(): Try (link=www.facebook.com) 
[ERROR]  program.c:       102:           main(): No source in link :www.facebook.com
[DEBUG]  program.c:        95:           main(): Try (link=www.stackoverflow.com) 
[ERROR]  program.c:        48:      runSource(): Hmm, Bad source (link=www.stackoverflow.com) 
[DEBUG]  program.c:        95:           main(): Try (link=www.segmentfault.com) 
[ERROR]  program.c:       102:           main(): No source in link :www.segmentfault.com
[DEBUG]  program.c:        95:           main(): Try (link=www.kipalog.com) 
[DEBUG]  program.c:        43:      runSource(): OK, It works!!!!
```
Ta thấy log được hiển thị theo các TAG, các thông tin debug cũng được in ra.
Ta có thể dùng các tool view log để phân tích những file log dài một cách dễ dàng hơn. Ví dụ glogg chẳng hạn, ta gán màu cho từng loại TAG (ERROR, DEBUG) thì việc phân tích log sẽ trở nên dễ hiểu hơn.
### 5: Tắt việc hiển thị log
Đơn giản ta comment out lại một dòng ở file debug_macro.h, sẽ không có gì hiện ra nữa.
### 6: Thêm thông tin vào nội dung log
Log ở trên chứa các thông tin về tên file, hàm, dòng code cũng tương đối đủ để trace lỗi.
Nhưng trong một số trường hợp, nhất là với các ứng dụng nhiều thread chẳng hạn, ta muốn thêm giá trị về thời gian nữa.

Ta có thể tùy biết các macro ở trong file debug_macro.h, có nhiều cách tùy múc đích của việc in log:

Đây là một cách trong đó:

debug_macro.h
```
#ifndef __debug_macro__
#define __debug_macro__

#include <stdio.h>
#include <string.h>
#include <stdarg.h>
#include <time.h>// Cần cho việc lấy time

//
// Hàm hiển thị log có thêm nhãn thời gian
//
void time_printf(const char *fmt, ... )
{
    // Tính thời gian hiện tại
    time_t rawtime;
    struct tm * timeinfo;

    time ( &rawtime );
    timeinfo = localtime ( &rawtime );
    fprintf (stderr, "[%d-%d-%d_%d:%d:%d] ", timeinfo->tm_year + 1900,timeinfo->tm_mon + 1, timeinfo->tm_mday,  timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec);

    // Hiển thị log như cũ
    va_list args;
    va_start(args, fmt);
    vfprintf(stderr, fmt, args);
    va_end(args);
}

#ifdef NDEBUG
#define log_debug(fmt, ...)  do {} while (0)
#define log_err(fmt, ...)  do {} while (0)
#define log_warn(fmt, ...)  do {} while (0)
#define log_info(fmt, ...)  do {} while (0)
#else // NDEBUG

#define log_debug(fmt, ...) \
        do { time_printf("[DEBUG] %10s:%10d:%15s(): " fmt, __FILE__, __LINE__, __func__, ##__VA_ARGS__); } while (0)

#define log_err(fmt, ...) \
        do { time_printf("[ERROR] %10s:%10d:%15s(): " fmt, __FILE__,  __LINE__, __func__,## __VA_ARGS__); } while (0)

#define log_warn(fmt, ...) \
        do { time_printf("[WARN] %10s:%10d:%15s(): " fmt, __FILE__, \
                                __LINE__, __func__, ##__VA_ARGS__); } while (0)

#define log_info(fmt, ...) \
        do { time_printf("[INFO] %10s:%10d:%15s(): " fmt, __FILE__, \
                                __LINE__, __func__, ##__VA_ARGS__); } while (0)
#endif //NDEBUG

#endif // __debug_macro__
```
Kết quả chạy sẽ như sau:
```
oedev@OECrossDev:~/Code/Kipalog$ ./program hello
[2015-9-1_23:20:58] [DEBUG]  program.c:        35:  search_google(): Search google : (keyword=hello) START 
[2015-9-1_23:20:58] [DEBUG]  program.c:        43:  search_google(): Search google : (nResults=5) END 
[2015-9-1_23:20:58] [DEBUG]  program.c:       118:           main(): Try (link=www.lx.com) 
[2015-9-1_23:20:58] [ERROR]  program.c:       126:           main(): No source in link :www.lx.com
[2015-9-1_23:20:58] [DEBUG]  program.c:       118:           main(): Try (link=www.facebook.com) 
[2015-9-1_23:20:58] [ERROR]  program.c:       126:           main(): No source in link :www.facebook.com
[2015-9-1_23:20:58] [DEBUG]  program.c:       118:           main(): Try (link=www.stackoverflow.com) 
[2015-9-1_23:20:58] [ERROR]  program.c:        61:      runSource(): Hmm, Bad source (link=www.stackoverflow.com) 
[2015-9-1_23:20:58] [DEBUG]  program.c:       118:           main(): Try (link=www.segmentfault.com) 
[2015-9-1_23:20:58] [ERROR]  program.c:       126:           main(): No source in link :www.segmentfault.com
[2015-9-1_23:20:58] [DEBUG]  program.c:       118:           main(): Try (link=www.kipalog.com) 
[2015-9-1_23:20:58] [DEBUG]  program.c:        56:      runSource(): OK, It works!!!!
```
Trong file mới, thay vì gọi các hàm fprintf thì ta gọi đến một hàm khác là time_printf để in log và có cả thơi gian nữa.

Trên đây là tất cả những gì mình có nhớ được. Mình cũng từng thấy người ta tùy biến việc xuất log theo một số cách khác phức tạp hơn như theo level (cái này giống thư viện log4j, log4net của Apache Team).

Trong một số thiết bị nhúng, nơi mà stdin không phải bàn phím, stdout không phải màn hình.
Khi ấy có thể, người ta phải viết code cho hàm *fprintf để xuất log ra đâu đó như serial chẳng hạn, etc.

Tài liệu tham khảo:

https://stackoverflow.com/questions/1644868/c-define-macro-for-debug-printing

https://learncodethehardway.org/c/

https://kipalog.com/posts/Mot-vai-macro-huu-dung-trong-C

https://quantrimang.com/bo-tien-xu-ly-preprocessor-trong-cplusplus-156321