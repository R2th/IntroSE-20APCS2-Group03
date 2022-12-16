# Mở đầu 

Xin chào mọi người, để tiếp nối chuỗi bài viết tìm hiểu về tiến trình (process) trong Linux, hôm nay mình xin chia sẻ đến các bạn phần tiếp theo trong việc tìm hiểu các cơ chế giao tiếp giữa các tiến trình khi sử dụng trong hệ điều hành Linux. Như chúng ta đã biết, Linux cung cấp nhiều cơ chế giao tiếp giữa các tiến trình khác nhau và ở bài viết trước, mình đã cùng các bạn tìm hiểu về 2 cơ chế sử dụng [Signal (Tín hiệu) và Pipe(đường ống)](https://viblo.asia/p/giao-tiep-giua-cac-tien-trinh-trong-linux-phan-1-su-dung-signal-va-pipe-Qpmlejxr5rd) . Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về 2 cơ chế tiếp theo là shared memory (bộ nhớ chia sẻ) và message queue (hàng đợi tin nhắn) nhé.
# Shared memory
### Khái niệm

***Shared memory (bộ nhớ được chia sẻ)*** là cơ chế giao tiếp liên tiến trình (IPC) có sẵn trong Linux và các hệ thống giống Unix khác, khi một bộ nhớ chung được sử dụng cho hai hoặc nhiều tiến trình khác nhau. 

Trong các cơ chế giao tiếp giữa các tiến trình khác như các [ pipe (đường ống)](https://viblo.asia/p/giao-tiep-giua-cac-tien-trinh-trong-linux-phan-1-su-dung-signal-va-pipe-Qpmlejxr5rd) hay message queue (hàng đợi tin nhắn), cần thực hiện các bước gửi dữ liệu từ tiến trình này sang  trình khác. Tuy nhiên, đối với shared memory, không có bất kỳ hành vi truyền dữ liệu nào cần phải thực hiện ở đây cả, các tiến trình đều có thể truy cập vào bộ nhớ chung. Và giao tiếp được thực hiện thông qua bộ nhớ được chia sẻ này, nơi các thay đổi được thực hiện bởi một tiến trình có thể được xem bởi tiến trình khác. 

![](https://images.viblo.asia/8284b72a-7bc5-412b-8b71-f3c8342aa7fb.jpg)

Ở đây, các tiến trình chia sẻ một vùng nhớ vật lý thông qua trung gian không gian địa chỉ của chúng. Một vùng nhớ chia sẻ tồn tại độc lập với các tiến trình, và khi một tiến trình muốn truy xuất đến vùng nhớ này, tiến trình phải kết gắn vùng nhớ chung đó vào không gian địa chỉ riêng của từng tiến trình, và thao tác trên đó như một vùng nhớ riêng của mình.

### Sử dụng shared memory

Linux cung cấp các hàm hệ thống được sử dụng để tạo và sử dụng shared memory như sau:
**1. shmget ()**

`int shmget(key_t key, size_t size, int shmflg)`

Trong đó, các đối số:
+ `key`: là khóa giúp nhận ra một bộ nhớ được chia sẻ, nó có thể là một giá trị tùy ý hoặc một giá trị được tạo từ hàm `ftok ()` - hàm giúp tạo một khóa duy nhất.
+ `size`: là kích thước của phân đoạn bộ nhớ được chia sẻ.
+ `shmflg`: chỉ định một cờ (flag/s) bắt buộc cho bộ nhớ được chia sẻ như IPC_CREAT (tạo phân đoạn bộ nhớ mới) hoặc IPC_EXCL (Được sử dụng với IPC_CREAT để tạo phân đoạn bộ nhớ mới và lời gọi hàm sẽ không thành công, nếu phân đoạn này đã tồn tại). Lưu ý là đối số này còn cần đi kèm với các quyền truy cập vào bộ nhớ chia sẻ, bạn cần đặt các quyền phù hợp cho nhu cầu sử dụng của mình.
    
Sau khi lệnh gọi sẽ hàm này được thực hiện thành công, shmget () trả về một mã định danh cho phân đoạn bộ nhớ được chia sẻ.

**2. shmat ()**

`void * shmat(int shmid, const void *shmaddr, int shmflg)`

Trong đó, các đối số:
- `shmid`: là định danh của phân đoạn bộ nhớ chia sẻ và chính là giá trị trả về của lệnh gọi hệ thống shmget ().
- `shmadrr`: là chỉ định địa chỉ để gắn phân đoạn bộ nhớ. Thường chúng ta sẽ đặt nó là NULL và khi đó, mặc định hệ thống sẽ chọn địa chỉ phù hợp để gắn phân đoạn.
- `shmflg`: chỉ định một cờ (flag/s) bắt buộc cho bộ nhớ được chia sẻ chẳng hạn như SHM_RND (làm tròn địa chỉ thành SHMLBA) hoặc SHM_EXEC (cho phép nội dung của phân đoạn được thực thi) hoặc SHM_RDONLY (đính kèm phân đoạn với mục đích chỉ đọc, theo mặc định nó là đọc-ghi) hoặc SHM_REMAP (thay thế ánh xạ hiện có trong phạm vi được chỉ định bởi shmaddr và tiếp tục cho đến khi kết thúc phân đoạn).

Sau khi lệnh gọi hàm này được thực hiện thanh công, nó sẽ trả về địa chỉ mà phân đoạn bộ nhớ chia sẻ được gắn

**3. shmdt ()**

`int shmdt(const void *shmaddr)`

Sau khi tiến trình của bạn được hoàn thành với việc sử dụng bộ nhớ chia sẻ thì bạn có  sẽ cần tách nó ra khỏi bộ nhớ chia sẻ. Điều này được thực hiện bằng cách gọi hàm hệ thống shmdt(). `shmaddr` là địa chỉ của phân đoạn bộ nhớ chia sẻ được tách ra.

**4. shmctl ()**

`int shmctl(int shmid, int cmd, struct shmid_ds *buf)`

Lệnh gọi hệ thống trên giúp thực hiện thao tác điều khiển cho một phân đoạn bộ nhớ chia sẻ với:

- `shmid`: là ID định danh cho bộ nhớ chia sẻ.
- `cmd`: là chỉ định một lệnh được sử dụng trên bộ nhớ được chia sẻ bao gồm:
  + IPC_STAT - Sao chép thông tin về các giá trị hiện tại của từng thành phần trong cấu trúc `struct shmid_ds` vào cấu trúc được chỉ ra bởi con trỏ buf. Lệnh này yêu cầu quyền đọc đối với phân đoạn bộ nhớ được chia sẻ.
  + IPC_SET - Đặt ID người dùng, ID nhóm của chủ sở hữu, quyền, v.v. được trỏ đến theo cấu trúc buf.
  + IPC_RMID - Đánh dấu phân đoạn sẽ bị hủy. Phân đoạn chỉ bị phá hủy sau khi tiến trình cuối cùng đã tách nó ra.
  + IPC_INFO - Trả về thông tin về giới hạn bộ nhớ dùng chung và các tham số trong cấu trúc được trỏ bởi buf.
  + SHM_INFO - Trả về cấu trúc `shm_info` chứa thông tin về tài nguyên hệ thống được tiêu thụ bởi bộ nhớ được chia sẻ.
- `buf`: là một con trỏ đến cấu trúc bộ nhớ dùng chung có tên `struct shmid_ds`. Các giá trị của cấu trúc này sẽ được sử dụng cho cả `set` hoặc `get` theo `cmd`.

Tất cả các lệnh gọi hàm hệ thống trên, nếu xảy ra lỗi và không thành công sẽ trả về cho chúng ta giá trị -1. Để 
### Đánh giá việc sử dụng shared memory

- Ưu điểm của việc sử dụng shared memory là việc không cần đến truyền gửi dữ liệu giúp nó tiết kiệm được chi phí và là phương pháp nhanh nhất giúp trao đổi giữa các tiến trình.
- Nhược điểm của phương pháp này chính là nó sẽ gây ra những khó khăn nhất định trong việc bảo đảm sự toàn vẹn dữ liệu (coherence) , ví dụ : làm sao biết được dữ liệu mà một tiến trình truy xuất là dữ liệu mới nhất mà tiến trình khác đã ghi ? Làm thế nào ngăn cản hai tiến trình cùng đồng thời ghi dữ liệu vào vùng nhớ chung ?…Rõ ràng vùng nhớ chia sẻ cần được bảo vệ bằng những cơ chế đồng bộ hóa thích hợp.. Bên cạnh đó, shared memory cũng không phải là lựa chọn phù hợp trong các hệ phân tán , để trao đổi thông tin giữa các máy tính khác nhau. 

# Message queue
### Khái niệm

***Message queue*** hay ***hàng đợi tin nhắn***  cũng là một cơ chế IPC có sẵn trong Linux. Mỗi một khối dữ liệu được truyền đi được xác định một kiểu (TYPE) cụ thể và người nhận có thể nhận được các dữ liệu đó tùy theo kiểu của dữ liệu. Trong nhiều trường hợp sử dụng, điều này đem lại nhiều hiệu quả hơn thay vì phải nhận dữ liệu theo cách FIFO như cách sử dụng các pipe (đường ống).

![](https://images.viblo.asia/d6195caa-5136-4f91-ba18-e6a6fad070db.png)

### Sử dụng message queue 

Tương tự như với shared memory, để hỗ trợ cơ chế giao tiếp tiến trình bằng message queue, hệ điều hành cũng cung cấp các hàm IPC chuẩn (Interprocess communication) để thực hiện giao tiếp tiến trình với message queue, cơ bản là các hàm:

**1. msgget ()**:  trả về ID định danh cho message queue mới được tạo hoặc trả về định danh của một message queue đã tồn tại cùng với một giá trị khóa nhận dạng của nó.

`int msgget(key_t key, int msgflg)`

**2. msgsnd ()**: Hàm hệ thống này được sử dụng để đưa dữ liệu vào message queue.

`int msgsnd(int msgid, const void *msgp, size_t msgsz, int msgflg)`

**3. msgrcv ()**: Hàm hệ thống thống này giúp lấy dữ liệu ra khỏi môtj message queue.

`int msgrcv(int msgid, const void *msgp, size_t msgsz, long msgtype, int msgflg)`

**4. msgctl ()**: Hàm hệ thống này cũng giúp thực hiện thao tác điều khiển một message queue.

`int msgctl(int msgid, int cmd, struct msqid_ds *buf)`

### Đánh giá việc sử dụng message queue

Sử dụng message queue mang lại nhiều đặc điểm khác so với sử dụng shared memory hay các phương pháp IPC khác như:

- Đơn vị truyền thông tin trong cơ chế giao thiếp này là một data block(hay một thông điệp) và có xác định kiểu, do đó các tiến trình có thể trao đổi dữ liệu ở dạng có cấu trúc.
- Khi sử dụng shared memory, dữ liệu có sẵn cho nhiều tiến trình truy cập. Tuy nhiên, khi sử dụng message queue, khi một tiến trình đã nhận được dữ liệu, nó sẽ không còn được sử dụng cho bất kỳ tiến trình nào khác.
- Không giống như pipe, message queue dựa trên thông điệp, trong khi đường ống dựa trên luồng byte và message queue không nhất thiết phải đọc trước ra trước.
- Có một nhược điểm của message queue là độ dài tối đa của mỗi thông điệp bị giới hạn và vòng đời của các message queue được gắn liền với kernel.

# Tạm kết

Như vậy, chúng ta đã cùng nhau tìm hiểu thêm 2 cơ chế giao tiếp tiến trình trong linux nữa là shared memory và message queue. Và cũng như mình đã nói ở bài viết trước, mỗi phương pháp có ưu điểm và hạn chế riêng cho từng trường hợp sử dụng. Vì vậy, hãy đánh giá cẩn thận nhu cầu của ứng dụng và mức độ hiệu quả của ứng dụng của bạn khi cần lựa chọn một cơ chế giao tiếp tiến trình nhé.

# Nguồn tham khảo
- https://www.tutorialspoint.com/inter_process_communication/inter_process_communication_message_queues.htm