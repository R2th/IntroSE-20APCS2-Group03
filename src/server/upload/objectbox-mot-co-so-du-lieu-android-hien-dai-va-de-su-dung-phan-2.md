# Giới thiệu
ObjectBox được thiết kế dành cho thiết bị di động. Nó là một cơ sở dữ liệu nhúng hướng đối tượng có khả năng thay thế đầy đủ cho SQLite. ObjectBox cũng rất thích hợp cho IoT. ObjectBox được tối ưu hóa cho hiệu suất và được thiết kế để các nhà phát triển ứng dụng không phải xử lý SQL. Vì vậy lợi thế hiệu suất là khá ấn tượng so với SQLite.
Ở phần trước chúng ta đã tìm hiểu cơ bản về cách sử dụng objectbox trong thực thế , ở phần này chúng ta sẽ đi sâu vào tìm hiểu các phương thức queris dữ liệu của objectbox
# Queries
## QueryBuilder: 
Objectbox cung cấp cho chúng ta một object QueryBuilder phục vụ cho việc custom query
```
List<User> joes = userBox.query().equal(User_.firstName, "Joe").build().find();
```
Như ví dụ trên ta có thể query theo user_firstName
Hoặc có thể kết hợp nhiều query vào trong cùng một QueryBuilder
```
QueryBuilder<User> builder = userBox.query();
builder.equal(User_.firstName, "Joe")
          .greater(User_.yearOfBirth, 1970)
          .startsWith(User_.lastName, "O");
List<User> youngJoes = builder.build().find();
```
## **Query**: 
đối tượng query được tạo khi QueryBuilder call build() hỗ trợ thêm các hàm truy vấn khác
```
Query<User> query = builder.build();
List<User> user = query.find();
User user = query.findFirst();
User user = query.findUnique();
```
## **Finding objects**
```
// return all entities matching the query
List<User> joes = query.find();
 
// return only the first result or null if none
User joe = query.findFirst();
 
// return the only result or null if none, throw if more than one result
User joe = query.findUnique();
```
## **Reusing Queries and Parameters**
Chúng ta có thể reuse các query bằng việc thay thế các parameters
```
Query<User> query = userBox.query().equal(User_.firstName, "").build();
List<User> joes = query.setParameter(User_.firstName, "Joe").find();
List<User> jakes = query.setParameter(User_.firstName, "Jake").find();
```
## **Limit, Offset, and Pagination**
```
Query<User> query = userBox.query().equal(UserProperties.FirstName, "Joe").build();
List<User> joes = query.find(/* offset by */ 10, /* limit to */ 5 /* results */);
```
## **PropertyQuery**
ObjectBox hỗ trợ truy vấn theo từng property nhất định mà không cần thiết phải toàn bộ object
```
String[] emails = userBox.query().build().property(User_.email).findStrings();
```
Như ví dụ trên chúng ta chỉ cần trả về tất cả user_email dưới dạng một String array

## **Eager Loading of Relations**
Mặc định ObjextBox sẽ loát toàn bộ các Objext đã references với nhau trong database tuy nhiên trong một số trường hợp ta chỉ cần query các object chủ đích mà không quan tâm tới các objext references để tăng hiệu suất truy vấn thì ta có thể sử dụng query eager
```
QueryBuilder.eager()
```
## **Query filters**
ObjextBox còn cung cấp một query filter cực kỳ mạnh mẽ giúp chúng ta có thể query mọi thứ miễn là nó có trong objext cần query
```
userBox.query().equal(User_.name, “Joe”).filter(new QueryFilter<User>() {
            @Override
            public boolean keep(User user) {
                return user.age >30;
            }
        });
```
# Kết luận
Với sự hỗ trợ cực kỳ mạnh mẽ với hơn 1300 method  thì ObjextBox thực sự là một đối trọng của Room, Realm hay bất kỳ một mobile database nào khác, ở phần sau chúng ta sẽ đi kiểm tra hiệu suất thực tế của ObjextBox so với realm và room như thế nào nhé