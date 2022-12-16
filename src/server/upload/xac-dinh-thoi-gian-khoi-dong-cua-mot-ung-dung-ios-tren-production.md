# Giới thiệu
Trước khi một ứng dụng chạy vào hàm `main()` và `applicationDidFinishLaunching()`, đã có một khối lượng công việc đáng kể đã được hoàn thành, trong đó có việc thiết lập các thư viện động (dylibs), chạy các hàm load(), ... Thời gian thực hiện các công việc này là không giống nhau giữa các ứng dụng, và nó có thể kéo dài đến 500ms hoặc hơn nữa.  Đã có nhiều bài viết hướng dẫn bạn xác định thời gian chính xác để khởi động một ứng dụng bằng debugger bằng `DYLD_PRINT_STATISTICS`, tuy nhiên bài viết này sẽ hướng tới việc xác định chính xác hơn trong thực tế.

# Đo thời gian khởi động như thế nào?
Để xác định thời gian khởi động ứng dụng iOS một cách chính xác nhất, có thể sử dụng đoạn mã Objective-C sau:
```
#import <sys/sysctl.h>

static CFTimeInterval processStartTime() {
    size_t len = 4;
    int mib[len];
    struct kinfo_proc kp;

    sysctlnametomib("kern.proc.pid", mib, &len);
    mib[3] = getpid();
    len = sizeof(kp);
    sysctl(mib, 4, &kp, &len, NULL, 0);

    struct timeval startTime = kp.kp_proc.p_un.__p_starttime;
    return startTime.tv_sec + startTime.tv_usec / 1e6;
}

static CFTimeInterval sPreMainStartTimeRelative;

int main(int argc, char * argv[], char **envp) {
    CFTimeInterval absoluteTimeToRelativeTime =  CACurrentMediaTime() - [NSDate date].timeIntervalSince1970;
    sPreMainStartTimeRelative = processStartTime() + absoluteTimeToRelativeTime;
    // ...
}

// Call this function to get your final measurement
CFTimeInterval timeFromStartToNow() {
    return CACurrentMediaTime() - sPreMainStartTimeRelative;
}
```

Giá trị được trả về từ hàm `processStartTime()` được tính theo đơn vị giây kể từ mốc 1970. Tuy nhiên, đây không phải là cách tốt nhất để tính toán thời gian vì con số này có thể thay đổi, chẳng hạn khi ứng dụng đồng bộ thời gian với máy chủ trong khoảng thời gian process được khởi chạy cho đến khi hàm `timeIntervalSince1970()` được gọi trong hàm `main()`. Đây là trường hợp cực kỳ hiếm gặp, tuy vậy chúng ta vẫn nên loại trừ những giá trị thời gian âm hoặc lớn bất thường.

## Thời gian CPU trên main-thread
Bạn cũng có thể xác định thời gian mà CPU chạy trên main-thread bằng cách chạy đoạn mã sau trên chính main-thread:
```
struct timespec tp;
clock_gettime(CLOCK_THREAD_CPUTIME_ID, &tp);
CFTimeInterval time = tp.tv_sec + tp.tv_nsec / 1e9;
```
Con số này thể hiện khối lượng thời gian mà main-thread sử dụng để chạy các tác vụ mà không bao gồm thời gian chờ, ví dụ khi bị các luồng khác giành quyền.

# Kết luận
Khoảng thời gian trước khi chạy hàm `main()` cung cấp nhiều thông tin hơn về tổng thời gian khởi động của ứng dụng. Việc này sẽ giúp phân tích và tìm cách tăng tốc quá trình khởi động ứng dụng, từ đó nâng cao trải nghiệm người dùng.

# Tài liệu tham khảo
https://medium.com/@michael.eisel/measuring-your-ios-apps-pre-main-time-in-the-wild-98197f3d95b4