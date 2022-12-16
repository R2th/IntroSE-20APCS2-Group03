Đến với lập trình web thì chắc hẳn ai trong số chúng ta cũng đã từng làm việc với database. Đặc biệt là hệ quản trị cơ sở dữ liệu quan hệ như MySQL, PostgreSQL …

Với trường hợp nào thì nên dùng MySQL, trường hợp nào không nên dùng MySQL? Khi vận hành MySQL thì nên chú ý những thứ gì? …

Hôm nay mình chia sẻ với mọi người kinh nghiệm vận hành MySQL mà mình đã học được qua nhiều năm.

## Scaling khá vất vả

### Mặc dù khi release xong chạy rất nhanh nhưng …

Để dễ hiểu thì mình lấy ra 1 ví dụ về đã dùng MySQL vào trong hệ thống chat với dữ liệu message cực lớn (Ví dụ như Facebook Messenger chẳng hạn)

Khi đó bảng để lưu message mình đoán sẽ kiểu như này:

```
messages (id, room_id, sender_id, message_body, created_at)
```

Đương nhiên không chỉ có mỗi bảng này mà còn rất nhiều bảng khác nữa.

Ví dụ như bảng users để lưu thông tin người dùng.

Bảng attachments để quản lý thông tin file được đính kèm khi gửi.

Bảng tags để lưu thông tin tag của người dùng…

Ngoài ra không chỉ có tính năng chat mà có khi chúng ta sẽ cần có cả tính năng phân tích hành vi của người dùng nữa. Nên lúc đó có thể chúng ta sẽ lưu access_log của người dùng vào MySQL (hoặc có thể lưu ở 1 số bộ phận storage bên ngoài như S3 chẳng hạn).

1 dãy các luồng xử lí như thế thì quả thực khi release xong, với số lượng người dùng ít thì tốc độ query sẽ rất nhanh. Và ít ai để ý đến vấn đề scaling sau này.

Vậy vấn đề ở đây là gì?

### Dữ liệu to dần và không thể cache hết lên memory, dẫn đến phải read từ disk và làm tốc độ giảm xuống

Giai đoạn đầu khi release, lượng dữ liệu sử dụng trên MySQL còn nhỏ, memory cấp phát cho cache có nhỏ đi chăng nữa thì cũng có thể đẩy dữ liệu lên đó được.

Thế nhưng sau 1 thời gian vận hành, lượng dữ liệu tăng khủng khiếp, số lượng access của người dùng cũng tăng lên. Dẫn đến tỉ lệ cache hit trên MySQL sẽ giảm xuống (vì không dủ memory để cache). Kết quả là phải đọc dữ liệu từ disk thay vì từ cache. Và làm cho tốc độ giảm xuống. (Đọc data trên memory nhanh gấp 200 lần HDD, và gấp 10 lần SSD).

Để giải quyết vấn đề này trong thời gian ngắn thì có 2 cách:

* Tăng memory lên để có thể cache được nhiều dữ liệu trên memory hơn. **Cách này được gọi là scale up**.
* Áp dụng cơ chế master slave vào hệ thống. Master sẽ đảm nhiệm việc ghi. Slave sẽ đảm nhiệm việc đọc. Mỗi khi dữ liệu trên master bị thay đổi thì sẽ replication sang các con slave để đồng bộ dữ liệu. **Cách này còn được gọi là scale out**.

Cho dù thực hiện cách nào đi chăng nữa thì cost vận hành trên MySQL sẽ càng ngày càng tăng lên.
Đến 1 lúc nào đó cost này sẽ tăng đến 1 mức độ mà có khi tiền doanh thu hàng tháng không trả nổi tiền nuôi server.

Với tình trạng như này thì các bạn sẽ suy nghĩ gì?

* Tốc độ đọc ghi sẽ chậm hơn, làm cho trải nghiệm người dùng bị giảm xuống.
* Muốn tung ra nhiều campaign để thu hút người dùng. Thế nhưng MySQL bị bottleneck và không thể thực hiện campaign được.
* Thay đổi sang 1 loại database mới. Thế nhưng do tính chất của nó khác nhau dẫn đến bắt buộc phải sửa logic phía application. Hơn thế nữa việc migration **big data** từ server này sang server khác có thể mất rất nhiều ngày. (1 ngày application maintain có thể làm doanh thu giảm xuống khá nhiều).

### Tính bảo trì, failover khá lớn

Khi MySQL đang được chạy dưới cơ chế master-slave (dữ liệu luôn luôn được đồng bộ từ master sang slave). Chẳng may vì 1 lí do nào đó mà con master bị down. Khi đó MySQL sẽ thực hiện failover (chuyển con master bị down sang 1 con master dự phòng khác). Quá trình này sẽ mất vài phút (với trường hợp RDS của aws).

Với business yêu cầu khắt khe về mặt downtime (ví dụ như game chẳng hạn) thì có lẽ với case mất vài phút để thực hiện failover thì chắc khó có thể chấp nhận được.

Vậy thì ta nên giải quyết vấn đề đó như thế nào?


## Chọn database thích hợp hơn?

Để giải quyết được vấn đề này thì có lẽ ta nên chọn loại database khác không phải MySQL. Ví dụ như NoSQL chẳng hạn.

Nhưng khi dữ liệu của hệ thống đã to rồi thì việc chọn 1 database khác không phải là sự lựa chọn đúng đắn lắm vì có thể sẽ phải sửa code khá nhiều, thời gian migration từ database này sang database khác sẽ mất khá nhiều thời gian (có thể mấy ngày đến 1 tuần).

**Do đó ngay trong giai đoạn thiết kế thì việc suy nghĩ chọn database nào phù hợp là 1 điều vô cùng quan trọng, đặc biệt cần suy nghĩ xem tương lai dữ liệu sẽ lớn đến mức độ nào.**

Với NoSQL thì có vô số loại, ví dụ như [Cassandra](https://nghethuatcoding.com/2019/05/26/tat-tan-tat-ve-apache-cassandra/), DynamoDB.

Cả 2 loại này tính scalable của nó cực lớn, các ông lớn như Facebook, [Discord](https://nghethuatcoding.com/2019/06/01/discord-da-luu-tru-hang-ti-messages-moi-ngay-nhu-the-nao/), Instagram hiện tại cũng đang dùng nó.

Mình xin kể 1 số tính năng chính của 2 thằng này:

**Cassandra:**

* Được phát triển bởi Facebook, sau đó tặng cho bên Apache.
* Cassandra là hệ cơ sở dữ liệu phân tán, kết hợp những gì tinh tuý nhất của Google Bigtable và Amazon DynamoDB. Ngôn ngữ phát triển Cassandra là Java.
* Dữ liệu được dàn trải sang nhiều node, nên 1 node có chết đi chăng nữa thì vẫn có thể query lấy được dữ liệu trên node khác. Do đó tính chịu lỗi của nó cực lớn.
* Throughput của nó tăng theo số lượng node. Nếu muốn nó xử lí được nhiều request hơn thì chỉ cần tăng số node lên.
* Tốc độ write luôn luôn nhanh hơn read. Bởi vì write chỉ cần append vào đít file. Trong khi read cần phải check tính CAP (có thể hiểu đây là tính toàn vẹn dữ liệu) giữa các node nữa nên thời gian sẽ lâu hơn. Mặc dù nói là lâu nhưng mà thời gian của read hay write cũng chỉ tính bằng ms.

**DynamoDB:**

* DynamoDB là hệ cơ sở dữ liệu phân tán, được phát triển bởi Amazon.
* Có thể setting thông số throughput của read và write riêng. Và Amazon sẽ tự động scale để đáp ứng được số throughput đó.
* Ví dụ như tại thời điểm peak time thì chúng ta setting cho số throughput của read cao hơn chút, ở thời điểm ít access thì setting throughput thấp xuống. Để tiết kiệm cost.

**==> Tóm lại việc chọn database nào đi chăng nữa thì điều quan trọng nhất là nó không làm mất đi tính trải nghiệm của người dùng.**

Quay lại bài toán về hệ thống chat như ở bên trên, nếu số lượng người dùng tăng lên mà để trải nghiệm người dùng không bị mất đi thì chúng ta cần thiết kế hệ thống có tính scalable. Đặc biệt với database thì có thể kết hợp cả MySQL lẫn NoSQL lại chẳng hạn, hoặc dùng hẳn NoSQL. Tuỳ vào từng bài toán mà chúng ta cần đưa ra phương án hợp lí.

## Kết luận

Các bạn thấy thế nào? Cũng hình dung được thằng MySQL và thằng NoSQL nó khác nhau như thế nào chưa?

Dựa vào từng bài toán mà chúng ta nên nghiên cứu và đưa ra quyết định đúng đắn. Để về sau maintain sẽ đơn giản hơn.

Nói thì dễ nhưng quả thực chưa 1 hệ thống to nào trên thế giới mà thiết kế 1 phát chạy được cả đời cả. Hầu như hệ thống nào cũng có cải tiến về mặt hệ thống cả. Ví dụ như Chatwork lúc đầu code bằng PHP sau đó đã chuyển sang Scala để hiệu năng tốt hơn …

Nguồn: [https://nghethuatcoding.com/2019/06/25/nhung-chu-y-khi-chon-mysql-lam-database/](https://nghethuatcoding.com/2019/06/25/nhung-chu-y-khi-chon-mysql-lam-database/)

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

→→→ [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)

Chúc các bạn 1 tuần thật vui vẻ.