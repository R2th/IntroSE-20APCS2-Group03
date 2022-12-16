### 0. Web reconnaissance
Reconnaissance ( hay Information Gathering hay Enumeration ) là bước đầu tiên của penetration testing ( pentest ), trong đó mục tiêu là tìm thấy càng nhiều thông tin càng tốt về Website được pentest. <br>
Trong bước Recon này, để hiệu quả, chính xác, tiết kiệm thời gian và công sức, việc sử dụng các tools có sẵn hoặc tự viết tools là bắt buộc. <br>
Hôm nay tôi sẽ giới thiệu đến các bạn 1 tool tôi hay dùng gần đây: **Gobuster**<br><br>
**Lưu ý:** Wordlist các bạn có thể tìm kiếm và tải miễn phí trên internet để sử dụng.
### 1. Giới thiệu và cài đặt
Là 1 tool mạnh và mới, được ưa dùng trên Kali Linux, được viết bằng Golang và được update thường xuyên. Gobuster là một công cụ được sử dụng để brute force URLs trên các trang web và DNS subdomains. Bạn có thể xem toàn bộ source code tại [đây.](https://github.com/OJ/gobuster)<br><br>
Để cài đặt, trong Kali Linux, các bạn gõ:  **`apt-get install gobuster`**<Br><br>
![](https://images.viblo.asia/d3d138b9-a66c-43d9-a8a9-fd22773bc899.png)

### 2. Sử dụng

Gobuster cung cấp 3 mode option chính gồm: DIR, DNS và vHOST<br>
Trong bài viết này chúng ta sẽ tìm hiểu về các options chính, thường dùng và hữu ích.
#### 2.1. Dir mode: Dò quét các URLs của website theo wordlist
Để hiển thị các tùy chọn trong chế độ này, các bạn gõ: **`gobuster dir -h`**
```
Usage:
  gobuster dir [flags]

Flags:
  -f, --addslash                      Append / to each request
  -c, --cookies string                Cookies to use for the requests
  -e, --expanded                      Expanded mode, print full URLs
  -x, --extensions string             File extension(s) to search for
  -r, --followredirect                Follow redirects
  -H, --headers stringArray           Specify HTTP headers, -H 'Header1: val1' -H 'Header2: val2'
  -h, --help                          help for dir
  -l, --includelength                 Include the length of the body in the output
  -k, --insecuressl                   Skip SSL certificate verification
  -n, --nostatus                      Don't print status codes
  -P, --password string               Password for Basic Auth
  -p, --proxy string                  Proxy to use for requests [http(s)://host:port]
  -s, --statuscodes string            Positive status codes (will be overwritten with statuscodesblacklist if set) (default "200,204,301,302,307,401,403")
  -b, --statuscodesblacklist string   Negative status codes (will override statuscodes if set)
      --timeout duration              HTTP Timeout (default 10s)
  -u, --url string                    The target URL
  -a, --useragent string              Set the User-Agent string (default "gobuster/3.0.1")
  -U, --username string               Username for Basic Auth
      --wildcard                      Force continued operation when wildcard found

Global Flags:
  -z, --noprogress        Don't display progress
  -o, --output string     Output file to write results to (defaults to stdout)
  -q, --quiet             Don't print the banner and other noise
  -t, --threads int       Number of concurrent threads (default 10)
      --delay duration    Time each thread waits between requests (e.g. 1500ms)
  -v, --verbose           Verbose output (errors)
  -w, --wordlist string   Path to the wordlist
```
<br>
Chúng ta sẽ xem xét câu lệnh sau, đây cũng sẽ là câu lệnh khái quát, cơ bản hay dùng khi các bạn sử dụng Gobuster: <br><br>

> gobuster dir -u 10.10.10.157 -w /home/vt103/wordlist/common.txt -l -t 30 -e -x php -o 10.10.10.157.result.txt


    
   * *10.10.10.157 là địa chỉ 1 machine trên hackthebox.eu, các bạn có thể ghé qua website, đăng ký và chơi thử*
   * *common.txt là file wordlist tôi sử dụng, có khoảng gần 5000 word* 
    
<br>Và đây là kết quả:

![](https://images.viblo.asia/bfa9a523-d079-42d6-b68d-8a808393ee8a.png)

Chúng ta hãy cùng xem xét các options đã được sử dụng:<br>
>**dir:** mode được chọn<br>
> **-u:** địa chỉ URL<br>
> **-w:** địa chỉ file wordlist trong máy chúng ta<br>
> **-l:** In ra length body của response nhận được<br>
> **-t:** số threads được sử dụng, mặc định là 10 <br>
> **-e:** dùng để in kết quả theo dạng toàn bộ URL<br>
> **-x:** thêm phần đuôi mở rộng để brute force, chẳng hạn -x php: tự thêm .php vào sau các request URL<br>
> **-o:** in kết quả ra file để tiện dùng sau này, mặc định sẽ in ra /home/ do chúng ta gọi gobuster ngay tại /home/<Br>


<br>
Một số tùy chọn khác:

>**-U:** username cho website có Basic Authen<br>
>**-P:** password cho website có Basic Authen<br>
>**-c:** gán cookie cho các request <br>
>**-s:** gán các HTTP status code được chấp nhận, mặc định là 200,204,301,302,307,401,403<br>
>**-r:** follow redirects

 Dựa vào kết quả của việc brute-force URLs phía trên, chúng ta đã có URL đúng và cũng là hướng làm của machine này:<br>
 <br>
 ![](https://images.viblo.asia/170d60e9-0b2f-47ef-b7a2-4a8ee22da969.png)
    
#### 2.2 DNS mode: Dò quét DNS subdomains của website

Để hiển thị các tùy chọn trong chế độ này, các bạn gõ: **`gobuster dns -h`**
```
Usage:
  gobuster dns [flags]

Flags:
  -d, --domain string      The target domain
  -h, --help               help for dns
  -r, --resolver string    Use custom DNS server (format server.com or server.com:port)
  -c, --showcname          Show CNAME records (cannot be used with '-i' option)
  -i, --showips            Show IP addresses
      --timeout duration   DNS resolver timeout (default 1s)
      --wildcard           Force continued operation when wildcard found

Global Flags:
  -z, --noprogress        Don't display progress
  -o, --output string     Output file to write results to (defaults to stdout)
  -q, --quiet             Don't print the banner and other noise
  -t, --threads int       Number of concurrent threads (default 10)
      --delay duration    Time each thread waits between requests (e.g. 1500ms)
  -v, --verbose           Verbose output (errors)
  -w, --wordlist string   Path to the wordlist
```

Ý nghĩa các options sẽ khác đôi chút so với **dir mode** phía trên. Chúng ta sẽ cùng xem xét câu lệnh sau:
> gobuster dns -d facebook.com -w home/vt103/wordlist/common.txt -t 30 -i -o dnsrecon.txt
 
Trong đó: 
 >**-d:** chỉ domain name, sẽ không có http:// hay https:// <br>
 >**-w:** địa chỉ file wordlist trong máy chúng ta<br>
> **-t:** số threads được sử dụng, mặc định là 10 <br>
>**-i:** hiển thị địa chỉ IP của target<br>
**-o:** in kết quả ra file .txt
 
 Và đây là kết quả, bạn đã biết được bao nhiêu địa chỉ trong số này? :
![](https://images.viblo.asia/2f3c9995-0b2b-42c2-9a41-cc8dbe5af20f.png)

#### 2.3 vHost mode: Dò quét vHost của website
Để hiển thị các tùy chọn trong chế độ này, các bạn gõ: **`gobuster vhost -h`**
```
Usage:
  gobuster vhost [flags]

Flags:
  -c, --cookies string        Cookies to use for the requests
  -r, --followredirect        Follow redirects
  -H, --headers stringArray   Specify HTTP headers, -H 'Header1: val1' -H 'Header2: val2'
  -h, --help                  help for vhost
  -k, --insecuressl           Skip SSL certificate verification
  -P, --password string       Password for Basic Auth
  -p, --proxy string          Proxy to use for requests [http(s)://host:port]
      --timeout duration      HTTP Timeout (default 10s)
  -u, --url string            The target URL
  -a, --useragent string      Set the User-Agent string (default "gobuster/3.0.1")
  -U, --username string       Username for Basic Auth

Global Flags:
  -z, --noprogress        Don't display progress
  -o, --output string     Output file to write results to (defaults to stdout)
  -q, --quiet             Don't print the banner and other noise
  -t, --threads int       Number of concurrent threads (default 10)
      --delay duration    Time each thread waits between requests (e.g. 1500ms)
  -v, --verbose           Verbose output (errors)
  -w, --wordlist string   Path to the wordlist
```
Đây là 1 mode tôi ít sử dụng, và ngay cả trên github giới thiệu của Gobuster thì mode này cũng được giới thiệu khá sơ sài. Bạn đọc có thể tự cài đặt và thử sử dụng.<br><br>
 Ví dụ trên Github: `gobuster vhost -u https://mysite.com -w common-vhosts.txt`
### 3. Kết luận
Việc reconnaissance yêu cầu sử dụng kết hợp rất nhiều tools và kênh thông tin khác nhau. Gobuster xứng đáng nằm trong "kho vũ khí" của bất cứ một ai làm về CyberSec bởi tốc độ và sự hiểu quả của nó. Happy Hacking !