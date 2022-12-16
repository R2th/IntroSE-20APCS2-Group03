## AutoMapper

- Chào các bạn, chúng ta lại tiếp tục với [AutoMapper](https://github.com/nartc/mapper) của tác giả **Chau Tran**. Vẫn liên typeorm, khi dùng một orm nào đó, chúng ta thường rất hay phải làm việc với relation (quan hệ). Trong bài viết hôm nay mình sẽ trình bày làm sao để flatten các nested object trước khi gửi giữ liệu về cho frontend nhé.

* Giả sử mình có entity như sau:

```javascript
@Entity('ROLE')
class Role {
  @Column('number', { primary: true, name: 'ID', precision: 20, scale: 0 })
  @AutoMap()
  id: number;

  @Column('varchar2', { name: 'name', nullable: true, length: 50 })
  @AutoMap()
  description: string | null;
}
```

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
  email: string | null;

  @Column('nvarchar2', { name: 'USER_NAME', nullable: true, length: 100 })
  @AutoMap()
  firstName: string | null;

  @Column('nvarchar2', { name: 'USER_NAME', nullable: true, length: 100 })
  @AutoMap()
  lastName: string | null;

  @Column('number', { primary: true, name: 'ROLE_ID', precision: 20, scale: 0 })
  @AutoMap()
  roleId: number;

  @OneToOne(type => Role)
  @JoinColumn({name: 'ID', referencedColumnName: 'roleId'})
  @AutoMap(() => Role)
  role: Role;
}
```
* Trong trường hợp bạn muốn lấy thông tin của một user các bạn sẽ thực hiện như sau: 
  * `let userInfo = userRepo.findOne(id, {relations: ['role']});`. Khi này kết quả nhận được trông sẽ như sau: 
  ```javascript
    {
      id: 1,
      password: '123456',
      email: 'admin@gmail.com',
      firstName: 'Cesc',
      lastName: 'Nguyễn',
      roleId: 1,
      role: {
        id: 1,
        description: 'staff'
      }
    }
  ```
* Đù má, mình mà trả về đống này cho frontend chắc cả team nó sang làm  gỏi mình quá =)). Thế nên mình phải làm thêm một thao tác nữa cho cái object này nó đẹp đẹp xíu. Tạo một class UserVm như sau:

```javascript
class UserVm {
  @AutoMap()
  id: number;

  @AutoMap()
  email: string;

  @AutoMap()
  fullName: string;

  @AutoMap()
  roleName: string;
}
```

* Đừng quên `Mapper.createMap(User, UserVm);` ở bài trước nhé. Bài này chúng ta chỉ cần thêm 1 tẹo nữa thôi là code chạy ngon lành à
```javascript
Mapper.createMap(User, UserVm)
  .forMember(d => d.roleName, mapFrom(s => s.role.description))
  .forMember(d => d.fullName, mapFrom(s => `${s.firstName} ${s.lastName}`));
```
* Việc còn lại cũng chẳng còn gì. Anh em backend chỉ việc vểnh râu lên nhận kết quả thôi `let userInfo = Mapper.map(userRepo.findOne(id, { relations: ['role'] } ), UserVm);`. Lúc này kết quả trông sẽ như sau nhé:
```javascript
{
  id: 1,
  email: 'admin@gmail.com',
  fullName: 'Cesc Nguyễn',
  roleName: 'staff'
}
```

* Giải thích qua một chút cho các bạn hiểu tại sao khi `createMap` mình lại thêm 1 đoạn code kia nhé. Đầu tiên, forMember nhận vào 2 tham số, tham số thứ nhất là member trong destination class (class `UserVm`), tham số thứ 2 là 1 member từ source class (class `User`). Các bạn có thể hiểu nôm na là ***cái gì cần được map*** và ***thiết lập map như thế nào***

* Nhìn có vẻ ngon ăn phết rồi nhỉ. Tuy nhiên, sẽ có một vấn đề khi `role` trong class `User` mà có giá trị undefined thì sao (team Frontend nó lại được dịp xỉ vả chứ sao nữa :3). Tuy nhiên các bạn đừng lo, ***AutoMapper*** sẽ giúp bạn xử lý trường hơp này. Mình sẽ chia sẻ ở bài viết sau nhé. Cảm ơn các bạn đã đọc hết bài của mình, nếu thấy hay và hữu ích hay chia sẻ và star cho thư viện này trên github nhé các bạn :D


##### P/S: chia sẻ thêm cho ace bạn bè gần xa được biết là tác giả của thư viện này còn rất nhiệt tình hỗ trợ nữa. Trong quá trình sử dụng nếu có gì không hiểu hoặc nhưng issue gì tác giả có thể hỗ trợ mọi người bằng video call =))