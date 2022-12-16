### Search Engine
Searching là một trong những chức năng quan trọng nhất hiện nay đặc biệt là trong bối cảnh Big Data ngày càng trở nên phổ biến. Do đó để đáp ứng nhu cầu ngày càng tăng về dữ liệu cũng như tốc độ tìm kiếm, rất nhiều phương thức search đã ra đời, nổi lên cả là Elasticsearch. Vậy Elasticsearch là gì?
Elasticsearch là một open source search engine có khả năng highly scalable. Nó cho phép chúng ta lưu trữ và phân tích một lượng lớn thông tin realtime. Elasticsearch làm việc với JSON documents files. Sử dụng iternal structure đặc trưng, nó có thể parse data của bạn một cách realtime và có thể search mọi thông tin mà bạn muốn.

Có khá nhiều dịch vụ lớn sử dụng Elasticsearch cũng như các cloud cũng đã tích hợp nhiều dịch vụ hỗ trợ Elastic Search. Một số ông lớn đang sử dụng như là Mozilla, GitHub, Stack Exchange, Netflix.

**Ưu điểm**

Structure được cấu trúc theo documents thay vì theo tables hay schema và ta có lợi ích có thể cảm thấy được là tốc độ và khả năng mở rộng của nó(scalability). Về khả năng mở rộng thì chúng ta có thể run trên laptop với hàng trăm server và hàng petabytes dữ liệu. Với những lí do đó thì Elasticsearch rất hiệu quả khi làm việc với lượng dữ liệu lớn và như cầu của các công ty hiện nay, hàng trăm ngàn bản ghi một cách realtime. Đó là cách mà Elastic Search làm được.

**Elasticsearch gồm có những gì**
1. **Cluster**
     là một tập hợp gồm một hoặc nhiều nodes, đồng thời chúng sẽ lưu trữ thông tin. Nó cung cấp khả năng lập chỉ mục (index) và tìm kiếm theo node, được xác định bằng một unique name. (default đường dẫn là '/elasticsearch'/)
2. **Node**
      là một single server bao gồm cluster, stores data và tham gia vào khả năng tìm kiếm cluster's indexing
3. **Index**
     trong Elasticsearch được thế kế để cho phép tìm kiếm full-text search. Các văn bản được phân tách ra thành từng từ có nghĩa sau đó sẽ map xem thuộc văn bản nào. Khi search tùy thuộc vào loại search sẽ đưa ra kết quả cụ thể. Ở đây mình có ví dụ:
 ```
1,The quick brown fox jumped over the lazy dog
2,Quick brown foxes leap over lazy dogs in summer
```
Ở đây Elasticsearch sử dụng một cấu trúc là inverted index, trước hết chúng ta sẽ phân chia nội dung của từng tài liệu thành các từ riêng biệt (gọi là terms), tạo một danh sách được sắp xếp của tất cả terms duy nhất, sau đó liệt kê tài liệu nào mà mỗi thuật ngữ xuất hiện. Kết quả như sau:
```
Term      Doc_1  Doc_2
-------------------------
Quick   |       |  X
The     |   X   |
brown   |   X   |  X
dog     |   X   |
dogs    |       |  X
fox     |   X   |
foxes   |       |  X
in      |       |  X
jumped  |   X   |
lazy    |   X   |  X
leap    |       |  X
over    |   X   |  X
quick   |   X   |
summer  |       |  X
the     |   X   |
------------------------
```
Bây giờ nếu ta muốn tìm kiếm từ khóa quick brown, chúng ta chỉ cần tìm trong các tài liệu đó mỗi thuật ngữ có xuất hiện hay không. Kết quả ta thu được:
```
Term      Doc_1  Doc_2
-------------------------
brown   |   X   |  X
quick   |   X   |
------------------------
Total   |   2   |  1
```

Như các bạn đã thấy, cả 2 đoạn văn bản đều thích hợp với từ khóa. Tuy nhiên có thể dễ dàng nhận ra rằng Doc_1 chính xác hơn nhiều.

4. **Shard**
     là đối tượng của Lucene, là tập con các documents của 1 Index. Một Index có thể được chia thành nhiều shard.
    Mỗi node bao gồm nhiều Shard. Chính vì thế Shard là tối tượng nhỏ nhất, hoạt động ở mức thấp nhất, đóng vai trò lưu trữ dữ liệu.
    Chúng ta gần như không bao giờ làm việc trực tiếp với Shard vì Elasticsearch đã hỗ trợ việc giao tiếp cũng như thay đổi Shard khi cần thiết.
    Có 2 loại Shard là: primary shard và reploca shard.
5. **Documents**
    Là một đơn vị thông tin cơ bản( basic unit of information), có thể được index và biểu thị bằng JSON.
### Cài đặt
Ở đây mình sẽ tạo file docker-compose.yml để chạy server của Elasticsearch nhé. Chi tiết về Docker cũng như Docker Compose mình có viết ở [đây](https://viblo.asia/p/lam-viec-voi-docker-RnB5pJNbZPG) 

Sau đó hãy copy những dòng này vào file docker-compose.yml:
```
version: “3.0”
services:
elasticsearch:
container_name: es-container
image: docker.elastic.co/elasticsearch/elasticsearch:7.11.0
environment:
— xpack.security.enabled=false
— “discovery.type=single-node”
networks:
— es-net
ports:
— 9200:9200
kibana:
container_name: kb-container
image: docker.elastic.co/kibana/kibana:7.11.0
environment:
— ELASTICSEARCH_HOSTS=http://es-container:9200
networks:
— es-net
depends_on:
— elasticsearch
ports:
— 5601:5601
networks:
es-net:
driver: bridge
```

Sau đó ta chạy lệnh: `docker-compose up -d`

![image.png](https://images.viblo.asia/9858bf95-322c-44de-8fda-0faa2c90f282.png)


Như hình là đúng rồi nhé, ta có thể vào http://localhost:5601/app/home#/ để xem thành quả.

Nếu các bạn muốn stop thì sử dụng lệnh sau
```
docker-compose down 
```

### Thao tác cơ bản với Elasticsearch và Kibana
Các bạn vào phần dev tools để thao thác nhé:
Đầu tiên chúng ta có thể kiểm tra trạng thái của Elasticsearch với command như sau:
```
GET /_cat/health?v
```
![image.png](https://images.viblo.asia/b51fad60-ae62-4c67-bd93-0220200097c5.png)
Chúng ta sẽ có phần status green. Ở đây Green và Yellow thì cluster đó đang trong trạng thái bình thường
Sử dụng indices để tìm các truy vấn của elasticsearch (thêm v để dữ liệu xuất ra được đẹp và dễ nhìn hơn)
```
GET /_cat/indices?v
```
Kết quả trả về ta có:
![image.png](https://images.viblo.asia/6aff3111-3603-4a34-83e4-4b4d65f7713d.png)
Tiếp đến mình sẽ tạo một index mới cho elasticsearch nhé
![image.png](https://images.viblo.asia/dba1f84d-78d4-4d47-b7f0-be0e181bfd3a.png)
Chạy get /cat/indices?v  lần nữa ta sẽ thấy index vừa put đã xuất hiện:
![image.png](https://images.viblo.asia/f3ee73b1-6ba0-4b37-939e-d1ae78b750f8.png)
Bạn có thể thấy mình đã tạo khác nhiều index sẵn trong đây, để cho dễ nhìn mình sẽ xóa index player ở dưới cùng nhé. Các bạn hãy luôn lưu ý trong việc xóa bất kỳ một cái gì đó nhe vì việc xóa rồi sẽ không khôi phục lại và có thể ảnh hưởng đến một cấu trúc của project.
![image.png](https://images.viblo.asia/acc70389-a0e4-47e4-8267-e18311dd1ee9.png)
Kiểm tra lại ta thấy index player của mình đã ~~bay màu~~ rồi :D :
![image.png](https://images.viblo.asia/69fd21f1-141b-4f26-90c8-6cf3f8e59de6.png)
Tiếp theo là mình sẽ làm việc với json. Ở đây mình sẽ thử chuyển sang dùng lệnh curl trên terminal, các bạn có thể tạo ra dòng curl thông qua elastisearch với nút cờ lê gần nút play nhé:
![image.png](https://images.viblo.asia/1bd67114-d360-4413-8a56-f70ec02e234a.png)
Đây là terminal của mình( Các bạn nhớ thay es-container = localhost nhe):
![image.png](https://images.viblo.asia/a1ec682d-db77-42d7-9e52-2c0c29756677.png)
Thông tin trả về successful là thành công rồi nhé. Ở trong student/doc/1 chúng ta có index student với một document có id là 1 và 2 key name, age, 2 value là tên mình và tuổi để các bạn có thể hình dung được chúng ta đang làm gì.
![image.png](https://images.viblo.asia/8b45ffad-08a1-4afe-8270-2b84a56d0c8e.png)
Ở đây index student của mình đã được cập nhật với 1 document trong đấy.
![image.png](https://images.viblo.asia/98a4a86b-b4e3-407d-839b-e8a114514e5b.png)
Mình tìm kiếm một index mà mình đã tạo với id là 3 với command như trên. Sau đó mình sẽ tiến hành update thông tin, ở đây result sẽ trả về là "updated" nếu mình gõ đúng command:
![image.png](https://images.viblo.asia/ee6949c2-abcd-4b64-9c15-381c7d171713.png)

Tiếp theo là xóa id1 mà ta đã tạo ở trên nhe:

![image.png](https://images.viblo.asia/2af0ba53-3fc5-40ea-9c0c-b19e385e8cae.png)

Như vậy là ta đã đi sơ qua về các thao tác trên elasticsearch, có thể các chỉ dẫn của mình hơi cùi nhưng hy vọng có thể phần nào giúp ích được cho các bạn. Thanks for reading, have a nice day <3
Bài viết đã tham khảo:

ELS03 - Tạo và cập nhật Index, Document trong Elasticsearch: https://www.youtube.com/watch?v=JOZ41DtKcNw&list=PLwJr0JSP7i8AgjUjKnecVUN2i3txuS-1J&index=7

Elastic Search là gì? Tìm hiểu về Elastic Search:  https://medium.com/@duynam_63755/elastic-search-l%C3%A0-g%C3%AC-t%C3%ACm-hi%E1%BB%83u-v%E1%BB%81-elastic-search-a3923c2eb411

Tích hợp Elasticsearch và Kibana vào Docker-Compose:  https://viblo.asia/p/tich-hop-elasticsearch-va-kibana-vao-docker-compose-Az45bymqlxY