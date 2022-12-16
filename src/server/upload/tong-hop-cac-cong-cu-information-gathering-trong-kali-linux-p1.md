![](https://images.viblo.asia/82977706-e921-4606-9541-4d11a594505a.jpg)

Nếu ví rằng công việc Pentesting như là một cuộc chiến, thì Information Gathering có lẽ là quá trình trinh sát. Nó đại diện cho  triết lý vô cùng quan trọng "Biết địch biết ta, trăm trận trăm thắng". Thành công cũng ở đây, thất bại cũng ở đây. Càng nắm vững được thông tin của mục tiêu, bạn càng tăng cơ hội chiếm quyền điều khiển mục tiêu.
Vậy trong quá trình tìm kiếm các lỗ hổng bảo mật Web, Pentester thường tìm kiếm những gì?

**1.Whois**

Tra cứu Whois có thể được sử dụng để nhận thông tin chung về domain, chẳng hạn như công ty đăng ký,
chủ sở hữu , thông tin liên hệ của họ và máy chủ DNS được sử dụng. Bạn có thể đưa ra truy vấn Whois cho một
domain nhất định bằng cách sử dụng lệnh sau:

```
whois domain
```

Hãy thử truy vấn Whois trên miền 'viblo.asia':

![](https://images.viblo.asia/f09ffc08-a6f0-43d2-a3af-ede4930c1bf3.png)

Như chúng ta thấy, nó trả về rất nhiều thông tin bao gồm cả ngày tạo , tên
máy chủ và thông tin liên hệ của người đăng ký.

**2.Nslookup**

Nslookup là viết tắt của Name Server lookup được tạo ra nhằm truy vấn domain - lấy bản ghi DNS. 
Theo mặc định, ta sử dụng nslookup phân dải tên miền sang địa chỉ IP bằng cách sử dụng lệnh sau:

```
nslookup [domain]
```

![](https://images.viblo.asia/079bee95-7961-4d60-8c96-e8efe4607b64.png)

**3.Host**

Host là một công cụ đơn giản khác để thực hiện việc tra cứu DNS. Nó có thể được sử dụng để chuyển đổi domain thành địa chỉ IP và ngược lại. 

Khi gõ lệnh ‘host’ trong terminal, chúng ta sẽ nhận được danh sách các tùy chọn hỗ trợ sử dụng ứng dụng:

![](https://images.viblo.asia/0c3e5b5a-4fe4-46c2-a280-8f1c73e67bf0.png)

Lệnh sau thực hiện tra cứu DNS trên tên miền ‘viblo.asia’. 

![](https://images.viblo.asia/b2d99bde-49ac-406b-b1b9-55a8d8527d13.png)

**4.Dig**

Dig, viết tắt của Domain Information Groper, là một công cụ khác để truy vấn máy chủ DNS.  Đây là công cụ đặc biệt quan trọng với mình trong quá trình tìm kiếm các lỗ hổng liên qua đến[ subdomain takevover ](https://viblo.asia/p/toi-da-danh-cap-ten-mien-cua-mit-nhu-the-nao-924lJ24blPM)

Hãy xem qua một số lệnh sau để hiểu rõ hơn về cách sử dụng dig.

Để truy vấn một loại bản ghi cụ thể, bạn có thể sử dụng tùy chọn -t. 

```
dig -t mx viblo.asia
```

Hoặc bạn có thể yêu cầu tất cả các bản ghi bằng cách chỉ định ‘any’ làm tham số:

```
dig -t any viblo.asia
```

![](https://images.viblo.asia/5447864d-a1e5-4708-98e2-7be46160ed8a.png)

**5.Fierce**

Fierce là một công cụ viết bằng Perl được sử dụng để kiểm tra IP và máy chủ DNS của mạng mục tiêu. Đây là công cụ bản thân mình ít khi sử dụng nhưng luôn được đánh giá cao trên các diễn đàn về an toàn thông tin.

Fierce giúp xác định các mục tiêu có khả năng bị khai thác cả trong và ngoài mạng công ty với cách sử dụng vô cùng đơn giản:

```bash
fierce -dns google.com
```

**6.DNSenum**

DNSenum là một công cụ viết bằng ngôn ngữ Perl có thể được sử dụng để liệt kê thông tin DNS của một domain và khám phá các địa chỉ IP liên quan đến máy chủ. Công cụ này đồng thời cố gắng tìm kiết tất cả các sub-domain trên máy chủ mục tiêu.

Sử dụng lệnh sau để sử dụng DNSenum trên một mục tiêu cụ thể:
```
dnsenum [domain]
```
Ảnh chụp màn hình sau cho thấy kết quả tìm kiếm của DNSenum với  viblo.asia:

![](https://images.viblo.asia/a2abd97c-7115-42d0-aec4-7fbb817c8744.png)

Ngoài ra, trong trường hợp không muốn cài đặt công cụ này, Chúng ta có thể sử dụng phiên bản online tại [đây](https://dnsdumpster.com/) .

**7.Sublist3r**

Sublist3r là một công cụ được viết bằng ngôn ngữ Python để liệt kê các sub-domain của tên miền chỉ định. Sublist3r sử dụng dữ liệu từ các nguồn có sẵn trên internet như Google Bing Yahoo.  
> Trong quá trình tìm kiếm Bug Bounty trên các nền tảng lớn như HackerOne hay Bugcrowd. Đôi khi các bạn sẽ gặp những target khách hàng với scope rất rộng như *domain.com. Việc sử dụng Sublist3r một cách hiệu quả, sẽ giúp bạn liệt kê tất cả những mục tiêu cần phải đánh giá. Càng nhiều mục tiêu cơ hội bạn nhận thưởng càng lớn.
> 
Để  xem hướng dẫn sử dụng Sublist3, ta sử dụng câu lệnh sau:

```
sublist3r -h
```
![](https://images.viblo.asia/4701e6ed-f8a7-4963-8e46-8d9b8a55a444.png)

Sử dụng sublist3r để tìm kiếm các subdomain của google.com 

```
sublist3r -d google.com -b -t 100
```
![](https://images.viblo.asia/4994f334-b26d-4c5d-90a7-bfc94bd71a20.png)



Như bạn có thể thấy từ ảnh chụp màn hình, Sublist3r đã tìm kiếm Baidu, Yahoo, Google, Bing, Ask, Netcraft và
các công cụ tìm kiếm khác cho google.com và phát hiện ra tổng cộng 403 subdomain được liệt kê một cách cụ thể rõ ràng.

**Tổng Kết** 

Các công cụ bên trên có lẽ quá nhỏ bé và dễ dàng sử dụng nên đôi khi bị xem thường. Nhưng tiếc rằng những thông tin chúng đem lại lại vô cùng quý giá để thực hiện các bước khai thác tiếp theo. Có những P1-5000$ ,10.000$ bay "sượt qua đầu" chỉ vì chúng ta quên mất - có một công cụ nhỏ bé đang nằm sẵn trong Terminal để hỗ trợ nhưng đã bị lãng quên.