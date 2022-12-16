### 1. Giớ thiệu

Không phải lúc nào các đường dẫn của một trang web cũng hiện ra để người dùng có thể truy cập, việc tìm kiếm các đường dẫn web cũng là một trong những phần quan trọng của việc pentest. Tìm kiếm các đường dẫn web bị ẩn đi sẽ tăng thêm thông tin cũng như các giá trị cho người kiểm thử. Có hàng loạt các công cụ giúp cho việc này trở nên dễ dàng hơn như Dirbuster, Dirb, Gobuster... nhưng mỗi cái đều có hạn chế riêng.

**DirBuster** được viết bằng Java và chỉ có giao diện GUI.

**Dirb** cũng là một công cụ scan khá phổ biến nhưng không hỗ trợ đa luồng, việc scan không hỗ trợ đa luồng gặp rất nhiều bất tiện.

**Gobuster** cũng là một công cụ rất mạnh được viết bằng Go, nhưng việc cài đặt khó khăn hơn trên win hay ubuntu so với **Dirsearch**.

**Dirsearch** là một công cụ mã nguồn mở được viết bằng Python hoạt động theo kiểu brute-forcing cấu trúc thư mục, file của web. Nó có thể chạy trên Windows, Linux, macOS. **Dirsearch** sử dụng các dòng lệnh đơn giản mà hiệu quả, nó hỗ trợ rất nhiều options như đa luồng, tìm kiếm theo list extensions, delay giữa các request, set cookie, user-agent, headers, proxy... Chính vì thế **dirsearch** trở thành công cụ phổ biến mà hầu hết các hacker hay pentester đều sử dụng.

### 2. Cài đặt

Đầu tiên chúng ta cần clone dirsearch từ [GitHub](https://github.com/maurosoria/dirsearch)

```bash
~$ git clone https://github.com/maurosoria/dirsearch.git
Cloning into 'dirsearch'...
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 1818 (delta 0), reused 3 (delta 0), pack-reused 1813
Receiving objects: 100% (1818/1818), 17.69 MiB | 2.38 MiB/s, done.
Resolving deltas: 100% (1059/1059), done.
```

### 3. Cấu hình

Có rất nhiều các chạy dirsearch như chạy bằng python, bash, Symbolic Link, cấu hình alias, bạn có thể chọn một trong số cách sau đây.

##### 1. Chạy bằng Python

Như ở trên mình đã nói dirsearch được viết bằng Python, nên chỉ cần chạy file dirsearch.py với Python3.

```bash
$ cd dirsearch/
~/dirsearch$ python3 dirsearch.py 
URL target is missing, try using -u <url>
```

##### 2. Chạy bằng Bash

```bash
$ cd dirsearch/
~/dirsearch$ ./dirsearch.py 
URL target is missing, try using -u <url>
```
##### 3. Sử dụng alias
Mở `.bashrc` và add `alias dirsearch='python3 ~/dirsearch/dirsearch.py'`
```bash
~$ nano ~/.bashrc
```
![](https://images.viblo.asia/2e9dabc4-84f3-4882-b698-e8426ed82f30.png)
```bash
~$ source ~/.bashrc
```
Xong các bạn chỉ cần chạy lệnh dirsearch trên terminal khi các bạn đứng ở bất cứ thư mục nào.
```bash
~$ dirsearch
URL target is missing, try using -u <url>
```
#### 4. Sử dụng Symbolic Link

Có thể tạo một liên kết tới thư mục **/bin**. Nó cũng giống như ở trên bạn cũng có thể chạy lệnh dirsearch trên terminal khi các bạn đứng ở bất cứ thư mục nào.

```
~$ sudo ln -s ~/dirsearch/dirsearch.py /bin/dirsearch
~$ dirsearch
URL target is missing, try using -u <url>
```
### 4. Sử dụng dirsearch

Để xem các chi tiết các options cũng như tác dụng của mỗi option thì chỉ cần thêm option **-h**:
```bash
~$ dirsearch -h
Usage: dirsearch [-u|--url] target [-e|--extensions] extensions [options]

Options:
  -h, --help            show this help message and exit

  Mandatory:
    -u URL, --url=URL   URL target
    -L URLLIST, --url-list=URLLIST
                        URL list target
    -e EXTENSIONS, --extensions=EXTENSIONS
                        Extension list separated by comma (Example: php,asp)
    -E, --extensions-list
                        Use predefined list of common extensions

  Dictionary Settings:
    -w WORDLIST, --wordlist=WORDLIST
                        Customize wordlist (separated by comma)
    -l, --lowercase     
    -f, --force-extensions
                        Force extensions for every wordlist entry (like in
                        DirBuster)

  General Settings:
    -s DELAY, --delay=DELAY
                        Delay between requests (float number)
    -r, --recursive     Bruteforce recursively
    -R RECURSIVE_LEVEL_MAX, --recursive-level-max=RECURSIVE_LEVEL_MAX
                        Max recursion level (subdirs) (Default: 1 [only
                        rootdir + 1 dir])
    --suppress-empty, --suppress-empty
    --scan-subdir=SCANSUBDIRS, --scan-subdirs=SCANSUBDIRS
                        Scan subdirectories of the given -u|--url (separated
                        by comma)
    --exclude-subdir=EXCLUDESUBDIRS, --exclude-subdirs=EXCLUDESUBDIRS
                        Exclude the following subdirectories during recursive
                        scan (separated by comma)
    -t THREADSCOUNT, --threads=THREADSCOUNT
                        Number of Threads                                                                                                                                                                                                  
    -x EXCLUDESTATUSCODES, --exclude-status=EXCLUDESTATUSCODES                                                                                                                                                                             
                        Exclude status code, separated by comma (example: 301,                                                                                                                                                             
                        500)                                                                                                                                                                                                               
    --exclude-texts=EXCLUDETEXTS                                                                                                                                                                                                           
                        Exclude responses by texts, separated by comma                                                                                                                                                                     
                        (example: "Not found", "Error")                                                                                                                                                                                    
    --exclude-regexps=EXCLUDEREGEXPS                                                                                                                                                                                                       
                        Exclude responses by regexps, separated by comma                                                                                                                                                                   
                        (example: "Not foun[a-z]{1}", "^Error$")                                                                                                                                                                           
    -c COOKIE, --cookie=COOKIE                                                                                                                                                                                                             
    --ua=USERAGENT, --user-agent=USERAGENT
    -F, --follow-redirects
    -H HEADERS, --header=HEADERS
                        Headers to add (example: --header "Referer:
                        example.com" --header "User-Agent: IE"
    --random-agents, --random-user-agents

  Connection Settings:
    --timeout=TIMEOUT   Connection timeout
    --ip=IP             Resolve name to IP address
    --proxy=HTTPPROXY, --http-proxy=HTTPPROXY
                        Http Proxy (example: localhost:8080
    --http-method=HTTPMETHOD
                        Method to use, default: GET, possible also: HEAD;POST
    --max-retries=MAXRETRIES
    -b, --request-by-hostname
                        By default dirsearch will request by IP for speed.
                        This forces requests by hostname

  Reports:
    --simple-report=SIMPLEOUTPUTFILE
                        Only found paths
    --plain-text-report=PLAINTEXTOUTPUTFILE
                        Found paths with status codes
    --json-report=JSONOUTPUTFILE
```

Có thể thấy options của dirsearch rất đa dạng phong phú, nhưng chúng ta nên chú trọng vào những options quan trọng như **-u, -e, -r, -t, -w, -x**.

Ví dụ có target là trang `http://testphp.vulnweb.com/`

Để scan được chúng ta bắt buộc phải truyền vào 2 đối số à **-u, -e**, trong đó **-u** là url mà ta muốn scan, **-e** là extensions mà chúng ta muốn tìm kiếm, cũng có thể tìm kiếm nhiều extensions một lúc, mỗi extension cách nhau một dấu phẩy.

Example:

```bash
~$ dirsearch -u http://testphp.vulnweb.com/ -e php,html,txt

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, html, txt | HTTP method: get | Threads: 10 | Wordlist size: 6748

Error Log: /home/justx/dirsearch/logs/errors-20-05-24_13-50-24.log

Target: http://testphp.vulnweb.com/

[13:50:24] Starting: 
[13:50:31] 400 -  172B  - /%2e%2e/google.com
[13:50:39] 301 -  184B  - /.idea  ->  http://testphp.vulnweb.com/.idea/
[13:50:39] 200 -  967B  - /.idea/
[13:50:39] 200 -    6B  - /.idea/.name
[13:50:39] 200 -  266B  - /.idea/misc.xml                      
[13:50:39] 200 -  171B  - /.idea/encodings.xml
[13:50:39] 200 -  275B  - /.idea/modules.xml
[13:50:39] 200 -  143B  - /.idea/scopes/scope_settings.xml
[13:50:39] 200 -  173B  - /.idea/vcs.xml          
[13:50:41] 200 -   12KB - /.idea/workspace.xml      
[13:50:57] 200 -   92B  - /_mmServerScripts/MMHTTPDB.php                         
[13:51:06] 301 -  184B  - /admin  ->  http://testphp.vulnweb.com/admin/
[13:51:10] 200 -  278B  - /admin/                 
[13:51:10] 200 -  278B  - /admin/?/login
[13:52:04] 403 -  263B  - /cgi-bin                                                                                
[13:52:04] 403 -  263B  - /cgi-bin/ 
[13:52:13] 301 -  184B  - /Connections  ->  http://testphp.vulnweb.com/Connections/
[13:52:16] 200 -  224B  - /crossdomain.xml                
[13:52:18] 200 -    1B  - /CVS/Root        
[13:52:18] 301 -  184B  - /CVS  ->  http://testphp.vulnweb.com/CVS/
[13:52:18] 200 -  611B  - /CVS/       
[13:52:33] 200 -  894B  - /favicon.ico                                   
[13:52:48] 301 -  184B  - /images  ->  http://testphp.vulnweb.com/images/                             
[13:52:51] 200 -    5KB - /index.php                                                                           
[13:52:51] 200 -    3KB - /index.bak   
[13:52:53] 200 -    3KB - /index.zip       
[13:53:06] 200 -    5KB - /login.php                                                                    
[13:53:35] 301 -  184B  - /pictures  ->  http://testphp.vulnweb.com/pictures/           
[13:53:46] 301 -  184B  - /secured  ->  http://testphp.vulnweb.com/secured/                             
[13:54:03] 301 -  184B  - /Templates  ->  http://testphp.vulnweb.com/Templates/                                   
[13:54:11] 302 -   14B  - /userinfo.php  ->  login.php                      
                                                                                        
Task Completed
```
Như các bạn thấy phần phía trên là những tham số mà chương trình đã set để chạy, phía dưới là kết quả của việc thực hiện quét, nó được chia ra thành từng cột nhìn rất rõ ràng. Cột đầu tiên là thời gian, cột thứ 2 là status code của response, cột thứ 3 là size, và cột cuối cùng là thư mục hay file thực hiện quét.

Vậy làm sao để tạm dừng khi nó đang chạy, chỉ cần ấn **<Ctrl>+C** chương trình sẽ tạm dừng và có 2 lựa chọn là **e** và **c**, trong đó **e** là exit để thoát hẳn chương trình và **c** continue để tiếp tục quét ngay tại chỗ bạn đã tạm dừng.
   
Nâng cao hơn là các bạn có thể loại bỏ những `status code` mà không mong muốn tránh cho việc quá nhiều thông tin thừa gây rối loạn. Ví dụ cần loại bỏ những thư mục hay file nào có `status code` không  mong muốn chỉ cần thêm option **-x <status code cần loại bỏ>**, cũng có thể loại bỏ nhiều `status code` cùng một lúc, mỗi `status code` cách nhau bởi dấu phẩy. Ví dụ cần loại bỏ những thư mục hay file có `status code` là 400 và 403 thì ta cần thêm options **-x 403,400**.
    
Example:
```bash
~$ dirsearch -u http://testphp.vulnweb.com/ -e php,html,txt -x 403,400

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, html, txt | HTTP method: get | Threads: 10 | Wordlist size: 6748

Error Log: /home/justx/dirsearch/logs/errors-20-05-24_14-14-04.log

Target: http://testphp.vulnweb.com/

[14:14:05] Starting: 
[14:14:14] 301 -  184B  - /.idea  ->  http://testphp.vulnweb.com/.idea/
[14:14:14] 200 -  967B  - /.idea/
[14:14:14] 200 -    6B  - /.idea/.name                         
[14:14:15] 200 -  171B  - /.idea/encodings.xml       
[14:14:15] 200 -  143B  - /.idea/scopes/scope_settings.xml
[14:14:15] 200 -  266B  - /.idea/misc.xml
[14:14:15] 200 -  275B  - /.idea/modules.xml
[14:14:15] 200 -  173B  - /.idea/vcs.xml          
[14:14:16] 200 -   12KB - /.idea/workspace.xml      
[14:14:31] 200 -   92B  - /_mmServerScripts/MMHTTPDB.php                         
[14:14:39] 301 -  184B  - /admin  ->  http://testphp.vulnweb.com/admin/
[14:14:43] 200 -  278B  - /admin/                 
[14:14:43] 200 -  278B  - /admin/?/login  
[14:15:47] 301 -  184B  - /Connections  ->  http://testphp.vulnweb.com/Connections/                               
[14:15:50] 200 -  224B  - /crossdomain.xml                
[14:15:51] 200 -  611B  - /CVS/            
[14:15:51] 301 -  184B  - /CVS  ->  http://testphp.vulnweb.com/CVS/
[14:15:51] 200 -    1B  - /CVS/Root
[14:16:05] 200 -  894B  - /favicon.ico                                   
[14:16:17] 301 -  184B  - /images  ->  http://testphp.vulnweb.com/images/                             
[14:16:19] 200 -    5KB - /index.php                                                                           
[14:16:20] 200 -    3KB - /index.bak   
[14:16:21] 200 -    3KB - /index.zip       
[14:16:31] 200 -    5KB - /login.php                                                                    
[14:17:03] 301 -  184B  - /pictures  ->  http://testphp.vulnweb.com/pictures/           
[14:17:16] 301 -  184B  - /secured  ->  http://testphp.vulnweb.com/secured/                             
[14:17:35] 301 -  184B  - /Templates  ->  http://testphp.vulnweb.com/Templates/                                   
[14:17:43] 302 -   14B  - /userinfo.php  ->  login.php                      
                                                                                        
Task Completed
```
So với kết quả ở trên, trông nó đã gọn hơn rất nhiều phải không, việc loại bỏ status code tùy thuộc vào mỗi trường hợp khác nhau, tùy vào nhu cầu của người cần quét để việc loại bỏ trở nên hiệu quả hơn.

Scan theo kiểu brute-forcing này phụ thuộc rất nhiều vào thư việc các từ mà chúng ta cần thử nó gọi là wordlist, vậy nên chúng ta không muốn dùng wordlist mặc định của dirsearch mà chúng ta dùng thư viện riêng khác để việc scan trở nên hiệu quả hơn, dirsearch hỗ trợ một option để làm điều này cực kỳ hữu ích đó là **-w**. Bạn có thể tham khảo qua [wordlist](https://gitlab.com/kalilinux/packages/wordlists) của kali. Một số lưu ý bạn cần đảm bảo rằng đường dẫn đến wordlist của bạn phải đúng, nên sử dụng đường dẫn tuyệt đối là một cách tốt vời nhất để tránh không tìm thấy wordlist gây ra lỗi không thể load wordlist. 
Ví dụ như **-w /home/justx/common.txt**.

Example:

```bash
~$ dirsearch -u http://testphp.vulnweb.com/ -e php,html,txt -x 403,400 -w /home/justx/common.txt 

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, html, txt | HTTP method: get | Threads: 10 | Wordlist size: 100

Error Log: /home/justx/dirsearch/logs/errors-20-05-24_14-42-29.log

Target: http://testphp.vulnweb.com/

[14:42:30] Starting: 
[14:42:32] 301 -  184B  - /CVS  ->  http://testphp.vulnweb.com/CVS/
[14:42:33] 301 -  184B  - /admin  ->  http://testphp.vulnweb.com/admin/
                                         
Task Completed
```

Nhìn kết quả có vẻ rất ít, thu thập được ít thông tin hơn và các bạn cho rằng tool này không ngon, nhưng không như mình đã nói kiểu scan này phụ thuộc rất nhiều vào thư viện mà ta sử dụng, vậy nên chọn wordlist sao cho hợp lý cũng sẽ giúp cho việc thu thập thông tin trở nên hiệu quả hơn.

Để quét sâu hơn vào trong các thư mục thì dirsearch hỗ trợ một option **-r**, ví dụ các bạn quét được `http://testphp.vulnweb.com/admin/` nhưng các bạn muốn chương trình quét tiếp trong thư mục đấy có gì thì các bạn có thể sử dụng option này thay vì phải quét thủ công bằng cách thay đổi url.

Example:
```bash
~$ dirsearch -u http://testphp.vulnweb.com/ -e php,html,txt -x 403,400 -w /usr/share/wordlists/dirb/common.txt -r

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, html, txt | HTTP method: get | Threads: 10 | Wordlist size: 4614 | Recursion level: 1

Error Log: /home/justx/dirsearch/logs/errors-20-05-24_15-35-04.log

Target: http://testphp.vulnweb.com/

[15:35:05] Starting: 
[15:35:06] 200 -    5KB - /
[15:35:16] 301 -  184B  - /admin  ->  http://testphp.vulnweb.com/admin/
[15:35:44] 301 -  184B  - /CVS  ->  http://testphp.vulnweb.com/CVS/
[15:35:44] 200 -    1B  - /CVS/Entries
[15:35:44] 200 -    8B  - /CVS/Repository
[15:35:44] 200 -    1B  - /CVS/Root
[15:35:44] 200 -  224B  - /crossdomain.xml
[15:36:00] 200 -  894B  - /favicon.ico               
[15:36:13] 301 -  184B  - /images  ->  http://testphp.vulnweb.com/images/
[15:36:15] 200 -    5KB - /index.php   
[15:36:44] 301 -  184B  - /pictures  ->  http://testphp.vulnweb.com/pictures/
[15:37:01] 301 -  184B  - /secured  ->  http://testphp.vulnweb.com/secured/
[15:37:31] Starting: admin/                     
[15:37:33] 200 -  278B  - /admin/
[15:40:09] Starting: CVS/                             
[15:40:11] 200 -  611B  - /CVS/        
[15:40:53] 200 -    1B  - /CVS/Entries                
[15:41:52] 200 -    1B  - /CVS/Root          
[15:42:28] Starting: images/                    
[15:42:29] 200 -  393B  - /images/  
[15:44:49] Starting: pictures/                        
[15:44:59] 200 -    3KB - /pictures/   
[15:47:18] 200 -  771B  - /pictures/WS_FTP.LOG        
[15:47:23] Starting: secured/               
[15:48:07] 200 -    0B  - /secured/
[15:49:05] 200 -    0B  - /secured/index.php          
[15:49:33] 200 -   45KB - /secured/phpinfo.php
                                                
Task Completed
```
Sau khi tìm thấy các file hay thư mục ở cấp độ một chúng tiếp tục quét vào từng thư mục mà nó đã tìm thấy, như vậy việc quét thu được kết quả sâu hơn các mức quét bình thường

Và option tiếp theo mình muốn giới thiệu là **-t**, một trong nhưng sức mạnh của dirsearch, option này giúp cho chương trình chạy đa luồng làm tăng tốc độ quét, một chương trình kiểu brute-forcing với việc chạy đa luồng sẽ giúp giảm đi thời gian chạy rất nhiều lần, với những wordlist có size lớn bạn sẽ thấy rõ hiệu quả của việc chạy đa luồng là như thế nào.

Example:
```bash
~$ dirsearch -u http://testphp.vulnweb.com/ -e php,html,txt -x 403,400 -w /usr/share/wordlists/dirb/common.txt -r -t 100

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, html, txt | HTTP method: get | Threads: 100 | Wordlist size: 4614 | Recursion level: 1

Error Log: /home/justx/dirsearch/logs/errors-20-05-24_15-35-06.log

Target: http://testphp.vulnweb.com/

[15:35:07] Starting: 
[15:35:09] 200 -    5KB - /
[15:35:11] 301 -  184B  - /admin  ->  http://testphp.vulnweb.com/admin/
[15:35:13] 200 -  224B  - /crossdomain.xml   
[15:35:14] 301 -  184B  - /CVS  ->  http://testphp.vulnweb.com/CVS/
[15:35:14] 200 -    1B  - /CVS/Entries   
[15:35:14] 200 -    1B  - /CVS/Root        
[15:35:14] 200 -    8B  - /CVS/Repository
[15:35:15] 200 -  894B  - /favicon.ico               
[15:35:17] 301 -  184B  - /images  ->  http://testphp.vulnweb.com/images/
[15:35:17] 200 -    5KB - /index.php 
[15:35:20] 301 -  184B  - /pictures  ->  http://testphp.vulnweb.com/pictures/
[15:35:23] 301 -  184B  - /secured  ->  http://testphp.vulnweb.com/secured/
[15:35:51] Starting: admin/                     
[15:35:53] 200 -  278B  - /admin/
[15:36:35] Starting: CVS/                             
[15:36:40] 200 -  611B  - /CVS/                       
[15:36:45] 200 -    1B  - /CVS/Entries               
[15:36:52] 200 -    1B  - /CVS/Root               
[15:37:05] Starting: images/                    
[15:37:07] 200 -  393B  - /images/     
[15:37:52] Starting: pictures/                        
[15:37:54] 200 -    3KB - /pictures/   
[15:38:11] 200 -  771B  - /pictures/WS_FTP.LOG        
[15:38:28] Starting: secured/                 
[15:38:30] 200 -    0B  - /secured/ 
[15:38:39] 200 -    0B  - /secured/index.php          
[15:38:45] 200 -   45KB - /secured/phpinfo.php
                                                
Task Completed
```

Nhìn kết quả và so với kết quả của phần trước cùng thời điểm quét mọi options quét đều giống nhau chỉ khác ở phần sau có thêm thread thì hiệu quả về mặt thời gian tăng đáng kể, điều đó thể hiện là cùng quét tại thời điểm **15:35** thì chỉ với `10 threads` thì kết thúc vào lúc **15:49**, nghĩa là mất khoảng `14 phút` nhưng với `100 threads` thì chỉ mất đến `3 phút` để quét hết wordlist cùng size, thật tuyệt vời khi có thread phải không.

Ngoài ra còn một số options như xuất report, set cookie, set headers, timeout... cũng là những options rất hữu ích các bạn có thể tham khảo thêm. Hy vọng tool này sẽ giúp ích cho các bạn trong việc tìm các thư mục hay file bị ẩn của một trang web.

### 5. Tài liệu
https://medium.com/@irfaanshakeel/dirsearch-to-find-hidden-web-directories-d0357fbe47b0

https://github.com/maurosoria/dirsearch

https://gitlab.com/kalilinux/packages/wordlists