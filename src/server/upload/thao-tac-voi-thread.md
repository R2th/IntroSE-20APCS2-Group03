# 1. Giới thiệu
Trong bài này, chúng ta sẽ tập trung vào cách thread được tạo ra, hủy bỏ và định danh của thread trong hệ thống (**thread ID**). Xuyên suốt bài học sẽ là các ví dụ kèm theo để giải thích cách lập trình cơ bản với luồng.
# 2. Thread ID
Cũng giống như một tiến trình được xác định bởi một **process ID**, một thread trong process được xác định bởi một **thread ID**. 
Ở đây, có một số điểm thú vị giữa process ID và thread ID cần được làm rõ.
* process ID là duy nhất trên toàn hệ thống, trong đó thread ID là duy nhất trong một tiến trình (process).
* process ID là một giá trị số nguyên nhưng thread ID không nhất thiết phải là một giá trị số nguyên. Nó có thể là một **structure**.
* process ID có thể được in ra rất dễ dàng trong khi thread ID thì không.

Thread ID sẽ được đại diện bởi kiểu **pthread_t**. Phần lớn các trường hợp thread ID sẽ là một structure nên để so sánh hai thread ID với nhau ta cần một function có thể thực hiện công việc  này (Đối với process ID là một số nguyên thì việc so sánh đơn giản hơn)

```c
#include <pthread.h>

/*
* @return Trả về 0 nếu tid1 khác tid2, khác không nếu tid1 = tid2.
*/

int pthread_equal(pthread_t tid1, pthread_t tid2); 
```

Ngoài ra, một thread có thể thu được ID của chính nó thông qua việc gọi hàm **pthread_self()**. 
```c
include <pthread.h>

/*
*  @return Trả về thread ID của thread đang gọi pthread_self().
*/

pthread_t pthread_self(void);
```

Lấy một ví dụ về việc sử dụng hai chức năng trên, giả sử rằng ta có một danh sách liên kết chứa dữ liệu của các threads khác nhau. Mỗi một node trong danh sách liên kết này chứa thread ID và dữ liệu tương ứng của thread ID đó. Lúc này, bất cứ khi nào thread muốn lấy dữ liệu của nó từ danh sách liên kết. Bước đầu tiên nó cần phải lấy được thread ID của chính mình bằng việc gọi pthread_self() và sau đó nó sẽ gọi pthread_equal() để kiếm tra node nào đang chứa dữ liệu mà nó cần. 



# 3. Tạo thread mới
Thông thường, khi chương trình (**program**) được khởi chạy và trở thành một tiến trình (**process**), lúc này bản thân tiến trình đó chính là một **single-thread** (tiến trình đơn luồng), tiến trình tạo nhiều hơn 1 threads được gọi là **mutiple-thread** (tiến trình đa luồng) . Vì vậy, ta có thể kết luận rằng mọi tiến trình đều có ít nhất một thread. Trong đó, thread chứa hàm main được gọi là **main thread**.

Để tạo một thread mới chúng ta sử dụng hàm **pthread_create()** với prototype như sau:
```c
/*
* @return Trả về 0 nếu thành công, trả về một số dương nếu là một lỗi.
*/

int pthread_create(pthread_t *threadID, const pthread_attr_t *attr, void *(*start)(void *), void *arg);
```

Hàm pthread_create() bao gồm 4 tham số, chúng ta sẽ cùng tìm hiểu về chúng.

* **Đối số đầu tiên** : Một khi tiến trình được gọi thành công, đối số đầu tiên sẽ giữ thread ID của thread mới được tạo.
* **Đối số thứ hai** : Thông thường giá trị này đặt thành NULL.
* **Đối số thứ ba** : Là một con trỏ hàm (**function pointer**) . Mỗi một thread sẽ chạy riêng một function,  địa chỉ của function này sẽ được truyền tại đối số thứ ba để linux biết được thread này bắt đầu chạy từ đâu.
* **Đối số thứ tư** : Đối sô arg được truyền vào có kiểu void, điều này cho phép ta truyền bất kì kiểu dữ liệu nào vào hàm xử lý của thread. Hoặc giá trị này có thể là NULL nếu ta không muốn truyền bất cứ đối số nào. Điều này sẽ được thể hiện rõ ràng hơn trong ví dụ dưới đây.

## 3.1. Ví dụ 1 
Ví dụ sau đây sẽ sử dụng 3 hàm được mô tả bên trên.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

pthread_t thread_id1, thread_id2;

typedef struct {
    char name[30];
    char msg[30];
} thr_data_t;

static void *thr_handle(void *args) 
{
    pthread_t tid = pthread_self();
    thr_data_t *data = (thr_data_t *)args;

    if (pthread_equal(tid, thread_id1)) {
        printf("I'm thread_id1\n\n");
    } else {
        printf("I'm thread_id2\n");
        printf("Hello %s, welcome to join %s\n", data->name, data->msg);
    }
}


int main(int argc, char const *argv[])
{
    /* code */
    int ret;
    thr_data_t data = {0};

    strncpy(data.name, "phonglt9", sizeof(data.name));                 
    strncpy(data.msg, "Posix thread programming\n", sizeof(data.msg));

    if (ret = pthread_create(&thread_id1, NULL, &thr_handle, NULL)) {
        printf("pthread_create() error number=%d\n", ret);
        return -1;
    }

    if (ret = pthread_create(&thread_id2, NULL, &thr_handle, &data)) {
        printf("pthread_create() error number=%d\n", ret);
        return -1;
    }

    sleep(5);

    return 0;
}
```

Đoạn mã trên sử dụng pthread_create() để tạo ra hai thread mới. Đối với thread thứ hai, chúng ta sẽ truyền thêm dữ liệu cho nó qua đối số arg, cả hai threads đều sử dụng chung một hàm xử lý là thr_handle. 

Bên trong hàm thr_handle chúng ta sử dụng pthread_self() và pthread_equal() để xác định xem đâu là thread đầu tiên và thread thứ hai được tạo ra. Nếu là thread thứ hai thì in ra dữ liệu được truyền từ bên ngoài vào.

Kết quả sau khi compile và cho chạy chương trình như sau:

![image.png](https://images.viblo.asia/b23a721c-0031-49a0-bd31-5723be8a11a2.png)

# 4. Kết thúc thread
Một thead đang thực thi có thể bị kết thúc bởi một trong số những cách sau:
* Hàm xử lý của thread thực hiện return.
* Hàm xử lý của thread thực hiện gọi **pthread_exit()**.
* Thread bị hủy bỏ bởi hàm **pthread_cancel()**.
* Bất kì threads nào gọi **exit()** hoặc main thread thực hiện **return**. Nếu điều này xảy ra thì tất cả các threads còn lại sẽ bị kết thúc ngay lập tức.

Hàm pthread_exit() kết thúc thread đang gọi và chỉ định giá trị trả về, giá trị này có thể nhận được trong một thread khác bằng cách gọi **pthread_join()**. Prototype của pthread_exit().

```
include <pthread.h>

/*
* @param[out] reval Giá trị trả về khi kết thúc thread.
*/

void pthread_exit(void *retval);
```

Ta thấy rằng hàm này chỉ chấp nhận một đối số, đó là giá trị trả về từ thread đang gọi hàm này. Giá trị trả về này được truy cập bởi thread cha đang đợi thread này kết thúc và có thể được truy cập bởi một thread khác thông qua pthread_join() vừa giải thích ở trên.

Điểm thú vị ở đây là cơ chế quản lý của thread khá tương đồng với process. Chúng ta sẽ cùng thảo luận điểm này ở bài tiếp theo, tránh làm bài đọc bị quá tải.
# 5. Kết luận
Kết thúc bài viết, người đọc cần nắm điểm sau:
* Phân biệt được program, process và thread.
* Phân biệt được thread ID với process ID và cách sử dụng.
* Cách tạo lập và kết thúc thread.