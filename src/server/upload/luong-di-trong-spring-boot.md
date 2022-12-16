## 1. Hai mô hình quen thuộc

Cấu trúc source code của Spring Boot được dựa trên hai mô hình là **mô hình MVC** và **mô hình 3 lớp**.

### 1.1. Mô hình ba lớp (three tier)

Đây là mô hình tổ chức source code rất phổ biến trong Spring Boot. Cụ thể, ứng dụng được chia làm 3 tầng (tier hoặc layer) như sau:

* **Presentation layer:** tầng này tương tác với người dùng, bằng View, Controller (trong MVC) hoặc API (nếu có).
* **Business logic layer:** Chứa toàn bộ logic của chương trình, các đa số code nằm ở đây
* **Data access layer:** Tương tác với database, trả về kết quả cho tầng business logic

Trong Spring Boot, thì có một số thành phần đại diện cho từng lớp:

* **Service:** chứa các business logic code
* **Repository:** đại diện cho tầng data access

Còn presentation layer thì chúng ta sẽ bàn tiếp qua mô hình MVC ngay bên dưới.

![](https://images.viblo.asia/fdbe3b44-aa91-4a88-9202-814c56ef9178.png)

### 1.2. Mô hình MVC

Do Spring Boot chỉ là wrapper cho Spring, chúng ta vẫn sử dụng ngầm các module Spring khác bên dưới, ví dụ như Spring MVC. Và tất nhiên khi dùng Spring MVC thì sẽ tuân theo mô hình MVC rồi :D.

Mô hình MVC quá là phổ biến rồi nên mình không nhắc nhiều. Cụ thể, nó chia tầng presentation làm 3 phần:

* **Model:** các cấu trúc dữ liệu của toàn chương trình, có thể đại diện cho trạng thái của ứng dụng
* **View**: lớp giao diện, dùng để hiển thị dữ liệu ra cho user xem và tương tác
* **Controller:** kết nối giữa Model và View, điều khiển dòng dữ liệu

Dữ liệu từ Model qua Controller sau đó được gửi cho View hiển thị ra. Và ngược lại, khi có yêu cầu mới từ View, thì sẽ qua Controller thực hiện thay đổi dữ liệu của Model.

Tuy nhiên, MVC chỉ mô tả luồng đi của dữ liệu, nó không nói rõ như code đặt ở đâu (ở Model, View hay Controller), rồi lưu trữ Model vào database kiểu gì,... Do đó, đối với ứng dụng hoàn chỉnh như Spring Boot thì cần kết hợp cả mô hình MVC và 3-tier lại với nhau.

## 2. Áp dụng vào Spring Boot thì như nào?

### 2.1. Các thành phần quan trọng

Kết hợp hai mô hình lại, chúng ta có được ứng dụng Spring Boot hoàn chỉnh, gồm các thành phần sau:

* Controller: trả về View (có chứa data sẵn, dạng trang HTML), hoặc Model thể hiện dưới dạng API cho View (View viết riêng bằng React, Vue, hoặc Angular).
* Service: chứa các code tính toán, xử lý. Khi Controller yêu cầu, thì Service tương ứng sẽ tiếp nhận và cho ra dữ liệu trả cho Controller (trả về Model). Controller sẽ gửi về View như trên.
* Repository: Service còn có thể tương tác với service khác, hoặc dùng Repository để gọi DB. Repository là thằng trực tiếp tương tác, đọc ghi dữ liệu trong DB và trả cho service.

Ơ thế còn Model và View thì đi đâu? Mình sẽ giải thích như sau:

* Model chỉ đơn giản là các đối tượng được Service tính toán xong trả về cho Controller.
* View thì có 2 loại, một là dạng truyền thống là trả về 1 cục HTML có data rồi. Lúc này Controller sẽ pass dữ liệu vào View và return về (Spring MVC có JSP hoặc template engine như Thymeleaf làm điều đó).
* View dạng 2 là dạng View tách riêng (không thuộc về project Spring boot). Thường có trong các hệ thống dùng API. View sẽ được viết riêng bằng React, Angular,... Controller sẽ đưa dữ liệu Model thông qua API cho View, và cũng nhận lại các yêu cầu qua API luôn.

### 2.2. Sơ đồ luồng đi

Để hiểu rõ hơn về các thành phần trong Spring Boot, chúng ta hãy xem qua sơ đồ luồng đi và sự tương tác giữa chúng. Phần này có thể hơi khó hiểu tí, nhưng bạn cần nắm kĩ.

![](https://images.viblo.asia/68d13e98-8714-4dd9-ae27-641ee729ab20.png)

Sơ đồ trên mình sẽ xét theo chiều kim đồng hồ nhé:

* Đầu tiên, user sẽ vào View để xem, tương tác
* Khi user bắt đầu load dữ liệu (ví dụ click nút Reload), thì 1 request từ View gửi cho Controller (kiểu như "ê, cho tao cái danh sách user với")
* Controller nhận được yêu cầu, bắt đầu đi hỏi ông Service (trong code là gọi method của Service)
* Service nhận được yêu cầu từ Controller, đối với các code đơn giản có thể tính toán và trả về luôn. Nhưng các thao tác cần đụng tới database thì Service phải gọi Repository để lấy dữ liệu trong DB
* Repository nhận được yêu cầu từ Service, sẽ thao tác với DB. Data lấy ra trong DB được hệ thống ORM (như JPA hoặc Hibernate) mapping thành các object (trong Java). Các object này gọi là Entity.

Và bây giờ sẽ là đi ngược lại trả về cho user:

* Service nhận các Entity được Repository trả về, biến đổi nó. Biến đổi ở đây là có thể thực hiện tính toán, thêm bớt các field,... và cuối cùng biến Entity thành Model. Model sẽ được trả lại cho Controller.
* Controller nhận được Model, nó sẽ return cho View. Có 2 cách, một là dùng template engine pass dữ liệu Model vào trang HTML, rồi trả về cục HTML (đã có data) cho client. Cách 2 là gửi qua API, View tự parse ra và hiển thị tương ứng (hiển thị thế nào tùy View).
* Khi View hiển thị xong, user sẽ thấy danh sách user hiện lên trang web.

Một số mẹo hay để tổ chức luồng đi cho tốt:

* Giữ cho Controller càng ít code càng tốt. Vì Controller chỉ là trung gian kết nối thông, nên không nên chứa nhiều code, thay vào đó nên bỏ vào Service.
* Nên tách bạch Service rõ ràng. Không nên cho 1 service thực hiện nhiều công việc, nên tách ra nhiều Service.

### 2.3. Code ví dụ

Các thành phần trên có thể tương tác, gọi lẫn nhau, đó không gì khác ngoài cơ chế dependency injection trong Spring. Cụ thể như sau:

* Trong Controller được inject các Service cần thiết vào
* Trong Service được inject các Repository cần thiết vào

Mình sẽ code một ví dụ đơn giản nhé, là hiển thị danh sách User trong DB. Code ngoài file mặc định ra thì sẽ có

```java:UserController.java
@RestController  // @RestController dùng cho API, còn return View HTML thì dùng @Controller
@RequestMapping("/")  // Endpoint gốc là /
public class UserController {
    // Inject Service vào để gọi được
    @Autowired  // Dùng cách này cho ngắn, chứ thường là inject qua constructor
    private final UserService userService;

    @GetMapping("/")
    // Trả về Model là một List<UserModel>
    public ResponseEntity<List<UserModel>> getUserList() {
        // Service trả về Model (là List<UserModel>) nên có thể return thẳng luôn
        return userService.getUserList();
    }

    // Có thể có các endpoint khác
}
```

```cpp:UserService.java
@Service  // Đánh dấu class này là Service
public class UserService {
    // Inject Repository vào
    @Autowired  // Dùng cách này cho ngắn, chứ thường là inject qua constructor
    private final UserRepository userRepository;

    public List<UserModel> getUserList() {
        // Lấy ra từ Repository dạng List<User> là Entity
        List<User> users = userRepository.findAll();

        // Biển đổi List<Entity> thành List<Model> (xem ở constructor của UserModel có code copy dữ liệu)
        List<UserModel> userModels = users.stream()
            .map(UserModel::new)
            .collect(Collector.toList());

        // Hoặc dùng cách bình thường (gà :D)
        // Chọn 1 trong 2 nhé
        List<UserModel> userModels = new ArrayList<>();
        for (User user: users)
            userModels.add(new UserModel(user));

        return userModels;  // Code khá nhiều so với Controller
    }
}
```

```markdown:UserRepository.java
// @Repository  // Không dùng @Repository, vì annotation này chỉ dùng trên class
// Đây là ORM của MongoDB, nó sẽ mapping data trong bảng users thành dạng object User
public interface UserRepository extends MongoRepository<User, String> {
    // Méo định nghĩa thêm method nào, chỉ sử dụng .findAll() có sẵn
}
```

Trên là code 3 thành phần Controller, Service và Repository. Chúng ta cần có thêm 2 class đại diện cho dữ liệu, là Entity (để mapping trong DB ra) và Model (để biến Entity thành dạng thích hợp trả về, ví dụ Entity có chứa password mà trả về luôn là hỏng :D).

```java:User.java
// Không có hậu tố là mặc định class là Entity nhé
public class User {
    // Để public hết cho đơn giản, bình thường sẽ là private và dùng getter, setter
    public String name;
    public Integer age;
    public String password;  // Đã được hash bcrypt
}
```

```java:UserModel.java
// Có hậu tố Model là Model
public class UserModel {
    public String name;
    public Integer age;
    // Không public password, khi mapping từ Entity > Model thì field password bị bỏ đi
    // Không trả về password cho người dùng

    // Copy thông qua constructor, khi new Model(entity)
    // Xem trong UserService có chỗ .map đó, đó là Stream API của java
    public UserModel(User entity) {
        this.name = entity.name;
        this.age = entity.age;
        // Không gán password, vì bị bỏ qua
    }
}
```

Từ Entity thành Model có thể dùng các thư viện mapping, nhưng mình sẽ không dùng mà chỉ đơn thuần copy thôi.

---

Xong rồi, bài hôm nay khá dài, khó nhưng quan trọng nhé. Chỗ nào trong code khó hiểu thì cứ comment bên dưới, mình sẽ giải đáp hết. Thanks.