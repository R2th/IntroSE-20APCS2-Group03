# Mở đầu
Vào một ngày đẹp trời, bạn được sếp giao cho task đánh giá xem hệ thống website khách hàng đang chịu tải được bao nhiêu. WTF, bạn chưa biết gì vậy bạn sẽ làm thế nào.

Việc đánh giá này khá phức tạp và phụ thuộc vào nhiều yếu tố: hạ tầng phần cứng(bandwith, RAM, CPU, S3, load balancing ....), kiến trúc Database(CSDL phân tán, mysql, oracle...), kiến trúc code(design pattern, micro service...)
Đừng lo lắng, việc đầu tiên bạn cần quan tâm là "website average response time" và "concurent users". Đây là 2 thông số quan trọng nhất đối với mỗi website, bạn không muốn website của mình quá chậm(response time) hoặc chỉ đáp ứng được quá ít người dùng (concurent users).     Thế làm thế nào để biết "website average response time" và "concurent users", may thay chúng ta có thể biết qua việc benchmark.

Benchmark sẽ giúp bạn:
* Web server nào sẽ hoạt động tốt cho website (Apache, Nginx...)
* Số server mà bạn đáp ứng tốt nhất cho bao nhiều request
* Việc config trên webserver của bạn đã ổn chưa
# Giới thiệu một số tool benchmark
Hiện tại có rất nhiều tool phục vụ cho việc benchmark performance online . Nhưng trong bài viết này mình chỉ nói về các tool hay sử dụng, mà theo mình là tốt nhất đến hiện tại.
1. ApacheBench 
2. Siege
3. Gobench
4. Apache JMeter
5. wrk
6. HTTPLoad
7. Curl-loader
8. httperf
9. Tsung
# Cài đặt và sử dụng tool
1. ApacheBench

    ApachBench là một "open soure" được sử dụng rất nhiều và cho mọi loại web server.

    Bạn có thể cài đặt bằng command line: 
    ```
    yum install httpd-tools
    ```
    
    Ví dụ về apache bench trên web server dùng apache
    ```
    [root@lab ~]# ab -n 5000 -c 500 http://localhost:80/
    This is ApacheBench, Version 2.3 <$Revision: 655654 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/
    Benchmarking localhost (be patient)
    Completed 500 requests
    Completed 1000 requests
    Completed 1500 requests
    Completed 2000 requests
    Completed 2500 requests
    Completed 3000 requests
    Completed 3500 requests
    Completed 4000 requests
    Completed 4500 requests
    Completed 5000 requests
    Finished 5000 requests
    Server Software:        Apache/2.2.15
    Server Hostname:        localhost
    Server Port:            80
    Document Path:          /
    Document Length:        4961 bytes
    Concurrency Level:      500
    Time taken for tests:   13.389 seconds
    Complete requests:      5000
    Failed requests:        0
    Write errors:           0
    Non-2xx responses:      5058
    Total transferred:      26094222 bytes
    HTML transferred:       25092738 bytes
    Requests per second:    373.45 [#/sec] (mean)
    Time per request:       1338.866 [ms] (mean)
    Time per request:       2.678 [ms] (mean, across all concurrent requests)
    Transfer rate:          1903.30 [Kbytes/sec] received
    Connection Times (ms)
    min  mean[+/-sd] median   max
    Connect:        0   42  20.8     41    1000
    Processing:     0  428 2116.5     65   13310
    Waiting:        0  416 2117.7     55   13303
    Total:         51  470 2121.0    102   13378
    Percentage of the requests served within a certain time (ms)
    50%    102
    66%    117
    75%    130
    80%    132
    90%    149
    95%    255
    98%  13377
    99%  13378
    100%  13378 (longest request)
    ```
    Apache server sẽ đáp ứng được **373 requests per second** and mất khoảng 13.389 giây cho tất cả request.
    
    Dựa vào các thông số benchmark trên bạn có thể thay đổi config để đảm bảo cho việc chạy web server là tốt nhất.
    
    Ví dụ về apache bench trên web server dùng nginix:
    ```
    [root@lab ~]# ab -n 5000 -c 500 http://localhost:80/
    This is ApacheBench, Version 2.3 <$Revision: 655654 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/
    Benchmarking localhost (be patient)
    Completed 500 requests
    Completed 1000 requests
    Completed 1500 requests
    Completed 2000 requests
    Completed 2500 requests
    Completed 3000 requests
    Completed 3500 requests
    Completed 4000 requests
    Completed 4500 requests
    Completed 5000 requests
    Finished 5000 requests
    Server Software:        nginx/1.10.1
    Server Hostname:        localhost
    Server Port:            80
    Document Path:          /
    Document Length:        3698 bytes
    Concurrency Level:      500
    Time taken for tests:   0.758 seconds
    Complete requests:      5000
    Failed requests:        0
    Write errors:           0
    Total transferred:      19660000 bytes
    HTML transferred:       18490000 bytes
    Requests per second:    6593.48 [#/sec] (mean)
    Time per request:       75.832 [ms] (mean)
    Time per request:       0.152 [ms] (mean, across all concurrent requests)
    Transfer rate:          25317.93 [Kbytes/sec] received
    Connection Times (ms)
    min  mean[+/-sd] median   max
    Connect:        0    6  11.0      2      53
    Processing:     5   19   8.2     17      53
    Waiting:        0   18   8.2     16      47
    Total:         10   25  17.4     18      79
    Percentage of the requests served within a certain time (ms)
    50%     18
    66%     21
    75%     21
    80%     22
    90%     69
    95%     73
    98%     75
    99%     76
    00%     79 (longest request)
    [root@lab ~]#
    ```
    
    Chúng ta có thể nhận thấy Nginx đáp ứng được **6593 requests per second**. Vì thế trong trường hợp này việc chọn server dùng Nginx là tốt hơn
    
    Cả 2 đều chạy trên CentOS 6.8 6 4bit
 
 2. SIEGE
 
     SIEGE là một module test HTTP trên môi trường UNIX.
     
     Cài đặt SIEGE:
     
     ```
     # yum install siege
     ```
     
     Ví dụ về việc sử dụng SIEGE
     
     ```
     [root@lab ~]# siege -q -t 5S -c 500 http://localhost/
     Lifting the server siege...      done.
     Transactions:                       4323 hits
     Availability:               100.00 %
     Elapsed time:                       4.60 secs
     Data transferred:        15.25 MB
     Response time:                    0.04 secs
     Transaction rate:       939.78 trans/sec
     Throughput:                         3.31 MB/sec
     Concurrency:                      37.97
     Successful transactions:        4323
     Failed transactions:                0
     Longest transaction:            1.04
     Shortest transaction:            0.00
     [root@lab ~]#
     ```
     
     Ý nghĩa parameter:
     
     -q: không show chi tiết request
     
     -t 5S: chạy trong 5 giây
     
     -c 500: 500 request đồng thời
#  Kết luận
 Có nhiều cách benchmark khác nhau, trên đây chỉ là các ví dụ thông thường nhất. Bạn có thể benchmark cho API, cho upload, download ....
 
 Để tìm hiểu rõ hơn về các cách benchmark, vui lòng tham khảo mục Reference
# Reference
 ApacheBench: https://httpd.apache.org/docs/2.4/programs/ab.html
 
 Siege:  https://www.joedog.org/siege-home/