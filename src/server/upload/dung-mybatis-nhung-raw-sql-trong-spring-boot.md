Xin chào các bạn

Gần đây mình có dùng một framework là **[Mybatis](https://mybatis.org/mybatis-3/)** để nhúng lệnh SQL vào xử lý cũng như tạo query dạng động để chạy chương trình trong (Java) Spring Boot, mình xin chia sẻ lại kinh nghiệm học Mybatis qua bài này.

Với mục đích là thử nghiệm Mybatis nên bài toán sẽ hướng sao cho ta đi qua được hết các tính năng cơ bản của Mybatis chứ không liên quan đến một bài toán thực tế nào. Một số tính năng mình mong muốn dùng qua như sau :

+ Viết RawSQL để xử lý java gọi đến và lấy kết quả được
+ Viết dạng SQL Builder để xử lý java gọi đến và lấy kết quả được
+ Viết SQL cho các cú pháp cơ bản : SELECT, INSERT, UPDATE, DELETE
+ Bài toán là viết chương trình lưu dữ liệu user và items.

Vậy mình xin bắt đầu.

# 0.Môi trường
Môi trường máy mình khi thực hiện như sau :
+ OS : MacOS 
+ IDE : SpringToolSuite4 (Eclipse)

# 1.Cài đặt
## 1.1. Khởi tạo project
Ta dùng Spring Initializr để khởi tạo, rất thuận tiện.
https://start.spring.io/

Các lựa chọn như sau 

| Mục | Lựa chọn |
| -------- | -------- |
| Project      | Maven Project     |
| Language    | Java     |
| Project Metadata     | Như hình     |
| Dependencies     | Mybatis, H2     |

Ta sẽ dùng Mybatis nên sẽ chọn một dependence là Mybatis.

Về database thì mình chọn Mysql vì mình quen thao tác với DB này.

![](https://images.viblo.asia/db1809ea-75eb-429e-a162-420f690da8bd.png)

Chọn Generate ta được file zip, giải nén và import vào IDE ta được cấu trúc như sau 

![](https://images.viblo.asia/c1a1dd75-039f-4e6d-9511-07761c8059d4.png)


Trong đó chú ý một thông số là mybatis ta sử dụng có phiên bản là **2.1.3** và đây là phiên bản thiết kế riêng dùng với Spring Boot chứ không phải phiên bản phổ biến (Hiện nay là **3.5.5**)

```
		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>2.1.3</version>
		</dependency>
```

Ta cũng tạo 2 package sẵn để lưu các class mybatis sau này sẽ cần dùng : 
+ src/main/java/com/demo/mybatis/mapper
+ src/main/java/com/demo/mybatis/model

## 1.2. Cấu trúc database 
Ta sẽ cần một database sẵn sàng sử dụng để các query gọi đến và thực hiện được. Ta sẽ cấu trúc database như sau :

### Tạo DB mysql với docker 
docker-compose.yml 

```
version: '3'

services:
  database:
    image: mysql:8.0
    volumes:
      - ./db/dbdata:/var/lib/mysql
    command: ['--character-set-server=utf8mb4', '--collation-server=utf8mb4_unicode_ci','--default-authentication-plugin=mysql_native_password']
    environment:
      MYSQL_DATABASE: demo
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: demo
      MYSQL_PASSWORD: demo
    ports:
        - "33061:3306"
```

Ta dựng một database với thông tin user, password, port như ở trên. Khởi động bằng
`docker-compose up -d`

### Cấu trúc bảng
(Truy cập vào dòng lệnh database với `mysql -h 0.0.0.0 -P 33061 -u demo demo -p`)

```
CREATE TABLE users  (
    id int AUTO_INCREMENT primary Key
    ,name TEXT NOT NULL
    ,birthday date
);


CREATE TABLE items (
    id int AUTO_INCREMENT primary Key,
    name TEXT NOT NULL,
	user_id INT,
    FOREIGN KEY (user_id) references users(id)
);
```

Ở bài này mình thử nghiệm với 1 bảng cơ bản **user** với các thuộc tính của người dùng là tên (name) và ngày sinh (birthday). Sau đó là bảng **items** chứa foreign key đến bảng **users** để thử nghiệm tính năng relationship trong mybatis.

## 1.3. Cài đặt plugin Mybatis Generator
### 1.3.1.  Tải từ Marketplace 
Ta có thể lựa chọn tự viết các class cần thiết nhưng cũng có lựa chọn khác là dùng **Mybatis Generator**, đây là một tool rất hữu ích cho việc khởi tạo các class cần thiết dùng của Mybatis.

Trang chủ : http://mybatis.org/generator/

Mybatis Generator có khả năng tự tra cứu các table được chỉ định và generate các class liên quan đến database đó, nhờ đó giảm công sức implement đi rất nhiều.

Bạn có thể tải với dòng lệnh, ở bài viết này mình tải dưới dạng plugin của eclipse như sau: tra cứu từ Eclipse Marketplace (Help --> Eclipse Marketplace) với từ khoá Mybatis, chọn tải Mybatis Generator 1.4.0

![](https://images.viblo.asia/cce5d203-c7bd-4342-b3a0-dfcd5757bf23.png)

Sau khi tải xong, ta tạo file **generatorConfig.xml** chỉ định các thiết lập cần thiết cho Generator. Mình tạo với nội dung như sau :

**src/main/resources/generatorConfig.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN" "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
  <context id="context1">
    <jdbcConnection connectionURL="jdbc:mysql://0.0.0.0:33061/demo" driverClass="com.mysql.cj.jdbc.Driver" password="demo" userId="demo" />
    <javaModelGenerator targetPackage="com.demo.mybatis.model" targetProject="mybatis/src/main/java" />
    <javaClientGenerator targetPackage="com.demo.mybatis.mapper" targetProject="mybatis/src/main/java"/>
    <table schema="demo" tableName="users"></table>
    <table schema="demo" tableName="items"></table>
  </context>
</generatorConfiguration>
```

Trong đó :
+ **connectionURL** : url chứa thông tin kết nối đến database
+ **userId** : tên user cho database
+ **password** : password cho user trên
+ **javaModelGenerator** : chỉ định generate các class Model (User, Item)
+ **javaClientGenerator** : chỉ định generate các class Mapper và Support 
+ **table** : chỉ định các table cần generate 

### 1.3.2.Tạo Generator (Run Configuration)
Run --> Run Configuration --> Mybatis Generator (New)

![](https://images.viblo.asia/0744be6c-c762-46a6-96da-deeaf33b2a9e.png)

ở đây ta chỉ định `Configuration File` đến file config vừa rồi ở 1.3.1 là được.

# 2.Viết chương trình 
## 2.1.Run Generator 
Thử Run với cấu hình ở trên, ta nhận được log ở Console như sau :

```
MyBatis Generator Started...
  Buildfile: /Users/*****/Projects/blogs/.metadata/.plugins/org.mybatis.generator.eclipse.ui/.generatedAntScripts/demo-generator.xml
  21:55:18.905 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.eclipse.ui.ant.logging.AntLogFactory - Logging initialized using 'org.mybatis.generator.eclipse.ui.ant.logging.slf4j.Slf4jLoggingLogFactory@5a170dff' adapter.
  21:55:18.920 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.logging.LogFactory - Logging initialized using 'org.mybatis.generator.eclipse.ui.ant.logging.AntLogFactory@67e70cb7' adapter.
  21:55:19.460 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.internal.db.DatabaseIntrospector - Retrieving column information for table "demo.users"
  21:55:19.525 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.internal.db.DatabaseIntrospector - Found column "id", data type 4, in table "demo..users"
  21:55:19.525 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.internal.db.DatabaseIntrospector - Found column "name", data type -1, in table "demo..users"
  21:55:19.525 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.internal.db.DatabaseIntrospector - Found column "birthday", data type 91, in table "demo..users"
  21:55:19.538 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.internal.db.DatabaseIntrospector - Retrieving column information for table "demo.items"
  21:55:19.545 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.internal.db.DatabaseIntrospector - Found column "id", data type 4, in table "demo..items"
  21:55:19.545 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.internal.db.DatabaseIntrospector - Found column "name", data type -1, in table "demo..items"
  21:55:19.545 [Worker-6: Launching demo-generator] DEBUG org.mybatis.generator.internal.db.DatabaseIntrospector - Found column "user_id", data type 4, in table "demo..items"
  BUILD SUCCESSFUL
MyBatis Generator Finished
```

Sau khi chạy xong, ta nhận được các class sau được generate : 

![](https://images.viblo.asia/491d8529-2e8c-4622-b2a0-0ab05dabd451.png)

Mybatis Generator tạo cho ta 3 lớp cơ bản sau :
+ Các Model : là class mô hình hoá kết quả cũng như tham số của các câu lệnh SQL, thường tương đương với một bảng trong database
+ Các Mapper : là class có vai trò lưu các query mà ta dùng truy vấn đến cơ sở dữ liệu
+ Các Support : hỗ trợ viết xử lý với Mapper qua cung cấp các biến thể hiện ứng với cấu trúc bảng 

Ta sẽ xem qua nội dung các file này :

### 2.1.1.Các Model (Users và Items)
**src/main/java/com/demo/mybatis/model/Users.java**
```
public class Users {

	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.209677+09:00", comments = "Source field: users.id")
	private Integer id;
	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.209787+09:00", comments = "Source field: users.birthday")
	private Date birthday;
	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.209838+09:00", comments = "Source field: users.name")
	private String name;
    
    ... các getter và setter 
```

Ta có thể thấy là Mybatis Generator đã generate đầy đủ các field mà table **users** chứa (id, name, birthday) và ánh xạ chúng với kiểu dữ liệu trong java gần nhất (Integer, Date, String)

Mỗi field được gắn annotation đánh dấu mốc chúng được generate thế nào.

### 2.1.2. Mapper
Mybatis generate cho ta tầm hơn 2 chục hàm tiện ích, ta sẽ điểm qua một số hàm ban đầu 

```
package com.demo.mybatis.mapper;

import ....

@Mapper
public interface ItemsMapper {

	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.213504+09:00", comments = "Source Table: items")
	BasicColumn[] selectList = BasicColumn.columnList(id, userId, name);

	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.212724+09:00", comments = "Source Table: items")
	@SelectProvider(type = SqlProviderAdapter.class, method = "select")
	long count(SelectStatementProvider selectStatement);

	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.212767+09:00", comments = "Source Table: items")
	@DeleteProvider(type = SqlProviderAdapter.class, method = "delete")
	int delete(DeleteStatementProvider deleteStatement);

	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.212805+09:00", comments = "Source Table: items")
	@InsertProvider(type = SqlProviderAdapter.class, method = "insert")
	int insert(InsertStatementProvider<Items> insertStatement);

    ... các hàm khác 
```

+ **selectList** : chứa danh sách các field ứng với model tương ứng.
+ **long count()** : hàm đếm danh sách dựa trên lệnh select cho vào tham số. Sau ta có thể đếm số record thoả mãn điều kiện với gọi lệnh ItemsMapper.count(...)
+ **int delete()** : hàm xoá record dựa trên điều kiện được cho vào tham số
+ **int insert()** : tương tự 2 hàm trên với lệnh insert 

### 2.1.3. Support

```
package com.demo.mybatis.mapper;

import java.sql.JDBCType;
import java.util.Date;
import javax.annotation.Generated;
import org.mybatis.dynamic.sql.SqlColumn;
import org.mybatis.dynamic.sql.SqlTable;

public final class UsersDynamicSqlSupport {

	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.210459+09:00", comments = "Source Table: users")
	public static final Users users = new Users();
	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.210567+09:00", comments = "Source field: users.id")
	public static final SqlColumn<Integer> id = users.id;
	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.210599+09:00", comments = "Source field: users.birthday")
	public static final SqlColumn<Date> birthday = users.birthday;
	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.210625+09:00", comments = "Source field: users.name")
	public static final SqlColumn<String> name = users.name;

	@Generated(value = "org.mybatis.generator.api.MyBatisGenerator", date = "2020-08-23T14:46:02.210527+09:00", comments = "Source Table: users")
	public static final class Users extends SqlTable {
		public final SqlColumn<Integer> id = column("id", JDBCType.INTEGER);
		public final SqlColumn<Date> birthday = column("birthday", JDBCType.DATE);
		public final SqlColumn<String> name = column("name", JDBCType.LONGVARCHAR);

		public Users() {
			super("users");
		}
	}
}
```

Bên trong mỗi class Support chứa một class con thể hiện cho table mà đó trỏ đến (**Users**), class con này chứa các thuộc tính ứng với các field của table mà nó trỏ đến. 

Class Support cha (**UsersDynamicSqlSupport**) chứa một thể hiện của class con đó, và mỗi thuộc tính khác chính là tham chiếu đến thuộc tính của thể hiện này.

Ta sẽ thực sự sử dụng các thuộc tính trên ở phần sau.

## 2.2.Viết xử lý thử dùng mybatis
### 2.2.1.Viết custom Model và Mapper cho relationship giữa Items và Users 
Đoạn này có thể hơi nâng cao một chút, ở trên mình đã dùng Mybatis Generator để generate các model và mapper ứng với từng bảng trong database.

Tuy nhiên mình muốn dùng mapper dạng sử dụng được relationship giữa các bảng, yêu cầu phải *join*, tính năng này thì Mybatis Generator vẫn chưa hỗ trợ tạo được class và mapper phù hợp.

```
Join queries will likely require you to define a MyBatis result mapping in XML. This is the only instance where XML is required. This is due to the limitations of the MyBatis annotations when mapping collections.
```

https://mybatis.org/mybatis-dynamic-sql/docs/select.html

Do đó nên mình tự tạo mới

#### 2.2.1.1.ItemsUsers (Model)
src/main/java/com/demo/mybatis/model/ItemsUsers
```
package com.demo.mybatis.model;

public class ItemsUsers {
	private int item_id;
	private int user_id;
	private String user_name;
	private String item_name;
```

Đây là 4 thuộc tính mà mình muốn lấy ra sau khi join 2 bảng với nhau.

#### 2.2.1.2.ItemsUsersMapper.java 
Tương tự ta sẽ tạo Mapper chứa hàm gọi đến xử lý relationship giữa 2 bảng.
src/main/java/com/demo/mybatis/mapper/ItemsUsersMapper
```
package com.demo.mybatis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.demo.mybatis.model.ItemsUsers;

@Mapper
public interface ItemsUsersMapper {
	List<ItemsUsers> selectCommon();
}
```

#### 2.2.1.3.ItemsUsersMapper.xml
src/main/java/com/demo/mybatis/mapper/ItemsUsersMapper.xml 
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.demo.mybatis.mapper.ItemsUsersMapper">
    <select id="selectCommon" resultType="com.demo.mybatis.model.ItemsUsers">
		SELECT users.id as user_id, items.id as item_id, users.name as user_name, items.name as item_name
		FROM users
		JOIN items
			ON items.user_id = users.id;
    </select>
</mapper>
```

Ở đây ta đã tạo một query thuần có chứa lệnh join. Spring có thể tự phát hiện và gắn xml này với mapper java tương ứng của nó.

Chú ý là ta ở query ta cần khai báo **id** đúng với tên hàm trong mapper java và kiểu trả về phù hợp. 

(**Mặc dù kiểu trả về là List nhưng mybatis vẫn chấp nhận khai báo resultType không phải rõ ràng kiểu List mà là kiểu phần tử**)

### 2.2.2.Tạo playground
Playground ý mình ở đây là class sử dụng chuyên để thử nghiệm, dùng thử các xử lý mới dùng lần đầu. Ta sẽ viết các xử lý cơ bản với model trên playground này.

**src/main/java/com/demo/mybatis/MybatisPlayground.java**

```
package com.demo.mybatis.mapper;

import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;

import java.text.ParseException;
import java.util.Date;

import com.demo.mybatis.model.Items;
import com.demo.mybatis.model.Users;

public class MybatisPlayground {
	
	private UsersMapper usersMapper;
	private ItemsMapper itemsMapper;
    
    public MybatisPlayground(UsersMapper usersMapper, ItemsMapper itemsMapper) {
		this.usersMapper = usersMapper;
		this.itemsMapper = itemsMapper;
	}
    ....
```

ta để tham số truyền vào khởi tạo là mapper cần dùng, còn khởi tạo mapper sẽ để cho Spring xử lý ở ngoài.

Với mục đích là thử nghiệm dùng mybatis nên mình tạo các hàm đi qua các query cơ bản như delete, select, update, insert 

```
    // Thử nghiệm query delete 
	public void deleteALlUsers() {
		itemsMapper.delete(i -> i);
		usersMapper.delete(u -> u);
	}
	
    // Thử nghiệm query insert thường 
	public void sampleInsertUsers(String userName, Date birthday) throws ParseException {
		Users users = new Users();

		users.setName(userName);
		users.setBirthday(birthday);
		
		usersMapper.insert(users);
	}
	
    // Thử nghiệm query update 
	public void sampleUpdateUsers(String userName1, String userName2) {
		Users users = usersMapper.selectOne(u -> 
				u.where(UsersDynamicSqlSupport.name, isEqualTo(userName1))).get();

		users.setName(userName2);
		usersMapper.updateByPrimaryKey(users);

	}
	
    // Thử nghiệm insert với relationship 
	public void sampleInsertItems(String userName, String itemName) {
		Users users = usersMapper.selectOne(u -> 
		u.where(UsersDynamicSqlSupport.name, isEqualTo(userName))).get();
		
		Items items = new Items();
		items.setName(itemName);
		items.setUserId(users.getId());
		itemsMapper.insert(items);
	}
```

Một điểm thú vị khi sử dụng mybatis là mình đã có thể sử dụng xử lý kiểu lambda cho các gọi hàm này.

Đến đây là xong các xử lý cơ bản, tiếp đến ta sẽ sửa ở xử lý khởi đầu chương trình để gọi đến các xử lý này.

### 2.2.3.Sửa MybatisApplication 
Đây là đầu mối bắt đầu chương trình, hiện tại chỉ có startup Spring.
Ta sẽ sửa để gọi đến các thử nghiệm xử lý mybatis ở trên.

**src/main/java/com/demo/mybatis/MybatisApplication.java** 
```
	@Autowired
	UsersMapper usersMapper;

	@Autowired
	ItemsMapper itemsMapper;
 ```

Plugin mybatis ở phần đầu ta tải không đơn thuần là mybatis đơn thuần mà là phiên bản đã được xử lý cho tiện ích với Spring. 
Với tiện ích này ta chỉ cần khai báo với annotation @Autowire mapper sẽ được Spring phát hiện và khởi tạo khi bắt đầu chương trình.

```
	@Bean
	public CommandLineRunner testInsert(ApplicationContext ctx) {
		return args -> {
			
			MybatisPlayground ground = new MybatisPlayground(usersMapper, itemsMapper);
			
			ground.deleteALlUsers();
			
			// Init user 1 
			String userName = "test user 1";
			String birthdayAsStr = "2010-12-01";
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
			Date birthday = format.parse(birthdayAsStr);
			ground.sampleInsertUsers(userName, birthday);

			ground.sampleUpdateUsers("test user 1", "test user 2");
			ground.sampleInsertItems("test user 2", "test item 1");
			ground.sampleInsertItems("test user 2", "test item 2");
		};
	}
```

Với khai báo annotation @Bean và khuôn mẫu hàm như trên, Spring sẽ tự phát hiện và gọi đến nên ta không cần sửa ở main()

Ở trên ta đã khai báo gọi hết các xử lý đã tạo playground.

### 2.2.4.Viết JUnit
Ta sẽ viết unit test với JUnit để kiểm tra xem các hàm liệu đã hoạt động đúng như ý muốn chưa, cũng như thử nghiệm xem Mapper với kiểu Join có hoạt động đúng không 

**src/test/java/com/demo/mybatis/MybatisApplicationTests.java**
```
    package com.demo.mybatis;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.demo.mybatis.mapper.ItemsUsersMapper;
import com.demo.mybatis.mapper.UsersMapper;
import com.demo.mybatis.model.ItemsUsers;

@SpringBootTest
class MybatisApplicationTests {

	@Autowired
	UsersMapper usersMapper;
	
	@Autowired
	ItemsUsersMapper itemsUsersMapper;
	
	@Test
	void contextLoads() {
        // Kiểm tra xem bảng users chỉ có một phần tử được tạo 
		long totalRows = usersMapper.count(c -> c);	
		assertEquals(totalRows, 1);

        // Kiểm tra xem mapper cho relationship thực sự lấy ra được 2 item.
		List<ItemsUsers> listItemsUsers = itemsUsersMapper.selectCommon();
		assertEquals(listItemsUsers.get(0).getItem_name(), "test item 1");
		assertEquals(listItemsUsers.get(0).getUser_name(), "test user 2");
		assertEquals(listItemsUsers.get(1).getItem_name(), "test item 2");
		assertEquals(listItemsUsers.get(1).getUser_name(), "test user 2");
	}

}
```
    
# 3.Chạy chương trình
Ta có thể chạy chương trình với Run Configuration với Project là mybatis và Main class là 
com.demo.mybatis.MybatisApplication như trong ảnh

![](https://images.viblo.asia/031e20d7-26f6-42bf-bdf0-b1bf4304b0bb.png)

ta được kết quả 

```

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.3.3.RELEASE)

2020-08-26 23:55:44.663  INFO 7499 --- [           main] com.demo.mybatis.MybatisApplication      : Starting MybatisApplication on TrannoMacBook-Pro.local with PID 7499 (/Users/tranvanmy/Projects/blogs/mybatis/target/classes started by tranvanmy in /Users/tranvanmy/Projects/blogs/mybatis)
2020-08-26 23:55:44.666  INFO 7499 --- [           main] com.demo.mybatis.MybatisApplication      : No active profile set, falling back to default profiles: default
2020-08-26 23:55:45.740  INFO 7499 --- [           main] com.demo.mybatis.MybatisApplication      : Started MybatisApplication in 1.616 seconds (JVM running for 2.045)
2020-08-26 23:55:45.766  INFO 7499 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2020-08-26 23:55:46.215  INFO 7499 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2020-08-26 23:55:46.512  INFO 7499 --- [extShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2020-08-26 23:55:46.544  INFO 7499 --- [extShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
```

hoặc chạy với maven : **./mvnw spring-boot:run**

Sau khi chạy, ta được cấu trúc database đã insert :

**Bảng users**

| id | name | birthday |
| - | - | - |
| 32	| test user 2	| 2010-12-01

**Bảng items**
| id | name | birthday |
| - | - | - |
| 22 | test item 1 | 32 |
| 23 | test item 2 | 32 |

Tiếp theo ta sẽ chạy thử test xem lệnh join đã được mô hình hóa dạng xml và gọi ra chạy đúng chưa. Lần này mình sẽ chạy với Maven

```
./mvwn test
```

Kết quả 

```
....
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.3.3.RELEASE)

2020-08-27 00:02:42.731  INFO 7755 --- [           main] c.demo.mybatis.MybatisApplicationTests   : Starting MybatisApplicationTests on TrannoMacBook-Pro.local with PID 7755 (started by tranvanmy in /Users/tranvanmy/Projects/blogs/mybatis)
2020-08-27 00:02:42.733  INFO 7755 --- [           main] c.demo.mybatis.MybatisApplicationTests   : No active profile set, falling back to default profiles: default
2020-08-27 00:02:44.134  INFO 7755 --- [           main] c.demo.mybatis.MybatisApplicationTests   : Started MybatisApplicationTests in 1.649 seconds (JVM running for 2.654)
2020-08-27 00:02:44.163  INFO 7755 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2020-08-27 00:02:44.633  INFO 7755 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 3.486 s - in com.demo.mybatis.MybatisApplicationTests
2020-08-27 00:02:45.530  INFO 7755 --- [extShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2020-08-27 00:02:45.558  INFO 7755 --- [extShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  6.078 s
[INFO] Finished at: 2020-08-27T00:02:45+09:00
[INFO] ------------------------------------------------------------------------
```

--> Chạy với 0 lỗi, xử lý gọi relation có vẻ hoạt động ổn!

# 4.Kết
Đến đây mình đã chia sẻ về cách sử dụng Mybatis và Mybatis Generator để nhúng lệnh SQL vào xử lý cũng như gọi query SQL dạng dynamic với framework là Spring Boot.

Hi vọng sẽ có ích cho các bạn có nghiệp vụ liên quan.

Source code : https://github.com/mytv1/mybatis-sample

Tham khảo : https://qiita.com/kazuki43zoo/items/ea79e206d7c2e990e478

Hết.