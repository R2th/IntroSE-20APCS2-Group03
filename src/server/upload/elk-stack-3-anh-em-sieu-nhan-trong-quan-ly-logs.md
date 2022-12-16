# Giới thiệu
## Logging
Logging là một phần không thể thiếu trong bất kì hệ thống nào, nó giúp chúng ta lưu lại dấu vết, hoạt động của ứng dụng, giúp phân tích, điều tra bugs, bla bla...

![Imgur](https://i.imgur.com/xlGjFVC.jpg)

Việc quản lý log sao cho hiệu quả luôn là một bài toán cần phải giải khi mà trong một hệ thống lớn thì file log có thể lên tới vài chục GB, hay là trong mô hình microservices thì chúng ta có rất nhiều servers tương ứng với rất nhiều file logs.

Vào một ngày đẹp trời chẳng may hệ thống dính bug, cần vào xem log để điều tra, chẳng nhẽ bây giờ chúng ta phải mò vào trong từng cái server một và xem từng dòng log trong cái đống 💩 to tổ bố đấy ư?

![](https://media.giphy.com/media/uXM2ZsdfUN2j6/giphy.gif)

Không, tất nhiên là không rồi, vì chúng ta đã có các công cụ giúp quản lý log tập trung, trong đó nổi cộm nhất chính là ELK Stack (hay Elastic Stack)

## ELK Stack

![Imgur](https://i.imgur.com/t11iw1X.png)

"ELK" là từ viết tắt của ba dự án nguồn mở: Elaticsearch, Logstash và Kibana. Trong đó:

*  Elaticsearch: là một search engine được rất nhiều anh em sử dụng, trong bộ ba này thì nó đóng vai trò là một store để chứa logs kiêm vai trò tìm kiếm và phân tích mạnh mẽ vốn có. 
 
* Logstash: đây là một công cụ sử dụng để thu thập, xử lý log được viết bằng Java. Nhiệm vụ chính của logstash là thu thập log sau đó chuyển vào Elastichsearch. Mỗi dòng log của logstash được lưu trữ đưới dạng json.

* Kibana: là công cụ cho phép trực quan hoá dữ liệu từ Elasticsearch, ở đây chính là đống logs của chúng ta.

![Imgur](https://i.imgur.com/jicB9m9.png)
 
 ### Luồng hoạt động
 1. Đầu tiên, log sẽ được đưa đến Logstash. (Thông qua nhiều con đường, ví dụ như server gửi UDP request chứa log tới URL của Logstash, hoặc Beat đọc file log và gửi lên Logstash)
1. Logstash sẽ đọc những log này, thêm những thông tin như thời gian, IP, parse dữ liệu từ log (server nào, độ nghiêm trọng, nội dung log) ra, sau đó ghi xuống database là Elasticsearch.
1. Khi muốn xem log, người dùng vào URL của Kibana. Kibana sẽ đọc thông tin log trong Elasticsearch, hiển thị lên giao diện cho người dùng query và xử lý.
 ![](https://www.michael-wutzke.com/wp-content/uploads/2019/02/how-it-works-elastic-stack-beats-logstash-elasticsearch-kibana.png)

# Why ELK Stack?

Với các hệ thống hoặc ứng dụng nhỏ, ta không cần giao mổ trâu đi giết gà làm gì, cứ ghi log ra file hoặc stdout của hệ thống là được

Tuy nhiên với hệ thống lớn, gồm nhiều services lại là câu chuyện khác. 

* Quản lý log tập trung:
Thay vì phải lọ mọ vào từng servers xem log thì chúng ta chỉ cần mở kibana trên trình duyệt web là có thể xem được log của tất cả các servers rồi
* Dễ dàng tích hợp: dù bạn có dùng Nginx hay Apache, dùng MSSQL, MongoDB hay Redis, Logstash đều có thể đọc hiểu và xử lý log của bạn nên việc tích hợp rất dễ dàng.
* Search và filter mạnh mẽ: Elasticsearch cho phép lưu trữ thông tin kiểu NoSQL, hỗ trợ luôn Full-Text Search nên việc query log rất dễ dàng và mạnh mẽ, ngay cả với dữ liệu log cực kì lớn.
* Scale dễ dàng: Khi muốn xử lý nhiều log hơn, chúng ta chỉ việc tăng số nodes của Elasticsearch hoặc Logstash lên là xong
* Dễ dàng triển khai và hoàn toàn miễn phí: Chúng ta có thể chạy bộ 3 này trên 1 server duy nhất, và k tốn tiền bản quyền vì các pm này đều là mã nguồn mở + free.
* Cộng đồng mạnh, tutorial nhiều.

# Lời kết
Hi vọng qua bài viết này các bạn có thể hiểu tổng quan ELK Stack là gì và tại sao chúng ta cần nó. Ở bài viết tiếp theo mình sẽ hướng dẫn cách setup một server chạy ELK stack ăn liền với Docker.