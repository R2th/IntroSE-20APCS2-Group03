Java là một ngôn ngữ tuyệt vời nhưng đôi khi nó quá chi tiết cho những đoạn code phổ biến.Bạn có cảm thầy lười biến khi chúng ta thường khai báo các method getter, setter, equals, hashCode, toString... và việc này chiếm số lượng ko nhỏ số dòng code, việc lặp đi lặp lại hành động này có khiến bạn nhàm chán? 
Để giải quyết điều này bạn có thể sử dụng Lombok - một thư viện java autogenerating Java bytecode vào trong file .class của bạn theo một số chú thích có sẵn. Lombok có nhiều chú thích khác nhau được và nó được xử lý trong quá thời gian compile, giúp code của bạn trông gọn gàng clear hơn nhiều.

Để cài đặt thư viện lombok, bạn có thể download trên trang chủ https://projectlombok.org/ hoặc cài plugin

* **Gradle**:
```
dependencies {
    compileOnly('org.projectlombok:lombok:1.16.20')
}
```

* **Maven**:
```
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.16.20</version>
</dependency>
```

* Cài đặt lombok trên Intellij: File > Settings > Plugins > Search Lombok Plugin > Install:
 
![](https://images.viblo.asia/7280cee1-21d5-4143-b713-8cc456239e19.png)
* -Tiếp theo bạn cần enable Annotation Processing để IDE có thể hiểu được các annotation này:

![](https://images.viblo.asia/da08a0ee-6eeb-42e6-95f1-d608b10dedeb.png)
* Một class java thông thường:
```
@Entity
@Table(name = "user")

public class User {

  private static final long serialVersionUID = 7913573335665714061L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Temporal(TemporalType.DATE)
  @Column(name = "birthday")
  private Date birthday;

  @Column(name = "password")
  private String password;

  public User() {
  }

  public User(String firstName, String lastName, String phoneNumber, Date birthday, String password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.birthday = birthday;
    this.password = password;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public Date getBirthday() {
    return birthday;
  }

  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", firstName='" + firstName + '\'' +
        ", lastName='" + lastName + '\'' +
        ", phoneNumber='" + phoneNumber + '\'' +
        ", birthday=" + birthday +
        ", password='" + password + '\'' +
        '}';
  }
}
```

* Sử dụng Lombok:

![](https://images.viblo.asia/7df5c9c2-057f-4b76-8f85-b17568e8c72a.png)

* Giải thích các Annotation :
- @Getter, @Setter: Thay cho việc khai báo các method getter(), setter().
- @NoArgsConstructor: thay việc khai báo contructor default.
- @AllArgsConstructor: thay thế việc khai báo contructor với tất cả các thuộc tính được truyền vào dưới dạng tham số.
- @ToString: thay thế cho helper function là toString().
- @Builder: thay thế cho toàn bộ inner class để xây dựng một builder cho lớp đối tượng.
- @Data: kết hợp của các Annotation :  @ToString, @EqualsAndHashCode, @Getter và @Setter. Nó cũng tạo ra một public contructor sẽ nhận bất kỳ trường @NonNull hoặc final field nào được truyền dưới dạng tham số. Điều này cung cấp mọi thứ cho POJO.
```
@Data
public class User {
    private String userName;
    private String phoneNumber;
    private String address;
}
```

Ngoài ra còn nhiều Annotation khác bạn có thể tham khảo ở đây https://projectlombok.org/features/all.

**Tổng quát:**
    Việc giảm tải số lượng code giúp dễ đọc hơn, ít mã hơn cũng có nghĩa là nguy cơ bị lỗi ít hơn, và nếu bạn muốn tùy biến một thành phần nào đó như viết lại hàm toString() theo quy ước code của bạn thì trong quá trình biên dịch Lombok sẽ không tạo ra và ghi đè login code mà bạn đã thêm. Hi vọng bài viết này sẽ giúp ích bạn !

* **Nguồn tham khảo**:

https://www.baeldung.com/intro-to-project-lombok

https://projectlombok.org/