![image.png](https://images.viblo.asia/b575095b-4764-4320-9fbf-996421374cbd.png)

Nếu các bạn đã học qua lập trình frontend (web/app) và nay muốn học thêm backend để trở thành fullstack developer hoặc muốn bắt đầu sự nghiệp lập trình với backend thì mình hy vọng seri này sẽ giúp các bạn.

Đầu tiên chúng ta cần hiểu đúng về lập trình backend.

## Lập trình backend là gì?

![image.png](https://images.viblo.asia/3366dba7-330f-495f-aef7-1d8ab9df535b.png)

Lập trình backend là lập trình phía server để xử lý, lưu trữ và phục vụ dữ liệu cho phía frontend. Thông thường phía backend sẽ bao gồm database (cơ sở dữ liệu) và các chương trình (application hoặc service) chạy trên một hoặc nhiều servers cùng kết nối, tương tác với nhau. Các application trên backend chính là "xương sống" cho tất cả những ứng dụng trên frontend ngày nay.

Từ đó công việc của một lập trình viên backend là viết ra các application, service giao tiếp với các hệ thống database. Các application trên backend thường là web server, API, hoặc một dịch vụ lưu trữ hay xử lý dữ liệu nào đó.

Lập trình backend thực sự là một công việc rất thú vị và quan trọng ngày nay.

## Vì sao backend lại quan trọng?
Cả frontend lẫn backend đều rất quan trọng. Tuy nhiên backend là nơi lưu trữ tất cả dữ liệu sinh ra bởi người dùng ở frontend và cũng là nơi phải xử lý tất cả các nghiệp vụ một cách chính xác. Nếu vì lý do nào đó mà backend không thể làm được những việc trên thì các ứng dụng ở frontend không thể truy cập được nữa.

Nói một cách khác, chúng ta có thể xem frontend là thân thể để có thể chăm sóc và làm đẹp, khiến ta trở nên bắt mắt hơn, thu hút được nhiều người hơn. Còn backend chính là tâm hồn, là nội tâm của chúng ta. Nếu nội tâm gặp trục trục thì chúng ta sẽ gặp vấn đề rất lớn, sẽ khó chữa trị và hồi phục hơn là các vết thương ở trên thân thể.

## Lập trình Backend có gì khác với Frontend?
![image.png](https://images.viblo.asia/e64b0fdc-82b9-4b5e-b58a-8901cd763d88.png)

### Khác biệt về đối tượng người dùng
Điểm khác biệt lớn nhất chính là đối tượng người dùng của các sản phẩm hay ứng dụng từ backend và frontend. Đối với Frontend, các ứng dụng được tạo ra để phục vụ cho các người dùng cuối, những người bình thường không phải developer. Còn đối với backend thì người dùng thường là các developer (lập trình viên).

Từ sự khác biệt này, các frontend developer thường tập trung vào giải quyết các bài toán liên quan đến giao diện người dùng (GUI). Các chức năng trên frontend phải hoạt động tốt và chính xác, phản ứng nhanh khi người dùng thao tác cũng như có sự thay đổi dữ liệu từ backend.

Các backend developer thì ngược lại, họ không cần quan tâm đến giao diện cho người cuối mà thay vào đó là các vấn đề liên quan đến cấu trúc dữ liệu trên database, cách lưu trữ và xử lý chính xác các nghiệp vụ (logic business) phục vụ phía frontend.

### Khác biệt về môi trường thực thi
Điểm khác biệt tiếp theo rất quan trọng theo mình chính là môi trường thực thi của ứng dụng frontend và backend.

Frontend có các ứng dụng thường là website chạy trên các máy tính cá nhân hoặc mobile app chạy trên các điện thoại thông minh. Thời nay thì các thiết bị này có cấu hình rất cao nên dễ dàng đạt được hiệu năng tốt đến rất tốt.

Nhưng với backend thì thường là các service chạy trên những server có cấu hình thấp hơn rất đáng kể (RAM, CPU lẫn Disk). Tuy backend developer không cần phải lâp trình giao diện cho người dùng cuối nhưng bù lại thì service của họ lại phải "hứng chịu" lượng truy vấn khổng lồ từ phía frontend. Việc phải xử lý dưới áp lực truy vấn lớn như thế khiến các backend developer luôn phải tư duy tối ưu hiệu năng thực thi và sử dụng ít tài nguyên máy chủ nhất có thể.

### Backend developer cần học những gì?
Các bạn có thể xem qua một roadmap rất đầy đủ dưới đây: (nhưng đừng hoảng, mình sẽ chia sẻ cách dễ hơn nhiều ngay bên dưới)

![image.png](https://images.viblo.asia/195e1be9-6d3a-45ce-b9e8-adc074443f25.png)

Trong phạm vi bài chia sẻ này, theo mình thì các bạn chỉ cần học 4 thứ: ngôn ngữ lập trình backend, database, kiến thức cơ bản về server và API (REST API).

### Ngôn ngữ lập trình backend

![image.png](https://images.viblo.asia/83767e06-76a8-4d8d-a347-72db5fbc5c65.png)

Có rất nhiều ngôn ngữ lâp trình hỗ trợ backend. Nổi tiếng và thông dụng nhất có lẽ là Javascript (với NodeJS). Nếu các bạn đã biết đến Python, Java, C# thông qua kiến thức trong trường thì vẫn có thể dùng rất tốt cho backend.

Mình biết là sẽ có rất nhiều lời khuyên hoặc so sánh về các ngôn ngữ lập trình. Lời khuyên chân thành của mình là các bạn cứ chọn cái mà bạn cảm thấy dễ học và thuận tiện cho bản thân nha.

Trong seri này mình dùng Golang để hướng dẫn các bạn. Vì thế nếu đây là lần đầu tiên các bạn biết đến Golang thì các bạn hãy xem bài này:

https://200lab.io/blog/tim-hieu-ngon-ngu-lap-trinh-golang/

Lựa chọn Database

![image.png](https://images.viblo.asia/8c41d6eb-745d-415e-80a4-0110e03cd69d.png)

Nếu bạn đã từng học và sử dụng các hệ thống cơ sở dữ liệu như MySQL, Postgres hay MongoDB thì đều được hết nha. Các bạn hãy chọn một database mà các bạn yeu thích nhất hoặc hiểu rõ nhất. Mỗi cái đều có ưu và nhược cho từng trường hợp cụ thể, nhưng trong giới hạn cho việc học và tìm hiểu thì mình sẽ chọn MySQL để hướng dẫn các bạn.

MySQL cũng là một database rất phổ biến và được sử dụng rất nhiều trong các hệ thống từ nhỏ đến lớn và rất lớn. Các bạn mới học có thể hoàn toàn yên tâm với lựa chọn này nha.

### Kiến thức cơ bản về server (máy chủ)

![image.png](https://images.viblo.asia/551b11e9-c174-4477-bc76-ab2bb91cce4d.png)

Vì chương trình của các backend developer viết ra sẽ thực thi trên server nên việc tìm hiểu về server là rất cần thiết. Ít nhất thì chúng ta cũng phải biết một chút về hệ điều hành Linux, một hệ điều hành mã nguồn mở rất nổi tiếng cho các máy chủ ngày nay. Bên cạnh đó là kỹ năng để có thể cài đặt các ứng dụng trên server và deploy service cũng như các kiến thức về mạng máy tính.

Nếu đây là lần đầu tiên bạn học lập trình backend thì cũng đừng nên quá lo lắng. Vì hiện tại trên thế giới đã có rất nhiều giải pháp để đơn giản hoá việc này. Nó chính là các dịch vụ đám mây (cloud) để ảo hoá phần lớn các công đoạn khó nhằn trên. Việc còn lại cũng đơn giản mà bất kì một backend developer mới vào nghề nào cũng làm được.

Seri này mình sẽ hướng dẫn các bạn dùng Docker để đơn giản hoá các bước liên quan tới cài đặt và chạy service trên server:

https://200lab.io/blog/docker-la-gi-khi-nao-nen-dung-docker/

### Kiến thức về API (hay REST API)
Nếu các bạn đang muốn học backend cho web, cụ thể là một web server sẽ chuyên phục vụ cho website, service sẽ trả về HTML đầy đủ cho trình duyệt web hiển thị thì việc tìm hiểu REST API là không cần thiết.

Nhưng hiện nay, dưới thời đại kỷ nguyên số, các thiết bị đầu cuối ngày càng đang dạng hơn, các thiết bị này sẽ không muốn nhận dữ liệu là HTML. Cái chúng cần chỉ là dữ liệu mà thôi. Dữ liệu này thường được trả về với định dạng JSON (hay JSON Format)

"Backend thuần" sẽ sử dụng REST API rất nhiều. Đây là lý do tại sao các backend developer không cần quan tâm đến giao diện người dùng như mình đã đề cập trước đó. Chi tiết hơn về REST API mình cũng đã có làm một bài viết tại đây:

https://200lab.io/blog/rest-api-la-gi-cach-thiet-ke-rest-api/

## Lời kết
Lập trình backend thực sự là một lĩnh vực rất thú vị và hiện đang được quan tâm hơn rất nhiều. Một phần ngày càng có nhiều nhu cầu đến từ đa dạng các thiết bị đầu cuối hơn, không chỉ đơn giản là website như những ngày đầu. Các ứng dụng giải trí, mạng xã hội, thương mại điện tử ngày càng phát triển với lượng người dùng cực kì lớn đã mở ra vô vàng thách thức cho mảng backend.

Nếu bạn yêu thích lập trình, yêu thích giải quyết vấn đề hóc búa trong nghiệp vụ, trong tối tưu và chịu tải lớn, mình hy vọng backend sẽ là sân chơi rất đáng để bạn quan tâm.

Nếu bạn đã theo dõi hết bài viết, đã hiểu lập trình backend, REST API là gì và đã sẵn sàng cho lộ trình tự học REST API với Golang thì mình hẹn gặp lại các bạn vào các bài viết tiếp theo nha.

Xem bài viết gốc tại: https://200lab.io/blog/backend-la-gi-tu-hoc-rest-api-golang/