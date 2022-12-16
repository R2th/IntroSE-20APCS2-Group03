Mình nhớ hồi xưa khi được dạy software development. Giờ kiểm tra thầy giáo cầm cái tờ giấy có in [Testing Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#:~:text=The%20%22Test%20Pyramid%22%20is%20a%20metaphor%20that%20tells,still%20struggle%20to%20put%20it%20into%20practice%20properly.) và hỏi mình: Cái gì đây? Mình trả lời: Đó là tờ giấy ... =)).

Từ câu chuyện mì chính (nhưng khá nhạt, và chỉ là phụ), chúng ta chuyển sang câu chuyện đậu phụ (vẫn khá nhạt, nhưng là chính): Integration Test.

### Definition
Theo [Wikipedia](https://en.wikipedia.org/wiki/Integration_testing)

> Integration testing (sometimes called integration and testing, abbreviated I&T) is the phase in software testing in which individual software modules are combined and tested as a group. Integration testing is conducted to evaluate the compliance of a system or component with specified functional requirements. It occurs after unit testing and before validation testing. Integration testing takes as its input modules that have been unit tested, groups them in larger aggregates, applies tests defined in an integration test plan to those aggregates, and delivers as its output the integrated system ready for system testing.

Nói một cách đơn giản thì Integration Test được sử dụng để test functionally between **modules/ layers**. Ví dụ như:
- Logic layer và database layer. 
- UI layer và logic layer.
- etc ...


Để thực hiện Integration Test, lấy ví dụ như logic and database layers. Việc đầu tiên ta sẽ cần **mock** database layer. Tạo ra một dạng collection tương đương. Sau đó test functionality qua việc pass **mock objects as repo objects**. 

Nghe cũng đơn giản hầy?

Tuy nhiên, lòng người thay đổi, xã hội đổi thay. Các layer, modules càng ngày càng phức tạp. Ví dụ như bạn dùng RabbitMQ, hay ActiveMQ để queue messages, hoặc bạn dùng redis cho cache, hoặc dạng database mà bạn dùng có một cái schema [rất chi là củ chuối](https://www.activequerybuilder.com/blog/understanding-a-complex-database-structure/).

Vậy lúc đó bạn nên làm gì?

Bạn nên bỏ việc đi.

À đùa thôi ...

Bạn nên dùng **Test Container**.

### Test Container

Test container được miêu tả trên trang chủ của họ là:

> “TestContainers is a Java library that supports JUnit tests, providing lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container.”

Nghe ngầu bá cháy đúng không? Đúng là thế giới lắm người tài. :'( 

Quay trở lại câu chuyện Integration Test, với **Test Container**, bạn hoàn toàn có thể setup mọi thứ **with-in-container**.

Ví dụ như:

- Redis Cache khiến bạn đau đầu?

```
public class RedisBackedCacheTest {
    @Rule
    public GenericContainer redis = new GenericContainer("redis:3.0.6")
                                       .withExposedPorts(6379);
```

- Database với schema củ chuối khiến bạn mệt mỏi?

```
PostgreSQLContainer postgreSQLContainer = new PostgreSQLContainer("postgres:9.6.2")
       .withUsername(POSTGRES_USERNAME)
       .withPassword(POSTGRES_PASSWORD);
```

- Thử lòng người yêu cũ và cái kết?

```
public GenericContainer nguoiyeucu = new GenericContainer("nguoiyeucu:1.0.6")
                                       .withExposedPorts(8000);
```

### Tại sao bạn nên dùng Test Container

- Bạn build test theo kiểu self-contained. \m/
- Bạn có faster feedback loop. \m/
- Bạn isolated được instances containers, thuận tiện cho việc parallel execution test. \m/
- Bạn sử dụng container một cách clean, known state \m/
- Bạn muốn bỏ việc

### Tại sao bạn không nên dùng Test Container
- Bạn phải install docker
- Bạn lười.
- Bạn muốn bỏ việc

### Tricks / tips với Test Container

Khi bạn chạy CI với Test Container, bạn cần provide docker api IP cho nó. Thông thường sẽ là: tcp://host-của-bạn:2375. Ví dụ trên gitlab CI:

```
# DinD service is required for Testcontainers
services:
  - docker:dind

variables:
  # Instruct Testcontainers to use the daemon of DinD.
  DOCKER_HOST: "tcp://docker:2375"
  # Instruct Docker not to start over TLS.
  DOCKER_TLS_CERTDIR: ""
  # Improve performance with overlayfs.
  DOCKER_DRIVER: overlay2

test:
 image: gradle:5.0
 stage: test
 script: ./gradlew test
```

Câu chuyện ở đây là: Việc mở cổng 2375 cho docker là không được khuyến khích vì nó **không đủ secure** cho docker socket của bạn. Nếu ai có thể truy cập cổng đó thì sẽ có **full root access mà không cần có password.** 

Vậy chúng ta nên làm gì trong trường hợp này?

Bạn nên bỏ việc đi ...

Việc mình hay làm là dùng docker scale group của gitlab, vì cha chung không ai khóc =)). Nên cũng không lo việc bị remotely truy cập port.

Cách số hai là dùng các cổng khác, và setup TLS nghiêm chỉnh. Bằng cách đó thì docker host của bạn sẽ an toàn hơn. Bạn có thể tìm hiểu thêm ở [đây](https://docs.docker.com/engine/security/protect-access/).

Vậy đó. Chúc các bạn một tuần làm việc vui vẻ.

À mà nếu không vui thì hãy bỏ việc đi ...

Somewhere, xx-xx-20xx

Rice