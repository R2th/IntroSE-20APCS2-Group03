Ờ bài viết trước thì mình đã chia sẻ cho mọi người làm sao để custom directory trong terminal khi sử dụng với git để tracking status, thì ở bài viết này, mình sẽ giới thiệu đến các bạn một lệnh được dùng phổ biến trong Linux là lệnh `grep`. `Grep` được hiểu đơn giản là dùng command dùng để search trong folder của máy, nhưng nó không đơn giản là chỉ search text bình thường mà nó còn có thể search ra với những biểu thức phức tạp. Vì vậy mà nó cũng có nhiều cách viết để có thể dễ dàng sử dụng hơn. Trong bài viết này, mình sẽ chia sẻ với các bạn một số ứng dụng và cách dùng của `grep` mà mình sưu tầm được. 

![](https://images.viblo.asia/dac46d15-5974-4abb-8cab-696691657cda.jpg)

### 1. ps aux | grep < pattern>
`ps aux` là câu lệnh show danh sách những tiến trình đang chạy, và danh sách này thì quá dài để chúng ta kiểm tra và theo dõi chúng, vì vậy mà grep là một giải pháp trong trường hợp này.
Ở đây mình lấy ra những tiến trình có liên quan đến "bash" thì như sau:
```shell
[tranhaiquan@HaiQuanComputer ~$ ps aux | grep bash
tranhai+  6980  0.0  0.1  28600 10176 pts/7    Ss   20:53   0:00 -bash
tranhai+ 10977  0.0  0.0  24372  5740 pts/7    S    21:30   0:00 bash
tranhai+ 17687  0.0  0.0  15752   980 pts/7    S+   22:32   0:00 grep --color=auto bash
[tranhaiquan@HaiQuanComputer ~$ 

```
lệnh grep ở đây chỉ là grep để tìm text bình thường thôi và đơn giản nhất nhưng hay dùng nhất
### 2. Grepping your IP addresses
Trong hầu hết các hệ điều hành, thì bạn có thể liệt kê tất cả các thông tin về IP, MAC về Subnet trên hệ thống của bạn bằng cách sử dụng lệnh `ifconfig` or `ip address`. Nhưng nếu bạn chỉ muốn show ra địa chỉ IP thì bạn chỉ cần chạy lẹnh dưới đây:
```shell
[tranhaiquan@HaiQuanComputer ~$ ip addr | grep inet | awk '{ print $2; }'
[tranhaiquan@HaiQuanComputer ~$ ip addr | grep -w inet | awk '{ print $2; }'
```
Ở dòng đầu thì thì grep inet thì nó sẽ giống với ex1 thì nó sẽ show ra list những dòng chứa inet, còn sử dụng `-w` thì sẽ tìm chính xác chỉ có có `inet`
Còn `awk` là chương trình đọc từng dòng một, vậy nên ở đây mình in ra dòng số 2
### 3. Looking at failed SSH attempts
Nếu bạn có internet server cùng với public IP thì nó sẽ bắn những lỗi liên tục khi SSH, và nếu bạn cho phép nguời dùng có quyền truy cập SSH dựa trên mật khẩu, thì bạn có thể thấy tất cả các lần thử thất bại như vậy bằng grep

```shell
[tranhaiquan@HaiQuanComputer ~$ cat /var/log/auth.log | grep “Fail”
Sample out put
Dec 5 16:20:03 debian sshd[509]:Failed password for root from 192.168.0.100 port 52374 ssh2
Dec 5 16:20:07 debian sshd[509]:Failed password for root from 192.168.0.100 port 52374 ssh2
Dec 5 16:20:11 debian sshd[509]:Failed password for root from 192.168.0.100 port 52374 ssh2
 ```
 
 ### 4. Piping Grep to Uniq
 Đôi khi, `grep` sẽ show ra rất nhiều thông tin. Trong ví dụ trên, một IP duy nhất có thể đã cố thử truy cập vào hệ thống của bạn. Trong hầu hết các trường hợp, chỉ có một số ít các IP vi phạm mà bạn cần xác định duy nhất.
 ```shell
 [tranhaiquan@HaiQuanComputer ~$ cat /var/log/auth.log | grep “Fail” | uniq -f 3
 ```
 Lệnh `uniq`  chỉ in các dòng duy nhất. `Uniq -f 3` sẽ bỏ qua 3 trường đầu tiên và sau đó bắt đầu tìm kiếm các dòng duy nhất.
 ### 5. grepping for Error Messages
 `Grep` không chỉ sử dụng để trace log khi SSH và cũng cũng có thể trace ra như thế ở bất kỳ log nào. Ở đây, mình sẽ thử trace log của nginx nhé:
```shell
[tranhaiquan@HaiQuanComputer ~$ grep -w '404' /var/log/nginx/access.log.1
127.0.0.1 - - [19/May/2019:23:23:40 +0700] "GET /assets/user/main.js.map HTTP/1.1" 404 16886 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
127.0.0.1 - - [19/May/2019:23:23:41 +0700] "GET /images/background/parallax.jpg HTTP/1.1" 404 16795 "http://reverse-boat.local/profile" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
127.0.0.1 - - [20/May/2019:00:00:52 +0700] "GET /images/cart-preview/3.jpg HTTP/1.1" 404 16799 "http://reverse-boat.local/profile" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
127.0.0.1 - - [20/May/2019:00:00:52 +0700] "GET /images/cart-preview/1.jpg HTTP/1.1" 404 16797 "http://reverse-boat.local/profile" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
127.0.0.1 - - [20/May/2019:00:00:52 +0700] "GET /images/cart-preview/2.jpg HTTP/1.1" 404 16796 "http://reverse-boat.local/profile" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
127.0.0.1 - - [20/May/2019:00:00:52 +0700] "GET /assets/user/style.css.map HTTP/1.1" 404 16890 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
127.0.0.1 - - [20/May/2019:00:00:53 +0700] "GET /assets/user/main.js.map HTTP/1.1" 404 16886 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
127.0.0.1 - - [20/May/2019:00:00:53 +0700] "GET /images/background/parallax.jpg HTTP/1.1" 404 16794 "http://reverse-boat.local/profile" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
```
Đây chỉ là một đoan log thôi nhé.
Lần này `grep` trên 1 file chứ k phải trên toàn hệ thống.
### 6. Package Listing
`dkpg -l` thì có lẽ là ai cũng biết để list package đã install trên hệ thống. và bạn cũng có thể grep một package trong danh sách này.
```shell
[tranhaiquan@HaiQuanComputer ~$ dpkg -l | grep -w yum
ii  python-sqlitecachec                         1.1.4-1                                      amd64        Fast metadata parser for yum
ii  yum                                         3.4.3-3                                      all          Advanced front-end for rpm
  ```
  
  ### 7. grep -v < pattern> fileNames
  Với option `-v` này thì sẽ loại bỏ những pattern đó ra khỏi danh sách trong fileNames
  Về cơ bản thì nó ngược với grep thường
  như `if` vs `unless` vậy
  ```shell
  [tranhaiquan@HaiQuanComputer ~$ dpkg -l | grep zsh
ii  zsh                                         5.1.1-1ubuntu2.3                             amd64        shell with lots of features
ii  zsh-common                                  5.1.1-1ubuntu2.3                             all          architecture independent files for Zsh
[tranhaiquan@HaiQuanComputer ~$ dpkg -l | grep -v zsh
...
ii  zenity-common                               3.18.1.1-1ubuntu2                            all          Display graphical dialog boxes from shell scripts (common files)
ii  zip                                         3.0-11                                       amd64        Archiver for .zip files
ii  zlib1g:amd64                                1:1.2.8.dfsg-2ubuntu4.1                      amd64        compression library - runtime
ii  zlib1g-dev:amd64                            1:1.2.8.dfsg-2ubuntu4.1                      amd64        compression library - development
[tranhaiquan@HaiQuanComputer ~$
  ```
  ### 8. grep -l < pattern>
  Option `-l` này sẽ liệt kê tất cả các file chứa ít nhất một lần xuất hiện của pattern được cung cấp. Điều này hữu ích khi bạn đang tìm kiếm một pattern trong một thư mục có nhiều file. Nó chỉ show tên file chứ không in dòng cụ thể match với pattern

  ### 9. Grep for your containers
  Nếu bạn có một cluster rất lớn đang chạy trên host, thì bạn có thể grep chúng bằng tên của image, status, port mà chúng đang show ra. Ví dụ:
  ```shell
  [tranhaiquan@HaiQuanComputer ~$ docker ps | grep [image_name]
   ```
   ### 10. grep for big data
   Thông thường, thì phần tích dữ liệu lớn thì sẽ liên quan đến việc tìm kiếm, sắp xếp, và đếm trên một tập nhất đinh. Và các câu lệnh cấp thấp của UNIX như `grep`, `uniq` sử dụng raasty hợp lý trong TH này. Việc grep này chỉ thực hiện mất có mấy giây, trong khi Hadoop thì mất gần nửa giờ.
  ```shell
  [tranhaiquan@HaiQuanComputer ~$ grep "Result" millionbase-2.22.pgn | sort | uniq -c
   ```
   ### 11. grep –color=auto < PATTERN>
   Option này cho phép grep highlight pattern bên trong dòng mà nó tìm thấy
   ### 12. grep -i < PATTERN>
Mặc định grep đã search phân biệt chữ hoa chữ thường rồi, option `-i` là để ignore cái tính năng này của grep đi. ;)
### 13. grep -n
Option `-n` sẽ hiển thị số dòng để bạn không phải tìm lại trong danh sách tổng or trong file
```shell
[tranhaiquan@HaiQuanComputer ~$ dpkg -l | grep zsh -n
2060:ii  zsh                                         5.1.1-1ubuntu2.3                             amd64        shell with lots of features
2061:ii  zsh-common                                  5.1.1-1ubuntu2.3                             all          architecture independent files for Zsh
[tranhaiquan@HaiQuanComputer ~$ 
```
### 14. Git grep
Bản thân git là một hệ thống kiểm soát phiên bản rồi, và bản thân nó cũng có lệnh grep, nhưng cái hay ở đây là grep có thể grep ở nhánh khác mặc dù nhánh đang đứng k có và nhánh khác đó chưa được merge, :D
```shell
[tranhaiquan@HaiQuanComputer abc(edit-password)$ git grep facebook
login-with-facebook:Gemfile:gem "omniauth-facebook"
login-with-facebook:Gemfile.lock:    omniauth-facebook (5.0.0)
login-with-facebook:Gemfile.lock:  omniauth-facebook
```
### 15. grep -a < PATTERN> [fileName]
 Options `-a` báo cho grep xử lý file được cung cấp như thể đó là văn bản thông thường. File có thể là nhị phân, nhưng grep sẽ xử lý nội dung bên trong như nội dung là văn bản.
 
 ### SUMMARY
 Như vậy trong bài viết này mình cũng đã giới thiệu đến các bạn một số trường hợp sử dụng, cũng như là cách dùng của grep sao cho hiệu quả. Hi vọng là sẽ giúp ích đưọc gì cho các bạn trong quá trình làm việc.
 
 Nguồn tham khảo: https://linuxhint.com/30_grep_examples/