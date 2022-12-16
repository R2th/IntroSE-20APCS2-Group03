# Root case
Dạo gần đây mình có dính 1 case liên quan đến application trên Windows, việc check connect network rất quan trọng trong pentest, nó sẽ giúp các bạn có thể biết được application đó đang gửi những gì, kết nối tới đâu trên internet. Tuy nhiên dở một cái là application này **KHÔNG HỖ TRỢ KẾT NỐI PROXY** để capture request qua BurpSuite. Vậy ở đây chúng ta sẽ có nhiều cách để pentest case này:
1. Cài đặt một số phần mềm có thể capture request như Wireshark, HTTP Debugger, Charles, ... 
2. Cài một con máy ảo lên, cài application đó vào máy ảo rồi mở proxy toàn hệ thống kết nối qua BurpSuite
3. Sử dụng một chương trình có thể control network của process đó rồi hướng tất cả connection đi qua 1 proxy (ở đây là BurpSuite)
4. .... (mình chưa nghĩ ra, có cách nào hay hơn các bạn có thể comment bên dưới bài để mình học hỏi thêm nha ;)

Ở đây các bạn sử dụng cách nào :D, mình đã sử dụng qua cách 1, tuy nhiên nó gặp vấn đề là mình không quen sử dụng, không có nhiều tính năng như BurpSuite nên mình không thích. Không có repeater để sửa request các thứ, muốn sửa request phải copy raw request rồi paste sang BurpSuite để pentest =)).

![image.png](https://images.viblo.asia/0aa53f7a-fff5-4a03-8c3b-5a3adee1b5a2.png)
<div align="center">
*Giao diện hiển thị capture request trên HTTP Debugger*
</div>

Cách 2 mình thấy cũng ổn, tuy nhiên dở một cái là nó khá tốn phần cứng (đối với những ai máy yếu thì cả là một cực hình), việc tạo kết nối proxy full OS như thế sẽ có nhiều connect rác, mình không sử dụng đến, có thể giải quyết bằng việc add scope với BurpSuite nhưng mà vẫn nặng => vẫn là không thích.

Cách 3 mình thấy ok nhất, control luôn cái network của process đó rồi cho đi qua proxy burp, vừa nhẹ nhàng vừa tình cảm. 

![image.png](https://images.viblo.asia/b8646c48-1b06-4138-ab19-17ea51d8798d.png)

Mình có nhắn tin lên box hỏi anh em xem có cái nào xài luôn nào không, sau một thời gian tìm kiếm thì tìm được ra 1 cái opensource ở đây

https://github.com/VahidN/Process-Proxifier

![image.png](https://images.viblo.asia/4ad215bd-4e9a-40cc-a50f-2276c14b8716.png)

Ngon vãi, hiển thị cả process nào mình muốn thông qua proxy, hỗ trợ cả kết nối Socks5 và HTTP. Các bạn có thể xài thử xem cái này nhé, khá ok đó :D

Tuy nhiên, sếp mình có gợi ý cho 1 program xịn hơn vì phải trả phí =))

![image.png](https://images.viblo.asia/6c085e2a-18db-4a2d-bd40-46f8d70b3550.png)

Thường thì mấy thằng bắt trả phí thường ngon 

![image.png](https://images.viblo.asia/2888a11f-b4b8-49d1-a0cd-aa6cd7ab0b7b.png)

# Proxifier
Thôi thì bài viết này tập trung vào thằng này thôi, nên mình chỉ nói với thằng này thôi nhé =)) (không nhận tiền quảng cáo trá hình gì cả, chỉ thấy hay nên share cho ae thôi)

Home page: https://www.proxifier.com/  
Download: https://www.proxifier.com/download/ProxifierSetup.exe

Các bạn download rồi về cài đặt như bình thường, khởi động program lên thì add proxy server vào thôi
(Profile -> Proxy Servers)

![image.png](https://images.viblo.asia/3740a574-9f3a-42ff-8406-caf893c3a5b7.png)

Ở đây mình sử dụng BurpSuite làm proxy, hỗ trợ cả Socks4, Socks5 và HTTP, mình dùng HTTP cho thân thuộc

![image.png](https://images.viblo.asia/0e570c2f-8446-414a-8590-820943e7be8b.png)

![image.png](https://images.viblo.asia/c4635a56-c8b0-4e17-871f-461b59080271.png)

Cài đặt xong thì có nút **Check** để các bạn có thể kiểm tra xem proxy server hoạt động ok chưa, như hình trên là đã okla rồi nha.

Tiếp theo đến cài đặt rules để cho Proxifier có thể giúp mình kết nối các process chỉ định tới proxy server. (Profile -> Proxification Rules)

![image.png](https://images.viblo.asia/5a90bbc4-2541-4ca4-8c5c-cb7a59b55f24.png)

Ở phần này, các bạn nhớ để rule Default có action là Direct nhé, để tránh làm nặng proxy server. Khi muốn add 1 program để cho nó kết nối thông qua proxy server thì add rule như hình bên dưới

![image.png](https://images.viblo.asia/a922e95c-bd34-48fe-b96d-aeb38fb907da.png)

Điền tên rule, applications (phần này nếu các bạn biết app chạy với file gì thì gõ nguyên tên file vào, hoặc có thể sử dụng nhiều file, ...) ... action chọn server proxy muốn kết nối rồi bấm OK

Vậy xong rồi, toàn bộ connection trên process của program đều được thông qua BurpSuite hết, ngon phết :D

![Untitled.png](https://images.viblo.asia/a44ac748-4a39-414e-be26-a0410e8e661b.png)

Các bạn cũng có thể save lại profile này để dùng về sau, có thể sử dụng nhiều profile khác nhau được 

# Kết
Nói chung là với cái case của mình thì xài Proxifier với Process-Proxifier đều ngon như nhau, các bạn thấy dùng cái nào được thì cứ xài thôi, see yaa