## Phần 1. Repository
### 1.1. Giới thiệu
Việc xây dựng và triển khai tầng truy cập dữ liệu trong các ứng dụng đôi khi gây ra cho lập trình viên khá nhiều phiền toái do sự cồng kềnh và phức tạp của nó. Dù hiện nay đã có nhiều thư viện và framework hỗ trợ nhưng chúng ta vẫn không tránh khỏi việc phải viết lại quá nhiều mã viết sẵn trong các thư viện, và code của chúng ta cũng sẽ ngày một trở nên *"rối loạn"* hơn. Để giảm thiểu ảnh hưởng từ vấn đề trên, Spring cung cấp cho chúng ta giải pháp đó là các **abstract reposity**, chúng được thiết kế dựa trên các interface, giảm đáng kể các mã viết sẵn và ảnh hưởng từ việc phải thực thi quá nhiều các lớp trong tầng truy cập dữ liệu.

### 1.2. Core concepts
Phần cơ bản và cốt lõi nhất của Pring Data abstract repository đó là một interface có tên là **Repository**, nó nhận vào một `Entity class` tương ứng với java class đại diện cho một bảng trong database của chúng ta, và kiểu dữ liệu của trường `ID` trong bảng đó. Interface này cung cấp một số function xoay quanh việc CRUD thực thể mà nó quản lí, như sau:

```
public interface Repository<T, ID extends Serializable> {

    T save(T entity);                                                                    

    T findById(ID primaryKey);                                                           

    List<T> findAll();                                                                   

    Page<T> findAll(Pageable pageable);                                                 

    Long count();                                                                        

    void delete(T entity);                                                               

    boolean exists(ID primaryKey);                                                       

    // … more functionality omitted.
}
```
Spring Data cũng cung cấp cho chúng ta một số interface với các tính năng phù hợp với từng mục đích, và chúng đều kế thừa từ interface `Repository` ở trên. Dưới đây là ví dụ về abstract repository cho phép sắp xếp và phân trang dữ liệu được lấy từ database:
```
public interface PagingAndSortingRepository<T, ID extends Serializable> extends Repository<T, ID> {

    List<T> findAll(Sort sort);

    Page<T> findAll(Pageable pageable);
}
```
Ví dụ về `PagingAndSortingRepository`, để truy cập vào trang thứ 2 với độ dài của một trang là 20 dòng, chúng ta có thể làm như sau:
```
PagingAndSortingRepository<User, Long> repository = // lấy ra bean của repository
Page<User> users = repository.findAll(new PageRequest(1, 20);
```

**Note: Dưới đây là một số interface Spring Data cung cấp sẵn cho chúng ta theo sơ đồ cây:**

![](https://images.viblo.asia/c3266b0f-ab80-43d0-842e-10986592fc90.png)


### 1.3. Query methods
Để tạo dựng được một abstract repository với Spring Data cơ bản sẽ gồm 4 bước sau:
* Khai báo một interface mở rộng từ một trong số các interface có sẵn tùy theo mục đích.

   `public interface PersonRepository extends JpaRepository<User, Long> { … }`

* Khai báo các phương thức truy vấn trong interface.

    `List<Person> findByEmail(String email);`
    
* Cấu hình cho Spring biết đây là một repository và khởi tạo nó. (ở đây mình sử dụng Repository anotation, các bạn cũng có thể cấu hình với file .xml)

    ```
    @Repository
    public interface PersonRepository extends JpaRepository<User, Long> { … }
    ```

* Inject bean của repository và sử dụng.
    
    ```
    public class SomeClient {

      @Autowired
      private PersonRepoyitory repository;

      public void doSomething() {
        List<Person> persons = repository.findByEmail("luongnk08@viettel.com.vn");
      }
    }
    ```

Trên đây mình đã cung cấp các bước cơ bản để tạo ra một repository, cùng đi tiếp và khám phá chi tiết của từng bước đề cập ở trên!

#### 1.3.1. Định nghĩa repository interfaces
Ở bước đầu tiên khi tạo một repository, bạn sẽ phải định nghĩa một `entity class` để repository đó nhận biết và làm việc với nó. Repository sẽ nhận vào `entity class` và `kiểu dữ liệu của ID trong entity class`, sau đó, chúng ta sẽ có các CRUD method của `Repository` phù hợp với entity class của chúng ta.
#### 1.3.2. Định nghĩa các query methods
##### 1.3.2.1. Query lookup strategies
Tiếp theo, chúng ta sẽ cùng thảo luận về định nghĩa của các `query methods`. Đại khái sẽ có 2 cách để repository có thể nhận biết câu lệnh query tới database mà bạn muốn thông qua `method name`. Cách thứ nhất đó là lấy trực tiếp câu truy vấn từ tên phương thức trong repository. Cách thứ hai sẽ sử dụng thêm một số tùy chọn bổ sung từ Spring Data Framework để tạo câu truy vấn. Bạn có thể lựa chọn một trong 2 cách tùy thuộc vào mục đích thực tế, tuy nhiên Spring cũng đưa ra một số chiến lược để giúp bạn thực hiện điều đó, nó được gọi là `query-lookup-strategy` gồm 3 tùy chọn sau đây:
* **CREATE** - Nếu tùy chọn này được sử dụng thì Spring framework sẽ cố gắng tự động tạo một truy vấn từ tên phương thức truy vấn.
* **USE_DECLARED_QUERY** - Đối với tùy chọn này Spring framework cố gắng tìm một truy vấn đã khai báo, có thể bằng các anotation hoặc khái báo bởi các phương tiện khác. Nếu repository không tìm được nó sẽ báo lỗi khi runtime.
* **CREATE_IF_NOT_FOUND (default)** - Đây là tùy chọn mặc định và nó kết hợp CREATE và USE_DECLARED_QUERY. Nó tìm kiếm một truy vấn đã khai báo trước và nếu không tìm thấy truy vấn đã khai báo nào, nó sẽ tạo ra một truy vấn dựa trên tên phương thức tùy chỉnh.
##### 1.3.2.2. Query creation
Spring giúp chúng ta tạo ra các query method từ chính tên của các phương thức có trong repository, bắt đầu là với các tiền tố đại diện cho mục đích của câu lệnh query sẽ được thực hiện. Ví dụ như `findBy, find, readBy, read, getBy, ...`, và phần còn lại sẽ đại hiện cho các variable có trong entity class, chúng ta có thể nối chúng với các từ khóa như `And, Or, ...` như sau:
```
public interface PersonRepository extends JpaRepository<User, Long> {

  List<Person> findByEmailAddressAndLastname(EmailAddress emailAddress, String lastname);
}
```
Ở ví dụ này, Spring sẽ phân tích `EmailAddressAndLastname` (được gọi là biểu thức thuộc tính) và tạo ra cho chúng ta câu query tương ứng với 2 thuộc tính là `address` và `lastname`. Như các bạn đã thấy, `And` đã được sử dụng trong ví dụ này và làm method name của chúng ta trở nên rõ nghĩa hơn. Ngoài ra bạn cũng có thể sử dụng các từ khóa khác như: `Between, LessThan, GreaterThan, Like` cho biểu thức thuộc tính.

Do sự trợ giúp của các từ khóa, method name của chúng ta trở nên rõ ràng và dễ hiểu hơn, tuy nhiên trong một số trường hợp chúng ta muốn một biểu thức vẫn rõ nghĩa như vậy nhưng không thể sử dụng các từ khóa như đã kể trên, vậy làm sao để Spring có thể hiểu mục đích của chúng ta để tạo ra các query đúng với mục đích nhất? Chúng ta cùng đi đến ví dụ tiếp theo để cùng làm rõ cách Spring phân tích các biểu thức thuộc tính.

Giả sử tôi có một entity class trong đó có một variable là `address` có kiểu dữ liệu là `ZipCode` và tôi muốn tìm tất cả các bản ghi theo parameter zipCode đưa vào, lúc này tôi sẽ tạo ra một method như sau: `List<Person> findByAddress(ZipCode zipCode);`. Theo như lý thuyết ban nãy thì đây là một biểu thức thuộc tính rất rõ ràng và trong thực tế nó cũng thực hiện rất tốt. Tuy nhiên, để những thành viên khác nhìn vào dễ hiểu hơn, tôi muốn sửa nó thành:
```
List<Person> findByAddressZipCode(ZipCode zipCode);
```
Vấn đề ở đây là khi tôi thêm `ZipCode` vào tên phương thức thì liệu Spring có hiểu lầm là tôi đang muốn tìm theo thuộc tính `zipCode` hay không? Câu trả lời ở đây sẽ là **không** và method tôi mới sửa vẫn sẽ hoạt động tốt như method ban đầu.

Thuật toán của Spring sẽ tìm biểu thức `AddressZipCode` trong entity class, nếu có nó sẽ chấp nhận luôn biểu thức này là thuộc tính và tạo query cho nó. Ngược lại, Spring sẽ phân tách biểu thức thuộc tính của chúng ta từ phải qua trái và theo những từ theo kiểu `Camel Case` (những từ có chữ đầu viết hoa) rồi phân chia chúng thành phần đầu và phần đuôi, sau đó nó sẽ cố gắng tìm các phần này trong entity class (ưu tiên phần đầu trước). Lần này sẽ là `AddressZip, Code`. Không có đúng không, thuật toán lại tiếp tục `Address, ZipCode`. Như vậy, Spring đã tìm được `Address` cho câu query và xác định đây sẽ là thuộc tính cần tìm kiếm sau đó lấy phần đuôi tiếp tục phân tách.

Vấn đề mới sẽ xảy ra trong trường hợp này là khi trong entity của chúng ta cũng tồn tại một variable có tên là `addressZip`, như vậy method trên sẽ hoạt động không đúng như chúng ta mong đợi. Để giải quyết vấn đề này, chúng ta có thể phân tách các từ khóa bằng dấu `_`, khi đó, Spring sẽ phân tách chính xác với cách chúng ta muốn:
```
List<Person> findByAddress_ZipCode(ZipCode zipCode);
```
##### 1.3.2.3. Query data
Spring cung cấp cho chúng ta anotation `@Repository` giúp chú thích class trở thành một repository, qua đó Spring có thể nhận biết vào tạo ra một `repository bean` cho chúng ta khi khởi chạy ứng dụng. Khi đó chúng ta chỉ cần `inject` bean đó vào và sử dụng như sau:
```
@Repository
public interface PersonRepository extends JpaRepository<User, Long> {

  List<Person> findByEmailAddressAndLastname(EmailAddress emailAddress, String lastname);
}
```

```
public class SomeClass {
    @Autowire
    private PersonRepository personRepository; // sử dụng autowire để inject bean
    
    private void testRepository() {
        List<Person> persons = personRepository.findByEmailAddressAndLastname("luongnk08@viettel.com.vn", "luong");
    }
}
```
### Tạm kết
Như vậy, qua bài này tôi đã cùng các bạn đi qua các khái niệm và cách thức Spring Data tạo ra query command từ method name cho chúng ta, ở bài sau tôi sẽ giới thiệu tới các bạn một tính năng khác của Spring Data giúp chúng ta chủ động tạo các query truy xuất dữ liệu từ cơ sở dữ liệu, đó là Spring Specification. Hẹn gặp lại các bạn ở bài viết sau!