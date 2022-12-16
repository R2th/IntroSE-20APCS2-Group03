Có thể các bạn đã nghe hoặc sử dụng flyway rồi, tuy nhiên ở bài viết này mình dùng flyway phục vụ cho mục đích khác, phục vụ để setup integration test.

Tuy nhiên, trước khi bắt đầu mình vẫn muốn giới thiệu sơ về flyway.

# Flyway là gì?
Flyway là một công cụ open-source dùng để migration data, cấu hình cực kì đơn giản.

Nó có 7 command chính thôi, cụ thể là: Migrate, Clean, Info, Validate, Undo, Baseline và Repair. Tất nhiên không phải command nào bản open-source cũng dùng được@@.

Flyway khá mạnh vì nó support được rất nhiều loại database (Oracle, mySQL, Postgres, ...)

# Flyway quản lý version như thế nào?
Flyway tạo ra thêm 1 table tên là flyway_shema_history(tên này là từ flyway version 5, những version trước là shema_version) để quản lý version của database.

Khi bạn gọi command migrate, nếu không có version nào lớn hơn thì việc migration sẽ bị ignore nhé.

Nếu script của bạn có prefix là V thì nó sẽ là migration version (V là default value), ngoài V ra thì còn các loại khác như prefix U cho undo command, prefix R cho repeatable setting.

# Sao lại dùng Flyway cho test?
Như ta biết thì flyway dùng cho việc migration data, thì rõ ràng nó hữu rất hữu dụng để migrate cho các môi trường dev/staging/prod. 

Câu hỏi được đặt ra ở đây là sao lại dùng cho test, cụ thể ở đây là integration test. 

Giả sử mình có 1 situation như thế này: mình cần setup integration test với init data được load từ file sql, mọi thứ phải được clear sau khi test xong.

Với situation này, chọn flyway rất thích hợp, vì lúc này mình sẽ tận dụng được lợi thế cấu hình đơn giản của flyway.

# Cấu hình đơn giản như thế nào?
Đầu tiên, add dependency flyway cho project

```
<dependency>
           <groupId>org.flywaydb</groupId>
           <artifactId>flyway-core</artifactId>
            <version>5.1.0</version>
</dependency>
```

Sau đó trong file test mình config đơn giản thế này thôi

```
@BeforeClass
    public static void initBeforeTest() {
        Flyway flyway = new Flyway();
        flyway.setDataSource("YOUR_URL_DB", "YOUR_USER_DB", "YOUR_PWD_DB");
        flyway.setSchemas("YOUR_DB_NAME_IF_NEED");
        flyway.setLocations("classpath:/db/migration");
        flyway.setBaselineOnMigrate(true);
        flyway.clean();
        flyway.migrate();
    }
```

Giải thích:
- setDataSource("YOUR_URL_DB", "YOUR_USER_DB", "YOUR_PWD_DB"); 
  Quá dễ hiểu, đây chính là database connection của bạn thôi
- setLocations("classpath:/db/migration");
  Đây chính là default location chứa sql script của bạn, nếu bạn muốn cụ thể hơn, hãy chỉ rõ specific folder, còn ko setting gì cả thì nó sẽ lấy tất cả lại location trên.
- flyway.migrate(); Thực hiện migrate data từ script

Nếu bạn muốn clear tất cả mọi thứ sau khi chạy test? Đơn giản thôi
```
@AfterClass
    public static void clearAfterTest() {
        flyway.clean();
    }
```

# Sample
Ví dụ dưới đây, mình setup init là create table user, init data là 2 users (trong script), sau đó chạy migrate data rồi test xem gọi service load user, check số lượng user, check thông tin user xem thử có đúng hay không.

Cụ thể

Script tạo table và data

```
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT=' ';

INSERT INTO user (user_id, created_at) VALUES (1, '2017-12-14 20:55:00');
INSERT INTO user (user_id, created_at) VALUES (2, '2017-12-20 20:55:00');
```

Trong class test:

Đầu tiên ta check xem database lúc này đã thực sự đc insert 2 user hay không
```
@Test
    public void testFindAllUser() {
        Response response = webTargetFindAllUsersRequest().get();
        List<UserDto> userDtoList = response.readEntity(new GenericType<List<UserDto>>() {});

        Assert.assertThat(userDtoList.size(), Is.is(2));
    }
```

----> PASSED

Thế giờ ta thử test xem get lên 1 user theo id thì thế nào ?

// Test get user với userId =1(xem trong script)
```
@Test
    public void testFindUserById() {
        Timestamp expectedTs = Timestamp.valueOf(LocalDateTime.of(2017,12,14,20,55,0));

        Response response = webTargetFindUserByIdRequest(new LongParam("1")).get();
        UserDto userDto = response.readEntity(UserDto.class);

        assertThat(userDto.getCreatedAt().compareTo(expectedTs) == 0);
    }
```
---> PASSED, easy ;)

Thử tương tác với database xem nào?
Ở đây mình sẽ viết 1 method test là sau khi insert thêm 1 user, mình sẽ load user user xem thử số lượng user đã tăng lên 3 chưa nhé.

```
@Test
    public void testCreateAUser() {
        Response response = webTargetFindAllUsersRequest().get();
        List<UserDto> userDtoList = response.readEntity(new GenericType<List<UserDto>>() {});
        int size = userDtoList.size();

        UserDto userDto = new UserDto();
        userDto.setCreatedAt(Timestamp.valueOf(LocalDateTime.of(2017, 10, 10, 2, 2, 2)));
        webTargetCreateAUserRequest().post(Entity.json(userDto));

        Response responseAgain = webTargetFindAllUsersRequest().get();
        userDtoList = responseAgain.readEntity(new GenericType<List<UserDto>>() {});

        assertThat(userDtoList.size() - size).isEqualTo(1);
        Assert.assertThat(userDtoList.size(), Is.is(3));
    }
```
---> BINGO :D