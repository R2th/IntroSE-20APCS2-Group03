![image.png](https://images.viblo.asia/a5f5bdaf-1a64-4014-84e0-4c50f55ed5c0.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

**Cách sử dụng Builder Pattern bằng TypeScript để giải quyết các vấn đề thực tế trong các project web. Làm chủ Builder Pattern sẽ giúp bạn dễ dàng xử lý việc tạo các đối tượng.**

Chào mừng bạn đến với loạt bài **Design Patterns trong TypeScript**, loạt bài này mình sẽ giới thiệu một số Design Patterns hữu ích trong phát triển web bằng TypeScript.

Các **Design Patterns** rất quan trọng đối với các web developer và chúng ta có thể code tốt hơn bằng cách thành thạo chúng. Trong bài viết này, mình sẽ sử dụng **TypeScript** để giới thiệu **Builder Pattern**.

Builder Pattern
----

**Builder Pattern** phân tách một đối tượng phức tạp thành các phần tương đối đơn giản, sau đó tạo chúng một cách riêng biệt theo các nhu cầu khác nhau và cuối cùng là xây dựng đối tượng phức tạp.

Vậy làm thế nào để hiểu rõ hơn về vai trò của **Builder Pattern**? Hãy thử lấy một ví dụ:

```javascript
class User {
  constructor(
    public username: string,
    public sex: string,
    public age: number,
    public photo: string,
    public email: string
  ) {}
}
```

Trong đoạn code trên, chúng ta đã sử dụng cú pháp **Class** để định nghĩa một lớp `User`, với `Class` này, chúng ta có thể tạo một instance của lớp `User`:

```javascript
const bytefer = new User(
  "Bytefer",
  "male",
  30,
  "https://***.com/**",
  "bytefer@gmail.com"
);
```

Đối với đoạn code trên, mặc dù chúng ta có thể tạo thành công một `instance` của lớp `User`. Nhưng trong quá trình tạo các `instance`, **chúng ta cần chú ý đến kiểu và thứ tự của các tham số constructor của lớp `User`**. Đồng thời, chúng ta cũng cần truyền đủ tham số cùng một lúc để xây dựng một instance của lớp `User`.

Để giải quyết vấn đề trên, một giải pháp là sử dụng **Design Patterns**. Chìa khóa của **Patterns** này là phân tách một đối tượng phức tạp thành các phần tương đối đơn giản, sau đó tạo chúng riêng biệt theo các nhu cầu khác nhau và cuối cùng là xây dựng đối tượng phức tạp.

Sau khi hiểu các thông tin chính ở trên, hãy định nghĩa một lớp `UserBuilder`:

```javascript
class UserBuilder {
  public username!: string;
  public sex!: string;
  public age!: number;
  public photo!: string;
  public email!: string;

  setUserName(name: string) {
    this.username = name;
    return this;
  }

  setSex(sex: string) {
    this.sex = sex;
    return this;
  }

  setAge(age: number) {
    this.age = age;
    return this;
  }

  setPhoto(photo: string) {
    this.photo = photo;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  build() {
    return new User(this.username, this.sex, this.age, this.photo, this.email);
  }
}
```

Trong lớp `UserBuilder`, chúng ta định nghĩa một số hàm `setXXX` và một hàm `build`. Phương thức `setXXX` được sử dụng để đặt value cho một Properties của `UserBuilder` instance và hàm `build` được sử dụng để thực hiện thao tác tạo một instance của lớp `User`.

Với lớp `UserBuilder`, chúng ta có thể tạo một instance của lớp `User` theo cách sau:

```javascript
const bytefer = new UserBuilder()
  .setAge(30)
  .setSex("male")
  .setEmail("bytefer@gmail.com")
  .setPhoto("https://***.com/**")
  .setUserName("Bytefer")
  .build();
```

HÔ HÔ nhìn quen quen nhỉ chắc ae cũng đã thấy cách tạo Object này ở đâu đó rồi đúng ko.

Tiếp theo, mình sẽ sử dụng hình bên dưới để hiển thị các cách khác nhau để tạo một instance của class `User`:

![image.png](https://images.viblo.asia/a05729b9-39c2-4d07-80b8-3933a4b084e0.png)

Sau khi đọc ví dụ trên, bạn sẽ thấy rằng **Builder Pattern** không hề phức tạp đúng ko. Trong một project TypeScript thực tế, chúng ta có thể sử dụng thư viện [**Builder Pattern**](https://github.com/Vincent-Pang/builder-pattern) để áp dụng Builder Pattern một cách hiệu quả. Có sẵn hết rồi dùng thôi tuy nhiên vẫn câu nói cũng dùng mà hiểu thì vẫn sướng hơn dùng mà ko hiểu. Phải bón hành cho tụi này luôn chứ....

**Sử dụng cơ bản**

```javascript
interface UserInfo {
  id: number;
  userName: string;
  email: string;
}
const userInfo = Builder<UserInfo>()
                   .id(28)
                   .userName('bytefer')
                   .email('bytefer@gmail.com')
                   .build();
```

**Cách sử dụng với các đối tượng mẫu (template objects)**

```javascript
const defaultUserInfo: UserInfo = {
  id: 1,
  userName: 'bytefer',
  email: 'bytefer@gmail.com'
};
const modifiedUserInfo = Builder(defaultUserInfo)
                          .id(28)
                          .build();
```

**Cách sử dụng với class object**

```javascript
class UserInfo {
  id!: number;
  userName!: string;
  email!: string;
}
const userInfo = Builder(UserInfo) 
                   .id(28)
                   .userName('bytefer')
                   .email('bytefer@gmail.com')
                   .build();
```

Sau khi đọc ba ví dụ sử dụng ở trên, bạn thấy đó thư viện [Builder Pattern](https://github.com/Vincent-Pang/builder-pattern) khá mạnh mẽ. Trên thực tế, thư viện được implement dựa trên [**ES6 Proxy API**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Nếu bạn quan tâm thì có thể đọc [source code](https://github.com/Vincent-Pang/builder-pattern/blob/master/src/Builder.ts) của nó.

Trong trường hợp truy vấn dữ liệu, chúng ta thường thấy **Builder Pattern**. Ví dụ: để xây dựng các điều kiện truy vấn `sql` hoặc `elaticsearch`. 
Ở đây chúng ta lấy thư viện [**bodybuilder**](https://bodybuilder.js.org/) làm ví dụ để xem cách sử dụng cơ bản của nó:

```javascript
bodybuilder()
  .query('match', 'message', 'this is a test')
  .filter('term', 'user', 'kimchy')
  .filter('term', 'user', 'herald')
  .orFilter('term', 'user', 'johnny')
  .notFilter('term', 'user', 'cassie')
  .aggregation('terms', 'user')
  .build()
```

Một số trường hợp sử dụng của Builder Pattern:

*   Khi một lớp có nhiều hơn 4 tham số constructor và một số tham số này là tùy chọn, hãy cân nhắc sử dụng Builder Pattern (Hoặc một pattern nào đó trong bộ Constructor pattern mình sẽ giới thiệu trong các bài viết sau).

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----
* https://tuan200tokyo.blogspot.com/2022/11/blog53-design-patterns-builder-pattern.html