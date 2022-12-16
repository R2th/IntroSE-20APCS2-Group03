## 1. Giới thiệu
Chào các bạn hôm nay mình xin giới thiệu về Proxy Pattern và ứng dụng của nó (Lazy Loading). Proxy Pattern là một Design Pattern thuộc nhóm Structural Design Pattern liên quan đến cấu trúc và kết cấu các đối tượng trong lập trình hướng đối tượng.
## 2. Đặt vấn đề
Khi cần điều khiển truy nhập tới một đối tượng được thực hiện từ quá trình khởi tạo nó cho tới khi thực sự cần sử dụng nó. Trong trường hợp như vậy, ta nên dùng mẫu thiết kế proxy. Mẫu này có thể áp dụng vào những tình huống cần phải tham chiếu tới một đối tượng linh hoạt hơn, tinh tế hơn so với việc sử dụng con trỏ đơn giản. Proxy cung cấp một đại diện cho một đối tượng để điều khiển việc truy nhập nó. Có thể sử dụng proxy để đếm số tham chiếu tới đối tượng thực, do đó nó có thể tự động giải phóng khi không tham chiếu hay tải một đối tượng vào bộ nhớ khi nó được tham chiếu lần đầu tiên. Hoặc cần kiểm tra đối tượng thực nào đó có được khóa hay không trước khi nó bị truy nhập để đảm bảo không đối tượng nào khác có thể thay đổi nó. Sau đây là một số kiểu proxy thường được sử dụng:
- Một remote proxy từ xa cung cấp một biểu diễn cục bộ cho một đối tượng trong một không gian địa chỉ khác,  có thể sử dụng khi bạn cần một thêm chiếu định vị cho một đối tượng trong không gian địa chỉ (JVM)
- Một virtual proxy ảo là nó tạo ra một đối tượng có chi phí cao khi có yêu cầu theo yêu cầu –> lưu giữ các thông tin thêm vào về một dịch vụ thực vì vậy chúng có thể hoãn lại sự truy xuất vào dịch vụ này
- Một protection proxy bảo vệ điều khiển việc truy nhập đối tượng gốc. Các protection proxy rất hữu ích khi các đối tượng có các quyền truy nhập khác nhau –> xác thực quyền truy xuất vào một đối tượng thực
- Một smart reference proxy là sự thay thế cho một con trỏ rỗng cho phép thực hiện các chức năng thêm vào khi một đối tượng được truy nhập.
## 3. Sơ đồ thiết kế (UML Diagram)
![](https://images.viblo.asia/41ff378d-a81c-41dc-b0be-b5ca75711b4d.gif)

Trong đó:

- Subject : Đối tượng này xác định giao diện chung cho RealSubject và Proxy để Proxy có thể được sử dụng bất cứ nơi nào mà RealSubject mong đợi.

- Proxy : Nó duy trì một tham chiếu đến RealSubject để Proxy có thể truy cập nó. Nó cũng thực hiện các giao diện tương tự như RealSubject để Proxy có thể được sử dụng thay cho RealSubject. Proxy cũng điều khiển truy cập vào RealSubject và có thể tạo hoặc xóa đối tượng này.

- RealSubject : Đây là đối tượng chính mà proxy đại diện.
## 4. So sánh với pattern cùng loại (Structural Pattern)
Ta có thể thấy Proxy Pattern khá giống với Adapter Patern và Decorator Pattern
- Nó khác Adapter Pattern ở điểm sau. Thông thường mẫu Adapter cung cấp một giao diện khác với đối tượng mà nó thích nghi, còn Proxy cung cấp cùng một giao diện giống như chủ thể. 
- Với Decorator Pattern có thể có cài đặt tương tự như các proxy, nhưng Decorator có một mục đích khác. Một Decorator bổ sung thêm nhiều nhiệm vụ cho một đối tượng nhưng ngược lại Proxy điều khiển truy cập đến một đối tượng. Proxy tuỳ biến theo nhiều cấp khác nhau mà chúng có thể sẽ được cài đặt giống như một Decorator. Một Protection proxy có thể được cài đặt chính xác như một Decorator. Mặt khác một Proxy truy cập đối tượng từ xa sẽ không chứa một tham chiếu trực tiếp đến chủ thể thực sự nhưng chỉ duy nhất có một tham chiếu trực tiếp, giống như ID của host và địa chỉ trên host vậy. Một Proxy ảo sẽ bắt đầu với một tham chiếu gián tiếp chẳng hạn như tên file nhưng rốt cuộc rồi cũng sẽ đạt được một tham chiếu trực tiếp.
## 5. Lazy Loading
Design Pattern sinh ra để giải quyết các vấn đề, vậy proxy giải quyết vấn đề gì?, một trong những vấn đề nó giải quyết là về mặt performance của ứng dụng. Ở đây mình sẽ nói về **Lazy Loading**

**Lazy Loading** là một khái niệm mà ứng dụng trì hoãn việc tải các đối tượng cho đến thời điểm mà người dùng cần nó. Nói một cách đơn giản là tải theo yêu cầu của người dùng chứ không phải tải đối tượng không cần thiết.

Lợi ích của việc này là giảm thiểu số lượng yêu cầu, giảm thiểu số lượng tài nguyên thừa cần tải cho tới khi người dùng cần đến chúng thực sự.

Nếu bạn đã dùng hibernate, hay realm thì đã không xạ lạ gì với cơ chế này. Hibernate và realm và đều sử dụng lazy loading để lấy dữ liệu. Vậy họ đã làm như thế nào. 
Ở đây mình xin lấy ví dụ của **Realm** để giải thích cơ chế này.
Như các bạn đã biết thì realm là hệ cơ sở dữ liệu Nosql opensource được code bằng C++, chúng lưu trữ dữ liệu ở dạng Object. Để sử dụng realm thì Object phải kế thừa lớp RealmObject.
```java
public class Person extends RealmObject {
  private String  name;

  public String getName() { return name; }

  public void setName(String name) { this.name = name; }
}
```
Khi tạo xong lớp này Realm sẽ tự động tạo ra một lớp **PersonRealmProxy** lớp này kế thừa lớp Person chỉ chứa một thuộc tính hàng và ghi đè các phương thức get set của Person, thuộc tính hàng sẽ trỏ đến dữ liệu trong lớp Person:
```java
public class PersonRealmProxy extends Person {
  private Row row =...;
  private PersonColumnInfo columnInfo = ...;

  @Override
  public String getName() {
    return row.get(columnInfo.columnNameIndex);
  }

  @Override
  public void setName(String value) {
    row.set(columnInfo.columnNameIndex, value);
  }
}
```
Khi chúng ta query với realm, đối tượng trả về là RealmResult. Tại sao là RealmResult chứ không phải là một list Object? . Làm vậy để hạn chế việc khởi tạo tài nguyên không cần thiết
```java
RealmQuery<Person> query = realm.where(Person.class);
                           .beginsWith("name","Z");
RealmResults<Person> results = query.findAll();
```
RealmResults thực chất chỉ là list các index (nó chính là row trong PersonRealmProxy) được lấy ra từ B-Tree(Realm lưu dữ liệu theo cấu trúc B-tree) . Chỉ khi ta thực sự cần đối tượng thì đối tượng đó mới được tạo ra
```java
Person person = results.first();
```

Để cho dễ hiểu nên đã mình đã lấy ví dụ cách cài đặt cũ của Realm, cách cài đặt mới thực chất cũng dựa trên cách này chỉ tăng tính  bảo mật, và lỏng lẻo vì ta thấy thuộc tính get set là public, và lớp Proxy phải kế thừa lớp RealmObject. Nó sẽ tạo một phương thức trừu tượng **PersonRealmProxyInterface** và một lớp **PersonRealmProxy**
```java
public interface PersonRealmProxyInterface {
  public String realmGet$name();
  public void realmSet$name(String value);
}
```
```java
public class PersonRealmProxy extends Person implements PersonRealmProxyInterface {
  private Row row = ...;
  private PersonColumnInfo columnInfo = ...;

  public String realmGet$name() {
    return row.get(columnInfo.columnNameIndex);
  }
  public void realmSet$name(String value) {
    row.set(columnInfo.columnNameIndex, value);
  }
}

```
Interface PersonRealmProxyInterface chứa 2 phương thức có tên rất đặc biệt thay cho việc get set ở trên cách thực hiện cũ đã làm, 2 phương thức này đã thực hiện bycode để bảo mật dữ liệu bằng việc hàm get set ở trên Person sẽ không trả về thuần túy như trước nữa mà là : 
```java
public class Person extends RealmObject implements PersonRealmProxyInterface {
  private String  name;
  public String   getName() { return realmGet$name(); }
  public void     setName(Stringname) {realmSet$name(name); }

  @Override
  public String realmGet$name() { return name; }

  @Override
  public void realmSet$name(String value) { this.name = name; }
}
```
## 6. Tổng Kết
Ở bài viết mình đã giới thiệu về Proxy Patter và một ví dụ về Virtual Proxy (Lazy Loading). Trong thực tế Proxy còn rất nhiều ứng dụng hay ho khác, các bạn có thể tự tìm hiểu thêm. Chúc các bạn một cuối tuần vui vẻ :D