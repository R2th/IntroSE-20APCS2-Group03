Tiếp theo sau phần 1, ở phần này chúng ta sẽ đi sâu vào các thiết lập và định nghĩa các **Class** và **Function** từ **IntelliJ** để xử lý cho việc gọi API từ phía client.

## Xây dựng các lớp Model
Để tương tác với các dữ liệu được lưu trữ từ **Postgres** ta cần xây dựng các lớp model tương ứng kết hợp với việc sử dụng **repository**. Như đã trình bày từ phần 1 chúng ta sẽ cần xây dựng 2 lớp **User** và **Todo**

Đầu tiên chúng ta tạo một thư mục có tên là **models** và định nghĩa một class **User** có nội dung như sau:
```kotlin
import io.ktor.auth.Principal
import java.io.Serializable

data class User (
    val userId: Int,
    val email: String,
    val displayName: String,
    val passwordHash: String
) : Serializable, Principal
```

Class này được sử dụng để tạo một User với các thành phần cần có là email, tên và mật khẩu dưới dạng hash cái mà giúp tăng bảo mật cho database

Kế tiếp trong thư mục **models** ta tạo tiếp một class là **Todo**:
```kotlin
data class Todo(
    val id: Int,
    val userId: Int,
    val todo: String,
    val done: Boolean
)
```

Class này có tác dụng để khai báo thông tin công việc cần làm của 1 user, với các tham số là user ID, nội dung công việc cần làm và trạng thái công việc đã làm xong hay chưa.

## Xây dựng các lớp Database
Ở bước này chúng ta sẽ tạo ra các class để giúp cho việc tương tác với các bảng của database.

Đầu tiên ta tạo thư mục có tên là **repository** để lưu trữ các class liên quan này. Kế đến ta tạo một file có tên là **Users** để giúp cho việc tạo bảng user trên database, file có nội dung như sau:

```kotlin
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table

object Users : Table() {
    val userID : Column<Int> = integer("id").autoIncrement().primaryKey()
    val email = varchar("email", 128).uniqueIndex()
    val displayName = varchar("display_name", 256)
    val passwordHash = varchar("password_hash", 64)
}
```

Class trên sẽ giúp cho chúng ta tạo ra 1 đối tượng user với 4 cột là id, email, tên và mật khẩu. Việc này giúp ta có thể lưu thông tin của user vào database dễ dàng.

Tiếp theo cũng trong thư mục **repository** ta tạo tiếp 1 object **Todos** với nội dung như sau:

```kotlin
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table

object Todos: Table() {
    val id : Column<Int> = integer("id").autoIncrement().primaryKey()
    val userId : Column<Int> = integer("userId").references(Users.userID)
    val todo = varchar("todo", 512)
    val done = bool("done")
}
```
Class này sẽ giúp tạo đối tượng **Todos** với việc liên kết đến user id ở bảng **Users**.

Kế đến, chúng ta tạo một classs là **DatabaseFactory** giúp cho việc tạo các bảng cần thiết và các thiết lập cơ bản để kết nối tới database của Postgres

```kotlin
import com.testapiserver.repository.Todos
import com.testapiserver.repository.Users
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseFactory {
    fun init() {
        Database.connect(hikari())

        transaction {
            SchemaUtils.create(Users)
            SchemaUtils.create(Todos)
        }
    }

    private fun hikari(): HikariDataSource {
        val config = HikariConfig()
        config.driverClassName = System.getenv("JDBC_DRIVER")
        config.jdbcUrl = System.getenv("JDBC_DATABASE_URL")
        config.maximumPoolSize = 3
        config.isAutoCommit = false
        config.transactionIsolation = "TRANSACTION_REPEATABLE_READ"
        val user = System.getenv("DB_USER")
        if (user != null) {
            config.username = user
        }
        
        val password = System.getenv("DB_PASSWORD")
        if (password != null) {
            config.password = password
        }
        config.validate()
        return HikariDataSource(config)
    }

    suspend fun <T> dbQuery(block: () -> T): T =
        withContext(Dispatchers.IO) {
            transaction { block() }
        }
}
```

Class trên sẽ chứa 3 hàm:
* Hàm **init()**: khởi tạo việc kết nối đến database và tạo 2 bảng là Users và Todos
* Hàm **hikari()**: thiết lập các tham số cần cho việc kết nối đến database, các tham số này chúng ta đã cấu hình ở bước trước đó gồm **JDBC_DRIVER**, **JDBC_DATABASE_URL**. Nếu chúng ta dùng một tải khoản khác ngoài tài khoản mặc định của postgres thì cần thêm 2 tham số là **DB_USER**, **DB_PASSWORD** để giúp chứng thực việc kết nối tới database.
* Hàm **dbQuery(block: () -> T)**: sử dụng cơ chế của **Coroutines** để chạy các hàm gọi đến database trong IO thread, giúp cho các tác vụ xử lý của server không bị chậm và gián đoạn.

## Tạo Repository cho việc quản lý các hàm gọi tới Database
Ở bước này chúng ta sẽ định nghĩa ra các phương thức để truy cập và thao tác lên database của Postgres từ bên trong project IntelliJ. 

Để thực hiện việc này tại thư mục **repository** ta  thêm một **interface** tên là **Repostiory** và khai báo các phương thức như sau:

```kotlin
interface Repository {
    suspend fun addUser(email: String,
                        displayName: String,
                        passwordHash: String): User?
    suspend fun findUser(userId: Int): User?
    suspend fun findUserByEmail(email: String): User?

    suspend fun addTodo(userId: Int, todo: String, done: Boolean): Todo?
    suspend fun getTodos(userId: Int): List<Todo>
}
```

Ta có thể thấy inteface này gồm các phương thức: thêm user, tìm user bởi id và email, thêm công việc và lấy danh sách công việc của user.
Tất cả các hàm đều sử dụng cơ chế **Coroutines** giúp cho việc chạy có thể hoạt động bất đồng bộ, không làm gián đoạn server.

Kế đến ta sẽ thực hiện việc cài đặt các phương thức này. Tại thư mục **repository** ta tạo thêm file có tên là **TodoRepository** để bắt đầu việc cài đặt, nội dung như sau:

```kotlin
class TodoRepository : Repository {
    override suspend fun addUser(email: String, displayName: String, passwordHash: String): User? {
        var statement: InsertStatement<Number>? = null //1
        dbQuery { //2
            statement = Users.insert { user -> //3
                user[Users.email] = email
                user[Users.displayName] = displayName
                user[Users.passwordHash] = passwordHash
            }
        }

        return rowToUser(statement?.resultedValues?.get(0)) //4
    }

    private fun rowToUser(row: ResultRow?): User? {
        if (row == null) {
            return null
        }

        return User(
            userId = row[Users.userID],
            email = row[Users.email],
            displayName = row[Users.displayName],
            passwordHash = row[Users.passwordHash]
        )
    }

    override suspend fun findUser(userId: Int): User? {
        return dbQuery {
            Users.select {
                Users.userID.eq(userId)
            }.map { rowToUser(it) }.singleOrNull()
        }
    }

    override suspend fun findUserByEmail(email: String): User? {
        return dbQuery {
            Users.select {
                Users.email.eq(email)
            }.map { rowToUser(it) }.singleOrNull()
        }
    }

    override suspend fun addTodo(userId: Int, todoText: String, done: Boolean): Todo? {
        var statement : InsertStatement<Number>? = null
        dbQuery {
            statement = Todos.insert {todo ->
                todo[Todos.userId] = userId
                todo[Todos.todo] = todoText
                todo[Todos.done] = done
            }
        }
        return rowToTodo(statement?.resultedValues?.get(0))
    }

    override suspend fun getTodos(userId: Int): List<Todo> {
        return dbQuery {
            Todos.select {
                Todos.userId.eq((userId))
            }.mapNotNull { rowToTodo(it) }
        }
    }

    private fun rowToTodo(row: ResultRow?): Todo? {
        if (row == null) {
            return null
        }
        return Todo(
            id = row[Todos.id],
            userId = row[Todos.userId],
            todo = row[Todos.todo],
            done = row[Todos.done]
        )
    }
}
```

Ở đây ta thấy hàm addUser sẽ nhận các tham số đầu vào là chuỗi email và password. Dựa trên các phần đánh dấu bên trong thân hàm ta có thể thấy nó gồm các bước chính:
1. Sử dụng câu lệnh **InsertStatement** của thư viện Exposed mà ta đã khai báo trước đó trong file build.gradle để giúp thêm dữ liệu vào database của Postgres.
2. **dbQuery** sử dụng cơ chế Coroutines để chạy các hàm thao tác đến database.
3. Sử dụng câu lệnh **insert** có sẵn từ lớp Table để tiến hành thêm 1 record vào bảng.
4. Thực hiện hàm **rowToUser** để phục vụ cho việc chuyển đổi dạng dữ liệu từ **ResultRow** đến **User**.

Các hàm còn lại như **findUser**, **addTodo**, **getTodos** cũng thực hiện theo cơ chế tương tự như trên.

## Xây dựng các lớp cho việc chứng thực User
Khi làm việc với các dữ liệu liên quan đến User chúng ta cần phải xây dựng các lớp chứng thực để giúp server được xây dựng có tính bảo mật và phục vụ đúng đối tượng gửi request. Ở bước tạo dự án trước đó chúng ta đã chọn phương pháp chứng thực là **JWT**, giờ đây chúng ta sẽ tạo ra các phương thức dựa trên phương pháp này.

Đầu tiên, chúng ta tạo một thư mục có tên là **auth**. Từ thư mục đó tạo file **Auth.kt** với nội dung như sau:

```kotlin
mport io.ktor.util.KtorExperimentalAPI
import io.ktor.util.hex
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

@KtorExperimentalAPI
val hashKey = hex(System.getenv("SECRET_KEY"))

@KtorExperimentalAPI
val hmacKey = SecretKeySpec(hashKey, "HmacSHA1")

@KtorExperimentalAPI
fun hash(password: String) : String {
    val hmac = Mac.getInstance("HmacSHA1")
    hmac.init(hmacKey)
    return hex(hmac.doFinal(password.toByteArray(Charsets.UTF_8)))
}
```

File trên có tác dụng là lấy ra **hashKey** thông qua biến môi trường **SECRET_KEY** ta đã tạo từ bước trước đó và một hàm để **hash** một chuỗi bất kì sử dụng thuật toán **HmacSHA1**.

Kế đến ở thư mục auth, ta tạo tiếp một file **JwtService.kt** với nội dung:

```kotlin
import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.testapiserver.models.User
import java.util.*

class JwtService {
    private val issuer = "testapiserver"
    private val jwtSecret = System.getenv("JWT_SECRET")
    private val algorithm = Algorithm.HMAC512(jwtSecret)

    val verifier: JWTVerifier = JWT.require(algorithm).withIssuer(issuer).build()

    fun generateToken(user: User): String = JWT.create()
        .withSubject("Authentication")
        .withIssuer(issuer)
        .withClaim("id", user.userId)
        .withExpiresAt(expiresAt())
        .sign(algorithm)

    private fun expiresAt(): Date? {
        return Date(System.currentTimeMillis() + 3_600_000 * 24) // 24 hours
    }
}
```

File này giúp cho ta tạo một service JWT có tác dụng chứng thực các request từ phía client gửi lên. Hàm **generateToken** có tác dụng tạo ra một token sử dụng cho việc chứng thực các request của user sau khi user đã đăng nhập thành công. Chuỗi token này sẽ hết hạn sau 24h.

Cuối cùng tại thư mục **auth** này ta tạo thêm một data class **MySession** để lưu trữ **session** của user, nội dung lưu trữ chính là id của user

```kotlin
data class MySession(val userId: Int)
```

## Cập nhật các cấu hình cho việc chạy Application
Ở bước này, ta sẽ sử dụng các lớp đã định nghĩa ở trên để cấu hình lại cho việc chạy server đang xây dựng.

Tại file **Application.kt**, ta thay thế class **MySession** bằng lớp **Mysession** chúng ta vừa tạo.
Phía dưới câu lệnh **install(Sessions)** ta thêm các đoạn code sau:

```kotlin
    // 1
    DatabaseFactory.init()
    val db = TodoRepository()
    // 2
    val jwtService = JwtService()
    val hashFunction = { s: String -> hash(s) }
```

Đoạn code trên có tác dụng cho việc khởi tạo database và các chứng thực về JWT ta đã xây dựng ở bước trên

Tiếp đến ở phần **install(Authentication)** ta cập nhật lại nội dung để sử dụng JWT service cho việc verify các request từ client gửi đến.
```kotlin
install(Authentication) {
        jwt("jwt") { //1
            verifier(jwtService.verifier) // 2
            realm = "API Server"
            validate { // 3
                val payload = it.payload
                val claim = payload.getClaim("id")
                val claimString = claim.asInt()
                val user = db.findUser(claimString) // 4
                user
            }
        }
    }
```
Hàm trên có nhiệm vụ là chứng thực lời gọi của user có hợp lệ hay không dựa vào id của user từ database đã lưu và id của user gửi lên có tồn tại hay không.

Cuối cùng chúng ta build lại server và đảm bảo có thể thấy được các log liên quan đến **Hikari** và có thể kết nối database thành công mà không báo lỗi gì.

![](https://images.viblo.asia/ded25c62-888e-4d19-a482-2e8ff08a2e1f.png)

## Xây dựng các Routes
Ở bước này chúng ta sẽ xây dựng các Route giúp cho phía client có thể thực hiện các request lên server, cùng đó là các xử lý tương ứng với các request gửi lên để trả kết quả về cho phía client.

Việc đầu tiên là ở file Application.kt, chúng ta tạo một đường dẫn prefix cho các Route, việc này không bắt buộc nhưng được khuyến khích để có những update cho server về sau chúng ta sẽ dễ dàng quản lý các route và bảo trì. Ta add đoạn code sau vào cuối file Application.kt

```kotlin
const val API_VERSION = "/v1"
```

Ta sẽ bắt đầu xây dựng các Route liên quan đến User. Tạ tạo thư mục routes để lưu giữ các file liên quan, tiếp đến tạo một file là UserRoute, chúng ta import các thư viện liên quan ở đầu file để tránh các vấn đề chọn sai thư viện như sau:

```kotlin
import com.testapiserver.API_VERSION
import com.testapiserver.auth.JwtService
import com.testapiserver.auth.MySession
import com.testapiserver.repository.Repository
import io.ktor.application.application
import io.ktor.application.call
import io.ktor.application.log
import io.ktor.http.HttpStatusCode
import io.ktor.http.Parameters
import io.ktor.locations.KtorExperimentalLocationsAPI
import io.ktor.locations.Location
import io.ktor.locations.post
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.Route
import io.ktor.sessions.sessions
import io.ktor.sessions.set
```

Kế đến, định nghĩa các đường dẫn route liên quan đến users

```kotlin
const val USERS = "$API_VERSION/users"
const val USER_LOGIN = "$USERS/login"
const val USER_CREATE = "$USERS/create"
```

Đối với mỗi đường dẫn Route, ta tạo các class để xử lý các chức năng liên quan đến nó, ở đây ta có 2 đường dẫn là "users/login" và "users/create" ta sẽ khai báo lần lượt 2 class là UserLoginRoute và UserCreateRoute như sau:

```kotlin
@KtorExperimentalLocationsAPI
@Location(USER_CREATE)
class UserCreateRoute

@KtorExperimentalLocationsAPI
@Location(USER_LOGIN)
class UserLoginRoute
```

Ta thấy mỗi định nghĩa sẽ có 3 phần: 
* @KtorExperimentalLocationsAPI: dùng để loại bỏ các warning khi compile code
* @Location(USER_CREATE): xác định đường dẫn Route cần cài đặt
* class UserCreateRoute: định nghĩa class xử lý việc thực thi khi client gọi tới Route tương ứng

Kế tiếp ta thực hiện việc cài đặt phần UserCreateRoute và UserLoginRoute như sau:
```kotlin
@KtorExperimentalLocationsAPI
// 1
fun Route.users(
    db: Repository,
    jwtService: JwtService,
    hashFunction: (String) -> String
) {
    post<UserCreateRoute> { // 2
        val signupParameters = call.receive<Parameters>() // 3
        val password = signupParameters["password"] // 4
            ?: return@post call.respond(
                HttpStatusCode.Unauthorized, "Missing Fields")
        val displayName = signupParameters["displayName"]
            ?: return@post call.respond(
                HttpStatusCode.Unauthorized, "Missing Fields")
        val email = signupParameters["email"]
            ?: return@post call.respond(
                HttpStatusCode.Unauthorized, "Missing Fields")
        val hash = hashFunction(password) // 5
        try {
            val newUser = db.addUser(email, displayName, hash) // 6
            newUser?.userId?.let {
                call.sessions.set(MySession(it))
                call.respondText(
                    jwtService.generateToken(newUser),
                    status = HttpStatusCode.Created
                )
            }
        } catch (e: Throwable) {
            application.log.error("Failed to register user", e)
            call.respond(HttpStatusCode.BadRequest, "Problems creating User")
        }
    }

    post<UserLoginRoute> {
        val signinParameters = call.receive<Parameters>()
        val password = signinParameters["password"]
            ?: return@post call.respond(
                HttpStatusCode.Unauthorized, "Missing Fields")
        val email = signinParameters["email"]
            ?: return@post call.respond(
                HttpStatusCode.Unauthorized, "Missing Fields")
        val hash = hashFunction(password)
        try {
            val currentUser = db.findUserByEmail(email)
            currentUser?.userId?.let {
                if (currentUser.passwordHash == hash) {
                    call.sessions.set(MySession(it))
                    call.respondText(jwtService.generateToken(currentUser))
                } else {
                    call.respond(
                        HttpStatusCode.BadRequest, "Problems retrieving User")
                }
            }
        } catch (e: Throwable) {
            application.log.error("Failed to register user", e)
            call.respond(HttpStatusCode.BadRequest, "Problems retrieving User")
        }
    }
}
```
Phân tích thử hàm UserCreateRoute ta thấy có các công việc sau:
1. Định nghĩa một extension function của class Route có tên là users. Hàm này nhận các tham số đầu vào là repository, JWT serveice và một hàm hash.
2. Khởi tạo một route với tác vụ POST 
3. Thực hiện lệnh call để lấy về các tham số được truyền khi request
4. Thức hiện check các tham số password, displayName, email nếu không có thì trả về mã lỗi
5. Tạo một hash string từ mật khẩu nhận được
6. Thực hiện câu lệnh thêm user vào database

Với hàm UserLoginRoute thì việc check cũng tương ứng, nhận vào email và password. Sau đó kiểm tra email và password sau khi hash có tồn tại trong database không. Nếu có trả về login thành công, ngược lại trả về lỗi.

Kế tiếp, tại thư mục routes ta tạo file TodosRoute.kt để xây dựng các route và xử lý liên quan đến danh sách công việc Todo, nội dung như bên dưới:

```kotlin
const val TODOS = "$API_VERSION/todos"

@KtorExperimentalLocationsAPI
@Location(TODOS)
class TodoRoute

@KtorExperimentalLocationsAPI
fun Route.todos(db: Repository) {
    authenticate("jwt") { // 1
        post<TodoRoute> { // 2
            val todosParameters = call.receive<Parameters>()
            val todo = todosParameters["todo"]
                ?: return@post call.respond(
                    HttpStatusCode.BadRequest, "Missing Todo"
                )
            val done = todosParameters["done"] ?: "false"
            // 3
            val user = call.sessions.get<MySession>()?.let {
                db.findUser(it.userId)
            }
            if (user == null) {
                call.respond(
                    HttpStatusCode.BadRequest, "Problems retrieving User"
                )
                return@post
            }

            try {
                // 4
                val currentTodo = db.addTodo(
                    user.userId, todo, done.toBoolean()
                )
                currentTodo?.id?.let {
                    call.respond(HttpStatusCode.OK, currentTodo)
                }
            } catch (e: Throwable) {
                application.log.error("Failed to add todo", e)
                call.respond(HttpStatusCode.BadRequest, "Problems Saving Todo")
            }
        }

        get<TodoRoute> {
            val user = call.sessions.get<MySession>()?.let { db.findUser(it.userId) }
            if (user == null) {
                call.respond(HttpStatusCode.BadRequest, "Problems retrieving User")
                return@get
            }
            try {
                val todos = db.getTodos(user.userId)
                call.respond(todos)
            } catch (e: Throwable) {
                application.log.error("Failed to get Todos", e)
                call.respond(HttpStatusCode.BadRequest, "Problems getting Todos")
            }
        }
    }
}
```

Về cơ bản nó sẽ gồm 2 công việc, sử dụng phương thức POST cho việc thêm công việc của một user đến database, và một thức GET cho việc lấy danh sách công việc từ user id được truyền lên từ request.
Ở đây ta lưu ý là có thể sử dụng cùng một route cho 3 phương thức khác nhau là POST, GET hoặc DELETE.

Cơ bản, chúng ta đã xây dựng xong các phương pháp cần thiết cho việc xử lý các route từ phía server. Bước cuối cùng là ta thông báo cho server chúng ta có thể chấp nhận xử lý các request nào gọi tới.
Để làm việc này ta mở lại file Application.kt và tìm đến dòng routing, ta sẽ thêm vào 2 function route đã xây dựng:
```kotlin
routing {
        users(db, jwtService, hashFunction)
        todos(db)
    }
```

Đến đây, chúng ta đã hoàn thành việc xây dựng server cơ bản, bước kế tiếp chúng ta sẽ kiểm tra việc hoạt động của nó.

## Kiểm tra việc chạy server
Để thực hiện việc kiểm tra các API đã xây dựng hoạt động có chính xác không, ta dùng 1 công cụ rất hay là **Postman** (https://www.postman.com/) để chạy thực nghiệm.

Sau khi cài đặt **Postman**, ta tiến hành test việc tạo một user với các thông tin như sau:
* Phương thức: **POST**
* Đường dẫn: **localhost:8080/v1/users/create**
* Body: với 3 tham số **displayName**, **email**, **password**

Sau khi nhập đầy đủ các thông tin, chúng ta nhấn **Send**. Thông tin trả về sẽ là một chuỗi **token** như hình bên dưới

![](https://images.viblo.asia/85aa2d0a-bb3c-4af2-b904-bbdfb2794010.PNG)

Ta sẽ tiến hành lưu chuỗi token này lại, sử dụng cho các lần truy cập sau của user này, để thực hiện ta mở tab **Test** và gõ dòng lệnh sau
```kotlin
var data = responseBody;
postman.clearGlobalVariable("jwt_token");
postman.setGlobalVariable("jwt_token", data);
```

![](https://images.viblo.asia/b6330b77-2c01-471c-82bd-9e46abbc6700.PNG)

Các dòng lệnh trên giúp ta lưu trữ **token** vào một biến có tên là **jwt_token**.

Kế tiếp ta sẽ thực viện việc gọi login cho user với các thông tin đã đăng kí ở trên, ta thiết lập trên Postman như sau:
* Phương thức: **POST**
* Đường dẫn: **localhost:8080/v1/users/login**
* Body: với 2 tham số **email**, **password**
  
Nếu nhận được thông tin **token** là việc **login** đã thành công, xem hình mình hoạ bên dưới

![](https://images.viblo.asia/1ae464a1-5c7d-4e9c-be6f-2e4ab8400a9c.PNG)

Với user đã đăng nhập thành công, ta sẽ thực hiện chạy API về tạo danh sách **Todo** các công việc của user đó. Trước tiên ta cần chứng thực thông tin user đã login bằng các thêm vào tab **Authorization** một chuỗi token có tên là **jwt_token** đã định nghĩa ở bước trên

![](https://images.viblo.asia/23c11a6f-936a-4720-8eff-b6ee75d07d10.PNG)

Tiếp theo tạo thông tin như sau:
* Phương thức: **POST**
* Đường dẫn: **localhost:8080/v1/todos**
* Body: với 2 tham số **todo**, **done**

Khi các bước chạy thành công, ta sẽ thấy kết quả trả về như hình bên dưới

![](https://images.viblo.asia/efed8366-1792-49c3-ac7a-a1d53d732ad7.PNG)

Đối việc lấy danh sách Todos, chúng ta chỉ cần chuyển đổi phương thức từ **POST** đến **GET** là có thể thực hiện.

![](https://images.viblo.asia/821168ee-9c57-41ba-8509-c2ba279b6d8c.PNG)

Đến đây chúng ta có thể kiểm tra thành công 4 API chúng ta vừa tạo từ server.

## Tham khảo
1. https://www.raywenderlich.com/7265034-ktor-rest-api-for-mobile