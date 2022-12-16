## I.Listener trong JMeter là gì ?
 - Listener là các phương thức hiển thị kết quả test theo nhiều cách, trực quan hóa các kết quả trả về sau khi thực hiện gửi request đến server.
 
 ![](https://images.viblo.asia/4a2e201e-d71d-4ce3-bd4d-3d20e053b1d4.png)
- Một số các listener thường được sử dụng: 
     - View Results Tree
     - Summary Report
     - Aggregate Report
     - Backend Listener
     - Aggregate Graph
     -  Graph Result
     -   ....
     
## II. Phân tích kết quả test với một số listener thông dụng
### 1. Graph Result
![](https://images.viblo.asia/98285691-f16d-4acd-89e9-36925d011246.png)

- Sau khi thực hiện một script test, Graph Results sẽ trả về kết quả dưới dạng đồ thị như sau: 

![](https://images.viblo.asia/c6550fda-0169-44b0-b23a-3f33d02a1fd6.png)
- Những thông số được biểu thị trên graph với những màu sắc khác nhau:
    - **Samples** (đen) : Tổng số samples hiện tại đã gửi lên server.
    - **Deviation** (đỏ) : Độ lệch chuẩn hiện tại.
    - **Throughput** (xanh lá): Thông lượng biểu thị số lượng requests mà server xử lý trong một đơn vị thời gian.
    - **Average** (xanh dương): Thời gian phản hồi trung bình của tất cả các requests.
#### Phân tích Graph Results
 Ở đây chúng ta sẽ phân tích 2 thông số quan trọng: 
 - **Throughput** : là thông số quan trọng nhất, nó đại diện cho khả năng xử lý độ tải của server. Chỉ số này càng CAO thì hiệu suất của server càng TỐT và ngược lại.
     - Trong ví dụ trên, ta có thể thấy được Throughput hiện tại của trang web Vietnamnet là 7,926.722/minute. Tức là server có thể xử lý 7,926.722 requests trong vòng một phút.
- **Deviation**: thể hiện sự sai lệch hiện tại so với mức trung bình, con số này càng NHỎ thì performance của server càng TỐT.
### 2. Aggregate Report 
![](https://images.viblo.asia/91fc1ab0-bf05-4d36-a433-670134515298.png)

- Sau thêm Listener Aggregate Report, Run test thành công, JMeter sẽ trả về cho chúng ta một bảng kết quả dưới đây.

![](https://images.viblo.asia/96281296-0647-4bba-a529-a4f35d915075.png)
- Trong bảng Aggregate Report bao gồm các giá trị cần quan tâm:
- **Label**: Hiển thị tên của từng request có trong Test plan của bạn. Ở đây chúng ta có 5 requests tương ứng: Chinh tri, Giao duc, Thoi su, Kinh doanh, Du lịch.
- **Samples**: Số lần run của request, được thực hiện với công thức: 
    - **Samples** = **Number of Threads (users)*** **Loop count**
        - Ví dụ: 
            - Number of Threads (users) = 1000
            - Loop count = 1
            - --> Samples = 1000.
- **Average (milliseconds)**: Thời gian phản hồi trung bình (Responsive time) của request cho đến lần run cuối cùng.
- **Min (milliseconds)** : Response time thấp nhất trong tất cả các lần run.
- **Max (milliseconds)**: Responsive time cao nhất trong tất cả các lần run.
- **Median (milliseconds)**: Median sẽ chỉ ra, sẽ có 50% số request có response time nhỏ hơn giá trị (hiển thị trên table), và 50% số request còn lại có response time lớn hơn giá trị này.
- **90% Line (millisecond)**: Nghĩa là 90% số requests sẽ có response time nhỏ hơn giá trị hiển thị trong table, 10% số requests còn lại sẽ có response time lớn hơn giá trị hiển thị trong table.
- **95% Line (millisecond)**: Nghĩa là 95% số requests sẽ có response time nhỏ hơn giá trị hiển thị trong table, 5% số requests còn lại sẽ có response time lớn hơn giá trị hiển thị trong table.
- **99% Line (millisecond)**: Nghĩa là 99% số requests sẽ có response time nhỏ hơn giá trị hiển thị trong table, 1% số requests còn lại sẽ có response time lớn hơn giá trị hiển thị trong table.
- (Note: Các thông số (90%, 95%, 99%) này có thể được thay đổi thông qua file jmeter.properties)

![](https://images.viblo.asia/3b5ef9ff-fbb7-4933-8d1e-177e1c974e49.png)
- **Error%**: % số lượng requests bị fail.
- **Throughput**: Thông lượng. Con số này cho bạn biết được số lượng requests được server xử lý trong một đơn vị thời gian (s, m, h).
     - **Throughput** = **( Tổng số lượng requests)/ (Tổng thời gian)** * **(Đơn vị chuyển đổi)**
    - Với: 
      - Tổng số lượng requests = Tổng số lần request này được run
      - Tổng thời gian = (Thời gian bắt đầu chạy của request cuối cùng) + (Thời gian chạy/ Response Time của request cuối cùng) - (Thời gian bắt đầu chạy của request đầu tiên)
      - Đơn vị chuyển đổi: Mặc định nó sẽ tính theo millisecond, nên để đổi về second thì số này sẽ là 1000, hoặc là (1000x60) nếu bạn muốn chuyển về phút..
-  **KB/sec**: Cũng là thông lượng, nhưng không đo bằng số request, mà đo bằng kilobytes/second.
        Công thức là Throughput KKB/sec = (Throughput * Average Bytes) / 1024
- **Total**: Tổng kết toàn bộ kết quả từ những request bên trên.
       Ngoại trừ # Samples, Throughtput và KB/sec đưuọc tính cộng lại theo đúng nghĩa total. Còn các thông số còn lại được tính bằng cách lấy giá trị trung bình từ tất cả các request bên trên.
#### Phân tích report:
  Hãy tập trung vào 2 thông số quan trọng nhất của mọi Peformance Report:
  - **Response time**: Chỉ ra việc xử lý request NHANH hay CHẬM, và đương nhiên, response time càng THẤP càng tốt.
  - **Throughput**: chỉ ra được số lượng request được server xử lý trong một đơn vị thời gian. Cho nên, cùng một thời gian, càng xử lý càng nhiều càng tốt. Nên với Throughput càng CAO càng tốt.

Dựa vào đó, chúng ta có các trường hợp sau:
  - **Response time THẤP và Throughput THẤP**
     - Trường hợp này sẽ không bao giờ xảy ra. 
     - Vì Response time THẤP nghĩa là thời gian đáp ứng rất nhanh, nhưng Throughput THẤP lại chỉ ra rằng số request được xử lý rất ít. Và tất nhiên " No, chuyện này thật vô lý".
  - **Response time THẤP và Throughput CAO**
    -  Đây là một kết quả lý tưởng phải không nào? 
    - Thời gian xử lý thấp và số lượng request xử lý đồng thời lại cao. Còn chần chờ gì nữa mà không tự tin báo cáo rằng Server đang rất tốt. 
    - Hãy xem xét khả năng mở rộng tính năng hoặc tăng thêm số lượng test để tìm xem giới hạn của server là bao nhiêu.

- **Response time CAO và Througput THẤP**
    - Ngược lại với trường hợp trên, đây là lúc mà performance test của bạn đã bị fail. 
    - Kết quả test chỉ ra rằng thời gian xử lý quá cao, và lượng request được xử lý lại rất thấp. Phải xem lại để improve về phía server.

- **Response time CAO và Throughput CAO**
    - Khá nhạy cảm nhỉ ???
    - Vì bạn có thể thấy Throughput cao, tức là server đang làm việc rất tốt, vậy tại sao thời gian xử lý lại cũng cao (không tốt). Có thể vấn đề lúc này đến từ phía Client, hoặc cụ thể là đến từ Jmeter, có thể đoạn scripts của bạn viết chưa được tối ưu, khiến quá trình nó xử lý mất nhiều thời gian chẳng hạn? 
    - Hãy kiểm tra để chắc chắn rằng mình có một kết quả test chính xác nhé.

### 3. View Results Tree
![](https://images.viblo.asia/5337d395-7dac-42ca-a5a3-db68533d45a8.png)

- Với phương thức hiển thị kết quả bằng Result Tree, sẽ cung cấp chi tiết các status (passed/failed), parameters và data của từng sample.

![](https://images.viblo.asia/bd8d5f2d-7e66-4603-b9b9-bbae9e5a64c7.png)
- Sau khi gửi request, với mỗi Sample chúng ta sẽ nhận được Sampler result tương ứng, nó bao gồm: response code, headers, cookies và những thông tin về time, latency, response size in bytes,...

![](https://images.viblo.asia/92e638f1-6861-4d68-b118-bf6957e37750.png)
### Tổng kết: 
Với mỗi mục đích mà mình sẽ sử dụng các listener khác nhau.
Thông thường, mình sẽ sử dụng kết hợp các loại listener để phân tích kết quả test: 
 - **Aggregate Report** để nhận được tổng quan về perfomance của hệ thống đang test. 
 - Trong trường hợp, thông qua bảng Aggregate nhận thấy có vấn về ở các Label, thì mình sẽ dùng **View Results Tree** để có thể kiểm tra được vấn đề của từng sample.
 

-----

Tài liệu tham khảo
- http://www.testingvn.com/viewtopic.php?t=88057
- https://www.guru99.com/jmeter-performance-testing.html