## Note:  Bài viết mang tích chất lưu lại kiến thức để sử dụng sau, do mày mò khắp google nhặt mỗi nơi một tí mới giải quyết được, nếu bạn nào gặp vấn đề tương tự thì có thể tham khảo.

Số là mình bắt đầu thực hiện một dự án mới trên Spring Boot và cần làm việc với NoSQL, cụ thể là Mông Gô Đê Bê (MongoDB), Trước thì mình có đọc và tham khảo qua về SQL và NoSQL rồi, tuy nhiên mình chỉ làm việc với MySQL, SQL, Postgre, Oracle  - rặt một đám SQL. Đơn giản thì mình nghĩ chắc connect Mongo cũng thế thôi, vì JPA và Hibernate viết ra để dùng ALL In ONE mà. Cơ mà đâm đầu vào thì nó cũng mệt mỏi vãi đạn.

Những thứ cần chuẩn bị:

1 project Spring Boot maven hay gradle thì tùy, Mình xài gradle

Server Mongo ( Local cũng được)

Mongo Compass( Có cũng dc mà không cũng được)

IDE - tất nhiên ( M xài Intelij, bản 2020 trở lên tool mới hỗ trợ kết nối Mongo nhé)

 Trước tiên các bạn cần nhớ bảng trong Mongo không gọi là Table mà 

Table = Collection

Row = Documnent ( Cặp key value)

Còn vài thứ nữa các bạn tham khảo bài của bạn này nhé: [Hướng dẫn Mongo cơ bản](https://viblo.asia/p/mongodb-co-ban-phan-1-l5XRBVN3RqPe)

Ấy thế mà trong entity @Table lại thay bằng @Document chứ không có cái @Collection   :)) Méo hiểu.

CỤ thể thì các bước cần làm như sau

### 1 - Thêm dependencies:
Các bạn cần: 

```
org.springframework.data:spring-data-mongodb
org.mongodb:mongo-java-driver:3.12.11
```

### 2 - Config trong file yml

Chắc hẳn các bạn đã quyen với kiểu connect này:

```
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/cloudsigning
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password:
    jpa:
      hibernate:
        ddl-auto: create
        naming:
          implicit-strategy: org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy
          physical-strategy: org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategyserver
```


Nhưng cụ Mongo thì đi một đường riêng:

```
spring:
  data:
    mongodb:
      authentication-database: admin
      database: test
      host: localhost
      port: 27017 
```

Ồ, Good Jobs. Có vẻ ngắn gọn ra phết nhờ

Run cái coi. Lỗi sấp mặt lợn, và sau 10p mò mò à nó k dùng @ Table mà xài @ Document + Repository thì extends MongoRepository thay vì JpaRepository

### 3 - Entity - Chỉ cần @Id thôi nhé, không cần chỉ định column cũng dc. right

```
@Entity
@Document(value = "user")
public class UserAccount {
    @Id
    private Integer id;

    private String userName;
```

### 4- Repository 

```
@Repository
public interface UserAccountRepository extends MongoRepository<UserAccount,Integer> {

 }
```



### 5 - Config Mongo
===> có vẻ ổn nhờ, Run cái nữa nào --- lại lỗi-- Google tiếp. À lại config tiếp:

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class , MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})

== chạy thử, hơi giunnnnnn. Lại hẹo. Lần này lỗi có vẻ tường minh tí

Lỗi đây: *A component required a bean named 'mongoTemplate' that could not be found.*

Có vẻ thiếu Context không kiếm dc cái bean kia.
Lại mò GG tiếp
 Đây rồi, mò mãi mới kiếm được trên GitHub, chắc của mấy anh Ấn thần thánh
```
@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return env.getProperty("spring.data.mongodb.database");
    }

}
```

Run lại cái nào Úi xời mừng rơi nước mắt, chạy rồi :))))))))))))


Đấy, cụ thể là các bạn chú ý mấy cái nghớ nghẩn đó.

Và đặc biệt trong file pom/build không được thiếu thằng này nhé " org.mongodb:mongo-java-driver" , không có nó là cái  AbstractMongoClientConfiguration không có đủ client để run và hẹo luôn nha.
 Còn lại CRUD thì khả năng không khác các loại khác đâu, Query thì nhớ xài PLSQL nhá
 
 Có thể các bạn thấy mình viết đơn giản có ba lần "**Run thử phát xem **" là chạy mượt mà bày vẽ viết cái bài hướng dẫn. Thực tế thì mình mất xừ buổi tối để connect mà chả giải quyết được việc gì khác, " **Run thử **" cũng đâu đấy 10-20 lần nha :)))
  
 Thank!!!
 
 P/S bạn nào có cách ngắn hơn thì chỉ mình cái nhé