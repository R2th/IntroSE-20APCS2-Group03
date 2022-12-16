![](https://images.viblo.asia/2ceeb4f4-af65-4a98-8e25-752ef3c03ecf.jpg)

Ở phần [trước](https://viblo.asia/p/tim-hieu-co-ban-ve-security-test-3P0lPYmn5ox) chúng ta đã tìm hiểu những khái niệm cơ bản về security testing.

Trong phần này, chúng ta sẽ tiếp tục tìm hiểu chi tiết về quá trình security test và Malicious Software.
## Process
Kiểm thử bảo mật (security testing) có thể được coi là một cuộc tấn công có kiểm soát vào hệ thống, giúp phát hiện ra các lỗ hổng bảo mật một cách thực tế. Mục tiêu của nó là đánh giá tình trạng hiện tại của một hệ thống công nghệ thông tin. Nó còn được gọi là kiểm tra thâm nhập - penetration test hoặc phổ biến hơn là ethical hacking.
Kiểm tra thâm nhập được thực hiện theo từng giai đoạn và ở đây trong chương này, chúng ta sẽ thảo luận về thế nào là một quá trình hoàn chỉnh của security test. Những tài liệu thích hợp nên được hoàn thành trong mỗi giai đoạn nhằm mục đích để chuẩn bị tất cả các bước cần thiết mà dùng để tái hiện một cuộc tấn công. Tài liệu này cũng là cơ sở phục vụ việc báo cáo chi tiết cho khách hàng khi kết thúc penetration test. 
### Penetration test - Workflow 
Penetration test bao gồm 4 giai đoạn dưới đây: 
* Foot printing 
* Scanning 
* Enumeration 
* Exploitation 

4 giai đoạn này được lặp đi lặp lại nhiều lần trong vòng đời sản xuất phần mềm (Software development life cycle)
![](https://images.viblo.asia/3ca107a1-a500-4c42-bf1b-c17af6b8f91e.jpg)
### Foot Printing 
Footprinting là bước đầu tiên trong các bước chuẩn bị cho một cuộc tấn công mạng. Có nghĩa là nó thu thập thông tin hệ thống, như domain name, IP address, website, email address, tìm kiếm thông tin người dùng qua các trang mạng xã hội (Facebook, Twiter,....) hay đơn giản là tìm kiếm thông tin về các tổ chức nhờ công cụ Google. Mục tiêu của phần footprinting là thu thập càng nhiều thông tin về đối tượng càng tốt.
### Scanning 
Scanning là bước thứ 2 được thực hiện sau Foot Printing. Ở giai đoạn này, chúng ta sẽ thực hiện việc quét các port đang mở, nhận dạng hệ điều hành, và điều tra các dịch vụ trên các port đang được hệ thống sử dụng. Để thực hiện quá trình scanning, các công cụ sử dụng có thể được sử dụng: NMap, Ping, Traceroute, Superscan, Netcat, NeoTrace, Visual Route
### Enumeration 
Enumeration (liệt kê) có thể được định nghĩa là quá trinh trích xuất những thông tin có được trong phần scan ra thành một hệ thống có trật tự. Những thông tin được trích xuất bao gồm những thứ có liên quan đến mục tiêu cần tấn công, như tên người dùng (user name), tên máy tính (host name), dịch vụ (service), tài nguyên chia sẻ (share).
Enumeration bao gồm cả công đoạn kết nối đến hệ thống và trực tiếp rút trích ra các thông tin. Mục đích của kĩ thuật liệt kê là xác định tài khoản người dùng và tài khoản hệ thống có khả năng
sử dụng vào việc hack một mục tiêu. 
Các kỹ thuật được sử dụng trong Enumeration (liệt kê) có thể kể ra như:
* Win2k Enumeration : để trích xuất thông tin tài khoản người dùng (user name).
* SNMP (Simple Network Management Protocol) để liệt kê thông tin người dùng.
* Active Directory Enumeration dùng trong liệt kê hệ thống Active Directory.
* Sử dụng Email IDs để tìm kiếm thông tin.
### Exploitation 
Đây là bước cuối cùng trong quá trình tấn công. Dựa vào các thông tin đã thu thập được ở các bước trên, hacker sẽ tiến hành thâm nhập vào hệ thống nhờ các thông tin đó. Tùy thuộc vào mục đích tấn công (white-hat hacker hay là black-hat hacker) mà hệ thống sẽ được vá lỗi hay sẽ bị phá hủy do các lỗ hổng mà hacker tấn công. 
## Malwares 
![](https://images.viblo.asia/4d35c124-1e86-408a-952e-4fc5e346f930.png)

Malwares - phần mềm độc hại là bất kỳ phần mềm nào cung cấp toàn quyền kiểm soát toàn bộ hệ thống cho người tạo / kẻ tấn công. Dưới đây là các dạng thức phần mềm độc hại phổ biến: 
* Virus: là một chương trình tạo ra các bản sao của chính nó và insert hoặc copy vào các chương trình của máy tính, các file dữ liệu hay các vùng boot của ổ cứng. Sau khi sao chép thành công, virus gây ra hoạt động có hại trên các máy chủ bị nhiễm như ăn cắp dung lượng ổ cứng hoặc chiếm dụng CPU.
* Worm: là một dạng phần mềm độc hại mà để lại phiên bản copy của chính nó vào bộ nhớ của từng máy tính mà nó lây nhiễm. 
* Trojan: là một loại phần mềm độc hại không tự sao chép có chứa mã độc, khi thực thi dẫn đến dữ liệu bị mất hoặc bị đánh cắp, có thể gây hại cho hệ thống.
* Adware: được biết đến như là phần mềm quảng cáo, thường đính kèm với những mẩu quảng cáo nhỏ, chúng thường được phân phát dưới hình thức phần mềm miễn phí hay phiên bản dùng thử. Và chỉ khi bạn trả tiền cho sản phẩm dùng thử đó, các quảng cáo sẽ thu nhỏ hoặc biến mất tùy theo chính sách của hãng phần mềm đó. 
* Spyware: là phần mềm gián điệp chuyên thu thập các thông tin từ các máy chủ qua mạng Internet mà không có sự nhận biết và cho phép của chủ máy. Spyware khai thác lỗ hổng người dùng và ứng dụng thường được đính kèm với mục tải xuống phần mềm trực tuyến miễn phí hoặc liên kết khi người dùng click vào. 
* Rootkit: là phần mềm được tin tặc sử dụng để có quyền truy cập bằng quyền admin vào máy tính / mạng được cài đặt thông qua mật khẩu bị đánh cắp hoặc bằng cách khai thác lỗ hổng hệ thống mà nạn nhân không nhận thức được.
## Malware preventive measures 
Các biện pháp sau đây có thể được thực hiện để tránh sự hiện diện của phần mềm độc hại trong hệ thống.
* Đảm bảo hệ thống và các ứng dụng được cập nhật ở phiên bản hoặc bản vá mới nhất.
* Không bao giờ mở các email lạ, đặc biệt là các file đính kèm.
* Khi download file từ internet, luôn luôn kiểm tra trước khi install. Đừng chỉ đơn giản là click OK để bỏ qua các pop-up và kiểm tra cả thông tin nhà phát hành. 
* Cài đặt các phần mềm diệt virus.
* Đảm bảo việc scan và update các phần mềm diệt virus thường xuyên.
* Cài đặt tường lửa 
* Luôn luôn enable và sử dụng các tính năng bảo mật được cung cấp bởi trình duyệt và các ứng dụng. 

Dưới đây là các phần mềm anti-malware phổ biến: 
* Microsoft Security Essentials
* Microsoft Windows Defender
* AVG Internet Security
* Spybot - Search & Destroy
* Avast! Home Edition for personal use
* Panda Internet Security
* MacScan for Mac OS and Mac OS X

References: https://www.tutorialspoint.com/security_testing/security_testing_process.htm