Các đối tượng thực thể Java có thể được lưu vào database hoặc bằng một cách rõ ràng thông qua việc gọi phương thức `persist` hoặc được hiểu là kết quả của một hoặt động theo đợt.

Bài viết này xin trình bày cách thức lưu một thực thể Java vào database theo hai cách nói trên.
## 1. Xử dụng phương thức `persist`
Ta cần lưu thực thể đối tượng **Student** vào database (MySQL)
```Java
@Entity
@Table(name="student")
public class Student implement Serialization {
    @Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="first_name")
	private String firstName;

	@Column(name="last_name")
	private String lastName;

	@Column(name="email")
    private String email;
    
    public Student () {}
    
    public Student (String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    // geter and setter
}
```

Ta sẽ tiến hành lưu thực thể **Student** vào database như sau.
```Java
private static void insertEntity() {
    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("PERSISTENCE");
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    entityManager.getTransaction().begin();

    Student student = new Student("Ramesh", "Fadatare", "rameshfadatare@javaguides.com");
    entityManager.persist(student);
    entityManager.getTransaction().commit();
    entityManager.close();
    entityManagerFactory.close();
}
```

`javax.persistence.EntityManager` là một interface của JPA được dùng tương tác với database. `EntityManager` cung cấp `javax.persistence.EntityTransaction` chúng ta dùng để bắt đầu (begin) và kết thúc (commit) một tiến trình (transaction).

`javax.persistence.EntityManagerFactory` là một interface khác của JPA, cung cấp một "persistence unit". Một `EntityManagerFactory` được tạo ra bằng các passing thông tin config từ file `.xml` thông qua tên, như ví dụ trên là "PERSISTENCE".
Sau đây là config file.

`.pom` Maven dependency
```xml
<dependencies>
    <!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-core -->
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>5.0.12.Final</version>
    </dependency>
    
    <!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-entitymanager -->
	<dependency>
	    <groupId>org.hibernate</groupId>
	    <artifactId>hibernate-entitymanager</artifactId>
	    <version>5.0.12.Final</version>
	</dependency>
	
    <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
	<dependency>
	    <groupId>mysql</groupId>
	    <artifactId>mysql-connector-java</artifactId>
	    <version>5.1.31</version>
	</dependency>
```
 và `.xml` của một "persistence unit"
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
             version="2.0">
    <persistence-unit name="PERSISTENCE">
        <description>JPA Demo</description>
        <provider>org.hibernate.ejb.HibernatePersistence</provider>
        <class>com.concretepage.entity.Farmer</class> 
        <properties>
            <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLDialect"/>
            <property name="hibernate.hbm2ddl.auto" value="update"/>
            <property name="javax.persistence.jdbc.driver" value="com.mysql.jdbc.Driver"/>
            <property name="javax.persistence.jdbc.url" value="jdbc:mysql://localhost:3306/Jpa_demo"/>
            <property name="javax.persistence.jdbc.user" value="root"/>
            <property name="javax.persistence.jdbc.password" value="123456"/>
        </properties>
    </persistence-unit>
</persistence> 
```
Việc lưu dữ liệu Student thực sự khi commit transaction. Phương thức `persist()` bắt ngoại lệ `IllegalArgumentException` nếu như đối số không phải là một lớp thực thể (error: Unknown entity: ...). Chỉ những thể hiện của những lớp thực thể (entity) mới có thể lưu vào database phụ thuộc, các đối tượng khác cùng có kiểu persistable chỉ có thể lưu database nhúng (như là giá trị của một thuộc tính của lớp thực thể).
## 2. Tham chiếu đối tượng nhúng (Embedded)
Lợi ích của việc sử dụng đối tượng embedded là có thể tái sử dụng chúng. Chúng ta có thể map hai nhiều thực thể với một bảng trong database.

Giờ ta muốn bổ sung thêm địa chỉ cho đối tượng Student từ đối tượng Address, ta sử dụng `@Embedded` để nhúng đối tượng `@Embeddable`.
```Java
@Embeddable
public class Address {
    private String addressLine1;

    private String addressLine2;

    private String city;

    private String state;

    private String country;

    private String zipCode;
    
   // getters and setters
}
```
```Java
@Entity
@Table(name="student")
public class Student implement Serialization {
    ...
    @Embedded
    @AttributeOverrides(value = {
        @AttributeOverride(name = "addressLine1", column = @Column(name = "house_number")),
        @AttributeOverride(name = "addressLine2", column = @Column(name = "street"))
    })
    private Address address;
    
    public Student () {}
    
    public Student (String firstName, String lastName, String email, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
    }
    //getters and setters
}
```
Với `house_number`, `street` là hai trường được bổ sung cho bảng `student`. Khi đó JAP sẽ nhúng thuộc tính `addressLine1` của `Address` vào `house_number` của `Student` (`addressLine2` -> `street`).

Giờ việc lưu **Student** được thực hiện như sau.
```Java
private static void insertEntity() {
    ...
    Address address = new Address("111", "Puadroad", "Pune", "Maharastra", "India", "411038");
    Student student = new Student("Ramesh", "Fadatare", "rameshfadatare@javaguides.com", address);
    entityManager.persist(student);
    ...
```
## 3. Cascading Persist
Cascade persist được sử dụng để xác định rằng nếu một thực thể được duy trì thì tất cả các thực thể con liên quan của nó cũng sẽ được duy trì. Cú pháp sau đây được sử dụng để thực hiện thao tác persist.
```Java
@OneToOne(cascade=CascadeType.PERSIST) //quan hệ 1-1

@OneToMany(cascade=CascadeType.PERSIST) // quan hệ 1-nhiều

@ManyToMany(cascade=CascadeType.PERSIST) // quan hệ nhiều-nhiều
```
Giờ ta thực hiện lưu dữ liệu thực thể **Address** thông qua lưu thực thể **Student** như sau.
```Java
@Entity
@Table(name="student")
public class Student implement Serialization {
    ...
    @OneToOne(mappedBy = "student", cascade=CascadeType.PERSIST)
    private Address address;
    
    public Student () {}
    
    public Student (String firstName, String lastName, String email, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
    }
    //getters and setters
}
```
Thực thể Address được bố trí lại.
```Java
@Entity
public class Address {

    @Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
    
	@Column(name="address_line1")
    private String addressLine1;

	@Column(name="address_line2")
    private String addressLine2;
    
    ...
    
    @OneToOne
    @PrimaryKeyJoinColumn
    private Student student;
    
    public Address() {}
    
        public Address(String addressLine1, String addressLine2, String city, String state, String country, String zipCode) {
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = zipCode;
    }
   // getters and setters
}
```
Và giờ là lúc persist **Student** cùng dữ liệu **Address**.

```Java
private static void insertEntity() {
    ...
    Address address = new Address("111", "Puadroad", "Pune", "Maharastra", "India", "411038");
    Student student = new Student("Ramesh", "Fadatare", "rameshfadatare@javaguides.com", address);
    entityManager.persist(student);
    ...
```
Kết quả ta nhận được như sau.
```sql
INSERT INTO student(id, first_name, last_name, email) 
VALUES (DEFAULT, 'Ramesh', 'Fadatare', 'rameshfadatare@javaguides.com')

insert into address(id, address_line1, address_line2, city, state, zip_code) 
values (default, '111', 'Puadroad', 'Pune', 'Maharastra', '411038')
```

## 4. Lưu trữ theo khối - Batch store
Để tăng performance lưu dữ liệu vào database, `EntityManager` hỗ trợ lưu trữ theo khối bằng các phương thức `clear()`, `flush()`.
Để lưu hàng trăm nghìn **Student** một lúc ta chia hành từng khối 10.000 như sau.
```Java
  entityManager.getTransaction().begin();
  for (int i = 1; i <= 1000000; i++) {
      Point point = new Point(i, i);
      entityManager.persist(point);
      if ((i % 10000) == 0) {
          entityManager.getTransaction().commit();
          entityManager.clear();          
          entityManager.getTransaction().begin();
      }
  }
  entityManager.getTransaction().commit();
```
## Tài liệu tham khảo
* [javaguides - differency way to store jpa enty objects](https://www.javaguides.net/2018/12/different-ways-to-store-jpa-entity-objects-into-database.html)