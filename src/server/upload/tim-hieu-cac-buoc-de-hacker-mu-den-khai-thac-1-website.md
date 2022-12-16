# Giới thiệu
Hôm nay chúng ta sẽ đến với 1 chủ đề khá lạ, sau khi mình tra 1 hồi trên mạng thì chưa thấy có bài viết nào cụ thể. Nên hôm nay mình sẽ làm 1 bài viết để các bạn có thể biết được các hacker mũ đen khai thác 1 website như thế nào. Bài viết này không đi vào 1 lỗi cụ thể hay bất kỳ 1 kỹ thuật nào nên những người không phải dân chuyên ngành vẫn có thể đọc được.

<p> </p>

## Bước 1. Ẩn danh
Không giống như những bạn trẻ tự gọi mình là "hacker facebook" với những dòng status đăng bán giá: tăng like, tằng view hay đánh sập nick của ai đó. Những hacker thực thụ luôn đảm bảo thông tin và hành động của mình được diễn ra bí mật nhất có thể.
![](https://images.viblo.asia/19d2326e-c69b-481b-8cfc-60ed295d4f41.jpg)


Nên việc làm đầu tiên của các hacker trước khi tấn công 1 trang web là ẩn danh bản thân. Trước khi tấn công, các hacker sẽ thay đổi địa chỉ MAC của họ và chạy máy tấn công thông qua ít nhất một VPN để giúp che giấu danh tính. Họ sẽ không thực hiện một cuộc tấn công trực tiếp hoặc bất kỳ kỹ thuật quét nào mà không ẩn danh trước.

<p> </p>

## Bước 2.Lựa chọn, phân tích web

Bây giờ hacker sẽ bắt đầu tìm kiếm mục tiêu. Các trang web được hacker hướng tới thường là các trang web nổi tiếng, có cơ sở dữ liệu lớn tuy nhiên lại không được bảo vệ khi xây dựng hệ thống. 

Trước hết hacker sẽ thực hiện phân tích và cố gắng thu thập thông tin về mục tiêu. Nó có thể bao gồm việc xác định mục tiêu, tìm ra phạm vi địa chỉ IP, các cổng đang mở. Việc tìm kiếm địa chỉ IP và các cổng đang mở có thể thực hiện bằng công cụ `Nmap`. Tiếp đến hacker sẽ tìm hiểu về các domain thuộc trang web đó để thực hiện cho bước sau, các subdomain scanner tools có thẻ liệt kê là : `subfinder, AMASS, SubBrute, DNSRecon, vv`
Ví dụ về việc sử dụng `nmap` để quét các cổng dịch vụ:

![](https://images.viblo.asia/41e6e63e-a376-44cd-aa0b-04d1370fb275.png)

<p> </p>

## Bước 3.Kiểm tra lỗ hổng:

Đến bước này, hacker đã nắm được server 1 cách sơ bộ. Bây giờ hacker sẽ bắt đầu kiểm tra xem trang web có thể dính những lỗ hổng gì. Top 10 lỗ hổng mà hacker hay khai thác có thể được liệu kê theo danh sách lỗ hổng của oswap năm 2020 như sau: 

- Injection
- Broken authentication
- Sensitive data exposure
- XML external entities (XXE)
- Broken access control
- Security misconfigurations
- Cross-site scripting (XSS)
- Insecure deserialization
- Using components with known vulnerabilities
- Insufficient logging and monitoring
        
Việc tìm kiếm có thể được thực hiện bằng các tool như `nessus, acunetix, vv.`

Ví dụ về phân tích lỗ hổng qua nessus:

![](https://images.viblo.asia/ab11ebc5-02da-41d7-93cb-d8e1b812f7f6.png)

Tuy nhiên, các hacker giỏi thường tìm kiếm lỗ hổng thủ công sau khi quét tool để có thể thực hiện được những kiểm tra đòi hỏi sự phức tạp cao hơn.

<p> </p>

## Bước 4.khai thác lấy dữ liệu

![](https://images.viblo.asia/e03bd4c9-94af-465d-98e6-72ea60b3f655.png)

Sau khi tìm được các lỗi, các hacker sẽ thực hiện đi sâu vào các lỗi để lấy dữ liệu ra. Với những website thông thường thì việc tìm ra 1 lỗ hổng, hacker có thể lấy được những dữ liệu quan trọng. Tuy nhiên với những website được bảo mật tốt hơn, hacker thường khai thác bằng cách kết hợp nhiều lỗ hổng với nhau để có thể lấy dữ liệu. Việc lấy được dữ liệu, đặc biệt là dữ liệu của người dùng thường mang đến những thiệt hại vô cùng lớn cho các doanh nghiệp.

<p> </p>

## Bước 5. Chiếm quyền điều khiển

![](https://images.viblo.asia/b0813c0e-e124-4517-a523-923c403ccdd5.png)

Đây luôn là điều mà các hacker hướng tới khi khai thác 1 trang web: chiếm quyền điều khiển. Sau khi thực hiện khai thác lấy được các dữ liệu, các hacker có thể dựa vào những dữ liệu đó để nâng cấp cuộc tấn công lên 1 tầng cao mới. Việc chiếm quyền điều khiển có thể được thực hiện thông qua việc chiếm tài khoản của admin hay chạy các shell mã độc, từ đó lấy được quyền điều khiển hệ thống. Các shell mã độc thường được các hacker giỏi tự tạo ra để tối đa hóa được sự tấn công. Bên cạnh đó có rất nhiều shell mã độc được các hacker chia sẻ công khai trên mạng và có thể lấy 1 cách dễ dàng như: `r57, c99, mini shell, pony shell, vv`

Ví dụ về giao diện pony shell:
![](https://images.viblo.asia/7f21b256-715e-48b3-8e85-1c1f6d463131.png)

<p> </p>

## Bước 6. Xóa dấu vết

Hệ thống luôn ghi nhận những hành động của hacker. Sau khi có được quyền truy cập và các đặc quyền đã được nâng cấp, tin tặc sẽ tìm cách che giấu các dấu vết của họ. Điều này bao gồm xóa các email Đã gửi, xóa nhật ký máy chủ, tệp tạm thời, v.v. Tin tặc cũng sẽ tìm kiếm các dấu hiệu về việc nhà cung cấp email cảnh báo cho người dùng hoặc các thông tin đăng nhập trái phép có thể có trong tài khoản của họ. 
![](https://images.viblo.asia/7f18f83a-7663-4e60-b1a2-d5a7696cc67e.jpg)


<p></p>

## Bước 7. Tạo Backdoor

Và cuối cùng , hacker sẽ thường để lại 1 cái backdoor - 1 cổng cho phép hacker có thể dễ dàng xâm nhập vào những lần sau. Việc tạo được backdoor như thế nào còn phụ thuộc vào quyền mà hacker lấy được tại bước 5. Các tool backdoor có thể kể tới như: `Webshell, Pupy, Thefatrat, ShadowPad, vv`

![](https://images.viblo.asia/49dcfac0-8615-47d0-8d44-89741c9277c7.png)
<p> </p>

# Kết luận
Vậy là xong 7 bước mà các hacker thường tuân thủ khi hack 1 trang web. Các bước trên có thể thay đổi tùy vào tình huống cũng như hacker có thể khai thác bao xa. Nếu bạn là 1 lập trình viên hoặc là 1 chuyên viên bảo mật cho trang web của bạn, bạn có thể dựa vào 7 bước trên để đưa ra các phương án bảo vệ trang web phù hợp, từ đó có thể giảm được tối đã khả năng trang web bị khai thác trái phép.