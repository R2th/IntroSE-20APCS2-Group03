# 1. Giới thiệu
PHP-FPM có một file cấu hình với đầy đủ các chức năng chung, tuy nhiên nó không thuộc phạm vi đề cập ở đây. Ý tưởng của bài viết này là khám phá các thiết lập cấu hình mặc định và thiết lập đã được tối ưu.

Có lý do để nói rằng thiết lập PHP-FPM bên ngoài tài liệu là một điều bí ẩn trừ khi bạn có kinh nghiệm về chủ đề này - đừng sợ, hy vọng bạn sẽ hiểu rõ hơn sau khi đọc bài viết này.

Nó cũng đáng chú ý rằng hệ điều hành có thể và sẽ ảnh hưởng đến ứng dụng đang chạy trên nó. Ví dụ Linux, PHP-FPM đang chạy như một domain socket và TCP socket, số kết nối tối đa, mở port, mở file,...

# 2. Tổng quan về thiết lập PHP-FPM Pool
Nếu bạn lười biếng và không buồn đọc các comment của file default pool configuration (www.conf), thì điều đó thật xấu hổ cho bạn. Nó giải thích sau mỗi thiết lập. Tuy nhiên vì các comments là theo nghĩa đen, họ không giải thích làm thế nào để thiết lập chúng một cách đúng đắn dựa trên cài đặt của bạn (ví dụ web server, web/db server,...).

### PHP-FPM – thống kê cơ bản
Trước khi chúng ta bắt đầu mày mò, hãy liệt kê một vài tài liệu hệ thống cơ bản và kiểm tra benchmart để thấy chúng ta đang ở môi trường nào.

#### System
- System: **Local VM (Hyper-V)**
- OS: **Ubuntu 16.04.4 LTS server**
- CPU: **Intel i7 6700K @ 4GHz** -Hyper-threading enabled (4 vCPUs set)
- Ram: **8GB RAM allocated**
- Disk: **Virtual HD** (software Raid 5)
- Software: **Nginx + PHP-FPM 5.6 + MySQL 5.7**

#### Benchmark
Về benchmark tôi đang sử dụng Siege - bạn có thể tìm ra làm thể nào để cài đặt nó qua website https://www.joedog.org/siege-home

Tôi đang chỉ Siege đến một Magento 1.9.3.8 store (với dự liệu demo). Tôi đã vô hiệu hóa tất cả cache của Magento như vậy chúng ta đang làm với xử lý PHP thuần (Opcode cache cũng bị vô hiệu hóa qua ```php.ini```).

Mặc định của www.conf (Với ngoại lệ của việc cho phép status feature):
```php
[www]
user = www-data
group = www-data
listen = /run/php/php5.6-fpm.sock
listen.owner = www-data
listen.group = www-data

pm = dynamic
pm.max_children = 5
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 3

pm.status_path = /status
```
Lệnh siege của tôi là:
```powershell
siege -c50 -i -b -t1m -f urls.txt
```
- c50 = 50 CONCURRENT users
- i = Mô phỏng người dùng INTERNET, truy cập URL ngẫu nhiên
- b = BENCHMARK: Không có sự chậm chễ giữa các request
- t1m =  Kiểm tra trong 1 phút

Kết quả Siege:

```powershell
Transactions: 553 hits
Availability: 100.00 %
Elapsed time: 59.92 secs
Data transferred: 21.73 MB
Response time: 5.16 secs
Transaction rate: 9.23 trans/sec
Throughput: 0.36 MB/sec
Concurrency: 47.59
Successful transactions: 553
Failed transactions: 0
Longest transaction: 6.65
Shortest transaction: 0.30
```

#### PHP-FPM status page:
Bạn có thể giám sát PHP-FPM child processes bằng việc cho phép PHP-FPM feature.
http://php.net/manual/en/install.fpm.configuration.php#pm.status-path

Kết quả của trang PHP-FPM status sau khi khởi tạo benchmark:

```powershell
pool: www
 process manager: dynamic
 start time: 29/Mar/2018:19:03:48 +0100
 start since: 829
 accepted conn: 6167
 listen queue: 0
 max listen queue: 0
 listen queue len: 0
 idle processes: 2
 active processes: 1
 total processes: 3
 max active processes: 5
[max children reached: 2]
 slow requests: 0
```

Nổi bật trong màu đỏ là  "**max children reached**" - Đây là một người chỉ dẫn tuyệt vời cái mà chúng ta đã đạt đến ngưỡng của PHP-FPM child processes để giải quyết với các requets đang đến. "**max children reached**" đã báo cáo bởi trang PHP-FPM status hoặc trong file log của PHP-FPM:
```
WARNING: [pool www] server reached pm.max_children setting (5), consider raising it
```

Có 2 hướng fix:
- Giảm lưu lượng của server xuống (funny)
- Tăng số lượng của PHP-FPM child processes (**pm.max_children**)

### PHP-FPM – child processes

Đây có thể là giá trị quan trọng nhất để thiết lập. Tại sao ? Bởi vì theo nghĩa đen đây là giá trị lớn nhất của PHP-FPM child proceses sẽ được sinh ra.

Tại sao nó quan trọng ? Hãy sử dụng một tín hiệu để giải thích điều này dựa vào kết quả ở trên.

Bạn đã từng đến một siêu thị và chỉ có một cửa thanh toán chưa ? Điều gì sẽ xảy ra. Một hàng đợi để thực hiện thanh toán.

Giống với những điều xảy ra với PHP-FPM - nếu có nhiều kết nối đến cùng lúc, nó sẽ mất một thời gian dài để xử lý tất cả các request đến.

Đây là cái mà PHP-FPM request dường như tương tự  với việc bạn có ```pm.max_children = 1```;

> Trước khi xem xét minh họa bên dưới cho pool hoặc workers - Phát hiện của tôi dựa trên nghiên cứu trực tuyến và kinh nghiệm. Mặc dù tôi không hoàn toàn chắc chắn làm thế nào PHP-FPM master proceses ưu tiên hoặc phân phối tải đến pools, tôi đã hiểu nó làm việc giống như hình bên dưới (Vui lòng cho tôi biết nếu cách hiểu của tôi là không đúng)

![](https://images.viblo.asia/21097057-8b7b-470f-9ba2-100708cb15ae.jpg)

Mỗi người màu xanh là các request từ NGINX.
Ở trên chỉ có một supermarket (PHP-FPM worker), để giao dịch với mỗi request. Thông thường, với FAST PHP script, hàng đợi sẽ được xử lý trước khi bạn có thể nhận thấy.

> Chú ý: Nói một cách thẳng thắn, phần cứng kém hoặc thiếu tối ưu hóa hệ điều hành có thể là nút thắt cổ chai mặc dù có code PHP nhanh (ví dụ CPU, ổ cứng, network, thiết lập hệ điều hành và nhiều thứ khác nữa). Cho phần còn lại của bài viết, hãy giả sử rằng mọi thứ là chạy nhanh và chỉ có cấu hình PHP-FPM của chúng ta là cần xem xét.

Tiếp theo, hãy hình dung nhân 5 lần PHP-FPM wokers (child proceses) thay vì 1:

![](https://images.viblo.asia/551264d6-8ea4-4276-9375-f205b7e91645.jpg)

> Lưu ý: Từ những cái tôi đã đọc, một hàng đợi request là không cô lập trên một PHP-FPM worker, mà là PHP-FPM master process. FPM là viết tắt cho FastCGI Process Manager, từ khóa ở đây là **Manager**, thứ mà sẽ quản lý công việc tải đến workers trong pools. Ví dụ, bạn có 1 pool, với 5 workers, mỗi worker không có hàng đợi của riêng nó, master process sẽ quản lý mỗi request dựa trên tất cả các pools và workers dưới điều khiển của nó.

###
Bên dưới là một view vi mô hơn của requests được xử lý bởi một pool:

![](https://images.viblo.asia/7ba250df-7a41-4f36-bd56-5cf6223bf429.jpg)

Và tiếp theo một view bao quát hơn của các request được xử lý bởi nhiều pools:

![](https://images.viblo.asia/7f708f90-84e5-4d80-b2a8-e5a833325d11.jpg)

### Tính toán giá trị cho pm.max_children

#### Phương thức đầu tiên cho việc tính toán
Hãy giả sử rằng trong file ```php.ini```, ```max_memory``` được thiết lập là 128MB và bạn có xấp xỉ 8GB RAM trong hệ thống của bạn.

Giả sử bạn giữ lại 512MB cho hệ điều hành và các xử lý khác, còn lại 7.5GB, chúng ta không muốn tất các PHP-prrocesses vượt qua 7.5GB này, thậm chí tệ hơn là gây ra sự hoán đổi.

Nếu chúng ta giả thiết ứng dụng PHP/script hay bất cứ cái gì, tiêu thụ tối đa là 128MB, chúng ta muốn chia 7.5GB cho 128MB:

7500MB / 128MB = 58 (Làm tròn)
```
pm.max_children = 58
```

#### Phương thức thứ hai cho việc tính toán
Phương thức thứ hai liên quan đến một cách tính toán chính xác hơn. Bạn làm được điều này bằng cách phát hiện ra mức tiêu thụ bộ nhớ trung bình cho tất cả các PHP-FPM proceses đang chạy. Chỉ dẫn tốt nhất của tôi là chạy câu lệnh dưới đây trong khi hệ thống đang tải (tức là đang có các request đến website).

Bước 1 - Xác định phiên bản của PHP-FPM đang chạy
Chạy lệnh sau (với môi trường Ubunntu):
```
sudo service --status-all | grep -i fpm
```
```
Output
[ + ] php-fpm5.6
```

Output trên cho môi trường dev của tôi là php-fpm5.6, nó có thể là php5.6-fpm, php-fpm7.0-fpm ở môi trường của bạn. Vì thế đó là lý do tại sao tôi đã nói chúng ta cần sử dụng câu lệnh trên để xác định điều này.

Bước 2- Tính toán mức tiêu thụ bộ nhớ trung bình

Chạy lệnh bên dưới đưa cho chúng ta bộ nhớ trung bình được sử dụng trong format mà con người có thể đọc được (MB).
Các bạn hãy điều chỉnh phiên bản của php-fpm đúng với phiên bản trên môi trường của bạn:

```powershell
ps --no-headers -o "rss,cmd" -C php-fpm5.6 | awk '{ sum+=$1 } END { printf ("%d%s\n", sum/NR/1024,"Mb") }'
```

Output:

```
35Mb
```

Tôi chạy lại câu lệnh trong khi đang test website với Siege để lấy về giá trị thực tế hơn:

Output:
```
60Mb
```

Như vậy dựa vào kết quả ở trên, hãy điền giá trị này đến công thức tính toán cho **pm.max_children**:

7500MB / 60MB = 125 (gần bằng)

Cấu hình mới của PHP-FPM của tôi sẽ trông như thế này:

```powershell
[www]

user = www-data
group = www-data
listen = /run/php/php5.6-fpm.sock
listen.owner = www-data
listen.group = www-data
pm = dynamic
[pm.max_children = 125]
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 3


pm.status_path = /status
```

#### pm.min_spare_servers và pm.max_spare_servers
Vì hiện tại chúng ta đã thiết lập process manager để sinh ra child workers động

```
pm = dynamic
```
Chúng ta cần tính toán **pm.min_spare_servers và pm.max_spare_servers**. Có một chút thông tin trong tài liệu chính thức về những config này http://php.net/manual/en/install.fpm.configuration.php#pm.min-spare-servers.
Chúng ta có thể quan sát các giá trị hiện tại và làm một vài giả định dựa trên các giá trị mặc định

```
pm.max_children = 5
pm.start_servers = 2 
pm.min_spare_servers = 1 
pm.max_spare_servers = 3
```

Chúng ta biết rằng **pm.max_children** là số tối đa của chill processes. Như vậy hãy coi đây là 100%. Chúng ta thử tính toán bao nhiêu phần trăm các giá trị khác dựa trên **pm.max_children**:

#### pm.min_spare_servers
Mô tả cho config này có trong file ```www.conf```
> ; pm.min_spare_servers – the minimum number of children in ‘idle’
> 
> ; state (waiting to process). If the number
> 
> ; of ‘idle’ processes is less than this

```
pm.min_spare_servers = 1
```

(1 / 5) * 100 = 20%

Theo đó, chúng ta nên thiết lập **pm.min_spare_servers**  = 20% của **pm.max_children**

#### pm.max_spare_servers
Mô tả cho config này có trong file ```www.conf```
> ; pm.max_spare_servers – the maximum number of children in ‘idle’
> 
>; state (waiting to process). If the number
>
>; of ‘idle’ processes is greater than this
>
>; number then some children will be killed.

```
pm.max_spare_servers = 3
```
(3 / 5) * 100 = 60%

Theo đó, chúng ta nên thiết lập **pm.max_spare_servers**  = 60% của **pm.max_children**

#### pm.start_servers
>; pm.start_servers – the number of children created on startup.

Bây giờ chúng ta đã có spare min và max children, chúng ta có thể quan sát  **pm.start_servers**. Dựa trên các comment trong file ```www.conf```, nó có một số chỉ dẫn làm thế nào để thiết lập giá trị này

>; The number of child processes created on startup.
>
>; Note: Used only when pm is set to ‘dynamic’
>
>; Default Value: min_spare_servers + (max_spare_servers – min_spare_servers) / 2

### Để tất cả chúng cùng với nhau

Dựa trên giá trị giá trị đã tính toán trước đó **pm.max_children = 125**, chúng ta có thể sử dụng giá trị này trong việc tính toán.

**pm.min_spare_servers** = 20% của **pm.max_children**
(20 / 100) * 125 = 25

**pm.max_spare_servers** = 60% của **pm.max_children**
(60 / 100) * 125 = 75

**pm.start_servers** = **min_spare_servers** + (**max_spare_servers** – **min_spare_servers)** / 2
25 + (75 – 25) / 2 = 37 (làm tròn)

- Config sau khi cập nhật:

```powershell
[www]

user = www-data
group = www-data
listen = /run/php/php5.6-fpm.sock
listen.owner = www-data
listen.group = www-data
pm = dynamic
[pm.max_children = 125]
[pm.start_servers = 37]
[pm.min_spare_servers = 25]
[pm.max_spare_servers = 75]

pm.status_path = /status
```

- Ouput của status page sau khi cập nhật
```
pool:                 www
process manager:      dynamic
start time:           31/Mar/2018:18:44:09 +0100
start since:          18
accepted conn:        2
listen queue:         0
max listen queue:     0
listen queue len:     0
idle processes:       36
active processes:     1
total processes:      37
max active processes: 1
max children reached: 0
slow requests:        0
```

### Kiểm tra giá trị mới của chúng ta
Chạy lệnh bên dưới:
```
siege -c50 -i -b -t1m -f urls.txt
```

Kết quả:

```
Lifting the server siege...
Transactions: 600 hits
Availability: 100.00 %
Elapsed time: 59.29 secs
Data transferred: 23.40 MB
Response time: 4.76 secs
Transaction rate: 10.12 trans/sec
Throughput: 0.39 MB/sec
Concurrency: 48.20
Successful transactions: 600
Failed transactions: 0
Longest transaction: 8.59
Shortest transaction: 2.77
```

Kết quả cho status page:

```
pool:                 www
process manager:      dynamic
start time:           31/Mar/2018:19:50:47 +0100
start since:          414
accepted conn:        636
listen queue:         0
max listen queue:     0
listen queue len:     0
idle processes:       74
active processes:     1
total processes:      75
max active processes: 53
max children reached: 0
slow requests:        0
```

Hãy so sánh kết quả này với kết quả baseline:

|  | Default | Optimised| Difference |
| -------- | -------- | -------- |-------- |
|   Transactions   |    553  |   600   |   + 47  |
|   Availability   |    100%    |   100%   |  -   |
|   Elapsed Time   |  59.92   |   59.29   |   -  |
|   Data transferred  |   21.73 MB   |   23.40 MB   |   + 1.67  |
|   Response time    |   5.16 secs   |   4.76 secs   |  – 0.4 sec   |
|   Transaction rate  |  9.23 trans/sec    |   10.12 trans/sec   |   + 0.89  |
|   Throughput   |  0.36 MB/sec    |   0.39 MB/sec   |  + 0.03 MB   |
|   Concurrency  |  47.59   |   48.20   |  + 0.61   |
|   Successful transactions  |   553   |   600   |   + 47  |
|   Failed transactions  |   0   |  0    |   -  |
|   Longest transaction    |   6.65   |  8.59    |   + 1.94  |
|   Shortest transaction   |   0.30   |   2.77   |   + 2.47  |

# 3. Các loại PHP-FPM management
PHP-FPM thiết lập mặc định process management là **dynamic**. Có 2 kiểu khác: **status** và **ondemand**. Mỗi cái có ưu điểm riêng phụ thuộc vào server của bạn và tài nguyên của nó. Đoạn bên dưới là mô tả trong file config:

```comment
; Choose how the process manager will control the number of child processes.
; Possible Values:
;   static  - a fixed number (pm.max_children) of child processes;
;   dynamic - the number of child processes are set dynamically based on the
;             following directives. With this process management, there will be
;             always at least 1 children.
;             pm.max_children      - the maximum number of children that can
;                                    be alive at the same time.
;             pm.start_servers     - the number of children created on startup.
;             pm.min_spare_servers - the minimum number of children in 'idle'
;                                    state (waiting to process). If the number
;                                    of 'idle' processes is less than this
;                                    number then some children will be created.
;             pm.max_spare_servers - the maximum number of children in 'idle'
;                                    state (waiting to process). If the number
;                                    of 'idle' processes is greater than this
;                                    number then some children will be killed.
;  ondemand - no children are created at startup. Children will be forked when
;             new requests will connect. The following parameter are used:
;             pm.max_children           - the maximum number of children that
;                                         can be alive at the same time.
;             pm.process_idle_timeout   - The number of seconds after which
;                                         an idle process will be killed.
```

- **pm = ondemand** Tên của nó đã giải thích ý nghĩa chính nó và đây là kiểu quản lý hiệu quả nhất - nó sẽ loại bỏ tất cả các PHP-FPM process chậm chạp, không hiệu quả để làm trống bộ nhớ và chỉ sản sinh lại chúng khi cần thiết.

    **Kiểu này tốt ít bộ nhớ nhất.**
- **pm = static** Sản sinh ra số child processes lớn nhất ngay lập tức. Điều này có một số lợi ích, chính là PHP-FPM không phải sản sinh lại processes mới khi cần. Nó rõ ràng là nhanh hơn để xử lý các requests nếu bạn đã có sẵn các child processes ở đó, không phải chậm chễ để sản sinh lại.

    **Kiểu này sử dụng nhiều bộ nhớ nhất**

- **pm = dynamic** chia sẻ các hành xử tương tự như **static**, chỉ khác là bạn có thêm các thiết lập của **pm.min_spare_servers** và **pm.max_spare_servers**, trong đó có một số child processes được sản sinh từ khi khởi động và đợi các requests để xử lý.

    **Đây là sự cần bằng tốt giữa static và ondemand trong điều kiện sử dụng bộ nhớ**
   
 Tôi đã làm một số testing để kiểm tra những khác biệt này trong một môi trường làm việc.
Tôi sửu dụng câu lệnh dưới đây để tính toán bộ nhớ khởi tạo khi khởi động lại PHP-FPM và sau khi thực hiện benchmark:
```
ps --no-headers -o "rss,cmd" -C php-fpm5.6 | awk '{ sum+=$1 } END { printf ("%d%s\n", sum/1024,"Mb") }'
```

Kết quả như bảng sau:

| pm mode | PHP-FPM restart | 1 min after benchmark |
| -------- | -------- | -------- |
| ondemand     | 32Mb     | 32Mb     |
| dynamic     | 70Mb     | 400Mb     |
| static     | 412Mb     | 1864Mb     |


# 4. Thảo luận
Suy nghĩ cuối cùng của tôi là nó đáng để điều chỉnh các cài đặt PHP-FPM hoặc ít nhất là dành một chút thời gian để hiểu các nút thắt nằm ở đâu và nơi bạn có thể siết chặt mọi hiệu suất với cấu hình PHP-FPM của mình.

Để tìm hiểu xem nên sử dụng **danymic**, **static** hay **ondemand**, chỉ cần xem kỹ thiết lập máy chủ của bạn và những gì nó làm.

- Nếu bạn có một máy chủ web chuyên dụng, theo cá nhân tôi thì nên sử dụng **static**.
- Nếu bạn có server thực hiện nhiều thứ (web/db), **dynamic** sẽ là tốt hơn
- Nếu bạn đang chạy một máy chủ poxy thực sự có ít bộ nhớ và hệ thống của bạn không nhận được quá nhiều lưu lượng truy cập hoặc nếu ứng dụng của bạn không mất quá nhiều thời gian để xử lý mã PHP, thì tôi khuyên bạn nên sử dụng **ondemand**.

**Bài viết được lược dịch từ nguồn**: [PHP-FPM – process management](https://gurdeep.ninja/php-fpm-process-management/)