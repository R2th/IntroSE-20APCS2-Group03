Để tạo một người dùng mới cho database mongodb chúng ta dùng phương thức ***db.createUser()*** trong mongodb


## **1. Definition**
### ***db.createUser(user, writeConcern)***

Để tạo 1 user mới cho database thì chúng ta thực hiện lệnh trên. Kết quả sẽ trả về duplicate user error nếu user đó đã tồn tại rồi. 
Các tham số trong phương thức:
- user có kiểu dữ liệu là document với xác thực và thông tin truy cập về user để tạo.
- writeConcern cũng có kiểu dữ liệu là document. Đây là 1 trường không bắt buộc.
Dưới đây là 1 form mẫu cho việc tạo 1 user:
```
{
  user: "<name>",
  pwd: "<cleartext password>",
  customData: { <any information> },
  roles: [
    { role: "<role>", db: "<database>" } | "<role>",
    ...
  ],
  authenticationRestrictions: [
     {
       clientSource: ["<IP>" | "<CIDR range>", ...]
       serverAddress: ["<IP>" | "<CIDR range>", ...]
     },
     ...
  ],
  mechanisms: [ "<SCRAM-SHA-1|SCRAM-SHA-256>", ... ],
  passwordDigestor: "<server|client>"
}
```
Trong form trên thì user có những field sau:
- user(type: string): đây là tên của user sẽ được tạo
- pwd(type: string): đây là password dùng để đăng nhập của user. Trường pwd này là không bắt buộc nếu chúng ta chạy db.createUser() tren $external database để tạo user, người mà có thông tin được lưu trữ bên ngoài Mongodb.
- customData(type: document): Trường này cũng là không bắt buộc. Cái này có thể là bất cứ thông tin nào. Trường này có thể để lưu trữ bất kì thông tin nào mà admin muốn liên kết với một người dùng cụ thể.
- roles(type: array): Những role sẽ được cấp cho user, có thể chỉ để là mảng rỗng nếu muốn tạo user mà không có roles.
- authenticationRestrictions(type: array): Thuộc tính không bắt buộc.Các hạn chế xác thực mà máy chủ thực thi trên người dùng sẽ tạo. Chỉ rõ một list các địa chỉ ip và phạm vi CIDR mà từ đó người dùng được phép kết nối với máy chủ hoặc từ đó máy chủ có thể chấp nhận người dùng.
- mechanisms(type: array): Thuộc tính không bắt buộc.Chỉ rõ cụ thể cơ chế SCRAM hoặc cơ chế tạo để tạo xác thực thông tin người dùng. Nếu  
- passwordDigestor(type: string): thuộc tính không bắt buộc. Cho biết máy chủ hoặc máy khách có nhận mật khẩu hay không.

### ***Roles***

Trong trường roles, chúng ta có thể chỉ định cả roles được tích hợp trong mongodb và roles mà chúng ta tự định nghĩa.
Để chỉ định một role mà đã tồn tại trong cùng một cơ sở dữ liệu nơi mà db.createUser() được chạy, chúng ta có thể chỉ định role với tên của role:
```
"readWrite"
```
hoặc chúng ta có thể chỉ định role với một document, như là:
```
{ role: "<role>", db: "<database>" }
```
Để chỉ định một role đã tồn tại trong một db khác, hãy chỉ định role with một document.

### ***Authentication Restrictions***
AuthenticationRestrictions document chỉ có thể chứa các trường sau. Máy chủ sẽ bắn ra lỗi nếu nó chứa trường nào đó mà không nhận dạng được.
- clientSource: có giá trị là một mảng chứa cả địa chỉ IP và CIDR hoặc chỉ chứa mỗi địa chỉ IP. Máy chủ sẽ xác minh xem địa IP có nằm trong danh sách hoặc nằm trong phạm vi CIDR. Nếu không có địa chỉ ip thì máy chủ sẽ không xác thực user.
- serverAddress: có giá trị là một mảng chứa cả địa chỉ IP và CIDR hoặc chỉ chứa mỗi địa chỉ IP. Một list địa chỉ IP hoặc phạm vi CIDR cái mà user có thể connect tới.
## **2. Behavior**
### ***Replica set***
Nếu chạy trên một replica set(replica set có thể hiểu là tập data được nhân bản trên nhiều server thay  vì tập trung trên một server), db.createUser() sẽ được thực thi sử dụng [majority](https://docs.mongodb.com/manual/reference/write-concern/#writeconcern."majority") làm mặc định.
### ***local Database***
chúng ta không thể tạo user trên cơ sở dữ liệu cục bộ.
## **3. Required Access**
- Để tạo một user mới trong database, chúng ta phải có [createUser](https://docs.mongodb.com/manual/reference/privilege-actions/#createUser) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) trên [database resouse](https://docs.mongodb.com/manual/reference/resource-document/#resource-specific-db).
- Để có thể cấp quyền cho user, chúng ta phải có [grantRole](https://docs.mongodb.com/manual/reference/privilege-actions/#grantRole) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions)

userAdmin và userAdminAnyDatabase có thể tạo và sửa đổi roles cho user trên database hiện tại.

## **4. Examples**
Tạo một user với tên ***accountAdmin01*** trên ***products*** database
```
use products
db.createUser( { user: "accountAdmin01",
                 pwd: "changeMe",
                 customData: { employeeId: 12345 },
                 roles: [ { role: "clusterAdmin", db: "admin" },
                          { role: "readAnyDatabase", db: "admin" },
                          "readWrite"] },
               { w: "majority" , wtimeout: 5000 } )
```
User mới được tạo có những role sau:
- clusterAdmin và readAnyDatabase roles trên admin database
- Có quyền đọc viết trên products database.

### ***Create User without Roles***
```
use admin
db.createUser(
   {
     user: "reportsUser",
     pwd: "password",
     roles: [ ]
   }
)
```
user reportsUser mới được tạo ra trên database admin nhưng không có quyền gì cả.

### ***Create User with Roles***
```
use products
db.createUser(
   {
     user: "accountUser",
     pwd: "password",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
```
user accountUser mới được tạo ra trên database products và có quyền chỉnh sửa  document cũng như có khả năng thực hiện các tác vụ quản trị liên quan đên schema-related tasks, indexing, thu thập số liệu thống kê.

### ***Create User with Authentication Restrictions***
```
use admin
db.createUser(
   {
     user: "restricted",
     pwd: "password",
     roles: [ { role: "readWrite", db: "reporting } ],
     authenticationRestrictions: [ {
        clientSource: ["192.0.2.0"],
        serverAddress: ["198.51.100.0"]
     } ]
   }
)
```
User restricted mới được tạo ra trên database admin. User chỉ có thể được xác thức nếu connect từ địa chỉ ip 192.0.2.0  đến 198.51.100.0.

## ***Conclusion***
Trên đây là một số khái niệm cơ bản và ví dụ để tạo thêm user với các quyền thao tác với db trong mongodb. Cảm ơn đã đọc bài viết.


Nguồn: https://docs.mongodb.com/manual/reference/method/db.createUser/