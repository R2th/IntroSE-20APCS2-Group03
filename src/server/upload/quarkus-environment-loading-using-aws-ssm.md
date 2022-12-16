# Quarkus là gì?
Quarkus là gì ?

Đầu tiên, chúng ta cần biết Quarkus là gì. Nó thật ra chỉ là 1 framework support người chơi hệ cloud serverless cực kỳ tốt, để biết thêm chi tiết  thì bạn có thể xem [ở đây](https://quarkus.io/).
Trong bài viết hôm nay mình sẽ init 1 project sử dụng quarkus, kotlin để tìm hiểu cơ chế quarkus load biến môi trường vào project

### Init project
Khá đơn giản, nếu bạn thích dùng maven thì sử dụng command dưới đây:

Linux hoặc macos thì có thể sử dụng command này để init
```
mvn io.quarkus:quarkus-maven-plugin:1.13.4.Final:create \
    -DprojectGroupId=org.acme \
    -DprojectArtifactId=demo-env \
    -DclassName="demo.DemoResource" \
    -Dpath="/hello"
```
Hoặc nếu xài OS khác thì bạn cũng có thể tham khảo cách init ở [đây](https://quarkus.io/guides/getting-started), bạn cũng có thể dùng `gradle` thay vì `maven` nếu thích.
Và cách nhanh nhất để init là vào [page](https://code.quarkus.io/?g=demo&a=demo-env&e=resteasy-jackson&e=kotlin&e=hibernate-orm-panache-kotlin&extension-search=json) , tick chọn các options mà mình thích rồi download về.

OK, init xong thì mình sẽ có 1 project cấu trúc như thế này:

```
demo-env
--.idea
--.mvn
--src
----main
------docker
--------Dockerfile.jvm
--------Dockerfile.legacy-jar
--------Dockerfile.native
--------Dockerfile.native-distroless
------kotlin
--------resteasyjackson
----------JacksonResource
----------MyObjectMapperCustomizer
--------resources
----------META-INF.resources
------------index.html
----------application.properties
--.dockerignore
.--gitignore
--demo-env.iml
--mvnw
--mvnw.cmd
--pom.xml
--README.md
```

=> Hoàn toàn không có file `Application` chứa method `main` như trong `SpringBoot` nhá

### Build Project
Trong file README.md sẽ có note dòng này, bạn cần chú ý để deploy code lên server

```
The application can be packaged using:

./mvnw package

It produces the quarkus-run.jar file in the target/quarkus-app/ directory. Be aware that it’s not an über-jar as the dependencies are copied into the target/quarkus-app/lib/ directory.
```

Nghĩa là đối với quarkus để start được bằng file jar thì phải dùng toàn bộ data build ở trong folder `target/quarkus-app`, nó sẽ tách riêng jar file và lib

Hoặc bạn cũng có thể build ra `uber-jar` file bằng command:
```
./mvnw package -Dquarkus.package.type=uber-jar
```
thì tất cả sẽ nhét hết vào trong file jar của bạn ở `target/quarkus-app/quarkus-run.jar`
file jar trong folder `target` thì bạn có thể bỏ qua không cần quan tâm

### Run project
OK, giờ mình sẽ tạo 1 API `current-time` để trả về thông tin ngày giờ hiện tại:

`demo.env.TimeResource`:
```
@Path("/current-time")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class TimeResource {

    @GET
    fun currentTime(): String {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYY-MM-DD HH:mm:ss"))
    }
}
```

Build:
```
./mvnw clean package
```
Run
```
 java -jar target/quarkus-app/quarkus-run.jar
```
=> Out put:
```
__  ____  __  _____   ___  __ ____  ______ 
 --/ __ \/ / / / _ | / _ \/ //_/ / / / __/ 
 -/ /_/ / /_/ / __ |/ , _/ ,< / /_/ /\ \   
--\___\_\____/_/ |_/_/|_/_/|_|\____/___/   
2021-05-20 22:20:06,287 INFO  [io.quarkus] (main) demo-env 1.0.0-SNAPSHOT on JVM (powered by Quarkus 1.13.4.Final) started in 1.016s. Listening on: http://0.0.0.0:8080
2021-05-20 22:20:06,290 INFO  [io.quarkus] (main) Profile prod activated. 
2021-05-20 22:20:06,290 INFO  [io.quarkus] (main) Installed features: [agroal, cdi, hibernate-orm, hibernate-orm-panache-kotlin, kotlin, mutiny, narayana-jta, resteasy, resteasy-jackson, smallrye-context-propagation]
```
Test
```
curl -X GET http://0.0.0.0:8080/current-time
```
Result
```
2021-05-20 22:22:39
```
=> Quá ổn đúng không ạ, tuy nhiên có 1 vấn đề, `LocalDateTime.now()` trả về giờ hiện tại, vậy đó là giờ hiện tại của múi giờ nào ?
# Env trong Quarkus
Để giải quyết vấn đề ở trên thì tùy project mà khách hàng sẽ yêu cầu bạn setting múi giờ của server là giờ nước nào, vậy tùy vào khách hàng thì mình sẽ setting múi giờ ở biến môi trường(env).

### Cách Quarkus load env:
Quarkus load env thông qua file application trong package resource. Thông thường sẽ là file `.properties` như trong `SpringBoot`.

Ok, giờ đầu tiên mình sẽ config timezone là UTC trong file `application.properties` như sau:
```
server.timezone=UTC
```

Create 1 class để config server load timezone:

`demo.config.ConfigTimeZone`:
```
@ApplicationScoped
class ConfigTimeZone {

    @ConfigProperty(name = "server.timezone")
    lateinit var timeZone: String

    val LOG = LoggerFactory.getLogger(ConfigTimeZone::class.java)

    fun startup(@Observes ev: StartupEvent?) {
        TimeZone.setDefault(TimeZone.getTimeZone(timeZone))
        LOG.info("Setting service timezone: {}", timeZone)
    }
}
```


Test lại 
```
curl -X GET http://0.0.0.0:8080/current-time
```
=> Output:
```
2021-05-20 15:44:38S
```
Đã khác kết quả ở trên rồi nhá.
=> Tuy nhiên, mỗi lần thay đổi timezone thì phải change file application.properties thì nó không hợp lý lắm. Mình có thể đưa nó vào biến môi trường.
### Các cơ chế load env của Quarkus:
Theo như tài liệu hướng [dẫn](https://quarkus.io/guides/config-reference#configuring_quarkus) thì default quarkus sử dụng [SmallRye Config](https://github.com/smallrye/smallrye-config) API, là 1 implement của  [MicroProfile Config](https://microprofile.io/project/eclipse/microprofile-config) specification.

Default, quarkus sẽ load theo độ ưu tiên như bên dưới:
1. System properties
2. Environment variables
3. File named .env placed in the current working directory
4. application.properties file placed in the $PWD/config/ directory
5. An application configuration file, i.e. src/main/resources/application.properties

Mình sẽ đi từng ví dụ để thấy cụ thể hơn:
##### System properties:
Giờ mình sẽ build và run lại project trên với cơ chế load System properties
Build:
```
./mvnw clean package
```
Run
```
 java -jar -Dserver.timezone=Asia/Tokyo target/quarkus-app/quarkus-run.jar
```
=> Output:
```
__  ____  __  _____   ___  __ ____  ______ 
 --/ __ \/ / / / _ | / _ \/ //_/ / / / __/ 
 -/ /_/ / /_/ / __ |/ , _/ ,< / /_/ /\ \   
--\___\_\____/_/ |_/_/|_/_/|_|\____/___/   
2021-05-20 22:57:52,825 INFO  [dem.con.ConfigTimeZone] (main) Setting service timezone: Asia/Tokyo
2021-05-20 22:57:52,941 INFO  [io.quarkus] (main) demo-env 1.0.0-SNAPSHOT on JVM (powered by Quarkus 1.13.4.Final) started in 0.953s. Listening on: http://0.0.0.0:8080
2021-05-20 22:57:52,942 INFO  [io.quarkus] (main) Profile prod activated. 
2021-05-20 22:57:52,943 INFO  [io.quarkus] (main) Installed features: [agroal, cdi, hibernate-orm, hibernate-orm-panache-kotlin, kotlin, mutiny, narayana-jta, resteasy, resteasy-jackson, smallrye-context-propagation]
```
Test
```
curl -X GET http://0.0.0.0:8080/current-time
```
=> Output:
```
2021-05-21 00:58:40
```
Ok, như vậy quarkus đã nhận múi giờ `Asia/Tokyo` và ghi đè lên múi giờ `UTC` như trong code rồi nhá

##### Environment variables:
Giờ đến Environment variables, để sử dụng cách load này thì mình phải truyền variable vào config, sửa file `application.properties` thành như này:
```
server.timezone=${QUARKUS_DEMO_TIMEZONE:UTC}
```
Nếu `QUARKUS_DEMO_TIMEZONE` có data thì nó sẽ nhận `QUARKUS_DEMO_TIMEZONE`, ngược lại thì nó sẽ load theo UTC

Set environment variable(ở đây mình dùng linux nên xài câu lệnh export cho nhan, bạn nào xài win thì cài thêm linux vào nhá, không thì có thể search cách setting environment trên mạng
```
export QUARKUS_DEMO_TIMEZONE=Asia/Tokyo
```
Check:
```
 echo $QUARKUS_DEMO_TIMEZONE
 => Asia/Tokyo
```
Build:
```
./mvnw clean package
```
Run
```
 java -jar target/quarkus-app/quarkus-run.jar
```
=> Output:
```
__  ____  __  _____   ___  __ ____  ______ 
 --/ __ \/ / / / _ | / _ \/ //_/ / / / __/ 
 -/ /_/ / /_/ / __ |/ , _/ ,< / /_/ /\ \   
--\___\_\____/_/ |_/_/|_/_/|_|\____/___/   
2021-05-20 23:08:47,559 INFO  [dem.con.ConfigTimeZone] (main) Setting service timezone: Asia/Japan
2021-05-20 23:08:47,670 INFO  [io.quarkus] (main) demo-env 1.0.0-SNAPSHOT on JVM (powered by Quarkus 1.13.4.Final) started in 0.966s. Listening on: http://0.0.0.0:8080
2021-05-20 23:08:47,672 INFO  [io.quarkus] (main) Profile prod activated. 
2021-05-20 23:08:47,672 INFO  [io.quarkus] (main) Installed features: [agroal, cdi, hibernate-orm, hibernate-orm-panache-kotlin, kotlin, mutiny, narayana-jta, resteasy, resteasy-jackson, smallrye-context-propagation]
```
Test:
```
curl -X GET http://0.0.0.0:8080/current-time
=> 2021-05-21 01:17:07
```

# Tổng kết
Như vậy qua bài viết này, mình đã hướng dẫn bạn cách load biến môi trường vào project quarkus thông qua `System properties` và `Environment variables` , phần tiếp theo mình sẽ giới thiệu các cách còn lại và config load với ssm của AWS như thế nào