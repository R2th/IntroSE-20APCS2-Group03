## Giới thiệu
Trong một ứng dụng thì Database luôn là phần quan trọng nhất, nếu ta chỉ xây dựng một ứng dụng đơn giản thì việc tự cài đặt Database không gì khó khắn, nhưng nếu để xây dựng một ứng dụng phục vụ được hàng triệu người dùng thì để tự cài và quản lý được cụm Database là một công việc không hề dễ dàng. Do đó nếu điều kiện cho phép thì các bạn nên sử dụng các dịch vụ Database của Amazon Web Services, nó sẽ giúp công việc của ta trở nên dễ dàng hơn rất nhiều.

![](https://images.viblo.asia/8e86c647-7165-4e2b-994a-3459861b7bd5.png)

AWS cung cấp cho ta khá nhiều các dịch vụ Database khác nhau, và để biết được AWS có các dịch vụ Database nào thì hãy cùng nhau tìm hiểu trong bài này.

## AWS Database
Database trên AWS sẽ có các loại như sau:
+ Relational databases.
+ Document databases.
+ Wide-column store databases.
+ Indexing and search services.
+ In-memory databases.
+ Graph databases.
+ Time-series databases.

## Relational Databases
Đây là loại database rất quen thuộc với chúng ta, đối với loại database này thì AWS cung cấp cho chúng ta dịch vụ Amazon Relational Database Service (AWS RDS).

Những tính năng nổi bật của AWS RDS là dễ dàng sử dụng, có chế độ primary và replicas để tăng tốc tốc độ truy vấn vào database, tính khả dụng cao, bảo mật cao, ...

![image.png](https://images.viblo.asia/3b805883-511e-42e1-ae22-b2d2379a9e42.png)

AWS RDS có 3 loại:
+ **Community** (Postgres, MySQL, MariaDB): Amazon cung cấp RDS với ba dịch vụ mã nguồn mở khác nhau là Postgres, MySQL, MariaDB. Đây là những database rất phổ biến trong cộng đồng.
+ **Aurora** (Postgres, MySQL): Đây là loại database mà AWS phát triển dựa trên Postgres, MySQL. Aurora sẽ có các tính năng nổi trội hơn khi ta sử dụng AWS RDS Postgres và MySQL thông thường, như là: tốc độ xử lý nhanh hơn 5.x so với MySQL và 3.x so với Postgres thông thường.
+ **Commercial** (Oracle, SQLServer): Hai loại này thì khá đặc thù một chút, các bạn cũng biết là mối quan hệ của AWS và Oracle cũng không tốt đẹp mấy `:)))`. Nhưng ta vẫn có thể sử dụng Oracle và SQLServer trên Amazon.

## Document databases
Đây là loại database xuất hiện sau relational database, thường được gọi tới với cái tên là *NoSQL Databases*, dữ liệu trong document databases được lưu dưới dạng structured hoặc semi-structured.

Ví dụ như là dạng Extensible Markup Language (XML), JavaScript Object Notation (JSON), hoặc Binary JavaScript Object Notation (BSON), đây đều là các định dạng phổ biến.

Ta thường sử dụng document database cho:
+ Content management systems
+ E-commerce applications
+ Analytics
+ Blogging applications

Không nên sử dụng cho:
+ Các dữ liệu có quan hệ lồng kép nhau và yêu cầu viết câu truy vấn phức tạp.
+ Ứng dụng OLTP.

Đối với document database thì AWS cung cấp cho ta dịch vụ AWS Dynamo DB.

![image.png](https://images.viblo.asia/674cc474-d875-41a6-894a-8ae526e97880.png)

Một số tính năng nổi bật của Dynamo DB:
+ Truy vấn nhanh, có thể lên tới hàng microsecond nếu sử dụng với *DynamoDB Accelerator (DAX)*.
+ Có thể triển khai ở multi region 
+ Multi-master.
+ Có hỗ trợ ACID transactions.

Nếu biết sử dụng thì Dynamo DB có thể hỗ trợ tới 20 triệu request mỗi giây.

## Wide-column store databases
Loại database này thì có thể không quen thuộc với nhiều người. Có thể nói Wide-column databases cũng là một dạng của NoSQL databases, khác biệt ở chỗ là dữ liệu nó lữu trữ có thể lên tới hàng petabyte.

![image.png](https://images.viblo.asia/695ad689-a412-4e86-9f42-731451933601.png)

Ta thường sử dụng wide-column database cho:
+ Sensor logs và IoT.
+ Ứng dụng ghi logs.
+ Dữ liệu cần ghi nhiều nhưng ít khi cập nhật.
+ Ứng dụng yêu cầu độ trễ thấp.

Không nên sử dụng cho:
+ Ứng dụng mà yêu cầu joins table quá nhiều.
+ Ứng dụng yêu cầu thay đổi liên tục.
+ Ứng dụng OLTP.

Đối với wide-column database thì AWS cung cấp cho ta dịch vụ Amazon Managed Apache Cassandra Service (AWS MCS, Amazon Keyspaces).

![image.png](https://images.viblo.asia/e6e78a6e-660e-4f05-8144-4de73d574fcf.png)

Một số tính năng nổi bật của Amazon Keyspaces:
+ Tự động mở rộng.
+ Tính khả dụng cao.
+ Độ trễ thấp.

## Searching Database
Đây là loại database chuyên dùng cho tìm kiếm. Thông thường trong một ứng dụng thì khi tìm kiếm trong một dữ liệu cực kì lớn thì ta sẽ không dùng database như Postgres, MySQL hoặc MongoDB, mà ta sẽ lưu các dữ liệu đó vào searching database và khi tìm kiếm dữ liệu thì ta sẽ truy vấn vào database này, một thằng searching database rất nổi tiếng là Elasticsearch.

Đối với searching database thì AWS cung cấp cho ta dịch vụ AWS Opensearch.

![image.png](https://images.viblo.asia/e6a1688e-36a4-4658-8254-91f40a51654d.png)

Đây là dịch vụ mà AWS phát triển dựa trên Open Source Elasticsearch.

## In-memory databases
Loại database này sẽ lưu dữ liệu trong RAM thay vì trong ổ cứng, mục đích của việc này là để tăng tốc độ truy cập dữ liệu. Khi ta phát triển ứng dụng với hàng triệu người dùng thì ta không chỉ sử dụng database thông thường mà cần phải kết hợp với in-memory databases nữa.

Ví dụ khi ta truy vấn một dữ liệu phức tạp và tốn thời gian thì thay vì lần nào ta cũng phải thực hiện lại câu truy vấn, thì ta chỉ việc lưu kết quả của câu truy vấn vào trong in-memory databases và lần sau nếu cần thì ta chỉ cần lấy ra sử dụng. Một vài  in-memory databases nổi tiếng là Redis và Memcached.

![image.png](https://images.viblo.asia/d9013d55-6521-422e-ba48-3b212fe57364.png)

Đối với in-memory databases  thì AWS cung cấp cho ta dịch vụ AWS ElastiCache. AWS ElastiCache hỗ trợ cho ta cả hai databases là Redis và Memcached.

![image.png](https://images.viblo.asia/31100184-eab8-48e3-af1b-a4a3ad41e6ef.png)

## Graph databases
Chắc chúng ta cũng hay nghe tới thuật ngữ GraphQL, nhưng GraphQL không phải là Graph databases. Graph databases là một dạng cơ sở dữ liệu dạng graph, thường được sử dụng khi các dữ liệu của ta có mối quan hệ với nhau khá phức tạp. Ví dụ như phần bạn bè và gợi ý kết bạn trên *facebook* có thể sử dụng graph databases để thực hiện.

![image.png](https://images.viblo.asia/050e4fe8-2257-42cb-9b6c-5db6af195eb6.png)

Đối với graph databases thì AWS cung cấp cho ta dịch vụ AWS Neptune. Một số tính năng nổi bật của AWS Neptune là:
+ Hỗ trợ read replicas.
+ Backup sử dụng Amazon S3.
+ Point-in-time recovery.

Khi sử dụng AWS Neptune thì các công việc mà ta thường làm bằng tay như hardware provisioning, software patching, software setup thì AWS sẽ làm cho ta.

## Time-series databases
Đây là loại database được thiết kế để lưu trữ dữ liệu dạng sự kiện, ví dụ như là Prometheus cũng là một dạng time-series databases, nó được dùng để lưu trữ dữ liệu về tình trạng của hệ thống ở một thời điểm nhất định.

Thông thường dữ liệu trong time-series databases sẽ được dùng để ta biết được ở thời điểm đó việc gì đã xảy ra và xảy ra trong bao lâu.

![image.png](https://images.viblo.asia/a09ce418-356e-491d-a358-61587b4e89fe.png)

Đối với time-series databases thì AWS cung cấp cho ta dịch vụ Amazon Timestream, ra mắt vào năm 2020 nhưng thật sự thì dịch vụ này rất ít người biết tới.

![image.png](https://images.viblo.asia/c8959fe5-d623-420e-b4ce-85959d796fa8.png)

Ta có thể sử dụng Amazon Timestream kết hợp với các dịch vụ khác như là AWS Kinesis, AWS MSK để thiết kế một ứng dụng theo kiến trúc Event Driven.

Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé 😁.

## Kết luận
Ở trên là các dịch vụ database phổ biến của AWS mà mình đã tìm hiểu và nghe nói qua, nếu các bạn còn biết cái nào thì bình luận ở dưới cho mọi người biết với nhé.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).