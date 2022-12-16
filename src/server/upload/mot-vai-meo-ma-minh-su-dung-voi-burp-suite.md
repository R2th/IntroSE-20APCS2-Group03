# Tự sự
Chuyện là có mấy thằng em hỏi mình về cách sử dụng Burp Suite như thế nào, rồi có tips and tricks nào hay hay không cho chúng nó học, tiện đây mình cũng chia sẻ kinh nghiệm của một người sử dụng BurpSuite cũng được một khoảng thời gian rồi. Hi vọng những chia sẻ này sẽ giúp ích được cho bạn đọc :v:
# Burp Suite là gì?
Đối với những bạn làm pentester hay một số bạn QA (và cả những người anh đang làm AI ở công ty mình nữa :kissing_heart:) khéo cũng đã quá quen với Burp Suite rồi, mình chỉ chia sẻ lại một chút để cho những bạn chưa biết đến phần mềm cực kỳ nổi tiếng được viết bằng Java này hiểu thêm về nó nhé.  
Burp Suite được khai sinh bởi **Dafydd Stuttard** (PortSwigger founder and CEO), và hiện tại Burp Suite vẫn đang được liên tục phát triển bởi PortSwigger. Trải qua rất nhiều phiên bản, BurpSuite đã đỡ "xấu" hơn và xịn hơn ngày xưa và có một diện mạo như bây giờ.  

![](https://images.viblo.asia/923c4d5a-1d67-4836-bdee-3b235454b60c.png)<div align="center">
Mô hình hoạt động BurpSuite
</div>

Hiện tại Burp Suite có 3 phiên bản, bao gồm bản miễn phí (Burp Suite Community Edition), bản mất phí (Burp Suite Professional) và bản dành cho doanh nghiệp (Burp Suite Enterprise Edition). Về cách cài đặt thì bạn đọc có thể đọc bài [này](https://viblo.asia/p/burp-suite-tro-thu-dac-luc-cho-tester-va-pentester-trong-kiem-tra-ung-dung-web-E375z4GWZGW) để cài đặt theo nhé.
# Một số mẹo với Burp Suite (tips and tricks)
## Phím tắt
Việc sử dụng phím tắt với Burp Suite sẽ khiến bạn thao tác nhanh hơn, chuẩn hơn và "ngầu" hơn.  
1 số phím tắt mình hay sử dụng như là:

| Key | Action |
| -------- | -------- |
| Ctrl + I     | Send request to Intruder     |
| Ctrl + R     | Send request to Repeater     |
| Ctrl + S     | Search     |
| Ctrl + A     | Select All|
| Ctrl + Z     | Undo     |
| Ctrl + Y     | Redo     |
| Ctrl + B     | Base64 selection     |
| Ctrl + Shift + B     | Decode Base64 selection     |
| Ctrl + U     | URL-Encode key characters selection|
| Ctrl + Shift + U      | URL-Decode selection|
| Ctrl + I     | Send request to Intruder     |
| Ctrl + F     |Forward Request (tab Proxy)     |
| Ctrl + T     |Toggle Proxy Intercept On or Off (tab Proxy)|

## Copy URL
Mình khá thích tính năng này, nó copy nhanh cho mình cái URL trên khu vực mình đang làm việc, rất tiện cho việc viết báo cáo  
![](https://images.viblo.asia/292d8a99-37a3-4b65-84d1-609cc804e1b7.png)


Bạn có thể chuột phải vào request ở bất cứ đâu, rồi chọn Copy URL
Và kết quả nó sẽ cho ra là 
```
https://viblo.asia/posts/GrLZDGowKk0/
```
## Copy as cURL command
Tương tự như với việc sử dụng tính năng Copy URL thì chức năng này cũng tiện như vậy, cách sử dụng thì giống với Copy URL thôi nhưng nó sẽ chuyển thành dạng cURL command, tiện với việc test payload của mình ở chỗ khác
```bash
curl -i -s -k -X $'GET' \
    -H $'Host: viblo.asia' -H $'Connection: close' -H $'Content-Type: application/json' -H $'api-service-region-id: 1' -H $'Accept: application/json, text/plain, */*' -H $'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62' -H $'Accept-Encoding: gzip, deflate' \
    $'https://viblo.asia/posts/GrLZDGowKk0/'
```
## Logger
![](https://images.viblo.asia/f80c8401-50d5-4fb4-834b-b469131e3e68.png)


Tính năng này thì mới được đưa vào gần đây thôi, ngày xưa mình dùng extension Flow để đọc log, nhưng PortSwigger đã đưa tính năng này vào global luôn. Nó sẽ ghi lại toàn bộ các request được bắt từ Proxy, hay những request mình sử bên repeater, hay những request chạy bên intruder. Nói chung là log lại hết, rất tiện cho việc search lại các param hay kết quả mình cần phải lọc ra hay đọc lại.

## Match and Replace
![](https://images.viblo.asia/ed4f0ae9-323d-4273-9baf-b0d36166b143.png)

Nếu các bạn hay gặp cái mã code 304 này, thì tức là nội dung nó đã được cache trong trình duyệt, mà bạn lại muốn xem nội dung của response này thì phải xoá cái dòng `If-None-Match` kia đi rồi gửi request lại thì sẽ đọc được response. Tuy nhiên ở trong BurpSuite có chế độ `Match and Replace`, mình sẽ cài đặt cho lúc nào trong request cũng xoá cái dòng `If-None-Match` đi nhé.

Truy cập vào Proxy -> Options -> Match and Replace
![](https://images.viblo.asia/e92b93fe-9ed9-410d-8a03-7fbc014d3091.png)

Cài đặt như trên hình rồi bấm OK  
Nhớ chọn tick vào Enable lên thì mới hoạt động được nha ^^

Bạn có thể tạo nên vài kịch bản thú vị với chức năng này đấy ^^

## TLS Pass Through
Đối với những pentester Android hay chạy proxy qua Firefox thì rất hay gặp mấy cái request mình không mong muốn Burp capture lại (vừa nặng bộ nhớ, vừa thừa thông tin và rối mắt). Bạn đọc cài đặt như trên hình là sẽ không bao giờ nhìn thấy mấy cái request lằng nhằng đấy ở trên BurpSuite nữa đâu :p 

![](https://images.viblo.asia/366bd0ae-d04e-48d5-9b08-b49acf403666.png)


# Kết
Trên đây là một số tips and tricks mà mình đang sử dụng với Burp Suite. Phần sau mình sẽ chia sẻ thêm về các extension mà mình đang dùng với Burp Suite. Hi vọng bạn đọc sẽ đón nhận :D.