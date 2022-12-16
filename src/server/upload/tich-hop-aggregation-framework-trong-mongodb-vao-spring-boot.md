# Lời mở đầu
Như chúng ta đã biết, việc sử dụng Aggregation  trong mongoDb để thực hiện xử lý dữ liệu trong MongoDb là rất cần thiết. Đây là một framework mạnh mẽ linh hoạt trong quá trình truy vấn và xử lý dữ liệu với các toán tử mạnh mẽ cũng như hỗ trợ xử lý dữ liệu với số lượng lớn. Loạt bài trước, tác giả đã miêu tả tổng quan về Aggregation framework trong mongoDb. Các bạn có thể tìm hiểu tại 
đây : https://viblo.asia/p/tim-hieu-ve-aggregation-framework-trong-mongodb-Az45brRV5xY  .  Bài viết này sẽ đi sâu vào tìm hiểu cách tích hợp Aggregation vào Spring để có thể linh hoạt hơn trong việc xử lý dữ liệu
# Các lưu ý cần thiết
## Các công cơ bản.
 - Maven
 - Spring boot  
 - Database : MongoDb (có thể download tại https://www.mongodb.com/download-center/community lựa chọn hệ điều hành phù hợp và download)
-  Dependency :  Spring boot web , Spring boot data mongodb
- Robo3T
- Postman
## Lưu ý
- Trong loạt bài viết này sẽ trình bày xử lý Aggregation trong spring. Các thao tác xử lý cơ bản như CRUD sẽ không được đề cập trong bài viết này. Các bạn có thể tìm hiểu thêm trên internet. Về mặt cơ bản các toán tử CRUD trong mongoDb vẫn xử lý tương tự như trong hệ cơ sở dử liệu (RDBMS). Bài viết này sẽ trình bày thêm về việc xử lý dữ liệu dựa vào Cursor để xử lý các bản ghi vượt quá 16mb.
## Các thuật ngữ thường dùng trong bài viết
Khác với hệ cơ sở dữ liệu RDBMS, Spring data MongoDb dùng  thuật ngữ khác để thực hiện ánh xạ, xử lý và thao tác trên MongoDb, Dưới đây là bảng so sánh giữa 2 hệ cở sở dữ liệu và sự khác nhau của nó

| MongoDb | RDBMS | Ý nghĩa |
| -------- | -------- | -------- |
|Document     | Entity     | Đánh dấu đây là một lớp có thể thực hiện thao tác ánh xạ và xử lý dữ liệu với database, xác định tên Document   |
|Field     | Column     | Xác định tên cột(với  RDBMS ) hoặc tên trường với MongoDb để thực hiện ánh xạ |

Bài viết sẽ thực hiện dùng Aggregation thao tác với Collection DB tên là Employees gồm các thông tin như phía dưới :

```
/* 1 */
{
    "_id" : ObjectId("5daa7b6cd20119058c403b85"),
    "firstName" : "A",
    "lastName" : "Nguyen Van",
    "age" : 25,
    "location" : "DN",
    "salary" : 22.2
}

/* 2 */
{
    "_id" : ObjectId("5daa7b6cd20119058c403b86"),
    "firstName" : "B",
    "lastName" : "Tran Van",
    "age" : 27,
    "location" : "HN",
    "salary" : 22.7
}

/* 3 */
{
    "_id" : ObjectId("5daa7b6cd20119058c403b87"),
    "firstName" : "C",
    "lastName" : "Le Van",
    "age" : 28,
    "location" : "DN",
    "salary" : 80.2
}
```

# Thực hiện 

Trước tiên cần tiến hành tạo một project bằng spring boot bằng cách truy cập vào trang start.spring.io với các thông tin cấu hình như phía dưới :
![](https://images.viblo.asia/3dc7a104-fca7-4432-9dbd-4a4c2dcd503c.PNG)

Về thông tin cấu hình :  Group và Artifact có thể tùy chọn đặt tên . Tuy nhiên nên đặt theo quy tắc :   com.tên company hoặc cá nhân. tên project muốn đặt.  Ở mục Dependencies chọn 2 dependency là Spring Web và Spring Data Mongo Db. Dependency Lombok có thể tùy chọn có hoặc không.

Tiếp đến để tiến hành kết nối với cơ sở dữ liệu database, chúng  ta cần định cấu hình kết nối với MongoDb trong file applications.properties hoặc application.yml như phía dưới :

**Applications.properties :**

```
server.port=8989
spring.data.mongodb.uri=mongodb://root:root@localhost:27017/BaoTrung
spring.jpa.show-sql=true
logging.level.org.springframework.data.mongodb.core.MongoTemplate=DEBUG
logging.level.org.springframework.web = DEBUG
```

Cấu hình trên chỉ ra server đang chạy ở **port** 8989, spring.data.mongodb.uri định cấu hình connect với database với các thông số như **username** là root **password** là root , port 27017(mặc định của mongoDb)  và **database** là BaoTrung.  
Các thông số tiếp theo chỉ định việc show các lệnh khi thao tác với mongoDb cũng như các level log khi thực hiện thao tác. Trong loạt bài viết đang sử dụng ở mức debug.

Có một lưu ý ở đây : 
Trong bài viết đang sử dụng **Mongo 3.0 Java driver** ,cấu hình sẽ thông qua uri.  Việc cấu hình như phía dưới sẽ không thành công đối với phiên bản Mongo 3.0 Java driver trở lên (chỉ áp dụng với Mongo 3.0 Java driver trở xuống) . Lý do là **spring.data.mongodb.host** và **spring.data.mongodb.port** đã bị loại bỏ trong Mongo 3.0 Java driver

//Không áp dụng với Mongo 3.0 Java Driver trở lên
```
spring.data.mongodb.authentication-database=admin
spring.data.mongodb.username=root
spring.data.mongodb.password=root
spring.data.mongodb.database=baotrung
spring.data.mongodb.port=27017
spring.data.mongodb.host=localhost
```

**Model**

Thực hiện tạo một class có tên là **Employee** như phía dưới : 

**Employee.class**
```
@Document(collection = "Employees")
public class Employee {

    @Id
    private String id;
    @Field(value = "firstName")
    @NotBlank(message = "FirstName can't empty!")
    private String firstName;
    @NotBlank(message = "LastName can't empty!")
    private String lastName;
    @NotNull
    private Integer age;
    @NotBlank(message = "Location can't empty!")
    private String location;
    private Double salary;

    public Employee() {
    }

    public Employee(String id, String firstName, String lastName, Integer age, String location, Double salary) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.location = location;
        this.salary = salary;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", location='" + location + '\'' +
                ", salary=" + salary +
                '}';
    }
}
```

Lớp trên chỉ đơn giản là dùng **@Document** xác định nó là một thực thể để có thể thao tác với **MongoDb** với các trường như **FirstName**, **LastName**, **Salary** ,**Age**, **Location** . Có một lưu ý ở đây là do ở **MongoDb** đang sử dụng document tên là Employees nên nếu muốn ánh xạ đúng tên document tên là **Employess** thì chúng ta sẽ sử dụng` collection = "Employees"`

Tạo một lớp tên là **EmployeeController** và thực hiện xác định các api cần thiết cho việc xử lý dữ liệu. Ở đây chúng ta sẽ xác định các api như findByLocation , calculateTotalUser và calculateSalary

**Controller** : 

**EmployeeController**
```
@RestController
@RequestMapping(value = "/employees", produces = MediaType.APPLICATION_JSON_VALUE)
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/findByLocation")
    public ResponseEntity<List<String>> fetchAllLastNameByLocation(@RequestParam String location) {
        return ResponseEntity.ok(employeeRepository.fetchAllLastNameByLocation(location));
    }

    @GetMapping("/calculateTotalUser")
    public ResponseEntity<List<EmployeeResult>> countTotalEmployeeByLocation(@RequestParam String location) {
        return ResponseEntity.ok(employeeRepository.countTotalUserByLocation(location));
    }

    @GetMapping("/calculateSalary")
    public ResponseEntity<List<EmployeeDto>> calculateSalaryByAgeAndLocation(@RequestParam int age, @RequestParam String location) {
        return ResponseEntity.ok(employeeRepository.calculateSalaryByAgeAndLocation(age, location));
    }
}
```

Lớp controller phía trên sẽ xác định các api cần thiết,  các thông số đầu vào và trả về reponse chứa dữ liệu được wrap trong các DTO như **EmployeeResult** ,**EmployeeDto**  dựa trên thông tin của mỗi API . Các DTO này sẽ được định nghĩa phía dưới. Lưu ý rằng ở đây controller sẽ gọi trực tiếp đến **repository** không thông qua lớp service do hiện tại chưa có nhiều logic phức tạp để xử lý và đây là những xử lý đơn giản. Tùy theo logic và các yêu cầu mà các bạn có thể dùng cho phù hợp trong từng dự án.

Tạo một interface với tên là **EmployeeRepository** và **EmployeeRepositoryCustom** :

**EmployeeRepository**
```
public interface EmployeeRepository extends CrudRepository<Employee,String>, EmployeeRepositoryCustom {

}
```

**EmployeeRepositoryCustom**
```
public interface EmployeeRepositoryCustom {

    List<String> fetchAllLastNameByLocation(String location);
    List<EmployeeResult> countTotalUserByLocation(String location);
    List<EmployeeDto> calculateSalaryByAgeAndLocation(int age,String location);
}
```

Ở interface **EmployeeRepositoryCustom** chúng ta sẽ định cấu hình 3 method là 
 -  **fetchAllLastNameByLocation** với param là location và trả về 1 list các LastName dựa trên location,
 -  **countTotalUserByLocation** với param là location và trả về 1 list các total user by location dựa trên DTO EmployeeResult
 - **calculateSalaryByAgeAndLocation** với param là location và trả về 1 list các salary tương dựa trên age và loaction

**EmployeeResult** :

```
package com.baotrung.springbootdemomongodb.dto;

public class EmployeeResult {

    private String _id;
    private Long total;

    public EmployeeResult() {
    }

    public EmployeeResult(String _id, Long total) {
        this._id = _id;
        this.total = total;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
```

**EmployeeDto**:

```
package com.baotrung.springbootdemomongodb.dto;

public class EmployeeDto {
    private String _id;
    private Long totalSalary;
    private String lastName;

    public EmployeeDto() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public Long getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(Long totalSalary) {
        this.totalSalary = totalSalary;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
```

Tạo một lớp có tên là **EmployeeRepositoryCustomImpl** và thực hiện implement lại **EmployeeRepositoryCustom** như phía dưới:

```
public class EmployeeRepositoryCustomImpl implements EmployeeRepositoryCustom {

   @Override
    public List<String> fetchAllLastNameByLocation(String location) {
        return null;
    }

    @Override
    public List<EmployeeResult> countTotalUserByLocation(String location) {
        return null;
    }

    @Override
    public List<EmployeeDto> calculateSalaryByAgeAndLocation(int age, String location) {
        return null;
    }
}
```

Chúng ta sẽ thực hiện tính toán trong 3 method này sử dụng **Aggregation**  dựa vào **MongoTemplate**. Vậy **MongoTemplate** là gì ?   
Lớp **MongoTemplate**, nằm trong gói **org.springframework.data.document.mongodb**, cung cấp các tính năng phong phú được thiết lập để tương tác với cơ sở dữ liệu. **MongoTemplate** cung cấp các method dùng  để tạo, cập nhật, xóa và truy vấn cho các tài liệu MongoDB và cung cấp ánh xạ giữa các **model** và **document**. Đây là một lớp rất quan trọng trong việc thao  tác với mongoDb

Tích hợp **MongoTemplate** vào **EmployeeRepositoryCustom** như sau:

```
@Autowired
    private MongoTemplate mongoTemplate;
```

Đối với method **fetchAllLastNameByLocation** sẽ tiến hành xử lý như sau : 

```
 @Override
    public List<String> fetchAllLastNameByLocation(String location) {
        Criteria criteria = Criteria.where("location").is(location);
        Aggregation aggregation = newAggregation(
                Aggregation.match(criteria),
                Aggregation.group("lastName").first("lastName").as("lastName")
        );
        AggregationResults<EmployeeDto> results = this.mongoTemplate.aggregate(aggregation, "employees", EmployeeDto.class);
        List<String> lastNames = new ArrayList<>();
        for (EmployeeDto employee : results.getMappedResults()) {
            lastNames.add(employee.getLastName());
        }
        return lastNames;
    }
```

Ở đây chúng ta có một lớp  gọi là **Criteria** . Vậy **Criteria** là gì  ? 
Đây là một lớp nằm trong package **org.springframework.data.mongodb.core.query** cung cấp nhiều phương thức để thực hiện truy vấn như WHERE , IS , LT, GT ... Nó cũng cung cấp một cách tuần tự việc thực hiện các truy vấn đó.

 ` Criteria criteria = Criteria.where("location").is(location);` dùng để tạo ra một **criteria** chứa điều kiện là các location trong database phải bằng với **location** từ param đã input vào từ Controller.

```
  Aggregation aggregation = newAggregation(
                Aggregation.match(criteria),
                Aggregation.group("lastName").first("lastName").as("lastName")
        );
```

Câu lệnh trên dùng để thực hiện tạo một Pipeline với toán tử match(criteria) với criteria đã định nghĩa phía trên và group theo lastName

Kế đến câu lệnh :       
 `AggregationResults<EmployeeDto> results = this.mongoTemplate.aggregate(aggregation, "Employees", EmployeeDto.class); `

sử dụng mongoTemplate thao tác với database với **aggregation** đã định nghĩa phía trên, tên collections là Employees và trả về DTO là **EmployeeDto.class**

Cuối cùng các câu lệnh như phía dưới thực hiện tạo ra 1 list các **LastName** với kiểu String, lấy kết quả từ results đã trả về , lặp và trả ra list các LastName

Kết quả khi thực hiện gọi API trên bằng postman :

![](https://images.viblo.asia/1f2812e3-2f54-49c4-9f43-df745de27916.PNG)

Nhìn vào log trong spring chúng ta có thể thấy dễ dàng Spring Data Mongo đã thực hiện parse các lệnh chúng ta viết phía trên ra cú pháp MongoDb theo dạng Pipeline tuần tự : match -> group và thực hiện thao tác với MongoDb.

```
2019-10-19 11:00:15.187 DEBUG 28612 --- [nio-8989-exec-1] o.s.web.servlet.DispatcherServlet        : GET "/employees/findByLocation?location=DN", parameters={masked}
2019-10-19 11:00:15.198 DEBUG 28612 --- [nio-8989-exec-1] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to public org.springframework.http.ResponseEntity<java.util.List<java.lang.String>> com.baotrung.springbootdemomongodb.controller.EmployeeController.fetchAllLastNameByLocation(java.lang.String)
2019-10-19 11:00:15.307 DEBUG 28612 --- [nio-8989-exec-1] o.s.data.mongodb.core.MongoTemplate      : Executing aggregation: [ { "$match" : { "location" : "DN"}} , { "$group" : { "_id" : "$lastName" , "lastName" : { "$first" : "$lastName"}}}] in collection Employees
2019-10-19 11:00:15.378 DEBUG 28612 --- [nio-8989-exec-1] o.s.w.s.m.m.a.HttpEntityMethodProcessor  : Using 'application/json', given [*/*] and supported [application/json]
2019-10-19 11:00:15.394 DEBUG 28612 --- [nio-8989-exec-1] o.s.w.s.m.m.a.HttpEntityMethodProcessor  : Writing [[Le Van, Nguyen Van]]
2019-10-19 11:00:15.428 DEBUG 28612 --- [nio-8989-exec-1] o.s.web.servlet.DispatcherServlet        : Completed 200 OK
```

Đối với method **countTotalUserByLocation** sẽ thực hiện tính toán như sau :

```
 @Override
    public List<EmployeeResult> countTotalUserByLocation(String location) {
        Criteria criteria = Criteria.where("location).is(location);
        AggregationOperation match = Aggregation.match(criteria);
        AggregationOperation group = Aggregation.group("location").count().as("total");
        Aggregation aggregation = newAggregation(match, group);
        AggregationResults<EmployeeResult> groupResults
                = mongoTemplate.aggregate(aggregation, "Employees", EmployeeResult.class);
        return groupResults.getMappedResults();

    }
```

Cách thực hiện tương tự như ví dụ trên : Thực hiện dựa tạo một Criteria để thực hiện tìm kiếm dựa trên Location và dùng **Aggregation** để tạo các Pipeline để thực hiện tuần tự : **Group location** và thực hiện Count trên từng location đó. Tuy nhiên có 1 sự khác biệt là chúng ta sẽ dùng thêm một class là **AggregationOperation** để xử lý riêng cho từng toán tử như match , group ... Điều này khiến cho code chúng ta clear và dễ dàng maintain hơn.  Ở đây chúng ta sẽ thực hiện lấy kết quả trực tiếp từ **AggregationResults** bằng method **getMappedResults** được định nghĩa sẵng trong api của mongoDb.

Kết quả khi thực hiện api : 
![](https://images.viblo.asia/8187f793-304d-4608-8228-12d0fbad68b2.PNG)
Kết quả hiển thị trên log spring :

```
2019-10-19 11:02:36.511 DEBUG 28612 --- [nio-8989-exec-3] o.s.web.servlet.DispatcherServlet        : GET "/employees/calculateTotalUser?location=DN", parameters={masked}
2019-10-19 11:02:36.514 DEBUG 28612 --- [nio-8989-exec-3] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to public org.springframework.http.ResponseEntity<java.util.List<com.baotrung.springbootdemomongodb.dto.EmployeeResult>> com.baotrung.springbootdemomongodb.controller.EmployeeController.countTotalEmployeeByLocation(java.lang.String)
2019-10-19 11:02:36.517 DEBUG 28612 --- [nio-8989-exec-3] o.s.data.mongodb.core.MongoTemplate      : Executing aggregation: [ { "$match" : { "location" : "DN"}} , { "$group" : { "_id" : "$location" , "total" : { "$sum" : 1}}}] in collection Employees
2019-10-19 11:02:36.538 DEBUG 28612 --- [nio-8989-exec-3] o.s.w.s.m.m.a.HttpEntityMethodProcessor  : Using 'application/json', given [*/*] and supported [application/json]
2019-10-19 11:02:36.540 DEBUG 28612 --- [nio-8989-exec-3] o.s.w.s.m.m.a.HttpEntityMethodProcessor  : Writing [[com.baotrung.springbootdemomongodb.dto.EmployeeResult@29283bc7]]
2019-10-19 11:02:36.610 DEBUG 28612 --- [nio-8989-exec-3] o.s.web.servlet.DispatcherServlet        : Completed 200 OK
```
Cũng tương tự ví dụ phía trên, Spring Data MongoDb dựa trên các lệnh chúng ta đã viết thực hiện  tạo các Pipeline theo tuần tự : $match theo location , $group theo location và tính tổng dựa vào $sum

Đối với method **calculateSalaryByAgeAndLocation** thực hiện xử lý như sau: 

```
    @Override
    public List<EmployeeDto> calculateSalaryByAgeAndLocation(int firstAge, String location) {
        Criteria criteria = Criteria.where("age").gte(firstAge).and("age").is(location);
        AggregationOperation match = Aggregation.match(criteria);
        AggregationOperation group = Aggregation.group("location").sum("salary").as("totalSalary")
                .push("lastName").as("lastName");
        Aggregation aggregation = newAggregation(match, group);
        AggregationResults<EmployeeDto> groupResults
                = mongoTemplate.aggregate(aggregation, "employees", EmployeeDto.class);
        return groupResults.getMappedResults();
    }
```

Đối với method **calculateSalaryByAgeAndLocation** sẽ thực hiện tính toán dựa trên 2 đk:  age và location .   Criteria sẽ thực hiện lấy những đk với age lớn hơn hoặc bằng age được input vào và location bằng location từ param được input vào.  Toán tử **AggregationOperation** sẽ thực hiện tương tự các trình tự như match, group by location , sum dựa vào salary và thực hiện tham chiếu đến từng lastName của Employee với lệnh push . 

Kết quả :

![](https://images.viblo.asia/8ae28f47-a895-4f04-ad98-8eb5fe08f37c.PNG)

Log :

```
2019-10-19 11:18:43.235 DEBUG 18288 --- [nio-8989-exec-2] o.s.web.servlet.DispatcherServlet        : GET "/employees/calculateSalary?age=23&location=DN", parameters={masked}
2019-10-19 11:18:43.245 DEBUG 18288 --- [nio-8989-exec-2] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to public org.springframework.http.ResponseEntity<java.util.List<com.baotrung.springbootdemomongodb.dto.EmployeeDto>> com.baotrung.springbootdemomongodb.controller.EmployeeController.calculateSalaryByAgeAndLocation(int,java.lang.String)
2019-10-19 11:18:43.308 DEBUG 18288 --- [nio-8989-exec-2] o.s.data.mongodb.core.MongoTemplate      : Executing aggregation: [ { "$match" : { "age" : { "$gte" : 23} , "location" : "DN"}} , { "$group" : { "_id" : "$location" , "totalSalary" : { "$sum" : "$salary"}}}] in collection Employees
2019-10-19 11:18:43.373 DEBUG 18288 --- [nio-8989-exec-2] o.s.w.s.m.m.a.HttpEntityMethodProcessor  : Using 'application/json', given [*/*] and supported [application/json]
2019-10-19 11:18:43.411 DEBUG 18288 --- [nio-8989-exec-2] o.s.w.s.m.m.a.HttpEntityMethodProcessor  : Writing [[com.baotrung.springbootdemomongodb.dto.EmployeeDto@60eacf89]]
2019-10-19 11:18:43.562 DEBUG 18288 --- [nio-8989-exec-2] o.s.web.servlet.DispatcherServlet        : Completed 200 OK
```

Chúng ta có thể thấy : Spring Mongo Db đã parse các câu lệnh chúng ra viết ra dạng Pipeline , với các operator match : age lớn hơn hoặc bằng 23, location DN group theo location tính tổng dựa trên salary ...


# Thao tác  MongoDb dựa trên Aggregation với Cursor 

Qua các ví dụ trên mongoTemplate cung cấp rất nhiều tiện ích cũng như method thao tác với mongoDb. Tuy nhiên có 1 hạn chế ở đây ?  MongoTemplate không thể xử lý dữ liệu vượt quá 16MB cho một BSON. Vì sao như vậy ? Có rất nhiều lý do cho vấn đề này tuy nhiên nguyên nhân chính đó là MongoDb giới hạn một BSON không vượt quá 16MB để đảm bảo rằng nó không chiếm quá nhiều RAM của hệ thống khi xử lý và đảm bảo tốc độ truyền dữ liệu khi trả về ?  Vậy nếu muốn sử lý dữ liệu vượt quá 16MB chúng ta phải làm thế nào  ? Câu trả lời là dùng Cursor .

Về Cursor là gì cũng như có những method nào các bạn có thể tham khảo tài liệu của MongoDb : https://docs.mongodb.com/manual/reference/method/js-cursor/?searchProperty=current&query=Cursor . Lưu ý là Cursor có các method riêng để xử lý, không thể dùng các method của collection để xử lý với Cursor.

Lưu ý : Việc sử lý dựa vào Cursor chỉ áp dụng đối với lượng data vượt quá 16MB . Nếu data  nhỏ hơn 16MB, hãy dùng mongoTemplate. Dùng Cursor sẽ khiến database của bạn chậm đi đáng kể dẫn đến hiệu suất không ổn định.

## Thao tác Cursor trong Spring 

Trước tiên chúng ta tạo 1 method trong lớp EmployeeController như thế này :

```
    @GetMapping("/findByLocationUseCursor")
    public ResponseEntity<Set<String>> fetchAllLastNameByLocationUsedCursor(@RequestParam String location) {
        return ResponseEntity.ok(employeeRepository.fetchAllLastNameByLocationUsedCursor(location));
    }
```

Method này sẽ trả về 1 danh sách các lastName không trùng lặp

Tiếp theo tạo một method có tên fetchAllLastNameByLocationUsedCursor trong Interface  EmployeeRepositoryCustom và EmployeeRepositoryCustomImpl : 

**EmployeeRepositoryCustom** .

`  Set<String> fetchAllLastNameByLocationUsedCursor(String location);`

**EmployeeRepositoryCustomImpl**

Tiến hành tìm tất cả các lastName dựa trên location bằng Cursor 

```
   @Override
    public Set<String> fetchAllLastNameByLocationUsedCursor(String location) {
        BasicDBObject query = new BasicDBObject("location", location);
        MongoClient mongoClient = new MongoClient(new ServerAddress("localhost", 27017));
        DB db = mongoClient.getDB("BaoTrung");

        DBCollection coll = db.getCollection("Employees");

        Set<String> lastNames = new HashSet<>();

        Cursor cursor = coll.find(query);

        while (cursor.hasNext()) {
            DBObject instance = cursor.next();
            lastNames.add(((String) instance.get("lastName")));
        }

        return lastNames;
    }
```

Thay vì dùng các lớp Employee để thực hiện ánh xạ, **BasicDBObject** thực hiện đọc trực tiếp vào Bson với tên trường là location, **MongoClient** xác định các kết nối như tên host, port, tên database. Phía trên tên **host** là localHost,**port** là 27017 và tên **database** là BaoTrung. Ở đây chúng ta dùng lớp  **DBCollection** để get trực tiếp collection từ MongoClient . Collection được get lên ở đây là Employees.  Thực hiện tạo một Set chứa các lastName mong muốn trả về.   Cursor cursor = coll.find(query);  dùng để xác định sẽ dùng cursor tìm kiếm dựa trên điều kiện đã định trước.  Các method như cursor.hasNext() và  cursor.next() dùng để thực hiện tìm kiếm tuần tự trong các bảng ghi. Cuối cùng    lastNames.add(((String) instance.get("lastName")));  sẽ tìm kiếm ra các lastName phù hợp với location đã chỉ định parse về kiểu String và trả về kết quả.

Kết quả khi thực hiện gọi api
![](https://images.viblo.asia/25c06742-f2ea-40b3-bacd-9ee13055c58f.PNG)

Log trong spring:

```
2019-10-19 12:25:48.398 DEBUG 13800 --- [nio-8989-exec-1] o.s.web.servlet.DispatcherServlet        : GET "/employees/findByLocationUseCursor?location=DN", parameters={masked}
2019-10-19 12:25:48.406 DEBUG 13800 --- [nio-8989-exec-1] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to public org.springframework.http.ResponseEntity<java.util.Set<java.lang.String>> com.baotrung.springbootdemomongodb.controller.EmployeeController.fetchAllLastNameByLocationUsedCursor(java.lang.String)
2019-10-19 12:25:48.428  INFO 13800 --- [nio-8989-exec-1] org.mongodb.driver.cluster               : Cluster created with settings {hosts=[localhost:27017], mode=SINGLE, requiredClusterType=UNKNOWN, serverSelectionTimeout='30000 ms', maxWaitQueueSize=500}
2019-10-19 12:25:48.441  INFO 13800 --- [localhost:27017] org.mongodb.driver.connection            : Opened connection [connectionId{localValue:3, serverValue:55}] to localhost:27017
2019-10-19 12:25:48.444  INFO 13800 --- [localhost:27017] org.mongodb.driver.cluster               : Monitor thread successfully connected to server with description ServerDescription{address=localhost:27017, type=STANDALONE, state=CONNECTED, ok=true, version=ServerVersion{versionList=[3, 6, 14]}, minWireVersion=0, maxWireVersion=6, maxDocumentSize=16777216, logicalSessionTimeoutMinutes=30, roundTripTimeNanos=3193000}
2019-10-19 12:25:48.464  INFO 13800 --- [nio-8989-exec-1] org.mongodb.driver.connection            : Opened connection [connectionId{localValue:4, serverValue:56}] to localhost:27017
2019-10-19 12:25:48.514 DEBUG 13800 --- [nio-8989-exec-1] o.s.w.s.m.m.a.HttpEntityMethodProcessor  : Using 'application/json', given [*/*] and supported [application/json]
2019-10-19 12:25:48.533 DEBUG 13800 --- [nio-8989-exec-1] o.s.w.s.m.m.a.HttpEntityMethodProcessor  : Writing [[Le Van, Nguyen Van]]
2019-10-19 12:25:48.562 DEBUG 13800 --- [nio-8989-exec-1] o.s.web.servlet.DispatcherServlet        : Completed 200 OK
```

Nhìn vào log có thể thấy lúc nào Spring Data MongoDb đã k còn parse ra các Pipeline nữa mà việc thực hiện hoàn toàn dựa vào Cursor thao tác trên bộ nhớ của mongoDB và trả về kết quả.

# Kết luận
Qua bài viết trên , mình đã giới thiệu cách sử dụng **Aggregation** trong spring, cách sử dụng **mongoTemplate** và **Cursor**. Sự khác nhau và khi nào nên dùng Cursor khi nào không. Hy vọng sẽ giúp mọi người hiểu thêm về **Aggregation** và tích hợp vào dự án. Hẹn gặp lại mọi người ở các bài viết tiếp theo