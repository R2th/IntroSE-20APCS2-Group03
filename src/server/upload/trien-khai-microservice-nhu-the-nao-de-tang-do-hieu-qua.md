Có rất nhiều câu hỏi inbox mình về cách triển khai microservice sau khi mình share slide, do slide này mình làm để thuyết trình là chính nên đúng là hơi khó hiểu.
Mình trả lời không xuể nhưng chung quy đây là cách mình hay tư vấn (cho các đơn vị đang có hệ thống monolithic lớn):

**1. Tách services**: Tách tầng application code thành các module/service ko phụ thuộc nhau, muốn lấy gì thì phải thông qua interface (có thể là http request, streaming, socket, rpc,… thường là RPC). Done bước 1 thì các service độc lập và vẫn xài DB chung.

**2. Xử lý tầng DB cơ bản**: Remove dần các store procedure và các lệnh join nếu có, chỉ giữ lại những cái cùng domain (vd như join từ order qua user là loại bỏ). Remove cái nào thì application code gánh lại phần logic đó. Để an toàn thì có thể làm phía application code trước, thấy ổn rồi chuyển qua, thấy sai thì sửa hoặc rollback version làm lại. Vì giao tiếp qua interface nên miễn là return đúng và đủ là được.

**3. Tách DB lớn:** DB lớn sử dụng trước đó thành từng cụm theo domain. Có thể dùng cách tạo các user db với các quyền hạn chế theo domain để thử nghiệm trước khi tách hẳn. Done bước này các service chính thức độc lập với nhau.

**4. Microservice (chia nhỏ nữa hay ko???):** là do lựa chọn của team và thực trạng hệ thống. Và cách làm là đúng như bước 1–3

**— — — — — — — — — — Các câu hỏi thường gặp — — — — — —— — — — — —**

**1. Chỉ tách service nhưng ko tách db thì sao?**
- Không sao nhưng hiệu quả ko đáng kể, trước mắt chỉ lợi được deployment và giảm thiểu sự phụ thuộc lẫn nhau ở tầng code.

**2. Tách DB xong hết rồi nhưng hệ thống vẫn chậm?**
- Microservice bản chất ko giúp hệ thống nhanh hơn, mà giúp hệ thống được chia nhỏ thành nhiều phần để dễ trị. VD như 1 table quá to làm cho service chậm là một vấn đề khác: scaling/sharding db.

**3. Hồi xưa 1 cục chạy nhanh bây giờ tách ra thấy chậm hẳn ta!!**
- Đúng là vậy, lúc này xuất hiện response time giữa các service mà hồi xưa ko có. Giải pháp là: giảm thời gian encode/decode và mở đóng connection giữa các service (dùng gRPC).

**4. Service A call service B thì phải biết IP của B, rồi lỡ scale B lên nhiều nodes thì sao?**
- Vì thế mà mới có khái niệm service proxy và service mesh hay service discovery. Nó giúp điều phối requests vào các node cũng như phân giải IP như DNS. Từ đó A ko call B mà call qua 1 discovery/master node có thông tin của B.

**5. Việc logging, monitoring, tracing hồi xưa làm 1 cục chung h riêng phải làm từng service hả?**
- YES. Vì thế mà logging, monitoring, tracing trong microservices được nâng lên 1 level mới, với nhiều khái niệm chung: agent, collector, pipeline, streaming, master dashboard,…
“Microservice loại bỏ sự phụ thuộc, nhưng thêm vào rất nhiều thứ phức tạp”
Bây giờ thì mọi người hiểu tại sao lại có vị trí devops rồi đó. Deploy đúng và đảm bảo hệ thống chạy ổn định, tìm ra nguyên nhân sự cố là trong những main skill của bạn này.


Tác giả: **Việt Trần** — **Founder 200lab**

Dưới đây là slide chia sẻ từ tác giả.


[http://bit.ly/2UrGQXL](http://bit.ly/2UrGQXL)

[http://bit.ly/2v8iisg](http://bit.ly/2v8iisg)