[Firebase Realtime database](https://firebase.google.com/docs/database/) là cơ sở dữ liệu được lưu trữ trên nền tảng cloud, hỗ trợ nhiều nên tảng như Android, IOS và Web.

Tất cả dữ liệu được lưu trữ ở định dạng JSON và mọi thay đổi về dữ liệu, phản ánh ngay lập tức bằng cách thực hiện đồng bộ hóa trên tất cả các nền tảng & thiết bị. 
Điều này cho phép chúng ta xây dựng các ứng dụng thời gian thực linh hoạt hơn một cách dễ dàng.

## 1. Cách dữ liệu được lưu trữ - Cấu trúc JSON

Firebase Realtime database là cơ sở dữ liệu được lưu trữ ở định dạng JSON.

Về cơ bản toàn bộ cơ sở dữ liệu là một cây JSON lớn với nhiều nút. 
Vì vậy, khi bạn lập cơ sở dữ liệu của mình, bạn cần chuẩn bị cấu trúc json theo cách dữ liệu có thể truy cập theo cách dễ dàng, bằng cách tránh lồng các nút con.

Dưới đây là một ví dụ về lưu trữ danh sách hồ sơ người dùng  trong  json.
Tham khảo [Structure Your Database](https://firebase.google.com/docs/database/android/structure-data) để xây dựng cấu trúc Json rõ ràng nhất.

```
{
  "users": [
    {
      "name": "Ravi Tamada",
      "email": "ravi@androidhive.info",
      "address": "XXX, XXXX, 1234"
    }
  ],
  "posts": [
    {
      "id": 100,
      "author": "Ravi Tamada",
      "content": "This is awesome firebase realtime database...",
      "timestamp": "13892733894"
    }
  ]
}
```

## 2. Dữ liệu offline

Firebase cung cấp hỗ trợ dự liệu offline.
Nó tự động lưu trữ dữ liệu offline khi không có kết nối Internet.

Khi thiết bị kết nối lại với internet, tất cả dữ liệu được đẩy lên cơ sở dữ liệu theo thời gian thực.

Để cho phép lưu trữ dữ liệu liên tục ngay cả khi ứng dựng khởi động lại bằng cách gọi code như sau :

```
FirebaseDatabase.getInstance().setPersistenceEnabled(true);
```

## 3. Thực hiện CRUD Operations

Để thực hiện bất kỳ thao tác nào trên cơ sở dữ liệu dù là đọc hoặc ghi, trước tiên bạn cần phải tham chiếu đến cơ sở dữ liệu.

Đoạn mã dưới đây cung cấp cho bạn tham chiếu đến nút trên cùng của cơ sở dữ liệu JSON. Từ đây bạn cần sử dụng tên nút con để duyệt qua.

```
private DatabaseReference mDatabase;
 
mDatabase = FirebaseDatabase.getInstance().getReference();
```

### 3.1. Insert data

Để insert dữ liệu, bạn có thể sử dụng phương thức setValue(). 
Nó sẽ tạo hoặc cập nhật giá trị đến đường dẫn đường cung cấp.

Ví dụ, đoạn code dưới đây sẽ insert một trường "copyright" ở cấp cao nhất của Json :

```
DatabaseReference mRef = mDatabase.getReference("copyright");
 
mRef.setValue("©2016 androidhive. All rights Reserved");
```

Realtime database chấp nhận nhiều kiểu dữ liệu  : **String, Long, Double, Boolean, Map<String, Object>, List<Object>** để lưu trữ.
Bạn cũng có thể sử dụng custom java objects để lưu trữ dữ liệu.
    
```
@IgnoreExtraProperties
public class User {
 
    public String name;
    public String email;
 
    // Default constructor required for calls to
    // DataSnapshot.getValue(User.class)
    public User() {
    }
 
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
```
    
```
DatabaseReference mDatabase = FirebaseDatabase.getInstance().getReference("users");
 
// Creating new user node, which returns the unique key value
// new user node would be /users/$userid/
String userId = mDatabase.push().getKey();
 
// creating user object
User user = new User("Ravi Tamada", "ravi@androidhive.info");
 
// pushing user to 'users' node using the userId
mDatabase.child(userId).setValue(user);
```
    
###     3.2 Reading Data
    
```
mDatabase.child(userId).addValueEventListener(new ValueEventListener() {
    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
 
        User user = dataSnapshot.getValue(User.class);
 
        Log.d(TAG, "User name: " + user.getName() + ", email " + user.getEmail());
    }
 
    @Override
    public void onCancelled(DatabaseError error) {
        // Failed to read value
        Log.w(TAG, "Failed to read value.", error.toException());
    }
});
```
    
### 3.3 Update data
    
```
String newEmail = 'androidhive@gmail.com';
 
mDatabase.child(userId).child("email").setValue(newEmail);
```