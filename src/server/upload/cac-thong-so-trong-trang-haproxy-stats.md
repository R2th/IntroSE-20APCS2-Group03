Bài viết trước đã giới thiệu về triển khai và cấu hình một hệ thống cân bằng tải sử dụng HAproxy làm proxy server. Để theo dõi trạng thái của các server trong hệ thống, HAproxy cung cấp trang HAproxy stats để hiển thị các chỉ số biểu hiện tình trạng của từng server một cách chi tiết theo thời gian thực. Bài viết này sẽ giải thích các chỉ số đó để bạn có thể hiểu được ý nghĩa cụ thể của chúng và sử dụng những thông tin này để thay đổi cấu hình hệ thống cho phù hợp.

### Cấu hình trang HAproxy stats trong haproxy.cfg
### 
frontend stats

```
bind *:8404
stats enable
stats uri /stats
stats refresh 10s
stats admin if LOCALHOST
```

bind:  địa chỉ và cổng mà bạn sẽ sử dụng để truy cập trang stats

stats uri: đường dẫn của URL

stats refresh: tần suất trang stats tự động làm mới.

stats admin : hạn chế truy cập trang stats: chỉ tài khoản admin có thể truy cập. có thể thêm `stats auth <username:password>` để thực thi authentication basic
![](https://images.viblo.asia/247bec0a-1968-425d-b11b-c28f73b1f7af.png)


### Frontend Statistics

 frontend là thứ mà client kết nối với. Khi các request đi vào bộ cân bằng tải — và khi phản hồi được trả lại cho client — chúng sẽ chuyển qua frontend. Vì vậy, nó có quyền truy cập vào các thời gian end-to-end, kích thước thông báo và các chỉ báo tình trạng bao gồm toàn bộ vòng đời request / response.

**Session Rate** trong ngữ cảnh của frontend, mô tả tốc độ mà client đang kết nối với HAProxy.

Cột Cur cho biết số phiên  hiện tại mà các phiên client hoặc các kết nối được thiết lập đầy đủ giữa client và server đang được tạo. Nếu bạn di chuột qua trường này, trang sẽ hiển thị các số liệu chi tiết sau:

*Current connection rate per second*: Số các client đang kết nối với HAProxy mỗi giây (chưa tạo phiên đầy đủ)

*Current session rate per secon* : Số các phiên, là các thực thể giữ trạng thái của kết nối end-to-end 
client tới HAProxy và HAProxy tới backend server), đang được tạo mỗi giây

*Current request rate per second*: Số các  HTTP request đang được nhận qua các kết nối đã thiết lập mỗi giây

Cột Max hiển thị hầu hết các phiên đã từng được sử dụng đồng thời. Nếu bạn di chuột qua trường này, trang sẽ hiển thị các số liệu chi tiết sau:

* *Max connection rate per second*: Số kết nối lớn nhất mà client đã kết nối với HAProxy mỗi giây (chưa tạo phiên đầy đủ)
* *Max session rate per second*: Số phiên lớn nhất mà client đã thiết lập, là các thực thể giữ trạng thái của kết nối end-to-end trong môi giây
* *Max request rate per second*: Số HTTP request lớn nhất đã được nhận qua các kết nối đã thiết lập trong mỗi giây

Cột Limit hiển thị số phiên tối đa mỗi giây mà giao diện người dùng sẽ chấp nhận, như được đặt bởi rate-limit sesions. Nếu vượt quá giới hạn này, các kết nối bổ sung sẽ được giữ lại trong backlog của socket (trong bộ đệm hệ thống)

**Session**  trong ngữ cảnh của một frontend, phần Session đếm số phiên hoặc kết nối đầy đủ từ client đến server, được sử dụng trên bộ cân bằng tải.
 Frontend sessions
Cột Cur hiển thị số phiên đã thiết lập hiện tại. Cột Max hiển thị hầu hết các phiên đã được thiết lập đồng thời.

Cột Limit hiển thị các phiên đồng thời nhất được phép, như được xác định bởi cài đặt maxconn trong frontend. Frontend cụ thể đó sẽ ngừng chấp nhận các kết nối mới khi đạt đến giới hạn này. Nếu maxconn không được đặt, thì Limit giống với giá trị maxconn trong phần chung của cấu hình của bạn. Nếu không được đặt, giá trị sẽ dựa trên hệ thống của bạn.

Khi bạn di chuột qua cột Total, trang sẽ hiển thị các chỉ số chi tiết sau:

* *Cum. Connections* : Số lượng kết nối tích lũy được thiết lập kể từ khi HAProxy được tải lại lần cuối.
* *Cum. Sessions:*	Số phiên tích lũy (kết nối đầu cuối) được thiết lập kể từ lần tải lại cuối cùng.
* *Cum. HTTP requests:*:  Số lượng HTTP request tích lũy kể từ lần tải lại cuối cùng.
* *HTTP 1xx responses*:	Tổng số HTTP request đã nhận được 1xx response
* *HTTP 2xx responses*:	Tổng số HTTP request đã nhận được 2xx response
* *Compressed 2xx*:	Tổng số response 2xx đã được nén, nếu tính năng nén đã được bật. Nó cũng hiển thị phần trăm yêu cầu đã được nén.
* *HTTP 3xx responses:*	Tổng số yêu cầu HTTP đã nhận được  3xx response
* *HTTP 4xx responses*:	Tổng số yêu cầu HTTP đã nhận được  4xx response
* *HTTP 5xx responses*:	Tổng số yêu cầu HTTP đã nhận được  5xx response
* *Other response*s:	Tổng số yêu cầu HTTP đã nhận được phản hồi không nằm trong các chỉ số khác.
* *Intercepted requests*:	Tổng số yêu cầu bị chặn và chuyển hướng đến trang Stats HAProxy.
* *Cache lookups* : Tổng số lần bộ nhớ cache được kiểm tra tài nguyên.
* *Cache hit*s :	Tổng số lần tài nguyên đã lưu trong bộ nhớ cache được trả lại.
* *Failed hdr rewrites* : Tổng số lần không thể thêm hoặc đặt HTTP header do không còn đủ dung lượng trong bộ đệm.

**Byte** trong fronend, phần Byte hiển thị lượng dữ liệu tích lũy được gửi và nhận giữa  HAProxy và các downstream client

Cột In hiển thị tổng số byte đã nhận và cột Out hiển thị tổng số byte đã gửi.

Phần Denied hiển thị số lượng yêu cầu và phản hồi đã bị từ chối vì lo ngại về bảo mật.

Cột Req hiển thị số lượng yêu cầu đã bị từ chối do bất kỳ lệnh cấu hình nào sau đây được đặt trong frontend hoặc phần listen:
* 	http-request deny
* 	http-request reject
* 	http-request silent-drop
* 	http-request tarpit
* 	http-response silent-drop
* 	tcp-request connection silent-drop
* 	tcp-request content reject
*   tcp-request content silent-drop

Cột Resp hiển thị số phản hồi đã bị từ chối bởi chỉ thị từ chối http-response deny đã được đặt trong frontend hoặc listen.

Trong ngữ cảnh của frontend, chỉ cột Req được sử dụng trong phần Error. Nó hiển thị số lượng yêu cầu gặp lỗi.

Trường duy nhất từ phần Server áp dụng cho frontend là trường Status.

Khi Status là OPEN, giao diện người dùng đang hoạt động bình thường và sẵn sàng nhận lưu lượng truy cập. Nếu turnoff frontend sẽ thay đổi trạng thái của nó thành STOP, bằng cách thực hiện lệnh disable frontend Runtime API. Đây là một ví dụ về cách gọi lệnh đó

`$ echo "disable frontend website" | sudo socat stdio /run/haproxy.sock`

Sử dụng lệnh enable frontend, có cùng cú pháp, để thay đổi trạng thái của frontend trở lại OPEN

### Backend Statistics
Phần backend là một nhóm load balacing server. HAProxy gửi request đến một backend và sau đó nhận được phản hồi từ một trong các server đang hoạt động. Thống kê ở đây bao gồm thông tin về tình trạng của từng server, kết nối và nhận response cũng như tỷ lệ request.

**Queue**
chỉ áp dụng cho các backend và hiển thị thời gian client chờ đợi server khả dụng. HAProxy có thể xếp hàng đợi các kết nối khi sử dụng cài đặt *maxconn* làm giảm căng thẳng trên các backend.

Cột Cur hiển thị số lượng kết nối máy khách hiện đang được xếp hàng đợi và chưa được gán cho máy chủ. Cột Max hiển thị hầu hết các kết nối đã từng được xếp hàng cùng một lúc. Cột Limit hiển thị số lượng kết nối tối đa được phép xếp hàng đợi, như được xác định bởi *maxqueue* trên mỗi server. Đặt giới hạn tối đa về số lượng kết nối có thể được xếp hàng đợi là một cách để đảm bảo rằng client không phải xếp hàng quá lâu. Có thể đặt timeout queue để đặt giới hạn thời gian cho khoảng thời gian client có thể ở trong hàng đợi trước khi HAProxy trả về phản hồi lỗi.

**Session Rate**
Trong ngữ cảnh của một backend server, một session có nghĩa giống như một connection. Các thống kê này cho thấy tốc độ mà các kết nối đang được thực hiện với một server.

Cột Cur hiển thị tốc độ hiện tại, trên giây, tại đó các kết nối đang được thiết lập với server. Cột Max hiển thị tỷ lệ cao nhất mà các kết nối đã từng được thiết lập với server nhất định.
Trong backend, phần Sessions hiển thị số lượng kết nối hiện tại đến bất kỳ server nào đang hoạt động.

Cột Cur liệt kê số lượng kết nối đang hoạt động đến một máy chủ. Cột Max hiển thị hầu hết các kết nối đã từng được thiết lập đồng thời với máy chủ nhất định. Cột Limit hiển thị số lượng kết nối tối đa được phép cho một máy chủ, như được đặt bởi tham số maxconn trên một dòng server.

Hàng backend hiển thị giá trị của fullconn cho Limit hoặc nếu không được đặt, nó sử dụng công thức sau: Tổng các giá trị Sessions Limit cho các frontend định tuyến đến backend này, chia cho 10. Vì vậy, nếu bạn có hai frontend mà mỗi frontend có giới hạn là 1000, tổng của chúng sẽ là 2000. Chia số đó cho 10 để nhận giá trị 200 cho giới hạn cho backend này.

Cột Total số hiển thị số lượng kết nối tích lũy đã sử dụng server nhất định. Khi bạn di chuột qua trường này sẽ hiển thị các chỉ số chi tiết sau:


* *Cum. sessions*: 	Tích lũy số lượng kết nối được thiết lập đến máy chủ này.
* *New connections*:	Số lần kết nối mới được thiết lập thay vì sử dụng lại kết nối hiện có.
* *Reused connections:*	Số lần kết nối hiện có được sử dụng lại.
* *Cum. HTTP responses*:	Số lượng tích lũy các  HTTP responses nhận được từ máy chủ này.
* *HTTP 1xx responses:*	Tổng số HTTP responses 1xx từ máy chủ này.
* *HTTP 2xx responses:*	Tổng số HTTP responses 2xx từ máy chủ này.
* *HTTP 3xx responses:*	Tổng HTTP responses 3xx từ máy chủ này.
* *HTTP 4xx responses:*	Tổng số HTTP responses 4xx từ máy chủ này.
* *HTTP 5xx responses:*	Tổng số HTTP responses 5xx từ máy chủ này.
* *Other responses*: Tổng số HTTP responses không nằm trong các chỉ số khác.
* *Failed hdr rewrites:*	Tổng số lần không thể thêm hoặc đặt HTTP header do không còn đủ dung lượng trong bộ đệm.
* *Queue time:*	Khoảng thời gian tính bằng mili giây mà một kết nối vẫn được xếp hàng đợi trong khi chờ một khe kết nối đến máy chủ, được tính trung bình trong 1024 kết nối thành công gần đây nhất.
* *Connect time:*	Lượng thời gian tính bằng mili giây để kết nối thành công với máy chủ, được tính trung bình trong 1024 kết nối thành công gần đây nhất.
* *Response time:*	Thời gian phản hồi của máy chủ tính bằng mili giây, được tính trung bình trong 1024 kết nối thành công gần đây nhất
* *Total time:*	Tổng thời gian phiên tính bằng mili giây, được tính trung bình trong 1024 kết nối thành công gần đây nhất.


Cột LbTot hiển thị tổng số lần serverr nhất định được chọn để phục vụ một request. Cột Last hiển thị thời gian kể từ khi nhận được kết nối cuối cùng.

Trong ngữ cảnh của backend, phần Byte hiển thị lượng dữ liệu được gửi và nhận giữa HAProxy và máy chủ ngược dòng.

Cột In hiển thị số byte được gửi đến máy chủ. Cột Out hiển thị số byte đã nhận lại. Hàng dưới cùng hiển thị tổng số cho toàn bộ backend trên tất cả các server.

Phần Denied hiển thị số lượng request và response đã bị từ chối vì lo ngại về bảo mật.

Cột Req chỉ áp dụng cho backend. Nó hiển thị số lượng yêu cầu đã bị từ chối bởi bất kỳ chỉ thị cấu hình nào sau đây trong một backend:
* 	http-request deny
*   http-request reject
* 	http-request silent-drop
*   http-request tarpit
* 	http-response silent-drop
* 	tcp-request content reject
* 	tcp-request content silent-drop
* 	tcp-response content silent-drop

Cột Resp hiển thị số lượng response đã bị từ chối đối với bất kỳ server cụ thể nào do bất kỳ lệnh cấu hình nào sau đây trong backend:

•	http-response deny
•	tcp-response content reject

Hàng dưới cùng hiển thị tổng các chỉ số server riêng lẻ này.

Errors hiển thị số lỗi liên quan đến giao tiếp với một backend server

Cột Req không được sử dụng. Cột Conn hiển thị số lượng request gặp lỗi khi cố gắng kết nối với server.

Cột Resp hiển thị các lỗi gặp phải khi nhận phản hồi. Ví dụ: đóng kết nối với tcp-response content close sẽ làm tăng số lượng này.

Phần Warnings trong backend hiển thị số lần thử lại và số lần bán lại.

Nếu thêm chỉ thị retries vào backend, thì cột Retr hiển thị tổng số lần kết nối được thử lại. Cột Redis hiển thị số lần HAProxy không thiết lập được kết nối với server và kết nối lại nó với server khác. Điều này yêu cầu bạn phải thêm chỉ thị option redispatch.

Trong một backend, phần Server hiển thị các chi tiết khác nhau về trạng thái, sức khỏe và trọng lượng của mỗi server.

Cột Status hiển thị liệu server hiện đang hoạt động hay không và trong bao lâu. Nó có thể hiển thị một trong các trạng thái sau:
* *UP:*	server đang báo cáo là khỏe mạnh.
* *DOWN:*	server đang báo cáo là không khỏe mạnh và không thể nhận request.
* *NOLM:*	đã thêm http-check disable-on-404 vào backend và URL được kiểm tra tình trạng đã trả về phản hồi HTTP 404.
* *MAINT:*	server đã bị vô hiệu hóa hoặc chuyển sang chế độ bảo trì.
* *DRAIN:*	server đã được đưa vào chế độ thoát.
* *No check:*	health check không được kích hoạt cho máy chủ này.

Các cột LastChk hiển thị một giá trị như L7OK / 200 in 1ms nghĩa là health check Layer 7 đã được thực hiện; nó trả về phản hồi HTTP 200 OK trong vòng 1 mili giây. Nếu là L4O in 0ms, nghĩa là HAProxy đã có thể tạo kết nối Layer 4 với server.

Cột Wght hiển thị tỷ lệ lưu lượng truy cập mà nó sẽ chấp nhận, như được đặt bởi thông số weight trên dòng server. Cột Act cho biết server đang hoạt động (được đánh dấu bằng chữ Y) hay bản backup (được đánh dấu bằng dấu -). Có liên quan mật thiết với nhau, cột Bck cho biết máy chủ là backup(được đánh dấu bằng chữ Y) hay đang hoạt động (được đánh dấu bằng dấu -).

Cột Chk hiển thị số lần health check không thành công. Cột Dwn hiển thị số lần chuyển đổi từ UP sang DOWN. Cột Dwntme cho biết server đã ngừng hoạt động trong bao lâu.

Nếu thêm thông số slowstart vào dòng server, khi tắt và sau đó bật server đó, cột Thrtle hiển thị phần trăm lưu lượng truy cập mà server sẽ chấp nhận. Tỷ lệ phần trăm sẽ tăng dần lên 100% trong khoảng thời gian đã đặt.