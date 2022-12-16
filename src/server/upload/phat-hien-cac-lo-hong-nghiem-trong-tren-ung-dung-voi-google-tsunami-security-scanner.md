# Giới thiệu về Tsunami

`Tsunami`là một tool dùng để quét network trong ứng dụng nhằm phát hiện các lỗ hổng bảo mật trên ứng dụng của bạn, với khả năng mở rộng để sử dụng với nhiều các plugin. `Tsunami` lệ thuộc vào chính những plugin được cung cấp để có thể quét các lỗ hổng, các plugin này được lưu trữ ở [google/tsunami-security-scanner-plugins](https://github.com/google/tsunami-security-scanner-plugins).

`Tsunami` đang ở phiên bản `pre-alpha`.

## Tại sao nên sử dụng Tsunami

Ở thời điểm mà các lỗ hổng bảo mật hoặc việc config sai thông số được khai thác và tấn công bở các hacker, chúng ta phải ứng biến nhanh chóng để bảo vệ những thông tin nhạy cảm, các tài nguyên của ứng dụng. Khi mà các hacker dần tự động hóa việc khai thác lỗ hổng, một lỗ hổng nghiêm trọng chỉ mất khoảng vài giờ để hacker phát hiện ra. Việc này tạo ra 1 thử thách lớn cho các nhà phát triển ứng dụng, trong tình cảnh như vậy, các lỗ hổng cần phri được phát hiện và lập tức khắc phục một cách tự động. Để làm được điều này,  team An toàn thông tin cần phải implement và triển khai các công cụ dò vấn đề bảo mật mới trong thời gian ngắn. Hơn nữa, chất lượng của công cụ dò luôn phải tốt nhất có thể, vì thế `Tsunami` - một công cụ quét network để phát hiện lỗ hổng với độ tin cậy cao.

## Mục tiêu

- `Tsunami` hỗ trợ quản lý thủ công các tập lỗ hổng
- `Tsunami` phát hiện lỗ hổng mức độ nghiêm trọng các, lỗ hổng RCE, những lỗ hổng thường xuyên bị khai thác trên mạng.
- `Tsunami` tạo ra file kết quả của việc scan với độ tin cậy cao và tối thiểu tỷ lệ false-positive.
- `Tsunami` detectors dễ dàng được implement.
- `Tsunami` dễ dàng mới rông, tốc độ scan nhanh.

# Tsunami scan như thế nào ?
## Tsunami Scan Orchestration
### Overview

Tsunami tuân theo quy trình xử lý 2-step khi scan network endpoint:

- Reconnaissance : Ở bước đầ tiên, Tsunami xác định các port được open và các  fingerprints protocols, các services và phần mềm được chạy trên host bằng fingerprinting plugin. Bước này Tsunami sử dụng các tool đã được xây dựng từ trước như nmap...
- Vulnerability verification: Dựa theo dữ liệu ở bước trên, Tsunami tiếp tục sử dụng các vulnerability plugin tương ứng với các services tìm được và thực thi việc xác minh xem lỗ hổng nào là do vô tình.

### Overall Scanning Workflow

![](https://raw.githubusercontent.com/google/tsunami-security-scanner/master/docs/img/orchestration.svg)

#### Reconnaissance
Ở bước này, Tsunami thăm dò và thu thập nhiều thông tin về mục tiêu nhất có thể, bao gồm: 

- open ports
- protocols
- network services và banners
- các phần mềm có dễ gây ra lỗ hổng và version tương ứng.

##### Giai đoạn Port Scanning 

Tsunami thực thi việc quét port để xác minh các open port, protocols và network services trên mục tiêu. Kết quả của việc quét là `PortScanReport` protobuf, chứa toàn bộ về  `NetworkServices` từ `PortScanner`.

 `PortScanner` là một plugin đặc biệt của Tsunami được thiết kế với nhiệm vụ cho bước Port Scanning. Điều này cho phép người dùng thay đổi cách thức scan dễ dàng hơn. Người dùng có thể lựa chọn các plugin được wrap từ những tool có sẵn như nmap hoặc masscan.
 
 ##### Giai đoạn Fingerprinting 

PortScaner thường chỉ xác minh được các service thông thường, khi quét các host có network services phức tạp (như web server), scanner cần thực hiện thêm giai đoạn Fingerprinting để có thêm nhiều thông tin hơn về các network services được expose.

Ví dụ, mục tiêu scan có thể triển khai nhiều ứng dụng web trên cùng cổng 443/TCP bằng nginx cho reverse proxy, `/blog` cho ứng dụng Wordpress, `/forum` cho phpBB,... PortScanner cho có thể cho chúng ta biết cổng 443 đang chạy nginx, vì thế `Web Application Fingerprinter` với crawler toàn diện là bắt buộc để nhận biết các ứng dụng khác.
`ServiceFingerprinter` là plugin của Tsunami cho phép người dùng xác minh fingerprinter cho từ network service bằng cách lọc các annotations, Tsunami sẽ có thể tự động triển khai `ServiceFIngerprinter` khi nó nhận ra sự tương đồng.

##### Reconnaissance Report

Ở bước cuối cùng trong Reconnaissance, Tsunami sẽ biên dịch kết quả của 2 giai đoạn trên thành `ReconnaissanceReport` protobuf cho bước `Vulnerability Verification`.

#### Vulnerability Verification

Ở bước này, Tsunami sẽ thực thi song song các `VulnDetector` plugin để xác minh các lỗ hổng trên mục tiêu scan dựa vào kết quả thu thập từ bước Reconnaissance. `VulnDetector`'s detection logic được implement từ Java hoặc binary/script từ các ngôn ngữ lập trình khác như Python hoặc Go. Các script cần được thực thi độc lập trong các proccess bên người Tsunami bằng cách tận dụng Tsunami's command.

##### Detector Selection

`VulnDetector` thường chỉ xác minh 1 loại lỗ hổng và các lỗ hổng chỉ ảnh hưởng đến một network service hoặc phần mềm, để tránh việc thực thi các detector trên các network service không tồn tại trong hệ thống, Tsunami cho phép các plugin lọc các annotation, để giới hạn việc detect của plugin. Trước khi  Vulnerability Verification bắt đầu, Tsunami sẽ chọn `VulnDetector` tương ứng để chạy trên các network services và phần mềm, `VulnDetector` không cần thiết sẽ không hoạt động trong quá trình quét.

# Cài đặt và sử dụng

## Cài đặt các tool cần thiết

Cài đặt `nmap`, `ncrack`: 

``` bash
$ sudo apt update
$ sudo apt install nmap
$ nmap --version
Nmap version 7.01 ( https://nmap.org )
Platform: x86_64-pc-linux-gnu
Compiled with: liblua-5.2.4 openssl-1.0.2g libpcre-8.43 libpcap-1.7.4 nmap-libdnet-1.12 ipv6
Compiled without:
Available nsock engines: epoll poll select

$ cd ~ && wget https://nmap.org/ncrack/dist/ncrack-0.7.tar.gz
$ tar -xzf ncrack-0.7.tar.gz
$ cd ncrack-0.7
$ ./configure
$ make
$ sudo make install
/usr/bin/install -c -d /usr/local/bin /usr/local/share/man/man1 /usr/local/share/ncrack
/usr/bin/install -c -c -m 755 ncrack /usr/local/bin/ncrack
/usr/bin/strip /usr/local/bin/ncrack
/usr/bin/install -c -c -m 644 docs/ncrack.1 /usr/local/share/man/man1/
/usr/bin/install -c -c -m 644 ncrack-services /usr/local/share/ncrack/
/usr/bin/install -c -c -m 644 lists/* /usr/local/share/ncrack/
NCRACK SUCCESSFULLY INSTALLED
```

## Quét luôn ứng dụng

Chạy command này để thực hiện cài đặt Tsunami và plugin vào thư mục `$HOME/tsunami/repos`:
``` bash
$ bash -c "$(curl -sfL https://raw.githubusercontent.com/google/tsunami-security-scanner/master/quick_start.sh)"

Building all Google plugins ...

Building detectors/credentials/ncrack ...

BUILD SUCCESSFUL in 14s
4 actionable tasks: 4 executed

Building detectors/exposedui/hadoop/yarn ...

BUILD SUCCESSFUL in 2s
5 actionable tasks: 5 executed

Building detectors/exposedui/jenkins ...

BUILD SUCCESSFUL in 1s
5 actionable tasks: 5 executed

Building detectors/exposedui/jupyter ...

BUILD SUCCESSFUL in 1s
4 actionable tasks: 4 executed

Building detectors/exposedui/wordpress ...

BUILD SUCCESSFUL in 1s
5 actionable tasks: 5 executed

Building portscan/nmap ...

BUILD SUCCESSFUL in 3s
5 actionable tasks: 5 executed

Building Tsunami scanner jar file ...

> Task :tsunami-common:compileJava
/home/xxx/tsunami/repos/tsunami-security-scanner/common/src/main/java/com/google/tsunami/common/version/Segment.java:40: warning: [InlineFormatString] Prefer to create format strings inline, instead of extracting them to a single-use constant
  private static final String KEEP_DELIMITER = "((?<=%1$s)|(?=%1$s))";
                              ^
    (see https://errorprone.info/bugpattern/InlineFormatString)
  Did you mean to remove this line?
Note: /home/xxx/tsunami/repos/tsunami-security-scanner/common/src/main/java/com/google/tsunami/common/net/http/HttpResponse.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
1 warning

Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/6.5/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 1m 56s
14 actionable tasks: 14 executed

Build successful, execute the following command to scan 127.0.0.1:
```

việc cài đặt như vậy là xong, bây giờ chỉ cần chạy command để `Tsunami` quét `127.0.0.1` thôi.

---
Ok, sau 15 phút chờ đợi thì `Tsunami` cũng quét xong, do vấn đề riêng tư nên mình xin phép không public thông tin của Vuln Report. 
Bạn có thể chạy thử và xem kết quả ở `/tmp/tsunami-output.json`.

```bash
INFO: Tsunami scanning workflow traces:
  Port scanning phase (1.225 min) with 1 plugin(s):
    /Tsunami Team (tsunami-dev@google.com)/PORT_SCAN/NmapPortScanner/0.1
  Service fingerprinting phase (99.79 ms) with 0 plugin(s):
    
  Vuln detection phase (13.83 min) with 5 plugin(s):
    /Tsunami Team (tsunami-dev@google.com)/VULN_DETECTION/NcrackWeakCredentialDetectorPlugin/0.1 was selected for the following services: ssh (TCP, port 22), ipp (TCP, port 631), mysql (TCP, port 3306), postgresql (TCP, port 5432), http-alt (TCP, port 8000), http (TCP, port 8001)
    /Tsunami Team (tsunami-dev@google.com)/VULN_DETECTION/YarnExposedManagerApiDetector/0.1 was selected for the following services: ssh (TCP, port 22), ipp (TCP, port 631), mysql (TCP, port 3306), postgresql (TCP, port 5432), http-alt (TCP, port 8000), http (TCP, port 8001)
    /Tsunami Team (tsunami-dev@google.com)/VULN_DETECTION/JenkinsExposedUiDetector/0.1 was selected for the following services: ssh (TCP, port 22), ipp (TCP, port 631), mysql (TCP, port 3306), postgresql (TCP, port 5432), http-alt (TCP, port 8000), http (TCP, port 8001)
    /Tsunami Team (tsunami-dev@google.com)/VULN_DETECTION/JupyterExposedUiDetector/0.1 was selected for the following services: ssh (TCP, port 22), ipp (TCP, port 631), mysql (TCP, port 3306), postgresql (TCP, port 5432), http-alt (TCP, port 8000), http (TCP, port 8001)
    /Tsunami Team (tsunami-dev@google.com)/VULN_DETECTION/WordPressInstallPageDetector/0.1 was selected for the following services: ssh (TCP, port 22), ipp (TCP, port 631), mysql (TCP, port 3306), postgresql (TCP, port 5432), http-alt (TCP, port 8000), http (TCP, port 8001)
  # of detected vulnerability: 0.
Jul 16, 2020 9:49:22 AM com.google.tsunami.main.cli.TsunamiCli run
INFO: Tsunami scan finished, saving results.
Jul 16, 2020 9:49:22 AM com.google.tsunami.common.io.archiving.RawFileArchiver archive
INFO: Archiving data to file system with filename '/tmp/tsunami-output.json'.
Jul 16, 2020 9:49:22 AM com.google.tsunami.main.cli.TsunamiCli run
INFO: TsunamiCli finished...
Jul 16, 2020 9:49:22 AM com.google.tsunami.main.cli.TsunamiCli main
INFO: Full Tsunami scan took 15.08 min.
```

# Tạm kết
Mình vừa chạy thử trên server, nhưng có vẻ Tsunami quét khá chi tiết nên chạy khá lâu vẫn chưa xong. Nhưng cũng có thể chấp nhận được, quét càng kỹ thì ít bỏ xót lỗi hơn mà =)) Hiện tại `Tsunami` đang ở phiên bản `pre-alpha`, hy vọng ở bản stable sẽ có nhiều plugin được bổ sung, quét được nhiều loại lỗ hổng hơn.

# Tài liệu tham khảo
- [google/tsunami-security-scanner](https://github.com/google/tsunami-security-scanner)