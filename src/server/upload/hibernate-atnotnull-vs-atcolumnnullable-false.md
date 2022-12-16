# Introduction
Trong bài này mình sẽ giới thiệu về 2 anotation thường dùng trong hibernate @NotNull và @Column(nullable = false). Thoạt nhìn qua thì có vẻ 2 anotation này có chung 1 mục đích để đảm bảo rằng column trong DB sẽ không được phép null.

Tuy nhiên khi đi sâu vào bài này, ta sẽ thấy được 2 anotation này có mục đích hoàn toàn khác nhau, tùy tình huống mà chỉ có thể dùng 1 trong 2.
# Demo
OK, giờ mình demo luôn cho dễ hiểu, ở đây mình dùng SpringBoot, Kotlin, MySQL và Hibernate để demo

### Dependency
Để sử dụng được @NotNull trong hibernate, đối với SpringBoot version mới nhất, phải add dependency validation của spring vào, vì có vẻ như module này đã bị tách ra khỏi phần core của SpringBoot
```
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation</artifactId>
		</dependency>
```

### Entity
Ở đây mình sẽ define 2 Entity để demo. `CatEntity` sẽ dùng `@NotNull`, và `ButterflyEntity` sẽ dùng `@Column(nullable = false)`

CatEntity:
```
@Entity
@Table(name = "cat")
class CatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    @NotNull
    var name: String? = null

    @NotNull
    var weight: Double? = null
}
```

ButterflyEntity:
```
@Entity
@Table(name = "butterfly")
class ButterflyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    @Column(nullable = false)
    var name: String? = null

    @Column(nullable = false)
    var weight: Double? = null
}
```

### Schema Generation
Giờ mình sẽ config để hibernate tự động generate table `cat` và `butterfly`

Add 2 dòng này vào file `application.properties`
```
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

Chúng ta sẽ có đoạn log như thế này khi start project.

Output:
```
Hibernate:    
    drop table if exists butterfly
2020-11-20 23:00:11.107  INFO 12432 --- [         task-1] com.zaxxer.hikari.HikariDataSource       : HikariCP - Starting...
2020-11-20 23:00:13.609  INFO 12432 --- [         task-1] com.zaxxer.hikari.HikariDataSource       : HikariCP - Start completed.

Hibernate:     
    drop table if exists cat

Hibernate: 
    create table butterfly (
       id bigint not null auto_increment,
        name varchar(255) not null,
        weight double precision not null,
        primary key (id)
    ) engine=InnoDB

Hibernate: 
    create table cat (
       id bigint not null auto_increment,
        name varchar(255) not null,
        weight double precision not null,
        primary key (id)
    ) engine=InnoDB
```
Như vậy, hibernate đã generate giúp ta table `butterfly` và `cat` có các field đều NOT NULL, dù mình sử dụng `@NotNull` hay `@Column(nullable=false)`

### Save data NULL
Vậy giờ mình thử save data null của 2 table `butterfly` và `cat` thì xem log thế nào. Mình tạo 1 controller cho Cat để create data `cat` lưu data null, và tương tự cho `butterfly`

CatController:
```
@RestController
@RequestMapping("/api/v1/cat")
class CatController(val catService: CatService) {
    @PostMapping
    fun create(@RequestBody map: Map<String, Any>): ResponseEntity<*> {
        return ResponseEntity.ok(catService.create(map))
    }

    @GetMapping
    fun get(): ResponseEntity<*> {
        return ResponseEntity.ok(catService.list())
    }
}
```

ButterflyController:
```
@RestController
@RequestMapping("/api/v1/butterfly")
class ButterflyController(val butterflyService: ButterflyService) {
    @PostMapping
    fun create(@RequestBody map: Map<String, Any>): ResponseEntity<*> {
        return ResponseEntity.ok(butterflyService.create(map))
    }

    @GetMapping
    fun get(): ResponseEntity<*> {
        return ResponseEntity.ok(butterflyService.list())
    }
}
```
CatService:
```
@Service
class CatServiceImpl(val catRepository: CatRepository) : CatService {
    override fun create(map: Map<String, Any>): CatEntity {
        val catEntity = CatEntity()
        return catRepository.save(catEntity)
    }

    override fun list(): List<CatEntity> {
        val list = catRepository.findAll()
        return list
    }

}
```
ButterflyService:
```
@Service
class ButterflyServiceImpl(val butterflyRepository: ButterflyRepository) : ButterflyService {
    override fun create(map: Map<String, Any>): ButterflyEntity {
        val butterfly = ButterflyEntity()
        return butterflyRepository.save(butterfly)
    }

    override fun list(): List<ButterflyEntity> {
        val list = butterflyRepository.findAll()
        return list
    }

}
```

OK, bây giờ thử cURL đến api tạo data `cat` xem thế nào:
cURL:
```curl -X POST \
  http://localhost:8082/api/v1/cat \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 0019d849-78a4-fec8-26f7-bb6a56a5fb56' \
  -d '{}'
```
=> Log:
```
2020-11-20 23:17:37.073 ERROR 2708 --- [ctor-http-nio-2] a.w.r.e.AbstractErrorWebExceptionHandler : [b4802838-1]  500 Server Error for HTTP POST "/api/v1/cat"
javax.validation.ConstraintViolationException: Validation failed for classes [com.database.json.example.demo.entity.CatEntity] during persist time for groups [javax.validation.groups.Default, ]
List of constraint violations:[
	ConstraintViolationImpl{interpolatedMessage='must not be null', propertyPath=name, rootBeanClass=class com.database.json.example.demo.entity.CatEntity, messageTemplate='{javax.validation.constraints.NotNull.message}'}
	ConstraintViolationImpl{interpolatedMessage='must not be null', propertyPath=weight, rootBeanClass=class com.database.json.example.demo.entity.CatEntity, messageTemplate='{javax.validation.constraints.NotNull.message}'}
]
	at org.hibernate.cfg.beanvalidation.BeanValidationEventListener.validate(BeanValidationEventListener.java:140) ~[hibernate-core-5.4.20.Final.jar:5.4.20.Final]
	Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException: 
Error has been observed at the following site(s):
	|_ checkpoint ⇢ HTTP POST "/api/v1/cat" [ExceptionHandlingWebHandler]
Stack trace:
		at org.hibernate.cfg.beanvalidation.BeanValidationEventListener.validate(BeanValidationEventListener.java:140) ~[hibernate-core-5.4.20.Final.jar:5.4.20.Final]
		at org.hibernate.cfg.beanvalidation.BeanValidationEventListener.onPreInsert(BeanValidationEventListener.java:80) ~[hibernate-core-5.4.20.Final.jar:5.4.20.Final]
		at org.hibernate.action.internal.EntityIdentityInsertAction.preInsert(EntityIdentityInsertAction.java:203) ~[hibernate-core-5.4.20.Final.jar:5.4.20.Final]
		at org.hibernate.action.internal.EntityIdentityInsertAction.execute(EntityIdentityInsertAction.java:78) ~[hibernate-core-5.4.20.Final.jar:5.4.20.Final]
		at org.hibernate.engine.spi.ActionQueue.execute(ActionQueue.java:645) ~[hibernate-core-5.4.20.Final.jar:5.4.20.Final]
```
Như vậy, ta thấy được ở `CatEntity` đang dùng `@NotNull` của validation, nên sẽ bị validate trước khi insert xuống DB, không thỏa validate nên lỗi được bắn ra.

Vậy giờ thử với `ButterflyEntity` xem thế nào.

cURL:
```
curl -X POST \
  http://localhost:8082/api/v1/butterfly \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: aa9305c6-dfac-4bc0-af50-3463a398bff1' \
  -d '{}'
```
==> Log:
```
Hibernate: 
    insert 
    into
        butterfly
        (name, weight) 
    values
        (?, ?)
2020-11-20 23:21:22.389  WARN 2708 --- [ctor-http-nio-2] o.h.engine.jdbc.spi.SqlExceptionHelper   : SQL Error: 1048, SQLState: 23000
2020-11-20 23:21:22.390 ERROR 2708 --- [ctor-http-nio-2] o.h.engine.jdbc.spi.SqlExceptionHelper   : Column 'name' cannot be null
2020-11-20 23:21:22.396 ERROR 2708 --- [ctor-http-nio-2] a.w.r.e.AbstractErrorWebExceptionHandler : [b4802838-3]  500 Server Error for HTTP POST "/api/v1/butterfly"

org.springframework.dao.DataIntegrityViolationException: could not execute statement; SQL [n/a]; constraint [null]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement
	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:298) ~[spring-orm-5.2.8.RELEASE.jar:5.2.8.RELEASE]
	Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException: 
Error has been observed at the following site(s):
	|_ checkpoint ⇢ HTTP POST "/api/v1/butterfly" [ExceptionHandlingWebHandler]
Stack trace:
		at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:298) ~[spring-orm-5.2.8.RELEASE.jar:5.2.8.RELEASE]
		at org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossible(HibernateJpaDialect.java:255) ~[spring-orm-5.2.8.RELEASE.jar:5.2.8.RELEASE]
```
Như vậy, `@Column(nullable=false)` đã không thực hiện validate null trước khi insert vào DB, thay vào đó, câu lệnh insert vẫn được thực hiện, và lỗi lúc này được bắn ra từ DB do SQL không thể execute được.
### Validation
Như vậy, qua 2 log được show ra ở trên, ta có thể thấy được rằng `@NotNull` và `@Column(nullable = false)` đều support hibernate generate ra table NOT ALLOW NULL trong DB, nhưng khi insert data vào DB thì chỉ có `@NotNull` thực hiện validate NULL, còn  `@Column(nullable = false)` không thực hiện validate NULL, mà để DB bắn về lỗi.

Cả 2 case ở trên đều không cho phép việc insert NULL vào DB, nhưng điểm khác nhau ở đây là gì ? Đó là `@Column(nullable = false)` chỉ support việc generate DB, ở đây mình sử dụng generate bằng hibernate. Nếu ở đây mình tạo DB bằng tay và ALLOW NULL trong DB thì việc define `@Column(nullable = false)` là vô nghĩa.

Giờ mình sẽ drop cả 2 table đi và insert bằng tay, cũng như allow null cho DB:

SQL:
```
drop table local_test.cat;

drop table local_test.butterfly;

create table butterfly (
       id bigint not null auto_increment,
        name varchar(255) null,
        weight double precision null,
        primary key (id)
) engine=InnoDB;

create table cat (
   id bigint not null auto_increment,
    name varchar(255) null,
    weight double precision null,
    primary key (id)
) engine=InnoDB;
```
Remove dòng này ở file `application.properties`:
~~spring.jpa.hibernate.ddl-auto=create-drop~~

Start lại project:
```
2020-11-20 23:36:51.360  INFO 12872 --- [  restartedMain] c.d.json.example.demo.DemoApplicationKt  : No active profile set, falling back to default profiles: default
2020-11-20 23:36:51.689  INFO 12872 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : Devtools property defaults active! Set 'spring.devtools.add-properties' to 'false' to disable
2020-11-20 23:36:51.689  INFO 12872 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : For additional web related logging consider setting the 'logging.level.web' property to 'DEBUG'
2020-11-20 23:36:52.906  INFO 12872 --- [  restartedMain] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFERRED mode.
2020-11-20 23:36:53.162  INFO 12872 --- [  restartedMain] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 245ms. Found 3 JPA repository interfaces.
2020-11-20 23:36:53.856  INFO 12872 --- [  restartedMain] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2020-11-20 23:36:53.874  INFO 12872 --- [  restartedMain] com.zaxxer.hikari.HikariDataSource       : HikariCP - Starting...
2020-11-20 23:36:56.088  INFO 12872 --- [  restartedMain] com.zaxxer.hikari.HikariDataSource       : HikariCP - Start completed.
2020-11-20 23:36:56.144  INFO 12872 --- [         task-1] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2020-11-20 23:36:56.234  INFO 12872 --- [         task-1] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 5.4.20.Final
2020-11-20 23:36:56.472  INFO 12872 --- [         task-1] o.hibernate.annotations.common.Version   : HCANN000001: Hibernate Commons Annotations {5.1.0.Final}
2020-11-20 23:36:56.854  INFO 12872 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2020-11-20 23:36:57.135  INFO 12872 --- [         task-1] org.hibernate.dialect.Dialect            : HHH000400: Using dialect: org.hibernate.dialect.MySQL5InnoDBDialect
2020-11-20 23:36:57.760  INFO 12872 --- [  restartedMain] o.s.b.web.embedded.netty.NettyWebServer  : Netty started on port(s): 8082
2020-11-20 23:36:57.760  INFO 12872 --- [  restartedMain] DeferredRepositoryInitializationListener : Triggering deferred initialization of Spring Data repositories…
2020-11-20 23:36:57.885  INFO 12872 --- [         task-1] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2020-11-20 23:36:57.901  INFO 12872 --- [         task-1] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2020-11-20 23:36:58.408  INFO 12872 --- [  restartedMain] DeferredRepositoryInitializationListener : Spring Data repositories initialized!
2020-11-20 23:36:58.419  INFO 12872 --- [  restartedMain] c.d.json.example.demo.DemoApplicationKt  : Started DemoApplicationKt in 7.731 seconds (JVM running for 8.833)

```
Lần này sẽ không có log create table của hibernate nữa

Create cat:
```curl -X POST \
  http://localhost:8082/api/v1/cat \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 0019d849-78a4-fec8-26f7-bb6a56a5fb56' \
  -d '{}'
```
=> Log:
```
2020-11-20 23:37:47.888 ERROR 12872 --- [ctor-http-nio-2] a.w.r.e.AbstractErrorWebExceptionHandler : [d1188d7e-1]  500 Server Error for HTTP POST "/api/v1/cat"

javax.validation.ConstraintViolationException: Validation failed for classes [com.database.json.example.demo.entity.CatEntity] during persist time for groups [javax.validation.groups.Default, ]
List of constraint violations:[
	ConstraintViolationImpl{interpolatedMessage='must not be null', propertyPath=weight, rootBeanClass=class com.database.json.example.demo.entity.CatEntity, messageTemplate='{javax.validation.constraints.NotNull.message}'}
	ConstraintViolationImpl{interpolatedMessage='must not be null', propertyPath=name, rootBeanClass=class com.database.json.example.demo.entity.CatEntity, messageTemplate='{javax.validation.constraints.NotNull.message}'}
]
	at org.hibernate.cfg.beanvalidation.BeanValidationEventListener.validate(BeanValidationEventListener.java:140) ~[hibernate-core-5.4.20.Final.jar:5.4.20.Final]
	Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException: 
Error has been observed at the following site(s):
	|_ checkpoint ⇢ HTTP POST "/api/v1/cat" [ExceptionHandlingWebHandler]
Stack trace:
		at org.hibernate.cfg.beanvalidation.BeanValidationEventListener.validate(BeanValidationEventListener.java:140) ~[hibernate-core-5.4.20.Final.jar:5.4.20.Final]
```
Như vậy khi insert data NULL vào `cat` thì lỗi vẫn xảy ra, do bị validate `@NotNull`

Create butterfly:
```
curl -X POST \
  http://localhost:8082/api/v1/butterfly \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: aa9305c6-dfac-4bc0-af50-3463a398bff1' \
  -d '{}'
```
=> Log:
```
Hibernate: 
    insert 
    into
        butterfly
        (name, weight) 
    values
        (?, ?)
Hibernate: 
    select
        last_insert_id()
```
=> Result:
```
{
    "id": 1,
    "name": null,
    "weight": null
}
```
# Conclution
Như vậy, qua bài này mình muốn giới thiệu cách hoạt động của 2 anotation `@NotNull` và `@Column(nullable=false)`.
Mặc dù cả 2 đều giúp ngăn việc lưu data NULL vào DB nhưng nó lại có cách hoạt động khác nhau. 

Nhìn có vẻ đơn giản nhưng có thể bạn sẽ bị lack nếu DB được tạo bằng tay hoặc được tạo bằng FlyWay chạy script. Tốt hơn hết nên dùng `@NotNull` thay vì `@Column(nullable=false)`. Bằng cách này, chúng ta có thể validate được dữ liệu trước khi thực hiện update hay insert data vào DB. Hy vọng bài viết này hữu ích với bạn!