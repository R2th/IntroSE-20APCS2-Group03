## AutoMapper

- Chào các bạn, sau một thời gian sử dụng thư viện [AutoMapper](https://github.com/nartc/mapper) của tác giả **Chau Tran**. Mình xin phép chia sẻ use-case mà mình áp dụng trong dự án làm backend của mình. Trong các dự án của mình có sử dụng typeorm library để làm orm giúp mình thực hiện persistent dư liệu xuống database, vì thế mình cần tạo ra khá nhiều entity (mỗi entity sẽ đại diện cho một table dưới database). Bây giờ các bạn hãy cùng xem mình dùng AutoMapper như thế nào nhé.

* Giả sử mình có một entity như sau:

```javascript
@Entity('USER')
class User {
  @Column('number', { primary: true, name: 'ID', precision: 20, scale: 0 })
  @AutoMap()
  id: number;

  @Column('varchar2', { name: 'PASSWORD', nullable: true, length: 50 })
  @AutoMap()
  password: string | null;

  @Column('nvarchar2', { name: 'USER_NAME', nullable: true, length: 100 })
  @AutoMap()
  userName: string | null;
}
```

* Trong trường hợp bạn muốn lấy thông tin của một user các bạn sẽ thực hiện như sau: 
  * `let userInfo = userRepo.findOne(id);`
  * Sau đó trả về `userInfo` về cho frontend. Nhưng có vẻ có gì đó không ổn ở đây nhỉ. Làm sao mình có thể trả về `password` của người dùng về cho frontend được. Vậy giải pháp ở đây là gì :D. Các bạn hãy nhìn lên tiêu đề bài viết nhé ***AutoMapper***. Sau đây mình sẽ hướng dẫn các bạn sử dụng tính năng cơ bản của thư viện này nhé.

* Tạo một class UserVm như sau:

```javascript
class UserVm {
  @AutoMap()
  id: number;

  @AutoMap()
  userName: string | null;
}
```

* Việc còn lại khá đơn giản. Mọi thứ cứ để ***AutoMapper*** lo =)). Các bạn chỉ cần làm hai việc như sau:
  *  `Mapper.createMap(User, UserVm);` 
  *  `let userInfo = Mapper.map(userRepo.findOne(id), UserVm);`
* Sau khi thực hiện xong câu lệnh này, kết quả trả về cho frontend chỉ còn tồn tại id và userName.
* Như các bạn đã thấy, việc sử dụng thư viện để thực hiện mapper hai object khá đơn giản. Tuy nhiên, làm thế nào để code trong clean hơn thì sẽ phải tốn nhiều giấy mực nữa. Mình xin phép được giới thiệu với các bạn ở bài viết sau nhé. Nếu thấy hữu ích các bạn nhớ star cho thư viện này nhé. Cảm ơn các bạn đã đọc đến cuối bài viết của mình.

##### P/S: chia sẻ thêm cho ace bạn bè gần xa được biết là tác giả của thư viện này còn rất nhiệt tình hỗ trợ nữa. Trong quá trình sử dụng nếu có gì không hiểu hoặc nhưng issue gì tác giả có thể hỗ trợ mọi người bằng video call =))