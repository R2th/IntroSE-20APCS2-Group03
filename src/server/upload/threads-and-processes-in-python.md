## What is parallel processing?

Về cơ bản làm hai việc cùng một lúc, hoặc chạy code đồng thời trên các CPU khác nhau, hoặc chạy code cùng một CPU và đạt được tốc độ tăng tốc bằng cách tận dụng các chu kỳ CPU “lãng phí” trong khi chương trình của bạn đang chờ tài nguyên bên ngoài --upload file, gọi API.

Ví dụ, đây là một chương trình "normal". Nó tải xuống một danh sách các URL tại một thời điểm bằng cách sử dụng một chủ đề duy nhất.

![](https://images.viblo.asia/e2903a7a-75b0-471e-9235-d084c49b3d82.png)

Đây là chương trình tương tự sử dụng 2 threads. Nó phân chia các url giữa các thread giúp chúng ta tăng tốc gần gấp đôi.

![](https://images.viblo.asia/a56c00d1-76c7-4559-8591-a6bc16498e59.png)

1. Thêm inside function của bạn và return start và stop time của nó
```
URLS = [url1, url2, url3, ...]
def download(url, base):
    start = time.time() - base
    resp = urlopen(url)
    stop = time.time() - base
    return start,stop
```
2. Để hình dung single thread, hãy chạy function của bạn nhiều lần và lưu trữ start và stop times
```
results = [download(url, 1) for url in URLS]
```
3. Chuyển đổi mảng kết quả của thời gian [start, stop] và vẽ biểu đồ bar chart
```
def visualize_runtimes(results):
    start,stop = np.array(results).T
    plt.barh(range(len(start)), stop-start, left=start)
    plt.grid(axis=’x’)
    plt.ylabel("Tasks")
    plt.xlabel("Seconds")
```
Biểu đồ cho thấy multiple threads  có thể được tạo theo cùng một cách. Các phương thức trong thư viện của Python trả về một mảng kết quả.

## Process vs Thread
Process là một phiên bản của program (ví dụ:  Jupyter notebook, Python interpreter). Process sinh ra các thread (sub-processes) để xử lý các tác vụ con như đọc keystrokes, loading HTML pages, saving files. Các thread sống bên trong các process và chia sẻ cùng một không gian bộ nhớ.

Ví dụ: Microsoft Word
Khi bạn mở Word, bạn tạo một process. Khi bạn bắt đầu nhập, process tạo ra các thread: một thread để đọc các lần gõ phím, một thread khác để hiển thị văn bản, một thread để tự động lưu file của bạn và một thread khác để đánh dấu lỗi chính tả. Bằng cách tạo ra nhiều thread, Microsoft tận dụng thời gian CPU nhàn rỗi (chờ các lần gõ phím hoặc tải file) và giúp bạn làm việc hiệu quả hơn.

### Process
* Được tạo bởi OS để chạy các chương trình
* Processes có thể có multiple threads
* Chỉ phí của processes cao hơn threads bởi việc đóng và mở chương trình mất nhiều thời gian hơn
* Hai processes có thể thực thi code đồng thời trong cùng một chương trình python
* Chia sẻ thông tin giữa các processes chậm hơn chia sẻ giữa các threads vì các processes không chia sẻ không gian bộ nhớ. Trong python, họ chia sẻ thông tin bằng cách chọn các cấu trúc dữ liệu như mảng đòi hỏi thời gian IO.

### Thread
* Các threads giống như các processes nhỏ sống bên trong một process
* Chúng chia sẻ không gian bộ nhớ và đọc và ghi hiệu quả vào các biến giống nhau
* Hai threads không thể thực thi code đồng thời trong cùng một chương trình python (mặc dù có các cách giải quyết *)

### CPU vs Core
CPU, hoặc bộ xử lý, quản lý công việc tính toán cơ bản của máy tính. CPU có một hoặc nhiều lõi, cho phép CPU thực thi code đồng thời. 

Với một lõi đơn, không có tốc độ tăng cho các tác vụ đòi hỏi nhiều CPU (ví dụ: vòng lặp, số học). Hệ điều hành chuyển đổi qua lại giữa các tác vụ thực hiện từng tác vụ một chút tại một thời điểm. Đây là lý do tại sao đối với các hoạt động nhỏ (ví dụ: tải xuống một vài hình ảnh), đa nhiệm đôi khi có thể ảnh hưởng đến hiệu suất của bạn. Có chi phí liên quan đến việc khởi chạy và duy trì nhiều tác vụ.

### Python’s GIL problem
CPython (triển khai python tiêu chuẩn) có một thứ gọi là GIL (Global Interpreter Lock), ngăn hai threads thực thi đồng thời trong cùng một chương trình. Một số người khó chịu vì điều này, trong khi những người khác lại quyết liệt bảo vệ nó. Tuy nhiên, vẫn có những cách giải quyết khác và các thư viện như Numpy đã bỏ qua hạn chế này bằng cách chạy mã bên ngoài trong C.

### When to use threads vs processes?
* Các process tăng tốc các hoạt động Python sử dụng nhiều CPU vì chúng được hưởng lợi từ nhiều lõi và tránh GIL.
* Các thread tốt nhất cho các tác vụ IO hoặc các tác vụ liên quan đến hệ thống bên ngoài vì các thread có thể kết hợp công việc của chúng hiệu quả hơn. Các process cần chọn lọc kết quả của chúng để kết hợp chúng, điều này mất thời gian
* Các thread không mang lại lợi ích gì trong python cho các tác vụ chuyên sâu của CPU vì GIL.
Đối với một số hoạt động nhất định như Dot Product, Numpy hoạt động xung quanh Python’s GIL và thực thi code song song.

## Parallel processing examples
Thư viện [concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html) của Python thật thú vị khi làm việc. Chỉ cần chuyển vào function của bạn, list các items cần làm việc và số lượng công nhân

```
def multithreading(func, args, 
                   workers):
    with ThreadPoolExecutor(workers) as ex:
        res = ex.map(func, args)
    return list(res)
def multiprocessing(func, args, 
                    workers):
    with ProcessPoolExecutor(work) as ex:
        res = ex.map(func, args)
    return list(res)
```

### API calls
Tôi nhận thấy các thread hoạt động tốt hơn cho các cuộc gọi API và quan sát thấy tốc độ tăng lên qua xử lý nối tiếp và đa xử lý.

```
def download(url):
    try:
        resp = urlopen(url)
    except Exception as e:
        print ('ERROR: %s' % e)
```
![](https://images.viblo.asia/0a96dad1-8655-4267-8c66-a2fe756aa7e7.png)

### 2 threads
![](https://images.viblo.asia/b518d848-c958-4327-837e-83d7ce0d0ecb.png)

### 4 threads
![](https://images.viblo.asia/3b9589ab-8007-440f-a2d1-5a78f2c01969.png)

### 2 processes
![](https://images.viblo.asia/dcd94519-c25d-4d30-9e78-78dc95d2058b.png)

### 4 processes
![](https://images.viblo.asia/44b6734e-a3a4-42db-a01c-6fbcf9adeaeb.png)

## IO Heavy Task
Tôi đã chuyển qua một loạt các chuỗi văn bản khổng lồ để xem hiệu suất ghi khác nhau như thế nào. Các  thread dường như giành chiến thắng ở đây, nhưng đa xử lý cũng cải thiện thời gian chạy.
```
def io_heavy(text):
    f = open('output.txt', 'wt', encoding='utf-8')
    f.write(text)
    f.close()
```

### Serial
```
%timeit -n 1 [io_heavy(TEXT,1) for i in range(N)]
>> 1 loop, best of 3: 1.37 s per loop
```

### 4 threads
![](https://images.viblo.asia/f0bb1673-a69a-437f-be2e-789e7343fd0c.png)

### 4 processes
![](https://images.viblo.asia/345ce931-8daf-4c88-a087-2f6d7ad00be6.png)

### CPU Intensive
Đa xử lý đã giành được ngày ở đây như mong đợi. Các quá trình tránh GIL và thực thi code đồng thời trên nhiều lõi.
```
def cpu_heavy(n):
    count = 0
    for i in range(n):
        count += i
```

![](https://images.viblo.asia/3ca8d2a7-4078-44c6-88e0-10556b55c27b.png)

**Serial**: 4.2 seconds
**4 threads**: 6.5 seconds
**4 processes**: 1.9 seconds

Numpy Dot Product
Đúng như mong đợi, tôi không thấy lợi ích gì khi thêm thread hoặc process vào code này. Numpy thực thi mã C bên ngoài đằng sau và do đó tránh được GIL.
```
def dot_product(i, base):
    start = time.time() - base
    res = np.dot(a,b)
    stop = time.time() - base
    return start,stop
```

**Serial**: 2.8 seconds 
**2 threads**: 3.4 seconds
**2 processes**: 3.3 seconds

### Tài liệu tham khảo
https://medium.com/@bfortuner/python-multithreading-vs-multiprocessing-73072ce5600b