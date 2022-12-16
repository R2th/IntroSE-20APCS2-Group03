# Mở đầu
Như đã nói từ phần 1, mình đã giới thiệu 1 số tool benchmak. Mỗi tool sẽ có ưu và nhược điểm khác nhau, phần này mình sẽ tiếp tục giới thiệu các tool khác. (Link phần 1: https://viblo.asia/p/benchmark-peformance-on-web-server-season-1-924lJp3zKPM)

# Các tool benchmark
1. Gobench
2. Apache JMeter
3. wrk
4. HTTPLoad
5. Curl-loader
6. httperf
7. Tsung
# Cài đặt và sử dụng tool
1. Gobench <br>

    Gobench là tool được viết bởi ngôn ngữ Go và là 1 tool để benchmark web performance. Gobench hỗ trợ lên đến 20,0000 CCU điều mà ApacheBench không làm được<br>
    
    Install gobench (https://golang.org/doc/installhttps://golang.org/doc/install)<br>
    Building gobench <br>
    
    ```
    GOPATH=/tmp/ go get github.com/valyala/fasthttp
    GOPATH=/tmp/ go get github.com/cmpxchg16/gobench
    cp /tmp/bin/gobench /usr/local/bin
    ```
    
    Sử dụng gobench
    ```
    $>gobench -k=true -u http://localhost:80 -c 500 -t 10
    Dispatching 500 clients
    Waiting for results...

    Requests:                           343669 hits
    Successful requests:                343669 hits
    Network failed:                          0 hits
    Bad requests failed (!2xx):              0 hits
    Successfull requests rate:           34366 hits/sec
    Read throughput:                  54700061 bytes/sec
    Write throughput:                  4128684 bytes/sec
    Test time:                              10 sec
    ```
    Ta tiến hành gửi 500 request trong 10s, tổng số request là 343669 request. Với các tool như siege hay apachebech việc này có thể dẫn tới crash
    
2. Apache JMeter <br>

    Jmeter là 1 trong những tool phổ biến nhất để benchmark performance. Jmeter là một Java application và có GUI. Do đó việc sử dụng Jmeter khá là dễ dàng . Bên cạnh đó Jmeter hỗ trợ nhiều hệ điều hành: Linunx, Window, MacOS<br>
    
    Install jmeter (http://jmeter.apache.org/download_jmeter.cgi) <br>
    
    Hoặc có thể cài đặt bằng command trên ubuntu:
    ```
    sudo apt-get update
    sudo apt-get install openjdk-7-jre-headless
    wget -c http://ftp.ps.pl/pub/apache//jmeter/binaries/apache-jmeter-3.0.tgz
    tar -xf apache-jmeter-3.0.tgz
    ```
    Sử dụng jmeter: <br>
    ```
    apache-jmeter-3.0/bin/./jmeter -n -t apache-jmeter-3.0/extras/Test.jmx
    ```

3. wrk <br>
    
    wrk là một tool phục vụ cho việc test tải, wrk là một client tool với dung lượng nhẹ. wrk sẽ sửu dụng multi-core CPU nên sẽ thích hợp cho việc test tải multithread <br>
    
    Instal wrk <br>
    
    ```
    sudo apt-get install build-essential libssl-dev git -y
    git clone https://github.com/wg/wrk.git wrk
    cd wrk
    sudo make
    sudo cp wrk /usr/local/bin
    ```
    
    Sử dụng wrl <br>
    
    ```
      wrk -t5 -c 5 -d10s -H "Authorization: Bearer 5345c6cbdee4462a708d51194ff5802d52b3772d28f15bb3215aac76051ec46d" "http://127.0.0.1:8080/v0.1/user/get/57ee7ff124f7cf6738b221c2" 
      
      Running 10s test @ http://127.0.0.1:8080/v0.1/user/get/57ee7ff124f7cf6738b221c2
      5 threads and 5 connections
      Thread Stats   Avg      Stdev     Max   +/- Stdev
      Latency     1.33ms    1.56ms  38.41ms   92.36%
      Req/Sec     0.94k   155.33     1.38k    69.20%
      47057 requests in 10.02s, 19.79MB read
      Requests/sec:   4697.10
      Transfer/sec:      1.98MB
    ```
    
4. HTTPLoad
    
    HTTPLoad có thể đọc nhiều URL từ một file, do đó HTTPLoad thích hợp test nhiều URL trên cùng hay nhiều website khác nhau. HTTPLoad cũng support SSL/TLS
    
    Cài đặt: <br>
    
    ```
    curl -O http://www.acme.com/software/http_load/http_load-12mar2006.tar.gz
    tar -xzvf ./http_load-12mar2006.tar.gz
    cd http_load-12mar2006
    make
    sudo make install
    cd ~
    rm -rf ~/http_load_src
    ```
    
    Sử dụng http_load <br>
    
    ```
    http_load -parallel 10 -seconds 5 ./omg_its_full_of_urls.txt
    #result:
    3587 fetches, 10 max parallel, 6.97698e+06 bytes, in 5.00052 seconds
    1945.07 mean bytes/connection
    717.325 fetches/sec, 1.39525e+06 bytes/sec
    msecs/connect: 0.674328 mean, 20.771 max, 0.045 min
    msecs/first-response: 12.4517 mean, 389.405 max, 1.978 min
    HTTP response codes:
      code 200 -- 3587
    ```
    
5. Curl-loader
    
    Curl-loader là một tool benchmark viết bằng ngôn ngữ C, curl-loader hỗ  trợ SSL/TLS. Bạn cũng có thể thực hiện test tải trên FPT server
    
    Cài đặt: <br>
    ```
    tar zxfv curl-loader-0.56.tar.gz #lastest version
    cd curl-loader-0.56
    sudo make
    sudo make install
    ```
    
    Sử dụng curl-loader 
    ```
    curl-loader -f my_ftps.conf -d -v -u
    less ftps.log
    ```
    
    Example conf file
    ```
    #GENERAL SECTION
    BATCH_NAME= ftps
    CLIENTS_NUM_MAX=30
    INTERFACE = eth0
    NETMASK=255.255.255.0
    IP_ADDR_MIN=192.168.0.15
    IP_ADDR_MAX=192.168.0.15 #Actually — this is for self-control
    CYCLES_NUM= -1
    URLS_NUM= 1
    
    # URL SECTION
    URL=ftps://ftpuser:secret@xx.xx.xx.xx/test.zip
    FRESH_CONNECT=1 # At least my proftpd has problems with connection re-use
    TIMER_URL_COMPLETION = 0 # In msec. When positive, Now it is enforced by cancelling url fetch on timeout
    TIMER_AFTER_URL_SLEEP =3000
    FTP_ACTIVE=1
    ```
7. httperf <br<
    
    httperf hỗ trợ giao thức HTTP/1.1 và SSL. httperf là một tool có tốc độ nhanh, hỗ trợ tốt cho các giao thức http
    
    Cài đặt: 
    ```
    sudo apt-get update -y
    sudo apt-get install -y httperf
    ```
    
    Sử dụng: <br>
    ```
    httperf --server wailua --port 6800 --num-conns 100 --rate 10 --timeout 1
    # Result
    Total: connections 100 requests 100 replies 100 test-duration 9.905 s

    Connection rate: 10.1 conn/s (99.1 ms/conn, <=1 concurrent connections)
    Connection time [ms]: min 4.6 avg 5.6 max 19.9 median 4.5 stddev 2.0
    Connection time [ms]: connect 1.4
    Connection length [replies/conn]: 1.000

    Request rate: 10.1 req/s (99.1 ms/req)
    Request size [B]: 57.0

    Reply rate [replies/s]: min 10.0 avg 10.0 max 10.0 stddev 0.0 (1 samples)
    Reply time [ms]: response 4.1 transfer 0.0
    Reply size [B]: header 219.0 content 204.0 footer 0.0 (total 423.0)
    Reply status: 1xx=0 2xx=100 3xx=0 4xx=0 5xx=0

    CPU time [s]: user 2.71 system 7.08 (user 27.4% system 71.5% total 98.8%)
    Net I/O: 4.7 KB/s (0.0*10^6 bps)

    Errors: total 0 client-timo 0 socket-timo 0 connrefused 0 connreset 0
    Errors: fd-unavail 0 addrunavail 0 ftab-full 0 other 0
    ```

8. Tsung <br>
    
    Tsung là một tool benchmark hộ trợ nhiều giao thức: HTTP, SOAP. Tsung cũng được dùng nhiều để test stress cho các hệ thống: PostgreSQL, LDAP, XAMP, MySQL
    
    Cài đặt: 
    
    ```
    sudo apt-get install erlang gnuplot libtemplate-perl
    wget http://tsung.erlang-projects.org/dist/tsung-1.6.0.tar.gz
    tar zxvf tsung-1.6.0.tar.gz
    cd tsung-1.6.0
    ./configure
    make
    make install
    tsung -v
    ```
    
    Sử dụng:
    
    ```
    tsung -f <tên tập tin XML>
    ```
    
    XML file template:
    ```
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE tsung SYSTEM "/usr/local/Cellar/tsung/1.7.0/share/tsung/tsung-1.0.dtd" [
    <!ENTITY login_post_session SYSTEM "tsung_recorder20180717.xml">
    ]>

    <tsung loglevel="debug">

      <clients>
        <client host="localhost" use_controller_vm="true" maxusers='10000'/>
      </clients>

      <servers>
        <server host="yourWebsite.de" port="443" type="ssl"/>
      </servers>

      <!-- test is finished after 2 minutes -->
      <load duration="2" unit="minute">
        <!-- during the first second of this test 1 new user per second is created,
        maximum of users is 1 -->
        <arrivalphase phase="1" duration="2" unit="minute">
          <users arrivalrate="1" unit="second" maxnumber="1"></users>
        </arrivalphase>
      </load>

      <options>
      <!-- adding csv file with user-email and user-password for login -->
      <option name="file_server" id="userlist" value=".tsung/example_userlist.csv"/>
      </options>

      <sessions>
        &login_post_session;
      </sessions>

    </tsung>
    ```
    
# Kết luận

Việc sử dụng tool benchmark nào phụ thuộc vào nhu cầu và bài toán thực tế. Trên đây mình đã chia sẽ một số tool(ưu điểm và một số case dùng). Việc sử dụng và apply vào thực tế có thể hoàn toàn khác.