### Giới thiệu
FFUF(Fuzz Faster U Fool) là một tool opensource được viết bằng Go, ffuf ngày càng phát triển vì tốc độ đáng kể của nó, nếu chạy 100 thread chúng ta có thể thực hiện scan subdomains với 1 wordlist khoảng 110 nghìn từ chỉ mất 3 phút 50 giây, trung bình là 2000 requests mỗi giây. Đối với pentest web chúng ta có thể sử dụng nó cho việc fuzz directory, files, các get parameters, hay post data, dns, ...
### Cài đặt
 
 - Cài đặt môi trường
     
     Vì ffuf được viết bằng golang nên việc đầu tiên chúng ta cần làm là cài đặt golang:
     ```bash
     sudo apt-get install golang
     ```
- Cài đặt ffuf
    
    Nếu như bạn đã cài đặt go compiler thì chỉ cần gõ lệnh:
    ```bash
    go get github.com/ffuf/ffuf
    ```
-  Hoặc:
    ```bash
    git clone https://github.com/ffuf/ffuf ; cd ffuf ; go build
    ```
- Để kiểm tra việc cài đặt của các bạn đã thành công hay chưa chúng ta có thể kiểm tra bằng cách xem version:
    ```bash
    ~ ffuf -V
    ffuf version: 1.2.0-git
    ```

### Sử dụng ffuf

Giống như những tools khác việc đầu tiên bắt đầu sử dụng chúng ta nên tìm hiểu những options mà tool đó hỗ trợ, thông thường các tools sẽ cũng cấp một option `-h` hoặc `--help` để xem những options của tool đó và ffuf cũng như vậy:
```bash
~ ffuf -h                                                                                                                                                                                                                            
Fuzz Faster U Fool - v1.2.0-git                                                                                                                                                                                                         
                                                                                                                                                                                                                                        
HTTP OPTIONS:                                                                                                                                                                                                                           
  -H               Header `"Name: Value"`, separated by colon. Multiple -H flags are accepted.                                                                                                                                          
  -X               HTTP method to use (default: GET)                                                                                                                                                                                    
  -b               Cookie data `"NAME1=VALUE1; NAME2=VALUE2"` for copy as curl functionality.                                                                                                                                           
  -d               POST data                                                                                                                                                                                                            
  -ignore-body     Do not fetch the response content. (default: false)                                                                                                                                                                  
  -r               Follow redirects (default: false)                                                                                                                                                                                    
  -recursion       Scan recursively. Only FUZZ keyword is supported, and URL (-u) has to end in it. (default: false)                                                                                                                    
  -recursion-depth Maximum recursion depth. (default: 0)                                                                                                                                                                                
  -replay-proxy    Replay matched requests using this proxy.                                                                                                                                                                            
  -timeout         HTTP request timeout in seconds. (default: 10)                                                                                                                                                                       
  -u               Target URL                                                                                                                                                                                                           
  -x               HTTP Proxy URL                                                                                                                                                                                                       
                                                                                                                                                                                                                                        
GENERAL OPTIONS:                                                                                                                                                                                                                        
  -V               Show version information. (default: false)                                                                                                                                                                           
  -ac              Automatically calibrate filtering options (default: false)                                                                                                                                                           
  -acc             Custom auto-calibration string. Can be used multiple times. Implies -ac                                                                                                                                              
  -c               Colorize output. (default: false)                                                                                                                                                                                    
  -maxtime         Maximum running time in seconds for entire process. (default: 0)                                                                                                                                                     
  -maxtime-job     Maximum running time in seconds per job. (default: 0)                                                                                                                                                                
  -p               Seconds of `delay` between requests, or a range of random delay. For example "0.1" or "0.1-2.0"                                                                                                                      
  -rate            Rate of requests per second (default: 0)                                                                                                                                                                             
  -s               Do not print additional information (silent mode) (default: false)                                                                                                                                                   
  -sa              Stop on all error cases. Implies -sf and -se. (default: false)                                                                                                                                                       
  -se              Stop on spurious errors (default: false)                                                         
  -sf              Stop when > 95% of responses return 403 Forbidden (default: false)                                                                                                                                                   
  -t               Number of concurrent threads. (default: 40)                                                                                                                                                                          
  -v               Verbose output, printing full URL and redirect location (if any) with the results. (default: false)

MATCHER OPTIONS:
  -mc              Match HTTP status codes, or "all" for everything. (default: 200,204,301,302,307,401,403)                                                                                                                             
  -ml              Match amount of lines in response                                                                
  -mr              Match regexp
  -ms              Match HTTP response size                                                                         
  -mw              Match amount of words in response                                                                

FILTER OPTIONS:
  -fc              Filter HTTP status codes from response. Comma separated list of codes and ranges                                                                                                                                     
  -fl              Filter by amount of lines in response. Comma separated list of line counts and ranges                                                                                                                                
  -fr              Filter regexp
  -fs              Filter HTTP response size. Comma separated list of sizes and ranges                                                                                                                                                  
  -fw              Filter by amount of words in response. Comma separated list of word counts and ranges
  
INPUT OPTIONS:
  -D               DirSearch wordlist compatibility mode. Used in conjunction with -e flag. (default: false)
  -e               Comma separated list of extensions. Extends FUZZ keyword.
  -ic              Ignore wordlist comments (default: false)
  -input-cmd       Command producing the input. --input-num is required when using this input method. Overrides -w.
  -input-num       Number of inputs to test. Used in conjunction with --input-cmd. (default: 100)
  -mode            Multi-wordlist operation mode. Available modes: clusterbomb, pitchfork (default: clusterbomb)
  -request         File containing the raw http request
  -request-proto   Protocol to use along with raw request (default: https)
  -w               Wordlist file path and (optional) keyword separated by colon. eg. '/path/to/wordlist:KEYWORD'

OUTPUT OPTIONS:
  -debug-log       Write all of the internal logging to the specified file.
  -o               Write output to file
  -od              Directory path to store matched results to.
  -of              Output file format. Available formats: json, ejson, html, md, csv, ecsv (or, 'all' for all formats) (default: json)

EXAMPLE USAGE:
  Fuzz file paths from wordlist.txt, match all responses but filter out those with content-size 42.
  Colored, verbose output.
    ffuf -w wordlist.txt -u https://example.org/FUZZ -mc all -fs 42 -c -v

  Fuzz Host-header, match HTTP 200 responses.
    ffuf -w hosts.txt -u https://example.org/ -H "Host: FUZZ" -mc 200

  Fuzz POST JSON data. Match all responses not containing text "error".
    ffuf -w entries.txt -u https://example.org/ -X POST -H "Content-Type: application/json" \
      -d '{"name": "FUZZ", "anotherkey": "anothervalue"}' -fr "error"

  Fuzz multiple locations. Match only responses reflecting the value of "VAL" keyword. Colored.
    ffuf -w params.txt:PARAM -w values.txt:VAL -u https://example.org/?PARAM=VAL -mr "VAL" -c

  More information and examples: https://github.com/ffuf/ffuf

```


ffuf hỗ trợ hoàng loạt các options về từng phần khác nhau như: **HTTP OPTIONS, GENERAL OPTIONS, GENERAL OPTIONS, FILTER OPTIONS, INPUT OPTIONS, OUTPUT OPTIONS**.

 Phía dưới phần help ffuf cũng có một vài ví dụ về cách sử dụng để tìm hiểu thêm chúng ta cùng tìm hiểu thêm về ffuf nhé.
 
 #### Tìm kiếm Files và Directory web
 
Với việc phát triển web như hiện nay các web thường được phân quyền các user nhưng nhiều khi các lập trình viên vô tình không authen hay author dẫn đến việc truy cập không thể kiểm soát. Chính vì vậy fuzz web chính là để tìm kiếm các thư mục bị ẩn đi hay không các file dữ liệu nhạy cảm có bị tiết lộ ra ngoài hay không.

Đơn giản nhất với phần này chúng ta chỉ cần sử dụng 2 options để tìm kiếm các thư mục là **-w** và **-u**:

Example:
```bash
ffuf -u http://testphp.vulnweb.com/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-1.0.txt
```
Trong các options sử dụng ở trên thì với `-w` được sử dụng để chỉ dẫn đến wordlist, `-u` để chỉ URL mà chúng ta muốn fuzz, với **FUZZ** là vị trí cần tìm

![](https://images.viblo.asia/45b4f6c0-dfa0-4a08-b2de-f72d41b6d27f.png)



Để mở rộng thêm phần tìm kiếm các file với các extensions khác nhau thì ta có thể sử dụng thêm option **-e**
```bash
ffuf -u http://testphp.vulnweb.com/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-1.0.txt -e .html,.php,.txt
```
![](https://images.viblo.asia/b51c9f23-d4f0-4ec3-af09-6df0737df7a9.png)


Với những options đơn giản như trên thì việc theo dõi kết quả gặp những khó khăn nhất định. Để giải quyết việc này thì ffuf hỗ trợ một số options để match những kết quả phù hợp như:

- **-mc**: Macth status codes, nếu không chỉ định thì sẽ sử dụng giá trị default
- **-ml**: Match với số dòng trong response
- **-mr**: Match với regex
- **-ms**: Match với HTTP response size
- **-mw**: Match với số tự trong response

Ví dụ để tìm những files hay thư mục chỉ trả về status code là 200 ta có thể sử dụng options **-mc 200** như sau:
```bash
ffuf -u http://testphp.vulnweb.com/FUZZ -w /usr/share/seclists/Discovery/Web-Content/common.txt -mc 200
```
![](https://images.viblo.asia/ebb816b7-64a9-4507-9b17-0322d66a891e.png)


#### GET parameter fuzzing

Giả sử bạn muốn tìm kiếm một param mà bạn đã biết dấu hiệu sai là có 491 từ trong response thì có thể dùng thêm options **-fw**, nó có tác dụng loại bỏ các output có 491 từ:
```bash
ffuf -u "http://testphp.vulnweb.com/listproducts.php?FUZZ=1" -w /usr/share/seclists/Discovery/Web-Content/common.txt -fw 491
```
![](https://images.viblo.asia/62b4d5ed-f5ee-49e3-8a91-d2c88a0dbfec.png)

### POST data

Dưới đây là một ví dụ về việc sử dụng POST data để brute password của một form login. Với POST data chúng ta cần sử dụng option **-X** để đổi method của ffuf(default là GET), các dữ liệu trong form chúng ta cần dùng option **-d**, ngoài ra việc fuzzing chúng ta nên sử dụng thread để tăng tối đa tốc độ fuzz. Hầu hết những tool fuzz, scan đều hỗ trợ chạy đa luồng và ffuf cũng vậy, có thể sử dụng nó bằng option **-t** để tăng thread, nhưng việc tăng thread rất dễ dẫn đến bạn bị block vì gửi quá nhiều request, vì vậy cần tăng nên mức hợp lý nhất có thể để tránh việc block gây ra những error request.

![](https://images.viblo.asia/d56e3b3c-2d7f-4331-b547-3d8cf6b7b16a.png)

#### Subdomain fuzzing

Với phần subdomain ta sử dụng option **-H** để thay đổi header Host trong HTTP request:

```bash
ffuf -u "https://viblo.asia/" -H "HOST:FUZZ.viblo.asia" -mc 200 -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt
```
![](https://images.viblo.asia/04a35916-228b-464b-b1a7-869047fa85a1.png)

#### So sánh với Wfuzz

Về Wfuzz các bạn có thể tham khảo bài viết [Pentest Web với Wfuzz](https://viblo.asia/p/pentest-web-voi-wfuzz-V3m5W0qyKO7), cơ bản thì hai tool này có chức năng khá giống nhau, việc cài đặt hay sử dụng cũng dễ dàng, nhưng ffuf được đánh giá là nhanh hơn bởi nó được viết bằng Go, còn wfuzz được viết bằng python. Ffuf mới được viết năm 2019 nhưng đang được khá ưa chuộng bởi tốc độ đáng kể của nó mang lại. 
#### Kết luận

Bên trên là cách sử dụng ffuf cơ bản, tool vẫn còn rất nhiều các options hỗ trợ cho việc fuzzing, các bạn có thể tìm hiểu thêm tại github của [ffuf](https://github.com/ffuf/ffuf)