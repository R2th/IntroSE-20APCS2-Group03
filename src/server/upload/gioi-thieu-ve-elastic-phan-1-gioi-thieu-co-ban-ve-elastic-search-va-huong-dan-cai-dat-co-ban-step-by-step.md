## 1. Lời mở đầu
chào các bạn,  lí do mình viết bài này là để bổ sung một số kiến thức liên quan đến ElasticSearch cũng như cách cài đặt và triển khai ElasticSearch trên các nền tảng windows, linux, mình tính tìm hiểu về MacOS (nhưng không có máy Mac:joy: nên chịu ), tóm cái váy lại là trong phần này mình sẽ giới thiệu về ElasticSearch cũng như cách cài đặt nó, mình sẽ cố gắng để giải thích nó sao cho mình (1 đứa newbie về mấy cái này) và các bạn có thể hiểu được 

## 2. ElasticSearch Là gì?
![Elastic Search](https://images.viblo.asia/ec9626b4-c6f7-4b80-b0ba-f192f9265eaf.jpg)

- ElasticSearch là công cụ Full-Text-Search, có mã nguồn mở (open-source hay public all code đó :innocent:) đây cũng là công cụ phân tích dữ liệu nữa (tìm kiếm nhanh mà )
- được phát triển bằng Java (vậy là chúng ta cần cài thêm java mới chạy được)
- là một search-engine
- hoạt động như web-server và thực hiện các hoạt động tìm kiếm bằng giao thức Restful (Kiểu mấy cái API á)

NOTE: nếu các bạn muốn tìm hiểu thêm về RESTful thì đây: [Restful API](https://topdev.vn/blog/restful-api-la-gi/), link tìm hiểu thêm về Full-text-search ở đây: [Full-Text-Search](https://viblo.asia/p/gioi-thieu-ve-full-text-search-BAQ3vV61vbOr)

## 3. ElasticSearch thì có gì mà ngon hơn "LIKE '%Hello%'  "?
nếu ta search 1 kết quả có chứa từ "one" trong SQL server nó sẽ ra thêm các kết quả không mong muốn Ví dụ: “phone”, “zone”, “money”, “alone” … nói chung sẽ là 1 list kết quả không mong muốn.

Còn search bằng ES thì gõ “one” sẽ chỉ có “one” được trả về mà thôi. Truy vấn LIKE không thể truy vấn từ có dấu. Ví dụ: từ khoá có dấu là “có”, nếu truy vấn LIKE chỉ gõ “co” thì sẽ không trả về được chính xác kết quả

## 4. Đặc điểm cơ bản của ElasticSearch
- có thể mở rộng tới hàng petabytes
- có thể sử dụng như MongoDB
- mã nguồn mở
- không cần chuẩn hóa dữ liệu

## 5. Các thành phần cơ bản của ElasticSearch

### A. Node:
-	là trung tâm hoạt động của ElasticSearch, nơi thực hiện các thao tác tìm kiếm số lượng node tùy thuộc vào tài nguyên máy
-	được định danh bằng 1 unique name

### B. Clusters
-	tập hợp các nodes cùng hoạt động với nhau, chia sẽ cùng một thuộc tính cluster.name
-	được xác định bằng 1 tên định danh duy nhất

### C. Document
- đây là thành phần dữ liệu cơ bản nhất của ElasticSearch
- nhóm các trường được định nghĩa dựa trên dữ liệu JSON, mỗi document có một định danh là UID (giống kiểu MongoDB nếu bạn nào có biết nó)

### D. Chỉ mục (Index)
giống như  chức năng của database là hỗ trợ khả năng tìm kiếm, tuy nhiên về cấu trúc nó lại khác hoàn toàn nó sử dụng một cấu trúc được gọi là "Inverted Index" nói về cấu trúc này khá là dài dòng nên mình sẽ để dành cho một bài khác

### E. Shard
đây là một thành phần khá khó hiểu và trừu tượng nên mình se chỉ nói qua về các đặc điểm chính của nó:
-	chỉ mục đươc chia nhỏ thành các đoạn shard
-	chúng ta không bao giờ làm việc trực tiếp với các Shard
-   Shard bao gồm 2 loại là Primary Shard và 

#### 1. Primary Shard
- lưu trữ dữ liệu và đánh index
- di chuyển dữ liệu được đánh xong xuống replica shard
#### 2. Replica Shard
lưu trữ dữ liệu nhân bản của shard, đảm bảo dữ liệu đầy đủ trong trường hợp primary shard gặp vấn đề 

## 6. Cài Đặt Elastic Search Trên Ubuntu
### A. Thông tin phiên bản

thông tin các phiên bản cài đặt trong ví dụ
Ubuntu 20.04.LTS
Java 8
ElasticSearch 7.12.1 x86_x64
Kibana 7.12.1
### B. Hướng dẫn cài đặt Java 8
đầu tiên chúng ta sẽ cài java thông qua câu lệnh:`sudo apt-get install openjdk-8-jdk`

![cài java bằng lệnh apt-get](https://images.viblo.asia/d6cf4466-de04-45f6-97ff-521aeb35f2c5.png)

tiếp theo, ta sẽ setup JAVA_HOME

chạy câu lệnh sau `sudo update-alternatives --config java`

![Lấy nơi lưu java](https://images.viblo.asia/1eedb83e-46a3-4f64-a0d7-7963330ec9a5.png)

truy cập file `.bashrc` thông qua câu lệnh `nano ~/.bashrc` và thêm JAVA_HOME vào cuối file
![sửa file .bashrc](https://images.viblo.asia/4cd8d72f-3631-40e7-965d-23bdf22a250c.PNG)

lưu file `.bashrc` lại và kiểm tra bằng lệnh `echo $JAVA_HOME`
![Kiểm tra Java Home](https://images.viblo.asia/eb4b47d7-f459-497d-8a57-563572197184.PNG)

### C. Hướng dẫn cài đặt ElasticSearch
tiếp theo chúng ta sẽ cài đặt ElasticSearch , các bạn có thể tìm thấy các bản cài đặt Elastic Search ở đây: [ElasticSearch](https://www.elastic.co/fr/downloads/elasticsearch)

sau đó các bạn tải tải gói .tar.gz về thông qua lệnh `wget`, để sử dụng lệnh này ta có thể cài nó theo câu lệnh sau: `apt-get install wget`

tiếp theo đó chúng ta tải gói này thông qua lệnh `wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.12.1-linux-x86_64.tar.gz`

sau khi đã chạy xong, các bạn tiến hành kiểm tra nó đã ở trong thư mục chưa bằng lệnh `ls`

![Gói tar.gz đã xuất hiện trong thư mục](https://images.viblo.asia/72adaa7e-fc02-46e9-a7b1-4432da7facf5.PNG)

Extract gói .tar.gz thông qua câu lệnh ` tar -xvf elasticsearch-7.12.1-linux-x86_64.tar.gz`

![Extract Gói](https://images.viblo.asia/4a103eb8-07d7-4002-ba6a-2403463bd22f.PNG)

hint: bạn có thể sử dụng lệnh `mv` để thay tên thư mục nhằm thuận tiện cho việc quản lí

### D. Hướng dẫn cài đặt Kibana
tiếp theo là cài Kibana, các bạn có thể cài kibana tại đây [Kibana Dowload](https://www.elastic.co/fr/downloads/kibana) đây đơn giản như 1 giao diện cho elastic thôi

lưu ý: theo một số thông tin mình nhận được thì các bạn nên cài ElasticSearch và Kibana cùng một phiên bản để tránh lỗi

tương tự elastic mình cũng cài kibana thông qua lệnh wget: `wget https://artifacts.elastic.co/downloads/kibana/kibana-7.12.1-linux-x86_64.tar.gz`

tiếp tục extract gói kibana thông qua câu lệnh `tar -xvf kibana-7.12.1-linux-x86_64.tar.gz`

### E. Chạy Thử
note : ở đây để thuận tiện mình đã thay tên thư mục, nếu các bạn đang dùng máy ảo linux để thuận tiện thì nên cài thêm Putty

đầu tiên các bạn chạy ElasticSearch bằng cách truy cập vào đường dẫn `/bin/elasticsearch` bên trong thư mục elastic search :`./bin/elasticsearch` sau đó các bạn cần chờ đợi 1 phút để nó chạy xong (cứ chờ đi, nóng nảy dễ lỗi mà:stuck_out_tongue_closed_eyes:)

sau đó các bạn dùng putty để mở thêm một màn hình khác (dùng để kiểm tra xem nó chạy OK chưa) , dùng câu lệnh `curl 127.0.0.1:9200` do thằng elastic nó chạy port 9200 mà

![Bạn thấy nó ghi tagline không: For Search thôi](https://images.viblo.asia/235f4abc-7363-49e8-8890-4a2bb6f8dc92.PNG)

tiếp theo là chạy kibana ta cũng vào file `./bin/kibana` để chạy nó, lần này cũng phải chờ

lưu ý: bạn có thể mở nó trên máy windows (máy chủ) nếu 2 máy ping được với nhau các bạn vào link này: http://<IP của bạn>:5601/app/home#/
![Hello Kibana Nào](https://images.viblo.asia/73a6c1ad-f3fd-4fc7-bc0e-56cc06d6fdff.PNG)

### F. Một số lưu ý nhỏ

các bạn nào bị lỗi thì cần phải chú ý cái lưu ý này của mình:

lưu ý 1: các bạn cần phải mở ElasticSearch trước Kibana 
lưu ý 2: nếu các bạn không vào được kibana thì có thể làm theo hướng dẫn sau:

cho phép các cổng đi qua thông qua việc mở firewall
`
sudo ufw allow 5601/tcp – cho phép cổng 5601 tcp qua
sudo ufw allow ssh
`
tiếp theo, vào file `./config/kibana.yml` sửa phần phần `server.host=”0.0.0.0”`

![sửa chỗ này](https://images.viblo.asia/5fa7441a-7e3e-4359-b7e9-93fd1f781880.PNG)


## 7. Tổng kết
vậy là trên đây là phần 1 của mình, cũng là phần giới thiệu và hướng dẫn cài đặt ElasticSearch, mình dự định trong phần sau sẽ tiếp tục với windows cũng như hướng dẫn một số câu lệnh query cơ bản, nếu có gì sai sót mong các bạn có thể góp ý để mình sửa đổi vì mình cũng chỉ mới là newbie cả trong lĩnh vực lập trình và viablo-er


## 8. Tham Khảo

- Giới thiệu Elastic - https://topdev.vn/blog/elasticsearch-la-gi/
- Cài Đặt và Giới Thiệu (Bằng tiếng anh) - https://www.tutorialspoint.com/elasticsearch/elasticsearch_installation.htm