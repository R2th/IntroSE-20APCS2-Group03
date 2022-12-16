# 1. Tổng quan:

Trong bài viết này, chúng ta sẽ xây dựng một REST API Search/Filter sử dụng Spring Data JPA và Specifications. 

Tại sao lại là **query language**. Bởi vì đối với bất kỳ API đủ độ phức tạp nào thì việc searching/filtering data theo các trường đơn giản là không đủ. Query language linh hoạt hơn và cho phép bạn filter chính xác những gì bạn cần.

# 2. User Entity:

Ban đầu, hãy bắt đầu với entity User đơn giản cho API search của chúng ta: 

```
@Entity
@Table(name = "user")
data class UserDao (
    @Id
    val id: Int = -1,

    @Column
    val firstName: String = "",

    @Column
    val lastName: String = "",

    @Column
    val email: String = "",

    @Column
    val age: Int = 0
) : Serializable
```

# 3. Filter sử dụng Specification:

Bây giờ, hãy đi thẳng tới phần thú vị nhất của vấn đề mà chúng ta gặp phải - truy vấn với custom Spring Data JPA Specifications.

Chúng ta sẽ tạo UserSpecification thứ mà sẽ implement Specification và chúng ta sẽ truyền ràng buộc vào cấu trúc của truy vấn:

```
fun toPredicate(root: Root<UserDao?>, query: CriteriaQuery<*>?, builder: CriteriaBuilder): Predicate? {
        return when (criteria.operation) {
            EQUALITY -> builder.equal(root.get(criteria.key), criteria.value.toString())
            NEGATION -> builder.notEqual(root.get(criteria.key), criteria.value.toString())
            GREATER_THAN -> builder.greaterThan(root.get(criteria.key), criteria.value.toString())
            LESS_THAN -> builder.lessThan(root.get(criteria.key), criteria.value.toString())
            LIKE -> builder.like(root.get(criteria.key), criteria.value.toString())
            STARTS_WITH -> builder.like(root.get(criteria.key), criteria.value.toString() + "%")
            ENDS_WITH -> builder.like(root.get(criteria.key), "%" + criteria.value)
            CONTAINS -> builder.like(root.get(criteria.key), "%" + criteria.value.toString() + "%")
            else -> null
        }
    }
```

Như ta có thể thấy, chúng ta tạo một Specification dựa trên một số ràng buộc đơn giản mà ta represent trong class "SearchCriteria" :

```
data class SpecSearchCriteria(
    val key: String,
    val operation: String,
    val value: Objects
)
```

Việc triển khai SearchCriteria sẽ giữ một representation cơ bản của một ràng buộc - và dựa trên ràng buộc này mà chúng ta sẽ xây dựng truy vấn:

* key: tên trường – Ví dụ: firstName, age, ….
* operation: Ví dụ: equality, less than, ….
* value: giá trị của trường – Ví dụ: john, 25, ….

Tất nhiên, việc triển khai rất đơn giản và có thể cải thiện nhiều. Tuy nhiên, nó là một cơ sở cơ bản vững chắc và linh hoạt mà chúng ta cần.

# 4. UserRepository
Tiếp theo, hãy ngó qua UserRepository một chút, ta chỉ đơn giản là mở rộng JpaSpecificationExecutor để lấy APIs Specification mới:

```
interface UserRepository : JpaRepository<UserDao, Int?>, JpaSpecificationExecutor<UserDao>
```

# 5. Unit test cho câu truy vấn search

Bây giờ hãy thử qua chú API ta vừa tạo.

Đầu tiên, hãy tạo một vài người dùng và để chúng sẵn sàng cho unit test:

```
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceJPAConfig.class })
@Transactional
class JPASpecificationsTest {
    @Autowired
    private val repository: UserRepository? = null
    private var userJohn: UserDao = UserDao()
    private var userTom: UserDao = UserDao()
    @BeforeEach
    fun init() {
        userJohn.apply {
            firstName = "John"
            lastName = "Doe"
            email = "john@doe.com"
            age = 22
        }
        repository!!.save(userJohn)
        userTom.apply {
            firstName = "Tom"
            lastName = "Doe"
            email = "tom@doe.com"
            age = 26
        }
        repository.save(userTom)
    }
}
```

Tiếp, hãy xem ta sẽ tìm người dùng bằng "last name" như thế nào nhé:

```
@Test
fun givenLast_whenGettingListOfUsers_thenCorrect() {
    val spec = UserSpecification(SpecSearchCriteria("lastName", ":", "doe"))
    val results: List<UserDao> = repository!!.findAll(spec)
    assertEquals(true, results.contains(userJohn))
    assertEquals(true, results.contains(userTom))
}
```

Bây giờ, hãy tìm bằng cả "last name" và "first name"

```
@Test
fun givenFirstAndLastName_whenGettingListOfUsers_thenCorrect() {
    val spec1 = UserSpecification(SpecSearchCriteria("firstName", ":", "john"))
    val spec2 = UserSpecification(SpecSearchCriteria("lastName", ":", "doe"))
    val results: List<UserDao> = repository!!.findAll(Specification.where(spec1).and(spec2))
    assertEquals(true, results.contains(userJohn))
    assertEquals(false, results.contains(userTom))
}
```

Lưu ý: ta sử dụng "where" và "and" để kết hợp Specifications.

Sau đó, hãy tìm kiếm bằng "first name", "last name" và "age" nhỏ nhất 

```
@Test
fun givenLastAndAge_whenGettingListOfUsers_thenCorrect() {
    val spec1 = UserSpecification(SpecSearchCriteria("age", ">", "25"))
    val spec2 = UserSpecification(SpecSearchCriteria("lastName", ":", "doe"))
    val results: List<UserDao> = repository!!.findAll(Specification.where(spec1).and(spec2))
    assertEquals(true, results.contains(userJohn))
    assertEquals(false, results.contains(userTom))
}
```

Bây giờ hãy tìm thử một người dùng không tồn tại:

```
@Test
fun givenWrongFirstAndLast_whenGettingListOfUsers_thenCorrect() {
    val spec1 = UserSpecification(SpecSearchCriteria("firstName", ":", "Adam"))
    val spec2 = UserSpecification(SpecSearchCriteria("lastName", ":", "Fox"))
    val results: List<UserDao> = repository!!.findAll(Specification.where(spec1).and(spec2))
    assertEquals(false, results.contains(userJohn))
    assertEquals(false, results.contains(userTom))
}
```

Cuối cùng, chỉ tìm bằng 1 phần của "first name"

```
@Test
fun givenPartialFirst_whenGettingListOfUsers_thenCorrect() {
    val spec = UserSpecification(SpecSearchCriteria("firstName", ":", "jo"))
    val results: List<UserDao> = repository!!.findAll(spec)
    assertEquals(true, results.contains(userJohn))
    assertEquals(false, results.contains(userTom))
}
```

# 6. Kết hợp Specifications

Tiếp theo, nhìn qua chút về việc kết hợp Specifications để sử dụng nhiều ràng buộc và filter theo nhiều tiêu chí.

Ta sẽ triển khai 1 builder - UserSpecificationsBuilder - để kết hợp Specifications mượt mà và dễ dàng hơn.

```
class UserSpecificationsBuilder {
    private val params: MutableList<SpecSearchCriteria>
    fun with(key: String, operation: String, value: String): UserSpecificationsBuilder {
        params.add(SpecSearchCriteria(key, operation, value))
        return this
    }

    fun build(): Specification<UserDao>? {
        if (params.size == 0) {
            return null
        }
        val specs: List<Specification<*>> = params.stream()
            .map(Function<SpecSearchCriteria, R> { criteria: SpecSearchCriteria? -> UserSpecification(criteria) })
            .collect(Collectors.toList<Any>())
        var result = specs[0]
        for (i in 1 until params.size) {
            result = if (params[i]
                    .isOrPredicate()) Specification.where<Any>(result)
                .or(specs[i]) else Specification.where<Any>(result)
                .and(specs[i])
        }
        return result
    }

    init {
        params = ArrayList<SpecSearchCriteria>()
    }
}
```

# 7. UserController

Cuối cùng, sử dụng chức năng search/filter mới này và thiết lập REST API bằng cách tạo UserController bằng search operation đơn giản:

```
@Controller
class UserController {
    @Autowired
    private val repo: UserRepository? = null
    @RequestMapping(method = [RequestMethod.GET], value = ["/users"])
    @ResponseBody
    fun search(@RequestParam(value = "search") search: String): List<UserDao> {
        val builder = UserSpecificationsBuilder()
        val pattern: Pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),")
        val matcher: Matcher = pattern.matcher("$search,")
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3))
        }
        val spec: Specification<UserDao>? = builder.build()
        return repo!!.findAll(spec)
    }
}
```

Lưu ý rằng để hỗ trợ các hệ thống không phải tiếng Anh khác, Pattern object có thể thay đổi như sau:

```
pattern: Pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),", Pattern.UNICODE_CHARACTER_CLASS);
```

Dưới đây là ví dụ về URL để kiểm tra API:

```
http://localhost:8080/users?search=lastName:doe,age>25
```

Và kết quả trả về sẽ như sau( Lưu ý bạn phải cài và tạo database sẵn nhé)

```
[{
    "id":2,
    "firstName":"tom",
    "lastName":"doe",
    "email":"tom@doe.com",
    "age":26
}]
```
![image.png](https://images.viblo.asia/4400b9e2-1c24-4071-88e8-d47e80edd7f9.png)

Khi mà từ khóa đựoc phân chia bằng dấu "," trong Pattern ví dụ trên, các cụm từ tìm kiếm không được chứa ký tự này. Pattern cũng không nhận diện được dấu cách.

Nếu ta muốn tìm kiếm giá trị có chứa dấu cách thì ta có thể dùng cách phân chia khác ví dụ như ký tự ";"

Một cách khác là đổi pattern để tìm kiếm những giá trị giữa những trích dẫn, sau đó đưa chúng vào search pattern:

```
Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)(\"([^\"]+)\")");
```

# 8. Tổng kết

Bài viết này hướng dẫn các bạn một triển khai đơn giản có thể là cơ sở củaquẻy language REST mạnh mẽ. Chúng ta sử dụng Spring Data Specifications để đảm bảo rằng ta giữ API cách xa khỏi domain và có tùy chọn để xử lý nhiều loại operations khác.

Nguồn: https://www.baeldung.com/rest-api-search-language-spring-data-specifications