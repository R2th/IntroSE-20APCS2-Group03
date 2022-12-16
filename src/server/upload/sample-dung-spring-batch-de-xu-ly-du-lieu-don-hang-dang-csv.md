Xin chào các bạn, hôm nay mình xin được chia sẻ kinh nghiệm nhập môn về Spring Batch.
Tham khảo :
https://spring.io/guides/gs/batch-processing/

Mình mới bắt đầu tìm hiểu về tạo Batch dùng Spring Framework gần đây. Mình viết blog này để củng cố lại những gì đã học cũng như hi vọng có ích với các bạn cũng cùng mong muốn tìm hiểu.

# 1.Bài toán 
Ta giả sử bài toán là ta có một cửa hàng bán đồ điện tử, hàng ngày các order được ghi lại và log dưới dạng csv bởi nhân viên cửa hàng.

Tuy nhiên hệ thống chưa có chức năng để nhập liệu các csv này vào database, cần một batch chạy mỗi cuối ngày để làm công việc này.

## 1.1.(Input) Nội dung csv order

orders.csv
```
customer_id,item_id,item_name,item_price,purchase_date
1,1,10000000,asus notebook,2020/07/16 8:00:00
1,2,12000000,macbook pro 13 inch,2020/07/16 9:00:00
2,2,12000000,macbook pro 13 inch,2020/07/16 10:00:00
2,3,15000000,macbook pro 15 inch,2020/07/17 10:00:00
```

Nội dung file này thể hiện từng customer đã mua từng item với giá bao nhiêu vào ngày nào.

Ví dụ dòng 1 thể hiện ý nghĩa là customer số 1 đã mua item số 1 tên là asus notebook vào thời điểm 2020/07/16 8:00 với giá 10.000.000 triệu.

## 1.2.(Ouput) Nội dung dữ liệu thống kê

Ta lưu dữ liệu thống kê dưới dạng một bảng SQL, và ta mong muốn dữ liệu ứng với **orders.csv** sẽ trông như sau :

id | customer_id | item_id |item_name | item_price | purchase_date 
--- | --- | --- | --- | --- | --- 
1 | 1 | 1 | asus notebook |  10000000 | 2020/07/16
2 | 1 | 2 | macbook pro 13 inch | 12000000 | 2020/07/16
3 | 2 | 2 | macbook pro 13 inch | 12000000 | 2020/07/17
4 | 2 | 3 | macbook pro 15 inch | 15000000 | 2020/07/17

Nội dung bảng này thể hiện từng item đã được mua tổng số bao nhiêu cái theo từng ngày.

Và công việc của ta là tạo ra batch để tạo ra output tương ứng với input trên.

Note : Để thực hiện nghiệp vụ trên, không nhất thiết ta phải dùng batch mà có thể dùng chức năng web.

Tuy nhiên với mục đích là trải nghiệm Spring Batch nên ta giả sử với điều kiện đặc thù là ta cần dùng batch.

# 2.Chuẩn bị
Môi trường trên máy host của mình như sau, các bạn có thể tham khảo phù hợp cho máy của mình

+ OS : MacOS (Macbook Pro)
+ Java

```
java version "12.0.2" 2019-07-16
Java(TM) SE Runtime Environment (build 12.0.2+10)
Java HotSpot(TM) 64-Bit Server VM (build 12.0.2+10, mixed mode, sharing)
```
+ IDE : Spring Tool 4 For Eclipse
https://spring.io/tools

Mình cũng đã dùng thử trên VS Code mà không thấy tính năng tự động import (Import Organization) không hiệu quả lắm nên chuyển sang Eclipse. Về IDE thì dùng IntellJ có lẽ rất tốt nhưng bản Community không hỗ trợ Spring nên mình thôi.

# 3.Implement
## 3.1.Khởi tạo
Mình sẽ dùng Spring Initialzr để tạo boilerplate cho project.
https://start.spring.io/

![](https://images.viblo.asia/c84855fc-6398-448c-b821-1690b96103d1.png)


Các lựa chọn 
+ Project : Maven 
    + Mặc dù ngày nay có vẻ Gradle được dùng nhiều hơn nhưng vì lý do cá nhân nên mình chọn Maven
+ Language : Java 
    + Mình chọn Java để phát triển
+ Dependence : Spring Batch + Mysql Driver
    + Dependence chủ đạo của project là Batch nên ta chọn Spring Batch
    + Database mình dùng là Mysql nên mình chon Driver tương ứng
    + Spring Data JPA có vẻ layer data giúp thao tác với Driver Mysql thuận tiện hơn, mình cũng không hiểu lắm nhưng thấy có vẻ cần theo suggest tutorial về mysql nên thêm vào.
+ Những lựa chọn khác tuỳ cá nhân

Xong ta chọn Generate, file nén project là demo.zip sẽ được download về.

Về local, mình `unzip` và đặt vào directory tương ứng, đặt con trỏ thao tác terminal ở đây.

## 3.2. Tạo database Mysql bằng (Docker)
Batch sẽ trỏ đến database bằng Mysql nên mình sẽ tạo database này, mình chọn Docker để chứa database này.

Nếu các bạn đã có mysql trên máy host thì có thể bỏ qua bước này.

### 3.2.1.Tạo docker-compose.yml
Cấu trúc database
docker-compose.yml là file cấu trúc môi trường docker. Mình tạo mới ở trong project với nội dung như sau :

`demo/docker-compose.yml`

```
version: '3'

services:
  database:
    image: mysql:8.0
    volumes:
      - ./db/dbdata:/var/lib/mysql
    command: ['--character-set-server=utf8mb4', '--collation-server=utf8mb4_unicode_ci','--default-authentication-plugin=mysql_native_password']
    environment:
      MYSQL_DATABASE: demo
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: demo
      MYSQL_PASSWORD: demo
    ports:
        - "33061:3306"
  ```

Trong đó thông tin cơ bản để access từ máy host sẽ là :
+ Host : 0.0.0.0
+ Tên database : demo
+ Tên user : demo
+ Password : demo

Cấu trúc thư mục :

```
demo/
    ...
    docker-compose.yml
    db/
    ...
```

### 3.2.2.Khởi tạo các bảng
Hiện tại vẫn chưa có database hay bảng nào, batch gọi đến sẽ không thực hiện được query nào nên mình tạo dữ liệu ban đầu cần thiết 

Access từ máy host :
```
$ mysql -u demo -P 33061 -p
Enter Password: <Nhập "demo">
mysql> use demo;
```
Tạo bảng cần thiết :
```
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT(12) NOT NULL,
  item_id INT(12) NOT NULL,
  item_name VARCHAR(50),
  item_price INT(12) NOT NULL,
  purchase_date DATETIME
);

Query OK, 0 rows affected, 3 warnings (0.05 sec)
```

Vậy ta đã chuẩn bị database xong. Tiếp đến là phần chính tạo Batch.

## 3.3.Import project 
Ở 3.1 ta đã tạo project tên demo, tiếp theo ta sẽ dùng eclipse import vào dạng Maven Project.

![](https://images.viblo.asia/4be91214-dd6a-4289-914d-3cd128f86ed7.png)

Import > Maven > Existing Maven Project.

Vậy là ta có import xong, tiếp theo ta sẽ viết source code cho chương trình.

## 3.4.Thiết kế
Chương trình ta xây dựng sẽ có kiến trúc như sau :

![](https://images.viblo.asia/cf4ced4e-086e-4306-8cda-dc74e4a551c5.jpg)

Ý nghĩa các thành phần

+ **BatchProcessingApplication** : Entrypoint của chương trình, chương trình sẽ bắt đầu chạy từ class này (Trong này có hàm main). Với việc đánh annotation @SpringBootApplication ta sẽ báo cho framework biết đây là 1 app spring boot và cần spring tự autoload các class config cần thiết khác mà cụ thể là BatchConfiguration.
+ **BatchConfiguration** : Như tên gọi, class này là mô tả cấu hình cho chương trình. Batch của chúng ta sẽ gọi đến các xử lý theo trình tự nào sẽ được mô tả ở đây.
+ **(Job) importOrderJob** : Ta có thể hiểu là 1 batch sẽ chạy nhiều job, và chương trình của mình đơn giản nên chỉ có 1 job duy nhất mô tả ở hàm này với ý nghĩa là import file csv vào database.
+ **(Step) step1()** : Trong 1 job sẽ có nhiều step, chương trình của mình đơn giản nên chỉ có 1 step tên là step1, thực tế ta có thể có nhiều step hơn.
+ **(ItemReader) reader()** : Mô hình cơ bản của 1 batch đó là "đọc input" --> "xử lý input" --> "xuất đầu ra", với flow 3 bước như vậy thì reader chính là bước đầu tiên "đọc input". Step1 được chia nhỏ hơn thành 3 sub step như vậy và sub step đầu tiên là reader.
+ **(ItemProcessor) processor()** : Đây là bước xử lý đầu vào từ reader(). Chương trình của mình hiện tại không có xử lý gì đặc biệt nhưng thực tế ta có thể có nhiều cách xử lý ví dụ như transform kiểu dữ liệu.
+ **(ItemWriter) writer()** : Sau khi dữ liệu được dữ liệu được xử lý xong, ta sẽ lưu chúng vào DB ở hàm này. 
+ **(Repository) OrderRepository** : Trong Spring để lưu 1 Entity ta sẽ cần 1 wrapper bao chúng là Repository, OrderRepository chính là wrapper cần phải tạo này.
+ **(Entity) Order** : Đây là Entity thể hiện table ta cần lưu dữ liệu vào, trong trường hợp này vì nội dung cũng giống với từng field trong csv đầu vào nên class này cũng dùng chung để cả reader và Writer xử lý.

## 3.5.Viết xử lý
### 3.5.1.Tạo Entity 
Ta sẽ tạo một class để lưu từng từng record csv, đặt tên là `Order.class`

Class này chỉ nêu các trường ứng với từng column trong csv cũng như trong table orders.

Các phương thức chỉ có setter và getter.

**com.example.demo.batchprocessing.Order.java**

```
package com.example.demo.batchprocessing;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private Integer customerId;

	private Integer itemId;
	
	private String itemName;

	private Integer itemPrice;
	
	private String purchaseDate;

    ....
    // Setter + Getter　
    ...
}
```

Thêm annotation @Entity đánh dấu cho Spring biết đây là một Entity thể hiện tương ứng với một table

Vì bảng mình tạo đặt tên theo kiểu số nhiều nên mình cần thêm chỉ định `name="orders"` nữa 

### 3.5.2.Tạo Repository
Repository là cấu trúc thực hiện lưu entity vào DB trong Spring, không có Repository ta sẽ không thể thực hiện các thao tác lên Entity phản ánh lên DB.

**com.example.demo.batchprocessing.OrderRepository**

```
package com.example.demo.batchprocessing;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {
	
}
```

CrudRepository là interface khi khởi tạo nhận 2 tham số, tham số đầu là Entity nên ta đặt là Order, tham số thứ 2 là kiểu dữ liệu khoá chính (id), ở đây kiểu của orders.id là Integer nên ta đặt là Integer.

Ta cũng đánh dấu @Repository để Spring biết đây là một Repository

### 3.5.3.Tạo BatchConfiguration

**com.example.demo.batchprocessing.BatchConfiguration**

```
package com.example.demo.batchprocessing;

import ....

@Configuration
@EnableBatchProcessing
public class BatchConfiguration {
	
	@Autowired
	public JobBuilderFactory jobBuilderFactory;
	
	@Autowired
	public StepBuilderFactory stepBuilderFactory;

	@Autowired
	private OrderRepository orderRepository;
	
	@Bean
	public ItemReader<Order> reader() {
		return new FlatFileItemReaderBuilder<Order>()
			.name("orderItemReader")
			.resource(new ClassPathResource("orders.csv"))
			.delimited()
			.names(new String[] {"CustomerId", "ItemId", "ItemPrice", "ItemName", "PurchaseDate"})
			.fieldSetMapper(new BeanWrapperFieldSetMapper<Order>() {{
				setTargetType(Order.class);	
			}})
			.build();
	}
	
	@Bean
	public ItemProcessor<Order, Order> processor() {
		return new ItemProcessor<Order, Order>() {
			
			@Override
			public Order process(final Order order) throws Exception {
				return order;
			}
		};
	}
	

	@Bean
	public ItemWriter<Order> writer() {
		RepositoryItemWriter<Order> writer = new RepositoryItemWriter<>(); 
		writer.setRepository(orderRepository);
		writer.setMethodName("save");
		return writer;
	}
```

+ **ItemReader<Order> reader()** : Chúng ta cần đọc nội dung file csv nên trường hợp này ta sẽ chọn tạo reader kế thừa từ interface ItemReader là **FlatFileItemReader** hỗ trợ đọc file line by line. 
    + Ta cũng mô tả source nằm ở "orders.csv" (trong src/main/resource).
    + Ta cũng mô tả các tên cho các trường này ở **names()**
    + Các line đọc được csv sẽ được mô hình hoá vào class **Order**
+ **ItemProcessor<Order> processor()** : Ta tạo hàm thực hiện xử lý nội dung từng order đọc được từ reader. Hiện tại mình không có xử lý gì nên return luôn order đọc được.
+ **ItemWriter<Order> writer()** : Với từng order được xử lý processor ta sẽ viết xử lý để lưu chúng vào database. Spring đã cung cấp sẵn class kế thừa interface ItemWriter tiện dụng cho việc này là **RepositoryItemWriter**, ta chỉ cần thiết lập tương ứng.

Tiếp theo ta sẽ tạo job duy nhất cho chương trình và step duy nhất cho job này.

```
	@Bean
	public Job importOrderJob()
	{
		return jobBuilderFactory.get("importOrderJob")
			.incrementer(new RunIdIncrementer())
			.listener(new JobCompletionNotificationListener())
			.flow(step1())
			.end()
			.build();
	}
	
	@Bean
	public Step step1() {
	  return stepBuilderFactory.get("step1")
	    .<Order, Order> chunk(10)
	    .reader(reader())
	    .processor(processor())
	    .writer(writer())
	    .build();
	}
```

+ Ta tạo **importOrderJob** trả về Job với thiết lập 
    + Đặt listener lắng nghe sự kiện khi chạy xong job : **listener(new JobCompletionNotificationListener())**
    + Gọi thực hiện step1

+ Tiếp theo tạo **step1()** thực hiện 1 flow từ reader đến writer
    + Khai báo 1 chunk xử lý là 10 record : chunk(10)
    + Khai báo các reader và processor, writer tương ứng.

### 3.5.4.Tạo JobCompletionNotificationListener
Ta sẽ tạo 1 listener lắng nghe xem khi nào job được thực hiện xong.

**com.example.demo.batchprocessing.JobCompletionNotificationListener**
```
package com.example.demo.batchprocessing;

import ....

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {
	
	private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

	@Override
	public void afterJob(JobExecution jobExecution) {
		if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
			log.info("!!! JOB FINISHED ");
		}
	}
}
```

Listener mình tạo chỉ có chức năng log ra là Job đã chạy xong "!!! FINISHED", do đó ta chỉ khai báo Logger và implement method **afterJob()** là được.

### 3.5.5.Tạo BatchProcessingApplication
Các thành phần chính của chương trình đã tạo xong, ta sẽ tạo EntryPoint chính của chương trình.
    
```
package com.example.demo.batchprocessing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BatchProcessingApplication {
	public static void main(String[] args) throws Exception {
		System.exit(SpringApplication.exit(
            SpringApplication.run(BatchProcessingApplication.class, args))
        );
	}
}
```
    
Thông thường ta sẽ cần khai báo batch config ở đâu, gọi run batch với config như vậy v.v... nhưng nhờ có vào đánh dấu annotation @SpringBootApplication Spring cung cấp, những công việc như vậy đã được giản lược. Spring tự discover được configure của batch nằm trong cùng cấu trúc package. Ta chỉ cần khai báo chạy chương trình `SpringApplication.run(BatchProcessingApplication.class, args))` là đủ.
    
### 3.5.6.Bỏ các class, xử lý mặc định
Khi tạo thành từ template mẫu từ Spring Initatilizr trong chương trình có sẵn EntryPoint và test class tương ứng cho nó.
Nếu giữ như vậy khi chạy thì batch sẽ báo lỗi không chọn được EntryPoint tương ứng nên ta sẽ điều chỉnh xoá EntryPoint mặc định này đi.
    
```
$ rm src/main/java/com/example/demo/DemoApplication.java
$ rm src/main/java/com/example/demo/DemoApplicationTests.java
```
    
 Ta tạo mới Unit Test cho chương trình đơn giản:
    
**com.example.demo.batchprocessing.test.DemoApplicationTests.java**
 ```
package com.example.demo.batchprocessing.test;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BatchProcessingTests {

	@Test
	void contextLoads() {
	}

}
 ```
    
Viết xử lý đến đây là xong!

## 4.Chạy chương trình
## 4.1.Khởi động database
Ta khởi động database bằng docker
```
$ docker-compose up -d
```
    
## 4.2.Chạy batch qua dòng lệnh
Ta có thể chạy qua dòng lệnh hay qua editor cũng không vấn đề gì. Qua dòng lệnh thì mình chạy như sau :
    
 ```
 $ ./mvnw spring-boot:run
 ```
    
 Lần đầu chạy có thể sẽ tốn thời gian để tải các thư viện liên quan về nhưng từ lần thứ 2 trở đi chạy sẽ rất nhanh.
    
 Kết quả chạy của mình như hình dưới đây:

![](https://images.viblo.asia/6f8acd2a-17a4-4474-a81f-bc5a351cfafb.png)

Kiểm tra trong database xem các order đã được tạo chưa.
 
```
$ mysql -h 0.0.0.0 -u demo -P 33061 -p demo

$ mysql> select * from orders;
+----+-------------+---------+---------------------+------------+---------------------+
| id | customer_id | item_id | item_name           | item_price | purchase_date       |
+----+-------------+---------+---------------------+------------+---------------------+
| 85 |           1 |       1 | asus notebook       |   10000000 | 2020-07-16 08:00:00 |
| 86 |           1 |       2 | macbook pro 13 inch |   12000000 | 2020-07-16 09:00:00 |
| 87 |           2 |       2 | macbook pro 13 inch |   12000000 | 2020-07-16 10:00:00 |
| 88 |           2 |       3 | macbook pro 15 inch |   15000000 | 2020-07-17 10:00:00 |
+----+-------------+---------+---------------------+------------+---------------------+
4 rows in set (0.00 sec)    
```

Các record được tạo giống như nội dung csv đã nêu. Như vậy ta hiểu batch thực hiện công việc OK.

## 5.Kết
Qua bài viết này mình đã chia sẻ đến mọi người cách mình thực hiện 1 chương trình batch đơn giản như trên, đọc file csv và insert vào database, hi vọng có ích cho cho các bạn nhập môn batch spring boot.
    
Có thể trong nội dung bài viết mình chưa nêu hết các nội dung cần thiết để chạy chương trình, các bạn có thể tham khảo qua repository sau.

https://github.com/mytv1/sample-spring-batch

Bài viết có thể còn nhiều thiếu sót, hi vọng nhận được góp ý từ các bạn.
    
Hết.

## 6.Tham khảo
https://spring.io/guides/gs/batch-processing

https://spring.io/guides/gs/accessing-data-mysql