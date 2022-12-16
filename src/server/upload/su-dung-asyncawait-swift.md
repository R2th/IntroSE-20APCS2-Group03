# Giới thiệu
Lập trình với Async cho phép chúng ta kiểm soát được quá trình thực thi luồng. Vì Callback không phải bất cứ lúc nào cũng có thể được gọi. Chúng ta không cần gọi nhiều lần callback để đảm bảo việc timing. Async sẽ giúp ta duy trì một luồng rõ ràng.
Mô hình này không phải là mới. Trên thực tế, các ngôn ngữ như C # có tính năng lập trình không đồng bộ trong nhiều năm nay, khiến nó trở thành một mô hình rất kiểu mẫu.

Một ví dụ nhanh. Giả sử, chúng ta có một phương thức gọi là getUserData (userId) và chúng ta muốn so sánh hai người dùng.

```
User1 = Try Wait for getUserData(id: 1)
User2 = Try Wait for getUserData(id: 2)
Is User1 Name = User2 Name ?
```

Chúng tôi đã thấy một từ khóa quan trọng ở đây, **wait**,  hay thực tế là **await**.
Đầu tiên, chúng ta tạo một đối tượng User1 và lưu trữ kết quả getUserData (1) của chúng tôi trong đó, chỉ khi được gọi thành công. Phương thức này sẽ đợi getUserData () kết thúc quá trình thực thi. Chúng tôi cũng làm như vậy đối với User2 sau đó. Sau đó, chúng ta kiểm tra kết quả của 2 đối tượng đó.

Không có gì quá đặc biệt, vậy điều khác biệt lớn nhất ở đây là gì?

**Safety**: Ta có thể giải định rằng User1 và User2 sẽ có giá trị khi việc kiểm tra xảy ra. Nếu không, sẽ có lỗi được đưa ra.

**Concurrency**: User1 sẽ luôn có giá trị trước User2, không giống với closure, có thể User2 sẽ được trả giá trị trước user1.

**Expressiveness**: Thay vì truyền dữ liệu qua closure, chúng ta trực tiếp chỉ ra rằng các đối tượng đó là kết quả của một function cụ thể. Chún ta không cần đảm bảo rằng các dữ liệu được truyền đúng cách. Cũng không cần check nill hoặc bất cứ điều gì khác trong closure.

# Thực hiện

Viết ứng dụng theo cách không đồng bộ không khác như người ta nghĩ. Bên cạnh một số khác biệt về thiết kế, code hầu như vẫn sẽ được giữ nguyên


```
getUserData(id: 1) { user1 in 
  getUserData(id: 2) { user2 in
    getUserData(id: 3) {user3 in 
      return user1.name == user2.name && user2.name == user3.name
    }
  }
}
func getUserData(id: Int, completion: @escaping (User) -> Void) { 
  let user = ...
  completion(user)
}
```

```
let user1 = await getUserData(id: 1)
let user2 = await getUserData(id: 2)
let user3 = await getUserData(id: 3)
return user1.name == user2.name && user2.name == user3.name
func getUserData() async throws -> Void { 
  let user = try await ...
  return user
}
```

## Xử lý lỗi

Việc đảm bảo tính đúng đắn cũng trở nên dễ dàng hơn rất nhiều với các hàm không đồng bộ. Thay vì sử dụng các trình bảo vệ cho mỗi lần đóng, chúng ta có thể sử dụng thử không đồng bộ. Điều này làm cho lợi ích lớn thông qua mã không đồng bộ rõ ràng hơn rất nhiều:

```
getUserData(id: 1) { user1 in 
 guard let usr1 = user1 else { fatalError() }
 getUserData(id: 2) { user2 in
   guard let usr2 = user2 else { fatalError() }
   getUserData(id: 3) {user3 in 
      guard let usr3 = user1 else { fatalError() }
      return usr1.name == usr2.name && usr2.name == usr3.name
    }
  }
}
```

Một lần nữa, mã không đồng bộ giống như thế này:

```
let user1 = try await getUserData(id: 1)
let user2 = try await getUserData(id: 2)
let user3 = try await getUserData(id: 3)
return user1.name == user2.name && user2.name == user3.name
```

-----

Việc không đồng bộ sẽ thay đổi cách chúng ta phát triển ứng dụng trong Swift. Mặc dù đề xuất đầu tiên đưa nó thành ngôn ngữ này còn lâu mới trở nên mạnh mẽ như C #, Swift đang đi đúng hướng. Nhìn chung, code của chúng ta sẽ trở nên dễ đọc và mạnh mẽ hơn, mà không cần thêm nhiều nỗ lực cho các nhà phát triển.