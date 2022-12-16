# CDN caching là gì?
Caching là một phần rất quan trọng của CDN. Nó là một trong những lợi ích lớn nhất từ việc sử dụng CDN. Nó hoạt động tương tự như cách browser caching lưu trữ các tệp trên ổ cứng , nơi chúng có thể được truy cập nhanh hơn, chúng lưu các tệp của bạn trên các CDN server trên toàn thế giới, để đảm bảo gửi nhanh cho khách hàng truy cập vào trang web. Khi trình duyệt  yêu cầu một tệp từ CDN, nó sẽ lấy nó từ phiên bản được lưu trong bộ nhớ cache trên CDN server. Nếu tìm thấy tệp, nó sẽ được gửi ngay lập tức, nếu không CDN sẽ kéo tệp ra khỏi máy chủ gốc, lưu vào bộ đệm và sau đó gửi nó.

# Lợi ích của sử dụng CDN caching.
Lơi ích của caching có thể chia làm ba phần chính như

1.** Giảm chi phí băng thông**: Việc phân phối nội dung từ CDN caching proxies sẽ loại bỏ gánh nặng từ server gốc, giảm đáng kể chi phí băng thông liên quan đến việc phục vụ nội dung cho nhiều khách hàng truy cập. Đối với hầu hết các trang web, chi phí băng thông có thể giảm từ 40% đến 80%, tùy thuộc vào tỷ lệ phần trăm của nội dung có thể lưu trong bộ nhớ cache

2. **Tăng tính trải nghiệm của người dùng**: Một mạng lưới phân phối toàn thế giới gồm các Cache proxy server, các CDN mang trang web đến gần hơn với tất cả khách hàng truy cập, bất kể họ ở đâu. Có nội dung này được phân phối từ một server cục bộ cải thiện đáng kể tốc độ truy cập và trải nghiệm người dùng.

3. **Đảm bảo phân phối nội dung đáng tin cậy**: CDN hiện nay có dung lượng lưu lượng vượt xa hầu hết các khả năng của mạng doanh nghiệp thông thường. Khi một trang web tự lưu trữ có thể dễ dàng bị phá vỡ bởi các đỉnh lưu lượng truy cập không mong muốn hoặc từ chối các cuộc tấn công dịch vụ, CDN cache server có khả năng phục hồi và bảo mật cao. Vì vậy, chúng ổn định trong các trường hợp lưu lượng truy cập cao điểm.
# CDN caching hoạt đông như thế nào?
Trước tiên khi muốn hiểu về cách hoạt động CDN caching chúng ta phải hiểu về thuật ngữ proxy trước đã. CDN về cơ bản sử dụng công nghệ proxy trên quy mô lớn. Điều này có nghĩa là một server đang hoạt động như một trung gian giữa client và the original web server. Các edge servers về cơ bản là proxy cache. Dưới đây là hình minh hoạ và ví dụ về những gì xảy ra khi client truy cập đến trang web.

![](https://images.viblo.asia/9ee5ef32-472b-4961-944d-e2e804b04bf1.png)

1. Client truy cập đến trang web và yêu cầu một tệp từ CDN.
2. CDN sau đó kiểm tra xem nó có trong bộ nhớ cache không. 
3. Nếu nội dung có sẵn trên edge server thì nó sẽ được phục vụ trực tiếp từ edge server đến client (HIT). 
4. Nếu nội dung không có trong bộ đệm hoặc hết hạn, máy chủ biên sẽ yêu cầu origin server truy xuất (MISS).

Nếu nội dung hiện diện và được phân phối từ  edge server (CDN), trong phần HTTP  header sẽ chỉ ra một X-Cache-Status: HIT. Nếu nội dung đã hết hạn hoặc không có thì điều này sẽ kích hoạt MISS. Điều này có thể dễ dàng được kiểm tra bằng lệnh curlv trên bất kỳ máy Linux / Unix nào bằng lệnh sau.

```
curl -I https://static-znews.zadn.vn/images/logo_zing_transparent.png
HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Connection: Keep-Alive
Server: Universe
Cache-Control: max-age=7776000,no-transform
Expires: Wed, 24 Apr 2019 15:43:05 GMT
Date: Thu, 24 Jan 2019 15:43:05 GMT
Last-Modified: Thu, 24 Jan 2019 15:43:05 GMT
X-Cache-Status: HIT
Age: 1396262
Content-Length: 34134
Content-Type: image/png
```

Ngoài ra, chúng ta có thể sử dụng một tool như google chorme Devtools để kiểm tra HTTP header

![](https://images.viblo.asia/d610907a-9539-4399-a1fa-9aa846a3ecb4.png)


Qua ví dụ trên bạn đã hiểu phần nào và biết cách xem HTTP header để biết  nội dung web có thể lưu trong bộ nhớ cache và thời lượng nội dung được lưu trữ trong  cache một thời gian nhất định trước khi bị tải lại..