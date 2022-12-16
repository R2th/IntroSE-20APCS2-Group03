# Giới thiệu về JPA Criteria API
JPA Criteria API là một tiền định nghĩa API được sử dụng để định nghĩa câu lệnh queries cho các entities. Nó là một sự ra đời nhằm thay thế cho JPQL query, Những queries được tạo ra là khá an toàn và linh hoạt dễ thay đổi.
# Tại sao nên sử dụng JPA Criteria API 
Bình thường khi chúng ta viết các câu lệnh queries chúng ta thường sử dụng JPQL query, với cách viết này nó khá tương đồng với các câu lệnh SQL nên khi đọc vào thì chúng ta sẽ cảm thấy dễ hiểu. Nhưng hãy tưởng tượng bạn có hàng nghìn chỗ sử dụng các câu query như vậy, và như chúng ta cũng biết chỉ khi nào ở thời điểm runtime khi chạy qua câu lệnh nào thì chúng ta mới kiểm chứng được độ chính xác của nó. Nếu bây giờ hàng ngàn câu lệnh Sql kia bị ảnh hưởng bởi vì chúng ta thay đổi các Entities, DB ... Như vậy chúng ta sẽ phải sửa đổi hết tất cả các chỗ bị ảnh hưởng, lúc đó cách làm của chúng ta là phải tìm hết những chỗ bị ảnh hưởng, còn chưa kể những công việc do con người làm thì rất dễ bị quên, nhầm lẫn ...
JPA Criteria API sẽ tạo ra các queries dựa theo các entites, do đó khi chúng ta thay đổi các entities thì chúng ta sẽ dễ dãng nhận biết được những chỗ bị ảnh hưởng. Như vậy chúng ta sẽ tiết kiệm được rất nhiều chi phí cho việc sửa đổi, và kiểm tra lại những chỗ bị tác động.
# Sử dụng JPA Criteria API và Metamodal để tạo Typesafe Queries
## Metamodel API
### Metamodal là gì và tại sao nên sử dụng
Tại sao chúng ta nên dùng Metamodel API, vậy mục đích của Metamodel API là gì?
Metamodel API được sử dụng để tạo Metamodel cho mỗi entity nhằm mục đích quản lý các tên fields hay properties. Như vậy mỗi lần trong câu lệnh query muốn chỉ định đến một field hay property cụ thể nào đó thì chúng ta sẽ lấy thông qua metamodal này, làm như vậy giúp trúng ta có thể tránh được việc hard code trong câu query và quan trọng là khi mỗi Entity thay đổi chẳng hạn như tên field bị thay đổi thì chúng ta có thể biết được câu query nào bị ảnh hưởng do tên metamodal được sử dụng đã bị thay đổi.
Tiêu chuẩn chung cho việc đặt tên Metamodal là có dấu gạch ngang ở phía sau tương tự như sau:
```
@Entity
public class Pet {
  @Id
  protected Long id;
  protected String name;
  protected String color;
  @ManyToOne
  protected Set<Owner> owners;
  ...
}
The corresponding Metamodel class is:

package com.example;

...

@Static Metamodel(Pet.class)
public class Pet_ {
  
  public static volatile SingularAttribute<Pet, Long> id;
  public static volatile SingularAttribute<Pet, String> name;
  public static volatile SingularAttribute<Pet, String> color;
  public static volatile SetAttribute<Pet, Owner> owners;
}
```
### Cách sử dụng
Chúng ta có thể sử dụng metamodal thông qua việc gọi hàm getModal() của Root<Entitty>
```
EntityManager em = ...;
CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery cq = cb.createQuery(Pet.class);
Root<Pet> pet = cq.from(Pet.class);
EntityType<Pet> Pet_ = pet.getModel();
```
Hoặc có thể gọi thông qua EntityManager như sau 
```
EntityManager em = ...;
Metamodel m = em.getMetamodel();
EntityType<Pet> Pet_ = m.entity(Pet.class);
```
    
## Criteria API Query
Nhìn chung thì để tạo nên câu SQL thì chúng ta thường có các mệnh đề SELECT, FROM, WHERE 
Chúng ta sẽ lấy một ví dụ đơn giản của việc tạo query thông qua Criteria API 
```
EntityManager em = ...;
CriteriaBuilder cb = em.getCriteriaBuilder();

CriteriaQuery<Entity class> cq = cb.createQuery(Entity.class);
Root<Entity> from = cq.from(Entity.class);

cq.select(Entity);
TypedQuery<Entity> q = em.createQuery(cq);
List<Entity> allitems = q.getResultList();
```
Trước tiên để có được instance của CriteriaBuilder interface thì cung ta phải gọi phương thức getCriteriaBuilder của EntityManager hoặc EntityManagerFactory
Criteria queries sẽ được xây dựng bằng cách tạo ra instance của interface avax.persistence.criteria.CriteriaQuery 
đối tượng CriteriaQuery này sẽ định nghĩa cho câu query sẽ trả về giá trị cho đối tượng nào. Để có được instance của nó chúng ta gọi phương thức createQuery của CriteriaBuilder
Giả sử nếu chúng ta không muốn kết quả trả về là một entity mà là một kiểu String hay những kiểu giá trị đã được định nghĩa sẵn thì chúng ta sẽ thực hiện như sau
```
CriteriaQuery<String> cq = cb.createQuery(String.class);
```
### Query Roots
Tiếp theo chúng ta sẽ thấy việc sử dụng Root<Entity> 
Đối với mỗi đối tượng CriteriaQuery thì Root entity của query là nơi tổ chức các điều hướng của câu query, chúng ta có thể hiểu nó tương tự như mệnh đề FROM trong JPQL query.
Để tạo ra một query root chúng ta gọi phương thức from của CriteriaQuery
```
Root<Entity> pet = cq.from(Entity.class);
```
Như việc mô tả metalmodal ở trên thì việc gọi và sử dụng có thể được gọi thông qua Root entity 
```
EntityManager em = ...;
Metamodel m = em.getMetamodel();
EntityType<Entity> Entity_ = m.entity(Entity.class);
Root<Entity> pet = cq.from(Entity_);
``` 
Criteria queries cũng có thể có nhiều Root entity, như trong trường hợp câu lệnh query muốn điều hướng tới nhiều entities.
CriteriaQuery<Entity> cq = cb.createQuery(Entity.class);
Root<Entity> pet1 = cq.from(Entity.class);
Root<Entity> pet2 = cq.from(Entity.class);
### Sử dụng Join cho Querying Relationships 
Việc tương tác với database mà có các bảng liên kết với nhau là được sử dụng thường xuyên, vì vậy để tạo ra các liên kết này thì Criteria cung cấp Join với câu lệnh như sau 
Join<X, Y> với X là entity nguồn, và Y là mục tiêu join 
Ví dụ của việc Join 
```
CriteriaQuery<Pet> cq = cb.createQuery(Pet.class);
Root<Pet> pet = cq.from(Pet.class);
Join<Pet, Owner> owner = pet.join(Pet_.owners);
```
Việc join chúng ta cũng có thể nỗi chuỗi lại với nhau cho việc join nhiều hơn 2 bảng với nhau chẳng hạn như
```
CriteriaQuery<Pet> cq = cb.createQuery(Pet.class);

Root<Pet> pet = cq.from(Pet.class);
Join<Owner, Address> address = cq.join(Pet_.owners).join(Owner_.addresses);
```
### Path Navigation trong Criteria Queries
Đối tượng Path được sử dụng trong mệnh đề SELECT, WHERE của Criteria query
Dựa vào đối tượng Path chúng ta có thể chỉ định cụ thể field muốn được lấy, hay chỉ định field nào sẽ được dùng trong câu lệnh kiểm tra điều kiện 
```
CriteriaQuery<String> cq = cb.createQuery(String.class);

Root<Pet> pet = cq.from(Pet.class);
cq.select(pet.get(Pet_.name));
```
với câu lệnh trên thì chúng ta chỉ định là lấy ra tên của thú cưng
### Restricting Criteria Query Results
Kết quả trả về của một query có thể được loại bỏ bớt những dữ liệu không cần thiết bằng cách chúng ta có thể set điều kiện ở trong câu lệnh WHERE. Criteria cung cấp các phương thức để cho việc thực thi các điều kiện theo mong muốn chẳng hạn như isNull, isNotNull, in ... gọi là Expression
Một số ví dụ cụ thể :
Lấy ra thông tin sinh viên mà không có địa chỉ
```
CriteriaQuery<Student> cq = cb.createQuery(Student.class);
Root<Student> student = cq.from(Student.class);
cq.where(student.get(Student_.address).isNull());
```
Hoặc lấy ra thông tin sinh viên có tên là Petter hoặc John
```
CriteriaQuery<Student> cq = cb.createQuery(Student.class);
Root<Student> student = cq.from(Student.class);
cq.where(student.get(Student_.address).in("Petter", "John"));
```
Ngoài ra chúng ta có thể tham khảo thêm các method khác của Expression như equal, notEqual, gt, ge, lt, le, between, like
### Ordering Results
Việc kết quả trả về có thể sẽ được sắp xếp theo một thứ tự nào đó, theo một giá trị nào đó 
Criteria cung cấp 2 hàm cho việc này là desc và asc 
Ví dụ cụ thể 
Lấy ra danh sách sinh viên theo thứ tự sắp xếp giảm dần theo ngày sinh
```
CriteriaQuery<Student> cq = cb.createQuery(Student.class);
Root<Student> student = cq.from(Student.class);
cq.select(student);
cq.orderBy(cb.desc(student.get(Student_.birthday))); 
```
Lấy ra danh sách sinh viên theo thứ tự sắp xếp tăng dần theo ngày sinh
```
CriteriaQuery<Student> cq = cb.createQuery(Student.class);
Root<Student> student = cq.from(Student.class);
cq.select(student);
cq.orderBy(cb.desc(student.get(Student_.birthday))); 
```
Nếu muốn sắp xếp theo nhiều trường, thì tên những trường này được phân cách nhau bởi dấy phẩy
```
CriteriaQuery<Student> cq = cb.createQuery(Student.class);
Root<Student> student = cq.from(Student.class);
cq.select(student);
cq.orderBy(cb.desc(student.get(Student_.birthday), student.get(Student_.name))); 
```
###     Grouping Results
Chúng ta cũng có thể nhóm các kết quả trả về theo những trường nhất định 
```
CriteriaQuery<Student> cq = cb.createQuery(Student.class);
Root<Student> student = cq.from(Student.class);
cq.groupBy(student.get(Student_.birthday));
```
##     Thực thi Queries
Để chuẩn bị cho query được thực thi thì chúng ta tạo một đối tượng TypedQuery<T> bằng cách truyền CriteriaQuery như parameter vào phương thước EntityManager.createQuery
Kết quả trả về sẽ chia làm 2 lọai 
###     Single-Valued Query Results
Chúng ta gọi phương thức TypedQuery<T>.getSingleResult
```
CriteriaQuery<Student> cq = cb.createQuery(Student.class);
...
TypedQuery<Student> q = em.createQuery(cq);
Student result = q.getSingleResult();
```
###     Collection-Valued Query Results
Chúng ta gọi phương thức TypedQuery<T>.getResultList
```
CriteriaQuery<Student> cq = cb.createQuery(Student.class);
...
TypedQuery<Student> q = em.createQuery(cq);
List<Student> results = q.getResultList();

```

Tài liệu tham khảo
https://www.tutorialspoint.com/jpa/jpa_criteria_api.htm
https://www.tutorialspoint.com/jpa/jpa_criteria_api.htm
https://docs.oracle.com/javaee/6/tutorial/doc/gjivm.html