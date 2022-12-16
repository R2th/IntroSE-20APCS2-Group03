## I ) Giới Thiệu chung về Nmap

Như chúng ta đã biết, Nmap với phiên bản mới nhất hiện nay là 7.80 được ra mắt tại DEFCON 27 là một công cụ quét mạng với mã nguồn mở, được sử dụng rất phổ biến bởi các chuyên gia an ninh bởi  tính hiệu quả, minh bạch mà nó đem lại vì một công cụ có mã nguồn mở có thể cho phép cộng đồng An ninh mạng trên thế giới cùng nhau tham gia đóng góp và xây dựng, phát triển.

Trong bài viết này tôi sẽ hướng dẫn các bạn sử dụng công cụ Nmap để scan tìm ra hệ điều hành, cụ thể các service đang chạy và hơn thế nữa với đối tượng là website Viblo.asia. Bài viết này được viết với duy nhất mục đích giáo dục và tôi không chịu bất kì trách nhiệm nào và không khuyến khích về việc dựa theo bài viết này để khai thác các thông tin và tiến hành xâm nhập khi không có sự cho phép. 

### 1. Cách thức hoạt động 
Nmap sử dụng các IP trên các gói tin theo những cách đặc biệt khác nhau để có thể xác định các host trên một hệ thống mạng , để rồi từ đó xác định xem những services đang chạy trên hệ thống đó, hệ điều hành đang chạy, bộ lọc các gói tin cũng như tường lửa đang sủ dụng là gì. 

### 2. Tính năng của Nmap 
- Phát hiện lỗ hổng bảo mật 
- khai thác lỗ hổng bảo mật 
- phát hiện ra backdoor 
- quét mạng network
- quét các máy chủ và các cổng trên máy chủ trên hệ thống
- xác định hệ điều hành, service, firewall đang sử dụng
- cung cấp thông tin về loại thiết bị, tên DNS, địa chỉ Mac
- thực thi các đoạn script NSE hoặc Lua với các đối tượng được kiểm thử

## II ) Hướng dẫn tải và cài đặt

Nmap có thể sử dụng trên Windows và macOS cũng như được hỗ trợ trên các bản phân phối của Linux bao gồm Red Hat, Mandrake, SUSE và Fedora và đồng thời hoạt động được trên các hệ điều hành khác gồm BSD, Solaris, AIX và AmigaOSfaffa

### 1. Trên hệ điều hành Windows  
Truy cập https://nmap.org/download.html và tải về bản cài đặt như sau :
![](https://images.viblo.asia/e70f69a7-cbaa-46a2-ab7d-64cb214541c3.png)

### 2. Trên một số các bản phân phối Linux khác 
Đối với *Debian based* ta sử dụng câu lệnh:  `#sudo apt install nmap`

Đối với *Red Hat Based* ta sử dụng câu lệnh : `#yum install nmap`

Và ấn "Y" để xác nhận cài 
![](https://images.viblo.asia/d73df3e8-19f0-48f0-bea4-85b6d2decd1c.png)https://images.viblo.asia/d73df3e8-19f0-48f0-bea4-85b6d2decd1c.png

Sau khi cài xong Nmap ta có thể kiểm tra đã cài đặt thành công chưa và phiên bản là gì bằng cách sử dụng lệnh : `#nmap --version`

## III ) Sử dụng Nmap

### 1. NSE script 
Nmap Scripting Engine (NSE) là 1 trong những tùy chọn khá lợi hại trong  Nmap. Nó cho phép người dùng viết và chia sẻ những đoạn script đơn giản để thực hiện những công việc khác nhau trong lĩnh vực networking một cách tự động. Những đoạn script này có thể sử dụng để phát hiện các lỗ hổng và khai thác các lỗ hổng.

Để thực hiện chức năng này của nmap sử dụng tùy chọn : `–-script [tên_script].nse`

Trong nmap chúng ta gồm có 4 loại NSE scripts như sau :
- *host script* : là một loại script được **thực thi sau khi nmap đã thực hiện tác vụ** của nó như quét những host, cổng mạng hay hệ điều hành,…
- *prerule script* : là một loại script được **thực thi trước bất kì 1 tác vụ quét** hay thu thập thông tin nào
- *service script* : là loại script chạy để **chống lại 1 service đang lắng nghe** ở trên mục tiêu đang pentest
- *postrule sciprt* : là loại script chạy **sau khi Nmap thực thi** scan mục tiêu 

Vị trí của NSE script :
Các script (.nse file) nằm trong thư mục script khi cài đặt nmap, người dùng có thể tùy biến chỉnh sửa, thêm các scirpt khác. 

Trên mỗi hệ điều hành khác nhau chúng sẽ được lưu trữ ở một vị trí khác nhau :

- *Trên linux* : `~/.nmap/scripts/` hoặc `/usr/share/nmap/scripts/` hoặc trong `$NMAPDIR.`
    Hoặc với cách dễ nhất là chạy lệnh :` locate *.nse `
- *Trên Mac* : /usr/local/Cellar/nmap//share/nmap/scripts/.
- *Trên windows* : C:\Program Files (x86)\Nmap\scripts or C:\Program Files\Nmap\scripts

* Ngoài ra trong tường hợp bạn muốn update các script NSE trên Nmap hãy sử dụng lệnh : `sudo nmap --script-updatedb`

Dưới đây là 1 số ví dụ về sử dụng NSE Script để scan các lỗ hổng bảo mật trên hệ thống 

* SSL-HEARTBLEED : Phát hiện lỗ hổng bảo mật OpenSSL Heartbleed bug (CVE-2014-0160).

    Tải về : https://svn.nmap.org/nmap/scripts/ssl-heartbleed.nse

     Lệnh : `#sudo nmap -sV -p 443 –script=ssl-heartbleed.nse <IP_của_mục tiêu>`
* NMAP-VULNERS

    NSE script giúp cung cấp thông tin về lỗ hổng có thể trên hệ thống dựa theo API của Vulners.com

    Github : https://github.com/vulnersCom/nmap-vulners

    Lệnh : `#sudo nmap -sV --script vulners [--script-args mincvss=] <IP_của_mục tiêu>`
    
* FREEVULNSEARCH

    NSE script to query vulnerabilities via the cve-search.org API.

    Github : https://github.com/OCSAF/freevulnsearch

    Lệnh : `#sudo nmap -sV --script freevulnsearch <IP_của_mục tiêu>`


### 2. Trạng thái các cổng trong Nmap
   Trong quá trình scan ta có thể thấy trạng thái các cổng như sau :
-  *Open*: Đang có một dịch vụ thực hiện kết nối ra bên ngoài nhưng không bị giám sát bởi tường lửa.
-  *Closed*: Máy mục tiêu vẫn nhận và phản hồi, nhưng ko có ứng dụng nào đang nghe trên cổng đó. Khi đó cổng được báo là đóng vẫn có thể cho ta biết host đang sống
-  *Filtered*: Đã có sự ngăn chặn bởi tường lửa, bạn sẽ chẳng nhận được bất cứ phản hồi gì từ mục tiêu cả.
-  *Unfiltered*: Không bị chặn, nhưng không thể biết được cổng đóng hay mở.
-  *Open/Filtered*: không biết là cổng mở hay bị lọc. Nó xảy ra đối với kiểu quét mà cổng dù mở nhưng không phản hồi gì cả nên biểu hiện của nó giống như bị lọc.
-  *Closed/Filtered*:  Trạng thái xuất hiện khi Nmap không biết được port đó đang Closed hay Filtered. Nó được sử dụng cho quét IPID Idle.

###  3. Các lệnh phổ biến trong Nmap
 * Kiểm tra xem host còn alive không : `#nmap -sn [IP_của_mục tiêu]`
 * Kiểm tra hệ điều hành của server : `#nmap -O [IP_của_mục tiêu]`
 *  Quét một port cụ thể : `#nmap -p [số_cổng] [IP_của_mục tiêu]`
 *  Quét kết nối TCP, Nmap sẽ thực hiện việc quét bắt tay 3 bước : `#nmap -sT [IP_của_mục tiêu]`
 *  Quét kết nối UDP : `#nmap -sU [IP_của_mục tiêu]`
 *  Quét xác định phiên bản của dịch vụ đang chạy trên host : `#nmap -PN -p [số_cổng] -sV [IP_của_mục tiêu]`

Và còn rất nhiều các đối số nữa các bạn có thể tham khảo dưới đây : 
https://hackersonlineclub.com/nmap-commands-cheatsheet/ 

### 4. Demo thực tế với Viblo

Đầu tiên khi chúng ta đã xác định được mục tiêu , để có được IP hãy thử với ping :  `ping viblo.asia`

![](https://images.viblo.asia/80c55484-ec29-4805-b9e5-69dee64236b4.png)

Nhưng như các bạn thấy IP chúng ta thấy là 104.27.188.151 . Nhưng thực chất nó không phải IP của web server của Viblo.asia mà là IP của Cloudflare mà viblo.asia đang trỏ đến

Tham khảo dãy IP của Cloudflare tại đây : https://www.cloudflare.com/ips/

Theo kinh nghiệm của tôi tìm hiểu thì với trường hợp này các bạn nên sử dụng đến hệ thống Netcraft tại https://toolbar.netcraft.com/ . Netcraft là công ty đã khảo sát Internet từ 1995 và thu thập biến thiên của Internet trong vòng gần 25 năm qua

Vậy là tôi bắt đầu tìm các report trong Netcraft về Viblo.asia

![](https://images.viblo.asia/d75e0ce2-1cdb-49d3-ad95-40ea8e485e58.png)

Như đây các bạn có thể thấy đây cũng báo là IP của Cloudflare. Và kéo xuống tiếp thì có tìm ra 1 số thông tin sau 
![](https://images.viblo.asia/5b447e85-3e9b-4448-83b7-92d05ff05d75.png)

Vậy ta có thấy netcraft đã ghi dc 3 IP là `160.16.198.185` , `160.16.124.150`, `139.162.17.246`

Thì trong đó 2 IP đầu tiên kia ta có thể thấy là của SAKURA Internet hay chính là trang takoyaki.asia (Khả năng trước đây 2016 trang đó cũng dùng IP coudflare này ). Nhưng chú ý vào IP thứ 3 ở mục SPF kia là `139.162.17.246` . Khả năng cao nó sẽ là IP của Viblo.asia

Để biết hãy thử truy cập nó xem sao

![](https://images.viblo.asia/133bd53e-63da-4c84-9cec-a30ec2322fe8.png)

Đến đây thì tiếp tục nó sẽ ra trang 404. Nhưng thế là đủ vậy thật của Viblo.asia là `139.162.17.246`

Thôi bây giờ đến lúc quay lại về Nmap thôi :)) Chạy lệnh đơn giản nhất nào 

![](https://images.viblo.asia/efef15e8-2768-41c0-9f0c-db38ee7fa49c.png)

Ở đây có chút lưu ý ta có thể thấy xuất hiện https://li859-246.members.linode.com/ từ đó ta có thêm 1 thông tin là Viblo.asia đang chạy trên VPS của Linode

Tiếp tục, nhìn không hiện các port gì thế kia là bị firewall chặn rồi . Nhưng không sao chúng ta có cách bypass được qua bằng cách dùng đối số `--spoof-mac` 

![](https://images.viblo.asia/7fc76ba9-f92d-48dc-af05-00de7ded9f45.png)

Okay đã tìm được ra các port đang mở trên server . Gồm các port 22,80,443,6001 và dưới đây là bảng tên các service thường chạy trên các port đó

![](https://images.viblo.asia/db50e80e-35eb-45c6-af67-dfc8d12ee5d2.png)

Bây giờ nếu bạn muốn biết thêm hệ điều hành đang sử dụng trên máy chủ đó là gì thì thêm đối số `-O ` vào câu lệnh. Khi đó ta có được thế này

![](https://images.viblo.asia/3f65f7a7-2406-4754-8d94-2e3e0855af32.png)

vì ở đây ta có thể thấy không phát hiện được có cổng nào đóng nên độ chính xác về xác định hệ điều hành cũng giảm đi và như trường hợp này ta tạm biết được thông tin là HDH sử dụng nhân Linux

Cùng tổng hợp 1 số đối số để có cái nhìn toàn diện, tôi sẽ dùng lệnh `#nmap -sC -sV -O -spoof-mac Cisco 139.162.17.246`
trong đó -sC là chạy script mặc định và -sV sẽ hiển thị thông tin chi tiết service như dưới đây

![](https://images.viblo.asia/3ffc4b6b-614d-4007-b4b5-cc7ec4228861.png)

Và đến đây cũng có thêm chút ít về thông tin và khả năng hệ điều hành mà trong tình huống này của con VPS đang chạy 

![](https://images.viblo.asia/da8b0460-2b81-48b1-9efe-eecb395ac797.png)

--------- Kết thúc Demo----------

Tôi hy vọng mọi người sau bài viết này có được cái nhìn cụ thể hơn về Nmap cũng như có được 1 số hướng đi trong quá trình reconnaissance trong pentesting.