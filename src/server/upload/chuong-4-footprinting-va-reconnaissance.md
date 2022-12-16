**Chương 4: Footprinting và Reconnaissance**

**Các bước tấn công mạng**

Để bắt đầu tấn công hệ thống, bạn cần thực hiện 4 bước:
* Footprinting
* Scanning
* Enumeration
* System Hacking

![](https://images.viblo.asia/afa83f51-3fdf-4496-9068-7f8e05ca5ee7.png)

Các bước trên áp dụng cho bất kỳ cuộc tấn công trên mạng nào. Hacker phải ra sức thu thập càng nhiều thông tin càng tốt về mọi góc cạnh bảo mật của tổ chức. Kết quả thu được sẽ giúp cuộc tấn công trót lọt hơn. Bằng cách dò theo dấu chân, những bộ lưu trữ trên internet, truy cập từ xa, cùngvới sự hiện diện của internet kẻ tấn công có thể góp nhặt một cách có hệ thống các thông tin từ nhiều nguồn khác nhau về một tổ chức nào đó.

**FootPrinting là gì ?**

Phương pháp thu thập thông tin
Tổng hợp thông tin có thể được hiện trong 7 bước như mô tả của hình 3.1. Quátrình Footprinting được thực hiện trong 2 bước đầu của việc khám phá thông tin ban đầu và định vị phạm vi mạng.

Một số nguồn thông thường được sử dụng để thu thập thông tin bao gồm sau đây:
* Domain name lookup
* Whois
* Nslookup
* Sam Spade

Bảy bước của việc tổng hợp thông tin:
Trước khi chúng ta thảo luận những công cụ này, Hãy nhớ rằng thông tin nguồn mở có thể mang lại sự giàu có của thông tin về một mục tiêu, ví dụ như những số điện thoại và địa chỉ. Thực hiện những yêu cầu của Whois, tìm kiếm trong bảng Domain Name System (DNS). Hầu hết thông tin này là dễ dàng có được và hợp pháp để có được.

Chi tiết về cách hoạt động DNS và cụ thể của bản dịch DNS là ngoài phạm vi của cuốn sách này và sẽ không được thảo luận chi tiết. Duy nhất chi tiết quan trong nhất liên quan cụ thể tới thông tin được nằm trong cuốn sách này. Đó là khuyến cáo rằng tất cả các ứng cử viên CEH có một sự hiểu biết về DNS và cách phân tên công việc trên Internet.

**Phương pháp liệt kê DNS**

NSlookup, DNSstuff, the American Registry for Internet Number (ARIN), và Whois có thể được sử dụng tất cả để đạt được thông tin mà kế đó được sử dụng để thực hiện DNS enumeration.

**Nslookup and DNSstuff**

Một công cụ mạnh mẽ bạn nên làm quen là nslookup (xem hình 2.2). Công cụ này truy vấn những DNS server để tìm thông tin. Nó được cài đặt trong Unix, Linux, và hệ đều hành Window. Công cụ hack Sam Spade bao gồm những công cụ nslookup.

![](https://images.viblo.asia/191c1209-8eda-45d9-89b6-a72e86378939.png)


**Nslookup**

Ngoài việc tìm thông tin tổng hợp từ Whois, bạn có thể sử dụng nslookup để tìm bổ sung địa chỉ IP cho những máy chủ và những host khác. Sử dụng tên máy chủ có thẩm quyền thông tin từ Whois (AUTH1.NS.NYI.NET), bạn cần nhận ra địa chỉ IP của mail server. Sự bùng nổ của việc sử dụng thành thạo các công cụ đã làm quá trình hack thật sự dễ dàng, nếu như bạn biết những công cụ nào để sử dụng. DNSwatch là một
công cụ khác của những công cụ đó. Thay vì sử dụng dòng lệnh công cụ nslookup với những thiết bị chuyển mạch cồng kềnh của nó để tổng hợp việc ghi thông tin DNS, chỉ cần truy cập website http://www.dnswatch.info, và bạn có thể làm một DNS record search online.

**Whois và ARIN Lookups**

Whois đã phát triển từ hệ điều hành Unix, nhưng nó bây giờ có thể được tìm thấy trong nhiều hệ điều hành khác như trong hacking toolkits và trên Internet. Người xác định công cụ này phải đăng ký tên miền sử dụng cho email hoặc website. Uniform Resource Locator (URL), ví dụ www.Microsoft.com, chứa tên miền (Microsoft.com) và 1 tên host hoặc bí danh(www).

Internet Corporation for Asigned Names and Numbers (ICANN) yêu cầu đăng ký tên miền để bảo đảm rằng chỉ có một công ty duy nhất sử dụng tên miền cụ thể đó. Công cụ Whois truy vấn việc đăng ký cơ sở dữ liệu để lấy thông tin liên lạc về cá nhân hoặc tổ chức đăng ký tên miền đó.
Whois thông minh là 1 chương trình thu thập thông tin cho phép bạn tìm tất cả thông tin giá trị về một địa chỉ IP, host name, hoặc domain, bao gồm đất nước, gồm có làng, tỉnh, thành phố, tên của người cung cấp mạng, administrator, và hỗ trợ kỹ thuật địa chỉ thông tin. Whois thông minh là 1 phiên bản đồ họa của chương trình Whois cơ sở.

ARIN là một cơ sở dữ liệu của thông tin bao gồm những thông tin như chủ sở hữu của địa chỉ IP tĩnh. Cơ sở dữ liệu ARIN có thể được truy vấn việc sử dụng công cụ Whois, ví dụ một vị trí tại http://centralops.net/

**Tìm kiểm vùng địa chỉ mạng (network address range)**

Mỗi hacker cần hiểu làm thế nào để tìm vùng địa chỉ mạng và subnet mask của hệ thống đích. Địa chỉ IP được sử dụng để xác định vị trí, scan, và kết nối đến hệ thống đích. Bạn có thể tìm địa chỉ IP đăng ký trên internet với ARIN hoặc với IANA(Internet Asigned Numbers Authority). 

Hacker cũng cần phài tìm ra bảng đồ đường đi của hệ thống mạng mục tiêu. Nhiệm vụ này có thể thực hiện bằng cách gửi những gói tin thăm dò (bằng giao thức ICMP) đến địa chỉ IP đích. Bạn có thể sử dụng công cụ như Traceroute, VisualRouter và NeoTrace cho công việc này.

Ngoài ra, không chỉ có thông tin mạng đích, những thông tin khác cũng trở nên có giá trị. Ví dụ nhưng những địa chỉ mà hệ thống mạng này vừa truyền nhận gói tin, địa chỉ gateway...Nó sẽ có tác dụng trong một tiến trình tấn công khác.

**Sự khác biệt của các loại bảng ghi DNS (DNS Record)**

Dưới đây là các loại bảng ghi DNS mà chúng ta thường gặp. Việc nghiên cứu nó sẽ giúp chúng ta phân biệt rõ server mà chúng ta đang tìm có chức năng gì.
* A (address): Ánh xạ hostname thành địa chỉ IP.
* SOA (Start of Authoriy): Xác định bảng ghi thông tin của DNS Server.
* CNAME (canonical name): Cung cấp những tên biệt danh (alias) cho tên miền đang có.
* MX (mail exchange): Xác định mail server cho domainSRV (service): Xác định những dịch vụ như những directory service
* PTR (pointer): Ánh xạ địa chỉ ip thành hostname
* NS (name server): Xác định Name Server khác cho domainDưới đây là các loại bảng ghi DNS mà chúng ta thường gặp. Việc nghiên cứu nó sẽ giúp chúng ta phân biệt rõ server mà chúng ta đang tìm có chức năng gì.
* A (address): Ánh xạ hostname thành địa chỉ IP.
* SOA (Start of Authoriy): Xác định bảng ghi thông tin của DNS Server.
* CNAME (canonical name): Cung cấp những tên biệt danh (alias) cho tên miền đang có.
* MX (mail exchange): Xác định mail server cho domainSRV (service): Xác định những dịch vụ như những directory service
* PTR (pointer): Ánh xạ địa chỉ ip thành hostname
* NS (name server): Xác định Name Server khác cho domain

**Sử dụng traceroute trong kỹ thuật FootPrinting**

Traceroute là gói công cụ được cài đặt sẵn trong hầu hết các hệ điều hành. Chức năng của nó là gửi một gói tin ICME Echo đến mỗi hop (router hoặc gateway), cho đến khi đến được đích. Khi gói tin ICMP gửi qua mỗi router, trường thời gian sống (Time To Live – TTL) được trừ đi xuống một mức. Chúng ta có thể đếm được có bao nhiêu Hop mà gói tin này đã đi qua, tức là để đến được đích phải qua bao nhiêu router. Ngoài ra, chúng ta sẽ thu được kết qua là những router mà gói tin đã đi qua. 

Một vấn đề lớn khi sử dụng Traceroute là hết thời gian đợi (time out), khi gói tin đi qua tường lửa hoặc router có chức năng lọc gói tin. Mặc dù tường lửa sẽ chặn đứng việc gói tin ICMP đi qua, nhưng nó vẫn gửi cho hacker một thông báo cho biết sự hiện diện này, kế đến vài kỹ thuật vượt tường lửa có thể được sử dụng. Sam Spade và nhiều công cụ hack khác bao gồm 1 phiên bản của traceroute. Những hệ điều hành Window sử dụng cú pháp tracert hostname để xác định một traceroute. Hình dưới là một ví dụ về traceroute hiển thị việc theo dõi theo http://www.yahoo.com

![](https://images.viblo.asia/1893d67f-a89e-4942-af21-5860a83edf14.png)


-----

Bài viết được dịch từ chương 4 từ trang 10, 81-90 quyển: CEH v8 - Certified Ethical Hacker Version 8 Study Guide