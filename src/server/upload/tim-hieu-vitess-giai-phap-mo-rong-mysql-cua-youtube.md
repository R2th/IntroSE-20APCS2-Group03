![](https://images.viblo.asia/473ead7c-8059-42ec-b3e7-06ccf69e18b4.png)

## 1. Giới thiệu

Năm 2010, đội ngũ phát triển của Youtube gặp một số thách thức nan giải về việc mở rộng hệ thống với MySQL:

1. Cơ sở dữ liệu MySQL của YouTube sẽ sớm đạt đến ngưỡng, nơi lưu lượng truy cập vào lúc cao điểm có thể  vượt quá khả năng phục vụ của hệ thống. Để tạm thời xử lý vấn đề trên, đội ngũ phát triển của Youtube đã cấu hình **master database** để xử lý việc ghi và **replica database** chỉ xử lý tác vụ đọc.
2. Với giải pháp 1, lưu lượng truy cập chỉ đọc vẫn cao, dẫn tới việc quá tải **replica database**. Vì vậy, đội ngũ YouTube một lần nữa đưa ra giải pháp tình thế khi tăng thêm nhiều **replica database** hơn.
3. Thêm nữa, **master database**  cũng đạt đến giới hạn khi xử lý một lượng lớn yêu câu ghi vào database, họ phải tiếp tục thực hiện việc **sharding** (phân đoạn) cơ sở dữ liệu. **Sharding** là phương pháp chia dữ liệu trong một bảng thành nhiều phần khác nhau, khi cần truy vấn thì sẽ truy vấn theo từng đoạn, điều này sẽ giảm thiểu được việc phải truy vấn cả 1 bảng lớn với kích thước dữ liệu khổng lồ.
4. Với mỗi truy vấn, để tìm đúng dữ liệu thuộc phân đoạn nào, đội ngũ phát triển phải viết thêm logic ở tầng ứng dụng để xác định đúng vị trí của dữ liệu.


![](https://images.viblo.asia/bcba4f6a-8d8a-45a5-8f35-dcdef2c664f3.png)

**Vitess** ra đời cho phép YouTube có thể loại bỏ đoạn logic đã triển khai trên tầng ứng dụng ở trên. **Vitess** giới thiệu một **proxy** nằm giữa ứng dụng và cơ sở dữ liệu giúp định tuyến và quản lý các tương tác với cơ sở dữ liệu. Với **Vitess** , YouTube đã mở rộng cơ sở dữ liệu lên hơn 50 lần :clap:

Tóm tắt lại, **Vitess** là một giải pháp giúp giải quyết vấn đề triển khai, mở rộng và quản lý một lượng lớn các cụm (cluster) database. Hiện tại, **Vitess** chỉ hỗ trợ 2 nền tảng cơ sở dữ liệu quan hệ là MySQL và MariaDB.


## 2. Tính năng, kiến trúc

### Tính năng

Các tính năng chính
- Sharding database SQL dễ dàng, tránh việc phải thay đổi logic ở tầng ứng dụng khi truy vấn đến các phân đoạn database (partition).
- Tích hợp dễ dàng với công nghệ điện toán đám mây (cloud computing).
- Triển khai và quản lý một số lượng lớn các máy chủ SQL (instance SQL).

### Đặc điểm

**Hiệu năng**
- Sắp xếp các truy vấn theo pool - Các truy vấn từ front-end sẽ được đưa vào pool nhằm tối ưu hóa hiệu năng.
- Sử dụng lại kết quả cho các truy vấn giống hệt truy vấn trước đó ( trong 1 khoảng thời gian nhất định để đảm bảo kết quả trả về vẫn đúng).
- Trình quản lý giao dịch - Giới hạn số lượng giao dịch xảy ra đồng thời và quản lý thời hạn nhằm tối ưu hóa thông lượng tổng thể.

**Lưu ý**: **Giao dịch (Transaction)**:  trong CSDL SQL là phép thực thi gồm nhiều tiến trình nhỏ, nếu 1 trong các tiến trình thất bại thì transaction sẽ xem như bị thất bại. Ví dụ như giao dịch chuyển tiền qua ngân hàng, nếu tiến trình cập nhật số dư của người gửi hoặc người nhận bị lỗi thì giao dịch được coi là thất bại.

**Bảo mật**
- Truy vấn sẽ được kiểm tra, loại bỏ các ký tự nguy hiểm, thêm limits và từ chối các truy vấn không xác định.
- Lưu danh sách đen để ngăn chặn các truy vấn nguy hiểm, gây lỗi cho hệ thống.
- Query killer – Chấm dứt các truy vấn mất quá nhiều thời gian.
- Bảng ACL (access control lists) - Lưu danh sách người dùng được phép kết nối đến.

**Monitoring**
- Hỗ trợ các công cụ phân tích cho phép theo dõi, chẩn đoán và phân tích hiệu suất cơ sở dữ liệu.


**Sharding**
- Nhiều tùy chọn cấu trúc cách sharing (theo chiều dọc cũng như chiều ngang), hỗ trợ tùy biến sharding.

### So sánh 2 hệ thống triển khai MySQL và Vitess với nhau

| MySQL	  | Vitess  |
|---|---|
|Các kết nối MySQL tiêu tốn bộ nhớ ngoài khoảng từ 256KB đến 3MB (tùy thuộc vào phiên bản MySQL). Ngoài ra, chúng cũng tiêu tốn một lượng tài nguyên CPU đáng kể. |Ngược lại, các kết nối với Vitess khá nhẹ, ít tiêu tốn tài nguyên hơn nhờ việc sử dụng concurrency trong ngôn ngữ Go. Do đó, Vitess có thể xử lý dễ dàng hàng kết nối cùng lúc.|
| Câu lệnh truy vấn hoàn toàn do người lập trình xử lý, những truy vấn viết không được tốt (như thiếu LIMIT) có thể gây ảnh hưởng đến hiệu suất của hệ thống  | Vitess có trình phân tích cú pháp SQL, có thể lọc các truy vấn kém, ảnh hưởng đến hiệu suất hệ thống.|
|MySQL không hỗ trợ tính năng tự động sharding cơ cở dữ liệu, nếu muốn áp dụng Sharding vào MySQL, đội ngũ phát triển phải tự triển khai logic.|Khác với MySQL, Vitess hỗ trợ cơ chế sharding với nhất nhiều tùy chọn tăng giảm số phân đoạn tùy ý v..v
|Một cụm MySQL gồm 1 master database và một hoặc nhiều replication database, khi master database gặp sự cố, 1 trong các replication database sẽ được chọn để thay thế vai trò. Điều này yêu cầu hệ thống MySQL cần quản lý, theo dõi liên tục hệ thống.	| Vitess hỗ trợ tự động xử lý các tình huống khác nhau. Bao gồm, chuyển đổi master database và sao lưu dữ liệu.|
|Với cụm MySQL, đội ngũ phát triển của thể tùy chỉnh vai trò của các cơ sở dữ liệu trong cụm (như master sử lý việc ghi, replication xử lý việc đọc). Khi triển khai sharding database, cần phải thiết lập logic đó cho các phân đoạn (đoạn này dùng ghi, đoạn nào dùng đọc).| Vitess sử dụng kiến trúc có 1 nơi lưu trữ đầy đủ các thông tin, như etcd hoặc ZooKeeper. Vitess cũng cung cấp một proxy định tuyến các truy vấn một cách hiệu quả đến máy chủ MySQL thích hợp.|


### Kiến trúc
    
![](https://images.viblo.asia/44bcb3e8-62d2-4518-88c3-003424bca0f0.png)

1. **vtctl** là một công cụ dòng lệnh được sử dụng để quản trị một cụm **Vitess**. **vtctl** có thể tương tác trực tiếp hoặc từ xa thông qua chương trình máy khách **vtctlclient**. Với **vtctl**, chúng ta có thể thực hiện các thao tác như cấu hình master database, replica database, tạo bảng, v..v. 
2. **vtctld** là một công cụ đồ họa, giúp trực quan hóa việc quản lý trạng thái, thông tin của cụm **Vitess**.
3. **VTGate** là một máy chủ proxy giúp định tuyến lưu lượng truy cập đến đúng máy chủ **VTTablet** và trả về kết truy vấn cho ứng dụng. **VTGate** chạy trên cả hai giao thức là MySQL và Vitess gRPC. Khi định tuyến các truy vấn đến các máy chủ **VTTablet** thích hợp, **VTGate** xem xét cấu trúc các phân đoạn trong cơ sở dữ liệu, tính toán độ trễ và tính khả dụng của các bảng cũng như các phiên bản MySQL để điều hướng truy vấn đến đúng nơi hợp lý nhất, giúp tăng hiệu suất trên cả hệ thống.
4. **VTTablet** server là máy chủ có nhiệm vụ quản lý, điều khiển trực tiếp các máy chủ MySQL.
5. Dịch vụ **Topology** là nơi lưu trữ các thông tin, cấu hình của một hệ thống, cụm máy chủ **Vitess**. Nhiệm vụ cụ thể của **Topology** là:
    - Cung cấp thông tin về các **VTTablet**, giúp **VTGate** định tuyến đến đúng máy chủ **VTTablet**
    - Lưu trữ cấu hình của hệ thống **Vitess** được quản trị viện quy định từ trước, giúp mạng 
    - Giúp các **VTTablet** liên kết với nhau khi cần thông tin từ các  **VTTablet** khác.


## 3.Triết lý về khả năng mở rộng của Vitess

### Nhỏ hơn - gọn hơn (Small instances)

Khi sử dụng sharding để chia nhỏ cơ sở dữ liệu thành nhiều phần khác nhau, mỗi phần nên được chia nhỏ để vừa chạy trên một máy chủ và trên mỗi máy chủ (host) chỉ nên triển khai 1 máy chủ MySQL (MySQL instance).

**Vitess** khuyến nghị rằng nên chia thành mỗi **250GB** trên một máy chủ MySQL


### Đảm bảo toàn vẹn dữ liệu (Durability through replication)

Sao lưu và phục hồi dữ liệu luôn là yếu tố được quan tâm hàng đầu với các hệ thống lưu trữ dữ liệu. Dữ liệu cần được sao lưu sang nhiều máy khác nhau, thậm chí là theo các vị trí địa lý khác nhau nhằm phòng tránh các sự cố xảy ra bất ngờ gây mất mát dữ liệu. 

### Mô hình nhất quán (Consistency model)

Ở các hệ thống cơ sở dữ liệu lớn, dữ liệu thay đổi liên tục, trải dài trên nhiều máy chủ, cụm máy chủ khác nhau. Do đó tồn tại vấn đề độ trễ cũng như tính nhất quán về dữ liệu khi các truy vấn, giao dịch tương tác với dữ liệu ở các máy chủ khác nhau.

Để giảm thiểu điều này, máy chủ **VTGate** của **Vitess** có khả năng theo dõi độ trễ của bản sao và có thể được định cấu hình để tránh cung cấp dữ liệu từ các phiên bản có độ trễ vượt quá X giây nào đó.

### Nói không với việc chạy nhiều master database (No multi-master)

Vitess không hỗ trợ việc thiết lập nhiều master trong các cụm máy chủ master-slave. **Vitess** đưa ra một số giải pháp tương đương với việc dùng nhiều master.

- Mở rộng: Dùng giải pháp Sharding thay vì tăng thêm máy chủ master.
- Tính khả dụng cao: Vitess tích hợp với Kubernetes, có khả năng thực hiện chuyển đổi sang bản chính mới trong vòng vài giây sau khi phát hiện lỗi ở master.

## Tài liệu tham khảo

https://vitess.io/docs/