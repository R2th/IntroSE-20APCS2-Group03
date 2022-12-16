Chúng ta sẽ tìm hiểu cách sử dụng rails console để test về validate, associations.
### Tìm tất cả các method của một object
```
obj = Object.new
obj.methods
```

### Tìm tất cả các method public của một object
```
obj = Object.new
obj.public_methods
```

### Tìm tất cả các method private của một object
```
obj = Object.new
obj.private_methods
```
### Tìm nơi định nghĩa methods

```
Object.new.method(:name_method).source_location
```
### Validations to models
![](https://images.viblo.asia/c79a52cf-1400-4000-8048-025fd1f47471.png)

Sau đó tạo object
![](https://images.viblo.asia/e24abce0-50ac-49fd-a256-107827547702.png)

Sẽ không tạo được object, sử dụng a.errors.messages để lấy phần validate lỗi.
### Add association to model
![](https://images.viblo.asia/8e4240d4-32e7-4475-a329-003ff736399b.png)
Sau đó chúng ta tạo object user. Sau đó ta chỉ cần user.books để lấy ra tất cả các quyển sách của user đó.

### use with databases
Đây có lẽ là công dụng quan trọng nhất của console. Chúng ta có thể thêm, sửa, xóa, tìm dữ liệu của ứng dụng trong console. Nếu không muốn thay đổi database trong cosole thì chúng có thể sử dụng raiils c --sandbox nó sẽ rollback lại database chúng ta vừa sửa.
![](https://images.viblo.asia/1361a835-d468-4216-9e29-7d26eb7b369b.png)


Hy vọng qua bài chia sẻ này mọi người có thể hiểu rõ hơn về rails console. Chúng ta có thể làm mọi thứ với ứng dụng của chúng ta khi sử dụng console, Đặc biệt khi điều tra về database. Happy coding!