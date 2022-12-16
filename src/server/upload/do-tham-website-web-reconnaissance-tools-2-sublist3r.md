## 0. Web reconnaissance
Reconnaissance ( hay Information Gathering hay Enumeration ) là bước đầu tiên của penetration testing ( pentest ), trong đó mục tiêu là tìm thấy càng nhiều thông tin càng tốt về Website được pentest.

Trong bước Recon này, để hiệu quả, chính xác, tiết kiệm thời gian và công sức, việc sử dụng các tools có sẵn hoặc tự viết tools là bắt buộc.
Hôm nay mình sẽ giới thiệu đến các bạn 1 tool rất hữu ích khi được test các domain dạng *.domain.(com,net,org...).

![](https://images.viblo.asia/1cb3162e-706c-455d-949e-abe844679a68.jpg)


Rất nhiều website hiện nay có các subdomain để đảm nhiệm các nhiệm vụ / chức năng song song với main site. Thậm chí một subdomain có thể đang chạy hẳn một dịch vụ siêu to khổng lồ không thua kém gì main page. Ví dụ như Viblo:

* Main page: Viblo.asia
* Subdomain: ctf.viblo.asia, cv.viblo.asia, code.viblo.asia, 5years.viblo.asia...

Thực tế nếu dùng sublist3r "gõ gõ" thì 30s sau sẽ ra tổng cộng tới 46 "unique" Subdomain, phía trên chỉ là tiêu biểu mà thôi.

Việc recon ra subdomain là một phần cực kỳ quan trọng, vì rất có thể các lỗ hổng sẽ tồn tại trên các subdomain này, do main page thường đã được "chăm chút" khá cẩn thận.

Vì vậy khi scope rộng dạng *.domain.(com,net,org...) thì việc đầu tiên nên nghĩ tới đó là tìm được càng nhiều subdomains càng tốt!

## 1. Giới thiệu và cài đặt

Ý tưởng của Sublist3r là sử dụng OSINT - một kỹ thuật không mới không cũ dùng để recon tất cả các thông tin mở có thể thu thập, ở đây là dành cho việc tìm Subdomains. Khi tìm kiếm subdomains, nó không build-in một chức năng như ở trường hợp brute-force subdomain của [Gobuster](https://viblo.asia/p/do-tham-website-web-reconnaissance-tools-1-gobuster-ORNZq4DMK0n), mà nó sử dụng các search engines và các API của các bên thứ 3, tìm kiếm và tổng hợp lại các subdomain rồi trả kết quả cho người dùng. **subbrute**, một công cụ đã được phát triển từ lâu cũng được tích hợp cùng Sublist3r để thực hiện  brute-force subdomains. Tuy nhiên xét về tính hiệu quả và tính "mới", bài viết này sẽ không đề cập tới phần brute-force. Nếu muốn tham khảo về brute-force subdomains, một lựa chọn tốt không kém là link về **Gobuster** ngay phía trên.

![](https://images.viblo.asia/600720a1-69a6-4beb-81ed-860c161557eb.png)


Sublist3r được viết bằng Python và có thể tương thích với cả Python2 và Python3, ở bài viết này mình sẽ dùng Python3. Github của công cụ tại [đây](https://github.com/aboul3la/Sublist3r).

Để cài đặt trên Linux, rất đơn giản!

Clone công cụ về máy từ github (yêu cầu đã cài git): 

`git clone https://github.com/aboul3la/Sublist3r.git`

![](https://images.viblo.asia/361fa5a7-86ae-4377-9c3c-9a96b96491ba.png)

Cài các Dependencies - các thành phần phụ thuộc (yêu cầu đã cài python3-pip):

`sudo pip3 install -r requirements.txt`

![](https://images.viblo.asia/d77ce784-d715-4237-8c8e-703544372596.png)

Như vậy là đã có thể sử dụng Sublist3r!

## 2. Sử dụng

Về sử dụng thì...rất dễ, đây là các option khi sử dụng công cụ:

| Short Form| Long Form | Description |
| -------- | -------- | -------- |
| -d	|--domain	|Chỉ định domain cần tìm subdomains    |
|-b	|--bruteforce	|Sử dụng module brute-force (công cụ subbrute)|
|-p	|--ports	|Scan các subdomains được tìm thấy với (các) port chỉ định|
|-v	|--verbose	|Xem tools nó đang làm gì in real time|
|-t	|--threads	|Số threads sử dụng cho subbrute để brute-force|
|-e	|--engines	|Chỉ định danh sách các search engines sử dụng (được phân tách bằng dấu phẩy)|
|-o	|--output	|Lưu kết quả vào file text|
|-h	|--help	|Hiện trợ giúp|

Ví dụ như để scan tên miền Viblo.asia bên trên:

`python3 sublist3r.py -d viblo.asia`

![](https://images.viblo.asia/1d2a755a-16b1-42f7-ba34-cc30550f26cb.png)


Vậy là có tới 46 subdomains, tuy nhiên ở những trang lớn hơn, câu chuyện sẽ là có rất nhiều kết quả **false positive**, do các API và các search egines có thể có kết quả về các subdomains đã inactive nhưng vẫn hiện ra => Sublist3r vẫn cho vào kết quả cuối cùng. Ta sử dụng thêm một option đơn giản có sẵn nữa của Sublist3r, đó là **-p**.

Ví dụ không sử dụng -p, ta ra 122 kết quả (SONY có program tìm bugs công khai nên mình lấy làm ví dụ):

`python3 sublist3r.py -d sony.com.vn`

![](https://images.viblo.asia/fe4abf43-da1a-45d5-89fe-0588e9c6b661.png)

Và chúng ta thêm -p vào:

`python3 sublist3r.py -d sony.com.vn -p 80,443`

Số lượng subdomains chạy Web đã giảm xuống rất nhiều, chỉ còn khoảng 20 domain:

![](https://images.viblo.asia/fe497b69-623e-46ee-a3bb-dbc0aaec5c2e.png)

Các bạn có thể thêm option -o ketqua.txt để lưu trữ và tiện sử dụng sau này.

## 3. Kết luận

Chức năng "ngon" nhất của Sublist3r chính là việc áp dụng OSINT và lấy từ nhiều nguồn cũng như validate kết quả với option **-p**. Tuy nhiên nó cũng có điểm yếu đó là nếu subdomain mới alive chưa lâu (1-2 ngày) thì tools tỏ ra thiếu hiệu quả khi không thể scan tới do dữ liệu chưa được update kịp thời lên các bên phụ thuộc. Tuy nhiên độ chính xác và tốc độ scan là điều không cần bàn cãi khi sử dụng Sublist3r.

Hi vọng "kho tools" của các bạn có thêm một công cụ thân thuộc nữa !

**TOP DEV - Hãy ngưng ăn cắp**